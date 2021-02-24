import { formatNumber } from "./formatNumber";

export function formatCurrency(data) {
  return "$" + formatNumber(data);
}
