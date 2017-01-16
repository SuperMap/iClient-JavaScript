/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Projection.js
 * @requires SuperMap/Bounds.js
 */

/**
 * Class: SuperMap.REST.DatasetInfo
 * 数据集信息类。
 * 数据集一般为存储在一起的相关数据的集合；根据数据类型的不同，分为矢量数据集、栅格数据集(grid 
 * dataset)和影像数据集(image dataset)，以及为了处理特定问题而设计的数据集，如拓扑数据集，网络数据集等。
 * 
 * 数据集是 GIS 数据组织的最小单位。其中矢量数据集是由同种类型空间要素组成的集合，
 * 所以也可以称为要素集。根据要素的空间特征的不同，矢量数据集又分为点数据集，
 * 线数据集，面数据集等，各矢量数据集是空间特征和性质相同的数据组织起来的集合。
 * 
 * 目前版本支持的数据集主要有点数据集，线数据集，面数据集，文本数据集，复合数据集（CAD 
 * 数据集）、网络数据集，栅格数据集(grid dataset)和影像数据集(image dataset)。
 */
SuperMap.REST.DatasetInfo = SuperMap.Class({
    
    /** 
     * APIProperty: bounds
     * {<SuperMap.Bounds>} 数据集范围，该字段只读。  
     */
    bounds: null,  
    
    /** 
     * APIProperty: dataSourceName
     * {String} 数据源名称，该字段只读。   
     */
    dataSourceName: null,  
    
    /** 
     * APIProperty: description
     * {String} 数据集的描述信息。  
     */
    description: null,   
    
    /** 
     * APIProperty: encodeType
     * {String} 数据集存储时的压缩编码方式，该字段只读。  
     */
    encodeType: null,   
    
    /** 
     * APIProperty: isReadOnly
     * {Boolean} 数据集是否为只读。 
     */
    isReadOnly: null,  
    
    /** 
     * APIProperty: name
     * {String} 数据集名称，该字段必须且只读。  
     */
    name: null,   
    
    /** 
     * APIProperty: prjCoordSys
     * {<SuperMap.Projection>} 数据集的投影信息。  
     */
    prjCoordSys: null,   
    
    /** 
     * APIProperty: tableName
     * {String} 表名，该字段只读。  
     */
    tableName: null,   
    
    /** 
     * APIProperty: type
     * {String} 数据集类型，该字段必设。主要有点数据集，线数据集，面数据集，文本数据集，复合数据集（CAD   
     * 数据集）、网络数据集，栅格数据集(grid dataset)和影像数据集(image dataset)。 
     */
    type: null,   

    /**
     * Constructor: SuperMap.REST.DatasetInfo
     * 数据集信息类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * bounds - {<SuperMap.Bounds>} 数据集范围，该字段只读。 
     * dataSourceName - {String} 数据源名称，该字段只读。
     * description - {String} 数据集的描述信息。
     * encodeType - {String} 数据集存储时的压缩编码方式，该字段只读。   
     * isReadOnly - {Boolean} 数据集是否为只读。
     * name - {String} 数据集名称，该字段必须且只读。 
     * prjCoordSys - {<SuperMap.Projection>} 数据集的投影信息。 
	 * tableName - {String} 表名，该字段只读。 
     * type - {String} 数据集类型，该字段必设。主要有点数据集，线数据集，面数据集，文本数据集，复合数据集（CAD   
     * 数据集）、网络数据集，栅格数据集(grid dataset)和影像数据集(image dataset)。
     */    
    initialize: function(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
        var b = this.bounds;
        if(b) {
            this.bounds = new SuperMap.Bounds(b.leftBottom.x, b.leftBottom.y,b.rightTop.x,b.rightTop.y);
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。  
     */
    destroy: function() {
        SuperMap.Util.reset(this);
    },
    
    /**
     * Method: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function(){
        var dataObj = {};
        dataObj = SuperMap.Util.copyAttributes(dataObj, this);
        if(dataObj.bounds){
            if(dataObj.bounds.toServerJSONObject){
                dataObj.bounds = dataObj.bounds.toServerJSONObject();
            }
        }
        return dataObj;
    },
    
    CLASS_NAME: "SuperMap.REST.DatasetInfo"
});
