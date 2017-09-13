import '../core/Base';
import L from "leaflet";
import echarts  from "echarts";

/**
 * @class L.supermap.echartsLayer
 * @classdesc 百度ECharts图层类。
 * @extends L.Layer{@linkdoc-leaflet/#layer}
 * @param echartsOptions - {Object} 图表参数
 * @param options - {Object} 可选图层参数。<br>
 *        attribution - {string} 版权信息。<br>
 *        loadWhileAnimating - {boolean} 是否在启动时加载。
 */
export var EchartsLayer = L.Layer.extend({

    includes: [],
    _echartsContainer: null,
    _map: null,
    _ec: null,
    _echartsOptions: null,

    options: {
        attribution: "© 2017 百度 ECharts with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>",
        loadWhileAnimating: true
    },

    initialize: function (echartsOptions, options) {
        if (echartsOptions) {
            echartsOptions.LeafletMap = {
                roam: true
            }
        }
        this._echartsOptions = echartsOptions;
        L.Util.setOptions(this, options);
    },

    /**
     * @function L.supermap.echartsLayer.prototype.setOption
     * @description 设置图表地图参数
     * @param echartsOptions - {Object} 图表参数
     * @param notMerge - {boolean} 是否合并参数
     * @param lazyUpdate - {string} 后台自动更新
     */
    setOption: function (echartsOptions, notMerge, lazyUpdate) {
        if (echartsOptions) {
            echartsOptions.LeafletMap = {
                roam: true
            }
        }
        this._echartsOptions = echartsOptions;
        this._ec.setOption(echartsOptions, notMerge, lazyUpdate);
    },

    _disableEchartsContainer: function () {
        this._echartsContainer.style.visibility = "hidden";
    },
    _enableEchartsContainer: function () {
        this._echartsContainer.style.visibility = "visible";
    },

    /**
     * @private
     * @function L.supermap.echartsLayer.prototype.onAdd
     * @description 添加地图
     * @param map - {L.map} 待添加的地图
     */
    onAdd: function (map) {
        this._map = map;
        this._initEchartsContainer();
        this._ec = echarts.init(this._echartsContainer);
        echarts.leafletMap = map;
        var me = this;
        map.on("zoomstart", function (e) {
            me._disableEchartsContainer();
        });
        echarts.registerAction({
            type: 'LeafletMapLayout',
            event: 'LeafletMapLayout',
            update: 'updateLayout'
        }, function (payload, ecModel) {
        })
        echarts.registerCoordinateSystem(
            'leaflet', LeafletMapCoordSys
        );
        echarts.extendComponentModel({
            type: 'LeafletMap',
            getBMap: function () {
                return this.__LeafletMap;
            },
            defaultOption: {
                roam: false
            }
        });
        echarts.extendComponentView({
            type: 'LeafletMap',
            render: function (LeafletMapModel, ecModel, api) {
                var rendering = true
                var leafletMap = echarts.leafletMap;
                var viewportRoot = api.getZr().painter.getViewportRoot()
                var coordSys = LeafletMapModel.coordinateSystem;
                var moveHandler = function (type, target) {
                    if (rendering) {
                        return
                    }
                    var bounds = map.getBounds();
                    var topLeft = map.latLngToLayerPoint(bounds.getNorthWest());
                    var mapOffset = [parseInt(topLeft.x, 10) || 0, parseInt(topLeft.y, 10) || 0]
                    viewportRoot.style.left = mapOffset[0] + 'px';
                    viewportRoot.style.top = mapOffset[1] + 'px';
                    coordSys.setMapOffset(mapOffset);
                    LeafletMapModel.__mapOffset = mapOffset;
                    api.dispatchAction({
                        type: 'LeafletMapLayout'
                    })
                }

                function zoomEndHandler() {
                    if (rendering) {
                        return
                    }

                    api.dispatchAction({
                        type: 'LeafletMapLayout'
                    })
                    me._enableEchartsContainer();
                }

                if (me.options.loadWhileAnimating) {
                    leafletMap.off('move', this._oldMoveHandler)
                } else {
                    leafletMap.off('moveend', this._oldMoveHandler)
                }
                leafletMap.off('zoomend', this._oldZoomEndHandler)
                if (me.options.loadWhileAnimating) {
                    leafletMap.on('move', moveHandler);
                } else {
                    leafletMap.on('moveend', moveHandler);
                }
                leafletMap.on('zoomend', zoomEndHandler)
                this._oldMoveHandler = moveHandler
                this._oldZoomEndHandler = zoomEndHandler
                rendering = false
            }
        });
        this._ec.setOption(this._echartsOptions);
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

});

/**
 * @class L.supermap.LeafletMapCoordSys
 * @private
 * @classdesc 地图坐标系统类
 * @param LeafletMap - {L.map} 地图
 * @param api - {Object} 接口
 */
export function LeafletMapCoordSys(LeafletMap, api) {
    this._LeafletMap = LeafletMap
    this.dimensions = ['lng', 'lat']
    this._mapOffset = [0, 0]
    this._api = api
}

LeafletMapCoordSys.prototype.dimensions = ['lng', 'lat']

LeafletMapCoordSys.prototype.setMapOffset = function (mapOffset) {
    this._mapOffset = mapOffset
}

LeafletMapCoordSys.prototype.getBMap = function () {
    return this._LeafletMap
}

LeafletMapCoordSys.prototype.dataToPoint = function (data) {
    var point = new L.latLng(data[1], data[0]);
    var px = this._LeafletMap.latLngToLayerPoint(point);
    var mapOffset = this._mapOffset;
    return [px.x - mapOffset[0], px.y - mapOffset[1]];
}

LeafletMapCoordSys.prototype.pointToData = function (pt) {
    var mapOffset = this._mapOffset;
    var pt = this._LeafletMap.layerPointToLatLng([pt[0] + mapOffset[0], pt[1] + mapOffset[1]]);
    return [pt.lng, pt.lat];
}

LeafletMapCoordSys.prototype.getViewRect = function () {
    var api = this._api;
    return new echarts.graphic.BoundingRect(0, 0, api.getWidth(), api.getHeight());
}

LeafletMapCoordSys.prototype.getRoamTransform = function () {
    return echarts.matrix.create();
}
LeafletMapCoordSys.dimensions = LeafletMapCoordSys.prototype.dimensions

LeafletMapCoordSys.create = function (ecModel, api) {
    var coordSys;

    ecModel.eachComponent('LeafletMap', function (LeafletMapModel) {
        var leafletMap = echarts.leafletMap;
        coordSys = new LeafletMapCoordSys(leafletMap, api);
        coordSys.setMapOffset(LeafletMapModel.__mapOffset || [0, 0]);
        LeafletMapModel.coordinateSystem = coordSys;
    })
    ecModel.eachSeries(function (seriesModel) {
        if (seriesModel.get('coordinateSystem') === 'leaflet') {
            seriesModel.coordinateSystem = coordSys
        }
    })
}

export var echartsLayer = function (echartsOptions, options) {
    return new EchartsLayer(echartsOptions, options);
};
L.supermap.echartsLayer = echartsLayer;

