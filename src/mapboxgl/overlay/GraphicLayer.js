/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import mapboxgl from 'mapbox-gl';
 import { GraphicLayerRenderer } from '@supermap/iclient-common/overlay/graphic/GraphicLayerRenderer';
 import { Util as CommonUtil} from '@supermap/iclient-common/commontypes/Util';

 /**
  * @class GraphicLayer
  * @category  Visualization Graphic
  * @classdesc 高效率点图层类。
  * @modulecategory Overlay
  * @version 11.1.0
  * @param {string} [id] - 图层id。默认使用 CommonUtil.createUniqueID("graphicLayer_") 创建专题图层 ID。
  * @param {Object} options - 参数。
  * @param {Array.<Graphic>} options.graphics - 点要素对象数组 。
  * @param {Array.<number>} [options.color=[0, 0, 0, 255]] - 颜色,目前只支持 rgba 数组。
  * @param {number} [options.radius=10] - 半径。
  * @param {number} [options.opacity=0.8] - 不透明度。
  * @param {Array.<number>} [options.highlightColor=[0, 0, 128, 128]] - 高亮颜色，目前只支持 rgba 数组。
  * @param {number} [options.radiusScale=1] - 点放大倍数。
  * @param {number} [options.radiusMinPixels=0] - 半径最小值(像素)。
  * @param {number} [options.radiusMaxPixels=Number.MAX_SAFE_INTEGER] - 半径最大值(像素)。
  * @param {number} [options.strokeWidth=1] - 边框大小。
  * @param {boolean} [options.outline=false] - 是否显示边框。
  * @usage
  */
 export class GraphicLayer {

     constructor(id, options) {
        this.options = options;
         /**
          * @member {string} GraphicLayer.prototype.id
          * @description 高效率点图层 ID。
          */
         this.id = id || CommonUtil.createUniqueID("graphicLayer_");
         this.type = 'custom';
         this.renderingMode = '3d';
         this.overlay = true;
     }

     /**
      * @function GraphicLayer.prototype.addTo
      * @deprecated
      * @description 添加该图层，将在下个版本废弃，请使用 onAdd() 代替。
      * @param {mapboxgl.Map} map - mapboxgl Map 对象。
      * @returns this
      */
     addTo(map) {
        this.onAdd(map);
        return this;
     }

     /**
      * @function GraphicLayer.prototype.onAdd
      * @description 添加该图层。
      * @param {mapboxgl.Map} map - mapboxgl Map 对象。
      * @returns {GraphicLayer}
      */
     onAdd(map) {
        this.map = map;
        this.renderer = new GraphicLayerRenderer(this.id, this.options, {
          getMapState: this.getMapState.bind(this)
        }, { targetElement: this.map.getCanvasContainer(), mapElement: this.map.getCanvas() });
     }

     /**
      * @function GraphicLayer.prototype.onRemove
      * @deprecated
      * @description 删除该图层，并释放图层资源。
      */
      onRemove() {
        this.remove();
        this.clear();
      }
    /**
      * @function GraphicLayer.prototype.render
      * @description 渲染图层。
      */
     render() {
        this.renderer.draw();
     }

     /**
      * @function GraphicLayer.prototype.setStyle
      * @description 设置图层整体样式。
      * @param {Object} styleOptions - 样式对象。
      * @param {Array.<number>} [styleOptions.color=[0, 0, 0, 255]] - 点颜色。
      * @param {number} [styleOptions.radius=10] - 点半径。
      * @param {number} [styleOptions.opacity=0.8] - 不透明度。
      * @param {Array.<number>}  [styleOptions.highlightColor=[0, 0, 128, 128]] - 高亮颜色，目前只支持 rgba 数组。
      * @param {number} [styleOptions.radiusScale=1] - 点放大倍数。
      * @param {number} [styleOptions.radiusMinPixels=0] - 半径最小值(像素)。
      * @param {number} [styleOptions.radiusMaxPixels=Number.MAX_SAFE_INTEGER] - 半径最大值(像素)。
      * @param {number} [styleOptions.strokeWidth=1] - 边框大小。
      * @param {boolean} [styleOptions.outline=false] - 是否显示边框。
      */
     setStyle(styleOptions) {
        this.renderer && this.renderer.setStyle(styleOptions);
     }

     /**
      * @function GraphicLayer.prototype.setGraphics
      * @description 设置绘制的点要素数据，会覆盖之前的所有要素。
      * @param {Array.<Graphic>} graphics - 点要素对象数组。
      */
     setGraphics(graphics) {
        this.renderer && this.renderer.setGraphics(graphics);
     }

     /**
      * @function GraphicLayer.prototype.addGraphics
      * @description 添加点要素，不会覆盖之前的要素。
      * @param {Array.<Graphic>} graphics - 点要素对象数组。
      */
     addGraphics(graphics) {
        this.renderer && this.renderer.addGraphics(graphics);
     }

     /**
      * @function GraphicLayer.prototype.getGraphicBy
      * @description 在 Vector 的要素数组 graphics 里面遍历每一个 graphic，当 graphic[property]===value 时，返回此 graphic（并且只返回第一个）。
      * @param {string} property - graphic 的某个属性名称。
      * @param {string} value - property 所对应的值。
      * @returns {Graphic} 一个匹配的 graphic。
      */
     getGraphicBy(property, value) {
        return this.renderer && this.renderer.getGraphicBy(property, value);
     }

     /**
      * @function GraphicLayer.prototype.getGraphicById
      * @description 通过给定一个 ID，返回对应的矢量要素。
      * @param {string} graphicId - 矢量要素的属性 ID。
      * @returns {Graphic} 一个匹配的 graphic。
      */
     getGraphicById(graphicId) {
         return this.getGraphicBy("id", graphicId);
     }

     /**
      * @function GraphicLayer.prototype.getGraphicsByAttribute
      * @description 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
      * @param {string} attrName - graphic 的某个属性名称。
      * @param {string} attrValue - property 所对应的值。
      * @returns {Array.<Graphic>} 一个匹配的 graphic 数组。
      */
     getGraphicsByAttribute(attrName, attrValue) {
        return this.renderer && this.renderer.getGraphicsByAttribute(attrName, attrValue);
     }

     /**
      * @function GraphicLayer.prototype.removeGraphics
      * @description 删除要素数组，默认将删除所有要素
      * @param {Array.<Graphic>} [graphics=null] - 删除的 graphics 数组
      */
     removeGraphics(graphics = null) {
         this.renderer && this.renderer.removeGraphics(graphics);
     }

     /**
      * @function GraphicLayer.prototype.clear
      * @description 释放图层资源。
      */
     clear() {
         this.renderer && this.renderer.clear();
     }

     /**
      * @function GraphicLayer.prototype.remove
      * @description 删除该图层。
      */
     remove() {
         this.renderer && this.renderer.remove();
     }

     /**
      * @function GraphicLayer.prototype.moveTo
      * @description 将图层移动到某个图层之前。
      * @param {string} layerID - 待插入的图层 ID。
      * @param {boolean} [before=true] - 是否将本图层插入到图层 ID 为 layerID 的图层之前。
      */
     moveTo(layerID, before) {
        this.renderer.moveTo(layerID, before);
     }

     /**
      * @function GraphicLayer.prototype.setVisibility
      * @description 设置图层可见性。
      * @param {boolean} [visibility] - 是否显示图层（当前地图的 resolution 在最大最小 resolution 之间）。
      */
     setVisibility(visibility) {
         this.renderer.setVisibility(visibility);
     }


     /**
      * @function GraphicLayer.prototype.getState
      * @description 获取当前地图及图层状态。
      * @returns {Object} 地图及图层状态，包含地图状态信息和本图层相关状态。
      */
     getState() {
        return this.renderer.getState();
     }

     /**
      * @function GraphicLayer.prototype.getMapState
      * @description 获取当前地图状态。
      * @returns {Object} 地图状态，包含地图状态信息。
      */
     getMapState() {
        let state = {};
        let center = this.map.getCenter();
        let longitude = center.lng;
        let latitude = center.lat;
        let zoom = this.map.getZoom();
        let maxZoom = this.map.getMaxZoom();
        let pitch = this.map.getPitch();
        let bearing = this.map.getBearing();

        let mapViewport = {
            longitude: longitude,
            latitude: latitude,
            zoom: zoom,
            maxZoom: maxZoom,
            pitch: pitch,
            bearing: bearing
        };
        for (let key in mapViewport) {
            state[key] = mapViewport[key];
        }
        //当使用扩展的mapboxgl代码时有效
        if (this.map.getCRS && this.map.getCRS() !== mapboxgl.CRS.EPSG3857) {
            state.coordinateSystem = this.coordinateSystem;
            state.isGeographicCoordinateSystem = this.isGeographicCoordinateSystem;
        }
         return state;
     }
 }
