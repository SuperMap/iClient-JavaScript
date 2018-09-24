/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import L from "leaflet";
import '../../core/Base';

/**
 * @class L.supermap.widgets.GeoJSONLayersWithName
 * @classdesc 含有 layerName 与 GeoJSON 图层的对象。
 * @param {Object} layerObject - 图层对象。
 * @param {string} layerObject.layerName -  图层名。
 * @param {L.GeoJSON} layerObject.layer -  图层。
 * @category Widgets Common
 */
export class GeoJSONLayersWithName {
    constructor(layerObject) {
        this.layerName = layerObject.layerName;
        this.layer = layerObject.layer;
    }
}

L.supermap.widgets.GeoJSONLayersWithName = GeoJSONLayersWithName;
