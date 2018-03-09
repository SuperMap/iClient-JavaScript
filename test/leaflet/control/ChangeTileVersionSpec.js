import {changeTileVersion} from '../../../src/leaflet/control/ChangeTileVersion';
import {tiledMapLayer} from '../../../src/leaflet/mapping/TiledMapLayer';

var url = GlobeParameter.ChinaProvincesURL;
describe('leaflet_ChangeTileVersion', () => {
    var originalTimeout;
    var testDiv, map, tileVersion;
    beforeAll(() => {
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
        var baseLayer = tiledMapLayer(url).addTo(map);
        tileVersion = changeTileVersion({
            layer: baseLayer,
            position: "topleft",
            orientation: "horizontal"
        }).addTo(map);
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
        map.remove();
    });

    it('initialize,', () => {
        expect(tileVersion).not.toBeNull();
        expect(tileVersion.options.layer).not.toBeNull();
        expect(tileVersion.slider).not.toBeNull();
        expect(tileVersion._sliderValue.innerHTML).toEqual("V");
        expect(tileVersion.tooltip.innerHTML).toEqual("V");
    });

    it('setContent', () => {
        var version = {
            desc: "1.1.0"
        };
        tileVersion.setContent(version);
        expect(tileVersion._sliderValue.innerHTML).toEqual("1.1.0");
        expect(tileVersion.tooltip.innerHTML).toEqual("1.1.0");
        tileVersion.setVersionName();
        expect(tileVersion._sliderValue.innerHTML).toEqual("0");
    });

    it('updateLength', () => {
        tileVersion.updateLength(1);
        expect(tileVersion.length).toEqual(1);
        expect(tileVersion.max).toEqual(0);
    });

    it('nextTilesVersion', () => {
        tileVersion.nextTilesVersion();
        expect(tileVersion.options.layer.tempIndex).toBe(0);
    });

    it('nextTilesVersion_firstLoad, lastTilesVersion', () => {
        tileVersion.firstLoad = false;
        tileVersion.nextTilesVersion();
        expect(tileVersion.options.layer.tempIndex).toBe(0);
        tileVersion.lastTilesVersion();
        expect(tileVersion.options.layer.tempIndex).toBe(0);
    });

    it('nextTilesVersion, lastTilesVersion', () => {
        tileVersion.updateLength(2);
        expect(tileVersion.length).toEqual(2);
        expect(tileVersion.max).toEqual(1);
        tileVersion.nextTilesVersion();
        expect(tileVersion.options.layer.tempIndex).toBe(0);
        tileVersion.lastTilesVersion();
        expect(tileVersion.options.layer.tempIndex).toBe(-2);
    });

    it('update', () => {
        tileVersion.update([
            {name: "0", desc: "1.1.0"},
            {name: "1", desc: "1.1.1"}
        ],);
        expect(tileVersion.tileVersions).not.toBeNull();
        expect(tileVersion.tileVersions.length).toEqual(2);
    });

    it('tilesVersion', () => {
        tileVersion.tilesVersion("0");
        var version = tileVersion.getVersion();
        expect(version).toEqual("0");
    });

    it('removeLayer', () => {
        tileVersion.removeLayer();
        expect(tileVersion.options.layer).toBeNull();
    });
});