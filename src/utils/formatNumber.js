export function formatNumber(value) {
  return `Rp${new Intl.NumberFormat("id-ID").format(value)}`;
}
