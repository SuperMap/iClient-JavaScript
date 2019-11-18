import { FacilityAnalystUpstream3DParameters } from '../../../src/common/iServer/FacilityAnalystUpstream3DParameters';

describe('FacilityAnalystUpstream3DParameters', () => {
    it('constructor,destroy', () => {
        var options = {
            edgeID: 84,
            nodeID: 25,
            weightName: 'test',
            isUncertainDirectionValid: false,
            sourceNodeIDs: [20, 43, 85]
        };
        var parameter = new FacilityAnalystUpstream3DParameters(options);
        expect(parameter).not.toBeNull();
        expect(parameter.CLASS_NAME).toEqual('SuperMap.FacilityAnalystUpstream3DParameters');
        expect(parameter.edgeID).toEqual(84);
        expect(parameter.nodeID).toEqual(25);
        expect(parameter.weightName).toEqual('test');
        expect(parameter.isUncertainDirectionValid).toBeFalsy();
        expect(parameter.sourceNodeIDs.length).toEqual(3);
        parameter.destroy();
        expect(parameter.edgeID).toBeNull();
        expect(parameter.nodeID).toBeNull();
        expect(parameter.weightName).toBeNull();
        expect(parameter.isUncertainDirectionValid).toBeNull();
        expect(parameter.sourceNodeIDs).toBeNull();
    });

    it('sourceNodeIDs', () => {
        var parameter = new FacilityAnalystUpstream3DParameters({ sourceNodeIDs: [84, 85] });
        expect(parameter.sourceNodeIDs.length).toEqual(2);
        parameter.destroy();
    });

    it('edgeID', () => {
        var parameter = new FacilityAnalystUpstream3DParameters({ edgeID: 84 });
        expect(parameter.edgeID).toEqual(84);
        parameter.destroy();
    });

    it('nodeID', () => {
        var parameter = new FacilityAnalystUpstream3DParameters({ nodeID: 85 });
        expect(parameter.nodeID).toEqual(85);
        parameter.destroy();
    });

    it('isUncertainDirectionValid', () => {
        var parameter = new FacilityAnalystUpstream3DParameters({ isUncertainDirectionValid: false });
        expect(parameter.isUncertainDirectionValid).toBeFalsy();
        parameter.destroy();
    });
});
