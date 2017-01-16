module("TadpolePoint");


test("default_attribution",function(){
    expect(3);
    var  animatorlayer= new SuperMap.Layer.AnimatorVector("anmiator",{rendererType:"TadpolePoint"} );
    equals(animatorlayer.renderer.glint,true,"测试开启闪烁效果是否成功");
    ok(animatorlayer.renderer != null,"renderer");
    ok(animatorlayer.renderer.tail,true);
    animatorlayer.destroy();
});

test("Attribution",function(){
    expect(2);
    var animatorlayer = new SuperMap.Layer.AnimatorVector("animator",{rendererType:"TadpolePoint"});
    animatorlayer.renderer.glint=false;
    animatorlayer.renderer.tail=false;
    equals( animatorlayer.renderer.glint,false,"测试关闭闪烁功能是否成功");
    equals( animatorlayer.renderer.tail,false,"测试关闭尾巴功能是否成功");
    animatorlayer.destroy();
});
