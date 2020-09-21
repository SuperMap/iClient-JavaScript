/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../core/Util';
import {
    Unit,
    ServerType,
    SecurityManager,
    Credential,
    CommonUtil,
    Bounds,
    Size,
    FetchRequest,
    GeometryPoint
} from '@supermap/iclient-common';
import { VectorTileStyles } from './vectortile/VectorTileStyles';
import VectorTile from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
import GeoJSON from 'ol/format/GeoJSON';
import * as olSize from 'ol/size';
import Projection from 'ol/proj/Projection';
import TileGrid from 'ol/tilegrid/TileGrid';

/**
 * @class ol.source.VectorTileSuperMapRest
 * @category  Visualization VectorTile
 * @classdesc 矢量瓦片图层源。
 * @param {Object} options - 参数。
 * @param {(string|undefined)} options.url - SuperMap iServer 地图服务地址。
 * @param {(string|Object|undefined)} options.style - Mapbox Style JSON 对象或获取 Mapbox Style JSON 对象的 URL。当 `options.format` 为 `ol/format/MVT ` 且 `options.source` 不为空时有效，优先级高于 `options.url`。
 * @param {(string|undefined)} options.source - Mapbox Style JSON 对象中的source名称。当 `options.style` 设置时有效。当不配置时，默认为 Mapbox Style JSON 的 `sources` 对象中的第一个。
 * @param {(string|Object)} [options.attributions='Tile Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <span>© <a href='https://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>'] - 版权信息。
 * @param {Object} [options.format] - 瓦片的要素格式化。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务器类型，ISERVER|IPORTAL|ONLINE。
 * @param {boolean} [options.withCredentials] - 请求是否携带 cookie。
 * @extends {ol/source/VectorTile}
 */
export class VectorTileSuperMapRest extends VectorTile {
    constructor(options) {
        if (options.url === undefined && options.style === undefined) {
            console.error("one of 'options.style' or 'options.style' is required");
        }
        var zRegEx = /\{z\}/g;
        var xRegEx = /\{x\}/g;
        var yRegEx = /\{y\}/g;
        var dashYRegEx = /\{-y\}/g;

        options.attributions =
            options.attributions ||
            "Tile Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <span>© <a href='https://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>";
        if (['4', '5'].indexOf(Util.getOlVersion()) < 0) {
            options.tileSize = options.format instanceof MVT && options.style ? 512 : 256;
        }
        super({
            attributions: options.attributions,
            cacheSize: options.cacheSize,
            format: options.format || new GeoJSON(),
            logo: Util.getOlVersion() === '4' ? options.logo : null,
            overlaps: options.overlaps,
            projection: options.projection,
            state:
                options.format instanceof MVT &&
                options.style &&
                Object.prototype.toString.call(options.style) == '[object String]'
                    ? 'loading'
                    : options.state,
            tileClass: options.tileClass,
            tileGrid: options.tileGrid,
            tilePixelRatio: options.tilePixelRatio,
            tileUrlFunction: options.format instanceof MVT && options.style ? zxyTileUrlFunction : tileUrlFunction,
            tileLoadFunction: options.format instanceof MVT ? mvtTileLoadFunction : tileLoadFunction,
            wrapX: options.wrapX !== undefined ? options.wrapX : false,
            tileSize: options.tileSize || null,
            zDirection: ['4', '5'].indexOf(Util.getOlVersion()) > -1 ? null : 0
        });
        var me = this;
        me.withCredentials = options.withCredentials;
        me._tileType = options.tileType || 'ScaleXY';
        this.vectorTileStyles = new VectorTileStyles();
        if (options.format instanceof MVT && options.style) {
            if (Object.prototype.toString.call(options.style) == '[object String]') {
                FetchRequest.get(options.style, null, { withCredentials: options.withCredentials })
                    .then((response) => response.json())
                    .then((mbStyle) => {
                        this._fillByStyleJSON(mbStyle, options.source);
                        this.setState('ready');
                    });
            } else {
                this._fillByStyleJSON(options.style, options.source);
            }
        } else {
            this._fillByRestMapOptions(options.url, options);
        }

        function tileUrlFunction(tileCoord, pixelRatio, projection) {
            if (!me.tileGrid) {
                me.tileGrid = me.getTileGridForProjection(projection);
            }
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = ['4', '5'].indexOf(Util.getOlVersion()) > -1 ? -tileCoord[2] - 1 : tileCoord[2];
            var tileSize = olSize.toSize(me.tileGrid.getTileSize(z, me.tmpSize));
            var params = '';
            if (me.tileType === 'ZXY') {
                params = '&width=' + tileSize[0] + '&height=' + tileSize[1] + '&x=' + x + '&y=' + y + '&z=' + z;
            } else if (me.tileType === 'ViewBounds') {
                var tileExtent = me.tileGrid.getTileCoordExtent(tileCoord);
                params =
                    '&width=' +
                    tileSize[0] +
                    '&height=' +
                    tileSize[1] +
                    '&viewBounds=' +
                    tileExtent[0] +
                    ',' +
                    tileExtent[1] +
                    ',' +
                    tileExtent[2] +
                    ',' +
                    tileExtent[3];
            } else {
                var origin = me.tileGrid.getOrigin(z);
                var resolution = me.tileGrid.getResolution(z);
                var dpi = 96;
                var unit = projection.getUnits() || 'degrees';
                if (unit === 'degrees') {
                    unit = Unit.DEGREE;
                }
                if (unit === 'm') {
                    unit = Unit.METER;
                }

                var scale = Util.resolutionToScale(resolution, dpi, unit);
                params =
                    '&x=' +
                    x +
                    '&y=' +
                    y +
                    '&width=' +
                    tileSize[0] +
                    '&height=' +
                    tileSize[1] +
                    '&scale=' +
                    scale +
                    "&origin={'x':" +
                    origin[0] +
                    ",'y':" +
                    origin[1] +
                    '}';
            }
            return me._tileUrl + encodeURI(params);
        }

        function zxyTileUrlFunction(tileCoord) {
            if (!tileCoord) {
                return undefined;
            } else {
                return me._tileUrl
                    .replace(zRegEx, tileCoord[0].toString())
                    .replace(xRegEx, tileCoord[1].toString())
                    .replace(yRegEx, function () {
                        var y = ['4', '5'].indexOf(Util.getOlVersion()) > -1 ? -tileCoord[2] - 1 : tileCoord[2];
                        return y.toString();
                    })
                    .replace(dashYRegEx, function () {
                        var z = tileCoord[0];
                        var range = me.tileGrid.getFullTileRange(z);
                        var y = range.getHeight() + tileCoord[2];
                        return y.toString();
                    });
            }
        }
        /**
         * @private
         * @function ol.source.VectorTileSuperMapRest.prototype.tileLoadFunction
         * @description 加载瓦片。
         * @param {Object} tile -瓦片类。
         * @param {string} tileUrl - 瓦片地址。
         */
        function tileLoadFunction(tile, tileUrl) {
            var regWidth = new RegExp('(^|\\?|&)' + 'width' + '=([^&]*)(\\s|&|$)');
            var regHeight = new RegExp('(^|\\?|&)' + 'height' + '=([^&]*)(\\s|&|$)');
            var width = Number(tileUrl.match(regWidth)[2]);
            var height = Number(tileUrl.match(regHeight)[2]);

            tile.setLoader(function (extent, resolution, projection) {
                FetchRequest.get(tileUrl)
                    .then(function (response) {
                        if (tile.getFormat() instanceof GeoJSON) {
                            return response.json();
                        }
                    })
                    .then(function (tileFeatureJson) {
                        var features = [];
                        if (tile.getFormat() instanceof GeoJSON) {
                            tileFeatureJson.recordsets.map(function (recordset) {
                                recordset.features.map(function (feature) {
                                    var points = [];
                                    var startIndex = 0;
                                    for (var i = 0; i < feature.geometry.parts.length; i++) {
                                        var partPointsLength = feature.geometry.parts[i] * 2;
                                        for (var j = 0, index = startIndex; j < partPointsLength; j += 2, index += 2) {
                                            points.push(
                                                new GeometryPoint(
                                                    feature.geometry.points[index],
                                                    feature.geometry.points[index + 1]
                                                )
                                            );
                                        }
                                        startIndex += partPointsLength;
                                    }
                                    feature.geometry.points = points;
                                    return feature;
                                });
                                return recordset;
                            });
                            tileFeatureJson.recordsets.map(function (recordset) {
                                recordset.features.map(function (feature) {
                                    feature.layerName = recordset.layerName;
                                    feature.type = feature.geometry.type;
                                    features.push(feature);
                                    return feature;
                                });
                                return recordset;
                            });

                            let dataProjection = new Projection({
                                extent: [0, 0, 256, 256],
                                code: 'TILE_PIXELS',
                                units: 'tile-pixels'
                            });

                            if (['4', '5'].indexOf(Util.getOlVersion()) > -1) {
                                tile.setExtent([0, 0, width, height]);
                                tile.setProjection(dataProjection);
                                features = tile.getFormat().readFeatures(Util.toGeoJSON(features));
                            } else {
                                features = tile.getFormat().readFeatures(Util.toGeoJSON(features), {
                                    extent,
                                    dataProjection,
                                    featureProjection: projection
                                });
                            }
                            tile.setFeatures(features);
                        }
                    });
            });
        }
        /**
         * @private
         * @function ol.source.VectorTileSuperMapRest.prototype.tileLoadFunction
         * @description 加载瓦片。
         * @param {Object} tile -瓦片类。
         * @param {string} tileUrl - 瓦片地址。
         */
        function mvtTileLoadFunction(tile, tileUrl) {
            const format = tile.getFormat();
            const success = tile.onLoad.bind(tile);
            const failure = tile.onError.bind(tile);
            tile.setLoader(function (extent, resolution, projection) {
                const xhr = new XMLHttpRequest();
                xhr.open(
                    'GET',
                    typeof tileUrl === 'function' ? tileUrl(extent, resolution, projection) : tileUrl,
                    true
                );
                if (format.getType() == 'arraybuffer') {
                    xhr.responseType = 'arraybuffer';
                }
                xhr.withCredentials = me.withCredentials;
                xhr.onload = function () {
                    if (!xhr.status || (xhr.status >= 200 && xhr.status < 300)) {
                        const type = format.getType();
                        let source = void 0;
                        if (type === 'json' || type === 'text') {
                            source = xhr.responseText;
                        } else if (type === 'xml') {
                            source = xhr.responseXML;
                            if (!source) {
                                source = new DOMParser().parseFromString(xhr.responseText, 'application/xml');
                            }
                        } else if (type === 'arraybuffer') {
                            source = xhr.response;
                        }
                        if (source) {
                            if (['4', '5'].indexOf(Util.getOlVersion()) > -1) {
                                success.call(
                                    this,
                                    format.readFeatures(source, { featureProjection: projection }),
                                    format.readProjection(source),
                                    format.getLastExtent()
                                );
                            } else {
                                success.call(
                                    this,
                                    format.readFeatures(source, {
                                        extent: extent,
                                        featureProjection: projection
                                    }),
                                    format.readProjection(source)
                                );
                            }
                        } else {
                            failure.call(this);
                        }
                    } else {
                        failure.call(this);
                    }
                }.bind(this);
                xhr.onerror = function () {
                    failure.call(this);
                }.bind(this);
                xhr.send();
            });
        }
    }
    _fillByStyleJSON(style, source) {
        if (!source) {
            source = Object.keys(style.sources)[0];
        }
        if (style.sources && style.sources[source]) {
            //ToDo 支持多个tiles地址
            this._tileUrl = style.sources[source].tiles[0];
        }
        if (style.metadata && style.metadata.indexbounds) {
            const indexbounds = style.metadata.indexbounds;
            var max = Math.max(indexbounds[2] - indexbounds[0], indexbounds[3] - indexbounds[1]);
            const defaultResolutions = [];
            for (let index = 0; index < 30; index++) {
                defaultResolutions.push(max / 512 / Math.pow(2, index));
            }
            this.tileGrid = new TileGrid({
                extent: style.metadata.indexbounds,
                resolutions: defaultResolutions,
                tileSize: [512, 512]
            });
        }
    }
    _fillByRestMapOptions(url, options) {
        this._tileUrl = CommonUtil.urlPathAppend(options.url, 'tileFeature.json');
        if (options.format instanceof MVT) {
            this._tileUrl = CommonUtil.urlPathAppend(options.url, 'tileFeature.mvt');
        }
        //为url添加安全认证信息片段
        options.serverType = options.serverType || ServerType.ISERVER;
        this._tileUrl = appendCredential(this._tileUrl, options.serverType);

        function appendCredential(url, serverType) {
            var newUrl = url,
                credential,
                value;
            switch (serverType) {
                case ServerType.IPORTAL:
                    value = SecurityManager.getToken(url);
                    credential = value ? new Credential(value, 'token') : null;
                    if (!credential) {
                        value = SecurityManager.getKey(url);
                        credential = value ? new Credential(value, 'key') : null;
                    }
                    break;
                case ServerType.ONLINE:
                    value = SecurityManager.getKey(url);
                    credential = value ? new Credential(value, 'key') : null;
                    break;
                default:
                    //iserver or others
                    value = SecurityManager.getToken(url);
                    credential = value ? new Credential(value, 'token') : null;
                    break;
            }
            if (credential) {
                newUrl = CommonUtil.urlAppend(newUrl,credential.getUrlParameters());
            }
            return newUrl;
        }

        var returnAttributes = true;
        if (options.returnAttributes !== undefined) {
            returnAttributes = options.returnAttributes;
        }
        var params = {};
        params['returnAttributes'] = returnAttributes;
        if (options._cache !== undefined) {
            params['_cache'] = options._cache;
        }
        if (options.layersID !== undefined) {
            params['layersID'] = options.layersID;
        }
        if (options.layerNames !== undefined) {
            params['layerNames'] = options.layerNames;
        }
        if (options.expands !== undefined) {
            params['expands'] = options.expands;
        }
        if (options.compressTolerance !== undefined) {
            params['compressTolerance'] = options.compressTolerance;
        }
        if (options.coordinateType !== undefined) {
            params['coordinateType'] = options.coordinateType;
        }
        if (options.returnCutEdges !== undefined) {
            params['returnCutEdges'] = options.returnCutEdges;
        }
        this._tileUrl = CommonUtil.urlAppend(this._tileUrl,CommonUtil.getParameterString(params));
    }

    /**
     * @function ol.source.VectorTileSuperMapRest.optionsFromMapJSON
     * @param {string} url - 地址。
     * @param {Object} mapJSONObj - 地图 JSON。
     * @description 获取地图 JSON 信息。
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
            var width = extent[2] - extent[0];
            var height = extent[3] - extent[1];
            var tileSize = width >= height ? width : height;
            var maxReolution;
            if (tileSize === width) {
                maxReolution = tileSize / mapJSONObj.viewer.width;
            } else {
                maxReolution = tileSize / mapJSONObj.viewer.height;
            }
            var resolutions = [];
            var unit = Unit.METER;
            if (mapJSONObj.coordUnit === Unit.DEGREE) {
                unit = Unit.DEGREE;
            }
            if (mapJSONObj.visibleScales.length > 0) {
                var scales = initScales(mapJSONObj);
                for (let i = 0; i < scales.length; i++) {
                    resolutions.push(Util.scaleToResolution(scales[i], dpi, unit));
                }
            } else {
                for (let i = 0; i < level; i++) {
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
            viewBounds = new Bounds(viewBounds.left, viewBounds.bottom, viewBounds.right, viewBounds.top);
            viewer = new Size(viewer.rightBottom.x, viewer.rightBottom.y);
            coordUnit = coordUnit.toLowerCase();
            datumAxis = datumAxis || 6378137;
            var units = coordUnit;
            var dpi = CommonUtil.calculateDpi(viewBounds, viewer, scale, units, datumAxis);
            var resolutions = _resolutionsFromScales(scales);
            var len = resolutions.length;
            scales = [len];
            for (var i = 0; i < len; i++) {
                scales[i] = CommonUtil.getScaleFromResolutionDpi(resolutions[i], dpi, units, datumAxis);
            }

            function _resolutionsFromScales(scales) {
                if (scales === null) {
                    return;
                }
                var resolutions, len;
                len = scales.length;
                resolutions = [len];
                for (var i = 0; i < len; i++) {
                    resolutions[i] = CommonUtil.getResolutionFromScaleDpi(scales[i], dpi, units, datumAxis);
                }
                return resolutions;
            }

            return scales;
        }

        options.tileGrid = new TileGrid({
            extent: extent,
            resolutions: resolutions
        });
        //options.projection = 'EPSG:' + mapJSONObj.prjCoordSys.epsgCode;
        return options;
    }
}
