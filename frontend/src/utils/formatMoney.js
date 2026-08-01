export function fmtMoney(n) {
  return `₹${Number(n || 0).toFixed(2)}`;
}