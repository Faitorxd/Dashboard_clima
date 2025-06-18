export function formatNumber(val, decimals = 2) {
  return typeof val === 'number' ? val.toFixed(decimals) : val;
} 