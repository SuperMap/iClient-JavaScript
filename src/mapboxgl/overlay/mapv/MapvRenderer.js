import {baiduMapLayer} from "mapv";
var BaseLayer = baiduMapLayer ? baiduMapLayer.__proto__ : Function;
/**
 * @class mapboxgl.supermap.MapvRenderer
 * @classdesc MapV图层渲染
 * @param map - {String} 地图
 * @param layer -{Object} 图层
 * @param dataSet -{Object} 数据集
 * @param options -{Object} 交互时所需可选参数。
 * @extends BaseLayer
 *
 */
export default class MapvRenderer extends BaseLayer {
    constructor(map, layer, dataSet, options) {
        if (!BaseLayer) {
            return;
        }
        super(map, dataSet, options);
        this.map = map;
        var self = this;
        options = options || {};

        self.init(options);
        self.argCheck(options);
        this.canvasLayer = layer;
        this.clickEvent = this.clickEvent.bind(this);
        this.mousemoveEvent = this.mousemoveEvent.bind(this);
        this.map.on('move', this.moveEvent.bind(this));
        this.map.on('resize', this.resizeEvent.bind(this));
        this.map.on('moveend', this.moveEndEvent.bind(this));
        this.map.on('remove', this.removeEvent.bind(this));
        this.bindEvent();
    }
    /**
     * @class mapboxgl.supermap.prototype.MapvRenderer
     * @description  点击绑定事件
     * @param e - {object} 事件
     */
    clickEvent(e) {
        var pixel = e.layerPoint;
        super.clickEvent(pixel, e);
    }
    /**
     * @class mapboxgl.supermap.prototype.mousemoveEvent
     * @description  鼠标移动事件
     * @param e - {object} 事件
     */
    mousemoveEvent(e) {
        var pixel = e.layerPoint;
        super.mousemoveEvent(pixel, e);
    }

    bindEvent(e) {
        var map = this.map;
        if (this.options.methods) {
            if (this.options.methods.click) {
                map.on('click', this.clickEvent);
            }
            if (this.options.methods.mousemove) {
                map.on('mousemove', this.mousemoveEvent);
            }
        }
    }

    unbindEvent(e) {
        var map = this.map;

        if (this.options.methods) {
            if (this.options.methods.click) {
                map.off('click', this.clickEvent);
            }
            if (this.options.methods.mousemove) {
                map.off('mousemove', this.mousemoveEvent);
            }
        }
    }
    /**
     * @class mapboxgl.supermap.prototype.getContext
     * @description  获取画布内容
     */
    getContext() {
        return this.canvasLayer.canvas.getContext(this.context);
    }

    /**
     * @class mapboxgl.supermap.prototype.updateData
     * @param dataSet - {object} 数据集
     * @param options - {object} 交互操作
     * @description  更新画布内容
     */
    updateData(dataSet, options) {
        if (dataSet && dataSet.get) {
            this.dataSet.set(dataSet.get());
        }
        this.update({options: options});
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

        var dataGetOptions = {
            transferCoordinate: function (coordinate) {
                var worldPoint = map.project(new window.mapboxgl.LngLat(coordinate[0], coordinate[1]));
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

        var worldPoint = map.project(new window.mapboxgl.LngLat(0, 0));
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

    addAnimatorEvent() {

    }

    removeEvent() {
        this.canvasLayer.mapContainer.removeChild(this.canvasLayer.canvas);
    }

    moveEvent() {
        this._hide();
    }

    resizeEvent() {
        var canvas = this.canvasLayer.canvas;
        canvas.style.position = 'absolute';
        canvas.style.top = 0 + "px";
        canvas.style.left = 0 + "px";
        canvas.width = parseInt(this.map.getCanvas().style.width);
        canvas.height = parseInt(this.map.getCanvas().style.height);
        canvas.style.width = this.map.getCanvas().style.width;
        canvas.style.height = this.map.getCanvas().style.height;
    }

    moveEndEvent() {
        this._canvasUpdate();
        this._show();
    }

    clear(context) {
        context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    _hide() {
        this.canvasLayer.canvas.style.display = 'none';
    }

    _show() {
        this.canvasLayer.canvas.style.display = 'block';
    }

    draw() {
        this.canvasLayer.draw();
    }

}