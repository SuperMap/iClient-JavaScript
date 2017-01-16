/**
 * Class: SuperMap.Plot.PlottingUtil
 * 一些常用的函数。
 */
SuperMap.Plot.PlottingUtil = new SuperMap.Class({

    CLASS_NAME: "SuperMap.Plot.PlottingUtil"
});

/**
 * Function: SuperMap.Plot.PlottingUtil.trim
 * 去除左右两端空格。
 */
SuperMap.Plot.PlottingUtil.trim = function (str) {
    if(str === null){
        return "";
    }

    return str.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * Function: SuperMap.Plot.PlottingUtil.innerOutlineDir
 * 计算衬线方向。
 */
SuperMap.Plot.PlottingUtil.innerOutlineDir = function (controlPoints) {
    function vecRadian(v1, v2){
        function vecDir(v){
            var dirRad = Math.atan2(v.y, v.x);
            if(dirRad < 0){
                dirRad += 2*Math.PI;
            }

            return dirRad;
        }
        var dr = vecDir(v2) - vecDir(v1);
        if(dr < -Math.PI){
            dr += 2*Math.PI;
        }
        if(dr > Math.PI){
            dr -= 2*Math.PI;
        }

        return dr;
    }

    if(controlPoints.length < 3){
        return 1;
    }

    var dRadian = 0;
    var v1 = {x:0, y:0};
    var v2 = {x:0, y:0};
    for(var i = 2; i < controlPoints.length; i++){
        v2.x = controlPoints[i].x - controlPoints[i-1].x;
        v2.y = controlPoints[i].y - controlPoints[i-1].y;
        v1.x = controlPoints[i-1].x - controlPoints[i-2].x;
        v1.y = controlPoints[i-1].y - controlPoints[i-2].y;
        dRadian += vecRadian(v1, v2);
    }
    v2.x = controlPoints[1].x - controlPoints[0].x;
    v2.y = controlPoints[1].y - controlPoints[0].y;
    v1.x = controlPoints[0].x - controlPoints[controlPoints.length-1].x;
    v1.y = controlPoints[0].y - controlPoints[controlPoints.length-1].y;
    dRadian += vecRadian(v1, v2);

    if(dRadian >= 0){
        return -1;
    } else {
        return 1;
    }
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.generateUuid
 * 生成全局唯一标识符uuid。
 *
 * Returns:
 * {String} 返回全局唯一标识符uuid。
 */
SuperMap.Plot.PlottingUtil.generateUuid = function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for(var i = 0; i < 36; i++){
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.isNear
 * 判断浮点数是否近似等于某个值。
 *
 * Parameters:
 * num - {float} 浮点数。
 * tolerance - {float} 浮点数比较容限值
 *
 * Returns:
 * {Boolean} 返回是否近似等于某个值。
 */
SuperMap.Plot.PlottingUtil.isNear = function (num, tolerance) {
    if(!tolerance){
        tolerance = 0.0000001;
    }

    if(num < tolerance && num > -tolerance){
        return true;
    } else {
        return false;
    }
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.equalFuzzy
 * 判断两个浮点数是否近似相等。
 *
 * Parameters:
 * numA - {float} 浮点数。
 * numB - {float} 浮点数。
 * tolerance - {float} 浮点数比较容限值
 *
 * Returns:
 * {Boolean} 返回是否近似相等。
 */
SuperMap.Plot.PlottingUtil.equalFuzzy = function (numA, numB, tolerance) {
    if(!tolerance){
        tolerance = 0.0000001;
    }
    return Math.abs(numA-numB) <= tolerance ;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.intersectLines
 * 求两条直线之间的交点,重叠认为是平行的
 *
 * Parameters:
 * pntStart1 - {<SuperMap.Geometry.Point>} 一条直线起点。
 * pntEnd1 - {<SuperMap.Geometry.Point>} 一条直线终点。
 * pntStart2 - {<SuperMap.Geometry.Point>} 另一条直线起点。
 * pntEnd2 - {<SuperMap.Geometry.Point>} 另一条直线终点。
 *
 * Returns:
 * {Object} 返回是否相交(isIntersectLines)及相交点(intersectPoint)。
 */
SuperMap.Plot.PlottingUtil.intersectLines = function (pntStart1, pntEnd1, pntStart2, pntEnd2) {
    var returnValue = {};
    returnValue.isIntersectLines = false;

    if ((pntStart1.x === pntEnd1.x && pntStart1.y === pntEnd1.y) || (pntStart2.x === pntEnd2.x && pntStart2.y === pntEnd2.y)) {
        return returnValue;
    }

    var dOffsetX1  = pntEnd1.x - pntStart1.x;
    var dOffsetY1  = pntEnd1.y - pntStart1.y;
    var dOffsetX2  = pntEnd2.x - pntStart2.x;
    var dOffsetY2  = pntEnd2.y - pntStart2.y;

    var delt = dOffsetX1 * dOffsetY2 - dOffsetX2 * dOffsetY1;
    if (SuperMap.Plot.PlottingUtil.isNear(delt)) { // 平行
        return returnValue;
    }

    var t2 = (dOffsetX1 * (pntStart1.y-pntStart2.y) - dOffsetY1 * (pntStart1.x-pntStart2.x))/delt;
    var pntResult = new SuperMap.Geometry.Point();
    pntResult.x = t2*dOffsetX2 + pntStart2.x;
    pntResult.y = t2*dOffsetY2 + pntStart2.y;
    returnValue.isIntersectLines = true;
    returnValue.intersectPoint = pntResult;
    return returnValue;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.clonePoints
 * 克隆点数组。
 *
 * Parameters:
 * cp - {Array(<SuperMap.Geometry.Point>)} 要克隆的点数组。
 *
 * Returns:
 * {Array(<SuperMap.Geometry.Point>)} 返回克隆后的点数组。
 */
SuperMap.Plot.PlottingUtil.clonePoints = function (cp) {
    var controlPoints = [];

    if(undefined === cp || null === cp){
        return controlPoints;
    }

    if(!SuperMap.Util.isArray(cp)){
        cp = [cp];
    }

    if(cp && cp !== null){
        for (var i = 0; i < cp.length; i++) {
            if(undefined === cp[i] || null === cp[i]){
                continue;
            }
            
            controlPoints.push(cp[i].clone());
        }
    }

    return controlPoints;
};

/**
 * Method: getTextCount
 * 获取text中的字符个数。
 *
 * Parameters:
 * text - {String} 字符串。
 *
 * Returns:
 * {Integer} 字符个数统计结果，中文字符为1个数，英文字符为0.5个数。
 */
SuperMap.Plot.PlottingUtil.getTextCount = function (text) {
    var cnCount = 0;
    var enCount = 0;

    for (var i = 0; i < text.length; i++) {
        if (text.charCodeAt(i) > 255) { //遍历判断字符串中每个字符的Unicode码,大于255则为中文
            cnCount++;
        }
        else {
            enCount++;
        }
    }

    return cnCount + enCount / 2;
},

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.toJSON
 * 将对象转换成 JSON 字符串。
 *
 * Parameters:
 * obj - {Object} 要转换成 JSON 的 Object 对象。
 *
 * Returns:
 * {String} 返回转换后的 JSON 对象。
 */
SuperMap.Plot.PlottingUtil.toJSON = function (obj) {
    var objInn = obj;
    if (objInn == null) {
        return null;
    }
    switch (objInn.constructor) {
        case String:
            //s = "'" + str.replace(/(["\\])/g, "\\$1") + "'";   string含有单引号出错
            objInn = '"' + objInn.replace(/(["\\])/g, '\\$1') + '"';
            objInn= objInn.replace(/\n/g,"\\n");
            objInn= objInn.replace(/\r/g,"\\r");
            objInn= objInn.replace("<", "&lt;");
            objInn= objInn.replace(">", "&gt;");
            objInn= objInn.replace(/%/g, "%2525");
            objInn= objInn.replace(/&/g, "%26");
            return objInn;
        case Array:
            var arr = [];
            for(var i=0,len=objInn.length;i<len;i++) {
                arr.push(SuperMap.Plot.PlottingUtil.toJSON(objInn[i]));
            }
            return "[" + arr.join(",") + "]";
        case Number:
            return isFinite(objInn) ? String(objInn) : null;
        case Boolean:
            return String(objInn);
        case Date:
            var dateStr = "{" + "'__type':\"System.DateTime\"," +
                "'Year':" + objInn.getFullYear() + "," +
                "'Month':" + (objInn.getMonth() + 1) + "," +
                "'Day':" + objInn.getDate() + "," +
                "'Hour':" + objInn.getHours() + "," +
                "'Minute':" + objInn.getMinutes() + "," +
                "'Second':" + objInn.getSeconds() + "," +
                "'Millisecond':" + objInn.getMilliseconds() + "," +
                "'TimezoneOffset':" + objInn.getTimezoneOffset() + "}";
            return dateStr;
        default:
            if (objInn["toJSON"] != null && typeof objInn["toJSON"] === "function") {
                return objInn.toJSON();
            }
            if (typeof objInn === "object") {
                if (objInn.length) {
                    var arr = [];
                    for(var i=0,len=objInn.length;i<len;i++)
                        arr.push(SuperMap.Plot.PlottingUtil.toJSON(objInn[i]));
                    return "[" + arr.join(",") + "]";
                }
                var arr = [];
                for (var attr in objInn) {
                    //为解决SuperMap.Geometry类型头json时堆栈溢出的问题，attr == "parent"时不进行json转换
                    if (typeof objInn[attr] !== "function" && attr !== "CLASS_NAME" && attr !== "parent") {
                        arr.push("\"" + attr + "\":" + SuperMap.Plot.PlottingUtil.toJSON(objInn[attr]));
                    }
                }

                if (arr.length > 0) {
                    return "{" + arr.join(",") + "}";
                } else {
                    return "{}";
                }
            }
            return objInn.toString();
    }
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.isRight
 * 判断点是否在线段的右边。
 *
 * Parameters:
 * pntTest - {<SuperMap.Geometry.Point>} 要判断的点。
 * pntStart - {<SuperMap.Geometry.Point>} 线段起点。
 * pntEnd - {<SuperMap.Geometry.Point>} 线段终点。
 *
 * Returns:
 * {Integer} 在右边返回true。
 */
SuperMap.Plot.PlottingUtil.isRight = function(pntTest, pntStart, pntEnd) {
    var pntFrom1 = pntStart;
    var pntTo1 = pntEnd;
    var pntFrom2 = pntStart;
    var pntTo2 = pntTest;

    //矢量叉乘 < 0
    return ((pntTo1.x-pntFrom1.x)*(pntTo2.y-pntFrom2.y) - (pntTo2.x-pntFrom2.x)*(pntTo1.y-pntFrom1.y)) < 0;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.radian
 * 计算两点的弧度（和正东方向的逆时针夹角）。
 *
 * Parameters:
 * pntFrom - {<SuperMap.Geometry.Point>} 起点。
 * pntTo - {<SuperMap.Geometry.Point>} 终点。
 *
 * Returns:
 * {Integer} 返回字符串长度。
 */
SuperMap.Plot.PlottingUtil.radian = function(pntFrom, pntTo) {
    var dAngle = 0;
    var dDistx = pntTo.x - pntFrom.x;
    var dDisty = pntTo.y - pntFrom.y;
    dAngle = Math.atan2(dDisty, dDistx);
    if(dAngle < 0){
        dAngle += 2 * Math.PI;
    }

    return dAngle;

};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.findBisectorPoint
 * 计算二等分点。
 *
 * Parameters:
 * pnt1 - {<SuperMap.Geometry.Point>} 起点。
 * pntJoint - {<SuperMap.Geometry.Point>} 连接点。
 * pnt2 - {<SuperMap.Geometry.Point>} 终点。
 * dDistance - {float} 距离。
 *
 * Returns:
 * {Integer} 返回字符串长度。
 */
SuperMap.Plot.PlottingUtil.findBisectorPoint = function(pnt1, pntJoint, pnt2, dDistance) {
    var dRadian1 = SuperMap.Plot.PlottingUtil.radian(pntJoint, pnt1);
    var dRadian2 = SuperMap.Plot.PlottingUtil.radian(pntJoint, pnt2);
    var dRadian = (dRadian1 + dRadian2) / 2.0;

    var dRadio = Math.cos(dRadian - dRadian1 + Math.PI / 2);
    var dDisOnBisector = dDistance;
    if(!SuperMap.Plot.PlottingUtil.isNear(dRadio, 0.15)){
        dDisOnBisector = dDistance / dRadio;
    }

    var pntResultX = pntJoint.x + dDisOnBisector * Math.cos(dRadian);
    var pntResultY = pntJoint.y + dDisOnBisector * Math.sin(dRadian);

    return new SuperMap.Geometry.Point(pntResultX, pntResultY);
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.findPoint
 * 在直线(pntStart, pntEnd)绕pntStart逆时针旋转dAngle度所成的直线上，到pntStart的距离为dDistance的点。
 *
 * Parameters:
 * pntStart - {<SuperMap.Geometry.Point>} 直线起点。
 * pntEnd - {<SuperMap.Geometry.Point>} 直线终点。
 * dDistance - {Float} 和pntStart的距离。
 * dAngle - {Float} 直线绕pntStart的旋转角度。
 *
 * Returns:
 * {<SuperMap.Geometry.Point>}
 */
SuperMap.Plot.PlottingUtil.findPoint = function(pntStart, pntEnd, dDistance, dAngle) {
    if(pntStart === pntEnd || Math.abs(dDistance) < 0.00000001){
        return pntStart;
    }

    var dRadian = SuperMap.Plot.PlottingUtil.radian(pntStart, pntEnd) + dAngle * Math.PI /180;

    var pntResultX = pntStart.x + dDistance * Math.cos(dRadian);
    var pntResultY = pntStart.y + dDistance * Math.sin(dRadian);

    return new SuperMap.Geometry.Point(pntResultX, pntResultY);
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.isSameQuadrant
 * 判断两条线段是否同向。TowardNode_AFRoute矢量方向在同一象限内
 *
 * Parameters:
 * pntStart1 - {<SuperMap.Geometry.Point>} 线段起点。
 * pntEnd1 - {<SuperMap.Geometry.Point>} 线段终点。
 * pntStart2 - {<SuperMap.Geometry.Point>} 另一条线段起点。
 * pntEnd2 - {<SuperMap.Geometry.Point>} 另一条线段终点。
 *
 * Returns:
 * {Boolean} 是否同向
 */
SuperMap.Plot.PlottingUtil.isSameQuadrant = function(pntStart1, pntEnd1, pntStart2, pntEnd2) {
    var dDictionX = (pntEnd1.x - pntStart1.x) * (pntEnd2.x - pntStart2.x);
    var dDictionY = (pntEnd1.y - pntStart1.y) * (pntEnd2.y - pntStart2.y);

    if(Math.abs(dDictionX) < 0.00000001 && Math.abs(dDictionY) < 0.00000001){
        return false; //垂直情况
    }

    if((dDictionX > 0 || Math.abs(dDictionX) < 0.00000001) && (dDictionY > 0 || Math.abs(dDictionY) < 0.00000001)){
        return true;
    }

    return false;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.isCross
 * 判断线段A是否跨越线段B
 *
 * Parameters:
 * pntStart1 - {<SuperMap.Geometry.Point>} 线段起点。
 * pntEnd1 - {<SuperMap.Geometry.Point>} 线段终点。
 * pntStart2 - {<SuperMap.Geometry.Point>} 另一条线段起点。
 * pntEnd2 - {<SuperMap.Geometry.Point>} 另一条线段终点。
 *
 * Returns:
 * {Boolean} 是否跨越
 */
SuperMap.Plot.PlottingUtil.isCross = function(pntStart1, pntEnd1, pntStart2, pntEnd2) {
    var pntIntersect = new SuperMap.Geometry.Point();

    if(SuperMap.Plot.PlottingUtil.intersectLineSegs(pntStart1, pntEnd1, pntStart2, pntEnd2, pntIntersect)){
        if(pntIntersect != pntStart1 && pntIntersect !== pntEnd1 && pntIntersect !== pntStart2 && pntIntersect != pntEnd2){
            return true;
        }
    }

    return false;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.intersectLineSegs
 * 求解线段和线段的交点，重叠或者平行返回false
 *
 * Parameters:
 * pntStart1 - {<SuperMap.Geometry.Point>} 线段起点。
 * pntEnd1 - {<SuperMap.Geometry.Point>} 线段终点。
 * pntStart2 - {<SuperMap.Geometry.Point>} 另一条线段起点。
 * pntEnd2 - {<SuperMap.Geometry.Point>} 另一条线段终点。
 *
 * Returns:
 * {Boolean} 平行返回false
 */
SuperMap.Plot.PlottingUtil.intersectLineSegs = function(pntStart1, pntEnd1, pntStart2, pntEnd2, pntResult) {
    if(pntStart1 === pntEnd1 || pntStart2 === pntEnd2){
        return false;
    }

    var dToler = 1e-10;

    var dmax = 0;
    var dmin = 0;
    dmax = (pntStart1.x > pntEnd1.x ? pntStart1.x : pntEnd1.x);
    dmin = (pntStart1.x < pntEnd1.x ? pntStart1.x : pntEnd1.x);
    if(((pntStart2.x - dmax) > dToler && (pntEnd2.x - dmax) > dToler) || ((pntStart2.x - dmin) < (-dToler) && (pntEnd2.x - dmin) < (-dToler))){
        return false;
    }

    dmax = (pntStart1.y > pntEnd1.y ? pntStart1.y : pntEnd1.y);
    dmin = (pntStart1.y < pntEnd1.y ? pntStart1.y : pntEnd1.y);
    if(((pntStart2.y - dmax) > dToler && (pntEnd2.y - dmax) > dToler) || ((pntStart2.y - dmin) < (-dToler) && (pntEnd2.y - dmin) < (-dToler))){
        return false;
    }

    var dOffsetX1 = pntEnd1.x - pntStart1.x;
    var dOffsetY1 = pntEnd1.y - pntStart1.y;
    var dOffsetX2 = pntEnd2.x - pntStart2.x;
    var dOffsetY2 = pntEnd2.y - pntStart2.y;
    var dOffsetX12 = pntStart1.x - pntStart2.x;
    var dOffsetY12 = pntStart1.y - pntStart2.y;

    var delt = dOffsetX1 * dOffsetY2 - dOffsetX2 * dOffsetY1;
    var deltB = delt;
    if(Math.abs(dOffsetX1) > 0.000000001 && Math.abs(dOffsetX2) > 0.000000001){
        deltB /= (dOffsetX1*dOffsetX2);
    }

    if(Math.abs(deltB) < 0.000000001){
        if(pntStart1 === pntStart2){
            pntResult.x = pntStart1.x;
            pntResult.y = pntStart1.y;
            return !SuperMap.Plot.PlottingUtil.isSameQuadrant(pntStart1, pntEnd1, pntStart2, pntEnd2);
        } else if(pntEnd1 === pntEnd2){
            pntResult.x = pntEnd1.x;
            pntResult.y = pntEnd1.y;
            return !SuperMap.Plot.PlottingUtil.isSameQuadrant(pntStart1, pntEnd1, pntStart2, pntEnd2);
        } else if(pntStart1 === pntEnd2){
            pntResult.x = pntStart1.x;
            pntResult.y = pntStart1.y;
            return SuperMap.Plot.PlottingUtil.isSameQuadrant(pntStart1, pntEnd1, pntStart2, pntEnd2);
        } else if(pntEnd1 === pntStart2){
            pntResult.x = pntEnd1.x;
            pntResult.y = pntEnd1.y;
            return SuperMap.Plot.PlottingUtil.isSameQuadrant(pntStart1, pntEnd1, pntStart2, pntEnd2);
        }

        return false;
    }

    var t0 = (dOffsetX1*dOffsetY12 - dOffsetY1*dOffsetX12) / delt;
    var t1 = (dOffsetX2*dOffsetY12 - dOffsetY2*dOffsetX12) / delt;

    if((t0 < 0) && (Math.abs(t0*dOffsetX2) > dToler || Math.abs(t0*dOffsetY2) > dToler)){
        return false;
    }
    if((t0 > 1.0) && ((Math.abs((t0-1)*dOffsetX2)>dToler)||(Math.abs((t0-1)*dOffsetY2)>dToler)))
    {
        return false;
    }
    if((t1 < 0) && ((Math.abs(t1*dOffsetX1)>dToler)||(Math.abs(t1*dOffsetY1)>dToler)))
    {
        return false;
    }
    if((t1 > 1.0) && ((Math.abs((t1-1)*dOffsetX1)>dToler)||(Math.abs((t1-1)*dOffsetY1)>dToler)))
    {
        return false;
    }

    if (Math.abs(t0) < 0.00000001)
    {
        pntResult.x = pntStart2.x;
        pntResult.y = pntStart2.y;
        return true;
    }
    else if (Math.abs(t0-1) < 0.00000001)
    {
        pntResult.x = pntEnd2.x;
        pntResult.y = pntEnd2.y;
        return true;
    }
    if (Math.abs(t1) < 0.00000001)
    {
        pntResult.x = pntStart1.x;
        pntResult.y = pntStart1.y;
        return true;
    }
    else if (Math.abs(t1-1) < 0.00000001)
    {
        pntResult.x = pntEnd1.x;
        pntResult.y = pntEnd1.y;
        return true;
    }

    if ((t0 < 0) && ((Math.abs(t0*dOffsetX2)>dToler)||(Math.abs(t0*dOffsetY2)>dToler)))
    {
        return false;
    }
    if ((t0 > 1.0) && ((Math.abs((t0-1)*dOffsetX2)>dToler)||(Math.abs((t0-1)*dOffsetY2)>dToler)))
    {
        return false;
    }
    if ((t1 < 0) && ((Math.abs(t1*dOffsetX1)>dToler)||(Math.abs(t1*dOffsetY1)>dToler)))
    {
        return false;
    }
    if ((t1 > 1.0) && ((Math.abs((t1-1)*dOffsetX1)>dToler)||(Math.abs((t1-1)*dOffsetY1)>dToler)))
    {
        return false;
    }

    pntResult.x = t0*dOffsetX2 + pntStart2.x;
    pntResult.y = t0*dOffsetY2 + pntStart2.y;

    return true;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.parallel
 * 求解折线的平行线。
 *
 * Parameters:
 * pntSrc - {Array(<SuperMap.Geometry.Point>)} 折线数组。
 * dDistance - {Float} 平行线之间距离。
 *
 * Returns:
 * {Array(<SuperMap.Geometry.Point>)} 返回折线。
 */
SuperMap.Plot.PlottingUtil.parallel = function(pntSrc, dDistance) {
    var pntResult = [];

    if(!pntSrc || pntSrc === null || pntSrc.length < 2){
        return pntResult;
    }

    var bClose = false;
    if(pntSrc.length > 3 && pntSrc[0].x === pntSrc[pntSrc.length-1].x && pntSrc[0].y === pntSrc[pntSrc.length-1].y){
        bClose = true;
    }

    if(bClose){
        pntResult[0] = SuperMap.Plot.PlottingUtil.findBisectorPoint(pntSrc[pntSrc.length-2], pntSrc[0], pntSrc[1], dDistance);
        pntResult[pntSrc.length-1] = pntResult[0];
    } else {
        pntResult[0] = SuperMap.Plot.PlottingUtil.findPoint(pntSrc[0], pntSrc[1], dDistance, 90);
        pntResult[pntSrc.length-1] = SuperMap.Plot.PlottingUtil.findPoint(pntSrc[pntSrc.length-1], pntSrc[pntSrc.length-2], -dDistance, 90);
    }

    var pnt0 = pntSrc[0];
    var pnt1 = pntSrc[1];
    var pnt2 = pntSrc[1];
    for(var i = 1; i < pntSrc.length-1; i++){
        pnt1 = pntSrc[i];
        if(pntSrc[i] !== pntSrc[i-1]){
            pnt0 = pntSrc[i-1];
        }

        if(pntSrc[i] !== pntSrc[i+1]){
            pnt2 = pntSrc[i+1];
            var pnt = SuperMap.Plot.PlottingUtil.findBisectorPoint(pnt0, pnt1, pnt2, dDistance);
            if(SuperMap.Plot.PlottingUtil.isCross(pnt0, pntResult[i-1], pnt1, pnt)){
                pnt = pntResult[i-1];
            }
            pntResult[i] = pnt;
        }
        else {
            var nFrom = i;
            while (nFrom < nPntCount - 1 )
            {
                if(pSrc[nFrom] !== pSrc[nFrom+1])
                {
                    pnt2 = pSrc[nFrom+1];
                    break;
                }
                nFrom ++;
            }
            if(nFrom < nPntCount-1)
            {
                var pnt = FindBisectorPoint(pnt0,pnt1,pnt2,dDistance);
                if (SuperMap.Plot.PlottingUtil.isCross(pnt0,pntResults[i-1],pnt1,pnt))
                {
                    pnt = pntResults[i-1];
                }

                while ( i < nFrom )
                {
                    pntResults[i] = pnt;
                    i++;
                }
                i = nFrom-1;
            }
        }
    }

    return pntResult;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.distance
 * 求解两点间距离
 *
 * Parameters:
 * pt1 - {<SuperMap.Geometry.Point>} 第一点
 * pt2 - {<SuperMap.Geometry.Point>} 另一点
 *
 * Returns:
 * {Float} 返回pt1和pt2两点间距离。
 */
SuperMap.Plot.PlottingUtil.distance = function(pt1, pt2){
    if(pt1 instanceof SuperMap.LonLat && pt2 instanceof SuperMap.LonLat){
        return Math.sqrt((pt1.lon-pt2.lon)*(pt1.lon-pt2.lon)+(pt1.lat-pt2.lat)*(pt1.lat-pt2.lat));
    } else {
        return Math.sqrt((pt1.x-pt2.x)*(pt1.x-pt2.x)+(pt1.y-pt2.y)*(pt1.y-pt2.y));
    }
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.projectPoint
 * 求pt在线段(ptStart, ptEnd)上的垂足
 *
 * Parameters:
 * pt - {<SuperMap.Geometry.Point>} pt
 * ptStart - {<SuperMap.Geometry.Point>} 线段起点
 * ptEnd - {<SuperMap.Geometry.Point>} 线段终点
 *
 * Returns:
 * {<SuperMap.Geometry.Point>} 返回垂足点。
 */
SuperMap.Plot.PlottingUtil.projectPoint = function(pt, ptStart, ptEnd){
    if(ptStart === ptEnd){
        return ptStart;
    }

    var pntProject = new SuperMap.Geometry.Point();

    var dDaltaX = ptEnd.x - ptStart.x;
    var dDaltaY = ptStart.y - ptEnd.y;

    var dDaltaX2 = dDaltaX * dDaltaX;
    var dDaltaY2 = dDaltaY * dDaltaY;
    var dDeltaXY = dDaltaX * dDaltaY;

    var dLineSectDist = dDaltaX * dDaltaX + dDaltaY * dDaltaY;

    pntProject.x = (dDeltaXY * (ptStart.y-pt.y) + ptStart.x * dDaltaY2 + pt.x * dDaltaX2) / dLineSectDist;
    pntProject.y = (dDeltaXY * (ptStart.x-pt.x) + ptStart.y * dDaltaX2 + pt.y * dDaltaY2) / dLineSectDist;

    return pntProject;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.pointToLineDis
 * 求pt到线段(ptStart, ptEnd)上的距离
 *
 * Parameters:
 * pt - {<SuperMap.Geometry.Point>} pt
 * ptStart - {<SuperMap.Geometry.Point>} 线段起点
 * ptEnd - {<SuperMap.Geometry.Point>} 线段终点
 *
 * Returns:
 * {<SuperMap.Geometry.Point>} 返回距离。
 */
SuperMap.Plot.PlottingUtil.pointToLineDis = function(pt, ptStart, ptEnd){

    var pntProject = SuperMap.Plot.PlottingUtil.projectPoint(pt,ptStart,ptEnd);
    return SuperMap.Plot.PlottingUtil.distance(pt,pntProject);
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.pointToPloyLineDis
 * 求pt到(ptStart, ptEnd)折线上的距离,如果垂足不在折线上，则返回点到线段两个端点距离的较小值
 *
 * Parameters:
 * pt - {<SuperMap.Geometry.Point>} pt
 * ptStart - {<SuperMap.Geometry.Point>} 线段起点
 * ptEnd - {<SuperMap.Geometry.Point>} 线段终点
 *
 * Returns:
 * {<SuperMap.Geometry.Point>} 返回距离。
 */
SuperMap.Plot.PlottingUtil.pointToPloyLineDis = function(pt, ptStart, ptEnd){

    if(ptStart === ptEnd)
    {
        return SuperMap.Plot.PlottingUtil.distance(pt,ptStart);
    }

    var da2 = (ptStart.x-pt.x)*(ptStart.x-pt.x) + (ptStart.y-pt.y)*(ptStart.y-pt.y) ;
    var db2 = (ptEnd.x-pt.x)*(ptEnd.x-pt.x) + (ptEnd.y-pt.y)*(ptEnd.y-pt.y) ;
    var dc2 = (ptStart.x-ptEnd.x)*(ptStart.x-ptEnd.x) + (ptStart.y-ptEnd.y)*(ptStart.y-ptEnd.y) ;

    var dtemp = (da2+dc2-db2)/(2*dc2);

    if(dtemp<0)
    {
        dtemp = 0.0;
    }
    else if(dtemp>1.0)
    {
        dtemp = 1.0;
    }

    var dx = (ptEnd.x - ptStart.x)*dtemp + ptStart.x;
    var dy = (ptEnd.y - ptStart.y)*dtemp + ptStart.y;

    var dDistance2  =  (dx-pt.x)*(dx-pt.x) + (dy-pt.y)*(dy-pt.y);
    var dDistance   =  Math.sqrt(dDistance2);
    return dDistance;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.isCounterClockwise
 * 判断三点是否逆时针排列
 *
 * Parameters:
 * pt1 - {<SuperMap.Geometry.Point>} pt1
 * pt2 - {<SuperMap.Geometry.Point>} pt2
 * pt3 - {<SuperMap.Geometry.Point>} pt3
 *
 * Returns:
 * {<SuperMap.Geometry.Point>} 逆时针排列返回true，否则返回false。
 */
SuperMap.Plot.PlottingUtil.isCounterClockwise = function(pt1, pt2, pt3){
    return (pt3.x-pt2.x)*(pt1.y-pt2.y) - (pt1.x-pt2.x)*(pt3.y-pt2.y) > 0;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.clearSamePts
 * 清除重复点
 *
 * Parameters:
 * pts - {Array(<SuperMap.Geometry.Point>)} 点数组
 *
 * Returns:
 * {Array(<SuperMap.Geometry.Point>)} 返回去重之后的数组
 */
SuperMap.Plot.PlottingUtil.clearSamePts = function(pts){
    var count = pts.length;
    for(var i = 0; i < (count - 1);) {
        if(SuperMap.Plot.PlottingUtil.equalFuzzy(pts[i].x, pts[i+1].x) && SuperMap.Plot.PlottingUtil.equalFuzzy(pts[i].y, pts[i+1].y)) {
            pts.splice(i, 1);
            count--;
        } else {
            i++;
        }
    }
    return pts;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.copyFeature
 * 拷贝标号
 *
 * Parameters:
 * feature - {<SuperMap.Feature.Vector>} 标号
 *
 * Returns:
 * {<SuperMap.Feature.Vector>} 返回拷贝后的标号
 */
SuperMap.Plot.PlottingUtil.copyFeature = function(feature){
    var copyFeature = null;

    if(feature !== null && feature.geometry && feature.geometry.controlPoints){
        var geo =  feature.geometry.clone();

        copyFeature = new SuperMap.Feature.Vector(geo);
    if(feature.style)
        copyFeature.style = SuperMap.Util.copyAttributes(copyFeature.style, feature.style);
        geo.feature = copyFeature;

        geo.calculateParts();
    }

    return copyFeature;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.transitionPoint
 * 坐标转换，逻辑坐标(单位是：mm)转地理坐标
 *
 * Parameters:
 * map - {<SuperMap.Map>}
 * point - {<SuperMap.Geometry.Point>} 要转换的点
 * location - 转换所需定位点,单位是：Pixel
 *
 * Returns:
 * {<SuperMap.Geometry.Point>} 返回地理坐标
 */
SuperMap.Plot.PlottingUtil.transitionPoint = function(map, point, location, options){
    var scale = 0.254;
    var inch = 96;
    if(options && options.scale){
        scale = options.scale;
    }
    if(options && options.inch){
        inch = options.inch;
    }

    var pixelpmm = inch / 254.0;

    // //扩大1000倍，提高计算精度
    // var px = scale*inch/10;
    //获取位置点的像素坐标
    var x = location.x + point.x * pixelpmm;
    var y = location.y - point.y * pixelpmm;

    var lonlat = map.getLonLatFromPixel(new SuperMap.Pixel(x, y));

    return new SuperMap.Geometry.Point(lonlat.lon,lonlat.lat);
},

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.colorRGBToString
 * 颜色从Object转到字符串
 *
 * Parameters:
 * colorData - {Object} 颜色
 *
 * Returns:
 * {String} 返回颜色字符串
 */
SuperMap.Plot.PlottingUtil.colorRGBToString = function(colorData){

    var hexStringR = colorData.red.toString(16);
    if(hexStringR.length < 2)
        hexStringR = "0" + hexStringR;

    var hexStringG = colorData.green.toString(16);
    if(hexStringG.length < 2)
        hexStringG = "0" + hexStringG;

    var hexStringB = colorData.blue.toString(16);
    if(hexStringB.length < 2)
        hexStringB = "0" + hexStringB;

    var hexStringColor = "#" + hexStringR + hexStringG + hexStringB;
    return hexStringColor;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.colorStringToRGB
 * 颜色从字符串转到Object
 *
 * Parameters:
 * colorData - {String} 颜色
 *
 * Returns:
 * {Object} 返回颜色对象
 */
SuperMap.Plot.PlottingUtil.colorStringToRGB = function(colorData){
    var color = {};

    var hexStringR = colorData.substring(1, 3);
    color.red = parseInt(hexStringR, 16);
    var hexStringG = colorData.substring(3, 5);
    color.green = parseInt(hexStringG, 16);
    var hexStringB = colorData.substring(5);
    color.blue = parseInt(hexStringB, 16);

    return color;
};

/**
 * Function:SuperMap.Plot.PlottingUtil.getBeizerCtrlPt
 * 根据位置点计算贝塞尔曲线的控制点
 * Parameters:
 * geoPts    位置点
 * Returns:
 * {Array(<SuperMap.Geometry.Point>)} 返回包含节点和控制点的用于构造贝塞尔曲线的点串
 */
SuperMap.Plot.PlottingUtil.getBeizerCtrlPt= function(geoPts){
    var allPoints = [];

    var nCount = geoPts.length;
    if (nCount < 3) {
        for (var i = 0; i != nCount; ++i)
            allPoints[i] = geoPts[i].clone();
    }
    else {

        var j = 0;

        for (var i = 0; i < (3 * nCount - 2); i = i + 3) {
            allPoints[i] = geoPts[j].clone();
            allPoints[i+1] = new SuperMap.Geometry.Point(0,0);
            allPoints[i+2] = new SuperMap.Geometry.Point(0,0);
            j++;
        }

        for (var i = 1; i < nCount - 1; i++) {
            //数学库特定算法
            SuperMap.Plot.PlottingUtil.GetTrianglePoints(8.0 , 3.0 , geoPts[i-1], geoPts[i], geoPts[i+1], allPoints[i*3 -1] ,allPoints[i*3+1]);
        }

        // 获取贝塞尔控制点左右点
        SuperMap.Plot.PlottingUtil.GetTrapezoidPoints(0.6, allPoints[0], allPoints[3], allPoints[2], allPoints[1]);
        SuperMap.Plot.PlottingUtil.GetTrapezoidPoints(0.6, allPoints[3 * nCount - 3], allPoints[3 * nCount - 6],
            allPoints[3 * nCount - 5], allPoints[3 * nCount - 4]);
        allPoints[nCount * 3 - 1] = allPoints[nCount * 3 - 2]=geoPts[nCount - 1].clone();
    }

    return allPoints;
};

/**
 * APIFunction:SuperMap.Plot.PlottingUtil.GenerateBeizerPointsWithCtrlPt
 * 根据位置点计算贝赛尔曲线
 * Parameters:
 * geoPts    位置点
 * Returns:
 * {Array(<SuperMap.Geometry.Point>)} 贝塞尔曲线拟合点
 */
SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt= function(geoPts) {
    var allPoints = SuperMap.Plot.PlottingUtil.getBeizerCtrlPt(geoPts);
    return  SuperMap.Plot.PlottingUtil.GenerateBeizerPointsWithCtrlPt(allPoints);
};

/**
 * APIFunction:SuperMap.Plot.PlottingUtil.GenerateBeizerPointsWithCtrlPt
 * 根据给出的节点求贝塞尔曲线的节点和控制点组成的点串计算贝塞尔曲线
 * Parameters:
 * allPoints    位置点和控制点
 * Returns:
 * {Array(<SuperMap.Geometry.Point>)} 贝塞尔曲线拟合点
 */
SuperMap.Plot.PlottingUtil.GenerateBeizerPointsWithCtrlPt= function(allPoints) {
    var nCount = allPoints.length;
    var pts =[];
    if (allPoints.length < 3) {
        for (var i = 0; i < nCount; i++){
            pts[i] = allPoints[i].clone();
        }
    }else {
        nCount /= 3;
        for (var  i=0; i< 3*nCount; i+=3)
        {
            if (i+4>=3*nCount)
            {
                break;
            }

            var x1 = allPoints[i].x;
            var y1 = allPoints[i].y;
            var x2 = allPoints[i+1].x;
            var y2 = allPoints[i+1].y;
            var x3 = allPoints[i+2].x;
            var y3 = allPoints[i+2].y;
            var x4 = allPoints[i+3].x;
            var y4 = allPoints[i+3].y;

            if(SuperMap.Plot.PlottingUtil.equalFuzzy(x1,x2, 1E-10) &&
                SuperMap.Plot.PlottingUtil.equalFuzzy(y1,y2, 1E-10) &&
                SuperMap.Plot.PlottingUtil.equalFuzzy(x3,x4, 1E-10) &&
                SuperMap.Plot.PlottingUtil.equalFuzzy(y3,y4, 1E-10))
            {
                pts.push(new SuperMap.Geometry.Point(x1,y1));
                pts.push(new SuperMap.Geometry.Point(x3,y3));
            }
            else
            {
                for(var t = 0.00000; t <= 1.0; t += 0.03125)
                {

                    var a,b,c,d;
                    var t2=t*t;
                    var t3=t2*t;
                    a=1-3*t+3*t2-t3;
                    b=3*(t-2*t2+t3);
                    c=3*(t2-t3);
                    d=t3;

                    var pt =new SuperMap.Geometry.Point(a*x1 + b*x2 + c*x3 + d*x4, a*y1 + b*y2 + c*y3 + d*y4);

                    pts.push(pt);
                }
            }
        }
    }

    return  pts;
};

SuperMap.Plot.PlottingUtil.ComputeBeizerPoints = function (bEdit, geoPts, scalevalues) {
    var dallDistance = SuperMap.Plot.PlottingUtil.polylineDistance(geoPts);
    var scalePts = [];
    var ctrlpts = [];
    var ptsarr = [];
    if(!bEdit){
        scalevalues = [];
        ctrlpts = SuperMap.Plot.PlottingUtil.getBeizerCtrlPt(geoPts);
        //根据控制点计算比例值
        //第一个点就2个比例值
        var ddisx = ctrlpts[1].x - ctrlpts[0].x;
        var ddisy = ctrlpts[1].y - ctrlpts[0].y;
        var dscalex = ddisx/dallDistance;
        var dscaley = ddisy/dallDistance;
        scalevalues.push(dscalex);
        scalevalues.push(dscaley);
        scalePts.push(ctrlpts[1]);

        for(var i = 1; i < geoPts.length - 1; i++)
        {
            var ddisx = ctrlpts[i*3-1].x - ctrlpts[i*3].x;
            var ddisy = ctrlpts[i*3-1].y - ctrlpts[i*3].y;
            var dscalex = ddisx/dallDistance;
            var dscaley = ddisy/dallDistance;
            scalevalues.push(dscalex);
            scalevalues.push(dscaley);
            scalePts.push(ctrlpts[i*3-1]);

            var ddisx2 = ctrlpts[i*3+1].x - ctrlpts[i*3].x;
            var ddisy2 = ctrlpts[i*3+1].y - ctrlpts[i*3].y;
            var dscalex2 = ddisx2/dallDistance;
            var dscaley2 = ddisy2/dallDistance;
            scalevalues.push(dscalex2);
            scalevalues.push(dscaley2);
            scalePts.push(ctrlpts[i*3+1]);
        }

        ddisx = ctrlpts[(geoPts.length-1)*3-1].x - ctrlpts[(geoPts.length-1)*3].x;
        ddisy = ctrlpts[(geoPts.length-1)*3-1].y - ctrlpts[(geoPts.length-1)*3].y;
        dscalex = ddisx/dallDistance;
        dscaley = ddisy/dallDistance;
        scalevalues.push(dscalex);
        scalevalues.push(dscaley);
        scalePts.push(ctrlpts[(geoPts.length-1)*3-1]);

        ptsarr = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsWithCtrlPt(ctrlpts);
    }
    else{
        ctrlpts.push(geoPts[0]);
        var dScalex = scalevalues[0];
        var dScaley = scalevalues[1];
        var dx = geoPts[0].x + dallDistance*dScalex;
        var dy = geoPts[0].y + dallDistance*dScaley;
        ctrlpts.push(new SuperMap.Geometry.Point(dx,dy));
        scalePts.push(new SuperMap.Geometry.Point(dx,dy));

        for(var i = 1; i < geoPts.length - 1; i++)
        {
            var dScalex = scalevalues[4*i-2];
            var dScaley = scalevalues[4*i-1];
            var dx = geoPts[i].x + dallDistance*dScalex;
            var dy = geoPts[i].y + dallDistance*dScaley;
            ctrlpts.push(new SuperMap.Geometry.Point(dx,dy));
            scalePts.push(new SuperMap.Geometry.Point(dx,dy));

            ctrlpts.push(new SuperMap.Geometry.Point(geoPts[i].x,geoPts[i].y));

            dScalex = scalevalues[4*i];
            dScaley = scalevalues[4*i+1];
            dx = geoPts[i].x + dallDistance*dScalex;
            dy = geoPts[i].y + dallDistance*dScaley;
            ctrlpts.push(new SuperMap.Geometry.Point(dx,dy));
            scalePts.push(new SuperMap.Geometry.Point(dx,dy));
        }

        var npos = geoPts.length - 1;

        dScalex = scalevalues[4*npos-2];
        dScaley = scalevalues[4*npos-1];
        dx = geoPts[npos].x + dallDistance*dScalex;
        dy = geoPts[npos].y + dallDistance*dScaley;
        ctrlpts.push(new SuperMap.Geometry.Point(dx,dy));
        scalePts.push(new SuperMap.Geometry.Point(dx,dy));
        ctrlpts.push(new SuperMap.Geometry.Point(geoPts[npos].x,geoPts[npos].y));
        ctrlpts.push(new SuperMap.Geometry.Point(geoPts[npos].x,geoPts[npos].y));
        ctrlpts.push(new SuperMap.Geometry.Point(geoPts[npos].x,geoPts[npos].y));

        ptsarr = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsWithCtrlPt(ctrlpts);
    }

    return {scalePoints:scalePts,scaleValues:scalevalues,beizerPoints:ptsarr};
};

/**
 *  APIFunction:SuperMap.Plot.PlottingUtil.GetTrianglePoints
 *  根据一个三角形，求过其中一个顶点，并且和底边平行的线段两个端点坐标,
 *  过点pt2，并且和线段【pt1-pt3】平行的线段的两个端点pt4、pt5
 *  Parameters:
 *  rate1    修正系数，值域为[0,10000],0为不修正
 *  rate2    为底边长与平行线长的比例(取3.0)
 *  pt1    三角形一个顶点
 *  pt2    三角形一个顶点
 *  pt3    三角形一个顶点
 *  pt4    传出参数，平行线段的一个端点
 *  pt5    传出参数，平行线段的另一个端点
 */
SuperMap.Plot.PlottingUtil.GetTrianglePoints= function(rate1, rate2, pt1, pt2, pt3, pt4,pt5)
{
    var x1 = pt1.x;
    var y1 = pt1.y;
    var x2 = pt2.x;
    var y2 = pt2.y;
    var x3 = pt3.x;
    var y3 = pt3.y;

    SuperMap.Plot.PlottingUtil.GetPointsByTriangle(rate1, rate2, x1, y1, x2, y2, x3, y3, pt4,pt5);

};

/**
 *  APIFunction:SuperMap.Plot.PlottingUtil.GetTrianglePoints
 *  根据一个三角形，求过其中一个顶点，并且和底边平行的线段两个端点坐标,
 *  过点pt2，并且和线段【pt1-pt3】平行的线段的两个端点pt4、pt5
 *  Parameters:
 *  rate1    修正系数，值域为[0,10000],0为不修正
 *  rate2    为底边长与平行线长的比例(取3.0)
 *  pram x1    三角形一个顶点的x坐标
 *  y1    三角形一个顶点的y坐标
 *  x2    三角形一个顶点的x坐标
 *  y2    三角形一个顶点的y坐标
 *  x3    三角形一个顶点的x坐标
 *  y3    三角形一个顶点的y坐标
 *  pt4   传出参数，平行线段的一个端点
 *  pt5   传出参数，平行线段的另一个端点
 */
SuperMap.Plot.PlottingUtil.GetPointsByTriangle= function(rate1, rate2, x1, y1, x2, y2, x3, y3, pt4,pt5)
{
    var x=x2+(x3-x1);				//平移矢量顶
    var y=y2+(y3-y1);
    var x0 = 0.0;
    var y0 = 0.0;
    if(x1==x3)
    {
        x0 = x1;
        y0 = y;
    }
    else
    {
        if(y1==y3)
        {
            x0 = x;
            y0 = y1;
        }
        else
        {
            var k = 1.0*(y3-y1)/(x3-x1);
            var b1 = y1-x1*k;
            var b2 = y+x/k;
            x0 = (b2-b1)/(k+1.0/k);
            y0 = k*x0+b1;
        }
    }

    var L3 = Math.sqrt(1.0*(x2- x)*(x2- x) + 1.0*(y2- y)*(y2- y));	//矢量长
    var L1 = Math.sqrt(1.0*(x1-x2)*(x1-x2) + 1.0*(y1-y2)*(y1-y2));  //左边长
    var L2 = Math.sqrt(1.0*(x2-x3)*(x2-x3) + 1.0*(y2-y3)*(y2-y3));  //右边长

    var rateTemp = 0.0;
    if(L1+L2)
    {
        rateTemp = 1.0 + (L2-L1)*rate1/(L2+L1);
    }
    else
    {
        rateTemp = 1;
    }

    x=x0 + (x-x0)*rateTemp;
    y=y0 + (y-y0)*rateTemp;
    if(L3 == 0.0)
    {
        L3 = 1;
    }

    pt4.x = (x2 + (x2-x)*L1/(rate2*L3));
    pt4.y = (y2 + (y2-y)*L1/(rate2*L3));
    pt5.x = (x2 + (x-x2)*L2/(rate2*L3));
    pt5.y = (y2 + (y-y2)*L2/(rate2*L3));
};

/**
 * APIFunction:SuperMap.Plot.PlottingUtil.GetTrapezoidPoints
 * 已知两点直线，一控制点，求另一对应控制点
 * 注：已知等腰梯形下底，上底一个端点，求上底另一个端点
 * pt4-->x---x  <-- pt3
 *  pt->?     \
 *     /       \
 * pt1/_________\ pt2
 * 首先利用等腰梯形性质，通过pt1,pt2,pt3求出pt4
 * 然后找pt1,pt4上一定比分点pt,pt=(pt4-pt1)*rate+pt1
 *  Parameters:
 *  rate  求出的控制点与直线的距离为另一控制点与直线距离的倍数 (0<=Date<=1.0)(1.0为不向下修正)
 *  pt1    直线1上的一个点的坐标
 *  pt2    直线1上另一个点的坐标
 *  pt3    直线2上的一个点的坐标
 *  pt     传出参数，直线2上所求的点的坐标
 */
SuperMap.Plot.PlottingUtil.GetTrapezoidPoints = function(rate, pt1, pt2,pt3,pt)
{
    var x1 = pt1.x;
    var y1 = pt1.y;
    var x2 = pt2.x;
    var y2 = pt2.y;
    var x3 = pt3.x;
    var y3 = pt3.y;
    return SuperMap.Plot.PlottingUtil.GetPointsByTrapezoid(rate, x1, y1, x2, y2, x3, y3, pt);

};

/**
 * APIFunction:SuperMap.Plot.PlottingUtil.GetPointsByTrapezoid
 * 已知两点直线，一控制点，求另一对应控制点
 * 注：已知等腰梯形下底，上底一个端点，求上底另一个端点
 * pt4-->x---x  <-- pt3
 *  pt->?     \
 *     /       \
 * pt1/_________\ pt2
 * 首先利用等腰梯形性质，通过pt1,pt2,pt3求出pt4
 * 然后找pt1,pt4上一定比分点pt,pt=(pt4-pt1)*rate+pt1
 *  Parameters:
 *  rate  求出的控制点与直线的距离为另一控制点与直线距离的倍数 (0<=Date<=1.0)(1.0为不向下修正)
 *  x1    直线1上的一个点的x坐标
 *  y1    直线1上的一个点的y坐标
 *  x2    直线1上另一个点的x坐标
 *  y2    直线1上另一个点的y坐标
 *  x3    直线2上的一个点的x坐标
 *  y3    直线2上的一个点的y坐标
 *  pt     传出参数，直线2上所求的点的坐标
 *
 */
SuperMap.Plot.PlottingUtil.GetPointsByTrapezoid=function(rate, x1, y1, x2, y2, x3, y3, pt)
{
    var xx = 0.0;
    var yy = 0.0;
    var x0 = 0.0;
    var y0 = 0.0;
     if (Math.abs(y1-y2)==0)
     {
         xx=x1+x2-x3;
         yy=y3;
     }
     else if (Math.abs(x1-x2)==0)
     {
         xx=x3;
         yy=y1+y2-y3;
     }
     else
     {
         var k=1.0*(y1-y2)/(x1-x2);
         var b1=(y2+y1)/2.0 + (x1+x2)/(2.0*k);
         var b2=y3-k*x3;
         xx=(b1-b2)/(k+1.0/k);
         yy = k*xx + b2;
         xx = 2.0*xx-x3;
         yy = 2.0*yy-y3;
     }

    var L1 =Math.sqrt(1.0*(x1-x2)*(x1-x2) + 1.0*(y1-y2)*(y1-y2));
    var L2 =Math.sqrt(1.0*(x1-xx)*(x1-xx) + 1.0*(y1-yy)*(y1-yy));
     if (L1 > 0)
     {
         x0 = x1 + (x2-x1)*L2/L1;
         y0 = y1 + (y2-y1)*L2/L1;
     }
     else
     {
         x0 = x1;
         y0 = y1;
     }

     pt.x = x0 + (xx-x0)*rate;
     pt.y = y0 + (yy-y0)*rate;

    return pt;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.PointIsOnPolyLine
 * 判断点是否在两点折线段上
 *
 * Parameters:
 * testPt - {<SuperMap.Geometry.Point>} 测试点
 * pt1    - {<SuperMap.Geometry.Point>} 折线段的第一个点
 * pt2    - {<SuperMap.Geometry.Point>} 折线段的第二个点
 *
 * Returns:
 * {Boolean} 如果在折线上则返回true，否则返回false
 */
SuperMap.Plot.PlottingUtil.PointIsOnPolyLine = function(testPt, pt1, pt2){

    //判断该点与折线段上的端点重合
    if((SuperMap.Plot.PlottingUtil.equalFuzzy(testPt.x, pt1.x) && SuperMap.Plot.PlottingUtil.equalFuzzy(testPt.y, pt1.y)) ||
        (SuperMap.Plot.PlottingUtil.equalFuzzy(testPt.x, pt2.x) && SuperMap.Plot.PlottingUtil.equalFuzzy(testPt.y, pt2.y))){
        return true;
    }

    var x1 = testPt.x - pt1.x;
    var y1 = testPt.y - pt1.y;
    var x2 = testPt.x - pt2.x;
    var y2 = testPt.y - pt2.y;

    var angle = (x1*x2+y1*y2)/(Math.sqrt(x1*x1+y1*y1)*Math.sqrt(x2*x2+y2*y2));

    if(SuperMap.Plot.PlottingUtil.equalFuzzy(angle, -1, 0.1)){
        return true;
    }

    return false;
};

/**
 * Function: SuperMap.Plot.PlottingUtil.PointIsOnPolyLines
 * 判断点是否在两点折线段上
 *
 * Parameters:
 * testPt - {<SuperMap.Geometry.Point>} 测试点
 * pt1    - {<SuperMap.Geometry.Point>} 折线段的第一个点
 * pt2    - {<SuperMap.Geometry.Point>} 折线段的第二个点
 *
 * Returns:
 * {isOnPolyLine, index} 是否在线上，索引
 */
SuperMap.Plot.PlottingUtil.PointIsOnPolyLines = function(testPt, pts){

    if(!pts || null === pts || 0 === pts.length){
        return {isOnPolyLine:false, index:-1};
    }

    var isOnPolyLine = false;
    var index = -1;
    for(var i = 0; i < pts.length-1; i++){
        isOnPolyLine = SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(testPt, pts[i], pts[i+1]);
        if(isOnPolyLine){
            index = i;
            break;
        }
    }

    return {isOnPolyLine:isOnPolyLine, index:index};
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.computePointToLineMinDis
 * 计算点到折线段的最小距离
 *
 * Parameters:
 * pt - {<SuperMap.Geometry.Point>} 测试点
 * pts - {Array<SuperMap.Geometry.Point>} 折线段的点数组
 *
 *  Returns:
 * {object} 最小距离和最小距离所在折线段的索引
 */
SuperMap.Plot.PlottingUtil.computePointToLineMinDis = function(pt,pts){
    var minDis = -1;
    var index = -1;
    for (var i = 0; i < pts.length - 1; i++) {
        var cp1 = pts[i];
        var cp2 = pts[i + 1];

        //计算垂足
        var pointCZ = SuperMap.Plot.PlottingUtil.projectPoint(pt, cp1, cp2);

        //判断垂足是否在折线上
        if (!SuperMap.Plot.PlottingUtil.PointIsOnPolyLine(pointCZ, cp1, cp2)) {
            continue;
        }
        var disCZ = SuperMap.Plot.PlottingUtil.distance(pt, pointCZ);

        if (minDis < 0) {
            minDis = disCZ;
            if(index){
                index = i;
            }
        }
        else {
            if (minDis > disCZ) {
                minDis = disCZ;
                index = i;
            }
        }
    }

    if(index){
        if(minDis < 0)
            index = -1;
    }

    return {minDis:minDis,index:index};
};

/**
* APIFunction: SuperMap.Plot.PlottingUtil.findPointInLine
* 沿着直线的方向, 在直线上找一个点, 到起始点(pntStart)的距离等于dDistance
*
* Parameters:
* pntStart - {<SuperMap.Geometry.Point>} 直线起点。
* pntEnd - {<SuperMap.Geometry.Point>} 直线终点。
* dDistance - {Float} 和pntStart的距离。
*
* Returns:
* {<SuperMap.Geometry.Point>}
*/
SuperMap.Plot.PlottingUtil.findPointInLine = function(pntStart, pntEnd, dDistance) {
    if(pntStart === pntEnd || Math.abs(dDistance) < 0.00000001){
        return pntStart;
    }

    var dx = pntEnd.x - pntStart.x ;
    var dy = pntEnd.y - pntStart.y ;
    var dLen = dDistance / Math.sqrt(dx*dx+dy*dy);

    var pntResultX = pntStart.x + dx * dLen;
    var pntResultY = pntStart.y + dy * dLen;

    return new SuperMap.Geometry.Point(pntResultX, pntResultY);
};
/**
 * APIFunction:SuperMap.Plot.PlottingUtil.OperateCtrlPts
 * 计算符号1006生成的控制点
 * Parameters:
 * ctrlPts  符号的控制点串
 *
 * Returns:
 * {Array(<SuperMap.Geometry.Point>)} 返回计算后的控制点。
 */
SuperMap.Plot.PlottingUtil.OperateCtrlPts=function(ctrlPts){
    var operatedPts = ctrlPts;
    var count = operatedPts.length;
    //只有三个点，根据对称生成第四个点
    if (count == 3)
    {
        //生成第四个点
        var ctrl4Pt= new SuperMap.Geometry.Point(0,0);
        SuperMap.Plot.PlottingUtil.GetTrapezoidPoints(1.0,ctrlPts[0],ctrlPts[1],ctrlPts[2],ctrl4Pt);
        operatedPts.push(ctrl4Pt);
    }

    if(count > 4)
    {
        operatedPts.splice(4, count-4);
        count = operatedPts.length;
    }
    //如果第三点不在第一、二点线段的左侧，则调整顺序
    if (SuperMap.Plot.PlottingUtil.PointIsRightToLine(ctrlPts[0],ctrlPts[1],operatedPts[2]))
    {
        //一、二点交换
        var tempPt = operatedPts[0];
        operatedPts[0] = operatedPts[1];
        operatedPts[1] = tempPt;
    }

    //如果点三不在点一、二的垂线右侧，则交换三、四点
    if ( !SuperMap.Plot.PlottingUtil.PointIsRightToVerticle(operatedPts[0],operatedPts[1],operatedPts[2]) )
    {
        //三、四点交换
        var tempPt = operatedPts[2];
        operatedPts[2] = operatedPts[3];
        operatedPts[3] = tempPt;
    }
    return operatedPts;
};

/**
 * APIFunction:SuperMap.Plot.PlottingUtil.PointIsRightToLine
 * 判断一个点在线段所在直线的左边或右边
 * Parameters:
 * ptStart  直线上的起点坐标
 * ptEnd    直线上的终点坐标
 * ptCheck  要判断的点的坐标
 * Returns:
 * {Boolean} TRUE 表示在直线右边,FALSE表示在直线左边
 */

SuperMap.Plot.PlottingUtil.PointIsRightToLine= function(pntFrom1,  pntTo1, check)
{
    return (pntTo1.x-pntFrom1.x)*(check.y-pntFrom1.y) - (check.x-pntFrom1.x)*(pntTo1.y-pntFrom1.y)<0;
};

/**
 * APIFunction:SuperMap.Plot.PlottingUtil.PointIsRightToVerticle
 * 判断p2点是否 p0--p1连线的过p0--p1中点的垂线的右侧,如果在右侧返回true
 * Parameters:
 * p0  p0点
 * p1  p1点
 * p2  p2点
 * Returns:
 * {Boolean} TRUE 表示在右侧,FALSE表示在直线左侧
 */
SuperMap.Plot.PlottingUtil.PointIsRightToVerticle=function(p0, p1, p2)
{
    var pm = new SuperMap.Geometry.Point( 0.5*(p1.x+p0.x) , 0.5*(p1.y+p0.y) );
    var v0 = p1-p0;
    var v1 = p2-pm;
    return( (v0.x*v1.x+v0.y*v1.y)>0 );
};

/**
 * APIFunction:SuperMap.Plot.PlottingUtil.LinePnt
 * 计算与射线端点相距指定距离的线上点
 * Parameters:
 * extremePt    端点
 * throughPt    与端点的距离
 * dLen    与端点的距离
 * Returns:
 * {<SuperMap.Geometry.Point>} 射线上的指定点
 */
SuperMap.Plot.PlottingUtil.LinePnt =function(  extremePt, throughPt, dLen )
{
    //线段长度
    var L1 = SuperMap.Plot.PlottingUtil.distance(extremePt,throughPt);
    if(L1 == 0)
        return extremePt;
    else
    {
        //比例值
        var ratio = dLen / L1;
        return SuperMap.Plot.PlottingUtil.FindPointOnLineByRatio(ratio,extremePt,throughPt);
    }
};

/**
 * APIFunction:SuperMap.Plot.PlottingUtil.FindPointOnLineByRatio
 * 查找线上距startPt距离为整条线段长度的ratio倍的点
 * Parameters:
 * ratio    长度比值
 * pStart    线的开始点
 * pEnd    线的结束点
 * Returns:
 * {<SuperMap.Geometry.Point>} 所求的线上点
 */
SuperMap.Plot.PlottingUtil.FindPointOnLineByRatio= function( ratio, pStart,  pEnd )
{
    var Pt =  new SuperMap.Geometry.Point(0.0, 0.0);
    Pt.x = pStart.x + (pEnd.x - pStart.x) * ratio;
    Pt.y = pStart.y + (pEnd.y - pStart.y) * ratio;
    ///Pt.z = pStart.z + (pEnd.z - pStart.z) * ratio;

    return Pt;
};

/**
 * APIFunction:SuperMap.Plot.PlottingUtil.RotateAngle
 * 给出角度计算点旋转(逆时针方向)
 * Parameters:
 * pntAnchor  参考点坐标。
 * dAngle     逆时针旋转的弧度值。
 * pRotate  旋转点，旋转后的坐标值也通过此参数返回。
 */

SuperMap.Plot.PlottingUtil.RotateAngle= function(pntAnchor, dAngle, pRotate)
{
    var dRaian = dAngle ;

    var dCos = Math.cos( dRaian );
    var dSin = Math.sin( dRaian );

    var xx = pRotate.x - pntAnchor.x;
    var yy = pRotate.y - pntAnchor.y;

    pRotate.x = xx * dCos - yy * dSin + pntAnchor.x;
    pRotate.y = xx * dSin + yy * dCos + pntAnchor.y;

    return pRotate;
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.findPointInPolyLine
 * 根据长度获取位置点和位置点索引
 *
 * Parameters:
 * pts - {Array<SuperMap.Geometry.Point>} 点数组。
 * dDistance - {Float} 所求点到pntStart的折线距离。
 *
 * Returns:
 * {Integer,<SuperMap.Geometry.Point>}
 */
SuperMap.Plot.PlottingUtil.findPointInPolyLine = function(pts, dDistance) {

    if(dDistance < 0 || pts.length < 2){
        return {index:-1,pt:null};
    }

    if(Math.abs(dDistance) < 0.00000001){
        return {index:0,pt:pts[0]};
    }

    var tempDis = 0;
    for(var i = 0; i < pts.length-1; i++){
        tempDis += SuperMap.Plot.PlottingUtil.distance(pts[i], pts[i+1]);

        if(tempDis > dDistance || SuperMap.Plot.PlottingUtil.equalFuzzy(tempDis, dDistance)){

            var length = tempDis - dDistance;

            var ptStart = pts[i+1];
            var ptEnd = pts[i];
            var L1 = SuperMap.Plot.PlottingUtil.distance(ptStart,ptEnd);
            var ratio = length/L1;
            var pt = new SuperMap.Geometry.Point();
            pt.x = ptStart.x + (ptEnd.x - ptStart.x) * ratio;
            pt.y = ptStart.y + (ptEnd.y - ptStart.y) * ratio;

            return {index:i, pt:pt};
        }
    }

    return {index:-1,pt:null};
};

SuperMap.Plot.PlottingUtil.polylineDistance = function(controlPoints) {
    if(controlPoints.length === 0) {
        return 0.0;
    }

    var dLength = 0;
    for (var i = 0; i < controlPoints.length-1; i++) {
        dLength += SuperMap.Plot.PlottingUtil.distance(controlPoints[i], controlPoints[i+1]);
    }

    return dLength;
};

//! \brief 给出参数(cos,sin)计算点旋转
SuperMap.Plot.PlottingUtil.rotate = function(pntAnchor, dCos, dSin, pntSource) {
    var xx = pntSource.x - pntAnchor.x;
    var yy = pntSource.y - pntAnchor.y;


    var pntSourceX = xx * dCos - yy * dSin + pntAnchor.x;
    var pntSourceY = xx * dSin + yy * dCos + pntAnchor.y;

    return new SuperMap.Geometry.Point(pntSourceX, pntSourceY);
};

SuperMap.Plot.PlottingUtil.getIncentrePointOnSegmentByScale = function(dLen, pt1, pt2) {
    var x1 = pt1.x;
    var y1 = pt1.y;
    var x2 = pt2.x;
    var y2 = pt2.y;

    //线段长度
    var L1 = Math.sqrt(1.0*(x1-x2)*(x1-x2) + 1.0*(y1-y2)*(y1-y2));
    var x = 0.0;
    var y = 0.0;
    if(L1 == 0)
    {
        x = x1;
        y = y1;
    }
    else
    {
        x = (x1 + (x2-x1)*dLen/L1);
        y = (y1 + (y2-y1)*dLen/L1);
    }
    return new SuperMap.Geometry.Point(x, y);
}

SuperMap.Plot.PlottingUtil.getExcentrePointOnSegmentByScale = function(dLen, pt1, pt2) {
    var x1 = pt1.x;
    var y1 = pt1.y;
    var x2 = pt2.x;
    var y2 = pt2.y;

    var x = 0.0;
    var y = 0.0;
    var L1 = Math.sqrt(1.0*(x1 - x2)*(x1 - x2) + 1.0*(y1 - y2)*(y1 - y2));
    if(L1 === 0) {
        x = x1;
        y = y1;
    } else {
        x = (x1 + (x1-x2)*dLen/L1);
        y = (y1 + (y1-y2)*dLen/L1);
    }

    return new SuperMap.Geometry.Point(x, y);
};

//! brief:根据一条线段和控制距离，求取其中一个端点的两侧点
SuperMap.Plot.PlottingUtil.getSidePointsOfLine = function(dSideWidth, ptStart, ptEnd)
{
    var x1 = ptStart.x;
    var y1 = ptStart.y;
    var x2 = ptEnd.x;
    var y2 = ptEnd.y;

    var L1 = Math.sqrt(1.0*(x1-x2)*(x1-x2)+1.0*(y1-y2)*(y1-y2));
    var x = 0.0;
    var y = 0.0;
    if (L1 == 0) {		  		//防同点错,此处不会发生
        y = 0;
        x = dSideWidth;
    } else {
        //相当于在线段(x2,y2)-(x1,y1)上求取到(x2,y2)距离为dLen、以(x2,y2)为坐标原点的点
        x = (dSideWidth*(x1-x2)/L1);	//定比并平移x0
        y = (dSideWidth*(y1-y2)/L1);
    }

    var rx = -y + x2;				//求取的(x,y)点求x轴对称点,并平移(x2,y2)，恢复原坐标原点
    var ry = +x + y2;

    var lx = +y + x2;				////求取的(x,y)点求y轴对称点,并平移(x2,y2)，恢复原坐标原点
    var ly = -x + y2;

    var ptLeft = new SuperMap.Geometry.Point(lx, ly);
    var ptRight = new SuperMap.Geometry.Point(rx, ry);

    return {pntLeft: ptLeft, pntRight: ptRight};
};

/**
 * APIFunction: SuperMap.Plot.PlottingUtil.pointProjectToSegment
 * 根据长度获取位置点和位置点索引
 *
 * Parameters:
 * pts - {Array<SuperMap.Geometry.Point>} 点数组。
 * dDistance - {Float} 所求点到pntStart的折线距离。
 *
 * Returns:
 * {Integer,<SuperMap.Geometry.Point>}
 */
SuperMap.Plot.PlottingUtil.pointProjectToSegment = function(pntHitTest, pntLinsectStart, pntLinsectEnd) {
    var dk = 0.0;
    var dk1 = 0.0;
    var dk2 = 0.0;
    var nflag = 1;
    var nPnt1Location,nPnt2Location;

    if(pntLinsectStart.x !== pntHitTest.x ) {
        dk1 = (pntLinsectStart.y - pntHitTest.y) / (pntLinsectStart.x - pntHitTest.x);
    }
    else dk1 = 1.7976931348623158e+308;
    if(pntLinsectEnd.x !== pntHitTest.x ) {
        dk2 = (pntLinsectEnd.y - pntHitTest.y) / (pntLinsectEnd.x - pntHitTest.x);
    }
    else dk2 = 1.7976931348623158e+308;
    if(pntLinsectEnd.y !== pntLinsectStart.y) {
        dk = (pntLinsectEnd.x-pntLinsectStart.x ) / (pntLinsectStart.y - pntLinsectEnd.y) ;
    }
    else dk = 1.7976931348623158e+308;

    if((pntLinsectStart.x >= pntHitTest.x) && (pntLinsectStart.y >= pntHitTest.y)) {
        nPnt1Location = 1;
    }
    else if((pntLinsectStart.x<pntHitTest.x) && (pntLinsectStart.y>pntHitTest.y)) {
        nPnt1Location = 2;
    }
    else if((pntLinsectStart.x <= pntHitTest.x) && (pntLinsectStart.y <= pntHitTest.y)) {
        nPnt1Location = 3;
    }
    else nPnt1Location = 4;
    if((pntLinsectEnd.x > pntHitTest.x) && (pntLinsectEnd.y > pntHitTest.y)) {
        nPnt2Location=1;
    }
    else if((pntLinsectEnd.x < pntHitTest.x) && (pntLinsectEnd.y > pntHitTest.y)) {
        nPnt2Location = 2;
    }
    else if((pntLinsectEnd.x < pntHitTest.x) && (pntLinsectEnd.y < pntHitTest.y)) {
        nPnt2Location = 3;
    }
    else nPnt2Location = 4;

    if(nPnt1Location == nPnt2Location) {
        if((dk1 < dk) && (dk2 < dk) || (dk1 > dk) && (dk2 > dk)) {
            nflag=0;
        }
    } else {
        switch (nPnt1Location)
        {
            case 1:
            {
                if((nPnt2Location == 4) && (dk1 < dk) || (nPnt2Location == 2) && (dk1 > dk)) {
                    nflag = 0;
                }
                break;
            }
            case 2:
            {
                if((nPnt2Location == 1) && (dk1 < dk) || (nPnt2Location == 3) && (dk1 > dk)) {
                    nflag=0;
                }
                break;
            }
            case 3:
            {
                if((nPnt2Location == 2) && (dk1 < dk) || (nPnt2Location == 4) && (dk1 > dk)) {
                    nflag=0;
                }
                break;
            }
            case 4:
            {
                if((nPnt2Location == 3) && (dk1 < dk) || (nPnt2Location == 1) && (dk1 > dk)) {
                    nflag = 0;
                }
                break;
            }
        }
    }

    var resultPoint = new SuperMap.Geometry.Point();
    if( SuperMap.Plot.PlottingUtil.equalFuzzy( dk-1.7976931348623158e+308, 0 ) ){
        resultPoint.x = pntHitTest.x;
        resultPoint.y = pntLinsectStart.y;
    } else if( SuperMap.Plot.PlottingUtil.equalFuzzy(dk, 0) ) {
        resultPoint.x = pntLinsectStart.x;
        resultPoint.y = pntHitTest.y;
    } else {
        resultPoint.x = (dk*(pntLinsectStart.y-pntHitTest.y)+dk*dk*pntHitTest.x+pntLinsectStart.x)/(dk*dk+1);
        resultPoint.y = pntHitTest.y + dk*(resultPoint.x - pntHitTest.x);
    }

    var isOnline = (nflag === 1) ? true : false;
    return {isOnline: isOnline, projectPoint: resultPoint};
};
/**
 * 按照指点角度和点旋转指定点
 *
 * @param ptBase     [in]传入参数，指定顶点
 * @param pt         [out]传出参数，要旋转的点
 * @param angle      [in]传入参数，旋转角度
 */
SuperMap.Plot.PlottingUtil.coordinateTrans = function(ptBase,pt,angle){
    var distance = SuperMap.Plot.PlottingUtil.distance(new SuperMap.Geometry.Point(0,0), pt);

    var angle1  = SuperMap.Plot.PlottingUtil.radian(new SuperMap.Geometry.Point(0,0), pt);
    var dAngle = angle1 + angle*Math.PI/180;

    var x = distance * Math.cos(dAngle) + ptBase.x;
    var y = distance * Math.sin(dAngle) + ptBase.y;

    return new SuperMap.Geometry.Point(x,y);
};

/**
 * 求三角形某条斜边对应的高度和部分底边长
 * ================================================
 *     已知三点d1,d2,d3,求d1-d3平行和垂直于d1-d2的长度
 *     返回:l1:平行,l2垂直
 * ================================================
 *       p3
 *       .
 *      /|\
 *     / | \
 *    /  |--\-----l1
 * p2/___|___\ p1
 *     |
 *     |
 *     l2
 *
 * @param pt1    三角形的一个点
 * @param pt2    三角形的一个点
 * @param pt3    三角形的一个点
 * @param    [out]输出参数，对应的直角边的长度
 * @param    [out]输出参数，对应的底边长
 */
SuperMap.Plot.PlottingUtil.triangleHeightAndPartBottomLen = function(pt1,pt2,pt3) {
    var dLen1,dLen2;
    var A=(pt3.x-pt2.x)*(pt3.x-pt2.x)+(pt3.y-pt2.y)*(pt3.y-pt2.y);
    var B=Math.sqrt((pt1.x-pt2.x)*(pt1.x-pt2.x)+(pt1.y-pt2.y)*(pt1.y-pt2.y));
    var C=Math.sqrt((pt1.x-pt3.x)*(pt1.x-pt3.x)+(pt1.y-pt3.y)*(pt1.y-pt3.y));

    if((0 == C) || (0 == B)) { //pt1 pt3 重叠
        dLen1 = 0;
        dLen2 = 0;
    } else if(A==0) {
        dLen1 = B;
        dLen2 = 0;
    }else {
        var COS = (B * B + C * C - A) / 2.0 / B / C;  // cosA=(b*b+c*c-a*a)/(2*b*c)
        var SIN = 0.0;
        if (COS >= 1) {
            COS = 1;
            SIN = 0;
        } else {
            SIN = Math.sqrt(1 - COS * COS);
        }
        dLen1 = C * COS;
        dLen2 = C * SIN;
    }
    return {dLen1:dLen1, dLen2:dLen2};
};

SuperMap.Plot.PlottingUtil.paraLine = function(srcPnts, dis, isLeft){
    var paraPnts = [];

    if(2 > srcPnts.length){
        return paraPnts;
    }

    if(isLeft){
        var pnt = srcPnts[1].clone();
        pnt = SuperMap.Plot.PlottingUtil.RotateAngle(srcPnts[0],Math.PI/2 ,pnt);

        paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[0],pnt,dis));

        for(var i = 1; i < srcPnts.length-1; i++){

            //如果两个点相同
            if(SuperMap.Plot.PlottingUtil.equalFuzzy(srcPnts[i].x,srcPnts[i+1].x) &&
            SuperMap.Plot.PlottingUtil.equalFuzzy(srcPnts[i].y,srcPnts[i+1].y)){
                continue;
            }

            var angle1 = SuperMap.Plot.PlottingUtil.radian(srcPnts[i],srcPnts[i+1]);
            var angle2 = SuperMap.Plot.PlottingUtil.radian(srcPnts[i],srcPnts[i-1]);

            var angle = angle2 - angle1;
            while(angle < 0){
                angle += 2*Math.PI;
            }

            var radians = angle/2;

            var cos;
            if(radians > Math.PI/2){
                cos = radians - Math.PI/2;
            }
            else{
                cos = Math.PI/2 - radians;
            }

            var dis1 = dis/Math.cos(cos);

            pnt = srcPnts[i+1].clone();
            pnt = SuperMap.Plot.PlottingUtil.RotateAngle(srcPnts[i], radians, pnt);
            paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[i],pnt,dis1))
        }

        //尾点平行点
        pnt = srcPnts[srcPnts.length-2].clone();
        pnt = SuperMap.Plot.PlottingUtil.RotateAngle(srcPnts[srcPnts.length-1],-1*Math.PI/2,pnt);
        paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[srcPnts.length-1], pnt, dis));
    }
    else{
        //首点平行点
        var pnt = srcPnts[1].clone();
        pnt = SuperMap.Plot.PlottingUtil.RotateAngle(srcPnts[0],-Math.PI/2,pnt);
        paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[0], pnt, dis));

        for (var i = 1; i < srcPnts.length-1; i++)
        {
            if(SuperMap.Plot.PlottingUtil.equalFuzzy(srcPnts[i].x,srcPnts[i+1].x) &&
                SuperMap.Plot.PlottingUtil.equalFuzzy(srcPnts[i].y,srcPnts[i+1].y))
            {
                continue;
            }

            var angle1 = SuperMap.Plot.PlottingUtil.radian(srcPnts[i],srcPnts[i+1]);
            var angle2 = SuperMap.Plot.PlottingUtil.radian(srcPnts[i],srcPnts[i-1]);
            var angle = angle2-angle1;

            while(angle < 0){
                angle = angle+2*Math.PI;
            }

            var dRadians = Math.PI - angle/2;

            var dCos;
            if (dRadians > Math.PI/2)
                dCos = dRadians-Math.PI/2;
            else
                dCos = Math.PI/2-dRadians;

            var dis1 = dis/Math.cos(dCos);
            pnt = srcPnts[i-1].clone();
            pnt = SuperMap.Plot.PlottingUtil.RotateAngle(srcPnts[i],dRadians,pnt);
            paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[i], pnt, dis1));
        }

        //尾点平行点
        pnt = srcPnts[srcPnts.length-2].clone();
        pnt = SuperMap.Plot.PlottingUtil.RotateAngle(srcPnts[srcPnts.length-1],Math.PI/2,pnt);
        paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[srcPnts.length-1], pnt, dis));
    }

    return paraPnts;
};

/**
 * Function: SuperMap.Plot.PlottingUtil.circlePoint
 * 求圆上点
 *
 * Parameters:
 * center - {Array<SuperMap.Geometry.Point>} 圆心点。
 * dx - {Float} 半径1。
 * dy - {Float} 半径2。
 * angle - {Float} 角度，单位为角度。
 *
 * Returns:
 * {Integer,<SuperMap.Geometry.Point>} 指定角度的圆上点
 */
SuperMap.Plot.PlottingUtil.circlePoint = function(center,dx,dy,angle){
    angle = angle * (Math.PI / 180);
    var x = center.x + dx * Math.cos(angle);
    var y = center.y + dy * Math.sin(angle);
    return new SuperMap.Geometry.Point(x,y);
};

/**
 * Function: SuperMap.Plot.PlottingUtil.lengthToDegree
 * 长度转换
 *
 * Parameters:
 * map - {<SuperMap.Map>}
 * len - {Float} 逻辑长度（千米）转地理长度（度）。
 * locationPoint - 转换所需定位点,单位是：地理坐标
 *
 * Returns:
 * {Float} 返回转换后的长度（按照横坐标转换）
 */
SuperMap.Plot.PlottingUtil.lengthToDegree = function(map, len, locationPoint){
    var location = map.getPixelFromLonLat(new SuperMap.LonLat(locationPoint.x, locationPoint.y));

    var currentScale = map.getScale();
    var cmLength = len * 100000 * currentScale;

    var px = 96 / 2.54;
    //获取位置点的像素坐标
    var x = location.x + cmLength * px;
    var y = location.y - 0 * px;

    var lonlat = map.getLonLatFromPixel(new SuperMap.Pixel(x, y));

    return lonlat.lon - locationPoint.x ;
};

/**
 * Function: SuperMap.Plot.PlottingUtil.degreeToLength
 * 长度转换
 *
 * Parameters:
 * map - {<SuperMap.Map>}
 * len - {Float} 逻辑长度（度）转地理长度（千米）。
 * locationPoint - 转换所需定位点,单位是：地理坐标
 *
 * Returns:
 * {Float} 返回转换后的长度（按照横坐标转换）
 */
SuperMap.Plot.PlottingUtil.degreeToLength = function(map, len, locationPoint){
    var lonlat = new SuperMap.LonLat(locationPoint.x + len, locationPoint.y);
    var pixel = map.getPixelFromLonLat(lonlat);

    var location = map.getPixelFromLonLat(new SuperMap.LonLat(locationPoint.x, locationPoint.y));

    var currentScale = map.getScale();

    var px = 96 / 2.54;

    var cmLength = (pixel.x - location.x) / px;

    return cmLength / 100000 / currentScale;
};

/**
 * Function: SuperMap.Plot.PlottingUtil.getPolygonCenterPt
 * 计算多边形的中心点
 *
 * Parameters:
 * pts - {Array<SuperMap.Geometry.Point>} 多边形位置点。
 *
 * Returns:
 * {<SuperMap.Geometry.Point>} 中心点
 */
SuperMap.Plot.PlottingUtil.getPolygonCenterPt = function(pts){
   if(!pts || null === pts || 0 === pts.length){
       return null;
   }

    var x = 0.0;
    var y = 0.0;

    for(var i = 0; i < pts.length; i++){
        x += pts[i].x;
        y += pts[i].y;
    }

    return new SuperMap.Geometry.Point(x/pts.length, y/pts.length);
};

/**
 * Function: SuperMap.Plot.PlottingUtil.getPolygonCenterPt
 * 计算多边形的中心点
 *
 * Parameters:
 * pts - {Array<SuperMap.Geometry.Point>} 多边形位置点。
 * testPt - {<SuperMap.Geometry.Point>} 测试点。
 *
 * Returns:
 * {Boolean} 在多边形内返回true，否则返回false
 */
SuperMap.Plot.PlottingUtil.ptIsInPolygon = function(pts, testPt){
    if(!pts || null === pts || 0 === pts.length){
        return false;
    }

    var nCross = 0;
    var nCount = pts.length;
    for(var i = 0; i < nCount; i++){
        var pt1 = pts[i];
        var pt2 = pts[(i+1)%nCount];

        if(pt1.y === pt2.y){
            continue;
        }

        var minY = (pt1.y)<(pt2.y)?pt1.y:pt2.y;
        var maxY = (pt1.y)>(pt2.y)?pt1.y:pt2.y;

        if(testPt.y < minY || testPt.y > maxY){
            continue;
        }

        //求交点的x坐标
        var x = (testPt.y-pt1.y)*(pt2.x-pt1.x)/(pt2.y-pt1.y) + pt1.x;

        if(x > testPt.x){
            nCross++;
        }
    }

    return (nCross%2 === 1);
};

/**
 * Function: SuperMap.Plot.PlottingUtil.projectPtOnPolyLine
 * //垂足点在折线上
 *
 * Parameters:
 * pt - {<SuperMap.Geometry.Point>} 测试点。
 * polyLinePts - {Array<SuperMap.Geometry.Point>} 折线位置点。
 *
 * Returns:
 * {Integer,<SuperMap.Geometry.Point>}
 */
SuperMap.Plot.PlottingUtil.projectPtOnPolyLine = function(pt,polyLinePts){
    if(2 > polyLinePts.length)
    {
        return {index:-1,pt:null};
    }

    for(var i = 0; i < polyLinePts.length-1; i++)
    {
        var result =SuperMap.Plot.PlottingUtil.pointProjectToSegment(pt, polyLinePts[i], polyLinePts[i+1]);
        if(result.isOnline)
        {
            return {index:i,pt:result.projectPoint};
        }
    }

    return {index:-1,pt:null};
};

/**
 * Function: SuperMap.Plot.PlottingUtil.IsPloyClockwise
 * 判断图形为顺时针逆时针
 *
 * Parameters:
 * pts - {Array<SuperMap.Geometry.Point>} 多边形点串。
 *
 * Returns:
 * {Integer,<SuperMap.Geometry.Point>} 顺时针返回0 逆时针返回1
 */
SuperMap.Plot.PlottingUtil.IsPloyClockwise = function(pts){
    var cp = SuperMap.Plot.PlottingUtil.clonePoints(pts);

    var  cnt =cp.length;
    if(cnt<3) return;
    var s = cp[0].y*(cp[cnt-1].x-cp[1].x);
    cp.push(cp[0].clone());
    for(var i=1;i<cnt;++i){
       s+=cp[i].y * (cp[i-1].x -cp[i+1].x);
    }
    if(s>0) return 0;//clockwise
    else return 1;//anticlockwise
};

/**
 * Function: SuperMap.Plot.PlottingUtil.isSamePt
 * 判断两个点是否相等
 *
 * Parameters:
 * pt1 - {<SuperMap.Geometry.Point>} 点。
 * pt1 - {<SuperMap.Geometry.Point>} 点。
 *
 * Returns:
 * {Boolean} 如果相等返回true，否则返回false
 */
SuperMap.Plot.PlottingUtil.isSamePt = function(pt1, pt2){
    if(SuperMap.Plot.PlottingUtil.equalFuzzy(pt1.x,pt2.x) &&
        SuperMap.Plot.PlottingUtil.equalFuzzy(pt1.y,pt2.y)){
        return ture;
    }

    return false;
};

/**
 * Method: getPtsIndexByDistance
 * 在点串坐标中计算出长度为指定距离的点坐标，返回该点坐标
 * Parameters:
 * dis    指定的距离
 * points 点串坐标
 * obj    线段角度值
 * Returns:
 * {<SuperMap.Geometry.Point>}  返回的位置点坐标
 */
SuperMap.Plot.PlottingUtil.getPtsIndexByDistance = function(dis,points){
    var result = SuperMap.Plot.PlottingUtil.findPointInPolyLine(points, dis);

    return {index:result.index, pts:result.pt, bfind: -1 !== result.index};
};

SuperMap.Plot.PlottingUtil.ptInBounds = function(pnt, bounds){
    return (pnt.x > bounds.left) && (pnt.x < bounds.right)
        && (pnt.y < bounds.top) && (pnt.y > bounds.bottom) ;

    //return (pnt.x > bounds.left || SuperMap.Plot.PlottingUtil.equalFuzzy((pnt.x - bounds.left), 0) )
    //    && (pnt.x < bounds.right || SuperMap.Plot.PlottingUtil.equalFuzzy((pnt.x - bounds.right), 0))
    //    && (pnt.y < bounds.top || SuperMap.Plot.PlottingUtil.equalFuzzy((pnt.y - bounds.top)), 0)
    //    && (pnt.y > bounds.bottom || SuperMap.Plot.PlottingUtil.equalFuzzy((pnt.y - bounds.bottom)), 0);
};

/**
 * 计算三点构成的夹角 [0~180]
 *
 * Parameters:
 * vertex   顶点
 * pt1、pt2 两端点
 * Returns:
 * {Float} 返回弧度
 */
SuperMap.Plot.PlottingUtil.InnerAngle = function(vertex, pt1, pt2 )
{
    //如果两端点的其中一个与顶点重合，则返回0
    if(vertex == pt1 || vertex == pt2)
    {
        return 0.0;
    }
    //三边长
    var a = SuperMap.Plot.PlottingUtil.distance(vertex, pt1);
    var b = SuperMap.Plot.PlottingUtil.distance(vertex, pt2);
    var c = SuperMap.Plot.PlottingUtil.distance(pt1, pt2);

    //余弦定理
    var cosC = (a*a + b*b - c*c) / (2 * a * b);
    if(cosC > 1 && SuperMap.Plot.PlottingUtil.equalFuzzy(cosC, 1.0))
    {
        cosC = 1.0;
    }
    else if(cosC < 1 && SuperMap.Plot.PlottingUtil.equalFuzzy(cosC, -1.0))
    {
        cosC = -1.0;
    }
    return Math.acos(cosC);
};

/**
 * 三角形顶点到对边的垂直距离，参数以坐标值的形式传入
 *
 */
SuperMap.Plot.PlottingUtil.PlumbLineLen = function(pt1, pt2, pt3 )
{
    var dLen = SuperMap.Plot.PlottingUtil.distance(pt1,pt2)*Math.sin(SuperMap.Plot.PlottingUtil.InnerAngle(pt2, pt1, pt3));
    return dLen;
};

/**
 * 求平行折线
 *
 * @param pts    [in]传入参数，二维折线点串
 * @param dis        [in]传入参数，平行折线距离
 * @param bOut      [out]平行点串位置，默认生成在线的左侧
 * @return         [out]传出参数，平行点串
 */
SuperMap.Plot.PlottingUtil.ParaPolygon = function (pts, dis, bOut) {
    var paraPnts = [];
    var srcPnts = SuperMap.Plot.PlottingUtil.clonePoints(pts);
    var count = srcPnts.length;
    if (count < 2) {
        return paraPnts;
    }

    var pnt = new SuperMap.Geometry.Point(0.0, 0.0);
    if (bOut) {
        //首点平行点
        if (count < 3) {
            pnt = srcPnts[1].clone();
            pnt.rotate(srcPnts[0], 180);
            paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[0], pnt, dis));
        }
        else {
            var angle1 = SuperMap.Plot.PlottingUtil.radian(srcPnts[0], srcPnts[1]);
            var angle2 = SuperMap.Plot.PlottingUtil.radian(srcPnts[0], srcPnts[srcPnts.length - 1]);
            var angle = angle2 - angle1;

            while (angle < 0)
                angle = angle + 2 * Math.PI;

            var dRadians = angle / 2;
            var dCos;
            if (dRadians > Math.PI / 2)
                dCos = dRadians - Math.PI / 2;
            else
                dCos = Math.PI / 2 - dRadians;

            var dis1 = dis / Math.cos(dCos);
            pnt = srcPnts[1].clone();
            pnt = SuperMap.Plot.PlottingUtil.RotateAngle(srcPnts[0], dRadians, pnt);
            paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[0], pnt, dis1));
        }

        for (var i = 1; i < count - 1; i++) {
            var angle1 = SuperMap.Plot.PlottingUtil.radian(srcPnts[i], srcPnts[i + 1]);
            var angle2 = SuperMap.Plot.PlottingUtil.radian(srcPnts[i], srcPnts[i - 1]);
            var angle = angle2 - angle1;

            while (angle < 0)
                angle = angle + 2 * Math.PI;

            var dRadians = angle / 2;
            var dCos;
            if (dRadians > Math.PI / 2)
                dCos = dRadians - Math.PI / 2;
            else
                dCos = Math.PI / 2 - dRadians;

            var dis1 = dis / Math.cos(dCos);
            pnt = srcPnts[i + 1].clone();

            pnt = SuperMap.Plot.PlottingUtil.RotateAngle(srcPnts[i], dRadians, pnt);
            paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[i], pnt, dis1));
        }

        //尾点平行点
        if (count < 3) {
            pnt = srcPnts[count - 2].clone();
            pnt.rotate(srcPnts[count - 1], 0);
            paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[count - 1], pnt, dis));
        }
        else {
            var angle1 = SuperMap.Plot.PlottingUtil.radian(srcPnts[count - 1], srcPnts[0]);
            var angle2 = SuperMap.Plot.PlottingUtil.radian(srcPnts[count - 1], srcPnts[count - 2]);
            var angle = angle2 - angle1;

            while (angle < 0)
                angle = angle + 2 * Math.PI;

            var dRadians = angle / 2;
            var dCos;
            if (dRadians > Math.PI / 2)
                dCos = dRadians - Math.PI / 2;
            else
                dCos = Math.PI / 2 - dRadians;

            var dis1 = dis / Math.cos(dCos);
            pnt = srcPnts[0].clone();
            pnt = SuperMap.Plot.PlottingUtil.RotateAngle(srcPnts[count - 1], dRadians, pnt);
            paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[count - 1], pnt, dis1));
        }
    }
    else {
        //首点平行点
        if (count < 3) {
            var pnt = srcPnts[1].clone();
            pnt.rotate(srcPnts[0], 0.0);
            paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[0], pnt, dis));
        }
        else {
            var angle1 = SuperMap.Plot.PlottingUtil.radian(srcPnts[0], srcPnts[1]);
            var angle2 = SuperMap.Plot.PlottingUtil.radian(srcPnts[0], srcPnts[count - 1]);
            var angle = angle2 - angle1;

            while (angle < 0)
                angle = angle + 2 * Math.PI;

            var dRadians = Math.PI - angle / 2;
            var dCos;
            if (dRadians > Math.PI / 2)
                dCos = dRadians - Math.PI / 2;
            else
                dCos = Math.PI / 2 - dRadians;

            var dis1 = dis / Math.cos(dCos);
            pnt = srcPnts[count - 1].clone();
            pnt = SuperMap.Plot.PlottingUtil.RotateAngle(srcPnts[0], dRadians, pnt);
            paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[0], pnt, dis1));
        }

        for (var i = 1; i < count - 1; i++) {
            var angle1 = SuperMap.Plot.PlottingUtil.radian(srcPnts[i], srcPnts[i + 1]);
            var angle2 = SuperMap.Plot.PlottingUtil.radian(srcPnts[i], srcPnts[i - 1]);
            var angle = angle2 - angle1;

            while (angle < 0)
                angle = angle + 2*Math.PI;

            var dRadians = Math.PI - angle / 2;
            var dCos;
            if (dRadians > Math.PI / 2)
                dCos = dRadians - Math.PI / 2;
            else
                dCos = Math.PI / 2 - dRadians;

            var dis1 = dis / Math.cos(dCos);
            pnt = srcPnts[i - 1].clone();
            pnt = SuperMap.Plot.PlottingUtil.RotateAngle(srcPnts[i], dRadians, pnt);
            paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[i], pnt, dis1));
        }

        //尾点平行点
        if (count < 3) {
            pnt = srcPnts[count - 2].clone();
            pnt.rotate(srcPnts[count - 1], 180);
            paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[count - 1], pnt, dis));
        }
        else {
            var angle1 = SuperMap.Plot.PlottingUtil.radian(srcPnts[count - 1], srcPnts[0]);
            var angle2 = SuperMap.Plot.PlottingUtil.radian(srcPnts[count - 1], srcPnts[count - 2]);
            var angle = angle2 - angle1;

            while (angle < 0)
                angle = angle + 2 * Math.PI;

            var dRadians = Math.PI - angle / 2;
            var dCos;
            if (dRadians > Math.PI / 2)
                dCos = dRadians - Math.PI / 2;
            else
                dCos = Math.PI / 2 - dRadians;

            var dis1 = dis / Math.cos(dCos);
            pnt = srcPnts[count - 2].clone();
            pnt = SuperMap.Plot.PlottingUtil.RotateAngle(srcPnts[count - 1], dRadians, pnt);
            paraPnts.push(SuperMap.Plot.PlottingUtil.LinePnt(srcPnts[count - 1], pnt, dis1));
        }
    }

    return paraPnts;
};


/**
 * 求解点数组中最大点与最小点的距离
 *
 * @param pts    [in]传入参数，二维折线点串
 * @return         [out]传出参数，距离
 */
SuperMap.Plot.PlottingUtil.GetOutRectangleDis = function (pts2D) {
    if(2 > pts2D.length)
    {
        return 0.0;
    }

    var dMaxX = pts2D[0].x;
    var dMinX = pts2D[0].x;
    var dMaxY = pts2D[0].y;
    var dMinY = pts2D[0].y;

    for(var i = 1; i < pts2D.length; i++)
    {
        if(dMaxX < pts2D[i].x)
        {
            dMaxX = pts2D[i].x;
        }

        if(dMinX > pts2D[i].x)
        {
            dMinX = pts2D[i].x;
        }

        if(dMaxY < pts2D[i].y)
        {
            dMaxY = pts2D[i].y;
        }

        if(dMinY > pts2D[i].y)
        {
            dMinY = pts2D[i].y;
        }
    }

    return SuperMap.Plot.PlottingUtil.distance(new SuperMap.Geometry.Point(dMaxX,dMaxY),new SuperMap.Geometry.Point(dMinX,dMinY));
};
