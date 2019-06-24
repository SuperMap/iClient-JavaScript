/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import L from "leaflet";
import '../../core/Base';

/**
 * @class L.supermap.widgets.geoJSONLayerWithName
 * @classdesc 含有 layerName 与 GeoJSON 图层的对象。
 * @private
 * @param {Object} layerObject - 图层对象。
 * @param {string} layerName -  图层名。
 * @param {L.GeoJSON} layer -  图层。
 * @category Components Common
 */
export class GeoJSONLayerWithName {
    constructor(layerName, layer) {
        this.layerName = layerName;
        this.layer = layer;
    }
}

export var geoJSONLayerWithName = function (layerName, layer) {
    return new GeoJSONLayerWithName(layerName, layer);
};

L.supermap.widgets.geoJSONLayerWithName = geoJSONLayerWithName;