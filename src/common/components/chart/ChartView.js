/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import echarts from "echarts";
import {
    ChartViewModel
} from "./ChartViewModel";
import {
    MessageBox
} from "../messagebox/MessageBox";

/**
 * @class Chart
 * @deprecatedclass SuperMap.Components.Chart
 * @classdesc 图表组件
 * @version 9.1.2
 * @param {string} domID - 图表dom元素ID。
 * @param {Object} options - 可选参数。
 * @param {string} options.type - 图表类型。
 * @param {Chart.Datasets} options.datasets - 数据来源
 * @param {Array.<Object>} options.chartOptions - 图表可选参数。
 * @param {Array.<Object>} options.chartOptions.xAxis - 图表X轴。
 * @param {string} options.chartOptions.xAxis.field - 图表X轴字段名。
 * @param {string} options.chartOptions.xAxis.name - 图表X轴名称。
 * @param {Array.<Object>} options.chartOptions.yAxis - 图表Y轴。
 * @param {string} options.chartOptions.yAxis.field - 图表Y轴字段名。
 * @param {string} options.chartOptions.yAxis.name - 图表Y轴名称。
 * @category Components Chart
 * @usage
 */
/**
 * @typedef {Object} Chart.Datasets  - 数据来源
 * @property {string} [type = 'iServer'] - 服务类型 iServer, iPortal。
 * @property {string} url - 服务url地址。
 * @property {boolean} [withCredentials = false] - 设置请求是否带cookie
 * @property {FilterParameter} queryInfo - 查询条件
 */
export class ChartView {

    constructor(domID, options) {
        this.domID = domID;
        this.chartType = options.type || "bar";
        // 设置options.datasets.type的默认值是iServer
        options.datasets.type = options.datasets.type || 'iServer';
        // 设置withCredentials的默认值为false
        options.datasets.withCredentials = options.datasets.withCredentials || false;
        this.viewModel = new ChartViewModel(options);
        //添加控件。
        this._fillDataToView();
    }

    /**
     * @function Chart.prototype.onAdd
     * @description 创建图表之后成功回调
     * @param {function} addChart - 回调函数
     */
    onAdd(addChart) {
        this.addChart = addChart;
    }

    /**
     * @function Chart.prototype._fillDataToView
     * @description 填充数据到 view。
     * @private
     */
    _fillDataToView() {
        let messageboxs = new MessageBox();
        //iclient 绑定createChart事件成功回调
        this.viewModel.getDatasetInfo(this._createChart.bind(this));
        this.viewModel.events.on({
            "getdatafailed": (error) => {
                messageboxs.showView(error.message);
            }
        });
    }

    /**
     * @function Chart.prototype.getStyle
     * @description 获取图表样式。
     */
    getStyle() {
        return this.viewModel.getStyle()
    }

    /**
     * @function Chart.prototype.getFeatures
     * @description 获取地图服务，数据服务请求返回的数据。
     */
    getFeatures() {
        return this.viewModel.getFeatures();
    }

    /**
     * @function Chart.prototype.setStyle
     * @description 设置图表样式。
     * @param {Object} style - 图表样式 参考Echarts-options样式设置
     */
    setStyle(style) {
        let newOptions = this.viewModel.setStyle(style);
        this._updateChart(newOptions);
    }

    /**
     * @function Chart.prototype.changeType
     * @description 改变图表类型
     * @param {string} type - 图表类型
     */
    changeType(type) {
        if (this.chartType !== type) {
            this.chartType = type;
            let newOptions = this.viewModel.changeType(type);
            this._updateChart(newOptions);
        }
    }

    /**
     * @function Chart.prototype.updateData
     * @description 更新图表数据
     * @param {Chart.Datasets} datasets - 数据来源
     * @param {Object} chartOption - X,Y轴信息
     */
    updateData(datasets, chartOption) {
        let me = this;
        this.viewModel.updateData(datasets, chartOption, function (options) {
            me._updateChart(options);
            if (me.addChart) {
                me.addChart();
            }
        });
    }

    /**
     * @function Chart.prototype._createChart
     * @description 创建图表
     * @private
     * @param {Object} data - 图表数据
     */
    _createChart(data) {
        this.echart = echarts.init(
            document.getElementById(this.domID),
            null, {
                renderer: "canvas"
            }
        )
        let options = this.viewModel._createChartOptions(data);
        this.echart.setOption(options);
        if (this.addChart) {
            this.addChart();
        }
    }

    /**
     * @function Chart.prototype._updateChart
     * @description 更新图表
     * @private
     * @param {Object} options - 图表参数
     */
    _updateChart(options) {
        if (this.echart) {
            this.echart.clear();
            this.echart.setOption(options);
        }
    }
}
