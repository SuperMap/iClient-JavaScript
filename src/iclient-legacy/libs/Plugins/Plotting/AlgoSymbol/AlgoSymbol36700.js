

/**
 * Created by xuxiaorong01 on 2016/11/18.
 */
/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol36700 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
SPACESCALE		:0.1,//火箭和线的间隔
VERTICALSCALE   :0.3,//火箭竖直比例
ARROWSCALE		:0.02,

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

        this.scaleValues = [];
        this.scaleValues[0] = 0.03;
        this.scaleValues[1] = 0.05;

        if (this.subSymbols.length >= 0) {
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 7600));
        }
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {

        this.init();

        if (this.controlPoints < 2)
        {
            return;
        }

        if(this.scaleValues.length < 1){
            this.scaleValues = [];
            this.scaleValues[0] = 0.03;
            this.scaleValues[1] = 0.05;
        }

        if(!this.isEdit){
            this.scaleValues[1] = this.getSubSymbolScaleValue();
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

        SuperMap.Plot.PlottingUtil.clearSamePts(shapePts);

        //折线连成线的长度
        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dAllDistance/2, shapePts);
        if(!ptsindex.bfind)
        {
            return;
        }
        var midPt = ptsindex.pts;
        var index = ptsindex.index;

        var  dScacle0 = this.scaleValues[0];
        var  dScacle1 = this.scaleValues[1];
        var dDistance = dScacle1 * dAllDistance;

        //计算贝赛尔曲线左侧的部分
        var ptsLeft = [], i;
        ptsLeft.push(midPt);
        for(i = index; i >= 0; i--)
        {
            ptsLeft.push(shapePts[i]);
        }

        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistance, ptsLeft);
        if(!ptsindex.bfind) {
            return;
        }
        var nIndexLeft = ptsindex.index;
        var ptLeft = ptsindex.pts;

        var leftPts2D = [];
        leftPts2D.push(ptLeft);
        for(i = nIndexLeft+1; i < ptsLeft.length; i++)
        {
            leftPts2D.push(ptsLeft[i]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,leftPts2D);

        //计算贝赛尔曲线右侧的部分
        var ptsRight = [];
        ptsRight.push(midPt);
        for(i = index+1; i < shapePts.length; i++)
        {
            ptsRight.push(shapePts[i]);
        }

        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistance, ptsRight);
        if(!ptsindex.bfind) {
            return;
        }
        var nIndexRight = ptsindex.index;
        var ptRight = ptsindex.pts;

        var rightPts2D = [];
        rightPts2D.push(ptRight);
        for(i = nIndexRight+1; i < ptsRight.length; i++)
        {
            rightPts2D.push(ptsRight[i]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,rightPts2D);

        var dLineDis = dScacle0*dAllDistance;

        var arrPnts = [];
        for(i = 0; i < shapePts.length; i++)
        {
            arrPnts.push(shapePts[i].clone());
        }

        //画平行线
        var paraPntsLeft1 = SuperMap.Plot.PlottingUtil.paraLine(arrPnts, 2*dLineDis, true);
        var paraPntsRight1 = SuperMap.Plot.PlottingUtil.paraLine(arrPnts, 2*dLineDis, false);

        var leftLinePts1 = [];
        for(i = 0; i < paraPntsLeft1.length; i++)
        {
            leftLinePts1.push(paraPntsLeft1[i]);
        }

        var rightLinePts1 = [];
        for(i = 0; i < paraPntsRight1.length; i++)
        {
            rightLinePts1.push(paraPntsRight1[i]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,leftLinePts1);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,rightLinePts1);

        //计算符号(画导弹)
        //计算符号角度
        var dSymbolDis = SuperMap.Plot.PlottingUtil.distance(ptLeft,ptRight);

        var ddis = this.SPACESCALE*dSymbolDis;
        var ptStart = SuperMap.Plot.PlottingUtil.LinePnt(ptLeft,ptRight,ddis);
        var ptEnd = SuperMap.Plot.PlottingUtil.LinePnt(ptRight,ptLeft,ddis);

        var SocketCenterPt = new SuperMap.Geometry.Point((ptLeft.x +ptRight.x)/2,(ptLeft.y +ptRight.y)/2);

        var dvertdis = dDistance*this.VERTICALSCALE;

        var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dvertdis*2,ptEnd,SocketCenterPt);
        var ptyellow = sidepoint.pntRight;
        var ptnouse = sidepoint.pntLeft;

        var dSymbolAngle = SuperMap.Plot.PlottingUtil.radian(ptLeft,ptRight)*this.RTOD;

        if(this.subSymbols.length > 0){
            this.computeSubSymbol(this.subSymbols[0],SocketCenterPt,dSymbolDis*0.8,dSymbolAngle-90);
        }

        var startPt = shapePts[0];
        var dArrowDis = dAllDistance * this.ARROWSCALE;

        var pt2_1 = new SuperMap.Geometry.Point(-dArrowDis, 0.25*dArrowDis);
        var pt2_2 = new SuperMap.Geometry.Point(-dArrowDis,-0.25*dArrowDis);

        var startPt2D_0 = shapePts[0];
        var startPt2D_1 = shapePts[1];

        var tempAngle = SuperMap.Plot.PlottingUtil.radian(startPt2D_1,startPt2D_0)*this.RTOD;

        var tempPt2_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt2D_0,pt2_1,tempAngle);
        var tempPt2_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(startPt2D_0,pt2_2,tempAngle);

        var shapePtsStartArrow = [];
        shapePtsStartArrow.push(tempPt2_1);
        shapePtsStartArrow.push(startPt);
        shapePtsStartArrow.push(tempPt2_2);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,shapePtsStartArrow,{fillLimit:true, fillStyle:0,lineTypeLimit:true,surroundLineLimit:true});

        //添加箭头
        var lineEndPt = shapePts[shapePts.length-1];
        var lineStartPt;
        for (i = shapePts.length-2; i >= 0; i--)
        {
            lineStartPt = shapePts[i];
            var dDistance = SuperMap.Plot.PlottingUtil.distance(lineStartPt, lineEndPt);

            if (dDistance > dArrowDis) {
                break;
            }
        }

        var angle  = SuperMap.Plot.PlottingUtil.radian(lineStartPt,lineEndPt)*this.RTOD;
        var ptArrowRight = SuperMap.Plot.PlottingUtil.circlePoint(lineEndPt,dArrowDis,dArrowDis,angle+165);
        var ptArrowLeft = SuperMap.Plot.PlottingUtil.circlePoint(lineEndPt,dArrowDis,dArrowDis,angle+195);
        var shapePtsHead = [];
        shapePtsHead.push(ptArrowRight);
        shapePtsHead.push(geoPts[geoPts.length-1]);
        shapePtsHead.push(ptArrowLeft);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,shapePtsHead,{fillLimit:true, fillStyle:0,lineTypeLimit:true,surroundLineLimit:true});

        this.scalePoints = [];
        this.addScalePoint(paraPntsRight1[0]);
        this.addScalePoint(ptyellow);
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
        if (pt.isScalePoint === true) {
            if (index != 0 && index != 1) {
                return;
            }

            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            if (2 > geoPts.length) {
                return;
            }

            var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);

            //折线连成线的长度
            var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

            if(0 == index)
            {
                var ddis = SuperMap.Plot.PlottingUtil.distance(geoPts[0],pt);
                var dscale = ddis/2/dAllDistance;
                this.scaleValues[0] = dscale;
            }
            else if(1 == index)
            {
                var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dAllDistance/2, shapePts);
                if(!ptsindex.bfind) {
                    return;
                }
                var midPt = ptsindex.pts;
                var index = ptsindex.index;

                var  dScacle1 = this.scaleValues[1];
                var dDistance = dScacle1*dAllDistance;
                //计算贝赛尔曲线左侧的部分
                var ptsLeft = [];
                ptsLeft.push(midPt);
                for(i = index; i >= 0; i--)
                {
                    ptsLeft.push(shapePts[i]);
                }

                ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistance, ptsLeft);
                if(!ptsindex.bfind)
                {
                    return;
                }
                var ptLeft = ptsindex.pts;

                //计算贝赛尔曲线右侧的部分
                var ptsRight = [];
                ptsRight.push(midPt);
                for(var i = index+1; i < shapePts.length; i++)
                {
                    ptsRight.push(shapePts[i]);
                }


                ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistance, ptsRight);
                if(!ptsindex.bfind)
                {
                    return;
                }
                var ptRight = ptsindex.pts;

                //计算符号(画导弹)
                //计算符号角度
                var dSymbolDis = SuperMap.Plot.PlottingUtil.distance(ptLeft,ptRight);

                var ddis = this.SPACESCALE*dSymbolDis;
                var ptStart = SuperMap.Plot.PlottingUtil.LinePnt(ptLeft,ptRight,ddis);
                var ptEnd = SuperMap.Plot.PlottingUtil.LinePnt(ptRight,ptLeft,ddis);

                var SocketCenterPt = new SuperMap.Geometry.Point((ptLeft.x +ptRight.x)/2,(ptLeft.y +ptRight.y)/2);

                var dScaleDis = SuperMap.Plot.PlottingUtil.distance(SocketCenterPt,pt);

                var dscale = dScaleDis*2/dAllDistance;
                this.scaleValues[1] = dscale;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol36700"
});

