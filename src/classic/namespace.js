/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import { en } from './libs/Lang/en';
import { zh } from './libs/Lang/zh-CN';
import { MapVLayer } from './overlay';
import { AddressMatchService, DatasetService, DatasourceService, ProcessingService } from './services';

if (window && window.SuperMap) {
  var SuperMap = (window.SuperMap = window.SuperMap || {});
  SuperMap.REST = SuperMap.REST || {};
  SuperMap.Lang.en = en;
  SuperMap.Lang['zh-CN'] = zh;
  SuperMap.Layer.MapVLayer = MapVLayer;
  SuperMap.REST.AddressMatchService = AddressMatchService;
  SuperMap.REST.DatasetService = DatasetService;
  SuperMap.REST.DatasourceService = DatasourceService;
  SuperMap.REST.ProcessingService = ProcessingService;
}

export { ElasticSearch } from '@supermap/iclient-common/thirdparty/elasticsearch/ElasticSearch';
export { SecurityManager } from '@supermap/iclient-common/security/SecurityManager';
export { KernelDensityJobParameter } from '@supermap/iclient-common/iServer/KernelDensityJobParameter';
export { SingleObjectQueryJobsParameter } from '@supermap/iclient-common/iServer/SingleObjectQueryJobsParameter';
export { SummaryAttributesJobsParameter } from '@supermap/iclient-common/iServer/SummaryAttributesJobsParameter';
export { SummaryMeshJobParameter } from '@supermap/iclient-common/iServer/SummaryMeshJobParameter';
export { SummaryRegionJobParameter } from '@supermap/iclient-common/iServer/SummaryRegionJobParameter';
export { OverlayGeoJobParameter } from '@supermap/iclient-common/iServer/OverlayGeoJobParameter';
export { BuffersAnalystJobsParameter } from '@supermap/iclient-common/iServer/BuffersAnalystJobsParameter';
export { TopologyValidatorJobsParameter } from '@supermap/iclient-common/iServer/TopologyValidatorJobsParameter';
export { OutputSetting } from '@supermap/iclient-common/iServer/OutputSetting';
export { MappingParameters } from '@supermap/iclient-common/iServer/MappingParameters';
export { GeoCodingParameter } from '@supermap/iclient-common/iServer/GeoCodingParameter';
export { GeoDecodingParameter } from '@supermap/iclient-common/iServer/GeoDecodingParameter';
export * from './overlay';
export * from './services';
export { SuperMap };
/**
 *@namespace SuperMap
 *@category BaseTypes Namespace
 */
