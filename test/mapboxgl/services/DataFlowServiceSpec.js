import mapboxgl from 'mapbox-gl';
import {
    DataFlowService
} from '../../../src/mapboxgl/services/DataFlowService';
import {
    SecurityManager
} from '../../../src/common/security/SecurityManager';

var wsHost = "ws:\//" + "54.223.164.155:8800";
var urlDataFlow = wsHost + "/iserver/services/dataflow/dataflow";
describe('mapboxgl_DataFlowService', () => {
    var originalTimeout;
    var service;
    var token = "15xQ_l77895DvXHYKWPesuU7x0tenRLuYXgjxX4x_s51Wqh9qrQiLuLKudwWWm6vQVTXej2cXEQKcIcFAxxzOw..";
    beforeAll(() => {
        SecurityManager.registerToken(urlDataFlow, token);
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        service=null;

    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        if (service) {
            service.unSubscribe();
            service.unBroadcast();
        }
    });

    /* it('initSubscribe', (done) => {
        var initSubscribeMsg;
        var service = new DataFlowService(urlDataFlow);
        service.initSubscribe();
        service.on('messageSuccessed', (msg) => {
            initSubscribeMsg = msg;
            try {
                expect(service).not.toBeNull();
                expect(initSubscribeMsg).not.toBeNull();
                done();
            } catch (e) {
                console.log("'initSubscribe'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        })
    }); */


    it('broadcast_Point', (done) => {
        var broadcast_Point = (flowService) => {
            var feature = {
                geometry: {
                    coordinates: new mapboxgl.Point(5605, -3375),
                    type: "Point"
                },
                id: 1,
                type: "Feature",
                properties: {
                    id: 1,
                    time: new Date()
                }
            };
            flowService.broadcast(feature);
        }
      
        var timer;
        try {
            service = new DataFlowService(urlDataFlow);
            service.initBroadcast();
            service.on('broadcastSocketConnected', (e) => {
                var dataFlow = service.dataFlow;
                expect(dataFlow.CLASS_NAME).toBe("SuperMap.DataFlowService");
                expect(dataFlow.EVENT_TYPES.length).toEqual(8);
                expect(dataFlow.broadcastWebSocket.binaryType).toBe("blob");
                expect(dataFlow.broadcastWebSocket.url).toBe(urlDataFlow + "/broadcast?token=" + token);
                timer = window.setInterval(broadcast_Point(service), 1000);
            });
            setTimeout(() => {
                expect(service).not.toBeNull();
                done();
            }, 4000)
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }
        }
    });

    it('broadcast_LineString', (done) => {
        var broadcast_LineString = (flowService) => {
            var feature = {
                geometry: {
                    coordinates: [
                        new mapboxgl.LngLat(116.381741960923, 39.8765100055449),
                        new mapboxgl.LngLat(116.414681699817, 39.8765100055449),
                        new mapboxgl.LngLat(116.414681699817, 39.8415115329708)
                    ],
                    type: "LineString"
                },
                id: 2,
                type: "Feature",
                properties: {
                    id: 2,
                    time: new Date()
                }
            };
            flowService.broadcast(feature);
        }

      
        var timer;
        try {
            service = new DataFlowService(urlDataFlow);
            service.initBroadcast();
            service.on('broadcastSocketConnected', (e) => {
                timer = window.setInterval(broadcast_LineString(service), 1000);
            });
            setTimeout(() => {
                expect(service).not.toBeNull();
                done();
            }, 8000)
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }
           
        }
    });

    it('broadcast_Polygon', (done) => {
        var broadcast_Polygon = (flowService) => {
            var feature = {
                geometry: {
                    coordinates: [
                        [
                            new mapboxgl.LngLat(116.381741960923, 39.8765100055449),
                            new mapboxgl.LngLat(116.414681699817, 39.8765100055449),
                            new mapboxgl.LngLat(116.414681699817, 39.8415115329708),
                            new mapboxgl.LngLat(116.381741960923, 39.8765100055449)
                        ]
                    ],
                    type: "Polygon"
                },
                id: 3,
                type: "Feature",
                properties: {
                    id: 3,
                    time: new Date()
                }
            };
            flowService.broadcast(feature);
        }

      
        var timer;
        try {
            service = new DataFlowService(urlDataFlow);
            service.initBroadcast();
            service.on('broadcastSocketConnected', (e) => {
                timer = window.setInterval(broadcast_Polygon(service), 1000);
            });
            setTimeout(() => {
                expect(service).not.toBeNull();
                service.unSubscribe();
                service.unBroadcast();
                done();
            }, 4000)
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }
        }
    });

    it('broadcast_MultiPolygon', (done) => {
        var broadcast_MultiPolygon = (flowService) => {
            var feature = {
                geometry: {
                    coordinates: [
                        [
                            [
                                new mapboxgl.LngLat(116.381741960923, 39.8765100055449),
                                new mapboxgl.LngLat(116.414681699817, 39.8765100055449),
                                new mapboxgl.LngLat(116.414681699817, 39.8415115329708),
                                new mapboxgl.LngLat(116.381741960923, 39.8765100055449)
                            ]
                        ],
                        [
                            [
                                new mapboxgl.LngLat(115.381741960923, 39.8765100055449),
                                new mapboxgl.LngLat(116.414681699817, 39.8765100055449),
                                new mapboxgl.LngLat(116.414681699817, 39.8415115329708),
                                new mapboxgl.LngLat(115.381741960923, 39.8765100055449)
                            ]
                        ]
                    ],
                    type: "MultiPolygon"
                },
                id: 4,
                type: "Feature",
                properties: {
                    id: 4,
                    time: new Date()
                }
            };
            flowService.broadcast(feature);
        }
      
        var timer;
        try {
            service = new DataFlowService(urlDataFlow);
            service.initBroadcast();
            service.on('broadcastSocketConnected', (e) => {
                timer = window.setInterval(broadcast_MultiPolygon(service), 1000);
            });
            setTimeout(() => {
                expect(service).not.toBeNull();
                service.unSubscribe();
                service.unBroadcast();
                done();
            }, 4000)
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }
        }
    });

    // 设置设置排除字段。
    /* it('setExcludeField', (done) => {
        var service = new DataFlowService(urlDataFlow);
        service.setExcludeField("id"); 
        service.on('subscribeSuccessed', (e) => {
            service.setExcludeField("id"); 
            try {
                expect(service).not.toBeNull();
                expect(service.options.excludeField).not.toBeNull();
                done();
            } catch(e) {
                console.log("'setExcludeField'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    }); */
});