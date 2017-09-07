require('../../../src/leaflet/control/ChangeTileVersion');

var url = GlobeParameter.ChinaProvincesURL;
describe('leaflet_ChangeTileVersionTest', function () {
    var originalTimeout;
    var testDiv, map , changeTileVersion;
    beforeAll(function () {
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        document.body.appendChild(testDiv);

        map = L.map('map', {
            crs: L.CRS.EPSG4326,
            center: [33.03, 104.79],
            zoom: 3,
        });
        var baseLayer = L.supermap.tiledMapLayer(url).addTo(map);

        changeTileVersion = L.supermap.control.changeTileVersion({
            layer: baseLayer,
            position: "topleft",
            orientation: "horizontal"
        }).addTo(map);
    });
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(function () {
        document.body.removeChild(testDiv);
        map.remove();
    });

    it('constructor test', function () {
        expect(changeTileVersion).not.toBeNull();
        expect(changeTileVersion.options.layer).not.toBeNull();
        expect(changeTileVersion.slider).not.toBeNull();

        changeTileVersion.nextTilesVersion();
        expect(changeTileVersion.options.layer.tempIndex).toBe(0);
        changeTileVersion.lastTilesVersion();
        expect(changeTileVersion.options.layer.tempIndex).toBe(-2);
    });
});