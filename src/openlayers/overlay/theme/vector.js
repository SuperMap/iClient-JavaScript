var ol = require('openlayers');
var SuperMap = require('../../../common/SuperMap');

ol.supermap.Vector = function (data, layer, style, options, shapeOptions) {
    SuperMap.Feature.Theme.prototype.initialize.apply(this, arguments);

    //数据的 geometry 属性必须存在且类型是 SuperMap.Geometry 或其子类的类型
    if (!data.geometry) return;
    if (!(data.geometry instanceof SuperMap.Geometry)) return;
    this.style = style ? style : {};
    this.data = data;

    if (options) {
        SuperMap.Util.copyAttributesWithClip(this, options, ["shapeOptions", "dataBounds"])
    }
    ;
    if (shapeOptions) {
        this.shapeOptions = {};
        SuperMap.Util.copyAttributesWithClip(this.shapeOptions, shapeOptions);
    }
    ;

    //设置基础参数 dataBounds、lonlat、location
    var geometry = data.geometry;
    this.dataBounds = geometry.getBounds();
    this.lonlat = this.dataBounds.getCenterLonLat();
    this.location = this.getLocalXY(this.lonlat);

    //将地理要素转为专题要素
    if (geometry instanceof SuperMap.Geometry.LinearRing) {
        this.lineToTF(geometry);
    }
    else if (geometry instanceof SuperMap.Geometry.LineString) {
        this.lineToTF(geometry);
    }
    else if (geometry instanceof SuperMap.Geometry.Curve) {
        //独立几何体
    }
    else if (geometry instanceof SuperMap.Geometry.MultiPoint) {
        this.multiPointToTF(geometry);
    }
    else if (geometry instanceof SuperMap.Geometry.MultiLineString) {

        this.multiLineStringToTF(geometry);
    }
    else if (geometry instanceof SuperMap.Geometry.MultiPolygon) {
        this.multiPolygonToTF(geometry);
    }
    else if (geometry instanceof SuperMap.Geometry.Polygon) {
        this.polygonToTF(geometry);
    }
    else if (geometry instanceof SuperMap.Geometry.Collection) {
        //独立几何体
    }
    else if (geometry instanceof SuperMap.Geometry.Point) {
        this.pointToTF(geometry);
    }
    else if (geometry instanceof SuperMap.Geometry.Rectangle) {
        this.rectangleToTF(geometry);
    }
    else if (geometry instanceof SuperMap.Geometry.GeoText) {
        this.geoTextToTF(geometry);
    }
};

ol.supermap.Vector.prototype.destroy = function () {
    this.style = null;
    this.dataBounds = null;
    this.nodesClipPixel = null;
    this.isHoverAble = null;
    this.isMultiHover = null;
    this.isClickAble = null;
    this.highlightStyle = null;
    this.shapeOptions = null;

    SuperMap.Feature.Theme.prototype.destroy.apply(this, arguments);
};

ol.supermap.Vector.prototype.lineToTF = function (geometry) {
    var components = geometry.components;

    //节点像素坐标
    var localLX = [];
    //参考位置，参考中心为
    var refLocal = [];
    var location = this.location;
    var pointList = [];

    //节点抽稀距离
    var nCPx = this.nodesClipPixel;

    for (var i = 0; i < components.length; i++) {
        var components_i = components[i];
        refLocal = [];
        localLX = [];

        localLX = this.getLocalXY(components_i);

        refLocal[0] = localLX[0] - location[0];
        refLocal[1] = localLX[1] - location[1];

        //抽稀 - 2 px
        if (pointList.length > 0) {
            var lastLocalXY = pointList[pointList.length - 1];
            if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) continue;
        }

        //使用参考点
        pointList.push(refLocal);
    }

    if (pointList.length < 2) {
        return null;
    }

    //赋 style
    var style = new Object();
    style = SuperMap.Util.copyAttributesWithClip(style, this.style, ['pointList']);
    style.pointList = pointList;

    //创建图形
    var shape = new SuperMap.LevelRenderer.Shape.SmicBrokenLine({
        style: style,
        clickable: this.isClickAble,
        hoverable: this.isHoverAble
    });

    //设置高亮样式
    if (this.highlightStyle) {
        shape.highlightStyle = this.highlightStyle;
    }

    //设置参考中心，指定图形位置
    shape.refOriginalPosition = this.location;

    //储存数据 id 属性，用于事件
    shape.refDataID = this.data.id;

    //储存数据 id 属性，用于事件-多图形同时高亮
    shape.isHoverByRefDataID = this.isMultiHover;

    //添加到渲染器前修改 shape 的一些属性，非特殊情况通常不允许这么做
    if (this.shapeOptions) {
        SuperMap.Util.copyAttributesWithClip(shape, this.shapeOptions);
    }

    this.shapes.push(shape);
};

ol.supermap.Vector.prototype.multiPointToTF = function (geometry) {
    /*   //-- 不抽稀
     var components = geometry.components;

     for(var i = 0; i < components.length; i++){
     var components_i = components[i];
     this.pointToTF(components_i);
     }
     */

    var components = geometry.components;

    //节点像素坐标
    var localLX = [];
    //参考位置，参考中心为
    var refLocal = [];
    var location = this.location;
    var pointList = [];

    //节点抽稀距离
    var nCPx = this.nodesClipPixel;

    for (var i = 0; i < components.length; i++) {
        var components_i = components[i];
        refLocal = [];
        localLX = [];

        localLX = this.getLocalXY(components_i);

        refLocal[0] = localLX[0] - location[0];
        refLocal[1] = localLX[1] - location[1];

        //抽稀
        if (pointList.length > 0) {
            var lastLocalXY = pointList[pointList.length - 1];
            if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) continue;
        }

        //使用参考点
        pointList.push(refLocal);

        //赋 style
        var style = new Object();
        style.r = 6; //防止漏设此参数，默认 6 像素
        style = SuperMap.Util.copyAttributesWithClip(style, this.style);
        style.x = refLocal[0];
        style.y = refLocal[1];

        //创建图形
        var shape = new SuperMap.LevelRenderer.Shape.SmicPoint({
            style: style,
            clickable: this.isClickAble,
            hoverable: this.isHoverAble
        });

        //设置高亮样式
        if (this.highlightStyle) {
            shape.highlightStyle = this.highlightStyle;
        }

        //设置参考中心，指定图形位置
        shape.refOriginalPosition = location;

        //储存数据 id 属性，用于事件
        shape.refDataID = this.data.id;

        //储存数据 id 属性，用于事件-多图形同时高亮
        shape.isHoverByRefDataID = this.isMultiHover;

        //修改一些 shape 可选属性，通常不需要这么做
        if (this.shapeOptions) {
            SuperMap.Util.copyAttributesWithClip(shape, this.shapeOptions);
        }

        this.shapes.push(shape);
    }
};

ol.supermap.Vector.prototype.multiLineStringToTF = function (geometry) {
    var components = geometry.components;

    for (var i = 0; i < components.length; i++) {
        var components_i = components[i];
        this.lineToTF(components_i);
    }
};

ol.supermap.Vector.prototype.multiPolygonToTF = function (geometry) {
    var components = geometry.components;

    for (var i = 0; i < components.length; i++) {
        var components_i = components[i];
        this.polygonToTF(components_i);
    }
};

ol.supermap.Vector.prototype.pointToTF = function (geometry) {
    //参考位置，参考中心为
    var location = this.location;
    //geometry 像素坐标
    var localLX = this.getLocalXY(geometry);

    //赋 style
    var style = new Object();
    style.r = 6; //防止漏设此参数，默认 6 像素
    style = SuperMap.Util.copyAttributesWithClip(style, this.style);
    style.x = localLX[0] - location[0];
    style.y = localLX[1] - location[1];

    //创建图形
    var shape = new SuperMap.LevelRenderer.Shape.SmicPoint({
        style: style,
        clickable: this.isClickAble,
        hoverable: this.isHoverAble
    });

    //设置高亮样式
    if (this.highlightStyle) {
        shape.highlightStyle = this.highlightStyle;
    }

    //设置参考中心，指定图形位置
    shape.refOriginalPosition = location;

    //储存数据 id 属性，用于事件
    shape.refDataID = this.data.id;

    //储存数据 id 属性，用于事件-多图形同时高亮
    shape.isHoverByRefDataID = this.isMultiHover;

    //修改一些 shape 可选属性，通常不需要这么做
    if (this.shapeOptions) {
        SuperMap.Util.copyAttributesWithClip(shape, this.shapeOptions);
    }

    this.shapes.push(shape);
};

ol.supermap.Vector.prototype.polygonToTF = function (geometry) {
    var components = geometry.components;
    ;

    //节点像素坐标
    var localLX = [];
    //参考位置，参考中心为
    var refLocal = [];
    var location = this.location;
    var pointList = [];
    //岛洞
    var holePolygonPointList = [];
    var holePolygonPointLists = [];

    //节点抽稀距离
    var nCPx = this.nodesClipPixel;

    for (var i = 0; i < components.length; i++) {
        var components_i = components[i].components;


        if (i === 0) {
            // 第一个 component 正常绘制
            pointList = [];

            for (var j = 0; j < components_i.length; j++) {
                refLocal = [];
                localLX = [];

                localLX = this.getLocalXY(components_i[j]);

                refLocal[0] = localLX[0] - location[0];
                refLocal[1] = localLX[1] - location[1];

                //抽稀 - 2 px
                if (pointList.length > 0) {
                    var lastLocalXY = pointList[pointList.length - 1];
                    if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) continue;
                }

                //使用参考点
                pointList.push(refLocal);
            }
        }
        else {
            // 其它 component 作为岛洞
            holePolygonPointList = [];

            for (var j = 0; j < components_i.length; j++) {
                refLocal = [];
                localLX = [];

                localLX = this.getLocalXY(components_i[j]);

                refLocal[0] = localLX[0] - location[0];
                refLocal[1] = localLX[1] - location[1];

                //抽稀 - 2 px
                if (holePolygonPointList.length > 0) {
                    var lastLocalXY = holePolygonPointList[holePolygonPointList.length - 1];
                    if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) continue;
                }

                //使用参考点
                holePolygonPointList.push(refLocal);
            }
        }

        if (holePolygonPointList.length < 2) {
            continue;
        }

        holePolygonPointLists.push(holePolygonPointList);
    }

    if (pointList.length < 2) {
        return;
    }

    //赋 style
    var style = new Object();
    style = SuperMap.Util.copyAttributesWithClip(style, this.style, ['pointList']);
    style.pointList = pointList;

    //创建图形
    var shape = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style: style,
        clickable: this.isClickAble,
        hoverable: this.isHoverAble
    });

    //设置高亮样式
    if (this.highlightStyle) {
        shape.highlightStyle = this.highlightStyle;
    }

    //设置参考中心，指定图形位置
    shape.refOriginalPosition = this.location;

    //储存数据 id 属性，用于事件
    shape.refDataID = this.data.id;

    //储存数据 id 属性，用于事件-多图形同时高亮
    shape.isHoverByRefDataID = this.isMultiHover;

    //岛洞面
    if (holePolygonPointLists.length > 0) {
        shape.holePolygonPointLists = holePolygonPointLists;
    }

    //修改一些 shape 可选属性，通常不需要这么做
    if (this.shapeOptions) {
        SuperMap.Util.copyAttributesWithClip(shape, this.shapeOptions);
    }

    this.shapes.push(shape);
};

ol.supermap.Vector.prototype.rectangleToTF = function (geometry) {
    //参考位置，参考中心为
    var location = this.location;
    var ll = new SuperMap.LonLat(geometry.x, geometry.y);

    //地图分辨率
    var res = this.layer.map.getResolution();

    //geometry 像素坐标
    var localLX = this.getLocalXY(ll);

    //赋 style
    var style = new Object();
    style.r = 6; //防止漏设此参数，默认 6 像素
    style = SuperMap.Util.copyAttributesWithClip(style, this.style);
    style.x = localLX[0] - location[0];
    // SuperMap.Geometry.Rectangle 使用左下角定位， SmicRectangle 使用左上角定位，需要转换
    style.y = (localLX[1] - location[1]) - 2 * geometry.width / res;
    style.width = geometry.width / res;
    style.height = geometry.height / res;

    //创建图形
    var shape = new SuperMap.LevelRenderer.Shape.SmicRectangle({
        style: style,
        clickable: this.isClickAble,
        hoverable: this.isHoverAble
    });

    //设置高亮样式
    if (this.highlightStyle) {
        shape.highlightStyle = this.highlightStyle;
    }

    //设置参考中心，指定图形位置
    shape.refOriginalPosition = location;

    //储存数据 id 属性，用于事件
    shape.refDataID = this.data.id;

    //储存数据 id 属性，用于事件-多图形同时高亮
    shape.isHoverByRefDataID = this.isMultiHover;

    //修改一些 shape 可选属性，通常不需要这么做
    if (this.shapeOptions) {
        SuperMap.Util.copyAttributesWithClip(shape, this.shapeOptions);
    }

    this.shapes.push(shape);
};

ol.supermap.Vector.prototype.geoTextToTF = function (geometry) {
    //参考位置，参考中心为
    var location = this.location;
    //geometry 像素坐标
    var localLX = this.getLocalXY(geometry);

    //赋 style
    var style = new Object();
    style.r = 6; //防止漏设此参数，默认 6 像素
    style = SuperMap.Util.copyAttributesWithClip(style, this.style, ["x", "y", "text"]);
    style.x = localLX[0] - location[0];
    style.y = localLX[1] - location[1];
    style.text = geometry.text;

    //创建图形
    var shape = new SuperMap.LevelRenderer.Shape.SmicText({
        style: style,
        clickable: this.isClickAble,
        hoverable: this.isHoverAble
    });

    //设置高亮样式
    if (this.highlightStyle) {
        shape.highlightStyle = this.highlightStyle;
    }

    //设置参考中心，指定图形位置
    shape.refOriginalPosition = location;

    //储存数据 id 属性，用于事件
    shape.refDataID = this.data.id;

    //储存数据 id 属性，用于事件-多图形同时高亮
    shape.isHoverByRefDataID = this.isMultiHover;

    //修改一些 shape 可选属性，通常不需要这么做
    if (this.shapeOptions) {
        SuperMap.Util.copyAttributesWithClip(shape, this.shapeOptions);
    }

    this.shapes.push(shape);
};

ol.supermap.Vector.prototype.updateAndAddShapes = function () {
    var newLocalLX = this.getLocalXY(this.lonlat);
    this.location = newLocalLX;

    var render = this.layer.renderer;
    for (var i = 0, len = this.shapes.length; i < len; i++) {
        var shape = this.shapes[i];
        //设置参考中心，指定图形位置
        shape.refOriginalPosition = newLocalLX;
        render.addShape(shape);
    }
};

ol.supermap.Vector.prototype.getShapesCount = function () {
    return this.shapes.length;
};

ol.supermap.Vector.prototype.getLocalXY = function (coordinate) {
    var resolution = this.layer.map.getView().getResolution();
    var extent = this.layer.map.getView().calculateExtent();
    if (coordinate instanceof SuperMap.Geometry.Point || coordinate instanceof SuperMap.Geometry.GeoText) {
        var x = (coordinate.x / resolution + (-extent[0] / resolution));
        var y = ((extent[3] / resolution) - coordinate.y / resolution);
        return [x, y];
    }
    else if (coordinate instanceof SuperMap.LonLat) {
        var x = (coordinate.lon / resolution + (-extent[0] / resolution));
        var y = ((extent[3] / resolution) - coordinate.lat / resolution);
        return [x, y];
    }
    else {
        return null;
    }
};

module.exports = ol.supermap.Vector;