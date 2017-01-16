module("CartoSymbolizer");

test("testCartoSymbolizer_constructorDefault",function(){
    var symbol=new SuperMap.CartoSymbolizer();
    equals(symbol.cartoLayer,null,"Property:cartoLayer");
    equals(symbol.feature,null,"Property:feature");
    equals(symbol.shader,null,"Property:shaderer");
    equals(symbol.style,null,"Property:style");
    equals(symbol.attachment,null,"Property:attachment");
    symbol.destroy();
});

test("testCartoSymbolizer_constructor",function(){
    var cartoLayer=new SuperMap.CartoLayer();
    var feature={},style={},shader={};
    var symbol=new SuperMap.CartoSymbolizer(cartoLayer,feature,style,{shader:shader});
    equals(symbol.cartoLayer,cartoLayer,"Property:cartoLayer");
    ok(!symbol.isForLayer,"Property:isForLayer");
    equals(symbol.feature,feature,"Property:feature");
    equals(symbol.style,style, "Property:style");
    equals(symbol.shader, shader, "Property:shader");
    symbol.destroy();
});

test("testCartoSymbolizer_destructor",function(){
    var symbol=new SuperMap.CartoSymbolizer();
    symbol.destroy();
    equals(symbol.cartoLayer,null,"Property:cartoLayer");
    equals(symbol.feature,null,"Property:feature");
    equals(symbol.style,null,"Property:style");
    equals(symbol.shader, null, "Property:shader");
});