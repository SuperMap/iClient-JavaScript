/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
/**
 * @private
 * @class  SuperMap.LevelRenderer.Tool.Util
 * @category Visualization Theme
 * LevelRenderer 基础工具类
 *
 */
export class Util {


    /**
     * @function SuperMap.LevelRenderer.Tool.Util.constructor
     * @description 构造函数。
     *
     */
    constructor() {
        /**
         * @member {Object} SuperMap.LevelRenderer.Tool.Util.prototype.BUILTIN_OBJECT
         * @description 用于处理merge时无法遍历Date等对象的问题
         */
        this.BUILTIN_OBJECT = {
            '[object Function]': 1,
            '[object RegExp]': 1,
            '[object Date]': 1,
            '[object Error]': 1,
            '[object CanvasGradient]': 1
        };

        /**
         * @member {Object} SuperMap.LevelRenderer.Tool.Util.prototype._ctx
         */
        this._ctx = null;

        /**
         * Property: _canvas
         * {Object}
         */
        this._canvas = null;

        /**
         * Property: _pixelCtx
         * {Object}
         */
        this._pixelCtx = null;

        /**
         * Property: _width
         * {Object}
         */
        this._width = null;

        /**
         * Property: _height
         * {Object}
         */
        this._height = null;

        /**
         * Property: _offsetX
         * {Object}
         */
        this._offsetX = 0;

        /**
         * Property: _offsetY
         * {Object}
         */
        this._offsetY = 0;

        this.CLASS_NAME = "SuperMap.LevelRenderer.Tool.Util";

    }


    /**
     * @function SuperMap.LevelRenderer.Tool.Util.prototype.clone
     * @description 对一个object进行深度拷贝。
     * 
     * @param {Object} source - 需要进行拷贝的对象。
     * @return {Object} 拷贝后的新对象。
     */
    clone(source) {
        var BUILTIN_OBJECT = this.BUILTIN_OBJECT;
        if (typeof source == 'object' && source !== null) {
            var result = source;
            if (source instanceof Array) {
                result = [];
                for (var i = 0, len = source.length; i < len; i++) {
                    result[i] = this.clone(source[i]);
                }
            } else if (!BUILTIN_OBJECT[Object.prototype.toString.call(source)]) {
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
    }


    /**
     * @function SuperMap.LevelRenderer.Tool.Util.prototype.mergeItem
     * @description 合并源对象的单个属性到目标对象。
     *
     * @param {Object} target - 目标对象。
     * @param {Object} source - 源对象。
     * @param {String} key - 键。
     * @param {Boolean} overwrite - 是否覆盖。
     * @return {Object} 目标对象
     */
    mergeItem(target, source, key, overwrite) {
        var BUILTIN_OBJECT = this.BUILTIN_OBJECT;
        if (source.hasOwnProperty(key)) {
            if (typeof target[key] == 'object'
                && !BUILTIN_OBJECT[Object.prototype.toString.call(target[key])]
            ) {
                // 如果需要递归覆盖，就递归调用merge
                this.merge(
                    target[key],
                    source[key],
                    overwrite
                );
            } else if (overwrite || !(key in target)) {
                // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
                target[key] = source[key];
            }
        }
    }


    /**
     * @function SuperMap.LevelRenderer.Tool.Util.prototype.merge
     * @description 合并源对象的属性到目标对象。
     * 
     * @param {Object} target - 目标对象。
     * @param {Object} source - 源对象。
     * @param {Boolean} overwrite - 是否覆盖。
     * @return {Object} 目标对象。
     */
    merge(target, source, overwrite) {
        for (var i in source) {
            this.mergeItem(target, source, i, overwrite);
        }

        return target;
    }


    /**
     * @function SuperMap.LevelRenderer.Tool.Util.prototype.getContext
     * @description 获取 Canvas 上下文。
     * @return {Object} 上下文。
     */
    getContext() {
        if (!this._ctx) {
            this._ctx = document.createElement('canvas').getContext('2d');
        }
        return this._ctx;
    }


    /**
     * @function SuperMap.LevelRenderer.Tool.Util.prototype.getPixelContext
     * @description 获取像素拾取专用的上下文。
     * @return {Object} 像素拾取专用的上下文。
     */
    getPixelContext() {
        if (!this._pixelCtx) {
            this._canvas = document.createElement('canvas');
            this._width = this._canvas.width;
            this._height = this._canvas.height;
            this._pixelCtx = this._canvas.getContext('2d');
        }
        return this._pixelCtx;
    }


    /**
     * @function SuperMap.LevelRenderer.Tool.Util.prototype.adjustCanvasSize
     * @description 如果坐标处在_canvas外部，改变_canvas的大小，修改canvas的大小 需要重新设置translate
     *
     * @param {number} x - 横坐标。
     * @param {number} y - 纵坐标。
     *
     */
    adjustCanvasSize(x, y) {
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
    }


    /**
     * @function SuperMap.LevelRenderer.Tool.Util.prototype.getPixelOffset
     * @description 获取像素canvas的偏移量。
     * @return {Object} 偏移量。
     */
    getPixelOffset() {
        return {
            x: this._offsetX,
            y: this._offsetY
        };
    }


    /**
     * @function SuperMap.LevelRenderer.Tool.Util.prototype.indexOf
     * @description 查询数组中元素的index
     * @return {Object} 偏移量。
     */
    indexOf(array, value) {
        if (array.indexOf) {
            return array.indexOf(value);
        }
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === value) {
                return i;
            }
        }
        return -1;
    }


    /**
     * @function SuperMap.LevelRenderer.Tool.Util.prototype.inherits
     * @description 构造类继承关系
     * 
     * @param {Function} clazz - 源类。
     * @param {Function} baseClazz - 基类。
     * @return {Object} 偏移量。
     */
    inherits(clazz, baseClazz) {
        var clazzPrototype = clazz.prototype;

        function F() {
        }

        F.prototype = baseClazz.prototype;
        clazz.prototype = new F();

        for (var prop in clazzPrototype) {
            clazz.prototype[prop] = clazzPrototype[prop];
        }
        clazz.constructor = clazz;
    }
}