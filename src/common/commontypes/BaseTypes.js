import {SuperMap} from '../SuperMap';
/**
 *@namespace SuperMap
 */

/**
 * @description In addition to the mandatory C and P parameters, an arbitrary number of
 * objects can be passed, which will extend C.
 * @memberOf SuperMap
 * @param C - {Object} the class that inherits
 * @param P - {Object} the superclass to inherit from
 */
SuperMap.inherit = function (C, P) {
    var F = function () {
    };
    F.prototype = P.prototype;
    C.prototype = new F;
    var i, l, o;
    for (i = 2, l = arguments.length; i < l; i++) {
        o = arguments[i];
        if (typeof o === "function") {
            o = o.prototype;
        }
        SuperMap.Util.extend(C.prototype, o);
    }
};


/**
 * @description 实现多重继承
 * @memberOf SuperMap
 * @param ...mixins {Class|Object}继承的类
 */
SuperMap.mixin = function (...mixins) {

    class Mix {
        constructor(options) {
            for (var index = 0; index < mixins.length; index++) {
                copyProperties(this, new mixins[index](options));
            }
        }
    }

    for (var index = 0; index < mixins.length; index++) {
        var mixin = mixins[index];
        copyProperties(Mix, mixin);
        copyProperties(Mix.prototype, mixin.prototype);
        copyProperties(Mix.prototype, new mixin());
    }
    return Mix;

    function copyProperties(target, source) {
        var ownKeys = Object.getOwnPropertyNames(source);
        if (Object.getOwnPropertySymbols) {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source));
        }
        for (var index = 0; index < ownKeys.length; index++) {
            var key = ownKeys[index];
            if (key !== "constructor"
                && key !== "prototype"
                && key !== "name" && key !== "length") {
                let desc = Object.getOwnPropertyDescriptor(source, key);
                if (window["ActiveXObject"]) {
                    Object.defineProperty(target, key, desc || {});
                } else {
                    Object.defineProperty(target, key, desc);
                }
            }
        }
    }
};

/**
 * @name String
 * @memberOf SuperMap
 * @namespace
 * @description 字符串操作的一系列常用扩展函数.
 */
export var StringExt = SuperMap.String = {

    /**
     * @description 判断目标字符串是否以指定的子字符串开头.
     * @param str - {string} 目标字符串.
     * @param sub - {string} 查找的子字符串.
     * @returns {Boolean} 目标字符串以指定的子字符串开头,则返回true;否则返回false.
     */
    startsWith: function (str, sub) {
        return (str.indexOf(sub) == 0);
    },

    /**
     * @description 判断目标字符串是否包含指定的子字符串.
     * @param str - {string} 目标字符串.
     * @param sub - {string} 查找的子字符串.
     * @returns {Boolean} 目标字符串中包含指定的子字符串,则返回true;否则返回false.
     */
    contains: function (str, sub) {
        return (str.indexOf(sub) != -1);
    },

    /**
     * @description 删除一个字符串的开头和结尾处的所有空白字符.
     * @param str - {string} (可能)存在空白字符填塞的字符串.
     * @returns {string} 删除开头和结尾处空白字符后的字符串.
     */
    trim: function (str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    },

    /**
     * @description 骆驼式("-")连字符的字符串处理.
     * 例如: "chicken-head" becomes "chickenHead",
     *       "-chicken-head" becomes "ChickenHead".
     * @param str - {string} 要处理的字符串,原始内容不应被修改.
     * @returns {string}
     */
    camelize: function (str) {
        var oStringList = str.split('-');
        var camelizedString = oStringList[0];
        for (var i = 1, len = oStringList.length; i < len; i++) {
            var s = oStringList[i];
            camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
        }
        return camelizedString;
    },

    /**
     * @description 提供带 ${token} 标记的字符串, 返回context对象属性中指定标记的属性值.
     * @example
     * 示例:
     * (code)
     * 1、template = "${value,getValue}";
     *         context = {value: {getValue:function(){return Math.max.apply(null,argument);}}};
     *         args = [2,23,12,36,21];
     *       返回值:36
     * (end)
     * 示例:
     * (code)
     * 2、template = "$${{value,getValue}}";
     *         context = {value: {getValue:function(){return Math.max.apply(null,argument);}}};
     *         args = [2,23,12,36,21];
     *       返回值:"${36}"
     * (end)
     * 示例:
     * (code)
     * 3、template = "${a,b}";
     *         context = {a: {b:"format"}};
     *         args = null;
     *       返回值:"format"
     * (end)
     * 示例:
     * (code)
     * 3、template = "${a,b}";
     *         context = null;
     *         args = null;
     *       返回值:"${a.b}"
     * (end)
     * @param template - {string} 带标记的字符串将要被替换.参数 template 格式为"${token}",此处的 token 标记会替换为 context["token"] 属性的值
     * @param context - {Object} 带有属性的可选对象的属性用于匹配格式化字符串中的标记.如果该参数为空,将使用 window 对象.
     * @param args - {Array} 可选参数传递给在context对象上找到的函数.
     * @returns {string} 从 context 对象属性中替换字符串标记位的字符串.
     */
    format: function (template, context, args) {
        if (!context) {
            context = window;
        }

        // Example matching:
        // str   = ${foo.bar}
        // match = foo.bar
        var replacer = function (str, match) {
            var replacement;

            // Loop through all subs. Example: ${a.b.c}
            // 0 -> replacement = context[a];
            // 1 -> replacement = context[a][b];
            // 2 -> replacement = context[a][b][c];
            var subs = match.split(/\.+/);
            for (var i = 0; i < subs.length; i++) {
                if (i == 0) {
                    replacement = context;
                }

                replacement = replacement[subs[i]];
            }

            if (typeof replacement === "function") {
                replacement = args ?
                    replacement.apply(null, args) :
                    replacement();
            }

            // If replacement is undefined, return the string 'undefined'.
            // This is a workaround for a bugs in browsers not properly
            // dealing with non-participating groups in regular expressions:
            // http://blog.stevenlevithan.com/archives/npcg-javascript
            if (typeof replacement == 'undefined') {
                return 'undefined';
            } else {
                return replacement;
            }
        };

        return template.replace(SuperMap.String.tokenRegEx, replacer);
    },

    /**
     * @description Used to find tokens in a string.
     * @default  /\$\{([\w.]+?)\}/g
     * @example
     * Examples: ${a}, ${a.b.c}, ${a-b}, ${5}
     */
    tokenRegEx: /\$\{([\w.]+?)\}/g,

    /**
     * @description Used to test strings as numbers.
     * @default  /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/
     */
    numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,

    /**
     * @description 判断一个字符串是否只包含一个数值.
     * @example
     * (code)
     * SuperMap.String.isNumeric("6.02e23") // true
     * SuperMap.String.isNumeric("12 dozen") // false
     * SuperMap.String.isNumeric("4") // true
     * SuperMap.String.isNumeric(" 4 ") // false
     * (end)
     * @returns {Boolean} 字符串包含唯一的数值,返回true;否则返回false.
     */
    isNumeric: function (value) {
        return SuperMap.String.numberRegEx.test(value);
    },

    /**
     * @description 把一个看似数值型的字符串转化为一个数值.
     *
     * @returns {number|string} 如果能转换为数值则返回数值,否则返回字符串本身.
     */
    numericIf: function (value) {
        return SuperMap.String.isNumeric(value) ? parseFloat(value) : value;
    }

};

/**
 * @name Number
 * @memberOf SuperMap
 * @namespace
 * @description 数值操作的一系列常用扩展函数.
 */
export var NumberExt = SuperMap.Number = {

    /**
     *  @description 格式化数字时默认的小数点分隔符.
     *  @constant
     *  @default "."
     */
    decimalSeparator: ".",

    /**
     *  @description 格式化数字时默认的千位分隔符.
     *  @constant
     *  @default ","
     */
    thousandsSeparator: ",",

    /**
     * @description 限制浮点数的有效数字位数.
     * @param num - {number}
     * @param sig - {integer}
     * @returns {number} 将数字四舍五入到指定数量的有效位数.
     */
    limitSigDigs: function (num, sig) {
        var fig = 0;
        if (sig > 0) {
            fig = parseFloat(num.toPrecision(sig));
        }
        return fig;
    },

    /**
     * @description 数字格式化输出.
     * @param num  - {number}
     * @param dec  - {integer} 数字的小数部分四舍五入到指定的位数.默认为 0. 设置为null值时小数部分不变.
     * @param tsep - {string} 千位分隔符. 默认为",".
     * @param dsep - {string} 小数点分隔符. 默认为".".
     * @returns {string} 数字格式化后的字符串.
     */
    format: function (num, dec, tsep, dsep) {
        dec = (typeof dec != "undefined") ? dec : 0;
        tsep = (typeof tsep != "undefined") ? tsep :
            SuperMap.Number.thousandsSeparator;
        dsep = (typeof dsep != "undefined") ? dsep :
            SuperMap.Number.decimalSeparator;

        if (dec != null) {
            num = parseFloat(num.toFixed(dec));
        }

        var parts = num.toString().split(".");
        if (parts.length === 1 && dec == null) {
            // integer where we do not want to touch the decimals
            dec = 0;
        }

        var integer = parts[0];
        if (tsep) {
            var thousands = /(-?[0-9]+)([0-9]{3})/;
            while (thousands.test(integer)) {
                integer = integer.replace(thousands, "$1" + tsep + "$2");
            }
        }

        var str;
        if (dec == 0) {
            str = integer;
        } else {
            var rem = parts.length > 1 ? parts[1] : "0";
            if (dec != null) {
                rem = rem + new Array(dec - rem.length + 1).join("0");
            }
            str = integer + dsep + rem;
        }
        return str;
    }
};

if (!Number.prototype.limitSigDigs) {
    /**
     * APIMethod: Number.limitSigDigs
     * 限制浮点数的有效数字位数.
     * @param sig - {integer}
     * @returns {integer} 将数字四舍五入到指定数量的有效位数.
     *           如果传入值为 null、0、或者是负数, 返回值 0
     */
    Number.prototype.limitSigDigs = function (sig) {
        return NumberExt.limitSigDigs(this, sig);
    };
}

/**
 * @name Function
 * @memberOf SuperMap
 * @namespace
 * @description 函数操作的一系列常用扩展函数.
 */
export var FunctionExt = SuperMap.Function = {
    /**
     * @description 绑定函数到对象.方便创建this的作用域.
     * @param func - {function} 输入函数.
     * @param object - {Object} 对象绑定到输入函数(作为输入函数的this对象).
     * @returns {function} object参数作为func函数的this对象.
     */
    bind: function (func, object) {
        // create a reference to all arguments past the second one
        var args = Array.prototype.slice.apply(arguments, [2]);
        return function () {
            // Push on any additional arguments from the actual function call.
            // These will come after those sent to the bind call.
            var newArgs = args.concat(
                Array.prototype.slice.apply(arguments, [0])
            );
            return func.apply(object, newArgs);
        };
    },

    /**
     * @description 绑定函数到对象,在调用该函数时配置并使用事件对象作为第一个参数.
     * @param func - {function} 用于监听事件的函数.
     * @param object - {Object} this 对象的引用.
     * @returns {function}
     */
    bindAsEventListener: function (func, object) {
        return function (event) {
            return func.call(object, event || window.event);
        };
    },

    /**
     * @description 该函数仅仅返回false.该函数主要是避免在IE8以下浏览中DOM事件句柄的匿名函数问题.
     * @example
     * document.onclick = SuperMap.Function.False;
     * @returns {Boolean}
     */
    False: function () {
        return false;
    },

    /**
     * @description 该函数仅仅返回true.该函数主要是避免在IE8以下浏览中DOM事件句柄的匿名函数问题.
     * @example
     * document.onclick = SuperMap.Function.True;
     * @returns {Boolean}
     */
    True: function () {
        return true;
    },

    /**
     * @description 可重用函数,仅仅返回"undefined".
     * @returns {undefined}
     */
    Void: function () {
    }

};

/**
 * @name Array
 * @memberOf SuperMap
 * @namespace
 * @description 数组操作的一系列常用扩展函数.
 */
export var ArrayExt = SuperMap.Array = {

    /**
     * @description 过滤数组.提供了ECMA-262标准中Array.prototype.filter函数的扩展.
     * @see {@link http://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/filter}
     * @param array - {Array} 要过滤的数组..
     * @param callback - {function} 数组中的每一个元素调用该函数.<br>
     *     如果函数的返回值为true,该元素将包含在返回的数组中.该函数有三个参数: 数组中的元素,元素的索引,数组自身.<br>
     *     如果设置了可选参数caller,在调用callback时,使用可选参数caller设置为callback的参数.<br>
     * @param caller - {Object} 在调用callback时,使用可选参数caller设置为callback的参数.
     * @returns {Array} callback函数返回true时的元素将作为返回数组中的元素.
     */
    filter: function (array, callback, caller) {
        var selected = [];
        if (Array.prototype.filter) {
            selected = array.filter(callback, caller);
        } else {
            var len = array.length;
            if (typeof callback != "function") {
                throw new TypeError();
            }
            for (var i = 0; i < len; i++) {
                if (i in array) {
                    var val = array[i];
                    if (callback.call(caller, val, i, array)) {
                        selected.push(val);
                    }
                }
            }
        }
        return selected;
    }

};
