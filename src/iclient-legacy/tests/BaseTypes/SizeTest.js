module("Size");

test("testSize_constructorDefault",function(){
    expect(2);
    var size=new SuperMap.Size();
    equals(size.w,0,"Property:w");
    equals(size.h,0,"Property:h");
    size.destroy();
});

test("testSize_constructor",function(){
    expect(2);
    var size=new SuperMap.Size(100,50);
    equals(size.w,100,"Property:w");
    equals(size.h,50,"Property:h");
    size.destroy();
});
test("testSize_toString",function(){
    expect(1);
    var size=new SuperMap.Size(100,50);
    equals(size.toString(),"w=100,h=50","Function:toString");
    size.destroy();
});
test("testSize_clone",function(){
    expect(2);
    var size=new SuperMap.Size(100,50);
    var size2 = size.clone();
    equals(size2.w,100,"Property:w");
    equals(size2.h,50,"Property:h");
    size.destroy();
    size2.destroy();
});
test("testSize_equals",function(){
    expect(1);
    var size=new SuperMap.Size(100,50);
    var size2 = new SuperMap.Size(100,50);
    ok(size.equals(size2),"Function:equals");
    size.destroy();
    size2.destroy();
});
test("testSize_destroy",function(){
    expect(2);
    var size=new SuperMap.Size(120,20);
    size.destroy();
    equals(size.w,null,"Property:w");
    equals(size.h,null,"Property:h");
});
