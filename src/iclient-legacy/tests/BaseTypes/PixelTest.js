module("Pixel");

test("testPixel_constructorDefault",function(){
    expect(2);
    var pixel=new SuperMap.Pixel();
    equals(pixel.x,0,"Property:x");
    equals(pixel.y,0,"Property:y");
    pixel.destroy();
});

test("testPixel_constructor",function(){
    expect(2);
    var pixel=new SuperMap.Pixel(100,50);
    equals(pixel.x,100,"Property:x");
    equals(pixel.y,50,"Property:y");
    pixel.destroy();
});
test("testPixel_toString",function(){
    expect(1);
    var pixel=new SuperMap.Pixel(100,50);
    equals(pixel.toString(),"x=100,y=50","Function:toString");
    pixel.destroy();
});
test("testPixel_clone",function(){
    expect(2);
    var pixel=new SuperMap.Pixel(100,50);
    var pixel2 = pixel.clone();
    equals(pixel2.x,100,"Property:x");
    equals(pixel2.y,50,"Property:y");
    pixel.destroy();
    pixel2.destroy();
});
test("testPixel_equals",function(){
    expect(1);
    var pixel=new SuperMap.Pixel(100,50);
    var pixel2 = new SuperMap.Pixel(100,50);
    ok(pixel.equals(pixel2),"Function:equals");
    pixel.destroy();
    pixel2.destroy();
});
test("testPixel_distanceTo",function(){
    expect(1);
    var pixel=new SuperMap.Pixel(100,50);
    var pixel2 = new SuperMap.Pixel(100,60);
    equals(pixel.distanceTo(pixel2),10,"Function:distanceTo");
    pixel.destroy();
    pixel2.destroy();
});
test("testPixel_addDefault",function(){
    expect(1);
    var pixel=new SuperMap.Pixel();
    var pixel2 = null;
    try
    {
        pixel2 = pixel.add();
    }
    catch(e)
    {
        equals(pixel2,null,"Function:add");
    }
    pixel.destroy();
});
test("testPixel_add",function(){
    expect(2);
    var pixel=new SuperMap.Pixel(100,50);
    var pixel2 = pixel.add(10,10);
    equals(pixel2.x,110,"Property:x");
    equals(pixel2.y,60,"Property:y");
    pixel.destroy();
    pixel2.destroy();
});
test("testPixel_offset",function(){
    expect(2);
    var pixel=new SuperMap.Pixel(100,50);
    var pixel2=new SuperMap.Pixel(100,50);
    var pixel3 = pixel.offset(pixel2);
    equals(pixel3.x,200,"Property:x");
    equals(pixel3.y,100,"Property:y");
    pixel.destroy();
    pixel2.destroy();
    pixel3.destroy();
});
test("testPixel_destroy",function(){
    expect(2);
    var pixel=new SuperMap.Pixel(120,20);
    pixel.destroy();
    equals(pixel.x,null,"Property:x");
    equals(pixel.y,null,"Property:y");
});

