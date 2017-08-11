import  SuperMap from '../SuperMap';
/**
 * @class SuperMap.DatasetInfo
 * @classdesc 数据集信息类。
 * @description 数据集一般为存储在一起的相关数据的集合；根据数据类型的不同，分为矢量数据集、栅格数据集(griddataset)和
 *              影像数据集(image dataset)，以及为了处理特定问题而设计的数据集，如拓扑数据集，网络数据集等。
 *              数据集是 GIS 数据组织的最小单位。其中矢量数据集是由同种类型空间要素组成的集合，
 *              所以也可以称为要素集。根据要素的空间特征的不同，矢量数据集又分为点数据集，
 *              线数据集，面数据集等，各矢量数据集是空间特征和性质相同的数据组织起来的集合。
 *              目前版本支持的数据集主要有点数据集，线数据集，面数据集，文本数据集，复合数据集（CAD数据集）、
 *              网络数据集，栅格数据集(grid dataset)和影像数据集(image dataset)。
 * @param options - {Object} 可选参数。如：<br>
 *        bounds - {SuperMap.Bounds} 数据集范围，该字段只读。<br>
 *        dataSourceName - {String} 数据源名称，该字段只读。<br>
 *        description - {String} 数据集的描述信息。<br>
 *        encodeType - {String} 数据集存储时的压缩编码方式，该字段只读。<br>
 *        isReadOnly - {Boolean} 数据集是否为只读。<br>
 *        name - {String} 数据集名称，该字段必须且只读。<br>
 *        prjCoordSys - {SuperMap.Projection} 数据集的投影信息。<br>
 *        tableName - {String} 表名，该字段只读。<br>
 *        type - {String} 数据集类型，该字段必设。主要有点数据集，线数据集，面数据集，文本数据集，复合数据集（CAD数据集）、
 *                        网络数据集，栅格数据集(grid dataset)和影像数据集(image dataset)。
 */
export default  class DatasetInfo {

    /**
     * @member SuperMap.DatasetInfo.prototype.bounds -{SuperMap.Bounds}
     * @description 数据集范围，该字段只读。
     */
    bounds = null;

    /**
     * @member SuperMap.DatasetInfo.prototype.dataSourceName -{String}
     * @description 数据源名称，该字段只读。
     */
    dataSourceName = null;

    /**
     * @member SuperMap.DatasetInfo.prototype.description -{String}
     * @description 数据集的描述信息。
     */
    description = null;

    /**
     * @member SuperMap.DatasetInfo.prototype.encodeType -{String}
     * @description 数据集存储时的压缩编码方式，该字段只读。
     */
    encodeType = null;

    /**
     * @member SuperMap.DatasetInfo.prototype.isReadOnly -{Boolean}
     * @description 数据集是否为只读。
     */
    isReadOnly = null;

    /**
     * @member SuperMap.DatasetInfo.prototype.name -{String}
     * @description 数据集名称，该字段必须且只读。
     */
    name = null;

    /**
     * @member SuperMap.DatasetInfo.prototype.prjCoordSys -{SuperMap.Projection}
     * @description 数据集的投影信息。
     */
    prjCoordSys = null;

    /**
     * @member SuperMap.DatasetInfo.prototype.tableName -{String}
     * @description 表名，该字段只读。
     */
    tableName = null;

    /**
     * @member SuperMap.DatasetInfo.prototype.type -{String}
     * @description 数据集类型，该字段必设。主要有点数据集，线数据集，面数据集，文本数据集，复合数据集（CAD数据集）、
     *              网络数据集，栅格数据集(grid dataset)和影像数据集(image dataset)。
     */
    type = null;

    /*
     * @function SuperMap.DatasetInfo.prototype.constructor
     * @description 数据集信息类构造函数。
     * @param options - {Object} 可选参数。如：<br>
     *        bounds - {SuperMap.Bounds} 数据集范围，该字段只读。<br>
     *        dataSourceName - {String} 数据源名称，该字段只读。<br>
     *        description - {String} 数据集的描述信息。<br>
     *        encodeType - {String} 数据集存储时的压缩编码方式，该字段只读。<br>
     *        isReadOnly - {Boolean} 数据集是否为只读。<br>
     *        name - {String} 数据集名称，该字段必须且只读。<br>
     *        prjCoordSys - {SuperMap.Projection} 数据集的投影信息。<br>
     *        tableName - {String} 表名，该字段只读。<br>
     *        type - {String} 数据集类型，该字段必设。主要有点数据集，线数据集，面数据集，文本数据集，复合数据集（CAD数据集）、
     *                        网络数据集，栅格数据集(grid dataset)和影像数据集(image dataset)。
     */
    constructor(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
        var b = this.bounds;
        if (b) {
            this.bounds = new SuperMap.Bounds(b.leftBottom.x, b.leftBottom.y, b.rightTop.x, b.rightTop.y);
        }
    }

    /**
     * @function destroy
     * @description 释放资源,将引用资源的属性置空。
     */
    destroy() {
        SuperMap.Util.reset(this);
    }


    /**
     * @function SuperMap.DatasetInfo.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var dataObj = {};
        dataObj = SuperMap.Util.copyAttributes(dataObj, this);
        if (dataObj.bounds) {
            if (dataObj.bounds.toServerJSONObject) {
                dataObj.bounds = dataObj.bounds.toServerJSONObject();
            }
        }
        return dataObj;
    }


    CLASS_NAME = "SuperMap.DatasetInfo"
}
SuperMap.DatasetInfo = DatasetInfo;