/**
 * Class: SuperMap.Geometry.GeoTooltipBox
 * 三点指示框对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.AlgoSymbol>
 */
SuperMap.Geometry.GeoTooltipBox = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{

    /**
     * Constructor: SuperMap.Geometry.GeoTooltipBox
     * 创建一个三点指示框对象。
     *
     * Parameters:
     * options - {Object} 指示框参数
     *
     * Returns:
     * {<SuperMap.Geometry.GeoTooltipBox>} 新的三点指示框对象。
     */
    initialize:function(options){
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.minEditPts = 3;
        this.maxEditPts = 3;

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.ANNOFRAMESYMBOL;
        this.symbolType = SuperMap.Plot.SymbolType.ANNOFRAMESYMBOL;
        this.symbolName = "Tooltip Box";

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

        var scale =  this.scaleValues[0];
        if(scale < 0 || scale > 1){
            return;
        }
        scale = (1 - scale) / 2;

        if( this.controlPoints.length >= this.minEditPts) {

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

            this.scalePoints = [];
            var pLine = [];
            pLine.push(new SuperMap.Geometry.Point(left, bottom));
            pLine.push(new SuperMap.Geometry.Point(left, top));
            pLine.push(new SuperMap.Geometry.Point(right, top));
            pLine.push(new SuperMap.Geometry.Point(right, bottom));
            switch (action){
                case 0:
                    break;
                case 1:
                    this.addScalePoint(new SuperMap.Geometry.Point(left, top - (top - bottom) * scale));
                    pLine.splice(action, 0 , new SuperMap.Geometry.Point(left, top - (top - bottom) * scale));
                    pLine.splice(action, 0 , this.controlPoints[2].clone());
                    pLine.splice(action, 0 , new SuperMap.Geometry.Point(left, bottom + (top - bottom) * scale));
                    break;
                case 2:
                    this.addScalePoint(new SuperMap.Geometry.Point(right - (right - left) * scale, top));
                    pLine.splice(action, 0 , new SuperMap.Geometry.Point(right - (right - left) * scale, top));
                    pLine.splice(action, 0 , this.controlPoints[2].clone());
                    pLine.splice(action, 0 , new SuperMap.Geometry.Point(left + (right - left) * scale, top));
                    break;
                case 3:
                    this.addScalePoint(new SuperMap.Geometry.Point(right, top - (top - bottom) * scale));
                    pLine.splice(action, 0 , new SuperMap.Geometry.Point(right, bottom + (top - bottom) * scale));
                    pLine.splice(action, 0 , this.controlPoints[2].clone());
                    pLine.splice(action, 0 , new SuperMap.Geometry.Point(right, top - (top - bottom) * scale));
                    break;
                case 4:
                    this.addScalePoint(new SuperMap.Geometry.Point(right - (right - left) * scale, bottom));
                    pLine.splice(action, 0 , new SuperMap.Geometry.Point(left + (right - left) * scale, bottom));
                    pLine.splice(action, 0 , this.controlPoints[2].clone());
                    pLine.splice(action, 0 , new SuperMap.Geometry.Point(right - (right - left) * scale, bottom));
                    break;
            }
            //pLine.push(pLine[0].clone());

            var geometryBorder = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pLine);
            geometryBorder.style = {surroundLineFlag: false};
            this.components.push(geometryBorder);

            if(this.textContent.length !== 0){
                var textPt = new SuperMap.Geometry.Point((this.controlPoints[0].x+this.controlPoints[1].x)/2, (this.controlPoints[0].y+this.controlPoints[1].y)/2);
                var geoText = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.TEXTSYMBOL, [textPt], this.textContent);
                geoText.style = {surroundLineFlag: false, labelAlign: "cm"};
                this.components.push(geoText);
            }
        } else if(this.controlPoints.length >= 2 && this.controlPoints.length < this.minEditPts){
            var geometryBorder = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.RECTANGLESYMBOL, this.controlPoints);
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
            if(index == 0){
                var scaleP0 = this.scalePoints[0];

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

                var scale = 0.25;
                switch (action){
                    case 1:
                    case 3:
                        var newy = scaleP0.y + (pt.y - scaleP0.y);
                        if(newy > top){
                            newy = top;
                        }
                        if(newy < (top + bottom) / 2){
                            newy = (top + bottom) / 2;
                        }
                        scale = 1 - (top - newy) * 2 / (top - bottom);
                        break;
                    case 2:
                    case 4:
                        var newx = scaleP0.x + (pt.x - scaleP0.x);
                        if(newx > right){
                            newx = right;
                        }
                        if(newx < (left + right) / 2){
                            newx = (left + right) / 2;
                        }
                        scale = 1 - (right - newx) * 2 / (right - left);
                        break;
                }
                if(scale < 0){
                    scale = 0;
                }
                if(scale > 1){
                    scale = 1;
                }
                this.scaleValues[0] = scale;
            }
        }
        this.calculateParts();
    },

    CLASS_NAME:"SuperMap.Geometry.GeoTooltipBox"
});