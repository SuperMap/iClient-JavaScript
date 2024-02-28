/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../../core/Base';
import { Vector } from '@supermap/iclient-common/commontypes/Vector';
import { Point } from '@supermap/iclient-common/commontypes/geometry/Point';
import { GeoText } from '@supermap/iclient-common/commontypes/geometry/GeoText';
import {Util} from '../../core/Util';

/**
 * @class ThemeFeature
 * @category  Visualization Theme
 * @classdesc 专题图要素类。支持的 geometry 参数类型为 GeoJSONObject。
 * @param {GeoJSONObject} geometry - 专题图要素几何对象。
 * @param {Object} [attributes] - 几何对象属性。
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
        var geometry = Util.toSuperMapGeometry(this.geometry);
        var points = [];
        if (this.geometry instanceof mapboxgl.LngLat) {
            points = [this.geometry.lng, this.geometry.lat];
        } else if (this.geometry instanceof mapboxgl.Point) {
            points = [this.geometry.x, this.geometry.y];
        } else if (this.geometry.length === 3) {
            geometry = new GeoText(this.geometry[0], this.geometry[1], this.geometry[2]);
        }
        if (points.length > 1) {
            geometry = new Point(points[0], points[1]);
        }
        return new Vector(geometry, this.attributes);
    }
}
