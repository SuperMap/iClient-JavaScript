/**
 * Class: SuperMap.Geometry.AirDeployment
 * KJBL部署。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.NavyDeployment>
 */
SuperMap.Geometry.AirDeployment = new SuperMap.Class(SuperMap.Geometry.NavyDeployment,{

    /**
     * APIProperty: isShowTooltip
     * {Boolean} 是否显示指示框,默认为显示
     */
    isShowTooltip: null,

    /**
     * Constructor: SuperMap.Geometry.AirDeployment
     * 创建一个标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.AirDeployment>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.GroupObject.prototype.initialize.apply(this, arguments);

        this.libID = 0;
        this.code = SuperMap.Plot.SymbolType.AIRDEPLOYMENT;
        this.symbolType = SuperMap.Plot.SymbolType.AIRDEPLOYMENT;
        this.symbolName = "AirDeployment";

        if(this.isShowTooltip === null){
            this.isShowTooltip = true;
        }
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        //自己特有

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
                features.push(this.layer.getFeatureByUuid(this.subAssociatedUuids[i]));
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

        if( this.layer === null || null === this.layer.getFeatureByUuid(this.associatedUuid)) {
            return;
        }

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
        //var tempPt = new SuperMap.Geometry.Point(feature.geometry.locationPoints[0].x, feature.geometry.locationPoints[0].y);
        var locationPixel = this.layer.map.getPixelFromLonLat(new SuperMap.LonLat(controlPoints[0].x, controlPoints[0].y));

        var spaceDisLonLat = SuperMap.Plot.PlottingUtil.transitionPoint(this.layer.map, new SuperMap.Geometry.Point(this.space, 0), locationPixel);
        var spaceDisLen = Math.abs(spaceDisLonLat.x - controlPoints[0].x);

        var leftBottomPoint = new SuperMap.Geometry.Point(0,0);
        var leftBottomLonLat = SuperMap.Plot.PlottingUtil.transitionPoint(this.layer.map, leftBottomPoint, locationPixel);

        var rightTopPoint = new SuperMap.Geometry.Point(100, 100);
        var rightTopLonLat = SuperMap.Plot.PlottingUtil.transitionPoint(this.layer.map, rightTopPoint, locationPixel);

        var dotBounds = new SuperMap.Bounds(leftBottomLonLat.x, leftBottomLonLat.y, rightTopLonLat.x, rightTopLonLat.y);
        var rowNum = Math.ceil(this.getSubSymbolCount(this.subSymbols.length-1)/this.colNum);
        var width = dotBounds.getWidth()*this.colNum + spaceDisLen*(this.colNum-1);
        var topLeftPoint = new SuperMap.Geometry.Point(controlPoints[0].x-width*0.5+0.5*dotBounds.getWidth(), controlPoints[0].y - spaceDisLen);
        if(this.isShowTooltip === true){
            topLeftPoint.y -= spaceDisLen * 4;
        }
        this.setSubSymbolText();

        //设置子标号数组
        var tempSubSymbols = [];
        for(var i = 0; i < this.subSymbols.length; i++) {
            for (var j = 0; j < this.subSymbols[i].totalNum; j++) {
                tempSubSymbols.push(this.subSymbols[i]);
            }
        }

        //根据行、列设置标号位置
        var index = 0;
        for(var i = 0; i < rowNum; i++){
            for(j = 0; j < this.colNum; j++){
                if(index >= tempSubSymbols.length){
                    break;
                }

                var subSymbol = tempSubSymbols[index];

                if(subSymbol.symbolData === undefined || subSymbol.symbolData === null){
                    continue;
                }

                var libID = subSymbol.symbolData.libID;
                var code = subSymbol.symbolData.code;

                var ptX = topLeftPoint.x + j*(spaceDisLen + dotBounds.getWidth());
                if(libID == 100 && code == 2800){
                    ptX -= (spaceDisLen + dotBounds.getWidth()) / 2.0;
                }

                //var ptY = topLeftPoint.y - (i+1)*(spaceDisLen*4 + dotBounds.getHeight());
                var ptY = topLeftPoint.y - (spaceDisLen*2 + dotBounds.getHeight());

                var positionPoints = [new SuperMap.Geometry.Point(ptX,ptY)];


                subSymbol.symbolData.annotationPosition = 5;
                var symbolData = SuperMap.Util.cloneObject(subSymbol.symbolData);
                var feature = SuperMap.Geometry.PlottingGeometry.createFeature(libID, code, positionPoints, {layer: this.layer, symbolData: symbolData});
                feature.geometry.scaleByMap = true;
                feature.layer = this.layer;
                this.components.push(feature);
                index++;

                this.subAssociatedUuids.push(feature.geometry.uuid);
            }
            this.clearBounds();
            var tempBounds = this.getBounds();
            topLeftPoint.y = tempBounds.bottom;
        }

        if(this.isShowTooltip){
            this.clearBounds();
            var totalBounds = this.getBounds();
            totalBounds.top += spaceDisLen;
            totalBounds.bottom -= spaceDisLen;
            totalBounds.left -= spaceDisLen;
            totalBounds.right += spaceDisLen;

            var tooltipControlPoints = [];
            tooltipControlPoints.push(new SuperMap.Geometry.Point(totalBounds.left, totalBounds.top));
            tooltipControlPoints.push(new SuperMap.Geometry.Point(totalBounds.right, totalBounds.bottom));
            var tipPt = new SuperMap.Geometry.Point(controlPoints[0].x, controlPoints[0].y);
            tipPt.isFixedPos = true;
            tooltipControlPoints.push(tipPt);
            //controlPoints.push(new SuperMap.Geometry.Point(controlPoints[0].x, controlPoints[0].y));
            var borderFeature = SuperMap.Geometry.PlottingGeometry.createFeature(0, SuperMap.Plot.SymbolType.ANNOFRAMESYMBOL, tooltipControlPoints, {layer: this.layer});
            borderFeature.layer = this.layer;
            this.components.push(borderFeature);

            this.subAssociatedUuids.push(borderFeature.geometry.uuid);
        }
    },

    /**
     * Method: parseSymbolData
     * 解析标号数据。
     *
     */
    parseSymbolData: function() {
        SuperMap.Geometry.NavyDeployment.prototype.parseSymbolData.apply(this, arguments);

        //自己特有
        if(!!this.symbolData){
            this.isShowTooltip = this.symbolData.isShowTooltip;
        }
    },

    /**
     * Method: setSymbolData
     * 设置标号数据。
     *
     */
    setSymbolData: function() {
        SuperMap.Geometry.NavyDeployment.prototype.setSymbolData.apply(this, arguments);

        //设置对象自己特有的属性到symbolData
        if(!!this.symbolData){
            this.symbolData.isShowTooltip = this.isShowTooltip;
        }
    },

    CLASS_NAME:"SuperMap.Geometry.AirDeployment"
});