/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Collection} from './Collection';

/**
 * @class MultiPolygon
 * @aliasclass Geometry.MultiPolygon
 * @deprecatedclass SuperMap.Geometry.MultiPolygon
 * @classdesc 几何对象多多边形类。
 * @category BaseTypes Geometry
 * @extends {Collection}
 * @param  {Array.<Polygon>} components - 形成 MultiPolygon 的多边形数组。
 * @example
 * var points1 = [new GeometryPoint(10,10),new GeometryPoint(0,0)];
 * var points2 = [new GeometryPoint(10,10),new GeometryPoint(0,0),new GeometryPoint(3,3),new GeometryPoint(10,10)];
 *
 * var linearRing1 = new LinearRing(points1);
 * var linearRing2 = new LinearRing(points2);
 *
 * var polygon1 = new Polygon([linearRing1]);
 * var polygon2 = new Polygon([linearRing2]);
 *
 * var multiPolygon1 = new MultiPolygon([polygon1,polygon2]);
 * @usage
 */
export class MultiPolygon extends Collection {


    constructor(components) {
        super(components);
        /**
         * @member {Array.<string>} [MultiPolygon.prototype.componentTypes=["SuperMap.Geometry.Polygon"]]
         * @description components 存储的的几何对象所支持的几何类型数组。
         * @readonly
         */
        this.componentTypes = ["SuperMap.Geometry.Polygon"];
        this.CLASS_NAME = "SuperMap.Geometry.MultiPolygon";
        this.geometryType = "MultiPolygon";
    }


}
