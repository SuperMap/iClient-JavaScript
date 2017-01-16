/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol1002 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{
    MIN_GEOPT_COUNT : 2,//最少几何点数
    MAX_GEOPT_COUNT : 1024,//最多几何点数
    //////////////////////////////////////////////////////////////
    SV1_defaultATLenDivABLen : 0.0,     //每个箭体中，箭头长度和箭体长度的比值，默认设为0.0
    SV2_defaultAYPosScale : 0.65,	   //箭腰位置比例值，默认为0.65
    SV_AJCtrl : 0.6,	   //箭颈控制点长度与箭颈到“交点”（或窝心点）长度的比例,默认0.6
    SV_ArrowWoCtrl : 0.6, //箭窝控制点长度与窝心到侧轴线交点长度的比例,默认0.6
    // 生成箭头时的比例点
    SV2_DefaultAJWidDiviedByATLen  :0.148,   //箭劲宽与箭头长比值，默认0.148 r_jt
    SV3_DefaultAEWidDividedByATLen : 0.4,    //箭耳宽与箭头长比值，默认0.4 r_rt
    SV4_DefaultAELenDividedByATLen :0.3,	    //箭耳长与箭头长比值，默认0.3 r_rwt
    ////////////////////////////////////////////////////////////////////////////非用户传入参数
    SV_ATScaleParameter  : 1.25,				//箭头收缩系数，默认1.25
    SV_ATLenDividedByATWid  :1.35,			//箭头长度与宽度的比值，默认1.35
    SV_ATWidDividedByArrowWeiWid :0.5,		//箭头宽度与箭尾宽度的比值，默认0.5
    AB_VERTEX_COUNT : 4,                      //箭身骨架点数
    MIN_PTCOUNT_PERARROW : 3,					// 每个箭体最少控制点个数
    ATL_DIV_AWW: 0.7,                        //箭头长和箭尾宽之比
    ATL_DIV_ABL: 0.12,						//有多个子箭头时，箭头长与箭身长之比
    ATL_DIV_ABL_1: 0.18,						//只有一个子箭头时，箭头长与箭身长之比
    DEFAULT_ARROW_TAIL_POS : 0.12,             //箭尾中点位置比值:中点到底点距离与底中点到腰点距离比值
    //////////////////////////////////////////////////////////////////////////
    DUOJIANTOU_TAIL_RATE_1 : 8.0,			//多箭头箭尾曲线的第一个系数
    DUOJIANTOU_TAIL_RATE_2 : 3.0,			//多箭头箭尾曲线的第二个系数
    DUOJIANTOU_TAIL_RATE_3 : 0.6,			//多箭头箭尾曲线的第三个系数
    AB_CTRLPT_RATE1: 0,						//箭身曲线的第一个系数
    AB_CTRLPT_RATE2: 3.0,					//箭身曲线的第二个系数
    AB_CTRLPT_RATE3: 0.5,					//箭身曲线的第三个系数
    //////////////////////////////////////////////////////////////////////////
    MIN_SCALEVALUE : 0.1,                    //比例值的下限
    MAX_SCALEVALUE : 1,                      //比例值的上限
    //////////////////////////////////////////////////////////////////////////
    // 对输入的控制点进行处理

    m_scalePoints : null,

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

        m_scalePoints = [];
    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
      this.init();
        //清空原有的所有geometry
        this.components = [];
        m_scalePoints = [];

        if(this.controlPoints.length >= 2 && this.controlPoints.length < this.minEditPts){
            this.calAssistantLine();
        }

        if(this.controlPoints.length < 3){
            return;
        }

        // 对点进行处理
        var opeGeoPts = this.operateCtrlPts(this.controlPoints);
        var nGeoPt = opeGeoPts.length;

        var nArrowCount = Math.floor(nGeoPt/this.MIN_PTCOUNT_PERARROW);
        var nScaleCount = this.scaleValues.length;

        if(nScaleCount < nArrowCount*2-1){
            if(nScaleCount == 0) {
                this.scaleValues.push(this.SV1_defaultATLenDivABLen);
                nScaleCount++;
            }

            var nSubIndex = nArrowCount*2-1-nScaleCount;
            for(var i = 0; i < nSubIndex; i += 2)
            {
                this.scaleValues.splice(nScaleCount/2+1, 0, this.SV1_defaultATLenDivABLen);
                this.scaleValues.splice(this.scaleValues.length, 0, this.SV2_defaultAYPosScale);
            }
        }
        else if(nScaleCount > nArrowCount*2-1){
            this.scaleValues = [];
            for(var i = 0; i < nArrowCount; i++){
                this.scaleValues.push(this.SV1_defaultATLenDivABLen);
            }
            for(var i = 0; i < nArrowCount - 1; i++){
                this.scaleValues.push(this.SV2_defaultAYPosScale);
            }
        }

        var allpts = this.arrowMeshs(opeGeoPts);
        SuperMap.Plot.PlottingUtil.clearSamePts(allpts.shapePts);

        if(allpts.shapePts.length > 0){
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, allpts.shapePts, {surroundLineFlag: false});
        }

        this.scalePoints = [];
        for(var i = 0; i < m_scalePoints.length; i ++){
            m_scalePoints[i].isScalePoint = true;
            m_scalePoints[i].tag = i;
            this.scalePoints.push(m_scalePoints[i]);
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
        if (pt.isScalePoint === true) {
            var opePts = this.operateCtrlPts(this.controlPoints);
            var nGeoPt = opePts.length;

            //箭头个数
            var arrowCount = Math.floor(nGeoPt/this.MIN_PTCOUNT_PERARROW);
            var newScaleValue = 0.0;

            if(index < arrowCount){//箭头比例点发生变化
                var ctrlPts = [];
                var baseIndex = index*this.MIN_PTCOUNT_PERARROW;
                ctrlPts[0] = (opePts[baseIndex]);
                ctrlPts[1] = (opePts[baseIndex+1]);
                ctrlPts[2] = (opePts[baseIndex+2]);

                var ArrowBodyLen = SuperMap.Plot.PlottingUtil.polylineDistance(ctrlPts);
                var leftPt = new SuperMap.Geometry.Point(0,0);
                var rightPt = new SuperMap.Geometry.Point(0,0);
                var AJPt = new SuperMap.Geometry.Point(0,0);;

                SuperMap.Plot.PlottingUtil.GetTrianglePoints(this.AB_CTRLPT_RATE1,this.AB_CTRLPT_RATE2,ctrlPts[0],ctrlPts[1], ctrlPts[2],leftPt,rightPt);
                SuperMap.Plot.PlottingUtil.GetTrapezoidPoints(this.AB_CTRLPT_RATE3,ctrlPts[2],ctrlPts[1],rightPt,AJPt);
                var templen = SuperMap.Plot.PlottingUtil.triangleHeightAndPartBottomLen(ctrlPts[2],AJPt,pt);
                var disMovePtToCenterAxisV = templen.dLen2;
                var disMovePtToCenterAxisH = templen.dLen1;
                var ATLen = disMovePtToCenterAxisH/(this.SV4_DefaultAELenDividedByATLen+1);
                newScaleValue  = ATLen/ArrowBodyLen;
            }
            else{//箭腰比例点发生变化
                var leftCtrlPts = [];
                var rightCtrlPts = [];
                var baseIndexL = (index-arrowCount)*this.MIN_PTCOUNT_PERARROW;
                leftCtrlPts[0] = (opePts[baseIndexL]);
                leftCtrlPts[1] = (opePts[baseIndexL+1]);
                leftCtrlPts[2] = (opePts[baseIndexL+2]);

                var baseIndexR = (index-arrowCount+1)*this.MIN_PTCOUNT_PERARROW;
                rightCtrlPts[0] = (opePts[baseIndexR]);
                rightCtrlPts[1] = (opePts[baseIndexR+1]);
                rightCtrlPts[2] = (opePts[baseIndexR+2]);

                // 两相邻箭体上、中、下三点连线的中点
                var AYTopPt = new SuperMap.Geometry.Point(0,0);
                var AYCenterPt = new SuperMap.Geometry.Point(0,0);
                var AYBottomPt = new SuperMap.Geometry.Point(0,0);;
                AYTopPt.x = (leftCtrlPts[2].x+rightCtrlPts[2].x)*0.5;
                AYCenterPt.x = (leftCtrlPts[1].x+rightCtrlPts[1].x)*0.5;
                AYBottomPt.x = (leftCtrlPts[0].x+rightCtrlPts[0].x)*0.5;
                AYTopPt.y = (leftCtrlPts[2].y+rightCtrlPts[2].y)*0.5;
                AYCenterPt.y = (leftCtrlPts[1].y+rightCtrlPts[1].y)*0.5;
                AYBottomPt.y = (leftCtrlPts[0].y+rightCtrlPts[0].y)*0.5;

                // 上、下半区的长度
                var disTopToCenter =  SuperMap.Plot.PlottingUtil.distance(AYTopPt,AYCenterPt);
                var disBottomToCenter =  SuperMap.Plot.PlottingUtil.distance(AYBottomPt,AYCenterPt);

                // 新的箭腰点和上下两点连线的垂直距离，垂足到顶点的距离
                var templen = SuperMap.Plot.PlottingUtil.triangleHeightAndPartBottomLen(AYTopPt,AYCenterPt,pt);
                var disMovePtToCenterAxisV = templen.dLen2;
                var disMovePtToCenterAxisH = templen.dLen1;
                if (disMovePtToCenterAxisH < disTopToCenter)		//上区
                {
                    newScaleValue = disMovePtToCenterAxisH/(disTopToCenter+disBottomToCenter);
                }
                else
                {
                    templen = SuperMap.Plot.PlottingUtil.triangleHeightAndPartBottomLen(AYCenterPt,AYBottomPt,pt);
                    disMovePtToCenterAxisV = templen.dLen2;
                    disMovePtToCenterAxisH = templen.dLen1;
                    newScaleValue = (disMovePtToCenterAxisH+disTopToCenter) /(disTopToCenter+disBottomToCenter);
                }
            }
            // 对比例值进行限制
            if(newScaleValue > this.MAX_SCALEVALUE)
                newScaleValue = this.MAX_SCALEVALUE;
            else if(newScaleValue < this.MIN_SCALEVALUE)
                newScaleValue = this.MIN_SCALEVALUE;

            this.scaleValues[index] = newScaleValue;
        }
        this.calculateParts();
    },

    arrowMeshs: function(opePts){
        var allPts = [], arrLeftPts2D = [], arrRightPts2D = [], arrHeadPts2D = [];

        var contour = new SuperMap.Plot.Path2D();
        var nGeoPt = opePts.length;

        //箭头个数
        var arrowCount = Math.floor(nGeoPt/this.MIN_PTCOUNT_PERARROW);
        //求箭体的箭尾宽度
        var arrowWeiWidth = this.generateAWWidth(arrowCount,opePts);

        //存放箭体点，参照燕尾曲箭标生成箭身骨架点：左箭身骨架点（拐点和控制点）+箭头+右箭身骨架点（拐点和控制点）
        var arrowBodyPts = [];
        // 箭耳连线和箭体中轴线的交点比例点
        // UGPoint2Ds AJScalePts;//del by hl 2011.4.7 生成轮廓没有必要算箭颈比例点
        // 箭头长同箭体长度的比例值
        var ATLenDividedByArrowBodyLens = [];
        var AJScalePt = new SuperMap.Geometry.Point(0,0);
        var ATLenDividerByArrowBodyLen = 0;
        var i = 0, iPt = 0;//每个子箭头的起始点索引 iPt = i*MIN_PTCOUNT_PERARROW;
        var temPts = [];//每个子箭头的三个点

        for(i = 0, iPt = 0; i<arrowCount;i++,iPt+=this.MIN_PTCOUNT_PERARROW){
            temPts[0] = opePts[iPt];
            temPts[1] = opePts[iPt+1];
            temPts[2] = opePts[iPt+2];

            ATLenDividerByArrowBodyLen = this.scaleValues[i];
            var tempArrowBodyPts = this.generateArrowBodyPts(temPts,arrowWeiWidth[i],ATLenDividerByArrowBodyLen);
            ATLenDividerByArrowBodyLen = tempArrowBodyPts.dATLenDivABLen;
            arrowBodyPts[i] = tempArrowBodyPts.arrowBodyPts;
            ATLenDividedByArrowBodyLens.push(ATLenDividerByArrowBodyLen);
        }

        // 生成箭腰部分
        var AYPts = [];
        var arrowLeftYaoPts = [];
        var arrowRightYaoPts = [];

        // 腰比例值
        var AYScaleValue=0;
        var iPtL = 0;//左边箭头的起始点索引
        var iPtR = 0;//右边箭头的起始点索引
        var leftCtrlPt = [];
        var rightCtrlPt = [];
        for (i = 0; i < arrowCount-1;i++,iPtL+=this.MIN_PTCOUNT_PERARROW){
            iPtR=iPtL+this.MIN_PTCOUNT_PERARROW;

            leftCtrlPt[0]=(opePts[iPtL]);
            leftCtrlPt[1]=(opePts[iPtL+1]);
            leftCtrlPt[2]=(opePts[iPtL+2]);

            rightCtrlPt[0]=(opePts[iPtR]);
            rightCtrlPt[1]=(opePts[iPtR+1]);
            rightCtrlPt[2]=(opePts[iPtR+2]);

            AYScaleValue = this.scaleValues[arrowCount+i];
            var tmepAYPts = this.generateAYPts(leftCtrlPt,arrowBodyPts[i], rightCtrlPt,arrowBodyPts[i+1],AYScaleValue);
            AYPts.push(tmepAYPts.arrowLeftYaoPts);
            AYPts.push(tmepAYPts.arrowRightYaoPts);
        }

        // 箭头的尾部点
        var AWPoints = [];
        var ptsArrowBodyRef0 = arrowBodyPts[0];//首个子箭头的箭身点集引用

        var tempSubPathPolygons = [];
        var nIndex = 0;
        var tempPts2D = [];

        //第一个箭头，添加左箭身点
        contour.MoveTo(ptsArrowBodyRef0[0]);
        contour.CurveTo(ptsArrowBodyRef0[1],ptsArrowBodyRef0[2],ptsArrowBodyRef0[3]);
        contour.CurveTo(ptsArrowBodyRef0[4],ptsArrowBodyRef0[5],ptsArrowBodyRef0[6]);

        //添加第一个箭头的左箭身拟合点
        contour.ToSubPathPolygons(tempSubPathPolygons);
        arrLeftPts2D.push(tempSubPathPolygons[0]);
        nIndex = tempSubPathPolygons[0].length;

        // 添加箭头点
        for (var j = 7;j < 10;j++){
            contour.LineTo(ptsArrowBodyRef0[j]);
        }

        //添加第一个箭头的箭头拟合点
        tempSubPathPolygons = [];
        contour.ToSubPathPolygons(tempSubPathPolygons);
        for (; nIndex < tempSubPathPolygons[0].length; nIndex++) {
            tempPts2D.push(tempSubPathPolygons[0][nIndex]);
        }
        arrHeadPts2D.push(tempPts2D);

        // 添加箭头尾部点
        AWPoints.push(ptsArrowBodyRef0[0]);
        AWPoints.push(opePts[0]);

        for (i = 1,iPt=this.MIN_PTCOUNT_PERARROW; i < arrowCount; i++,iPt+=this.MIN_PTCOUNT_PERARROW){
            var ptsArrowBodyIRef = arrowBodyPts[i];//第i个箭身点集引用

            // 添加箭腰点
            var iYao=i+i-2;//左箭腰点的索引
            var temLeftYaoPts = AYPts[iYao];
            contour.LineTo(temLeftYaoPts[0]);
            contour.CurveTo(temLeftYaoPts[1],temLeftYaoPts[2],temLeftYaoPts[3]);

            //添加箭头的右箭身拟合点
            tempSubPathPolygons = [];
            tempPts2D = [];
            contour.ToSubPathPolygons(tempSubPathPolygons);
            for (; nIndex < tempSubPathPolygons[0].length; nIndex++)
            {
                tempPts2D.push(tempSubPathPolygons[0][nIndex]);
            }
            arrRightPts2D.push(tempPts2D);

            var temRightYaoPts = AYPts[iYao+1];
            contour.CurveTo(temRightYaoPts[1],temRightYaoPts[2],temRightYaoPts[3]);

            //添加箭头的右箭身拟合点
            tempSubPathPolygons = [];
            tempPts2D = [];
            contour.ToSubPathPolygons(tempSubPathPolygons);
            for (; nIndex < tempSubPathPolygons[0].length; nIndex++) {
                tempPts2D.push(tempSubPathPolygons[0][nIndex]);
            }
            arrLeftPts2D.push(tempPts2D);

            // 添加箭头点
            for (var j = 7;j < 10;j++) {
                contour.LineTo(ptsArrowBodyIRef[j]);
            }

            //添加箭头的右箭身拟合点
            tempSubPathPolygons = [];
            tempPts2D = [];
            contour.ToSubPathPolygons(tempSubPathPolygons);
            for (; nIndex < tempSubPathPolygons[0].length; nIndex++) {
                tempPts2D.push(tempSubPathPolygons[0][nIndex]);
            }
            arrHeadPts2D.push(tempPts2D);

            // 添加箭尾点
            AWPoints.push(opePts[iPt].clone());
        }

        var ptsArrowBodyLastRef = arrowBodyPts[arrowCount-1];//最后一个箭身点集引用
        //最后一个箭头，添加右箭身点
        contour.LineTo(ptsArrowBodyLastRef[10]);
        contour.CurveTo(ptsArrowBodyLastRef[11],ptsArrowBodyLastRef[12],ptsArrowBodyLastRef[13]);
        contour.CurveTo(ptsArrowBodyLastRef[14],ptsArrowBodyLastRef[15],ptsArrowBodyLastRef[16]);

        //添加箭头的右箭身拟合点
        tempSubPathPolygons = [];
        tempPts2D = [];
        contour.ToSubPathPolygons(tempSubPathPolygons);
        for (; nIndex < tempSubPathPolygons[0].length; nIndex++) {
            tempPts2D.push(tempSubPathPolygons[0][nIndex]);
        }
        arrRightPts2D.push(tempPts2D);

        // 添加箭头尾部结束点
        AWPoints.push(ptsArrowBodyLastRef[16]);

        //AddArrowTail(arrowCount,opePts,AWPoints,0, contour);

        var subPathPolygons = [];
        contour.ToSubPathPolygons(subPathPolygons);
        allPts = subPathPolygons[0];

        return {shapePts: allPts,arrLeftPts2D: arrLeftPts2D,arrRightPts2D: arrRightPts2D,arrHeadPts2D: arrHeadPts2D};
    },

    operateCtrlPts: function (ctrlPts) {
        var pts = SuperMap.Plot.PlottingUtil.clonePoints(ctrlPts);
        //输入控制点个数
        var ptCount = pts.length;
        //箭头个数
        var arrowCount = Math.floor(ptCount/this.MIN_PTCOUNT_PERARROW);
        //最后一个箭头的点数
        var ptCountLastArrow = ptCount % this.MIN_PTCOUNT_PERARROW;
        //最后箭头只有2个点时，增加为3个点
        var temPt = new SuperMap.Geometry.Point();
        if(ptCountLastArrow == 2){
            temPt.x = (pts[ptCount-2].x+pts[ptCount-1].x)*0.5;
            temPt.y =  (pts[ptCount-2].y+pts[ptCount-1].y)*0.5;
            if (temPt.x != pts[ptCount-1].x || temPt.y !=pts[ptCount-1].y )
            {
                pts.push(pts[ptCount-1].clone());
                pts[ptCount-1] = temPt;
                ptCount++;
                //箭头个数增加1
                arrowCount++;
            }
        }
        //对输入控制点进行排序，从左到右
        if (ptCount > 3)
        {
            var arrowCount_1 = arrowCount-1;
            for (var j=0,m=arrowCount_1; j<arrowCount_1; m--,j++)
            {
                var m3 = m*this.MIN_PTCOUNT_PERARROW;
                for (var i3=0; i3<m3; i3 += this.MIN_PTCOUNT_PERARROW)
                {
                    var bLeft = !SuperMap.Plot.PlottingUtil.isRight(pts[i3+3],pts[i3+1],pts[i3+2]);
                    if (bLeft)
                    {
                        var temp = pts[i3];
                        pts[i3] = pts[i3+3];
                        pts[i3+3] = temp;

                        temp = pts[i3+1];
                        pts[i3+1] = pts[i3+4];
                        pts[i3+4] = temp;

                        temp = pts[i3+2];
                        pts[i3+2] = pts[i3+5];
                        pts[i3+5] = temp;
                    }
                }
            }
        }
        return pts;
    },

    // 生成箭尾的宽
    generateAWWidth: function (arrowCount, operatedCtrlPoints) {
        var arrowWeiWidth = [];

        //无箭头时
        if (arrowCount > 0) {
            //只有一个箭头时,箭尾宽为0
            if (arrowCount == 1) {
                arrowWeiWidth.push(0);
            }
            else {
                //有多个子箭头时
                //第一个子箭头尾部宽度
                var width = SuperMap.Plot.PlottingUtil.distance(operatedCtrlPoints[0],	operatedCtrlPoints[this.MIN_PTCOUNT_PERARROW]);
                arrowWeiWidth.push(width);

                //求箭体的箭尾宽度
                for (var i = 1,iPt=this.MIN_PTCOUNT_PERARROW; i<arrowCount-1; i++,iPt+=this.MIN_PTCOUNT_PERARROW) {
                    var wid1 = SuperMap.Plot.PlottingUtil.distance(operatedCtrlPoints[iPt-this.MIN_PTCOUNT_PERARROW], operatedCtrlPoints[iPt]);
                    var wid2 = SuperMap.Plot.PlottingUtil.distance(operatedCtrlPoints[iPt], operatedCtrlPoints[iPt+this.MIN_PTCOUNT_PERARROW]);
                    width = (wid1+wid2)*0.5;
                    arrowWeiWidth.push(width);
                }

                //最后一个子箭头尾部宽度,i = arrowCount-1,iPt = i*MIN_PTCOUNT_PERARROW
                width = SuperMap.Plot.PlottingUtil.distance(operatedCtrlPoints[iPt-this.MIN_PTCOUNT_PERARROW], operatedCtrlPoints[iPt]);
                arrowWeiWidth.push(width);
            }
        }
        return arrowWeiWidth;
    },

    // 根据三个控制点和箭尾宽，生成整个箭体骨架点，得到箭头长度和箭体长度的比值
    generateArrowBodyPts: function (ctrlPts, arrowWeiWidth, dATLenDivABLen) {
        var arrowBodyPts = [];
        //左右箭身骨架点
        var arrowBodyRightPtsHH = [],arrowBodyLeftPtsHH = [];
        //左箭身个拐点的左右控制点
        var rightBodyPtsLeftCtrlPtsHH = [],rightBodyPtsRightCtrlPtsHH = [];
        //右箭身各拐点的左右控制点
        var leftBodyPtsLeftCtrlPtsHH = [],leftBodyPtsRightCtrlPtsHH = [];
        var nCtrlPts_1 = ctrlPts.length-1;
        //非法性检验，传入必须有3个子箭头控制点
        if (nCtrlPts_1<2)
        {
            dATLenDivABLen=0;
            return {dATLenDivABLen:dATLenDivABLen, arrowBodyPts: arrowBodyPts};
        }
        //对比例点进行读取
        //////////////////////////////////////////////////////////////////////////
        var tempATLenDiviedByArrowBodyLen = dATLenDivABLen;
        var AJWidDiviedByATLen = this.SV2_DefaultAJWidDiviedByATLen;
        var AEWidDividedByATLen = this.SV3_DefaultAEWidDividedByATLen;
        var AELenDividedByATLen = this.SV4_DefaultAELenDividedByATLen;
        //////////////////////////////////////////////////////////////////////////
        // 求箭体长度
        var opeCtrlPts = SuperMap.Plot.PlottingUtil.clonePoints(ctrlPts);//调整后的控制点
        var arrowBodyLen = SuperMap.Plot.PlottingUtil.polylineDistance(opeCtrlPts);
        //求箭尾两端点
        //求箭尾宽度
        var newArrowWeiWidth = (arrowWeiWidth == 0) ? arrowBodyLen*this.ATL_DIV_ABL_1 : (arrowBodyLen+arrowWeiWidth)*this.ATL_DIV_ABL;
        //求箭尾两点
        var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(newArrowWeiWidth, opeCtrlPts[1], opeCtrlPts[0]);
        //因为是从opePt[1]到opePt[0]向量，所以leftWeiPt在opePt[1]-->opePt[0]右侧。
        arrowBodyRightPtsHH[1] = sidepoint.pntLeft.clone();
        arrowBodyLeftPtsHH[1] = sidepoint.pntRight.clone();
        //////////////////////////////////////////////////////////////////////////
        var dATLen = 0;
        if(!SuperMap.Plot.PlottingUtil.equalFuzzy(tempATLenDiviedByArrowBodyLen, 0.0)){
            dATLen = arrowBodyLen*tempATLenDiviedByArrowBodyLen;
        }
        else{
            dATLen = newArrowWeiWidth*this.ATL_DIV_AWW;
        }
        //箭头长是否改变
        var disLast2Pt = SuperMap.Plot.PlottingUtil.distance(opeCtrlPts[1],opeCtrlPts[2]);
        if (dATLen+dATLen > disLast2Pt) {
            dATLen = disLast2Pt*0.5;
        }
        //求箭颈宽
        var AJWid = dATLen*AJWidDiviedByATLen;
        //顺延顶点
        opeCtrlPts.push(opeCtrlPts[nCtrlPts_1].clone());
        var len1=0,Len2=0;
        //! brief 拐点宽度
        len1 = arrowBodyLen-dATLen;
        var gd_w = [];//拐点的宽
        var i = 0;
        for (i = 2; i <= nCtrlPts_1;i++) {
            Len2 += SuperMap.Plot.PlottingUtil.distance(opeCtrlPts[i-1],opeCtrlPts[i-2]);
            if(SuperMap.Plot.PlottingUtil.equalFuzzy(len1, 0.0)){
                gd_w[i] = 0;
            }
            else if(SuperMap.Plot.PlottingUtil.equalFuzzy(len1-Len2, 0.0)){
                gd_w[i] = AJWid;
            }
            else {
                gd_w[i] = AJWid+(newArrowWeiWidth-AJWid) * Math.pow((len1-Len2)/len1,this.SV_ATScaleParameter);		//半边拐点宽
            }
        }
        gd_w[nCtrlPts_1+1] = AJWid;

        var snxy = new SuperMap.Geometry.Point(0,0);;
        var dx1=0,dy1=0,dx2=0,dy2=0;
        var lxy = new SuperMap.Geometry.Point(0,0);
        var rxy = new SuperMap.Geometry.Point(0,0);
        //求当前点 s[i] 的两侧折线拐点 p[i],q[i]----------
        for (i=2; i<=nCtrlPts_1; i++){
            //--------xl-xr为s[i-1]-s[i+1]的平行线--------
            SuperMap.Plot.PlottingUtil.GetTrianglePoints(this.AB_CTRLPT_RATE1, this.AB_CTRLPT_RATE2,opeCtrlPts[i-2],opeCtrlPts[i-1],opeCtrlPts[i],lxy,rxy);

            //---------修正箭颈方向(0.4或0.5)--------
            if(nCtrlPts_1 == i){
                SuperMap.Plot.PlottingUtil.GetTrapezoidPoints(this.AB_CTRLPT_RATE3, opeCtrlPts[nCtrlPts_1], opeCtrlPts[nCtrlPts_1 - 1], rxy, snxy);
            }

            //---------求平行线两侧的拐点---------
            var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(gd_w[i], lxy, opeCtrlPts[i-1]);
            arrowBodyLeftPtsHH[i] = sidepoint.pntLeft;
            arrowBodyRightPtsHH[i] = sidepoint.pntRight;
        }

        //--------求箭颈点 s[n1] (按上面求的修正箭颈方向的结果snx,sny)--------
        var tempSN = snxy.clone();
        var dLen = SuperMap.Plot.PlottingUtil.distance(opeCtrlPts[nCtrlPts_1], tempSN);
        //修改原来参数从1.0改为0
        if(dLen > 0){
            var incentrePoint = SuperMap.Plot.PlottingUtil.getIncentrePointOnSegmentByScale(dATLen, opeCtrlPts[nCtrlPts_1], snxy);
            opeCtrlPts[nCtrlPts_1] = incentrePoint.clone();
        }

        //--------求箭颈点 s[n1] 的两拐点 p[n1],q[n1]----------
        var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(AJWid, opeCtrlPts[nCtrlPts_1+1], opeCtrlPts[nCtrlPts_1]);
        arrowBodyRightPtsHH[nCtrlPts_1+1] = sidepoint.pntLeft;
        arrowBodyLeftPtsHH[nCtrlPts_1+1] = sidepoint.pntRight;

        //求箭身的拟合曲线
        for (i = 2; i <= nCtrlPts_1; i++){
            SuperMap.Plot.PlottingUtil.GetTrianglePoints(this.AB_CTRLPT_RATE2, this.AB_CTRLPT_RATE2,arrowBodyRightPtsHH[i-1],arrowBodyRightPtsHH[i],arrowBodyRightPtsHH[i+1],lxy,rxy);
            rightBodyPtsLeftCtrlPtsHH[i] = lxy.clone();
            rightBodyPtsRightCtrlPtsHH[i] = rxy.clone();
            SuperMap.Plot.PlottingUtil.GetTrianglePoints(this.AB_CTRLPT_RATE2, this.AB_CTRLPT_RATE2,arrowBodyLeftPtsHH[i-1],arrowBodyLeftPtsHH[i],arrowBodyLeftPtsHH[i+1],lxy,rxy);
            leftBodyPtsLeftCtrlPtsHH[i] = lxy.clone();
            leftBodyPtsRightCtrlPtsHH[i] = rxy.clone();
        }

        //---------当在起点时，求对应控制点----------
        SuperMap.Plot.PlottingUtil.GetTrapezoidPoints(this.AB_CTRLPT_RATE3, arrowBodyRightPtsHH[1], arrowBodyRightPtsHH[2], rightBodyPtsLeftCtrlPtsHH[2], snxy);
        rightBodyPtsRightCtrlPtsHH[1] = snxy.clone();
        SuperMap.Plot.PlottingUtil.GetTrapezoidPoints(this.AB_CTRLPT_RATE3, arrowBodyLeftPtsHH[1], arrowBodyLeftPtsHH[2], leftBodyPtsLeftCtrlPtsHH[2], snxy);
        leftBodyPtsRightCtrlPtsHH[1] = snxy.clone();

        //求箭颈的控制点
        var xy0;
        var l1,l2;
        var K_L2_L1 = 1.0/3.0;//L2除以L1的比值

        //---------当在箭颈时，求控制点(强行顺箭头方向)----------
        l1 = SuperMap.Plot.PlottingUtil.distance(arrowBodyRightPtsHH[nCtrlPts_1+1], arrowBodyRightPtsHH[nCtrlPts_1]);
        l2 = l1*K_L2_L1;
        xy0 = SuperMap.Plot.PlottingUtil.getExcentrePointOnSegmentByScale(l2, opeCtrlPts[nCtrlPts_1], opeCtrlPts[nCtrlPts_1 + 1]);
        xy0.x += (arrowBodyRightPtsHH[nCtrlPts_1+1].x - opeCtrlPts[nCtrlPts_1].x);
        xy0.y += (arrowBodyRightPtsHH[nCtrlPts_1+1].y - opeCtrlPts[nCtrlPts_1].y);
        l2 = (newArrowWeiWidth-AJWid)*Math.pow(l2/len1,this.SV_ATScaleParameter+0.3);

        sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(l2, arrowBodyRightPtsHH[nCtrlPts_1+1], xy0);
        rightBodyPtsLeftCtrlPtsHH[nCtrlPts_1+1] = sidepoint.pntLeft.clone();

        l1 = SuperMap.Plot.PlottingUtil.distance(arrowBodyLeftPtsHH[nCtrlPts_1+1],arrowBodyLeftPtsHH[nCtrlPts_1]);
        l2 = l1*K_L2_L1;
        xy0 = SuperMap.Plot.PlottingUtil.getExcentrePointOnSegmentByScale(l2, opeCtrlPts[nCtrlPts_1], opeCtrlPts[nCtrlPts_1 + 1]);
        xy0.x += (arrowBodyLeftPtsHH[nCtrlPts_1+1].x - opeCtrlPts[nCtrlPts_1].x);
        xy0.y += (arrowBodyLeftPtsHH[nCtrlPts_1+1].y - opeCtrlPts[nCtrlPts_1].y);

        // 此处同燕尾曲箭标不同
        l2 = (newArrowWeiWidth-AJWid)*Math.pow(l2/len1,this.SV_ATScaleParameter+0.3);
        sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(l2, arrowBodyLeftPtsHH[nCtrlPts_1+1], xy0);
        leftBodyPtsLeftCtrlPtsHH[nCtrlPts_1+1] = sidepoint.pntRight.clone();

        //求箭头
        //根据箭耳15-20度,箭头25-30度
        var ATPts = [];		//箭头点从左箭身到右箭身；
        var L2 =dATLen*AELenDividedByATLen;  //为箭耳长度
        var tempXY = SuperMap.Plot.PlottingUtil.getExcentrePointOnSegmentByScale(L2, opeCtrlPts[nCtrlPts_1], opeCtrlPts[nCtrlPts_1 + 1]);//两箭耳连线与中线的交点

        m_scalePoints.push(tempXY.clone());

        //求的一个箭头比例点
        L2 =dATLen*AEWidDividedByATLen;	//L2为一侧箭耳的宽度
        sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(L2, opeCtrlPts[nCtrlPts_1+1], tempXY);//求两箭耳点

        ATPts.push(sidepoint.pntRight);
        ATPts.push(opeCtrlPts[nCtrlPts_1+1]);
        ATPts.push(sidepoint.pntLeft);

        //右箭身拟合曲线点,反着求，防止后面翻转
        var arrowRightBodyPtsHH = [];
        arrowRightBodyPtsHH.push(arrowBodyRightPtsHH[nCtrlPts_1+1]);
        for (i = nCtrlPts_1; i >= 1; i--){
            arrowRightBodyPtsHH.push(rightBodyPtsLeftCtrlPtsHH[i+1]);
            arrowRightBodyPtsHH.push(rightBodyPtsRightCtrlPtsHH[i]);
            arrowRightBodyPtsHH.push(arrowBodyRightPtsHH[i]);
        }

        //左箭身拟合曲线点
        var arrowLeftBodyPtsHH = [];
        for (i = 1; i <= nCtrlPts_1; i++) {
            arrowLeftBodyPtsHH.push(arrowBodyLeftPtsHH[i]);
            arrowLeftBodyPtsHH.push(leftBodyPtsRightCtrlPtsHH[i]);
            arrowLeftBodyPtsHH.push(leftBodyPtsLeftCtrlPtsHH[i+1]);
        }
        arrowLeftBodyPtsHH.push(arrowBodyLeftPtsHH[nCtrlPts_1+1]);

        // 先添加左侧箭身、箭头，添加右侧箭身
        arrowBodyPts.push.apply(arrowBodyPts,arrowLeftBodyPtsHH);
        arrowBodyPts.push.apply(arrowBodyPts,ATPts);
        arrowBodyPts.push.apply(arrowBodyPts,arrowRightBodyPtsHH);

        //重算比例值
        dATLenDivABLen = dATLen/arrowBodyLen;

        var tempRightPts = [];
        var nRightPtCount = arrowRightBodyPtsHH.length;
        for(i = nRightPtCount-1; i >= 0; i--){
            tempRightPts.push(arrowRightBodyPtsHH[i]);
        }

        return {dATLenDivABLen: dATLenDivABLen, arrowBodyPts: arrowBodyPts};
    },

    // 根据左右箭身骨架点、左右控制点生成左右箭腰点
    generateAYPts: function (leftCtrlPts, leftArrowBodys,rightCtrlPts, rightArrowBodys, AYScaleValue) {
        // 两相邻箭体上、中、下三点连线的中点
        var AYTopPt = new SuperMap.Geometry.Point((leftCtrlPts[2].x+rightCtrlPts[2].x)*0.5, (leftCtrlPts[2].y+rightCtrlPts[2].y)*0.5);
        var AYCenterPt = new SuperMap.Geometry.Point((leftCtrlPts[1].x+rightCtrlPts[1].x)*0.5, (leftCtrlPts[1].y+rightCtrlPts[1].y)*0.5);
        var AYBottomPt = new SuperMap.Geometry.Point((leftCtrlPts[0].x+rightCtrlPts[0].x)*0.5, (leftCtrlPts[0].y+rightCtrlPts[0].y)*0.5);

        // 上、下半区的长度
        var disTopToCenter =  SuperMap.Plot.PlottingUtil.distance(AYTopPt,AYCenterPt);
        var disBottomToCenter =  SuperMap.Plot.PlottingUtil.distance(AYBottomPt,AYCenterPt);

        // 腰深度，只是一个距离
        var AYPtDepth = AYScaleValue*(disTopToCenter+disBottomToCenter);

        // 求取腰点位置,腰点、左箭中轴上一点、右箭中轴上一点
        var AYPt = new SuperMap.Geometry.Point(0,0);
        var leftArrowAxisCtrlPt = new SuperMap.Geometry.Point(0,0);
        var rightArrowAxisCtrlPt = new SuperMap.Geometry.Point(0,0);
        if (AYPtDepth > disTopToCenter)	{//腰点在下区
            AYPtDepth = disTopToCenter+disBottomToCenter-AYPtDepth;
            AYPt = SuperMap.Plot.PlottingUtil.getIncentrePointOnSegmentByScale(AYPtDepth,AYBottomPt,AYCenterPt);

            // 左、右输入控制点的下区长
            var disLeftCenterToBottom =  SuperMap.Plot.PlottingUtil.distance(leftCtrlPts[1],leftCtrlPts[0]);
            var disRightCenterToBottom =  SuperMap.Plot.PlottingUtil.distance(rightCtrlPts[1],rightCtrlPts[0]);

            // 等比例计算左点
            disLeftCenterToBottom = disLeftCenterToBottom*AYPtDepth/disBottomToCenter;
            leftArrowAxisCtrlPt = SuperMap.Plot.PlottingUtil.getIncentrePointOnSegmentByScale(disLeftCenterToBottom,leftCtrlPts[0],leftCtrlPts[1]);

            // 等比例计算右点
            disRightCenterToBottom = disRightCenterToBottom*AYPtDepth/disBottomToCenter;
            rightArrowAxisCtrlPt = SuperMap.Plot.PlottingUtil.getIncentrePointOnSegmentByScale(disRightCenterToBottom,rightCtrlPts[0],rightCtrlPts[1]);
        }
        else{//上区
            AYPt = SuperMap.Plot.PlottingUtil.getIncentrePointOnSegmentByScale(AYPtDepth,AYTopPt,AYCenterPt)

            // 左、右输入控制点的上区长
            var disLeftCenterToTop =  SuperMap.Plot.PlottingUtil.distance(leftCtrlPts[1],leftCtrlPts[2]);
            var disRightCenterToTop =  SuperMap.Plot.PlottingUtil.distance(rightCtrlPts[1],rightCtrlPts[2]);

            // 等比例计算左点
            disLeftCenterToTop = disLeftCenterToTop*AYPtDepth/disTopToCenter;
            leftArrowAxisCtrlPt = SuperMap.Plot.PlottingUtil.getIncentrePointOnSegmentByScale(disLeftCenterToTop,leftCtrlPts[2],leftCtrlPts[1]);

            // 等比例计算右点
            disRightCenterToTop = disRightCenterToTop*AYPtDepth/disTopToCenter;
            rightArrowAxisCtrlPt = SuperMap.Plot.PlottingUtil.getIncentrePointOnSegmentByScale(disRightCenterToTop,rightCtrlPts[2],rightCtrlPts[1]);
        }

        m_scalePoints.push(AYPt.clone());

        // 左右控制点到腰点的距离
        var disYaoPtLeftCtrlPtToYaoPt = this.SV_ArrowWoCtrl * SuperMap.Plot.PlottingUtil.distance(AYPt,leftArrowAxisCtrlPt);
        var disYaoPtRightCtrlPtToYaoPt = this.SV_ArrowWoCtrl * SuperMap.Plot.PlottingUtil.distance(AYPt,rightArrowAxisCtrlPt);

        // 求取腰点的左右控制点
        var AYPtLeftCtrlPt =  SuperMap.Plot.PlottingUtil.getIncentrePointOnSegmentByScale(disYaoPtLeftCtrlPtToYaoPt,AYPt,leftArrowAxisCtrlPt);
        var AYPtRightCtrlPt =  SuperMap.Plot.PlottingUtil.getIncentrePointOnSegmentByScale(disYaoPtRightCtrlPtToYaoPt,AYPt,rightArrowAxisCtrlPt);

        /*左箭头右箭颈控制点位于传入leftArrowBodys中索引 11位置处,右箭颈点位于10
         右箭头左箭颈控制点位于传入rightArrowBodys中索引 5位置处，左箭颈点位于6
         */
        var leftATRightAJCtrlPt = leftArrowBodys[11].clone();
        var leftATRightAJ= leftArrowBodys[10].clone();
        var rightATLeftAJCtrlPt = rightArrowBodys[5].clone();
        var rightATLeftAJ = rightArrowBodys[6].clone();

        // 对左箭头，求右箭颈点和控制点连线、箭腰点和左控制点连线的交点
        var leftIntersectPt = SuperMap.Plot.PlottingUtil.intersectLines(leftATRightAJ,leftATRightAJCtrlPt,AYPt,leftArrowAxisCtrlPt);
        //leftIntersectPt.intersectPoint = new SuperMap.Geometry.Point(0,0);
        // 对比左箭头右箭颈点到交点的距离、到腰点的距离
        var disAJToIntersectPt = SuperMap.Plot.PlottingUtil.distance(leftIntersectPt.intersectPoint,leftATRightAJ);
        var disAJToAYPt = SuperMap.Plot.PlottingUtil.distance(leftATRightAJ,AYPt);
        if (disAJToIntersectPt > disAJToAYPt) { //交点远离的情况，方向不变，取箭颈到窝心点的长度
            disAJToIntersectPt = this.SV_AJCtrl*disAJToAYPt;
        }
        else {
            disAJToIntersectPt = this.SV_AJCtrl*disAJToIntersectPt;
        }
        var tempPt = SuperMap.Plot.PlottingUtil.getIncentrePointOnSegmentByScale(disAJToIntersectPt,leftATRightAJ,leftATRightAJCtrlPt);
        //左箭头右箭颈控制点
        leftATRightAJCtrlPt = tempPt.clone();
        leftArrowBodys[11] = tempPt.clone();

        // 对右箭头同样处理
        leftIntersectPt = SuperMap.Plot.PlottingUtil.intersectLines(rightATLeftAJ,rightATLeftAJCtrlPt,AYPt,rightArrowAxisCtrlPt);
        // 对比左箭头右箭颈点到交点的距离、到腰点的距离
        disAJToIntersectPt = SuperMap.Plot.PlottingUtil.distance(leftIntersectPt.intersectPoint,rightATLeftAJ);
        disAJToAYPt = SuperMap.Plot.PlottingUtil.distance(rightATLeftAJ,AYPt);
        if (disAJToIntersectPt > disAJToAYPt) { //交点远离的情况，方向不变，取箭颈到窝心点的长度
            disAJToIntersectPt = this.SV_AJCtrl*disAJToAYPt;
        }
        else {
            disAJToIntersectPt = this.SV_AJCtrl*disAJToIntersectPt;
        }
        tempPt = SuperMap.Plot.PlottingUtil.getIncentrePointOnSegmentByScale(disAJToIntersectPt,rightATLeftAJ,rightATLeftAJCtrlPt);
        // 修改右箭头左箭颈控制点
        rightATLeftAJCtrlPt = tempPt.clone();
        rightArrowBodys[5] = tempPt.clone();

        // 求取箭腰的左部分
        var leftYaoPts = [];
        leftYaoPts.push(leftATRightAJ);
        leftYaoPts.push(leftATRightAJCtrlPt);
        leftYaoPts.push(AYPtLeftCtrlPt);
        leftYaoPts.push(AYPt);

        // 求取箭腰的右部分
        var rightYaoPts = [];
        rightYaoPts.push(AYPt);
        rightYaoPts.push(AYPtRightCtrlPt);
        rightYaoPts.push(rightATLeftAJCtrlPt);
        rightYaoPts.push(rightATLeftAJ);

        return {arrowLeftYaoPts: leftYaoPts, arrowRightYaoPts: rightYaoPts};
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol1002"
});