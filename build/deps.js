var deps = {
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
        // "iManager" : [],
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
            //ProcessingJobs
            "./src/common/iServer/KernelDensityJobsService.js",
            "./src/common/iServer/BuildCacheJobsService.js",
            //AddressService
            "./src/common/iServer/AddressMatchService.js",
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

        "mapping": {
            "title": "地图",
            "description": "--对接地图服务",

            "RESTMAP": {
                "name": "iServer 地图图层",
                "src": [
                    "./src/leaflet/mapping/TiledMapLayer.js",
                    "./src/leaflet/mapping/ImageMapLayer.js"
                ]
            },
            "Baidu": {
                "name": "百度图层",
                "src": ['./src/leaflet/mapping/BaiduTileLayer.js']
            },
            "Cloud": {
                "name": "SuperMap 云图层",
                "src": ['./src/leaflet/mapping/CloudTileLayer.js']
            },
            "WMTS": {
                "name": "WMTS服务",
                "src": ["./src/leaflet/mapping/TileLayer.WMTS.js"]
            },
            "Tianditu": {
                "name": "天地图图层",
                "src": ["./src/leaflet/mapping/TiandituTileLayer.js"]
            },
            "iPortal": {
                "name": "iPortal webmap",
                "src": ["./src/leaflet/mapping/WebMap.js"]
            }
        },

        "services": {
            "title": "服务",
            "description": "--对接SuperMap服务",
            "Map": {
                "name": "地图服务",
                "src": [
                    "./src/leaflet/services/MapService.js",
                    "./src/leaflet/services/QueryService.js",
                    "./src/leaflet/services/LayerInfoService.js",
                    "./src/leaflet/services/MeasureService.js",
                    "./src/leaflet/services/ChartService.js"
                ]
            },
            "Data": {
                "name": "数据服务",
                "src": [
                    "./src/leaflet/services/FeatureService.js",
                    "./src/leaflet/services/FieldService.js",
                    "./src/leaflet/services/GridCellInfosService.js"
                ]
            },
            "Theme": {
                "name": "服务器专题图服务",
                "src": [
                    "./src/leaflet/services/ThemeService.js"
                ]
            },
            "NetworkAnalyst": {
                "name": "网络分析服务",
                "src": [
                    "./src/leaflet/services/NetworkAnalystService.js"
                ]
            },
            "NetworkAnalyst3D": {
                "name": "3D网络分析服务",
                "src": [
                    "./src/leaflet/services/NetworkAnalyst3DService.js"
                ]
            },
            "SpatialAnalyst": {
                "name": "空间分析服务",
                "src": [
                    "./src/leaflet/services/SpatialAnalystService.js"
                ]
            },
            "TrafficTransferAnalyst": {
                "name": "交通换乘分析服务",
                "src": [
                    "./src/leaflet/services/TrafficTransferAnalystService.js"
                ]
            },
            "ProcessingJobs": {
                "name": "大数据分析服务",
                "src": [
                    "./src/leaflet/services/ProcessingJobsService.js"
                ]
            },
            "iPortal": {
                "name": "iPortal服务",
                "src": [
                    "./src/common/iPortal/iPortal.js"
                ]
            },
            "Online": {
                "name": "Online服务",
                "src": [
                    "./src/common/online/Online.js"
                ]
            },
            "Address": {
                "name": "地理匹配服务",
                "src": [
                    "./src/leaflet/services/AddressMatchService.js"
                ]
            }

        },

        "overlay": {
            "title": "可视化",
            "description": "--对接可视化",
            "EChartMapLayer": {
                "name": "ECharts地图图层",
                "src": [
                    "./src/leaflet/overlay/EChartMapLayer.js"
                ]
            },
            "GraphicLayer": {
                "name": "高效率点图层",
                "src": [
                    "./src/leaflet/overlay/GraphicGroup.js"
                ]
            },

            "TileVectorLayer": {
                "name": "矢量瓦片",
                "src": [
                    './src/leaflet/overlay/TileVectorLayer.js'
                ]
            },
            "ThemeLayer": {
                "name": "专题图",
                "src": [
                    './src/leaflet/overlay/UniqueThemeLayer.js',
                    './src/leaflet/overlay/RangeThemeLayer.js',
                    './src/leaflet/overlay/RankSymbolThemeLayer.js'
                ]
            },
            "MapV": {
                "name": "MapV",
                "src": [
                    './src/leaflet/overlay/MapVLayer.js'
                ]
            },

            "ElasticSearch": {
                "name": "ElasticSearch",
                "src": [
                    "./src/common/control/TimeFlowControl.js",
                    "./src/common/thirdparty/elasticsearch/ElasticSearchService.js"
                ]
            }
        }

    },

    "openlayers": {

        "mapping": {
            "title": "地图",
            "description": "--对接地图服务",
            "RESTMAP": {
                "name": "iServer 地图图层",
                "src": ["./src/openlayers/mapping/TileSuperMapRest.js",
                    "./src/openlayers/mapping/ImageSuperMapRest.js"
                ]
            },

            "Baidu": {
                "name": "百度图层",
                "src": ['./src/openlayers/mapping/Baidu.js']
            },
            "Tianditu": {
                "name": "天地图图层",
                "src": ['./src/openlayers/mapping/Tianditu.js']
            },
            "SuperMapCloud": {
                "name": "超图云图层",
                "src": ['./src/openlayers/mapping/SuperMapCloud.js']
            },
            "iPortal": {
                "name": "iPortal webmap",
                "src": ["./src/openlayers/mapping/WebMap.js"]
            }
        },
        "services": {
            "title": "服务",
            "description": "--对接SuperMap服务",
            "Map": {
                "name": "地图服务",
                "src": [
                    "./src/openlayers/services/MapService.js",
                    "./src/openlayers/services/QueryService.js",
                    "./src/openlayers/services/LayerInfoService.js",
                    "./src/openlayers/services/MeasureService.js",
                    "./src/openlayers/services/ChartService.js"
                ]
            },
            "Data": {
                "name": "数据服务",
                "src": [
                    "./src/openlayers/services/FeatureService.js",
                    "./src/openlayers/services/FieldService.js",
                    "./src/openlayers/services/GridCellInfosService.js"
                ]
            },
            "Theme": {
                "name": "服务器专题图服务",
                "src": [
                    "./src/openlayers/services/ThemeService.js"
                ]
            },
            "NetworkAnalyst": {
                "name": "网络分析服务",
                "src": [
                    "./src/openlayers/services/NetworkAnalystService.js"
                ]
            },
            "NetworkAnalyst3D": {
                "name": "3D网络分析服务",
                "src": [
                    "./src/openlayers/services/NetworkAnalyst3DService.js"
                ]
            },
            "SpatialAnalyst": {
                "name": "空间分析服务",
                "src": [
                    "./src/openlayers/services/SpatialAnalystService.js"
                ]
            },
            "TrafficTransferAnalyst": {
                "name": "交通换乘分析服务",
                "src": [
                    "./src/openlayers/services/TrafficTransferAnalystService.js"
                ]
            },
            "iPortal": {
                "name": "iPortal服务",
                "src": [
                    "./src/common/iPortal/iPortal.js"
                ]
            },
            "Online": {
                "name": "Online服务",
                "src": [
                    "./src/common/online/Online.js"
                ]
            },
            "ProcessingJobs": {
                "name": "大数据分析服务",
                "src": [
                    "./src/openlayers/services/ProcessingJobsService.js"
                ]
            },
            "Address": {
                "name": "地理匹配服务",
                "src": [
                    "./src/openlayers/services/AddressMatchService.js"
                ]
            }
        },
        "overlay": {
            "title": "可视化",
            "description": "--对接可视化",
            "GraphicLayer": {
                "name": "高效率点图层",
                "src": [
                    "./src/openlayers/overlay/Graphic.js"
                ]
            },
            "VectorTile": {
                "name": "矢量瓦片",
                "src": [
                    "./src/openlayers/overlay/VectorTileSuperMapRest.js"
                ]
            },
            "Theme": {
                "name": "专题图",
                "src": [
                    "./src/openlayers/overlay/theme/theme.js",
                    "./src/openlayers/overlay/theme/geoFeature.js",
                    "./src/openlayers/overlay/unique.js",
                    "./src/openlayers/overlay/range.js",
                    "./src/openlayers/overlay/theme/graph.js",
                    "./src/openlayers/overlay/rankSymbol.js",
                    "./src/openlayers/overlay/theme/themeFeature.js"
                ]
            },
            "Mapv": {
                "name": "Mapv",
                "src": [
                    "./src/openlayers/overlay/mapv.js",
                ]
            }
        }
    },

    "mapboxgl": {
        "overlay": {
            "title": "可视化",
            "description": "--对接可视化",
            "Mapv": {
                "name": "Mapv",
                "src": [
                    "./src/mapboxgl/overlay/MapvLayer.js"
                ]
            }
        }
    }
};
module.exports = deps;