import {MeshPhongMaterial, Mesh, PointLight, BoxBufferGeometry} from 'three';
import {ThreeLayer} from '../../../src/mapboxgl/overlay/ThreeLayer';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1IjoibW9ua2VyIiwiYSI6ImNpd2Z6aTE5YTAwdHEyb2tpOWs2ZzRydmoifQ.LwQMRArUP8Q9P7QApuOIHg';
describe('mapboxgl_ThreeLayer', () => {
    var originalTimeout;
    var testDiv, map, threeLayer;
    beforeAll(() => {
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

    it('initialize', (done) => {

        var coordinates = [
            [13.413977, 52.532063],
            [13.414156, 52.532003],
            [13.414062, 52.531902],
            [13.413939, 52.531944],
            [13.41393, 52.531936],
            [13.413952, 52.531913],
            [13.41391, 52.531869],
            [13.41383, 52.531897],
            [13.413878, 52.531952],
            [13.413977, 52.532063]
        ];
        threeLayer = new ThreeLayer('three');
        threeLayer.draw = (gl, scene, camera) => {
            var light = new PointLight(0xffffff);
            camera.add(light);
            var height = 10;
            var color = 0xff2200;
            var material = new MeshPhongMaterial({color: color});
            var mesh = threeLayer.toThreeMesh(coordinates, height, material, true);
            scene.add(mesh);
        };

        threeLayer.addTo(map);

        setTimeout(() => {
            expect(threeLayer._map).not.toBeNull();
            expect(threeLayer.renderer).not.toBeNull();
            expect(threeLayer.renderer.scene).not.toBeNull();
            expect(threeLayer.renderer.camera).not.toBeNull();
            done();
        }, 4000)
    });

    it('setPosition', () => {
        var geometry = new BoxBufferGeometry(200000, 200000, 16);
        var material = new MeshPhongMaterial({color: 0x22ff00, opacity: 0.7});
        var mesh = new Mesh(geometry, material);
        threeLayer.setPosition(mesh, map.getCenter());

        expect(mesh.position).not.toBeNull();
        expect(mesh.position.x).toBe(5001083.780391823);
        expect(mesh.position.y).toBe(-23098767.683694128);
        expect(mesh.position.z).toBe(0);
    });


    it('getCanvasContainer', () => {
        var container = threeLayer.getCanvasContainer();
        expect(container).not.toBeNull();
    });
    it('getCanvas', () => {
        var canvas = threeLayer.getCanvas();
        expect(canvas).not.toBeNull();
    });

    it('remove', () => {
        threeLayer.remove();
        expect(threeLayer._map).toBeNull();
        expect(threeLayer.renderer).not.toBeNull();
        expect(threeLayer.renderer.context).toBeNull();
        expect(threeLayer.renderer.canvas).toBeNull();
        expect(threeLayer.renderer.container).toBeNull();
    });
});