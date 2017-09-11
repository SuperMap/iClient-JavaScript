import SuperMap from '../SuperMap';
/**
 * @class SuperMap.Format
 * @classdesc 读写各种格式的格式类基类。其子类应该包含并实现read和write方法。
 * @param options - {Object} 选项对象，其属性会被直接设置到format实例。如：<br>
 *        keepData - {boolean} 如果设置为true， <data> 属性会指向被解析的对象（例如json或xml数据对象）。
 * @return {SuperMap.Format} 实例。
 */
export default  class Format {

    /**
     * @member SuperMap.Format.prototype.options -{Object}
     * @description A reference to options passed to the constructor.
     */
    options = null;

    /**
     * @member SuperMap.Format.prototype.data -{Object}
     * @description 当 <keepData> 属性设置为true，这是传递给<read>操作的要被解析的字符串。
     */
    data = null;

    /**
     * APIProperty: keepData
     * @member SuperMap.Format.prototype.keepData -{Object}
     * @description 保持最近读到的数据的引用（通过 <data> 属性）。默认值是false。
     */
    keepData= false;

    constructor(options) {
        SuperMap.Util.extend(this, options);
        this.options = options;
    }

    /**
     * @function SuperMap.Format.prototype.destroy
     * @description 销毁该格式类，释放相关资源。
     */
    destroy() {
        //用来销毁该格式类，释放相关资源
    }

    /**
     * @function SuperMap.Format.prototype.read
     * @description Read data from a string, and return an object whose type depends on the subclass.
     * @param data - {string} Data to read/parse.
     */
    read(data) {
        //用来从字符串中读取数据
    }

    /**
     * @function SuperMap.Format.prototype.write
     * @description Accept an object, and return a string.
     * @param object - {Object} Object to be serialized
     * @return {string} A string representation of the object.
     */
    write(object) {
        //用来写字符串
    }

    CLASS_NAME= "SuperMap.Format"
}
SuperMap.Format = Format;
