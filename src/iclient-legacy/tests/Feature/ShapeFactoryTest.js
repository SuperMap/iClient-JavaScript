module("ShapeFactory");
test("testShapeFactory_constructorDefault",function(){
    expect(1);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Polygon([
        [0, 0],
        [15, 15],
        [30, 0]
    ]);

    var shapeFactory = new SuperMap.Feature.ShapeFactory(shapeParameters);
    same(shapeFactory.shapeParameters.refOriginalPosition, shapeParameters.refOriginalPosition, "refOriginalPosition");

    shapeFactory.destroy();
    shapeParameters.destroy();
});
test("testShapeFactory_destroy",function(){
    expect(2);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Polygon([
        [0, 0],
        [15, 15],
        [30, 0]
    ]);

    var shapeFactory = new SuperMap.Feature.ShapeFactory(shapeParameters);
    same(shapeFactory.shapeParameters.refOriginalPosition, shapeParameters.refOriginalPosition, "refOriginalPosition");

    shapeFactory.destroy();

    ok(!shapeFactory.shapeParameters, "!shapeParameters");
    shapeParameters.destroy();
});
test("testShapeFactory_createShape",function(){
    function equalsArray(array1, array2){
        if(array1.length !== array2.length){
            return false;
        }

        for(var i = 0, len = array1.length; i < len; i++){
            var arry1i = array1[i];
            var arry2i = array2[i];

            if(arry1i[0] !== arry2i[0]){
                return false;
            }
            if(arry1i[1] !== arry2i[1]){
                return false;
            }
        }
        return true;
    }

    expect(20);

    // 点
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Point(100, 100);
    var shapeFactory = new SuperMap.Feature.ShapeFactory(shapeParameters);
    var shape = shapeFactory.createShape(shapeParameters);
    equal(shape.style.x, 100, "shape.style.x");
    equal(shape.style.y, 100, "shape.style.y");

    // 线
    shapeFactory.shapeParameters = new SuperMap.Feature.ShapeParameters.Line([
        [0, 0],
        [15, 15],
        [30, 0]
    ]);
    var shape = shapeFactory.createShape();
    ok(equalsArray(shape.style.pointList, [
        [0, 0],
        [15, 15],
        [30, 0]
    ]), "shape.style.pointList");

    // 面
    shapeFactory.shapeParameters = new SuperMap.Feature.ShapeParameters.Polygon([
        [0, 0],
        [15, 15],
        [30, 1]
    ]);
    var shape = shapeFactory.createShape();
    ok(equalsArray(shape.style.pointList, [
        [0, 0],
        [15, 15],
        [30, 1]
    ]), "shape.style.pointList");

    // 矩形
    shapeFactory.shapeParameters = new SuperMap.Feature.ShapeParameters.Rectangle(100, 100, 200, 300);
    var shape = shapeFactory.createShape();
    equal(shape.style.x, 100, "shape.style.x");
    equal(shape.style.y, 100, "shape.style.y");
    equal(shape.style.width, 200, "shape.style.width");
    equal(shape.style.height, 300, "shape.style.height");

    // 扇形
    shapeFactory.shapeParameters = new SuperMap.Feature.ShapeParameters.Sector(100, 100, 50, 0, 135, 20)
    var shape = shapeFactory.createShape();
    equal(shape.style.x, 100, "shape.style.x");
    equal(shape.style.y, 100, "shape.style.y");
    equal(shape.style.r, 50, "shape.style.r");
    equal(shape.style.startAngle, 0, "shape.style.startAngle");
    equal(shape.style.endAngle, 135, "shape.style.endAngle");
    equal(shape.style.r0, 20, "shape.style.r0");

    // 标签
    shapeFactory.shapeParameters = new SuperMap.Feature.ShapeParameters.Label(100, 100, "text")
    var shape = shapeFactory.createShape();
    equal(shape.style.x, 100, "shape.style.x");
    equal(shape.style.y, 100, "shape.style.y");
    equal(shape.style.text, "text", "shape.style.text");

    // 图片
    shapeFactory.shapeParameters = new SuperMap.Feature.ShapeParameters.Image(100, 100, "imgUrl")
    var shape = shapeFactory.createShape();
    equal(shape.style.x, 100, "shape.style.x");
    equal(shape.style.y, 100, "shape.style.y");
    equal(shape.style.image, "imgUrl", "shape.style.image");

    shapeParameters.destroy();
    shapeFactory.destroy();

});
test("testSuperMap.Feature.ShapeFactory.transformStyle",function(){
    expect(18);

    var style = {
        fill: true,
        fillColor: "color",
        stroke: true,
        strokeWidth: "lineWidth",
        strokeLinecap: "lineCap",
        strokeLineJoin: "lineJoin",
        strokeDashstyle: "lineType",
        pointRadius: "r",
        label: "text",
        fontColor: "textColor",
        fontStyle: "fontStyle",
        fontVariant: "fontVariant",
        fontWeight: "fontWeight",
        fontSize: "fontSize",
        fontFamily: "fontFamily",
        fontOpacity: "opacity",
        labelPosition: "textPosition",
        labelAlign: "textAlign",
        labelBaseline: "textBaseline",
        labelRotation: "textRotation"
    };

    var transformedStyle = SuperMap.Feature.ShapeFactory.transformStyle(style);

    equal(transformedStyle.brushType, "both", "brushType");
    equal(transformedStyle.color, "color", "color");
    equal(transformedStyle.lineWidth, "lineWidth", "lineWidth");
    equal(transformedStyle.lineCap, "lineCap", "lineCap");
    equal(transformedStyle.lineJoin, "lineJoin", "lineJoin");
    equal(transformedStyle.lineType, "lineType", "lineType");
    equal(transformedStyle.r, "r", "pointRadius");
    equal(transformedStyle.text, "text", "text");
    equal(transformedStyle.textColor, "textColor", "textColor");
    equal(transformedStyle.textFont, "fontStyle fontVariant fontWeight fontSizepx fontFamily", "textFont");
    equal(transformedStyle.opacity, "opacity", "opacity");
    equal(transformedStyle.textPosition, "textPosition", "textPosition");
    equal(transformedStyle.textAlign, "textAlign", "textAlign");
    equal(transformedStyle.textBaseline, "textBaseline", "textBaseline");
    equal(transformedStyle.textRotation, "textRotation", "textRotation");

    style.fill = true;
    style.stroke = false;
    transformedStyle = SuperMap.Feature.ShapeFactory.transformStyle(style);
    equal(transformedStyle.brushType, "fill", "brushType");

    style.fill = false;
    style.stroke = false;
    transformedStyle = SuperMap.Feature.ShapeFactory.transformStyle(style);
    equal(transformedStyle.brushType, "fill", "brushType");


    style.fill = false;
    style.stroke = true;
    transformedStyle = SuperMap.Feature.ShapeFactory.transformStyle(style);
    equal(transformedStyle.brushType, "stroke", "brushType");
});
test("testSuperMap.Feature.ShapeFactory.Background",function(){
    expect(4);

    var sets = {
        backgroundStyle:{
            fill: true,
            stroke: true,
            strokeWidth: "2"
        },
        backgroundRadius: [5, 5, 5, 5]
    };
    var shapeFactory = new SuperMap.Feature.ShapeFactory();

    var shape = SuperMap.Feature.ShapeFactory.Background(shapeFactory, [200, 500, 400, 400], sets);

    equal(shape.style.x, 200, "shape.style.x");
    equal(shape.style.y, 400, "shape.style.y");
    equal(shape.style.width, 200, "shape.style.width");
    equal(shape.style.height, 100, "shape.style.height");

    shapeFactory.destroy();
});
test("testSuperMap.Feature.ShapeFactory.GraphAxis",function(){
    expect(12);
    var shapeFactory = new SuperMap.Feature.ShapeFactory();
    var xShapeInfo = {
        "xPositions": [33, 66, 99, 132, 165],
        "width": 0
    };
    var isExcept = true;


    // 默认坐标轴
    var shapes = SuperMap.Feature.ShapeFactory.GraphAxis(shapeFactory, [200, 500, 400, 400], null, xShapeInfo);
    if(shapes.length !== 1 || shapes[0].style.pointList.length !== 3) isExcept = false;
    ok(isExcept, "default Axis");

    // axis3DParameter
    isExcept = true;
    var setting = {
        axis3DParameter: 20
    };
    var shapes = SuperMap.Feature.ShapeFactory.GraphAxis(shapeFactory, [200, 500, 400, 400], setting, xShapeInfo);
    if(shapes.length !== 1 || shapes[0].style.pointList.length !== 5) isExcept = false;
    ok(isExcept, "axis3DParameter");

    // axis3DParameter axisUseArrow
    isExcept = true;
    var setting = {
        axis3DParameter: 20,
        axisUseArrow: true
    };
    var shapes = SuperMap.Feature.ShapeFactory.GraphAxis(shapeFactory, [200, 500, 400, 400], setting, xShapeInfo);
    if(shapes.length !== 4 || shapes[0].style.pointList.length !== 5) isExcept = false;
    ok(isExcept, "axis3DParameter axisUseArrow");

    // axisStyle axisUseArrow
    isExcept = true;
    var setting = {
        axisStyle: {
            strokeColor: "red"
        },
        axisUseArrow: true
    };
    var shapes = SuperMap.Feature.ShapeFactory.GraphAxis(shapeFactory, [200, 500, 400, 400], setting, xShapeInfo);
    if(shapes.length !== 3 || shapes[0].style.pointList.length !== 3 || shapes[0].style.strokeColor !== "red" || shapes[1].style.strokeColor !== "red" || shapes[2].style.strokeColor !== "red") isExcept = false;
    ok(isExcept, "axisStyle axisUseArrow");

    // axisYTick
    isExcept = true;
    var setting = {
        axisYTick: 1
    };
    var shapes = SuperMap.Feature.ShapeFactory.GraphAxis(shapeFactory, [200, 500, 400, 400], setting, xShapeInfo);
    if(shapes.length !== 1 || shapes[0].style.pointList.length !== 6) isExcept = false;
    ok(isExcept, "axisYTick");

    // axisYTick axis3DParameter
    isExcept = true;
    var setting = {
        axis3DParameter: 20,
        axisYTick: 1
    };
    var shapes = SuperMap.Feature.ShapeFactory.GraphAxis(shapeFactory, [200, 500, 400, 400], setting, xShapeInfo);
    if(shapes.length !== 1 || shapes[0].style.pointList.length !== 8) isExcept = false;
    ok(isExcept, "axisYTick axis3DParameter");

    // axisYTick axis3DParameter axisUseArrow
    isExcept = true;
    var setting = {
        axis3DParameter: 20,
        axisYTick: 1,
        axisUseArrow: true
    };
    var shapes = SuperMap.Feature.ShapeFactory.GraphAxis(shapeFactory, [200, 500, 400, 400], setting, xShapeInfo);
    if(shapes.length !== 4 || shapes[0].style.pointList.length !== 8) isExcept = false;
    ok(isExcept, "axisYTick axis3DParameter axisUseArrow");

    // axisYTick axisStyle axisUseArrow
    isExcept = true;
    var setting = {
        axisStyle: {
            strokeColor: "red"
        },
        axisYTick: 1,
        axisUseArrow: true
    };
    var shapes = SuperMap.Feature.ShapeFactory.GraphAxis(shapeFactory, [200, 500, 400, 400], setting, xShapeInfo);
    if(shapes.length !== 3 || shapes[0].style.pointList.length !== 6 || shapes[0].style.strokeColor !== "red") isExcept = false;
    ok(isExcept, "axisYTick axisStyle axisUseArrow");

    // useXReferenceLine axisytick
    isExcept = true;
    var setting = {
        axisYTick: 1,
        xReferenceLineStyle: {
            strokeColor: "red"
        },
        useXReferenceLine: true
    };
    var shapes = SuperMap.Feature.ShapeFactory.GraphAxis(shapeFactory, [200, 500, 400, 400], setting, xShapeInfo);
    if(shapes.length !== 2 || shapes[0].style.pointList.length !== 2 || shapes[0].style.strokeColor !== "red") isExcept = false;
    ok(isExcept, "useXReferenceLine axisytick");

    // label(length == 1) - no xShapeInfo
    isExcept = true;
    var setting = {
        axisYLabels: ["axisYLabels"],
        axisYLabelsStyle: {
            fillColor: "red"
        },
        axisYLabelsOffset: [0, 0],
        axisXLabels: ["axisXLabels"],
        axisXLabelsStyle: {
            fillColor: "red"
        },
        axisXLabelsOffset: [0, 0]
    };
    var shapes = SuperMap.Feature.ShapeFactory.GraphAxis(shapeFactory, [200, 500, 400, 400], setting);
    if(shapes.length !== 3 || shapes[1].style.text !== "axisYLabels" ||  shapes[2].style.text !== "axisXLabels") isExcept = false;
    ok(isExcept, "label(length == 1)");

    // label(length > 1) - use xShapeInfo
    isExcept = true;
    var setting = {
        axisYLabels: ["axisYLabels1", "axisYLabels2"],
        axisYLabelsStyle: {
            fillColor: "red"
        },
        axisYLabelsOffset: [0, 0],
        axisXLabels: ["axisXLabels1", "axisXLabels2", "axisXLabels3", "axisXLabels4", "axisXLabels5"],
        axisXLabelsStyle: {
            fillColor: "red"
        },
        axisXLabelsOffset: [0, 0]
    };
    var shapes = SuperMap.Feature.ShapeFactory.GraphAxis(shapeFactory, [200, 500, 400, 400], setting, xShapeInfo);
    if(shapes.length !== 8
        || shapes[1].style.text !== "axisYLabels1"
        || shapes[2].style.text !== "axisYLabels2"
        || shapes[3].style.text !== "axisXLabels1"
        || shapes[4].style.text !== "axisXLabels2"
        || shapes[5].style.text !== "axisXLabels3"
        || shapes[6].style.text !== "axisXLabels4"
        ||  shapes[7].style.text !== "axisXLabels5") isExcept = false;
    ok(isExcept, "label(length > 1) - xShapeInfo");

    // label(length > 1) - no xShapeInfo
    isExcept = true;
    var setting = {
        axisYLabels: ["axisYLabels1", "axisYLabels2"],
        axisYLabelsStyle: {
            fillColor: "red"
        },
        axisYLabelsOffset: [0, 0],
        axisXLabels: ["axisXLabels1", "axisXLabels2", "axisXLabels3", "axisXLabels4", "axisXLabels5"],
        axisXLabelsStyle: {
            fillColor: "red"
        },
        axisXLabelsOffset: [0, 0]
    };
    var shapes = SuperMap.Feature.ShapeFactory.GraphAxis(shapeFactory, [200, 500, 400, 400], setting);
    if(shapes.length !== 8
        || shapes[1].style.text !== "axisYLabels1"
        || shapes[2].style.text !== "axisYLabels2"
        || shapes[3].style.text !== "axisXLabels1"
        || shapes[4].style.text !== "axisXLabels2"
        || shapes[5].style.text !== "axisXLabels3"
        || shapes[6].style.text !== "axisXLabels4"
        ||  shapes[7].style.text !== "axisXLabels5") isExcept = false;
    ok(isExcept, "label(length > 1) - xShapeInfo");

    shapeFactory.destroy();
});
test("testSuperMap.Feature.ShapeFactory.ShapeStyleTool",function(){
    expect(1);
    var defaultStyle = {
            fillColor: "#000000"
        },
        style = {
            fillColor: "#111111"
        },
        styleGroup = [
            {
                fillColor: "#111111"
            }
        ],
        styleByCodomain = [
            {
                start: 0,
                end: 2,
                style: {
                    fillColor: "#333333"
                }
            }
        ];

    var newStyle = SuperMap.Feature.ShapeFactory.ShapeStyleTool(defaultStyle, style, styleGroup, styleByCodomain, 0, 1);

    equal(newStyle.fillColor, "#333333", "fillColor");
});
