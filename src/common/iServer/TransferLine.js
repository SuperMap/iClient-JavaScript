import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.TransferLine
 * @category  iServer TrafficTransferAnalyst TransferPath
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
export class TransferLine {

    constructor(options) {
        options = options || {};
        /**
         * @memberSuperMap.TransferLine.prototype.lineID -{number}
         * @description 乘车路线名称。
         */
        this.lineID = null;

        /**
         * @memberSuperMap.TransferLine.prototype.lineName -{string}
         * @description 乘车路线名称。
         */
        this.lineName = null;

        /**
         * @memberSuperMap.TransferLine.prototype.lineAliasName -{string}
         * @description 乘车路线别名。
         */
        this.lineAliasName = null;

        /**
         * @memberSuperMap.TransferLine.prototype.startStopIndex -{number}
         * @description 上车站点在本公交路线中的索引。
         */
        this.startStopIndex = null;

        /**
         * @memberSuperMap.TransferLine.prototype.startStopName -{string}
         * @description 上车站点名称。
         */
        this.startStopName = null;

        /**
         * @memberSuperMap.TransferLine.prototype.startStopAliasName -{string}
         * @description 上车站点别名。
         */
        this.startStopAliasName = null;

        /**
         * @memberSuperMap.TransferLine.prototype.endStopIndex -{number}
         * @description 下车站点在本公交路线中的索引。
         */
        this.endStopIndex = null;

        /**
         * @memberSuperMap.TransferLine.prototype.endStopName -{string}
         * @description 下车站点名称。
         */
        this.endStopName = null;

        /**
         * @memberSuperMap.TransferLine.prototype.endStopAliasName -{string}
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

}

SuperMap.TransferLine = TransferLine;