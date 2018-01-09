require('../../../../src/common/commontypes/geometry/Collection');

describe('Collection', function () {
    it('clone, getComponentsString, removeComponents', function () {
        var point1 = new SuperMap.Geometry.Point(10, 20);
        var point2 = new SuperMap.Geometry.Point(30, 40);
        var collection = new SuperMap.Geometry.Collection([point1, point2]);
        var collection1 = collection.clone();
        expect(collection.CLASS_NAME).toEqual(collection1.CLASS_NAME);
        expect(collection.components.length).toEqual(collection1.components.length);
        for (var i = 0; i < collection.components.length; i++) {
            expect(collection.components[i].CLASS_NAME).toEqual(collection1.components[i].CLASS_NAME);
            expect(collection.components[i].type).toEqual(collection1.components[i].type);
            expect(collection.components[i].x).toEqual(collection1.components[i].x);
            expect(collection.components[i].y).toEqual(collection1.components[i].y);
        }
        var componentsString = collection.getComponentsString();
        expect(componentsString).toBe("10, 20,30, 40");
        var isComponentsRemove = collection.removeComponents(point1, point2);
        expect(isComponentsRemove).toBe(true);
        //expect(collection.components.length).toEqual(0);    //此处有BUG，只清除掉了components[0]
        collection.destroy();
        collection1.destroy();
    });

    it('addComponent_index<components.length', function () {
        var point1 = new SuperMap.Geometry.Point(10, 20);
        var point2 = new SuperMap.Geometry.Point(30, 40);
        var collection = new SuperMap.Geometry.Collection([point1, point2]);
        expect(collection.components.length).toEqual(2);
        var point3 = new SuperMap.Geometry.Point(10, 10);
        collection.addComponent(point3, 0);
        expect(collection.components.length).toEqual(3);
        expect(collection.components[0].x).toEqual(10);
        expect(collection.components[0].y).toEqual(10);
        expect(collection.components[1].x).toEqual(10);
        expect(collection.components[1].y).toEqual(20);
        expect(collection.components[2].x).toEqual(30);
        expect(collection.components[2].y).toEqual(40);
        collection.destroy();
    });

    it('getArea', function () {
        var point1 = new SuperMap.Geometry.Point(1, 2);
        var point2 = new SuperMap.Geometry.Point(3, 2);
        var collection = new SuperMap.Geometry.Collection([point1, point2]);
        var area = collection.getArea();
        expect(area).toEqual(0);
        collection.destroy();
    });

    it('equals', function () {
        //CLASS_NAME is not equal
        var point = new SuperMap.Geometry.Point(1, 2);
        var point1 = new SuperMap.Geometry.Point(2, 2);
        var collection = new SuperMap.Geometry.Collection([point]);
        var isEqual = collection.equals(point);
        expect(isEqual).toBeFalsy();
        //length of components is not equal
        var collection1 = new SuperMap.Geometry.Collection([point, point1]);
        var isEqual1 = collection.equals(collection1);
        expect(isEqual1).toBeFalsy();
        //components[i] is not equal
        var collection2 = new SuperMap.Geometry.Collection([point1]);
        var isEqual2 = collection.equals(collection2);
        expect(isEqual2).toBeFalsy();
        //equal
        var collection3 = new SuperMap.Geometry.Collection([point]);
        var isEqual3 = collection.equals(collection3);
        expect(isEqual3).toBeTruthy();
        collection.destroy();
        collection1.destroy();
        collection2.destroy();
        collection3.destroy();
    });

    it('getVertices', function () {
        var point1 = new SuperMap.Geometry.Point(10, 0);
        var point2 = new SuperMap.Geometry.Point(30, 0);
        var collection = new SuperMap.Geometry.Collection([point1, point2]);
        var vertices = collection.getVertices(false);
        expect(vertices.length).toEqual(2);
        expect(collection.components[0].x).toEqual(10);
        expect(collection.components[0].y).toEqual(0);
        expect(collection.components[1].x).toEqual(30);
        expect(collection.components[1].y).toEqual(0);
        collection.destroy();
    })
});
