var SuperMap = require('../SuperMap');

/**
 * @class SuperMap.Format
 * @description 读写各种格式的格式类基类。其子类应该包含并实现read和write方法。
 * @param options - {Object} 选项对象，其属性会被直接设置到format实例。如：<br>
 *        keepData - {Boolean} 如果设置为true， <data> 属性会指向被解析的对象（例如json或xml数据对象）。
 * @return {SuperMap.Format} 实例。
 */
SuperMap.Format = SuperMap.Class({

    /**
     * @member SuperMap.Format.prototype.options -{Object}
     * @description A reference to options passed to the constructor.
     */
    options: null,

    /**
     * @member SuperMap.Format.prototype.externalProjection -{SuperMap.Projection}
     * @description 当设置了externalProjection和internalProjection参数，
     *              format类会重新对其读到的或写出的几何图形进行投影。externalProjection
     *              是read操作读到或write操作写出的投影内容。为了能够重新投影，针对某
     *              一个投影的transformation方法必须是有效的。同时，我们可以使用proj4js
     *              或自定义的transformation方法来进行支持。查看{SuperMap.Projection.addTransform}
     *              以获取更多的信息。
     */
    externalProjection: null,

    /**
     * @member SuperMap.Format.prototype.internalProjection -{SuperMap.Projection}
     * @description 当设置了externalProjection和internalProjection参数，
     *              format类会重新对其读到的或写出的几何图形进行投影。internalProjection
     *              是read操作返回或传给write操作的投影内容。为了能够重新投影，针对某
     *              一个投影的transformation方法必须是有效的。同时，我们可以使用proj4js
     *              或自定义的transformation方法来进行支持。查看{SuperMap.Projection.addTransform}
     *              以获取更多的信息。
     */
    internalProjection: null,

    /**
     * @member SuperMap.Format.prototype.data -{Object}
     * @description 当 <keepData> 属性设置为true，这是传递给<read>操作的要被解析的字符串。
     */
    data: null,

    /**
     * APIProperty: keepData
     * @member SuperMap.Format.prototype.keepData -{Object}
     * @description 保持最近读到的数据的引用（通过 <data> 属性）。默认值是false。
     */
    keepData: false,

    /**
     * @function SuperMap.Format.prototype.initialize
     * @description 直接实例化这个类没有实际作用，可以通过实例化其子类来进行操作。
     * @param options - {Object} 选项对象，其属性会被直接设置到format实例。如：<br>
     *        keepData - {Boolean} 如果设置为true， <data> 属性会指向被解析的对象（例如json或xml数据对象）。
     * @return {SuperMap.Format} 实例。
     */
    initialize: function (options) {
        SuperMap.Util.extend(this, options);
        this.options = options;
    },

    /**
     * @function destroy
     * @description 销毁该格式类，释放相关资源。
     */
    destroy: function () {
        //用来销毁该格式类，释放相关资源
    },

    /**
     * @function SuperMap.Format.prototype.read
     * @description Read data from a string, and return an object whose type depends on the subclass.
     * @param data - {string} Data to read/parse.
     */
    read: function (data) {
        //用来从字符串中读取数据
    },

    /**
     * @function SuperMap.Format.prototype.write
     * @description Accept an object, and return a string.
     * @param object - {Object} Object to be serialized
     * @return {String} A string representation of the object.
     */
    write: function (object) {
        //用来写字符串
    },

    CLASS_NAME: "SuperMap.Format"
});

module.exports = SuperMap.Format;
