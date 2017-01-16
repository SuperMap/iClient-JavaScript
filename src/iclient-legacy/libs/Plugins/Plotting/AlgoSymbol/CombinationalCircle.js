/**
 * Class: SuperMap.Geometry.ArrowLine
 * 箭头线对象类。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.CombinationalCircle = SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{

    /**
     * APIProperty: radius
     * {Array(<Double>)} 圆半径集合
     */
    radius: null,

    /**
     * APIProperty: DefaultRadiu
     * {Double} 圆半径,默认为20
     */
    defaultRadius: 20,

    /**
     * APIProperty: angleRange
     * {Array(<Double>)} 圆半径集合
     */
    angleRange: null,

    /**
     * Constructor: SuperMap.Geometry.AlgoSymbol
     * 创建一个标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.ArrowLine>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.style = SuperMap.Geometry.PlottingGeometry.defaultStyle;
        this.code = SuperMap.Plot.SymbolType.COMBINATIONALCIRCLE;
        this.libID = 0;
        this.symbolType = SuperMap.Plot.SymbolType.COMBINATIONALCIRCLE;
        this.symbolName = "ConcentricCircle";

        this.minEditPts = 1;
        this.maxEditPts = 9999;

        this.angleRange = [];
        if(this.defaultRadius === undefined || this.defaultRadius === null){
            this.defaultRadius = 20;
        }

    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints === null || this.controlPoints.length < 1){
            return;
        }

        this.angleRange = [];
        if(this.radius === undefined || this.radius === null){
            this.radius = [];
            for(var i = 0; i < this.controlPoints.length; i++){
                this.radius.push(this.defaultRadius);
                this.angleRange.push([{Start:0,End:360}]);
            }
        }
        else {
            for(var i = 0; i < this.controlPoints.length; i++){
                if(this.radius[i] === undefined || this.radius[i] === null){
                    this.radius[i] = this.defaultRadius;
                }
                this.angleRange.push([{Start:0,End:360}]);
            }
        }

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

        for(var i = 0; i < geoPts.length; i++){
            if(this.angleRange[i].length === 0 || (this.angleRange[i][0].Start === 0 && this.angleRange[i][0].End === 0)){
                continue;
            }
            for(var j = i + 1; j < geoPts.length; j++){
                if(this.angleRange[j].length === 0 || (this.angleRange[j][0].Start === 0 && this.angleRange[j][0].End === 0)){
                    continue;
                }

                var distance = SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[j]);
                if(distance < (this.radius[i] + this.radius[j])){
                    if(distance > Math.abs(this.radius[i] - this.radius[j])){

                        for(var t = 0; t < 2; t++){
                            var angleLine,angle,index;
                            if(t == 0){
                                index = i;
                                angleLine = SuperMap.Plot.PlottingUtil.radian(geoPts[i], geoPts[j]) * this.RTOD;
                                angle = Math.acos((distance*distance + this.radius[i] * this.radius[i] - this.radius[j] * this.radius[j]) / (2 * distance * this.radius[i])) * this.RTOD;
                            }
                            else {
                                index = j;
                                angleLine = SuperMap.Plot.PlottingUtil.radian(geoPts[j], geoPts[i]) * this.RTOD;
                                angle = Math.acos((distance*distance + this.radius[j] * this.radius[j] - this.radius[i] * this.radius[i]) / (2 * distance * this.radius[j])) * this.RTOD;
                            }


                            var angleStart = angleLine - angle;
                            var angleEnd = angleLine + angle;

                            var contains0Degree = (angleStart < 0 && angleEnd > 0) || (angleStart > 360 || angleEnd > 360);

                            angleStart = this.adjustAngle(angleStart);
                            angleEnd = this.adjustAngle(angleEnd);

                            for(var k = this.angleRange[index].length - 1; k >= 0; k--){
                                if(contains0Degree){
                                    if(angleEnd > this.angleRange[index][k].End || SuperMap.Plot.PlottingUtil.equalFuzzy(angleEnd, this.angleRange[index][k].End)){
                                        this.angleRange[index].splice(k, 1);
                                        continue;
                                    }
                                    else if(angleEnd > this.angleRange[index][k].Start){
                                        this.angleRange[index][k].Start = angleEnd;
                                    }

                                    if(angleStart < this.angleRange[index][k].Start || SuperMap.Plot.PlottingUtil.equalFuzzy(angleStart, this.angleRange[index][k].Start)){
                                        this.angleRange[index].splice(k, 1);
                                        continue;
                                    }
                                    else if(angleStart < this.angleRange[index][k].End){
                                        this.angleRange[index][k].End = angleStart;
                                    }
                                }
                                else {
                                    if(angleStart < this.angleRange[index][k].Start && angleEnd > this.angleRange[index][k].End){
                                        this.angleRange[index].splice(k, 1);
                                    }
                                    else if(angleStart > this.angleRange[index][k].Start && angleEnd < this.angleRange[index][k].End){
                                        this.angleRange[index].push({Start:this.angleRange[index][k].Start,End:angleStart});
                                        this.angleRange[index].push({Start:angleEnd,End:this.angleRange[index][k].End});
                                        this.angleRange[index].splice(k, 1);
                                    }
                                    else{
                                        if(angleStart > this.angleRange[index][k].End){
                                            continue;
                                        }
                                        else if(angleStart > this.angleRange[index][k].Start){
                                            this.angleRange[index][k].End = angleStart;
                                        }

                                        if(angleEnd < this.angleRange[index][k].Start){
                                            continue;
                                        }
                                        else if(angleEnd < this.angleRange[index][k].End){
                                            this.angleRange[index][k].Start = angleEnd;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else{
                        if(this.radius[i] < this.radius[j]){
                            this.angleRange[i][0].Start = 0;
                            this.angleRange[i][0].End = 0;
                            break;
                        }
                        else{
                            this.angleRange[j][0].Start = 0;
                            this.angleRange[j][0].End = 0;
                        }
                    }
                }
            }
        }

        for(var i = 0; i < geoPts.length; i++){
            if(this.angleRange[i].length === 0 || (this.angleRange[i][0].Start === 0 && this.angleRange[i][0].End === 0)){
                continue;
            }
            for(var k = this.angleRange[i].length - 1; k >= 0; k--){
                var tempStartAngle = this.adjustAngle(this.angleRange[i][k].Start);
                var tempEndAngle = this.adjustAngle(this.angleRange[i][k].End);

                while (tempEndAngle < tempStartAngle){
                    tempEndAngle += 360;
                }

                var circlePts = []
                var stepangle = (tempEndAngle - tempStartAngle) / 72;
                for(var angle = tempStartAngle; angle < (tempEndAngle + stepangle / 2); angle += stepangle){
                    var x = geoPts[i].x + this.radius[i] * Math.cos(angle * this.DTOR);
                    var y = geoPts[i].y + this.radius[i] * Math.sin(angle * this.DTOR);
                    circlePts.push(new SuperMap.Geometry.Point(x, y));
                }

                this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, circlePts);
            }
        }

        for(var i = 0; i < geoPts.length; i++){
            var ptctrl = new SuperMap.Geometry.Point(geoPts[i].x + this.radius[i], geoPts[i].y);
            ptctrl.isScalePoint = true;
            ptctrl.tag = i;
            this.scalePoints.push(ptctrl);
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
    modifyPoint: function (index, pt) {
        if (pt.isScalePoint === true) {
            if(index < 0 || index >= this.controlPoints.length){
                return;
            }

            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            var distance = SuperMap.Plot.PlottingUtil.distance(geoPts[index],pt);
            this.radius[index] = distance;
        }
        this.calculateParts();
    },

    adjustAngle: function(angle) {
        while (angle > 360){
            angle -= 360;
        }
        while (angle < 0){
            angle += 360;
        }
        return angle;
    },

    CLASS_NAME: "SuperMap.Geometry.CombinationalCircle"
});
