/**
 * Class: SuperMap.Geometry.DotSymbol
 * 点标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */

SuperMap.Geometry.DotSymbol = new SuperMap.Class(SuperMap.Geometry.GeoGraphicObject, {

    /**
     * APIProperty: symbolRank
     * {Integer} 点标号的标号等级
     */
    symbolRank: null,

    /**
     * APIProperty: negativeImage
     * {Boolean} 点标号的镜像
     */
    negativeImage: null,

    /**
     * APIProperty: textPosition
     * {Integer} 标号的注记位置
     */
    textPosition: null,

    /**
     * Property: annotationIndex
     * {Integer} 点标号的注记图元的索引
     */
    annotationIndex: -1,

    /**
     * APIProperty: symbolSizeInLib
     * {<SuperMap.Size>} 点标号的在标号库中的大小
     */
    symbolSizeInLib: null,

    /**
     * APIProperty: symbolSize
     * {<SuperMap.Size>} 点标号的大小
     */
    symbolSize: null,

    /**
     * Property: initialScale
     * {Integer} 点标号的原始尺寸比例
     */
    initialScale: null,

    /**
     * Property: middleMarkBounds
     * {<SuperMap.Bounds>} 点标号的中间注记范围
     */
    middleMarkBounds: null,

    /**
     * APIProperty: space
     * {Integer} 标号和注记的距离，单位是像素
     */
    space: 7,

    /**
     * APIProperty: textDisplay
     * {Boolean} 注记是否显示
     */
    textDisplay: true,

    /**
     * APIProperty: flagTextSize
     * {Integer} 生成旗面文字的字号
     */
    flagTextSize: 60,

    /**
     * Property: joinLine
     * {Array<SuperMap.Geometry.LineRelation | SuperMap.Geometry.NavyDeployment>} 连接线数组
     */
    joinLines: null,

    ///**
    // * Property: leadLinePoints
    // * {SuperMap.Geometry.Point} 点类型标号的牵引点
    // */
    //leadLinePoints: null,

    /**
     * Property: eidtLeadLinePoints
     * {SuperMap.Geometry.Point} 是否编辑牵引线
     */
    eidtLeadLinePoints:false,

    /**
     * Property: positionOffset
     * {Boolean} 位置点偏移
     */
    positionOffset :false,

    /**
     * Property: positionOffsetX
     * {Float} 位置点X方向上偏移
     */
    positionOffsetX :false,

    /**
     * Property: positionOffsetY
     * {Float} 位置点Y方向上偏移
     */
    positionOffsetY :false,

    /**
     * APIMethod: setPositionOffset
     * 设置位置是否偏移
     *
     * Parameters:
     * positionOffset - {Boolean} 位置是否偏移。
     *
     */
    setPositionOffset: function(positionOffset){
        if(this.positionOffset === positionOffset){
            return;
        }

        this.positionOffset = positionOffset;
        if(this.positionOffset === false){
            //this.controlPoints[0] = this.leadLinePoints[0].clone();
            this.positionOffsetX = 0;
            this.positionOffsetY = 0;
        }

        this.calculateParts();
        this.layer.drawFeature(this.feature);
        this.layer.events.triggerEvent("featuremodified",
            {feature: this.feature});
    },

    /**
     * APIMethod: setPositionOffset
     * 获取位置是否偏移
     *
     * Returns:
     * {Boolean} 位置是否偏移。
     *
     */
    getPositionOffset: function(){
        return this.positionOffset;
    },

    /**
     * APIMethod: getSymbolSize
     * 获取点标号的大小
     *
     * Returns:
     * {<SuperMap.Size>} 返回点标号的大小。
     */
    getSymbolSize: function () {
        return this.symbolSize;
    },

    /**
     * APIMethod: setSymbolSize
     * 设置点标号的大小
     *
     * Parameters:
     * width - {Float} 点标号的宽度。
     * height - {Float} 点标号的高度。
     */
    setSymbolSize: function (width, height) {
        if(0 === this.symbolSizeInLib.w || 0 === this.symbolSizeInLib.h){
            this.initialScale = 1;
        }
        else{
            var scaleX = width / this.dScale / this.symbolSizeInLib.w;
            var scaleY = height / this.dScale /  this.symbolSizeInLib.h;
            if (this.initialScale !== scaleX) {
                this.initialScale = scaleX;
            } else if (this.initialScale !== scaleY) {
                this.initialScale = scaleY;
            }
        }

        this.symbolSize.w = this.initialScale * this.dScale * this.symbolSizeInLib.w;
        this.symbolSize.h = this.initialScale * this.dScale * this.symbolSizeInLib.h;

        if(this.fontSize === undefined){
            this.fontSize = this.feature.style.fontSize;
        }
        this.feature.style.fontSize = this.fontSize * this.dScale * this.initialScale;
        this.prevFontSize = this.feature.style.fontSize;

        this.calculateParts();
        this.layer.drawFeature(this.feature);

        this.layer.events.triggerEvent("featuremodified",
            {feature: this.feature});
    },

    /**
     * APIMethod: setRotate
     * 设置点标号的旋转角度
     *
     * Parameters:
     * rotateValue - {float} 点标号的旋转角度。
     */
    setRotate: function (rotateValue) {
        if (!isNaN(rotateValue)) {
            this.dRotate = rotateValue;
            this.symbolData.rotate2D.x = this.dRotate;
            this.calculateParts();
            this.layer.drawFeature(this.feature);

            this.layer.events.triggerEvent("featuremodified",
                {feature: this.feature});
        }
    },

    /**
     * APIMethod: getScale
     * 获取点标号的比例值
     *
     * Returns:
     * {float} 返回点标号的比例值。
     */
    getScale: function () {
        return this.initialScale;
    },

    /**
     * APIMethod: setScale
     * 设置点标号的比例值
     *
     * Parameters:
     * scaleValue - {float} 点标号的比例值。
     */
    setScale: function (scaleValue) {
        if (!isNaN(scaleValue)) {

            this.initialScale = scaleValue;
            //this.actualScale = this.dScale;
            this.symbolSize.w = this.initialScale * this.dScale * this.symbolSizeInLib.w;
            this.symbolSize.h = this.initialScale * this.dScale * this.symbolSizeInLib.h;

            if(this.fontSize === undefined){
                this.fontSize = this.feature.style.fontSize;
            }
            this.feature.style.fontSize = this.fontSize * this.dScale * this.initialScale;
            this.prevFontSize = this.feature.style.fontSize;

            this.calculateParts();
            this.layer.drawFeature(this.feature);

            this.layer.events.triggerEvent("featuremodified",
                {feature: this.feature});
        }
    },

    /**
     * APIMethod: getSymbolRank
     * 获取标号的符号等级
     *
     * Returns:
     * {int} 返回标号的符号等级。
     */
    getSymbolRank: function () {
        return this.symbolRank;
    },

    /**
     * APIMethod: setSymbolRank
     * 设置标号的符号等级
     *
     * Parameters:
     * rank - {Int} rank。
     */
    setSymbolRank: function (rank) {
        // 获取数据成功
        function getCompleted(result) {
            this.symbolData.innerCells = result.originResult.innerCells;
            this.symbolRank = result.originResult.symbolRank;
            //重新计算标绘扩展符号的geometry
            this.calculateParts();
            this.layer.drawFeature(this.feature);

            this.layer.events.triggerEvent("featuremodified",
                {feature: this.feature});
            return false;

        }

        //获取数据失败
        function getFailed(result) {
            return;
        }

        //对接iserver中的服务
        var getSymbolInfo = new SuperMap.REST.GetSymbolInfoService(this.layer.serverUrl);
        getSymbolInfo.events.on({
            "processCompleted": getCompleted,
            "processFailed": getFailed,
            scope: this
        });

        var getSymbolInfoParams = new SuperMap.REST.GetSymbolInfoParameters();
        getSymbolInfoParams.libID = this.libID;
        getSymbolInfoParams.code = this.code;
        getSymbolInfoParams.symbolRank = rank;
        getSymbolInfoParams.negativeImage = this.negativeImage;
        getSymbolInfoParams.surroundLineType = this.surroundLineType;
        getSymbolInfo.processAsync(getSymbolInfoParams);
    },

    /**
     * APIMethod: getNegativeImage
     * 获取图形对象的镜像（只对点标号有效）
     *
     * Returns:
     * {Int} 图形对象的镜像；0：无镜像；1：左右镜像；2：上下镜像；3左右+上下镜像。
     */
    getNegativeImage: function () {
        return this.negativeImage;
    },

    /**
     * APIMethod: setNegativeImage
     * 设置图形对象的镜像（只对点标号有效）
     *
     * Parameters:
     * mirror - {Int} 镜像；0：无镜像；1：左右镜像；2：上下镜像；3左右+上下镜像。
     */
    setNegativeImage: function (mirror) {
        // 获取数据成功
        function getCompleted(result) {
            this.symbolData.innerCells = result.originResult.innerCells;
            this.negativeImage = result.originResult.negativeImage;
            //重新计算标绘扩展符号的geometry
            this.calculateParts();
            this.layer.drawFeature(this.feature);

            this.layer.events.triggerEvent("featuremodified",
                {feature: this.feature});
        }

        //获取数据失败
        function getFailed(result) {
            return;
        }

        //对接iserver中的服务
        var getSymbolInfo = new SuperMap.REST.GetSymbolInfoService(this.layer.serverUrl);
        getSymbolInfo.events.on({
            "processCompleted": getCompleted,
            "processFailed": getFailed,
            scope: this
        });

        var getSymbolInfoParams = new SuperMap.REST.GetSymbolInfoParameters();
        getSymbolInfoParams.libID = this.libID;
        getSymbolInfoParams.code = this.code;
        getSymbolInfoParams.negativeImage = mirror;
        getSymbolInfoParams.symbolRank = this.symbolRank;
        getSymbolInfoParams.surroundLineType = this.surroundLineType;
        getSymbolInfo.processAsync(getSymbolInfoParams);
    },

    /**
     * APIMethod: setSurroundLineType
     * 设置标号的衬线类型
     *
     * Parameters:
     * surroundLineType - {int} 标号的衬线类型。
     */
    setSurroundLineType: function (surroundLineType) {
        // 获取数据成功
        function getCompleted(result) {
            this.symbolData.innerCells = result.originResult.innerCells;
            this.surroundLineType = result.originResult.surroundLineType;
            //重新计算标绘扩展符号的geometry

            this.calculateParts();
            this.layer.drawFeature(this.feature);
            this.layer.events.triggerEvent("featuremodified",
                {feature: this.feature});
        }

        //获取数据失败
        function getFailed(result) {
            return;
        }

        //对接iserver中的服务
        var getSymbolInfo = new SuperMap.REST.GetSymbolInfoService(this.layer.serverUrl);
        getSymbolInfo.events.on({
            "processCompleted": getCompleted,
            "processFailed": getFailed,
            scope: this
        });

        var getSymbolInfoParams = new SuperMap.REST.GetSymbolInfoParameters();
        getSymbolInfoParams.libID = this.libID;
        getSymbolInfoParams.code = this.code;
        getSymbolInfoParams.negativeImage = this.negativeImage;
        getSymbolInfoParams.symbolRank = this.symbolRank;
        getSymbolInfoParams.surroundLineType = surroundLineType;
        getSymbolInfo.processAsync(getSymbolInfoParams);
    },

    /**
     * APIMethod: getTextPosition
     * 获取注记文本的位置
     *
     * Returns:
     * {Object} 返回注记文本的位置。
     */
    getTextPosition: function () {
        return this.textPosition;
    },

    /**
     * APIMethod: setTextPosition
     * 设置注记文本的位置
     *
     * Parameters:
     * position - {Object} 注记文本的位置。
     */
    setTextPosition: function (position) {
        this.textPosition = position;
        this.calculateParts();
        this.layer.drawFeature(this.feature);
        this.layer.events.triggerEvent("featuremodified",
            {feature: this.feature});
    },

    /**
     * Constructor: SuperMap.Geometry.DotSymbol
     * 创建一个点标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Geometry.DotSymbol>} 新的标绘对象。
     */
    initialize: function (options) {
        SuperMap.Geometry.GeoGraphicObject.prototype.initialize.apply(this, arguments);
        this.joinLines = [];

        //if(this.leadLinePoints === null){
        //    this.leadLinePoints = [];
        //}

        if(this.positionOffsetX === null){
            this.positionOffsetX = 0;
        }

        if(this.positionOffsetY === null){
            this.positionOffsetY = 0;
        }

        if(this.initialScale === null){
            var symbolSize = this.symbolSizeInLib.w;
            var actualSymbolSize = this.symbolSize.w;
            if(this.symbolSizeInLib.w < this.symbolSizeInLib.h){
                symbolSize = this.symbolSizeInLib.h;
                actualSymbolSize = this.symbolSize.h;
            }

            this.initialScale = actualSymbolSize / symbolSize;
            this.symbolSize.w = this.initialScale * this.symbolSizeInLib.w;
            this.symbolSize.h = this.initialScale * this.symbolSizeInLib.h;
        }

        this.actualScale = this.dScale;
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        this.symbolRank = null;
        this.negativeImage = null;
        this.annotationIndex = -1;
        this.textPosition = null;
        this.symbolSizeInLib = null;
        this.symbolSize = null;
        this.middleMarkBounds = null;
        this.joinLines.length = 0;
        this.joinLines = null;
        this.positionOffsetX = null;
        this.positionOffsetY = null;
        //this.leadLinePoints.length = 0;
        //this.leadLinePoints = null;

        SuperMap.Geometry.GeoGraphicObject.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        if (this.controlPoints !== null && this.controlPoints.length !== 0) {
            if(this.annotationIndex !== -1){
                this.annoStyle = {};
                if(this.components[this.annotationIndex] && this.components[this.annotationIndex].style)
                    this.annoStyle = SuperMap.Util.copyAttributes(this.annoStyle, this.components[this.annotationIndex].style);
            }

            this.init();

            if (this.symbolData.symbolType === 1) {
                var symbolCells = SuperMap.Plot.AnalysisSymbol.analysisSymbolCells(this.symbolData);
                this.components = this.transformSymbolCellsToCompontGeometrys(symbolCells);

                this.generateLeadLine();

                this.clearBounds();
                this.annotationIndex = -1;
                this.handleAnnotation(this.annoStyle);

                for (var k = 0; k < this.geoSymbolTexts.length; k++) {
                    var symbolText = this.geoSymbolTexts[k];
                    if (null === symbolText) {
                        continue;
                    }

                    symbolText.calculateParts();
                }
            }
        }
    },

    generateLeadLine: function () {
        if (this.positionOffset) {
            var localPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(this.controlPoints[0].x, this.controlPoints[0].y));
            var leadLinePixel = new SuperMap.Pixel(localPixel.x+this.positionOffsetX, localPixel.y+this.positionOffsetY);
            var leadLineLonLat = this.layer.map.getLonLatFromViewPortPx(leadLinePixel);
            var leadLinePoint = new SuperMap.Geometry.Point(leadLineLonLat.lon, leadLineLonLat.lat);

            var pts = [this.controlPoints[0], leadLinePoint];
            var line = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(24, pts);
            line.style = {surroundLineFlag: false};
            line.leadLineDrawFlag = true;
            this.components.push(line);
        }// else {
        //    this.leadLinePoints[0].x = this.controlPoints[0].x;
        //    this.leadLinePoints[0].y = this.controlPoints[0].y;
        //}
    },

    /**
     * Method: reView
     * 根据点标号的原始信息重新计算 符号所在的位置
     *（用于地图缩放的时候重新计算  更换原来feature 中各个geometry的components  让原来的geometry不发生变化。）
     */
    reView: function () {
        if(this.prevStrokeWidth !== undefined && this.prevStrokeWidth !== this.feature.style.strokeWidth){
            this.strokeWidth = this.feature.style.strokeWidth;
            this.prevStrokeWidth = this.feature.style.strokeWidth;
        }
        if(this.prevFontSize !== undefined && this.prevFontSize !== this.feature.style.fontSize){
            this.fontSize = this.feature.style.fontSize / this.dScale / this.initialScale;
            this.prevFontSize = this.feature.style.fontSize;
        }
        if(this.prevPositionOffsetX !== undefined && this.prevPositionOffsetX !== this.positionOffsetX){
            this.offsetXBeforeScaleByMap = this.positionOffsetX / this.dScale;
            this.prevPositionOffsetX = this.positionOffsetX;
        }
        if(this.prevPositionOffsetY !== undefined && this.prevPositionOffsetY !== this.positionOffsetY){
            this.offsetYBeforeScaleByMap = this.positionOffsetY / this.dScale;
            this.prevPositionOffsetY = this.positionOffsetY;
        }

        if(this.resolution !== this.layer.renderer.getResolution()){
            for (var k = 0; k < this.geoSymbolTexts.length; k++) {
                var symbolText = this.geoSymbolTexts[k];
                if (null === symbolText) {
                    continue;
                }

                symbolText.scaleByMap = this.scaleByMap;
            }

            if (!this.scaleByMap || this.scaleByMap === false) {
                //处理对象标注1随图时需要
                for(var i = 0; i < this.geoSymbolTexts.length; i++){
                    if(this.geoSymbolTexts[i] instanceof SuperMap.Geometry.SymbolText1){
                        this.geoSymbolTexts[i].resolution = this.layer.renderer.getResolution();
                    }
                }

                this.scaleBeforeScaleByMap = this.dScale;

                this.calculateParts();
            } else {
                if(this.isEdit === false){
                    return;
                }
                if(this.actualScale === undefined){
                    this.actualScale = this.dScale;
                }

                this.actualScale *= this.resolution / this.layer.renderer.getResolution();
                if(this.actualScale > this.maxScale){
                    this.dScale = this.maxScale;
                } else if(this.actualScale < this.minScale){
                    if(this.minScale === 0){
                        this.minScale = 0.1;
                    }
                    this.dScale = this.minScale;
                } else {
                    this.dScale = this.actualScale;
                }

                this.symbolSize.w = this.initialScale * this.dScale * this.symbolSizeInLib.w;
                this.symbolSize.h = this.initialScale * this.dScale * this.symbolSizeInLib.h;

                //处理线宽缩放
                if(this.strokeWidth === undefined){
                    this.strokeWidth = this.feature.style.strokeWidth;
                }

                var scaleSize = (this.strokeWidth/0.5)*5;
                if(this.symbolSize.w < scaleSize && this.symbolSize.h < scaleSize){
                    this.scaleStrokeWidth = true;

                    var symbolSizeLen = this.symbolSize.w > this.symbolSize.h ? this.symbolSize.w : this.symbolSize.h;
                    this.feature.style.strokeWidth = Math.round(symbolSizeLen/5*0.5);
                    if(this.feature.style.strokeWidth >= this.strokeWidth){
                        this.feature.style.strokeWidth = this.strokeWidth;
                    }
                    if(this.feature.style.strokeWidth <= 0.5){
                        this.feature.style.strokeWidth = 0.5;
                    }
                } else {
                    if(this.scaleStrokeWidth === true){
                        this.feature.style.strokeWidth = this.strokeWidth;
                        this.scaleStrokeWidth = false;
                    }
                    this.strokeWidth = this.feature.style.strokeWidth;
                }

                this.prevStrokeWidth = this.feature.style.strokeWidth;

                //处理文字缩放
                if(this.fontSize === undefined){
                    this.fontSize = this.feature.style.fontSize;
                }
                this.feature.style.fontSize = this.fontSize * this.dScale * this.initialScale;
                this.prevFontSize = this.feature.style.fontSize;

                //处理对象标注1随图
                for(var i = 0; i < this.geoSymbolTexts.length; i++){
                    if(this.geoSymbolTexts[i] instanceof SuperMap.Geometry.SymbolText1){
                        if(this.geoSymbolTexts[i].resolution <= this.layer.renderer.getResolution()){
                            //缩小处理
                            this.geoSymbolTexts[i].dScale = this.dScale;
                        }
                    }
                }

                //处理牵引线缩放
                if(this.scaleBeforeScaleByMap === undefined){
                    this.scaleBeforeScaleByMap = this.dScale;
                }

                if(this.offsetXBeforeScaleByMap === undefined){
                    this.offsetXBeforeScaleByMap = this.positionOffsetX;
                }
                if(this.offsetYBeforeScaleByMap === undefined){
                    this.offsetYBeforeScaleByMap = this.positionOffsetY;
                }

                if(this.positionOffset === true && this.dScale <= this.scaleBeforeScaleByMap){
                    this.positionOffsetX = this.offsetXBeforeScaleByMap * this.dScale;
                    this.positionOffsetY = this.offsetYBeforeScaleByMap * this.dScale;
                } else {
                    this.positionOffsetX = this.offsetXBeforeScaleByMap;
                    this.positionOffsetY = this.offsetYBeforeScaleByMap
                }

                this.prevPositionOffsetX = this.positionOffsetX;
                this.prevPositionOffsetY = this.positionOffsetY;

                this.calculateParts();
            }

            //获取缩放比例
            this.resolution = this.layer.renderer.getResolution();
        }
    },

    /**
     * APIMethod: clone
     * 克隆当前几何对象。
     *
     * Returns:
     * {<SuperMap.Geometry.GeoGraphicObject>} 克隆的几何对象集合。
     */
    clone: function () {
        var geometry = SuperMap.Geometry.GeoGraphicObject.prototype.clone.apply(this, arguments);

        geometry.annotationIndex = this.annotationIndex;
        geometry.dRotate = this.dRotate;
        geometry.textPosition = this.textPosition;
        geometry.positionOffset = this.positionOffset;
        geometry.positionOffsetX = this.positionOffsetX;
        geometry.positionOffsetY = this.positionOffsetY;

        geometry.symbolSize.h = this.symbolSize.h;
        geometry.symbolSize.w = this.symbolSize.w;
        geometry.dScale = this.dScale;
        geometry.initialScale = this.initialScale;
        if(undefined !== geometry.symbolData && null !== geometry.symbolData){
            geometry.symbolData.scale2D.x = this.dScale;
        }

        return geometry;
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
        if(this.positionOffset === false){
            SuperMap.Geometry.GeoGraphicObject.prototype.move.apply(this, arguments);
        } else {
            var controlPoint = new SuperMap.Geometry.Point(this.controlPoints[0].x+x, this.controlPoints[0].y+y);
            var currentPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(controlPoint.x, controlPoint.y));
            var locationPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(this.controlPoints[0].x, this.controlPoints[0].y));
            this.positionOffsetX += currentPixel.x - locationPixel.x;
            this.positionOffsetY += currentPixel.y - locationPixel.y;

            this.calculateParts();
        }

        if (null !== this.joinLines && 0 < this.joinLines.length) {
            for (var i = 0; i < this.joinLines.length; i++) {
                var joinLine = this.joinLines[i];
                if (null === joinLine) {
                    continue;
                }

                if (joinLine instanceof SuperMap.Geometry.LineRelation) {
                    joinLine.calculateParts();
                }

                if(joinLine instanceof SuperMap.Geometry.NavyDeployment){
                    for(var j = 0; j < joinLine.components.length; j++){
                        if(joinLine.components[j].geometry instanceof SuperMap.Geometry.GeoTooltipBox){
                            joinLine.components[j].geometry.controlPoints[2].x = this.controlPoints[0].x;
                            joinLine.components[j].geometry.controlPoints[2].y = this.controlPoints[0].y;
                            joinLine.components[j].geometry.calculateParts();
                        }
                    }
                }
            }
        }

        for (var k = 0; k < this.geoSymbolTexts.length; k++) {
            var symbolText = this.geoSymbolTexts[k];
            if (null === symbolText) {
                continue;
            }

            symbolText.calculateParts();
        }
    },

    /**
     * Method: transformSymbolCellsToCompontGeometrys
     * 将图元从数据层面转换成几何对象层面
     *
     * Parameters:
     * feature - {Array(Object)}需要绘制的要素
     */
    transformSymbolCellsToCompontGeometrys: function (symbolCells) {
        var componentsGeometrys = [];

        var locationPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(this.controlPoints[0].x, this.controlPoints[0].y));
        if(this.positionOffset === true){
            locationPixel.x += this.positionOffsetX;
            locationPixel.y += this.positionOffsetY;
        }

        for (var i = 0; i < symbolCells.length; i++) {
            var symbolCell = symbolCells[i];

            if (symbolCell.type === SuperMap.Plot.SymbolType.TEXTSYMBOL) {
                symbolCell.style.fontSize = this.initialScale * this.dScale * (symbolCell.style.fontSize / 2);
                symbolCell.style.labelRotation += -this.symbolData.rotate2D.x;
            }

            for (var j = 0; j < symbolCell.positionPoints.length; j++) {
                symbolCell.positionPoints[j].x -= this.anchorPoint.x;
                symbolCell.positionPoints[j].y -= this.anchorPoint.y;

                symbolCell.positionPoints[j].x = symbolCell.positionPoints[j].x * this.dScale * this.initialScale;
                symbolCell.positionPoints[j].y = symbolCell.positionPoints[j].y * this.dScale * this.initialScale;

                symbolCell.positionPoints[j].rotate(this.dRotate, new SuperMap.Geometry.Point(0, 0));

                symbolCell.positionPoints[j] = SuperMap.Plot.PlottingUtil.transitionPoint(this.layer.map, symbolCell.positionPoints[j], locationPixel);
            }

            var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(symbolCell.type, symbolCell.positionPoints, symbolCell.textContent, this.dRotate, false);
            if (symbolCell.type === SuperMap.Plot.SymbolType.TEXTSYMBOL) {
                geometry.resolution = this.layer.renderer.getResolution();
            }
            geometry.style = symbolCell.style;
            componentsGeometrys.push(geometry);
        }

        return componentsGeometrys
    },

    /**
     * Method: parseSymbolData
     * 解析标号数据。
     *
     */
    parseSymbolData: function () {
        SuperMap.Geometry.GeoGraphicObject.prototype.parseSymbolData.apply(this, arguments);

        if (this.symbolData !== null) {
            var dotBasicInfo = SuperMap.Plot.AnalysisSymbol.analysisDotBasicInfo(this.symbolData);
            //this.dRotate = dotBasicInfo.rotate;
            //this.dScale = dotBasicInfo.scale;
            this.textPosition = dotBasicInfo.annotationPosition;
            this.symbolRank = dotBasicInfo.symbolRank;
            this.negativeImage = dotBasicInfo.negativeImage;
            this.scaleByMap = dotBasicInfo.scaleByMap;
            this.anchorPoint = dotBasicInfo.anchorPoint;
            this.symbolSizeInLib = dotBasicInfo.symbolSizeInLib;

            if(this.symbolData.initialScale){
                this.initialScale = this.symbolData.initialScale;
            }

            if(this.symbolData.actualScale){
                this.actualScale = this.symbolData.actualScale;
            }

            if(this.symbolData.fontSize){
                this.fontSize = this.symbolData.fontSize;
            }

            var w = this.initialScale * this.symbolSizeInLib.w;
            var h = this.initialScale * this.symbolSizeInLib.h;
            this.symbolSize = new SuperMap.Size(w, h);
            this.symbolSize.w = w;
            this.symbolSize.h = h;

            this.middleMarkBounds = dotBasicInfo.middleMarkBounds;

            if(this.symbolData.space){
                this.space = this.symbolData.space;
            }

            if(this.symbolData.flagTextSize){
                this.flagTextSize = this.symbolData.flagTextSize;
            }

            if(this.symbolData.maxScale){
                this.maxScale = this.symbolData.maxScale;
            }

            if(this.symbolData.minScale){
                this.minScale = this.symbolData.minScale;
            }

            //if(this.symbolData.leadLinePoints !== undefined && this.symbolData.leadLinePoints.length !== 0){
            //    var leadLinePoints = [];
            //    for(var i = 0; i < this.symbolData.leadLinePoints.length; i++){
            //        leadLinePoints.push(new SuperMap.Geometry.Point(this.symbolData.leadLinePoints[i].x, this.symbolData.leadLinePoints[i].y));
            //    }
            //    this.leadLinePoints = leadLinePoints;
            //}

            if(undefined !== this.symbolData.positionOffset && null !== this.symbolData.positionOffset){
                this.positionOffset = this.symbolData.positionOffset;
            }

            if(undefined !== this.symbolData.positionOffsetX && null !== this.symbolData.positionOffsetX){
                this.positionOffsetX = this.symbolData.positionOffsetX;
            }

            if(undefined !== this.symbolData.positionOffsetY && null !== this.symbolData.positionOffsetY){
                this.positionOffsetY = this.symbolData.positionOffsetY;
            }
        }
    },

    setSymbolData:function () {
        SuperMap.Geometry.GeoGraphicObject.prototype.setSymbolData.apply(this, arguments);

        if(!!this.symbolData){
            this.symbolData.annotationPosition = this.textPosition;
            this.symbolData.symbolRank = this.symbolRank;
            this.symbolData.annotationPosition = this.textPosition;
            this.symbolData.negativeImage = this.negativeImage;
            //this.symbolData.rotate2D.x = this.dRotate;
            //this.symbolData.scale2D.x = this.dScale;
            this.symbolData.space = this.space;
            this.symbolData.flagTextSize = this.flagTextSize;
            this.symbolData.maxScale = this.maxScale;
            this.symbolData.minScale = this.minScale;
            this.symbolData.initialScale = this.initialScale;
            this.symbolData.actualScale = this.actualScale;
            this.symbolData.fontSize = this.fontSize;

            //this.symbolData.leadLinePoints = this.leadLinePoints;
            this.symbolData.positionOffset = this.positionOffset;
            this.symbolData.positionOffsetX = this.positionOffsetX;
            this.symbolData.positionOffsetY = this.positionOffsetY;
        }
    },

    /**
     * Method: getBounds
     * 获得几何图形的边界(包括注记)。如果没有设置边界，可通过计算获得。
     *
     * Returns:
     * {<SuperMap.Bounds>}返回的几何对象的边界。
     */
    getBoundsWithText: function () {
        if (this.bounds == null) {
            this.calculateBounds(true);
        }
        return this.bounds;
    },

    /**
     * Method: calculateBounds
     * 通过遍历数组重新计算边界，在遍历每一子项中时调用 extend 方法。
     */
    calculateBounds: function (isCalculateText) {
        this.bounds = null;
        var bounds = new SuperMap.Bounds();
        var components = this.components;
        if (components) {
            for (var i = 0; i < components.length; i++) {
                if ((components[i].leadLineDrawFlag && components[i].leadLineDrawFlag === true) ||
                i === this.annotationIndex)
                    continue;
                bounds.extend(components[i].getBounds());
            }
        }

        if (isCalculateText && isCalculateText === true && this.annotationIndex !== -1) {
            bounds.extend(this.components[this.annotationIndex].getBoundsByText(this.layer.map, this.components[this.annotationIndex].style));
        }

        if (bounds.left != null && bounds.bottom != null &&
            bounds.right != null && bounds.top != null) {
            this.setBounds(bounds);
        }
    },

    /**
     * Method: handleAnnotation
     * 处理点标号注记的相关修改
     *
     */
    handleAnnotation: function (style) {
        this.textContent = SuperMap.Plot.PlottingUtil.trim(this.textContent);

        if (this.textContent && this.textContent !== null && this.textContent.length !== 0) {
            for (var j = 0; j < this.components.length; j++) {
                this.components[j].bounds = null;
            }
            var symbolBounds = this.getBounds();
            if(!style){
                style = SuperMap.Plot.AnalysisSymbol.getStyle(this.symbolData);
            }

            var space = this.space;
            if(this.scaleByMap === true){
                space = this.space * this.dScale;
            }
            var positionPoint = null;
            if (this.textPosition === 0) {
                style.labelAlign = "rb";
                var lonlat = new SuperMap.LonLat(symbolBounds.left, symbolBounds.top);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                pixel.x -= space;
                var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                positionPoint = new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat);
            } else if (this.textPosition === 1) {
                style.labelAlign = "rt";
                var lonlat = new SuperMap.LonLat(symbolBounds.left, symbolBounds.bottom);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                pixel.x -= space;
                var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                positionPoint = new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat);
            } else if (this.textPosition === 2) {
                style.labelAlign = "lb";
                var lonlat = new SuperMap.LonLat(symbolBounds.right, symbolBounds.top);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                pixel.x += space;
                var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                positionPoint = new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat);
            } else if (this.textPosition === 3) {
                style.labelAlign = "lt";
                var lonlat = new SuperMap.LonLat(symbolBounds.right, symbolBounds.bottom);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                pixel.x += space;
                var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                positionPoint = new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat);
            } else if (this.textPosition === 4) {
                style.labelAlign = "cb";
                var lonlat = new SuperMap.LonLat((symbolBounds.left + symbolBounds.right) / 2, symbolBounds.top);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                pixel.y -= space;
                var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                positionPoint = new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat);
            } else if (this.textPosition === 5) {
                style.labelAlign = "ct";
                var lonlat = new SuperMap.LonLat((symbolBounds.left + symbolBounds.right) / 2, symbolBounds.bottom);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                pixel.y += space;
                var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                positionPoint = new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat);
            } else if (this.textPosition === 6) {
                style.labelAlign = "rm";
                var lonlat = new SuperMap.LonLat(symbolBounds.left, (symbolBounds.top + symbolBounds.bottom) / 2);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                pixel.x -= space;
                var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                positionPoint = new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat);
            } else if (this.textPosition === 7) {
                style.labelAlign = "lm";
                var lonlat = new SuperMap.LonLat(symbolBounds.right, (symbolBounds.top + symbolBounds.bottom) / 2);
                var pixel = this.layer.map.getPixelFromLonLat(lonlat);
                pixel.x += space;
                var newLonlat = this.layer.map.getLonLatFromViewPortPx(pixel);
                positionPoint = new SuperMap.Geometry.Point(newLonlat.lon, newLonlat.lat);
            } else if (this.textPosition === 8) {
                var tempMiddleMarkBounds = this.middleMarkBounds.scale(this.dScale*this.initialScale, this.anchorPoint);
                var centerPoint = new SuperMap.Geometry.Point((tempMiddleMarkBounds.left + tempMiddleMarkBounds.right) / 2.0, (tempMiddleMarkBounds.top + tempMiddleMarkBounds.bottom) / 2.0);
                if (this.negativeImage) {
                    var projectPoint = SuperMap.Plot.PlottingUtil.projectPoint(centerPoint, new SuperMap.Geometry.Point(this.anchorPoint.x, 100), new SuperMap.Geometry.Point(this.anchorPoint.x, this.anchorPoint.y));
                    centerPoint.rotate(180, projectPoint);
                }
                centerPoint.rotate(this.dRotate, this.anchorPoint);
                var locationPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(this.controlPoints[0].x, this.controlPoints[0].y));
                if(this.positionOffset === true){
                    locationPixel.x += this.positionOffsetX;
                    locationPixel.y += this.positionOffsetY;
                }
                var pixelX = tempMiddleMarkBounds.getWidth() * 96 / 25.4 / 10;
                var pixelY = tempMiddleMarkBounds.getHeight() * 96 / 25.4 / 10;

                positionPoint = SuperMap.Plot.PlottingUtil.transitionPoint(this.layer.map, centerPoint, locationPixel);
                style.rotation = -this.dRotate;
                style.labelAlign = "cm";
                style.graphicWidth = pixelX;
                style.graphicHeight = pixelY;
                style.graphicOpacity = 1;
                if(this.feature !== null) {
                    style.fontColor = this.feature.style.fontColor;
                    style.fontFamily = this.feature.style.fontFamily;
                    style.fontWeight = this.feature.style.fontWeight;
                    style.fontStyle = this.feature.style.fontStyle;
                }

                style.externalGraphic = this.getTextGraphic(this.textContent, style);
            }

            var geoText = null;

            if(this.textPosition === 8){
                geoText = new SuperMap.Geometry.Point(positionPoint.x, positionPoint.y);
            } else {
                var primitives = new SuperMap.Geometry.Primitives();
                geoText = primitives.geotext([positionPoint], this.textContent);


                if(this.textPosition !== 8 && this.feature !== null) {
                    style.fontSize = this.feature.style.fontSize;
                    style.fontSizeLimit = false;
                    style.labelRotation = 0;
                }
            }
            geoText.style = style;

            if (this.annotationIndex === -1) {
                this.annotationIndex = this.components.length;
                this.components.push(geoText);
            } else {
                var tempID = this.components[this.annotationIndex].id;
                this.components[this.annotationIndex] = geoText;
                this.components[this.annotationIndex].id = tempID;
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
        for(var i = 0, len = this.components.length; i < len; i++) {
            if(this.components[i].CLASS_NAME === "SuperMap.Geometry.Point"){
                this.components[i].rotate(rotateValue, anchorPoint);
                this.components[i].style.rotation += -rotateValue;
            } else if(this.components[i].CLASS_NAME === "SuperMap.Geometry.GeoText"){
                var tempPt = new SuperMap.Geometry.Point(this.components[i].x, this.components[i].y);
                tempPt.rotate(rotateValue, anchorPoint);
                this.components[i].x = tempPt.x;
                this.components[i].y = tempPt.y;
                if(!this.components[i].style.labelRotation){
                    this.components[i].style.labelRotation = -rotateValue;
                } else {
                    this.components[i].style.labelRotation += -rotateValue;
                }
            } else {
                this.components[i].rotate(rotateValue, anchorPoint);
                if(this.components[i].originGeometry && this.components[i].originGeometry !== null){
                    this.components[i].originGeometry.rotate(rotateValue, this.anchorPoint);
                }
            }
        }

        this.dRotate += rotateValue;
        this.controlPoints[0].rotate(rotateValue, anchorPoint);
        //this.leadLinePoints[0].rotate(rotateValue, anchorPoint);
    },

    /**
     * Method: resize
     * 相对于中心点缩放组合对象。
     *
     * Parameters:
     * scaleValue - {Float} 缩放比例。
     */
    resize: function(scaleValue, anchorPoint) {
        for(var i = 0, len = this.components.length; i < len; i++) {
            if(this.components[i].CLASS_NAME === "SuperMap.Geometry.Point"){
                this.components[i].resize(scaleValue, anchorPoint);
                this.components[i].style.graphicWidth *= scaleValue;
                this.components[i].style.graphicHeight *= scaleValue;
            } else if(this.components[i].CLASS_NAME === "SuperMap.Geometry.GeoText"){
                var tempPt = new SuperMap.Geometry.Point(this.components[i].x, this.components[i].y);
                tempPt.resize(scaleValue, anchorPoint);
                this.components[i].x = tempPt.x;
                this.components[i].y = tempPt.y;
                if(!this.components[i].style.fontSize){
                    this.components[i].style.fontSize = 12*scaleValue;
                } else {
                    this.components[i].style.fontSize *= scaleValue;
                }
            } else {
                this.components[i].resize(scaleValue, anchorPoint);
                if(this.components[i].originGeometry && this.components[i].originGeometry !== null){
                    this.components[i].originGeometry.resize(scaleValue, anchorPoint);
                }
            }
        }

        this.dScale *= scaleValue;

        if(this.controlPoints.length > 0){
            this.controlPoints[0].resize(scaleValue, anchorPoint);
        }

        //if(this.leadLinePoints.length > 0){
        //    this.leadLinePoints[0].resize(scaleValue, anchorPoint);
        //}
    },

    getTextGraphic: function(textContent, style){
        var fontSize = this.flagTextSize;
        style.fontSize = fontSize + "px";
        style.labelAlign = "cm";
        var root = document.createElement("canvas");
        var width = this.getTextWidth(style, textContent);
        root.width = width + 20;
        root.height = fontSize + 10;
        document.body.appendChild(root);
        var canvas = root.getContext("2d");

        canvas.fillStyle = style.fontColor;
        canvas.globalAlpha = style.fontOpacity || 1.0;
        var fontStyle = [style.fontStyle ? style.fontStyle : "normal",
            "normal",
            style.fontWeight ? style.fontWeight : "normal",
            style.fontSize ? style.fontSize : "1em",
            style.fontFamily ? style.fontFamily : "sans-serif"].join(" ");

        if (canvas.fillText) {
            canvas.font = fontStyle;
            canvas.textAlign = "center";
            canvas.textBaseline = "middle";

            canvas.fillText(textContent, root.width/2, root.height/2);

        } else if (canvas.mozDrawText) {
            canvas.mozTextStyle = fontStyle;
            var hfactor = -.5;
                SuperMap.Renderer.Canvas.LABEL_FACTOR[style.labelAlign[0]];
            if (hfactor == null) {
                hfactor = -.5;
            }
            var vfactor = -.5;
                SuperMap.Renderer.Canvas.LABEL_FACTOR[style.labelAlign[1]];
            if (vfactor == null) {
                vfactor = -.5;
            }
            pt = [0, 0];
            var lineHeight = canvas.mozMeasureText('xx');
            pt[1] += lineHeight*(1 + (vfactor*numRows));
            var x = pt[0] + (hfactor*canvas.mozMeasureText(textContent));
            var y = pt[1] + (lineHeight);
            canvas.translate(x, y);
            canvas.mozDrawText(textContent);
            canvas.translate(-x, -y);
        }

        var image = root.toDataURL("image/png", "image/octet-stream");
        document.body.removeChild(root);

        return image;
    },

    CLASS_NAME: "SuperMap.Geometry.DotSymbol"
});