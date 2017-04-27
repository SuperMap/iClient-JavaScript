require('../core/Base');
var L = require("leaflet");
var EchartsMapLayer = L.Layer.extend({
    includes: [],
    _echartsContainer: null,
    _map: null,
    _ec: null,
    _option: null,

    initialize: function (option) {
        this._option = option;
    },

    onAdd: function (map) {
        this._map = map;
        this._initEchartsContainer();
        map.on("moveend", this._redraw, this);
        var me = this;
        map.on("movestart", function (e) {
            me._disableEchartsContainer();
        })
        this._redraw();
    },

    onRemove: function (map) {
        if (this._echartsContainer) {
            map.getPanes().overlayPane.removeChild(this._echartsContainer);
        }
        map.off("moveend", this._redraw, this);
        var me = this;
        map.off("movestart", function () {
            me._disableEchartsContainer();
        })
    },
    addTo: function (map) {
        map.addLayer(this);
        return this;
    },
    _initEchartsContainer: function () {
        var size = this._map.getSize();
        var _div = document.createElement('div');
        _div.style.position = 'absolute';
        _div.style.height = size.y + 'px';
        _div.style.width = size.x + 'px';
        _div.style.zIndex = 10;
        this._echartsContainer = _div;
        this._map.getPanes().overlayPane.appendChild(this._echartsContainer);
    },

    _resetCanvasPosition: function () {
        var bounds = this._map.getBounds();
        var topLeft = this._map.latLngToLayerPoint(bounds.getNorthWest());
        L.DomUtil.setPosition(this._echartsContainer, topLeft);
        this._enableEchartsContainer();
    },
    _disableEchartsContainer: function () {
        this._echartsContainer.style.visibility = "hidden";
    },
    _enableEchartsContainer: function () {
        this._echartsContainer.style.visibility = "visible";
    },
    _redraw: function () {
        var lastOption = this._ec && this._ec.getOption() ? this._ec.getOption() : this._option;
        this._resetCanvasPosition();
        this._echartsContainer.innerHTML = '';
        this.initECharts();
        this._ec.setOption(lastOption);
        return this;
    },

    clear: function () {
        this._echartsContainer.innerHTML = '';
    },

    redraw: function () {
        this._redraw();
    },

    /**
     * 初始化echarts实例
     *
     */
    initECharts: function () {
        this._ec = echarts.init(this._echartsContainer);
        var me = this;
        echarts.registerCoordinateSystem("leaflet",
            {
                create: function (ecModel, api) {
                    ecModel.eachSeries(function (seriesModel, index) {
                        var coordSysType = seriesModel.get('coordinateSystem');
                        if (!coordSysType || coordSysType === 'leaflet') {
                            seriesModel.coordinateSystem = new Geo(me._map);
                        }
                    });
                    for (var i = 0; i < me._ec._componentsViews.length; i++) {
                        var view = me._ec._componentsViews[i];
                        if (view.__model && view.__model.mainType === 'visualMap') {
                            view.__model.eachTargetSeries(function (targetSeries) {
                                var viewRect = view.group.getBoundingRect();
                                viewRect.width = parseInt(me._echartsContainer.style.width);
                                viewRect.height = parseInt(me._echartsContainer.style.height);
                                targetSeries.coordinateSystem.setViewRect(viewRect);
                            });
                        }
                        if (view.__model && view.__model.mainType === 'visualMap' && view._shapes && view._shapes.barGroup) {
                            view._shapes.barGroup.on('mouseover', function () {
                                me._map.dragging.disable();
                                me._map.scrollWheelZoom.disable();
                                me._map.doubleClickZoom.disable();
                            })
                            view._shapes.barGroup.on('mouseout', function () {
                                me._map.dragging.enable();
                                me._map.scrollWheelZoom.enable();
                                me._map.doubleClickZoom.enable();
                            })
                        }
                    }

                },
                dimensions: ['lng', 'lat']
            }
        );
    }
});

function Geo(map) {
    this._map = map;
    this.viewRect = null;
}
Geo.prototype = {
    constructor: Geo,
    type: 'geo',
    dimensions: ['lng', 'lat'],
    dataToPoints: function (data) {
        var item = [];
        return data.mapArray(['lng', 'lat'], function (lon, lat) {
            item[0] = lon;
            item[1] = lat;
            return this.dataToPoint(item);
        }, this);
    },
    setViewRect: function (viewRect) {
        this.viewRect = viewRect;
    },
    getViewRect: function () {
        return this.viewRect;
    },
    getRoamTransform: function () {
        var roamTransform = {};
        roamTransform.transform;
        return roamTransform;
    },

    // Overwrite
    dataToPoint: function (data) {
        var point = new L.latLng(data[1], data[0]);
        if (point && point.lng && point.lat) {
            var pos = this._map.latLngToContainerPoint(point);
            return [pos.x, pos.y];
        }
        return data;

    }
};

L.echartsMapLayer = function (options, echartsOptions) {
    return new EchartsMapLayer(options, echartsOptions);
};
module.exports = EchartsMapLayer;

