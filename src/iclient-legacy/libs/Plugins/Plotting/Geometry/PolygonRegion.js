/**
 * Class: SuperMap.Geometry.PolygonRegion
 * 区域管理对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.PolygonRegion = new SuperMap.Class(SuperMap.Geometry.GeoGraphicObject,{

    /**
     * APIProperty: textPosition
     * {Integer} 文字位置，0标识中心点，1,2...表示某个索引位置点的附近。
     */
    textPosition: null,

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

        this.minEditPts = 3;
        this.maxEditPts = 9999;

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.POLYGONREGION;
        this.symbolType = SuperMap.Plot.SymbolType.POLYGONREGION;
        this.symbolName = "PolygonRegion";
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
        //清空原有的所有点
        //this.components = [];
        this.init();

        if (this.controlPoints !== null && this.controlPoints.length >= this.minEditPts) {
            this.components = [];
            var tempPoints = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(32, tempPoints);
            geometry.style = {surroundLineFlag: false};
            this.components.push(geometry);

            var clockwise=SuperMap.Plot.PlottingUtil.IsPloyClockwise(this.controlPoints);

            //clockwise=-1;
            if (this.textContent && this.textContent !== null && this.textContent.length > 0) {
                var angle = 0;
                var textLocation = [];
                if( !this.textPosition || this.textPosition === null || this.textPosition === 0){
                    geometry.clearBounds();
                    var centerLonLat = geometry.getBounds().getCenterLonLat();
                    textLocation = [new SuperMap.Geometry.Point(centerLonLat.lon, centerLonLat.lat)];
                } else {
                    if(clockwise===1) {
                        if (this.textPosition < this.controlPoints.length - 1) {
                            textLocation = [this.controlPoints[this.textPosition - 1]];
                            angle = -SuperMap.Plot.PlottingUtil.radian(this.controlPoints[this.textPosition - 1], this.controlPoints[this.textPosition]) / Math.PI * 180;
                        } else {
                            textLocation = [this.controlPoints[this.controlPoints.length - 1]];
                            angle = -SuperMap.Plot.PlottingUtil.radian(this.controlPoints[this.controlPoints.length - 1], this.controlPoints[0]) / Math.PI * 180;
                        }
                    }
                    else{
                        textLocation = [this.controlPoints[this.textPosition - 1]];
                        if (this.textPosition === 1) {
                            angle = -SuperMap.Plot.PlottingUtil.radian(this.controlPoints[0 ], this.controlPoints[this.controlPoints.length - 1]) / Math.PI * 180;
                        } else {
                            angle = -SuperMap.Plot.PlottingUtil.radian(this.controlPoints[this.textPosition-1], this.controlPoints[this.textPosition - 2]) / Math.PI * 180;
                        }
                    }
                }

                var geometryText = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(34, textLocation, this.textContent);
                geometryText.style = {labelRotation: angle, surroundLineFlag: false, labelAlign: "lt"};
                this.components.push(geometryText);
                var scalePoint = new SuperMap.Geometry.Point(textLocation[0].x, textLocation[0].y);
                scalePoint.isScalePoint = true;
                scalePoint.tag = 0;

                this.scalePoints = [];
                this.scalePoints.push(scalePoint);
            }
        } else if(this.controlPoints.length >= 2 && this.controlPoints.length < this.minEditPts){
            this.calAssistantLine();
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
        if (pt.isScalePoint === true) {
            var textPos = 0;
            var ptCenter = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(this.controlPoints);
            var dis = SuperMap.Plot.PlottingUtil.distance(pt, ptCenter);

            for(var i = 0; i < this.controlPoints.length; i++){
                var tempDis = SuperMap.Plot.PlottingUtil.distance(pt, this.controlPoints[i]);

                if(dis > tempDis){
                    textPos = i+1;
                    dis = tempDis;
                }
            }

            this.textPosition = textPos;
        }

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
        var geo = SuperMap.Geometry.GeoGraphicObject.prototype.clone.apply(this, arguments);

       geo.textPosition = this.textPosition;

        return geo;
    },

    /**
     * Method: parseSymbolData
     * 解析标号数据。
     *
     */
    parseSymbolData: function() {
        SuperMap.Geometry.GroupObject.prototype.parseSymbolData.apply(this, arguments);

        //自己特有
        if(!!this.symbolData){
            this.textPosition = this.symbolData.textPosition;
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
            this.symbolData.textPosition = this.textPosition;
        }
    },

    CLASS_NAME:"SuperMap.Geometry.PolygonRegion"
});