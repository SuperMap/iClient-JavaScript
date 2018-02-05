import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.LayerStatus
 * @category  iServer Map Theme 
 * @classdesc 子图层显示参数类。
 * @description 该类存储了各个子图层的名字和是否可见的状态。
 * @param options - {Object} 可选参数。如：<br>
 *        layerName - {string} 获取或设置图层名称。<br>
 *        isVisible - {boolean} 获取或设置图层是否可见，true 表示可见。<br>
 *        displayFilter - {string} 图层显示 SQL 过滤条件。
 */
export class LayerStatus {

    constructor(options) {
        /**
         * @member SuperMap.LayerStatus.prototype.layerName -{string}
         * @description 获取或设置图层名称。必设属性。
         */
        this.layerName = null;

        /**
         * @member SuperMap.LayerStatus.prototype.isVisible -{boolean}
         * @description 获取或设置图层是否可见，true 表示可见。必设属性。
         */
        this.isVisible = null;

        /**
         * @member SuperMap.LayerStatus.prototype.displayFilter -{string}
         * @description 图层显示 SQL 过滤条件，如 layerStatus.displayFilter = "smid < 10"，表示仅显示 smid 值小于 10 的对象。
         */
        this.displayFilter = null;

        /**
         * @member SuperMap.LayerStatus.prototype.fieldValuesDisplayFilter -{Object}
         * @description 图层要素的显示和隐藏的过滤属性，其带有三个属性，分别是:values、fieldName、fieldValuesDisplayMode,他们的作用如下：<br>
         *              values：{Array<number>} - 就是要过滤的值；<br>
         *              fieldName：{string} - 要过滤的字段名称 只支持数字类型的字段；<br>
         *              fieldValuesDisplayMode：{string} 目前有两个DISPLAY/DISABLE。当为DISPLAY时，表示只显示以上设置的相应属性值的要素，否则表示不显示以上设置的相应属性值的要素
         */
        this.fieldValuesDisplayFilter = null;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.LayerStatus";
    }

    /**
     * @function SuperMap.LayerStatus.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.layerName = null;
        me.isVisible = null;
        me.displayFilter = null;
    }


    /**
     * @function SuperMap.LayerStatus.prototype.toJSON
     * @description 生成对应的json。
     * @return {Object} 对应的json
     */
    toJSON() {
        var json = '{';
        json += '"type":"UGC",';
        var v = [];
        if (this.layerName) {
            v.push('"name":"' + this.layerName + '"');
            v.push('"visible":' + this.isVisible);
        }

        if (this.displayFilter) {
            v.push('"displayFilter":"' + this.displayFilter + '"');
        }

        if (this.minScale || this.minScale == 0) {
            v.push('"minScale":' + this.minScale);
        }

        if (this.maxScale || this.maxScale == 0) {
            v.push('"maxScale":' + this.maxScale);
        }

        if (this.fieldValuesDisplayFilter) {
            v.push('"fieldValuesDisplayFilter":' + Util.toJSON(this.fieldValuesDisplayFilter));
        }

        json += v;
        json += '}';

        return json;
    }

}

SuperMap.LayerStatus = LayerStatus;