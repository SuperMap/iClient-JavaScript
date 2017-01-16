/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Tool.Util
 * LevelRenderer 基础工具类
 *
 */
SuperMap.LevelRenderer.Tool.Util = SuperMap.Class({

    /**
     * Property: BUILTIN_OBJECT
     * {Object} 用于处理merge时无法遍历Date等对象的问题
     */
    BUILTIN_OBJECT: null,

    /**
     * Property: _ctx
     * {Object}
     */
    _ctx: null,

    /**
     * Property: _canvas
     * {Object}
     */
    _canvas: null,

    /**
     * Property: _pixelCtx
     * {Object}
     */
    _pixelCtx: null,

    /**
     * Property: _width
     * {Object}
     */
    _width: null,

    /**
     * Property: _height
     * {Object}
     */
    _height: null,

    /**
     * Property: _offsetX
     * {Object}
     */
    _offsetX: 0,

    /**
     * Property: _offsetY
     * {Object}
     */
    _offsetY: 0,

    /**
     * Constructor: SuperMap.LevelRenderer.Tool.Util
     * 构造函数。
     *
     */
    initialize: function() {
        this.BUILTIN_OBJECT = {
            '[object Function]': 1,
            '[object RegExp]': 1,
            '[object Date]': 1,
            '[object Error]': 1,
            '[object CanvasGradient]': 1
        };
    },


    /**
     * APIMethod: clone
     * 对一个object进行深度拷贝。
     *
     * Parameters:
     * source - {Object} 需要进行拷贝的对象。
     *
     * Returns:
     * {Object} 拷贝后的新对象。
     */
    clone: function(source) {
        var BUILTIN_OBJECT = this.BUILTIN_OBJECT;
        if (typeof source == 'object' && source !== null) {
            var result = source;
            if (source instanceof Array) {
                result = [];
                for (var i = 0, len = source.length; i < len; i++) {
                    result[i] = this.clone(source[i]);
                }
            }
            else if (!BUILTIN_OBJECT[Object.prototype.toString.call(source)]) {
                result = {};
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        result[key] = this.clone(source[key]);
                    }
                }
            }

            return result;
        }

        return source;
    },


    /**
     * Method: mergeItem
     * 合并源对象的单个属性到目标对象。
     *
     * Parameters:
     * target - {Object} 目标对象。
     * source - {Object} 源对象。
     * key - {String} 键。
     * overwrite - {Boolean} 是否覆盖。
     *
     * Returns:
     * {Object} 目标对象。
     */
    mergeItem: function(target, source, key, overwrite) {
        var BUILTIN_OBJECT = this.BUILTIN_OBJECT;
        if (source.hasOwnProperty(key)) {
            if (typeof target[key] == 'object'
                && !BUILTIN_OBJECT[ Object.prototype.toString.call(target[key]) ]
                ) {
                // 如果需要递归覆盖，就递归调用merge
                this.merge(
                    target[key],
                    source[key],
                    overwrite
                );
            }
            else if (overwrite || !(key in target)) {
                // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
                target[key] = source[key];
            }
        }
    },

    /**
     * APIMethod: merge
     * 合并源对象的属性到目标对象。
     *
     * Parameters:
     * target - {Object} 目标对象。
     * source - {Object} 源对象。
     * overwrite - {Boolean} 是否覆盖。
     *
     * Returns:
     * {Object} 目标对象。
     */
    merge: function(target, source, overwrite) {
        for (var i in source) {
            this.mergeItem(target, source, i, overwrite);
        }

        return target;
    },


    /**
     * Method: getContext
     * 获取 Cavans 上下文
     *
     * Returns:
     * {Object} Cavans 上下文。
     */
    getContext: function() {
        if (!this._ctx) {
            this._ctx = document.createElement('canvas').getContext('2d');
        }
        return this._ctx;
    },


    /**
     * APIMethod: getPixelContext
     * 获取像素拾取专用的上下文
     *
     * Returns:
     * {Object}像素拾取专用的上下文。
     */
    getPixelContext: function() {
        if (!this._pixelCtx) {
            this._canvas = document.createElement('canvas');
            this._width = this._canvas.width;
            this._height = this._canvas.height;
            this._pixelCtx = this._canvas.getContext('2d');
        }
        return this._pixelCtx;
    },

    /**
     * APIMethod: adjustCanvasSize
     * 如果坐标处在_canvas外部，改变_canvas的大小
     *
     * 注意 修改canvas的大小 需要重新设置translate
     *
     * Parameters:
     * x - {Number} 横坐标。
     * y - {Number} 纵坐标。
     *
     */
    adjustCanvasSize: function(x, y) {
        var _canvas = this._canvas;
        var _pixelCtx = this._pixelCtx;
        var _width = this._width;
        var _height = this._height;
        var _offsetX = this._offsetX;
        var _offsetY = this._offsetY;

        // 每次加的长度
        var _v = 100;
        var _flag;

        if (x + _offsetX > _width) {
            _width = x + _offsetX + _v;
            _canvas.width = _width;
            _flag = true;
        }

        if (y + _offsetY > _height) {
            _height = y + _offsetY + _v;
            _canvas.height = _height;
            _flag = true;
        }

        if (x < -_offsetX) {
            _offsetX = Math.ceil(-x / _v) * _v;
            _width += _offsetX;
            _canvas.width = _width;
            _flag = true;
        }

        if (y < -_offsetY) {
            _offsetY = Math.ceil(-y / _v) * _v;
            _height += _offsetY;
            _canvas.height = _height;
            _flag = true;
        }

        if (_flag) {
            _pixelCtx.translate(_offsetX, _offsetY);
        }
    },

    /**
     * APIMethod: getPixelOffset
     * 获取像素canvas的偏移量
     *
     * Returns:
     * {Object}偏移量。
     */
    getPixelOffset: function() {
        return {
            x : this._offsetX,
            y : this._offsetY
        };
    },


    /**
     * APIMethod: indexOf
     * 查询数组中元素的index
     *
     * Returns:
     * {Object}偏移量。
     */
    indexOf: function(array, value) {
        if (array.indexOf) {
            return array.indexOf(value);
        }
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === value) {
                return i;
            }
        }
        return -1;
    },


    /**
     * APIMethod: inherits
     * 构造类继承关系
     *
     * Parameters:
     * clazz - {Function} 源类。
     * baseClazz - {Function} 基类。
     *
     * Returns:
     * {Object}偏移量。
     */
    inherits: function(clazz, baseClazz) {
        var clazzPrototype = clazz.prototype;
        function F() {}
        F.prototype = baseClazz.prototype;
        clazz.prototype = new F();

        for (var prop in clazzPrototype) {
            clazz.prototype[prop] = clazzPrototype[prop];
        }
        clazz.constructor = clazz;
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Tool.Util"
});