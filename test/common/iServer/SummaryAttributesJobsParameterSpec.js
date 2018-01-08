var SummaryAttributesJobsParameter = require('../../../src/common/iServer/SummaryAttributesJobsParameter').SummaryAttributesJobsParameter;
var OutputSetting = require('../../../src/common/iServer/OutputSetting').OutputSetting;

describe('SummaryAttributesJobsParameter', function () {
    it('constructor, destroy', function () {
        var options = {
            datasetName: 'testDatasetName',
            groupField: 'testField',
            attributeField: 'testAttrField',
            statisticModes: 'testType',
        };
        var datasourceConnectionInfo = new SuperMap.DatasourceConnectionInfo({
            alias:"dataSourceName",
            connect:"false",
            dataBase:"testDataBase",
            driver: "WMTS"
        });
        var parametersNull = new SummaryAttributesJobsParameter();
        expect(parametersNull).not.toBeNull();
        var parameters = new SummaryAttributesJobsParameter(options);
        expect(parameters).not.toBeNull();
        expect(parameters.datasetName).toEqual('testDatasetName');
        expect(parameters.groupField).toEqual('testField');
        expect(parameters.attributeField).toEqual('testAttrField');
        expect(parameters.statisticModes).toEqual('testType');
        expect(parameters.output).toEqual(null);
        parameters.output = new OutputSetting({
            type: SuperMap.OutputType.UDB,
            datasetName: 'testAnalystResult',
            datasourceInfo: datasourceConnectionInfo,
            outputPath: 'testpath'
        });
        parameters.destroy();
        expect(parameters.datasetName).toBeNull();
        expect(parameters.groupField).toBeNull();
        expect(parameters.attributeField).toBeNull();
        expect(parameters.statisticModes).toBeNull();
        expect(parameters.output).toBeNull();
    });

    it('toObject', function () {
        var options = {
            datasetName: 'testDatasetName',
            groupField: 'testField',
            attributeField: 'testAttrField',
            statisticModes: 'testType',
        };
        var parameters = new SummaryAttributesJobsParameter(options);
        parameters.output = new OutputSetting({
            type: SuperMap.OutputType.UDB,
            datasetName: 'testAnalystResult',
            datasourceInfo: 'testInfo',
            outputPath: 'testpath'
        });
        var tempObj = new SummaryAttributesJobsParameter(options);
        new SuperMap.SummaryAttributesJobsParameter.toObject(parameters, tempObj);
        expect(tempObj.output.CLASS_NAME).toEqual("SuperMap.OutputSetting");
        expect(tempObj.output.datasetName).toEqual("testAnalystResult");
        expect(tempObj.output.type).toEqual("UDB");
        expect(tempObj.output.datasourceInfo).toEqual("testInfo");
        expect(tempObj.output.outputPath).toEqual("testpath");
        tempObj.destroy();
        parameters.destroy();
    });
});