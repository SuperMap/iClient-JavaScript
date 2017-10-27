require('../../../../src/common/commontypes/geometry/LinearRing');
describe('LinearRing', function () {
    var points = [new SuperMap.Geometry.Point(4933.319287022352, -3337.3849141502124),
        new SuperMap.Geometry.Point(4960.9674060199022, -3349.3316322355736),
        new SuperMap.Geometry.Point(5006.0235999418364, -3358.8890067038628),
        new SuperMap.Geometry.Point(5075.3145648369318, -3378.0037556404409),
        new SuperMap.Geometry.Point(5305.19551436013, -3376.9669111768926)];
    var linearRing = new SuperMap.Geometry.LinearRing(points);

    it('initialize, getArea', function () {
        expect(linearRing).not.toBeNull();
        expect(linearRing.id).not.toBeNull();
        expect(linearRing.components.length).toEqual(6);
        expect(linearRing.components[0].id).toEqual(linearRing.components[5].id);
        for (var i = 0; i < linearRing.components.length; i++) {
            expect(linearRing.components[i].CLASS_NAME).toEqual("SuperMap.Geometry.Point");
            expect(linearRing.components[i].type).toEqual("Point");
        }
        //获得当前几何对象区域大小，如果是沿顺时针方向的环则是正值，否则为负值
        var area = linearRing.getArea();
        expect(area).toEqual(-4929.534861156455);
    });

    // 添加一个点到几何图形数组中
    it('addComponent', function () {
        var addPoint = new SuperMap.Geometry.Point(5365.09521434033, -3324.5789112568386);
        var addSuccess = linearRing.addComponent(addPoint, 6);
        expect(addSuccess).toBeTruthy();
        expect(linearRing.components.length).toEqual(7);
        expect(linearRing.components[0].id).toEqual(linearRing.components[6].id);
    });

    //从几何组件中删除一个点。
    it('removeComponent', function () {
        var removedSuccess = linearRing.removeComponent(points[2]);
        expect(removedSuccess).toBeTruthy();
        expect(linearRing.components.length).toEqual(6);
    });

    //返回几何图形的所有点的列表
    it('getVertices', function () {
        var pointList1 = linearRing.getVertices(true);
        var pointList2 = linearRing.getVertices(false);
        expect(pointList1.length).toEqual(0);
        expect(pointList2).not.toBeNull();
        expect(pointList2.length).toEqual(5);
    });
});