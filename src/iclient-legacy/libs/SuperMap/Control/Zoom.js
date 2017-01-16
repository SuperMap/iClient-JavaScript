/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Control.js
 */
 
/**
 * Class: SuperMap.Control.Zoom
 * 缩放类。
 * 用于缩放地图。默认情况下垂直显示在地图左上角。
 *
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.Zoom = SuperMap.Class(SuperMap.Control, {

    /**
     * Property: zoomInClassName
     * {String}
     * 加号按钮的dom className
     */
    zoomInClassName: "smControlZoomIn",

    /**
     * Property: zoomOutClassName
     * {String}
     * 减号按钮的dom className
     */
    zoomOutClassName: "smControlZoomOut",
    
    /**
     * Property: body
     * {DOMElement}
     * 
     */
    body:null,

    /**
     * Constructor: SuperMap.Control.Zoom
     * 创建Zoom控件，options作为参数传递直接扩展控件.如下面的例子所示：
     * 
     * > var zoom = new SuperMap.Control.Zoom({defaultPosition: new SuperMap.Pixel(10,10)});
     * 
     * Parameters:
     * options - {Object} 
     */
    initialize: function (options) {
        this.defaultPosition = new SuperMap.Pixel(10,10);
        SuperMap.Control.prototype.initialize.apply(this,arguments);
    },

    /**
     * Method: draw
     * 创建缩放控件
     * Returns:
     * {DOMElement} A reference to the DOMElement containing the zoom links.
     */
    draw: function() {
        var div = SuperMap.Control.prototype.draw.apply(this,arguments),
            links = this.getOrCreateLinks(div),
            zoomIn = links.zoomIn,
            zoomOut = links.zoomOut;

        /*
         var eventsInstance = this.map.events;

         if (zoomOut.parentNode !== div) {
         eventsInstance = this.events;
         eventsInstance.attachToElement(zoomOut.parentNode);
         }
         eventsInstance.register("buttonclick", this, this.onZoomClick);
         */

        if(!this.observed){
            var handler = function(me){
                return function(evt){
                    me.buttonClick(evt);
                }
            }(this);
            SuperMap.Event.observe(zoomOut.parentNode, "mousedown", SuperMap.Function.bindAsEventListener(handler, zoomOut.parentNode));
            this.observed=true;
        }
        // 临时解决移动端点击一次按钮 zoom 两级的问题
        // SuperMap.Event.observe(zoomOut.parentNode, "touchstart", SuperMap.Function.bindAsEventListener(handler, zoomOut.parentNode));
        
        this.zoomInLink = zoomIn;
        this.zoomOutLink = zoomOut;
        return div;
    },

    
    /**
     * Method: getOrCreateLinks
     * 创建加减号按钮
     * Parameters:
     * el - {DOMElement} 父容器
     *
     * Return: 
     * {Object} Object with zoomIn and zoomOut properties referencing links.
     */
    getOrCreateLinks: function(el) {
    	  var zoomIn = this.zoomInLink,
            zoomOut = this.zoomOutLink,b,s;
        b = this.body;
        if(!b){
            b = document.createElement("div");
            el.appendChild(b);
            this.body = b;
        }
        if (!zoomIn) {
            zoomIn = this.createBtn(b,"zoom-plus-mini.png",this.zoomInClassName);
            SuperMap.Element.addClass(zoomIn, "smButton");
        }
        if (!zoomOut) {
            zoomOut = this.createBtn(b,"zoom-minus-mini.png",this.zoomOutClassName);
            SuperMap.Element.addClass(zoomOut, "smButton");
        }
        return {
            zoomIn: zoomIn, zoomOut: zoomOut
        };
    },
    
    /**
     * Method: createBtn
     * 创建加减号按钮
     * Parameters:
     * p - {DOMElement} 父容器
     * m - {String} 图片名称
     * c - {String} 样式名称
     *
     * Return: 
     * {DOMElement} 创建好的按钮对象.
     */
    createBtn: function(p,m,c){//container imgName className
        var a,b,d = document,s;
        
        a = d.createElement("div");
        a.className = c;
        s = a.style;
        s.width = "34px";
        s.height = "30px";
        s.cursor = "pointer";
        p.appendChild(a);
        
        b = d.createElement("img");
        s = b.style;
        s.width = "34px";
        s.height = "30px";
        //控件的样式
        if(SuperMap.Control.SKIN==="BLUE"){
            b.src = SuperMap.Util.getImagesLocation() +"controlSkinBlue/"+ m;
        }
        else{
            b.src = SuperMap.Util.getImagesLocation() +"controlSkinWhite/"+ m;
        }

        a.appendChild(b);
        
        return a;
    },
    
    /**
     * Method: onZoomClick
     * 当点击按钮时调用.
     */
    onZoomClick: function(evt) {
        var button = evt.buttonElement;
        if (button === this.zoomInLink) {
            this.map.zoomIn();
        } else if (button === this.zoomOutLink) {
            this.map.zoomOut();
        }
    },
    
    /**
     * Method: buttonClick
     * 处理鼠标事件.
     */
    buttonClick: function(evt) {
        var element = SuperMap.Event.element(evt);
        if (element && (SuperMap.Event.isLeftClick(evt) || !~evt.type.indexOf("mouse"))) {
            var button = this.getPressedButton(element);
            if (button) {
                var args = {buttonElement: button};
                this.onZoomClick(args);
            }
        }
    },
    
     /**
     * Method: getPressedButton
     * Get the pressed button, if any. Returns undefined if no button
     * was pressed.
     *
     * Arguments:
     * element - {DOMElement} The event target.
     *
     * Returns:
     * {DOMElement} The button element, or undefined.
     */
    getPressedButton: function(element) {
        var depth = 3, // limit the search depth
            button;
        do {
            if(SuperMap.Element.hasClass(element, "smButton")) {
                // hit!
                button = element;
                break;
            }
            element = element.parentNode;
        } while(--depth > 0 && element);
        return button;
    },



    /** 
     * APIMethod: destroy
     * 销毁Zoom控件，释放相关资源。
     */
    destroy: function() {
        SuperMap.Event.stopObservingElement(this.zoomInLink);
        SuperMap.Event.stopObservingElement(this.zoomOutLink);
        delete this.zoomInLink;
        delete this.zoomOutLink;
        delete this.body;
        SuperMap.Control.prototype.destroy.apply(this);
    },

    CLASS_NAME: "SuperMap.Control.Zoom"
});
