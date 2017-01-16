/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Popup.js
 */

/**
 * Class: SuperMap.Popup.Anchored
 * 固定锚点位置的的浮动弹窗，可以围绕指定位置四周自适应显示。
 * 
 * Inherits from:
 *  - <SuperMap.Popup>
 */
SuperMap.Popup.Anchored = 
  SuperMap.Class(SuperMap.Popup, {

    /** 
     * Property: relativePosition
     * {String} Relative position of the popup ("br", "tr", "tl" or "bl").
     */
    relativePosition: null,
    
    /**
     * APIProperty: keepInMap 
     * {Boolean} 当 panMapIfOutOfView 属性为false，并且当前属性为true的时候，
     * 弹窗调整自身大小以确保在当前地图窗口内。如果需要创建一个临近地图边缘并且
     * 不发生平移的弹窗，或者是一个固定了相对位置的弹窗，必须设置该属性为false。
     *   
     * 当前默认值为true，子类继承该属性。
     */
    keepInMap: true,

    /**
     * Property: anchor
     * {Object} Object to which we'll anchor the popup. Must expose a 
     *     'size' (<SuperMap.Size>) and 'offset' (<SuperMap.Pixel>).
     */
    anchor: null,

    /** 
    * Constructor: SuperMap.Popup.Anchored
    * 构造函数，初始化一个固定锚点的浮动弹窗。 
    *
    * Parameters:
    * id - {String} 弹窗的唯一标识ID。
    * lonlat - {<SuperMap.LonLat>} 地图上弹窗显示的位置。
    * contentSize - {<SuperMap.Size>} 弹窗内容的大小。
    * contentHTML - {String} 弹窗内容HTML的字符串表达，其用法同一个空Div标签的innerHTML属性，示例如下：
    * (code)
    *  //组织需要嵌入的HTML字符串表达
    *  var contentHTML = "<div style='width:80px; border-width:2px; border-style:solid; border-color:red;font-size:12px; opacity: 0.8'>";
    *  contentHTML += "Test  Test";
    *  contentHTML += "</div>";
    *
    *  var lonLat = map.getCenter();
    *  var popwin = new SuperMap.Popup.Anchored("chicken",
    *  lonLat,
    *  new SuperMap.Size(80,20),
    *  contentHTML,
    *  null,
    *  false,
    *  null);
    *
    *   if(popwin) map.removePopup(popwin);
    *   map.addPopup(popwin);
    * (end)
    * anchor - {Object} 锚点。包含一个大小信息 <SuperMap.Size> 和偏移信息 <SuperMap.Size> 的对象。(一般为
    * <SuperMap.Icon> 类型）。
    * closeBox - {Boolean} 是否显示关闭按钮。
    * closeBoxCallback - {Function} 弹窗关闭事件回调处理。
    */
    initialize:function(id, lonlat, contentSize, contentHTML, anchor, closeBox,
                        closeBoxCallback) {
        var newArguments = [
            id, lonlat, contentSize, contentHTML, closeBox, closeBoxCallback
        ];
        SuperMap.Popup.prototype.initialize.apply(this, newArguments);

        this.anchor = (anchor != null) ? anchor 
                                       : { size: new SuperMap.Size(0,0),
                                           offset: new SuperMap.Pixel(0,0)};
    },

    /**
     * APIMethod: destroy
     * 销毁弹窗。
     */
    destroy: function() {
        this.anchor = null;
        this.relativePosition = null;
        
        SuperMap.Popup.prototype.destroy.apply(this, arguments);        
    },

    /**
     * APIMethod: show
     * 显示弹窗。覆盖父类方法，显示弹窗。
     */
    show: function() {
        this.updatePosition();
        SuperMap.Popup.prototype.show.apply(this, arguments);
    },

    /**
     * Method: moveTo
     * Since the popup is moving to a new px, it might need also to be moved
     *     relative to where the marker is. We first calculate the new 
     *     relativePosition, and then we calculate the new px where we will 
     *     put the popup, based on the new relative position. 
     * 
     *     If the relativePosition has changed, we must also call 
     *     updateRelativePosition() to make any visual changes to the popup 
     *     which are associated with putting it in a new relativePosition.
     * 
     * Parameters:
     * px - {<SuperMap.Pixel>}
     */
    moveTo: function(px) {
        var oldRelativePosition = this.relativePosition;
        this.relativePosition = this.calculateRelativePosition(px);
        
        var newPx = this.calculateNewPx(px);
        
        var newArguments = new Array(newPx);
        SuperMap.Popup.prototype.moveTo.apply(this, newArguments);
        
        //if this move has caused the popup to change its relative position, 
        // we need to make the appropriate cosmetic changes.
        if (this.relativePosition !== oldRelativePosition) {
            this.updateRelativePosition();
        }
    },

    /**
     * APIMethod: setSize
     * 设置大小。
     * 
     * Parameters:
     * contentSize - {<SuperMap.Size>} 设置弹窗的内容HTML要素的像素大小。
     */
    setSize:function(contentSize) { 
        SuperMap.Popup.prototype.setSize.apply(this, arguments);

        if ((this.lonlat) && (this.map)) {
            var px = this.map.getLayerPxFromLonLat(this.lonlat);
            this.moveTo(px);
        }
    },  
    
    /** 
     * Method: calculateRelativePosition
     * 
     * Parameters:
     * px - {<SuperMap.Pixel>}
     * 
     * Returns:
     * {String} The relative position ("br" "tr" "tl" "bl") at which the popup
     *     should be placed.
     */
    calculateRelativePosition:function(px) {
        var lonlat = this.map.getLonLatFromLayerPx(px);        
        
        var extent = this.map.getExtent();
        var quadrant = extent.determineQuadrant(lonlat);
        
        return SuperMap.Bounds.oppositeQuadrant(quadrant);
        // return "tr";
    }, 

    /**
     * Method: updateRelativePosition
     * The popup has been moved to a new relative location, so we may want to 
     *     make some cosmetic adjustments to it. 
     * 
     *     Note that in the classic Anchored popup, there is nothing to do 
     *     here, since the popup looks exactly the same in all four positions.
     *     Subclasses such as Framed, however, will want to do something
     *     special here.
     */
    updateRelativePosition: function() {
        //to be overridden by subclasses
    },

    /** 
     * Method: calculateNewPx
     * 
     * Parameters:
     * px - {<SuperMap.Pixel>}
     * 
     * Returns:
     * {<SuperMap.Pixel>} The the new px position of the popup on the screen
     *     relative to the passed-in px.
     */
    calculateNewPx:function(px) {
        var newPx = px.offset(this.anchor.offset);
        
        //use contentSize if size is not already set
        var size = this.size || this.contentSize;
        //如果需要阴影，这里设置isShowShadow就能实现效果
        if(this.isShowShadow)
        {
            this.relativePosition = "tr";
        }

        var top = (this.relativePosition.charAt(0) === 't');
        newPx.y += (top) ? -size.h : this.anchor.size.h;
        
        var left = (this.relativePosition.charAt(1) === 'l');
        newPx.x += (left) ? -size.w : this.anchor.size.w;

        return newPx;   
    },

    CLASS_NAME: "SuperMap.Popup.Anchored"
});
