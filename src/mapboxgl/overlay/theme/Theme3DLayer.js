/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../../core/Base';

/**
 * @class Theme3DLayer
 * @category  Visualization Theme
 * @classdesc 三维专题图基类。不能直接实例化。目前提供的三维专题图有：三维单值专题图、三维分段专题图。
 * @modulecategory Overlay
 * @param  {string} [id] - 专题图图层 ID。默认使用 CommonUtil.createUniqueID("theme3DLayer") 创建专题图层 ID。
 * @param  {Object} layerOptions -专题图图层配置项。
 * @param  {number} [layerOptions.opacity=1] - 图层不透明度。
 * @param  {boolean} [layerOptions.parseNumber=fasle] - 是否预处理数据，将数据转换为 number。
 * @param  {boolean} [layerOptions.enableHighlight=false] - 是否开启高亮。
 * @param  {string} [layerOptions.highlight="#ADA91E"] - 高亮颜色。
 * @param  {string} [layerOptions.baseHeightField] - 数据中表示基础高度的字段。
 * @param  {number} [layerOptions.height] - 高度。如果数据指定的 heightField (为height)没有可以表示高度的字段，可以为所有数据统一设置一个高度。
 * @param  {string} [layerOptions.heightField] - 数据中表示高度的字段。
 * @param  {string} [layerOptions.themeField] - 专题展示的字段。
 * @param  {boolean} [layerOptions.showLegend=true] - 是否显示图例。
 * @param  {string} [layerOptions.legendTitle] - 图例标题。
 * @param  {string} [layerOptions.legendTheme='light'] - 图例主题，取值：'light','dark'。
 * @param  {string} [layerOptions.legendOrientation='horizontal'] - 图例方向，取值：'horizontal','vertical'。
 * @param  {string} [layerOptions.legendPosition] - 图例位置，取值：'top-right'|'top-left'|'bottom-left'|'bottom-right'。
 * @usage
 */
export class Theme3DLayer {


    constructor(id, layerOptions) {
        /**
         * @member {string} Theme3DLayer.prototype.id
         * @description Mapbox GL 图层 ID。
         */
        this.id = id;

        /**
         * @member {Object} Theme3DLayer.prototype.map
         * @description Mapbox GL 地图对象。
         */
        this.map = null;
        /**
         * @member {number} [Theme3DLayer.prototype.opacity=1]
         * @description 图层不透明度。
         */
        this.opacity = 1;
        /**
         * @member {boolean} [Theme3DLayer.prototype.parseNumber=false]
         * @description 是否进行数据预处理，有些字段是 string 类型，需要转换为 number。
         */
        this.parseNumber = false;
        /**
         * @member {boolean} [Theme3DLayer.prototype.enableHighlight=false]
         * @description 是否开启高亮。
         */
        this.enableHighlight = false;

        /**
         * @member {Object} [Theme3DLayer.prototype.highlight={color: "#ADA91E"}]
         * @description 高亮相关配置。
         */
        this.highlight = {color: "#ADA91E"};

        /**
         * @member {string} Theme3DLayer.prototype.baseHeightField
         * @description 数据中表示基础高度的字段。
         */
        this.baseHeightField = null;

        /**
         * @member {number} Theme3DLayer.prototype.height
         * @description 高度。如果数据指定的 heightField (默认 height) 没有可以表示高度的字段，可以为所有数据统一设置一个高度。
         */
        this.height = null;

        /**
         * @member {string} Theme3DLayer.prototype.heightField
         * @description 数据中表示高度的字段。
         */
        this.heightField = 'height';

        /**
         * @member {string} [Theme3DLayer.prototype.themeField]
         * @description 专题展示的字段。
         */
        this.themeField = this.heightField;

        /**
         * @member {boolean} [Theme3DLayer.prototype.showLegend=true]
         * @description 是否显示图例。
         */
        this.showLegend = true;

        /**
         * @member {string} [Theme3DLayer.prototype.legendTitle]
         * @description 图例标题。
         */
        this.legendTitle = null;

        /**
         * @member {string} [Theme3DLayer.prototype.legendTheme='light']
         * @description 图例主题，取值：'light','dark'。
         * @default 'light'
         */
        this.legendTheme = 'light';

        /**
         * @member {string} [Theme3DLayer.prototype.legendOrientation='horizontal']
         * @description 图例方向，取值：'horizontal','vertical'。
         * @default 'horizontal'
         */
        this.legendOrientation = 'horizontal';
        /**
         * @member {string} Theme3DLayer.prototype.legendPosition
         * @description 图例位置，取值：'top-right'|'top-left'|'bottom-left'|'bottom-right'。
         * @default 'bottom-right'
         */
        this.legendPosition = 'bottom-right';
        this._highlightLayerId = `${this.id}-highlightLayer`;
        this._extend(this, layerOptions);
    }

    /**
     * @function Theme3DLayer.prototype.setLayerOptions
     * @description 设置图层相关参数。
     * @param {Object} layerOptions - 该专题图图层相关参数。
     * @param {number} [layerOptions.opacity=1] - 图层不透明度。
     * @param {boolean} [layerOptions.parseNumber=false] - 是否预处理数据，将数据转换为 number。
     * @param {string} [layerOptions.baseHeightField] - 数据中表示基础高度的字段。
     * @param {number} [layerOptions.height] - 高度。如果数据指定的heightField(默认height)没有可以表示高度的字段，可以为所有数据统一设置一个高度。
     * @param {string} [layerOptions.heightField] - 数据中表示高度的字段。
     * @param {string} [layerOptions.themeField] - 专题展示的字段。
     * @param {boolean} [layerOptions.showLegend=true] - 是否显示图例。
     * @param {string} layerOptions.legendTitle - 图例标题。
     * @param {string} [layerOptions.legendTheme='light'] - 图例主题，取值：'light','dark'。
     * @param {string} [layerOptions.legendOrientation='horizontal'] - 图例方向，取值：'horizontal','vertical'。
     * @param {string} [layerOptions.legendPosition] - 图例位置，取值：'top-right'|'top-left'|'bottom-left'|'bottom-right'。
     * @returns {Theme3DLayer} Theme3DLayer的实例对象。
     */
    setLayerOptions(layerOptions) {
        this._extend(this, layerOptions);
        return this;
    }

    /**
     * @function Theme3DLayer.prototype.setHighlightStyleOptions
     * @description 设置图层高亮相关参数。
     * @param {Object} highlightOptions - 该专题图图层高亮相关参数。
     * @param {string} [highlightOptions.color] - 颜色。
     * @param {function} highlightOptions.callback - 回调，返回数据参数（data,event）。
     * @returns {Theme3DLayer} Theme3DLayer的实例对象。
     */
    setHighlightStyleOptions(highlightOptions) {
        this._extend(this.highlight, highlightOptions);
        return this;
    }

    /**
     * @function Theme3DLayer.prototype.setData
     * @description 设置数据，数据格式必须为 GeoJSON 格式。
     * @param {GeoJSONObject} data - GeoJSON 格式数据。
     * @param {boolean} [parseNumber=false] - 是否进行数据预处理，有些字段是 string 类型，需要转换为 number。
     */
    setData(data, parseNumber) {
        var me = this;
        me.data = data;
        if (parseNumber != null) {
            me.parseNumber = parseNumber;
        }
        me.parseNumber && me.data && me.data.features && me.data.features.map(function (val) {
            if (me.baseHeightField && val.properties[me.baseHeightField]) {
                val.properties[me.baseHeightField] = parseFloat(val.properties[me.baseHeightField]);
            }
            if (me.heightField && val.properties[me.heightField]) {
                val.properties[me.heightField] = parseFloat(val.properties[me.heightField]);
            }
            return val;
        });
        return this;
    }

    /**
     * @function Theme3DLayer.prototype.getData
     * @description 获取数据。
     * @returns {GeoJSONObject} 获取的数据。
     */
    getData() {
        return this.data;
    }

    /**
     * @function Theme3DLayer.prototype.addTo
     * @description 添加图层到地图上。
     * @param {mapboxgl.Map} map - MapBoxGL Map 对象。
     * @returns {Theme3DLayer} Theme3DLayer的实例对象。
     */
    addTo(map) {
        this.map = map;
        if (!this.map) {
            return this;
        }

        this.show();
        return this;
    }

    /**
     * @function Theme3DLayer.prototype.show
     * @description 显示图层。
     * @param {Object} options - 图层配置项。
     * @returns {Theme3DLayer} Theme3DLayer的实例对象。
     */
    show(options) {
        this._extend(this, options);
        this._addLayer();
        if (this.enableHighlight) {
            this._addHighLightLayer();
        }
        if (this.showLegend) {
            if (!this.legend) {
                this.legend = this._createLegendControl();
            }
            this.map.addControl(this.legend, this.legendPosition);
        }
        return this;
    }

    /**
     * @function Theme3DLayer.prototype.remove
     * @description 从地图上移除图层。
     * @returns {Theme3DLayer} Theme3DLayer的实例对象。
     */
    remove() {
        if (!this.map) {
            return this;
        }
        //移除图层
        var layerId = this.id ? this.id : "theme3DLayer";
        if (this.map.getLayer(layerId)) {
            this.map.off('mousemove', layerId, this._onMouseMove.bind(this));
            this.map.on('mouseout', layerId, this._onMouseMove.bind(this));
            this.map.removeLayer(layerId);
        }
        //移除高亮图层
        if (this.map.getLayer(this._highlightLayerId)) {
            this._selectFeatureId = null;
            this.map.removeLayer(this._highlightLayerId );
        }

        //移除图例
        if (this.legend) {
            this.map.removeControl(this.legend);
        }
        return this;
    }

    /**
     * @function Theme3DLayer.prototype.getLayerStyleOptions
     * @description 获取图层样式。
     * @returns {Object} Mapbox GL 样式对象。
     */
    getLayerStyleOptions() {
        //子类重写实现
    }

    /**
     * @function Theme3DLayer.prototype.getHighlightStyleOptions
     * @description 获取高亮样式，子类重写实现。
     * @returns {Object} Mapbox GL 样式对象。
     */
    getHighlightStyleOptions() {
        //子类重写实现
    }

    _createLegendControl(html) {
        var me = this;

        function LegendControl() {
        }

        LegendControl.prototype.onAdd = function (map) {
            this._map = map;
            this._container = document.createElement('div');
            var className = 'mapboxgl-ctrl legend ';
            var theme = 'legend-light';
            if (me.legendTheme === 'dark') {
                theme = 'legend-dark';
            }
            var orientation = ' legend-horizontal';
            if (me.legendOrientation === 'vertical') {
                orientation = ' legend-vertical';
            }
            this._container.className = className + theme + orientation;

            if (html) {
                this._container.innerHTML = html;
            } else {
                var legendTitle = me.legendTitle || "";
                var titleElement = " <div class='legend-title'>" + legendTitle + "</div>";
                var content = me._createLegendElement.call(me) || "";
                var contentElement = "<div class='legend-content'>" + content + "</div>";
                this._container.innerHTML = titleElement + contentElement;
            }
            me._appendLegendCSSStyle();
            return this._container;
        };

        LegendControl.prototype.onRemove = function () {
            this._container.parentNode.removeChild(this._container);
            this._map = undefined;
        };

        return new LegendControl();
    }

    _createLegendElement() {
        //子类实现
    }

    _addLayer() {
        var paintOptions = this.getLayerStyleOptions();
        var id = this.id ? this.id : "theme3DLayer";
        var sourceId = this.sourceId = id + 'Source';
        if (!this.map.getSource(sourceId)) {
            this.map.addSource(sourceId, {
                'type': 'geojson',
                'data': this.data
            });
        } else {
            this.map.removeSource(sourceId);
            this.map.addSource(sourceId, {
                'type': 'geojson',
                'data': this.data
            });
        }
        this.map.addLayer({
            'id': id,
            'type': 'fill-extrusion',
            'source': sourceId,
            'paint': paintOptions
        });
        this.map.moveLayer(id);
    }

    //添加高亮图层
    _addHighLightLayer() {
        if (!this.map) {
            return;
        }
        var map = this.map;
        map.addLayer({
            'id': this._highlightLayerId,
            'type': 'fill-extrusion',
            'source': this.sourceId,
            'paint': this.getHighlightStyleOptions(),
            "filter": ["in", "$id", ""]
        });

        this._selectFeatureId = null;
        map.on('mousemove', this.id, this._onMouseMove.bind(this));
        map.on('mouseout', this.id, this._onMouseMove.bind(this));
    }

    _onMouseMove(e) {
        var me = this, map = this.map;
        var features = map.queryRenderedFeatures(e.point, {layers: [me.id]});

        if (me.highlight && me.highlight.callback) {
            me.highlight.callback(features, e);
        }

        if (!features || features.length < 1) {
            me._clearHighlight.call(me);
            me._selectFeatureId = null;
            return;
        }
        var id = features[0].id;
        if (me._selectFeatureId === id) {
            return;
        }
        me._selectFeatureId = id;
        map.setFilter(me._highlightLayerId, ['==', '$id', me._selectFeatureId]);
    }

    _clearHighlight() {
        if (this.map) {
            this.map.setFilter(this._highlightLayerId, ["in", "$id", ""]);
        }
    }

    _appendLegendCSSStyle() {
        var legendStyle = document.createElement('style');
        legendStyle.type = 'text/css';
        var baseStyle = `
        .legend {
            display: inline-block;
            border-radius: 2px;
            -moz-border-radius: 2px;
            -webkit-border-radius: 2px;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.8);
            background-color: rgb(255, 255, 255);
        }
        .legend-light {
            color: rgba(0, 0, 0, 0.8);
            background-color: rgb(255, 255, 255);
            box-shadow: 0px 0px 6px #bbbbbb;
            -moz-box-shadow: 0px 6px 10px #bbbbbb;
            -webkit-box-shadow: 0px 0px 6px #bbbbbb;
        }
        .legend-dark {
            color: rgba(255, 255, 255, 0.8);
            background-color: rgb(64, 64, 64);
        }
        .legend .legend-title {
            min-height: 14px;
            max-width: 500px;
            padding:6px 10px;
        }
        .legend-light .legend-title {
            color: rgba(0, 0, 0, 0.8);
        }
        .legend-dark .legend-title {
            color: rgba(255, 255, 255, 0.8);
        }
        .legend-content{
            padding:6px 10px;
        }
        `;
        legendStyle.innerHTML = baseStyle + this._legendCSSStyle();
        document.getElementsByTagName('head')[0].appendChild(legendStyle);
    }

    //各种图层对应的自己的图例的样式
    _legendCSSStyle() {
        //子类可重写实现
        return `
        .legend ul {
            padding: 0;
            margin: 0 16px;
            height: 100%;
            display: block;
            list-style: none;
        }

        .legend li {
            vertical-align: middle;
        }

        .legend li span:first-child {
            vertical-align: middle;
        }

        .legend li span:last-child {
            line-height: 28px;
            max-width: 200px;
            vertical-align: middle;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            -ms-text-overflow: ellipsis;
        }

        .legend-vertical li {
            height: 28px;
        }

        .legend-vertical li span:first-child {
            display: inline-block;
            width: 60px;
            height: 100%;
        }

        .legend-vertical li span:last-child {
            display: inline-block;
            margin-left: 16px;
            height: 100%;
        }

        .legend-horizontal li {
            height: 56px;
            float: left;
        }

        .legend-horizontal li span:first-child {
            display: block;
            width: 100%;
            height: 50%;
        }

        .legend-horizontal li span:last-child {
            display: block;
            vertical-align: middle;
            width: 60px;
            height: 50%;
            text-align: center;
        }
        `;
    }

    _extend(dest) {
        for (var index = 0; index < Object.getOwnPropertyNames(arguments).length; index++) {
            var arg = Object.getOwnPropertyNames(arguments)[index];
            if (arg == "caller" || arg == "callee" || arg == "length" || arg == "arguments") {
                continue;
            }
            var obj = arguments[arg];
            if (obj) {
                for (var j = 0; j < Object.getOwnPropertyNames(obj).length; j++) {
                    var key = Object.getOwnPropertyNames(obj)[j];
                    if (arg == "caller" || arg == "callee" || arg == "length" || arg == "arguments") {
                        continue;
                    }
                    dest[key] = obj[key];
                }
            }
        }
        return dest;
    }
}
