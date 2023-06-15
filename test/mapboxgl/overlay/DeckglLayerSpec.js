import mapboxgl from 'mapbox-gl';
import '../../libs/deck.gl/5.1.3/deck.gl';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {LineString} from '../../../src/common/commontypes/geometry/LineString';
import {DeckglLayer} from '../../../src/mapboxgl/overlay/DeckglLayer';

mapboxgl.accessToken = 'pk.eyJ1IjoibW9ua2VyIiwiYSI6ImNpd2Z6aTE5YTAwdHEyb2tpOWs2ZzRydmoifQ.LwQMRArUP8Q9P7QApuOIHg';
describe('mapboxgl_DeckglLayer', () => {
    var originalTimeout;
    var testDiv, map, deckglLayer, features;
    beforeAll((done) => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [13.413952, 52.531913],
            zoom: 16.000000000000004,
            pitch: 33.2
        });
        var pointList = [],
            p1 = new Point(20.05408801141, 38.837029131724),
            p2 = new Point(18.80757663534, 38.606951847395),
            p3 = new Point(17.43207212138, 38.530259419285);
        pointList.push(p1);
        pointList.push(p2);
        pointList.push(p3);
        var line = new LineString(pointList);
        features = {
            fieldNames: [],
            fieldValues: [],
            geometry: line
        };
        map.on('load', function() {
          done();
        })
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        document.body.removeChild(testDiv);
    });

    it('onAdd_PathLayer', (done) => {
        deckglLayer = new DeckglLayer("path-layer", {
            data: features,
            props: {
                strokeWidth: 12 //线宽
            },
            callback: {
                getSourcePosition: d => d.from.coordinates,
                getTargetPosition: d => d.to.coordinates,
                getSourceColor: d => [Math.sqrt(d.inbound), 140, 0],
                getTargetColor: d => [Math.sqrt(d.outbound), 140, 0],
            }
        });
        deckglLayer.onAdd(map);

        setTimeout(() => {
            expect(deckglLayer.deckGL).not.toBeNull();
            done();
        }, 0)
    });

    it('onAdd_ArcLayer', (done) => {
        deckglLayer = new DeckglLayer("arc-layer", {
            data: features,
            props: {
                strokeWidth: 12 //线宽
            },
            callback: {
                getSourcePosition: d => d.from.coordinates,
                getTargetPosition: d => d.to.coordinates,
                getSourceColor: d => [Math.sqrt(d.inbound), 140, 0],
                getTargetColor: d => [Math.sqrt(d.outbound), 140, 0],
            }
        });
        deckglLayer.onAdd(map);

        setTimeout(() => {
            expect(deckglLayer.deckGL).not.toBeNull();
            done();
        }, 0)
    });

    it('onAdd_HexagonLayer', (done) => {
        deckglLayer = new DeckglLayer("hexagon-layer", {
            data: features,
            props: {
                strokeWidth: 12 //线宽
            },
            callback: {
                getSourcePosition: d => d.from.coordinates,
                getTargetPosition: d => d.to.coordinates,
                getSourceColor: d => [Math.sqrt(d.inbound), 140, 0],
                getTargetColor: d => [Math.sqrt(d.outbound), 140, 0],
            }
        });
        deckglLayer.onAdd(map);

        setTimeout(() => {
            expect(deckglLayer.deckGL).not.toBeNull();
            done();
        }, 0)
    });

    it('onAdd_PolygonLayer', (done) => {
        deckglLayer = new DeckglLayer("polygon-layer", {
            data: features,
            props: {
                strokeWidth: 12 //线宽
            },
            callback: {
                getSourcePosition: d => d.from.coordinates,
                getTargetPosition: d => d.to.coordinates,
                getSourceColor: d => [Math.sqrt(d.inbound), 140, 0],
                getTargetColor: d => [Math.sqrt(d.outbound), 140, 0],
            }
        });
        deckglLayer.onAdd(map);

        setTimeout(() => {
            expect(deckglLayer.deckGL).not.toBeNull();
            done();
        }, 0)
    });

    it('onAdd_scatter-plot', (done) => {
        var p1 = new Point(20.05408801141, 38.837029131724);
        var p2 = new Point(18.80757663534, 38.606951847395);
        var p3 = new Point(17.43207212138, 38.530259419285);
        deckglLayer = new DeckglLayer("scatter-plot", {
            data: {p1, p2, p3},
            props: {
                radiusScale: 300,
                radiusMaxPixels: 500,
                opacity: 0.3,
                autoHighlight: true,
                highlightColor: [255, 255, 0, 255],
            },
            callback: {
                getPosition: function (feature) {
                    if (!feature || !feature.Longitude || !feature.Latitude) {
                        return [0, 0, 0];
                    }
                    return [Number(feature.Longitude), Number(feature.Latitude), 0];
                },
                getColor: function (feature) {
                    if (feature.Magnitude >= 2.5 && feature.Magnitude <= 3.31) {
                        return [118, 42, 131];
                    }
                    return [0, 0, 0, 0]
                },
                getRadius: function (feature) {

                    return Math.pow(Number(feature.Magnitude), 2.5);
                }
            }
        });
        deckglLayer.onAdd(map);
        setTimeout(() => {
            expect(deckglLayer.deckGL).not.toBeNull();
            done();
        }, 0)
    });

    it('setVisibility', (done) => {
        deckglLayer.setVisibility(false);
        expect(deckglLayer.visibility).toBeFalsy;
        done();
    });

    it('setData,removeFromMap', (done) => {
        var data = [
            {"ADDRESS": "939 ELLIS ST", "RACKS": 2, "SPACES": 4, "COORDINATES": [-122.42177834, 37.78346622]},
            {"ADDRESS": "1380 HOWARD ST", "RACKS": 1, "SPACES": 2, "COORDINATES": [-122.414411, 37.774458]}
        ];
        deckglLayer = new DeckglLayer("hexagon-layer", {
            data: features,
            props: {
                strokeWidth: 12 //线宽
            },
            callback: {
                getSourcePosition: d => d.from.coordinates,
                getTargetPosition: d => d.to.coordinates,
                getSourceColor: d => [Math.sqrt(d.inbound), 140, 0],
                getTargetColor: d => [Math.sqrt(d.outbound), 140, 0],
            }
        });
        map.addLayer(deckglLayer);
        setTimeout(() => {
            deckglLayer.setData(data);
            expect(deckglLayer.deckGL).not.toBeNull();
            expect(deckglLayer.data).toEqual(data);
            expect(deckglLayer.data.length).toEqual(2);
            done();
        }, 0)


    });

    it('addData,removeData', (done) => {
        var data = [
            {"ADDRESS": "939 ELLIS ST", "RACKS": 2, "SPACES": 4, "COORDINATES": [-122.42177834, 37.78346622]},
            {"ADDRESS": "1380 HOWARD ST", "RACKS": 1, "SPACES": 2, "COORDINATES": [-122.414411, 37.774458]},
            {"ADDRESS": "685 CHENERY ST", "RACKS": 1, "SPACES": 2, "COORDINATES": [-122.433618, 37.73435]}
        ];
        deckglLayer = new DeckglLayer("arc-layer", {
            data: features,
            props: {
                strokeWidth: 12 //线宽
            },
            callback: {
                getSourcePosition: d => d.from.coordinates,
                getTargetPosition: d => d.to.coordinates,
                getSourceColor: d => [Math.sqrt(d.inbound), 140, 0],
                getTargetColor: d => [Math.sqrt(d.outbound), 140, 0],
            }
        });
        map.addLayer(deckglLayer);

        setTimeout(() => {
            deckglLayer.addData(data);
            expect(deckglLayer.deckGL).not.toBeNull();
            expect(deckglLayer.data.length).toEqual(4);
        }, 0)
        setTimeout(() => {
            deckglLayer.removeData();
            expect(deckglLayer.deckGL).not.toBeNull();
            expect(deckglLayer.data.length).toEqual(0);
            done();
        }, 0)
    });

    it('setStyle,hexagon-layer', (done) => {
        deckglLayer = new DeckglLayer("hexagon-layer", {
            data: features,
            props: {
                radius: 100 //线宽
            }
        });
        map.addLayer(deckglLayer);

        setTimeout(() => {
            expect(deckglLayer.deckGL).not.toBeNull();
            expect(deckglLayer.deckGL.props.radius).toEqual(100);
            deckglLayer.setStyle({ radius: 1000 });
            expect(deckglLayer.deckGL.props.radius).toEqual(1000);
            done();
        }, 0)
        
    });
});