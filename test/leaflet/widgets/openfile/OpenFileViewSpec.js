import { openFile } from '../../../../src/leaflet/widgets/openfile/OpenFileView'
var map, url = GlobeParameter.WorldURL, testDiv;
var dataServiceURL = GlobeParameter.wokerURL;
describe('leaflet_openfile_OpenFileView', () => {
    var serviceResult;
    var originalTimeout;
    beforeAll(() => {
        testDiv = document.createElement("div");
        testDiv.id = 'map';
        testDiv.style.margin = "0 auto";
        testDiv.style.width = "800px";
        testDiv.style.height = "800px";
        document.body.appendChild(testDiv);
        map = L.map('map', {
            preferCanvas: true,
            crs: L.CRS.EPSG4326,
            center: [20, 80],
            maxZoom: 18,
            zoom: 2
        });

    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        map = null;
        document.body.removeChild(testDiv);
    });

    it('readFile', (done) => {
        var china={
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "id": "81",
                        "name": "香港",
                        "cp": [
                            114.2578,
                            22.3242
                        ],
                        "childNum": 1
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [
                                    114.6094,
                                    22.4121
                                ],
                                [
                                    114.5215,
                                    22.1484
                                ],
                                [
                                    114.3457,
                                    22.1484
                                ],
                                [
                                    113.9063,
                                    22.1484
                                ],
                                [
                                    113.8184,
                                    22.1924
                                ],
                                [
                                    113.9063,
                                    22.4121
                                ],
                                [
                                    114.1699,
                                    22.5439
                                ],
                                [
                                    114.3457,
                                    22.5439
                                ],
                                [
                                    114.4336,
                                    22.5439
                                ],
                                [
                                    114.4336,
                                    22.4121
                                ],
                                [
                                    114.6094,
                                    22.4121
                                ]
                            ]
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "id": "82",
                        "name": "澳门",
                        "cp": [
                            113.5547,
                            22.1484
                        ],
                        "childNum": 1
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [
                                    113.5986,
                                    22.1649
                                ],
                                [
                                    113.6096,
                                    22.1265
                                ],
                                [
                                    113.5547,
                                    22.11
                                ],
                                [
                                    113.5437,
                                    22.2034
                                ],
                                [
                                    113.5767,
                                    22.2034
                                ],
                                [
                                    113.5986,
                                    22.1649
                                ]
                            ]
                        ]
                    }
                }
            ]
        };

        var openFile = L.supermap.widgets.openFile().addTo(map).setPosition('bottomleft');

        openFile.viewModel.on('openfilesuccess', function (e) {
            try {
                expect(e.result.features.length).toBe(2);
                done();
            } catch (exception) {
                console.log("'readfile'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        })
        var input = document.getElementById('input_file');

        var blob = new Blob([JSON.stringify(china)],
            { type: 'application/json' });
        var name = './base/resources/china.json';
        var type = 'application/json';
        let file = new File([blob], name, {
            type: type,
        });

        var fileEventObject = {
            target: {
                files: {
                    0: file
                },
                value: "./base/resources/china.json"
            }
        };
        openFile.viewModel.readFile(fileEventObject);
    })

})