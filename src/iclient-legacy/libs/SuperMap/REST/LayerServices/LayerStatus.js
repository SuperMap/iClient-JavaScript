/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.LayerStatus
 * 子图层显示参数类.。
 * 该类存储了各个子图层的名字和是否可见的状态。
 *
 */
SuperMap.REST.LayerStatus = SuperMap.Class({

    /**
     * APIProperty: layerName
     * {String} 获取或设置图层名称。必设属性。。
     */
    layerName: null,

    /**
     * APIProperty: isVisible
     * {Boolean} 获取或设置图层是否可见，true 表示可见。必设属性。
     */
    isVisible: null,

    /**
     * APIProperty: displayFilter
     * {String} 图层显示 SQL 过滤条件，如 layerStatus.displayFilter = "smid < 10"，表示仅显示 smid 值小于 10 的对象。
     */
    displayFilter: null,

    /**
     * APIProperty: fieldValuesDisplayFilter
     * {Object} 图层要素的显示和隐藏的过滤属性，其带有三个属性，分别是:values、fieldName、fieldValuesDisplayMode,他们的作用如下：
     * values：{Array<Number>} - 就是要过滤的值；
     * fieldName：{String} - 要过滤的字段名称 只支持数字类型的字段；
     * fieldValuesDisplayMode：{String} 目前有两个DISPLAY/DISABLE。当为DISPLAY时，表示只显示以上设置的相应属性值的要素，否则表示不显示以上设置的相应属性值的要素
     * */
    fieldValuesDisplayFilter:null,

    /**
     * Constructor: SuperMap.REST.LayerStatus
     *
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * layerName - {String} 获取或设置图层名称。
     * isVisible - {Boolean} 获取或设置图层是否可见，true 表示可见。
     * displayFilter - {String} 图层显示 SQL 过滤条件。
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
        me.layerName = null;
        me.isVisible = null;
        me.displayFilter = null;
    },

    /**
     * Method: toJSON
     * 生成对应的json。
     */
    toJSON:function(){
        var json = '{';
        json += '"type":"UGC",';
        var v = [];
        if (this.layerName) {
            v.push('"name":"' + this.layerName + '"');
            v.push('"visible":' + this.isVisible);
        }

        if (this.displayFilter) {
            v.push('"displayFilter":"' + this.displayFilter + '"');
        }

        if(this.minScale||this.minScale==0){
            v.push('"minScale":' + this.minScale );
        }

        if(this.maxScale||this.maxScale==0){
            v.push('"maxScale":' + this.maxScale);
        }

        if(this.fieldValuesDisplayFilter){
            v.push('"fieldValuesDisplayFilter":'+SuperMap.Util.toJSON(this.fieldValuesDisplayFilter));
        }

        json += v;
        json += '}';

        return json;
    },

    CLASS_NAME: "SuperMap.REST.LayerStatus"
})