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

// 要判断一下是否是二维数组的filter
function isSimpleComparison(filter) {
    if (!filter || !Array.isArray(filter)) {
        return false;
    }
    const [operator, ...operands] = filter;

    const simpleOps = ['==', '!=', '>', '>=', '<', '<=', 'in', '!in', 'has', '!has'];
    const logicalOps = ['all', 'any', 'none'];
    if (simpleOps.includes(operator)) {
        // has / !has：只要求一个字段名
        if (operator === 'has' || operator === '!has') {
            // 排除这种： ['has', ['get', 'name']]
            return typeof operands[0] === 'string';
        }
        // in / !in：field + 至少一个值
        if (operator === 'in' || operator === '!in') {
            if (typeof operands[0] !== 'string') { return false; }
            return operands.length > 1;
        }
        // 普通比较：field + value
        return operands.length === 2 && typeof operands[0] === 'string';
    }
    if (logicalOps.includes(operator)) {
        if (operands.length === 0) { return false; }
        return operands.every((item) => isSimpleComparison(item));
    }
    return false;
}

// 处理类似"O'Reilly"这种字符串，在SQL语句中需要转，单引号需要处理
function formatValue(value) {
    if (typeof value === 'string') {
        return `'${value.replace(/'/g, "''")}'`;
    }
    return String(value);
}

// 判断空值
function isNullvalue(value) {
    return [null, '', undefined].includes(value);
}

function mapboxFilterToCqlFilter(filter) {
    if (!isSimpleComparison(filter)) {
        return '';
    }
    const [operator, ...operands] = filter;
    const field = operands[0];
    let value;
    switch (operator) {
        case '>':
        case '>=':
        case '<':
        case '<=': {
            value = operands[1];
            return `${field} ${operator} ${formatValue(value)}`;
        }
        case '==': {
            value = operands[1];
            if (isNullvalue(value)) {
                return `${field} IS NULL`;
            }
            return `${field} = ${formatValue(value)}`;
        }
        case '!=': {
            value = operands[1];
            if (isNullvalue(value)) {
                return `${field} IS NOT NULL`;
            }
            return `${field} <> ${formatValue(value)}`;
        }
        case 'in': {
            const values = operands.slice(1);
            return `${field} IN (${values.map((v) => formatValue(v)).join(', ')})`;
        }
        case '!in': {
            const values = operands.slice(1);
            return `${field} NOT IN (${values.map((v) => formatValue(v)).join(', ')})`;
        }
        // TODO
        // case 'has': {
        //     const field = operands[0];
        //     return tableFieldNames?.includes(field) ? '1=1' : '1=0';
        // }
        // case '!has': {
        //     const field = operands[0];
        //     return tableFieldNames?.includes(field) ? '1=0' : '1=1';
        // }
        case 'all': {
            return operands
                .map((item) => mapboxFilterToCqlFilter(item))
                .filter(Boolean)
                .map((item) => `${item}`)
                .join(' AND ');
        }
        case 'any': {
            return operands
                .map((item) => mapboxFilterToCqlFilter(item))
                .filter(Boolean)
                .map((item) => `(${item})`)
                .join(' OR ');
        }
        case 'none': {
            return operands
                .map((item) => mapboxFilterToCqlFilter(item))
                .filter(Boolean)
                .map((item) => `NOT (${item})`)
                .join(' AND ');
        }
        default:
            return '';
    }
}

// none的情况下，全部用Not一个一个包裹，会报错（应该是接口问题），反转即可
function negateComparison(filter) {
    const op = filter[0];
    const args = filter.slice(1);
    switch (op) {
        case '==':
            return mapboxFilterToWfsFilter(['!=', ...args]);
        case '!=':
            return mapboxFilterToWfsFilter(['==', ...args]);
        case '>':
            return mapboxFilterToWfsFilter(['<=', ...args]);
        case '>=':
            return mapboxFilterToWfsFilter(['<', ...args]);
        case '<':
            return mapboxFilterToWfsFilter(['>=', ...args]);
        case '<=':
            return mapboxFilterToWfsFilter(['>', ...args]);
        case 'in':
            return mapboxFilterToWfsFilter(['!in', ...args]);
        case '!in':
            return mapboxFilterToWfsFilter(['in', ...args]);
        // case 'has':
        //     return mapboxFilterToWfsFilter(['!has', ...args], fieldNames, tableFieldNames);
        // case '!has':
        //     return mapboxFilterToWfsFilter(['has', ...args], fieldNames, tableFieldNames);
        default:
            return '';
    }
}

function mapboxFilterToWfsFilterBody(filter) {
    if (!isSimpleComparison(filter)) {
        return '';
    }
    const [operator, ...operands] = filter;
    const fieldRef = (field) => `<fes:ValueReference>${field}</fes:ValueReference>`;
    const literal = (value) => `<fes:Literal>${value}</fes:Literal>`;
    switch (operator) {
        case '==': {
            const [field, value] = operands;
            if (isNullvalue(value)) {
                return `
<fes:PropertyIsNull>
  ${fieldRef(field)}
</fes:PropertyIsNull>`;
            }
            return `
<fes:PropertyIsEqualTo>
  ${fieldRef(field)}
  ${literal(value)}
</fes:PropertyIsEqualTo>`;
        }
        case '!=': {
            const [field, value] = operands;
            if (isNullvalue(value)) {
                return `
<fes:PropertyIsNotNull>
  ${fieldRef(field)}
</fes:PropertyIsNotNull>`;
            }
            return `
<fes:PropertyIsNotEqualTo>
  ${fieldRef(field)}
  ${literal(value)}
</fes:PropertyIsNotEqualTo>`;
        }
        case '>':
            return `
<fes:PropertyIsGreaterThan>
  ${fieldRef(operands[0])}
  ${literal(operands[1])}
</fes:PropertyIsGreaterThan>`;
        case '>=':
            return `
<fes:PropertyIsGreaterThanOrEqualTo>
  ${fieldRef(operands[0])}
  ${literal(operands[1])}
</fes:PropertyIsGreaterThanOrEqualTo>`;
        case '<':
            return `
<fes:PropertyIsLessThan>
  ${fieldRef(operands[0])}
  ${literal(operands[1])}
</fes:PropertyIsLessThan>`;
        case '<=':
            return `
<fes:PropertyIsLessThanOrEqualTo>
  ${fieldRef(operands[0])}
  ${literal(operands[1])}
</fes:PropertyIsLessThanOrEqualTo>`;
        case 'in': {
            const field = operands[0];
            const values = operands.slice(1);
            return `
<fes:Or>${values
                .map(
                    (v) => `
  <fes:PropertyIsEqualTo>
    ${fieldRef(field)}
    ${literal(v)}
  </fes:PropertyIsEqualTo>`
                )
                .join('')}</fes:Or>`;
        }
        case '!in': {
            const field = operands[0];
            const values = operands.slice(1);
            return `
<fes:Not><fes:Or>${values
                .map(
                    (v) => `
    <fes:PropertyIsEqualTo>
      ${fieldRef(field)}
      ${literal(v)}
    </fes:PropertyIsEqualTo>`
                )
                .join('')}</fes:Or></fes:Not>`;
        }
        // TODO,has条件暂时是用null判断，不准确
        // case 'has': { ... }
        // case '!has': { ... }
        case 'all': {
            const children = operands
                .map((item) => mapboxFilterToWfsFilterBody(item).trim())
                .filter(Boolean);
            return children.length
                ? `
<fes:And>
  ${children.join('')}
</fes:And>`
                : '';
        }
        case 'any': {
            const children = operands
                .map((item) => mapboxFilterToWfsFilterBody(item).trim())
                .filter(Boolean);
            return children.length
                ? `
<fes:Or>
  ${children.join('')}
</fes:Or>`
                : '';
        }
        case 'none': {
            const children = operands.map((item) => negateComparison(item).trim()).filter(Boolean);
            return children.length
                ? `
<fes:And>
  ${children.join('')}
</fes:And>`
                : '';
        }
        default:
            return '';
    }
}

function mapboxFilterToWfsFilter(filter) {
    const body = mapboxFilterToWfsFilterBody(filter);
    if (!body) { return ''; }
    return `<fes:Filter>${body}
</fes:Filter>`;
}

function mapboxFilterToQueryFilter(filter, type = 'SQL') {
    if (type === 'SQL') {
        return mapboxFilterToCqlFilter(filter);
    }
    if (type === 'XML') {
        return mapboxFilterToWfsFilter(filter);
    }
    return '';
}


export { parseCondition, parseConditionFeature, mapboxFilterToQueryFilter };
