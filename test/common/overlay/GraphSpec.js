import {Graph} from '../../../src/common/overlay/Graph';
import {ShapeParameters} from '../../../src/common/overlay/feature/ShapeParameters';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {Vector} from '../../../src/common/commontypes/Vector';
import {LonLat} from '../../../src/common/commontypes/LonLat';

describe('Graph', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor', () => {
        var geometry = new Point(-115, 10);
        var attributes = {
            'SMID': 1,
            'CAPITAL_CH': "巴西利亚"
        };
        var style = {
            strokeColor: "#339933",
            strokeOpacity: 1,
            strokeWidth: 3,
            pointRadius: 6
        };
        var data = new Vector(geometry, attributes, style);
        var layer = "continent_T@World";
        var fields = ["SMID", "CAPITAL_CH"];// data 中的参与此图表生成的字段名称
        var setting = {
            width: 500,
            height: 300,
            codomain: [0, 300],
            XOffset: 10,
            YOffset: 10,
            dataViewBoxParameter: [5, 5, 5, 5],
            decimalNumber: 0
        };
        //专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
        var lonlat = new LonLat(0, -20);
        var point = new ShapeParameters.Point;
        var options = {
            shapeFactory: point,
            shapeParameters: {
                clickable: true,
                hoverable: true
            },
            RelativeCoordinate: true,
            origonPoint: [0, 0],
            chartBox: [0, -300, 500, 0],
            width: 500,
            height: 300,
            XOffset: 10,
            YOffset: 10,
            DVBParameter: [5, 5, 5, 5],
            dataViewBox: [400, 250],
            DVBCodomain: [0, 300],
            DVBOrigonPoint: [50, -25],
            DVBWidth: 400,
            DVBHeight: 250,
            origonPointOffset: [0, 0],
            fields: ["SMID", "CAPITAL_CH"],
        };
        var graph = new Graph(data, layer, fields, setting, options, lonlat);
        expect(graph).not.toBeNull();
        expect(graph.RelativeCoordinate).toBe(false);
        expect(graph.fields).not.toBeNull();
        expect(graph.fields.length).toEqual(2);
        expect(graph.fields[0]).toEqual("SMID");
        expect(graph.fields[1]).toEqual("CAPITAL_CH");
        expect(graph.lonlat.shapeFactory.CLASS_NAME).toEqual("SuperMap.Feature.ShapeParameters.Point");
        expect(graph.lonlat.shapeParameters.clickable).toBe(true);
        expect(graph.lonlat.shapeParameters.hoverable).toBe(true);
        expect(graph.lonlat.XOffset).toEqual(10);
        expect(graph.lonlat.RelativeCoordinate).toBe(true);
        expect(graph.setting).not.toBeNull();
        expect(graph.lonlat.DVBHeight).toEqual(options.DVBHeight);
        expect(graph.lonlat.DVBWidth).toEqual(options.DVBWidth);
        expect(graph.lonlat.DVBCodomain[0]).toEqual(0);
        expect(graph.lonlat.DVBCodomain[1]).toEqual(300);
        expect(graph.lonlat.DVBOrigonPoint[0]).toEqual(50);
        expect(graph.lonlat.DVBOrigonPoint[1]).toEqual(-25);
        for (var i = 0; i < graph.lonlat.DVBParameter.length; i++) {
            expect(graph.lonlat.DVBParameter[i]).toEqual(5);
        }
        for (var j = 0; i < graph.setting.dataViewBoxParameter.length; j++) {
            expect(graph.setting.dataViewBoxParameter[j]).toEqual(5);
        }
        expect(graph.setting.decimalNumber).toEqual(setting.decimalNumber);
        graph.destroy();
        expect(graph.width).toBeNull();
        expect(graph.height).toBeNull();
        expect(graph.setting).toBeNull();
        expect(graph.shapeFactory).toBeNull();
        expect(graph.shapeParameters).toBeNull();
        expect(graph.chartBox).toBeNull();
        expect(graph.fields).toBeNull();
        expect(graph.dataValues).toBeNull();
    });
});

