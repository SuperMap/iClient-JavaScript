/**
 * classic 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */
var identification = {
    name: "iClient Classic"
};

var exampleConfig = {
    "iServer": {
        name: "iServer",
        content: {
            "map": {
                name: "地图",
                content: [{
                    name: "4326底图",
                    thumbnail: "4326Map.png",
                    fileName: "4326Map"
                }, {
                    name: "3857底图",
                    thumbnail: "3857Map.png",
                    fileName: "3857Map"
                }, {
                    name: "平面坐标系图层",
                    thumbnail: "changchunMap.png",
                    fileName: "changchunMap"

                }, {
                    name: "SuperMap 云图层",
                    thumbnail: "cloudLayer.png",
                    fileName: "cloudLayer"
                }, {
                    name: "Image图层",
                    thumbnail: "image.png",
                    fileName: "image"
                }, {
                    name: "图层叠加",
                    thumbnail: "overlayLayer.png",
                    fileName: "overlayLayer"

                }, {
                    name: "动态图层",
                    thumbnail: "dynamiclayers.png",
                    fileName: "dynamiclayers"

                }]
            },
            "processingService": {
                name: "分布式分析",
                content: [{
                    name: "密度分析",
                    thumbnail: "kernelDensityJobService.png",
                    fileName: "kernelDensityJobService"
                }, {
                    name: "点聚合分析",
                    thumbnail: "SummaryMeshJobService.png",
                    fileName: "SummaryMeshJobService"
                }, {
                    name: "单对象查询分析",
                    thumbnail: "lg_singleObjectQueryJob.png",
                    fileName: "singleObjectQueryJobService"

                }, {
                    name: "区域汇总分析",
                    thumbnail: "SummaryRegionJobService.png",
                    fileName: "SummaryRegionJobService"
                }, {
                    name: "矢量裁剪分析",
                    thumbnail: "lg_vectorClipJob.png",
                    fileName: "vectorClipJobService"
                }, {
                    name: "叠加分析",
                    thumbnail: "lg_overlayJobService.png",
                    fileName: "overlayGeoJobService"
                }]
            },
            "addressMatch": {
                name: "地址匹配",
                content: [{
                    name: "地址匹配",
                    thumbnail: "addressMatchService.png",
                    fileName: "addressMatchService"
                }]
            }
        }
    },
    "viz": {
        name: "可视化",
        content: {
            "MapV": {
                name: "MapV",
                content: [{
                    name: "蜂巢图",
                    thumbnail: "lg_mapVLayer_honeycomb.png",
                    fileName: "mapVLayerHoneycomb"
                }, {
                    name: "简单线",
                    thumbnail: "lg_mapVLayer_polylineSimple.png",
                    fileName: "mapVLayerPolylineSimple"
                }]
            }

        }
    }
};
/**
 *key值：为exampleConfig配置的key值或者fileName值
 *      （为中间节点时是key值，叶结点是fileName值）
 *value值：fontawesome字体icon名
 *不分层
 */
var sideBarIconConfig = {
    "iServer": "fa-server",
    "viz": "fa-map",
};

/**
 *key值：为exampleConfig配置的key值
 *value值：fontawesome字体icon名
 *与sideBarIconConfig的区别：sideBarIconConfig包括侧边栏所有层级目录的图标，exampleIconConfig仅包括一级标题的图标
 */
var exampleIconConfig = {
    "iServer": "fa-server",
    "viz": "fa-map",
};