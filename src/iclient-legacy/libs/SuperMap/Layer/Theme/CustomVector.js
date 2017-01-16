/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Layer/Theme.js
 */

/**
 * Class: SuperMap.Layer.CustomVector
 * 自定义矢量专题图。
 *
 * 这是一个客户端提供的特殊专题图，需要注意该图层提供的是专题要素展示功能，
 * 它展示的不是 feature 要素本身，而是由 feature 制作的专题要素，所以它不具备地理要素编辑能力。
 *
 * 自定义矢量专题图是矢量图层<SuperMap.Layer.Vector>的一个补充，而非替代，
 * 它最大的使用价值在于它可以对复杂地理要素的显示执行客户端抽稀策略和专题要素缓存策略，
 * 因此，它在展示复杂线面图形时拥有远高于矢量图层的显示效率。
 *
 * Inherits from:
 *  - <SuperMap.Layer.Theme.GeoFeature>
 */
SuperMap.Layer.CustomVector = SuperMap.Class(SuperMap.Layer.Theme.GeoFeature, {

    /**
     * APIProperty: isBaseLayer
     * {Boolean} 该图层是否是基础图层，默认值为 false。可以在构造函数中是通过 options 设置。
     */
    //isBaseLayer: false,

    /**
     * APIProperty: features
     * {Array(<SuperMap.Feature.Vector>)} 用户数据，矢量要素。
     */
    //features: null,

    /**
     * Property: isHoverAble
     * {Boolean} 图形是否在 hover 时高亮，CustomVector 中暂时不提供自动高亮，值设置为 false。
     */
    //isHoverAble: false,

    /**
     * Property: isClickAble
     * {Boolean} 图形是否可点击，默认 true
     */
    //isClickAble: true,

    /**
     * Property: isAllowFeatureStyle
     * {Boolean} 是否允许 feature 样式（style） 中的有效属性应用到专题图层。
     * 通常情况下，专题图层中专题要素的样式由图层控制，数据 feature 的 style 不可应用于专题图层中的专题要素。
     *
     * 此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素
     * 的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature） 对应专题要素赋予独立 style。
     *
     * 默认值为： true，允许对专题要素使用数据（feature）的 style。
     */
    isAllowFeatureStyle: true,

    /**
     * APIProperty: style
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
     * Constructor: SuperMap.Layer.CustomVector
     * 构造函数。
     *
     * Parameters:
     * name - {String} 此图层的图层名。
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Layer.CustomVector>} 自定义矢量专题图。
     */
    initialize: function(name,options) {
        SuperMap.Layer.Theme.GeoFeature.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 销毁图层，释放资源。
     */
    destroy: function() {
        this.style = null;
        SuperMap.Layer.Theme.GeoFeature.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: addFeatures
     * 向专题图图层中添加数据 , 专题图仅接收 SuperMap.Feature.Vector 类型数据，
     * feature 将储存于 features 属性中，其存储形式为数组。
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 需要添加的数据（矢量要素）。
     */
    //addFeatures: function(features) {},


    /**
     * Method: createThematicFeature
     * 创建专题要素
     *
     * 针对自定义矢量专题图重写此方法，允许 feature 自身的 style 生效，且自身的 style 优先级高于图层 style。
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
        //options.highlightStyle = SuperMap.Feature.ShapeFactory.transformStyle(this.highlightStyle);

        //将数据转为专题要素（Vector）
        var thematicFeature = new SuperMap.Feature.Theme.Vector(feature, this, SuperMap.Feature.ShapeFactory.transformStyle(style), options);

        //直接添加图形到渲染器
        for(var m = 0; m < thematicFeature.shapes.length; m ++){
            this.renderer.addShape(thematicFeature.shapes[m]);
        }

        return thematicFeature;
    },

    /**
     * Method: clearCache
     * 清除缓存数据。
     *
     */
     //公开父类方法 clearCache

    /**
     * Method: getCacheCount
     * 获取当前缓存数量。
     *
     * Returns:
     * {Number} 当前缓存数量。
     */
    //公开父类方法 clearCache

    /**
     * Method: setMaxCacheCount
     * 设置最大缓存数量。
     *
     * Parameters:
     * cacheCount - {Number} 缓存数量。
     *
     */
    //公开父类方法 setMaxCacheCount

    /**
     * APIMethod: clear
     * 清除图层内容。
     *
     * 清除的内容包括数据（features） 、专题要素、缓存。
     */
    //公开父类方法 clear

    /**
     * APIMethod: addFeatures
     * 向专题图图层中添加数据 , 专题图仅接收 SuperMap.Feature.Vector 类型数据，
     * feature 将储存于 features 属性中，其存储形式为数组。
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 需要添加的数据（矢量要素）。
     */
    //公开父类方法

    /**
     * APIMethod: removeFeatures
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
    //公开父类方法

    /**
     * APIMethod: removeAllFeatures
     * 清除当前图层所有的矢量要素。
     *
     * 调用此函数会清空图层中缓存的专题图要素。
     */
    //公开父类方法

    /**
     * Method: getFeatures
     * 查看当前图层中的有效数据。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 用户加入图层的有效数据。
     */
    //公开父类方法

    /**
     * APIMethod: getFeatureBy
     * 在专题图的要素数组 features 里面遍历每一个 feature，当 feature[property] === value 时，
     * 返回此 feature（并且只返回第一个）。
     *
     * Parameters:
     * property - {String} feature 的某个属性名称。
     * value - {String} property 所对应的值。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 第一个匹配属性和值的矢量要素。
     */
    //公开父类方法

    /**
     * APIMethod: getFeatureById
     * 通过给定一个 id，返回对应的矢量要素。
     *
     * Parameters:
     * featureId - {String} 矢量要素的属性 id。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 对应id的 feature，如果不存在则返回 null。
     */
    //公开父类方法

    /**
     * APIMethod: getFeaturesByAttribute
     * 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
     *
     * Parameters:
     * attrName - {String} 属性的 key。
     * attrValue - {Mixed} 属性对应的 value 值。
     *
     * Returns:
     * Array(<SuperMap.Feature.Vector>) 一个匹配的 feature 数组。
     */
    //公开父类方法

    /**
     * APIMethod: setOpacity
     * 设置图层的不透明度,取值[0-1]之间。使用方法如
     *
     * Parameter:
     * opacity - {Float} 图层的不透明度，取值范围：[0-1]。
     */
    //公开父类方法

    /**
     * APIMethod: redraw
     * 重绘该图层，成功则返回true，否则返回false。
     *
     * Returns:
     * {Boolean} 重绘该图层。
     */
    //公开父类方法

    /**
     * APIMethod: on
     * 添加专题要素事件监听。
     *
     * 支持的事件包括: click、mousedown、mousemove、mouseout、mouseover、mouseup。
     *
     * Parameters:
     * event - {String} 事件名称。
     * callback - {Function} 事件回调函数。
     *
     */
    //公开父类方法

    /**
     * APIMethod: un
     * 移除专题要素事件监听
     *
     * Parameters:
     * event - {String} 事件名称。
     * callback - {Function} 事件回调函数。
     *
     */
    //公开父类方法

    CLASS_NAME: "SuperMap.Layer.CustomVector"
});
