/**
 * Class: SuperMap.Geometry.GeoRouteNode
 * 航线对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.AlgoSymbol>
 */
SuperMap.Geometry.GeoTooltipBoxM = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{

    /**
     * Constructor: SuperMap.Plot.SitDataStruct
     * 创建一个态势图信息结构。
     *
     * Parameters:
     * options - {Object} 态势图参数
     *
     * Returns:
     * {<SuperMap.Plot.SitDataStruct>} 新的图层结构。
     */
    initialize:function(options){
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.minEditPts = 4;
        this.maxEditPts = 4;

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.ANNOFRAMESYMBOLM;
        this.symbolType = SuperMap.Plot.SymbolType.ANNOFRAMESYMBOLM;
        this.symbolName = "Tooltip BoxM";

        this.scaleValues = [];
        this.scaleValues.push(0.126);
        this.scaleValues.push(0.126);
    },

    /**
     * APIMethod: destroy
     * 销毁图形对象数据管理对象。
     *
     */
    destroy:function() {
        this.type = null;
        this.position = null;
        this.index = null;

        SuperMap.Geometry.AlgoSymbol.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        if(geoPts.length === this.minEditPts - 1){
            geoPts.push(geoPts[geoPts.length - 1].clone())
        }

        if( geoPts.length >= this.minEditPts) {

            var scale1 =  this.scaleValues[0];
            if(scale1 < 0 || scale1 > 1){
                return;
            }
            scale1 = (1 - scale1) / 2;

            var scale2 =  this.scaleValues[1];
            if(scale2 < 0 || scale2 > 1){
                return;
            }
            scale2 = (1 - scale2) / 2;

            var left,top,right,bottom,x,y;
            if(geoPts[0].x < geoPts[1].x){
                left = geoPts[0].x;
                right = geoPts[1].x;
            }
            else{
                left = geoPts[1].x;
                right = geoPts[0].x;
            }
            if(geoPts[0].y < geoPts[1].y){
                bottom = geoPts[0].y;
                top = geoPts[1].y;
            }
            else{
                bottom = geoPts[1].y;
                top = geoPts[0].y;
            }
            x = geoPts[2].x;
            y = geoPts[2].y;

            var action1 = this.getAction(x,y,left,top,right,bottom);

            x = geoPts[3].x;
            y = geoPts[3].y;

            var action2 = this.getAction(x,y,left,top,right,bottom);

            this.scalePoints = [];
            var pLine = [];
            pLine.push(new SuperMap.Geometry.Point(left, bottom));
            pLine.push(new SuperMap.Geometry.Point(left, top));
            pLine.push(new SuperMap.Geometry.Point(right, top));
            pLine.push(new SuperMap.Geometry.Point(right, bottom));

            if(action1 === action2 && action1 !== 0){
                var pntScale1Start, pntScale1End, pntScale2Start, pntScale2End;
                switch (action1){
                    case 0:
                        break;
                    case 1:
                        pntScale1Start = new SuperMap.Geometry.Point(left, bottom + (top - bottom) / 2 * scale1);
                        pntScale1End = new SuperMap.Geometry.Point(left, (top + bottom) / 2 - (top - bottom) / 2 * scale1);
                        pntScale2Start = new SuperMap.Geometry.Point(left, (top + bottom) / 2 + (top - bottom) / 2 * scale2);
                        pntScale2End = new SuperMap.Geometry.Point(left, top - (top - bottom) / 2 * scale2);
                        break;
                    case 2:
                        pntScale1Start = new SuperMap.Geometry.Point(left + (right - left) / 2 * scale1, top);
                        pntScale1End = new SuperMap.Geometry.Point((left + right) / 2 - (right - left) / 2 * scale1, top);
                        pntScale2Start = new SuperMap.Geometry.Point((left + right) / 2 + (right - left) / 2 * scale2, top);
                        pntScale2End = new SuperMap.Geometry.Point(right - (right - left) / 2 * scale2, top);
                        break;
                    case 3:
                        pntScale1Start = new SuperMap.Geometry.Point(right, top - (top - bottom) / 2 * scale1);
                        pntScale1End = new SuperMap.Geometry.Point(right, (top + bottom) / 2 + (top - bottom) / 2 * scale1);
                        pntScale2Start = new SuperMap.Geometry.Point(right, (top + bottom) / 2 - (top - bottom) / 2 * scale2);
                        pntScale2End = new SuperMap.Geometry.Point(right, bottom + (top - bottom) / 2 * scale2);
                        break;
                    case 4:
                        pntScale1Start = new SuperMap.Geometry.Point(right - (right - left) / 2 * scale1, bottom);
                        pntScale1End = new SuperMap.Geometry.Point((left + right) / 2 + (right - left) / 2 * scale1, bottom);
                        pntScale2Start = new SuperMap.Geometry.Point((left + right) / 2 - (right - left) / 2 * scale2, bottom);
                        pntScale2End = new SuperMap.Geometry.Point(left + (right - left) / 2 * scale2, bottom);
                        break;
                }

                var intersectPoint = new SuperMap.Geometry.Point(0,0);
                var isIntersectLines = SuperMap.Plot.PlottingUtil.intersectLineSegs(pntScale1End, geoPts[2], pntScale2Start, geoPts[3], intersectPoint);
                if(isIntersectLines){
                    if( SuperMap.Plot.PlottingUtil.equalFuzzy(intersectPoint.x, pntScale1End.x) &&
                        SuperMap.Plot.PlottingUtil.equalFuzzy(intersectPoint.y, pntScale1End.y)){
                        isIntersectLines = false;
                    }
                }

                if(isIntersectLines){
                    switch (action1){
                        case 0:
                            break;
                        case 1:
                            pntScale1Start.y += (top - bottom) / 2;
                            pntScale1End.y += (top - bottom) / 2;
                            pntScale2Start.y -= (top - bottom) / 2;
                            pntScale2End.y -= (top - bottom) / 2;
                            break;
                        case 2:
                            pntScale1Start.x += (right - left) / 2;
                            pntScale1End.x += (right - left) / 2;
                            pntScale2Start.x -= (right - left) / 2;
                            pntScale2End.x -= (right - left) / 2;
                            break;
                        case 3:
                            pntScale1Start.y -= (top - bottom) / 2;
                            pntScale1End.y -= (top - bottom) / 2;
                            pntScale2Start.y += (top - bottom) / 2;
                            pntScale2End.y += (top - bottom) / 2;
                            break;
                        case 4:
                            pntScale1Start.x -= (right - left) / 2;
                            pntScale1End.x -= (right - left) / 2;
                            pntScale2Start.x += (right - left) / 2;
                            pntScale2End.x += (right - left) / 2;
                            break;
                    }
                    pLine.splice(action1, 0 , pntScale1End);
                    pLine.splice(action1, 0 , geoPts[2].clone());
                    pLine.splice(action1, 0 , pntScale1Start);
                    pLine.splice(action1, 0 , pntScale2End);
                    pLine.splice(action1, 0 , geoPts[3].clone());
                    pLine.splice(action1, 0 , pntScale2Start);
                }
                else{
                    pLine.splice(action1, 0 , pntScale2End);
                    pLine.splice(action1, 0 , geoPts[3].clone());
                    pLine.splice(action1, 0 , pntScale2Start);
                    pLine.splice(action1, 0 , pntScale1End);
                    pLine.splice(action1, 0 , geoPts[2].clone());
                    pLine.splice(action1, 0 , pntScale1Start);
                }

                switch (action1){
                    case 0:
                        break;
                    case 1:
                    case 2:
                        this.addScalePoint(pntScale1End);
                        this.addScalePoint(pntScale2End);
                        break;
                    case 3:
                    case 4:
                        this.addScalePoint(pntScale1Start);
                        this.addScalePoint(pntScale2Start);
                        break;
                }
            }
            else{
                var pntScale1Start, pntScale1End, pntScale2Start, pntScale2End;

                switch (action1){
                    case 0:
                        this.addScalePoint(new SuperMap.Geometry.Point(0,0));
                        break;
                    case 1:
                        pntScale1Start = new SuperMap.Geometry.Point(left, bottom + (top - bottom) * scale1);
                        pntScale1End = new SuperMap.Geometry.Point(left, top - (top - bottom) * scale1);
                        this.addScalePoint(pntScale1End);
                        break;
                    case 2:
                        pntScale1Start = new SuperMap.Geometry.Point(left + (right - left) * scale1, top);
                        pntScale1End = new SuperMap.Geometry.Point(right - (right - left) * scale1, top);
                        this.addScalePoint(pntScale1End);
                        break;
                    case 3:
                        pntScale1Start = new SuperMap.Geometry.Point(right, top - (top - bottom) * scale1);
                        pntScale1End = new SuperMap.Geometry.Point(right, bottom + (top - bottom) * scale1);
                        this.addScalePoint(pntScale1Start);
                        break;
                    case 4:
                        pntScale1Start = new SuperMap.Geometry.Point(right - (right - left) * scale1, bottom);
                        pntScale1End = new SuperMap.Geometry.Point(left + (right - left) * scale1, bottom);
                        this.addScalePoint(pntScale1Start);
                        break;
                }

                switch (action2){
                    case 0:
                        this.addScalePoint(new SuperMap.Geometry.Point(0,0));
                        break;
                    case 1:
                        pntScale2Start = new SuperMap.Geometry.Point(left, bottom + (top - bottom) * scale2);
                        pntScale2End = new SuperMap.Geometry.Point(left, top - (top - bottom) * scale2);
                        this.addScalePoint(pntScale2End);
                        break;
                    case 2:
                        pntScale2Start = new SuperMap.Geometry.Point(left + (right - left) * scale2, top);
                        pntScale2End = new SuperMap.Geometry.Point(right - (right - left) * scale2, top);
                        this.addScalePoint(pntScale2End);
                        break;
                    case 3:
                        pntScale2Start = new SuperMap.Geometry.Point(right, top - (top - bottom) * scale2);
                        pntScale2End = new SuperMap.Geometry.Point(right, bottom + (top - bottom) * scale2);
                        this.addScalePoint(pntScale2Start);
                        break;
                    case 4:
                        pntScale2Start = new SuperMap.Geometry.Point(right - (right - left) * scale2, bottom);
                        pntScale2End = new SuperMap.Geometry.Point(left + (right - left) * scale2, bottom);
                        this.addScalePoint(pntScale2Start);
                        break;
                }

                if(action1 > action2){
                    if(action1 !== 0) {
                        pLine.splice(action1, 0, pntScale1End);
                        pLine.splice(action1, 0, geoPts[2].clone());
                        pLine.splice(action1, 0, pntScale1Start);
                    }
                    if(action2 !== 0){
                        pLine.splice(action2, 0 , pntScale2End);
                        pLine.splice(action2, 0 , geoPts[3].clone());
                        pLine.splice(action2, 0 , pntScale2Start);
                    }
                }
                else{
                    if(action2 !== 0) {
                        pLine.splice(action2, 0, pntScale2End);
                        pLine.splice(action2, 0, geoPts[3].clone());
                        pLine.splice(action2, 0, pntScale2Start);
                    }
                    if(action1 !== 0) {
                        pLine.splice(action1, 0, pntScale1End);
                        pLine.splice(action1, 0, geoPts[2].clone());
                        pLine.splice(action1, 0, pntScale1Start);
                    }
                }
            }

            this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pLine, {surroundLineFlag: false});

            if(this.textContent.length !== 0){
                var textPt = new SuperMap.Geometry.Point((geoPts[0].x+geoPts[1].x)/2, (geoPts[0].y+geoPts[1].y)/2);
                var geoText = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.TEXTSYMBOL, [textPt], this.textContent);
                geoText.style = {surroundLineFlag: false, labelAlign: "cm"};
                this.components.push(geoText);
            }
        } else if(geoPts.length >= 2 && geoPts.length < this.minEditPts){
            var geometryBorder = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.RECTANGLESYMBOL, geoPts);
            geometryBorder.style = {surroundLineFlag: false};
            this.components.push(geometryBorder);
        }
    },

    /**
     * Method: move
     * 沿着x、y轴的正方向上按照给定的位移移动几何图形，move 不仅改变了几何图形的位置并且清理了边界缓存。
     *
     * Parameters:
     * x - {Float} x轴正方向上移动的距离。
     * y - {Float} y轴正方向上移动的距离。
     */
    move: function(x, y) {
        if (this.layer.plottingEdit.isAddPoint !== true) {
            for (var m = 0, len = this.controlPoints.length; m < len; m++) {
                if(this.controlPoints[m].isFixedPos !== true){
                    this.controlPoints[m].move(x, y);
                }
            }

            this.calculateParts();
        }
    },

    ///**
    // * Method: resize
    // * 相对于中心点缩放组合对象。
    // *
    // * Parameters:
    // * scaleValue - {Float} 缩放比例。
    // */
    //resize: function(scaleValue, anchorPoint) {
    //    for (var m = 0, len = this.controlPoints.length; m < len; m++) {
    //        if(this.controlPoints[m].isFixedPos !== true){
    //            this.controlPoints[m].resize(scaleValue, anchorPoint);
    //        }
    //    }
    //
    //    this.calculateParts();
    //},

    /**
     * Method: modifyPoint
     * 修改位置点
     *
     * Parameters:
     * index - {Integer} 位置点索引。
     * pt - {<SuperMap.Geometry.Point>} 位置点。
     */
    modifyPoint: function(index, pt) {
        if (pt.isScalePoint === true) {
            var scaleP0 = this.scalePoints[index];

            var left,top,right,bottom,x,y;
            if(this.controlPoints[0].x < this.controlPoints[1].x){
                left = this.controlPoints[0].x;
                right = this.controlPoints[1].x;
            }
            else{
                left = this.controlPoints[1].x;
                right = this.controlPoints[0].x;
            }
            if(this.controlPoints[0].y < this.controlPoints[1].y){
                bottom = this.controlPoints[0].y;
                top = this.controlPoints[1].y;
            }
            else{
                bottom = this.controlPoints[1].y;
                top = this.controlPoints[0].y;
            }

            x = this.controlPoints[2].x;
            y = this.controlPoints[2].y;

            var action1 = this.getAction(x,y,left,top,right,bottom);

            x = this.controlPoints[3].x;
            y = this.controlPoints[3].y;

            var action2 = this.getAction(x,y,left,top,right,bottom);

            var scale = 0.25;
            if(action1 === action2 && action1 !== 0){
                switch (action1){
                    case 1:
                    case 3:
                        var scaleModify = (pt.y - scaleP0.y) * 2 / ((top - bottom) / 2);
                        scale = this.scaleValues[index] + scaleModify;
                        break;
                    case 2:
                    case 4:
                        var scaleModify = (pt.x - scaleP0.x) * 2 / ((right - left) / 2);
                        scale = this.scaleValues[index] + scaleModify;
                        break;
                }
            }
            else{
                var action = index === 0 ? action1 : action2;
                switch (action){
                    case 0:
                        scale = this.scaleValues[index];
                        break;
                    case 1:
                    case 3:
                        var scaleModify = (pt.y - scaleP0.y) * 2 / (top - bottom);
                        scale = this.scaleValues[index] + scaleModify;
                        break;
                    case 2:
                    case 4:
                        var scaleModify = (pt.x - scaleP0.x) * 2 / (right - left);
                        scale = this.scaleValues[index] + scaleModify;
                        break;
                }
            }

            if(scale < 0){
                scale = 0;
            }
            if(scale > 1){
                scale = 1;
            }
            this.scaleValues[index] = scale;
        }
        this.calculateParts();
    },

    getAction: function (x, y, left, top, right, bottom) {
        var action = 0;
        var rectscale = (top - bottom) / (right - left);

        if(x < left){
            if(y > top){
                if(Math.abs((y - top) / (x - left)) > rectscale){
                    action = 2;
                }
                else{
                    action = 1;
                }
            }
            else if(y < bottom){
                if(Math.abs((y - bottom) / (x - left)) > rectscale){
                    action = 4;
                }
                else{
                    action = 1;
                }
            }
            else{
                action = 1;
            }
        }
        else if(x > right){
            if(y > top){
                if(Math.abs((y - top) / (x - right)) > rectscale){
                    action = 2;
                }
                else{
                    action = 3;
                }
            }
            else if(y < bottom){
                if(Math.abs((y - bottom) / (x - right)) > rectscale){
                    action = 4;
                }
                else{
                    action = 3;
                }
            }
            else{
                action = 3;
            }
        }
        else{
            if(y > top){
                action = 2;
            }
            else if(y < bottom){
                action = 4;
            }
            else{
                action = 0;
            }
        }
        return action;
    },

    CLASS_NAME:"SuperMap.Geometry.GeoTooltipBoxM"
});