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