/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { GeoJSON as GeoJSONFormat } from '@supermap/iclient-common/format/GeoJSON';
import { GeoText } from '@supermap/iclient-common/commontypes/geometry/GeoText';
import { Vector as FeatureVector} from '@supermap/iclient-common/commontypes/Vector';
import Geometry from 'ol/geom/Geometry';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';

/**
 * @class ThemeFeature
 * @category Visualization Theme
 * @classdesc 专题图要素类。支持的 geometry 参数类型为 ol.geom.Geometry 和 GeometryGeoText 标签数组类型。
 * @modulecategory Overlay
 * @param {Object} geometry - 要量算的几何对象，支持 {@link ol.geom.Geometry} 和 GeometryGeoText 标签数组类型 geometry = [x,y,text]。
 * @param {Object} [attributes] - 属性。
 * @usage
 */
export class ThemeFeature {

    constructor(geometry, attributes) {
        this.geometry = geometry;
        this.attributes = attributes;
    }

    /**
     * @function ThemeFeature.prototype.toFeature
     * @description 转为矢量要素。
     */
    toFeature() {
        var geometry = this.geometry;
        if (geometry instanceof Geometry) {
            //先把数据属性与要素合并
            let featureOption = this.attributes;
            featureOption.geometry = geometry;
            let olFeature = new Feature(featureOption);
            return new GeoJSONFormat().read((new GeoJSON()).writeFeature(olFeature), "Feature");

        } else if (geometry.length === 3) {
            geometry = new GeoText(geometry[0], geometry[1], geometry[2]);
            return new FeatureVector(geometry, this.attributes);
        }

    }
}
