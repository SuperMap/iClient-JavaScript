/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../../core/Base';
import {ThemeFeature} from './ThemeFeature';
import { Util as CommonUtil} from '@supermap/iclient-common/commontypes/Util';
import { LevelRenderer } from '@supermap/iclient-common/overlay/levelRenderer/LevelRenderer';
import { ServerFeature } from '@supermap/iclient-common/iServer/ServerFeature';
import { GeoText } from '@supermap/iclient-common/commontypes/geometry/GeoText';
import { GeoJSON as GeoJSONFormat } from '@supermap/iclient-common/format/GeoJSON';
import { Point  } from '@supermap/iclient-common/commontypes/geometry/Point';
import { Vector as FeatureVector } from '@supermap/iclient-common/commontypes/Vector';
import { LonLat } from '@supermap/iclient-common/commontypes/LonLat';

/**
 * @class ThemeLayer
 * @category Visualization Theme
 * @classdesc 专题图基类。地图学中将突出而深入地表示一种或几种要素或现象，即集中表示一个主题内容的地图称为专题地图。
 * 在 SuperMap 中，专题图是地图图层的符号化显示，即用各种图形渲染风格（大小，颜色，线型，填充等）来图形化地表现专题要素的某方面特征。
 * 调用建议：使用其子类实现该类。
 * @modulecategory Overlay
 * @param {string} name - 专题图图层名。
 * @param {Object} options -可选参数。
 * @param {mapboxgl.Map} options.map - MapBoxGL Map 对象，将在下个版本弃用，请用 map.addLayer()方法添加图层。
 * @param {string} [options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {boolean} [options.loadWhileAnimating=true] - 是否实时重绘。
 * @param {boolean} [options.visibility=true] - 图层是否可见。
 * @param {number} [options.opacity=1] - 图层不透明度。
 * @fires ThemeLayer#changelayer
 * @fires ThemeLayer#featuresremoved
 * @usage
 */
export class Theme {

    constructor(name, opt_options) {
        var options = opt_options ? opt_options : {};
        /**
         * @member {string} ThemeLayer.prototype.name
         * @description 专题图图层名称。
         */
        this.name = name;

        /**
         * @member {string} [ThemeLayer.prototype.id]
         * @description 专题图图层 ID。
         */
        this.id = options.id ? options.id : CommonUtil.createUniqueID("themeLayer_");
        /**
         * @member {number} [ThemeLayer.prototype.opacity=1]
         * @description 图层不透明度。
         */
        this.opacity = options.opacity ? options.opacity : 1;

        /**
         * @member {boolean} [ThemeLayer.prototype.visibility=true]
         * @description 图层是否可见。
         */
        this.visibility = true;

        /**
         * @member {boolean} [ThemeLayer.prototype.loadWhileAnimating=true]
         * @description 是否实时重绘。(当绘制大数据量要素的情况下会出现卡顿，建议把该参数设为 false)。
         */
        this.loadWhileAnimating = options.loadWhileAnimating === undefined ? true : options.loadWhileAnimating;

        /**
         * @member {mapboxgl.Map} ThemeLayer.prototype.map
         * @description MapBoxGL Map 对象。
         */
        this.map = options.map ? options.map : null;

        this.features = [];
        this.TFEvents = [];

        //todo 保留之前创建图层同时添加到图层的用法，在下个版本遗弃
        if (this.map) {
            this.map.addLayer(this);
        }

    }

    /**
     * @function ThemeLayer.prototype.onAdd
     * @description 添加该图层。
     */
    onAdd(map) {
        this.map = map;
        this._createCanvasContainer();

        //处理用户预先（在图层添加到 map 前）监听的事件
        this.addTFEvents();
        this.map.on('resize', this.resizeEvent.bind(this));
        this.map.on('zoomstart', this.zoomStartEvent.bind(this));
        this.map.on('zoomend', this.zoomEndEvent.bind(this));
        this.map.on('rotatestart', this.rotateStartEvent.bind(this));
        this.map.on('rotate', this.rotateEvent.bind(this));
        this.map.on('rotateend', this.rotateEndEvent.bind(this));
        this.map.on('dragend', this.dragEndEvent.bind(this));
        this.map.on('movestart', this.moveStartEvent.bind(this));
        this.map.on('move', this.moveEvent.bind(this));
        this.map.on('moveend', this.moveEndEvent.bind(this));
        this.map.on('remove', this.removeFromMap.bind(this));

        this.refresh();
    }

    /**
     * @function ThemeLayer.prototype.refresh
     * @description 强制刷新当前热点显示，在图层热点数组发生变化后调用，更新显示。
     */
    refresh() {
        if (this.features.length === 0) {
            return;
        }
        if (this.map) {
            this.redrawThematicFeatures(this.map.getBounds());
        }
    }

    _createCanvasContainer() {
        this.movingOffset = [0, 0];
        this.mapContainer = this.map.getCanvasContainer();
        this.div = document.createElement('div');
        this.div.id = this.id;
        this.div.style.position = 'absolute';
        var container = this.map.getCanvasContainer();
        var canvas = this.map.getCanvas();
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        this.div.style.width = canvas.style.width;
        this.div.style.height = canvas.style.height;
        this.div.className = "themeLayer";
        this.div.width = parseInt(canvas.width);
        this.div.height = parseInt(canvas.height);
        container.appendChild(this.div);
        this.setOpacity(this.opacity);
        this.levelRenderer = new LevelRenderer();
        this.renderer = this.levelRenderer.init(this.div);
        this.renderer.clear();
    }

    /**
     * @function ThemeLayer.prototype.destroyFeatures
     * @description 销毁要素。
     * @param {Array.<FeatureVector>|FeatureVector} features - 将被销毁的要素。
     */
    destroyFeatures(features) {
      var all = (features === undefined);
      if (all) {
          features = this.features;
      }
      if (features) {
          this.removeFeatures(features);
          if (!Array.isArray(features)) {
            features = [features];
          }
          for (var i = features.length - 1; i >= 0; i--) {
              features[i].destroy();
          }
      }
    }

    /**
     * @function ThemeLayer.prototype.setVisibility
     * @description 设置图层可见性。
     * @param {boolean} [visibility] - 是否显示图层（当前地图的 resolution 在最大最小 resolution 之间）。
     */
    setVisibility(visibility) {
        if (visibility !== this.visibility) {
            this.visibility = visibility;
            this.display(visibility);
            this.redrawThematicFeatures(this.map.getBounds());
        }
    }

    /**
     * @function ThemeLayer.prototype.display
     * @description 隐藏或者显示图层。（通过对 CSS 控制产生即时效果，重新渲染失效。）
     * @param {boolean} [display] - 是否显示图层。
     */
    display(display) {
        this.div.style.display = display ? "block" : "none";
    }

    /**
     * @function ThemeLayer.prototype.setOpacity
     * @description 设置图层的不透明度。
     * @param {number} [opacity] - 不透明度，取值[0-1]之间。
     */
    setOpacity(opacity) {
        if (opacity !== this.opacity) {
            this.opacity = opacity;
            var element = this.div;
            CommonUtil.modifyDOMElement(element, null, null, null,
                null, null, null, opacity);

            if (this.map !== null) {
                 /**
                 * @event ThemeLayer#changelayer
                 * @description 图层属性改变之后触发。
                 * @property {Object} layer - 图层。
                 * @property {string} property - 被改变的属性。
                 */
                mapboxgl.Evented.prototype.fire('changelayer', {layer: this, property: "opacity"});
            }
        }
    }

    /**
     * @function ThemeLayer.prototype.addFeatures
     * @param {ThemeFeature|ServerFeature|GeoJSONObject} features - 待添加要素。
     * @description 向专题图图层中添加数据
     */
    addFeatures(features) { // eslint-disable-line no-unused-vars

    }

    /**
     * @function ThemeLayer.prototype.removeFeatures
     * @param {(Array.<FeatureVector>|FeatureVector|Function)} features - 待删除 feature 的数组或用来过滤的回调函数。 
     * @description 删除专题图中的features。
     *              参数中的 features 数组中的每一项，必须是已经添加到当前图层中的 feature，
     *              如果要删除的 features 数组中的元素过多，推荐使用 removeAllFeatures删除所有 feature后，再重新添加。这样效率会更高。
     */
    removeFeatures(features) {
      var me = this;
      if (!features) {
          return;
      }
      if (features === me.features) {
          return me.removeAllFeatures();
      }
      if (!CommonUtil.isArray(features) && !(typeof features === 'function')) {
          features = [features];
      }

      var featuresFailRemoved = [];

      for (var i = 0; i < me.features.length; i++) {
          var feature = me.features[i];

          //如果我们传入的feature在features数组中没有的话，则不进行删除，
          //并将其放入未删除的数组中。
          if (features && typeof features === 'function') {
            if (features(feature)) {
              me.features.splice(i--, 1);
            }
          } else {
            var findex = CommonUtil.indexOf(features, feature);
            if (findex === -1) {
                featuresFailRemoved.push(feature);
            } else {
              me.features.splice(i--, 1);
            }
          }
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
      /**
       * @event ThemeLayer#featuresremoved
       * @description 要素删除之后触发。
       * @property {Array.<FeatureVector>} features - 未被成功删除的要素。
       * @property {boolean} succeed - 删除成功与否。
       */
      mapboxgl.Evented.prototype.fire("featuresremoved", {features: featuresFailRemoved, succeed: succeed});
    }

    /**
     * @function ThemeLayer.prototype.removeAllFeatures
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
     * @function ThemeLayer.prototype.getFeatures
     * @description 查看当前图层中的有效数据。
     * @param {Function} [filter] - 根据条件过滤要素的回调函数。
     * @returns {Array.<FeatureVector>} 用户加入图层的有效数据。
     */
    getFeatures(filter) {
      var len = this.features.length;
      var clonedFeatures = [];
      for (var i = 0; i < len; ++i) {
        if (!filter || (filter && typeof filter === 'function' && filter(this.features[i]))) {
          clonedFeatures.push(this.features[i]);
        }
      }
      return clonedFeatures;
    }

    /**
     * @function ThemeLayer.prototype.getFeatureBy
     * @description 在专题图的要素中，获取第一个feature[property] === value的矢量要素。
     * @param {string} property - 属性名称。
     * @param {string} value - 属性值。
     * @returns {FeatureVector} 矢量要素。
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
     * @function ThemeLayer.prototype.getFeatureById
     * @description 获取指定featureId的矢量要素。
     * @param {string} featureId - 矢量要素的属性 ID。
     * @returns {FeatureVector} 对应featureId的矢量要素，不存在则返回 null。
     */
    getFeatureById(featureId) {
        return this.getFeatureBy('id', featureId);
    }

    /**
     * @function ThemeLayer.prototype.getFeaturesByAttribute
     * @description 通过属性的 key 值和 value 值，获取匹配的要素数组。
     * @param {string} attrName - 属性的 key。
     * @param {string} attrValue - 属性的 value。
     * @returns {Array.<FeatureVector>} 要素数组。
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
     * @function ThemeLayer.prototype.redrawThematicFeatures
     * @description 重绘专题要素。
     * @param {mapboxgl.LngLatBounds} extent - 重绘的范围。
     */
    redrawThematicFeatures(extent) { // eslint-disable-line no-unused-vars
    }

    /**
     * @function ThemeLayer.prototype.on
     * @description 添加专题要素事件监听。
     * @param {Event} event - 监听事件。
     * @param {function} callback - 回调函数。
     * @param {string} context - 信息。
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
     * @function ThemeLayer.prototype.off
     * @description 移除专题要素事件监听。
     * @param {Event} event - 监听事件。
     * @param {function} callback - 回调函数。
     * @param {string} context - 信息。
     */
    off(event, callback, context) { // eslint-disable-line no-unused-vars
        var me = this;
        if (me.renderer) {
            me.renderer.un(event, callback);
        } else {
            this.map.off(event, callback);
        }
        return this;
    }

    /**
     * @function ThemeLayer.prototype.addTFEvents
     * @description 将事件监听添加到图层。
     * @private
     */
    addTFEvents() {
        var tfEs = this.TFEvents;
        var len = tfEs.length;
        for (var i = 0; i < len; i++) {
            this.renderer.on(tfEs[i][0], tfEs[i][1]);
        }

    }

    /**
     * @function ThemeLayer.prototype.getLocalXY
     * @description 地理坐标转为像素坐标。
     * @param {Object} [coordinate] - 坐标位置。
     * @returns {Array} 像素坐标数组。
     */
    getLocalXY(coordinate) {
        var pixelP, map = this.map;
        if (coordinate instanceof Point || coordinate instanceof GeoText) {
            let tempPoint = map.project(new mapboxgl.LngLat(coordinate.x, coordinate.y));
            pixelP = [tempPoint.x, tempPoint.y];
        }
        if (coordinate instanceof LonLat) {
            let tempPoint = map.project(new mapboxgl.LngLat(coordinate.lon, coordinate.lat));
            pixelP = [tempPoint.x, tempPoint.y];
        }
        return pixelP;
    }

    /**
     * @function ThemeLayer.prototype.toiClientFeature
     * @description 转为 iClient 要素。
     * @param {(Array.<ServerFeature>|Array.<ThemeFeature>|Array.<GeoJSONObject>|ServerFeature|ThemeFeature|GeoJSONObject)} features - 待转要素。
     * @returns {Array.<FeatureVector>} 转换后的 iClient 要素。
     */
    toiClientFeature(features) {
        if (!CommonUtil.isArray(features)) {
            features = [features];
        }

        let featuresTemp = [];
        for (let i = 0; i < features.length; i++) {
            //ThemeFeature 类型
            if (features[i] instanceof ThemeFeature) {
                featuresTemp.push(features[i].toFeature());
            } else if (features[i] instanceof FeatureVector) {
                // 若是 FeatureVector 直接返回
                featuresTemp.push(features[i]);
            } else if (["FeatureCollection", "Feature", "Geometry"].indexOf(features[i].type) != -1) {
                //GeoJSON 规范数据类型
                let format = new GeoJSONFormat();
                featuresTemp = featuresTemp.concat(format.read(features[i]));
            } else if (features[i].geometry && features[i].geometry.parts) {
                //iServer服务器返回数据格式
                featuresTemp.push(ServerFeature.fromJson(features[i]).toFeature());
            } else {
                throw new Error(`features's type is not be supported.`);
            }

        }
        return featuresTemp;
    }

    /**
     * @function ThemeLayer.prototype.toFeature
     * @deprecated
     * @description 转为 iClient 要素，该方法将被弃用，由 {@link ThemeLayer#toiClientFeature} 代替。
     * @param {(Array.<ServerFeature>|Array.<ThemeFeature>|Array.<GeoJSONObject>|ServerFeature|ThemeFeature|GeoJSONObject)} features - 待转要素。
     * @returns {FeatureVector} 转换后的 iClient 要素。
     */
    toFeature(features) {
        return this.toiClientFeature(features);
    }

    moveEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.div.style.transform = '';
        this.redrawThematicFeatures(this.map.getBounds());
        this._show();
    }

    moveStartEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.startPitch = this.map.getPitch();
        this.startBearing = this.map.getBearing();
        var startMovePoint = this.map.project(new mapboxgl.LngLat(0, 0));
        this.startMoveX = startMovePoint.x;
        this.startMoveY = startMovePoint.y;
    }

    moveEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            this.redrawThematicFeatures(this.map.getBounds());
            return;
        }
        if (this.rotating || this.zooming) {
            return;
        }
        if (this.map.getPitch() !== 0) {
            this._hide();
        }
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        var tPitch = this.map.getPitch() - this.startPitch;
        var tBearing = -this.map.getBearing() + this.startBearing;
        var endMovePoint = this.map.project(new mapboxgl.LngLat(0, 0));
        var tMoveX = endMovePoint.x - this.startMoveX;
        var tMoveY = endMovePoint.y - this.startMoveY;
        this.div.style.transform = 'rotateX(' + tPitch + 'deg)' + ' rotateZ(' + tBearing + 'deg)' + ' translate3d(' + tMoveX + 'px, ' + tMoveY + 'px, 0px)';
    }

    zoomStartEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.zooming = true;
        this._hide();
    }

    zoomEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.zooming = false;
        this._show();
    }

    rotateStartEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.rotating = true;
    }

    rotateEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        if (this.map.getPitch() !== 0) {
            this._hide();
        }
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        var tPitch = this.map.getPitch() - this.startPitch;
        var tBearing = -this.map.getBearing() + this.startBearing;
        this.div.style.transform = 'rotateX(' + tPitch + 'deg)' + ' rotateZ(' + tBearing + 'deg)'
    }

    rotateEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.rotating = false;
        this._show();
    }

    dragEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this._hide();
    }

    resizeEvent() {
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        var canvas = this.map.getCanvas();
        this.div.style.width = canvas.style.width;
        this.div.style.height = canvas.style.height;
        this.div.width = parseInt(canvas.width);
        this.div.height = parseInt(canvas.height);
        this.renderer.resize();
    }

    /**
     * @function ThemeLayer.prototype.removeFromMap
     * @description 移除图层。
     */
    removeFromMap() {
        this.mapContainer.removeChild(this.div);
        this.removeAllFeatures();
    }

    /**
     * @function ThemeLayer.prototype.moveTo
     * @description 将图层移动到某个图层之前。
     * @param {string} layerID - 待插入的图层 ID。
     * @param {boolean} [before=true] - 是否将本图层插入到图层 ID 为 layerID 的图层之前。
     */
    moveTo(layerID, before) {
        const layer = document.getElementById(this.div.id);
        before = before !== undefined ? before : true;
        if (before) {
            const beforeLayer = document.getElementById(layerID);
            if (layer && beforeLayer) {
                beforeLayer.parentNode.insertBefore(layer, beforeLayer);
            }
            return;
        }
        const nextLayer = document.getElementById(layerID);
        if (layer) {
            if (nextLayer.nextSibling) {
                nextLayer.parentNode.insertBefore(layer, nextLayer.nextSibling);
                return;
            }
            nextLayer.parentNode.appendChild(layer);
        }
    }

    _hide() {
        this.renderer.painter.root.style.display = 'none';
    }

    _show() {
        this.renderer.painter.root.style.display = 'block';
    }
}
