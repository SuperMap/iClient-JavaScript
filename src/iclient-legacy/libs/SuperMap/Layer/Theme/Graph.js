/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Layer/Theme.js
 */

/**
 * Class: SuperMap.Layer.Graph
 * 统计专题图图层。
 *
 * 统计专题图通过为每个要素绘制统计图表来反映其对应的专题值的大小。它可同时表示多个字段属性信息，在区域本身与各区域之间形成横向和纵向的对比。
 * 统计专题图多用于具有相关数量特征的地图上，比如表示不同地区多年的粮食产量、GDP、人口等，不同时段客运量、地铁流量等。允许一次分析多个数值型变量，
 * 即可以将多个变量的值绘制在一个统计图上。目前提供的统计图类型有：柱状图（Bar），折线图（Line），饼图（Pie），三维柱状图（Bar3D），点状图（Point），
 * 环状图（Ring）。
 *
 * SuperMap iClient for JavaScript 的库文件不包含图表类文件，在使用客户端统计专题图时需要单独引入所需的图表类文件。
 * SuperMap iClient for JavaScript 产品包中提供的图表类文件所在目录是："产品包根目录/examples/js/graph"。
 *
 * Inherits from:
 *  - <SuperMap.Layer.Theme>
 */
// 目前提供的统计图类型有：柱状图，折线图，饼图，面积图（Area），阶梯图（Step），点状图（Point），三维柱状图（Bar3D），三维饼图，玫瑰图，三维玫瑰图，堆叠柱状图以及三维堆叠柱状图。
SuperMap.Layer.Graph = SuperMap.Class(SuperMap.Layer.Theme, {

    /**
     * APIProperty: chartsSetting
     * {Object} 图表配置对象，必设属性。chartsSetting 对象的可设属性根据图表类型的不同具有较大差异，
     * 各类型图表的 chartsSetting 对象可设属性请参考图表模型类的注释中对 chartsSetting 对象可设属性的描述。
     *
     * 所有图表类型的 chartsSetting 对象通常都具有以下 7 个基础可设属性：
     *
     * Symbolizer properties:
     * width - {Number} 专题要素（图表）宽度，必设参数。
     * height - {Number} 专题要素（图表）高度，必设参数。
     * codomain - {Array{Number}} 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。
     * XOffset - {Number}  专题要素（图表）在 X 方向上的偏移值，单位像素。
     * YOffset - {Number}  专题要素（图表）在 Y 方向上的偏移值，单位像素。
     * dataViewBoxParameter - {Array{Number}} 数据视图框 dataViewBox 参数，
     * 它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值，长度为 4 的一维数组。
     * decimalNumber - {Number} 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
     */
    chartsSetting: null,

    /**
     * APIProperty: themeFields
     * {Array} 指定用于统计图表制作的属性字段名称。此属性字段是是用户数据（feature） attributes 中包含的字段，
     * 且字段对应的值的类型必须是数值型（Number）。必设属性。
     */
    themeFields: null,

    /**
     * APIProperty: overlayWeightField
     * {String} 压盖判断权重字段名称，此属性字段是是用户数据（feature） attributes 中包含的字段，且字段对应的值的类型必须是数值型（Number）。
     * 此属性字段的值将作为用户数据（feature）所对应图表的压盖处理权重值。压盖处理权重值的规则是：权重值高的图表优先执行压盖判断，有权重的图表优先于无权重图表执行压盖判断。
     * 注意：压盖判断权重值高的图表不一定优先显示，考虑以下情况：三个压盖处理权重值依次降低的图表，第一个图表(权重值最高)已显示；
     * 第二个图表(权重值次之)在进行压盖判断时发现与第一个图表产生压盖，不显示；第三个图表(权重值最低)在进行压盖判断时发现它不对已显示图表产生压盖，显示此图表；
     * 这样权重值低的第三个图表会在图层中显示，权重值高的第二个图表不会显示。
     */
    overlayWeightField: null,

    /**
     * APIProperty: isOverLay
     * {Boolean} 是否进行压盖处理，如果设为 true，图表绘制过程中将隐藏对已在图层中绘制的图表产生压盖的图表，
     * 例如：图层已绘制好图表A，现在准备绘制图表B，压盖处理程序会先检查图表B是否对已绘制好图表A产生压盖,
     * 只有当图表B和图表A范围完全不相交时，图表B才会被图层绘制出来。默认值：true。
     */
    isOverLay: true,

    /**
     * Property: charts
     *
     * {Array} 统计图表存储（缓存）。
     */
    charts: null,

    /**
     * Property: cache
     * {Object} 缓存的专题要素数据记录。
     */
    cache: null,

    /**
     * Property: chartsType
     * {String} 图表类型。目前可用："Bar", "Line", "Pie"。
     */
    chartsType: null,

    /**
     * Constructor: SuperMap.Layer.Graph
     * 构造函数，创建一个统计专题图层。
     *
     * (code)
     * var themeGraphLayer = new SuperMap.Layer.Graph("ThemeGraphLayer", "Bar");
     * (end)
     *
     * Parameters:
     * name - {String} 此图层的图层名，必设参数。
     * chartsType - {String} 图表类型，必设参数，目前支持："Bar", "Line", "Pie"。
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Layer.Graph>} 专题图。
     */
    initialize: function(name, chartsType, options) {
        var newArgs = [];
        newArgs.push(name);
        newArgs.push(options);
        SuperMap.Layer.Theme.prototype.initialize.apply(this, newArgs);
        this.chartsType = chartsType;
        this.charts = [];
        this.cache = {};
        this.chartsSetting = {};
    },

    /**
     * APIMethod: destroy
     * 销毁图层，释放资源。调用此函数后，图层对象的所有属性将被字为空。
     *
     * (code)
     * var themeGraphLayer = new SuperMap.Layer.Graph("ThemeGraphLayer", "Bar");
     * themeGraphLayer.destroy();
     * (end)
     */
    destroy: function() {
        this.chartsType = null;
        this.chartsSetting = null;
        this.themeFields = null;
        this.overlayWeightField = null;
        this.isOverLay = null;
        SuperMap.Layer.Theme.prototype.destroy.apply(this, arguments);
        // charts  cache 为缓存，需要在父类destory后置为null（父类destory中有方法会初始化缓存参数）
        this.charts = null;
        this.cache = null;
    },

    /**
     * APIMethod: setChartsType
     * 设置图表类型，此函数可动态改变图表类型。
     * 在调用此函数前请通过 chartsSetting 为新类型的图表做相关配置。
     *
     * (code)
     * var themeGraphLayer = new SuperMap.Layer.Graph("ThemeGraphLayer", "Bar");
     * themeGraphLayer.setChartsType("Line");
     * (end)
     *
     * Parameters:
     * chartsType - {String} 图表类型，目前支持："Bar", "Line", "Pie"。
     */
    setChartsType: function(chartsType) {
        this.chartsType = chartsType;
        this.redraw();
    },

    /**
     * APIMethod: addFeatures
     * 向专题图图层中添加数据 , 统计专题图仅接收 SuperMap.Feature.Vector 类型数据，
     * feature 将储存于 features 属性中，其存储形式为数组。
     *
     * (code)
     * var themeGraphLayer = new SuperMap.Layer.Graph("ThemeGraphLayer", "Bar");
     * themeGraphLayer.addFeatures(features);
     * (end)
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
     * Method: redrawThematicFeatures
     * 重绘所有专题要素。
     *
     * 此方法包含绘制专题要素的所有步骤，包含用户数据到专题要素的转换，压盖处理，缓存等步骤。
     *
     * 地图漫游时调用此方法进行图层刷新。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>} 当前级别下计算出的地图范围。
     * zoomChanged - {Boolean} 缩放级别是否改变。
     * dragging - {Boolean} 是否为拖动触发的。
     */
    redrawThematicFeatures: function(bounds, zoomChanged, dragging){
        //清除当前所有可视元素
        this.renderer.clearAll();

        var features = this.features;
        for(var i = 0, len = features.length; i < len; i ++){
            var feature = features[i];
            // 要素范围判断
            var feaBounds = feature.geometry.getBounds();

            //剔除当前视图（地理）范围以外的数据
            if(bounds){
                if(!bounds.intersectsBounds(feaBounds)) continue;
            }

            var cache = this.cache;

            // 用 feature id 做缓存标识
            var cacheField = feature.id;

            // 数据对应的图表是否已缓存，没缓存则重新创建图表
            if(!cache[cacheField]){
                cache[cacheField] = cacheField;
                var chart = this.createThematicFeature(feature);

                // 压盖处理权重值
                if(chart && this.overlayWeightField){
                    if(feature.attributes[this.overlayWeightField] && !isNaN(feature.attributes[this.overlayWeightField])){
                        chart["__overlayWeight"] = feature.attributes[this.overlayWeightField];
                    }
                }

                if(chart){
                    this.charts.push(chart);
                }
            }
        }

        this.drawCharts();
    },

    /**
     * Method: createThematicFeature
     * 创建专题要素（图表）
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} 用于创建专题要素的数据（矢量要素）。
     *
     * Returns:
     * {Object} 专题要素对象。创建失败返回 false。
     */
    createThematicFeature: function(feature){
        var thematicFeature;

        // 检查图表创建条件并创建图形
        if(SuperMap.Feature.Theme[this.chartsType] && this.themeFields && this.chartsSetting){
            thematicFeature = new SuperMap.Feature.Theme[this.chartsType](feature, this, this.themeFields, this.chartsSetting);
        }

        // thematicFeature 是否创建成功
        if(!thematicFeature) return false;

        // 对专题要素执行图形装载
        thematicFeature.assembleShapes();

        return thematicFeature;
    },

    /**
     * Method: drawCharts
     * 绘制图表。
     *
     * 包含压盖处理。
     *
     * 将属性 charts 中的图表绘制到图层中。
     */
    drawCharts: function(){
        // 判断 rendere r就绪
        if(!this.renderer) return;

        var charts = this.charts;

        // 图表权重值处理
        if(this.overlayWeightField){
            charts.sort(function(cs, ce){
                if(typeof(cs["__overlayWeight"]) == "undefined" && typeof(ce["__overlayWeight"]) == "undefined"){
                    return 0;
                }
                else if(typeof(cs["__overlayWeight"]) != "undefined" && typeof(ce["__overlayWeight"]) == "undefined"){
                    return -1;
                }
                else if(typeof(cs["__overlayWeight"]) == "undefined" && typeof(ce["__overlayWeight"]) != "undefined"){
                    return 1;
                }
                else if(typeof(cs["__overlayWeight"]) != "undefined" && typeof(ce["__overlayWeight"]) != "undefined"){
                    if(parseFloat(cs["__overlayWeight"]) < parseFloat(ce["__overlayWeight"])){
                        return 1;
                    }
                    else{
                        return -1;
                    }
                }

            });
        }

        // 不进行避让 
        if(!this.isOverLay) {
            for(var m = 0, len_m = charts.length; m < len_m; m++){
                var chart_m = charts[m];

                // 图形参考位置  (reSetLocation 会更新 chartBounds)
                var shapeROP_m = chart_m.resetLocation();

                // 添加图形
                var shapes_m = chart_m.shapes;
                for(var n = 0, slen_n = shapes_m.length; n < slen_n; n++){
                    shapes_m[n].refOriginalPosition = shapeROP_m;
                    this.renderer.addShape(shapes_m[n]);
                }
            }
        }
        else {
            // 压盖判断所需 chartsBounds 集合
            var chartsBounds = [];

            var mapBounds = this.map.getExtent();
            if(mapBounds){
                // 获取地图像素 bounds
                var mapPxLT = this.getLocalXY(new SuperMap.LonLat(mapBounds.left, mapBounds.top));
                var mapPxRB  = this.getLocalXY(new SuperMap.LonLat(mapBounds.right, mapBounds.bottom));
                var mBounds = new SuperMap.Bounds(mapPxLT[0], mapPxRB[1], mapPxRB[0], mapPxLT[1]);

                // 压盖处理 & 添加图形
                for(var i = 0, len = charts.length; i < len; i++){
                    var chart = charts[i];

                    // 图形参考位置  (reSetLocation 会更新 chartBounds)
                    var shapeROP = chart.resetLocation();

                    // 图表框
                    var cbs = chart.chartBounds;
                    var cBounds = [{"x": cbs.left, "y": cbs.top}, {"x": cbs.left, "y": cbs.bottom}, {"x": cbs.right, "y": cbs.bottom}, {"x": cbs.right, "y": cbs.top}, {"x": cbs.left, "y": cbs.top}];

                    // 地图范围外不绘制
                    if(mBounds){
                        if(!this.isChartInMap(mBounds, cBounds)) continue;
                    }

                    // 是否压盖
                    var isOL = false;

                    if (i !== 0) {
                        for (var j = 0; j < chartsBounds.length; j++) {
                            //压盖判断
                            if (this.isQuadrilateralOverLap(cBounds, chartsBounds[j])) {
                                isOL = true;
                                break;
                            }
                        }
                    }

                    if(isOL){
                        continue;
                    }
                    else{
                        chartsBounds.push(cBounds);
                    }

                    // 添加图形
                    var shapes = chart.shapes;
                    for(var j = 0, slen = shapes.length; j < slen; j++){
                        shapes[j].refOriginalPosition = shapeROP;
                        this.renderer.addShape(shapes[j]);
                    }
                }
            }
        }

        // 绘制图形
        this.renderer.render();
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

    /**
     * Method: isQuadrilateralOverLap
     * 判断两个四边形是否有压盖。
     *
     * Parameters:
     * quadrilateral - {Array<Objecy>}  四边形节点数组。例如：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     * quadrilateral2 - {Array<Object>}  第二个四边形节点数组。
     *
     * Returns:
     * {Boolean} 是否压盖，true表示压盖。
     */
    isQuadrilateralOverLap: function (quadrilateral, quadrilateral2) {
        var quadLen = quadrilateral.length,
            quad2Len = quadrilateral2.length;
        if(quadLen !==5 || quad2Len !== 5) return null;//不是四边形

        var OverLap = false;
        //如果两四边形互不包含对方的节点，则两个四边形不相交
        for(var i = 0; i <quadLen; i++){
            if(this.isPointInPoly(quadrilateral[i], quadrilateral2)){
                OverLap = true;
                break;
            }
        }
        for(var i = 0; i <quad2Len; i++){
            if(this.isPointInPoly(quadrilateral2[i], quadrilateral)){
                OverLap = true;
                break;
            }
        }
        //加上两矩形十字相交的情况
        for(var i = 0; i < quadLen - 1; i++){
            if(OverLap){
                break;
            }
            for(var j = 0; j < quad2Len -1; j++){
                var isLineIn = SuperMap.Util.lineIntersection(quadrilateral[i], quadrilateral[i+1], quadrilateral2[j], quadrilateral2[j+1]);
                if(isLineIn.CLASS_NAME === "SuperMap.Geometry.Point"){
                    OverLap = true;
                    break;
                }
            }
        }

        return OverLap;
    },

    /**
     * Method: PointInPoly
     * 判断一个点是否在多边形里面。(射线法)
     *
     * Parameters:
     * pt - {Object} 需要判定的点对象，该对象含有属性x(横坐标)，属性y(纵坐标)。
     * poly - {Array(Objecy)}  多边形节点数组。例如一个四边形：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]
     * Returns:
     * {Boolean} 点是否在多边形内
     */
    isPointInPoly: function(pt, poly) {
        for (var isIn = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
                && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
            && (isIn = !isIn);
        return isIn;
    },

    /**
     * Method: isChartInMap
     * 判断图表是否在地图里。
     *
     * Parameters:
     * mapPxBounds - {<SuperMap.Bounds>} 地图像素范围。
     * chartPxBounds - - {Array<Objecy>}  图表范围的四边形节点数组。例如：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     *
     * Returns:
     * {Boolean} 图表是否在地图里
     */
    isChartInMap: function(mapPxBounds, chartPxBounds) {
        var mb = mapPxBounds;

        var isIn = false;
        for(var i = 0, len = chartPxBounds.length; i < len; i++){
             var cb = chartPxBounds[i];

            if(cb.x >= mb.left && cb.x <= mb.right && cb.y >= mb.top && cb.y <= mb.bottom){
                isIn = true;
                break;
            }
        }

        return isIn;
    },

    /**
     * Method: clearCache
     * 清除缓存数据。
     *
     */
    clearCache: function(){
        this.cache = {};
        this.charts = [];
    },

    // 重写方法
    /**
     * APIMethod: removeFeatures
     * 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素（数据）。
     * 参数中的 features 数组中的每一项，必须是已经添加到当前图层中的 feature，
     * 如果无法确定 feature 数组，则可以调用 removeAllFeatures 来删除所有feature。
     * 如果要删除的 feature 数组中的元素特别多，推荐使用 removeAllFeatures，
     * 删除所有feature后再重新添加。这样效率会更高。
     *
     * 调用此函数会清空图层中缓存的图表。
     *
     * (code)
     * var themeGraphLayer = new SuperMap.Layer.Graph("ThemeGraphLayer", "Bar");
     * themeGraphLayer.removeFeatures(features);
     * (end)
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 要删除feature的数组。
     */
    removeFeatures: function(features) {
        this.clearCache();
        SuperMap.Layer.Theme.prototype.removeFeatures.apply(this, arguments);
    },

    /**
     * APIMethod: removeAllFeatures
     * 清除当前图层所有的矢量要素。
     *
     * 调用此函数会清空图层中缓存的图表。
     *
     * (code)
     * var themeGraphLayer = new SuperMap.Layer.Graph("ThemeGraphLayer", "Bar");
     * themeGraphLayer.removeAllFeatures();
     * (end)
     *
     */
    removeAllFeatures: function() {
        this.clearCache();
        SuperMap.Layer.Theme.prototype.removeAllFeatures.apply(this, arguments);
    },

    /**
     * APIMethod: redraw
     * 重绘该图层，成功则返回true，否则返回false。
     *
     * (code)
     * var themeGraphLayer = new SuperMap.Layer.Graph("ThemeGraphLayer", "Bar");
     * themeGraphLayer.redraw();
     * (end)
     *
     * Returns:
     * {Boolean} 重绘该图层。
     */
    redraw: function() {
        this.clearCache();
        return SuperMap.Layer.Theme.prototype.redraw.apply(this, arguments);
    },

    /**
     * APIMethod: clear
     * 清除图层。清除的内容包括数据（features） 、专题要素、缓存。
     *
     * (code)
     * var themeGraphLayer = new SuperMap.Layer.Graph("ThemeGraphLayer", "Bar");
     * themeGraphLayer.clear();
     * (end)
     */
    clear: function(){
        if(this.renderer){
            this.renderer.clearAll();
            this.renderer.refresh();
        }
        this.removeAllFeatures();
        this.clearCache();
    },

    /**
     * Method: getFeatures
     * 查看当前图层中的有效数据。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 用户加入图层的有效数据。
     */
    // 公开父类方法

    /**
     * APIMethod: getFeatureBy
     * 在专题图的要素数组 features 里面遍历每一个 feature，当 feature[property] === value 时，
     * 返回此 feature（并且只返回第一个）。
     *
     * (code)
     * var themeGraphLayer = new SuperMap.Layer.Graph("ThemeGraphLayer", "Bar");
     * themeGraphLayer.getFeatureBy("pop", 100);
     * (end)
     *
     * Parameters:
     * property - {String} feature 的某个属性名称。
     * value - {String} property 所对应的值。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 第一个匹配属性和值的矢量要素。
     */
    // 公开父类方法

    /**
     * APIMethod: getFeatureById
     * 通过给定一个 id，返回对应的矢量要素。
     *
     * (code)
     * var themeGraphLayer = new SuperMap.Layer.Graph("ThemeGraphLayer", "Bar");
     * themeGraphLayer.getFeatureBy("featureId_1220");
     * (end)
     *
     * Parameters:
     * featureId - {String} 矢量要素的属性 id。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 对应id的 feature，如果不存在则返回 null。
     */
    // 公开父类方法

    /**
     * APIMethod: getFeaturesByAttribute
     * 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
     *
     * (code)
     * var themeGraphLayer = new SuperMap.Layer.Graph("ThemeGraphLayer", "Bar");
     * themeGraphLayer.getFeatureBy("Pop", 2500);
     * (end)
     *
     * Parameters:
     * attrName - {String} 属性的 key。
     * attrValue - {Mixed} 属性对应的 value 值。
     *
     * Returns:
     * Array(<SuperMap.Feature.Vector>) 一个匹配的 feature 数组。
     */
    // 公开父类方法

    /**
     * APIMethod: setOpacity
     * 设置图层的不透明度,取值[0-1]之间。
     *
     * (code)
     * var themeGraphLayer = new SuperMap.Layer.Graph("ThemeGraphLayer", "Bar");
     * themeGraphLayer.setOpacity(0.2);
     * (end)
     *
     * Parameter:
     * opacity - {Float} 图层的不透明度，取值范围：[0-1]。
     */
    //公开父类方法

    /**
     * APIMethod: on
     * 添加专题要素事件监听。
     *
     * 支持的事件包括: click、mousedown、mousemove、mouseout、mouseover、mouseup。
     *
     * (code)
     * var themeGraphLayer = new SuperMap.Layer.Graph("ThemeGraphLayer", "Bar");
     * themeGraphLayer.on("mouseover", evn);
     *
     * function evn(e){
     *    if(e.target && e.target.refDataID){
     *        if(e.target.dataInfo){
     *            alert(e.target.dataInfo);
     *        }
     *    }
     * }
     * (end)
     *
     * Parameters:
     * event - {String} 事件名称。
     * callback - {Function} 事件回调函数。
     *
     */
    //公开父类方法

    /**
     * APIMethod: un
     * 移除专题要素事件监听。
     *
     * (code)
     * var themeGraphLayer = new SuperMap.Layer.Graph("ThemeGraphLayer", "Bar");
     * themeGraphLayer.un("mouseover", evn);
     * (end)
     *
     * Parameters:
     * event - {String} 事件名称。
     * callback - {Function} 事件回调函数。
     *
     */
    //公开父类方法

    /**
     * Method: getWeightFieldValue
     * 获取权重字段的值。
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} 数据。
     * fields - {String} 字段名数组。
     * defaultValue - {Number} 当通过 weightField 获取不到权重值时，使用 defaultValue 作为权重值。
     *
     * Returns:
     * {Number} 权重值。
     */
    getWeightFieldValue: function(feature, weightField, defaultValue){
        if(typeof(defaultValue)  == "undefined" || isNaN(defaultValue)){
            defaultValue = 0;
        }
        if(!feature.attributes) return defaultValue;

        var fieldValue = feature.attributes[weightField];

        if(typeof(fieldValue)  == "undefined" || isNaN(fieldValue)){
            fieldValue = defaultValue
        }

        return fieldValue;
    },

    CLASS_NAME: "SuperMap.Layer.Graph"
});
