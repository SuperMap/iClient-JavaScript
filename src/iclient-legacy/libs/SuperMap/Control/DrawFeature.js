/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Control.js
 * @requires SuperMap/Feature/Vector.js
 */

/**
 * Class: SuperMap.Control.DrawFeature
 * 绘制要素类。通过事件处理器 Handler可以在vector图层上绘制点、线、面等要素,
 *
 * 通过 active 和 deactive 两个方法，实现动态的激活和注销。
 *
 * 调用 active 方法激活控件，如：
 * (code) 
 *  drawPoint.activate();
 * (end) 
 * 调用 deactive 方法注销控件，如： 
 * (code)
 *  drawPoint.deactivate();
 * (end)
 *
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.DrawFeature = SuperMap.Class(SuperMap.Control, {
    /**
     * APIProperty: snap
     * {<SuperMap.Snap>}  捕捉对象，用于在绘制过程中对其他要素进行捕捉
     * */
    snap:null,
    
    /**
     * Property: layer
     * {<SuperMap.Layer.Vector>}
     */
    layer: null,

    /**
     * Property: callbacks
     * {Object} The functions that are sent to the handler for callback
     */
    callbacks: null,
    
    /**
     * Constant: EVENT_TYPES
     * {Array(String)} 支持的事件类型。
     * 支持的事件类型:
     * featureadded - 添加要素时触发此事件，触发此事件时会传入事件参数，事件参数包含了绘制的要素 feature 信息。
     * beforefeatureadded - 创建要素触发此事件，触发此事件时会传入事件参数，事件参数包含了绘制的要素 feature 信息。
     */
    EVENT_TYPES: ["featureadded", "beforefeatureadded"],
    
    /**
     * APIProperty: multi
     * {Boolean} 标识当前绘制的对象由多个部分组成。当多次绘制时，程序会将绘制的要素组合成一个要素。默认为false。
     */
    multi: false,

    /**
     * APIProperty: featureAdded
     * {Function} 当要素绘制成功时调用该函数。
     */
    featureAdded: function() {},

    /**
     * APIProperty: handlerOptions
     * {Object} 常用于设置控件的事件处理器的非默认属性。
     */
    handlerOptions: null,

    /**
     * APIProperty: style
     * {Object} 用于设置所绘制Feature的样式。默认为图层的样式。
     */
    style: null,
    
    /**
     * Constructor: SuperMap.Control.DrawFeature
     * 
     * Parameters:
     * layer - {<SuperMap.Layer.Vector>} 执行绘制要素的图层。
     * handler - {<SuperMap.Handler>} 要素绘制事件处理器，指定当前绘制的要素类型和操作方法。
     * options - {Object} 设置该类及其父类开放的属性。
     *	 
     * 构建 DrawFeature 控件，可用如下方法：	 
     * (start code)
     * //声明一个矢量图层 vectorLayer 控件，用来呈现画面要素
     * var vectorLayer = new SuperMap.Layer.Vector("Vector Layer");	
     * //实例化一个 DrawFeature 控件，调用绘制多边形的事件处理器 Handler.Polygon	 
     * var drawPolygon = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Polygon); 
     * //监听 featureadded 事件，当添加要素时会触发此事件 
     * drawPolygon.events.on({"featureadded": drawCompleted}); 
     * //map上添加控件	 
     * map.addControl(drawPolygon);
     * //激活控件	 
     * drawPolygon.activate();	 
     * 	 
     * //定义 drawCompleted 函数，触发 featureadded 事件会调用此函数	 
     * //事件参数 eventArgs 包含了绘制的要素 feature 信息 {feature: featureObj}
     * function drawCompleted(eventArgs) {	 
     *     // 获取传入参数 eventArgs 的几何信息	
     *     var geometry = eventArgs.feature.geometry;
     *     // TODO  
     *     // 具体绘制过程可以参见范例《数据集查询编辑---几何查询》	 
     * } 
     * (end) 
     */
    initialize: function(layer, handler, options) {
        
        // concatenate events specific to vector with those from the base
		// 包含了DrawFeature自身的EVENT_TYPES和Control类的EVENT_TYPES
        this.EVENT_TYPES =
            SuperMap.Control.DrawFeature.prototype.EVENT_TYPES.concat(
            SuperMap.Control.prototype.EVENT_TYPES
        );
        
        SuperMap.Control.prototype.initialize.apply(this, [options]);
        this.callbacks = SuperMap.Util.extend(
            {
                done: this.drawFeature,
                modify: function(vertex, feature) {
                    this.layer.events.triggerEvent(
                        "sketchmodified", {vertex: vertex, feature: feature}
                    );
                },
                create: function(vertex, feature) {
                    this.events.triggerEvent("beforefeatureadded",{feature : feature});
                    this.layer.events.triggerEvent(
                        "sketchstarted", {vertex: vertex, feature: feature}
                    );
                }
            },
            this.callbacks
        );
        this.layer = layer;
        this.handlerOptions = this.handlerOptions || {};
        if (!("multi" in this.handlerOptions)) {
            this.handlerOptions.multi = this.multi;
        }
        var sketchStyle = this.layer.styleMap && this.layer.styleMap.styles.temporary;
        if(sketchStyle) {
            this.handlerOptions.layerOptions = SuperMap.Util.applyDefaults(
                this.handlerOptions.layerOptions,
                {styleMap: new SuperMap.StyleMap({"default": sketchStyle})}
            );
        }
        this.handler = new handler(this, this.callbacks, this.handlerOptions);

        if(this.layer && this.layer.CLASS_NAME === "SuperMap.Layer.PlottingLayer"){
            this.layer.drawGraphicObject = this;
        }
    },

    /**
     * Method: drawFeature
     */
    drawFeature: function(geometry) {
        if(geometry.CLASS_NAME === "SuperMap.Bounds"){
            var lb = this.map.getLonLatFromPixel(new SuperMap.Pixel(geometry.left, geometry.bottom)),//getLonLatFromPixel从视口坐标获得地理坐标
            rt = this.map.getLonLatFromPixel(new SuperMap.Pixel(geometry.right, geometry.top));
            var geometry = new SuperMap.Geometry.Rectangle(lb.lon,lb.lat,rt.lon-lb.lon,rt.lat-lb.lat);
        }
        else if(geometry.CLASS_NAME === "SuperMap.Pixel"){
            //            var startPx = this.dragHandler.start.clone();
            var lonlat = this.map.getLonLatFromPixel(geometry);
            var geometry = new SuperMap.Geometry.Point(lonlat.lon,lonlat.lat);
        }
		
		var feature = null;
        if(geometry.CLASS_NAME === "SuperMap.Feature.Vector"){
            feature = geometry;
        } else {
            feature = new SuperMap.Feature.Vector(geometry);
            if(this.style) feature.style=this.style;
        }
        //var feature = new SuperMap.Feature.Vector(geometry);
        //if(this.style) feature.style=this.style;
        var proceed = this.layer.events.triggerEvent(
            "sketchcomplete", {feature: feature}
        );
        if(proceed !== false) {
            feature.state = SuperMap.State.INSERT;
            this.layer.addFeatures([feature]);
            this.featureAdded(feature);
            this.events.triggerEvent("featureadded",{feature : feature});
        }
    },
    
    /**
     * APIMethod: insertXY
     * 给定点坐标，将一个点添加到当前轮廓上。只有当前的绘制的要素为线时才有效。
     *
     * Parameters:
     * x - {Number} 点要素的X坐标值。
     * y - {Number} 点要素的y坐标值。
     */
    insertXY: function(x, y) {
        if (this.handler && this.handler.line) {
            this.handler.insertXY(x, y);
        }
    },

    /**
     * APIMethod: insertDeltaXY
     * 相对于上一个插入的点，给定一个偏移距离，再插入一个点。
     *
     * Parameters:
     * dx - {Number} 点要素的x坐标轴偏移量。
     * dy - {Number} 点要素的y坐标轴偏移量。
     */
    insertDeltaXY: function(dx, dy) {
        if (this.handler && this.handler.line) {
            this.handler.insertDeltaXY(dx, dy);
        }
    },

    /**
     * APIMethod: insertDirectionLength
     * 给定一个方向(角度)和长度，相对于当前绘制的要素，插入一个点。
     *
     * Parameters:
     * direction - {Number} x坐标轴顺时针方向的角度。
     * length - {Number} 相对于上一个点的距离。
     */
    insertDirectionLength: function(direction, length) {
        if (this.handler && this.handler.line) {
            this.handler.insertDirectionLength(direction, length);
        }
    },

    /**
     * APIMethod: insertDeflectionLength
     * 给定一个偏转角度和长度，相对应当前绘制要素，插入一个点。偏转角度是顺时针方向。
     *
     * Parameters:
     * deflection - {Number} 相对于上一个要素片段(例如：组成折线的最后一条直线)的顺时针角度。
     * length - {Number} 相对于上一个点的距离。
     */
    insertDeflectionLength: function(deflection, length) {
        if (this.handler && this.handler.line) {
            this.handler.insertDeflectionLength(deflection, length);
        }
    },
    
    /**
     * APIMethod: undo
     * 移除当前绘制的要素的最后一个点。
     *
     * Returns: 
     * {Boolean} 操作是否成功。
     */
    undo: function() {
        return this.handler.undo && this.handler.undo();
    },
    
    /**
     * APIMethod: redo
     * 重新插入当前移除的点，该方法多由undo方法引发。
     * 当任意点被添加时，undo堆栈会被清除。
     *
     * Returns: 
     * {Boolean} 操作是否成功。
     */
    redo: function() {
        return this.handler.redo && this.handler.redo();
    },
    
    /**
     * APIMethod: finishSketch
     * 结束要素的绘制，不包括当前已经绘制的点要素。需要提前结束而不是用户结束绘制时，可以调用此方法。
     */
    finishSketch: function() {
        this.handler.finishGeometry();
    },

    /**
     * APIMethod: cancel
     * 取消当前的绘制。这会移除当前绘制的要素，并且保持绘制控件在激活状态。
     */
    cancel: function() {
        this.handler.cancel();
    },

    CLASS_NAME: "SuperMap.Control.DrawFeature"
});
