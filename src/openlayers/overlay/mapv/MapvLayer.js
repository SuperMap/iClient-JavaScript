import ol from 'openlayers/dist/ol-debug';
import MapvCanvasLayer from './MapvCanvasLayer';
import {baiduMapLayer} from "mapv";
var BaiduMapLayer = baiduMapLayer ? baiduMapLayer.__proto__ : Function;

export default class MapvLayer extends BaiduMapLayer {

    constructor(map, dataSet, options, source) {
        super(map, dataSet, options);
        this.dataSet = dataSet;
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
            update: function update() {
                self._canvasUpdate();
            }
        });
        this.clickEvent = this.clickEvent.bind(this);
        this.mousemoveEvent = this.mousemoveEvent.bind(this);
        this.bindEvent();
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

    clickEvent(e) {
        var pixel = e.pixel;
        super.clickEvent({x: pixel[0], y: pixel[1]}, e);
    }

    mousemoveEvent(e) {
        var pixel = e.pixel;
        super.mousemoveEvent({x: pixel[0], y: pixel[1]}, e);
    }

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
                return map.getPixelFromCoordinate(coordinate);
            }
        };
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
        var data = self.dataSet.get(dataGetOptions);

        this.processData(data);

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