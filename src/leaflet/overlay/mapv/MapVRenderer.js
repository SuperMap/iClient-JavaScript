var L = require('leaflet');
var mapv = {};
try {
    mapv = require("mapv");
} catch (ex) {
    mapv = {};
}
var BaseLayer = mapv.baiduMapLayer || Function;

class MapVRenderer extends BaseLayer {
    constructor(map, layer, dataSet, options) {
        if (!BaseLayer) {
            return;
        }
        MapVRenderer.__proto__ = BaseLayer.__proto__;
        super(map, dataSet, options);

        var self = this;
        options = options || {};

        self.init(options);
        self.argCheck(options);
        this.canvasLayer = layer;
        this.clickEvent = this.clickEvent.bind(this);
        this.mousemoveEvent = this.mousemoveEvent.bind(this);
        this.bindEvent();
    }

    clickEvent(e) {
        var pixel = e.pixel;
        super.clickEvent(pixel, e);
    }

    mousemoveEvent(e) {
        var pixel = e.pixel;
        super.mousemoveEvent(pixel, e);
    }

    bindEvent(e) {
        var map = this.map;

        if (this.options.methods) {
            if (this.options.methods.click) {
                map.setDefaultCursor("default");
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

    getContext() {
        return this.canvasLayer.getCanvas().getContext(this.context);
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

        var offset = map.latLngToContainerPoint(this.canvasLayer.getTopLeft());
        var dataGetOptions = {
            transferCoordinate: function (coordinate) {
                var worldPoint = map.latLngToContainerPoint(L.latLng(coordinate[1], coordinate[0]));
                var pixel = {
                    x: worldPoint.x - offset.x,
                    y: worldPoint.y - offset.y,
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

        if (self.options.unit === 'm' && self.options.size) {
            self.options._size = self.options.size / zoomUnit;
        } else {
            self.options._size = self.options.size;
        }

        // var pixel = {x: 0, y: 0};
        var worldPoint = map.latLngToContainerPoint(L.latLng(0, 0));
        var pixel = {
            x: worldPoint.x - offset.x,
            y: worldPoint.y - offset.y,
        };
        this.drawContext(context, new mapv.DataSet(data), self.options, pixel);

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
        this.map.on('movestart', this.animatorMovestartEvent.bind(this));
        this.map.on('moveend', this.animatorMoveendEvent.bind(this));
    }

    clear(context) {
        context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    show() {
        this.map.addLayer(this.canvasLayer);
    }

    hide() {
        this.map.addLayer(this.canvasLayer);
    }

    draw() {
        this.canvasLayer.draw();
    }
}

module.exports = MapVRenderer;