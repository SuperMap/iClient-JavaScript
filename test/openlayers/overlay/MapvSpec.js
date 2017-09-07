require('../../../src/openlayers/overlay/mapv');
var mapv = require('mapv');
window.mapv = mapv;

var url = GlobeParameter.ChinaURL;
describe('openlayers_testMapV', function () {
    var originalTimeout;
    var testDiv, map, mapVSource;
    beforeAll(function () {
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        document.body.appendChild(testDiv);

        map = new ol.Map({
            target: 'map',
            controls: ol.control.defaults({attributionOptions: {collapsed: false}})
                .extend([new ol.supermap.control.Logo()]),
            view: new ol.View({
                center: ol.proj.transform([105.403119, 38.028658], 'EPSG:4326', 'EPSG:3857'),
                zoom: 4,
                projection: 'EPSG:3857'
            })
        });

        map.addLayer(new ol.layer.Tile({
            source: new ol.source.TileSuperMapRest({
                url: url,
                attributions: new ol.Attribution({
                    html: "Map Data © <a href='https://www.supermapol.com/' target='_blank'> SuperMap Online</a>"
                })
            })
        }));
        var randomCount = 300;
        var data = [];
        var citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南", "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州", "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"];
        // 构造数据
        while (randomCount--) {
            var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates: ol.proj.transform([cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4], 'EPSG:4326', 'EPSG:3857')
                },
                count: 30 * Math.random()
            });
        }
        var dataSet = new mapv.DataSet(data);
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
        var options = {
            map: map, dataSet: dataSet, mapvOptions: mapvOptions
        };
        mapVSource = new ol.source.Mapv(options);
        map.addLayer(new ol.layer.Image({
            source: mapVSource
        }));
    });

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    afterAll(function () {
        document.body.removeChild(testDiv);
        mapv = null;
    });

    it('constructor test', function (done) {
        //判断是否返回期望的maplayer
        setTimeout(function () {
            expect(mapVSource).not.toBeNull();
            expect(mapVSource.mapvOptions.shadowBlur).toBe(20);
            expect(mapVSource.mapvOptions.draw).toBe("honeycomb");
            expect(mapVSource.layer).not.toBeNull();
            expect(mapVSource.layer.canvasLayer.context).toBe("2d");
            expect(mapVSource.layer.canvasLayer.paneName).toBe("mapPane");
            expect(mapVSource.layer.canvasLayer.zIndex).toEqual(2);
            done();
        }, 5000)
    });

});
