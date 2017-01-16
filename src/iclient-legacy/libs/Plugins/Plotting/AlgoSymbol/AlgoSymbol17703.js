/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol17703 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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

        var textContent = SuperMap.i18n("symbolAlgo_17703");
        var style = {surroundLineFlag: false, fontSize: 15, fontSizeLimit:true};
        style.labelAlign = "cm";
        style.labelRotation = -dAngle;
        this.addCell(SuperMap.Plot.SymbolType.TEXTSYMBOL, [textPt], style,true, textContent);


        this.clearBounds();
    },

    computeBeizer: function(geoPts, allDistance){
        var pts = [];
        this.scalePoints = [];

        if(!this.isEdit)//首次计算不是编辑
        {
            this.scaleValues = [];

            //生成控制点
            var ptsControl = [];
            ptsControl = SuperMap.Plot.PlottingUtil.getBeizerCtrlPt(geoPts);

            if(ptsControl.length < 3)
            {
                return pts;
            }

            //根据控制点计算比例值
            //第一个点就2个比例值
            var ddisx = ptsControl[2].x - ptsControl[0].x;
            var ddisy = ptsControl[2].y - ptsControl[0].y;
            var dscalex = ddisx/allDistance;
            var dscaley = ddisy/allDistance;
            this.scaleValues.push(dscalex);
            this.scaleValues.push(dscaley);

            this.addScalePoint(new SuperMap.Geometry.Point(ptsControl[2].x,ptsControl[2].y));

            for(var i = 1; i < geoPts.length-1; i++)
            {
                var ddisx = ptsControl[i*3+1].x - ptsControl[i*3].x;
                var ddisy = ptsControl[i*3+1].y - ptsControl[i*3].y;
                var dscalex = ddisx/allDistance;
                var dscaley = ddisy/allDistance;
                this.scaleValues.push(dscalex);
                this.scaleValues.push(dscaley);

                this.addScalePoint(new SuperMap.Geometry.Point(ptsControl[i*3+1].x,ptsControl[i*3+1].y));

                var ddisx2 = ptsControl[i*3+2].x - ptsControl[i*3].x;
                var ddisy2 = ptsControl[i*3+2].y - ptsControl[i*3].y;
                var dscalex2 = ddisx2/allDistance;
                var dscaley2 = ddisy2/allDistance;
                this.scaleValues.push(dscalex2);
                this.scaleValues.push(dscaley2);

                this.addScalePoint(new SuperMap.Geometry.Point(ptsControl[i*3+2].x,ptsControl[i*3+2].y));
            }

            ddisx = ptsControl[(geoPts.length-1)*3+1].x - ptsControl[(geoPts.length-1)*3].x;
            ddisy = ptsControl[(geoPts.length-1)*3+1].y - ptsControl[(geoPts.length-1)*3].y;
            dscalex = ddisx/allDistance;
            dscaley = ddisy/allDistance;
            this.scaleValues.push(dscalex);
            this.scaleValues.push(dscaley);

            this.addScalePoint(new SuperMap.Geometry.Point(ptsControl[(geoPts.length-1)*3+1].x,ptsControl[(geoPts.length-1)*3+1].y));

            pts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsWithCtrlPt(ptsControl);
        }
        else
        {
            var ptsControl = [];
            ptsControl.push(new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y));
            ptsControl.push(new SuperMap.Geometry.Point(geoPts[0].x,geoPts[0].y));
            var dScalex = this.scaleValues[0];
            var dScaley = this.scaleValues[1];
            var dx = geoPts[0].x + allDistance*dScalex;
            var dy = geoPts[0].y + allDistance*dScaley;
            ptsControl.push(new SuperMap.Geometry.Point(dx,dy));

            this.addScalePoint(new SuperMap.Geometry.Point(dx,dy));

            for(var i = 1; i < geoPts.length - 1; i++)
            {
                ptsControl.push(new SuperMap.Geometry.Point(geoPts[i].x,geoPts[i].y));

                var dScalex = this.scaleValues[4*i-2];
                var dScaley = this.scaleValues[4*i-1];
                var dx = geoPts[i].x + allDistance*dScalex;
                var dy = geoPts[i].y + allDistance*dScaley;
                ptsControl.push(new SuperMap.Geometry.Point(dx,dy));

                this.addScalePoint(new SuperMap.Geometry.Point(dx,dy));

                dScalex = this.scaleValues[4*i];
                dScaley = this.scaleValues[4*i+1];
                dx = geoPts[i].x + allDistance*dScalex;
                dy = geoPts[i].y + allDistance*dScaley;
                ptsControl.push(new SuperMap.Geometry.Point(dx,dy));

                this.addScalePoint(new SuperMap.Geometry.Point(dx,dy));
            }

            var npos = geoPts.length-1;
            ptsControl.push(new SuperMap.Geometry.Point(geoPts[npos].x,geoPts[npos].y));
            dScalex = this.scaleValues[4*npos-2];
            dScaley = this.scaleValues[4*npos-1];
            dx = geoPts[npos].x + allDistance*dScalex;
            dy = geoPts[npos].y + allDistance*dScaley;
            ptsControl.push(new SuperMap.Geometry.Point(dx,dy));
            this.addScalePoint(new SuperMap.Geometry.Point(dx,dy));
            ptsControl.push(new SuperMap.Geometry.Point(geoPts[npos].x,geoPts[npos].y));

            pts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsWithCtrlPt(ptsControl);
        }

        return pts;
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

            //获取位置点
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

            if(index < 0 || index > (2*geoPts.length-2))
            {
                return;
            }

            var allDistance = 0;
            for(var i = 0; i < geoPts.length-1; i++){
                allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i],geoPts[i+1]);
            }

            if(2*(geoPts.length-1) == index ||geoPts.length == 2)
            {
                var shapePts = this.computeBeizer(geoPts, allDistance);
                var curvePtsLen = 0;
                for(var i = 0; i < shapePts.length-1; i++){
                    curvePtsLen += SuperMap.Plot.PlottingUtil.distance(shapePts[i],shapePts[i+1]);
                }

                var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(shapePts,curvePtsLen/2);
                if(-1 === result.index)
                {
                    return;
                }

                var dLength = SuperMap.Plot.PlottingUtil.distance(pt,result.pt);
                var dScale = dLength/allDistance;

                if(geoPts.length == 2)
                    this.scaleValues[0] = dScale;
                else
                    this.scaleValues[2*index] = dScale;
            }
            else
            {
                var npos = -1;
                if(index % 2 == 0)//偶数比例点
                {
                    npos = index/2;
                }
                else//奇数比例点
                {
                    npos = (index+1)/2;
                }

                var dx = pt.x - geoPts[npos].x;
                var dy = pt.y - geoPts[npos].y;

                var dscalex = dx/allDistance;
                var dscaley = dy/allDistance;

                this.scaleValues[2*index] = dscalex;
                this.scaleValues[2*index+1] = dscaley;
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol17703"
});
