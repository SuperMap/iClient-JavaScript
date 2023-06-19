/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {
    baiduMapLayer
} from 'mapv';

var BaseLayer = baiduMapLayer ? baiduMapLayer.__proto__ : Function;

/**
 * @private
 * @class MapvRenderer
 * @classdesc MapV图层渲染。
 * @param {Object} map - 地图。
 * @param {Object} layer - 图层。
 * @param {Mapv.DataSet} dataSet - 数据集。
 * @param {Object} options - 参数。
 * @param {Object} [functions] - 图层传递给渲染器调用的方法。
 * @param {Object} [mapOptions] - 图层传递给渲染器的地图元素信息。
 * @extends {MapV.BaseLayer}
 *
 */
export class MapvRenderer extends BaseLayer {
    constructor(map, dataSet, options, functions, mapOptions) {
        super(map, dataSet, options);
        if (!BaseLayer) {
            return;
        }
        this.options = options || {};
        this.transferCoordinate = functions.transferCoordinate;
        this.getCenterPixel = functions.getCenterPixel;
        this.getResolution = functions.getResolution;
        this.validZoom = functions.validZoom;
        let { mapElement, targetElement, id } = mapOptions;
        this.targetElement = targetElement;
        this.canvas = this._createCanvas(id, mapElement);
        this.canvasLayer = {
          canvas: this.canvas
        }
        this.init(options);
        this.argCheck(options);
        this.stopAniamation = false;
        this.animation = options.animation;
        this.clickEvent = this.clickEvent.bind(this);
        this.mousemoveEvent = this.mousemoveEvent.bind(this);
        this._canvasUpdate();
        this.targetElement.appendChild(this.canvas);
        this._expectShow = true;
        this.isShow = true;
    }

    /**
     * @function MapvRenderer.prototype.clickEvent
     * @description  点击绑定事件。
     * @param {Object} e - 事件。
     */
    clickEvent(e) {
        var pixel = e.point;
        super.clickEvent(pixel, e);
    }

    /**
     * @function MapvRenderer.prototype.mousemoveEvent
     * @description  鼠标移动事件。
     * @param {Object} e - 事件。
     */
    mousemoveEvent(e) {
        var pixel = e.point;
        super.mousemoveEvent(pixel, e);
    }

    /**
     * @function MapvRenderer.prototype.getContext
     * @description 获取信息。
     */
    getContext() {
        return this.canvas.getContext(this.context);
    }

    /**
     * @function MapvRenderer.prototype.addData
     * @description 添加数据。
     * @param {Object} data - 待添加的数据。
     * @param {Object} options - 待添加的数据信息。
     */
    addData(data, options) {
        var _data = data;
        if (data && data.get) {
            _data = data.get();
        }
        this.dataSet.add(_data);
        this.update({
            options: options
        });
    }

    /**
     * @function MapvRenderer.prototype.update
     * @description 更新图层。
     * @param {Object} opt - 待更新的数据。
     * @param {Object} opt.data - mapv 数据集。
     * @param {Object} opt.options - mapv 绘制参数。
     */
    update(opt) {
        var update = opt || {};
        var _data = update.data;
        if (_data && _data.get) {
            _data = _data.get();
        }
        if (_data != undefined) {
            this.dataSet.set(_data);
        }
        super.update({
            options: update.options
        });
    }

    /**
     * @function MapvRenderer.prototype.getData
     * @description 获取数据。
     */
    getData() {
        return this.dataSet;
    }

    /**
     * @function MapvRenderer.prototype.removeData
     * @description 删除符合过滤条件的数据。
     * @param {function} [filter] - 过滤条件。条件参数为数据项，返回值为true,表示删除该元素；否则表示不删除。
     */
    removeData(filter) {
        if (!this.dataSet) {
            return;
        }
        var newData = this.dataSet.get({
            filter: function (data) {
                return filter != null && typeof filter === 'function' ? !filter(data) : true;
            }
        });
        this.dataSet.set(newData);
        this.update({
            options: null
        });
    }

    /**
     * @function MapVRenderer.prototype.clearData
     * @description 清除数据。
     */
    clearData() {
        this.dataSet && this.dataSet.clear();
        this.update({
            options: null
        });
    }

    /**
     * @function MapVRenderer.prototype.updateData
     * @param {Object} dataSet - 数据集。
     * @param {Object} options - 数据项配置。
     * @description  更新数据。
     */
    updateData(dataSet, options) {
        if (dataSet && dataSet.get) {
            this.dataSet.set(dataSet.get());
        }
        this.update({
            options: options
        });
    }

    _createCanvas(id, mapElement) {
      const { width, height } = mapElement.style;
      var canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = '0px';
      canvas.style.left = '0px';
      canvas.id = id;
      var global$2 = typeof window === 'undefined' ? {} : window;
      var devicePixelRatio = this.devicePixelRatio = global$2.devicePixelRatio || 1;
      canvas.width = parseInt(width) * devicePixelRatio;
      canvas.height = parseInt(height) * devicePixelRatio;
      if (!this.options.context || this.options.context == '2d') {
        canvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
      }
      canvas.style.width = width;
      canvas.style.height = height;
      return canvas;
    }

    _canvasUpdate(time) {
      if (this.stopAniamation) {
          return;
      }
      var self = this;

      var animationOptions = self.options.animation;

      var context = this.getContext();

      if (self.isEnabledTime()) {
          if (time === undefined) {
              this.clear(context);
              return;
          }
          if (this.context === '2d') {
              context.save();
              context.globalCompositeOperation = 'destination-out';
              context.fillStyle = 'rgba(0, 0, 0, .1)';
              context.fillRect(0, 0, context.canvas.width, context.canvas.height);
              context.restore();
          }
      } else {
          this.clear(context);
      }

      if (this.context === '2d') {
          for (var key in self.options) {
              context[key] = self.options[key];
          }
      } else {
          context.clear(context.COLOR_BUFFER_BIT);
      }

      if (!this.validZoom()) {
        return;
      }
      
      var dataGetOptions = {
        transferCoordinate: this.transferCoordinate()
      };
      var zoomUnit = this.getResolution();
      if (time !== undefined) {
          dataGetOptions.filter = function (item) {
              var trails = animationOptions.trails || 10;
              return time && item.time > time - trails && item.time < time;
          };
      }

      var data = self.dataSet.get(dataGetOptions);

      this.processData(data);

      // 兼容unit为'm'的情况
      if (self.options.unit === 'm') {
          if (self.options.size) {
              self.options._size = self.options.size / zoomUnit;
          }
          if (self.options.width) {
              self.options._width = self.options.width / zoomUnit;
          }
          if (self.options.height) {
              self.options._height = self.options.height / zoomUnit;
          }
      } else {
          self.options._size = self.options.size;
          self.options._height = self.options.height;
          self.options._width = self.options.width;
      }

      var worldPoint = this.getCenterPixel();
      this.drawContext(context, data, self.options, worldPoint);

      self.options.updateCallback && self.options.updateCallback(time);
    }

    init(options) {
        var self = this;

        self.options = options;

        this.initDataRange(options);

        this.context = self.options.context || '2d';
        if (self.options.zIndex) {
            this.setZIndex(self.options.zIndex);
        }
        this.initAnimator();
    }
   
    /**
     * @function MapVRenderer.prototype.destroy
     * @description 释放资源。
     */
    destroy() {
        this.targetElement.removeChild(this.canvas);
        this.clearData();
        this.animator && this.animator.stop();
        this.animator = null;
    }


    /**
     * @function MapvRenderer.prototype.addAnimatorEvent
     * @description 添加动画事件。
     */
    addAnimatorEvent() {}

    moveEndEvent() {
        this.stopAniamation = false;
        this._canvasUpdate();
    }

    /**
     * @function MapvRenderer.prototype.draw
     * @description 渲染绘制。
     */
    draw() {
        this._canvasUpdate();
    }

    visible() {
      return this.isShow;
    }

    hide() {
      this.isShow = false;
      this.canvas.style.display = 'none';
    }

    show() {
      this.isShow = true;
      this.canvas.style.display = 'block';
    }

    setZIndex(z) {
      this.canvas.style.zIndex = z;
    }

    /**
     * @function MapvRenderer.prototype.clear
     * @param {Object} context - 当前环境。
     * @description 清除环境。
     */
    clear(context) {
      context &&
          context.clearRect &&
          context.clearRect(
              0,
              0,
              parseInt(this.map.getCanvas().style.width),
              parseInt(this.map.getCanvas().style.height)
          );
    }
}
