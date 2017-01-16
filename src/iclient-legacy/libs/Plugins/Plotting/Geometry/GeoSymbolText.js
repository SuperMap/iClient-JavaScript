/**
 * Class: SuperMap.Geometry.SymbolText
 * 对象标注。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.SymbolText = new SuperMap.Class(SuperMap.Geometry.GeoGraphicObject,{

    /**
     * APIProperty: textArray
     * {Array(<SuperMap.Plot.SymbolText>)} 文字内容
     */
    symbolTexts: [],

    /**
     * Constructor: SuperMap.Geometry.PolygonRegion
     * 创建一个标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.PolygonRegion>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.GeoGraphicObject.prototype.initialize.apply(this, arguments);

        this.minEditPts = 1;
        this.maxEditPts = 1;

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.SYMBOLTEXT;
        this.symbolType = SuperMap.Plot.SymbolType.SYMBOLTEXT;
        this.symbolName = "SymbolText";
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
        if(this.symbolTexts.length > 0){
            var feature = this.layer.getFeatureByUuid(this.associatedUuid);
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

            this.controlPoints = [];
            var symbolBounds = feature.geometry.getBounds();
            for(var i = 0; i < this.symbolTexts.length; i++){
                if(this.symbolTexts[i].textContent === null || this.symbolTexts[i].textContent.length === 0){
                    continue;
                }

                var positionPoint = [];

                var textPosition = this.symbolTexts[i].textPosition;
                if(textPosition === undefined || textPosition === null){
                    textPosition = 0;
                }

                var style = {};
                style = SuperMap.Util.copyAttributes(style, this.feature.style);
                if (textPosition === 0) {
                    style.labelAlign = "rb";
                    var lonlat = new SuperMap.LonLat(symbolBounds.left, symbolBounds.top);
                    var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                    pixel.x -= this.symbolTexts[i].offsetX;
                    pixel.y -= this.symbolTexts[i].offsetY;
                    var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                    positionPoint.push(new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat));
                } else if (textPosition === 1) {
                    style.labelAlign = "rt";
                    var lonlat = new SuperMap.LonLat(symbolBounds.left, symbolBounds.bottom);
                    var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                    pixel.x -= this.symbolTexts[i].offsetX;
                    pixel.y += this.symbolTexts[i].offsetY;
                    var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                    positionPoint.push(new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat));
                } else if (textPosition === 2) {
                    style.labelAlign = "lb";
                    var lonlat = new SuperMap.LonLat(symbolBounds.right, symbolBounds.top);
                    var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                    pixel.x += this.symbolTexts[i].offsetX;
                    pixel.y -= this.symbolTexts[i].offsetY;
                    var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                    positionPoint.push(new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat));
                } else if (textPosition === 3) {
                    style.labelAlign = "lt";
                    var lonlat = new SuperMap.LonLat(symbolBounds.right, symbolBounds.bottom);
                    var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                    pixel.x += this.symbolTexts[i].offsetX;
                    pixel.y += this.symbolTexts[i].offsetY;
                    var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                    positionPoint.push(new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat));
                } else if (textPosition === 4) {
                    style.labelAlign = "cb";
                    var lonlat = new SuperMap.LonLat((symbolBounds.left + symbolBounds.right) / 2, symbolBounds.top);
                    var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                    pixel.x += this.symbolTexts[i].offsetX;
                    pixel.y -= this.symbolTexts[i].offsetY;
                    var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                    positionPoint.push(new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat));
                } else if (textPosition === 5) {
                    style.labelAlign = "ct";
                    var lonlat = new SuperMap.LonLat((symbolBounds.left + symbolBounds.right) / 2, symbolBounds.bottom);
                    var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                    pixel.x += this.symbolTexts[i].offsetX;
                    pixel.y += this.symbolTexts[i].offsetY;
                    var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                    positionPoint.push(new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat));
                } else if (textPosition === 6) {
                    style.labelAlign = "rm";
                    var lonlat = new SuperMap.LonLat(symbolBounds.left, (symbolBounds.top + symbolBounds.bottom) / 2);
                    var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                    pixel.x -= this.symbolTexts[i].offsetX;
                    pixel.y += this.symbolTexts[i].offsetY;
                    var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                    positionPoint.push(new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat));
                } else if (textPosition === 7) {
                    style.labelAlign = "lm";
                    var lonlat = new SuperMap.LonLat(symbolBounds.right, (symbolBounds.top + symbolBounds.bottom) / 2);
                    var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                    pixel.x += this.symbolTexts[i].offsetX;
                    pixel.y += this.symbolTexts[i].offsetY;
                    var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                    positionPoint.push(new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat));
                }

                if(i < this.components.length){
                    this.components[i].x = positionPoint[0].x;
                    this.components[i].y = positionPoint[0].y;
                    this.components[i].text = this.symbolTexts[i].textContent;
                    this.components[i].style = style;
                } else {
                    var primitives = new SuperMap.Geometry.Primitives();
                    var geoText = primitives.geotext(positionPoint, this.symbolTexts[i].textContent);
                    geoText.style = style;
                    this.components.push(geoText);
                }

                var scalePoint = new SuperMap.Geometry.Point(positionPoint[0].x,positionPoint[0].y);
                scalePoint.isScalePoint = true;
                scalePoint.tag = i;
                //this.scalePoints.push(scalePoint);
                this.controlPoints.push(scalePoint);
            }
        }

        for(var index = this.symbolTexts.length; index < this.components.length; index++){
            this.removeComponents(this.components[index]);
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
                bounds.extend(this.components[i].getBoundsByText(this.layer.map, this.components[i].style));
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
        SuperMap.Geometry.GeoGraphicObject.prototype.move.apply(this, arguments);

        //var indexArray = [];
        //var pts = [];
        for(var i = 0; i < this.symbolTexts.length; i++){
            if(this.components[i] === undefined || this.components[i] === null){
                continue;
            }

            if(!(this.components[i] instanceof SuperMap.Geometry.GeoText)){
                continue;
            }

            var pt = new SuperMap.Geometry.Point(this.components[i].x, this.components[i].y);
            this.calculateOffset(i, pt);
            //pts.push(new SuperMap.Geometry.Point(this.components[i].x, this.components[i].y));
            //indexArray.push(i);
        }

        //for(var j = 0; j < pts.length; j++){
        //    this.modifyPoint(indexArray[j], pts[j]);
        //}
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
        //if(index < this.symbolTexts.length){
        //    var textPosition = this.symbolTexts[index].textPosition;
        //
        //    var currentPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(pt.x, pt.y));
        //
        //    var feature = this.layer.getFeatureByUuid(this.associatedUuid);
        //    var symbolBounds = feature.geometry.getBounds();
        //
        //    if (textPosition === 0) {
        //        var lonlat = new SuperMap.LonLat(symbolBounds.left, symbolBounds.top);
        //        var pixel = this.layer.map.getPixelFromLonLat(lonlat);
        //
        //        this.symbolTexts[index].offsetX = pixel.x - currentPixel.x;
        //        this.symbolTexts[index].offsetY = pixel.y - currentPixel.y;
        //
        //    } else if (textPosition === 1) {
        //        var lonlat = new SuperMap.LonLat(symbolBounds.left, symbolBounds.bottom);
        //        var pixel = this.layer.map.getPixelFromLonLat(lonlat);
        //
        //        this.symbolTexts[index].offsetX = pixel.x - currentPixel.x;
        //        this.symbolTexts[index].offsetY = currentPixel.y - pixel.y;
        //    } else if (textPosition === 2) {
        //        var lonlat = new SuperMap.LonLat(symbolBounds.right, symbolBounds.top);
        //        var pixel = this.layer.map.getPixelFromLonLat(lonlat);
        //
        //        this.symbolTexts[index].offsetX = currentPixel.x - pixel.x;
        //        this.symbolTexts[index].offsetY = pixel.y - currentPixel.y;
        //    } else if (textPosition === 3) {
        //        var lonlat = new SuperMap.LonLat(symbolBounds.right, symbolBounds.bottom);
        //        var pixel = this.layer.map.getPixelFromLonLat(lonlat);
        //
        //        this.symbolTexts[index].offsetX = currentPixel.x - pixel.x;
        //        this.symbolTexts[index].offsetY = currentPixel.y - pixel.y;
        //    } else if (textPosition === 4) {
        //        var lonlat = new SuperMap.LonLat((symbolBounds.left + symbolBounds.right) / 2, symbolBounds.top);
        //        var pixel = this.layer.map.getPixelFromLonLat(lonlat);
        //
        //        this.symbolTexts[index].offsetX = currentPixel.x - pixel.x;
        //        this.symbolTexts[index].offsetY = pixel.y - currentPixel.y;
        //    } else if (textPosition === 5) {
        //        var lonlat = new SuperMap.LonLat((symbolBounds.left + symbolBounds.right) / 2, symbolBounds.bottom);
        //        var pixel = this.layer.map.getPixelFromLonLat(lonlat);
        //
        //        this.symbolTexts[index].offsetX = currentPixel.x - pixel.x;
        //        this.symbolTexts[index].offsetY = currentPixel.y - pixel.y;
        //    } else if (textPosition === 6) {
        //        var lonlat = new SuperMap.LonLat(symbolBounds.left, (symbolBounds.top + symbolBounds.bottom) / 2);
        //        var pixel = this.layer.map.getPixelFromLonLat(lonlat);
        //
        //        this.symbolTexts[index].offsetX = pixel.x - currentPixel.x;
        //        this.symbolTexts[index].offsetY = currentPixel.y - currentPixel.y;
        //    } else if (textPosition === 7) {
        //        var lonlat = new SuperMap.LonLat(symbolBounds.right, (symbolBounds.top + symbolBounds.bottom) / 2);
        //        var pixel = this.layer.map.getPixelFromLonLat(lonlat);
        //
        //        this.symbolTexts[index].offsetX = currentPixel.x - pixel.x;
        //        this.symbolTexts[index].offsetY = currentPixel.y - pixel.y;
        //    }
        //
        //}
        this.calculateOffset(index, pt);

        this.calculateParts();
    },

    calculateOffset: function(index, pt){
        if(index < this.symbolTexts.length){
            var textPosition = this.symbolTexts[index].textPosition;

            var currentPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(pt.x, pt.y));

            var feature = this.layer.getFeatureByUuid(this.associatedUuid);
            var symbolBounds = feature.geometry.getBounds();

            if (textPosition === 0) {
                var lonlat = new SuperMap.LonLat(symbolBounds.left, symbolBounds.top);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);

                this.symbolTexts[index].offsetX = pixel.x - currentPixel.x;
                this.symbolTexts[index].offsetY = pixel.y - currentPixel.y;

            } else if (textPosition === 1) {
                var lonlat = new SuperMap.LonLat(symbolBounds.left, symbolBounds.bottom);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);

                this.symbolTexts[index].offsetX = pixel.x - currentPixel.x;
                this.symbolTexts[index].offsetY = currentPixel.y - pixel.y;
            } else if (textPosition === 2) {
                var lonlat = new SuperMap.LonLat(symbolBounds.right, symbolBounds.top);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);

                this.symbolTexts[index].offsetX = currentPixel.x - pixel.x;
                this.symbolTexts[index].offsetY = pixel.y - currentPixel.y;
            } else if (textPosition === 3) {
                var lonlat = new SuperMap.LonLat(symbolBounds.right, symbolBounds.bottom);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);

                this.symbolTexts[index].offsetX = currentPixel.x - pixel.x;
                this.symbolTexts[index].offsetY = currentPixel.y - pixel.y;
            } else if (textPosition === 4) {
                var lonlat = new SuperMap.LonLat((symbolBounds.left + symbolBounds.right) / 2, symbolBounds.top);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);

                this.symbolTexts[index].offsetX = currentPixel.x - pixel.x;
                this.symbolTexts[index].offsetY = pixel.y - currentPixel.y;
            } else if (textPosition === 5) {
                var lonlat = new SuperMap.LonLat((symbolBounds.left + symbolBounds.right) / 2, symbolBounds.bottom);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);

                this.symbolTexts[index].offsetX = currentPixel.x - pixel.x;
                this.symbolTexts[index].offsetY = currentPixel.y - pixel.y;
            } else if (textPosition === 6) {
                var lonlat = new SuperMap.LonLat(symbolBounds.left, (symbolBounds.top + symbolBounds.bottom) / 2);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);

                this.symbolTexts[index].offsetX = pixel.x - currentPixel.x;
                this.symbolTexts[index].offsetY = currentPixel.y - currentPixel.y;
            } else if (textPosition === 7) {
                var lonlat = new SuperMap.LonLat(symbolBounds.right, (symbolBounds.top + symbolBounds.bottom) / 2);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);

                this.symbolTexts[index].offsetX = currentPixel.x - pixel.x;
                this.symbolTexts[index].offsetY = currentPixel.y - pixel.y;
            }

        }
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
            this.symbolTexts = this.symbolData.symbolTexts;
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
            this.symbolData.symbolTexts = this.symbolTexts;
        }
    },

    CLASS_NAME:"SuperMap.Geometry.SymbolText"
});