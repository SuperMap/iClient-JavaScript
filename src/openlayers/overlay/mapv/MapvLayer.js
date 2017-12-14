import ol from 'openlayers';
import {MapvCanvasLayer} from './MapvCanvasLayer';
import {baiduMapLayer, DataSet} from "mapv";

var BaiduMapLayer = baiduMapLayer ? baiduMapLayer.__proto__ : Function;

/**
 * @class MapvLayer
 * @classdesc MapV图层类。
 * @private
 * @param map - {Object} 地图
 * @param dataSet - {Object} 数据集
 * @param options - {Object} 参数，如：<br>
 *        paneName - {string} 窗口名。<br>
 *        enableMassClear - {} 。<br>
 *        context - {string} 内容。<br>
 *        zIndex - {number} 层级。<br>
 *        width - {number} 画布宽。<br>
 *        height - {number} 画布高。<br>
 *        mixBlendMode - {string} 最小混合模式。
 * @param mapWidth - {number} 地图宽度
 * @param mapHeight - {number} 地图高度
 * @param source - {Object} 资源
 * @extends BaiduMapLayer
 */
export class MapvLayer extends BaiduMapLayer {

    constructor(map, dataSet, options, mapWidth, mapHeight, source) {
        super(map, dataSet, options);
        this.dataSet = dataSet;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        var self = this;
        options = options || {};
        this.source = source;
        self.animator = null;
        self.map = map;
        self.init(options);
        self.argCheck(options);
        this.canvasLayer = new MapvCanvasLayer({
            map: map,
            context: this.context,
            paneName: options.paneName,
            mixBlendMode: options.mixBlendMode,
            enableMassClear: options.enableMassClear,
            zIndex: options.zIndex,
            width: mapWidth,
            height: mapHeight,
            update: function update() {
                self._canvasUpdate();
            }
        });
        this.clickEvent = this.clickEvent.bind(this);
        this.mousemoveEvent = this.mousemoveEvent.bind(this);
        map.on('movestart', this.moveStartEvent.bind(this));
        map.on('moveend', this.moveEndEvent.bind(this));
        map.getView().on('change:center', this.zoomEvent.bind(this));
        map.on('pointerdrag', this.dragEvent.bind(this));
        this.bindEvent();
    }

    /**
     * @function MapvLayer.prototype.init
     * @param options - {Object} 参数
     * @description 初始化参数
     */
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
     * @function MapvLayer.prototype.clickEvent
     * @param e - {Object} 事件参数
     * @description 点击事件
     */
    clickEvent(e) {
        var pixel = e.pixel;
        super.clickEvent({x: pixel[0] + this.offset[0], y: pixel[1] + this.offset[1]}, e);
    }

    /**
     * @function MapvLayer.prototype.mousemoveEvent
     * @param e - {Object} 事件参数
     * @description 鼠标移动事件
     */
    mousemoveEvent(e) {
        var pixel = e.pixel;
        super.mousemoveEvent({x: pixel[0], y: pixel[1]}, e);
    }

    /**
     * @function MapvLayer.prototype.dragEvent
     * @description 鼠标拖动事件
     */
    dragEvent() {
        this.clear(this.getContext());
    }

    /**
     * @function MapvLayer.prototype.zoomEvent
     * @description 缩放事件
     */
    zoomEvent() {
        this.clear(this.getContext());
    }

    /**
     * @function MapvLayer.prototype.moveStartEvent
     * @description 开始移动事件
     */
    moveStartEvent() {
        var animationOptions = this.options.animation;
        if (this.isEnabledTime() && this.animator) {
            this.steps.step = animationOptions.stepsRange.start;
        }
    }

    /**
     * @function MapvLayer.prototype.moveEndEvent
     * @description 结束移动事件
     */
    moveEndEvent() {
        this.canvasLayer.draw();
    }

    /**
     * @function MapvLayer.prototype.bindEvent
     * @description 绑定事件
     */
    bindEvent() {
        var me = this;
        var map = me.map;
        if (me.options.methods) {
            if (me.options.methods.click) {
                map.on('click', me.clickEvent);
            }
            if (me.options.methods.mousemove) {
                me.pointerInteraction = new ol.interaction.Pointer();
                me.pointerInteraction.handleMoveEvent_ = function (event) {
                    me.mousemoveEvent(event);
                };
                map.addInteraction(me.pointerInteraction);
            }
        }
    }

    /**
     * @function MapvLayer.prototype.unbindEvent
     * @description 解除绑定事件
     */
    unbindEvent() {
        var map = this.map;
        if (this.options.methods) {
            if (this.options.methods.click) {
                map.un('click', this.clickEvent);
            }
            if (this.options.methods.mousemove) {
                map.removeInteraction(this.pointerInteraction)
            }
        }
    }

    /**
     * @function MapvLayer.prototype.addData
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
     * @function MapvLayer.prototype.update
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

    draw() {
        this.canvasLayer.draw();
    }

    /**
     * @function MapvLayer.prototype.getData
     * @description 获取数据
     */
    getData() {
        return this.dataSet;
    }

    /**
     * @function MapvLayer.prototype.removeData
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
     * @function MapvLayer.prototype.clearData
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
        var map = self.map;
        var context = self.canvasLayer.canvas.getContext(self.context);
        if (self.isEnabledTime()) {
            if (time === undefined) {
                self.clear(context);
                return;
            }
            if (self.context == '2d') {
                context.save();
                context.globalCompositeOperation = 'destination-out';
                context.fillStyle = 'rgba(0, 0, 0, .1)';
                context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                context.restore();
            }
        } else {
            this.clear(context);
        }
        if (self.context == '2d') {
            for (var key in self.options) {
                context[key] = self.options[key];
            }
        } else {
            context.clear(context.COLOR_BUFFER_BIT);
        }
        var ext = map.getView().calculateExtent();
        var topLeft = map.getPixelFromCoordinate([ext[0], ext[3]]);

        var dataGetOptions = {
            transferCoordinate: function (coordinate) {
                var pixelP = map.getPixelFromCoordinate(coordinate);
                var rotation = -map.getView().getRotation();
                var center = map.getPixelFromCoordinate(map.getView().getCenter());
                var scaledP = scale(pixelP, center, self.pixelRatio);
                var rotatedP = rotate(scaledP, rotation, center);
                // var result = [rotatedP[0] + self.offset[0] - topLeft[0], rotatedP[1] + self.offset[1] - topLeft[1]];
                var result = [rotatedP[0] + self.offset[0], rotatedP[1] + self.offset[1]];
                return result;
            }
        };

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

        if (time !== undefined) {
            dataGetOptions.filter = function (item) {
                var trails = animationOptions.trails || 10;
                return (time && item.time > (time - trails) && item.time < time);
            };
        }
        if (self.isEnabledTime() && !self.notFirst) {
            self.canvasLayer.resize(self.mapWidth, self.mapHeight);
            self.notFirst = true;
        }
        var data = self.dataSet.get(dataGetOptions);
        self.processData(data);
        self.options._size = self.options.size;
        var pixel = map.getPixelFromCoordinate([0, 0]);
        pixel = [pixel[0] - topLeft[0], pixel[1] - topLeft[1]];
        this.drawContext(context, new DataSet(data), self.options, {x: pixel[0], y: pixel[1]});
        if (self.isEnabledTime()) {
            this.source.changed();
        }
        self.options.updateCallback && self.options.updateCallback(time);
    }


    isEnabledTime() {
        var animationOptions = this.options.animation;
        return animationOptions && !(animationOptions.enabled === false);
    }


    argCheck(options) {
        if (options.draw === 'heatmap') {
            if (options.strokeStyle) {
                console.warn('[heatmap] options.strokeStyle is discard, pleause use options.strength [eg: options.strength = 0.1]');
            }
        }
    }

    getContext() {
        return this.canvasLayer.canvas.getContext(this.context);
    }


    clear(context) {
        context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
}