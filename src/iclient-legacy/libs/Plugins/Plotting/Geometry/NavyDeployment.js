/**
 * Class: SuperMap.Geometry.NavyDeployment
 * HJBL部署。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GroupObject>
 */
SuperMap.Geometry.NavyDeployment = new SuperMap.Class(SuperMap.Geometry.GroupObject,{

    /**
     * APIProperty: colNum
     * {Integer} HJBL部署排列的列数，默认为1
     */
    colNum: null,

    /**
     * APIProperty: spaceDis
     * {Integer} 行列之间的间距，默认是10，单位是：0.1mm
     */
    space: null,

    /**
     * Constructor: SuperMap.Geometry.NavyDeployment
     * 创建一个标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.NavyDeployment>} 新的标绘对象。
     */
    initialize: function (options) {
        SuperMap.Geometry.GroupObject.prototype.initialize.apply(this, arguments);

        this.minEditPts = 1;
        this.maxEditPts = 1;

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.NAVYDEPLOYMENT;
        this.symbolType = SuperMap.Plot.SymbolType.NAVYDEPLOYMENT;
        this.symbolName = "NavyDeployment";

        this.scaleValues.push(0.3);

        if(this.colNum === null){
            this.colNum = 1;
        }

        if(this.space === null){
            this.space = 10;
        }

        if(this.scaleByMap === null){
            this.scaleByMap = true;
        }
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        SuperMap.Geometry.GroupObject.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        //清空原有的所有点
        this.components = [];

        if(this.subAssociatedUuids.length !== 0){
            var features = [];
            for(var i = 0; i < this.subAssociatedUuids.length; i++){

                var feature = this.layer.getFeatureByUuid(this.subAssociatedUuids[i]);
                if(null === feature){
                    continue;
                }

                features.push(feature);
            }
            this.layer.removeFeatures(features);
            for(var j = 0; j < features.length; j++){
                features[j].layer = this.layer;
                this.components.push(features[j]);

                if (features[j].geometry.symbolType === SuperMap.Plot.SymbolType.DOTSYMBOL) {
                    features[j].geometry.scaleByMap = true;
                }
            }

            return;
        }

        if( this.layer !== null && this.layer.getFeatureByUuid(this.associatedUuid)) {
            var feature = this.layer.getFeatureByUuid(this.associatedUuid);
            if(!feature.geometry instanceof SuperMap.Geometry.DotSymbol){
                return;
            }

            if(feature.geometry.controlPoints.length === 0){
                return;
            }

            var bAdd = false;
            for(var i = 0; i < feature.geometry.joinLines.length; i++){
                if(this === feature.geometry.joinLines[i]){
                    bAdd = true;
                    break;
                }
            }

            if(!bAdd){
                feature.geometry.joinLines.push(this);
            }

            var isHaveData = false;
            for(var index = 0; index < this.subSymbols.length; index++){
                if(this.subSymbols[index].symbolData !== undefined && this.subSymbols[index].symbolData !== null){
                    isHaveData = true;
                }
            }

            if(isHaveData === false){
                return;
            }

            var controlPoints = SuperMap.Plot.PlottingUtil.clonePoints(feature.geometry.controlPoints[0]);

            var locationPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(controlPoints[0].x,controlPoints[0].y));

            var spaceDisLonLat = SuperMap.Plot.PlottingUtil.transitionPoint(this.layer.map, new SuperMap.Geometry.Point(this.space, 0), locationPixel);
            var spaceDisLen = Math.abs(spaceDisLonLat.x - controlPoints[0].x);

            var leftBottomPoint = new SuperMap.Geometry.Point(0,0);
            var leftBottomLonLat = SuperMap.Plot.PlottingUtil.transitionPoint(this.layer.map, leftBottomPoint, locationPixel);

            var rightTopPoint = new SuperMap.Geometry.Point(100, 100);
            var rightTopLonLat = SuperMap.Plot.PlottingUtil.transitionPoint(this.layer.map, rightTopPoint, locationPixel);

            var dotBounds = new SuperMap.Bounds(leftBottomLonLat.x, leftBottomLonLat.y, rightTopLonLat.x, rightTopLonLat.y);
            var rowNum = Math.ceil(this.getSubSymbolCount(this.subSymbols.length-1)/this.colNum);
            var width = dotBounds.getWidth()*this.colNum + spaceDisLen*(this.colNum+1);
            var heigth = dotBounds.getHeight()*rowNum + spaceDisLen*(rowNum+1);

            var topRightPoint = new SuperMap.Geometry.Point(controlPoints[0].x - spaceDisLen*5, controlPoints[0].y + heigth/2);
            this.setSubSymbolText();

            for(var i = 0; i < this.subSymbols.length; i++){
                if(this.subSymbols[i].symbolData === undefined || this.subSymbols[i].symbolData === null){
                    continue;
                }

                for(var j = 0; j < this.subSymbols[i].totalNum; j++){
                    var count = this.getSubSymbolCount(i-1) + j + 1;
                    var curCol = Math.ceil(count/rowNum);
                    var curRow = count - rowNum*(curCol-1);

                    if(curCol !== 1 && curRow === 1){
                        this.clearBounds();
                        var tempBounds = this.getBounds();
                        topRightPoint.x = tempBounds.left;
                    }

                    var ptX = topRightPoint.x - (spaceDisLen + dotBounds.getWidth()/2);
                    var ptY = topRightPoint.y - ((curRow)*(dotBounds.getHeight()+spaceDisLen));
                    var positionPoints = [new SuperMap.Geometry.Point(ptX,ptY)];

                    var libID = this.subSymbols[i].symbolData.libID;
                    var code = this.subSymbols[i].symbolData.code;
                    this.subSymbols[i].symbolData.annotationPosition = 6;
                    var symbolData = SuperMap.Util.cloneObject(this.subSymbols[i].symbolData);
                    var feature = SuperMap.Geometry.PlottingGeometry.createFeature(libID, code, positionPoints, {layer: this.layer, symbolData: symbolData});
                    feature.geometry.scaleByMap = true;
                    feature.layer = this.layer;
                    this.components.push(feature);

                    this.subAssociatedUuids.push(feature.geometry.uuid);
                }
            }

            if(this.textContent !== null && this.textContent.length !== 0){
                var positionPoint = new SuperMap.Geometry.Point(controlPoints[0].x - spaceDisLen*5, controlPoints[0].y + heigth/2);

                var textFeature = SuperMap.Geometry.PlottingGeometry.createFeature(0, 34, [positionPoint], {layer: this.layer, textContent: this.textContent});
                textFeature.layer = this.layer;
                textFeature.style.labelAlign = "rt";
                this.components.push(textFeature);

                this.subAssociatedUuids.push(textFeature.geometry.uuid);
            }

            this.clearBounds();
            var totalBounds = this.getBounds();
            totalBounds.top += spaceDisLen;
            totalBounds.bottom -= spaceDisLen;
            totalBounds.left -= spaceDisLen;
            totalBounds.right += spaceDisLen;

            var toolTipControlPoints = [];
            toolTipControlPoints.push(new SuperMap.Geometry.Point(totalBounds.left, totalBounds.top));
            toolTipControlPoints.push(new SuperMap.Geometry.Point(totalBounds.right, totalBounds.bottom));
            var tipPt = new SuperMap.Geometry.Point(controlPoints[0].x, controlPoints[0].y);
            tipPt.isFixedPos = true;
            toolTipControlPoints.push(tipPt);
            var borderFeature = SuperMap.Geometry.PlottingGeometry.createFeature(0, SuperMap.Plot.SymbolType.ANNOFRAMESYMBOL, toolTipControlPoints, {layer: this.layer});
            borderFeature.layer = this.layer;
            this.components.push(borderFeature);

            this.subAssociatedUuids.push(borderFeature.geometry.uuid);
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
        //this.calculateParts();
    },

    /**
     * Method: setSubSymbolText
     * 设置文字
     *
     */
    setSubSymbolText: function() {
        for(var i = 0; i < this.subSymbols.length; i++){
            if(this.subSymbols[i].symbolData !== null){
                this.subSymbols[i].symbolData.textContent = this.subSymbols[i].textContent;
            }
        }
    },

    /**
     * Method: getSubSymbolCount
     * 根据索引位置获取标号的总数
     *
     * Parameters:
     * index - {Integer} 索引。
     */
    getSubSymbolCount: function(index) {
        var totalNum = 0;

        if(index < 0){
            return totalNum;
        }

        if(index > this.subSymbols.length - 1){
            index = this.subSymbols.length - 1;
        }

        for(var i = 0; i <= index; i++){
            totalNum += this.subSymbols[index].totalNum;
        }

        return totalNum;
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
                if(components[i].geometry instanceof SuperMap.Geometry.GeoText){
                    var style = components[i].geometry.style;
                    if(style){
                        style = SuperMap.Util.copyAttributes(style, components[i].style);
                    }
                    bounds.extend(components[i].geometry.getBoundsByText(this.layer.map, style));
                } else {
                    if(components[i].geometry instanceof SuperMap.Geometry.DotSymbol ){
                        bounds.extend(components[i].geometry.getBoundsWithText());
                    } else {
                        bounds.extend(components[i].geometry.getBounds());
                    }
                }
            }
        }

        if (bounds.left != null && bounds.bottom != null &&
            bounds.right != null && bounds.top != null) {
            this.setBounds(bounds);
        }
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
            this.colNum = this.symbolData.colNum;
            this.speceDis = this.symbolData.speceDis;
            this.subSymbols = this.symbolData.subSymbols;
        }
    },

    /**
     * Method: setSymbolData
     * 设置标号数据。
     *
     */
    setSymbolData: function() {
        SuperMap.Geometry.GroupObject.prototype.setSymbolData.apply(this, arguments);

        //设置对象自己特有的属性到symbolData
        if(!!this.symbolData){
            this.symbolData.colNum = this.colNum;
            this.symbolData.speceDis = this.speceDis;
            this.symbolData.subSymbols = this.subSymbols;
        }
    },

    CLASS_NAME: "SuperMap.Geometry.NavyDeployment"
});