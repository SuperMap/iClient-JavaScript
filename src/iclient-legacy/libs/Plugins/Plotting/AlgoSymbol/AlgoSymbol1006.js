/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol1006 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol,{
    QIANJI_RATE1 : 9.0,//对左右中点进行处理一比率，意义暂时未明确
    QIANJI_RATE2 : 20.0,//求左、右腰中点，一比率，意义不明确
    QIANJI_RATE4 : 5.0,//重算左右线中点，一比率，意义不明确
    QIANJI_RATE3 : 1/3.0,//腰底曲率

    QIANJI_TAIL_RATE1:8.0,//生成钳击尾部的比例1
    QIANJI_TAIL_RATE2:3.0,//生成钳击尾部的比例2
    QIANJI_TAIL_RATE3:0.6,//生成钳击尾部的比例3

    //QIANJI_MINGEOPT_COUNT : 2,//钳击的最少几何点数
    //QIANJI_MAXGEOPT_COUNT : 4,//钳击的最多几何点数

    //中点1到腰底点的距离/中点1到中点2的距离
    //中点1是是箭尾两点中点，中点2是箭头两点中点。
    //钳击箭标比例值，默认0.25,最大不能超过0.5
    SV1_Default :0.25 ,
    SV1_MinValue :0.0 ,//比例值1的最小值
    SV1_MaxValue :0.5 ,//比例值1的最大值

    DEFAULT_ARROW_TAIL_POS : 0.4,// 箭尾中点位置比值:中点到底点距离与底中点到腰点距离比值
    SCALE_VALUE_COUNT :1, //箭标应该有的比例值个数
    MIN_LEN_LeftToRightCenter :  1.0E-7,//箭标的两个箭尾中心的最短距离

    //箭头相关比例
    SCALE_AT : 1.0/3.0,//箭头比例值
    SCALE_ATAJ : 1.0/7.0,//箭头箭颈比例值
    SCALE_ATAE : 1.0/3.0,//箭头箭耳比例值
    SCALE_AW : 2.0/3.0,//箭尾比例值
    SCALE_ATAJctrlDefSide : 4.0/5.0,//异侧箭头箭颈控制点比例值
    SCALE_ATAJctrlSameSide : 2.0/3.0,//同侧箭头箭颈控制点比例值

    //箭身中轴线底点(mm点)比例值
    SCALE_MM_LEFT : 0.25,
    SCALE_MM_RIGHT : 0.75,

    //二次Bezier转三次Bezier的系数
    BEZIER_K1 : 1.0/3.0,

    QIANJI_OPERATE_RATE1 : 1.0,//根据3点生成第4点系数

    m_dMaxDis : 0.0,
    m_bIsAnimation: false,
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
        this.maxEditPts = 4;

        this.scalePoints = [];
        this.scaleValues = [];
        this.scaleValues.push(this.SV1_Default);

        m_dMaxDis = 0.0;
        m_bIsAnimation = false;
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

        var vertex2D = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        var shapePts = this.arrowMeshs(vertex2D);

        if(shapePts.length > 0){
            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, shapePts, {surroundLineFlag: false});
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
            var opeGeoPts = this.operateCtrlPts(this.controlPoints);
            var geoPtsCount = opeGeoPts.length;

            //底部中点，即0、1点中点
            var centerPtBottom = new SuperMap.Geometry.Point((opeGeoPts[0].x+opeGeoPts[1].x)/2, (opeGeoPts[0].y+opeGeoPts[1].y)/2);

            //顶部中点，即2，3点中点
            var centerPtTop = new SuperMap.Geometry.Point((opeGeoPts[2].x+opeGeoPts[3].x)/2, (opeGeoPts[2].y+opeGeoPts[3].y)/2);

            var scaleValue;
            var pointProject = SuperMap.Plot.PlottingUtil.pointProjectToSegment(pt, centerPtBottom, centerPtTop);
            if(pointProject.isOnline){
                var dDistance = SuperMap.Plot.PlottingUtil.distance(pointProject.projectPoint, centerPtBottom);
                var dLen = SuperMap.Plot.PlottingUtil.distance(centerPtBottom, centerPtTop);

                if(SuperMap.Plot.PlottingUtil.equalFuzzy(dDistance, 0.0)){
                    scaleValue = this.SV1_MinValue;
                }
                else {
                    scaleValue = dDistance / dLen;
                }

                if(scaleValue > this.SV1_MaxValue){
                    scaleValue = this.SV1_MaxValue;
                }
            }
            else {
                if(SuperMap.Plot.PlottingUtil.distance(pointProject.projectPoint, centerPtBottom) <
                    SuperMap.Plot.PlottingUtil.distance(pointProject.projectPoint, centerPtTop)){
                    scaleValue = this.SV1_MinValue;
                }
                else {
                    scaleValue = this.SV1_MaxValue;
                }
            }

            this.scaleValues = [];
            this.scaleValues.push(scaleValue);
        }
        this.calculateParts();
    },

    arrowMeshs: function(geoPts){
        var contour = new SuperMap.Plot.Path2D();
        var geoPtsCount = geoPts.length;

        //处理输入的控制点
        var opeGeoPts = [];
        if(this.m_bIsAnimation && geoPts.length == 4){
            opeGeoPts = SuperMap.Plot.PlottingUtil.clonePoints(geoPts);
        }
        else{
            opeGeoPts = this.operateCtrlPts(geoPts);
        }

        var sv1 = this.scaleValues[0];
        var lenLeftSegment = SuperMap.Plot.PlottingUtil.distance(opeGeoPts[0],opeGeoPts[3]);
        var lenRightSegment = SuperMap.Plot.PlottingUtil.distance(opeGeoPts[1],opeGeoPts[2]);

        //左、右箭体尾点
        var leftArrowWeiPt = opeGeoPts[0].clone();
        var rightArrowWeiPt = opeGeoPts[1].clone();

        //左右线段中点
        var centerPt03X = (opeGeoPts[0].x + opeGeoPts[3].x)*0.5;
        var centerPt03Y = (opeGeoPts[0].y + opeGeoPts[3].y)*0.5;
        var centerPtLeftSegment = new SuperMap.Geometry.Point(centerPt03X,centerPt03Y);

        var centerPt12X = (opeGeoPts[1].x + opeGeoPts[2].x)*0.5;
        var centerPt12Y = (opeGeoPts[1].y + opeGeoPts[2].y)*0.5;
        var centerPtRightSegment = new SuperMap.Geometry.Point(centerPt12X,centerPt12Y);

        //中点距离
        var lenLeftCenterToRightCenter = SuperMap.Plot.PlottingUtil.distance(centerPtLeftSegment,centerPtRightSegment);
        if (lenLeftCenterToRightCenter < this.MIN_LEN_LeftToRightCenter) {
            lenLeftCenterToRightCenter = this.MIN_LEN_LeftToRightCenter;
        }

        //对左右中点进行处理
        //一比率，意义暂时未明确
        centerPtLeftSegment.x = centerPt03X + lenLeftSegment*(centerPt03X-centerPt12X)/(lenLeftCenterToRightCenter*this.QIANJI_RATE1);
        centerPtLeftSegment.y = centerPt03Y + lenLeftSegment*(centerPt03Y-centerPt12Y)/(lenLeftCenterToRightCenter*this.QIANJI_RATE1);
        centerPtRightSegment.x = centerPt12X+ lenRightSegment*(centerPt12X-centerPt03X)/(lenLeftCenterToRightCenter*this.QIANJI_RATE1);
        centerPtRightSegment.y = centerPt12Y+ lenRightSegment*(centerPt12Y-centerPt03Y)/(lenLeftCenterToRightCenter*this.QIANJI_RATE1);

        //求左、右腰中点
        var leftYaoCenterPt = new SuperMap.Geometry.Point(0,0);
        var rightYaoCenterPt = new SuperMap.Geometry.Point(0,0);
        leftYaoCenterPt.x = centerPt03X+lenLeftSegment*(centerPt03X-centerPt12X)/(lenLeftCenterToRightCenter*this.QIANJI_RATE2);
        leftYaoCenterPt.y = centerPt03Y+lenLeftSegment*(centerPt03Y-centerPt12Y)/(lenLeftCenterToRightCenter*this.QIANJI_RATE2);
        rightYaoCenterPt.x = centerPt12X+lenRightSegment*(centerPt12X-centerPt03X)/(lenLeftCenterToRightCenter*this.QIANJI_RATE2);
        rightYaoCenterPt.y = centerPt12Y+lenRightSegment*(centerPt12Y-centerPt03Y)/(lenLeftCenterToRightCenter*this.QIANJI_RATE2);

        //底部中点，即0、1点中点
        var centerPtBottom = new SuperMap.Geometry.Point((opeGeoPts[0].x+opeGeoPts[1].x)/2, (opeGeoPts[0].y+opeGeoPts[1].y)/2);

        //顶部中点，即2，3点中点
        var centerPtTop = new SuperMap.Geometry.Point((opeGeoPts[2].x+opeGeoPts[3].x)/2, (opeGeoPts[2].y+opeGeoPts[3].y)/2);

        //求取控制左右箭头大小的参数
        var leftArrowTouParX = opeGeoPts[3].x -(opeGeoPts[3].x-centerPtLeftSegment.x)*this.SCALE_AT;
        var leftArrowTouParY = opeGeoPts[3].y -(opeGeoPts[3].y-centerPtLeftSegment.y)*this.SCALE_AT;
        var rightArrowTouParX = opeGeoPts[2].x-(opeGeoPts[2].x-centerPtRightSegment.x)*this.SCALE_AT;
        var rightArrowTouParY = opeGeoPts[2].y-(opeGeoPts[2].y-centerPtRightSegment.y)*this.SCALE_AT;

        //求取左右箭头的两箭劲点
        var leftArrowTouAJLeft = new SuperMap.Geometry.Point(0,0);
        var leftArrowTouAJRight = new SuperMap.Geometry.Point(0,0);
        var rightArrowTouAJLeft = new SuperMap.Geometry.Point(0,0);
        var rightArrowTouAJRight = new SuperMap.Geometry.Point(0,0);
        //左箭头右劲点
        leftArrowTouAJRight.x = leftArrowTouParX-(leftArrowTouParY-opeGeoPts[3].y)*this.SCALE_ATAJ;
        leftArrowTouAJRight.y= leftArrowTouParY+(leftArrowTouParX-opeGeoPts[3].x)*this.SCALE_ATAJ;
        //左箭头左劲点
        leftArrowTouAJLeft.x = leftArrowTouParX+(leftArrowTouParY-opeGeoPts[3].y)*this.SCALE_ATAJ;
        leftArrowTouAJLeft.y= leftArrowTouParY-(leftArrowTouParX-opeGeoPts[3].x)*this.SCALE_ATAJ;

        //右箭头右劲点
        rightArrowTouAJRight.x = rightArrowTouParX -(rightArrowTouParY-opeGeoPts[2].y)*this.SCALE_ATAJ;
        rightArrowTouAJRight.y = rightArrowTouParY+(rightArrowTouParX-opeGeoPts[2].x)*this.SCALE_ATAJ;
        //右箭头左劲点
        rightArrowTouAJLeft.x = rightArrowTouParX+(rightArrowTouParY-opeGeoPts[2].y)*this.SCALE_ATAJ;
        rightArrowTouAJLeft.y = rightArrowTouParY-(rightArrowTouParX-opeGeoPts[2].x)*this.SCALE_ATAJ;

        //求取左右箭头的两箭耳点
        var leftArrowTouAELeft = new SuperMap.Geometry.Point(0,0);
        var leftArrowTouAERight = new SuperMap.Geometry.Point(0,0);
        var rightArrowTouAELeft = new SuperMap.Geometry.Point(0,0);
        var rightArrowTouAERight = new SuperMap.Geometry.Point(0,0);
        //左箭头左箭耳点
        leftArrowTouAELeft.x = 3*leftArrowTouAJLeft.x-2*leftArrowTouParX-(opeGeoPts[3].x-leftArrowTouParX)*this.SCALE_ATAE;
        leftArrowTouAELeft.y = 3*leftArrowTouAJLeft.y-2*leftArrowTouParY-(opeGeoPts[3].y-leftArrowTouParY)*this.SCALE_ATAE;
        //左箭头右箭耳点
        leftArrowTouAERight.x = 3*leftArrowTouAJRight.x-2*leftArrowTouParX-(opeGeoPts[3].x-leftArrowTouParX)*this.SCALE_ATAE;
        leftArrowTouAERight.y = 3*leftArrowTouAJRight.y-2*leftArrowTouParY-(opeGeoPts[3].y-leftArrowTouParY)*this.SCALE_ATAE;

        //右箭头左箭耳点
        rightArrowTouAELeft.x = 3*rightArrowTouAJLeft.x-2*rightArrowTouParX-(opeGeoPts[2].x-rightArrowTouParX)*this.SCALE_ATAE;
        rightArrowTouAELeft.y = 3*rightArrowTouAJLeft.y-2*rightArrowTouParY-(opeGeoPts[2].y-rightArrowTouParY)*this.SCALE_ATAE;
        //右箭头右箭耳点
        rightArrowTouAERight.x = 3*rightArrowTouAJRight.x-2*rightArrowTouParX-(opeGeoPts[2].x-rightArrowTouParX)*this.SCALE_ATAE;
        rightArrowTouAERight.y = 3*rightArrowTouAJRight.y-2*rightArrowTouParY-(opeGeoPts[2].y-rightArrowTouParY)*this.SCALE_ATAE;

        //重算左右线中点
        centerPtLeftSegment.x = centerPt03X+lenLeftSegment*(centerPt03X-centerPt12X)/(lenLeftCenterToRightCenter*this.QIANJI_RATE4);
        centerPtLeftSegment.y = centerPt03Y + lenLeftSegment*(centerPt03Y-centerPt12Y)/(lenLeftCenterToRightCenter*this.QIANJI_RATE4);
        centerPtRightSegment.x = centerPt12X+lenRightSegment*(centerPt12X-centerPt03X)/(lenLeftCenterToRightCenter*this.QIANJI_RATE4);
        centerPtRightSegment.y = centerPt12Y+lenRightSegment*(centerPt12Y-centerPt03Y)/(lenLeftCenterToRightCenter*this.QIANJI_RATE4);

        //计算左箭尾控制点
        var leftArrowWeiCtrlPt = new SuperMap.Geometry.Point(0,0);
        leftArrowWeiCtrlPt.x = opeGeoPts[0].x +(centerPtLeftSegment.x-opeGeoPts[0].x)*this.SCALE_AW;
        leftArrowWeiCtrlPt.y = opeGeoPts[0].y +(centerPtLeftSegment.y-opeGeoPts[0].y)*this.SCALE_AW;

        //计算右箭尾控制点
        var rightArrowWeiCtrlPt = new SuperMap.Geometry.Point(0,0);
        rightArrowWeiCtrlPt.x = opeGeoPts[1].x +(centerPtRightSegment.x-opeGeoPts[1].x)*this.SCALE_AW;
        rightArrowWeiCtrlPt.y = opeGeoPts[1].y +(centerPtRightSegment.y-opeGeoPts[1].y)*this.SCALE_AW;

        //计算左箭头左箭劲控制点
        var leftArrowTouLeftAJCtrlPt = new SuperMap.Geometry.Point(0,0);
        leftArrowTouLeftAJCtrlPt.x = leftArrowTouAJLeft.x +(centerPtLeftSegment.x-leftArrowTouAJLeft.x)*this.SCALE_ATAJctrlSameSide;
        leftArrowTouLeftAJCtrlPt.y = leftArrowTouAJLeft.y +(centerPtLeftSegment.y-leftArrowTouAJLeft.y)*this.SCALE_ATAJctrlSameSide;

        //计算右箭头右箭劲控制点
        var rightArrowTouRightAJCtrlPt = new SuperMap.Geometry.Point(0,0);
        rightArrowTouRightAJCtrlPt.x = rightArrowTouAJRight.x +(centerPtRightSegment.x-rightArrowTouAJRight.x)*this.SCALE_ATAJctrlSameSide;
        rightArrowTouRightAJCtrlPt.y = rightArrowTouAJRight.y +(centerPtRightSegment.y-rightArrowTouAJRight.y)*this.SCALE_ATAJctrlSameSide;

        //计算左箭头右箭劲控制点
        var leftArrowTouRightAJCtrlPt = new SuperMap.Geometry.Point(0,0);
        leftArrowTouRightAJCtrlPt.x = leftArrowTouAJRight.x +(leftYaoCenterPt.x-leftArrowTouAJRight.x)*this.SCALE_ATAJctrlDefSide;
        leftArrowTouRightAJCtrlPt.y = leftArrowTouAJRight.y +(leftYaoCenterPt.y-leftArrowTouAJRight.y)*this.SCALE_ATAJctrlDefSide;

        //计算右箭头左箭劲控制点
        var rightArrowTouLeftAJCtrlPt = new SuperMap.Geometry.Point(0,0);
        rightArrowTouLeftAJCtrlPt.x = rightArrowTouAJLeft.x +(rightYaoCenterPt.x-rightArrowTouAJLeft.x)*this.SCALE_ATAJctrlDefSide;
        rightArrowTouLeftAJCtrlPt.y = rightArrowTouAJLeft.y +(rightYaoCenterPt.y-rightArrowTouAJLeft.y)*this.SCALE_ATAJctrlDefSide;

        //箭腰中点
        var arrowYaoCenterPt = new SuperMap.Geometry.Point(0,0);
        arrowYaoCenterPt.x = centerPtBottom.x+(centerPtTop.x-centerPtBottom.x)*sv1;
        arrowYaoCenterPt.y = centerPtBottom.y+(centerPtTop.y-centerPtBottom.y)*sv1;
        m_scalePoints.push(new SuperMap.Geometry.Point(arrowYaoCenterPt.x,arrowYaoCenterPt.y));

        //计算箭腰底中点的左右控制点
        var arrowYaoCentLeftCtrlPt = new SuperMap.Geometry.Point(0,0);
        var arrowYaoCentRightCtrlPt = new SuperMap.Geometry.Point(0,0);
        arrowYaoCentLeftCtrlPt.x = opeGeoPts[0].x + (opeGeoPts[3].x-opeGeoPts[0].x)*sv1;
        arrowYaoCentLeftCtrlPt.y = opeGeoPts[0].y + (opeGeoPts[3].y-opeGeoPts[0].y)*sv1;

        arrowYaoCentRightCtrlPt.x = opeGeoPts[1].x + (opeGeoPts[2].x-opeGeoPts[1].x)*sv1;
        arrowYaoCentRightCtrlPt.y = opeGeoPts[1].y + (opeGeoPts[2].y-opeGeoPts[1].y)*sv1;

        //腰底曲率
        arrowYaoCentLeftCtrlPt.x = arrowYaoCentLeftCtrlPt.x + (arrowYaoCenterPt.x-arrowYaoCentLeftCtrlPt.x)*this.QIANJI_RATE3;
        arrowYaoCentLeftCtrlPt.y = arrowYaoCentLeftCtrlPt.y + (arrowYaoCenterPt.y-arrowYaoCentLeftCtrlPt.y)*this.QIANJI_RATE3;
        arrowYaoCentRightCtrlPt.x = arrowYaoCentRightCtrlPt.x + (arrowYaoCenterPt.x-arrowYaoCentRightCtrlPt.x)*this.QIANJI_RATE3;
        arrowYaoCentRightCtrlPt.y = arrowYaoCentRightCtrlPt.y + (arrowYaoCenterPt.y-arrowYaoCentRightCtrlPt.y)*this.QIANJI_RATE3;

        //开始组合钳击箭标
        //箭身全部点

        //存放临时点
        var tempSavePts = [];
        //存放生成的点
        var tempGeneratePts = [];

        //生成左箭身
        //添加左箭尾点
        tempSavePts.push(opeGeoPts[0].clone());
        //添加左箭首点控制点
        tempSavePts.push(leftArrowWeiCtrlPt.clone());
        //添加左箭箭劲控制点
        tempSavePts.push(leftArrowTouLeftAJCtrlPt.clone());
        //添加左箭箭劲点
        tempSavePts.push(leftArrowTouAJLeft.clone());

        contour.MoveTo(tempSavePts[0]); //起始点是MoveTo,以后都是LineTo了
        contour.CurveTo(tempSavePts[1], tempSavePts[2], tempSavePts[3]);

        var LeftArowLeftBody = [];
        var LeftArowHead = [];
        var LeftArowRightBody = [];
        var ArowMidBody = [];
        var RightArowLeftBody = [];
        var RightArowHead = [];
        var RightArowRightBody = [];
        var tempPolyons = [];
        var nIndex;

        //记录下左箭头的左箭身的拟合点
        if(this.symbolDefaultStyle.fillGradientMode == 1){
            contour.ToSubPathPolygons(tempPolyons);
            LeftArowLeftBody.push(tempPolyons[0]);
            nIndex = tempPolyons[0].length;
        }

        //添加左箭头
        contour.LineTo(leftArrowTouAELeft);
        contour.LineTo(opeGeoPts[3]);
        contour.LineTo(leftArrowTouAERight);

        tempSavePts = [];
        //添加左箭头右箭劲点
        tempSavePts.push(leftArrowTouAJRight);
        //tempSavePts.push(leftArrowTouAJLeft);
        //添加左箭头右箭劲点控制点
        tempSavePts.push(leftArrowTouRightAJCtrlPt);
        //添加箭腰中点左控制点
        tempSavePts.push(arrowYaoCentLeftCtrlPt);
        //添加箭腰中点
        tempSavePts.push(arrowYaoCenterPt);
        contour.LineTo(tempSavePts[0]);

        //记录下左箭头的箭头点
        if(this.symbolDefaultStyle.fillGradientMode == 1){
            tempPolyons = [];
            contour.ToSubPathPolygons(tempPolyons);
            for(; nIndex < tempPolyons[0].length; nIndex++){
                LeftArowHead.push(tempPolyons[0][nIndex]);
            }
            nIndex = tempPolyons[0].length;
        }

        contour.CurveTo(tempSavePts[1],tempSavePts[2],tempSavePts[3]);

        //记录下左箭头的右箭身点
        if(this.symbolDefaultStyle.fillGradientMode == 1){
            tempPolyons = [];
            contour.ToSubPathPolygons(tempPolyons);
            for(; nIndex < tempPolyons[0].length; nIndex++){
                LeftArowRightBody.push(tempPolyons[0][nIndex]);
            }
            nIndex = tempPolyons[0].length;
        }

        //添加箭腰右部分
        tempSavePts = [];
        tempGeneratePts = [];
        tempSavePts.push(arrowYaoCentRightCtrlPt);
        tempSavePts.push(rightArrowTouLeftAJCtrlPt);
        tempSavePts.push(rightArrowTouAJLeft);
        contour.CurveTo(tempSavePts[0],tempSavePts[1],tempSavePts[2]);

        //记录下右箭头的左箭身点
        if(this.symbolDefaultStyle.fillGradientMode == 1){
            tempPolyons = [];
            contour.ToSubPathPolygons(tempPolyons);
            for(; nIndex < tempPolyons[0].length; nIndex++){
                RightArowLeftBody.push(tempPolyons[0][nIndex]);
            }
            nIndex = tempPolyons[0].length;
        }

        //添加右箭头点
        contour.LineTo(rightArrowTouAELeft);
        contour.LineTo(opeGeoPts[2]);
        contour.LineTo(rightArrowTouAERight);
        //添加右箭身点
        tempSavePts = [];
        tempGeneratePts = [];

        tempSavePts.push(rightArrowTouAJRight);
        tempSavePts.push(rightArrowTouRightAJCtrlPt);
        tempSavePts.push(rightArrowWeiCtrlPt);
        tempSavePts.push(rightArrowWeiPt);
        contour.LineTo(tempSavePts[0]);

        //记录下右箭头的箭头点
        if(this.symbolDefaultStyle.fillGradientMode == 1){
            tempPolyons = [];
            contour.ToSubPathPolygons(tempPolyons);
            for(; nIndex < tempPolyons[0].length; nIndex++){
                RightArowHead.push(tempPolyons[0][nIndex]);
            }
            nIndex = tempPolyons[0].length;
        }

        contour.CurveTo(tempSavePts[1],tempSavePts[2],tempSavePts[3]);

        //记录下右箭头的右箭身点
        if(this.symbolDefaultStyle.fillGradientMode == 1){
            tempPolyons = [];
            contour.ToSubPathPolygons(tempPolyons);
            for(; nIndex < tempPolyons[0].length; nIndex++){
                RightArowRightBody.push(tempPolyons[0][nIndex]);
            }
        }

        tempPolyons = [];
        contour.ToSubPathPolygons(tempPolyons);

        return tempPolyons[0];
    },

    operateCtrlPts: function (ctrlPts) {
        var operatedPts = SuperMap.Plot.PlottingUtil.clonePoints(ctrlPts);
        var count = operatedPts.length;
        //三个点时，构造成四个点，添加的点为三点构成三角形的中点
        if(count == 3){
            //生成第四个点
            var ctrl4Pt = new SuperMap.Geometry.Point(0,0);
            ctrl4Pt = SuperMap.Plot.PlottingUtil.GetTrapezoidPoints(this.QIANJI_OPERATE_RATE1, ctrlPts[0], ctrlPts[1], ctrlPts[2], ctrl4Pt);
            operatedPts.push(ctrl4Pt);
        }

        if(count > 4){
            operatedPts.splice(4, count - 4);
            count = operatedPts.length;
        }
        //如果第三点不在第一、二点线段的左侧，则调整顺序
        if(SuperMap.Plot.PlottingUtil.PointIsRightToLine(ctrlPts[0], ctrlPts[1], operatedPts[2])){
            //一、二点交换
            var tempPt = operatedPts[0];
            operatedPts[0] = operatedPts[1];
            operatedPts[1] = tempPt;
        }

        //如果点三不在点一、二的垂线右侧，则交换三、四点
        if(SuperMap.Plot.PlottingUtil.PointIsRightToVerticle(operatedPts[0],operatedPts[1],operatedPts[2])){
            //三、四点交换
            var tempPt = operatedPts[2];
            operatedPts[2] = operatedPts[3];
            operatedPts[3] = tempPt;
        }

        return operatedPts;
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol1006"
});