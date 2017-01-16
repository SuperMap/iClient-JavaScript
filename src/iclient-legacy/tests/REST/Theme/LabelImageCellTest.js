module("LabelImageCell");

test("TestLabelImageCell_1",function(){
    var labelImageCell = new SuperMap.REST.LabelImageCell();
    ok(labelImageCell != null, "labelImageCell");
    ok(labelImageCell.pathField == null, "labelImageCell.pathField");
    ok(!labelImageCell.sizeFixed, "labelImageCell.sizeFixed");
    equal(labelImageCell.width, 0, "labelImageCell.width");
    equal(labelImageCell.height, 0, "labelImageCell.height");
    equal(labelImageCell.rotation, 0, "labelImageCell.rotation");
    equal(labelImageCell.type, "IMAGE", "labelImageCell.type");
});

test("TestLabelImageCell_2",function(){
    var labelImageCell = new SuperMap.REST.LabelImageCell({
        pathField: "test",
        width: 10,
        height: 10
    });
    ok(labelImageCell != null, "labelImageCell");
    equal(labelImageCell.pathField, "test", "labelImageCell.pathField");
    ok(!labelImageCell.sizeFixed, "labelImageCell.sizeFixed");
    equal(labelImageCell.width, 10, "labelImageCell.width");
    equal(labelImageCell.height, 10, "labelImageCell.height");
    equal(labelImageCell.rotation, 0, "labelImageCell.rotation");
    equal(labelImageCell.type, "IMAGE", "labelImageCell.type");
    labelImageCell.destroy();
    ok(labelImageCell.pathField == null, "labelImageCell.pathField");
    ok(labelImageCell.sizeFixed == null, "labelImageCell.sizeFixed");
    ok(labelImageCell.width == null, "labelImageCell.width");
    ok(labelImageCell.height == null, "labelImageCell.height");
    ok(labelImageCell.rotation == null, "labelImageCell.rotation");
});