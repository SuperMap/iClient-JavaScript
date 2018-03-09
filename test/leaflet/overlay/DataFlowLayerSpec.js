﻿import {dataFlowService} from '../../../src/leaflet/services/DataFlowService';
import {dataFlowLayer} from '../../../src/leaflet/overlay/DataFlowLayer';
import {SecurityManager} from '../../../src/common/security/SecurityManager';
import {tiledMapLayer} from '../../../src/leaflet/mapping/TiledMapLayer';

var wsHost = "ws:\//" + "117.122.248.69:8800";
var urlDataFlow = wsHost + "/iserver/services/dataflow/dataflow";
var urlMap = "http://117.122.248.69:8090/iserver/services/map-china400/rest/maps/China";
describe('leaflet_DataFlowLayer', () => {
    var originalTimeout;
    var testDiv, map;
    var token = "15xQ_l77895DvXHYKWPesuU7x0tenRLuYXgjxX4x_s51Wqh9qrQiLuLKudwWWm6vQVTXej2cXEQKcIcFAxxzOw..";
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
                properties: {id: 1, time: new Date()}
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
                properties: {id: 2, time: new Date()}
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
                properties: {id: 3, time: new Date()}
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
                properties: {id: 4, time: new Date()}
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

    xit('setExcludeField', (done) => {
        var layer;
        try {
            layer = dataFlowLayer(urlDataFlow);
            layer.addTo(map);
            layer.setExcludeField("id");
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

    xit('setGeometry', (done) => {
        var layer;
        try {
            layer = dataFlowLayer(urlDataFlow);
            layer.addTo(map);
            var geometry = {
                coordinates: [[[116.381741960923, 39.8765100055449], [116.414681699817, 39.8765100055449], [116.414681699817, 39.8415115329708], [116.381741960923, 39.8415115329708], [116.381741960923, 39.8765100055449]]],
                type: "Polygon"
            };
            layer.setGeometry(geometry);
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

    xit('destroy', () => {
        var layer;
        try {
            layer = dataFlowLayer(urlDataFlow);
            layer.addTo(map);
            layer.destroy();
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }
            if (layer) {
                layer.remove();
            }

        }
    })
});




