require('../../../../src/common/overlay/levelRenderer/Area');

describe('testArea', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it("init", function () {
        var init = new SuperMap.LevelRenderer.Tool.Area();
        expect(init.TEXT_CACHE_MAX).toBe(5000);
        expect(parseFloat(init.PI2.toFixed(15))).toBe(6.283185307179586);
        expect(init.roots.toString()).toBe('-1,-1,-1');
        expect(init.extrema.toString()).toBe('-1,-1');
    });

    it("normalizeRadian", function () {
        var angle = 360;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init.normalizeRadian(angle);
        expect(result).not.toBeNull();
        expect(result).toBe(1.8584374907635848);
    });

    it("isInside_shape.buildPath && this._ctx.isPointInPath", function () {
        var shape = new SuperMap.LevelRenderer.Shape.SmicEllipse({
            style: {
                x: 100,
                y: 100,
                a: 40,
                b: 20,
                brushType: 'both',
                color: 'blue',
                strokeColor: 'red',
                lineWidth: 3,
                text: 'SmicEllipse'
            }
        });

        var area = {
            x: 100,
            y: 100,
            a: 40,
            b: 20,
            brushType: 'both',
            color: 'blue',
            strokeColor: 'red',
            lineWidth: 3,
            text: 'SmicEllipse'
        };
        var x = 209;
        var y = 110;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init.isInside(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("isInside__mathReturn_not_undefined", function () {

        var shape = new SuperMap.LevelRenderer.Shape.SmicPolygon({
            style: {
                // 100x100 的正方形
                pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
                color: 'blue'
            }
        });

        var area = {
            // 100x100 的正方形
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        };

        var x = 209;
        var y = 110;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init.isInside(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("isInside_switch_path_smicellipse", function () {
        var shape = new SuperMap.LevelRenderer.Shape.SmicEllipse();
        var area = {};
        var x = 100;
        var y = 200;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init.isInside(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("isInside_switch_path_trochoid", function () {
        var shape = new SuperMap.LevelRenderer.Shape();
        shape["type"] = "trochoid";
        shape["style"] = {
            "r1": 20,
            "r2": 30,
            "d": 50,
            "location": "out"
        };
        var area = {
            "r1": 20,
            "r2": 30,
            "d": 50,
            "location": "out"
        };
        var x = 100;
        var y = 200;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init.isInside(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("isInside_switch_path_rose", function () {
        var shape = new SuperMap.LevelRenderer.Shape();
        shape["type"] = "rose";
        shape["style"] = {"maxr": 10};
        var area = {"maxr": 10}, x = 100, y = 200;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init.isInside(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("isInside_switch_path_default", function () {
        var shape = new SuperMap.LevelRenderer.Shape();
        shape["style"] = {"maxr": 10};
        var area = {"maxr": 10}, x = 100, y = 200;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init.isInside(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("isInside_switch_path_ellipse", function () {
        var shape = new SuperMap.LevelRenderer.Shape();
        shape["type"] = "ellipse";
        shape["style"] = {"maxr": 10};
        var area = {"maxr": 10}, x = 100, y = 200;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init.isInside(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("_mathMethod_bezier-curve_and_area.cpX2_equalTo_undefined", function () {
        var shape = new SuperMap.LevelRenderer.Shape();
        shape.x1 = 10;
        shape.y1 = 10;
        shape.x2 = 20;
        shape.y2 = 20;
        shape.cpX1 = 5;
        shape.cpY1 = 5;
        shape.percent = 1;
        shape.type = "bezier-curve";

        var area = {
            stroke: '#000',
            fill: null,
            cpX1: 5,
            cpY1: 5,
            cpX2: undefined,
            cpY2: 20,
            xStart: 0,
            yStart: 0,
            xEnd: 80,
            yEnd: 80,
            lineWidth: "10px",
        };
        var x = 100;
        var y = 200;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("_mathMethod_bezier-curve_and_area.cpX2_not_equalTo_undefined", function () {
        var shape = new SuperMap.LevelRenderer.Shape();
        shape.x1 = 10;
        shape.y1 = 10;
        shape.x2 = 20;
        shape.y2 = 20;
        shape.cpX1 = 5;
        shape.cpY1 = 5;
        shape.percent = 1;
        shape.type = "bezier-curve";

        var area = {
            stroke: '#000',
            fill: null,
            cpX1: 5,
            cpY1: 5,
            cpX2: 20,
            cpY2: 20,
            xStart: 0,
            yStart: 0,
            xEnd: 80,
            yEnd: 80,
            lineWidth: "10px",
        };
        var x = 100;
        var y = 200;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("_mathMethod_line", function () {
        var shape = new SuperMap.LevelRenderer.Shape();
        shape.x1 = 10;
        shape.y1 = 10;
        shape.x2 = 20;
        shape.y2 = 20;
        shape.type =  "line";

        var area = {
            xStart: 0,
            yStart: 0,
            xEnd: 80,
            yEnd: 80,
            lineWidth: "10px",
        };
        var x = 100;
        var y = 200;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("_mathMethod_broken-line_false", function () {
        var shape = new SuperMap.LevelRenderer.Shape();
        shape.type =  "broken-line";

        var area = {
            pointList: [[0, 0], [100, 100], [100, 0]],
            lineWidth: 0.1
        };
        var x = 100;
        var y = 200;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("_mathMethod_broken-line_true", function () {
        var shape = new SuperMap.LevelRenderer.Shape();
        shape.type =  "broken-line";
        var area = {
            pointList: [[100, 1], [90, 100], [1, 1]],
            lineWidth: 90
        };
        var x = 10;
        var y = 10;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeTruthy();
    });

    it("_mathMethod_smicbroken-line", function () {

        var shape = new SuperMap.LevelRenderer.Shape();
        shape.x1 = 10;
        shape.y1 = 10;
        shape.x2 = 20;
        shape.y2 = 20;
        shape.refOriginalPosition = [80, 80];
        shape.type = "smicbroken-line";


        var area = {
            xStart: 0,
            yStart: 0,
            xEnd: 80,
            yEnd: 80,
            pointList: 10,
            lineWidth: "1px"
        };
        var x = 100;
        var y = 200;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();

    });

    it("_mathMethod_ring", function () {

        var shape = new SuperMap.LevelRenderer.Shape();
        shape.x1 = 10;
        shape.y1 = 10;
        shape.x2 = 20;
        shape.y2 = 20;
        shape.refOriginalPosition = [80, 80];
        shape.type = "ring";

        var area = {
            xStart: 0,
            yStart: 0,
            xEnd: 80,
            yEnd: 80,
            pointList: 10,
            x: 0,
            y: 0,
            r0: 10,
            r: 20,
            lineWidth: "1px"
        };
        var x = 100;
        var y = 200;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();

    });

    it("_mathMethod_smicring", function () {
        var shape = new SuperMap.LevelRenderer.Shape.SmicRing({
            style: {
                x: 100,
                y: 100,
                r0: 30,
                r: 50
            }
        });

        var area = {
            xStart: 0,
            yStart: 0,
            xEnd: 80,
            yEnd: 80,
            pointList: [[0, 0], [100, 100], [100, 0]],
            x: 0,
            y: 0,
            r0: 10,
            r: 20,
            lineWidth: "1px"
        };
        var x = 100;
        var y = 200;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("_mathMethod_circle", function () {

        var shape = new SuperMap.LevelRenderer.Shape();
        shape.x1 = 10;
        shape.y1 = 10;
        shape.x2 = 20;
        shape.y2 = 20;
        shape.refOriginalPosition = [80, 80];
        shape.type = "circle";
        shape.holePolygonPointLists=[
            [
                [1, 2], [3, 4]
            ],
            [
                [5, 6], [7, 8]
            ]
        ];

        var area = {
            xStart: 0,
            yStart: 0,
            xEnd: 80,
            yEnd: 80,
            pointList: [[0, 0], [100, 100], [100, 0]],
            x: 10,
            y: 5,
            r0: 10,
            r: 20,
            lineWidth: "1px"
        };
        var x = 20;
        var y = 10;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeTruthy();
    });

    it("_mathMethod_smicpoint", function () {
        var shape = new SuperMap.LevelRenderer.Shape.SmicPoint({
            style: {
                x: 100,
                y: 100,
                r: 40,
                brushType: 'both',
                color: 'blue',
                strokeColor: 'red',
                lineWidth: 3,
                text: 'point'
            }
        });
        var area = {
            xStart: 0,
            yStart: 0,
            xEnd: 80,
            yEnd: 80,
            pointList: [[0, 0], [100, 100], [100, 0]],
            x: 10,
            y: 5,
            r0: 10,
            r: 20,
            lineWidth: "1px"
        };
        var x = 20;
        var y = 10;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeTruthy();
    });

    it("_mathMethod_sector", function () {
        var shape = new SuperMap.LevelRenderer.Shape();
        shape.x1 = 10;
        shape.y1 = 10;
        shape.x2 = 20;
        shape.y2 = 20;
        shape.refOriginalPosition= [10, 5];
        shape.type = "sector";
        shape.holePolygonPointLists=[
            [
                [1, 2], [3, 4]
            ],
            [
                [5, 6], [7, 8]
            ]
        ];

        var area = {
            xStart: 0,
            yStart: 0,
            xEnd: 80,
            yEnd: 80,
            pointList: [[0, 0], [100, 100], [100, 0]],
            x: 10,
            y: 5,
            r0: 10,
            r: 20,
            lineWidth: "1px",
            startAngle: 30,
            endAngle: 180,
            clockWise: false

        };
        var x = 20;
        var y = 10;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("_mathMethod_smicsector", function () {
        var shape = new SuperMap.LevelRenderer.Shape.SmicSector({
            style: {
                x: 100,
                y: 100,
                r: 60,
                r0: 30,
                startAngle: 0,
                endEngle: 180
            }
        });

        var area = {
            xStart: 0,
            yStart: 0,
            xEnd: 80,
            yEnd: 80,
            pointList: [[0, 0], [100, 100], [100, 0]],
            x: 10,
            y: 5,
            r0: 10,
            r: 20,
            lineWidth: "1px",
            startAngle: 30,
            endAngle: 180,
            clockWise: false

        };
        var x = 20;
        var y = 10;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("_mathMethod_path", function () {
        var shape = new SuperMap.LevelRenderer.Shape();
        shape.x1 = 10;
        shape.y1 = 10;
        shape.x2 = 20;
        shape.y2 = 20;
        shape.refOriginalPosition= [10, 5];
        shape.type = "path";
        shape.holePolygonPointLists=[
            [
                [1, 2], [3, 4]
            ],
            [
                [5, 6], [7, 8]
            ]
        ];

        var area = {
            xStart: 0,
            yStart: 0,
            xEnd: 80,
            yEnd: 80,
            pointList: [[0, 0], [100, 100], [100, 0]],
            x: 10,
            y: 5,
            r0: 10,
            r: 20,
            lineWidth: 1,
            startAngle: 30,
            endAngle: 180,
            clockWise: false,
            brushType: "both",
            pathArray: [{"command": "L", "points": [1311.1312, 3212.3312]}, {
                "command": "M",
                "points": [1311.1312, 30212.3312]
            }, {
                "command": "C",
                "points": [1311.1312, 3212.3312, 1112.1212, 1111.3131, 1000.000, 1311.1312]
            }, {
                "command": "Q",
                "points": [1311.1312, 3212.3312, 1112.1212, 1111.3131, 1000.000, 1311.1312]
            }, {"command": "A", "points": [1311.1312, 30212.3312]}, {"command": "z", "points": [1311.1312, 30212.3312]}]
        };
        var x = 20;
        var y = 10000;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
    });

    it("_mathMethod_polygon", function () {
        var shape = new SuperMap.LevelRenderer.Shape();
        shape.type = "polygon";
        var area = {
            pointList: [[0, 0], [100, 100], [100, 0]]
        };
        var x = 20;
        var y = 10;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeTruthy();
    });

    it("_mathMethod_smicpolygon", function () {
        var shape = new SuperMap.LevelRenderer.Shape.SmicPolygon({
            style: {
                pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
                color: 'blue'
            }
        });
        var area = {
            xStart: 0,
            yStart: 0,
            xEnd: 80,
            yEnd: 80,
            pointList: [[0, 0], [100, 100], [100, 0]],
            x: 10,
            y: 5,
            r0: 10,
            r: 20,
            lineWidth: 1,
            startAngle: 30,
            endAngle: 180,
            clockWise: false,
            brushType: "fill",
            pathArray: [{"command": "M", "points": [1311.1312, 30212.3312]}, {
                "command": "L",
                "points": [1311.1312, 30212.3312]
            }]
        };
        var x = 20;
        var y = 10;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init.isInside(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeTruthy();
    });

    it("_mathMethod_text", function () {
        var shape = new SuperMap.LevelRenderer.Shape();
        shape.type = "text";
        var area = {
            __rect: {x: 10, y: 5, width: 30, height: 50}
        };
        var x = 20;
        var y = 10;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeTruthy();
    });

    it("_mathMethod_smictext", function () {
        var shape = new SuperMap.LevelRenderer.Shape.SmicText({
            style: {
                text: 'smictext',
                x: 100,
                y: 100,
                textFont: '14px Arial'
            }
        });
        var area = {
            text: 'smictext',
            x: 100,
            y: 100,
            textFont: '14px Arial'
        };
        var x = 20;
        var y = 10;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("_mathMethod_rectangle", function () {
        var shape = new SuperMap.LevelRenderer.Shape.SmicText({
            style: {
                text: 'Label',
                x: 100,
                y: 100,
                textFont: '14px Arial'
            }
        });
        var area = {
            text: 'Label',
            x: 100,
            y: 100,
            textFont: '14px Arial'
        };
        var x = 20;
        var y = 10;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });

    it("_mathMethod_image", function () {
        var shape = new SuperMap.LevelRenderer.Shape();
        shape.type = "image";

        var area = {
            x: 10,
            y: 5,
            width: 80,
            height: 100
        };
        var x = 20;
        var y = 10;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();

    });

    it("_mathMethod_smicimage", function () {
        var shape = new SuperMap.LevelRenderer.Shape.SmicImage({
            style: {
                image: 'test.jpg',
                x: 100,
                y: 100
            }
        });
        var area = {
            x: 5,
            y: 10,
            r0: 10,
            r: 20,
            width: 80,
            height: 100
        };
        var x = 165;
        var y = 100;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init._mathMethod(shape, area, x, y);
        expect(result).not.toBeNull();
        expect(result).toBeFalsy();
    });


    it("windingQuadratic", function () {
        var x0 = 5, y0 = 6, x1 = 10, y1 = 5, x2 = 15, y2 = 10, x = 0, y = 6;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init.windingQuadratic(x0, y0, x1, y1, x2, y2, x, y);
        expect(result).not.toBeNull();
        expect(result).toBe(0);
    });

    it("windingArc", function () {
        var cx = 10, cy = 10, r = 5, startAngle = 30, endAngle = 60, anticlockwise = 1, x = 8, y = 12;
        var init = new SuperMap.LevelRenderer.Tool.Area();
        var result = init.windingArc(cx, cy, r, startAngle, endAngle, anticlockwise, x, y);
        expect(result).not.toBeNull();
    });


});
