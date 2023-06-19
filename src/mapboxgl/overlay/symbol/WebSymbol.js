import mapboxgl from "mapbox-gl";
import './MapExtendSymbol';
/**
* @class WebSymbol
* @deprecatedclass SuperMap.WebSymbol
* @category WebSymbol
* @classdesc 符号库。
* @usage
*/
export class WebSymbol {

  /**
   * @private
   * @member WebSymbol.prototype.symbolUrl
   * @description 符号资源路径。
   */
  defaultBasePath = './resources/symbols';

  /**
   * @function WebSymbol.prototype.init
   * @param {string} id - 符号ID。
   * @description 获取符号信息。
   * @returns {object} 符号信息。
   */
  init(config) {
    mapboxgl.Map.prototype.basePath = config?.basePath ?? this.defaultBasePath;
  }

}  