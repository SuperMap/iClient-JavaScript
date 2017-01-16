/**
 * Class: SuperMap.Geometry.GroupObject
 * 组合对象对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.PlottingGeometry>
 */
SuperMap.Geometry.GroupObject = new SuperMap.Class(SuperMap.Geometry.PlottingGeometry,{

    /**
     * APIMethod: subAssociatedUuids
     * {Array(String)} 组合对象子对象的唯一ID
     */
    subAssociatedUuids: null,

    /**
     * APIMethod: getRotate
     * 获取组合标号的旋转角度
     *
     * Returns:
     * {float} 返回组合标号的旋转角度。
     */
    getRotate:function(){
        return this.dRotate;
    },

    /**
     * APIMethod: applyStyle
     * 拷贝样式到每个子标号
     */
    applyStyle: function(){
        for(var i = 0; i < this.components.length; i++){
            var feature = this.components[i];
            if(null === feature || null === feature.style){
                continue;
            }

            if(this.feature === null || this.feature.style === undefined){
                return;
            }

            feature.style = SuperMap.Util.copyAttributes(feature.style, this.feature.style);
        }
    },

    /**
     * APIMethod: setStrokeColor
     * 设置组合标号的线色
     *
     * Parameters:
     * strokeColor - {String} 组合标号的线色。
     */
    setStrokeColor:function(strokeColor){
        for(var i = 0; i < this.components.length; i++){
            var feature = this.components[i];
            if(null === feature || null === feature.style){
                continue;
            }

            feature.style.strokeColor = strokeColor;
        }
    },

    /**
     * APIMethod: getStrokeColor
     * 获取组合标号的线色
     *
     * Returns:
     * {String} 返回组合标号的线色。
     */
    getStrokeColor:function(){
        var strokeColor = "#ff0000";

        var tempStrokeColor = null;
        var isLikeColor = true;
        for(var i = 0; i < this.components.length; i++){
            var feature = this.components[i];
            if(null === feature || null === feature.style){
                continue;
            }

            if(null === tempStrokeColor){
                tempStrokeColor = feature.style.strokeColor;
            }
            else{
                if(tempStrokeColor !== feature.style.strokeColor){
                    isLikeColor = false;
                    break;
                }
            }
        }

        if(isLikeColor === true){
            strokeColor = tempStrokeColor;
        }

        return strokeColor;
    },

    /**
     * APIMethod: setStrokeWidth
     * 设置组合标号的线宽
     *
     * Parameters:
     * strokeWidth - {Float} 组合标号的线宽。
     */
    setStrokeWidth:function(strokeWidth){
        for(var i = 0; i < this.components.length; i++){
            var feature = this.components[i];
            if(null === feature || null === feature.style){
                continue;
            }

            feature.style.strokeWidth = strokeWidth;
        }
    },

    /**
     * APIMethod: getStrokeWidth
     * 获取组合标号的线宽
     *
     * Returns:
     * {Float} 返回组合标号的线宽。
     */
    getStrokeWidth:function(){
        var strokeWidth = 2;

        var tempStrokeWidth = 0;
        var isLikeWidth = true;
        for(var i = 0; i < this.components.length; i++){
            var feature = this.components[i];
            if(null === feature || null === feature.style){
                continue;
            }

            if(0 === tempStrokeWidth){
                tempStrokeWidth = feature.style.strokeWidth;
            }
            else{
                if(tempStrokeWidth !== feature.style.strokeWidth){
                    isLikeWidth = false;
                    break;
                }
            }
        }

        if(isLikeWidth === true){
            strokeWidth = tempStrokeWidth;
        }

        return strokeWidth;
    },

    /**
     * APIMethod: setRotate
     * 设置组合标号的旋转角度
     *
     * Parameters:
     * rotateValue - {float} 组合标号的旋转角度。
     */
    setRotate:function(rotateValue){
        if(!isNaN(rotateValue)) {
            this.rotate(rotateValue, this.anchorPoint);
            this.dRotate = rotateValue;

            this.layer.events.triggerEvent("featuremodified",
                {feature: this.feature});
        }
    },

    /**
     * APIMethod: getScale
     * 获取组合标号的比例值
     *
     * Returns:
     * {float} 返回组合标号的比例值。
     */
    getScale:function(){
        return this.dScale;
    },

    /**
     * APIMethod: setRotate
     * 设置组合标号的比例值
     *
     * Parameters:
     * scaleValue - {float} 组合标号的比例值。
     */
    setScale:function(scaleValue) {
        if(!isNaN(scaleValue)) {
            this.scale(scaleValue/this.dScale);
            this.dScale = scaleValue;

            this.layer.events.triggerEvent("featuremodified",
                {feature: this.feature});
        }
    },

    /**
     * Constructor: SuperMap.Geometry.GroupObject
     * 创建一个组合标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Geometry.GroupObject>} 新的组合标绘对象。
     */
    initialize:function(options){
        SuperMap.Geometry.PlottingGeometry.prototype.initialize.apply(this, arguments);

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.GROUPOBJECT;
        this.symbolType = SuperMap.Plot.SymbolType.GROUPOBJECT;
        this.symbolName = "ZHDX";

        if(this.subAssociatedUuids === null){
            this.subAssociatedUuids = [];
        }
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        SuperMap.Geometry.PlottingGeometry.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        if(!SuperMap.Util.isArray(this.subAssociatedUuids)){
            this.subAssociatedUuids = [this.subAssociatedUuids];
        }

        if(0 === this.subAssociatedUuids.length){
            return;
        }

        if(this.components.length === 0){
            var features = [];
            for(var i = 0; i < this.subAssociatedUuids.length; i++){
                features.push(this.layer.getFeatureByUuid(this.subAssociatedUuids[i]));
            }
            this.layer.removeFeatures(features);
            for(var j = 0; j < features.length; j++){
                features[j].layer = this.layer;
                this.components.push(features[j]);

                if (features[j].geometry.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL) {
                    features[j].geometry.scaleByMap = true;
                }
            }
        }

        if(this.isChildFeatureSelected === true){
            var bounds = this.getBounds();
            var boundRect = [];
            boundRect.push(new SuperMap.Geometry.Point(bounds.left, bounds.top));
            boundRect.push(new SuperMap.Geometry.Point(bounds.left, bounds.bottom));
            boundRect.push(new SuperMap.Geometry.Point(bounds.right, bounds.bottom));
            boundRect.push(new SuperMap.Geometry.Point(bounds.right, bounds.top));

            var borderFeature = SuperMap.Geometry.PlottingGeometry.createFeature(0, 24, boundRect, {layer:this.layer});
            borderFeature.isSelectedBorder = true;
            borderFeature.style.strokeDashstyle = "dot";
            this.components.push(borderFeature);
        } else {
            for(var i = 0; i < this.components.length; ){
                if(this.components[i].isSelectedBorder === true){
                    this.components.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
    },

    /**
     * APIMethod: unGroupObject
     * 解组合对象。
     */
    unGroupObject: function() {
        this.layer.addFeatures(this.components);
    },

    /**
     * Method: reView
     * 根据点标号的原始信息重新计算 符号所在的位置
     *（用于地图缩放的时候重新计算  更换原来feature 中各个geometry的components  让原来的geometry不发生变化。）
     * @param feature
     */
    reView: function () {
        for(var i = 0, len = this.components.length; i < len; i++) {
            if(this.components[i].geometry instanceof SuperMap.Geometry.DotSymbol){
                this.components[i].geometry.reView();
            }
        }
    },

    /**
     * APIMethod: clone
     * 克隆当前几何对象。
     *
     * Returns:
     * {<SuperMap.Geometry.GroupObject>} 克隆的几何对象集合。
     */
    clone: function () {
        var options = {libID: this.libID, code: this.code, layer: this.layer};
        var geometry = eval("new " + this.CLASS_NAME + "(options)");

        geometry.subAssociatedUuids = this.subAssociatedUuids;
        //geometry.calculateParts();
       var features = this.components;
        for(var j = 0; j < features.length; j++){
            var feature = features[j].clone();
            if(feature.geometry){
                feature.geometry.calculateParts();
            }
            feature.layer = this.layer;
            geometry.components.push(feature);

            if (feature.geometry&&feature.geometry.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL) {
                feature.geometry.scaleByMap = true;
            }
        }
        var bounds = geometry.calculateBounds();
        return geometry;
    },

    /**
     * Method: parseSymbolData
     * 解析标号数据。
     *
     */
    parseSymbolData: function() {
        SuperMap.Geometry.PlottingGeometry.prototype.parseSymbolData.apply(this, arguments);

        if(!!this.symbolData && this.symbolData.subFeatures){
            this.subAssociatedUuids = this.symbolData.subAssociatedUuids;
            for(var i = 0; i < this.symbolData.subFeatures.length; i++){
                var subSymbolData = this.symbolData.subFeatures[i];
                var feature = SuperMap.Geometry.PlottingGeometry.createFeature(subSymbolData.libID, subSymbolData.code, null, {symbolData:subSymbolData, layer:this.layer});
                this.layer.addFeatures(feature);
            }
        }
    },

    /**
     * Method: setSymbolData
     * 设置标号数据。
     *
     */
    setSymbolData: function() {
        SuperMap.Geometry.GeoGraphicObject.prototype.setSymbolData.apply(this, arguments);

        //设置对象自己特有的属性到symbolData
        if(!!this.symbolData){
            this.symbolData.subAssociatedUuids = this.subAssociatedUuids;
            this.symbolData.subFeatures = [];
            for(var i = 0; i < this.components.length; i++){
                this.symbolData.subFeatures.push(this.components[i].geometry.getSymbolData());
            }
        }
    },

    /**
     * APIMethod: calculateBounds
     * 通过遍历数组重新计算边界，在遍历每一子项中时调用 extend 方法。
     */
    calculateBounds: function() {
        this.bounds = null;
        var bounds = new SuperMap.Bounds();
        var components = this.components;
        if (components) {
            for (var i=0, len=components.length; i<len; i++) {
                bounds.extend(components[i].geometry.getBounds());
            }
        }
        // to preserve old behavior, we only set bounds if non-null
        // in the future, we could add bounds.isEmpty()
        if (bounds.left != null && bounds.bottom != null &&
            bounds.right != null && bounds.top != null) {
            this.setBounds(bounds);
        }
    },

    /**
     * Method: move
     * 沿着x、y轴的正方向上按照给定的位移移动几何图形，move 不仅改变了几何图形的位置并且清理了边界缓存。
     *
     * Parameters:
     * x - {Float} x轴正方向上移动的距离。
     * y - {Float} y轴正方向上移动的距离。
     */
    move: function(x, y) {
        for(var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].geometry.move(x, y);
        }

        //geo.anchorPoint.move(x, y);
    },

    /**
     * Method: rotate
     * 围绕中心点旋转组合对象。
     *
     * Parameters:
     * rotateValue - {Float} 旋转角的度数。
     */
    rotate: function(rotateValue, anchorPoint) {
        for(var i = 0, len = this.components.length; i < len; i++) {
            if(this.components[i].geometry.symbolType === SuperMap.Plot.SymbolType.TEXTSYMBOL){
                var tempPt = new SuperMap.Geometry.Point(this.components[i].geometry.components[0].x, this.components[i].geometry.components[0].y);
                tempPt.rotate(rotateValue, anchorPoint);
                this.components[i].geometry.components[0].x = tempPt.x;
                this.components[i].geometry.components[0].y = tempPt.y;
            }
            this.components[i].geometry.rotate(rotateValue, anchorPoint);
        }
    },

    /**
     * Method: scale
     * 相对于中心点缩放组合对象。
     *
     * Parameters:
     * scaleValue - {Float} 缩放比例。
     */
    scale: function(scaleValue) {
        for(var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].geometry.resize(scaleValue, this.anchorPoint);
        }
    },

    CLASS_NAME:"SuperMap.Geometry.GroupObject"
});