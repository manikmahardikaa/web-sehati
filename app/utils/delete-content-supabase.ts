import { supabase } from "./supabase-client";

export async function deleteSupabaseImage(bucket: string, path: string) {
  if (!bucket || !path) return;
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) {
    throw error;
  }
}

export async function deleteSupabasePdf(bucket: string, path: string) {
  if (!bucket || !path) return;
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) {
    throw error;
  }
}