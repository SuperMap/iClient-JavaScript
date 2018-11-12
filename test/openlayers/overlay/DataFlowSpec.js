﻿import ol from 'openlayers';
import {
    TileSuperMapRest
} from '../../../src/openlayers/mapping/TileSuperMapRest';
import {
    DataFlowService
} from '../../../src/openlayers/services/DataFlowService';
import {
    DataFlow
} from '../../../src/openlayers/overlay/DataFlow';
import {
    SecurityManager
} from '../../../src/common/security/SecurityManager';
import {
    TiledMapLayer
} from '../../../src/leaflet/mapping/TiledMapLayer';

var wsHost = "ws:\//" + "54.223.164.155:8800";
var urlDataFlow = wsHost + "/iserver/services/dataflow/dataflow";
var urlMap = "http://54.223.164.155:8090/iserver/services/map-china400/rest/maps/China";
describe('ol_DataFlow', () => {
    var originalTimeout;
    var testDiv, map;
    var token = "15xQ_l77895DvXHYKWPesuU7x0tenRLuYXgjxX4x_s51Wqh9qrQiLuLKudwWWm6vQVTXej2cXEQKcIcFAxxzOw..";
    var fill = new ol.style.Fill({
        color: 'rgba(255,0,0,0.9)'
    });
    var layer,service;
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
        map = new ol.Map({
            target: 'map',
            view: new ol.View({
                center: ol.proj.transform([116.42, 39.88], 'EPSG:4326', 'EPSG:3857'),
                zoom: 12,
                projection: 'EPSG:3857'
            })
        });
        // map.addLayer(new ol.layer.Tile({
        //     source: new TileSuperMapRest({
        //         urlMap: urlMap
        //     })
        // }));
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
        window.document.body.removeChild(testDiv);
    });


    it('broadcast_Point', (done) => {
        var broadcast_Point = (flowService) => {
            var feature = {
                geometry: {
                    coordinates: ol.proj.transform([116.69801217000008, 39.86826211908377], 'EPSG:4326', 'EPSG:3857'),
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
            var layer = new ol.layer.Vector({
                source: new ol.source.DataFlow({
                    ws: urlDataFlow
                }),
                style: new ol.style.Style({
                    image: new ol.style.Circle({
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
            var layer = new ol.layer.Vector({
                source: new ol.source.DataFlow({
                    ws: urlDataFlow
                }),
                style: new ol.style.Style({
                    image: new ol.style.Circle({
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
            }, 4000)
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
            var layer = new ol.layer.Vector({
                source: new ol.source.DataFlow({
                    ws: urlDataFlow
                }),
                style: new ol.style.Style({
                    image: new ol.style.Circle({
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
            var layer = new ol.layer.Vector({
                source: new ol.source.DataFlow({
                    ws: urlDataFlow
                }),
                style: new ol.style.Style({
                    image: new ol.style.Circle({
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
            }, 4000)
        } finally {
            if (timer) {
                window.clearInterval(timer);
            }
            }
    });

    it('setExcludeField', (done) => {
       
            var source = new ol.source.DataFlow({
                ws: urlDataFlow
            });
            source.on('subscribeSuccessed', (e) => {
                source.setExcludeField("id");
            });

            var layer = new ol.layer.Vector({
                source: source,
                style: new ol.style.Style({
                    image: new ol.style.Circle({
                        fill: fill,
                        radius: 6
                    }),
                    fill: fill,
                })
            });
            map.addLayer(layer);

            setTimeout(() => {
                expect(layer).not.toBeNull();
                done();
            }, 4000)
        
    });

    it('setGeometry', (done) => {
            var source = new ol.source.DataFlow({
                ws: urlDataFlow
            });
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
            source.on('subscribeSuccessed', (e) => {
                source.setGeometry(geometry);
            });

            var layer = new ol.layer.Vector({
                source: source,
                style: new ol.style.Style({
                    image: new ol.style.Circle({
                        fill: fill,
                        radius: 6
                    }),
                    fill: fill,
                })
            });
            map.addLayer(layer);

            setTimeout(() => {
                expect(layer).not.toBeNull();
                done();
            }, 4000)
    });
});