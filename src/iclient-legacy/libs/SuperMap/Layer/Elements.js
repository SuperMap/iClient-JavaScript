/* Copyright (c) 2006-2012 by SuperMap Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the SuperMap distribution or repository for the
 * full text of the license. */

/**
 * @requires SuperMap/Layer.js
 */

/**
 * Class: SuperMap.Layer.Elements
 * Elements图层用于添加任意dom对象，其自身是一个div，所以用户可以向该图层上添加任意dom对象，并且支持第三方扩展应用。
 * 在第三方扩展应用中，只需要将第三方应用的dom对象添加到Elements图层的div中，使用getDiv方法可以获得Elements图层的div。
 *
 * Inherits from:
 *  - <SuperMap.Layer>
 */
SuperMap.Layer.Elements = SuperMap.Class(SuperMap.Layer, {
    /**
     * Property: curReferencePoint
     * {<SuperMap.Pixel>} 当前参考点
     */
    curReferencePoint:null,
    /**
     * Property: firstReferencePoint
     * {<SuperMap.Pixel>}初始参考点
     */
    firstReferencePoint:null,
    /**
     * APIProperty: isFixed
     * {Boolean} 设置当前图层在鼠标拖动及放大缩小时位置是否固定，默认为 false。
     */
    isFixed: false,
    /**
     * Property: isFirstDraw
     * {Boolean} 是否是第一次绘制，用于协助isFixed。
     */
    isFirstDraw:true,
    /**
     * Constructor: SuperMap.Layer.Elements
     * 创建一个Elements layer
     *
     * Parameters:
     * name - {String} 图层的名称。
     * (start code)
     * var elementsLayer = new SuperMap.Layer.Elements("elementsLayer");
     * map.addLayers([elementsLayer]);
     * var elementsDiv = elementsLayer.getDiv();
     * (end)
     * 在获取Elements的div后，通常需要指定该div（图层）的大小，例如：设置该div（图层）的大小为地图大小。
     * (start code)
     * var size = map.getSize();
     * elementsDiv.style.width = size.w;
     * elementsDiv.style.height = size.h;
     * (end)
     * 向Elements的div中添加dom，最简单的方式是使用Dom函数appendChild，例如：elementsDiv.appendChild(TheDom);此处的TheDom可以是用户自己的Dom对象，也可以是第三方扩展中的Dom对象，下面是一个添加简单dom对象的示例，
     * (start code)
     * var myDom = document.createElement("img");
     * myDom.src = "images/circle.png";
     * elementsDiv.appendChild(myDom);
     * (end)
     */
    initialize: function(name,options) {
        SuperMap.Layer.prototype.initialize.apply(this, [name, options]);
    },

    /**
     * APIMethod: getDiv
     * 获取该图层的div，用户往这个div里添加任意对象、
     *
     * Return:
     * {<HTMLElement>}
     */
    getDiv:function(){
       return this.div;
    },

    /**
     * Method: moveTo
     * Create the tile for the image or resize it for the new resolution 、
     * 创建瓦片或者调整瓦片
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}当前级别下计算出的地图范围
     * zoomChanged - {Boolean}缩放级别是否改变
     * dragging - {Boolean}是否为拖动触发的
     */
    moveTo:function(bounds, zoomChanged, dragging) {
        SuperMap.Layer.prototype.moveTo.apply(this, arguments);
        //设置了固定位置后
        if(this.isFixed && !this.isFirstDraw)
        {
            if(zoomChanged)
            {
                this.div.style.left = 0 + 'px';
                this.div.style.top = 0 + 'px';
            }
            else
            {
                this.div.style.left = -parseInt(this.map.layerContainerDiv.style.left, 10) + 'px';
                this.div.style.top = -parseInt(this.map.layerContainerDiv.style.top, 10) + 'px';
            }

            return;
        }
        this.isFirstDraw = false;

        var offsetLeft = parseInt(this.map.layerContainerDiv.style.left, 10);
        offsetLeft = -Math.round(offsetLeft);
        var offsetTop = parseInt(this.map.layerContainerDiv.style.top, 10);
        offsetTop = -Math.round(offsetTop);
        this.div.style.left = offsetLeft + 'px';
        this.div.style.top = offsetTop + 'px';

        var a = this.getLayerPxFromLonLat(new SuperMap.LonLat(0,0));
        if(!this.curReferencePoint){
            this.curReferencePoint  = this.firstReferencePoint = a;
        }
        else{
            //this.last0_0 = this.cur0_0;
            this.curReferencePoint = a;
        }
    },
    /**
     * Method: moveByPx
     * 重写父类方法。
     */
    moveByPx: function(dx, dy) {
        if(this.isFixed)
        {
            this.div.style.left = -parseInt(this.map.layerContainerDiv.style.left, 10) + 'px';
            this.div.style.top = -parseInt(this.map.layerContainerDiv.style.top, 10) + 'px';
        }
    },

    /**
     * APIMethod: getLayerPxFromLonLat
     * 把地理坐标转换为Elements图层的像素坐标。
     * 通常使用此函数将用户或第三方应用的Dom对象关联到地图中，使Dom能够随地图缩放和移动。
     * 实现Dom地图缩放和移动常需用到map的相关事件，如movestart,moveend等。例如：
     * 1.将dom对象放置在地理要素“北京”所在位置。
     * (start code)
     * //代码片段1：
     * var lonlatLT = elementsLayer.getLayerPxFromLonLat(new SuperMap.LonLat(115.38803641666053,40.90618904574261));//myDom 左上角位置
     * var lonlatRB = elementsLayer.getLayerPxFromLonLat(new SuperMap.LonLat(117.38803641666053,38.90618904574261));//myDom 右下角位置
     * //设置dom的大小
     * myDom.style.width = lonlatRB.x -  lonlatLT.x +"px";
     * myDom.style.height = lonlatRB.y -  lonlatLT.y + "px";
     * var lonlat =  elementsLayer.getLayerPxFromLonLat(new SuperMap.LonLat(116.38803641666053,39.90618904574261));//北京市坐标
     * //设置dom的位置
     * myDom.style.position = "absolute";
     * myDom.style.left = lonlat.x - (lonlatRB.x - lonlatLT.x)/2 + "px";
     * myDom.style.top = lonlat.y- (lonlatRB.y -  lonlatLT.y)/2 + "px";
     * (end)
     * 2.通过监听map的moveend来实现Dom地图缩放和移动。
     * (start code)
     * map.events.on({moveend: function (evt) {  //
     *            if(evt.zoomChanged){      //判断是否缩放
     *                var level = map.getZoom();    //通过map获得缩放的级数
     *                if(level > 2){
     *                    myDom.src = "images/marker.png";
     *                    myDom.style.opacity = "0.5";
     *                }
     *              else{
     *                    myDom.src = "images/circle.png";
     *                    myDom.style.opacity = "1";
     *                }
     *            }
     *      //在地图移动结束后，通常需要重置Dom的位置。复制上面示例中的“代码片段1”到此处即可。
     * }});
     * (end)
     *
     * Parameters:
     * lonlat - {<SuperMap.LonLat>}地理坐标
     *
     * Return:
     * {<SuperMap.Pixel>}
     */
    getLayerPxFromLonLat:function(lonlat){
        var tempPoint = this.map.getLayerPxFromLonLat(lonlat);
        var offsetLeft = parseInt(this.map.layerContainerDiv.style.left, 10);
        offsetLeft = Math.round(offsetLeft);
        var offsetTop = parseInt(this.map.layerContainerDiv.style.top, 10);
        offsetTop = Math.round(offsetTop);

        return tempPoint.add(offsetLeft,offsetTop);
    },

    /**
     * APIMethod: getOffset
     * 获取当前图层相对于左上角点的像素偏移量。
     */
    getOffset:function(){
        return {
            x:this.curReferencePoint.x - this.firstReferencePoint.x,
            y:this.curReferencePoint.y - this.firstReferencePoint.y
        }
    },

    CLASS_NAME: "SuperMap.Layer.Elements"
});
