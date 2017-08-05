/*
 Leaflet对象和SuperMap对象转换工具
 */
import L from "leaflet"
import '../core/Base';
import SuperMap from '../../common/SuperMap';
export default class CommontypesConversion {
   static toSuperMapBounds(bounds) {
        if (bounds instanceof L.LatLngBounds) {
            return new SuperMap.Bounds(
                bounds.getSouthWest().lng,
                bounds.getSouthWest().lat,
                bounds.getNorthEast().lng,
                bounds.getNorthEast().lat
            );
        }
        if (bounds instanceof L.Bounds) {
            return new SuperMap.Bounds(
                bounds.min.x,
                bounds.min.y,
                bounds.max.x,
                bounds.max.y
            );
        }
        return new SuperMap.Bounds();
    }
}
L.supermap.CommontypesConversion = CommontypesConversion;
