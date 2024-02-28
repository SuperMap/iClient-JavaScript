/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import { Util as CommonUtil } from '../../commontypes/Util';
 /**
  * @class DeckglLayerBase
  * @category  Visualization DeckGL
  * @classdesc Deckgl 高效率图层类，该图层为综合图层，通过该图层可创建：高效率点图层、路径图层（线图层）、高效率面图层、曲线图层、
  *           正六边形图层（蜂巢图层）、网格图层，只需给定相依配置，因此，在创建图层之前，请仔细阅读参数配置。
  * @param {string} layerTypeID - 高效率图层类型 ID，包括 "scatter-plot" 高效率点图层、"path-layer" 路径图层（线图层）、
  *                 "polygon-layer" 高效率面图层、"arc-layer" 曲线图层、"hexagon-layer" 正六边形图层（蜂巢图层）、"screen-grid-layer" 网格图层。
  *
  * @param {Object} options -  图层配置项，包括以下参数：
  * @param {Object} [options.layerId] - DeckglLayerBase 图层 Dom 元素 ID。默认使用 CommonUtil.createUniqueID("graphicLayer_" + this.layerTypeID + "_") 创建专题图层 ID。
  * @param {Array.<GeoJSONObject>} options.data - 图层数据，支持 GeoJSON 规范数据类型。
  * @param {Object} options.callback - deckgl 图层回调函数配置项。
  * @param {Object} options.props - deckgl 图层配置项，在该参数下配置图层配置项：
  * @param {number} [options.props.opacity=1] - 公共配置项：图层不透明度度。
  * @param {boolean} [options.props.pickable=false] - 公共配置项：是否响应鼠标事件（鼠标点击，鼠标滑动)。
  * @param {function} [options.props.autoHighlight=false] - 公共配置项：鼠标滑动高亮要素。
  * @param {function} [options.props.highlightColor=[0, 0, 128, 128]] - 公共配置项：鼠标滑动高亮颜色。
  * @param {function} [options.props.onClick] - 公共配置项：鼠标点击事件。
  * @param {function} [options.props.onHover] - 公共配置项：鼠标滑动事件。
  * @param {number} [options.props.radiusScale=1] - "scatter-plot" 配置项：散点半径比例。
  * @param {boolean} [options.props.outline=false] - "scatter-plot" 配置项：是否边线显示。
  * @param {number} [options.props.strokeWidth=1]  - "scatter-plot" 配置项：边线宽度。
  * @param {number} [options.props.radiusMinPixels=0] - "scatter-plot" 配置项：半径最小像素值。
  * @param {number} [options.props.radiusMaxPixels=Number.MAX_SAFE_INTEGER]  - "scatter-plot" 配置项：半径最大像素值。
  * @param {boolean} [options.props.fp64=false] - "scatter-plot" 配置项：是否应以高精度 64 位模式呈现图层。
  * @param {number} [options.props.widthScale=1] - "path-layer" 配置项：线宽比例。
  * @param {number} [options.props.widthMinPixels=0] - "path-layer" 配置项：线宽最小像素值。
  * @param {number} [options.props.widthMaxPixels=Number.MAX_SAFE_INTEGER] - "path-layer" 配置项：线宽最大像素值。
  * @param {boolean} [options.props.rounded=false] - "path-layer" 配置项：节点是否绘制为弧形。
  * @param {number} [options.props.miterLimit=4] - "path-layer" 配置项：节点相对于线宽的最大范围，仅在 rounded 为 false 时有效；
  * @param {boolean} [options.props.fp64=false] - "path-layer" 配置项：是否应以高精度 64 位模式呈现图层。
  * @param {boolean} [options.props.dashJustified=false] - "path-layer" 配置项：是否虚线形式显示，仅在 getDashArray() 回调函数被指定时有效。
  * @param {boolean} [options.props.filled=true] - "polygon-layer" 配置项：是否填充面。
  * @param {boolean} [options.props.stroked=true] - "polygon-layer" 配置项：是否绘制边线。
  * @param {boolean} [options.props.extruded=false] - "polygon-layer" 配置项：是否拉伸建筑。
  * @param {boolean} [options.props.wireframe=false] - "polygon-layer" 配置项：当面被拉伸为建筑时，是否描绘建筑物边线。
  * @param {boolean} [options.props.elevationScale=1] - "polygon-layer" 配置项：海拔比例。
  * @param {boolean} [options.props.lineWidthScale=1] - "polygon-layer" 配置项：线宽比例。
  * @param {boolean} [options.props.lineWidthMinPixels=0] - "polygon-layer" 配置项：线宽最小像素值。
  * @param {boolean} [options.props.lineWidthMaxPixels=Number.MAX_SAFE_INTEGER] - "polygon-layer" 配置项：线宽最大像素值。
  * @param {boolean} [options.props.lineJointRounded=false] - "polygon-layer" 配置项：节点是否绘制为弧形。
  * @param {boolean} [options.props.lineMiterLimit=4] - "polygon-layer" 配置项：节点相对于线宽的最大范围，仅在 lineJointRounded 为 false 时有效。
  * @param {boolean} [options.props.lineDashJustified=false] - "polygon-layer" 配置项：是否虚线形式显示，仅在 getLineDashArray() 回调函数被指定时有效。
  * @param {boolean} [options.props.fp64=false] - "polygon-layer" 配置项：是否应以高精度 64 位模式呈现图层。
  * @param {boolean} [options.props.fp64=false] - "arc-layer" 配置项：是否应以高精度 64 位模式呈现图层。
  * @param {boolean} [options.props.strokeWidth=1] - "arc-layer" 配置项：线宽。
  * @param {number} [options.props.coverage=1] - "hexagon-layer" 配置项：六边形半径乘数，介于 0 - 1 之间。六边形的最终半径通过覆盖半径计算。注意：覆盖范围不会影响分数的分配方式。分配方式的半径仅由半径属性确定；
  * @param {boolean} [options.props.radius=1000] - "hexagon-layer" 配置项：六边形半径值。
  * @param {boolean} [options.props.extruded=false] - "hexagon-layer" 配置项：是否拉伸要素。
  * @param {boolean} [options.props.upperPercentile=100] - "hexagon-layer" 配置项：筛选并通过 upperPercentile 重新计算颜色。颜色值大于 upperPercentile 的六边形将被隐藏。
  * @param {boolean} [options.props.elevationScale=1] - "hexagon-layer" 配置项：高程乘数，实际海拔高度由 elevationScale * getElevation（d）计算。 elevationScale 是一个方便的属性，可以在不更新数据的情况下缩放所有六边形。
  * @param {boolean} [options.props.colorDomain=false]  - "hexagon-layer" 配置项：色阶。
  * @param {boolean} [options.props.colorRange=[[255,255,178,255],[254,217,118,255],[254,178,76,255],[253,141,60,255],[240,59,32,255],[189,0,38,255]]]   - "hexagon-layer" 配置项：色带。
  * @param {function} options.props.hexagonAggregator  - "hexagon-layer" 配置项：六边形聚合函数。
  * @param {Object} options.props.lightSettings - 光照配置项。
  * @param {Array} options.props.lightSettings.lightsPosition - 光照配置项：指定为`[x，y，z]`的光在平面阵列中的位置，长度应该是 `3 x numberOfLights`。
  * @param {Array} options.props.lightSettings.lightsStrength - 光照配置项：平面阵列中指定为`[x，y]`的光的强度。长度应该是`2 x numberOfLights`。
  * @param {number} [options.props.lightSettings.numberOfLights=1]  - 光照配置项：光照值，最大值为：5。
  * @param {number} [options.props.lightSettings.coordinateSystem=COORDINATE_SYSTEM.LNGLAT]  - 光照配置项：指定灯位置的坐标系。
  * @param {number} [options.props.lightSettings.coordinateOrigin=[0, 0, 0]] - 光照配置项：指定灯位置的坐标原点。
  * @param {number} [options.props.lightSettings.modelMatrix] - 光照配置项：光位置的变换矩阵。
  * @param {number} [options.props.lightSettings.ambientRatio=0.4] - 光照配置项：光照的环境比例。
  * @param {number} [options.props.lightSettings.diffuseRatio=0.6] - 光照配置项：光的漫反射率。
  * @param {number} [options.props.lightSettings.specularRatio=0.8] - 光照配置项：光的镜面反射率。
  * @usage
  */
 export class DeckglLayerBase {
     constructor(layerTypeID, options) {
         /**
          * @member {string} DeckglLayerBase.prototype.id
          * @description 高效率点图层 ID。
          */
         this.layerTypeID = layerTypeID;
         /**
          * @member {Array.<Graphic>} DeckglLayerBase.prototype.graphics
          * @description 点要素对象数组。
          * 
          */
         this.data = [].concat(options.data);
 
         this.props = options.props ? options.props : {};
         this.callback = options.callback ? options.callback : {};
 
         this.id = options.layerId
             ? options.layerId
             : CommonUtil.createUniqueID('graphicLayer_' + this.layerTypeID + '_');
     }
 
     /**
      * @function DeckglLayerBase.prototype.onAdd
      */
     onAdd() {
     }

      /**
      * @function DeckglLayerBase.prototype.render
      */
     render() {
     }
 
     /**
      * @function DeckglLayerBase.prototype.setStyle
      * @description 设置图层整体样式。
      * @param {Object} styleOptions - 样式对象。
      * @param {Array.<number>} [styleOptions.color=[0, 0, 0, 255]] - 点颜色。
      * @param {number} [styleOptions.radius=10] - 点半径，单位为像素。
      * @param {number} [styleOptions.opacity=0.8] - 不透明度。
      * @param {Array.<number>}  [styleOptions.highlightColor] - 高亮颜色，目前只支持 rgba 数组。
      * @param {number} [styleOptions.radiusScale=1] - 点放大倍数。
      * @param {number} [styleOptions.radiusMinPixels=0] - 半径最小值，单位为像素。
      * @param {number} [styleOptions.radiusMaxPixels=Number.MAX_SAFE_INTEGER] - 半径最大值，单位为像素。
      * @param {number} [styleOptions.strokeWidth=12] - 边框大小。
      * @param {boolean} [styleOptions.outline=false] - 是否显示边框。
      */
     setStyle(styleOptions) {
         CommonUtil.extend(this.props, styleOptions);
         this._createLayerByLayerTypeID();
         this.update();
     }
 
     /**
      * @function DeckglLayerBase.prototype.setData
      * @description 设置绘制的点要素数据，会覆盖之前的所有要素。
      * @param {Array.<Object>}  data - 点要素对象数组。
      */
     setData(data) {
         this.data = this.data || [];
         this.data.length = 0;
         let dataTemp = !CommonUtil.isArray(data) ? [data] : [].concat(data);
         //this.layer.props.data不能被重新赋值，只能在原数组上进行操作
         if (!this.layer.props.data) {
             this.layer.props.data = [];
         }
         this.layer.props.data.length = 0;
         for (let i = 0; i < dataTemp.length; i++) {
             this.layer.props.data.push(dataTemp[i]);
         }
         this.data = this.layer.props.data;
         this.update();
     }
 
     /**
      * @function DeckglLayerBase.prototype.addData
      * @description 添加点要素，不会覆盖之前的要素。
      * @param {Array.<Object>}  data - 点要素对象数组。
      */
     addData(data) {
         this.data = this.data || [];
         let dataTemp = !CommonUtil.isArray(data) ? [data] : [].concat(data);
         //this.layer.props.data不能被重新赋值，只能在原数组上进行操作
         if (!this.layer.props.data) {
             this.layer.props.data = [];
         }
         for (let i = 0; i < dataTemp.length; i++) {
             this.layer.props.data.push(dataTemp[i]);
         }
         this.update();
     }
 
     /**
      * @function DeckglLayerBase.prototype.update
      * @description 更新图层。
      */
     update() {
         if (this.layer.lifecycle !== 'Awaiting state') {
             let changeFlags = {
                 dataChanged: true,
                 propsChanged: true,
                 viewportChanged: true,
                 updateTriggersChanged: true
             };
             this.layer.setChangeFlags(changeFlags);
         }
         this._draw();
     }
 
     /**
      * @function DeckglLayerBase.prototype.clear
      * @description 释放图层资源。
      */
     // todo 还有哪些资源应该被释放？
     clear() {
         this.removeData();
         this.deckGL.finalize();
     }
 
     /**
      * @function DeckglLayerBase.prototype.removeData
      * @description 移除所有要素。
      */
     removeData() {
         this.data.length = 0;
 
         if (this.layer.props.data) {
             this.layer.props.data.length = 0;
         }
         this.update();
     }

    /**
     * @function DeckglLayerBase.prototype.moveTo
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
     * @function DeckglLayerBase.prototype.setVisibility
     * @description 设置图层可见性。
     * @param {boolean} [visibility] - 是否显示图层（当前地图的 resolution 在最大最小 resolution 之间）。
     */
   setVisibility(visibility) {
      if (this.canvas && visibility !== this.visibility) {
          this.visibility = visibility;
          this.canvas.style.display = visibility ? 'block' : 'none';
      }
    }
 
     _draw() {
         let deckOptions = this._getState();
         deckOptions.layers = [this.layer];
         deckOptions.canvas = this.canvas;
         this.deckGL.setProps(deckOptions);
     }
 
     _getState() {
         //获取地图信息构建state
         let width = parseInt(this.canvas.style.width);
         let height = parseInt(this.canvas.style.height);
        const mapInfo = this.getMapInfo();
 
         let mapViewport = {
             width: width,
             height: height,
             ...mapInfo
         };
 
         let state = {};
 
         //克隆 mapViewport
         for (let key in mapViewport) {
             state[key] = mapViewport[key];
         }
         //克隆 props
         for (let key in this.props) {
             state[key] = this.props[key];
         }
         if (this._isEPSG3857 && this._isEPSG3857()) {
             state.coordinateSystem = this.coordinateSystem;
             state.isGeographicCoordinateSystem = this.isGeographicCoordinateSystem;
         } else {
             state.coordinateSystem = 1;
             state.isGeographicCoordinateSystem = false
         }
 
         //更行数据
         state.data = this.data;
 
         return state;
     }
 
     /**
      * @function DeckglLayerBase.prototype._createLayerByLayerTypeID
      * @description 判别当前创建图层类型。
      * @private
      */
     _createLayerByLayerTypeID() {
         //统一处理公共属性：
         this.props.data = this.data;
         this.props.isGeographicCoordinateSystem = this.isGeographicCoordinateSystem;
         this.props.coordinateSystem = this.coordinateSystem;
         //添加事件监听
         this.props.pickable = Boolean(this.props.onClick) || Boolean(this.props.onHover);
 
         //各类型各自从 defaultProps 取出相形的参数：
         if (this.layerTypeID === 'scatter-plot') {
             this.props.id = 'scatter-plot';
             this._createScatterPlotLayer();
         } else if (this.layerTypeID === 'path-layer') {
             this.props.id = 'path-layer';
             this._createPathLayer();
         } else if (this.layerTypeID === 'polygon-layer') {
             this.props.id = 'polygon-layer';
             this._createPolygonLayer();
         } else if (this.layerTypeID === 'arc-layer') {
             this.props.id = 'arc-layer';
             this._createArcLineLayer();
         } else if (this.layerTypeID === 'hexagon-layer') {
             this.props.id = 'hexagon-layer';
             this._createHexagonLayer();
         } else {
             throw new Error(this.layerTypeID + ' does not support');
         }
     }
 
     /**
      * @description scatter-plot
      * @private
      */
     _createScatterPlotLayer() {
         //处理回调
         /*  this.props.getPosition = this.callback.getPosition ? this.callback.getPosition : function (point) {
               if (!point) {
                   return [0, 0, 0];
               }
               return point.geometry.coordinates;
           };*/
         var me = this;
         this.props.getPosition = this.callback.getPosition
             ? this.callback.getPosition
             : function (point) {
                   if (!point) {
                       return [0, 0, 0];
                   }
                   let lngLat = point.getLngLat();
                   return lngLat && [lngLat.lng, lngLat.lat, 0];
               };
         if (this.callback.getColor) {
             this.props.getColor = this.callback.getColor
                 ? this.callback.getColor
                 : function (point) {
                       let style = point && point.getStyle();
                       return (style && style.color) || me.props.color;
                   };
         }
 
         if (this.callback.getRadius) {
             this.props.getRadius = this.callback.getRadius
                 ? this.callback.getRadius
                 : function (point) {
                       let style = point && point.getStyle();
                       return (style && style.radius) || me.props.radius;
                   };
         }
 
         if (this.props.color || this.props.radius) {
             this.props.updateTriggers = {};
             if (this.props.radius) {
                 this.props.updateTriggers.getRadius = [this.props.radius];
             }
             if (this.props.color) {
                 this.props.updateTriggers.getColor = [this.props.color];
             }
         }
         this.layer = new window.DeckGL.ScatterplotLayer(this.props);
     }
 
     /**
      * @description path-layer
      * @private
      */
     _createPathLayer() {
         this.props.getPath = this.callback.getPath
             ? this.callback.getPath
             : function (feature) {
                   return feature.geometry.coordinates;
               };
         //以下几个函数也可走默认值
         if (this.callback.getColor) {
             this.props.getColor = this.callback.getColor;
         }
         if (this.callback.getWidth) {
             this.props.getWidth = this.callback.getWidth;
         }
         if (this.callback.getDashArray) {
             this.props.getDashArray = this.callback.getDashArray;
         }
 
         this.layer = new window.DeckGL.PathLayer(this.props);
     }
 
     /**
      * @description polygon-layer
      * @private
      */
     _createPolygonLayer() {
         this.props.getPolygon = this.callback.getPolygon
             ? this.callback.getPolygon
             : function (feature) {
                   return feature.geometry.coordinates;
               };
 
         //todo 思考下真的让用户配这么多回调么，或者先判断下数据属性里面有没有配置的属性值？
 
         if (this.callback.getElevation) {
             this.props.getElevation = this.callback.getElevation;
         }
         if (this.callback.getFillColor) {
             this.props.getFillColor = this.callback.getFillColor;
         }
         if (this.callback.getLineColor) {
             this.props.getLineColor = this.callback.getLineColor;
         }
         if (this.callback.getLineWidth) {
             this.props.getLineWidth = this.callback.getLineWidth;
         }
         this.props.updateTriggers = {};
         this.props.updateTriggers.getColor = this.props.color ? this.props.color : [0, 0, 128, 128];
         this.layer = new window.DeckGL.PolygonLayer(this.props);
     }
 
     /**
      * @description arc-layer
      * @private
      */
     _createArcLineLayer() {
         //todo ArcLineLayer geojson coordinates数组中只能有一个线段
         this.props.getSourcePosition = this.callback.getSourcePosition
             ? this.callback.getSourcePosition
             : function (feature) {
                   if (!feature) {
                       return [0, 0, 0];
                   }
 
                   return feature.geometry.coordinates[0];
               };
         this.props.getTargetPosition = this.callback.getTargetPosition
             ? this.callback.getTargetPosition
             : function (feature) {
                   if (!feature) {
                       return [0, 0, 0];
                   }
 
                   return feature.geometry.coordinates[1];
               };
 
         if (this.callback.getStrokeWidth) {
             this.props.getStrokeWidth = this.callback.getStrokeWidth;
         }
         if (this.callback.getSourceColor) {
             this.props.getSourceColor = this.callback.getSourceColor;
         }
         if (this.callback.getTargetColor) {
             this.props.getTargetColor = this.callback.getTargetColor;
         }
 
         this.layer = new window.DeckGL.ArcLayer(this.props);
     }
 
     /**
      * @description hexagon-layer
      * @private
      */
     _createHexagonLayer() {
         this.props.getPosition = this.callback.getPosition
             ? this.callback.getPosition
             : function (feature) {
                   if (!feature) {
                       return [0, 0, 0];
                   }
 
                   return feature.geometry.coordinates;
               };
 
         if (this.callback.getColorValue) {
             this.props.getColorValue = this.callback.getColorValue;
         }
         if (this.callback.getElevationValue) {
             this.props.getElevationValue = this.callback.getElevationValue;
         }
         this.layer = new window.DeckGL.HexagonLayer(this.props);
     }
 
     _initContainer(targetElement, mapElement) {
        const { width, height } = mapElement.style;
        this.canvas = this._createCanvas(width, height);
        targetElement.appendChild(this.canvas);
     }
 
     _createCanvas(width, height) {
         let canvas = document.createElement('canvas');
         canvas.id = this.id;
         canvas.style.position = 'absolute';
         canvas.style.top = 0 + 'px';
         canvas.style.left = 0 + 'px';
         canvas.style.cursor = '';
         canvas.width = parseInt(width);
         canvas.height = parseInt(height);
         canvas.style.width = width;
         canvas.style.height = height;
         return canvas;
     }
 }
 
 