/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class SuperMap.ClipParameter
 * @category iServer SpatialAnalyst InterpolationAnalyst
 * @classdesc 用于裁剪的参数。
 * @description 优先使用用户指定的裁剪区域多边形进行裁剪，也可以通过指定数据源和数据集名，从而使用指定数据集的边界多边形进行裁剪。
 * @param {Object} options - 参数。 
 * @param {string} [options.clipDatasetName] - 裁剪的数据集名。 
 * @param {string} [options.clipDatasourceName] - 裁剪的数据集所在数据源的名字。 
 * @param {(SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON)} [options.clipRegion] - 用户指定的裁剪区域。 
 * @param {boolean} [options.isClipInRegion=true] - 是否对裁剪区内的数据集进行裁剪。 
 * @param {boolean} [options.isExactClip=true] - 是否使用精确裁剪。
 */
export class ClipParameter {


    constructor(options) {
        /**
         * @member {string} SuperMap.ClipParameter.prototype.clipDatasetName
         * @description 用于裁剪的数据集名，clipDatasetName 与 clipRegion 必须设置一个。
         */
        this.clipDatasetName = null;

        /**
         * @member {string} SuperMap.ClipParameter.prototype.clipDatasourceName
         * @description 用于裁剪的数据集所在数据源的名字。当 clipRegion 不设置时起作用。
         */
        this.clipDatasourceName = null;

        /**
         * @member {(SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON)} SuperMap.ClipParameter.prototype.clipRegion
         * @description 用户指定的裁剪区域，优先使用，clipDatasetName 与 clipRegion 必须设置一个。 
         */
        this.clipRegion = null;

        /**
         * @member {boolean} [SuperMap.ClipParameter.prototype.isClipInRegion=true]
         * @description 是否对裁剪区内的数据集进行裁剪。若为 true，则对裁剪区域内的结果进行裁剪，若为 false，则对裁剪区域外的结果进行裁剪。 
         */
        this.isClipInRegion = true;

        /**
         * @member {boolean} [SuperMap.ClipParameter.prototype.isExactClip=true]
         * @description 是否使用精确裁剪。
         */
        this.isExactClip = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ClipParameter";
    }


    /**
     * @function SuperMap.ClipParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.clipDatasetName = null;
        me.clipDatasourceName = null;
        me.clipRegion = null;
        me.isClipInRegion = null;
        me.isExactClip = null;
    }


    /**
     * @function SuperMap.ClipParameter.prototype.toJSON
     * @description 将 ClipParameter 对象转化为 JSON 字符串。
     * @returns {string} 返回转换后的 JSON 字符串。
     */
    toJSON() {
        return Util.toJSON({
            isClipInRegion: this.isClipInRegion,
            clipDatasetName: this.clipDatasetName,
            clipDatasourceName: this.clipDatasourceName,
            isExactClip: this.isExactClip,
            clipRegion: ServerGeometry.fromGeometry(this.clipRegion)
        });
    }

}

SuperMap.ClipParameter = ClipParameter;