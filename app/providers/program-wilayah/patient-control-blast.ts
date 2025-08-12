import { WaBlastPatientControlPayloadCreateModel } from "@/app/models/program-wilayah/patient-control-blast";
import { sendWhatsAppMessage } from "@/app/utils/whatsapp-helper";
import db from "@/lib/prisma";
import dayjs from "dayjs";

export const GET_CONTROL_PATIENT_BLASTS = async () => {
  const result = await db.waBlastPatientControl.findMany({});
  return result;
};

export const CREATE_CONTROL_PATIENT_BLAST = async (
  payload: WaBlastPatientControlPayloadCreateModel
) => {
  const result = await db.waBlastPatientControl.create({
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
    await db.waBlastPatientControl.update({
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
