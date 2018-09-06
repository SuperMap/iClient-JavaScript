/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.*/

var selectFeatures = [];
var displayName = ["旋转角度", "随图缩放", "镜像", "标号级别", "Width", "Height",
    "位置点偏移","偏移线类型","锁定","对象可见性"];

var displayTextContentName =["注记内容", "注记位置", "注记大小", "注记颜色", "注记字体","注记距离"];

var displayLineStyleName = [ "线宽", "线颜色","透明度", "线型"];

var displaySurroundLineName = ["衬线类型", "衬线宽", "衬线颜色", "衬线透明度"];

var displayFillStyleName = ["填充", "填充色", "填充透明度","渐变填充方式","填充背景色","填充背景透明度"];

var fontName = ["字体描边", "描边色", "描边宽度", "文字背景", "背景色",
    "文字阴影", "阴影色", "阴影偏移量X", "阴影偏移量Y",
    "字间距","字宽百分比"];

var displayNameNew = [
    "起始","终止",
    "避让","路径线","贝塞尔曲线",
    "半径类型","注记一","注记二",
    "卫星轨道",
    "节点类型","旋转角度",
    "注记边框","圆角边框",
    "显示箭头",
    "标注边框",
    "半径角度",
    "连接线类型"
    // "注记偏移量X","注记偏移量Y"
];
var plotting;
var group = ["基本", "军标大小", "线形", "填充", "注记", "子标号", "衬线", "箭头类型", "半径", "文字","解除锁定","对象间连线"];
L.supermap.plotting.initStylePanel = function(div, serverUrl, editControl){
    editControl.on(SuperMap.Plot.Event.featuresselected, function(event){
        showFeatureProperty(event);
    });
    editControl.on(SuperMap.Plot.Event.featuresmodified, function(event){
        showFeatureProperty(event);
    });
    editControl.on(SuperMap.Plot.Event.featuresunselected, function(event){
        hideFeatureProperty(event);
    });

    function afterModifySelectFeature(rowIndex, rowData, changes){
        var updated = $('#pg').propertygrid('getChanges', "updated");
        new Promise(function(resolve,reject) {
            if(updated.length !== 0) {
                updateSelectFeature(updated[0], selectFeatures, serverUrl);
            }
                for(var i = 0; i < selectFeatures.length; i++){
                    if(selectFeatures[i].graphic){
                        selectFeatures[i].graphic.updateImage();
                    }
                }
            $('#pg').propertygrid('loadData', collectionPropertyGridRows(selectFeatures));
            return;
        }).then(function(selectFeatures) {
                for(var i = 0; i < selectFeatures.length; i++){
                    if(selectFeatures[i].graphic){
                        selectFeatures[i].graphic.updateImage();
                    }
                }
                $('#pg').propertygrid('loadData', collectionPropertyGridRows(selectFeatures));
            return;

        })
    }

    var stylePanel = document.getElementById(div);
    var pg = document.createElement("table");
    pg.id = "pg";
    pg.className = "easyui-propertygrid";
    stylePanel.appendChild(pg);

    $('#pg').propertygrid({
        showGroup:true,
        columns: [[
            { field: 'name', title: 'Name', width: 100, resizable: true },
            { field: 'value', title: 'Value', width: 100, resizable: false
            }
        ]],
        onAfterEdit: afterModifySelectFeature
    });
}

function showFeatureProperty(event) {
    for(var index in event.features){
        var sIndex = SuperMap.Util.indexOf(selectFeatures, event.features[index]);
        if(sIndex === -1){
            selectFeatures.push(event.features[index]);
        }
    }

    var rows = [];
    if(selectFeatures.length !== 0){
        var rows = collectionPropertyGridRows(selectFeatures);
    }
    $('#pg').propertygrid('loadData', rows);
    //$('#pg').collapseGroup();
}

function hideFeatureProperty(event) {
    for(var index in event.features){
        var sIndex = SuperMap.Util.indexOf(selectFeatures, event.features[index]);
        if(sIndex !== -1){
            selectFeatures.splice(sIndex, 1);
        }
    }

    var rows = [];
    if(selectFeatures.length !== 0){
        var rows = collectionPropertyGridRows(selectFeatures);
    }
    $('#pg').propertygrid('loadData', rows);
}

function collectionPropertyGridRows(features) {
    var rows = [];
    if(features.length === 0){
        return rows = [];
    }

    var dotSelectFeatures = [];
    var algoSelectFeatures = [];
    var sameFeatures = [];
    var otherFeatures = [];
    var selectfeatures = null;

    for(var i = 0; i < features.length; i++){
        if(features[i].libID === features[0].libID && features[i].code === features[0].code) {
            sameFeatures.push(features[i]);//是否是同一个标号
        }
    }

    if(sameFeatures.length !== features.length){
        for(var i = 0; i < features.length; i++){
            if(features[i].symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
                dotSelectFeatures.push(features[i]);//是否全是不同点标号
            } else if(features[i].symbolType === SuperMap.Plot.SymbolType.ALGOSYMBOL){
                algoSelectFeatures.push(features[i]); //是否全是不同线面标号
            } else {
                otherFeatures.push(features[i]);
            }
        }
    }


    if(sameFeatures.length === features.length){
        selectfeatures = features;
    } else if(dotSelectFeatures.length === features.length){
        selectfeatures = dotSelectFeatures;
    } else if(algoSelectFeatures.length === features.length){
        selectfeatures = algoSelectFeatures;
    } else if(dotSelectFeatures.length > 0 && algoSelectFeatures.length > 0 && otherFeatures.length === 0 ){
        selectfeatures = features;
    } else if(otherFeatures.length > 0){
        selectfeatures = features;
    }
    var selectfeature = selectfeatures[0];


    if(selectfeatures.length === sameFeatures.length){
        rows = [
            { "name": "标号几何ID", "value":selectfeature.symbolType, "group": "标号" },
            { "name": "标号库ID", "value": selectfeature.libID, "group": "标号" },
            { "name": "标号Code", "value": selectfeature.code, "group": "标号" },
            { "name": "标号名字", "value": selectfeature.symbolName, "group": "标号" }
        ];
    }

    var lockedObj  = new Object();
    lockedObj.name = displayName[8];
    lockedObj.value = checkboxValueToString(selectfeature.getLocked());
    lockedObj.group =  group[10];
    lockedObj.editor = { "type": 'checkbox', "options":{ "on":true, "off":false }};

    rows.push(lockedObj);

    if(selectfeature.getLocked()){
        return rows;
    }

    var annotationRows = getAnnotationRows(selectfeature);
    var relLineTextRows = getRelLineTextRows(selectfeature.relLineText);
    var symbolRankRows = getSymbolRankRows(selectfeature);
    var surroundLineTypeRows = getSurroundLineTypeRows(selectfeature.symbolType);
    var displayRows = getDisplayRows();
    var showRows = getShowRows();
    var fillGradinetRows = getFillGradientModeRows();
    var arrowTypeStart = getArrowTypeRows(selectfeature);
    var arrowTypeEnd = getArrowTypeRows(selectfeature);
    var radiusTypeRows = getRadiusTypeRows(selectfeature);
    var lineStyleRows = getLineStyleRows();
    var routeNodeTypeRows = getRouteNodeTypeRows();
    var positionOffsetTypeRows = getPositionOffsetTypeRows(); //偏移线类型
    var textBoxTypeRows = getTextBoxTypeRows();
    var lineMarkingTypeRows = getLineMarkingTypeRows();
    var arrowHeadTypeRows=getArrowHeadTypeRows();
    var arrowBodyTypeRows=getArrowBodyTypeRows();
    var arrowTailTypeRows=getArrowTailTypeRows();
    var lineRelationTypeRows = getLineRelationTypeRows();
    var subSymbolsTypeRows = getSubSymbolsTypeRows(selectfeature);


    //基本0：
    //可见性
    var visibilityObj  = new Object();
    visibilityObj.name =  displayName[9];
    visibilityObj.value = displayToString(selectfeature.style.display);
    visibilityObj.group = group[0];
    visibilityObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": displayRows }};

    //线形2：
    //线宽
    var lineWidthObj  = new Object();
    lineWidthObj.name = displayLineStyleName[0];
    lineWidthObj.value = selectfeature.style.weight;
    lineWidthObj.group = group[2];
    lineWidthObj.editor = "text";

    //线色
    var lineColorObj  = new Object();
    lineColorObj.name = displayLineStyleName[1];
    lineColorObj.value = selectfeature.style.color;
    lineColorObj.group = group[2];
    lineColorObj.editor = "colorpicker";

    //线透明度
    var lineOpaqueRateObj  = new Object();
    lineOpaqueRateObj.name = displayLineStyleName[2];
    lineOpaqueRateObj.value = selectfeature.style.opacity;
    lineOpaqueRateObj.group = group[2];
    lineOpaqueRateObj.editor = "text";

    //线型
    var lineStyleObj  = new Object();
    lineStyleObj.name = displayLineStyleName[3];
    if(selectfeature.style.dashArray === ""){
        lineStyleObj.value = "实线";
    }else lineStyleObj.value = lineStyleToString(selectfeature.style.lineSymbolID);
    lineStyleObj.group = group[2];
    lineStyleObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": lineStyleRows }};

    //填充3：
    //填充
    var fillObj  = new Object();
    fillObj.name = displayFillStyleName[0];
    fillObj.value = checkboxValueToString(selectfeature.style.fill);
    fillObj.group = group[3];
    fillObj.editor = { "type": 'checkbox', "options":{ "on":true, "off":false }};

    //填充色
    var fillforeColorObj  = new Object();
    fillforeColorObj.name = displayFillStyleName[1];
    fillforeColorObj.value = selectfeature.style.fillColor;
    fillforeColorObj.group = group[3];
    fillforeColorObj.editor = "colorpicker";

    //填充透明度
    var fillOpaqueRateObj  = new Object();
    fillOpaqueRateObj.name = displayFillStyleName[2];
    fillOpaqueRateObj.value = selectfeature.style.fillOpacity;
    fillOpaqueRateObj.group = group[3];
    fillOpaqueRateObj.editor = "text";

    //渐变填充
    var fillGradientModeObj  = new Object();
    fillGradientModeObj.name = displayFillStyleName[3];
    fillGradientModeObj.value = fillGradientModeToString(selectfeature.style.fillGradientMode);
    fillGradientModeObj.group = group[3];
    fillGradientModeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": fillGradinetRows }};

    var fillBackColorObj  = new Object();
    fillBackColorObj.name = displayFillStyleName[4];
    fillBackColorObj.value = selectfeature.style.fillBackColor;
    fillBackColorObj.group = group[3];
    fillBackColorObj.editor = "colorpicker";

    var fillBackOpacityObj  = new Object();
    fillBackOpacityObj.name = displayFillStyleName[5];
    fillBackOpacityObj.value = selectfeature.style.fillBackOpacity;
    fillBackOpacityObj.group =group[3];
    fillBackOpacityObj.editor = "text";


    //注记4：
    //注记
    var textContentObj  = new Object();
    textContentObj.name = displayTextContentName[0];
    if(selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT){
        textContentObj.value = selectfeature.symbolTexts[0].textContent;
    }
    else if(selectfeature.symbolType === SuperMap.Plot.SymbolType.ALGOSYMBOL &&
        selectfeature.textContent !== ""){
        textContentObj.value = selectfeature.textContent;
    }
    else{
        textContentObj.value = selectfeature.getTextContent();
    }
    textContentObj.group = group[4];
    textContentObj.editor = "text";



    if(selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT && selectfeature.symbolTexts.length == 2){
        var textContentObj2 = new Object();
        textContentObj2.name = displayTextContentName[0] + "2";
        textContentObj2.value = selectfeature.symbolTexts[1].textContent;
        textContentObj2.group = group[4];
        textContentObj2.editor = "text";
    }




    //注记位置
    var markPosObj  = new Object();
    markPosObj.name = displayTextContentName[1];
    if(selectfeature.symbolType === SuperMap.Plot.SymbolType.PATHTEXT){
        markPosObj.value = relLineTextToString(selectfeature.relLineText);
        markPosObj.group = group[4];
        markPosObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": relLineTextRows }};
    } else if(checkType(selectfeature)===true ){
        markPosObj.value = annotationToString(selectfeature.getTextPosition());
        markPosObj.group = group[4];
        markPosObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": annotationRows }};
    }


    //注记字体大小
    var fontSizeObj  = new Object();
    fontSizeObj.name = displayTextContentName[2];
    fontSizeObj.value = selectfeature.style.fontSize;
    fontSizeObj.group = group[4];
    fontSizeObj.editor = "text";

    //注记字体颜色
    var fontColorObj  = new Object();
    fontColorObj.name = displayTextContentName[3];
    fontColorObj.value = selectfeature.style.fontColor;
    fontColorObj.group = group[4];
    fontColorObj.editor = "colorpicker";

    //注记字体名称
    var fontFamilyObj  = new Object();
    fontFamilyObj.name = displayTextContentName[4];
    fontFamilyObj.value = selectfeature.style.fontFamily;
    fontFamilyObj.group = group[4];
    fontFamilyObj.editor = "text";

    //注记与标号的间距
    var fontSpaceObj  = new Object();
    fontSpaceObj.name = displayTextContentName[5];
    fontSpaceObj.value =  selectfeature.space;
    fontSpaceObj.group = group[4];
    fontSpaceObj.editor = "text";

    //标注框边框
    var textBoxTypeObj  = new Object();
    textBoxTypeObj.name = displayNameNew[11];
    textBoxTypeObj.group = group[4];
    if(selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXTBOX){
        textBoxTypeObj.value = textBoxTypeToString(selectfeature.textBoxType);
        textBoxTypeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": textBoxTypeRows }};
    }
    else if(selectfeature.symbolType === SuperMap.Plot.SymbolType.LINEMARKING){
        textBoxTypeObj.value = lineMarkingTypeToString(selectfeature.textBoxType);
        textBoxTypeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": lineMarkingTypeRows }};
    }

    //圆角边框
    var roundBoxObj  = new Object();
    roundBoxObj.name = displayNameNew[12];
    roundBoxObj.group = group[4];
    if(selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXTBOX){
        roundBoxObj.value = checkboxValueToString(selectfeature.getRoundBox());
        roundBoxObj.editor = { "type": 'checkbox', "options":{ "on":true, "off":false }};
    }

    //对象标注框
    var symbolTextFrameObj  = new Object();
    symbolTextFrameObj.name = displayNameNew[14];
    symbolTextFrameObj.value = checkboxValueToString(selectfeature.addFrame);
    symbolTextFrameObj.group = group[4];
    symbolTextFrameObj.editor = { "type": 'checkbox', "options":{ "on":true, "off":false }};


    //衬线6：
    //衬线
    var surroundLineTypeObj  = new Object();
    surroundLineTypeObj.name = displaySurroundLineName[0];
    if(checkType(selectfeature)===true){
        surroundLineTypeObj.value = surroundLineTypeToString(selectfeature.symbolType, selectfeature.getSurroundLineType());
    }
    surroundLineTypeObj.group = group[6];
    surroundLineTypeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": surroundLineTypeRows }};

    //衬线宽
    var surroundLineWidthObj  = new Object();
    surroundLineWidthObj.name = displaySurroundLineName[1];
    surroundLineWidthObj.value = selectfeature.style.surroundLineWidth;
    surroundLineWidthObj.group = group[6];
    surroundLineWidthObj.editor = "text";


    //衬线色
    var surroundLineColorObj  = new Object();
    surroundLineColorObj.name =displaySurroundLineName[2];
    surroundLineColorObj.value = selectfeature.style.surroundLineColor;
    surroundLineColorObj.group = group[6];
    surroundLineColorObj.editor = "colorpicker";


    //衬线透明度
    var surroundLineColorOpaObj  = new Object();
    surroundLineColorOpaObj.name = displaySurroundLineName[3];
    surroundLineColorOpaObj.value = selectfeature.style.surroundLineColorOpacity;
    surroundLineColorOpaObj.group = group[6];
    surroundLineColorOpaObj.editor = "text";


    //文字9：
    //字体描边
    var fontStrokeObj  = new Object();
    fontStrokeObj.name = fontName[0];
    fontStrokeObj.value = checkboxValueToString(selectfeature.style.fontStroke);
    fontStrokeObj.group = group[9];
    fontStrokeObj.editor = { "type": 'checkbox', "options":{ "on":true, "off":false }};

    var fontStrokeColorObj  = new Object();
    fontStrokeColorObj.name = fontName[1];
    fontStrokeColorObj.value = selectfeature.style.fontStrokeColor;
    fontStrokeColorObj.group = group[9];
    fontStrokeColorObj.editor = "colorpicker";

    var fontStrokeWidthObj  = new Object();
    fontStrokeWidthObj.name = fontName[2];
    fontStrokeWidthObj.value = selectfeature.style.fontStrokeWidth;
    fontStrokeWidthObj.group = group[9];
    fontStrokeWidthObj.editor = "text";

    var fontBackObj  = new Object();
    fontBackObj.name = fontName[3];
    fontBackObj.value = checkboxValueToString(selectfeature.style.fontBackground);
    fontBackObj.group = group[9];
    fontBackObj.editor = { "type": 'checkbox', "options":{ "on":true, "off":false }};


    var fontBackColorObj  = new Object();
    fontBackColorObj.name = fontName[4];
    fontBackColorObj.value = selectfeature.style.fontBackgroundColor;
    fontBackColorObj.group = group[9];
    fontBackColorObj.editor = "colorpicker";


    var fontShadowObj  = new Object();
    fontShadowObj.name = fontName[5];
    fontShadowObj.value = checkboxValueToString(selectfeature.style.fontShadow);
    fontShadowObj.group = group[9];
    fontShadowObj.editor = { "type": 'checkbox', "options":{ "on":true, "off":false }};


    var fontShadowColorObj  = new Object();
    fontShadowColorObj.name = fontName[6];
    fontShadowColorObj.value = selectfeature.style.fontShadowColor;
    fontShadowColorObj.group = group[9];
    fontShadowColorObj.editor = "colorpicker";


    var fontShadowOffsetXObj  = new Object();
    fontShadowOffsetXObj.name = fontName[7];
    fontShadowOffsetXObj.value = selectfeature.style.fontShadowOffsetX;
    fontShadowOffsetXObj.group = group[9];
    fontShadowOffsetXObj.editor = "text";


    var fontShadowOffsetYObj  = new Object();
    fontShadowOffsetYObj.name = fontName[8];
    fontShadowOffsetYObj.value = selectfeature.style.fontShadowOffsetY;
    fontShadowOffsetYObj.group = group[9];
    fontShadowOffsetYObj.editor = "text";

    var fontSpaceObj1  = new Object();
    fontSpaceObj1.name = fontName[9];
    fontSpaceObj1.value = selectfeature.style.fontSpace;
    fontSpaceObj1.group = group[9];
    fontSpaceObj1.editor = "text";

    var fontPercentObj  = new Object();
    fontPercentObj.name = fontName[10];
    fontPercentObj.value = selectfeature.style.fontPercent;
    fontPercentObj.group = group[9];
    fontPercentObj.editor = "text";


    if(selectfeature.symbolType !== SuperMap.Plot.SymbolType.ROUTENODE &&
        selectfeature.symbolType !== SuperMap.Plot.SymbolType.LITERATESIGN){
        rows.push(visibilityObj);
    }


    if(selectfeature.symbolType !== SuperMap.Plot.SymbolType.TEXTSYMBOL &&
        selectfeature.symbolType !== SuperMap.Plot.SymbolType.SYMBOLTEXT){
        rows.push(lineWidthObj);
        rows.push(lineColorObj);
        if(selectfeature.symbolType !== SuperMap.Plot.SymbolType.GROUPOBJECT &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.AIRROUTE &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.NAVYROUTE &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.MISSILEROUTE &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.NAVYDEPLOYMENT &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.AIRDEPLOYMENT){
            rows.push(lineStyleObj);
            rows.push(lineOpaqueRateObj);
        }
    }

    if(checkType(selectfeature)===true && selectfeature.symbolType !== SuperMap.Plot.SymbolType.TEXTSYMBOL){
        rows.push(fillObj);
        rows.push(fillGradientModeObj);
        if(selectfeature.style.fillGradientMode !== "NONE"){
            rows.push(fillforeColorObj);
            rows.push(fillOpaqueRateObj);
            rows.push(fillBackColorObj);
            rows.push(fillBackOpacityObj);
        }else if(selectfeature.style.fillGradientMode === "NONE" && selectfeature.style.fill){
            rows.push(fillforeColorObj);
            rows.push(fillOpaqueRateObj);
        }
    }
    if(checkType(selectfeature)===true &&
        selectfeature.symbolType !== SuperMap.Plot.SymbolType.TEXTSYMBOL &&
        selectfeature.symbolType !== SuperMap.Plot.SymbolType.LITERATESIGN){
        rows.push(surroundLineTypeObj);
        rows.push(surroundLineColorObj);
        rows.push(surroundLineColorOpaObj);
        rows.push(surroundLineWidthObj);
    }


    if(selectfeatures.length===sameFeatures.length || selectfeatures.length===dotSelectFeatures.length ||selectfeatures.length===algoSelectFeatures.length) {
        if (selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXTBOX ||
            selectfeature.symbolType === SuperMap.Plot.SymbolType.LINEMARKING
        ) {
            rows.push(textBoxTypeObj);
            if (selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXTBOX){
                rows.push(roundBoxObj);
            }
        }

        //判断武警库线面标号带注记
        if(selectfeature.symbolType === SuperMap.Plot.SymbolType.ALGOSYMBOL &&
            selectfeature.textContent !== ""){
            rows.push(textContentObj);
        }else if (selectfeature.symbolType !== SuperMap.Plot.SymbolType.ROUTENODE &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.LITERATESIGN &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.AIRDEPLOYMENT &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.NAVYDEPLOYMENT &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.GROUPOBJECT &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.ALGOSYMBOL &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.BRACESYMBOL &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.LINERELATION &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.INTERFERENCEBEAM &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.SATELLITETIMEWINDOWS &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.RUNWAY &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.CURVEEIGHT &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.ARROWLINE &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.CONCENTRICCIRCLE &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.COMBINATIONALCIRCLE &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.FREECURVE &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.NODECHAIN &&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.AVOIDREGION&&
            selectfeature.symbolType !== SuperMap.Plot.SymbolType.FLAGGROUP
        ) {

            rows.push(textContentObj);
            if(selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT
                && selectfeature.symbolTexts.length == 2){
                rows.push(textContentObj2);
            }
            rows.push(fontSizeObj);
            rows.push(fontColorObj);
            rows.push(fontPercentObj);
            rows.push(fontFamilyObj);


            if (selectfeature.symbolType !== SuperMap.Plot.SymbolType.PATHTEXT) {
                rows.push(fontSpaceObj1);
                rows.push(fontStrokeObj);
                if (selectfeature.style.fontStroke === true) {
                    rows.push(fontStrokeColorObj);
                    rows.push(fontStrokeWidthObj);
                }
                rows.push(fontBackObj);
                rows.push(fontBackColorObj);
                rows.push(fontShadowObj);
                if (selectfeature.style.fontShadow === true) {
                    rows.push(fontShadowColorObj);
                    rows.push(fontShadowOffsetXObj);
                    rows.push(fontShadowOffsetYObj);
                }
            }
        }





        if (selectfeature.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL) {

            //军标大小1：
            var dotSymbolWidthObj = new Object();
            dotSymbolWidthObj.name = displayName[4];
            dotSymbolWidthObj.value = selectfeature.getSymbolSize().w;
            dotSymbolWidthObj.group = group[1];
            dotSymbolWidthObj.editor = "text";

            var dotSymbolHeightObj = new Object();
            dotSymbolHeightObj.name = displayName[5];
            dotSymbolHeightObj.value = selectfeature.getSymbolSize().h;
            dotSymbolHeightObj.group = group[1];
            dotSymbolHeightObj.editor = "text";

            //旋转角度
            var dotSymbolRotateObj  = new Object();
            dotSymbolRotateObj.name = displayName[0];
            dotSymbolRotateObj.value = selectfeature.getRotate();
            dotSymbolRotateObj.group = group[0];
            dotSymbolRotateObj.editor = "text";

            //随图缩放
            var dotScaleByMap  = new Object();
            dotScaleByMap.name = displayName[1];
            if(selectfeature.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
                dotScaleByMap.value = checkboxValueToString(selectfeature.getScaleByMap());
            }
            dotScaleByMap.group = group[0];
            dotScaleByMap.editor = { "type": 'checkbox', "options":{ "on":true, "off":false }};

            //镜像
            var dotSymbolNegativeImageObj  = new Object();
            dotSymbolNegativeImageObj.name = displayName[2];
            dotSymbolNegativeImageObj.value = checkboxValueToString(selectfeature.getNegativeImage());
            dotSymbolNegativeImageObj.group = group[0];
            dotSymbolNegativeImageObj.editor = { "type": 'checkbox', "options":{ "on":true, "off":false }};

            //标号级别
            var dotSymbolRankObj  = new Object();
            dotSymbolRankObj.name = displayName[3];
            dotSymbolRankObj.value = symbolRankToString(selectfeature.getSymbolRank());
            dotSymbolRankObj.group = group[0];
            dotSymbolRankObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": symbolRankRows }};


            //位置点偏移
            var dotPositionOffset  = new Object();
            dotPositionOffset.name = displayName[6];
            dotPositionOffset.value = checkboxValueToString(selectfeature.getPositionOffset());
            dotPositionOffset.group = group[0];
            dotPositionOffset.editor = { "type": 'checkbox', "options":{ "on":true, "off":false }};

            //偏移线类型
            var dotPositionOffsetType  = new Object();
            dotPositionOffsetType.name = displayName[7];
            dotPositionOffsetType.value = positionOffsetTypeToString(selectfeature.getPositionOffsetType());
            dotPositionOffsetType.group = group[0];
            dotPositionOffsetType.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": positionOffsetTypeRows }};
            rows.push(dotSymbolRotateObj);
            rows.push(dotSymbolNegativeImageObj);
            rows.push(dotSymbolRankObj);
            rows.push(dotSymbolWidthObj);
            rows.push(dotSymbolHeightObj);
            rows.push(markPosObj);


            if (selectfeature.textPosition !== 8) {
                rows.push(fontSpaceObj);
            }
            rows.push(dotScaleByMap);
            rows.push(dotPositionOffset);
            rows.push(dotPositionOffsetType);

        } else if (checkType(selectfeature) === true) {
            for (var i = 0; i < selectfeature.getSubSymbols().length; i++) {
                var objectSubCode = new Object();
                objectSubCode.name = "Code";
                objectSubCode.value = selectfeature.getSubSymbols()[i].code;
                objectSubCode.group = group[5];
                objectSubCode.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": subSymbolsTypeRows }};
                objectSubCode.index = i;
                rows.push(objectSubCode);
            }
            if((0 === selectfeature.getSubSymbols().length && selectfeature.libID === 0 && selectfeature.code === 1025)||
                (0 === selectfeature.getSubSymbols().length && selectfeature.libID === 100 && selectfeature.code === 25200)||
                (0 === selectfeature.getSubSymbols().length && selectfeature.libID === 100 && selectfeature.code === 3020901)
            ){
                var objectSubCode1 = new Object();
                objectSubCode1.name = "Code";
                objectSubCode1.value = subSymbolsTypeString(selectfeature.getSubSymbols().length,selectfeature);
                objectSubCode1.group = group[5];
                objectSubCode1.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": subSymbolsTypeRows }};
                objectSubCode1.index = i;
                rows.push(objectSubCode1);
            }
            if(selectfeature.code === 1025 && selectfeature.getSubSymbols().length > 0){
                var objectLibID = new Object();
                objectLibID.name = "LibID";
                objectLibID.value = libIDToString(selectfeature.getSubSymbols()[0].libID);
                objectLibID.group = group[5];
                objectLibID.editor = "text";
                rows.push(objectLibID);
            }

        }

        //复合箭头
        if (selectfeature.libID === 22 && selectfeature.code === 1016) {

            var arrowHeadTypeObj = new Object();
            arrowHeadTypeObj.name = "箭头";
            arrowHeadTypeObj.value = arrowHeadTypeToString(selectfeature.arrowHeadType);
            arrowHeadTypeObj.group = "组合类型";
            arrowHeadTypeObj.editor = {
                "type": 'combobox',
                "options": {"valueField": 'value', "textField": 'text', "data": arrowHeadTypeRows}
            };

            var arrowBodyTypeObj = new Object();
            arrowBodyTypeObj.name = "箭身";
            arrowBodyTypeObj.value = arrowBodyTypeToString(selectfeature.arrowBodyType);
            arrowBodyTypeObj.group = "组合类型";
            arrowBodyTypeObj.editor = {
                "type": 'combobox',
                "options": {"valueField": 'value', "textField": 'text', "data": arrowBodyTypeRows}
            };

            var arrowTailTypepeObj = new Object();
            arrowTailTypepeObj.name = "箭尾";
            arrowTailTypepeObj.value = arrowTailTypeToString(selectfeature.arrowTailType);
            arrowTailTypepeObj.group = "组合类型";
            arrowTailTypepeObj.editor = {
                "type": 'combobox',
                "options": {"valueField": 'value', "textField": 'text', "data": arrowTailTypeRows}
            };

            rows.push(arrowHeadTypeObj);
            rows.push(arrowBodyTypeObj);
            rows.push(arrowTailTypepeObj);

        }


        //箭头线
        if (selectfeature.symbolType === SuperMap.Plot.SymbolType.ARROWLINE) {
            var arrowTypeStartObj = new Object();
            arrowTypeStartObj.name = displayNameNew[0];
            arrowTypeStartObj.value = arrowTypeToString(selectfeature.getStartArrowType());
            arrowTypeStartObj.group = group[7];
            arrowTypeStartObj.editor = {
                "type": 'combobox',
                "options": {"valueField": 'value', "textField": 'text', "data": arrowTypeStart}
            };

            var arrowTypeEndObj = new Object();
            arrowTypeEndObj.name = displayNameNew[1];
            arrowTypeEndObj.value = arrowTypeToString(selectfeature.getEndArrowType());
            arrowTypeEndObj.group = group[7];
            arrowTypeEndObj.editor = {
                "type": 'combobox',
                "options": {"valueField": 'value', "textField": 'text', "data": arrowTypeEnd}
            };

            rows.push(arrowTypeStartObj);
            rows.push(arrowTypeEndObj);
        }

        //沿线注记
        if (selectfeature.symbolType === SuperMap.Plot.SymbolType.PATHTEXT) {
            var isAvoidObj = new Object();
            isAvoidObj.name = displayNameNew[2];
            isAvoidObj.value = checkboxValueToString(selectfeature.isAvoid);
            isAvoidObj.group = group[4];
            isAvoidObj.editor = {"type": 'checkbox', "options": {"on": true, "off": false}};

            var showPathLineObj = new Object();
            showPathLineObj.name = displayNameNew[3];
            showPathLineObj.value = showToString(selectfeature.showPathLine);
            showPathLineObj.group = group[4];
            showPathLineObj.editor = {
                "type": 'combobox',
                "options": {"valueField": 'value', "textField": 'text', "data": showRows}
            };


            var showPathLineArrowObj = new Object();
            showPathLineArrowObj.name = displayNameNew[13];
            showPathLineArrowObj.value = showToString(selectfeature.showPathLineArrow);
            showPathLineArrowObj.group = group[4];
            showPathLineArrowObj.editor = {
                "type": 'combobox',
                "options": {"valueField": 'value', "textField": 'text', "data": showRows}
            };

            var isCurveObj = new Object();
            isCurveObj.name = displayNameNew[4];
            isCurveObj.value = checkboxValueToString(selectfeature.isCurve);
            isCurveObj.group = group[4];
            isCurveObj.editor = {"type": 'checkbox', "options": {"on": true, "off": false}};


            var textToLineDistanceObj = new Object();
            textToLineDistanceObj.name = displayTextContentName[5];
            textToLineDistanceObj.value = selectfeature.textToLineDistance;
            textToLineDistanceObj.group = group[4];
            textToLineDistanceObj.editor = "text";

            rows.push(textToLineDistanceObj);
            rows.push(markPosObj);
            rows.push(showPathLineObj);
            rows.push(showPathLineArrowObj);
            rows.push(isCurveObj);

            if (selectfeature.relLineText === SuperMap.Plot.RelLineText.ONLINE)
                rows.push(isAvoidObj);
        }

        //对象标注
        if (selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT) {
            rows.push(symbolTextFrameObj);
            if (selectfeature.addFrame === true) {
                //线设置
                rows.push(lineWidthObj);
                rows.push(lineColorObj);
                rows.push(lineStyleObj);
                rows.push(lineOpaqueRateObj);

                //填充设置
                rows.push(fillObj);
                rows.push(fillforeColorObj);
                rows.push(fillOpaqueRateObj);
                rows.push(fillGradientModeObj);
                rows.push(fillBackColorObj);
                rows.push(fillBackOpacityObj);

            }

        }

        //对象标注1
        // if (selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT1) {
        //     //注记偏移量X
        //     var offsetXObj  = new Object();
        //     offsetXObj.name = displayNameNew[17];
        //     offsetXObj.value = selectfeature.offsetX;
        //     offsetXObj.group = group[4];
        //     offsetXObj.editor = "text";
        //
        //     //注记偏移量Y
        //     var offsetYObj  = new Object();
        //     offsetYObj.name = displayNameNew[18];
        //     offsetYObj.value = selectfeature.offsetY;
        //     offsetYObj.group = group[4];
        //     offsetYObj.editor = "text";
        //
        //     rows.push(fontSpaceObj);
        //     rows.push(offsetXObj);
        //     rows.push(offsetYObj);
        // }


        //扇形区域
        if (selectfeature.symbolType === SuperMap.Plot.SymbolType.ARCREGION) {

            if (selectfeature.radiusLineType != null) {
                var radiusLineTypeObj = new Object();
                radiusLineTypeObj.name = displayNameNew[5];
                radiusLineTypeObj.value = radiusTypeToString(selectfeature.radiusLineType);
                radiusLineTypeObj.group = group[8];
                radiusLineTypeObj.editor = {
                    "type": 'combobox',
                    "options": {"valueField": 'value', "textField": 'text', "data": radiusTypeRows}
                };

                rows.push(radiusLineTypeObj);
            }


            if (selectfeature.radiusText != null && selectfeature.radiusLineType != 0) {
                var upTextObj = new Object();
                upTextObj.name = displayNameNew[6];
                upTextObj.value = selectfeature.radiusText[0];
                upTextObj.group = group[8];
                upTextObj.editor = "text";

                var downTextObj = new Object();
                downTextObj.name = displayNameNew[7];
                downTextObj.value = selectfeature.radiusText[1];
                downTextObj.group = group[8];
                downTextObj.editor = "text";

                var radiusPosAngleObj = new Object();
                radiusPosAngleObj.name = displayNameNew[15];
                radiusPosAngleObj.value = selectfeature.radiusPosAngle;
                radiusPosAngleObj.group = group[8];
                radiusPosAngleObj.editor = "text";


                rows.push(upTextObj);
                rows.push(downTextObj);
                rows.push(radiusPosAngleObj);
            }

        }

        //卫星
        if (selectfeature.symbolType === SuperMap.Plot.SymbolType.SATELLITE) {
            var visibleObj = new Object();
            visibleObj.name = displayNameNew[8];
            visibleObj.value = showToString(selectfeature.visible);
            visibleObj.group = group[0];
            visibleObj.editor = {
                "type": 'combobox',
                "options": {"valueField": 'value', "textField": 'text', "data": showRows}
            };

            rows.push(visibleObj);
        }

        //航线
        if (selectfeature.symbolType === SuperMap.Plot.SymbolType.ROUTENODE) {
        // if (selectfeature.routeNode !== undefined) {
           var routeNodeTypeObj = new Object();
           routeNodeTypeObj.name = displayNameNew[9];
           routeNodeTypeObj.value = routeNodeTypeToString(selectfeature.routeNode.type);
           routeNodeTypeObj.group = group[2];
           routeNodeTypeObj.editor = {
               "type": 'combobox',
               "options": {"valueField": 'value', "textField": 'text', "data": routeNodeTypeRows}
           };

           var routeNodeRotate = new Object();
           routeNodeRotate.name = displayNameNew[10];
           routeNodeRotate.value = selectfeature.routeNode.rotate;
           routeNodeRotate.group = group[2];
           routeNodeRotate.editor = "text";


           rows.push(routeNodeTypeObj);
           if (selectfeature.routeNode.type === SuperMap.Plot.RouteNodeType.STANDBY) {
               rows.push(routeNodeRotate);
           }
        }


        //对象间连线
        if (selectfeature.symbolType ===  SuperMap.Plot.SymbolType.LINERELATION) {
           var lineRelationTypeObj = new Object();
           lineRelationTypeObj.name = displayNameNew[16];
           lineRelationTypeObj.value = lineRelationTypeToString(selectfeature.lineRelationType);
           lineRelationTypeObj.group = group[11];
           lineRelationTypeObj.editor = {
               "type": 'combobox',
               "options": {"valueField": 'value', "textField": 'text', "data": lineRelationTypeRows}
           };

           rows.push(lineRelationTypeObj);
        }

    }
    addExtendProperty(rows,selectfeature);

    return rows;
}


function addExtendProperty(rows,geometry) {

    //var extendProperty = geometry.getExtendProperty();
    //var nIndex = 0;
    //var property = extendProperty.getPropertyByIndex(nIndex);
    //
    //while(null != property)
    //{
    //    var propertyName  = property.getKey();
    //    var propertyValue = property.getValue();
    //
    //    var extendePropertyObj  = new Object();
    //    extendePropertyObj.name = propertyName;
    //    extendePropertyObj.value = propertyValue;
    //    extendePropertyObj.group = "自定义属性";
    //    extendePropertyObj.editor = "text";
    //    rows.push(extendePropertyObj);
    //
    //    nIndex++;
    //    property = extendProperty.getPropertyByIndex(nIndex);
    //}

}

//判断类型是否为新增对象
function checkType(selectfeature){
    if(selectfeature.symbolType === SuperMap.Plot.SymbolType.GROUPOBJECT ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.AIRROUTE ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.NAVYROUTE ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.MISSILEROUTE ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.ROUTENODE ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.NAVYDEPLOYMENT ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.AIRDEPLOYMENT ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT1 ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.FLAGGROUP ||
        selectfeature.symbolType === SuperMap.Plot.SymbolType.SATELLITE
    )
        return false;//新增对象
    else
        return true;//原有标号

}


function updateSelectFeature(updated, selectfeatures) {
    for(var i=0;i<selectfeatures.length;i++){
        if (updated != null) {
            switch(updated.name) {
                case displayName[0]:
                    selectfeatures[i].setRotate(parseFloat(updated.value));
                    break;
                case displayName[1]:
                    selectfeatures[i].setScaleByMap(fromCheckboxValue(updated.value));
                    break;
                case displayName[2]:
                    selectfeatures[i].setNegativeImage(fromCheckboxValue(updated.value));
                    break;
                case displayName[3]:
                    selectfeatures[i].setSymbolRank(updated.value);
                    break;
                case displayName[4]:
                    selectfeatures[i].setSymbolSize(updated.value, selectfeatures[i].getSymbolSize().h);
                    break;
                case displayName[5]:
                    selectfeatures[i].setSymbolSize(selectfeatures[i].getSymbolSize().w, updated.value);
                    break;
                case displayName[6]:
                    selectfeatures[i].setPositionOffset(fromCheckboxValue(updated.value));
                    break;
                case displayName[7]:
                    selectfeatures[i].setPositionOffsetType(parseInt(updated.value));
                    break;
                case displayName[8]:
                    selectfeatures[i].setLocked(fromCheckboxValue(updated.value));
                    break;
                case  displayName[9]:
                    selectfeatures[i].setStyle({display: updated.value});
                    break;
                case displayTextContentName[0]:
                    if (selectfeatures[i].symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT) {
                        selectfeatures[i].symbolTexts[0].textContent = updated.value;
                        selectfeatures[i].redraw();
                    } else if(selectfeatures[i].symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT1 ||
                        selectfeatures[i].symbolType ===SuperMap.Plot.SymbolType.PATHTEXT) {
                        var updatedValueStr=updated.value;
                        var textContent=updatedValueStr.split(",");
                        selectfeatures[i].setTextContent(textContent);
                    }else{
                        selectfeatures[i].setTextContent(updated.value);
                    }
                    break;
                case displayTextContentName[0] + "2":
                    selectfeatures[i].symbolTexts[1].textContent = updated.value;
                    selectfeatures[i].redraw();
                    break;
                case displayTextContentName[1]:
                    if (selectfeatures[i].symbolType === SuperMap.Plot.SymbolType.PATHTEXT) {
                        selectfeatures[i].setRelLineText(parseInt(updated.value));
                    } else {
                        selectfeatures[i].setTextPosition(parseInt(updated.value));
                    }
                    break;
                case displayTextContentName[2]:
                    selectfeatures[i].setStyle({fontSize: parseFloat(updated.value)});
                    break;
                case displayTextContentName[3]:
                    selectfeatures[i].setStyle({fontColor: updated.value});
                    break;
                case displayTextContentName[4]:
                    selectfeatures[i].setStyle({fontFamily: updated.value});
                    break;
                case displayTextContentName[5]:
                    if(selectfeatures[i].symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT1){
                        selectfeatures[i].space = updated.value;
                    }else{
                        selectfeatures[i].setSpace(parseInt(updated.value));
                    }
                    break;
                case displayLineStyleName[0]:
                    selectfeatures[i].setStyle({weight: parseInt(updated.value)});
                    break;
                case displayLineStyleName[1]:
                    selectfeatures[i].setStyle({color: updated.value});
                    break;
                case displayLineStyleName[2]:
                {
                    var opacity = parseFloat(updated.value) < 0 ? 0 : parseFloat(updated.value);
                    opacity = parseFloat(updated.value) > 1 ? 1 : parseFloat(updated.value);
                    selectfeatures[i].setStyle({opacity: opacity});
                }
                    break;
                case displayLineStyleName[3]:
                    selectfeatures[i].setStyle({lineSymbolID: updated.value});
                    break;
                case displaySurroundLineName[0]:
                    selectfeatures[i].setSurroundLineType(parseInt(updated.value));
                    break;
                case displaySurroundLineName[1]:
                    selectfeatures[i].setStyle({surroundLineWidth: parseInt(updated.value)});
                    break;
                case displaySurroundLineName[2]:
                    selectfeatures[i].setStyle({surroundLineColor: updated.value});
                    break;
                case displaySurroundLineName[3]:
                {
                    var opacity = parseFloat(updated.value) < 0 ? 0 : parseFloat(updated.value);
                    opacity = parseFloat(updated.value) > 1 ? 1 : parseFloat(updated.value);
                    selectfeatures[i].setStyle({surroundLineColorOpacity: opacity});
                }
                    break;
                case displayFillStyleName[0]:
                    selectfeatures[i].style.fill = fromCheckboxValue(updated.value);
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                    break;
                case displayFillStyleName[1]:
                    selectfeatures[i].style.fillColor = updated.value;
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                    break;
                case displayFillStyleName[2]:
                {
                    var opacity = parseFloat(updated.value) < 0 ? 0 : parseFloat(updated.value);
                    opacity = parseFloat(updated.value) > 1 ? 1 : parseFloat(updated.value);
                    selectfeatures[i].style.fillOpacity = opacity;
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                }
                    break;
                case displayFillStyleName[3]:
                    selectfeatures[i].style.fillGradientMode = updated.value;
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                    //}
                    break;
                case displayFillStyleName[4]:
                    selectfeatures[i].style.fillBackColor = updated.value;
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                    break;
                case displayFillStyleName[5]:
                {
                    var opacity = parseFloat(updated.value) < 0 ? 0 : parseFloat(updated.value);
                    opacity = parseFloat(updated.value) > 1 ? 1 : parseFloat(updated.value);
                    selectfeatures[i].style.fillBackOpacity = opacity;
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                }
                    break;
                case fontName[0]:
                    selectfeatures[i].style.fontStroke = fromCheckboxValue(updated.value);
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                    break;
                case fontName[1]:
                    selectfeatures[i].style.fontStrokeColor = updated.value;
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                    break;
                case fontName[2]:
                    selectfeatures[i].style.fontStrokeWidth = parseInt(updated.value);
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                    break;
                case fontName[3]:
                    selectfeatures[i].style.fontBackground = fromCheckboxValue(updated.value);
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                    break;
                case fontName[4]:
                    selectfeatures[i].style.fontBackgroundColor = updated.value;
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                    break;
                case fontName[5]:
                    selectfeatures[i].style.fontShadow = fromCheckboxValue(updated.value);
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                    break;
                case fontName[6]:
                    selectfeatures[i].style.fontShadowColor = updated.value;
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                    break;
                case fontName[7]:
                    selectfeatures[i].style.fontShadowOffsetX = parseInt(updated.value);
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                    break;
                case fontName[8]:
                    selectfeatures[i].style.fontShadowOffsetY = parseInt(updated.value);
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                    break;
                case fontName[9]:
                    selectfeatures[i].style.fontSpace = parseInt(updated.value);
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                    break;
                case fontName[10]:
                    selectfeatures[i].style.fontPercent = parseInt(updated.value);
                    selectfeatures[i].setStyle(selectfeatures[i].style);
                    break;
                case displayNameNew[0]:
                    selectfeatures[i].setStartArrowType(parseInt(updated.value));
                    break;
                case displayNameNew[1]:
                    selectfeatures[i].setEndArrowType(parseInt(updated.value));
                    break;
                case displayNameNew[2]:
                    selectfeatures[i].setAvoidLine(fromCheckboxValue(updated.value));
                    break;
                case displayNameNew[3]:
                    selectfeatures[i].setShowPathLine(fromCheckboxValue(updated.value));
                    break;
                case displayNameNew[4]:
                    selectfeatures[i].setCurveLine(fromCheckboxValue(updated.value));
                    break;
                case displayNameNew[5]:
                    selectfeatures[i].setRadiusLineType(parseInt(updated.value));
                    break;
                case displayNameNew[6]:
                    selectfeatures[i].setRadiusText(updated.value, 0);
                    break;
                case displayNameNew[7]:
                    selectfeatures[i].setRadiusText(updated.value, 1);
                    break;
                case displayNameNew[15]:
                    selectfeatures[i].setRadiusTextPos(updated.value);
                    break;
                case displayNameNew[8]:
                    selectfeatures[i].setVisible(fromCheckboxValue(updated.value));
                    break;
                case displayNameNew[9]:
                    selectfeatures[i].setType(updated.value);
                    break;
                case displayNameNew[10]:
                    selectfeatures[i].setRotate(parseFloat(updated.value));
                    break;
                case displayNameNew[11]:
                    selectfeatures[i].setTextBoxType(parseInt(updated.value));
                    break;
                case displayNameNew[12]:
                    selectfeatures[i].setRoundBox(fromCheckboxValue(updated.value));
                    break;
                case displayNameNew[13]:
                    selectfeatures[i].setShowPathLineArrow(fromCheckboxValue(updated.value));
                    break;
                case displayNameNew[14]:
                    selectfeatures[i].setFrame(fromCheckboxValue(updated.value));
                    break;
                case "箭头":
                    selectfeatures[i].setArrowHeadType(parseInt(updated.value));
                    break;
                case "箭身":
                    selectfeatures[i].setArrowBodyType(parseInt(updated.value));
                    break;
                case "箭尾":
                    selectfeatures[i].setArrowTailType(parseInt(updated.value));
                    break;
                case displayNameNew[16]:
                    selectfeatures[i].setLineRelationType(parseInt(updated.value));
                    break;
                // case displayNameNew[17]:
                //     selectfeatures[i].offsetX = updated.value;
                //     break;
                // case displayNameNew[18]:
                //     selectfeatures[i].offsetY = updated.value;
                //     break;
            }

            if (updated.group == group[5]) {
                if (updated.name == "LibID") {
                    if(updated.value !== null){
                        selectfeatures[i].subSymbols[0].libID = parseInt(updated.value);
                    }
                }
                if (updated.name == "Code") {
                    var code = parseInt(updated.value);
                    if(selectfeatures[i].symbolType === SuperMap.Plot.SymbolType.NODECHAIN && code != null) {
                        var symbolLibManager = L.supermap.plotting.symbolLibManager(serverUrl);
                        var subCode = symbolLibManager.findSymbolByCode(code);
                        if(subCode.length !== 0 && subCode[0].symbolType === "SYMBOL_DOT"){
                            selectfeatures[i].setSubSymbol(code, updated.index, subCode[0].libID);
                        }
                    }
                    else if (code !== null) {
                        selectfeatures[i].setSubSymbol(code, updated.index);
                    }
                }
            }
        }

        //SuperMap.Plot.AnalysisSymbol.setStyle(selectfeatures[i].style, selectfeatures[i].symbolData);

    }
}

function getAnnotationRows(geometry){
    var annotations = [];
    annotations.push({"value": "0", "text": "左上"});
    annotations.push({"value": "1", "text": "左下"});
    annotations.push({"value": "2", "text": "右上"});
    annotations.push({"value": "3", "text": "右下"});
    annotations.push({"value": "4", "text": "上"});
    annotations.push({"value": "5", "text": "下"});
    annotations.push({"value": "6", "text": "左"});
    annotations.push({"value": "7", "text": "右"});
    if(geometry.symbolData && geometry.symbolData.middleMarkExist)
        annotations.push({"value": "8", "text": "中间"});
    return annotations;
}

function getRelLineTextRows(){
    var annotations = [];

    annotations.push({"value": "0", "text": "线上"});
    annotations.push({"value": "1", "text": "线左"});
    annotations.push({"value": "2", "text": "线右"});
    annotations.push({"value": "3", "text": "双侧"});

    return annotations;
}

function relLineTextToString(relLineText) {
    if(relLineText === SuperMap.Plot.RelLineText.ONLINE)
        return "线上";
    else if(relLineText === SuperMap.Plot.RelLineText.ONLEFTLINE)
        return "线左";
    else if(relLineText === SuperMap.Plot.RelLineText.ONRIGHTLINE)
        return "线右";
    else if(relLineText === SuperMap.Plot.RelLineText.ONBOTHLINE)
        return "双侧";
}


function getSymbolRankRows(geometry) {
    var symbolRanks = [];
    if(geometry.symbolData && geometry.symbolData.symbolRanks){
        symbolRanks = geometry.symbolData.symbolRanks;
    }

    var rows = [];
    rows.push({"value": "0", "text": "无级别"});
    for(var i = 0; i < symbolRanks.length; i++)
    {
        if(symbolRanks[i] == 1)
            rows.push({"value": "1", "text": "军区级"});
        else if(symbolRanks[i] == 2)
            rows.push({"value": "2", "text": "副大军区级"});
        else if(symbolRanks[i] == 3)
            rows.push({"value": "3", "text": "集团军级"});
        else if(symbolRanks[i] == 4)
            rows.push({"value": "4", "text": "师级"});
        else if(symbolRanks[i] == 5)
            rows.push({"value": "5", "text": "旅级"});
        else if(symbolRanks[i] == 6)
            rows.push({"value": "6", "text": "团级"});
        else if(symbolRanks[i] == 7)
            rows.push({"value": "7", "text": "营级"});
        else if(symbolRanks[i] == 8)
            rows.push({"value": "8", "text": "连级"});
        else if(symbolRanks[i] == 9)
            rows.push({"value": "9", "text": "排级"});
    }

    return rows;
}

function getSurroundLineTypeRows(symbolType) {
    var rows = [];

    if(symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
        rows.push({"value": "0", "text": "无衬线"});
        rows.push({"value": "1", "text": "有衬线"});
    } else {
        rows.push({"value": "0", "text": "无衬线"});
        rows.push({"value": "1", "text": "内侧衬线"});
        rows.push({"value": "2", "text": "外侧衬线"});
        rows.push({"value": "3", "text": "双侧衬线"});
    }

    return rows;
}

function getDisplayRows() {
    var rows = [];

    rows.push({"value": "display", "text": "显示"});
    rows.push({"value": "none", "text": "不显示"});

    return rows;
}

function getShowRows() {
    var rows = [];

    rows.push({"value": "true", "text": "显示"});
    rows.push({"value": "false", "text": "不显示"});

    return rows;
}


function getFillGradientModeRows() {
    var rows = [];

    rows.push({"value": "NONE", "text": "无渐变"});
    rows.push({"value": "LINEAR", "text": "线性渐变"});
    rows.push({"value": "RADIAL", "text": "辐射渐变"});

    return rows;
}

function getLineStyleRows() {
    var rows = [];
    rows.push({"value": "0", "text": "实线"});//实线(solid)
    rows.push({"value": "1", "text": "长虚线"});//长虚线(longdash) //虚线(dash)
    rows.push({"value": "2", "text": "由点构成的直线"});//由点构成的直线(dot)
    rows.push({"value": "3", "text": "由线划线段组成的直线"});//由线划线段组成的直线(dashdot)(longdashdot)
    rows.push({"value": "4", "text": "由重复的线划点图案构成的直线"});//由重复的划线点图案构成的直线
    //rows.push({"value": "5", "text": "无边线"});
    return rows;
}

function lineStyleToString(lineStyle) {
    if(lineStyle == 1)
        return "长虚线";
    else if(lineStyle == 2)
        return "由点构成的直线";
    else if(lineStyle == 3)
        return "由线划线段组成的直线";
    else if(lineStyle == 4)
        return "由重复的线划点图案构成的直线";
    else if(lineStyle == 0)
        return "实线";
    else if(lineStyle)
        return "实线";
}

function getLineRelationTypeRows() {
    var rows = [];


    rows.push({"value": "0", "text": "实直线"});
    rows.push({"value": "1", "text": "虚直线"});
    rows.push({"value": "2", "text": "箭头线"});

    return rows;
}

function lineRelationTypeToString(lineRelationType) {

    if (lineRelationType == 0)
        return "实直线";
    else if (lineRelationType == 1)
        return "虚直线";
    else if (lineRelationType == 2)
        return "箭头线";
}

function getRouteNodeTypeRows() {
    var rows = [];

    rows.push({"value": "AIMING", "text": "瞄准点"});
    rows.push({"value": "COMMONROUTE", "text": "普通航路点"});
    rows.push({"value": "EXPANDING", "text": "展开点"});
    rows.push({"value": "INITIAL", "text": "初始点"});
    rows.push({"value": "LANCH", "text": "发射点"});
    rows.push({"value": "RENDEZVOUS", "text": "会合点"});
    rows.push({"value": "STANDBY", "text": "待机点"});
    rows.push({"value": "SUPPLY", "text": "补给点"});
    rows.push({"value": "TAKEOFF", "text": "起飞点"});
    rows.push({"value": "TURNING", "text": "转弯点"});
    rows.push({"value": "VISUALINITAL", "text": "可视初始点"});
    rows.push({"value": "VOLLEY", "text": "齐射点"});
    rows.push({"value": "WEAPONLAUNCH", "text": "武器发射点"});
    rows.push({"value": "TARGET", "text": "目标点"});
    rows.push({"value": "ATTACK", "text": "攻击点"});
    rows.push({"value": "SUPPRESS", "text": "压制点"});
    rows.push({"value": "EIGHTSPIRAL", "text": "八字盘旋点"});
    rows.push({"value": "HAPPYVALLEY", "text": "跑马圈点"});

    return rows;
}

function routeNodeTypeToString(routeNodeType) {
    if (routeNodeType === SuperMap.Plot.RouteNodeType.AIMING)
        return "瞄准点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.COMMONROUTE)
        return "普通航路点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.EXPANDING)
        return "展开点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.INITIAL)
        return "初始点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.LANCH)
        return "发射点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.RENDEZVOUS)
        return "会合点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.STANDBY)
        return "待机点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.SUPPLY)
        return "补给点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.TAKEOFF)
        return "起飞点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.TURNING)
        return "转弯点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.VISUALINITAL)
        return "可视初始点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.VOLLEY)
        return "齐射点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.WEAPONLAUNCH)
        return "武器发射点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.TARGET)
        return "目标点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.ATTACK)
        return "攻击点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.SUPPRESS)
        return "压制点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.EIGHTSPIRAL)
        return "八字盘旋点";
    else if (routeNodeType == SuperMap.Plot.RouteNodeType.HAPPYVALLEY)
        return "跑马圈点";
}

function getArrowTypeRows() {
    var rows = [];

    rows.push({"value": "0", "text": "双线箭头"});
    rows.push({"value": "1", "text": "实心三角形"});
    rows.push({"value": "2", "text": "无箭头"});

    return rows;
}


function arrowTypeToString(arrowType) {
    if (arrowType == 0)
        return "双线箭头";
    else if (arrowType == 1)
        return "实心三角形";
    else if (arrowType == 2)
        return "无箭头";
}

function getRadiusTypeRows() {
    var rows = [];

    rows.push({"value": "0", "text": "不显示"});
    rows.push({"value": "1", "text": "直线"});
    rows.push({"value": "2", "text": "箭头线"});

    return rows;
}

function radiusTypeToString(radiusType) {
    if (radiusType == 0)
        return "不显示";
    else if (radiusType == 1)
        return "直线";
    else if (radiusType == 2)
        return "箭头线";
}

function annotationToString(annotation) {
    if(annotation === 0)
        return "左上";
    else if(annotation === 1)
        return "左下";
    else if(annotation === 2)
        return "右上";
    else if(annotation === 3)
        return "右下";
    else if(annotation === 4)
        return "上";
    else if(annotation === 5)
        return "下";
    else if(annotation === 6)
        return "左";
    else if(annotation === 7)
        return "右";
    else if(annotation === 8)
        return "中间";
}

function symbolRankToString(symbolRank) {
    if(symbolRank == 0)
        return "无级别";
    else if(symbolRank == 1)
        return "军区级";
    else if(symbolRank == 2)
        return "副大军区级";
    else if(symbolRank == 3)
        return "集团军级";
    else if(symbolRank == 4)
        return "师级";
    else if(symbolRank == 5)
        return "旅级";
    else if(symbolRank == 6)
        return "团级";
    else if(symbolRank == 7)
        return "营级";
    else if(symbolRank == 8)
        return "连级";
    else if(symbolRank == 9)
        return "排级";
}

function surroundLineTypeToString(symbolType, surroundLineType) {
    if(symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
        if(surroundLineType === 0)
            return "无衬线";
        else if(surroundLineType === 1)
            return "有衬线";
    } else {
        if(surroundLineType === 0)
            return "无衬线";
        else if(surroundLineType === 1)
            return "内侧衬线";
        else if(surroundLineType === 2)
            return "外侧衬线";
        else if(surroundLineType === 3)
            return "双侧衬线";
    }
}

function displayToString(display) {
    if(display &&display === "none"){
        return "不显示";
    }
    return "显示";
}

function fillGradientModeToString(fillGradientMode) {
    if(fillGradientMode === "NONE"){
        return "无渐变";
    } else if(fillGradientMode === "LINEAR"){
        return "线性渐变";
    } else if(fillGradientMode === "RADIAL"){
        return "辐射渐变";
    } else {
        return "无渐变";
    }
}

function showToString(show){
    if(show === true){
        return "显示";
    } else if(show === false){
        return "不显示";
    }
}


function checkboxValueToString(checkboxValue){
    if(checkboxValue === true){
        return "true";
    } else if(checkboxValue === false){
        return "false";
    }
}

function fromCheckboxValue(checkboxStr){
    if(checkboxStr === "true"){
        return true;
    } else if(checkboxStr === "false"){
        return false;
    }

}

//偏移线类型
function getPositionOffsetTypeRows() {
    var rows = [];

    rows.push({"value": "0", "text": "直线"});
    rows.push({"value": "1", "text": "线粗渐变"});

    return rows;
}
//偏移线类型
function positionOffsetTypeToString(positionOffsetType) {
    if(positionOffsetType === 0){
        return "直线";
    } else if(positionOffsetType === 1){
        return "线粗渐变";
    }
}

//注记框类型
function getTextBoxTypeRows() {
    var rows = [];

    rows.push({"value": "0", "text": "带角矩形边框"});
    rows.push({"value": "1", "text": "矩形边框"});
    rows.push({"value": "3", "text": "无边框"});

    return rows;
}

function textBoxTypeToString(textBoxType) {
    if (textBoxType == 0)
        return "带角矩形边框";
    else if (textBoxType == 1)
        return "矩形边框";
    else if (textBoxType == 3)
        return "无边框";
}

//线型标注框类型
function getLineMarkingTypeRows() {
    var rows = [];

    rows.push({"value": "1", "text": "矩形边框"});
    rows.push({"value": "2", "text": "线型底边"});

    return rows;
}

function lineMarkingTypeToString(lineMarkingType) {
    if(lineMarkingType === 1){
        return "矩形边框";
    } else if(lineMarkingType === 2){
        return "线型底边";
    }
}

//复合箭头--箭头
function getArrowHeadTypeRows() {
    var rows = [];

    rows.push({"value": "0", "text": "双线箭头"});
    rows.push({"value": "1", "text": "无箭头"});
    rows.push({"value": "2", "text": "燕尾箭头"});
    rows.push({"value": "3", "text": "实心三角形"});


    return rows;
}

function arrowHeadTypeToString(arrowHeadType) {
    if (arrowHeadType == 0)
        return "双线箭头";
    else if (arrowHeadType == 1)
        return "无箭头";
    else if (arrowHeadType == 2)
        return "燕尾箭头";
    else if (arrowHeadType == 3)
        return "实心三角形";

}

//复合箭头--箭身：arrowBodyType
//0--折线，1--贝塞尔曲线
function getArrowBodyTypeRows() {
    var rows = [];

    rows.push({"value": "0", "text": "折线"});
    rows.push({"value": "1", "text": "贝塞尔曲线"});
    return rows;
}

function arrowBodyTypeToString(arrowBodyType) {
    if (arrowBodyType == 0)
        return "折线";
    else if (arrowBodyType == 1)
        return "贝塞尔曲线";

}

//复合箭头--箭尾：arrowTailType
//0--无箭尾，1--直线,3--双线
function getArrowTailTypeRows() {
    var rows = [];

    rows.push({"value": "0", "text": "无箭尾"});
    rows.push({"value": "1", "text": "直线箭尾"});
    rows.push({"value": "3", "text": "双线箭尾"});
    return rows;
}

function arrowTailTypeToString(arrowTailType) {
    if (arrowTailType == 0)
        return "无箭尾";
    else if (arrowTailType == 1)
        return "直线箭尾";
    else if (arrowTailType == 3)
        return "双线箭尾";

}

function libIDToString(libID) {
    if (libID == 421)
        return "421(警用库)";
    else if (libID == 100)
        return "100(军队库)";
    else if (libID == 123)
        return "123(武警库)";
    else if (libID == 900)
        return "900(人防库)";
}

function subSymbolsTypeString(subSymbolsLength,geometry){
    if(subSymbolsLength===0){
        return "";
    }else {
        if(geometry.libID===100){
            if(geometry.getSubSymbols()[0].code === 100){
                return "陆军";
            }else if(geometry.getSubSymbols()[0].code === 200){
                return "海军";
            }else if(geometry.getSubSymbols()[0].code === 300) {
                return "空军";
            }
        }else if(geometry.libID===123){
            if(geometry.getSubSymbols()[0].code === 10101){
                return "武装警察部队";
            }else if(geometry.getSubSymbols()[0].code === 10102){
                return "防爆装甲";
            }else if(geometry.getSubSymbols()[0].code === 10103) {
                return "火炮";
            }

        }else if(geometry.libID===900){
            if(geometry.getSubSymbols()[0].code === 910200){
                return "人民防空重点城市";
            }else if(geometry.getSubSymbols()[0].code === 910300){
                return "人民防空基本指挥所";
            }else if(geometry.getSubSymbols()[0].code === 910402) {
                return "水路抢修专业队";
            }

        }else if(geometry.libID===0){
            if(geometry.getSubSymbols()[0].code === 9){
                return "刑警";
            }else if(geometry.getSubSymbols()[0].code === 80103){
                return "交警";
            }else if(geometry.getSubSymbols()[0].code === 80109){
                return "专业警";
            }

        }


    }

}

function getSubSymbolsTypeRows(geometry){
    var rows = [];
    rows.push({"value": "0", "text": ""});
    if(geometry.libID===100){
        rows.push({"value": "100", "text": "陆军"});
        rows.push({"value": "200", "text": "海军"});
        rows.push({"value": "300", "text": "空军"});
    }else if(geometry.libID===123){
        rows.push({"value": "10101", "text": "武装警察部队"});
        rows.push({"value": "10102", "text": "防爆装甲"});
        rows.push({"value": "10103", "text": "火炮"});
    }else if(geometry.libID===900){
        rows.push({"value": "910200", "text": "人民防空重点城市"});
        rows.push({"value": "910300", "text": "人民防空基本指挥所"});
        rows.push({"value": "910402", "text": "水路抢修专业队"});
    }else if(geometry.libID===0){
        rows.push({"value": "9", "text": "刑警"});
        rows.push({"value": "80103", "text": "交警"});
        rows.push({"value": "80109", "text": "专业警"});
    }

    return rows;
}
