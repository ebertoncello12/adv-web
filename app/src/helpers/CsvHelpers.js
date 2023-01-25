import { isBusy } from '../store/loading/LoadingReducer';

export const previewCSV = (str, delim = ';') => {
  return (dispatch) => {
    dispatch(isBusy(true));
    const headers = str
      .slice(0, str.indexOf('\n'))
      .split(delim)
      .map((el) => {
        const name = el.replaceAll(/\s|\s+/gm, '').replaceAll('"', '');
        return {
          id: name,
          label: name.toUpperCase(),
          align: 'left',
        };
      });

    const items = str.slice(str.indexOf('\n') + 1).split('\n');
    const limit = items.length >= 3000 ? 3000 : items.length;

    const newArray = items.slice(0, limit).map((row) => {
      const values = row.split(delim);
      return headers
        .map((el) => el.id)
        .reduce((obj, header, i) => {
          obj[header] = values[i];
          return obj;
        }, {});
    });
    dispatch(isBusy(false));
    return {
      headers,
      newArray,
    };
  };
};
