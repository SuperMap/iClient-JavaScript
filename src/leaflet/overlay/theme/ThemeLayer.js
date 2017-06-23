/**
 * Class: ThemeLayer
 * 专题图层基类
 */
require('../../core/Base');
var SuperMap = require('../../../common/SuperMap');
var L = require("leaflet");

var ThemeLayer = L.Layer.extend({

    options: {
        name: null,
        opacity: 1,
        // {Array} 专题要素事件临时存储，临时保存图层未添加到 map 前用户添加的事件监听，待图层添加到 map 后把这些事件监听添加到图层上，清空此图层。
        //这是一个二维数组，组成二维数组的每个一维数组长度为 2，分别是 event, callback。
        TFEvents: null,
        attribution: 'Map Data <a href="http://support.supermap.com.cn/product/iServer.aspx">SuperMap iServer</a> with <a href="http://icltest.supermapol.com/">SuperMap iClient</a>'
    },

    initialize: function (name, options) {
        L.Util.setOptions(this, options);
        this.options.name = name;
        this.features = [];
        this.TFEvents = [];
        this.levelRenderer = new SuperMap.LevelRenderer();
        this.movingOffset = [0, 0];
    },

    getEvents: function () {
        var me = this;
        var events = {
            zoomend: this._reset,
            moveend: me._reset,
            resize: me._resize
        };
        if (this._map._zoomAnimated) {
            events.zoomanim = me._zoomAnim;
        }
        return events;
    },

    onRemove: function (map) {
        if (map) {
            map.removeLayer(this);
        }
    },

    onAdd: function (map) {
        var me = this;
        me._initContainer();
        if (!me.levelRenderer) {
            map.removeLayer(me);
            return;
        }

        me.map = map;
        //初始化渲染器
        var size = map.getSize();
        me.container.style.width = size.x + "px";
        me.container.style.height = size.y + "px";
        me._updateOpacity();

        me.renderer = me.levelRenderer.init(me.container);
        me.renderer.clear();
        //处理用户预先（在图层添加到 map 前）监听的事件
        me.addTFEvents();
        map.on("mousemove", function (e) {
            var xy = e.layerPoint;
            me.currentMousePosition = L.point(xy.x + me.movingOffset[0], xy.y + me.movingOffset[1]);
        });
    },

    //向专题图图层中添加数据, 支持的feature类型为:
    //iServer返回的feature json对象 或L.supermap.themeFeature类型
    addFeatures: function (features) {
        //子类实现此方法
    },

    //抽象方法，可实例化子类必须实现此方法。
    redrawThematicFeatures: function (bounds) {
        //子类必须实现此方法
    },

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

    //从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。
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

    //清除当前图层所有的矢量要素。
    removeAllFeatures: function () {
        var me = this;
        if (me.renderer) {
            me.renderer.clear();
        }
        me.features = [];
        me.fire("featuresremoved", {features: [], succeed: true});
    },

    //查看当前图层中的有效数据。
    getFeatures: function () {
        var me = this;
        var len = me.features.length;
        var clonedFeatures = new Array(len);
        for (var i = 0; i < len; ++i) {
            clonedFeatures[i] = me.features[i];
        }
        return clonedFeatures;
    },

    //在专题图的要素数组 features 里面遍历每一个 feature，当 feature[property] === value 时，
    //返回此 feature（并且只返回第一个）。
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

    //通过给定一个 id，返回对应的矢量要素,如果不存在则返回 null
    getFeatureById: function (featureId) {
        return this.getFeatureBy('id', featureId);
    },

    //通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
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

    //调整图层
    update: function (bounds) {
        var me = this;
        var offsetLeft = parseInt(me._map.getContainer().style.left, 10);
        offsetLeft = -Math.round(offsetLeft);
        var offsetTop = parseInt(me._map.getContainer().style.top, 10);
        offsetTop = -Math.round(offsetTop);
        me.container.style.left = offsetLeft + 'px';
        me.container.style.top = offsetTop + 'px';

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

    //设置图层的不透明度,取值[0-1]之间。
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


    //重绘该图层
    redraw: function () {
        var me = this;
        if (!me.renderer) {
            return;
        }
        if (me._map) {
            me.redrawThematicFeatures(me._map.getBounds());
        } else {
            me.redrawThematicFeatures();
        }
        return this;
    },

    //添加专题要素事件监听。添加专题要素事件监听。
    on: function (event, callback, context) {
        if (this.renderer) {
            this.renderer.on(event, callback);
        } else {
            L.Layer.prototype.on.call(this, event, callback);
        }
        return this;
    },

    // 移除专题要素事件监听 。
    off: function (event, callback, context) {
        var me = this;
        if (me.renderer) {
            me.renderer.off(event, callback);
        } else {
            L.Layer.prototype.off.call(this, event, callback);
        }
        return this;
    },

    //将图层添加到地图上之前用户要求添加的事件监听添加到图层。
    addTFEvents: function () {
        var me = this;
        var tfEs = me.TFEvents;
        var len = tfEs.length;

        for (var i = 0; i < len; i++) {
            me.renderer.on(tfEs[i][0], tfEs[i][1]);
        }
    },

    // 地理坐标转为像素坐标。
    //{Array} 长度为 2 的数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
    getLocalXY: function (coordinate) {
        if (!this._map) {
            return coordinate;
        }
        var coor = coordinate;
        if (!(coordinate instanceof L.LatLng)) {
            if (coordinate instanceof SuperMap.Geometry.Point || coordinate instanceof SuperMap.Geometry.GeoText) {
                coor = L.latLng(coordinate.y, coordinate.x);
            } else {
                coor = L.latLng(coordinate.lat, coordinate.lon);
            }

        }
        var point = this._map.latLngToContainerPoint(coor);
        return [point.x, point.y];
    },

    _initContainer: function () {
        var parentContainer = this.getPane();
        this.container = L.DomUtil.create("div", "themeLayer", parentContainer);
    },


    _zoomAnim: function (evt) {
        var zoom = evt.zoom, center = evt.center;
        var scale = this._map.getZoomScale(zoom),
            offset = this._map._getCenterOffset(center)._multiplyBy(-scale).subtract(this._map._getMapPanePos());

        if (L.DomUtil.setTransform) {
            L.DomUtil.setTransform(this.container, offset, scale);
        } else {
            L.DomUtil.setPosition(this.container, offset);
        }
    },

    _updateOpacity: function () {
        var me = this;
        SuperMap.Util.modifyDOMElement(me.container, null, null, null, null, null, null, me.options.opacity);
        if (me._map !== null) {
            me._map.fire("changelayer", {layer: me, property: "opacity"});
        }
    },

    //缩放移动重绘
    _reset: function () {
        var me = this;
        var latLngBounds = me._map.getBounds();
        me.update(latLngBounds);
        var bounds = new L.Bounds(
            me._map.latLngToLayerPoint(latLngBounds.getNorthWest()),
            me._map.latLngToLayerPoint(latLngBounds.getSouthEast())
        );
        var size = bounds.getSize();
        L.DomUtil.setPosition(me.container, bounds.min);
        me.container.style.width = size.x + 'px';
        me.container.style.height = size.y + 'px';
    },

    //通知渲染器的尺寸变化。
    _resize: function () {
        var me = this;
        var newSize = me._map.getSize();
        me.container.style.width = newSize.x + "px";
        me.container.style.height = newSize.y + "px";
        me.renderer.resize();
    }
});

module.exports = ThemeLayer;