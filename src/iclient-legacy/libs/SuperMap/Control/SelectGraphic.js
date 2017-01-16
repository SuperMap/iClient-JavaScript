/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Control.js
 * @requires SuperMap/Graphic.js
 * @requires SuperMap/Handler/Graphic.js
 * @requires SuperMap/Layer/Vector/RootContainer.js
 */

 /**
  * Class: SuperMap.Control.SelectGraphic
  * 要素选择控件，该控件实现在指定的的图层上通过鼠标单击和悬浮选择矢量要素。
  * 
  * 通过 active 和 deactive 两个方法，实现动态的激活和注销,该控件的激活和注销用法如下示例所示：
  * 
  * 激活控件,如下方法： 
  * (code)  
  * selectGraphic.activate();
  * (end) 
  * 注销控件,如下方法： 
  * (code) 
  * selectGraohic.deactivate();
  * (end) 
  * 
  * Inherits from:
  *  - <SuperMap.Control>
  */
SuperMap.Control.SelectGraphic = SuperMap.Class(SuperMap.Control, {
     /**
      * APIProperty: clickout
      * {Boolean} 是否在地物之外点击，取消选择地物。默认为true。
      */
    clickout: true,

     /**
      * APIProperty: toggle
      * {Boolean} 单击当前选中的要素时，是否取消其选中状态。默认为false。即不取消其选中状态。
      *           仅当hover属性为false有效。
      */
    toggle: false,

     /**
      * APIProperty: repeat
      * {Boolean} 是否重复触发地物选择事件，只在单选非toggle模式下有效。默认为false，表示处于
      * 选中状态的地物不在触发选择事件。
      */
    repeat: false,

    
     /**
      * Property: onBeforeSelect 
      * {Function} Optional function to be called before a graphic is selected.
      *     The function should expect to be called with a graphic.
      */
    onBeforeSelect: function() {},
    
     /**
      * APIProperty: onSelect 
      * {Function} 当地物被选中时可以调用该方法，完成用户指定的任务。要求用户定义具体方法，
      * 该方法接收当前选中要素作为参数。
      */
    onSelect: function() {},

     /**
      * APIProperty: onUnselect
      * {Function} 当地物被取消选择时可以调用该方法，完成用户指定的任务。要求用户定义具体方法，
      * 该方法接收地物要素作为参数。
      */
    onUnselect: function() {},
    
     /**
      * Property: scope
      * {Object} The scope to use with the onBeforeSelect, onSelect, onUnselect
      *     callbacks. If null the scope will be this control.
      */
    scope: null,

     /**
      * APIProperty: geometryTypes
      * {Array(String)} 通过该属性限制选中地物的类型。该属性为地物类名的字符串数组。
      */
    geometryTypes: null,

     /**
      * Property: layer
      * {<SuperMap.Layer.Vector>} The vector layer with a common renderer
      * root for all layers this control is configured with (if an array of
      * layers was passed to the constructor), or the vector layer the control
      * was configured with (if a single layer was passed to the constructor).
      */
    layer: null,
    
     /**
      * Property: layers
      * {Array(<SuperMap.Layer.Vector>)} The layers this control will work on,
      * or null if the control was configured with a single layer
      */
    layers: null,

     /**
      * APIProperty: callbacks
      * {Object} 传递给 handlers.graphic 的回调函数，函数中定义了通过鼠标操作矢量要素的方法，供 handlers.graphic 调用。
	  * 有关矢量要素支持的混合事件调用方式，请参考 {<SuperMap.Handler.Graphic>}。使用方式如下：
	  * (start code)
      * var callbacks = {
      *     over: function(currentGraphic){//todo},
      *     out: function(currentGraphic){//todo},
      *     click: function(currentGraphic){//todo},
      *     clickout: function(lastGraphic){//todo},
      * };
      * var vectorLayer = new SuperMap.Layer.Vector();
      * var selectGraphic = new SuperMap.Control.SelectGraphic(vectorLayer, {
      *     onSelect: onGraphicSelected,
      *     callbacks: callbacks,
      * });
      * var map = new SuperMap.Map("map");
      * map.addControl(selectGraphic);
      * function onGraphicSelected(currentGraphic){//todo};
      * (end)
      * 上述各事件混合操作说明：
	  *
      * 1、如果要素仅需要支持click事件，在实例化SelectGraphic时，只需注册onSelect事件即可，代码如下：
	  * (start code)
      * var selectGraphic = new SuperMap.Control.SelectGraphic(vectorLayer, {
      *     onSelect: onGraphicSelected
      * });
	  * (end)
      * 2、如果要素仅需要支持over事件，在实例化SelectGraphic时，只需注册onSelect事件，
      *    同时设置hover属性为true，代码如下：
	  * (start code)
      * var selectGraphic = new SuperMap.Control.SelectGraphic(vectorLayer, {
      *     onSelect: onGraphicSelected，
      * });
	  * (end)
      * 3、如果要支持混合事件操作，请注册callbacks属性。不过有一点需要注意的就是在
      *    callbacks属性中同时注册了click和dblclick事件，只有click事件起作用。如果
      *    还需要dblclick起作用，请在callbacks属性中取消click注册，修改为使用
      *    onSelect注册，同时确保hover属性为false。
	  *
      * 4、在callbacks属性中注册的click、over事件会覆盖同时注册的onSelect事件。
      */
    callbacks: null,
    
     /**
      * Property: renderIntent
      * {String} key used to retrieve the select style from the layer's
      * style map.
      */
    renderIntent: "select",

     /**
      * Property: handlers
      * {Object} Object with references to multiple <SuperMap.Handler>
      *     instances.
      */
    handlers: null,

     /**
      * Constructor: SuperMap.Control.SelectGraphic
      * 创建一个选择要素的控件。
      *
      * Parameters:
      * layers - {<SuperMap.Layer.Vector>} vector图层数组。用于从layer(s)选择要素集。
      * options - {Object} 
      *     
      *    创建 SelectGraphic 控件，可用如下方法：
      *    (start code) 
      *    //声明一个矢量图层 vectorLayer，在 vectorLayer 上进行要素选择
      *    vectorLayer = new SuperMap.Layer.Vector("Vector Layer"); 
      *    //实例化 selectGraphic 控件，调用了 onSelect 和 onUnselect 方法
      *    //地物被选中时调用 onSelect 方法，地物被取消选中时调用 onUnselect 方法      
      *    selectGraphic = new SuperMap.Control.SelectGraphic(vectorLayer,
      *        {onSelect:onGraphicSelect,onUnselect:onUnGraphicSelect});
      *    //map上添加控件
      *    map.addControl(selectGraphic);
      *    //激活控件      
      *    selectGraphic.activate();
      *          
      *    //要素被选中时调用此函数,需要传入当前选中要素参数graphic
      * function onGraphicSelect(graphic) {
      *     //TODO
      * }
      *    //要素被取消选中时调用此函数,需要传入当前要素参数graphic
      *    function onUnGraphicSelect(graphic) {
      *     //TODO
      *    }
      *    (end)       
      */
    initialize: function(layer, options) {
        SuperMap.Control.prototype.initialize.apply(this, [options]);
        
        if(this.scope === null) {
            this.scope = this;
        }
        //this.initLayer(layers);
         if(layer){
             this.layer = layer;
         }
        var callbacks = {
            click: this.select,
            clickout: this.unselect,
            over: this.overGraphic,
            out: this.outGraphic
        };
             
        this.callbacks = SuperMap.Util.extend(callbacks, this.callbacks);
        this.handlers = {
            graphic: new SuperMap.Handler.Graphic(
                this,
                this.layer,
                this.callbacks
            )
        };
    },

    
     /**
      * Method: destroy
      */
    destroy: function() {
        if(this.active && this.layers) {
            this.map.removeLayer(this.layer);
        }
        SuperMap.Control.prototype.destroy.apply(this, arguments);
        if(this.layers) {
            this.layer.destroy();
        }
    },

     /**
      * Method: activate
      * Activates the control.
      * 
      * Returns:
      * {Boolean} The control was effectively activated.
      */
    activate: function () {
        if (!this.active) {
            if(this.layers) {
                this.map.addLayer(this.layer);
            }
            this.handlers.graphic.activate();
            if(this.box && this.handlers.box) {
                this.handlers.box.activate();
            }
        }
        return SuperMap.Control.prototype.activate.apply(
            this, arguments
        );
    },

     /**
      * Method: deactivate
      * Deactivates the control.
      * 
      * Returns:
      * {Boolean} The control was effectively deactivated.
      */
    deactivate: function () {
        if (this.active) {
            this.handlers.graphic.deactivate();
            if(this.handlers.box) {
                this.handlers.box.deactivate();
            }
            if(this.layers) {
                this.map.removeLayer(this.layer);
            }
        }
        return SuperMap.Control.prototype.deactivate.apply(
            this, arguments
        );
    },

     /**
      * Method: overGraphic
      * Called on over a graphic.
      * Only responds if this.hover is true.
      *
      * Parameters:
      * graphic - {<SuperMap.Graphic.Vector>}
      */
    overGraphic: function() {
       this.layer.map.eventsDiv.style.cursor="pointer";
    },

    /**
     * Method: outFeature
     * Called on out of a selected graphic.
     * Only responds if this.hover is true.
     *
     * Parameters:
     * feature - {<SuperMap.Graphic>}
     */
    outGraphic: function() {
        this.layer.map.eventsDiv.style.cursor='';
    },


     /**
      * Method: select
      * Add graphic to the layer's selectedGraphic array, render the graphic as
      * selected, and call the onSelect function.
      * 
      * Parameters:
      * graphic - {<SuperMap.Graphic.Vector>}
      */
    select: function(graphic, evt) {
        var cont = this.onBeforeSelect.call(this.scope, graphic);
        //var layer = graphic.layer;
        var layer = this.layer;
        if(cont !== false) {
            cont = layer.events.triggerEvent("beforegraphicselected", {
                graphic: graphic
            });
            if(cont !== false) {
                layer.selectedGraphics.push(graphic);
                //this.highlight(graphic);
                // if the graphic handler isn't involved in the graphic
                // selection (because the box handler is used or the
                // graphic is selected programatically) we fake the
                // graphic handler to allow unselecting on click
                if(!this.handlers.graphic.lastGraphic) {
                    this.handlers.graphic.lastGraphic = layer.selectedGraphics[0];
                }
                layer.events.triggerEvent("graphicselected", {graphic: graphic, evt:evt});
                this.onSelect.call(this.scope, graphic, evt);
            }
        }
    },

     /**
      * Method: unselect
      * Remove graphic from the layer's selectedGraphic array, render the graphic as
      * normal, and call the onUnselect function.
      *
      * Parameters:
      * graphic - {<SuperMap.Graphic>}
      */
    unselect: function(graphic) {
        var layer = this.layer;
        SuperMap.Util.removeItem(layer.selectedGraphics, graphic);
        layer.events.triggerEvent("graphicunselected", {graphic: graphic});
        this.onUnselect.call(this.scope, graphic);
    },

     /**
      * Method: setMap
      * Set the map property for the control.
      *
      * Parameters:
      * map - {<SuperMap.Map>}
      */
    setMap: function(map) {
        this.handlers.graphic.setMap(map);
        if (this.box) {
            this.handlers.box.setMap(map);
        }
        SuperMap.Control.prototype.setMap.apply(this, arguments);
    },
    
    CLASS_NAME: "SuperMap.Control.SelectGraphic"
});
