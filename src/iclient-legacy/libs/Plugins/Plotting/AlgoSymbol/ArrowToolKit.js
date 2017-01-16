/**
 * Class: SuperMap.Plot.ArrowToolKit
 * 箭头工厂类。
 */
SuperMap.Plot.ArrowToolKit = new SuperMap.Class({
    CLASS_NAME: "SuperMap.Plot.ArrowToolKit"
});

SuperMap.Plot.ArrowToolKit.ConstValue = {
    MAX_ARRAY_SIZE: 128, //数组最大大小

    //箭头收缩系数，默认1.5
    sv_AtScaleParameter: 1.5,
    //箭头长度与宽度的比值，默认1.35
    sv_AtLenDivAtWidth: 1.35,
    //箭头宽度与箭尾宽度的比值，默认0.5
    sv_AtWidthDivAwWidth: 0.5,

    DUOJIANTOU_TAIL_RATE_1 : 8.0,//多箭头箭尾曲线的第一个系数
    DUOJIANTOU_TAIL_RATE_2 :3.0,//多箭头箭尾曲线的第二个系数
    DUOJIANTOU_TAIL_RATE_3 : 0.6//多箭头箭尾曲线的第三个系数
}

SuperMap.Plot.ArrowToolKit.ArrowTailType = {
    ARROWTAIL_NONE: 0,
    ARROWTAIL_LINE: 1,
    ARROWTAIL_CURVE: 2,
    ARROWTAIL_COATTAIL: 3,//单线箭头的燕尾
    ARROWTAIL_COATTAIL_POLYBODY: 4//带左右body箭头的燕尾
};

SuperMap.Plot.ArrowToolKit.ArrowHeadType = {
    //适用于单线的箭头
    ARROWHEAD_POLYLINE: 0,
    ARROWHEAD_TRIANGLE: 1,
    ARROWHEAD_COATTAIL: 2,
    ARROWHEAD_TRIANGLE_SOLID: 3,

    //适用于带左右body的箭头
    ARROWHEAD_WITH_EAR: 4,
    ARROWHEAD_WITHOUT_EAR: 5
};

SuperMap.Plot.ArrowToolKit.ArrowBodyType = {
    ARROWBODY_POLYLINE: 0,
    ARROWBODY_POLYBEZIER: 1,
    ARROWBODY_PARALLEL: 2,
    ARROWBODY_TRAPEZOID: 3,
    ARROWBODY_MULTIPOLYBEZIER: 4
};

SuperMap.Plot.ArrowToolKit.parallel = function(controlPoints, dDistance) {
    if(controlPoints.length === 1 || (controlPoints.length === 2 && (controlPoints[0].x === controlPoints[1].x && controlPoints[0].y === controlPoints[1].y))){
        return;
    }

    var parallelPts = {};
    parallelPts.leftParallelPts = SuperMap.Plot.PlottingUtil.parallel(controlPoints, dDistance);
    parallelPts.rightParallelPts = SuperMap.Plot.PlottingUtil.parallel(controlPoints, -dDistance);

    return parallelPts;
};

SuperMap.Plot.ArrowToolKit.trapezoid = function(controlPoints, dDownDistance, dUpDistance){
    if(controlPoints.length === 1 || (controlPoints.length === 2 && (controlPoints[0].x === controlPoints[1].x && controlPoints[0].y === controlPoints[1].y))){
        return;
    }

    var parallelPts = {};
    parallelPts.leftParallelPts = [];
    parallelPts.rightParallelPts = [];
    for(var i = 0; i < controlPoints.length-1; i++)
    {
        if(controlPoints[i].x === controlPoints[i+1].x && controlPoints[i].y === controlPoints[i+1].y) {
            parallelPts.leftParallelPts.push(parallelPts.leftParallelPts[parallelPts.leftParallelPts.length-1]);
            parallelPts.rightParallelPts.push(parallelPts.rightParallelPts[parallelPts.rightParallelPts.length-1]);
        }

        var pntSource = controlPoints[i+1];
        pntSource = SuperMap.Plot.PlottingUtil.rotate(controlPoints[i],0.0,1.0,pntSource);
        parallelPts.leftParallelPts.push(SuperMap.Plot.PlottingUtil.findPointInLine(controlPoints[i],pntSource,dDownDistance));

        pntSource = controlPoints[i];
        pntSource = SuperMap.Plot.PlottingUtil.rotate(controlPoints[i+1],0.0,-1.0,pntSource);
        parallelPts.leftParallelPts.push(SuperMap.Plot.PlottingUtil.findPointInLine(controlPoints[i+1],pntSource,dUpDistance));

        pntSource = controlPoints[i+1];
        pntSource = SuperMap.Plot.PlottingUtil.rotate(controlPoints[i],0.0,-1.0,pntSource);
        parallelPts.rightParallelPts.push(SuperMap.Plot.PlottingUtil.findPointInLine(controlPoints[i],pntSource,dDownDistance));

        pntSource = controlPoints[i];
        pntSource = SuperMap.Plot.PlottingUtil.rotate(controlPoints[i+1],0.0,1.0,pntSource);
        parallelPts.rightParallelPts.push(SuperMap.Plot.PlottingUtil.findPointInLine(controlPoints[i+1],pntSource,dUpDistance ));
    }

    return parallelPts;
};

/**
 * APIFunction: SuperMap.Plot.AlgoSymbolFactory.getAlgoSymbol
 * 判断浮点数是否近似等于某个值。
 *
 * Parameters:
 * libID - {Integer} 标号库ID。
 * code - {Integer} 标号code
 *
 * Returns:
 * {<SuperMap.Geometry.AlgoSymbol>} 返回 <SuperMap.Geometry.AlgoSymbol> 的子类。
 */
SuperMap.Plot.ArrowToolKit.generateArrowBodyShapePts = function (controlPoints, scaleValues, bodyType) {
    var arrowInfo = {};
    switch(bodyType)
    {
        case SuperMap.Plot.ArrowToolKit.ArrowBodyType.ARROWBODY_PARALLEL:
        case SuperMap.Plot.ArrowToolKit.ArrowBodyType.ARROWBODY_TRAPEZOID:
        {
            var arrowTouLenDiviedByArrowBodyLen = scaleValues[0];
            var arrowJingWidDiviedByArrowTouLen = scaleValues[1];
            var arrowWeiWidDiviedByArrowTouLen = scaleValues[2];
            var arrowErWidDividedByArrowTouLen = scaleValues[3];
            var arrowErLenDividedByArrowTouLen = scaleValues[4];

            var isParallel = SuperMap.Plot.PlottingUtil.equalFuzzy(arrowWeiWidDiviedByArrowTouLen, 0.0);
            if(!isParallel && controlPoints.length > 2)
            {
                var nCount = controlPoints.length;
                controlPoints.splice(2, nCount -2);
            }

            var dLength = SuperMap.Plot.PlottingUtil.polylineDistance(controlPoints);
            var dDistance = SuperMap.Plot.PlottingUtil.distance(controlPoints[controlPoints.length-2], controlPoints[controlPoints.length-1]);
            arrowInfo.arrowTouLen = dLength * arrowTouLenDiviedByArrowBodyLen;

            var arrowJingPt = SuperMap.Plot.PlottingUtil.findPointInPolyLine(controlPoints, dLength-arrowInfo.arrowTouLen).pt;
            var bodyPts = [];

            var arrowWeiWid = arrowInfo.arrowTouLen*arrowWeiWidDiviedByArrowTouLen;
            var arrowJingWid = arrowInfo.arrowTouLen*arrowJingWidDiviedByArrowTouLen;

            var ngeoPtscount = controlPoints.length - 1;
            for(var i = 0; i < ngeoPtscount; i++)
            bodyPts.push(controlPoints[i]);
            bodyPts.push(arrowJingPt);
            var parallelPts = {};
            parallelPts.leftParallelPts = [];
            parallelPts.rightParallelPts = [];
            if(isParallel === true)
                parallelPts = SuperMap.Plot.ArrowToolKit.parallel(bodyPts, arrowJingWid);
            else
                parallelPts = SuperMap.Plot.ArrowToolKit.trapezoid(bodyPts, arrowWeiWid, arrowJingWid);

            var temp = controlPoints[controlPoints.length-1];
            controlPoints[controlPoints.length-1] = arrowJingPt;
            controlPoints.push(temp);
            var OpectrlPoints = null;
            arrowInfo.leftBodyPts = parallelPts.leftParallelPts;
            arrowInfo.rightBodyPts = parallelPts.rightParallelPts;
            arrowInfo.OpectrlPoints = OpectrlPoints;

            return arrowInfo;
        }
            break;
        case SuperMap.Plot.ArrowToolKit.ArrowBodyType.ARROWBODY_MULTIPOLYBEZIER:
        {
            var arrowBodyLen = SuperMap.Plot.PlottingUtil.polylineDistance(controlPoints);
            if(arrowBodyLen == 0){
                return;
            }

            //处理输入的控制点
            var OpectrlPoints = SuperMap.Plot.ArrowToolKit.OperateCtrlPts(controlPoints);
            var ctrlPntCount = OpectrlPoints.length;
            ctrlPntCount--;

            var MultiBezier = SuperMap.Plot.ArrowToolKit.generateMultiBezier(OpectrlPoints, ctrlPntCount, scaleValues, arrowBodyLen);

            controlPoints = [];
            for(var i = 0; i< OpectrlPoints.length; i++){
                controlPoints.push(OpectrlPoints[i]);
            }

            arrowInfo.arrowTouLen = MultiBezier.arrowTouLen;
            arrowInfo.leftBodyPts = MultiBezier.leftBodyPts;
            arrowInfo.rightBodyPts = MultiBezier.rightBodyPts;
            arrowInfo.OpectrlPoints = OpectrlPoints;
        }
            break;
        default:
            break;
    }
    return arrowInfo;
};

SuperMap.Plot.ArrowToolKit.generateArrowHeadShapePts = function(controlPoints, atPoints, scaleValues, arrowTouLen, headType) {
    var arrowHeadPts = [];

    switch(headType)
    {
        case SuperMap.Plot.ArrowToolKit.ArrowHeadType.ARROWHEAD_WITH_EAR:
        case SuperMap.Plot.ArrowToolKit.ArrowHeadType.ARROWHEAD_WITHOUT_EAR:
        {
            var arrowErWidDividedByArrowTouLen = scaleValues[0];
            var arrowErLenDividedByArrowTouLen = scaleValues[1];
            var arrowTouLenDiviedByArrowBodyLen = 0.0;
            var arrowJingWidDiviedByArrowTouLen = 0.0;

            if(scaleValues.length == 3) {
                arrowTouLenDiviedByArrowBodyLen = scaleValues[2];

            }
            if(scaleValues.length == 4) {
                arrowTouLenDiviedByArrowBodyLen = scaleValues[2];
                arrowJingWidDiviedByArrowTouLen = scaleValues[3];
            }


            var arrowJingWid = 0.0;
            var tempArrowTouLen = 0.0;
            if(!SuperMap.Plot.PlottingUtil.equalFuzzy(arrowTouLenDiviedByArrowBodyLen, 0.0) &&
            !SuperMap.Plot.PlottingUtil.equalFuzzy(arrowJingWidDiviedByArrowTouLen, 0.0))
            {
                var tempGeoPts = SuperMap.Plot.PlottingUtil.clonePoints(controlPoints);
                tempGeoPts.splice(tempGeoPts.length-1, 1);
                var dLength = SuperMap.Plot.PlottingUtil.polylineDistance(tempGeoPts);
                tempArrowTouLen = dLength * arrowTouLenDiviedByArrowBodyLen;
                arrowJingWid = tempArrowTouLen*arrowJingWidDiviedByArrowTouLen;
            }

            var pCenter = new SuperMap.Geometry.Point((atPoints[0].x+atPoints[1].x)/2, (atPoints[0].y+atPoints[1].y)/2);

            if(SuperMap.Plot.PlottingUtil.equalFuzzy(arrowErLenDividedByArrowTouLen, 0.0))
            {
                var arrowErWid = arrowTouLen*arrowErWidDividedByArrowTouLen;

                var pntSource = controlPoints[controlPoints.length-1];
                pntSource = SuperMap.Plot.PlottingUtil.rotate(pCenter,0.0,1.0,pntSource);
                arrowHeadPts.push(SuperMap.Plot.PlottingUtil.findPointInLine(pCenter,pntSource,arrowErWid));

                arrowHeadPts.push(controlPoints[controlPoints.length-1]);

                pntSource = controlPoints[controlPoints.length-1];
                pntSource = SuperMap.Plot.PlottingUtil.rotate(pCenter,0.0,-1.0,pntSource);
                arrowHeadPts.push(SuperMap.Plot.PlottingUtil.findPointInLine(pCenter,pntSource,arrowErWid));

                return arrowHeadPts;
            } else {
                //根据箭耳15-20度,箭头25-30度
                //箭头点从左箭身到右箭身；
                var L2 = arrowTouLen*arrowErLenDividedByArrowTouLen;//为箭耳长度
                var tempPt = SuperMap.Plot.PlottingUtil.getExcentrePointOnSegmentByScale(L2,pCenter, controlPoints[controlPoints.length-1]);

                L2 = arrowTouLen*arrowErWidDividedByArrowTouLen;//L2为一侧箭耳的宽度
                L2 += arrowJingWid;
                var pnt = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(L2, controlPoints[controlPoints.length-1], tempPt);	//求两箭耳点
                var leftPt = pnt.pntLeft;
                var rightPt = pnt.pntRight;

                //重新计算顶点
                var ptNewTop = controlPoints[controlPoints.length-1];

                arrowHeadPts.push(rightPt);
                arrowHeadPts.push(ptNewTop);
                arrowHeadPts.push(leftPt);

                return arrowHeadPts;
            }

        }
            break;
    }
};

/**
 * Function: SuperMap.Plot.ArrowToolKit.generateArrowBodyShapePtsBySingleLine
 * 根据位置点计算箭身拟合点和箭头长度
 *
 * Parameters:
 * geoPts - {Array<SuperMap.Geometry.Point>} 标号位置点。
 * scaleValue - {Float} 比例值
 * bodyType - {SuperMap.Plot.ArrowToolKit.ArrowBodyType}箭身类型
 *
 * Returns:
 * {arrowHeadLen,arrowBodyPts} 箭头的长度，箭身的拟合点。
 */
SuperMap.Plot.ArrowToolKit.generateArrowBodyShapePtsBySingleLine = function(geoPts, scaleValue, bodyType){
    var arrowHeadLen = 0;
    var arrowBodyPts = [];

    if(2 > geoPts.length){
        return {arrowHeadLen:arrowHeadLen,arrowBodyPts:arrowBodyPts};
    }

    var allDistance = 0;
    for(var i = 0; i < geoPts.length-1; i++){
        allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i+1]);
    }

    var isZeroValue = SuperMap.Plot.PlottingUtil.equalFuzzy(scaleValue, 0);
    if(!isZeroValue){

    }

    arrowHeadLen = allDistance * scaleValue;

    switch (bodyType){
        case SuperMap.Plot.ArrowToolKit.ArrowBodyType.ARROWBODY_POLYLINE:{
            if(!isZeroValue){
                var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(geoPts, allDistance - arrowHeadLen);

                if(-1 !== result.index){
                    for(var i = 0; i < result.index; i++){
                        arrowBodyPts.push(geoPts[i]);
                    }

                    arrowBodyPts.push(result.pt);
                }
            }
            else{
                arrowBodyPts = arrowBodyPts.concat(geoPts);
            }
            break;
        }
        case SuperMap.Plot.ArrowToolKit.ArrowBodyType.ARROWBODY_POLYBEZIER:{
            if(2 == geoPts.length){
                if (isZeroValue)
                {
                    arrowBodyPts = arrowBodyPts.concat(geoPts);
                }
                else
                {
                    var ptBodyEnd = SuperMap.Plot.PlottingUtil.findPoint(geoPts[1],geoPts[0],arrowHeadLen,0);

                    arrowBodyPts.push(geoPts[0]);
                    arrowBodyPts.push(ptBodyEnd);
                }
            }
            else{
                var allPoints = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(geoPts);
                if(isZeroValue){
                    arrowBodyPts = arrowBodyPts.concat(allPoints);
                }
                else{
                    var headDis = arrowHeadLen * 1.5;

                    var bodyDistance = 0;
                    for(var i = 0; i < allPoints.length-1; i++){
                        bodyDistance += SuperMap.Plot.PlottingUtil.distance(allPoints[i], allPoints[i+1]);
                    }

                    var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(allPoints, bodyDistance - headDis);
                    if(-1 !== result.index){
                        for(var i = 0; i < result.index; i++){
                            arrowBodyPts.push(allPoints[i]);
                        }

                        arrowBodyPts.push(result.pt);
                    }
                }
            }
            break;
        }
    }

    return {arrowHeadLen:arrowHeadLen,arrowBodyPts:arrowBodyPts};
};

/**
 * Function: SuperMap.Plot.ArrowToolKit.generateArrowHeadShapePtsBySingleLine
 * 根据位置点计算箭身拟合点和箭头长度
 *
 * Parameters:
 * geoPts - {Array<SuperMap.Geometry.Point>} 标号位置点。
 * ptsClone - {Array<SuperMap.Geometry.Point>} 标号位置点。
 * lastPts - {Array<SuperMap.Geometry.Point>} 箭身拟合点的最后两个点。
 * scaleValue - {Float} 比例值
 * arrowHeadLen - {Float} 箭头的长度
 * headType - {SuperMap.Plot.ArrowToolKit.ArrowHeadType}箭头类型
 *
 * Returns:
 * {Array<SuperMap.Geometry.Point>} 箭头拟合点。
 */
SuperMap.Plot.ArrowToolKit.generateArrowHeadShapePtsBySingleLine = function(geoPts,ptsClone, lastPts, scaleValue, arrowHeadLen,headType) {
    var arrowHeadPts = [];
    if(2 > geoPts){
        return arrowHeadPts;
    }

    var allDistance = 0;
    for(var i = 0; i < geoPts.length-1; i++){
        allDistance += SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[i+1]);
    }
    var dis = allDistance * scaleValue;
    switch (headType){
        case SuperMap.Plot.ArrowToolKit.ArrowHeadType.ARROWHEAD_POLYLINE:{


            var pt1 = SuperMap.Plot.PlottingUtil.findPoint(ptsClone[ptsClone.length-1],ptsClone[ptsClone.length-2],dis,22.5);
            var pt2 = SuperMap.Plot.PlottingUtil.findPoint(ptsClone[ptsClone.length-1],ptsClone[ptsClone.length-2],dis,-22.5);

            arrowHeadPts.push(pt1);
            arrowHeadPts.push(geoPts[geoPts.length-1]);
            arrowHeadPts.push(pt2);
            break;
        }
        case SuperMap.Plot.ArrowToolKit.ArrowHeadType.ARROWHEAD_TRIANGLE:{
            var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(geoPts, allDistance - arrowHeadLen);
            var newTopPt = SuperMap.Plot.PlottingUtil.findPoint(lastPts[0],lastPts[1],arrowHeadLen,180);

            var dis = SuperMap.Plot.PlottingUtil.distance(result.pt,newTopPt);
            dis = 2 * Math.sqrt(dis * dis / 3);

            var pt1 = SuperMap.Plot.PlottingUtil.findPoint(newTopPt, result.pt, dis, 22.5);
            var pt2 = SuperMap.Plot.PlottingUtil.findPoint(newTopPt, result.pt, dis, -22.5);

            arrowHeadPts.push(pt1);
            arrowHeadPts.push(newTopPt);
            arrowHeadPts.push(pt2);
            arrowHeadPts.push(pt1);
            break;
        }
        case SuperMap.Plot.ArrowToolKit.ArrowHeadType.ARROWHEAD_TRIANGLE_SOLID:{

            var ptStart = ptsClone[ptsClone.length-1];
            var ptEnd = ptsClone[ptsClone.length-2];
            var ptMid = SuperMap.Plot.PlottingUtil.findPoint(ptStart, ptEnd, dis, 0);

            var pt1 = SuperMap.Plot.PlottingUtil.findPoint(ptStart, ptMid, dis, 22.5);
            var pt2 = SuperMap.Plot.PlottingUtil.findPoint(ptStart, ptMid, dis, -22.5);

            arrowHeadPts.push(pt1);
            arrowHeadPts.push(ptStart);
            arrowHeadPts.push(pt2);
            arrowHeadPts.push(pt1);
            break;
        }
        case SuperMap.Plot.ArrowToolKit.ArrowHeadType.ARROWHEAD_COATTAIL:{

            var len = ptsClone.length;
            var ptEnd = ptsClone[len-1];

            dis = 2* Math.sqrt(dis * dis / 3);
            var pt1 = SuperMap.Plot.PlottingUtil.findPoint(ptsClone[len-1], ptsClone[len-2], dis, 20);
            var pt2 = SuperMap.Plot.PlottingUtil.findPoint(ptsClone[len-1], ptsClone[len-2], dis,-20);
            var pt3 = SuperMap.Plot.PlottingUtil.findPoint(ptsClone[len-1], ptsClone[len-2], dis/2,0);

            arrowHeadPts.push(ptEnd);
            arrowHeadPts.push(pt1);
            arrowHeadPts.push(pt3);
            arrowHeadPts.push(pt2);
            arrowHeadPts.push(ptEnd);
            break;
        }
    }
    return arrowHeadPts;
};

/**
 * Function: generateArrowTailShapePts
 * 根据位置点计算箭身拟合点和箭尾长度
 *
 * Parameters:
 * geoPts - {Array<SuperMap.Geometry.Point>} 标号位置点。
 * awPoints - {Array<SuperMap.Geometry.Point>} 箭尾拟合点的最后两个点。
 * scaleValue - {Float} 比例值
 * headType - {SuperMap.Plot.ArrowToolKit.ArrowHeadType}箭尾类型
 *
 * Returns:
 * {Array<SuperMap.Geometry.Point>} 箭尾拟合点。
 */

SuperMap.Plot.ArrowToolKit.generateArrowTailShapePts = function(controlPoints, awPoints, scaleValue, tailType){
    var awptCount = awPoints.length;
    var arrowTailPts = [];
    var allDistance = 0;
    for (var i = 0; i < controlPoints.length - 1; i++) {
        allDistance += SuperMap.Plot.PlottingUtil.distance(controlPoints[i], controlPoints[i + 1]);
    }

    var dis = allDistance * scaleValue;
    switch(tailType){
        case SuperMap.Plot.ArrowToolKit.ArrowTailType.ARROWTAIL_NONE:
            break;
        case SuperMap.Plot.ArrowToolKit.ArrowTailType.ARROWTAIL_LINE:
        {

           var pt1 =  SuperMap.Plot.PlottingUtil.findPoint(controlPoints[0], controlPoints[1], dis, 90);
           var pt2 =  SuperMap.Plot.PlottingUtil.findPoint(controlPoints[0], controlPoints[1], dis, -90);
            arrowTailPts.push(pt1);
            arrowTailPts.push(pt2);

        }
            break;
        case SuperMap.Plot.ArrowToolKit.ArrowTailType.ARROWTAIL_CURVE:
        {
            var centerPtBottom = new SuperMap.Geometry.Point((awPoints[0].x+awPoints[awptCount-1].x)*0.5, (awPoints[0].y+awPoints[awptCount-1].y)*0.5);
            var disJWPts = SuperMap.Plot.PlottingUtil.distance(awPoints[0], awPoints[awptCount - 1]);
            var arrowTailCenterPt = SuperMap.Plot.PlottingUtil.getIncentrePointOnSegmentByScale(disJWPts*scaleValue, centerPtBottom,controlPoints[controlPoints.length-1]);

            // 求取内点的左右控制点
            var lCtrlPt = new SuperMap.Geometry.Point(0,0);
            var rCtrlPt = new SuperMap.Geometry.Point(0,0);
            SuperMap.Plot.PlottingUtil.GetTrianglePoints(SuperMap.Plot.ArrowToolKit.ConstValue.DUOJIANTOU_TAIL_RATE_1, SuperMap.Plot.ArrowToolKit.ConstValue.DUOJIANTOU_TAIL_RATE_2, awPoints[0], arrowTailCenterPt,awPoints[awptCount-1],lCtrlPt,rCtrlPt)

            // 求取箭体起点的控制点
            var startCtrlPt = new SuperMap.Geometry.Point(0,0);
            SuperMap.Plot.PlottingUtil.GetTrapezoidPoints(SuperMap.Plot.ArrowToolKit.ConstValue.DUOJIANTOU_TAIL_RATE_3, awPoints[0], arrowTailCenterPt,lCtrlPt,startCtrlPt);

            // 求取箭体末点的右控制点
            var endCtrlPt = new SuperMap.Geometry.Point(0,0);
            SuperMap.Plot.PlottingUtil.GetTrapezoidPoints(SuperMap.Plot.ArrowToolKit.ConstValue.DUOJIANTOU_TAIL_RATE_3, awPoints[awptCount-1], arrowTailCenterPt,rCtrlPt,endCtrlPt);

        }
            break;
        case SuperMap.Plot.ArrowToolKit.ArrowTailType.ARROWTAIL_COATTAIL:
        {   //单箭尾


            var leftPt = SuperMap.Plot.PlottingUtil.findPoint(controlPoints[0],controlPoints[1],dis,-22.5+180);
            var rightPt = SuperMap.Plot.PlottingUtil.findPoint(controlPoints[0],controlPoints[1],dis,22.5-180);

            arrowTailPts.push(leftPt);
            arrowTailPts.push(controlPoints[0]);
            arrowTailPts.push(rightPt);
        }
            break;
        case SuperMap.Plot.ArrowToolKit.ArrowTailType.ARROWTAIL_COATTAIL_POLYBODY:
        {
            var centerPtBottom = new SuperMap.Geometry.Point((awPoints[0].x+awPoints[awptCount-1].x)*0.5, (awPoints[0].y+awPoints[awptCount-1].y)*0.5);
            var disJWPts = SuperMap.Plot.PlottingUtil.distance(awPoints[0], awPoints[awptCount - 1]);
            var sidepoint = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(disJWPts*scaleValue, awPoints[0], centerPtBottom);

            arrowTailPts.push(awPoints[awptCount-1]);
            arrowTailPts.push(sidepoint.pntLeft);
            arrowTailPts.push(awPoints[0]);
        }
            break;
        default:
            break;
    }
    return arrowTailPts;
};

SuperMap.Plot.ArrowToolKit.OperateCtrlPts = function (ctrlPts) {
    //处理后控制点
    var OperatePts = SuperMap.Plot.PlottingUtil.clonePoints(ctrlPts);
    var count = OperatePts.length;

    //三个点时，构造成四个点，添加的点为三点构成三角形的中点
    if(count == 3){
        var dCenterX = ((OperatePts[0].x + OperatePts[1].x)/2+ OperatePts[2].x)/2;
        var dCenterY = ((OperatePts[0].y + OperatePts[1].y)/2+ OperatePts[2].y)/2;
        var ptCenter = new SuperMap.Geometry.Point(dCenterX,dCenterY);
        var ptTemp = OperatePts[2].clone();
        OperatePts[2] = ptCenter;
        OperatePts.push(ptTemp);
    }
    return OperatePts;
};

SuperMap.Plot.ArrowToolKit.generateMultiBezier = function (OpectrlPoints, ctrlPntCount, scaleValues, ArrowBodyLen) {
    var ArrowTouLen = 0, leftBodyPts = [], rightBodyPts = [];

    //生成箭身中轴线骨架点、左右两箭身骨架点、两箭身骨架点的左右控制点
    var ArrowBodyLeftPts = [], ArrowBodyRightPts = [];//左右箭身骨架点
    var ArrowBodyLeftPtsLeftCtrlPts = [], ArrowBodyLeftPtsRightCtrlPts = [];//左箭身个拐点的左右控制点
    var ArrowBodyRightPtsLeftCtrlPts = [], ArrowBodyRightPtsRightCtrlPts = [];//右箭身个拐点的左右控制点

    //对比例点进行读取
    var ArrowTouLenDiviedByArrowBodyLen = scaleValues[0];
    var ArrowJingWidDiviedByArrowTouLen = scaleValues[1];
    var ArrowErWidDividedByArrowTouLen = scaleValues[2];
    var ArrowErLenDividedByArrowTouLen = scaleValues[3];

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
            +(sidepoints.pntLeft.y-sidepoints.pntRight.y)*(sidepoints.pntLeft.y-sidepoints.pntRight.y) ) * SuperMap.Plot.ArrowToolKit.ConstValue.sv_AtWidthDivAwWidth;
    ArrowTouLen = ArrowTouWid*SuperMap.Plot.ArrowToolKit.ConstValue.sv_AtLenDivAtWidth;	     //箭头长
    var ArrowJingWid = ArrowTouLen*ArrowJingWidDiviedByArrowTouLen;     //半边箭颈宽
    if(!SuperMap.Plot.PlottingUtil.equalFuzzy(ArrowTouLenDiviedByArrowBodyLen,0)){
        ArrowTouLen = ArrowBodyLen*ArrowTouLenDiviedByArrowBodyLen;
        ArrowJingWid=ArrowTouLen*ArrowJingWidDiviedByArrowTouLen;
    }

    var l1 = SuperMap.Plot.PlottingUtil.distance(OpectrlPoints[ctrlPntCount],OpectrlPoints[ctrlPntCount-1]);
    var l2 = ArrowTouLen*2;
    if (l1 < l2) {
        ArrowTouLen = l1/2;                  //改变大小
        ArrowJingWid = ArrowTouLen*ArrowJingWidDiviedByArrowTouLen;
    }

    //顺延顶点
    OpectrlPoints.push(OpectrlPoints[ctrlPntCount]);

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
        gd_w[i] = ArrowJingWid+(ArrowTouWid-ArrowJingWid)*Math.pow((Len1-Len2)/Len1,SuperMap.Plot.ArrowToolKit.ConstValue.sv_AtScaleParameter);		//半边拐点宽
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
    var dLen = Math.sqrt(1.0*(OpectrlPoints[ctrlPntCount].x-snxy.x)*(OpectrlPoints[ctrlPntCount].x-snxy.x)
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
            ArrowBodyLeftPtsRightCtrlPts[1] =  new SuperMap.Geometry.Point(snxy.x, snxy.y);
            SuperMap.Plot.PlottingUtil.GetTrapezoidPoints(0.5, ArrowBodyRightPts[1], ArrowBodyRightPts[2],ArrowBodyRightPtsLeftCtrlPts[2], snxy);
            ArrowBodyRightPtsRightCtrlPts[1] =  new SuperMap.Geometry.Point(snxy.x, snxy.y);
        }
        if(i == ctrlPntCount -1){
            //---------当在箭颈时，求控制点(强行顺箭头方向)----------
            l1 = SuperMap.Plot.PlottingUtil.distance(ArrowBodyLeftPts[ctrlPntCount],ArrowBodyLeftPts[ctrlPntCount-1]);
            l2 = l1/3.0;
            xy0 = SuperMap.Plot.PlottingUtil.getExcentrePointOnSegmentByScale(l2, OpectrlPoints[ctrlPntCount], OpectrlPoints[ctrlPntCount+1])
            xy0.x += (ArrowBodyLeftPts[ctrlPntCount].x - OpectrlPoints[ctrlPntCount].x);
            xy0.y += (ArrowBodyLeftPts[ctrlPntCount].y - OpectrlPoints[ctrlPntCount].y);
            l1 = ArrowTouWid-ArrowJingWid;
            l2 = l1*Math.pow(l2/Len1, SuperMap.Plot.ArrowToolKit.ConstValue.sv_AtScaleParameter);
            dxy = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(l2, ArrowBodyLeftPts[ctrlPntCount], xy0);
            ArrowBodyLeftPtsLeftCtrlPts[ctrlPntCount] = new SuperMap.Geometry.Point(dxy.pntLeft.x,dxy.pntLeft.y);

            l1 = SuperMap.Plot.PlottingUtil.distance(ArrowBodyRightPts[ctrlPntCount],ArrowBodyRightPts[ctrlPntCount-1]);
            l2 = l1/3.0;
            xy0 = SuperMap.Plot.PlottingUtil.getExcentrePointOnSegmentByScale(l2, OpectrlPoints[ctrlPntCount], OpectrlPoints[ctrlPntCount+1]);
            xy0.x += (ArrowBodyRightPts[ctrlPntCount].x - OpectrlPoints[ctrlPntCount].x);
            xy0.y += (ArrowBodyRightPts[ctrlPntCount].y - OpectrlPoints[ctrlPntCount].y);
            l1 = ArrowTouWid-ArrowJingWid;
            l2 = l1*Math.pow(l2/Len1, SuperMap.Plot.ArrowToolKit.ConstValue.sv_AtScaleParameter);
            dxy = SuperMap.Plot.PlottingUtil.getSidePointsOfLine(l2, ArrowBodyRightPts[ctrlPntCount], xy0);
            ArrowBodyRightPtsLeftCtrlPts[ctrlPntCount] = new SuperMap.Geometry.Point(dxy.pntRight.x,dxy.pntRight.y);
        }
    }
    leftBodyPts = SuperMap.Plot.ArrowToolKit.genArrowBody(ctrlPntCount, ArrowBodyLeftPts, ArrowBodyLeftPtsLeftCtrlPts, ArrowBodyLeftPtsRightCtrlPts);
    rightBodyPts =  SuperMap.Plot.ArrowToolKit.genArrowBody(ctrlPntCount, ArrowBodyRightPts, ArrowBodyRightPtsLeftCtrlPts, ArrowBodyRightPtsRightCtrlPts);

    return {arrowTouLen: ArrowTouLen, leftBodyPts: leftBodyPts, rightBodyPts: rightBodyPts};
};

SuperMap.Plot.ArrowToolKit.genArrowBody = function (ptsCount, arrowBodyPts, leftCtrlPts, rightCtrlPts) {
    var arrowBodyPath = new SuperMap.Plot.Path2D();
    //箭身骨架点数不够2个就不生成箭身曲线
    if ( ptsCount< 2 ){
        return;
    }
    //用Bezier连成箭身
    arrowBodyPath.MoveTo(arrowBodyPts[1]);
    for(var i = 1; i <= ptsCount - 1; i++){
        arrowBodyPath.CubicTo(rightCtrlPts[i], leftCtrlPts[i+1], arrowBodyPts[i+1]);
    }

    var subPathPolygons = [];
    arrowBodyPath.ToSubPathPolygons(subPathPolygons);
    return subPathPolygons[0];
};
