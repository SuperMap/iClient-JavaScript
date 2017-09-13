import ol from 'openlayers/dist/ol-debug';
import MapvCanvasLayer from './MapvCanvasLayer';
import {baiduMapLayer} from "mapv";
var BaiduMapLayer = baiduMapLayer ? baiduMapLayer.__proto__ : Function;
/**
 * @class ol.supermap.MapvLayer
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
export default class MapvLayer extends BaiduMapLayer {

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
        this.bindEvent();
    }

    /**
     * @function ol.supermap.MapvLayer.prototype.init
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
     * @function ol.supermap.MapvLayer.prototype.clickEvent
     * @param e - {Object} 事件参数
     * @description 点击事件
     */
    clickEvent(e) {
        var pixel = e.pixel;
        super.clickEvent({x: pixel[0], y: pixel[1]}, e);
    }

    /**
     * @function ol.supermap.MapvLayer.prototype.mousemoveEvent
     * @param e - {Object} 事件参数
     * @description 鼠标移动事件
     */
    mousemoveEvent(e) {
        var pixel = e.pixel;
        super.mousemoveEvent({x: pixel[0], y: pixel[1]}, e);
    }

    /**
     * @function ol.supermap.MapvLayer.prototype.bindEvent
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
     * @function ol.supermap.MapvLayer.prototype.unbindEvent
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
                this.clear(context);
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
        var dataGetOptions = {
            transferCoordinate: function (coordinate) {
                var pixelP = map.getPixelFromCoordinate(coordinate);
                var rotation = -map.getView().getRotation();
                var center = map.getPixelFromCoordinate(map.getView().getCenter());
                var scaledP = scale(pixelP, center, self.pixelRatio);
                var rotatedP = rotate(scaledP, rotation, center);
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
                if (time && item.time > time - trails && item.time < time) {
                    return true;
                } else {
                    return false;
                }
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
        this.drawContext(context, new mapv.DataSet(data), self.options, {x: pixel[0], y: pixel[1]});
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


    update(obj) {
        var self = this;
        var _options = obj.options;
        var options = self.options;
        for (var i in _options) {
            options[i] = _options[i];
        }
        self.init(options);
    }
}