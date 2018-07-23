import L from "leaflet";
import '../../core/Base';
import {
    MapVLayer
} from '../MapVLayer';

/**
 * @class MapvRenderer
 * @classdesc 数据流图层 MapV 渲染器。
 * @category  iServer DataFlow
 * @extends {L.supermap.MapVLayer}
 * @param {string} url - 数据流图层服务地址
 * @param {Object} options - 设置图层参数。
 * @param {Object} [options.geometry] - GeoJSON 几何对象。
 * @param {Object} [options.prjCoordSys] - 投影坐标对象。
 * @param {string} [options.excludeField] - 排除字段。
 * @param {string} [options.idField='id'] - 要素属性中表示唯一标识的字段。
 */
export var MapvRenderer = MapVLayer.extend({

    initialize: function (url, options) {
        options = options || {};
        L.Util.setOptions(this, options);
        this.data = [];
        this.mapVOptions = {
            draw: 'simple'
        };
        MapVLayer.prototype.initialize.call(this, new window.mapv.DataSet([]), this.mapVOptions, options)
        this.idCache = {};
        this.url = url;
        this._last = new Date();
        this._imageCache = {};
    },

    onMessageSuccessed: function (msg) {
        const geoID = msg.featureResult.properties['id'];
        const geometry = msg.featureResult.geometry;
        //设置每个点的经纬度和图片的样式
        const item = {
            geometry: msg.featureResult.geometry
        }
        if (geometry.type === 'Point' && this.options.pointToLayer) {
            //const pointStyle = this.options.pointToLayer ? this.options.pointToLayer(msg.featureResult, L.latLng(geometry.coordinates[1],geometry.coordinates[0])) : new L.marker(L.latLng(geometry.coordinates[1],geometry.coordinates[0]));
            const pointStyle = this.options.pointToLayer(msg.featureResult, L.latLng(geometry.coordinates[1], geometry.coordinates[0]));
            if (pointStyle instanceof L.Marker) {
                this.mapVOptions.draw = 'icon';
                let icon = pointStyle.options.icon;
                const imgUrl = icon._getIconUrl('icon');
                const imgWidth = icon.options.iconSize ? icon.options.iconSize[0] : null;
                const imgHeight = icon.options.iconSize ? icon.options.iconSize[1] : null;
                const iconKey = `${imgUrl}_${imgWidth}_${imgHeight}`;
                let img = this._imageCache[iconKey];
                if (!img) {
                    img = icon.createIcon();
                    this._imageCache[iconKey] = img;
                    img.onload = () => {
                        this.update({
                            data: this.data,
                            options: this.mapVOptions
                        });
                    }

                }
                item.icon = img;
                if (icon.options.iconSize || img.style.height) {
                    this.mapVOptions.offset = {
                        x: 0,
                        y: -(icon.options.iconSize[1] || img.style.height) / 2
                    };
                }
                if (this.options.deg) {
                    item.deg = this.options.deg
                    if (typeof item.deg === 'function') {
                        item.deg = item.deg(msg.featureResult, L.latLng(geometry.coordinates[1], geometry.coordinates[0]));
                    }
                }
            }
            if (pointStyle instanceof L.CircleMarker) {
                this.mapVOptions.draw = 'simple';
                const sty = this._toMapvStyle(pointStyle);
                for (const key in sty) {
                    if (sty.hasOwnProperty(key)) {
                        item[key] = sty[key];
                    }
                }
            }
        } else if (this.options.style) {
            const sty = this._toMapvStyle(this.options.style(msg.featureResult));
            for (const key in sty) {
                if (sty.hasOwnProperty(key)) {
                    item[key] = sty[key];
                }
            }
        }

        if (this.idCache[geoID] == undefined) {
            this.data.push(item);
            this.idCache[geoID] = this.data.length - 1;
        } else {
            this.data[this.idCache[geoID]] = item;
        }
        //绘制图层
        if (new Date() - this._last > 200) {
            this._last = new Date();
            this.update({
                data: this.data,
                options: this.mapVOptions
            });
        }
    },
    _toMapvStyle: function (options) {
        const mapvOps = {
            draw: 'simple'
        };
        mapvOps.strokeStyle = options.color;
        mapvOps.lineWidth = options.width;
        mapvOps.globalAlpha = options.fillOpacity || options.opacity;
        mapvOps.lineCap = options.lineCap;
        mapvOps.lineJoin = options.lineJoin;
        mapvOps.fillStyle = options.fillColor;
        mapvOps.size = options.radius;
        return mapvOps;
    }

});