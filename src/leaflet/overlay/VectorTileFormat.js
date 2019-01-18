/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';

/**
 * @constant L.supermap.vectorTileFormat
 * @category Visualization TileVector
 * @classdesc 矢量瓦片格式。
 */
export var VectorTileFormat = {
    JSON: "JSON",
    MVT: "MVT",
    PBF: "PBF"
};

L.supermap.VectorTileFormat = VectorTileFormat;