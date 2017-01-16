/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol1010 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{

    /**
     * ructor: SuperMap.Geometry.AlgoSymbol
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

        this.minEditPts = 3;
        this.maxEditPts = 512;

        this.scalePoints = [];
        this.scaleValues = [];
        this.scaleValues.push(0.0);//比例值1：箭头长与箭身长(控制点距离总和)的比值
        this.scaleValues.push(0.148);//比例值2：箭颈宽与箭头长比值
        this.scaleValues.push(0.4);//比例值3：箭耳宽与箭头长比值
        this.scaleValues.push(0.312);//比例值4：箭耳长与箭头长比值
        this.scaleValues.push(0.2);//比例值5：箭尾距离/箭尾两点长度
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        if(this.controlPoints.length >= 2 && this.controlPoints.length < this.minEditPts){
            this.calAssistantLine();
        }

        if(this.controlPoints.length < 3){
            return;
        }

        var vertex2D = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        var geometrypts = this.arrowMeshs(vertex2D);
        SuperMap.Plot.PlottingUtil.clearSamePts(geometrypts.shapePts);

        if(geometrypts.shapePts.length == 0){
            return;
        }

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, geometrypts.shapePts, {surroundLineFlag: false});

        //添加比例点
        //var m_scalePoints = this.updateScalePoints(vertex2D);
        this.scalePoints = [];
        for (var i = 0; i < geometrypts.m_scalePoints.length; i++) {
            this.scalePoints.push(geometrypts.m_scalePoints[i]);
        }

        this.clearBounds();
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
        if(pt.isScalePoint === true){
            var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);

            //获取比例值
            if(this.scaleValues.length < 4){
                this.scaleValues = [];
                this.scaleValues.push(0.0);//比例值1：箭头长与箭身长(控制点距离总和)的比值
                this.scaleValues.push(0.148);//比例值2：箭颈宽与箭头长比值
                this.scaleValues.push(0.4);//比例值3：箭耳宽与箭头长比值
                this.scaleValues.push(0.312);//比例值4：箭耳长与箭头长比值
                this.scaleValues.push(0.2);//比例值5：箭尾距离/箭尾两点长度
            }

            //老军标算法计算比例点
            //控制点个数
            var ctrlPntCount = geoPts.length;
            if(ctrlPntCount <= 2){
                return;
            }

            //对比例点进行读取
            var ArrowTouLenDiviedByArrowBodyLen;
            var ArrowJingWidDiviedByArrowTouLen;
            var ArrowErWidDividedByArrowTouLen;
            var ArrowErLenDividedByArrowTouLen;
            var ArrowAwDisDividedByAwLen;

            //比例值个数
            if(this.scaleValues.length < 4){
                ArrowTouLenDiviedByArrowBodyLen = 0.0;
                ArrowJingWidDiviedByArrowTouLen = 0.148;
                ArrowErWidDividedByArrowTouLen = 0.4;
                ArrowErLenDividedByArrowTouLen = 0.312;
                ArrowAwDisDividedByAwLen = 0.2;
            }else{
                ArrowTouLenDiviedByArrowBodyLen = this.scaleValues[0];
                ArrowJingWidDiviedByArrowTouLen = this.scaleValues[1];
                ArrowErWidDividedByArrowTouLen = this.scaleValues[2];
                ArrowErLenDividedByArrowTouLen = this.scaleValues[3];
                ArrowAwDisDividedByAwLen = this.scaleValues[4];
            }
            var ArrowBodyLen = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

            //处理输入的控制点
            var OpectrlPoints = this.operateCtrlPts(geoPts);
            ctrlPntCount = OpectrlPoints.length;
            ctrlPntCount--;

            //获取老的比例点
            var ScalePts = [];
            for(var i = 0; i < this.scalePoints.length; i++){
                ScalePts.push(this.scalePoints[i].clone());
            }

            //如果没有老比例点，就退出函数
            if(ScalePts.length == 0){
                return;
            }

            ScalePts[index] = pt.clone();

            if(index == 3){
                var bodyPts = SuperMap.Plot.ArrowToolKit.generateArrowBodyShapePts(geoPts, this.scaleValues,
                    SuperMap.Plot.ArrowToolKit.ArrowBodyType.ARROWBODY_MULTIPOLYBEZIER);
                var centerPtBottom = new SuperMap.Geometry.Point((bodyPts.leftBodyPts[0].x+bodyPts.rightBodyPts[0].x)*0.5, (bodyPts.leftBodyPts[0].y+bodyPts.rightBodyPts[0].y)*0.5);
                var disJWPts = SuperMap.Plot.PlottingUtil.distance(bodyPts.leftBodyPts[0],bodyPts.rightBodyPts[0]);
                this.scaleValues[4] = SuperMap.Plot.PlottingUtil.distance(centerPtBottom,pt) / disJWPts;
            }else {
                var i = ctrlPntCount - 1;
                var pt1, pt2;
                if(ctrlPntCount <= 3){//取两点中点
                    pt1 = new SuperMap.Geometry.Point((OpectrlPoints[0].x+OpectrlPoints[1].x)/2, (OpectrlPoints[0].y+OpectrlPoints[1].y)/2);
                }else{
                    pt1 = OpectrlPoints[i-1].clone();
                }

                var snxy = new SuperMap.Geometry.Point(0,0);
                var lCtrlPt = new SuperMap.Geometry.Point(0,0);
                var rCtrlPt = new SuperMap.Geometry.Point(0,0);
                SuperMap.Plot.PlottingUtil.GetTrianglePoints(0, 3.0,pt1, OpectrlPoints[i], OpectrlPoints[i+1], lCtrlPt, rCtrlPt);

                //修正箭颈方向(0.4或0.5)
                SuperMap.Plot.PlottingUtil.GetTrapezoidPoints(0.5, OpectrlPoints[ctrlPntCount], OpectrlPoints[ctrlPntCount-1],rCtrlPt, snxy);

                pt2 = snxy.clone();

                var ArrowTouLen,TempA;
                var ArrowJingWid;
                var TempD,TempB;
                var l1,l2;

                var dLen = SuperMap.Plot.PlottingUtil.triangleHeightAndPartBottomLen(OpectrlPoints[ctrlPntCount],pt2,ScalePts[2]);
                ArrowTouLen = dLen.dLen1;
                TempA = dLen.dLen2;
                if(ArrowTouLen == 0){
                    ArrowTouLen = 0.1;
                }
                TempA = ArrowTouLen;
                ArrowTouLen = ArrowTouLen/(ArrowErLenDividedByArrowTouLen+1);
                ArrowTouLenDiviedByArrowBodyLen = ArrowTouLen/ArrowBodyLen;

                //箭耳点发生变化时
                if(index == 1){
                    dLen = SuperMap.Plot.PlottingUtil.triangleHeightAndPartBottomLen(OpectrlPoints[ctrlPntCount],pt2,ScalePts[1]);
                    TempD = dLen.dLen1;
                    TempB = dLen.dLen2;
                    ArrowErWidDividedByArrowTouLen = TempB/ArrowTouLen;
                    ArrowErLenDividedByArrowTouLen= (TempD-ArrowTouLen)/ArrowTouLen;
                }else if(index == 0){//箭劲点发生变化时
                    dLen = SuperMap.Plot.PlottingUtil.triangleHeightAndPartBottomLen(OpectrlPoints[ctrlPntCount],pt2,ScalePts[0]);
                    ArrowTouLen = dLen.dLen1;
                    ArrowJingWid = dLen.dLen2;
                    ArrowJingWidDiviedByArrowTouLen = ArrowJingWid/ArrowTouLen;

                    //进行一个判断，移动后的箭头长度是否大于控制点两末点距离的0.5
                    l1 = SuperMap.Plot.PlottingUtil.distance(OpectrlPoints[ctrlPntCount],OpectrlPoints[ctrlPntCount-1]);
                    l2 = ArrowTouLen * 2;
                    if(l1 < l2){
                        ArrowTouLen = l1 * 0.5;//改变大小
                    }

                    dLen = SuperMap.Plot.PlottingUtil.triangleHeightAndPartBottomLen(OpectrlPoints[ctrlPntCount],pt2,ScalePts[1]);
                    TempD = dLen.dLen1;
                    TempB = dLen.dLen2;
                    ArrowErWidDividedByArrowTouLen = TempB/ArrowTouLen;
                    ArrowErLenDividedByArrowTouLen= (TempA-ArrowTouLen)/ArrowTouLen;

                    //对箭耳长和箭头长比值限制不能小于0.1，大于0.5
                    if (ArrowErLenDividedByArrowTouLen < 0.1)
                    {
                        ArrowErLenDividedByArrowTouLen = 0.1;
                        ArrowTouLen = TempA/(1+ArrowErLenDividedByArrowTouLen);
                        ArrowErWidDividedByArrowTouLen = TempB/ArrowTouLen;
                        ArrowJingWidDiviedByArrowTouLen = ArrowJingWid/ArrowTouLen;
                    }

                    ArrowTouLenDiviedByArrowBodyLen = ArrowTouLen/ArrowBodyLen;
                } else if(index == 2){
                    ArrowTouLenDiviedByArrowBodyLen = ArrowTouLen/ArrowBodyLen;
                }
                ArrowJingWid = ArrowTouLen*ArrowJingWidDiviedByArrowTouLen;

                l1 = SuperMap.Plot.PlottingUtil.distance(OpectrlPoints[ctrlPntCount],OpectrlPoints[ctrlPntCount-1]);
                l2 = ArrowTouLen * 2;
                if(l1 < l2){
                    ArrowTouLen = l1 * 0.5;                  //改变大小
                    ArrowJingWid = ArrowTouLen*ArrowJingWidDiviedByArrowTouLen;
                    ArrowTouLenDiviedByArrowBodyLen = ArrowTouLen/ArrowBodyLen;
                }

                //改变比例值
                this.scaleValues[0]= ArrowTouLenDiviedByArrowBodyLen;
                this.scaleValues[1]= ArrowJingWidDiviedByArrowTouLen;
                this.scaleValues[2]= ArrowErWidDividedByArrowTouLen;
                this.scaleValues[3]= ArrowErLenDividedByArrowTouLen;
            }
        }

        this.calculateParts();
    },

    arrowMeshs: function(geoPts){
        var shapePts = [];
        var leftBodyPts = [];
        var rightBodyPts = [];
        var arrowHeadPts = [];
        var arrowTailPts = [];

        var operatePts = SuperMap.Plot.PlottingUtil.clonePoints(geoPts);
        var arrowInfo = SuperMap.Plot.ArrowToolKit.generateArrowBodyShapePts(operatePts, this.scaleValues, SuperMap.Plot.ArrowToolKit.ArrowBodyType.ARROWBODY_MULTIPOLYBEZIER);

        var arrowTouLen = arrowInfo.arrowTouLen;
        var leftPts = arrowInfo.leftBodyPts;
        var rightPts = arrowInfo.rightBodyPts;
        operatePts = arrowInfo.OpectrlPoints;

        if(!SuperMap.Plot.PlottingUtil.equalFuzzy(arrowTouLen, 0.0)){
            var atPoints = [];
            atPoints.push(leftPts[leftPts.length - 1]);
            atPoints.push(rightPts[rightPts.length - 1]);
            var scaleClone = [];
            scaleClone.push(this.scaleValues[2]);
            scaleClone.push(this.scaleValues[3]);
            scaleClone.push(0.0);
            scaleClone.push(0.0);
            var headPts = SuperMap.Plot.ArrowToolKit.generateArrowHeadShapePts(operatePts, atPoints, scaleClone,
                arrowTouLen, SuperMap.Plot.ArrowToolKit.ArrowHeadType.ARROWHEAD_WITH_EAR);

            var awPoints = [];
            awPoints.push(leftPts[0]);
            awPoints.push(rightPts[0]);
            var tailPts = SuperMap.Plot.ArrowToolKit.generateArrowTailShapePts(geoPts, awPoints, this.scaleValues[4], SuperMap.Plot.ArrowToolKit.ArrowTailType.ARROWTAIL_COATTAIL_POLYBODY);

            for(var i = 0; i< leftPts.length; i++){
                shapePts.push(leftPts[i]);
                leftBodyPts.push(leftPts[i]);
            }
            for(var i = 0; i< headPts.length; i++){
                shapePts.push(headPts[i]);
                arrowHeadPts.push(headPts[i]);
            }
            for(var i = rightPts.length - 1; i >= 0; i--){
                shapePts.push(rightPts[i]);
                rightBodyPts.push(rightPts[i]);
            }
            for(var i = 1; i< tailPts.length; i++){
                shapePts.push(tailPts[i]);
                arrowTailPts.push(tailPts[i]);
            }

            //计算第三比例点
            var thirdScalePtXY;
            var ctrlPntCount = operatePts.length;
            ctrlPntCount -= 2;
            var ArrowErLenDividedByArrowTouLen = this.scaleValues[3];
            var L2 =arrowTouLen*ArrowErLenDividedByArrowTouLen;//为箭耳长度
            thirdScalePtXY = SuperMap.Plot.PlottingUtil.getExcentrePointOnSegmentByScale(L2, operatePts[ctrlPntCount], operatePts[ctrlPntCount+1]);

            var m_scalePoints = [];
            //左箭劲点
            var scalepoint = new SuperMap.Geometry.Point(leftBodyPts[leftBodyPts.length-1].x,leftBodyPts[leftBodyPts.length-1].y);
            scalepoint.isScalePoint = true;
            scalepoint.tag = 0;
            m_scalePoints.push(scalepoint);
            //右箭耳点
            scalepoint = new SuperMap.Geometry.Point(arrowHeadPts[0].x,arrowHeadPts[0].y);
            scalepoint.isScalePoint = true;
            scalepoint.tag = 1;
            m_scalePoints.push(scalepoint);
            //第三比例点
            scalepoint = new SuperMap.Geometry.Point(thirdScalePtXY.x,thirdScalePtXY.y);
            scalepoint.isScalePoint = true;
            scalepoint.tag = 2;
            m_scalePoints.push(scalepoint);
            //燕尾点
            scalepoint = new SuperMap.Geometry.Point(tailPts[1].x, tailPts[1].y);
            scalepoint.isScalePoint = true;
            scalepoint.tag = 3;
            m_scalePoints.push(scalepoint);
        }

        return {shapePts:shapePts, leftBodyPts:leftBodyPts, rightBodyPts:rightBodyPts, arrowHeadPts:arrowHeadPts, arrowTailPts:arrowTailPts, m_scalePoints:m_scalePoints};
    },

    operateCtrlPts: function (geoPts) {
        var OperatePts = SuperMap.Plot.PlottingUtil.clonePoints(geoPts);
        var count = OperatePts.length;
        //三个点时，构造成四个点，添加的点为三点构成三角形的中点
        if(count === 3){
            var dCenterX = ((OperatePts[0].x + OperatePts[1].x)/2+ OperatePts[2].x)/2;
            var dCenterY = ((OperatePts[0].y + OperatePts[1].y)/2+ OperatePts[2].y)/2;
            var ptCenter = new SuperMap.Geometry.Point(dCenterX, dCenterY);
            var ptTemp = OperatePts[2];
            OperatePts[2] = ptCenter;
            OperatePts.push(ptTemp);
        }

        return OperatePts;
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol1010"
});