/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.*/
var selectFeatures = [];
//var groupIndex = 0;
L.supermap.plotting.initStylePanel = function (div, serverUrl, editControl) {
    editControl.on(SuperMap.Plot.Event.featuresselected, function (event) {
        showFeatureProperty(event);
    });
    editControl.on(SuperMap.Plot.Event.featuresmodified, function (event) {
        showFeatureProperty(event);
    });
    editControl.on(SuperMap.Plot.Event.featuresunselected, function (event) {
        hideFeatureProperty(event);
    });
    function afterModifySelectFeature(rowIndex, rowData, changes) {
        var updated = $('#pg').propertygrid('getChanges', "updated");
        if (updated.length !== 0) {
            //var  groups = $('#pg').propertygrid("groups");
            // for(var i=0;i<groups.length;i++){
            //     if(updated[0].group === groups[i].value){
            //         groupIndex = i;
            //     }
            // }
            var _this = this;
            new Promise(function (resolve, reject) {
                if (updated.length !== 0) {
                    // if(updated[0].group == "子标号"){
                    //     updateSubFeature(updated[0], selectFeatures);
                    // }else{
                    //     updateSelectFeature(updated[0], selectFeatures, serverUrl);
                    // }
                    updateSelectFeature(updated[0], selectFeatures, serverUrl);
                }
                for (var i = 0; i < selectFeatures.length; i++) {
                    if (selectFeatures[i].graphic) {
                        selectFeatures[i].graphic.updateImage();
                    }
                }
                $('#pg').propertygrid('loadData', collectionPropertyGridRows(selectFeatures));
                //$('#pg').propertygrid('collapseGroup');
                //$('#pg').propertygrid('expandGroup',0);
                //$('#pg').propertygrid('expandGroup',groupIndex);
                return;
            }).then(function (selectFeatures) {
                for (var i = 0; i < selectFeatures.length; i++) {
                    if (selectFeatures[i].graphic) {
                        selectFeatures[i].graphic.updateImage();
                    }
                }
                $('#pg').propertygrid('loadData', collectionPropertyGridRows(selectFeatures));
                //$('#pg').propertygrid('collapseGroup');
                //$('#pg').propertygrid('expandGroup',0);
                return;

            })
        }

    }
    var stylePanel = document.getElementById(div);
    var pg = document.createElement("table");
    pg.id = "pg";
    pg.className = "easyui-propertygrid";
    stylePanel.appendChild(pg);
    $('#pg').propertygrid({
        showGroup: true,
        columns: [[
            { field: 'name', title: 'Name', width: 100, resizable: true },
            {
                field: 'value', title: 'Value', width: 100, resizable: false
            }
        ]],
        onAfterEdit: afterModifySelectFeature
    });

}

function showFeatureProperty(event) {
    for (var index = 0; index < event.features.length; index++) {
        var sIndex = SuperMap.Util.indexOf(selectFeatures, event.features[index]);
        if (sIndex === -1) {
            selectFeatures.push(event.features[index]);
        }
    }

    var rows = [];
    if (selectFeatures.length !== 0) {
        var rows = collectionPropertyGridRows(selectFeatures);
    }
    $('#pg').propertygrid('loadData', rows);
    //$('#pg').propertygrid('collapseGroup');
    //$('#pg').propertygrid('expandGroup',0);
    //$('#pg').propertygrid('expandGroup',groupIndex);
}
function hideFeatureProperty(event) {
    for (var index = 0; index < event.features.length; index++) {
        var sIndex = SuperMap.Util.indexOf(selectFeatures, event.features[index]);
        if (sIndex !== -1) {
            selectFeatures.splice(sIndex, 1);
        }
    }

    var rows = [];
    if (selectFeatures.length !== 0) {
        var rows = collectionPropertyGridRows(selectFeatures);
    }
    $('#pg').propertygrid('loadData', rows);
}
function updateSubFeature(updated, selectfeatures) {
    var subFeature = selectfeature.getSubSymbols();
    switch (updated.name) {
        case displayLineStyleName[0]:
            subFeature[0].
                break;
        case displayLineStyleName[1]:
            break;
    }
}
function updateSelectFeature(updated, selectfeatures) {
    var transaction = new SuperMap.Plot.Transaction();
    L.supermap.plotting.getControl(this.map).getTransManager().add(transaction);
    for (var i = 0; i < selectfeatures.length; i++) {
        var transInfo = new SuperMap.Plot.TransactionInfo();
        transInfo.layerId = selectfeatures[i].layer._leaflet_id;
        transInfo.uuid = selectfeatures[i].uuid;
        if (updated != null) {
            if (updated.group.includes(group[9])) {
                //多注记
                var annotation = undefined;
                let annotationIndex = updated.group.split(group[9])[1];
                if (annotationIndex > selectfeatures[i].getSymbolAnnotations().length &&
                    updated.name == displayTextContentName[0]) {
                    annotation = new SuperMap.Plot.SymbolAnnotation(updated.value, 0, undefined, undefined);
                    selectfeatures[i].addSymbolAnnotations([annotation]);
                } else {
                    if (updated.value == "") {//清空内容视为删除注记
                        selectfeatures[i].removeSymbolAnnotation(annotationIndex - 1);
                        continue;
                    }
                    annotation = selectfeatures[i].getSymbolAnnotation(annotationIndex - 1);
                }
                switch (updated.name) {
                    case displayTextContentName[0]:
                        transInfo.functionName = "textContent";
                        transInfo.undoParams = [annotation.textContent];
                        transInfo.redoParams = [updated.value];
                        annotation.textContent = updated.value;
                        break;
                    case displayTextContentName[1]:
                        transInfo.functionName = "textPosition";
                        transInfo.undoParams = [annotation.textPosition];
                        transInfo.redoParams = [parseInt(updated.value)];
                        annotation.textPosition = parseInt(updated.value);
                        break;
                    case displayTextContentName[2]:
                        transInfo.propertyName = "fontSize";
                        transInfo.undoValue = annotation.style.fontSize;
                        transInfo.redoValue = parseFloat(updated.value);
                        annotation.setStyle({ fontSize: parseFloat(updated.value) });
                        break;
                    case displayTextContentName[3]:
                        transInfo.propertyName = "fontColor";
                        transInfo.undoValue = annotation.style.fontColor;
                        transInfo.redoValue = updated.value;
                        annotation.setStyle({ fontColor: updated.value });
                        break;
                    case displayTextContentName[4]:
                        transInfo.propertyName = "fontFamily";
                        transInfo.undoValue = annotation.style.fontFamily;
                        transInfo.redoValue = updated.value;
                        annotation.setStyle({ fontFamily: updated.value });
                        break;
                    case displayTextContentName[8]:
                        transInfo.propertyName = "fontStroke";
                        transInfo.undoValue = annotation.style.fontStroke;
                        transInfo.redoValue = fromCheckboxValue(updated.value);
                        annotation.style.fontStroke = fromCheckboxValue(updated.value);
                        annotation.setStyle(annotation.style);
                        break;
                    case displayTextContentName[9]:
                        transInfo.propertyName = "fontStrokeColor";
                        transInfo.undoValue = annotation.style.fontStrokeColor;
                        transInfo.redoValue = updated.value;
                        annotation.style.fontStrokeColor = updated.value;
                        annotation.setStyle(annotation.style);
                        break;
                    case displayTextContentName[10]:
                        transInfo.propertyName = "fontStrokeWidth";
                        transInfo.undoValue = annotation.style.fontStrokeWidth;
                        transInfo.redoValue = parseInt(updated.value);
                        annotation.style.fontStrokeWidth = parseInt(updated.value);
                        annotation.setStyle(annotation.style);
                        break;
                    case displayTextContentName[11]:
                        transInfo.propertyName = "fontBackground";
                        transInfo.undoValue = annotation.style.fontBackground;
                        transInfo.redoValue = fromCheckboxValue(updated.value);
                        annotation.style.fontBackground = fromCheckboxValue(updated.value);
                        annotation.setStyle(annotation.style);
                        break;
                    case displayTextContentName[12]:
                        transInfo.propertyName = "fontBackgroundColor";
                        transInfo.undoValue = annotation.style.fontBackgroundColor;
                        transInfo.redoValue = updated.value;
                        annotation.style.fontBackgroundColor = updated.value;
                        annotation.setStyle(annotation.style);
                        break;
                    case displayTextContentName[13]:
                        transInfo.propertyName = "fontShadow";
                        transInfo.undoValue = annotation.style.fontShadow;
                        transInfo.redoValue = fromCheckboxValue(updated.value);
                        annotation.style.fontShadow = fromCheckboxValue(updated.value);
                        annotation.setStyle(annotation.style);
                        break;
                    case displayTextContentName[14]:
                        transInfo.propertyName = "fontShadowColor";
                        transInfo.undoValue = annotation.style.fontShadowColor;
                        transInfo.redoValue = updated.value;
                        annotation.style.fontShadowColor = updated.value;
                        annotation.setStyle(annotation.style);
                        break;
                    case displayTextContentName[15]:
                        transInfo.propertyName = "fontShadowOffsetX";
                        transInfo.undoValue = annotation.style.fontShadowOffsetX;
                        transInfo.redoValue = parseInt(updated.value);
                        annotation.style.fontShadowOffsetX = parseInt(updated.value);
                        annotation.setStyle(annotation.style);
                        break;
                    case displayTextContentName[16]:
                        transInfo.propertyName = "fontShadowOffsetY";
                        transInfo.undoValue = annotation.style.fontShadowOffsetY;
                        transInfo.redoValue = parseInt(updated.value);
                        annotation.style.fontShadowOffsetY = parseInt(updated.value);
                        annotation.setStyle(annotation.style);
                        break;
                    case resources.text_XOffset:
                        transInfo.propertyName = "offsetX";
                        transInfo.undoValue = annotation.offsetX;
                        transInfo.redoValue = parseInt(updated.value);
                        annotation.offsetX = parseInt(updated.value);
                        break;
                    case resources.text_YOffset:
                        transInfo.propertyName = "offsetY";
                        transInfo.undoValue = annotation.offsetY;
                        transInfo.redoValue = parseInt(updated.value);
                        annotation.offsetY = parseInt(updated.value);
                        break;

                }
                selectFeatures[i].redraw();
            } else if (updated.group == group[8]) {
                //子标号
                if (updated.name == displayName[2]) {
                    if (updated.value !== null) {
                        transInfo.propertyName = "libID";
                        transInfo.undoValue = selectfeatures[i].getSubSymbols()[updated.index].libID;
                        transInfo.redoValue = parseInt(updated.value);
                        selectfeatures[i].subSymbols[0].libID = parseInt(updated.value);
                    }
                }
                if (updated.name == displayName[3]) {
                    var code = parseInt(updated.value);
                    if (selectfeatures[i].symbolType === SuperMap.Plot.SymbolType.NODECHAIN && code != null) {
                        var symbolLibManager = L.supermap.plotting.symbolLibManager(serverUrl);
                        var subCode = symbolLibManager.findSymbolByCode(code);
                        if (subCode.length !== 0 && subCode[0].symbolType === "SYMBOL_DOT") {
                            transInfo.functionName = "setSubSymbol";
                            if (selectfeatures[i].getSubSymbols()[updated.index]) {
                                transInfo.undoParams = [selectfeatures[i].getSubSymbols()[updated.index].code, updated.index, subCode[0].libID];
                            } else {
                                transInfo.undoParams = [-1, updated.index];
                            }
                            transInfo.redoParams = [code, updated.index, subCode[0].libID];
                            selectfeatures[i].setSubSymbol(code, updated.index, subCode[0].libID);
                        }
                    }
                    else if (code !== null) {

                        transInfo.functionName = "setSubSymbol";
                        if (selectfeatures[i].getSubSymbols()[updated.index]) {
                            transInfo.undoParams = [selectfeatures[i].getSubSymbols()[updated.index].code, updated.index, selectfeatures[i].getSubSymbols()[updated.index].libID];
                        } else {
                            transInfo.undoParams = [-1, updated.index];
                        }
                        transInfo.redoParams = [code, updated.index];
                        selectfeatures[i].setSubSymbol(code, updated.index, selectfeatures[i].libID);
                    }
                }
                if (updated.name == resources.text_subSymbolLineWidth) {
                    let subSymbol = selectfeatures[i].getSubSymbols()[updated.index];
                    if (subSymbol) {
                        selectfeatures[i].setSubSymbol(subSymbol.code, updated.index, subSymbol.libID, subSymbol.lineColor, parseFloat(updated.value));
                    }
                }
                if (updated.name == resources.text_subSymbolLineColor) {
                    let subSymbol = selectfeatures[i].getSubSymbols()[updated.index];
                    if (subSymbol) {
                        selectfeatures[i].setSubSymbol(subSymbol.code, updated.index, subSymbol.libID, updated.value, subSymbol.width2D);
                    }
                }
            } else {
                //其他属性
                switch (updated.name) {
                    case resources.text_content:
                        transInfo.functionName = "setTextContent";
                        transInfo.undoParams = [selectfeatures[i].getTextContent()];
                        transInfo.redoParams = [updated.value];
                        selectfeatures[i].setTextContent(updated.value);
                        break;
                    case displayName[0]:
                        transInfo.functionName = "setLocked";
                        transInfo.undoParams = [selectfeatures[i].getLocked()];
                        transInfo.redoParams = [fromCheckboxValue(updated.value)];
                        selectfeatures[i].setLocked(fromCheckboxValue(updated.value));
                        break;
                    case displayName[1]:
                        transInfo.propertyName = "display";
                        transInfo.undoValue = selectfeatures[i].style.display;
                        transInfo.redoValue = updated.value;
                        selectfeatures[i].setStyle({ display: updated.value });
                        break;
                    case displayLineStyleName[0]:
                        transInfo.propertyName = "weight";
                        transInfo.undoValue = selectfeatures[i].style.weight;
                        transInfo.redoValue = parseInt(updated.value);
                        if (selectfeatures[i].symbolType === SuperMap.Plot.SymbolType.LITERATESIGN) {
                            selectfeatures[i].route.applyTextStyle({ weight: parseInt(updated.value) });
                        } else {
                            selectfeatures[i].setStyle({ weight: parseInt(updated.value) });
                        }
                        break;
                    case displayLineStyleName[1]:
                        transInfo.propertyName = "color";
                        transInfo.undoValue = [selectfeatures[i].style.color];
                        transInfo.redoValue = [updated.value];
                        if (selectfeatures[i].symbolType === SuperMap.Plot.SymbolType.LITERATESIGN) {
                            selectfeatures[i].route.applyTextStyle({ color: updated.value });
                        } else {
                            selectfeatures[i].setStyle({ color: updated.value });
                        }
                        break;
                    case displayLineStyleName[2]:
                        transInfo.propertyName = "lineSymbolID";
                        transInfo.undoValue = selectfeatures[i].style.lineSymbolID;
                        transInfo.redoValue = updated.value;
                        if (selectfeatures[i].symbolType === SuperMap.Plot.SymbolType.LITERATESIGN) {
                            selectfeatures[i].route.applyTextStyle({ lineSymbolID: updated.value });
                        } else {
                            if (selectFeatures[i].symbolType != 1 && selectFeatures[i].setDashLine != undefined) {
                                selectfeatures[i].setDashLine([]);
                                selectfeatures[i].setStyle({ lineSymbolID: 0 });
                            }

                            if (parseInt(updated.value) === 999) {
                                openDialog(selectfeatures[i]);
                            } else {
                                if (parseInt(updated.value) == 5) {
                                    selectfeatures[i].setDashLine([0.3, 0.05]);
                                } else if (parseInt(updated.value) == 6) {
                                    selectfeatures[i].setDashLine([0.23, 0.06]);
                                }
                                else if (parseInt(updated.value) == 7) {
                                    selectfeatures[i].setDashLine([0.16, 0.05]);
                                }
                                else if (parseInt(updated.value) == 8) {
                                    selectfeatures[i].setDashLine([0.14, 0.032]);
                                } else if (parseInt(updated.value) == 0 && selectfeatures[i].setDashLine != undefined) {
                                    selectfeatures[i].setDashLine([]);
                                } else if (parseInt(updated.value) == 888) {
                                    selectfeatures[i].setDashLine([0]);
                                }
                                if (selectfeatures[i].style.lineSymbolID == 888) {
                                    selectfeatures[i].setDashLine([]);
                                    selectfeatures[i].setStyle({ lineSymbolID: 0 });
                                }
                                selectfeatures[i].setStyle({ lineSymbolID: updated.value });
                            }
                            //         this.dashLines = [0.3,0.05];两段虚线
                            //         this.dashLines = [0.2,0.05];三段虚线
                            //         this.dashLines = [0.16,0.05];四段虚线
                            //         this.dashLines = [0.14,0.032];五段虚线

                        }
                        break;
                    case displayLineStyleName[3]:
                        {
                            var opacity = parseFloat(updated.value) < 0 ? 0 : parseFloat(updated.value);
                            opacity = parseFloat(updated.value) > 1 ? 1 : parseFloat(updated.value);
                            transInfo.propertyName = "opacity";
                            transInfo.undoValue = selectfeatures[i].style.opacity;
                            transInfo.redoValue = opacity;
                            if (selectfeatures[i].symbolType === SuperMap.Plot.SymbolType.LITERATESIGN) {
                                selectfeatures[i].route.applyTextStyle({ opacity: opacity });
                            } else {
                                selectfeatures[i].setStyle({ opacity: opacity });
                            }
                        }
                        break;
                    case displaySurroundLineName[0]:
                        transInfo.functionName = "setSurroundLineType";
                        transInfo.undoParams = [selectfeatures[i].getSurroundLineType()];
                        transInfo.redoParams = [parseInt(updated.value)];
                        selectfeatures[i].setSurroundLineType(parseInt(updated.value));
                        break;
                    case displaySurroundLineName[1]:
                        transInfo.propertyName = "surroundLineWidth";
                        transInfo.undoValue = selectfeatures[i].style.surroundLineWidth;
                        transInfo.redoValue = parseInt(updated.value);
                        selectfeatures[i].setStyle({ surroundLineWidth: parseInt(updated.value) });
                        break;
                    case displaySurroundLineName[2]:
                        transInfo.propertyName = "surroundLineColor";
                        transInfo.undoValue = selectfeatures[i].style.surroundLineColor;
                        transInfo.redoValue = updated.value;
                        selectfeatures[i].setStyle({ surroundLineColor: updated.value });
                        break;
                    case displaySurroundLineName[3]:
                        {
                            var opacity = parseFloat(updated.value) < 0 ? 0 : parseFloat(updated.value);
                            opacity = parseFloat(updated.value) > 1 ? 1 : parseFloat(updated.value);
                            transInfo.propertyName = "surroundLineColorOpacity";
                            transInfo.undoValue = selectfeatures[i].style.surroundLineColorOpacity;
                            transInfo.redoValue = opacity;
                            selectfeatures[i].setStyle({ surroundLineColorOpacity: opacity });
                        }
                        break;
                    case displayFillStyleName[0]:
                        transInfo.propertyName = "fillSymbolID";
                        transInfo.undoValue = selectfeatures[i].style.fillSymbolID;
                        transInfo.redoValue = parseFloat(updated.value);
                        selectfeatures[i].style.fillSymbolID = parseFloat(updated.value);
                        selectfeatures[i].setStyle(selectfeatures[i].style);
                        break;
                    case displayFillStyleName[1]:
                        transInfo.propertyName = "fillColor";
                        transInfo.undoValue = selectfeatures[i].style.fillColor;
                        transInfo.redoValue = updated.value;
                        selectfeatures[i].style.fillColor = updated.value;
                        selectfeatures[i].setStyle(selectfeatures[i].style);
                        break;
                    case displayFillStyleName[2]:
                        {
                            var opacity = parseFloat(updated.value) < 0 ? 0 : parseFloat(updated.value);
                            opacity = parseFloat(updated.value) > 1 ? 1 : parseFloat(updated.value);
                            transInfo.propertyName = "fillOpacity";
                            transInfo.undoValue = selectfeatures[i].style.fillOpacity;
                            transInfo.redoValue = opacity;
                            selectfeatures[i].style.fillOpacity = opacity;
                            selectfeatures[i].setStyle(selectfeatures[i].style);
                        }
                        break;
                    case displayFillStyleName[3]:
                        transInfo.propertyName = "fillGradientMode";
                        transInfo.undoValue = selectfeatures[i].style.fillGradientMode;
                        transInfo.redoValue = updated.value;
                        selectfeatures[i].style.fillGradientMode = updated.value;
                        selectfeatures[i].setStyle(selectfeatures[i].style);
                        break;
                    case displayFillStyleName[4]:
                        transInfo.propertyName = "fillBackColor";
                        transInfo.undoValue = selectfeatures[i].style.fillBackColor;
                        transInfo.redoValue = updated.value;
                        selectfeatures[i].style.fillBackColor = updated.value;
                        selectfeatures[i].setStyle(selectfeatures[i].style);
                        break;
                    case displayFillStyleName[5]:
                        {
                            var opacity = parseFloat(updated.value) < 0 ? 0 : parseFloat(updated.value);
                            opacity = parseFloat(updated.value) > 1 ? 1 : parseFloat(updated.value);
                            transInfo.propertyName = "fillBackOpacity";
                            transInfo.undoValue = selectfeatures[i].style.fillBackOpacity;
                            transInfo.redoValue = opacity;
                            selectfeatures[i].style.fillBackOpacity = opacity;
                            selectfeatures[i].setStyle(selectfeatures[i].style);
                        }
                        break;
                    case displayFillStyleName[6]:
                        {
                            var angle = parseFloat(updated.value) < 0 ? 0 : parseFloat(updated.value);
                            angle = parseFloat(updated.value) >= 360 ? 0 : parseFloat(updated.value);
                            transInfo.propertyName = "fillAngle";
                            transInfo.undoValue = selectfeatures[i].style.fillAngle;
                            transInfo.redoValue = angle;
                            selectfeatures[i].style.fillAngle = angle;
                            selectfeatures[i].setStyle(selectfeatures[i].style);
                        }
                        break;
                    case displayFillStyleName[7]:
                        {
                            var X = parseFloat(updated.value) < -1 ? -1 : parseFloat(updated.value);
                            X = parseFloat(updated.value) > 1 ? 1 : parseFloat(updated.value);
                            transInfo.propertyName = "fillCenterOffsetX";
                            transInfo.undoValue = selectfeatures[i].style.fillCenterOffsetX;
                            transInfo.redoValue = X;
                            selectfeatures[i].style.fillCenterOffsetX = X;
                            selectfeatures[i].setStyle(selectfeatures[i].style);
                        }
                        break;

                    case displayFillStyleName[8]:
                        {
                            var Y = parseFloat(updated.value) < -1 ? -1 : parseFloat(updated.value);
                            Y = parseFloat(updated.value) > 1 ? 1 : parseFloat(updated.value);
                            transInfo.propertyName = "fillCenterOffsetY";
                            transInfo.undoValue = selectfeatures[i].style.fillCenterOffsetY;
                            transInfo.redoValue = Y;
                            selectfeatures[i].style.fillCenterOffsetY = Y;
                            selectfeatures[i].setStyle(selectfeatures[i].style);
                        }
                        break;
                    case displayNameDot[0]:
                        transInfo.functionName = "setRotate";
                        transInfo.undoParams = [selectfeatures[i].getRotate()];
                        transInfo.redoParams = [parseFloat(updated.value)];
                        selectfeatures[i].setRotate(parseFloat(updated.value));
                        break;
                    case displayNameDot[1]:
                        transInfo.functionName = "setScaleByMap";
                        transInfo.undoParams = [selectfeatures[i].getScaleByMap()];
                        transInfo.redoParams = [fromCheckboxValue(updated.value)];
                        selectfeatures[i].setScaleByMap(fromCheckboxValue(updated.value));
                        break;
                    case displayNameDot[2]:
                        transInfo.functionName = "setNegativeImage";
                        transInfo.undoParams = [selectfeatures[i].getNegativeImage()];
                        transInfo.redoParams = [fromCheckboxValue(updated.value)];
                        selectfeatures[i].setNegativeImage(fromCheckboxValue(updated.value));
                        break;
                    case displayNameDot[3]:
                        transInfo.functionName = "setSymbolRank";
                        transInfo.undoParams = [selectfeatures[i].getSymbolRank()];
                        transInfo.redoParams = [updated.value];
                        selectfeatures[i].setSymbolRank(updated.value);
                        break;
                    case displayNameDot[4]:
                        transInfo.functionName = "setPositionOffset";
                        transInfo.undoParams = [selectfeatures[i].getPositionOffset()];
                        transInfo.redoParams = [fromCheckboxValue(updated.value)];
                        selectfeatures[i].setPositionOffset(fromCheckboxValue(updated.value));
                        break;
                    case displayNameDot[5]:
                        transInfo.functionName = "setPositionOffsetType";
                        transInfo.undoParams = [selectfeatures[i].getPositionOffsetType()];
                        transInfo.redoParams = [parseInt(updated.value)];
                        selectfeatures[i].setPositionOffsetType(parseInt(updated.value));
                        break;
                    case displayNameDot[6]:
                        transInfo.functionName = "setWidthHeightLimit";
                        transInfo.undoParams = [selectfeatures[i].getWidthHeightLimit()];
                        transInfo.redoParams = [fromCheckboxValue(updated.value)];
                        selectfeatures[i].setWidthHeightLimit(fromCheckboxValue(updated.value));
                        break;
                    case displayNameDot[7]:
                        if (selectfeatures[i].symbolType != 20 || selectfeatures[i].symbolType != 21) {
                            transInfo.functionName = "setSymbolSize";
                            transInfo.undoParams = [selectfeatures[i].getSymbolSize().w];
                            transInfo.redoParams = [parseFloat(updated.value), selectfeatures[i].getSymbolSize().h];
                            selectfeatures[i].setSymbolSize(updated.value, selectfeatures[i].getSymbolSize().h);
                        } else {
                            //
                        }
                        break;
                    case displayNameDot[8]:
                        if (selectfeatures[i].symbolType != 20 || selectfeatures[i].symbolType != 21) {
                            transInfo.functionName = "setSymbolSize";
                            transInfo.undoParams = [selectfeatures[i].getSymbolSize().h];
                            transInfo.redoParams = [selectfeatures[i].getSymbolSize().w, parseFloat(updated.value)];
                            selectfeatures[i].setSymbolSize(selectfeatures[i].getSymbolSize().w, updated.value);
                        } else {
                            //
                        }
                        break;
                    case displayTextContentName[0]:
                        if (selectfeatures[i].symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT) {
                            transInfo.functionName = "updateSymbolText";
                            transInfo.undoParams = [selectfeatures[i].symbolTexts[0].clone(), 0];
                            selectfeatures[i].symbolTexts[0].textContent = updated.value;
                            selectfeatures[i].updateSymbolText(selectfeatures[i].symbolTexts[0], 0);
                            transInfo.redoParams = [selectfeatures[i].symbolTexts[0], 0];
                        } else if (selectfeatures[i].symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT1 ||
                            selectfeatures[i].symbolType === SuperMap.Plot.SymbolType.PATHTEXT) {
                            transInfo.functionName = "setTextContent";
                            transInfo.undoParams = [selectfeatures[i].getTextContent()];
                            var updatedValueStr = updated.value;
                            var textContent = updatedValueStr.split(",");
                            transInfo.redoParams = [textContent];
                            selectfeatures[i].setTextContent(textContent);
                        } else {
                            transInfo.functionName = "setTextContent";
                            transInfo.undoParams = [selectfeatures[i].getTextContent()];
                            transInfo.redoParams = [updated.value];
                            selectfeatures[i].setTextContent(updated.value);
                        }
                        break;
                    case displayTextContentName[0] + "2":
                        selectfeatures[i].symbolTexts[1].textContent = updated.value;
                        selectfeatures[i].redraw();
                        break;
                    case displayTextContentName[1]:
                        if (selectfeatures[i].symbolType === SuperMap.Plot.SymbolType.PATHTEXT) {
                            transInfo.functionName = "setRelLineText";
                            transInfo.undoParams = [selectfeatures[i].getRelLineText()];
                            transInfo.redoParams = [parseInt(updated.value)];
                            selectfeatures[i].setRelLineText(parseInt(updated.value));
                        } else {
                            transInfo.functionName = "setTextPosition";
                            transInfo.undoParams = [selectfeatures[i].getTextPosition()];
                            transInfo.redoParams = [parseInt(updated.value)];
                            selectfeatures[i].setTextPosition(parseInt(updated.value));
                        }
                        break;
                    case displayTextContentName[2]:
                        transInfo.propertyName = "fontSize";
                        transInfo.undoValue = selectfeatures[i].style.fontSize;
                        transInfo.redoValue = parseFloat(updated.value);
                        selectfeatures[i].setStyle({ fontSize: parseFloat(updated.value) });
                        break;
                    case displayTextContentName[3]:
                        transInfo.propertyName = "fontColor";
                        transInfo.undoValue = selectfeatures[i].style.fontColor;
                        transInfo.redoValue = updated.value;
                        selectfeatures[i].setStyle({ fontColor: updated.value });
                        break;
                    case displayTextContentName[4]:
                        transInfo.propertyName = "fontFamily";
                        transInfo.undoValue = selectfeatures[i].style.fontFamily;
                        transInfo.redoValue = updated.value;
                        selectfeatures[i].setStyle({ fontFamily: updated.value });
                        break;
                    case displayTextContentName[5]:
                        if (selectfeatures[i].symbolType === SuperMap.Plot.SymbolType.SYMBOLTEXT1) {
                            selectfeatures[i].space = updated.value;
                        } else {
                            transInfo.functionName = "setSpace";
                            transInfo.undoParams = [selectfeatures[i].getSpace()];
                            transInfo.redoParams = [parseInt(updated.value)];
                            selectfeatures[i].setSpace(parseInt(updated.value));
                        }
                        break;
                    case displayTextContentName[6]:
                        transInfo.propertyName = "fontSpace";
                        transInfo.undoValue = selectfeatures[i].style.fontSpace;
                        transInfo.redoValue = parseInt(updated.value);
                        selectfeatures[i].style.fontSpace = parseInt(updated.value);
                        selectfeatures[i].setStyle(selectfeatures[i].style);
                        break;
                    case displayTextContentName[7]:
                        transInfo.propertyName = "fontPercent";
                        transInfo.undoValue = selectfeatures[i].style.fontPercent;
                        transInfo.redoValue = parseInt(updated.value);
                        selectfeatures[i].style.fontPercent = parseInt(updated.value);
                        selectfeatures[i].setStyle(selectfeatures[i].style);
                        break;
                    case displayTextContentName[8]:
                        transInfo.propertyName = "fontStroke";
                        transInfo.undoValue = selectfeatures[i].style.fontStroke;
                        transInfo.redoValue = fromCheckboxValue(updated.value);
                        selectfeatures[i].style.fontStroke = fromCheckboxValue(updated.value);
                        selectfeatures[i].setStyle(selectfeatures[i].style);
                        break;
                    case displayTextContentName[9]:
                        transInfo.propertyName = "fontStrokeColor";
                        transInfo.undoValue = selectfeatures[i].style.fontStrokeColor;
                        transInfo.redoValue = updated.value;
                        selectfeatures[i].style.fontStrokeColor = updated.value;
                        selectfeatures[i].setStyle(selectfeatures[i].style);
                        break;
                    case displayTextContentName[10]:
                        transInfo.propertyName = "fontStrokeWidth";
                        transInfo.undoValue = selectfeatures[i].style.fontStrokeWidth;
                        transInfo.redoValue = parseInt(updated.value);
                        selectfeatures[i].style.fontStrokeWidth = parseInt(updated.value);
                        selectfeatures[i].setStyle(selectfeatures[i].style);
                        break;
                    case displayTextContentName[11]:
                        transInfo.propertyName = "fontBackground";
                        transInfo.undoValue = selectfeatures[i].style.fontBackground;
                        transInfo.redoValue = fromCheckboxValue(updated.value);
                        selectfeatures[i].style.fontBackground = fromCheckboxValue(updated.value);
                        selectfeatures[i].setStyle(selectfeatures[i].style);
                        break;
                    case displayTextContentName[12]:
                        transInfo.propertyName = "fontBackgroundColor";
                        transInfo.undoValue = selectfeatures[i].style.fontBackgroundColor;
                        transInfo.redoValue = updated.value;
                        selectfeatures[i].style.fontBackgroundColor = updated.value;
                        selectfeatures[i].setStyle(selectfeatures[i].style);
                        break;
                    case displayTextContentName[13]:
                        transInfo.propertyName = "fontShadow";
                        transInfo.undoValue = selectfeatures[i].style.fontShadow;
                        transInfo.redoValue = fromCheckboxValue(updated.value);
                        selectfeatures[i].style.fontShadow = fromCheckboxValue(updated.value);
                        selectfeatures[i].setStyle(selectfeatures[i].style);
                        break;
                    case displayTextContentName[14]:
                        transInfo.propertyName = "fontShadowColor";
                        transInfo.undoValue = selectfeatures[i].style.fontShadowColor;
                        transInfo.redoValue = updated.value;
                        selectfeatures[i].style.fontShadowColor = updated.value;
                        selectfeatures[i].setStyle(selectfeatures[i].style);
                        break;
                    case displayTextContentName[15]:
                        transInfo.propertyName = "fontShadowOffsetX";
                        transInfo.undoValue = selectfeatures[i].style.fontShadowOffsetX;
                        transInfo.redoValue = parseInt(updated.value);
                        selectfeatures[i].style.fontShadowOffsetX = parseInt(updated.value);
                        selectfeatures[i].setStyle(selectfeatures[i].style);
                        break;
                    case displayTextContentName[16]:
                        transInfo.propertyName = "fontShadowOffsetY";
                        transInfo.undoValue = selectfeatures[i].style.fontShadowOffsetY;
                        transInfo.redoValue = parseInt(updated.value);
                        selectfeatures[i].style.fontShadowOffsetY = parseInt(updated.value);
                        selectfeatures[i].setStyle(selectfeatures[i].style);
                        break;
                    case displayNameNew[0]:
                        transInfo.functionName = "setArrowHeadType";
                        transInfo.undoParams = [selectfeatures[i].getArrowHeadType()];
                        transInfo.redoParams = [parseInt(updated.value)];
                        selectfeatures[i].setArrowHeadType(parseInt(updated.value));
                        break;
                    case displayNameNew[1]:
                        transInfo.functionName = "setArrowBodyType";
                        transInfo.undoParams = [selectfeatures[i].getArrowBodyType()];
                        transInfo.redoParams = [parseInt(updated.value)];
                        selectfeatures[i].setArrowBodyType(parseInt(updated.value));
                        break;
                    case displayNameNew[2]:
                        transInfo.functionName = "setArrowTailType";
                        transInfo.undoParams = [selectfeatures[i].getArrowTailType()];
                        transInfo.redoParams = [parseInt(updated.value)];
                        selectfeatures[i].setArrowTailType(parseInt(updated.value));
                        break;
                    case displayNameNew[3]:
                        transInfo.functionName = "setStartArrowType";
                        transInfo.undoParams = [selectfeatures[i].getStartArrowType()];
                        transInfo.redoParams = [parseInt(updated.value)];
                        selectfeatures[i].setStartArrowType(parseInt(updated.value));
                        break;
                    case displayNameNew[4]:
                        transInfo.functionName = "setEndArrowType";
                        transInfo.undoParams = [selectfeatures[i].getEndArrowType()];
                        transInfo.redoParams = [parseInt(updated.value)];
                        selectfeatures[i].setEndArrowType(parseInt(updated.value));
                        break;
                    case displayNameNew[5]:
                        transInfo.functionName = "setShowPathLine";
                        transInfo.undoParams = [selectfeatures[i].getShowPathLine()];
                        transInfo.redoParams = [fromCheckboxValue(updated.value)];
                        selectfeatures[i].setShowPathLine(fromCheckboxValue(updated.value));
                        break;
                    case displayNameNew[6]:
                        transInfo.functionName = "setCurveLine";
                        transInfo.undoParams = [selectfeatures[i].getIsCurveLine()];
                        transInfo.redoParams = [fromCheckboxValue(updated.value)];
                        selectfeatures[i].setCurveLine(fromCheckboxValue(updated.value));
                        break;
                    case displayNameNew[7]:
                        transInfo.functionName = "setShowPathLineArrow";
                        transInfo.undoParams = [selectfeatures[i].getShowPathLineArrow()];
                        transInfo.redoParams = [fromCheckboxValue(updated.value)];
                        selectfeatures[i].setShowPathLineArrow(fromCheckboxValue(updated.value));
                        break;
                    case displayNameNew[8]:
                        transInfo.functionName = "setAvoidLine";
                        transInfo.undoParams = [selectfeatures[i].getIsAvoidLine()];
                        transInfo.redoParams = [fromCheckboxValue(updated.value)];
                        selectfeatures[i].setAvoidLine(fromCheckboxValue(updated.value));
                        break;
                    case displayNameNew[9]:
                        transInfo.functionName = "setTextBoxType";
                        transInfo.undoParams = [selectfeatures[i].getTextBoxType()];
                        transInfo.redoParams = [parseInt(updated.value)];
                        selectfeatures[i].setTextBoxType(parseInt(updated.value));
                        break;
                    case displayNameNew[10]:
                        transInfo.functionName = "setRoundBox";
                        transInfo.undoParams = [selectfeatures[i].getRoundBox()];
                        transInfo.redoParams = [fromCheckboxValue(updated.value)];
                        selectfeatures[i].setRoundBox(fromCheckboxValue(updated.value));
                        break;
                    case displayNameNew[11]:
                        transInfo.functionName = "setFrame";
                        transInfo.undoParams = [selectfeatures[i].getFrame()];
                        transInfo.redoParams = [fromCheckboxValue(updated.value)];
                        selectfeatures[i].setFrame(fromCheckboxValue(updated.value));
                        break;
                    case displayNameNew[12]:
                        transInfo.functionName = "setRadiusLineType";
                        transInfo.undoParams = [selectfeatures[i].getRadiusLineType()];
                        transInfo.redoParams = [parseInt(updated.value)];
                        selectfeatures[i].setRadiusLineType(parseInt(updated.value));
                        break;
                    case displayNameNew[13]:
                        transInfo.functionName = "setRadiusTextPos";
                        transInfo.undoParams = [selectfeatures[i].getRadiusTextPos()];
                        transInfo.redoParams = [updated.value];
                        selectfeatures[i].setRadiusTextPos(updated.value);
                        break;
                    case displayNameNew[14]:
                        transInfo.functionName = "setRadiusText";
                        transInfo.undoParams = [selectfeatures[i].radiusText[0], 0];
                        transInfo.redoParams = [updated.value, 0];
                        selectfeatures[i].setRadiusText(updated.value, 0);
                        break;
                    case displayNameNew[15]:
                        transInfo.functionName = "setRadiusText";
                        transInfo.undoParams = [selectfeatures[i].radiusText[1], 1];
                        transInfo.redoParams = [updated.value, 1];
                        selectfeatures[i].setRadiusText(updated.value, 1);
                        break;
                    case displayNameNew[16]:
                        transInfo.functionName = "setVisible";
                        transInfo.undoParams = [selectfeatures[i].getVisible()];
                        transInfo.redoParams = [fromCheckboxValue(updated.value)];
                        selectfeatures[i].setVisible(fromCheckboxValue(updated.value));
                        break;
                    case displayNameNew[17]:
                        transInfo.functionName = "setType";
                        transInfo.undoParams = [selectfeatures[i].routeNode.type];
                        transInfo.redoParams = [updated.value];
                        selectfeatures[i].setType(updated.value);
                        break;
                    case displayNameNew[18]:
                        transInfo.functionName = "setRotate";
                        transInfo.undoParams = [selectfeatures[i].getRotate()];
                        transInfo.redoParams = [parseFloat(updated.value)];
                        selectfeatures[i].setRotate(parseFloat(updated.value));
                        break;
                    case displayNameNew[19]:
                        transInfo.functionName = "setLineRelationType";
                        transInfo.undoParams = [selectfeatures[i].getLineRelationType()];
                        transInfo.redoParams = [parseInt(updated.value)];
                        selectfeatures[i].setLineRelationType(parseInt(updated.value));
                        break;
                    case displayNameNew[20]:
                        transInfo.functionName = "setPolylineConnectLocationPoint";
                        transInfo.undoParams = [selectfeatures[i].getPolylineConnectLocationPoint()];
                        transInfo.redoParams = [fromCheckboxValue(updated.value)];
                        selectfeatures[i].setPolylineConnectLocationPoint(fromCheckboxValue(updated.value));
                        break;
                    case displayNameNew[21]:
                        transInfo.functionName = "setFontAlign";
                        transInfo.undoParams = [selectfeatures[i].style.labelAlign];
                        transInfo.redoParams = [fontAlignTypeValue(updated.value)];
                        selectfeatures[i].setFontAlign(fontAlignTypeValue(updated.value));
                        break;
                }
            }
            transaction.transInfos.push(transInfo);
        }
    }
}
function openDialog(obj) {
    let dashlines = obj.dashLines;
    for (let i = 0; i < dashlines.length; i++) {
        let typevalue = dashlines[i];
        let dom = document.getElementById("lineTypeUserDefineTable");
        let tbody = dom.children[0].children;
        let typename = dom.children[0].children[tbody.length - 1].children[0].innerHTML;
        var tr = document.createElement('tr');
        tr.classList.add("tabler")
        var th = document.createElement('th');
        th.classList.add("th")
        th.addEventListener("click", (e) => {
            let node = document.getElementsByClassName("tabler selected");
            if (node.length != 0) {
                node[0].classList.remove("selected");
            }
            e.target.parentElement.classList.add("selected");
        })
        if (typename == resources.text_dashedLine || typename == resources.text_lineType) {
            th.innerHTML = resources.text_solidLine;
        } else {
            th.innerHTML = resources.text_dashedLine;
        }
        var td = document.createElement('td');
        td.classList.add("td")
        var input = document.createElement('input');
        input.classList.add("lineTypeValue");
        input.value = typevalue;
        td.append(input);
        tr.append(th);
        tr.append(td);
        dom.children[0].append(tr);
    }
    document.getElementById('lineTypeUserDefine').style.display = "";
}