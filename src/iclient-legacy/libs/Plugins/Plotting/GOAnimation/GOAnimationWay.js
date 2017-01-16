/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.GOAniamtionWay
 * 动态标绘路径动画类。
 */
SuperMap.Plot.GOAniamtionWay = SuperMap.Class(SuperMap.Plot.GOAniamtion , {

    /**
     * Property: pathType
     * {SuperMap.Plot.WayPathType} 路径类型。
     */
    pathType : SuperMap.Plot.WayPathType.POLYLINE,

    /**
     * Property: wayPoints
     * {Array(<SuperMap.Geometry.Point>} 路径点。
     */
    wayPoints : null,

    /**
     * Property: shapePoints
     * {Array(<SuperMap.Geometry.Point>} 路径拟合点。
     */
    shapePoints : null,

    /**
     * APIProperty: showPath
     * {Boolean} 是否显示路径。
     */
    showPath : false,

    /**
     * APIProperty: showPath
     * {Boolean} 是否沿切线方向。
     */
    tangentDirection : false,

    /**
     * Property: pathWidth
     * {Float} 路径线宽。
     */
    pathWidth : 0.5,

    /**
     * Property: pathColor
     * {String} 路径线宽。
     */
    pathColor : null,

    /**
     * Property: currentPt
     * {<SuperMap.Geometry.Point>} 路径动画当前位置点。
     */
    currentPt : null,

    /**
     * Property: pathFeature
     * {<SuperMap.Geometry.AlgoSymbol>} 路径线对象。
     */
    pathFeature : null,

    /**
     * Property: pathLength
     * {Float} 路径线总长度。
     */
    pathLength:0,

    /**
     * Constructor: SuperMap.Plot.GOAniamtionWay
     * 构建一个路径动画类。
     *
     */
    initialize: function(options){

        SuperMap.Plot.GOAniamtion.prototype.initialize.apply(options);

    },

    /**
     * APIMethod: getGOAnimationType
     * 获取动画类型
     *
     * Returns:
     * {<SuperMap.Plot.GOAniamtionType>} 动画类型
     */
    getGOAnimationType : function(){
        return SuperMap.Plot.GOAniamtionType.ANIMATION_WAY;
    },

    /**
     * APIMethod: getGOAnimationType
     * 设置是否显示动画路径
     * Parameters:
     * value    是否显示路径
     */
    setShowPath:function(value){
        this.showPath = value;
    },

    /**
     * Method: excute
     * 执行动画
     *
     * Returns:
     * {Boolean} 动画在执行则返回true，否则返回false
     */
    excute: function(){
        if(!this.isDot(this.goFeature)){
            if(null !== this.pathFeature){
                this.pathFeature.style.display= "none";
            }

            return false;
        }

        //判断是否执行结束
        if(!this.canExcute()){
            return false;
        }

        if(this.showPath){
            if(null !== this.pathFeature){
                this.pathFeature.style.display= "display";
            }
            else{
                this.makePath();
            }
        }
        else{
            if(null !== this.pathFeature){
                this.pathFeature.style.display= "none";
            }
        }

        var ratio = this.ratio;
        var curdis = ratio*this.pathLength;
        var obj = new Object();
        //obj.angle=0;
        var newPos = this.findPos(curdis,this.shapePoints,obj);
        this.currentPt = newPos.clone();
        this.animationGOFeature.geometry.controlPoints[0] = newPos;
        //this.animationGOFeature.geometry.leadLinePoints[0] = newPos.clone();
        this.animationGOFeature.geometry.calculateParts();
        this.animationGOFeature.geometry.feature = this.animationGOFeature;
        if(this.tangentDirection){
            this.animationGOFeature.geometry.setRotate(obj.angle);
           if(ratio===1)
           {
               this.animationGOFeature.geometry.setRotate(0);
           }
        }
        return true;
    },

    /**
     * APIMethod: setWayPoints
     * 设置路径动画点数组
     *
     *  Parameters:
     *  pts {Array<SuperMap.Geometry.Point>}  路径点数组
     */
    setWayPoints: function(pts){

        if(!pts || !SuperMap.Util.isArray(pts) || 2 > pts.length){
            return;
        }

        this.wayPoints = [];
        this.wayPoints = SuperMap.Plot.PlottingUtil.clonePoints(pts);

        if(null !== this.pathFeature){

            var plotting = SuperMap.Plotting.getInstance();
            var animationManager = plotting.getGOAnimationManager();
            animationManager.goAnimationLayer.removeFeature(this.pathFeature);

            this.pathFeature.destroy();
            this.pathFeature = null;
        }

        //this.makePath();
    },

    /**
     * APIMethod: getWayPoints
     * 获取路径动画点数组
     *
     *  Returns:
     *  {Array<SuperMap.Geometry.Point>}  路径点数组
     */
    getWayPoints: function(){
        return SuperMap.Plot.PlottingUtil.clonePoints(this.wayPoints);
    },

    /**
     * APIMethod: getCurrentPt
     * 获取路径动画当前位置
     *
     *   Returns:
     *  {Array<SuperMap.Geometry.Point>}  路径点数组
     */
    getCurrentPt: function(){

        return this.currentPt;
    },

    /**
     * APIMethod: setPathColor
     * 设置路径线颜色
     *
     *  Parameters:
     *  color {String}  路径线颜色
     */
    setPathColor: function(color){
        if(!color){
            return;
        }

        this.pathColor = color;

        if(!this.pathFeature || null === this.pathFeature){
            return;
        }

        this.pathFeature.style.strokeColor = this.pathColor;
    },

    /**
     * APIMethod: getPathColor
     * 获取路径线颜色
     *
     *  Returns:
     *  {String}  路径线颜色
     */
    getPathColor: function(){
        return this.pathColor;
    },

    /**
     * APIMethod: setPathWidth
     * 设置路径线宽度
     *
     *  Parameters:
     *  width {Float}  路径线宽度
     */
    setPathWidth: function(width){
        if(!width){
            return;
        }

        this.pathWidth = width;

        if(!this.pathFeature || null === this.pathWidth){
            return;
        }
        this.pathFeature.style.strokeWidth = this.pathWidth;
    },

    /**
     * APIMethod: getPathWidth
     * 获取路径线宽度
     *
     *  Returns:
     *  {Float}  路径线宽度
     */
    getPathWidth: function(){

        return this.pathWidth;
    },

    /**
     * APIMethod: setPathType
     * 设置路径线类型
     *
     *  Parameters:
     *  pathType {<SuperMap.Plot.WayPathType>}  路径线类型
     */
    setPathType: function(pathType){
        if(undefined === pathType || null === pathType){
            return;
        }

        if(this.pathType === pathType){
            return;
        }

        this.pathType = pathType;

        if(null !== this.pathFeature){

            var plotting = SuperMap.Plotting.getInstance();
            var animationManager = plotting.getGOAnimationManager();
            animationManager.goAnimationLayer.removeFeature(this.pathFeature);

            this.pathFeature.destroy();
            this.pathFeature = null;
        }
    },

    /**
     * APIMethod: getPathType
     * 获取路径线类型
     *
     *  Returns:
     *  {Float}  路径线类型
     */
    getPathType: function(){
        return this.pathType;
    },

    /**
     * Method: makePath
     * 制作动画的运动路径
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 路径feature对象
     */
    makePath: function(){
        if(null === this.wayPoints || 2 > this.wayPoints.length){
            return;
        }

        if(this.pathFeature===null){

            if(this.pathType===SuperMap.Plot.WayPathType.POLYLINE)
            {//creat poly line
                this.shapePoints = SuperMap.Plot.PlottingUtil.clonePoints(this.wayPoints);
                var geo =new SuperMap.Geometry.LineString(this.shapePoints);
                this.pathFeature = new SuperMap.Feature.Vector(geo);

                this.pathFeature.style = SuperMap.Util.copyAttributes(this.pathFeature.style,this.animationGOFeature.style);
                this.pathFeature.geometry.calculateBounds();
            }
            else{
                //creat cuve line
                this.shapePoints = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(this.wayPoints);

                var geo = new SuperMap.Geometry.LineString(this.shapePoints);
                this.pathFeature = new SuperMap.Feature.Vector(geo);

                this.pathFeature.style = SuperMap.Util.copyAttributes(this.pathFeature.style,this.animationGOFeature.style);
                this.pathFeature.geometry.calculateBounds();

            }

            var plotting = SuperMap.Plotting.getInstance();
            var animationManager = plotting.getGOAnimationManager();
            animationManager.goAnimationLayer.addFeature(this.pathFeature);
        }

        if(this.showPath){
            this.pathFeature.style.display= "display";
            if(this.pathColor){
                this.pathFeature.style.strokeColor = this.pathColor;
            }
            if(this.pathWidth){
                this.pathFeature.style.strokeWidth = this.pathWidth;
            }
        }

        var dis = 0;
        for(var i = 1;i<this.shapePoints.length;i++){
            dis+=SuperMap.Plot.PlottingUtil.distance(this.shapePoints[i-1],this.shapePoints[i]);
        }
        this.pathLength = dis;
        return this.pathFeature;
    },

    /**
     * Method: findPos
     * 在点串坐标中计算出长度为指定距离的点坐标，返回该点坐标
     * Parameters:
     * dis    指定的距离
     * points 点串坐标
     * obj    线段角度值
     * Returns:
     * {<SuperMap.Geometry.Point>}  返回的位置点坐标
     */
    findPos:function(dis,points,obj){
        var tempdis = 0, cursegLentgh=0;
        var i;
        for(i = 1;i<points.length;i++){
            cursegLentgh = SuperMap.Plot.PlottingUtil.distance(points[i-1],points[i]);
            if(tempdis + cursegLentgh>=dis) break;
            tempdis+= cursegLentgh;
        }
       var resultpts =  SuperMap.Plot.PlottingUtil.findPoint(points[i-1],points[i],dis-tempdis,0);
        if(this.tangentDirection) {
            obj.angle = SuperMap.Plot.PlottingUtil.radian(resultpts,points[i])/ Math.PI*180;
        }
        return resultpts;
    },

    CLASS_NAME: "SuperMap.Plot.GOAniamtionWay"
});
