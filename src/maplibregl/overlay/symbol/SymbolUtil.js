/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
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
    return symbol && symbol.length > 0;
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
    return type || LayerType.symbol;
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
    if (value && value.length > 0) {
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
        return validateStyleKey(s.paint || {}) && validateStyleKey(s.layout || {});
    });
}

export const isPaintKey = (key) => {
    return [
        // BackgroundPaint
        'background-color',
        'background-color-transition',
        'background-pattern',
        'background-pattern-transition',
        'background-opacity',
        'background-opacity-transition',
        // FillPaint
        'fill-antialias',
        'fill-opacity',
        'fill-opacity-transition',
        'fill-color',
        'fill-color-transition',
        'fill-outline-color',
        'fill-outline-color-transition',
        'fill-translate',
        'fill-translate-transition',
        'fill-translate-anchor',
        'fill-pattern',
        'fill-pattern-transition',
        // FillExtrusionPaint
        'fill-extrusion-opacity',
        'fill-extrusion-opacity-transition',
        'fill-extrusion-color',
        'fill-extrusion-color-transition',
        'fill-extrusion-translate',
        'fill-extrusion-translate-transition',
        'fill-extrusion-translate-anchor',
        'fill-extrusion-pattern',
        'fill-extrusion-pattern-transition',
        'fill-extrusion-height',
        'fill-extrusion-height-transition',
        'fill-extrusion-base',
        'fill-extrusion-base-transition',
        'fill-extrusion-vertical-gradient',
        // LinePaint
        'line-opacity',
        'line-opacity-transition',
        'line-color',
        'line-color-transition',
        'line-translate',
        'line-translate-transition',
        'line-translate-anchor',
        'line-width',
        'line-width-transition',
        'line-gap-width',
        'line-gap-width-transition',
        'line-offset',
        'line-offset-transition',
        'line-blur',
        'line-blur-transition',
        'line-dasharray',
        'line-dasharray-transition',
        'line-pattern',
        'line-pattern-transition',
        'line-gradient',
        // SymbolPaint
        'icon-opacity',
        'icon-opacity-transition',
        'icon-color',
        'icon-color-transition',
        'icon-halo-color',
        'icon-halo-color-transition',
        'icon-halo-width',
        'icon-halo-width-transition',
        'icon-halo-blur',
        'icon-halo-blur-transition',
        'icon-translate',
        'icon-translate-transition',
        'icon-translate-anchor',
        'text-opacity',
        'text-opacity-transition',
        'text-color',
        'text-color-transition',
        'text-halo-color',
        'text-halo-color-transition',
        'text-halo-width',
        'text-halo-width-transition',
        'text-halo-blur',
        'text-halo-blur-transition',
        'text-translate',
        'text-translate-transition',
        'text-translate-anchor',
        // RasterPaint
        'raster-opacity',
        'raster-opacity-transition',
        'raster-hue-rotate',
        'raster-hue-rotate-transition',
        'raster-brightness-min',
        'raster-brightness-min-transition',
        'raster-brightness-max',
        'raster-brightness-max-transition',
        'raster-saturation',
        'raster-saturation-transition',
        'raster-contrast',
        'raster-contrast-transition',
        'raster-fade-duration',
        'raster-resampling',
        'circle-sort-key',
        // CirclePaint
        'circle-radius',
        'circle-radius-transition',
        'circle-color',
        'circle-color-transition',
        'circle-blur',
        'circle-blur-transition',
        'circle-opacity',
        'circle-opacity-transition',
        'circle-translate',
        'circle-translate-transition',
        'circle-translate-anchor',
        'circle-pitch-scale',
        'circle-pitch-alignment',
        'circle-stroke-width',
        'circle-stroke-width-transition',
        'circle-stroke-color',
        'circle-stroke-color-transition',
        'circle-stroke-opacity',
        'circle-stroke-opacity-transition',
        // HeatmapPaint
        'heatmap-radius',
        'heatmap-radius-transition',
        'heatmap-weight',
        'heatmap-intensity',
        'heatmap-intensity-transition',
        'heatmap-color',
        'heatmap-opacity',
        'heatmap-opacity-transition',
        // HillshadePaint
        'hillshade-illumination-direction',
        'hillshade-illumination-anchor',
        'hillshade-exaggeration',
        'hillshade-exaggeration-transition',
        'hillshade-shadow-color',
        'hillshade-shadow-color-transition',
        'hillshade-highlight-color',
        'hillshade-highlight-color-transition',
        'hillshade-accent-color',
        'hillshade-accent-color-transition'
    ].includes(key);
}