/**
 * Class: SuperMap.Geometry.SymbolText1
 * 对象标注（带指示线）。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.SymbolText1 = new SuperMap.Class(SuperMap.Geometry.GeoGraphicObject,{

    /**
     * APIMethod: space
     * 文字和基准线的距离，单位是：pixel。
     */
    space: null,

    /**
     * APIMethod: offsetX
     * 文字和定位点在X方向上的偏移，单位是：pixel。
     */
    offsetX: null,

    /**
     * APIMethod: offsetY
     * 文字和定位点在Y方向上的偏移，单位是：pixel。
     */
    offsetY: null,

    /**
     * Constructor: SuperMap.Geometry.SymbolText1
     * 创建一个标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.SymbolText1>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.GeoGraphicObject.prototype.initialize.apply(this, arguments);

        this.minEditPts = 1;
        this.maxEditPts = 1;

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.SYMBOLTEXT1;
        this.symbolType = SuperMap.Plot.SymbolType.SYMBOLTEXT1;
        this.symbolName = "SymbolText1";

        if(this.space === null){
            this.space = 10;
        }

        if(this.offsetX === null){
            this.offsetX = 60;
        }

        if(this.offsetY === null){
            this.offsetY = 30;
        }
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        SuperMap.Geometry.GeoGraphicObject.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        var feature = this.layer.getFeatureByUuid(this.associatedUuid);
        if(feature === null){
            return;
        }

        var bAdd = false;
        for(var i = 0; i < feature.geometry.geoSymbolTexts.length; i++){
            if(this === feature.geometry.geoSymbolTexts[i]){
                bAdd = true;
                break;
            }
        }

        if(!bAdd){
            feature.geometry.geoSymbolTexts.push(this);
        }

        this.calculateSize(feature);

        var localPoint = new SuperMap.Geometry.Point(feature.geometry.controlPoints[0].x, feature.geometry.controlPoints[0].y);

        var localPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(localPoint.x, localPoint.y));
        var controlPixel = new SuperMap.Pixel(localPixel.x+this.offsetX, localPixel.y+this.offsetY);
        var controlLonLat = this.layer.map.getLonLatFromViewPortPx(controlPixel);

        if(this.controlPoints.length === 0){
            this.controlPoints.push(new SuperMap.Geometry.Point(controlLonLat.lon, controlLonLat.lat));
        } else {
            this.controlPoints[0].x = controlLonLat.lon;
            this.controlPoints[0].y = controlLonLat.lat;
        }


        var controlPoints = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        controlPoints.push(localPoint);
        //var ptRects = [];
        //ptRects.push(new SuperMap.Geometry.Point(symbolBounds.left, symbolBounds.top));
        //ptRects.push(new SuperMap.Geometry.Point(symbolBounds.left, symbolBounds.bottom));
        //ptRects.push(new SuperMap.Geometry.Point(symbolBounds.right, symbolBounds.bottom));
        //ptRects.push(new SuperMap.Geometry.Point(symbolBounds.right, symbolBounds.top));
        //ptRects.push(new SuperMap.Geometry.Point(symbolBounds.left, symbolBounds.top));
        //
        //for(var i = 0; i < ptRects.length-1; i++) {
        //    var ptResult = {};
        //    if(SuperMap.Plot.PlottingUtil.intersectLineSegs(centerPt,this.controlPoints[0], ptRects[i], ptRects[i+1], ptResult)) {
        //        controlPoints.push(new SuperMap.Geometry.Point(ptResult.x, ptResult.y));
        //    }
        //}

        var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(24, controlPoints);
        geometry.style = {surroundLineFlag: false};
        this.components.push(geometry);

        var textLen = this.textContent.length;

        var vertialSize = this.feature.style.fontSize * textLen + textLen + 1;
        var localPx = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(this.controlPoints[0].x, this.controlPoints[0].y));
        var upPixel = new SuperMap.Pixel(localPx.x, localPx.y-vertialSize/2);
        var downPixel = new SuperMap.Pixel(localPx.x, localPx.y+vertialSize/2);

        var upLonLat = this.layer.map.getLonLatFromViewPortPx(upPixel);
        var downLonLat = this.layer.map.getLonLatFromViewPortPx(downPixel);

        var upPt = new SuperMap.Geometry.Point(upLonLat.lon, upLonLat.lat);
        var downPt = new SuperMap.Geometry.Point(downLonLat.lon, downLonLat.lat);

        var vertialPts = [upPt, downPt];
        var geometry1 = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(24, vertialPts);
        geometry1.style = {surroundLineFlag: false};
        this.components.push(geometry1);

        if(!SuperMap.Util.isArray(this.textContent)){
            this.textContent = [this.textContent];
        }

        if(this.textContent.length !== 0){
            var symbolBounds = feature.geometry.getBounds();
            var linePt1 = new SuperMap.Geometry.Point((symbolBounds.left + symbolBounds.right)/2, symbolBounds.top);
            var linePt2 = new SuperMap.Geometry.Point((symbolBounds.left + symbolBounds.right)/2, symbolBounds.bottom);
            var isRight = SuperMap.Plot.PlottingUtil.PointIsRightToLine(linePt1, linePt2, this.controlPoints[0]);

            var content = "";
            for(var i = 0; i < this.textContent.length; i++){
                content += this.textContent[i];

                if(i !== this.textContent.length-1){
                    content += "\r\n";
                }
            }

            var textPixel = null;
            if(isRight === true) {
                textPixel = new SuperMap.Pixel(localPx.x - this.space, localPx.y);
            } else {
                textPixel = new SuperMap.Pixel(localPx.x + this.space, localPx.y);
            }

            var textLonLat = this.layer.map.getLonLatFromPixel(textPixel);
            var textPoisition = new SuperMap.Geometry.Point(textLonLat.lon, textLonLat.lat);
            var geometryText = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(34, [textPoisition], content);
            geometryText.style = {};
            geometryText.style = SuperMap.Util.copyAttributes(geometryText.style, this.feature.style);
            if(isRight === true){
                geometryText.style.labelAlign = "rm";
            } else {
                geometryText.style.labelAlign = "lm";
            }

            this.components.push(geometryText);
        }
    },

    /**
     * Method: calculateSize
     * 随图缩放处理
     */
    calculateSize: function (feature) {
        if(this.scaleByMap === false){
            this.resolution = this.layer.renderer.getResolution()
        } else {
            if(this.resolution <= this.layer.renderer.getResolution()){
                //缩小处理
                this.dScale = feature.geometry.dScale;
            }
        }

        if(this.prevOffsetX !== undefined && this.prevOffsetX !== this.offsetX){
            this.scaleBeforeOffsetX = this.offsetX / this.dScale;
            this.prevOffsetX = this.offsetX;
        }

        if(this.scaleByMap === true){
            if(this.scaleBeforeOffsetX === undefined){
                this.scaleBeforeOffsetX = this.offsetX;
            }
            this.offsetX = this.scaleBeforeOffsetX * this.dScale;
            this.prevOffsetX = this.offsetX;
        }

        if(this.prevOffsetY !== undefined && this.prevOffsetY !== this.offsetY){
            this.scaleBeforeOffsetY = this.offsetY / this.dScale;
            this.prevOffsetY = this.offsetY;
        }

        if(this.scaleByMap === true){
            if(this.scaleBeforeOffsetY === undefined){
                this.scaleBeforeOffsetY = this.offsetY;
            }
            this.offsetY = this.scaleBeforeOffsetY * this.dScale;
            this.prevOffsetY = this.offsetY;
        }

        if(this.prevStrokeWidth !== undefined && this.prevStrokeWidth !== this.feature.style.strokeWidth){
            this.strokeWidth = this.feature.style.strokeWidth;
            this.prevStrokeWidth = this.feature.style.strokeWidth;
        }

        if(this.scaleByMap === true) {
            if(this.strokeWidth === undefined){
                this.strokeWidth = this.feature.style.strokeWidth;
            }
            if(this.resolution <= this.layer.renderer.getResolution()){
                //缩小处理
                this.feature.style.strokeWidth = feature.style.strokeWidth;
            } else {
                this.feature.style.strokeWidth = this.strokeWidth;
            }

            this.prevStrokeWidth = this.feature.style.strokeWidth;
        }

        if(this.prevFontSize !== undefined && this.prevFontSize !== this.feature.style.fontSize){
            this.fontSize = this.feature.style.fontSize / this.dScale;
            this.prevFontSize = this.feature.style.fontSize;
        }

        if(this.scaleByMap === true) {
            if(this.fontSize === undefined){
                this.fontSize = this.feature.style.fontSize;
            }
            this.feature.style.fontSize = this.fontSize * this.dScale;
            this.prevFontSize = this.feature.style.fontSize;
        }
    },

    /**
     * Method: calculateBounds
     * 通过遍历数组重新计算边界，在遍历每一子项中时调用 extend 方法。
     */
    calculateBounds: function () {
        this.bounds = null;
        var bounds = new SuperMap.Bounds();
        var components = this.components;
        if (components) {
            for(var i = 0; i < this.components.length; i++){
                if(this.components[i] instanceof SuperMap.Geometry.GeoText){
                    bounds.extend(this.components[i].getBoundsByText(this.layer.map, this.components[i].style));
                } else {
                    bounds.extend(this.components[i].getBounds());
                }
            }
        }

        if (bounds.left != null && bounds.bottom != null &&
            bounds.right != null && bounds.top != null) {
            this.setBounds(bounds);
        }
    },

    /**
     * Method: rotate
     * 围绕中心点旋转组合对象。
     *
     * Parameters:
     * rotateValue - {Float} 旋转角的度数。
     */
    rotate: function(rotateValue, anchorPoint) {
        for(var i = 0, len = this.components.length; i < len; i++) {
            var tempPt = new SuperMap.Geometry.Point(this.components[i].x, this.components[i].y);
            tempPt.rotate(rotateValue, anchorPoint);
            this.components[i].x = tempPt.x;
            this.components[i].y = tempPt.y;
            if(!this.components[i].style.labelRotation){
                this.components[i].style.labelRotation = -rotateValue;
            } else {
                this.components[i].style.labelRotation += -rotateValue;
            }
        }

        for (var n = 0; n < this.scalePoints.length; n++) {
            this.scalePoints[n].rotate(rotateValue, anchorPoint);
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
    move: function (x, y) {
        this.controlPoints[0].move(x, y);

        this.calculateParts();
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
        var feature = this.layer.getFeatureByUuid(this.associatedUuid);
        var localPoint = new SuperMap.Geometry.Point(feature.geometry.controlPoints[0].x, feature.geometry.controlPoints[0].y);
        var localPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(localPoint.x, localPoint.y));

        var controlPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(this.controlPoints[0].x, this.controlPoints[0].y));

        this.offsetX = controlPixel.x - localPixel.x;
        this.offsetY = controlPixel.y - localPixel.y;
        this.calculateParts();
    },

    /**
     * APIMethod: clone
     * 克隆当前几何对象。
     *
     * Returns:
     * {<SuperMap.Geometry.RegionManager>} 克隆的几何对象集合。
     */
    clone: function () {
        SuperMap.Geometry.GeoGraphicObject.prototype.clone.apply(this, arguments);

        //自己特有
    },

    /**
     * Method: parseSymbolData
     * 解析标号数据。
     *
     */
    parseSymbolData: function() {
        SuperMap.Geometry.PlottingGeometry.prototype.parseSymbolData.apply(this, arguments);

        //自己特有
        if(!!this.symbolData){
            if(this.symbolData.space !== undefined){
                this.space = this.symbolData.space;
            }

            if(this.symbolData.offsetX !== undefined){
                this.offsetX = this.symbolData.offsetX;
            }

            if(this.symbolData.offsetY !== undefined){
                this.offsetY = this.symbolData.offsetY;
            }
        }
    },

    /**
     * Method: setSymbolData
     * 设置标号数据。
     *
     */
    setSymbolData: function() {
        SuperMap.Geometry.PlottingGeometry.prototype.setSymbolData.apply(this, arguments);

        //设置对象自己特有的属性到symbolData
        if(!!this.symbolData){
            this.symbolData.space = this.space;
            this.symbolData.offsetX = this.offsetX;
            this.symbolData.offsetY = this.offsetY;
        }
    },

    CLASS_NAME:"SuperMap.Geometry.SymbolText1"
});