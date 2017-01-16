/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol28000 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {


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
        this.maxEditPts = 4;

        this.scaleValues = [];
        this.scaleValues.push(0.5);
        this.scaleValues.push(0.349066);


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
        var dAngle = this.scaleValues[1];
        var angleScale = dAngle * this.RTOD;

        var ptStart = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
        var ptEnd = new SuperMap.Geometry.Point(geoPts[geoPts.length - 1].x, geoPts[geoPts.length - 1].y);
        var centerAngle = SuperMap.Plot.PlottingUtil.radian(ptStart, ptEnd) * this.RTOD;

        var centerLineLastPt0 = new SuperMap.Geometry.Point(0.0, 0.0);
        if (2 <= geoPts.length) {
            var pts2DPie = [];
            var pt = new SuperMap.Geometry.Point(geoPts[1].x, geoPts[1].y);
            var dRadius = SuperMap.Plot.PlottingUtil.distance(ptStart, pt);

            var i = 0.0;
            for (i = centerAngle - angleScale;
                 i < centerAngle + angleScale;
                 i += 3.0) {
                pts2DPie.push(SuperMap.Plot.PlottingUtil.circlePoint(ptStart, dRadius, dRadius, i));
            }

            if (SuperMap.Plot.PlottingUtil.equalFuzzy(i, centerAngle + angleScale)) {
                i = centerAngle + angleScale;
                pts2DPie.push(SuperMap.Plot.PlottingUtil.circlePoint(ptStart, dRadius, dRadius, i));
            }

            var pts2D = [];
            pts2D.push(geoPts[0]);
            for (var i = 0; i < pts2DPie.length; i++) {
                pts2D.push(new SuperMap.Geometry.Point(pts2DPie[i].x, pts2DPie[i].y));
            }
            pts2D.push(geoPts[0]);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);


            //扇形中间的折线
            var tempPt2D = SuperMap.Plot.PlottingUtil.circlePoint(ptStart, dRadius, dRadius, centerAngle);
            centerLineLastPt0 = new SuperMap.Geometry.Point(tempPt2D.x, tempPt2D.y);

            var vecPts = [];
            vecPts.push(geoPts[0]);
            vecPts.push(centerLineLastPt0);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, vecPts);
        }

        var centerLineLastPt1 = new SuperMap.Geometry.Point(0.0, 0.0);
        if (3 <= geoPts.length) {
            //扇形
            var pts2DPie = [];
            var pt = new SuperMap.Geometry.Point(geoPts[2].x, geoPts[2].y);
            var dRadius = SuperMap.Plot.PlottingUtil.distance(ptStart, pt);

            var i = 0.0;
            for (i = centerAngle - angleScale;
                 i < centerAngle + angleScale;
                 i += 3) {
                pts2DPie.push(SuperMap.Plot.PlottingUtil.circlePoint(ptStart, dRadius, dRadius, i));
            }

            if (SuperMap.Plot.PlottingUtil.equalFuzzy(i, centerAngle + angleScale)) {
                i = centerAngle + angleScale;
                pts2DPie.push(SuperMap.Plot.PlottingUtil.circlePoint(ptStart, dRadius, dRadius, i));
            }

            var arr = [];
            if (0 == pts2DPie.length) {
                var nCells = arr.length;
                if (nCells > 0) {
                    arr = [];
                }
                return;
            }

            var pts2D = [];
            pts2D.push(geoPts[0]);
            for (var i = 0; i < pts2DPie.length; i++) {
                pts2D.push(new SuperMap.Geometry.Point(pts2DPie[i].x, pts2DPie[i].y));
            }
            pts2D.push(geoPts[0]);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

            //半圆
            var tempPt = new SuperMap.Geometry.Point(geoPts[1].x, geoPts[1].y);
            var dRadiusCircle = SuperMap.Plot.PlottingUtil.distance(ptStart, tempPt) * this.scaleValues[0];

            var pts2DCircle = [];
            for (var i = 90; i <= 270; i += 3) {
                pts2DCircle.push(SuperMap.Plot.PlottingUtil.circlePoint(ptStart, dRadiusCircle, dRadiusCircle, centerAngle + i));
            }

            pts2D = [];
            for (var i = pts2DCircle.length - 1; i >= 0; i--) {
                pts2D.push(new SuperMap.Geometry.Point(pts2DCircle[i].x, pts2DCircle[i].y));
            }

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

            //折线1
            pts2D = [];
            pts2D.push(new SuperMap.Geometry.Point(pts2DCircle[0].x, pts2DCircle[0].y));
            pts2D.push(new SuperMap.Geometry.Point(pts2DPie[pts2DPie.length - 1].x, pts2DPie[pts2DPie.length - 1].y));


            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

            //折线2
            pts2D = [];
            pts2D.push(new SuperMap.Geometry.Point(pts2DPie[0].x, pts2DPie[0].y));
            pts2D.push(new SuperMap.Geometry.Point(pts2DCircle[pts2DCircle.length - 1].x, pts2DCircle[pts2DCircle.length - 1].y));

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

            //扇形中间的折线
            var tempPt2D = SuperMap.Plot.PlottingUtil.circlePoint(ptStart, dRadius, dRadius, centerAngle);
            var centerLineLastPt1 = new SuperMap.Geometry.Point(tempPt2D.x, tempPt2D.y);

            var vecPts = [];
            vecPts.push(centerLineLastPt0);
            vecPts.push(centerLineLastPt1);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, vecPts);
        }

        var centerLineLastPt2 = new SuperMap.Geometry.Point(0.0, 0.0);
        if (4 <= geoPts.length) {
            //扇形
            var pts2DPie = [];
            var pt = new SuperMap.Geometry.Point(geoPts[3].x, geoPts[3].y);
            var dRadius = SuperMap.Plot.PlottingUtil.distance(ptStart, pt);

            var i = 0.0;
            for (i = centerAngle - angleScale;
                 i <= centerAngle + angleScale;
                 i += 3) {
                pts2DPie.push(SuperMap.Plot.PlottingUtil.circlePoint(ptStart, dRadius, dRadius, i));
            }

            if (SuperMap.Plot.PlottingUtil.equalFuzzy(i, centerAngle + angleScale)) {
                i = centerAngle + angleScale;
                pts2DPie.push(SuperMap.Plot.PlottingUtil.circlePoint(ptStart, dRadius, dRadius, i));
            }

            var pts2D = [];
            pts2D.push(geoPts[0]);
            for (var i = 0; i < pts2DPie.length; i++) {
                pts2D.push(new SuperMap.Geometry.Point(pts2DPie[i].x, pts2DPie[i].y));
            }
            pts2D.push(geoPts[0]);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);

            //扇形中间的折线
            var tempPt2D = SuperMap.Plot.PlottingUtil.circlePoint(ptStart, dRadius, dRadius, centerAngle);
            centerLineLastPt2 = new SuperMap.Geometry.Point(tempPt2D.x, tempPt2D.y);

            var vecPts = [];
            vecPts.push(centerLineLastPt1);
            vecPts.push(centerLineLastPt2);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, vecPts);
        }

        if (2 <= geoPts.length) {
            var annoPt = new SuperMap.Geometry.Point((geoPts[0].x + centerLineLastPt0.x) / 2,
                (geoPts[0].y + centerLineLastPt0.y) / 2);

            var ptLeftEnd = geoPts[0];
            var ptRightStart = centerLineLastPt0;

            var dAngle = SuperMap.Plot.PlottingUtil.radian(ptLeftEnd, ptRightStart) * this.RTOD;
            var dWidth = SuperMap.Plot.PlottingUtil.distance(ptLeftEnd, ptRightStart) * 0.2;
            annoPt = SuperMap.Plot.PlottingUtil.circlePoint(annoPt, dWidth / 4, dWidth / 4, 90);

            //创建文本图元
            var style = {surroundLineFlag: false, fontSize: 15, fontSizeLimit: true};
            style.labelAlign = "cm";
            style.labelRotation = -dAngle;
            this.addCell(SuperMap.Plot.SymbolType.TEXTSYMBOL, annoPt, style, true, SuperMap.i18n("symbolAlgo_28000_1"));


        }

        if (3 <= geoPts.length) {
            //设置注记
            var annoPt = new SuperMap.Geometry.Point((centerLineLastPt1.x + centerLineLastPt0.x) / 2,
                (centerLineLastPt1.y + centerLineLastPt0.y) / 2);

            var ptLeftEnd = centerLineLastPt0;
            var ptRightStart = centerLineLastPt1;

            var dAngle = SuperMap.Plot.PlottingUtil.radian(ptLeftEnd, ptRightStart) * this.RTOD;
            var dWidth = SuperMap.Plot.PlottingUtil.distance(ptLeftEnd, ptRightStart) * 0.2;

            annoPt = SuperMap.Plot.PlottingUtil.circlePoint(annoPt, dWidth / 4, dWidth / 4, 90);

            var style = {surroundLineFlag: false, fontSize: 15, fontSizeLimit: true};
            style.labelAlign = "cm";
            style.labelRotation = -dAngle;
            this.addCell(SuperMap.Plot.SymbolType.TEXTSYMBOL, annoPt, style, true, SuperMap.i18n("symbolAlgo_28000_2"));
        }

        if (4 <= geoPts.length) {
            var annoPt = new SuperMap.Geometry.Point((centerLineLastPt1.x + centerLineLastPt2.x) / 2,
                (centerLineLastPt1.y + centerLineLastPt2.y) / 2);

            var ptLeftEnd = centerLineLastPt1;
            var ptRightStart = centerLineLastPt2;

            var dAngle = SuperMap.Plot.PlottingUtil.radian(ptLeftEnd, ptRightStart) * this.RTOD;
            var dWidth = SuperMap.Plot.PlottingUtil.distance(ptLeftEnd, ptRightStart) * 0.2;

            annoPt = SuperMap.Plot.PlottingUtil.circlePoint(annoPt, dWidth / 4, dWidth / 4, 90);


            var style = {surroundLineFlag: false, fontSize: 15, fontSizeLimit: true};
            style.labelAlign = "cm";
            style.labelRotation = -dAngle;
            this.addCell(SuperMap.Plot.SymbolType.TEXTSYMBOL, annoPt, style, true, SuperMap.i18n("symbolAlgo_28000_3"));
        }

        //添加比例点
        if (this.isEdit) {
            //计算比例点
            //添加比例点,控制圆的半径
            if (3 > geoPts.length) {
                this.addScalePoint(geoPts[0]);
            }
            else {
                var dRadiusCircle1 = SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[1]) * this.scaleValues[0];
                var ptScale0 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart, dRadiusCircle1, dRadiusCircle1, centerAngle + 180);
                this.addScalePoint(ptScale0, 0);

            }
            //添加比例点,控制圆弧的角度
            var dRadius1 = SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[geoPts.length - 1]);
            var ptScale1 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart, dRadius1, dRadius1, centerAngle + angleScale);
            this.addScalePoint(ptScale1, 1);
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
        if (0 == index) {
            if (3 > geoPts.length) {
                return;
            }

            var pt1 = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
            var pt2 = new SuperMap.Geometry.Point(pt.x, pt.y);

            var dDistance = SuperMap.Plot.PlottingUtil.distance(pt1, pt2);

            var tempPt = new SuperMap.Geometry.Point(geoPts[1].x, geoPts[1].y);
            var dDistanceBase = SuperMap.Plot.PlottingUtil.distance(pt1, tempPt);

            var dScale = dDistance / dDistanceBase;
            if (dScale >= 2.5) {
                return;
            }
            this.scaleValues[0] = dScale;
        } else if (1 == index) {
            var ptStart = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
            var ptEnd = new SuperMap.Geometry.Point(geoPts[geoPts.length - 1].x, geoPts[geoPts.length - 1].y);
            var centerAngle = SuperMap.Plot.PlottingUtil.radian(ptStart, ptEnd);

            var ptTemp = new SuperMap.Geometry.Point(pt.x, pt.y);
            var scaleAngle = SuperMap.Plot.PlottingUtil.radian(ptStart, ptTemp);

            var dScale = scaleAngle - centerAngle;

            dScale = Math.abs(dScale);
            if (dScale > Math.PI / 2 && dScale < Math.PI * 3 / 2) {
                return;
            }

            if (dScale > Math.PI * 3 / 2 && dScale <= 2 * Math.PI) {
                dScale = 2 * Math.PI - dScale;
            }

            this.scaleValues[1] = Math.abs(dScale);
        }
        this.calculateParts();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol28000"
});