/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol1015 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol1009,{

    /**
     * Constructor: SuperMap.Geometry.AlgoSymbol
     * 创建一个线面标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Geometry.AlgoSymbol>} 新的标绘对象。
     */
    initialize:function(option){
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.symbolType = SuperMap.Plot.SymbolType.ALGOSYMBOL;

        this.minEditPts = 2;
        this.maxEditPts = 99999;

        if(undefined === option.scaleByMap || null === option.scaleByMap){
            this.scaleByMap = false;
        }

        if(undefined === option.constantSize || null === option.constantSize) {
            this.constantSize = true;
        }

        this.subSymbolDefaultPixelSize = 15;
    },

    /**
     * Method: reView
     * 根据标号的原始信息重新计算,主要想让箭头随图缩放。
     *
     */
    reView: function () {
        if(this.prevStrokeWidth !== undefined && this.prevStrokeWidth !== this.feature.style.strokeWidth){
            this.strokeWidth = this.feature.style.strokeWidth;
        }

        if(this.resolution !== this.layer.renderer.getResolution()){
            if(this.isEdit === true){
                var mapScale = this.resolution / this.layer.renderer.getResolution();
                this.dScale *= mapScale;

                //处理线宽缩放
                if(this.strokeWidth === undefined || null === this.strokeWidth){
                    this.strokeWidth = this.feature.style.strokeWidth;
                }

                if(this.baseScale === undefined){
                    var bounds = this.getBounds();
                    var baseDis = bounds.getWidth();
                    if(baseDis < bounds.getHeight()){
                        baseDis = bounds.getHeight();
                    }
                    var scaleSize = (this.strokeWidth/0.5)*5;
                    var pt1 = this.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(0,0));
                    var pt2 = this.layer.map.getLonLatFromViewPortPx(new SuperMap.Pixel(scaleSize,0));

                    var dis = SuperMap.Plot.PlottingUtil.distance(pt1,pt2);
                    this.baseScale = dis/baseDis;
                }

                if(this.dScale <= this.baseScale){
                    this.scaleStrokeWidth = true;

                    var scaleSize = (this.strokeWidth/0.5)*5;
                    var currentSize = this.dScale*scaleSize/this.baseScale;
                    this.feature.style.strokeWidth = Math.round(currentSize/10);
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
                this.feature.style.fontSize *= mapScale;
                for(var i = 0; i < this.components.length; i++){
                    if(this.components[i] instanceof SuperMap.Geometry.GeoText){
                        this.components[i].style.fontSize *= mapScale;
                    }
                }

                //处理文字选择包围盒
                if(this.symbolType === SuperMap.Plot.SymbolType.TEXTSYMBOL && this.layer.selectedFeatures.indexOf(this.feature) !== -1){
                    this.layer.plottingEdit.resetControlPointsValue();
                }

                if(this.dScale >= 1){
                    this.constantSize = true;
                    this.isEdit = false;
                    this.calculateParts();
                    this.isEdit = true;
                }
                else{
                    this.constantSize = false;
                }

                this.resolution = this.layer.renderer.getResolution();
            }
        }
        else{
            var mapScale = this.resolution / this.layer.renderer.getResolution();
            this.dScale *= mapScale;

            if(this.dScale >= 1){
                this.constantSize = true;
                this.isEdit = false;
                this.calculateParts();
                this.isEdit = true;
            }
            else{
                this.isEdit = false;
                this.subSymbolScaleValue = this.getSubSymbolScaleValue() * this.dScale;

                this.isEdit = true;
                this.constantSize = false;
                this.calculateParts();
            }

            this.resolution = this.layer.renderer.getResolution();
        }
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol1015"
});