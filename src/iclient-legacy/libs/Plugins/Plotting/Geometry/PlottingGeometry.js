/* COPYRIGHT 2016 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Geometry.js
 * @requires SuperMap/Geometry/Collection.js
 */

/**
 * Class: SuperMap.Geometry.PlottingGeometry
 * 标绘几何对象类。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.Collection>
 */
SuperMap.Geometry.PlottingGeometry = SuperMap.Class(SuperMap.Geometry.Collection,{

    /**
     * APIProperty: uuid
     * {Boolean} 动态标绘对象的唯一标识
     */
    uuid: null,

    /**
     * APIProperty: associatedUuid
     * {String} 关联的对象的唯一ID，即为用户创建该关联对象时设置的uuid
     */
    associatedUuid: null,

    /**
     * Property: isPlottingGeometry
     * {Boolean} 动态标绘对象的标识
     */
    isPlottingGeometry: true,

    /**
     * Property: layer
     * {<SuperMap.Layer.PlottingLayer>}
     */
    layer: null,

    /**
     * APIProperty: symbolData
     * {Object} 标号原始的数据
     */
    symbolData: null,

    /**
     * APIProperty: libID
     * {Integer} 标号的库ID
     */
    libID: null,

    /**
     * APIProperty: code
     * {Integer} 标号的代码
     */
    code: null,

    /**
     * APIProperty: maxEditPts
     * {Integer} 标号最大编辑点个数
     */
    maxEditPts: 0,

    /**
     * APIProperty: minEditPts
     * {Integer} 标号最小编辑点个数
     */
    minEditPts: 0,

    /**
     * APIProperty: symbolType
     * {Integer} 标号类型
     */
    symbolType: null,

    /**
     * APIProperty: symbolName
     * {String} 标号名称
     */
    symbolName: null,

    /**
     * APIProperty: note
     * {String} 图形对象的用户备注信息
     */
    note: null,

    /**
     * Property: extendProperty
     * {<SuperMap.Plot.ExtendPropety>} 标号的自定义属性
     */
    extendProperty: null,

    /**
     * Property: feature
     * {<SuperMap.Feature.Vector>} 几何对象所属的feature
     */
    feature: null,

    /**
     * Property: controlPoints
     * {Array(<SuperMap.Geometry.Point>)} 用于存储标绘标号的所有控制点，算法标号的控制点即为它的定位点
     */
    controlPoints: null,

    /**
     * Property: scalePoints
     * {Array(<SuperMap.Geometry.Point>)} 用于存储线面类型标号的比例点或点类型标号的旋转点
     */
    scalePoints: null,

    /**
     * Property: scaleValues
     * {Array(Float)} 线面标号的比例值
     */
    scaleValues: null,

    /**
     * Property: dRotate
     * {Float} 标号的旋转角度
     */
    dRotate: null,

    /**
     * Property: dScale
     * {Float} 标号的缩放比例
     */
    dScale: null,

    /**
     * Property: textContent
     * {String} 标号的注记内容
     */
    textContent: null,

    /**
     * Property: textPosition
     * {Integer} 标号的注记位置
     */
    textPosition: null,

    /**
     * Property: anchorPoint
     * {<SuperMap.Geometry.Point>} 锚点，标号旋转点
     */
    anchorPoint: null,

    /**
     * Property: scaleByMap
     * {Boolean} 点标号是否随图缩放
     */
    scaleByMap: null,

    /**
     * Property: symbolTexts
     * {Array<SuperMap.Geometry.GeoSymbolText>} 关联的对象标注
     */
    geoSymbolTexts: null,

    /**
     * APIProperty: custom
     * {Object} 存储用户自定义对象
     */
    custom: null,

    /**
     * Property: resolution
     * {Float} 记录切换随图缩放模式前的地图缩放比例
     */
    resolution: null,

    /**
     * APIProperty: subSymbols
     * {Array(<SuperMap.Plot.SubSymbol>)}线面标号的子标号列表
     */
    subSymbols: null,

    /**
     * APIMethod: getScale
     * 获取点标号的比例值
     *
     * Returns:
     * {float} 返回点标号的比例值。
     */
    getScale: function () {
        return this.dScale;
    },

    /**
     * APIMethod: setScale
     * 设置点标号的比例值
     *
     * Parameters:
     * scaleValue - {float} 点标号的比例值。
     */
    setScale: function (scaleValue) {},

    /**
     * APIMethod: getRotate
     * 获取点标号的旋转角度
     *
     * Returns:
     * {float} 返回点标号的旋转角度。
     */
    getRotate:function(){
        return this.dRotate;
    },

    /**
     * APIMethod: setRotate
     * 设置点标号的旋转角度
     *
     * Parameters:
     * rotateValue - {float} 点标号的旋转角度。
     */
    setRotate:function(rotateValue){
        if(!isNaN(rotateValue)) {
            this.rotate(rotateValue, this.anchorPoint);
            this.dRotate = rotateValue;

            this.layer.events.triggerEvent("featuremodified",
                {feature: this.feature});
        }
    },

    /**
     * APIMethod: getScaleByMap
     * 获取点标号是否随图缩放
     *
     * Returns:
     * {<Boolean>} 返回点标号是否随图缩放
     */
    getScaleByMap: function () {
        return this.scaleByMap;
    },

    /**
     * APIMethod: setScaleByMap
     * 设置点标号是否随图缩放。
     *
     * Parameters:
     * isScaleByMap - {Boolean} 点标号是否随图缩放。
     */
    setScaleByMap: function (isScaleByMap) {
        this.scaleByMap = isScaleByMap;
    },

    /**
     * APIMethod: getTextContent
     * 获取点标号注记内容
     *
     * Returns:
     * {String} 返回点标号注记内容。
     */
    getTextContent:function(){
        return this.textContent;
    },

    /**
     * APIMethod: setTextContent
     * 设置点标号注记内容
     *
     * Parameters:
     * content - {String} 点标号注记内容。
     */
    setTextContent:function(content){
        this.textContent = content;
        this.calculateParts();
        this.layer.drawFeature(this.feature);

        if(this.symbolType === SuperMap.Plot.SymbolType.TEXTSYMBOL){
            this.layer.events.triggerEvent("featuremodified",
                {feature: this.feature});
        }
    },

    /**
     * APIMethod: setPositionPoints
     * 设置标号的位置点。
     *
     * Parameters:
     * positionPoints - {Array(<SuperMap.Geometry.Point>)} 标号的位置点。
     */
    setPositionPoints:function(positionPoints){
        if(positionPoints || positionPoints !== null){
            if (!(SuperMap.Util.isArray(positionPoints))) {
                positionPoints = [positionPoints];
            }

            this.controlPoints = [];
            this.controlPoints = SuperMap.Plot.PlottingUtil.clonePoints(positionPoints);
            //if(this.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
            //    this.leadLinePoints = SuperMap.Plot.PlottingUtil.clonePoints(positionPoints);
            //}

            this.calculateParts();
        }
    },

    /**
     * APIMethod: getPositionPoints
     * 获取标号的位置点
     *
     * Returns:
     * {Array(<SuperMap.Geometry.Point>)} 返回标号的位置点。
     */
    getPositionPoints:function(){
        return this.controlPoints;
    },

    /**
     * APIMethod: getExtendProperty
     * 标号的自定义属性
     *
     * Returns:
     * {<SuperMap.Plot.ExtendPropety>} 返回标号的自定义属性。
     */
    getExtendProperty:function(){
        return this.extendProperty;
    },

    /**
     * APIMethod: getSubSymbol
     * 获取线面标号的子标号
     *
     * Returns:
     * {Object} 返回线面标号的子标号。
     */
    getSubSymbols:function(){
        return this.subSymbols;
    },

    /**
     * APIMethod: setSubSymbol
     * 设置线面标号的子标号
     *
     * Parameters:
     * code - {Int} 子标号代码。
     * npos - {Int} 子标号在线面标号所处的索引位置。
     */
    setSubSymbol:function(code, npos){
        if(npos < this.subSymbols.length){
            this.subSymbols[npos].code = code;
        }
        else if(this.subSymbols.length === npos){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(this.libID,code));
        }
        else{
            return;
        }

        // 获取数据成功
        function getCompleted(result){
            if(!SuperMap.Geometry.PlottingGeometry.isAccessServer(this.libID, this.code)) {
                this.subSymbols[npos].symbolData = result.originResult;
            } else {
                this.symbolData.innerCells = result.originResult.innerCells;
                for(var i = 0; i < result.originResult.subSymbols.length; i++){
                    this.subSymbols[i].code = result.originResult.subSymbols[i];
                }
            }

            //重新计算标绘扩展符号的geometry
            this.calculateParts();
            this.layer.drawFeature(this.feature);

            this.layer.events.triggerEvent("featuremodified",
                {feature: this.feature});
        }

        //获取数据失败
        function getFailed(result){
            return;
        }

        if(!SuperMap.Geometry.PlottingGeometry.isAccessServer(this.libID, this.code)){
            this.layer.getDataFromServer(this.subSymbols[npos].libID, this.subSymbols[npos].code, null, getCompleted, getFailed, this);
        } else {
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
            getSymbolInfoParams.inputPoints = this.controlPoints;
            getSymbolInfoParams.subSymbols = this.subSymbols;
            getSymbolInfo.processAsync(getSymbolInfoParams);
        }
    },

    /**
     * Constructor: SuperMap.Geometry.PlottingGeometry
     * 创建一个标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.PlottingGeometry>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.Collection.prototype.initialize.apply(this, null);

        this.extendProperty = new SuperMap.Plot.ExtendProperty();

        this.controlPoints = [];
        this.scalePoints = [];
        this.scaleValues = [];
        this.subSymbols = [];

        this.geoSymbolTexts = [];

        this.dRotate = 0.0;
        this.dScale = 1.0;

        this.textContent = "";
        this.associatedUuid = "";

        if(options && options.symbolData){
            this.symbolData = SuperMap.Util.cloneObject(options.symbolData);
        }

        if(options && options.layer){
            this.layer = options.layer;
        }

        //解析标号库中属性
        this.parseSymbolData();

        //合并缺省属性
        this.mergeDefaultStyle();

        //读取用户传入属性
        SuperMap.Util.extend(this, options);

        if(this.resolution === null){
            this.resolution = this.layer.renderer.getResolution();
        }

        if(this.uuid === undefined || this.uuid === null){
            this.uuid = SuperMap.Plot.PlottingUtil.generateUuid();
        }
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        this.layer.removeFeatures(this.geoSymbolTexts);
        for(var i = 0; i < this.geoSymbolTexts.length; i++){
            this.geoSymbolTexts[i].destroy();
        }
        this.geoSymbolTexts = null;
        this.layer = null;
        this.feature = null;
        this.symbolType = null;
        this.symbolName = null;
        this.note = null;
        this.extendProperty = null;

        this.minEditPts = null;
        this.maxEditPts = null;

        this.controlPoints.length = 0;
        this.controlPoints = null;
        this.scalePoints.length = 0;
        this.scalePoints = null;
        this.scaleValues.length = 0;
        this.scaleValues = null;

        this.dRotate = null;
        this.dScale = null;
        this.textContent = null;

        this.associatedUuid = null;
        this.subSymbols = null;

        SuperMap.Geometry.Collection.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: mergeDefaultStyle
     * 应用缺省属性到geometry中。
     */
    mergeDefaultStyle: function() {
        var plotting = SuperMap.Plotting.getInstance(this.layer.map, this.layer.serverUrl);
        var defaultStyle = plotting.getDefaultStyle();

        if(defaultStyle && defaultStyle.defaultFlag === true && this.saveGeoData !== true){
            if(this.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
                if(defaultStyle.dotSymbolSize !== -1){
                    var symbolSizeInLib = this.symbolSizeInLib.w;
                    if(this.symbolSizeInLib.h > this.symbolSizeInLib.w){
                        symbolSizeInLib = this.symbolSizeInLib.h;
                    }

                    if(0 === symbolSizeInLib || 0 === defaultStyle.dotSymbolSize){
                        this.symbolSize.w = this.symbolSizeInLib.w;
                        this.symbolSize.h = this.symbolSizeInLib.h;
                    }
                    else{
                        var scale = defaultStyle.dotSymbolSize / symbolSizeInLib;
                        this.symbolSize.w = scale * this.symbolSizeInLib.w;
                        this.symbolSize.h = scale * this.symbolSizeInLib.h;
                    }
                }

                if(defaultStyle.dotTextSpace !== -1) {
                    this.space = defaultStyle.dotTextSpace;
                }

                if(defaultStyle.flagTextSize !== -1) {
                    this.flagTextSize = defaultStyle.flagTextSize;
                }
            }

            if(this instanceof SuperMap.Geometry.GeoGraphicObject) {
                if (defaultStyle.maxScale !== -1) {
                    this.maxScale = defaultStyle.maxScale;
                }

                if (defaultStyle.minScale !== -1) {
                    this.minScale = defaultStyle.minScale;
                }
            }

            if(defaultStyle.scaleByMap !== -1) {
                this.scaleByMap = defaultStyle.scaleByMap;
            }
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
        this.calculateParts();
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
        if(this.layer.plottingEdit.isAddPoint !== true){
            var leadLineFlag = false;
            for(var i = 0, len = this.components.length; i < len; i++) {
                if(this.components[i].CLASS_NAME !== "SuperMap.Geometry.GeoText"){
                    if(this.components[i].leadLineDrawFlag && this.components[i].leadLineDrawFlag === true) {
                        leadLineFlag = true;
                        continue;
                    }

                    this.components[i].move(x, y);
                    if(this.components[i].originGeometry && this.components[i].originGeometry !== null){
                        this.components[i].originGeometry.move(x, y);
                    }
                } else {
                    this.components[i].x += x;
                    this.components[i].y += y;
                }
            }

            //if(leadLineFlag === false && this.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL){
            //    for (var k = 0, len = this.leadLinePoints.length; k < len; k++) {
            //        this.leadLinePoints[k].move(x, y);
            //    }
            //}

            for (var i = 0, len = this.controlPoints.length; i < len; i++) {
                this.controlPoints[i].move(x, y);
            }

            for (var j = 0, len = this.scalePoints.length; j < len; j++) {
                this.scalePoints[j].move(x, y);
            }
        }
    },

    /**
     * Method: isDot
     * 点类型的标绘对象
     *
     */
    isDot: function () {
        if(this.CLASS_NAME === "SuperMap.Geometry.DotSymbol" ||
            this.CLASS_NAME === "SuperMap.Geometry.GroupObject" ||
            this.CLASS_NAME === "SuperMap.Geometry.FlagGroup" ||
            this.CLASS_NAME === "SuperMap.Geometry.GeoRouteNode" ||
            this.CLASS_NAME === "SuperMap.Geometry.AirDeployment" ||
            this.CLASS_NAME === "SuperMap.Geometry.NavyDeployment"){
            return true;
        } else {
            return false;
        }
    },

    /**
     * Method: clearBounds
     * Nullify this components bounds and that of its parent as well.
     * 清除几何对象的bounds。
     * 如果该对象有父类，也会清除父类几何对象的bounds。
     */
    clearBounds: function() {
        SuperMap.Geometry.Collection.prototype.clearBounds.apply(this, arguments);

        for(var i = 0; i < this.components.length; i++){
            if(this.components[i] instanceof SuperMap.Feature.Vector){
                this.components[i].geometry.clearBounds();
            } else {
                this.components[i].clearBounds();
            }
        }
    },

    /**
     * Method: getSymbolData
     * 获取标号数据。
     *
     */
    getSymbolData: function() {
        this.setSymbolData();
        return this.symbolData;
    },

    /**
     * Method: parseSymbolData
     * 解析标号数据。
     *
     */
    parseSymbolData: function() {
        if(this.symbolData !== null){
            if(this.symbolData.saveGeoData !== undefined){
                this.saveGeoData = this.symbolData.saveGeoData;
            }

            this.libID = this.symbolData.libID;
            this.code = this.symbolData.code;
            this.symbolType = this.symbolData.symbolType;
            this.symbolName = this.symbolData.symbolName;

            this.textContent = this.symbolData.textContent;

            this.maxEditPts = this.symbolData.algoMaxEditPts;
            this.minEditPts = this.symbolData.algoMinEditPts;

            if(this.symbolData.dScale !== undefined){
                this.dScale = this.symbolData.dScale;
            }

            if(this.symbolData.dRotate !== undefined){
                this.dRotate = this.symbolData.dRotate;
            }

            if(this.symbolData.resolution !== undefined){
                this.resolution = this.symbolData.resolution;
            }

            if(this.symbolData.uuid !== undefined){
                this.uuid = this.symbolData.uuid;
            }

            if(this.symbolData.associatedUuid !== undefined){
                this.associatedUuid = this.symbolData.associatedUuid;
            }

            if(this.symbolData.scaleByMap !== undefined){
                this.scaleByMap = this.symbolData.scaleByMap;
            }

            if(this.symbolData.localePoints){
                var positionPoints = [];
                for(var i = 0; i < this.symbolData.localePoints.length; i++){
                    positionPoints.push(new SuperMap.Geometry.Point(this.symbolData.localePoints[i].x, this.symbolData.localePoints[i].y));
                }

                if(positionPoints.length !== 0){
                    this.controlPoints = positionPoints;
                }
            }

            if(this.symbolData.note !== undefined){
                this.note = this.symbolData.note;
            }

            if(this.symbolData.custom !== undefined){
                this.custom = this.symbolData.custom;
            }

            if(this.symbolData.extendProperty){
                for(var j = 0; j < this.symbolData.extendProperty.length; j++){
                    var property = this.symbolData.extendProperty[j];
                    this.extendProperty.addProperty(property.key, property.value);
                }
            }

            if(this.symbolData.scaleValues !== undefined && this.symbolData.scaleValues.length !== 0){
                this.scaleValues = [];
                for(var k = 0; k < this.symbolData.scaleValues.length; k++){
                    this.scaleValues.push(this.symbolData.scaleValues[k]);
                }
            }

            if(this.symbolData.subSymbols !== undefined && this.symbolData.subSymbols.length !== 0){
                var subSymbols = [];
                for(var i = 0; i < this.symbolData.subSymbols.length; i++){
                    var libID = this.symbolData.subSymbols[i].libID;
                    if(libID === undefined){
                        libID = this.libID;
                    }
                    var code = this.symbolData.subSymbols[i].code;
                    if(code === undefined){
                        code = this.symbolData.subSymbols[i];
                    }
                    var options = { };
                    if(this.symbolData.subSymbols[i].symbolData !== undefined) {
                        options.symbolData = this.symbolData.subSymbols[i].symbolData;
                    }
                    if(this.symbolData.subSymbols[i].textContent !== undefined) {
                        options.textContent = this.symbolData.subSymbols[i].textContent;
                    }
                    if(this.symbolData.subSymbols[i].totalNum !== undefined) {
                        options.totalNum = this.symbolData.subSymbols[i].totalNum;
                    }
                    subSymbols.push(new SuperMap.Plot.SubSymbol(libID, code, options));
                }
                this.subSymbols = subSymbols;
            }
        }
    },

    /**
     * Method: setSymbolData
     * 设置标号数据。
     *
     */
    setSymbolData: function() {
        if(this.symbolData === null) {
            this.symbolData = {};
        }

        this.symbolData.saveGeoData = true;

        this.symbolData.uuid = this.uuid;
        this.symbolData.associatedUuid = this.associatedUuid;

        this.symbolData.dRotate = this.dRotate;
        this.symbolData.dScale = this.dScale;

        this.symbolData.libID = this.libID;
        this.symbolData.code = this.code;
        this.symbolData.symbolType = this.symbolType;
        this.symbolData.symbolName = this.symbolName;

        this.symbolData.textContent = this.textContent;
        this.symbolData.scaleByMap = this.scaleByMap;

        this.symbolData.algoMaxEditPts = this.maxEditPts;
        this.symbolData.algoMinEditPts = this.minEditPts;

        this.symbolData.resolution = this.resolution;

        this.symbolData.subSymbols = this.subSymbols;
        this.symbolData.scaleValues = this.scaleValues;
        this.symbolData.localePoints = this.controlPoints;

        this.symbolData.note = this.note;
        this.symbolData.custom = this.custom;

        this.symbolData.extendProperty = [];
        var nExtProCount = this.getExtendProperty().getPropertyCount();
        for(var i = 0; i < nExtProCount; i++){
            var property = this.getExtendProperty().getPropertyByIndex(i);
            this.symbolData.extendProperty.push(property);
        }

        SuperMap.Plot.AnalysisSymbol.setStyle(this.feature.style, this.symbolData);
    },

    /**
     * Method: getHandleCount
     * 获取控制点个数
     *
     * Returns:
     * {Integer} 返回控制点个数。
     */
    getHandleCount:function(){
        switch(this.symbolType){
            case SuperMap.Plot.SymbolType.ELLIPSESYMBOL:
            case SuperMap.Plot.SymbolType.CIRCLESYMBOL:
            case SuperMap.Plot.SymbolType.ARCSYMBOL:
            case SuperMap.Plot.SymbolType.CHORDSYMBOL:
            case SuperMap.Plot.SymbolType.PIESYMBOL:
            //case SuperMap.Plot.SymbolType.REGULARPOLYGON:
            case SuperMap.Plot.SymbolType.LINERELATION:
            case SuperMap.Plot.SymbolType.SYMBOLTEXT:
            case SuperMap.Plot.SymbolType.SYMBOLTEXT1:
                return this.controlPoints.length + 9;
            default:
                return 9;
        }
    },

    /**
     * Method: calculateControlPoints
     * 编辑图形后，重新计算 包围盒和 旋转点
     */
    getHandleAndRotatePoints:function() {
        var obj = {};
        obj.handlePoints = [];
        obj.rotatePoints = [];

        this.clearBounds();
        var bounds = this.getBounds();
        if(this.symbolType === SuperMap.Plot.SymbolType.TEXTSYMBOL){
            for(var i = 0; i < this.components.length; i++){
                bounds.extend(this.components[i].getBoundsByText(this.layer.map, this.components[i].style));
            }
        }
        if(bounds === null){
            return obj;
        }

        if(this.getHandleCount() > 9){
            if(this.symbolType === SuperMap.Plot.SymbolType.REGULARPOLYGON){
                obj.handlePoints.push(this.controlPoints[0]);
                var pps = this.symbolData.innerCells[0].positionPoints;
                obj.handlePoints.push(new SuperMap.Geometry.Point(pps[pps.length-1].x, pps[pps.length-1].y));
            } else {
                obj.handlePoints = this.controlPoints;
            }

            for( var i = 0; i < obj.handlePoints.length; i++){
                (obj.handlePoints[i]).tag = i;
            }
        } else {
            var cp1 = new SuperMap.Geometry.Point(bounds.right, bounds.top);
            var cp2 = new SuperMap.Geometry.Point(bounds.left, bounds.top);
            var cp3 = new SuperMap.Geometry.Point(bounds.right, bounds.bottom);
            var cp4 = new SuperMap.Geometry.Point(bounds.left, bounds.bottom);

            var cp9 = new SuperMap.Geometry.Point((cp1.x + cp2.x) / 2, cp1.y);
            var cp6 = new SuperMap.Geometry.Point(cp1.x, (cp1.y + cp3.y) / 2);
            var cp7 = new SuperMap.Geometry.Point((cp3.x + cp4.x) / 2, cp3.y);
            var cp8 = new SuperMap.Geometry.Point(cp2.x, (cp2.y + cp4.y) / 2);

            obj.handlePoints = [cp2.clone(), cp9.clone(), cp1.clone(), cp8.clone(), cp6.clone(), cp4.clone(), cp7.clone(), cp3.clone()];
            var j = 1;
            for( var i = 0; i < obj.handlePoints.length; i++){
                (obj.handlePoints[i]).nHandle = j++;
            }
        }


        if(this.symbolType !== SuperMap.Plot.SymbolType.ANNOFRAMESYMBOL &&
            this.symbolType !== SuperMap.Plot.SymbolType.LINERELATION &&
            this.symbolType !== SuperMap.Plot.SymbolType.SYMBOLTEXT &&
            this.symbolType !== SuperMap.Plot.SymbolType.SYMBOLTEXT1 &&
            !(this instanceof SuperMap.Geometry.NavyDeployment)){
            var cp1 = new SuperMap.Geometry.Point(bounds.right , bounds.top);
            //var cp3 = new SuperMap.Geometry.Point(bounds.right , bounds.bottom );
            var cp1Pixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(cp1.x,cp1.y));
            //var cp3Pixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(cp3.x,cp3.y));
            //var cp5Pixel = new SuperMap.Pixel(cp1Pixel.x+(cp3Pixel.x - cp1Pixel.x)/2 + 20,cp1Pixel.y+(cp3Pixel.y - cp1Pixel.y)/2);
            var cp5Pixel = new SuperMap.Pixel(cp1Pixel.x+10,cp1Pixel.y-10);
            var cp5Lonlat = this.layer.map.getLonLatFromPixel(cp5Pixel);
            var cp5 = new SuperMap.Geometry.Point(cp5Lonlat.lon, cp5Lonlat.lat);
            cp5.isRotatePoint = true;
            obj.rotatePoints = [cp5];
        }

        return obj;
    },

    /**
     * Method: rotate
     * 围绕中心点旋转组合对象。
     *
     * Parameters:
     * rotateValue - {Float} 旋转角的度数。
     */
    rotate: function(rotateValue, anchorPoint) {
        if(this.symbolType === SuperMap.Plot.SymbolType.TEXTSYMBOL){
            if(!this.feature.style.labelRotation){
                this.feature.style.labelRotation = -rotateValue;
            } else {
                this.feature.style.labelRotation += -rotateValue;
            }
        } else {
            for(var i = 0, len = this.components.length; i < len; i++) {
                if(this.components[i].CLASS_NAME !== "SuperMap.Geometry.GeoText"){
                    this.components[i].rotate(rotateValue, anchorPoint);
                    if(this.components[i].originGeometry && this.components[i].originGeometry !== null){
                        this.components[i].originGeometry.rotate(rotateValue, anchorPoint);
                    }
                } else {
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
            }
        }

        for (var m = 0; m < this.controlPoints.length; m++) {
            this.controlPoints[m].rotate(rotateValue, anchorPoint);
        }

        for (var n = 0; n < this.scalePoints.length; n++) {
            this.scalePoints[n].rotate(rotateValue, anchorPoint);
        }

        if(SuperMap.Geometry.PlottingGeometry.isAccessServer(this.libID, this.code)){
            for(var k = 0; k < this.symbolData.innerCells.length; k++){
                for(var n = 0; n < this.symbolData.innerCells[k].positionPoints.length; n++){
                    var tempPositionPoint = new SuperMap.Geometry.Point(this.symbolData.innerCells[k].positionPoints[n].x, this.symbolData.innerCells[k].positionPoints[n].y);
                    tempPositionPoint.rotate(rotateValue, anchorPoint);
                    this.symbolData.innerCells[k].positionPoints[n].x = tempPositionPoint.x;
                    this.symbolData.innerCells[k].positionPoints[n].y = tempPositionPoint.y;
                }
            }

            for(var j = 0; j < this.symbolData.scalePoints.length; j++){
                var tempScalePoint = new SuperMap.Geometry.Point(this.symbolData.scalePoints[j].x, this.symbolData.scalePoints[j].y);
                tempScalePoint.rotate(rotateValue, anchorPoint);
                this.symbolData.scalePoints[j].x = tempScalePoint.x;
                this.symbolData.scalePoints[j].y = tempScalePoint.y;
            }
        }
    },

    /**
     * Method: resizeControlPoints
     * 根据拖动的手柄位置，改变编辑点坐标
     */
    resizeControlPoints:function(pixel, nHandle, oldBounds, controlPoints) {
        var rtNew = this.resizeBounds(pixel, nHandle, oldBounds);

        if(SuperMap.Plot.PlottingUtil.equalFuzzy(rtNew.getWidth(), 0) && SuperMap.Plot.PlottingUtil.equalFuzzy(rtNew.getHeight(), 0)) {
            return;
        }
        if(SuperMap.Plot.PlottingUtil.equalFuzzy(oldBounds.getWidth(), 0) && SuperMap.Plot.PlottingUtil.equalFuzzy(oldBounds.getHeight(), 0)) {
            return;
        }

        var dXRatio = SuperMap.Plot.PlottingUtil.equalFuzzy(oldBounds.getWidth(), 0) ? 0 : rtNew.getWidth()/oldBounds.getWidth();
        var dYRatio = SuperMap.Plot.PlottingUtil.equalFuzzy(oldBounds.getHeight(), 0) ? 0 : rtNew.getHeight()/oldBounds.getHeight();

        var pntOrg1 = new SuperMap.Geometry.Point((oldBounds.left + oldBounds.right) / 2, (oldBounds.top + oldBounds.bottom) / 2);
        var pntOrg2 = new SuperMap.Geometry.Point((rtNew.left + rtNew.right)/ 2, (rtNew.top + rtNew.bottom) / 2);

        for (var i = 0; i < this.controlPoints.length; i++) {
            this.controlPoints[i].x = pntOrg2.x + (controlPoints[i].x-pntOrg1.x)*dXRatio;
            this.controlPoints[i].y = pntOrg2.y + (controlPoints[i].y-pntOrg1.y)*dYRatio;
        }
    },

    /**
     * Method: moveHandle
     * 根据拖动的手柄位置，改变编辑点坐标
     */
    resizeBounds:function(pixel, nHandle, oldBounds) {
        this.clearBounds();
        var lonLat = this.layer.map.getLonLatFromPixel(pixel);

        if(oldBounds === null){
            oldBounds = new SuperMap.Bounds();
        }

        var rtNew = oldBounds.clone();
        var pnt2D = new SuperMap.Geometry.Point(lonLat.lon,lonLat.lat);
        switch ( nHandle ){
            case 1:
                rtNew.top = pnt2D.y;
                rtNew.left = pnt2D.x;
                break;
            case 3:
                rtNew.top = pnt2D.y;
                rtNew.right = pnt2D.x;
                break;
            case 6:
                rtNew.left = pnt2D.x;
                rtNew.bottom = pnt2D.y;
                break;
            case 8:
                rtNew.right = pnt2D.x;
                rtNew.bottom = pnt2D.y;
                break;
            case 2:
                rtNew.top = pnt2D.y;
                break;
            case 4:
                rtNew.left = pnt2D.x;
                break;
            case 5:
                rtNew.right = pnt2D.x;
                break;
            case 7:
                rtNew.bottom = pnt2D.y;
                break;
            default:
                break;
        }

        return rtNew;
    },

    /**
     * Method: isCanFill
     * 获取非闭合图形是否可以填充
     */
    isCanFill:function() {
        if(this.libID === 22){
            switch(this.code){
                case 1001:
                case 1002:
                case 1004:
                case 1006:
                case 1011:
                    return true;
                default:
                    return false;
            }
        } else if(this.libID === 100){
            switch(this.code){
                case 25200:
                    return true;
                default:
                    return false;
            }
        } else {
            return false;
        }
    },

    /**
     * Method: reView
     * 根据点标号的原始信息重新计算 符号所在的位置
     *（用于地图缩放的时候重新计算  更换原来feature 中各个geometry的components  让原来的geometry不发生变化。）
     * @param feature
     */
    reView: function () {

    },

    CLASS_NAME: "SuperMap.Geometry.PlottingGeometry"
});

/**
 * APIFunction: SuperMap.Geometry.PlottingGeometry.isAccessServer
 * 根据标号库ID和标号Code，判断是否需要去服务器取数据。
 *
 * Parameters:
 * libID - {Integer} 标号库ID，基本图元的标号库ID默认为：0。
 * code - {Integer} 标号Code。
 *
 * Returns:
 * {Boolean} 返回是否需要去服务器取数据
 */
SuperMap.Geometry.PlottingGeometry.isAccessServer = function(libID, code){
    if(0 === libID && (code === SuperMap.Plot.SymbolType.LINERELATION ||
        code === SuperMap.Plot.SymbolType.NAVYDEPLOYMENT ||
        code === SuperMap.Plot.SymbolType.AIRDEPLOYMENT ||
        code === SuperMap.Plot.SymbolType.ARCREGION ||
        code === SuperMap.Plot.SymbolType.INTERFERENCEBEAM ||
        code === SuperMap.Plot.SymbolType.AIRROUTE ||
        code === SuperMap.Plot.SymbolType.NAVYROUTE ||
        code === SuperMap.Plot.SymbolType.MISSILEROUTE ||
        code === SuperMap.Plot.SymbolType.SATELLITE ||
        code === SuperMap.Plot.SymbolType.SATELLITETIMEWINDOWS ||
        code === SuperMap.Plot.SymbolType.SYMBOLTEXT ||
        code === SuperMap.Plot.SymbolType.SYMBOLTEXT1 ||
        code === SuperMap.Plot.SymbolType.GROUPOBJECT ||
        code === SuperMap.Plot.SymbolType.ROUTENODE ||
        code === SuperMap.Plot.SymbolType.LITERATESIGN ||
        code === SuperMap.Plot.SymbolType.FLAGGROUP)){
        return false;
    } else {
        return SuperMap.Plot.AlgoSymbolFactory.isAccessServer(libID, code);
    }
};

/**
 * Function: SuperMap.Geometry.PlottingGeometry.createGeometry
 * 根据标号库ID和标号Code，创建相应的标号对象。
 *
 * Parameters:
 * libID - {Integer} 标号库ID，基本图元的标号库ID默认为：0。
 * code - {Integer} 标号Code。
 * positionPoints - {Array(<SuperMap.Geometry.Point>)} 标号的定位点
 * options - {Object} 创建标绘对象所需参数。
 *
 * Returns:
 * {<SuperMap.Geometry.PlottingGeometry>} 根据类型返回 <SuperMap.Geometry.PlottingGeometry> 的子类。
 */
SuperMap.Geometry.PlottingGeometry.createGeometry = function(libID, code, positionPoints, options){
    var plottingGeometry = null;

    var symbolType = null;
    if(libID === 0) {
        symbolType = code;
    } else if(options.symbolData && options.symbolData.symbolType){
        symbolType = options.symbolData.symbolType;
    }

    if(!options){
        options = {};
    }

    options.libID = libID;
    options.code = code;
    switch(symbolType) {
        case SuperMap.Plot.SymbolType.GROUPOBJECT:
            plottingGeometry = new SuperMap.Geometry.GroupObject(options);
            break;
        case SuperMap.Plot.SymbolType.POLYGONREGION:
            plottingGeometry = new SuperMap.Geometry.PolygonRegion(options);
            break;
        case SuperMap.Plot.SymbolType.ARCREGION:
            plottingGeometry = new SuperMap.Geometry.ArcRegion(options);
            break;
        case SuperMap.Plot.SymbolType.LINERELATION:
            plottingGeometry = new SuperMap.Geometry.LineRelation(options);
            break;
        case SuperMap.Plot.SymbolType.AIRDEPLOYMENT:
            plottingGeometry = new SuperMap.Geometry.AirDeployment(options);
            break;
        case SuperMap.Plot.SymbolType.NAVYDEPLOYMENT:
            plottingGeometry = new SuperMap.Geometry.NavyDeployment(options);
            break;
        case SuperMap.Plot.SymbolType.AIRROUTE:
            plottingGeometry = new SuperMap.Geometry.AirRoute(options);
            break;
        case SuperMap.Plot.SymbolType.NAVYROUTE:
            plottingGeometry = new SuperMap.Geometry.NavyRoute(options);
            break;
        case SuperMap.Plot.SymbolType.MISSILEROUTE:
            plottingGeometry = new SuperMap.Geometry.MissileRoute(options);
            break;
        case SuperMap.Plot.SymbolType.DOTSYMBOL:
            plottingGeometry = new SuperMap.Geometry.DotSymbol(options);
            break;
        case SuperMap.Plot.SymbolType.ROUTENODE:
            plottingGeometry = new SuperMap.Geometry.GeoRouteNode(options);
            break;
        case SuperMap.Plot.SymbolType.INTERFERENCEBEAM:
            plottingGeometry = new SuperMap.Geometry.InterferenceBeam(options);
            break;
        case SuperMap.Plot.SymbolType.SATELLITE:
            plottingGeometry = new SuperMap.Geometry.Satellite(options);
            break;
        case SuperMap.Plot.SymbolType.SATELLITETIMEWINDOWS:
            plottingGeometry = new SuperMap.Geometry.SatelliteTimeWindows(options);
            break;
        case SuperMap.Plot.SymbolType.SYMBOLTEXT:
            plottingGeometry = new SuperMap.Geometry.SymbolText(options);
            break;
        case SuperMap.Plot.SymbolType.SYMBOLTEXT1:
            plottingGeometry = new SuperMap.Geometry.SymbolText1(options);
            break;
        case SuperMap.Plot.SymbolType.LITERATESIGN:
            plottingGeometry = new SuperMap.Geometry.GeoLiterateSign(options);
            break;
        case SuperMap.Plot.SymbolType.FLAGGROUP:
            plottingGeometry = new SuperMap.Geometry.FlagGroup(options);
            break;
        default: //线面标号和图元
            plottingGeometry = SuperMap.Plot.AlgoSymbolFactory.getAlgoSymbol(libID, code, options);
    }

    if(true !== plottingGeometry.saveGeoData){
        plottingGeometry.isEdit = false;
    }

    if(!positionPoints || positionPoints === null){
        plottingGeometry.calculateParts();
    } else {
        if(!SuperMap.Util.isArray(positionPoints)){
            positionPoints = [positionPoints];
        }
        if(positionPoints.length !== 0){
            plottingGeometry.setPositionPoints(positionPoints);
        } else {
            plottingGeometry.calculateParts();
        }
    }

    if(true !== plottingGeometry.saveGeoData){
        plottingGeometry.isEdit = true;
    }

    return plottingGeometry;
};

/**
 * APIFunction: SuperMap.Geometry.PlottingGeometry.createFeature
 * 根据类型创建相应的标号对象。
 *
 * Parameters:
 * libID - {Integer} 标号库ID，基本图元的标号库ID默认为：0。
 * code - {Integer} 标号Code。
 * positionPoints - {Array(<SuperMap.Geometry.Point>)} 标号的定位点
 * options - {Object} 创建标绘对象所需参数。
 *
 * Returns:
 * {<SuperMap.Feature.Vector>} 根据类型返回相应的标绘对象。
 */
SuperMap.Geometry.PlottingGeometry.createFeature = function(libID, code, positionPoints, options){
    var plottingFeature = new SuperMap.Feature.Vector();
    var featureStyle = {};
    if(options && options.symbolData){
        featureStyle = SuperMap.Plot.AnalysisSymbol.getStyle(options.symbolData);
    } else {
        featureStyle = SuperMap.Geometry.PlottingGeometry.defaultStyle;
    }

    if(featureStyle){
        plottingFeature.style = SuperMap.Util.copyAttributes(plottingFeature.style, featureStyle);
    }

    options.feature = plottingFeature;

    var plottingGeometry = SuperMap.Geometry.PlottingGeometry.createGeometry(libID, code, positionPoints, options);

    plottingFeature.geometry = plottingGeometry;

    var plotting = SuperMap.Plotting.getInstance(plottingGeometry.layer.map, plottingGeometry.layer.serverUrl);
    SuperMap.Plot.AnalysisSymbol.mergeDefaultStyleToFeature(plottingFeature.style, plottingGeometry, plotting.getDefaultStyle());

    if(plottingGeometry instanceof SuperMap.Geometry.Route){
        plottingGeometry.applyStyle();
    }

    return plottingFeature;
};

/**
 * Constant: SuperMap.Geometry.PlottingGeometry.defaultStyle
 * 标绘对象的默认样式
 *
 */
SuperMap.Geometry.PlottingGeometry.defaultStyle = {
    display: "display",
    strokeColor: "#ff0000",
    strokeDashstyle: "solid",
    strokeOpacity: "1.00",
    strokeWidth: 2,
    surroundLineColor: "#ffff00",
    surroundLineColorOpacity: "1.00",
    surroundLineWidth: 4,
    fill: false,
    fillColor: "#ff0000",
    fillOpacity: "0.31",
    fillBackColor: "#ff0000",
    fillBackOpacity: "1.00",
    fillGradientMode: "NONE",
    fontColor: "#000000",
    fontFamily: "Microsoft YaHei",
    fontSize: "12",
    labelAlign: "lt",
    labelRotation: -0,
    labelXOffset: 0,
    labelYOffset: 0
};
