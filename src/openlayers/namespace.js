/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import { CommonUtil, SuperMap } from '@supermap/iclient-common/namespace';
/* control */
import { ChangeTileVersion, Logo, ScaleLine } from './control';

/* core */
import { StyleUtils, Util } from './core';

/* mapping */
import {
  BaiduMap,
  ImageSuperMapRest,
  SuperMapCloud,
  ImageTileSuperMapRest,
  Tianditu,
  TileSuperMapRest,
  WebMap,
  initMap,
  viewOptionsFromMapJSON
} from './mapping';

/* overlay */
import {
  CloverShape,
  OverlayGraphic,
  HitCloverShape,
  GeoFeature,
  Theme,
  ThemeFeature,
  MapboxStyles,
  VectorTileStyles,
  DataFlow,
  Graph,
  Graphic,
  HeatMap,
  Label,
  Mapv,
  Range,
  RankSymbol,
  Turf,
  Unique,
  FGB,
  VectorTileSuperMapRest,
  GraphMap
} from './overlay';

/* service */
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
  NetworkAnalyst3DService,
  NetworkAnalystService,
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

if (window && window.ol) {
  let ol = window.ol;
  ol.supermap = { ...SuperMap, ...ol.supermap };
  ol.supermap.control = ol.supermap.control || {};
  // control
  ol.supermap.control.ChangeTileVersion = ChangeTileVersion;
  ol.supermap.control.Logo = Logo;
  ol.supermap.control.ScaleLine = ScaleLine;
  // core
  ol.supermap.StyleUtils = StyleUtils;
  ol.supermap.Util = Util;
  // mapping
  ol.source.BaiduMap = BaiduMap;
  ol.source.ImageSuperMapRest = ImageSuperMapRest;
  ol.source.SuperMapCloud = SuperMapCloud;
  ol.source.ImageTileSuperMapRest = ImageTileSuperMapRest;
  ol.source.Tianditu = Tianditu;
  ol.source.TileSuperMapRest = TileSuperMapRest;
  ol.supermap.WebMap = WebMap;
  // overlay
  ol.style.CloverShape = CloverShape;
  ol.Graphic = OverlayGraphic;
  ol.style.HitCloverShape = HitCloverShape;
  ol.source.GeoFeature = GeoFeature;
  ol.source.Theme = Theme;
  ol.supermap.ThemeFeature = ThemeFeature;
  ol.supermap.MapboxStyles = MapboxStyles;
  ol.supermap.VectorTileStyles = VectorTileStyles;
  ol.source.DataFlow = DataFlow;
  ol.source.Graph = Graph;
  ol.source.Graphic = Graphic;
  ol.source.HeatMap = HeatMap;
  ol.source.Label = Label;
  ol.source.Mapv = Mapv;
  ol.source.Range = Range;
  ol.source.RankSymbol = RankSymbol;
  ol.source.Turf = Turf;
  ol.source.FGB = FGB;
  ol.source.Unique = Unique;
  ol.source.VectorTileSuperMapRest = VectorTileSuperMapRest;
  ol.supermap.GraphMap = GraphMap;
  // service
  ol.supermap.AddressMatchService = AddressMatchService;
  ol.supermap.ChartService = ChartService;
  ol.supermap.DataFlowService = DataFlowService;
  ol.supermap.DatasetService = DatasetService;
  ol.supermap.DatasourceService = DatasourceService;
  ol.supermap.FeatureService = FeatureService;
  ol.supermap.FieldService = FieldService;
  ol.supermap.GridCellInfosService = GridCellInfosService;
  ol.supermap.GeoprocessingService = GeoprocessingService;
  ol.supermap.LayerInfoService = LayerInfoService;
  ol.supermap.MapService = MapService;
  ol.supermap.MeasureService = MeasureService;
  ol.supermap.NetworkAnalyst3DService = NetworkAnalyst3DService;
  ol.supermap.NetworkAnalystService = NetworkAnalystService;
  ol.supermap.ProcessingService = ProcessingService;
  ol.supermap.QueryService = QueryService;
  ol.supermap.ServiceBase = ServiceBase;
  ol.supermap.SpatialAnalystService = SpatialAnalystService;
  ol.supermap.ThemeService = ThemeService;
  ol.supermap.TrafficTransferAnalystService = TrafficTransferAnalystService;
  ol.supermap.WebPrintingJobService = WebPrintingJobService;
  ol.supermap.ImageService = ImageService;
  ol.supermap.ImageCollectionService = ImageCollectionService;
  ol.supermap.KnowledgeGraphService = KnowledgeGraphService;
  ol.supermap.initMap = initMap;
  ol.supermap.viewOptionsFromMapJSON = viewOptionsFromMapJSON;
  // 处理命名空间重名问题
  ol.supermap.CommonUtil = CommonUtil;
}

export * from './index';
