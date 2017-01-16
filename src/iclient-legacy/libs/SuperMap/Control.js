/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.Control
 * 控件类，提供了多种控件，比如比例尺控件，鹰眼控件，缩放条控件等等。
 * 用于处理 Control 事件的事件处理器 Handler，内部封装了一系列的浏览器事件，
 * 在控件(control)实现过程中可调用Handler，通过 active和 
 * deactive两个方法，实现动态的激活和注销。
 * 
 * 可见控件不需要使用 activate 方法激活便可以使用。
 * 
 * 对于非可见控件来说，
 * 带有 autoActivate 属性并且默认值为 true 的控件会在使用时自动激活；
 * 
 * 对于不具备 autoActivate 属性的控件，由于父类Control类中的 autoActivate 属性默认值为false，
 * 所以使用这些控件需要调用 activate 方法进行激活控件，也可通过设置父类的 autoActivate 属性为 true 来激活。
 * 
 * 控件影响地图显示和地图操作，在没有指定控件的情况下，地图默认添加 Navigation、PanZoomBar 控件。
 * 也可通过参数options传入的div添加控件到一个外部的div。 
 * 
 * 例如:
 * 下面的示例演示如何在地图上添加多种控件的方法：
 * 
 * > var map = new SuperMap.Map('map', { controls: [] });
 * >
 * > map.addControl(new SuperMap.Control.LayerSwitcher({'ascending':false}));
 * > map.addControl(new SuperMap.Control.MousePosition());
 * > map.addControl(new SuperMap.Control.OverviewMap());
 * > map.addControl(new SuperMap.Control.KeyboardDefaults());
 *
 * 下面的代码片段是一个关于用户如何截获按住Shift键的同时移动鼠标拖出的边界框的范围事件的简单的例子，如下：
 *
 * > var control = new SuperMap.Control();
 * > SuperMap.Util.extend(control, {
 * >     draw: function () {
 * >         this.box = new SuperMap.Handler.Box( control, 
 * >             {"done": this.notice},
 * >             {keyMask: SuperMap.Handler.MOD_SHIFT});
 * >         this.box.activate();
 * >     },
 * >
 * >     notice: function (bounds) {
 * >     }
 * > }); 
 * > map.addControl(control);
 * 
 */
SuperMap.Control = SuperMap.Class({
    /** 
     * APIProperty: id
     * {String} 控件的id
     */
    id: null,
    
    /** 
     * Property: map 
     * {<SuperMap.Map>} this gets set in the addControl() function in
     * SuperMap.Map 
     */
    map: null,

    /** 
     * APIProperty: div 
     * {DOMElement} 存放此控件的DOM元素，如果不指定则控件默认放置在地图内部。
     */
    div: null,

    /**
     * Property: defaultPosition
     * {<SuperMap.Pixel>} 默认的位置
     * */
    defaultPosition:null,

    /** 
     * APIProperty: type 
     * {Number} 控件的类型。 
     */
    type: null,

    /** 
     * Property: allowSelection
     * {Boolean} By deafault, controls do not allow selection, because
     * it may interfere with map dragging. If this is true, SuperMap
     * will not prevent selection of the control.
     * Default is false.
     */
    allowSelection: false,  

    /** 
     * Property: displayClass 
     * {string}  This property is used for CSS related to the drawing of the
     * Control. 
     */
    displayClass: "",
    
    /**
    * APIProperty: title  
    * {string}  此属性用来在控件上显示一个提示框。
    */ 
    title: "",

    /**
     * Property: position
     * {<SuperMap.Pixel>} 控件的位置
     * */
    position:null,

    /**
     * APIProperty: autoActivate
     * {Boolean} 当控件添加到地图上时激活此控件。默认为false。
     */
    autoActivate: false,

    /** 
     * APIProperty: active 
     * {Boolean} 用户判定控件是否激活状态（只读），用activate、deactivate方法可以改变控件的状态。
     */
    active: null,

    /** 
     * Property: handler 
     * {<SuperMap.Handler>} null
     */
    handler: null,

    /**
     * APIProperty: eventListeners
     * {Object} 如果设置为构造函数的一个选项，eventListeners将被SuperMap.Events.on 注册，
     * 对象结构必须是一个监听器对象，具体例子详细参见events.on方法。
     */
    eventListeners: null,

    /** 
     * APIProperty: events
     * {SuperMap.Events} 注册控件特定事件的监听器实例。
     */
    events: null,

    /**
     * Constant: EVENT_TYPES
     * {Array(String)} 支持的事件类型。注册特定事件的监听器，示例如下：
     * (code)
     * control.events.register(type, obj, listener);
     * (end)
     *
     * event对象具备以下属性：
     * object - {Object} 发出浏览器事件的对象。
     * element - {DOMElement} 浏览器接收事件的DOM元素。
     *
     * 支持的地图事件类型：
     * activate - 控件激活时触发此事件。
     * deactivate - 控件失效时触发此事件。
     */
    EVENT_TYPES: ["activate", "deactivate"],

    /**
     * Constructor: SuperMap.Control
     * 创建控件，options作为参数传递直接扩展控件.如下面的例子所示：
     * 
     * > var control = new SuperMap.Control({div: myDiv});
     *
     * 重写默认属性值为null的div。
     * 
     * Parameters:
     * options - {Object} 
     */
    initialize: function (options) {
        // We do this before the extend so that instances can override
        // className in options.
        this.displayClass = 
            this.CLASS_NAME.replace("SuperMap.", "sm").replace(/\./g, "");
        
        SuperMap.Util.extend(this, options);
        
        this.events = new SuperMap.Events(this, null, this.EVENT_TYPES);
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
        if (this.id == null) {
            this.id = SuperMap.Util.createUniqueID(this.CLASS_NAME + "_");
        }
    },

    /**
     * Method: destroy
     * The destroy method is used to perform any clean up before the control
     * is dereferenced.  Typically this is where event listeners are removed
     * to prevent memory leaks.
     */
    destroy: function () {
        if(this.events) {
            if(this.eventListeners) {
                this.events.un(this.eventListeners);
            }
            this.events.destroy();
            this.events = null;
        }
        this.eventListeners = null;

        // eliminate circular references
        if (this.handler) {
            this.handler.destroy();
            this.handler = null;
        }
        if(this.handlers) {
            for(var key in this.handlers) {
                if(this.handlers.hasOwnProperty(key) &&
                   typeof this.handlers[key].destroy === "function") {
                    this.handlers[key].destroy();
                }
            }
            this.handlers = null;
        }
        if (this.map) {
            this.map.removeControl(this);
            this.map = null;
        }
        this.div = null;
    },

    /** 
     * Method: setMap
     * Set the map property for the control. This is done through an accessor
     * so that subclasses can override this and take special action once 
     * they have their map variable set. 
     *
     * Parameters:
     * map - {<SuperMap.Map>} 
     */
    setMap: function(map) {
        this.map = map;
        if (this.handler) {
            this.handler.setMap(map);
        }
    },

    /**
     * Method: setPosition
     * 设置控件的位置
     *
     * Parameters:
     * px - {SuperMap.Pixel} 控件的位置信息
     */
    setPosition: function(px){
        this.draw(px);
    },
  
    /**
     * Method: draw
     * The draw method is called when the control is ready to be displayed
     * on the page.  If a div has not been created one is created.  Controls
     * with a visual component will almost always want to override this method 
     * to customize the look of control. 
     *
     * Parameters:
     * px - {<SuperMap.Pixel>} The top-left pixel position of the control
     *      or null.
     *
     * Returns:
     * {DOMElement} A reference to the DIV DOMElement containing the control
     */
    draw: function (px) {
        if (this.div == null) {
            this.div = SuperMap.Util.createDiv(this.id);
            this.div.className = this.displayClass;
            if (!this.allowSelection) {
                this.div.className += " smControlNoSelect";
                this.div.setAttribute("unselectable", "on", 0);
                this.div.onselectstart = SuperMap.Function.False; 
            }    
            if (this.title != "") {
                this.div.title = this.title;
            }
        }
        if (px != null) {
            this.position = px.clone();
        }
        this.moveTo(this.position);
        return this.div;
    },

    /**
     * Method: moveTo
     * Sets the left and top style attributes to the passed in pixel 
     * coordinates.
     *
     * Parameters:
     * px - {<SuperMap.Pixel>}
     */
    moveTo: function (px) {
        if(!px){
            px=this.defaultPosition;
        }
        if ((px != null) && (this.div != null)) {
            var s = this.div.style,
                M = SuperMap.Pixel.Mode,
                x = px.x + "px",
                y = px.y + "px";
            if(px.mode){
                s.left = null;
                s.top = null;
                s.right = null;
                s.bottom = null;
            }
            if(!M){
                s.left = x;
                s.top = y;
                return;
            }
            switch (px.mode){
                case M.LeftTop:
                    s.left = x;
                    s.top = y;
                    break;
                case M.RightTop:
                    s.right = x;
                    s.top = y;
                    break;
                case M.RightBottom:
                    s.right = x;
                    s.bottom = y;
                    break;
                case M.LeftBottom:
                    s.left = x;
                    s.bottom = y;
                    break;
                default:
                    s.left = x;
                    s.top = y;
                    break;
            }
        }
    },

    /**
     * APIMethod: activate
     * 激活控件及其相关的处理事件(handler)，控件失效调用deactivate方法。
     * 
     * Returns:
     * {Boolean}  如果控件成功激活则为true，如果控件已经是激活状态则为false。
     */
    activate: function () {
        if (this.active) {
            return false;
        }
        if (this.handler) {
            this.handler.activate();
        }
        this.active = true;
        if(this.map) {
            SuperMap.Element.addClass(
                this.map.viewPortDiv,
                this.displayClass.replace(/ /g, "") + "Active"
            );
        }
        this.events.triggerEvent("activate");
        return true;
    },
    
    /**
     * APIMethod: deactivate
     * 使控件及其相关的处理事件(handler)失效。
     * 
     * Returns:
     * {Boolean} 如果控件得到有效的停用则为true，如果控件已经是失效停用状态则为false。
     */
    deactivate: function () {
        if (this.active) {
            if (this.handler) {
                this.handler.deactivate();
            }
            this.active = false;
            if(this.map) {
                SuperMap.Element.removeClass(
                    this.map.viewPortDiv,
                    this.displayClass.replace(/ /g, "") + "Active"
                );
            }
            this.events.triggerEvent("deactivate");
            return true;
        }
        return false;
    },

    CLASS_NAME: "SuperMap.Control"
});


/**
 * Constant: SuperMap.Control.SKIN
 * {String} 控件的样式,此值需在创建控件前设置。
 * 提供两套样式：一套为"WHITE"，即白色样式，另一套为"BLUE"，即蓝色样式。默认为白色样式：SuperMap.Control.SKIN="WHITE"。
 * 其中，白色样式只支持Zoom、LayerSwitcher、OverviewMap三个控件。
 */
SuperMap.Control.SKIN = "WHITE";

/**
 * Constant: SuperMap.Control.TYPE_BUTTON
 */
SuperMap.Control.TYPE_BUTTON = 1;

/**
 * Constant: SuperMap.Control.TYPE_TOGGLE
 */
SuperMap.Control.TYPE_TOGGLE = 2;

/**
 * Constant: SuperMap.Control.TYPE_TOOL
 */
SuperMap.Control.TYPE_TOOL   = 3;


