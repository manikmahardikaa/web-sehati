import {  NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  formatPhoneNumber,
  sendWhatsAppMessage,
} from "@/app/utils/whatsapp-helper";
import { GeneralError } from "@/app/utils/general-error";

const prisma = new PrismaClient();

export async function POST() {
  try {
    const now = new Date();
    const jobs = await prisma.waBlastSchedule.findMany({
      where: { status: "PENDING", scheduled_at: { lte: now } },
    });

    let processed = 0,
      failedAll = 0;

    for (const job of jobs) {
      const phones: string[] = JSON.parse(job.phone_numbers);
      let failed = false;

      for (const phone of phones) {
        try {
          await sendWhatsAppMessage(formatPhoneNumber(phone), job.message);
        } catch (e) {
          failed = true;
          if (e instanceof GeneralError) {
            console.error(
              "Gagal kirim ke:",
              phone,
              e.message,
              e.error_code,
              e.details
            );
          } else if (e instanceof Error) {
            console.error("Gagal kirim ke:", phone, e.message);
          } else {
            console.error("Gagal kirim ke:", phone, e);
          }
        }
      }

      await prisma.waBlastSchedule.update({
        where: { id: job.id },
        data: {
          status: failed ? "FAILED" : "SENT",
          sent_at: new Date(),
        },
      });

      if (failed) failedAll++;
      processed++;
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${processed} job(s), failed: ${failedAll}`,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
