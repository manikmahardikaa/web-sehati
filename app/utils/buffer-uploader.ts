import { supabase } from "./supabase-client";


export async function uploadPdfBufferToSupabase(
  pdfBuffer: Buffer,
  filename: string
) {
  const { error } = await supabase.storage
    .from("web-sehati")
    .upload(`reports/${filename}`, pdfBuffer, {
      contentType: "application/pdf",
      upsert: true,
    });
  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("web-sehati")
    .getPublicUrl(`reports/${filename}`);
  return urlData?.publicUrl;
}
