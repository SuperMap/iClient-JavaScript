import {ShapeFactory} from '../../../../src/common/overlay/feature/ShapeFactory';
import {Point} from '../../../../src/common/overlay/feature/Point';
import {Line} from '../../../../src/common/overlay/feature/Line';
import {Polygon} from '../../../../src/common/overlay/feature/Polygon';
import {Rectangle} from '../../../../src/common/overlay/feature/Rectangle';
import {Sector} from '../../../../src/common/overlay/feature/Sector';
import {Label} from '../../../../src/common/overlay/feature/Label';
import {Image} from '../../../../src/common/overlay/feature/Image';
import {Circle} from '../../../../src/common/overlay/feature/Circle';
import '../../../resources/img/baiduTileTest.png';

describe('ShapeFactory', () => {
    //构建图形工厂对象
    it('constructor, destroy', () => {
        var shapeParameters_point = new Point(0, 0);
        var shapeFactory = new ShapeFactory(shapeParameters_point);
        expect(shapeFactory).not.toBeNull();
        expect(shapeFactory.CLASS_NAME).toEqual("SuperMap.Feature.ShapeFactory");
        expect(shapeFactory.shapeParameters.CLASS_NAME).toEqual("SuperMap.Feature.ShapeParameters.Point");
        expect(shapeFactory.shapeParameters.x).toEqual(0);
        expect(shapeFactory.shapeParameters.y).toEqual(0);
        shapeFactory.destroy();
        expect(shapeFactory.shapeParameters).toBeNull();
    });

    // 创建一个图形 点
    it('createShape_Point', () => {
        var shapeParameters_point = new Point(0, 0);
        var shapeFactory = new ShapeFactory(shapeParameters_point);
        var shape = shapeFactory.createShape(shapeParameters_point);
        expect(shape).not.toBeNull();
        expect(shape.type).toEqual("smicpoint");
        expect(shape.position.length).toEqual(2);
        expect(shape.id).not.toBeNull();
        expect(shape.style.x).toEqual(0);
        expect(shape.style.y).toEqual(0);
        shapeParameters_point.destroy();
        shapeFactory.destroy();
    });

    // 创建一个图形 线
    it('createShape_Line', () => {
        var pointList = [[0, 0], [10, 20], [25, 30]];
        var shapeParameters_Line = new Line(pointList);
        var shapeFactory = new ShapeFactory(shapeParameters_Line);
        var shape = shapeFactory.createShape(shapeParameters_Line);
        expect(shape).not.toBeNull();
        expect(shape.type).toEqual("smicbroken-line");
        expect(shape.id).not.toBeNull();
        expect(shape.style.pointList.length).toEqual(3);
        expect(shape.style.pointList[2][0]).toEqual(25);
        expect(shape.style.pointList[2][1]).toEqual(30);
        shapeParameters_Line.destroy();
        shapeFactory.destroy();
    });

    // 创建一个图形 面
    it('createShape_Polygon', () => {
        var pointList = [[0, 0], [10, 20], [25, 30]];
        var shapeParameters_Polygon = new Polygon(pointList);
        var shapeFactory = new ShapeFactory(shapeParameters_Polygon);
        var shape = shapeFactory.createShape(shapeParameters_Polygon);
        expect(shape).not.toBeNull();
        expect(shape.type).toEqual("smicpolygon");
        expect(shape.id).not.toBeNull();
        expect(shape.style.pointList.length).toEqual(3);
        expect(shape.style.pointList[2][0]).toEqual(25);
        expect(shape.style.pointList[2][1]).toEqual(30);
        shapeParameters_Polygon.destroy();
        shapeFactory.destroy();
    });

    // 创建一个图形 矩形
    it('createShape_Rectangle', () => {
        var shapeParameters_Rectangle = new Rectangle(0, 0, 10, 10);
        var shapeFactory = new ShapeFactory(shapeParameters_Rectangle);
        var shape = shapeFactory.createShape(shapeParameters_Rectangle);
        expect(shape).not.toBeNull();
        expect(shape.type).toEqual("smicrectangle");
        expect(shape.id).not.toBeNull();
        expect(shape.style.x).toEqual(0);
        expect(shape.style.y).toEqual(0);
        expect(shape.style.height).toEqual(10);
        expect(shape.style.width).toEqual(10);
        shapeParameters_Rectangle.destroy();
        shapeFactory.destroy();
    });

    // 创建一个图形 扇形
    it('createShape_Sector', () => {
        var shapeParameters_Sector = new Sector(0, 0, 10, 0, 60);
        var shapeFactory = new ShapeFactory(shapeParameters_Sector);
        var shape = shapeFactory.createShape(shapeParameters_Sector);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smicsector");
        expect(shape.style.x).toEqual(0);
        expect(shape.style.y).toEqual(0);
        expect(shape.style.r).toEqual(10);
        expect(shape.style.startAngle).toEqual(0);
        expect(shape.style.endAngle).toEqual(60);
        shapeParameters_Sector.destroy();
        shapeFactory.destroy();
    });

    // 创建一个图形 标签
    it('createShape_Label', () => {
        var shapeParameters_Label = new Label(0, 0, "labelTest");
        var shapeFactory = new ShapeFactory(shapeParameters_Label);
        var shape = shapeFactory.createShape(shapeParameters_Label);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smictext");
        expect(shape.style.x).toEqual(0);
        expect(shape.style.y).toEqual(0);
        expect(shape.style.text).toEqual("labelTest");
        shapeParameters_Label.destroy();
        shapeFactory.destroy();
    });

    // 创建一个图形 图片
    it('createShape_Image', () => {
        var imgUrl = '../../../resources/img/baiduTileTest.png';
        var shapeParameters_Image = new Image(0, 0, imgUrl, 260, 208, 50, 50, 150, 150);
        var shapeFactory = new ShapeFactory(shapeParameters_Image);
        var shape = shapeFactory.createShape(shapeParameters_Image);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smicimage");
        expect(shape.style.x).toEqual(0);
        expect(shape.style.y).toEqual(0);
        expect(shape.style.image).not.toBeNull();
        expect(shape.highlightStyle.brushType).toEqual("fill");
        expect(shape.style.brushType).toEqual(shape.highlightStyle.brushType);
        expect(shape.style.height).toEqual(208);
        expect(shape.style.width).toEqual(260);
        expect(shape.sHeight).toEqual(150);
        expect(shape.sWidth).toEqual(150);
        expect(shape.sx).toEqual(50);
        expect(shape.sy).toEqual(50);
        shapeParameters_Image.destroy();
        shapeFactory.destroy();
    });

    // 创建一个图形 圆形
    it('createShape_Circle', () => {
        var shapeParameters_Circle = new Circle(50, 50, 30);
        var shapeFactory = new ShapeFactory(shapeParameters_Circle);
        var shape = shapeFactory.createShape(shapeParameters_Circle);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smiccircle");
        expect(shape.style.x).toEqual(50);
        expect(shape.style.y).toEqual(50);
        expect(shape.style.r).toEqual(30);
        shapeParameters_Circle.destroy();
        shapeFactory.destroy();
    });

    ////将用户 feature.style (类 Svg style 标准) 的样式，转换为 levelRenderer 的样式标准
    //fill类型  即 fill = true
    it('transformStyle_fill=true_stroke=false', () => {
        var style = {
            fill: true,
            fillColor: "#FFFFFF",
            fillOpacity: 1,
            fontColor: "#000000",
            fontFamily: "arial,sans-serif",
            fontOpacity: 1,
            fontSize: "12px",
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: "bolder",
            label: "13",
            labelAlign: "center",
            labelBaseline: "middle",
            labelPosition: "top",
            labelRect: true,
            labelRotation: 0,
            labelSelect: true,
            labelXOffset: 0,
            labelYOffset: 0,
            pointRadius: 6,
            shadowBlur: 0,
            shadowColor: "#000000",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            stroke: false,
            strokeColor: "#8B7B8B",
            strokeDashstyle: "solid",
            strokeLineJoin: "miter",
            strokeLinecap: "butt",
            strokeOpacity: 1,
            strokeWidth: 1
        };
        var newstyle = new ShapeFactory.transformStyle(style);
        expect(newstyle).not.toBeNull();
        expect(newstyle.brushType).toEqual("fill");
    });

    //stroke类型   即stroke = true
    it('transformStyle_fill=false_stroke=true', () => {
        var style = {
            fill: false,
            fillColor: "#FFFFFF",
            fillOpacity: 1,
            fontColor: "#000000",
            fontFamily: "arial,sans-serif",
            fontOpacity: 1,
            fontSize: "12px",
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: "bolder",
            label: "13",
            labelAlign: "center",
            labelBaseline: "middle",
            labelPosition: "top",
            labelRect: true,
            labelRotation: 0,
            labelSelect: true,
            labelXOffset: 0,
            labelYOffset: 0,
            pointRadius: 6,
            shadowBlur: 0,
            shadowColor: "#000000",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            stroke: true,
            strokeColor: "#8B7B8B",
            strokeDashstyle: "solid",
            strokeLineJoin: "miter",
            strokeLinecap: "butt",
            strokeOpacity: 1,
            strokeWidth: 1
        };
        var newstyle = new ShapeFactory.transformStyle(style);
        expect(newstyle).not.toBeNull();
        expect(newstyle.brushType).toEqual("stroke");
    });

    //both类型  即stroke = true && fill = true
    it('transformStyle_fill=true_stroke=true', () => {
        var style = {
            fill: true,
            fillColor: "#FFFFFF",
            fillOpacity: 1,
            fontColor: "#000000",
            fontFamily: "arial,sans-serif",
            fontOpacity: 1,
            fontSize: "12px",
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: "bolder",
            label: "13",
            labelAlign: "center",
            labelBaseline: "middle",
            labelPosition: "top",
            labelRect: true,
            labelRotation: 0,
            labelSelect: true,
            labelXOffset: 0,
            labelYOffset: 0,
            pointRadius: 6,
            shadowBlur: 0,
            shadowColor: "#000000",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            stroke: true,
            strokeColor: "#8B7B8B",
            strokeDashstyle: "solid",
            strokeLineJoin: "miter",
            strokeLinecap: "butt",
            strokeOpacity: 1,
            strokeWidth: 1
        };
        var newstyle = new ShapeFactory.transformStyle(style);
        expect(newstyle).not.toBeNull();
        expect(newstyle.brushType).toEqual("both");
    });

    //false类型  即stroke = false && fill = false
    it('transformStyle_fill=false_stroke=false', () => {
        var style = {
            fill: false,
            fillColor: "#FFFFFF",
            fillOpacity: 1,
            fontColor: "#000000",
            fontFamily: "arial,sans-serif",
            fontOpacity: 1,
            fontSize: "12px",
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: "bolder",
            label: "13",
            labelAlign: "center",
            labelBaseline: "middle",
            labelPosition: "top",
            labelRect: true,
            labelRotation: 0,
            labelSelect: true,
            labelXOffset: 0,
            labelYOffset: 0,
            pointRadius: 6,
            shadowBlur: 0,
            shadowColor: "#000000",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            stroke: false,
            strokeColor: "#8B7B8B",
            strokeDashstyle: "solid",
            strokeLineJoin: "miter",
            strokeLinecap: "butt",
            strokeOpacity: 1,
            strokeWidth: 1
        };
        var newstyle = new ShapeFactory.transformStyle(style);
        expect(newstyle).not.toBeNull();
        expect(newstyle.brushType).toEqual("fill");

    });

    //创建一个矩形背景框图形对象
    it('Background', () => {
        var shapeParameters_Circle = new Circle(50, 50, 30);
        var shapeFactory = new ShapeFactory(shapeParameters_Circle);
        var box = [0, 100, 100, 0];
        var setting = {
            backgroundStyle: new Rectangle(0, 0, 100, 100),
            backgroundRadius: [5, 5, 5, 5]
        };
        var bgShape = new ShapeFactory.Background(shapeFactory, box, setting);
        expect(bgShape).not.toBeNull();
        expect(bgShape.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Shape.SmicRectangle");
        expect(bgShape.type).toEqual("smicrectangle");
        expect(bgShape.id).not.toBeNull();
        expect(bgShape.style).not.toBeNull();
        expect(bgShape.style.height).toEqual(100);
        expect(bgShape.style.width).toEqual(100);
        expect(bgShape.style.radius.length).toEqual(4);
        for (var i = 0; i < bgShape.style.radius.length; i++) {
            expect(bgShape.style.radius[i]).toEqual(5);
        }
        shapeFactory.destroy();
    });

    //创建一个统计图表坐标轴图形对象组  不使用刻度
    it('GraphAxis', () => {
        var shapeParameters_point = new Point(0, 0);
        var shapeFactory = new ShapeFactory(shapeParameters_point);
        var dataViewBox = [50, 150, 150, 50];
        var setting = {
            axisStyle: new Line([[0, 0], [80, 80]]),
            axisUseArrow: true,
            axisYLabels: ["80", "60", "40", "20", "0"],
            axisYLabelsStyle: new Label(75, 75, "y轴"),
            axisXLabels: ["80", "60", "40", "20", "0"],
            axisXLabelsStyle: new Label(75, 75, "x轴"),
            useXReferenceLine: false,
            axis3DParameter: 15,
        };
        var xShapeInfo = {
            xPositions: [50, 0],
            width: 0
        };
        var coordinateArray = new ShapeFactory.GraphAxis(shapeFactory, dataViewBox, setting, xShapeInfo);
        expect(coordinateArray).not.toBeNull();
        expect(coordinateArray.length).toBeGreaterThan(0);
        for (var i = 0; i < coordinateArray.length; i++) {
            expect(coordinateArray[i].id).not.toBeNull();
            expect(coordinateArray[i].style).not.toBeNull();
            expect(coordinateArray[i].type).not.toBeNull();
        }
        shapeFactory.destroy();
    });

    //创建一个统计图表坐标轴图形对象组  使用刻度axisYTick = 5 ,并使用参考线 、标签组偏移量  均匀排列
    it('GraphAxis_axisYTick', () => {
        var shapeParameters_point = new Point(0, 0);
        var shapeFactory = new ShapeFactory(shapeParameters_point);
        var dataViewBox = [50, 150, 150, 50];
        var setting = {
            axisStyle: new Line([[0, 0], [80, 80]]),
            axisUseArrow: true,
            axisYTick: 5,
            axisYLabels: ["80"],
            axisYLabelsStyle: new Label(75, 75, "y轴"),
            axisXLabels: ["80"],
            axisXLabelsStyle: new Label(75, 75, "x轴"),
            axisYLabelsOffset: [1, 1],
            axisXLabelsOffset: [1, 1],
            useXReferenceLine: true,
            xReferenceLineStyle: new Line([[0, 0], [80, 80]]),
            axis3DParameter: 15,
        };
        var xShapeInfo = {
            xPositions: [5],
            width: 0
        };
        var coordinateArray = new ShapeFactory.GraphAxis(shapeFactory, dataViewBox, setting, xShapeInfo);
        expect(coordinateArray).not.toBeNull();
        expect(coordinateArray.length).toBeGreaterThan(0);
        for (var i = 0; i < coordinateArray.length; i++) {
            expect(coordinateArray[i].id).not.toBeNull();
            expect(coordinateArray[i].style).not.toBeNull();
            expect(coordinateArray[i].type).not.toBeNull();
        }
        shapeFactory.destroy();
    });

    //创建一个统计图表坐标轴图形对象组  使用刻度axisYTick = 5  不均匀排列 即axisXLabels.length != xPositions.length
    it('GraphAxis_axisYTick_Nonuniform', () => {
        var shapeParameters_point = new Point(0, 0);
        var shapeFactory = new ShapeFactory(shapeParameters_point);
        var dataViewBox = [50, 150, 150, 50];
        var setting = {
            axisStyle: new Line([[0, 0], [80, 80]]),
            axisUseArrow: true,
            axisYLabels: ["80", "60", "40", "20", "0"],
            axisYLabelsStyle: new Label(75, 75, "y轴"),
            axisXLabels: ["80"],
            axisXLabelsStyle: new Label(75, 75, "x轴"),
            useXReferenceLine: false,
            axis3DParameter: 15,
        };
        var xShapeInfo = {
            xPositions: [50, 0],
            width: 0
        };
        var coordinateArray = new ShapeFactory.GraphAxis(shapeFactory, dataViewBox, setting, xShapeInfo);
        expect(coordinateArray).not.toBeNull();
        expect(coordinateArray.length).toBeGreaterThan(0);
        for (var i = 0; i < coordinateArray.length; i++) {
            expect(coordinateArray[i].id).not.toBeNull();
            expect(coordinateArray[i].style).not.toBeNull();
            expect(coordinateArray[i].type).not.toBeNull();
        }
        shapeFactory.destroy();
    });

    //一个图形 style 处理工具。
    // 此工具将指定的默认 style，通用 style，按 styleGroup 取得的 style 和按数据值 value 范围取得的 style 进行合并，得到图形最终的 style。
    it('ShapeStyleTool', () => {
        var defaultStyle = {};
        var style = {
            fill: true,
            fillColor: "#FFFFFF",
            fillOpacity: 1,
            fontColor: "#000000",
            fontFamily: "arial,sans-serif",
            fontOpacity: 1,
            fontSize: "12px",
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: "bolder",
            label: "13",
            labelAlign: "center",
            labelBaseline: "middle",
            labelPosition: "top",
            labelRect: true,
            labelRotation: 0,
            labelSelect: true,
            labelXOffset: 0,
            labelYOffset: 0,
            pointRadius: 6,
            shadowBlur: 0,
            shadowColor: "#000000",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            stroke: false,
            strokeColor: "#8B7B8B",
            strokeDashstyle: "solid",
            strokeLineJoin: "miter",
            strokeLinecap: "butt",
            strokeOpacity: 1,
            strokeWidth: 1
        };
        var styleGroup = [
            {
                start: 0,
                end: 250,
                style: {
                    color: '#FDE2CA'
                }
            }, {
                start: 250,
                end: 500,
                style: {
                    color: '#FACE9C'
                }
            }, {
                start: 500,
                end: 750,
                style: {
                    color: '#F09C42'
                }
            }, {
                start: 750,
                end: 1500,
                style: {
                    color: '#D0770B'
                }
            }];
        var styleByCodomain = [
            {
                start: 0,
                end: 250,
                style: {
                    fillColor: "#00CD00"
                }
            },
            {
                start: 250,
                end: 500,
                style: {
                    fillColor: "#00EE00"
                }
            },
            {
                start: 500,
                end: 750,
                style: {
                    fillColor: "#00FF7F"
                }
            },
            {
                start: 750,
                end: 1500,
                style: {
                    fillColor: "#00FF00"
                }
            }
        ];
        var index = 1;
        var value = 270;
        var newStyle = new ShapeFactory.ShapeStyleTool(defaultStyle, style, styleGroup, styleByCodomain, index, value);
        expect(newStyle).not.toBeNull();
        expect(newStyle.end).toEqual(500);
        expect(newStyle.fillColor).toEqual("#00EE00");
        expect(newStyle.start).toEqual(250);
        expect(newStyle.style.color).toEqual("#FACE9C");
    });

});

