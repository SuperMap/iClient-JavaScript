import {FacilityAnalystStreamParameters} from '../../../src/common/iServer/FacilityAnalystStreamParameters';

describe('FacilityAnalystStreamParameters', () => {
    it('constructor', () => {
        var options = {
            sourceNodeIDs: [84, 85],
            nodeID: 85,
            queryType: 0
        };
        var parameter = new FacilityAnalystStreamParameters(options);
        expect(parameter).not.toBeNull();
        expect(parameter.isUncertainDirectionValid).toBeFalsy();
        expect(parameter.nodeID).toEqual(85);
        expect(parameter.queryType).toEqual(0);
        expect(parameter.sourceNodeIDs.length).toEqual(2);
        parameter.destroy();
        expect(parameter.isUncertainDirectionValid).toBeNull();
        expect(parameter.edgeID).toBeNull();
        expect(parameter.nodeID).toBeNull();
        expect(parameter.weightName).toBeNull();
        expect(parameter.type).toBeNull();
    });
});

