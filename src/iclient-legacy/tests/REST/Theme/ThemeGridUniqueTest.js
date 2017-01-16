module("ThemeGridUnique");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function() {
    expect(5);

    var themeGridUnique;
    themeGridUnique=new SuperMap.REST.ThemeGridUnique();

    ok(themeGridUnique != null, "not null" );
    equal(themeGridUnique.defaultcolor.red, 255, "themeGridUnique.defaultcolor.red");
    equal(themeGridUnique.defaultcolor.green, 0, "themeGridUnique.defaultcolor.green");
    equal(themeGridUnique.defaultcolor.blue, 0, "themeGridUnique.defaultcolor.blue");
    equal(themeGridUnique.items, null, "themeGridUnique.items");
});

//测试设置参数值的有效性以及destroy的有效性
test("TestConstructor", function() {
    expect(13);

    var themeGridUniqueItem;
    themeGridUniqueItem=new SuperMap.REST.ThemeGridUniqueItem({
        caption: "test",
        color: new SuperMap.REST.ServerColor(145,0,0),
        unique: 5,
        visible: false
    });

    var themeGridUnique;
    themeGridUnique=new SuperMap.REST.ThemeGridUnique({
        items:new Array(themeGridUniqueItem),
        defaultcolor: new SuperMap.REST.ServerColor(0,255,0)
    });

    ok(themeGridUnique != null, "not null" );
    equal(themeGridUnique.items[0].caption, "test", "themeGridUnique.items[0].caption");
    equal(themeGridUnique.items[0].color.red, 145, "themeGridUnique.items[0].color.red");
    equal(themeGridUnique.items[0].color.green, 0, "themeGridUnique.items[0].color.green");
    equal(themeGridUnique.items[0].color.blue, 0, "themeGridUnique.items[0].color.blue");
    equal(themeGridUnique.items[0].unique, 5, "themeGridUnique.items[0].unique");
    ok(themeGridUnique.items[0].visible == false, "themeGridUnique.items[0].visible");
    equal(themeGridUnique.defaultcolor.red, 0, "themeGridUnique.defaultcolor.red");
    equal(themeGridUnique.defaultcolor.green, 255, "themeGridUnique.defaultcolor.green");
    equal(themeGridUnique.defaultcolor.blue, 0, "themeGridUnique.defaultcolor.blue");

    themeGridUnique.destroy();
    ok(themeGridUnique != null, "not null" );
    equal(themeGridUnique.items, null, "themeGridUnique.items");
    equal(themeGridUnique.defaultcolor, null, "themeGridUnique.defaultcolor");
});


//使用部分参数构建对象时应该将其余参数置为默认值
test("TestDestructor0", function() {
    expect(5);

    var themeGridUnique;
    themeGridUnique=new SuperMap.REST.ThemeGridUnique({
        items:new Array()
    });

    ok(themeGridUnique != null, "not null" );
    equal(themeGridUnique.items.length, 0, "themeGridUnique.items");
    equal(themeGridUnique.defaultcolor.red, 255, "themeGridUnique.defaultcolor.red");
    equal(themeGridUnique.defaultcolor.green, 0, "themeGridUnique.defaultcolor.green");
    equal(themeGridUnique.defaultcolor.blue, 0, "themeGridUnique.defaultcolor.blue");
});


