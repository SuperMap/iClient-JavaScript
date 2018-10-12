import '../../libs/deck.gl/5.1.3/deck.gl';
import {graphicLayer} from '../../../src/leaflet/overlay/GraphicLayer';
import {tiledMapLayer} from '../../../src/leaflet/mapping/TiledMapLayer';
import {circleStyle} from '../../../src/leaflet/overlay/graphic/CircleStyle';
import {graphic} from '../../../src/leaflet/overlay/graphic/Graphic';
import {GraphicWebGLRenderer} from "../../../src/leaflet/overlay/graphic";
import {FetchRequest} from "@supermap/iclient-common";
import {Detector} from "../../../src/leaflet/core/Detector";

var url = "http://supermapiserver:8090/iserver/services/map-world/rest/maps/World";
describe('leaflet_GraphicLayer', () => {
    var originalTimeout;
    var testDiv, map;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);

        map = L.map('map', {
            preferCanvas: true,
            crs: L.CRS.EPSG4326,
            center: {lon: 0, lat: 0},
            maxZoom: 18,
            zoom: 1
        });
        tiledMapLayer(url).addTo(map);
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        map.remove();
        window.document.body.removeChild(testDiv);
    });

    it('initialize', (done) => {
        var colorCount = 5, count = 5;
        var graphics = [];
        var e = 45;
        var randomCircleStyles = [];
        for (var i = 0; i < colorCount; i++) {
            randomCircleStyles.push(circleStyle({
                color: '#3388ff',
                opacity: 1,
                radius: 2,
                fill: true,
                fillColor: '#3388ff',
                fillOpacity: 1
            }));
        }
        for (var j = 0; j < count; ++j) {
            var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
            graphics[j] = graphic({
                latLng: L.latLng(coordinates[0], coordinates[1]),
                style: randomCircleStyles[Math.floor(Math.random() * colorCount)].getCanvas()
            });
        }
        var layer = graphicLayer(graphics).addTo(map);
        setTimeout(() => {
            expect(layer.graphics.length).toEqual(count);
            for (var i = 0; i < layer.graphics.length; i++) {
                expect(layer.graphics[i]._style).not.toBeNull();
                expect(layer.graphics[i]._latLng).not.toBeNull();
            }
            var isContainsPoint = layer._containsPoint();
            expect(isContainsPoint).not.toBe("false");
            //map.remove()时，canvas渲染的场景下render会先移除canvas的ctx，而path的移除会有重绘操作。
            //从而引起刷新延迟会报错，故在此移除重绘
            layer.on('remove', () => {
                var requestAnimId = map.getRenderer(layer)._redrawRequest;
                (requestAnimId != null) && L.Util.cancelAnimFrame(requestAnimId);
                done();
            });
            layer.remove();
        }, 1000)
    });

    describe("GraphicLayer_graphic 相关", () => {
        let layer, graphics = [];
        const coors = [
            [-35.16, 38.05],
            [-36.16, 39.05],
            [-36.16, 40.05],
            [-37.16, 40.05],
            [-38.16, 39.05]
        ];
        beforeAll(() => {
            for (let j = 0; j < coors.length; ++j) {
                graphics[j] = graphic({
                    latLng: L.latLng(coors[j][0], coors[j][1])
                });
                graphics[j].setId(j);
                graphics[j].setAttributes({name: "graphic_" + j});
            }

        });

        it("getGraphicBy add getGraphicById", (done) => {
            layer = graphicLayer(graphics).addTo(map);
            setTimeout(() => {
                const graphic = layer.getGraphicBy("id", 1);
                expect(graphic).not.toBeNull();
                expect(graphic.getId()).toEqual(1);

                const graphic1 = layer.getGraphicById(1);
                expect(graphic1.getId()).toEqual(1);

                done();
            }, 1000);

        });

        it("getGraphicsByAttribute", (done) => {
            layer = graphicLayer(graphics).addTo(map);
            setTimeout(() => {
                const graphic = layer.getGraphicsByAttribute("name", "graphic_1");
                expect(graphic).not.toBeNull();
                expect(graphic[0].getAttributes().name).toBe("graphic_1");
                done();
            }, 1000);

        });

        it("removeGraphics", (done) => {
            layer = graphicLayer(graphics).addTo(map);
            setTimeout(() => {
                //删除单个
                let deleteGraphic = graphics[0];
                expect(layer.graphics.length).toEqual(5);
                layer.removeGraphics(deleteGraphic);
                expect(layer.graphics.length).toEqual(4);

                //多个
                deleteGraphic = [graphics[1], graphics[2]];
                layer.removeGraphics(deleteGraphic);
                expect(layer.graphics.length).toEqual(2);

                //默认
                layer.removeGraphics();
                expect(layer.graphics.length).toEqual(0);

                done();
            }, 1000);
        });

        it("getState,getRenderer", (done) => {
            layer = graphicLayer(graphics).addTo(map);
            setTimeout(() => {
                const state = layer.getState();
                expect(state).not.toBeNull();
                expect(layer.getRenderer()).not.toBeNull();
                expect(state.color).toBe("#3388ff");
                done();
            }, 1000);
        });

        it("setStyle", (done) => {
            layer = graphicLayer(graphics, {
                render: "canvas",
                color: [0, 0, 0, 255]
            }).addTo(map);
            setTimeout(() => {
                expect(layer.options.color).toEqual([0, 0, 0, 255]);
                layer.setStyle({color: "blue"});
                expect(layer.options.color).toEqual("blue");
                done();
            }, 4000);
        });

        it("addGraphics", (done) => {
            layer = graphicLayer(graphics).addTo(map);
            setTimeout(() => {
                layer.addGraphics(graphics);
                expect(layer.graphics.length).toEqual(10);
                done();
            }, 4000);
        });

        it("setGraphics", (done) => {
            layer = graphicLayer(graphics).addTo(map);
            setTimeout(() => {
                layer.clear();
                expect(layer.graphics.length).toEqual(0);
                let graphics = [];
                for (let j = 0; j < coors.length; ++j) {
                    graphics[j] = graphic({
                        latLng: L.latLng(coors[j][0], coors[j][1])
                    });
                    graphics[j].setId(j);
                    graphics[j].setAttributes({name: "graphic_" + j});
                }
                layer.setGraphics(graphics);
                expect(layer.graphics.length).toEqual(5);
                done();
            }, 4000);
        });

        //特定条件下，期望的函数被调用、
        it("_moveEnd_expect_ICL_1042",()=>{
            spyOn(Detector, 'supportWebGL2').and.callFake(() => {
            return true;
            });
            layer = graphicLayer(graphics,{render:"webgl"}).addTo(map);
            spyOn(layer, '_update');
            layer._moveEnd();
            expect(layer._update).toHaveBeenCalled();
        });

    });
});

