/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol25400 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

    /**
     * Constructor: SuperMap.Geometry.AlgoSymbol
     * 创建一个线面标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Geometry.AlgoSymbol>} 新的标绘对象。
     */
    initialize: function (option) {
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.symbolType = SuperMap.Plot.SymbolType.ALGOSYMBOL;

        this.minEditPts = 2;
        this.maxEditPts = 9999;

        this.scaleValues.push(0.05);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        if (geoPts.length < this.minEditPts) {
            return;
        }

        if(this.scaleValues.length == 0){
            this.scaleValues.push(0.05);
        }

        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
        SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(allDistance / 2, shapePts);
        if(!ptsindex.bfind){
            return;
        }
        var midPt = ptsindex.pts;
        var index = ptsindex.index;

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue()*1.5;
        }

        var dScale = this.scaleValues[0];
        var dDistance = dScale*allDistance;
        var dLineDis = 0.3*dDistance;

        //计算贝赛尔曲线左侧的部分
        var pts2DLeft = [];
        pts2DLeft.push(midPt);
        for(var i = index; i >= 0; i--)
        {
            pts2DLeft.push(shapePts[i]);
        }

        var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistance, pts2DLeft);
        if(!ptsindex.bfind) {
            return;
        }
        var nIndexLeft = ptsindex.index;
        var ptLeft = ptsindex.pts;

        var pts2D = [];
        pts2D.push(ptLeft);
        for(var i = nIndexLeft+1; i < pts2DLeft.length; i++) {
            pts2D.push(pts2DLeft[i]);
        }

        //计算贝赛尔曲线起始竖线
        var ptStart1 = shapePts[0].clone();
        var ptStart2 = shapePts[1].clone();
        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart1,ptStart2)*this.RTOD;
        var tempPt1 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart1,dLineDis,dLineDis,angle+270);
        pts2D.push(tempPt1);

        var style = {surroundLineFlag: false,fillLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D, style);

        //计算贝赛尔曲线右侧的部分
        var pts2DRight = [];
        pts2DRight.push(midPt);
        for(var i = index+1; i < shapePts.length; i++)
        {
            pts2DRight.push(shapePts[i]);
        }

        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistance, pts2DRight);
        if(!ptsindex.bfind) {
            return;
        }
        var nIndexRight = ptsindex.index;
        var ptRight = ptsindex.pts;

        pts2D = [];
        pts2D.push(ptRight);
        for(var i = nIndexRight+1; i < pts2DRight.length; i++)
        {
            pts2D.push(pts2DRight[i]);
        }
        //计算贝赛尔曲线结束竖线
        var ptEnd1 = shapePts[shapePts.length-1].clone();
        var ptEnd2 = shapePts[shapePts.length-2].clone();
        var angleEnd = SuperMap.Plot.PlottingUtil.radian(ptEnd1,ptEnd2)*this.RTOD;
        var tempPt3 = SuperMap.Plot.PlottingUtil.circlePoint(ptEnd1,dLineDis,dLineDis,angleEnd+270);
        pts2D.push(tempPt3);

        style = {surroundLineFlag: false,fillLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D, style);

        //计算中间符号的角度
        var subPt1 = ptLeft.clone();
        var subPt2 = ptRight.clone();
        var subSymAngle = SuperMap.Plot.PlottingUtil.radian(subPt1,subPt2)*this.RTOD;

        //计算中间符号的中心点
        var subCenterPt = new SuperMap.Geometry.Point((ptLeft.x+ptRight.x)/2,(ptLeft.y+ptRight.y)/2);
        //计算空军图元
        var pt1 = new SuperMap.Geometry.Point(-0.2*dDistance,0);
        var pt2 = new SuperMap.Geometry.Point(-0.8*dDistance,0);

        var tempPt1_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(subCenterPt,pt1,subSymAngle);
        var tempPt1_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(subCenterPt,pt2,subSymAngle);

        pts2D = [];
        pts2D.push(tempPt1_1);
        pts2D.push(tempPt1_2);

        style = {surroundLineFlag: false,lineTypeLimit:true, fillLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D, style);

        //计算空军图元
        var pt3 = new SuperMap.Geometry.Point(-0.2*dDistance-1.2/3*dDistance,0);
        var pt4 = SuperMap.Plot.PlottingUtil.circlePoint(pt3,0.3*dDistance,0.3*dDistance,45);
        var pt5 = SuperMap.Plot.PlottingUtil.circlePoint(pt3,0.3*dDistance,0.3*dDistance,315);

        var tempPt1_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(subCenterPt,pt3,subSymAngle);
        var tempPt1_4 = SuperMap.Plot.PlottingUtil.coordinateTrans(subCenterPt,pt4,subSymAngle);
        var tempPt1_5 = SuperMap.Plot.PlottingUtil.coordinateTrans(subCenterPt,pt5,subSymAngle);

        pts2D = [];
        pts2D.push(tempPt1_4);
        pts2D.push(tempPt1_3);
        pts2D.push(tempPt1_5);

        style = {surroundLineFlag: false,lineTypeLimit:true, fillLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D, style);

        //计算三角形图元
        var pt6 = new SuperMap.Geometry.Point(0.2*dDistance,0);
        var pt7 = new SuperMap.Geometry.Point(0.8*dDistance,-0.15*dDistance);
        var pt8 = new SuperMap.Geometry.Point(0.8*dDistance, 0.15*dDistance);

        var tempPt2_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(subCenterPt,pt6,subSymAngle);
        var tempPt2_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(subCenterPt,pt7,subSymAngle);
        var tempPt2_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(subCenterPt,pt8,subSymAngle);

        pts2D = [];
        pts2D.push(tempPt2_1);
        pts2D.push(tempPt2_2);
        pts2D.push(tempPt2_3);
        pts2D.push(tempPt2_1);

        style = {surroundLineFlag: false,lineTypeLimit:true, fillLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D, style);

        //计算比例点
        var scalePt2D = SuperMap.Plot.PlottingUtil.circlePoint(subCenterPt,dDistance,dDistance,subSymAngle+90);
        this.scalePoints = [];
        this.addScalePoint(scalePt2D.clone());
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
        if(pt.isScalePoint === true){
            if(this.scalePoints.length <= index)
                return;

            if(0 != index) {
                return;
            }

            var geoPts = this.controlPoints;

            var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

            //清理重复的点
            SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

            var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

            var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dAllDistance / 2, shapePts);
            if(!ptsindex.bfind) {
                return;
            }
            var midPt = ptsindex.pts;
            var index = ptsindex.index;

            var dScale = this.scaleValues[0];
            var dDistance = dScale*dAllDistance;

            //计算贝赛尔曲线左侧的部分
            var pts2DLeft = [], pts2DRight = [];
            pts2DLeft.push(midPt);
            for(var i = index; i >= 0; i--)
            {
                pts2DLeft.push(shapePts[i]);
            }

            pts2DRight.push(midPt);
            for(var i = index+1; i < shapePts.length; i++)
            {
                pts2DRight.push(shapePts[i]);
            }

            ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistance, pts2DLeft);
            if(!ptsindex.bfind) {
                return;
            }
            var ptLeft = ptsindex.pts;
            var nIndexLeft = ptsindex.index;

            ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistance, pts2DRight);
            if(!ptsindex.bfind) {
                return;
            }
            var ptRight = ptsindex.pts;
            var nIndexRight = ptsindex.index;

            var subCenterPt = new SuperMap.Geometry.Point((ptLeft.x+ptRight.x)/2,(ptLeft.y+ptRight.y)/2);
            var dDis = SuperMap.Plot.PlottingUtil.distance(pt, subCenterPt);

            var scaleValue = dDis/dAllDistance;
            this.scaleValues[0] = scaleValue;
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol25400"
});
