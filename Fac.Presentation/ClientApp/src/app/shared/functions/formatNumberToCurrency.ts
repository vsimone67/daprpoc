export function formatNumberToCurrency(value) {
  return "$" + Math.round(Math.floor(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
