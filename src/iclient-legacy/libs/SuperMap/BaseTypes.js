/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/** 
 * Header: BaseTypes
 * SuperMap 自定义类型扩展, 包含string, number, function and array.
 */

/**
 * Namespace: SuperMap.String
 * 字符串操作的一系列常用扩展函数.
 */
SuperMap.String = {

    /**
     * APIFunction: startsWith
     * 判断目标字符串是否以指定的子字符串开头. 
     * 
     * Parameters:
     * str - {String} 目标字符串.
     * sub - {String} 查找的子字符串.
     *  
     * Returns:
     * {Boolean} 目标字符串以指定的子字符串开头,则返回true;否则返回false.
     */
    startsWith: function(str, sub) {
        return (str.indexOf(sub) == 0);
    },

    /**
     * APIFunction: contains
     * 判断目标字符串是否包含指定的子字符串.
     * 
     * Parameters:
     * str - {String} 目标字符串.
     * sub - {String} 查找的子字符串.
     * 
     * Returns:
     * {Boolean} 目标字符串中包含指定的子字符串,则返回true;否则返回false.
     */
    contains: function(str, sub) {
        return (str.indexOf(sub) != -1);
    },
    
    /**
     * APIFunction: trim
     * 删除一个字符串的开头和结尾处的所有空白字符.
     * 
     * Parameters:
     * str - {String} (可能)存在空白字符填塞的字符串.
     * 
     * Returns:
     * {String} 删除开头和结尾处空白字符后的字符串.
     */
    trim: function(str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    },
    
    /**
     * APIFunction: camelize
     * 骆驼式("-")连字符的字符串处理. 
     * 例如: "chicken-head" becomes "chickenHead",
     *       "-chicken-head" becomes "ChickenHead".
     *
     * Parameters:
     * str - {String} 要处理的字符串,原始内容不应被修改.
     * 
     * Returns:
     * {String} 
     */
    camelize: function(str) {
        var oStringList = str.split('-');
        var camelizedString = oStringList[0];
        for (var i=1, len=oStringList.length; i<len; i++) {
            var s = oStringList[i];
            camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
        }
        return camelizedString;
    },
    
    /**
     * APIFunction: format
     * 提供带 ${token} 标记的字符串, 返回context对象属性中指定标记的属性值.
     *
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
	 *
     * Parameters:
     * template - {String} 带标记的字符串将要被替换.  
	 *                     参数 template 格式为"${token}",此处的 token 标记会替换为 context["token"] 属性的值
     * context - {Object} 带有属性的可选对象的属性用于匹配格式化字符串中的标记.
	 *                    如果该参数为空,将使用 window 对象.
     * args - {Array} 可选参数传递给在context对象上找到的函数. 
     *
     * Returns:
     * {String} 从 context 对象属性中替换字符串标记位的字符串.
     */
    format: function(template, context, args) {
        if(!context) {
            context = window;
        }

        // Example matching: 
        // str   = ${foo.bar}
        // match = foo.bar
        var replacer = function(str, match) {
            var replacement;

            // Loop through all subs. Example: ${a.b.c}
            // 0 -> replacement = context[a];
            // 1 -> replacement = context[a][b];
            // 2 -> replacement = context[a][b][c];
            var subs = match.split(/\.+/);
            for (var i=0; i< subs.length; i++) {
                if (i == 0) {
                    replacement = context;
                }

                replacement = replacement[subs[i]];
            }

            if(typeof replacement === "function") {
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
     * Property: tokenRegEx
     * Used to find tokens in a string.
     * Examples: ${a}, ${a.b.c}, ${a-b}, ${5}
     */
    tokenRegEx:  /\$\{([\w.]+?)\}/g,
    
    /**
     * Property: numberRegEx
     * Used to test strings as numbers.
     */
    numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,
    
    /**
     * APIFunction: isNumeric
     * 判断一个字符串是否只包含一个数值.
     *
     * 例如:
     * (code)
     * SuperMap.String.isNumeric("6.02e23") // true
     * SuperMap.String.isNumeric("12 dozen") // false
     * SuperMap.String.isNumeric("4") // true
     * SuperMap.String.isNumeric(" 4 ") // false
     * (end)
     *
     * Returns:
     * {Boolean} 字符串包含唯一的数值,返回true;否则返回false.
     */
    isNumeric: function(value) {
        return SuperMap.String.numberRegEx.test(value);
    },
    
    /**
     * APIFunction: numericIf
     * 把一个看似数值型的字符串转化为一个数值.
     * 
     * Returns
     * {Number|String} 如果能转换为数值则返回数值,否则返回字符串本身. 
     */
    numericIf: function(value) {
        return SuperMap.String.isNumeric(value) ? parseFloat(value) : value;
    }

};

/**
 * Namespace: SuperMap.Number
 * 数值操作的一系列常用扩展函数.
 */
SuperMap.Number = {

    /**
     * Property: decimalSeparator
     * 格式化数字时默认的小数点分隔符.
     */
    decimalSeparator: ".",
    
    /**
     * Property: thousandsSeparator
     * 格式化数字时默认的千位分隔符.
     */
    thousandsSeparator: ",",
    
    /**
     * APIFunction: limitSigDigs
     * 限制浮点数的有效数字位数.
     * 
     * Parameters:
     * num - {Float}
     * sig - {Integer}
     * 
     * Returns:
     * {Float} 将数字四舍五入到指定数量的有效位数.
     */
    limitSigDigs: function(num, sig) {
        var fig = 0;
        if (sig > 0) {
            fig = parseFloat(num.toPrecision(sig));
        }
        return fig;
    },
    
    /**
     * APIFunction: format
     * 数字格式化输出.
     * 
     * Parameters:
     * num  - {Float}
     * dec  - {Integer} 数字的小数部分四舍五入到指定的位数.
     *        默认为 0. 设置为null值时小数部分不变.
     * tsep - {String} 千位分隔符. 默认为",".
     * dsep - {String} 小数点分隔符. 默认为".".
     *
     * Returns:
     * {String} 数字格式化后的字符串.
     */
    format: function(num, dec, tsep, dsep) {
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
            while(thousands.test(integer)) { 
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
     * 
     * Parameters:
     * sig - {Integer}
     * 
     * Returns:
     * {Integer} 将数字四舍五入到指定数量的有效位数.
     *           如果传入值为 null、0、或者是负数, 返回值 0
     */
    Number.prototype.limitSigDigs = function(sig) {
        return SuperMap.Number.limitSigDigs(this, sig);
    };
}

/**
 * Namespace: SuperMap.Function
 * 函数操作的一系列常用扩展函数.
 */
SuperMap.Function = {
    /**
     * APIFunction: bind
	 * 绑定函数到对象.方便创建this的作用域.
     * 
     * Parameters:
     * func - {Function} 输入函数.
     * object - {Object} 对象绑定到输入函数(作为输入函数的this对象).
     * 
     * Returns:
     * {Function} object参数作为func函数的this对象.
     */
    bind: function(func, object) {
        // create a reference to all arguments past the second one
        var args = Array.prototype.slice.apply(arguments, [2]);
        return function() {
            // Push on any additional arguments from the actual function call.
            // These will come after those sent to the bind call.
            var newArgs = args.concat(
                Array.prototype.slice.apply(arguments, [0])
            );
            return func.apply(object, newArgs);
        };
    },
    
    /**
     * APIFunction: bindAsEventListener
     * 绑定函数到对象,在调用该函数时配置并使用事件对象作为第一个参数.
     * 
     * Parameters:
     * func - {Function} 用于监听事件的函数.
     * object - {Object} this 对象的引用.
     * 
     * Returns:
     * {Function}
     */
    bindAsEventListener: function(func, object) {
        return function(event) {
            return func.call(object, event || window.event);
        };
    },
    
    /**
     * APIFunction: False
	 * 该函数仅仅返回false.
	 * 该函数主要是避免在IE8以下浏览中DOM事件句柄的匿名函数问题.
     * 
     * 用法:
     * document.onclick = SuperMap.Function.False;
     * 
     * Returns:
     * {Boolean}
     */
    False : function() {
        return false;
    },

    /**
     * APIFunction: True
     * 该函数仅仅返回true.
	 * 该函数主要是避免在IE8以下浏览中DOM事件句柄的匿名函数问题.
     * 
     * 用法:
     * document.onclick = SuperMap.Function.True;
     * 
     * Returns:
     * {Boolean}
     */
    True : function() {
        return true;
    },
    
    /**
     * APIFunction: Void
     * 可重用函数,仅仅返回"undefined".
     *
     * Returns:
     * {undefined}
     */
    Void: function() {}

};

/**
 * Namespace: SuperMap.Array
 * 数组操作的一系列常用扩展函数.
 */
SuperMap.Array = {

    /**
     * APIMethod: filter
	 * 过滤数组.提供了ECMA-262标准中Array.prototype.filter函数的扩展.
     *
     * 基于众所周知的例子:
	 * http://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/filter
     *
     * Parameters:
     * array - {Array} 要过滤的数组..
     * callback - {Function} 数组中的每一个元素调用该函数.
	 *     如果函数的返回值为true,该元素将包含在返回的数组中.
	 *     该函数有三个参数: 数组中的元素,元素的索引,数组自身. 
	 *     如果设置了可选参数caller,在调用callback时,使用可选参数caller设置为callback的参数.
     * caller - {Object} 在调用callback时,使用可选参数caller设置为callback的参数.
     *
     * Returns:
     * {Array} callback函数返回true时的元素将作为返回数组中的元素.
     */
    filter: function(array, callback, caller) {
        var selected = [];
        if (Array.prototype.filter) {
            selected = array.filter(callback, caller);
        } else {
            var len = array.length;
            if (typeof callback != "function") {
                throw new TypeError();
            }
            for(var i=0; i<len; i++) {
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
