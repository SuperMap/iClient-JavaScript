import maplibregl from 'maplibre-gl';
import { createWebMapBaseExtending } from '@supermapgis/iclient-common/mapping/WebMapBase';
import { createWebMapV2Extending } from '@supermapgis/iclient-common/mapping/WebMapV2';
import { createWebMapV3Extending } from '@supermapgis/iclient-common/mapping/WebMapV3';
import { createMapClassExtending } from '@supermapgis/iclient-common/mapping/MapBase';
import { createMapStyleExtending } from '@supermapgis/iclient-common/mapping/MapStyle';
import { createWebMapV2BaseExtending } from '@supermapgis/iclient-common/mapping/WebMapV2Base';
import { L7LayerUtil } from '@supermapgis/iclient-common/mapping/utils/L7LayerUtil';
import { featureFilter, expression } from '@maplibre/maplibre-gl-style-spec';
import spec from '@maplibre/maplibre-gl-style-spec/src/reference/v8';
import { L7Layer, L7 } from '../overlay/L7Layer';
import MapManager from './webmap/MapManager';

/**
  * @class WebMap
  * @version 11.2.1
  * @extends {WebMapBase}
  * @category  iPortal/Online Resources Map
  * <div style="padding: 20px;border: 1px solid #eee;border-left-width: 5px;border-radius: 3px;border-left-color: #ce4844;">
  *      <p style="color: #ce4844">Notice</p>
  *      <p style="font-size: 13px">该功能可能依赖以下插件，请确认引入该插件。</p>
  *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/geostats/geostats.js">geostats: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/geostats/geostats.js"&gt;&lt;/script&gt;</p>
  *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/jsonsql/jsonsql.js">jsonsql: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/jsonsql/jsonsql.js"&gt;&lt;/script&gt;</p>
  *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/echartsLayer/EchartsLayer.min.js">EchartLayer: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/echartsLayer/EchartsLayer.min.js"&gt;&lt;/script&gt;</p>
  *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/echarts/5.5.0/echarts.min.js">echarts: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/echarts/5.5.0/echarts.min.js"&gt;&lt;/script&gt;</p>
  *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/maplibregl-l7-render/0.0.1/maplibregl-l7-render.js"&gt;&lt;/script&gt;</p>
  *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/antv/g2/4.2.8/g2.min.js">G2: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/antv/g2/4.2.8/g2.min.js"&gt;&lt;/script&gt;</p>
  *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/antv/g6/4.3.2/g6.min.js">G6: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/antv/g6/4.3.2/g6.min.js"&gt;&lt;/script&gt;</p>
  *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/fast-xml-parser/4.2.7/fxparser.min.js">fast-xml-parser: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/fast-xml-parser/4.2.7/fxparser.min.js"&gt;&lt;/script&gt;</p>
  *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/maplibre-gl-js-enhance/4.3.0-2/maplibre-gl-enhance.js"&gt;&lt;/script&gt;</p>
  * </div>
  * @modulecategory Mapping
  * @param {number} id - iPortal|Online 地图 ID。
  * @param {Object} options - 基础参数。
  * @param {string} [options.target='map'] - 地图容器 ID。
  * @param {string} [options.server="https://www.supermapol.com"] - 地图的地址。当设置 `id` 时有效。
  * @param {string} [options.credentialKey] - 凭证密钥。当设置 `id` 时有效。
  * @param {string} [options.credentialValue] - 凭证值。当设置 `id` 时有效。
  * @param {string} [options.tiandituKey] - 用于访问天地图的服务。当设置 `id` 时有效。
  * @param {string} [options.googleMapsAPIKey] - 用于访问谷歌地图。当设置 `id` 时有效。
  * @param {string} [options.googleMapsLanguage] - 用于定义在谷歌地图图块上显示标签的语言。当设置 `id` 且底图为谷歌地图时有效。
  * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。当设置 `id` 时有效。
  * @param {boolean} [options.excludePortalProxyUrl] - server 传递过来的 URL 是否带有代理。当设置 `id` 时有效。
  * @param {boolean} [options.ignoreBaseProjection = false] - 是否忽略底图坐标系和叠加图层坐标系不一致。
  * @param {boolean} [options.isSuperMapOnline] - 是否是 SuperMap Online 地图。
  * @param {string} [options.iportalServiceProxyUrlPrefix] - iportal的代理服务地址前缀。
  * @param {string|boolean} [options.proxy] - HTTP 请求代理地址 。布尔值表示使用 iPortal 默认代理地址。
  * @param {Object} mapOptions - 地图参数。
  * @param {Array} [mapOptions.center] - 中心点。
  * @param {number} [mapOptions.zoom] - 缩放级别。
  * @param {number} [mapOptions.bearing] - 旋转角度。
  * @param {number} [mapOptions.pitch] - 倾角。
  * @param {string|Object} [mapOptions.crs] - 投影。
  * @param {boolean} [mapOptions.renderWorldCopies] - 连续渲染。
  * @param {number} [mapOptions.rasterTileSize] - 栅格瓦片大小。
  * @param {Object} [mapOptions.style] - style 样式。
  * @fires WebMap#mapinitialized
  * @fires WebMap#mapcreatesucceeded
  * @fires WebMap#mapcreatefailed
  * @fires WebMap#addlayerssucceeded
  * @fires WebMap#layercreatefailed
  * @fires WebMap#baidumapnotsupport
  * @fires WebMap#dataflowfeatureupdated
  * @fires WebMap#projectionnotmatch
  * @fires WebMap#mapbeforeremove
  * @fires WebMap#getmapfailed
  * @fires WebMap#getlayersfailed
  * @usage
 */
export class WebMap extends createWebMapBaseExtending(maplibregl.Evented, { mapRepo: maplibregl }) {
  _createWebMapFactory(type) {
    const commonFactoryOptions = { MapManager, mapRepo: maplibregl, mapRepoName: 'maplibre-gl' };
    const l7LayerUtil = L7LayerUtil({ featureFilter, expression, spec, L7Layer, L7, proj4: this.options.proj4 });
    switch (type) {
      case 'MapStyle':
        return createMapStyleExtending(createMapClassExtending(maplibregl.Evented), commonFactoryOptions);
      case 'WebMap3':
        return createWebMapV3Extending(createMapClassExtending(maplibregl.Evented), {
          ...commonFactoryOptions,
          l7LayerUtil
        });
      default:
        return createWebMapV2Extending(
          createWebMapV2BaseExtending(createMapClassExtending(maplibregl.Evented), 'fire'),
          commonFactoryOptions
        );
    }
  }
}