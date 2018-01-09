require('../../../src/mapboxgl/control/Logo');
var mapboxgl = require('mapbox-gl');
window.mapboxgl = mapboxgl;

describe('mapboxgl_Logo', function () {
    var url = 'http://supermapiserver:8090/iserver/services/map-china400/rest/maps/China';
    var testDiv, map;
    beforeAll(function () {
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        document.body.appendChild(testDiv);
        map = new mapboxgl.Map({
            container: 'map',
            style: {
                "version": 8,
                "sources": {
                    "raster-tiles": {
                        "type": "raster",
                        "tiles": [url + '/zxyTileImage.png?z={z}&x={x}&y={y}'],
                        "tileSize": 256
                    }
                },
                "layers": [{
                    "id": "simple-tiles",
                    "type": "raster",
                    "source": "raster-tiles",
                    "minzoom": 0,
                    "maxzoom": 22
                }]
            },
            center: [116.40, 39.79],
            zoom: 3
        });
    });
    afterAll(function () {
        window.document.body.removeChild(testDiv);
        map.remove();
    });

    it('constructor, onAdd', function () {
        //default options
        var logo = new mapboxgl.supermap.LogoControl();
        expect(logo).not.toBeNull();
        expect(logo.imageUrl).toBeNull();
        expect(logo.link).toBeNull();
        expect(logo.width).toBeNull();
        expect(logo.height).toBeNull();
        expect(logo.alt).toBe("SuperMap iClient");
        // options1 - imageUrl,width,height
        var options1 = {
            imageUrl: "http://test.com/test.png",
            width: 20,
            height: 20
        };
        var logo1 = new mapboxgl.supermap.LogoControl(options1);
        expect(logo1.imageUrl).toBe("http://test.com/test.png");
        expect(logo1.width).toEqual(20);
        expect(logo1.height).toEqual(20);
        var onAdd = logo1.onAdd(map);
        expect(onAdd).not.toBeNull();
        expect(onAdd.nodeName).toBe("DIV");
        // options2 - imageUrl,width
        var options2 = {
            imageUrl: "http://test.com/test.png",
            width: 20
        };
        var logo2 = new mapboxgl.supermap.LogoControl(options2);
        expect(logo2.imageUrl).toBe("http://test.com/test.png");
        expect(logo2.width).toEqual(20);
        expect(logo2.height).toBeNull();
        var onAdd2 = logo2.onAdd(map);
        expect(onAdd2).not.toBeNull();
        expect(onAdd2.nodeName).toBe("DIV");
    });
});