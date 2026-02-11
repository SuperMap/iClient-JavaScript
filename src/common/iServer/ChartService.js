/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import { Util as CommonUtil} from '../commontypes/Util';
 import { DataFormat } from '../REST';
 import { ChartQueryService } from './ChartQueryService';
 import { ChartFeatureInfoSpecsService } from './ChartFeatureInfoSpecsService';
 import { ChartAcronymClassifyService } from './ChartAcronymClassifyService';
 import { LayerInfoService } from './LayerInfoService';
 import { GetGridCellInfosService } from './GetGridCellInfosService';
 import { FeatureService } from './FeatureService';
 import { GetFeaturesBySQLParameters } from './GetFeaturesBySQLParameters';
 import { GetGridCellInfosParameters } from './GetGridCellInfosParameters';
 import { GetFeaturesByBufferParameters } from './GetFeaturesByBufferParameters';
 import { distance } from "@turf/distance";
 import { Point } from '../commontypes/geometry/Point';
 
 /**
  * @class ChartService
  * @category  iServer Map Chart
  * @classdesc 海图服务类。海图是一种以海洋水域及沿岸地物为主要绘制对象的地图，为航海的安全性提供必备的数据基础。<br>
  * 此类提供方法：获取海图物标信息、查询海图服务。海图物标信息指的是描述各产品规范的物标的基本信息，包括物标的名称、类型及与该物标相关的属性等。
  * @extends {ServiceBase}
  * @example
  * new ChartService(url,{
  *    fieldNameFormatter: function(fieldName){
  *      return fieldName + 'test'
  *    }
  * }).queryChart(param,function(result){
  *     //doSomething
  * })
  * @param {string} url - 服务地址。
  * @param {Object} options - 参数。
  * @param {string} [options.proxy] - 服务代理地址。
  * @param {boolean} [options.withCredentials] - 请求是否携带凭据。默认情况下，仅同源请求包含凭据。
  * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
  * @param {Object} [options.headers] - 请求头。
  * @param {function} [options.fieldNameFormatter] - 对查询返回结果的字段名进行自定义。
  * @param {function} [options.parseProperties] - 是否对查询返回的要素属性进行反序列化。
  * @usage
  */
 export class ChartService {
 
     constructor(url, dataUrl, options) {
      this.url = url;
      if (typeof dataUrl === 'object') {
        this.options = dataUrl || {};
      } else {
        this.dataUrl = dataUrl;
        this.options = options || {};
      }
     }
 
     /**
      * @function ChartService.prototype.queryChart
      * @description 查询海图服务。
      * @param {ChartQueryParameters} params - 海图查询所需参数类。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} resultFormat - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     queryChart(params, callback, resultFormat) {
         var me = this,
             param = params,
             format = me._processFormat(resultFormat);
         var chartQueryService = new ChartQueryService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format,
             fieldNameFormatter: me.options.fieldNameFormatter,
             parseProperties: me.options.parseProperties
         });
 
         return chartQueryService.processAsync(param, callback);
     }
 
     /**
      * @function ChartService.prototype.getChartFeatureInfo
      * @description 获取海图物标信息服务。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @returns {Promise} Promise 对象。
      */
     getChartFeatureInfo(callback) {
         var me = this;
         var url = CommonUtil.urlPathAppend(me.url, 'chartFeatureInfoSpecs');
         var chartFeatureInfoSpecsService = new ChartFeatureInfoSpecsService(url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers
         });
         return chartFeatureInfoSpecsService.processAsync(callback);
     }

     /**
      * @function ChartService.prototype.getChartAcronymClassify
      * @version 11.2.0
      * @description 获取海图产品规范物标分组信息服务。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @returns {Promise} Promise 对象。
      */
     getChartAcronymClassify(callback) {
         var me = this;
         var chartAcronymClassifyService = new ChartAcronymClassifyService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers
         });
         return chartAcronymClassifyService.processAsync(callback);
     }

      /**
      * @function ChartService.prototype.getChartWaterDepth
      * @version 12.1.0
      * @description 获取海图水深信息。
      * @param {ChartWaterDepthParameter} params - 海图水深查询所需参数类。
      * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @returns {Promise} Promise 对象。
      */
      getChartWaterDepth(params, callback) {
        var me = this;
        if (typeof me.dataUrl !== 'string') {
          console.error('dataUrl is required');
          return null;
        }
        var { dataSource, X, Y } = params;
        var queryPromises = [];
        return new LayerInfoService(me.url).getLayersInfo().then(function (serviceResult) {
          var datasetNames = [];
          serviceResult.result.subLayers.layers.forEach(function (layer) {
            if (layer.datasetInfo && layer.datasetInfo.type === 'GRID') {
              datasetNames.push(layer.datasetInfo.name)
            }
          });
          datasetNames.forEach(function (datasetName) {
            // 栅格查询
            var getGridCellInfosParam = new GetGridCellInfosParameters({
              dataSourceName: dataSource,
              datasetName: datasetName,
              X: X,
              Y: Y
            });
            var gridCellInfosService = new GetGridCellInfosService(me.dataUrl, {
              proxy: me.options.proxy,
              withCredentials: me.options.withCredentials,
              crossOrigin: me.options.crossOrigin,
              headers: me.options.headers
            });
            var query = gridCellInfosService.processAsync(getGridCellInfosParam, callback);
            queryPromises.push(query);
           
          });
          return Promise.all(queryPromises).then(function (res) {
            var datasetMap = {};
            var topDatasetQuery = null;
            // 找到所有成功的查询
            res.forEach(function (queryRes) {
              if (queryRes.result) {
                var datasetName = queryRes.options.scope.datasetName;
                datasetMap[datasetName] = queryRes;
              }
            });
            // 如果某一处有多个图层，从datasetNames找到第一个，代表最顶层的
            for (var j = 0; j < datasetNames.length; j++) {
              if (datasetMap.hasOwnProperty(datasetNames[j])) {
                var topDataset = datasetNames[j];
                topDatasetQuery = datasetMap[topDataset]
                break;
              }
            }
            return topDatasetQuery;
          }).catch(function (err) {
            throw err;
          });
        })
      }
    
      /**
       * @function ChartService.prototype.getWaterLevel
       * @version 12.1.0
       * @description 获取S104海图水位和时间信息。
       * @param {ChartWaterLevelParameter} params - S104海图水位和时间查询所需参数类。
       * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
       * @returns {Promise} Promise 对象。
       */
      getWaterLevel(params, callback) {
        var me = this;
        if (typeof me.dataUrl !== 'string') {
          console.error('dataUrl is required');
          return null;
        }
        var featureService = new FeatureService(me.dataUrl, {
          proxy: me.options.proxy,
          withCredentials: me.options.withCredentials,
          crossOrigin: me.options.crossOrigin,
          headers: me.options.headers
        });
        var { dataSource, dataset, waterLevelDataset, timeDataset, coordinates, currentTime, startTime, endTime, timeIdKey } = params;
        // 查询最近的水位点
        var datasetNames = [dataSource + ':' + dataset];
        return this.findNearestPointNew(coordinates, datasetNames).then(function (closestFeature) {
          if (!closestFeature) {
            return null;
          }
          var stationId = closestFeature.properties.STATIONID;
          var cellId = closestFeature.properties.CELLID;
          // 查询水位
          var waterLevelSqlParam = new GetFeaturesBySQLParameters({
            ...params,
            queryParameter: {
              name: waterLevelDataset + '@' + dataSource,
              attributeFilter: `STATIONID = '${stationId}'  and CELLID = '${cellId}'`
            },
            datasetNames: [dataSource + ':' + waterLevelDataset]
          });
          return featureService.getFeaturesBySQL(waterLevelSqlParam, callback).then(function (waterLevelResult) {
            var features = waterLevelResult.result.features.features;
            // 查询时间
            var timeSqlParam = new GetFeaturesBySQLParameters({
              ...params,
              queryParameter: {
                name: timeDataset + '@' + dataSource,
                attributeFilter: `CELLID = '${cellId}'`
              },
              datasetNames: [dataSource + ':' + timeDataset]
            });
            return featureService.getFeaturesBySQL(timeSqlParam, callback).then(function (timeResult) {
              var features1 = timeResult.result.features.features;
              var timeIDMap = {};
              features1.forEach(function (feature) {
                timeIDMap[feature.properties[timeIdKey]] = feature.properties.TIMEPOINT;
              });
      
              features.forEach(function (feature) { 
                var timeID = feature.properties[timeIdKey];
                if (timeIDMap[timeID]) {
                  feature.properties.TIMEPOINT = timeIDMap[timeID];
                } else {
                  console.error(`timeID ${timeID} , TIMEPOINT not found'`);
                  feature.properties.TIMEPOINT = null;
                }
              });
              // 过滤时间范围,也可考虑用attributeFilter过滤
              if (currentTime || startTime || endTime) {
                features = features.filter(feature => {
                  const timepoint = feature.properties.TIMEPOINT;
                  if (currentTime) {
                    return timepoint === currentTime;
                  }
                  const afterStart = !startTime || timepoint >= startTime;
                  const beforeEnd = !endTime || timepoint <= endTime;
                  return afterStart && beforeEnd;
                });
              }
              return { features, stationFeature: closestFeature };
            });
          });
        });
      }

      /**
       * @function ChartService.prototype.getWLTimeRange
       * @version 12.1.0
       * @description 获取S104海图时间范围。
       * @param {ChartWLTimeRangeParameter} params - S104海图时间范围查询所需参数类。
       * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
       * @returns {Promise} Promise 对象。
       */
      getWLTimeRange(params, callback) {
        var me = this;
        if (typeof me.dataUrl !== 'string') {
          console.error('dataUrl is required');
          return null;
        }
        var featureService = new FeatureService(me.dataUrl, {
          proxy: me.options.proxy,
          withCredentials: me.options.withCredentials,
          crossOrigin: me.options.crossOrigin,
          headers: me.options.headers
        });
        var { dataset, dataSource, timeDataset, idKey } = params;
        var sqlParam = new GetFeaturesBySQLParameters({
          queryParameter: {
            name: dataset + '@' + dataSource
          },
          datasetNames: [dataSource + ':' + dataset],
          returnFeaturesOnly: true,
          fromIndex: 0,
          toIndex: 1,
          expectCount: -1
        });
        return featureService.getFeaturesBySQL(sqlParam).then(function (serviceResult) {
          var idKeyVal = serviceResult.result.features.features[0].properties[idKey];
          var attributeFilter = idKey + " = " + "'" + idKeyVal + "'";
          var timeSqlParam = new GetFeaturesBySQLParameters({
            queryParameter: {
              name: timeDataset + '@' + dataSource,
              attributeFilter: attributeFilter,
              orderBy: "TIMEPOINT"
            },
            datasetNames: [dataSource + ':' + timeDataset],
            toIndex: -1,
            expectCount: -1
            
          });
          return featureService.getFeaturesBySQL(timeSqlParam, callback).then(function (serviceResult1) {
            return serviceResult1;
          })
        }).catch(function (err) {
          throw err;
        });
      }

      async findNearestPointNew(coordinates, datasetNames) {
        const [x, y] = coordinates
        if (x < -180.0 || x > 180.0 || y < -90 || y > 90){
          return
        }
        const point = new Point([x, y])
        const bufferParam = new GetFeaturesByBufferParameters({
          datasetNames: datasetNames,
          bufferDistance: 0.03,
          geometry: point
        })
        const serviceResult = await new FeatureService(this.dataUrl).getFeaturesByBuffer(bufferParam)
        if (serviceResult.result.features.features.length > 0) {
          // 变量用于保存最近的点
          let closestFeature = null
          let minDistance = Infinity // 初始设置为最大距离
          // 遍历所有的点数据，找出距离最近的点
          serviceResult.result.features.features.forEach((pointData) => {
            const dis = distance(coordinates, pointData.geometry.coordinates)
            // 更新最近点
            if (dis < minDistance) {
              minDistance = dis
              closestFeature = pointData
            }
          })
          return closestFeature
        } 
      }

      _processFormat(resultFormat) {
          return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
      }
 }
 