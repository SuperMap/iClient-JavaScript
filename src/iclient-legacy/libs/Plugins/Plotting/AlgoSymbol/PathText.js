/**
 * Created by Administrator on 2016/10/21.
 */
/**
 * Class: SuperMap.Geometry.PathText
 * 连接线对象类。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.AlgoSymbol>
 */
SuperMap.Geometry.PathText = SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{

    /**
     * APIProperty: relLineText
     * {<SuperMap.Plot.RelLineText>} 文本在路径的位置，默认为右侧。
     */
    relLineText: 0,

    /**
     * APIProperty: showLine
     * {Boolean} 是否显示线。
     */
    showPathLine: true,

    /**
     * APIProperty: showLine
     * {Boolean} 是否显示线的箭头。
     */
    showPathLineArrow: false,

    /**
     * APIProperty: isCurve
     * {Boolean} 路径线是否是贝塞尔曲线。
     */
    isCurve: false,

    /**
     * APIProperty: isAvoid
     * {Boolean} 文字是否避让路径线。
     */
    isAvoid: false,

    /**
     * Constructor: SuperMap.Geometry.PathText
     * 创建一个标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的开放属性。
     *
     * Returns:
     * {<SuperMap.Geometry.PathText>} 新的标绘对象。
     */
    initialize: function(options){
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.code = SuperMap.Plot.SymbolType.PATHTEXT;
        this.libID = 0;
        this.symbolType = SuperMap.Plot.SymbolType.PATHTEXT;
        this.symbolName = "YXZJ";

        this.minEditPts = 2;
        this.maxEditPts = 9999;
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        if(null === this.controlPoints || 0 === this.controlPoints.length){
            return;
        }

        //if(0 == this.textContent.length){
        //    return;
        //}

        if(this.feature)
            this.style = this.feature.style;//SuperMap.Geometry.PlottingGeometry.defaultStyle;
        else
            this.style = SuperMap.Geometry.PlottingGeometry.defaultStyle;

        this.init();

        if(!SuperMap.Util.isArray(this.textContent)){
            this.textContent = [this.textContent];
        }

        //如果只有一个位置点，则按注记形式绘制
        if(1 === this.controlPoints.length && 0 !== this.textContent.length){
            var geometryText = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.TEXTSYMBOL, this.controlPoints, this.textContent[0]);
            geometryText.style = this.style;
            this.components.push(geometryText);
        }
        else{
            var pts = [];
            if (this.isCurve) {
                pts = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(this.controlPoints);
            }
            else {
                pts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
            }

            if(this.relLineText === SuperMap.Plot.RelLineText.ONBOTHLINE){
                this.relLineText = SuperMap.Plot.RelLineText.ONLEFTLINE;
                this.computeText(pts, this.textContent[0]);

                this.relLineText = SuperMap.Plot.RelLineText.ONRIGHTLINE;
                var showPathLineBack = this.showPathLine;
                this.showPathLine = false;
                if(this.textContent.length > 1){
                    this.computeText(pts, this.textContent[1]);
                }
                else{
                    this.computeText(pts, this.textContent[0]);
                }

                this.relLineText = SuperMap.Plot.RelLineText.ONBOTHLINE;
                this.showPathLine = showPathLineBack;
            }
            else{
                this.computeText(pts, this.textContent[0]);
            }
        }

        this.resolution = this.layer.renderer.getResolution();
    },

    computeText: function(pts, text){
        if(pts.length < 2){
            return;
        }

        var nSubTextCount = text.length;
        var pPoints = pts;
        var nPntCount = pPoints.length;
        var dTotalLength = 0;
        for(var i = 0; i < pPoints.length - 1; i++){
            dTotalLength += SuperMap.Plot.PlottingUtil.distance(pPoints[i], pPoints[i + 1]);
        }

        var pntSubLable = {index: -1, pt:pPoints[0]};
        var dNowPassedDistance = 0;
        var dBeforePointsDistance = 0;
        var dNextPointsDistance = 0;
        var nPointIndex = 0;
        var dPiToDu = 180.0 / Math.PI;
        var dDuToPi = Math.PI / 180.0;
        var nAngle = 0;//this.style.angle;
        //var szWordMaxSize(0, 0);

        var rc2TextBounds = this.getTextBounds(this.style, text);
        var sizeWordAlignOffset = {w:0,h:0};
        var stylelabelAlign = "lm";
        if(this.relLineText === SuperMap.Plot.RelLineText.ONLINE){
            //sizeWordAlignOffset = {w:0,h:rc2TextBounds.getHeight() / 2};
            stylelabelAlign = "lm";
        }else if(this.relLineText === SuperMap.Plot.RelLineText.ONLEFTLINE){
            //sizeWordAlignOffset = {w:0,h:rc2TextBounds.getHeight()};
            stylelabelAlign = "lb";
        }else {
            //sizeWordAlignOffset = {w:0,h:0};
            stylelabelAlign = "lt";
        }
        //sizeWordAlignOffset.h -= 2;
        dNowPassedDistance = (dTotalLength - rc2TextBounds.getWidth()) / 2;
        if(dNowPassedDistance <= 0)
        {
            dNowPassedDistance = 0;
            //return;
        }

        var listWordBounds = [];
        for(var i = 0; i < nSubTextCount; i++){
            var rcBounds = this.getTextBounds(this.style, text.charAt(i));
            listWordBounds.push(new SuperMap.Bounds(0, -rc2TextBounds.getHeight(), rcBounds.getWidth(), 0));
        }

        var bReverseDistance = false; // 控制是否按照线的方向进行计算，否则反方向计算。
        var bReverseIndex = false; // 获取word时是否倒序，控制文本顺序。
        var bWordDistanceIsWidthOrHeight = true; // 控制每次增加的word距离是其宽度还是高度。
        var nAdjustAngle = 0;
        var nLastBearingAngle = 0;
        var dWordDistance = 0;
        var wordBounds;
        var pGeoText = [];
        var psNowWordPoints = [];
        var psLastWordPoints = [];

        // 沿线的正方向计算到达点信息
        while (dNextPointsDistance <= dNowPassedDistance && nPointIndex < (nPntCount - 1))
        {
            nPointIndex++;
            dBeforePointsDistance = dNextPointsDistance;
            dNextPointsDistance += SuperMap.Plot.PlottingUtil.distance(pPoints[nPointIndex - 1], pPoints[nPointIndex]);
        }

        var pntPathTextStart = SuperMap.Plot.PlottingUtil.findPointInPolyLine(pPoints,dNowPassedDistance);

        var nLineAngle = SuperMap.Plot.PlottingUtil.radian(pPoints[nPointIndex - 1], pPoints[nPointIndex]) * dPiToDu;

        if(nLineAngle > 180){
            nLineAngle -= 360;
        }
        if(nLineAngle < -180){
            nLineAngle += 360;
        }

        if(nLineAngle > 90 && nLineAngle <= 180)
        {
            nAdjustAngle = -180;
            bReverseDistance = true;
            bReverseIndex = true;
        }
        else if(nLineAngle >-180 && nLineAngle < -90)
        {
            nAdjustAngle = 180;
            bReverseDistance = true;
            bReverseIndex = true;
        }
        bWordDistanceIsWidthOrHeight = true;

        if(nAdjustAngle != 0){
            if(this.relLineText === SuperMap.Plot.RelLineText.ONLINE){
                //sizeWordAlignOffset = {w:0,h:rc2TextBounds.getHeight() / 2};
            }else if(this.relLineText === SuperMap.Plot.RelLineText.ONLEFTLINE){
                sizeWordAlignOffset = {w:0,h:-rc2TextBounds.getHeight()};
                stylelabelAlign = "lt";
            }else {
                sizeWordAlignOffset = {w:0,h:rc2TextBounds.getHeight()};
                stylelabelAlign = "lb";
            }
        }
        else{
            if(this.relLineText === SuperMap.Plot.RelLineText.ONLINE){
                //sizeWordAlignOffset = {w:0,h:rc2TextBounds.getHeight() / 2};
            }else if(this.relLineText === SuperMap.Plot.RelLineText.ONLEFTLINE){
                sizeWordAlignOffset = {w:0,h:-rc2TextBounds.getHeight()};
                stylelabelAlign = "lb";
            }else {
                stylelabelAlign = "lt";
            }
        }

        for (var i = 0; i < nSubTextCount; i++ ){
            if(dNowPassedDistance > dTotalLength)
            {
                break;
            }

            var nSplitedWordsIndex = i;
            if(bReverseIndex)
            {
                nSplitedWordsIndex = nSubTextCount - i - 1;
            }

            wordBounds = listWordBounds[nSplitedWordsIndex];
            dWordDistance = bWordDistanceIsWidthOrHeight ? wordBounds.getWidth() : wordBounds.getHeight();

            // 由于反方向时文本绘制的方向和线的方向相反，所以先增加本次绘制的字宽再绘制。
            if(bReverseDistance)
            {
                dNowPassedDistance += dWordDistance;
            }

            // 计算到达点
            while (dNextPointsDistance <= dNowPassedDistance && nPointIndex < (nPntCount - 1))
            {
                nPointIndex++;
                dBeforePointsDistance = dNextPointsDistance;
                dNextPointsDistance += SuperMap.Plot.PlottingUtil.distance(pPoints[nPointIndex - 1], pPoints[nPointIndex]);
            }

            nLineAngle = SuperMap.Plot.PlottingUtil.radian(pPoints[nPointIndex - 1], pPoints[nPointIndex]) * dPiToDu;
            var nBearingAngle = nLineAngle + nAdjustAngle;

            // 计算实际bounds
            //pntSubLable = UGOpLines::FindPoint(pPoints[nPointIndex-1], pPoints[nPointIndex], dNowPassedDistance - dBeforePointsDistance);
            pntSubLable = SuperMap.Plot.PlottingUtil.findPointInPolyLine(pPoints,dNowPassedDistance);
            if(pntSubLable.index < 0){
                break;
            }
            // if(bWordDistanceIsWidthOrHeight)
            // {
            //     pntSubLable.pt.x += sizeWordAlignOffset.h * -Math.sin((nBearingAngle - nAngle) * dDuToPi);
            //     pntSubLable.pt.y += sizeWordAlignOffset.h * Math.cos((nBearingAngle - nAngle) * dDuToPi);
            // }
            wordBounds.add(pntSubLable.pt.x, pntSubLable.pt.y);

            var  textword = text.charAt(nSplitedWordsIndex);
            var geometryText = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.TEXTSYMBOL, [pntSubLable.pt], textword,0);
            geometryText.style = {};
            geometryText.style = SuperMap.Util.copyAttributes(geometryText.style,this.feature.style);
            geometryText.style.labelAlign = stylelabelAlign;

            //计算出来的角度不可以直接使用，文字旋转的坐标系基准是按照像素坐标系来的，所以角度要翻转
            geometryText.style.labelRotation = -nBearingAngle;
            //this.components.push(geometryText);
            pGeoText.push(geometryText);

            if (!bReverseDistance)
            {
                dNowPassedDistance += dWordDistance;
            }
        }

        var pntPathTextEnd = SuperMap.Plot.PlottingUtil.findPointInPolyLine(pPoints,dNowPassedDistance);

        if(this.showPathLine){
            if(this.relLineText === SuperMap.Plot.RelLineText.ONLINE && this.isAvoid) {
                if(pntPathTextStart.index >= 0){
                    var ptsLineStart = [];
                    for(var i = 0; i <= pntPathTextStart.index; i++){
                        ptsLineStart.push(pts[i]);
                    }
                    ptsLineStart.push(pntPathTextStart.pt);
                    var geometryLineStart = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(24, ptsLineStart);
                    geometryLineStart.style = {surroundLineFlag: false};
                    this.components.push(geometryLineStart);
                }

                if(pntPathTextEnd.index >= 0){
                    var ptsLineEnd = [];
                    ptsLineEnd.push(pntPathTextEnd.pt);
                    for(var i = pntPathTextEnd.index + 1; i < pts.length; i++){
                        ptsLineEnd.push(pts[i]);
                    }
                    var geometryLineEnd = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(24, ptsLineEnd);
                    geometryLineEnd.style = {surroundLineFlag: false};
                    this.components.push(geometryLineEnd);
                }
            }else {
                var geometry = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(24, pts);
                geometry.style = {surroundLineFlag: false};
                this.components.push(geometry);
            }

            if(this.showPathLineArrow){
                var dArrowDis = dTotalLength * 0.02;
                var lineEndPt = pPoints[pPoints.length-1];
                var lineStartPt;
                for (i = pPoints.length-2; i >= 0; i--) {
                    lineStartPt = pPoints[i];
                    var dDistance = SuperMap.Plot.PlottingUtil.distance(lineStartPt, lineEndPt);

                    if (dDistance > dArrowDis) {
                        break;
                    }
                }

                var angle  = SuperMap.Plot.PlottingUtil.radian(lineStartPt,lineEndPt)* 180 / Math.PI;
                var ptArrowRight = SuperMap.Plot.PlottingUtil.circlePoint(lineEndPt,dArrowDis,dArrowDis,angle+165);
                var ptArrowLeft = SuperMap.Plot.PlottingUtil.circlePoint(lineEndPt,dArrowDis,dArrowDis,angle+195);
                var shapePtsHead = [];
                shapePtsHead.push(ptArrowRight);
                shapePtsHead.push(pPoints[pPoints.length-1]);
                shapePtsHead.push(ptArrowLeft);

                var geometryArrow = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, shapePtsHead);
                geometryArrow.style = {fillLimit:true, fillStyle:0,lineTypeLimit:true,surroundLineLimit:true};
                this.components.push(geometryArrow);
            }
        }

        for(var i = 0; i < pGeoText.length; i++){
            this.components.push(pGeoText[i]);
        }
    },

    getTextBounds: function(style, text) {
        if(text === " "){
            text = "_";
        }
        var elementtext = document.createElement('span');
        document.body.appendChild(elementtext);
        elementtext.style.width = 'auto';
        elementtext.style.height = 'auto';
        if(style.fontSize) elementtext.style.fontSize = style.fontSize + "px";
        if(style.fontFamily) elementtext.style.fontFamily = style.fontFamily;
        if(style.fontWeight) elementtext.style.fontWeight = style.fontWeight;
        elementtext.style.position = 'absolute';
        elementtext.style.visibility = 'hidden';
        elementtext.innerHTML = text;
        var pixelBounds = new SuperMap.Bounds(elementtext.clientLeft, elementtext.clientTop + elementtext.clientHeight - 6, elementtext.clientLeft + elementtext.clientWidth, elementtext.clientTop+4);
        var ltLonLat = this.layer.map.getLonLatFromLayerPx(new SuperMap.Pixel(pixelBounds.left, pixelBounds.top));
        var rbLonLat = this.layer.map.getLonLatFromLayerPx(new SuperMap.Pixel(pixelBounds.right, pixelBounds.bottom));
        document.body.removeChild(elementtext);
        var bounds = new SuperMap.Bounds(ltLonLat.lon, rbLonLat.lat, rbLonLat.lon, ltLonLat.lat);
        return bounds.add(-ltLonLat.lon, -ltLonLat.lat);
    },

    /**
     * Method: parseSymbolData
     * 解析标号数据。
     *
     */
    parseSymbolData: function() {
        SuperMap.Geometry.AlgoSymbol.prototype.parseSymbolData.apply(this, arguments);

        //自己特有
        if(!!this.symbolData){
            this.isAvoid = this.symbolData.isAvoid;
            this.isCurve = this.symbolData.isCurve;
            this.relLineText = this.symbolData.relLineText;
            this.showPathLine = this.symbolData.showPathLine;
        }
    },

    /**
     * Method: setSymbolData
     * 设置标号数据。
     *
     */
    setSymbolData: function() {
        SuperMap.Geometry.AlgoSymbol.prototype.setSymbolData.apply(this, arguments);

        //设置对象自己特有的属性到symbolData
        if(!!this.symbolData){
            this.symbolData.isAvoid = this.isAvoid;
            this.symbolData.isCurve = this.isCurve;
            this.symbolData.relLineText = this.relLineText;
            this.symbolData.showPathLine = this.showPathLine;
        }
    },

    /**
     * Method: reView
     * 随图缩放时，沿线文字重新计算
     *
     */
    reView: function () {
        if(this.resolution !== undefined && this.resolution !== this.layer.renderer.getResolution()){
            this.calculateParts();
        }
    },

    clone: function () {
        var geometry = SuperMap.Geometry.AlgoSymbol.prototype.clone.apply(this, arguments);
        geometry.isCurve = this.isCurve;
        geometry.isAvoid = this.isAvoid;
        geometry.relLineText = this.relLineText;
        return geometry;
    },

    CLASS_NAME: "SuperMap.Geometry.PathText"
});