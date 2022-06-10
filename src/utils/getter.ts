export const getterDate = at => {
  return new Date(at).toLocaleDateString().replaceAll('/', '-');
};
