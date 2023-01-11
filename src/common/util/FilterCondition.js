function getParseSpecialCharacter() {
  // 特殊字符字典
  const directory = ['(', ')', '（', '）', ',', '，'];
  const res = {};
  directory.forEach((item, index) => {
    res[item] = `$${index}`
  });
  return res;
}

function parseSpecialCharacter(str) {
  const directory = getParseSpecialCharacter();
  for (let key in directory) {
    const replaceValue = directory[key];
    const pattern = new RegExp(`\\${key}`, 'g');
    // eslint-disable-next-line
    while (pattern.test(str)) {
      str = str.replace(pattern, replaceValue);
    }
  }
  return str;
}

function parseCondition(filterCondition, keys) {
  const str = filterCondition.replace(/&|\||>|<|=|!/g, ' ');
  const arr = str.split(' ').filter((item) => item);
  let result = filterCondition;
  arr.forEach((item) => {
    const key = keys.find((val) => val === item);
    if (startsWithNumber(item) && key) {
      result = result.replace(key, '$' + key);
    }
    if (key) {
      const res = parseSpecialCharacter(key);
      result = result.replace(key, res);
    }
  });
  return result;
}

// 处理jsonsqlfeature, 加前缀
function parseConditionFeature(feature) {
  let copyValue = {};
  for (let key in feature) {
    let copyKey = key;
    if (startsWithNumber(key)) {
      copyKey = '$' + key;
    }
    copyKey = parseSpecialCharacter(copyKey);
    copyValue[copyKey] = feature[key];
  }
  return copyValue;
}

function startsWithNumber(str) {
  return /^\d/.test(str);
}

export { parseCondition, parseConditionFeature };
