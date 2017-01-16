
module("ThemeGridUniqueItem");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function() {
    expect(7);

    var themeGridUniqueItem;
    themeGridUniqueItem=new SuperMap.REST.ThemeGridUniqueItem();

    ok(themeGridUniqueItem != null, "not null" );
    equal(themeGridUniqueItem.caption, null, "themeGridUniqueItem.caption");
    equal(themeGridUniqueItem.color.red, 255, "themeGridUniqueItem.color.red");
    equal(themeGridUniqueItem.color.green, 0, "themeGridUniqueItem.color.green");
    equal(themeGridUniqueItem.color.blue, 0, "themeGridUniqueItem.color.blue");
    equal(themeGridUniqueItem.unique, null, "themeGridUniqueItem.unique");
    ok(themeGridUniqueItem.visible == true, "themeGridUniqueItem.visible");
});

//测试设置参数值的有效性以及destroy的有效性
test("TestConstructor", function() {
    expect(12);

    var themeGridUniqueItem;
    themeGridUniqueItem=new SuperMap.REST.ThemeGridUniqueItem({
        caption: "test",
        color: new SuperMap.REST.ServerColor(150,170,36),
        unique: 5,
        visible: false
    });

    ok(themeGridUniqueItem != null, "not null" );
    equal(themeGridUniqueItem.caption, "test", "themeGridUniqueItem.caption");
    equal(themeGridUniqueItem.color.red, 150, "themeGridUniqueItem.color.red");
    equal(themeGridUniqueItem.color.green, 170, "themeGridUniqueItem.color.green");
    equal(themeGridUniqueItem.color.blue, 36, "themeGridUniqueItem.color.blue");
    equal(themeGridUniqueItem.unique, 5, "themeGridUniqueItem.unique");
    ok(themeGridUniqueItem.visible == false, "themeGridUniqueItem.visible")

    themeGridUniqueItem.destroy();
    ok(themeGridUniqueItem != null, "not null" );
    equal(themeGridUniqueItem.caption, null, "themeGridUniqueItem.caption");
    equal(themeGridUniqueItem.color, null, "themeGridUniqueItem.color");
    equal(themeGridUniqueItem.unique, null, "themeGridUniqueItem.unique");
    equal(themeGridUniqueItem.visible, null, "themeGridUniqueItem.visible");
});


//使用部分参数构建对象时应该将其余参数置为默认值
test("TestDestructor0", function() {
    expect(7);

    var themeGridUniqueItem;
    themeGridUniqueItem=new SuperMap.REST.ThemeGridUniqueItem({
        unique: 3,
        color: new SuperMap.REST.ServerColor(180,0,0)
    });

    ok(themeGridUniqueItem != null, "not null" );
    equal(themeGridUniqueItem.caption, null, "themeGridUniqueItem.caption");
    equal(themeGridUniqueItem.color.red, 180, "themeGridUniqueItem.color.red");
    equal(themeGridUniqueItem.color.green, 0, "themeGridUniqueItem.color.green");
    equal(themeGridUniqueItem.color.blue, 0, "themeGridUniqueItem.color.blue");
    equal(themeGridUniqueItem.unique, 3, "themeGridUniqueItem.unique");
    ok(themeGridUniqueItem.visible == true, "themeGridUniqueItem.visible");
});


