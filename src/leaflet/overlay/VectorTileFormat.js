import L from "leaflet";
import '../core/Base';

/**
 * @constant L.supermap.vectorTileFormat
 * @category Visualization TileVector
 * @classdesc 矢量瓦片格式
 */
export var VectorTileFormat = {
    JSON: "JSON",
    MVT: "MVT",
    PBF: "PBF"
};

L.supermap.VectorTileFormat = VectorTileFormat;