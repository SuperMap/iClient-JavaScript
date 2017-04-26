require('../core/Base');
require('./vectortile/VectorTileStyles');
require('./vectortile/StyleMap');
require('./vectortile/DeafultCanvasStyle');

ol.supermap.VectorTileSuperMapRest = function (options) {
    if (options.url === undefined) {
        return;
    }
    options.crossOrigin = 'anonymous';
    if (!options.attributions) {
        options.attributions = [
            new ol.Attribution({
                html: ' with <a href="http://icltest.supermapol.com/">SuperMap iClient</a>'
            })]
    }
    var layerUrl = options.url + '/tileFeature.json?';
    //为url添加安全认证信息片段
    if (SuperMap.Credential && SuperMap.Credential.CREDENTIAL) {
        layerUrl += "&" + SuperMap.Credential.CREDENTIAL.getUrlParameters();
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
        // layerUrl += "&layerNames=%5B'China_Boundary_A%40China%231'%5D";
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
    function tileUrlFunction(tileCoord, pixelRatio, projection) {
        this.projection = projection;
        if (!this.tileGrid) {
            this.tileGrid = this.getTileGridForProjection(projection);
        }
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = -tileCoord[2] - 1;
        var origin = this.tileGrid.getOrigin(z);
        var resolution = this.tileGrid.getResolution(z);
        var dpi = 96;
        var unit = projection.getUnits();
        if (unit === 'degrees') {
            unit = SuperMap.Unit.DEGREE;
        }
        if (unit === 'm') {
            unit = SuperMap.Unit.METER;
        }
        var scale = ol.supermap.Util.resolutionToScale(resolution, dpi, unit);
        var tileSize = ol.size.toSize(this.tileGrid.getTileSize(z, this.tmpSize));
        return layerUrl + "&x=" + x + "&y=" + y + "&width=" + tileSize[0] + "&height=" + tileSize[1] + "&scale=" + scale + "&origin={'x':" + origin[0] + ",'y':" + origin[1] + "}";
    }

    function tileLoadFunction(tile, tileUrl) {
        tile.setLoader(function () {
            SuperMap.Request.get(tileUrl).then(function (response) {
                return response.json();
            }).then(function (tileFeatureJson) {
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
                var features = [];
                tileFeatureJson.recordsets.map(function (recordset) {
                    recordset.features.map(function (feature) {
                        feature.layerName = recordset.layerName;
                        feature.type = feature.geometry.type;
                        features.push(feature);
                    })
                });

                tile.setFeatures(tile.getFormat().readFeatures(ol.supermap.Util.toGeoJSON(features)));
                tile.setProjection(new ol.proj.Projection({
                    code: 'TILE_PIXELS',
                    units: 'tile-pixels'
                }));
            });
        });
    }

    ol.source.VectorTile.call(this, {
        attributions: options.attributions,
        cacheSize: options.cacheSize,
        format: options.format || new ol.format.GeoJSON(),
        logo: options.logo,
        overlaps: options.overlaps,
        projection: options.projection,
        state: options.state,
        tileClass: options.tileClass,
        tileGrid: options.tileGrid,
        tileLoadFunction: tileLoadFunction,
        tilePixelRatio: options.tilePixelRatio,
        tileUrlFunction: tileUrlFunction,
        url: options.url,
        urls: options.urls,
        wrapX: options.wrapX !== undefined ? options.wrapX : false
    });
};
ol.inherits(ol.supermap.VectorTileSuperMapRest, ol.source.VectorTile);

ol.supermap.VectorTileSuperMapRest.optionsFromMapJSON = function (url, mapJSONObj) {
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
        };
        return scales;
    };

    options.tileGrid = new ol.tilegrid.TileGrid({
        extent: extent,
        resolutions: resolutions
    });
    return options;
};

module.exports = ol.supermap.VectorTileSuperMapRest;