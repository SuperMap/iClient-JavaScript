import {crs} from '../../../src/leaflet/core/Proj4Leaflet';


describe("leaflet_crs", () => {
    const options = {
        origin: [-180, 90],
        scaleDenominators: [2000, 1000, 500, 200, 100, 50, 20, 10],
        dpi: 80
    };
    let src4328;

    beforeAll(() => {
        src4328 = crs("EPSG:4326", options);
    });

    it("initialize", () => {
        expect(src4328).not.toBeNull();
        expect(src4328.options.dpi).toEqual(80);
    });
    it("initialize", () => {
        expect(src4328).not.toBeNull();
        expect(src4328.options.dpi).toEqual(80);
    });
    it("scale", () => {
        const scale = src4328.scale(2);
        expect(scale.toFixed(4)).toBe('701225.1389');
    });
    it("zoom", () => {
        const zoom = src4328.zoom(700000);
        expect(zoom.toFixed(4)).toBe('1.9965');
    });
});