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
SuperMap.Geometry.AlgoSymbol20301 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        this.scaleValues.push(0.2);
        this.scaleValues.push(0.0);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var geoPts = this.controlPoints;

        if (this.controlPoints <2)
        {
            return;
        }

        if (this.scaleValues.length !== 2)
        {
            this.scaleValues = [];
            this.scaleValues.push(0.2);
            this.scaleValues.push(0.0);
        }
        this.components = [];

        //var geoLine = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.POLYLINESYMBOL, this.controlPoints);
        //geoLine.style = {surroundLineFlag: false};
        //this.components.push(geoLine);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, this.controlPoints);

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

        var ptStart = new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y);
        var ptEnd = new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y);
        var angle = SuperMap.Plot.PlottingUtil.radian(ptStart,ptEnd)*180/Math.PI;
        var midPt = new SuperMap.Geometry.Point((ptStart.x+ptEnd.x)/2,(ptStart.y+ptEnd.y)/2);

        var dScale0 = this.scaleValues[0];
        var  dScale1 = this.scaleValues[1];

        var dDistance = dScale0*allDistance;
        var pt1;


        if(0.0 == dScale1)
        {
            pt1=  SuperMap.Plot.PlottingUtil.circlePoint(midPt, dDistance,dDistance,angle + 90);
        }
        else
        {
            pt1= SuperMap.Plot.PlottingUtil.circlePoint(midPt, dDistance,dDistance,angle + 270);
        }

        var style = {surroundLineFlag: false,fillLimit:true,fillColorLimit:false,fillStyle:0};

        //var Line = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [midPt,pt1]);
        //Line.style = {surroundLineFlag: false};
        //this.components.push(Line);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, [midPt,pt1]);

        //创建圆的点
        var dRadius = SuperMap.Plot.PlottingUtil.distance(geoPts[0], geoPts[geoPts.length-1])*0.02;
        var leftCirclePt = new SuperMap.Geometry.Point((ptStart.x+midPt.x)/2,(ptStart.y+midPt.y)/2);
        var onCirclePt = new SuperMap.Geometry.Point(leftCirclePt.x,leftCirclePt.y+dRadius);
        var ptscircle = [leftCirclePt,onCirclePt];
        //var circleLeft = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.CIRCLESYMBOL, ptscircle);
        //circleLeft.style = {surroundLineFlag: false,fillLimit:true,fillColor: geoLine.style.strokeColor ,lineTypeLimit:true,fill:true};
        //this.components.push(circleLeft);
        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, ptscircle, style, true);

        var  rightCirclePt = new SuperMap.Geometry.Point((ptEnd.x+midPt.x)/2,(ptEnd.y+midPt.y)/2);
        var onCirclePt1 = new SuperMap.Geometry.Point(rightCirclePt.x,rightCirclePt.y+dRadius);
        ptscircle = [rightCirclePt,onCirclePt1];
        //var circleRight = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.CIRCLESYMBOL, ptscircle);
        //circleRight.style = {surroundLineFlag: false,fillLimit:true,fillColor: geoLine.style.strokeColor ,lineTypeLimit:true,fill:true};
        //this.components.push(circleRight);
        this.addCell(SuperMap.Plot.SymbolType.CIRCLESYMBOL, ptscircle, style, true);

        var scalePoint = new SuperMap.Geometry.Point(pt1.x,pt1.y);
        scalePoint.isScalePoint = true;
        scalePoint.tag = 0;
        this.scalePoints.push(scalePoint);

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
        if(pt.isScalePoint === true){
            if(this.scalePoints.length <= index)
                return;

            if(0 !== index)
            {
                return;
            }

            var geoPts = this.controlPoints;

            if (2 > geoPts.length)
            {
                return;
            }


            var ptStart = new SuperMap.Geometry.Point(geoPts[0].x, geoPts[0].y);
            var ptEnd = new SuperMap.Geometry.Point(geoPts[1].x, geoPts[1].y);


            var dDistance = SuperMap.Plot.PlottingUtil.distance(ptStart, ptEnd);
            if (0 === dDistance) {
                return;
            }
            var ptMid = new SuperMap.Geometry.Point((ptStart.x + ptEnd.x) / 2, (ptStart.y + ptEnd.y) / 2);
            if (0 === index) {

                var dScaleDis = SuperMap.Plot.PlottingUtil.distance(pt, ptMid);

                var dScale0 = dScaleDis / dDistance;

                this.scaleValues[0]= dScale0;

                if (SuperMap.Plot.PlottingUtil.PointIsRightToLine(ptStart, ptEnd, pt))
                {
                    this.scaleValues[1]= 1.0;
                }
                else
                {
                    this.scaleValues[1]= 0.0;
                }
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol20301"
});
