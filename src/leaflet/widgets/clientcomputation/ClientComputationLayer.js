/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import L from "leaflet";
import '../../core/Base';

/**
 * @class L.supermap.widgets.ClientComputationLayer
 * @classdesc 客户端计算图层对象。
 * @param {Object} layerObject -  图层对象。
 * @param {string} layerObject.layerName -  图层名。
 * @param {L.GeoJSON} layerObject.layer -  图层。
 * @param {Array.<string>} [layerObject.fields] - 字段数组。
 * @category Widgets ClientComputation
 */
export class ClientComputationLayer{
    constructor(layerObject){
        this.layerName = layerObject.layerName;
        this.layer = layerObject.layer;
        this.fields = layerObject.fields || null;
    }
}
export var clientComputationLayer = function(layerObject){
    return new ClientComputationLayer(layerObject)
}
L.supermap.widgets.clientComputationLayer = clientComputationLayer;
