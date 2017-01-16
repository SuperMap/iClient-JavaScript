/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Layer.js
 * @requires SuperMap/Feature/Theme.js
 */

/**
 * Class: SuperMap.Layer.Theme
 * 客户端专题图图层基类。
 *
 * 此基类已实现专题图数据管理，初始化渲染器 （renderer）, 事件管理。
 *
 * 专题要素的制作及绘制由其子类完成，所以此类不可实例化。
 *
 * Inherits from:
 *  - <SuperMap.Layer>
 */
SuperMap.Layer.Theme = SuperMap.Class(SuperMap.Layer, {

    /**
     * Register a listener for a particular event with the following syntax:
     * (code)
     *      layer.events.register(type, obj, listener);
     * (end)
     *
     * Listeners will be called with a reference to an event object.  The
     *     properties of this event depends on exactly what happened.
     *
     * All event objects have at least the following properties:
     * object - {Object} A reference to layer.events.object.
     * element - {DOMElement} A reference to layer.events.element.
     *
     * Supported map event types (in addition to those from <SuperMap.Layer>):
     *
     * beforefeaturesadded - Triggered before an array of features is added.
     *      Listeners will receive an object with a *features* property
     *      referencing the feature to be added. To stop the features from
     *      being added, a listener should return false.
     *
     * featuresadded - Triggered after features are added.  The event
     *      object passed to listeners will have a *features* property with a
     *      reference to an array of added features.
     *
     * featuresremoved - Triggered after features are removed. The event
     *      object passed to listeners will have a *features* property with a
     *      reference to an array of removed features.
     */
    EVENT_TYPES: [
        "beforefeaturesadded",
        "featuresadded",
        "featuresremoved"
    ],

    /**
     * APIProperty: isBaseLayer
     * {Boolean} 该图层是否是基础图层，默认值为 false。可以在构造函数中是通过 options 设置。
     */
    isBaseLayer: false,

    /**
     * APIProperty: features
     * {Array(<SuperMap.Feature.Vector>)} 用户数据，矢量要素。
     */
    features: null,

    /**
     * APIProperty: currentMousePosition
     * {<SuperMap.Pixel>} 鼠标在图层中的像素位置。
     */
    currentMousePosition: null,

    /**
     * Property: movingOffset
     * {Array} 地图移动过程中图层div相对于地图div的偏移量。
     */
    movingOffset: null,

    /**
     * Property: levvelRenderer
     * {Object} levvelRenderer 实例。
     */
    levelRenderer: null,

    /**
     * Property: renderer
     * {<SuperMap.LevelRenderer>} 图层渲染器。
     */
    renderer: null,

    /**
     * Property: TFEvents
     * {Array} 专题要素事件临时存储，临时保存图层未添加到 map 前用户添加的事件监听，待图层添加到 map 后把这些事件监听添加到图层上，清空此图层。
     *
     * 这是一个二维数组，组成二维数组的每个一维数组长度为 2，分别是 event, callback。
     */
    TFEvents: null,

    /**
     * Constructor: SuperMap.Layer.Theme
     * 构造函数。
     *
     * Parameters:
     * name - {String} 此图层的图层名。
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Layer.Theme>} 专题图。
     */
    initialize: function(name, options) {
        this.EVENT_TYPES =
            SuperMap.Layer.Theme.prototype.EVENT_TYPES.concat(
                SuperMap.Layer.prototype.EVENT_TYPES
            );

        SuperMap.Layer.prototype.initialize.apply(this, arguments);
        this.features = [];
        this.TFEvents = [];
        this.levelRenderer = new SuperMap.LevelRenderer();

        this.movingOffset = [0, 0];
    },

    /**
     * Method: setMap
     * 图层已经添加到 Map 控件中。
     *
     * 如果没有设置 renderer 集合，这个图层将不可用，从 map 控件中删除，
     * 否则，给当前渲染器添加 map 的引用，并设置渲染器的大小。
     *
     * Parameters:
     * map - {<SuperMap.Map>}需要与图层绑定的map。
     */
    setMap: function(map){
        SuperMap.Layer.prototype.setMap.apply(this, arguments);

        if(!this.levelRenderer){
            this.map.removeLayer(this);
        }
        else
        {
            //初始化渲染器
            var size =  this.map.getSize();
            this.div.style.width = size.w + "px";
            this.div.style.height = size.h + "px";

            this.renderer = this.levelRenderer.init(this.div);
            this.renderer.clear();

            //处理用户预先（在图层添加到 map 前）监听的事件
            this.addTFEvents();
        }
    },

    /**
     * Method: afterAdd
     * Called at the end of the map.addLayer sequence.  At this point, the map
     *     will have a base layer.  To be overridden by subclasses.
     *
     *     用 map mousemove 事件更新 currentMousePosition。
     */
    afterAdd: function() {
        var me = this;
        this.map.events.on({"mousemove":function(e){
            var xy = e.xy.clone();
            me.currentMousePosition = new SuperMap.Pixel(xy.x + me.movingOffset[0], xy.y + me.movingOffset[1]);
        }});
    },

    /**
     * APIMethod: destroy
     * 销毁图层，释放资源。
     */
    destroy: function() {
        this.EVENT_TYPES = null;
        this.isBaseLayer = null;
        this.TFEvents = null;
        this.destroyFeatures();
        this.features = null;
        if (this.renderer) {
            this.renderer.dispose();
        }
        this.renderer = null;
        this.levelRenderer = null;

        this.movingOffset = null;
        this.currentMousePosition = null;

        SuperMap.Layer.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: destroyFeatures
     * 销毁 features.
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 要销毁的 features，
     * 如果不设置此参数，专题图中的所有要素将被销毁。
     *
     * options - {Object}
     */
    destroyFeatures: function(features) {
        var all = (features == undefined);
        if(all) {
            features = this.features;
        }
        if(features) {
            this.removeFeatures(features);
            for(var i=features.length-1; i>=0; i--) {
                features[i].destroy();
            }
        }
    },


    /**
     * Method: clone
     * 创建这个图层的副本。
     *
     * 注意: 这个图层上的 Features 一样会被克隆。
     * Only for Test
     *
     * Returns:
     * {<SuperMap.Layer.Vector>} 图层对象的副本。
     */
    clone: function (obj) {
        if (obj == null) {
            obj = new SuperMap.Layer.Theme(this.name, this.getOptions());
        }

        obj = SuperMap.Layer.prototype.clone.apply(this, [obj]);

        var features = this.features;
        var len = features.length;
        var clonedFeatures = new Array(len);
        for(var i=0; i<len; ++i) {
            clonedFeatures[i] = features[i].clone();
        }
        obj.features = clonedFeatures;

        return obj;
    },

    /**
     * APIMethod: addFeatures
     * 抽象方法，可实例化子类必须实现此方法。
     *
     * 向专题图图层中添加数据 , 专题图仅接收 SuperMap.Feature.Vector 类型数据，
     * feature 将储存于 features 属性中，其存储形式为数组。
     *
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 需要添加的数据。
     */
    addFeatures: function(features) {},

    //数据-删
    /**
     * APIMethod: removeFeatures
     * 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。
     * 参数中的 features 数组中的每一项，必须是已经添加到当前图层中的 feature，
     * 如果无法确定 feature 数组，则可以调用 removeAllFeatures 来删除所有feature。
     * 如果要删除的 feature 数组中的元素特别多，推荐使用 removeAllFeatures，
     * 删除所有feature后再重新添加。这样效率会更高。
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 要删除feature的数组。
     */
    removeFeatures: function(features) {
        if(!features || features.length === 0) {
            return;
        }
        if (features === this.features) {
            return this.removeAllFeatures();
        }
        if (!(SuperMap.Util.isArray(features))) {
            features = [features];
        }

        var featuresFailRemoved = [];

        for (var i = features.length - 1; i >= 0; i--) {
            var feature = features[i];

            //如果我们传入的feature在features数组中没有的话，则不进行删除，
            //并将其放入未删除的数组中。
            var findex = SuperMap.Util.indexOf(this.features, feature);

            if(findex === -1) {
                featuresFailRemoved.push(feature);
                continue;
            }
            this.features.splice(findex, 1);
        }

        var drawFeatures = [];
        for(var hex = 0, len = this.features.length; hex < len; hex++){
            feature = this.features[hex];
            drawFeatures.push(feature);
        }
        this.features = [];
        this.addFeatures(drawFeatures);
        //绘制专题要素
        if(this.renderer){
            if(this.map){
                this.redrawThematicFeatures(this.map.getExtent(), false, false);
            }
            else{
                this.redrawThematicFeatures();
            }
        }

        var succeed = featuresFailRemoved.length == 0 ? true : false;
        this.events.triggerEvent("featuresremoved", {features: featuresFailRemoved, succeed: succeed});
    },

    /**
     * APIMethod: removeAllFeatures
     * 清除当前图层所有的矢量要素。
     */
    removeAllFeatures: function() {
        if(this.renderer) {
            this.renderer.clear();
        }
        this.features = [];
        this.events.triggerEvent("featuresremoved", {features: [], succeed: true});
    },


    //数据-查
    /**
     * Method: getFeatures
     * 查看当前图层中的有效数据。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 用户加入图层的有效数据。
     */
    getFeatures: function(){
        var len = this.features.length;
        var clonedFeatures = new Array(len);
        for(var i = 0; i < len; ++i) {
            clonedFeatures[i] = this.features[i];
            //clonedFeatures[i] = this.features[i].clone();
        }
        return clonedFeatures;
    },

    /**
     * APIMethod: getFeatureBy
     * 在专题图的要素数组 features 里面遍历每一个 feature，当 feature[property] === value 时，
     * 返回此 feature（并且只返回第一个）。
     *
     * Parameters:
     * property - {String} feature 的某个属性名称。
     * value - {String} property 所对应的值。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 第一个匹配属性和值的矢量要素。
     */
    getFeatureBy: function(property, value) {
        var feature = null;
        for(var id in this.features) {
            if(this.features[id][property] === value) {
                feature = this.features[id];
                //feature = this.features[id].clone();
                break;
            }
        }
        return feature;
    },

    /**
     * APIMethod: getFeatureById
     * 通过给定一个 id，返回对应的矢量要素。
     *
     * Parameters:
     * featureId - {String} 矢量要素的属性 id。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 对应id的 feature，如果不存在则返回 null。
     */
    getFeatureById: function(featureId) {
        return this.getFeatureBy('id', featureId);
    },

    /**
     * APIMethod: getFeaturesByAttribute
     * 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
     *
     * Parameters:
     * attrName - {String} 属性的 key。
     * attrValue - {Mixed} 属性对应的 value 值。
     *
     * Returns:
     * Array(<SuperMap.Feature.Vector>) 一个匹配的 feature 数组。
     */
    getFeaturesByAttribute: function(attrName, attrValue) {
        var feature,
            foundFeatures = [];
        for(var id in this.features) {
            feature = this.features[id];
            //feature = this.features[id].clone();
            if(feature && feature.attributes) {
                if (feature.attributes[attrName] === attrValue){
                    foundFeatures.push(feature);
                }
            }
        }
        return foundFeatures;
    },



    /**
     * Method: moveTo
     * 调整图层
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>} 当前级别下计算出的地图范围
     * zoomChanged - {Boolean} 缩放级别是否改变
     * dragging - {Boolean} 是否为拖动触发的
     */
    moveTo:function(bounds, zoomChanged, dragging) {
        SuperMap.Layer.prototype.moveTo.apply(this, arguments);

        var offsetLeft = parseInt(this.map.layerContainerDiv.style.left, 10);
        offsetLeft = -Math.round(offsetLeft);
        var offsetTop = parseInt(this.map.layerContainerDiv.style.top, 10);
        offsetTop = -Math.round(offsetTop);
        this.div.style.left = offsetLeft + 'px';
        this.div.style.top = offsetTop + 'px';

        //绘制专题要素
        if(this.renderer){
            this.redrawThematicFeatures(bounds, zoomChanged, dragging);
        }

        if(this.currentMousePosition){
            this.currentMousePosition = new SuperMap.Pixel(this.currentMousePosition.x - this.movingOffset[0], this.currentMousePosition.y - this.movingOffset[1]);
        }
        this.movingOffset = [0, 0];
    },

    /**
     * Method: moveByPx
     * 重写父类方法。
     */
    moveByPx: function(dx, dy) {
        this.movingOffset[0] += dx;
        this.movingOffset[1] += dy;
    },

    /**
     * Method: redrawThematicFeatures
     * 抽象方法，可实例化子类必须实现此方法。
     *
     * 重绘专题要素。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>} 当前级别下计算出的地图范围
     * zoomChanged - {Boolean} 缩放级别是否改变
     * dragging - {Boolean} 是否为拖动触发的
     */
    redrawThematicFeatures: function(bounds, zoomChanged, dragging){},

    //其它需要重写的 Layer 方法
    /**
     * APIMethod: setOpacity
     * 设置图层的不透明度,取值[0-1]之间。
     *
     * Parameter:
     * opacity - {Float} 图层的不透明度，取值范围：[0-1]。
     */
    setOpacity: function(opacity) {
        if (opacity !== this.opacity) {
            this.opacity = opacity;
            var element = this.div;
            SuperMap.Util.modifyDOMElement(element, null, null, null,
                null, null, null, opacity);

            if (this.map !== null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "opacity"
                });
            }
        }
    },

    /**
     * APIMethod: redraw
     * 重绘该图层，成功则返回true，否则返回 false。
     *
     * Returns:
     * {Boolean} 重绘该图层是否成功。
     */
    redraw: function() {
        if(this.renderer){
            if(this.map){
                this.redrawThematicFeatures(this.map.getExtent(), false, false);
            }
            else{
                this.redrawThematicFeatures();
            }
        }
        return SuperMap.Layer.prototype.redraw.apply(this, arguments);
    },

    /**
     * Method: onMapResize
     * 通知渲染器的尺寸变化。
     *
     */
    onMapResize: function() {
        SuperMap.Layer.prototype.onMapResize.apply(this, arguments);
        var newSize = this.map.getSize();
        this.div.style.width = newSize.w + "px";
        this.div.style.height = newSize.h + "px";
        this.renderer.resize();
    },

    //专题要素事件监听
    /**
     * APIMethod: on
     * 添加专题要素事件监听。
     *
     * 支持的事件包括: click、mousedown、mousemove、mouseout、mouseover、mouseup。
     *
     * Parameters:
     * event - {String} 事件名称。
     * callback - {Function} 事件回调函数。
     *
     */
    on: function(event, callback){
        var cb = callback;
        if(!this.renderer){
            var evn = [];
            evn.push(event);
            evn.push(cb);
            this.TFEvents.push(evn);
        }
        else{
            this.renderer.on(event, cb);
        }
    },

    /**
     * APIMethod: un
     * 移除专题要素事件监听 。
     *
     * Parameters:
     * event - {String} 事件名称。
     * callback - {Function} 事件回调函数。
     *
     */
    un: function(event, callback){
        var cb = callback;
        if(!this.renderer)
        {
            var tfEs = this.TFEvents;
            var len = tfEs.length;

            var newtfEs = [];

            for(var i = 0; i < len; i++){
                var tfEs_i = tfEs[i];

                if( !(tfEs_i[0] === event && tfEs_i[1] === cb) ){
                    newtfEs.push(tfEs_i)
                }
            }

            this.TFEvents = newtfEs;
        }
        else{
            this.renderer.un(event, cb);
        }
    },

    /**
     * Method: addTFEvents
     * 将图层添加到地图上之前用户要求添加的事件监听添加到图层。
     *
     */
    addTFEvents: function(){
        var tfEs = this.TFEvents;
        var len = tfEs.length;

        for(var i = 0; i < len; i++){
            this.renderer.on(tfEs[i][0], tfEs[i][1]);
        }
    },


    //通用方法
    /**
     * Method: getLocalXY
     * 地理坐标转为像素坐标。
     *
     * Parameters:
     * coordinate - {<SuperMap.Geometry.Point>/<SuperMap.Geometry.GeoText>/<SuperMap.LonLat>} 地理坐标点。
     *
     * Returns:
     * {Array} 长度为 2 的数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
     */
    getLocalXY: function(coordinate) {
        var resolution = this.map.getResolution();
        var extent = this.map.getExtent();

        if(coordinate instanceof SuperMap.Geometry.Point || coordinate instanceof SuperMap.Geometry.GeoText){
            var x = (coordinate.x / resolution + (-extent.left / resolution));
            var y = ((extent.top / resolution) - coordinate.y / resolution);
            return [x, y];
        }
        else if(coordinate instanceof SuperMap.LonLat){
            var x = (coordinate.lon / resolution + (-extent.left / resolution));
            var y = ((extent.top / resolution) - coordinate.lat / resolution);
            return [x, y];
        }
        else
        {
            return null;
        }
    },

    CLASS_NAME: "SuperMap.Layer.Theme"
});

/**
 * APIFunction: SuperMap.Layer.Theme.addHoverShape
 * 向专题图层添加额外的高亮显示图形，仅提供添加方法，伴随专题要素（图形）高亮消失自动清除此高亮显示图形。
 *
 * Parameters:
 * layer - {<SuperMap.Layer.Theme>} 添加高亮显示文本的目标专题图层， <SuperMap.Layer.Theme> 子类对象，必设参数。
 * shapeParameters - {<SuperMap.Feature.ShapeParameters>} 图形参数对象，决定高亮显示图形， <SuperMap.Feature.ShapeParameters> 子类对象，必设参数。
 * 注意：通过本方法添加的图形是高亮图形，所以在指定图形样式时应使用 shapeParameters.highlightStyle，不是 shapeParameters.style。
 */
SuperMap.Layer.Theme.addHoverShape = function(layer, shapeParameters){
    if(!layer || !(layer instanceof SuperMap.Layer.Theme) || !layer.renderer
        || !shapeParameters || !(shapeParameters instanceof SuperMap.Feature.ShapeParameters)) return;

    var shapeFactory = new SuperMap.Feature.ShapeFactory();
    var shape = shapeFactory.createShape(shapeParameters);
    layer.renderer.addHoverShape(shape);
};