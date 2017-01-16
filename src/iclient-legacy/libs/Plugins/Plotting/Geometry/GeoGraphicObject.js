/* COPYRIGHT 2016 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Geometry.js
 * @requires SuperMap/Geometry/Collection.js
 */

/**
 * Class: SuperMap.Geometry.GeoGraphicObject
 * 标绘几何对象类。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.PlottingGeometry>
 */
SuperMap.Geometry.GeoGraphicObject = SuperMap.Class(SuperMap.Geometry.PlottingGeometry,{

    /**
     * Property: surroundLineType
     * {Integer} 标号的衬线类型
     */
    surroundLineType: null,

    /**
     * APIProperty: symbolDefaultStyle
     * {Object} 标号对象的默认样式，在不访问服务器时使用symbolDefaultStyle绘制标号
     */
    symbolDefaultStyle: {},

    /**
     * APIProperty: maxScale
     * {Integer} 点标号最大缩放比例
     */
    maxScale: 5,

    /**
     * APIProperty: minScale
     * {Integer} 点标号的最小缩放比例
     */
    minScale: 1,

    /**
     * APIMethod: getSymbolSize
     * 获取点标号的大小
     *
     * Returns:
     * {<SuperMap.Size>} 返回点标号的大小。
     */
    getSymbolSize:function(){},

    /**
     * APIMethod: setSymbolSize
     * 设置点标号的旋转角度
     *
     * Parameters:
     * rotateValue - {Float} 点标号的旋转角度。
     */
    setSymbolSize:function(width, height){},

    /**
     * APIMethod: getSymbolRank
     * 获取标号的符号等级
     *
     * Returns:
     * {Integer} 返回标号的符号等级。
     */
    getSymbolRank:function(){},

    /**
     * APIMethod: setSymbolRank
     * 设置标号的符号等级
     *
     * Parameters:
     * rank - {Integer} rank。
     */
    setSymbolRank:function(rank){},

    /**
     * APIMethod: getNegativeImage
     * 获取图形对象的镜像（只对点标号有效）
     *
     * Returns:
     * {Boolean} 图形对象的镜像。
     */
    getNegativeImage:function(){},

    /**
     * APIMethod: setNegativeImage
     * 设置图形对象的镜像（只对点标号有效）
     *
     * Parameters:
     * mirror - {Boolean} 镜像。
     */
    setNegativeImage:function(mirror){},

    /**
     * APIMethod: getTextPosition
     * 获取注记文本的位置
     *
     * Returns:
     * {Object} 返回注记文本的位置。
     */
    getTextPosition:function(){},

    /**
     * APIMethod: setTextPosition
     * 设置注记文本的位置
     *
     * Parameters:
     * position - {Object} 注记文本的位置。
     */
    setTextPosition:function(position){},

    /**
     * APIMethod: getSurroundLineType
     * 获取标号的衬线类型
     *
     * Returns:
     * {int} 返回标号的衬线类型。
     */
    getSurroundLineType:function(){
        return this.surroundLineType;
    },

    /**
     * APIMethod: setSurroundLineType
     * 设置标号的衬线类型
     *
     * Parameters:
     * surroundLineType - {int} 标号的衬线类型。
     */
    setSurroundLineType:function(surroundLineType){},

    /**
     * Constructor: SuperMap.Geometry.GeoGraphicObject
     * 创建一个标绘对象。可以使用SuperMap.Geometry.GeoGraphicObject.getGeometry函数创建新的标绘对象
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.GeoGraphicObject>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.PlottingGeometry.prototype.initialize.apply(this, arguments);

        if(this.surroundLineType === null){
            this.surroundLineType = SuperMap.Plot.AlgoSurroundLineType.NONE;
        }
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        this.map = null;
        //this.serverUrl = null;
        this.symbolData = null;
        this.libID = null;
        this.code = null;
        this.surroundLineType = null;

        SuperMap.Geometry.PlottingGeometry.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: init
     * 初始化标号
     *
     */
    init: function(){
        for(var i = 0; i < this.components.length; i++){
            if(this.components[i] instanceof SuperMap.Geometry.GeoGraphicObject){
                this.removeComponent(this.components[i].components);
            } else {
                this.removeComponent(this.components[i]);
            }
        }

        //清空原有图元
        this.components = [];

        //清空比例点数组
        this.scalePoints = [];
    },

    /**
     * Method: init
     * 初始化标号
     *
     */
    removeComponent: function(components){
        var t = this.layer;
        //对于多线对象，各个标签都有后缀“_clip_i”,该方法用于确保将裁剪后的多段线都删掉
        function loopRemoveDom(id,i){
            if(i){
                var a = document.getElementById(id+"_clip_"+i);
                i++;
            }
            else{
                var a = document.getElementById(id);
                i=1;
            }
            if(a)
            {
                if(t.renderer.vectorRoot.hasChildNodes() === true){
                    for(var i = 0; i < t.renderer.vectorRoot.childNodes.length; i++){
                        if(t.renderer.vectorRoot.childNodes[i] === a){
                            t.renderer.vectorRoot.removeChild(a);
                            loopRemoveDom(id, i);
                        }
                    }
                }
            }
        }

        if(!SuperMap.Util.isArray(components)){
            components = [components];
        }

        for(var i = 0; i < components.length; i++){
            var prevGeometryID = null;
            if(components[i] instanceof SuperMap.Geometry.GeoText){
                prevGeometryID = this.feature.id + "_" + components[i].id + "_label";
                loopRemoveDom(prevGeometryID);
                prevGeometryID = this.feature.id + "_" + components[i].id + "_background";
                loopRemoveDom(prevGeometryID);
                prevGeometryID = this.feature.id + "_" + components[i].id + "_shadow";
                loopRemoveDom(prevGeometryID);
            } else {
                prevGeometryID = components[i].id;
                loopRemoveDom(prevGeometryID);
            }
        }
    },

    /**
     * Method: calAssistantLine
     * 计算铺助线
     */
    calAssistantLine: function () {
        var tempPoints = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        if(this.symbolType === SuperMap.Plot.SymbolType.ANNOFRAMESYMBOL){
            tempPoints.splice(1, 0, new SuperMap.Geometry.Point(this.controlPoints[1].x, this.controlPoints[0].y));
            tempPoints.push(new SuperMap.Geometry.Point(this.controlPoints[0].x, this.controlPoints[1].y));
            tempPoints.push(new SuperMap.Geometry.Point(this.controlPoints[0].x, this.controlPoints[0].y));
        }
        var symbolCell = {
            type: 24,
            surroundLineFlag: false,
            positionPoints: tempPoints,
            style: {
                strokeColor: "#0000ff",
                strokeOpacity: 1.0,
                strokeWidth: 2,
                strokeDashstyle: "dash",
                lineColorLimit: true,
                lineTypeLimit: true,
                lineWidthLimit: true,
                surroundLineFlag: false
            }
        };

        var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(symbolCell.type, symbolCell.positionPoints, symbolCell.textContent, 0.0);
        geometry.style = symbolCell.style;
        this.components.push(geometry);
    },

    /**
     * APIMethod: clone
     * 克隆当前几何对象。
     *
     * Returns:
     * {<SuperMap.Geometry.GeoGraphicObject>} 克隆的几何对象集合。
     */
    clone: function () {
        var copySymbolData = null;
        if(this.symbolData !== null){
            copySymbolData = {};
            copySymbolData = SuperMap.Util.copyAttributes(copySymbolData, this.symbolData);
        }

        var geometry = SuperMap.Geometry.PlottingGeometry.createGeometry(this.libID, this.code, this.positionPoints, {symbolData: copySymbolData, layer: this.layer});

        geometry.controlPoints = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        geometry.scaleByMap = this.scaleByMap;
        geometry.surroundLineType = this.surroundLineType;
        geometry.textContent = this.textContent;

        //if(this.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
        //    //geometry.leadLinePoints = SuperMap.Plot.PlottingUtil.clonePoints(this.leadLinePoints);
        //    geometry.annotationIndex = this.annotationIndex;
        //    geometry.dRotate = this.dRotate;
        //    geometry.textPosition = this.textPosition;
        //    geometry.positionOffsetX = this.positionOffsetX;
        //    geometry.positionOffsetY = this.positionOffsetY;
        //
        //    geometry.symbolSize.h = this.symbolSize.h;
        //    geometry.symbolSize.w = this.symbolSize.w;
        //    geometry.dScale = this.dScale;
        //    if(undefined !== geometry.symbolData && null !== geometry.symbolData){
        //        geometry.symbolData.scale2D.x = this.dScale;
        //    }
        //
        //} else {
        //    geometry.controlPoints = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        //    geometry.dOffset = this.dOffset;
        //
        //    if(this.symbolData === null){
        //        if(this.subSymbols){
        //            geometry.subSymbols = [];
        //            for(var i = 0; i < this.subSymbols.length; i++){
        //                //var subSymbol = {};
        //                //subSymbol = SuperMap.Util.copyAttributes(subSymbol, this.subSymbols[i]);
        //                geometry.subSymbols.push(this.subSymbols[i].clone());
        //            }
        //        }
        //
        //        if(this.subSymbolScaleValue){
        //            geometry.subSymbolScaleValue = this.subSymbolScaleValue;
        //        }
        //
        //        if(this.scaleValues){
        //            geometry.scaleValues = [];
        //            for(var i = 0; i < this.scaleValues.length; i++){
        //                geometry.scaleValues.push(this.scaleValues[i]);
        //            }
        //        }
        //    }
        //}

        return geometry;
    },

    getTextWidth: function(style, text) {
        if(text === " "){
            text = "_";
        }
        var element = document.createElement('span');
        document.body.appendChild(element);
        element.style.width = 'auto';
        element.style.height = 'auto';
        if(style.fontSize) element.style.fontSize = style.fontSize;
        if(style.fontFamily) element.style.fontFamily = style.fontFamily;
        if(style.fontWeight) element.style.fontWeight = style.fontWeight;
        element.style.position = 'absolute';
        element.style.visibility = 'hidden';
        element.innerHTML = text;
        var textWidth = element.clientWidth;
        document.body.removeChild(element);
        return textWidth;
    },

    /**
     * Method: parseSymbolData
     * 解析标号数据。
     *
     */
    parseSymbolData: function() {
        SuperMap.Geometry.PlottingGeometry.prototype.parseSymbolData.apply(this, arguments);

        if(this.symbolData !== null){
            var basicInfo = SuperMap.Plot.AnalysisSymbol.analysisBasicInfo(this.symbolData);
            this.symbolName = basicInfo.symbolName;
            this.minEditPts = basicInfo.minEditPts;
            this.maxEditPts = basicInfo.maxEditPts;
            this.surroundLineType = basicInfo.surroundLineType;

        }
    },

    /**
     * Method: setSymbolData
     * 设置标号数据。
     *
     */
    setSymbolData: function() {
        SuperMap.Geometry.PlottingGeometry.prototype.setSymbolData.apply(this, arguments);

        if(!!this.symbolData){
            this.symbolData.surroundLineType = this.surroundLineType;
        }
    },

    CLASS_NAME: "SuperMap.Geometry.GeoGraphicObject"
});