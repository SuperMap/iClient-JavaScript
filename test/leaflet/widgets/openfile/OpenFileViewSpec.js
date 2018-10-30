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