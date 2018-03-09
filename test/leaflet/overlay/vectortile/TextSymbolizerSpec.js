import {TextSymbolizer} from '../../../../src/leaflet/overlay/vectortile/TextSymbolizer';
import {SVGRenderer} from '../../../../src/leaflet/overlay/vectortile/SVGRenderer';
import {CanvasRenderer} from '../../../../src/leaflet/overlay/vectortile/CanvasRenderer';

describe('leaflet_TextSymbolizer', () => {
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
        var textSymbolizer1 = new TextSymbolizer(feature1);
        expect(textSymbolizer1.properties).not.toBeNull();
        expect(textSymbolizer1.type).toEqual("Feature");
        expect(textSymbolizer1._empty).not.toBeNull();
        expect(textSymbolizer1._point.x).toEqual(10);
        expect(textSymbolizer1._point.y).toEqual(10);
        var textSymbolizer2 = new TextSymbolizer(feature2);
        expect(textSymbolizer2.properties).not.toBeNull();
        expect(textSymbolizer2.type).toEqual("Feature");
        expect(textSymbolizer2._empty).not.toBeNull();
        expect(textSymbolizer2._point.x).toEqual(-10);
        expect(textSymbolizer2._point.y).toEqual(-15);
    });

    //SVGRenderer
    it('render_svgRenderer', () => {
        var svgRender = new SVGRenderer({x: 1686, y: 755, Z: 10}, {x: 256, y: 256});
        var feature1 = {
            geometry: [{x: 10, y: 10, type: "Point"}],
            type: "Feature",
            properties: {
                texts: ["test"]
            }
        };
        var feature2 = {
            geometry: [{x: 20, y: 10, type: "Point"}],
            type: "Feature",
            properties: {
                attributes: ["TEST"],
                textField: "TEST"
            }
        };
        var style = {
            interactive: true,
        };
        var textSymbolizer1 = new TextSymbolizer(feature1);
        textSymbolizer1.render(svgRender, style);
        expect(textSymbolizer1.options).not.toBeNull();
        expect(textSymbolizer1.options.interactive).toBeTruthy();
        expect(textSymbolizer1.properties.texts[0]).toEqual("test");
        expect(textSymbolizer1._text).toEqual("test");
        expect(textSymbolizer1._point.x).toEqual(10);
        expect(textSymbolizer1._point.y).toEqual(10);
        expect(textSymbolizer1._pxBounds.max).not.toBeNull();
        expect(textSymbolizer1._pxBounds.min).not.toBeNull();
        expect(textSymbolizer1._renderer).not.toBeNull();
        expect(textSymbolizer1._renderer._tileCoord.Z).toEqual(10);
        expect(textSymbolizer1._renderer._tileCoord.x).toEqual(1686);
        expect(textSymbolizer1._renderer._tileCoord.y).toEqual(755);
        var textSymbolizer2 = new TextSymbolizer(feature2);
        textSymbolizer2.render(svgRender, style);
        expect(textSymbolizer2.options).not.toBeNull();
        expect(textSymbolizer2.options.interactive).toBeTruthy();
        expect(textSymbolizer2.properties).not.toBeNull();
        expect(textSymbolizer2._text).toEqual("");
        expect(textSymbolizer2._point.x).toEqual(20);
        expect(textSymbolizer2._point.y).toEqual(10);
        expect(textSymbolizer2._pxBounds.max).not.toBeNull();
        expect(textSymbolizer2._pxBounds.min).not.toBeNull();
        expect(textSymbolizer2._renderer).not.toBeNull();
    });

    it('makeInteractive_svgRenderer', () => {
        var svgRender = new SVGRenderer({x: 1686, y: 755, Z: 10}, {x: 256, y: 256});
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
        var textSymbolizer1 = new TextSymbolizer(feature);
        spyOn(textSymbolizer1, '_updateBounds').and.callThrough();
        textSymbolizer1.render(svgRender, style);
        textSymbolizer1.makeInteractive();
        expect(textSymbolizer1._updateBounds).toHaveBeenCalled();
    });

    it('updateStyle_svgRenderer', () => {
        var svgRender = new SVGRenderer({x: 1686, y: 755, Z: 10}, {x: 256, y: 256});
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
        var textSymbolizer1 = new TextSymbolizer(feature);
        spyOn(textSymbolizer1, '_updateBounds').and.callThrough();
        textSymbolizer1.render(svgRender, style);
        textSymbolizer1.updateStyle(svgRender, style);
        expect(textSymbolizer1._updateBounds).toHaveBeenCalled();
    });

    //CanvasRenderer
    it('render, makeInteractive, updateStyle', () => {
        var canvasRender = new CanvasRenderer({x: 1686, y: 755, Z: 10}, {x: 256, y: 256}, {interactive: true});
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
        canvasRender.addTo(map);
        var textSymbolizer1 = new TextSymbolizer(feature);
        spyOn(textSymbolizer1, '_updateBounds').and.callThrough();
        textSymbolizer1.render(canvasRender, style);
        textSymbolizer1.makeInteractive();
        textSymbolizer1.updateStyle(canvasRender, style);
        expect(textSymbolizer1._updateBounds).toHaveBeenCalled();
        expect(textSymbolizer1._updateBounds.calls.count()).toEqual(2);
        var tileCoord = canvasRender.getCoord();
        expect(tileCoord).not.toBeNull();
        expect(tileCoord.x).toEqual(1686);
        expect(tileCoord.y).toEqual(755);
        expect(tileCoord.Z).toEqual(10);
    });
});

