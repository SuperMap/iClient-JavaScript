var ol = require('openlayers');
var SuperMap = require('../../../common/SuperMap');

ol.source.Theme = function (name, opt_options) {
    var options = opt_options ? opt_options : {};
    ol.source.ImageCanvas.call(this, {
        attributions: options.attributions,
        canvasFunction: this.canvasFunctionInternal_.bind(this),
        logo: options.logo,
        projection: options.projection,
        ratio: options.ratio,
        resolutions: options.resolutions,
        state: options.state
    });
    this.EVENT_TYPES =
        SuperMap.Layer.Theme.prototype.EVENT_TYPES.concat(
            SuperMap.Layer.prototype.EVENT_TYPES
        );
    this.imageTransform = ol.transform.create();
    this.features = [];
    this.TFEvents = [];
    this.highLightCanvas = null;

    this.map = options.map;
    var size = this.map.getSize();
    this.div = document.createElement('div');
    this.map.getViewport().appendChild(this.div);
    this.div.style.width = size[0] + "px";
    this.div.style.height = size[1] + "px";
    this.setOpacity(options.opacity);
    this.levelRenderer = new SuperMap.LevelRenderer();
    this.movingOffset = [0, 0];
    this.renderer = this.levelRenderer.init(this.div);
    this.map.getViewport().removeChild(this.div);
    this.renderer.clear();
    //处理用户预先（在图层添加到 map 前）监听的事件
    this.addTFEvents();
};

ol.inherits(ol.source.Theme, ol.source.ImageCanvas);

ol.source.Theme.prototype.destroy = function () {
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
};

ol.source.Theme.prototype.destroyFeatures = function (features) {
    var all = (features == undefined);
    if (all) {
        features = this.features;
    }
    if (features) {
        this.removeFeatures(features);
        for (var i = features.length - 1; i >= 0; i--) {
            features[i].destroy();
        }
    }
};

ol.source.Theme.prototype.setOpacity = function (opacity) {
    if (opacity !== this.opacity) {
        this.opacity = opacity;
        var element = this.div;
        SuperMap.Util.modifyDOMElement(element, null, null, null,
            null, null, null, opacity);

        if (this.map !== null) {
            this.dispatchEvent(new ol.Collection.Event('changelayer', {
                layer: this,
                property: "opacity"
            }));
        }
    }
};

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
ol.source.Theme.prototype.addFeatures = function (features) {

};

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
ol.source.Theme.prototype.removeFeatures = function (features) {
    if (!features || features.length === 0) {
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
        if (findex === -1) {
            featuresFailRemoved.push(feature);
            continue;
        }
        this.features.splice(findex, 1);
    }
    var drawFeatures = [];
    for (var hex = 0, len = this.features.length; hex < len; hex++) {
        feature = this.features[hex];
        drawFeatures.push(feature);
    }
    this.features = [];
    this.addFeatures(drawFeatures);
    //绘制专题要素
    if (this.renderer) {
        this.redrawThematicFeatures(this.map.getView().calculateExtent());
    }
    var succeed = featuresFailRemoved.length == 0 ? true : false;
    this.dispatchEvent(new ol.Collection.Event('featuresremoved', {features: featuresFailRemoved, succeed: succeed}));
};

/**
 * APIMethod: removeAllFeatures
 * 清除当前图层所有的矢量要素。
 */
ol.source.Theme.prototype.removeAllFeatures = function () {
    if (this.renderer) {
        this.renderer.clear();
    }
    this.features = [];
    this.dispatchEvent(new ol.Collection.Event('featuresremoved', {features: [], succeed: true}));
};

/**
 * Method: getFeatures
 * 查看当前图层中的有效数据。
 *
 * Returns:
 * {<SuperMap.Feature.Vector>} 用户加入图层的有效数据。
 */
ol.source.Theme.prototype.getFeatures = function () {
    var len = this.features.length;
    var clonedFeatures = new Array(len);
    for (var i = 0; i < len; ++i) {
        clonedFeatures[i] = this.features[i];
        //clonedFeatures[i] = this.features[i].clone();
    }
    return clonedFeatures;
};

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
ol.source.Theme.prototype.getFeatureBy = function (property, value) {
    var feature = null;
    for (var id in this.features) {
        if (this.features[id][property] === value) {
            feature = this.features[id];
            //feature = this.features[id].clone();
            break;
        }
    }
    return feature;
};

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
ol.source.Theme.prototype.getFeatureById = function (featureId) {
    return this.getFeatureBy('id', featureId);
};

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
ol.source.Theme.prototype.getFeaturesByAttribute = function (attrName, attrValue) {
    var feature,
        foundFeatures = [];
    for (var id in this.features) {
        feature = this.features[id];
        //feature = this.features[id].clone();
        if (feature && feature.attributes) {
            if (feature.attributes[attrName] === attrValue) {
                foundFeatures.push(feature);
            }
        }
    }
    return foundFeatures;
};

/**
 * Method: redrawThematicFeatures
 * 抽象方法，可实例化子类必须实现此方法。
 *
 * 重绘专题要素。
 *
 * Parameters:
 * extent - {Array} 当前级别下计算出的地图范围
 */
ol.source.Theme.prototype.redrawThematicFeatures = function (extent) {
};

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
ol.source.Theme.prototype.on = function (event, callback) {
    var cb = callback;
    if (!this.renderer) {
        var evn = [];
        evn.push(event);
        evn.push(cb);
        this.TFEvents.push(evn);
    } else {
        this.renderer.on(event, cb);
    }
};

ol.source.Theme.prototype.fire = function (type, event) {
    event = event.originalEvent;
    if (type === 'click') {
        this.renderer.handler._clickHandler(event);
    }
    if (type === 'dblclick') {
        this.renderer.handler._dblclickHandler(event);
    }
    if (type === 'onmousewheel') {
        this.renderer.handler._mousewheelHandler(event);
    }
    if (type === 'mousemove') {
        this.renderer.handler._mousemoveHandler(event);
        this._initHighLightCanvas();
        this.changed();
    }
    if (type === 'onmouseout') {
        this.renderer.handler._mouseoutHandler(event);
    }
    if (type === 'onmousedown') {
        this.renderer.handler._mousedownHandler(event);
    }
    if (type === 'onmouseup') {
        this.renderer.handler._mouseupHandler(event);
    }

};

ol.source.Theme.prototype._initHighLightCanvas = function () {
    var highLightContext = this.renderer.painter._layers.hover.ctx;
    var canvas = highLightContext.canvas;
    var width = canvas.width;
    var height = canvas.height;
    var copyHighLightContext = ol.dom.createCanvasContext2D(width, height);
    copyHighLightContext.putImageData(highLightContext.getImageData(0, 0, width, height), 0, 0);
    this.highLightCanvas = copyHighLightContext.canvas;
}

/**
 * APIMethod: un
 * 移除专题要素事件监听 。
 *
 * Parameters:
 * event - {String} 事件名称。
 * callback - {Function} 事件回调函数。
 *
 */
ol.source.Theme.prototype.un = function (event, callback) {
    var cb = callback;
    if (!this.renderer) {
        var tfEs = this.TFEvents;
        var len = tfEs.length;
        var newtfEs = [];
        for (var i = 0; i < len; i++) {
            var tfEs_i = tfEs[i];

            if (!(tfEs_i[0] === event && tfEs_i[1] === cb)) {
                newtfEs.push(tfEs_i)
            }
        }
        this.TFEvents = newtfEs;
    }
    else {
        this.renderer.un(event, cb);
    }
};

/**
 * Method: addTFEvents
 * 将图层添加到地图上之前用户要求添加的事件监听添加到图层。
 *
 */
ol.source.Theme.prototype.addTFEvents = function () {
    var tfEs = this.TFEvents;
    var len = tfEs.length;
    for (var i = 0; i < len; i++) {
        this.renderer.on(tfEs[i][0], tfEs[i][1]);
    }
};

ol.source.Theme.prototype.canvasFunctionInternal_ = function (extent, resolution, pixelRatio, size, projection) {
    var mapWidth = Math.round(ol.extent.getWidth(extent) / resolution);
    var mapHeight = Math.round(ol.extent.getHeight(extent) / resolution);
    var width = this.map.getSize()[0];
    var height = this.map.getSize()[1];
    this.div.style.width = width + "px";
    this.div.style.height = height + "px";
    this.map.getViewport().appendChild(this.div);
    this.renderer.resize();
    this.map.getViewport().removeChild(this.div);
    this.redrawThematicFeatures(extent);
    var context = ol.dom.createCanvasContext2D(mapWidth, mapHeight);
    var themeCanvas = this.renderer.painter.root.getElementsByTagName('canvas')[0];
    context.drawImage(themeCanvas, 0, 0, mapWidth, mapHeight, (mapWidth - width) / 2, (mapHeight - height) / 2, mapWidth, mapHeight);
    if (this.resolution !== resolution || JSON.stringify(this.extent) !== JSON.stringify(extent)) {
        this.highLightCanvas = null;
        this.resolution = resolution;
        this.extent = extent;
    }
    if (this.highLightCanvas) {
        context.drawImage(this.highLightCanvas, 0, 0, mapWidth, mapHeight, (mapWidth - width) / 2, (mapHeight - height) / 2, mapWidth, mapHeight);
    }
    return context.canvas;
};

ol.source.Theme.prototype.getLocalXY = function (coordinate) {
    var resolution = this.map.getView().getResolution();
    var extent = this.map.getView().calculateExtent();
    if (coordinate instanceof SuperMap.Geometry.Point || coordinate instanceof SuperMap.Geometry.GeoText) {
        var x = (coordinate.x / resolution + (-extent[0] / resolution));
        var y = ((extent[3] / resolution) - coordinate.y / resolution);
        return [x, y];
    }
    else if (coordinate instanceof SuperMap.LonLat) {
        var x = (coordinate.lon / resolution + (-extent[0] / resolution));
        var y = ((extent[3] / resolution) - coordinate.lat / resolution);
        return [x, y];
    }
    else {
        return null;
    }
};

module.exports = ol.source.Theme;