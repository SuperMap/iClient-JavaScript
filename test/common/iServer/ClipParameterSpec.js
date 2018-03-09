import {ClipParameter} from '../../../src/common/iServer/ClipParameter';
import {Geometry} from '../../../src/common/commontypes/Geometry';

describe('ClipParameter', () => {
    it('constructor, destroy', () => {
        var points = [new Geometry.Point(111.4687675858, 353.8548114800),
            new Geometry.Point(111.4687675858, 408.1485649972),
            new Geometry.Point(208.9814293754, 408.1485649972),
            new Geometry.Point(208.9814293754, 353.8548114800)];
        var options = {
            clipDatasetName: "testDataset",
            clipDatasourceName: "testDatasource",
            clipRegion: new Geometry.Polygon(new Geometry.LinearRing(points)),
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

    it('toJSON', () => {
        var points = [new Geometry.Point(111.4687675858, 353.8548114800),
            new Geometry.Point(111.4687675858, 408.1485649972),
            new Geometry.Point(208.9814293754, 408.1485649972),
            new Geometry.Point(208.9814293754, 353.8548114800)];
        var options = {
            clipDatasetName: "testDataset",
            clipDatasourceName: "testDatasource",
            clipRegion: new Geometry.Polygon(new Geometry.LinearRing(points)),
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
