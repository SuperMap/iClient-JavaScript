/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Control.js
 * @requires SuperMap/Control/UTFGrid.js
 * @requires SuperMap/Marker.js
 */

 /**
  * Class: SuperMap.Control.GOIs
  * 麻点图控件，用于实现麻点图鼠标事件。
  * 
  * 通过 active 和 deactive 两个方法，实现动态的激活和注销,该控件的激活和注销用法如下示例所示：
  * 
  * 激活控件,如下方法： 
  * (code)  
  * control.activate();
  * (end) 
  * 注销控件,如下方法： 
  * (code) 
  * control.deactivate();
  * (end) 
  * 
  * Inherits from:
  *  - <SuperMap.Control>
  */
SuperMap.Control.GOIs = SuperMap.Class(SuperMap.Control, {

    /**
     * APIProperty: onMouseover
     * {Function} 触发poi的mouseover事件
     */
    onMouseover: function() {},

    /**
     * APIProperty: onMouseout
     * {Function} 触发poi的mouseout事件
     */
    onMouseout: function() {},

    /**
     * APIProperty: onMousemove
     * {Function} 触发poi的mousemove事件
     */
    onMousemove: function() {},

    /**
     * APIProperty: onMousedown
     * {Function} 触发poi的mousedown事件
     */
    onMousedown: function() {},

    /**
     * APIProperty: onMouseup
     * {Function} 触发poi的mouseup事件
     */
    onMouseup: function() {},

    /**
     * APIProperty: onClick
     * {Function} 触发poi的click事件
     */
    onClick: function() {},

    /**
     * APIProperty: onDblclick
     * {Function} 触发poi的dbclick事件
     */
    onDblclick: function() {},

    /**
     * APIProperty: layers
     * {Array<SuperMap.Layer>} 需要绑定事件的数组
     */
    layers: null,

    /**
     * Property: tiledDynamicRESTLayer
     * {SuperMap.Layer.TiledDynamicRESTLayer} 临时图层。
     */
    tiledDynamicRESTLayer: null,

    /**
     * Property: utfgridLayer
     * {SuperMap.Layer.UTFGrid} utfgrid图层。
     */
    utfgridLayer: null,

    /**
     * Property: markerLayer
     * {SuperMap.Layer.Markers} marker图层。
     */
    markerLayer:null,

    /**
     * Property: utfgridControl
     * {SuperMap.Control.UTFGrid} marker图层。
     */
    utfgridControl:null,

    /**
     * Property: curHoverMarker
     * {SuperMap.Marker} 当前高亮的marker。
     */
    curHoverMarker:null,

    /**
     * Property: curClickMarker
     * {SuperMap.Marker} 当前点击的marker。
     */
    curClickMarker:null,

    /**
     * Property: curHoverIdx
     * {String} 当前mouseover的poi的idx。
     */
    curHoverIdx:null,

    /**
     * APIProperty: isHeighlight
     * {Boolean} 是否高亮,默认为false，当设置为true时，需要设置highlightIcon，才能看到高亮效果。仅对点图层有效。
     */
    isHighlight: false,

    /**
     * APIProperty: highlightIcon
     * {SuperMap.Icon} poi点hover状态下的样式。 仅对点图层有效。
     */
    highlightIcon:null,

    /**
     * Property: curHoverData
     * {Object} 当前hover状态下的poi信息
     */
    curHoverData:null,

    /**
     * Property: transparentIcon
     * {SuperMap.Icon} poi非高亮情况下的用一个透明的marker来触发点击事件。
     */
    transparentIcon:new SuperMap.Icon(SuperMap.Util.getImagesLocation() + 'blank.gif',  new SuperMap.Size(16,16), new SuperMap.Pixel(-8, -8)),

    isPoi:true,

     /**
      * Constructor: SuperMap.Control.GOIs
      * 创建一个麻点图控件。
      *
      * Parameters:
      * layers - {<SuperMap.Layer>} 图层数组。通常从SuperMap.GOIs对象获取。
      * options - {Object} 
      *     
      *    创建 GOIs 控件，可用如下方法：
      * (start code)
      * var map = new SuperMap.Map("map",{allOverlays: true,projection: "EPSG:3857"});//需要给map设置allOverlays和projection两个属性
      * var myGOIs = new SuperMap.GOIs({
      *      "url":url,
      *      "datasetName":"China_Town_P@China400",
      * });
      * myGOIs.events.on({"initialized": function(){
      *     var layers = myGOIs.getLayers();
　　  *     map.addLayers(layers);
　　  *     var control = new SuperMap.Control.GOIs(layers,{
      *         onClick:function(){
      *             //code
      *         },
      *         onMouseover:function(){
      *             //code
      *         },
      *         onMouseout:function(){
      *             //code
      *         }
      *     });
　　  *     map.addControl(control);
      *     control.activate();
      * }});
      * (end)
      */
    initialize: function(layers, options) {
        SuperMap.Control.prototype.initialize.apply(this, [options]);
        this.layers = layers;
        if(this.scope === null) {
            this.scope = this;
        }
        this.setLayers();
    },
    /**
     * Method: setLayers
     * 设置layer属性
     */
    setLayers:function(){
        var t = this,layers = t.layers;
        if(layers&&layers.length&&layers.length>0){
             for(var i=0;i<layers.length;i++){
                var layer = layers[i];
                if(layer instanceof SuperMap.Layer.TiledDynamicRESTLayer){
                    t.tiledDynamicRESTLayer = t.tiledDynamicRESTLayer||layer;
                }
                else if(layer instanceof SuperMap.Layer.UTFGrid){
                    t.utfgridLayer = t.utfgridLayer||layer;
                    if(layer.__isPoi != undefined)
                    {
                        t.isPoi = layer.__isPoi;
                    }
                }
                else if(layer instanceof SuperMap.Layer.Markers){
                    t.markerLayer = t.markerLayer || layer;
                }
             }
        }
    },

    /**
     * Method: createUTFGridControl
     * 创建UTFGrid控件
     */
    createUTFGridControl:function(){
        var t = this;
        if(t.utfgridLayer){
            t.utfgridControl = new SuperMap.Control.UTFGrid({
                layers: [t.utfgridLayer],
                callback: function(infoLookup, loc, pixel){
                    if(t.isPoi){
                        t.mouseOverUTFGrid_point(infoLookup, loc, pixel);
                    }
                    else{
                        t.mouseOverUTFGrid_lineArea(infoLookup, loc, pixel);
                    }
                },
                handlerMode: "move"
            });
        }
    },

    /**
     * Method: onMouseOver
     *  utfgridlayer鼠标平移事件回调函数
     */
    mouseOverUTFGrid_point:function(infoLookup, loc, pixel){
        var t = this;
        if(t.onMousemove){
            t.onMousemove({"loc":loc,"pixel":pixel});
        }
        if(infoLookup){
            for (var idx in infoLookup) {
                var info = infoLookup[idx];
                if (info && info.data) {
                    if(t.curHoverIdx){
                        if(t.curHoverIdx === info.id){
                            return;
                        }
                        else{
                            if(t.onMouseout){
                                t.onMouseout({"loc":loc,"data":t.curHoverData});
                            }
                            t.curHoverIdx = info.id;
                        }
                    }
                    else{
                        t.curHoverIdx = info.id;
                    }
                    t.removeHoverMarker();
                    if(t.isHighlight){
                        var icon = this.highlightIcon.clone();
                    }
                    else{
                        var icon = this.transparentIcon.clone();
                    }
                    //将数据的属性改成大写
                    var data = {};
                    //这是因为数据的smx那些字段的大小写有时候不一样
                    for(var s in info.data)
                    {
                        data[s.toUpperCase()] = info.data[s];
                    }
                    t.curHoverMarker =  new SuperMap.Marker(new SuperMap.LonLat(parseFloat(data.SMX), parseFloat(data.SMY)), icon);
                    t.curHoverMarker.events.fallThrough = true;
                    t.markerLayer.addMarker(t.curHoverMarker);
                    t.curHoverMarker.events.on({
                        "click":function(){
                            if(this === t.curClickMarker){}
                            else{
                                t.removeClickedMarker();
                                t.curClickMarker = t.curHoverMarker;
                                t.curHoverMarker = null;
                            }
                            var lonlat = this.getLonLat();
                            if(t.onClick){
                                t.onClick({"loc":lonlat,"data":info.data});
                            }
                        },
                        "dblclick":function(){
                            var lonlat = this.getLonLat();
                            if(t.onDblclick){
                                t.onDblclick({"loc":lonlat,"data":info.data});
                            }
                        },
                        "mousedown":function(){
                            var lonlat = this.getLonLat();
                            if(t.onMousedown){
                                t.onMousedown({"loc":lonlat,"data":info.data});
                            }
                        },
                        "mouseup":function(){
                            var lonlat = this.getLonLat();
                            if(t.onMouseup){
                                t.onMouseup({"loc":lonlat,"data":info.data});
                            }
                        },
                        "scope": t.curHoverMarker
                    });
                    var lonlat = t.curHoverMarker.getLonLat();
                    if(t.onMouseover){
                        t.onMouseover({"loc":lonlat,"data":info.data});
                    }
                    t.curHoverData = info.data;
                }
                else{
                    if(t.curHoverIdx&&(t.curHoverMarker||t.curClickMarker)){
                        t.curHoverIdx = null;
                        var marker = (t.curHoverMarker||t.curClickMarker);
                        var lonlat = marker.getLonLat();
                        if(t.onMouseout){
                            t.onMouseout({"loc":lonlat,"data":t.curHoverData});
                        }
                    }
                    t.removeHoverMarker();
                }
            }
        }
    },


    mouseOverUTFGrid_lineArea:function(infoLookup, loc, pixel){
        var t = this;
        if(t.onMousemove){
            t.onMousemove({"loc":loc});
        }
        t.removeHoverMarker();
        if(infoLookup){
            for (var idx in infoLookup) {
                var info = infoLookup[idx];
                if (info && info.data) {
                    var icon = this.transparentIcon.clone();
                    t.curHoverMarker =  new SuperMap.Marker(new SuperMap.LonLat(parseFloat(loc.lon), parseFloat(loc.lat)), icon);
                    t.markerLayer.addMarker(t.curHoverMarker);
                    t.curHoverMarker.events.on({
                        "click":function(){
                            if(t.onClick){
                                t.onClick({"loc":loc,"data":info.data});
                            }
                        },
                        "dblclick":function(){
                            if(t.onDblclick){
                                t.onDblclick({"loc":loc,"data":info.data});
                            }
                        },
                        "mousedown":function(){
                            if(t.onMousedown){
                                t.onMousedown({"loc":loc,"data":info.data});
                            }
                        },
                        "mouseup":function(){
                            if(t.onMouseup){
                                t.onMouseup({"loc":loc,"data":info.data});
                            }
                        },
                        "scope": t.curHoverMarker
                    });

                    if(t.curHoverIdx){
                        if(t.curHoverIdx === info.id){
                            return;
                        }
                        else{
                            if(t.onMouseout){
                                t.onMouseout({"loc":loc,"data":info.data});
                            }
                            t.curHoverIdx = info.id;
                        }
                    }
                    else{
                        t.curHoverIdx = info.id;
                    }
                    if(t.onMouseover){
                        t.onMouseover({"loc":loc,"data":info.data});
                    }
                    t.curHoverData = info.data;
                }
                else{
                    if(t.curHoverIdx){
                        t.curHoverIdx = null;
                        if(t.onMouseout){
                            t.onMouseout({"loc":loc,"data":t.curHoverData});
                        }
                    }
                }
            }
        }
    },

    /**
     * APIMethod: removeClickedMarker
     *  删除当前点击的marker
     */
    removeClickedMarker:function(){
        var t = this;
        t.removeMarker(t.curClickMarker);
        t.curClickMarker = null;
    },

    /**
     * Method: removeHoverMarker
     *  删除当前hover的marker
     */
    removeHoverMarker:function(){
        var t = this;
        t.removeMarker(t.curHoverMarker);
        t.curHoverMarker = null;
    },

    /**
     * Method: removeMarker
     *  删除marker
     */
    removeMarker:function(marker){
        var t = this;
        if(marker){
            t.markerLayer.removeMarker(marker);
            if(marker.events){
                marker.events.destroy();
            }
            marker = null;
        }
    },

    setMap: function(map) {
        var t = this;
        t.map = map;
        if(!t.utfgridControl){
            t.createUTFGridControl();
            t.map.addControl(t.utfgridControl);
        }
    },

     /**
      * Method: destroy
      */
    destroy: function() {
         var t = this;

         t.removeClickedMarker();
         t.removeHoverMarker();
         if(t.map){
             if(t.utfgridControl){
                 t.utfgridControl.deactivate();
                 t.map.removeControl(t.utfgridControl);
                 t.utfgridControl = null;
             }
             t.markerLayer = null;
             t.utfgridLayer = null;
             t.tiledDynamicRESTLayer = null;
         }
         SuperMap.Control.prototype.destroy.apply(this, arguments);

         for(var key in this){
             this[key] = null;
         }
    },

     /**
      * APIMethod: activate
      * 激活控件
      */
    activate: function () {
        var t = this;
        if (!t.active) {
            if(t.utfgridControl){
                t.utfgridControl.activate();
            }
        }
        return SuperMap.Control.prototype.activate.apply(
            this, arguments
        );
    },

     /**
      * APIMethod: deactivate
      * Deactivates the control.
      * 
      * Returns:
      * {Boolean} The control was effectively deactivated.
      */
    deactivate: function () {
        var t = this;
        if (this.active) {
            t.removeClickedMarker();
            t.removeHoverMarker();
            if(t.utfgridControl){
                t.utfgridControl.deactivate();
            }
        }
        return SuperMap.Control.prototype.deactivate.apply(
            this, arguments
        );
    },
    
    CLASS_NAME: "SuperMap.Control.GOIs"
});
