import ol from 'openlayers/dist/ol-debug';
import DataFlowService  from "../services/DataFlowService";

export default class DataFlow extends ol.source.Vector {

    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super({
            attributions: options.attributions || new ol.Attribution({
                html: "© 2017 百度 MapV with <span>© <a href='http://iclient.supermapol.com'>SuperMap iClient</a></span>"
            }),
            ws: options.ws,
            geometry: options.geometry,
            prjCoordSys: options.prjCoordSys,
            excludeField: options.excludeField,
        });
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
    }

    setPrjCoordSys(prjCoordSys) {
        this.dataService.setPrjCoordSys(prjCoordSys);
        this.prjCoordSys = prjCoordSys;
        return this;
    }

    setExcludeField(excludeField) {
        this.dataService.setExcludeField(excludeField);
        this.excludeField = excludeField;
        return this;
    }

    setGeometry(geometry) {
        this.dataService.setGeometry(geometry);
        this.geometry = geometry;
        return this;
    }

    _onMessageSuccessed(msg) {
        this.clear();
        this.addFeature((new ol.format.GeoJSON()).readFeature(msg.value.featureResult));
        this.dispatchEvent({type: "dataUpdated", value: {source: this, data: msg.featureResult}})
    }
}
ol.source.DataFlow = DataFlow;