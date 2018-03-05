import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import './TransferLine';

/**
 * @class SuperMap.TransferPathParameters
 * @category  iServer TrafficTransferAnalyst TransferPaths
 * @classdesc 交通换乘线路查询参数类。
 * @param options - {Object} 参数。如:</br>
 *        transferLines -{Array<{@link SuperMap.TransferLine}>} 本换乘分段内可乘车的路线集合。</br>
 *        points - {Array<string>|Array<Object>} 两种查询方式：按照公交站点的起止ID进行查询和按照起止点的坐标进行查询。</br>
 *                  点类型可以是：SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point。</br>
 *
 */
export class TransferPathParameters {

    constructor(options) {
        options = options || {};
        /**
         * @member SuperMap.TransferPathParameters.prototype.transferLines -{Array<SuperMap.TransferLine>}
         * @description 本换乘分段内可乘车的路线集合，通过交通换乘方案查询得到
         */
        this.transferLines = null;


        /**
         *  @member SuperMap.TransferPathParameters.prototype.points -{Array<string>|Array<Object>}
         *  @description 点类型可以是：SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point。</br>
         *  两种查询方式：
         *           1. 按照公交站点的起止ID进行查询，则points参数的类型为int[]，形如：[起点ID、终点ID]，公交站点的ID对应服务提供者配置中的站点ID字段；
         *           2. 按照起止点的坐标进行查询，则points参数的类型为Point2D[]，形如：[{"x":44,"y":39},{"x":45,"y":40}]。
         */
        this.points = false;

        Util.extend(this, options);

       this.CLASS_NAME = "SuperMap.TransferPathParameters";
    }

    /**
     * @function SuperMap.TransferPathParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        Util.reset(this);
    }

    /**
     * @function SuperMap.TransferPathParameters.toJson
     * @description 将 <SuperMap.TransferPathParameters> 对象参数转换为 json 字符串。
     * @param params - {SuperMap.TransferPathParameters} 交通换乘参数。
     * @return{string} 转化后的 json字符串。
     */
    static toJson(params) {
        if (params) {
            return Util.toJSON(params);
        }
    }

}

SuperMap.TransferPathParameters = TransferPathParameters;