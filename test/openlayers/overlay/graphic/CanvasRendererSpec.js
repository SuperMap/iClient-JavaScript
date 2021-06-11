import { GraphicCanvasRenderer } from '../../../../src/openlayers/overlay/graphic/CanvasRenderer';
import Map from 'ol/Map';
import View from 'ol/View';

var map = new Map({
    target: 'map',
    view: new View({
        center: [116.85, 39.79],
        zoom: 0,
        projection: 'EPSG:4326'
    })
});
describe('openlayers_render', () => {
    var render;
    it('constructor', () => {
        spyOn(map, 'getSize').and.callFake(() => {
            return [0, 0];
        });
        const size = [1920, 1080];
        let pixelRatio = 1;
        render = new GraphicCanvasRenderer('layer', { size, pixelRatio, map });
        expect(render).not.toBeNull();
        expect(render.mapWidth).toBe(1920);
        expect(render.mapHeight).toBe(1080);
        pixelRatio = 1.5;
        render = new GraphicCanvasRenderer('layer', { size, pixelRatio, map });
        expect(render).not.toBeNull();
        expect(render.mapWidth).toBe(1280);
        expect(render.mapHeight).toBe(720);
    });
});
