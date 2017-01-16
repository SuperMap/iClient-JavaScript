/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol29401 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {


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
        this.maxEditPts = 2;
        this.scaleValues = [];
        this.scaleValues.push(0.1);

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

        //左边的平行线
        var paraPntsLeft = SuperMap.Plot.PlottingUtil.paraLine(geoPts,dDistance,true);
        var paraPntsRight = SuperMap.Plot.PlottingUtil.paraLine(geoPts,dDistance,false);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,paraPntsLeft);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,paraPntsRight);
        
        var ptStart = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
        var ptEnd = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);
        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd)*180 / Math.PI;

        //计算左边的符号
        //圆
        var leftCenter = ptStart;
        var circlePt = paraPntsLeft[0];

        var pts2D = [];
        pts2D.push(leftCenter);
        pts2D.push(circlePt);

        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL,pts2D);

        //竖线－中
        var pt1_1 = new SuperMap.Geometry.Point(0, 0.8*dDistance);
        var pt1_2 = new SuperMap.Geometry.Point(0,-0.8*dDistance);

        var tempPt1_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(leftCenter,pt1_1,angle);
        var tempPt1_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(leftCenter,pt1_2,angle);

        pts2D = [];
        pts2D.push(tempPt1_1);
        pts2D.push(tempPt1_2);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);
    
        //竖线－左
        var pt1_3 = new SuperMap.Geometry.Point(-0.3*dDistance, 0.4*dDistance);
        var pt1_4 = new SuperMap.Geometry.Point(-0.3*dDistance,-0.4*dDistance);

        var tempPt1_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(leftCenter,pt1_3,angle);
        var tempPt1_4 = SuperMap.Plot.PlottingUtil.coordinateTrans(leftCenter,pt1_4,angle);

        pts2D = [];
        pts2D.push(tempPt1_3);
        pts2D.push(tempPt1_4);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //竖线－右
        var pt1_5 = new SuperMap.Geometry.Point(0.3*dDistance, 0.4*dDistance);
        var pt1_6 = new SuperMap.Geometry.Point(0.3*dDistance,-0.4*dDistance);

        var tempPt1_5 = SuperMap.Plot.PlottingUtil.coordinateTrans(leftCenter,pt1_5,angle);
        var tempPt1_6 = SuperMap.Plot.PlottingUtil.coordinateTrans(leftCenter,pt1_6,angle);

        pts2D = [];
        pts2D.push(tempPt1_5);
        pts2D.push(tempPt1_6);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //计算中间的符号
        //圆
        var midCenter = new SuperMap.Geometry.Point((ptStart.x+ptEnd.x)/2,(ptStart.y+ptEnd.y)/2);
        var midCirclePt = new SuperMap.Geometry.Point((paraPntsLeft[0].x+paraPntsLeft[paraPntsLeft.length-1].x)/2,(paraPntsLeft[paraPntsLeft.length-1].y+paraPntsLeft[0].y)/2);

        pts2D = [];
        pts2D.push(midCenter);
        pts2D.push(midCirclePt);

        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL,pts2D);

        //竖线－中
        var tempPt2_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(midCenter,pt1_1,angle);
        var tempPt2_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(midCenter,pt1_2,angle);

        pts2D = [];
        pts2D.push(tempPt2_1);
        pts2D.push(tempPt2_2);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //竖线－左
        var tempPt2_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(midCenter,pt1_3,angle);
        var tempPt2_4 = SuperMap.Plot.PlottingUtil.coordinateTrans(midCenter,pt1_4,angle);

        pts2D = [];
        pts2D.push(tempPt2_3);
        pts2D.push(tempPt2_4);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //竖线－右
        var tempPt2_5 = SuperMap.Plot.PlottingUtil.coordinateTrans(midCenter,pt1_5,angle);
        var tempPt2_6 = SuperMap.Plot.PlottingUtil.coordinateTrans(midCenter,pt1_6,angle);

        pts2D = [];
        pts2D.push(tempPt2_5);
        pts2D.push(tempPt2_6);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //计算右边的符号
        //圆
        var rightCenter = ptEnd;
        var rightCirclePt = paraPntsLeft[paraPntsLeft.length-1];

        pts2D = [];
        pts2D.push(rightCenter);
        pts2D.push(rightCirclePt);

        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL,pts2D);

        //竖线－中
        var tempPt3_1 = SuperMap.Plot.PlottingUtil.coordinateTrans(rightCenter,pt1_1,angle);
        var tempPt3_2 = SuperMap.Plot.PlottingUtil.coordinateTrans(rightCenter,pt1_2,angle);

        pts2D = [];
        pts2D.push(tempPt3_1);
        pts2D.push(tempPt3_2);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //竖线－左
        var tempPt3_3 = SuperMap.Plot.PlottingUtil.coordinateTrans(rightCenter,pt1_3,angle);
        var tempPt3_4 = SuperMap.Plot.PlottingUtil.coordinateTrans(rightCenter,pt1_4,angle);

        pts2D = [];
        pts2D.push(tempPt3_3);
        pts2D.push(tempPt3_4);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        //竖线－右
        var tempPt3_5 = SuperMap.Plot.PlottingUtil.coordinateTrans(rightCenter,pt1_5,angle);
        var tempPt3_6 = SuperMap.Plot.PlottingUtil.coordinateTrans(rightCenter,pt1_6,angle);

        pts2D = [];
        pts2D.push(tempPt3_5);
        pts2D.push(tempPt3_6);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D);

        if(this.isEdit){
            this.addScalePoint(paraPntsLeft[0],0)
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
    modifyPoint: function(index, pt) {

      if(index === 0){
          var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
          geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
          if (geoPts.length < 2) {
              return;
          }

          var allDistance = 0;
          for (var i = 0; i < geoPts.length - 1; i++) {
              allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i + 1]);
          }
          var startPt2D = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
          var scalePt2D = new SuperMap.Geometry.Point(pt.x, pt.y);
          var dDistance = SuperMap.Plot.PlottingUtil.distance(startPt2D, scalePt2D);

          var dScale = dDistance / allDistance;
          this.scaleValues[0] = dScale;
      }
        this.calculateParts();
    },

    CLASS_NAME: "SuperMap.Geometry.AlgoSymbol29401"
});