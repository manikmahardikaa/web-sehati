import { PrismaClient } from "@prisma/client";
import cron from "node-cron";
import { formatPhoneNumber, sendWhatsAppMessage } from "./whatsapp-helper";
import { GeneralError } from "./general-error";

const prisma = new PrismaClient();

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const jobs = await prisma.waBlastSchedule.findMany({
    where: { status: "PENDING", scheduled_at: { lte: now } },
  });

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
    console.log(
      `Blast ${job.id} selesai, status: ${failed ? "FAILED" : "SENT"}`
    );
  }
});
