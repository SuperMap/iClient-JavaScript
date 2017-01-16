module('Style_Iamge');

test('test_Style_Image_constructor',function(){
    expect(5);
    var image = new SuperMap.Style.Image();
    equal(image.origin[0],0,'image origin');
    equal(image.origin[1],0,'image origin');
    image = new SuperMap.Style.Image({
        fill: new SuperMap.Style.Fill({color:'#00ff00'}),
        stroke: new SuperMap.Style.Fill({color:'#00ff00',width:10})
    });
    equal(image.fill.color,'#00ff00','image.ill.color');
    equal(image.stroke.color,'#00ff00','image.stroke.color');
    equal(image.stroke.width,10,'image.stroke.width');
    image.destroy();
});

test('test_Style_Image_destroy',function(){
    expect(2);
    var image = new SuperMap.Style.Image({
        fill: new SuperMap.Style.Fill({color:'#00ff00'}),
        stroke: new SuperMap.Style.Fill({color:'#00ff00',width:10})
    });
    image.destroy();
    equal(image.fill,null,'image.fill');
    equal(image.stroke,null,'image.stroke');
});

test('test_Style_Image_createCanvasContext2D',function(){
    expect(2);
    var image =new SuperMap.Style.Image();
    var context = image.createCanvasContext2D(10,10);
    equal(context.canvas.width,10,'width');
    equal(context.canvas.height,10,'height');
});