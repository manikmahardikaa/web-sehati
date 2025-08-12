import axios from "axios";

// Kirim pesan teks saja
export async function sendWhatsAppMessage(phoneNo: string, message: string) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY_WATZAP;
  const numberKey = process.env.NEXT_PUBLIC_NUMBER_KEY_WATZAP;
  return axios.post("https://api.watzap.id/v1/send_message", {
    api_key: apiKey,
    number_key: numberKey,
    phone_no: phoneNo,
    message,
    wait_until_send: "1",
  });
}

// Kirim file saja
export async function sendWhatsAppFile(phoneNo: string, fileUrl: string) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY_WATZAP;
  const numberKey = process.env.NEXT_PUBLIC_NUMBER_KEY_WATZAP;
  return axios.post("https://api.watzap.id/v1/send_file_url", {
    api_key: apiKey,
    number_key: numberKey,
    phone_no: phoneNo,
    url: fileUrl,
    wait_until_send: "1",
  });
}

// Format nomor WA ke internasional
export function formatPhoneNumber(phone: string): string {
  return phone.startsWith("0") ? "62" + phone.slice(1) : phone;
}
