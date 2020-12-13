export const sortArray = (rows, field, acs = false) => {
  const sortedArr = [...rows].sort((r1, r2) => (r1[field] - r2[field]) * (acs ? 1 : -1));
  return sortedArr;
};

export const pagerConstants = {
  arrowBackId: 'back',
  arrowForwardId: 'forward',
};
