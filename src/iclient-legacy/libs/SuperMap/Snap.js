/**
 * Class: SuperMap.Snap
 * 捕捉类，在绘制以及编辑要素时，将捕捉类开启，则会捕捉的效果，即鼠标点在某一要素附近时，绘制点或者编辑点会被捕捉到要素上去
 */
SuperMap.Snap=SuperMap.Class({

    /**
     * APIProperty: snapLayers
     * {array} 需要进行捕捉的要素图层
     * */
    snapLayers:[],

    maxTolerance:Infinity,

    keydown:false,

    pointTolerance:0,

    lineTolerance:0,

    /**
     * APIProperty: eventType
     * {array} 事件类型，本类支持的事件类型有"snapping"
     * */
    eventType:["snapping"],

    /**
     * APIProperty: events
     * {<Supermap.Events>} 事件管理器，用于注册或者注销snap的snapping事件
     * */
    events:null,

    /**
     * Constructor: SuperMap.Snap
     * 捕捉类构造函数
     *
     * Parameters:
     * snapLayers - {<array>}  捕捉图层，其类型为SuperMap.Layer.Vector
     * pointTolerance - {Number}  点要素的捕捉容限
     * lineTolerance - {Number}  线要素的捕捉容限
     * options: 附加参数
     * */
    initialize:function(snapLayers,pointTolerance,lineTolerance,options){
        if(options&&options.maxTolerance){
            this.setMaxTolerance(options.maxTolerance);
        }
        this.setSnapLayers(snapLayers);
        this.setPointTolerance(pointTolerance);
        this.setLineTolerance(lineTolerance);
        this.setOptions(options);

        this.events=new SuperMap.Events(this,null,this.eventType);
    },

    /**
     * APIMethod: on
     * 打开捕捉，这时可对要素进行捕捉
     * */
    on:function(){
        this.active=true;
    },

    /**
     * APIMethod: off
     * 关闭捕捉，这时无捕捉效果
     * */
    off:function(){
        this.active=false;
    },

    /**
     * APIMethod: switchSnap
     * 切换捕捉开关，将关闭状态切换为开启状态，或者反过来
     * */
    switchSnap:function(){
        this.active?this.off():this.on();
    },

    /**
     * APIMethod: setPointTolerance
     * 设置点要素的捕捉容限
     * */
    setPointTolerance:function(num){
        if(!isNaN(num)){
            if(num>this.maxTolerance){
                num=this.maxTolerance;
            }
            this.pointTolerance=num;
        }
        else{
            this.pointTolerance=SuperMap.Snap.DEFAULT_TOLERANCE;
        }
    },

    /**
     * APIMethod: setLineTolerance
     * 设置线要素的捕捉容限
     * */
    setLineTolerance:function(num){
        if(!isNaN(num)){
            if(num>this.maxTolerance){
                num=this.maxTolerance;
            }
            this.lineTolerance=num;
        }
        else{
            this.lineTolerance=SuperMap.Snap.DEFAULT_TOLERANCE;
        }
    },

    /**
     * APIMethod: setMaxTolerance
     * 设置容限上限
     * */
    setMaxTolerance:function(num){
        if(!isNaN(num)){
            this.maxTolerance=num;
        }
        else{
            this.maxTolerance=SuperMap.Snap.MAX_TOLERANCE;
        }
    },

    /**
     * APIMethod: setSnapLayers
     * 设置要进行捕捉的图层
     *
     * Parameters:
     * layers:{<array>} 图层集合
     * */
    setSnapLayers:function(snapLayers){
        if(snapLayers&&snapLayers.length>0){
             this.snapLayers=snapLayers;
        }
        else{
            this.off();
        }
    },

    setOptions:function(options){
        options.actived?this.on():this.off();
        options.maxTolerance?this.maxTolerance=options.maxTolerance:this.maxTolerance=SuperMap.Snap.MAX_TOLERANCE;
    },

    /**
     * APIMethod: beginSnap
     * 开始进行捕捉，返回捕捉到的点或者原来的点
     *
     * Parameters:
     * lonLat: {<SuperMap.LonLat>} 与要素图层坐标系一致的地理坐标
     *
     * Return:
     * resultLonLat: {<SuperMap.LonLat>} 捕获到的点的地理坐标，若没有捕获到则返回原来的点的地理坐标
     * */
    beginSnap:function(lonLat){
        if(this.active){
            var resultLonLat=lonLat;
            var tolerance=Math.max(this.pointTolerance,this.lineTolerance);
            var geoTolerance=tolerance*this.getResolution();

            var geoPoint=new SuperMap.Geometry.Point(lonLat.lon,lonLat.lat);
            var resultGeoPoint=geoPoint;

            for(var i= 0,len0=this.snapLayers.length;i<len0;i++){
                var layer=this.snapLayers[i];
                if(layer instanceof SuperMap.Layer.Vector&&layer.visibility){
                    for(var j= 0,len1=layer.features.length;j<len1;j++){
                        var feature=layer.features[j];
                        var geometry=feature.geometry;
                        if(feature.state!==SuperMap.State.DELETE&&feature.atPoint(lonLat,geoTolerance,geoTolerance)){
                        switch(geometry.CLASS_NAME){
                            case "SuperMap.Geometry.Point":
                            case "SuperMap.REST.PointWithMeasure":
                                resultGeoPoint=this.snapPoint(geometry,geoPoint);
                                break;
                            case "SuperMap.Geometry.MultiPoint":
                                for(var k= 0,len00=geometry.components.length;k<len00;k++){
                                    resultGeoPoint=this.snapPoint(geometry.components[k],geoPoint);
                                    if(!resultGeoPoint.equals(geoPoint)){
                                        break;
                                    }
                                }
                                break;
                            case "SuperMap.Geometry.LineString":
                            case "SuperMap.REST.Route":
                                resultGeoPoint=this.snapLine(geometry,geoPoint);
                                break;
                            case "SuperMap.Geometry.MultiLineString":
                                for(var k= 0,len00=geometry.components.length;k<len00;k++){
                                    resultGeoPoint=this.snapLine(geometry.components[k],geoPoint);
                                    if(!resultGeoPoint.equals(geoPoint)){
                                        break;
                                    }
                                }
                                break;
                            case "SuperMap.Geometry.Polygon":
                                resultGeoPoint=this.snapPolygon(geometry,geoPoint);
                                break;
                            case "SuperMap.Geometry.MultiPolygon":
                                for(var k= 0,len00=geometry.components.length;k<len00;k++){
                                    resultGeoPoint=this.snapPolygon(geometry.components[k],geoPoint);
                                    if(!resultGeoPoint.equals(geoPoint)){
                                        break;
                                    }
                                }
                                break;
                            default:break;
                        }
                        }
                        resultLonLat=new SuperMap.LonLat(resultGeoPoint.x,resultGeoPoint.y);
                        if(!resultGeoPoint.equals(geoPoint)){
                            return resultLonLat;
                        }
                    }
                }
            }
            this.events.triggerEvent("snapping",{orgin:geoPoint,result:resultGeoPoint});
            return resultLonLat;
        }
        else{
            return lonLat;
        }
    },

    snapPoint:function(geometry,geoPoint){
        var res=this.getResolution();
        var geoTolerance=this.pointTolerance*res;

        var distance=geometry.distanceTo(geoPoint);
        if(distance<geoTolerance){
            return geometry;
        }
        return geoPoint;
    },

    snapLine:function(geometry,geoPoint){
        var res=this.getResolution();
        var geoTolerance=this.lineTolerance*res;

        var vertices=geometry.getVertices();
        for(var i= 0,len=vertices.length;i<len;i++){
            var point=this.snapPoint(vertices[i],geoPoint);
            if(!point.equals(geoPoint)){
                return point;
            }
        }

        var result=geometry.distanceTo(geoPoint,{details:true});
        var distance=result.distance;

        if(distance<geoTolerance){
            return new SuperMap.Geometry.Point(result.x0,result.y0);
        }
        return geoPoint;
    },

    snapPolygon:function(geometry,geoPoint){
        return this.snapLine(geometry,geoPoint);
    },
    /**
     * Method: getResolution
     * 获取分辨率
     * */
    getResolution:function(){
        var res;
        for(var i = 0;i<this.snapLayers.length;i++)
        {
            if(this.snapLayers[i].map)
            {
                res=this.snapLayers[i].map.getResolution();
                break;
            }
        }
        if(res ==undefined)
        {
            res = this.snapLayers[0].getResolution();
        }
        return res;
    },
    /**
     * APIMethod: destroy
     * 释放捕捉对象的资源
     * */
    destroy:function(){
        this.off();
        delete this.snapLayers;
        delete this.pointTolerance;
        delete this.lineTolerance;
    },

    CLASS_NAME:"SuperMap.Snap"
});

SuperMap.Snap.DEFAULT_TOLERANCE=5;
SuperMap.Snap.MAX_TOLERANCE=500;