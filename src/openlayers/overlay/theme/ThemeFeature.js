/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import ol from 'openlayers';
import {
    GeometryVector,
    GeoJSON as GeoJSONFormat,
    GeoText
} from '@supermap/iclient-common';

ol.supermap = ol.supermap || {};

/**
 * @class ol.supermap.ThemeFeature
 * @category Visualization Theme
 * @classdesc 专题图要素类。
 * @param {Object} geometry - 要量算的几何对象，支持 {@link ol.geom.Geometry} 和 GeoText 标签数组类型 geometry = [x,y,text]。
 * @param {Object} [attributes] - 属性。
 */
export class ThemeFeature {

    constructor(geometry, attributes) {
        this.geometry = geometry;
        this.attributes = attributes;
    }

    /**
     * @function ol.supermap.ThemeFeature.prototype.toFeature
     * @description 转为矢量要素。
     */
    toFeature() {
        var geometry = this.geometry;
        if (geometry instanceof ol.geom.Geometry) {
            //先把数据属性与要素合并
            let featureOption = this.attributes;
            featureOption.geometry = geometry;
            let olFeature = new ol.Feature(featureOption);
            return new GeoJSONFormat().read((new ol.format.GeoJSON()).writeFeature(olFeature), "Feature");

        } else if (geometry.length === 3) {
            geometry = new GeoText(geometry[0], geometry[1], geometry[2]);
            return new GeometryVector(geometry, this.attributes);
        }

    }
}

ol.supermap.ThemeFeature = ThemeFeature;