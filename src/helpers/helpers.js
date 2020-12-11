const sortArray = (rows, field, acs) => {
  rows.sort((r1, r2) => (r1[field] - r2[field]) * (acs ? 1 : -1));
};

export default sortArray;
