/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ResourceInfo.js
 */

/**
 * Class: SuperMap.REST.TransferGuide
 * 交通换乘导引类。交通换乘导引记录了从换乘分析起始站点到终止站点的交通换乘导引方案。
 * 交通换乘导引由交通换乘导引子项（TransferGuideItem 类型对象）构成，每一个导引子项可以表示一段换乘或者步行线路。
 * 通过本类型可以返回交通换乘导引对象中子项的个数，根据序返回交通换乘导引的子项对象，导引总距离以及总花费等。
 */
SuperMap.REST.TransferGuide = SuperMap.Class({
    /** 
     * APIProperty: count
     * {Integer} 返回交通换乘导引对象中子项的个数。
     */
    count: null,

    /** 
     * APIProperty: items
     * {Array(<SuperMap.REST.TransferGuideItem>)} 根据指定的序号返回交通换乘导引中的子项对象。
     */
    items: null,

    /** 
     * APIProperty: totalDistance
     * {Number}  返回交通换乘导引的总距离，即当前换乘方案的总距离。
     */
    totalDistance: null,

    /** 
     * APIProperty: transferCount
     * {Integer} 返回交通换乘次数，因为中途可能有步行的子项，所以交通换乘次数不能根据 TransferGuide.getCount() 
     * 来简单计算。
     */
    transferCount: null,
    /**
     * Constructor: SuperMap.REST.TransferGuide
     * 交通换乘导引类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * count - {Integer} 返回交通换乘导引对象中子项的个数。
     * transferCount - {Integer} 返回交通换乘次数，因为中途可能有步行的子项，所以交通换乘次数不能根据
     * TransferGuide.getCount() 来简单计算。 
     * totalDistance - {Number} 返回交通换乘导引的总距离，即当前换乘方案的总距离。
     * items - {Array(<SuperMap.REST.TransferGuideItem>)} 根据指定的序号返回交通换乘导引中的子项对象。 
     */
    initialize: function(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        SuperMap.Util.reset(this);
    },
    
    CLASS_NAME: "SuperMap.REST.TransferGuide"
});

/**
 * Function: SuperMap.REST.TransferGuide.fromJson
 * 将返回结果转化为 TransferGuide 对象。 
 *
 * Parameters:
 * jsonObject - {Object} 新的返回结果。 
 *
 * Returns:
 * {<SuperMap.REST.TransferGuide>} 转化后的 TransferGuide 对象。
 */
SuperMap.REST.TransferGuide.fromJson = function(json) {
    if (!json) {
        return;
    }
    var items = [], 
        res = json.items, 
        len = res ? res.length : 0,
        item;
    
    for(var i = 0; i < len; i++) {
        item = SuperMap.REST.TransferGuideItem.fromJson(res[i]);
        items.push(item);
    }
    
    return new SuperMap.REST.TransferGuide({
        count: json['count'], 
        transferCount: json['transferCount'],
        totalDistance: json['totalDistance'],
        items: items
    });
};
