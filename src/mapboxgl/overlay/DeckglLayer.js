/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import mapboxgl from 'mapbox-gl';
import { DeckglLayerBase } from '@supermap/iclient-common/overlay/deckgl/DeckglLayerBase';

/**
 * @class DeckglLayer
 * @category  Visualization DeckGL
 * @classdesc Deckgl 高效率图层类。该图层为综合图层，通过该图层可创建：高效率点图层、路径图层（线图层）、高效率面图层、曲线图层、
 *            正六边形图层（蜂巢图层）、网格图层，只需给定相依配置，因此，在创建图层之前，请仔细阅读参数配置。
 * @modulecategory Overlay
 * @param {string} layerTypeID - 高效率图层类型 ID，包括 "scatter-plot" 高效率点图层、"path-layer" 路径图层（线图层）、
 *                 "polygon-layer" 高效率面图层、"arc-layer" 曲线图层、"hexagon-layer" 正六边形图层（蜂巢图层）、"screen-grid-layer" 网格图层。
 *
 * @param {Object} options -  图层配置项，包括以下参数：
 * @param {Object} [options.layerId] - DeckglLayer 图层 Dom 元素 ID。默认使用 CommonUtil.createUniqueID("graphicLayer_" + this.layerTypeID + "_") 创建专题图层 ID。
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
 * @param {boolean} [options.props.radius=1000] - "hexagon-layer" 配置项：六边形半径值。
 * @param {boolean} [options.props.extruded=false] - "hexagon-layer" 配置项：是否拉伸要素。
 * @param {boolean} [options.props.upperPercentile=100] - "hexagon-layer" 配置项：筛选并通过 upperPercentile 重新计算颜色。颜色值大于 upperPercentile 的六边形将被隐藏。
 * @param {boolean} [options.props.elevationScale=1] - "hexagon-layer" 配置项：高程乘数，实际海拔高度由 elevationScale * getElevation（d）计算。elevationScale 是一个方便的属性，可以在不更新数据的情况下缩放所有六边形。
 * @param {boolean} [options.props.colorDomain=false]  - "hexagon-layer" 配置项：色阶。
 * @param {boolean} [options.props.colorRange=[[255,255,178,255],[254,217,118,255],[254,178,76,255],[253,141,60,255],[240,59,32,255],[189,0,38,255]]]   - "hexagon-layer" 配置项：色带。
 * @param {number} [options.props.coverage=1] - "hexagon-layer" 配置项：六边形半径乘数，介于 0 - 1 之间。六边形的最终半径通过覆盖半径计算。注意：覆盖范围不会影响分数的分配方式。分配方式的半径仅由半径属性确定；
 * @param {function} options.props.hexagonAggregator  - "hexagon-layer" 配置项：六边形聚合函数。
 * @param {Object} options.props.lightSettings - 光照配置项。
 * @param {Array} options.props.lightSettings.lightsPosition - 光照配置项：指定为`[x，y，z]`的光在平面阵列中的位置`，在一个平面阵列。长度应该是 `3 x numberOfLights`。
 * @param {Array} options.props.lightSettings.lightsStrength - 光照配置项：平面阵列中指定为`[x，y]`的光的强度。长度应该是`2 x numberOfLights`。
 * @param {number} [options.props.lightSettings.numberOfLights=1]  - 光照配置项：光照值，最大值为 5。
 * @param {number} [options.props.lightSettings.coordinateSystem=COORDINATE_SYSTEM.LNGLAT]  - 光照配置项：指定灯位置的坐标系。
 * @param {number} [options.props.lightSettings.coordinateOrigin=[0, 0, 0]] - 光照配置项：指定灯位置的坐标原点。
 * @param {number} [options.props.lightSettings.modelMatrix] - 光照配置项：光位置的变换矩阵。
 * @param {number} [options.props.lightSettings.ambientRatio=0.4] - 光照配置项：光照的环境比例。
 * @param {number} [options.props.lightSettings.diffuseRatio=0.6] - 光照配置项：光的漫反射率。
 * @param {number} [options.props.lightSettings.specularRatio=0.8] - 光照配置项：光的镜面反射率。
 * @usage
 * @extends {DeckglLayerBase}
 */
export class DeckglLayer extends DeckglLayerBase {
    constructor(layerTypeID, options) {
        super(layerTypeID, options);
        this.type='custom';
        this.renderingMode = '3d';
        this.overlay = true;
    }

    /**
     * @function DeckglLayer.prototype.onAdd
     * @param {mapboxgl.Map} map - MapBoxGL Map 对象。
     * @returns {DeckglLayer}
     */
    onAdd(map) {
        this.map = map;
        if (this.canvas) {
            this.mapContainer = this.map.getCanvasContainer();
            return this;
        }
        //当使用扩展的mapboxgl代码时有效
        if (this._isEPSG3857()) {
            this.coordinateSystem = 3;
            this.isGeographicCoordinateSystem = true;
        } else {
            this.coordinateSystem = 1;
            this.isGeographicCoordinateSystem = false;
        }
        //创建图层容器
        this._initContainer(this.map.getCanvasContainer(), this.map.getCanvas());

        //创建 deckgl 图层
        this._createLayerByLayerTypeID();

        var mapState = this._getState();
        let deckOptions = {};
        for (let key in mapState) {
            deckOptions[key] = mapState[key];
        }
        deckOptions.layers = [this.layer];
        deckOptions.canvas = this.canvas;
        this.deckGL = new window.DeckGL.experimental.DeckGLJS(deckOptions);
        this._draw();
        return this;
    }

    /**
     * @function DeckglLayer.prototype.onRemove
     * @param {maplibregl.Map} map - MapLibreGL Map 对象。
     */
    onRemove() {
      this.map.getCanvasContainer().removeChild(this.canvas);
      this.clear();
    }

    /**
     * @function DeckglLayer.prototype.getMapInfo
     * @param {maplibregl.Map} map - MapLibreGL Map 对象。
     */
    getMapInfo() {
      let center = this.map.getCenter();
      let zoom = this.map.getZoom();
      let maxZoom = this.map.getMaxZoom();
      let pitch = this.map.getPitch();
      let bearing = this.map.getBearing();
      let longitude = center.lng;
      let latitude = center.lat;
      return { center, zoom, maxZoom, pitch, bearing, longitude, latitude };
    }

    /**
     * @function DeckglLayer.prototype.render
     */
    render() {
      this._draw();
    }

    _isEPSG3857() {
      return this.map.getCRS && this.map.getCRS() !== mapboxgl.CRS.EPSG3857
    }
}

