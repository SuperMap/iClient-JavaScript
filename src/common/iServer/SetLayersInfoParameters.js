import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.SetLayersInfoParameters
 * @category  iServer Map TempLayersSet
 * @classdesc 设置图层信息参数类
 * @param {Object} options - 参数。
 * @param {boolean} [options.isTempLayers=false] - 是否是临时图层。
 * @param {string} options.resourceID - 临时图层资源 ID。
 * @param {string} options.layersInfo - 要更新的图层信息。
 */
export class SetLayersInfoParameters {

    constructor(options) {
        options = options || {};
        /**
         * @member {boolean} [SuperMap.SetLayersInfoParameters.prototype.isTempLayers=false]
         * @description 是否是临时图层。
         */
        this.isTempLayers = null;
        /**
         * @member {string} SuperMap.SetLayersInfoParameters.prototype.resourceID
         * @description 临时图层资源 ID，
         */
        this.resourceID = null;

        /**
         * @member {Object} SuperMap.SetLayersInfoParameters.prototype.layersInfo
         * @description 要更新的图层信息。(包含修改和未修改的所有字段)。该参数可以通过图层信息服务获取，然后对返回值中 subLayers.layers[i] 图层信息属性进行修改。
         */
        this.layersInfo = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.SetLayersInfoParameters";
    }


    /**
     * @function SuperMap.SetLayersInfoParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.isTempLayers = null;
        me.resourceID = null;
        me.layersInfo = null;
    }



}

SuperMap.SetLayersInfoParameters = SetLayersInfoParameters;
