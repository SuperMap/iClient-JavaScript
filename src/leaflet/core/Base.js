/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import './Proj4Leaflet';
import Attributions from './Attributions';

L.Control.Attribution.include({
    options: {
        position: 'bottomright',
        prefix: Attributions.Prefix
    }
});
L.Map.include({
    /*
     * 获取精确的像素坐标.
     * 当需要绘制比较平滑的曲线的时候可调用此方法代替latLngToContainerPoint
     * @param latlng
     */
    latLngToAccurateContainerPoint: function (latlng) {
        var projectedPoint = this.project(L.latLng(latlng));
        var layerPoint = projectedPoint._subtract(this.getPixelOrigin());
        return L.point(layerPoint).add(this._getMapPanePos());
    }
});
wrapToGeoJSON([L.Polyline, L.Polygon, L.Marker, L.CircleMarker, L.Circle, L.LayerGroup]);

function wrapToGeoJSON(objClassArray) {
    objClassArray.map((objClass) => {
        objClass.defaultFunction = objClass.prototype.toGeoJSON;
        objClass.include({
            toGeoJSON: function (precision) {
                return objClass.defaultFunction.call(this, precision || L.toGeoJSONPrecision || 15);
            }
        })
        return objClass;
    })

}