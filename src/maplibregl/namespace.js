/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import maplibregl from 'maplibre-gl';
import { Logo } from './control';
import { Util } from './core';
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
  ImageCollectionService
} from './services';

import {
  CommonUtil,
  SuperMap
} from '@supermap/iclient-common/namespace';

export * from './index';

maplibregl.supermap = {...SuperMap, ...maplibregl.supermap};
maplibregl.supermap.AddressMatchService = AddressMatchService;
maplibregl.supermap.ChartService = ChartService;
maplibregl.supermap.DataFlowService = DataFlowService;
maplibregl.supermap.DatasetService = DatasetService;
maplibregl.supermap.DatasourceService = DatasourceService;
maplibregl.supermap.FeatureService = FeatureService;
maplibregl.supermap.FieldService = FieldService;
maplibregl.supermap.GeoprocessingService = GeoprocessingService;
maplibregl.supermap.GridCellInfosService = GridCellInfosService;
maplibregl.supermap.ImageCollectionService = ImageCollectionService;
maplibregl.supermap.ImageService = ImageService;
maplibregl.supermap.LayerInfoService = LayerInfoService;
maplibregl.supermap.MapService = MapService;
maplibregl.supermap.MeasureService = MeasureService;
maplibregl.supermap.NetworkAnalyst3DService = NetworkAnalyst3DService;
maplibregl.supermap.NetworkAnalystService = NetworkAnalystService;
maplibregl.supermap.ProcessingService = ProcessingService;
maplibregl.supermap.QueryService = QueryService;
maplibregl.supermap.ServiceBase = ServiceBase;
maplibregl.supermap.SpatialAnalystService = SpatialAnalystService;
maplibregl.supermap.ThemeService = ThemeService;
maplibregl.supermap.TrafficTransferAnalystService = TrafficTransferAnalystService;
maplibregl.supermap.WebPrintingJobService = WebPrintingJobService;
maplibregl.supermap.CommonUtil = CommonUtil;
maplibregl.supermap.Util = Util;
maplibregl.supermap.LogoControl = Logo;