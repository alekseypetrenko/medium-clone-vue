export const range = (start, end) => {
  return [...Array(end).keys()].map(i => i + start);
};
