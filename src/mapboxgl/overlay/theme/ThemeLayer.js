import mapboxgl from 'mapbox-gl';
import '../../core/Base';
import SuperMap from '../../../common/SuperMap';
import ServerFeature from '../../../common/iServer/ServerFeature';
import ThemeFeature from './ThemeFeature';
import LonLat from "../../../common/commontypes/LonLat";
import Point from "../../../common/commontypes/geometry/Point";
import GeoText from "../../../common/commontypes/geometry/GeoText";
import LevelRenderer from "../../../common/overlay/levelRenderer/LevelRenderer";
import "../../../common/overlay/levelRenderer/Render";

/**
 * @private
 * @class mapboxgl.supermap.ThemeLayer
 * @classdesc 专题图基类。
 * @param name - {string} 图层名。
 * @param options -{Object} 参数。
 */
export default class Theme {

    constructor(name, opt_options) {
        var options = opt_options ? opt_options : {};
        options.name = name;
        this.features = [];
        this.TFEvents = [];
        this.movingOffset = [0, 0];
        this.map = options.map;
        this.div = document.createElement('div');
        var container = this.map.getCanvasContainer();
        var canvas = this.map.getCanvas();
        this.div.style.width = canvas.style.width;
        this.div.style.height = canvas.style.height;
        this.div.width = parseInt(canvas.width);
        this.div.height = parseInt(canvas.height);
        container.appendChild(this.div);
        if (opt_options.opacity) {
            this.setOpacity(options.opacity);
        }
        this.levelRenderer = new LevelRenderer();
        this.renderer = this.levelRenderer.init(this.div);
        this.renderer.clear();
        //处理用户预先（在图层添加到 map 前）监听的事件
        this.addTFEvents();
        this.map.on('move', this.moveEvent.bind(this));
        this.map.on('remove', this.removeEvent.bind(this));
    }

    /**
     * @function mapboxgl.supermap.ThemeLayer.prototype.destroyFeatures
     * @description 销毁某个要素
     * @param features -{Object} 将被销毁的要素
     */
    destroyFeatures(features) {
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
    }

    /**
     * @function mapboxgl.supermap.ThemeLayer.prototype.setOpacity
     * @description 设置图层的不透明度,取值[0-1]之间。
     * @param opacity - {number} 不透明度
     */
    setOpacity(opacity) {
        if (opacity !== this.opacity) {
            this.opacity = opacity;
            var element = this.div;
            SuperMap.Util.modifyDOMElement(element, null, null, null,
                null, null, null, opacity);

            if (this.map !== null) {
                mapboxgl.Evented.prototype.fire('changelayer', {layer: this, property: "opacity"});
            }
        }
    }

    /**
     * @function mapboxgl.supermap.ThemeLayer.prototype.addFeatures
     * @param features -{Array<Object>} 需要添加的数据
     * @description 抽象方法，可实例化子类必须实现此方法。向专题图图层中添加数据 ,
     *              专题图仅接收 SuperMap.Feature.Vector 类型数据，
     *              feature 将储存于 features 属性中，其存储形式为数组。
     */
    addFeatures(features) { // eslint-disable-line no-unused-vars

    }

    /**
     * @function mapboxgl.supermap.ThemeLayer.prototype.removeFeatures
     * @param features - {Array<SuperMap.Feature.Vector>} 要删除feature的数组。
     * @description 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。
     *              参数中的 features 数组中的每一项，必须是已经添加到当前图层中的 feature，
     *              如果无法确定 feature 数组，则可以调用 removeAllFeatures 来删除所有feature。
     *              如果要删除的 feature 数组中的元素特别多，推荐使用 removeAllFeatures，
     *              删除所有feature后再重新添加。这样效率会更高。
     */
    removeFeatures(features) {
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
            this.redrawThematicFeatures(this.map.getBounds());
        }
        var succeed = featuresFailRemoved.length == 0 ? true : false;
        mapboxgl.Evented.prototype.fire("featuresremoved", {features: featuresFailRemoved, succeed: succeed});
    }

    /**
     * @function mapboxgl.supermap.ThemeLayer.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures() {
        if (this.renderer) {
            this.renderer.clear();
        }
        this.features = [];
        mapboxgl.Evented.prototype.fire('featuresremoved', {features: [], succeed: true});
    }

    /**
     * @function mapboxgl.supermap.ThemeLayer.prototype.getFeatures
     * @description 查看当前图层中的有效数据。
     * @return {SuperMap.Feature.Vector} 用户加入图层的有效数据。
     */
    getFeatures() {
        var len = this.features.length;
        var clonedFeatures = new Array(len);
        for (var i = 0; i < len; ++i) {
            clonedFeatures[i] = this.features[i];
        }
        return clonedFeatures;
    }

    /**
     * @function mapboxgl.supermap.ThemeLayer.prototype.getFeatureBy
     * @description 在专题图的要素数组 features 里面遍历每一个 feature，当 feature[property] === value 时，
     *              返回此 feature（并且只返回第一个）。
     * @param property - {string} feature 的某个属性名称。
     * @param value - {string} property 所对应的值。
     * @return {SuperMap.Feature.Vector} 第一个匹配属性和值的矢量要素。
     */
    getFeatureBy(property, value) {
        var feature = null;
        for (var id in this.features) {
            if (this.features[id][property] === value) {
                feature = this.features[id];
                break;
            }
        }
        return feature;
    }

    /**
     * @function mapboxgl.supermap.ThemeLayer.prototype.getFeatureById
     * @description 通过给定一个 id，返回对应的矢量要素。
     * @param featureId - {string} 矢量要素的属性 id。
     * @return {SuperMap.Feature.Vector} 对应id的 feature，如果不存在则返回 null。
     */
    getFeatureById(featureId) {
        return this.getFeatureBy('id', featureId);
    }

    /**
     * @function mapboxgl.supermap.ThemeLayer.prototype.getFeaturesByAttribute
     * @description 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
     * @param attrName - {string} 属性的 key。
     * @param attrValue - {string} 矢量要素的属性 id。
     * @return {Array<SuperMap.Feature.Vector>}一个匹配的 feature 数组。
     */
    getFeaturesByAttribute(attrName, attrValue) {
        var feature,
            foundFeatures = [];
        for (var id in this.features) {
            feature = this.features[id];
            if (feature && feature.attributes) {
                if (feature.attributes[attrName] === attrValue) {
                    foundFeatures.push(feature);
                }
            }
        }
        return foundFeatures;
    }

    /**
     * @function mapboxgl.supermap.ThemeLayer.prototype.redrawThematicFeatures
     * @description 抽象方法，可实例化子类必须实现此方法。重绘专题要素。
     * @param extent - {mapboxgl.LngLatBounds} 重绘的范围。
     */
    redrawThematicFeatures(extent) { // eslint-disable-line no-unused-vars
    }

    /**
     * @function L.supermap.ThemeLayer.prototype.on
     * @description 添加专题要素事件监听。添加专题要素事件监听。
     * @param event - {Event} 监听事件
     * @param callback - {function} 回调函数
     * @param context - {string} 信息
     */
    on(event, callback, context) { // eslint-disable-line no-unused-vars
        if (this.renderer) {
            this.renderer.on(event, callback);
        } else {
            this.map.on(event, callback);
        }
        return this;
    }

    /**
     * @function L.supermap.ThemeLayer.prototype.off
     * @description 移除专题要素事件监听。
     * @param event - {Event} 监听事件
     * @param callback - {function} 回调函数
     * @param context - {string} 信息
     */
    off(event, callback, context) { // eslint-disable-line no-unused-vars
        var me = this;
        if (me.renderer) {
            me.renderer.off(event, callback);
        } else {
            this.map.off(event, callback);
        }
        return this;
    }

    /**
     * @function mapboxgl.supermap.ThemeLayer.prototype.addTFEvents
     * @description 将图层添加到地图上之前用户要求添加的事件监听添加到图层。
     */
    addTFEvents() {
        var tfEs = this.TFEvents;
        var len = tfEs.length;
        for (var i = 0; i < len; i++) {
            this.renderer.on(tfEs[i][0], tfEs[i][1]);
        }
    }

    /**
     * @function mapboxgl.supermap.ThemeLayer.prototype.getLocalXY
     * @description 获取坐标系统
     * @param coordinate - {Object} 坐标位置。
     */
    getLocalXY(coordinate) {
        var pixelP, map = this.map;
        if (coordinate instanceof Point || coordinate instanceof GeoText) {
            let tempPoint = map.project(new window.mapboxgl.LngLat(coordinate.x, coordinate.y));
            pixelP = [tempPoint.x, tempPoint.y];
        }
        if (coordinate instanceof LonLat) {
            let tempPoint = map.project(new window.mapboxgl.LngLat(coordinate.lon, coordinate.lat));
            pixelP = [tempPoint.x, tempPoint.y];
        }
        return pixelP;
    }

    /**
     * @function mapboxgl.supermap.ThemeLayer.prototype.scale
     * @description 转为 iClient 要素
     * @param feature 待转要素
     */
    toiClientFeature(feature) {
        if (feature instanceof ThemeFeature) {
            return feature.toFeature();
        }
        return new ServerFeature.fromJson(feature).toFeature();
    }

    moveEvent() {
        this.redrawThematicFeatures(this.map.getBounds());
    }

    /**
     * @function mapboxgl.supermap.prototype.resizeEvent
     * @description 调整事件
     */
    resizeEvent() {
        var div = this.div;
        div.style.position = 'absolute';
        div.style.top = 0 + "px";
        div.style.left = 0 + "px";
        var canvas = this.map.getCanvas();
        div.width = parseInt(canvas.width);
        div.height = parseInt(canvas.height);
        div.style.width = canvas.style.width;
        div.style.height = canvas.style.height;
        this.redrawThematicFeatures(this.map.getBounds());
    }

    /**
     * @function mapboxgl.supermap.prototype.removeEvent
     * @description 移除事件
     */
    removeEvent() {
        this.map.getCanvasContainer().removeChild(this.div);
    }

}
mapboxgl.supermap.ThemeLayer = Theme;