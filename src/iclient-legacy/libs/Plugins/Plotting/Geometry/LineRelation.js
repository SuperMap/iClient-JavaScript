/* COPYRIGHT 2016 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.Geometry.LineRelation
 * 连接线对象类。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.LineRelation = new SuperMap.Class(SuperMap.Geometry.GeoGraphicObject,{

    /**
    * APIProperty: startAssociatedUuid
    * {String} 连接线的开始对象的唯一ID
    */
    startAssociatedUuid: null,

    /**
    * APIProperty: startAssociatedUuid
    * {String} 连接线的结束对象的唯一ID
    */
    endAssociatedUuid: null,

    /**
     * APIProperty: lineRelationType
     * {<SuperMap.Plot.LineRelation>} 对象间连接线类型
     */
    lineRelationType: null,

    /**
     * APIProperty: subSectionCount
     * {Integer} 段数，默认是10
     */
    subSectionCount: null,

    /**
    * Constructor: SuperMap.Geometry.LineRelation
    * 创建一个标绘对象。
    *
    * Parameters:
    * options - {Object} 此类与父类提供的开放属性。
    *
    * Returns:
    * {<SuperMap.Geometry.LineRelation>} 新的标绘对象。
    */
    initialize: function(options){
        SuperMap.Geometry.GeoGraphicObject.prototype.initialize.apply(this, arguments);

        this.minEditPts = 2;
        this.maxEditPts = 2;

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.LINERELATION;
        this.symbolType = SuperMap.Plot.SymbolType.LINERELATION;
        this.symbolName = "LineRelation";

        if(this.subSectionCount === null){
            this.subSectionCount = 10;
        }

        this.setJoinLineToGeometry(this.startAssociatedUuid);
        this.setJoinLineToGeometry(this.endAssociatedUuid);
    },

    /**
    * APIMethod: setStartFeature
    * 设置起始位置对象，如果传入对象为空，则将对应标号也设置为空
    *
    * Parameters:
    * feature - {SuperMap.Feature.Vector} 起点标号。
    *
    * Returns:
    */
    setStartFeature: function(associatedUuid){
        if(null !== this.startAssociatedUuid){
            this.removeJoinLineToGeometry(this.startAssociatedUuid);
            this.startAssociatedUuid = null;
        }

        var feature = this.layer.getFeatureByUuid(associatedUuid);

        if(null === feature || null === feature.geometry){
            return;
        }

        if(!feature.geometry.isDot()){
            return;
        }

        if(null !== this.endAssociatedUuid){
            if(associatedUuid === this.endAssociatedUuid){
                return;
            }
        }

        this.startAssociatedUuid = associatedUuid;
        this.setJoinLineToGeometry(this.startAssociatedUuid);

        if(null === this.endAssociatedUuid){
            return;
        }

        this.setFeatures(this.startAssociatedUuid, this.endAssociatedUuid);
    },

    /**
    * APIMethod: setEndFeature
    * 设置结束位置对象，如果传入对象为空，则将对应标号也设置为空
    *
    * Parameters:
    * feature - {SuperMap.Feature.Vector} 尾点标号。
    *
    * Returns:
    */
    setEndFeature: function(associatedUuid){
        if(null !== this.endAssociatedUuid){
            this.removeJoinLineToGeometry(this.endAssociatedUuid);
            this.endAssociatedUuid = null;
        }

        var feature = this.layer.getFeatureByUuid(associatedUuid);

        if(null === feature || null === feature.geometry){
            return;
        }

        if(!feature.geometry.isDot()){
            return;
        }

        if(null !== this.startAssociatedUuid){
            if(associatedUuid === this.startAssociatedUuid){
                return;
            }
        }

        this.endAssociatedUuid = associatedUuid;
        this.setJoinLineToGeometry( this.endAssociatedUuid);

        if(null === this.startAssociatedUuid){
            return;
        }

        this.setFeatures(this.startAssociatedUuid, this.endAssociatedUuid);
    },

    /**
    * APIMethod: setFeatures
    * 设置起始对象，传入标号不能为空
    *
    * Parameters:
    * startAssociatedUuid - {String} 起点标号。
    * endAssociatedUuid - {String} 尾点标号。
    *
    * Returns:
    */
    setFeatures:function(startAssociatedUuid, endAssociatedUuid){
        var startFeature = this.layer.getFeatureByUuid(startAssociatedUuid);
        var endFeature = this.layer.getFeatureByUuid(endAssociatedUuid);

        if(null === startFeature || null === startFeature.geometry ||
            null === endFeature || null === endFeature.geometry){
            return;
        }

        if(!startFeature.geometry.isDot() || !endFeature.geometry.isDot()){
            return;
        }

        this.startAssociatedUuid = startAssociatedUuid;
        this.endAssociatedUuid = endAssociatedUuid;
        this.setJoinLineToGeometry( this.startAssociatedUuid);
        this.setJoinLineToGeometry( this.endAssociatedUuid);

        this.calculateParts();
    },

    /**
    * APIMethod: destroy
    * 销毁几何图形。
    */
    destroy: function () {
        this.startAssociatedUuid = null;
        this.endAssociatedUuid = null;

        SuperMap.Geometry.GeoGraphicObject.prototype.destroy.apply(this, arguments);
    },

    /**
    * Method: calculateParts
    * 重写了父类的方法
    */
    calculateParts: function () {
        this.init();
        //清空原有的所有点
        this.components = [];

        //拷贝起始点
        var startPt = null;
        if(null !== this.startAssociatedUuid){
            var startFeature = this.layer.getFeatureByUuid(this.startAssociatedUuid);
            var startFeaturePts = SuperMap.Plot.PlottingUtil.clonePoints(startFeature.geometry.getPositionPoints());
            if(null !== startFeaturePts && 0 < startFeaturePts.length){
                startPt = startFeaturePts[0];
            }
        }

        //拷贝尾点
        var endPt = null;
        if(null !== this.endAssociatedUuid){
            var endFeature = this.layer.getFeatureByUuid(this.endAssociatedUuid);
            var endFeaturePts = SuperMap.Plot.PlottingUtil.clonePoints(endFeature.geometry.getPositionPoints());
            if( null !== endFeaturePts && 0 < endFeaturePts.length){
                endPt = endFeaturePts[0];
            }
        }

        if(null === this.controlPoints){
            this.controlPoints = [];
        }

        //设置起点
        if(null !== startPt){
            if(0 === this.controlPoints.length){
                this.controlPoints.push(startPt);
            } else{
                this.controlPoints[0] = startPt;
            }
        }

        //设置尾点
        if(null !== endPt){
            if(0 === this.controlPoints.length){
                return;
            } else if(1 === this.controlPoints.length){
                this.controlPoints.push(endPt);
            } else{
                this.controlPoints[this.controlPoints.length-1] = endPt;
            }
        }

        for(var i = 0; i < this.controlPoints.length; i++){
            this.controlPoints[i].tag = i;
        }

        var tempPoints = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        if(null !== tempPoints && tempPoints.length >= this.minEditPts){
            this.style = {};
            this.style = SuperMap.Util.copyAttributes(this.style,SuperMap.Geometry.PlottingGeometry.defaultStyle);

            this.computeLine(tempPoints);
        }
    },

    /**
     * Method: computeLine
     * 设置标号数据。
     *
     */
    computeLine: function(controlPoints) {
        this.components = [];

        var startPt = controlPoints[0];
        var endPt = controlPoints[controlPoints.length-1];

        if(this.subSectionCount <= 1){
            this.subSectionCount = 10;
        }

        var allDis = SuperMap.Plot.PlottingUtil.distance(startPt,endPt);
        var stepDis = allDis/(this.subSectionCount*2-1);

        if(this.lineRelationType === SuperMap.Plot.LineRelation.SOLID){
            var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(24, controlPoints);
            geometry.style = {surroundLineFlag: false};
            this.components.push(geometry);
        } else if(this.lineRelationType === SuperMap.Plot.LineRelation.DASH) {
            for(var i = 0; i < this.subSectionCount; i++){
                var pt1 = SuperMap.Plot.PlottingUtil.findPoint(startPt,endPt,2*i*stepDis,0);
                var pt2 = SuperMap.Plot.PlottingUtil.findPoint(startPt,endPt,(2*i+1)*stepDis,0);

                var linepts = [];
                linepts.push(pt1);
                linepts.push(pt2);

                var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(24, linepts);
                geometry.style = {surroundLineFlag: false};
                this.components.push(geometry);
            }
        } else {
            for(var i = 0; i < this.subSectionCount; i++){
                var pt1 = SuperMap.Plot.PlottingUtil.findPoint(startPt,endPt,2*i*stepDis,0);
                var pt2 = SuperMap.Plot.PlottingUtil.findPoint(startPt,endPt,(2*i+1)*stepDis,0);
                var pt3 = SuperMap.Plot.PlottingUtil.findPoint(pt2,pt1,stepDis,60);
                var pt4 = SuperMap.Plot.PlottingUtil.findPoint(pt2,pt1,stepDis,-60);


                var linepts = [];
                linepts.push(pt3);
                linepts.push(pt2);
                linepts.push(pt4);

                var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(24, linepts);
                geometry.style = {surroundLineFlag: false};
                this.components.push(geometry);
            }
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
        this.calculateParts();
    },

    /**
    * Method: modifyPoint
    * 修改位置点
    *
    * Parameters:
    * index - {Integer} 位置点索引。
    * pt - {<SuperMap.Geometry.Point>} 位置点。
    */
    modifyPoint: function(index,pt) {
        if(0 === index){//修改起始位置标号

            //根据位置点查找该位置的标号
            var startFeature = this.getFeatureByPoint(pt);

            if(startFeature !== null){
                //设置起始标号
                this.setStartFeature(startFeature.geometry.uuid);
            } else {
                this.setStartFeature(null);
            }
        }
        else if(this.controlPoints.length - 1 === index){//修改尾点标号
            //根据位置点查找该位置的标号
            var endFeature = this.getFeatureByPoint(pt);

            if(endFeature !== null){
                //设置尾点标号
                this.setEndFeature(endFeature.geometry.uuid);
            } else {
                this.setEndFeature(null);
            }
        }

        this.calculateParts();
    },

    /**
    * Method: selectFeatureByPoint
    * 判断输入点有没有选中标号。
    *
    * Parameters:
    * pt - {SuperMap.Geometry.Point} 位置点,单位经纬度
    *
    * Returns:
    * {<SuperMap.Feature.Vector>} 选中的对象。
    */
    getFeatureByPoint: function(pt){

        var feature = null;
        var tempPt0 = this.feature.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(0,0));
        var tempPt1 = this.feature.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(5,0));
        var tolerance = SuperMap.Plot.PlottingUtil.distance({x:tempPt0.lon,y:tempPt0.lat},{x:tempPt1.lon,y:tempPt1.lat});

        var features = this.layer.features;
        for(var i = 0; i < features.length; i++) {
            feature = this.layer.selectFeature(features[i], new SuperMap.LonLat(pt.x,pt.y), tolerance);
            if (feature !== null) {
                if(!(feature.geometry instanceof SuperMap.Geometry.DotSymbol)){
                    continue;
                }

                break;
            }
        }

        return feature;
    },

    /**
     * Method: setJoinLineToGeometry
     * 将连接线添加到点标号中。
     *
     * Parameters:
     * associatedUuid - {String} 关联的点标号对象的唯一ID，即为用户创建该关联对象时设置的uuid
     */
    setJoinLineToGeometry: function(associatedUuid){
        var feature = this.layer.getFeatureByUuid(associatedUuid);

        if(null === feature){
            return;
        }

        if(null === feature.geometry){
            return;
        }

        if(!feature.geometry instanceof SuperMap.Geometry.DotSymbol){
            return;
        }

        var bAdd = false;
        for(var i = 0; i < feature.geometry.joinLines.length; i++){
            if(this === feature.geometry.joinLines[i]){
                bAdd = true;
                break;
            }
        }

        if(!bAdd){
            feature.geometry.joinLines.push(this);
        }
    },

    /**
     * Method: removeJoinLineToGeometry
     * 将连接线在点标号中移除。
     *
     * Parameters:
     * feature - {SuperMap.Feature.Vector} 点标号对象
     */
    removeJoinLineToGeometry: function(associatedUuid){
        var feature = this.layer.getFeatureByUuid(associatedUuid);

        if(null === feature){
            return;
        }

        if(null === feature.geometry){
            return;
        }

        if(!feature.geometry instanceof SuperMap.Geometry.DotSymbol){
            return;
        }

        for(var i = 0; i < feature.geometry.joinLines.length; i++){
            if(this === feature.geometry.joinLines[i]){
                feature.geometry.joinLines.splice(i,1);
                break;
            }
        }
    },

    /**
    * APIMethod: clone
    * 克隆当前几何对象。
    *
    * Returns:
    * {<SuperMap.Geometry.LineRelation>} 克隆的几何对象集合。
    */
    clone: function () {
        var geometry = SuperMap.Geometry.GeoGraphicObject.prototype.clone.apply(this, arguments);

        geometry.startAssociatedUuid = this.startAssociatedUuid;
        geometry.endAssociatedUuid = this.endAssociatedUuid;
        geometry.lineRelationType = this.lineRelationType;
        geometry.subSectionCount = this.subSectionCount;

        return geometry;
    },

    /**
    * Method: parseSymbolData
    * 解析标号数据。
    *
    */
    parseSymbolData: function() {
        SuperMap.Geometry.GeoGraphicObject.prototype.parseSymbolData.apply(this, arguments);

        //自己特有
        if(!!this.symbolData){
            this.endAssociatedUuid = this.symbolData.endAssociatedUuid;
            this.lineRelationType = this.symbolData.lineRelationType;
            this.startAssociatedUuid = this.symbolData.startAssociatedUuid;
            this.subSectionCount = this.symbolData.subSectionCount;
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
            this.symbolData.endAssociatedUuid = this.endAssociatedUuid;
            this.symbolData.lineRelationType = this.lineRelationType;
            this.symbolData.startAssociatedUuid = this.startAssociatedUuid;
            this.symbolData.subSectionCount = this.subSectionCount;
        }
    },

    CLASS_NAME: "SuperMap.Geometry.LineRelation"
});