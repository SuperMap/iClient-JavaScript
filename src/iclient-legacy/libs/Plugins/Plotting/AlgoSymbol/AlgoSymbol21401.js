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
SuperMap.Geometry.AlgoSymbol21401 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.maxEditPts = 1000;

        this.scaleValues.push(0.03);

        //两个小圆的间隔距离与定位点折线的长度的比值
        this.scaleValues.push(0.4);

        //比例点所在的方向，1表示在左边，0表示在右边
        this.scaleValues.push(0.0);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var  geoPts = this.controlPoints;

        if (this.controlPoints <2)
        {
            return;
        }

        if (this.scaleValues.length !== 3)
        {
            this.scaleValues = [];
            this.scaleValues.push(0.03);
            this.scaleValues.push(0.4);
            this.scaleValues.push(0.0);
        }

        //创建贝塞尔曲线
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts, false);
        var linePts = [];
        //添加起点
        linePts.push(shapePts[shapePts.length-1]);

        var dAllLength = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

        //计算箭头的箭尾的两点
        var scale = this.getSubSymbolScaleValue();
        var dArrowDistance = scale* SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        var ptEnd = geoPts[geoPts.length-1];
        var dis = SuperMap.Plot.PlottingUtil.distance(ptEnd, shapePts[shapePts.length-1]);
        while(dis < 1.5*dArrowDistance){
            shapePts.pop();
            dis = SuperMap.Plot.PlottingUtil.distance(ptEnd, shapePts[shapePts.length-1]);
        }

        shapePts.push(ptEnd);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,shapePts);
        //添加箭头
       this.addArrow(shapePts);

        //添加第一个圆图元
        //第1个比例值，表示两个圆间的距离
        var firstScaleValue = this.scaleValues[1];
        var dFirstCircle = dAllLength * (1.0 - firstScaleValue) * 0.5;
        var objFirst = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dFirstCircle,shapePts);
        if(!objFirst.bfind)
        {
            return;
        }

        //第0个比例值，表示圆的半径与定位点折线的距离的比值
        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue()*0.5;
        }
        var startScaleValue = this.scaleValues[0];
        var dRadius = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts) * startScaleValue;
        var resultFirst = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dRadius, shapePts[objFirst.index],  objFirst.pts);

        //第2个比例值，表示比例点所在的方向 ，1表示左边，0表示右边
        var secondScaleValue = this.scaleValues[2];
        var firstCirclePt ;
        if(secondScaleValue === 1.0)
        {
            firstCirclePt = new SuperMap.Geometry.Point(resultFirst.pntLeft.x, resultFirst.pntLeft.y);
        }
        else if(secondScaleValue === 0.0)
        {
            firstCirclePt = new SuperMap.Geometry.Point(resultFirst.pntRight.x, resultFirst.pntRight.y);
        }
        var cellfirstcircle = [];
        cellfirstcircle.push(firstCirclePt);
        cellfirstcircle.push(objFirst.pts);
        var styleFirst = { lineTypeLimit : true };
        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL,cellfirstcircle,styleFirst);

        //添加第二个圆图元
        var secondCirclePt;
        var dSecondCircle = dAllLength * (0.5 + firstScaleValue * 0.5);
        var objSecond = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dSecondCircle,shapePts);
        if(!objSecond.bfind)
        {
            return;
        }
        var resultSecond = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dRadius, shapePts[objSecond.index],objSecond.pts);

        if(secondScaleValue === 1.0)
        {
            secondCirclePt = new SuperMap.Geometry.Point(resultSecond.pntLeft.x, resultSecond.pntLeft.y);
        }
        else if(secondScaleValue === 0.0)
        {
            secondCirclePt = new SuperMap.Geometry.Point(resultSecond.pntRight.x, resultSecond.pntRight.y);
        }

        //添加第二个圆的点以及该符号的比例点
        this.addScalePoint(secondCirclePt,0);

        var cellsecondcircle = [];
        cellsecondcircle.push(secondCirclePt);
        cellsecondcircle.push(objSecond.pts);
        var styleSecond = { lineTypeLimit : true };
        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL,cellsecondcircle,styleSecond);

        this.clearBounds();
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
        if(pt.isScalePoint === true) {
            if (0 != index) {
                return;
            }

            var geoPts = this.controlPoints;

            if (2 > geoPts.length) {
                return;
            }

            //创建贝塞尔曲线
            var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts, false);
            var dAllLength = SuperMap.Plot.PlottingUtil.polylineDistance(shapePts);

            //添加第一个圆图元
            //第1个比例值，表示两个圆间的距离
            var firstScaleValue = this.scaleValues[1];


            //添加第二个圆图元
            var dSecondCircle = dAllLength * (0.5 + firstScaleValue * 0.5);
            var objSecond = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dSecondCircle, shapePts);
            if (!objSecond.bfind) {
                return;
            }
            var resultSecond = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(1.0, shapePts[objSecond.index], objSecond.pts);

            var bRight =  SuperMap.Plot.PlottingUtil.PointIsRightToLine(shapePts[objSecond.index],shapePts[objSecond.index + 1], pt);
            if(bRight)
            {
                this.scaleValues[2] = 0.0;
            }
            else
            {
                this.scaleValues[2] = 1.0;
            }
            //计算比例点在垂线上的垂足
            var footPt;//{isOnline: isOnline, projectPoint: resultPoint};
            footPt = SuperMap.Plot.PlottingUtil.pointProjectToSegment(pt, new SuperMap.Geometry.Point(resultSecond.pntLeft.x, resultSecond.pntLeft.y), new SuperMap.Geometry.Point(resultSecond.pntRight.x, resultSecond.pntRight.y));
            var dRadius = SuperMap.Plot.PlottingUtil.distance(footPt.projectPoint, new SuperMap.Geometry.Point(objSecond.pts.x, objSecond.pts.y));
            this.scaleValues[0]=dRadius / dAllLength;

        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol21401"
});
