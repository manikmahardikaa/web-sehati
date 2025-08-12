import { WaBlastPsikologiPayloadCreateModel } from "@/app/models/program-wilayah/psikologi-blast";
import { sendWhatsAppFile, sendWhatsAppMessage } from "@/app/utils/whatsapp-helper";
import db from "@/lib/prisma";
import dayjs from "dayjs";

export const GET_BLAST_PSIKOLOGS = async () => {
  const result = await db.waBlastPsikologi.findMany({
    include: {
      psikologi: true,
    },
  });
  return result;
};

export const CREATE_BLAST_PSIKOLOG = async (
  payload: WaBlastPsikologiPayloadCreateModel
) => {
  // Create record first
  const result = await db.waBlastPsikologi.create({
    data: payload,
  });

  let numbers: string[] = [];
  if (typeof payload.phone_numbers === "string") {
    try {
      numbers = JSON.parse(payload.phone_numbers);
    } catch {
      numbers = [payload.phone_numbers];
    }
  }

  for (const phone of numbers) {
    // Kirim pesan jika ada
    if (payload.message) {
      await sendWhatsAppMessage(phone, payload.message);
    }
    // Kirim file jika ada report_url
    if (payload.report_url) {
      await sendWhatsAppFile(phone, payload.report_url);
    }
  }

  // Update status as DELIVERED
  await db.waBlastPsikologi.update({
    where: {
      id: result.id,
    },
    data: {
      status: "DELIVERED",
      created_at: dayjs().toDate(),
    },
  });

  return result;
};
