require('../../../src/classic/overlay/MapVLayer');
var mapv = require('mapv');
window.mapv = mapv;

var url = GlobeParameter.ChinaURL;
describe('classic_MapVLayer', function () {
    var originalTimeout;
    var testDiv, map, baseLayer, mapvLayer;
    beforeAll(function () {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);

        map = new SuperMap.Map("map", {
            controls: [
                new SuperMap.Control.Attribution(),
                new SuperMap.Control.ScaleLine(),
                new SuperMap.Control.Zoom(),
                new SuperMap.Control.Navigation({
                    dragPanOptions: {
                        enableKinetic: true
                    }
                })]
        });
        baseLayer = new SuperMap.Layer.TiledDynamicRESTLayer("China", url, {transparent: true, cacheEnabled: true}, {maxResolution: "auto"});
        baseLayer.events.on({"layerInitialized": addLayer});
        function addLayer() {
            map.addLayers([baseLayer]);
            map.setCenter(new SuperMap.LonLat(104, 34.7), 2);
        }
    });
    beforeEach(function () {

        //创建mapVLayer
        var randomCount = 1000;

        var data = [];

        var citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南",
            "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州",
            "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"];

        // 构造数据
        while (randomCount--) {
            var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
                },
                count: 30 * Math.random()
            });
        }

        var dataSet = new mapv.DataSet(data);

        var options = {
            fillStyle: 'rgba(55, 50, 250, 0.8)',
            shadowColor: 'rgba(255, 250, 50, 1)',
            shadowBlur: 20,
            max: 100,
            size: 50,
            label: {
                show: true,
                fillStyle: 'white',
            },
            globalAlpha: 0.5,
            gradient: {0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
            draw: 'honeycomb'
        };

        mapvLayer = new SuperMap.Layer.MapVLayer("mapv", {dataSet: dataSet, options: options});
        map.addLayer(mapvLayer);

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        mapvLayer.destroy();
    });

    afterAll(function () {
        document.body.removeChild(testDiv);
        //map.destroy();
        mapv = null;
    });

    it('constructor test', function () {
        expect(mapvLayer).not.toBeNull();
        expect(mapvLayer.options.shadowBlur).toEqual(20);
        expect(mapvLayer.options.draw).toBe("honeycomb");

        //判断是否返回期望的maplayer
        expect(mapvLayer.renderer).not.toBeNull();
        expect(mapvLayer.renderer.context).toBe("2d");
        expect(mapvLayer.renderer.canvasLayer.name).toBe("mapv");
        expect(mapvLayer.renderer.canvasLayer.maxResolution).toEqual(1.40625);
        expect(mapvLayer.renderer.canvasLayer.minResolution).toEqual(0.00004291534423828125);
        expect(mapvLayer.renderer.canvasLayer.maxScale).toEqual(18023.431091308594);
        expect(mapvLayer.renderer.canvasLayer.minScale).toEqual(590591790);
    });

    it('adddata test',function () {
        var data = [{
            geometry: {
                type: 'Point',
                coordinates: [109, 32]
            },
            count: 111
        }];
        var dataset = new mapv.DataSet(data);
        var tempoption = {
            shadowBlur: 30
        }
        mapvLayer.addData(dataset,tempoption);

        expect(mapvLayer.dataSet).not.toBeNull();
        expect(mapvLayer.dataSet._data[1000].count).toEqual(111);
        expect(mapvLayer.dataSet._data[1000].geometry.coordinates[0]).toEqual(109);
        expect(mapvLayer.dataSet._data[1000].geometry.coordinates[1]).toEqual(32);
        expect(mapvLayer.options.shadowBlur).toEqual(30);
    });

    it('getData test',function () {
        var dataset = mapvLayer.getData()
        expect(dataset._data.length).toEqual(1000);
    });

    xit('removeData test',function (done) {
        var filter = function(data){
            if( mapvLayer.dataSet._data.indexOf(data) === 2){
                return true
            }
            return false;
        }
        mapvLayer.removeData(filter);
        setTimeout(function () {
            expect(mapvLayer.dataSet._data.length).toEqual(999);
            done();
        },6000);
    });

    it('setData test',function () {
        var data = [{
            geometry: {
                type: 'Point',
                coordinates: [109, 32]
            },
            count: 111
        }];
        var dataset = new mapv.DataSet(data);
        var tempoption = {
            shadowBlur: 40
        }
        mapvLayer.setData(dataset,tempoption);

        expect(mapvLayer.dataSet._data.length).toEqual(1);
        expect(mapvLayer.dataSet._data[0].count).toEqual(111);
        expect(mapvLayer.dataSet._data[0].geometry.coordinates[0]).toEqual(109);
        expect(mapvLayer.dataSet._data[0].geometry.coordinates[1]).toEqual(32);
        expect(mapvLayer.options.shadowBlur).toEqual(40);
    });

    it('clearData test',function () {
        mapvLayer.clearData();
        expect(mapvLayer.dataSet._data.length).toEqual(0);
    });

    it('destroy test', function () {
        mapvLayer.destroy();
        expect(mapvLayer.dataSet).toBeNull();
        expect(mapvLayer.options).toBeNull();
        expect(mapvLayer.renderer).toBeNull();
        expect(mapvLayer.supported).toBeNull();
        expect(mapvLayer.canvasContext).toBeNull();
        expect(mapvLayer.maxWidth).toBeNull();
        expect(mapvLayer.maxHeight).toBeNull();
    });

    xit('setMap test', function () {
        var mapvLayerTemp = mapvLayer;
        mapvLayer.setMap(map);

        expect(mapvLayer).not.toEqual(mapvLayerTemp);
    });

    xit('moveTo test', function () {
        var bounds = new SuperMap.Bounds(132, 33, 13, 34);
        var mapvLayerTemp = mapvLayer;
        mapvLayer.moveTo(bounds, true, false);

        expect(mapvLayer.div.style.left).not.toBeNull();
    });

    xit('transferToMapLatLng test', function () {
        var latlng = new SuperMap.LonLat(132, 34);
        var MapLatLng = mapvLayer.transferToMapLatLng(latlng);

        expect(MapLatLng).not.toBeNull();
    });
});