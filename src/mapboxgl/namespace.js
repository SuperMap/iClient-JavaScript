/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Logo } from './control';
import { Util, decryptSources } from './core';
import {
  GraphThemeLayer,
  LabelThemeLayer,
  MapvLayer,
  FGBLayer,
  VideoLayer,
  RangeTheme3DLayer,
  RangeThemeLayer,
  RankSymbolThemeLayer,
  UniqueTheme3DLayer,
  UniqueThemeLayer,
  GraphicLayer,
  ThreeLayer,
  HeatMapLayer,
  DeckglLayer,
  GraticuleLayer,
  Graphic,
  MapvDataSet,
  getDefaultVectorTileStyle,
  setBackground,
  setPaintProperty,
  GeoFeatureThemeLayer,
  Theme3DLayer,
  ThemeFeature,
  ThemeLayer,
  GraphMap,
  WebSymbol
} from './overlay';
import {
  AddressMatchService,
  ChartService,
  DataFlowService,
  DatasetService,
  DatasourceService,
  FeatureService,
  FieldService,
  GridCellInfosService,
  GeoprocessingService,
  LayerInfoService,
  MapService,
  MeasureService,
  NetworkAnalystService,
  NetworkAnalyst3DService,
  ProcessingService,
  QueryService,
  ServiceBase,
  SpatialAnalystService,
  ThemeService,
  TrafficTransferAnalystService,
  WebPrintingJobService,
  ImageService,
  ImageCollectionService,
  KnowledgeGraphService
} from './services';

import {
  CommonUtil,
  SuperMap,
  Transform,
  ChartView
} from '@supermap/iclient-common/namespace';

import { WebMap, initMap, WebMapV3 } from './mapping';
import mapboxgl from 'mapbox-gl';

mapboxgl.supermap = {...SuperMap, ...mapboxgl.supermap};
mapboxgl.supermap.map = mapboxgl.supermap.map || {};
mapboxgl.supermap.LogoControl = Logo;
mapboxgl.supermap.Logo = Logo;
mapboxgl.supermap.Util = Util;
mapboxgl.supermap.decryptSources = decryptSources;
mapboxgl.supermap.WebMap = WebMap;
mapboxgl.supermap.initMap = initMap;
mapboxgl.supermap.WebMapV3 = WebMapV3;
mapboxgl.supermap.Graphic = Graphic;
mapboxgl.supermap.map.getDefaultVectorTileStyle = getDefaultVectorTileStyle;
mapboxgl.supermap.map.setBackground = setBackground;
mapboxgl.supermap.map.setPaintProperty = setPaintProperty;
mapboxgl.supermap.MapvDataSet = MapvDataSet;
mapboxgl.supermap.GeoFeatureThemeLayer = GeoFeatureThemeLayer;
mapboxgl.supermap.Theme3DLayer = Theme3DLayer;
mapboxgl.supermap.ThemeFeature = ThemeFeature;
mapboxgl.supermap.ThemeLayer = ThemeLayer;
mapboxgl.supermap.Transform = Transform;
mapboxgl.supermap.WebSymbol = WebSymbol;
mapboxgl.supermap.DeckglLayer = DeckglLayer;
mapboxgl.supermap.GraphicLayer = GraphicLayer;
mapboxgl.supermap.GraphThemeLayer = GraphThemeLayer;
mapboxgl.supermap.GraticuleLayer = GraticuleLayer;
mapboxgl.supermap.HeatMapLayer = HeatMapLayer;
mapboxgl.supermap.LabelThemeLayer = LabelThemeLayer;
mapboxgl.supermap.MapvLayer = MapvLayer;
mapboxgl.supermap.FGBLayer = FGBLayer;
mapboxgl.supermap.VideoLayer = VideoLayer;
mapboxgl.supermap.RangeTheme3DLayer = RangeTheme3DLayer;
mapboxgl.supermap.RangeThemeLayer = RangeThemeLayer;
mapboxgl.supermap.RankSymbolThemeLayer = RankSymbolThemeLayer;
mapboxgl.supermap.ThreeLayer = ThreeLayer;
mapboxgl.supermap.UniqueTheme3DLayer = UniqueTheme3DLayer;
mapboxgl.supermap.UniqueThemeLayer = UniqueThemeLayer;
mapboxgl.supermap.GraphMap = GraphMap;

mapboxgl.supermap.AddressMatchService = AddressMatchService;
mapboxgl.supermap.ChartService = ChartService;
mapboxgl.supermap.DataFlowService = DataFlowService;
mapboxgl.supermap.DatasetService = DatasetService;
mapboxgl.supermap.DatasourceService = DatasourceService;
mapboxgl.supermap.FeatureService = FeatureService;
mapboxgl.supermap.FieldService = FieldService;
mapboxgl.supermap.GeoprocessingService = GeoprocessingService;
mapboxgl.supermap.GridCellInfosService = GridCellInfosService;
mapboxgl.supermap.ImageCollectionService = ImageCollectionService;
mapboxgl.supermap.ImageService = ImageService;
mapboxgl.supermap.LayerInfoService = LayerInfoService;
mapboxgl.supermap.MapService = MapService;
mapboxgl.supermap.MeasureService = MeasureService;
mapboxgl.supermap.NetworkAnalyst3DService = NetworkAnalyst3DService;
mapboxgl.supermap.NetworkAnalystService = NetworkAnalystService;
mapboxgl.supermap.ProcessingService = ProcessingService;
mapboxgl.supermap.QueryService = QueryService;
mapboxgl.supermap.ServiceBase = ServiceBase;
mapboxgl.supermap.SpatialAnalystService = SpatialAnalystService;
mapboxgl.supermap.ThemeService = ThemeService;
mapboxgl.supermap.TrafficTransferAnalystService = TrafficTransferAnalystService;
mapboxgl.supermap.WebPrintingJobService = WebPrintingJobService;
mapboxgl.supermap.KnowledgeGraphService = KnowledgeGraphService;

mapboxgl.supermap.Components.ChartView = ChartView;

// 处理命名空间重名
mapboxgl.supermap.CommonUtil = CommonUtil;
export * from './index';
