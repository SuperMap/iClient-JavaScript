import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.SetLayerInfoParameters
 * @category  iServer Map TempLayersSet
 * @classdesc 设置图层信息参数类.
 * @param options -{Object} 可选参数。如：<br>
 *         resourceID -{string} 临时图层的资源ID。<br>
 *         tempLayerName -{string} 临时图层下的子图层名。<br>
 *         layerInfo -{string} 要更新的图层信息。
 */
export class SetLayerInfoParameters {

    constructor(options) {
        options = options || {};
        /**
         * @member SuperMap.SetLayerInfoParameters.prototype.resourceID -{string}
         * @description 临时图层的资源ID
         */
        this.resourceID = null;

        /**
         * @member SuperMap.SetLayerInfoParameters.prototype.tempLayerName -{string}
         * @description 临时图层下子图层(或者其子图层)名,如：Countries@World.3@@World
         */
        this.tempLayerName = null;

        /**
         * @member SuperMap.SetLayerInfoParameters.prototype.layerInfo -{Object}
         * @description 要更新的图层信息。(包含修改和未修改的所有字段)。该参数可以通过图层信息服务获取，然后对返回值中subLayers.layers[i]图层信息属性进行修改。
         */
        this.layerInfo = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.SetLayerInfoParameters";
    }

    /**
     * @function SuperMap.SetLayerInfoParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.resourceID = null;
        me.tempLayerName = null;
        me.layerInfo = null;
    }

}

SuperMap.SetLayerInfoParameters = SetLayerInfoParameters;
