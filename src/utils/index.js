import Promise from 'bluebird';
import yamljs from 'yamljs';
import xml2js from 'xml2js';
import {
  forEach, isEmpty, join, isString, isObject, reduce,
  tail, split, replace, merge, set, map, get
} from 'lodash';

const xmlParser = Promise.promisify(xml2js.parseString);

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

export const yamlToJSON = (yaml) => {
  return yamljs.parse(yaml);
};

export const xmlToJSON = async function(xml) {
  const data = await xmlParser(xml);
  return reduce(get(data, 'resources.string', []), (total, entry) => {
    return merge(total, set({}, get(entry, '$.name', ''), get(entry, '_', '')));
  }, {});
};

export const csvToJSON = (csv) => {
  return reduce(tail(split(csv, '\n')), (total, line) => {
    const [key, translation] = map(split(line, ','),
      data => replace(data, /"/g, ''));
    return merge(total, set({}, key, translation));
  }, {});
};

export const appleToJSON = (txt) => {
  return reduce(split(txt, '\n'), (total, line) => {
    const [key, translation] = map(split(line, ' = '),
      data => replace(data, /"/g, ''));
    return merge(total, set({}, key, translation));
  }, {});
};
