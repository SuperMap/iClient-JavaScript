var LabelImageCell = require('../../../src/common/iServer/LabelImageCell').LabelImageCell;

describe('LabelImageCell', function () {
    it('constructor, destroy', function () {
        var labelImageCell = new LabelImageCell({pathField: "test"});
        expect(labelImageCell.CLASS_NAME).toEqual("SuperMap.LabelImageCell");
        expect(labelImageCell.pathField).toEqual("test");
        expect(labelImageCell.sizeFixed).toBeFalsy();
        expect(labelImageCell.type).toEqual("IMAGE");
        labelImageCell.destroy();
        expect(labelImageCell.height).toBeNull();
        expect(labelImageCell.pathField).toBeNull();
        expect(labelImageCell.rotation).toBeNull();
        expect(labelImageCell.width).toBeNull();
        expect(labelImageCell.sizeFixed).toBeNull();
    });
});
