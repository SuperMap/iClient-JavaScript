import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {Theme} from './Theme';
import {ServerStyle} from './ServerStyle';

/**
 * @class SuperMap.ThemeDotDensity
 * @category  iServer Map Theme
 * @classdesc 点密度专题图。<br>
 * @description
 *              点密度专题图用一定大小、形状相同的点表示现象分布范围、数量特征和分布密度。点的多少和所代表的意义由地图的内容确定。<br>
 *              点密度专题图利用图层的某一数值属性信息（专题值）映射为不同等级，每一级别使用不同数量或表现为密度的点符号来表示。<br>
 *              该专题值在各个分区内的分布情况，体现不同区域的相对数量差异。多用于具有数量特征的地图上，<br>
 *              比如表示不同地区的粮食产量、GDP、人口等的分级，主要针对区域或面状的要素，因而，点密度专题图适用于面数据集。<br>
 *              注意：点密度专题图中点的分布是随机的，并不代表实际的分布位置。即使在相关设置完全相同的情况下，<br>
 *              每次制作出的专题图，点的数量相同，但点的位置都有差异。
 * @extends SuperMap.Theme
 * @param options - {Object} 可选参数。如：<br>
 *        dotExpression - {string} 创建点密度专题图的字段或字段表达式。<br>
 *        style - {{@link SuperMap.ServerStyle}} 点密度专题图中点的风格。<br>
 *        value - {string} 专题图中每一个点所代表的数值。<br>
 *        memoryData - {{@link SuperMap.ThemeMemoryData}} 专题图内存数据。
 */
export class ThemeDotDensity extends Theme {

    constructor(options) {
        super("DOTDENSITY", options);
        /**
         * @member SuperMap.ThemeDotDensity.prototype.dotExpression -{string}
         * @description 创建点密度专题图的字段或字段表达式。点的数目或密集程度的来源。
         */
        this.dotExpression = null;

        /**
         * @member SuperMap.ThemeDotDensity.prototype.style -{SuperMap.ServerStyle}
         * @description 点密度专题图中点的风格。
         */
        this.style =  new ServerStyle();

        /**
         * @member SuperMap.ThemeDotDensity.prototype.value -{number}
         * @description 专题图中每一个点所代表的数值。<br>
         *              点值的确定与地图比例尺以及点的大小有关。地图比例尺越大，相应的图面范围也越大，<br>
         *              点相应就可以越多，此时点值就可以设置相对小一些。点形状越大，<br>
         *              点值相应就应该设置的小一些。点值过大或过小都是不合适的。
         */
        this.value = null;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.ThemeDotDensity";
    }

    /**
     * @function SuperMap.ThemeDotDensity.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.dotExpression = null;
        me.value = null;

        if (me.style) {
            me.style.destroy();
            me.style = null;
        }
    }


    /**
     * @function SuperMap.ThemeDotDensity.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @return{Object} 对应的 JSON 格式对象
     */
    toServerJSONObject() {
        var obj = {};
        obj = Util.copyAttributes(obj, this);
        if (obj.style) {
            if (obj.style.toServerJSONObject) {
                obj.style = obj.style.toServerJSONObject();
            }
        }
        return obj;
    }

    /**
     * @function SuperMap.ThemeDotDensity.fromObj
     * @description 从传入对象获取点密度专题图中点的风格。
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ThemeDotDensity} ThemeDotDensity对象
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new ThemeDotDensity();
        Util.copy(res, obj);
        res.style = ServerStyle.fromJson(obj.style);
        return res;
    }


}

SuperMap.ThemeDotDensity = ThemeDotDensity;

