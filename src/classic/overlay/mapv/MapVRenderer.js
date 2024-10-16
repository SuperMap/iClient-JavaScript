/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import {baiduMapLayer, DataSet} from 'mapv';
import { getMeterPerMapUnit } from '@supermap/iclient-common/util/MapCalculateUtil';

/**
 * @class MapVRenderer
 * @classdesc MapV渲染器。
 * @private
 * @extends {mapv.baiduMapLayer}
 * @param {SuperMap.Map} map - 待渲染的地图。
 * @param {SuperMap.Layer.MapVLayer} layer - 待渲染的图层。
 * @param {Mapv.DataSet} dataSet - 待渲染的数据集，数据所属坐标系要求与 map 保持一致。
 * @param {Object} options - 渲染的参数。
 */
var MapVBaseLayer = baiduMapLayer ? baiduMapLayer.__proto__ : Function;

export class MapVRenderer extends MapVBaseLayer {
    constructor(map, layer, dataSet, options) {
        super(map, dataSet, options);
        if (!MapVBaseLayer) {
            return this;
        }

        var self = this;
        options = options || {};

        self.init(options);
        self.argCheck(options);
        this.canvasLayer = layer;
        this.clickEvent = this.clickEvent.bind(this);
        this.mousemoveEvent = this.mousemoveEvent.bind(this);
        this.bindEvent();
    }

    /**
     * @function MapvRenderer.prototype.clickEvent
     * @description 点击事件。
     * @param {Object} e -  触发对象。
     */
    clickEvent(e) {
        var pixel = e.xy;
        var devicePixelRatio = this.devicePixelRatio || 1;
        super.clickEvent({ x: pixel.x / devicePixelRatio, y: pixel.y / devicePixelRatio }, e);
    }

    /**
     * @function MapvRenderer.prototype.mousemoveEvent
     * @description 鼠标移动事件。
     * @param {Object} e - 触发对象。
     */
    mousemoveEvent(e) {
        var pixel = e.xy;
        super.mousemoveEvent(pixel, e);
    }

    /**
     * @function MapvRenderer.prototype.bindEvent
     * @description 绑定鼠标移动和鼠标点击事件。
     */
    bindEvent() {
        var map = this.map;

        if (this.options.methods) {
            if (this.options.methods.click) {
                map.events.on({ click: this.clickEvent });
            }
            if (this.options.methods.mousemove) {
                map.events.on({ mousemove: this.mousemoveEvent });
            }
        }
    }

    /**
     * @function MapvRenderer.prototype.unbindEvent
     * @description 解绑鼠标移动和鼠标滑动触发的事件。
     */
    unbindEvent() {
        var map = this.map;

        if (this.options.methods) {
            if (this.options.methods.click) {
                map.events.un({ click: this.clickEvent });
            }
            if (this.options.methods.mousemove) {
                map.events.un({ mousemove: this.mousemoveEvent });
            }
        }
    }

    /**
     * @function MapvRenderer.prototype.getContext
     * @description 获取信息。
     */
    getContext() {
        return this.canvasLayer && this.canvasLayer.canvasContext;
    }

    /**
     * @function MapvRenderer.prototype.addData
     * @description 追加数据
     * @param {Object} data - 待添加的数据。
     * @param {Object} options - 待添加的数据信息。
     */
    addData(data, options) {
        var _data = data;
        if (data && data.get) {
            _data = data.get();
        }
        this.dataSet.add(_data);
        this.update({ options: options });
    }

    /**
     * @function MapvRenderer.prototype.updateData
     * @description 更新覆盖原数据。
     * @param {Object} data - 待更新的数据。
     * @param {Object} options - 待更新的数据信息。
     */
    setData(data, options) {
        var _data = data;
        if (data && data.get) {
            _data = data.get();
        }
        this.dataSet = this.dataSet || new DataSet();
        this.dataSet.set(_data);
        this.update({ options: options });
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
     * @param {function} filter - 过滤条件。条件参数为数据项，返回值为 true，表示删除该元素；否则表示不删除。
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
        this.update({ options: null });
    }

    /**
     * @function MapvRenderer.prototype.clearData
     * @description 清除数据。
     */
    clearData() {
        this.dataSet && this.dataSet.clear();
        this.update({ options: null });
    }

    /**
     * @function MapvRenderer.prototype.render
     * @description 着色。
     * @param {number} time
     */
    render(time) {
        this._canvasUpdate(time);
    }

    /**
     * @function MapvRenderer.prototype.transferToMercator
     * @description 墨卡托坐标为经纬度。
     * @deprecated
     */
    transferToMercator() {
        if (this.options.coordType && ['bd09mc', 'coordinates_mercator'].indexOf(this.options.coordType) > -1) {
            var data = this.dataSet.get();
            data = this.dataSet.transferCoordinate(
                data,
                function (coordinates) {
                    var pixel = SuperMap.Projection.transform(
                        {
                            x: coordinates[0],
                            y: coordinates[1]
                        },
                        'EPSG:3857',
                        'EPSG:4326'
                    );
                    return [pixel.x, pixel.y];
                },
                'coordinates',
                'coordinates'
            );
            this.dataSet._set(data);
        }
    }

    _canvasUpdate(time) {
        if (!this.canvasLayer) {
            return;
        }

        var self = this;

        var animationOptions = self.options.animation;

        var context = this.getContext();
        var map = this.map;
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

        if (
            (self.options.minZoom && map.getZoom() < self.options.minZoom) ||
            (self.options.maxZoom && map.getZoom() > self.options.maxZoom)
        ) {
            return;
        }
        var layer = self.canvasLayer;

        var dataGetOptions = {
            fromColumn: 'coordinates',
            transferCoordinate: function (coordinate) {
                var coord = { lon: coordinate[0], lat: coordinate[1] };
                var worldPoint = map.getViewPortPxFromLonLat(coord);
                return [worldPoint.x, worldPoint.y];
            }
        };

        if (time !== undefined) {
            dataGetOptions.filter = function (item) {
                var trails = animationOptions.trails || 10;
                return time && item.time > time - trails && item.time < time;
            };
        }

        var data = self.dataSet.get(dataGetOptions);

        this.processData(data);
        // 一个像素是多少米
        var zoomUnit = map.getResolution() * getMeterPerMapUnit('DEGREE');
        // // 兼容unit为'm'的情况
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

        var worldPoint = map.getViewPortPxFromLonLat(layer.transferToMapLatLng({ lon: 0, lat: 0 }));

        this.drawContext(context, data, self.options, worldPoint);

        self.options.updateCallback && self.options.updateCallback(time);
    }

    init(options) {
        var self = this;

        self.options = options;

        this.initDataRange(options);

        this.context = self.options.context || '2d';

        if (self.options.zIndex) {
            this.canvasLayer && this.canvasLayer.setZIndex(self.options.zIndex);
        }

        this.initAnimator();
    }

    /**
     * @function MapvRenderer.prototype.addAnimatorEvent
     * @description 添加动画事件。
     */
    addAnimatorEvent() {
        this.map.events.on({ movestart: this.animatorMovestartEvent.bind(this) });
        this.map.events.on({ moveend: this.animatorMoveendEvent.bind(this) });
    }

    /**
     * @function MapvRenderer.prototype.clear
     * @description 清除环境。
     * @param {Object} context - 当前环境。
     */
    clear(context) {
        context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    /**
     * @function MapvRenderer.prototype.show
     * @description 展示渲染效果。
     */
    show() {
        this.map.addLayer(this.canvasLayer);
    }

    /**
     * @function MapvRenderer.prototype.hide
     * @description 隐藏渲染效果。
     */
    hide() {
        this.map.removeLayer(this.canvasLayer);
    }

    /**
     * @function MapvRenderer.prototype.draw
     * @description 渲染绘制。
     */
    draw() {
        this.canvasLayer.redraw();
    }
}