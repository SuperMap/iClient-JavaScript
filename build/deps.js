var deps = {
    "Core": {
        "format": [
            "./src/Core/format/Format.js",
            "./src/Core/format/GeoJSON.js",
            "./src/Core/format/JSON.js"
        ],
        // "iManager" : [],
        // "iPortal":[],
        "iServer": [
            //Data
            "./src/Core/iServer/FieldStatisticService.js",
            "./src/Core/iServer/GetFeaturesByBoundsService.js",
            "./src/Core/iServer/GetFeaturesByBufferService.js",
            "./src/Core/iServer/GetFeaturesByGeometryService.js",
            "./src/Core/iServer/GetFeaturesByIDsService.js",
            "./src/Core/iServer/GetFeaturesBySQLService.js",
            "./src/Core/iServer/GetFieldsService.js",
            "./src/Core/iServer/GetGridCellInfosService.js",
            "./src/Core/iServer/EditFeaturesService.js",
            //Map
            "./src/Core/iServer/GetLayersInfoService.js",
            "./src/Core/iServer/MapService.js",
            "./src/Core/iServer/ChartQueryService.js",
            "./src/Core/iServer/QueryByDistanceService.js",
            "./src/Core/iServer/QueryByGeometryService.js",
            "./src/Core/iServer/QueryBySQLService.js",
            "./src/Core/iServer/QueryByBoundsService.js",
            "./src/Core/iServer/QueryService.js",
            "./src/Core/iServer/TilesetsService.js",
            "./src/Core/iServer/MeasureService.js",
            "./src/Core/iServer/ChartFeatureInfoSpecsService.js",
            "./src/Core/iServer/SetLayerInfoService.js",
            "./src/Core/iServer/SetLayersInfoService.js",
            "./src/Core/iServer/SetLayerStatusService.js",
            //NetworkAnalyst
            "./src/Core/iServer/BurstPipelineAnalystService.js",
            "./src/Core/iServer/ComputeWeightMatrixService.js",
            "./src/Core/iServer/FacilityAnalystStreamService.js",
            "./src/Core/iServer/FindClosestFacilitiesService.js",
            "./src/Core/iServer/FindLocationService.js",
            "./src/Core/iServer/FindMTSPPathsService.js",
            "./src/Core/iServer/FindPathService.js",
            "./src/Core/iServer/FindServiceAreasService.js",
            "./src/Core/iServer/FindTSPPathsService.js",
            "./src/Core/iServer/UpdateEdgeWeightService.js",
            "./src/Core/iServer/UpdateTurnNodeWeightService.js",
            //NetworkAnalyst3D
            "./src/Core/iServer/FacilityAnalystSinks3DService.js",
            "./src/Core/iServer/FacilityAnalystSources3DService.js",
            "./src/Core/iServer/FacilityAnalystTracedown3DService.js",
            "./src/Core/iServer/FacilityAnalystTraceup3DService.js",
            "./src/Core/iServer/FacilityAnalystUpstream3DService.js",
            //TrafficTransferAnalyst
            "./src/Core/iServer/StopQueryService.js",
            "./src/Core/iServer/TransferPathService.js",
            "./src/Core/iServer/TransferSolutionService.js",
            //SpatialAnalyst
            "./src/Core/iServer/AreaSolarRadiationService.js",
            "./src/Core/iServer/BufferAnalystService.js",
            "./src/Core/iServer/DensityAnalystService.js",
            "./src/Core/iServer/GenerateSpatialDataService.js",
            "./src/Core/iServer/GeoRelationAnalystService.js",
            "./src/Core/iServer/InterpolationAnalystService.js",
            "./src/Core/iServer/MathExpressionAnalysisService.js",
            "./src/Core/iServer/OverlayAnalystService.js",
            "./src/Core/iServer/RouteCalculateMeasureService.js",
            "./src/Core/iServer/RouteLocatorService.js",
            "./src/Core/iServer/SurfaceAnalystService.js",
            "./src/Core/iServer/TerrainCurvatureCalculationService.js",
            "./src/Core/iServer/ThiessenAnalystService.js"

        ],
        // "online" : []
    },
    "Leaflet": {
        "OGC": {
            "title": "OGC",
            "description": "--对接OGC标准服务"
        },
        "SuperMap": {
            "title": "SuperMap",
            "description": "--对接SuperMap服务",
            "Map": {
                "name": "Map服务",
                "src": [
                    "./src/Leaflet/SuperMap/iServer/TiledMapLayer.js",
                    "./src/Leaflet/SuperMap/iServer/MapService.js",
                    "./src/Leaflet/SuperMap/iServer/QueryByBoundsService.js",
                    "./src/Leaflet/SuperMap/iServer/GetLayersInfoService.js"
                ]
            },
            "Data": {
                "name": "Data服务",
                "src": [
                    "./src/Leaflet/SuperMap/iServer/FieldStatisticService.js",
                    "./src/Leaflet/SuperMap/iServer/GetFeaturesService.js",
                    "./src/Leaflet/SuperMap/iServer/GetFieldsService.js"
                ]
            }
        },
        "Visual": {
            "title": "Visual",
            "description": "--可视化",
            // "AnimatorVector": {
            //     "name": "时空数据图层",
            //     "src": [
            //         "./src/Leaflet/Visual/AnimatorVector.js"
            //     ]
            // },
            // "HeatGridLayer": {
            //     "name": "热点格网图层",
            //     "src": [
            //         "./src/Leaflet/Visual/HeatGridLayer.js"
            //     ]
            // },
            // "HeatMapLayer": {
            //     "name": "热点图层",
            //     "src": [
            //         "./src/Leaflet/Visual/HeatMapLayer.js"
            //     ]
            // },
            // "VectorLayer": {
            //     "name": "矢量图层",
            //     "src": [
            //         "./src/Leaflet/Visual/VectorLayer.js"
            //     ]
            // }
        }
    },
    "OL3": {
        "OGC": {
            "title": "OGC",
            "description": "--对接OGC标准服务"
        },
        "SuperMap": {
            "title": "SuperMap",
            "description": "--对接SuperMap服务",
            "Map": {
                "name": "Map服务",
                "src": [
                    "./src/OL3/SuperMap/iServer/TiledMapLayer.js",
                    "./src/OL3/SuperMap/iServer/MapService.js",
                    "./src/OL3/SuperMap/iServer/QueryByBoundsService.js",
                    "./src/OL3/SuperMap/iServer/GetLayersInfoService.js"
                ]
            },
            "Data": {
                "name": "Data服务",
                "src": [
                    "./src/OL3/SuperMap/iServer/FieldStatisticService.js",
                    "./src/OL3/SuperMap/iServer/GetFeaturesService.js",
                    "./src/OL3/SuperMap/iServer/GetFieldsService.js"
                ]
            }
        },
        "Visual": {
            "title": "Visual",
            "description": "--可视化",
            // "AnimatorVector": {
            //     "name": "时空数据图层",
            //     "src": [
            //         "./src/OL3/Visual/AnimatorVector.js"
            //     ]
            // },
            // "HeatGridLayer": {
            //     "name": "热点格网图层",
            //     "src": [
            //         "./src/OL3/Visual/HeatGridLayer.js"
            //     ]
            // },
            // "HeatMapLayer": {
            //     "name": "热点图层",
            //     "src": [
            //         "./src/OL3/Visual/HeatMapLayer.js"
            //     ]
            // },
            // "VectorLayer": {
            //     "name": "矢量图层",
            //     "src": [
            //         "./src/OL3/Visual/VectorLayer.js"
            //     ]
            // }
        }
    }
}
module.exports = deps;