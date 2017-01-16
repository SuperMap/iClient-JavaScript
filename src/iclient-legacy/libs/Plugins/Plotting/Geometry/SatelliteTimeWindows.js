/**
 * Class: SuperMap.Geometry.SatelliteTimeWindows
 * SatelliteTimeWindows。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.SatelliteTimeWindows = new SuperMap.Class(SuperMap.Geometry.GeoGraphicObject,{

    /**
     * APIProperty: timeWindows
     * {Array(<SuperMap.Plot.TimeWindowParameter>)} 可见时间窗的起始点数组
     */
    timeWindows: null,

    /**
     * APIProperty: type
     * {String} 序号("Number")或者时间("Time")
     */
    type: null,

    /**
     * Constructor: SuperMap.Geometry.SatelliteTimeWindows
     * 创建一个标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.SatelliteTimeWindows>} 新的标绘对象。
     */
    initialize: function (options) {
        SuperMap.Geometry.GeoGraphicObject.prototype.initialize.apply(this, arguments);

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.SATELLITETIMEWINDOWS;
        this.symbolType = SuperMap.Plot.SymbolType.SATELLITETIMEWINDOWS;
        this.symbolName = "SatelliteTimeWindows";
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //清空原有的所有点
        this.components = [];

        var feature = this.layer.getFeatureByUuid(this.associatedUuid);

        if(feature === null || feature.geometry.orbitPoints === null){
            return;
        }

        var bAdd = false;
        for(var i = 0; i < feature.geometry.timeWindows.length; i++){
            if(this === feature.geometry.timeWindows[i]){
                bAdd = true;
                break;
            }
        }

        if(!bAdd){
            feature.geometry.timeWindows.push(this);
        }

        if(this.timeWindows !== null){
            var orbitPoints = feature.geometry.orbitPoints;

            for(var i = 0; i < this.timeWindows.length; i++){
                var startOrbitPt, endOrbitPt;
                if(this.type === "Number"){
                    for(var j = 0; j < orbitPoints.length; j++){
                        if(this.timeWindows[i].startOrbitPoint === orbitPoints[j].number){
                            startOrbitPt = j; //new SuperMap.Geometry.Point(this.orbitPoints[j].x, this.orbitPoints[j].y)
                        }

                        if(this.timeWindows[i].endOrbitPoint === orbitPoints[j].number){
                            endOrbitPt = j; //new SuperMap.Geometry.Point(this.orbitPoints[j].x, this.orbitPoints[j].y)
                            break;
                        }
                    }
                } else {
                    for(var j = 0; j < orbitPoints.length; j++){
                        if(this.timeWindows[i].startOrbitPoint === orbitPoints[j].time){
                            startOrbitPt = j; //new SuperMap.Geometry.Point(this.orbitPoints[j].x, this.orbitPoints[j].y)
                        }

                        if(this.timeWindows[i].endOrbitPoint === orbitPoints[j].time){
                            endOrbitPt = j; //new SuperMap.Geometry.Point(this.orbitPoints[j].x, this.orbitPoints[j].y)
                            break;
                        }
                    }
                }

                var controlPoints = [];
                for(var k = startOrbitPt; k <= endOrbitPt; k++){
                    controlPoints.push(new SuperMap.Geometry.Point(orbitPoints[k].x, orbitPoints[k].y));
                }

                var geometryLine = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.POLYLINESYMBOL, controlPoints);
                geometryLine.style = {surroundLineFlag: false, lineWidthLimit: true, strokeWidth: feature.style.strokeWidth*4 + this.feature.style.strokeWidth};
                this.components.push(geometryLine);
            }
        }
    },

    /**
     * Method: calculateBounds
     * 通过遍历数组重新计算边界，在遍历每一子项中时调用 extend 方法。
     */
    calculateBounds: function() {
        this.bounds = null;
        var bounds = new SuperMap.Bounds();
        var components = this.components;
        if (components) {
            for (var i = 0; i < components.length; i++) {
                bounds.extend(components[i].getBounds());
            }
        }

        if (bounds.left != null && bounds.bottom != null &&
            bounds.right != null && bounds.top != null) {
            this.setBounds(bounds);
        }
    },

    parseSymbolData: function() {
        SuperMap.Geometry.GeoGraphicObject.prototype.parseSymbolData.apply(this, arguments);

        //自己特有
        if(!!this.symbolData){
            this.timeWindows = this.symbolData.timeWindows;
            this.type = this.symbolData.type;
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
            this.symbolData.timeWindows = this.timeWindows;
            this.symbolData.type = this.type;
        }
    },

    CLASS_NAME: "SuperMap.Geometry.SatelliteTimeWindows"
});