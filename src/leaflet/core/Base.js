/**
 *SuperMap Leaflet基类
 * 定义命名空间
 * 提供公共模块
 */
import L from "leaflet";
import './NonEarthCRS';
import './Proj4Leaflet';
import './ExtendsCRS';
import Attributions from './Attributions'

L.supermap = L.supermap || {};
L.supermap.control = L.supermap.control || {};

L.Control.Attribution.include({
    options: {
        position: 'bottomright',
        prefix: Attributions.Prefix
    }
});

wrapToGeoJSON([L.Polyline, L.Polygon, L.Marker, L.CircleMarker, L.Circle, L.LayerGroup]);

function wrapToGeoJSON(objClassArray) {
    for (const objClass of objClassArray) {
        objClass.defaultFunction = objClass.prototype.toGeoJSON;
        objClass.include({
            toGeoJSON: function (precision) {
                return objClass.defaultFunction.call(this, precision || 10);
            }
        })
    }

}