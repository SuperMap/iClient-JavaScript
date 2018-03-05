import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.SetLayersInfoParameters
 * @category  iServer Map TempLayersSet
 * @classdesc 设置图层信息参数类
 * @param options -{Object} 可选参数。如：<br>
 *        isTempLayers -{boolean} 是否是临时图层。<br>
 *        resourceID -{string} 临时图层资源ID。<br>
 *        layersInfo -{string} 要更新的图层信息。
 */
export class SetLayersInfoParameters {

    constructor(options) {
        options = options || {};
        /**
         * @member SuperMap.SetLayersInfoParameters.prototype.isTempLayers -{boolean}
         * @description 是否是临时图层。
         */
        this.isTempLayers = null;
        /**
         * @member SuperMap.SetLayersInfoParameters.prototype.resourceID -{string}
         * @description 临时图层资源ID，
         */
        this.resourceID = null;

        /**
         * @member SuperMap.SetLayersInfoParameters.prototype.layersInfo -{Object}
         * @description 要更新的图层信息。(包含修改和未修改的所有字段)。该参数可以通过图层信息服务获取，然后对返回值中subLayers.layers[i]图层信息属性进行修改。
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
