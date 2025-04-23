import { tiledMapLayer } from '../../../src/leaflet/mapping/TiledMapLayer';
import { NDVIParameter } from '../../../src/common/iServer/NDVIParameter';
import { HillshadeParameter } from '../../../src/common/iServer/HillshadeParameter';
import { ChartSetting } from '../../../src/common/iServer/ChartSetting';
import { getQueryValue } from '../../tool/utils';
import { mockCreateTile } from '../../tool/mock_leaflet';
import { crs } from '../../../src/leaflet/core/Proj4Leaflet';

var url = GlobeParameter.ChinaURL;
describe('leaflet_TiledMapLayer', () => {
    var originalTimeout;
    var testDiv, testDiv1, map, map1, tiledMapLayerObject;
    beforeAll(() => {
        mockCreateTile();
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "1000px";
        testDiv.style.height = "1000px";
        document.body.appendChild(testDiv);
        map = L.map('map', {
            center: [0, 0],
            maxZoom: 18,
            zoom: 1
        });
        testDiv1 = document.createElement("div");
        testDiv1.setAttribute("id", "map1");
        testDiv1.style.styleFloat = "left";
        testDiv1.style.marginLeft = "8px";
        testDiv1.style.marginTop = "50px";
        testDiv1.style.width = "1000px";
        testDiv1.style.height = "1000px";
        document.body.appendChild(testDiv1);
        map1 = L.map('map1', {
            crs: crs("EPSG:4326", {
                bounds: [[110, 20], [112, 21]],
                wrapLng: [110, 112]
            }),
            center: [20.5, 111.0],
            zoom: 1
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
        map.remove();
        document.body.removeChild(testDiv1);
        map1.remove();
    });

    it('initialize', () => {
        tiledMapLayerObject = tiledMapLayer(url).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.prjCoordSys).toBeNull();
    });

    it("getTileUrl, getScale", () => {
        var tempOptions = {
            prjCoordSys: { "epsgCode": 3857 }
        };
        var tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.prjCoordSys.epsgCode).toBe(3857);
        var coords = L.point(1, 4);
        var tileUrl = tiledMapLayerObject.getTileUrl(coords);
        var tileUrlArray = tileUrl.split('?');
        expect(tileUrlArray[0]).toBe(url + '/tileImage.png');
        var scale = tiledMapLayerObject.getScale(1);
        expect(scale).toBe(3.3803271432053105e-9);
    });
    it("getTileUrl_tileProxy", () => {
        var tempOptions = {
            tileProxy: 'tileProxy'
        };
        var tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        // tiledMapLayerObject._crs = map.options.crs;
        expect(tiledMapLayerObject).not.toBeNull();
        var coords = L.point(1, 4);
        var tileUrl = tiledMapLayerObject.getTileUrl(coords);
    });

    it('changeTilesVersion', () => {
        var sourceUrl = "http://54.223.164.155:8090//iserver/services/map-ChinaProvinces/rest/maps/ChinaProvinces";
        var tiledMapLayerObject = tiledMapLayer(sourceUrl);
        tiledMapLayerObject.nextTilesVersion();
        expect(tiledMapLayerObject.tempIndex).toBe(0);
        tiledMapLayerObject.lastTilesVersion();
        expect(tiledMapLayerObject.tempIndex).toBe(-2);
    });


    it('getTileUrl_format', () => {
        var options = { format: "png" };
        var imageTile = tiledMapLayer(url, options).addTo(map);
        var coords = L.point(1, 4);
        var tileUrl = imageTile.getTileUrl(coords);
        var urlTemp = tileUrl.split("?")[0];
        var format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe("png");

        imageTile.options.format = "bmp";
        delete imageTile._layerUrl;
        tileUrl = imageTile.getTileUrl(coords);
        urlTemp = tileUrl.split("?")[0];
        format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe("bmp");

        imageTile.options.format = "jpg";
        delete imageTile._layerUrl;
        tileUrl = imageTile.getTileUrl(coords);
        urlTemp = tileUrl.split("?")[0];
        format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe("jpg");

        imageTile.options.format = "gif";
        delete imageTile._layerUrl;
        tileUrl = imageTile.getTileUrl(coords);
        urlTemp = tileUrl.split("?")[0];
        format = urlTemp.substring(urlTemp.length - 3, urlTemp.length);
        expect(format).toBe("gif");
    });
    it('getAllRequestParams_ICL_1041', () => {
        var options = {};
        var tiledMapLayerObject = tiledMapLayer(options);
        expect(tiledMapLayerObject.options.cacheEnabled).toBe(true);
    });
    it("getTileUrl, cacheEnableFalse", () => {
        var tempOptions = {
            cacheEnabled: false
        };
        var tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.cacheEnabled).toBe(false);
        var coords = L.point(1, 4);
        var tileUrl = tiledMapLayerObject.getTileUrl(coords);
        var tileUrlArray = tileUrl.split('?');
        expect(tileUrlArray[0]).toBe(url + '/tileImage.png');
        expect(tileUrlArray[1]).toContain("&_t=")
    });
    it("getTileUrl, rasterfunction_ndviParameter", () => {
        // NDVIParameter
        const tempOptions = {
            rasterfunction: new NDVIParameter({ redIndex: 0, nirIndex: 2 }),
        };
        const tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        const tileUrl = tiledMapLayerObject.getTileUrl(L.point(1, 4));
        const ndviParameterValue = getQueryValue(tileUrl, 'rasterfunction');
        expect(ndviParameterValue).not.toBeNull;
        const ndviParameter = JSON.parse(decodeURIComponent(ndviParameterValue));
        expect(ndviParameter.type).toBe("NDVI");
        expect(ndviParameter.redIndex).toBe(0);
        expect(ndviParameter.nirIndex).toBe(2);
        expect(ndviParameter.colorMap).toBe("0:ffffe5ff;0.1:f7fcb9ff;0.2:d9f0a3ff;0.3:addd8eff;0.4:78c679ff;0.5:41ab5dff;0.6:238443ff;0.7:006837ff;1:004529ff");
    });
    it("getTileUrl, rasterfunction_hillshadeParameter", () => {
        // HillshadeParameter
        const tempOptions = {
            rasterfunction: new HillshadeParameter({ altitude: 10, azimuth: 200 }),
        };
        const tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        const tileUrl = tiledMapLayerObject.getTileUrl(L.point(1, 4));
        const hillshadeParameterValue = getQueryValue(tileUrl, 'rasterfunction');
        expect(hillshadeParameterValue).not.toBeNull;
        const hillshadeParameter = JSON.parse(decodeURIComponent(hillshadeParameterValue));
        expect(hillshadeParameter.type).toBe("HILLSHADE");
        expect(hillshadeParameter.altitude).toBe(10);
        expect(hillshadeParameter.azimuth).toBe(200);
        expect(hillshadeParameter.zFactor).toBe(1);
    });
    it("getTileUrl, clipRegion_grojson", () => {
        const tempOptions = {
            clipRegion: { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[[20, -20], [20, 0], [40, 0], [40, -20], [20, -20]]] } },
            clipRegionEnabled: true
        };
        const tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        const tileUrl = tiledMapLayerObject.getTileUrl(L.point(1, 4));
        const clipRegionEnabledValue = getQueryValue(tileUrl, 'clipRegionEnabled');
        expect(clipRegionEnabledValue).toBeTruthy();
        const clipRegionValue = getQueryValue(tileUrl, 'clipRegion');
        expect(clipRegionValue).not.toBeNull;
        const clipRegionParameter = JSON.parse(decodeURIComponent(clipRegionValue));
        expect(clipRegionParameter.parts[0]).toBe(5);
        expect(clipRegionParameter.points.length).toBe(5);
        expect(clipRegionParameter.points[0].x).toBe(20);
        expect(clipRegionParameter.points[0].y).toBe(-20);
        expect(clipRegionParameter.points[4].x).toBe(20);
        expect(clipRegionParameter.points[4].y).toBe(-20);
    });
    it("getTileUrl, clipRegion_polygon", () => {
        const tempOptions = {
            clipRegion: L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]], { color: 'red' }),
            clipRegionEnabled: true
        };
        const tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        const tileUrl = tiledMapLayerObject.getTileUrl(L.point(1, 4));
        const clipRegionEnabledValue = getQueryValue(tileUrl, 'clipRegionEnabled');
        expect(clipRegionEnabledValue).toBeTruthy();
        const clipRegionValue = getQueryValue(tileUrl, 'clipRegion');
        expect(clipRegionValue).not.toBeNull;
        const clipRegionParameter = JSON.parse(decodeURIComponent(clipRegionValue));
        expect(clipRegionParameter.parts[0]).toBe(5);
        expect(clipRegionParameter.points.length).toBe(5);
        expect(clipRegionParameter.points[0].x).toBe(20);
        expect(clipRegionParameter.points[0].y).toBe(-20);
        expect(clipRegionParameter.points[4].x).toBe(20);
        expect(clipRegionParameter.points[4].y).toBe(-20);
    });
    it("chartSetting", () => {
        const tempOptions = {
            chartSetting: new ChartSetting({
                colourModeChart: L.supermap.ColourModeChart.DUSK
            })
        };
        const tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        const tileUrl = tiledMapLayerObject.getTileUrl(L.point(1, 4));
        const chartSetting = getQueryValue(tileUrl, 'chartSetting');
        expect(chartSetting).not.toBeNull();
    });
    it("updateParams", () => {
        const tempOptions = {
            chartSetting: new ChartSetting({
                colourModeChart: L.supermap.ColourModeChart.DUSK
            })
        };
        const tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        const tileUrl = tiledMapLayerObject.getTileUrl(L.point(1, 4));
        const chartSetting = getQueryValue(tileUrl, 'chartSetting');
        expect(chartSetting).not.toBeNull();
        const newChartSetting = new ChartSetting({
            colourModeChart: L.supermap.ColourModeChart.NIGHT
        });
        tiledMapLayerObject.updateParams({ chartSetting: newChartSetting });
        expect(tiledMapLayerObject.requestParams.chartSetting.colourModeChart).toBe('NIGHT');

    });

    // 场景1.1：CRS为全球范围，layer不指定可视范围时，1级有效范围无法填充满整个地图div。不渲染额外瓦片+不平铺时，应该是下面4个瓦片
    // {"x":0,"y":0,"z":1}
    // {"x":1,"y":0,"z":1}
    // {"x":0,"y":1,"z":1}
    // {"x":1,"y":1,"z":1}
    it("overflowTiles=0 noWrap=true crsbounds", () => {
        var tiledMapLayerObject = tiledMapLayer(url, { overflowTiles: 0, noWrap: true });
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.overflowTiles).toBe(0);
        spyOn(tiledMapLayerObject, 'createTile').and.callThrough();
        tiledMapLayerObject.addTo(map);
        expect(tiledMapLayerObject.createTile).toHaveBeenCalledTimes(4);
        expect(tiledMapLayerObject.createTile).not.toHaveBeenCalledWith(jasmine.objectContaining({ x: -1, y: -1 }), jasmine.any(Function));
    });
    // 场景1.2：CRS为全球范围，layer不指定可视范围时，1级有效范围无法填充满整个地图div。渲染1圈额外瓦片+不平铺时，应该是原本的四个瓦片加外面一圈瓦片
    it("overflowTiles=1 noWrap=true crsbounds", () => {
        var tiledMapLayerObject = tiledMapLayer(url, { overflowTiles: 1, noWrap: true });
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.overflowTiles).toBe(1);
        spyOn(tiledMapLayerObject, 'createTile').and.callThrough();
        tiledMapLayerObject.addTo(map);
        expect(tiledMapLayerObject.createTile).toHaveBeenCalledTimes(16);
        expect(tiledMapLayerObject.createTile).toHaveBeenCalledWith(jasmine.objectContaining({ x: -1, y: -1 }), jasmine.any(Function));
    });

    // 场景1.3：CRS为全球范围，layer不指定可视范围时，1级有效范围无法填充满整个地图div。渲染1圈额外瓦片+平铺时，渲染1圈额外瓦片参数无效，但是由于平铺，会把原本的四个瓦片再平铺一次
    it("overflowTiles=1 noWrap=false crsbounds", () => {
        var tiledMapLayerObject = tiledMapLayer(url, { overflowTiles: 1, noWrap: false });
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.overflowTiles).toBe(1);
        spyOn(tiledMapLayerObject, 'createTile').and.callThrough();
        tiledMapLayerObject.addTo(map);
        // 应该是4张  但是wrap了 多了4张
        expect(tiledMapLayerObject.createTile).toHaveBeenCalledTimes(8);
        expect(tiledMapLayerObject.createTile).not.toHaveBeenCalledWith(jasmine.objectContaining({ x: -1, y: -1 }), jasmine.any(Function));
    });
    // 场景2.1：CRS为全球范围，layer指定可视范围时，8级layer可视范围无法填充满整个地图div。不渲染额外瓦片+不平铺时，应该是下面4个瓦片
    // {"x":206,"y":113,"z":8}
    // {"x":206,"y":112,"z":8}
    // {"x":207,"y":113,"z":8}
    //  {"x":207,"y":112,"z":8}
    it("overflowTiles=0 noWrap=true layerbounds", () => {
        map.setView([20.5, 111.0], 8);
        var tiledMapLayerObject = tiledMapLayer(url, { bounds: [[20, 110], [21, 112]], noWrap: true });
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.overflowTiles).toBe(0);
        spyOn(tiledMapLayerObject, 'createTile').and.callThrough();
        tiledMapLayerObject.addTo(map);
        expect(tiledMapLayerObject.createTile).toHaveBeenCalledTimes(4);
        expect(tiledMapLayerObject.createTile).not.toHaveBeenCalledWith(jasmine.objectContaining({ x: 205, y: 111 }), jasmine.any(Function));
    });
    // 场景2.2：CRS为全球范围，layer指定可视范围时，8级layer可视范围无法填充满整个地图div。渲染1圈额外瓦片+不平铺时，应该是原本的四个瓦片加外面一圈瓦片
    it("overflowTiles=1 noWrap=true layerbounds", () => {
        map.setView([20.5, 111.0], 8);
        var tiledMapLayerObject = tiledMapLayer(url, { bounds: [[20, 110], [21, 112]], overflowTiles: 1, noWrap: true });
        expect(tiledMapLayerObject).not.toBeNull()
        expect(tiledMapLayerObject.options.overflowTiles).toBe(1);
        spyOn(tiledMapLayerObject, 'createTile').and.callThrough();
        tiledMapLayerObject.addTo(map);
        expect(tiledMapLayerObject.createTile).toHaveBeenCalledTimes(16);
        expect(tiledMapLayerObject.createTile).toHaveBeenCalledWith(jasmine.objectContaining({ x: 205, y: 111 }), jasmine.any(Function));
    });
    // 场景2.3：CRS为全球范围，layer指定可视范围时，8级有效范围无法填充满整个地图div。渲染1圈额外瓦片+平铺时，渲染1圈额外瓦片参数无效，但是平铺是CRS范围的平铺，当前范围并不涉及，还是四张本身的瓦片
    it("overflowTiles=1 noWrap=false layerbounds", () => {
        map.setView([20.5, 111.0], 8);
        var tiledMapLayerObject = tiledMapLayer(url, { bounds: [[20, 110], [21, 112]], overflowTiles: 1, noWrap: false });
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.overflowTiles).toBe(1);
        spyOn(tiledMapLayerObject, 'createTile').and.callThrough();
        tiledMapLayerObject.addTo(map);
        expect(tiledMapLayerObject.createTile).toHaveBeenCalledTimes(4);
        expect(tiledMapLayerObject.createTile).not.toHaveBeenCalledWith(jasmine.objectContaining({ x: 205, y: 111 }), jasmine.any(Function));
    });
    // 场景3.1：CRS为图层范围，1级layer可视范围无法填充满整个地图div。不渲染额外瓦片+不平铺时，应该是下面2个瓦片
    // {"x":0,"y":0,"z":1}
    // {"x":1,"y":0,"z":1}
    it("overflowTiles=0 noWrap=true crsWithLayerBounds", () => {
        var tiledMapLayerObject = tiledMapLayer(url, { overflowTiles: 0, noWrap: true });
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.overflowTiles).toBe(0);
        spyOn(tiledMapLayerObject, 'createTile').and.callThrough();
        tiledMapLayerObject.addTo(map1);
        expect(tiledMapLayerObject.createTile).toHaveBeenCalledTimes(2);
        expect(tiledMapLayerObject.createTile).not.toHaveBeenCalledWith(jasmine.objectContaining({ x: -1, y: -1 }), jasmine.any(Function));
    });
    // 场景3.2：CRS为图层范围，1级layer可视范围无法填充满整个地图div。渲染1圈额外瓦片+不平铺时，应该是原本的2个瓦片加外面一圈瓦片
    it("overflowTiles=1 noWrap=true crsWithLayerBounds", () => {
        var tiledMapLayerObject = tiledMapLayer(url, { overflowTiles: 1, noWrap: true });
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.overflowTiles).toBe(1);
        spyOn(tiledMapLayerObject, 'createTile').and.callThrough();
        tiledMapLayerObject.addTo(map1);
        expect(tiledMapLayerObject.createTile).toHaveBeenCalledTimes(12);
        expect(tiledMapLayerObject.createTile).toHaveBeenCalledWith(jasmine.objectContaining({ x: -1, y: -1 }), jasmine.any(Function));
    });
    // 场景3.3：CRS为图层范围，1级layer可视范围无法填充满整个地图div。渲染1圈额外瓦片+不平铺时，渲染1圈额外瓦片+平铺时，渲染1圈额外瓦片参数无效，CRS范围刚好是当前视图所以平铺有效，会把原本的2个瓦片再平铺一次
    it("overflowTiles=1 noWrap=false crsWithLayerBounds", () => {
        var tiledMapLayerObject = tiledMapLayer(url, { overflowTiles: 1, noWrap: false });
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.overflowTiles).toBe(1);
        spyOn(tiledMapLayerObject, 'createTile').and.callThrough();
        tiledMapLayerObject.addTo(map1);
        expect(tiledMapLayerObject.createTile).toHaveBeenCalledTimes(4);
        expect(tiledMapLayerObject.createTile).not.toHaveBeenCalledWith(jasmine.objectContaining({ x: -1, y: -1 }), jasmine.any(Function));
    });

});