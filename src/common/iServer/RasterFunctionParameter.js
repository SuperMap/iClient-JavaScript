/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class RasterFunctionParameter
 * @deprecatedclass SuperMap.RasterFunctionParameter
 * @category iServer Map Tile
 * @classdesc SuperMap iServer 地图服务栅格分析参数基类。此类存储了各种栅格分析的参数，栅格分析类型包括：归一化植被指数分析、阴影面分析等。<br>
 * 归一化植被指数分析：归一化植被指数是一种标准化的指数，被用于影像的植被提取，在农业、林业、城市规划等行业得到了广泛应用。
 * 该指数利用了来自多光谱栅格数据的两个波段特征的对比：红色波段（R）的叶绿素色素吸收和近红外波段（NIR）的植物物质的高反射率。红色和红外波段的差异反射可以监测绿色植被生长的密度和强度。绿叶在近红外波段的反射通常比在可见光波段的反射更好。
 * 当叶片受到水分胁迫、患病或死亡时，它们会变得更黄，近红外范围内的反射也会明显减弱。云、水和雪在可见范围内的反射比在近红外范围内的反射要好，而岩石和裸地的反射差几乎为零。<br>
 * 阴影面分析：HILLSHADE 即山体阴影，山体阴影图是通过模拟实际地表的本影与落影的方式反映地形起伏状况的栅格图。
 * 通过采用假想的光源照射地表，结合栅格数据集得到的坡度坡向信息，得到各像元的灰度值，面向光源的斜坡的灰度值较高，背向光源的灰度值较低，即为阴影区，从而形象表现出实际地表的地貌和地势。
 * @param {Object} options - 参数。
 * @param {RasterFunctionType} options.type - 栅格分析方法。
 * @usage
 */
export class RasterFunctionParameter {
    constructor(options) {
        options = options || {};

        /**
         * @member {RasterFunctionType} [RasterFunctionParameter.prototype.type]
         * @description 栅格分析方法。包括：归一化植被指数分析、阴影面分析等。
         */
        this.type = null;

        Util.extend(this, options);
        this.CLASS_NAME = 'SuperMap.RasterFunctionParameter';
    }

    /**
     * @function RasterFunctionParameter.prototype.destroy
     * @description 释放资源，将资源的属性置空。
     */
    destroy() {
        this.type = null;
    }
}

