import ol from 'openlayers/dist/ol-debug';
import Util from '../../core/Util';
import SuperMap from '../../../common/SuperMap';
import ThemeFeature from './themeFeature';
/**
 * @class ol.source.Theme
 * @classdesc 主题
 * @param name - {String}
 * @param opt_options -{Object}
 * @extends  ol.source.ImageCanvas
 */
export default class Theme extends ol.source.ImageCanvas {

    constructor(name, opt_options) {
        var options = opt_options ? opt_options : {};

        function canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) {
            if (!this.notFirst) {
                this.redrawThematicFeatures(extent);
                this.notFirst = true;
            }
            var mapWidth = size[0] * pixelRatio;
            var mapHeight = size[1] * pixelRatio;
            var width = this.map.getSize()[0] * pixelRatio;
            var height = this.map.getSize()[1] * pixelRatio;
            if (!this.themeCanvas) {
                this.div.style.width = mapWidth + "px";
                this.div.style.height = mapHeight + "px";
                this.map.getViewport().appendChild(this.div);
                this.renderer.resize();
                this.map.getViewport().removeChild(this.div);
                this.themeCanvas = this.renderer.painter.root.getElementsByTagName('canvas')[0];
            }
            this.themeCanvas.width = mapWidth;
            this.themeCanvas.height = mapHeight;
            this.themeCanvas.style.width = mapWidth + "px";
            this.themeCanvas.style.height = mapHeight + "px";
            this.themeCanvas.getContext('2d').clearRect(0, 0, mapWidth, mapHeight);
            this.offset = [(mapWidth - width) / 2, (mapHeight - height) / 2];

            var highLightContext = this.renderer.painter._layers.hover.ctx;
            var copyHighLightContext = Util.createCanvasContext2D(mapWidth, mapHeight);
            // copyHighLightContext.translate((mapWidth - width) / 2, (mapHeight - height) / 2);
            copyHighLightContext.drawImage(highLightContext.canvas, 0, 0, mapWidth, mapHeight, 0, 0, mapWidth, mapHeight);
            this.highLightCanvas = copyHighLightContext.canvas;

            this.redrawThematicFeatures(extent);
            if (!this.context) {
                this.context = Util.createCanvasContext2D(mapWidth, mapHeight);
            }
            var canvas = this.context.canvas;
            this.context.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = mapWidth;
            canvas.height = mapHeight;
            canvas.style.width = mapWidth + "px";
            canvas.style.height = mapHeight + "px";
            this.context.drawImage(this.themeCanvas, 0, 0, mapWidth, mapHeight, 0, 0, mapWidth, mapHeight);
            if (this.resolution !== resolution || JSON.stringify(this.extent) !== JSON.stringify(extent)) {
                this.highLightCanvas = null;
                this.resolution = resolution;
                this.extent = extent;
            }
            if (this.highLightCanvas) {
                this.context.drawImage(this.highLightCanvas, 0, 0, mapWidth, mapHeight, 0, 0, mapWidth, mapHeight);
            }
            return this.context.canvas;
        }

        super({
            attributions: options.attributions || new ol.Attribution({
                html: "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx'>SuperMap iServer</a></span> with <span>© <a href='http://iclient.supermapol.com'>SuperMap iClient</a></span>"
            }),
            canvasFunction: canvasFunctionInternal_,
            logo: options.logo,
            projection: options.projection,
            ratio: options.ratio,
            resolutions: options.resolutions,
            state: options.state
        });
        this.canvasFunctionInternal_ = canvasFunctionInternal_;
        this.EVENT_TYPES =
            SuperMap.Layer.Theme.prototype.EVENT_TYPES.concat(
                SuperMap.Layer.prototype.EVENT_TYPES
            );
        this.imageTransform = [1, 0, 0, 1, 0, 0];
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
    }

    destroy() {
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
    }

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

    setOpacity(opacity) {
        if (opacity !== this.opacity) {
            this.opacity = opacity;
            var element = this.div;
            SuperMap.Util.modifyDOMElement(element, null, null, null,
                null, null, null, opacity);

            if (this.map !== null) {
                this.dispatchEvent({type: 'changelayer', value: {layer: this, property: "opacity"}});
            }
        }
    }

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
    addFeatures(features) {

    }

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
            this.redrawThematicFeatures(this.map.getView().calculateExtent());
        }
        var succeed = featuresFailRemoved.length == 0 ? true : false;
        this.dispatchEvent({type: "featuresremoved", value: {features: featuresFailRemoved, succeed: succeed}});
    }

    /**
     * APIMethod: removeAllFeatures
     * 清除当前图层所有的矢量要素。
     */
    removeAllFeatures() {
        if (this.renderer) {
            this.renderer.clear();
        }
        this.features = [];
        this.dispatchEvent({type: 'featuresremoved', value: {features: [], succeed: true}});
    }

    /**
     * Method: getFeatures
     * 查看当前图层中的有效数据。
     *
     * Returns:
     * {SuperMap.Feature.Vector} 用户加入图层的有效数据。
     */
    getFeatures() {
        var len = this.features.length;
        var clonedFeatures = new Array(len);
        for (var i = 0; i < len; ++i) {
            clonedFeatures[i] = this.features[i];
            //clonedFeatures[i] = this.features[i].clone();
        }
        return clonedFeatures;
    }

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
     * {SuperMap.Feature.Vector} 第一个匹配属性和值的矢量要素。
     */
    getFeatureBy(property, value) {
        var feature = null;
        for (var id in this.features) {
            if (this.features[id][property] === value) {
                feature = this.features[id];
                //feature = this.features[id].clone();
                break;
            }
        }
        return feature;
    }

    /**
     * APIMethod: getFeatureById
     * 通过给定一个 id，返回对应的矢量要素。
     *
     * Parameters:
     * featureId - {String} 矢量要素的属性 id。
     *
     * Returns:
     * {SuperMap.Feature.Vector} 对应id的 feature，如果不存在则返回 null。
     */
    getFeatureById(featureId) {
        return this.getFeatureBy('id', featureId);
    }

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
    getFeaturesByAttribute(attrName, attrValue) {
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
    }

    /**
     * Method: redrawThematicFeatures
     * 抽象方法，可实例化子类必须实现此方法。
     *
     * 重绘专题要素。
     *
     * Parameters:
     * extent - {Array} 当前级别下计算出的地图范围
     */
    redrawThematicFeatures(extent) {
    }

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
    on(event, callback) {
        var cb = callback;
        if (!this.renderer) {
            var evn = [];
            evn.push(event);
            evn.push(cb);
            this.TFEvents.push(evn);
        } else {
            this.renderer.on(event, cb);
        }
    }

    fire(type, event) {
        event = event.originalEvent;
        var x = this.getX(event);
        var y = this.getY(event);
        var rotation = -this.map.getView().getRotation();
        var center = this.map.getPixelFromCoordinate(this.map.getView().getCenter());
        var rotatedP = this.rotate([x, y], rotation, center);
        var resultP = [rotatedP[0] + this.offset[0], rotatedP[1] + this.offset[1]];
        var offsetEvent = document.createEvent('Event');
        offsetEvent.initEvent('pointermove', true, true);
        offsetEvent.offsetX = resultP[0];
        offsetEvent.offsetY = resultP[1];
        offsetEvent.layerX = resultP[0];
        offsetEvent.layerY = resultP[1];
        offsetEvent.clientX = resultP[0];
        offsetEvent.clientY = resultP[1];
        offsetEvent.x = x;
        offsetEvent.y = y;
        if (type === 'click') {
            this.renderer.handler._clickHandler(offsetEvent);
        }
        if (type === 'dblclick') {
            this.renderer.handler._dblclickHandler(offsetEvent);
        }
        if (type === 'onmousewheel') {
            this.renderer.handler._mousewheelHandler(offsetEvent);
        }
        if (type === 'mousemove') {
            this.renderer.handler._mousemoveHandler(offsetEvent);
            this.changed();
        }
        if (type === 'onmouseout') {
            this.renderer.handler._mouseoutHandler(offsetEvent);
        }
        if (type === 'onmousedown') {
            this.renderer.handler._mousedownHandler(offsetEvent);
        }
        if (type === 'onmouseup') {
            this.renderer.handler._mouseupHandler(offsetEvent);
        }

    }

    getX(e) {
        return typeof e.zrenderX != 'undefined' && e.zrenderX
            || typeof e.offsetX != 'undefined' && e.offsetX
            || typeof e.layerX != 'undefined' && e.layerX
            || typeof e.clientX != 'undefined' && e.clientX;
    }

    getY(e) {
        return typeof e.zrenderY != 'undefined' && e.zrenderY
            || typeof e.offsetY != 'undefined' && e.offsetY
            || typeof e.layerY != 'undefined' && e.layerY
            || typeof e.clientY != 'undefined' && e.clientY;
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
    un(event, callback) {
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
    }

    /**
     * Method: addTFEvents
     * 将图层添加到地图上之前用户要求添加的事件监听添加到图层。
     *
     */
    addTFEvents() {
        var tfEs = this.TFEvents;
        var len = tfEs.length;
        for (var i = 0; i < len; i++) {
            this.renderer.on(tfEs[i][0], tfEs[i][1]);
        }
    }

    getLocalXY(coordinate) {
        var pixelP;
        if (coordinate instanceof SuperMap.Geometry.Point || coordinate instanceof SuperMap.Geometry.GeoText) {
            pixelP = map.getPixelFromCoordinate([coordinate.x, coordinate.y]);
        }
        if (coordinate instanceof SuperMap.LonLat) {
            pixelP = map.getPixelFromCoordinate([coordinate.lon, coordinate.lat]);
        }
        var rotation = -map.getView().getRotation();
        var center = map.getPixelFromCoordinate(map.getView().getCenter());
        var rotatedP = pixelP;
        if (pixelP && center) {
            rotatedP = this.rotate(pixelP, rotation, center);
        }
        if (this.offset && rotatedP) {
            return [rotatedP[0] + this.offset[0], rotatedP[1] + this.offset[1]];
        }
        return rotatedP;
    }

    //获取某像素坐标点pixelP绕中心center逆时针旋转rotation弧度后的像素点坐标。
    rotate(pixelP, rotation, center) {
        var x = Math.cos(rotation) * (pixelP[0] - center[0]) - Math.sin(rotation) * (pixelP[1] - center[1]) + center[0];
        var y = Math.sin(rotation) * (pixelP[0] - center[0]) + Math.cos(rotation) * (pixelP[1] - center[1]) + center[1];
        return [x, y];
    }

    toiClientFeature(feature) {
        if (feature instanceof ThemeFeature) {
            return feature.toFeature();
        }
        return new SuperMap.REST.ServerFeature.fromJson(feature).toFeature();
    }

}
ol.source.Theme = Theme;