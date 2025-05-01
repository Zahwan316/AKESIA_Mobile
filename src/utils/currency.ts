export const CurrencyFormat = (number: string | number) => {
  const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(number));
  return currency;
};
