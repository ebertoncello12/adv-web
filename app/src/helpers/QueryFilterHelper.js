export const builderQueryStringFilter = (querySearch) => {
  if (!querySearch) {
    return '';
  }
  const objectKeys = Object.keys(querySearch);
  if (objectKeys.length <= 0) {
    return '';
  }

  return objectKeys
    .filter((key) => querySearch[key] && querySearch[key] !== '')
    .map((key) => key + '=' + querySearch[key])
    .join('&');
};

export const removeCharOfString = (string) => {
  if (typeof string !== 'string' || string?.length === 0) return '';
  return string.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
};
