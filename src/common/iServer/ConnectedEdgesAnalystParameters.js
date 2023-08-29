/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class ConnectedEdgesAnalystParameters
 * @deprecatedclass SuperMap.ConnectedEdgesAnalystParameters
 * @category iServer NetworkAnalyst ConnectedEdges
 * @classdesc 连通性分析参数类。
 * @version 11.1.1
 * @param {Object} options - 参数。
 * @param {boolean} [options.connected] - 查询是否相连通的弧段。为 true 时，查询相连通的弧段；为 false 时，查询不连通的弧段。
 * @param {boolean} [options.returnFeatures=true] - 是否返回结果要素的详细描述信息。若为 false，只返回结果要素的 ID 集合。
 * @param {Array.<number>} [options.edgeIDs] - 分析结果的连通弧段 ID 的集合。
 * @param {Array.<number>} [options.nodeIDs] - 分析结果的连通结点 ID 的集合。
 * @param {boolean} [options.withIndex=true] - 当使用 FlatGeobuf 表述时该参数可选。表示返回的表述为 FlatGeobuf 的结果是否包含空间索引，默认为true。
 * @usage
 */
export class ConnectedEdgesAnalystParameters {

    constructor(options) {
        /**
         * @member {boolean} [ConnectedEdgesAnalystParameters.prototype.connected]
         * @description 查询是否相连通的弧段。为 true 时，查询相连通的弧段；为 false 时，查询不连通的弧段。
         */
        this.connected = null;

        /**
         * @member {boolean} [ConnectedEdgesAnalystParameters.prototype.returnFeatures=true]
         * @description 是否返回结果要素的详细描述信息。若为 false，只返回结果要素的 ID 集合。
         */
        this.returnFeatures = true;

        /**
         * @member {Array.<number>} [ConnectedEdgesAnalystParameters.prototype.edgeIDs]
         * @description 分析结果的连通弧段 ID 的集合。
         */
        this.edgeIDs = null;

        /**
         * @member {Array.<number>} [ConnectedEdgesAnalystParameters.prototype.nodeIDs]
         * @description 分析结果的连通结点 ID 的集合。
         */
        this.nodeIDs = null;

        /**
         * @member {boolean} [ConnectedEdgesAnalystParameters.prototype.withIndex]
         * @description 当使用 FlatGeobuf 表述时该参数可选。表示返回的表述为 FlatGeobuf 的结果是否包含空间索引，默认为true。
         */
        this.withIndex = null;

        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.ConnectedEdgesAnalystParameters";
    }


    /**
     * @function ConnectedEdgesAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.edgeIDs = null;
        me.nodeIDs = null;
        me.connected = null;
        me.returnFeatures = null;
        me.withIndex = null;
    }

}
