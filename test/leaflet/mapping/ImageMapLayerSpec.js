import {imageMapLayer} from '../../../src/leaflet/mapping/ImageMapLayer';
import {NDVIParameter} from '../../../src/common/iServer/NDVIParameter';
import {HillshadeParameter} from '../../../src/common/iServer/HillshadeParameter';
import {getQueryValue} from '../../tool/utils';

var url = GlobeParameter.WorldURL;
describe('leaflet_ImageMapLayer', () => {
    var originalTimeout;
    var testDiv, map, imageLayer, imageLayer1;
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
            center: [0, 0],
            maxZoom: 18,
            zoom: 1
        });
        imageLayer = imageMapLayer(url).addTo(map);
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        imageLayer = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        document.body.removeChild(testDiv);
        map.remove();
    });

    it('initialize', () => {
        var tempOptions = {
            layersID: null,
            redirect: false,
            transparent: false,
            cacheEnabled: null,
            clipRegionEnabled: true,
            prjCoordSys: null,
            overlapDisplayed: false,
            overlapDisplayedOptions: null,
            opacity: 0.5,
            alt: '',
            pane: 'titlePane',
            interactive: true,
            crossOrigin: false,
            errorOverlayUrl: false,
            zIndex: 1,
            className: '',
            attribution: "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <span>© <a href='https://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>",
            updateInterval: 150
        };
        imageLayer = imageMapLayer(url, tempOptions);
        expect(imageLayer).not.toBeNull();
        expect(imageLayer.options.layersID).toBeNull();
        expect(imageLayer.options.redirect).toBeFalsy();
        expect(imageLayer.options.transparent).toBeFalsy();
        expect(imageLayer.options.cacheEnabled).toBeNull();
        expect(imageLayer.options.clipRegionEnabled).toBeTruthy();
        expect(imageLayer.options.prjCoordSys).toBeNull();
        expect(imageLayer.options.overlapDisplayed).toBeFalsy();
        expect(imageLayer.options.overlapDisplayedOptions).toBeNull();
        expect(imageLayer.options.opacity).toBe(tempOptions.opacity);
        expect(imageLayer.options.alt).toBe('');
        expect(imageLayer.options.pane).toBe(tempOptions.pane);
        expect(imageLayer.options.attribution).toBe(tempOptions.attribution);
        expect(imageLayer.options.className).toBe('');
        expect(imageLayer.options.crossOrigin).toBeFalsy();
        expect(imageLayer.options.errorOverlayUrl).toBeFalsy();
        expect(imageLayer.options.interactive).toBeTruthy();
        expect(imageLayer.options.zIndex).toBe(tempOptions.zIndex);
        expect(imageLayer.options.updateInterval).toBe(tempOptions.updateInterval);

    });

    it('getOpacity', () => {
        var tempOptions = {
            opacity: 0.5,
            zIndex: 1
        };
        imageLayer = imageMapLayer(url, tempOptions);
        var opacity = imageLayer.getOpacity();
        expect(opacity).not.toBeNull();
        expect(opacity).toBe(tempOptions.opacity);
    });

    it('setOpacity', () => {
        var opacity = 0.9;
        imageLayer = imageMapLayer(url);
        expect(imageLayer.setOpacity(opacity)).not.toBeNull();
        expect(imageLayer.getOpacity()).toBe(opacity);
    });


    it('bringToFront', (done) => {
        imageLayer1 = imageMapLayer(url).addTo(map);
        imageLayer1.on('load', () => {
            expect(imageLayer1.bringToFront()).not.toBeNull();
            expect(imageLayer1.options.position).toBe("front");
            done();
        });
    });


    it('bringToBack', (done) => {
        imageLayer1 = imageMapLayer(url).addTo(map);
        imageLayer1.on('load', () => {
            expect(imageLayer1.bringToBack()).not.toBeNull();
            expect(imageLayer1.options.position).toBe("back");
            done();
        });
    });

    it('getImageUrl', () => {
        imageLayer = imageMapLayer(url).addTo(map);
        expect(imageLayer.getImageUrl()).not.toBeNull();
        expect(imageLayer.getImageUrl()).toBe(url + "/image.png?redirect=false&transparent=true&cacheEnabled=true&overlapDisplayed=false");
    });

    it('getImageUrl_tilePoxy', () => {
        imageLayer = imageMapLayer(url, {tileProxy: 'tileProxy'});
        expect(imageLayer.getImageUrl()).not.toBeNull();
    });

    it('update_zoomIn', (done) => {
        imageLayer = imageMapLayer(url).addTo(map);
        var oldUrl, newUrl;
        imageLayer.on('load', () => {
            oldUrl = imageLayer._currentImage._url;
            expect(oldUrl).toBe(url + '/image.png?viewBounds=%7B%22leftBottom%22%3A%7B%22x%22%3A-19567879.241005123%2C%22y%22%3A-19567879.24100514%7D%2C%22rightTop%22%3A%7B%22x%22%3A19567879.241005123%2C%22y%22%3A19567879.241005138%7D%7D&width=500&height=500&redirect=false&transparent=true&cacheEnabled=true&overlapDisplayed=false');
            map.zoomIn();
            imageLayer.off('load');
            imageLayer.on('load', () => {
                newUrl = imageLayer._currentImage._url;
                expect(newUrl).toBe(url + '/image.png?viewBounds=%7B%22leftBottom%22%3A%7B%22x%22%3A-9783939.620502561%2C%22y%22%3A-9783939.620502561%7D%2C%22rightTop%22%3A%7B%22x%22%3A9783939.620502561%2C%22y%22%3A9783939.620502565%7D%7D&width=500&height=500&redirect=false&transparent=true&cacheEnabled=true&overlapDisplayed=false');
                expect(oldUrl).not.toEqual(newUrl);
                done();
            });
        });
    });

    it('getTileUrl_format', () => {
        var options = {format: "png"};
        var imageLayer = new imageMapLayer(url, options);
        var imgUrl = imageLayer.getImageUrl({a: 1});
        var urlTemp = imgUrl.split("?")[0];
        var format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe("png");

        imageLayer.options.format = "bmp";
        imgUrl = imageLayer.getImageUrl({a: 1});
        urlTemp = imgUrl.split("?")[0];
        format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe("bmp");

        imageLayer.options.format = "jpg";
        imgUrl = imageLayer.getImageUrl({a: 1});
        urlTemp = imgUrl.split("?")[0];
        format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe("jpg");

        imageLayer.options.format = "gif";
        imgUrl = imageLayer.getImageUrl({a: 1});
        urlTemp = imgUrl.split("?")[0];
        format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe("gif");
    });

    it('getImageUrl_t', () => {
        imageLayer = imageMapLayer(url).addTo(map);
        expect(imageLayer.getImageUrl()).not.toBeNull();
        expect(imageLayer.getImageUrl()).toBe(url + "/image.png?redirect=false&transparent=true&cacheEnabled=true&overlapDisplayed=false");

        var tempOptions = {
            cacheEnabled: false
        };
        var imageLayer = imageMapLayer(url, tempOptions).addTo(map);
        expect(imageLayer).not.toBeNull();
        expect(imageLayer.options.cacheEnabled).toBe(false);
        var coords = L.point(1, 4);
        var imageUrl = imageLayer.getImageUrl(coords);
        var imageUrlArray = imageUrl.split('?');
        expect(imageUrlArray[0]).toBe(url + '/image.png');
        expect(imageUrlArray[1]).toContain("&_t=")
    });
    it("getImageUrl, rasterfunction_ndviParameter", () => {
        // NDVIParameter
        const tempOptions = {
            rasterfunction:new NDVIParameter({redIndex:0,nirIndex:2}),
        };
        const imageLayerObject = imageMapLayer(url, tempOptions).addTo(map);
        expect(imageLayerObject).not.toBeNull();
        const tileUrl = imageLayerObject.getImageUrl( L.point(1, 4));
        const ndviParameterValue = getQueryValue(tileUrl,'rasterfunction');
        expect(ndviParameterValue).not.toBeNull;
        const ndviParameter = JSON.parse(decodeURIComponent(ndviParameterValue));
        expect(ndviParameter.type).toBe("NDVI");
        expect(ndviParameter.redIndex).toBe(0);
        expect(ndviParameter.nirIndex).toBe(2);
        expect(ndviParameter.colorMap).toBe("0:ffffe5ff;0.1:f7fcb9ff;0.2:d9f0a3ff;0.3:addd8eff;0.4:78c679ff;0.5:41ab5dff;0.6:238443ff;0.7:006837ff;1:004529ff");
    });
    it("getImageUrl, rasterfunction_hillshadeParameter", () => {
        // HillshadeParameter
        const tempOptions = {
            rasterfunction:new HillshadeParameter({altitude:10,azimuth:200}),
        };
        const imageLayerObject = imageMapLayer(url, tempOptions).addTo(map);
        expect(imageLayerObject).not.toBeNull();
        const tileUrl = imageLayerObject.getImageUrl(L.point(1, 4));
        const hillshadeParameterValue = getQueryValue(tileUrl,'rasterfunction');
        expect(hillshadeParameterValue).not.toBeNull;
        const hillshadeParameter = JSON.parse(decodeURIComponent(hillshadeParameterValue));
        expect(hillshadeParameter.type).toBe("HILLSHADE");
        expect(hillshadeParameter.altitude).toBe(10);
        expect(hillshadeParameter.azimuth).toBe(200);
        expect(hillshadeParameter.zFactor).toBe(1);
    });
    it("getImageUrl, clipRegion_grojson", () => {
        const tempOptions = {
            clipRegion:{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[20,-20],[20,0],[40,0],[40,-20],[20,-20]]]}},
            clipRegionEnabled:true
        };
        const imageMapLayerObject = imageMapLayer(url, tempOptions).addTo(map);
        expect(imageMapLayerObject).not.toBeNull();
        const tileUrl = imageMapLayerObject.getImageUrl(L.point(1, 4));
        const clipRegionEnabledValue = getQueryValue(tileUrl,'clipRegionEnabled');
        expect(clipRegionEnabledValue).toBeTruthy();
        const clipRegionValue = getQueryValue(tileUrl,'clipRegion');
        expect(clipRegionValue).not.toBeNull;
        const clipRegionParameter = JSON.parse(decodeURIComponent(clipRegionValue));
        expect(clipRegionParameter.parts[0]).toBe(5);
        expect(clipRegionParameter.points.length).toBe(5);
        expect(clipRegionParameter.points[0].x).toBe(20);
        expect(clipRegionParameter.points[0].y).toBe(-20);
        expect(clipRegionParameter.points[4].x).toBe(20);
        expect(clipRegionParameter.points[4].y).toBe(-20);
    });
    it("getImageUrl, clipRegion_polygon", () => {
        const tempOptions = {
            clipRegion:L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]], {color: 'red'}),
            clipRegionEnabled:true
        };
        const imageMapLayerObject = imageMapLayer(url, tempOptions).addTo(map);
        expect(imageMapLayerObject).not.toBeNull();
        const tileUrl = imageMapLayerObject.getImageUrl(L.point(1, 4));
        const clipRegionEnabledValue = getQueryValue(tileUrl,'clipRegionEnabled');
        expect(clipRegionEnabledValue).toBeTruthy();
        const clipRegionValue = getQueryValue(tileUrl,'clipRegion');
        expect(clipRegionValue).not.toBeNull;
        const clipRegionParameter = JSON.parse(decodeURIComponent(clipRegionValue));
        expect(clipRegionParameter.parts[0]).toBe(5);
        expect(clipRegionParameter.points.length).toBe(5);
        expect(clipRegionParameter.points[0].x).toBe(20);
        expect(clipRegionParameter.points[0].y).toBe(-20);
        expect(clipRegionParameter.points[4].x).toBe(20);
        expect(clipRegionParameter.points[4].y).toBe(-20);
    });

});