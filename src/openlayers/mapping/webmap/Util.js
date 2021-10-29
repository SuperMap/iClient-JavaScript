import { QueryOption } from '@supermap/iclient-common/REST';
import { GetFeaturesBySQLParameters } from '@supermap/iclient-common/iServer/GetFeaturesBySQLParameters';
import { QueryBySQLParameters } from '@supermap/iclient-common/iServer/QueryBySQLParameters';
import { FilterParameter } from '@supermap/iclient-common/iServer/FilterParameter';
import { QueryService } from '../../services/QueryService';
import { FeatureService } from '../../services/FeatureService';

export function getFeatureProperties(features) {
  let properties = [];
  if (isArray(features) && features.length) {
    features.forEach((feature) => {
      let property = feature.get('attributes');
      property && properties.push(property);
    });
  }
  return properties;
}

export function getFeatureBySQL(url, datasetNames, serviceOptions, processCompleted, processFaild, targetEpsgCode) {
  getFeatureBySQLWithConcurrent(url, datasetNames, processCompleted, processFaild, serviceOptions, targetEpsgCode);
}
export function queryFeatureBySQL(
  url,
  layerName,
  attributeFilter,
  fields,
  epsgCode,
  processCompleted,
  processFaild,
  startRecord,
  recordLength,
  onlyAttribute
) {
  const queryParam = new FilterParameter({
    name: layerName,
    attributeFilter: attributeFilter
  });
  if (fields) {
    queryParam.fields = fields;
  }
  const params = {
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
    };
  }
  const queryBySQLParams = new QueryBySQLParameters(params);
  const queryBySQLService = new QueryService(url);
  queryBySQLService.queryBySQL(queryBySQLParams, function (data) {
    data.type === 'processCompleted' ? processCompleted(data) : processFaild(data);
  });
}

export function getFeatureBySQLWithConcurrent(
  url,
  datasetNames,
  processCompleted,
  processFailed,
  serviceOptions,
  targetEpsgCode
) {
  let queryParameter = new FilterParameter({
    name: datasetNames.join().replace(':', '@')
  });

  let maxFeatures = 100, // 每次请求数据量
    firstResult, // 存储每次请求的结果
    allRequest = []; // 存储发出的请求Promise

  // 发送请求获取获取总数据量
  _getReasult(url, queryParameter, datasetNames, 0, 1, 1, serviceOptions, targetEpsgCode)
    .then((result) => {
      firstResult = result;
      let totalCount = result.result.totalCount;

      if (totalCount > 1) {
        // 开始并发请求
        for (let i = 1; i < totalCount; ) {
          allRequest.push(
            _getReasult(
              url,
              queryParameter,
              datasetNames,
              i,
              i + maxFeatures,
              maxFeatures,
              serviceOptions,
              targetEpsgCode
            )
          );
          i += maxFeatures;
        }
        // 所有请求结束
        Promise.all(allRequest)
          .then((results) => {
            // 结果合并
            results.forEach((result) => {
              if (result.type === 'processCompleted' && result.result.features && result.result.features.features) {
                result.result.features.features.forEach((feature) => {
                  firstResult.result.features.features.push(feature);
                });
              } else {
                // todo 提示 部分数据请求失败
                firstResult.someRequestFailed = true;
              }
            });
            processCompleted(firstResult);
          })
          .catch((error) => {
            processFailed(error);
          });
      } else {
        processCompleted(result);
      }
    })
    .catch((error) => {
      processFailed(error);
    });
}

export function _getFeaturesBySQLParameters(
  queryParameter,
  datasetNames,
  fromIndex,
  toIndex,
  maxFeatures,
  targetEpsgCode
) {
  return new GetFeaturesBySQLParameters({
    queryParameter,
    datasetNames,
    fromIndex,
    toIndex,
    maxFeatures,
    returnContent: true,
    targetEpsgCode
  });
}

export function _getReasult(
  url,
  queryParameter,
  datasetNames,
  fromIndex,
  toIndex,
  maxFeatures,
  serviceOptions,
  targetEpsgCode
) {
  return new Promise((resolve, reject) => {
    new FeatureService(url, serviceOptions).getFeaturesBySQL(
      _getFeaturesBySQLParameters(queryParameter, datasetNames, fromIndex, toIndex, maxFeatures, targetEpsgCode),
      (result) => {
        let featuresResult = result.result;
        //[bug] wt任务编号: 5223
        if (result.type === 'processCompleted' && featuresResult && featuresResult.features) {
          resolve(result);
        } else {
          reject(result);
        }
      }
    );
  });
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
