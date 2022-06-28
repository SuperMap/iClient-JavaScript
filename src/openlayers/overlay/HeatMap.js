/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../core/Util';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { LonLat } from '@supermap/iclient-common/commontypes/LonLat';
import { GeoJSON as GeoJSONFormat } from '@supermap/iclient-common/format/GeoJSON';
import { ServerFeature } from '@supermap/iclient-common/iServer/ServerFeature';
import { Vector as FeatureVector } from '@supermap/iclient-common/commontypes/Vector';
import { Point as GeometryPoint } from '@supermap/iclient-common/commontypes/geometry/Point';
import { GeoText } from '@supermap/iclient-common/commontypes/geometry/GeoText';
import ImageCanvasSource from 'ol/source/ImageCanvas';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

/**
 * @class HeatMap
 * @browsernamespace ol.source
 * @classdesc 热力图层类。
 * @category Visualization HeatMap
 * @param {string} name - 图层名称
 * @param {Object} options - 参数。
 * @param {ol.Map} options.map - openlayers 的 map 对象。
 * @param {string} [options.id] - 专题图层 ID，默认使用 CommonUtil.createUniqueID("HeatMapSource_") 创建专题图层 ID。
 * @param {string} [options.featureWeight] - 对应 feature 属性中的热点权重字段名称，权重值类型为 number。
 * @param {number} [options.radius=50] - 热点渲染的最大半径（热点像素半径），单位为 px，当 useGeoUnit 参数 为 true 时，单位使用当前图层地理坐标单位。热点显示的时候以精确点为中心点开始往四周辐射衰减，其衰减半径和权重值成比列。
 * @param {number} [options.opacity=1] - 图层透明度。
 * @param {Array.<string>} [options.colors=['blue','cyan','lime','yellow','red']] - 颜色线性渐变数组，颜色值必须为 canvas 所支持的。
 * @param {boolean} [options.useGeoUnit=false] - 使用地理单位，false 表示默认热点半径默认使用像素单位。当设置为 true 时，热点半径和图层地理坐标保持一致。
 * @extends {ol.source.ImageCanvas}
 * @usage
 */
export class HeatMap extends ImageCanvasSource {

    constructor(name, opt_options) {
        var options = opt_options ? opt_options : {};
        super({
            attributions: options.attributions || "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <span>© <a href='https://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>",
            canvasFunction: canvasFunctionInternal_,
            logo: Util.getOlVersion() === '4' ? options.logo : null,
            projection: options.projection,
            ratio: options.ratio,
            resolutions: options.resolutions,
            state: options.state
        });

        function canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
            var mapWidth = size[0] * pixelRatio;
            var mapHeight = size[1] * pixelRatio;

            this.rootCanvas.width = this.maxWidth = mapWidth;
            this.rootCanvas.height = this.maxHeight = mapHeight;
            if (!this.features) {
                return this.rootCanvas;
            }
            this.pixelRatio = pixelRatio;

            //记录偏移量
            var width = this.map.getSize()[0] * pixelRatio;
            var height = this.map.getSize()[1] * pixelRatio;
            this.offset = [(mapWidth - width) / 2 / pixelRatio, (mapHeight - height) / 2 / pixelRatio];

            this.updateHeatPoints(resolution);

            return this.rootCanvas;
        }

        //初始化成员变量
        this.canvasFunctionInternal_ = canvasFunctionInternal_;
        this.features = [];
        this.name = name;
        if (!options.map) {
            throw new Error('options.map is not found.');
        }
        this.map = options.map;
        // this.TFEvents = options.TFEvents || [];
        this.id = options.id ? options.id : CommonUtil.createUniqueID("HeatMapSource_");
        this.opacity = options.opacity ? options.opacity : 1;
        this.colors = options.colors ? options.colors : ['blue', 'cyan', 'lime', 'yellow', 'red'];
        this.useGeoUnit = options.useGeoUnit ? options.useGeoUnit : false;
        this.radius = options.radius ? options.radius : 50;
        this.featureWeight = options.featureWeight ? options.featureWeight : null;
        this.maxWeight = null;
        this.minWeight = null;
        this.maxWidth = null;
        this.maxHeight = null;

        //创建热力图绘制面板
        this.rootCanvas = document.createElement("canvas");
        var mapSize = this.map.getSize();
        this.rootCanvas.width = this.maxWidth = parseInt(mapSize[0]);
        this.rootCanvas.height = this.maxHeight = parseInt(mapSize[1]);
        CommonUtil.modifyDOMElement(this.rootCanvas, null, null, null,
            null, null, null, this.opacity);
        this.canvasContext = this.rootCanvas.getContext('2d');
    }

    /**
     * @function HeatMap.prototype.addFeatures
     * @description 添加热点信息。
     * @param {(GeoJSONObject|Array.<ol.Feature>)} features - 待添加的要素数组。
     * @example
     * var geojson = {
     *      "type": "FeatureCollection",
     *      "features": [
     *          {
     *              "type": "feature",
     *              "geometry": {
     *                  "type": "Point",  //只支持point类型
     *                  "coordinates": [0, 0]
     *              },
     *              "properties": {
     *                  "height": Math.random()*9,
     *              }
     *          }
     *      ]
     *   };
     * var heatMapSource = new HeatMap("heatMap",{"map": map});
     * heatMapSource.addFeatures(geojson);
     * map.addLayer(new ol.layer.Image({
     *       source: heatMapSource
     *   }));
     */
    addFeatures(features) {
        this.features = this.toiClientFeature(features);
        //支持更新features，刷新底图
        this.changed();
    }

    /**
     * @function HeatMap.prototype.setOpacity
     * @description 设置图层的不透明度，取值 [0-1] 之间。
     * @param {number} opacity - 不透明度。
     */
    setOpacity(opacity) {
        if (opacity !== this.opacity) {
            this.opacity = opacity;
            var element = this.rootCanvas;
            CommonUtil.modifyDOMElement(element, null, null, null,
                null, null, null, opacity);

            if (this.map !== null) {
                // this.dispatchEvent({type: 'changelayer', value: {layer: this, property: "opacity"}});
                this.changed();
            }
        }
    }

    /**
     * @function HeatMap.prototype.updateHeatPoints
     * @description 刷新热点图显示。
     * @param {ol.LngLatBounds} resolution - 当前显示范围。
     * @private
     */
    updateHeatPoints(resolution) {
        if (this.features && this.features.length > 0) {
            this.convertFastToPixelPoints(resolution);
        } else {
            this.canvasContext.clearRect(0, 0, this.maxWidth, this.maxWidth);
        }
    }

    /**
     * @function HeatMap.prototype.convertFastToPixelPoints
     * @description 过滤位于当前显示范围内的热点，并转换其为当前分辨率下的像素坐标。
     * @param {number} resolution - 当前分辨率。
     * @private
     */
    convertFastToPixelPoints(resolution) {
        var data = [], x, y, k, maxTemp, minTemp, maxWeightTemp;

        //热点半径
        this.useRadius = this.useGeoUnit ? parseInt(this.radius / resolution) : this.radius;

        for (var i = 0; i < this.features.length; i++) {
            var feature = this.features[i];
            var point = feature.geometry;
            //过滤，只显示当前范围
            // if (mapBounds.contains(point.x, point.y)) {
            var pixelPoint = this.getLocalXY(new LonLat(point.x, point.y));
            if (this.featureWeight) {
                pixelPoint.weight = feature.attributes[this.featureWeight];//point.value;
                if (!this.maxWeight) {
                    //找出最大最小权重值
                    maxTemp = maxTemp ? maxTemp : pixelPoint.weight;
                    minTemp = minTemp ? minTemp : pixelPoint.weight;
                    maxTemp = Math.max(maxTemp, pixelPoint.weight);
                    minTemp = Math.min(minTemp, pixelPoint.weight);
                }
            } else {
                pixelPoint.weight = 1;
            }

            x = Math.floor(pixelPoint[0]);
            y = Math.floor(pixelPoint[1]);
            k = pixelPoint.weight;

            data.push([x, y, k]);
            // }
        }

        //无最大权重设置
        if (!this.maxWeight) {
            if (maxTemp && minTemp) {
                maxWeightTemp = (maxTemp + minTemp) / 2;
            } else {
                maxWeightTemp = 1;
            }
            this.draw(data, maxWeightTemp);
        } else {
            this.draw(data, this.maxWeight);
        }

    }

    /**
     * @function HeatMap.prototype.draw
     * @description 绘制热点图。
     * @param {Array} data - convertToPixelPoints 方法计算出的点。
     * @param {number} maxWeight -最大权重。
     * @private
     */
    draw(data, maxWeight) {
        if (this.maxHeight > 0 && this.maxWidth > 0) {
            //清空
            var ctx = this.canvasContext;
            this.canvasContext.clearRect(0, 0, this.maxWidth, this.maxHeight);
            this.drawCircle(this.useRadius);
            this.createGradient();

            for (var i = 0; i < data.length; i++) {
                var p = data[i];
                this.canvasContext.globalAlpha = Math.max(p[2] / maxWeight, 0.05);
                this.canvasContext.drawImage(this.circle, p[0] - this.useRadius, p[1] - this.useRadius);
            }

            var colored = ctx.getImageData(0, 0, this.maxWidth, this.maxHeight);
            this.colorize(colored.data, this.grad);
            ctx.putImageData(colored, 0, 0);
        } else {
            return false;
        }

    }

    /**
     * @function HeatMap.prototype.colorize
     * @description 根据渐变色重置热点图 rgb 值。
     * @param {Object} pixels - 像素 rgba 值。
     * @param {Array} gradient - 渐变 canvas.getImageData.data。
     * @private
     */
    colorize(pixels, gradient) {
        for (var i = 0, j; i < pixels.length; i += 4) {
            j = pixels[i + 3] * 4;
            if (j) {
                pixels[i] = gradient[j];
                pixels[i + 1] = gradient[j + 1];
                pixels[i + 2] = gradient[j + 2];
            }
        }
    }

    /**
     * @function HeatMap.drawCircle
     * @description 绘制热点半径圆。
     * @param {number} r - 热点半径。
     * @private
     */
    drawCircle(r) {
        var blur = r / 2;

        var circle = this.circle = document.createElement('canvas'),
            ctx = circle.getContext("2d");

        circle.height = 2 * r;
        circle.width = 2 * r;
        ctx.shadowOffsetX = ctx.shadowOffsetY = 2 * r;
        ctx.shadowBlur = blur;
        ctx.shadowColor = "#000000";

        ctx.beginPath();
        ctx.arc(-r, -r, r / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    /**
     * @function HeatMap.createGradient
     * @description 根据 this.canvasColors 设置渐变并 getImageData。
     * @private
     */
    createGradient() {
        var colors = this.colors;
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext("2d"),
            gradient = ctx.createLinearGradient(0, 0, 0, 256);
        canvas.height = 256;
        canvas.width = 1;

        var index = 1;
        for (var i = 0, len = colors.length; i < len; i++) {
            gradient.addColorStop(index / len, colors[i]);
            index++;
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 256);

        this.grad = ctx.getImageData(0, 0, 1, 256).data;
    }

    /**
     * @function HeatMap.prototype.getLocalXY
     * @description 获取坐标系统。
     * @param {Object} coordinate - 坐标位置。
     */
    getLocalXY(coordinate) {
        var pixelP, map = this.map;
        if (coordinate instanceof GeometryPoint || coordinate instanceof GeoText) {
            pixelP = map.getPixelFromCoordinate([coordinate.x, coordinate.y]);
        }
        if (coordinate instanceof LonLat) {
            pixelP = map.getPixelFromCoordinate([coordinate.lon, coordinate.lat]);
        }
        var rotation = -map.getView().getRotation();
        var center = map.getPixelFromCoordinate(map.getView().getCenter());
        var rotatedP = pixelP;
        if (this.pixelRatio) {
            rotatedP = this.scale(pixelP, center, this.pixelRatio);
        }
        if (pixelP && center) {
            rotatedP = this.rotate(rotatedP, rotation, center);
        }
        if (this.offset && rotatedP) {
            return [rotatedP[0] + this.offset[0], rotatedP[1] + this.offset[1]];
        }
        return rotatedP;
    }

    /**
     * @function HeatMap.prototype.rotate
     * @description 获取某像素坐标点 pixelP 绕中心 center 逆时针旋转 rotation 弧度后的像素点坐标。
     * @param {number} pixelP - 像素坐标点位置。
     * @param {number} rotation - 旋转角度。
     * @param {number} center - 中心位置。
     */
    rotate(pixelP, rotation, center) {
        var x = Math.cos(rotation) * (pixelP[0] - center[0]) - Math.sin(rotation) * (pixelP[1] - center[1]) + center[0];
        var y = Math.sin(rotation) * (pixelP[0] - center[0]) + Math.cos(rotation) * (pixelP[1] - center[1]) + center[1];
        return [x, y];
    }

    /**
     * @function HeatMap.prototype.scale
     * @description 获取某像素坐标点 pixelP 相对于中心 center 进行缩放 scaleRatio 倍后的像素点坐标。
     * @param {Object} pixelP - 像素点。
     * @param {Object} center - 中心点。
     * @param {number} scaleRatio - 缩放倍数。
     * @returns {Array.<number>} 返回数组形比例
     */
    scale(pixelP, center, scaleRatio) {
        var x = (pixelP[0] - center[0]) * scaleRatio + center[0];
        var y = (pixelP[1] - center[1]) * scaleRatio + center[1];
        return [x, y];
    }

    /**
     * @function HeatMap.prototype.removeFeatures
     * @description 移除指定的热点信息。
     * @param {Array.<FeatureVector>|FeatureVector} features - 热点信息数组。
     */
    removeFeatures(features) {
        if (!features || features.length === 0 || !this.features || this.features.length === 0) {
            return;
        }
        if (features === this.features) {
            return this.removeAllFeatures();
        }
        if (!(CommonUtil.isArray(features))) {
            features = [features];
        }
        var heatPoint, index, heatPointsFailedRemoved = [];
        for (var i = 0, len = features.length; i < len; i++) {
            heatPoint = features[i];
            index = CommonUtil.indexOf(this.features, heatPoint);
            //找不到视为删除失败
            if (index === -1) {
                heatPointsFailedRemoved.push(heatPoint);
                continue;
            }
            //删除热点
            this.features.splice(index, 1);
        }
        var succeed = heatPointsFailedRemoved.length == 0 ? true : false;
        //派发删除features成功的事件
        this.dispatchEvent({type: 'featuresremoved', value: {features: heatPointsFailedRemoved, succeed: succeed}});
        this.changed();
    }

    /**
     * @function HeatMap.prototype.removeAllFeatures
     * @description 移除全部的热点信息。
     */
    removeAllFeatures() {
        this.features = [];
        this.changed();
    }

    /**
     * @function HeatMap.prototype.toiClientFeature
     * @description 转为 iClient 要素。
     * @param {GeoJSONObject|Array.<ol.Feature>} features - 待添加的要素数组。
     * @returns {FeatureVector} 转换后的 iClient 要素
     */
    toiClientFeature(features) {
        if (!Util.isArray(features)) {
            features = [features];
        }
        let featuresTemp = [], geometry, attributes;
        for (let i = 0, len = features.length; i < len; i++) {
            if (features[i] instanceof Feature) {
                //热点图支支持传入点对象要素
                if (features[i].getGeometry() instanceof Point) {
                    geometry = new GeometryPoint(features[i].getGeometry().getCoordinates()[0], features[i].getGeometry().getCoordinates()[1]);
                    //固定属性字段为 "Properties"
                    attributes = features[i].getProperties()["Properties"] ? features[i].getProperties()["Properties"] : {};
                    featuresTemp.push(new FeatureVector(geometry, attributes));
                }
            } else if (["FeatureCollection", "Feature", "Geometry"].indexOf(features[i].type) != -1) {
                let format = new GeoJSONFormat();
                featuresTemp = featuresTemp.concat(format.read(features[i]));
            } else if (features[i].geometry && features[i].geometry.parts) {
                //iServer服务器返回数据格式
                featuresTemp.push(ServerFeature.fromJson(features[i]).toFeature());
            } else {
                throw new Error(`Features[${i}]'s type does not match, please check.`);
            }
        }
        return featuresTemp;
    }

}
