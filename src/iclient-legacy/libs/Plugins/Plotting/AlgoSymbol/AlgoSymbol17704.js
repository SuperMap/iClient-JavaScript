/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol17704 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol17703, {
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
        this.maxEditPts = 99999;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geoPts = SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);

        if(geoPts.length < this.minEditPts) {
            return;
        }

        var allDistance = 0;
        for(var i = 0; i < geoPts.length-1; i++){
            allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i],geoPts[i+1]);
        }

        var pts = [];
        this.scalePoints = [];

        if(geoPts.length<3)
        {
            pts.push(new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y));
            pts.push(new SuperMap.Geometry.Point(geoPts[1].x,geoPts[1].y));
        }
        else
        {
            //pts = this.computeBeizer(geoPts,allDistance);
            var beizerPoints = SuperMap.Plot.PlottingUtil.ComputeBeizerPoints(this.isEdit, geoPts, this.scaleValues);
            this.scaleValues = beizerPoints.scaleValues;
            for(var m = 0; m < beizerPoints.scalePoints.length; m++){
                this.addScalePoint(beizerPoints.scalePoints[m]);
            }
            pts = beizerPoints.beizerPoints;
        }

        if(pts.length < 2)
        {
            return;
        }

        var pts2D = [];

        var ddis = allDistance/2;
        var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(pts, ddis);
        if(-1 === result.index){
            return;
        }

        var ptcenter = result.pt;

        var npos;
        if(geoPts.length == 2)
            npos = 0;
        else
            npos = geoPts.length -1;

        var dtextsize;
        if(!this.isEdit)//首次计算不是编辑
        {
            var scaleValue = this.getSubSymbolScaleValue()*0.5;
            dtextsize = scaleValue*allDistance;
            this.scaleValues.push(scaleValue);
        }
        else
        {
            dtextsize = this.scaleValues[4*npos]*allDistance;
        }

        var dleftdis = ddis - dtextsize;
        var dRightdis = ddis + dtextsize;

        var resultLeft = SuperMap.Plot.PlottingUtil.findPointInPolyLine(pts,dleftdis);

        if(-1 === resultLeft.index)
        {
            return;
        }
        var ptleft = resultLeft.pt;

        this.addScalePoint(new SuperMap.Geometry.Point(ptleft.x,ptleft.y));

        //线的前半部分
        var ptsLeft = [];
        if(resultLeft.index == 0)
        {
            ptsLeft.push(pts[0]);
        }
        else
        {
            for(var i = 0; i < resultLeft.index; i++)
            {
                ptsLeft.push(pts[i]);
            }
        }
        ptsLeft.push(ptleft);

        var resultRight = SuperMap.Plot.PlottingUtil.findPointInPolyLine(pts,dRightdis);
        if(-1 === resultRight.index)
        {
            return;
        }
        var ptRight = resultRight.pt;

        //线的后半部分
        var ptsRight = [];
        ptsRight.push(ptRight);
        for(var i = (resultRight.index+1); i < pts.length; i++)
        {
            ptsRight.push(pts[i]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsLeft);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, ptsRight);

        var ptLeftEnd = ptsLeft[ptsLeft.length-1];
        var ptRightStart = ptsRight[0];

        var dAngle = SuperMap.Plot.PlottingUtil.radian(ptLeftEnd, ptRightStart)*180/Math.PI;
        var dWidth = SuperMap.Plot.PlottingUtil.distance(ptLeftEnd, ptRightStart);

        var textPt = new SuperMap.Geometry.Point((ptLeftEnd.x+ptRightStart.x)/2,(ptLeftEnd.y+ptRightStart.y)/2);

        var textContent = SuperMap.i18n("symbolAlgo_17704");
        var style = {surroundLineFlag: false, fontSize: 15, fontSizeLimit:true};
        style.labelAlign = "cm";
        style.labelRotation = -dAngle;
        this.addCell(SuperMap.Plot.SymbolType.TEXTSYMBOL, [textPt], style,true, textContent);

        this.clearBounds();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol17704"
});
