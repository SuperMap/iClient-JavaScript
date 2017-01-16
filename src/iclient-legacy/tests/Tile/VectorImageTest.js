module("VectorImage");

test("testVectorImage_constructor",function(){
    var layer=new SuperMap.Layer.TiledVectorLayer("layer",GlobeParameter.ChinaURL);
    var vectorImage=new SuperMap.Tile.VectorImage(layer,new SuperMap.Pixel(0,0),new SuperMap.Bounds(0,0),"",new SuperMap.Size(256,256));
    equals(vectorImage.cartoLayers.length,0,"Property:cartoLayer length");
    equals(vectorImage.canvas,null,"Property:canvas");
    equals(vectorImage.hitCanvas,null,"Property:hitCanvas");
    equals(vectorImage.url,"","Property:url");
    deepEqual(vectorImage.layer.id,layer.id,"Property:layerID");
    vectorImage.destroy();
});

test("testVectorImage_clone",function(){
    expect(2);
    var layer=new SuperMap.Layer.TiledVectorLayer("layer",GlobeParameter.ChinaURL);
    var vectorImage=new SuperMap.Tile.VectorImage(layer,new SuperMap.Pixel(0,0),new SuperMap.Bounds(0,0),"",new SuperMap.Size(256,256));
    var vectorImageClone=vectorImage.clone(2);
    equals(vectorImageClone,2,"Function:clone");
    equals(vectorImageClone.canvas,null,"Function:clone");
    vectorImage.destroy();
});

test("testVectorImage_addCartoLayer",function(){
    expect(1);
    var cartoLayer = new SuperMap.CartoLayer();
    var layer=new SuperMap.Layer.TiledVectorLayer("layer",GlobeParameter.ChinaURL);
    var vectorImage=new SuperMap.Tile.VectorImage(layer,new SuperMap.Pixel(0,0),new SuperMap.Bounds(0,0),"",new SuperMap.Size(256,256));
    vectorImage.addCartoLayer(cartoLayer);
    equal(vectorImage.cartoLayers[0],cartoLayer,"function:addCartoLayer");
    vectorImage.destroy();
});

test("testVectorImage_removeCartoLayer",function(){
    expect(1);
    var cartoLayer = new SuperMap.CartoLayer();
    var layer=new SuperMap.Layer.TiledVectorLayer("layer",GlobeParameter.ChinaURL);
    var vectorImage=new SuperMap.Tile.VectorImage(layer,new SuperMap.Pixel(0,0),new SuperMap.Bounds(0,0),"",new SuperMap.Size(256,256));
    var vectorImage1=new SuperMap.Tile.VectorImage(layer,new SuperMap.Pixel(0,0),new SuperMap.Bounds(0,0),"",new SuperMap.Size(256,256));
    vectorImage.addCartoLayer(cartoLayer);
    vectorImage.removeCartoLayer(cartoLayer);
    equal(vectorImage.cartoLayers.length,vectorImage1.cartoLayers.length,"function:removeCartoLayer");
    vectorImage.destroy();
});

test("testVectorImage_destructor",function(){
    var layer=new SuperMap.Layer.TiledVectorLayer("layer",GlobeParameter.ChinaURL);
    var vectorImage=new SuperMap.Tile.VectorImage(layer,new SuperMap.Pixel(0,0),new SuperMap.Bounds(0,0),"",new SuperMap.Size(256,256));
    vectorImage.destroy();
    equals(vectorImage.cartoLayers,null,"Property:cartoLayer");
    equals(vectorImage.canvas,null,"Property:canvas");
    equals(vectorImage.hitCanvas,null,"Property:hitCanvas");
    equals(vectorImage.url,"","Property:url");
    equals(vectorImage.layer,null,"Property:layer");
});
