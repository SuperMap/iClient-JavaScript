import ol from 'openlayers';
import {CloverShape} from '../../../src/openlayers/overlay/graphic/CloverShape';
import {HitCloverShape} from '../../../src/openlayers/overlay/graphic/HitCloverShape';
import {Graphic} from '../../../src/openlayers/overlay/Graphic';
import {MapService} from '../../../src/openlayers/services/MapService';
import {TileSuperMapRest} from '../../../src/openlayers/mapping/TileSuperMapRest';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

var url = "http://supermapiserver:8090/iserver/services/map-china400/rest/maps/China_4326";
describe('openlayers_GraphicLayer', () => {
    var originalTimeout;
    var testDiv, map, graphicLayer;
    var coors = [
        [-35.16, 38.05],
        [-36.16, 39.05],
        [-36.16, 40.05],
        [-37.16, 40.05],
        [-38.16, 39.05]
    ]
    var escapedJson = "{\"viewBounds\":{\"top\":66.5212729371629,\"left\":-66.52127293716292,\"bottom\":-66.52127293716293,\"leftBottom\":{\"x\":-66.52127293716292,\"y\":-66.52127293716293},\"right\":66.52127293716292,\"rightTop\":{\"x\":66.52127293716292,\"y\":66.5212729371629}},\"viewer\":{\"leftTop\":{\"x\":0,\"y\":0},\"top\":0,\"left\":0,\"bottom\":256,\"rightBottom\":{\"x\":256,\"y\":256},\"width\":256,\"right\":256,\"height\":256},\"distanceUnit\":\"METER\",\"minVisibleTextSize\":0.1,\"coordUnit\":\"DEGREE\",\"scale\":4.573415833095347E-9,\"description\":\"\",\"paintBackground\":true,\"maxVisibleTextSize\":1000,\"maxVisibleVertex\":3600000,\"clipRegionEnabled\":false,\"antialias\":true,\"textOrientationFixed\":false,\"angle\":0,\"prjCoordSys\":{\"distanceUnit\":\"METER\",\"projectionParam\":null,\"epsgCode\":4326,\"coordUnit\":\"DEGREE\",\"name\":\"Longitude / Latitude Coordinate System---GCS_WGS_1984\",\"projection\":null,\"type\":\"PCS_EARTH_LONGITUDE_LATITUDE\",\"coordSystem\":{\"datum\":{\"name\":\"D_WGS_1984\",\"type\":\"DATUM_WGS_1984\",\"spheroid\":{\"flatten\":0.00335281066474748,\"name\":\"WGS_1984\",\"axis\":6378137,\"type\":\"SPHEROID_WGS_1984\"}},\"unit\":\"DEGREE\",\"spatialRefType\":\"SPATIALREF_EARTH_LONGITUDE_LATITUDE\",\"name\":\"GCS_WGS_1984\",\"type\":\"GCS_WGS_1984\",\"primeMeridian\":{\"longitudeValue\":0,\"name\":\"Greenwich\",\"type\":\"PRIMEMERIDIAN_GREENWICH\"}}},\"minScale\":0,\"markerAngleFixed\":false,\"overlapDisplayedOptions\":{\"allowPointWithTextDisplay\":true,\"horizontalOverlappedSpaceSize\":0,\"allowPointOverlap\":false,\"allowThemeGraduatedSymbolOverlap\":false,\"verticalOverlappedSpaceSize\":0,\"allowTextOverlap\":false,\"allowThemeGraphOverlap\":false,\"allowTextAndPointOverlap\":false},\"visibleScales\":[1.6901635716026555E-9,3.3803271432053056E-9,6.760654286410611E-9,1.3521308572821242E-8,2.7042617145642484E-8,5.408523429128511E-8,1.0817046858256998E-7,2.1634093716513974E-7,4.3268187433028044E-7,8.653637486605571E-7,1.7307274973211203E-6,3.4614549946422405E-6,6.9229099892844565E-6],\"visibleScalesEnabled\":false,\"customEntireBoundsEnabled\":false,\"clipRegion\":{\"center\":null,\"parts\":null,\"style\":null,\"prjCoordSys\":null,\"id\":0,\"type\":\"REGION\",\"partTopo\":null,\"points\":null},\"maxScale\":1.0E12,\"customParams\":\"\",\"center\":{\"x\":0,\"y\":-1.4210854715202004E-14},\"dynamicPrjCoordSyses\":[{\"distanceUnit\":null,\"projectionParam\":null,\"epsgCode\":0,\"coordUnit\":null,\"name\":null,\"projection\":null,\"type\":\"PCS_ALL\",\"coordSystem\":null}],\"colorMode\":\"DEFAULT\",\"textAngleFixed\":false,\"overlapDisplayed\":false,\"userToken\":{\"userID\":\"\"},\"cacheEnabled\":true,\"dynamicProjection\":true,\"autoAvoidEffectEnabled\":true,\"customEntireBounds\":null,\"name\":\"China_4326\",\"bounds\":{\"top\":85.05112877980648,\"left\":-180,\"bottom\":-85.0511287798065,\"leftBottom\":{\"x\":-180,\"y\":-85.0511287798065},\"right\":180,\"rightTop\":{\"x\":180,\"y\":85.05112877980648}},\"backgroundStyle\":{\"fillGradientOffsetRatioX\":0,\"markerSize\":2.4,\"fillForeColor\":{\"red\":255,\"green\":255,\"blue\":255,\"alpha\":255},\"fillGradientOffsetRatioY\":0,\"markerWidth\":0,\"markerAngle\":0,\"fillSymbolID\":0,\"lineColor\":{\"red\":0,\"green\":0,\"blue\":0,\"alpha\":255},\"markerSymbolID\":0,\"lineWidth\":0.1,\"markerHeight\":0,\"fillOpaqueRate\":100,\"fillBackOpaque\":true,\"fillBackColor\":{\"red\":255,\"green\":255,\"blue\":255,\"alpha\":255},\"fillGradientMode\":\"NONE\",\"lineSymbolID\":0,\"fillGradientAngle\":0}}";
    beforeEach(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        window.document.body.removeChild(testDiv);
    });

    it('constructor_canvas', (done) => {
        spyOn(FetchRequest, 'commit').and.callFake(() => {
            return Promise.resolve(new Response(escapedJson));
        });
        var count = 5; //矢量点的个数
        var graphics = [];
        new MapService(url).getMapInfo((serviceResult) => {
            map = new ol.Map({
                target: 'map',
                view: new ol.View({
                    center: [0, 0],
                    zoom: 2,
                    projection: 'EPSG:4326'
                }),
                renderer: ['canvas']
            });
            var options = TileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            var layer = new ol.layer.Tile({
                source: new TileSuperMapRest(options)
            });
            map.addLayer(layer);
            var randomCircleStyles = new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: '#000000'
                }),
                stroke: new ol.style.Stroke({
                    color: '#000000'
                })
            });
            for (var j = 0; j < count; ++j) {
                graphics[j] = new ol.Graphic(new ol.geom.Point(coors[j]));
                graphics[j].setStyle(randomCircleStyles);
            }
            var clone = graphics[0].clone();
            expect(clone.getId()).toEqual(graphics[0].getId());
            expect(clone.getGeometry()).toEqual(graphics[0].getGeometry());
            expect(clone.getStyle()).toEqual(graphics[0].getStyle());
            clone.destroy();
            graphicLayer = new ol.layer.Image({
                source: new Graphic({
                    graphics: graphics,
                    map: map,
                    highLightStyle: new ol.style.Circle({
                        radius: 5,
                        fill: new ol.style.Fill({
                            color: '#000000'
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#000000'
                        })
                    })
                })
            });
            map.addLayer(graphicLayer);
        });
        setTimeout(() => {
            expect(1).not.toBeNull();
            var a = new Graphic({
                graphics: graphics,
                map: map
            }).forEachFeatureAtCoordinate(coors[1], 1, (result) => {
                console.log(result);
            });
            expect(a).not.toBeNull();
            map.removeLayer(graphicLayer);
            done();
        }, 1000)
    });

    it('constructor_webgl', (done) => {
        spyOn(FetchRequest, 'commit').and.callFake(() => {
            return Promise.resolve(new Response(escapedJson));
        });
        var count = 5; //矢量点的个数
        var graphics = [];
        new MapService(url).getMapInfo((serviceResult) => {
            map = new ol.Map({
                target: 'map',
                view: new ol.View({
                    center: [0, 0],
                    zoom: 2,
                    projection: 'EPSG:4326'
                }),
                renderer: ['webgl']
            });
            var options = TileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            var layer = new ol.layer.Tile({
                source: new TileSuperMapRest(options)
            });
            map.addLayer(layer);
            var randomCircleStyles = new ol.style.RegularShape({
                radius: 5,
                fill: new ol.style.Fill({
                    color: '#000000'
                }),
                stroke: new ol.style.Stroke({
                    color: '#000000'
                }),
                points: 3
            });
            for (var j = 0; j < count; ++j) {
                graphics[j] = new ol.Graphic(new ol.geom.Point(coors[j]));
                graphics[j].setStyle(randomCircleStyles);
            }
            graphicLayer = new ol.layer.Image({
                source: new Graphic({
                    graphics: graphics,
                    map: map,
                    highLightStyle: new ol.style.RegularShape({
                        radius: 5,
                        fill: new ol.style.Fill({
                            color: '#000000'
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#000000'
                        }),
                        points: 3
                    })
                })
            });
            map.addLayer(graphicLayer);
        });
        setTimeout(() => {
            expect(1).not.toBeNull();
            map.removeLayer(graphicLayer);
            done();
        }, 1000)
    });

    it('CloverShape', (done) => {
        spyOn(FetchRequest, 'commit').and.callFake(() => {
            return Promise.resolve(new Response(escapedJson));
        });
        var count = 5; //矢量点的个数
        var graphics = [];
        new MapService(url).getMapInfo((serviceResult) => {
            map = new ol.Map({
                target: 'map',
                view: new ol.View({
                    center: [0, 0],
                    zoom: 2,
                    projection: 'EPSG:4326'
                }),
                renderer: ['webgl']
            });
            var options = TileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            var layer = new ol.layer.Tile({
                source: new TileSuperMapRest(options)
            });
            map.addLayer(layer);
            var cloverShapeStyle = new CloverShape({
                radius: 20,
                angle: 30,
                count: 3,
                stroke: new ol.style.Stroke({
                    color: "rgba(0,166,0,1)",
                }),
                fill: new ol.style.Fill({
                    color: "rgba(0,166,0,1)",
                }),
            })
            expect(cloverShapeStyle.getCount()).toEqual(3);
            for (var j = 0; j < count; ++j) {
                graphics[j] = new ol.Graphic(new ol.geom.Point(coors[j]));
                graphics[j].setStyle(cloverShapeStyle);
            }
            var hitCloverShape = new HitCloverShape({
                radius: 20,
                angle: 30,
                stroke: new ol.style.Stroke({
                    color: "rgba(255,166,0,1)",
                }),
                fill: new ol.style.Fill({
                    color: "rgba(255,166,0,1)",
                }),
                sAngle: 30,
                eAngle: 60
            })
            expect(hitCloverShape.getSAngle()).toEqual(30);
            expect(hitCloverShape.getEAngle()).toEqual(60);
            graphicLayer = new ol.layer.Image({
                source: new Graphic({
                    graphics: graphics,
                    map: map,
                    onclick: (result) => {
                        console.log(result);
                    },
                    highLightStyle: hitCloverShape
                })
            });
            map.addLayer(graphicLayer);
        });
        setTimeout(() => {
            expect(1).not.toBeNull();
            graphicLayer.getSource().forEachFeatureAtCoordinate(coors[2], 1, (result) => {
                console.log(result);
            });
            graphicLayer.getSource().forEachFeatureAtCoordinate(coors[1], 1, (result) => {
                console.log(result);
            });
            graphicLayer.getSource().forEachFeatureAtCoordinate([-126.16, 39.05], 1, (result) => {
                console.log(result);
            });
            map.removeLayer(graphicLayer);
            done();
        }, 1000)
    });
});