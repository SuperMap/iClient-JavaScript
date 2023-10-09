/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import maplibregl from 'maplibre-gl';
import MapExtendSymbol from './MapExtendSymbol';
/**
* @class WebSymbol
* @classdesc Web 符号库。SuperMap iClient for MapboxGL 通过扩展 [MapboxGL](https://docs.mapbox.com/mapbox-gl-js/api/) 的 API，实现了对 Web 符号库的支持，提供了前后端一致的 Web 符号化制图能力和自定义 Web 符号的能力。
* @category Visualization WebSymbol
* @description 
* 
* ## 初始化
* 使用Web符号资源时，通过接口指定符号资源路径。
* ```
* new maplibregl.supermap.WebSymbol().init({basePath: "./resources/symbols"});
* ```
*
* ## 新增 API
* ## maplibregl.Map.prototype.loadSymbol
* 通过[Web符号ID](../../../../../examples/maplibregl/websymbol_gallery.html)加载Web符号， 用于Map#addSymbol。
* 
* 参数名称			     |类型			 |描述  
* :----				|:---		    |:---	
* id				    |string、string[]		    |[Web符号ID](../../../../../examples/maplibregl/websymbol_gallery.html)
* callback			    |function		|在符号加载完成后调用，返回符号信息；如果有错误，则返回错误参数。
* 
* **Version:**
* 
* 11.1.1
* 
* **Example**
* ```
* // 加载单个Web符号
* map.loadSymbol('point-1', (error, symbol) => {
*       if (error) throw error;
*       // Add the loaded symbol with the ID 'point-1'.
*       map.addSymbol('point-1', symbol);
* });
*
* // 加载多个Web符号
* var symbolIds = ['point-1', 'point-2'];
* map.loadSymbol(symbolIds, (error, symbols) => {
*      symbols.forEach((symbol, index) => {
*          symbol && map.addSymbol(symbolIds[index], symbol);
*      })
* });
* ```
* 
* 
* ## maplibregl.Map.prototype.addSymbol
* 添加一个符号。该符号可以显示在地图上。Maplibre layers 的 symbol属性可以使用该符号ID。
* 
* |参数名称			     |类型			     |描述                | ||
* |----				|---		        |---			    |---|---|
* |id				    |string		        |符号ID              |||
* |symbol			    |object	            |由Maplibre Layers中的[paint](https://maplibre.org/maplibre-style-spec/layers/#paint-property)、[layout](https://maplibre.org/maplibre-style-spec/layers/#layout-property)（visibility 属性除外）组成的符号对象|||
* |                    |                   |参数名称			 |类型			     |描述  |
* |                    |                   |paint				|object		        |可选，Maplibre Layers [paint](https://maplibre.org/maplibre-style-spec/layers/#paint-property)|
* |                    |                   |layout			    |object	            |可选，Maplibre Layers [layout](https://maplibre.org/maplibre-style-spec/layers/#layout-property)（visibility 属性除外）|
* 
* **Version:**
* 
* 11.1.1
* 
* **Example**
* ```
* map.addSymbol('point-1', symbol);
* ```
* 
* 
* ## maplibregl.Map.prototype.setSymbol
* 给指定图层设置符号。
* 
* 参数名称			     |类型			 |描述
* :----				|:---		    |:---	
* layerId				|string		    |图层ID
* symbol			    |string、array		    |已经添加的符号ID（addSymbol中的符号ID), 或者[符号表达式](#expression)
* 
* **Version:**
* 
* 11.1.1
* 
* **Example**
* ```
* map.setSymbol("layerId", 'point-1');
* map.setSymbol("layerId", [
  "match",
  ["get", "DLBM"],
  "011", "line-964458", //公路用地
  "013", "line-964462", //农村道路
  "021", "line-962613", //河流水面
  "023", "line-962613", //河流水面
  "line-962613"
]);
* ```
* 
* 
* ## maplibregl.Map.prototype.hasSymbol
* 检查是否存在指定 ID 的符号。
* 
* 参数名称			     |类型			 |描述  
* :----			    |:---		    |:---	
* id			    |string		    |符号ID
* 
* **Version:**
* 
* 11.1.1
* 
* **Returns**
* 类型			   |描述  
* :---		     |:---	
* boolean		   |符号是否存在
*   
* **Example**
* ```
* const pointExists = map.hasSymbol('point-1');
* ```
* 
* 
* ## maplibregl.Map.prototype.removeSymbol
* 删除指定 ID 的符号。
* 
* 参数名称			     |类型			 |描述  
* :----				|:---		    |:---	
* id			      |string		    |已经添加的符号ID
* 
* **Version:**
* 
* 11.1.1
* 
* **Example**
* ```
* map.removeSymbol('point-1');
* ```
* 
* 
* ## maplibregl.Map.prototype.updateSymbol
* 更新指定 ID 的符号。
* 
* |参数名称			     |类型			     |描述                | ||
* |----				|---		        |---			    |---|---|
* id			      |string		    |已经添加的符号ID|||
* |symbol			  |object	      |由Maplibre Layers中的[paint](https://maplibre.org/maplibre-style-spec/layers/#paint-property)、[layout](https://maplibre.org/maplibre-style-spec/layers/#layout-property)（visibility 属性除外）组成的符号对象|||
* |             |             |参数名称			 |类型			     |描述  |
* |             |             |paint				|object		      |可选，Maplibre Layers [paint](https://maplibre.org/maplibre-style-spec/layers/#paint-property)|
* |             |             |layout			  |object	        |可选，Maplibre Layers [layout](https://maplibre.org/maplibre-style-spec/layers/#layout-property)（visibility 属性除外）|
* 
* **Version:**
* 
* 11.1.1
* 
* **Example**
* ```
* map.updateSymbol('point-1', symbol);
* ```
* 
* 
* ## maplibregl.Map.prototype.getSymbol
* 获取指定 ID 的符号信息。
* 
* 参数名称			     |类型			 |描述  
* :----			    |:---		    |:---	
* id			    |string		    |符号ID
* 
* **Version:**
* 
* 11.1.1
* 
* **Returns**
* 类型			   |描述  
* :---		     |:---	
* object	      |由Maplibre Layers中的[paint](https://maplibre.org/maplibre-style-spec/layers/#paint-property)、[layout](https://maplibre.org/maplibre-style-spec/layers/#layout-property)（visibility 属性除外）组成的符号对象
* 
* 
* **Example**
* ```
* const point1 = map.getSymbol('point-1');
* ```
* 
* 
* ## maplibregl.Map.prototype.setSymbolProperty
* 设置指定ID符号的属性值。
* 
* 参数名称			   |类型			  |描述  
* :----				    |:---		      |:---	
* id			        |string		    |符号ID
* index			      |number、null	|符号数组的index， 符号不是数组的设置为null
* name			      |string		    |属性名称
* value			      |any		      |可选，属性值
* 
* **Version:**
* 
* 11.1.1
* 
* **Example**
* ```
* map.setSymbolProperty('point-1', null, "icon-color", "black");
* map.setSymbolProperty('line-962529', 0, "line-width", 10);
* ```
* 
* 
* ## maplibregl.Map.prototype.getSymbolProperty
* 获取指定ID符号的属性值。
* 
* 参数名称			   |类型			  |描述  
* :----				    |:---		      |:---	
* id			        |string		    |符号ID
* index			      |number、null	|符号数组的index， 符号不是数组的设置为null
* name			      |string		    |属性名称
* 
* **Version:**
* 
* 11.1.1
* 
* **Returns**
* 类型			  |描述  
* :---		        |:---	
* any		        |属性值 
* 
* **Example**
* ```
* map.getSymbolProperty('point-1', null, "icon-color");
* map.getSymbolProperty('line-962529', 0, "line-width");
* ```
* 
* 
* ## 扩展 [Maplibre Layers](https://maplibre.org/maplibre-style-spec/layers/)
* 在[Maplibre Layers](https://maplibre.org/maplibre-style-spec/layers/) 属性的基础上新增了symbol 属性， 指定符号ID 或者 [符号表达式](#expression)。
* 
* **符号ID**
* ```
* map.addLayer({
*     id: "symbol",
*     source: "sourceId",
*     type: "symbol",
*     symbol: 'point-1'
* });
* ```
* ```
* map.setStyle({
*     version: 8,
*     sources: {},
*     layers: [{
*         id: "symbol",
*         source: "sourceId",
*         type: "symbol",
*         symbol: 'point-1'
*     }]
* })
* ```
* **<a id="expression">符号支持的MaplibreGL表达式</a>**
* 
* **[Match](https://maplibre.org/maplibre-style-spec/expressions/#match)**
* 
* ```
* map.addLayer({
*     id: "symbol",
*     source: "sourceId",
*     type: "symbol",
*     symbol: [
        "match",
        ["get", "DLBM"],
        "011", "line-964458", //公路用地
        "013", "line-964462", //农村道路
        "021", "line-962613", //河流水面
        "023", "line-962613", //河流水面
        "line-962613"
      ]
* });
* ```
* **[Case](https://maplibre.org/maplibre-style-spec/expressions/#case)**
* ```
* map.addLayer({
*     id: "symbol",
*     source: "sourceId",
*     type: "symbol",
*     symbol: [
        "case",
        ["all", ["<=", ["get", "dMaxZValue"], 70]], "PoPdensity_R_MAX70",
        ["all", [">", ["get", "dMaxZValue"], 70],["<=", ["get", "dMaxZValue"], 140]], "PoPdensity_R_MAX140",
        ["all", [">", ["get", "dMaxZValue"], 140],["<=", ["get", "dMaxZValue"], 210]], "PoPdensity_R_MAX210",
        ["all", [">", ["get", "dMaxZValue"], 210],["<=", ["get", "dMaxZValue"], 280]], "PoPdensity_R_MAX280",
        ["all", [">", ["get", "dMaxZValue"], 280],["<=", ["get", "dMaxZValue"], 350]], "PoPdensity_R_MAX350",
        ["all", [">", ["get", "dMaxZValue"], 350],["<=", ["get", "dMaxZValue"], 420]], "PoPdensity_R_MAX420",
        ["all", [">", ["get", "dMaxZValue"], 420],["<=", ["get", "dMaxZValue"], 490]], "PoPdensity_R_MAX490",
        ["all", [">", ["get", "dMaxZValue"], 490],["<=", ["get", "dMaxZValue"], 560]], "PoPdensity_R_MAX560",
        ["all", [">", ["get", "dMaxZValue"], 560],["<=", ["get", "dMaxZValue"], 640]], "PoPdensity_R_MAX640",
        ["all", [">", ["get", "dMaxZValue"], 640],["<=", ["get", "dMaxZValue"], 700]], "PoPdensity_R_MAX700",
        ["all", [">", ["get", "dMaxZValue"], 700],["<=", ["get", "dMaxZValue"], 770]], "PoPdensity_R_MAX770",
        ["all", [">", ["get", "dMaxZValue"], 770],["<=", ["get", "dMaxZValue"], 1000]], "PoPdensity_R_MAX1000",
        ["all", [">", ["get", "dMaxZValue"], 1000]], "PoPdensity_R_Exceed1000",
        "Country_R"
      ]
* });
* ```
* @usage
*/
export class WebSymbol {

  constructor() {
    /**
     * @member WebSymbol.prototype.defaultBasePath
     * @description 符号资源路径。
     * @private
     */
    this.defaultBasePath = './resources/symbols';
  }

  /**
   * @function WebSymbol.prototype.init
   * @description 初始化Web符号配置。
   * @version 11.1.1
   * @param {object} config - 配置信息
   * @param {string} [config.basePath] - 指定符号资源路径
   */
  init(config) {
    maplibregl.Map.prototype.basePath = config && config.basePath || this.defaultBasePath;
    MapExtendSymbol();
  }
}