import {SuperMap} from '../../SuperMap';
import {Collection} from './Collection';
import './LineString';


/**
 * @class SuperMap.Geometry.MultiLineString
 * @classdesc 几何对象多线类。
 * @category BaseTypes Geometry
 * @extends {SuperMap.Geometry.Collection}
 * @param components - {Array<SuperMap.Geometry.LineString>} LineString数组。
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
         * @member SuperMap.Geometry.MultiLineString.prototype.componentTypes -{Array<string>}
         * @description components存储的的几何对象所支持的几何类型数组,为空表示类型不受限制。
         * @readonly
         * @default ["{@link SuperMap.Geometry.LineString}"]
         */
        this.componentTypes = ["SuperMap.Geometry.LineString"];
        this.CLASS_NAME = "SuperMap.Geometry.MultiLineString";
    }


}

SuperMap.Geometry.MultiLineString = MultiLineString;