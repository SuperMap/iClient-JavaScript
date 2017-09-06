require('../../../src/leaflet/overlay/MapVLayer');

var mapv = require('mapv');
window.mapv = mapv;

var url = GlobeParameter.ChinaURL;
describe('leaflet_MapVLayer', function () {
    var originalTimeout;
    var testDiv, map, mapvLayer;
    beforeAll(function () {
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        document.body.appendChild(testDiv);

        map = L.map('map', {
            center: [32, 109],
            zoom: 4,
        });

        L.supermap.tiledMapLayer(url).addTo(map);

    });
    beforeEach(function () {

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

        //创建MapV图层
        mapvLayer = L.supermap.mapVLayer(dataSet, options).addTo(map);

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        mapvLayer.remove();
    });

    afterAll(function () {
        document.body.removeChild(testDiv);
        map.remove();
        mapv = null;
    });

    it('constructor test', function (done) {
        expect(mapvLayer).not.toBeNull();
        expect(mapvLayer.mapVOptions.shadowBlur).toEqual(20);
        expect(mapvLayer.mapVOptions.draw).toBe("honeycomb");

        //判断是否返回期望的maplayer
        expect(mapvLayer.renderer).not.toBeNull();
        expect(mapvLayer.renderer.context).toBe("2d");
        expect(mapvLayer.renderer.canvasLayer).not.toBeNull();
        done();
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
        expect(mapvLayer.mapVOptions.shadowBlur).toEqual(30);
    });

    it('getData test',function () {
        var dataset = mapvLayer.getData()
        expect(dataset._data.length).toEqual(1000);
    });

    xit('removeData test',function (done) {
        var filter = function(data){
            //if( mapvLayer.dataSet._data.indexOf(data) === 2){
            if(data.count = 7.439562169122387){
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

    it('update test',function () {
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
        var opt = {data: dataset, options: tempoption};
        mapvLayer.update(opt);

        expect(mapvLayer.dataSet._data.length).toEqual(1);
        expect(mapvLayer.dataSet._data[0].count).toEqual(111);
        expect(mapvLayer.dataSet._data[0].geometry.coordinates[0]).toEqual(109);
        expect(mapvLayer.dataSet._data[0].geometry.coordinates[1]).toEqual(32);
        expect(mapvLayer.mapVOptions.shadowBlur).toEqual(40);
    });

    it('clearData test',function () {
        mapvLayer.clearData();
        expect(mapvLayer.dataSet._data.length).toEqual(0);
    });

    it('draw redraw test',function () {
        mapvLayer.draw();
        expect(mapvLayer.canvas.width).toEqual(500);
        expect(mapvLayer.canvas.style.width).toBe('500px');
        mapvLayer.redraw();
        expect(mapvLayer.canvas.width).toEqual(500);
        expect(mapvLayer.canvas.style.width).toBe('500px');
    });

    it('setZIndex test',function () {
        mapvLayer.setZIndex(2);
        expect(mapvLayer.canvas.style.zIndex).toEqual('2');
    });

    it('getCanvas test',function () {
        var canvas = mapvLayer.getCanvas();
        expect(canvas).not.toBeNull();
        expect(mapvLayer.canvas.width).toEqual(500);
        expect(mapvLayer.canvas.height).toEqual(500);
    });

    it('getContainer test',function () {
        var container = mapvLayer.getContainer();
        expect(container).not.toBeNull();
    });

    it('getTopLeft test',function () {
        var topLeft = mapvLayer.getTopLeft();
        expect(topLeft).not.toBeNull();
        expect(topLeft.lng).toEqual(87.01171875);
        expect(topLeft.lat).toEqual(48.63290858589535);
    });

});