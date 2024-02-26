export const mergeObject = (arr, obj) =>
  arr && arr.map(t => (t.name === obj.name ? obj : t));
