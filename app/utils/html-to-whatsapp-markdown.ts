export function htmlToWhatsAppMarkdown(html: string): string {
  if (!html) return "";

  // Bold: <b>, <strong> jadi *text*
  let text = html.replace(/<(b|strong)>(.*?)<\/\1>/gi, "*$2*");

  // Italic: <i>, <em> jadi _text_
  text = text.replace(/<(i|em)>(.*?)<\/\1>/gi, "_$2_");

  // Strikethrough: <s>, <del> jadi ~text~
  text = text.replace(/<(s|del)>(.*?)<\/\1>/gi, "~$2~");

  // Monospace: <code> jadi ```text```
  text = text.replace(/<code>(.*?)<\/code>/gi, "```$1```");

  // Ganti <br> dan <p> dengan newline
  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<\/p>/gi, "\n");
  text = text.replace(/<p>/gi, "");

  // Hapus tag lain
  text = text.replace(/<[^>]+>/g, "");

  // Hilangkan spasi duplikat
  return text.trim();
}