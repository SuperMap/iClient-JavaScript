require('../../base');

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
            unit = Unit.DEGREE;
        }
        if (unit === 'm') {
            unit = Unit.METER;
        }
        var scale = ol.supermap.Util.resolutionToScale(resolution, dpi, unit);
        var tileSize = ol.size.toSize(this.tileGrid.getTileSize(z, this.tmpSize));
        return layerUrl + "&x=" + x + "&y=" + y + "&width=" + tileSize[0] + "&height=" + tileSize[1] + "&scale=" + scale + "&origin={'x':" + origin[0] + ",'y':" + origin[1] + "}";
    }

    function tileLoadFunction(tile, tileUrl) {
        tile.setLoader(function () {
            fetch(tileUrl).then(function (response) {
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
                        if (feature.type === 'TEXT') {
                            feature.textStyle = feature.geometry.textStyle;
                        }
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
        var unit = Unit.METER;
        if (mapJSONObj.coordUnit === Unit.DEGREE) {
            unit = Unit.DEGREE;
        }
        if (mapJSONObj.visibleScales.length > 0) {
            for (var i = 0; i < mapJSONObj.visibleScales.length; i++) {
                resolutions.push(ol.supermap.Util.scaleToResolution(mapJSONObj.visibleScales[i], dpi, unit));
            }
        } else {
            for (var i = 0; i < level; i++) {
                resolutions.push(maxReolution / Math.pow(2, i));
            }
        }
        return resolutions;
    }

    options.tileGrid = new ol.tilegrid.TileGrid({
        extent: extent,
        resolutions: resolutions
    });
    return options;
};

module.exports = ol.supermap.VectorTileSuperMapRest;