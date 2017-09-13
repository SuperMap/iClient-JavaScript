import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.supermap.RankTheme3DLayer
 * @classdesc 三维分段专题图
 * @param  id -{string} 专题图图层id
 * @param  map -{object} mapbox gl地图对象
 * @param  layerOptions -{Object} 专题图图层配置项<br>
 *             opacity -{number} 图层透明度，默认1<br>
 *             parseNumber -{boolean} 是否预处理数据，将数据转换为number，默认false<br>
 *             baseHeightField -{string} 数据中表示基础高度的字段<br>
 *             heightField -{string} 数据中表示高度的字段<br>
 *             heightStops -{Array} 数据高度分段数组<br>
 *             colorField -{string} 数据中表示颜色的字段<br>
 *             colorStops -{Array} 数据颜色分段数组<br>
 *             base -{number} 数据分段线性增量<br>
 *             showLegend -{boolean} 是否显示图例,默认显示<br>
 *             legendTitle -{string} 图例标题<br>
 *             legendTheme -{string} 图例主题，取值：'light','dark'<br>
 *             legendRatio -{number} 图例数值扩大系数，<br>
 *             legendPosition -{string} 图例位置，取值：'top-right'|'top-left'|'bottom-left'|'bottom-right'<br>
 */
export class RankTheme3DLayer {

    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.id -{string}
     * @description mapbox gl图层id
     */
    id = null;


    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.map -{object}
     * @description mapbox gl地图对象
     */
    map = null;
    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.opacity -{number}
     * @description 图层透明度，默认1
     */
    opacity = 1;
    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.parseNumber -{boolean}
     * @description 是否进行数据预处理,有些字段是string类型，需要转换为number
     */
    parseNumber = false;


    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.baseHeightField -{string}
     * @description 数据中表示基础高度的字段
     */
    baseHeightField = null;

    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.heightField -{string}
     * @description 数据中表示高度的字段
     */
    heightField = null;
    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.heightStops -{Array}
     * @description 数据高度分段数组
     */
    heightStops = null;

    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.colorField -{string}
     * @description 数据中表示颜色的字段
     */
    colorField = null;
    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.colorStops -{Array}
     * @description 数据颜色分段数组
     */
    colorStops = null;
    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.base -{number}
     * @description 数据分段线性增量
     */
    base = null;
    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.showLegend -{Boolean}
     * @description 是否显示图例
     */
    showLegend = true;

    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.legendTitle -{string}
     * @description 图例标题
     */
    legendTitle = null;
    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.legendRatio -{number}
     * @description 图例数值扩大系数
     */
    legendRatio = 1;
    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.legendTheme -{string}
     * @description 图例主题，取值：'light','dark'
     * @default 'light'
     */
    legendTheme = 'light';
    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.legendPosition -{string}
     * @description 图例位置，取值：'top-right'|'top-left'|'bottom-left'|'bottom-right'
     * @default 'bottom-right'
     */
    legendPosition = 'bottom-right';

    constructor(id, map, layerOptions) {
        this.id = id;
        this.map = map;
        this._extend(this, layerOptions);
        this.heightField = layerOptions.heightField || 'height';
        this.colorField = layerOptions.colorField || this.heightField;
    }

    /**
     * @function mapboxgl.supermap.RankTheme3DLayer.prototype.setLayerOptions
     * @description 设置图层相关参数
     * @param layerOptions -{object} 该专题图图层相关参数<br>
     * *          opacity -{number} 图层透明度，默认1<br>
     *            parseNumber -{boolean} 是否预处理数据，将数据转换为number，默认false<br>
     *            baseHeightField -{string} 数据中表示基础高度的字段<br>
     *            heightField -{string} 数据中表示高度的字段<br>
     *            heightStops -{Array} 数据高度分段数组<br>
     *            colorField -{string} 数据中表示颜色的字段<br>
     *            colorStops -{Array} 数据颜色分段数组<br>
     *            base -{number} 数据分段线性增量<br>
     *            showLegend -{boolean} 是否显示图例,默认显示<br>
     *            legendTitle -{string} 图例标题<br>
     *            legendRatio -{number} 图例数值扩大系数，<br>
     *            legendTheme -{string} 图例主题，取值：'light','dark'<br>
     *            legendPosition -{string} 图例位置，取值：'top-right'|'top-left'|'bottom-left'|'bottom-right'<br>
     * @returns {mapboxgl.supermap.RankTheme3DLayer}
     */
    setLayerOptions(layerOptions) {
        this._extend(this, layerOptions);
        return this;
    }

    /**
     * @function mapboxgl.supermap.RankTheme3DLayer.prototype.setData
     * @description 设置数据，数据格式必须为geojson格式
     * @param data -{object} geojson格式数据
     * @param parseNumber -{object} 是否进行数据预处理,有些字段是string类型，需要转换为number
     */
    setData(data, parseNumber) {
        var me = this;
        me.data = data;
        if (parseNumber != null) {
            me.parseNumber = parseNumber;
        }
        me.parseNumber && me.data && me.data.features && me.data.features.map(function (val, index) {
            if (me.baseHeightField && val.properties[me.baseHeightField]) {
                val.properties[baseHeightField] = parseFloat(val.properties[baseHeightField]);
            }
            if (me.heightField && val.properties[me.heightField]) {
                val.properties[me.heightField] = parseFloat(val.properties[me.heightField]);
            }
        });
        return this;
    }

    /**
     * @function mapboxgl.supermap.RankTheme3DLayer.prototype.getData
     * @description 获取数据，返回的数据格式为geojson
     * @returns {Object}
     */
    getData() {
        return this.data;
    }

    /**
     * @function mapboxgl.supermap.RankTheme3DLayer.prototype.show
     * @description 显示图层
     * @param options -{object} 图层相关参数，如图例标题和主题等
     * @returns {mapboxgl.supermap.RankTheme3DLayer}
     */
    show(options) {
        this._addLayer();
        this._extend(this, options);
        if (this.showLegend) {
            if (this.legend) {
                map.addControl(legend, this.legendPosition);
            } else {
                var defaultLegend = this._createLegendControl();
                this.map.addControl(defaultLegend, this.legendPosition);
            }
        }
        return this;
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
            this._container.className = className + theme;

            if (html) {
                this._container.innerHTML = html;
            } else {
                this._container.innerHTML = me._createLegendElement.call(me);
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
        var len = this.colorStops && this.colorStops.length || 0;
        var titleWidth = len * 60;
        //图例标题
        var titleElement = "";
        var legendTitle = this.legendTitle || "";
        titleElement = " <p class='legend-title' style='width: " + titleWidth + ";'>" + legendTitle + "</p>";
        //颜色分段对应标识
        var colorGalleryElement = "<ul>";
        var valueGalleryElement = "<ul>";
        for (var i = 0; i < len; i++) {
            var value = this.colorStops[i][0];
            this.legendRatio = (this.legendRatio == null) ? 1 : this.legendRatio;
            value = value * this.legendRatio;
            var text = this._getWrapperText(value);
            var color = this.colorStops[i][1];
            colorGalleryElement += "<li style='background-color:" + color + ";'></li>";
            valueGalleryElement += "<li>" + text + "</li>";
        }
        colorGalleryElement += "</ul>";
        valueGalleryElement += "</ul>";
        return titleElement + colorGalleryElement + valueGalleryElement;
    }

    _appendLegendCSSStyle() {
        var legendStyle = document.createElement('style');
        legendStyle.type = 'text/css';
        legendStyle.innerHTML = " .legend {\n" +
            "            display: inline-block;\n" +
            "            padding: 4px 10px;\n" +
            "            border-radius: 2px;\n" +
            "            -moz-border-radius: 2px;\n" +
            "            -webkit-border-radius: 2px;\n" +
            "            font-size: 12px;\n" +
            "            color: rgba(0, 0, 0, 0.8);\n" +
            "            background-color: rgb(255, 255, 255);\n" +
            "        }\n" +
            "        .legend-light {\n" +
            "            color: rgba(0, 0, 0, 0.8);\n" +
            "            background-color: rgb(255, 255, 255);\n" +
            "        }\n" +
            "        .legend-dark {\n" +
            "            color: rgba(255, 255, 255, 0.8);\n" +
            "            background-color: rgb(64, 64, 64);\n" +
            "        }\n" +
            "        .legend ul {\n" +
            "            clear: both;\n" +
            "            overflow: auto;\n" +
            "            padding: 0;\n" +
            "            margin: 0;\n" +
            "            height: 100%;\n" +
            "            display: block;\n" +
            "            list-style: none;\n" +
            "            box-sizing: border-box;\n" +
            "            -webkit-font-smoothing: antialiased;\n" +
            "        }\n" +
            "        .legend li {\n" +
            "            float: left;\n" +
            "            width: 50px;\n" +
            "            height: 28px;\n" +
            "            overflow: hidden;\n" +
            "            text-overflow: clip;\n" +
            "            padding: 0 4px;\n" +
            "            line-height: 28px;\n" +
            "        }\n" +
            "        .legend .legend-title {\n" +
            "            min-height: 14px;\n" +
            "            max-width: 500px;\n" +
            "            margin: 4px 0;\n" +
            "        }\n" +
            "       .legend-light .legend-title {\n" +
            "            color: rgba(0, 0, 0, 0.8);\n" +
            "        }\n" +
            "        .legend-dark .legend-title {\n" +
            "            color: rgba(255, 255, 255, 0.8);\n" +
            "        }";
        document.getElementsByTagName('head')[0].appendChild(legendStyle);
    }

    _getWrapperText(number) {
        //单个颜色值宽度为60px,最大只能完全显示1000000，否则就超出宽度，则显示以为k计数单位的值
        var num = parseFloat(number);
        if (num % 1000000 <= 1000000) {
            return num.toString();
        }
        return parseInt(num / 1000) + 'k'
    }

    _addLayer() {
        var paintOptions = this._getPaintOptions();
        var id = this.id ? this.id : "rankTheme";
        var sourceId = id + 'Source';
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
        }, id);
        this.map.moveLayer(id);
    }

    _getPaintOptions() {
        var opacity = this.opacity == null ? 1 : this.opacity;
        opacity = isNaN(parseFloat(opacity)) ? 1 : parseFloat(opacity);
        var reg = /^[0-9]+.?[0-9]*$/;
        var options = {
            'fill-extrusion-color': {
                'stops': this.colorStops,
                'property': this.colorField || this.heightField,
                'base': reg.test(this.base) ? this.base : 1
            },
            'fill-extrusion-opacity': opacity
        };
        if (this.heightStops) {
            options['fill-extrusion-height'] = {
                'stops': this.heightStops,
                'property': this.heightField || 'height',
                'base': reg.test(this.base) ? this.base : 1
            }
        } else {
            options['fill-extrusion-height'] = {
                'property': this.heightField || 'height',
                'type': 'identity'
            }
        }

        if (this.baseHeightField) {
            options['fill-extrusion-base'] = {
                'property': this.baseHeightField,
                'type': 'identity'
            }
        }
        return options;
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
    };
}

mapboxgl.supermap = mapboxgl.supermap || {};
mapboxgl.supermap.RankTheme3DLayer = RankTheme3DLayer;