/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Collection} from './Collection';

/**
 * @class GeometryMultiPolygon
 * @aliasclass Geometry.MultiPolygon
 * @deprecatedclass SuperMap.Geometry.MultiPolygon
 * @classdesc 几何对象多多边形类。
 * @category BaseTypes Geometry
 * @extends GeometryCollection
 * @param  {Array.<GeometryPolygon>} components - 形成 GeometryMultiPolygon 的多边形数组。
 * @example
 * var points1 = [new GeometryPoint(10,10),new GeometryPoint(0,0)];
 * var points2 = [new GeometryPoint(10,10),new GeometryPoint(0,0),new GeometryPoint(3,3),new GeometryPoint(10,10)];
 *
 * var linearRing1 = new GeometryLinearRing(points1);
 * var linearRing2 = new GeometryLinearRing(points2);
 *
 * var polygon1 = new GeometryPolygon([linearRing1]);
 * var polygon2 = new GeometryPolygon([linearRing2]);
 *
 * var multiPolygon1 = new GeometryMultiPolygon([polygon1,polygon2]);
 * @usage
 */
export class MultiPolygon extends Collection {


    constructor(components) {
        super(components);
        /**
         * @member {Array.<string>} [GeometryMultiPolygon.prototype.componentTypes=["SuperMap.Geometry.Polygon"]]
         * @description components 存储的几何对象所支持的几何类型数组。
         * @readonly
         */
        this.componentTypes = ["SuperMap.Geometry.Polygon"];
        this.CLASS_NAME = "SuperMap.Geometry.MultiPolygon";
        this.geometryType = "MultiPolygon";
    }


}
