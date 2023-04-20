import '../../libs/deck.gl/5.1.3/deck.gl';
import { graphicLayer } from '../../../src/leaflet/overlay/GraphicLayer';
import { tiledMapLayer } from '../../../src/leaflet/mapping/TiledMapLayer';
import { circleStyle } from '../../../src/leaflet/overlay/graphic/CircleStyle';
import { imageStyle } from '../../../src/leaflet/overlay/graphic/ImageStyle';
import { graphic } from '../../../src/leaflet/overlay/graphic/Graphic';
import { Detector } from '../../../src/leaflet/core/Detector';
import { mockCreateTile } from '../../tool/mock_leaflet';
const imgData =
    'data:image/png;base64,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';
var url = 'http://supermapiserver:8090/iserver/services/map-world/rest/maps/World';
describe('leaflet_GraphicLayer', () => {
    var originalTimeout;
    var testDiv, map;
    function createMap() {
        testDiv = window.document.createElement('div');
        testDiv.setAttribute('id', 'map');
        testDiv.style.styleFloat = 'left';
        // testDiv.style.marginLeft = '8px';
        // testDiv.style.marginTop = '50px';
        testDiv.style.width = '500px';
        testDiv.style.height = '500px';
        window.document.body.appendChild(testDiv);

        map = L.map('map', {
            preferCanvas: true,
            crs: L.CRS.EPSG4326,
            center: { lon: 0, lat: 0 },
            maxZoom: 18,
            zoom: 1
        });
        tiledMapLayer(url).addTo(map);
        return { testDiv, map };
    }
    beforeAll(() => {
        mockCreateTile();
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        if(map){
            map.remove();
            map = null;
        }
        if(testDiv){
            window.document.body.removeChild(testDiv);
            testDiv = null;
        }
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('initialize', (done) => {
        let { map, testDiv } = createMap();
        var colorCount = 5,
            count = 5;
        var graphics = [];
        var e = 45;
        var randomCircleStyles = [];
        for (var i = 0; i < colorCount; i++) {
            randomCircleStyles.push(
                circleStyle({
                    color: '#3388ff',
                    opacity: 1,
                    radius: 2,
                    fill: true,
                    fillColor: '#3388ff',
                    fillOpacity: 1
                })
            );
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
            expect(layer._containsPoint(map.latLngToLayerPoint(layer.graphics[0]._latLng))).toBeTrue();
            expect(layer._containsPoint([0, 0])).toBeFalse();
            layer.on('remove', () => {
                var requestAnimId = map.getRenderer(layer)._redrawRequest;
                requestAnimId != null && L.Util.cancelAnimFrame(requestAnimId);
                done();
            });
            layer.remove();
        }, 0);
    });

    it('initialize_imageStyle', (done) => {
        const { map, testDiv } = createMap();
        const img = new Image();
        img.src = imgData;
        img.onload = function () {
            const imageS = imageStyle({
                img: img
            });
            const g = graphic({
                latLng: L.latLng(0, 0),
                style: imageS.getStyle()
            });
            var layer = graphicLayer([g]).addTo(map);
            setTimeout(() => {
                expect(layer.graphics.length).toEqual(1);
                const pixel = map.latLngToLayerPoint(layer.graphics[0]._latLng);
                expect(layer._containsPoint([pixel.x + 5, pixel.y + 5])).toBeTrue();
                expect(layer._containsPoint([pixel.x - 5, pixel.y - 5])).toBeTrue();
                layer.on('remove', () => {
                    var requestAnimId = map.getRenderer(layer)._redrawRequest;
                    requestAnimId != null && L.Util.cancelAnimFrame(requestAnimId);
                    done();
                });
                layer.remove();
            }, 0);
        };
    });
    it('overlay_ICL_1299', (done) => {
        const { map, testDiv } = createMap();
        const graphic1 = graphic({
            latLng: L.latLng([1, 1]),
            style: circleStyle({
                color: '#3388ff',
                opacity: 1,
                radius: 2,
                fill: true,
                fillColor: '#3388ff',
                fillOpacity: 1
            }).getCanvas()
        });
        const graphic2 = graphic({
            latLng: L.latLng([10, 10]),
            style: circleStyle({
                color: '#3388ff',
                opacity: 1,
                radius: 2,
                fill: true,
                fillColor: '#3388ff',
                fillOpacity: 1
            }).getCanvas()
        });
        const layer = graphicLayer([graphic1]).addTo(map);
        const layer1 = graphicLayer([graphic2]).addTo(map);
        
        setTimeout(() => {
            expect(layer.graphics.length).toEqual(1);
            expect(layer1.graphics.length).toEqual(1);
            layer.on('click', function (e) {
                expect(e.target).not.toBeNull();
                expect(e.target.getLatLng().lng).toEqual(1);
                expect(e.target.getLatLng().lat).toEqual(1);
                const g = layer1.graphics[0].getLatLng();
                const boundingClientRect = map.getContainer().getBoundingClientRect();
                const layerPoint = map.latLngToContainerPoint(g);
                map._renderer._onClick({ type: 'click', clientX: layerPoint.x + boundingClientRect.left, clientY: layerPoint.y+ boundingClientRect.top });
            });
            layer1.on('click', function (e) {
                expect(e.target).not.toBeNull();
                expect(e.target.getLatLng().lng).toEqual(10);
                expect(e.target.getLatLng().lat).toEqual(10);
                layer.on('remove', () => {
                    var requestAnimId = map.getRenderer(layer)._redrawRequest;
                    requestAnimId != null && L.Util.cancelAnimFrame(requestAnimId);
                    layer1.on('remove', () => {
                        done();
                    });
                    layer1.remove();
                });
                layer.remove();
                
            });
            const g = layer.graphics[0].getLatLng();
            const boundingClientRect = map.getContainer().getBoundingClientRect();
            const layerPoint = map.latLngToContainerPoint(g);
            map._renderer._onClick({ type: 'click', clientX: layerPoint.x + boundingClientRect.left, clientY: layerPoint.y+ boundingClientRect.top });
        }, 0);
    });

    describe('GraphicLayer_graphic', () => {
        let graphics = [];
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
                graphics[j].setAttributes({ name: 'graphic_' + j });
            }
        });

        it('getGraphicBy add getGraphicById', (done) => {
            let { map, testDiv } = createMap();
            let layer = graphicLayer(graphics).addTo(map);
            setTimeout(() => {
                const graphic = layer.getGraphicBy('id', 1);
                expect(graphic).not.toBeNull();
                expect(graphic.getId()).toEqual(1);

                const graphic1 = layer.getGraphicById(1);
                expect(graphic1.getId()).toEqual(1);
                layer.on('remove', () => {
                    done();
                })
                layer.remove()
            }, 0);
        });

        it('getGraphicsByAttribute', (done) => {
            let { map, testDiv } = createMap();
            let layer = graphicLayer(graphics).addTo(map);
            setTimeout(() => {
                const graphic = layer.getGraphicsByAttribute('name', 'graphic_1');
                expect(graphic).not.toBeNull();
                expect(graphic[0].getAttributes().name).toBe('graphic_1');
                layer.on('remove', () => {
                    done();
                })
                layer.remove()
            }, 0);
        });

        it('removeGraphics', (done) => {
            let { map, testDiv } = createMap();
            let layer = graphicLayer(graphics).addTo(map);
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
                layer.on('remove', () => {
                    done();
                })
                layer.remove()
            }, 0);
        });

        it('getState,getRenderer', (done) => {
            let { map, testDiv } = createMap();

            let layer = graphicLayer(graphics).addTo(map);
            setTimeout(() => {
                const state = layer.getState();
                expect(state).not.toBeNull();
                expect(layer.getRenderer()).not.toBeNull();
                expect(state.color).toBe('#3388ff');
                layer.on('remove', () => {
                    done();
                })
                layer.remove()
            }, 0);
        });

        it('setStyle', (done) => {
            let { map, testDiv } = createMap();
            let layer = graphicLayer(graphics, {
                render: 'canvas',
                color: [0, 0, 0, 255]
            }).addTo(map);
            setTimeout(() => {
                expect(layer.options.color).toEqual([0, 0, 0, 255]);
                layer.setStyle({ color: 'blue' });
                expect(layer.options.color).toEqual('blue');
                layer.on('remove', () => {
                    done();
                })
                layer.remove()
            }, 0);
        });

        it('addGraphics', (done) => {
            let { map, testDiv } = createMap();

            let layer = graphicLayer(graphics).addTo(map);
            setTimeout(() => {
                layer.addGraphics(graphics);
                expect(layer.graphics.length).toEqual(10);
                layer.on('remove', () => {
                    done();
                })
                layer.remove()
            }, 0);
        });

        it('setGraphics', (done) => {
            let { map, testDiv } = createMap();

            let layer = graphicLayer(graphics).addTo(map);
            setTimeout(() => {
                layer.clear();
                expect(layer.graphics.length).toEqual(0);
                let graphics = [];
                for (let j = 0; j < coors.length; ++j) {
                    graphics[j] = graphic({
                        latLng: L.latLng(coors[j][0], coors[j][1])
                    });
                    graphics[j].setId(j);
                    graphics[j].setAttributes({ name: 'graphic_' + j });
                }
                layer.setGraphics(graphics);
                expect(layer.graphics.length).toEqual(5);
                layer.on('remove', () => {
                    done();
                })
                layer.remove()
            }, 0);
        });

        //特定条件下，期望的函数被调用、
        it('_moveEnd_expect_ICL_1042', (done) => {
            let { map, testDiv } = createMap();

            spyOn(Detector, 'supportWebGL2').and.callFake(() => {
                return true;
            });
            let layer = graphicLayer(graphics, { render: 'webgl' }).addTo(map);
            setTimeout(() => {
                spyOn(layer, '_update');
                layer._moveEnd();
                expect(layer._update).toHaveBeenCalled();
                layer.on('remove', () => {
                    done();
                })
                layer.remove()
            }, 0)
        });
        xit('CRS_4326_ICL_1134', (done) => {
            let { map, testDiv } = createMap();
            let layer = graphicLayer(graphics, { render: 'webgl' }).addTo(map);
            setTimeout(() => {
                expect(layer._crs).toEqual(map.options.crs);
                const state = layer.getState();
                expect(state.maxZoom).toEqual(map.getMaxZoom()+1);
                expect(state.zoom).toEqual(map.getZoom()+1);
                const webglRenderLayer = layer._renderer._renderLayer;
                expect(webglRenderLayer).not.toBeNull();
                expect(webglRenderLayer.props.coordinateSystem).toEqual(window.DeckGL.COORDINATE_SYSTEM.LNGLAT_OFFSETS);
                expect(webglRenderLayer.props.isGeographicCoordinateSystem).toBeTrue();
                layer.on('remove', () => {
                    done();
                })
                layer.remove()
            }, 0);
        });
        xit('CRS_4326_ICL_1349', (done) => {
            let { map, testDiv } = createMap();
            map.options.crs = L.CRS.TianDiTu_Mercator;
            let layer = graphicLayer(graphics, { render: 'webgl' }).addTo(map);
            setTimeout(() => {
                expect(layer._crs).toEqual(map.options.crs);
                const state = layer.getState();
                expect(state.maxZoom).toEqual(map.getMaxZoom()+1);
                expect(state.zoom).toEqual(map.getZoom()+1);
                const webglRenderLayer = layer._renderer._renderLayer;
                expect(webglRenderLayer).not.toBeNull();
                expect(webglRenderLayer.props.coordinateSystem).toEqual(window.DeckGL.COORDINATE_SYSTEM.LNGLAT);
                expect(webglRenderLayer.props.isGeographicCoordinateSystem).toBeFalse();
                layer.on('remove', () => {
                    done();
                })
                layer.remove()
            }, 0);
        });
        it('CRS_4326_ICL_1349', (done) => {
            let { map, testDiv } = createMap();
            map.options.crs = L.CRS.TianDiTu_WGS84;
            let layer = graphicLayer(graphics, { render: 'webgl' }).addTo(map);
            setTimeout(() => {
                expect(layer._crs).toEqual(map.options.crs);
                const state = layer.getState();
                expect(state.maxZoom).toEqual(map.getMaxZoom()+1);
                expect(state.zoom).toEqual(map.getZoom()+1);
                const webglRenderLayer = layer._renderer._renderLayer;
                expect(webglRenderLayer).not.toBeNull();
                expect(webglRenderLayer.props.coordinateSystem).toEqual(window.DeckGL.COORDINATE_SYSTEM.LNGLAT_OFFSETS);
                expect(webglRenderLayer.props.isGeographicCoordinateSystem).toBeTrue();
                layer.on('remove', () => {
                    done();
                })
                layer.remove()
            }, 0);
        });
    });
});
