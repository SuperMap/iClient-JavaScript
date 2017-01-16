module("ServerStyle");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function() {
    expect(22);

    var serverStyle;
    serverStyle=new SuperMap.REST.ServerStyle();

    ok(serverStyle != null, "not null" );
    equal(serverStyle.fillBackColor.red, 255, "serverStyle.fillBackColor.red");
    equal(serverStyle.fillBackColor.green, 255, "serverStyle.fillBackColor.green");
    equal(serverStyle.fillBackColor.blue, 255, "serverStyle.fillBackColor.blue");
    ok(serverStyle.fillBackOpaque == false, "serverStyle.fillBackOpaque");
    equal(serverStyle.fillForeColor.red, 255, "serverStyle.fillForeColor.red");
    equal(serverStyle.fillForeColor.green, 0, "serverStyle.fillForeColor.green");
    equal(serverStyle.fillForeColor.blue, 0, "serverStyle.fillForeColor.blue");
    equal(serverStyle.fillGradientMode, null, "serverStyle.fillGradientMode"); 
    equal(serverStyle.fillGradientAngle, 0, "serverStyle.fillGradientAngle"); 
    equal(serverStyle.fillGradientOffsetRatioX, 0, "serverStyle.fillGradientOffsetRatioX"); 
    equal(serverStyle.fillGradientOffsetRatioY, 0, "serverStyle.fillGradientOffsetRatioY"); 
    equal(serverStyle.fillOpaqueRate, 100, "serverStyle.fillOpaqueRate"); 
    equal(serverStyle.fillSymbolID, 0, "serverStyle.fillSymbolID"); 
    equal(serverStyle.lineColor.red, 0, "serverStyle.lineColor.red");
    equal(serverStyle.lineColor.green, 0, "serverStyle.lineColor.green");
    equal(serverStyle.lineColor.blue, 0, "serverStyle.lineColor.blue");
    equal(serverStyle.lineSymbolID, 0, "serverStyle.lineSymbolID"); 
    equal(serverStyle.lineWidth, 1, "serverStyle.lineWidth"); 
    equal(serverStyle.markerAngle, 0, "serverStyle.markerAngle"); 
    equal(serverStyle.markerSize, 1, "serverStyle.markerSize"); 
    equal(serverStyle.markerSymbolID, -1, "serverStyle.markerSymbolID"); 

});

//测试设置参数值的有效性以及destroy的有效性
test("TestConstructor", function() {
    expect(38);

    var serverStyle;
    serverStyle=new SuperMap.REST.ServerStyle({
        fillBackColor: new SuperMap.REST.ServerColor(255, 0, 255),
        fillBackOpaque: true,
        fillForeColor: new SuperMap.REST.ServerColor(255, 255, 0),
        fillGradientMode: SuperMap.REST.FillGradientMode.LINEAR,
        fillGradientAngle: 30,
        fillGradientOffsetRatioX: 10,
        fillGradientOffsetRatioY: 10,
        fillOpaqueRate: 50,
        fillSymbolID: 2,
        lineColor: new SuperMap.REST.ServerColor(255, 0, 0),
        lineSymbolID: 2,
        lineWidth: 2,
        markerAngle: 30,
        markerSize: 2,
        markerSymbolID: 0
    });

    ok(serverStyle != null, "not null" );
    equal(serverStyle.fillBackColor.red, 255, "serverStyle.fillBackColor.red");
    equal(serverStyle.fillBackColor.green, 0, "serverStyle.fillBackColor.green");
    equal(serverStyle.fillBackColor.blue, 255, "serverStyle.fillBackColor.blue");
    ok(serverStyle.fillBackOpaque == true, "serverStyle.fillBackOpaque");
    equal(serverStyle.fillForeColor.red, 255, "serverStyle.fillForeColor.red");
    equal(serverStyle.fillForeColor.green, 255, "serverStyle.fillForeColor.green");
    equal(serverStyle.fillForeColor.blue, 0, "serverStyle.fillForeColor.blue");
    equal(serverStyle.fillGradientMode, SuperMap.REST.FillGradientMode.LINEAR, "serverStyle.fillGradientMode"); 
    equal(serverStyle.fillGradientAngle, 30, "serverStyle.fillGradientAngle"); 
    equal(serverStyle.fillGradientOffsetRatioX, 10, "serverStyle.fillGradientOffsetRatioX"); 
    equal(serverStyle.fillGradientOffsetRatioY, 10, "serverStyle.fillGradientOffsetRatioY"); 
    equal(serverStyle.fillOpaqueRate, 50, "serverStyle.fillOpaqueRate"); 
    equal(serverStyle.fillSymbolID, 2, "serverStyle.fillSymbolID"); 
    equal(serverStyle.lineColor.red, 255, "serverStyle.lineColor.red");
    equal(serverStyle.lineColor.green, 0, "serverStyle.lineColor.green");
    equal(serverStyle.lineColor.blue, 0, "serverStyle.lineColor.blue");
    equal(serverStyle.lineSymbolID, 2, "serverStyle.lineSymbolID"); 
    equal(serverStyle.lineWidth, 2, "serverStyle.lineWidth"); 
    equal(serverStyle.markerAngle, 30, "serverStyle.markerAngle"); 
    equal(serverStyle.markerSize, 2, "serverStyle.markerSize"); 
    equal(serverStyle.markerSymbolID, 0, "serverStyle.markerSymbolID"); 

    serverStyle.destroy();
    ok(serverStyle != null, "not null" );
    equal(serverStyle.fillBackColor, null, "serverStyle.fillBackColor");
    equal(serverStyle.fillBackOpaque, null, "serverStyle.fillBackOpaque");
    equal(serverStyle.fillForeColor, null, "serverStyle.fillForeColor");
    equal(serverStyle.fillGradientMode, null, "serverStyle.fillGradientMode"); 
    equal(serverStyle.fillGradientAngle, null, "serverStyle.fillGradientAngle"); 
    equal(serverStyle.fillGradientOffsetRatioX, null, "serverStyle.fillGradientOffsetRatioX"); 
    equal(serverStyle.fillGradientOffsetRatioY, null, "serverStyle.fillGradientOffsetRatioY"); 
    equal(serverStyle.fillOpaqueRate, null, "serverStyle.fillOpaqueRate"); 
    equal(serverStyle.fillSymbolID, null, "serverStyle.fillSymbolID"); 
    equal(serverStyle.lineColor, null, "serverStyle.lineColor");
    equal(serverStyle.lineSymbolID, null, "serverStyle.lineSymbolID"); 
    equal(serverStyle.lineWidth, null, "serverStyle.lineWidth"); 
    equal(serverStyle.markerAngle, null, "serverStyle.markerAngle"); 
    equal(serverStyle.markerSize, null, "serverStyle.markerSize"); 
    equal(serverStyle.markerSymbolID, null, "serverStyle.markerSymbolID"); 

});


//使用部分参数构建对象时应该将其余参数置为默认值
test("TestDestructor0", function() {
    expect(22);

    var serverStyle;
    serverStyle=new SuperMap.REST.ServerStyle({
        fillBackColor: new SuperMap.REST.ServerColor(255, 0, 255),
        fillForeColor: new SuperMap.REST.ServerColor(255, 255, 0),
        fillGradientMode: SuperMap.REST.FillGradientMode.LINEAR,
        fillGradientAngle: 30,
        fillOpaqueRate: 50,
        fillSymbolID: 2,
        lineColor: new SuperMap.REST.ServerColor(255, 0, 0),
        markerSize: 2,
        markerSymbolID: 0
    });

    ok(serverStyle != null, "not null" );
    equal(serverStyle.fillBackColor.red, 255, "serverStyle.fillBackColor.red");
    equal(serverStyle.fillBackColor.green, 0, "serverStyle.fillBackColor.green");
    equal(serverStyle.fillBackColor.blue, 255, "serverStyle.fillBackColor.blue");
    ok(serverStyle.fillBackOpaque == false, "serverStyle.fillBackOpaque");
    equal(serverStyle.fillForeColor.red, 255, "serverStyle.fillForeColor.red");
    equal(serverStyle.fillForeColor.green, 255, "serverStyle.fillForeColor.green");
    equal(serverStyle.fillForeColor.blue, 0, "serverStyle.fillForeColor.blue");
    equal(serverStyle.fillGradientMode, SuperMap.REST.FillGradientMode.LINEAR, "serverStyle.fillGradientMode"); 
    equal(serverStyle.fillGradientAngle, 30, "serverStyle.fillGradientAngle"); 
    equal(serverStyle.fillGradientOffsetRatioX, 0, "serverStyle.fillGradientOffsetRatioX"); 
    equal(serverStyle.fillGradientOffsetRatioY, 0, "serverStyle.fillGradientOffsetRatioY"); 
    equal(serverStyle.fillOpaqueRate, 50, "serverStyle.fillOpaqueRate"); 
    equal(serverStyle.fillSymbolID, 2, "serverStyle.fillSymbolID"); 
    equal(serverStyle.lineColor.red, 255, "serverStyle.lineColor.red");
    equal(serverStyle.lineColor.green, 0, "serverStyle.lineColor.green");
    equal(serverStyle.lineColor.blue, 0, "serverStyle.lineColor.blue");
    equal(serverStyle.lineSymbolID, 0, "serverStyle.lineSymbolID"); 
    equal(serverStyle.lineWidth, 1, "serverStyle.lineWidth"); 
    equal(serverStyle.markerAngle, 0, "serverStyle.markerAngle"); 
    equal(serverStyle.markerSize, 2, "serverStyle.markerSize"); 
    equal(serverStyle.markerSymbolID, 0, "serverStyle.markerSymbolID"); 
});

//测试fromJson方法的有效性
test("TestFromJson_toServerJSONObject", function() {
    expect(40);

    var myJsonObject = {
        "fillBackColor": {
            "blue": 255,
            "green": 255,
            "red": 255
        },
        "fillBackOpaque": true,
        "fillForeColor": {
            "blue": 255,
            "green": 255,
            "red": 255
        },
        "fillGradientAngle": 0,
        "fillGradientMode": "NONE",
        "fillGradientOffsetRatioX": 0,
        "fillGradientOffsetRatioY": 0,
        "fillOpaqueRate": 100,
        "fillSymbolID": 0,
        "lineColor": {
            "blue": 0,
            "green": 0,
            "red": 0
        },
        "lineSymbolID": 0,
        "lineWidth": 0.1,
        "markerAngle": 0,
        "markerSize": 2.4,
        "markerSymbolID": 0
    };

    var serverStyle = SuperMap.REST.ServerStyle.fromJson(myJsonObject);

    ok(serverStyle != null, "not null" );
    equal(serverStyle.fillBackColor.red, 255, "serverStyle.fillBackColor.red");
    equal(serverStyle.fillBackColor.green, 255, "serverStyle.fillBackColor.green");
    equal(serverStyle.fillBackColor.blue, 255, "serverStyle.fillBackColor.blue");
    ok(serverStyle.fillBackOpaque == true, "serverStyle.fillBackOpaque");
    equal(serverStyle.fillForeColor.red, 255, "serverStyle.fillForeColor.red");
    equal(serverStyle.fillForeColor.green, 255, "serverStyle.fillForeColor.green");
    equal(serverStyle.fillForeColor.blue, 255, "serverStyle.fillForeColor.blue");
    equal(serverStyle.fillGradientMode,  "NONE", "serverStyle.fillGradientMode"); 
    equal(serverStyle.fillGradientAngle, 0, "serverStyle.fillGradientAngle"); 
    equal(serverStyle.fillGradientOffsetRatioX, 0, "serverStyle.fillGradientOffsetRatioX"); 
    equal(serverStyle.fillGradientOffsetRatioY, 0, "serverStyle.fillGradientOffsetRatioY"); 
    equal(serverStyle.fillOpaqueRate, 100, "serverStyle.fillOpaqueRate"); 
    equal(serverStyle.fillSymbolID, 0, "serverStyle.fillSymbolID"); 
    equal(serverStyle.lineColor.red, 0, "serverStyle.lineColor.red");
    equal(serverStyle.lineColor.green, 0, "serverStyle.lineColor.green");
    equal(serverStyle.lineColor.blue, 0, "serverStyle.lineColor.blue");
    equal(serverStyle.lineSymbolID, 0, "serverStyle.lineSymbolID"); 
    equal(serverStyle.lineWidth, 0.1, "serverStyle.lineWidth"); 
    equal(serverStyle.markerAngle, 0, "serverStyle.markerAngle"); 
    equal(serverStyle.markerSize, 2.4, "serverStyle.markerSize"); 
    equal(serverStyle.markerSymbolID, 0, "serverStyle.markerSymbolID"); 
	
	var jsonObj = serverStyle.toServerJSONObject();
	ok(jsonObj != null, "jsonObj");
	ok(jsonObj.fillBackColor != null, "jsonObj.fillBackColor");
	ok(jsonObj.fillForeColor != null, "jsonObj.fillForeColor");
	ok(jsonObj.fillBackOpaque == true, "jsonObj.fillBackOpaque");
	equal(jsonObj.fillGradientMode,  "NONE", "jsonObj.fillGradientMode"); 
    equal(jsonObj.fillGradientAngle, 0, "jsonObj.fillGradientAngle"); 
    equal(jsonObj.fillGradientOffsetRatioX, 0, "jsonObj.fillGradientOffsetRatioX"); 
    equal(jsonObj.fillGradientOffsetRatioY, 0, "jsonObj.fillGradientOffsetRatioY"); 
    equal(jsonObj.fillOpaqueRate, 100, "jsonObj.fillOpaqueRate"); 
    equal(jsonObj.fillSymbolID, 0, "jsonObj.fillSymbolID"); 
    equal(jsonObj.lineColor.red, 0, "jsonObj.lineColor.red");
    equal(jsonObj.lineColor.green, 0, "jsonObj.lineColor.green");
    equal(jsonObj.lineColor.blue, 0, "jsonObj.lineColor.blue");
    equal(jsonObj.lineSymbolID, 0, "jsonObj.lineSymbolID"); 
    equal(jsonObj.lineWidth, 0.1, "jsonObj.lineWidth"); 
    equal(jsonObj.markerAngle, 0, "jsonObj.markerAngle"); 
    equal(jsonObj.markerSize, 2.4, "jsonObj.markerSize"); 
    equal(jsonObj.markerSymbolID, 0, "jsonObj.markerSymbolID"); 
});

test("TestFromJson_null", function() {
    var serverStyle = SuperMap.REST.ServerStyle.fromJson();

    ok(serverStyle == null, "null" );
});

test("ServerColore_TestFromJson_null", function() {
    var ServerColor = SuperMap.REST.ServerColor.fromJson();

    ok(ServerColor == null, "null" );
});

