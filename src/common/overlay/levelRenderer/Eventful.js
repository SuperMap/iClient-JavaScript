/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
/**
 * @class  SuperMap.LevelRenderer.Eventful
 * @category Visualization Theme
 * @classdesc 事件分发器超类，所有支持事件处理的类均是此类的子类。
 * 此类不可实例化。
 * @private 
 */
export class Eventful {




    /**
     * @function SuperMap.LevelRenderer.Eventful.prototype.constructor
     * @description 构造函数。对象可以通过 onxxxx 绑定事件。
     * 支持的事件：
     * Symbolizer properties:
     * onclick - {function} 默认值：null。
     * onmouseover - {function} 默认值：null。
     * onmouseout - {function} 默认值：null。
     * onmousemove - {function} 默认值：null。
     * onmousewheel - {function} 默认值：null。
     * onmousedown - {function} 默认值：null。
     * onmouseup - {function} 默认值：null。
     * ondragstart - {function} 默认值：null。
     * ondragend - {function} 默认值：null。
     * ondragenter - {function} 默认值：null。
     * ondragleave - {function} 默认值：null。
     * ondragover - {function} 默认值：null。
     * ondrop - {function} 默认值：null。
     */
    constructor() {
        /**
         * @member {Object} SuperMap.LevelRenderer.Eventful.prototype._handlers
         * @description 事件处理对象（事件分发器）。
         */
        this._handlers = {};

        this.CLASS_NAME = "SuperMap.LevelRenderer.Eventful";
    }


    /**
     * @function {Object} SuperMap.LevelRenderer.Eventful.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this._handlers = null;
    }


    /**
     * @function SuperMap.LevelRenderer.Eventful.prototype.one
     * @description 单次触发绑定，dispatch后销毁。
     * @param {string} event - 事件名。
     * @param {boolean} handler - 响应函数。
     * @param {Object} context - context。
     * @returns {SuperMap.LevelRenderer.Eventful} this
     */
    one(event, handler, context) {
        var _h = this._handlers;

        if (!handler || !event) {
            return this;
        }

        if (!_h[event]) {
            _h[event] = [];
        }

        _h[event].push({
            h: handler,
            one: true,
            ctx: context || this
        });

        return this;
    }


    /**
     * @function SuperMap.LevelRenderer.Eventful.prototype.bind
     * @description 绑定事件。
     * @param {string} event - 事件名。
     * @param {boolean} handler - 响应函数。
     * @param {Object} context - context。
     * @returns {SuperMap.LevelRenderer.Eventful} this
     */
    bind(event, handler, context) {
        var _h = this._handlers;

        if (!handler || !event) {
            return this;
        }

        if (!_h[event]) {
            _h[event] = [];
        }

        _h[event].push({
            h: handler,
            one: false,
            ctx: context || this
        });

        return this;
    }


    /**
     * @function SuperMap.LevelRenderer.Eventful.prototype.unbind
     * @description 解绑事件。
     * @param {string} event - 事件名。
     * @param {boolean} handler - 响应函数。
     * @returns {SuperMap.LevelRenderer.Eventful} this
     */
    unbind(event, handler) {
        var _h = this._handlers;

        if (!event) {
            this._handlers = {};
            return this;
        }

        if (handler) {
            if (_h[event]) {
                var newList = [];
                for (var i = 0, l = _h[event].length; i < l; i++) {
                    if (_h[event][i]['h'] != handler) {
                        newList.push(_h[event][i]);
                    }
                }
                _h[event] = newList;
            }

            if (_h[event] && _h[event].length === 0) {
                delete _h[event];
            }
        } else {
            delete _h[event];
        }

        return this;
    }


    /**
     * @function SuperMap.LevelRenderer.Eventful.prototype.dispatch
     * @description 事件分发。
     * @param {string} type - 事件类型。
     * @returns {SuperMap.LevelRenderer.Eventful} this
     */
    dispatch(type) {
        if (this._handlers[type]) {
            var args = arguments;
            var argLen = args.length;

            if (argLen > 3) {
                args = Array.prototype.slice.call(args, 1);
            }

            var _h = this._handlers[type];
            var len = _h.length;
            for (var i = 0; i < len;) {
                // Optimize advise from backbone
                switch (argLen) {
                    case 1:
                        _h[i]['h'].call(_h[i]['ctx']);
                        break;
                    case 2:
                        _h[i]['h'].call(_h[i]['ctx'], args[1]);
                        break;
                    case 3:
                        _h[i]['h'].call(_h[i]['ctx'], args[1], args[2]);
                        break;
                    default:
                        // have more than 2 given arguments
                        _h[i]['h'].apply(_h[i]['ctx'], args);
                        break;
                }

                if (_h[i]['one']) {
                    _h.splice(i, 1);
                    len--;
                } else {
                    i++;
                }
            }
        }

        return this;
    }


    /**
     * @function SuperMap.LevelRenderer.Eventful.prototype.dispatchWithContext
     * @description 带有context的事件分发，最后一个参数是事件回调的 context。
     * @param {string} type - 事件类型。
     * @returns {SuperMap.LevelRenderer.Eventful} this
     */
    dispatchWithContext(type) {
        if (this._handlers[type]) {
            var args = arguments;
            var argLen = args.length;

            if (argLen > 4) {
                args = Array.prototype.slice.call(args, 1, args.length - 1);
            }
            var ctx = args[args.length - 1];

            var _h = this._handlers[type];
            var len = _h.length;
            for (var i = 0; i < len;) {
                // Optimize advise from backbone
                switch (argLen) {
                    case 1:
                        _h[i]['h'].call(ctx);
                        break;
                    case 2:
                        _h[i]['h'].call(ctx, args[1]);
                        break;
                    case 3:
                        _h[i]['h'].call(ctx, args[1], args[2]);
                        break;
                    default:
                        // have more than 2 given arguments
                        _h[i]['h'].apply(ctx, args);
                        break;
                }

                if (_h[i]['one']) {
                    _h.splice(i, 1);
                    len--;
                } else {
                    i++;
                }
            }
        }

        return this;
    }

}