import SuperMap from '../SuperMap';

/**
 * @class SuperMap.TransferLine
 * @classdesc 换乘路线信息类。
 * @param options - {Object} 可选参数。如:</br>
 *        lineID - {string} 乘车路线名称。</br>
 *        lineName - {string} 乘车路线名称。</br>
 *        lineAliasName - {string} 乘车路线别名。</br>
 *        startStopIndex - {number}上车站点在本公交路线中的索引。</br>
 *        startStopName - {string} 上车站点名称。</br>
 *        startStopAliasName - {string} 上车站点别名。</br>
 *        endStopIndex - {number}下车站点在本公交路线中的索引</br>
 *        endStopName - {string} 下车站点名称。</br>
 *        endStopAliasName - {string} 下车站点别名。</br>
 */
export default  class TransferLine {
    /**
     * @memberSuperMap.TransferLine.prototype.lineID -{number}
     * @description 乘车路线名称。
     */
    lineID = null;

    /**
     * @memberSuperMap.TransferLine.prototype.lineName -{string}
     * @description 乘车路线名称。
     */
    lineName = null;

    /**
     * @memberSuperMap.TransferLine.prototype.lineAliasName -{string}
     * @description 乘车路线别名。
     */
    lineAliasName = null;

    /**
     * @memberSuperMap.TransferLine.prototype.startStopIndex -{number}
     * @description 上车站点在本公交路线中的索引。
     */
    startStopIndex = null;

    /**
     * @memberSuperMap.TransferLine.prototype.startStopName -{string}
     * @description 上车站点名称。
     */
    startStopName = null;

    /**
     * @memberSuperMap.TransferLine.prototype.startStopAliasName -{string}
     * @description 上车站点别名。
     */
    startStopAliasName = null;

    /**
     * @memberSuperMap.TransferLine.prototype.endStopIndex -{number}
     * @description 下车站点在本公交路线中的索引。
     */
    endStopIndex = null;

    /**
     * @memberSuperMap.TransferLine.prototype.endStopName -{string}
     * @description 下车站点名称。
     */
    endStopName = null;

    /**
     * @memberSuperMap.TransferLine.prototype.endStopAliasName -{string}
     * @description 下车站点别名。
     */
    endStopAliasName = null;

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
     * @function SuperMap.TransferLine.fromJson
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