/**
 * Created by CMY on 2017/2/15.
 */

 describe("GetFeatureByBoundsService",function(){
    it("constructor",function(){
        var url = "http://www.supermap.com:8090/iserver/services/data-jingjin/rest/data";
        var myGetFeaturesByBoundsService = new SuperMap.REST.GetFeaturesByBoundsService(url);
        expect(1).toBe(1)
    })
})