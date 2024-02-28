/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {
    MapvLayer
} from './mapv/MapvLayer';
import {
    Util
} from '../core/Util';
import ImageCanvasSource from 'ol/source/ImageCanvas';

/**
 * @class Mapv
 * @browsernamespace ol.source
 * @category  Visualization MapV
 * @classdesc MapV 图层源。MapV 是一款地理信息可视化开源库，MapV 图层可以用来展示大量地理信息数据，点、线、面的数据，每种数据也有不同的展示类型，如直接打点、热力图、网格、聚合等方式展示数据。<br>
 * 展示大量的点数据：如热力图、网格、蜂窝状、点聚合、按颜色区间、按半径大小等方式。<br>
 * 展示大量的线数据：如普通画线、高亮叠加、热力线数据展示等方式，适合展示大量轨迹的场景。<br>
 * 展示大量的自定义面数据：按颜色区间来展示，如展示行政区划数据。
 * @modulecategory Overlay
 * @param {Object} opt_options - 参数。
 * @param {ol.Map} opt_options.map - 当前 OpenLayers 地图对象。
 * @param {Mapv.DataSet} opt_options.dataSet - MapV 的数据集。
 * @param {Object} opt_options.mapvOptions - MapV 的配置对象。
 * @param {string} [opt_options.logo] - Logo（OpenLayers 5.0.0 及更高版本不再支持此参数）。
 * @param {ol.proj.Projection} [opt_options.projection] - 投影信息。
 * @param {number} [opt_options.ratio=1.5] - 视图比，1 表示画布是地图视口的大小，2 表示地图视口的宽度和高度的两倍，依此类推。必须是 1 或更高。
 * @param {Array} [opt_options.resolutions] - 分辨率数组。
 * @param {ol.source.State} [opt_options.state] - 资源状态。
 * @param {(string|Object)} [opt_options.attributions='© 2018 百度 MapV with <span>© <a href='https://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>'] - 版权描述信息。
 * @extends {ol.source.ImageCanvas}
 * @usage
 */
export class Mapv extends ImageCanvasSource {

    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super({
            attributions: options.attributions || "© 2018 百度 MapV with <span>© SuperMap iClient</span>",
            canvasFunction: canvasFunctionInternal_,
            logo: Util.getOlVersion() === '4' ? options.logo : null,
            projection: options.projection,
            ratio: options.ratio,
            resolutions: options.resolutions,
            state: options.state
        });
        this.map = opt_options.map;
        this.dataSet = opt_options.dataSet;
        this.mapvOptions = opt_options.mapvOptions;

        function canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
            var mapWidth = size[0] / pixelRatio;
            var mapHeight = size[1] / pixelRatio;
            var width = this.map.getSize()[0];
            var height = this.map.getSize()[1];
            if (!this.layer) {
                this.layer = new MapvLayer(this.map, this.dataSet, this.mapvOptions, mapWidth, mapHeight, this);
            }
            this.layer.pixelRatio = pixelRatio;
            this.layer.offset = [(mapWidth - width) / 2 , (mapHeight - height) / 2 ];
            if (!this.rotate) {
                this.rotate = this.map.getView().getRotation();
            } else {
                if (this.rotate !== this.map.getView().getRotation()) {
                    this.layer.canvasLayer.resize(mapWidth, mapHeight);
                    this.rotate = this.map.getView().getRotation()
                }
            }
            var canvas = this.layer.canvasLayer.canvas;
            if (!this.layer.isEnabledTime()) {
                this.layer.canvasLayer.resize(mapWidth, mapHeight);
                this.layer.canvasLayer.draw();
            }
            if (!this.context) {
                this.context = Util.createCanvasContext2D(mapWidth, mapHeight);
            }
            var canvas2 = this.context.canvas;
            this.context.clearRect(0, 0, canvas2.width, canvas2.height);
            canvas2.width = size[0];
            canvas2.height = size[1];
            canvas2.style.width = size[0] + "px";
            canvas2.style.height = size[1] + "px";
            this.context.drawImage(canvas, 0, 0);
            if (this.resolution !== resolution || JSON.stringify(this.extent) !== JSON.stringify(extent)) {
                this.resolution = resolution;
                this.extent = extent;
            }
            return this.context.canvas;
        }
    }

    /**
     * @function Mapv.prototype.addData
     * @description 追加数据。
     * @param {Object} data - 要追加的数据。
     * @param {Object} options - 要追加的值。
     */
    addData(data, options) {
        this.layer.addData(data, options);
    }

    /**
     * @function Mapv.prototype.getData
     * @description 获取数据。
     * @returns {Mapv.DataSet} MapV 数据集。
     */
    getData() {
        if (this.layer) {
            this.dataSet = this.layer.getData();
        }
        return this.dataSet;
    }

    /**
     * @function Mapv.prototype.removeData
     * @description 删除符合过滤条件的数据。
     * @param {function} filter - 过滤条件。条件参数为数据项，返回值为 true，表示删除该元素；否则表示不删除。
     * @example
     *  filter=function(data){
     *    if(data.id=="1"){
     *      return true
     *    }
     *    return false;
     *  }
     */
    removeData(filter) {
        this.layer && this.layer.removeData(filter);
    }

    /**
     * @function Mapv.prototype.clearData
     * @description 清除数据。
     */
    clearData() {
        this.layer.clearData();
    }


    /**
     * @function Mapv.prototype.update
     * @description 更新数据。
     * @param {Object} options - 待更新的数据。
     * @param {Object} options.data - mapv 数据集。
     */
    update(options) {
        this.layer.update(options);
        this.changed();
    }
}
