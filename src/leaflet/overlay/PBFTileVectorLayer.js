var Pbf = require('pbf');
var VectorTile = require('vector-tile');

L.PBFTileVectorLayer = L.VectorGrid.extend({

    options: {
        renderer: L.svg.renderer,
        subdomains: 'abc',	// Like L.TileLayer
    },

    initialize: function (url, options) {
        this._url = url;
        L.VectorGrid.prototype.initialize.call(this, options);
    },
    createTile: function (coords, done) {
        var storeFeatures = this.options.getFeatureId;

        var tileSize = this.getTileSize();
        var renderer = this.options.renderer(coords, tileSize, this.options);

        var vectorTilePromise = this._getVectorTilePromise(coords);

        if (storeFeatures) {
            this._vectorTiles[this._tileCoordsToKey(coords)] = renderer;
            renderer._features = {};
        }

        vectorTilePromise.then(function renderTile(vectorTile) {
            for (var layerName in vectorTile.layers) {
                this._dataLayerNames[layerName] = true;
                var layer = vectorTile.layers[layerName];

                var pxPerExtent = this.getTileSize().divideBy(layer.extent);

                var layerStyle = this.options.vectorTileLayerStyles[layerName] ||
                    L.Path.prototype.options;

                for (var i = 0; i < layer.features.length; i++) {
                    var feat = layer.features[i];
                    var id;

                    var styleOptions = layerStyle;
                    if (storeFeatures) {
                        id = this.options.getFeatureId(feat);
                        var styleOverride = this._overriddenStyles[id];
                        if (styleOverride) {
                            if (styleOverride[layerName]) {
                                styleOptions = styleOverride[layerName];
                            } else {
                                styleOptions = styleOverride;
                            }
                        }
                    }

                    if (styleOptions instanceof Function) {
                        styleOptions = styleOptions(feat.properties, coords.z);
                    }

                    if (!(styleOptions instanceof Array)) {
                        styleOptions = [styleOptions];
                    }

                    if (!styleOptions.length) {
                        continue;
                    }

                    var featureLayer = this._createLayer(feat, pxPerExtent);

                    for (var j = 0; j < styleOptions.length; j++) {
                        var style = L.extend({}, L.Path.prototype.options, styleOptions[j]);
                        featureLayer.render(renderer, style);
                        renderer._addPath(featureLayer);
                    }

                    if (this.options.interactive) {
                        featureLayer.makeInteractive();
                    }

                    if (storeFeatures) {
                        renderer._features[id] = {
                            layerName: layerName,
                            feature: featureLayer
                        };
                    }
                }

            }
            if (this._map != null) {
                renderer.addTo(this._map);
            }
            L.Util.requestAnimFrame(done.bind(coords, null, null));
        }.bind(this));

        return renderer.getContainer();
    },
    _getSubdomain: L.TileLayer.prototype._getSubdomain,
    _createLayer: function (feat, pxPerExtent, layerStyle) {
        var layer;
        switch (feat.type) {
            case 1:
                layer = new L.PointSymbolizer(feat, pxPerExtent);
                break;
            case 2:
                layer = new L.LineSymbolizer(feat, pxPerExtent);
                break;
            case 3:
                layer = new L.RegionSymbolizer(feat, pxPerExtent);
                break;
        }

        if (this.options.interactive) {
            layer.addEventParent(this);
        }

        return layer;
    },
    _getVectorTilePromise: function (coords) {
        var data = {
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: coords.z
// 			z: this._getZoomForUrl()	/// TODO: Maybe replicate TileLayer's maxNativeZoom
        };
        if (this._map && !this._map.options.crs.infinite) {
            var invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) { // Should this option be available in Leaflet.VectorGrid?
                data['y'] = invertedY;
            }
            data['-y'] = invertedY;
        }

        var tileUrl = L.Util.template(this._url, L.extend(data, this.options));

        return fetch(tileUrl).then(function (response) {

            if (!response.ok) {
                return {layers: []};
            }

            return response.blob().then(function (blob) {
                var reader = new FileReader();
                return new Promise(function (resolve) {
                    reader.addEventListener("loadend", function () {
                        var pbf = new Pbf(reader.result);
                        return resolve(new VectorTile.VectorTile(pbf));

                    });
                    reader.readAsArrayBuffer(blob);
                });
            });
        }).then(function (json) {

            for (var layerName in json.layers) {
                var feats = [];

                for (var i = 0; i < json.layers[layerName].length; i++) {
                    var feat = json.layers[layerName].feature(i);
                    feat.geometry = feat.loadGeometry();
                    feats.push(feat);
                }

                json.layers[layerName].features = feats;
            }

            return json;
        });
    }
});

L.pbfTileVectorLayer = function (url, options) {
    return new L.PBFTileVectorLayer(url, options);
};

