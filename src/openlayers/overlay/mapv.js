import ol from 'openlayers/dist/ol-debug';
import MapvLayer from './mapv/MapvLayer';
import Util from '../core/Util';

export default class Mapv extends ol.source.ImageCanvas {

    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super({
            attributions: options.attributions || new ol.Attribution({
                html: "© 2017 百度 MapV with <span>© <a href='http://iclient.supermapol.com'>SuperMap iClient</a></span>"
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
            var mapWidth = Math.round(ol.extent.getWidth(extent) / resolution) * pixelRatio;
            var mapHeight = Math.round(ol.extent.getHeight(extent) / resolution) * pixelRatio;
            var width = this.map.getSize()[0] * pixelRatio;
            var height = this.map.getSize()[1] * pixelRatio;
            if (!this.layer) {
                this.layer = new MapvLayer(this.map, this.dataSet, this.mapvOptions, mapWidth, mapHeight, this);
            }
            this.layer.offset = [(mapWidth - width) / 2, (mapHeight - height) / 2];
            if (!this.layer.isEnabledTime()) {
                this.layer.canvasLayer.draw(mapWidth, mapHeight);
            }
            var canvas = this.layer.canvasLayer.canvas;
            var context = Util.createCanvasContext2D(mapWidth, mapHeight);
            context.drawImage(canvas, 0, 0, mapWidth, mapHeight, 0, 0, mapWidth, mapHeight);
            if (this.resolution !== resolution || JSON.stringify(this.extent) !== JSON.stringify(extent)) {
                this.resolution = resolution;
                this.extent = extent;
            }
            return context.canvas;
        }
    }

    update(options) {
        this.layer.update(options);
        this.changed();
    }
}

ol.source.Mapv = Mapv;