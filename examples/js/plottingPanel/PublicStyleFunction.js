
var group = [resources.option_symbol, resources.text_cancleLocked, resources.text_objectVisible, resources.text_commonUsePoint, resources.text_mainLine, resources.text_surroundLine, resources.text_fill, resources.text_textContent, resources.text_subSymbol];
var displayName = [resources.text_locked, resources.text_visible, resources.text_libID, resources.text_symbolCode];
var displayLineStyleName = [resources.text_line_width, resources.text_signLineColor, resources.text_symbolLineType, resources.text_signLineOpacity];
var displaySurroundLineName = [resources.text_surroundLindType, resources.text_surroundLindWidth, resources.text_surroundLindColor, resources.text_surroundLindOpacity];
var displayFillStyleName = [resources.text_fill, resources.text_fillColor, resources.text_fillOpacity, resources.text_gradiendFillMode, resources.text_fillBackColor, resources.text_fillBackOpacity, resources.text_gradientFillAngle, resources.text_gradientFillHorizenOffset, resources.text_gradientFillVerticalOffset];
var displayNameDot = [resources.text_rotateAngle, resources.text_followMapSize, resources.text_mirrorImage, resources.text_symbolRanke, resources.text_locationOffset, resources.text_offsetLineType, resources.text_sizeLocked, resources.text_symbolWidth, resources.text_symbolHeight];
var displayTextContentName = [resources.text_symbolTextContent, resources.text_textContentLocation, resources.text_textContentSize, resources.text_textContentColor, resources.text_textContentFont, resources.text_textContentDis,
    resources.text_textContentSpace, resources.text_fontSizePercent, resources.text_fontBorder, resources.text_fontBorderColor, resources.text_fontBorderWidth,
    resources.text_fontBack, resources.text_fontBackColor, resources.text_fontShadow, resources.text_fontShadowColor, resources.text_shadowOffsetX, resources.text_shadowOffsetY];
var groupNew = [resources.text_groupType, resources.text_arrowType, resources.text_alongLineType, resources.text_borderAttributr, resources.text_radius, resources.text_orbitSet, resources.text_nodeSet, resources.text_associatedLineType, resources.text_foldLineSet];
var displayNameNew = [resources.text_arrowHead, resources.text_arrowBody, resources.text_arrowTail,
    resources.text_start, resources.text_end,
    resources.text_pathLine, resources.text_bezierCurves, resources.text_showArrow, resources.text_avoidance,
    resources.text_textBoxBorder, resources.text_radiusBox, resources.text_objectTextBox,
    resources.text_radiusType, resources.text_radiusAngle, resources.text_textContent1, resources.text_textContent2,
    resources.text_satelliteOrbit,
    resources.text_nodeType, resources.text_nodeRotateAngle,
    resources.text_objectLines,
    resources.text_showFoldLine,
    resources.text_textAlignType];
function collectionPropertyGridRows(featuresParameter) {
    var features = [];
    var styles = [];
    for (var i = 0; i < featuresParameter.length; i++) {
        styles.push(featuresParameter[i].style);
        if (featuresParameter[i].geometry === undefined) {
            features.push(featuresParameter[i]);
        } else {
            features.push(featuresParameter[i].geometry);
        }
    }
    var rows = [];
    if (features.length === 0) {
        return rows = [];
    }
    var dotSelectFeatures = [];
    var algoSelectFeatures = [];
    var sameFeatures = [];
    var otherFeatures = [];
    var selectfeatures = [];
    for (var i = 0; i < features.length; i++) {
        if (features[i].libID === features[0].libID && features[i].code === features[0].code) {
            sameFeatures.push(features[i]);//是否是同一个标号
        }
    }
    if (sameFeatures.length !== features.length) {
        for (var i = 0; i < features.length; i++) {
            if (features[i].symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL) {
                dotSelectFeatures.push(features[i]);//是否全是不同点标号
            } else if (features[i].symbolType === SuperMap.Plot.SymbolType.ALGOSYMBOL) {
                algoSelectFeatures.push(features[i]); //是否全是不同线面标号
            } else {
                otherFeatures.push(features[i]);
            }
        }
    }
    if (sameFeatures.length === features.length) {
        selectfeatures = features;
    } else if (dotSelectFeatures.length === features.length) {
        selectfeatures = dotSelectFeatures;
    } else if (algoSelectFeatures.length === features.length) {
        selectfeatures = algoSelectFeatures;
    } else if (dotSelectFeatures.length > 0 && algoSelectFeatures.length > 0 && otherFeatures.length === 0) {
        selectfeatures = features;
    } else if (otherFeatures.length > 0) {
        selectfeatures = features;
    }
    var selectfeature = selectfeatures[0];
    var styleObject = styles[0];

    if (selectfeatures.length === sameFeatures.length) {
        rows = [
            { "name": resources.text_symbolGeometryID, "value": selectfeature.symbolType, "group": group[0] },
            { "name": resources.text_symbolLibID, "value": selectfeature.libID, "group": group[0] },
            { "name": resources.text_symbolCode2, "value": selectfeature.code, "group": group[0] },
            { "name": resources.text_symbolName, "value": selectfeature.symbolName, "group": group[0] }
        ];
        if(selectfeature.libID === 100&&(selectfeature.code === 23902||selectfeature.code === 21600)){
            rows.push({"name":"内容","value":selectfeature.textContent,"group": group[0],"editor":"text"});
        }
    }

    //标号锁定
    var lockedObj = new Object();
    lockedObj.group = group[1];
    lockedObj.name = displayName[0];
    lockedObj.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
    lockedObj.value = checkboxValueToString(selectfeature.getLocked());
    //标号可见性
    var visibilityObj = new Object();
    visibilityObj.group = group[2];
    visibilityObj.name = displayName[1];
    visibilityObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getDisplayRows() } };
    //visibilityObj.value = displayToString(selectfeature.style.display);
    visibilityObj.value = displayToString(styleObject.display);
    rows.push(lockedObj);
    if (selectfeature.getLocked()) {
        return rows;
    }
    rows.push(visibilityObj);
    if (selectfeatures.length === sameFeatures.length || selectfeatures.length === dotSelectFeatures.length || selectfeatures.length === algoSelectFeatures.length) {
        rows = rows.concat(symbolPropertyObject(selectfeature, styleObject));
    }
    if(selectfeature.symbolType == 20||selectfeature.symbolType == 21){
        rows = rows.concat(picturePropertyObject(selectfeature));
    }
    //addExtendProperty(rows,selectfeature);
    return rows;

}

function checkboxValueToString(checkboxValue) {
    if (checkboxValue === true) {
        return "true";
    } else if (checkboxValue === false) {
        return "false";
    }
}
function fromCheckboxValue(checkboxStr) {
    if (checkboxStr === "true") {
        return true;
    } else if (checkboxStr === "false") {
        return false;
    }
}
/***
 * 对象可见性
 */
function getDisplayRows() {
    var rows = [];
    rows.push({ "value": "display", "text": resources.text_show });
    rows.push({ "value": "none", "text": resources.text_inVisible });
    return rows;
}
function displayToString(display) {
    if (display && display === "none") {
        return resources.text_inVisible;
    }
    return resources.text_show;
}
/**
 * 8C使用线型
 */
function get8CLineStyleRows() {
    var rows = [];
    rows.push({ "value": "solid", "text": "solid" });
    rows.push({ "value": "dot", "text": "dot" });
    rows.push({ "value": "dash", "text": "dash" });
    rows.push({ "value": "dashdot", "text": "dashdot" });
    rows.push({ "value": "longdash", "text": "longdash" });
    rows.push({ "value": "longdashdot", "text": "longdashdot" });
    return rows;
}
/**
 * 9D使用线型
 */
function lineStyleToString(lineStyle) {
    if (lineStyle == 1)
        return resources.text_longDashLine;
    else if (lineStyle == 2)
        return resources.text_lineByPoint;
    else if (lineStyle == 3)
        return resources.text_lineByLineSegment;
    else if (lineStyle == 4)
        return resources.text_lineByPointSegment;
    else if (lineStyle == 5)
        return resources.text_twoSegDashline;
    else if (lineStyle == 6)
        return resources.text_threeSegDashline;
    else if (lineStyle == 7)
        return resources.text_fourSegDashline;
    else if (lineStyle == 8)
        return resources.text_fiveSegDashline;
    else if (lineStyle == 888)
        return resources.text_NULL;
    else if (lineStyle == 999)
        return resources.text_selfDefinedDashline;
    else if (lineStyle == 0)
        return resources.text_solidLine;
    else if (lineStyle)
        return resources.text_solidLine;
}
function getLineStyleRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_solidLine });//实线(solid)
    rows.push({ "value": "1", "text": resources.text_longDashLine });//长虚线(longdash) //虚线(dash)
    rows.push({ "value": "2", "text": resources.text_lineByPoint });//由点构成的直线(dot)
    rows.push({ "value": "3", "text": resources.text_lineByLineSegment });//由线划线段组成的直线(dashdot)(longdashdot)
    rows.push({ "value": "4", "text": resources.text_lineByPointSegment });//由重复的划线点图案构成的直线
    rows.push({ "value": "888", "text": resources.text_NULL });
    rows.push({ "value": "5", "text": resources.text_twoSegDashline });
    rows.push({ "value": "6", "text": resources.text_threeSegDashline });
    rows.push({ "value": "7", "text": resources.text_fourSegDashline });
    rows.push({ "value": "8", "text": resources.text_fiveSegDashline });
    // rows.push({ "value": "999", "text": resources.text_selfDefinedDashline });
    return rows;
}

function getDotLineStyleRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_solidLine });//实线(solid)
    rows.push({ "value": "1", "text": resources.text_longDashLine });//长虚线(longdash) //虚线(dash)
    rows.push({ "value": "2", "text": resources.text_lineByPoint });//由点构成的直线(dot)
    rows.push({ "value": "3", "text": resources.text_lineByLineSegment });//由线划线段组成的直线(dashdot)(longdashdot)
    rows.push({ "value": "4", "text": resources.text_lineByPointSegment });//由重复的划线点图案构成的直线
    return rows;
}
/**
 *注记位置
 */
function getAnnotationRows(geometry) {
    var annotations = [];
    annotations.push({ "value": "0", "text": resources.text_leftTop });
    annotations.push({ "value": "1", "text": resources.text_leftBottom });
    annotations.push({ "value": "2", "text": resources.text_rightTop });
    annotations.push({ "value": "3", "text": resources.text_rightBottom });
    annotations.push({ "value": "4", "text": resources.text_top });
    annotations.push({ "value": "5", "text": resources.text_bottom });
    annotations.push({ "value": "6", "text": resources.text_left });
    annotations.push({ "value": "7", "text": resources.text_right });
    if (geometry.symbolData && geometry.symbolData.middleMarkExist)
        annotations.push({ "value": "8", "text": resources.text_middlePosition });
    return annotations;
}
function annotationToString(annotation) {
    if (annotation === 0)
        return resources.text_leftTop;
    else if (annotation === 1)
        return resources.text_leftBottom;
    else if (annotation === 2)
        return resources.text_rightTop;
    else if (annotation === 3)
        return resources.text_rightBottom;
    else if (annotation === 4)
        return resources.text_top;
    else if (annotation === 5)
        return resources.text_bottom;
    else if (annotation === 6)
        return resources.text_left;
    else if (annotation === 7)
        return resources.text_right;
    else if (annotation === 8)
        return resources.text_middlePosition;
}
/**
 * 标号级别
 */
function symbolRankToString(symbolRank) {
    if (symbolRank == 0)
        return resources.text_noRank;
    else if (symbolRank == 1)
        return resources.text_JQRank;
    else if (symbolRank == 2)
        return resources.text_FJQRank;
    else if (symbolRank == 3)
        return resources.text_JTJRank;
    else if (symbolRank == 4)
        return resources.text_SRank;
    else if (symbolRank == 5)
        return resources.text_LRank;
    else if (symbolRank == 6)
        return resources.text_TRank;
    else if (symbolRank == 7)
        return resources.text_YRank;
    else if (symbolRank == 8)
        return resources.text_LianRank;
    else if (symbolRank == 9)
        return resources.text_PRank;
}
function getSymbolRankRows(geometry) {
    var symbolRanks = [];
    if (geometry.symbolData && geometry.symbolData.symbolRanks) {
        symbolRanks = geometry.symbolData.symbolRanks;
    }
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_noRank });
    for (var i = 0; i < symbolRanks.length; i++) {
        if (symbolRanks[i] == 1)
            rows.push({ "value": "1", "text": resources.text_JQRank });
        else if (symbolRanks[i] == 2)
            rows.push({ "value": "2", "text": resources.text_FJQRank });
        else if (symbolRanks[i] == 3)
            rows.push({ "value": "3", "text": resources.text_JTJRank });
        else if (symbolRanks[i] == 4)
            rows.push({ "value": "4", "text": resources.text_SRank });
        else if (symbolRanks[i] == 5)
            rows.push({ "value": "5", "text": resources.text_LRank });
        else if (symbolRanks[i] == 6)
            rows.push({ "value": "6", "text": resources.text_TRank });
        else if (symbolRanks[i] == 7)
            rows.push({ "value": "7", "text": resources.text_YRank });
        else if (symbolRanks[i] == 8)
            rows.push({ "value": "8", "text": resources.text_LianRank });
        else if (symbolRanks[i] == 9)
            rows.push({ "value": "9", "text": resources.text_PRank });
    }
    return rows;
}
/**
 * 衬线
 */
function surroundLineTypeToString(symbolType, surroundLineType) {
    if (symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL) {
        if (surroundLineType === 0)
            return resources.text_noSurroundLine;
        else if (surroundLineType === 1)
            return resources.text_haveSurroundLine;
    } else {
        if (surroundLineType === 0)
            return resources.text_noSurroundLine;
        else if (surroundLineType === 1)
            return resources.text_innerSurroundLine;
        else if (surroundLineType === 2)
            return resources.text_outerSurroundLine;
        else if (surroundLineType === 3)
            return resources.text_bothSurroundLine;
    }
}
function getSurroundLineTypeRows(symbolType) {
    var rows = [];
    if (symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL) {
        rows.push({ "value": "0", "text": resources.text_noSurroundLine });
        rows.push({ "value": "1", "text": resources.text_haveSurroundLine });
    } else {
        rows.push({ "value": "0", "text": resources.text_noSurroundLine });
        rows.push({ "value": "1", "text": resources.text_innerSurroundLine });
        rows.push({ "value": "2", "text": resources.text_outerSurroundLine });
        rows.push({ "value": "3", "text": resources.text_bothSurroundLine });
    }
    return rows;
}
/**
 * 填充
 */
function fillGradientModeToString(fillGradientMode) {
    if (fillGradientMode === "NONE") {
        return resources.text_noGradient;
    } else if (fillGradientMode === "LINEAR") {
        return resources.text_lineGradient;
    } else if (fillGradientMode === "RADIAL") {
        return resources.text_radialGradient;
    } else {
        return text_noGradient;
    }
}
function getFillGradientModeRows() {
    var rows = [];
    rows.push({ "value": "NONE", "text": resources.text_noGradient });
    rows.push({ "value": "LINEAR", "text": resources.text_lineGradient });
    rows.push({ "value": "RADIAL", "text": resources.text_radialGradient });
    return rows;
}
function fillToString(fillSymbolID, selectfeature) {
    if (fillSymbolID === 0) {
        return resources.text_solidFill;
    } else if (fillSymbolID === 1) {
        return resources.text_noFill;
    }
    if (selectfeature.symbolType !== SuperMap.Plot.SymbolType.SYMBOLTEXT) {
        if (fillSymbolID === 2) {
            return resources.text_slashFill;
        } else if (fillSymbolID === 3) {
            return resources.text_crossPatternFill;
        } else if (fillSymbolID === 4) {
            return resources.text_crossFill;
        } else if (fillSymbolID === 5) {
            return resources.text_backslashFill;
        } else if (fillSymbolID === 6) {
            return resources.text_horizonfill;
        } else if (fillSymbolID === 7) {
            return resources.text_verticalFill;
        }

    }

}
function getFillRows(selectfeature) {
    var rows = [];
    rows.push({ "value": 0, "text": resources.text_solidFill });
    rows.push({ "value": 1, "text": resources.text_noFill });
    if (selectfeature.symbolType !== SuperMap.Plot.SymbolType.SYMBOLTEXT) {
        rows.push({ "value": 2, "text": resources.text_slashFill });
        rows.push({ "value": 3, "text": resources.text_crossPatternFill });
        rows.push({ "value": 4, "text": resources.text_crossFill });
        rows.push({ "value": 5, "text": resources.text_backslashFill });
        rows.push({ "value": 6, "text": resources.text_horizonfill });
        rows.push({ "value": 7, "text": resources.text_verticalFill });
    }
    return rows;
}
/**
 * 偏移线类型
 */
function positionOffsetTypeToString(positionOffsetType) {
    if (positionOffsetType === 0) {
        return resources.text_straightLine;
    } else if (positionOffsetType === 1) {
        return resources.text_lineWithThickGradient;
    }
}
function getPositionOffsetTypeRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_straightLine });
    rows.push({ "value": "1", "text": resources.text_lineWithThickGradient });
    return rows;
}
/**
 * 沿线注记
 */
function getShowRows() {
    var rows = [];
    rows.push({ "value": "true", "text": resources.text_show });
    rows.push({ "value": "false", "text": resources.text_inVisible });
    return rows;
}
function showToString(show) {
    if (show === true) {
        return resources.text_show;
    } else if (show === false) {
        return resources.text_inVisible;
    }
}
function relLineTextToString(relLineText) {
    if (relLineText === SuperMap.Plot.RelLineText.ONLINE)
        return resources.text_underLine;
    else if (relLineText === SuperMap.Plot.RelLineText.ONLEFTLINE)
        return resources.text_lineLeft;
    else if (relLineText === SuperMap.Plot.RelLineText.ONRIGHTLINE)
        return resources.text_lineRight;
    else if (relLineText === SuperMap.Plot.RelLineText.ONBOTHLINE)
        return resources.text_lineBilateral;
}
function getRelLineTextRows() {
    var annotations = [];
    annotations.push({ "value": "0", "text": resources.text_underLine });
    annotations.push({ "value": "1", "text": resources.text_lineLeft });
    annotations.push({ "value": "2", "text": resources.text_lineRight });
    annotations.push({ "value": "3", "text": resources.text_lineBilateral });
    return annotations;
}
/***
 * 对象间连线
 */
function lineRelationTypeToString(lineRelationType) {
    if (lineRelationType == 0)
        return resources.text_solidStraightLine;
    else if (lineRelationType == 1)
        return resources.text_dashStraightLine;
    else if (lineRelationType == 2)
        return resources.text_arrowLine;
}
function getLineRelationTypeRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_solidStraightLine });
    rows.push({ "value": "1", "text": resources.text_dashStraightLine });
    rows.push({ "value": "2", "text": resources.text_arrowLine });
    return rows;
}
/**
 * 航线节点类型
 */
function routeNodeTypeToString(routeNodeType) {
    if (routeNodeType === SuperMap.Plot.RouteNodeType.AIMING)
        return resources.option_aimPoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.COMMONROUTE)
        return resources.text_ordinaryRoutesPoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.EXPANDING)
        return resources.text_unfoldPoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.INITIAL)
        return resources.text_initialPoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.LANCH)
        return resources.text_launch;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.RENDEZVOUS)
        return resources.text_convergePoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.STANDBY)
        return resources.text_standbyPoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.SUPPLY)
        return resources.text_supplyPoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.TAKEOFF)
        return resources.text_takeoffPoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.TURNING)
        return resources.text_turnPoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.VISUALINITAL)
        return resources.text_visibleInitialPoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.VOLLEY)
        return resources.text_salvoPoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.WEAPONLAUNCH)
        return resources.text_weaponLaunchPoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.TARGET)
        return resources.text_targetPoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.ATTACK)
        return resources.text_attackPoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.SUPPRESS)
        return resources.text_suppressPoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.EIGHTSPIRAL)
        return resources.text_circledWithFigureofEightPoint;
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.HAPPYVALLEY)
        return resources.text_horseRingPoint;
}
function getRouteNodeTypeRows() {
    var rows = [];
    rows.push({ "value": "AIMING", "text": resources.option_aimPoint });
    rows.push({ "value": "COMMONROUTE", "text": resources.text_ordinaryRoutesPoint });
    rows.push({ "value": "EXPANDING", "text": resources.text_unfoldPoint });
    rows.push({ "value": "INITIAL", "text": resources.text_initialPoint });
    rows.push({ "value": "LANCH", "text": resources.text_launch });
    rows.push({ "value": "RENDEZVOUS", "text": resources.text_convergePoint });
    rows.push({ "value": "STANDBY", "text": resources.text_standbyPoint });
    rows.push({ "value": "SUPPLY", "text": resources.text_supplyPoint });
    rows.push({ "value": "TAKEOFF", "text": resources.text_takeoffPoint });
    rows.push({ "value": "TURNING", "text": resources.text_turnPoint });
    rows.push({ "value": "VISUALINITAL", "text": resources.text_visibleInitialPoint });
    rows.push({ "value": "VOLLEY", "text": resources.text_salvoPoint });
    rows.push({ "value": "WEAPONLAUNCH", "text": resources.text_weaponLaunchPoint });
    rows.push({ "value": "TARGET", "text": resources.text_targetPoint });
    rows.push({ "value": "ATTACK", "text": resources.text_attackPoint });
    rows.push({ "value": "SUPPRESS", "text": resources.text_suppressPoint });
    rows.push({ "value": "EIGHTSPIRAL", "text": resources.text_circledWithFigureofEightPoint });
    rows.push({ "value": "HAPPYVALLEY", "text": resources.text_horseRingPoint });
    return rows;
}
/**
 *箭头线
 */
function arrowTypeToString(arrowType) {
    if (arrowType == 0)
        return resources.text_doubleLineArrow;
    else if (arrowType == 1)
        return resources.text_solidTriangle;
    else if (arrowType == 2)
        return resources.text_noArrow;
}
function getArrowTypeRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_doubleLineArrow });
    rows.push({ "value": "1", "text": resources.text_solidTriangle });
    rows.push({ "value": "2", "text": resources.text_noArrow });
    return rows;
}
/**
 * 扇形区域
 */
function radiusTypeToString(radiusType) {
    if (radiusType == 0)
        return resources.text_inVisible;
    else if (radiusType == 1)
        return resources.text_straightLine;
    else if (radiusType == 2)
        return resources.text_arrowLine;
}
function getRadiusTypeRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_inVisible });
    rows.push({ "value": "1", "text": resources.text_straightLine });
    rows.push({ "value": "2", "text": resources.text_arrowLine });
    return rows;
}
/**
 * 标注框
 */
function textBoxTypeToString(textBoxType) {
    if (textBoxType == 0)
        return resources.text_rectBorderWithAngle;
    else if (textBoxType == 1)
        return resources.text_rectBorder;
    else if (textBoxType == 3)
        return resources.text_noBorder;
}
function getTextBoxTypeRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_rectBorderWithAngle });
    rows.push({ "value": "1", "text": resources.text_rectBorder });
    rows.push({ "value": "3", "text": resources.text_noBorder });
    return rows;
}
/**
 * 线型标注框
 */
function lineMarkingTypeToString(lineMarkingType) {
    if (lineMarkingType === 1) {
        return resources.text_rectBorder;
    } else if (lineMarkingType === 2) {
        return resources.text_linerHemline;
    }
}
function getLineMarkingTypeRows() {
    var rows = [];
    rows.push({ "value": "1", "text": resources.text_rectBorder });
    rows.push({ "value": "2", "text": resources.text_linerHemline });
    return rows;
}
/**
 * 复合箭头
 * 箭头、箭身、箭尾
 */
function getArrowHeadTypeRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_doubleLineArrow });
    rows.push({ "value": "2", "text": resources.text_dovetailArroe });
    rows.push({ "value": "3", "text": resources.text_solidTriangle });
    rows.push({ "value": "6", "text": resources.text_newDovetailArroe });
    rows.push({ "value": "-1", "text": resources.text_noArrow });
    return rows;
}
function arrowHeadTypeToString(arrowHeadType) {
    if (arrowHeadType == 0)
        return resources.text_doubleLineArrow;
    else if (arrowHeadType == 2)
        return resources.text_dovetailArroe;
    else if (arrowHeadType == 3)
        return resources.text_solidTriangle;
    else if (arrowHeadType == 6)
        return resources.text_newDovetailArroe;
    else if (arrowHeadType == -1)
        return resources.text_noArrow;
}
function arrowBodyTypeToString(arrowBodyType) {
    if (arrowBodyType == 0)
        return resources.text_foldLine;
    else if (arrowBodyType == 1)
        return resources.text_bezierCurves;
    else if (arrowBodyType == 5)
        return resources.text_addArrowBody;

}
function getArrowBodyTypeRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_foldLine });
    rows.push({ "value": "1", "text": resources.text_bezierCurves });
    rows.push({ "value": "5", "text": resources.text_addArrowBody });
    return rows;
}
function arrowTailTypeToString(arrowTailType) {
    if (arrowTailType == 0)
        return resources.text_noArrowTail;
    else if (arrowTailType == 1)
        return resources.text_linearArrowTail;
    else if (arrowTailType == 3)
        return resources.text_dovetailArrowTail;
}
function getArrowTailTypeRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_noArrowTail });
    rows.push({ "value": "1", "text": resources.text_linearArrowTail });
    rows.push({ "value": "3", "text": resources.text_dovetailArrowTail });
    return rows;
}
/**
 * 线面标号子标号
 */
// function libIDToString(libID) {
//     if (libID == 421)
//         return resources.text_policeLib;
//     else if (libID == 100)
//         return resources.text_militaryLib;
//     else if (libID == 123)
//         return resources.text_armedPoliceLib;
//     else if (libID == 900)
//         return resources.text_airDefenseLib;

// }

function subAlgoRankTypeString(subSymbolsLength, geometry) {
    if (subSymbolsLength === 0) {
        return "";
    } else {
        if (geometry.libID === 100) {
            if (geometry.getSubSymbols()[0].code === 3200) {
                return resources.text_JTJRank;
            } else if (geometry.getSubSymbols()[0].code === 3201) {
                return resources.text_FJQRank;
            } else if (geometry.getSubSymbols()[0].code === 3202) {
                return resources.text_JQRank;
            } else if (geometry.getSubSymbols()[0].code === 3302) {
                return resources.text_SRank;
            } else if (geometry.getSubSymbols()[0].code === 3301) {
                return resources.text_LRank;
            } else if (geometry.getSubSymbols()[0].code === 3300) {
                return resources.text_TRank;
            } else if (geometry.getSubSymbols()[0].code === 3402) {
                return resources.text_YRank;
            } else if (geometry.getSubSymbols()[0].code === 3401) {
                return resources.text_LianRank;
            } else if (geometry.getSubSymbols()[0].code === 3400) {
                return resources.text_PRank;
            }
        }
    }
}

function subSymbolsTypeString(subSymbolsLength, geometry,index) {
    if(subSymbolsLength<index+1){
        return "";
    }
    if (subSymbolsLength === 0) {
        return "";
    } else {
        if (geometry.libID === 100) {
            if (geometry.getSubSymbols()[index].code === 100) {
                return resources.text_army;
            } else if (geometry.getSubSymbols()[index].code === 200) {
                return resources.text_navy2;
            } else if (geometry.getSubSymbols()[index].code === 300) {
                return resources.text_airForce;
            }
        } else if (geometry.libID === 123) {
            if (geometry.getSubSymbols()[index].code === 10101) {
                return resources.text_armedPoliceForce;
            } else if (geometry.getSubSymbols()[index].code === 10102) {
                return resources.text_explosionProofArmor;
            } else if (geometry.getSubSymbols()[index].code === 10103) {
                return resources.text_artillery;
            }
        } else if (geometry.libID === 900) {
            if (geometry.getSubSymbols()[index].code === 910200) {
                return resources.text_civilAirDefenseCity;
            } else if (geometry.getSubSymbols()[index].code === 910300) {
                return resources.text_basicCommandPostofCivilAirDefense;
            } else if (geometry.getSubSymbols()[index].code === 910402) {
                return resources.text_waterwayRepairProfessionalTeam;
            }
        } else if (geometry.libID === 0) {
            if (geometry.getSubSymbols()[index].code === 9) {
                return resources.text_police;
            } else if (geometry.getSubSymbols()[index].code === 80103) {
                return resources.text_trafficPolice;
            } else if (geometry.getSubSymbols()[index].code === 80109) {
                return resources.text_professionalPolice;
            }
        }
    }
}

function getAlgoRankTypeRows(geometry) {
    var rows = [];
    rows.push({ "value": "0", "text": "" });
    if (geometry.libID === 100) {
        rows.push({ "value": "0", "text": resources.text_noRank });
        rows.push({ "value": "3200", "text": resources.text_JTJRank });
        rows.push({ "value": "3201", "text": resources.text_FJQRank });
        rows.push({ "value": "3202", "text": resources.text_JQRank });
        rows.push({ "value": "3302", "text": resources.text_SRank });
        rows.push({ "value": "3301", "text": resources.text_LRank });
        rows.push({ "value": "3300", "text": resources.text_TRank });
        rows.push({ "value": "3402", "text": resources.text_YRank });
        rows.push({ "value": "3401", "text": resources.text_LianRank });
        rows.push({ "value": "3400", "text": resources.text_PRank });
    }
    return rows;
}

function getSubSymbolsTypeRows(geometry) {
    var rows = [];
    rows.push({ "value": "0", "text": "" });
    if (geometry.libID === 100) {
        rows.push({ "value": "100", "text": resources.text_army });
        rows.push({ "value": "200", "text": resources.text_navy2 });
        rows.push({ "value": "300", "text": resources.text_airForce });
    } else if (geometry.libID === 123) {
        rows.push({ "value": "10101", "text": resources.text_armedPoliceForce });
        rows.push({ "value": "10102", "text": resources.text_explosionProofArmor });
        rows.push({ "value": "10103", "text": resources.text_artillery });
    } else if (geometry.libID === 900) {
        rows.push({ "value": "910200", "text": resources.text_civilAirDefenseCity });
        rows.push({ "value": "910300", "text": resources.text_basicCommandPostofCivilAirDefense });
        rows.push({ "value": "910402", "text": resources.text_waterwayRepairProfessionalTeam });
    } else if (geometry.libID === 0) {
        rows.push({ "value": "9", "text": resources.text_police });
        rows.push({ "value": "80103", "text": resources.text_trafficPolice });
        rows.push({ "value": "80109", "text": resources.text_professionalPolice });
    }
    return rows;
}
/**
 * 文字对齐
 * 注记指示框、标注框、多角标注框、线型标注框
 */
function fontAlignTypeToString(alignType) {
    if (alignType === 'lm')
        return resources.text_alignLeft;
    else if (alignType === 'rm')
        return resources.text_alignRight;
    else if (alignType === 'cm')
        return resources.text_alignMiddle;
    else if (alignType === 'lt')
        return resources.text_alignLeftTop;
    else if (alignType === 'lb')
        return resources.text_alignLeftBottom;
    else if (alignType === 'rt')
        return resources.text_alignRightTop;
    else if (alignType === 'rb')
        return resources.text_alignRightBottom;
}
function getFontAlignTypeRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_alignLeft });
    rows.push({ "value": "1", "text": resources.text_alignRight });
    rows.push({ "value": "2", "text": resources.text_alignMiddle });
    rows.push({ "value": "3", "text": resources.text_alignLeftTop });
    rows.push({ "value": "4", "text": resources.text_alignLeftBottom });
    rows.push({ "value": "5", "text": resources.text_alignRightTop });
    rows.push({ "value": "6", "text": resources.text_alignRightBottom });
    return rows;
}
function fontAlignTypeValue(value) {
    if (value === '0') {
        return 'lm';
    } else if (value === '1') {
        return 'rm';
    } else if (value === '2') {
        return 'cm';
    } else if (value === '3') {
        return 'lt';
    } else if (value === '4') {
        return 'lb';
    } else if (value === '5') {
        return 'rt';
    } else if (value === '6') {
        return 'rb';
    }
}


//判断标号类型分类
function checkSymbolType(selectfeature) {
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.GROUPOBJECT ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.FLAGGROUP ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.AIRROUTE ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.NAVYROUTE ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.MISSILEROUTE ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.ROUTENODE ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.LITERATESIGN ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.SATELLITE ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.SATELLITETIMEWINDOWS ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.NAVYDEPLOYMENT ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.AIRDEPLOYMENT ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT1 ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.TEXTSYMBOL
    ) {
        return false;
    } else {
        return true;
    }
}

function isCanAddText(selectfeature) {
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.POLYLINESYMBOL ||//直线
        selectfeature.symbolType === SuperMap.Plot.SymbolType.PARALLELOGRAM ||//平行四边形
        selectfeature.symbolType === SuperMap.Plot.SymbolType.CIRCLESYMBOL ||//圆
        selectfeature.symbolType === SuperMap.Plot.SymbolType.ELLIPSESYMBOL ||//椭圆
        selectfeature.symbolType === SuperMap.Plot.SymbolType.REGULARPOLYGON ||//正多边形
        selectfeature.symbolType === SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL ||//任意多边形
        selectfeature.symbolType === SuperMap.Plot.SymbolType.POLYBEZIERSYMBOL ||//贝塞尔曲线
        selectfeature.symbolType === SuperMap.Plot.SymbolType.POLYBEZIERCLOSESYMBOL ||//闭合贝塞尔曲线
        selectfeature.symbolType === SuperMap.Plot.SymbolType.KIDNEY ||//集结地
        selectfeature.symbolType === SuperMap.Plot.SymbolType.BRACESYMBOL ||//大括号
        selectfeature.symbolType === SuperMap.Plot.SymbolType.TRAPEZOIDSYMBOL ||//梯形
        selectfeature.symbolType === SuperMap.Plot.SymbolType.RECTANGLESYMBOL ||//矩形
        selectfeature.symbolType === SuperMap.Plot.SymbolType.CHORDSYMBOL ||//弓形
        selectfeature.symbolType === SuperMap.Plot.SymbolType.PIESYMBOL ||//扇形
        selectfeature.symbolType === SuperMap.Plot.SymbolType.ARCSYMBOL ||//弧线
        selectfeature.symbolType === SuperMap.Plot.SymbolType.PARALLELLINE ||//平行线
        selectfeature.symbolType === SuperMap.Plot.SymbolType.ANNOFRAMESYMBOL ||//注记指示框
        selectfeature.symbolType === SuperMap.Plot.SymbolType.CONCENTRICCIRCLE ||//同心圆
        selectfeature.symbolType === SuperMap.Plot.SymbolType.COMBINATIONALCIRCLE ||//组合圆
        selectfeature.symbolType === SuperMap.Plot.SymbolType.ANNOFRAMESYMBOLM ||//多角标注框
        selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXTBOX ||//标注框
        selectfeature.symbolType === SuperMap.Plot.SymbolType.FREECURVE ||//自由曲线
        selectfeature.symbolType === SuperMap.Plot.SymbolType.NODECHAIN ||//节点链
        selectfeature.symbolType === SuperMap.Plot.SymbolType.RUNWAY ||//跑道形
        selectfeature.symbolType === SuperMap.Plot.SymbolType.CURVEEIGHT ||//8字形
        selectfeature.symbolType === SuperMap.Plot.SymbolType.ARROWLINE ||//箭头线
        selectfeature.symbolType === SuperMap.Plot.SymbolType.PATHTEXT ||//沿线注记
        selectfeature.symbolType === SuperMap.Plot.SymbolType.POLYGONREGION ||//多边形区域
        selectfeature.symbolType === SuperMap.Plot.SymbolType.ARCREGION ||//扇形区域
        selectfeature.symbolType === SuperMap.Plot.SymbolType.LINEMARKING //线型标注
    ) {
        return true;
    }
}



function symbolPropertyObject(selectfeature, styleObject) {

    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.CLUSTEROBJECT||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.PICTURE||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.MODELPLOT) {
        return [];
    }

    //线形：线宽
    var lineWidthObj = new Object();
    lineWidthObj.group = group[4];
    lineWidthObj.name = displayLineStyleName[0];
    lineWidthObj.editor = "text";
    if (styleObject.weight !== undefined) {
        lineWidthObj.value = styleObject.weight;
    } else {
        if (selectfeature.symbolType === SuperMap.Plot.SymbolType.GROUPOBJECT) {
            lineWidthObj.value = selectfeature.getStrokeWidth();
        } else {
            lineWidthObj.value = styleObject.strokeWidth;
        }
    }





    //线形：线色
    var lineColorObj = new Object();
    lineColorObj.group = group[4];
    lineColorObj.name = displayLineStyleName[1];
    lineColorObj.editor = "colorpicker";
    if (styleObject.color !== undefined) {
        lineColorObj.value = styleObject.color;
    } else {
        if (selectfeature.symbolType === SuperMap.Plot.SymbolType.GROUPOBJECT) {
            lineColorObj.value = selectfeature.getStrokeColor();
        } else {
            lineColorObj.value = styleObject.strokeColor;
        }
    }

    //线形：线型
    var lineStyleObj = new Object();
    lineStyleObj.group = group[4];
    lineStyleObj.name = displayLineStyleName[2];
    if (styleObject.lineSymbolID !== undefined) {
        if(selectfeature.symbolType === 1){
            lineStyleObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getDotLineStyleRows() } };
        }else{
            lineStyleObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getLineStyleRows() } };
        }
        
        lineStyleObj.value = lineStyleToString(styleObject.lineSymbolID);
    } else {
        lineStyleObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": get8CLineStyleRows() } };
        lineStyleObj.value = styleObject.strokeDashstyle;
    }


    //线形：线透明度
    var lineOpaqueRateObj = new Object();
    lineOpaqueRateObj.group = group[4];
    lineOpaqueRateObj.name = displayLineStyleName[3];
    lineOpaqueRateObj.editor = "text";
    if (styleObject.opacity !== undefined) {
        lineOpaqueRateObj.value = styleObject.opacity;
    } else {
        lineOpaqueRateObj.value = styleObject.strokeOpacity;
    }


    //衬线：衬线类型
    var surroundLineTypeObj = new Object();
    surroundLineTypeObj.group = group[5];
    surroundLineTypeObj.name = displaySurroundLineName[0];
    surroundLineTypeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getSurroundLineTypeRows(selectfeature.symbolType) } };
    if (checkSymbolType(selectfeature) === true) {
        surroundLineTypeObj.value = surroundLineTypeToString(selectfeature.symbolType, selectfeature.getSurroundLineType());
    }

    //衬线：衬线宽
    var surroundLineWidthObj = new Object();
    surroundLineWidthObj.group = group[5];
    surroundLineWidthObj.name = displaySurroundLineName[1];
    surroundLineWidthObj.editor = "text";
    surroundLineWidthObj.value = styleObject.surroundLineWidth;

    //衬线：衬线色
    var surroundLineColorObj = new Object();
    surroundLineColorObj.group = group[5];
    surroundLineColorObj.name = displaySurroundLineName[2];
    surroundLineColorObj.editor = "colorpicker";
    surroundLineColorObj.value = styleObject.surroundLineColor;

    //衬线：衬线透明度
    var surroundLineColorOpaObj = new Object();
    surroundLineColorOpaObj.group = group[5];
    surroundLineColorOpaObj.name = displaySurroundLineName[3];
    surroundLineColorOpaObj.editor = "text";
    surroundLineColorOpaObj.value = styleObject.surroundLineColorOpacity;

    //填充：填充
    var fillObj = new Object();
    fillObj.group = group[6];
    fillObj.name = displayFillStyleName[0];
    fillObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFillRows(selectfeature) } };
    fillObj.value = fillToString(parseFloat(styleObject.fillSymbolID), selectfeature);

    //填充：填充色
    var fillforeColorObj = new Object();
    fillforeColorObj.group = group[6];
    fillforeColorObj.name = displayFillStyleName[1];
    fillforeColorObj.editor = "colorpicker";
    fillforeColorObj.value = styleObject.fillColor;

    //填充：填充透明度
    var fillOpaqueRateObj = new Object();
    fillOpaqueRateObj.group = group[6];
    fillOpaqueRateObj.name = displayFillStyleName[2];
    fillOpaqueRateObj.editor = "text";
    fillOpaqueRateObj.value = styleObject.fillOpacity;

    //填充：渐变填充方式
    var fillGradientModeObj = new Object();
    fillGradientModeObj.group = group[6];
    fillGradientModeObj.name = displayFillStyleName[3];
    fillGradientModeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFillGradientModeRows() } };
    fillGradientModeObj.value = fillGradientModeToString(styleObject.fillGradientMode);

    //填充：填充背景色
    var fillBackColorObj = new Object();
    fillBackColorObj.group = group[6];
    fillBackColorObj.name = displayFillStyleName[4];
    fillBackColorObj.editor = "colorpicker";
    fillBackColorObj.value = styleObject.fillBackColor;

    //填充：填充背景透明度
    var fillBackOpacityObj = new Object();
    fillBackOpacityObj.group = group[6];
    fillBackOpacityObj.name = displayFillStyleName[5];
    fillBackOpacityObj.editor = "text";
    fillBackOpacityObj.value = styleObject.fillBackOpacity;

    //填充：渐变填充角度
    var fillBackAngleObj = new Object();
    fillBackAngleObj.group = group[6];
    fillBackAngleObj.name = displayFillStyleName[6];
    fillBackAngleObj.editor = "text";
    fillBackAngleObj.value = styleObject.fillAngle;

    //填充：渐变填充水平偏移
    var fillBackXObj = new Object();
    fillBackXObj.group = group[6];
    fillBackXObj.name = displayFillStyleName[7];
    fillBackXObj.editor = "text";
    fillBackXObj.value = styleObject.fillCenterOffsetX;

    //填充：渐变填充竖直偏移
    var fillBackYObj = new Object();
    fillBackYObj.group = group[6];
    fillBackYObj.name = displayFillStyleName[8];
    fillBackYObj.editor = "text";
    fillBackYObj.value = styleObject.fillCenterOffsetY;

    //注记：注记内容
    var textContentObj = new Object();
    textContentObj.group = group[7];
    textContentObj.name = displayTextContentName[0];
    textContentObj.editor = "text";
    textContentObj.value = selectfeature.getTextContent();
    //注记：注记位置
    var markPosObj = new Object();
    markPosObj.group = group[7];
    markPosObj.name = displayTextContentName[1];
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.PATHTEXT) {
        markPosObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getRelLineTextRows(selectfeature.getRelLineText()) } };
        markPosObj.value = relLineTextToString(selectfeature.getRelLineText());
    } else {
        markPosObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getAnnotationRows(selectfeature) } };
        markPosObj.value = annotationToString(selectfeature.getTextPosition());
    }
    //注记：注记字体大小
    var fontSizeObj = new Object();
    fontSizeObj.group = group[7];
    fontSizeObj.name = displayTextContentName[2];
    fontSizeObj.editor = "text";
    fontSizeObj.value = styleObject.fontSize;

    //注记：注记字体颜色
    var fontColorObj = new Object();
    fontColorObj.group = group[7];
    fontColorObj.name = displayTextContentName[3];
    fontColorObj.editor = "colorpicker";
    fontColorObj.value = styleObject.fontColor;


    //注记：注记字体名称
    var fontFamilyObj = new Object();
    fontFamilyObj.group = group[7];
    fontFamilyObj.name = displayTextContentName[4];
    fontFamilyObj.editor = "text";
    fontFamilyObj.value = styleObject.fontFamily;


    //注记：注记与标号的间距
    var fontSpaceObj = new Object();
    fontSpaceObj.group = group[7];
    fontSpaceObj.name = displayTextContentName[5];
    fontSpaceObj.editor = "text";
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.PATHTEXT || selectfeature.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL) {
        fontSpaceObj.value = selectfeature.getSpace();
    }
    //注记：字间距
    var fontSpaceObj1 = new Object();
    fontSpaceObj1.group = group[7];
    fontSpaceObj1.name = displayTextContentName[6];
    fontSpaceObj1.editor = "text";
    fontSpaceObj1.value = styleObject.fontSpace;

    //注记：字宽百分比
    var fontPercentObj = new Object();
    fontPercentObj.group = group[7];
    fontPercentObj.name = displayTextContentName[7];
    fontPercentObj.editor = "text";
    fontPercentObj.value = styleObject.fontPercent;
    //注记：字体描边
    var fontStrokeObj = new Object();
    fontStrokeObj.group = group[7];
    fontStrokeObj.name = displayTextContentName[8];
    fontStrokeObj.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
    fontStrokeObj.value = checkboxValueToString(styleObject.fontStroke);
    //注记：描边色
    var fontStrokeColorObj = new Object();
    fontStrokeColorObj.group = group[7];
    fontStrokeColorObj.name = displayTextContentName[9];
    fontStrokeColorObj.editor = "colorpicker";
    fontStrokeColorObj.value = styleObject.fontStrokeColor;
    //注记：描边宽度
    var fontStrokeWidthObj = new Object();
    fontStrokeWidthObj.group = group[7];
    fontStrokeWidthObj.name = displayTextContentName[10];
    fontStrokeWidthObj.editor = "text";
    fontStrokeWidthObj.value = styleObject.fontStrokeWidth;
    //注记：文字背景
    var fontBackObj = new Object();
    fontBackObj.group = group[7];
    fontBackObj.name = displayTextContentName[11];
    fontBackObj.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
    fontBackObj.value = checkboxValueToString(styleObject.fontBackground);
    //注记：背景色
    var fontBackColorObj = new Object();
    fontBackColorObj.group = group[7];
    fontBackColorObj.name = displayTextContentName[12];
    fontBackColorObj.editor = "colorpicker";
    fontBackColorObj.value = styleObject.fontBackgroundColor;
    //注记：文字阴影
    var fontShadowObj = new Object();
    fontShadowObj.group = group[7];
    fontShadowObj.name = displayTextContentName[13];
    fontShadowObj.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
    fontShadowObj.value = checkboxValueToString(styleObject.fontShadow);
    //注记：阴影色
    var fontShadowColorObj = new Object();
    fontShadowColorObj.group = group[7];
    fontShadowColorObj.name = displayTextContentName[14];
    fontShadowColorObj.editor = "colorpicker";
    fontShadowColorObj.value = styleObject.fontShadowColor;
    //注记：阴影偏移量X
    var fontShadowOffsetXObj = new Object();
    fontShadowOffsetXObj.group = group[7];
    fontShadowOffsetXObj.name = displayTextContentName[15];
    fontShadowOffsetXObj.editor = "text";
    fontShadowOffsetXObj.value = styleObject.fontShadowOffsetX;
    //注记：阴影偏移量Y
    var fontShadowOffsetYObj = new Object();
    fontShadowOffsetYObj.group = group[7];
    fontShadowOffsetYObj.name = displayTextContentName[16];
    fontShadowOffsetYObj.editor = "text";
    fontShadowOffsetYObj.value = styleObject.fontShadowOffsetY;


    var rows = [];
    //线形
    var lineRows = [];
    lineRows.push(lineWidthObj);
    lineRows.push(lineColorObj);
    lineRows.push(lineStyleObj);
    lineRows.push(lineOpaqueRateObj);
    //衬线
    var surroundLineRows = [];
    surroundLineRows.push(surroundLineTypeObj);
    surroundLineRows.push(surroundLineWidthObj);
    surroundLineRows.push(surroundLineColorObj);
    surroundLineRows.push(surroundLineColorOpaObj);

    //子标号线型
    var subLineRows = [];
    subLineRows.push(subSymbolLineWidth);
    subLineRows.push(subSymbolLineColor);

    //填充
    var fillRows = [];
    fillRows.push(fillObj);
    fillRows.push(fillGradientModeObj);
    if (styleObject.fillGradientMode === "NONE" && styleObject.fillSymbolID === 0) {
        fillRows.push(fillforeColorObj);
        fillRows.push(fillOpaqueRateObj);
    } else if (styleObject.fillGradientMode === "NONE" &&
        styleObject.fillSymbolID !== 0 &&
        styleObject.fillSymbolID !== 1) {
        fillRows.push(fillforeColorObj);
        fillRows.push(fillOpaqueRateObj);
        fillRows.push(fillBackColorObj);
        fillRows.push(fillBackOpacityObj);
    } else if (styleObject.fillGradientMode !== "NONE") {
        fillRows.push(fillforeColorObj);
        fillRows.push(fillOpaqueRateObj);
        fillRows.push(fillBackColorObj);
        if (styleObject.fillGradientMode === "LINEAR") {
            fillRows.push(fillBackAngleObj);
        }
        fillRows.push(fillBackXObj);
        if (styleObject.fillGradientMode === "RADIAL") {
            fillRows.push(fillBackYObj);
        }
    }

    //文字
    var textRows = [];
    textRows.push(textContentObj);
    textRows.push(fontColorObj);
    textRows.push(fontFamilyObj);
    textRows.push(fontSizeObj);
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.PATHTEXT ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL) {
        textRows.push(markPosObj);
        if (selectfeature.getTextPosition() !== 8) {
            textRows.push(fontSpaceObj);
        }
    }
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.TEXTSYMBOL
    ) {
        textRows.push(fontPercentObj);
        textRows.push(fontSpaceObj1);
        textRows.push(fontStrokeObj);
        if (styleObject.fontStroke === true) {
            textRows.push(fontStrokeColorObj);
            textRows.push(fontStrokeWidthObj);
        }
        textRows.push(fontBackObj);
        if (styleObject.fontBackground === true) {
            textRows.push(fontBackColorObj);
        }
        textRows.push(fontShadowObj);
        if (styleObject.fontShadow === true) {
            textRows.push(fontShadowColorObj);
            textRows.push(fontShadowOffsetXObj);
            textRows.push(fontShadowOffsetYObj);
        }
    }



    //图元文本
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.TEXTSYMBOL) {
        rows = rows.concat(textRows);
    }
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.GROUPOBJECT ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.FLAGGROUP ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.AIRROUTE ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.NAVYROUTE ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.MISSILEROUTE ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.LITERATESIGN ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.AIRDEPLOYMENT ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT1 ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.SATELLITETIMEWINDOWS ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.NAVYDEPLOYMENT
    ) {
        rows = rows.concat(lineRows);
        if (selectfeature.symbolType === SuperMap.Plot.SymbolType.AIRDEPLOYMENT ||
            selectfeature.symbolType === SuperMap.Plot.SymbolType.NAVYDEPLOYMENT) {
            rows = rows.concat(fillRows);
        }
        if (selectfeature.symbolType === SuperMap.Plot.SymbolType.NAVYDEPLOYMENT ||
            selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT1) {
            rows.push(textContentObj);
            rows.push(fontColorObj);
            rows.push(fontFamilyObj);
            rows.push(fontSizeObj);
        }
    }

    //点标号自己独有属性
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.PICTURE||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.MODELPLOT) {
        if(selectfeature.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
        //常用：点：旋转角度
        var dotSymbolRotateObj = new Object();
        dotSymbolRotateObj.group = group[3];
        dotSymbolRotateObj.name = displayNameDot[0];
        dotSymbolRotateObj.editor = "text";
        dotSymbolRotateObj.value = selectfeature.getRotate();
        //常用：点：随图缩放
        var dotScaleByMap = new Object();
        dotScaleByMap.group = group[3];
        dotScaleByMap.name = displayNameDot[1];
        dotScaleByMap.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
        dotScaleByMap.value = checkboxValueToString(selectfeature.getScaleByMap());
        //常用：点：镜像
        var dotSymbolNegativeImageObj = new Object();
        dotSymbolNegativeImageObj.group = group[3];
        dotSymbolNegativeImageObj.name = displayNameDot[2];
        dotSymbolNegativeImageObj.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
        dotSymbolNegativeImageObj.value = checkboxValueToString(selectfeature.getNegativeImage());
        //常用：点：标号级别
        var dotSymbolRankObj = new Object();
        dotSymbolRankObj.group = group[3];
        dotSymbolRankObj.name = displayNameDot[3];
        dotSymbolRankObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getSymbolRankRows(selectfeature) } };
        dotSymbolRankObj.value = symbolRankToString(selectfeature.getSymbolRank());
        //常用：点：位置点偏移
        var dotPositionOffset = new Object();
        dotPositionOffset.group = group[3];
        dotPositionOffset.name = displayNameDot[4];
        dotPositionOffset.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
        dotPositionOffset.value = checkboxValueToString(selectfeature.getPositionOffset());
        //常用：点：偏移线类型
        var dotPositionOffsetType = new Object();
        dotPositionOffsetType.group = group[3];
        dotPositionOffsetType.name = displayNameDot[5];
        dotPositionOffsetType.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getPositionOffsetTypeRows() } };
        dotPositionOffsetType.value = positionOffsetTypeToString(selectfeature.getPositionOffsetType());
        //常用：点:宽高限定
        var dotSymbolWidthHeightLimit = new Object();
        dotSymbolWidthHeightLimit.group = group[3];
        dotSymbolWidthHeightLimit.name = displayNameDot[6];
        dotSymbolWidthHeightLimit.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
        dotSymbolWidthHeightLimit.value = checkboxValueToString(selectfeature.getWidthHeightLimit());
        }
        //常用：点：军标大小
        var dotSymbolWidthObj = new Object();
        dotSymbolWidthObj.group = group[3];
        dotSymbolWidthObj.name = displayNameDot[7];
        dotSymbolWidthObj.editor = "text";
        dotSymbolWidthObj.value = selectfeature.getSymbolSize().w;
        var dotSymbolHeightObj = new Object();
        dotSymbolHeightObj.group = group[3];
        dotSymbolHeightObj.name = displayNameDot[8];
        dotSymbolHeightObj.editor = "text";
        dotSymbolHeightObj.value = selectfeature.getSymbolSize().h;

        var dotSymbolRows = [];
        dotSymbolRows.push(dotSymbolRotateObj);
        dotSymbolRows.push(dotScaleByMap);
        dotSymbolRows.push(dotSymbolNegativeImageObj);
        dotSymbolRows.push(dotSymbolRankObj);
        dotSymbolRows.push(dotPositionOffset);
        dotSymbolRows.push(dotPositionOffsetType);
        dotSymbolRows.push(dotSymbolWidthHeightLimit);
        dotSymbolRows.push(dotSymbolWidthObj);
        dotSymbolRows.push(dotSymbolHeightObj);
        dotSymbolRows = dotSymbolRows.concat(lineRows);
        dotSymbolRows = dotSymbolRows.concat(surroundLineRows);
        dotSymbolRows = dotSymbolRows.concat(fillRows);
        dotSymbolRows = dotSymbolRows.concat(textRows);
        rows = rows.concat(dotSymbolRows);
    }

    if (selectfeature.symbolType !== SuperMap.Plot.SymbolType.DOTSYMBOL && checkSymbolType(selectfeature) === true) {
        var algoSymbolRows = [];
        //线面标号子标号

        if ((selectfeature.libID === 0 && selectfeature.code === 1025) ||
            (selectfeature.libID === 100 && selectfeature.code === 25200) ||
            (selectfeature.libID === 100 && selectfeature.code === 3020901) ||
            (selectfeature.libID === 100 && selectfeature.code === 23400) ||
            (selectfeature.libID === 100 && selectfeature.code === 30800) ||
            (selectfeature.libID === 100 && selectfeature.code === 26400) ||
            (selectfeature.libID === 100 && selectfeature.code === 30001)
        ) {
            var count = selectfeature.getMaxSubSymbols();
            for (let i = 0; i < count; i++) {
                var objectSubCode1 = new Object();
                objectSubCode1.group = group[8];
                objectSubCode1.name = displayName[3];
                objectSubCode1.editor = "text";
                //objectSubCode1.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getSubSymbolsTypeRows(selectfeature) } };
                objectSubCode1.index = i;
                objectSubCode1.value = subSymbolsTypeString(selectfeature.getSubSymbols().length, selectfeature,i);
                algoSymbolRows.push(objectSubCode1);
                var subSymbolLineWidth = new Object();
                subSymbolLineWidth.group = group[8];
                subSymbolLineWidth.name = resources.text_subSymbolLineWidth;
                subSymbolLineWidth.editor = "text";
                subSymbolLineWidth.index = i;
                subSymbolLineWidth.value = (selectfeature.getSubSymbols()[i]&&selectfeature.getSubSymbols()[i].code!=0)?selectfeature.getSubSymbols()[i].width2D:""
                algoSymbolRows.push(subSymbolLineWidth);
                var subSymbolLineColor = new Object();
                subSymbolLineColor.group = group[8];
                subSymbolLineColor.name = resources.text_subSymbolLineColor;
                subSymbolLineColor.editor = "colorpicker";
                subSymbolLineColor.index = i;
                subSymbolLineColor.value = (selectfeature.getSubSymbols()[i]&&selectfeature.getSubSymbols()[i].code!=0)?selectfeature.getSubSymbols()[i].lineColor:""
                algoSymbolRows.push(subSymbolLineColor);
            }
        } else {
            for (var i = 0; i < selectfeature.getSubSymbols().length; i++) {
                var objectSubCode = new Object();
                objectSubCode.group = group[8];
                objectSubCode.name = displayName[3];
                objectSubCode.editor = "text";
                //objectSubCode.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getSubSymbolsTypeRows(selectfeature) } };
                objectSubCode.index = i;
                objectSubCode.value = selectfeature.getSubSymbols()[i].code;
                algoSymbolRows.push(objectSubCode);
                var subSymbolLineWidth = new Object();
                subSymbolLineWidth.group = group[8];
                subSymbolLineWidth.name = resources.text_subSymbolLineWidth;
                subSymbolLineWidth.editor = "text";
                subSymbolLineWidth.index = i;
                subSymbolLineWidth.value = selectfeature.getSubSymbols()[i].width2D;
                algoSymbolRows.push(subSymbolLineWidth);
                var subSymbolLineColor = new Object();
                subSymbolLineColor.group = group[8];
                subSymbolLineColor.name = resources.text_subSymbolLineColor;
                subSymbolLineColor.editor = "colorpicker";
                subSymbolLineColor.index = i;
                subSymbolLineColor.value = selectfeature.getSubSymbols()[i].lineColor;
                algoSymbolRows.push(subSymbolLineColor);
            }
        }
        // if(selectfeature.code === 1025 && selectfeature.getSubSymbols().length > 0){
        //     for(let i = 0 ;i<selectfeature.getSubSymbols().length;i++){
        //     var objectLibID = new Object();
        //     objectLibID.group = group[8];
        //     objectLibID.name = displayName[2];
        //     objectLibID.editor = "text";
        //     objectLibID.value = libIDToString(selectfeature.getSubSymbols()[i].libID);
        //     algoSymbolRows.push(objectLibID);
        //     var subSymbolLineWidth = new Object();
        //     subSymbolLineWidth.group = group[8];
        //     subSymbolLineWidth.name = "子标号线宽";
        //     subSymbolLineWidth.editor = "text";
        //     subSymbolLineWidth.index = i;
        //     subSymbolLineWidth.value =  selectfeature.getSubSymbols()[i].weight;
        //     algoSymbolRows.push(subSymbolLineWidth);
        //     var subSymbolLineColor = new Object();
        //     subSymbolLineColor.group = group[8];
        //     subSymbolLineColor.name = "子标号线色";
        //     subSymbolLineColor.editor = "colorpicker";
        //     subSymbolLineColor.index = i;
        //     subSymbolLineColor.value =  selectfeature.getSubSymbols()[i].color;
        //     algoSymbolRows.push(subSymbolLineColor);
        //     }

        // }

        //四个点以上含4个点可以设置成折线显示
        if ((selectfeature.getLatLngs().length > 3) && (typeof selectfeature.canPolylineConnectLocationPoint !== "undefined" && selectfeature.canPolylineConnectLocationPoint() === true)) {
            var algoLineType = new Object();
            algoLineType.group = groupNew[8];
            algoLineType.name = displayNameNew[20];
            algoLineType.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
            algoLineType.value = checkboxValueToString(selectfeature.getPolylineConnectLocationPoint());
            algoSymbolRows.push(algoLineType);
        }
        algoSymbolRows = algoSymbolRows.concat(lineRows);
        algoSymbolRows = algoSymbolRows.concat(surroundLineRows);
        algoSymbolRows = algoSymbolRows.concat(fillRows);
        if (isCanAddText(selectfeature) === true) {
            algoSymbolRows = algoSymbolRows.concat(textRows);
        }
        rows = rows.concat(algoSymbolRows);
    }

    //注记指示框、多角标注框、标注框、线型标注框
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.ANNOFRAMESYMBOL ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.ANNOFRAMESYMBOLM ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXTBOX ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.LINEMARKING) {
        //文字对齐方式
        var fontAlignType = new Object();
        fontAlignType.group = group[7];
        fontAlignType.name = displayNameNew[21];
        fontAlignType.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getFontAlignTypeRows() } };
        fontAlignType.value = fontAlignTypeToString(styleObject.labelAlign);
        rows.push(fontAlignType);
        //标注框边框
        if (selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXTBOX) {
            //标注框边框
            var textBoxTypeObj = new Object();
            textBoxTypeObj.group = groupNew[3];
            textBoxTypeObj.name = displayNameNew[9];
            textBoxTypeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getTextBoxTypeRows() } };
            textBoxTypeObj.value = textBoxTypeToString(selectfeature.getTextBoxType());
            //圆角边框
            var roundBoxObj = new Object();
            roundBoxObj.group = groupNew[3];
            roundBoxObj.name = displayNameNew[10];
            roundBoxObj.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
            roundBoxObj.value = checkboxValueToString(selectfeature.getRoundBox());

            rows.push(textBoxTypeObj);
            rows.push(roundBoxObj);
        }
        //线型标注框边框
        if (selectfeature.symbolType === SuperMap.Plot.SymbolType.LINEMARKING) {
            var lineMarkingTextBoxTypeObj = new Object();
            lineMarkingTextBoxTypeObj.group = groupNew[3];
            lineMarkingTextBoxTypeObj.name = displayNameNew[9];
            lineMarkingTextBoxTypeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getLineMarkingTypeRows() } };
            lineMarkingTextBoxTypeObj.value = lineMarkingTypeToString(selectfeature.getTextBoxType());
            rows.push(lineMarkingTextBoxTypeObj);
        }
    }
    //26400修改箭头类型
    if (selectfeature.code === 26400 && selectfeature.libID === 100) {
        var arrowTypeStartObj = new Object();
        arrowTypeStartObj.group = groupNew[1];
        arrowTypeStartObj.name = displayNameNew[0];
        arrowTypeStartObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getArrowHeadTypeRows() } };
        arrowTypeStartObj.value = arrowHeadTypeToString(selectfeature.getArrowHeadType());
        rows.push(arrowTypeStartObj);
    }
    //箭头线自己独有属性
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.ARROWLINE && selectfeature.libID === 0) {
        var arrowTypeStartObj = new Object();
        arrowTypeStartObj.group = groupNew[1];
        arrowTypeStartObj.name = displayNameNew[3];
        arrowTypeStartObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getArrowTypeRows(selectfeature) } };
        arrowTypeStartObj.value = arrowTypeToString(selectfeature.getStartArrowType());
        var arrowTypeEndObj = new Object();
        arrowTypeEndObj.group = groupNew[1];
        arrowTypeEndObj.name = displayNameNew[4];
        arrowTypeEndObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getArrowTypeRows(selectfeature) } };
        arrowTypeEndObj.value = arrowTypeToString(selectfeature.getEndArrowType());
        rows.push(arrowTypeStartObj);
        rows.push(arrowTypeEndObj);
    }


    //沿线注记自己独有属性
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.PATHTEXT) {
        var showPathLineObj = new Object();
        showPathLineObj.group = groupNew[2];
        showPathLineObj.name = displayNameNew[5];
        showPathLineObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getShowRows() } };
        showPathLineObj.value = showToString(selectfeature.getShowPathLine());
        var isCurveObj = new Object();
        isCurveObj.group = groupNew[2];
        isCurveObj.name = displayNameNew[6];
        isCurveObj.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
        isCurveObj.value = checkboxValueToString(selectfeature.getIsCurveLine());
        var showPathLineArrowObj = new Object();
        showPathLineArrowObj.group = groupNew[2];
        showPathLineArrowObj.name = displayNameNew[7];
        showPathLineArrowObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getShowRows() } };
        showPathLineArrowObj.value = showToString(selectfeature.getShowPathLineArrow());
        var isAvoidObj = new Object();
        isAvoidObj.group = groupNew[2];
        isAvoidObj.name = displayNameNew[8];
        isAvoidObj.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
        isAvoidObj.value = checkboxValueToString(selectfeature.getIsAvoidLine());
        rows.push(showPathLineObj);
        rows.push(isCurveObj);
        rows.push(showPathLineArrowObj);
        if (selectfeature.getRelLineText() === SuperMap.Plot.RelLineText.ONLINE) {
            rows.push(isAvoidObj);
        }
    }

    //对象间连线
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.LINERELATION) {
        var lineRelationTypeObj = new Object();
        lineRelationTypeObj.name = displayNameNew[19];
        lineRelationTypeObj.value = lineRelationTypeToString(selectfeature.getLineRelationType());
        lineRelationTypeObj.group = groupNew[7];
        lineRelationTypeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getLineRelationTypeRows() } };
        rows.push(lineRelationTypeObj);
    }
    //扇形区域
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.ARCREGION) {
        if (selectfeature.radiusLineType != null) {
            var radiusLineTypeObj = new Object();
            radiusLineTypeObj.name = displayNameNew[12];
            radiusLineTypeObj.value = radiusTypeToString(selectfeature.getRadiusLineType());
            radiusLineTypeObj.group = groupNew[4];
            radiusLineTypeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getRadiusTypeRows(selectfeature) } };
            rows.push(radiusLineTypeObj);
        }
        if (selectfeature.radiusText != null) {
            var radiusPosAngleObj = new Object();
            radiusPosAngleObj.name = displayNameNew[13];
            radiusPosAngleObj.value = selectfeature.getRadiusTextPos();
            radiusPosAngleObj.group = groupNew[4];
            radiusPosAngleObj.editor = "text";
            var upTextObj = new Object();
            upTextObj.name = displayNameNew[14];
            upTextObj.value = selectfeature.getRadiusText(0);
            upTextObj.group = groupNew[4];
            upTextObj.editor = "text";
            var downTextObj = new Object();
            downTextObj.name = displayNameNew[15];
            downTextObj.value = selectfeature.getRadiusText(1);
            downTextObj.group = groupNew[4];
            downTextObj.editor = "text";

            rows.push(radiusPosAngleObj);
            rows.push(upTextObj);
            rows.push(downTextObj);
        }

    }

    //航线
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.ROUTENODE) {
        rows = rows.concat(lineRows);
        var routeNodeTypeObj = new Object();
        routeNodeTypeObj.name = displayNameNew[17];
        routeNodeTypeObj.value = routeNodeTypeToString(selectfeature.routeNode.type);
        routeNodeTypeObj.group = groupNew[6];
        routeNodeTypeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getRouteNodeTypeRows() } };
        var routeNodeRotate = new Object();
        routeNodeRotate.name = displayNameNew[18];
        routeNodeRotate.value = selectfeature.routeNode.rotate;
        routeNodeRotate.group = groupNew[6];
        routeNodeRotate.editor = "text";
        rows.push(routeNodeTypeObj);
        if (selectfeature.routeNode.type === SuperMap.Plot.RouteNodeType.STANDBY) {
            rows.push(routeNodeRotate);
        }
    }

    //对象标注的标注内容和标注边框
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT) {
        var textContentObj1 = new Object();
        textContentObj1.group = group[7];
        textContentObj1.name = displayTextContentName[0];
        textContentObj1.editor = "text";
        textContentObj1.value = selectfeature.symbolTexts[0].textContent;
        rows.push(textContentObj1);
        if (selectfeature.symbolTexts.length == 2) {
            var textContentObj2 = new Object();
            textContentObj2.group = group[7];
            textContentObj2.name = displayTextContentName[0] + "2";
            textContentObj2.editor = "text";
            textContentObj2.value = selectfeature.symbolTexts[1].textContent;
            rows.push(textContentObj2);
        }
        rows.push(fontColorObj);
        rows.push(fontFamilyObj);
        rows.push(fontSizeObj);
        var symbolTextFrameObj = new Object();
        symbolTextFrameObj.group = groupNew[3];
        symbolTextFrameObj.name = displayNameNew[11];
        symbolTextFrameObj.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
        symbolTextFrameObj.value = checkboxValueToString(selectfeature.getFrame());
        rows.push(symbolTextFrameObj);
        if (selectfeature.getFrame() === true) {
            rows.push(lineWidthObj);
            rows.push(lineColorObj);
            rows.push(lineOpaqueRateObj);
            rows.push(fillObj);
            rows.push(fillforeColorObj);
            rows.push(fillOpaqueRateObj);




        }

    }


    //卫星
    if (selectfeature.symbolType === SuperMap.Plot.SymbolType.SATELLITE) {
        var visibleObj = new Object();
        visibleObj.name = displayNameNew[16];
        visibleObj.value = showToString(selectfeature.getVisible());
        visibleObj.group = groupNew[5];
        visibleObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getShowRows() } };
        rows = rows.concat(lineRows);
        rows.push(textContentObj);
        rows.push(fontColorObj);
        rows.push(fontFamilyObj);
        rows.push(fontSizeObj);
        rows.push(visibleObj);
    }

    //复合箭头自己独有属性
    if (selectfeature.libID === 22 && selectfeature.code === 1016) {
        var arrowHeadTypeObj = new Object();
        arrowHeadTypeObj.group = groupNew[0];
        arrowHeadTypeObj.name = displayNameNew[0];
        arrowHeadTypeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getArrowHeadTypeRows() } };
        arrowHeadTypeObj.value = arrowHeadTypeToString(selectfeature.getArrowHeadType());

        var arrowBodyTypeObj = new Object();
        arrowBodyTypeObj.group = groupNew[0];
        arrowBodyTypeObj.name = displayNameNew[1];
        arrowBodyTypeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getArrowBodyTypeRows() } };
        arrowBodyTypeObj.value = arrowBodyTypeToString(selectfeature.getArrowBodyType());

        var arrowTailTypepeObj = new Object();
        arrowTailTypepeObj.group = groupNew[0];
        arrowTailTypepeObj.name = displayNameNew[2];
        arrowTailTypepeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getArrowTailTypeRows() } };
        arrowTailTypepeObj.value = arrowTailTypeToString(selectfeature.getArrowTailType());

        rows.push(arrowHeadTypeObj);
        rows.push(arrowBodyTypeObj);
        rows.push(arrowTailTypepeObj);
    }
    return rows;
}
function picturePropertyObject(selectfeature){
    var rows = [];
    var dotSymbolWidthObj = new Object();
    dotSymbolWidthObj.group = resources.text_attribute;
    dotSymbolWidthObj.name = displayNameDot[7];
    dotSymbolWidthObj.editor = "text";
    dotSymbolWidthObj.value = selectfeature.style.graphicWidth;
    var dotSymbolHeightObj = new Object();
    dotSymbolHeightObj.group = resources.text_attribute;
    dotSymbolHeightObj.name = displayNameDot[8];
    dotSymbolHeightObj.editor = "text";
    dotSymbolHeightObj.value =selectfeature.style.graphicHeight;
    var dotSymbolRows = [];
    dotSymbolRows.push(dotSymbolWidthObj);
    dotSymbolRows.push(dotSymbolHeightObj);
    rows = rows.concat(dotSymbolRows);
    return rows;
}

function getLoopRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_false });
    rows.push({ "value": "1", "text": resources.text_true });
    return rows;
}

function getTie() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_false });
    rows.push({ "value": "1", "text": resources.text_true });
    return rows;
}
function tieValueToString(value) {
    var type = parseInt(value);
    var result;
    switch (type) {
        case 0:
            result = resources.text_false;
            break;
        case 1:
            result = resources.text_true;
            break;
        default:
            break;
    }
    return result;
}
function getPositionRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_top });
    rows.push({ "value": "1", "text": resources.text_bottom });
    rows.push({ "value": "2", "text": resources.text_left });
    rows.push({ "value": "3", "text": resources.text_right });
    return rows;
}
function positionValueToString(value) {
    var type = parseInt(value);
    var result;
    switch (type) {
        case 0:
            result = resources.text_top;
            break;
        case 1:
            result = resources.text_bottom;
            break;
        case 2:
            result = resources.text_left;
            break;
        case 3:
            result = resources.text_right;
            break;
        default:
            break;
    }
    return result;
}
function getFontRows() {
    var rows = [];
    rows.push({ "value": resources.text_song, "text": resources.text_song });
    rows.push({ "value": resources.text_li, "text": resources.text_li });
    rows.push({ "value": resources.text_kai, "text": resources.text_kai });
    rows.push({ "value": "Helvetica", "text": "Helvetica" });
    rows.push({ "value": "Times New Roman", "text": "Times New Roman" });
    return rows;
}
function fontValueToStrin(value) {
    var result;
    switch (value) {
        case resources.text_song:
            result = resources.text_song;
            break;
        case resources.text_li:
            result = resources.text_li;
            break;
        case resources.text_kai:
            result = resources.text_kai;
            break;
        case "Helvetica":
            result = "Helvetica";
            break;
        case "Times New Roman":
            result = "Times New Roman";
            break;
        default:
            break;
    }
    return result;
}
function getFontWeight() {
    var rows = [];
    rows.push({ "value": " ", "text": resources.text_unbold });
    rows.push({ "value": "bold", "text": resources.text_bold });
    return rows;
}
function fontWeightValueToString(value) {
    var result;
    switch (value) {
        case " ":
            result = " ";
            break;
        case "bold":
            result = "bold";
            break;
        default:
            break;
    }
    return result;
}
function getFontAlign() {
    var rows = [];
    rows.push({ "value": "left", "text": "left" });
    rows.push({ "value": "center", "text": "center" });
    rows.push({ "value": "right", "text": "right" });
    return rows;
}
function fontAlignValueToString(value) {
    var result;
    switch (value) {
        case "left":
            result = "left";
            break;
        case "center":
            result = "center";
            break;
        case "right":
            result = "right";
            break;
        default:
            break;
    }
    return result;
}