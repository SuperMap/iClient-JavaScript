/**
 * Created by xuxiaorong01 on 2016/11/18.
 */
/**
 * Class: SuperMap.Geometry.AlgoSymbol
 * 线面标号对象。
 *
 * Inherits from:
 *  - <SuperMap.Geometry.GeoGraphicObject>
 */
SuperMap.Geometry.AlgoSymbol23902 = new SuperMap.Class(SuperMap.Geometry.AlgoSymbol, {
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
    initialize: function (option) {
        SuperMap.Geometry.AlgoSymbol.prototype.initialize.apply(this, arguments);

        this.symbolType = SuperMap.Plot.SymbolType.ALGOSYMBOL;

        this.minEditPts = 2;
        this.maxEditPts = 3;

        this.scaleValues = []
        this.scaleValues.push(0.2);
        this.scaleValues.push(0.2);
        this.scaleValues.push(0.5);
        this.scaleValues.push(0.125000);
        this.scaleValues.push(90.0);

        if(this.subSymbols >= 0){
            this.subSymbols.push(new SuperMap.Plot.SubSymbol(100, 4800));
        }

    },

    /**
     * Method: calculateParts
     * 重写了父类的方法
     */
    calculateParts: function () {
        this.init();

        //获取位置点
        var geoPts = SuperMap.Plot.PlottingUtil.clonePoints(this.controlPoints);
        SuperMap.Plot.PlottingUtil.clearSamePts(geoPts);
        if (geoPts.length < this.minEditPts) {
            return;
        }

        var pts2D = [];
        if (2 == geoPts.length) {
            var pt1 = geoPts[0];
            var pt2 = geoPts[1];

            var dis = SuperMap.Plot.PlottingUtil.distance(pt1, pt2);
            var dAngle = SuperMap.Plot.PlottingUtil.radian(pt1, pt2) * 180 / Math.PI;

            var pt3 = SuperMap.Plot.PlottingUtil.circlePoint(pt1, dis, dis, dAngle + 60);

            pts2D.push(pt1);
            pts2D.push(pt3);
            pts2D.push(pt2);
        }
        else {
            pts2D = pts2D.concat(geoPts);
        }

        this.addCell(SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL, pts2D);

        pts2D.push(pts2D[0]);
        //计算三角形周长
        var dAllDistance = SuperMap.Plot.PlottingUtil.polylineDistance(pts2D);

        var dScale0 = this.scaleValues[0];
        var dScale1 = this.scaleValues[1];
        var dScale2 = this.scaleValues[2];
        var dScale3 = this.scaleValues[3];
        var dScale4 = this.scaleValues[4];

        //计算大圆
        var dRadius = dAllDistance * dScale0;//大圆半径

        var pt1 = pts2D[0];
        var pt2 = pts2D[1];
        var pt3 = pts2D[2];

        ////////////////////////////////////////////////////////////
        //添加子符号
        var dScaleDis = dAllDistance * dScale1;
        var dScaleAngle = SuperMap.Plot.PlottingUtil.InnerAngle(pt1, pt2, pt3) * 180 / Math.PI * dScale2;
        var dAngle1And2 = SuperMap.Plot.PlottingUtil.radian(pt1, pt2) * 180 / Math.PI;
        var dTempAngle1 = dAngle1And2 - dScaleAngle;
        var dTempAngle2 = dAngle1And2 + dScaleAngle;
        var tempPt1 = SuperMap.Plot.PlottingUtil.circlePoint(pt1, dScaleDis, dScaleDis, dTempAngle1);
        var tempPt2 = SuperMap.Plot.PlottingUtil.circlePoint(pt1, dScaleDis, dScaleDis, dTempAngle2);

        var symbolPt2D;
        if (SuperMap.Plot.PlottingUtil.ptIsInPolygon(pts2D, tempPt1)) {
            symbolPt2D = tempPt1;
        }
        else {
            symbolPt2D = tempPt2;
        }

        var dSymbolSize = dAllDistance * dScale3;

        //旋转角度
        var dAngle = dScale4;

        if (0 < this.subSymbols.length) {
            this.computeSubSymbol(this.subSymbols[0], symbolPt2D, dSymbolSize, dAngle - 90);
        }

        //计算比例点
        var scalePt1 = SuperMap.Plot.PlottingUtil.circlePoint(pt1, dRadius, dRadius, dAngle1And2 + 180);
        this.addScalePoint(scalePt1);

        this.addScalePoint(symbolPt2D);

        var scalePt3 = SuperMap.Plot.PlottingUtil.circlePoint(symbolPt2D, 0.5 * dSymbolSize, 0.5 * dSymbolSize, dAngle);
        this.addScalePoint(scalePt3);

        this.createArcPts(pts2D, dRadius);

        //var symbolCenter = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(pts2D);
        //
        //var angle1 = SuperMap.Plot.PlottingUtil.radian(symbolCenter, pt1) * 180 / Math.PI;
        //var angle2 = SuperMap.Plot.PlottingUtil.radian(symbolCenter, pt2) * 180 / Math.PI;
        //var angle3 = SuperMap.Plot.PlottingUtil.radian(symbolCenter, pt3) * 180 / Math.PI;
        //
        //if(angle1 > angle3){
        //    var tempPt = pt1;
        //    pt1 = pt3;
        //    pt3 = tempPt;
        //
        //    var tempAngle = angle1;
        //    angle1 = angle3;
        //    angle3 = tempAngle;
        //}
        //
        //if(angle1 > angle2){
        //    var tempPt = pt1;
        //    pt1 = pt2;
        //    pt2 = tempPt;
        //
        //    var tempAngle = angle1;
        //    angle1 = angle2;
        //    angle2 = tempAngle;
        //}
        //
        //if(angle2 > angle3){
        //    var tempPt = pt2;
        //    pt2 = pt3;
        //    pt3 = tempPt;
        //
        //    var tempAngle = angle2;
        //    angle2 = angle3;
        //    angle3 = tempAngle;
        //}
        //
        //var circlePts1 = this.GetCirclePts(pt1, pt2, pt3, dRadius);
        //var circlePts2 = this.GetCirclePts(pt2, pt1, pt3, dRadius);
        //var circlePts3 = this.GetCirclePts(pt3, pt1, pt2, dRadius);
        //
        //var dDis1And2 = SuperMap.Plot.PlottingUtil.distance(pt1, pt2);
        //var dDis1And3 = SuperMap.Plot.PlottingUtil.distance(pt1, pt3);
        //var dDis2And3 = SuperMap.Plot.PlottingUtil.distance(pt2, pt3);
        //
        //var bIntesect1And2 = false;
        //var bIntesect1And3 = false;
        //var bIntesect2And3 = false;
        //
        //if (2 * dRadius > dDis1And2) {
        //    bIntesect1And2 = true;
        //}
        //
        //if (2 * dRadius > dDis1And3) {
        //    bIntesect1And3 = true;
        //}
        //
        //if (2 * dRadius > dDis2And3) {
        //    bIntesect2And3 = true;
        //}
        //
        //
        //if (bIntesect1And2 && bIntesect1And3 && bIntesect2And3) {
        //    var arcPts1 = this.GetArcPts3D(circlePts1, circlePts2, circlePts3);
        //    var arcPts2 = this.GetArcPts3D(circlePts2, circlePts1, circlePts3);
        //    var arcPts3 = this.GetArcPts3D(circlePts3, circlePts1, circlePts2);
        //
        //    var arrPts2D = [];
        //    arrPts2D = arrPts2D.concat(arcPts1);
        //    arrPts2D = arrPts2D.concat(arcPts3);
        //    arrPts2D = arrPts2D.concat(arcPts2);
        //
        //    arrPts2D = this.sortPts(symbolCenter, arrPts2D);
        //
        //    for(var m = 0; m < arrPts2D.length; m++){
        //        if(SuperMap.Plot.PlottingUtil.ptIsInPolygon(pts2D, arrPts2D[m])){
        //            arrPts2D.splice(m,1);
        //            if(m > 0){
        //                m--;
        //            }
        //        }
        //    }
        //
        //    if (0 < arrPts2D.length) {
        //        arrPts2D.push(arrPts2D[0]);
        //        this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, arrPts2D);
        //    }
        //}
        //else {
        //    this.CreatArc(circlePts1, circlePts2, circlePts3);
        //    this.CreatArc(circlePts3, circlePts1, circlePts2);
        //    this.CreatArc(circlePts2, circlePts1, circlePts3);
        //}

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
            if(this.scalePoints.length <= index)
                return;

            var geoPts = this.controlPoints;
            if (this.minEditPts > geoPts.length)
            {
                return;
            }

            var pts2D = [];
            if(2 == geoPts.length)
            {
                var pt1 = geoPts[0];
                var pt2 = geoPts[1];

                var dis = SuperMap.Plot.PlottingUtil.distance(pt1,pt2);
                var dAngle = SuperMap.Plot.PlottingUtil.radian(pt1,pt2)*180/Math.PI;

                var pt3 = SuperMap.Plot.PlottingUtil.circlePoint(pt1,dis,dis,dAngle+60);

                pts2D.push(pt1);
                pts2D.push(pt2);
                pts2D.push(pt3);
            }
            else
            {
                pts2D = pts2D.concat(geoPts);
            }

            var pt1 = pts2D[0];
            var pt2 = pts2D[1];
            var pt3 = pts2D[2];

            var center2D = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(pts2D);

            pts2D.push(pts2D[0]);
            var dAllDis = SuperMap.Plot.PlottingUtil.polylineDistance(pts2D);//计算周长

            var scalePt2D = pt;
            if(0 === index)
            {
                var dis = SuperMap.Plot.PlottingUtil.distance(scalePt2D, pts2D[0]);
                this.scaleValues[0] = dis/dAllDis;
            }
            else if(1 === index)
            {
                var dDis = SuperMap.Plot.PlottingUtil.distance(scalePt2D,pts2D[0]);
                var dScale1 = dDis/dAllDis;
                this.scaleValues[1] = dScale1;

                var dAngle = SuperMap.Plot.PlottingUtil.InnerAngle(pt1,pt2,pt3)*180/Math.PI;
                var dTempAngle = SuperMap.Plot.PlottingUtil.InnerAngle(pt1,pt2,scalePt2D)*180/Math.PI;

                var dScale2 = dTempAngle/dAngle;

                if(0 <= dScale2 && 1 >= dScale2)
                {
                    this.scaleValues[2] = dScale2;
                }
            }
            else if (2 === index) {
                var dScale1 = this.scaleValues[1];
                var dScale2 = this.scaleValues[2];

                var dScaleDis = dAllDis * dScale1;
                var dScaleAngle = SuperMap.Plot.PlottingUtil.InnerAngle(pt1, pt2, pt3) * 180 / Math.PI * dScale2;
                var dAngle1And2 = SuperMap.Plot.PlottingUtil.radian(pt1, pt2) * 180 / Math.PI;
                var dTempAngle1 = dAngle1And2 - dScaleAngle;
                var dTempAngle2 = dAngle1And2 + dScaleAngle;
                var tempPt1 = SuperMap.Plot.PlottingUtil.circlePoint(pt1, dScaleDis, dScaleDis, dTempAngle1);
                var tempPt2 = SuperMap.Plot.PlottingUtil.circlePoint(pt1, dScaleDis, dScaleDis, dTempAngle2);

                var symbolPt2D;
                if (SuperMap.Plot.PlottingUtil.ptIsInPolygon(pts2D, tempPt1)) {
                    symbolPt2D = tempPt1;
                }
                else {
                    symbolPt2D = tempPt2;
                }
                var dDis = SuperMap.Plot.PlottingUtil.distance(scalePt2D, symbolPt2D);

                var dScale3 = 2 * dDis / dAllDis;
                this.scaleValues[3] = dScale3;

                var dScale4 = SuperMap.Plot.PlottingUtil.radian(symbolPt2D, scalePt2D) * 180 / Math.PI;
                this.scaleValues[4] = dScale4;
            }
        }

        this.calculateParts();
    },

    ComputeSubSymbolPt: function (dScaleValue0, dScaleValue1, pts2D, centerPt2D) {
        var pt1 = pts2D[0];
        var pt2 = pts2D[1];
        var pt3 = pts2D[2];
        var dDis1 = SuperMap.Plot.PlottingUtil.PlumbLineLen(pt3, pt1, pt2);
        var dDis2 = SuperMap.Plot.PlottingUtil.PlumbLineLen(pt2, pt1, pt3);

        var dSymbolDis1 = dDis1 * dScaleValue0;
        var dSymbolDis2 = dDis2 * dScaleValue1;

        var tempPts1 = [];
        if (SuperMap.Plot.PlottingUtil.PointIsRightToLine(pt1, pt2, centerPt2D)) {
            var tempPts = [];
            tempPts.push(pt1);
            tempPts.push(pt2);
            tempPts1 = SuperMap.Plot.PlottingUtil.paraLine(tempPts, dSymbolDis1, false);
        }
        else {
            var tempPts = [];
            tempPts.push(pt1);
            tempPts.push(pt2);
            tempPts1 = SuperMap.Plot.PlottingUtil.paraLine(tempPts, dSymbolDis1, true);
        }

        var tempPts2;
        if (SuperMap.Plot.PlottingUtil.PointIsRightToLine(pt1, pt3, centerPt2D)) {
            var tempPts = [];
            tempPts.push(pt1);
            tempPts.push(pt3);
            tempPts2 = SuperMap.Plot.PlottingUtil.paraLine(tempPts, dSymbolDis2, false);
        }
        else {
            var tempPts = [];
            tempPts.push(pt1);
            tempPts.push(pt3);
            tempPts2 = SuperMap.Plot.PlottingUtil.paraLine(tempPts, dSymbolDis2, true);
        }

        if (2 > tempPts1.length || 2 > tempPts2.length) {
            return centerPt2D;
        }

        var result = SuperMap.Plot.PlottingUtil.intersectLines(tempPts1[0], tempPts1[1], tempPts2[0], tempPts2[1]);

        if (result.isIntersectLines) {
            return result.intersectPoint;
        }
        else {
            return centerPt2D;
        }
    },

    createArcPts: function(geoPts,dRadius){
        var AngleRange = [];
        var Radius = [];
        for (var i = 0; i < geoPts.length; i++) {
            Radius.push(dRadius);
            AngleRange.push([{Start: 0, End: 360}]);
        }

        for(var i = 0; i < geoPts.length; i++){
            if(AngleRange[i].length === 0 || (AngleRange[i][0].Start === 0 && AngleRange[i][0].End === 0)){
                continue;
            }
            for(var j = i + 1; j < geoPts.length; j++){
                if(AngleRange[j].length === 0 || (AngleRange[j][0].Start === 0 && AngleRange[j][0].End === 0)){
                    continue;
                }

                var distance = SuperMap.Plot.PlottingUtil.distance(geoPts[i], geoPts[j]);
                if(distance < (Radius[i] + Radius[j])){
                    if(distance > Math.abs(Radius[i] - Radius[j])){

                        for(var t = 0; t < 2; t++){
                            var angleLine,angle,index;
                            if(t == 0){
                                index = i;
                                angleLine = SuperMap.Plot.PlottingUtil.radian(geoPts[i], geoPts[j]) * this.RTOD;
                                angle = Math.acos((distance*distance + Radius[i] * Radius[i] - Radius[j] * Radius[j]) / (2 * distance * Radius[i])) * this.RTOD;
                            }
                            else {
                                index = j;
                                angleLine = SuperMap.Plot.PlottingUtil.radian(geoPts[j], geoPts[i]) * this.RTOD;
                                angle = Math.acos((distance*distance + Radius[j] * Radius[j] - Radius[i] * Radius[i]) / (2 * distance * Radius[j])) * this.RTOD;
                            }


                            var angleStart = angleLine - angle;
                            var angleEnd = angleLine + angle;

                            var contains0Degree = (angleStart < 0 && angleEnd > 0) || (angleStart > 360 || angleEnd > 360);

                            angleStart = this.adjustAngle(angleStart);
                            angleEnd = this.adjustAngle(angleEnd);

                            for(var k = AngleRange[index].length - 1; k >= 0; k--){
                                if(contains0Degree){
                                    if(angleEnd > AngleRange[index][k].End || SuperMap.Plot.PlottingUtil.equalFuzzy(angleEnd, AngleRange[index][k].End)){
                                        AngleRange[index].splice(k, 1);
                                        continue;
                                    }
                                    else if(angleEnd > AngleRange[index][k].Start){
                                        AngleRange[index][k].Start = angleEnd;
                                    }

                                    if(angleStart < AngleRange[index][k].Start || SuperMap.Plot.PlottingUtil.equalFuzzy(angleStart, AngleRange[index][k].Start)){
                                        AngleRange[index].splice(k, 1);
                                        continue;
                                    }
                                    else if(angleStart < AngleRange[index][k].End){
                                        AngleRange[index][k].End = angleStart;
                                    }
                                }
                                else {
                                    if(angleStart < AngleRange[index][k].Start && angleEnd > AngleRange[index][k].End){
                                        AngleRange[index].splice(k, 1);
                                    }
                                    else if(angleStart > AngleRange[index][k].Start && angleEnd < AngleRange[index][k].End){
                                        AngleRange[index].push({Start:AngleRange[index][k].Start,End:angleStart});
                                        AngleRange[index].push({Start:angleEnd,End:AngleRange[index][k].End});
                                        AngleRange[index].splice(k, 1);
                                    }
                                    else{
                                        if(angleStart > AngleRange[index][k].End){
                                            continue;
                                        }
                                        else if(angleStart > AngleRange[index][k].Start){
                                            AngleRange[index][k].End = angleStart;
                                        }

                                        if(angleEnd < AngleRange[index][k].Start){
                                            continue;
                                        }
                                        else if(angleEnd < AngleRange[index][k].End){
                                            AngleRange[index][k].Start = angleEnd;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else{
                        if(Radius[i] < Radius[j]){
                           AngleRange[i][0].Start = 0;
                           AngleRange[i][0].End = 0;
                            break;
                        }
                        else{
                            AngleRange[j][0].Start = 0;
                            AngleRange[j][0].End = 0;
                        }
                    }
                }
            }
        }

        for(var i = 0; i < geoPts.length; i++){
            if(AngleRange[i].length === 0 || (AngleRange[i][0].Start === 0 && AngleRange[i][0].End === 0)){
                continue;
            }
            for(var k = AngleRange[i].length - 1; k >= 0; k--){
                var tempStartAngle = this.adjustAngle(AngleRange[i][k].Start);
                var tempEndAngle = this.adjustAngle(AngleRange[i][k].End);

                while (tempEndAngle < tempStartAngle){
                    tempEndAngle += 360;
                }

                var circlePts = [];
                var stepangle = (tempEndAngle - tempStartAngle) / 72;
                for(var angle = tempStartAngle; angle < (tempEndAngle + stepangle / 2); angle += stepangle){
                    var x = geoPts[i].x + Radius[i] * Math.cos(angle * this.DTOR);
                    var y = geoPts[i].y + Radius[i] * Math.sin(angle * this.DTOR);
                    circlePts.push(new SuperMap.Geometry.Point(x, y));
                }

                this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, circlePts);
            }
        }
    },

    adjustAngle: function(angle) {
        while (angle > 360){
            angle -= 360;
        }
        while (angle < 0){
            angle += 360;
        }
        return angle;
    },

    GetCirclePts: function (pt1, pt2, pt3, dRadius) {
        var dAngle1And2 = SuperMap.Plot.PlottingUtil.radian(pt1, pt2) * 180 / Math.PI;
        var dAngle1And3 = SuperMap.Plot.PlottingUtil.radian(pt1, pt3) * 180 / Math.PI;
        var dAngle1 = dAngle1And2;
        if (dAngle1And3 > dAngle1And2) {
            dAngle1 = dAngle1And3;
        }
        var circlePts = [];
        for (var i = dAngle1; i < 360 + dAngle1; i += 4) {
            if (i == 90) {
                i = 91;
            }
            circlePts.push(SuperMap.Plot.PlottingUtil.circlePoint(pt1, dRadius, dRadius, i));
        }

        circlePts.push[0];
        return circlePts;
    },

    CreatArc: function (circlePts, otherCirclePts1, otherCirclePts2) {
        var circleCellPts = [];
        var tempPts2D = [];

        for (var i = 0; i < circlePts.length; i++) {
            var tempPt = circlePts[i];
            if (SuperMap.Plot.PlottingUtil.ptIsInPolygon(otherCirclePts1, tempPt) ||
                SuperMap.Plot.PlottingUtil.ptIsInPolygon(otherCirclePts2, tempPt)) {
                if (tempPts2D.length > 1) {
                    circleCellPts.push(tempPts2D);
                }
                tempPts2D = [];
            }
            else {
                tempPts2D.push(tempPt);
            }
        }

        if (tempPts2D.length > 1) {
            circleCellPts.push(tempPts2D);
        }

        for (var i = 0; i < circleCellPts.length; i++) {
            var pts2D = circleCellPts[i];

            this.addCell(SuperMap.Plot.SymbolType.POLYLINESYMBOL, pts2D);
        }
    },

    GetArcPts3D: function (circlePts, otherCirclePts1, otherCirclePts2) {
        var circleCellPts = [];
        var tempPts2D = [];

        for (var i = 0; i < circlePts.length; i++) {
            var tempPt = circlePts[i];

            if (SuperMap.Plot.PlottingUtil.ptIsInPolygon(otherCirclePts1, tempPt) ||
                SuperMap.Plot.PlottingUtil.ptIsInPolygon(otherCirclePts2, tempPt)) {
                if (tempPts2D.length > 1) {
                    circleCellPts.push(tempPts2D);
                }
                tempPts2D = [];
            }
            else {
                tempPts2D.push(tempPt);
            }
        }

        if (tempPts2D.length > 1) {
            circleCellPts.push(tempPts2D);
        }

        var pts2D = [];
        for (var i = 0; i < circleCellPts.length; i++) {
            pts2D = pts2D.concat(circleCellPts[i]);
        }

        return pts2D;
    },

    sortPts: function(centerPt, pts){
        centerPt = SuperMap.Plot.PlottingUtil.getPolygonCenterPt(pts);

        for(var i = 0; i < pts.length; i++){
            var pt = pts[i];
            var angle = SuperMap.Plot.PlottingUtil.radian(centerPt, pt)*180/Math.PI;

            for(var m = 0; m < pts.length; m++){
                var pt1 = pts[m];
                var tempAngle = SuperMap.Plot.PlottingUtil.radian(centerPt, pt1)*180/Math.PI;

                if(angle > tempAngle){
                    var tempPt = new SuperMap.Geometry.Point(pt.x,pt.y);
                    pt = new SuperMap.Geometry.Point(pt1.x,pt1.y);
                    pt1 = new SuperMap.Geometry.Point(tempPt.x,tempPt.y);
                    angle = tempAngle;

                    pts[i] = pt;
                    pts[m] = pt1;
                }
            }
        }

        return pts;
    },

    CLASS_NAME:"SuperMap.Geometry.AlgoSymbol23902"
});
