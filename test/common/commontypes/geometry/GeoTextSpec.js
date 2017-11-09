require('../../../../src/common/commontypes/geometry/GeoText');

describe('GeoText', function () {
    it('constructor, destroy', function () {
        var x = 100, y = 35, text = "中华人民共和国";
        var geoText = new SuperMap.Geometry.GeoText(x, y, text);
        geoText.bsInfo = {
            h: 100,
            w: 150
        };
        var geoTextFeature = new SuperMap.Feature.Vector(geoText);
        expect(geoText).not.toBeNull();
        expect(geoTextFeature).not.toBeNull();
        expect(geoTextFeature.CLASS_NAME).toEqual("SuperMap.Feature.Vector");
        expect(geoTextFeature.id).not.toBeNull();
        expect(geoTextFeature.geometry.CLASS_NAME).toEqual("SuperMap.Geometry.GeoText");
        expect(geoTextFeature.geometry.id).not.toBeNull();
        expect(geoTextFeature.geometry.text).toEqual(text);
        expect(geoTextFeature.geometry.x).toEqual(x);
        expect(geoTextFeature.geometry.y).toEqual(y);
        expect(geoTextFeature.geometry.bsInfo.w).toEqual(150);
        expect(geoTextFeature.geometry.bsInfo.h).toEqual(100);
        geoText.destroy();
        expect(geoTextFeature.geometry.text).toBeNull();
        expect(geoTextFeature.geometry.x).toBeNull();
        expect(geoTextFeature.geometry.y).toBeNull();
    });

    it('clone', function () {
        var x = 100, y = 35, text = "中华人民共和国";
        var geoText = new SuperMap.Geometry.GeoText(x, y, text);
        var obj = geoText.clone();
        expect(geoText).not.toBeNull();
        expect(geoText.id).not.toBeNull();
        expect(obj).not.toBeNull();
        expect(obj.id).not.toBeNull();
        expect(obj.id).not.toEqual(geoText.id);
        expect(obj.x).toEqual(geoText.x);
        expect(obj.x).toEqual(x);
        expect(obj.y).toEqual(geoText.y);
        expect(obj.y).toEqual(y);
        expect(obj.text).toEqual(geoText.text);
        expect(obj.text).toEqual(text);
        geoText.destroy();
    });

    it('calculateBounds', function () {
        var x = 100, y = 35, text = "中华人民共和国";
        var geoText = new SuperMap.Geometry.GeoText(x, y, text);
        geoText.calculateBounds();
        expect(geoText).not.toBeNull();
        expect(geoText.bounds).not.toBeNull();
        expect(geoText.bounds.bottom).toEqual(geoText.bounds.top);
        expect(geoText.bounds.bottom).toEqual(y);
        expect(geoText.bounds.left).toEqual(geoText.bounds.right);
        expect(geoText.bounds.left).toEqual(x);
        geoText.destroy();
    });

    //获取标签对象的质心
    it('getCentroid', function () {
        var x = 100, y = 35, text = "中华人民共和国";
        var geoText = new SuperMap.Geometry.GeoText(x, y, text);
        var centroid = geoText.getCentroid();
        expect(centroid).not.toBeNull();
        expect(centroid.CLASS_NAME).toEqual("SuperMap.Geometry.Point");
        expect(centroid.id).not.toBeNull();
        expect(centroid.type).toEqual("Point");
        expect(centroid.x).toEqual(100);
        expect(centroid.y).toEqual(35);
        geoText.destroy();
    });

    //根据绘制好的标签获取文字标签的像素范围，参数的单位是像素
    it('getLabelPxBoundsByLabel', function () {
        var x = 0, y = 0, text = "test";
        var geoText = new SuperMap.Geometry.GeoText(x, y, text);
        var locationPixel = {X: 0, y: 0};
        var labelWidth = "100px";
        var labelHeight = "60px";
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
        var labelBounds = geoText.getLabelPxBoundsByLabel(locationPixel, labelWidth, labelHeight, style);
        expect(labelBounds).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(30);
        expect(labelBounds.top).toEqual(-30);
        //测试style.labelAlign在不同取值下的标签的像素范围
        style.labelAlign = "lt";
        var labelBounds_lt = geoText.getLabelPxBoundsByLabel(locationPixel, labelWidth, labelHeight, style);
        expect(labelBounds_lt).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(30);
        expect(labelBounds.top).toEqual(-30);
        style.labelAlign = "lm";
        var labelBounds_lm = geoText.getLabelPxBoundsByLabel(locationPixel, labelWidth, labelHeight, style);
        expect(labelBounds_lm).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(30);
        expect(labelBounds.top).toEqual(-30);
        style.labelAlign = "lb";
        var labelBounds_lb = geoText.getLabelPxBoundsByLabel(locationPixel, labelWidth, labelHeight, style);
        expect(labelBounds_lb).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(30);
        expect(labelBounds.top).toEqual(-30);
        style.labelAlign = "ct";
        var labelBounds_ct = geoText.getLabelPxBoundsByLabel(locationPixel, labelWidth, labelHeight, style);
        expect(labelBounds_ct).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(30);
        expect(labelBounds.top).toEqual(-30);
        style.labelAlign = "cb";
        var labelBounds_cb = geoText.getLabelPxBoundsByLabel(locationPixel, labelWidth, labelHeight, style);
        expect(labelBounds_cb).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(30);
        expect(labelBounds.top).toEqual(-30);
        style.labelAlign = "rt";
        var labelBounds_rt = geoText.getLabelPxBoundsByLabel(locationPixel, labelWidth, labelHeight, style);
        expect(labelBounds_rt).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(30);
        expect(labelBounds.top).toEqual(-30);
        style.labelAlign = "rm";
        var labelBounds_rm = geoText.getLabelPxBoundsByLabel(locationPixel, labelWidth, labelHeight, style);
        expect(labelBounds_rm).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(30);
        expect(labelBounds.top).toEqual(-30);
        style.labelAlign = "rb";
        var labelBounds_rb = geoText.getLabelPxBoundsByLabel(locationPixel, labelWidth, labelHeight, style);
        expect(labelBounds_rb).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(30);
        expect(labelBounds.top).toEqual(-30);
        geoText.destroy();
    });

    // 根据文本内容获取文字标签的像素范围 处理斜体字
    it('getLabelPxBoundsByText_italic', function () {
        var x = 0, y = 0, text = "test";
        var geoText = new SuperMap.Geometry.GeoText(x, y, text);
        var locationPixel = {X: 10, y: 10};
        var style = {
            fill: true,
            fillColor: "#FFFFFF",
            fillOpacity: 1,
            fontColor: "#000000",
            fontFamily: "arial,sans-serif",
            fontOpacity: 1,
            fontSize: "12px",
            fontStyle: "italic",
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
        var labelBounds = geoText.getLabelPxBoundsByText(locationPixel, style);
        expect(labelBounds).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(18.2);
        expect(labelBounds.top).toEqual(1.8);
        //测试style.labelAlign在不同取值下的标签的像素范围
        style.labelAlign = "lt";
        var labelBounds_lt = geoText.getLabelPxBoundsByText(locationPixel, style);
        expect(labelBounds_lt).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(18.2);
        expect(labelBounds.top).toEqual(1.8);
        style.labelAlign = "lm";
        var labelBounds_lm = geoText.getLabelPxBoundsByText(locationPixel, style);
        expect(labelBounds_lm).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(18.2);
        expect(labelBounds.top).toEqual(1.8);
        style.labelAlign = "lb";
        var labelBounds_lb = geoText.getLabelPxBoundsByText(locationPixel, style);
        expect(labelBounds_lb).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(18.2);
        expect(labelBounds.top).toEqual(1.8);
        style.labelAlign = "ct";
        var labelBounds_ct = geoText.getLabelPxBoundsByText(locationPixel, style);
        expect(labelBounds_ct).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(18.2);
        expect(labelBounds.top).toEqual(1.8);
        style.labelAlign = "cb";
        var labelBounds_cb = geoText.getLabelPxBoundsByText(locationPixel, style);
        expect(labelBounds_cb).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(18.2);
        expect(labelBounds.top).toEqual(1.8);
        style.labelAlign = "rt";
        var labelBounds_rt = geoText.getLabelPxBoundsByText(locationPixel, style);
        expect(labelBounds_rt).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(18.2);
        expect(labelBounds.top).toEqual(1.8);
        style.labelAlign = "rm";
        var labelBounds_rm = geoText.getLabelPxBoundsByText(locationPixel, style);
        expect(labelBounds_rm).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(18.2);
        expect(labelBounds.top).toEqual(1.8);
        style.labelAlign = "rb";
        var labelBounds_rb = geoText.getLabelPxBoundsByText(locationPixel, style);
        expect(labelBounds_rb).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(18.2);
        expect(labelBounds.top).toEqual(1.8);
        geoText.destroy();
    });

    // 根据文本内容获取文字标签的像素范围 正常字体
    it('getLabelPxBoundsByText_normalontStyle', function () {
        var x = 0, y = 0, text = "test";
        var geoText = new SuperMap.Geometry.GeoText(x, y, text);
        var locationPixel = {X: 10, y: 10};
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
        var labelBounds = geoText.getLabelPxBoundsByText(locationPixel, style);
        expect(labelBounds).not.toBeNull();
        expect(labelBounds.CLASS_NAME).toEqual("SuperMap.Bounds");
        expect(labelBounds.bottom).toEqual(18.2);
        expect(labelBounds.top).toEqual(1.8);
        geoText.destroy();
    });
});