﻿import {
    DataFlowService
} from '../../../src/openlayers/services/DataFlowService';
import {
    DataFlow
} from '../../../src/openlayers/overlay/DataFlow';

import { Server } from 'mock-socket';
import Fill from 'ol/style/Fill';
import Map from 'ol/Map';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';

var urlDataFlow = "ws:\//localhost:8004/";
var server;

describe('ol_DataFlow', () => {
    var originalTimeout;
    var testDiv, map;
    var fill = new Fill({
        color: 'rgba(255,0,0,0.9)'
    });
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
        map = new Map({
            target: 'map',
            view: new View({
                center: olProj.transform([116.42, 39.88], 'EPSG:4326', 'EPSG:3857'),
                zoom: 12,
                projection: 'EPSG:3857'
            })
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
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        layer = null;
        service = null;

    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        if (service) {
            service.unSubscribe();
            service.unBroadcast();
        }
        if (layer) {
            map.removeLayer(layer);
        }
    });
    afterAll(() => {
        mockServer.stop();
        mockServer = null;
        map = null;
        window.document.body.removeChild(testDiv);
    });


    it('broadcast_Point', (done) => {
        var broadcast_Point = (flowService) => {
            var feature = {
                geometry: {
                    coordinates: olProj.transform([116.69801217000008, 39.86826211908377], 'EPSG:4326', 'EPSG:3857'),
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
            var layer = new VectorLayer({
                source: new DataFlow({
                    ws: urlDataFlow
                }),
                style: new Style({
                    image: new CircleStyle({
                        fill: fill,
                        radius: 6
                    }),
                    fill: fill,
                })
            });
            map.addLayer(layer);
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
                        [116.381741960923, 39.8765100055449],
                        [116.414681699817, 39.8765100055449],
                        [116.414681699817, 39.8415115329708]
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
            var layer = new VectorLayer({
                source: new DataFlow({
                    ws: urlDataFlow
                }),
                style: new Style({
                    image: new CircleStyle({
                        fill: fill,
                        radius: 6
                    }),
                    fill: fill,
                })
            });
            map.addLayer(layer);
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
                            [116.381741960923, 39.8765100055449],
                            [116.414681699817, 39.8765100055449],
                            [116.414681699817, 39.8415115329708],
                            [116.381741960923, 39.8765100055449]
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
            var layer = new VectorLayer({
                source: new DataFlow({
                    ws: urlDataFlow
                }),
                style: new Style({
                    image: new CircleStyle({
                        fill: fill,
                        radius: 6
                    }),
                    fill: fill,
                })
            });
            map.addLayer(layer);
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
                                [116.381741960923, 39.8765100055449],
                                [116.414681699817, 39.8765100055449],
                                [116.414681699817, 39.8415115329708],
                                [116.381741960923, 39.8765100055449]
                            ]
                        ],
                        [
                            [
                                [115.381741960923, 39.8765100055449],
                                [116.414681699817, 39.8765100055449],
                                [116.414681699817, 39.8415115329708],
                                [115.381741960923, 39.8765100055449]
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
            var layer = new VectorLayer({
                source: new DataFlow({
                    ws: urlDataFlow
                }),
                style: new Style({
                    image: new CircleStyle({
                        fill: fill,
                        radius: 6
                    }),
                    fill: fill,
                })
            });
            map.addLayer(layer);
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
            }, 2000)
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }
        }
    });

    it('setExcludeField', (done) => {
        var source = new DataFlow({
            ws: urlDataFlow
        });
        var socket = new WebSocket(urlDataFlow);
        var service = new DataFlowService(urlDataFlow)
        source.dataService = service;
        spyOn(socket, "send").and.callFake(() => {
            console.log("fakesend");
        });
        spyOn(source.dataService.dataFlow, '_connect').and.callFake(() => {
            return socket;
        });
       
        source.dataService.initSubscribe();
        setTimeout(() => {
            source.setExcludeField("id");
            expect(source.excludeField).toBe("id");
            done();
        }, 2000)

    });

    it('setGeometry', (done) => {
        var source = new DataFlow({
            ws: urlDataFlow
        });
        var socket = new WebSocket(urlDataFlow);
        var service = new DataFlowService(urlDataFlow)
        source.dataService = service;
        spyOn(socket, "send").and.callFake(() => {
            console.log("fakesend");
        });
        spyOn(source.dataService.dataFlow, '_connect').and.callFake(() => {
            return socket;
        });
       
        source.dataService.initSubscribe();
        // spyOn(source.service.dataFlow.subscribeWebSocket, "send").and.callFake(() => {
        //     console.log("fakesend");
        // });
        var geometry = {
            coordinates: [
                [
                    [116.381741960923, 39.8765100055449],
                    [116.414681699817, 39.8765100055449],
                    [116.414681699817, 39.8415115329708],
                    [116.381741960923, 39.8415115329708],
                    [116.381741960923, 39.8765100055449]
                ]
            ],
            type: "Polygon"
        };

        setTimeout(() => {
            source.setGeometry(geometry);
            expect(source.geometry).not.toBeNull();
            done();
        }, 0)
    });
});