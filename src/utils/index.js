import {
  forEach, isEmpty, join, isString, isObject
} from 'lodash';

export const jsonToFlatJSON = (json) => {
  const data = {};
  const handleObject = (obj, prefix) => {
    forEach(obj, (value, key) => {
      const dataKey = !isEmpty(prefix) ? join([prefix, key], '.') : key;

      if (isString(value)) {
        data[dataKey] = value;
      } else if (isObject(value)) {
        handleObject(value, dataKey);
      }
    });
  };

  handleObject(json, '');
  return data;
};

export const yamlToJSON = (csv) => {
};

export const xmlToJSON = (csv) => {
};

export const csvToJSON = (csv) => {
};

export const appleToJSON = (csv) => {
};
