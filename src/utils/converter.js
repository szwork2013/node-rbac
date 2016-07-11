export const arrayToObject = (array, key, value) => {
  if (array instanceof Array) {
    key = key || 'key';
    value = value || 'value';
    const result = {};
    array.forEach((item, index) => {
      if (Object.keys(item).length === 1) {
        result.key = item;
      }
      else {
        result[item.key] = item[value];
      }
    });
    return result;
  }
  return null;
}

export const objectToArray = (obj, key, value) => {
  if (obj instanceof Object) {
    key = key || 'key';
    value = value || 'value';
    const array = [];
    for (let [k, v] of Object.entries(obj)) {
      let o = {};
      o[key] = k;
      o[value] = v;
      array.push(o);
    }
    return array;
  }
  return null;
}

export const toFormData = (obj) => {
  if (obj instanceof Object) {
    const result = {};
    for (let [name, value] of Object.entries(obj)) {
      let o = {name, value};
      result[name] = o;
    }
    return result;
  }
  return null;
}
