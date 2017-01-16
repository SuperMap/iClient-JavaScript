/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol29800 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol1004, {


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

        this.minEditPts = 3;
        this.maxEditPts = 30;

        this.scaleValues = [];
        this.scaleValues.push(0.2);
        this.scaleValues.push(0.2);
        this.scaleValues.push(0.4);
        this.scaleValues.push(0.4);
        this.scaleValues.push(0.1);
        this.scaleValues.push(0.2);
        this.scaleValues.push(0.1);
        this.scaleValues.push(0.2);
        this.scaleValues.push(1);
        this.scaleValues.push(1);

    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();
        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        //去除重复点
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if (geoPts.length < this.minEditPts) {
            return;
        }

        var dAllDistance = 0;
        for (var i = 0; i < geoPts.length - 1; i++) {
            dAllDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
        }

        var dScale0 = this.scaleValues[0];
        var dDistance = dScale0 * dAllDistance;
        //继承1004线面标号
        SuperMap.Geometry.AlgoSymbol1004.prototype.calculateParts.apply(this, arguments);
        //左阵地点
        var ddis4 = dAllDistance * this.scaleValues[4];
        var dlength4 = dAllDistance * this.scaleValues[5];

        var ddis = SuperMap.Plot.PlottingUtil.distance(geoPts[1], geoPts[0]);
        var ptPlumb4 = SuperMap.Plot.PlottingUtil.LinePnt(geoPts[1], geoPts[0], (ddis + dlength4));

        var sidePts;

        if (this.scaleValues[8] === 0)//左边
        {
            sidePts = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis4, geoPts[1], ptPlumb4);
        }
        else {
            sidePts = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis4, geoPts[1], ptPlumb4);
        }

        //右阵地点
        var ddis5 = dAllDistance * this.scaleValues[6];
        var dlength5 = dAllDistance * this.scaleValues[7];
        var sidePts1;
        var ptPlumb5 = SuperMap.Plot.PlottingUtil.LinePnt(geoPts[0], geoPts[1], (ddis + dlength5));
        if (this.scaleValues[9] === 0)//左边
        {
            sidePts1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis5, geoPts[0], ptPlumb5);
        }
        else {
            sidePts1 = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ddis5, geoPts[0], ptPlumb5);

        }
        var ptsBezier3D = [];
        ptsBezier3D.push(new SuperMap.Geometry.Point(sidePts.pntLeft.x, sidePts.pntLeft.y));
        ptsBezier3D.push(new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y));
        ptsBezier3D.push(new SuperMap.Geometry.Point(geoPts[1].x, geoPts[1].y));
        ptsBezier3D.push(new SuperMap.Geometry.Point(sidePts1.pntRight.x, sidePts1.pntRight.y));
        //创建贝塞尔曲线
        var shapePts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(ptsBezier3D);

        //创建阵地线
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts);

        //添加比例点
        if(this.isEdit){
            this.addScalePoint(sidePts.pntLeft,3);
            this.addScalePoint(sidePts1.pntRight,4);
        }

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
    modifyPoint: function (index, pt) {

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        var ptPlum = SuperMap.Plot.PlottingUtil.projectPoint(pt,geoPts[0],geoPts[1]);

        //继承1004的编辑
        if(index <= 2){
            SuperMap.Geometry.AlgoSymbol1004.prototype.modifyPoint.apply(this,arguments);
        }

        if(index === 3 ){

            var dis4 = SuperMap.Plot.PlottingUtil.distance(pt,ptPlum);
            var dScale4 = dis4/dAllDistance;

            var dL4 = SuperMap.Plot.PlottingUtil.distance(ptPlum,geoPts[0]);
            var dScale5 = dL4/dAllDistance;

            this.scaleValues[4] = dScale4;
            this.scaleValues[5] = dScale5;

            if(SuperMap.Plot.PlottingUtil.PointIsRightToLine(geoPts[0],geoPts[1],pt))// TRUE表示在直线右边,FALSE表示在直线左边
            {
                this.scaleValues[8] = 1;
            }
        else
            {
                this.scaleValues[8] = 0;
            }
        }

        if(index === 4){
            var dis4 = SuperMap.Plot.PlottingUtil.distance(pt,ptPlum);
            var dScale6 = dis4/dAllDistance;

            var dL4 = SuperMap.Plot.PlottingUtil.distance(ptPlum,geoPts[1]);
            var dScale7 = dL4/dAllDistance;

           this.scaleValues[6] = dScale6;
           this.scaleValues[7] = dScale7;

            if(SuperMap.Plot.PlottingUtil.PointIsRightToLine(geoPts[0],geoPts[1],pt))// TRUE表示在直线右边,FALSE表示在直线左边
            {
               this.scaleValues[9] = 1;
            }
        else
            {
                this.scaleValues[9] = 0;
            }
        }

        this.calculateParts();

    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol29800"
});