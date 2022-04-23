export const isEmptyObj = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return true;
  }
  return false;
};
