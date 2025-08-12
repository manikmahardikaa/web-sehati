import { WaBlastSchedulePayloadCreateModel } from "@/app/models/petugas-lapangan/schedule-blast";
import { sendWhatsAppMessage } from "@/app/utils/whatsapp-helper";
import db from "@/lib/prisma";
import dayjs from "dayjs";

export const GET_WA_BLASTS = async () => {
  const result = await db.waBlastSchedule.findMany({});
  return result;
};

export const CREATE_WA_BLAST = async (
  payload: WaBlastSchedulePayloadCreateModel
) => {
  const result = await db.waBlastSchedule.create({
    data: payload,
  });

  if (payload.scheduled_at === null) {
    let numbers: string[] = [];
    if (typeof payload.phone_numbers === "string") {
      try {
        numbers = JSON.parse(payload.phone_numbers);
      } catch {
        numbers = [payload.phone_numbers];
      }
    } else {
    }
    for (const phone of numbers) {
      await sendWhatsAppMessage(phone, payload.message);
    }
    await db.waBlastSchedule.update({
      where: {
        id: result.id,
      },
      data: {
        status: "DELIVERED",
        scheduled_at: dayjs().toDate(),
        sent_at: dayjs().toDate(),
      },
    });
  }

  return result;
};
