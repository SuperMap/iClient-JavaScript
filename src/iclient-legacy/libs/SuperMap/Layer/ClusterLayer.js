/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Layer/Vector.js
 */

/**
 * Class: SuperMap.Layer.ClusterLayer
 * 该图层用于将要素以聚散的形式渲染出来。
 *
 * Inherits from:
 *  - <SuperMap.Layer.Vector>
 */
SuperMap.Layer.ClusterLayer = SuperMap.Class(SuperMap.Layer.Vector, {

    /**
     * APIProperty: maxLevel
     * {Number} 聚散显示的最大比例尺级数，超过该级后，不再进行聚散，而是直接绘制feature。
     */
    maxLevel:null,

    /**
     * APIProperty: isDiffused
     * {Boolean} 当点击聚散点时，是否允许聚散点可以散开，默认为true，允许聚散点散开。
     */
    isDiffused:true,

    /**
     * APIProperty: tolerance
     * {Number} 聚散的范围，该像素范围内的小点会被聚散成一个大点，默认为60像素。
     */
    tolerance:60,

    /**
     * APIProperty: maxDiffuseAmount
     * {Number} 聚散点最多能散开小点的数目，当点击聚散点的时候，聚散数目小于等于该值的聚散点可以散开,大于该值的聚散点不会散开，默认值为50。
     */
    maxDiffuseAmount:50,

    /**
     * APIProperty: renderers
     * {Array(String)} 可支持渲染器的列表，支持的渲染方式有'SVG', 'VML' ，默认值['SVG', 'VML']。
     * 如果在可选属性中未设置 'renderer' 选项，则使用当前浏览器支持的此列表中的第一个渲染方式，默认列表为['SVG', 'VML']。
     */
    renderers: ['SVG', 'VML'],

    /**
     * APIProperty: clusterStyles
     * Array{<Object>} 各级聚散点的样式,可通过修改该属性，修改cluster的分级以及各级的样式。
     * (注：示例代码中的clusterStyles值是clusterStyles的默认值)
     * (start code)
     * //创建一个名为“Cluster”的聚散点图层，并修改其clusterStyles属性。
     * var clusterLayer = new SuperMap.Layer.ClusterLayer("Cluster",{
     *     clusterStyles:[
     *         {
     *             "count":15,//子节点小于等于15的聚散点
     *             "style":{
     *                 fontColor:"#404040",
     *                 graphic:true,
     *                 externalGraphic:SuperMap.Util.getImagesLocation()+"cluster3.png",
     *                 graphicWidth:37,
     *                 graphicHeight:38,
     *                 labelXOffset:-4,
     *                 labelYOffset:5
     *             }
     *         },
     *         {
     *             "count":50,//子节点小于等于50大于15的聚散点
     *             "style":{
     *                 fontColor:"#404040",
     *                 graphic:true,
     *                 externalGraphic:SuperMap.Util.getImagesLocation()+"cluster2.png",
     *                 graphicWidth:41,
     *                 graphicHeight:46,
     *                 labelXOffset:-3,
     *                 labelYOffset:6
     *             }
     *         },
     *         {
     *             "count":"moreThanMax",// 子节点大于50的聚散点
     *             "style":{
     *                 fontColor:"#404040",
     *                 graphic:true,
     *                 externalGraphic:SuperMap.Util.getImagesLocation()+"cluster1.png",
     *                 graphicWidth:48,
     *                 graphicHeight:53,
     *                 labelXOffset:-5,
     *                 labelYOffset:8
     *             }
     *         }
     * ]});
     * (end)
     */
    clusterStyles:[
        {
            "count":15,
            "style":{
                fontColor:"#404040",
                graphic:true,
                externalGraphic:SuperMap.Util.getImagesLocation()+"cluster3.png",
                graphicWidth:37,
                graphicHeight:38,
                labelXOffset:-4,
                labelYOffset:5
            }
        },
        {
            "count":50,
            "style":{
                fontColor:"#404040",
                graphic:true,
                externalGraphic:SuperMap.Util.getImagesLocation()+"cluster2.png",
                graphicWidth:41,
                graphicHeight:46,
                labelXOffset:-3,
                labelYOffset:6
            }
        },
        {
            "count":"moreThanMax",
            "style":{
                fontColor:"#404040",
                graphic:true,
                externalGraphic:SuperMap.Util.getImagesLocation()+"cluster1.png",
                graphicWidth:48,
                graphicHeight:53,
                labelXOffset:-5,
                labelYOffset:8
            }
        }
    ],

    /**
     * Property: noDrawClusters
     * {Boolean} 是否绘制聚散点，当设置为true时，仍然进行相关计算，但是不绘制，默认为false。
     */
    noDrawClusters:false,

    /**
     * Property: isFeatureChangeed
     * {Boolean} 添加的点是否有变化
     */
    isFeatureChanged:true,

    /**
     * Property: clusterPoints
     * {Array(<SuperMap.Feature.Vector>)}  所有需要渲染的feature数组
     */
    clusterPoints:[],

    /**
     * Property: toDrawFeatures
     * {Array(<SuperMap.Feature.Vector>)}  当前视图中已经绘制的feature
     */
    toDrawFeatures:null,

    /**
     * Property: openedPoints
     * {Array(<SuperMap.Feature.Vector>)}  保存的从聚散点中散开的小点数组
     */
    openedPoints:[],

    /**
     * Property: lastOpenedPoints
     * {Array(<SuperMap.Feature.Vector>)}  上一次散开的小点数组
     */
    lastOpenedPoints:[],

    /**
     * Property: pointMap
     * {Object(<SuperMap.Feature.Vector>)}  按照网格将所有feature结构化后的三维数组对象
     */
    pointMap:null,

    /**
     * Property: origin
     * {SuperMap.Geometry.Point}  地图的左上角坐标
     */
    origin:null,

    /**
     * Property: curOpenCluster
     * {SuperMap.Feature.Vector}  当前处于散开状态的聚散点对象
     */
    curOpenCluster:null,

    /**
     * Property: drawAllTimeout
     * Array{<Object>}  VML下有效，存储分批绘制点的timeout
     */
    drawAllTimeout:[],

    /**
     * Property: drawDiffusePointTimeout
     * Array{<Object>}  VML下有效，存储分批绘制散开点的timeout
     */
    drawDiffusePointTimeout:[],

    /**
     * Property: displayedBounds
     * {SuperMap.Bounds}  在该范围内的聚散点默认散开
     */
    displayedBounds:null,

    /**
     * Property: dataExtent
     * {SuperMap.Bounds}  所有要素所在的地理范围
     */
    dataExtent : null,

    //displayedLevel:null,

    /**
     * Constructor: SuperMap.Layer.Vector
     * 创建一个聚散点图层。
     * (start code)
     * //创建一个名为“Cluster Layer”的聚散点图层。
     * var clusterLayer = new SuperMap.Layer.ClusterLayer("Cluster");
     * (end)
     *
     * Parameters:
     * name - 此图层的图层名 {String}
     * options - {Object} 设置此类上没有默认值的属性。
     *
     * Returns:
     * {<SuperMap.Layer.ClusterLayer>} 新的聚散点图层
     */
    initialize: function(name, options) {
        SuperMap.Layer.Vector.prototype.initialize.apply(this, arguments);

        this.EVENT_TYPES = this.EVENT_TYPES.concat(["clusterend"]);    //增加一个聚散完成事件

        this.events = new SuperMap.Events(this, this.div,
            this.EVENT_TYPES);
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }

        //this.clusterStyles = this.getClusterModels();
        this.clusterStyles = this.clusterStyles.sort(function(a,b){
            if(a.count==="moreThanMax"){
                return true;
            }
            else if(b.count==="moreThanMax"){
                return false;
            }
            else{
                return a.count- b.count;
            }
        });
    },

    /**
     * APIMethod: addFeatures
     * 聚散显示features，将需要聚散显示feature传给该方法，便可以实现聚散显示。
     *
     * Parameters:
     * features {Array(<SuperMap.Feature.Vector>)} - 需要聚散显示的feature
     *
     */
    addFeatures:function(ps){
        var isRefresh = arguments[1];
        if(!ps||(ps instanceof Array&&ps.length==0)){
            return
        };

        //判断是否是刷新图层时调用该方法
        if(isRefresh==="isRefresh"){
            this.clusterPoints = ps;
        }
        else{
            ps = this.clusterPoints = (this.clusterPoints||[]).concat(ps);
            this.isFeatureChanged = true;
        }

        //计算地图起始点，瓦片大小对应的地理范围（256×256），从而将地图切为一块一块的瓦片，聚合就是按照瓦片来聚合的。将同一瓦片中的点聚合到一起
        var tileSizeLonlat = this.getTileSizeLonlat();
        var origin = this.getOrigin();

        var curBounds = this.map.getExtent();
        var idx = this.getIdxOfBounds(curBounds,tileSizeLonlat,origin);
        var minRowIdx = idx.minRowIdx;
        var minColIdx = idx.minColIdx;
        var maxRowIdx = idx.maxRowIdx;
        var maxColIdx = idx.maxColIdx;
        var pointTileInfoArray = [];
        var displayedPoints = [];
        for(var i=0;i<ps.length;i++){
            var pointTileInfo = this.getPointTileIdx(ps[i],tileSizeLonlat,origin);
            var x = pointTileInfo[1];
            var y = pointTileInfo[0];
            if(minColIdx<=y&&maxColIdx>=y){
                if(minRowIdx<=x&&maxRowIdx>=x){
                    //var dl = this.displayedLevel;
                    var db = this.displayedBounds;
                    var f = pointTileInfo[2];
                    var g = f.geometry;
                    g = new SuperMap.LonLat(g.x, g.y);
                    if(db&&db.containsLonLat(g)){//&&dl!=null&&dl===this.map.getZoom()
                        displayedPoints.push(f);
                    }
                    else{
                        pointTileInfoArray.push(pointTileInfo);
                    }
                }
            }
        }
        var pointMap = [];
        for(var i=0;i<pointTileInfoArray.length;i++){
            var p = pointTileInfoArray[i];
            var y = p[0];
            var x = p[1];
            if(!pointMap[y]){
                pointMap[y] = [];
            }
            var pmy = pointMap[y];
            if(pmy[x]){
                pmy[x].push(p[2]);
            }
            else{
                pmy[x] = [p[2]];
            }
        }
        if(displayedPoints.length>0){
            pointMap["displayedPoints"] = displayedPoints;
        }
        this.drawPointMap(pointMap,minRowIdx,minColIdx,maxRowIdx,maxColIdx);

        this.pointMap = pointMap;
    },

    /**
     * APIMethod: refresh
     * 刷新图层，清除当前已经绘制的feature，重新进行聚散计算并绘制。
     */
    refresh:function(){
        this.renderer.locked = true;
        this.clearCluster();
        this.renderer.locked = false;
        this.addFeatures(this.clusterPoints,"isRefresh");
    },

    /**
     * APIMethod: displayFeatures
     * 散开显示指定范围内的要素。
     *
     * Parameters:
     * bounds - {SuperMap.Bounds} 指定的范围，默认值为当前视图范围。
     */
    displayFeatures:function(bounds){
        this.displayedBounds = bounds||this.map.getExtent();
        //this.displayedLevel = this.map.getZoom();

        this.refresh();
    },

    /**
     * APIMethod: cancelDisplayFeatures
     * 与displayFeatures方法相对应，还原该方法所显示的点。
     */
    cancelDisplayFeatures:function(){
        this.displayedBounds = null;
        //this.displayedLevel = null;

        this.refresh();
    },

    /**
     * APIMethod: getFeaturesByBounds
     * 获取指定范围内的所有要素。
     *
     * Parameters:
     * bounds {SuperMap.bounds} 地理范围
     *
     * Returns:
     * {Array<SuperMap.Feature.vector>}   要素数组
     */
    getFeaturesByBounds:function(bounds){
        if(!this.pointMap||(this.pointMap.length&&this.pointMap.length==0)){
            return [];
        }

        var pm = this.pointMap;
        var tileSizeLonlat = this.getTileSizeLonlat();
        var origin = this.getOrigin();

        var curBounds = this.map.getExtent();
        var idx = this.getIdxOfBounds(curBounds,tileSizeLonlat,origin);

        var fs = [];
        for(var y=idx.minColIdx;y<=idx.maxColIdx;y++){
            if(pm[y]){
                for(var x=idx.minRowIdx;x<=idx.maxRowIdx;x++){
                    if(pm[y][x]){
                        fs = fs.concat(pm[y][x]);
                    }
                }
            }
        }

        return fs;
    },

    /**
     * APIMethod: clearCluster
     * 清除当前视图中已经绘制的要素，但是不清空存储，当平移缩放操作时仍然会重绘
     * */
    clearCluster:function(key){
        //this.destroyFeatures(this.toDrawFeatures);
        //this.destroyFeatures(this.openedPoints);
        this.removeAllFeatures("isFather");

        this.toDrawFeatures = null;
        if(key!==123){
            this.openedPoints = [];
            this.curOpenCluster = null;
        }
    },

    /**
     * APIMethod: destroyCluster
     * 彻底清除所有要素，平移缩放操作时不再重绘
     * */
    destroyCluster:function(){
        this.clearCluster();

        this.clusterPoints = null;
        this.pointMap = null;
        this.isFeatureChanged = true;
    },

    removeAllFeatures:function(isFather){
        if(isFather==="isFather"){
            SuperMap.Layer.Vector.prototype.removeAllFeatures.apply(this);
        }
        else{
            this.destroyCluster();
        }
    },

    /**
     * APIMethod: assembleFeature
     * 组装散开后的要素，绘制之前会调用该方法，允许用户通过重写该方法自定义要素，通常在复杂要素的情况下使用，比如三叶草对象
     * (start code)
     * //创建一个名为“Cluster”的clusterLayer，并重写assembleFeature方法，重新组装要素
     * clusterLayer = new SuperMap.Layer.ClusterLayer("Cluster",{"assembleFeature":function(feature){
     *   var point = feature.geometry;
     *   var f1 = new SuperMap.Feature.Vector();
     *   f1.geometry = new SuperMap.Geometry.Point(point.x+10,point.y+10);
     *   var f2 = new SuperMap.Feature.Vector();
     *   f2.geometry = new SuperMap.Geometry.Point(point.x-10,point.y-10);
     *   return [f1,f2];
     * }});
     * (end)
     *
     * Parameters:
     * feature{SuperMap.Feature.Vector} 即将绘制的要素
     *
     * Returns:
     * {Array(<SuperMap.Feature.Vector>)}修改后的组合要素
     */
    assembleFeature:function(feature){ //每一个feature绘制之前都会调用该方法，用户可以重写该方法自定义样式
        var f = feature;
        f.style.strokeWidth = 1;

        return f;
    },

    removeFeatures: function(features) {
        if(!features || features.length === 0) {
            return;
        }
        if (features === this.features) {
            return this.removeAllFeatures("isFather");
        }
        if (!(SuperMap.Util.isArray(features))) {
            features = [features];
        }
        if (features === this.selectedFeatures) {
            features = features.slice();
        }
        var featuresFailRemoved = [];

        for (var i = features.length - 1; i >= 0; i--) {
            var feature = features[i];
            delete this.unrenderedFeatures[feature.id];

            //如果我们传入的feature在features数组中没有的话，则不进行删除，
            //并将其放入未删除的数组中。
            var findex = SuperMap.Util.indexOf(this.features, feature);

            if(findex === -1) {
                featuresFailRemoved.push(feature);
                continue;
            }
            this.features.splice(findex, 1);
            if (SuperMap.Util.indexOf(this.selectedFeatures, feature) !== -1){
                SuperMap.Util.removeItem(this.selectedFeatures, feature);
            }
            // if(!this.features[feature.id]) {
            // featuresFailRemoved.push(feature);
            // continue;
            // }
            //delete this.features[feature.id];
        }

        //先清除再重绘。
        this.renderer.clear();
        // this.redraw();
        var drawFeatures = [];
        for(var hex = 0, len = this.features.length; hex < len; hex++){
            feature = this.features[hex];
            drawFeatures.push(feature);
        }
        this.features = [];
        this._addFeatures(drawFeatures);

        var succeed = featuresFailRemoved.length == 0 ? true : false;
        this.events.triggerEvent("featuresremoved", {features: featuresFailRemoved, succeed: succeed});
    },

    /**
     * Method addFeaturesToCluster
     * 在原有要素的基础上，继续添加要素，并聚散显示
     *
     * Parameters:
     * features{Array<SuperMap.Feature.Vector>} 要素数组
     * */
    /*addFeaturesToCluster:function(fs){
        this.clusterPoints = this.clusterPoints.concat(fs);

        var tileSizeLonlat = this.getTileSizeLonlat();
        var origin = this.getOrigin();

        var curBounds = this.map.getExtent();
        var idx = this.getIdxOfBounds(curBounds,tileSizeLonlat,origin);
        var minRowIdx = idx.minRowIdx;
        var minColIdx = idx.minColIdx;
        var maxRowIdx = idx.maxRowIdx;
        var maxColIdx = idx.maxColIdx;

        var pointMap = this.pointMap;
        for(var i=0;i<fs.length;i++){
            var pointTileInfo = this.getPointTileIdx(fs[i],tileSizeLonlat,origin);
            var x = pointTileInfo[1];
            var y = pointTileInfo[0];
            if(minColIdx<=y&&maxColIdx>=y){
                if(minRowIdx<=x&&maxRowIdx>=x){
                    var p = pointTileInfo;
                    var y = p[0];
                    var x = p[1];
                    if(!pointMap[y]){
                        pointMap[y] = [];
                    }
                    var pmy = pointMap[y];
                    if(pmy[x]){
                        pmy[x].push(p[2]);
                    }
                    else{
                        pmy[x] = [p[2]];
                    }
                }
            }
        }

        this.drawPointMap(pointMap,minRowIdx,minColIdx,maxRowIdx,maxColIdx);
    },*/

    /**
     * Method: setMap
     * 图层已经添加到Map控件中。
     *
     * 如果没有设置renderer集合，这个图层将不可用，从map控件中删除，
     * 否则，给当前渲染器添加map的引用，并设置渲染器的大小。
     *
     * Parameters:
     * map - {<SuperMap.Map>}
     */
    setMap: function(map) {
        SuperMap.Layer.Vector.prototype.setMap.apply(this, arguments);
        if(this.isVML()){
            this.map.events.register("movestart",this,function(){
                this.clearTimeout(this.drawAllTimeout);
                this.clearTimeout(this.drawDiffusePointTimeout);
                this.removeAllFeatures("isFather");
            });
        }
    },

    /**
     * Method: isVML
     * 判断Renderer对象是否是VML
     */
    isVML:function(){          //判断是否是VML的渲染方式，当ie8以下，采用vml渲染时，效率比较低，需要采用分批绘制的策略
        return (this.renderer.CLASS_NAME === "SuperMap.Renderer.VML")
    },

    /**
     * Method: moveTo
     * 重置当前矢量图层的div，再一次与Map控件保持一致。
     * 重新进行聚散计算并绘制
     */
    moveTo:function(bounds,zoomChange){  //平移缩放时，需要重新计算并绘制聚合点
        this.renderer.locked = true;
        this.clearCluster(zoomChange?null:123);

        SuperMap.Layer.Vector.prototype.moveTo.apply(this, arguments);
        this.renderer.locked =this.curOpenCluster?true:false;
        this.addFeatures(this.clusterPoints,"isRefresh");
        if(this.curOpenCluster){      //采用vml渲染时，效率比较低，需要采用分批绘制的策略
            if(this.isVML()){
                window.setTimeout(function(me){
                    return function(){
                        me.addFeatures20(me.openedPoints,me.curOpenCluster.geometry,null,"drawDiffusePointTimeout");
                    }
                }(this),100)
            }
            else{
                this.renderer.locked =false;
                this._addFeatures(this.openedPoints);
            }
        }
    },

    /**
     * Method: clickCluster
     * 点击聚散点所进行的操作
     *
     * Parameters:
     * feature {SuperMap.Feature.Vector} - 被点击的聚散点对象
     */
    clickCluster:function(f){
        if(this.isDiffused){
            try{
                var isVML = this.isVML();
                if(isVML){
                    var ts = this.drawDiffusePointTimeout;
                    if(ts.length>0){
                        this.clearTimeout(ts);
                        this.clearOpenedPoints(this.lastOpenedPoints);
                    }
                }
                var ps, p,openedPoints;
                this.renderer.locked = true;
                if(this.curOpenCluster){
                    //this.addFeatures([this.curOpenCluster]);
                    this.showOpenedCluster();
                    this.renderer.locked = true;
                    //this.curOpenCluster.style.display = "";
                    this.curOpenCluster = null;
                }
                if(!isVML){
                    this.clearOpenedPoints(this.openedPoints);
                }
                else{
                    openedPoints = this.openedPoints.concat([]);
                    this.lastOpenedPoints = openedPoints;
                }
                this.openedPoints = [];
                ps = f.children;

                if(this.maxDiffuseAmount>=ps.length){
                    for(var i=0;i<ps.length;i++){
                        p = this._makeFeature(ps[i],0,"#0F9FF2",2);
                        for(var j=0;j< p.length;j++){
                            p[j].isPoint = true;
                            this.openedPoints.push(p[j]);
                        }
                    }
                    this.curOpenCluster = f;
                    f.style.display = "none";
                    this.renderer.locked = false;
                    if(isVML){
                        this.addFeatures20(this.openedPoints,null,function(fs,me){
                            return function(){
                                me.clearOpenedPoints(fs);
                            }
                        }(openedPoints,this),"drawDiffusePointTimeout");
                    }
                    else{
                        this._addFeatures(this.openedPoints);
                    }
                }
                else{
                    if(isVML){
                        this.clearOpenedPoints(openedPoints);
                    }
                }
                this.renderer.locked = false;
            }
            catch(e){}
        }
    },

    /**
     * Method: clickoutCluster
     * 点击聚散点外的空白处所进行的操作
     */
    clickoutCluster:function(){
        try{
            var isVML = this.isVML();
            if(isVML){
                var ts = this.drawDiffusePointTimeout;
                if(ts.length>0){
                    this.clearTimeout(ts);
                    this.clearOpenedPoints(this.lastOpenedPoints);
                }
            }

            //this.clearTimeout(this.drawDiffusePointTimeout);
            //this.renderer.locked = true;
            //this.curOpenCluster.style.display = "";
            this.showOpenedCluster();
            this.clearOpenedPoints(this.openedPoints);
            this.openedPoints = [];
            //this.renderer.locked = false;
            //var f = this.makeCluster(this.curOpenCluster.children)

            //this.addFeatures([this.curOpenCluster]);
            this.curOpenCluster = null;
        }catch(e){}
    },
    /**
     * Method: showOpenedCluster
     * 显示刚才由于散开而隐藏的聚散点
     */
    showOpenedCluster:function(){
        if(this.curOpenCluster){
            if(this.curOpenCluster.style.display==="none"){
                this.curOpenCluster.style.display = "";
            }
            else{
                this.renderer.locked = true;
                this._addFeatures([this.curOpenCluster]);
                this.renderer.locked = false;
            }
        }
    },

    /**
     * Method: getIdxOfBounds
     * 根据网格算出一个bounds各个边所在网格的索引值
     */
    getIdxOfBounds:function(bounds,tileSizeLonlat,origin){
        var topLeft = {"x":bounds.left,"y":bounds.top};
        var rightBottom = {"x":bounds.right,"y":bounds.bottom};

        var a = this.getPointTileIdx(topLeft,tileSizeLonlat,origin);
        var minRowIdx = a[1];
        var minColIdx = a[0];
        a = this.getPointTileIdx(rightBottom,tileSizeLonlat,origin);
        var maxRowIdx = a[1];
        var maxColIdx = a[0];

        return {
            "minRowIdx":minRowIdx,
            "minColIdx":minColIdx,
            "maxRowIdx":maxRowIdx,
            "maxColIdx":maxColIdx
        };
    },

    /**
     * Method: getTileSizeLonlat
     * 计算每个网格在当前比例尺下的地理范围
     */
    getTileSizeLonlat:function(){
        var level = this.map.getZoom();
        var levelResolution = this.map.getResolutionForZoom(level);

        var tileSize = {
            "w":this.tolerance*2,
            "h":this.tolerance*2
        }
        var tileSizeLonlat = {"w":tileSize.w*levelResolution,"h":tileSize.h*levelResolution};

        return tileSizeLonlat;
    },

    /**
     * Method: getOrigin
     * 获取地图的地理上的左上角点
     */
    getOrigin:function(){
        if(!this.origin){
            var maxBounds = this.map.getMaxExtent();
            this.origin = {"x":maxBounds.left,"y":maxBounds.top};
        }

        return this.origin;
    },

    /**
     * Method: isMaxLeve
     * 判断当前比例尺是不是最大比例尺
     *
     * Returens:
     * {Boolean} 是否是最大级别
     * */
    isMaxLeve:function(){
        var is = false;
        try{
            var curZoom = this.map.getZoom();
            var length = this.map.baseLayer.resolutions.length;
            if(this.maxLevel!=null){
                length = this.maxLevel+1;
            }

            if(curZoom&&length){
                if(curZoom>=length-1){
                    is = true;
                }
            }
        }
        catch(e){}
        return is;
    },

    /**
     * Method: drawPointMap
     * 将pointMap中的要素绘制渲染出来。
     *
     * Parameters:
     * pointMap{Object<SuperMap.Feature.Vector>} pointMap对象
     */
    drawPointMap:function(pointMap,minRowIdx,minColIdx,maxRowIdx,maxColIdx){
        if(this.noDrawClusters){
            return;
        }

        var isMaxLeve = this.isMaxLeve();
        var toDrawFeatures = [];

        var clusterPoints=[];
        for(var i=minColIdx;i<=maxColIdx;i++){
            if(pointMap[i]){//&&minColIdx<=i&&maxColIdx>=i
                for(var j=minRowIdx;j<=maxRowIdx;j++){
                    if(pointMap[i][j]){//&&minRowIdx<=j&&maxRowIdx>=j
                        var points = pointMap[i][j];

                        if(points.length>=2&&!isMaxLeve){
                            var f = this.makeCluster(points);
                            clusterPoints.push(f);
                            if(this.curOpenCluster){
                                var g1 = this.curOpenCluster.geometry;
                                var g2 = f.geometry;
                                if(g1.x===g2.x&&g1.y===g2.y){
                                    this.curOpenCluster = f;
                                    f = null;
                                }
                            }
                            if(f){
                                toDrawFeatures = toDrawFeatures.concat(f);
                            }
                        }
                        else{
//                            for(var l=0;l<points.length;l++){
//                                var f = this._makeFeature(points[l],0,"#0F9FF2",4);
//                                for(var k=0;k< f.length;k++){
//                                    f[k].isPoint = true;
//                                    toDrawFeatures.push(f[k]);
//                                }
//                            }
                            toDrawFeatures = preparePoints(points,toDrawFeatures,this);
                            //toDrawFeatures = toDrawFeatures.concat(f);
                        }
                    }
                }
            }
        }
        var displayedPoints = pointMap["displayedPoints"];

        var clusterInfo={clusterPoints:clusterPoints,displayedPoints:displayedPoints};         //clusterInfo包含了聚散完成所需要的信息，其结构如下clusterInfo={clusterPoints:[],displayedPoints:[],element:null,object:null,type:"clusterEnd"}
                                                                                                   //其中，clusterMaps是包含了聚散点映射关系集合，clusterPoints[i]则表示第i个聚散点映射关系，其类型为{SuperMap.Feature.Vector}，其内的children属性包含有对应的实际点坐标
                                                                                                   //而displayedPoints则是用户所设定的某一范围内不需要被聚散的点集合
        this.events.triggerEvent("clusterend",clusterInfo);     //触发聚散完成事件

        if(displayedPoints&&displayedPoints.length>0){
            toDrawFeatures = preparePoints(displayedPoints,toDrawFeatures,this);
        }

        if(this.toDrawFeatures){
            this.removeFeatures(this.toDrawFeatures);
        }
        this.toDrawFeatures = toDrawFeatures;
        if(this.isVML()){
            this.addFeatures20(toDrawFeatures,null,null,"drawAllTimeout");
        }else{
            this._addFeatures(toDrawFeatures);
        }

        function preparePoints(points,toDrawFeatures,me){
            for(var l=0;l<points.length;l++){
                var f = me._makeFeature(points[l],0,"#0F9FF2",4);
                for(var k=0;k< f.length;k++){
                    f[k].isPoint = true;
                    toDrawFeatures.push(f[k]);
                }
            }

            return toDrawFeatures;
        }
    },

    /**
     * Method: _addFeatures
     * 给这个图层添加features,非聚散的形式显示。
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)}
     */
    _addFeatures: function(features, options) {
        if (!(SuperMap.Util.isArray(features))) {
            features = [features];
        }

        var notify = !options || !options.silent;
        if(notify) {
            var event = {features: features};
            var ret = this.events.triggerEvent("beforefeaturesadded", event);
            if(ret === false) {
                return;
            }
            features = event.features;
        }

        var featuresFailAdded = [];
        this.renderer.locked = true;

        for (var i=0, len=features.length; i<len; i++) {
            if (i === (len - 1)) {
                this.renderer.locked = false;
            }
            var feature = features[i];
            //如果设置了类型限制，则判断他。
            if (this.geometryType &&
                !(feature.geometry instanceof this.geometryType)) {
                throw new TypeError('addFeatures: component should be an ' +
                    this.geometryType.prototype.CLASS_NAME);
            }
            //给feature当前图层的引用。
            feature.layer = this;

            if (!feature.style && this.style) {
                feature.style = SuperMap.Util.extend({}, this.style);
            }

            // this.features[feature.id] = feature;
            this.features.push(feature);

            this.modifyVMLLabel(feature);
            //此时的feature是新添加的feature。
            var drawn = this.drawFeature(feature, undefined, {isNewAdd: true});

            this.drawTextVML(feature,drawn);
                //设置label的鼠标样式
                this.renderer.textRoot.style.cursor="pointer";

            //如果当前feature不可被绘制则加入到featuresFailAdded数组中。
            if(!drawn) {
                featuresFailAdded.push(feature);
            }
        }
        var succeed = featuresFailAdded.length == 0 ? true : false;
        this.events.triggerEvent("featuresadded", {features: featuresFailAdded, succeed: succeed});
    },

    /**
     * Method: addFeatures20
     * 给这个图层添加features，分批添加，一次十个，VML下有效。
     *
     * Parameters:
     * fs - {Array(<SuperMap.Feature.Vector>)}
     * center - {SuperMap.Geometry.Point} 这些feature的中心点，会根据距离中心的距离对features进行排序
     * callback - {Funciton} 将所有点绘制完成后的回调函数
     * timeout - {String} 存储timeout函数的句柄的字段名称
     */
    addFeatures20:function(fs,center,callback,timeout){
        var fs1 = fs.concat([]);
        if(center){
            center = {
                "lon":center.x,
                "lat":center.y
            };
        }
        var c = center||this.map.getCenter();
        fs1.sort(function(c){
            return function(a,b){
                return Math.abs(a.geometry.getBounds().left- c.lon)-Math.abs(b.geometry.getBounds().left- c.lon);
            }
        }(c));

        fs1.sort(function(a,b){
            var s1 = a.style;
            var s2 = b.style;
            s1.zIndex_c = s1.zIndex_c||0;
            s2.zIndex_c = s2.zIndex_c||0;
            return s1.zIndex_c-s2.zIndex_c;
        });
        add(fs1,this,callback,timeout);
        function add(fs,me,callback,timeout){
            if(fs.length>0){
                var fs1 = [];
                for(var i=0;i<10;i++){
                    var f = fs.shift();
                    if(f){
                        fs1.push(f);
                    }
                    else break;
                }
                me._addFeatures(fs1);
                time(fs,add,me,callback,timeout);
            }
            else{
                if(callback){
                    callback();
                }
                me[timeout] = [];
            }
        }

        function time(fs,fun,me,callback,timeout){
            var stt = window.setTimeout(function(fs,fun,me,callback,timeout){
                return function(){
                    fun(fs,me,callback,timeout);
                }
            }(fs,fun,me,callback,timeout),14);
            me[timeout].push(stt);
        }
    },

    /**
     * Method: clearTimeout
     * 清除timeout
     *
     * Parameters:
     * ts - {Array(<Object>)} 存储timeout句柄的数组
     */
    clearTimeout:function(ts){
        //var ds = this.drawTimeout;
        for(var i=0;i<ts.length;i++){
            window.clearTimeout(ts[i]);
        }
        ts = [];
    },

    /**
     * Method: drawTextVML
     * 修改VML下的标签的绘制方式，提高效率。
     *
     * Parameters:
     * feature - {SuperMap.Feature.Vector} 存储timeout句柄的数组\
     * drawn - {HTMLDOMElement} 绘制好的DOM对象
     */
    drawTextVML:function(feature,drawn){
        var fsy = feature.style;
        if(fsy){
            var l = fsy.clusterLabel;
            if(l&&drawn){
                var sizeH = fsy.pointRadius?fsy.pointRadius*2:(fsy.graphicWidth?fsy.graphicWidth:fsy.backgroundWidth);
                var sizeW = fsy.pointRadius?fsy.pointRadius*2:(fsy.graphicHeight?fsy.graphicHeight:fsy.backgroundHeight);
//                if(fsy.graphicWidth&&fsy.graphicWidth>sizeW){
//                    sizeW = fsy.graphicWidth;
//                }
//                if(fsy.graphicHeight&&fsy.graphicHeight>sizeH){
//                    sizeH = fsy.graphicHeight;
//                }
//                if(fsy.backgroundWidth&&fsy.backgroundWidth>sizeW){
//                    sizeW = fsy.backgroundWidth;
//                }
//                if(fsy.backgroundHeight&&fsy.backgroundHeight>sizeH){
//                    sizeH = fsy.backgroundHeight;
//                }
                var sp = document.createElement("span");
                var s = sp.style;
                s.textAlign = "center";
                s.lineHeight = sizeH+"px";
                s.width =  sizeW+"px";
                s.display = "inline-block";
                s.color = fsy.fontColor||"#000";
                if(fsy.labelXOffset||fsy.labelYOffset){
                    s.position = "relative";
                    if(fsy.labelXOffset){
                        s.left = fsy.labelXOffset + "px";
                    }
                    if(fsy.labelYOffset){
                        s.top = (-1*fsy.labelYOffset) + "px";
                    }
                }
                sp._featureId = feature.id;
                sp._geometryClass = feature.geometry.CLASS_NAME;
                var txt = document.createTextNode(l);
                sp.appendChild(txt);
                drawn.appendChild(sp);
            }
        }
    },

    /**
     * Method: drawTextVML
     * 修改VML下的标签的绘制方式，提高效率。
     */
    modifyVMLLabel:function(feature){
        if(this.isVML()&&feature.isCluster){//icl526
            var s = feature.style;
            if(s){
                var label = s.label;
                if(label){
                    s.label = null;
                    s.labelSelect = null;
                    s.clusterLabel = label;
                }
            }
        }
    },

    /**
     * Method: makeCluster
     * 组织创建cluster对象
     *
     * Parameters:
     * points{Array<SuperMap.Feature.Vector>} 需要聚散在一起的要素数组
     *
     * Returns:
     * {SuperMap.Feature.Vector} 组织好的cluster要素
     */
    makeCluster:function(points){
        var center = this.getTileCenter(points);
        var f,me = this;

        for(var i=0;i<this.clusterStyles.length;i++){
            var a = this.clusterStyles[i];
            if(a.count === "moreThanMax"){
                f = createCluster(center, a.style, points.length, points, this);
            }
            else{
                if(a.count>=points.length){
                    //f = a.getFeature(center,points);
                    f = createCluster(center, a.style, points.length, points, this);
                    break;
                }
            }
        }

        return f;

        function createCluster(center,style,count,children,me){
            var f = new SuperMap.Feature.Vector();
            f.geometry = new SuperMap.Geometry.Point(center.x, center.y);
            //f.geometry = new SuperMap.Geometry.Rectangle(center.x, center.y, s, s);
            f.style = SuperMap.Util.JSONClone(null,style);
            if(count){
                f.style.label = count+"";
                f.style.labelSelect = true;
//                var bro = SuperMap.Util.getBrowser();
//                if(bro.name==="msie"&&bro.version==="9.0"){
//                    if(f.style.labelYOffset==undefined){
//                        f.style.labelYOffset = -5;
//                    }
//                    else{
//                        f.style.labelYOffset += -5;
//                    }
//                }
            }
            if(children){
                f.children = children;
                f.isCluster = true;
            }

            if(me.isVML()&&(style.externalGraphic||style.backgroundGraphic)){
                f.style.fillColor = "none";
            }

            return f;
        }
    },

    /**
     * Method:_makeFeature
     * 内部方法，组织要素的样式
     *
     * Parameters:
     * point {SuperMap.Feature.Vector} 即将要绘制的要素
     * count {Number} 若该要素是聚散点，则表示该聚散点聚散了多少个小点
     * color {String} 颜色值
     * radius {Number} 半径
     * ps {Array<SuperMap.Feature.Vector>} 聚散的小点数组
     *
     * Returns:
     * {SuperMap.Feature.Vector} 组织好的要素
     * */
    _makeFeature:function(point,count,color,radius,ps){
        if(point.geometry){
            var f1 = this.assembleFeature(point);
            if(f1.length){
                var f = [];
                for(var i=0;i< f1.length;i++){
                    var f2 = f1[i].clone();
                    f2.isPoint = true;
                    f2.info = f1[i].info;
                    f2.attributes = f1[i].attributes;
                    f.push(f2);
                }
            }
            else{
                var f2 = f1.clone();
                f2.isPoint = true;
                f2.info = f1.info;
                f2.attributes = f1.attributes;
                var f = [f2];
            }
        }
        else{
            var f = new SuperMap.Feature.Vector();
            f.geometry = new SuperMap.Geometry.Point(point.x, point.y);
            f.style = {
                strokeColor: "#fff",
                strokeOpacity: 0.8,
                strokeDashstyle: "solid",
                fillColor: color||"#00f",
//                pointRadius: radius||5,
                fillOpacity:0.7,
                fontColor:"#fff"
            };
            f.style.strokeWidth = 1;
            if(count){
                f.style.label = count+"";
//                var bro = SuperMap.Util.getBrowser();
//                if(bro.name==="msie"&&bro.version==="9.0"){
//                    if(f.style.labelYOffset==undefined){
//                        f.style.labelYOffset = -5;
//                    }
//                    else{
//                        f.style.labelYOffset += -5;
//                    }
//                }
            }
            if(ps){
                f.children = ps;
                f.isCluster = true;
            }
            f = [f];
        }
        //this.renderer.drawFeature(f);
        return f;
    },

    /**
     * Method:clearOpenedPoints
     * 清除已经散开的要素
     * */
    clearOpenedPoints:function(fs){
        if(fs&&fs.length>0){
            //var fs = this.openedPoints.concat([]);
//            window.setTimeout(function(fs,me){
//                return function(){
//                    me.removeFeatures(fs);
//                }
//            }(fs,this),100);
            this.removeFeatures(fs);
            //this.openedPoints = [];
        }
    },

    /**
     * Method:getPointTileIdx
     * 计算一个要素在网格中的索引值
     *
     * Parameters:
     * feature {SuperMap.Feature.Vector} feature对象
     * size {SuperMap.Size} 每个网格的大小
     * origin {SuperMap.Feature.Point} 地图的起始点
     *
     * returns:
     * {Array<Object>} 描述索引信息的数组
     * */
    getPointTileIdx:function(feature,size,origin){
        var point = feature.geometry||feature;
        var x = Math.floor((point.x-origin.x)/size.w);
        var y = Math.floor((origin.y - point.y)/size.h);

        return [y,x,feature];
    },

    /**
     * Method:getTileCenter
     * 获取一个组要素的中心点，作为聚散点的坐标
     *
     * Parameters:
     * points {Array<SuperMap.Feature.Vector>} 被聚散的feature对象
     *
     * returns:
     * {SuperMap.Feature.Vector} 中心点
     * */
    getTileCenter:function(points){
        var f = points[0];
        f = f.geometry;
        var len=points.length;
        var x= f.x;
        var y= f.y;
        for(var i=1;i<len;i++){
            x = x+points[i].geometry.x;
            y = y+points[i].geometry.y;
        }
        x=x/len;
        y=y/len;
        return {x:x,y:y};
    },

    getDataExtent: function () {
        if(this.isFeatureChanged){
            this.isFeatureChanged = false;
            var maxExtent = null;
            var features = this.clusterPoints;
            if(features) {
                var geometry = null;
                for(var id in features) {
                    geometry = features[id].geometry;
                    if (geometry) {
                        if (maxExtent === null) {
                            maxExtent = new SuperMap.Bounds();
                        }
                        maxExtent.extend(geometry.getBounds());
                    }
                }
            }
            this.dataExtent = maxExtent;
        }

        return this.dataExtent;
    },

    CLASS_NAME: "SuperMap.Layer.ClusterLayer"
});