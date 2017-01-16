/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 *
 */

/**
 * Class: SuperMap.REST.ColorDictionary
 * 颜色对照表类。
 *
 * 颜色对照表中的键名为具体的高程值，键值表示该高程值要显示的颜色。
 * 对于栅格图层中高程值小于颜色对照表中高程最小值的点使用颜色对照表中高程最小值对应的颜色，
 * 对于栅格图层中高程值大于颜色对照表中高程最大值的点使用颜色对照表中高程最大值对应的颜色，
 * 对于栅格图层中高程值在颜色对照表中没有对应颜色的点，则查找颜色对照表中与当前高程值相邻的两个高程对应的颜色，
 * 然后通过渐变运算要显示的颜色。如果设置了颜色对照表的话，则颜色表设置无效。  
 */
SuperMap.REST.ColorDictionary = SuperMap.Class({
    
    /** 
     * APIProperty: elevation
     * {Number} 高程值。  
     */
    elevation: null,  
    
    /** 
     * APIProperty: color
     * {<SuperMap.REST.ServerColor>} 服务端颜色类。   
     */
    color: null,  
    
    initialize: function(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
        
        var me = this,
            c = me.color;
        if(c) {
            me.color = new SuperMap.REST.ServerColor(c.red, c.green, c.blue);
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
        return dataObj;
    },
    
    CLASS_NAME: "SuperMap.REST.ColorDictionary"
});
