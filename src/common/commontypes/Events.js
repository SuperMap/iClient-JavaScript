import SuperMap from '../SuperMap';
import Pixel from './Pixel';
import {Event} from './Event';
import {FunctionExt} from './BaseTypes';
import {Util} from './Util';

/**
 * @class SuperMap.Events
 * @classdesc 事件类
 * @param object - {Object} 当前事件对象被添加到的JS对象
 * @param element - {HTMLElement} 响应浏览器事件的dom元素
 * @param eventTypes - {Array<string>} 自定义应用事件的数组
 * @param fallThrough - {Boolean} 是否允许事件处理之后向上传递（冒泡），为false的时候阻止事件冒泡
 * @param options - {Object} 事件对象选项。
 */
export default class Events {

    /**
     * @member SuperMap.Events.prototype.BROWSER_EVENTS -{Array<string>}
     * @description 支持的事件。
     * @constant
     * @default [
     "mouseover", "mouseout",
     "mousedown", "mouseup", "mousemove",
     "click", "dblclick", "rightclick", "dblrightclick",
     "resize", "focus", "blur",
     "touchstart", "touchmove", "touchend",
     "keydown", "MSPointerDown", "MSPointerUp", "pointerdown", "pointerup",
     "MSGestureStart", "MSGestureChange", "MSGestureEnd",
     "contextmenu"
     ]
     *
     */
    BROWSER_EVENTS = [
        "mouseover", "mouseout",
        "mousedown", "mouseup", "mousemove",
        "click", "dblclick", "rightclick", "dblrightclick",
        "resize", "focus", "blur",
        "touchstart", "touchmove", "touchend",
        "keydown", "MSPointerDown", "MSPointerUp", "pointerdown", "pointerup",
        "MSGestureStart", "MSGestureChange", "MSGestureEnd",
        "contextmenu"
    ];

    /**
     * @member SuperMap.Events.prototype.listeners -{Object}
     * @description Hashtable of Array(Function): events listener functions
     */
    listeners = null;

    /**
     * @member SuperMap.Events.prototype.object  -{Object}
     * @description  the code object issuing application events
     */
    object = null;

    /**
     * @member SuperMap.Events.prototype.element  -{HTMLElement}
     * @description the DOM element receiving browser events
     */
    element = null;

    /**
     * @member SuperMap.Events.prototype.eventTypes  -{Array<string>}
     * @description list of support application events
     */
    eventTypes = null;

    /**
     * @member SuperMap.Events.prototype.eventHandler -{Function}
     * @description bound event handler attached to elements
     */
    eventHandler = null;

    /**
     * @member SuperMap.Events.prototype.fallThrough -{Boolean}
     * @description 是否允许事件处理之后向上传递（冒泡），为false的时候阻止事件冒泡。
     */
    fallThrough = null;

    /**
     * @member SuperMap.Events.prototype.includeXY -{Boolean}
     * @description 判断是否让.xy属性自动创建到浏览器上的鼠标事件，一般设置为false，如果设置为true，鼠标事件将会在事件传递过程中自动产生.xy属性。
     * 可根据事件对象的'evt.object'属性在相关的事件句柄上调用getMousePosition函数，
     * @example
     * 如：
     *  function named(evt) {
     *        this.xy = this.object.events.getMousePosition(evt)
     *  }
     *
     * 这个选项习惯默认为false的原因在于，当创建一个事件对象，其主要目的是管理
     * 在一个div的相对定位的鼠标事件,将其设为true也是有意义的。
     *
     * 这个选项也可以用来控制是否抵消缓存。如果设为false不抵消，如果设为true，用this.clearMouseCache() 清除缓存偏移（边界元素偏移，元素在页面的位置偏移）。
     *
     */
    includeXY = false;

    /**
     * @member SuperMap.Events.prototype.extensions -{Object}
     * @description Event extensions registered with this instance. Keys are
     *     event types, values are {SuperMap.Events.*} extension instances or
     *     {Boolean} for events that an instantiated extension provides in
     *     addition to the one it was created for.<br>
     *
     * Extensions create an event in addition to browser events, which usually
     * fires when a sequence of browser events is completed. Extensions are
     * automatically instantiated when a listener is registered for an event
     * provided by an extension.<br>
     *
     * Extensions are created in the <SuperMap.Events> namespace using
     * <SuperMap.Class>, and named after the event they provide.
     * The constructor receives the target <SuperMap.Events> instance as
     * argument. Extensions that need to capture browser events before they
     * propagate can register their listeners events using <register>, with
     * {extension: true} as 4th argument.<br>
     *
     * If an extension creates more than one event, an alias for each event
     * type should be created and reference the same class. The constructor
     * should set a reference in the target's extensions registry to itself.<br>
     *
     * @example
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
     */
    extensions = null;

    /**
     * @member SuperMap.Events.prototype.extensionCount -{Object}
     * @description Keys are event types (like in <listeners>), values are the
     *     number of extension listeners for each event type.
     */
    extensionCount = null;
    /**
     * @member SuperMap.Events.prototype.clearMouseListener -{Object}
     * @description A version of {@link clearMouseCache} that is bound to this instance so that
     *     it can be used with {@link SuperMap.Event.observe} and
     *     {@link SuperMap.Event.stopObserving}.
     */
    clearMouseListener = null;

    constructor(object, element, eventTypes, fallThrough, options) {
        Util.extend(this, options);
        this.object = object;
        this.fallThrough = fallThrough;
        this.listeners = {};
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
            for (var i = 0, len = eventTypes.length; i < len; i++) {
                this.addEventType(eventTypes[i]);
            }
        }

        // if a dom element is specified, add a listeners list
        // for browser events on the element and register them
        if (element != null) {
            this.attachToElement(element);
        }
    }

    /**
     * @function SuperMap.Events.prototype.destroy
     * @description 移除当前要素element上的所有事件监听和处理。
     */
    destroy() {
        for (var e in this.extensions) {
            if (typeof this.extensions[e] !== "boolean") {
                this.extensions[e].destroy();
            }
        }
        this.extensions = null;
        if (this.element) {
            Event.stopObservingElement(this.element);
            if (this.element.hasScrollEvent) {
                Event.stopObserving(
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
    }

    /**
     * @function SuperMap.Events.prototype.addEventType
     * @description 在此事件对象中添加新的事件类型，如果这个事件类型已经添加过了，则不做任何事情。
     * @param eventName - {string} 事件名。
     */
    addEventType(eventName) {
        if (!this.listeners[eventName]) {
            this.eventTypes.push(eventName);
            this.listeners[eventName] = [];
        }
    }

    /**
     * @function SuperMap.Events.prototype.attachToElement
     * @param element - {HTMLDOMElement} a DOM element to attach browser events to
     */
    attachToElement(element) {
        if (this.element) {
            Event.stopObservingElement(this.element);
        } else {
            // keep a bound copy of handleBrowserEvent() so that we can
            // pass the same function to both Event.observe() and .stopObserving()
            this.eventHandler = FunctionExt.bindAsEventListener(
                this.handleBrowserEvent, this
            );

            // to be used with observe and stopObserving
            this.clearMouseListener = FunctionExt.bind(
                this.clearMouseCache, this
            );
        }
        this.element = element;
        for (var i = 0, len = this.BROWSER_EVENTS.length; i < len; i++) {
            var eventType = this.BROWSER_EVENTS[i];

            // every browser event has a corresponding application event
            // (whether it's listened for or not).
            this.addEventType(eventType);

            // use Prototype to register the event cross-browser
            Event.observe(element, eventType, this.eventHandler);
        }
        // disable dragstart in IE so that mousedown/move/up works normally
        Event.observe(element, "dragstart", Event.stop);
    }


    /**
     * @function SuperMap.Events.prototype.on
     * @description 在一个相同的范围内注册监听器的方法，此方法调用register函数。
     * @example
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
     *
     *
     * @param  object - {Object} 添加监听的对象
     */
    on(object) {
        for (var type in object) {
            if (type !== "scope" && object.hasOwnProperty(type)) {
                this.register(type, object.scope, object[type]);
            }
        }
    }


    /**
     * @function SuperMap.Events.prototype.register
     * @description 在事件对象上注册一个事件。当事件被触发时，'func'函数被调用，假设我们触发一个事件，
     * 指定SuperMap.Bounds作为‘obj’,当事件被触发时，回调函数的上下文作为Bounds对象，
     * @param type - {string} 事件注册者的名字
     * @param obj - {Object} 对象绑定的回调。如果没有特定的对象，则默认是事件的object属性
     * @param func - {Function} 回调函数，如果没有特定的回调，则这个函数不做任何事情
     * @param priority - {Boolean|Object} 当为true时将新的监听加在事件队列的前面。
     */
    register(type, obj, func, priority) {
        if (type in Events && !this.extensions[type]) {
            this.extensions[type] = new Events[type](this);
        }
        if ((func != null) &&
            (Util.indexOf(this.eventTypes, type) !== -1)) {

            if (obj == null) {
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
    }

    /**
     * @function SuperMap.Events.prototype.registerPriority
     * @description 相同的注册方法，但是在前面增加新的监听者事件查询而代替到方法的结束
     * @param type - {string} 事件注册者的名字
     * @param obj - {Object} 对象绑定方面的回调。如果没有特定的对象，则默认是事件的object属性
     * @param func - {Function} 回调函数，如果没有特定的回调，则这个函数不做任何事情
     */
    registerPriority(type, obj, func) {
        this.register(type, obj, func, true);
    }


    /**
     * @function SuperMap.Events.prototype.un
     * @description 在一个相同的范围内取消注册监听器的方法，此方法调用<unregister>函数。
     * @example
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
     *
     * @param object - {Object} 移除监听的对象
     */
    un(object) {
        for (var type in object) {
            if (type !== "scope" && object.hasOwnProperty(type)) {
                this.unregister(type, object.scope, object[type]);
            }
        }
    }

    /**
     * @function SuperMap.Events.prototype.unregister
     * @description 反注册
     * @param type - {string}
     * @param obj - {Object} 默认为 this.object。
     * @param func - {Function}
     */
    unregister(type, obj, func) {
        if (obj == null) {
            obj = this.object;
        }
        var listeners = this.listeners[type];
        if (listeners != null) {
            for (var i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i].obj === obj && listeners[i].func === func) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }


    /**
     * @function SuperMap.Events.prototype.remove
     * @description Remove all listeners for a given event type. If type is not registered,
     *     does nothing.
     * @param type - {string}
     */
    remove(type) {
        if (this.listeners[type] != null) {
            this.listeners[type] = [];
        }
    }

    /**
     * @function SuperMap.Events.prototype.triggerEvent
     * @description 触发一个特定的注册事件.
     * @param type - {string} 触发事件类型。
     * @param evt - {Event} 事件。
     * @returns {Boolean} 返回监听对象，如果返回是faler(假)，则停止监听。
     */
    triggerEvent(type, evt) {
        var listeners = this.listeners[type];

        // fast path
        if (!listeners || listeners.length == 0) {
            return undefined;
        }

        // prep evt object with object & div references
        if (evt == null) {
            evt = {};
        }
        evt.object = this.object;
        evt.element = this.element;
        if (!evt.type) {
            evt.type = type;
        }

        // execute all callbacks registered for specified type
        // get a clone of the listeners array to
        // allow for splicing during callbacks
        listeners = listeners.slice();
        var continueChain;
        for (var i = 0, len = listeners.length; i < len; i++) {
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
            Event.stop(evt, true);
        }
        return continueChain;
    }


    /**
     * @function SuperMap.Events.prototype.handleBrowserEvent
     * @description Basically just a wrapper to the triggerEvent() function, but takes
     *     care to set a property 'xy' on the event with the current mouse
     *     position.
     * @param evt - {Event}
     */
    handleBrowserEvent(evt) {
        var type = evt.type, listeners = this.listeners[type];
        if (!listeners || listeners.length == 0) {
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
            for (var i = 0; i < num; ++i) {
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
    }


    /**
     * @function SuperMap.Events.prototype.clearMouseCache
     * @description 清除鼠标缓存。
     */
    clearMouseCache() {
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
    }

    /**
     * @function SuperMap.Events.prototype.getMousePosition
     * @param evt - {Event}
     * @returns {SuperMap.Pixel} The current xy coordinate of the mouse, adjusted
     *                      for offsets
     */
    getMousePosition(evt) {
        if (!this.includeXY) {
            this.clearMouseCache();
        } else if (!this.element.hasScrollEvent) {
            Event.observe(window, "scroll", this.clearMouseListener);
            this.element.hasScrollEvent = true;
        }

        if (!this.element.scrolls) {
            var viewportElement = Util.getViewportElement();
            this.element.scrolls = [
                viewportElement.scrollLeft,
                viewportElement.scrollTop
            ];
        }

        if (!this.element.lefttop) {
            this.element.lefttop = [
                (document.documentElement.clientLeft || 0),
                (document.documentElement.clientTop || 0)
            ];
        }

        if (!this.element.offsets) {
            this.element.offsets = Util.pagePosition(this.element);
        }

        return new Pixel(
            (evt.clientX + this.element.scrolls[0]) - this.element.offsets[0]
            - this.element.lefttop[0],
            (evt.clientY + this.element.scrolls[1]) - this.element.offsets[1]
            - this.element.lefttop[1]
        );
    }

    CLASS_NAME = "SuperMap.Events"
}
SuperMap.Events = Events;
SuperMap.Events.prototype.BROWSER_EVENTS = [
    "mouseover", "mouseout",
    "mousedown", "mouseup", "mousemove",
    "click", "dblclick", "rightclick", "dblrightclick",
    "resize", "focus", "blur",
    "touchstart", "touchmove", "touchend",
    "keydown", "MSPointerDown", "MSPointerUp", "pointerdown", "pointerup",
    "MSGestureStart", "MSGestureChange", "MSGestureEnd",
    "contextmenu"
];