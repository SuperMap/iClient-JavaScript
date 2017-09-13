import '../core/Base';
import L from "leaflet";
import SuperMap from "../../common/SuperMap" ;
import ServerGeometry from '../../common/iServer/ServerGeometry';

/**
 * @class L.supermap.imageMapLayer
 * @classdesc SuperMap iServer 的 REST 地图服务的图层(SuperMap iServer Java 6R 及以上分块动态 REST 图层)。使用Image资源出图
 * @extends L.TileLayer{@linkdoc-leaflet/#tilelayer}
 * @example
 *      L.superMap.imageMapLayer(url).addTo(map);
 * @param url -{string} 影像图层地址
 * @param options -{Object} 影像图层可选参数。如：<br>
 *        layersID - {number}图层ID，如果有layersID，则是在使用专题图。<br>
 *        redirect - {boolean} 是否从定向，如果为 true，则将请求重定向到图片的真实地址；如果为 false，则响应体中是图片的字节流。<br>
 *        transparent - {number}设置透明度。<br>
 *        cacheEnabled - {boolean} 是否启用缓存。<br>
 *        clipRegionEnabled - {boolean} 是否启用地图裁剪。<br>
 *        prjCoordSys - {Object} 请求的地图的坐标参考系统。 如：prjCoordSys={"epsgCode":3857}。<br>
 *        overlapDisplayed - {boolean} 地图对象在同一范围内时，是否重叠显示。<br>
 *        overlapDisplayedOptions - {string} 避免地图对象压盖显示的过滤选项。<br>
 *        tileversion - {string} 切片版本名称，cacheEnabled 为 true 时有效。<br>
 *        crs - {{@link L.Proj.CRS}} 坐标系统类。<br>
 *        serverType - {{@link SuperMap.ServerType}} 服务来源 iServer|iPortal|online。<br>
 *        attribution - {string} 版权信息。
 */
export var ImageMapLayer = L.TileLayer.extend({

    options: {
        //如果有layersID，则是在使用专题图
        layersID: null,
        //如果为 true，则将请求重定向到图片的真实地址；如果为 false，则响应体中是图片的字节流
        redirect: false,
        transparent: null,
        cacheEnabled: null,
        clipRegionEnabled: false,
        //请求的地图的坐标参考系统。 如：prjCoordSys= {"epsgCode":3857}。
        prjCoordSys: null,
        //地图对象在同一范围内时，是否重叠显示
        overlapDisplayed: true,
        //避免地图对象压盖显示的过滤选项
        overlapDisplayedOptions: null,
        //切片版本名称，cacheEnabled 为 true 时有效。
        tileversion: null,

        crs: null,
        serverType: SuperMap.ServerType.ISERVER,

        attribution: "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"
    },

    initialize: function (url, options) {
        this.url = this._url = url;
        L.TileLayer.prototype.initialize.apply(this, arguments);
        L.setOptions(this, options);
        L.stamp(this);
    },

    /**
     * @private
     * @function L.supermap.imageMapLayer.prototype.onAdd
     * @description 添加影像地图。
     * @param map - {L.map} 待添加的影像地图参数
     */
    onAdd: function (map) {
        this._crs = this.options.crs || map.options.crs;
        this._initLayerUrl();
        L.TileLayer.prototype.onAdd.call(this, map);
    },

    /**
     * @function L.supermap.imageMapLayer.prototype.getTileUrl
     * @description 根据行列号获取切片地址
     * @param coords - {Object} 行列号
     * @return {String} 切片地址
     */
    getTileUrl: function (coords) {
        //使用ViewBounds出图
        var tileBounds = this._tileCoordsToBounds(coords),
            nw = this._crs.project(tileBounds.getNorthWest()),
            se = this._crs.project(tileBounds.getSouthEast());
        var tileUrl = this._layerUrl + "&viewBounds=" + "{\"leftBottom\" : {\"x\":" + nw.x + ",\"y\":" + se.y + "},\"rightTop\" : {\"x\":" + se.x + ",\"y\":" + nw.y + "}}";
        return encodeURI(tileUrl);
    },

    _initLayerUrl: function () {
        var me = this;
        var layerUrl = me.url + "/image.png?";
        layerUrl += me._initAllRequestParams().join('&');
        layerUrl = this._appendCredential(layerUrl);
        this._layerUrl = layerUrl;
    },

    _initAllRequestParams: function () {
        var me = this, options = me.options || {}, params = [];

        var tileSize = this.options.tileSize;
        params.push("width=" + tileSize);
        params.push("height=" + tileSize);

        var redirect = (options.redirect === true) ? options.redirect : false;
        params.push("redirect=" + redirect);

        var transparent = (options.transparent === true) ? options.transparent : false;
        params.push("transparent=" + transparent);

        var cacheEnabled = (options.cacheEnabled === false) ? options.cacheEnabled : true;
        params.push("cacheEnabled=" + cacheEnabled);

        if (options.prjCoordSys) {
            params.push("prjCoordSys=" + JSON.stringify(options.prjCoordSys));
        }

        if (options.layersID) {
            params.push("layersID=" + options.layersID);
        }

        if (options.clipRegionEnabled && options.clipRegion instanceof L.Path) {
            options.clipRegion = L.Util.toSuperMapGeometry(options.clipRegion.toGeoJSON());
            options.clipRegion = SuperMap.Util.toJSON(ServerGeometry.fromGeometry(options.clipRegion));
            params.push("clipRegionEnabled=" + options.clipRegionEnabled);
            params.push("clipRegion=" + JSON.stringify(options.clipRegion));
        }

        if (options.overlapDisplayed === false) {
            params.push("overlapDisplayed=false");
            if (options.overlapDisplayedOptions) {
                params.push("overlapDisplayedOptions=" + me.overlapDisplayedOptions.toString());
            }
        } else {
            params.push("overlapDisplayed=true");
        }

        if (options.cacheEnabled === true && options.tileversion) {
            params.push("tileversion=" + options.tileversion)
        }

        return params;
    },

    //追加token或key
    _appendCredential: function (url) {
        var newUrl = url, credential, value;
        switch (this.options.serverType) {
            case SuperMap.ServerType.ISERVER:
                value = SuperMap.SecurityManager.getToken(url);
                credential = value ? new SuperMap.Credential(value, "token") : null;
                break;
            case SuperMap.ServerType.IPORTAL:
                value = SuperMap.SecurityManager.getToken(url);
                credential = value ? new SuperMap.Credential(value, "token") : null;
                if (!credential) {
                    value = SuperMap.SecurityManager.getKey(url);
                    credential = value ? new SuperMap.Credential(value, "key") : null;
                }
                break;
            case SuperMap.ServerType.ONLINE:
                value = SuperMap.SecurityManager.getKey(url);
                credential = value ? new SuperMap.Credential(value, "key") : null;
                break;
            default:
                value = SuperMap.SecurityManager.getToken(url);
                credential = value ? new SuperMap.Credential(value, "token") : null;
                break;
        }
        if (credential) {
            newUrl += "&" + credential.getUrlParameters();
        }
        return newUrl;
    }
});

export var imageMapLayer = function (url, options) {
    return new ImageMapLayer(url, options);
};

L.supermap.imageMapLayer = imageMapLayer;