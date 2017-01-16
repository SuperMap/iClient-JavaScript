/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol25301 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
    SCALE       :0.3,
    DISTANCE    :0.00025,
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

        this.scaleValues.push(0.068);

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 300));
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 6200));
        }

    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        if (geoPts.length < this.minEditPts) {
            return;
        }

        if(this.scaleValues.length == 0){
            this.scaleValues.push(0.068);
        }

        if(this.subSymbols.length == 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 300));
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 6200));
        }

        var allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
        var dScale = this.scaleValues[0];
        var dLineSpan = dScale * allDistance;

        var leftPts = SuperMap.Plot.PlottingUtil.paraLine(geoPts, dLineSpan, true);
        var rightPts = SuperMap.Plot.PlottingUtil.paraLine(geoPts, dLineSpan, false);

        //***********************************画下半支平行贝赛尔****************************
        var ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(allDistance / 2, rightPts);
        if(!ptsindex.bfind){
            return;
        }
        var midPt = ptsindex.pts.clone();
        var index = ptsindex.index;

        dScale = this.scaleValues[0];
        var dDistance = dScale * allDistance;

        //计算左侧贝赛尔曲线的前部分
        var pts2DLeft = [];
        pts2DLeft.push(midPt);
        for(var i = index; i >= 0; i--){
            pts2DLeft.push(rightPts[i]);
        }

        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistance, pts2DLeft);
        if(!ptsindex.bfind){
            return;
        }
        var nIndexLeft = ptsindex.index;
        var ptLeft = ptsindex.pts.clone();

        var pts2D = [];
        pts2D.push(ptLeft);
        for(var i = nIndexLeft + 1; i < pts2DLeft.length; i++){
            pts2D.push(pts2DLeft[i].clone());
        }

        var style = {surroundLineFlag: false,fillLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D, style);

        //计算贝赛尔曲线的后部分
        var pts2DRight = [];
        pts2DRight.push(midPt);
        for(var i = index + 1; i < rightPts.length; i++){
            pts2DRight.push(rightPts[i]);
        }

        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistance, pts2DRight);
        if(!ptsindex.bfind){
            return;
        }
        var nIndexRight = ptsindex.index;
        var ptRight = ptsindex.pts.clone();

        pts2D = [];
        pts2D.push(ptRight);
        for(var i = nIndexRight + 1; i < pts2DRight.length; i++){
            pts2D.push(pts2DRight[i].clone());
        }

        var style = {surroundLineFlag: false,fillLimit:true ,fillColorLimit:false};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D, style);

        //计算中间符号的角度
        var subSymAngle = SuperMap.Plot.PlottingUtil.radian(ptLeft, ptRight) * this.RTOD;

        //计算中间符号的中心点
        var subCenterPt = new SuperMap.Geometry.Point((ptLeft.x+ptRight.x)/2,(ptLeft.y+ptRight.y)/2);

        if(this.subSymbols.length > 0){
            this.computeSubSymbol(this.subSymbols[0], subCenterPt, dDistance, subSymAngle+90);
        }

        //***********************************画上半支平行贝赛尔****************************
        allDistance = SuperMap.Plot.PlottingUtil.polylineDistance(leftPts);
        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(allDistance/2, leftPts);
        if(!ptsindex.bfind){
            return;
        }
        var index_up = ptsindex.index;
        var midPt_up = ptsindex.pts.clone();

        //贝赛尔曲线的前部分
        var pts2DLeft_up = [];
        pts2DLeft_up.push(midPt_up);
        for(var i = index_up; i >= 0; i--){
            pts2DLeft_up.push(leftPts[i]);
        }

        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistance, pts2DLeft_up);
        if(!ptsindex.bfind){
            return;
        }
        var nIndexLeft_up = ptsindex.index;
        var ptLeft_up = ptsindex.pts.clone();

        var pts2D_up = [];
        pts2D_up.push(ptLeft_up);
        for(var i = nIndexLeft_up+1; i < pts2DLeft_up.length; i++){
            pts2D_up.push(pts2DLeft_up[i]);
        }

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D_up);

        //计算贝赛尔曲线右侧的部分
        var pts2DRight_up = [];
        pts2DRight_up.push(midPt_up);
        for(var i = index_up+1; i < leftPts.length; i++)
        {
            pts2DRight_up.push(leftPts[i]);
        }

        ptsindex = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dDistance, pts2DRight_up);
        if(!ptsindex.bfind){
            return;
        }
        var nIndexRight_up = ptsindex.index;
        var ptRight_up = ptsindex.pts.clone();


        pts2D_up = [];
        pts2D_up.push(ptRight_up);
        for(var i = nIndexRight_up+1; i < pts2DRight_up.length; i++)
        {
            pts2D_up.push(pts2DRight_up[i]);
        }

        style = {surroundLineFlag: false,fillLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D_up, style);

        //计算中间符号的角度
        var subSymAngle_up = SuperMap.Plot.PlottingUtil.radian(ptLeft_up, ptRight_up) * this.RTOD;
        //计算中间符号的中心点
        var subCenterPt_up = new SuperMap.Geometry.Point((ptLeft_up.x+ptRight_up.x)/2,(ptLeft_up.y+ptRight_up.y)/2);

        if(this.subSymbols.length > 1){
            this.computeSubSymbol(this.subSymbols[1], subCenterPt_up, dDistance * 0.5, subSymAngle_up);
        }

        //**********************************画两端的折线**********************************
        var ptStart1 =  SuperMap.Plot.PlottingUtil.LinePnt(pts2DLeft[pts2DLeft.length - 1], pts2DLeft_up[pts2DLeft_up.length - 1], dLineSpan * 3);
        var ptStart2 = SuperMap.Plot.PlottingUtil.LinePnt(pts2DLeft_up[pts2DLeft_up.length - 1], pts2DLeft[pts2DLeft.length - 1],dLineSpan * 3);

        pts2D_up = [];
        pts2D_up.push(ptStart1);
        pts2D_up.push(ptStart2);

        style = {surroundLineFlag: false,fillLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D_up, style);

        var ptEnd1 =  SuperMap.Plot.PlottingUtil.LinePnt(pts2DRight[pts2DRight.length - 1], pts2DRight_up[pts2DRight_up.length - 1], dLineSpan * 3);
        var ptEnd2 = SuperMap.Plot.PlottingUtil.LinePnt(pts2DRight_up[pts2DRight_up.length - 1], pts2DRight[pts2DRight.length - 1],dLineSpan * 3);

        pts2D_up = [];
        pts2D_up.push(ptEnd1);
        pts2D_up.push(ptEnd2);

        style = {surroundLineFlag: false,fillLimit:true};
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL,pts2D_up, style);

        this.scalePoints = [];
        this.addScalePoint(ptStart1.clone());
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

            if(0 != index)
            {
                return;
            }

            var geoPts = this.controlPoints;

            if (2 > geoPts.length)
            {
                return;
            }

            var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            var dDistance = SuperMap.Plot.PlottingUtil.distance(pt, geoPts[0]);

            var dScaleValue = dDistance/dAllDistance/2.0;
            this.scaleValues[0] = dScaleValue;
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol25300"
});
