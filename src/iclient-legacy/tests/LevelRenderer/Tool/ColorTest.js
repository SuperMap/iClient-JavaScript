module("Color");
test("testColor_defaultConstructor",8,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    ok(color.util instanceof SuperMap.LevelRenderer.Tool.Util,"Property:util");
    equal(color._ctx,null,"Property:_ctx");
    ok(SuperMap.Util.isArray(color.palette),"Property:palette");
    equal(color._palette,color.palette,"Property:_palette");
    ok(color.highlightColor!==null,"Property:highlightColor");
    equal(color._highlightColor,color.highlightColor,"Property:_highlightColor");
    ok(color.colorRegExp.test("rgb(0,0,0)"),"Property:colorRegExp");
    ok(color._nameColors!==null,"Property:_nameColors");
});

test("testColor_customPalette",1,function(){
    var palette=["#ffffff","#000000"];
    var color=new SuperMap.LevelRenderer.Tool.Color();
    color.customPalette(palette);
    equal(color.palette,palette,"Property:palette");
});

test("testColor_resetPalette",2,function(){
    var palette=["#ffffff","#000000"];
    var color=new SuperMap.LevelRenderer.Tool.Color();
    color.customPalette(palette);
    equal(color.palette,palette,"Property:palette_custom");
    color.resetPalette();
    equal(color.palette,color._palette,"Property:palette_reset");
});

test("testColor_getColor",2,function(){
    var custom_palette=["#ffffff","#000000"];
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var palette=color.palette;
    var idx=0;
    equal(palette[idx],color.getColor(idx),"Property:palette_color0");
    equal(custom_palette[idx],color.getColor(idx,custom_palette),"customPalette_color0");
});

test("testColor_customHighlight_getHighlightColor",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var hColor="#000000";
    color.customHighlight(hColor);
    equal(color.getHighlightColor(),hColor,"Property:highlightColor");
});

test("testColor_resetHighlight_getHighlightColor",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var _hColor=color.getHighlightColor();
    color.customHighlight("#000000");
    color.resetHighlight();
    equal(color.getHighlightColor(),_hColor,"Property:highlightColor_reset");
});

test("testColor_getRadialGradient",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var rGradient=color.getRadialGradient(0,0,10,1,1,20,[[0,"#ffffff"]]);
    ok(rGradient instanceof CanvasGradient,"CanvasGradient");
});

test("testColor_getLinearGradient",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var rGradient=color.getLinearGradient(0,0,1,1,[[0,"#ffffff"]]);
    ok(rGradient instanceof CanvasGradient,"CanvasGradient");
});

test("testColor_getStepColors",3,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var colors=color.getStepColors("#ffffff","#000000",2);
    var color0=colors[0],color2=colors[2];
    equal(color0,"rgba(255,255,255,1)","startColor");
    equal(color2,"rgba(0,0,0,1)","endColor");
    equal(colors.length,3,"colors_length");
});

test("testColor_getGradientColors",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var colors=color.getGradientColors(["#ffffff","#000000"],2);
    equal(colors.length,3,"colors_length");
});

test("testColor_toColor",3,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    equal(color.toColor([0,0,0]),"rgb(0,0,0)","toColor_rgb");
    equal(color.toColor([0,0,0],"hex"),"#000000","toColor_hex");
    equal(color.toColor([0,0,0],"rgba"),"rgba(0,0,0,1)","toColor_rgba");
});

test("testColor_toArray",4,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var c=color.toArray("#000000");
    equal(c[0],0,"array[0]");
    equal(c[1],0,"array[1]");
    equal(c[2],0,"array[2]");
    equal(c[3],1,"array[3]");
});

test("testColor_convert",5,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var c0="#000000",c1="hsb(0,0%,0%)",c2="hsl(0,0%,0%)",c3="rgb(0,0,0)",c4="rgba(0,0,0,1)";
    equal(color.convert(c0,"hex"),c0,"convert2hex");
    equal(color.convert(c1,"hsb"),c1,"convert2hsb");
    equal(color.convert(c2,"hsl"),c2,"convert2hsl");
    equal(color.convert(c3,"rgb"),c3,"convert2rgb");
    equal(color.convert(c4,"rgba"),c4,"convert2rgba");
});

test("testColor_toRGBA",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var c=color.toRGBA("#000000");
    equal(c,"rgba(0,0,0,1)","toRgba");
});

test("testColor_toRGB",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var c=color.toRGB("#000000");
    equal(c,"rgb(0,0,0)","toRgb");
});

test("testColor_toHex",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var c=color.toHex("#000000");
    equal(c,"#000000","toHex");
});

test("testColor_toName",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var c=color.toName("#000000");
    equal(c,"black","colorName_black");
});

test("testColor_trim",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var c=color.trim(" #000000 ");
    equal(c,"#000000","color_trim");
});

test("testColor_normalize",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var c=color.normalize("black");
    equal(c,"#000000","color_getName");
});

test("testColor_lift",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var c=color.lift("#000000");
    ok(c!==null,"color_lift");
});

test("testColor_reverse",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var c=color.reverse("#000000");
    equal(c,"rgb(255,255,255)","color_reverse");
});

test("testColor_mix",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var c=color.mix("#000000","#ffffff");
    ok(c!==null,"color_mix");
});

test("testColor_getData",3,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var c=color.getData("#000000");
    equal(c[0],0,"color[0]");
    equal(c[1],0,"color[1]");
    equal(c[2],0,"color[2]");
});

test("testColor_alpha",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var c=color.alpha("#000000",1);
    equal(c,"rgba(0,0,0,1)","color+alpha");
});

test("testColor_map",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var n=color.map([1],function(data){
        return data+=1;
    });
    equal(n[0],2,"map");
});

test("testColor_adjust",1,function(){
    var color=new SuperMap.LevelRenderer.Tool.Color();
    var n=color.adjust(100,[0,1]);
    equal(n,1,"adjust_number");
});



