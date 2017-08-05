import SuperMap from '../../common/SuperMap';
import ServiceBase from './ServiceBase';
import DataFlow from '../../common/iServer/DataFlowService';

export default class DataFlowService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
        options = options || {};
        if (options.projection) {
            this.options.prjCoordSys = new SuperMap.Projection(options.projection);
        }
        ServiceBase.call(this, url, options);
        this.dataFlow = new DataFlow(url, options);
        this.dataFlow.events.on({
            "broadcastSocketConnected": this._defaultEvent,
            "broadcastSocketError": this._defaultEvent,
            "broadcastFailed": this._defaultEvent,
            "broadcastSuccessed": this._defaultEvent,
            "subscribeSocketConnected": this._defaultEvent,
            "subscribeSocketError": this._defaultEvent,
            "messageSuccessed": this._defaultEvent,
            "setFilterParamSuccessed": this._defaultEvent,
            scope: this
        });
    }

    initBroadcast() {
        this.dataFlow.initBroadcast();
        return this;
    }

    broadcast(obj) {
        this.dataFlow.broadcast(obj);
    }

    initSubscribe() {
        this.dataFlow.initSubscribe();
        return this;
    }

    setPrjCoordSys(prjCoordSys) {
        if (!prj) {
            return;
        }
        var prj = new SuperMap.Projection(options.projection);
        this.dataFlow.setPrjCoordSys(prj);
        this.options.prjCoordSys = prj;
        return this;
    }

    setExcludeField(excludeField) {
        this.dataFlow.setExcludeField(excludeField);
        this.options.excludeField = excludeField;
        return this;
    }

    setGeometry(geometry) {
        this.dataFlow.setGeometry(geometry);
        this.options.geometry = geometry;
        return this;
    }

    unSubscribe() {
        this.dataFlow.unSubscribe();
    }

    unBroadcast() {
        this.dataFlow.unBroadcast();
    }

    _defaultEvent(e) {
        this.dispatchEvent({type: e.eventType || e.type, value: e});
    }
}
ol.supermap.DataFlowService = DataFlowService;