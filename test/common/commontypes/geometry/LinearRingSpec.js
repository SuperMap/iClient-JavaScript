import { LinearRing as GeometryLinearRing } from '../../../../src/common/commontypes/geometry/LinearRing';
import { Point as GeometryPoint } from '../../../../src/common/commontypes/geometry/Point';

describe('LinearRing', function () {
    var points = [new GeometryPoint(4933.319287022352, -3337.3849141502124),
        new GeometryPoint(4960.9674060199022, -3349.3316322355736),
        new GeometryPoint(5006.0235999418364, -3358.8890067038628),
        new GeometryPoint(5075.3145648369318, -3378.0037556404409),
        new GeometryPoint(5305.19551436013, -3376.9669111768926)];
    var linearRing = new GeometryLinearRing(points);

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
        var addPoint = new GeometryPoint(5365.09521434033, -3324.5789112568386);
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
     
     it('addComponent_duplicate_points', function () {
        // 第一个点和第4个点一样，但是应该正常渲染，不应该丢弃 ICL-1570
        var pointsRing = [
            new GeometryPoint(83.4923281624, 63.2826847261),// 1
            new GeometryPoint(86.2710459516, 66.4473355416),// 2
            new GeometryPoint(80.7522036759, 66.4473355416),// 3
            new GeometryPoint(83.4923281624, 63.2826847261),// 4
            new GeometryPoint(78.9383184524, 63.2826847261),// 5
            new GeometryPoint(78.9383184524, 69.9979193833),// 6
            new GeometryPoint(88.3936775961, 69.9979193833),// 7
            new GeometryPoint(88.3936775961, 63.4370579366),// 8
            new GeometryPoint(83.4923281624, 63.2826847261)
        ];
        var ring = new GeometryLinearRing(pointsRing);
        expect(ring.components.length).toEqual(9);
        expect(ring.components[3].x).toEqual(83.4923281624);
    });
});
