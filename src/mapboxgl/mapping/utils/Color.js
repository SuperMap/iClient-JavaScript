/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Tool.Color
 * LevelRenderer 工具-颜色辅助类
 *
 */

let Color = {

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
  toColor: function (data, format) {
    format = format || 'rgb';
    if (data && (data.length === 3 || data.length === 4)) {
      data = this.map(data, function (c) {
        return c > 1 ? Math.ceil(c) : c;
      });

      if (format.indexOf('hex') > -1) {
        return '#' + ((1 << 24) + (data[0] << 16) + (data[1] << 8) + +data[2]).toString(16).slice(1);
      } else if (format.indexOf('hs') > -1) {
        var sx = this.map(data.slice(1, 3), function (c) {
          return c + '%';
        });
        data[1] = sx[0];
        data[2] = sx[1];
      }

      if (format.indexOf('a') > -1) {
        if (data.length === 3) {
          data.push(1);
        }
        data[3] = this.adjust(data[3], [0, 1]);
        return format + '(' + data.slice(0, 4).join(',') + ')';
      }

      return format + '(' + data.slice(0, 3).join(',') + ')';
    }
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
  convert: function (color, format) {
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
    } else if (color.indexOf('hsl') > -1) {
      data = this._HSL_2_RGB(data);
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
  toRGBA: function (color) {
    return this.convert(color, 'rgba');
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
  trim: function (color) {
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
  normalize: function (color) {
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
  getData: function (color) {
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
      rgb = [d[0] + d[1], d[2] + d[3], d[4] + d[5]];
      data = this.map(rgb, function (c) {
        return Color.adjust.call(this, parseInt(c, 16), [0, 255]);
      });
    } else if (r[4]) {
      // rgb rgba
      var rgba = r[4].split(',');
      a = rgba[3];
      rgb = rgba.slice(0, 3);
      data = this.map(rgb, function (c) {
        c = Math.floor(c.indexOf('%') > 0 ? parseInt(c, 0) * 2.55 : c);
        return Color.adjust.call(this, c, [0, 255]);
      });

      if (typeof a !== 'undefined') {
        data.push(this.adjust(parseFloat(a), [0, 1]));
      }
    } else if (r[5] || r[6]) {
      // hsb hsba hsl hsla
      var hsxa = (r[5] || r[6]).split(',');
      var h = parseInt(hsxa[0], 0) / 360;
      var s = hsxa[1];
      var x = hsxa[2];
      a = hsxa[3];
      data = this.map([s, x], function (c) {
        return Color.adjust.call(this, parseFloat(c) / 100, [0, 1]);
      });
      data.unshift(h);
      if (typeof a !== 'undefined') {
        data.push(this.adjust(parseFloat(a), [0, 1]));
      }
    }
    return data;
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
  map: function (array, fun) {
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
  adjust: function (value, region) {
    // < to <= & > to >=
    // modify by linzhifeng 2014-05-25 because -0 == 0
    if (value <= region[0]) {
      value = region[0];
    } else if (value >= region[1]) {
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
  isCalculableColor: function (color) {
    return color instanceof Array || typeof color === 'string';
  },

  /**
   * APIMethod: _HSV_2_RGB
   * 参见 http:// www.easyrgb.com/index.php?X=MATH
   */
  _HSV_2_RGB: function (data) {
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
    } else {
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
      } else if (i === 1) {
        r = v2;
        g = V;
        b = v1;
      } else if (i === 2) {
        r = v1;
        g = V;
        b = v3;
      } else if (i === 3) {
        r = v1;
        g = v2;
        b = V;
      } else if (i === 4) {
        r = v3;
        g = v1;
        b = V;
      } else {
        r = V;
        g = v1;
        b = v2;
      }

      // RGB results from 0 to 255
      R = r * 255;
      G = g * 255;
      B = b * 255;
    }
    return [R, G, B];
  },

  /**
   * APIMethod: _HSL_2_RGB
   * 参见 http:// www.easyrgb.com/index.php?X=MATH
   */
  _HSL_2_RGB: function (data) {
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
    } else {
      var v2;
      if (L < 0.5) {
        v2 = L * (1 + S);
      } else {
        v2 = L + S - S * L;
      }

      var v1 = 2 * L - v2;

      R = 255 * this._HUE_2_RGB(v1, v2, H + 1 / 3);
      G = 255 * this._HUE_2_RGB(v1, v2, H);
      B = 255 * this._HUE_2_RGB(v1, v2, H - 1 / 3);
    }
    return [R, G, B];
  },

  /**
   * APIMethod: _HUE_2_RGB
   * 参见 http:// www.easyrgb.com/index.php?X=MATH
   */
  _HUE_2_RGB: function (v1, v2, vH) {
    if (vH < 0) {
      vH += 1;
    }
    if (vH > 1) {
      vH -= 1;
    }
    if (6 * vH < 1) {
      return v1 + (v2 - v1) * 6 * vH;
    }
    if (2 * vH < 1) {
      return v2;
    }
    if (3 * vH < 2) {
      return v1 + (v2 - v1) * (2 / 3 - vH) * 6;
    }
    return v1;
  },

  CLASS_NAME: 'SuperMap.LevelRenderer.Tool.Color'
};

Color.initialize();

export default Color;
