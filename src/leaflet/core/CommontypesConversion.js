import L from "leaflet"
import '../core/Base';
import SuperMap from '../../common/SuperMap';

/**
 * @class L.supermap.CommontypesConversion
 * @classdesc Leaflet对象和SuperMap对象转换工具
 */
export default class CommontypesConversion {
    /**
     * @function L.supermap.CommontypesConversion.toSuperMapBounds
     * @description 将Leaflet对象得bounds转成SuperMap 的bounds对象
     * @param bounds - {L.Bounds|L.LatLngBounds} 图层显示范围
     * @return {SuperMap.Bounds} SuperMap的bounds对象
     */
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
