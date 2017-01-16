/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.Format
 * 读写各种格式的格式类基类。其子类应该包含并实现read和write方法。
 */
SuperMap.Format = SuperMap.Class({
    
    /**
     * Property: options
     * {Object} A reference to options passed to the constructor.
     */
    options: null,
    
    /**
     * APIProperty: externalProjection
     * {<SuperMap.Projection>} 当设置了externalProjection和internalProjection参数，
     *     format类会重新对其读到的或写出的几何图形进行投影。externalProjection
     *     是read操作读到或write操作写出的投影内容。为了能够重新投影，针对某
     *     一个投影的transformation方法必须是有效的。同时，我们可以使用proj4js
     *     或自定义的transformation方法来进行支持。查看{<SuperMap.Projection.addTransform>}
     *     以获取更多的信息。
     */
    externalProjection: null,

    /**
     * APIProperty: internalProjection
     * {<SuperMap.Projection>}  当设置了externalProjection和internalProjection参数，
     *     format类会重新对其读到的或写出的几何图形进行投影。internalProjection
     *     是read操作返回或传给write操作的投影内容。为了能够重新投影，针对某
     *     一个投影的transformation方法必须是有效的。同时，我们可以使用proj4js
     *     或自定义的transformation方法来进行支持。查看{<SuperMap.Projection.addTransform>}
     *     以获取更多的信息。
     */
    internalProjection: null,

    /**
     * APIProperty: data
     * {Object} 当 <keepData> 属性设置为true，这是传递给<read>操作的要被
     *      解析的字符串。
     */
    data: null,

    /**
     * APIProperty: keepData
     * {Object} 保持最近读到的数据的引用（通过 <data> 属性）。默认值是false。
     */
    keepData: false,

    /**
     * Constructor: SuperMap.Format
     * 直接实例化这个类没有实际作用，可以通过实例化其子类来进行操作。
     *
     * Parameters:
     * options - {Object} 选项对象，其属性会被直接设置到format实例。
     *
     * Valid options:
     * keepData - {Boolean} 如果设置为true， <data> 属性会指向被解析的对象。
     *     （例如json或xml数据对象）。
     *
     * Returns:
     * 返回 <SuperMap.Format> 实例。
     */
    initialize: function(options) {
        SuperMap.Util.extend(this, options);
        this.options = options;
    },
    
    /**
     * APIMethod: destroy
     * 销毁该格式类，释放相关资源。
     */
    destroy: function() {
    },

    /**
     * Method: read
     * Read data from a string, and return an object whose type depends on the
     * subclass. 
     * 
     * Parameters:
     * data - {string} Data to read/parse.
     *
     * Returns:
     * Depends on the subclass
     */
    read: function(data) {
    },
    
    /**
     * Method: write
     * Accept an object, and return a string. 
     *
     * Parameters:
     * object - {Object} Object to be serialized
     *
     * Returns:
     * {String} A string representation of the object.
     */
    write: function(object) {
    },

    CLASS_NAME: "SuperMap.Format"
});     
