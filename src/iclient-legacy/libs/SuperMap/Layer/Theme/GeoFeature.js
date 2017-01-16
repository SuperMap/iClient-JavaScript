/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Layer/Theme.js
 */

/**
 * Class: SuperMap.Layer.Theme.GeoFeature
 * 地理几何专题要素型专题图层基类。
 *
 * 地理几何专题要素型专题图是指专题要素由地理几何专题要素构成的专题图，它最明显的特征是专题图中的可视化对象形状与 feature.geometry 表述的地理要素形状相同。
 * 实际上此类型专题图的专题要素形状就是由 feature.geometry 决定。
 *
 * 此类不可实例化。
 *
 * Inherits from:
 *  - <SuperMap.Layer.Theme>
 */
SuperMap.Layer.Theme.GeoFeature = SuperMap.Class(SuperMap.Layer.Theme, {

    /**
     * Property: cache
     * {Object} 缓存的专题要素数据。
     */
    cache: null,

    /**
     * Property: cacheFields
     * {Array} 缓存数据的属性字段。由 feature.id + cmZoom 组成。
     */
    cacheFields: null,

    /**
     * Property: maxCacheCount
     * {Number} 缓存数据的最大个数；默认值 3 * features.length。
     */
    maxCacheCount: 0,

    /**
     * Property: isCustomSetMaxCacheCount
     * {Boolean} 用户是否自定义了 maxCacheCount 属性。
     */
    isCustomSetMaxCacheCount: false,

    /**
     * Property: nodesClipPixel
     * {Number} 节点抽稀像素距离，默认值 2。
     */
    nodesClipPixel: 2,

    /**
     * APIProperty: isHoverAble
     * {Boolean} 图形是否在 hover 时高亮 ，默认值：false。
     */
    isHoverAble: false,

    /**
     * Property: isMultiHover
     * {Boolean} 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面），默认值：false。
     */
    isMultiHover: false,

    /**
     * Property: isClickAble
     * {Boolean} 图形是否可点击，默认 true
     */
    isClickAble: true,

    /**
     * APIProperty: highlightStyle
     * {Object} 高亮样式。
     */
    highlightStyle: null,

    /**
     * Property: isAllowFeatureStyle
     * {Boolean} 是否允许 feature 样式（style） 中的有效属性应用到专题图层。
     * 通常情况下，专题图层中专题要素的样式由图层控制，数据 feature 的 style 不可应用于专题图层中的专题要素。
     *
     * 此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素
     * 的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature） 对应专题要素赋予独立 style。
     *
     * 默认值为： false，禁止对专题要素使用数据（feature）的 style。
     */
    isAllowFeatureStyle: false,

    /**
     * Property: style
     * {Array(Object)} 图层中专题要素的样式，可设值如下：
     *
     * Symbolizer properties:
     * fill - {Boolean} 是否填充，不需要填充则设置为 false，默认值为 true。此属性与 stroke 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染图层。
     * fillColor - {String} 十六进制填充颜色。默认值为 "#000000"。
     * fillOpacity - {Number} 填充不透明度。取值范围[0, 1]，默认值 1。
     * stroke - {Boolean} 是否描边，不需要描边则设置为false，默认值为 false。此属性与 fill 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染图层。
     * strokeColor - {String} 十六进制描边颜色。
     * strokeOpacity - {Number} 描边的不透明度。取值范围[0, 1]，默认值 1。
     * strokeWidth - {Number} 线宽度/描边宽度，默认值 1。
     * strokeLinecap - {String} 线帽样式；strokeLinecap 有三种类型 “butt", "round", "square"; 默认为"butt"。
     * strokeLineJoin - {String} 线段连接样式；strokeLineJoin 有三种类型 “miter", "round", "bevel"; 默认为"miter"。
     * strokeDashstyle - {Sting} 虚线类型； strokeDashstyle 有八种类型 “dot",“dash",“dashot",“longdash",“longdashdot",“solid", "dashed", "dotted"; 默认值 "solid"。solid 表示实线。
     * pointRadius - {Number} 点半径，默认为 6 （像素）。
     * shadowBlur - {number} 阴影模糊度，（大于 0 有效; 默认值 0）。注：请将 shadowColor 属性与 shadowBlur 属性一起使用，来创建阴影。
     * shadowColor - {string} 阴影颜色; 默认值 '#000000'。  注：请将 shadowColor 属性与 shadowBlur 属性一起使用，来创建阴影。
     * shadowOffsetX - {number} 阴影 X 方向偏移值; 默认值 0。
     * shadowOffsetY - {number} 阴影 Y 方向偏移值; 默认值 0。
     * label - {String} 专题要素附加文本标签内容。
     * fontColor - {String} 附加文本字体颜色。
     * fontSize - {Number} 附加文本字体大小。默认值 12，单位是像素。
     * fontStyle - {String} 附加文本字体样式。可设值："normal", "italic", "oblique"; 默认值："normal" 。
     * fontVariant - {String} 附加文本字体变体。可设值："normal", "small-caps"; 默认值："normal" 。
     * fontWeight - {String} 附加文本字体粗细。可设值："normal", "bold", "bolder", "lighter"; 默认值："normal" 。
     * fontFamily - {String} 附加文本字体系列。fontFamily 值是字体族名称或/及类族名称的一个优先表，每个值逗号分割，浏览器会使用它可识别的第一个值。可以使用具体的字体名称（"times"、"courier"、"arial"）或字体系列名称（"serif"、"sans-serif"、"cursive"、"fantasy"、"monospace"）。默认值："arial,sans-serif".
     * labelPosition - {string} 附加文本位置, 可以是 'inside', 'left', 'right', 'top', 'bottom'; 默认值 'top'。
     * labelAlign - {string} 附加文本水平对齐。可以是 'left', 'right', 'center'; 默认值 'center'。
     * labelBaseline - {string} 附加文本垂直对齐。 可以是 'top', 'bottom', 'middle';默认值 'middle'。
     * labelXOffset - {Number} 附加文本在x轴方向的偏移量。
     * labelYOffset - {Number} 附加文本在y轴方向的偏移量。
     */
    style: null,

    /**
     * Constructor: SuperMap.Layer.Theme.GeoFeature
     * 构造函数。
     *
     * Parameters:
     * name - {String} 此图层的图层名。
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Layer.Theme.GeoFeature>} 专题图。
     */
    initialize: function(name,options) {
        SuperMap.Layer.Theme.prototype.initialize.apply(this, arguments);
        this.cache = new Object();
        this.cacheFields = new Array();
        this.style = new Object();
    },

    /**
     * APIMethod: destroy
     * 销毁图层，释放资源。
     */
    destroy: function() {
        this.maxCacheCount = null;
        this.isCustomSetMaxCacheCount = null;
        this.nodesClipPixel = null;
        this.isHoverAble = null;
        this.isMultiHover = null;
        this.isClickAble = null;

        this.cache = null;
        this.cacheFields = null;
        this.style = null;
        this.highlightStyle = null;
        this.isAllowFeatureStyle = null;

        SuperMap.Layer.Theme.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: addFeatures
     * 向专题图图层中添加数据 , 专题图仅接收 SuperMap.Feature.Vector 类型数据，
     * feature 将储存于 features 属性中，其存储形式为数组。
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 需要添加的数据（矢量要素）。
     */
    addFeatures: function(features) {
        //数组
        if (!(SuperMap.Util.isArray(features))) {
            features = [features];
        }

        var event = {features: features};
        var ret = this.events.triggerEvent("beforefeaturesadded", event);
        if(ret === false) {
            return;
        }
        features = event.features;

        var featuresFailAdded = [];

        for (var i=0, len = features.length; i < len; i++) {
            this.features.push(features[i]);
        }

        var succeed = featuresFailAdded.length == 0 ? true : false;
        this.events.triggerEvent("featuresadded", {features: featuresFailAdded, succeed: succeed});

        if(!this.isCustomSetMaxCacheCount){
            this.maxCacheCount =  this.features.length * 5;
        }

        //绘制专题要素
        if(this.renderer){
            if(this.map){
                this.redrawThematicFeatures(this.map.getExtent(), false, false);
            }
            else{
                this.redrawThematicFeatures();
            }
        }
    },

    /**
     * Method: removeFeatures
     * 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。
     * 参数中的 features 数组中的每一项，必须是已经添加到当前图层中的 feature，
     * 如果无法确定 feature 数组，则可以调用 removeAllFeatures 来删除所有feature。
     * 如果要删除的 feature 数组中的元素特别多，推荐使用 removeAllFeatures，
     * 删除所有feature后再重新添加。这样效率会更高。
     *
     * 调用此函数会清空图层中缓存的专题图要素。
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 要删除feature的数组。
     */
    removeFeatures: function(features) {
        this.clearCache();
        SuperMap.Layer.Theme.prototype.removeFeatures.apply(this, arguments);
    },

    /**
     * Method: removeAllFeatures
     * 清除当前图层所有的矢量要素。
     *
     * 调用此函数会清空图层中缓存的专题图要素。
     */
    removeAllFeatures: function() {
        this.clearCache();
        SuperMap.Layer.Theme.prototype.removeAllFeatures.apply(this, arguments);
    },

    /**
     * Method: redrawThematicFeatures
     * 重绘所有专题要素。
     *
     * 此方法包含绘制专题要素的所有步骤，包含用户数据到专题要素的转换，抽稀，缓存等步骤。
     *
     * 地图漫游时调用此方法进行图层刷新。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>} 当前级别下计算出的地图范围
     * zoomChanged - {Boolean} 缩放级别是否改变
     * dragging - {Boolean} 是否为拖动触发的
     */
    redrawThematicFeatures: function(bounds, zoomChanged, dragging){
        //获取高亮专题要素对应的用户 id
        var hoverone = this.renderer.getHoverOne();
        var hoverFid = null;
        if(hoverone && hoverone.refDataID){
            hoverFid = hoverone.refDataID;
        }
        //清除当前所有可视元素
        this.renderer.clearAll();

        var features = this.features;
        var cache = this.cache;
        var cacheFields = this.cacheFields;
        var cmZoom = this.map.getZoom();

        var maxCC = this.maxCacheCount;

        for(var i = 0, len = features.length; i < len; i ++){
            var feature = features[i];
            var feaBounds = feature.geometry.getBounds();

            //剔除当前视图（地理）范围以外的数据
            if(bounds){
                if(!bounds.intersectsBounds(feaBounds)) continue;
            }

            //缓存字段
            var fields = feature.id + "_zoom_" + cmZoom.toString();

            var thematicFeature;

            //判断专题要素缓存是否存在
            if(cache[fields])
            {
                cache[fields].updateAndAddShapes();
            }
            else{
                //如果专题要素缓存不存在，创建专题要素
                thematicFeature =  this.createThematicFeature(features[i]);

                //检查 thematicFeature 是否有可视化图形
                if(thematicFeature.getShapesCount() < 1){
                    continue;
                }

                //加入缓存
                cache[fields] = thematicFeature;
                cacheFields.push(fields);

                //缓存数量限制
                if(cacheFields.length > maxCC)
                {
                    var fieldsTemp = cacheFields[0];
                    cacheFields.splice(0, 1);
                    delete cache[fieldsTemp];
                }
            }

        }

        this.renderer.render();

        //地图漫游后，重新高亮图形
        if(hoverFid && this.isHoverAble && this.isMultiHover){
            var hShapes = this.getShapesByFeatureID(hoverFid);
            this.renderer.updateHoverShapes(hShapes);
        }
    },

    /**
     * Method: createThematicFeature
     * 创建专题要素
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} 用于创建专题要素的数据（矢量要素）。
     */
    createThematicFeature: function(feature){
        //赋 style
        var style =  SuperMap.Util.copyAttributesWithClip(this.style);
        if(feature.style && this.isAllowFeatureStyle === true){
            style = SuperMap.Util.copyAttributesWithClip(feature.style);
        };

        //创建专题要素时的可选参数
        var options = {};
        options.nodesClipPixel = this.nodesClipPixel;
        options.isHoverAble = this.isHoverAble;
        options.isMultiHover = this.isMultiHover;
        options.isClickAble = this.isClickAble;
        options.highlightStyle = SuperMap.Feature.ShapeFactory.transformStyle(this.highlightStyle);

        //将数据转为专题要素（Vector）
        var thematicFeature = new SuperMap.Feature.Theme.Vector(feature, this, SuperMap.Feature.ShapeFactory.transformStyle(style), options);

        //直接添加图形到渲染器
        for(var m = 0; m < thematicFeature.shapes.length; m ++){
            this.renderer.addShape(thematicFeature.shapes[m]);
        }

        return thematicFeature;
    },

    /**
     * Method: redraw
     * 重绘该图层，成功则返回true，否则返回false。
     *
     * Returns:
     * {Boolean} 重绘该图层。
     */
    redraw: function() {
        this.clearCache();
        return SuperMap.Layer.Theme.prototype.redraw.apply(this, arguments);
    },

    /**
     * Method: clearCache
     * 清除缓存数据。
     *
     */
    clearCache: function(){
        this.cache = {};
        this.cacheFields = [];
    },

    /**
     * Method: clear
     * 清除图层内容。
     *
     * 清除的内容包括数据（features） 、专题要素、缓存。
     */
    clear: function(){
        this.renderer.clearAll();
        this.renderer.refresh();
        this.removeAllFeatures();
        this.clearCache();
    },

    /**
     * Method: getCacheCount
     * 获取当前缓存数量。
     *
     * Returns:
     * {Number} 当前缓存数量。
     */
    getCacheCount: function(){
        return this.cacheFields.length;
    },

    /**
     * Method: setMaxCacheCount
     * 设置最大缓存数量。
     *
     * Parameters:
     * cacheCount - {Number} 缓存数量。
     *
     */
    setMaxCacheCount: function(cacheCount){
        if(!isNaN(cacheCount)){
            this.maxCacheCount = cacheCount;
            this.isCustomSetMaxCacheCount = true;
        }
    },

    /**
     * Method: getShapesByFeatureID
     * 通过 FeatureID 获取 feature 关联的所有图形。
     *
     * Parameters:
     * featureID - {String} feature 的 ID。如果不传入此参数，函数将返回所有图形。
     *
     * Returns:
     * {Array<SuperMap.LevelRenderer.Shape>} 所有匹配要素 ID 的图形。
     */
    getShapesByFeatureID: function(featureID){
        var list = [];
        var shapeList = this.renderer.getAllShapes();

        if(!featureID){
            return shapeList
        };

        for(var i = 0, len = shapeList.length; i < len; i++){
            var si = shapeList[i];
            if(si.refDataID && featureID === si.refDataID){
                list.push(si);
            }
        }
        return list;
    },

    CLASS_NAME: "SuperMap.Layer.Theme.GeoFeature"
});
