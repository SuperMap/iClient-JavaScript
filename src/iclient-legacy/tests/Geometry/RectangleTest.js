module('Rectangle');
test("testRectangle_constructorDefault",function(){
    var x = 1;
    var y = 2;
    var w = 10;
    var h = 20;
    var rectangle = new SuperMap.Geometry.Rectangle(x, y, w, h);
    equals(rectangle.x,x,"property:x");
    equals(rectangle.y,y,"property:y");
    equals(rectangle.width,w,"Property:width");
    equals(rectangle.height,h,"Property:height");
    rectangle.destroy();

});
test("testRectangle_calculateBounds",function(){
    expect(4);
    var x = 1;
    var y = 2;
    var w = 10;
    var h = 20;
    var rectangle = new SuperMap.Geometry.Rectangle(x, y, w, h);
    rectangle.calculateBounds();
    equals(rectangle.bounds.left,x,"Function:calculateBounds");
    equals(rectangle.bounds.right,x+w,"Function:calculateBounds");
    equals(rectangle.bounds.top,y+h,"Function:calculateBounds");
    equals(rectangle.bounds.bottom,y,"Function:calculateBounds");
    rectangle.destroy();
});
test("testRectangle_getLength",function(){
    expect(1);
    var x = 1;
    var y = 2;
    var w = 10;
    var h = 20;
    var rectangle = new SuperMap.Geometry.Rectangle(x, y, w, h);
    var len = rectangle.getLength();
    equals(len,2*(w+h),"Function:getLength");
    rectangle.destroy();
});
test("testRectangle_getArea",function(){
    expect(1);
    var x = 1;
    var y = 2;
    var w = 10;
    var h = 20;
    var rectangle = new SuperMap.Geometry.Rectangle(x, y, w, h);
    var area = rectangle.getArea();
    equals(area,w*h,"Function:getArea");
    rectangle.destroy();
});

test("testRectangle_move",function(){
    expect(4);
    var x = 1;
    var y = 2;
    var w = 10;
    var h = 20;
    var x1 = 5;
    var y1 = 5;
    var rectangle = new SuperMap.Geometry.Rectangle(x, y, w, h);
    rectangle.move(x1,y1);
    equals(rectangle.bounds.left,x+x1,"Function:move");
    equals(rectangle.bounds.bottom,y+y1,"Function:move");
    equals(rectangle.bounds.right,x+x1+w,"Function:move");
    equals(rectangle.bounds.top,y+y1+h,"Function:move");
    rectangle.destroy();
});
test("testRectangle_getCentroid",function(){
    expect(2);
    var x = 4;
    var y = 2;
    var w = 10;
    var h = 20;
    var rectangle = new SuperMap.Geometry.Rectangle(x, y, w, h);
    var centroidPoint = rectangle.getCentroid();
    var expectCentroidX = x+w/2;
    var expectCentroidY = y+h/2;
    equals(centroidPoint.x,expectCentroidX,"Function:getCentroid");
    equals(centroidPoint.y,expectCentroidY,"Function:getCentroid");
    rectangle.destroy();
});


