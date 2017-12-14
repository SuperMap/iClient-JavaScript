var ClipParameter = require('../../../src/common/iServer/ClipParameter').ClipParameter;

describe('ClipParameter', function () {
    it('constructor, destroy', function () {
        var points = [new SuperMap.Geometry.Point(111.4687675858, 353.8548114800),
            new SuperMap.Geometry.Point(111.4687675858, 408.1485649972),
            new SuperMap.Geometry.Point(208.9814293754, 408.1485649972),
            new SuperMap.Geometry.Point(208.9814293754, 353.8548114800)];
        var options = {
            clipDatasetName: "testDataset",
            clipDatasourceName: "testDatasource",
            clipRegion: new SuperMap.Geometry.Polygon(new SuperMap.Geometry.LinearRing(points)),
            isExactClip: false
        };
        var parameter = new ClipParameter(options);
        expect(parameter.clipDatasetName).toEqual("testDataset");
        expect(parameter.clipDatasourceName).toEqual("testDatasource");
        expect(parameter.clipRegion).not.toBeNull();
        expect(parameter.isExactClip).toBeFalsy();
        parameter.destroy();
        expect(parameter.clipDatasetName).toBeNull();
        expect(parameter.clipDatasourceName).toBeNull();
        expect(parameter.clipRegion).toBeNull();
        expect(parameter.isClipInRegion).toBeNull();
        expect(parameter.isExactClip).toBeNull();
    });

    it('toJSON', function () {
        var points = [new SuperMap.Geometry.Point(111.4687675858, 353.8548114800),
            new SuperMap.Geometry.Point(111.4687675858, 408.1485649972),
            new SuperMap.Geometry.Point(208.9814293754, 408.1485649972),
            new SuperMap.Geometry.Point(208.9814293754, 353.8548114800)];
        var options = {
            clipDatasetName: "testDataset",
            clipDatasourceName: "testDatasource",
            clipRegion: new SuperMap.Geometry.Polygon(new SuperMap.Geometry.LinearRing(points)),
            isClipInRegion: true,
            isExactClip: false
        };
        var parameter = new ClipParameter(options);
        var json = parameter.toJSON();
        expect(json).not.toBeNull();
        expect(json).toContain("'clipDatasetName':\"testDataset\"");
        parameter.isClipInRegion = false;
        var json1 = parameter.toJSON();
        expect(json1).toBeNull();
        parameter.destroy();
    });
});
