import ol from 'openlayers';
import {
    DataFlowService
} from "../services/DataFlowService";

/**
 * @class ol.source.DataFlow
 * @category  iServer DataFlow
 * @classdesc 数据流图层源。
 * @param {Object} opt_options - 参数。
 * @param {string} [opt_options.idField = 'id'] - 要素属性中表示唯一标识的字段。
 * @param {Array.<Object>} [opt_options.geometry] - 设置增添的几何要素对象数组。
 * @param {Object} [opt_options.prjCoordSys] - 请求的地图的坐标参考系统。当此参数设置的坐标系统不同于地图的原有坐标系统时， 系统会进行动态投影，并返回动态投影后的地图瓦片。例如：{"epsgCode":3857}。
 * @param {Object} [opt_options.excludeField] - 排除字段
 * @extends {ol.source.Vector}
 */
export class DataFlow extends ol.source.Vector {

    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super(options);
        this.idField = options.idField || 'id';
        this.dataService = new DataFlowService(options.ws, {
            geometry: options.geometry,
            prjCoordSys: options.prjCoordSys,
            excludeField: options.excludeField
        }).initSubscribe();
        var me = this;
        me.dataService.on('subscribeSocketConnected', function (e) {
            me.dispatchEvent({
                type: "subscribeSuccessed",
                value: e
            })
        });
        me.dataService.on('messageSuccessed', function (msg) {
            me._onMessageSuccessed(msg);
        });
        me.dataService.on('setFilterParamSuccessed', function (msg) {
            me.dispatchEvent({
                type: "setFilterParamSuccessed",
                value: msg
            })
        });
        this.featureCache = {};
    }

    /**
     * @function ol.source.DataFlow.prototype.setPrjCoordSys
     * @description 设置坐标参考系。
     * @param {Object} prjCoordSys - 参考系。
     */
    setPrjCoordSys(prjCoordSys) {
        this.dataService.setPrjCoordSys(prjCoordSys);
        this.prjCoordSys = prjCoordSys;
        return this;
    }

    /**
     * @function ol.source.DataFlow.prototype.setExcludeField
     * @description 设置唯一字段。
     * @param {Object} excludeField - 排除字段。
     */
    setExcludeField(excludeField) {
        this.dataService.setExcludeField(excludeField);
        this.excludeField = excludeField;
        return this;
    }

    /**
     * @function ol.source.DataFlow.prototype.setGeometry
     * @description 设置几何图形。
     * @param {Object} geometry - 要素图形。
     */
    setGeometry(geometry) {
        this.dataService.setGeometry(geometry);
        this.geometry = geometry;
        return this;
    }

    _onMessageSuccessed(msg) {
        //this.clear();

        var feature = (new ol.format.GeoJSON()).readFeature(msg.value.featureResult);

        var geoID = feature.get(this.idField);
        if (geoID !== undefined && this.featureCache[geoID]) {
            this.featureCache[geoID].setGeometry(feature.getGeometry());
            this.featureCache[geoID].setProperties(feature.getProperties());
            this.changed();
        } else {
            this.addFeature(feature);
            this.featureCache[geoID] = feature;
        }
        this.dispatchEvent({
            type: "dataupdated",
            value: {
                source: this,
                data: feature
            }
        })


    }
}
ol.source.DataFlow = DataFlow;