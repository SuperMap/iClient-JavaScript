import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {UGCMapLayer} from './UGCMapLayer';
import {JoinItem} from './JoinItem';
import {DatasetInfo} from './DatasetInfo';
import '../REST';

/**
 * @class SuperMap.UGCSubLayer
 * @category  iServer Map Layer
 * @classdesc 地图服务图层属性信息类，影像图层(Image)、专题图层(ServerTheme)、栅格图层(Grid)、矢量图层(Vector)等图层均继承该类。
 * @extends SuperMap.UGCMapLayer
 * @param options - {Object} 可选参数。如：<br>
 *        datasetInfo - {{@link SuperMap.DatasetInfo}} 数据集信息。<br>
 *        displayFilter - {string} 图层显示过滤条件。<br>
 *        joinItems - {{@link SuperMap.JoinItem}} 连接信息类。<br>
 *        representationField - {string} 存储制图表达信息的字段。<br>
 *        ugcLayerType - {{@link SuperMap.LayerType}} 图层类型
 */
export class UGCSubLayer extends UGCMapLayer {


    /*
     * Constructor: SuperMap.UGCSubLayer
     * 地图服务图层属性信息类构造函数。
     。
     */
    constructor(options) {
        options = options || {};
        super(options);
        /**
         * @member SuperMap.UGCSubLayer.prototype.datasetInfo -{SuperMap.DatasetInfo}
         * @description 数据集信息。
         */
        this.datasetInfo = null;

        /**
         * @member SuperMap.UGCSubLayer.prototype.displayFilter -{string}
         * @description 图层显示过滤条件。
         */
        this.displayFilter = null;

        /**
         * @member SuperMap.UGCSubLayer.prototype.joinItems -{SuperMap.JoinItem}
         * @description 连接信息类。
         */
        this.joinItems = null;

        /**
         * @member SuperMap.UGCSubLayer.prototype.representationField -{string}
         * @description 存储制图表达信息的字段。
         */
        this.representationField = null;

        /**
         * @member SuperMap.UGCSubLayer.prototype.ugcLayerType -{SuperMap.LayerType}
         * @description 图层类型。
         */
        this.ugcLayerType = null;

        this.CLASS_NAME = "SuperMap.UGCSubLayer";
    }


    /**
     * @function SuperMap.UGCSubLayer.prototype.fromJson
     * @description 将服务端JSON对象转换成当前客户端对象
     * @param jsonObject - {Object} 要转换的 JSON 对象。
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
     * @function SuperMap.UGCSubLayer.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }


    /**
     * @function SuperMap.UGCSubLayer.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @return{Object} 对应的 JSON 格式对象。
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

SuperMap.UGCSubLayer = UGCSubLayer;
