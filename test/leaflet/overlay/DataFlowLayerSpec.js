﻿import { dataFlowService } from '../../../src/leaflet/services/DataFlowService';
import { dataFlowLayer } from '../../../src/leaflet/overlay/DataFlowLayer';
import { SecurityManager } from '../../../src/common/security/SecurityManager';
import { tiledMapLayer } from '../../../src/leaflet/mapping/TiledMapLayer';

var wsHost = "ws:\//" + "54.223.164.155:8800";
var urlDataFlow = wsHost + "/iserver/services/dataflowTest/dataflow";
var urlMap = "http://54.223.164.155:8090/iserver/services/map-china400/rest/maps/China";
describe('leaflet_DataFlowLayer', () => {
    var originalTimeout;
    var testDiv, map;
    // var token = "15xQ_l77895DvXHYKWPesuU7x0tenRLuYXgjxX4x_s51Wqh9qrQiLuLKudwWWm6vQVTXej2cXEQKcIcFAxxzOw..";
    var token = "0ra2250-rPu6ZnqHPKqcqDjGkDGDv3bg5HHy1SNNXf79OlN0ArG07bq3cGFz0v-nfBm2RAnYJ3LGBsuiptH43g..";
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "400px";
        window.document.body.appendChild(testDiv);
        SecurityManager.registerToken(urlDataFlow, token);
        map = L.map('map', {
            preferCanvas: true,
            crs: L.CRS.EPSG3857,
            center: [39.88, 116.42],
            maxZoom: 18,
            zoom: 12
        });
        tiledMapLayer(urlMap).addTo(map);


    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
    });

    xit('bug', () => {
        console.log('1、destroy分支走不进去');
        console.log('2、unBroadcast的if分支条件缺少!');
        console.log("3、setGeometry、setExcludeField方法报错:Failed to execute 'send' on 'WebSocket: Still in CONNECTING state'");
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

        var layer;
        var service;
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
            layer.addTo(map);
            service = dataFlowService(urlDataFlow);
            spyOn(service.dataFlow, '_connect').and.callFake(() => {
                return new WebSocket(urlDataFlow + '/broadcast' + "?token=" + token);
            });

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
                expect(layer.idCache).not.toBeNull();
                expect(layer.url).toBe(urlDataFlow);
                expect(layer.options).not.toBeNull();
                expect(service).not.toBeNull();
                expect(service._events.broadcastSocketConnected.length).toEqual(1);
                done();
            }, 4000)
        }
        finally {
            if (timer) {
                window.clearInterval(timer);
            }
            if (service) {
                service.unSubscribe();
                service.unBroadcast();
                service.destroy();
            }
            if (layer) {
                layer.remove();
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

        var layer;
        var service;
        var timer;
        try {
            layer = dataFlowLayer(urlDataFlow);
            layer.addTo(map);
            service = dataFlowService(urlDataFlow);
            spyOn(service.dataFlow, '_connect').and.callFake(() => {
                return new WebSocket(urlDataFlow + '/broadcast' + "?token=" + token);
            });
            service.initBroadcast();
            service.on('broadcastSocketConnected', (e) => {
                timer = window.setInterval(broadcast_LineString(service), 1000);
            });
            setTimeout(() => {
                expect(service).not.toBeNull();
                done();
            }, 4000)
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }
            if (service) {
                service.unSubscribe();
                service.unBroadcast();
                service.destroy();
            }
            if (layer) {
                layer.remove();
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

        var layer;
        var service;
        var timer;
        try {
            layer = dataFlowLayer(urlDataFlow);
            layer.addTo(map);
            service = dataFlowService(urlDataFlow);
            spyOn(service.dataFlow, '_connect').and.callFake(() => {
                return new WebSocket(urlDataFlow + '/broadcast' + "?token=" + token);
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
            }, 4000)
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }
            if (service) {
                service.unSubscribe();
                service.unBroadcast();
                service.destroy();
            }
            if (layer) {
                layer.remove();
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

        var layer;
        var service;
        var timer;
        try {
            layer = dataFlowLayer(urlDataFlow);
            layer.addTo(map);
            service = dataFlowService(urlDataFlow);
            spyOn(service.dataFlow, '_connect').and.callFake(() => {
                return new WebSocket(urlDataFlow + '/broadcast' + "?token=" + token);
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
            }, 4000)
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }
            if (service) {
                service.unSubscribe();
                service.unBroadcast();
                service.destroy();
            }
            if (layer) {
                layer.remove();
            }
        }
    });

    it('onRemove', (done) => {
        var layer;
        try {
            layer = dataFlowLayer(urlDataFlow);
            layer.addTo(map);
            layer.onRemove(map);
            setTimeout(() => {
                expect(layer).not.toBeNull();
                done();
            }, 4000)
        } finally {
            if (layer) {
                layer.remove();
            }
        }
    });

    it('setExcludeField', (done) => {
        var layer;
        var socket = new WebSocket(urlDataFlow + '/broadcast' + "?token=" + token);
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
            }, 4000)
        } catch (e) {
            console.log(e);
        }
        finally {
            if (layer) {
                layer.remove();
            }
        }
    });

    it('setGeometry', (done) => {
        var layer;
        var socket = new WebSocket(urlDataFlow + '/broadcast' + "?token=" + token);
        try {
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
            }, 4000)
        } finally {
            if (layer) {
                layer.remove();
            }
        }
    });
});




