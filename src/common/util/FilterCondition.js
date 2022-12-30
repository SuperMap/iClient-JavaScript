function parseCondition(filterCondition, keys) {
  const str = filterCondition.replace(/&|\||>|<|=|!/g, ' ');
  const arr = str.split(' ').filter((item) => item);
  let result = filterCondition;
  arr.forEach((item) => {
    const key = startsWithNumber(item) && keys.find((val) => val === item);
    if (key) {
      result = result.replace(key, '$' + key);
    }
  });
  return result;
}

// 处理jsonsqlfeature, 加前缀
function parseConditionFeature(feature) {
  const copyValue = {};
  for (const key in feature) {
    let copyKey = key;
    if (startsWithNumber(key)) {
      copyKey = '$' + key;
    }
    copyValue[copyKey] = feature[key];
  }
  return copyValue;
}

function startsWithNumber(str) {
  return /^\d/.test(str);
}

export { parseCondition, parseConditionFeature };
