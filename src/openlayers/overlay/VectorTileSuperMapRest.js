import ol from 'openlayers/dist/ol-debug';
import SuperMap from '../../common/SuperMap';
import '../../common/security/SecurityManager';
import './vectortile/VectorTileStyles';
ol.supermap = ol.supermap || {};

/**
 * @class ol.source.VectorTileSuperMapRest
 * @classdesc 矢量瓦片图层源。
 * @param options -{Object} 参数。
 * @extends ol.source.VectorTile{@linkdoc-openlayers/ol.source.VectorTile}
 */
export default class VectorTileSuperMapRest extends ol.source.VectorTile {

    constructor(options) {
        if (options.url === undefined) {
            return;
        }
        options.crossOrigin = 'anonymous';
        options.attributions = options.attributions ||
            new ol.Attribution({
                html: "Tile Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"
            })
        var layerUrl = options.url + '/tileFeature.json?';
        if (options.format instanceof ol.format.MVT) {
            layerUrl = options.url + '/tileFeature.mvt?';
        }
        //为url添加安全认证信息片段
        options.serverType = options.serverType || SuperMap.ServerType.ISERVER;
        layerUrl = appendCredential(layerUrl, options.serverType);
        function appendCredential(url, serverType) {
            var newUrl = url, credential, value;
            switch (serverType) {
                case SuperMap.ServerType.ISERVER:
                    value = SuperMap.SecurityManager.getToken(url);
                    credential = value ? new SuperMap.Credential(value, "token") : null;
                    break;
                case SuperMap.ServerType.IPORTAL:
                    value = SuperMap.SecurityManager.getToken(url);
                    credential = value ? new SuperMap.Credential(value, "token") : null;
                    if (!credential) {
                        value = SuperMap.SecurityManager.getKey(url);
                        credential = value ? new SuperMap.Credential(value, "key") : null;
                    }
                    break;
                case SuperMap.ServerType.ONLINE:
                    value = SuperMap.SecurityManager.getKey(url);
                    credential = value ? new SuperMap.Credential(value, "key") : null;
                    break;
                default:
                    value = SuperMap.SecurityManager.getToken(url);
                    credential = value ? new SuperMap.Credential(value, "token") : null;
                    break;
            }
            if (credential) {
                newUrl += "&" + credential.getUrlParameters();
            }
            return newUrl;
        }

        var returnAttributes = true;
        if (options.returnAttributes !== undefined) {
            returnAttributes = options.returnAttributes
        }
        layerUrl += "&returnAttributes=" + returnAttributes;
        if (options._cache !== undefined) {
            layerUrl += "&_cache=" + options._cache;
        }
        if (options.layersID !== undefined) {
            layerUrl += "&layersID=" + options.layersID;
        }
        if (options.layerNames !== undefined) {
            layerUrl += "&layerNames=" + options.layerNames;
        }
        if (options.expands !== undefined) {
            layerUrl += "&expands=" + options.expands;
        }
        if (options.compressTolerance !== undefined) {
            layerUrl += "&compressTolerance=" + options.compressTolerance;
        }
        if (options.coordinateType !== undefined) {
            layerUrl += "&coordinateType=" + options.coordinateType;
        }
        if (options.returnCutEdges !== undefined) {
            layerUrl += "&returnCutEdges=" + options.returnCutEdges;
        }
        super({
            attributions: options.attributions,
            cacheSize: options.cacheSize,
            format: options.format || new ol.format.GeoJSON(),
            logo: options.logo,
            overlaps: options.overlaps,
            projection: options.projection,
            state: options.state,
            tileClass: options.tileClass,
            tileGrid: options.tileGrid,
            tilePixelRatio: options.tilePixelRatio,
            tileUrlFunction: tileUrlFunction,
            tileLoadFunction: (options.format instanceof ol.format.MVT) ? undefined : tileLoadFunction,
            url: options.url,
            urls: options.urls,
            wrapX: options.wrapX !== undefined ? options.wrapX : false
        });
        var me = this;

        function tileUrlFunction(tileCoord, pixelRatio, projection) {
            if (!me.tileGrid) {
                me.tileGrid = me.getTileGridForProjection(projection);
            }
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            var origin = me.tileGrid.getOrigin(z);
            var resolution = me.tileGrid.getResolution(z);
            var dpi = 96;
            var unit = projection.getUnits();
            if (unit === 'degrees') {
                unit = SuperMap.Unit.DEGREE;
            }
            if (unit === 'm') {
                unit = SuperMap.Unit.METER;
            }
            var scale = ol.supermap.Util.resolutionToScale(resolution, dpi, unit);
            var tileSize = ol.size.toSize(me.tileGrid.getTileSize(z, me.tmpSize));
            return layerUrl + "&x=" + x + "&y=" + y + "&width=" + tileSize[0] + "&height=" + tileSize[1] + "&scale=" + scale + "&origin={'x':" + origin[0] + ",'y':" + origin[1] + "}";
        }

        /**
         * @private
         * @function ol.source.VectorTileSuperMapRest.prototype.tileLoadFunction
         * @description 加载瓦片
         * @param tile -{onject} 瓦片类
         * @param tileUrl -{string} 瓦片地址
         */
        function tileLoadFunction(tile, tileUrl) {
            tile.setLoader(function () {
                SuperMap.FetchRequest.get(tileUrl).then(function (response) {
                    if (tile.getFormat() instanceof ol.format.GeoJSON) {
                        return response.json();
                    }
                }).then(function (tileFeatureJson) {
                    var features = [];
                    if (tile.getFormat() instanceof ol.format.GeoJSON) {
                        tileFeatureJson.recordsets.map(function (recordset) {
                            recordset.features.map(function (feature) {
                                var points = [];
                                var startIndex = 0;
                                for (var i = 0; i < feature.geometry.parts.length; i++) {
                                    var partPointsLength = feature.geometry.parts[i] * 2;
                                    for (var j = 0, index = startIndex; j < partPointsLength; j += 2, index += 2) {
                                        points.push(new SuperMap.Geometry.Point(feature.geometry.points[index], feature.geometry.points[index + 1]));
                                    }
                                    startIndex += partPointsLength;
                                }
                                feature.geometry.points = points;
                            })
                        });
                        tileFeatureJson.recordsets.map(function (recordset) {
                            recordset.features.map(function (feature) {
                                feature.layerName = recordset.layerName;
                                feature.type = feature.geometry.type;
                                features.push(feature);
                            })
                        });
                        features = tile.getFormat().readFeatures(ol.supermap.Util.toGeoJSON(features));
                    }
                    tile.setFeatures(features);
                    tile.setProjection(new ol.proj.Projection({
                        code: 'TILE_PIXELS',
                        units: 'tile-pixels'
                    }));
                });
            });
        }
    }

    /**
     * @function ol.source.VectorTileSuperMapRest.optionsFromMapJSON
     * @param url - {string} 地址
     * @param mapJSONObj - {Object} 地图JSON
     * @description 获取地图JSON信息
     */
    static optionsFromMapJSON(url, mapJSONObj) {
        var options = {};
        options.url = url;
        options.crossOrigin = 'anonymous';
        var extent = [mapJSONObj.bounds.left, mapJSONObj.bounds.bottom, mapJSONObj.bounds.right, mapJSONObj.bounds.top];
        var resolutions = getResolutions();

        function getResolutions() {
            var level = 17;
            var dpi = 96;
            var width = (extent[2] - extent[0]);
            var height = (extent[3] - extent[1]);
            var tileSize = width >= height ? width : height;
            var maxReolution;
            if (tileSize === width) {
                maxReolution = tileSize / mapJSONObj.viewer.width;
            } else {
                maxReolution = tileSize / mapJSONObj.viewer.height;
            }
            var resolutions = [];
            var unit = SuperMap.Unit.METER;
            if (mapJSONObj.coordUnit === SuperMap.Unit.DEGREE) {
                unit = SuperMap.Unit.DEGREE;
            }
            if (mapJSONObj.visibleScales.length > 0) {
                var scales = initScales(mapJSONObj);
                for (var i = 0; i < scales.length; i++) {
                    resolutions.push(ol.supermap.Util.scaleToResolution(scales[i], dpi, unit));
                }
            } else {
                for (var i = 0; i < level; i++) {
                    resolutions.push(maxReolution / Math.pow(2, i));
                }
            }
            return resolutions;
        }

        function initScales(mapJSONObj) {
            var scales = mapJSONObj.visibleScales;
            if (!scales) {
                return null;
            }
            var viewBounds = mapJSONObj.viewBounds,
                coordUnit = mapJSONObj.coordUnit,
                viewer = mapJSONObj.viewer,
                scale = mapJSONObj.scale,
                datumAxis = mapJSONObj.datumAxis;
            //将jsonObject转化为SuperMap.Bounds，用于计算dpi。
            viewBounds = new SuperMap.Bounds(viewBounds.left, viewBounds.bottom, viewBounds.right, viewBounds.top);
            viewer = new SuperMap.Size(viewer.rightBottom.x, viewer.rightBottom.y);
            coordUnit = coordUnit.toLowerCase();
            var units = coordUnit;
            var datumAxis = datumAxis || 6378137;
            var dpi = SuperMap.Util.calculateDpi(viewBounds, viewer, scale, units, datumAxis);
            var resolutions = _resolutionsFromScales(scales);
            var len = resolutions.length;
            scales = [len];
            for (var i = 0; i < len; i++) {
                scales[i] = SuperMap.Util.getScaleFromResolutionDpi(
                    resolutions[i], dpi, units, datumAxis
                );
            }

            function _resolutionsFromScales(scales) {
                if (scales === null) {
                    return;
                }
                var resolutions, len;
                len = scales.length;
                resolutions = [len];
                for (var i = 0; i < len; i++) {
                    resolutions[i] = SuperMap.Util.getResolutionFromScaleDpi(
                        scales[i], dpi, units, datumAxis);
                }
                return resolutions;
            }

            return scales;
        }

        options.tileGrid = new ol.tilegrid.TileGrid({
            extent: extent,
            resolutions: resolutions
        });
        return options;
    }
}
ol.source.VectorTileSuperMapRest = VectorTileSuperMapRest;
