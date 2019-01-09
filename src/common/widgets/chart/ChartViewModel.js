/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../../SuperMap';
import { ChartModel } from "./ChartModel";

/**
 * @class SuperMap.Widgets.ChartViewModel
 * @classdesc 图表微件功能类
 * @category Widgets Chart
 * @version 10.X.X
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
 */

export class ChartViewModel {

    constructor(options) {
        this.datasets = options.datasets;
        this.xField = [];
        this.yField = [];
        this.grid = {
            top: "50px",
            bottom: "50px",
            left: "50px",
            right: "60px"
        };
        this.chartType = options.type || "bar";
        this._initXYField(options.chartOptions);
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._initXYField
     * @description 初始化XY字段。
     * @private
     * @param {Object} chartOptions - options里的图表参数
     */
    _initXYField(chartOptions) {
        let me = this;
        if (chartOptions && chartOptions.length > 0) {
            chartOptions.forEach(function (option) {
                if (option.xAxis) {
                    me.xField.push({
                        field: option.xAxis.field,
                        name: option.xAxis.name
                    });
                }
                if (option.yAxis) {
                    me.yField.push({
                        field: option.yAxis.field,
                        name: option.yAxis.name
                    });
                }
            });
        }
    }
    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype.getDatasetInfo
     * @description 获得数据集数据。
     * @param {function} success - 成功回调函数
     */
    getDatasetInfo(success) {
        this.createChart = success;
        if (this.datasets && this._checkUrl(this.datasets.url)) {
            this.chartModel = new ChartModel(this.datasets);
            this.chartModel.getDatasetInfo(this._getDatasetInfoSuccess.bind(this));
        }
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._getDatasetInfoSuccess
     * @description 成功回调函数。
     * @private
     * @param {Object} results - 数据集信息
     */
    _getDatasetInfoSuccess(results) {
        let datasetUrl = this.datasets.url;
        //判断服务为地图服务 或者 数据服务
        let restIndex = datasetUrl.indexOf("rest");
        if (restIndex > 0) {
            let index = datasetUrl.indexOf("/", restIndex + 5);
            let type = datasetUrl.substring(restIndex + 5, index);
            let dataUrl = datasetUrl.substring(0, restIndex + 4) + "/data";

            if (type === "maps") {
                let mapIndex = datasetUrl.indexOf("/", index + 1);
                let mapName = datasetUrl.substring(index + 1, mapIndex);
                dataUrl = datasetUrl.substring(0, restIndex + 4) + "/maps/" + mapName;
                results.result.dataUrl = dataUrl;
                this._getLayerFeatures(results);
            } else if (type === "data") {
                results.result.dataUrl = dataUrl;
                this._getDataFeatures(results);
            }
        }
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._getDataFeatures
     * @description 请求数据集的数据信息
     * @private
     * @param {Object} results - 数据集信息
     */
    _getDataFeatures(results) {
        this.chartModel.getDataFeatures(results, this._getChartDatas.bind(this));
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._getLayerFeatures
     * @description 请求图层的数据信息
     * @private
     * @param {Object} results - 数据集信息
     */
    _getLayerFeatures(results) {
        this.chartModel.getLayerFeatures(results, this._getChartDatasFromLayer.bind(this));
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._getChartDatas
     * @description 将请求回来的数据转换为图表所需的数据格式
     * @private
     * @param {Object} results - 数据要素信息
     */
    _getChartDatas(results) {
        if (results.result.features) {
            this.features = results.result.features;
            let features = results.result.features.features;
            let data = {};
            if (features.length) {
                let feature = features[0];
                let attrFields = [],
                    itemTypes = [];
                for (let attr in feature.properties) {
                    attrFields.push(attr);
                    itemTypes.push(this._getDataType(feature.properties[attr]));
                }
                data = {
                    features: results.result.features,
                    fieldCaptions: attrFields,
                    fieldTypes: itemTypes,
                    fieldValues: []
                }
                for (let m in itemTypes) {
                    let fieldValue = [];

                    for (let j in features) {
                        let feature = features[j];
                        let caption = data.fieldCaptions[m];
                        let value = feature.properties[caption];
                        fieldValue.push(value);
                    }
                    data.fieldValues.push(fieldValue);
                }
                this.createChart(data);
            }
        }
    }
    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._getChartDatasFromLayer
     * @description 将请求回来的数据转换为图表所需的数据格式
     * @private
     * @param {Object} results - 图层数据要素信息
     */
    _getChartDatasFromLayer(results) {
        if (results.result.recordsets) {
            let recordsets = results.result.recordsets[0];
            let features = recordsets.features.features;
            this.features = recordsets.features;
            let data = {};
            if (features.length) {
                data = {
                    features: recordsets.features,
                    fieldCaptions: recordsets.fieldCaptions,
                    fieldTypes: recordsets.fieldTypes,
                    fieldValues: []
                }
                for (let m in data.fieldCaptions) {
                    let fieldValue = [];

                    for (let j in features) {
                        let feature = features[j];
                        let caption = data.fieldCaptions[m];
                        let value = feature.properties[caption];
                        fieldValue.push(value);
                    }
                    data.fieldValues.push(fieldValue);
                }
                this.createChart(data);
            }
        }
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._createChartOptions
     * @description 创建图表所需参数
     * @private
     * @param {Object} data - 图表数据
     */
    _createChartOptions(data) {
        this.calculatedData = this._createChartDatas(data);
        return this.updateChartOptions(this.chartType);
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype.changeType
     * @description 改变图表类型
     * @param {string} type - 图表类型
     */
    changeType(type) {
        if (type !== this.chartType) {
            this.chartType = type;
            return this.updateChartOptions(this.chartType);
        }
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype.updateData
     * @description 改变图表类型
     * @param {string} url - 数据源地址
     * @param {Object} queryInfo - 查询条件
     * @param {Object} chartOption - X,Y字段信息
     * @param {function} success - 成功回调函数
     */
    updateData(url, queryInfo, chartOption, success) {
        this.updateChart = success;
        this.xField = [];
        this.yField = [];
        this._initXYField(chartOption);
        this.datasets = {
            url: url,
            queryInfo: queryInfo
        }
        this.getDatasetInfo(this._updateDataSuccess.bind(this));
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._updateDataSuccess
     * @description 改变图表类型
     * @private
     * @param {Object} data - 图表数据
     */
    _updateDataSuccess(data) {
        let options = this._createChartOptions(data);
        this.updateChart(options);
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype.updateChartOptions
     * @description 更新图表所需参数
     * @param {string} type - 图表类型
     * @param {Object} style - 图表样式
     */
    updateChartOptions(type, style) {
        if (this.calculatedData) {
            let grid = this.grid;
            let series = this._createChartSeries(this.calculatedData, type);
            let datas = [];
            for (let i in this.calculatedData.XData) {
                datas.push({
                    value: this.calculatedData.XData[i].fieldsData
                });
            }
            let xAxis = {
                type: "category",
                name: this.xField[0].name || "X",
                data: datas,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }
            }
            let yAxis = {
                type: "value",
                name: this.yFieldName || "Y",
                data: {},
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }
            }
            let tooltip = {
                formatter: '{b0}: {c0}'
            };
            let backgroundColor = '#404a59';
            if (style) {
                if (style.grid) {
                    grid = style.grid;
                }
                if (style.tooltip) {
                    tooltip = style.tooltip;
                }
                if (style.backgroundColor) {
                    backgroundColor = style.backgroundColor;
                }
            }
            return {
                backgroundColor: backgroundColor,
                grid: grid,
                series: series,
                xAxis: xAxis,
                yAxis: yAxis,
                tooltip: tooltip
            }
        }
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._createChartDatas
     * @description 构建图表数据
     * @private
     * @param {Object} data - 源数据
     */
    _createChartDatas(data) {
        let fieldIndex = 0, yfieldIndexs = [];
        let fieldCaptions = data.fieldCaptions;
        let me = this;
        //X
        fieldCaptions.forEach(function (field, index) {
            if (me.xField[0] && field === me.xField[0].field) {
                fieldIndex = index;
            }
        });
        //Y
        this.yFieldName = "";
        this.yField.forEach(function (value, index) {
            if (index !== 0) {
                me.yFieldName = me.yFieldName + ",";
            }
            me.yFieldName = me.yFieldName + value.name;
            fieldCaptions.forEach(function (field, index) {
                if (field === value.field) {
                    yfieldIndexs.push(index);
                }
            });
        })
        let datas = this._getAttrData(data, fieldIndex);
        let yDatas = [];
        if (yfieldIndexs.length > 0) {
            yfieldIndexs.forEach(function (yfieldIndex) {
                let yData = [];
                for (let i in data.fieldValues[yfieldIndex]) {
                    yData.push({
                        value: data.fieldValues[yfieldIndex][i]
                    });
                }
                yDatas.push(yData);
            });
        } else {                     //未指定Y字段时，y轴计数
            let YData = [],
                XData = [],
                len = datas.length;

            //计算X轴，Y轴数据，并去重
            for (let i = 0; i < len; i++) {
                let isSame = false;
                for (let j = 0, leng = XData.length; j < leng; j++) {
                    if (datas[i].fieldsData === XData[j].fieldsData) {
                        YData[j].value++;
                        XData[j].recordIndexs.push(i);
                        isSame = true;
                        break;
                    }
                }
                if (!isSame) {
                    if (datas[i].fieldsData) {
                        XData.push({ fieldsData: datas[i].fieldsData, recordIndexs: [i] });
                        YData.push({ value: 1 });
                    }
                }
            }
            datas = XData;
            yDatas = [YData];
        }
        return {
            XData: datas,
            YData: yDatas
        }
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._getAttrData
     * @description 选中字段数据
     * @private
     * @param {Object} datacontent - 图表数据
     * @param {number} index - 字段索引
     */
    _getAttrData(datacontent, index) {
        if (index === 0) {
            this.xField = [{
                field: datacontent.fieldCaptions[index],
                name: datacontent.fieldCaptions[index]
            }];
        }
        let fieldsDatas = [];
        for (let i = 0, len = datacontent.fieldValues[index].length; i < len; i++) {
            let value = datacontent.fieldValues[index][i];
            fieldsDatas.push({
                recordIndexs: i,
                fieldsData: value
            });
        }
        return fieldsDatas;
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._createChartSeries
     * @description 图表数据
     * @private
     * @param {Object} calculatedData - 图表数据
     * @param {string} chartType - 图表类型
     */
    _createChartSeries(calculatedData, chartType) {
        let series = [];
        let yDatas = calculatedData.YData;
        yDatas.forEach(function (yData) {
            let value = 0;
            let serieData = [];
            for (let data of yData) {
                value = data.value;
                serieData.push({
                    value: value
                });
            }
            let serie = {
                type: chartType,
                data: serieData,
                name: "y"
            };

            series.push(serie);
        });
        return series;
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._isDate
     * @description 判断是否为日期
     * @private
     * @param {string} data - 字符串
     */
    _isDate(data) {
        let reg = /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/ig;
        return reg.test(data);
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._isNumber
     * @description 判断是否为数值
     * @private
     * @param {string} data - 字符串
     */
    _isNumber(data) {
        let mdata = Number(data);
        if (mdata === 0) {
            return true;
        }
        return !isNaN(mdata);
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._getDataType
     * @description 判断数据的类型
     * @private
     * @param {string} data - 字符串
     */
    _getDataType(data) {
        if (data !== null && data !== undefined && data !== '') {
            if (this._isDate(data)) {
                return "DATE";
            }
            if (this._isNumber(data)) {
                return "NUMBER";
            }
        }
        return "STRING";
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._checkUrl
     * @description 检查url是否符合要求
     * @private
     * @param {string} url
     */
    _checkUrl(url) {
        let match;
        if (url === '' || !this._isMatchUrl(url)) {
            match = false;
        } else if (/^http[s]?:\/\/localhost/.test(url) || /^http[s]?:\/\/127.0.0.1/.test(url)) {
            //不是实际域名
            match = false;
        } else {
            match = true;
        }
        return match;
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype._isMatchUrl
     * @description 判断输入的地址是否符合地址格式
     * @private
     * @param {string} str - url
     */
    _isMatchUrl(str) {
        var reg = new RegExp('(https?|http|file|ftp)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]');
        return reg.test(str);
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype.getStyle
     * @description 获取图表样式。
     */
    getStyle() {
        let style = {
            grid: this.grid,
            tooltip: this.tooltip,
            backgroundColor: this.backgroundColor
        }
        return style;
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype.getFeatures
     * @description 获取地图服务，数据服务请求返回的数据。
     */
    getFeatures() {
        return this.features;
    }

    /**
     * @function SuperMap.Widgets.ChartViewModel.prototype.setStyle
     * @description 设置图表样式。
     * @param {Object} style - 图表样式
     */
    setStyle(style) {
        return this.updateChartOptions(this.chartType, style);
    }
}
SuperMap.Widgets.ChartViewModel = ChartViewModel;