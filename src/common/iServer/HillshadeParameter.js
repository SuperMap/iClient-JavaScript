/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { RasterFunctionParameter } from './RasterFunctionParameter';
import { RasterFunctionType } from '../REST';

/**
 * @class HillshadeParameter
 * @deprecatedclass SuperMap.HillshadeParameter
 * @category iServer Map
 * @classdesc 阴影面分析参数类
 * @param {Object} options - 可选参数。
 * @param {number} [options.altitude=45] - 高于地平线的光源高度角。高度角由正度数表示，0 度代表地平线，而 90 度代表头顶正上方。
 * @param {number} [options.azimuth=315] - 光源的方位角。方位角由0到360度之间的正度数表示，以北为基准方向按顺时针进行测量。
 * @param {number} [options.zFactor=1] - 一个表面 z 单位中地面 x,y 单位的数量。z 单位与输入表面的 x,y 单位不同时，可使用 z 因子调整 z 单位的测量单位。计算最终输出表面时，将用 z 因子乘以输入表面的 z 值。
 *                                       z 单位与输入表面的 x,y 单位不同时，可使用 z 因子调整 z 单位的测量单位。计算最终输出表面时，将用 z 因子乘以输入表面的 z 值。
 *                                      如果 x,y 单位和 z 单位采用相同的测量单位，则 z 因子为 1。这是默认设置。
 *                                      如果 x,y 单位和 z 单位采用不同的测量单位，则必须将 z 因子设置为适当的因子，否则会得到错误的结果。例如，如果 z 单位是英尺而 x,y 单位是米，则应使用 z 因子 0.3048 将 z 单位从英尺转换为米（1 英尺 = 0.3048 米）。
 *                                      如果输入栅格位于球面坐标系中（如十进制度球面坐标系），则生成的山体阴影可能看起来很独特。这是因为水平地面单位与高程 z 单位之间的测量值存在差异。由于经度的长度随着纬度而变化，因此需要为该纬度指定一个适当的 z 因子。如果 x,y 单位是十进制度而 Z 单位是米，特定纬度的一些合适的 Z 因子为：
 *                                      Latitude     Z-factor
 *                                      0           0.00000898
 *                                      10           0.00000912
 *                                      20           0.00000956
 *                                      30           0.00001036
 *                                      40           0.00001171
 *                                      50           0.00001395
 *                                      60           0.00001792
 *                                      70           0.00002619
 *                                      80           0.00005156
 * @extends {RasterFunctionParameter}
 * @usage
 */
export class HillshadeParameter extends RasterFunctionParameter {
    constructor(options) {
        super(options);
        /**
         * @member {number} [HillshadeParameter.prototype.altitude = 45]
         * @description 高于地平线的光源高度角。高度角由正度数表示，0 度代表地平线，而 90 度代表头顶正上方。
         */
        this.altitude = 45;

        /**
         * @member {number} [HillshadeParameter.prototype.azimuth = 315]
         * @description 光源的方位角。方位角由0到360度之间的正度数表示，以北为基准方向按顺时针进行测量。
         */
        this.azimuth = 315;

        /**
         * @member {number} [HillshadeParameter.prototype.zFactor = 1]
         * @description 一个表面 z 单位中地面 x,y 单位的数量。z 单位与输入表面的 x,y 单位不同时，可使用 z 因子调整 z 单位的测量单位。计算最终输出表面时，将用 z 因子乘以输入表面的 z 值。
         */
        this.zFactor = 1;

        /**
         * @member {RasterFunctionType} HillshadeParameter.prototype.type
         * @description 栅格分析方法。
         */
        this.type = RasterFunctionType.HILLSHADE;
        Util.extend(this, options);

        this.CLASS_NAME = 'SuperMap.HillshadeParameter';
    }

    /**
     * @function HillshadeParameter.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        this.altitude = null;
        this.azimuth = null;
        this.zFactor = null;
    }
    /**
     * @function HillshadeParameter.prototype.toJSON
     * @description 将 HillshadeParameter 对象转化为 JSON 字符串。
     * @returns {string} 返回转换后的 JSON 字符串。
     */
    toJSON() {
        return {
            altitude: this.altitude,
            azimuth: this.azimuth,
            zFactor: this.zFactor,
            type: this.type
        };
    }
}

