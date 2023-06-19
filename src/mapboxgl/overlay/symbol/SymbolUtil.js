const LayerType = {
    circle: 'circle',
    symbol: 'symbol',
    line: 'line',
    fill: 'fill'
}

// 判断符号类型
const GET_TYPE_RULE = [{
    prefix: 'line-',
    type: LayerType.line
}, {
    prefix: 'fill-',
    type: LayerType.fill
}, {
    prefix: 'circle-',
    type: LayerType.circle
}];

export function isMultiSymbol(symbol) {
    return symbol?.length > 0;
}

/**
 * 获取不同图层类型使用image的属性名
 * @param {object} symbol 
 * @returns {object}
 * @private
 */
export function getImageKey(symbol) {
    const symbolType = getSymbolType(symbol);
    const IMAGE_MAPBOX_KEY = {
        [LayerType.symbol]: {
            type: 'layout',
            name: 'icon-image'
        },
        [LayerType.line]: {
            type: 'paint',
            name: 'line-pattern'
        },
        [LayerType.fill]: {
            type: 'paint',
            name: 'fill-pattern'
        }
    }
    const result = IMAGE_MAPBOX_KEY[symbolType];
    return result;
}

/**
 * 通过符号属性获取该符号类型
 * @param {*} symbol 
 * @returns {string}
 * @private
 */
export function getSymbolType(symbol) {
    const { paint = {}, layout = {} } = symbol;
    const keys = Object.keys(paint).concat(Object.keys(layout));
    let type;
    for (const v of GET_TYPE_RULE) {
        const isMatch = keys.some(k => k.startsWith(v.prefix));
        if (isMatch) {
            type = v.type;
            break;
        }
    }
    return type ?? LayerType.symbol;
}

const MAPBOX_EXPRESSION_FIRST_VALUE = [
    'array',
    'boolean',
    'collator',
    'format',
    'literal',
    'number',
    'object',
    'string',
    'to-boolean',
    'to-color',
    'to-number',
    'to-string',
    'typeof',
    'feature-state',
    'geometry-type',
    'id',
    'line-progress',
    'properties',
    'at',
    'get',
    'has',
    'length',
    '!',
    '!=',
    '<',
    '<=',
    '==',
    '>',
    '>=',
    'all',
    'any',
    'case',
    'match',
    'coalesce',
    'interpolate',
    'interpolate-hcl',
    'interpolate-lab',
    'step',
    'let',
    'var',
    'concat',
    'downcase',
    'is-supported-script',
    'resolved-locale',
    'upcase',
    'rgb',
    'rgba',
    '-',
    '*',
    '/',
    '%',
    '^',
    '+',
    'abs',
    'acos',
    'asin',
    'atan',
    'ceil',
    'cos',
    'e',
    'floor',
    'ln',
    'ln2',
    'log10',
    'log2',
    'max',
    'min',
    'pi',
    'round',
    'sin',
    'sqrt',
    'tan',
    'zoom',
    'heatmap-density'
];

/**
 * 是否为表达式
 * @param key
 * @param value
 * @returns boolean
 * @private
 */
export function isMapboxExpression(value) {
    if (value?.length > 0) {
        const [v] = value;
        return typeof v === 'string' && MAPBOX_EXPRESSION_FIRST_VALUE.includes(v);
    }
    return false;
}

export function validateStyleKey(value) {
    return Object.keys(value).every(k => {
        return !isMapboxExpression(value[k]);
    });
}

export function validateSymbol(symbol) {
    const symbolInfo = isMultiSymbol(symbol) ? symbol : [symbol];
    return symbolInfo.every((s) => {
        return validateStyleKey(s.paint ?? {}) && validateStyleKey(s.layout ?? {});
    });
}