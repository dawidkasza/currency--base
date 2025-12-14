export const convertPLNToUSD = (PLN) => {
  // brak argumentu
  if (PLN === undefined) {
    return NaN;
  }

  // jeśli typ to string → NaN
  if (typeof PLN === 'string') {
    return NaN;
  }

  // jeśli typ to number
  if (typeof PLN === 'number') {
    if (PLN < 0) {
      return '$0.00';
    }

    const PLNtoUSD = PLN / 3.5;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
  }

  // jeśli typ inny niż number i string → "Error"
  return 'Error';
};