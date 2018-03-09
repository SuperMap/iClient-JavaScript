import ol from 'openlayers';
import {Range} from '../../../src/openlayers/overlay/Range';
import {TileSuperMapRest} from '../../../src/openlayers/mapping/TileSuperMapRest';

describe('openlayers_Range', () => {
    var originalTimeout, map, testDiv;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        var baseUrl = GlobeParameter.jingjinMapURL + "/maps/京津地区地图",
            extent = [104.07, 30.54, 119.51, 42.31];
        map = new ol.Map({
            target: 'map',
            view: new ol.View({
                center: [116.85, 39.79],
                zoom: 8,
                projection: "EPSG:4326",
                extent: extent
            })
        });
        var layer = new ol.layer.Tile({
            source: new TileSuperMapRest({
                url: baseUrl
            })
        });
        map.addLayer(layer);
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

    var features = [{
        "fieldNames": ["SMID", "SMSDRIW", "SMSDRIN", "SMSDRIE", "SMSDRIS", "SMUSERID", "SMAREA", "SMPERIMETER", "SMGEOMETRYSIZE", "ADMI", "NEWA", "POP_1999", "POP_1995", "POP_1992", "POP_RATE95", "POP_RATE99", "POP_DENSITY99", "NAME", "URBANRURAL", "URBAN", "RURAL", "CITY"],
        "geometry": {
            "center": {"x": 116.59932579818317, "y": 40.634491649885234},
            "parts": [120],
            "style": null,
            "prjCoordSys": null,
            "id": 1,
            "type": "REGION",
            "points": [
                {"x": 116.65601002454922, "y": 41.03663585095796}, {
                    "x": 116.68328592226102,
                    "y": 40.995215339741925
                }, {"x": 116.69998611223293, "y": 40.95716755682179}, {
                    "x": 116.70191473112311,
                    "y": 40.947924751189454
                }, {"x": 116.70493291108872, "y": 40.93556704010134}, {
                    "x": 116.70915707827005,
                    "y": 40.921114823288114
                }, {"x": 116.71630369645828, "y": 40.908551658759066}, {
                    "x": 116.7232704733295,
                    "y": 40.89396705688384
                }, {"x": 116.76637048931372, "y": 40.852172700247515}, {
                    "x": 116.78365186303104,
                    "y": 40.84521356019502
                }, {"x": 116.79957503025246, "y": 40.83832954221104}, {
                    "x": 116.88121050821113,
                    "y": 40.796620212359485
                }, {"x": 116.88877180461256, "y": 40.78911715896209}, {
                    "x": 116.89516447819801,
                    "y": 40.783708041714455
                }, {"x": 116.90050729933508, "y": 40.77634457631153}, {
                    "x": 116.87390775987855,
                    "y": 40.76238941647296
                }, {"x": 116.8620999634057, "y": 40.753819381259945}, {
                    "x": 116.83191507196152,
                    "y": 40.74006654295144
                }, {"x": 116.82157875682066, "y": 40.732440461952045}, {
                    "x": 116.81298384379934,
                    "y": 40.72879855315094
                }, {"x": 116.730195171893, "y": 40.680993718703014}, {
                    "x": 116.71878098421556,
                    "y": 40.67646618637701
                }, {"x": 116.70590384849423, "y": 40.670993764130536}, {
                    "x": 116.70116878609475,
                    "y": 40.64884300247246
                }, {"x": 116.69796256942257, "y": 40.64391357304748}, {
                    "x": 116.67618620365236,
                    "y": 40.58495932398431
                }, {"x": 116.66899749380414, "y": 40.565991646783154}, {
                    "x": 116.66591740155316,
                    "y": 40.54681574477141
                }, {"x": 116.66219377932273, "y": 40.53581112415537}, {
                    "x": 116.65928061837953,
                    "y": 40.51866113480559
                }, {"x": 116.66767733634238, "y": 40.505025840707304}, {
                    "x": 116.67296363193523,
                    "y": 40.4874777351528
                }, {"x": 116.67318649427872, "y": 40.42848678666335}, {
                    "x": 116.67429370100015,
                    "y": 40.41012658888407
                }, {"x": 116.67474694822577, "y": 40.39993270153401}, {
                    "x": 116.67905705052459,
                    "y": 40.340747502682405
                }, {"x": 116.68770005269498, "y": 40.33015423373456}, {
                    "x": 116.69370671804393,
                    "y": 40.32070887782416
                }, {"x": 116.73086883866603, "y": 40.292448468236046}, {
                    "x": 116.74275202300421,
                    "y": 40.2877925471549
                }, {"x": 116.756317938406, "y": 40.27533490857607}, {
                    "x": 116.73458188385827,
                    "y": 40.25768841638424
                }, {"x": 116.72550324811955, "y": 40.24796624844904}, {
                    "x": 116.70653314936281,
                    "y": 40.234665132875854
                }, {"x": 116.68820056824035, "y": 40.22844112918358}, {
                    "x": 116.64744463986011,
                    "y": 40.23145029488959
                }, {"x": 116.61377346529633, "y": 40.237154949882544}, {
                    "x": 116.60169613379892,
                    "y": 40.23976252688282
                }, {"x": 116.58110261433542, "y": 40.238726971207164}, {
                    "x": 116.53672977075374,
                    "y": 40.231711233362944
                }, {"x": 116.52719753973523, "y": 40.23216802793836}, {
                    "x": 116.51485482240172,
                    "y": 40.231731383344126
                }, {"x": 116.46339016319803, "y": 40.241774139582}, {
                    "x": 116.45190705112486,
                    "y": 40.24692674737529
                }, {"x": 116.4396841297173, "y": 40.26376015489367}, {
                    "x": 116.42820311105805,
                    "y": 40.27345094236325
                }, {"x": 116.41495449565353, "y": 40.29441022690985}, {
                    "x": 116.41119809190891,
                    "y": 40.29865584344813
                }, {"x": 116.4008216127689, "y": 40.305242050033804}, {
                    "x": 116.35883709393941,
                    "y": 40.32651024737493
                }, {"x": 116.3522793563845, "y": 40.32986629879278}, {
                    "x": 116.34017310227418,
                    "y": 40.33245960192073
                }, {"x": 116.31078167965507, "y": 40.34094058064336}, {
                    "x": 116.28426236240611,
                    "y": 40.35130398909601
                }, {"x": 116.27241941101936, "y": 40.35693213675699}, {
                    "x": 116.26031073690818,
                    "y": 40.35951806995488
                }, {"x": 116.24546935700967, "y": 40.36223032294056}, {
                    "x": 116.23608673179896,
                    "y": 40.36469574367027
                }, {"x": 116.22380752337433, "y": 40.365244649964}, {
                    "x": 116.21800150878494,
                    "y": 40.370538319412006
                }, {"x": 116.21920062234251, "y": 40.37562210797775}, {
                    "x": 116.20499593177507,
                    "y": 40.40270166078559
                }, {"x": 116.1974873189584, "y": 40.411171201719924}, {
                    "x": 116.18578464674582,
                    "y": 40.41882198479205
                }, {"x": 116.21808667485348, "y": 40.444810430518416}, {
                    "x": 116.22806794715032,
                    "y": 40.44943822836921
                }, {"x": 116.32631863013715, "y": 40.46019274672154}, {
                    "x": 116.35680124286918,
                    "y": 40.46386500267381
                }, {"x": 116.38317442988738, "y": 40.467721708848046}, {
                    "x": 116.44470337356175,
                    "y": 40.49739049611412
                }, {"x": 116.42176194387359, "y": 40.51777977150436}, {
                    "x": 116.42562286692481,
                    "y": 40.53082020480548
                }, {"x": 116.5053083835092, "y": 40.5789367597474}, {
                    "x": 116.51276770786515,
                    "y": 40.5857014521922
                }, {"x": 116.5218595463712, "y": 40.595436939761186}, {
                    "x": 116.54553989615313,
                    "y": 40.61465237389866
                }, {"x": 116.52699307402936, "y": 40.6226457218413}, {
                    "x": 116.47306682105298,
                    "y": 40.650634332913945
                }, {"x": 116.46735500012608, "y": 40.66411901307479}, {
                    "x": 116.467802882523,
                    "y": 40.66918160597719
                }, {"x": 116.47004025184462, "y": 40.71078279762526}, {
                    "x": 116.4668780464388,
                    "y": 40.722120572717834
                }, {"x": 116.45860366568232, "y": 40.737767002156865}, {
                    "x": 116.4548427772861,
                    "y": 40.742015064668564
                }, {"x": 116.44229405295025, "y": 40.75456610600006}, {
                    "x": 116.44536672160899,
                    "y": 40.759743376720124
                }, {"x": 116.44443269901733, "y": 40.76487270416983}, {
                    "x": 116.42330754858938,
                    "y": 40.7912966434087
                }, {"x": 116.41953545866754, "y": 40.795539843611564}, {
                    "x": 116.41208308393718,
                    "y": 40.8050429459882
                }, {"x": 116.40335895112649, "y": 40.8156141851538}, {
                    "x": 116.37542795453916,
                    "y": 40.85963822408048
                }, {"x": 116.37226039590188, "y": 40.87097496379448}, {
                    "x": 116.3675407079727,
                    "y": 40.88035103056149
                }, {"x": 116.36793930503393, "y": 40.89292722915481}, {
                    "x": 116.36834272806553,
                    "y": 40.90573877740531
                }, {"x": 116.38055055946079, "y": 40.91941828248502}, {
                    "x": 116.38510513277863,
                    "y": 40.924292542460584
                }, {"x": 116.40101209286374, "y": 40.93271017885276}, {
                    "x": 116.41656891111404,
                    "y": 40.93707440282737
                }, {"x": 116.43488196549607, "y": 40.94131439413376}, {
                    "x": 116.44459479746222,
                    "y": 40.94187678715515
                }, {"x": 116.5191389279665, "y": 40.95769733616327}, {
                    "x": 116.54789215398107,
                    "y": 40.97059073753362
                }, {"x": 116.55828598107071, "y": 40.994518069109304}, {
                    "x": 116.56451566880996,
                    "y": 41.00235799736489
                }, {"x": 116.57694446988907, "y": 41.01804778821481}, {
                    "x": 116.63838403185979,
                    "y": 41.04054217058688
                }, {"x": 116.64802135535218, "y": 41.04007704662097}, {
                    "x": 116.65601002454922, "y": 41.03663585095796
                }]
        },
        "fieldValues": ["1", "116.18578", "41.040543", "116.900505", "40.22844", "0", "2.296619182358133E9", "276046.9622576497", "1928", "110227", "110227", "26.5", "25.8", "25.5", "1.18", "2.71", "0.012517714", "怀柔区", "66.0", "13.59", "52.28", "北京市"],
        "ID": 1
    }];

    it("initialize and destroy", () => {
        var range = new Range("ThemeLayer", {
            map: map,
            style: {
                shadowBlur: 16,
                shadowColor: "#000000",
                fillColor: "#FFFFFF"
            },
            isHoverAble: true,
            highlightStyle: {
                stroke: true,
                strokeWidth: 4,
                strokeColor: 'blue',
                fillColor: "#00EEEE",
                fillOpacity: 0.8
            },
            themeField: "POP_DENSITY99",
            styleGroups: [
                {
                    start: 0,
                    end: 0.02,
                    style: {
                        color: '#FDE2CA'
                    }
                },
                {
                    start: 0.02,
                    end: 0.04,
                    style: {
                        color: '#FACE9C'
                    }
                },
                {
                    start: 0.04,
                    end: 0.06,
                    style: {
                        color: '#F09C42'
                    }
                },
                {
                    start: 0.06,
                    end: 0.1,
                    style: {
                        color: '#D0770B'
                    }
                },
                {
                    start: 0.1,
                    end: 0.2,
                    style: {
                        color: '#945305'
                    }
                }]
        });
        expect(range).not.toBeNull();
        expect(range.renderer).not.toBeUndefined();
        expect(range.map).not.toBeUndefined();
        expect(range.cache).not.toBeUndefined();
        expect(range.cache).not.toBeUndefined();
        expect(range.features.length).toEqual(0);
        range.destroy();
        expect(range.style).toBeNull();
        expect(range.themeField).toBeNull();
        expect(range.styleGroups).toBeNull();
    });

    it("addFeatures", () => {
        setTimeout(() => {
            var range = new Range("ThemeLayer", {
                map: map,
                style: {
                    shadowBlur: 16,
                    shadowColor: "#000000",
                    fillColor: "#FFFFFF"
                },
                isHoverAble: true,
                highlightStyle: {
                    stroke: true,
                    strokeWidth: 4,
                    strokeColor: 'blue',
                    fillColor: "#00EEEE",
                    fillOpacity: 0.8
                },
                themeField: "POP_DENSITY99",
                styleGroups: [{
                    start: 0,
                    end: 0.02,
                    style: {
                        color: '#FDE2CA'
                    }
                }, {
                    start: 0.02,
                    end: 0.04,
                    style: {
                        color: '#FACE9C'
                    }
                }, {
                    start: 0.04,
                    end: 0.06,
                    style: {
                        color: '#F09C42'
                    }
                }, {
                    start: 0.06,
                    end: 0.1,
                    style: {
                        color: '#D0770B'
                    }
                }, {
                    start: 0.1,
                    end: 0.2,
                    style: {
                        color: '#945305'
                    }
                }]
            });
            range.addFeatures(features);
            var themeLayer = new ol.layer.Image({
                source: range
            });
            map.addLayer(themeLayer);
            expect(themeLayer.getSource()).not.toBeUndefined();
            expect(themeLayer.getSource().renderer).not.toBeUndefined();
            expect(themeLayer.getSource().div).not.toBeUndefined();
            expect(themeLayer.getSource().cache).not.toBeUndefined();
            expect(themeLayer.getSource().features.length).toBeGreaterThan(0);
        }, 5000);
    });

    it('getStyleByData', () => {
        var range = new Range("ThemeLayer", {
            map: map,
            style: {
                shadowBlur: 16,
                shadowColor: "#000000",
                fillColor: "#FFFFFF"
            },
            isHoverAble: true,
            highlightStyle: {
                stroke: true,
                strokeWidth: 4,
                strokeColor: 'blue',
                fillColor: "#00EEEE",
                fillOpacity: 0.8
            },
            themeField: "POP_DENSITY99",
            styleGroups: [{
                start: 0,
                end: 0.02,
                style: {
                    color: '#FDE2CA'
                }
            }, {
                start: 0.02,
                end: 0.04,
                style: {
                    color: '#FACE9C'
                }
            }, {
                start: 0.04,
                end: 0.06,
                style: {
                    color: '#F09C42'
                }
            }, {
                start: 0.06,
                end: 0.1,
                style: {
                    color: '#D0770B'
                }
            }, {
                start: 0.1,
                end: 0.2,
                style: {
                    color: '#945305'
                }
            }]
        });
        var feature = {
            attributes: {
                'CITY': "北京市",
                'NAME': "怀柔区",
                'POP_DENSITY99': 0.012517714,
                'SMAREA': 2.296619182358133E9,
                'SMGEOMETRYSIZE': 1928,
                'SMID': 1,
                'SMPERIMETER': 276046.9622576497,
                'SMSDRIE': 116.900505,
                'SMSDRIN': 41.040543,
                'SMSDRIS': 40.22844,
                'SMSDRIW': 116.18578,
                'SMUSERID': 0
            },
            layer: null,
            lonlat: null,
            state: null,
            style: null,
            geometry: {
                'bounds': null,
                components: {
                    components: {
                        components: {
                            'id': "SuperMap.Geometry.Point_383",
                            'x': 116.4548427772861,
                            'y': 40.742015064668564,
                            'type': "NONE"
                        },
                        id: "SuperMap.Geometry.LinearRing_463",

                        length: 1
                    },
                    id: "SuperMap.Geometry.Polygon_464",
                    length: 1
                },
                id: "SuperMap.Geometry.MultiPolygon_465"
            },
            id: "SuperMap.Feature.Vector_466"
        };
        feature.data = feature.attributes;
        var result = range.getStyleByData(feature);
        expect(result).not.toBeNull();
        expect(result.color).toBe("#FDE2CA");
        expect(result.fillColor).toBe("#FFFFFF");
        expect(result.shadowBlur).toBe(16);
        expect(result.shadowColor).toBe("#000000");
    });
});


