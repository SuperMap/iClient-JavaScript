/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/Geometry/Collection.js
 * @requires SuperMap/REST/NetworkAnalyst/PointWithMeasure.js
 */

/**
 * Class: SuperMap.REST.Route
 * 路由对象类。
 * 路由对象为一系列有序的带有属性值 M 的 x，y 坐标对，其中 M 值为该结点的距离属性（到已知点的距离）。
 *
 *  Inherits from:
 *  - <SuperMap.Geometry.Collection>
 */
SuperMap.REST.Route = SuperMap.Class(SuperMap.Geometry.Collection, {

    /**
     * APIProperty: id
     * {Number} 路由对象在数据库中的id。
     * 。
     */
    id: null,
    /**
     * Property: center
     */
    center: null,
    /**
     * Property: style
     */
    style: null,

    /** 
     * APIProperty: length
     * {Number} 路由对象的长度。
     * 单位与数据集的单位相同。 
     */
    length: null,

    /**
     * APIProperty: maxM
     * {Number} 最大线性度量值，即所有结点到起始点的量算距离中最大值。
     */
    maxM: null,

    /** 
     * APIProperty: minM
     * {Number} 最小线性度量值，即所有结点到起始点的量算距离中最小值。
     */
    minM: null,

    /**
     * Property: parts
     * {Array(Number)} 服务端几何对象中各个子对象所包含的节点个数。
     */
    parts: null,
    /**
     * Property: points
     * {Array(Object)} 路由对象的所有路由点。
     * (start code)
     * [
     *  {
     *      "measure": 0,
     *      "y": -4377.027184298267,
     *      "x": 4020.0045221720466
     *  },
     *  {
     *      "measure": 37.33288381391519,
     *      "y": -4381.569363260499,
     *      "x": 4057.0600591960642
     *  }
     * ]
     * (end)
     */
    points: null,

    /**
     * APIProperty: type
     * {<String>} 服务端几何对象类型。
     */
    type: null,

    /**
     * APIProperty: components
     * {Array(<SuperMap.Geometry>)} 存储几何对象的数组。
     */
    components: null,
    /**
     * Property: componentTypes
     */
    componentTypes: ["SuperMap.Geometry.LinearRing","SuperMap.Geometry.LineString"],

    /**
     * Constructor: SuperMap.REST.Route
     * 路由对象类构造函数。
     *
     * Parameters:
     * components - {Array(<SuperMap.Geometry.LinearRing> or <SuperMap.Geometry.LineString>)} 形成路由对象的线数组
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * id - {Number} 路由对象在数据库中的id。
     * length - {Number} 路由对象的长度。
     * maxM - {Number} 最大线性度量值，即所有结点到起始点的量算距离中最大值。
     * minM - {Number} 最小线性度量值，即所有结点到起始点的量算距离中最小值。
     * type - {String} 数据类型，如："LINEM"
     */
    initialize: function(points, options) {
        SuperMap.Geometry.Collection.prototype.initialize.apply(this,
            arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    /**
     * Method: toJson
     * 转换为json对象。
     */
    toJson:function(){
        var result = "{";
        if(this.id!=null && this.id!=undefined)
        {
            result+= "\"id\":"+this.id+",";
        }
        if(this.center!=null && this.center!=undefined)
        {
            result+="\"center\":"+this.center+",";
        }
        if(this.style!=null && this.style!=undefined)
        {
            result+="\"style\":"+this.style+",";
        }
        if(this.length!=null && this.length!=undefined)
        {
            result+="\"length\":"+this.length+",";
        }
        if(this.maxM!=null && this.maxM!=undefined)
        {
            result+="\"maxM\":"+this.maxM+",";
        }
        if(this.minM!=null && this.minM!=undefined)
        {
            result+="\"minM\":"+this.minM+",";
        }
        if(this.type!=null && this.type!=undefined)
        {
            result+="\"type\":\""+this.type+"\",";
        }
        if(this.parts!=null && this.parts!=undefined)
        {
            result+="\"parts\":["+this.parts[0];

            for(var i = 1;i<this.parts.length;i++)
            {
                result+=","+this.parts[i];
            }
            result+="],";
        }
        if(this.components!=null && this.components.length>0)
        {
            result+="\"points\":["
            for(var j = 0,len=this.components.length;j<len;j++)
            {
                for(var k = 0,len2 = this.components[j].components.length;k<len2;k++)
                {
                    result+= this.components[j].components[k].toJson()+",";
                }
            }
            result = result.replace(/,$/g,'');
            result+="]";
        }
        result = result.replace(/,$/g,'');
        result +="}";
        return result;
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        var me = this;
        me.id = null;
        me.center = null;
        me.style = null;
        me.length = null;
        me.maxM = null;
        me.minM = null;
        me.type = null;
        me.parts = null;
        this.components.length = 0;
        this.components = null;
        this.componentTypes = null;
    },
    
    CLASS_NAME: "SuperMap.REST.Route"
});

/**
 * Function: SuperMap.REST.Route.fromJson
 * 将 JSON 对象转换为 Route 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的路由对象。 
 *
 * Returns:
 * {<SuperMap.REST.Route>} 转化后的 Route 对象。
 */
SuperMap.REST.Route.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }

    var
        geoParts = jsonObject.parts || [],
        geoPoints = jsonObject.points||[],
        len = geoParts.length,
        lineList = [];
    if (len > 0) {
        for (var i=0, pointIndex=0, pointList=[]; i<len; i++) {
            for (var j=0; j<geoParts[i]; j++) {
                pointList.push(SuperMap.REST.PointWithMeasure.fromJson(geoPoints[pointIndex+j]));
            }
            pointIndex += geoParts[i];
            //判断线是否闭合，如果闭合，则返回LinearRing，否则返回LineString
            if (pointList[0].equals(pointList[geoParts[i]-1])){
                lineList.push(new SuperMap.Geometry.LinearRing(pointList));
            }else{
                lineList.push(new SuperMap.Geometry.LineString(pointList));
            }
            pointList = [];
        }

    } else {
        return null;
    }

    var result = new SuperMap.REST.Route(lineList, {
        id:jsonObject.id,
        center:jsonObject.center,
        style:jsonObject.style,
        length: jsonObject.length,
        maxM: jsonObject.maxM,
        minM: jsonObject.minM,
        type: jsonObject.type,
        parts: jsonObject.parts
    });
    return result;
};