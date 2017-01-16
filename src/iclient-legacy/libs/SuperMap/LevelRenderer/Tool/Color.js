/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Tool.Color
 * LevelRenderer 工具-颜色辅助类
 *
 */
SuperMap.LevelRenderer.Tool.Color = SuperMap.Class({

    /**
     * Property: util
     * {<SuperMap.LevelRenderer.Tool.Util>} LevelRenderer 基础工具对象
     */
    util: null,

    /**
     * Property: _ctx
     * {Object} _ctx
     */
    _ctx: null,

    /**
     * Property: palette
     * {Array} 默认色板
     * 色板是一个包含图表默认颜色系列的数组，当色板中所有颜色被使用过后，又将从新回到色板中的第一个颜色。
     *
     * [
     * '#ff9277', '#dddd00', '#ffc877', '#bbe3ff', '#d5ffbb', '#bbbbff', '#ddb000', '#b0dd00', '#e2bbff', '#ffbbe3',
     * '#ff7777', '#ff9900', '#83dd00', '#77e3ff', '#778fff', '#c877ff', '#ff77ab', '#ff6600', '#aa8800', '#77c7ff',  '
     * #ad77ff', '#ff77ff', '#dd0083', '#777700', '#00aa00', '#0088aa', '#8400dd', '#aa0088', '#dd0000', '#772e00'
     * ];
     */
    palette: null,

    /**
     * Property: _palette
     * {Array} 复位色板，用于复位  palette
     */
    _palette: null,

    /**
     * Property: highlightColor
     * {String} 高亮色
     */
    highlightColor: null,

    /**
     * Property: _highlightColor
     * {String} 复位高亮色
     */
    _highlightColor: null,

    /**
     * Property: colorRegExp
     * {String} 颜色格式，正则表达式。
     */
    colorRegExp: null,

    /**
     * Property: _nameColors
     * {String} 颜色名。
     */
    _nameColors: null,

    initialize: function() {
        this.util = new SuperMap.LevelRenderer.Tool.Util();

        this.palette = [
            '#ff9277', ' #dddd00', ' #ffc877', ' #bbe3ff', ' #d5ffbb',
            '#bbbbff', ' #ddb000', ' #b0dd00', ' #e2bbff', ' #ffbbe3',
            '#ff7777', ' #ff9900', ' #83dd00', ' #77e3ff', ' #778fff',
            '#c877ff', ' #ff77ab', ' #ff6600', ' #aa8800', ' #77c7ff',
            '#ad77ff', ' #ff77ff', ' #dd0083', ' #777700', ' #00aa00',
            '#0088aa', ' #8400dd', ' #aa0088', ' #dd0000', ' #772e00'
        ];

        this._palette = this.palette;

        this.highlightColor = 'rgba(0,0,255,1)';

        this._highlightColor = this.highlightColor;

        this.colorRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i;

        this._nameColors = {
            aliceblue : '#f0f8ff',
            antiquewhite : '#faebd7',
            aqua : '#0ff',
            aquamarine : '#7fffd4',
            azure : '#f0ffff',
            beige : '#f5f5dc',
            bisque : '#ffe4c4',
            black : '#000',
            blanchedalmond : '#ffebcd',
            blue : '#00f',
            blueviolet : '#8a2be2',
            brown : '#a52a2a',
            burlywood : '#deb887',
            cadetblue : '#5f9ea0',
            chartreuse : '#7fff00',
            chocolate : '#d2691e',
            coral : '#ff7f50',
            cornflowerblue : '#6495ed',
            cornsilk : '#fff8dc',
            crimson : '#dc143c',
            cyan : '#0ff',
            darkblue : '#00008b',
            darkcyan : '#008b8b',
            darkgoldenrod : '#b8860b',
            darkgray : '#a9a9a9',
            darkgrey : '#a9a9a9',
            darkgreen : '#006400',
            darkkhaki : '#bdb76b',
            darkmagenta : '#8b008b',
            darkolivegreen : '#556b2f',
            darkorange : '#ff8c00',
            darkorchid : '#9932cc',
            darkred : '#8b0000',
            darksalmon : '#e9967a',
            darkseagreen : '#8fbc8f',
            darkslateblue : '#483d8b',
            darkslategray : '#2f4f4f',
            darkslategrey : '#2f4f4f',
            darkturquoise : '#00ced1',
            darkviolet : '#9400d3',
            deeppink : '#ff1493',
            deepskyblue : '#00bfff',
            dimgray : '#696969',
            dimgrey : '#696969',
            dodgerblue : '#1e90ff',
            firebrick : '#b22222',
            floralwhite : '#fffaf0',
            forestgreen : '#228b22',
            fuchsia : '#f0f',
            gainsboro : '#dcdcdc',
            ghostwhite : '#f8f8ff',
            gold : '#ffd700',
            goldenrod : '#daa520',
            gray : '#808080',
            grey : '#808080',
            green : '#008000',
            greenyellow : '#adff2f',
            honeydew : '#f0fff0',
            hotpink : '#ff69b4',
            indianred : '#cd5c5c',
            indigo : '#4b0082',
            ivory : '#fffff0',
            khaki : '#f0e68c',
            lavender : '#e6e6fa',
            lavenderblush : '#fff0f5',
            lawngreen : '#7cfc00',
            lemonchiffon : '#fffacd',
            lightblue : '#add8e6',
            lightcoral : '#f08080',
            lightcyan : '#e0ffff',
            lightgoldenrodyellow : '#fafad2',
            lightgray : '#d3d3d3',
            lightgrey : '#d3d3d3',
            lightgreen : '#90ee90',
            lightpink : '#ffb6c1',
            lightsalmon : '#ffa07a',
            lightseagreen : '#20b2aa',
            lightskyblue : '#87cefa',
            lightslategray : '#789',
            lightslategrey : '#789',
            lightsteelblue : '#b0c4de',
            lightyellow : '#ffffe0',
            lime : '#0f0',
            limegreen : '#32cd32',
            linen : '#faf0e6',
            magenta : '#f0f',
            maroon : '#800000',
            mediumaquamarine : '#66cdaa',
            mediumblue : '#0000cd',
            mediumorchid : '#ba55d3',
            mediumpurple : '#9370d8',
            mediumseagreen : '#3cb371',
            mediumslateblue : '#7b68ee',
            mediumspringgreen : '#00fa9a',
            mediumturquoise : '#48d1cc',
            mediumvioletred : '#c71585',
            midnightblue : '#191970',
            mintcream : '#f5fffa',
            mistyrose : '#ffe4e1',
            moccasin : '#ffe4b5',
            navajowhite : '#ffdead',
            navy : '#000080',
            oldlace : '#fdf5e6',
            olive : '#808000',
            olivedrab : '#6b8e23',
            orange : '#ffa500',
            orangered : '#ff4500',
            orchid : '#da70d6',
            palegoldenrod : '#eee8aa',
            palegreen : '#98fb98',
            paleturquoise : '#afeeee',
            palevioletred : '#d87093',
            papayawhip : '#ffefd5',
            peachpuff : '#ffdab9',
            peru : '#cd853f',
            pink : '#ffc0cb',
            plum : '#dda0dd',
            powderblue : '#b0e0e6',
            purple : '#800080',
            red : '#f00',
            rosybrown : '#bc8f8f',
            royalblue : '#4169e1',
            saddlebrown : '#8b4513',
            salmon : '#fa8072',
            sandybrown : '#f4a460',
            seagreen : '#2e8b57',
            seashell : '#fff5ee',
            sienna : '#a0522d',
            silver : '#c0c0c0',
            skyblue : '#87ceeb',
            slateblue : '#6a5acd',
            slategray : '#708090',
            slategrey : '#708090',
            snow : '#fffafa',
            springgreen : '#00ff7f',
            steelblue : '#4682b4',
            tan : '#d2b48c',
            teal : '#008080',
            thistle : '#d8bfd8',
            tomato : '#ff6347',
            turquoise : '#40e0d0',
            violet : '#ee82ee',
            wheat : '#f5deb3',
            white : '#fff',
            whitesmoke : '#f5f5f5',
            yellow : '#ff0',
            yellowgreen : '#9acd32'
        };
    },

    /**
     * APIMethod: customPalette
     * 自定义调色板。
     *
     * Parameters:
     * userPalete - {Array} 颜色板。
     */
    customPalette: function(userPalete){
        this.palette = userPalete;
    },

    /**
     * APIMethod: resetPalette
     * 复位默认色板。
     *
     */
    resetPalette: function(){
        this.palette = this._palette;
    },

    /**
     * APIMethod: getColor
     * 获取色板颜色。
     *
     * Parameters:
     * idx - {Number} 色板位置。
     * userPalete - {Array} 色板。
     *
     * Returns:
     * {String} 颜色值。
     */
    getColor: function(idx, userPalete){
        idx = idx | 0;
        userPalete = userPalete || this.palette;
        return userPalete[idx % userPalete.length];
    },

    /**
     * APIMethod: customHighlight
     * 自定义默认高亮颜色。
     *
     * Parameters:
     * userHighlightColor - {String} 自定义高亮色。
     */
    customHighlight: function(userHighlightColor){
        this.highlightColor = userHighlightColor;
    },

    /**
     * APIMethod: resetHighlight
     * 重置默认高亮颜色。将当前的高亮色作为默认高亮颜色
     *
     */
    resetHighlight: function(){
        this.highlightColor = this._highlightColor;
    },

    /**
     * APIMethod: getHighlightColor
     * 获取默认高亮颜色
     *
     * Returns:
     * {String} 颜色值。
     */
    getHighlightColor: function(){
        return this.highlightColor;
    },

    /**
     * APIMethod: getRadialGradient
     * 径向渐变。
     *
     * Parameters:
     * x0 - {Number} 渐变起点。
     * y0 - {Number}
     * r0 - {Number}
     * x1 - {Number} 渐变终点。
     * y1 - {Number}
     * r1 - {Number}
     * colorList - {Array} 颜色列表。
     *
     * Returns:
     * {CanvasGradient} Cavans 渐变颜色。
     */
    getRadialGradient: function(x0, y0, r0, x1, y1, r1, colorList){
        var util = this.util;

        if (!this._ctx) {
            this._ctx = util.getContext();
        }
        var gradient = this._ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        for (var i = 0, l = colorList.length; i < l; i++) {
            gradient.addColorStop(colorList[i][0], colorList[i][1]);
        }
        gradient.__nonRecursion = true;
        return gradient;
    },


    /**
     * APIMethod: getLinearGradient
     * 线性渐变。
     *
     * Parameters:
     * x0 - {Number} 渐变起点。
     * y0 - {Number}
     * x1 - {Number} 渐变终点。
     * y1 - {Number}
     * colorList - {Array} 颜色列表。
     *
     * Returns:
     * {CanvasGradient} Cavans 渐变颜色。
     */
    getLinearGradient: function(x0, y0, x1, y1, colorList){
        var util = this.util;

        if (!this._ctx) {
            this._ctx = util.getContext();
        }
        var gradient = this._ctx.createLinearGradient(x0, y0, x1, y1);
        for (var i = 0, l = colorList.length; i < l; i++) {
            gradient.addColorStop(colorList[i][0], colorList[i][1]);
        }
        gradient.__nonRecursion = true;
        return gradient;
    },

    /**
     * APIMethod: getStepColors
     * 获取两种颜色之间渐变颜色数组。
     *
     * Parameters:
     * start - {color} 起始颜色。
     * end - {color} 结束颜色。
     * step - {Number} 渐变级数。
     * colorList - {Array} 颜色列表。
     *
     * Returns:
     * {Array} 颜色数组。
     */
    getStepColors: function(start, end, step){
        start = this.toRGBA(start);
        end = this.toRGBA(end);
        start = this.getData(start);
        end = this.getData(end);

        var colors = [];
        var stepR = (end[0] - start[0]) / step;
        var stepG = (end[1] - start[1]) / step;
        var stepB = (end[2] - start[2]) / step;
        var stepA = (end[3] - start[3]) / step;
        // 生成颜色集合
        // fix by linfeng 颜色堆积
        for (var i = 0, r = start[0], g = start[1], b = start[2], a = start[3]; i < step; i++) {
            colors[i] = this.toColor([
                this.adjust(Math.floor(r), [ 0, 255 ]),
                this.adjust(Math.floor(g), [ 0, 255 ]),
                this.adjust(Math.floor(b), [ 0, 255 ]),
                a.toFixed(4) - 0
            ],'rgba');
            r += stepR;
            g += stepG;
            b += stepB;
            a += stepA;
        }
        r = end[0];
        g = end[1];
        b = end[2];
        a = end[3];
        colors[i] = this.toColor([r, g, b, a], 'rgba');
        return colors;
    },

    /**
     * APIMethod: getGradientColors
     * 获取指定级数的渐变颜色数组。
     *
     * Parameters:
     * colors - {Array{String}} 颜色组。
     * step - {Number}  渐变级数，默认值 20。
     *
     * Returns:
     * {Array{String}} 颜色数组。
     */
    getGradientColors: function(colors, step){
        var ret = [];
        var len = colors.length;
        if (step === undefined) {
            step = 20;
        }
        if (len === 1) {
            ret = this.getStepColors(colors[0], colors[0], step);
        }
        else if (len > 1) {
            for (var i = 0, n = len - 1; i < n; i++) {
                var steps = this.getStepColors(colors[i], colors[i + 1], step);
                if (i < n - 1) {
                    steps.pop();
                }
                ret = ret.concat(steps);
            }
        }
        return ret;
    },

    /**
     * APIMethod: toColor
     *  颜色值数组转为指定格式颜色。
     *
     * Parameters:
     * data - {Array} 颜色值数组。
     * format - {String}  格式，默认rgb
     *
     * Returns:
     * {String} 颜色。
     */
    toColor: function(data, format){
        format = format || 'rgb';
        if (data && (data.length === 3 || data.length === 4)) {
            data = this.map(data,
                function(c) {
                    return c > 1 ? Math.ceil(c) : c;
                }
            );

            if (format.indexOf('hex') > -1) {
                return '#' + ((1 << 24) + (data[0] << 16) + (data[1] << 8) + (+data[2])).toString(16).slice(1);
            }
            else if (format.indexOf('hs') > -1) {
                var sx = this.map(data.slice(1, 3),
                    function(c) {
                        return c + '%';
                    }
                );
                data[1] = sx[0];
                data[2] = sx[1];
            }

            if (format.indexOf('a') > -1) {
                if (data.length === 3) {
                    data.push(1);
                }
                data[3] = this.adjust(data[3], [ 0, 1 ]);
                return format + '(' + data.slice(0, 4).join(',') + ')';
            }

            return format + '(' + data.slice(0, 3).join(',') + ')';
        }
    },

    /**
     * APIMethod: toArray
     *  颜色字符串转换为rgba数组。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {Array{Number}} 颜色值数组。
     */
    toArray: function(color){
        color = this.trim(color);
        if (color.indexOf('rgba') < 0) {
            color = this.toRGBA(color);
        }

        var data = [];
        var i = 0;
        color.replace(/[\d.]+/g, function (n) {
            if (i < 3) {
                n = n | 0;
            }
            else {
                // Alpha
                n = +n;
            }
            data[i++] = n;
        });
        return data;
    },

    /**
     * APIMethod: convert
     *  颜色格式转化。
     *
     * Parameters:
     * color - {String} 颜色值数组。
     * format - {String} 格式，默认rgb
     *
     * Returns:
     * {String} 颜色。
     */
    convert: function(color, format){
        if (!this.isCalculableColor(color)) {
            return color;
        }
        var data = this.getData(color);
        var alpha = data[3];
        if (typeof alpha === 'undefined') {
            alpha = 1;
        }

        if (color.indexOf('hsb') > -1) {
            data = this._HSV_2_RGB(data);
        }
        else if (color.indexOf('hsl') > -1) {
            data = this._HSL_2_RGB(data);
        }

        if (format.indexOf('hsb') > -1 || format.indexOf('hsv') > -1) {
            data = this._RGB_2_HSB(data);
        }
        else if (format.indexOf('hsl') > -1) {
            data = this._RGB_2_HSL(data);
        }

        data[3] = alpha;

        return this.toColor(data, format);
    },

    /**
     * APIMethod: toRGBA
     *  转换为rgba格式的颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} rgba颜色，rgba(r,g,b,a)。
     */
    toRGBA: function(color){
        return this.convert(color, 'rgba');
    },

    /**
     * APIMethod: toRGB
     *  转换为rgb数字格式的颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} rgb颜色，rgb(0,0,0)格式
     */
    toRGB: function(color){
        return this.convert(color, 'rgb');
    },

    /**
     * APIMethod: toHex
     *  转换为16进制颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} 16进制颜色，#rrggbb格式
     */
    toHex: function(color){
        return this.convert(color, 'hex');
    },

    /**
     * APIMethod: toHSVA
     *  转换为HSV颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} HSVA颜色，hsva(h,s,v,a)
     */
    toHSVA: function(color){
        return this.convert(color, 'hsva');
    },

    /**
     * APIMethod: toHSV
     *  转换为HSV颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} HSV颜色，hsv(h,s,v)
     */
    toHSV: function(color){
        return this.convert(color, 'hsv');
    },

    /**
     * APIMethod: toHSBA
     *  转换为HSBA颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} HSBA颜色，hsba(h,s,b,a)
     */
    toHSBA: function(color){
        return this.convert(color, 'hsba');
    },

    /**
     * APIMethod: toHSB
     *  转换为HSB颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} HSB颜色，hsb(h,s,b)
     */
    toHSB: function(color){
        return this.convert(color, 'hsb');
    },

    /**
     * APIMethod: toHSLA
     *  转换为HSLA颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} HSLA颜色，hsla(h,s,l,a)
     */
    toHSLA: function(color){
        return this.convert(color, 'hsla');
    },

    /**
     * APIMethod: toHSL
     *  转换为HSL颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} HSL颜色，hsl(h,s,l)
     */
    toHSL: function(color){
        return this.convert(color, 'hsl');
    },

    /**
     * APIMethod: toName
     * 转换颜色名。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} 颜色名
     */
    toName: function(color){
        for (var key in this._nameColors) {
            if (this.toHex(this._nameColors[key]) === this.toHex(color)) {
                return key;
            }
        }
        return null;
    },

    /**
     * APIMethod: trim
     * 移除颜色中多余空格。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} 无空格颜色
     */
    trim: function(color){
        return String(color).replace(/\s+/g, '');
    },

    /**
     * APIMethod: normalize
     * 颜色规范化。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} 规范化后的颜色
     */
    normalize: function(color){
        // 颜色名
        if (this._nameColors[color]) {
            color = this._nameColors[color];
        }
        // 去掉空格
        color = this.trim(color);
        // hsv与hsb等价
        color = color.replace(/hsv/i, 'hsb');
        // rgb转为rrggbb
        if (/^#[\da-f]{3}$/i.test(color)) {
            color = parseInt(color.slice(1), 16);
            var r = (color & 0xf00) << 8;
            var g = (color & 0xf0) << 4;
            var b = color & 0xf;

            color = '#' + ((1 << 24) + (r << 4) + r + (g << 4) + g + (b << 4) + b).toString(16).slice(1);
        }
        // 或者使用以下正则替换，不过 chrome 下性能相对差点
        // color = color.replace(/^#([\da-f])([\da-f])([\da-f])$/i, '#$1$1$2$2$3$3');
        return color;
    },

    /**
     * APIMethod: lift
     * 颜色加深或减淡，当level>0加深，当level<0减淡。
     *
     * Parameters:
     * color - {String} 颜色。
     * level - {Number} 升降程度,取值区间[-1,1]。
     *
     * Returns:
     * {String} 加深或减淡后颜色值
     */
    lift: function(color, level){
        if (!this.isCalculableColor(color)) {
            return color;
        }
        var direct = level > 0 ? 1 : -1;
        if (typeof level === 'undefined') {
            level = 0;
        }
        level = Math.abs(level) > 1 ? 1 : Math.abs(level);
        color = this.toRGB(color);
        var data = this.getData(color);
        for (var i = 0; i < 3; i++) {
            if (direct === 1) {
                data[i] = data[i] * (1 - level) | 0;
            }
            else {
                data[i] = ((255 - data[i]) * level + data[i]) | 0;
            }
        }
        return 'rgb(' + data.join(',') + ')';
    },

    /**
     * APIMethod: reverse
     * 颜色翻转,[255-r,255-g,255-b,1-a]
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} 翻转颜色
     */
    reverse: function(color){
        if (!this.isCalculableColor(color)) {
            return color;
        }
        var data = this.getData(this.toRGBA(color));
        data = this.map(data,
            function(c) {
                return 255 - c;
            }
        );
        return this.toColor(data, 'rgb');
    },

    /**
     * APIMethod: reverse
     * 简单两种颜色混合
     *
     * Parameters:
     * color1 - {String} 第一种颜色。
     * color2 - {String} 第二种颜色。
     * weight - {Number} 混合权重[0-1]。
     *
     * Returns:
     * {String} 结果色,rgb(r,g,b)或rgba(r,g,b,a)
     */
    mix: function(color1, color2, weight){
        if (!this.isCalculableColor(color1) || !this.isCalculableColor(color2)) {
            return color1;
        }

        if (typeof weight === 'undefined') {
            weight = 0.5;
        }
        weight = 1 - this.adjust(weight, [ 0, 1 ]);

        var w = weight * 2 - 1;
        var data1 = this.getData(this.toRGBA(color1));
        var data2 = this.getData(this.toRGBA(color2));

        var d = data1[3] - data2[3];

        var weight1 = (((w * d === -1) ? w : (w + d) / (1 + w * d)) + 1) / 2;
        var weight2 = 1 - weight1;

        var data = [];

        for (var i = 0; i < 3; i++) {
            data[i] = data1[i] * weight1 + data2[i] * weight2;
        }

        var alpha = data1[3] * weight + data2[3] * (1 - weight);
        alpha = Math.max(0, Math.min(1, alpha));

        if (data1[3] === 1 && data2[3] === 1) {// 不考虑透明度
            return this.toColor(data, 'rgb');
        }
        data[3] = alpha;
        return this.toColor(data, 'rgba');
    },

    /**
     * APIMethod: random
     * 随机颜色
     *
     * Returns:
     * {String} 颜色值，#rrggbb格式
     */
    random: function(){
        return '#' + Math.random().toString(16).slice(2, 8);
    },

    /**
     * APIMethod: getData
     * 获取颜色值数组,返回值范围:
     *
     * RGB 范围[0-255]
     *
     * HSL/HSV/HSB 范围[0-1]
     *
     * A透明度范围[0-1]
     *
     * 支持格式：
     *
     * #rgb
     *
     * #rrggbb
     *
     * rgb(r,g,b)
     *
     * rgb(r%,g%,b%)
     *
     * rgba(r,g,b,a)
     *
     * hsb(h,s,b) // hsv与hsb等价
     *
     * hsb(h%,s%,b%)
     *
     * hsba(h,s,b,a)
     *
     * hsl(h,s,l)
     *
     * hsl(h%,s%,l%)
     *
     * hsla(h,s,l,a)
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {Array{Number}} 颜色值数组或null
     */
    getData: function(color){
        color = this.normalize(color);
        var r = color.match(this.colorRegExp);
        if (r === null) {
            throw new Error('The color format error'); // 颜色格式错误
        }
        var d;
        var a;
        var data = [];
        var rgb;

        if (r[2]) {
            // #rrggbb
            d = r[2].replace('#', '').split('');
            rgb = [ d[0] + d[1], d[2] + d[3], d[4] + d[5] ];
            data = this.map(rgb,
                function(c) {
                    return SuperMap.LevelRenderer.Tool.Color.prototype.adjust.call(this, parseInt(c, 16), [ 0, 255 ]);
                }
            );

        }
        else if (r[4]) {
            // rgb rgba
            var rgba = (r[4]).split(',');
            a = rgba[3];
            rgb = rgba.slice(0, 3);
            data = this.map(
                rgb,
                function(c) {
                    c = Math.floor(
                        c.indexOf('%') > 0 ? parseInt(c, 0) * 2.55 : c
                    );
                    return SuperMap.LevelRenderer.Tool.Color.prototype.adjust.call(this, c, [ 0, 255 ]);
                }
            );

            if (typeof a !== 'undefined') {
                data.push(this.adjust(parseFloat(a), [ 0, 1 ]));
            }
        }
        else if (r[5] || r[6]) {
            // hsb hsba hsl hsla
            var hsxa = (r[5] || r[6]).split(',');
            var h = parseInt(hsxa[0], 0) / 360;
            var s = hsxa[1];
            var x = hsxa[2];
            a = hsxa[3];
            data = this.map([ s, x ],
                function(c) {
                    return SuperMap.LevelRenderer.Tool.Color.prototype.adjust.call(this, parseFloat(c) / 100, [ 0, 1 ]);
                }
            );
            data.unshift(h);
            if (typeof a !== 'undefined') {
                data.push(this.adjust(parseFloat(a), [ 0, 1 ]));
            }
        }
        return data;
    },

    /**
     * APIMethod: alpha
     * 设置颜色透明度
     *
     * Parameters:
     * color - {String} 颜色。
     * a - {Number} 透明度,区间[0,1]。
     *
     * Returns:
     * {String} rgba颜色值
     */
    alpha: function(color, a){
        if (!this.isCalculableColor(color)) {
            return color;
        }
        if (a === null) {
            a = 1;
        }
        var data = this.getData(this.toRGBA(color));
        data[3] = this.adjust(Number(a).toFixed(4), [ 0, 1 ]);

        return this.toColor(data, 'rgba');
    },

    /**
     * APIMethod: map
     * 数组映射
     *
     * Parameters:
     * array - {String} 数组。
     * fun - {Number} 函数。
     *
     * Returns:
     * {String} 数组映射结果
     */
    map: function(array, fun){
        if (typeof fun !== 'function') {
            throw new TypeError();
        }
        var len = array ? array.length : 0;
        for (var i = 0; i < len; i++) {
            array[i] = fun(array[i]);
        }
        return array;
    },

    /**
     * APIMethod: adjust
     * 调整值区间
     *
     * Parameters:
     * value - {Number} 数组。
     * region - {Array(Number)} 区间。
     *
     * Returns:
     * {Number} 调整后的值
     */
    adjust: function(value, region){
        // < to <= & > to >=
        // modify by linzhifeng 2014-05-25 because -0 == 0
        if (value <= region[0]) {
            value = region[0];
        }
        else if (value >= region[1]) {
            value = region[1];
        }
        return value;
    },

    /**
     * APIMethod: isCalculableColor
     * 判断是否是可计算的颜色
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {Boolean} 是否是可计算的颜色
     */
    isCalculableColor: function(color){
        return color instanceof Array || typeof color === 'string';
    },

    /**
     * APIMethod: _HSV_2_RGB
     * 参见 http:// www.easyrgb.com/index.php?X=MATH
     */
    _HSV_2_RGB: function(data){
        var H = data[0];
        var S = data[1];
        var V = data[2];
        // HSV from 0 to 1
        var R;
        var G;
        var B;
        if (S === 0) {
            R = V * 255;
            G = V * 255;
            B = V * 255;
        }
        else {
            var h = H * 6;
            if (h === 6) {
                h = 0;
            }
            var i = h | 0;
            var v1 = V * (1 - S);
            var v2 = V * (1 - S * (h - i));
            var v3 = V * (1 - S * (1 - (h - i)));
            var r = 0;
            var g = 0;
            var b = 0;

            if (i === 0) {
                r = V;
                g = v3;
                b = v1;
            }
            else if (i === 1) {
                r = v2;
                g = V;
                b = v1;
            }
            else if (i === 2) {
                r = v1;
                g = V;
                b = v3;
            }
            else if (i === 3) {
                r = v1;
                g = v2;
                b = V;
            }
            else if (i === 4) {
                r = v3;
                g = v1;
                b = V;
            }
            else {
                r = V;
                g = v1;
                b = v2;
            }

            // RGB results from 0 to 255
            R = r * 255;
            G = g * 255;
            B = b * 255;
        }
        return [ R, G, B ];
    },

    /**
     * APIMethod: _HSL_2_RGB
     * 参见 http:// www.easyrgb.com/index.php?X=MATH
     */
    _HSL_2_RGB: function(data){
        var H = data[0];
        var S = data[1];
        var L = data[2];
        // HSL from 0 to 1
        var R;
        var G;
        var B;
        if (S === 0) {
            R = L * 255;
            G = L * 255;
            B = L * 255;
        }
        else {
            var v2;
            if (L < 0.5) {
                v2 = L * (1 + S);
            }
            else {
                v2 = (L + S) - (S * L);
            }

            var v1 = 2 * L - v2;

            R = 255 * this._HUE_2_RGB(v1, v2, H + (1 / 3));
            G = 255 * this._HUE_2_RGB(v1, v2, H);
            B = 255 * this._HUE_2_RGB(v1, v2, H - (1 / 3));
        }
        return [ R, G, B ];
    },

    /**
     * APIMethod: _HUE_2_RGB
     * 参见 http:// www.easyrgb.com/index.php?X=MATH
     */
    _HUE_2_RGB: function(v1, v2, vH){
        if (vH < 0) {
            vH += 1;
        }
        if (vH > 1) {
            vH -= 1;
        }
        if ((6 * vH) < 1) {
            return (v1 + (v2 - v1) * 6 * vH);
        }
        if ((2 * vH) < 1) {
            return (v2);
        }
        if ((3 * vH) < 2) {
            return (v1 + (v2 - v1) * ((2 / 3) - vH) * 6);
        }
        return v1;
    },

    /**
     * APIMethod: _RGB_2_HSB
     * 参见 http:// www.easyrgb.com/index.php?X=MATH
     */
    _RGB_2_HSB: function(data){
        // RGB from 0 to 255
        var R = (data[0] / 255);
        var G = (data[1] / 255);
        var B = (data[2] / 255);

        var vMin = Math.min(R, G, B); // Min. value of RGB
        var vMax = Math.max(R, G, B); // Max. value of RGB
        var delta = vMax - vMin; // Delta RGB value
        var V = vMax;
        var H;
        var S;

        // HSV results from 0 to 1
        if (delta === 0) {
            H = 0;
            S = 0;
        }
        else {
            S = delta / vMax;

            var deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
            var deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
            var deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;

            if (R === vMax) {
                H = deltaB - deltaG;
            }
            else if (G === vMax) {
                H = (1 / 3) + deltaR - deltaB;
            }
            else if (B === vMax) {
                H = (2 / 3) + deltaG - deltaR;
            }

            if (H < 0) {
                H += 1;
            }
            if (H > 1) {
                H -= 1;
            }
        }
        H = H * 360;
        S = S * 100;
        V = V * 100;
        return [ H, S, V ];
    },

    /**
     * APIMethod: _RGB_2_HSL
     * 参见 http:// www.easyrgb.com/index.php?X=MATH
     */
    _RGB_2_HSL: function(data){

        // RGB from 0 to 255
        var R = (data[0] / 255);
        var G = (data[1] / 255);
        var B = (data[2] / 255);

        var vMin = Math.min(R, G, B); // Min. value of RGB
        var vMax = Math.max(R, G, B); // Max. value of RGB
        var delta = vMax - vMin; // Delta RGB value

        var L = (vMax + vMin) / 2;
        var H;
        var S;
        // HSL results from 0 to 1
        if (delta === 0) {
            H = 0;
            S = 0;
        }
        else {
            if (L < 0.5) {
                S = delta / (vMax + vMin);
            }
            else {
                S = delta / (2 - vMax - vMin);
            }

            var deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
            var deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
            var deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;

            if (R === vMax) {
                H = deltaB - deltaG;
            }
            else if (G === vMax) {
                H = (1 / 3) + deltaR - deltaB;
            }
            else if (B === vMax) {
                H = (2 / 3) + deltaG - deltaR;
            }

            if (H < 0) {
                H += 1;
            }

            if (H > 1) {
                H -= 1;
            }
        }

        H = H * 360;
        S = S * 100;
        L = L * 100;

        return [ H, S, L ];
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Tool.Color"
});


