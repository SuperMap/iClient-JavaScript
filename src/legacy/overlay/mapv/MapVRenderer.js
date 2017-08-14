import SuperMap from '../../SuperMap';
import {baiduMapLayer} from 'mapv';

/**
 * @class SuperMap.MapVRenderer
 * @classdesc 地图渲染类
 * @extends mapv.MapVBaseLayer
 * @param map - {SuperMap.Map} 待渲染的地图
 * @param layer - {mapv.baiduMapLayer} 待渲染的图层
 * @param dataSet - {mapv.DataSet} 待渲染的数据集
 * @param options - {Object} 渲染的参数
 */
var MapVBaseLayer = baiduMapLayer ? baiduMapLayer.__proto__ : Function;

export default class MapVRenderer extends MapVBaseLayer {
    constructor(map, layer, dataSet, options) {
        if (!MapVBaseLayer) {
            return;
        }
        super(map, dataSet, options);

        var self = this;
        options = options || {};

        self.init(options);
        self.argCheck(options);
        this.canvasLayer = layer;
        self.transferToMercator();
        this.clickEvent = this.clickEvent.bind(this);
        this.mousemoveEvent = this.mousemoveEvent.bind(this);
        this.bindEvent();
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.clickEvent
     * @description 点击事件
     * @param e - {object} 触发对象
     */
    clickEvent(e) {
        var pixel = e.layerPoint;
        super.clickEvent(pixel, e);
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.mousemoveEvent
     * @description 鼠标移动事件
     * @param  e - {object} 触发对象
     */
    mousemoveEvent(e) {
        var pixel = e.layerPoint;
        super.mousemoveEvent(pixel, e);
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.bindEvent
     * @description 绑定鼠标移动和鼠标点击事件
     * @param e - {object} 触发对象
     */
    bindEvent(e) {
        var map = this.map;

        if (this.options.methods) {
            if (this.options.methods.click) {
                map.events.on({'click': this.clickEvent});
            }
            if (this.options.methods.mousemove) {
                map.events.on({'mousemove': this.mousemoveEvent});
            }
        }
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.unbindEvent
     * @description 解绑鼠标移动和鼠标滑动触发的事件
     * @param e - {object} 触发对象
     */
    unbindEvent(e) {
        var map = this.map;

        if (this.options.methods) {
            if (this.options.methods.click) {
                map.events.un({'click': this.clickEvent});
            }
            if (this.options.methods.mousemove) {
                map.events.un({'mousemove': this.mousemoveEvent});
            }
        }
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.getContext
     * @description 获取信息
     */
    getContext() {
        return this.canvasLayer && this.canvasLayer.canvasContext;
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.addData
     * @description 追加数据
     * @param data - {oject} 待添加的数据
     * @param options - {oject} 待添加的数据信息
     */
    addData(data, options) {
        var _data = data;
        if (data && data.get) {
            _data = data.get();
        }
        this.dataSet.add(_data);
        this.update({options: options});
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.updateData
     * @description 更新覆盖原数据
     * @param data - {oject} 待更新的数据
     * @param options - {oject} 待更新的数据信息
     */
    setData(data, options) {
        var _data = data;
        if (data && data.get) {
            _data = data.get();
        }
        this.dataSet = this.dataSet || new mapv.DataSet();
        this.dataSet.set(_data);
        this.update({options: options});
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.getData
     * @description 获取数据
     */
    getData() {
        return this.dataSet;
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.removeData
     * @description 删除数据
     * @param filter - {String} 删除条件\过滤信息
     */
    removeData(filter) {
        if (!this.dataSet) {
            return;
        }
        var newData = this.dataSet.get(filter);
        this.dataSet.set(newData);
        this.update({options: null});
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.clearData
     * @description 清除数据
     */
    clearData() {
        this.dataSet && this.dataSet.clear();
        this.update({options: null});
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.render
     * @description 着色
     * @param time - {number}
     */
    render(time) {
        this._canvasUpdate(time);
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.transferToMercator
     * @description 墨卡托坐标为经纬度
     */
    transferToMercator() {
        if (this.options.coordType && ["bd09mc", "coordinates_mercator"].indexOf(this.options.coordType) > -1) {
            var data = this.dataSet.get();
            data = this.dataSet.transferCoordinate(data, function (coordinates) {
                var pixel = SuperMap.Projection.transform({
                    x: coordinates[0],
                    y: coordinates[1]
                }, "EPSG:3857", "EPSG:4326");
                return [pixel.x, pixel.y];
            }, 'coordinates', 'coordinates');
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

        if (self.options.minZoom && map.getZoom() < self.options.minZoom || self.options.maxZoom && map.getZoom() > self.options.maxZoom) {
            return;
        }
        var layer = self.canvasLayer;
        var dataGetOptions = {
            fromColumn: 'coordinates',
            transferCoordinate: function (coordinate) {
                var coord = layer.transferToMapLatLng({lon: coordinate[0], lat: coordinate[1]});
                var worldPoint = map.getViewPortPxFromLonLat(coord);
                return [worldPoint.x, worldPoint.y];
            }
        };

        if (time !== undefined) {
            dataGetOptions.filter = function (item) {
                var trails = animationOptions.trails || 10;
                return (time && item.time > (time - trails) && item.time < time);
            }
        }

        var data = self.dataSet.get(dataGetOptions);

        this.processData(data);

        self.options._size = self.options.size;

        var worldPoint = map.getViewPortPxFromLonLat(layer.transferToMapLatLng({lon: 0, lat: 0}));

        var zoomUnit = Math.pow(2, 14 - map.getZoom());
        if (self.options.unit == 'm') {
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

        this.drawContext(context, new mapv.DataSet(data), self.options, worldPoint);

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
     * @function SuperMap.MapVRenderer.prototype.addAnimatorEvent
     * @description 添加动画事件
     */
    addAnimatorEvent() {
        this.map.events.on({'movestart': this.animatorMovestartEvent.bind(this)});
        this.map.events.on({'moveend': this.animatorMoveendEvent.bind(this)});
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.clear
     * @description 清除环境
     * @param context - {object} 当前环境
     */
    clear(context) {
        context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.show
     * @description 展示渲染效果
     */
    show() {
        this.map.addLayer(this.canvasLayer);
    }

    /**
     * @function SuperMap.MapVRenderer.prototype.hide
     * @description 隐藏渲染效果
     */
    hide() {
        this.map.removeLayer(this.canvasLayer);
    }


    /**
     * @function SuperMap.MapVRenderer.prototype.draw
     * @description 渲染绘制
     */
    draw() {
        this.canvasLayer.redraw();
    }
}