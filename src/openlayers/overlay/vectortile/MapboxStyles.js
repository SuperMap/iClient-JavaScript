import ol from 'openlayers';
import {
    FetchRequest,
    CommonUtil
} from "@supermap/iclient-common";
import {
    olExtends
} from './olExtends'


/**
 * @class ol.supermap.MapboxStyles
 * @classdesc Mapbox 矢量瓦片风格
 * <div style="padding: 20px;border: 1px solid #eee;border-left-width: 5px;border-radius: 3px;border-left-color: #ce4844;">
 * <p style="color: #ce4844">Notice</p>
 * <p style="font-size: 13px">该功能依赖 <a href='https://github.com/boundlessgeo/ol-mapbox-style'>ol-mapbox-style</a> 插件，请确认引入该插件。</p>
 * `<script type="text/javascript" src="https://rawgit.com/boundlessgeo/ol-mapbox-style/v2.11.2/dist/olms.js"></script>`
 * @category  Visualization VectorTile
 * @param {Object} options 初始化参数。<br>
 * @param {string | undefined} options.url - iServer UGCV5(MVT) 地图服务地址，例如 `http://localhost:8090/iserver/services/map-mvt-test/rest/maps/test` , 与 `options.style` 互斥，优先级低于 `options.style`。
 * @param {Object | undefined} options.style - Mapbox style 对象。 与 `options.url` 互斥，优先级高于 `options.url`。
 * @param {Array.<number>} options.resolutions - 地图分辨率数组，用于映射zoom值。通常情況与地图的 {@link ol.View} 的分辨率一致。</br>
 * 默认值为`[78271.51696402048,39135.75848201024, 19567.87924100512,9783.93962050256,4891.96981025128,2445.98490512564, 1222.99245256282,611.49622628141,305.748113140705,152.8740565703525, 76.43702828517625,38.21851414258813,19.109257071294063,9.554628535647032, 4.777314267823516,2.388657133911758,1.194328566955879,0.5971642834779395, 0.29858214173896974,0.14929107086948487,0.07464553543474244]`。
 * @param {!(string|Array.<string>)} options.source - Mapbox Style `source` key值或者 `layer`的 id 数组。
 * 当配置`source` key值时，source为该值的layer会被加载；
 * 当配置为`layer`的 id 数组时，指定的layer会被加载，注意被指定的layer需要有相同的source。
 * @param {ol.Map} options.map - Openlayers 地图对象，仅用于填充Mapbox Style中的 `background`,如没有配置`background`可不设置该参数。
 * @example
 *  var mbStyle = new ol.supermap.MapboxStyles({
            url: url,
            source: 'California',
            resolutions: [78271.51696402048,39135.75848201024, 19567.87924100512,9783.93962050256,4891.96981025128,2445.98490512564]
    })
    mbStyle.on('styleLoaded', function () {
           var vectorLayer = new ol.layer.VectorTile({
                //设置避让参数
                declutter: true,
                source: new ol.source.VectorTileSuperMapRest({
                    url: url,
                    format: new ol.format.MVT({
                        featureClass: ol.Feature
                    }),
                    tileType: 'ScaleXY'
                }),
                style: mbStyle.featureStyleFuntion
            });
            map.addLayer(vectorLayer);
        })
 */
export class MapboxStyles extends ol.Observable {
    constructor(options) {
        super();
        options = options || {};
        this.spriteRegEx = /^(.*)(\?.*)$/;
        this.defaultFont = ["DIN Offc Pro Medium",
            "Arial Unicode MS Regular"
        ];
        this.map = options.map;
        this.source = options.source;
        this.url = options.url ? options.url + '/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true' : "";
        this.resolutions = options.resolutions;
        this.style = options.style;
        olExtends(this.map);
        if (this.style) {
            this._mbStyle = this.style;
            this._resolve(this.style);
        } else {
            FetchRequest.get(this.url).then(response =>
                response.json()).then(mbStyle => {
                this._mbStyle = mbStyle;
                this._resolve(mbStyle)
            });
        }
    }
    /**
     * @function ol.supermap.MapboxStyles.getStyleFunction
     * @description 获取`ol.FeatureStyleFunction`。
     * @return {ol.FeatureStyleFunction} `ol.FeatureStyleFunction`
     */
    getStyleFunction() {
        return this.featureStyleFuntion;
    }
    updateStyles(layerStyles) {
        if (Object.prototype.toString.call(layerStyles) !== '[object Array]') {
            layerStyles = [layerStyles];
        }
        const layerObj = {};
        for (const item in layerStyles) {
            const layerStyle = layerStyles[item];
            layerObj[layerStyle.id] = layerStyle;
        }
        let count = 0;
        for (const key in this._mbStyle.layers) {
            const oldLayerStyle = this._mbStyle.layers[key];
            if (count >= layerStyles.length) {
                break;
            }
            const newLayerStyle = layerObj[oldLayerStyle.id]
            if (!newLayerStyle) {
                continue;
            }
            CommonUtil.extend(oldLayerStyle, newLayerStyle);
            count++;
        }
        this._createStyleFunction(this._mbStyle, this._spriteData, this._spriteImageUrl);
    }
    _resolve(mbStyle) {
        if (mbStyle.sprite) {
            const spriteScale = window.devicePixelRatio >= 1.5 ? 0.5 : 1;
            const sizeFactor = spriteScale == 0.5 ? '@2x' : '';
            const spriteUrl = this._toSpriteUrl(mbStyle.sprite, this.path, sizeFactor + '.json');
            FetchRequest.get(spriteUrl)
                .then(response =>
                    response.json()).then(spritesJson => {
                    this._spriteData = spritesJson;
                    this._spriteImageUrl = this._toSpriteUrl(mbStyle.sprite, this.path, sizeFactor + '.png');
                    this._initStyleFunction(mbStyle, this._spriteData, this._spriteImageUrl);
                })
        } else {
            this._initStyleFunction(mbStyle, null, null);
        }
    }
    _initStyleFunction(mbStyle, spriteData, spriteImageUrl) {
        this._createStyleFunction(mbStyle, spriteData, spriteImageUrl);
        /**
         * @description 样式加载成功后触发。
         * @event ol.supermap.MapboxStyles#styleloaded
         */
        this.dispatchEvent('styleloaded');
    }
    _createStyleFunction(mbStyle, spriteData, spriteImageUrl) {
        if (this.map) {
            window.olms.applyBackground(this.map, mbStyle);
        }
        this.featureStyleFuntion = window.olms.stylefunction({
            setStyle: function () {},
            set: function () {},
            changed: function () {}
        }, mbStyle, this.source, this.resolutions, spriteData, spriteImageUrl);
    }
    _withPath(url, path) {
        if (path && url.indexOf('http') != 0) {
            url = path + url;
        }
        return url;
    }

    _toSpriteUrl(url, path, extension) {
        url = this._withPath(url, path);
        const parts = url.match(this.spriteRegEx);
        return parts ?
            parts[1] + extension + (parts.length > 2 ? parts[2] : '') :
            url + extension;
    }
}
ol.supermap.MapboxStyles = MapboxStyles;