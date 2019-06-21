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
            "./src/common/iServer/GeometryBatchAnalystService.js",
            //ProcessingService
            "./src/common/iServer/BuffersAnalystJobsService",
            "./src/common/iServer/KernelDensityJobsService.js",
            "./src/common/iServer/OverlayGeoJobsService.js",
            "./src/common/iServer/SingleObjectQueryJobsService.js",
            "./src/common/iServer/SummaryMeshJobsService.js",
            "./src/common/iServer/SummaryRegionJobsService.js",
            "./src/common/iServer/TopologyValidatorJobsService",
            "./src/common/iServer/VectorClipJobsService.js",
            "./src/common/iServer/SummaryAttributesJobsService.js",
            //AddressService
            "./src/common/iServer/AddressMatchService.js",
            //DataFlowService
            "./src/common/iServer/DataFlowService.js"
        ],
        "graph": [
            "./src/common/overlay/Bar.js",
            "./src/common/overlay/Bar3D.js",
            "./src/common/overlay/Circle.js",
            "./src/common/overlay/Line.js",
            "./src/common/overlay/Pie.js",
            "./src/common/overlay/Point.js",
            "./src/common/overlay/Ring.js"
        ]

    },

    "leaflet": {

        "Mapping": {
            "title": "地图",
            "description": "基础地图模块",
            "description_en": "Basic map module",

            "RESTMAP": {
                "name": "iServer 地图图层",
                "src": [
                    "./src/leaflet/mapping/TiledMapLayer.js",
                    "./src/leaflet/mapping/ImageMapLayer.js"
                ],
                "modules": [{
                    "name": "L.supermap.tiledMapLayer",
                    "des": "iServer tileImage 地图",
                    "des_en": "iServer tileImage resources tile layer"
                }, {
                    "name": "L.supermap.imageMapLayer",
                    "des": "iServer image 地图",
                    "des_en": "iServer image resources tile layer"
                }]
            },
            "Baidu": {
                "name": "百度图层",
                "src": ['./src/leaflet/mapping/BaiduTileLayer.js'],
                "modules": [{
                    "name": "L.supermap.baiduTileLayer",
                    "des": "百度地图",
                    "des_en": "Baidu map tile layer"
                }]
            },
            "Cloud": {
                "name": "SuperMap 云图层",
                "src": ['./src/leaflet/mapping/CloudTileLayer.js'],
                "modules": [{
                    "name": "L.supermap.cloudTileLayer",
                    "des": "超图云地图",
                    "des_en": "SuperMap cloud map tile layer"
                }]
            },
            "WMTS": {
                "name": "WMTS服务",
                "src": ["./src/leaflet/mapping/TileLayer.WMTS.js"],
                "modules": [{
                    "name": "L.supermap.wmtsLayer",
                    "des": "WMTS 地图",
                    "des_en": "WMTS tile layer"
                }]
            },
            "Tianditu": {
                "name": "天地图图层",
                "src": ["./src/leaflet/mapping/TiandituTileLayer.js"],
                "modules": [{
                    "name": "L.supermap.tiandituTileLayer",
                    "des": "天地图图层",
                    "des_en": "Tianditu map tile layer"
                }]
            },
            "iPortal": {
                "name": "iPortal webmap",
                "src": ["./src/leaflet/mapping/WebMap.js"],
                "modules": [{
                    "name": "L.supermap.webmap",
                    "des": "iPortal、Online 地图",
                    "des_en": "SuperMap iPortal and Online tile layer"
                }]
            }
        },

        "Services": {
            "title": "服务",
            "description": "服务模块",
            "description_en": "Service module",

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
                    "des": "地图信息服务",
                    "des_en": "iServer map service"
                }, {
                    "name": "L.supermap.queryService",
                    "des": "地图查询服务",
                    "des_en": "iServer map query service"
                }, {
                    "name": "L.supermap.layerInfoService",
                    "des": "图层信息服务",
                    "des_en": "iServer layer information service"
                }, {
                    "name": "L.supermap.measureService",
                    "des": "测量服务",
                    "des_en": "iServer measure service"
                }, {
                    "name": "L.supermap.chartService",
                    "des": "海图服务",
                    "des_en": "iServer chart service"
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
                    "des": "数据集服务",
                    "des_en": "iServer feature service"
                }, {
                    "name": "L.supermap.fieldService",
                    "des": "字段服务",
                    "des_en": "iServer field service"
                }, {
                    "name": "L.supermap.gridCellInfosService",
                    "des": "数据栅格查询服务",
                    "des_en": "iServer data grid cell information service"
                }]
            },
            "Theme": {
                "name": "服务器专题图服务",
                "src": [
                    "./src/leaflet/services/ThemeService.js"
                ],
                "modules": [{
                    "name": "L.supermap.themeService",
                    "des": "专题图服务",
                    "des_en": "iServer thematic service"
                }]
            },
            "NetworkAnalyst": {
                "name": "网络分析服务",
                "src": [
                    "./src/leaflet/services/NetworkAnalystService.js"
                ],
                "modules": [{
                    "name": "L.supermap.networkAnalystService",
                    "des": "网络分析服务",
                    "des_en": "iServer network analyst service"
                }]
            },
            "NetworkAnalyst3D": {
                "name": "3D网络分析服务",
                "src": [
                    "./src/leaflet/services/NetworkAnalyst3DService.js"
                ],
                "modules": [{
                    "name": "L.supermap.networkAnalyst3DService",
                    "des": "3D 网络分析服务",
                    "des_en": "iServer 3D network analyst service"
                }]
            },
            "SpatialAnalyst": {
                "name": "空间分析服务",
                "src": [
                    "./src/leaflet/services/SpatialAnalystService.js"
                ],
                "modules": [{
                    "name": "L.supermap.spatialAnalystService",
                    "des": "空间分析服务",
                    "des_en": "iServer spatial analyst service"
                }]
            },
            "TrafficTransferAnalyst": {
                "name": "交通换乘分析服务",
                "src": [
                    "./src/leaflet/services/TrafficTransferAnalystService.js"
                ],
                "modules": [{
                    "name": "L.supermap.trafficTransferAnalystService",
                    "des": "交通换乘服务",
                    "des_en": "iServer traffic transfer analyst service"
                }]
            },
            "ProcessingService": {
                "name": "分布式分析服务",
                "src": [
                    "./src/leaflet/services/ProcessingService.js"
                ],
                "modules": [{
                    "name": "L.supermap.processingService",
                    "des": "分布式分析服务",
                    "des_en": "iServer distributed analyst service"
                }]
            },
            "iPortal": {
                "name": "iPortal服务",
                "src": [
                    "./src/common/iPortal/iPortal.js"
                ], "modules": [{
                    "name": "SuperMap.iPortal",
                    "des": "iPortal 服务",
                    "des_en": "SuperMap iPortal service"
                }]
            },
            "Online": {
                "name": "Online 服务",
                "src": [
                    "./src/common/online/Online.js"
                ],
                "modules": [{
                    "name": "SuperMap.Online",
                    "des": "Online 服务",
                    "des_en": "SuperMap Online service"
                }]
            },
            "iManager": {
                "name": "iManager服务",
                "src": [
                    "./src/common/iManager/iManager.js"
                ], "modules": [{
                    "name": "SuperMap.iManager",
                    "des": "iManager 服务",
                    "des_en": "SuperMap iManager service"
                }]
            },
            "AddressMatch": {
                "name": "地址匹配服务",
                "src": [
                    "./src/leaflet/services/AddressMatchService.js"
                ],
                "modules": [{
                    "name": "L.supermap.addressMatchService",
                    "des": "地址匹配服务",
                    "des_en": "iServer address match service"
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
                    "des": "ElasticSearch 服务",
                    "des_en": "ElasticSearch service"
                }]
            },
            "DataFlow": {
                "name": "数据流服务",
                "src": [
                    "./src/leaflet/services/DataFlowService.js",
                    "./src/leaflet/overlay/DataFlowLayer.js"
                ],
                "modules": [{
                    "name": "L.supermap.dataFlowService",
                    "des": "数据流服务",
                    "des_en": "iServer data flow service"
                }, {
                    "name": "L.supermap.dataFlowLayer",
                    "des": "数据流图层",
                    "des_en": "iServer data flow layer"

                }]
            }
        },

        "Overlay": {
            "title": "可视化",
            "description": "可视化与计算模块",
            "description_en": "Visualization and calculation module",

            "HeatMap": {
                "name": "HeatMap",
                "src": [
                    "./src/leaflet/overlay/HeatMapLayer.js"
                ],
                "modules": [{
                    "name": "L.supermap.heatMapLayer",
                    "des": "热力图图层",
                    "des_en": "HeatMap layer"
                }]
            },
            "EChartsLayer": {
                "name": "ECharts 图层",
                "src": [
                    "./src/leaflet/overlay/EChartsLayer.js"
                ],
                "modules": [{
                    "name": "L.supermap.echartsLayer",
                    "des": "ECharts 图层",
                    "des_en": "ECharts layer"
                }]
            },
            "GraphicLayer": {
                "name": "高效率点图层",
                "src": [
                    "./src/leaflet/overlay/GraphicLayer.js",
                    "./src/leaflet/overlay/graphic/CircleStyle.js",
                    "./src/leaflet/overlay/graphic/CloverStyle.js",
                    "./src/leaflet/overlay/graphic/ImageStyle.js",
                    "./src/leaflet/overlay/graphic/Graphic.js"
                ],
                "modules": [{
                    "name": "L.supermap.graphicLayer",
                    "des": "高效率点图层",
                    "des_en": "High efficiency point layer of graphic Layer"
                }, {
                    "name": "L.supermap.circleStyle",
                    "des": "高效率点图层圆形要素风格",
                    "des_en": "Circle style of graphic Layer"
                }, {
                    "name": "L.supermap.graphic",
                    "des": "高效率点图层高效率点对象",
                    "des_en": "Graphic object of graphic Layer"
                }, {
                    "name": "L.supermap.cloverStyle",
                    "des": "高效率点图层三叶草风格",
                    "des_en": "Clover style of graphic Layer"
                }, {
                    "name": "L.supermap.imageStyle",
                    "des": "高效率点图层符号风格",
                    "des_en": "Image style of graphic Layer"
                }]
            },

            "TileVectorLayer": {
                "name": "矢量瓦片",
                "src": [
                    './src/leaflet/overlay/TileVectorLayer.js'
                ],
                "modules": [{
                    "name": "L.supermap.tiledVectorLayer",
                    "des": "矢量瓦片图层",
                    "des_en": "Vector tile layer"
                }]
            },
            "ThemeLayer": {
                "name": "专题图",
                "src": [
                    './src/leaflet/overlay/UniqueThemeLayer.js',
                    './src/leaflet/overlay/RangeThemeLayer.js',
                    './src/leaflet/overlay/RankSymbolThemeLayer.js',
                    './src/leaflet/overlay/GraphThemeLayer.js',
                    './src/leaflet/overlay/LabelThemeLayer.js'
                ],
                "modules": [{
                    "name": "L.supermap.uniqueThemeLayer",
                    "des": "单值专题图图层",
                    "des_en": "Unique thematic map layer"
                }, {
                    "name": "L.supermap.rangeThemeLayer",
                    "des": "分段专题图图层",
                    "des_en": "Range thematic map layer"
                }, {
                    "name": "L.supermap.rankSymbolThemeLayer",
                    "des": "等级符号专题图图层",
                    "des_en": "Rank symbol thematic map layer"
                }, {
                    "name": "L.supermap.graphThemeLayer",
                    "des": "统计专题图图层",
                    "des_en": "Statistical thematic map layer"
                }, {
                    "name": "L.supermap.labelThemeLayer",
                    "des": "标签专题图图层",
                    "des_en": "Label thematic map layer"
                }]
            },
            "MapV": {
                "name": "MapV 图层",
                "src": [
                    './src/leaflet/overlay/MapVLayer.js'
                ],
                "modules": [{
                    "name": "L.supermap.mapVLayer",
                    "des": "MapV 图层",
                    "des_en": "MapV layer"
                }]
            },
            "Turf": {
                "name": "Turf 图层",
                "src": [
                    './src/leaflet/overlay/TurfLayer.js'
                ],
                "modules": [{
                    "name": "L.supermap.turfLayer",
                    "des": "Turf 图层",
                    "des_en": "Turf layer"
                }]
            },
            "UnicodeMarker.js": {
                "name": "Unicode Marker",
                "src": [
                    './src/leaflet/overlay/UnicodeMarker.js'
                ],
                "modules": [{
                    "name": "L.supermap.unicodeMarker",
                    "des": "Unicode Marker",
                    "des_en": "Unicode Marker"
                }]
            }
        },

        "Control": {
            "title": "控件",
            "description": "功能控件模块",
            "description_en": "Control module",

            "ChangeTileVersion": {
                "name": "多版本缓存切换",
                "src": [
                    "./src/leaflet/control/ChangeTileVersion.js"
                ],
                "modules": [{
                    "name": "L.supermap.control.changeTileVersion",
                    "des": "瓦片版本切换控件",
                    "des_en": "Tile version switch control"
                }]
            },
            "Logo": {
                "name": "logo控件",
                "src": [
                    "./src/leaflet/control/Logo.js"
                ],
                "modules": [{
                    "name": "L.supermap.control.logo",
                    "des": "Logo 控件",
                    "des_en": "Logo control"
                }]
            }
        },

        "Components": {
            "title": "组件",
            "description": "组件模块",
            "description_en": "Component module",

            "OpenFile": {
                "name": "打开文件组件",
                "src": [
                    "./src/leaflet/widgets/openfile/OpenFileView.js"
                ],
                "modules": [{
                    "name": "L.supermap.widgets.openFile",
                    "des": "打开文件组件",
                    "des_en": "Open file components"
                }]
            },
            "ClientComputation ": {
                "name": "客户端计算组件",
                "src": [
                    "./src/leaflet/widgets/clientcomputation/ClientComputationView.js"
                ],
                "modules": [{
                    "name": "L.supermap.widgets.clientComputation",
                    "des": "客户端计算组件",
                    "des_en": "Client computation component"
                }]
            },
            "DistributedAnalysis": {
                "name": "分布式分析组件",
                "src": [
                    "./src/leaflet/widgets/distributedanalysis/DistributedAnalysisView.js"
                ],
                "modules": [{
                    "name": "L.supermap.widgets.distributedAnalysis",
                    "des": "分布式分析组件",
                    "des_en": "Distributed analysis component"
                }]
            },
            "Search": {
                "name": "图层查询组件",
                "src": [
                    "./src/leaflet/widgets/search/SearchView.js"
                ],
                "modules": [{
                    "name": "L.supermap.widgets.search",
                    "des": "图层查询组件",
                    "des_en": "Search"
                }]
            },
            "DataFlow": {
                "name": "数据流组件",
                "src": [
                    "./src/leaflet/widgets/dataflow/DataFlowView.js"
                ],
                "modules": [{
                    "name": "L.supermap.widgets.dataFlow",
                    "des": "数据流组件",
                    "des_en": "Data flow"
                }]
            },
            "DataServiceQuery": {
                "name": "数据服务查询组件",
                "src": [
                    "./src/leaflet/widgets/dataservicequery/DataServiceQueryView.js"
                ],
                "modules": [{
                    "name": "L.supermap.widgets.dataServiceQuery",
                    "des": "数据服务查询组件",
                    "des_en": "Data service query"
                }]
            }

        }

    },

    "openlayers": {

        "Mapping": {
            "title": "地图",
            "description": "基础地图模块",
            "description_en": "Basic map module",

            "RESTMAP": {
                "name": "iServer 地图图层",
                "src": ["./src/openlayers/mapping/TileSuperMapRest.js",
                    "./src/openlayers/mapping/ImageSuperMapRest.js"
                ],
                "modules": [{
                    "name": "ol.source.TileSuperMapRest",
                    "des": "iServer tileImage 地图",
                    "des_en": "iServer tileImage resources tile layer"
                }, {
                    "name": "ol.source.ImageSuperMapRest",
                    "des": "iServer image 地图",
                    "des_en": "iServer image resources tile layer"
                }]
            },

            "Baidu": {
                "name": "百度图层",
                "src": ['./src/openlayers/mapping/BaiduMap.js'],
                "modules": [{
                    "name": "ol.source.BaiduMap",
                    "des": "百度地图",
                    "des_en": "Baidu map tile layer"
                }]
            },
            "Tianditu": {
                "name": "天地图图层",
                "src": ['./src/openlayers/mapping/Tianditu.js'],
                "modules": [{
                    "name": "ol.source.Tianditu",
                    "des": "天地图",
                    "des_en": "Tianditu map tile layer"
                }]
            },
            "SuperMapCloud": {
                "name": "超图云图层",
                "src": ['./src/openlayers/mapping/SuperMapCloud.js'],
                "modules": [{
                    "name": "ol.source.SuperMapCloud",
                    "des": "超图云地图",
                    "des_en": "SuperMap cloud map tile layer"
                }]
            },
            "iPortal": {
                "name": "iPortal webmap",
                "src": ["./src/openlayers/mapping/WebMap.js"],
                "modules": [{
                    "name": "ol.supermap.WebMap",
                    "des": "iPortal、Online 地图",
                    "des_en": "SuperMap iPortal and Online tile layer"
                }]
            }
        },
        "Services": {
            "title": "服务",
            "description": "服务模块",
            "description_en": "Service module",

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
                    "des": "地图信息服务",
                    "des_en": "iServer map service"
                }, {
                    "name": "ol.supermap.QueryService",
                    "des": "地图查询服务",
                    "des_en": "iServer map query service"
                }, {
                    "name": "ol.supermap.LayerInfoService",
                    "des": "图层信息服务",
                    "des_en": "iServer layer information service"
                }, {
                    "name": "ol.supermap.MeasureService",
                    "des": "测量服务",
                    "des_en": "iServer measure service"
                }, {
                    "name": "ol.supermap.ChartService",
                    "des": "海图服务",
                    "des_en": "iServer chart service"
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
                    "des": "数据集服务",
                    "des_en": "iServer feature service"
                }, {
                    "name": "ol.supermap.FieldService",
                    "des": "字段服务",
                    "des_en": "iServer field service"
                }, {
                    "name": "ol.supermap.GridCellInfosService",
                    "des": "数据栅格查询服务",
                    "des_en": "iServer data grid cell information service"
                }]
            },
            "Theme": {
                "name": "服务器专题图服务",
                "src": [
                    "./src/openlayers/services/ThemeService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.ThemeService",
                    "des": "专题图服务",
                    "des_en": "iServer thematic service"
                }]
            },
            "NetworkAnalyst": {
                "name": "网络分析服务",
                "src": [
                    "./src/openlayers/services/NetworkAnalystService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.NetworkAnalystService",
                    "des": "网络分析服务",
                    "des_en": "iServer network analyst service"
                }]
            },
            "NetworkAnalyst3D": {
                "name": "3D网络分析服务",
                "src": [
                    "./src/openlayers/services/NetworkAnalyst3DService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.NetworkAnalyst3DService",
                    "des": "3D 网络分析服务",
                    "des_en": "iServer 3D network analyst service"
                }]
            },
            "SpatialAnalyst": {
                "name": "空间分析服务",
                "src": [
                    "./src/openlayers/services/SpatialAnalystService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.SpatialAnalystService",
                    "des": "空间分析服务",
                    "des_en": "iServer spatial analyst service"
                }]
            },
            "TrafficTransferAnalyst": {
                "name": "交通换乘分析服务",
                "src": [
                    "./src/openlayers/services/TrafficTransferAnalystService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.TrafficTransferAnalystService",
                    "des": "交通换乘服务",
                    "des_en": "iServer traffic transfer analyst service"
                }]
            },
            "iPortal": {
                "name": "iPortal服务",
                "src": [
                    "./src/common/iPortal/iPortal.js"
                ],
                "modules": [{
                    "name": "SuperMap.iPortal",
                    "des": "iPortal 服务",
                    "des_en": "SuperMap iPortal service"
                }]
            },
            "Online": {
                "name": "Online服务",
                "src": [
                    "./src/common/online/Online.js"
                ],
                "modules": [{
                    "name": "SuperMap.Online",
                    "des": "Online 服务",
                    "des_en": "SuperMap Online service"
                }]
            },
            "iManager": {
                "name": "iManager服务",
                "src": [
                    "./src/common/iManager/iManager.js"
                ], "modules": [{
                    "name": "SuperMap.iManager",
                    "des": "iManager 服务",
                    "des_en": "SuperMap iManager service"
                }]
            },
            "ProcessingService": {
                "name": "分布式分析服务",
                "src": [
                    "./src/openlayers/services/ProcessingService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.ProcessingService",
                    "des": "分布式分析服务",
                    "des_en": "iServer distributed analyst service"
                }]
            },
            "AddressMatch": {
                "name": "地址匹配服务",
                "src": [
                    "./src/openlayers/services/AddressMatchService.js"
                ],
                "modules": [{
                    "name": "ol.supermap.AddressMatchService",
                    "des": "地址匹配服务",
                    "des_en": "iServer address match service"
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
                    "des": "ElasticSearch 服务",
                    "des_en": "ElasticSearch service"
                }]
            },
            "DataFlow": {
                "name": "数据流服务",
                "src": [
                    "./src/openlayers/services/DataFlowService.js",
                    "./src/openlayers/overlay/DataFlow.js"
                ],
                "modules": [{
                    "name": "ol.supermap.DataFlowService",
                    "des": "数据流服务",
                    "des_en": "iServer data flow service"
                }, {
                    "name": "ol.source.DataFlow",
                    "des": "数据流源",
                    "des_en": "iServer data flow layer"
                }]
            }
        },
        "Overlay": {
            "title": "可视化",
            "description": "可视化与计算模块",
            "description_en": "Visualization and calculation module",

            "HeatMap": {
                "name": "热力图图层源",
                "src": [
                    "./src/openlayers/overlay/HeatMap.js"
                ],
                "modules": [{
                    "name": "ol.source.HeatMap",
                    "des": "热力图图层源",
                    "des_en": "Heatmap source"
                }]
            },
            "Graphic": {
                "name": "高效率点图层源",
                "src": [
                    "./src/openlayers/overlay/Graphic.js",
                    "./src/openlayers/overlay/graphic/CloverShape.js"
                ],
                "modules": [{
                    "name": "ol.source.Graphic",
                    "des": "高效率点图层源",
                    "des_en": "High efficiency point source"
                }, {
                    "name": "ol.style.CloverShape ",
                    "des": "高效率点图层源三叶草风格",
                    "des_en": "Clover style of graphic source"
                }]
            },
            "VectorTile": {
                "name": "矢量瓦片图层源",
                "src": [
                    "./src/openlayers/overlay/VectorTileSuperMapRest.js",
                    "./src/openlayers/overlay/vectortile/MapboxStyles.js",
                    "./src/openlayers/overlay/vectortile/VectorTileStyles.js"
                ],
                "modules": [{
                    "name": "ol.source.VectorTileSuperMapRest",
                    "des": "矢量瓦片图层源",
                    "des_en": "Vector tile source"
                }, {
                    "name": "ol.supermap.MapboxStyles",
                    "des": "Mapbox 矢量瓦片风格",
                    "des_en": "Mapbox vector tile style"
                }, {
                    "name": "ol.supermap.VectorTileStyles",
                    "des": "矢量瓦片风格",
                    "des_en": "Vector tile style"
                }]
            },
            "Theme": {
                "name": "专题图图层源",
                "src": [
                    "./src/openlayers/overlay/Unique.js",
                    "./src/openlayers/overlay/Range.js",
                    "./src/openlayers/overlay/RankSymbol.js",
                    "./src/openlayers/overlay/Graph.js",
                    "./src/openlayers/overlay/Label.js"
                ],
                "modules": [{
                    "name": "ol.source.Unique",
                    "des": "单值专题图图层源",
                    "des_en": "Unique thematic map source"
                }, {
                    "name": "ol.source.RankSymbol",
                    "des": "符号等级专题图图层源",
                    "des_en": "Rank symbol thematic map source"
                }, {
                    "name": "ol.source.Range",
                    "des": "分段专题图图层源",
                    "des_en": "Range thematic map source"
                }, {
                    "name": "ol.source.Graph",
                    "des": "统计专题图图层源",
                    "des_en": "Statistical thematic map source"
                }, {
                    "name": "ol.source.Label",
                    "des": "标签专题图图层源",
                    "des_en": "Label thematic map source"
                }]
            },
            "MapV": {
                "name": "MapV source",
                "src": [
                    "./src/openlayers/overlay/Mapv.js"
                ],
                "modules": [{
                    "name": "ol.source.Mapv",
                    "des": "MapV 图层源",
                    "des_en": "MapV source"
                }]
            },
            "Turf": {
                "name": "Turf source",
                "src": [
                    "./src/openlayers/overlay/Turf.js"
                ],
                "modules": [{
                    "name": "ol.source.Turf",
                    "des": "Turf 图层源",
                    "des_en": "Turf source"
                }]
            }
        },
        "Control": {
            "title": "控件",
            "description": "功能控件模块",
            "description_en": "Control module",

            "ChangeTileVersion": {
                "name": "多版本缓存切换",
                "src": [
                    "./src/openlayers/control/ChangeTileVersion.js"
                ],
                "modules": [{
                    "name": "ol.supermap.control.ChangeTileVersion",
                    "des": "瓦片版本切换控件",
                    "des_en": "Tile version switch control"
                }]
            },
            "Logo": {
                "name": "logo控件",
                "src": [
                    "./src/openlayers/control/Logo.js"
                ],
                "modules": [{
                    "name": "ol.supermap.control.Logo",
                    "des": "Logo 控件",
                    "des_en": "Logo control"
                }]
            }
        }
    },

    "mapboxgl": {
        "Mapping": {
            "title": "地图",
            "description": "基础地图模块",
            "description_en": "Basic map module",
            "iPortal": {
                "name": "iPortal webmap",
                "src": ["./src/mapboxgl/mapping/WebMap.js"],
                "modules": [{
                    "name": "mapboxgl.supermap.WebMap",
                    "des": "iPortal、Online 地图",
                    "des_en": "SuperMap iPortal and Online tile layer"
                }]
            }
        },
        "Services": {
            "title": "服务",
            "description": "服务模块",
            "description_en": "Service module",

            "Map": {
                "name": "地图服务",
                "src": [
                    "./src/mapboxgl/services/MapService.js",
                    "./src/mapboxgl/services/LayerInfoService.js",
                    "./src/mapboxgl/services/ChartService.js",
                    "./src/mapboxgl/services/QueryService.js",
                    "./src/mapboxgl/services/MeasureService.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.LayerInfoService",
                    "des": "图层信息服务",
                    "des_en": "iServer layer information service"
                }, {
                    "name": "mapboxgl.supermap.MapService",
                    "des": "地图服务",
                    "des_en": "iServer map service"
                }, {
                    "name": "mapboxgl.supermap.ChartService",
                    "des": "海图服务",
                    "des_en": "iServer chart service"
                }, {
                    "name": "mapboxgl.supermap.QueryService",
                    "des": "查询服务",
                    "des_en": "iServer map query service"
                }, {
                    "name": "mapboxgl.supermap.MeasureService",
                    "des": "测量服务",
                    "des_en": "iServer measure service"
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
                    "des": "数据集服务",
                    "des_en": "iServer feature service"
                }, {
                    "name": "mapboxgl.supermap.FieldService",
                    "des": "字段服务",
                    "des_en": "iServer field service"
                }, {
                    "name": "mapboxgl.supermap.GridCellInfosService",
                    "des": "数据栅格查询服务",
                    "des_en": "iServer data grid cell information service"
                }]
            },
            "SpatialAnalyst": {
                "name": "空间分析服务",
                "src": [
                    "./src/mapboxgl/services/SpatialAnalystService.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.SpatialAnalystService",
                    "des": "空间分析服务",
                    "des_en": "iServer spatial analyst service"
                }]
            },
            "ProcessingService": {
                "name": "分布式分析服务",
                "src": [
                    "./src/mapboxgl/services/ProcessingService.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.ProcessingService",
                    "des": "分布式分析服务",
                    "des_en": "iServer distributed analyst service"
                }]
            },
            "AddressMatch": {
                "name": "地址匹配服务",
                "src": [
                    "./src/mapboxgl/services/AddressMatchService.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.AddressMatchService",
                    "des": "地址匹配服务",
                    "des_en": "iServer address match service"
                }]
            },

            "Theme": {
                "name": "服务器专题图服务",
                "src": [
                    "./src/mapboxgl/services/ThemeService.js"

                ],
                "modules": [{
                    "name": "mapboxgl.supermap.ThemeService",
                    "des": "服务器专题图服务",
                    "des_en": "iServer thematic service"
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
                    "des": "ElasticSearch 服务",
                    "des_en": "ElasticSearch service"
                }]
            },
            "DataFlow": {
                "name": "数据流服务",
                "src": [
                    "./src/mapboxgl/services/DataFlowService.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.DataFlowService",
                    "des": "数据流服务",
                    "des_en": "iServer data flow service"
                }]
            },
            "NetworkAnalyst": {
                "name": "网络分析服务",
                "src": [
                    "./src/mapboxgl/services/NetworkAnalystService.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.NetworkAnalystService",
                    "des": "网络分析服务",
                    "des_en": "iServer network analyst service"
                }]
            },
            "NetworkAnalyst3D": {
                "name": "3D网络分析服务",
                "src": [
                    "./src/mapboxgl/services/NetworkAnalyst3DService.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.NetworkAnalyst3DService",
                    "des": "3D 网络分析服务",
                    "des_en": "iServer 3D network analyst service"
                }]
            },
            "TrafficTransferAnalyst": {
                "name": "交通换乘服务",
                "src": [
                    "./src/mapboxgl/services/TrafficTransferAnalystService.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.TrafficTransferAnalystService",
                    "des": "交通换乘服务",
                    "des_en": "iServer traffic transfer analyst service"
                }]
            }
        },
        "Overlay": {
            "title": "可视化",
            "description": "可视化与计算模块",
            "description_en": "Visualization and calculation module",

            "HeatMap": {
                "name": "HeatMap",
                "src": [
                    "./src/mapboxgl/overlay/HeatMapLayer.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.HeatMapLayer",
                    "des": "热力图图层",
                    "des_en": "HeatMap layer"
                }]
            },
            "GraphicLayer": {
                "name": "高效率点图层",
                "src": [
                    "./src/mapboxgl/overlay/GraphicLayer.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.GraphicLayer",
                    "des": "高效率点图层",
                    "des_en": "High efficiency point layer"
                }]
            },
            "MapV": {
                "name": "MapV",
                "src": [
                    "./src/mapboxgl/overlay/MapvLayer.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.MapvLayer",
                    "des": "MapV 图层",
                    "des_en": "MapV layer"
                }]
            },
            "Three": {
                "name": "three",
                "src": [
                    "./src/mapboxgl/overlay/ThreeLayer.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.ThreeLayer",
                    "des": "ThreeJS 图层",
                    "des_en": "ThreeJS layer"
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
                    "./src/mapboxgl/overlay/GraphThemeLayer.js",
                    "./src/mapboxgl/overlay/LabelThemeLayer.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.RangeTheme3DLayer",
                    "des": "三维分段专题图",
                    "des_en": "3D range thematic map layer"
                }, {
                    "name": "mapboxgl.supermap.UniqueTheme3DLayer",
                    "des": "三维单值专题图",
                    "des_en": "3D unique thematic map layer"
                }, {
                    "name": "mapboxgl.supermap.RangeThemeLayer",
                    "des": "分段专题图",
                    "des_en": "Range thematic map layer"
                }, {
                    "name": "mapboxgl.supermap.UniqueThemeLayer",
                    "des": "单值专题图",
                    "des_en": "Unique thematic map layer"
                }, {
                    "name": "mapboxgl.supermap.RankSymbolThemeLayer",
                    "des": "等级符号专题图",
                    "des_en": "Rank symbol thematic map layer"
                }, {
                    "name": "mapboxgl.supermap.GraphThemeLayer",
                    "des": "统计专题图",
                    "des_en": "Statistical thematic map layer"
                }, {
                    "name": "mapboxgl.supermap.LabelThemeLayer",
                    "des": "标签专题图",
                    "des_en": "Label thematic map layer"
                }]

            },
            "DECK.GL": {
                "name": "DECK.GL 图层",
                "src": [
                    "./src/mapboxgl/overlay/DeckglLayer.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.DeckglLayer",
                    "des": "DECK.GL 图层",
                    "des_en": "DECK.GL layer"
                }]
            }
        },
        "Control": {
            "title": "控件",
            "description": "功能控件模块",
            "description_en": "Control module",

            "Logo": {
                "name": "logo控件",
                "src": [
                    "./src/mapboxgl/control/Logo.js"
                ],
                "modules": [{
                    "name": "mapboxgl.supermap.LogoControl",
                    "des": "Logo 控件",
                    "des_en": "Logo control"
                }]
            }
        }
    },

    "classic": {
        "Services": {
            "title": "服务",
            "description": "服务模块",
            "description_en": "Service module",

            "ProcessingService": {
                "name": "分布式分析服务",
                "src": [
                    "./src/classic/services/ProcessingService.js"
                ],
                "modules": [{
                    "name": "SuperMap.REST.ProcessingService",
                    "des": "分布式分析服务",
                    "des_en": "iServer distributed analyst service"
                }]
            },
            "AddressMatch": {
                "name": "地址匹配服务",
                "src": [
                    "./src/classic/services/AddressMatchService.js"
                ],
                "modules": [{
                    "name": "SuperMap.REST.AddressMatchService",
                    "des": "地址匹配服务",
                    "des_en": "iServer address match service"
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
                    "des": "ElasticSearch 服务",
                    "des_en": "ElasticSearch service"
                }]
            }
        },
        "Overlay": {
            "title": "可视化",
            "description": "可视化与计算模块",
            "description_en": "Visualization and calculation module",

            "MapV": {
                "name": "MapV",
                "src": [
                    "./src/classic/overlay/MapVLayer.js"
                ],
                "modules": [{
                    "name": "SuperMap.Layer.MapVLayer",
                    "des": "MapV 图层",
                    "des_en": "MapV layer"
                }]
            }
        }
    }
};