/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import { Util } from '../commontypes/Util';
import FieldsFilter from './FieldsFilter';
import Sortby from './Sortby';

/**
 * @class ImageSearchParameter
 * @deprecatedclass SuperMap.ImageSearchParameter
 * @classdesc 影像服务查询参数类。
 * @category iServer Image
 * @param {Object} options - 可选参数。
 * @param {Array.<number>} [options.bbox] 指定查询范围。只有具有几何对象（geometry）属性的Features，并且该几何对象与该参数指定的范围相交的 Features 才会被选择出来。该参数可以包含4个数值或者6个数值，这取决于使用的坐标参考系统是否包含高程值：  * 左下角坐标轴 1 的值 * 左下角坐标轴 2 的值 * 坐标轴 3 的最小值（可选） * 右上角坐标轴 1 的值 * 右上角坐标轴 2 的值 * 坐标轴 3 的最大值（可选）  坐标参考系统为 WGS 84 经度/纬度 (http://www.opengis.net/def/crs/OGC/1.3/CRS84)。对于 “WGS 84 经度/纬度” 坐标参考系统，该参数值的格式通常为：最小经度,最小纬度,最大经度,最大纬度。如果包含了高程值，该参数的格式为：最小经度,最小纬度,最小高程值,最大经度,最大纬度,最大高程值。如果一个 Feature 具有多个空间几何对象（geometry）属性，由服务器决定是否使用单一的空间几何对象属性，还是使用所有相关的几何对象作为最终的查询空间范围。
 * @param {Array.<string>} [options.collections] 影像集合的ID数组，将在该指定的Collection中搜索Items。
 * @param {Array.<string>} [options.ids] 只返回指定 Item 的 ID 数组中的Item。返回的 Item 的 ID 值数组。设置了该参数，所有其他过滤器参数（除了next和limit）将被忽略。
 * @param {number} [options.limit] 返回的最大结果数，即响应文档包含的 Item 的数目。
 * @param {FieldsFilter} [options.fields] 通过‘include’和‘exclude’属性分别指定哪些字段包含在查询结果的 Feature 描述中，哪些需要排除。返回结果中的stac_version，id，bbox，assets，links，geometry，type，properties这些字段为必须字段，若要返回结果中不含这种字段信息，需要显示地进行排除设置，如：排除geometry和bbox字段；在POST请求中，则需要将这些字段添加到“exclude”字段中，例如： "fields": { "exclude": ["geometry","bbox"] } } 。而对于返回的“properties”对象中的扩展字段内容，可以将字段前添加到‘include’字段中，如： "fields": { "include": ["properties.SmFileName","properties.SmHighPS"] } ，表示properties.SmFileName和properties.SmHighPS 属性都包含在查询结果中。
 * @param {Object} [options.query] 定义查询哪些属性，查询运算符将应用于这些属性。运算符包括：eq、neq、gt、lt、gte、lte、startsWith、endsWith、contains、in。其中in是Array.<string>类型，例如：{ "SmFileName": { "eq":"B49C001002.tif" }}
 * @param {Array.<Sortby>} [options.sortby] 由包含属性名称和排序规则的对象构成的数组。
 * @usage
 */
export default class ImageSearchParameter {
    constructor(options) {
        /**
         * @description 指定查询范围。只有具有几何对象（geometry）属性的Features，并且该几何对象与该参数指定的范围相交的 Features 才会被选择出来该参数可以包含4个数值或者6个数值，这取决于使用的坐标参考系统是否包含高程值：  * 左下角坐标轴 1 的值 * 左下角坐标轴 2 的值 * 坐标轴 3 的最小值（可选） * 右上角坐标轴 1 的值 * 右上角坐标轴 2 的值 * 坐标轴 3 的最大值（可选）  坐标参考系统为 WGS 84 经度/纬度 (http://www.opengis.net/def/crs/OGC/1.3/CRS84).  对于 “WGS 84 经度/纬度” 坐标参考系统，该参数值的格式通常为：最小经度,最小纬度,最大经度,最大纬度。如果包含了高程值，该参数的格式为：最小经度,最小纬度,最小高程值,最大经度,最大纬度,最大高程值。如果一个 Feature 具有多个空间几何对象（geometry）属性，由服务器决定是否使用单一的空间几何对象属性，还是使用所有相关的几何对象作为最终的查询空间范围。
         * @member {Array.<number>} ImageSearchParameter.prototype.bbox
         */
        this.bbox = undefined;
        /**
         * @description 影像集合的ID数组，将在该指定的Collection中搜索Items。
         * @member {Array.<string>} ImageSearchParameter.prototype.collections
         */
        this.collections = undefined;
        /**
         * @description 返回的 Item 的 ID 值数组。设置了该参数，所有其他过滤器参数（除了next和limit）将被忽略。
         * @member {Array.<string>} ImageSearchParameter.prototype.ids
         */
        this.ids = undefined;
        /**
         * @description 单页返回的最大结果数。最小值为1，最大值为10000。
         * @member {number} ImageSearchParameter.prototype.limit
         */
        this.limit = undefined;
        /**
         * @description 通过‘include’和‘exclude’属性分别指定哪些字段包含在查询结果的 Feature 描述中，哪些需要排除。返回结果中的stac_version，id，bbox，assets，links，geometry，type，properties这些字段为必须字段，若要返回结果中不含这种字段信息，需要显示地进行排除设置，如：排除geometry和bbox字段；在POST请求中，则需要将这些字段添加到“exclude”字段中，例如： "fields": { "exclude": ["geometry","bbox"] } } 。而对于返回的“properties”对象中的扩展字段内容，可以将字段前添加到‘include’字段中，如： "fields": { "include": ["properties.SmFileName","properties.SmHighPS"] } } ，表示properties.SmFileName和properties.SmHighPS 属性都包含在查询结果中。
         * @member {FieldsFilter} ImageSearchParameter.prototype.fields
         */
        this.fields = undefined;
        /**
         * @description 定义查询哪些属性，查询运算符将应用于这些属性。
         * @member {Object} ImageSearchParameter.prototype.query
         */
        this.query = undefined;
        /**
         * @description 由包含属性名称和排序规则的对象构成的数组。
         * @member {Array.<Sortby>} ImageSearchParameter.prototype.sortby
         */
        this.sortby = undefined;

        this.CLASS_NAME = 'SuperMap.ImageSearchParameter';
        Util.extend(this, options);
    }

    /**
     * @function ImageSearchParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.bbox = undefined;
        me.collections = undefined;
        me.ids = undefined;
        me.limit = undefined;
        me.fields = undefined;
        me.query = undefined;
        me.sortby = undefined;
    }

    /**
     * @function ImageSearchParameter.prototype.constructFromObject
     * @description 目标对象新增该类的可选参数。
     * @param {Object} data 要转换的数据。
     * @param {ImageSearchParameter} obj 返回的模型。
     * @return {ImageSearchParameter} 返回结果。
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ImageSearchParameter();
            if (data.hasOwnProperty('bbox')) {
                obj.bbox = data.bbox;
            }
            if (data.hasOwnProperty('collections')) {
                obj.collections = data.collections;
            }
            if (data.hasOwnProperty('ids')) {
                obj.ids = data.ids;
            }
            if (data.hasOwnProperty('limit')) {
                obj.limit = data.limit;
            }
            if (data.hasOwnProperty('fields')) {
                obj.fields = (FieldsFilter.constructFromObject && FieldsFilter.constructFromObject(data.fields, {})) || data.fields;
            }
            if (data.hasOwnProperty('query')) {
                obj.query = data.query;
            }
            if (data.hasOwnProperty('sortby')) {
                obj.sortby = data.sortby;
                if (data.sortby) {
                    obj.sortby = data.sortby.map((item) => {
                        return (Sortby.constructFromObject && Sortby.constructFromObject(item, {})) || item;
                    });
                }
            }
        }
        return obj;
    }
}
