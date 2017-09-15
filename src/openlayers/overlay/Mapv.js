import ol from 'openlayers/dist/ol-debug';
import MapvLayer from './mapv/MapvLayer';
import Util from '../core/Util';

/**
 * @class ol.source.Mapv
 * @classdesc MapV图层源。
 * @param opt_options -{Object} 参数
 * @extends ol.source.ImageCanvas{@linkdoc-openlayers/ol.source.ImageCanvas}
 */
export default class Mapv extends ol.source.ImageCanvas {

    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super({
            attributions: options.attributions || new ol.Attribution({
                html: "© 2017 百度 MapV with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"
            }),
            canvasFunction: canvasFunctionInternal_,
            logo: options.logo,
            projection: options.projection,
            ratio: options.ratio,
            resolutions: options.resolutions,
            state: options.state
        });
        this.map = opt_options.map;
        this.dataSet = opt_options.dataSet;
        this.mapvOptions = opt_options.mapvOptions;

        function canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) {
            var mapWidth = size[0] * pixelRatio;
            var mapHeight = size[1] * pixelRatio;
            var width = this.map.getSize()[0] * pixelRatio;
            var height = this.map.getSize()[1] * pixelRatio;
            if (!this.layer) {
                this.layer = new MapvLayer(this.map, this.dataSet, this.mapvOptions, mapWidth, mapHeight, this);
            }
            this.layer.pixelRatio = pixelRatio;
            this.layer.offset = [(mapWidth - width) / 2 / pixelRatio, (mapHeight - height) / 2 / pixelRatio];
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
            canvas2.width = mapWidth;
            canvas2.height = mapHeight;
            canvas2.style.width = mapWidth + "px";
            canvas2.style.height = mapHeight + "px";
            this.context.drawImage(canvas, 0, 0, mapWidth, mapHeight, 0, 0, mapWidth, mapHeight);
            if (this.resolution !== resolution || JSON.stringify(this.extent) !== JSON.stringify(extent)) {
                this.resolution = resolution;
                this.extent = extent;
            }
            return this.context.canvas;
        }
    }

    /**
     * @function ol.source.Mapv.prototype.update
     * @description 更新数据
     * @param options -{Object} 要更新的参数
     */
    update(options) {
        this.layer.update(options);
        this.changed();
    }
}

ol.source.Mapv = Mapv;