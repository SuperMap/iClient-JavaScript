import {
  ElasticSearch,
  SecurityManager,
  KernelDensityJobParameter,
  SingleObjectQueryJobsParameter,
  SummaryAttributesJobsParameter,
  SummaryMeshJobParameter,
  SummaryRegionJobParameter,
  OverlayGeoJobParameter,
  BuffersAnalystJobsParameter,
  TopologyValidatorJobsParameter,
  OutputSetting,
  MappingParameters,
  GeoCodingParameter,
  GeoDecodingParameter,
  SuperMap
} from './index';

SuperMap.ElasticSearch = ElasticSearch;
SuperMap.SecurityManager = SecurityManager;
SuperMap.KernelDensityJobParameter = KernelDensityJobParameter;
SuperMap.SingleObjectQueryJobsParameter = SingleObjectQueryJobsParameter;
SuperMap.SummaryAttributesJobsParameter = SummaryAttributesJobsParameter;
SuperMap.SummaryMeshJobParameter = SummaryMeshJobParameter;
SuperMap.SummaryRegionJobParameter = SummaryRegionJobParameter;
SuperMap.OverlayGeoJobParameter = OverlayGeoJobParameter;
SuperMap.BuffersAnalystJobsParameter = BuffersAnalystJobsParameter;
SuperMap.TopologyValidatorJobsParameter = TopologyValidatorJobsParameter;
SuperMap.OutputSetting = OutputSetting;
SuperMap.MappingParameters = MappingParameters;
SuperMap.GeoCodingParameter = GeoCodingParameter;
SuperMap.GeoDecodingParameter = GeoDecodingParameter;

export * from './index';
