/**
 *矢量瓦片PBF(MVT)表述出图
 */
var L = require("leaflet");
var Pbf = require('pbf');
var VectorTileSpec = require('vector-tile');
var SuperMap = require('../../../common/SuperMap');

var VectorTilePBF = L.Class.extend({

    initialize: function (url) {
        this.url = url;
    },

    getTile: function () {
        var me = this;
        return SuperMap.Request.get(me.url, null, {
            timeout: 10000
        }).then(function (response) {
            if (!response.ok) {
                return {layers: []};
            }
            return response.blob().then(function (blob) {
                var reader = new FileReader();
                return new Promise(function (resolve) {
                    reader.addEventListener("loadend", function () {
                        var pbf = new Pbf(reader.result);
                        return resolve(new VectorTileSpec.VectorTile(pbf));
                    });
                    reader.readAsArrayBuffer(blob);
                });
            });
        }).then(function (json) {
            return me._processVectorTileSpec(json);
        });
    },

    _processVectorTileSpec: function (vectorTile) {
        var layers = [];
        for (var layerName in vectorTile.layers) {
            var feats = [];
            for (var i = 0; i < vectorTile.layers[layerName].length; i++) {
                var feat = vectorTile.layers[layerName].feature(i);
                feat.geometry = feat.loadGeometry();
                feat.layerName = layerName;
                feat.properties = {attributes: L.Util.extend({}, feat.properties), id: feat.id};
                switch (feat.type) {
                    case 1:
                        feat.type = L.supermap.VectorFeatureType.POINT;
                        break;
                    case 2:
                        feat.type = L.supermap.VectorFeatureType.LINE;
                        break;
                    case 3:
                        feat.type = L.supermap.VectorFeatureType.REGION;
                        break;
                    default:
                        break;
                }
                feats.push(feat);
            }
            var layer = {};
            layer.features = feats;
            layer.layerName = layerName;
            layer.extent = vectorTile.layers[layerName].extent;
            layers.push(layer);
        }
        return layers;
    }

});

L.supermap.vectorTilePBF = function (url) {
    return new VectorTilePBF(url);
};

module.exports = VectorTilePBF;