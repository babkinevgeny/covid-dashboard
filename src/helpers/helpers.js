export const sortArray = (rows, field, acs = false) => (
  [...rows].sort((r1, r2) => (r1[field] - r2[field]) * (acs ? 1 : -1))
);

export const pagerConstants = {
  arrowBackId: 'back',
  arrowForwardId: 'forward',
};
