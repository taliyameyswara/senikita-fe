export const limitText = (text, maxLength) => {
  if (!text) {
    return ""; // Mengembalikan string kosong jika `text` tidak terdefinisi
  }
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
