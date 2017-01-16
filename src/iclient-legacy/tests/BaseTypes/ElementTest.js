/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 15-2-2
 * Time: 下午4:43
 * To change this template use File | Settings | File Templates.
 */
module("Element");
test("testElement_visible",function(){
    expect(1);
    var element= document.createElement("div");
    document.body.appendChild(element);
    var visible = SuperMap.Element.visible(element);
    ok(visible,"Function:visible");
    SuperMap.Element.remove(element);

});
test("testElement_toggle",function(){
    expect(4);
    var element1= document.createElement("div1");
    var element2= document.createElement("div2");
    document.body.appendChild(element1);
    document.body.appendChild(element2);
    var visible1= SuperMap.Element.visible(element1);
   var visible2= SuperMap.Element.visible(element2);
    ok(visible1,"Function:toggle");
    ok(visible2,"Function:toggle");
    SuperMap.Element.toggle(element1,element2);
    visible1= SuperMap.Element.visible(element1);
    visible2= SuperMap.Element.visible(element2);
    ok(!visible1,"Function:toggle");
    ok(!visible2,"Function:toggle");
    SuperMap.Element.remove(element1);
    SuperMap.Element.remove(element2);

});
test("testElement_remove",function(){
    expect(1);
   var element1=document.createElement("div");
    element1.id="myDiv";
    document.body.appendChild(element1);
    SuperMap.Element.remove(element1);
    var div= document.getElementById("myDiv");
    equals(div,null,"Function:remove");
});
test("testElement_getHeightDefault",function(){
    expect(1);
    var element= document.createElement("div");
    document.body. appendChild(element);
    var height= SuperMap.Element.getHeight(element);
    equals(height,0,"Function:getHeight") ;
    SuperMap.Element.remove(element);

});
test("testElement_getHeight",function(){
    expect(1);
    var element= document.createElement("div");
    element.id="myDiv";
    document.body. appendChild(element);
    var div = document.getElementById("myDiv");
    div.style.height=200+'px';
    height = SuperMap.Element.getHeight(element);
    equals(height,200,"Function:getHeight");
    SuperMap.Element.remove(element);
}) ;
test("testElement_hasClass",function(){
     expect(1);
    var element= document.createElement("div");
    document.body.appendChild(element);
    var isHas= SuperMap.Element.hasClass(element,"div");
    ok(!isHas,"Function:hasClass");
    SuperMap.Element.remove(element);

});
test("testElement_addClassDefault",function(){
        expect(1);
    var element = document.createElement("div");
    document.body.appendChild(element);
     SuperMap.Element.addClass(element,"myDiv");
    equals(element.className,"myDiv","Function:addClass") ;
    SuperMap.Element.remove(element);
});
test("testElement_addClass",function(){
    expect(1);
    var element = document.createElement("div");
    element.className="myNewDiv";
    document.body.appendChild(element);
    SuperMap.Element.addClass(element,"myNewDiv");
    equals(element.className,"myNewDiv","Function:addClass") ;
    SuperMap.Element.remove(element);
});
test("testElement_addClassTwoNames",function(){
    expect(1);
    var element = document.createElement("div");
    element.className="myNewDiv";
    document.body.appendChild(element);
    SuperMap.Element.addClass(element,"div");
    equals(element.className,"myNewDiv div","Function:addClass") ;
    SuperMap.Element.remove(element);
});
test("testElement_removeClassDefault",function(){
    expect(2);
    var element = document.createElement("div");
    element.className="myDiv";
    document.body.appendChild(element);
    SuperMap.Element.removeClass(element,"myDiv") ;
    equals(element.className,"","Function:removeClass") ;
    element.className="myNewDiv myDiv";
    SuperMap.Element.removeClass(element,"myDiv");
    equals(element.className,"myNewDiv","Function:removeClass");
    SuperMap.Element.remove(element);
})
test("testElement_removeClass",function(){
    expect(1);
    var element = document.createElement("div");
    document.body.appendChild(element);
    SuperMap.Element.removeClass(element,"div") ;
    equals(element.className,"","Function:removeClass")
    SuperMap.Element.remove(element);
});
test("testElement_toggleClass",function(){
    expect(2);
    var element = document.createElement("div");
    document.body.appendChild(element);
   SuperMap.Element.toggleClass(element,"myDiv");
   equals(element.className,"myDiv","Function:toggleClass") ;
    element.className="myDiv";
    SuperMap.Element.toggleClass(element,"myDiv");
    equals(element.className,"","Function:toggleClass");
    SuperMap.Element.remove(element);
}) ;
test("testElement_getStyle",function(){
    expect(1);
    var element= document.createElement("div");
    element.id="myDiv";
    document.body.appendChild(element);
    var div= document.getElementById("myDiv");
    div.style.backgroundColor="rgb(255,0,0)";
    var style=SuperMap.Element.getStyle(div,"background-color");
    equals(style,"rgb(255, 0, 0)","Function:getStyle");
    SuperMap.Element.remove(element);
});

