var deps = {
	"Core" : {
		"format" : [
			"../src/Core/format/Format.js",
			"../src/Core/format/GeoJSON.js",
			"../src/Core/format/JSON.js"
		],
		// "iManager" : [],
		// "iPortal":[],
		"iServer" : [
			"../src/Core/iServer/FieldStatisticService.js",
			"../src/Core/iServer/GetFeaturesByBoundsService.js",
			"../src/Core/iServer/GetFeaturesByBufferService.js",
			"../src/Core/iServer/GetFeaturesByGeometryService.js",
			"../src/Core/iServer/GetFeaturesByIDsService.js",
			"../src/Core/iServer/GetFeaturesBySQLService.js",
			"../src/Core/iServer/GetFieldsService.js",
			"../src/Core/iServer/GetLayersInfoService.js",
			"../src/Core/iServer/MapService.js",
			"../src/Core/iServer/QueryByBoundsService.js",
			"../src/Core/iServer/QueryService.js"
		],
		// "online" : []
	},
	"Leaflet" : {
		// "OGC" : {
		// 	"title" : "OGC",
		// 	"description" : "--对接OGC标准服务"
		// },
		"SuperMap" : {
			"title" : "SuperMap",
			"description" : "--对接SuperMap服务",
			"Map" : [
				"../src/Leaflet/SuperMap/iServer/TiledMapLayer.js",
				"../src/Leaflet/SuperMap/iServer/MapService.js",
				"../src/Leaflet/SuperMap/iServer/QueryByBoundsService.js",
				"../src/Leaflet/SuperMap/iServer/GetLayersInfoService.js"
			],
			"Data" : [
				"../src/Leaflet/SuperMap/iServer/FieldStatisticService.js",
				"../src/Leaflet/SuperMap/iServer/GetFeaturesByBoundsService.js",
				"../src/Leaflet/SuperMap/iServer/GetFeaturesByBufferService.js",
				"../src/Leaflet/SuperMap/iServer/GetFeaturesByGeometryService.js",
				"../src/Leaflet/SuperMap/iServer/GetFeaturesByIDsService.js",
				"../src/Leaflet/SuperMap/iServer/GetFeaturesBySQLService.js",
				"../src/Leaflet/SuperMap/iServer/GetFieldsService.js"
			],
		},
		"Visual" : {
			"title" : "Visual",
			"description" : "--可视化库",
			"AnimatorVector" : [
				"../src/Leaflet/Visual/AnimatorVector.js"
			],
			"HeatGridLayer" : [
				"../src/Leaflet/Visual/HeatGridLayer.js"
			],
			"HeatMapLayer" : [
				"../src/Leaflet/Visual/HeatMapLayer.js"
			],
			"VectorLayer" : [
				"../src/Leaflet/Visual/VectorLayer.js"
			]
		}
	},
	"OL3" : {
		// "OGC" : {
		// 	"title" : "OGC",
		// 	"description" : "--对接OGC标准服务"
		// },
		// "SuperMap" : {
		// 	"title" : "SuperMap",
		// 	"description" : "--对接SuperMap服务"
		// },
		"Visual" : {
			"title" : "Visual",
			"description" : "--可视化",
			"AnimatorVector" : [
				"../src/OL3/Visual/AnimatorVector.js"
			],
			"HeatGridLayer" : [
				"../src/OL3/Visual/HeatGridLayer.js"
			],
			"HeatMapLayer" : [
				"../src/OL3/Visual/HeatMapLayer.js"
			],
			"VectorLayer" : [
				"../src/OL3/Visual/VectorLayer.js"
			]
		}
	}
}
module.exports = deps;