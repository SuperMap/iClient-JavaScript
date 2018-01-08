require('../../../src/leaflet/control/ChangeTileVersion');

var url = GlobeParameter.ChinaProvincesURL;
describe('leaflet_ChangeTileVersion', function () {
    var originalTimeout;
    var testDiv, map, changeTileVersion;
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

    it('initialize,', function () {
        expect(changeTileVersion).not.toBeNull();
        expect(changeTileVersion.options.layer).not.toBeNull();
        expect(changeTileVersion.slider).not.toBeNull();
        expect(changeTileVersion._sliderValue.innerHTML).toEqual("V");
        expect(changeTileVersion.tooltip.innerHTML).toEqual("V");
    });

    it('setContent', function () {
        var version = {
            desc: "1.1.0"
        };
        changeTileVersion.setContent(version);
        expect(changeTileVersion._sliderValue.innerHTML).toEqual("1.1.0");
        expect(changeTileVersion.tooltip.innerHTML).toEqual("1.1.0");
        changeTileVersion.setVersionName();
        expect(changeTileVersion._sliderValue.innerHTML).toEqual("0");
    });

    it('updateLength', function () {
        changeTileVersion.updateLength(1);
        expect(changeTileVersion.length).toEqual(1);
        expect(changeTileVersion.max).toEqual(0);
    });

    it('nextTilesVersion',function () {
        changeTileVersion.nextTilesVersion();
        expect(changeTileVersion.options.layer.tempIndex).toBe(0);
    });

    it('nextTilesVersion_firstLoad, lastTilesVersion', function () {
        changeTileVersion.firstLoad = false;
        changeTileVersion.nextTilesVersion();
        expect(changeTileVersion.options.layer.tempIndex).toBe(0);
        changeTileVersion.lastTilesVersion();
        expect(changeTileVersion.options.layer.tempIndex).toBe(0);
    });

    it('nextTilesVersion, lastTilesVersion',function () {
        changeTileVersion.updateLength(2);
        expect(changeTileVersion.length).toEqual(2);
        expect(changeTileVersion.max).toEqual(1);
        changeTileVersion.nextTilesVersion();
        expect(changeTileVersion.options.layer.tempIndex).toBe(0);
        changeTileVersion.lastTilesVersion();
        expect(changeTileVersion.options.layer.tempIndex).toBe(-2);
    });

    it('update',function () {
        changeTileVersion.update([
            {name:"0",desc: "1.1.0"},
            {name:"1",desc: "1.1.1"}
        ],);
        expect(changeTileVersion.tileVersions).not.toBeNull();
        expect(changeTileVersion.tileVersions.length).toEqual(2);
    });

    it('tilesVersion',function () {
        changeTileVersion.tilesVersion("0");
        var version = changeTileVersion.getVersion();
        expect(version).toEqual("0");
    });

    it('removeLayer',function () {
        changeTileVersion.removeLayer();
        expect(changeTileVersion.options.layer).toBeNull();
    });

});