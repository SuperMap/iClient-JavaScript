module ("RadiatePoint");

test("default",function(){
    expect(2);
    var animatorlayer = new SuperMap.Layer.AnimatorVector("animatorVector",{rendererType:"RadiatePoint"});
    var items=[
        { start:0 ,
         end:10,
         style:{
            strokeOpacity: 1,
            strokeColor: "#000000",
            strokeWidth: 3
         }}
    ];
    animatorlayer.renderer.items=items;
    equals( animatorlayer.renderer.dataField,null,"测试节点像素距离默认为null是否成功");
    equals(animatorlayer.renderer.items[0].end,10,"测试结束时间是否为30" )  ;
    animatorlayer.destroy();
});