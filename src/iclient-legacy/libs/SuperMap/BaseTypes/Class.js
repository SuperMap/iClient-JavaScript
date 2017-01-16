/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/



/**
 * Constructor: SuperMap.Class
 * 所有 SuperMap 类的基类。
 * 
 * 创建一个新的 SuperMap 类，如下所示:
 * (code)
 *     var MyClass = new SuperMap.Class(prototype);
 * (end)
 *
 * 创建一个新的有多个继承类的SuperMap类，如下所示:
 * (code)
 *     var MyClass = new SuperMap.Class(Class1, Class2, prototype);
 * (end)
 */
SuperMap.Class = function() {
    var len = arguments.length;
    var P = arguments[0];
    var F = arguments[len-1];

    var C = typeof F.initialize === "function" ?  F.initialize : function(){ P.prototype.initialize.apply(this, arguments); };

    if (len > 1) {
        var newArgs = [C, P].concat( Array.prototype.slice.call(arguments).slice(1, len-1), F);
        SuperMap.inherit.apply(null, newArgs);
    } else {
        C.prototype = F;
    }
    return C;
};

/**
 * Function: SuperMap.inherit
 *
 * Parameters:
 * C - {Object} the class that inherits
 * P - {Object} the superclass to inherit from
 *
 * In addition to the mandatory C and P parameters, an arbitrary number of
 * objects can be passed, which will extend C.
 */
SuperMap.inherit = function(C, P) {
   var F = function() {};
   F.prototype = P.prototype;
   C.prototype = new F;
   var i, l, o;
   for(i=2, l=arguments.length; i<l; i++) {
       o = arguments[i];
       if(typeof o === "function") {
           o = o.prototype;
       }
       SuperMap.Util.extend(C.prototype, o);
   }
};

/**
 * APIFunction: extend
 * 复制源对象的所有属性到目标对象上，源对象上的没有定义的属性在目标对象上也不会被设置。
 *
 * 要复制SuperMap.Size对象的所有属性到自定义对象上，使用方法如下:
 *  (code)
 *     var size = new SuperMap.Size(100, 100);
 *     var obj = {}；
 *     SuperMap.Util.extend(obj, size);
 * (end)
 *
 * Parameters:
 * destination - {Object} 目标对象。
 * source - {Object} 源对象，其属性将被设置到目标对象上。
 * Returns:
 * {Object} 目标对象。
 */
SuperMap.Util = SuperMap.Util || {};
SuperMap.Util.extend = function(destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                destination[property] = value;
            }
        }

        /**
         * IE doesn't include the toString property when iterating over an object's
         * properties with the for(property in object) syntax.  Explicitly check if
         * the source has its own toString property.
         */

        /*
         * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
         * prototype object" when calling hawOwnProperty if the source object
         * is an instance of window.Event.
         */

        var sourceIsEvt = typeof window.Event === "function"
                          && source instanceof window.Event;

        if (!sourceIsEvt
           && source.hasOwnProperty && source.hasOwnProperty("toString")) {
            destination.toString = source.toString;
        }
    }
    return destination;
};
SuperMap.Util.copy = function(des, soc) {
    des = des || {};
    var v;
    if(soc) {
        for(var p in des) {
            v = soc[p];
            if(typeof v !== 'undefined') {
                des[p] = v;
            }
        }
    }
};
SuperMap.Util.reset = function(obj) {
    obj = obj || {};
    for(var p in obj) {
        if(obj.hasOwnProperty(p)) {
            if(typeof obj[p] === "object" && obj[p] instanceof Array) {
                for(var i in obj[p]) {
                    if(obj[p][i].destroy) {
                        obj[p][i].destroy();
                    }
                }
                obj[p].length = 0;
            } else if(typeof obj[p] === "object" && obj[p] instanceof Object) {
                if(obj[p].destroy) {
                    obj[p].destroy();
                }
            }
            obj[p] = null;
        }
    }
};
