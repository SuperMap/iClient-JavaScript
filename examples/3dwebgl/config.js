/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.*/
/**
 * 3D-WebGL 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */
var identification = {
    name: "3D-WebGL"
};

var exampleConfig = {
    "3D-WebGL": {
        name: "3D-WebGL",
        name_en: "3D-WebGL",
        content: {
            "3D": {
                name: "3D",
                name_en: "3D",
                content: [
                    {
                        name: "三维场景",
                        name_en: "3D map",
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
    "3D-WebGL": "fa-globe"
};

/**
 *key值：为exampleConfig配置的key值
 *value值：fontawesome字体icon名
 *与sideBarIconConfig的区别：sideBarIconConfig包括侧边栏所有层级目录的图标，exampleIconConfig仅包括一级标题的图标
 */
var exampleIconConfig = {
    "3D-WebGL": "fa-globe"
};