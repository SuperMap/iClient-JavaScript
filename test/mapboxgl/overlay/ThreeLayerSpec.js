require('../../../src/mapboxgl/overlay/ThreeLayer');
var mapboxgl = require('mapbox-gl');
var THREE = require('three');
window.THREE = THREE;
window.mapboxgl = mapboxgl;

mapboxgl.accessToken = 'pk.eyJ1IjoibW9ua2VyIiwiYSI6ImNpd2Z6aTE5YTAwdHEyb2tpOWs2ZzRydmoifQ.LwQMRArUP8Q9P7QApuOIHg';
describe('mapboxgl_ThreeLayer', function () {
    var originalTimeout;
    var testDiv, map, threeLayer;
    beforeAll(function () {
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
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(function () {
        document.body.removeChild(testDiv);
        THREE = null;
    });

    it('initialize', function (done) {

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
        threeLayer = new mapboxgl.supermap.ThreeLayer('three');
        threeLayer.draw = function (gl, scene, camera) {
            var light = new THREE.PointLight(0xffffff);
            camera.add(light);
            var height = 10;
            var color = 0xff2200;
            var material = new THREE.MeshPhongMaterial({color: color});
            var mesh = this.toThreeMesh(coordinates, height, material, true);
            scene.add(mesh);
        };

        threeLayer.addTo(map);

        setTimeout(function () {
            expect(threeLayer._map).not.toBeNull();
            expect(threeLayer.renderer).not.toBeNull();
            expect(threeLayer.renderer.scene).not.toBeNull();
            expect(threeLayer.renderer.camera).not.toBeNull();
            done();
        }, 4000)
    });

    it('setPosition', function () {
        var geometry = new THREE.BoxBufferGeometry(200000, 200000, 16);
        var material = new THREE.MeshPhongMaterial({color: 0x22ff00, opacity: 0.7});
        var mesh = new THREE.Mesh(geometry, material);
        threeLayer.setPosition(mesh, map.getCenter());

        expect(mesh.position).not.toBeNull();
        expect(mesh.position.x).toBe(5001083.780391823);
        expect(mesh.position.y).toBe(-23098767.68369413);
        expect(mesh.position.z).toBe(19);
    });


    it('getCanvasContainer', function () {
        var container = threeLayer.getCanvasContainer();
        expect(container).not.toBeNull();
    });
    it('getCanvas', function () {
        var canvas = threeLayer.getCanvas();
        expect(canvas).not.toBeNull();
    });

    it('remove', function () {
        threeLayer.remove();
        expect(threeLayer._map).toBeNull();
        expect(threeLayer.renderer).not.toBeNull();
        expect(threeLayer.renderer.context).toBeNull();
        expect(threeLayer.renderer.canvas).toBeNull();
        expect(threeLayer.renderer.container).toBeNull();
    });


});