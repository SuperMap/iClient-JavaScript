import L from 'leaflet';
import {baiduMapLayer, DataSet} from "mapv";

var BaseLayer = baiduMapLayer ? baiduMapLayer.__proto__ : Function;

/**
 * @class L.supermap.MapVRenderer
 * @classdesc 地图渲染类
 * @category Visualization MapV
 * @private
 * @extends mapv.BaseLayer
 * @param map - {L.map} 待渲染的地图
 * @param layer - {L.Layer} 待渲染的图层
 * @param dataSet - {DataSet} 待渲染的数据集
 * @param options - {Object} 渲染的参数
 */
export class MapVRenderer extends BaseLayer {

    constructor(map, layer, dataSet, options) {
        super(map, dataSet, options);
        if (!BaseLayer) {
            return;
        }


        var self = this;
        options = options || {};

        self.init(options);
        self.argCheck(options);
        this.canvasLayer = layer;
        this.clickEvent = this.clickEvent.bind(this);
        this.mousemoveEvent = this.mousemoveEvent.bind(this);
        this._moveStartEvent = this.moveStartEvent.bind(this);
        this._moveEndEvent = this.moveEndEvent.bind(this);
        this._zoomstart = this.zoomStartEvent.bind(this);
        this.bindEvent();
    }

    /**
     * @function L.supermap.MapVRenderer.prototype.clickEvent
     * @description 点击事件
     * @param e - {Object} 触发对象
     */
    clickEvent(e) {
        var pixel = e.layerPoint;
        super.clickEvent(pixel, e);
    }

    /**
     * @function L.supermap.MapVRenderer.prototype.mousemoveEvent
     * @description 鼠标移动事件
     * @param  e - {Object} 触发对象
     */
    mousemoveEvent(e) {
        var pixel = e.layerPoint;
        super.mousemoveEvent(pixel, e);
    }

    /**
     * @function L.supermap.MapVRenderer.prototype.bindEvent
     * @description 绑定鼠标移动和鼠标点击事件
     * @param e - {Object} 触发对象
     */
    bindEvent() {
        var map = this.map;

        if (this.options.methods) {
            if (this.options.methods.click) {
                map.on('click', this.clickEvent);
            }
            if (this.options.methods.mousemove) {
                map.on('mousemove', this.mousemoveEvent);
            }
        }
        this.map.on('movestart', this._moveStartEvent);
        this.map.on('moveend', this._moveEndEvent);
        this.map.on('zoomstart', this._zoomstart);
    }

    /**
     * @function L.supermap.MapVRenderer.prototype.unbindEvent
     * @description 解绑鼠标移动和鼠标滑动触发的事件
     * @param e - {Object} 触发对象
     */
    unbindEvent() {
        var map = this.map;

        if (this.options.methods) {
            if (this.options.methods.click) {
                map.off('click', this.clickEvent);
            }
            if (this.options.methods.mousemove) {
                map.off('mousemove', this.mousemoveEvent);
            }
        }
        this.map.off('movestart', this._moveStartEvent);
        this.map.off('moveend', this._moveEndEvent);
        this.map.off('zoomstart', this._zoomStartEvent);
    }

    /**
     * @function L.supermap.MapVRenderer.prototype.getContext
     * @description 获取信息
     */
    getContext() {
        return this.canvasLayer.getCanvas().getContext(this.context);
    }

    /**
     * @function L.supermap.MapVRenderer.prototype.addData
     * @description 添加数据
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
     * @function L.supermap.MapVRenderer.prototype.update
     * @description 更新图层
     * @param opt - {Object} 待更新的数据<br>
     *        data -{Object} mapv数据集<br>
     *        options -{Object} mapv绘制参数<br>
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
        super.update({options: update.options});
    }

    /**
     * @function L.supermap.MapVRenderer.prototype.getData
     * @description 获取数据
     */
    getData() {
        return this.dataSet;
    }

    /**
     * @function L.supermap.MapVRenderer.prototype.removeData
     * @description 删除符合过滤条件的数据
     * @param filter - {function} 过滤条件。条件参数为数据项，返回值为true,表示删除该元素；否则表示不删除
     */
    removeData(filter) {
        if (!this.dataSet) {
            return;
        }
        var newData = this.dataSet.get({
            filter: function (data) {
                return (filter != null && typeof filter === "function") ? !filter(data) : true;
            }
        });
        this.dataSet.set(newData);
        this.update({options: null});
    }

    /**
     * @function L.supermap.MapVRenderer.prototype.clearData
     * @description 清除数据
     */
    clearData() {
        this.dataSet && this.dataSet.clear();
        this.update({options: null});
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


        var offset = map.latLngToAccurateContainerPoint(this.canvasLayer.getTopLeft());
        var dataGetOptions = {
            transferCoordinate: function (coordinate) {
                var worldPoint = map.latLngToAccurateContainerPoint(L.latLng(coordinate[1], coordinate[0]));
                var pixel = {
                    x: worldPoint.x - offset.x,
                    y: worldPoint.y - offset.y
                };
                return [pixel.x, pixel.y];
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

        var worldPoint = map.latLngToContainerPoint(L.latLng(0, 0));
        var pixel = {
            x: worldPoint.x - offset.x,
            y: worldPoint.y - offset.y
        };
        this.drawContext(context, new DataSet(data), self.options, pixel);

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

    addAnimatorEvent() {
    }

    /**
     * @function L.supermap.MapVRenderer.prototype.moveStartEvent
     * @description 开始移动事件
     */
    moveStartEvent() {
        var animationOptions = this.options.animation;
        if (this.isEnabledTime() && this.animator) {
            this.steps.step = animationOptions.stepsRange.start;
            this._hide();
        }
    }

    /**
     * @function L.supermap.MapVRenderer.prototype.moveEndEvent
     * @description 结束移动事件
     */
    moveEndEvent() {
        this.canvasLayer.draw();
        this._show();
    }

    /**
     * @function L.supermap.MapVRenderer.prototype.zoomStartEvent
     * @description 隐藏渲染样式
     */
    zoomStartEvent() {
        this._hide();
    }

    /**
     * @function L.supermap.MapVRenderer.prototype.clear
     * @description 清除信息
     * @param context - {string} 指定要清除的信息
     */
    clear(context) {
        context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    _hide() {
        this.canvasLayer.canvas.style.display = 'none';
    }

    _show() {
        this.canvasLayer.canvas.style.display = 'block';
    }

    /**
     * @function L.supermap.MapVRenderer.prototype.draw
     * @description 绘制渲染
     */
    draw() {
        this.canvasLayer.draw();
    }
}