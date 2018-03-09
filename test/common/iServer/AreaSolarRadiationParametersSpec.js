import {AreaSolarRadiationParameters} from '../../../src/common/iServer/AreaSolarRadiationParameters';

describe('AreaSolarRadiationParameters', () => {
    it('constructor, destroy', () => {
        var options = {
            dataset: "JingjinTerrain@Jingjin",
            targetDatasourceName: "Jingjin",
            totalGridName: "dataset1",
            diffuseDatasetGridName: "dataset2",
            durationDatasetGridName: "dataset3",
            directDatasetGridName: "dataset4",
            latitude: 90,
            dayStart: 1,
            dayEnd: 300,
            hourStart: 8,
            hourEnd: 18,
        };
        var parameters = new AreaSolarRadiationParameters(options);
        expect(parameters).not.toBeNull();
        expect(parameters.dataset).toEqual("JingjinTerrain@Jingjin");
        expect(parameters.targetDatasourceName).toEqual("Jingjin");
        expect(parameters.totalGridName).toEqual("dataset1");
        expect(parameters.diffuseDatasetGridName).toEqual("dataset2");
        expect(parameters.durationDatasetGridName).toEqual("dataset3");
        expect(parameters.directDatasetGridName).toEqual("dataset4");
        expect(parameters.latitude).toEqual(90);
        expect(parameters.dayStart).toEqual(1);
        expect(parameters.dayEnd).toEqual(300);
        expect(parameters.hourStart).toEqual(8);
        expect(parameters.hourEnd).toEqual(18);
        parameters.destroy();
        expect(parameters.dataset).toBeNull();
        expect(parameters.zFactor).toBe(1);
        expect(parameters.averageCurvatureName).toBeNull();
        expect(parameters.profileCurvatureName).toBeNull();
        expect(parameters.deleteExistResultDataset).toBeTruthy();
    });

    it('toObject', () => {
        var options = {
            dataset: "JingjinTerrain@Jingjin",
            targetDatasourceName: "Jingjin",
            totalGridName: "dataset1",
            diffuseDatasetGridName: "dataset2",
            durationDatasetGridName: "dataset3",
            directDatasetGridName: "dataset4",
            latitude: 90,
            dayStart: 1,
            dayEnd: 300,
            hourStart: 8,
            hourEnd: 18,
        };
        var parameters = new AreaSolarRadiationParameters(options);
        new AreaSolarRadiationParameters.toObject(options, parameters);
        expect(parameters).not.toBeNull();
        expect(parameters.parameter).not.toBeNull();
        expect(parameters.parameter.latitude).toEqual(90);
        expect(parameters.parameter.dayStart).toEqual(1);
        expect(parameters.parameter.dayEnd).toEqual(300);
        expect(parameters.parameter.hourStart).toEqual(8);
        expect(parameters.parameter.hourEnd).toEqual(18);
        parameters.destroy();
    });
});
