import {
  ElasticSearch,
  SecurityManager,
  VectorClipJobsParameter,
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
  SuperMap,
  Util
} from './index';

SuperMap.ElasticSearch = ElasticSearch;
SuperMap.SecurityManager = SecurityManager;
SuperMap.VectorClipJobsParameter = VectorClipJobsParameter;
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
SuperMap.Util = {...SuperMap.Util, ...Util};
export * from './index';
