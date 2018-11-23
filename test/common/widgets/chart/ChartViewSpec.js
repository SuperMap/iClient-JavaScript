import { ChartView } from '../../../../src/common/widgets/chart/ChartView';
import '../../../resources/FeatureService';

describe('ChartView', () => {
    var chartDiv = window.document.createElement("div");
    chartDiv.setAttribute("id", "chart");
    chartDiv.style.styleFloat = "left";
    chartDiv.style.marginLeft = "8px";
    chartDiv.style.marginTop = "50px";
    chartDiv.style.width = "450px";
    chartDiv.style.height = "350px";
    window.document.body.appendChild(chartDiv);
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
    var chartView = new ChartView("chart", options);

    it('constructor, _fillDataToView', () => {
        expect(chartView.domID).toBe("chart");
        expect(chartView.chartType).toBe("line");
    });

    it('onAdd', () => {
        let addChart = function () { }
        chartView.onAdd(addChart);
        expect(chartView.addChart).toBe(addChart);
    });
    it('setStyle', () => {
        var style = {
            backgroundColor: "#fff",
            tooltip: "test",
            grid: "test"
        }
        var options = chartView.setStyle(style);
        expect(options).not.toBeDefined();
    });
    it('changeType', () => {
        chartView.changeType("bar");
        expect(chartView.chartType).toBe("bar");
    });
    it('updateData', () => {
        var url = "http://support.supermap.com:8090/iserver/services/map-world/rest/maps/World/layers/Rivers@World@@World";
        var chartOption = [{
            xAxis: {
                field: "AREA",
                name: "Area"
            }
        }]
        chartView.updateData(url, null, chartOption);
    });
    it('_createChart', () => {
        var recordsets = QueryBySQLService.result.recordsets[0];
        var data = {
            features: recordsets.features,
            fieldCaptions: recordsets.fieldCaptions,
            fieldTypes: recordsets.fieldTypes,
            fieldValues: [[21, 21], [21.2, 22]]
        }
        chartView._createChart(data);
        expect(chartView.echart).not.toBeNull();
    });
    it('_updateChart', () => {
        let option = {
            series: [{
                data: [1, 2, 3],
                type: "bar"
            }],
            xAxis: {
                type: "category",
                name: "X",
                data: [1, 2, 3]
            },
            yAxis: {
                type: "value",
                name: "Y"
            }
        }
        chartView._updateChart(option);
        expect(chartView.echart).not.toBeNull();
    });
});