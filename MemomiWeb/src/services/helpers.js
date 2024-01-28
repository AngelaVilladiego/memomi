const options = { year: "numeric", month: "short", day: "numeric" };
export const formatDate = (date) => {
  return date.toLocaleDateString("en-CA", options);
};
