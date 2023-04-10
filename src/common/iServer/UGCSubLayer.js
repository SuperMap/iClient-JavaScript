/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {UGCMapLayer} from './UGCMapLayer';
import {JoinItem} from './JoinItem';
import {DatasetInfo} from './DatasetInfo';

/**
 * @class UGCSubLayer
 * @deprecatedclass SuperMap.UGCSubLayer
 * @category  iServer Map Layer
 * @classdesc 地图服务图层属性信息类。影像图层（Image）、专题图层（ServerTheme）、栅格图层（Grid）、矢量图层（Vector）等图层均继承该类。
 * @extends {UGCMapLayer}
 * @param {Object} options - 参数。
 * @param {DatasetInfo} options.datasetInfo - 数据集信息。
 * @param {string} [options.displayFilter] - 图层显示过滤条件。
 * @param {JoinItem} [options.joinItems] - 连接信息类。
 * @param {string} [options.representationField] - 存储制图表达信息的字段。
 * @param {LayerType} [options.ugcLayerType] - 图层类型。
 * @usage
 */
export class UGCSubLayer extends UGCMapLayer {


    constructor(options) {
        options = options || {};
        super(options);
        /**
         * @member {DatasetInfo} UGCSubLayer.prototype.datasetInfo
         * @description 数据集信息。
         */
        this.datasetInfo = null;

        /**
         * @member {string} UGCSubLayer.prototype.displayFilter
         * @description 图层显示过滤条件。
         */
        this.displayFilter = null;

        /**
         * @member {JoinItem} UGCSubLayer.prototype.joinItems
         * @description 连接信息类。
         */
        this.joinItems = null;

        /**
         * @member {string} UGCSubLayer.prototype.representationField
         * @description 存储制图表达信息的字段。
         */
        this.representationField = null;

        /**
         * @member {LayerType} UGCSubLayer.prototype.ugcLayerType
         * @description 图层类型。
         */
        this.ugcLayerType = null;

        this.CLASS_NAME = "SuperMap.UGCSubLayer";
    }


    /**
     * @function UGCSubLayer.prototype.fromJson
     * @description 将服务端 JSON 对象转换成当前客户端对象。
     * @param {Object} jsonObject - 要转换的 JSON 对象。
     */
    fromJson(jsonObject) {
        super.fromJson(jsonObject);
        if (this.datasetInfo) {
            this.datasetInfo = new DatasetInfo(this.datasetInfo);
        }
        if (this.joinItems && this.joinItems.length) {
            var newJoinItems = [];
            for (var i = 0; i < this.joinItems.length; i++) {
                newJoinItems[i] = new JoinItem(this.joinItems[i]);
            }
            this.joinItems = newJoinItems;
        }
    }

    /**
     * @function UGCSubLayer.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }


    /**
     * @function UGCSubLayer.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @returns {Object} 对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var jsonObject = super.toServerJSONObject();
        if (jsonObject.joinItems) {
            var joinItems = [];
            for (var i = 0; i < jsonObject.joinItems.length; i++) {
                if (jsonObject.joinItems[i].toServerJSONObject) {
                    joinItems[i] = jsonObject.joinItems[i].toServerJSONObject();
                }

            }
            jsonObject.joinItems = joinItems;
        }
        if (jsonObject.datasetInfo) {
            if (jsonObject.datasetInfo.toServerJSONObject) {
                jsonObject.datasetInfo = jsonObject.datasetInfo.toServerJSONObject();
            }
        }
        return jsonObject;
    }

}

