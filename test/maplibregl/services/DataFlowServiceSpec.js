import maplibregl from 'maplibre-gl';
import {
    DataFlowService
} from '../../../src/maplibregl/services/DataFlowService';

import { Server, WebSocket } from 'mock-socket';
var urlDataFlow = "ws://localhost:8005";
describe('maplibregl_DataFlowService', () => {
    var originalTimeout;
    var service;
    var mockServerBroadcast;
    var mockServerSubscribe;
    beforeAll(() => {
        var e = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [0, 0]
            },
            "properties": {
                "id": 1
            }
        };
        mockServerBroadcast = new Server(`${urlDataFlow}/broadcast`);

        mockServerBroadcast.on('connection', socket => {
            socket.on('message', () => {
                console.log("onmessage");
            });
            socket.on('close', () => { });
            socket.send(JSON.stringify(e));
            // socket.close();

        });
        mockServerSubscribe = new Server(`${urlDataFlow}/subscribe`);
        mockServerSubscribe.on('connection', socket => {
        })

    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        service = null;

    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        if (service) {
            service.unSubscribe();
            service.unBroadcast();
        }
    });
    afterAll(() => {
        mockServerBroadcast.stop();
        mockServerBroadcast = null;
        mockServerSubscribe.stop();
        mockServerSubscribe = null;
    });

    it('broadcast_Point', (done) => {
        var broadcast_Point = (flowService) => {
            var feature = {
                geometry: {
                    coordinates: new maplibregl.Point(5605, -3375),
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

        service = new DataFlowService(urlDataFlow);
        service.initBroadcast();
        service.on('broadcastSocketConnected', (e) => {
            var dataFlow = service.dataFlow;
            expect(dataFlow.CLASS_NAME).toBe("SuperMap.DataFlowService");
            expect(dataFlow.EVENT_TYPES.length).toEqual(10);
            expect(dataFlow.broadcastWebSocket.binaryType).toBe("blob");
            expect(dataFlow.broadcastWebSocket.url).toBe(urlDataFlow + "/broadcast");
            broadcast_Point(service);

        });
        service.on('broadcastSucceeded', (e) => {
            done();
        })
    });

    it('broadcast_LineString', (done) => {
        var broadcast_LineString = (flowService) => {
            var feature = {
                geometry: {
                    coordinates: [
                        new maplibregl.LngLat(116.381741960923, 39.8765100055449),
                        new maplibregl.LngLat(116.414681699817, 39.8765100055449),
                        new maplibregl.LngLat(116.414681699817, 39.8415115329708)
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

        service = new DataFlowService(urlDataFlow);
        service.initBroadcast();
        service.on('broadcastSocketConnected', (e) => {
            var dataFlow = service.dataFlow;
            expect(dataFlow.CLASS_NAME).toBe("SuperMap.DataFlowService");
            expect(dataFlow.EVENT_TYPES.length).toEqual(10);
            expect(dataFlow.broadcastWebSocket.binaryType).toBe("blob");
            expect(dataFlow.broadcastWebSocket.url).toBe(urlDataFlow + "/broadcast");
            broadcast_LineString(service);

        });
        service.on('broadcastSucceeded', (e) => {
            done();
        })

    });

    it('broadcast_Polygon', (done) => {
        var broadcast_Polygon = (flowService) => {
            var feature = {
                geometry: {
                    coordinates: [
                        [
                            new maplibregl.LngLat(116.381741960923, 39.8765100055449),
                            new maplibregl.LngLat(116.414681699817, 39.8765100055449),
                            new maplibregl.LngLat(116.414681699817, 39.8415115329708),
                            new maplibregl.LngLat(116.381741960923, 39.8765100055449)
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

        service = new DataFlowService(urlDataFlow);
        service.initBroadcast();
        service.on('broadcastSocketConnected', (e) => {
            var dataFlow = service.dataFlow;
            expect(dataFlow.CLASS_NAME).toBe("SuperMap.DataFlowService");
            expect(dataFlow.EVENT_TYPES.length).toEqual(10);
            expect(dataFlow.broadcastWebSocket.binaryType).toBe("blob");
            expect(dataFlow.broadcastWebSocket.url).toBe(urlDataFlow + "/broadcast");
            broadcast_Polygon(service);

        });
        service.on('broadcastSucceeded', (e) => {
            done();
        })
    });

    it('broadcast_MultiPolygon', (done) => {
        var broadcast_MultiPolygon = (flowService) => {
            var feature = {
                geometry: {
                    coordinates: [[[[116.381741960923, 39.8765100055449], [116.414681699817, 39.8765100055449], [116.414681699817, 39.8415115329708], [116.381741960923, 39.8765100055449]]], [[[115.381741960923, 39.8765100055449], [116.414681699817, 39.8765100055449], [116.414681699817, 39.8415115329708], [115.381741960923, 39.8765100055449]]]],
                    type: "MultiPolygon"
                },
                id: 4,
                type: "Feature",
                properties: { id: 4, time: new Date() }
            };
            flowService.broadcast(feature);
        }
        service = new DataFlowService(urlDataFlow);
        service.initBroadcast();
        service.on('broadcastSocketConnected', (e) => {
            var dataFlow = service.dataFlow;
            expect(dataFlow.CLASS_NAME).toBe("SuperMap.DataFlowService");
            expect(dataFlow.EVENT_TYPES.length).toEqual(10);
            expect(dataFlow.broadcastWebSocket.binaryType).toBe("blob");
            expect(dataFlow.broadcastWebSocket.url).toBe(urlDataFlow + "/broadcast");
            broadcast_MultiPolygon(service);

        });
        service.on('broadcastSucceeded', (e) => {
            done();
        })

    });

    // 设置设置排除字段。
    it('initSubscribe,setExcludeField', (done) => {
        service = new DataFlowService(urlDataFlow);
        service.initSubscribe();
        service.on('subscribeSocketConnected', (e) => {
            var dataFlow = service.dataFlow;
            expect(dataFlow.subscribeWebSocket.binaryType).toBe("blob");
            expect(dataFlow.subscribeWebSocket.url).toBe(urlDataFlow + "/subscribe");
            service.setExcludeField("id");
            expect(service.options.excludeField).toBe("id");
            done();
        });
    });

    it('setGeometry', (done) => {
        var feature = {
            geometry: {
                coordinates: new maplibregl.Point(5605, -3375),
                type: "Point"
            },
            id: 1,
            type: "Feature",
            properties: {
                id: 1,
                time: new Date()
            }
        };
        service = new DataFlowService(urlDataFlow);
        service.initSubscribe();
        service.on('subscribeSocketConnected', (e) => {
            var dataFlow = service.dataFlow;
            expect(dataFlow.subscribeWebSocket.binaryType).toBe("blob");
            expect(dataFlow.subscribeWebSocket.url).toBe(urlDataFlow + "/subscribe");
            service.setGeometry(feature);
            expect(service.options.geometry.geometry.coordinates.x).toBe(5605)
            done();
        });
    });
});
