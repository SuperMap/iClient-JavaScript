/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Eventful
 * 事件分发器超类，所有支持事件处理的类均是此类的子类。
 *
 * 此类不可实例化。
 *
 */
SuperMap.LevelRenderer.Eventful = SuperMap.Class({

    /**
     * Property: _handlers
     * {Object} 事件处理对象（事件分发器）。
     */
    _handlers: null,

    /**
     * Constructor: SuperMap.LevelRenderer.Eventful
     * 构造函数。
     *
     * 对象可以通过 onxxxx 绑定事件。
     *
     * 支持的事件：
     * Symbolizer properties:
     * onclick - {Function} 默认值：null。
     * onmouseover - {Function} 默认值：null。
     * onmouseout - {Function} 默认值：null。
     * onmousemove - {Function} 默认值：null。
     * onmousewheel - {Function} 默认值：null。
     * onmousedown - {Function} 默认值：null。
     * onmouseup - {Function} 默认值：null。
     * ondragstart - {Function} 默认值：null。
     * ondragend - {Function} 默认值：null。
     * ondragenter - {Function} 默认值：null。
     * ondragleave - {Function} 默认值：null。
     * ondragover - {Function} 默认值：null。
     * ondrop - {Function} 默认值：null。
     */
    initialize: function() {
        this._handlers = {};
    },

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy: function() {
        this._handlers = null;
    },

    /**
     * APIMethod: one
     * 单次触发绑定，dispatch后销毁。
     *
     * Parameters:
     * event - {String} 事件名。
     * handler - {Boolean} 响应函数。
     * context - {Object} context。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Eventful>} this。
     */
    one: function(event, handler, context){
        var _h = this._handlers;

        if (!handler || !event) {
            return this;
        }

        if (!_h[event]) {
            _h[event] = [];
        }

        _h[event].push({
            h : handler,
            one : true,
            ctx: context || this
        });

        return this;
    },

    /**
     * APIMethod: bind
     * 绑定事件。
     *
     * Parameters:
     * event - {String} 事件名。
     * handler - {Boolean} 事件处理函数。
     * context - {Object} context。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Eventful>} this。
     */
    bind: function(event, handler, context){
        var _h = this._handlers;

        if (!handler || !event) {
            return this;
        }

        if (!_h[event]) {
            _h[event] = [];
        }

        _h[event].push({
            h : handler,
            one : false,
            ctx: context || this
        });

        return this;
    },

    /**
     * APIMethod: unbind
     * 解绑事件。
     *
     * Parameters:
     * event - {String} 事件名。
     * handler - {Boolean} 事件处理函数。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Eventful>} this。
     */
    unbind: function(event, handler){
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
        }
        else {
            delete _h[event];
        }

        return this;
    },

    /**
     * APIMethod: dispatch
     * 事件分发。
     *
     * Parameters:
     * type - {String} 事件类型。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Eventful>} this。
     */
    dispatch: function(type){
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
                }
                else {
                    i++;
                }
            }
        }

        return this;
    },

    /**
     * APIMethod: dispatchWithContext
     * 带有context的事件分发, 最后一个参数是事件回调的 context。
     *
     * Parameters:
     * type - {String} 事件类型。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Eventful>} this。
     */
    dispatchWithContext: function(type){
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
                }
                else {
                    i++;
                }
            }
        }

        return this;
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Eventful"
});