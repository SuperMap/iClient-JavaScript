import { ConvexHullAnalystParameters } from '../../../src/common/iServer/ConvexHullAnalystParameters';

describe('ConvexHullAnalystParameters', () => {
    it('constructor', () => {
        var options = {
            model:{type:"GEOMODEL3D", modelUrl:"http://supermapiserver:8090/SampleData/AirPlane.s3m", position:{"x":120.2, "y":40.2, "z":10}},
            resultSetting: {}
        };
        var parameter = new ConvexHullAnalystParameters(options);
        expect(parameter).not.toBeNull();
        expect(parameter.model).not.toBeNull();
        expect(parameter.resultSetting).not.toBeNull();
        parameter.destroy();
        expect(parameter.model).toBeNull();
        expect(parameter.resultSetting).toBeNull();
    });

    it('model', () => {
        var parameter = new ConvexHullAnalystParameters({ model:{type:"GEOMODEL3D", modelUrl:"http://supermapiserver:8090/SampleData/AirPlane.s3m", position:{"x":120.2, "y":40.2, "z":10}} });
        expect(parameter.model).not.toBeNull();
        parameter.destroy();
    });
    it('resultSetting', () => {
        var parameter = new ConvexHullAnalystParameters({ resultSetting: {} });
        expect(parameter.resultSetting).not.toBeNull();
        parameter.destroy();
    });

});
