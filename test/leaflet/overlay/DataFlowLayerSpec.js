require('../../../src/leaflet/overlay/DataFlowLayer');
require('../../../src/common/security/SecurityManager');

wsHost = "ws:\//" + "117.122.248.69:8800";
var urlDataFlow = wsHost + "/iserver/services/dataflow/dataflow";
var urlMap = "http://117.122.248.69:8090/iserver/services/map-china400/rest/maps/China";
describe('leaflet_DataFlowLayer', function () {
    var originalTimeout;
    var testDiv, map;
    var token = "15xQ_l77895DvXHYKWPesuU7x0tenRLuYXgjxX4x_s51Wqh9qrQiLuLKudwWWm6vQVTXej2cXEQKcIcFAxxzOw..";
    beforeAll(function () {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "400px";
        window.document.body.appendChild(testDiv);
        SuperMap.SecurityManager.registerToken(urlDataFlow, token);
        map = L.map('map', {
            preferCanvas: true,
            crs: L.CRS.EPSG3857,
            center: [39.88, 116.42],
            maxZoom: 18,
            zoom: 12
        });
        L.supermap.tiledMapLayer(urlMap).addTo(map);
    });
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(function () {
        window.document.body.removeChild(testDiv);
    });

    xit('bug', function () {
        console.log('1、destroy分支走不进去');
        console.log('2、unBroadcast的if分支条件缺少!');
        console.log("3、setGeometry、setExcludeField方法报错:Failed to execute 'send' on 'WebSocket: Still in CONNECTING state'");
    });

    it('broadcast_Point', function (done) {
        function broadcast_Point() {
            var feature = {
                geometry: {
                    coordinates: [116.69801217000008, 39.86826211908377],
                    type: "Point"
                },
                id: 1,
                type: "Feature",
                properties: {id: 1, time: new Date()}
            };
            dataFlowService.broadcast(feature);
        }

        var dataFlowLayer;
        var dataFlowService;
        var timer;
        try {
            dataFlowLayer = L.supermap.dataFlowLayer(urlDataFlow, {
                style: function () {
                    return {
                        fillColor: "red",
                        fillOpacity: 1,
                        radius: 6,
                        weight: 0
                    };
                }
            });
            dataFlowLayer.addTo(map);
            dataFlowService = L.supermap.dataFlowService(urlDataFlow);
            dataFlowService.initBroadcast();
            dataFlowService.on('broadcastSocketConnected', function (e) {
                var dataFlow = dataFlowService.dataFlow;
                expect(dataFlow.CLASS_NAME).toBe("SuperMap.DataFlowService");
                expect(dataFlow.EVENT_TYPES.length).toEqual(8);
                expect(dataFlow.broadcastWebSocket.binaryType).toBe("blob");
                expect(dataFlow.broadcastWebSocket.url).toBe(urlDataFlow + "/broadcast?token=" + token);
                timer = window.setInterval(broadcast_Point, 1000);
            });

            setTimeout(function () {
                expect(dataFlowLayer.idCache).not.toBeNull();
                expect(dataFlowLayer.url).toBe(urlDataFlow);
                expect(dataFlowLayer.options).not.toBeNull();
                expect(dataFlowService).not.toBeNull();
                expect(dataFlowService._events.broadcastSocketConnected.length).toEqual(1);
                done();
            }, 4000)
        }
        finally {
            if (timer) {
                window.clearInterval(timer);
            }
            if (dataFlowService) {
                dataFlowService.unSubscribe();
                dataFlowService.unBroadcast();
                dataFlowService.destroy();
            }
            if (dataFlowLayer) {
                dataFlowLayer.remove();
            }
        }
    });

    it('broadcast_LineString', function (done) {
        function broadcast_LineString() {
            var feature = {
                geometry: {
                    coordinates: [[116.381741960923, 39.8765100055449], [116.414681699817, 39.8765100055449], [116.414681699817, 39.8415115329708]],
                    type: "LineString"
                },
                id: 2,
                type: "Feature",
                properties: {id: 2, time: new Date()}
            };
            dataFlowService.broadcast(feature);
        }

        var dataFlowLayer;
        var dataFlowService;
        var timer;
        try {
            dataFlowLayer = L.supermap.dataFlowLayer(urlDataFlow);
            dataFlowLayer.addTo(map);
            dataFlowService = L.supermap.dataFlowService(urlDataFlow);
            dataFlowService.initBroadcast();
            dataFlowService.on('broadcastSocketConnected', function (e) {
                timer = window.setInterval(broadcast_LineString, 1000);
            });
            setTimeout(function () {
                expect(dataFlowService).not.toBeNull();
                done();
            }, 4000)
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }
            if (dataFlowService) {
                dataFlowService.unSubscribe();
                dataFlowService.unBroadcast();
                dataFlowService.destroy();
            }
            if (dataFlowLayer) {
                dataFlowLayer.remove();
            }

        }
    });

    it('broadcast_Polygon', function (done) {
        function broadcast_Polygon() {
            var feature = {
                geometry: {
                    coordinates: [[[116.381741960923, 39.8765100055449], [116.414681699817, 39.8765100055449], [116.414681699817, 39.8415115329708], [116.381741960923, 39.8765100055449]]],
                    type: "Polygon"
                },
                id: 3,
                type: "Feature",
                properties: {id: 3, time: new Date()}
            };
            dataFlowService.broadcast(feature);
        }

        var dataFlowLayer;
        var dataFlowService;
        var timer;
        try {
            dataFlowLayer = L.supermap.dataFlowLayer(urlDataFlow);
            dataFlowLayer.addTo(map);
            dataFlowService = L.supermap.dataFlowService(urlDataFlow);
            dataFlowService.initBroadcast();
            dataFlowService.on('broadcastSocketConnected', function (e) {
                timer = window.setInterval(broadcast_Polygon, 1000);
            });
            setTimeout(function () {
                expect(dataFlowService).not.toBeNull();
                dataFlowService.unSubscribe();
                dataFlowService.unBroadcast();
                dataFlowService.destroy();
                done();
            }, 4000)
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }
            if (dataFlowService) {
                dataFlowService.unSubscribe();
                dataFlowService.unBroadcast();
                dataFlowService.destroy();
            }
            if (dataFlowLayer) {
                dataFlowLayer.remove();
            }

        }
    });

    it('broadcast_MultiPolygon', function (done) {
        function broadcast_MultiPolygon() {
            var feature = {
                geometry: {
                    coordinates: [[[[116.381741960923, 39.8765100055449], [116.414681699817, 39.8765100055449], [116.414681699817, 39.8415115329708], [116.381741960923, 39.8765100055449]]], [[[115.381741960923, 39.8765100055449], [116.414681699817, 39.8765100055449], [116.414681699817, 39.8415115329708], [115.381741960923, 39.8765100055449]]]],
                    type: "MultiPolygon"
                },
                id: 4,
                type: "Feature",
                properties: {id: 4, time: new Date()}
            };
            dataFlowService.broadcast(feature);
        }

        var dataFlowLayer;
        var dataFlowService;
        var timer;
        try {
            dataFlowLayer = L.supermap.dataFlowLayer(urlDataFlow);
            dataFlowLayer.addTo(map);
            dataFlowService = L.supermap.dataFlowService(urlDataFlow);
            dataFlowService.initBroadcast();
            dataFlowService.on('broadcastSocketConnected', function (e) {
                timer = window.setInterval(broadcast_MultiPolygon, 1000);
            });
            setTimeout(function () {
                expect(dataFlowService).not.toBeNull();
                dataFlowService.unSubscribe();
                dataFlowService.unBroadcast();
                dataFlowService.destroy();
                done();
            }, 4000)
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }
            if (dataFlowService) {
                dataFlowService.unSubscribe();
                dataFlowService.unBroadcast();
                dataFlowService.destroy();
            }
            if (dataFlowLayer) {
                dataFlowLayer.remove();
            }

        }
    });

    it('onRemove', function (done) {
        var dataFlowLayer;
        try {
            dataFlowLayer = L.supermap.dataFlowLayer(urlDataFlow);
            dataFlowLayer.addTo(map);
            dataFlowLayer.onRemove(map);
            setTimeout(function () {
                expect(dataFlowLayer).not.toBeNull();
                done();
            }, 4000)
        } finally {

            if (dataFlowLayer) {
                dataFlowLayer.remove();
            }

        }
    });

    xit('setExcludeField', function (done) {
        var dataFlowLayer;
        try {
            dataFlowLayer = L.supermap.dataFlowLayer(urlDataFlow);
            dataFlowLayer.addTo(map);
            dataFlowLayer.setExcludeField("id");
            setTimeout(function () {
                expect(dataFlowLayer).not.toBeNull();
                done();
            }, 4000)
        } finally {
            if (dataFlowLayer) {
                dataFlowLayer.remove();
            }

        }
    });

    xit('setGeometry', function (done) {
        var dataFlowLayer;
        try {
            dataFlowLayer = L.supermap.dataFlowLayer(urlDataFlow);
            dataFlowLayer.addTo(map);
            var geometry = {
                coordinates: [[[116.381741960923, 39.8765100055449], [116.414681699817, 39.8765100055449], [116.414681699817, 39.8415115329708], [116.381741960923, 39.8415115329708], [116.381741960923, 39.8765100055449]]],
                type: "Polygon"
            };
            dataFlowLayer.setGeometry(geometry);
            setTimeout(function () {
                expect(dataFlowLayer).not.toBeNull();
                done();
            }, 4000)
        } finally {

            if (dataFlowLayer) {
                dataFlowLayer.remove();
            }

        }
    });

    xit('destroy', function () {
        var dataFlowLayer;
        try {
            dataFlowLayer = L.supermap.dataFlowLayer(urlDataFlow);
            dataFlowLayer.addTo(map);
            dataFlowLayer.destroy();
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }
            if (dataFlowLayer) {
                dataFlowLayer.remove();
            }

        }
    })
});




