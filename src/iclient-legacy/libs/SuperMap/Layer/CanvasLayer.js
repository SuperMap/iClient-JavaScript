/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/
/**
 * Class: SuperMap.CanvasLayer
 * 所有SuperMap iServer 6R 定义的图层类的基类。
 * 备注：CanvasLayer有Canvas和NoCanvas两种渲染方式，在多个栅格图层情况下不建议Canvas与NoCanvas同时使用，避免不能改变图层顺序的问题
 *
 * Inherits from:
 *  - <SuperMap.Layer.Grid>
 */

SuperMap.CanvasLayer = SuperMap.Class(SuperMap.Layer.Grid, {
    
    /**
     * APIProperty: useCanvas
     * {Boolean} 设置是否将一个图层用Canvas元素显示，默认为true，使用Canvas显示。
     * 图层在初始化时会进行浏览器检测，若不支持Canvas方式显示时，自动处理为Image
     * 方式出图，该属性会被设置成false。
     * 
     */
    useCanvas: true,
    
    /**
     * Property: canvas
     * 当useCanvas为true时，此Canvas作为所有瓦片的现实容器。
     */
    canvas: null,

    /**
     * APIProperty: useCORS
     * 使用跨域资源共享策略，这时请求的瓦片必须带有"access-control-allow-origin"响应头，
     * 但是此时瓦片不带cookies信息，如果要带上cookies的信息，还要加一个响应头——"access-control-allow-credentials",
     * 如果"access-control-allow-origin"响应头不能为"*"，否则也没有cookies信息。默认为:false。
     * */
    useCORS:false,
    
    /**
     * Property: canvasContext
     * {Canvas} Canvas的上下文。
     */    
    canvasContext: null,

    /**
     * Property: lastResolution
     * canvas最后一次绘制的分辨率。
     */
    lastResolution: null,
    
    /**
     * Property: lastCanvasPosition
     * canvas最后一次绘制时，距左上角的位置。
     */
    //lastCanvasPosition: null,
    
    /**
     * Property: redrawCanvas
     * Indicates if the canvas element should be reset before
     * the next tile is drawn.
     * 表明canvas元素是否需要在绘制之前重置，默认为false。
     */
    redrawCanvas: false,

    /**
     * APIProperty: format
     * {String} 地图服务的图片格式。
     *     默认值为 png ，目前支持 png、jpg、bmp、gif。
     */
    format: "png",
    
    /**
     * APIProperty: dpi
     * {Float} 屏幕上每英寸包含像素点的个数。
     * 该参数结合图层比例尺可以推算出该比例尺下图层的分辨率。
     */
    dpi: null,
    
    /**
     * Property: isBaseLayer
     * {Boolean} 图层是否为底图，默认为true。
     */
    isBaseLayer: true, 
    
    /**
     * Property: tileOriginCorner
     * {String} 网格的原点位置。(当<tileOrigin>属性未被设置时，此属性有效)。
     *     可选的值包括"tl" (左上), "tr" (右上), "bl" (左下), and "br"(右下)， 默认为 "tl"。
     */
    tileOriginCorner: "tl",
    
    /**
     * Property: datumAxis
     * {Number} 地理坐标系统椭球体长半轴。用户自定义地图的Options时，若未指定该参数的值，
     * 则DPI默认按照WGS84参考系的椭球体长半轴6378137来计算。
     */
    datumAxis: null,

    /**
     * Property: timeoutID
     * {Number} 记录setTimeout的索引值。
     */    
    timeoutID :null,
    
    /**
     * Property: memoryImg
     * {Object} 存放已经加载的图片作为缓存。
     * 在每次图层状态改变时需要重绘，就会首先读取此缓存内部是否已经存在此图片，
     * 如果存在直接取出进行绘制，不存在再向服务器发送请求。
     * 这样可以提高效率，并且在断网状态下也可以查看缓存的图片。
     */
    memoryImg: null,
    
    /**
     * Property: memoryKeys
     * {Array} 保存已经缓存图片的key值。
     * 每一张图片有对应一个key，如x0y1z2，
     * 代表缩放级别为2下的第一横排，第二竖排的图片（从左上角开始计算）.
     */
    memoryKeys:[],

    /**
     * APIProperty: bufferImgCount
     * {Number} 用来记录内存中缓存图片的数量，默认值为 1000。
     * 为了减少网络访问量，在使用 Canvas 模式时，图层会将访问过的图片保存在内存中，
     * 如果访问的图片数量超过该属性定义的值，那么新访问的图片会替换已经缓存的图片。
     */
    bufferImgCount:1000,

    /**
     * Property: isFirstLoad
     * {Bool} 记录是否第一次加载，默认为true。
     */    
    isFirstLoad: true,
    
    /**
     * APIProperty: zoomDuration
     * {Number} 设置两次滚轮事件触发的间隔，如果两次滚轮触发时间差小于300ms。
     * 则放弃前一次滚轮事件，以防止缩放幅度大的时候，中间不需要的级别也会请求瓦片数据（设置此属性的同时设置<SuperMap.Handler.MouseWheel>的interval属性，会产生错误）
     */  
    zoomDuration:300,
    
    /**
     * Property: isZoomming
     * {bool} 记录是否在缩放。
     */  
    isZoomming: null,
          
    /**
     * Property: useHighSpeed
     * {bool} 记录是否采用高速读图策略。
     */ 
    useHighSpeed:true,
    
    /**
     * Property: changeDx
     * {Interger} 记录位置的改变量。
     */ 
    changeDx: null,
    /**
     * Property: changeDy
     * {Interger} 记录位置的改变量。
     */
    changeDy: null,

    /**
     * Property: lenColumn
     * {Interger} 记录当前grid的col长度。
     */
    lenColumn: null,

    /**
     * Property: lenRow
     * {Interger} 记录当前grid的row长度。
     */
    lenRow: null,
    
    /**
     * Porperty: sdcardPath
     * {String} 记录手机当前SDCard位置。
     */
    sdcardPath:null,
    
    /**
     * Porperty: storageType
     * {String} 离线存储类型为文件格式。
     */
    storageType:"File",

    /**
     * Porperty: transitionObj
     * {Object} 缩放动画对象。
     */
    transitionObj: null,

    /**
     * Property: inZoom
     * {Boolean} 当前地图操作是否在缩放过程中。
     */
    inZoom: false,

    // 上一次的缩放级别
    lastZoom: null,
    
    /**
     * Constructor: SuperMap.CanvasLayer
     * 所有SuperMap iServer 6R 定义的图层类的基类。
     *
     * Parameters:
     * name - {String}  图层名称。
     * url - {String} 图层的服务地址。
     * params - {Object} 设置到url上的可选参数。
     * options - {Object} 附加到图层属性上的可选项，父类与此类开放的属性。
     */
    initialize: function (name, url, params, options) {
        //通过浏览器获取部分信息
        var me = this, broz = SuperMap.Browser;
        //me.tileSize = new SuperMap.Size(256, 256);
        //判断是否为移动端，如果是，那么设置缓存图片上限为500，比电脑上少了一半（考虑到手持端内存）
        if(!!SuperMap.isApp)me.bufferImgCount = 500;
        SuperMap.Layer.Grid.prototype.initialize.apply(me, arguments);
        if(!!options && !!options.useCanvas) {
            me.useCanvas = options.useCanvas;
            //reports the progress of a tile filter
            if(me.useCanvas) {
                //通过浏览器的判定决定是否支持Canvas绘制
                me.useCanvas = SuperMap.Util.supportCanvas();
            }
        }else if(me.useCanvas) {
            //通过浏览器的判定决定是否支持Canvas绘制
            me.useCanvas = SuperMap.Util.supportCanvas();
        }
        //如果为android手持端，那么不能支持Canvas绘制
        if(broz.device === 'android') {
            me.useCanvas = false;
        }
        
        if (SuperMap.isApp) {
            //me.sdcardPath = "file://" + window.plugins.localstoragemanager.getsdcard().sdcard + "/";
            cordova.exec(function(obj){
				me.sdcardPath = "file://" + obj.sdcard + "/";
			}, function(e){}, "LocalStoragePlugin","getsdcard", []);
            me.useCanvas = true;
        }
        
        if(me.useCanvas) {
            me.canvas = document.createElement("canvas");
            me.canvas.id = "Canvas_" + me.id;
            me.canvas.style.position = "absolute";       
            me.div.appendChild(me.canvas);                     
            me.canvasContext = me.canvas.getContext('2d');
            me.transitionObj = new SuperMap.Animal(me);
            me.memoryImg = {};    
        }
        
        //如果是Canvas策略采用高速出图 。
        me.useHighSpeed = me.useCanvas ? true : false;            
        me.isFirstLoad = true;
    },
    
    /**
     * Method: removeMap
     * rewrite Grid.removeMap method to clear '_timeoutId'
     * Called when the layer is removed from the map.
     *
     * Parameters:
     * map - {<SuperMap.Map>} The map.
     */
    removeMap: function(map) {
        SuperMap.Layer.Grid.prototype.removeMap.apply(this, [map])
        this._timeoutId && window.clearTimeout(this._timeoutId); 
        this._timeoutId = null;
    },
    
    /**
     * APIMethod: destroy
     * 解构Layer类，释放资源。  
     */
    destroy: function () {
        var me = this;
        SuperMap.Layer.Grid.prototype.destroy.apply(me, arguments);
        me.format = null;
        me.dpi = null;
        me.datumAxis = null;
        me.isBaseLayer = null;
        me.tileOriginCorner = null;
        me.tileSize = null;
        me.bufferContext = null;
        if(me.transitionObj){
            me.transitionObj.destroy();
            me.trnasitionObj = null;
        }
        if (me.useCanvas) {
            me.canvas = null;
            me.memoryImg = null;
        }
    },
    
    /**
     * APIMethod: clone
     * 创建当前图层的副本。
     *
     * Parameters:
     * obj - {Object} 
     *
     * Returns:
     * {<SuperMap.SuperMap.Layer>} 新创建的图层
     */
    clone: function (obj) {
        var me = this;
        if (obj == null) {
            obj = new SuperMap.CanvasLayer(
                me.name, me.url, me.params, me.getOptions());
        }
       
        obj = SuperMap.Layer.Grid.prototype.clone.apply(me, [obj]);

        return obj;
    },
    
    /**
     * Method: moveTo
     * 当map移动时，触发此事件. 所有的瓦片移动操作实际是
     * 由map完成, moveTo's 的任务是接受一个bounds，并且确定
     * 此bounds下的所请求的图片是否被预加载。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     * zoomChanged - {Boolean}
     * dragging - {Boolean}
     */
    moveTo: function(bounds, zoomChanged, dragging) {
        var me = this,
            ratio = this.lastResolution / this.map.getResolution(),
            style = this.map.layerContainerDiv.style,
            left = parseInt(style.left),
            top = parseInt(style.top);

        //图层设置singleTile，并且ratio > 1.0，使用Canvas时，图层平移请求瓦片
        if(me.singleTile && me.useCanvas) {
            zoomChanged = true;
        }
        this.inZoom = zoomChanged ? true: false;
        this.changeDx = -left; 
        this.changeDy = -top;
        //如果是缩放出发的moveto，不进行fixposition。
        //当在缩放时进行平移，不能触发fixPosition()，因为
        //新图没有读出来，会出图错误。
        if(!zoomChanged && !me.isZoomming && me.useCanvas && !this.isFirstLoad){
            this.fixPosition();
        }
        SuperMap.Layer.HTTPRequest.prototype.moveTo.apply(me, arguments);
        bounds = bounds || me.map.getExtent();

        // 当操作为移动时候，并不重绘整个canvas
        me.redrawCanvas = zoomChanged;
        me.dragging = dragging;
        
        // the new map resolution
        var resolution = this.map.getResolution();

        // 当一切缩放属性都添加完后才能进行缩放动画。
        if (me.useCanvas && ratio!==1 && me.useAnimation) {
            if (!zoomChanged || dragging || (this.lastResolution === null) || (this.lastZoom === null) || (this.lastCanvasPosition === null)) {
            } else {
                if(!this.map.isIEMultipTouch){
                    this.transitionObj.begin(this.canvas, this.getAnimationValue());
                }
            }
        }

        if (bounds != null) {            
            // 当grid为空，或是进行缩放必须重绘整个canvas
            var forceReTile = !me.grid.length || zoomChanged;
            // 获取所有tiles的bounds
            var tilesBounds = me.getTilesBounds();            
            if (this.singleTile) {
                if ( forceReTile || 
                     (!dragging && !tilesBounds.containsBounds(bounds))) {
                     if(zoomChanged && this.transitionEffect !== 'resize') {
                         this.removeBackBuffer();
                     }

                     if(!zoomChanged || this.transitionEffect === 'resize') {
                         this.applyBackBuffer(resolution);
                     }
                     
                    this.initSingleTile(bounds);
                }
            } else {
                if (forceReTile || !tilesBounds.containsBounds(bounds, true)) {
                    if(this.useCanvas){
                        //判断是否第一次加载
                        if(this.isFirstLoad){
                            this.redrawCanvas = true;
                            this.resetCanvas();
                            this.inZoom = true;
                            this.isFirstLoad = false;
                            //首次加载的时候不需要延迟
                            this.initGriddedTiles(bounds);
                        }else if(this.zoomDuration){
                            //延迟一段时间去加载，防止连续缩放好几级时，中间的级别了也在请求瓦片
                            this.resetCanvas();
                            this.isZoomming = true;
                            window.clearTimeout(this._timeoutId);
                            this._timeoutId = window.setTimeout(
                                SuperMap.Function.bind(function(){
                                    this.initGriddedTiles(bounds);
                                }, this),
                                this.zoomDuration
                            );
                        }else{
                            this.initGriddedTiles(bounds);
                        }
                    }else {
                        if(zoomChanged && this.transitionEffect === 'resize') {
                            this.applyBackBuffer(resolution);
                        }
                        this.initGriddedTiles(bounds);
                    }
                } else {
                    this.scheduleMoveGriddedTiles();
                }
            }
        }

        //通过改变量计算缩放前canvas左上角的地理位置。
        if (me.useCanvas){
            if(me.singleTile) {
                var size = map.getSize();
                me.canvasContext.clearRect(0, 0, size.w, size.h);
            }
            this.div.style.left = this.changeDx + 'px';
            this.div.style.top = this.changeDy + 'px';
//            if(zoomChanged)
//            {
//                this.div.style.left = '0px';
//                this.div.style.top = '0px';
//            }

            ////获取改变量的位置。
            var canvasPosition = new SuperMap.Pixel(this.changeDx, this.changeDy);
            //通过改变量计算canvas的地理位置。
            this.lastCanvasPosition = this.map.getLonLatFromLayerPx(canvasPosition);
            this.lastZoom = this.map.getZoom();
        }
    },

    /**
     * 获取缩放动画偏移量 ICL-759
     */
    getAnimationValue: function(){
        var px ;
        var zoom = this.map.getZoom();

        if(!this.wrapDateLine || zoom>4){
            px = this.getLayerPxFromLonLat(this.lastCanvasPosition);
        }
        else{
            var change = this.lastZoom - zoom;
            var width = this.canvas.width/2;
            var height = this.canvas.height/2;
            var offset = this.map.centerPixelOffset; //通过Navigation事件参数计算得来
            if(change > 0 ){
                px = new SuperMap.Pixel((width-offset.x)*(1 - Math.pow(0.5,change)),(height+offset.y)*(1 - Math.pow(0.5,change)));
            }else{
                px = new SuperMap.Pixel(-width*(Math.pow(2,-change)-1)+offset.x,-height*(Math.pow(2,-change)-1)-offset.y);
            }
        }
        return px;
    },
    
    /**
     * Method: scheduleMoveGriddedTiles
     * 将移动tile加入计划当中去。
     */
    scheduleMoveGriddedTiles: function() {
        if(this.useHighSpeed){
            this.moveGriddedTiles();
        }else{
            this.timerId && window.clearTimeout(this.timerId);
            this.timerId = window.setTimeout(
                this._moveGriddedTiles,
                this.tileLoadingDelay
            );
        }
    },
    
    /**
     * Method: moveGriddedTiles
     */
    moveGriddedTiles: function() {
        var shifted = true;
        var buffer = this.buffer || 1;
        var tlLayer = this.grid[0][0].position;
        var offsetX = -this.changeDx;
        var offsetY = -this.changeDy;
        var tlViewPort = tlLayer.add(offsetX, offsetY);
        if (tlViewPort.x > -this.tileSize.w * (buffer - 1)) {
            this.shiftColumn(true);
        } else if (tlViewPort.x < -this.tileSize.w * buffer) {
            this.shiftColumn(false);
        } else if (tlViewPort.y > -this.tileSize.h * (buffer - 1)) {
            this.shiftRow(true);
        } else if (tlViewPort.y < -this.tileSize.h * buffer) {
            this.shiftRow(false);
        } else {
            shifted = false;
        }
        if (shifted) {
            if(this.useHighSpeed){
                this.moveGriddedTiles();
            }else{
                this.timerId = window.setTimeout(this._moveGriddedTiles, 0);
            }
        } else {
            //tiles have shifted already，so we can do something.
            //e.g. We can draw images in those tiles on a canvas, if no image is contained in tile,
            //we draw nothing.
        }
    },
    
    /**
     * Method: moveByPx
     * 重写父类方法。
     */
    moveByPx: function(dx, dy) {
        this._timeoutId && window.clearTimeout(this._timeoutId);

        //记录每次的改变量。
        this.changeDx +=dx;
        this.changeDy +=dy;
        if(!this.singleTile) {
            if (this.useCanvas) {
                this.div.style.left = this.changeDx + 'px';
                this.div.style.top = this.changeDy + 'px';
            }

            if (this.useHighSpeed) {
                this.fixPosition();
                this.scheduleMoveGriddedTiles();
            }
        }
    },
    
    /**
     * Method: fixPosition
     * 平移逻辑。
     */
    fixPosition: function(){
        var tile, tileImg, i, j,
            me = this;
        me.canvasContext.clearRect(0,0,me.canvas.width,me.canvas.height);
        for(i=0; i<this.lenRow; i++){
            for(j=0; j<this.lenColumn; j++){
                tile = me.grid[i][j];
                tileImg = tile.lastImage;
                //firefox，即使图片加载失败，complete属性依然为true，故用width和height判断
                //IE，图片加载失败时，width为28，height为30，故用complete判断。
                if((tileImg != null) && (tile.shouldDraw === true) &&
                    (tileImg.width > 0 && tileImg.height > 0) &&
                    tileImg.complete){
                    var positionX = tile.position.x - me.changeDx;
                    var positionY = tile.position.y - me.changeDy;
                    if(tile.lastImage.firstInView){
                        if(me.getExtent().containsLonLat(tile.bounds.getCenterLonLat())){
                            tile.lastImage.firstInView = false;
                        }
                        else if(me.getExtent().intersectsBounds(tile.bounds)){
                            tile.setFirstInView();
                        }
                    }
                    me.drawCanvasTile2(tile.lastImage, positionX, positionY, false);
                }
            }
        }
    },
    
    /**
     * Method: addTile
     * Gives subclasses of Grid the opportunity to create an 
     * OpenLayer.Tile of their choosing. The implementer should initialize 
     * the new tile and take whatever steps necessary to display it.
     *
     * Parameters
     * bounds - {<SuperMap.Bounds>}
     * position - {<SuperMap.Pixel>}
     *
     * Returns:
     * {<SuperMap.Tile>} The added SuperMap.Tile
     */
    addTile: function(bounds,position) {
        // 修改Tile类 todo
        if(this.useCanvas){
            return new SuperMap.Tile.CanvasImage(this, position, bounds, null, this.tileSize, this.useCanvas)
        }else{
            var tile = new this.tileClass(
                this, position, bounds, null, this.tileSize, this.tileOptions
            );
            this.events.triggerEvent("addtile", {tile: tile});
            return tile;
        }
    },
    
    /**
     * Method: drawCanvasTile
     * 当Image加载完成后，将image显示到canvas上。
     * 
     * Parameters:
     * image - {<Image>} The tile to draw
     * position - {<SuperMap.Pixel>} The position of the tile.
     */
    drawCanvasTile: function(image,  position) {
        if (this.dragging||!this.map) {
            return;
        }
        if(this.inZoom){
            image.firstInView = false;
        }
        this.resetCanvas();
        var mapStyle = this.map.layerContainerDiv.style;
        var left = parseInt(mapStyle.left),
            top = parseInt(mapStyle.top); 
        //解决ie||移动设备下canvas绘图出错。
        if(SuperMap.Browser.name === 'msie'){
            var context = {
                layer: this,
                position: position,
                image: image,
                mapStyle: mapStyle
            };    
            var _drawCanvasIE = SuperMap.Function.bind(this.drawCanvasIE, context);
            window.setTimeout(_drawCanvasIE,100);
        }else{
            //通过position来绘制图片解决白线问题
            this.drawCanvasTile2(image, position.x + left, position.y + top);
        }
    },

    /**
     * Method: drawImgData
     * canvas上绘制imgdata字符串
     * 
     * Parameters:
     * imgData - {<String>} imgdata字符串
     * p - {<SuperMap.Pixel>} tile的位置.
     */
    drawImgData:function(imgData,p){
        var mapStyle = this.map.layerContainerDiv.style;
        var left = parseInt(mapStyle.left),
            top = parseInt(mapStyle.top);
        this.canvasContext.putImageData(imgData, p.x+left, p.y+top);
    },
    
    //在ie/移动设备下解决连续绘canvas出错而设置的函数。
    drawCanvasIE:function(){
        this.layer.drawCanvasTile2(this.image, this.position.x + parseInt(this.mapStyle.left), this.position.y + parseInt(this.mapStyle.top));
    },
    
    /**
     * Method: drawCanvasTile2
     * 将image显示到canvas上。
     * 
     * Parameters:
     * image - {<Image>} 要绘制的图块对象
     * positionX - {Number} tile在canvas中的x坐标
     * positionY - {Number} tile在canvas中的y坐标
     * clear - {boolean} 是否需要重新清除。
     */
    drawCanvasTile2: function(image, positionX, positionY, clear){
        clear = clear || true;
        if(image){
            clear && this.canvasContext.clearRect(positionX, positionY, image.width, image.height);
            if(typeof this.opacity === "number"){
                var firstOpacity = this.opacity > 0.3 ? this.opacity - 0.3 : 0.1;
                this.canvasContext.globalAlpha = image.firstInView ? firstOpacity: this.opacity;
            }else{
                this.canvasContext.globalAlpha = image.firstInView ? 0.6: 1;
            }
            //最终把从服务器获取的每一张图片在这里按着坐标绘制在屏幕上面
            this.canvasContext.drawImage(image, positionX, positionY);
        }
    },

    /**
     * Method: resetCanvas
     * 移动canvas到原点，并清除canvas上的所有东西 
     */
    resetCanvas: function() {            
        // because the layerContainerDiv has shifted position (for non canvas layers), reposition the canvas.
        if (this.redrawCanvas) {
            this.redrawCanvas = false;
            // clear canvas by reseting the size
            // broken in Chrome 6.0.458.1:
            // http://code.google.com/p/chromium/issues/detail?id=49151
            this.canvas.width = this.map.viewPortDiv.clientWidth;
            this.canvas.height = this.map.viewPortDiv.clientHeight;
            //解决在IPAD2上设置width和height不会清空canvas的情况
            this.canvasContext.clearRect(0,0,this.canvas.width,this.canvas.height);
            if (this.useCanvas) {
                // store the current resolution and canvas position for transition
                this.lastResolution = this.map.getResolution(); 
            }
            return true;
        }
        return false;
    },
    
    //重写grid里的initGriddedTiles
    initGriddedTiles:function(bounds) {
        this.isZoomming = false;
        SuperMap.Layer.Grid.prototype.initGriddedTiles.apply(this,arguments);
        this.lenRow = this.grid.length;
        this.lenColumn = this.grid[0].length;
    },
    
    /**
     * Method: getLayerPxFromLonLat
     * A wrapper for the <SuperMap.Map.getLayerPxFromLonLat()> method,
     * which takes into account that the canvas element has a fixed size and 
     * it always moved back to the original position.
     * 
     * Parameters:
     * lonlat - {<SuperMap.LonLat>}经纬度
     *
     * Returns:
     * {<SuperMap.Pixel>}像素点
     */
    getLayerPxFromLonLat: function(lonlat) {
        return this.usesCanvas ? this.map.getPixelFromLonLat(lonlat) : 
            this.map.getLayerPxFromLonLat(lonlat);
    },
    
    /**
     * Method: getLayerPxFromLonLat
     * A wrapper for the <SuperMap.Map.getViewPortPxFromLayerPx()> method.
     * 
     * Parameters:
     * layerPx - {<SuperMap.Pixel>}
     * 
     * Returns:
     * {<SuperMap.Pixel>}
     */ 
    getViewPortPxFromLayerPx: function(layerPx) {
        return this.useCanvas ? layerPx : this.map.getViewPortPxFromLayerPx(layerPx);
    },
    
    /**
     * Method: getURL
     * 根据瓦片的bounds获取URL。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}  瓦片的bounds。
     *
     * Returns:
     * {String} 瓦片的URL。
     */
    getURL: function (bounds) {
        var me = this,
            xyz;
        bounds = me.adjustBounds(bounds);
        if(me.singleTile) {
            return me.getTileUrlByBounds(bounds);
        }
        xyz = me.getXYZ(bounds);
        return me.getTileUrl(xyz);
    },
    
    /**
     * Method: getXYZ
     * 根据瓦片的bounds获取xyz值。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}  瓦片的bounds。
     *
     * Returns:
     * {Object} 一组键值对，表示瓦片X, Y, Z方向上的索引。
     */
    getXYZ: function (bounds) {
        var me = this,
            x, y, z,
            map = me.map,
            res = map.getResolution(),
            tOrigin = me.getTileOrigin(),
            tileSize = me.tileSize;
        x = Math.round((bounds.left - tOrigin.lon) / (res * tileSize.w));
        y = Math.round((tOrigin.lat - bounds.top) / (res * tileSize.h));
        z = map.getZoom();
        return {"x": x, "y": y, "z": z};
    },
    
    /**
     * Method: getMemoryImg
     * 根据瓦片的bounds获取内存中该记录的image。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}  瓦片的bounds。
     *
     * Returns:
     * {Object} image对象，不存在返回null
     */
    getMemoryImg: function(bounds){
        var me = this, key = me.getXYZ(bounds);
        key = "x" + key.x + "y" + key.y + "z" + key.z;
        return me.memoryImg[key];
    },
    
    /**
     * Method: addMemoryImg
     * 记录瓦片bounds和对应的图片信息。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}  瓦片的bounds。
     * image - {<Image>} 瓦片对应的图片信息
     *
     */
    addMemoryImg:function(bounds, image, context){

        var me = this;// key = me.getXYZ(bounds);

        if(me.bufferImgCount == 0)
            return;

        var newImgTag = context.newImgTag;
        if(newImgTag&&newImgTag!=""){
            //删除缓存图片
            if(me.memoryKeys.length >= me.bufferImgCount){
                var keyDel = me.memoryKeys.shift();
                me.memoryImg[keyDel] = null;
                delete me.memoryImg[keyDel];
            }
            var keys = newImgTag.split("_");
            var key = "x" + keys[0] + "y" + keys[1] + "z" + keys[2];
            //缓存图片并保存索引。
            me.memoryImg[key] = image;
            me.memoryKeys.push(key);
        }
    },

    /**
     * Method: clearMemoryImage
     * 清除所有的缓存切片
     */
    clearMemoryImg: function(){
        var me = this;
        for(var i = 0;i < me.memoryKeys.length; i++){
            var keyDel = me.memoryKeys.shift();
            me.memoryImg[keyDel] = null;
            delete me.memoryImg[keyDel];
        }
    },
    
    /** 
     * Method: initResolutions
     * 初始化Resolutions数组。（重写基类方法）
     */
    initResolutions: function () {
        // 我们想要得到resolutions，以下是我们的策略：
        // 1. 如果在layer配置中定义了resolutions和scales，使用它们，
        // 2. 如果在layer配置中定义resolutions，使用它，
        // 3. 否则，如果在layer配置中定义scales，那么从这些scales中得出resolutions，
        // 4. 再者，试图从在layer配置中设置的 maxResolution,minResolution, numZoomLevels, maxZoomLevel 计算出resolutions，
        // 5. 如果在map中设置了resolutions和scales，使用它们，
        // 6. 如果我们仍然没有获得resolutions，并且resolutions在map中已经定义了，使用它们，
        // 7. 否则，如果scales在map中定义了，那么从scales中得出resolutions，
        // 8. 再者，试图从在map中设置的maxResolution, minResolution, numZoomLevels, maxZoomLevel 计算出resolutions。
        
        var me = this, 
            i, len, p, startZoomLevel,
            props = {}, 
            alwaysInRange = true;
        
        //如果在layer中定义了resolutions和scales，直接使用layer的resolutions和scales，并且通过它们计算出
        //maxResolution, minResolution, numZoomLevels, maxScale和minScale
        if (me.resolutions && me.scales) {
            var len = me.resolutions.length;
            me.resolutions.sort(function(a, b) {
                return (b - a);
            });
            if (!me.maxResolution) {
                me.maxResolution = me.resolutions[0];
            }

            if (!me.minResolution) {
                me.minResolution = me.resolutions[len-1];
            }
            me.scales.sort(function(a, b) {
                return (a - b);
            });
            if (!me.maxScale) {
                me.maxScale = me.scales[len-1];
            }

            if (!me.minScale) {
                me.minScale = me.scales[0];
            }
            me.numZoomLevels = len;
            return;
        }

        // 从layer的配置中获得计算resolutions的数据。
        for (i = 0, len = me.RESOLUTION_PROPERTIES.length; i < len; i++) {
            p = me.RESOLUTION_PROPERTIES[i];
            props[p] = me.options[p];
            if (alwaysInRange && me.options[p]) {
                alwaysInRange = false;
            }
        }
        
        if (me.alwaysInRange == null) {
            me.alwaysInRange = alwaysInRange;
        }
        
        // 如果没有得到resolutions，利用scales计算resolutions。
        if (props.resolutions == null) {
            props.resolutions = me.resolutionsFromScales(props.scales);
        }

        // 如果仍没有得到resolutions，利用layer配置中设置的
        //maxResolution,minResolution, numZoomLevels, maxZoomLevel 计算出resolutions
        if (props.resolutions == null) {
            props.resolutions = me.calculateResolutions(props);
        }
        
        //如果没有从layer的配置数据中获得resolutions，并且map中同时设置了resolutions和scales，直接使用它们，
        //并且通过它们计算出maxResolution, minResolution, numZoomLevels, maxScale和minScale
        if (me.map.resolutions && me.map.scales) {
            me.resolutions = me.map.resolutions;
            me.scales = me.map.scales;
            var len = me.resolutions.length;
            me.resolutions.sort(function(a, b) {
                return (b - a);
            });
            if (!me.maxResolution) {
                me.maxResolution = me.resolutions[0];
            }

            if (!me.minResolution) {
                me.minResolution = me.resolutions[len-1];
            }
            me.scales.sort(function(a, b) {
                return (a - b);
            });
            if (!me.maxScale) {
                me.maxScale = me.scales[len-1];
            }

            if (!me.minScale) {
                me.minScale = me.scales[0];
            }
            me.numZoomLevels = len;
            return;
        }
        
        //如果此时仍没有计算出resolutions，那么先从baselayer上获取,之后从map中获得（方法同上），最后再计算。
        if (props.resolutions == null) {
            for (i = 0, len = me.RESOLUTION_PROPERTIES.length; i<len; i++) {
                p = me.RESOLUTION_PROPERTIES[i];
                props[p] = me.options[p] != null ?
                    me.options[p] : me.map[p];
            }
            if (props.resolutions == null) {
                props.resolutions = me.resolutionsFromScales(props.scales);
            }
            if (props.resolutions == null) {
                if(me.map.baseLayer!=null){
                    props.resolutions = me.map.baseLayer.resolutions;
                }
            }            
            if (props.resolutions == null) {
                props.resolutions = me.calculateResolutions(props);
            }
        }

        var maxRes;
        if (me.options.maxResolution && me.options.maxResolution !== "auto") {
            maxRes = me.options.maxResolution;
        }
        if (me.options.minScale) {
            maxRes = SuperMap.Util.getResolutionFromScaleDpi(me.options.minScale, me.dpi, me.units, me.datumAxis);
        }

        var minRes;
        if (me.options.minResolution && me.options.minResolution !== "auto") {
            minRes = me.options.minResolution;
        }
        if (me.options.maxScale) {
            minRes = SuperMap.Util.getResolutionFromScaleDpi(me.options.maxScale, me.dpi, me.units, me.datumAxis);
        }

        if (props.resolutions) {

            props.resolutions.sort(function(a, b) {
                return (b - a);
            });
            
            if (!maxRes) {
                maxRes = props.resolutions[0];
            }

            if (!minRes) {
                var lastIdx = props.resolutions.length - 1;
                minRes = props.resolutions[lastIdx];
            }
        }

        me.resolutions = props.resolutions;
        if (me.resolutions) {
            len = me.resolutions.length;
            me.scales = [len];
            if(me.map.baseLayer){
                startZoomLevel = this.calculateResolutionsLevel(me.resolutions);
            }
            else{
                startZoomLevel = 0;
            }
            for (i = startZoomLevel; i < len + startZoomLevel; i++) {
                me.scales[i] = SuperMap.Util.getScaleFromResolutionDpi(me.resolutions[i- startZoomLevel], me.dpi, me.units, me.datumAxis);
            }
            me.numZoomLevels = len;
        }
        me.minResolution = minRes;
        if (minRes) {
            me.maxScale = SuperMap.Util.getScaleFromResolutionDpi(minRes, me.dpi, me.units, me.datumAxis);
        }
        me.maxResolution = maxRes;
        if (maxRes) {
            me.minScale = SuperMap.Util.getScaleFromResolutionDpi(maxRes, me.dpi, me.units, me.datumAxis);
        }
    },
    
    /** 
     * Method: calculateResolutionsLevel
     * 根据resolutions数组计算scale数组。
     *
     * Parameters:
     * resolutions - {Array({Number})}resolutions数组
     */
    calculateResolutionsLevel: function(resolutions){
        var me = this, j, len, resolution,
                 baseLayerResolutions;
        baseLayerResolutions = me.map.baseLayer.resolutions;
        len = baseLayerResolutions.length;
        resolution = resolutions[0];
        for(j=0; j<len; j++){
            if(resolution === baseLayerResolutions[j]){
                return j;
            }
        }
        return 0;
    },

    /** 
     * Method: resolutionsFromScales
     * 根据scales数组计算resolutions数组。（重写基类方法）
     *
     * Parameters:
     * scales - {Array({Number})}scales数组。
     */
    resolutionsFromScales: function (scales) {
        if (scales == null) {
            return;
        }
        var me = this,
            resolutions, len;
        len = scales.length;
        resolutions = [len];
        for (var i = 0; i < len; i++) {
            resolutions[i] = SuperMap.Util.getResolutionFromScaleDpi(
            scales[i], me.dpi, me.units, me.datumAxis);
        }
        return resolutions;
    },
    
    /**
     * Method: calculateResolutions
     * 根据已提供的属性计算resolutions数组。（重写基类方法）
     *
     * Parameters:
     * props - {Object} 
     *
     * Return:
     * {Array({Number})} resolutions数组.
     */
    calculateResolutions: function (props) {
        var me = this,
            maxResolution = props.maxResolution;
        if (props.minScale != null) {
            maxResolution = SuperMap.Util.getResolutionFromScaleDpi(props.minScale, me.dpi, me.units, me.datumAxis);
        } else if (maxResolution === "auto" && me.maxExtent != null) {
            var viewSize, wRes, hRes;
            viewSize = me.map.getSize();
            wRes = me.maxExtent.getWidth() / viewSize.w;
            hRes = me.maxExtent.getHeight() / viewSize.h;
            maxResolution = Math.max(wRes, hRes);
        }

        var minResolution = props.minResolution;
        if (props.maxScale != null) {
            minResolution = SuperMap.Util.getResolutionFromScaleDpi(props.maxScale, me.dpi, me.units, me.datumAxis);
        } else if (props.minResolution === "auto" && me.minExtent != null) {
            var viewSize, wRes, hRes;
            viewSize = me.map.getSize();
            wRes = me.minExtent.getWidth() / viewSize.w;
            hRes = me.minExtent.getHeight()/ viewSize.h;
            minResolution = Math.max(wRes, hRes);
        }

        if(typeof maxResolution !== "number" &&
            typeof minResolution !== "number" &&
            this.maxExtent != null) {
            // maxResolution for default grid sets assumes that at zoom
            // level zero, the whole world fits on one tile.
            var tileSize = this.map.getTileSize();
            maxResolution = Math.max(
                this.maxExtent.getWidth() / tileSize.w,
                this.maxExtent.getHeight() / tileSize.h
            );
        }

        var maxZoomLevel = props.maxZoomLevel;
        var numZoomLevels = props.numZoomLevels;
        if (typeof minResolution === "number" &&
            typeof maxResolution === "number" && numZoomLevels === undefined) {
            var ratio = maxResolution / minResolution;
            numZoomLevels = Math.floor(Math.log(ratio) / Math.log(2)) + 1;
        } else if (numZoomLevels === undefined && maxZoomLevel != null) {
            numZoomLevels = maxZoomLevel + 1;
        }

        if (typeof numZoomLevels !== "number" || numZoomLevels <= 0 ||
            (typeof maxResolution !== "number" &&
               typeof minResolution !== "number")) {
            return;
        }

        var resolutions = [numZoomLevels];
        var base = 2;
        if (typeof minResolution === "number" && typeof maxResolution === "number") {
            base = Math.pow(
                    (maxResolution / minResolution),
                (1 / (numZoomLevels - 1))
            );
        }

        if (typeof maxResolution === "number") {
            for (var i = 0; i < numZoomLevels; i++) {
                resolutions[i] = maxResolution / Math.pow(base, i);
            }
        } else {
            for (i = 0; i < numZoomLevels; i++) {
                resolutions[numZoomLevels - 1 - i] =
                    minResolution * Math.pow(base, i);
            }
        }

        return resolutions;
    },
    
    CLASS_NAME: "SuperMap.CanvasLayer"

});
