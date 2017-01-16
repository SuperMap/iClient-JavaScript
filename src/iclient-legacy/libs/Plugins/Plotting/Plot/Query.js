/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/
 * @requires SuperMap/
 */
/**
 * Class: SuperMap.Plot.Query
 * 查询分析类，提供判断图形对象和点、线的位置关系。
 */
SuperMap.Plot.Query = new SuperMap.Class({

    /**
     * Property: map
     * {SuperMap.Map}
     */
    map: null,

    /**
     * APIProperty: activeLayer
     * {<SuperMap.Layer.PlottingLayer>} 可查询分析对象所在图层，未设置取第一个可编辑图层。
     */
    activeLayer: null,

    /**
     * Constructor: SuperMap.Plot.Query
     * 构建一个查询分析类。
     *
     * Parameters:
     * map - <SuperMap.Map>。
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Plot.Query>}  结果类型对象。
     */
    initialize: function(map, options){
        if(map && map !== null){
            this.map = map;
        }

        if(options && options.activeLayer){
            this.activeLayer = options.activeLayer;
        }
    },

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。
     */
    destroy: function() {
        this.map = null;
        this.activeLayer = null;
    },

    /**
     * Method: getActiveLayer
     * 设置当前激活图层为第一个可编辑图层。
     */
    getActiveLayer:function(){
        if(this.activeLayer === null){
            var layers = this.map.layers;
            for(var n = 0;n < layers.length; n++){
                if(layers[n].isEditable) {
                    this.activeLayer = layers[n];
                    break;
                }
            }
        }
    },
   
    /**
     * APIMethod: captureGObject
     * 查询指定位置的所有图形。
     *
     * Parameters:
     * point - {<SuperMap.Geometry.Point>}指定的点坐标，如{x:100, y:200}，坐标值的含义是屏幕坐标
     *
     * Returns:
     * {<SuperMap.Feature.Vector>}  位于指定屏幕坐标的图形对象，如果没有位该点的图形对象，则返回null。
     */
    captureGObject: function(point) {
        var result = null;
        var pt = this.map.getLonLatFromPixel(point);
        var pointxy = new SuperMap.Geometry.Point(pt.lon,pt.lat);
        this.getActiveLayer();
        //var features = this.activeLayer.features;
        //for(var i = 0;i < features.length; i++){
        //    var feature = features[i];
        //    var aryComponents = feature.geometry.components;
        //    var bcontain = false;
        //    for(var n = 0;n < aryComponents.length; n++){
        //        if(aryComponents[n].CLASS_NAME === "SuperMap.Geometry.LineString"){
        //            if(aryComponents[n].intersects(pointxy)){
        //                bcontain = true;
        //                break;
        //            }
        //        }
        //        else if(aryComponents[n].containsPoint(pointxy)){
        //            bcontain = true;
        //            break;
        //        }
        //    }
        //    if(bcontain === true){
        //        result = feature;
        //        break;
        //    }
        //}

        if(this.activeLayer instanceof SuperMap.Layer.PlottingLayer){
            result = this.activeLayer.selectFeatureByPoint(pointxy);
        }

        return result;
    },

    /**
     * APIMethod: getGObjectsInPolygon
     * 获取多边形区域内的图形对象。
     *
     * Parameters:
     * point - {Array(<SuperMap.Geometry.Point>)}指定的多边形的点坐标，坐标值的含义是屏幕坐标
     *
     * Returns:
     * {Array(<SuperMap.Feature.Vector>)} 位于多边形内的图形对象集合，如果没有位于多边形内的图形，则返回空数组。
     */
    getGObjectsInPolygon: function(point,count){
        var result = [];
        var pointLL = [];
        for(var i = 0;i < point.length; i++) {
            var pt = this.map.getLonLatFromPixel(point[i]);
            var pointxy = new SuperMap.Geometry.Point(pt.lon,pt.lat);
            pointLL.push(pointxy);
        }
       var linearRings = new SuperMap.Geometry.LinearRing(pointLL);
       var  region = new SuperMap.Geometry.Polygon([linearRings]);

        this.getActiveLayer();
        var features = this.activeLayer.features;
        for(var i = 0;i < features.length; i++){
            var feature = features[i];
            //var aryComponents = feature.geometry.components;
            //var bcontain = false;
            //for(var n=0;n<aryComponents.length;n++){
            //    if(region.containsPoint(aryComponents[n].getCentroid())){
            //        bcontain = true;
            //        break;
            //    }
            //}
            //if(bcontain === true){
            //    result.push(feature);
            //
            //}

            var featureCenterPt = this.getFeatureCenter(feature);
            if(null === featureCenterPt){
                continue;
            }

            if (region.containsPoint(featureCenterPt)) {
                result.push(feature);
            }
        }
        return result;
    },

    /**
     * APIMethod: captureGObject
     * 获取圆区域内的图形对象。
     *
     * Parameters:
     * centerX - {double} 圆心x坐标值，坐标值含义为屏幕坐标。
     * centerY - {double} 圆心y坐标值，坐标值含义为屏幕坐标。
     * radius - {double} 圆半径
     *
     * Returns:
     * {Array(<SuperMap.Feature.Vector>)} 位于圆形内的图形对象集合，如果没有位于圆形内的图形，则返回空数组。
     */
    getGObjectsInCircle: function(centerX, centerY, radius){
        var result = [];

        var pnt1 = this.map.getLonLatFromPixel(new SuperMap.Geometry.Point(centerX, centerY));
        var pnt2 = this.map.getLonLatFromPixel(new SuperMap.Geometry.Point(centerX+radius, centerY));

        var pt1xy = new SuperMap.Geometry.Point(pnt1.lon,pnt1.lat);
        var pt2xy = new SuperMap.Geometry.Point(pnt2.lon,pnt2.lat);
        var dRadius = SuperMap.Plot.PlottingUtil.distance(pt1xy,pt2xy);

        this.getActiveLayer();
        var features = this.activeLayer.features;
        for(var i = 0;i < features.length; i++){
            var feature = features[i];
            //var aryComponents = feature.geometry.components;
            //var bcontain = false;
            //for(var n=0;n<aryComponents.length;n++){
            //    var ptCentroid = aryComponents[n].getCentroid();
            //    var dis = (ptCentroid.x-pt1xy.x)*(ptCentroid.x-pt1xy.x)+(ptCentroid.y-pt1xy.y)*(ptCentroid.y-pt1xy.y);
            //    if(Math.sqrt(dis) < Math.sqrt(dRadius)){
            //        bcontain = true;
            //        break;
            //    }
            //}
            //if(bcontain === true){
            //    result.push(feature);
            //}

            var pt = this.getFeatureCenter(feature);
            if(null === pt){
                continue;
            }

            if(Math.abs(dRadius) > Math.abs(SuperMap.Plot.PlottingUtil.distance(pt,pt1xy))){
                result.push(feature);
            }
        }
        return result;
    },

    /**
     * APIMethod: captureGObject
     *  获取矩形区域内的图形对象。
     *
     * Parameters:
     * x - {double} 矩形区域左上角x坐标值，坐标值含义为屏幕坐标。
     * y - {double} 矩形区域左上角y坐标值，坐标值含义为屏幕坐标。
     * w - {double} 矩形区域宽度
     * h - {double} 矩形区域高度
     *
     * Returns:
     * {Array(<SuperMap.Feature.Vector>)} 位于矩形内的图形对象集合，如果没有位于矩形内的图形，则返回空数组。
     */
    getGObjectsInRect: function(x, y, w, h){
        var result = [];
        var pt1 = this.map.getLonLatFromPixel(new SuperMap.Geometry.Point(x, y));
        var pt4 = this.map.getLonLatFromPixel(new SuperMap.Geometry.Point(x+w, y+h));

        this.getActiveLayer();
        var features = this.activeLayer.features;
        for(var i = 0;i < features.length; i++){
            var feature = features[i];
            //var aryComponents = feature.geometry.components;
            //var bcontain = false;
            //for(var n = 0;n < aryComponents.length; n++){
            //    var ptCentroid = aryComponents[n].getCentroid();
            //
            //    if((ptCentroid.x > pt1.lon &&
            //        ptCentroid.x < pt4.lon &&
            //        ptCentroid.y < pt1.lat &&
            //        ptCentroid.y > pt4.lat))
            //    {
            //        bcontain = true;
            //        break;
            //    }
            //}
            //if(bcontain===true){
            //    result.push(feature);
            //}

            var featureCenterPt = this.getFeatureCenter(feature);
            if(null === featureCenterPt){
                continue;
            }

            if((featureCenterPt.x > pt1.lon &&
                featureCenterPt.x < pt4.lon &&
                featureCenterPt.y < pt1.lat &&
                featureCenterPt.y > pt4.lat)) {
                result.push(feature);
            }
        }
        return result;
    },


    getFeatureCenter: function(feature){
        if(!feature || !feature.geometry){
            return null;
        }

        var bounds = feature.geometry.getBounds();
        if(!bounds){
            return null;
        }

        return new SuperMap.Geometry.Point((bounds.left+bounds.right)/2, (bounds.top+bounds.bottom)/2);
    },

    CLASS_NAME: "SuperMap.Plot.Query"
});