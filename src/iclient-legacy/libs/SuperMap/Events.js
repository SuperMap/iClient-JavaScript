/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.Events
 */
SuperMap.Events = SuperMap.Class({

    /** 
     * Constant: BROWSER_EVENTS
     * {Array(String)} 支持的事件。
     */
    BROWSER_EVENTS: [
        "mouseover", "mouseout",
        "mousedown", "mouseup", "mousemove", 
        "click", "dblclick", "rightclick", "dblrightclick",
        "resize", "focus", "blur",
        "touchstart", "touchmove", "touchend",
        "keydown", "MSPointerDown", "MSPointerUp","pointerdown","pointerup",
        "MSGestureStart", "MSGestureChange", "MSGestureEnd",
        "contextmenu"
    ],

    /** 
     * Property: listeners 
     * {Object} Hashtable of Array(Function): events listener functions  
     */
    listeners: null,

    /** 
     * Property: object 
     * {Object}  the code object issuing application events 
     */
    object: null,

    /** 
     * Property: element 
     * {DOMElement}  the DOM element receiving browser events 
     */
    element: null,

    /** 
     * Property: eventTypes 
     * {Array(String)}  list of support application events 
     */
    eventTypes: null,

    /** 
     * Property: eventHandler 
     * {Function}  bound event handler attached to elements 
     */
    eventHandler: null,

    /** 
     * APIProperty: fallThrough 
     * {Boolean} 是否允许事件处理之后向上传递（冒泡），为false的时候阻止事件冒泡。
     */
    fallThrough: null,

    /** 
     * APIProperty: includeXY
     * {Boolean} 判断是否让.xy属性自动创建到浏览器上的鼠标事件，一般设置为false，如果设置为true，鼠标事件将会在事件传递过程中自动产生.xy属性。
     * 可根据事件对象的'evt.object'属性在相关的事件句柄上调用getMousePosition函数，如：
     * (code)
     *  function named(evt) { 
     *        this.xy = this.object.events.getMousePosition(evt) 
     *  }
     * (end)
     * 
     * 这个选项习惯默认为false的原因在于，当创建一个事件对象，其主要目的是管理
     * 在一个div的相对定位的鼠标事件,将其设为true也是有意义的。
     * 
     * 这个选项也可以用来控制是否抵消缓存。如果设为false不抵消，如果设为true，用this.clearMouseCache() 清除缓存偏移（边界元素偏移，元素在页面的位置偏移）。
     * 
     * 
    */
    includeXY: false,      

    /**
     * APIProperty: extensions
     * {Object} Event extensions registered with this instance. Keys are
     *     event types, values are {SuperMap.Events.*} extension instances or
     *     {Boolean} for events that an instantiated extension provides in
     *     addition to the one it was created for.
     *
     * Extensions create an event in addition to browser events, which usually
     * fires when a sequence of browser events is completed. Extensions are
     * automatically instantiated when a listener is registered for an event
     * provided by an extension.
     *
     * Extensions are created in the <SuperMap.Events> namespace using
     * <SuperMap.Class>, and named after the event they provide.
     * The constructor receives the target <SuperMap.Events> instance as
     * argument. Extensions that need to capture browser events before they
     * propagate can register their listeners events using <register>, with
     * {extension: true} as 4th argument.
     *
     * If an extension creates more than one event, an alias for each event
     * type should be created and reference the same class. The constructor
     * should set a reference in the target's extensions registry to itself.
     *
     * Below is a minimal extension that provides the "foostart" and "fooend"
     * event types, which replace the native "click" event type if clicked on
     * an element with the css class "foo":
     *
     * (code)
     *   SuperMap.Events.foostart = SuperMap.Class({
     *       initialize: function(target) {
     *           this.target = target;
     *           this.target.register("click", this, this.doStuff, {extension: true});
     *           // only required if extension provides more than one event type
     *           this.target.extensions["foostart"] = true;
     *           this.target.extensions["fooend"] = true;
     *       },
     *       destroy: function() {
     *           var target = this.target;
     *           target.unregister("click", this, this.doStuff);
     *           delete this.target;
     *           // only required if extension provides more than one event type
     *           delete target.extensions["foostart"];
     *           delete target.extensions["fooend"];
     *       },
     *       doStuff: function(evt) {
     *           var propagate = true;
     *           if (SuperMap.Event.element(evt).className === "foo") {
     *               propagate = false;
     *               var target = this.target;
     *               target.triggerEvent("foostart");
     *               window.setTimeout(function() {
     *                   target.triggerEvent("fooend");
     *               }, 1000);
     *           }
     *           return propagate;
     *       }
     *   });
     *   // only required if extension provides more than one event type
     *   SuperMap.Events.fooend = SuperMap.Events.foostart;
     * (end)
     * 
     */
    extensions: null,
    
    /**
     * Property: extensionCount
     * {Object} Keys are event types (like in <listeners>), values are the
     *     number of extension listeners for each event type.
     */
    extensionCount: null,
    /**
     * Method: clearMouseListener
     * A version of <clearMouseCache> that is bound to this instance so that
     *     it can be used with <SuperMap.Event.observe> and
     *     <SuperMap.Event.stopObserving>.
     */
    clearMouseListener: null,

    /**
     * Constructor: SuperMap.Events
     * SuperMap.Events 构造函数。
     *
     * Parameters:
     * object - {Object} 当前事件对象被添加到的JS对象
     * element - {DOMElement} 响应浏览器事件的dom元素
     * eventTypes - {Array(String)} 自定义应用事件的数组
     * fallThrough - {Boolean} 是否允许事件处理之后向上传递（冒泡），为false的时候阻止事件冒泡
     * options - {Object} 事件对象选项。
     */
    initialize: function (object, element, eventTypes, fallThrough, options) {
        SuperMap.Util.extend(this, options);
        this.object     = object;
        this.fallThrough = fallThrough;
        this.listeners  = {};
        this.extensions = {};
        this.extensionCount = {};

        // keep a bound copy of handleBrowserEvent() so that we can
        // pass the same function to both Event.observe() and .stopObserving()
        //this.eventHandler = SuperMap.Function.bindAsEventListener(
        //    this.handleBrowserEvent, this
        //);
        
        // to be used with observe and stopObserving
        //this.clearMouseListener = SuperMap.Function.bind(
        //    this.clearMouseCache, this
        //);

        // if eventTypes is specified, create a listeners list for each 
        // custom application event.
        this.eventTypes = [];
        if (eventTypes != null) {
            for (var i=0, len=eventTypes.length; i<len; i++) {
                this.addEventType(eventTypes[i]);
            }
        }
        
        // if a dom element is specified, add a listeners list 
        // for browser events on the element and register them
        if (element != null) {
            this.attachToElement(element);
        }
    },

    /**
     * APIMethod: destroy
     * 移除当前要素element上的所有事件监听和处理。
     */
    destroy: function () {
        for (var e in this.extensions) {
            if (typeof this.extensions[e] !== "boolean") {
                this.extensions[e].destroy();
            }
        }
        this.extensions = null;
        if (this.element) {
            SuperMap.Event.stopObservingElement(this.element);
            if(this.element.hasScrollEvent) {
                SuperMap.Event.stopObserving(
                    window, "scroll", this.clearMouseListener
                );
            }
        }
        this.element = null;

        this.listeners = null;
        this.object = null;
        this.eventTypes = null;
        this.fallThrough = null;
        this.eventHandler = null;
    },

    /**
     * APIMethod: addEventType
     * 在此事件对象中添加新的事件类型，如果这个事件类型已经添加过了，则不做任何事情。
     * 
     * Parameters:
     * eventName - {String} 事件名。
     */
    addEventType: function(eventName) {
        if (!this.listeners[eventName]) {
            this.eventTypes.push(eventName);
            this.listeners[eventName] = [];
        }
    },

    /**
     * Method: attachToElement
     *
     * Parameters:
     * element - {HTMLDOMElement} a DOM element to attach browser events to
     */
    attachToElement: function (element) {
        if(this.element) {
            SuperMap.Event.stopObservingElement(this.element);
        }else {
            // keep a bound copy of handleBrowserEvent() so that we can
            // pass the same function to both Event.observe() and .stopObserving()
            this.eventHandler = SuperMap.Function.bindAsEventListener(
                this.handleBrowserEvent, this
            );
            
            // to be used with observe and stopObserving
            this.clearMouseListener = SuperMap.Function.bind(
                this.clearMouseCache, this
            );
        }
        this.element = element;
        for (var i=0, len=this.BROWSER_EVENTS.length; i<len; i++) {
            var eventType = this.BROWSER_EVENTS[i];

            // every browser event has a corresponding application event 
            // (whether it's listened for or not).
            this.addEventType(eventType);
            
            // use Prototype to register the event cross-browser
            SuperMap.Event.observe(element, eventType, this.eventHandler);
        }
        // disable dragstart in IE so that mousedown/move/up works normally
        SuperMap.Event.observe(element, "dragstart", SuperMap.Event.stop);
    },
    
    /**
     * APIMethod: on
     * 在一个相同的范围内注册监听器的方法，此方法调用register函数。
     *
     * Example use:
     * (code)
     * // 注册一个"loadstart"监听事件
     * events.on({"loadstart": loadStartListener});
     *
     * // 同样注册一个"loadstart"监听事件
     * events.register("loadstart", undefined, loadStartListener);
     *
     * // 同时为对象注册多个监听事件
     * events.on({
     *     "loadstart": loadStartListener,
     *     "loadend": loadEndListener,
     *     scope: object
     * });
     *
     * // 同时为对象注册多个监听事件，多次调用register方法
     * events.register("loadstart", object, loadStartListener);
     * events.register("loadend", object, loadEndListener);
     * (end)
     *
     * Parameters:
     *  object - {Object}     
     */
    on: function(object) {
        for(var type in object) {
            if(type !== "scope" && object.hasOwnProperty(type)) {
                this.register(type, object.scope, object[type]);
            }
        }
    },

    /**
     * APIMethod: register
     * 在事件对象上注册一个事件。当事件被触发时，'func'函数被调用，假设我们触发一个事件，
     * 指定SuperMap.Bounds作为‘obj’,当事件被触发时，回调函数的上下文作为Bounds对象，
     *
     * Parameters:
     * type - {String} 事件注册者的名字
     * obj - {Object} 对象绑定的回调。如果没有特定的对象，则默认是事件的object属性
     * func - {Function} 回调函数，如果没有特定的回调，则这个函数不做任何事情
     * priority - {Boolean|Object} 当为true时将新的监听加在事件队列的前面。
     */
    register: function (type, obj, func, priority) {
        if (type in SuperMap.Events && !this.extensions[type]) {
            this.extensions[type] = new SuperMap.Events[type](this);
        }
        if ( (func != null) && 
             (SuperMap.Util.indexOf(this.eventTypes, type) !== -1) ) {

            if (obj == null)  {
                obj = this.object;
            }
            var listeners = this.listeners[type];
           if (!listeners) {
                listeners = [];
                this.listeners[type] = listeners;
                this.extensionCount[type] = 0;
            }
            var listener = {obj: obj, func: func};
            if (priority) {
                listeners.splice(this.extensionCount[type], 0, listener);
                if (typeof priority === "object" && priority.extension) {
                    this.extensionCount[type]++;
                }
            } else {
                listeners.push(listener);
            }
        }
    },

    /**
     * APIMethod: registerPriority
     * 相同的注册方法，但是在前面增加新的监听者事件查询而代替到方法的结束
     *
     * Parameters:
     * type - {String} 事件注册者的名字
     * obj - {Object} 对象绑定方面的回调。如果没有特定的对象，则默认是事件的object属性
     * func - {Function} 回调函数，如果没有特定的回调，则这个函数不做任何事情  
     */
    registerPriority: function (type, obj, func) {
        this.register(type, obj, func, true);
//        if (func != null) {
//            if (obj == null)  {
//                obj = this.object;
//            }
//            var listeners = this.listeners[type];
//            if (listeners != null) {
//                listeners.unshift( {obj: obj, func: func} );
//            }
//        }
    },
    
    /**
     * APIMethod: un
     * 在一个相同的范围内取消注册监听器的方法，此方法调用<unregister>函数。
     *
     * Example use:
     * (code)
     * // 移除"loadstart" 事件监听
     * events.un({"loadstart": loadStartListener});
     *
     * // 使用unregister方法移除"loadstart" 事件监听
     * events.unregister("loadstart", undefined, loadStartListener);
     *
     * // 取消对象多个事件监听
     * events.un({
     *     "loadstart": loadStartListener,
     *     "loadend": loadEndListener,
     *     scope: object
     * });
     *
     * // 取消对象多个事件监听，多次调用unregister方法
     * events.unregister("loadstart", object, loadStartListener);
     * events.unregister("loadend", object, loadEndListener);
     * (end)
     */
    un: function(object) {
        for(var type in object) {
            if(type !== "scope" && object.hasOwnProperty(type)) {
                this.unregister(type, object.scope, object[type]);
            }
        }
    },

    /**
     * APIMethod: unregister
     * 反注册
     * 
     * Parameters:
     * type - {String} 
     * obj - {Object} 默认为 this.object。
     * func - {Function} 
     */
    unregister: function (type, obj, func) {
        if (obj == null)  {
            obj = this.object;
        }
        var listeners = this.listeners[type];
        if (listeners != null) {
            for (var i=0, len=listeners.length; i<len; i++) {
                if (listeners[i].obj === obj && listeners[i].func === func) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    },

    /** 
     * Method: remove
     * Remove all listeners for a given event type. If type is not registered,
     *     does nothing.
     *
     * Parameters:
     * type - {String} 
     */
    remove: function(type) {
        if (this.listeners[type] != null) {
            this.listeners[type] = [];
        }
    },

    /**
     * APIMethod: triggerEvent
     * 触发一个特定的注册事件.  
     * 
     * Parameters:
     * type - {String} 触发事件类型。
     * evt - {Event} 事件。
     *
     * Returns:
     * {Boolean} 返回监听对象，如果返回是faler(假)，则停止监听。
     */
    triggerEvent: function (type, evt) {
        var listeners = this.listeners[type];

        // fast path
        if(!listeners || listeners.length == 0) {
            return undefined;
        }

        // prep evt object with object & div references
        if (evt == null) {
            evt = {};
        }
        evt.object = this.object;
        evt.element = this.element;
        if(!evt.type) {
            evt.type = type;
        }
    
        // execute all callbacks registered for specified type
        // get a clone of the listeners array to
        // allow for splicing during callbacks
        listeners = listeners.slice();
        var continueChain;
        for (var i=0, len=listeners.length; i<len; i++) {
            var callback = listeners[i];
            // bind the context to callback.obj
            continueChain = callback.func.apply(callback.obj, [evt]);

            if ((continueChain != undefined) && (continueChain == false)) {
                // if callback returns false, execute no more callbacks.
                break;
            }
        }
        // don't fall through to other DOM elements
        if (!this.fallThrough) {           
            SuperMap.Event.stop(evt, true);
        }
        return continueChain;
    },

    /**
     * Method: handleBrowserEvent
     * Basically just a wrapper to the triggerEvent() function, but takes 
     *     care to set a property 'xy' on the event with the current mouse 
     *     position.
     *
     * Parameters:
     * evt - {Event} 
     */
    handleBrowserEvent: function (evt) {
        var type = evt.type, listeners = this.listeners[type];
        if(!listeners || listeners.length == 0) {
            // noone's listening, bail out
            return;
        }
        // add clientX & clientY to all events - corresponds to average x, y
        var touches = evt.touches;
        if (touches && touches[0]) {
            var x = 0;
            var y = 0;
            var num = touches.length;
            var touch;
            for (var i=0; i<num; ++i) {
                touch = touches[i];
                x += touch.clientX;
                y += touch.clientY;
            }
            evt.clientX = x / num;
            evt.clientY = y / num;
        }
        if (this.includeXY) {
            evt.xy = this.getMousePosition(evt);
        } 
        this.triggerEvent(type, evt);
    },

    /**
     * APIMethod: clearMouseCache
     * 清除鼠标缓存。
     */
    clearMouseCache: function() { 
        this.element.scrolls = null;
        this.element.lefttop = null;
        // SuperMap.Util.pagePosition needs to use
        // element.getBoundingClientRect to correctly calculate the offsets
        // for the iPhone, but once the page is scrolled, getBoundingClientRect
        // returns incorrect offsets. So our best bet is to not invalidate the
        // offsets once we have them, and hope that the page was not scrolled
        // when we did the initial calculation.
        var body = document.body;
        if (body && !((body.scrollTop != 0 || body.scrollLeft != 0) &&
                                    navigator.userAgent.match(/iPhone/i))) {
            this.element.offsets = null;
        }
    },      

    /**
     * Method: getMousePosition
     * 
     * Parameters:
     * evt - {Event} 
     * 
     * Returns:
     * {<SuperMap.Pixel>} The current xy coordinate of the mouse, adjusted
     *                      for offsets
     */
    getMousePosition: function (evt) {
        if (!this.includeXY) {
            this.clearMouseCache();
        } else if (!this.element.hasScrollEvent) {
            SuperMap.Event.observe(window, "scroll", this.clearMouseListener);
            this.element.hasScrollEvent = true;
        }
        
        if (!this.element.scrolls) {
            var viewportElement = SuperMap.Util.getViewportElement();
            this.element.scrolls = [
                viewportElement.scrollLeft,
                viewportElement.scrollTop
            ];
        }

        if (!this.element.lefttop) {
            this.element.lefttop = [
                (document.documentElement.clientLeft || 0),
                (document.documentElement.clientTop  || 0)
            ];
        }
        
        if (!this.element.offsets) {
            this.element.offsets = SuperMap.Util.pagePosition(this.element);
        }

        return new SuperMap.Pixel(
            (evt.clientX + this.element.scrolls[0]) - this.element.offsets[0]
                         - this.element.lefttop[0], 
            (evt.clientY + this.element.scrolls[1]) - this.element.offsets[1]
                         - this.element.lefttop[1]
        ); 
    },

    CLASS_NAME: "SuperMap.Events"
});
