module('Styll_Stroke');

test('test_Style_Stroke_constructor',function(){
    expect(2);
    var stroke = new SuperMap.Style.Stroke({color:'#00ff00',width:1});
    equal(stroke.color,'#00ff00','stroke color');
    equal(stroke.width,1,'stroke width');
    stroke.destroy();
});

test('test_Style_Stroke_destroy',function(){
    expect(4);
    var stroke = new SuperMap.Style.Stroke({color:'#00ff00',width:1});
    equal(stroke.color,'#00ff00','stroke color');
    equal(stroke.width,1,'stroke width');
    stroke.destroy();
    equal(stroke.color,null,'stroke color');
    equal(stroke.width,null,'stroke width');
});

