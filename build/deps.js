deps = {
    "common": {
        "core": [
            "./src/common/SuperMap.js",
            "./src/common/REST.js"
        ],
        "util": [
            "./src/common/util/FetchRequest.js"
        ],
        "format": [
            "./src/common/format/GeoJSON.js"
        ],
        "style": [
            "./src/common/style/CartoCSS.js"
        ],
        "security": [
            "./src/common/security/SecurityManager.js"
        ],
        "iManager": [
            "./src/common/iManager/iManager.js"
        ],
        "online": [
            "./src/common/online/Online.js"
        ],
        "iPortal": [
            "./src/common/iPortal/iPortal.js"
        ],
        "iServer": [
            //Data
            "./src/common/iServer/FieldStatisticService.js",
            "./src/common/iServer/GetFeaturesByBoundsService.js",
            "./src/common/iServer/GetFeaturesByBufferService.js",
            "./src/common/iServer/GetFeaturesByGeometryService.js",
            "./src/common/iServer/GetFeaturesByIDsService.js",
            "./src/common/iServer/GetFeaturesBySQLService.js",
            "./src/common/iServer/GetFieldsService.js",
            "./src/common/iServer/GetGridCellInfosService.js",
            "./src/common/iServer/EditFeaturesService.js",
            //Map
            "./src/common/iServer/GetLayersInfoService.js",
            "./src/common/iServer/MapService.js",
            "./src/common/iServer/ChartQueryService.js",
            "./src/common/iServer/QueryByDistanceService.js",
            "./src/common/iServer/QueryByGeometryService.js",
            "./src/common/iServer/QueryBySQLService.js",
            "./src/common/iServer/QueryByBoundsService.js",
            "./src/common/iServer/TilesetsService.js",
            "./src/common/iServer/MeasureService.js",
            "./src/common/iServer/ChartFeatureInfoSpecsService.js",
            "./src/common/iServer/SetLayerInfoService.js",
            "./src/common/iServer/SetLayersInfoService.js",
            "./src/common/iServer/SetLayerStatusService.js",
            //ThemeService
            "./src/common/iServer/ThemeService.js",
            //NetworkAnalyst
            "./src/common/iServer/BurstPipelineAnalystService.js",
            "./src/common/iServer/ComputeWeightMatrixService.js",
            "./src/common/iServer/FacilityAnalystStreamService.js",
            "./src/common/iServer/FindClosestFacilitiesService.js",
            "./src/common/iServer/FindLocationService.js",
            "./src/common/iServer/FindMTSPPathsService.js",
            "./src/common/iServer/FindPathService.js",
            "./src/common/iServer/FindServiceAreasService.js",
            "./src/common/iServer/FindTSPPathsService.js",
            "./src/common/iServer/UpdateEdgeWeightService.js",
            "./src/common/iServer/UpdateTurnNodeWeightService.js",
            //NetworkAnalyst3D
            "./src/common/iServer/FacilityAnalystSinks3DService.js",
            "./src/common/iServer/FacilityAnalystSources3DService.js",
            "./src/common/iServer/FacilityAnalystTracedown3DService.js",
            "./src/common/iServer/FacilityAnalystTraceup3DService.js",
            "./src/common/iServer/FacilityAnalystUpstream3DService.js",
            //TrafficTransferAnalyst
            "./src/common/iServer/StopQueryService.js",
            "./src/common/iServer/TransferPathService.js",
            "./src/common/iServer/TransferSolutionService.js",
            //SpatialAnalyst
            "./src/common/iServer/AreaSolarRadiationService.js",
            "./src/common/iServer/BufferAnalystService.js",
            "./src/common/iServer/DensityAnalystService.js",
            "./src/common/iServer/GenerateSpatialDataService.js",
            "./src/common/iServer/GeoRelationAnalystService.js",
            "./src/common/iServer/InterpolationAnalystService.js",
            "./src/common/iServer/MathExpressionAnalysisService.js",
            "./src/common/iServer/OverlayAnalystService.js",
            "./src/common/iServer/RouteCalculateMeasureService.js",
            "./src/common/iServer/RouteLocatorService.js",
            "./src/common/iServer/SurfaceAnalystService.js",
            "./src/common/iServer/TerrainCurvatureCalculationService.js",
            "./src/common/iServer/ThiessenAnalystService.js",
            //ProcessingService
            "./src/common/iServer/KernelDensityJobsService.js",
            "./src/common/iServer/SingleObjectQueryJobsService.js",
            "./src/common/iServer/SummaryMeshJobsService.js",
            "./src/common/iServer/SummaryRegionJobsService.js",
            "./src/common/iServer/VectorClipJobsService.js",
            "./src/common/iServer/OverlayGeoJobsService.js",
            //AddressService
            "./src/common/iServer/AddressMatchService.js",
            //DataFlowService
            "./src/common/iServer/DataFlowService.js",
        ],
        "graph": [
            "./src/common/iServer/Bar.js",
            "./src/common/iServer/Bar3D.js",
            "./src/common/iServer/Circle.js",
            "./src/common/iServer/Line.js",
            "./src/common/iServer/Pie.js",
            "./src/common/iServer/Point.js",
            "./src/common/iServer/Ring.js"
        ]

    },

    "leaflet": {

        "Mapping": {
            "title": "地图",
            "description": "地图显示扩展",

            "RESTMAP": {
                "name": "iServer 地图图层",
                "src": [
                    "./src/leaflet/mapping/TiledMapLayer.js",
                    "./src/leaflet/mapping/ImageMapLayer.js"
                ],
                "modules": [{
                    "name": "L.supermap.tiledMapLayer",
                    "des": "iServer TileImage地图"
                }, {
                    "name": "L.supermap.imageMapLayer",
                    "des": "iServer Image地图"
                }]
            },
            "Baidu": {
                "name": "百度图层",
                "src": ['./src/leaflet/mapping/BaiduTileLayer.js'],
                "modules": [{
                    "name": "L.supermap.baiduTileLayer",
                    "des": "百度地图"
                }]
            },
            "Cloud": {
                "name": "SuperMap 云图层",
                "src": ['./src/leaflet/mapping/CloudTileLayer.js'],
                "modules": [{
                    "name": "L.supermap.cloudTileLayer",
                    "des": "超图云地图"
                }]
            },
            "WMTS": {
                "name": "WMTS服务",
                "src": ["./src/leaflet/mapping/TileLayer.WMTS.js"],
                "modules": [{
                    "name": "L.supermap.wmtsLayer",
                    "des": "iServer WMTS地图"
                }]
            },
            "Tianditu": {
                "name": "天地图图层",
                "src": ["./src/leaflet/mapping/TiandituTileLayer.js"],
                "modules": [{
                    "name": "L.supermap.tiandituTileLayer",
                    "des": "天地图"
                }]
            },
            "iPortal": {
                "name": "iPortal webmap",
                "src": ["./src/leaflet/mapping/WebMap.js"],
                "modules": [{
                    "name": "L.supermap.webmap",
                    "des": "iPortal、Online地图"
                }]
            }
        },

        "Services": {
            "title": "服务",
            "description": "对各种功能服务的包装",
            "Map": {
                "name": "地图服务",
                "src": [
                    "./src/leaflet/services/MapService.js",
                    "./src/leaflet/services/QueryService.js",
                    "./src/leaflet/services/LayerInfoService.js",
                    "./src/leaflet/services/MeasureService.js",
                    "./src/leaflet/services/ChartService.js"
                ],
                "modules": [{
                    "name": "L.supermap.mapService",
                    "des": "地图信息服务"
                }, {
                    "name": "L.supermap.queryService",
                    "des": "地图查询服务"
                }, {
                    "name": "L.supermap.layerInfoService",
                    "des": "图层信息服务"
                }, {
                    "name": "L.supermap.measureService",
                    "des": "测量服务"
                }, {
                    "name": "L.supermap.chartService",
                    "des": "海图服务"
                }]
            },
            "Data": {
                "name": "数据服务",
                "src": [
                    "./src/leaflet/services/FeatureService.js",
                    "./src/leaflet/services/FieldService.js",
                    "./src/leaflet/services/GridCellInfosService.js"
                ],
                "modules": [{
                    "name": "L.supermap.featureService",
                    "des": "数据集服务"
                }, {
                    "name": "L.supermap.fieldService",
                    "des": "字段服务"
                }, {
                    "name": "L.supermap.gridCellInfosService",
                    "des": "数据栅格查询服务"
                }]
            },
            "Theme": {
                "name": "服务器专题图服务",
                "src": [
                    "./src/leaflet/services/ThemeService.js"
                ],
                "modules": [{
                    "name": "L.supermap.themeService",
                    "des": "专题图服务"
                }]
            },
            "NetworkAnalyst": {
                "name": "网络分析服务",
                "src": [
                    "./src/leaflet/services/NetworkAnalystService.js"
                ],
                "modules": [{
                    "name": "L.supermap.networkAnalystService",
                    "des": "网络分析服务"
                }]
            },
            "NetworkAnalyst3D": {
                "name": "3D网络分析服务",
                "src": [
                    "./src/leaflet/services/NetworkAnalyst3DService.js"
                ],
                "modules": [{
                    "name": "L.supermap.networkAnalyst3DService",
                    "des": "3D网络分析服务"
                }]
            },
            "SpatialAnalyst": {
                "name": "空间分析服务",
                "src": [
                    "./src/leaflet/services/SpatialAnalystService.js"
                ],
                "modules": [{
                    "name": "L.supermap.spatialAnalystService",
                    "des": "空间分析服务"
                }]
            },
            "TrafficTransferAnalyst": {
                "name": "交通换乘分析服务",
                "src": [
                    "./src/leaflet/services/TrafficTransferAnalystService.js"
                ],
                "modules": [{
                    "name": "L.supermap.trafficTransferAnalystService",
                    "des": "交通换乘服务"
                }]
            },
            "ProcessingService": {
                "name": "分布式分析服务",
                "src": [
                    "./src/leaflet/services/ProcessingService.js"
                ],
                "modules": [{
                    "name": "L.supermap.processingService",
                    "des": "分布式分析服务"
                }]
            },
            "iPortal": {
                "name": "iPortal服务",
                "src": [
                    "./src/common/iPortal/iPortal.js"
                ], "modules": [{
                    "name": "SuperMap.iPortal",
                    "des": "iPortal服务"
                }]
            },
            "Online": {
                "name": "Online服务",
                "src": [
                    "./src/common/online/Online.js"
                ],
                "modules": [{
                    "name": "SuperMap.Online",
                    "des": "Online服务"
                }]
            },
            "iManager": {
                "name": "iManager服务",
                "src": [
                    "./src/common/iManager/iManager.js"
                ], "modules": [{
                    "name": "SuperMap.iManager",
                    "des": "iManager服务"
                }]
            },
            "AddressMatch": {
                "name": "地址匹配服务",
                "src": [
                    "./src/leaflet/services/AddressMatchService.js"
                ],
                "modules": [{
                    "name": "L.supermap.addressMatchService",
                    "des": "地址匹配服务"
                }]
            },
            "ElasticSearch": {
                "name": "ElasticSearch",
                "src": [
                    "./src/common/control/TimeFlowControl.js",
                    "./src/common/thirdparty/elasticsearch/ElasticSearch.js"
                ],
                "modules": [{
                    "name": "SuperMap.ElasticSearch",
                    "des": "ElasticSearch服务"
                }]
            },
            "DataFlow": {
                "name": "实时数据服务",
                "src": [
                    "./src/leaflet/services/DataFlowService.js",
                    "./src/leaflet/overlay/DataFlowLayer.js"
                ],
                "modules": [{
                    "name": "L.supermap.dataFlowService",
                    "des": "实时数据服务"
                }, {
                    "name": "L.supermap.dataFlowLayer",
                    "des": "实时数据图层"
                }]
            }
        },

        "Overlay": {
            "title": "可视化",
            "description": "数据可视化效果扩展",
            "EChartsLayer": {
                "name": "ECharts地图图层",
                "src": [
                    "./src/leaflet/overlay/EChartsLayer.js"
                ],
                "modules": [{
                    "name": "L.supermap.echartsLayer",
                    "des": "百度Ecahrts可视化效果"
                }]
            },
            "GraphicLayer": {
                "name": "高效率点图层",
                "src": [
                    "./src/leaflet/overlay/GraphicLayer.js"
                ],
                "modules": [{
                    "name": "L.supermap.graphicLayer",
                    "des": "高效率点图层效果"
                }]
            },

            "TileVectorLayer": {
                "name": "矢量瓦片",
                "src": [
                    './src/leaflet/overlay/TileVectorLayer.js'
                ],
                "modules": [{
                    "name": "L.supermap.tiledVectorLayer",
                    "des": "矢量瓦片效果"
                }]
            },
            "ThemeLayer": {
                "name": "专题图",
                "src": [
                    './src/leaflet/overlay/UniqueThemeLayer.js',
                    './src/leaflet/overlay/RangeThemeLayer.js',
                    './src/leaflet/overlay/RankSymbolThemeLayer.js',
                    './src/leaflet/overlay/GraphThemeLayer.js',
                    './src/leaflet/overlay/LabelThemeLayer.js',
                ],
                "modules": [{
                    "name": "L.supermap.uniqueThemeLayer",
                    "des": "单值专题图效果"
                }, {
                    "name": "L.supermap.rangeThemeLayer",
                    "des": "分段专题图效果"
                }, {
                    "name": "L.supermap.rankSymbolThemeLayer",
                    "des": "符号等级专题图效果"
                }, {
                    "name": "L.supermap.garphThemeLayer",
                    "des": "统计专题图效果"
                }, {
                    "name": "L.supermap.labelThemeLayer",
                    "des": "标签专题图效果"
                }]
            },
            "MapV": {
                "name": "MapV",
                "src": [
                    './src/leaflet/overlay/MapVLayer.js'
                ],
                "modules": [{
                    "name": "L.supermap.mapVLayer",
                    "des": "百度MapV可视化效果"
                }]
            },
            "Turf": {
                "name": "Turf",
                "src": [
                    './src/leaflet/overlay/TurfLayer.js'
                ],
                "modules": [{
                    "name": "L.supermap.turfLayer",
                    "des": "客户端空间分析js库"
                }]
            }
        },

        "Control": {
            "title": "控件",
            "description": "各种功能在UI上的交互控制",
            "ChangeTileVersion": {
                "name": "多版本缓存切换",
                "src": [
                    "./src/leaflet/control/ChangeTileVersion.js"
                ],
                "modules": [{
                    "name": "L.supermap.control.changeTileVersion",
                    "des": "瓦片版本切换控件"
                }]
            },
            "Logo": {
                "name": "logo控件",
                "src": [
                    "./src/leaflet/control/Logo.js"
                ],
                "modules": [{
                    "name": "L.supermap.control.logo",
                    "des": "logo控件"
                }]
            },
        }

    },

    "openlayers": {

        "Mapping": {
            "title": "地图",
            "description": "地图显示扩展",
            "RESTMAP": {
                "name": "iServer 地图图层",
                "src": ["./src/openlayers/mapping/TileSuperMapRest.js",
                    "./src/openlayers/mapping/ImageSuperMapRest.js"
                ],
                "modules": [{
                    "name": "ol.source.TileSuperMapRest",
                    "des": "iServer TileImage地图"
                }, {
                    "name": "ol.source.ImageSuperMapRest",
                    "des": "iServer Image地图"
                }]
            },

            "Baidu": {
                "name": "百度图层",
                "src": ['./src/openlayers/mapping/BaiduMap.js'],
                "modules": [{
                    "name": "ol.source.BaiduMap",
                    "des": "百度地图"
                }]
            },
            "Tianditu": {
                "name": "天地图图层",
                "src": ['./src/openlayers/mapping/Tianditu.js'],
                "modules": [{
                    "name": "ol.source.Tianditu",
                    "des": "天地图"
                }]
            },
            "SuperMapCloud": {
                "name": "超图云图层",
                "src": ['./src/openlayers/mapping/SuperMapCloud.js'],
                "modules": [{
                    "name": "ol.source.SuperMapCloud",
                    "des": "超图云地图"
                }]
            },
            "iPortal": {
                "name": "iPortal webmap",
                "src": ["./src/openlayers/mapping/WebMap.js"],
                "modules": [{
                    "name": "ol.supermap.WebMap",
                    "des": "iPortal、Online地图"
                }]
            }
        },
        "Services": {
            "title": "服务",
            "description": "对各种功能服务的包装",
            "Map": {
                "name": "地图服务",
                "src": [
                    "./src/openlayers/services/MapService.js",
                    "./src/openlayers/services/QueryService.js",
                    "./src/openlayers/services/LayerInfoService.js",
                    "./src/openlayers/services/MeasureService.js",
                    "./src/openlayers/services/ChartService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.MapService",
                    "des": "地图信息服务"
                }, {
                    "name": "ol.supermap.QueryService",
                    "des": "地图查询服务"
                }, {
                    "name": "ol.supermap.LayerInfoService",
                    "des": "图层信息服务"
                }, {
                    "name": "ol.supermap.MeasureService",
                    "des": "测量服务"
                }, {
                    "name": "ol.supermap.ChartService",
                    "des": "海图服务"
                }]
            },
            "Data": {
                "name": "数据服务",
                "src": [
                    "./src/openlayers/services/FeatureService.js",
                    "./src/openlayers/services/FieldService.js",
                    "./src/openlayers/services/GridCellInfosService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.FeatureService",
                    "des": "数据集服务"
                }, {
                    "name": "ol.supermap.FieldService",
                    "des": "字段服务"
                }, {
                    "name": "ol.supermap.GridCellInfosService",
                    "des": "数据栅格查询服务"
                }]
            },
            "Theme": {
                "name": "服务器专题图服务",
                "src": [
                    "./src/openlayers/services/ThemeService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.ThemeService",
                    "des": "专题图服务"
                }]
            },
            "NetworkAnalyst": {
                "name": "网络分析服务",
                "src": [
                    "./src/openlayers/services/NetworkAnalystService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.NetworkAnalystService",
                    "des": "网络分析服务"
                }]
            },
            "NetworkAnalyst3D": {
                "name": "3D网络分析服务",
                "src": [
                    "./src/openlayers/services/NetworkAnalyst3DService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.NetworkAnalyst3DService",
                    "des": "3D网络分析服务"
                }]
            },
            "SpatialAnalyst": {
                "name": "空间分析服务",
                "src": [
                    "./src/openlayers/services/SpatialAnalystService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.SpatialAnalystService",
                    "des": "空间分析服务"
                }]
            },
            "TrafficTransferAnalyst": {
                "name": "交通换乘分析服务",
                "src": [
                    "./src/openlayers/services/TrafficTransferAnalystService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.TrafficTransferAnalystService",
                    "des": "交通换乘服务"
                }]
            },
            "iPortal": {
                "name": "iPortal服务",
                "src": [
                    "./src/common/iPortal/iPortal.js"
                ],
                "modules": [{
                    "name": "SuperMap.iPortal",
                    "des": "iPortal服务"
                }]
            },
            "Online": {
                "name": "Online服务",
                "src": [
                    "./src/common/online/Online.js"
                ],
                "modules": [{
                    "name": "SuperMap.Online",
                    "des": "Online服务"
                }]
            },
            "iManager": {
                "name": "iManager服务",
                "src": [
                    "./src/common/iManager/iManager.js"
                ], "modules": [{
                    "name": "SuperMap.iManager",
                    "des": "iManager服务"
                }]
            },
            "ProcessingService": {
                "name": "分布式分析服务",
                "src": [
                    "./src/openlayers/services/ProcessingService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.ProcessingService",
                    "des": "分布式分析服务"
                }]
            },
            "AddressMatch": {
                "name": "地址匹配服务",
                "src": [
                    "./src/openlayers/services/AddressMatchService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.AddressMatchService",
                    "des": "地址匹配服务"
                }]
            },
            "ElasticSearch": {
                "name": "ElasticSearch",
                "src": [
                    "./src/common/control/TimeFlowControl.js",
                    "./src/common/thirdparty/elasticsearch/ElasticSearch.js"
                ],
                "modules": [{
                    "name": "SuperMap.ElasticSearch",
                    "des": "ElasticSearch服务"
                }]
            },
            "DataFlow": {
                "name": "实时数据服务",
                "src": [
                    "./src/openlayers/services/DataFlowService.js",
                    "./src/openlayers/overlay/DataFlow.js"
                ],
                "modules": [{
                    "name": "ol.supermap.DataFlowService",
                    "des": "实时数据服务"
                }, {
                    "name": "ol.source.DataFlow",
                    "des": "实时数据"
                }]
            }
        },
        "Overlay": {
            "title": "可视化",
            "description": "数据可视化效果扩展",
            "GraphicLayer": {
                "name": "高效率点图层",
                "src": [
                    "./src/openlayers/overlay/Graphic.js"
                ],
                "modules": [{
                    "name": "ol.source.Graphic",
                    "des": "高效率点图层效果"
                }]
            },
            "VectorTile": {
                "name": "矢量瓦片",
                "src": [
                    "./src/openlayers/overlay/VectorTileSuperMapRest.js"
                ],
                "modules": [{
                    "name": "ol.source.VectorTileSuperMapRest",
                    "des": "iServer矢量瓦片效果"
                }]
            },
            "Theme": {
                "name": "专题图",
                "src": [
                    "./src/openlayers/overlay/Unique.js",
                    "./src/openlayers/overlay/Range.js",
                    "./src/openlayers/overlay/RankSymbol.js",
                    "./src/openlayers/overlay/Graph.js",
                    "./src/openlayers/overlay/Label.js",
                ],
                "modules": [{
                    "name": "ol.source.Unique",
                    "des": "单值专题图效果"
                }, {
                    "name": "ol.source.RankSymbol",
                    "des": "符号等级专题图效果"
                }, {
                    "name": "ol.source.Range",
                    "des": "分段专题图效果"
                }, {
                    "name": "ol.source.Graph",
                    "des": "统计专题图效果"
                }, {
                    "name": "ol.source.Label",
                    "des": "标签专题图效果"
                }]
            },
            "Mapv": {
                "name": "Mapv",
                "src": [
                    "./src/openlayers/overlay/Mapv.js",
                ],
                "modules": [{
                    "name": "ol.source.Mapv",
                    "des": "百度MapV可视化效果"
                }]
            },
            "Turf": {
                "name": "Turf",
                "src": [
                    "./src/openlayers/overlay/Turf.js",
                ],
                "modules": [{
                    "name": "ol.source.Turf",
                    "des": "客户端空间分析js库"
                }]
            }
        },
        "Control": {
            "title": "控件",
            "description": "各种功能在UI上的交互控制",

            "ChangeTileVersion": {
                "name": "多版本缓存切换",
                "src": [
                    "./src/openlayers/control/ChangeTileVersion.js"
                ],
                "modules": [{
                    "name": "ol.supermap.control.ChangeTileVersion",
                    "des": "瓦片版本切换控件"
                }]
            },
            "Logo": {
                "name": "logo控件",
                "src": [
                    "./src/openlayers/control/Logo.js"
                ],
                "modules": [{
                    "name": "ol.supermap.control.Logo",
                    "des": "logo控件"
                }]
            }
        }
    },

    "mapboxgl": {
        "Services": {
            "title": "服务",
            "description": "对各种功能服务的包装",
            "Map": {
                "name": "地图服务",
                "src": [
                    "./src/mapboxgl/services/MapService.js",
                    "./src/mapboxgl/services/LayerInfoService.js",
                    "./src/mapboxgl/services/ChartService.js",
                    "./src/mapboxgl/services/QueryService.js",
                    "./src/mapboxgl/services/MeasureService.js",
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.LayerInfoService",
                    "des": "图层信息服务"
                }, {
                    "name": "mapboxgl.supermap.MapService",
                    "des": "地图服务"
                }, {
                    "name": "mapboxgl.supermap.ChartQueryService",
                    "des": "海图服务"
                }, {
                    "name": "mapboxgl.supermap.QueryService",
                    "des": "查询服务"
                }, {
                    "name": "mapboxgl.supermap.MeasureService",
                    "des": "测量服务"
                }]
            },
            "Data": {
                "name": "数据服务",
                "src": [
                    "./src/mapboxgl/services/FeatureService.js",
                    "./src/mapboxgl/services/FieldService.js",
                    "./src/mapboxgl/services/GridCellInfosService.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.FeatureService",
                    "des": "数据集服务"
                }, {
                    "name": "mapboxgl.supermap.FieldService",
                    "des": "字段服务"
                }, {
                    "name": "mapboxgl.supermap.GridCellInfosService",
                    "des": "数据栅格查询服务"
                }]
            },
            "SpatialAnalyst": {
                "name": "空间分析服务",
                "src": [
                    "./src/mapboxgl/services/SpatialAnalystService.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.SpatialAnalystService",
                    "des": "空间分析服务"
                }]
            },
            "ProcessingService": {
                "name": "分布式分析服务",
                "src": [
                    "./src/mapboxgl/services/ProcessingService.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.ProcessingService",
                    "des": "分布式分析服务"
                }]
            },
            "AddressMatch": {
                "name": "地址匹配服务",
                "src": [
                    "./src/mapboxgl/services/AddressMatchService.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.AddressMatchService",
                    "des": "地址匹配服务"
                }]
            },

            "Theme": {
                "name": "服务器专题图服务",
                "src": [
                    "./src/mapboxgl/services/ThemeService.js",

                ],
                "modules": [{
                    "name": "mapboxgl.supermap.ThemeService",
                    "des": "服务器专题图服务"
                }]
            },
            "ElasticSearch": {
                "name": "ElasticSearch",
                "src": [
                    "./src/common/control/TimeFlowControl.js",
                    "./src/common/thirdparty/elasticsearch/ElasticSearch.js"
                ],
                "modules": [{
                    "name": "SuperMap.ElasticSearch",
                    "des": "ElasticSearch服务"
                }]
            },
            "DataFlow": {
                "name": "实时数据服务",
                "src": [
                    "./src/mapboxgl/services/DataFlowService.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.DataFlowService",
                    "des": "实时数据服务"
                }]
            },
            "NetworkAnalyst": {
                "name": "网络分析服务",
                "src": [
                    "./src/mapboxgl/services/NetworkAnalystService.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.NetworkAnalystService",
                    "des": "网络分析服务"
                }]
            },
            "NetworkAnalyst3D": {
                "name": "3D网络分析服务",
                "src": [
                    "./src/mapboxgl/services/NetworkAnalyst3DService.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.NetworkAnalyst3DService",
                    "des": "3D网络分析服务"
                }]
            },
            "TrafficTransferAnalyst": {
                "name": "交通换乘服务",
                "src": [
                    "./src/mapboxgl/services/TrafficTransferAnalystService.js",
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.TrafficTransferAnalystService",
                    "des": "交通换乘服务"
                }]
            },
        },
        "Overlay": {
            "title": "可视化",
            "description": "数据可视化效果扩展",
            "Mapv": {
                "name": "Mapv",
                "src": [
                    "./src/mapboxgl/overlay/MapvLayer.js",
                    "./src/mapboxgl/overlay/mapv/MapvDataSet.js",
                    "./src/mapboxgl/overlay/mapv/MapExtend.js",
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.MapvLayer",
                    "des": "百度MapV可视化效果"
                }]
            },
            "ThemeLayer": {
                "name": "ThemeLayer",
                "src": [
                    "./src/mapboxgl/overlay/RangeTheme3DLayer.js",
                    "./src/mapboxgl/overlay/UniqueTheme3DLayer.js",
                    "./src/mapboxgl/overlay/RangeThemeLayer.js",
                    "./src/mapboxgl/overlay/UniqueThemeLayer.js",
                    "./src/mapboxgl/overlay/RankSymbolThemeLayer.js",
                    "./src/mapboxgl/overlay/GraphThemeLayer.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.RankTheme3DLayer",
                    "des": "三维分段专题图"
                }, {
                    "name": "mapboxgl.supermap.UniqueTheme3DLayer",
                    "des": "三维单值专题图"
                }, {
                    "name": "mapboxgl.supermap.RangeThemeLayer",
                    "des": "分段专题图"
                }, {
                    "name": "mapboxgl.supermap.UniqueThemeLayer",
                    "des": "单值专题图"
                }, {
                    "name": "mapboxgl.supermap.RankSymbolThemeLayer",
                    "des": "等级符号专题图"
                }, {
                    "name": "mapboxgl.supermap.GraphThemeLayer",
                    "des": "统计专题图"
                }]

            }
        },
        "Control": {
            "title": "控件",
            "description": "各种功能在UI上的交互控制",

            "Logo": {
                "name": "logo控件",
                "src": [
                    "./src/mapboxgl/control/Logo.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.LogoControl",
                    "des": "logo控件"
                }]
            }
        }
    },

    "classic": {
        "Services": {
            "title": "服务",
            "description": "对各种功能服务的包装",
            "ProcessingService": {
                "name": "分布式分析服务",
                "src": [
                    "./src/classic/services/ProcessingService.js"
                ],
                "modules": [{
                    "name": "SuperMap.REST.ProcessingService",
                    "des": "分布式分析服务"
                }]
            },
            "AddressMatch": {
                "name": "地址匹配服务",
                "src": [
                    "./src/classic/services/AddressMatchService.js"
                ],
                "modules": [{
                    "name": "SuperMap.REST.AddressMatchService",
                    "des": "地址匹配服务"
                }]
            },
            "ElasticSearch": {
                "name": "ElasticSearch",
                "src": [
                    "./src/common/control/TimeFlowControl.js",
                    "./src/common/thirdparty/elasticsearch/ElasticSearch.js"
                ],
                "modules": [{
                    "name": "SuperMap.ElasticSearch",
                    "des": "ElasticSearch服务"
                }]
            },
        },
        "Overlay": {
            "title": "可视化",
            "description": "数据可视化效果扩展",
            "MapV": {
                "name": "MapV",
                "src": [
                    "./src/classic/overlay/MapVLayer.js"
                ],
                "modules": [{
                    "name": "SuperMap.Layer.MapVLayer",
                    "des": "百度MapV可视化效果"
                }]
            }
        }
    }
};