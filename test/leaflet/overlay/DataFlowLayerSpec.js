﻿import { dataFlowService } from '../../../src/leaflet/services/DataFlowService';
import { dataFlowLayer } from '../../../src/leaflet/overlay/DataFlowLayer';
import { Server } from 'mock-socket';
var urlDataFlow = "ws:\//localhost:8001/";
var server;
describe('leaflet_DataFlowLayer', () => {
    var originalTimeout;
    var testDiv, map;
    var layer, service;
    var mockServer = new Server(urlDataFlow);
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "400px";
        window.document.body.appendChild(testDiv);
        map = L.map('map', {
            preferCanvas: true,
            crs: L.CRS.EPSG3857,
            center: [39.88, 116.42],
            maxZoom: 18,
            zoom: 12
        });

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
        layer = null;
        service = null;
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

    });
    afterEach(() => {
        if (layer) {
            layer.onRemove(map);
            layer=null;
        }
        if (service) {
            service.unSubscribe();
            service.unBroadcast();
            service.destroy();
        }
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        mockServer.stop();
        mockServer=null;
        map = null;
        window.document.body.removeChild(testDiv);
    });

    it('broadcast_Point', (done) => {
        var broadcast_Point = (flowService) => {
            var feature = {
                geometry: {
                    coordinates: [116.69801217000008, 39.86826211908377],
                    type: "Point"
                },
                id: 1,
                type: "Feature",
                properties: { id: 1, time: new Date() }
            };
            flowService.broadcast(feature);
        }
      
        var timer;
        try {
            layer = dataFlowLayer(urlDataFlow, {
                style: () => {
                    return {
                        fillColor: "red",
                        fillOpacity: 1,
                        radius: 6,
                        weight: 0
                    };
                }
            });
            service = layer.dataService;
            spyOn(service.dataFlow, '_connect').and.callFake(() => {
                return new WebSocket(urlDataFlow);
            });
            layer.addTo(map);
            service.initBroadcast();
            service.on('broadcastSocketConnected', (e) => {
                var dataFlow = service.dataFlow;
                expect(dataFlow.CLASS_NAME).toBe("SuperMap.DataFlowService");
                expect(dataFlow.EVENT_TYPES.length).toEqual(8);
                expect(dataFlow.broadcastWebSocket.binaryType).toBe("blob");
                timer = window.setInterval(broadcast_Point(service), 1000);
            });

            setTimeout(() => {
                expect(layer.idCache).not.toBeNull();
                expect(layer.url).toBe(urlDataFlow);
                expect(layer.options).not.toBeNull();
                expect(service).not.toBeNull();
                expect(service._events.broadcastSocketConnected.length).toEqual(1);
                service.unBroadcast();
                done();
            }, 0)
        }
        finally {
            if (timer) {
                window.clearInterval(timer);
            }
        }
    });

    it('broadcast_LineString', (done) => {
        var broadcast_LineString = (flowService) => {
            var feature = {
                geometry: {
                    coordinates: [[116.381741960923, 39.8765100055449], [116.414681699817, 39.8765100055449], [116.414681699817, 39.8415115329708]],
                    type: "LineString"
                },
                id: 2,
                type: "Feature",
                properties: { id: 2, time: new Date() }
            };
            flowService.broadcast(feature);
        }
        var timer;
        try {
            layer = dataFlowLayer(urlDataFlow);
            layer.addTo(map);
            service = layer.dataService;
            spyOn(service.dataFlow, '_connect').and.callFake(() => {

                return new WebSocket(urlDataFlow);
            });
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
                    coordinates: [[[116.381741960923, 39.8765100055449], [116.414681699817, 39.8765100055449], [116.414681699817, 39.8415115329708], [116.381741960923, 39.8765100055449]]],
                    type: "Polygon"
                },
                id: 3,
                type: "Feature",
                properties: { id: 3, time: new Date() }
            };
            flowService.broadcast(feature);
        }
        var timer;
        try {
            layer = dataFlowLayer(urlDataFlow);
            layer.addTo(map);
            service = layer.dataService;
            spyOn(service.dataFlow, '_connect').and.callFake(() => {

                return new WebSocket(urlDataFlow);
            });
            service.initBroadcast();
            service.on('broadcastSocketConnected', (e) => {
                timer = window.setInterval(broadcast_Polygon(service), 1000);
            });
            setTimeout(() => {
                expect(service).not.toBeNull();
                service.unSubscribe();
                service.unBroadcast();
                service.destroy();
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
                    coordinates: [[[[116.381741960923, 39.8765100055449], [116.414681699817, 39.8765100055449], [116.414681699817, 39.8415115329708], [116.381741960923, 39.8765100055449]]], [[[115.381741960923, 39.8765100055449], [116.414681699817, 39.8765100055449], [116.414681699817, 39.8415115329708], [115.381741960923, 39.8765100055449]]]],
                    type: "MultiPolygon"
                },
                id: 4,
                type: "Feature",
                properties: { id: 4, time: new Date() }
            };
            flowService.broadcast(feature);
        }

        var timer;
        try {
            layer = dataFlowLayer(urlDataFlow);
            layer.addTo(map);
            service = layer.dataService;
            spyOn(service.dataFlow, '_connect').and.callFake(() => {

                return new WebSocket(urlDataFlow);
            });
            service.initBroadcast();
            service.on('broadcastSocketConnected', (e) => {
                timer = window.setInterval(broadcast_MultiPolygon(service), 1000);
            });
            setTimeout(() => {
                expect(service).not.toBeNull();
                service.unSubscribe();
                service.unBroadcast();
                service.destroy();
                done();
            }, 0)
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }

        }
    });

    it('onRemove', (done) => {

        layer = dataFlowLayer(urlDataFlow);
        layer.addTo(map);
        layer.onRemove(map);
        setTimeout(() => {
            expect(layer).not.toBeNull();
            done();
        }, 0)
    });

    it('setExcludeField', (done) => {
        var socket = new WebSocket(urlDataFlow);
        try {
            layer = dataFlowLayer(urlDataFlow);
            var dataService = new dataFlowService(urlDataFlow, null)
            spyOn(dataService.dataFlow, '_connect').and.callFake(() => {
                return socket;
            });
            spyOn(socket, "send").and.callFake(() => {
            });
            layer.dataService = dataService.initSubscribe();
            setTimeout(() => {
                layer.setExcludeField("id");
                expect(layer).not.toBeNull();
                done();
            }, 0)
        } catch (e) {
            console.log(e);
        }
    });

    it('setGeometry', (done) => {

        var socket = new WebSocket(urlDataFlow);

        layer = dataFlowLayer(urlDataFlow);
        var dataService = new dataFlowService(urlDataFlow, null)
        spyOn(dataService.dataFlow, '_connect').and.callFake(() => {
            return socket;
        });
        spyOn(socket, "send").and.callFake(() => {
        });
        layer.dataService = dataService.initSubscribe();
        var geometry = {
            coordinates: [[[116.381741960923, 39.8765100055449], [116.414681699817, 39.8765100055449], [116.414681699817, 39.8415115329708], [116.381741960923, 39.8415115329708], [116.381741960923, 39.8765100055449]]],
            type: "Polygon"
        };
        setTimeout(() => {
            layer.setGeometry(geometry);
            expect(layer).not.toBeNull();
            done();
        }, 0)

    });

    it('_onMessageSuccessed', (done) => {
        var socket = new WebSocket(urlDataFlow);
        spyOn(socket, "send").and.callFake(() => {
        });
        layer = dataFlowLayer(urlDataFlow);
        spyOn(layer.dataService.dataFlow, '_connect').and.callFake(() => {
            return socket;
        });
        layer.addTo(map);

        var e = {
            featureResult:
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [0, 0]
                },
                "properties": {
                    "id": 1
                }
            }
        };
      
        setTimeout(() => {
            layer.on('dataupdated', (e) => {
                try {
                    expect(e.layer).not.toBeNull;
                    expect(e.layer).not.toBeUndefined;
                    done();

                } catch (exception) {
                    console.log("'_onMessageSuccessed'案例失败：" + exception.name + ":" + exception.message);
                    expect(false).toBeTruthy();
                    done();
                }
            });
            // done();
            layer.dataService.dataFlow.events.triggerEvent('messageSucceeded', e);
        }, 0)

    });
});




