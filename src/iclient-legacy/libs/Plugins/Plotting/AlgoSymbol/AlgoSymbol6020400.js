/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol6020400 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.maxEditPts = 3;

        this.scaleValues = [];
        this.scaleValues[0] = 0.05;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.scaleValues.length < 1){
            this.scaleValues = [];
            this.scaleValues.push(0.05);
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        if (geoPts < this.minEditPts)
        {
            return;
        }

        var radius = SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[1]);
        if (2 === this.controlPoints.length) {
            geoPts.splice(1, 0, new SuperMap.Geometry.Point(geoPts[0].x+radius, geoPts[0].y));
        }

        var pt1 = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
        var pt2 = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);
        var pt3 = new SuperMap.Geometry.Point(geoPts[2].x,geoPts[2].y);

        var dRadius = radius;//SuperMap.Plot.PlottingUtil.distance(pt1,pt2);

        var angle1 = SuperMap.Plot.PlottingUtil.radian(pt1,pt2) * 180 / Math.PI;
        var angle2 = SuperMap.Plot.PlottingUtil.radian(pt1,pt3) * 180 / Math.PI;

        var dStartAngle = angle1 % 360;
        var dEndAngle = angle2 % 360;
        if (dStartAngle > dEndAngle) {
            dEndAngle += 360;
        }

        if(!this.isEdit){
            var defualtSize = 0.5 * this.getDefaultSubSymbolSize();
            this.subSymbolScaleValue = defualtSize / dRadius;
            if(this.subSymbolScaleValue > 0.1){
                this.subSymbolScaleValue = 0.1;
            }

            this.scaleValues[0] = this.subSymbolScaleValue;
        }

        var symbolSize = dRadius * this.scaleValues[0];
        var sunHalfAnlge = Math.atan(0.5*symbolSize/dRadius)*180/Math.PI;
        var angleScale = 1.8;

        var stepAnlge = (dEndAngle - dStartAngle)/3;

        var step = (dEndAngle - dStartAngle)/50;

        var arcPts1 = this.getArcPts(geoPts[0], dRadius, dStartAngle, dStartAngle + stepAnlge - angleScale *sunHalfAnlge, step);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, arcPts1);

        var arcPts2 = this.getArcPts(geoPts[0], dRadius, dStartAngle + stepAnlge + angleScale *sunHalfAnlge, dStartAngle + 2*stepAnlge - angleScale *sunHalfAnlge, step);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, arcPts2);

        var arcPts3 = this.getArcPts(geoPts[0], dRadius, dStartAngle + 2*stepAnlge + angleScale *sunHalfAnlge, dEndAngle, step);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, arcPts3);

        var symbolAngle1 = dStartAngle+stepAnlge + 90;
        var symbolPt1 = SuperMap.Plot.PlottingUtil.circlePoint(geoPts[0],radius,radius,dStartAngle+stepAnlge);
        this.createSubSymbol(symbolPt1,symbolSize,symbolAngle1);

        var symbolPt2 = SuperMap.Plot.PlottingUtil.circlePoint(geoPts[0],radius,radius,dStartAngle+2*stepAnlge);
        var symbolAngle2 = dStartAngle+2*stepAnlge + 90;
        this.createSubSymbol(symbolPt2,symbolSize,symbolAngle2);

        var scalePt = SuperMap.Plot.PlottingUtil.circlePoint(geoPts[0],radius+symbolSize,radius+symbolSize,dStartAngle+stepAnlge);
        this.addScalePoint(scalePt);

        if(3 === this.controlPoints.length){
            this.controlPoints[2] = SuperMap.Plot.PlottingUtil.circlePoint(geoPts[0], radius, radius, dEndAngle);
        }

        this.clearBounds();
    },

    getArcPts: function(circleCenterPt, radius, startAngle, endAgnle, angleStep){
        if(undefined === angleStep || null === angleStep){
            angleStep = 1;
        }

        var arcPts = [];
        for(var i = startAngle; i < endAgnle; i += angleStep){
            var tempPt = SuperMap.Plot.PlottingUtil.circlePoint(circleCenterPt,radius,radius,i);
            arcPts.push(tempPt);
        }
        var arcEndPt = SuperMap.Plot.PlottingUtil.circlePoint(circleCenterPt,radius,radius,endAgnle);
        arcPts.push(arcEndPt);

        return arcPts;
    },

    createSubSymbol: function(symbolPt, symbolSize, angle){
        var cells = this.getSubSymbolPts(symbolSize);

        for(var i = 0; i < cells.length; i++){
            var subPts = cells[i];

            var subSymbolPts = [];
            for(var m = 0; m < subPts.length; m++){
                var pt = SuperMap.Plot.PlottingUtil.coordinateTrans(symbolPt,subPts[m],angle);
                subSymbolPts.push(pt);
            }
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,subSymbolPts);
        }
    },

    /**
     * 获取子标号局部坐标系的点
     *
     * @Parameters:
     * symbolSize 标号的大小
     *
     * @Returns
     * {Array(<SuperMap.Geometry.Point>)} 子标号位置点
     *
     */
    getSubSymbolPts: function(symbolSize){
        var cells = [];

        var cellPts1 = [];
        cellPts1.push(new SuperMap.Geometry.Point(-symbolSize/2, 0));
        cellPts1.push(new SuperMap.Geometry.Point( symbolSize/2, 0));
        cells.push(cellPts1);

        var cellPts2 = [];
        cellPts2.push(new SuperMap.Geometry.Point(0,-symbolSize/2));
        cellPts2.push(new SuperMap.Geometry.Point(0, 0));
        cells.push(cellPts2);

        return cells;
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
            geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
            if (geoPts < this.minEditPts)
            {
                return;
            }

            var radius = SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[1]);
            if (2 === this.controlPoints.length) {
                geoPts.splice(1, 0, new SuperMap.Geometry.Point(geoPts[0].x+radius, geoPts[0].y));
            }

            var pt1 = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
            var pt2 = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);
            var pt3 = new SuperMap.Geometry.Point(geoPts[2].x,geoPts[2].y);

            var dRadius = SuperMap.Plot.PlottingUtil.distance(pt1,pt2);

            var angle1 = SuperMap.Plot.PlottingUtil.radian(pt1,pt2) * 180 / Math.PI;
            var angle2 = SuperMap.Plot.PlottingUtil.radian(pt1,pt3) * 180 / Math.PI;

            var dStartAngle = angle1 % 360;
            var dEndAngle = angle2 % 360;
            if (dStartAngle > dEndAngle) {
                dEndAngle += 360;
            }

            var stepAnlge = (dEndAngle - dStartAngle)/3;
            var symbolPt1 = SuperMap.Plot.PlottingUtil.circlePoint(geoPts[0],radius,radius,dStartAngle+stepAnlge);
            var dis = SuperMap.Plot.PlottingUtil.distance(symbolPt1, pt);

            var dScale = dis/ dRadius;
            if(dScale <= 0.6){
                this.scaleValues[0] = dScale;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol6020400"
});


