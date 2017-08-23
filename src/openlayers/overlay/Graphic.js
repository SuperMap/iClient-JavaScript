import ol from 'openlayers/dist/ol-debug';
import Util from '../core/Util';
import './graphic/Graphic';

/**
 * @class ol.source.Graphic
 * @classdesc 图形类。
 * @param options -{Object} 图形参数
 * @extends ol.source.ImageCanvas{@linkdoc-openlayers/ol.source.ImageCanvas}
 */
export default class Graphic extends ol.source.ImageCanvas {

    constructor(options) {
        super({
            attributions: options.attributions,
            canvasFunction: canvasFunctionInternal_,
            logo: options.logo,
            projection: options.projection,
            ratio: options.ratio,
            resolutions: options.resolutions,
            state: options.state
        });
        this.canvasContext_ = Util.createCanvasContext2D();
        this.imageTransform = [1, 0, 0, 1, 0, 0];
        this.graphics_ = options.graphics;

        function canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) {
            var width = Math.round(ol.extent.getWidth(extent) / resolution);
            var height = Math.round(ol.extent.getHeight(extent) / resolution);
            this.canvasContext_.canvas.width = width;
            this.canvasContext_.canvas.height = height;
            this.imageTransform = this.getTransform_(ol.extent.getCenter(extent), resolution, pixelRatio, size);
            var vectorContext = new ol.render.canvas.Immediate(this.canvasContext_, pixelRatio, extent, this.imageTransform, 0);
            //var vectorContext = ol.render.toContext(this.canvasContext_, {pixelRatio:pixelRatio, size:size});
            var graphics = this.getGraphicsInExtent(extent);
            graphics.map(function (graphic) {
                vectorContext.drawFeature(graphic, graphic.getStyle());
            });
            return this.canvasContext_.canvas;
        }
    }

    /**
     * @private
     * @function ol.source.Graphic.prototype.forEachFeatureAtCoordinate
     * @description 获取在视图上的要素
     * @param coordinate -{string} 坐标
     * @param rotation -{number} 角度
     * @param hitTolerance -{number} 精度
     * @param skippedFeatureUids -{boolean} 跳过功能的UID
     * @param resolution -{number} 分辨率
     * @param callback -{function} 回调函数
     */
    forEachFeatureAtCoordinate(coordinate, resolution, rotation, hitTolerance, skippedFeatureUids, callback) {
        var graphics = this.getGraphicsInExtent();
        for (var i = 0; i < graphics.length; i++) {
            var center = graphics[i].getGeometry().getCoordinates();
            var image = graphics[i].getStyle().getImage();
            var extent = [];
            extent[0] = center[0] - image.getAnchor()[0] * resolution;
            extent[2] = center[0] + image.getAnchor()[0] * resolution;
            extent[1] = center[1] - image.getAnchor()[1] * resolution;
            extent[3] = center[1] + image.getAnchor()[1] * resolution;
            if (ol.extent.containsCoordinate(extent, coordinate)) {
                return callback.call(this, graphics[i]);
            }
        }
    }

    getTransform_(center, resolution, pixelRatio, size) {
        var dx1 = size[0] / 2;
        var dy1 = size[1] / 2;
        var sx = pixelRatio / resolution;
        var sy = -sx;
        var dx2 = -center[0];
        var dy2 = -center[1];
        return ol.transform.compose(this.imageTransform, dx1, dy1, sx, sy, 0, dx2, dy2);
    }

    /**
     * @function ol.source.Graphic.prototype.getGraphicsInExtent
     * @description 在指定范围中获取几何要素面积
     * @param extent -{Object} 长度范围
     */
    getGraphicsInExtent(extent) {
        var graphics = [];
        if (!extent) {
            this.graphics_.map(function (graphic) {
                graphics.push(graphic);
            })
            return graphics;
        }
        this.graphics_.map(function (graphic) {
            if (ol.extent.containsExtent(extent, graphic.getGeometry().getExtent())) {
                graphics.push(graphic);
            }
        });
        return graphics;
    }
}

ol.source.Graphic = Graphic;