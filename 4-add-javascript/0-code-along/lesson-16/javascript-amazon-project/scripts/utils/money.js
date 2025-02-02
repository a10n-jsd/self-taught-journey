export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

// Small issue:
// When dealing with floating-point numbers, small rounding errors can cause unexpected results when using methods like .toFixed()
// 6.005.toFixed(2) => '6.00'
// 7.005.toFixed(2) => '7.00'
// 8.005.toFixed(2) => '8.01'
// Math.round(8.005).toFixed(2) => '8.00'
// Math.round(6.005).toFixed(2) => '6.00'
// Math.round(7.005).toFixed(2) => '7.00'
// If precise decimal representation (especially for financial calculations) is required, consider using libraries that handle decimal arithmetic accurately (like Decimal.js) or work with INTEGERS to avoid precision errors.