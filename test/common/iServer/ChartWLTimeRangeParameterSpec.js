import { ChartWLTimeRangeParameter } from '@supermapgis/iclient-common/iServer/ChartWLTimeRangeParameter';

describe('ChartWLTimeRangeParameter', () => {
    it('constructor, destroy', () => {
        var options = {
            dataSource: 'datasrouce'
        };
        var parameter = new ChartWLTimeRangeParameter(options);
        expect(parameter).not.toBeNull();
        expect(parameter.dataSource).toBe('datasrouce');
        expect(parameter.dataset).toBe('S104Position4326');
        expect(parameter.timeDataset).toBe('S104Time');
        expect(parameter.idKey).toBe('CELLID');
        parameter.destroy();
        expect(parameter.dataSource).toBeNull();
        expect(parameter.dataset).toBeNull();
        expect(parameter.timeDataset).toBeNull();
        expect(parameter.idKey).toBeNull();
    });
});
