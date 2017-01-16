/**
 * Class: SuperMap.Plot.ExtendProperty
 * 标绘对象的自定义属性类，维护 <SuperMap.Plot.Property> 的列表。
 */
SuperMap.Plot.ExtendProperty = new SuperMap.Class({
    /**
     * Property: properties
     * {<Array(<SuperMap.Plot.Property>)}自定义属性列表
     */
    properties: null,

    initialize:function(options){
        this.properties = [];
    },

    /**
     * APIMethod: addProperty
     * 添加用户自定义属性,如果属性已存在，则修改相应的属性值
     *
     * Parameters:
     * key - {String} 属性的关键字。
     * value - {String} 属性的值。
     *
     * Returns:
     * {Boolean} 添加属性是否成功，如果以存在key的自定义属性，则添加失败，返回false，成功返回true。
     */
    addProperty:function(key,value){
        var property = this.findProperty(key);
        if(null == property)
        {
            this.properties.push(new SuperMap.Plot.Property(key, value));
        }
        else
        {
            property.setValue(value);
        }

        return true;
    },

    /**
     * APIMethod: deleteProperty
     * 删除用户自定义属性
     *
     * Parameters:
     * key - {String} 属性的关键字。

     * Returns:
     * {Boolean} 删除属性是否成功，成功返回true，失败返回false。
     */
    deleteProperty:function(key){
        for(var i = 0; i < this.properties.length; i++){
            if(this.properties[i].key === key){
                this.properties.slice(i, 1);
                return true;
            }
        }
        return false;
    },

    /**
     * APIMethod: findProperty
     * 查找用户自定义属性
     *
     * Parameters:
     * key - {String} 属性的关键字。

     * Returns:
     * {Property} 查找成功则返回查找到的自定义属性Property，否则返回null。
     */
    findProperty:function(key){
        for(var i = 0; i < this.properties.length; i++){
            if(this.properties[i].key === key){
                return this.properties[i];
            }
        }
        return null;
    },

    /**
     * APIMethod: getPropertyValue
     * 根据索引值查找用户自定义属性的值
     *
     * Parameters:
     * key - {String} 属性的关键字。

     * Returns:
     * {String} 查找成功则返回查找到的自定义属性的值，否则返回null。
     */
    getPropertyValue:function(key){
        for(var i = 0; i < this.properties.length; i++){
            if(this.properties[i].key === key){
                return this.properties[i].value;
            }
        }
        return null;
    },

    /**
     * APIMethod: getPropertyByIndex
     * 根据索引值查找用户自定义属性
     *
     * Parameters:
     * index - {Int} 属性的索引值。

     * Returns:
     * {Property} 查找成功则返回查找到的自定义属性Property，否则返回null。
     */
    getPropertyByIndex:function(index){
        if(index < this.properties.length){
            return this.properties[index];
        }

        return null;
    },

    /**
     * APIMethod: getPropertyCount
     * 返回自定义属性个数
     *
     * Returns:
     * {Integer} 返回自定义属性个数。
     */
    getPropertyCount:function(){
        return this.properties.length;
    },

    /**
     * APIMethod: destroy
     * 销毁该类，释放相关资源
     */
    destroy: function(){
        this.properties = null;
    },

    CLASS_NAME:"SuperMap.Plot.ExtendProperty"
});