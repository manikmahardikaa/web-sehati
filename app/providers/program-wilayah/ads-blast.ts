import { WaBlastADSPayloadCreateModel } from "@/app/models/program-wilayah/ads-blast";
import { sendWhatsAppMessage } from "@/app/utils/whatsapp-helper";
import db from "@/lib/prisma";
import dayjs from "dayjs";

export const GET_ADS_BLASTS = async () => {
  const result = await db.waBlastADS.findMany({
    include: {
      patient: true,
      petugas_lapangan: true,
    },
  });
  return result;
};

export const CREATE_ADS_BLAST = async (
  payload: WaBlastADSPayloadCreateModel
) => {
  const result = await db.waBlastADS.create({
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
    await db.waBlastADS.update({
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
