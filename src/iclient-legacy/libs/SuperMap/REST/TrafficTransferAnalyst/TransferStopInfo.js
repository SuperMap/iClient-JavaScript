/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ResourceInfo.js
 */

/**
 * Class: SuperMap.REST.TransferStopInfo
 *  公交站点信息类。该类用于描述公交站点的信息，包括所属的数据集、SmID、ID、名称以及别名。 
 */
SuperMap.REST.TransferStopInfo = SuperMap.Class({
    /** 
     * APIProperty: alias
     * {String} 公交站点别名。
     */
    alias: null,

    /** 
     * APIProperty: id
     * {Integer} 公交站点的 SmID。
     */
    id: null,

    /** 
     * APIProperty: name
     * {String} 公交站点名称。
     */
    name: null,
    
    /** 
     * APIProperty: position
     * {<SuperMap.LonLat>} 公交站点坐标。
     */
    position: null,
    /** 
     * APIProperty: stopID
     * {String} 公交站点ID。
     */
    stopID: null,
    /**
     * Constructor: SuperMap.REST.TransferStopInfo
     * 公交站点信息类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * alias - {String} 公交站点别名。 
     * id - {Integer} 公交站点的 SmID。 
     * name - {String)} 公交站点名称
     * position - {<SuperMap.LonLat>} 公交站点坐标
     * stopID - {String)} 公交站点 ID。
     */
    initialize: function(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        var me = this;
        me.alias = null;
        me.id = null;
        me.name = null;
        me.position = null;
        me.stopID = null;
    },
    
    CLASS_NAME: "SuperMap.REST.TransferStopInfo"
});

/**
 * Function: SuperMap.REST.TransferStopInfo.fromJson
 * 将要素集更新时表示的返回结果转化为 TransferStopInfo 对象。 
 *
 * Parameters:
 * jsonObject - {Object} 新创建要素的返回结果。 
 *
 * Returns:
 * {<SuperMap.REST.TransferStopInfo>} 转化后的 TransferStopInfo 对象。
 */
SuperMap.REST.TransferStopInfo.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    return new SuperMap.REST.TransferStopInfo({
        alias: jsonObject['alias'],
        id: jsonObject['id'],
        name: jsonObject['name'],
        position: jsonObject['position'],
        stopID: jsonObject['stopID']
    });
};
