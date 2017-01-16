/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.GOAniamtionGrow
 * 动态标绘生长动画类。
 */
SuperMap.Plot.GOAniamtionGrow = SuperMap.Class(SuperMap.Plot.GOAniamtion , {

    /**
     * APIProperty: startScale
     * {Float} 开始比例。
     */
    startScale : 0,

    /**
     * APIProperty: endScale
     * {Float} 结束比例。
     */
    endScale : 1.0,

    /**
     * Property: timeSpace
     * {Float} 请求服务器的间隔时间。
     */
    timeSpace:50,

    /**
     * Property: LastDrawTime
     * {Float} 上次绘制时间。
     */
    lastDrawTime:0,

    /**
     * Property: LineLength
     * {Float} 总长度。
     */
    LineLength:0,

    /**
     * Property: controlPoints
     * {Array(<SuperMap.Geometry.Point>)}  控制点。
     */
    controlPoints:[],

    /**
     * Constructor: SuperMap.Plot.GOAniamtionGrow
     * 构建一个动画类。
     *
     */
    initialize: function(options){
        SuperMap.Plot.GOAniamtion.prototype.initialize.apply(options);
        this.controlPoints = [];
        this.LineLength = 0;
    },

    /**
     * APIMethod: getGOAnimationType
     * 获取动画类型
     *
     * Returns:
     * {<SuperMap.Plot.GOAniamtionType>} 动画类型
     */
    getGOAnimationType : function(){
        return SuperMap.Plot.GOAniamtionType.ANIMATION_GROW;
    },

    /**
     * Method: excute_1004
     * 执行code为1004的动画
     * Parameters:
     * ratio    时间比例
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute_1004: function(ratio){
        if(this.LineLength ===0)
        {
            var controlpnts = this.animationGOFeature.geometry.controlPoints;//position  ratio
            var dis=0;
            var center = new SuperMap.Geometry.Point((controlpnts[0].x + controlpnts[1].x)/2,(controlpnts[0].y + controlpnts[1].y)/2);
            dis +=SuperMap.Plot.PlottingUtil.distance(center,controlpnts[2]);
            this.controlPoints.push(controlpnts[0].clone());
            this.controlPoints.push(controlpnts[1].clone());
            this.controlPoints.push(controlpnts[2].clone());
            for(var i=3;i<controlpnts.length;i++){
                this.controlPoints.push(controlpnts[i].clone());
                dis +=SuperMap.Plot.PlottingUtil.distance(controlpnts[i-1],controlpnts[i]);
            }
            //对于不同的类型需要重新计算 总长度
            this.LineLength =dis;
        }

        if(0 === ratio){
            this.excuteAndRatioIsZreo();
            return true;
        }

        var pts=[];
        var pointsTemp=[];
        var startPos = 0;

        var lengthTemp = this.LineLength;
        startPos =2;

        var center =new  SuperMap.Geometry.Point(( this.controlPoints[0].x +  this.controlPoints[1].x)/2,( this.controlPoints[0].y +  this.controlPoints[1].y)/2);
        pointsTemp.push(center);
        for(var i=startPos;i<this.controlPoints.length;i++){
            pointsTemp.push( this.controlPoints[i].clone());
        }
        pts.push(this.controlPoints[0]);
        pts.push(this.controlPoints[1]);

        var obj =this.findPos(lengthTemp*ratio,pointsTemp);
        for (var i = 1; i <= obj.pos; i++) {
            pts.push(pointsTemp[i]);
        }
        pts.push(obj.pts);

        this.animationGOFeature.geometry.controlPoints =[];
        for(var i=0;i<pts.length;i++){
            this.animationGOFeature.geometry.controlPoints.push(pts[i].clone());
        }

        this.animationGOFeature.geometry.scale = ratio ;
        return true;
    },

    /**
     * Method: excute_1006
     * 执行code为1006的动画
     * Parameters:
     * ratio    时间比例
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute_1006:function(ratio){

        if(this.controlPoints.length ===0)
        {
            var controlpnts = this.animationGOFeature.geometry.controlPoints;//position  ratio
            this.controlPoints =  SuperMap.Plot.PlottingUtil.OperateCtrlPts(controlpnts);
        }

        if(0 === ratio){
            this.excuteAndRatioIsZreo();
            return true;
        }
        //
        var ctrloPts2D = this.controlPoints;
        if (4 != ctrloPts2D.length)
        {
            return false;
        }

        var pt0 = ctrloPts2D[0];
        var pt1 = ctrloPts2D[1];
        var pt2 = ctrloPts2D[2];
        var pt3 = ctrloPts2D[3];

        var dDis1 = SuperMap.Plot.PlottingUtil.distance(pt0,pt3);
        var dDis2 = SuperMap.Plot.PlottingUtil.distance(pt1,pt2);

        var temp3 = SuperMap.Plot.PlottingUtil.LinePnt(pt0,pt3,dDis1*ratio);
        var temp2 = SuperMap.Plot.PlottingUtil.LinePnt(pt1,pt2,dDis2*ratio);

        var pts = [];
        pts.push(pt0);
        pts.push(pt1);
        pts.push(temp2);
        pts.push(temp3);

        this.animationGOFeature.geometry.controlPoints =[];
        this.animationGOFeature.geometry.controlPoints = pts;

        return true;

    },
    excute_1002:function(ratio){
        if(this.LineLength ===0)
        {
            var controlpnts = this.animationGOFeature.geometry.controlPoints;//position  ratio
            var dis=0;
            this.controlPoints.push(controlpnts[0].clone());
            for(var i=1;i<controlpnts.length;i++){
                this.controlPoints.push(controlpnts[i].clone());
                dis +=SuperMap.Plot.PlottingUtil.distance(controlpnts[i-1],controlpnts[i]);
            }
            //对于不同的类型需要重新计算 总长度
            this.LineLength =dis;
        }

        if(0 === ratio){
            this.excuteAndRatioIsZreo();
            return true;
        }

        var pts=[];
        var pointsTemp=[];
        var startPos = 0;//dotsymbol  and  other ...
        for(var i=0;i<this.controlPoints.length;i++){
            pointsTemp.push( this.controlPoints[i].clone());
        }

        var obj =this.findPos(this.LineLength*ratio,pointsTemp);
        for(var i=startPos;i<=obj.pos;i++){
            pts.push(this.controlPoints[i]);
        }
        pts.push(obj.pts);
        var ptsNew  = [];
        if(pts.length<3){
            ptsNew.push(pts[0].clone());
            ptsNew.push(new SuperMap.Geometry.Point((pts[0].x + pts[1].x)/2,(pts[0].y + pts[1].y)/2));
            ptsNew.push(pts[1].clone());
            pts= ptsNew;
        }
        if(SuperMap.Geometry.PlottingGeometry.isAccessServer(this.animationGOFeature.geometry.libID,this.animationGOFeature.geometry.code)){
            if(this.goFeature.geometry.symbolData.algoMinEditPts > pts.length){
                this.excuteAndRatioIsZreo();
                return true;
            }
        }
        else{
        }

        this.animationGOFeature.geometry.controlPoints =[];
        for(var i=0;i<pts.length;i++){
            this.animationGOFeature.geometry.controlPoints.push(pts[i].clone());
        }

        return true;
    },
    /**
     * Method: excute_Generalization
     * 执行动画
     * Parameters:
     * ratio    时间比例
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute_Generalization:function(ratio){
        if(this.LineLength ===0)
        {
            var controlpnts = this.animationGOFeature.geometry.controlPoints;//position  ratio
            var dis=0;
            this.controlPoints.push(controlpnts[0].clone());
            for(var i=1;i<controlpnts.length;i++){
                this.controlPoints.push(controlpnts[i].clone());
                dis +=SuperMap.Plot.PlottingUtil.distance(controlpnts[i-1],controlpnts[i]);
            }
            //对于不同的类型需要重新计算 总长度
            this.LineLength =dis;
        }

        if(0 === ratio){
            this.excuteAndRatioIsZreo();
            return true;
        }

        var pts=[];
        var pointsTemp=[];
        var startPos = 0;//dotsymbol  and  other ...
        for(var i=0;i<this.controlPoints.length;i++){
            pointsTemp.push( this.controlPoints[i].clone());
        }

        var obj =this.findPos(this.LineLength*ratio,pointsTemp);
        for(var i=startPos;i<=obj.pos;i++){
            pts.push(this.controlPoints[i]);
        }
        pts.push(obj.pts);
        
        if(SuperMap.Geometry.PlottingGeometry.isAccessServer(this.animationGOFeature.geometry.libID,this.animationGOFeature.geometry.code)){
            if(this.goFeature.geometry.symbolData.algoMinEditPts > pts.length){
                this.excuteAndRatioIsZreo();
                return true;
            }
        }
        else{
        }

        this.animationGOFeature.geometry.controlPoints =[];
        for(var i=0;i<pts.length;i++){
            this.animationGOFeature.geometry.controlPoints.push(pts[i].clone());
        }

        return true;
    },

    /**
     * Method: excute_Rect
     * 执行rect动画
     * Parameters:
     * ratio    时间比例
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute_Rect:function(ratio){
        if(this.controlPoints.length ===0)
        {
            var controlpnts = this.animationGOFeature.geometry.controlPoints;//position  ratio
            for(var i=0;i<controlpnts.length;i++){
                this.controlPoints.push(controlpnts[i].clone());
            }
        }
        
        var controlpnts = this.controlPoints;//position  ratio
        var center = new SuperMap.Geometry.Point((controlpnts[0].x + controlpnts[1].x)/2,(controlpnts[0].y + controlpnts[1].y)/2);
        var width = Math.abs(controlpnts[0].x - controlpnts[1].x)/2*ratio;
        var height = Math.abs(controlpnts[0].y - controlpnts[1].y)/2*ratio;
        var leftup= new  SuperMap.Geometry.Point(center.x -width,center.y + height);
        var rightbottom= new  SuperMap.Geometry.Point(center.x +width,center.y - height);
        this.animationGOFeature.geometry.controlPoints =[];
        this.animationGOFeature.geometry.controlPoints.push(leftup);
        this.animationGOFeature.geometry.controlPoints.push(rightbottom);
        this.animationGOFeature.geometry.feature = this.animationGOFeature;

        return true;
    },

    /**
     * Method: excute_Circle
     * 执行circle动画
     * Parameters:
     * ratio    时间比例
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute_Circle:function(ratio){
        if(this.controlPoints.length ===0)
        {
            var controlpnts = this.animationGOFeature.geometry.controlPoints;//position  ratio
            for(var i=0;i<controlpnts.length;i++){
                this.controlPoints.push(controlpnts[i].clone());
            }
        }

        var center = this.controlPoints[0];
        var radus = ratio * Math.sqrt((this.controlPoints[0].x - this.controlPoints[1].x)*(this.controlPoints[0].x - this.controlPoints[1].x)+ (this.controlPoints[0].y - this.controlPoints[1].y)*(this.controlPoints[0].y - this.controlPoints[1].y));

        this.animationGOFeature.geometry.controlPoints =[];
        this.animationGOFeature.geometry.controlPoints.push(center);
        this.animationGOFeature.geometry.controlPoints.push(new SuperMap.Geometry.Point(center.x+ radus,center.y));
        this.animationGOFeature.geometry.feature = this.animationGOFeature;

        return true;
    },

    /**
     * Method: excute_Kidney
     * 执行Kidney动画
     * Parameters:
     * ratio    时间比例
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute_Kidney:function(ratio){
        if(this.controlPoints.length ===0)
        {
            var controlpnts = this.animationGOFeature.geometry.controlPoints;//position  ratio
            for(var i=0;i<controlpnts.length;i++){
                this.controlPoints.push(controlpnts[i].clone());
            }
        }

        if(0 === ratio){
            this.excuteAndRatioIsZreo();
            return true;
        }

        var pts = [];
        var center = new SuperMap.Geometry.Point(0,0);

        var centerX= 0,centerY= 0,ctrPntCounts =0;
        ctrPntCounts = this.controlPoints.length;
        for(var i=0;i<ctrPntCounts;i++){
            centerX+= this.controlPoints[i].x;
            centerY+= this.controlPoints[i].y;
        }
        center.x = centerX/ctrPntCounts;
        center.y = centerY/ctrPntCounts;
        for (var i = 0; i < ctrPntCounts; i++)
        {
            var dDistance = SuperMap.Plot.PlottingUtil.distance(center,this.controlPoints[i]);
            var dCurrentDis = dDistance * ratio;

            if (dCurrentDis > dDistance)
            {
                return false;
            }
            var pt = SuperMap.Plot.PlottingUtil.LinePnt(center,this.controlPoints[i],dCurrentDis);
            pts.push(pt);
        }
        this.animationGOFeature.geometry.controlPoints =[];
        this.animationGOFeature.geometry.controlPoints=pts;

        return true;
    },

    /**
     * Method: excute_RegularPloygon
     * 执行RegularPloygon动画
     * Parameters:
     * ratio    时间比例
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute_RegularPloygon:function(ratio){
        if(this.controlPoints.length ===0)
        {
            var controlpnts = this.animationGOFeature.geometry.controlPoints;//position  ratio
            for(var i=0;i<controlpnts.length;i++){
                this.controlPoints.push(controlpnts[i].clone());
            }
        }

        if(0 === ratio){
            this.excuteAndRatioIsZreo();
            return true;
        }

        var length  = this.controlPoints.length;

        var dRadius = SuperMap.Plot.PlottingUtil.distance(this.controlPoints[0],this.controlPoints[this.controlPoints.length-1]);
        var dCurrentRadius = dRadius * ratio;

        var pStart = new SuperMap.Geometry.Point(this.controlPoints[0].x + dCurrentRadius, this.controlPoints[0].y);

        var nstepAngle = 2*Math.PI /(length + 1);
        var startAngle = Math.PI/2 +this.animationGOFeature.geometry.symbolData.rotate2D.x;

        var pRotate = pStart;
        SuperMap.Plot.PlottingUtil.RotateAngle(this.controlPoints[0], startAngle, pRotate);
        var pts2D=[];
        pts2D.push(this.controlPoints[0].clone());
        pts2D.push(pRotate);
        var tempPnt = pRotate.clone();
        for(var i = 1; i < length-1; i++)
        {
            SuperMap.Plot.PlottingUtil.RotateAngle(this.controlPoints[0], nstepAngle, tempPnt);
            pts2D.push(tempPnt.clone());
        }

        this.animationGOFeature.geometry.controlPoints =[];
        this.animationGOFeature.geometry.controlPoints=pts2D;

        return true;
    },

    /**
     * Method: excute_Ellipse
     * 执行Ellipse动画
     * Parameters:
     * ratio    时间比例
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute_Ellipse:function(ratio){
        if(this.controlPoints.length ===0)
        {
            var controlpnts = this.animationGOFeature.geometry.controlPoints;
            for(var i=0;i<controlpnts.length;i++){
                this.controlPoints.push(controlpnts[i].clone());
            }
        }

        var pt1  = SuperMap.Plot.PlottingUtil.FindPointOnLineByRatio(ratio,this.controlPoints[0],this.controlPoints[1]);
        var pt2  = SuperMap.Plot.PlottingUtil.FindPointOnLineByRatio(ratio,this.controlPoints[0],this.controlPoints[2]);

        this.animationGOFeature.geometry.controlPoints[1] = pt1;
        this.animationGOFeature.geometry.controlPoints[2] = pt2;
        this.animationGOFeature.geometry.feature = this.animationGOFeature;

        return true;
    },

    /**
     * Method: excute_ArbitraryPolygon
     * 执行ArbitraryPolygon动画
     * Parameters:
     * ratio    时间比例
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute_ArbitraryPolygon:function(ratio){
        if(this.controlPoints.length ===0)
        {
            var controlpnts = this.animationGOFeature.geometry.controlPoints;
            for(var i=0;i<controlpnts.length;i++){
                this.controlPoints.push(controlpnts[i].clone());
            }
        }

        var center = new SuperMap.Geometry.Point(0,0);
        var centerX= 0,centerY= 0,ctrPntCounts =0;
        ctrPntCounts = this.controlPoints.length;
        for(var i=0;i<ctrPntCounts;i++){
            centerX+= this.controlPoints[i].x;
            centerY+= this.controlPoints[i].y;
        }
        center.x = centerX/ctrPntCounts;
        center.y = centerY/ctrPntCounts;
        var pts = [];
        for (var i = 0; i < this.controlPoints.length; i++)
        {
            var dDistance = SuperMap.Plot.PlottingUtil.distance(center,this.controlPoints[i]);
            var dCurrentDis = dDistance * ratio;

            var pt = SuperMap.Plot.PlottingUtil.LinePnt(center,this.controlPoints[i],dCurrentDis);
            pts.push(pt);
        }
        this.animationGOFeature.geometry.controlPoints = [];
        this.animationGOFeature.geometry.controlPoints = pts;
        this.animationGOFeature.geometry.feature = this.animationGOFeature;

        return true;
    },

    /**
     * Method: excute_Parallelline
     * 执行Parallelline动画
     * Parameters:
     * ratio    时间比例
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute_Parallelline:function(ratio){
        if(this.LineLength ===0)
        {
            var controlpnts = this.animationGOFeature.geometry.controlPoints;
            this.controlPoints.push(controlpnts[0].clone());
            this.controlPoints.push(controlpnts[1].clone());
            var dDistance =0;
            for (var i = 2; i < controlpnts.length; i++)
            {
                dDistance += SuperMap.Plot.PlottingUtil.distance(controlpnts[i-1],controlpnts[i]);
                this.controlPoints.push(controlpnts[i].clone());
            }
            this.LineLength = dDistance;
        }

        var pts=[],temppts = [];
        for (var i = 1; i < this.controlPoints.length; i++) {
            temppts.push(this.controlPoints[i].clone());
        }
        var obj = this.findPos(this.LineLength*ratio,temppts);
        pts.push(this.controlPoints[0].clone());

        for (var i = 0; i <= obj.pos; i++) {
            pts.push(temppts[i].clone());
        }
        pts.push(obj.pts.clone());
        this.animationGOFeature.geometry.controlPoints = [];
        this.animationGOFeature.geometry.controlPoints = pts;

        this.animationGOFeature.geometry.feature = this.animationGOFeature;

        return true;
    },

    /**
     * Method: excute_Polybezier
     * 执行Polybezier动画
     * Parameters:
     * ratio    时间比例
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute_Polybezier:function(ratio){
        if(this.LineLength ===0)
        {
            var controlpnts = this.animationGOFeature.geometry.controlPoints;

            for (var i = 0; i < controlpnts.length; i++)
            {
                this.controlPoints.push(controlpnts[i].clone());
            }
            var allPoints=[];
            allPoints = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(this.controlPoints);
            var dDistance =0;
            for (var i = 1; i < allPoints.length; i++)
            {
                dDistance += SuperMap.Plot.PlottingUtil.distance(allPoints[i-1],allPoints[i]);
            }

            this.LineLength = dDistance;
        }

        var pts = [];
        var array = [];
        var allPoints = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(this.controlPoints,array);
        var obj = this.findPos(this.LineLength*ratio,allPoints);

        for (var i = 0; i <= obj.pos; i++) {
            pts.push(allPoints[i].clone());
        }
        pts.push(obj.pts.clone());
        this.animationGOFeature.geometry.controlPoints = pts;//symbolData.innerCells[0].positionPoints = pts;
        this.animationGOFeature.geometry.feature = this.animationGOFeature;

        return true;
    },

    /**
     * Method: excuteAndRatioIsZreo
     * 当rotate为0时，清空动画对象位置点
     */
    excuteAndRatioIsZreo: function(){
        this.animationGOFeature.geometry.controlPoints =[];
        this.animationGOFeature.grow =  SuperMap.Geometry.PlottingGeometry.isAccessServer(this.animationGOFeature.geometry.libID,this.animationGOFeature.geometry.code);
    },

    /**
     * Method: excute
     * 执行动画
     *
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute: function(){
        //如果不是algo不支持该动画
        if(!this.isAlgo(this.goFeature)){
            return false;
        }

        //判断是否执行结束
        if(!this.canExcute()){
            return false;
        }

        var ratio = this.startScale+this.ratio*(this.endScale-this.startScale);

        var myDate = new Date();
        if(this.lastDrawTime > 0)
        {
            if(myDate.getTime()-this.timeSpace <this.lastDrawTime)
               return false;
        }
        this.lastDrawTime = myDate.getTime();

        var symbolcode;
        var libID;
        if( this.animationGOFeature.geometry.libID===0)
        {
            symbolcode = this.animationGOFeature.geometry.code;
            libID= this.animationGOFeature.geometry.libID;
        }
        else {
            symbolcode = this.animationGOFeature.geometry.code;
            libID= this.animationGOFeature.geometry.libID;
        }

        var isExcute = false;
        if(0 === libID){
            switch (symbolcode){
                case SuperMap.Plot.SymbolType.KIDNEY:
                case SuperMap.Plot.SymbolType.POLYBEZIERCLOSESYMBOL:
                case SuperMap.Plot.SymbolType.PARALLELOGRAM:
                case SuperMap.Plot.SymbolType.TRAPEZOIDSYMBOL:
                {
                    isExcute = this.excute_Kidney(ratio);
                    break;
                }
                case SuperMap.Plot.SymbolType.CIRCLESYMBOL:
                {
                    isExcute = this.excute_Circle(ratio);
                    break;
                }
                case SuperMap.Plot.SymbolType.RECTANGLESYMBOL:
                {
                    isExcute = this.excute_Rect(ratio);
                    break;
                }
                case SuperMap.Plot.SymbolType.REGULARPOLYGON:
                {
                    isExcute = this.excute_RegularPloygon(ratio);
                    break;
                }
                case SuperMap.Plot.SymbolType.ELLIPSESYMBOL:
                {
                    isExcute = this.excute_Ellipse(ratio);
                    break;
                }
                case SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL:
                {
                    isExcute = this.excute_ArbitraryPolygon(ratio);
                    break;
                }
                case SuperMap.Plot.SymbolType.PARALLELLINE:
                {
                    isExcute = this.excute_Parallelline(ratio);
                    break;
                }
                case SuperMap.Plot.SymbolType.POLYBEZIERSYMBOL:
                {
                    isExcute = this.excute_Polybezier(ratio);
                    break;
                }
                case SuperMap.Plot.SymbolType.PIESYMBOL:
                case SuperMap.Plot.SymbolType.CHORDSYMBOL:
                case SuperMap.Plot.SymbolType.ANNOFRAMESYMBOL:{
                    return false;
                }
                default :
                {
                    isExcute = this.excute_Generalization(ratio);
                    break;
                }
            }
        }
        else if(22 === libID){
            switch(symbolcode){
                case 1004:
                case 1010:
                {
                    isExcute = this.excute_1004(ratio);
                    break;
                }
                case 1006:
                {
                    isExcute =  this.excute_1006(ratio);
                    break;
                }
                case 1002:
                {
                    isExcute =  this.excute_1002(ratio);
                    break;
                }
                default :
                {
                    isExcute = this.excute_Generalization(ratio);
                    break;
                }
            }
        }
        else if(100 === libID){
            switch(symbolcode){
                case 25200:
                {
                    isExcute = this.excute_1004(ratio);
                    break;
                }
                default :
                {
                    isExcute = this.excute_Generalization(ratio);
                    break;
                }
            }
        }
        else if(421 === libID){
            switch(symbolcode){
                case 311:
                {
                    isExcute = this.excute_1004(ratio);
                    break;
                }
                case 317:
                {
                    isExcute = this.excute_1006(ratio);
                    break;
                }
                default :
                {
                    isExcute = this.excute_Generalization(ratio);
                    break;
                }
            }
        }
        else{
            isExcute = this.excute_Generalization(ratio);
        }

        this.animationGOFeature.grow = SuperMap.Geometry.PlottingGeometry.isAccessServer(this.animationGOFeature.geometry.libID,this.animationGOFeature.geometry.code);

        if(!this.animationGOFeature.grow){
            this.animationGOFeature.geometry.calculateParts();
        }

        return isExcute;
    },

    /**
     * Method: findPos
     * 查找某时间节点时，动画的所在的坐标位置
     * Parameters:
     * dis    指定的距离
     * points 点串坐标
     * Returns:
     * {<Object>}  返回对象，包括的位置点坐标 和 源控制点串被截断的位置pos
     */
    findPos:function(dis,points){
        var tempdis = 0, cursegLentgh=0;
        var i;
        for(i = 1;i<points.length;i++){
            cursegLentgh = SuperMap.Plot.PlottingUtil.distance(points[i-1],points[i]);
            if(tempdis + cursegLentgh>=dis) break;
            tempdis+= cursegLentgh;
        }
        var obj = new Object();
        if(i<points.length) {
            var resultpts = SuperMap.Plot.PlottingUtil.findPoint(points[i - 1], points[i], dis - tempdis, 0);
        }
        else{
            var resultpts = new SuperMap.Geometry.Point(points[i - 1].clone());
        }
        obj.pos =i-1;
        obj.pts = resultpts;
        return obj;

    },

    CLASS_NAME: "SuperMap.Plot.GOAniamtionGrow"
});
