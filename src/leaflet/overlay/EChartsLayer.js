import L from "leaflet";
import '../core/Base';
import echarts from "echarts";
import Attributions from '../core/Attributions'

/**
 * @class L.supermap.echartsLayer
 * @classdesc 百度ECharts图层类。
 * @category  Visualization ECharts
 * @extends {L.Layer}
 * @param {Object} echartsOptions - 图表参数
 * @param {Object} options - 可选图层参数。
 * @param {string} options.attribution - 版权信息。
 * @param {boolean} [options.loadWhileAnimating=false] - 是否在移动时实时绘制。
 */
export var EchartsLayer = L.Layer.extend({

    includes: [],
    _echartsContainer: null,
    _map: null,
    _ec: null,
    _echartsOptions: null,

    options: {
        attribution: Attributions.ECharts.attribution,
        loadWhileAnimating: false
    },

    initialize: function (echartsOptions, options) {
        L.Util.setOptions(this, options);
        this.setOption(echartsOptions);
    },
    /**
     * @function L.supermap.echartsLayer.prototype.setOption
     * @description 设置图表地图参数
     * @param {Object} echartsOptions - 图表参数
     * @param {boolean} notMerge - 是否合并参数
     * @param {string} lazyUpdate - 后台自动更新
     */
    setOption: function (echartsOptions, notMerge, lazyUpdate) {
        var baseOption = echartsOptions.baseOption || echartsOptions;
        baseOption.LeafletMap = baseOption.LeafletMap || {
            roam: true
        }
        baseOption.animation = baseOption.animation === true;
        this._echartsOptions = echartsOptions;
        this._ec && this._ec.setOption(echartsOptions, notMerge, lazyUpdate);
    },
    getEcharts: function () {
        return this._ec;
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
     * @param {L.map} map - 待添加的地图
     */
    onAdd: function (map) {
        this._map = map;
        this._initEchartsContainer();
        this._ec = echarts.init(this._echartsContainer);
        echarts.leafletMap = map;
        var me = this;
        map.on("zoomstart", function () {
            me._disableEchartsContainer();
        });
        !me.options.loadWhileAnimating && map.on("movestart", function () {
            me._disableEchartsContainer();
        });
        echarts.registerAction({
            type: 'LeafletMapLayout',
            event: 'LeafletMapLayout',
            update: 'updateLayout'
        }, function (payload, ecModel) { // eslint-disable-line no-unused-vars

        });
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
                var rendering = true;
                var leafletMap = echarts.leafletMap;
                var viewportRoot = api.getZr().painter.getViewportRoot();

                var animated = leafletMap.options.zoomAnimation && L.Browser.any3d;
                viewportRoot.className = ' leaflet-layer leaflet-zoom-' + (animated ? 'animated' : 'hide') + ' echarts-layer';

                var originProp = L.DomUtil.testProp(['transformOrigin', 'WebkitTransformOrigin', 'msTransformOrigin']);
                viewportRoot.style[originProp] = '50% 50%';

                var coordSys = LeafletMapModel.coordinateSystem;

                var ecLayers = api.getZr().painter.getLayers();

                var moveHandler = function () {
                    if (rendering) {
                        return;
                    }
                    var offset = me._map.containerPointToLayerPoint([0, 0]);
                    var mapOffset = [offset.x || 0, offset.y || 0];
                    viewportRoot.style.left = mapOffset[0] + 'px';
                    viewportRoot.style.top = mapOffset[1] + 'px';

                    if (!me.options.loadWhileAnimating) {
                        for (var item in ecLayers) {
                            if (!ecLayers.hasOwnProperty(item)) {
                                continue;
                            }
                            ecLayers[item] && clearContext(ecLayers[item].ctx);
                        }
                        me._enableEchartsContainer();
                    }

                    coordSys.setMapOffset(mapOffset);
                    LeafletMapModel.__mapOffset = mapOffset;

                    api.dispatchAction({
                        type: 'LeafletMapLayout'
                    });


                };

                function clearContext(context) {
                    context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                }

                function zoomEndHandler() {
                    if (rendering) {
                        return;
                    }

                    api.dispatchAction({
                        type: 'LeafletMapLayout'
                    });
                    me._enableEchartsContainer();
                }

                if (this._oldMoveHandler) {
                    leafletMap.off(me.options.loadWhileAnimating ? 'move' : 'moveend', this._oldMoveHandler);

                }
                if (this._oldZoomEndHandler) {
                    leafletMap.off('zoomend', this._oldZoomEndHandler);

                }

                leafletMap.on(me.options.loadWhileAnimating ? 'move' : 'moveend', moveHandler);
                leafletMap.on('zoomend', zoomEndHandler);
                this._oldMoveHandler = moveHandler;
                this._oldZoomEndHandler = zoomEndHandler;
                rendering = false;
            }
        });
        this._ec.setOption(this._echartsOptions);
    },

    onRemove: function () {
        // 销毁echarts实例
        this._ec.dispose();
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
        var me = this;
        this._map.on('resize', function (e) {
            let size = e.newSize;
            me._echartsContainer.style.width = size.x + 'px';
            me._echartsContainer.style.height = size.y + 'px';
            me._ec.resize()
        })
    }

});

/**
 * @class L.supermap.LeafletMapCoordSys
 * @private
 * @classdesc 地图坐标系统类
 * @param {L.map} leafletMap - 地图
 * @param {Object} api - 接口
 */
export function LeafletMapCoordSys(leafletMap) {
    this._LeafletMap = leafletMap;
    this.dimensions = ['lng', 'lat'];
    this._mapOffset = [0, 0];
}

LeafletMapCoordSys.prototype.dimensions = ['lng', 'lat'];

LeafletMapCoordSys.prototype.setMapOffset = function (mapOffset) {
    this._mapOffset = mapOffset
};

LeafletMapCoordSys.prototype.getBMap = function () {
    return this._LeafletMap
};

LeafletMapCoordSys.prototype.prepareCustoms = function () {
    var zrUtil = echarts.util;

    var rect = this.getViewRect();
    return {
        coordSys: {
            // The name exposed to user is always 'cartesian2d' but not 'grid'.
            type: 'leaflet',
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height
        },
        api: {
            coord: zrUtil.bind(this.dataToPoint, this),
            size: zrUtil.bind(dataToCoordSize, this)
        }
    };

    function dataToCoordSize(dataSize, dataItem) {
        dataItem = dataItem || [0, 0];
        return zrUtil.map([0, 1], function (dimIdx) {
            var val = dataItem[dimIdx];
            var halfSize = dataSize[dimIdx] / 2;
            var p1 = [];
            var p2 = [];
            p1[dimIdx] = val - halfSize;
            p2[dimIdx] = val + halfSize;
            p1[1 - dimIdx] = p2[1 - dimIdx] = dataItem[1 - dimIdx];
            return Math.abs(this.dataToPoint(p1)[dimIdx] - this.dataToPoint(p2)[dimIdx]);
        }, this);
    }
};

LeafletMapCoordSys.prototype.dataToPoint = function (data) {
    //处理数据中的null值
    if (data[1] === null) {
        data[1] = L.CRS.EPSG3857.projection.MAX_LATITUDE;
    }
    //平面坐标系不能这么处理
    //data[1] = this.fixLat(data[1]);

    var px = this._LeafletMap.latLngToLayerPoint([data[1], data[0]]);

    var mapOffset = this._mapOffset;
    return [px.x - mapOffset[0], px.y - mapOffset[1]];
};

LeafletMapCoordSys.prototype.fixLat = function (lat) {
    if (lat >= 90) {
        return 89.99999999999999;
    }
    if (lat <= -90) {
        return -89.99999999999999;
    }
    return lat;
};

LeafletMapCoordSys.prototype.pointToData = function (pt) {
    let mapOffset = this._mapOffset;
    let point = this._LeafletMap.layerPointToLatLng([pt[0] + mapOffset[0], pt[1] + mapOffset[1]]);
    return [point.lng, point.lat];
};

LeafletMapCoordSys.prototype.getViewRect = function () {
    const size = this._LeafletMap.getSize();
    return new echarts.graphic.BoundingRect(0, 0, size.x, size.y);
};

LeafletMapCoordSys.prototype.getRoamTransform = function () {
    return echarts.matrix.create();
};
LeafletMapCoordSys.dimensions = LeafletMapCoordSys.prototype.dimensions;

LeafletMapCoordSys.create = function (ecModel) {
    let coordSys;

    ecModel.eachComponent('LeafletMap', function (leafletMapModel) {
        if (!coordSys) {
            coordSys = new LeafletMapCoordSys(echarts.leafletMap);
        }
        leafletMapModel.coordinateSystem = coordSys;
        leafletMapModel.coordinateSystem.setMapOffset(leafletMapModel.__mapOffset || [0, 0]);
    });
    ecModel.eachSeries(function (seriesModel) {
        if (!seriesModel.get('coordinateSystem') || seriesModel.get('coordinateSystem') === 'leaflet') {
            if (!coordSys) {
                coordSys = new LeafletMapCoordSys(echarts.leafletMap);
            }
            seriesModel.coordinateSystem = coordSys;
            seriesModel.animation = seriesModel.animation === true;
        }
    })
};
export var echartsLayer = function (echartsOptions, options) {
    return new EchartsLayer(echartsOptions, options);
};

L.supermap.echartsLayer = echartsLayer;