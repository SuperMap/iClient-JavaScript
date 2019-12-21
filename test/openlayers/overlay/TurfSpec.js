import { Turf } from '../../../src/openlayers/overlay/Turf';
import * as turf from '@turf/turf';
describe('openlayers_Turf', () => {
    var opt_options;
    var serviceResult;

    it('parse,parseOption,rocess_Measurement.along,', (done) => {
        opt_options = {
            attributions: " ",
            features: " ",
            format: "",
            logo: "",
            projection: "",
            wrapX: "",
        };
        var openLayerturf = new Turf(opt_options);
        expect(turf).not.toBeNull();;
        var type = "Measurement.along";
        var line = turf.lineString([[-83, 30], [-84, 36], [-78, 41]]);
        var options = { units: 'miles' };

        var args = {
            line: line,
            distance: 10,
            units: "kilometers"
        };
        var addFeaturesToMap = false;

        openLayerturf.process(type, args, (result) => {
            serviceResult = result
        }, addFeaturesToMap);
        expect(serviceResult).not.toBeNull();
        expect(serviceResult.geometry).not.toBeNull();
        done();
    });
});