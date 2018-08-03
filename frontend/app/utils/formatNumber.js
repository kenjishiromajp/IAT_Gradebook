export const formatToDecimal = (value, numberDecimals = 2) => {
  const newValue = value || 0;
  return new Intl.NumberFormat('pt-br', {
    minimumFractionDigits: numberDecimals,
    maximumFractionDigits: numberDecimals,
  }).format(newValue);
};

export const parseToDecimal = (value, numberDecimals = 2) =>
  parseInt(value
    .toString()
    .replace(/,/g, '')
    .replace(/\./g, '')) / Math.pow(10, numberDecimals);
