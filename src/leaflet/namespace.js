/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {
  CommonUtil,
  SuperMap
} from '@supermap/iclient-common/namespace';

import { Logo, logo, ChangeTileVersion, changeTileVersion } from './control';

import {
  CommontypesConversion,
  BaiduCRS,
  TianDiTu_WGS84CRS,
  TianDiTu_MercatorCRS,
  NonProjection,
  nonProjection,
  NonEarthCRS,
  nonEarthCRS,
  CRS,
  crs,
  toGeoJSON,
  toSuperMapGeometry,
  getMeterPerMapUnit,
  resolutionToScale,
  scaleToResolution,
  GetResolutionFromScaleDpi,
  NormalizeScale,
  transform
} from './core';

import {
  BaiduTileLayer,
  baiduTileLayer,
  CloudTileLayer,
  cloudTileLayer,
  ImageMapLayer,
  imageMapLayer,
  TiandituTileLayer,
  tiandituTileLayer,
  TiledMapLayer,
  tiledMapLayer,
  WMTSLayer,
  wmtsLayer,
  WebMap,
  webMap,
  ImageTileLayer,
  imageTileLayer
} from './mapping';

import {
  DataFlowLayer,
  dataFlowLayer,
  EchartsLayer,
  echartsLayer,
  GraphicLayer,
  graphicLayer,
  GraphThemeLayer,
  graphThemeLayer,
  heatMapFeature,
  HeatMapFeature,
  heatMapLayer,
  HeatMapLayer,
  LabelThemeLayer,
  labelThemeLayer,
  MapVLayer,
  mapVLayer,
  RangeThemeLayer,
  rangeThemeLayer,
  RankSymbolThemeLayer,
  rankSymbolThemeLayer,
  TileVectorLayer,
  TiledVectorLayer,
  tiledVectorLayer,
  TurfLayer,
  turfLayer,
  UnicodeMarker,
  unicodeMarker,
  UniqueThemeLayer,
  uniqueThemeLayer,
  VectorTileFormat,
  CartoCSSToLeaflet,
  DefaultStyle,
  CartoStyleMap,
  ServerStyleMap,
  CompOpMap,
  ImageStyle,
  imageStyle,
  CircleStyle,
  circleStyle,
  Graphic,
  graphic,
  CloverStyle,
  cloverStyle,
  ThemeFeature,
  themeFeature
} from './overlay';

import {
  AddressMatchService,
  addressMatchService,
  ChartService,
  chartService,
  DataFlowService,
  dataFlowService,
  DatasetService,
  datasetService,
  DatasourceService,
  datasourceService,
  FeatureService,
  featureService,
  FieldService,
  fieldService,
  geoprocessingService,
  GeoprocessingService,
  GridCellInfosService,
  gridCellInfosService,
  imageCollectionService,
  ImageCollectionService,
  imageService,
  ImageService,
  LayerInfoService,
  layerInfoService,
  MapService,
  mapService,
  MeasureService,
  measureService,
  NetworkAnalyst3DService,
  networkAnalyst3DService,
  NetworkAnalystService,
  networkAnalystService,
  ProcessingService,
  processingService,
  QueryService,
  queryService,
  ServiceBase,
  SpatialAnalystService,
  spatialAnalystService,
  ThemeService,
  themeService,
  TrafficTransferAnalystService,
  trafficTransferAnalystService,
  WebPrintingJobService,
  webPrintingJobService
} from './services';

import {
  OpenFileView,
  openFileView,
  OpenFileViewModel,
  openFileViewModel,
  SearchView,
  searchView,
  DataFlowView,
  dataFlowView,
  dataFlowViewModel,
  DataFlowViewModel,
  ClientComputationView,
  clientComputationView,
  ClientComputationViewModel,
  clientComputationViewModel,
  ClientComputationLayer,
  clientComputationLayer,
  GeoJSONLayerWithName,
  geoJSONLayerWithName,
  GeoJsonLayersDataModel,
  DistributedAnalysisModel,
  DistributedAnalysisView,
  distributedAnalysisView,
  DistributedAnalysisViewModel,
  distributedAnalysisViewModel,
  DataServiceQueryView,
  dataServiceQueryView,
  DataServiceQueryViewModel,
  dataServiceQueryViewModel,
  searchViewModel,
  SearchViewModel,
  componentsViewBase,
  ComponentsViewBase
} from './components';

import L from 'leaflet';

// 注：命名空间重复，内容会被覆盖 
// 例如SuperMap.Components=>L.supermap.Componets，再写L.supermap.Componets = {}， SuprMap的Components就不会挂在L.supermap上了

// L.supermap.d3Layer是在别的地方挂上的
L.supermap = { ...SuperMap, Components: { ...SuperMap.Components }, ...L.supermap };
L.supermap.components = L.supermap.components || {};
L.supermap.Components = L.supermap.Components || {};
L.supermap.control = L.supermap.control || {};
L.supermap.Util = {};

// ./core
// L.Util.supermap_callbacks = coreUtil.supermap_callbacks;
L.Util.toGeoJSON = toGeoJSON;
L.supermap.Util.toGeoJSON = toGeoJSON;
L.Util.toSuperMapGeometry = toSuperMapGeometry;
L.supermap.Util.toSuperMapGeometry = toSuperMapGeometry;
L.Util.resolutionToScale = resolutionToScale;
L.supermap.Util.resolutionToScale = resolutionToScale;
L.Util.scaleToResolution = scaleToResolution;
L.supermap.Util.scaleToResolution = scaleToResolution;
L.Util.getMeterPerMapUnit = getMeterPerMapUnit;
L.supermap.Util.getMeterPerMapUnit = getMeterPerMapUnit;
L.Util.GetResolutionFromScaleDpi = GetResolutionFromScaleDpi;
L.supermap.Util.GetResolutionFromScaleDpi = GetResolutionFromScaleDpi;
L.Util.NormalizeScale = NormalizeScale;
L.supermap.Util.NormalizeScale = NormalizeScale;
L.Util.transform = transform;
L.supermap.Util.transform = transform;
// L.Proj4Leaflet
L.Proj = L.Proj || {};
L.supermap.Proj = L.supermap.Proj || {};
L.Proj.CRS = crs;
L.supermap.Proj.crs = crs;
L.supermap.Proj.CRS = CRS;
// core/NonEarthCRS
L.Projection = {};
L.supermap.Projection = L.supermap.Projection || {};
L.Projection.NonProjection = nonProjection;
L.supermap.Projection.nonProjection = nonProjection;
L.supermap.Projection.NonProjection = NonProjection;
L.supermap.CRS = L.supermap.CRS || {};
L.CRS.NonEarthCRS = nonEarthCRS;
L.supermap.CRS.NonEarthCRS = NonEarthCRS;
L.supermap.CRS.nonEarthCRS = nonEarthCRS;
// core/ExtendsCRS
L.CRS.BaiduCRS = BaiduCRS;
L.supermap.CRS.BaiduCRS = BaiduCRS;
L.CRS.TianDiTu_WGS84CRS = TianDiTu_WGS84CRS;
L.supermap.CRS.TianDiTu_WGS84CRS = TianDiTu_WGS84CRS;
L.CRS.TianDiTu_MercatorCRS = TianDiTu_MercatorCRS;
L.supermap.CRS.TianDiTu_MercatorCRS = TianDiTu_MercatorCRS;
L.CRS.TianDiTu_Mercator = TianDiTu_MercatorCRS;
L.supermap.CRS.TianDiTu_Mercator = TianDiTu_MercatorCRS;
L.CRS.TianDiTu_WGS84 = TianDiTu_WGS84CRS;
L.supermap.CRS.TianDiTu_WGS84 = TianDiTu_WGS84CRS;
L.CRS.Baidu = BaiduCRS;
L.supermap.CRS.Baidu = BaiduCRS;
L.supermap.CommontypesConversion = CommontypesConversion;
// components
L.supermap.components.clientComputationLayer = clientComputationLayer;
L.supermap.Components.ClientComputationLayer = ClientComputationLayer;
L.supermap.components.clientComputation = clientComputationView;
L.supermap.Components.ClientComputation = ClientComputationView;
L.supermap.components.clientComputationViewModel = clientComputationViewModel;
L.supermap.Components.ClientComputationViewModel = ClientComputationViewModel;
L.supermap.components.geoJSONLayerWithName = geoJSONLayerWithName;
L.supermap.Components.GeoJSONLayerWithName = GeoJSONLayerWithName;
L.supermap.components.GeoJsonLayersDataModel = GeoJsonLayersDataModel;
L.supermap.Components.GeoJsonLayersDataModel = GeoJsonLayersDataModel;
L.supermap.components.dataFlow = dataFlowView;
L.supermap.Components.DataFlow = DataFlowView;
L.supermap.components.dataFlowViewModel = dataFlowViewModel;
L.supermap.Components.DataFlowViewModel = DataFlowViewModel;
L.supermap.components.dataServiceQuery = dataServiceQueryView;
L.supermap.Components.DataServiceQuery = DataServiceQueryView;
L.supermap.components.dataServiceQueryViewModel = dataServiceQueryViewModel;
L.supermap.Components.DataServiceQueryViewModel = DataServiceQueryViewModel;
L.supermap.components.DistributedAnalysisModel = DistributedAnalysisModel;
L.supermap.Components.DistributedAnalysisModel = DistributedAnalysisModel;
L.supermap.components.distributedAnalysis = distributedAnalysisView;
L.supermap.Components.DistributedAnalysis = DistributedAnalysisView;
L.supermap.components.distributedAnalysisViewModel = distributedAnalysisViewModel;
L.supermap.Components.DistributedAnalysisViewModel = DistributedAnalysisViewModel;
L.supermap.components.openFile = openFileView;
L.supermap.Components.OpenFile = OpenFileView;
L.supermap.components.openFileViewModel = openFileViewModel;
L.supermap.Components.OpenFileViewModel = OpenFileViewModel;
L.supermap.components.search = searchView;
L.supermap.Components.Search = SearchView;
L.supermap.components.searchViewModel = searchViewModel;
L.supermap.Components.SearchViewModel = SearchViewModel;
L.supermap.components.componentsViewBase = componentsViewBase;
L.supermap.Components.ComponentsViewBase = ComponentsViewBase;
// control
L.supermap.control.changeTileVersion = changeTileVersion;
L.supermap.control.ChangeTileVersion = ChangeTileVersion;
L.supermap.control.logo = logo;
L.supermap.control.Logo = Logo;
// mapping
L.supermap.baiduTileLayer = baiduTileLayer;
L.supermap.BaiduTileLayer = BaiduTileLayer;
L.supermap.cloudTileLayer = cloudTileLayer;
L.supermap.CloudTileLayer = CloudTileLayer;
L.supermap.imageMapLayer = imageMapLayer;
L.supermap.ImageMapLayer = ImageMapLayer;
L.supermap.imageTileLayer = imageTileLayer;
L.supermap.ImageTileLayer = ImageTileLayer;
L.supermap.tiandituTileLayer = tiandituTileLayer;
L.supermap.TiandituTileLayer = TiandituTileLayer;
L.supermap.tiledMapLayer = tiledMapLayer;
L.supermap.TiledMapLayer = TiledMapLayer;
L.supermap.wmtsLayer = wmtsLayer;
L.supermap.WMTSLayer = WMTSLayer;
L.supermap.webmap = webMap;
L.supermap.WebMap = WebMap;
// overlay
L.supermap.CartoCSSToLeaflet = CartoCSSToLeaflet;
L.supermap.DefaultStyle = DefaultStyle;
L.supermap.CartoStyleMap = CartoStyleMap;
L.supermap.ServerStyleMap = ServerStyleMap;
L.supermap.CompOpMap = CompOpMap;
L.supermap.circleStyle = circleStyle;
L.supermap.CircleStyle = CircleStyle;
L.supermap.cloverStyle = cloverStyle;
L.supermap.CloverStyle = CloverStyle;
L.supermap.graphic = graphic;
L.supermap.Graphic = Graphic;
L.supermap.imageStyle = imageStyle;
L.supermap.ImageStyle = ImageStyle;
L.supermap.themeFeature = themeFeature;
L.supermap.ThemeFeature = ThemeFeature;
L.supermap.dataFlowLayer = dataFlowLayer;
L.supermap.DataFlowLayer = DataFlowLayer;
L.supermap.echartsLayer = echartsLayer;
L.supermap.EchartsLayer = EchartsLayer;
L.supermap.graphicLayer = graphicLayer;
L.supermap.GraphicLayer = GraphicLayer;
L.supermap.graphThemeLayer = graphThemeLayer;
L.supermap.GraphThemeLayer = GraphThemeLayer;
L.supermap.heatMapFeature = heatMapFeature;
L.supermap.HeatMapFeature = HeatMapFeature;
L.supermap.heatMapLayer = heatMapLayer;
L.supermap.HeatMapLayer = HeatMapLayer;
L.supermap.labelThemeLayer = labelThemeLayer;
L.supermap.LabelThemeLayer = LabelThemeLayer;
L.supermap.mapVLayer = mapVLayer;
L.supermap.MapVLayer = MapVLayer;
L.supermap.rangeThemeLayer = rangeThemeLayer;
L.supermap.RangeThemeLayer = RangeThemeLayer;
L.supermap.rankSymbolThemeLayer = rankSymbolThemeLayer;
L.supermap.RankSymbolThemeLayer = RankSymbolThemeLayer;
L.supermap.tiledVectorLayer = tiledVectorLayer;
L.supermap.TileVectorLayer = TileVectorLayer;
L.supermap.TiledVectorLayer = TiledVectorLayer;
L.supermap.turfLayer = turfLayer;
L.supermap.TurfLayer = TurfLayer;
L.supermap.unicodeMarker = unicodeMarker;
L.supermap.UnicodeMarker = UnicodeMarker;
L.supermap.uniqueThemeLayer = uniqueThemeLayer;
L.supermap.UniqueThemeLayer = UniqueThemeLayer;
L.supermap.VectorTileFormat = VectorTileFormat;
L.supermap.addressMatchService = addressMatchService;
L.supermap.AddressMatchService = AddressMatchService;
L.supermap.chartService = chartService;
L.supermap.ChartService = ChartService;
L.supermap.dataFlowService = dataFlowService;
L.supermap.DataFlowService = DataFlowService;
L.supermap.datasetService = datasetService;
L.supermap.DatasetService = DatasetService;
L.supermap.datasourceService = datasourceService;
L.supermap.DatasourceService = DatasourceService;
L.supermap.featureService = featureService;
L.supermap.FeatureService = FeatureService;
L.supermap.fieldService = fieldService;
L.supermap.FieldService = FieldService;
L.supermap.geoprocessingService = geoprocessingService;
L.supermap.GeoprocessingService = GeoprocessingService;
L.supermap.gridCellInfosService = gridCellInfosService;
L.supermap.GridCellInfosService = GridCellInfosService;
L.supermap.imageCollectionService = imageCollectionService;
L.supermap.ImageCollectionService = ImageCollectionService;
L.supermap.imageService = imageService;
L.supermap.ImageService = ImageService;
L.supermap.layerInfoService = layerInfoService;
L.supermap.LayerInfoService = LayerInfoService;
L.supermap.mapService = mapService;
L.supermap.MapService = MapService;
L.supermap.measureService = measureService;
L.supermap.MeasureService = MeasureService;
L.supermap.networkAnalyst3DService = networkAnalyst3DService;
L.supermap.NetworkAnalyst3DService = NetworkAnalyst3DService;
L.supermap.networkAnalystService = networkAnalystService;
L.supermap.NetworkAnalystService = NetworkAnalystService;
L.supermap.processingService = processingService;
L.supermap.ProcessingService = ProcessingService;
L.supermap.queryService = queryService;
L.supermap.QueryService = QueryService;
L.supermap.ServiceBase = ServiceBase;
L.supermap.spatialAnalystService = spatialAnalystService;
L.supermap.SpatialAnalystService = SpatialAnalystService;
L.supermap.themeService = themeService;
L.supermap.ThemeService = ThemeService;
L.supermap.trafficTransferAnalystService = trafficTransferAnalystService;
L.supermap.TrafficTransferAnalystService = TrafficTransferAnalystService;
L.supermap.webPrintingJobService = webPrintingJobService;
L.supermap.WebPrintingJobService = WebPrintingJobService;

// 处理命名空间重名
L.supermap.CommonUtil = CommonUtil;

export * from './index';