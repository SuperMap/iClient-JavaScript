import { AreaSolarRadiationParameters } from '../../../src/common/iServer/AreaSolarRadiationParameters';

describe('AreaSolarRadiationParameters', () => {
    it('constructor, destroy', () => {
        var options = {
            dataset: 'JingjinTerrain@Jingjin',
            targetDatasourceName: 'Jingjin',
            totalGridName: 'dataset1',
            diffuseDatasetGridName: 'dataset2',
            durationDatasetGridName: 'dataset3',
            directDatasetGridName: 'dataset4',
            latitude: 90,
            dayStart: 1,
            dayEnd: 300,
            hourStart: 8,
            hourEnd: 18
        };
        var parameters = new AreaSolarRadiationParameters(options);
        expect(parameters).not.toBeNull();
        expect(parameters.dataset).toEqual('JingjinTerrain@Jingjin');
        expect(parameters.targetDatasourceName).toEqual('Jingjin');
        expect(parameters.totalGridName).toEqual('dataset1');
        expect(parameters.diffuseDatasetGridName).toEqual('dataset2');
        expect(parameters.durationDatasetGridName).toEqual('dataset3');
        expect(parameters.directDatasetGridName).toEqual('dataset4');
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
            dataset: 'JingjinTerrain@Jingjin',
            targetDatasourceName: 'Jingjin',
            totalGridName: 'dataset1',
            diffuseDatasetGridName: 'dataset2',
            durationDatasetGridName: 'dataset3',
            directDatasetGridName: 'dataset4',
            latitude: 90,
            dayStart: 1,
            dayEnd: 300,
            hourStart: 8,
            hourEnd: 18
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

    it('dataset', () => {
        var parameter = new AreaSolarRadiationParameters({ dataset: 'JingjinTerrain@Jingjin' });
        expect(parameter.dataset).toEqual('JingjinTerrain@Jingjin');
        parameter.destroy();
    });

    it('targetDatasourceName', () => {
        var parameter = new AreaSolarRadiationParameters({ targetDatasourceName: 'Jingjin' });
        expect(parameter.targetDatasourceName).toEqual('Jingjin');
        parameter.destroy();
    });

    it('totalGridName', () => {
        var parameter = new AreaSolarRadiationParameters({ totalGridName: 'dataset1' });
        expect(parameter.totalGridName).toEqual('dataset1');
        parameter.destroy();
    });

    it('diffuseDatasetGridName', () => {
        var parameter = new AreaSolarRadiationParameters({ diffuseDatasetGridName: 'dataset2' });
        expect(parameter.diffuseDatasetGridName).toEqual('dataset2');
        parameter.destroy();
    });

    it('durationDatasetGridName', () => {
        var parameter = new AreaSolarRadiationParameters({ durationDatasetGridName: 'dataset3' });
        expect(parameter.durationDatasetGridName).toEqual('dataset3');
        parameter.destroy();
    });

    it('directDatasetGridName', () => {
        var parameter = new AreaSolarRadiationParameters({ directDatasetGridName: 'dataset4' });
        expect(parameter.directDatasetGridName).toEqual('dataset4');
        parameter.destroy();
    });

    it('latitude', () => {
        var parameter = new AreaSolarRadiationParameters({ latitude: 90 });
        expect(parameter.latitude).toEqual(90);
        parameter.destroy();
    });

    it('dayStart', () => {
        var parameter = new AreaSolarRadiationParameters({ dayStart: 1 });
        expect(parameter.dayStart).toEqual(1);
        parameter.destroy();
    });

    it('dayEnd', () => {
        var parameter = new AreaSolarRadiationParameters({ dayEnd: 300 });
        expect(parameter.dayEnd).toEqual(300);
        parameter.destroy();
    });

    it('hourStart', () => {
        var parameter = new AreaSolarRadiationParameters({ hourStart: 8 });
        expect(parameter.hourStart).toEqual(8);
        parameter.destroy();
    });
    it('hourEnd', () => {
        var parameter = new AreaSolarRadiationParameters({ hourEnd: 18 });
        expect(parameter.hourEnd).toEqual(18);
        parameter.destroy();
    });
});
