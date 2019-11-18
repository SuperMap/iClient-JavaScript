/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import { SuperMap } from "../../SuperMap";
import { FetchRequest } from "../../util/FetchRequest";
import { GetFeaturesBySQLParameters } from "../../iServer/GetFeaturesBySQLParameters";
import { FilterParameter } from "../../iServer/FilterParameter";
import { GetFeaturesBySQLService } from "../../iServer/GetFeaturesBySQLService";
import { QueryBySQLParameters } from "../../iServer/QueryBySQLParameters";
import { QueryBySQLService } from "../../iServer/QueryBySQLService";
import { DataFormat,QueryOption } from "../../REST";
import { Lang } from "../../lang/Lang";
import { FileReaderUtil } from "../util/FileReaderUtil";
import { Events } from "../../commontypes/Events";
/**
 * @class SuperMap.Components.ChartModel
 * @classdesc 图表组件数据模型
 * @private
 * @param {Object} datasets - 数据来源。
 * @category Components Chart
 * @fires SuperMap.Components.ChartModel#getdatafailed
 */

export class ChartModel {

    constructor(datasets) {
        this.datasets = datasets;
        this.EVENT_TYPES = ["getdatafailed"];
        this.events = new Events(this, null, this.EVENT_TYPES);
    }
    /**
     * @private
     * @function SuperMap.Components.ChartModel.prototype.getDatasetInfo
     * @description 获得数据集数据。
     * @param {string} datasetUrl - 数据集资源地址。
     */
    getDatasetInfo(success) {
        let datasetUrl = this.datasets.url;
        let me = this;
        FetchRequest.get(datasetUrl).then(function (response) {
            return response.json();
        }).then(function (results) {
            if (results.datasetInfo) {
                let datasetInfo = results.datasetInfo;
                me.datasetsInfo = {
                    dataSourceName: datasetInfo.dataSourceName,
                    datasetName: datasetInfo.name,
                    mapName: results.name
                };
                success({
                    result: me.datasetsInfo
                });
            }
        }).catch(function (error) {
            console.log(error);
            me._fireFailedEvent(error);
        });
    }

    /**
     * @private
     * @function SuperMap.Components.ChartModel.prototype.getDataFeatures
     * @description 请求数据集的数据信息
     * @param {Object} results - 数据集信息。
     * @param {function} success - 成功回调函数。
     */
    getDataFeatures(results, success) {
        let datasetsInfo = results.result;
        let getFeatureParam, getFeatureBySQLParams, getFeatureBySQLService;
        let params = {
            name: datasetsInfo.datasetName + "@" + datasetsInfo.dataSourceName
        }
        Object.assign(params, this.datasets.queryInfo);
        getFeatureParam = new SuperMap.FilterParameter(params);
        getFeatureBySQLParams = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: getFeatureParam,
            datasetNames: [datasetsInfo.dataSourceName + ":" + datasetsInfo.datasetName],
            fromIndex: 0,
            toIndex: 100000
        });
        getFeatureBySQLService = new SuperMap.GetFeaturesBySQLService(datasetsInfo.dataUrl, {
            eventListeners: {
                "processCompleted": success,
                "processFailed": function () {}
            }
        });
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    }

    /**
     * @private
     * @function SuperMap.Components.ChartModel.prototype.getLayerFeatures
     * @description 请求图层要素的数据信息
     * @param {Object} results - 数据集信息。
     * @param {Callbacks} success - 成功回调函数。
     */
    getLayerFeatures(results, success) {
        let datasetsInfo = results.result;
        let queryParam, queryBySQLParams, queryBySQLService;
        let params = {
            name: datasetsInfo.mapName
        };
        Object.assign(params, this.datasets.queryInfo);
        queryParam = new SuperMap.FilterParameter(params);
        queryBySQLParams = new SuperMap.QueryBySQLParameters({
            queryParams: [queryParam],
            expectCount: 100000
        });
        queryBySQLService = new SuperMap.QueryBySQLService(datasetsInfo.dataUrl, {
            eventListeners: {
                "processCompleted": success,
                "processFailed": function () {}
            }
        });
        queryBySQLService.processAsync(queryBySQLParams);
    }

    /**
     * @private
     * @function SuperMap.Components.ChartModel.prototype.getDataInfoByIptl
     * @description 用dataId获取iportal的数据。
     * @param {Callbacks} success - getdatachart。
     * 
     */
    getDataInfoByIptl(success) {
        // success是chart的回调
        this.getServiceInfo(this.datasets.url, success);
    }

    /**
     * @private
     * @function SuperMap.Components.ChartModel.prototype.getServiceInfo
     * @description 用iportal获取dataItemServices。
     * @param {String} url 
     * @param {Callbacks} success - getdatachart。
     * */
    getServiceInfo(url, success) {
        let me = this;
        FetchRequest.get(url, null, {
            withCredentials: this.datasets.withCredentials
        }).then(response => {
            return response.json()
        }).then(data => {
            if (data.succeed === false) {
                //请求失败
                me._fireFailedEvent(data);
                return;
            }
            // 是否有rest服务
            if (data.dataItemServices && data.dataItemServices.length > 0) {
                let dataItemServices = data.dataItemServices,
                    resultData;

                dataItemServices.forEach(item => {
                    // 如果有restdata并且发布成功，就请求restdata服务
                    // 如果有restmap并且发布成功，就请求restmap服务
                    // 其他情况就请求iportal/content.json
                    if (item.serviceType === 'RESTDATA' && item.serviceStatus === 'PUBLISHED') {
                        resultData = item;
                    } else if (item.serviceType === 'RESTMAP' && item.serviceStatus === 'PUBLISHED') {
                        resultData = item;
                    } else {
                        me.getDatafromContent(url, success);
                        return;
                    }
                })
                // 如果有服务，获取数据源和数据集, 然后请求rest服务
                resultData && me.getDatafromRest(resultData.serviceType, resultData.address, success)
            } else {
                me.getDatafromContent(url, success);
                return;
            }
        }).catch(error => {
            console.log(error);
            me._fireFailedEvent(error);
        })
    }
    /**
     * @private
     * @function SuperMap.Components.ChartModel.prototype.getDatafromURL
     * @description 用iportal获取数据。（通过固定的url来请求，但是不能请求工作空间的数据）
     * @param {String} url 
     * @param {Callbacks} success - getdatachart。
     */
    getDatafromContent(url, success) {
        // 成功回调传入的results
        let results = {
                result: {}
            },
            me = this;
        url += '/content.json?pageSize=9999999&currentPage=1',
            // 获取图层数据
            FetchRequest.get(url, null, {
                withCredentials: this.datasets.withCredentials
            }).then(response => {
                return response.json()
            }).then(data => {
                if (data.succeed === false) {
                    //请求失败
                    me._fireFailedEvent(data);
                    return;
                }
                if (data.type) {
                    if (data.type === "JSON" || data.type === "GEOJSON") {
                        // 将字符串转换成json
                        data.content = JSON.parse(data.content.trim());
                        // 如果是json文件 data.content = {type:'fco', features},格式不固定
                        if (!(data.content.features)) {
                            //json格式解析失败
                            console.log(Lang.i18n('msg_jsonResolveFiled'));
                            return;
                        }
                        let features = this._formatGeoJSON(data.content);
                        results.result.features = {
                            type: data.content.type,
                            features
                        };

                    } else if (data.type === 'EXCEL' || data.type === 'CSV') {
                        let features = this._excelData2Feature(data.content);
                        results.result.features = {
                            type: 'FeatureCollection',
                            features
                        };
                    }
                    success(results, 'content');
                }
            }, this).catch(error => {
                console.log(error);
                me._fireFailedEvent(error);
            });
    }

    /**
     * @private
     * @function SuperMap.Components.ChartModel.prototype._getDataSource
     * @description 获取数据源名和数据集名。
     * @param {string} serviceType 服务类型
     * @param {string} address 地址
     * @param {Callbacks} success - getdatachart。
     * @return{array} [数据源名:数据集名]
     * @return{string} 图层名
     */
    getDatafromRest(serviceType, address, success) {
        let me = this,
            withCredentials = this.datasets.withCredentials;
        if (serviceType === 'RESTDATA') {
            let url = `${address}/data/datasources`,
                sourceName, datasetName;
            // 请求获取数据源名
            FetchRequest.get(url, null, {
                withCredentials
            }).then(response => {
                return response.json()
            }).then(data => {
                sourceName = data.datasourceNames[0];
                url = `${address}/data/datasources/${sourceName}/datasets`;
                // 请求获取数据集名
                FetchRequest.get(url, null, {
                    withCredentials
                }).then(response => {
                    return response.json()
                }).then(data => {
                    datasetName = data.datasetNames[0];
                    // 请求restdata服务
                    me.getDatafromRestData(`${address}/data`, [sourceName + ':' + datasetName], success);
                    return [sourceName + ':' + datasetName]
                }).catch(function (error) {
                    me._fireFailedEvent(error);
                })
            }).catch(function (error) {
                me._fireFailedEvent(error);
            });
        } else {
            // 如果是地图服务
            let url = `${address}/maps`,
                mapName, layerName, path;
            // 请求获取地图名
            FetchRequest.get(url, null, {
                withCredentials
            }).then(response => {
                return response.json()
            }).then(data => {
                mapName = data[0].name;
                path = data[0].path;
                url = url = `${address}/maps/${mapName}/layers`;
                // 请求获取图层名
                FetchRequest.get(url, null, {
                    withCredentials
                }).then(response => {
                    return response.json()
                }).then(data => {
                    layerName = data[0].subLayers.layers[0].caption;
                    // 请求restmap服务
                    me.getDatafromRestMap(layerName, path, success)
                    return layerName;
                }).catch(function (error) {
                    me._fireFailedEvent(error);
                })
            }).catch(function (error) {
                me._fireFailedEvent(error);
            });

        }
    }

    /**
     * @private
     * @function SuperMap.Components.ChartModel.prototype.getDatafromRestData
     * @description 请求restdata服务
     * @param {String} url
     * @param {Array<string>} dataSource [数据源名:数据集名]
     * @param {Callbacks} success - getdatachart。
     */
    getDatafromRestData(url, dataSource, success) {
        let me = this;
        this.datasets.queryInfo.attributeFilter = this.datasets.queryInfo.attributeFilter || 'SmID>0';
        this._getFeatureBySQL(url, dataSource, this.datasets.queryInfo, (results) => {
            // 此时的features已经处理成geojson了
            success(results, 'RESTDATA');
        }, (error) => {
            console.log(error);
            me._fireFailedEvent(error);
        });
    }

    /**
     * @private
     * @function SuperMap.Components.ChartModel.prototype.getDatafromRestMap
     * @description 请求restmap服务
     * @param {String} dataSource layerName
     * @param {String} path - map服务地址。
     * @param {Callbacks} success - getdatachart。
     */
    getDatafromRestMap(dataSource, path, success) {
        let me = this;
        this.datasets.queryInfo.attributeFilter = this.datasets.queryInfo.attributeFilter || 'smid=1';
        this._queryFeatureBySQL(path, dataSource, this.datasets.queryInfo, null, null, (results) => {
            // let features = result.result.recordsets[0].features;
            success(results, 'RESTMAP');
        }, (error) => {
            console.log(error);
            me._fireFailedEvent(error);
        })
    }

    /**
     * @private
     * @function SuperMap.Components.ChartModel.prototype._getFeatureBySQL
     * @description 通过 sql 方式查询数据。
     */
    _getFeatureBySQL(url, datasetNames, queryInfo, processCompleted, processFaild) {
        let getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
        let params = {
            name: datasetNames.join().replace(":", "@")
        }
        Object.assign(params, queryInfo);
        getFeatureParam = new FilterParameter(params);
        getFeatureBySQLParams = new GetFeaturesBySQLParameters({
            queryParameter: getFeatureParam,
            datasetNames: datasetNames,
            fromIndex: 0,
            toIndex: 100000,
            returnContent: true
        });
        let options = {
            eventListeners: {
                processCompleted: getFeaturesEventArgs => {
                    processCompleted && processCompleted(getFeaturesEventArgs);
                },
                processFailed: e => {
                    processFaild && processFaild(e);
                }
            }
        };
        getFeatureBySQLService = new GetFeaturesBySQLService(url, options);
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    }

    /**
     * @private
     * @function SuperMap.Components.ChartModel.prototype._queryFeatureBySQL
     * @description 通过 sql 方式查询数据。
     */
    _queryFeatureBySQL(url, layerName, queryInfo, fields, epsgCode, processCompleted, processFaild, startRecord, recordLength, onlyAttribute) {
        var queryParam, queryBySQLParams;
        var filterParams = {
            name: layerName
        }
        Object.assign(filterParams, queryInfo);
        queryParam = new FilterParameter(filterParams);
        if (fields) {
            queryParam.fields = fields;
        }
        var params = {
            queryParams: [queryParam]
        };
        if (onlyAttribute) {
            params.queryOption = QueryOption.ATTRIBUTE;
        }
        startRecord && (params.startRecord = startRecord);
        recordLength && (params.expectCount = recordLength);
        if (epsgCode) {
            params.prjCoordSys = {
                epsgCode: epsgCode
            }
        }
        queryBySQLParams = new QueryBySQLParameters(params);
        this._queryBySQL(url, queryBySQLParams, data => {
            data.type === 'processCompleted' ? processCompleted(data) : processFaild(data)
        });
    }
    /**
     * @function SuperMap.Components.ChartModel.prototype._queryBySQL
     * @description  SQL 查询服务。
     * @param {SuperMap.QueryBySQLParameters} params - SQL 查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回结果类型。
     */
    _queryBySQL(url, params, callback, resultFormat) {
        var me = this;
        var queryBySQLService = new QueryBySQLService(url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        queryBySQLService.processAsync(params);
    }
    /**
     * @function SuperMap.Components.ChartModel.prototype._processFormat
     * @description 将数据转换成geojson。
     * @param {object} resultFormat - 返回结果集。
     * @return {object} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回结果类型。
     */
    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }

    /**
     * @private
     * @function SuperMap.Components.ChartModel.prototype._formatGeoJSON
     * @description 格式 GeoJSON。
     * @param {GeoJSON} data - GeoJSON 数据。
     */
    _formatGeoJSON(data) {
        let features = data.features;
        features.forEach((row, index) => {
            row.properties['index'] = index;
        })
        return features;
    }

    /**
     * @private
     * @description 将 csv 和 xls 文件内容转换成 geojson
     * @function SuperMap.Components.ChartModel.prototype._excelData2Feature
     * @param content  文件内容
     * @param layerInfo  图层信息
     * @returns {Array}  feature的数组集合
     */
    _excelData2Feature(dataContent) {
        let fieldCaptions = dataContent.colTitles;
        //位置属性处理
        let xfieldIndex = -1,
            yfieldIndex = -1;
        for (let i = 0, len = fieldCaptions.length; i < len; i++) {
            if (FileReaderUtil.isXField(fieldCaptions[i])) {
                xfieldIndex = i;
            }
            if (FileReaderUtil.isYField(fieldCaptions[i])) {
                yfieldIndex = i;
            }
        }

        // feature 构建后期支持坐标系 4326/3857
        let features = [];

        for (let i = 0, len = dataContent.rows.length; i < len; i++) {
            let row = dataContent.rows[i];

            let x = Number(row[xfieldIndex]),
                y = Number(row[yfieldIndex]);
            //属性信息
            let attributes = {};
            for (let index in dataContent.colTitles) {
                let key = dataContent.colTitles[index];
                attributes[key] = dataContent.rows[i][index];
            }
            attributes['index'] = i + '';
            //目前csv 只支持处理点，所以先生成点类型的 geojson
            let feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [x, y]
                },
                "properties": attributes
            };
            features.push(feature);
        }
        return features;
    }
    /**
     * @private
     * @description 请求数据失败的事件
     * @function SuperMap.Components.ChartModel.prototype._fireFailedEvent
     * @param {object} error  错误信息
     */
    _fireFailedEvent(error) {
        let errorData = error ? {
            error,
            message: Lang.i18n('msg_getdatafailed')
        } : {
            message: Lang.i18n('msg_getdatafailed')
        };
        /**
         * @event SuperMap.Components.Chart#getdatafailed
         * @description 监听到获取数据失败事件后触发
         * @property {Object} error  - 事件对象。
         */
        this.events.triggerEvent("getdatafailed", errorData);
    }
}