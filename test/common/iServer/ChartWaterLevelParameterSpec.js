import { ChartWaterLevelParameter } from '@supermapgis/iclient-common/iServer/ChartWaterLevelParameter';

describe('ChartWaterLevelParameter', () => {
    it('constructor, destroy', () => {
        var options = {
            dataSource: 'datasrouce',
            coordinates: [113.6307273864746, 22.780766677856448],
            currentTime: '20251224T000000Z',
        };
        var parameter = new ChartWaterLevelParameter(options);
        expect(parameter).not.toBeNull();
        expect(parameter.dataSource).toBe('datasrouce');
        expect(parameter.coordinates).toEqual([113.6307273864746, 22.780766677856448]);
        expect(parameter.dataset).toBe('S104Position4326');
        expect(parameter.waterLevelDataset).toBe('S104WaterLevel');
        expect(parameter.timeDataset).toBe('S104Time');
        expect(parameter.timeIdKey).toBe('TIMEID');
        expect(parameter.currentTime).toBe('20251224T000000Z');
        parameter.destroy();
        expect(parameter.dataSource).toBeNull();
        expect(parameter.coordinates).toBeNull();
        expect(parameter.dataset).toBeNull();
        expect(parameter.waterLevelDataset).toBeNull();
        expect(parameter.timeDataset).toBeNull();
        expect(parameter.timeIdKey).toBeNull();
        expect(parameter.currentTime).toBeNull();
    });
});
