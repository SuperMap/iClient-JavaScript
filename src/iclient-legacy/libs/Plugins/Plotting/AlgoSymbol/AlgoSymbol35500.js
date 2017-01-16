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
SuperMap.Geometry.AlgoSymbol35500= new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    DISSCALE: 0.1,
    RECTDIS:  0.2,
    WINGDIS:  1.2,

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

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        var ptStart = geoPts[0];
        var ptEnd = geoPts[1];
        var dAllDistance = SuperMap.Plot.PlottingUtil.distance(ptStart,ptEnd);

        var ddis = dAllDistance * this.DISSCALE;

        //创建主体直线
        //获得直线的中心点
        var ptCenter = SuperMap.Plot.PlottingUtil.LinePnt(ptStart,ptEnd,0.5*dAllDistance);
        //求两个断点
        var ptLeft = SuperMap.Plot.PlottingUtil.LinePnt(ptCenter,ptStart,ddis);
        var ptRight = SuperMap.Plot.PlottingUtil.LinePnt(ptCenter,ptEnd,ddis);

        var ptsLeft = [],ptsRight = [];
        ptsLeft.push(geoPts[0]);
        ptsLeft.push(ptLeft);

        ptsRight.push(ptRight);
        ptsRight.push(geoPts[1]);

        //计算平行线
        var ptsUpLeftPara = SuperMap.Plot.PlottingUtil.paraLine(ptsLeft,ddis*0.5,true);
        var ptsUpRightPara = SuperMap.Plot.PlottingUtil.paraLine(ptsRight,ddis*0.5,true);

        var UpLeftLinearray = [],UpRightLinetarray = [];
        UpLeftLinearray.push(ptsUpLeftPara[0]);
        UpLeftLinearray.push(ptsUpLeftPara[1]);

        UpRightLinetarray.push(ptsUpRightPara[0]);
        UpRightLinetarray.push(ptsUpRightPara[1]);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,UpLeftLinearray,{lineColorLimit:true,lineColor:0xFF000000});
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,UpRightLinetarray,{lineColorLimit:true,lineColor:0xFF000000});

        var DownLeftLinearray = [],DownRightLinearray = [];
        var ptsDownLeftPara = SuperMap.Plot.PlottingUtil.paraLine(ptsLeft,ddis*0.5,false);
        var ptsDownRightPara = SuperMap.Plot.PlottingUtil.paraLine(ptsRight,ddis*0.5,false);

        DownLeftLinearray.push(ptsDownLeftPara[0]);
        DownLeftLinearray.push(ptsDownLeftPara[1]);

        DownRightLinearray.push(ptsDownRightPara[0]);
        DownRightLinearray.push(ptsDownRightPara[1]);

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,DownLeftLinearray,{lineColorLimit:true,lineColor:0xFF000000});
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,DownRightLinearray,{lineColorLimit:true,lineColor:0xFF000000});

        //求矩形
        var ptRectLeftUp    = SuperMap.Plot.PlottingUtil.LinePnt(UpLeftLinearray[1],UpRightLinetarray[0],ddis*this.RECTDIS);
        var ptRectRightUp   = SuperMap.Plot.PlottingUtil.LinePnt(UpRightLinetarray[0],UpLeftLinearray[1],ddis*this.RECTDIS);
        var ptRectLeftDown  = SuperMap.Plot.PlottingUtil.LinePnt(DownLeftLinearray[1],DownRightLinearray[0],ddis*this.RECTDIS);
        var ptRectRightDown = SuperMap.Plot.PlottingUtil.LinePnt(DownRightLinearray[0],DownLeftLinearray[1],ddis*this.RECTDIS);

        var arrayRect = [];
        arrayRect.push(ptRectLeftUp);
        arrayRect.push(ptRectRightUp);
        arrayRect.push(ptRectRightDown);
        arrayRect.push(ptRectLeftDown);

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,arrayRect,{fillLimit:true,fillStyle:0});

        //画头上的那两根突出的线头
        var ptLeftLineStart = SuperMap.Plot.PlottingUtil.LinePnt(ptRectLeftDown,ptRectLeftUp,ddis*this.WINGDIS);
        var ptLeftLineEnd = SuperMap.Plot.PlottingUtil.LinePnt(ptRectLeftUp,ptRectLeftDown,ddis*this.WINGDIS);
        var ptsLeftLine = [];
        ptsLeftLine.push(ptLeftLineStart);
        ptsLeftLine.push(ptLeftLineEnd);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,ptsLeftLine);

        var ptRightLineStart = SuperMap.Plot.PlottingUtil.LinePnt(ptRectRightDown,ptRectRightUp,ddis*this.WINGDIS);
        var ptRightLineEnd = SuperMap.Plot.PlottingUtil.LinePnt(ptRectRightUp,ptRectRightDown,ddis*this.WINGDIS);
        var ptsRightLine = [];
        ptsRightLine.push(ptRightLineStart);
        ptsRightLine.push(ptRightLineEnd);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,ptsRightLine);
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol35500"
});

