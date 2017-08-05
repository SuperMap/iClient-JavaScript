import MapvLayer from './mapv/MapvLayer';
import Util from '../core/Util';

export default class Mapv extends ol.source.ImageCanvas {

    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super({
            attributions: options.attributions || new ol.Attribution({
                html: '© 2017 百度 MapV with <a href="http://iclient.supermapol.com/">SuperMap iClient</a>'
            }),
            canvasFunction: canvasFunctionInternal_,
            logo: options.logo,
            projection: options.projection,
            ratio: options.ratio,
            resolutions: options.resolutions,
            state: options.state
        });
        this.layer = new MapvLayer(opt_options.map, opt_options.dataSet, opt_options.mapvOptions, this);
        this.layer.canvasLayer.draw();
        this.map = opt_options.map;

        function canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) {
            if (this.layer) {
                if (!this.layer.isEnabledTime()) {
                    this.layer.canvasLayer.draw();
                }
                var mapWidth = Math.ceil(ol.extent.getWidth(extent) / resolution * pixelRatio);
                var mapHeight = Math.ceil(ol.extent.getHeight(extent) / resolution * pixelRatio);
                var width = this.map.getSize()[0] * pixelRatio;
                var height = this.map.getSize()[1] * pixelRatio;
                var canvas = this.layer.canvasLayer.canvas;
                var context = Util.createCanvasContext2D(mapWidth, mapHeight);
                context.drawImage(canvas, 0, 0, width, height, (mapWidth - width) / 2, (mapHeight - height) / 2, width, height);
                if (this.resolution !== resolution || JSON.stringify(this.extent) !== JSON.stringify(extent)) {
                    this.resolution = resolution;
                    this.extent = extent;
                }
                return context.canvas;
            }
        }
    }

    update(options) {
        this.layer.update(options);
        this.changed();
    }
}

ol.source.Mapv = Mapv;