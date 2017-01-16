/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Control.js
 */

/**
 * #Class: SuperMap.Control.ArgParser
 * 参数解析控件类
 * 会在地图上增加地址栏字符串解析函数。
 * 当页面载入或刷新时，会自动地获取当前的超链接字符串，并解析出中心点坐标、缩放级别及图层信息。
 *     例如:
 * (code)
 *  function init(){
 *      layer = new SuperMap.Layer.TiledDynamicRESTLayer("China", url, null,{maxResolution:"auto"});
 *      //监听图层信息加载完成事件
 *      layer.events.on({"layerInitialized":addLayer});
 *      //初始化地图
 *      map = new SuperMap.Map("map",{controls:[
 *          new SuperMap.Control.Navigation() ,
 *          new SuperMap.Control.Zoom(),
 *          new SuperMap.Control.LayerSwitcher()
 *      ]});
 *      //初始化图层
 *      arg=   new SuperMap.Control.ArgParser({
 *          zoom:5
 *      })
 *      //            per = new SuperMap.Control.Permalink({
 *      //                argParserClass:arg
 *      //            })
 *  }
 *  //异步加载图层
 *  function addLayer(){
 *      map.addLayers([layer]);
 *      map.addControl(arg);
 *      //            map.addControl(per) ;
 *      //显示地图范围
 *      //            map.setCenter(new SuperMap.LonLat(0, 0), 0);
 *  }
 *  (end)
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.ArgParser = SuperMap.Class(SuperMap.Control, {



    /**
     * APIProperty: center
     * {<SuperMap.LonLat>} 地图初始化时定位的中心点
     */
    center: null,
    
    /**
     * APIProperty: zoom
     * {int} 地图初始化时的级别
     */
    zoom: null,

    /**
     * APIProperty: layers
     * {String}  每个字符都代表地图上匹配图层的状态，
     * 只能使用"B"（设置为底图）、"T"（设置可见）、"F"（设置不可见）。
     * 如："BTF"，表示地图初始化时，map.layers中的第一个图层最为底图，第二个图层可见，第三个不可见
     */
    layers: null,
    
    /** 
     * APIProperty: displayProjection
     * {<SuperMap.Projection>}
     * 需要 proj4js 的支持.
     * 从URL中读取坐标时需要使用Projection将URL中的地图坐标转换成map上的投影。
     *
     * 注意：
     * permalink控件被加载到地图上时，都需要确定URL中读取到的坐标的投影类型。
     * 因此不能加载多个不同投影类型的permalink控件到同一个地图上。
     */
    displayProjection: null, 

    /**
     * #Constructor: SuperMap.Control.ArgParser
     * 参数解析控件
     * Parameters:
     * options - {Object} 设置该类开放的属性。
     *
     * 可用两种方式添加：
     * （1）在初始化构造 Map 的时候，设置 Map 的 controls 属性来添加控件，如 ：
     * (code)
     * 	var map = new SuperMap.Map('map',{controls:[
     * 	    //初始化第5级
     *      new SuperMap.Control.ArgParser({zoom:5})
     *  ]});
     * (end)
     *
     * （2）在Map构造完成后，调用接口 Map 的方法 addControl() 来添加控件，如 ：
     * (code)
     * var map = new SuperMap.Map('map');
     * map.addControl(new SuperMap.Control.ArgParser());
     * (end)
     *
     * 一般使用了 ArgParser（有坐标和级别时），就不要再使用map.setCenter，不然又定位回去了
     */

    /**
     * Method: getParameters
     * 获取URL中的参数信息
     * 使用 ArgParser的范例如果想要有此效果，那么在输入范例地址的时候，
     * 最后加上形如"?lat=0&lon=0&zoom=1" ，那么此方法就会解析出地图初始化时定位在（0,0）点，级别为1级
     */

    getParameters: function(url) {
        url = url || window.location.href;
        var parameters = SuperMap.Util.getParameters(url);
        // If we have an anchor in the url use it to split the url
        var index = url.indexOf('#');
        if (index > 0) {
            // create an url to parse on the getParameters
            url = '?' + url.substring(index + 1, url.length);
            SuperMap.Util.extend(parameters,
                    SuperMap.Util.getParameters(url));
        }
        return parameters;
    },
    
    /**
     * Method: setMap
     * Set the map property for the control
     * 
     * Parameters:
     * map - {<SuperMap.Map>}  此控件所加载到的map
     */
    setMap: function(map) {
        SuperMap.Control.prototype.setMap.apply(this, arguments);

        //make sure we dont already have an arg parser attached
        for(var i=0, len=this.map.controls.length; i<len; i++) {
            var control = this.map.controls[i];
            if ( (control !== this) &&
                 (control.CLASS_NAME === "SuperMap.Control.ArgParser") ) {
                
                // If a second argparser is added to the map, then we 
                // override the displayProjection to be the one added to the
                // map.
                if (control.displayProjection !== this.displayProjection) {
                    this.displayProjection = control.displayProjection;
                }
                break;
            }
        }
        if (i === this.map.controls.length) {

            var args = this.getParameters();
            // Be careful to set layer first, to not trigger unnecessary layer loads
            if (args.layers) {
                this.layers = args.layers;
    
                // when we add a new layer, set its visibility 
                this.map.events.register('addlayer', this, 
                                         this.configureLayers);
                this.configureLayers();
            }
            if (args.lat && args.lon) {
                this.center = new SuperMap.LonLat(parseFloat(args.lon),
                                                    parseFloat(args.lat));
                if (args.zoom) {
                    this.zoom = parseFloat(args.zoom);
                }
    
                // when we add a new baselayer to see when we can set the center
                this.map.events.register('changebaselayer', this, 
                                         this.setCenter);
                this.setCenter();
            }
        }
    },
   
    /** 
     * Method: setCenter
     * As soon as a baseLayer has been loaded, we center and zoom
     *   ...and remove the handler.
     */
    setCenter: function() {
        
        if (this.map.baseLayer) {
            //dont need to listen for this one anymore
            this.map.events.unregister('changebaselayer', this, 
                                       this.setCenter);
            
            if (this.displayProjection) {
                this.center.transform(this.displayProjection, 
                                      this.map.getProjectionObject()); 
            }      

            this.map.setCenter(this.center, this.zoom);
        }
    },

    /** 
     * Method: configureLayers
     * 当所有图层都加载完毕后，通过此方法来控制他们的隐藏和显示
     *
     */
    configureLayers: function() {

        if (this.layers.length === this.map.layers.length) { 
            this.map.events.unregister('addlayer', this, this.configureLayers);

            for(var i=0, len=this.layers.length; i<len; i++) {
                
                var layer = this.map.layers[i];
                var c = this.layers.charAt(i);
                
                if (c === "B") {
                    this.map.setBaseLayer(layer);
                } else if ( (c === "T") || (c === "F") ) {
                    layer.setVisibility(c === "T");
                }
            }
        }
    },
    /**
     *
     * APIMethod: destroy
     * 销毁此对象。
     * 销毁后此对象的所有属性为null，而不是初始值。
     *
     */
    destroy: function() {
        this.center = null;
        this.zoom = null;
        this.layers = null;
        this.displayProjection = null;
    },
    CLASS_NAME: "SuperMap.Control.ArgParser"
});
