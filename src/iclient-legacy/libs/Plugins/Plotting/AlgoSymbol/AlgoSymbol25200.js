/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol25200 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol1004,{
    /**
     * ructor: SuperMap.Geometry.AlgoSymbol
     * 创建一个线面标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Geometry.AlgoSymbol>} 新的标绘对象。
     */
    initialize:function(option){
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.symbolType = SuperMap.Plot.SymbolType.ALGOSYMBOL;

        this.minEditPts = 3;
        this.maxEditPts = 512;

        this.scalePoints = [];
        this.scaleValues = [];
        this.scaleValues.push(0.05);
        this.scaleValues.push(0.148);
        this.scaleValues.push(0.4);
        this.scaleValues.push(0.312);
        this.scaleValues.push(0.2);
        this.scaleValues.push(0.01);

        //if(null === this.subSymbols){
        //    this.subSymbols = [];
        //    this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 4602));
        //}
        //else if(0 === this.subSymbols.length){
        //    this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 4602));
        //}

        this.subSymbols = [];
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints.length >= 2 && this.controlPoints.length < this.minEditPts){
            this.calAssistantLine();
        }

        if(this.controlPoints.length < 3){
            return;
        }

        if(this.scaleValues.length < 6){
            this.scaleValues = [];
            this.scaleValues.push(0.05);
            this.scaleValues.push(0.148);
            this.scaleValues.push(0.4);
            this.scaleValues.push(0.312);
            this.scaleValues.push(0.2);
            this.scaleValues.push(0.01);
        }

        SuperMap.Geometry.AlgoSymbol1004.prototype.calculateParts.apply(this, arguments);

        var midAxis = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        var midPt = new SuperMap.Geometry.Point((midAxis[0].x+midAxis[1].x)/2,(midAxis[0].y+midAxis[1].y)/2);
        midAxis.splice(0,2);
        midAxis.unshift(midPt);

        if(this.subSymbols.length > 0){
            var symbolLength = this.subSymbols[0].symbolData.symbolSize.y;

            var dDisMidAxis  = SuperMap.Plot.PlottingUtil.polylineDistance(midAxis);

            if(!this.isEdit){
                var size = this.getDefaultSubSymbolSize()*1.5;
                this.scaleValues[4] = size/dDisMidAxis;
                this.scaleValues[5] = size/dDisMidAxis*0.05;
            }

            var dStartLength = dDisMidAxis * this.scaleValues[4];
            var dEndLength = dDisMidAxis * this.scaleValues[5];

            var ptsindex2 = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dStartLength, midAxis);
            var ptsindex3 = SuperMap.Plot.PlottingUtil.getPtsIndexByDistance(dEndLength, midAxis);

            var dAngle = SuperMap.Plot.PlottingUtil.radian(ptsindex3.pts, ptsindex2.pts) * this.RTOD + 270;
            var symbolScale = SuperMap.Plot.PlottingUtil.distance(ptsindex2.pts, ptsindex3.pts) * 100 / symbolLength;
            var centerPoint = new SuperMap.Geometry.Point((ptsindex3.pts.x+ptsindex2.pts.x)/2, (ptsindex2.pts.y+ptsindex3.pts.y)/2);

            this.computeSubSymbol(this.subSymbols[0], centerPoint, symbolScale, dAngle);

            //添加比例点
            ptsindex2.pts.isScalePoint = true;
            ptsindex2.pts.tag = this.scalePoints.length;
            this.scalePoints.push(ptsindex2.pts.clone());
            ptsindex3.pts.isScalePoint = true;
            ptsindex3.pts.tag = this.scalePoints.length;
            this.scalePoints.push(ptsindex3.pts.clone());
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
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            var nCount = geoPts.length;
            if (nCount < 2){
                return;
            }

            if(this.scaleValues.length < 6){
                this.scaleValues = [];
                this.scaleValues.push(0.05);
                this.scaleValues.push(0.148);
                this.scaleValues.push(0.4);
                this.scaleValues.push(0.312);
                this.scaleValues.push(0.2);
                this.scaleValues.push(0.01);
            }

            if(index <= 2){
                SuperMap.Geometry.AlgoSymbol1004.prototype.modifyPoint.apply(this, arguments);
            }
            else if(index == 3 || index == 4){
                var midPt = new SuperMap.Geometry.Point((geoPts[0].x+geoPts[1].x)/2,(geoPts[0].y+geoPts[1].y)/2);
                var midAxis = SuperMap.Plot.PlottingUtil.clonePoints(geoPts);
                midAxis.splice(0,2);
                midAxis.unshift(midPt);

                var ptsindex = SuperMap.Plot.PlottingUtil.projectPtOnPolyLine(pt, midAxis);
                var dDisMidAxis  = SuperMap.Plot.PlottingUtil.polylineDistance(midAxis);

                if(ptsindex.index == -1 && index == 4){
                    this.scaleValues[index + 1] = 0.01;
                }
                else{
                    var dDisPts = SuperMap.Plot.PlottingUtil.clonePoints(midAxis);
                    dDisPts.splice(0,ptsindex.index + 1);
                    dDisPts.unshift(ptsindex.pt);
                    var dDistance  = SuperMap.Plot.PlottingUtil.polylineDistance(dDisPts);

                    this.scaleValues[index + 1] = (dDisMidAxis-dDistance)/dDisMidAxis;
                    if(this.scaleValues[4] > 0.5){
                        this.scaleValues[4] = 0.5;
                    }
                }
            }
        }

        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol25200"
});