import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.Format
 * @classdesc 读写各种格式的格式类基类。其子类应该包含并实现 read 和 write 方法。
 * @category BaseTypes Format
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.keepData=false] - 如果设置为 true， data 属性会指向被解析的对象（例如 json 或 xml 数据对象）。
 * @param {Object} [options.data] - 当 <keepData> 属性设置为 true，这是传递给 <read> 操作的要被解析的字符串。
 */
export class Format {


    constructor(options) {
        /**
         * @member {Object} SuperMap.Format.prototype.data 
         * @description 当 <keepData> 属性设置为 true，这是传递给 <read> 操作的要被解析的字符串。
         */
        this.data = null;

        /**
         * APIProperty: keepData
         * @member {Object} [SuperMap.Format.prototype.keepData=false]
         * @description 保持最近读到的数据的引用（通过 <data> 属性）。
         */
        this.keepData = false;

        Util.extend(this, options);
        /**
         * @member {Object} SuperMap.Format.prototype.options
         * @description 可选参数。
         */
        this.options = options;

        this.CLASS_NAME = "SuperMap.Format";
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
     * @description 来从字符串中读取数据。
     * @param {string} data - 读取的数据。
     */
    read(data) { // eslint-disable-line no-unused-vars
        //用来从字符串中读取数据
    }

    /**
     * @function SuperMap.Format.prototype.write
     * @description 将对象写成字符串。
     * @param {Object} object - 可序列化的对象。
     * @return {string} 对象被写成字符串。
     */
    write(object) { // eslint-disable-line no-unused-vars
        //用来写字符串
    }
}

SuperMap.Format = Format;
