/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import { Util as CommonUtil} from '../../commontypes/Util';
//  import { extend } from '../../util';

 const defaultProps = {
     color: [0, 0, 0, 255],
     opacity: 0.8,
     radius: 10,
     radiusScale: 1,
     radiusMinPixels: 0,
     radiusMaxPixels: Number.MAX_SAFE_INTEGER,
     strokeWidth: 1,
     outline: false
 };
 
 /**
  * @class GraphicLayerRenderer
  * @category  Visualization Graphic
  * @classdesc 高效率点图层。
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
 export class GraphicLayerRenderer {
 
     constructor(id, options, callbackOptions, mapOptions) {
         let opt = CommonUtil.extend(this,  defaultProps, options);
         /**
          * @member {string} GraphicLayerRenderer.prototype.id
          * @description 高效率点图层 ID。
          */
         this.id = id || CommonUtil.createUniqueID("graphicLayer_");
         /**
          * @member {Array.<Graphic>} GraphicLayerRenderer.prototype.graphics
          * @description 点要素对象数组。
          */
         this.graphics = [].concat(opt.graphics);
 
         /**
          * @member {boolean} [GraphicLayerRenderer.prototype.visibility=true]
          * @description 图层显示状态属性。
          */
         this.mapOptions = mapOptions;
         this.callbackOptions = callbackOptions;
         this.visibility = true;
         this.init();
     }

     init() {
        if (this.canvas) {
            this.mapOptions.mapContainer.appendChild(this.canvas);
        }
         this._initContainer();
         let mapState = this.callbackOptions.getState();
         let {
             data,
             color,
             radius,
             opacity,
             highlightColor,
             radiusScale,
             radiusMinPixels,
             radiusMaxPixels,
             strokeWidth,
             outline
         } = mapState;
         let me = this;
         let layerOptions = {
             id: 'scatter-plot',
             data,
             pickable: Boolean(this.onClick) || Boolean(this.onHover),
             autoHighlight: true,
             color: color,
             opacity: opacity,
             radius: radius,
             radiusScale: radiusScale,
             highlightColor: highlightColor,
             radiusMinPixels: radiusMinPixels,
             radiusMaxPixels: radiusMaxPixels,
             strokeWidth: strokeWidth,
             outline: outline,
             isGeographicCoordinateSystem: this.isGeographicCoordinateSystem,
             coordinateSystem: this.coordinateSystem,
             getPosition: function (point) {
                 if (!point) {
                     return [0, 0, 0];
                 }
                 let lngLat = point.getLngLat();
                 return lngLat && [lngLat.lng, lngLat.lat, 0];
             },
             getColor: function (point) {
                 let style = point && point.getStyle();
                 let color1 = style && style.color || me.color;
                 return color1;
             },
             getRadius: function (point) {
                 let style = point && point.getStyle();
                 return style && style.radius || me.radius
             },
             updateTriggers: {
                 getColor: [color],
                 getRadius: [radius]
             }
         };
         if (this.onClick) {
             layerOptions.onClick = this.onClick;
         }
         if (this.onHover) {
             layerOptions.onHover = this.onHover;
         }
         this.layer = new window.DeckGL.ScatterplotLayer(layerOptions);
         let deckOptions = {};
         for (let key in mapState) {
             deckOptions[key] = mapState[key];
         }
         let width = parseInt(this.canvas.style.width);
         let height = parseInt(this.canvas.style.height);
         deckOptions.width = width;
         deckOptions.height = height;
         deckOptions.layers = [this.layer];
         deckOptions.canvas = this.canvas;
         this.deckGL = new window.DeckGL.experimental.DeckGLJS(deckOptions);
         this.draw();
     }
 
     /**
      * @function GraphicLayerRenderer.prototype.setStyle
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
         let styleOpt = {
             color: this.color,
             radius: this.radius,
             opacity: this.opacity,
             highlightColor: this.highlightColor,
             radiusScale: this.radiusScale,
             radiusMinPixels: this.radiusMinPixels,
             radiusMaxPixels: this.radiusMaxPixels,
             strokeWidth: this.strokeWidth,
             outline: this.outline
         };
 
         CommonUtil.extend(this, styleOpt, styleOptions);
         this.update();
     }
 
     /**
      * @function GraphicLayerRenderer.prototype.setGraphics
      * @description 设置绘制的点要素数据，会覆盖之前的所有要素。
      * @param {Array.<Graphic>} graphics - 点要素对象数组。
      */
     setGraphics(graphics) {
         this.graphics = this.graphics || [];
         this.graphics.length = 0;
         let sGraphics = !CommonUtil.isArray(graphics) ? [graphics] : [].concat(graphics);
         //this.layer.props.data不能被重新赋值，只能在原数组上进行操作
         if (!this.layer.props.data) {
             this.layer.props.data = [];
         }
         this.layer.props.data.length = 0;
         for (let i = 0; i < sGraphics.length; i++) {
             this.layer.props.data.push(sGraphics[i]);
         }
         this.update();
     }
 
     /**
      * @function GraphicLayerRenderer.prototype.addGraphics
      * @description 添加点要素，不会覆盖之前的要素。
      * @param {Array.<Graphic>} graphics - 点要素对象数组。
      */
     addGraphics(graphics) {
         this.graphics = this.graphics || [];
         let sGraphics = !CommonUtil.isArray(graphics) ? [graphics] : [].concat(graphics);
         //this.layer.props.data不能被重新赋值，只能在原数组上进行操作
         if (!this.layer.props.data) {
             this.layer.props.data = [];
         }
         for (let i = 0; i < sGraphics.length; i++) {
             this.layer.props.data.push(sGraphics[i]);
         }
         this.update();
     }
 
     /**
      * @function GraphicLayerRenderer.prototype.getGraphicBy
      * @description 在 Vector 的要素数组 graphics 里面遍历每一个 graphic，当 graphic[property]===value 时，返回此 graphic（并且只返回第一个）。
      * @param {string} property - graphic 的某个属性名称。
      * @param {string} value - property 所对应的值。
      * @returns {Graphic} 一个匹配的 graphic。
      */
     getGraphicBy(property, value) {
         let graphic = null;
         for (let index in this.graphics) {
             if (this.graphics[index][property] === value) {
                 graphic = this.graphics[index];
                 break;
             }
         }
         return graphic;
     }
 
     /**
      * @function GraphicLayerRenderer.prototype.getGraphicById
      * @description 通过给定一个 ID，返回对应的矢量要素。
      * @param {string} graphicId - 矢量要素的属性 ID。
      * @returns {Graphic} 一个匹配的 graphic。
      */
     getGraphicById(graphicId) {
         return this.getGraphicBy("id", graphicId);
     }
 
     /**
      * @function GraphicLayerRenderer.prototype.getGraphicsByAttribute
      * @description 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
      * @param {string} attrName - graphic 的某个属性名称。
      * @param {string} attrValue - property 所对应的值。
      * @returns {Array.<Graphic>} 一个匹配的 graphic 数组。
      */
     getGraphicsByAttribute(attrName, attrValue) {
         var graphic,
             foundgraphics = [];
         for (let index in this.graphics) {
             graphic = this.graphics[index];
             if (graphic && graphic.attributes) {
                 if (graphic.attributes[attrName] === attrValue) {
                     foundgraphics.push(graphic);
                 }
             }
         }
         return foundgraphics;
     }
 
     /**
      * @function GraphicLayerRenderer.prototype.removeGraphics
      * @description 删除要素数组，默认将删除所有要素
      * @param {Array.<Graphic>} [graphics=null] - 删除的 graphics 数组
      */
     removeGraphics(graphics = null) {
         //当 graphics 为 null 、为空数组，或 === this.graphics，则清除所有要素
         if (!graphics || graphics.length === 0 || graphics === this.graphics) {
             this.graphics.length = 0;
 
             if (this.layer.props.data) {
                 this.layer.props.data.length = 0;
             }
             this.update();
             return;
         }
 
         if (!(CommonUtil.isArray(graphics))) {
             graphics = [graphics];
         }
 
         for (let i = graphics.length - 1; i >= 0; i--) {
             let graphic = graphics[i];
 
             //如果我们传入的grapchic在graphics数组中没有的话，则不进行删除，
             //并将其放入未删除的数组中。
             let findex = CommonUtil.indexOf(this.graphics, graphic);
 
             if (findex === -1) {
                 continue;
             }
             this.graphics.splice(findex, 1);
         }
 
         //删除完成后重新设置 setGraphics，以更新
         this.update();
     }
 
     /**
      * @function GraphicLayerRenderer.prototype.update
      * @description 更新图层。
      */
     update() {
        console.log('update!');
         if (this.layer.lifecycle !== 'Awaiting state') {
             this.layer.setChangeFlags({
                 dataChanged: true,
                 propsChanged: true,
                 viewportChanged: true,
                 updateTriggersChanged: true
             });
             let state = this.callbackOptions.getState();
             let width = parseInt(this.canvas.style.width);
             let height = parseInt(this.canvas.style.height);
             state.width = width;
             state.height = height;
             this.layer.setState(state);
         }
     }
 
     /**
      * @function GraphicLayerRenderer.prototype.clear
      * @description 释放图层资源。
      */
     clear() {
         this.removeGraphics();
         this.deckGL.finalize();
     }
 
     /**
      * @function GraphicLayerRenderer.prototype.remove
      * @description 删除该图层。
      */
     remove() {
        this.CanvasContainer.removeChild(this.canvas);
     }
 
     /**
      * @function GraphicLayerRenderer.prototype.removeFromMap
      * @deprecated
      * @description 删除该图层，并释放图层资源。
      */
     destroy() {
         this.remove();
         this.clear();
     }
 
     /**
      * @function GraphicLayerRenderer.prototype.moveTo
      * @description 将图层移动到某个图层之前。
      * @param {string} layerID - 待插入的图层 ID。
      * @param {boolean} [before=true] - 是否将本图层插入到图层 ID 为 layerID 的图层之前。
      */
     moveTo(layerID, before) {
         var layer = document.getElementById(this.id);
         before = before !== undefined ? before : true;
         if (before) {
             var beforeLayer = document.getElementById(layerID);
             if (layer && beforeLayer) {
                 beforeLayer.parentNode.insertBefore(layer, beforeLayer);
             }
             return;
         }
         var nextLayer = document.getElementById(layerID);
         if (layer) {
             if (nextLayer.nextSibling) {
                 nextLayer.parentNode.insertBefore(layer, nextLayer.nextSibling);
                 return;
             }
             nextLayer.parentNode.appendChild(layer);
         }
     }
 
     /**
      * @function GraphicLayerRenderer.prototype.setVisibility
      * @description 设置图层可见性。
      * @param {boolean} [visibility] - 是否显示图层（当前地图的 resolution 在最大最小 resolution 之间）。
      */
     setVisibility(visibility) {
         if (this.canvas && visibility !== this.visibility) {
             this.visibility = visibility;
             this.canvas.style.display = visibility ? "block" : "none";
         }
     }
 
     /**
      * @function GraphicLayerRenderer.prototype.draw
      * @description 绘制图层。
      */
     draw() {
         let mapState = this.callbackOptions.getState();
         let deckOptions = {};
 
         for (let key in mapState) {
             deckOptions[key] = mapState[key];
         }
         let width = parseInt(this.canvas.style.width);
         let height = parseInt(this.canvas.style.height);
         deckOptions.width = width;
         deckOptions.height = height;
         deckOptions.layers = [this.layer];
         deckOptions.canvas = this.canvas;
         console.log('deckOptions', deckOptions);
         this.deckGL.setProps(deckOptions);
     }
 
     _initContainer() {
         this.canvas = this._createCanvas(this.mapOptions.mapCanvas);
         this.mapOptions.mapContainer.appendChild(this.canvas);
     }
 
     _createCanvas(mapCanvas) {
         let canvas = document.createElement('canvas');
         if (this.id) {
             canvas.id = this.id;
         }
         canvas.style.position = 'absolute';
         canvas.style.top = 0 + "px";
         canvas.style.left = 0 + "px";
         canvas.style.cursor = "";
         canvas.width = parseInt(mapCanvas.style.width);
         canvas.height = parseInt(mapCanvas.style.height);
         canvas.style.width = mapCanvas.style.width;
         canvas.style.height = mapCanvas.style.height;
         return canvas;
     }
 }
 