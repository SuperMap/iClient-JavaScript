import { ChartWaterLevelParameter } from '@supermapgis/iclient-common/iServer/ChartWaterLevelParameter';

describe('ChartWaterLevelParameter', () => {
    it('constructor, destroy', () => {
        var options = {
            dataSource: 'datasrouce',
            bounds: [113.6307273864746, 22.780766677856448, 113.6358772277832, 22.785916519165042],
        };
        var parameter = new ChartWaterLevelParameter(options);
        expect(parameter).not.toBeNull();
        expect(parameter.dataSource).toBe('datasrouce');
        expect(parameter.bounds).toEqual([113.6307273864746, 22.780766677856448, 113.6358772277832, 22.785916519165042]);
        expect(parameter.dataset).toBe('S104Position4326');
        expect(parameter.waterLevelDataset).toBe('S104WaterLevel');
        expect(parameter.timeDataset).toBe('S104Time');
        expect(parameter.timeIdKey).toBe('TIMEID');
        parameter.destroy();
        expect(parameter.dataSource).toBeNull();
        expect(parameter.bounds).toBeNull();
        expect(parameter.dataset).toBeNull();
        expect(parameter.waterLevelDataset).toBeNull();
        expect(parameter.timeDataset).toBeNull();
        expect(parameter.timeIdKey).toBeNull();
    });
});
