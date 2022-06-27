import {Mapv} from '../../../src/openlayers/overlay/Mapv';
import {TileSuperMapRest} from '../../../src/openlayers/mapping/TileSuperMapRest';
import {utilCityCenter, DataSet} from 'mapv';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import * as olProj from 'ol/proj';
import ImageLayer from 'ol/layer/Image';

var url = GlobeParameter.ChinaURL;
describe('openlayers_MapV', () => {
    var originalTimeout;
    var testDiv, map, mapVSource, mapVLayer;
    var mapvOptions = {
        fillStyle: 'rgba(55, 50, 250, 0.8)',
        shadowColor: 'rgba(255, 250, 50, 1)',
        shadowBlur: 20,
        max: 100,
        size: 50,
        label: {
            show: true,
            fillStyle: 'white'
        },
        globalAlpha: 0.5,
        gradient: {0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
        draw: 'honeycomb'
    };

    beforeAll(() => {
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        document.body.appendChild(testDiv);
        map = new Map({
            target: 'map',
            view: new View({
                center: olProj.transform([105.403119, 38.028658], 'EPSG:4326', 'EPSG:3857'),
                zoom: 4,
                projection: 'EPSG:3857'
            })
        });
        map.addLayer(new TileLayer({
            source: new TileSuperMapRest({
                url: url,
                attributions: "Map Data © <a href='https://www.supermapol.com/' target='_blank'> SuperMap Online</a>"
            })
        }));

    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

        let randomCount = 300;
        let data = [];
        const citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南", "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州", "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"];
        // 构造数据
        while (randomCount--) {
            var cityCenter = utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates: olProj.transform([cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4], 'EPSG:4326', 'EPSG:3857')
                },
                count: 30 * Math.random()
            });
        }
        const dataSet = new DataSet(data);

        const options = {
            map: map, dataSet: dataSet, mapvOptions: mapvOptions
        };

        mapVSource = new Mapv(options);
        mapVLayer = new ImageLayer({
            source: mapVSource
        });
        map.addLayer(mapVLayer);
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        if (mapVLayer) {
            map.removeLayer(mapVLayer);
        }

    });
    afterAll(() => {
        document.body.removeChild(testDiv);
        map = null;
    });

    it('initialize', (done) => {
        //判断是否返回期望的maplayer
        setTimeout(() => {
            expect(mapVSource).not.toBeNull();
            expect(mapVSource.mapvOptions.shadowBlur).toBe(20);
            expect(mapVSource.mapvOptions.draw).toBe("honeycomb");
            expect(mapVSource.layer).not.toBeNull();
            expect(mapVSource.layer.canvasLayer.context).toBe("2d");
            expect(mapVSource.layer.canvasLayer.paneName).toBe("mapPane");
            expect(mapVSource.layer.canvasLayer.zIndex).toEqual(2);
            done();
        }, 0)
    });

    it('addData', (done) => {
        setTimeout(() => {
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
            };

            mapVSource.addData(dataset, tempoption);
            expect(mapVSource.dataSet).not.toBeNull();
            expect(mapVSource.dataSet._data[300].count).toEqual(111);
            expect(mapVSource.dataSet._data[300].geometry.coordinates[0]).toEqual(109);
            expect(mapVSource.dataSet._data[300].geometry.coordinates[1]).toEqual(32);
            expect(mapVSource.mapvOptions.shadowBlur).toEqual(30);
            done();
        }, 0)
    });

    it('getData', () => {
        var dataset = mapVSource.getData();
        expect(dataset._data.length).toEqual(300);
    });

    //删除数据
    it('removeData', (done) => {
        setTimeout(() => {
            var filter = (data) => {
                if (mapVSource.dataSet._data.indexOf(data) === 2) {
                    return true
                }
                return false;
            };
            mapVSource.removeData(filter);
            expect(mapVSource.dataSet._data.length).toEqual(299);
            done();
        }, 2000);
    });

    it('update', (done) => {
        setTimeout(() => {
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
            };
            var opt = {data: dataset, options: tempoption};
            mapVSource.update(opt);
            expect(mapVSource.dataSet._data.length).toEqual(1);
            expect(mapVSource.dataSet._data[0].count).toEqual(111);
            expect(mapVSource.dataSet._data[0].geometry.coordinates[0]).toEqual(109);
            expect(mapVSource.dataSet._data[0].geometry.coordinates[1]).toEqual(32);
            expect(mapVSource.mapvOptions.shadowBlur).toEqual(40);
            done();
        }, 2000);
    });

    it('clearData', (done) => {
        setTimeout(() => {
            mapVSource.clearData();
            expect(mapVSource.dataSet._data.length).toEqual(0);
            done();
        }, 2000);
    });
});
