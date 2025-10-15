import mapboxgl from 'mapbox-gl';
import { createWebMapBaseExtending } from '@supermapgis/iclient-common/mapping/WebMapBase';
import { createWebMapV2Extending } from '@supermapgis/iclient-common/mapping/WebMapV2';
import { createWebMapV3Extending } from '@supermapgis/iclient-common/mapping/WebMapV3';
import { createMapClassExtending } from '@supermapgis/iclient-common/mapping/MapBase';
import { createMapStyleExtending } from '@supermapgis/iclient-common/mapping/MapStyle';
import { createWebMapV2BaseExtending } from '@supermapgis/iclient-common/mapping/WebMapV2Base';
import { L7LayerUtil } from '@supermapgis/iclient-common/mapping/utils/L7LayerUtil';
import { featureFilter, expression } from '@mapbox/mapbox-gl-style-spec';
import spec from '@mapbox/mapbox-gl-style-spec/reference/v8';
import { L7Layer, L7 } from '../overlay/L7Layer';
import MapManager from './webmap/MapManager';
import { CRSManager } from './webmap/CRSManager';
import { DataFlowService } from '../services/DataFlowService';
import { GraticuleLayer } from '../overlay/GraticuleLayer';

/**
 * @class WebMap
 * @version 9.1.2
 * @extends {WebMapBase}
 * @category  iPortal/Online Resources Map
 * @classdesc 对接 iPortal/Online 地图类。
 * <div style="padding: 20px;border: 1px solid #eee;border-left-width: 5px;border-radius: 3px;border-left-color: #ce4844;">
 *      <p style="color: #ce4844">Notice</p>
 *      <p style="font-size: 13px">该功能可能依赖以下插件，请确认引入该插件。</p>
 *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/geostats/geostats.js">geostats: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/geostats/geostats.js"&gt;&lt;/script&gt;</p>
 *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/jsonsql/jsonsql.js">jsonsql: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/jsonsql/jsonsql.js"&gt;&lt;/script&gt;</p>
 *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/echartsLayer/EchartsLayer.min.js">EchartLayer: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/echartsLayer/EchartsLayer.min.js"&gt;&lt;/script&gt;</p>
 *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/echarts/5.5.0/echarts.min.js">echarts: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/echarts/5.5.0/echarts.min.js"&gt;&lt;/script&gt;</p>
 *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/mapboxgl-l7-render/0.0.1/mapboxgl-l7-render.js">L7: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/mapboxgl-l7-render/0.0.1/mapboxgl-l7-render.js"&gt;&lt;/script&gt;</p>
 *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/antv/g2/4.2.8/g2.min.js">G2: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/antv/g2/4.2.8/g2.min.js"&gt;&lt;/script&gt;</p>
 *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/antv/g6/4.3.2/g6.min.js">G6: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/antv/g6/4.3.2/g6.min.js"&gt;&lt;/script&gt;</p>
 *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/fast-xml-parser/4.2.7/fxparser.min.js">fast-xml-parser: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/fast-xml-parser/4.2.7/fxparser.min.js"&gt;&lt;/script&gt;</p>
 *      <p style="font-size: 13px"><a href="https://iclient.supermap.io/web/libs/mapbox-gl-js-enhance/1.12.1-10/mapbox-gl-enhance.jss">mapbox-gl-js-enhance: </a>&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/mapbox-gl-js-enhance/1.12.1-10/mapbox-gl-enhance.js"&gt;&lt;/script&gt;</p>
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
 * @param {boolean} [options.preferServer=false] - 当图层数据来源为SuperMap iServer RestData服务, 使用服务器直接返回geojson。
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
 * @fires WebMap#layerorsourcenameduplicated
 * @fires WebMap#dataflowfeatureupdated
 * @fires WebMap#projectionnotmatch
 * @fires WebMap#mapbeforeremove
 * @fires WebMap#xyztilelayernotsupport
 * @fires WebMap#getmapfailed
 * @fires WebMap#getlayersfailed
 * @usage
 */
export class WebMap extends createWebMapBaseExtending(mapboxgl.Evented, { mapRepo: mapboxgl }) {
  constructor(id, options, mapOptions) {
    const crsManager = new CRSManager(options && options.proj4);
    const proj4 = crsManager.getProj4();
    super(id, { ...options, proj4 }, mapOptions);
    this._crsManager = crsManager;
    if (!mapboxgl.CRS) {
      const error =
        'WebMap needs to include mapbox-gl-enhance.js. Refer to the example: https://iclient.supermap.io/examples/mapboxgl/editor.html#mvtVectorTile_2362';
      Promise.resolve().then(() => {
        this._fire('mapcreatefailed', { error: error });
      });
    } else {
      this._readyForInitializingWebMap();
    }
  }

  /**
   * @function WebMap.prototype.setCRS
   * @description 更新地图投影。
   * @param {string|Object} crs - 地图 crs。
   */
  setCRS(crs) {
    if (this.map) {
      this.mapOptions.crs = crs;
      if (this.mapOptions.crs) {
        const crsVal = crs.epsgCode
          ? this._crsManager.registerCRS({ name: crs.epsgCode, wkt: crs.WKT, ...this.mapOptions.crs }, false)
          : this._crsManager.getCRS(crs);
        this.map.setCRS(crsVal);
      }
    }
  }

  _createWebMapFactory(type) {
    const commonFactoryOptions = {
      MapManager,
      mapRepo: mapboxgl,
      crsManager: this._crsManager,
      DataFlowService,
      GraticuleLayer
    };
    const l7LayerUtil = L7LayerUtil({
      featureFilter,
      expression,
      spec,
      L7Layer,
      L7,
      proj4: this._crsManager.getProj4()
    });
    switch (type) {
      case 'MapStyle':
        return createMapStyleExtending(createMapClassExtending(mapboxgl.Evented), commonFactoryOptions);
      case 'WebMap3':
        return createWebMapV3Extending(createMapClassExtending(mapboxgl.Evented), {
          ...commonFactoryOptions,
          l7LayerUtil
        });
      default:
        return createWebMapV2Extending(
          createWebMapV2BaseExtending(createMapClassExtending(mapboxgl.Evented), 'fire'),
          commonFactoryOptions
        );
    }
  }
}
