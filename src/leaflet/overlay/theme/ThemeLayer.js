import L from "leaflet";
import {
    CommonUtil,
    GeometryPoint as Point, ServerFeature,
    GeoJSON as GeoJSONFormat,
    GeometryVector,
    GeoText,
    LevelRenderer
} from '@supermap/iclient-common';
import {ThemeFeature} from './ThemeFeature';

/**
 * @class L.supermap.ThemeLayer
 * @classdesc 专题图层基类，调用建议使用其子类实现类。
 * @category Visualization Theme
 * @private
 * @extends L.Layer{@linkdoc-leaflet/#layer}
 * @param name - {string} 专题图图层名称
 * @param options -{Object} 可选参数，如：</br>
 *        id - {string} 专题图层ID。</br>
 *        map - {L.Map} 当前leaflet的map对象。</br>
 *        opacity - {number} 图层透明的。</br>
 */
export var ThemeLayer = L.Layer.extend({

    options: {
        //要素坐标是否和地图坐标系一致，默认为false，要素默认是经纬度坐标。
        alwaysMapCRS: false,
        id: CommonUtil.createUniqueID("themeLayer_"),
        opacity: 1,
        // {Array} 专题要素事件临时存储，临时保存图层未添加到 map 前用户添加的事件监听，待图层添加到 map 后把这些事件监听添加到图层上，清空此图层。
        //这是一个二维数组，组成二维数组的每个一维数组长度为 2，分别是 event, callback。
        TFEvents: [],
        attribution: "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <span>© <a href='http://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>"
    },

    initialize: function (name, options) {
        L.Util.setOptions(this, options);
        this.name = name;
        this.features = [];
        this.TFEvents = this.options.TFEvents;
        this.levelRenderer = new LevelRenderer();
        this.movingOffset = [0, 0];
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.getEvents
     * @description 获取图层事件
     * @return {Object} 返回图层支持的事件
     */
    getEvents: function () {
        var me = this;
        var events = {
            zoomend: me._reset,
            moveend: me._reset,
            resize: me._resize
        };
        if (this._map._zoomAnimated) {
            events.zoomanim = me._zoomAnim;
        }
        return events;
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.onRemove
     * @description 删除某个地图
     * @param map - {L.map} 要删除的地图
     */
    onRemove: function (map) {
        var me = this;
        L.DomUtil.remove(me.container);
        map.off("mousemove", me.mouseMoveHandler);
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.onAdd
     * @description 添加专题图
     * @param map - {L.map} 要添加的地图
     * @private
     */
    onAdd: function (map) {
        var me = this;


        me.map = me._map = map;
        me._initContainer();
        if (!me.levelRenderer) {
            map.removeLayer(me);
            return;
        }
        //初始化渲染器
        var size = map.getSize();
        me.container.style.width = size.x + "px";
        me.container.style.height = size.y + "px";
        me._updateOpacity();

        me.renderer = me.levelRenderer.init(me.container);
        me.renderer.clear();
        if (me.features && me.features.length > 0) {
            me._reset();
        }

        //处理用户预先（在图层添加到 map 前）监听的事件
        me.addTFEvents();
        me.mouseMoveHandler = function (e) {
            var xy = e.layerPoint;
            me.currentMousePosition = L.point(xy.x + me.movingOffset[0], xy.y + me.movingOffset[1]);
        };
        map.on("mousemove", me.mouseMoveHandler);

        me.update();
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.addFeatures
     * @description 向专题图图层中添加数据, 支持的feature类型为:iServer返回的feature json对象 或L.supermap.themeFeature类型
     * @param features -{L.supermap.themeFeature|Object} 待转要素包括 mapboxgl.supermap.ThemeFeature 类型和 GeoJOSN 规范数据类型
     */
    addFeatures: function (features) { // eslint-disable-line no-unused-vars
        //子类实现此方法
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.redrawThematicFeatures
     * @description 抽象方法，可实例化子类必须实现此方法。
     * @param bounds - {L.bounds} 重绘专题要素范围。
     */
    redrawThematicFeatures: function (bounds) { // eslint-disable-line no-unused-vars
        //子类必须实现此方法
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.destroyFeatures
     * @description 销毁某个要素
     * @param features - {SuperMap.Feature.Vector} 将被销毁的要素
     */
    destroyFeatures: function (features) {
        if (features === undefined) {
            features = this.features;
        }
        if (!features) {
            return;
        }
        this.removeFeatures(features);
        for (var i = features.length - 1; i >= 0; i--) {
            features[i].destroy();
        }
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.removeFeatures
     * @description 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。
     * @param features - {L.feature} 将被删除得要素
     */
    removeFeatures: function (features) {
        var me = this;
        if (!features || features.length === 0) {
            return;
        }
        if (features === me.features) {
            return me.removeAllFeatures();
        }
        if (!(L.Util.isArray(features))) {
            features = [features];
        }

        var featuresFailRemoved = [];

        for (var i = features.length - 1; i >= 0; i--) {
            var feature = features[i];

            //如果我们传入的feature在features数组中没有的话，则不进行删除，
            //并将其放入未删除的数组中。
            var findex = L.Util.indexOf(me.features, feature);

            if (findex === -1) {
                featuresFailRemoved.push(feature);
                continue;
            }
            me.features.splice(findex, 1);
        }

        var drawFeatures = [];
        for (var hex = 0, len = me.features.length; hex < len; hex++) {
            feature = me.features[hex];
            drawFeatures.push(feature);
        }
        me.features = [];
        me.addFeatures(drawFeatures);
        //绘制专题要素
        if (me.renderer) {
            if (me._map) {
                me.redrawThematicFeatures(me._map.getBounds());
            } else {
                me.redrawThematicFeatures();
            }
        }

        var succeed = featuresFailRemoved.length == 0;
        me.fire("featuresremoved", {features: featuresFailRemoved, succeed: succeed});
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures: function () {
        var me = this;
        if (me.renderer) {
            me.renderer.clear();
        }
        me.features = [];
        me.fire("featuresremoved", {features: [], succeed: true});
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.getFeatures
     * @description 查看当前图层中的有效数据。
     * @return {Array} 返回图层中的有效数据。
     */
    getFeatures: function () {
        var me = this;
        var len = me.features.length;
        var clonedFeatures = new Array(len);
        for (var i = 0; i < len; ++i) {
            clonedFeatures[i] = me.features[i];
        }
        return clonedFeatures;
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.getFeatureBy
     * @description 在专题图的要素数组 features 里面遍历每一个 feature，当 feature[property] === value 时，返回此 feature（并且只返回第一个）。
     * @param property - {string} 要素得某个属性名
     * @param value - {string} 对应属性名得值
     */
    getFeatureBy: function (property, value) {
        var me = this;
        var feature = null;
        for (var id in me.features) {
            if (me.features[id][property] !== value) {
                continue;
            }
            feature = me.features[id];
            break;
        }
        return feature;
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.getFeatureById
     * @description 通过给定一个 id，返回对应的矢量要素,如果不存在则返回 null
     * @param featureId - {number}要素id
     */
    getFeatureById: function (featureId) {
        return this.getFeatureBy('id', featureId);
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.getFeaturesByAttribute
     * @description 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
     * @param attrName - {string} key 值
     * @param attrValue - {string} value 值
     * @return {Array} 返回所有匹配的要素数组。
     */
    getFeaturesByAttribute: function (attrName, attrValue) {
        var me = this,
            feature,
            foundFeatures = [];
        for (var id in me.features) {
            feature = me.features[id];
            if (feature && feature.attributes && (feature.attributes[attrName] === attrValue)) {
                foundFeatures.push(feature);
            }
        }
        return foundFeatures;
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.update
     * @description 更新图层
     * @param bounds - {L.bounds} 图层范围
     */
    update: function (bounds) {
        var mapOffset = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this.container, mapOffset);

        var me = this;
        //  var bounds = me._map.getBounds();
        //  var topLeft = me._map.latLngToLayerPoint(bounds.getNorthWest());
        //  var mapOffset = [parseInt(topLeft.x, 10) || 0, parseInt(topLeft.y, 10) || 0]
        // // var offsetLeft = parseInt(me._map.getContainer().style.left, 10);
        // // offsetLeft = -Math.round(offsetLeft);
        //  //var offsetTop = parseInt(me._map.getContainer().style.top, 10);
        //  //offsetTop = -Math.round(offsetTop);
        //  me.container.style.left = mapOffset[0] + 'px';
        //  me.container.style.top = mapOffset[1] + 'px';

        //绘制专题要素
        if (me.renderer) {
            me.redrawThematicFeatures(bounds);
        }

        if (me.currentMousePosition) {
            me.currentMousePosition = L.point(
                me.currentMousePosition.x - me.movingOffset[0],
                me.currentMousePosition.y - me.movingOffset[1]);
        }
        me.movingOffset = [0, 0];
        me._zoom = me._map.getZoom();
        me._center = me._map.getCenter();
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.setOpacity
     * @description 设置图层的不透明度,取值[0-1]之间。
     * @param opacity - {number}不透明度
     */
    setOpacity: function (opacity) {
        var me = this;
        if (opacity === me.options.opacity) {
            return;
        }
        if (opacity) {
            me.options.opacity = opacity;
        }
        me._updateOpacity();
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.redraw
     * @description 重绘该图层
     * @return {boolean} 返回是否重绘成功
     */
    redraw: function () {
        var me = this;
        if (!me.renderer) {
            return false;
        }
        if (me._map) {
            me.redrawThematicFeatures(me._map.getBounds());
        } else {
            me.redrawThematicFeatures();
        }
        return true;
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.on
     * @description 添加专题要素事件监听。添加专题要素事件监听。
     * @param event - {Event} 监听事件
     * @param callback - {function} 回调函数
     * @param context - {string} 信息
     */
    on: function (event, callback, context) { // eslint-disable-line no-unused-vars
        if (this.renderer) {
            this.renderer.on(event, callback);
        } else {
            L.Layer.prototype.on.call(this, event, callback);
        }
        return this;
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.off
     * @description 移除专题要素事件监听。
     * @param event - {Event} 监听事件
     * @param callback - {function} 回调函数
     * @param context - {string} 信息
     */
    off: function (event, callback, context) { // eslint-disable-line no-unused-vars
        var me = this;
        if (me.renderer) {
            me.renderer.un(event, callback);
        } else {
            L.Layer.prototype.off.call(this, event, callback);
        }
        return this;
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.addTFEvents
     * @description 将图层添加到地图上之前用户要求添加的事件监听添加到图层。
     */
    addTFEvents: function () {
        var me = this;
        var tfEs = me.TFEvents;
        var len = tfEs.length;

        for (var i = 0; i < len; i++) {
            me.renderer.on(tfEs[i][0], tfEs[i][1]);
        }
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.getLocalXY
     * @description 地理坐标转为像素坐标
     * @param coordinate - {array}
     */
    getLocalXY: function (coordinate) {
        if (!this._map) {
            return coordinate;
        }
        var coor = coordinate;
        if (L.Util.isArray(coordinate)) {
            coor = L.point(coordinate[0], coordinate[1]);
        }
        if (!(coordinate instanceof L.Point)) {
            if (coordinate instanceof Point || coordinate instanceof GeoText) {
                coor = L.point(coordinate.x, coordinate.y);
            } else {
                coor = L.point(coordinate.lon, coordinate.lat);
            }

        }
        var point = this._map.latLngToContainerPoint(!this.options.alwaysMapCRS ? L.latLng(coor.y, coor.x) : this._map.options.crs.unproject(coor));
        return [point.x, point.y];
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.toFeature
     * @description 转为 iClient 要素
     * @param features -{L.supermap.themeFeature|Object} 待转要素包括 mapboxgl.supermap.ThemeFeature 类型和 GeoJOSN 规范数据类型
     * @return {SuperMap.Feature.Vector} 转换后的iClient要素
     */
    toFeature: function (features) {
        if (CommonUtil.isArray(features)) {
            var featuresTemp = [];
            for (let i = 0; i < features.length; i++) {
                //L.supermap.themeFeature 数据类型
                if (features[i] instanceof ThemeFeature) {
                    featuresTemp.push(features[i].toFeature());
                    continue;
                }
                // 若是 GeometryVector 直接返回
                if (features[i] instanceof GeometryVector) {
                    featuresTemp.push(features[i]);
                    continue;
                }
                //iServer服务器返回数据格式
                featuresTemp.push(new ServerFeature.fromJson(features[i]).toFeature());
            }
            return featuresTemp;
        }
        //GeoJOSN 规范数据类型
        if (["FeatureCollection", "Feature", "Geometry"].indexOf(features.type) != -1) {
            var format = new GeoJSONFormat();
            return format.read(features, "FeatureCollection");
        }

        throw new Error(`features's type is not be supported.`);
    },

    _initContainer: function () {
        var parentContainer = this.getPane();
        var animated = this._map.options.zoomAnimation && L.Browser.any3d;
        var className = 'themeLayer leaflet-layer leaflet-zoom-' + (animated ? 'animated' : 'hide');
        this.container = L.DomUtil.create("div", className, parentContainer);

        var originProp = L.DomUtil.testProp(['transformOrigin', 'WebkitTransformOrigin', 'msTransformOrigin']);
        this.container.id = this.options.id;
        this.container.style[originProp] = '50% 50%';

        this.container.style.position = "absolute";
        this.container.style.zIndex = 200;
    },


    _zoomAnim: function (e) {
        var scale = this._map.getZoomScale(e.zoom),
            offset = this._map._getCenterOffset(e.center)._multiplyBy(-scale).subtract(this._map._getMapPanePos());

        if (L.DomUtil.setTransform) {
            L.DomUtil.setTransform(this.container, offset, scale);

        } else {
            this.container.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(offset) + ' scale(' + scale + ')';
        }
    },

    _updateOpacity: function () {
        var me = this;
        CommonUtil.modifyDOMElement(me.container, null, null, null, null, null, null, me.options.opacity);
        if (me._map !== null) {
            me._map.fire("changelayer", {layer: me, property: "opacity"});
        }
    },

    //缩放移动重绘
    _reset: function () {
        var me = this;
        var latLngBounds = me._map.getBounds();
        me.update(latLngBounds);
        var size = me._map.getSize();
        // var bounds = me._map.getBounds();
        // var topLeft = me._map.latLngToLayerPoint(bounds.getNorthWest());
        // var mapOffset = [parseInt(topLeft.x, 10) || 0, parseInt(topLeft.y, 10) || 0]
        // var offsetLeft = parseInt(me._map.getContainer().style.left, 10);
        // offsetLeft = -Math.round(offsetLeft);
        //var offsetTop = parseInt(me._map.getContainer().style.top, 10);
        //offsetTop = -Math.round(offsetTop);
        //me.container.style.left = mapOffset[0] + 'px';
        //me.container.style.top = mapOffset[1] + 'px';
        var mapOffset = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this.container, mapOffset);


        if (parseFloat(me.container.width) !== parseFloat(size.x)) {
            me.container.width = size.x + 'px';
        }
        if (parseFloat(me.container.height) !== parseFloat(size.y)) {
            me.container.height = size.y + 'px';
        }
        me.redraw();
    },

    //通知渲染器的尺寸变化
    _resize: function () {
        var me = this;
        var newSize = me._map.getSize();
        me.container.style.width = newSize.x + "px";
        me.container.style.height = newSize.y + "px";
        me.renderer.resize();
    }
});