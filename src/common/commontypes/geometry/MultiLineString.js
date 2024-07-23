/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Collection} from './Collection';
import './LineString';


/**
 * @class GeometryMultiLineString
 * @aliasclass Geometry.MultiLineString
 * @deprecatedclass SuperMap.Geometry.MultiLineString
 * @classdesc 几何对象多线类。
 * @category BaseTypes Geometry
 * @extends GeometryCollection
 * @param {Array.<GeometryLineString>} components - GeometryLineString 数组。
 * @example
 * var multi = new GeometryMultiLineString([
 *      new GeometryLineString([
 *          new GeometryPoint(1, 0),
 *          new GeometryPoint(0, 1)
 *      ])
 *  ]);
 * @usage
 */
export class MultiLineString extends Collection {


    constructor(components) {
        super(components);
        /**
         * @member {Array.<string>} [GeometryMultiLineString.prototype.componentTypes=["SuperMap.Geometry.LineString"]]
         * @description components 存储的几何对象所支持的几何类型数组。
         * @readonly
         */
        this.componentTypes = ["SuperMap.Geometry.LineString"];
        this.CLASS_NAME = "SuperMap.Geometry.MultiLineString";
        this.geometryType = "MultiLineString";
    }


}
