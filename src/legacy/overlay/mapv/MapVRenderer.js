import SuperMap from '../../SuperMap';
import {baiduMapLayer} from 'mapv';

/**
 * MapV renderer
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

    clickEvent(e) {
        var pixel = e.layerPoint;
        super.clickEvent(pixel, e);
    }


    mousemoveEvent(e) {
        var pixel = e.layerPoint;
        super.mousemoveEvent(pixel, e);
    }


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


    getContext() {
        return this.canvasLayer && this.canvasLayer.canvasContext;
    }

    //追加数据
    addData(data, options) {
        var _data = data;
        if (data && data.get) {
            _data = data.get();
        }
        this.dataSet.add(_data);
        this.update({options: options});
    }

    //更新覆盖原数据
    setData(data, options) {
        var _data = data;
        if (data && data.get) {
            _data = data.get();
        }
        this.dataSet = this.dataSet || new mapv.DataSet();
        this.dataSet.set(_data);
        this.update({options: options});
    }

    getData() {
        return this.dataSet;
    }

    removeData(filter) {
        if (!this.dataSet) {
            return;
        }
        var newData = this.dataSet.get(filter);
        this.dataSet.set(newData);
        this.update({options: null});
    }

    clearData() {
        this.dataSet && this.dataSet.clear();
        this.update({options: null});
    }

    render(time) {
        this._canvasUpdate(time);
    }

    //墨卡托坐标为经纬度
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


    addAnimatorEvent() {
        this.map.events.on({'movestart': this.animatorMovestartEvent.bind(this)});
        this.map.events.on({'moveend': this.animatorMoveendEvent.bind(this)});
    }


    clear(context) {
        context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }


    show() {
        this.map.addLayer(this.canvasLayer);
    }


    hide() {
        this.map.removeLayer(this.canvasLayer);
    }


    draw() {
        this.canvasLayer.redraw();
    }
}