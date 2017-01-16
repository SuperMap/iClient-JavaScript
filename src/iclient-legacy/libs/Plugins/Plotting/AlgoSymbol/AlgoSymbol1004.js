/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol1004 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{
    // UGint MIN_CTRLPOINT_COUNT = 3;// 最少控制点数//最少3个控制点，此时箭标是直的
    // UGint MAX_CTRLPOINT_COUNT = 512;// 最少控制点数//规定128是最大控制点值
    MAX_ARRAY_SIZE: 128, //数组最大大小

    //箭头长与箭身长(控制点距离总和)的比值，默认设为0
    //修改默认设为0.2
    sv1_DefaultAtLenDivAbLen :0.0,
    //箭颈宽与箭头长比值，默认0.148
    sv2_DefaultAjWidthDivAtLen :0.148,
    //箭耳宽与箭头长比值，默认0.4
    sv3_DefaultAeWidthDivAtLen :0.4,
    //箭耳长与箭头长比值，默认0.312
    sv4_DefaultAeLenDivAtLen :0.312,

    //箭头收缩系数，默认1.5
    sv_AtScaleParameter :1.5,
    //箭头长度与宽度的比值，默认1.35
    sv_AtLenDivAtWidth :1.35,
    //箭头宽度与箭尾宽度的比值，默认0.5
    sv_AtWidthDivAwWidth :0.5,

    // 箭尾到起点距离/箭身总长
    sv_defaultAwLenDivAbLen :0.15 ,//0.1;

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
        this.scaleValues.push(this.sv1_DefaultAtLenDivAbLen);//比例值1：箭头长与箭身长(控制点距离总和)的比值
        this.scaleValues.push(this.sv2_DefaultAjWidthDivAtLen);//比例值2：箭颈宽与箭头长比值
        this.scaleValues.push(this.sv3_DefaultAeWidthDivAtLen);//比例值3：箭耳宽与箭头长比值
        this.scaleValues.push(this.sv4_DefaultAeLenDivAtLen);//比例值4：箭耳长与箭头长比值
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

        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, geometrypts.shapePts, {surroundLineFlag: false});

        //添加比例点
        var m_scalePoints = this.updateScalePoints(vertex2D);

        this.scalePoints = [];
        if (3 != m_scalePoints.length) {
            m_scalePoints = [];
        } else {
            for (var i = 0; i < m_scalePoints.length; i++) {
                m_scalePoints[i].isScalePoint = true;
                m_scalePoints[i].tag = i;
                this.scalePoints.push(m_scalePoints[i]);
            }
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
                this.scaleValues.push(this.sv1_DefaultAtLenDivAbLen);
                this.scaleValues.push(this.sv2_DefaultAjWidthDivAtLen);
                this.scaleValues.push(this.sv3_DefaultAeWidthDivAtLen);
                this.scaleValues.push(this.sv4_DefaultAeLenDivAtLen);
            }

            //老军标算法计算比例点
            //控制点个数
            var ctrlPntCount = geoPts.length;
            if(ctrlPntCount <= 2){
                return;
            }

            //处理输入的控制点
            var OpectrlPoints = this.operateCtrlPts(geoPts);
            ctrlPntCount = OpectrlPoints.length;
            ctrlPntCount--;

            //对比例点进行读取
            var ArrowTouLenDiviedByArrowBodyLen;
            var ArrowJingWidDiviedByArrowTouLen;
            var ArrowErWidDividedByArrowTouLen;
            var ArrowErLenDividedByArrowTouLen;

            //比例值个数
            var svCount = this.calcScaleValueCount(geoPts.length);
            if(this.scaleValues.length < svCount){
                var Values = this.calcDefaultScaleValues(ctrlPntCount);
                ArrowTouLenDiviedByArrowBodyLen = Values[0];
                ArrowJingWidDiviedByArrowTouLen = Values[1];
                ArrowErWidDividedByArrowTouLen = Values[2];
                ArrowErLenDividedByArrowTouLen = Values[3];
            }else{
                ArrowTouLenDiviedByArrowBodyLen = this.scaleValues[0];
                ArrowJingWidDiviedByArrowTouLen = this.scaleValues[1];
                ArrowErWidDividedByArrowTouLen = this.scaleValues[2];
                ArrowErLenDividedByArrowTouLen = this.scaleValues[3];
            }
            var ArrowBodyLen = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);

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

            //这没必要算一下，上面有取，如果比例点不涉及到这个比例值
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

        this.calculateParts();
    },

    arrowMeshs: function(geoPts){
        var shapePts = [];
        var leftBodyPts = [];
        var rightBodyPts = [];
        var arrowHeadPts = [];

        var operatePts = SuperMap.Plot.PlottingUtil.clonePoints(geoPts);
        var arrowInfo = SuperMap.Plot.ArrowToolKit.generateArrowBodyShapePts(operatePts, this.scaleValues, SuperMap.Plot.ArrowToolKit.ArrowBodyType.ARROWBODY_MULTIPOLYBEZIER);

        var arrowTouLen = arrowInfo.arrowTouLen;
        var leftPts = arrowInfo.leftBodyPts;
        var rightPts = arrowInfo.rightBodyPts;

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
            var arrowTailPts = SuperMap.Plot.ArrowToolKit.generateArrowTailShapePts(geoPts, awPoints, 0.2, SuperMap.Plot.ArrowToolKit.ArrowTailType.ARROWTAIL_COATTAIL_POLYBODY);

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
        }

        return {shapePts:shapePts, leftBodyPts:leftBodyPts, rightBodyPts:rightBodyPts, arrowHeadPts:arrowHeadPts};
    },

    updateScalePoints: function (geoPts) {
        var ctrlPntCount = geoPts.length;
        var m_scalePoints = [];
        //当控制点数少于最少控制点数时，不计算比例点
        if (ctrlPntCount < 3 )
        {
            return;
        }
        //获取箭身长度，输入控制点首尾不连总长度
        var ArrowBodyLen = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);// ::PolyLineLength(geoPts);
        //当箭身长度等于0时，不计算比例点
        if (SuperMap.Plot.PlottingUtil.equalFuzzy(ArrowBodyLen, 0.0))
        {
            return;
        }

        //处理输入的控制点
        var OpectrlPoints = this.operateCtrlPts(geoPts);
        ctrlPntCount = OpectrlPoints.length;
        ctrlPntCount--;

        var scaleValuesClone = [];
        for(var i = 0; i< this.scaleValues.length; i++){
            scaleValuesClone.push(this.scaleValues[i]);
        }

        var allpts = this.genArrowBodyPts(ArrowBodyLen, OpectrlPoints, scaleValuesClone);
        var ArrowBodyCenterPts = allpts.ArrowBodyCenterPts;

        //计算箭头点
        var ArrowTPts = this.genAtPts(ctrlPntCount,ArrowBodyCenterPts,scaleValuesClone,allpts.ArrowTouLen);

        //计算第三比例点
        var ThirdScalePt = this.calc3rdScalePt(ctrlPntCount,ArrowBodyCenterPts,scaleValuesClone,allpts.ArrowTouLen);

        //返回比例点
        m_scalePoints.push(new SuperMap.Geometry.Point(allpts.LeftBodyPtsTemp[ctrlPntCount].x,allpts.LeftBodyPtsTemp[ctrlPntCount].y));
        m_scalePoints.push(new SuperMap.Geometry.Point(ArrowTPts[2].x,ArrowTPts[2].y));
        m_scalePoints.push(new SuperMap.Geometry.Point(ThirdScalePt.x,ThirdScalePt.y));
        return m_scalePoints;
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

    genArrowBodyPts: function (ArrowBodyLen, ctrlPoints, scaleValues) {
        //生成箭身中轴线骨架点、左右两箭身骨架点、两箭身骨架点的左右控制点
        var ArrowBodyLeftPts = [], ArrowBodyRightPts = [];//左右箭身骨架点
        var ArrowBodyLeftPtsLeftCtrlPts = [], ArrowBodyLeftPtsRightCtrlPts = [];//左箭身个拐点的左右控制点
        var ArrowBodyRightPtsLeftCtrlPts = [], ArrowBodyRightPtsRightCtrlPts = [];//右箭身个拐点的左右控制点
        var ArrowTouLen;

        var ctrlPntCount = ctrlPoints.length;
        ctrlPntCount--;

        //对比例点进行读取
        var ArrowTouLenDiviedByArrowBodyLen;
        var ArrowJingWidDiviedByArrowTouLen;
        var ArrowErWidDividedByArrowTouLen;
        var ArrowErLenDividedByArrowTouLen;

        if(scaleValues.length < this.calcScaleValueCount(ctrlPntCount)){
            var Values = this.calcDefaultScaleValues(ctrlPntCount);
            ArrowTouLenDiviedByArrowBodyLen = Values[0];
            ArrowJingWidDiviedByArrowTouLen = Values[1];
            ArrowErWidDividedByArrowTouLen = Values[2];
            ArrowErLenDividedByArrowTouLen = Values[3];
        }else{
            ArrowTouLenDiviedByArrowBodyLen = scaleValues[0];
            ArrowJingWidDiviedByArrowTouLen = scaleValues[1];
            ArrowErWidDividedByArrowTouLen = scaleValues[2];
            ArrowErLenDividedByArrowTouLen = scaleValues[3];
        }

        var OpectrlPoints = SuperMap.Plot.PlottingUtil.clonePoints(ctrlPoints);
        //求取0-1点中点两侧两点
        var Center01X = (OpectrlPoints[0].x + OpectrlPoints[1].x)/2;
        var Center01Y = (OpectrlPoints[0].y + OpectrlPoints[1].y)/2;
        var TempX = Math.abs(Center01X-OpectrlPoints[2].x);
        var TempY = Math.abs(Center01Y-OpectrlPoints[2].y);

        var dDis = 0.0;
        if (TempX > 0 && TempY > 0) {
            var a = 1.0/(Center01X-OpectrlPoints[2].x);
            var b = -1.0/(Center01Y-OpectrlPoints[2].y);
            var c = 1.0*OpectrlPoints[2].y / (Center01Y-OpectrlPoints[2].y) - 1.0*OpectrlPoints[2].x/(Center01X-OpectrlPoints[2].x);
            dDis = Math.abs(a*OpectrlPoints[0].x + b*OpectrlPoints[0].y+c) / Math.sqrt(a*a+b*b);
        } else {
            if (TempY <= 0.0001) {
                dDis = Math.abs(Center01Y-OpectrlPoints[1].y);
            } else if (TempX<= 0.0001) {
                dDis = Math.abs(Center01X-OpectrlPoints[1].x);
            }
        }

        //var lx = 0.0,ly = 0.0,rx = 0.0,ry = 0.0;
        //求出物理1,2点 xl,yl; xr,yr
        var sidepoints = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(dDis, OpectrlPoints[2], new SuperMap.Geometry.Point(Center01X,Center01Y));
        var rightofline = SuperMap.Plot.PlottingUtil.PointIsRightToLine(OpectrlPoints[1], OpectrlPoints[2],OpectrlPoints[0]);
        if(rightofline){
            ArrowBodyLeftPts[1] = OpectrlPoints[1];
            ArrowBodyRightPts[1] = OpectrlPoints[0];
        }else{
            ArrowBodyLeftPts[1] = OpectrlPoints[0];
            ArrowBodyRightPts[1] = OpectrlPoints[1];
        }
        OpectrlPoints[1] = new SuperMap.Geometry.Point((OpectrlPoints[0].x+OpectrlPoints[1].x)/2, (OpectrlPoints[0].y+OpectrlPoints[1].y)/2);

        //箭头宽为箭尾宽的一半
        //箭头长度改边算法
        //如果时默认比例
        var ArrowTouWid = Math.sqrt((sidepoints.pntLeft.x-sidepoints.pntRight.x)*(sidepoints.pntLeft.x-sidepoints.pntRight.x)
                +(sidepoints.pntLeft.y-sidepoints.pntRight.y)*(sidepoints.pntLeft.y-sidepoints.pntRight.y) ) * this.sv_AtWidthDivAwWidth;
        ArrowTouLen = ArrowTouWid*this.sv_AtLenDivAtWidth;	     //箭头长
        var ArrowJingWid = ArrowTouLen*ArrowJingWidDiviedByArrowTouLen;     //半边箭颈宽
        if(!SuperMap.Plot.PlottingUtil.equalFuzzy(ArrowTouLenDiviedByArrowBodyLen,0)){
            ArrowTouLen = ArrowBodyLen*ArrowTouLenDiviedByArrowBodyLen;
            //ArrowTouWid = ArrowTouLen/sv_ArrowTouLenDividedByArrowTouWid;
            ArrowJingWid=ArrowTouLen*ArrowJingWidDiviedByArrowTouLen;
        }

        var l1 = SuperMap.Plot.PlottingUtil.distance(OpectrlPoints[ctrlPntCount],OpectrlPoints[ctrlPntCount-1]);
        var l2 = ArrowTouLen*2;
        if (l1 < l2) {
            ArrowTouLen = l1/2;                  //改变大小
            //added by gaozhj 原始算法中对Aw_w值未进行调整
            //Aw_w = At_l/1.35;
            ArrowJingWid = ArrowTouLen*ArrowJingWidDiviedByArrowTouLen;
        }

        //顺延顶点
        OpectrlPoints.push(OpectrlPoints[ctrlPntCount].clone());

        var Len1,Len2;
        Len1 = 0.0;
        Len2 = 0.0;
        var i = 0;
        //! brief 拐点宽度
        var gd_w = [];
        for ( i = 2; i <= ctrlPntCount; i++) {
            Len1 +=   SuperMap.Plot.PlottingUtil.distance(OpectrlPoints[i],OpectrlPoints[i-1]);
        }
        Len1 -= ArrowTouLen;

        for (i = 2; i <= ctrlPntCount-1;i++) {
            Len2 +=  SuperMap.Plot.PlottingUtil.distance(OpectrlPoints[i],OpectrlPoints[i-1]);
            gd_w[i] = ArrowJingWid+(ArrowTouWid-ArrowJingWid)*Math.pow((Len1-Len2)/Len1,this.sv_AtScaleParameter);		//半边拐点宽
        }
        gd_w[ctrlPntCount] = ArrowJingWid;

        //var snx,sny;
        var snxy = new SuperMap.Geometry.Point(0,0);
        //var dx1,dy1,dx2,dy2;
        var dxy;
        //snx = sny = dx1 = dy1 = dx2 = dy2 = 0.0;
        var lCtrlPt = new SuperMap.Geometry.Point(0,0);
        var rCtrlPt = new SuperMap.Geometry.Point(0,0);
        //求当前点 s[i] 的两侧折线拐点 p[i],q[i]----------
        for (i = 2; i<=ctrlPntCount-1; i++){
            //--------xl-xr为s[i-1]-s[i+1]的平行线--------
            SuperMap.Plot.PlottingUtil.GetTrianglePoints(0, 3.0,OpectrlPoints[i-1], OpectrlPoints[i], OpectrlPoints[i+1], lCtrlPt, rCtrlPt);

            //---------修正箭颈方向(0.4或0.5)--------
            if(i == ctrlPntCount - 1){
                SuperMap.Plot.PlottingUtil.GetTrapezoidPoints(0.5, OpectrlPoints[ctrlPntCount], OpectrlPoints[ctrlPntCount-1],rCtrlPt, snxy);
            }

            //---------求平行线两侧的拐点---------
            dxy = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(gd_w[i], lCtrlPt, OpectrlPoints[i]);
            rightofline = SuperMap.Plot.PlottingUtil.PointIsRightToLine(rCtrlPt, lCtrlPt, dxy.pntRight);
            if(rightofline){
                ArrowBodyLeftPts[i] = new SuperMap.Geometry.Point(dxy.pntRight.x,dxy.pntRight.y);
                ArrowBodyRightPts[i] = new SuperMap.Geometry.Point(dxy.pntLeft.x,dxy.pntLeft.y);
            }else{
                ArrowBodyLeftPts[i] = new SuperMap.Geometry.Point(dxy.pntLeft.x,dxy.pntLeft.y);
                ArrowBodyRightPts[i] = new SuperMap.Geometry.Point(dxy.pntRight.x,dxy.pntRight.y);
            }
        }

        //--------求箭颈点 s[n1] (按上面求的修正箭颈方向的结果snx,sny)--------
        var dLen = Math.sqrt(
            1.0*(OpectrlPoints[ctrlPntCount].x-snxy.x)*(OpectrlPoints[ctrlPntCount].x-snxy.x)
            +1.0*(OpectrlPoints[ctrlPntCount].y-snxy.y)*(OpectrlPoints[ctrlPntCount].y-snxy.y));
        //修改原来参数从1.0改为0
        if(dLen > 0){
            OpectrlPoints[ctrlPntCount] = SuperMap.Plot.PlottingUtil.getIncentrePointOnSegmentByScale(ArrowTouLen, OpectrlPoints[ctrlPntCount],snxy);
        }

        //--------求箭颈点 s[n1] 的两拐点 p[n1],q[n1]----------
        dxy = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(ArrowJingWid, OpectrlPoints[ctrlPntCount+1], OpectrlPoints[ctrlPntCount]);
        rightofline = SuperMap.Plot.PlottingUtil.PointIsRightToLine(OpectrlPoints[ctrlPntCount], OpectrlPoints[ctrlPntCount+1], dxy.pntLeft);
        if(rightofline){
            ArrowBodyRightPts[ctrlPntCount] = new SuperMap.Geometry.Point(dxy.pntLeft.x,dxy.pntLeft.y);
            ArrowBodyLeftPts[ctrlPntCount] = new SuperMap.Geometry.Point(dxy.pntRight.x,dxy.pntRight.y);
        }else{
            ArrowBodyRightPts[ctrlPntCount] = new SuperMap.Geometry.Point(dxy.pntRight.x,dxy.pntRight.y);
            ArrowBodyLeftPts[ctrlPntCount] = new SuperMap.Geometry.Point(dxy.pntLeft.x,dxy.pntLeft.y);
        }

        //求箭身的拟合曲线
        //求箭身曲线的左右控制点
        var xy0;
        for (i = 2; i < ctrlPntCount; i++){
            SuperMap.Plot.PlottingUtil.GetTrianglePoints(3, 3,ArrowBodyLeftPts[i-1], ArrowBodyLeftPts[i], ArrowBodyLeftPts[i+1], lCtrlPt, rCtrlPt);
            ArrowBodyLeftPtsLeftCtrlPts[i] = new SuperMap.Geometry.Point(lCtrlPt.x, lCtrlPt.y);
            ArrowBodyLeftPtsRightCtrlPts[i] = new SuperMap.Geometry.Point(rCtrlPt.x, rCtrlPt.y);
            SuperMap.Plot.PlottingUtil.GetTrianglePoints(3, 3,ArrowBodyRightPts[i-1], ArrowBodyRightPts[i], ArrowBodyRightPts[i+1], lCtrlPt, rCtrlPt);
            ArrowBodyRightPtsLeftCtrlPts[i] = new SuperMap.Geometry.Point(lCtrlPt.x, lCtrlPt.y);
            ArrowBodyRightPtsRightCtrlPts[i] = new SuperMap.Geometry.Point(rCtrlPt.x, rCtrlPt.y);
            if(i == 2){
                //---------当在起点时，求对应控制点----------
                SuperMap.Plot.PlottingUtil.GetTrapezoidPoints(0.5, ArrowBodyLeftPts[1], ArrowBodyLeftPts[2],ArrowBodyLeftPtsLeftCtrlPts[2], snxy);
                ArrowBodyLeftPtsRightCtrlPts[i] = new SuperMap.Geometry.Point(snxy.x, snxy.y);
                SuperMap.Plot.PlottingUtil.GetTrapezoidPoints(0.5, ArrowBodyRightPts[1], ArrowBodyRightPts[2],ArrowBodyRightPtsLeftCtrlPts[2], snxy);
                ArrowBodyRightPtsRightCtrlPts[i] = new SuperMap.Geometry.Point(snxy.x, snxy.y);
            }
            if(i == ctrlPntCount -1){
                //---------当在箭颈时，求控制点(强行顺箭头方向)----------
                l1 = SuperMap.Plot.PlottingUtil.distance(ArrowBodyLeftPts[ctrlPntCount],ArrowBodyLeftPts[ctrlPntCount-1]);
                l2 = l1/3.0;
                xy0 = SuperMap.Plot.PlottingUtil.getExcentrePointOnSegmentByScale(l2, OpectrlPoints[ctrlPntCount], OpectrlPoints[ctrlPntCount+1])
                xy0.x += (ArrowBodyLeftPts[ctrlPntCount].x - OpectrlPoints[ctrlPntCount].x);
                xy0.y += (ArrowBodyLeftPts[ctrlPntCount].y - OpectrlPoints[ctrlPntCount].y);
                l1 = ArrowTouWid-ArrowJingWid;
                l2 = l1*Math.pow(l2/Len1, this.sv_AtScaleParameter);
                dxy = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(l2, ArrowBodyLeftPts[ctrlPntCount], xy0);
                ArrowBodyLeftPtsLeftCtrlPts[ctrlPntCount] = new SuperMap.Geometry.Point(dxy.pntLeft.x,dxy.pntLeft.y);

                l1 = SuperMap.Plot.PlottingUtil.distance(ArrowBodyRightPts[ctrlPntCount],ArrowBodyRightPts[ctrlPntCount-1]);
                l2 = l1/3.0;
                xy0 = SuperMap.Plot.PlottingUtil.getExcentrePointOnSegmentByScale(l2, OpectrlPoints[ctrlPntCount], OpectrlPoints[ctrlPntCount+1]);
                xy0.x += (ArrowBodyRightPts[ctrlPntCount].x - OpectrlPoints[ctrlPntCount].x);
                xy0.y += (ArrowBodyRightPts[ctrlPntCount].y - OpectrlPoints[ctrlPntCount].y);
                l1 = ArrowTouWid-ArrowJingWid;
                l2 = l1*Math.pow(l2/Len1, this.sv_AtScaleParameter);
                dxy = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(l2, ArrowBodyRightPts[ctrlPntCount], xy0);
                ArrowBodyRightPtsLeftCtrlPts[ctrlPntCount] = new SuperMap.Geometry.Point(dxy.pntRight.x,dxy.pntRight.y);
            }
        }// End for 求箭身曲线的左右控制点
        var ArrowBodyCenterPts = SuperMap.Plot.PlottingUtil.clonePoints(OpectrlPoints);

        return {ArrowBodyCenterPts:ArrowBodyCenterPts,LeftBodyPtsTemp:ArrowBodyLeftPts,RightBodyPtsTemp:ArrowBodyRightPts,LeftBodyPtsLeftCtrlPts:ArrowBodyLeftPtsLeftCtrlPts,LeftBodyPtsRightCtrlPts:ArrowBodyLeftPtsRightCtrlPts,RightBodyPtsLeftCtrlPts:ArrowBodyRightPtsLeftCtrlPts,RightBodyPtsRightCtrlPts:ArrowBodyRightPtsRightCtrlPts,ArrowTouLen:ArrowTouLen};
    },

    calcScaleValueCount: function (ctrlPntCount) {
        return 4;
    },

    calcDefaultScaleValues: function (ctrlPointCount) {
        var scaleValues = [];
        scaleValues.push(this.sv1_DefaultAtLenDivAbLen);
        scaleValues.push(this.sv2_DefaultAjWidthDivAtLen);
        scaleValues.push(this.sv3_DefaultAeWidthDivAtLen);
        scaleValues.push(this.sv4_DefaultAeLenDivAtLen);
        return scaleValues;
    },

    genAtPts: function (TotalCount, ArrowBodyCenterPts, scaleValues, ArrowTouLen) {
        var ArrowErWidDividedByArrowTouLen = scaleValues[2];
        var ArrowErLenDividedByArrowTouLen = scaleValues[3];

        //根据箭耳15-20度,箭头25-30度
        var ArrowTPts = [];		//箭头点从左箭身到右箭身；
        var L2 =ArrowTouLen*ArrowErLenDividedByArrowTouLen;  						//为箭耳长度
        var TempXY = SuperMap.Plot.PlottingUtil.getExcentrePointOnSegmentByScale(L2, ArrowBodyCenterPts[TotalCount], ArrowBodyCenterPts[TotalCount+1]);//两箭耳连线与中线的交点

        L2 =ArrowTouLen*ArrowErWidDividedByArrowTouLen;
        var sidePoints = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(L2, ArrowBodyCenterPts[TotalCount+1], TempXY);//求两箭耳点
        ArrowTPts.push(new SuperMap.Geometry.Point(sidePoints.pntLeft.x,sidePoints.pntLeft.y));
        ArrowTPts.push(ArrowBodyCenterPts[TotalCount+1]);
        ArrowTPts.push(new SuperMap.Geometry.Point(sidePoints.pntRight.x,sidePoints.pntRight.y));

        return ArrowTPts;
    },

    calc3rdScalePt: function (TotalCount, ArrowBodyCenterPts, scaleValues, ArrowTouLen) {
        var ArrowErWidDividedByArrowTouLen = scaleValues[2];
        var ArrowErLenDividedByArrowTouLen = scaleValues[3];
        //根据箭耳15-20度,箭头25-30度
        var ArrowTPts = [];		//箭头点从左箭身到右箭身；
        var L2 =ArrowTouLen*ArrowErLenDividedByArrowTouLen;  						//为箭耳长度
        var TempXY = SuperMap.Plot.PlottingUtil.getExcentrePointOnSegmentByScale(L2, ArrowBodyCenterPts[TotalCount], ArrowBodyCenterPts[TotalCount+1]);//两箭耳连线与中线的交点
        return TempXY;
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol1004"
});