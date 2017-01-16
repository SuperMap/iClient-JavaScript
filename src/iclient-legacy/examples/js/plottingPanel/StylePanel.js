
/**
 *
 * Class: SuperMap.Plotting.StylePanel
 * 属性面板类。
 *
 */
SuperMap.Plotting.StylePanel = new SuperMap.Class({

    displayName: [
        "旋转角度","随图缩放","镜像","标号级别",
        "Width", "Height",
        "线宽","线颜色","透明度",
        "填充","填充色","填充透明度",
        "注记内容", "注记位置", "注记大小", "注记颜色", "注记字体",
        "衬线类型", "衬线宽","衬线颜色","衬线透明度",
        "注记距离"
    ],

    group: ["基本", "军标大小", "线形", "填充", "注记", "子标号", "衬线"],

    /**
     * Property: editLayers
     * {<SuperMap.Layer.PlottingLayer>} 标绘图层数组
     */
    editLayers: [],

    /**
     * Property: selectFeature
     * {<SuperMap.Feature.Vector>} 要修改的要素
     */
    selectFeature: null,

    /**
     * Constructor: SuperMap.Plotting.StylePanel
     * 标号库管理类。
     *
     * Parameters:
     * div - {String} 属性面板div
     *
     * Returns:
     * {<SuperMap.Plotting.StylePanel>}  结果类型对象。
     */
    initialize : function(div){
        function afterModifySelectFeature(rowIndex, rowData, changes){
            var updated = $('#pg').propertygrid('getChanges', "updated");
            if(updated.length !== 0){
                me.updateSelectFeature(updated[0], me.selectFeature);
                //绘制符号及控制点
                if(me.selectFeature.layer.renderer.CLASS_NAME === "SuperMap.Renderer.Canvas2"){
                    me.selectFeature.layer.redraw();
                } else {
                    me.selectFeature.layer.drawFeature(me.selectFeature);
                }
                rows = me.collectionPropertyGridRows(me.selectFeature);
                $('#pg').propertygrid('loadData', rows);
            }
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

        var me = this;
    },

    /**
     * APIMethod: addEditLayer
     * 添加标绘图层
     *
     * Parameters:
     * editLayer - {<SuperMap.Layer.PlottingLayer>}标绘图层
     *
     * Returns:
     */
    addEditLayer: function(editLayer){
        for(var i = 0 ; i < this.editLayers.length; i++)
        {
            if(editLayer === this.editLayers[i]){
                return;
            }
        }

        editLayer.events.register("featureselected", this, this.showFeatureProperty);
        editLayer.events.register("featuremodified", this, this.showFeatureProperty);
        editLayer.events.register("afterfeaturemodified", this, this.hideFeatureProperty);
    },

    /**
     * APIMethod: removeEditLayer
     * 移除标绘图层
     *
     * Parameters:
     * editLayer - {<SuperMap.Layer.PlottingLayer>}标绘图层
     *
     * Returns:
     */
    removeEditLayer : function(editLayer)
    {
        for(var i = 0; i < this.editLayers.length; i++)
        {
            if(editLayer === this.editLayers[i])
            {
                this.editLayers[i].events.unregister("featureselected", this, this.showFeatureProperty);
                this.editLayers[i].events.unregister("featuremodified", this, this.showFeatureProperty);
                this.editLayers[i].events.unregister("afterfeaturemodified", this, this.hideFeatureProperty);
                this.editLayers.slice(i,1);
                break;
            }
        }
    },

    showFeatureProperty: function(selectFeatueEvt)
    {
        this.selectFeature = selectFeatueEvt.feature;
        if(this.selectFeature !== null){
            var rows = this.collectionPropertyGridRows(this.selectFeature);
            $('#pg').propertygrid('loadData', rows);
        }

        SuperMap.Event.stop(selectFeatueEvt);
    },

    hideFeatureProperty: function(selectFeatueEvt)
    {
        this.selectFeature = null;
        var rows = [];
        $('#pg').propertygrid('loadData', rows);

        SuperMap.Event.stop(selectFeatueEvt);
    },

    collectionPropertyGridRows: function(selectfeature)
    {
        if(selectfeature === null)
            return [];

        var rows = [
            { "name": "标号几何ID", "value":selectfeature.geometry.symbolType, "group": "标号" },
            { "name": "标号库ID", "value": selectfeature.geometry.libID, "group": "标号" },
            { "name": "标号Code", "value": selectfeature.geometry.code, "group": "标号" },
            { "name": "标号名字", "value": selectfeature.geometry.symbolName, "group": "标号" }
        ];

        var annotationRows = this.getAnnotationRows(selectfeature.geometry);
        var symbolRankRows = this.getSymbolRankRows(selectfeature.geometry);
        var surroundLineTypeRows = this.getSurroundLineTypeRows(selectfeature.geometry.symbolType);
        var displayRows = this.getDisplayRows();
        var fillGradinetRows = this.getFillGradientModeRows();

        var dotSymbolRotateObj  = new Object();
        dotSymbolRotateObj.name = this.displayName[0];
        dotSymbolRotateObj.value = selectfeature.geometry.getRotate();
        dotSymbolRotateObj.group = this.group[0];
        dotSymbolRotateObj.editor = "text";


        var dotScaleByMap  = new Object();
        dotScaleByMap.name = this.displayName[1];
        if(selectfeature.geometry.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
            dotScaleByMap.value = this.checkboxValueToString(selectfeature.geometry.getScaleByMap());
        }
        dotScaleByMap.group = this.group[0];
        dotScaleByMap.editor = { "type": 'checkbox', "options":{ "on":true, "off":false }};

        var dotSymbolNegativeImageObj  = new Object();
        dotSymbolNegativeImageObj.name = this.displayName[2];
        dotSymbolNegativeImageObj.value = this.checkboxValueToString(selectfeature.geometry.getNegativeImage());
        dotSymbolNegativeImageObj.group = this.group[0];
        dotSymbolNegativeImageObj.editor = { "type": 'checkbox', "options":{ "on":true, "off":false }};

        var dotSymbolRankObj  = new Object();
        dotSymbolRankObj.name = this.displayName[3];
        dotSymbolRankObj.value = this.symbolRankToString(selectfeature.geometry.getSymbolRank());
        dotSymbolRankObj.group = this.group[0];
        dotSymbolRankObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": symbolRankRows }};


        var dotPositionOffset  = new Object();
        dotPositionOffset.name = "位置点偏移";
        if(selectfeature.geometry.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
            dotPositionOffset.value = this.checkboxValueToString(selectfeature.geometry.getPositionOffset());
        }
        dotPositionOffset.group = this.group[0];
        dotPositionOffset.editor = { "type": 'checkbox', "options":{ "on":true, "off":false }};

        var lineWidthObj  = new Object();
        lineWidthObj.name = this.displayName[6];
        lineWidthObj.value = selectfeature.style.strokeWidth;
        lineWidthObj.group = this.group[2];
        lineWidthObj.editor = "text";

        var lineColorObj  = new Object();
        lineColorObj.name = this.displayName[7];
        lineColorObj.value = selectfeature.style.strokeColor;
        lineColorObj.group = this.group[2];
        lineColorObj.editor = "colorpicker";

        var lineOpaqueRateObj  = new Object();
        lineOpaqueRateObj.name = this.displayName[8];
        lineOpaqueRateObj.value = selectfeature.style.strokeOpacity;
        lineOpaqueRateObj.group = this.group[2];
        lineOpaqueRateObj.editor = "text";

        var fillObj  = new Object();
        fillObj.name = this.displayName[9];
        fillObj.value = this.checkboxValueToString(selectfeature.style.fill);
        fillObj.group = this.group[3];
        fillObj.editor = { "type": 'checkbox', "options":{ "on":true, "off":false }};

        var fillforeColorObj  = new Object();
        fillforeColorObj.name = this.displayName[10];
        fillforeColorObj.value = selectfeature.style.fillColor;
        fillforeColorObj.group = this.group[3];
        fillforeColorObj.editor = "colorpicker";

        var fillOpaqueRateObj  = new Object();
        fillOpaqueRateObj.name = this.displayName[11];
        fillOpaqueRateObj.value = selectfeature.style.fillOpacity;
        fillOpaqueRateObj.group = this.group[3];
        fillOpaqueRateObj.editor = "text";

        var textContentObj  = new Object();
        textContentObj.name = this.displayName[12];
        textContentObj.value = selectfeature.geometry.getTextContent();
        textContentObj.group = this.group[4];
        textContentObj.editor = "text";

        var markPosObj  = new Object();
        markPosObj.name = this.displayName[13];
        markPosObj.value = this.annotationToString(selectfeature.geometry.getTextPosition());
        markPosObj.group = this.group[4];
        markPosObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": annotationRows }};

        var fontSpaceObj  = new Object();
        fontSpaceObj.name = this.displayName[21];
        fontSpaceObj.value =  selectfeature.geometry.space;
        fontSpaceObj.group = this.group[4];
        fontSpaceObj.editor = "text";

        var fontSizeObj  = new Object();
        fontSizeObj.name = this.displayName[14];
        fontSizeObj.value = selectfeature.style.fontSize;
        fontSizeObj.group = this.group[4];
        fontSizeObj.editor = "text";

        var fontColorObj  = new Object();
        fontColorObj.name = this.displayName[15];
        fontColorObj.value = selectfeature.style.fontColor;
        fontColorObj.group = this.group[4];
        fontColorObj.editor = "colorpicker";

        var fontNameObj  = new Object();
        fontNameObj.name = this.displayName[16];
        fontNameObj.value = selectfeature.style.fontName;
        fontNameObj.group = this.group[4];
        fontNameObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": surroundLineTypeRows }};

        var surroundLineTypeObj  = new Object();
        surroundLineTypeObj.name = this.displayName[17];
        surroundLineTypeObj.value = this.surroundLineTypeToString(selectfeature.geometry.symbolType, selectfeature.geometry.getSurroundLineType());
        surroundLineTypeObj.group = this.group[6];
        surroundLineTypeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": surroundLineTypeRows }};

        var surroundLineWidthObj  = new Object();
        surroundLineWidthObj.name = this.displayName[18];
        surroundLineWidthObj.value = selectfeature.style.surroundLineWidth;
        surroundLineWidthObj.group = this.group[6];
        surroundLineWidthObj.editor = "text";

        var surroundLineColorObj  = new Object();
        surroundLineColorObj.name = this.displayName[19];
        surroundLineColorObj.value = selectfeature.style.surroundLineColor;
        surroundLineColorObj.group = this.group[6];
        surroundLineColorObj.editor = "colorpicker";

        var surroundLineColorOpaObj  = new Object();
        surroundLineColorOpaObj.name = this.displayName[20];
        surroundLineColorOpaObj.value = selectfeature.style.surroundLineColorOpacity;
        surroundLineColorOpaObj.group = this.group[6];
        surroundLineColorOpaObj.editor = "text";

        var visibilityObj  = new Object();
        visibilityObj.name = "对象可见性";
        visibilityObj.value = this.displayToString(selectfeature.style.display);
        visibilityObj.group = "基本";
        visibilityObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": displayRows }};

        var fillGradientModeObj  = new Object();
        fillGradientModeObj.name = "渐变填充方式";
        fillGradientModeObj.value = this.fillGradientModeToString(selectfeature.style.fillGradientMode);
        fillGradientModeObj.group = "填充";
        fillGradientModeObj.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": fillGradinetRows }};

        var fillBackColorObj  = new Object();
        fillBackColorObj.name = "填充背景色";
        fillBackColorObj.value = selectfeature.style.fillBackColor;
        fillBackColorObj.group = "填充";
        fillBackColorObj.editor = "colorpicker";

        var fillBackOpacityObj  = new Object();
        fillBackOpacityObj.name = "填充背景透明度";
        fillBackOpacityObj.value = selectfeature.style.fillBackOpacity;
        fillBackOpacityObj.group = "填充";
        fillBackOpacityObj.editor = "text";

        rows.push(visibilityObj);

        if(selectfeature.geometry.symbolType !== SuperMap.Plot.SymbolType.TEXTSYMBOL){
            rows.push(lineWidthObj);
            rows.push(lineOpaqueRateObj);
            rows.push(lineColorObj);

            rows.push(surroundLineTypeObj);
            rows.push(surroundLineColorObj);
            rows.push(surroundLineColorOpaObj);
            rows.push(surroundLineWidthObj);
        }

        if(selectfeature.geometry.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
            var dotSymbolWidthObj  = new Object();
            dotSymbolWidthObj.name = this.displayName[4];
            dotSymbolWidthObj.value = selectfeature.geometry.getSymbolSize().w;
            dotSymbolWidthObj.group = this.group[1];
            dotSymbolWidthObj.editor = "text";

            var dotSymbolHeightObj  = new Object();
            dotSymbolHeightObj.name = this.displayName[5];
            dotSymbolHeightObj.value = selectfeature.geometry.getSymbolSize().h;
            dotSymbolHeightObj.group = this.group[1];
            dotSymbolHeightObj.editor = "text";

            rows.push(dotSymbolRotateObj);
            rows.push(dotSymbolNegativeImageObj);
            rows.push(dotSymbolRankObj);
            rows.push(dotSymbolWidthObj);
            rows.push(dotSymbolHeightObj);
            rows.push(textContentObj);
            rows.push(markPosObj);
            if(selectfeature.geometry.textPosition !== 8){
                rows.push(fontSizeObj);
                rows.push(fontSpaceObj);
            }
            rows.push(fontColorObj);
            rows.push(dotScaleByMap);
            rows.push(dotPositionOffset);
        } else {
            if(selectfeature.geometry.symbolType === SuperMap.Plot.SymbolType.TEXTSYMBOL || selectfeature.geometry.code === 320){
                rows.push(textContentObj);
                rows.push(fontSizeObj);
                rows.push(fontColorObj);
            } else {
                rows.push(fillObj);
                rows.push(fillGradientModeObj);
                if(selectfeature.style.fillGradientMode !== "NONE"){
                    rows.push(fillforeColorObj);
                    rows.push(fillOpaqueRateObj);

                    rows.push(fillBackColorObj);
                    rows.push(fillBackOpacityObj);
                } else if(selectfeature.style.fillGradientMode === "NONE" && selectfeature.style.fill){
                    rows.push(fillforeColorObj);
                    rows.push(fillOpaqueRateObj);
                }

                for (var i = 0; i < selectfeature.geometry.getSubSymbols().length; i++) {
                    var objectSubCode = new Object();
                    objectSubCode.name = "Code";
                    objectSubCode.value = selectfeature.geometry.getSubSymbols()[i].code;
                    objectSubCode.group = this.group[5];
                    objectSubCode.editor = "text";
                    objectSubCode.index = i;
                    rows.push(objectSubCode);
                }
            }
        }

        this.addExtendProperty(rows,selectfeature.geometry);

        return rows;
    },

    addExtendProperty: function(rows,geometry)
    {

        var extendProperty = geometry.getExtendProperty();
        var nIndex = 0;
        var property = extendProperty.getPropertyByIndex(nIndex);

        while(null != property)
        {
            var propertyName  = property.getKey();
            var propertyValue = property.getValue();

            var extendePropertyObj  = new Object();
            extendePropertyObj.name = propertyName;
            extendePropertyObj.value = propertyValue;
            extendePropertyObj.group = "自定义属性";
            extendePropertyObj.editor = "text";
            rows.push(extendePropertyObj);

            nIndex++;
            property = extendProperty.getPropertyByIndex(nIndex);
        }

    },

    updateSelectFeature: function(updated, selectfeature)
    {
        if (updated != null) {
            switch(updated.name)
            {
                case this.displayName[0]:
                    selectfeature.geometry.setRotate(parseFloat(updated.value));
                    break;
                case this.displayName[1]:
                    selectfeature.geometry.setScaleByMap(this.fromCheckboxValue(updated.value));
                    break;
                case this.displayName[2]:
                    selectfeature.geometry.setNegativeImage(this.fromCheckboxValue(updated.value));
                    break;
                case this.displayName[3]:
                    selectfeature.geometry.setSymbolRank(updated.value);
                    break;
                case this.displayName[4]:
                    selectfeature.geometry.setSymbolSize(updated.value, selectfeature.geometry.getSymbolSize().h);
                    break;
                case this.displayName[5]:
                    selectfeature.geometry.setSymbolSize(selectfeature.geometry.getSymbolSize().w, updated.value);
                    break;
                case this.displayName[6]:
                    selectfeature.style.strokeWidth = parseInt(updated.value);
                    break;
                case this.displayName[7]:
                    selectfeature.style.strokeColor = updated.value;
                    break;
                case this.displayName[8]:
                    {
                        var opacity = parseFloat(updated.value) < 0 ? 0 : parseFloat(updated.value);
                        opacity = parseFloat(updated.value) > 1 ? 1 : parseFloat(updated.value);
                        selectfeature.style.strokeOpacity = opacity;
                    }
                    break;
                case this.displayName[9]:
                    selectfeature.style.fill = this.fromCheckboxValue(updated.value);
                    break;
                case this.displayName[10]:
                    selectfeature.style.fillColor = updated.value;
                    break;
                case this.displayName[11]:
                    {
                        var opacity = parseFloat(updated.value) < 0 ? 0 : parseFloat(updated.value);
                        opacity = parseFloat(updated.value) > 1 ? 1 : parseFloat(updated.value);
                        selectfeature.style.fillOpacity = opacity;
                    }
                    break;
                case this.displayName[12]:
                    selectfeature.geometry.setTextContent(updated.value);
                    break;
                case this.displayName[13]:
                    selectfeature.geometry.setTextPosition(parseInt(updated.value));
                    break;
                case this.displayName[14]:
                    selectfeature.style.fontSize = parseFloat(updated.value).toString();
                    break;
                case this.displayName[15]:
                    selectfeature.style.fontColor = updated.value;
                    selectfeature.geometry.calculateParts();
                    break;
                case this.displayName[17]:
                    selectfeature.geometry.setSurroundLineType(parseInt(updated.value));
                    break;
                case this.displayName[18]:
                    selectfeature.style.surroundLineWidth = parseInt(updated.value);
                    break;
                case this.displayName[19]:
                    selectfeature.style.surroundLineColor = updated.value;
                    break;
                case this.displayName[20]:
                    {
                        var opacity = parseFloat(updated.value) < 0 ? 0 : parseFloat(updated.value);
                        opacity = parseFloat(updated.value) > 1 ? 1 : parseFloat(updated.value);
                        selectfeature.style.surroundLineColorOpacity = opacity;
                    }
                    break;
                case "对象可见性":
                    selectfeature.style.display = updated.value;
                    break;
                case "渐变填充方式":
                    selectfeature.style.fillGradientMode = updated.value;
                    break;
                case "填充背景色":
                    selectfeature.style.fillBackColor = updated.value;
                    break;
                case "填充背景透明度":
                    {
                        var opacity = parseFloat(updated.value) < 0 ? 0 : parseFloat(updated.value);
                        opacity = parseFloat(updated.value) > 1 ? 1 : parseFloat(updated.value);
                        selectfeature.style.fillBackOpacity = opacity;
                    }
                    break;
                case this.displayName[21]:
                    selectfeature.geometry.space = parseInt(updated.value);
                    selectfeature.geometry.calculateParts();
                    break;
                case "位置点偏移":
                {
                    selectfeature.geometry.setPositionOffset(this.fromCheckboxValue(updated.value));
                    break;
                }
            }

            if (updated.group == this.group[5]) {
                if (updated.name == "Code") {
                    var code = parseInt(updated.value);

                    if (code != null) {
                        selectfeature.geometry.setSubSymbol(code, updated.index);
                    }
                }
            }
        }

        SuperMap.Plot.AnalysisSymbol.setStyle(selectfeature.style, selectfeature.geometry.symbolData);
    },

    getAnnotationRows: function(geometry){
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
    },

    getSymbolRankRows: function(geometry)
    {
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
    },

    getSurroundLineTypeRows: function(symbolType)
    {
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
    },

    getDisplayRows: function()
    {
        var rows = [];

        rows.push({"value": "display", "text": "显示"});
        rows.push({"value": "none", "text": "不显示"});

        return rows;
    },

    getFillGradientModeRows: function()
    {
        var rows = [];

        rows.push({"value": "NONE", "text": "无渐变"});
        rows.push({"value": "LINEAR", "text": "线性渐变"});
        rows.push({"value": "RADIAL", "text": "辐射渐变"});

        return rows;
    },

    annotationToString: function(annotation)
    {
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
    },

    symbolRankToString: function(symbolRank)
    {
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
    },

    surroundLineTypeToString: function(symbolType, surroundLineType)
    {
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
    },

    displayToString: function(display)
    {
        if(display && display === "none"){
            return "不显示";
        }

        return "显示";
    },

    fillGradientModeToString: function(fillGradientMode)
    {
        if(fillGradientMode === "NONE"){
            return "无渐变";
        } else if(fillGradientMode === "LINEAR"){
            return "线性渐变";
        } else if(fillGradientMode === "RADIAL"){
            return "辐射渐变";
        } else {
            return "无渐变";
        }
    },

    checkboxValueToString: function(checkboxValue){
        if(checkboxValue === true){
            return "true";
        } else if(checkboxValue === false){
            return "false";
        }
    },

    fromCheckboxValue: function(checkboxStr){
        if(checkboxStr === "true"){
            return true;
        } else if(checkboxStr === "false"){
            return false;
        }
    },

    CLASS_NAME: "SuperMap.Plotting.StylePanel"
});