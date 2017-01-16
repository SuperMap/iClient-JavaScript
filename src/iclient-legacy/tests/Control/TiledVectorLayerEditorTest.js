/**
 * Created by HD on 2016/12/26.
 */
module("TiledVectorLayerEditor");

//数据
var yu_url = "http://localhost:8090/iserver/services/map-china400/rest/maps/China";

test("testTiledVectorLayerEditor_constructor", 16, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    editor.activate();
    layer.events.on({
        "layerInitialized": function () {
            map.addLayers(layer);
            map.addControls(editor);
        }
    });
    ok(editor.layer instanceof SuperMap.Layer.TiledVectorLayer, "the layer is TiledVectorLayer");
    ok(editor.position instanceof SuperMap.Pixel, "the position is pixel");
    equal(editor.position.x, 0, "the position_x is 0");
    equal(editor.position.y, 0, "the position_y is 0");
    equal(editor.autoHide, false, "params.autoHide");
    equal(editor.cartoCss, null, "params.cartoCss");
    equals(editor.subPanel.layerInfo, null, "the subPanel is null");
    equals(editor.subPanel.pointEdit, null, "the subPanel is null");
    equals(editor.subPanel.lineEdit, null, "the subPanel is null");
    equals(editor.subPanel.polygonEdit, null, "the subPanel is null");
    equals(editor.subPanel.textEdit, null, "the subPanel is null");
    same(editor.sliders, [], "the sliders is array");
    same(editor.layerSymbolsInfo, {}, "the layerSymbolsInfo is null");
    equal(editor.colorPicker, null, "params.colorPicker");
    equal(editor._offsetX, 0, "params._offsetX");
    equal(editor._offsetY, 0, "params._offsetY");
    layer.destroy();
    editor.destroy();
});

test("testTiledVectorLayerEditor_destroy", 22, function () {
    var url = "http://localhost:8090/iserver/services/map-china400/rest/maps/China";
    var tiledVectorLayer = new SuperMap.Layer.TiledVectorLayer("China", url, {cacheEnabled: true}, {useLocalStorage: true});
    var options = {
        position: new SuperMap.Pixel(10, 10),
        autoHide: true,
        layer: tiledVectorLayer,
        editorName: "tiledVectorLayer"
    };
    var editor = new SuperMap.Control.TiledVectorLayerEditor(options);
    equal(editor.position.x, 10, "destroy前position_x为10");
    equal(editor.position.y, 10, "destroy前position_y为10");
    equal(editor.autoHide, true, "destroy前autoHide属性为true");
    ok(editor.layer, "destroy前layer不为空");
    equal(editor.editorName, "tiledVectorLayer", "destroy前editorName值为'tiledVectorLayer'");
    editor.destroy();
    equal(editor.position, null, "function:destroy_params.position");
    equal(editor.layer, null, "function:destroy_params.layer");
    equal(editor.cartoCss, null, "function:destroy_params.cartoCss");
    same(editor.layerSymbolsInfo, null, "function:destroy_params.layerSymbolsInfo");
    equal(editor.currentLayerSymbolsInfo, null, "function:destroy_params.currentLayerSymbolsInfo");
    equal(editor.editorName, null, "function:destroy_params.editorName");
    equal(editor.mainPanel, null, "function:destroy_params.mainPanel");
    equal(editor.closeBtn, null, "function:destroy_params.closeBtn");
    equal(editor.mainPanelBody, null, "function:destroy_params.mainPanelBody");
    same(editor.subPanel, null, "params.subPanel");
    same(editor.sliders, [], "function:destroy_params.sliders");
    equal(editor.colorPicker, null, "function:destroy_params.colorPicker");
    equal(editor._drag, null, "function:destroy_params._drag");
    equal(editor._drop, null, "function:destroy_params._drop");
    equal(editor._offsetX, null, "function:destroy_params._offsetX");
    equal(editor._offsetY, null, "function:destroy_params._offsetY");
    equal(editor.autoHide, true, "destroy后autoHide属性与destroy前保持一致");
    tiledVectorLayer.destroy();
});

test("testTiledVectorLayerEditor_isAttachTo", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    ok(editor.isAttachTo(layer), "isAttachTo is true");
    layer.destroy();
    editor.destroy();
});

test("testTiledVectorLayerEditor_isAttachTo_TiledVectorLayer", 1, function () {
    //layer为空
    var editor = new SuperMap.Control.TiledVectorLayerEditor();
    editor.activate();
    var isAttach = editor.isAttachTo();
    equal(isAttach, false, "function:isAttachTo");
    editor.destroy();
});

test("testTiledVectorLayerEditor_saveState", 2, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var options = {
        position: new SuperMap.Pixel(10, 10),
        autoHide: true,
        layer: layer,
        layerSymbolsInfo: null
    };
    var editor = new SuperMap.Control.TiledVectorLayerEditor(options);
    map.addControl(editor);
    editor.activate();
    var saveState = editor.saveState();
    var expectState = {
        "position": {"x": 10, "y": 10},
        "autoHide": true,
        "layerSymbolsInfo": {}
    };
    ok(saveState, "saveState is true");
    same(saveState, expectState, "function:saveState");
    layer.destroy();
    editor.destroy();
});

test("testTiledVectorLayerEditor_save", 3, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    editor.cartoCss = "@color\:blue;";
    editor.save();
    ok(editor.layer.clientCartoCss, "save is true");
    equals(editor.layer.currentHightlightShader, null, "save is true");
    equals(editor.layer.featureStyleMap, null, "save is true");
    layer.destroy();
    editor.destroy();
});

test("testTiledVectorLayerEditor_setVisibility", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    ok(editor.setVisibility(), "setVisibility is true");
    layer.destroy();
    editor.destroy();
});

test("testTiledVectorLayerEditor_open", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    ok(editor.open(), "open is true");
    layer.destroy();
    editor.destroy();
});

test("testTiledVectorLayerEditor_close", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    ok(editor.close(), "close is true");
    layer.destroy();
    editor.destroy();
});

test("testTiledVectorLayerEditor_toggle", 2, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    editor.div.style.display = "none";
    editor.toggle();
    equals(editor.div.style.display, "block", "toggle is true");
    editor.div.style.display = "block";
    editor.toggle();
    equals(editor.div.style.display, "none", "toggle is true");
    layer.destroy();
    editor.destroy();
});

test("testTiledVectorLayerEditor_draw", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    editor.activate();
    layer.events.on({
        "layerInitialized": function () {
            map.addLayers(layer);
            map.addControls(editor);
        }
    });
    //console.log(editor.div);
    //<div id="SuperMap.Control.TiledVectorLayerEditor_38" class="smControlTiledVectorLayerEditor smControlNoSelect" unselectable="on" style="position: absolute; left: 0px; top: 0px;"></div>
    editor.draw();
    //console.log(editor.div);
    equals(editor.div.className, "smControlTiledVectorLayerEditor smControlNoSelect", "draw is true");
    layer.destroy();
    editor.destroy();
});

test("testTiledVectorLayerEditor_initEditorViewer", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    editor.initEditorViewer();
    ok(editor.colorPicker instanceof SuperMap.Tool.ColorPicker, "initEditorViewer is true");
    layer.destroy();
    editor.destroy();
});

test("testTiledVectorLayerEditor_createEditorCloseBtn", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    var editorCloseBtn = editor.createEditorCloseBtn();
    //console.log(editorCloseBtn.title);
    equals(editorCloseBtn.title, "关闭编辑器", "createEditorCloseBtn is true");
    layer.destroy();
    editor.destroy();
});

test("testTiledVectorLayerEditor_handleCloseBtnClick", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    //editor.handleCloseBtnClick();
    ok(editor.close(), "handleCloseBtnClick is true");
    layer.destroy();
    editor.destroy();
});

test("testTiledVectorLayerEditor_createMainPanel", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    editor.activate();
    layer.events.on({
        "layerInitialized": function () {
            map.addLayers(layer);
            map.addControls(editor);
        }
    });
    editor.createMainPanel();
    equals(editor.createMainPanel().firstChild.id.slice(0, 21), "editorMainPanelHeader", "createMainPanel is true");
});

test("testTiledVectorLayerEditor_createLayerInfoPanel", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    editor.layer.initializeLayersInfo();
    editor.createMainPanel();
    editor.createLayerInfoPanel();
    ok(editor.mainPanelBody.firstChild, "createLayerInfoPane is true");
});

test("testTiledVectorLayerEditor_createPointEditPanel", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    editor.layer.initializeLayersInfo();
    editor.createMainPanel();
    editor.createPointEditPanel();
    var text = editor.mainPanelBody.firstChild.firstChild.innerText;
    console.log(text);
    equals(text, "点图层", "createPointEditPanel is true");
});

test("testTiledVectorLayerEditor_createLineEditPanel", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    editor.layer.initializeLayersInfo();
    //console.log(editor.layer.layersInfo);
    editor.createMainPanel();
    editor.createLineEditPanel();
    var text = editor.mainPanelBody.firstChild.firstChild.innerText;
    console.log(text);
    equals(text, "线图层", "createLineEditPanel is true");
});

test("testTiledVectorLayerEditor_createPolygonEditPanel", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    editor.layer.initializeLayersInfo();
    //console.log(editor.layer.layersInfo);
    editor.createMainPanel();
    editor.createPolygonEditPanel();
    var text = editor.mainPanelBody.firstChild.firstChild.innerText;
    console.log(text);
    equals(text, "面图层", "createPolygonEditPanel is true");

});

test("testTiledVectorLayerEditor_createTextEditPanel", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    editor.createMainPanel();
    editor.createTextEditPanel();
    var text = editor.mainPanelBody.firstChild.firstChild.innerText;
    console.log(text);
    equals(text, "文本图层", "createTextEditPanel is true");

});


test("testTiledVectorLayerEditor_handleEditPanelMouseWheel", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    editor.colorPicker = new SuperMap.Tool.ColorPicker();
    editor.colorPicker.pickerDiv.style.display = "block";
    editor.handleEditPanelMouseWheel();
    equals(editor.colorPicker.pickerDiv.style.display, "none", "handleEditPanelMouseWheel is true");
});
test("testTiledVectorLayerEditor_createSubEditPanelContent", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    ok(editor.createSubEditPanelContent("point"), "createSubEditPanelContent is true");
    layer.destroy();
    editor.destroy();
});

test("testTiledVectorLayerEditor_createInputControl", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    var editPanelInfo = SuperMap.Control.TiledVectorLayerEditor.CARTOCSSATTRLIST["point"];
    var attributes = editPanelInfo[0];
    var controlType = attributes.controlType;
    var prop = attributes.propName;
    var langKey = SuperMap.String.camelize(prop);
    var label = SuperMap.i18n(langKey + "Label");
    var desc = SuperMap.i18n(langKey + "Title");
    var options = {
        "propName": prop,
        "description": desc,
        "unit": attributes.unit,
        "min": attributes.minValue,
        "max": attributes.maxValue,
        "default": attributes.defaultValue
    };

    ok(editor.createInputControl(label, controlType, options), "createInputControl is true");
});

test("testTiledVectorLayerEditor_getCurrentLayerSymbolsInfoFromPanel", function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    editor.currentLayerSymbolsInfo = {
        "layerName": "layer",
        "layerType": "region",
        "layerSymbols": [
            {"lineWidth": 2, "lineColor": "#aaa"},
            {"lineWidth": 1, "lineColor": "#222"}
        ]
    };
    //console.log(editor.currentLayerSymbolsInfo.layerSymbols[0].lineWidth);
    editor.createMainPanel();
    editor.createSubPanel("polygonEdit", SuperMap.i18n("region"));
    editor.getCurrentLayerSymbolsInfoFromPanel();
    //console.log(editor.currentLayerSymbolsInfo.layerSymbols[0].lineWidth);
    ok(!editor.currentLayerSymbolsInfo.layerSymbols[0].lineWidth, "getCurrentLayerSymbolsInfoFromPanel is true");
    layer.destroy();
    editor.destroy();
});

test("testTiledVectorLayerEditor_layerSymbolsInfo2CartoCssl", function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    //console.log(editor.cartoCss);
    editor.layerSymbolsInfo2CartoCss();
    //console.log(typeof editor.cartoCss);
    equals(editor.cartoCss, "", "layerSymbolsInfo2CartoCss is true");
    //ok(editor.layerSymbolsInfo2CartoCss(), "layerSymbolsInfo2CartoCss is true");
    layer.destroy();
    editor.destroy();
});

test("testTiledVectorLayerEditor_createSelectControl", 1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledVectorLayer("China", yu_url, {cacheEnabled: true}, {useLocalStorage: true});
    var editor = new SuperMap.Control.TiledVectorLayerEditor({"layer": layer});
    map.addControl(editor);
    editor.activate();
    var editPanelInfo = SuperMap.Control.TiledVectorLayerEditor.CARTOCSSATTRLIST["point"];
    var attributes = editPanelInfo[0];
    var prop = attributes.propName;
    var langKey = SuperMap.String.camelize(prop);
    var label = SuperMap.i18n(langKey + "Label");
    var desc = SuperMap.i18n(langKey + "Title");
    var options = {
        "propName": prop,
        "description": desc,
        "unit": attributes.unit,
        "min": attributes.minValue,
        "max": attributes.maxValue,
        "default": attributes.defaultValue
    };

    ok(editor.createSelectControl(label, options), "createInputControl is true");
});
