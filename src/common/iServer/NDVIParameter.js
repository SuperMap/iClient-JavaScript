/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { Util } from '../commontypes/Util';
import { RasterFunctionParameter } from './RasterFunctionParameter';
import { RasterFunctionType } from '../REST';

/**
 * @class SuperMap.NDVIParameter
 * @category iServer Map
 * @classdesc 归一化植被指数参数类
 * @param {Object} options - 参数。
 * @param {number} [options.redIndex=0] - 红光谱波段索引。
 * @param {number} [options.nirIndex=1] - 近红外光谱波段索引。
 * @param {string} [options.colorMap="0:ffffe5ff;0.1:f7fcb9ff;0.2:d9f0a3ff;0.3:addd8eff;0.4:78c679ff;0.5:41ab5dff;0.6:238443ff;0.7:006837ff;1:004529ff"] - 颜色表。由栅格的中断值和颜色停止之间的映射组成的，如0.3->d9f0a3ff 指的是[0,0.3)显示d9f0a3ff。仅单波段数据时设定。
 * @extends {SuperMap.RasterFunctionParameter}
 */
export class NDVIParameter extends RasterFunctionParameter {
    constructor(options) {
        super(options);
        /**
         * @member {number} [SuperMap.NDVIParameter.prototype.redIndex=0]
         * @description 红光谱波段索引。
         */
        this.redIndex = 0;

        /**
         * @member {number} [SuperMap.NDVIParameter.prototype.nirIndex=1]
         * @description 近红外光谱波段索引。
         */
        this.nirIndex = 1;

        /**
         * @member {string} [SuperMap.NDVIParameter.prototype.colorMap="0:ffffe5ff;0.1:f7fcb9ff;0.2:d9f0a3ff;0.3:addd8eff;0.4:78c679ff;0.5:41ab5dff;0.6:238443ff;0.7:006837ff;1:004529ff"]
         * @description 颜色表。由栅格的中断值和颜色停止之间的映射组成的，如0.3->d9f0a3ff 指的是[0,0.3)显示d9f0a3ff。仅单波段数据时设定。
         */
        this.colorMap =
            '0:ffffe5ff;0.1:f7fcb9ff;0.2:d9f0a3ff;0.3:addd8eff;0.4:78c679ff;0.5:41ab5dff;0.6:238443ff;0.7:006837ff;1:004529ff';

        /**
         * @member {SuperMap.RasterFunctionType} [SuperMap.RasterFunctionParameter.prototype.type]
         * @description 栅格分析方法。
         */
        this.type = RasterFunctionType.NDVI;
        Util.extend(this, options);

        this.CLASS_NAME = 'SuperMap.NDVIParameter';
    }

    /**
     * @function SuperMap.NDVIParameter.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        this.redIndex = null;
        this.nirIndex = null;
        this.colorMap = null;
    }
    /**
     * @function SuperMap.NDVIParameter.prototype.toJSON
     * @description 将 NDVIParameter 对象转化为 JSON 字符串。
     * @returns {string} 返回转换后的 JSON 字符串。
     */
    toJSON() {
        return {
            redIndex: this.redIndex,
            nirIndex: this.nirIndex,
            colorMap: this.colorMap,
            type: this.type
        };
    }
}

SuperMap.NDVIParameter = NDVIParameter;
