module("ShapeParameterPolygon");
test("testShapeParameterPolygon_constructorDefault",function(){
    function equalArray(array1, array2){
        if(array1.length !== array2.length){
            return false;
        }

        for(var i = 0, len = array1.length; i < len; i++){
            var arry1i = array1[i];
            var arry2i = array2[i];

            if(arry1i[0] !== arry2i[0]){
                return false;
            }
            if(arry1i[1] !== arry2i[1]){
                return false;
            }
        }
        return true;
    }

    expect(2);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Polygon([
        [0, 0],
        [15, 15],
        [30, 0]
    ]);
    same(shapeParameters.refOriginalPosition, [0, 0], "refOriginalPosition");
    ok(equalArray(shapeParameters.pointList, [
        [0, 0],
        [15, 15],
        [30, 0]
    ]), "pointList");
    shapeParameters.destroy();
});
test("testShapeParameterPolygon_destroy",function(){
    function equalArray(array1, array2){
        if(array1.length !== array2.length){
            return false;
        }

        for(var i = 0, len = array1.length; i < len; i++){
            var arry1i = array1[i];
            var arry2i = array2[i];

            if(arry1i[0] !== arry2i[0]){
                return false;
            }
            if(arry1i[1] !== arry2i[1]){
                return false;
            }
        }
        return true;
    }

    expect(4);
    var shapeParameters = new SuperMap.Feature.ShapeParameters.Polygon([
        [0, 0],
        [15, 15],
        [30, 0]
    ]);
    same(shapeParameters.refOriginalPosition, [0, 0], "refOriginalPosition");
    ok(equalArray(shapeParameters.pointList, [
        [0, 0],
        [15, 15],
        [30, 0]
    ]), "pointList");
    shapeParameters.destroy();
    same(shapeParameters.refOriginalPosition, null, "refOriginalPosition: null");
    equal(shapeParameters.pointList, null, "pointList");
});