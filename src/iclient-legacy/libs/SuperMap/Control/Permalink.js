/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Control.js
 * @requires SuperMap/Control/ArgParser.js
 * @requires SuperMap/Lang.js
 */

/**
 * #Class: SuperMap.Control.Permalink
 * 固定链接类
 * 用于在地图上显示一个超链接，点击后会将用户返回到当前地图视图。
 * 默认情况下 它会被绘制在地图的右下角。
 * 此超链接会在地图被缩放、平移及图层转换时更新。
 * 
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.Permalink = SuperMap.Class(SuperMap.Control, {
    
    /**
     * Property: argParserClass
     * {Class} 参数解析类
     * 固定链接类会使用到此参数解析类。
     */
    argParserClass: SuperMap.Control.ArgParser,

    /** 
     * Property: element
     * {DOMElement}
     */
    element: null,
    
    /** 
     * Property: anchor
     * {Boolean}  定位符，解析URL地址时用来定位基本地址和参数
     * 默认为false，即URL解析时的定位符为"#"，且定位后得到的信息存储在element中。
     * 若为true时，URL解析定位符换为"？"，且定位后得到的信息存储在window.location.href中。
     */
    anchor: false,

    /** 
     * Property: base
     * {String} 基本地址
     * URL中除参数和分隔符之外的部分。
     * 例如下面的字符串是在百度中搜索“123”的完整URL：
     * http://www.baidu.com/s?ie=utf-8&rsv_bp=1&rsv_spt=3&wd=123
     * 而我们这里所说的base基本地址只是指"http://www.baidu.com/s"。
     */
    base: '',

    /** 
     * Property: displayProjection
     * {<SuperMap.Projection>}
     * 需要 proj4js 的支持.
     * 创建固定链接中的坐标时需要使用Projection将地图坐标转换为显示坐标。
     * 最后被加载到地图上的固定链接控件将会确定从URL读取到的坐标投影类型，
     * 因此不能加载多个不同投影类型的permalink控件到同一个地图上。
     */
    displayProjection: null, 

    /**
     * #Constructor: SuperMap.Control.Permalink
     * 固定链接类构造函数
     * Parameters: 
     * element - {DOMElement}
     * base - {String} 
     * options - {Object} options to the control.
     *
     * Or for anchor:
     * options - {Object} options to the control.
     *
     * 注意：
     * Permalink控件会受 Map 的 setCenter方法的影响，因此应该将setCenter语句
     * 写在Permalink添加语句之前，或使用 Map 的 zoomToMaxExtent方法代替setCenter方法。
     *
     * 可用两种方式添加：
     * （1）在初始化构造 Map 的时候，设置 Map 的 controls 属性来添加控件，如 ：
     * (code)
     * 	var map = new SuperMap.Map('map',{controls:[
     *      new SuperMap.Control.Permalink()
     *  ]});
     *
     *  //此情况下建议使用 zoomToMaxExtent 方法
     *  if(!map.getCenter()){
     *         map.zoomToMaxExtent();
     *   }
     * (end)
     *
     * （2）在Map构造完成后，调用接口 Map 的方法 addControl() 来添加控件，如 ：
     * (code)
     * var map = new SuperMap.Map('map');
     *
     * //此情况下应将setCenter语句写在Permalink控件添加语句之前
     * map.setCenter(new SuperMap.LonLat(0,0), 0);
     *
     * map.addControl(new SuperMap.Control.Permalink());
     * (end)
     */
    initialize: function(element, base, options) {
        if (element !== null && typeof element === 'object' && !SuperMap.Util.isElement(element)) {
            options = element;
            this.base = document.location.href;
            SuperMap.Control.prototype.initialize.apply(this, [options]);
            if (this.element !== null) {
                this.element = SuperMap.Util.getElement(this.element);
            }
        }
        else {
            SuperMap.Control.prototype.initialize.apply(this, [options]);
            this.element = SuperMap.Util.getElement(element);
            this.base = base || document.location.href;
        }
    },
    
    /**
     * Method: destroy
     */
    destroy: function()  {
        if (this.element && this.element.parentNode === this.div) {
            this.div.removeChild(this.element);
            this.element = null;
        }
        if (this.map) {
            this.map.events.unregister('moveend', this, this.updateLink);
        }

        SuperMap.Control.prototype.destroy.apply(this, arguments); 
    },

    /**
     * Method: setMap
     * Set the map property for the control. 
     * 
     * Parameters:
     * map - {<SuperMap.Map>} 
     */
    setMap: function(map) {
        SuperMap.Control.prototype.setMap.apply(this, arguments);

        //make sure we have an arg parser attached
        for(var i=0, len=this.map.controls.length; i<len; i++) {
            var control = this.map.controls[i];
            if (control.CLASS_NAME === this.argParserClass.CLASS_NAME) {
                
                // If a permalink is added to the map, and an ArgParser already
                // exists, we override the displayProjection to be the one
                // on the permalink. 
                if (control.displayProjection !== this.displayProjection) {
                    this.displayProjection = control.displayProjection;
                }    
                
                break;
            }
        }
        if (i === this.map.controls.length) {
            this.map.addControl(new this.argParserClass(
                { 'displayProjection': this.displayProjection }));       
        }

    },

    /**
     * Method: draw
     * 绘制控件
     * Returns:
     * {DOMElement}
     */
    draw: function() {
        SuperMap.Control.prototype.draw.apply(this, arguments);
        if (!this.element && !this.anchor) {
            this.element = document.createElement("a");
            this.element.innerHTML = SuperMap.i18n("Permalink");
            this.element.href="";
            this.div.appendChild(this.element);
        }
        this.map.events.on({
            'moveend': this.updateLink,
            'changelayer': this.updateLink,
            'changebaselayer': this.updateLink,
            scope: this
        });
        
        // Make it so there is at least a link even though the map may not have
        // moved yet.
        this.updateLink();
        
        return this.div;
    },
   
    /**
     * Method: updateLink
     * 更新链接
     */
    updateLink: function() {
        var separator = this.anchor ? '#' : '?';
        var href = this.base;
        if (href.indexOf(separator) !== -1) {
            href = href.substring( 0, href.indexOf(separator) );
        }
        href += separator + SuperMap.Util.getParameterString(this.createParams());
        if (this.anchor && !this.element) {
            window.location.href = href;
        }
        else {
            this.element.href = href;
        }
    }, 
    
    /**
     * Method: createParams
     * 创建参数
     * 此参数需要被加入到固定链接的url中。
     *
     * Parameters:
     * center - {<SuperMap.LonLat>} 加入到固定链接的中心点坐标。默认为当前地图的中心点坐标。
     * zoom - {Integer} 加入到固定链接的缩放等级。默认为当前地图的缩放等级。
     * layers - {Array(<SuperMap.Layer>)} 加入到固定链接的图层数组。默认为当前地图的图层。
     *
     * Returns:
     * {Object} 将被加入到固定链接中的参数对象。
     *
     *  创建参数可使用如下方法：
     * 	(start code)
     * 	//创建一个permalink控件
     * 	var permalink = new SuperMap.Control.Permalink();
     * 	//创建createParams方法所需的参数
     * 	var center = new SuperMap.LonLat(10,15);
     *      zoom = 3,
     *      layer0 = new SuperMap.Layer.Baidu(),
     *      layer1 = new SuperMap.Layer.CloudLayer();
     *  var layers =[layer0,layer1];
     *  //使用createParams方法创建新参数
     *  var newparam = permalink.createParams(center,zoom,layers);
     * 	(end)
     */
    createParams: function(center, zoom, layers) {
        center = center || this.map.getCenter();
        var params = SuperMap.Util.getParameters(this.base);
        
        // If there's still no center, map is not initialized yet.
        // Break out of this function, and simply return the params from the
        // base link.
        if (center) { 

            //zoom
            params.zoom = zoom || this.map.getZoom(); 

            //lon,lat
            var lat = center.lat;
            var lon = center.lon;
            if (this.displayProjection) {
                var mapPosition = SuperMap.Projection.transform(
                  { x: lon, y: lat }, 
                  this.map.getProjectionObject(), 
                  this.displayProjection );
                lon = mapPosition.x;  
                lat = mapPosition.y;  
            }       
            params.lat = Math.round(lat*100000)/100000;
            params.lon = Math.round(lon*100000)/100000;

            layers = layers || this.map.layers;  
            params.layers = '';
            for (var i=0, len=layers.length; i<len; i++) {
                var layer = layers[i];
                if (layer.isBaseLayer) {
                    params.layers += (layer === this.map.baseLayer) ? "B" : "0";
                } else {
                    params.layers += (layer.getVisibility()) ? "T" : "F";           
                }
            }
        }

        return params;
    }, 

    CLASS_NAME: "SuperMap.Control.Permalink"
});
