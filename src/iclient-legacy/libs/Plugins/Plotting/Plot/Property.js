/**
 * Class: SuperMap.Plot.Property
 * 自定义属性类。
 */
SuperMap.Plot.Property = new SuperMap.Class({

    /**
     * Property: key
     * {String}自定义属性的关键字
     */
    key: null,

    /**
     * Property: value
     * {String}自定义属性的值
     */
    value: null,

    initialize:function(key, value){
        if(key){
            this.key = key;
        }

        if(value){
            this.value = value;
        }
    },

    /**
     * APIMethod: setKey
     * 设置自定义属性的关键字
     *
     * Parameters:
     * key - {String} 自定义属性的关键字。
     */
    setKey:function(key){
        this.key = key;
    },

    /**
     * APIMethod: getKey
     * 获取自定义属性的关键字
     *
     * Returns:
     * {String} 返回自定义属性的关键字。
     */
    getKey:function(){
        return this.key;
    },

    /**
     * APIMethod: setValue
     * 设置自定义属性的值
     *
     * Parameters:
     * value - {Object} 自定义属性的值。
     */
    setValue:function(value){
        this.value = value;
    },

    /**
     * APIMethod: getValue
     * 获取自定义属性的值
     *
     * Returns:
     * {Object} 返回自定义属性的值。
     */
    getValue:function(){
        return this.value;
    },

    /**
     * APIMethod: destroy
     * 销毁该类，释放相关资源
     */
    destroy: function(){
        this.key = null;
        this.value = null;
    },

    CLASS_NAME:"SuperMap.Plot.Property"
});

