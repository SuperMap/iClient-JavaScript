import ol from 'openlayers/dist/ol-debug';
import Util from '../core/Util';
import './graphic/Graphic';

/**
 * @class ol.source.Graphic
 * @classdesc 高效率点图层源。
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
        this.graphics_ = options.graphics;
        this.map = options.map;
        this.highLightStyle = options.highLightStyle;

        var me = this;
        if (options.onClick) {
            me.map.on('click', function (e) {
                var coordinate = e.coordinate;
                var resolution = e.frameState.viewState.resolution;
                me.forEachFeatureAtCoordinate(coordinate, resolution, options.onClick);
            });
        }

        function canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) {
            var mapWidth = size[0] * pixelRatio;
            var mapHeight = size[1] * pixelRatio;
            var width = this.map.getSize()[0] * pixelRatio;
            var height = this.map.getSize()[1] * pixelRatio;
            var context = Util.createCanvasContext2D(mapWidth, mapHeight);
            var offset = [(mapWidth - width) / 2 / pixelRatio, (mapHeight - height) / 2 / pixelRatio];
            var vectorContext = ol.render.toContext(context, {size: [mapWidth, mapHeight], pixelRatio: pixelRatio});
            var graphics = this.getGraphicsInExtent(extent);
            var me = this;
            graphics.map(function (graphic) {
                var style = graphic.getStyle();
                if (me.selected === graphic) {
                    var defaultHighLightStyle = style;
                    if (style instanceof ol.style.Circle) {
                        defaultHighLightStyle = new ol.style.Circle({
                            radius: style.getRadius(),
                            fill: new ol.style.Fill({
                                color: 'rgba(0, 153, 255, 1)'
                            }),
                            stroke: style.getStroke(),
                            snapToPixel: style.getSnapToPixel()
                        });
                    } else if (style instanceof ol.style.RegularShape) {
                        defaultHighLightStyle = new ol.style.RegularShape({
                            radius: style.getRadius(),
                            radius2: style.getRadius2(),
                            points: style.getPoints(),
                            angle: style.getAngle(),
                            snapToPixel: style.getSnapToPixel(),
                            rotation: style.getRotation(),
                            rotateWithView: style.getRotateWithView(),
                            fill: new ol.style.Fill({
                                color: 'rgba(0, 153, 255, 1)'
                            }),
                            stroke: style.getStroke(),
                        });
                    }
                    style = me.highLightStyle || defaultHighLightStyle;
                }
                vectorContext.setStyle(new ol.style.Style({
                    image: style
                }));
                var geometry = graphic.getGeometry();
                var coordinate = geometry.getCoordinates();
                var pixelP = me.map.getPixelFromCoordinate(coordinate);
                var rotation = -me.map.getView().getRotation();
                var center = me.map.getPixelFromCoordinate(me.map.getView().getCenter());
                var scaledP = scale(pixelP, center, pixelRatio);
                var rotatedP = rotate(scaledP, rotation, center);
                var result = [rotatedP[0] + offset[0], rotatedP[1] + offset[1]];
                var pixelGeometry = new ol.geom.Point(result);
                vectorContext.drawGeometry(pixelGeometry);
            });
            return context.canvas;
        }

        //获取某像素坐标点pixelP绕中心center逆时针旋转rotation弧度后的像素点坐标。
        function rotate(pixelP, rotation, center) {
            var x = Math.cos(rotation) * (pixelP[0] - center[0]) - Math.sin(rotation) * (pixelP[1] - center[1]) + center[0];
            var y = Math.sin(rotation) * (pixelP[0] - center[0]) + Math.cos(rotation) * (pixelP[1] - center[1]) + center[1];
            return [x, y];
        }

        //获取某像素坐标点pixelP相对于中心center进行缩放scaleRatio倍后的像素点坐标。
        function scale(pixelP, center, scaleRatio) {
            var x = (pixelP[0] - center[0]) * scaleRatio + center[0];
            var y = (pixelP[1] - center[1]) * scaleRatio + center[1];
            return [x, y];
        }
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
            });
            return graphics;
        }
        this.graphics_.map(function (graphic) {
            if (ol.extent.containsExtent(extent, graphic.getGeometry().getExtent())) {
                graphics.push(graphic);
            }
        });
        return graphics;
    }

    /**
     * @private
     * @function ol.source.Graphic.prototype.forEachFeatureAtCoordinate
     * @description 获取在视图上的要素
     * @param coordinate -{string} 坐标
     * @param resolution -{number} 分辨率
     * @param callback -{function} 回调函数
     */
    forEachFeatureAtCoordinate(coordinate, resolution, callback) {
        var graphics = this.getGraphicsInExtent();
        for (var i = graphics.length - 1; i > 0; i--) {
            var center = graphics[i].getGeometry().getCoordinates();
            var image = new ol.style.Style({
                image: graphics[i].getStyle()
            }).getImage();
            var extent = [];
            extent[0] = center[0] - image.getAnchor()[0] * resolution;
            extent[2] = center[0] + image.getAnchor()[0] * resolution;
            extent[1] = center[1] - image.getAnchor()[1] * resolution;
            extent[3] = center[1] + image.getAnchor()[1] * resolution;
            if (ol.extent.containsCoordinate(extent, coordinate)) {
                this.selected = graphics[i];
                this.changed();
                callback(graphics[i]);
                return;
            }
            this.selected = null;
            this.changed();
        }
        callback();
    }
}

ol.source.Graphic = Graphic;