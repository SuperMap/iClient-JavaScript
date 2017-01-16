/**
 * Class: SuperMap.Geometry.PolygonRegion
 * 区域管理对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.FlagGroup = SuperMap.Class(SuperMap.Geometry.GroupObject,{

    /**
     * APIProperty: ratio
     * {Integer} 多旗间默认间距
     */
    ratio: null,

    /**
     * APIMethod: setRotate
     * 设置组合标号的旋转角度
     *
     * Parameters:
     * rotateValue - {float} 组合标号的旋转角度。
     */
    setRotate:function(rotateValue){
        if(!isNaN(rotateValue)) {
            this.dRotate += rotateValue;
            this.calculateParts();

            this.layer.events.triggerEvent("featuremodified",
                {feature: this.feature});
        }
    },

    /**
     * Constructor: SuperMap.Geometry.PolygonRegion
     * 创建一个标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.PolygonRegion>} 新的标绘对象。
     */
    initialize: function(options){
        this.features =[];
        SuperMap.Geometry.GeoGraphicObject.prototype.initialize.apply(this, arguments);

        this.minEditPts = 1;
        this.maxEditPts = 1;

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.FLAGGROUP;
        this.symbolType = SuperMap.Plot.SymbolType.FLAGGROUP;
        this.symbolName = "FlagGroup";

        if(this.subAssociatedUuids === null){
            this.subAssociatedUuids = [];
        }

        if(this.ratio === null){
            this.ratio = 0.8;
        }
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        this.features = null;
        SuperMap.Geometry.GeoGraphicObject.prototype.destroy.apply(this, arguments);
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

        if(!SuperMap.Util.isArray(this.ratio)){
            this.ratio = [this.ratio];
        }

        if(this.components.length === 0){
            var flagFeatures = [];
            for(var i = 0; i < this.subAssociatedUuids.length; i++){
                var feature = this.layer.getFeatureByUuid(this.subAssociatedUuids[i]);
                if((feature.geometry.libID === 100 && (feature.geometry.code >=2800 && feature.geometry.code<=2900))){
                    flagFeatures.push(feature);
                }
            }
            this.layer.removeFeatures(flagFeatures);

            for(var i = 0; i < flagFeatures.length; i++){
                flagFeatures[i].layer = this.layer;
                this.components.push(flagFeatures[i]);

                //this.components[i].geometry.clearBounds();
                //var bounds = this.components[i].geometry.getBounds();
                //var leftTop = new SuperMap.Geometry.Point(bounds.left, bounds.top);
                //this.components[i].geometry.leftTop = leftTop;
            }
        }

        if(this.components.length !== 0){
            this.scalePoints = [];

            this.components[0].geometry.dRotate = this.dRotate;
            this.components[0].geometry.calculateParts();
            var lastPosition = this.components[0].geometry.controlPoints[0];
            this.anchorPoint = new SuperMap.Geometry.Point(lastPosition.x, lastPosition.y);

            var scalePoint0 = new SuperMap.Geometry.Point(lastPosition.x, lastPosition.y);
            scalePoint0.tag = 0;
            this.scalePoints.push(scalePoint0);

            for(var j = 1; j < this.components.length; j++) {
                while(this.ratio.length < j){
                    this.ratio.push(this.ratio[this.ratio.length-1]);
                }
                var ratio = this.ratio[j-1];

                var leftTop = this.calculateFlagTop(this.components[j-1]);
                leftTop.rotate(this.dRotate, this.components[j-1].geometry.controlPoints[0]);

                var currentPosition = SuperMap.Plot.PlottingUtil.FindPointOnLineByRatio(ratio, lastPosition, leftTop);
                this.components[j].geometry.dRotate = this.dRotate;
                this.components[j].geometry.setPositionPoints([new SuperMap.Geometry.Point(currentPosition.x, currentPosition.y)]);

                var scalePoint = new SuperMap.Geometry.Point(currentPosition.x, currentPosition.y);
                scalePoint.tag = j;
                this.scalePoints.push(scalePoint);

                lastPosition = currentPosition;
            }
        }
    },

    /**
     * Method: calculateFlagTop
     * 计算旗杆顶点位置
     */
    calculateFlagTop: function(feature) {
        var rotate = feature.geometry.dRotate;
        feature.geometry.dRotate = 0;
        feature.geometry.calculateParts();
        var bounds = feature.geometry.getBounds();
        feature.geometry.dRotate = rotate;
        feature.geometry.calculateParts();
        return new SuperMap.Geometry.Point(bounds.left, bounds.top);
    },

    /**
     * Method: modifyPoint
     * 修改位置点
     *
     * Parameters:
     * index - {Integer} 位置点索引。
     * pt - {<SuperMap.Geometry.Point>} 位置点。
     */
    modifyPoint: function(index, pt) {
        if(index === 0){
            this.components[0].geometry.setPositionPoints([pt]);
        } else {
            var pos = this.components[index-1].geometry.controlPoints[0];

            var leftTop = this.calculateFlagTop(this.components[index-1]);
            leftTop.rotate(this.dRotate, this.components[index-1].geometry.controlPoints[0]);

            var distance = SuperMap.Plot.PlottingUtil.distance(pos, leftTop);
            var projectPt = SuperMap.Plot.PlottingUtil.projectPoint(pt, pos, leftTop);
            var dis = SuperMap.Plot.PlottingUtil.distance(pos, projectPt);

            this.ratio[index-1] = dis/distance;
        }

        this.calculateParts();
    },

    /**
     * APIMethod: clone
     * 克隆当前几何对象。
     *
     * Returns:
     * {<SuperMap.Geometry.RegionManager>} 克隆的几何对象集合。
     */
    clone: function () {
        SuperMap.Geometry.GroupObject.prototype.clone.apply(this, arguments);
        var options = {libID: this.libID, code: this.code, layer: this.layer};
        var geometry = eval("new " + this.CLASS_NAME + "(options)");

        //geometry.features = this.features;
        for(var j = 0; j < this.features.length; j++){
            var feature = this.features[j].clone();
            if(feature.geometry){
                feature.geometry.calculateParts();
            }
            feature.layer = this.layer;
            geometry.features.push(feature);

        }
        geometry.ratio = this.ratio;
        geometry.calculateParts();
        return geometry;
        //自己特有
    },

    /**
     * Method: reView
     * 根据点标号的原始信息重新计算 符号所在的位置
     *（用于地图缩放的时候重新计算  更换原来feature 中各个geometry的components  让原来的geometry不发生变化。）
     * @param feature
     */
    reView: function () {
        for(var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].geometry.scaleByMap = this.scaleByMap;
            this.components[i].geometry.reView();
        }

        this.calculateParts();
    },

    /**
     * Method: parseSymbolData
     * 解析标号数据。
     *
     */
    parseSymbolData: function() {
        SuperMap.Geometry.GroupObject.prototype.parseSymbolData.apply(this, arguments);

        if(this.symbolData !== null){
            this.ratio = this.symbolData.ratio;
        }
    },

    /**
     * Method: setSymbolData
     * 设置标号数据。
     *
     */
    setSymbolData: function() {
        SuperMap.Geometry.GroupObject.prototype.setSymbolData.apply(this, arguments);

        if(this.symbolData !== null){
            this.symbolData.ratio = this.ratio;
        }
    },

    CLASS_NAME:"SuperMap.Geometry.FlagGroup"
});