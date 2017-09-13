import ol from 'openlayers/dist/ol-debug';
import DataFlowService  from "../services/DataFlowService";
/**
 * @class ol.source.DataFlow
 * @classdesc 实时数据图层源。
 * @param opt_options -{Object} 参数
 * @extends ol.source.Vector{@linkdoc-openlayers/ol.source.Vector}
 */
export default class DataFlow extends ol.source.Vector {

    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super({
            attributions: options.attributions || new ol.Attribution({
                html: "© 2017 百度 MapV with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"
            }),
            ws: options.ws,
            geometry: options.geometry,
            prjCoordSys: options.prjCoordSys,
            excludeField: options.excludeField,
        });
        this.idField=options.idField||'id';
        this.dataService = new DataFlowService(options.ws, {
            geometry: options.geometry,
            prjCoordSys: options.prjCoordSys,
            excludeField: options.excludeField
        }).initSubscribe();
        var me = this;
        me.dataService.on('subscribeSocketConnected', function (e) {
            me.dispatchEvent({type: "subscribeSuccessed", value: e})
        });
        me.dataService.on('messageSuccessed', function (msg) {
            me._onMessageSuccessed(msg);
        });
        me.dataService.on('setFilterParamSuccessed', function (msg) {
            me.dispatchEvent({type: "setFilterParamSuccessed", value: msg})
        });
        this.featureCache = {};
    }

    /**
     * @function ol.source.DataFlow.prototype.setPrjCoordSys
     * @description 设置坐标参考系
     * @param prjCoordSys - {Object} 参考系
     */
    setPrjCoordSys(prjCoordSys) {
        this.dataService.setPrjCoordSys(prjCoordSys);
        this.prjCoordSys = prjCoordSys;
        return this;
    }

    /**
     * @function ol.source.DataFlow.prototype.setExcludeField
     * @description 设置唯一字段
     * @param excludeField - {Object} 排除字段。
     */
    setExcludeField(excludeField) {
        this.dataService.setExcludeField(excludeField);
        this.excludeField = excludeField;
        return this;
    }

    /**
     * @function ol.source.DataFlow.prototype.setGeometry
     * @description 设置几何图形
     * @param geometry - {Object} 要素图形
     */
    setGeometry(geometry) {
        this.dataService.setGeometry(geometry);
        this.geometry = geometry;
        return this;
    }

    _onMessageSuccessed(msg) {
        //this.clear();
        var geoID = msg.value.featureResult.properties[this.idField];
        var feature=(new ol.format.GeoJSON()).readFeature(msg.value.featureResult);
        if (geoID !== undefined && this.featureCache[geoID]) {
            this.removeFeature(this.featureCache[geoID]);
        }
        this.addFeature(feature);
        this.featureCache[geoID] = feature;
        this.dispatchEvent({type: "dataUpdated", value: {source: this, data: msg.featureResult}})
    }
}
ol.source.DataFlow = DataFlow;