/**
 * Class: SuperMap.Geometry.ArrowLine
 * 同心圆对象类。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.ConcentricCircle = SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{
    /**
     * APIProperty: StartAngle
     * {Double} 起始夹角,默认为0度
     */
    StartAngle: 0,

    /**
     * APIProperty: EndAngle
     * {Double} 结束夹角,默认为360度
     */
    EndAngle: 360,

    /**
     * Constructor: SuperMap.Geometry.ConcentricCircle
     * 创建一个标绘对象。可以使用SuperMap.Geometry.GeoGraphicObject.getGeometry函数创建新的标绘对象
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.ConcentricCircle>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.GeoGraphicObject.prototype.initialize.apply(this, arguments);

        this.style = SuperMap.Geometry.PlottingGeometry.defaultStyle;
        this.code = SuperMap.Plot.SymbolType.CONCENTRICCIRCLE;
        this.libID = 0;
        this.symbolType = SuperMap.Plot.SymbolType.CONCENTRICCIRCLE;
        this.symbolName = "ConcentricCircle";

        this.minEditPts = 3;
        this.maxEditPts = 3;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints === null || this.controlPoints.length < 2){
            return;
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        if(geoPts.length == 2){
            geoPts.push(geoPts[1].clone());
        }

        while (this.StartAngle > 360){
            this.StartAngle -= 360;
        }
        while (this.StartAngle < 0){
            this.StartAngle += 360;
        }
        while (this.EndAngle > 360){
            this.EndAngle -= 360;
        }
        while (this.EndAngle < 0){
            this.EndAngle += 360;
        }

        while (this.EndAngle < this.StartAngle){
            this.EndAngle += 360;
        }

        var distance1 = SuperMap.Plot.PlottingUtil.distance(geoPts[0],geoPts[1]);
        var distance2 = SuperMap.Plot.PlottingUtil.distance(geoPts[0],geoPts[2]);

        var circlePts1 = [],circlePts2 = [];
        var DTOR = Math.PI / 180;
        var stepangle = (this.EndAngle - this.StartAngle) / 72;
        for(var angle = this.StartAngle; angle < (this.EndAngle + stepangle / 2); angle += stepangle){
            var x1 = geoPts[0].x + distance1 * Math.cos(angle * DTOR);
            var y1 = geoPts[0].y + distance1 * Math.sin(angle * DTOR);
            var x2 = geoPts[0].x + distance2 * Math.cos(angle * DTOR);
            var y2 = geoPts[0].y + distance2 * Math.sin(angle * DTOR);
            circlePts1.push(new SuperMap.Geometry.Point(x1, y1));
            circlePts2.push(new SuperMap.Geometry.Point(x2, y2));
        }

        // var allpts = [];
        // for(var i = 0; i < circlePts1.length; i++){
        //     allpts.push(circlePts1[i]);
        // }
        // for(var i = circlePts2.length - 1; i >= 0 ; i--){
        //     allpts.push(circlePts2[i]);
        // }
        //
        // this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, allpts, {fill:false});

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, circlePts1);
        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, circlePts2);

        var ctrlptx1 = geoPts[0].x + distance1 / 2 * Math.cos(this.StartAngle * DTOR);
        var ctrlpty1 = geoPts[0].y + distance1 / 2 * Math.sin(this.StartAngle * DTOR);
        var ctrlptx2 = geoPts[0].x + distance2 / 2 * Math.cos(this.EndAngle * DTOR);
        var ctrlpty2 = geoPts[0].y + distance2 / 2 * Math.sin(this.EndAngle * DTOR);

        var ptctrl1 = new SuperMap.Geometry.Point(ctrlptx1, ctrlpty1);
        ptctrl1.isScalePoint = true;
        ptctrl1.tag = 0;
        this.scalePoints.push(ptctrl1);
        var ptctrl2 = new SuperMap.Geometry.Point(ctrlptx2, ctrlpty2);
        ptctrl2.isScalePoint = true;
        ptctrl2.tag = 1;
        this.scalePoints.push(ptctrl2);
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
        if (pt.isScalePoint === true) {
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            //var distance = SuperMap.Plot.PlottingUtil.distance(geoPts[0],pt);
            //var angle = Math.acos((pt.x - geoPts[0].x) / distance) * 180 / Math.PI;
            var angle = SuperMap.Plot.PlottingUtil.radian(geoPts[0], pt) * 180 / Math.PI;
            while (angle > 360){
                angle -= 360;
            }
            while (angle < 0){
                angle += 360;
            }
            if(index == 0){
                this.StartAngle = angle;
            }
            else if(index == 1){
                this.EndAngle = angle;
            }
        }
        this.calculateParts();
    },

    parseSymbolData: function() {
        SuperMap.Geometry.GeoGraphicObject.prototype.parseSymbolData.apply(this, arguments);

        //自己特有
        if(!!this.symbolData){
            this.StartAngle = this.symbolData.StartAngle;
            this.EndAngle = this.symbolData.EndAngle;
        }
    },

    setSymbolData: function() {
        SuperMap.Geometry.GeoGraphicObject.prototype.setSymbolData.apply(this, arguments);

        // if(!!this.symbolData){
        this.symbolData.StartAngle = this.StartAngle;
        this.symbolData.EndAngle = this.EndAngle;
        // }
    },

    CLASS_NAME: "SuperMap.Geometry.ConcentricCircle"
});
