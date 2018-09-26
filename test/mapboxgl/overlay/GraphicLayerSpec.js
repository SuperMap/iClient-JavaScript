import mapboxgl from 'mapbox-gl';
import '../../libs/deck.gl/5.1.3/deck.gl';
import {GraphicLayer} from '../../../src/mapboxgl/overlay/GraphicLayer';

mapboxgl.accessToken = 'pk.eyJ1IjoibW9ua2VyIiwiYSI6ImNpd2Z6aTE5YTAwdHEyb2tpOWs2ZzRydmoifQ.LwQMRArUP8Q9P7QApuOIHg';
describe('mapboxgl_GraphicLayer', () => {
    let originalTimeout, testDiv, map, graphics = [], graphicLayer;
    const coors = [
        [-35.16, 38.05],
        [-36.16, 39.05],
        [-36.16, 40.05],
        [-37.16, 40.05],
        [-38.16, 39.05]
    ];
    //构建数据
    for (let i = 0; i < coors.length; i++) {
        let lngLat = {
            lng: parseFloat(coors[i][0]),
            lat: parseFloat(coors[i][1])
        };
        graphics.push(new mapboxgl.supermap.Graphic(lngLat));
        graphics[i].setId(i);
        graphics[i].setAttributes({name: "graphic_" + i});
    }

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
        graphicLayer = new GraphicLayer("graphicLayer", {
            graphics: graphics
        });
        graphicLayer.onAdd(map);

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
        // map.removeLayer("graphicLayer");
    });

    it('constructor', (done) => {
        setTimeout(() => {
            expect(graphicLayer.deckGL).not.toBeNull();
            done();
        }, 1000)
    });

    it('setVisibility', (done) => {
        setTimeout(() => {
            graphicLayer.setVisibility(false);
            expect(graphicLayer.visibility).toBeFalsy();
            done();
        }, 1000)
    });

    it("getGraphicBy add getGraphicById", (done) => {
        setTimeout(() => {
            const graphic = graphicLayer.getGraphicBy("id", 1);
            expect(graphic).not.toBeNull();
            expect(graphic.getId()).toEqual(1);

            const graphic1 = graphicLayer.getGraphicById(1);
            expect(graphic1.getId()).toEqual(1);

            done();
        }, 1000)
    });
    it("getGraphicsByAttribute", (done) => {
        setTimeout(() => {
            const graphic = graphicLayer.getGraphicsByAttribute("name", "graphic_1");
            expect(graphic).not.toBeNull();
            expect(graphic[0].getAttributes().name).toBe("graphic_1");
            done();
        }, 1000);
    });
    it("removeGraphics", (done) => {
        setTimeout(() => {
            //删除单个
            let deleteGraphic = graphics[0];
            expect(graphicLayer.graphics.length).toEqual(5);
            graphicLayer.removeGraphics(deleteGraphic);
            expect(graphicLayer.graphics.length).toEqual(4);

            //多个
            deleteGraphic = [graphics[1], graphics[2]];
            graphicLayer.removeGraphics(deleteGraphic);
            expect(graphicLayer.graphics.length).toEqual(2);

            //默认
            graphicLayer.removeGraphics();
            expect(graphicLayer.graphics.length).toEqual(0);

            done();
        }, 1000);

    });
    it("getState", (done) => {
        setTimeout(() => {
            const state = graphicLayer.getState();
            expect(state).not.toBeNull();
            expect(state.color).toEqual([0, 0, 0, 255]);
            done();
        }, 1000);
    });

    it("setStyle", (done) => {
        setTimeout(() => {
            expect(graphicLayer.color).toEqual([0, 0, 0, 255]);
            graphicLayer.setStyle({color: "blue"});
            expect(graphicLayer.color).toEqual("blue");
            done();
        }, 4000);
    });

    it("addGraphics", (done) => {
        setTimeout(() => {
            graphicLayer.clear();
            expect(graphicLayer.graphics.length).toEqual(0);
            let graphics = [];
            for (let i = 0; i < coors.length; i++) {
                let lngLat = {
                    lng: parseFloat(coors[i][0]),
                    lat: parseFloat(coors[i][1])
                };
                graphics.push(new mapboxgl.supermap.Graphic(lngLat));
                graphics[i].setId(i);
                graphics[i].setAttributes({name: "graphic_" + i});
            }
            graphicLayer.addGraphics(graphics);
            expect(graphicLayer.graphics.length).toEqual(5);
            done();
        }, 4000);
    });

    it("setGraphics", (done) => {
        setTimeout(() => {
            let graphics = [];
            for (let i = 0; i < coors.length; i++) {
                let lngLat = {
                    lng: parseFloat(coors[i][0]),
                    lat: parseFloat(coors[i][1])
                };
                graphics.push(new mapboxgl.supermap.Graphic(lngLat));
                graphics[i].setId(i);
                graphics[i].setAttributes({name: "graphic_" + i});
            }
            graphicLayer.setGraphics(graphics);
            expect(graphicLayer.graphics.length).toEqual(5);
            done();
        }, 4000);
    });
});