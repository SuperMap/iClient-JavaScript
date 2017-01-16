module("AnalysisSymbol");

var symbolData = {
    "algoMaxEditPts": 9999999,
    "algoMinEditPts": 2,
    "anchorPoint": {
        "x": 0,
        "y": 0
    },
    "annotationPosition": 4,
    "center": null,
    "code": 24,
    "id": 0,
    "innerCells": [{
        "fillColorLimit": true,
        "fillLimit": false,
        "fontColorLimit": true,
        "lineColorLimit": false,
        "lineTypeLimit": false,
        "lineWidthLimit": false,
        "positionPoints": [],
        "style": {
            "fillBackColor": {
                "alpha": 255,
                "blue": 0,
                "green": 0,
                "red": 255
            },
            "fillBackOpaque": true,
            "fillForeColor": {
                "alpha": 80,
                "blue": 0,
                "green": 0,
                "red": 255
            },
            "fillGradientAngle": 0,
            "fillGradientMode": "NONE",
            "fillGradientOffsetRatioX": 0,
            "fillGradientOffsetRatioY": 0,
            "fillOpaqueRate": 100,
            "fillSymbolID": 1,
            "lineColor": {
                "alpha": 255,
                "blue": 0,
                "green": 0,
                "red": 255
            },
            "lineSymbolID": 0,
            "lineWidth": 0.5,
            "markerAngle": 0,
            "markerHeight": 0,
            "markerSize": 2.4,
            "markerSymbolID": 0,
            "markerWidth": 0
        },
        "surroundLineColor": {
            "alpha": 255,
            "blue": 0,
            "green": 255,
            "red": 255
        },
        "surroundLineFlag": false,
        "surroundLineLimit": false,
        "surroundLineType": 0,
        "surroundLineWidth": 1,
        "textContent": "",
        "textStyle": {
            "align": "TOPLEFT",
            "backColor": {
                "alpha": 255,
                "blue": 0,
                "green": 0,
                "red": 0
            },
            "backOpaque": false,
            "bold": false,
            "fontHeight": 7,
            "fontName": "Microsoft YaHei",
            "fontScale": 1,
            "fontWeight": 0,
            "fontWidth": 0,
            "foreColor": {
                "alpha": 255,
                "blue": 0,
                "green": 0,
                "red": 0
            },
            "italic": false,
            "italicAngle": 0,
            "opaqueRate": 100,
            "outline": false,
            "rotation": 0,
            "shadow": false,
            "sizeFixed": false,
            "strikeout": false,
            "stringAlignment": "LEFT",
            "underline": false
        },
        "type": 24
    }],
    "libID": 0,
    "limitWidthHeight": true,
    "middleMarkBounds": {
        "bottom": 0,
        "left": 0,
        "leftBottom": {
            "x": 0,
            "y": 0
        },
        "right": 0,
        "rightTop": {
            "x": 0,
            "y": 0
        },
        "top": 0
    },
    "middleMarkExist": false,
    "negativeImage": false,
    "parts": null,
    "points": null,
    "position": null,
    "prjCoordSys": null,
    "rotate2D": {
        "x": 0,
        "y": 0,
        "z": 0
    },
    "rotationX": 0,
    "rotationY": 0,
    "rotationZ": 0,
    "scale2D": {
        "x": 1,
        "y": 1,
        "z": 0
    },
    "scaleByMap": false,
    "scalePoints": [],
    "scaleValues": [],
    "scaleX": 0,
    "scaleY": 0,
    "scaleZ": 0,
    "style": {
        "fillBackColor": {
            "alpha": 255,
            "blue": 0,
            "green": 0,
            "red": 255
        },
        "fillBackOpaque": true,
        "fillForeColor": {
            "alpha": 80,
            "blue": 0,
            "green": 0,
            "red": 255
        },
        "fillGradientAngle": 0,
        "fillGradientMode": "NONE",
        "fillGradientOffsetRatioX": 0,
        "fillGradientOffsetRatioY": 0,
        "fillOpaqueRate": 100,
        "fillSymbolID": 1,
        "lineColor": {
            "alpha": 255,
            "blue": 0,
            "green": 0,
            "red": 255
        },
        "lineSymbolID": 0,
        "lineWidth": 0.5,
        "markerAngle": 0,
        "markerHeight": 0,
        "markerSize": 2.4,
        "markerSymbolID": 0,
        "markerWidth": 0
    },
    "subSymbols": [],
    "surroundLineColor": {
        "alpha": 255,
        "blue": 0,
        "green": 255,
        "red": 255
    },
    "surroundLineType": 0,
    "surroundLineWidth2D": 1,
    "symbolIsCanFill": false,
    "symbolName": "折线",
    "symbolRank": 0,
    "symbolRanks": [],
    "symbolSize": {
        "x": -1,
        "y": -1
    },
    "symbolType": 24,
    "textContent": "",
    "textStyle2D": {
        "align": "TOPLEFT",
        "backColor": {
            "alpha": 255,
            "blue": 0,
            "green": 0,
            "red": 0
        },
        "backOpaque": false,
        "bold": false,
        "fontHeight": 7,
        "fontName": "Microsoft YaHei",
        "fontScale": 1,
        "fontWeight": 0,
        "fontWidth": 0,
        "foreColor": {
            "alpha": 255,
            "blue": 0,
            "green": 0,
            "red": 0
        },
        "italic": false,
        "italicAngle": 0,
        "opaqueRate": 100,
        "outline": false,
        "rotation": 0,
        "shadow": false,
        "sizeFixed": false,
        "strikeout": false,
        "stringAlignment": "LEFT",
        "underline": false
    },
    "type": "GRAPHICOBJECT"
};

function getColorFromRGB(colorData) {
    var hexStringR = colorData.red.toString(16);
    if (hexStringR.length < 2)
        hexStringR = "0" + hexStringR;
    var hexStringG = colorData.green.toString(16);
    if (hexStringG.length < 2)
        hexStringG = "0" + hexStringG;
    var hexStringB = colorData.blue.toString(16);
    if (hexStringB.length < 2)
        hexStringB = "0" + hexStringB;

    var hexStringColor = "#" + hexStringR + hexStringG + hexStringB;
    return hexStringColor;
}
function getAlign(align) {
    if (align === "TOPLEFT") {
        return "lt";
    } else if (align === "TOPCENTER") {
        return "ct";
    } else if (align === "TOPRIGHT") {
        return "rt";
    } else if (align === "BOTTOMLEFT") {
        return "lb";
    } else if (align === "BOTTOMCENTER") {
        return "cb";
    } else if (align === "BOTTOMRIGHT") {
        return "rb";
    } else if (align === "MIDDLELEFT") {
        return "lm";
    } else if (align === "MIDDLECENTER") {
        return "cm";
    } else if (align === "MIDDLERIGHT") {
        return "rm";
    }
    return "lt";
}

//var params = basicInfo();
//asyncTest("testAnalysisSymbol_analysisBasicInfo", 8, function () {
//    var service = initGetSymbolService(succeed);
//    service.processAsync(basicInfo());
//
//    function succeed() {
//        setTimeout(function () {
//            var symbolData = service.lastResult.resourceInfo;
//            var basicInfo = SuperMap.Plot.AnalysisSymbol.analysisBasicInfo(symbolData);
//            equal(basicInfo.libID, symbolData.libID, "Function:analysisBasicInfo");
//            equal(basicInfo.code, symbolData.code, "Function:analysisBasicInfo");
//            equal(basicInfo.textContent, symbolData.textContent, "Function:analysisBasicInfo");
//            equal(basicInfo.symbolType, symbolData.symbolType, "Function:analysisBasicInfo");
//            equal(basicInfo.symbolName, symbolData.symbolName, "Function:analysisBasicInfo");
//            equal(basicInfo.maxEditPts, symbolData.algoMaxEditPts, "Function:analysisBasicInfo");
//            equal(basicInfo.minEditPts, symbolData.algoMinEditPts, "Function:analysisBasicInfo");
//            equal(basicInfo.surroundLineType, symbolData.surroundLineType, "Function:analysisBasicInfo");
//            start();
//        }, 300);
//    }
//});

test("testAnalysisSymbol_analysisBasicInfo", function () {
    var basicInfo = SuperMap.Plot.AnalysisSymbol.analysisBasicInfo(symbolData);
    equal(basicInfo.libID, symbolData.libID, "Function:analysisBasicInfo");
    equal(basicInfo.code, symbolData.code, "Function:analysisBasicInfo");
    equal(basicInfo.textContent, symbolData.textContent, "Function:analysisBasicInfo");
    equal(basicInfo.symbolType, symbolData.symbolType, "Function:analysisBasicInfo");
    equal(basicInfo.symbolName, symbolData.symbolName, "Function:analysisBasicInfo");
    equal(basicInfo.maxEditPts, symbolData.algoMaxEditPts, "Function:analysisBasicInfo");
    equal(basicInfo.minEditPts, symbolData.algoMinEditPts, "Function:analysisBasicInfo");
    equal(basicInfo.surroundLineType, symbolData.surroundLineType, "Function:analysisBasicInfo");
});

test("testAnalysisSymbol_analysisDotBasicInfo", function () {
    var dotBasicInfo = SuperMap.Plot.AnalysisSymbol.analysisDotBasicInfo(symbolData);
    equal(dotBasicInfo.rotate, symbolData.rotate2D.x, "Function:analysisDotBasicInfo");
    equal(dotBasicInfo.scale, symbolData.scale2D.x, "Function:analysisDotBasicInfo");
    equal(dotBasicInfo.annotationPosition, symbolData.annotationPosition, "Function:analysisDotBasicInfo");
    equal(dotBasicInfo.anchorPoint.x, symbolData.anchorPoint.x, "Function:analysisDotBasicInfo");
    equal(dotBasicInfo.anchorPoint.y, symbolData.anchorPoint.y, "Function:analysisDotBasicInfo");
    equal(dotBasicInfo.symbolRank, symbolData.symbolRank, "Function:analysisDotBasicInfo");
    equal(dotBasicInfo.negativeImage, symbolData.negativeImage, "Function:analysisDotBasicInfo");

    var size = new SuperMap.Size(Math.round(symbolData.symbolSize.x * 96 / 25.4 / 10), Math.round(symbolData.symbolSize.y * 96 / 25.4 / 10));
    var bounds = {
        left: symbolData.middleMarkBounds.leftBottom.x,
        bottom: symbolData.middleMarkBounds.leftBottom.y,
        right: symbolData.middleMarkBounds.rightTop.x,
        top: symbolData.middleMarkBounds.rightTop.y
    };
    equal(dotBasicInfo.middleMarkBounds.left, bounds.left, "Function:analysisDotBasicInfo");
    equal(dotBasicInfo.middleMarkBounds.right, bounds.right, "Function:analysisDotBasicInfo");
    equal(dotBasicInfo.middleMarkBounds.top, bounds.top, "Function:analysisDotBasicInfo");
    equal(dotBasicInfo.middleMarkBounds.bottom, bounds.bottom, "Function:analysisDotBasicInfo");
});

//asyncTest("testAnalysisSymbol_analysisDotBasicInfo", 11, function () {
//    var service = initGetSymbolService(succeed);
//    service.processAsync(basicInfo());
//    function succeed() {
//        setTimeout(function () {
//            var symbolData = service.lastResult.resourceInfo;
//            var dotBasicInfo = SuperMap.Plot.AnalysisSymbol.analysisDotBasicInfo(symbolData);
//            equal(dotBasicInfo.rotate, symbolData.rotate2D.x, "Function:analysisDotBasicInfo");
//            equal(dotBasicInfo.scale, symbolData.scale2D.x, "Function:analysisDotBasicInfo");
//            equal(dotBasicInfo.annotationPosition, symbolData.annotationPosition, "Function:analysisDotBasicInfo");
//            equal(dotBasicInfo.anchorPoint.x, symbolData.anchorPoint.x, "Function:analysisDotBasicInfo");
//            equal(dotBasicInfo.anchorPoint.y, symbolData.anchorPoint.y, "Function:analysisDotBasicInfo");
//            equal(dotBasicInfo.symbolRank, symbolData.symbolRank, "Function:analysisDotBasicInfo");
//            equal(dotBasicInfo.negativeImage, symbolData.negativeImage, "Function:analysisDotBasicInfo");
//
//            var size = new SuperMap.Size(Math.round(symbolData.symbolSize.x * 96 / 25.4 / 10), Math.round(symbolData.symbolSize.y * 96 / 25.4 / 10));
//            var bounds = {
//                left: symbolData.middleMarkBounds.leftBottom.x,
//                bottom: symbolData.middleMarkBounds.leftBottom.y,
//                right: symbolData.middleMarkBounds.rightTop.x,
//                top: symbolData.middleMarkBounds.rightTop.y
//            };
//            equal(dotBasicInfo.middleMarkBounds.left, bounds.left, "Function:analysisDotBasicInfo");
//            equal(dotBasicInfo.middleMarkBounds.right, bounds.right, "Function:analysisDotBasicInfo");
//            equal(dotBasicInfo.middleMarkBounds.top, bounds.top, "Function:analysisDotBasicInfo");
//            equal(dotBasicInfo.middleMarkBounds.bottom, bounds.bottom, "Function:analysisDotBasicInfo");
//            start();
//        }, 400);
//    }
//});

test("testAnalysisSymbol_analysisAlgoBasicInfo", function () {
    var algoBasicInfo = SuperMap.Plot.AnalysisSymbol.analysisAlgoBasicInfo(symbolData,false);
    equal(algoBasicInfo.subSymbols.length, symbolData.subSymbols.length, "Function:analysisAlgoBasicInfo");
    equal(algoBasicInfo.scalePoints.length, symbolData.scalePoints.length, "Function:analysisAlgoBasicInfo");
    equal(algoBasicInfo.scaleValues.length, symbolData.scaleValues.length, "Function:analysisAlgoBasicInfo");
});

//asyncTest("testAnalysisSymbol_analysisAlgoBasicInfo",3, function () {
//    var service = initGetSymbolService(succeed);
//    service.processAsync(basicInfo());
//    function succeed(){
//        var symbolData = service.lastResult.resourceInfo;
//        var isAnalysisSubSymbols = false;
//        var algoBasicInfo = SuperMap.Plot.AnalysisSymbol.analysisAlgoBasicInfo(symbolData,isAnalysisSubSymbols);
//        setTimeout(function(){
//            equal(algoBasicInfo.subSymbols.length, symbolData.subSymbols.length, "Function:analysisAlgoBasicInfo");
//            equal(algoBasicInfo.scalePoints.length, symbolData.scalePoints.length, "Function:analysisAlgoBasicInfo");
//            equal(algoBasicInfo.scaleValues.length, symbolData.scaleValues.length, "Function:analysisAlgoBasicInfo");
//            start();
//        },500);
//    }
//});

test("testAnalysisSymbol_analysisSymbolCells", function () {
    var symbolCells = SuperMap.Plot.AnalysisSymbol.analysisSymbolCells(symbolData);
    equal(symbolCells.length, symbolData.innerCells.length, "Function:analysisSymbolCells");
});

//asyncTest("testAnalysisSymbol_analysisSymbolCells", 1, function () {
//    var service = initGetSymbolService(successed);
//    service.processAsync(basicInfo());
//    function successed() {
//        setTimeout(function () {
//            var symbolData = service.lastResult.resourceInfo;
//            var symbolCells = SuperMap.Plot.AnalysisSymbol.analysisSymbolCells(symbolData);
//            equal(symbolCells.length, symbolData.innerCells.length, "Function:analysisSymbolCells");
//            start();
//        },600);
//    }
//});

test("testAnalysisSymbol_analysisSymbolCells", function () {
    var style = SuperMap.Plot.AnalysisSymbol.getStyle(symbolData);
    if (symbolData.style.fillSymbolID === 1) {
        equal(style.fill, false, "Function:getStyle");
    } else {
        equal(style.fill, true, "Function:getStyle");
    }
    equal(style.fillGradientMode, symbolData.style.fillGradientMode, "Function:getStyle");
    equal(style.fillColor, getColorFromRGB(symbolData.style.fillForeColor), "Function:getStyle");
    equal(style.fillOpacity, (symbolData.style.fillForeColor.alpha / 255).toFixed(2), "Function:getStyle");
    equal(style.fillBackColor, getColorFromRGB(symbolData.style.fillBackColor), "Function:getStyle");
    equal(style.fillBackOpacity, (symbolData.style.fillBackColor.alpha / 255).toFixed(2), "Function:getStyle");

    equal(style.strokeColor, getColorFromRGB(symbolData.style.lineColor), "Function:getStyle");
    equal(style.strokeOpacity, (symbolData.style.lineColor.alpha / 255).toFixed(2), "Function:getStyle");
    equal(style.strokeWidth, Math.round(symbolData.style.lineWidth * 96 / 25.4), "Function:getStyle");
    if (symbolData.style.lineSymbolID !== "dot" && symbolData.style.lineSymbolID !== "dash" && symbolData.style.lineSymbolID !== "dashdot" && symbolData.style.lineSymbolID !== "longdash" && symbolData.style.lineSymbolID !== "longdashdot") {
        equal(style.strokeDashstyle, "solid", "Function:getStyle");
    } else {
        equal(style.strokeDashstyle, symbolData.style.lineSymbolID, "Function:getStyle");
    }
    if (symbolData.textStyle2D && symbolData.textStyle2D != null) {
        //适用于标号
        equal(style.fontFamily, symbolData.textStyle2D.fontName, "Function:getStyle");
        equal(style.fontColor, getColorFromRGB(symbolData.textStyle2D.foreColor), "Function:getStyle");
        equal(style.labelAlign, getAlign(symbolData.textStyle2D.align), "Function:getStyle");
        equal(style.labelXOffset, 0, "Function:getStyle");
        equal(style.labelYOffset, 0, "Function:getStyle");
    } else if (symbolData.textStyle && symbolData.textStyle != null) {
        //适用于图元
        equal(style.fontFamily, symbolData.textStyle.fontName, "Function:getStyle");
        equal(style.fontSize, symbolData.textStyle.fontSize, "Function:getStyle");
        equal(style.fontColor, getColorFromRGB(symbolData.textStyle.foreColor), "Function:getStyle");
        equal(style.labelAlign, getAlign(symbolData.textStyle.align), "Function:getStyle");
        equal(style.labelXOffset, 0, "Function:getStyle");
        equal(style.labelYOffset, 0, "Function:getStyle");
    }
    if (symbolData.surroundLineColor && symbolData.surroundLineColor !== null) {
        equal(style.surroundLineColor, getColorFromRGB(symbolData.surroundLineColor), "Function:getStyle");
        equal(style.surroundLineColorOpacity, (symbolData.surroundLineColor.alpha / 255).toFixed(2), "Function:getStyle");
    }
    if (symbolData.surroundLineWidth2D && symbolData.surroundLineWidth2D !== null) {
        equal(style.surroundLineWidth, Math.round(symbolData.surroundLineWidth2D * 96 / 25.4), "Function:getStyle");
    }
    if (symbolData.visibility && symbolData.visibility === false) {
        equal(style.display, "none", "Function:getStyle");
    } else {
        equal(style.display, "display", "Function:getStyle");
    }
});

//asyncTest("testAnalysisSymbol_getStyle", 19, function () {
//    var service = initGetSymbolService(successed);
//    service.processAsync(basicInfo());
//    function successed() {
//        setTimeout(function () {
//            var symbolData = service.lastResult.resourceInfo;
//            var style = SuperMap.Plot.AnalysisSymbol.getStyle(symbolData);
//            if (symbolData.style.fillSymbolID === 1) {
//                equal(style.fill, false, "Function:getStyle");
//            } else {
//                equal(style.fill, true, "Function:getStyle");
//            }
//            equal(style.fillGradientMode, symbolData.style.fillGradientMode, "Function:getStyle");
//            equal(style.fillColor, getColorFromRGB(symbolData.style.fillForeColor), "Function:getStyle");
//            equal(style.fillOpacity, (symbolData.style.fillForeColor.alpha / 255).toFixed(2), "Function:getStyle");
//            equal(style.fillBackColor, getColorFromRGB(symbolData.style.fillBackColor), "Function:getStyle");
//            equal(style.fillBackOpacity, (symbolData.style.fillBackColor.alpha / 255).toFixed(2), "Function:getStyle");
//
//            equal(style.strokeColor, getColorFromRGB(symbolData.style.lineColor), "Function:getStyle");
//            equal(style.strokeOpacity, (symbolData.style.lineColor.alpha / 255).toFixed(2), "Function:getStyle");
//            equal(style.strokeWidth, Math.round(symbolData.style.lineWidth * 96 / 25.4), "Function:getStyle");
//            if (symbolData.style.lineSymbolID !== "dot" && symbolData.style.lineSymbolID !== "dash" && symbolData.style.lineSymbolID !== "dashdot" && symbolData.style.lineSymbolID !== "longdash" && symbolData.style.lineSymbolID !== "longdashdot") {
//                equal(style.strokeDashstyle, "solid", "Function:getStyle");
//            } else {
//                equal(style.strokeDashstyle, symbolData.style.lineSymbolID, "Function:getStyle");
//            }
//            if (symbolData.textStyle2D && symbolData.textStyle2D != null) {
//                //适用于标号
//                equal(style.fontFamily, symbolData.textStyle2D.fontName, "Function:getStyle");
//                equal(style.fontColor, getColorFromRGB(symbolData.textStyle2D.foreColor), "Function:getStyle");
//                equal(style.labelAlign, getAlign(symbolData.textStyle2D.align), "Function:getStyle");
//                equal(style.labelXOffset, 0, "Function:getStyle");
//                equal(style.labelYOffset, 0, "Function:getStyle");
//            } else if (symbolData.textStyle && symbolData.textStyle != null) {
//                //适用于图元
//                equal(style.fontFamily, symbolData.textStyle.fontName, "Function:getStyle");
//                equal(style.fontSize, symbolData.textStyle.fontSize, "Function:getStyle");
//                equal(style.fontColor, getColorFromRGB(symbolData.textStyle.foreColor), "Function:getStyle");
//                equal(style.labelAlign, getAlign(symbolData.textStyle.align), "Function:getStyle");
//                equal(style.labelXOffset, 0, "Function:getStyle");
//                equal(style.labelYOffset, 0, "Function:getStyle");
//            }
//            if (symbolData.surroundLineColor && symbolData.surroundLineColor !== null) {
//                equal(style.surroundLineColor, getColorFromRGB(symbolData.surroundLineColor), "Function:getStyle");
//                equal(style.surroundLineColorOpacity, (symbolData.surroundLineColor.alpha / 255).toFixed(2), "Function:getStyle");
//            }
//            if (symbolData.surroundLineWidth2D && symbolData.surroundLineWidth2D !== null) {
//                equal(style.surroundLineWidth, Math.round(symbolData.surroundLineWidth2D * 96 / 25.4), "Function:getStyle");
//            }
//            if (symbolData.visibility && symbolData.visibility === false) {
//                equal(style.display, "none", "Function:getStyle");
//            } else {
//                equal(style.display, "display", "Function:getStyle");
//            }
//            start();
//        }, 800);
//    }
//});

