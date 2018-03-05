import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import './LayerStatus';

/**
 * @class SuperMap.SetLayerStatusParameters
 * @category  iServer Map TempLayersSet
 * @classdesc 子图层显示控制参数类,该类存储了各子图层是否可见的状态。<br>
 *               注意在 SuperMap iClient 系列产品中所说的图层与 SuperMap Deskpro 的地图对应，子图层与 SuperMap Deskpro 的图层对应。
 * @param options - {Object} 可选参数。如：<br>
 *        layerStatusList - {Array<{@link SuperMap.LayerStatus}>} 获取或设置图层可见状态（{@link SuperMap.LayerStatus}）集合，必设属性。
 *                         集合中的每个 {@link SuperMap.LayerStatus} 对象代表一个子图层的可视状态。<br>
 *        holdTime - {string} 获取或设置资源在服务端保存的时间。<br>
 *        resourceID - {string} 获取或设置资源服务 ID。
 */
export class SetLayerStatusParameters {

    constructor(options) {
        /**
         * @member SuperMap.SetLayerStatusParameters.prototype.layerStatusList -{Array<SuperMap.LayerStatus>}
         * @description 获取或设置图层可见状态（SuperMap.LayerStatus）集合，必设属性。<br>
         *                集合中的每个 SuperMap.LayerStatus 对象代表一个子图层的可视状态。
         */
        this.layerStatusList = [];

        /**
         * @member SuperMap.SetLayerStatusParameters.prototype.holdTime -{number}
         * @description 获取或设置资源在服务端保存的时间。 默认为 15 分钟。
         */
        this.holdTime = 15;

        /**
         * @member SuperMap.SetLayerStatusParameters.prototype.resourceID -{string}
         * @description 获取或设置资源服务 ID 。非必设参数，如果设置该参数则会在指定的 TempLayer 进行图层的显示控制；<br>
         *                如果不设置该参数，则会首先创建一个 TempLayer ，然后在新创建的 TempLayer 进行图层的显示控制。
         */
        this.resourceID = null;

        if (options) {
            Util.extend(this, options);
        }


    }

    /**
     * @function SuperMap.SetLayerStatusParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.layerStatusList = null;
        me.holdTime = null;
        me.resourceID = null;
    }

    /**
     * @function SuperMap.SetLayerStatusParameters.prototype.toJSON
     * @description 生成json。
     * @return{Object} 对应的json对象
     */
    toJSON() {
        var json = '{';
        json += '"layers":[';
        var v = [];
        for (var i = 0, len = this.layerStatusList.length; i < len; i++) {
            v.push(this.layerStatusList[i].toJSON());
        }

        json += v;
        json += ']';
        json += '}';

        return json;
    }

}

SuperMap.SetLayerStatusParameters = SetLayerStatusParameters;