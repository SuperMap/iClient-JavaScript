import {tiledMapLayer} from '../../../src/leaflet/mapping/TiledMapLayer';
import {NDVIParameter} from '../../../src/common/iServer/NDVIParameter';
import {HillshadeParameter} from '../../../src/common/iServer/HillshadeParameter';
import {ChartSetting} from '../../../src/common/iServer/ChartSetting';
import {getQueryValue} from '../../tool/utils';
import {mockCreateTile} from '../../tool/mock_leaflet';

var url = GlobeParameter.ChinaURL;
describe('leaflet_TiledMapLayer', () => {
    var originalTimeout;
    var testDiv, map, tiledMapLayerObject;
    beforeAll(() => {
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        mockCreateTile();
        document.body.appendChild(testDiv);
        map = L.map('map', {
            center: [0, 0],
            maxZoom: 18,
            zoom: 1
        });
        tiledMapLayerObject = tiledMapLayer(url).addTo(map);
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
    });

    it('initialize', () => {
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.prjCoordSys).toBeNull();
    });

    it("getTileUrl, getScale", () => {
        var tempOptions = {
            prjCoordSys: {"epsgCode": 3857}
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
        var options = {format: "png"};
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
    it('getAllRequestParams_ICL_1041',()=>{
        var options={};
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
            rasterfunction:new NDVIParameter({redIndex:0,nirIndex:2}),
        };
        const tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        const tileUrl = tiledMapLayerObject.getTileUrl( L.point(1, 4));
        const ndviParameterValue = getQueryValue(tileUrl,'rasterfunction');
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
            rasterfunction:new HillshadeParameter({altitude:10,azimuth:200}),
        };
        const tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        const tileUrl = tiledMapLayerObject.getTileUrl(L.point(1, 4));
        const hillshadeParameterValue = getQueryValue(tileUrl,'rasterfunction');
        expect(hillshadeParameterValue).not.toBeNull;
        const hillshadeParameter = JSON.parse(decodeURIComponent(hillshadeParameterValue));
        expect(hillshadeParameter.type).toBe("HILLSHADE");
        expect(hillshadeParameter.altitude).toBe(10);
        expect(hillshadeParameter.azimuth).toBe(200);
        expect(hillshadeParameter.zFactor).toBe(1);
    });
    it("getTileUrl, clipRegion_grojson", () => {
        const tempOptions = {
            clipRegion:{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[20,-20],[20,0],[40,0],[40,-20],[20,-20]]]}},
            clipRegionEnabled:true
        };
        const tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        const tileUrl = tiledMapLayerObject.getTileUrl(L.point(1, 4));
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
    it("getTileUrl, clipRegion_polygon", () => {
        const tempOptions = {
            clipRegion:L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]], {color: 'red'}),
            clipRegionEnabled:true
        };
        const tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        const tileUrl = tiledMapLayerObject.getTileUrl(L.point(1, 4));
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
    it("chartSetting", () => {
        const tempOptions = {
            chartSetting: new ChartSetting({
              colourModeChart:L.supermap.ColourModeChart.DUSK
            })
        };
        const tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        const tileUrl = tiledMapLayerObject.getTileUrl(L.point(1, 4));
        const chartSetting = getQueryValue(tileUrl,'chartSetting');
        expect(chartSetting).not.toBeNull();
    });
    it("updateParams", () => {
        const tempOptions = {
            chartSetting: new ChartSetting({
              colourModeChart:L.supermap.ColourModeChart.DUSK
            })
        };
        const tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        const tileUrl = tiledMapLayerObject.getTileUrl(L.point(1, 4));
        const chartSetting = getQueryValue(tileUrl,'chartSetting');
        expect(chartSetting).not.toBeNull();
        const newChartSetting = new ChartSetting({
          colourModeChart:L.supermap.ColourModeChart.NIGHT
        });
        tiledMapLayerObject.updateParams({chartSetting: newChartSetting});
        expect(tiledMapLayerObject.requestParams.chartSetting.colourModeChart).toBe('NIGHT');

    });

});