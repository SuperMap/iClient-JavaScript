import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.TransferLine
 * @category  iServer TrafficTransferAnalyst TransferPath
 * @classdesc 换乘路线信息类。
 * @param {Object} options - 参数。
 * @param {number} options.lineID - 乘车路线ID。
 * @param {string} options.lineName - 乘车路线名称。
 * @param {string} options.lineAliasName - 乘车路线别名。
 * @param {number} options.startStopIndex - 上车站点在本公交路线中的索引。
 * @param {string} options.startStopName - 上车站点名称。
 * @param {string} options.startStopAliasName - 上车站点别名。
 * @param {number} options.endStopIndex - 下车站点在本公交路线中的索引。
 * @param {string} options.endStopName - 下车站点名称。
 * @param {string} options.endStopAliasName - 下车站点别名。
 */
export class TransferLine {

    constructor(options) {
        options = options || {};
        /**
         * @member {number} SuperMap.TransferLine.prototype.lineID
         * @description 乘车路线ID。
         */
        this.lineID = null;

        /**
         * @member {string} SuperMap.TransferLine.prototype.lineName
         * @description 乘车路线名称。
         */
        this.lineName = null;

        /**
         * @member {string} SuperMap.TransferLine.prototype.lineAliasName
         * @description 乘车路线别名。
         */
        this.lineAliasName = null;

        /**
         * @member {number} SuperMap.TransferLine.prototype.startStopIndex
         * @description 上车站点在本公交路线中的索引。
         */
        this.startStopIndex = null;

        /**
         * @member {string} SuperMap.TransferLine.prototype.startStopName
         * @description 上车站点名称。
         */
        this.startStopName = null;

        /**
         * @member {string} SuperMap.TransferLine.prototype.startStopAliasName
         * @description 上车站点别名。
         */
        this.startStopAliasName = null;

        /**
         * @member {number} SuperMap.TransferLine.prototype.endStopIndex
         * @description 下车站点在本公交路线中的索引。
         */
        this.endStopIndex = null;

        /**
         * @member {string} SuperMap.TransferLine.prototype.endStopName
         * @description 下车站点名称。
         */
        this.endStopName = null;

        /**
         * @member {string} SuperMap.TransferLine.prototype.endStopAliasName
         * @description 下车站点别名。
         */
        this.endStopAliasName = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.TransferLine";
    }


    /**
     * @function SuperMap.TransferLine.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        Util.reset(this);
    }

    /**
     * @function SuperMap.TransferLine.fromJson
     * @description 将返回结果转化为 SuperMap.TransferLine 对象。
     * @param {Object} jsonObject - 新的返回结果。
     * @returns {SuperMap.TransferLine} 转化后的 SuperMap.TransferLine 对象。
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

}

SuperMap.TransferLine = TransferLine;