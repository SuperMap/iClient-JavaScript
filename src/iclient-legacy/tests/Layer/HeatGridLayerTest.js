module("HeatGridLayer");

test("HeatGridLayer_constructor",function () {
    expect(5);
    var heatGridLayer = new SuperMap.Layer.HeatGridLayer("test");
    equals(heatGridLayer.name, "test", "heatGridLayer Name");
    equals(heatGridLayer.CLASS_NAME, "SuperMap.Layer.HeatGridLayer", "CLASS_NAME");
    equals(heatGridLayer.gridWidth,50, "default_gridWidth =50");
    equals(heatGridLayer.gridHeight,50, "default_gridHeight =50");
    equals(heatGridLayer.pointFeatures,null, "default_pointFeatures =null");
    heatGridLayer.destroy();
});

test("heatGridLayer_controlPoints",function() {
    expect(5);
    var heatGridLayer = new SuperMap.Layer.HeatGridLayer("test",{
        gridWidth:150,
        gridHeight:100

    });
    var heatFeatures = [];
    var x, y,feapoint,fea;
    heatGridLayer.dataField ="age";
    heatGridLayer.labelMode = 3;
    for(var i = 0;i<10;i++)
    {
        x= Math.random()*3000*2 ;
        y= Math.random()*(-3000)*2 ;
        feapoint = new SuperMap.Geometry.Point(x,y);
        fea = new SuperMap.Feature.Vector(feapoint);
        fea.attributes.age = parseInt(Math.random()*45*10)/10;
        heatFeatures.push(fea);
    }
    heatGridLayer.addFeatures(heatFeatures);
    equals(heatGridLayer.pointFeatures.length, 10, "addFeatures_complete");

    heatGridLayer.removeFeatures(heatFeatures.slice(0,5));
    equals(heatGridLayer.pointFeatures.length, 5, "removefeatures_complete");

    heatGridLayer.removeAllFeatures();
    equals(heatGridLayer.pointFeatures, null, "removeAllFeatures_complete");

    equals(heatGridLayer.gridWidth, 150, "heatGridLayer.gridWidth");
    equals(heatGridLayer.gridHeight, 100, "heatGridLayer.gridHeight");
});
test("heatGridLayer_destroy",function() {
    expect(11);
    var heatGridLayer = new SuperMap.Layer.HeatGridLayer("test");
    var heatFeatures = [];
    var x, y,feapoint,fea;
    heatGridLayer.dataField ="age";
    heatGridLayer.labelMode = 2;
    for(var i = 0;i<10;i++)
    {
        x= Math.random()*3000*2 ;
        y= Math.random()*(-3000)*2 ;
        feapoint = new SuperMap.Geometry.Point(x,y);
        fea = new SuperMap.Feature.Vector(feapoint);
        fea.attributes.age = parseInt(Math.random()*45*10)/10;
        heatFeatures.push(fea);
    }
    heatGridLayer.addFeatures(heatFeatures);

    heatGridLayer.destroy();
    ok(heatGridLayer.name==null, "heatGridLayer Name");
    ok(heatGridLayer.gridHeight==null, "heatGridLayer.gridHeight");
    ok(heatGridLayer.gridWidth==null, "heatGridLayer.gridHeight");
    ok(heatGridLayer.pointFeatures ==null, "heatGridLayer.pointFeatures");
    ok(heatGridLayer.items ==null, "heatGridLayer.items");
    ok(heatGridLayer.isShowLabel ==null, "heatGridLayer.isShowLabel");
    ok(heatGridLayer.labelMode ==null, "heatGridLayer.labelMode");
    ok(heatGridLayer.dataField ==null, "heatGridLayer.dataField");
    ok(heatGridLayer.isZoomIn ==null, "heatGridLayer..isZoomIn");
    ok(heatGridLayer.zoomInNumber ==null, "heatGridLayer.zoomInNumber");
    ok(heatGridLayer.selectGrid ==null, "heatGridLayer.selectGrid");
})
