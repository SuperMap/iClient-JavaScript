import {mapVLayer} from '../../../src/leaflet/overlay/MapVLayer';
import {tiledMapLayer} from '../../../src/leaflet/mapping/TiledMapLayer';
import {utilCityCenter, DataSet} from 'mapv';

var url = GlobeParameter.ChinaURL;
describe('leaflet_MapVLayer', () => {
    var originalTimeout;
    var testDiv, map, layer;
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
            center: [32, 109],
            zoom: 4,
        });
        tiledMapLayer(url).addTo(map);

    });
    beforeEach(() => {
        var randomCount = 1000;
        var data = [];
        var citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南",
            "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州",
            "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"];
        // 构造数据
        while (randomCount--) {
            var cityCenter = utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
                },
                count: 30 * Math.random()
            });
        }
        var dataSet = new DataSet(data);
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
        layer = mapVLayer(dataSet, options).addTo(map);
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        layer.remove();
    });
    afterAll(() => {
        document.body.removeChild(testDiv);
        map.remove();
    });

    it('initialize', (done) => {
        expect(layer).not.toBeNull();
        expect(layer.mapVOptions.shadowBlur).toEqual(20);
        expect(layer.mapVOptions.draw).toBe("honeycomb");
        //判断是否返回期望的maplayer
        expect(layer.renderer).not.toBeNull();
        expect(layer.renderer.context).toBe("2d");
        expect(layer.renderer.canvasLayer).not.toBeNull();
        done();
    });

    it('addData', () => {
        var data = [{
            geometry: {
                type: 'Point',
                coordinates: [109, 32]
            },
            count: 111
        }];
        var dataset = new DataSet(data);
        var tempoption = {
            shadowBlur: 30
        }
        layer.addData(dataset, tempoption);
        expect(layer.dataSet).not.toBeNull();
        expect(layer.dataSet._data[1000].count).toEqual(111);
        expect(layer.dataSet._data[1000].geometry.coordinates[0]).toEqual(109);
        expect(layer.dataSet._data[1000].geometry.coordinates[1]).toEqual(32);
        expect(layer.mapVOptions.shadowBlur).toEqual(30);
    });

    it('getData', () => {
        var dataset = layer.getData();
        expect(dataset._data.length).toEqual(1000);
    });

    //删除数据
    it('removeData', (done) => {
        var filter = (data) => {
            if (layer.dataSet._data.indexOf(data) === 2) {
                return true
            }
            return false;
        }
        layer.removeData(filter);
        setTimeout(() => {
            expect(layer.dataSet._data.length).toEqual(999);
            done();
        }, 6000);
    });

    it('update', () => {
        var data = [{
            geometry: {
                type: 'Point',
                coordinates: [109, 32]
            },
            count: 111
        }];
        var dataset = new DataSet(data);
        var tempoption = {
            shadowBlur: 40
        }
        var opt = {data: dataset, options: tempoption};
        layer.update(opt);
        expect(layer.dataSet._data.length).toEqual(1);
        expect(layer.dataSet._data[0].count).toEqual(111);
        expect(layer.dataSet._data[0].geometry.coordinates[0]).toEqual(109);
        expect(layer.dataSet._data[0].geometry.coordinates[1]).toEqual(32);
        expect(layer.mapVOptions.shadowBlur).toEqual(40);
    });

    it('clearData', () => {
        layer.clearData();
        expect(layer.dataSet._data.length).toEqual(0);
    });

    it('draw, redraw', () => {
        layer.draw();
        expect(layer.canvas.width).toEqual(500);
        expect(layer.canvas.style.width).toBe('500px');
        layer.redraw();
        expect(layer.canvas.width).toEqual(500);
        expect(layer.canvas.style.width).toBe('500px');
    });

    it('setZIndex', () => {
        layer.setZIndex(2);
        expect(layer.canvas.style.zIndex).toEqual('2');
    });

    it('getCanvas', () => {
        var canvas = layer.getCanvas();
        expect(canvas).not.toBeNull();
        expect(layer.canvas.width).toEqual(500);
        expect(layer.canvas.height).toEqual(500);
    });

    it('getContainer', () => {
        var container = layer.getContainer();
        expect(container).not.toBeNull();
    });

    it('getTopLeft', () => {
        var topLeft = layer.getTopLeft();
        expect(topLeft).not.toBeNull();
        expect(topLeft.lng).toEqual(87.01171875);
        expect(topLeft.lat).toEqual(48.63290858589535);
    });
});