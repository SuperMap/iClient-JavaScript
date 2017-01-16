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
SuperMap.Geometry.AlgoSymbol35304 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {

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
        this.scaleValues[0] = 0.05;
        this.scaleValues[1] = 0.0;

        if (this.subSymbols.length >= 0) {
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 35301));
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
            this.scaleValues[0] = 0.05;
            this.scaleValues[1] = 0.0;
        }

        if(!this.isEdit){
            this.scaleValues[0] = this.getSubSymbolScaleValue();
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        var dScale0 = this.scaleValues[0];
        var dSymbolSize = dAllDistance*dScale0;

        var pts2D = [], i;
        for(i = 0; i < geoPts.length; i++)
        {
            pts2D.push(geoPts[i]);
        }
        pts2D.push(pts2D[0]);//首尾闭合
        for(i = 0; i < pts2D.length-1; i++)
        {
            var ptStart = pts2D[i];
            var ptEnd   = pts2D[i+1];

            var dAngle = SuperMap.Plot.PlottingUtil.radian(ptStart, ptEnd)*this.RTOD;
            dAngle += 90;
            var dTempRadius = dSymbolSize * 0.5;
            var pt1 = SuperMap.Plot.PlottingUtil.circlePoint(ptStart,dTempRadius,dTempRadius,dAngle);
            var pt2 = SuperMap.Plot.PlottingUtil.circlePoint(ptEnd  ,dTempRadius,dTempRadius,dAngle);

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,[pt1,pt2]);
        }

        this.scalePoints = [];
        var scalePt1 = SuperMap.Plot.PlottingUtil.circlePoint(geoPts[0],1.2*dSymbolSize,1.2*dSymbolSize,270);
        this.addScalePoint(scalePt1);

        //添加子符号
        for(i = 0; i < geoPts.length; i++)
        {
            var symbolPt = pts2D[i];

            if (2*(i+1) >= this.scaleValues.length)
            {
                this.scaleValues.push(0.0);
            }
            var dSymbolScale0 = this.scaleValues[2*(i+1)];

            if (2*(i+1)+1 >= this.scaleValues.length)
            {
                this.scaleValues.push(1.0);
            }
            var dSymbolScale1 = this.scaleValues[2*(i+1)+1];

            var dSymbolAngle = dSymbolScale0;
            var nIndex = Math.floor(dSymbolScale1);

            if(0 > nIndex || nIndex > 7)
            {
                continue;
            }

            var nCode = this.GetCodeByScaleValue(dSymbolScale1);

            if(this.subSymbols.length == 0){
                this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, nCode));
            }

            if(this.subSymbols.length >= 0){
                this.computeSubSymbol(this.subSymbols[0],symbolPt, dSymbolSize, dSymbolAngle);
            }

            var scalePt = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt,1.5*dSymbolSize,1.5*dSymbolSize,dSymbolAngle+90);
            this.addScalePoint(scalePt);
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
    modifyPoint: function(index, pt) {
        if(pt.isScalePoint === true){
            if(index < 0 || index > this.scalePoints.length) {
                return;
            }

            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            if (2 > geoPts.length) {
                return;
            }

            if(0 == index)
            {
                var pts2D = [];
                for(var i = 0; i < geoPts.length; i++)
                {
                    pts2D.push(geoPts[i]);
                }
                var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(pts2D);
                var dDistance = SuperMap.Plot.PlottingUtil.distance(pts2D[0],pt)/1.2;
                this.scaleValues[0] = dDistance/dAllDistance;
            }
            else
            {
                var temppt = geoPts[index-1];
                var dAngle = SuperMap.Plot.PlottingUtil.radian(temppt,pt)*this.RTOD;
                dAngle -= 90.0;
                if(0 > dAngle)
                {
                    dAngle += 360.0;
                }
                this.scaleValues[index*2] = dAngle;
            }
        }

        this.calculateParts();
    },

    GetCodeByScaleValue: function (nScaleValue) {
        switch(Math.floor(nScaleValue))
        {
            case 0:
                return 35300;
            case 1:
                return 35301;
            case 2:
                return 35302;
            case 3:
                return 35303;
            case 4:
                return 35400;
            case 5:
                return 35401;
            case 6:
                return 35402;
            case 7:
                return 35403;
            default:
                return -1;
        }
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol35304"
});

