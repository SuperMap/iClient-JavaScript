import { ChartViewModel } from '../../../../src/common/widgets/chart/ChartViewModel';
import '../../../resources/FeatureService';

describe('ChartViewModel', () => {
    var options = {
        type: 'line',
        datasets: {
            url: "http://support.supermap.com:8090/iserver/services/map-world/rest/maps/World/layers/Rivers@World@@World",
            // url: "http://support.supermap.com:8090/iserver/services/data-jingjin/rest/data/datasources/Jingjin/datasets/Landuse_R",
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        },
        chartOptions: [{
            xAxis: {
                field: "NAME",
                name: "name"
            },
            yAxis: {
                field: "KILOMETERS",
                name: "Kilometers"
            }
        }]
    }
    var chartViewModel = new ChartViewModel(options);

    it('constructor', () => {
        expect(chartViewModel.datasets).toBe(options.datasets);
        expect(chartViewModel.chartType).toBe(options.type);
        expect(chartViewModel.grid.top).toBe("50px");
        expect(chartViewModel.grid.bottom).toBe("50px");
        expect(chartViewModel.grid.left).toBe("50px");
        expect(chartViewModel.grid.right).toBe("60px");
        expect(chartViewModel.xField).not.toBeNull();
        expect(chartViewModel.yField).not.toBeNull();
        expect(chartViewModel.xField[0].field).toBe("NAME");
        expect(chartViewModel.xField[0].name).toBe("name");
        expect(chartViewModel.yField[0].field).toBe("KILOMETERS");
        expect(chartViewModel.yField[0].name).toBe("Kilometers");
    });
    it('getDatasetInfo', () => {
        var successed = function () { };
        chartViewModel.getDatasetInfo(successed);
        expect(chartViewModel.createChart).toBe(successed);
    });
    it('_getDatasetInfoSuccess, _getLayerFeatures', () => {
        var datasetInf = {
            result: {
                dataSourceName: "World",
                datasetName: "Rivers",
                mapName: "Rivers@World",
                dataUrl: "http://support.supermap.com:8090/iserver/services/map-world/rest/maps/World"
            }
        }
        chartViewModel._getDatasetInfoSuccess(datasetInf);
    });
    it('_getDatasetInfoSuccess, _getDataFeatures', () => {
        chartViewModel.datasets = {
            url: "http://support.supermap.com:8090/iserver/services/data-jingjin/rest/data/datasources/Jingjin/datasets/BaseMap_P",
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        }
        var datasetInf = {
            result: {
                dataSourceName: "Jingjin",
                datasetName: "BaseMap_P",
                dataUrl: "http://support.supermap.com:8090/iserver/services/data-jingjin/rest/data"
            }
        }
        chartViewModel._getDatasetInfoSuccess(datasetInf);
    });
    it('_getChartDatas', () => {
        chartViewModel._getChartDatas(getFeaturesBySQLService);
        expect(chartViewModel.features).not.toBeNull();
        expect(chartViewModel.features.features).not.toBeNull();
        expect(chartViewModel.features.type).toBe(getFeaturesBySQLService.result.features.type);
    });
    it('_getChartDatasFromLayer', () => {
        chartViewModel._getChartDatasFromLayer(QueryBySQLService);
        expect(chartViewModel.features).not.toBeNull();
        expect(chartViewModel.features.features).not.toBeNull();
        expect(chartViewModel.features.type).toBe(QueryBySQLService.result.recordsets[0].features.type);
    });
    it('_createChartOptions', () => {
        var recordsets = QueryBySQLService.result.recordsets[0];
        var data = {
            features: recordsets.features,
            fieldCaptions: recordsets.fieldCaptions,
            fieldTypes: recordsets.fieldTypes,
            fieldValues: [[21], [21.2]]
        }
        chartViewModel._createChartOptions(data);
        expect(chartViewModel.calculatedData.XData).not.toBeNull();
        expect(chartViewModel.calculatedData.YData).not.toBeNull();
    });
    it('changeType', () => {
        expect(chartViewModel.chartType).toBe("line");
        chartViewModel.changeType("bar");
        expect(chartViewModel.chartType).toBe("bar");
    });
    it('updateData', () => {
        var url = "http://support.supermap.com:8090/iserver/services/map-world/rest/maps/World/layers/Rivers@World@@World";
        var chartOption = [{
            xAxis: {
                field: "AREA",
                name: "Area"
            }
        }]
        var successed = function () { };
        chartViewModel.updateData(url, null, chartOption, successed);
        expect(chartViewModel.updateChart).toBe(successed);
        expect(chartViewModel.xField[0].field).toBe("AREA");
        expect(chartViewModel.xField[0].name).toBe("Area");
        expect(chartViewModel.yField.length).toBe(0);
    });
    it('_updateDataSuccess', () => {
        var recordsets = QueryBySQLService.result.recordsets[0];
        var data = {
            features: recordsets.features,
            fieldCaptions: recordsets.fieldCaptions,
            fieldTypes: recordsets.fieldTypes,
            fieldValues: [[21, 21], [21.2, 22]]
        }
        chartViewModel._updateDataSuccess(data);
    });
    it('updateChartOptions', () => {
        var style = {
            grid: {},
            tooltip: {},
            backgroundColor: {},
        }
        var newChartOption = chartViewModel.updateChartOptions("bar", style);
        expect(newChartOption.grid).toBe(style.grid);
        expect(newChartOption.tooltip).toBe(style.tooltip);
        expect(newChartOption.backgroundColor).toBe(style.backgroundColor);
    });
    it('setStyle', () => {
        var newStyle = {
            backgroundColor: "#fff",
            tooltip: "test",
            grid: "test"
        }
        var style = chartViewModel.setStyle(newStyle);
        expect(style.grid).toBe(newStyle.grid);
        expect(style.tooltip).toBe(newStyle.tooltip);
        expect(style.backgroundColor).toBe(newStyle.backgroundColor);
    });
    it('getStyle', () => {
        var style = chartViewModel.getStyle();
        expect(style.grid).toBe(chartViewModel.grid);
        expect(style.tooltip).toBe(chartViewModel.tooltip);
        expect(style.backgroundColor).toBe(chartViewModel.backgroundColor);
    });
    it('getFeatures', () => {
        var features = chartViewModel.getFeatures();
        expect(features).toBe(chartViewModel.features);
    });
});