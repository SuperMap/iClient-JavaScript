/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 15-1-8
 * Time: 上午11:03
 * To change this template use File | Settings | File Templates.
 */
module("HeatMapWeight");
test("heatmapweight_contructor",function(){
        expect();
        var heatMapWeight = new SuperMap.Layer.HeatMapWeight("heatmap");
        equals(heatMapWeight.items, null, "default_items =null");
        heatMapWeight.destroy();
        var heatMapWeight= new SuperMap.Layer.HeatMapWeight("heatmap");
        var items = [
                               {
                                start:0,
                                end:2,
                               startColor:new  SuperMap.REST.ServerColor(255,0,0),
                               endColor:new  SuperMap.REST.ServerColor(200,0,0)
                             }
                           ];
        heatMapWeight.items=items;
        equals(heatMapWeight.items, items, "heatMapWeight.items");
        heatMapWeight.destroy();
        equals(heatMapWeight.items, null, "heatMapWeight.items =null");
    }
);
test("heatmapweight_destroy",function(){
    var heatMapWeight = new SuperMap.Layer.HeatMapWeight("heatmap");
    var items = [
        {
            start:0,
            end:2,
            startColor:new  SuperMap.REST.ServerColor(255,0,0),
            endColor:new  SuperMap.REST.ServerColor(200,0,0)
        },
        {
            start:2,
            end:4,
            startColor:new  SuperMap.REST.ServerColor(200,0,0),
            endColor:new  SuperMap.REST.ServerColor(100,0,0)
        }
    ];
    heatMapWeight.items=items;
    heatMapWeight.destroy();
    equals(heatMapWeight.items, null, "heatMapWeight.items =null");
    equals(heatMapWeight.itemsC, null, "heatMapWeight.itemsC =null");

})