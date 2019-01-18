/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import {Collection} from './Collection';
import './LineString';


/**
 * @class SuperMap.Geometry.MultiLineString
 * @classdesc 几何对象多线类。
 * @category BaseTypes Geometry
 * @extends {SuperMap.Geometry.Collection}
 * @param {Array.<SuperMap.Geometry.LineString>} components - LineString 数组。
 * @example
 * var multi = new SuperMap.Geometry.MultiLineString([
 *      new SuperMap.Geometry.LineString([
 *          new SuperMap.Geometry.Point(1, 0),
 *          new SuperMap.Geometry.Point(0, 1)
 *      ])
 *  ]);
 */
export class MultiLineString extends Collection {


    constructor(components) {
        super(components);
        /**
         * @member {Array.<string>} [SuperMap.Geometry.MultiLineString.prototype.componentTypes=["SuperMap.Geometry.LineString"]]
         * @description components 存储的的几何对象所支持的几何类型数组。
         * @readonly
         */
        this.componentTypes = ["SuperMap.Geometry.LineString"];
        this.CLASS_NAME = "SuperMap.Geometry.MultiLineString";
        this.geometryType = "MultiLineString";
    }


}

SuperMap.Geometry.MultiLineString = MultiLineString;