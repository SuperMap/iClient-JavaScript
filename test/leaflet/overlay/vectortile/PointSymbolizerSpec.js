import {PointSymbolizer} from '../../../../src/leaflet/overlay/vectortile/PointSymbolizer';
import {SVGRenderer} from '../../../../src/leaflet/overlay/vectortile/SVGRenderer';
import '../../../resources/img/baiduTileTest.png';

describe('leaflet_PointSymbolizer', () => {
    var testDiv, map;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "400px";
        testDiv.style.height = "400px";
        window.document.body.appendChild(testDiv);
        map = L.map('map', {
            center: [39, 89, 116.34],
            zoom: 10
        });
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
    });

    it('initialize', () => {
        var feature1 = {
            geometry: [{x: 10, y: 10, type: "Point"}],
            id: "1",
            type: "Feature",
            properties: {
                CAP_POP: "2207718.0",
                SMLIBTILEID: "1",
                COUNTRY_CH: "巴西",
                CAPITAL_EN: "Brasilia",
                POP: "2207718.0",
                CAPITAL_CH: "巴西利亚",
                SMID: "1",
                COUNTRY: "巴西",
                CAPITAL_LO: "Brasília",
                COUNTRY_EN: "Brazil",
                USERID: "0",
                SMGEOMETRYSIZE: "16",
                SMY: "-15.792110943058866",
                CAPITAL: "巴西利亚",
                SMX: "-47.8977476573595",
                SMUSERID: "0"
            }
        };
        var feature2 = {
            geometry: [
                [{x: -10, y: -15, type: "Point"}],
                [{x: -100, y: 50, type: "Point"}]],
            id: "1",
            type: "Feature",
            properties: {
                CAP_POP: "2207718.0",
                SMLIBTILEID: "1",
                COUNTRY_CH: "巴西test",
                CAPITAL_EN: "Brasilia",
                POP: "2207718.0",
                CAPITAL_CH: "巴西利亚test",
                SMID: "1",
                COUNTRY: "巴西",
                CAPITAL_LO: "Brasília",
                COUNTRY_EN: "Brazil",
                USERID: "0",
                SMGEOMETRYSIZE: "16",
                SMY: "-15.792110943058866",
                CAPITAL: "巴西利亚",
                SMX: "-47.8977476573595",
                SMUSERID: "0"
            }
        };
        var pointSymbolizer1 = new PointSymbolizer(feature1);
        var pointSymbolizer2 = new PointSymbolizer(feature2);
        expect(pointSymbolizer1).not.toBeNull();
        expect(pointSymbolizer1.properties).not.toBeNull();
        expect(pointSymbolizer1.type).toEqual("Feature");
        expect(pointSymbolizer1._empty).not.toBeNull();
        expect(pointSymbolizer1._point.x).toEqual(10);
        expect(pointSymbolizer1._point.y).toEqual(10);
        expect(pointSymbolizer2).not.toBeNull();
        expect(pointSymbolizer2.properties).not.toBeNull();
        expect(pointSymbolizer2.type).toEqual("Feature");
        expect(pointSymbolizer2._empty).not.toBeNull();
        expect(pointSymbolizer2._point.x).toEqual(-10);
        expect(pointSymbolizer2._point.y).toEqual(-15);
    });

    it('updateStyle_svgRenderer', () => {
        var svgRenderer = new SVGRenderer({x: 1686, y: 755, Z: 10}, {x: 256, y: 256});
        var feature = {
            geometry: [{x: 10, y: 10, type: "Point"}],
            type: "Feature",
            properties: {
                texts: ["test"]
            }
        };
        var style = {
            interactive: true,
        };
        var pointSymbolizer1 = new PointSymbolizer(feature);
        spyOn(pointSymbolizer1, '_updateBounds').and.callThrough();
        pointSymbolizer1.render(svgRenderer, style);
        pointSymbolizer1.updateStyle(svgRenderer, style);
        expect(pointSymbolizer1._updateBounds).toHaveBeenCalled();
    });

    it('_getImage_Null', () => {
        var svgRenderer = new SVGRenderer({x: 1686, y: 755, Z: 10}, {x: 256, y: 256});
        var feature = {
            geometry: [{x: 10, y: 10, type: "Point"}],
            type: "Feature",
            properties: {
                texts: ["test"]
            }
        };
        var style1 = {
            interactive: true,
        };
        var pointSymbolizer = new PointSymbolizer(feature);
        pointSymbolizer.render(svgRenderer, style1);
        pointSymbolizer.updateStyle(svgRenderer, style1);
        var img = pointSymbolizer._getImage();
        expect(img).toBeNull();
    });

    it('_getImage', () => {
        var svgRenderer = new SVGRenderer({x: 1686, y: 755, Z: 10}, {x: 256, y: 256});
        var feature = {
            geometry: [{x: 10, y: 10, type: "Point"}],
            type: "Feature",
            properties: {
                texts: ["test"]
            }
        };
        var style2 = {
            interactive: true,
            iconUrl: img.src
        };
        var pointSymbolizer = new PointSymbolizer(feature);
        pointSymbolizer.render(svgRenderer, style2);
        pointSymbolizer.updateStyle(svgRenderer, style2);
        var image = pointSymbolizer._getImage();
        expect(image).not.toBeNull();
        expect(image.currentSrc).toContain("data:image/png");
    });
});
