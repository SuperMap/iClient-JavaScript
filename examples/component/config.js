/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.*/
/**
 * component 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */
var identification = {
  name: 'component'
};

var exampleConfig = {
  vuecomponents_mbgl: {
    name: 'Vue - MapboxGL',
    name_en: 'Vue - MapboxGL',
    content: {
      map: {
        name: '地图',
        name_en: 'Map',
        content: [
          {
            name: 'iServer 地图',
            name_en: 'iServer Map',
            version: '10.0.0',
            thumbnail: 'components_map_vue.png',
            fileName: 'components_map_vue'
          },
          {
            name: 'iPortal 地图',
            name_en: 'iPortal Map',
            version: '10.0.0',
            thumbnail: 'components_webmap.png',
            fileName: 'components_webmap_vue',
            localIgnore: true
          },
          {
            name: '栅格图层',
            name_en: 'Raster Layer',
            version: '10.0.0',
            thumbnail: 'components_rasterLayer_vue.png',
            fileName: 'components_raster_vue',
            localIgnore: true
          },
          {
            name: '矢量瓦片图层',
            name_en: 'Vector Tile Layer',
            version: '10.0.0',
            thumbnail: 'components_vector_tile_vue.png',
            fileName: 'components_vector_tile_vue',
            localIgnore: true
          },
          {
            name: '地图卷帘',
            name_en: 'Map Compare',
            version: '10.1.0',
            thumbnail: 'components_compare_vue.png',
            fileName: 'components_compare_vue',
            localIgnore: true
          }
        ]
      },
      map_subcomponent: {
        name: '地图子组件',
        name_en: 'Map subcomponent',
        content: [
          {
            name: '图层列表',
            name_en: 'LayerList',
            version: '10.0.0',
            thumbnail: 'components_layerList_vue.png',
            fileName: 'components_layerList_vue',
            localIgnore: true
          },
          {
            name: '鹰眼',
            name_en: 'Minimap',
            version: '10.0.0',
            thumbnail: 'components_minimap_vue.png',
            fileName: 'components_minimap_vue',
            localIgnore: true
          },
          {
            name: '平移',
            name_en: 'Pan',
            version: '10.0.0',
            thumbnail: 'components_pan_vue.png',
            fileName: 'components_pan_vue',
            localIgnore: true
          },
          {
            name: '比例尺',
            name_en: 'Scale',
            version: '10.0.0',
            thumbnail: 'components_scale_vue.png',
            fileName: 'components_scale_vue',
            localIgnore: true
          },
          {
            name: '缩放',
            name_en: 'Zoom',
            version: '10.0.0',
            thumbnail: 'components_zoom_vue.png',
            fileName: 'components_zoom_vue',
            localIgnore: true
          },
          {
            name: '图例',
            name_en: 'Legend',
            version: '10.0.0',
            thumbnail: 'components_legend_vue.png',
            fileName: 'components_legend_vue',
            localIgnore: true
          },
          {
            name: '查询',
            name_en: 'Query',
            version: '10.0.0',
            thumbnail: 'components_query_vue.png',
            fileName: 'components_query_vue',
            localIgnore: true
          },
          {
            name: '搜索',
            name_en: 'Search',
            version: '10.0.0',
            thumbnail: 'components_search_vue.png',
            fileName: 'components_search_vue',
            localIgnore: true
          },
          {
            name: '量算',
            name_en: 'Measure',
            version: '10.0.0',
            thumbnail: 'components_measure_vue.png',
            fileName: 'components_measure_vue',
            localIgnore: true
          },
          {
            name: '打开文件',
            name_en: 'Open File',
            version: '10.0.0',
            thumbnail: 'components_openfile_vue.png',
            fileName: 'components_openfile_vue'
          },
          {
            name: '点选查询',
            name_en: 'Identify',
            version: '10.0.1',
            thumbnail: 'components_identify_vue.png',
            fileName: 'components_identify_vue'
          },
          {
            name: '图层管理',
            name_en: 'Layer Manager',
            version: '10.0.1',
            thumbnail: 'components_layerManager_vue.png',
            fileName: 'components_layerManager_vue'
          },
          {
            name: '指南针',
            name_en: 'Compass',
            version: '10.1.2',
            thumbnail: 'components_compass_vue.png',
            fileName: 'components_compass_vue'
          },
          {
            name: '绘制',
            name_en: 'Draw',
            version: '10.1.2',
            thumbnail: 'components_draw_vue.png',
            fileName: 'components_draw_vue'
          },
          {
            name: '坐标转换',
            name_en: 'Coordinate Conversion',
            version: '10.1.2',
            thumbnail: 'components_coordinate_conversion_vue.png',
            fileName: 'components_coordinate_conversion_vue'
          },
          {
            name: '飞行定位',
            name_en: 'Fly To',
            version: '10.1.2',
            thumbnail: 'components_flyTo_vue.png',
            fileName: 'components_flyto_vue'
          },
          {
            name: '图层颜色',
            name_en: 'Layer Color',
            version: '10.1.2',
            thumbnail: 'components_layer_color_vue.png',
            fileName: 'components_layer_color_vue'
          },
          {
            name: '属性表',
            name_en: 'Attributes',
            version: '10.1.2',
            thumbnail: 'components_attributes_vue.png',
            fileName: 'components_attributes_vue'
          }
        ]
      },
      tdtmap_subcomponent: {
        name: '天地图子组件',
        name_en: 'Tianditu subcomponent',
        localIgnore: true,
        content: [
          {
            name: '天地图',
            name_en: 'Tianditu',
            version: '10.0.0',
            localIgnore: true,
            thumbnail: 'components_Tianditu_vue.png',
            fileName: 'components_tianditu_vue'
          },
          {
            name: '路线规划',
            name_en: 'Route Plan',
            version: '10.0.0',
            localIgnore: true,
            thumbnail: 'components_Tianditu_route_vue.png',
            fileName: 'components_tianditu_route_vue'
          },
          {
            name: 'POI搜索',
            name_en: 'POI Search',
            version: '10.0.0',
            localIgnore: true,
            thumbnail: 'components_Tianditu_search_vue.png',
            fileName: 'components_tianditu_search_vue'
          },
          {
            name: '天地图切换',
            name_en: 'Switcher',
            version: '10.0.0',
            localIgnore: true,
            thumbnail: 'components_Tianditu_switch_vue.png',
            fileName: 'components_tianditu_switch_vue'
          },
          {
            name: '天地图首页',
            name_en: 'Home',
            version: '10.0.0',
            localIgnore: true,
            thumbnail: 'components_Tianditu_home_vue.png',
            fileName: 'components_tianditu_home_vue'
          }
        ]
      },
      viz: {
        name: '可视化',
        name_en: 'Visualization',
        content: [
          {
            name: '点聚合图层',
            name_en: 'Cluster layer',
            version: '10.0.0',
            thumbnail: 'components_cluster_vue.png',
            fileName: 'components_cluster_vue',
            localIgnore: true
          },
          {
            name: '单值专题图',
            name_en: 'Unique Theme layer',
            version: '10.0.0',
            thumbnail: 'components_uniquetheme_vue.png',
            fileName: 'components_uniquetheme_vue'
          },
          {
            name: '分段专题图',
            name_en: 'Range Theme layer',
            version: '10.0.0',
            thumbnail: 'components_rangetheme_vue.png',
            fileName: 'components_rangetheme_vue'
          },
          {
            name: '等级符号专题图',
            name_en: 'RanSymbol Theme layer',
            version: '10.0.0',
            thumbnail: 'components_ranksymboltheme_vue.png',
            fileName: 'components_ranksymboltheme_vue'
          },
          {
            name: '标签专题图',
            name_en: 'Label Theme layer',
            version: '10.0.0',
            thumbnail: 'components_labeltheme_vue.png',
            fileName: 'components_labeltheme_vue'
          },
          {
            name: '图表专题图',
            name_en: 'Statistical chart',
            version: '10.0.0',
            thumbnail: 'components_graph_theme_layer_vue.png',
            fileName: 'components_graph_theme_layer_vue',
            localIgnore: true
          },
          {
            name: '热力图图层',
            name_en: 'Heatmap layer',
            version: '10.0.0',
            thumbnail: 'components_heatmap_vue.png',
            fileName: 'components_heatmap_vue'
          },
          {
            name: 'MapV 图层',
            name_en: 'MapV layer',
            version: '10.0.0',
            thumbnail: 'components_mapv_vue.gif',
            fileName: 'components_mapv_vue'
          },
          {
            name: 'Echarts 图层',
            name_en: 'Echarts layer',
            version: '10.0.0',
            thumbnail: 'components_echartsLayer_vue.gif',
            fileName: 'components_echarts_vue'
          },
          {
            name: 'DeckGL 图层',
            name_en: 'DeckGL layer',
            version: '10.0.0',
            thumbnail: 'components_deckgl_vue.png',
            fileName: 'components_deckgl_vue'
          },
          {
            name: '数据流图层',
            name_en: 'Data Flow Layer',
            version: '10.0.0',
            thumbnail: 'components_dataflow_vue.gif',
            fileName: 'components_dataflow_vue'
          },
          {
            name: '动效火焰图层',
            name_en: 'Animate Fire Layer',
            version: '10.0.0',
            thumbnail: 'components_fire_layer_vue.gif',
            fileName: 'components_fire_layer_vue'
          },
          {
            name: '动效标记图层',
            name_en: 'Animate Marker Layer',
            version: '10.0.0',
            thumbnail: 'components_animate_marker_layer_vue.gif',
            fileName: 'components_animate_marker_layer_vue'
          },
          {
            name: '动效文本标记图层',
            name_en: 'Animate Text Layer',
            version: '10.0.0',
            thumbnail: 'components_rotating_text_border_vue.gif',
            fileName: 'components_rotating_text_border_vue'
          },
          {
            name: 'GeoJSON 图层',
            name_en: 'GeoJSON Layer',
            version: '10.0.0',
            thumbnail: 'components_geojson_vue.png',
            fileName: 'components_geojson_vue'
          },
          {
            name: '知识图谱',
            name_en: 'Knowledge GraphMap',
            version: '11.1.0',
            thumbnail: 'knowledgeGraphMap.png',
            fileName: 'components_knowledgeGraphMap_vue'
          }
        ]
      },
      chart: {
        name: '图表',
        name_en: 'Chart',
        localIgnore: true,
        content: [
          {
            name: '图表',
            name_en: 'Chart',
            version: '10.0.0',
            thumbnail: 'components_chart_vue.png',
            fileName: 'components_chart_vue',
            localIgnore: true
          },
          {
            name: '饼图',
            name_en: 'Chart(pie)',
            version: '10.0.0',
            thumbnail: 'components_chart_vue(pie).png',
            fileName: 'components_pie_chart_vue',
            localIgnore: true
          },
          {
            name: '雷达图',
            name_en: 'Chart(radar)',
            version: '10.0.0',
            thumbnail: 'components_chart_vue(radar).png',
            fileName: 'components_radar_chart_vue',
            localIgnore: true
          },
          {
            name: '仪表盘',
            name_en: 'Chart(gauge)',
            version: '10.0.0',
            thumbnail: 'components_chart_vue(gauge).png',
            fileName: 'components_gauge_chart_vue',
            localIgnore: true
          }
        ]
      },
      basic: {
        name: '基础',
        localIgnore: true,
        name_en: 'Basic component',
        content: [
          {
            name: '基础组件',
            name_en: 'Basic Component',
            version: '10.0.0',
            thumbnail: 'components_basic_vue.png',
            fileName: 'components_basic_vue',
            localIgnore: true
          },
          {
            name: '边框组件',
            name_en: 'Border Component',
            version: '10.0.0',
            thumbnail: 'components_border_vue.png',
            fileName: 'components_border_vue',
            localIgnore: true
          },
          {
              name: '时间轴组件',
              name_en: 'TimeLine Component',
              version: '10.1.2',
              thumbnail: 'components_time_line_vue.png',
              fileName: 'components_time_line_vue',
              localIgnore: true
          },
          {
            name: '超图大厦历史影像',
            name_en: 'Historical image of Chaotu Building',
            version: '10.1.2',
            thumbnail: 'components_timeline_supermap.png',
            fileName: 'components_timeline_supermap',
            localIgnore: true
        },
        {
            name: '气象卫星云图',
            name_en: 'Meteorological satellite cloud image',
            version: '10.1.2',
            thumbnail: 'components_timeline_cloud.png',
            fileName: 'components_timeline_cloud',
            localIgnore: true
        },
        {
              name: '幻灯片组件',
              name_en: 'Slideshow Component',
              version: '10.1.2',
              thumbnail: 'components_slideshow_vue.png',
              fileName: 'components_slideshow_vue',
              localIgnore: true
          },
          {
            name: '视频增强组件',
            name_en: 'VideoPlus',
            version: '11.0.0',
            localIgnore: true,
            thumbnail: 'components_video_plus_vue.png',
            fileName: 'components_video_plus_vue'
          }
        ]
      },
      others_vue: {
        name: '其他',
        name_en: 'Others',
        content: [
          {
            name: '主题切换',
            name_en: 'Theme switching',
            version: '10.0.0',
            thumbnail: 'components_theme_vue.png',
            fileName: 'components_theme_vue',
            localIgnore: true
          }
        ]
      }
    }
  },
  vuecomponents_leaflet: {
    name: 'Vue - Leaflet',
    name_en: 'Vue - Leaflet',
    content: {
      l_map: {
        name: '地图',
        name_en: 'Map',
        content: [
          {
            name: 'iServer 地图',
            name_en: 'iServer Map',
            version: '10.0.1',
            thumbnail: 'components_map_vue.png',
            fileName: 'l_map_vue'
          },
          {
            name: 'iPortal 地图',
            name_en: 'iPortal Map',
            version: '10.0.1',
            thumbnail: 'components_webmap.png',
            fileName: 'l_webmap_vue',
            localIgnore: true
          },
          {
            name: '栅格图层',
            name_en: 'Tile Layer',
            version: '10.0.1',
            thumbnail: 'components_rasterLayer_vue.png',
            fileName: 'l_tile_vue',
            localIgnore: true
          }
        ]
      },
      l_map_subcomponent: {
        name: '地图子组件',
        name_en: 'Map subcomponent',
        content: [
          {
            name: '弹窗',
            name_en: 'Popup',
            version: '10.0.1',
            thumbnail: 'components_popup_vue.png',
            fileName: 'l_popup_vue'
          },
          {
            name: '点选查询',
            name_en: 'Identify',
            version: '10.0.1',
            thumbnail: 'components_identify_vue.png',
            fileName: 'l_identify_vue'
          }
        ]
      },
      l_chart: {
        name: '图表',
        name_en: 'Chart',
        localIgnore: true,
        content: [
          {
            name: '图表',
            name_en: 'Chart',
            version: '10.0.1',
            thumbnail: 'components_chart_vue.png',
            fileName: 'l_chart_vue',
            localIgnore: true
          },
          {
            name: '饼图',
            name_en: 'Chart(pie)',
            version: '10.0.1',
            thumbnail: 'components_chart_vue(pie).png',
            fileName: 'l_pie_chart_vue',
            localIgnore: true
          },
          {
            name: '雷达图',
            name_en: 'Chart(radar)',
            version: '10.0.1',
            thumbnail: 'components_chart_vue(radar).png',
            fileName: 'l_radar_chart_vue',
            localIgnore: true
          },
          {
            name: '仪表盘',
            name_en: 'Chart(gauge)',
            version: '10.0.1',
            thumbnail: 'components_chart_vue(gauge).png',
            fileName: 'l_gauge_chart_vue',
            localIgnore: true
          }
        ]
      }
    }
  },
  reactcomponents_mbgl: {
    name: 'React - MapboxGL',
    name_en: 'React - MapboxGL',
    localIgnore: true,
    content: {
      react_map: {
        name: '地图',
        name_en: 'Map',
        content: [
          {
            name: 'iServer 地图',
            name_en: 'iServer Map',
            version: '10.0.0',
            thumbnail: 'components_map_react.png',
            fileName: 'components_map_react'
          },
          {
            name: 'iPortal 地图',
            name_en: 'iPortal Map',
            version: '10.0.0',
            thumbnail: 'components_webmap.png',
            fileName: 'components_webmap_react',
            localIgnore: true
          },
          {
            name: '栅格图层',
            name_en: 'Raster Layer',
            version: '10.0.0',
            thumbnail: 'components_rasterLayer_react.png',
            fileName: 'components_raster_react',
            localIgnore: true
          },
          {
            name: '矢量瓦片图层',
            name_en: 'Vector Tile Layer',
            version: '10.0.0',
            thumbnail: 'components_vector_tile_react.png',
            fileName: 'components_vector_tile_react',
            localIgnore: true
          }
        ]
      },
      react_viz: {
        name: '可视化',
        name_en: 'Visualization',
        content: [
          {
            name: '点聚合图层',
            name_en: 'Cluster Layer',
            version: '10.0.0',
            thumbnail: 'components_cluster_react.png',
            fileName: 'components_cluster_react'
          },
          {
            name: '单值专题图',
            name_en: 'Unique Theme layer',
            version: '10.0.0',
            thumbnail: 'components_uniquetheme_react.png',
            fileName: 'components_uniquetheme_react'
          },
          {
            name: '分段专题图',
            name_en: 'Range Theme layer',
            version: '10.0.0',
            thumbnail: 'components_rangetheme_react.png',
            fileName: 'components_rangetheme_react'
          },
          {
            name: '等级符号专题图',
            name_en: 'RankSymbolTheme Layer',
            version: '10.0.0',
            thumbnail: 'components_ranksymboltheme_react.png',
            fileName: 'components_ranksymboltheme_react'
          },
          {
            name: '标签专题图',
            name_en: 'LabelTheme Layer',
            version: '10.0.0',
            thumbnail: 'components_labeltheme_react.png',
            fileName: 'components_labeltheme_react'
          },
          {
            name: '图表专题图',
            name_en: 'Statistical chart',
            version: '10.0.0',
            thumbnail: 'components_graph_theme_layer_react.png',
            fileName: 'components_graph_theme_layer_react',
            localIgnore: true
          },
          {
            name: '热力图图层',
            name_en: 'Heatmap layer',
            version: '10.0.0',
            thumbnail: 'components_heatmap_react.png',
            fileName: 'components_heatmap_react'
          },
          {
            name: 'MapV 图层',
            name_en: 'MapV layer',
            version: '10.0.0',
            thumbnail: 'components_mapv_react.gif',
            fileName: 'components_mapv_react'
          },
          {
            name: 'Echarts 图层',
            name_en: 'Echarts layer',
            version: '10.0.0',
            thumbnail: 'components_echartsLayer_react.gif',
            fileName: 'components_echarts_react'
          },
          {
            name: 'DeckGL 图层',
            name_en: 'DeckGL Layer',
            version: '10.0.0',
            thumbnail: 'components_deckgl_react.png',
            fileName: 'components_deckgl_react'
          },
          {
            name: '数据流图层',
            name_en: 'Data Flow Layer',
            version: '10.0.0',
            thumbnail: 'components_dataflow_react.gif',
            fileName: 'components_dataflow_react'
          },
          {
            name: '动效火焰图层',
            name_en: 'Animate Fire Layer',
            version: '10.0.0',
            thumbnail: 'components_fire_layer_react.gif',
            fileName: 'components_fire_layer_react'
          },
          {
            name: '动效标记图层',
            name_en: 'Animate Marker Layer',
            version: '10.0.0',
            thumbnail: 'components_animate_marker_layer_react.gif',
            fileName: 'components_animate_marker_layer_react'
          },
          {
            name: '动效文本标记图层',
            name_en: 'Animate Text Layer',
            version: '10.0.0',
            thumbnail: 'components_rotating_text_border_react.gif',
            fileName: 'components_rotating_text_border_react'
          },
          {
            name: 'GeoJSON 图层',
            name_en: 'GeoJSON Layer',
            version: '10.0.0',
            thumbnail: 'components_geojson_react.png',
            fileName: 'components_geojson_react'
          }
        ]
      }
    }
  }
  // h5components: {
  //   name: 'H5',
  //   name_en: 'H5',
  //   localIgnore: true,
  //   content: {}
  // }
};

/**
 *key值：为exampleConfig配置的key值或者fileName值
 *      （为中间节点时是key值，叶结点是fileName值）
 *value值：fontawesome字体icon名
 *不分层
 */
var sideBarIconConfig = {
  vuecomponents_mbgl: 'fa-window-restore',
  vuecomponents_leaflet: 'fa-window-restore',
  reactcomponents_mbgl: 'fa-globe',
  h5components: 'fa-map'
};

/**
 *key值：为exampleConfig配置的key值
 *value值：fontawesome字体icon名
 *与sideBarIconConfig的区别：sideBarIconConfig包括侧边栏所有层级目录的图标，exampleIconConfig仅包括一级标题的图标
 */
var exampleIconConfig = {
  vuecomponents_mbgl: 'fa-window-restore',
  vuecomponents_leaflet: 'fa-window-restore',
  reactcomponents_mbgl: 'fa-globe',
  h5components: 'fa-map'
};
window.componentExampleConfig = exampleConfig;
