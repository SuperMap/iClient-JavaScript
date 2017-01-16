module('Style_FillTest');

test('test_Style_Fill_constructor',function(){
    expect(1);
    var fill = new SuperMap.Style.Fill({color:"#00ff00"});
    equal(fill.color,'#00ff00','fill color');
    fill.destroy();
});

test('test_Style_Fill_destroy',function(){
    expect(2);
    var fill = new SuperMap.Style.Fill({color:"#00ff00"});
    equal(fill.color,'#00ff00','fill color');
    fill.destroy();
    equal(fill.color, null,'fill color');
});