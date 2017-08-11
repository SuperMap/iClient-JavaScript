import SuperMap from '../SuperMap';

/**
 * @class SuperMap.TransferLine
 * @classdesc 换乘路线信息类。
 * @param options - {Object} 可选参数。如:</br>
 *        lineID - {String} 乘车路线名称。</br>
 *        lineName - {String} 乘车路线名称。</br>
 *        lineAliasName - {String} 乘车路线别名。</br>
 *        startStopIndex - {Number} 上车站点在本公交路线中的索引。</br>
 *        startStopName - {String} 上车站点名称。</br>
 *        startStopAliasName - {String} 上车站点别名。</br>
 *        endStopIndex - {Number} 下车站点在本公交路线中的索引</br>。
 *        endStopName - {String} 下车站点名称。</br>
 *        endStopAliasName - {String} 下车站点别名。</br>
 */
export default  class TransferLine {
    /**
     * @memberSuperMap.TransferLine.prototype.lineID -{Number}
     * @description 乘车路线名称。
     */
    lineID = null;

    /**
     * @memberSuperMap.TransferLine.prototype.lineName -{String}
     * @description 乘车路线名称。
     */
    lineName = null;

    /**
     * @memberSuperMap.TransferLine.prototype.lineAliasName -{String}
     * @description 乘车路线别名。
     */
    lineAliasName = null;

    /**
     * @memberSuperMap.TransferLine.prototype.startStopIndex -{Number}
     * @description 上车站点在本公交路线中的索引。
     */
    startStopIndex = null;

    /**
     * @memberSuperMap.TransferLine.prototype.startStopName -{String}
     * @description 上车站点名称。
     */
    startStopName = null;

    /**
     * @memberSuperMap.TransferLine.prototype.startStopAliasName -{String}
     * @description 上车站点别名。
     */
    startStopAliasName = null;

    /**
     * @memberSuperMap.TransferLine.prototype.endStopIndex -{Number}
     * @description 下车站点在本公交路线中的索引。
     */
    endStopIndex = null;

    /**
     * @memberSuperMap.TransferLine.prototype.endStopName -{String}
     * @description 下车站点名称。
     */
    endStopName = null;

    /**
     * @memberSuperMap.TransferLine.prototype.endStopAliasName -{String}
     * @description 下车站点别名。
     */
    endStopAliasName = null;

    /**
     * @function SuperMap.TransferLine.prototype.constructor
     * @description 换乘路线信息类构造函数。
     * @param options - {Object} 可选参数。如:</br>
     *        lineID - {String} 乘车路线名称。</br>
     *        lineName - {String} 乘车路线名称。</br>
     *        lineAliasName - {String} 乘车路线别名。</br>
     *        startStopIndex - {Number} 上车站点在本公交路线中的索引。</br>
     *        startStopName - {String} 上车站点名称。</br>
     *        startStopAliasName - {String} 上车站点别名。</br>
     *        endStopIndex - {Number} 下车站点在本公交路线中的索引</br>。
     *        endStopName - {String} 下车站点名称。</br>
     *        endStopAliasName - {String} 下车站点别名。</br>
     */
    constructor(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    }


    /**
     * @function SuperMap.TransferLine.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        SuperMap.Util.reset(this);
    }

    /**
     * @function SuperMap.TransferLine.prototype.fromJson
     * @description 将返回结果转化为 SuperMap.TransferLine 对象。
     * @param jsonObject - {Object} 新的返回结果。
     * @return {SuperMap.TransferLine} 转化后的 SuperMap.TransferLine 对象。
     */
    static fromJson(jsonObject) {
        if (!jsonObject) {
            return;
        }
        return new TransferLine({
            lineID: jsonObject['lineID'],
            lineName: jsonObject['lineName'],
            lineAliasName: jsonObject['lineAliasName'],
            startStopIndex: jsonObject['startStopIndex'],
            startStopName: jsonObject['startStopName'],
            startStopAliasName: jsonObject['startStopAliasName'],
            endStopIndex: jsonObject['endStopIndex'],
            endStopName: jsonObject['endStopName'],
            endStopAliasName: jsonObject['endStopAliasName']
        });
    }

    CLASS_NAME = "SuperMap.TransferLine"
}

SuperMap.TransferLine = TransferLine;