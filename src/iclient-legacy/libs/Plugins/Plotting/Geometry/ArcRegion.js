/**
 * Class: SuperMap.Geometry.ArcRegion
 * 目标管理对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.ArcRegion = new SuperMap.Class(SuperMap.Geometry.GeoGraphicObject,{

    /**
     * Property: centerPoint
     * {<SuperMap.Geometry.Point>} 扇形区域中心点
     */
    centerPoint: null,

    /**
     * APIProperty: radius
     * {Float} 扇形区域半径
     */
    radius: null,

    /**
     * APIProperty: startAngle
     * {Float} 扇形区域起始角度
     */
    startAngle: 0.0,

    /**
     * APIProperty: endAngle
     * {Float} 扇形区域结束角度
     */
    endAngle: 0.0,

    /**
     * APIProperty: textPos
     * {Integer} 文字说明位置, 位置角度, 若位置角度不在起始角度和结束角度中间则代表文字说明位置为中心点
     */
    textPosition: null,

    /**
     * APIProperty: radiusText
     * {Array(String)} 半径文字
     */
    radiusText: null,

    /**
     * APIProperty: radiusPosAngle
     * {Integer} 半径线文字角度
     */
    radiusPosAngle: null,

    /**
     * APIProperty: radiusLineType
     * {<SuperMap.Plot.RadiusLineType>} 半径线类型
     */
    radiusLineType: null,

    /**
     * Constructor: SuperMap.Geometry.ArcRegion
     * 创建一个组合标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Geometry.ArcRegion>} 新的组合标绘对象。
     */
    initialize:function(subObjects){
        SuperMap.Geometry.GeoGraphicObject.prototype.initialize.apply(this, arguments);

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.ARCREGION;
        this.symbolType = SuperMap.Plot.SymbolType.ARCREGION;
        this.symbolName = "ArcRegion";

        this.minEditPts = 2;
        this.maxEditPts = 3;
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        //自己特有

        this.centerPoint = null;
        this.radius = null;
        this.startAngle = null;
        this.endAngle = null;
        this.textPosition = null;

        this.radiusText = null;
        this.radiusPosAngle = null;
        this.radiusLineType = null;

        SuperMap.Geometry.GeoGraphicObject.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints === null || this.controlPoints.length === 0){
            if( this.centerPoint && this.centerPoint !== null && this.radius && this.radius !== null){
                var dRadius = SuperMap.Plot.PlottingUtil.lengthToDegree(this.layer.map, this.radius, this.centerPoint);
                if(!this.startAngle || this.startAngle === null){
                    this.startAngle = 0;
                }
                if(!this.endAngle || this.endAngle === null){
                    this.endAngle = 360;
                }

                if (this.startAngle % 360 === this.endAngle % 360) {
                    var controlPoints = [this.centerPoint.clone()];
                    controlPoints.push(new SuperMap.Geometry.Point(this.centerPoint.x + dRadius, this.centerPoint.y));
                    this.controlPoints = SuperMap.Plot.PlottingUtil.clonePoints(controlPoints);
                    var circleGeometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.CIRCLESYMBOL, controlPoints);
                    circleGeometry.style = {surroundLineFlag: false};
                    this.components.push(circleGeometry);
                } else {
                    this.createPie();

                    var startPt = SuperMap.Plot.PlottingUtil.circlePoint(this.centerPoint,dRadius,dRadius,this.startAngle);
                    var endPt = SuperMap.Plot.PlottingUtil.circlePoint(this.centerPoint,dRadius,dRadius,this.endAngle);
                    this.controlPoints = [];
                    this.controlPoints.push(this.centerPoint.clone());
                    this.controlPoints.push(startPt);
                    this.controlPoints.push(endPt);
                }

                this.textGeometry();

                this.radiusGeometry();
            }
        } else if(this.controlPoints.length >= this.minEditPts){
            var controlPoints = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            if(this.controlPoints.length === 2){
                this.centerPoint = this.controlPoints[0].clone();
                var circleGeometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.CIRCLESYMBOL, controlPoints);
                circleGeometry.style = {surroundLineFlag: false};
                this.components.push(circleGeometry);

                this.centerPoint = this.controlPoints[0].clone();
                this.startAngle = 0;
                this.endAngle = 360;
                var dRadius = SuperMap.Plot.PlottingUtil.distance(this.controlPoints[0], this.controlPoints[1]);
                this.radius = SuperMap.Plot.PlottingUtil.degreeToLength(this.layer.map, dRadius, this.centerPoint);

            } else {
                var centerPt = this.controlPoints[0];
                var startPt = this.controlPoints[1];
                var endPt = this.controlPoints[2];

                this.centerPoint = this.controlPoints[0].clone();

                this.startAngle = SuperMap.Plot.PlottingUtil.radian(centerPt, startPt)*180/Math.PI;
                this.startAngle %= 360;
                if(this.startAngle < 0){
                    this.startAngle += 360;
                }

                this.endAngle = SuperMap.Plot.PlottingUtil.radian(centerPt, endPt)*180/Math.PI;
                this.endAngle %= 360;
                if(this.endAngle < 0){
                    this.endAngle += 360;
                }

                this.createPie();
            }

            this.textGeometry();

            this.radiusGeometry();
        }  else if(this.controlPoints.length >= 2 && this.controlPoints.length < this.minEditPts){
            this.calAssistantLine();
        }

        this.resolution = this.layer.renderer.getResolution();
    },

    //创建扇形图元
    createPie: function(){
        if(null === this.centerPoint || null === this.startAngle || null === this.endAngle || null === this.radius){
            return;
        }

        var dRadius = SuperMap.Plot.PlottingUtil.lengthToDegree(this.layer.map, this.radius, this.centerPoint);

        this.startAngle = this.startAngle % 360;
        this.endAngle = this.endAngle % 360;

        if(this.startAngle < 0){
            this.startAngle += 360;
        }

        if(this.endAngle < 0){
            this.endAngle += 360;
        }

        if(this.endAngle < this.startAngle){
            this.endAngle += 360;
        }

        var arcPts = [];
        for(var i = this.startAngle; i < this.endAngle; i += 5){
            var pt = SuperMap.Plot.PlottingUtil.circlePoint(this.centerPoint,dRadius,dRadius,i);
            arcPts.push(pt);
        }

        var endPt = SuperMap.Plot.PlottingUtil.circlePoint(this.centerPoint,dRadius,dRadius,this.endAngle);
        arcPts.push(endPt);
        arcPts.push(this.centerPoint);

        this.components = [];
        var pieGeometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, arcPts);
        pieGeometry.style = {surroundLineFlag: false};
        this.components.push(pieGeometry);

        if(this.controlPoints.length === 3){
            this.controlPoints[1] = SuperMap.Plot.PlottingUtil.circlePoint(this.centerPoint,dRadius,dRadius,this.startAngle);
            this.controlPoints[2] = SuperMap.Plot.PlottingUtil.circlePoint(this.centerPoint,dRadius,dRadius,this.endAngle);
        }
    },

    /**
     * Method: radiusGeometry
     * 创建半径对象。
     */
    textGeometry: function(){
        if(this.textContent.length !== 0){
            var pathTextStartAngle = 0;
            var pathTextEndAngle = 0;
            var pathTextAngle = 90;
            var isCenterText = false;

            this.textPosition %= 360;

            if(this.endAngle > this.startAngle){
                if(this.textPosition < this.endAngle && this.textPosition > this.startAngle){

                    if((this.endAngle - this.textPosition) < pathTextAngle){
                        pathTextAngle = this.endAngle - this.textPosition;
                    }
                    if((this.textPosition - this.startAngle) < pathTextAngle){
                        pathTextAngle = this.textPosition - this.startAngle;
                    }
                }
                else if(this.textPosition+360 < this.endAngle && this.textPosition+360 > this.startAngle){
                    this.textPosition += 360;
                    if((this.endAngle - this.textPosition) < pathTextAngle){
                        pathTextAngle = this.endAngle - this.textPosition;
                    }
                    if((this.textPosition - this.startAngle) < pathTextAngle){
                        pathTextAngle = this.textPosition - this.startAngle;
                    }
                }
                else {
                    isCenterText = true;
                }
            }
            if(this.startAngle > this.endAngle){
                if(this.textPosition > this.startAngle || this.textPosition < this.endAngle){
                    isCenterText = true;
                } else {
                    if((this.startAngle - this.textPosition) < pathTextAngle){
                        pathTextAngle = this.startAngle - this.textPosition;
                    }
                    if((this.textPosition - this.endAngle) < pathTextAngle){
                        pathTextAngle = this.textPosition - this.endAngle;
                    }
                }
            }

            var dRadius = SuperMap.Plot.PlottingUtil.lengthToDegree(this.layer.map, this.radius, this.centerPoint);

            if(pathTextAngle*2 < 4){
                isCenterText = true;
            }

            if(isCenterText === true){
                var bounds = this.getBounds();
                var centerLonLat = bounds.getCenterLonLat();
                var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(34, [new SuperMap.Geometry.Point(centerLonLat.lon, centerLonLat.lat)], this.textContent);
                geometry.style = {surroundLineFlag: false, labelAlign: "cm"};
                this.components.push(geometry);
            } else {
                this.textPosition %= 360;
                pathTextStartAngle = this.textPosition - pathTextAngle;
                pathTextEndAngle = this.textPosition + pathTextAngle;

                //var controlPoints = SuperMap.Geometry.Primitives.getArcPoint(this.centerPoint, dRadius, pathTextStartAngle, pathTextEndAngle);
                //var arcGeometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.ARCSYMBOL, controlPoints);
                //var spatialData = SuperMap.Geometry.Primitives.getSpatialData(arcGeometry);
                var arcPts = [];
                for(var i = pathTextStartAngle; i < pathTextEndAngle; i += 2){
                    var pt = SuperMap.Plot.PlottingUtil.circlePoint(this.centerPoint, dRadius, dRadius, i);
                    arcPts.push(pt);
                }
                var endPt = SuperMap.Plot.PlottingUtil.circlePoint(this.centerPoint, dRadius, dRadius, i);
                arcPts.push(endPt);

                var relLineText = SuperMap.Plot.RelLineText.ONLEFTLINE;

                var geometry = SuperMap.Geometry.PlottingGeometry.createGeometry(0, SuperMap.Plot.SymbolType.PATHTEXT, arcPts, {
                    textContent: this.textContent, showPathLine: false, isCurve: false, relLineText: relLineText, layer: this.layer, feature: this.feature});
                geometry.style = {surroundLineFlag: false};
                this.components.push(geometry);
            }

            //创建比例点
            var scalePoint = SuperMap.Plot.PlottingUtil.circlePoint(this.centerPoint,dRadius,dRadius,this.textPosition);
            scalePoint.isScalePoint = true;
            scalePoint.tag = 1;

            if(this.scalePoints > 0){
                this.scalePoints[0] = scalePoint;
            }
            else{
                this.scalePoints.push(scalePoint);
            }
        }
    },

    /**
     * Method: radiusGeometry
     * 创建半径对象。
     */
    radiusGeometry: function(){
        if(!this.radiusText || this.radiusText === null || !this.radiusPosAngle || this.radiusPosAngle === null || !this.radiusLineType || this.radiusLineType === null){
            return;
        }

        var dRadius = SuperMap.Plot.PlottingUtil.lengthToDegree(this.layer.map, this.radius, this.centerPoint);
        var circlePt = new SuperMap.Geometry.Point(this.centerPoint.x + dRadius, this.centerPoint.y);
        var endPt = SuperMap.Plot.PlottingUtil.findPoint(this.centerPoint, circlePt, dRadius, this.radiusPosAngle);

        var locationPoints = [];
        locationPoints.push(this.centerPoint);
        locationPoints.push(endPt);

        if(SuperMap.Plot.RadiusLineType.NONE !== this.radiusLineType){
            var radiusGeometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.POLYLINESYMBOL, locationPoints);
            radiusGeometry.style = {surroundLineFlag: false};
            this.components.push(radiusGeometry);
        }

        if(this.radiusLineType === SuperMap.Plot.RadiusLineType.ARROW){
            //创建箭头
            var arrowHeadPt2 = SuperMap.Plot.PlottingUtil.findPoint(endPt, this.centerPoint, dRadius*0.15, 12.5);
            var arrowHeadPt3 = SuperMap.Plot.PlottingUtil.findPoint(endPt, this.centerPoint, dRadius*0.15, -12.5);

            var arrowHeadPts = [];
            arrowHeadPts.push(endPt.clone());
            arrowHeadPts.push(arrowHeadPt2);
            arrowHeadPts.push(arrowHeadPt3);

            var arrowHead = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,arrowHeadPts);
            arrowHead.style = {};
            arrowHead.style = {surroundLineFlag: false, fill: true, fillLimit: true, lineTypeLimit:true};
            this.components.push(arrowHead);
        }

        if(!SuperMap.Util.isArray(this.radiusText)){
            this.radiusText = [this.radiusText];
        }

        if(this.radiusText.length >= 1){
            //创建线上文本
            var textPt1 = SuperMap.Plot.PlottingUtil.findPoint(this.centerPoint, endPt, dRadius*0.2, 0);
            var textPt2 = SuperMap.Plot.PlottingUtil.findPoint(this.centerPoint, endPt, dRadius*0.8, 0);

            var upTextPt1 = SuperMap.Plot.PlottingUtil.findPoint(textPt1, endPt, dRadius*0.02, 90);
            var upTextPt2 = SuperMap.Plot.PlottingUtil.findPoint(textPt2, endPt, dRadius*0.02, 90);

            var upTextPts = [];
            upTextPts.push(upTextPt1);
            upTextPts.push(upTextPt2);

            var relLineText = SuperMap.Plot.RelLineText.ONLEFTLINE;
            var radiusText1 = SuperMap.Geometry.PlottingGeometry.createGeometry(0, SuperMap.Plot.SymbolType.PATHTEXT, upTextPts, {
                textContent: this.radiusText[0], showPathLine: false, relLineText: relLineText, layer: this.layer, feature: this.feature});
            radiusText1.style = {surroundLineFlag: false};
            this.components.push(radiusText1);
        }

        if(this.radiusText.length === 2){
            //创建线下文本
            var downTextPt1 = SuperMap.Plot.PlottingUtil.findPoint(textPt1, endPt, dRadius*0.02, 270);
            var downTextPt2 = SuperMap.Plot.PlottingUtil.findPoint(textPt2, endPt, dRadius*0.02, 270);
            var downTextPts = [];
            downTextPts.push(downTextPt1);
            downTextPts.push(downTextPt2);

            var relLineText = SuperMap.Plot.RelLineText.ONRIGHTLINE;
            var radiusText2 = SuperMap.Geometry.PlottingGeometry.createGeometry(0, SuperMap.Plot.SymbolType.PATHTEXT, downTextPts, {
                textContent: this.radiusText[1], showPathLine: false, relLineText: relLineText, layer: this.layer, feature: this.feature});
            radiusText2.style = {surroundLineFlag: false};
            this.components.push(radiusText2);
        }

        var scalePoint = endPt.clone();
        scalePoint.isScalePoint = true;
        scalePoint.tag = 0;

        if(this.scalePoints > 1){
            this.scalePoints[1] = scalePoint;
        }
        else{
            this.scalePoints.push(scalePoint);
        }

    },

    /**
    * APIMethod: clone
    * 克隆当前几何对象。
    *
    * Returns:
    * {<SuperMap.Geometry.ArcRegion>} 克隆的几何对象集合。
    */
    clone: function () {
        var geo = SuperMap.Geometry.GeoGraphicObject.prototype.clone.apply(this, arguments);

        geo.centerPoint = this.centerPoint.clone();

        geo.radius = this.radius;
        geo.startAngle = this.startAngle;
        geo.endAngle = this.endAngle;
        geo.textPosition = this.textPosition;
        geo.radiusPosAngle = this.radiusPosAngle;
        geo.radiusLineType = this.radiusLineType;
        geo.radiusText = this.radiusText;

        return geo;
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
            this.centerPoint = this.symbolData.centerPoint;
            this.endAngle = this.symbolData.endAngle;
            this.radius = this.symbolData.radius;
            this.radiusPosAngle = this.symbolData.radiusPosAngle;
            this.startAngle = this.symbolData.startAngle;
            this.textPosition = this.symbolData.textPosition;
            this.radiusLineType = this.symbolData.radiusLineType;
            this.radiusText = this.symbolData.radiusText;
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
            this.symbolData.centerPoint = this.centerPoint;
            this.symbolData.endAngle = this.endAngle;
            this.symbolData.radius = this.radius;
            this.symbolData.radiusPosAngle = this.radiusPosAngle;
            this.symbolData.startAngle = this.startAngle;
            this.symbolData.textPosition = this.textPosition;
            this.symbolData.radiusLineType = this.radiusLineType;

            this.symbolData.radiusText = this.radiusText;
        }
    },

    /**
     * Method: reView
     * 随图缩放时，沿线文字重新计算
     *
     */
    reView: function () {
        if(this.resolution !== undefined && this.resolution !== this.layer.renderer.getResolution()){
            this.calculateParts();
        }
    },

    /**
     * Method: modifyPoint
     * 修改位置点
     *
     * Parameters:
     * index - {Integer} 位置点索引。
     * pt - {<SuperMap.Geometry.Point>} 位置点。
     */
    modifyPoint: function (index, pt) {
        if (pt.isScalePoint === true) {
            if(1 === index){
                var textAngle = SuperMap.Plot.PlottingUtil.radian(this.controlPoints[0], pt)*180/Math.PI;

                this.textPosition = textAngle;
            }
            else if(0 === index){
                var angle = SuperMap.Plot.PlottingUtil.radian(this.controlPoints[0], pt)*180/Math.PI;

                if(this.startAngle%360 === this.endAngle%360){
                    this.radiusPosAngle = angle;
                }
                else{
                    if((angle > this.startAngle && angle < this.endAngle) || (angle+360 > this.startAngle && angle+360 < this.endAngle)){
                        this.radiusPosAngle = angle;
                    }
                }

                var dis = SuperMap.Plot.PlottingUtil.distance(this.controlPoints[0], pt);
                this.radius = SuperMap.Plot.PlottingUtil.degreeToLength(this.layer.map, dis, this.controlPoints[0]);
            }
        }
        else{
            this.centerPoint = this.controlPoints[0].clone();
        }

        this.calculateParts();
    },

    /**
     * Method: rotate
     * 围绕中心点旋转组合对象。
     *
     * Parameters:
     * rotateValue - {Float} 旋转角的度数。
     */
    rotate: function(rotateValue, anchorPoint) {
        for (var m = 0; m < this.controlPoints.length; m++) {
            this.controlPoints[m].rotate(rotateValue, anchorPoint);
        }

        for (var n = 0; n < this.scalePoints.length; n++) {
            this.scalePoints[n].rotate(rotateValue, anchorPoint);
        }

        this.radiusPosAngle += rotateValue;

        this.calculateParts();
    },

    /**
     * Method: resizeControlPoints
     * 根据拖动的手柄位置，改变编辑点坐标
     */
    resizeControlPoints:function(pixel, nHandle, oldBounds, controlPoints) {
        //var rtNew = this.resizeBounds(pixel, nHandle, oldBounds);
        //
        //if(SuperMap.Plot.PlottingUtil.equalFuzzy(rtNew.getWidth(), 0) && SuperMap.Plot.PlottingUtil.equalFuzzy(rtNew.getHeight(), 0)) {
        //    return;
        //}
        //if(SuperMap.Plot.PlottingUtil.equalFuzzy(oldBounds.getWidth(), 0) && SuperMap.Plot.PlottingUtil.equalFuzzy(oldBounds.getHeight(), 0)) {
        //    return;
        //}
        //
        //var dXRatio = SuperMap.Plot.PlottingUtil.equalFuzzy(oldBounds.getWidth(), 0) ? 0 : rtNew.getWidth()/oldBounds.getWidth();
        //var dYRatio = SuperMap.Plot.PlottingUtil.equalFuzzy(oldBounds.getHeight(), 0) ? 0 : rtNew.getHeight()/oldBounds.getHeight();
        //
        //var pntOrg1 = new SuperMap.Geometry.Point((oldBounds.left + oldBounds.right) / 2, (oldBounds.top + oldBounds.bottom) / 2);
        //var pntOrg2 = new SuperMap.Geometry.Point((rtNew.left + rtNew.right)/ 2, (rtNew.top + rtNew.bottom) / 2);
        //
        //for (var i = 0; i < this.controlPoints.length; i++) {
        //    this.controlPoints[i].x = pntOrg2.x + (controlPoints[i].x-pntOrg1.x)*dXRatio;
        //    this.controlPoints[i].y = pntOrg2.y + (controlPoints[i].y-pntOrg1.y)*dYRatio;
        //}
        //
        //this.calculateParts();
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
        if(this.layer.plottingEdit.isAddPoint !== true){
            for (var i = 0, len = this.controlPoints.length; i < len; i++) {
                this.controlPoints[i].move(x, y);
            }

            for (var j = 0, len = this.scalePoints.length; j < len; j++) {
                this.scalePoints[j].move(x, y);
            }
        }

        this.calculateParts();
    },


    CLASS_NAME:"SuperMap.Geometry.ArcRegion"
});