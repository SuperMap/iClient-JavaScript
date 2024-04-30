/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { Util } from '../../core/Util';
import olObject from 'ol/Object';
import * as olStyle from 'ol/style';
import Point from 'ol/geom/Point';
import * as olRender from 'ol/render';

//获取某像素坐标点pixelP相对于中心center进行缩放scaleRatio倍后的像素点坐标。
function scale(pixelP, center, scaleRatio) {
    let x = (pixelP[0] - center[0]) * scaleRatio + center[0];
    let y = (pixelP[1] - center[1]) * scaleRatio + center[1];
    return [x, y];
}

/**
 * @private
 * @class GraphicCanvasRenderer
 * @classdesc 高效率点图层 canvas 渲染器。
 * @category Visualization Graphic
 * @extends {ol.Object}
 * @param {Graphic} layer - 高效率点图层。
 * @param {Object} options - 图层参数。
 * @param {number} options.width - 地图宽度。
 * @param {number} options.height - 地图高度。
 * @param {HTMLElement} options.container - 放置渲染器的父元素。
 * @param {Array.<number>} [options.colo=[0, 0, 0, 255]] - 颜色，目前只支持 rgba 数组。默认[0, 0, 0, 255],
 * @param {number} [options.radius=10] - 半径。
 * @param {number} [options.opacity=0.8] - 不透明度。
 * @param {Array}  [options.highlightColor] - 高亮颜色，目前只支持 rgba 数组。
 * @param {number} [options.radiusScale] - 点放大倍数。
 * @param {number} [options.radiusMinPixels] - 半径最小值，单位为像素。
 * @param {number} [options.radiusMaxPixels] - 半径最大值，单位为像素。
 * @param {number} [options.strokeWidth] - 边框大小。
 * @param {boolean} [options.outline] - 是否显示边框。
 * @param {function} [options.onClick] - 点击事件。
 * @param {function} [options.onHover] - 悬停事件。
 */
export class GraphicCanvasRenderer extends olObject {
    constructor(layer, options) {
        super();
        this.layer = layer;
        this.map = layer.map;
        let opt = options || {};
        CommonUtil.extend(this, opt);
        this.highLightStyle = this.layer.highLightStyle;

        this.mapWidth = this.size[0] / this.pixelRatio;
        this.mapHeight = this.size[1] / this.pixelRatio;
        this.width = this.map.getSize()[0];
        this.height = this.map.getSize()[1];
        this.context = Util.createCanvasContext2D(this.mapWidth, this.mapHeight);
        this.context.scale(this.pixelRatio, this.pixelRatio);
        this.canvas = this.context.canvas;
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this._registerEvents();
    }

    _registerEvents() {
        this.map.on('change:size', this._resizeEvent.bind(this), this);
    }

    _resizeEvent() {
        this._resize();
        this._clearAndRedraw();
    }

    _resize() {
        let size = this.map.getSize();
        let width = size[0];
        let height = size[1];
        let xRatio = width / this.width;
        let yRatio = height / this.height;
        this.width = width;
        this.height = height;
        this.mapWidth = this.mapWidth * xRatio;
        this.mapHeight = this.mapHeight * yRatio;
        this.canvas.width = this.mapWidth;
        this.canvas.height = this.mapHeight;
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
    }

    _clearAndRedraw() {
        this._clearBuffer();
        this.layer.changed();
    }

    update() {
        this.layer.changed();
    }

    _clearBuffer() {}

    /**
     * @private
     * @function GraphicCanvasRenderer.prototype.getCanvas
     * @description 返回画布。
     * @returns {HTMLCanvasElement} canvas 对象。
     */
    getCanvas() {
        return this.canvas;
    }

    /**
     * @private
     * @function GraphicCanvasRenderer.prototype.drawGraphics
     * @description 绘制点要素。
     */
    drawGraphics(graphics) {
        this.graphics_ = graphics || [];
        let mapWidth = this.mapWidth;
        let mapHeight = this.mapHeight;

        let vectorContext = olRender.toContext(this.context, {
            size: [mapWidth, mapHeight],
            pixelRatio: this.pixelRatio
        });
        let defaultStyle = this.layer._getDefaultStyle();
        let me = this,
            layer = me.layer,
            map = layer.map;
        graphics.map(function (graphic) {
            let style = graphic.getStyle() || defaultStyle;
            if (me.selected === graphic) {
                let defaultHighLightStyle = style;
                if (style instanceof olStyle.Circle) {
                    defaultHighLightStyle = new olStyle.Circle({
                        radius: style.getRadius(),
                        fill: new olStyle.Fill({
                            color: 'rgba(0, 153, 255, 1)'
                        }),
                        stroke: style.getStroke(),
                        snapToPixel: Util.getOlVersion() === '4' ? style.getSnapToPixel() : null
                    });
                } else if (style instanceof olStyle.RegularShape) {
                    defaultHighLightStyle = new olStyle.RegularShape({
                        radius: style.getRadius(),
                        radius2: style.getRadius2(),
                        points: style.getPoints(),
                        angle: style.getAngle(),
                        snapToPixel: Util.getOlVersion() === '4' ? style.getSnapToPixel() : null,
                        rotation: style.getRotation(),
                        rotateWithView: style.getRotateWithView(),
                        fill: new olStyle.Fill({
                            color: 'rgba(0, 153, 255, 1)'
                        }),
                        stroke: style.getStroke()
                    });
                }
                style = me.highLightStyle || defaultHighLightStyle;
            }
            vectorContext.setStyle(
                new olStyle.Style({
                    image: style
                })
            );
            let geometry = graphic.getGeometry();
            let coordinate = geometry.getCoordinates();
            let center = map.getView().getCenter();
            let mapCenterPx = map.getPixelFromCoordinate(center);
            let resolution = map.getView().getResolution();
            let x = (coordinate[0] - center[0]) / resolution;
            let y = (center[1] - coordinate[1]) / resolution;
            let scaledP = [x + mapCenterPx[0], y + mapCenterPx[1]];
            scaledP = scale(scaledP, mapCenterPx, 1);
            //处理放大或缩小级别*/
            let result = [scaledP[0] + me.offset[0], scaledP[1] + me.offset[1]];
            let pixelGeometry = new Point(result);
            vectorContext.drawGeometry(pixelGeometry);
            return graphic;
        });
    }
}
