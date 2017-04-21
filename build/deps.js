var deps = {
    "common": {
        "core": [
            "./src/common/Base.js",
            "./src/common/REST.js"
        ],
        "format": [
            "./src/common/format/GeoJSON.js"
        ],
        "style": [
            "./src/common/style/CartoCSS.js"
        ],
        // "iManager" : [],
        "online": [
            "./src/common/online/Online.js"
        ],
        "iPortal": [
            "./src/common/iPortal/Portal.js"
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
            "./src/common/iServer/ThiessenAnalystService.js"

        ]
    },

    "leaflet": {

        "mapping": {
            "title": "地图",
            "description": "--对接地图服务",

            "RESTMAP": {
                "name": "iServer 地图图层",
                "src": ["./src/leaflet/mapping/TiledMapLayer.js"]
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
                    "./src/leaflet/services/ChartQueryService.js",
                    "./src/leaflet/services/TilesetsService.js",
                    "./src/leaflet/services/GetLayersInfoService.js",
                    "./src/leaflet/services/ChartFeatureInfoSpecsService.js",
                    "./src/leaflet/services/SetLayerService.js",
                    "./src/leaflet/services/MeasureService.js"
                ]
            },
            "Data": {
                "name": "数据服务",
                "src": [
                    "./src/leaflet/services/FieldStatisticService.js",
                    "./src/leaflet/services/GetFeaturesService.js",
                    "./src/leaflet/services/GetFieldsService.js",
                    "./src/leaflet/services/EditFeaturesService.js",
                    "./src/leaflet/services/GetGridCellInfosService.js"
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
                    "./src/leaflet/overlay/Graphic.js",
                    "./src/leaflet/overlay/GraphicGroup.js",
                    "./src/leaflet/overlay/CircleStyle.js"
                ]
            },

            "TileVectorLayer": {
                "name": "矢量瓦片",
                "src": [
                    './src/leaflet/overlay/TileVectorLayer.js',
                    './src/leaflet/overlay/PBFTileVectorLayer.js'
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
                "src": ["./src/openlayers/mapping/TileSuperMapRest.js"]
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
                    "./src/openlayers/services/ChartQueryService.js",
                    "./src/openlayers/services/TilesetsService.js",
                    "./src/openlayers/services/GetLayersInfoService.js",
                    "./src/openlayers/services/ChartFeatureInfoSpecsService.js",
                    "./src/openlayers/services/SetLayerService.js",
                    "./src/openlayers/services/MeasureService.js"
                ]
            },
            "Data": {
                "name": "数据服务",
                "src": [
                    "./src/openlayers/services/FieldStatisticService.js",
                    "./src/openlayers/services/GetFeaturesService.js",
                    "./src/openlayers/services/GetFieldsService.js",
                    "./src/openlayers/services/EditFeaturesService.js",
                    "./src/openlayers/services/GetGridCellInfosService.js"
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
            }
        },
        "overlay": {
            "title": "可视化",
            "description": "--对接可视化",
            "GraphicLayer": {
                "name": "高效率点图层",
                "src": [
                    "./src/openlayers/overlay/Graphic.js",
                    "./src/openlayers/overlay/GraphicSource.js"
                ]
            },
            "VectorTile": {
                "name": "矢量瓦片",
                "src": [
                    "./src/openlayers/overlay/VectorTileSuperMapRest.js",
                    "./src/openlayers/overlay/VectorTileStyles.js",
                    "./src/openlayers/overlay/StyleMap.js",
                    "./src/openlayers/overlay/DeafultCanvasStyle.js"
                ]
            }
        }
    }
};
module.exports = deps;