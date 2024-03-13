import { FacilityAnalystStreamParameters } from '../../../src/common/iServer/FacilityAnalystStreamParameters';

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

    it('sourceNodeIDs', () => {
        var parameter = new FacilityAnalystStreamParameters({ sourceNodeIDs: [84, 85] });
        expect(parameter.sourceNodeIDs.length).toEqual(2);
        parameter.destroy();
    });

    it('queryType', () => {
        var parameter = new FacilityAnalystStreamParameters({ queryType: 0 });
        expect(parameter.queryType).toEqual(0);
        parameter.destroy();
    });

    it('edgeID', () => {
        var parameter = new FacilityAnalystStreamParameters({ edgeID: 85 });
        expect(parameter.edgeID).toEqual(85);
        parameter.destroy();
    });

    it('nodeID', () => {
        var parameter = new FacilityAnalystStreamParameters({ nodeID: 84 });
        expect(parameter.nodeID).toEqual(84);
        parameter.destroy();
    });

    it('isUncertainDirectionValid', () => {
        var parameter = new FacilityAnalystStreamParameters({ isUncertainDirectionValid: false });
        expect(parameter.isUncertainDirectionValid).toBeFalsy();
        parameter.destroy();
    });

    it('returnFeatures', () => {
      var parameter = new FacilityAnalystStreamParameters({ returnFeatures: false });
      expect(parameter.returnFeatures).toBeFalsy;
      parameter.destroy();
  });
});
