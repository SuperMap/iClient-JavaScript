import maplibregl from 'maplibre-gl';
import {
    DataFlowService
} from '../../../src/maplibregl/services/DataFlowService';

import { Server } from 'mock-socket';
var urlDataFlow = "ws:\//localhost:8003/";
describe('maplibregl_DataFlowService', () => {
    var originalTimeout;
    var service;
    var mockServer;
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
        mockServer = new Server(urlDataFlow);
        mockServer.on('connection', socket => {
            socket.on('message', () => {
                console.log("onmessage");
            });
            socket.on('close', () => { });
            socket.send(JSON.stringify(e));
            socket.close();
        });
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
        mockServer.stop();
        mockServer = null;
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

        var timer;
        try {
            service = new DataFlowService(urlDataFlow);
            service.initBroadcast();
            service.on('broadcastSocketConnected', (e) => {
                var dataFlow = service.dataFlow;
                expect(dataFlow.CLASS_NAME).toBe("SuperMap.DataFlowService");
                expect(dataFlow.EVENT_TYPES.length).toEqual(8);
                expect(dataFlow.broadcastWebSocket.binaryType).toBe("blob");
                expect(dataFlow.broadcastWebSocket.url).toBe(urlDataFlow + "broadcast");
                timer = window.setInterval(broadcast_Point(service), 1000);
            });
            setTimeout(() => {
                expect(service).not.toBeNull();
                done();
            }, 0)
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
            }, 0)
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
            }, 0)
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
                                new maplibregl.LngLat(116.381741960923, 39.8765100055449),
                                new maplibregl.LngLat(116.414681699817, 39.8765100055449),
                                new maplibregl.LngLat(116.414681699817, 39.8415115329708),
                                new maplibregl.LngLat(116.381741960923, 39.8765100055449)
                            ]
                        ],
                        [
                            [
                                new maplibregl.LngLat(115.381741960923, 39.8765100055449),
                                new maplibregl.LngLat(116.414681699817, 39.8765100055449),
                                new maplibregl.LngLat(116.414681699817, 39.8415115329708),
                                new maplibregl.LngLat(115.381741960923, 39.8765100055449)
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
            }, 0)
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }
        }
    });

    // 设置设置排除字段。
    it('initSubscribe,setExcludeField', (done) => {
        var socket = new WebSocket(urlDataFlow);
        var service = new DataFlowService(urlDataFlow);
        spyOn(service.dataFlow, '_connect').and.callFake(() => {
            return socket;
        });
        spyOn(socket, "send").and.callFake(() => {
        });
        service.initSubscribe();
        setTimeout(() => {
            service.setExcludeField("id");
            expect(service).not.toBeNull();
            done();
        }, 0)
});
});