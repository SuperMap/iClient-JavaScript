/**
 * iClient3D 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */
var exampleConfig = {
    "iClient3D": {
        name: "iClient3D",
        content: {
            "3D": {
                name: "3D",
                content: [
                    {
                        name: "三维场景",
                        thumbnail: "3D_Map.png",
                        fileName: "01_3DMap"
                    }
                ]
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
    "iClient3D": "fa-globe"
};