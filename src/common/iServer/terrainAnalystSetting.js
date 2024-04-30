/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {Util} from '../commontypes/Util';
 import {BoundsType, CellSizeType} from '../REST';
 
 /**
  * @class terrainAnalystSetting
  * @deprecatedclass SuperMap.terrainAnalystSetting
  * @category SpatialAnalyst TerrainCalculation
  * @classdesc 地形分析基本的环境设置类。
  * @param {Object} options - 参数。
  * @param {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} [options.bounds] - 结果数据集的地理范围。只有 BoundType 为 CUSTOM 时才有效。
  * @param {BoundsType} [options.boundsType=BoundsType.MAX] - 分析结果数据集范围类型。
  * @param {number} [options.cellSize] - 结果数据集的单元格大小。当单元格类型为 CUSTOM 时有效。
  * @param {CellSizeType} [options.cellSizeType=CellSizeType.UNION] - 结果数据集的单元格类型。
  * @usage
  */
 export class terrainAnalystSetting {
 
     constructor(options) {
 
         /**
          * @member {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} [terrainAnalystSetting.prototype.bounds]
          * @description 结果数据集的地理范围。只有 BoundType 为 CUSTOM 时才有效。
          */
         this.bounds = null;
 
         /**
          * @member {BoundsType} [terrainAnalystSetting.prototype.boundsType]
          * @description 分析结果数据集范围类型。
          */
         this.boundsType = BoundsType.MAX;
 
         /**
          * @member {DataReturnMode} [terrainAnalystSetting.prototype.cellSize]
          * @description 结果数据集的单元格大小。当单元格类型为 CUSTOM 时有效。
          */
         this.cellSize = null;
 
         /**
          * @member {boolean} [terrainAnalystSetting.prototype.cellSizeType]
          * @description 结果数据集的单元格类型。
          */
         this.cellSizeType = CellSizeType.UNION;
 
         Util.extend(this, options);
         this.CLASS_NAME = "SuperMap.terrainAnalystSetting";
     }
 
     /**
      * @function terrainAnalystSetting.prototype.destroy
      * @description 释放资源，将引用资源的属性置空。
      */
     destroy() {
         var me = this;
         me.bounds = null;
         me.boundsType = null;
         me.cellSize = null;
         me.cellSizeType = null;
     }
 }
 