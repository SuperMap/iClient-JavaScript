/**
 * Created with JetBrains WebStorm.
 * User: liqiuping
 * Date: 15-7-28
 * Time: 上午11:34
 * To change this template use File | Settings | File Templates.
 */
module('GeoText');
test("testGeoText_constructor",function(){
    expect(3);
    var geotext=new SuperMap.Geometry.GeoText(80,160,"关岛");
    equals(geotext.x,80,"property:x");
    equals(geotext.y,160,"property:y");
    equals(geotext.text,"关岛","property:text");
    geotext.destroy();

});
test("testGeoText_getCentroid",function(){
    expect(2);
    var geotext=new SuperMap.Geometry.GeoText(80,160,"关岛");
    var center=geotext.getCentroid();
    equals(center.x,80,"Property:center.x");
    equals(center.y,160,"Property:center.y");
    geotext.destroy();
});
test("testGeoText_cloneDefault",function(){
    expect(3);
    var geotext=new SuperMap.Geometry.GeoText(80,160,"关岛");
    var geotextClone=geotext.clone();
    equals(geotextClone.x,80,"Property:geotextClone.x");
    equals(geotextClone.y,160,"Property:geotextClone.y");
    equals(geotextClone.text,"关岛","Property:geotextClone.text");
    geotext.destroy();
    geotextClone.destroy();

});
test("testGeoText_clone",function(){
    expect(3);
    var geotext=new SuperMap.Geometry.GeoText(80,160,"关岛");
    var obj=new SuperMap.Geometry.Point(110,40);
    var geotextClone=geotext.clone(obj);
    equals(geotextClone.x,110,"Property:x");
    equals(geotextClone.y,40,"Property:y");
    equals(geotextClone.text,"关岛","Property:text");
    geotext.destroy();
    geotextClone.destroy();
    obj.destroy();

});
test("testGeoText_calculateBounds",function(){
    expect(4);
    var geotext = new SuperMap.Geometry.GeoText(80,160,"关岛");
    geotext.calculateBounds();
    equals(geotext.bounds.left,80,"Property:left");
    equals(geotext.bounds.right,80,"Property:right");
    equals(geotext.bounds.top,160,"Property:top");
    equals(geotext.bounds.bottom,160,"Property:bottom");
    geotext.destroy();
});
test("testGeoText_getLabelPxBoundsByLabel",function(){
    expect(36);
    var geotext = new SuperMap.Geometry.GeoText(80,160,"关岛\n中国");
    var locationPixel=new SuperMap.Geometry.Point(10,10);
    var style=new SuperMap.Style();
    style.labelAlign="lt";
    var labelPxBounds1 = geotext.getLabelPxBoundsByLabel(locationPixel,"10px","10px",style);
    equals(labelPxBounds1.left,10,"Property:Left");
    equals(labelPxBounds1.top,10,"Property:Top");
    equals(labelPxBounds1.right,20,"Property:Right");
    equals(labelPxBounds1.bottom,30,"Property:Bottom");
    style.labelAlign="lm";
    var labelPxBounds2 = geotext.getLabelPxBoundsByLabel(locationPixel,"10px","10px",style);
    equals(labelPxBounds2.left,10,"Property:Left");
    equals(labelPxBounds2.top,0,"Property:Top");
    equals(labelPxBounds2.right,20,"Property:Right");
    equals(labelPxBounds2.bottom,20,"Property:Bottom");
    style.labelAlign="lb";
    var labelPxBounds3 = geotext.getLabelPxBoundsByLabel(locationPixel,"10px","10px",style);
    equals(labelPxBounds3.left,10,"Property:Left");
    equals(labelPxBounds3.top,-10,"Property:Top");
    equals(labelPxBounds3.right,20,"Property:Right");
    equals(labelPxBounds3.bottom,10,"Property:Bottom");
    style.labelAlign="ct";
    var labelPxBounds4 = geotext.getLabelPxBoundsByLabel(locationPixel,"10px","10px",style);
    equals(labelPxBounds4.left,5,"Property:Left");
    equals(labelPxBounds4.top,10,"Property:Top");
    equals(labelPxBounds4.right,15,"Property:Right");
    equals(labelPxBounds4.bottom,30,"Property:Bottom");
    style.labelAlign="cm";
    var labelPxBounds5 = geotext.getLabelPxBoundsByLabel(locationPixel,"10px","10px",style);
    equals(labelPxBounds5.left,5,"Property:Left");
    equals(labelPxBounds5.top,0,"Property:Top");
    equals(labelPxBounds5.right,15,"Property:Right");
    equals(labelPxBounds5.bottom,20,"Property:Bottom");
    style.labelAlign="cb";
    var labelPxBounds6 = geotext.getLabelPxBoundsByLabel(locationPixel,"10px","10px",style);
    equals(labelPxBounds6.left,5,"Property:Left");
    equals(labelPxBounds6.top,-10,"Property:Top");
    equals(labelPxBounds6.right,15,"Property:Right");
    equals(labelPxBounds6.bottom,10,"Property:Bottom");
    style.labelAlign="rt";
    var labelPxBounds7 = geotext.getLabelPxBoundsByLabel(locationPixel,"10px","10px",style);
    equals(labelPxBounds7.left,0,"Property:Left");
    equals(labelPxBounds7.top,10,"Property:Top");
    equals(labelPxBounds7.right,10,"Property:Right");
    equals(labelPxBounds7.bottom,30,"Property:Bottom");
    style.labelAlign="rm";
    var labelPxBounds8 = geotext.getLabelPxBoundsByLabel(locationPixel,"10px","10px",style);
    equals(labelPxBounds8.left,0,"Property:Left");
    equals(labelPxBounds8.top,0,"Property:Top");
    equals(labelPxBounds8.right,10,"Property:Right");
    equals(labelPxBounds8.bottom,20,"Property:Bottom");
    style.labelAlign="rb";
    var labelPxBounds9 = geotext.getLabelPxBoundsByLabel(locationPixel,"10px","10px",style);
    equals(labelPxBounds9.left,0,"Property:Left");
    equals(labelPxBounds9.top,-10,"Property:Top");
    equals(labelPxBounds9.right,10,"Property:Right");
    equals(labelPxBounds9.bottom,10,"Property:Bottom");
    geotext.destroy();
    locationPixel.destroy();
    labelPxBounds1.destroy();
    labelPxBounds2.destroy();
    labelPxBounds3.destroy();
    labelPxBounds4.destroy();
    labelPxBounds5.destroy();
    labelPxBounds6.destroy();
    labelPxBounds7.destroy();
    labelPxBounds8.destroy();
    labelPxBounds9.destroy();
});
test("testGeoText_getLabelPxSize",function(){
    expect(6);
    var geotext1=new SuperMap.Geometry.GeoText(80,160,"关岛");
    var geotext2=new SuperMap.Geometry.GeoText(80,160,"关岛\n中国");
    style1={strokeWidth:10,
        fontSize:10
    };
    style2={strokeWidth:10};
    var size1=geotext1.getLabelPxSize(style1);
    var size2=geotext2.getLabelPxSize(style1);
    equals(size1.w,44,"Property:w");
    equals(size1.h,21,"Property:h");
    equals(size2.w,44,"Property:w");
    equals(size2.h,32,"Property:h");
     size1=geotext1.getLabelPxSize(style2);
     size2=geotext2.getLabelPxSize(style2);
    equals(size1,null,"Property:getLabelPxSize");
    equals(size2,null,"Property:getLabelPxSize");
    geotext1.destroy();
    geotext2.destroy();

});
test("testGeoText_getLabelPxBoundsByText",function(){
    expect(36);
    var geotext= new SuperMap.Geometry.GeoText(80,160,"关岛\n中国");
    var locationPixel=new SuperMap.Geometry.Point(10,10);
    var style=new SuperMap.Style();
    style.strokeWidth=10;
    style.fontSize=10;

    style.labelAlign="lt";
    var labelPxBounds1 = geotext.getLabelPxBoundsByText(locationPixel,style);
    equals(labelPxBounds1.left,10,"Property:Left");
    equals(labelPxBounds1.top,10,"Property:Top");
    equals(labelPxBounds1.right,54,"Property:Right");
    equals(labelPxBounds1.bottom,42,"Property:Bottom");
    style.labelAlign="lm";
    var labelPxBounds2 = geotext.getLabelPxBoundsByText(locationPixel,style);
    equals(labelPxBounds2.left,10,"Property:Left");
    equals(labelPxBounds2.top,-6,"Property:Top");
    equals(labelPxBounds2.right,54,"Property:Right");
    equals(labelPxBounds2.bottom,26,"Property:Bottom");
    style.labelAlign="lb";
    var labelPxBounds3 = geotext.getLabelPxBoundsByText(locationPixel,style);
    equals(labelPxBounds3.left,10,"Property:Left");
    equals(labelPxBounds3.top,-22,"Property:Top");
    equals(labelPxBounds3.right,54,"Property:Right");
    equals(labelPxBounds3.bottom,10,"Property:Bottom");
    style.labelAlign="ct";
    var labelPxBounds4 = geotext.getLabelPxBoundsByText(locationPixel,style);
    equals(labelPxBounds4.left,-12,"Property:Left");
    equals(labelPxBounds4.top,10,"Property:Top");
    equals(labelPxBounds4.right,32,"Property:Right");
    equals(labelPxBounds4.bottom,42,"Property:Bottom");
    style.labelAlign="cm";
    var labelPxBounds5 = geotext.getLabelPxBoundsByText(locationPixel,style);
    equals(labelPxBounds5.left,-12,"Property:Left");
    equals(labelPxBounds5.top,-6,"Property:Top");
    equals(labelPxBounds5.right,32,"Property:Right");
    equals(labelPxBounds5.bottom,26,"Property:Bottom");
    style.labelAlign="cb";
    var labelPxBounds6 = geotext.getLabelPxBoundsByText(locationPixel,style);
    equals(labelPxBounds6.left,-12,"Property:Left");
    equals(labelPxBounds6.top,-22,"Property:Top");
    equals(labelPxBounds6.right,32,"Property:Right");
    equals(labelPxBounds6.bottom,10,"Property:Bottom");

    style.fontStyle="italic";
    style.labelAlign="rt";
    var labelPxBounds7 = geotext.getLabelPxBoundsByText(locationPixel,style);
    equals(labelPxBounds7.left,-34,"Property:Left");
    equals(labelPxBounds7.top,10,"Property:Top");
    equals(labelPxBounds7.right,15,"Property:Right");
    equals(labelPxBounds7.bottom,42,"Property:Bottom");
    style.labelAlign="rm";
    var labelPxBounds8 = geotext.getLabelPxBoundsByText(locationPixel,style);
    equals(labelPxBounds8.left,-34,"Property:Left");
    equals(labelPxBounds8.top,-6,"Property:Top");
    equals(labelPxBounds8.right,15,"Property:Right");
    equals(labelPxBounds8.bottom,26,"Property:Bottom");
    style.labelAlign="rb";
    var labelPxBounds9 = geotext.getLabelPxBoundsByText(locationPixel,style);
    equals(labelPxBounds9.left,-34,"Property:Left");
    equals(labelPxBounds9.top,-22,"Property:Top");
    equals(labelPxBounds9.right,15,"Property:Right");
    equals(labelPxBounds9.bottom,10,"Property:Bottom");
    geotext.destroy();
    locationPixel.destroy();
    labelPxBounds1.destroy();
    labelPxBounds2.destroy();
    labelPxBounds3.destroy();
    labelPxBounds4.destroy();
    labelPxBounds5.destroy();
    labelPxBounds6.destroy();
    labelPxBounds7.destroy();
    labelPxBounds8.destroy();
    labelPxBounds9.destroy();
});
test("testGeoText_getTextCount",function(){
    expect(3);
    var geotext= new SuperMap.Geometry.GeoText(80,160,"关岛");
    var cn=geotext.getTextCount("neverstopin关岛").cnC;
    var en=geotext.getTextCount("neverstopin关岛").enC;
    var textCharCount=geotext.getTextCount("neverstopin关岛").textC;
    equals(cn,2,"Property:cn");
    equals(en,11,"Property:en");
    equals(textCharCount,13,"Property:textCharCount");
    geotext.destroy();

});
test("testGeoText_destroy",function(){
    expect(3);
    var geotext= new SuperMap.Geometry.GeoText(80,160,"关岛");
    geotext.destroy();
    equals(geotext.x,null,"Property:destroyX");
    equals(geotext.y,null,"Property:destroyY");
    equals(geotext.text,null,"Property:destroyText");
});