import ol from 'openlayers';
import {
    Util
} from '../core/Util';
import {
    HitCloverShape
} from './graphic/HitCloverShape';
import {
    CloverShape
} from './graphic/CloverShape';

/**
 * @class ol.source.Graphic
 * @category  Visualization Graphic
 * @classdesc 高效率点图层源。
 * @param options -{Object} 图形参数
 * @extends ol.source.ImageCanvas{@linkdoc-openlayers/ol.source.ImageCanvas}
 */
export class Graphic extends ol.source.ImageCanvas {

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
        this.hitGraphicLayer = null;


        var me = this;
        if (options.onClick) {
            me.map.on('click', function (e) {
                var coordinate = e.coordinate;
                var resolution = e.frameState.viewState.resolution;
                var pixel = e.pixel;
                me.forEachFeatureAtCoordinate(coordinate, resolution, options.onClick,pixel);
            });
        }

        function canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
            var mapWidth = size[0] * pixelRatio;
            var mapHeight = size[1] * pixelRatio;
            var width = this.map.getSize()[0] * pixelRatio;
            var height = this.map.getSize()[1] * pixelRatio;
            var context = Util.createCanvasContext2D(mapWidth, mapHeight);
            var offset = [(mapWidth - width) / 2 / pixelRatio, (mapHeight - height) / 2 / pixelRatio];
            var vectorContext = ol.render.toContext(context, {
                size: [mapWidth, mapHeight],
                pixelRatio: 1
            });
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
                            stroke: style.getStroke()
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
                return graphic;
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
                return graphic;
            });
            return graphics;
        }
        this.graphics_.map(function (graphic) {
            if (ol.extent.containsExtent(extent, graphic.getGeometry().getExtent())) {
                graphics.push(graphic);
            }
            return graphic;
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
    forEachFeatureAtCoordinate(coordinate, resolution, callback, evtPixel) {
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
                if (graphics[i].getStyle() instanceof CloverShape) {
                    if (this.hitGraphicLayer) {
                        this.map.removeLayer(this.hitGraphicLayer);
                        this.hitGraphicLayer = null;
                    }
                    var pixel = this.map.getPixelFromCoordinate([center[0], center[1]]);
                    //点击点与中心点的角度
                    evtPixel = evtPixel || [0, 0];
                    var angle = (Math.atan2(evtPixel[1] - pixel[1], evtPixel[0] - pixel[0])) / Math.PI * 180;
                    angle = angle > 0 ? angle : 360 + angle;
                    //确定扇叶
                    var index = Math.ceil(angle / (image.getAngle() + image.getSpaceAngle()));
                    //扇叶的起始角度
                    var sAngle = (index - 1) * (image.getAngle() + image.getSpaceAngle());
                    //渲染参数
                    var opts = {
                        stroke: new ol.style.Stroke({
                            color: "#ff0000",
                            width: 1
                        }),
                        fill: new ol.style.Fill({
                            color: "#0099ff"
                        }),
                        radius: image.getRadius(),
                        angle: image.getAngle(),
                        eAngle: sAngle + image.getAngle(),
                        sAngle: sAngle
                    };
                    if (this.highLightStyle && this.highLightStyle instanceof HitCloverShape) {
                        opts.stroke = this.highLightStyle.getStroke();
                        opts.fill = this.highLightStyle.getFill();
                        opts.radius = this.highLightStyle.getRadius();
                        opts.angle = this.highLightStyle.getAngle();
                    }
                    var hitGraphic = new ol.Graphic(new ol.geom.Point(center));
                    hitGraphic.setStyle(new HitCloverShape(opts));
                    this.hitGraphicLayer = new ol.layer.Image({
                        source: new ol.source.Graphic({
                            map: this.map,
                            graphics: [hitGraphic]
                        })
                    });
                    this.map.addLayer(this.hitGraphicLayer);
                } else {
                    this.selected = graphics[i];
                    this.changed();
                }
                callback(graphics[i]);
                return;
            }
            this.selected = null;
            if (this.hitGraphicLayer) {
                this.map.removeLayer(this.hitGraphicLayer);
                this.hitGraphicLayer = null;
            }
            this.changed();
        }
        callback();
    }
}

ol.source.Graphic = Graphic;