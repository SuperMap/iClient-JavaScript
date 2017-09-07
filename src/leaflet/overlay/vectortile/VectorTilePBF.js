import L from "leaflet";
import Pbf from 'pbf';
import VectorTileSpec from 'vector-tile';
import SuperMap from '../../../common/SuperMap';
import {VectorFeatureType} from './VectorFeatureType';

/**
 * @class L.supermap.VectorTilePBF
 * @classdesc 矢量瓦片PBF(MVT)表述出图
 * @private
 * @extends L.Class{@linkdoc-leaflet/#class}
 * @param url - {string} 矢量瓦片PBF(MVT)表述出图服务地址
 */
export var VectorTilePBF = L.Class.extend({

    initialize: function (url) {
        this.url = url;
    },

    /**
     * @function L.supermap.VectorTilePBF.prototype.getTile
     * @description 获取瓦片PBF(MVT)
     * @return {Promise}
     */
    getTile: function () {
        var me = this;
        return SuperMap.FetchRequest.get(me.url, null, {
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
                        feat.type = VectorFeatureType.POINT;
                        break;
                    case 2:
                        feat.type = VectorFeatureType.LINE;
                        break;
                    case 3:
                        feat.type = VectorFeatureType.REGION;
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
