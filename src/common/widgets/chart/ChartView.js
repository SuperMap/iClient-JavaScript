/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import echarts from "echarts";
import { ChartViewModel } from "./ChartViewModel";

/**
 * @class SuperMap.Widgets.Chart
 * @classdesc 图表微件
 * @version 10.X.X
 * @param {string} domID - 图表dom元素ID。
 * @param {Object} options - 可选参数。
 * @param {string} options.type - 图表类型。
 * @param {Object} options.datasets - 数据来源。
 * @param {Array.<Object>} options.chartOptions - 图表可选参数。
 * @param {Array.<Object>} options.chartOptions.xAxis - 图表X轴。
 * @param {string} options.chartOptions.xAxis.field - 图表X轴字段名。
 * @param {string} options.chartOptions.xAxis.name - 图表X轴名称。
 * @param {Array.<Object>} options.chartOptions.yAxis - 图表Y轴。
 * @param {string} options.chartOptions.yAxis.field - 图表Y轴字段名。
 * @param {string} options.chartOptions.yAxis.name - 图表Y轴名称。
 * @category Widgets Chart
 */
export class ChartView {

    constructor(domID, options) {
        this.domID = domID;
        this.chartType = options.type || "bar";
        this.viewModel = new ChartViewModel(options);
        //添加控件。
        this._fillDataToView();
    }

    /**
     * @function SuperMap.Widgets.Chart.prototype.onAdd
     * @description 创建图表之后成功回调
     * @param {function} addChart - 回调函数
     */
    onAdd(addChart) {
        this.addChart = addChart;
    }

    /**
     * @function SuperMap.Widgets.Chart.prototype._fillDataToView
     * @description 填充数据到 view。
     * @private
     */
    _fillDataToView() {
        //iclient9 绑定createChart事件成功回调
        this.viewModel.getDatasetInfo(this._createChart.bind(this));
    }

    /**
     * @function SuperMap.Widgets.Chart.prototype.getStyle
     * @description 获取图表样式。
     */
    getStyle() {
        return this.viewModel.getStyle()
    }

    /**
     * @function SuperMap.Widgets.Chart.prototype.getFeatures
     * @description 获取地图服务，数据服务请求返回的数据。
     */
    getFeatures() {
        return this.viewModel.getFeatures();
    }

    /**
     * @function SuperMap.Widgets.Chart.prototype.setStyle
     * @description 设置图表样式。
     * @param {Object} style - 图表样式 参考Echarts-options样式设置
     */
    setStyle(style) {
        let newOptions = this.viewModel.setStyle(style);
        this._updateChart(newOptions);
    }

    /**
     * @function SuperMap.Widgets.Chart.prototype.changeType
     * @description 改变图表类型
     * @param {string} type - 图表类型
     */
    changeType(type) {
        this.chartType = type;
        let newOptions = this.viewModel.changeType(type);
        this._updateChart(newOptions);
    }
    
    /**
     * @function SuperMap.Widgets.Chart.prototype.updateData
     * @description 更新图表数据
     * @param {string} url - 数据源地址
     * @param {Object} queryInfo - 查询条件
     * @param {Object} chartOption - X,Y字段信息
     */
    updateData(url, queryInfo, chartOption) {
        let me = this;
        this.viewModel.updateData(url, queryInfo, chartOption, function(options) {
            me._updateChart(options);
            if(me.addChart) {
                me.addChart();
            }
        });
    }

    /**
     * @function SuperMap.Widgets.Chart.prototype._createChart
     * @description 创建图表
     * @private
     * @param {Object} data - 图表数据
     */
    _createChart(data) {
        this.echart = echarts.init(
            document.getElementById(this.domID), 
            null,
            { renderer: "canvas"}
        )
        let options = this.viewModel._createChartOptions(data);
        this.echart.setOption(options);
        if(this.addChart) {
            this.addChart();
        }
    }

    /**
     * @function SuperMap.Widgets.Chart.prototype._updateChart
     * @description 更新图表
     * @private
     * @param {Object} options - 图表参数
     */
    _updateChart(options) {
        if(this.echart) {
            this.echart.clear();
            this.echart.setOption(options);
        }
    }
}

SuperMap.Widgets.Chart = ChartView;