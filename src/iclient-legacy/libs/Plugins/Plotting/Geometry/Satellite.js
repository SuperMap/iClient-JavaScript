/**
 * Class: SuperMap.Geometry.Satellite
 * Satellite对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.Satellite = new SuperMap.Class(SuperMap.Geometry.GeoGraphicObject,{

    /**
     * APIProperty: ptsOrbit
     * {Array(<SuperMap.Plot.OrbitPoint>)} 轨道星下点轨迹
     */
    orbitPoints: null,

    /**
     * APIProperty: subSymbol
     * {<SuperMap.Plot.SubSymbol>} 卫星标号数据
     */
    subSymbol: null,

    /**
     * APIProperty: visible
     * {Boolean} 卫星轨道的可见性，默认为可见
     */
    visible: null,

    /**
     * Property: timeWindows
     * {Array(String)} 卫星关联的时间窗
     */
    timeWindows: null,

    /**
     * Constructor: SuperMap.Geometry.Satellite
     * 创建一个标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.Satellite>} 新的标绘对象。
     */
    initialize: function (options) {
        SuperMap.Geometry.GeoGraphicObject.prototype.initialize.apply(this, arguments);

        //this.minEditPts = 1;
        //this.maxEditPts = 1;

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.SATELLITE;
        this.symbolType = SuperMap.Plot.SymbolType.SATELLITE;
        this.symbolName = "Satellite";

        if(this.visible === null){
            this.visible = true;
        }

        if(this.timeWindows === null){
            this.timeWindows = [];
        }
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.orbitPoints !== null){
            if(this.visible){
                if(this.controlPoints === null || this.controlPoints.length === 0){
                    for(var i = 0; i < this.orbitPoints.length; i++){
                        this.controlPoints.push(new SuperMap.Geometry.Point(this.orbitPoints[i].x, this.orbitPoints[i].y));
                    }
                } else {
                    for(var i = 0, len = this.orbitPoints.length; i < len; i++) {
                        this.orbitPoints[i].x = this.controlPoints[i].x;
                        this.orbitPoints[i].y = this.controlPoints[i].y;
                    }
                }

                var controlPoints = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
                var geometryLine = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.POLYLINESYMBOL, controlPoints);
                geometryLine.style = {surroundLineFlag: false};
                this.components.push(geometryLine);
            }

            var indexPos = Math.floor(this.orbitPoints.length / 2);
            var positionPoint = new SuperMap.Geometry.Point(this.orbitPoints[indexPos].x, this.orbitPoints[indexPos].y);
            var libID = this.subSymbol.libID;
            var code = this.subSymbol.code;
            var dRadian = SuperMap.Plot.PlottingUtil.radian(positionPoint, new SuperMap.Geometry.Point(this.orbitPoints[indexPos-1].x, this.orbitPoints[indexPos-1].y));
            this.subSymbol.symbolData.dRotate = dRadian * 180 / Math.PI;
            this.subSymbol.symbolData.textContent = this.textContent;
            this.subSymbol.symbolData.annotationPosition = 7;
            var geometry = SuperMap.Geometry.PlottingGeometry.createGeometry(libID, code, [positionPoint], {symbolData: this.subSymbol.symbolData, layer: this.layer, feature: this.feature});
            geometry.style = {surroundLineFlag: false};
            geometry.scaleByMap = true;
            this.components.push(geometry);
        }
    },

    /**
     * Method: calculateBounds
     * 通过遍历数组重新计算边界，在遍历每一子项中时调用 extend 方法。
     */
    calculateBounds: function() {
        this.clearBounds();
        this.bounds = null;
        var bounds = new SuperMap.Bounds();
        var components = this.components;
        if (components) {
            for (var i = 0; i < components.length; i++) {
                if(components[i] instanceof SuperMap.Geometry.GeoText){
                    var style = components[i].style;
                    if(style){
                        style = SuperMap.Util.copyAttributes(style, components[i].style);
                    }
                    bounds.extend(components[i].getBoundsByText(this.layer.map, style));
                } else {
                    if(components[i] instanceof SuperMap.Geometry.DotSymbol ){
                        bounds.extend(components[i].getBoundsWithText());
                    } else {
                        bounds.extend(components[i].getBounds());
                    }
                }
            }
        }

        if (bounds.left != null && bounds.bottom != null &&
            bounds.right != null && bounds.top != null) {
            this.setBounds(bounds);
        }
    },

    parseSymbolData: function() {
        SuperMap.Geometry.GroupObject.prototype.parseSymbolData.apply(this, arguments);

        //自己特有
        if(!!this.symbolData){
            this.subSymbol = this.symbolData.subSymbol;
            this.visible = this.symbolData.visible;
            this.orbitPoints = this.symbolData.orbitPoints;
        }
    },

    /**
     * Method: setSymbolData
     * 设置标号数据。
     *
     */
    setSymbolData: function() {
        SuperMap.Geometry.GeoGraphicObject.prototype.setSymbolData.apply(this, arguments);

        //设置对象自己特有的属性到symbolData
        if(!!this.symbolData){
            this.symbolData.subSymbol = this.subSymbol;
            this.symbolData.visible = this.visible;
            this.symbolData.orbitPoints = this.orbitPoints;
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
        SuperMap.Geometry.GeoGraphicObject.prototype.move.apply(this, arguments);

        for(var i = 0, len = this.orbitPoints.length; i < len; i++) {
            this.orbitPoints[i].x += x;
            this.orbitPoints[i].y += y;
        }

        for (var i = 0; i < this.timeWindows.length; i++) {
            var timeWindow = this.timeWindows[i];
            if (null === timeWindow) {
                continue;
            }

            if (timeWindow instanceof SuperMap.Geometry.SatelliteTimeWindows) {
                timeWindow.calculateParts();
            }
        }
    },

    /**
     * Method: resizeControlPoints
     * 根据拖动的手柄位置，改变编辑点坐标
     */
    resizeControlPoints: function(pixel, nHandle, oldBounds, controlPoints) {
        SuperMap.Geometry.GeoGraphicObject.prototype.resizeControlPoints.apply(this, arguments);

        for(var i = 0, len = this.orbitPoints.length; i < len; i++) {
            this.orbitPoints[i].x = this.controlPoints[i].x;
            this.orbitPoints[i].y = this.controlPoints[i].y;
        }

        for (var i = 0; i < this.timeWindows.length; i++) {
            var timeWindow = this.timeWindows[i];
            if (null === timeWindow) {
                continue;
            }

            if (timeWindow instanceof SuperMap.Geometry.SatelliteTimeWindows) {
                timeWindow.calculateParts();
            }
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
        SuperMap.Geometry.GeoGraphicObject.prototype.rotate.apply(this, arguments);

        for(var i = 0, len = this.orbitPoints.length; i < len; i++) {
            this.orbitPoints[i].x = this.controlPoints[i].x;
            this.orbitPoints[i].y = this.controlPoints[i].y;
        }

        for (var i = 0; i < this.timeWindows.length; i++) {
            var timeWindow = this.timeWindows[i];
            if (null === timeWindow) {
                continue;
            }

            if (timeWindow instanceof SuperMap.Geometry.SatelliteTimeWindows) {
                timeWindow.calculateParts();
            }
        }
    },

    /**
     * Method: reView
     * 根据点标号的原始信息重新计算 符号所在的位置
     *（用于地图缩放的时候重新计算  更换原来feature 中各个geometry的components  让原来的geometry不发生变化。）
     * @param feature
     */
    reView: function () {
        for(var i = 0, len = this.components.length; i < len; i++) {
            if(this.components[i] instanceof SuperMap.Geometry.DotSymbol){
                this.components[i].reView();
            }
        }
    },
    clone:function(){
        var geometry = SuperMap.Geometry.GeoGraphicObject.prototype.clone.apply(this, arguments);
        geometry.orbitPoints = SuperMap.Plot.PlottingUtil.clonePoints(this.orbitPoints);
        geometry.subSymbol = new Object(this.subSymbol);
        return geometry;
    },

    CLASS_NAME: "SuperMap.Geometry.Satellite"
});