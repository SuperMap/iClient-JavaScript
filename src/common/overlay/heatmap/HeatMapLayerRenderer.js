import { Util as CommonUtil } from '../../commontypes/Util';
import { Point } from '../../commontypes/geometry/Point';
import { GeoText } from '../../commontypes/geometry/GeoText';
import { ServerFeature } from '../../iServer/ServerFeature';
import { Vector as FeatureVector } from '../../commontypes/Vector';
import { LonLat } from '../../commontypes/LonLat';
import { GeoJSON as GeoJSONFormat } from '../../format/GeoJSON';

export class HeatMapLayerRenderer {
  constructor(options) {
    this.options = options;
    /**
         * @member {Object} HeatMapLayer.prototype.rootCanvas
         * @description 热点图主绘制面板。
         */
    this.rootCanvas = null;

    /**
        * @member {Array.<FeatureVector>} HeatMapLayer.prototype.features
        * @description 热点信息数组，记录存储图层上添加的所有热点信息。
        */
    this.features = [];
    /**
      * @member {boolean} [HeatMapLayer.prototype.visibility=true]
      * @description 图层显示状态属性。
      */
    this.visibility = true;
    /**
     * @member {number} [HeatMapLayer.prototype.opacity=1]
     * @description 图层不透明度，取值范围[0,1]。
     */
    this.opacity = options.opacity ? options.opacity : 1;

    /**
      * @member {Array.<string>} [HeatMapLayer.prototype.colors=['blue','cyan','lime','yellow','red']]
      * @description 颜色线性渐变数组。
      */
    this.colors = options.colors ? options.colors : ['blue', 'cyan', 'lime', 'yellow', 'red'];

    /**
     * @member {boolean} [HeatMapLayer.prototype.useGeoUnit=false]
     * @description 使用地理单位，即默认热点半径默认使用像素单位。当设置为 true 时，热点半径和图层地理坐标保持一致。
     */
    this.useGeoUnit = options.useGeoUnit ? options.useGeoUnit : false;

    /**
     * @member {number} [HeatMapLayer.prototype.radius=50]
     * @description 热点渲染的最大半径（热点像素半径）,
     *              热点显示的时候以精确点为中心点开始往四周辐射衰减，
     *              其衰减半径和权重值成比列。
     */
    this.radius = options.radius ? options.radius : 50;

    /**
     * @member {string} HeatMapLayer.prototype.featureWeight
     * @description 对应 feature 属性中的热点权重字段名称，权重值类型为 number。
     * @example
     * //feature.attributes中表示权重的字段为 height,则在 HeatMapLayer 的 featureWeight 参数赋值为 "height"。
     * feature1.attributes.height = 7.0;
     * feature2.attributes.height = 6.0;
     * var heatMapLayer = new HeatMapLayer("heatmaplayer",{"featureWeight":"height"});
     * heatMapLayer.addFeatures([feature1,feature2]);
     */
    this.featureWeight = options.featureWeight ? options.featureWeight : null;

    /**
     * @member {number} HeatMapLayer.prototype.maxWeight
     * @description 设置权重最大值。默认将按照当前屏幕范围内热点所拥有的权重最大值绘制热点图。
     */
    this.maxWeight = null;

    /**
     * @member {number} HeatMapLayer.prototype.minWeight
     * @description 设置权重最小值。默认将按照当前屏幕范围内热点所拥有的权重最小值绘制热点图。
     */
    this.minWeight = null;

    /**
       * @member {Object} HeatMapLayer.prototype.canvasContext
       * @description 热点图主绘制对象。
       */
    this.canvasContext = null;

    /**
     * @member {number} HeatMapLayer.prototype.maxWidth
     * @description 当前绘制面板宽度。默认和当前 map 窗口宽度一致。
     */
    this.maxWidth = null;

    /**
     * @member {number} HeatMapLayer.prototype.maxHeight
     * @description 当前绘制面板宽度。默认和当前 map 窗口高度一致。
     */
    this.maxHeight = null;

    this.extent = {};
    this.mapCanvas = options.mapCanvas;
    this._createCanvasContainer(options.mapContainer, options.size);
  }

  /**
   * @function HeatMapLayerRenderer.prototype.addFeatures
   * @description 添加热点信息。
   * @param {GeoJSONObject} features - 待添加的要素数组。
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
   *                  "geoRadius": useGeoRadius?radius:null
   *              }
   *          }
   *      ]
   *   };
   * var HeatMapLayerRenderer = new HeatMapLayerRenderer("HeatMapLayerRenderer",{"featureWeight":"height"});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   pLayer = new HeatMapLayerRenderer("HeatMapLayerRenderer",{"featureWeight":"height"});
   * HeatMapLayerRenderer.addFeatures(geojson);
   * map.addLayer(HeatMapLayerRenderer);
   */
  addFeatures(features) {
    this.features = this.toiClientFeature(features);
    //支持更新features，刷新底图
    this.refresh();
  }

  /**
   * @function HeatMapLayerRenderer.prototype.refresh
   * @description 强制刷新当前热点显示，在图层热点数组发生变化后调用，更新显示。
   */
  refresh() {
    if (this.features.length === 0) {
      return;
    }
    this.updateHeatPoints(this.extent);
  }

  /**
   * @function HeatMapLayerRenderer.prototype.setOpacity
   * @description 设置图层的不透明度，取值[0-1]之间。
   * @param {number} [opacity] - 不透明度。
   */
  setOpacity(opacity) {
    if (opacity !== this.opacity) {
      this.opacity = opacity;
      CommonUtil.modifyDOMElement(this.rootCanvas, null, null, null,
        null, null, null, opacity);
    }
  }

  /**
   * @function HeatMapLayerRenderer.prototype.updateHeatPoints
   * @description 刷新热点图显示。
   * @param {mapboxgl.LngLatBounds} bounds - 当前显示范围。
   */
  updateHeatPoints(bounds) {
    if (this.features && this.features.length > 0) {
      this.convertFastToPixelPoints(bounds);
    } else {
      this.canvasContext.clearRect(0, 0, this.maxWidth, this.maxWidth);
    }
  }

  /**
   * @function HeatMapLayerRenderer.prototype.convertFastToPixelPoints
   * @description 过滤位于当前显示范围内的热点，并转换其为当前分辨率下的像素坐标。
   * @param {mapboxgl.LngLatBounds} bounds - 当前显示范围。
   * @private
   */
  convertFastToPixelPoints(bounds) {
    var data = [], x, y, k, resolution, maxTemp, minTemp, maxWeightTemp;
    //获取当前像素下的地理范围
    var dw = bounds.getEast() - bounds.getWest();
    var dh = bounds.getNorth() - bounds.getSouth();
    var mapCanvas = this.mapCanvas;

    if (dw / mapCanvas.width > dh / mapCanvas.height) {
      resolution = dw / mapCanvas.width;
    } else {
      resolution = dh / mapCanvas.height;
    }

    //热点半径
    this.useRadius = this.useGeoUnit ? parseInt(this.radius / resolution) : this.radius;

    for (var i = 0; i < this.features.length; i++) {
      var feature = this.features[i];
      var point = feature.geometry;

      //可通过bounds过滤需绘制的features以优化性能，但mapboxgl旋转获取得bounds不适

      var pixelPoint = this.getPixelXY(new LonLat(point.x, point.y));
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

      x = Math.floor(pixelPoint.x);
      y = Math.floor(pixelPoint.y);
      k = pixelPoint.weight;

      data.push([x, y, k]);
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
   * @function HeatMapLayerRenderer.prototype.draw
   * @description 绘制热点图。
   * @param {Array} data - convertToPixelPoints方法计算出的点。
   * @private
   */
  draw(data, maxWeight) {
    if (this.maxHeight > 0 && this.maxWidth > 0) {
      //清空
      var ctx = this.canvasContext;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
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
   * @function HeatMapLayerRenderer.prototype.colorize
   * @description 根据渐变色重置热点图rgb值。
   * @param {Array} pixels - 像素 RGBA 值。
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
   * @function HeatMapLayerRenderer.drawCircle
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
   * @function HeatMapLayerRenderer.createGradient
   * @description 根据 options.colors 设置渐变。
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
   * @function HeatMapLayerRenderer.prototype.getPixelXY
   * @description 转换地理坐标为相对于当前窗口左上角的像素坐标。
   * @param {number} x - 热点的像素 x 坐标。
   * @param {number} y - 热点的像素 y 坐标。
   */
  getPixelXY(coordinate) {
    let pixelP;
    if (coordinate instanceof Point || coordinate instanceof GeoText) {
      let tempPoint = this.options.convertLatlonToPixel({ lon: coordinate.x, lat: coordinate.y });
      pixelP = { x: parseInt(tempPoint.x), y: parseInt(tempPoint.y) };
    }
    if (coordinate instanceof LonLat) {
      let tempPoint = this.options.convertLatlonToPixel(coordinate);
      pixelP = { x: parseInt(tempPoint.x), y: parseInt(tempPoint.y) };
    }
    return pixelP;
  }

  /**
    * @function HeatMapLayerRenderer.prototype._createCanvasContainer
    * @description 创建热力图绘制容器。
    * @private
    */
  _createCanvasContainer(mapContainer) {
    //热点图要求使用canvas绘制，判断是否支持
    this.rootCanvas = document.createElement("canvas");
    this.rootCanvas.width = this.maxWidth = parseInt(this.mapCanvas.style.width);
    this.rootCanvas.height = this.maxHeight = parseInt(this.mapCanvas.style.height);
    this.canvasContext = this.rootCanvas.getContext('2d');
    const devicePixelRatio = window.devicePixelRatio || 1;
    devicePixelRatio !== 1 && this.canvasContext && this.canvasContext.scale(devicePixelRatio, devicePixelRatio);

    CommonUtil.modifyDOMElement(this.rootCanvas, null, { x: 0, y: 0 }, { w: this.maxWidth, h: this.maxHeight },
      "absolute", null, null, this.opacity);
    mapContainer.appendChild(this.rootCanvas);
  }

  /**
  * @function HeatMapLayerRenderer.prototype.toiClientFeature
  * @description 转为 iClient 要素。
  * @param {GeoJSONObject} features - 待添加的要素数组。
  */
  // 提到 common
  toiClientFeature(features) {
    if (!CommonUtil.isArray(features)) {
      features = [features];
    }
    let featuresTemp = [];
    for (let i = 0; i < features.length; i++) {
      if (features[i] instanceof FeatureVector) {
        // 若是 FeatureVector 直接返回
        featuresTemp.push(features[i]);
      } else if (["FeatureCollection", "Feature", "Geometry"].indexOf(features[i].type) != -1) {
        //GeoJSON 规范数据类型
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

  /**
   * @function HeatMapLayerRenderer.prototype.removeFeatures
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
    /**
     * @event HeatMapLayerRenderer#featuresremoved
     * @description 要素删除之后触发。
     * @property {Array.<FeatureVector>} features - 需要被删除的要素。
     * @property {boolean} succeed - 要素删除成功与否。
     */
    this.refresh();
    return { succeed, heatPointsFailedRemoved }
  }

  /**
   * @function HeatMapLayerRenderer.prototype.removeAllFeatures
   * @description 移除全部的热点信息。
   */
  removeAllFeatures() {
    this.features = [];
    this.refresh();
  }

   /**
     * @function HeatMapLayer.prototype.removeFromMap
     * @description 删除该图层。
     */
   removeFromMap() {
    this.removeAllFeatures();
    this.options.mapContainer.removeChild(this.rootCanvas);
  }

  /**
   * @function HeatMapLayerRenderer.prototype.setVisibility
   * @description 设置图层可见性。
   * @param {boolean} [visibility] - 是否显示图层（当前地图的 resolution 在最大最小 resolution 之间）。
   */
  setVisibility(visibility) {
    if (this.rootCanvas && visibility !== this.visibility) {
      this.visibility = visibility;
      this.rootCanvas.style.display = visibility ? "block" : "none";
    }
  }

  setExtent(extent) {
    this.extent = extent;
  }

  _hide() {
    this.rootCanvas.style.display = 'none';
  }

  _show() {
    this.rootCanvas.style.display = 'block';
  }
}