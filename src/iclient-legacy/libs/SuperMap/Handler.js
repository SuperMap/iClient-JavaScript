/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Events.js
 */

/**
 * Class: SuperMap.Handler
 * 用于处理Control事件的事件处理器。
 * 事件处理器(Handler)内部封装了浏览器事件监听及其相应的处理方法，当一个事件处理器被激活时, 
 * Handler中定义的浏览器事件监听及其相应的方法被注册到浏览器监听器，在浏览器事件被触发之后，
 * 首先会调用Handler中处理该浏览器事件的方法来做事件的确认和信息封装，然后才再传递给Control等做具体响应处理。
 * 当一个处理器被注销，这些方法在事件监听器中也会相应的被取消注册。
 *
 * 事件处理器通过 active和 deactive 两个方法，实现动态的激活和注销。一个控件被激活时，其对应的事件处理器会被激活，
 * 相应的浏览器事件被触发之后，通过事件处理器(Handler)来监听、处理和响应这些事件；
 * 同样，当一个控件被注销时，其相应的处理器也会被注销。
 * 包括了Box、Click、Drag、Feature、Hover、Keyboard、
 * MouseWheel、Path、Pinch、Point、Polygon、RegularPolygon等几种类型的事件处理器。
 */
SuperMap.Handler = SuperMap.Class({

    /**
     * Property: id
     * {String}
     */
    id: null,
        
    /**
     * APIProperty: control
     * {<SuperMap.Control>} 控件对象
     */
    control: null,

    /**
     * Property: map
     * {<SuperMap.Map>}
     */
    map: null,

    /**
     * APIProperty: keyMask
     * {Integer} 使用位运算符和一个或者多个Handler类型的常量来创建键盘编码符（KeyMask）
     *
     * Example:
     * (code)
     *     // 事件仅仅在Shift键按下时响应
     *     handler.keyMask = SuperMap.Handler.MOD_SHIFT;
     *
     *     // 事件仅仅在Shift键或CTRL键按下时响应
     *     handler.keyMask = SuperMap.Handler.MOD_SHIFT |
     *                       SuperMap.Handler.MOD_CTRL;
     * (end)
     */
    keyMask: null,

    /**
     * Property: active
     * {Boolean}
     */
    active: false,
    
    /**
     * Property: evt
     * {Event} This property references the last event handled by the handler.
     *     Note that this property is not part of the stable API.  Use of the
     *     evt property should be restricted to controls in the library
     *     or other applications that are willing to update with changes to
     *     the SuperMap code.
     */
    evt: null,

    /**
     * Constructor: SuperMap.Handler
     * 实例化事件处理器类对象。
     *
     * Parameters:
     * control - {<SuperMap.Control>} 用来初始化当前处理器的控件，如果控件具备有效的地图（map）属性，
     * 则会被处理器的setMap方法使用。如果在options中设置了map属性，则用传入的属性。
     * callbacks - {Object} 回调函数对象，其属性名对应抽象事件或者浏览器事件，属性值在被调用的具体的
     * 控件事件处理函数中定义。
     * options - {Object} 处理器开放的属性。
     */
    initialize: function(control, callbacks, options) {
        SuperMap.Util.extend(this, options);
        this.control = control;
        this.callbacks = callbacks;

        var map = this.map || control.map;
        if (map) {
            this.setMap(map); 
        }
        
        this.id = SuperMap.Util.createUniqueID(this.CLASS_NAME + "_");
    },
    
    /**
     * Method: setMap
     */
    setMap: function (map) {
        this.map = map;
    },

    /**
     * Method: checkModifiers
     * Check the keyMask on the handler.  If no <keyMask> is set, this always
     *     returns true.  If a <keyMask> is set and it matches the combination
     *     of keys down on an event, this returns true.
     *
     * Returns:
     * {Boolean} The keyMask matches the keys down on an event.
     */
    checkModifiers: function (evt) {
        if(this.keyMask == null) {
            return true;
        }
        /* calculate the keyboard modifier mask for this event */
        var keyModifiers =
            (evt.shiftKey ? SuperMap.Handler.MOD_SHIFT : 0) |
            (evt.ctrlKey  ? SuperMap.Handler.MOD_CTRL  : 0) |
            (evt.altKey   ? SuperMap.Handler.MOD_ALT   : 0);
    
        /* if it differs from the handler object's key mask,
           bail out of the event handler */
        return (keyModifiers === this.keyMask);
    },

    /**
     * APIMethod: activate
     * 激活处理器，如果当前处理器对象已经激活，则返回false.
     * 
     * Returns: 
     * {Boolean} 激活handler.
     */
    activate: function() {
        if(this.active) {
            return false;
        }
        // register for event handlers defined on this class.
        var events = SuperMap.Events.prototype.BROWSER_EVENTS;
        for (var i=0, len=events.length; i<len; i++) {
            if (this[events[i]]) {
                this.register(events[i], this[events[i]]); 
            }
        } 
        this.active = true;
        return true;
    },
    
    /**
     * APIMethod: deactivate
     * 关闭处理器，如果当前处理器已经是关闭状态，则返回false
     * 
     * Returns:
     * {Boolean} 处理器关闭。
     */
    deactivate: function() {
        if(!this.active) {
            return false;
        }
        // unregister event handlers defined on this class.
        var events = SuperMap.Events.prototype.BROWSER_EVENTS;
        for (var i=0, len=events.length; i<len; i++) {
            if (this[events[i]]) {
                this.unregister(events[i], this[events[i]]); 
            }
        } 
        this.active = false;
        return true;
    },

    /**
    * Method: callback
    * Trigger the control's named callback with the given arguments
    *
    * Parameters:
    * name - {String} The key for the callback that is one of the properties
    *     of the handler's callbacks object.
    * args - {Array(*)} An array of arguments (any type) with which to call 
    *     the callback (defined by the control).
    */
    callback: function (name, args) {
        if (name && this.callbacks[name]) {
            this.callbacks[name].apply(this.control, args);
        }
    },

    /**
    * Method: register
    * register an event on the map
    */
    register: function (name, method) {
        // TODO: deal with registerPriority in 3.0
        this.map.events.registerPriority(name, this, method);
        this.map.events.registerPriority(name, this, this.setEvent);
    },

    /**
    * Method: unregister
    * unregister an event from the map
    */
    unregister: function (name, method) {
        this.map.events.unregister(name, this, method);   
        this.map.events.unregister(name, this, this.setEvent);
    },
    
    /**
     * Method: setEvent
     * With each registered browser event, the handler sets its own evt
     *     property.  This property can be accessed by controls if needed
     *     to get more information about the event that the handler is
     *     processing.
     *
     * This allows modifier keys on the event to be checked (alt, shift,
     *     and ctrl cannot be checked with the keyboard handler).  For a
     *     control to determine which modifier keys are associated with the
     *     event that a handler is currently processing, it should access
     *     (code)handler.evt.altKey || handler.evt.shiftKey ||
     *     handler.evt.ctrlKey(end).
     *
     * Parameters:
     * evt - {Event} The browser event.
     */
    setEvent: function(evt) {
        this.evt = evt;
        return true;
    },

    /**
     * Method: destroy
     * Deconstruct the handler.
     */
    destroy: function () {
        // unregister event listeners
        this.deactivate();
        // eliminate circular references
        this.control = this.map = null;        
    },

    CLASS_NAME: "SuperMap.Handler"
});

/**
 * Constant: SuperMap.Handler.MOD_NONE
 * 如果设置这个KeyMask，按下任意键，checkModifier方法都返回false；默认值为0。
 */
SuperMap.Handler.MOD_NONE  = 0;

/**
 * Constant: SuperMap.Handler.MOD_SHIFT
 * 如果设置这个KeyMask，在按下Shift的时候，checkModifiers方法返回false；默认值为1。
 */
SuperMap.Handler.MOD_SHIFT = 1;

/**
 * Constant: SuperMap.Handler.MOD_CTRL
 * 如果设置这个KeyMask，在按下Ctrl的时候，checkModifiers方法返回false；默认值为2。

 */
SuperMap.Handler.MOD_CTRL  = 2;

/**
 * Constant: SuperMap.Handler.MOD_ALT
 * 如果设置这个KeyMask，在按下Alt的时候，checkModifiers方法返回false；默认值为4。
 */
SuperMap.Handler.MOD_ALT   = 4;


