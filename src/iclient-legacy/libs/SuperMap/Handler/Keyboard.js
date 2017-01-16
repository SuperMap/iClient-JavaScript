/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Handler.js
 * @requires SuperMap/Events.js
 */

/**
 * Class: SuperMap.handler.Keyboard
 * 键盘事件处理器。
 * 
 * Inherits from:
 *  - <SuperMap.Handler> 
 */
SuperMap.Handler.Keyboard = SuperMap.Class(SuperMap.Handler, {

    /* http://www.quirksmode.org/js/keys.html explains key x-browser
        key handling quirks in pretty nice detail */

    /** 
     * Constant: KEY_EVENTS
     * keydown, keypress, keyup
     */
    KEY_EVENTS: ["keydown", "keyup"],

    /** 
    * Property: eventListener
    * {Function}
    */
    eventListener: null,

    /**
     * Constructor: SuperMap.Handler.Keyboard
     * 构造函数，返回一个新的键盘事件处理器
     * 
     * Parameters:
     * control - {<SuperMap.Control>} 构建事件处理器的控件，如果该事件处理器没有被控件使用，那么必须明确调用setMap方法给当前事件处理器赋予一个有效值。
     * callbacks - {Object} 回调函数对象。回调函数接受键盘事件event对象为参数。
     *  回调事件支持keydown，keypress，keyup
     * options - {Object} 一个可选对象，其属性将会赋值到事件处理器对象上。 
     */
    initialize: function(control, callbacks, options) {
        SuperMap.Handler.prototype.initialize.apply(this, arguments);
        // cache the bound event listener method so it can be unobserved later
        this.eventListener = SuperMap.Function.bindAsEventListener(
            this.handleKeyEvent, this
        );
    },
    
    /**
     * Method: destroy
     */
    destroy: function() {
        this.deactivate();
        this.eventListener = null;
        SuperMap.Handler.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: activate
     */
    activate: function() {
        if (SuperMap.Handler.prototype.activate.apply(this, arguments)) {
            for (var i=0, len=this.KEY_EVENTS.length; i<len; i++) {
                SuperMap.Event.observe(
                    document, this.KEY_EVENTS[i], this.eventListener);
            }
            return true;
        } else {
            return false;
        }
    },

    /**
     * Method: deactivate
     */
    deactivate: function() {
        var deactivated = false;
        if (SuperMap.Handler.prototype.deactivate.apply(this, arguments)) {
            for (var i=0, len=this.KEY_EVENTS.length; i<len; i++) {
                SuperMap.Event.stopObserving(
                    document, this.KEY_EVENTS[i], this.eventListener);
            }
            deactivated = true;
        }
        return deactivated;
    },

    /**
     * Method: handleKeyEvent 
     */
    handleKeyEvent: function (evt) {
        if (this.checkModifiers(evt)) {
            this.callback(evt.type, [evt]);
        }
    },

    CLASS_NAME: "SuperMap.Handler.Keyboard"
});
