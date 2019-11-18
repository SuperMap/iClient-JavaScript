import { ClipParameter } from '../../../src/common/iServer/ClipParameter';
import { Geometry } from '../../../src/common/commontypes/Geometry';

describe('ClipParameter', () => {
    it('constructor, destroy', () => {
        var points = [
            new Geometry.Point(111.4687675858, 353.85481148),
            new Geometry.Point(111.4687675858, 408.1485649972),
            new Geometry.Point(208.9814293754, 408.1485649972),
            new Geometry.Point(208.9814293754, 353.85481148)
        ];
        var options = {
            clipDatasetName: 'testDataset',
            clipDatasourceName: 'testDatasource',
            clipRegion: new Geometry.Polygon(new Geometry.LinearRing(points)),
            isExactClip: false
        };
        var parameter = new ClipParameter(options);
        expect(parameter.clipDatasetName).toEqual('testDataset');
        expect(parameter.clipDatasourceName).toEqual('testDatasource');
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
        var points = [
            new Geometry.Point(111.4687675858, 353.85481148),
            new Geometry.Point(111.4687675858, 408.1485649972),
            new Geometry.Point(208.9814293754, 408.1485649972),
            new Geometry.Point(208.9814293754, 353.85481148)
        ];
        var options = {
            clipDatasetName: 'testDataset',
            clipDatasourceName: 'testDatasource',
            clipRegion: new Geometry.Polygon(new Geometry.LinearRing(points)),
            isClipInRegion: true,
            isExactClip: false
        };
        var parameter = new ClipParameter(options);
        var json = parameter.toJSON();
        expect(json).not.toBeNull();
        expect(json).toContain('\'clipDatasetName\':"testDataset"');
        expect(json).toContain("'parts':[5]");
        parameter.destroy();
    });

    it('clipDatasetName', () => {
        var parameter = new ClipParameter({ clipDatasetName: 'testDataset' });
        expect(parameter.clipDatasetName).toEqual('testDataset');
        parameter.destroy();
    });

    it('clipDatasourceName', () => {
        var parameter = new ClipParameter({ clipDatasourceName: 'testDatasource' });
        expect(parameter.clipDatasourceName).toEqual('testDatasource');
        parameter.destroy();
    });

    it('isClipInRegion', () => {
        var parameter = new ClipParameter({ isClipInRegion: false });
        expect(parameter.isClipInRegion).toBeFalsy();
        parameter.destroy();
    });

    it('isExactClip', () => {
        var parameter = new ClipParameter({ isExactClip: false });
        expect(parameter.isExactClip).toBeFalsy();
        parameter.destroy();
    });
});
