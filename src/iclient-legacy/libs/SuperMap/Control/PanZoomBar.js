/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.Control.PanZoomBar
 * 平移缩放类。
 * 用于平移缩放地图，默认情况下垂直显示在地图左上角。
 *
 * Inherits from:
 *  - <SuperMap.Control>
 */
 
SuperMap.Control.PanZoomBar = SuperMap.Class(SuperMap.Control, {

    /** 
     * APIProperty: slideFactor
     * {Integer} 通过罗盘上的箭头漫游地图的移动的距离（像素单位），默认为50。
     * 如果想通过地图大小的比率移动地图，需要使用slideRatio属性。
     */
    slideFactor: 50,

    /** 
     * APIProperty: slideRatio
     * {Number} 点击箭头移动地图时，所移动的距离占总距离（上下移动的总距离为高度，左右移动的总距离为宽度）
     * 的百分比，默认为null。
     * 例如：如果slideRatio 设为0.5, 则垂直上移地图半个地图高度.
     */
    slideRatio: null,

    /** 
     * Property: buttons
     * {Array(DOMElement)} Array of Button Divs 
     */
    buttons: null,

    /** 
     * APIProperty: sliderBarWidth
     * {Number} 设置滑动条的宽度，默认为13。
     */
    sliderBarWidth: 13,

    /** 
     * APIProperty: sliderBarHeight
     * {Number} 设置滑动条的高度，默认为120。
     */
    sliderBarHeight: 120,

    /**
     * Property: zoomStopWidth
     * （没用，为了能让用户设置宽度，都是用sliderBarWidth-2）
     */
    zoomStopWidth: 11,

    /**
     * Property: zoomStopHeight
     * 缩放一个等级的高度  (其实都是计算出来的，设置并没有啥用)
     */
    zoomStopHeight: 11,


    /** 
     * Property: slider
     */
    slider: null,

    /** 
     * Property: sliderEvents
     * {<SuperMap.Events>}
     */
    sliderEvents: null,

    /** 
     * Property: divEvents
     * {<SuperMap.Events>}
     */
    divEvents: null,
    
    /** 
     * Property: divEventLevel
     * {<SuperMap.Events>}
     */
    divEventLevel:null,

    /**
     * APIProperty: forceFixedZoomLevel
     * {Boolean} 是否固定缩放级别为[0,16]之间的整数，默认为false。
     */
    forceFixedZoomLevel: false,

    /**
     * Property: mouseDragStart
     * {<SuperMap.Pixel>}
     */
    mouseDragStart: null,

    /**
     * Property: deltaY 
     * {Number} 在缩放滑杆上拖拽时的垂直方向上的像素偏移量。
     */
    deltaY: null,
    /**
     * Property: mapLevel
     * {<SuperMap.Pixel>}
     */
    mapLevel:[],

    /**
     * Property: divLevel
     * {DOMElement} 等级和标签样式图片对应的DOM元素。
     */
    divLevel:null,
    /**
     * Property: zoomStart
     * {<SuperMap.Pixel>}
     */
    zoomStart: null,
     /**
     * APIProperty: showSlider
     * {Boolean} 是否显示滑动条，默认值为false。
     */
    showSlider: false,
    /**
     * APIProperty: showCompass
     * {Boolean} 是否显罗盘，默认值为true。
     */
    showCompass: true,

     /**
     * APIProperty: levelsDesc
     * {Object} 当用户需要添加等级标签时，设置相应的等级和标签样式图片，设置等级不能超过最大的等级数。
     * 该属性类型为：{levels: [], imageSources: []}, levels属性数组设置需要显示等级说明的等级级别，为number类型
     * imageSources 数组用来指定等级说明的图片地址，为字符串类型。
     */
    levelsDesc: null,
    /**
     * Constructor: SuperMap.Control.PanZoomBar
     * 平移缩放控件类
     *
     * Parameters:
     * options - {Object} 该类开放的属性。
     *      
     * 可用两种方式添加 PanZoomBar ：     
     * （1）在初始化构造 Map 的时候，设置 Map 的 controls 属性来添加控件，如 ：
     * (code)     
     *     var map = new SuperMap.Map('map',{controls:[new SuperMap.Control.PanZoomBar()]});      
     * (end)
     *      
     * （2）在Map构造完成后，调用接口 Map 的方法 addControl() 来添加控件，如 ：
     * (code)     
     * var map = new SuperMap.Map('map');
     * map.addControl(new SuperMap.Control.PanZoomBar());      
     * (end)     
     */
    initialize: function(options) {
        SuperMap.Control.prototype.initialize.apply(this, arguments);
        var userimages = false,
            userstyle = false,
            sz = new SuperMap.Size(17, 17),
            sz1 = new SuperMap.Size(27, 27),
            sz3 = new SuperMap.Size(11,11),
            sz4 = new SuperMap.Size(63, 62), imgLocation, img, centered, imagesSource;

        if(options) {
            this.showSlider = typeof options.showSlider !== 'undefined' ? options.showSlider : false;
            this.showCompass = typeof options.showCompass !== 'undefined' ? options.showCompass : true;

            //设置滑动条的高度和宽度
            this.sliderBarWidth = typeof options.sliderBarWidth !== 'undefined' ? options.sliderBarWidth : 13;
            this.sliderBarHeight = typeof options.sliderBarHeight !== 'undefined' ? options.sliderBarHeight : 120;
        }
        SuperMap.Control.PanZoomBar.prototype.draw = function(px) {
            SuperMap.Control.prototype.draw.apply(this, arguments);
            px = px || new SuperMap.Pixel(4,4);
            //改变顶部距离
            px.y += sz4.h/2;
            //放置控件位置
            this.buttons = [];
            centered = this.centered;
            centered = new SuperMap.Pixel(px.x+sz4.w/2, px.y);
            
            var s4tmp;
            if(this.showCompass){
                this._addButton("pan", "zoom-maxextent-mini.png", centered.add(-sz4.w/2+sz.w/2,-sz4.h/2+sz.h/2), sz4);
                this._addButton("panup", "", centered.add(-sz4.w/6+sz.w/2,-sz4.h/2+sz.h/2), sz4);
                this._addButton("panleft", "", centered.add(-sz4.w/2+sz.w/2,-sz4.h/6+sz.h/2), sz4);
                this._addButton("panright", "", centered.add(sz4.w/6+sz.w/2,-sz4.h/6+sz.h/2), sz4);
                this._addButton("pandown", "", centered.add(-sz4.w/6+sz.w/2, sz4.w/6+sz.w/2), sz4);
                this._addButton("zoommaxextent", "zoom-maxextent-mini.png", centered, sz);
                s4tmp= sz4.w/2
            }
            else{
                s4tmp= -sz4.w/2
            }

            this._addButton("zoomin", "controlSkinBlue/"+"zoom-plus-mini.png", centered.add(-sz1.w/2+sz.w/2, s4tmp+sz.h/2+10), sz1);
            if(this.showSlider){
                this._addButton("zoomout", "controlSkinBlue/"+"zoom-minus-mini.png", centered.add(-sz1.w/2+sz.w/2, s4tmp+sz.h/2+10+sz1.h+ this.sliderBarHeight), sz1);

                //计算进度条xy
                this._addZoomBar(centered.add(sz.w/2-this.sliderBarWidth/2,s4tmp+sz.h/2+10+sz1.h));

            }else{
                this._addButton("zoomout", "controlSkinBlue/"+"zoom-minus-mini.png", centered.add(-sz1.w/2+sz.w/2, s4tmp+sz.h/2+10+sz1.h), sz1);
            }
            return this.div;
        };

        //PanZoomBar类_addButton函数重写
        SuperMap.Control.PanZoomBar.prototype._addButton = function(id, img, xy, sz_size) {
            imgLocation = SuperMap.Util.getImagesLocation() + img;
            if(id === "panup"||id === "panleft"||id === "pandown"||id === "panright"){
                var btn = SuperMap.Util.createDiv(this.id + "_" + id, xy, "", "", "absolute");
                btn.style.width=sz_size.w/3+"px";
                btn.style.height=sz_size.w/3+"px";
                btn.style.cursor = "pointer";
                if(!!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1)){
                    btn.style.backgroundColor="#4c4c4c";
                    btn.style.filter="alpha(opacity=0)";
                    btn.style.opacity = 0;
                }
            } else if (id === "pan"){
                var btn = SuperMap.Util.createAlphaImageDiv(this.id + "_" + id, xy, sz_size, imgLocation, "absolute");
            } else {
                var btn = SuperMap.Util.createAlphaImageDiv(this.id + "_" + id, xy, sz_size, imgLocation, "absolute");
                btn.style.cursor = "pointer";
            }

            this.div.appendChild(btn);

            SuperMap.Event.observe(btn, "mousedown", SuperMap.Function.bindAsEventListener(this.buttonDown, btn));
            SuperMap.Event.observe(btn, "dblclick", SuperMap.Function.bindAsEventListener(this.doubleClick, btn));
            SuperMap.Event.observe(btn, "click", SuperMap.Function.bindAsEventListener(this.doubleClick, btn));
            SuperMap.Event.observe(btn, "mouseover",SuperMap.Function.bindAsEventListener(this.btnMouseOver, btn));
            SuperMap.Event.observe(btn, "mouseout",SuperMap.Function.bindAsEventListener(this.btnMouseOut, btn));
            SuperMap.Event.observe(btn, "mouseup",SuperMap.Function.bindAsEventListener(this.passEventToSlider, this));
            btn.action = id;
            btn.id = this.id;
            btn.map = this.map;

            if(!this.slideRatio){
                var slideFactorPixels = this.slideFactor;
                var getSlideFactor = function() {
                    return slideFactorPixels;
                };
            } else {
                var slideRatio = this.slideRatio;
                var getSlideFactor = function(dim) {
                    return this.map.getSize()[dim] * slideRatio;
                };
            }

            btn.getSlideFactor = getSlideFactor;
            this.buttons.push(btn);
            return btn;
        };

        //PanZoomBar的_addZoomBar函数重写
        SuperMap.Control.PanZoomBar.prototype._addZoomBar = function(centered_roll) {
            //处理设置初始化等级参数的情况
            if(this.map.getNumZoomLevels()){
                this.zoomStopHeight=(this.sliderBarHeight-11.5)/(this.map.getNumZoomLevels() - 1);
            }
            imgLocation = SuperMap.Util.getImagesLocation();

            //添加进度球
            var slider = null;
            var id = this.id + "_" + this.map.id;
            //计算当前球的位置
            var zoomsToEnd = this.map.getNumZoomLevels()- 1- this.map.getZoom();

            slider = SuperMap.Util.createAlphaImageDiv(id,centered_roll.add(this.sliderBarWidth/2-5.5, zoomsToEnd * this.zoomStopHeight+1),
                    sz3, imgLocation+"slider.png","absolute");

            slider.style.cursor = "pointer";
            this.slider = slider;
            this.sliderEvents = new SuperMap.Events(this, slider, null, true, {includeXY: true});
            this.sliderEvents.on({
                "touchstart": this.zoomBarDown,
                "touchmove": this.zoomBarDrag,
                "touchend": this.zoomBarUp,
                "mousedown": this.zoomBarDown,
                "mousemove": this.zoomBarDrag,
                "mouseup": this.zoomBarUp,
                "dblclick": this.doubleClick,
                "click": this.doubleClick
            });                   
            //滚轮滑过，滑动条的样式
            var szTemp_zoombar_three = new SuperMap.Size(this.sliderBarWidth-2,3);
            var div_zoombar_three = null;
            if (SuperMap.Util.alphaHack()) {
                var id = this.id + "_" + this.map.id;
                div_zoombar_three = SuperMap.Util.createAlphaImageDiv(id, centered_roll.add(1,this.sliderBarHeight),
                    new SuperMap.Size(this.sliderBarWidth-2,this.sliderBarHeight), imgLocation + "zoombar_glide.png", "absolute", null, "crop");
                div_zoombar_three.style.height = szTemp_zoombar_three.h + "px";
            } else {
                div_zoombar_three = SuperMap.Util.createDiv('SuperMap_Control_PanZoomBar_Zoombar' + this.map.id,
                    centered_roll.add(1,this.sliderBarHeight), new SuperMap.Size(this.sliderBarWidth-2,this.sliderBarHeight), imgLocation+"zoombar_glide.png");
            }
            div_zoombar_three.style.cursor = "pointer";
            this.div_zoombar_three = div_zoombar_three;
            this.divEvents = new SuperMap.Events(this, div_zoombar_three, null, true,{includeXY: true});
            this.divEvents.on({
                "touchmove": this.passEventToSlider,
                "mousedown": this.divClick,
                "mousemove": this.passEventToSlider,
                "dblclick": this.doubleClick,
                "click": this.doubleClick
            });                        
            this.div.appendChild(div_zoombar_three);

            //添加滚动条中的线条，滚动条未经过的样式
            var div_zoombar_one = null;
            if (SuperMap.Util.alphaHack()) {
                var id = this.id + "_" + this.map.id;
                div_zoombar_one = SuperMap.Util.createAlphaImageDiv(id, centered_roll.add(this.sliderBarWidth/2-0.5,0),
                    new SuperMap.Size(1, this.sliderBarHeight),imgLocation + "zoombar_center.png",  "absolute", null, "crop");
                div_zoombar_one.style.height = this.sliderBarHeight + "px";
            } else {
                div_zoombar_one = SuperMap.Util.createDiv( 'SuperMap_Control_PanZoomBar_Zoombar' + this.map.id,
                    centered_roll.add(this.sliderBarWidth/2-0.5,0), new SuperMap.Size(1, this.sliderBarHeight) ,imgLocation+"zoombar_center.png");
            }
            div_zoombar_one.style.cursor = "pointer";
            this.div_zoombar_one = div_zoombar_one;
            this.div.appendChild(div_zoombar_one);

            //添加滚动条背景
            var div_zoombar = null;                        
            if (SuperMap.Util.alphaHack()) {
                var id = this.id + "_" + this.map.id;
                div_zoombar = SuperMap.Util.createAlphaImageDiv(id, centered_roll, new SuperMap.Size(this.sliderBarWidth, this.sliderBarHeight),imgLocation + "zoombar.png","absolute", null, "crop");
                div_zoombar.style.height = this.sliderBarHeight + "px";
            } else {
                div_zoombar = SuperMap.Util.createDiv('SuperMap_Control_PanZoomBar_Zoombar' + this.map.id,centered_roll,new SuperMap.Size(this.sliderBarWidth, this.sliderBarHeight),imgLocation+"zoombar.png");
            }
            div_zoombar.style.cursor = "pointer";
            this.div_zoombar = div_zoombar;
            this.divEvents = new SuperMap.Events(this, div_zoombar, null, true, {includeXY: true});
            if(SuperMap.Browser.device === "pc"){
                this.divEvents.on({
                    "touchmove": this.passEventToSlider,
                    "mousedown": this.divClick,
                    "mousemove": this.passEventToSlider,
                    "mouseup": this.passEventToSlider,
                    "dblclick": this.doubleClick,
                    "click": this.doubleClick,
                    "mouseover":this.mouseOverLevel
                });
            }else{
                this.divEvents.on({
                    "touchmove": this.passEventToSlider,
                    "mousedown": this.divClick,
                    "mousemove": this.passEventToSlider,
                    "mouseup": this.passEventToSlider,
                    "dblclick": this.doubleClick,
                    "click": this.doubleClick
                });
            } 
            this.div.appendChild(div_zoombar);
            //添加等级划分
            if(this.map.getNumZoomLevels()){
                var booleanLevel = false;
                this.divLevel  =  SuperMap.Util.createDiv("", centered_roll.add(this.sliderBarWidth,0), new SuperMap.Size(this.sliderBarWidth+30,120));
                var centered_roll_level = centered_roll.add(-centered_roll.x,-centered_roll.y);
                if(!!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1)){
                    //this.divLevel.style.backgroundColor = "#c3c3c3";
                    var src = "url('" + imgLocation + "blank.gif')";
                    this.divLevel.style.background = src;
                    //this.divLevel.style.filter = "alpha(opacity = 100)";
                    //this.divLevel.style.opacity = 1;
                }
                if(SuperMap.Browser.device === "pc"){
                    this.divEventLevel = new SuperMap.Events(this, this.divLevel, null, true, {includeXY: true});
                    this.divEventLevel.on({
                        "mouseout": this.mouseOutLevel,
                        "mouseover": this.mouseOverLevel,
                        "mouseup": this.passEventToSlider
                    });
                }
                //初始化参数
                var sz = new SuperMap.Size(29,21);
                if(options && options.levelsDesc) {
                    this.levelsDesc = options.levelsDesc;
                    var div_zoom = null;
                    for(var i = 0, len = this.levelsDesc.levels.length; i<len;i++) {
                        this._buttonLabel(this.divLevel, div_zoom, centered_roll_level, this.levelsDesc.imageSources[i],this.levelsDesc.levels[i], sz);
                    }
                }
            }                
            this.startTop = parseInt(div_zoombar.style.top);
            this.div.appendChild(slider);
            this.moveZoomBar();
            this.map.events.register("zoomend", this, this.moveZoomBar);     
        };
    },

	 /**
	 * APIMethod: getDoms
	 * 获取组成控件的各个div。（不建议使用）
	 *
	 * (code)
     * var doms = control.getDoms();
     * var container = dom.container;//容器
     * var zoomIn = dom.zoomIn;//加号按钮
     * var zoomOut = dom.zoomOut;//减号按钮
     * var zoombarOne =  doms.zoombarOne;//缩放条中线线 、slider滑过前的样式
     * var zoomBar = dom.zoomBar;//缩放条背景
     * var zoombarThree = dom.zoomBar;//缩放条、slider滑过后的样式
     * var slider = dom.slider;//缩放条上的滚轮
     *
     * var pan= doms.pan;//罗盘背景
     * var panup= doms.panup;//上移按钮
     * var panleft= doms.panleft;//左移按钮
     * var panright= doms.panright;//右移按钮
     * var pandown= doms.pandown;//下移按钮
     * var zoommaxextent= doms.zoommaxextent;//罗盘中心的按钮
     * (end)
	 */
    getDoms: function(){
        var doms = {};
        doms.container = this.div;

        if(this.showCompass){
            doms.pan = this.buttons[0];
            doms.panup = this.buttons[1];
            doms.panleft = this.buttons[2];
            doms.panright = this.buttons[3];
            doms.pandown = this.buttons[4];
            doms.zoommaxextent = this.buttons[5];

            doms.zoomIn = this.buttons[6];
            doms.zoomOut = this.buttons[7];
        }
        else{
            doms.zoomIn = this.buttons[0];
            doms.zoomOut = this.buttons[1];
        }

        if(this.showSlider){
            doms.zoombarOne = this.div_zoombar_one;     //滚动条中线，滚动未滑过的样式
            doms.zoomBar = this.div_zoombar;
            doms.zoombarThree= this.div_zoombar_three;        //  滚动未滑过样式
            doms.slider = this.slider;
        }
        return doms;
    },

    /**
     * APIMethod: destroy
     * 解构控件，释放控件所占有的资源。
     */
    destroy: function() {
        this._removeZoomBar();
        this.map.events.un({
            "changebaselayer": this.redraw,
            scope: this
        });
        this.removeButtons();
        this.buttons = null;
        this.position = null;
        SuperMap.Control.prototype.destroy.apply(this, arguments);
        delete this.mouseDragStart;
        delete this.zoomStart;
    },    
    /**
     * Method: setMap
     * 
     * Parameters:
     * map - {<SuperMap.Map>} 
     */
    setMap: function(map) {
        SuperMap.Control.prototype.setMap.apply(this, arguments);
        this.map.events.register("changebaselayer", this, this.redraw);
    },
    /** 
     * Method: redraw
     * 清除div，重新开始绘制。 
     */
    redraw: function() {
        if (this.div != null) {
            this.removeButtons();
            this._removeZoomBar();
            if(this.divLevel&&this.divLevel.parentNode)
            {
                this.divLevel.parentNode.removeChild(this.divLevel);
                this.divLevel = null
            }
            this.mapLevel = [];
        }  
        this.draw();
    }, 
    /**
     * Method: _removeZoomBar
     */
    _removeZoomBar: function() {
        if(this.showSlider){
            this.sliderEvents.un({
                "touchmove": this.zoomBarDrag,
                "mousedown": this.zoomBarDown,
                "mousemove": this.zoomBarDrag,
                "mouseup": this.zoomBarUp,
                "dblclick": this.doubleClick,
                "click": this.doubleClick
            });
            this.sliderEvents.destroy();
            this.divEvents.un({
                "touchmove": this.passEventToSlider,
                "mousedown": this.divClick,
                "mousemove": this.passEventToSlider,
                "dblclick": this.doubleClick,
                "click": this.doubleClick,
                "mouseover":this.mouseOverLevel,
                "mouseup": this.passEventToSlider
            });
            this.divEvents.destroy();
            this.div.removeChild(this.slider);
            this.div.removeChild(this.div_zoombar_three);
            this.div.removeChild(this.div_zoombar_one);
            this.div.removeChild(this.div_zoombar);
            this.slider = null;
            this.div_zoombar_three = null;
            this.div_zoombar_one = null;
            this.div_zoombar = null;
        }
            this.map.events.unregister("zoomend", this, this.moveZoomBar);
    },    
    /**
     * Method: passEventToSlider
     * 用来传递在div或者map上的events.
     *
     * Parameters:
     * evt - {<SuperMap.Event>} 
     */
    passEventToSlider: function(evt) {
        if(this.showSlider){
            this.sliderEvents.handleBrowserEvent(evt);
        }
    },    
    /**
     * Method: divClick
     * 点击缩放滑竿设置缩放级别
     */
    divClick: function (evt) {
        if (!SuperMap.Event.isLeftClick(evt)) {
            return;
        }
        var levels = evt.xy.y / this.zoomStopHeight;
        if(this.forceFixedZoomLevel || !this.map.fractionalZoom) {
            levels = Math.floor(levels);
        }    
        var zoom = (this.map.getNumZoomLevels() - 1) - levels; 
        zoom = Math.min(Math.max(zoom, 0), this.map.getNumZoomLevels() - 1);
        this.map.zoomTo(zoom);
        SuperMap.Event.stop(evt);
    },    
    /*
     * Method: zoomBarDown
     * 监听点击滑块的事件。
     *
     * Parameters:
     * evt - {<SuperMap.Event>} 
     */
    zoomBarDown: function(evt) {
        if (!SuperMap.Event.isLeftClick(evt) && !SuperMap.Event.isSingleTouch(evt)) {
            return;
        }
        this.map.events.on({
            "touchmove": this.passEventToSlider,
            "mousemove": this.passEventToSlider,
            "mouseup": this.passEventToSlider,
            scope: this
        });
        this.mouseDragStart = evt.xy.clone();
        this.zoomStart = evt.xy.clone();
        // reset the div offsets just in case the div moved
        this.div_zoombar.offsets = null; 
        SuperMap.Event.stop(evt);
    },    
    /*
     * Method: zoomBarDrag
     * 实现跟客户端的交互，客户端实现拖拽事件时使用此方法，需要注意的是拖拽范围必须在滑竿的范围。
     *
     * Parameters:
     * evt - {<SuperMap.Event>} 
     */
    zoomBarDrag: function(evt) {
        if (this.mouseDragStart != null) {
            var deltaY = this.mouseDragStart.y - evt.xy.y;
            var offsets = SuperMap.Util.pagePosition(this.div_zoombar);
            if ((evt.clientY - offsets[1]) > 5.5 && 
                (evt.clientY - offsets[1]) < parseInt(this.div_zoombar.style.height) - 5.5) {
                var newTop = parseInt(this.slider.style.top) - deltaY;
                this.slider.style.top = newTop+"px";
                this.div_zoombar_three.style.top = newTop+6 + "px";
                var newHeight = parseInt(this.div_zoombar_three.style.height)+ deltaY;
                this.div_zoombar_three.style.height = newHeight+ "px";
                this.mouseDragStart = evt.xy.clone();
            }
            // set cumulative displacement
            this.deltaY = this.zoomStart.y - evt.xy.y;
            SuperMap.Event.stop(evt);
        }
    },    
    /*
     * Method: zoomBarUp
     * 接收到鼠标mouseup事件时进行清理 ，切换到新的缩放级别.
     *
     * Parameters:
     * evt - {<SuperMap.Event>} 
     */
    zoomBarUp: function(evt) {
        if (!SuperMap.Event.isLeftClick(evt) && evt.type !== "touchend") {
            return;
        }
        if (this.mouseDragStart) {
            this.div.style.cursor = "";
            this.map.events.un({
                "touchmove": this.passEventToSlider,
                "mouseup": this.passEventToSlider,
                "mousemove": this.passEventToSlider,
                scope: this
            });
            var zoomLevel = this.map.zoom;
            if (!this.forceFixedZoomLevel && this.map.fractionalZoom) {
                zoomLevel += this.deltaY/this.zoomStopHeight;
                zoomLevel = Math.min(Math.max(zoomLevel, 0), 
                                     this.map.getNumZoomLevels() - 1);
            } else {
                zoomLevel += this.deltaY/this.zoomStopHeight;
                zoomLevel = Math.max(Math.round(zoomLevel), 0);      
            }
            if(zoomLevel>this.map.getNumZoomLevels() - 1){
                zoomLevel=this.map.getNumZoomLevels() - 1;
            }
            this.map.zoomTo(zoomLevel);
            this.mouseDragStart = null;
            this.zoomStart = null;
            this.deltaY = 0;
            SuperMap.Event.stop(evt);
        }
    },    
    /*
    * Method: moveZoomBar
    * 改变当前的缩放级别改变滑竿位置。.
    */
    moveZoomBar: function() {
        var newTop = 
            (this.map.getNumZoomLevels()-1 - this.map.getZoom()) * 
            this.zoomStopHeight + this.startTop+1;
        if(isNaN(newTop)){
            newTop = 0;
        }
        this.slider.style.top = newTop + "px";
        this.div_zoombar_three.style.top = newTop+6+ "px";
        this.div_zoombar_three.style.height = this.map.getZoom()*this.zoomStopHeight+4.5+ "px";
    },
    /*
    * Method: _buttonLabel
    * 添加等级标签。
    */      
    _buttonLabel: function(divLevel,div_zoom_name,centered,img,level,sz,imgLocation){
        var rangLevel=new Array();
        var firstContent = img.lastIndexOf("/"),secondCotent=img.lastIndexOf(".");
        var imgName = img.substring(firstContent+1,secondCotent);
        if (SuperMap.Util.alphaHack()) {
            var id = this.id + "_" + this.map.id;
            div_zoom_name = SuperMap.Util.createAlphaImageDiv(id,centered.add(0,this.zoomStopHeight*level-10),
                     sz,
                     img, 
                     "absolute", null, "crop");
        } else {
            div_zoom_name = SuperMap.Util.createDiv(
                'SuperMap_Control_PanZoomBar_Zoombar' + imgName,
                centered.add(0,this.zoomStopHeight*level-3),
                sz ,
                img);
        }
        rangLevel[0]='SuperMap_Control_PanZoomBar_Zoombar' + imgName;
        rangLevel[1]=level;
        this.mapLevel.push(rangLevel);
        div_zoom_name.style.cursor = "pointer";
        div_zoom_name.style.display = "none";
        div_zoom_name.className = "sm_"+imgName;
        this.div_zoom_name = div_zoom_name;
            
        this.divEvents = new SuperMap.Events(this, div_zoom_name, null, true, 
                                                {includeXY: true});
        this.divEvents.on({
            "dblclick": this.doubleClickLevel,
            "click": this.doubleClickLevel
        });
        divLevel.appendChild(div_zoom_name);
        this.div.appendChild(divLevel);
    },
    /*
    * Method: doubleClickLevel
    * 点击相应的等级标签，地图相应的缩放
    */  
    doubleClickLevel: function(evt){
        var zoom,target,divName;
        var event = evt?evt:window.evt;
        if(event.srcElement){
            target = event.srcElement;
        }else{
            target = event.target;
        }
        divName=target.id;
        for(var i=0,len=this.mapLevel.length;i < len;i++){
            if(this.mapLevel[i][0]===divName){
                zoom = this.map.getNumZoomLevels()-1-this.mapLevel[i][1];
            }
        }
        this.map.zoomTo(zoom);
        SuperMap.Event.stop(evt);
    },
    /*
    * Method: mouseOverLevel
    * 鼠标进去相应的区域，显示等级标签，默认是隐藏的。
    */  
    mouseOverLevel: function(evt){
        for(var i = 0,len = this.mapLevel.length;i < len;i++){
            if(this.mapLevel[i]){
                document.getElementById(this.mapLevel[i][0]).style.display = "block";
            }
        }
    },
    /*
    * Method: mouseOverLevel
    * 鼠标离开相应的区域，隐藏等级标签。
    */
    mouseOutLevel:function(){
        for(var i = 0,len = this.mapLevel.length;i <len;i++){
            if(this.mapLevel[i]){
                document.getElementById(this.mapLevel[i][0]).style.display = "none";
            }
        }
    },
    /*
    * Method: btnMouseOver
    * 鼠标进去相应的区域，显示相应的图片。
    */
    btnMouseOver:function(){
        var imgLocation = SuperMap.Util.getImagesLocation();
        switch (this.action) {
                    case "panup": 
                        document.getElementById(this.id + "_pan_innerImage").src = imgLocation+"north-mini.png";
                        break;
                    case "pandown": 
                        document.getElementById(this.id + "_pan_innerImage").src = imgLocation+"south-mini.png";
                        break;
                    case "panleft": 
                        document.getElementById(this.id + "_pan_innerImage").src = imgLocation+"west-mini.png";
                        break;
                    case "panright": 
                        document.getElementById(this.id + "_pan_innerImage").src = imgLocation+"east-mini.png";
                        break;
        }
    },
    /*
    * Method: btnMouseOut
    * 鼠标离开相应的区域，显示相应的图片。
    */
    btnMouseOut:function(){
        var imgLocation = SuperMap.Util.getImagesLocation();
        switch (this.action) {
            case "panup": 
            case "pandown": 
            case "panleft": 
            case "panright": 
                document.getElementById(this.id + "_pan_innerImage").src = imgLocation + "zoom-maxextent-mini.png";
                break;
        }
    },
    /*
    * Method: getLinkStyle
    * 根据元素对象和样式名，获得相应的样式信息。
    */
    getLinkStyle:function (obj, prop) {      
        if (obj.currentStyle) {         
            return obj.currentStyle[prop];      
        }       
        else if (window.getComputedStyle) {         
            var props = prop.replace(/([A-Z])/g, "-$1");
            props = prop.toLowerCase();
            return document.defaultView.getComputedStyle (obj,null)[props];      
        }       
        return null;    
    },
    /**
     * Method: _removeButton
     * 
     * Parameters:
     * btn - {Object}
     */
    _removeButton: function(btn) {
        SuperMap.Event.stopObservingElement(btn);
        btn.map = null;
        btn.getSlideFactor = null;
        this.div.removeChild(btn);
        SuperMap.Util.removeItem(this.buttons, btn);
    },
    
    /**
     * Method: removeButtons
     */
    removeButtons: function() {
        for(var i=this.buttons.length-1; i>=0; --i) {
            this._removeButton(this.buttons[i]);
        }
    },
    
    /**
     * Method: doubleClick
     *
     * Parameters:
     * evt - {Event} 
     *
     * Returns:
     * {Boolean}
     */
    doubleClick: function (evt) {
        SuperMap.Event.stop(evt);
        return false;
    },
    
    /**
     * Method: buttonDown
     *
     * Parameters:
     * evt - {Event} 
     */
    buttonDown: function (evt) {
        if (!SuperMap.Event.isLeftClick(evt)) {
            return;
        }
        switch (this.action) {
            case "panup": 
                this.map.pan(0, -this.getSlideFactor("h"));
                break;
            case "pandown": 
                this.map.pan(0, this.getSlideFactor("h"));
                break;
            case "panleft": 
                this.map.pan(-this.getSlideFactor("w"), 0);
                break;
            case "panright": 
                this.map.pan(this.getSlideFactor("w"), 0);
                break;
            case "zoomin": 
                this.map.zoomIn(); 
                break;
            case "zoomout": 
                this.map.zoomOut(); 
                break;
            case "zoommaxextent": 
                this.map.zoomToMaxExtent(); 
                break;
        }
        SuperMap.Event.stop(evt);
    },
    CLASS_NAME: "SuperMap.Control.PanZoomBar"    
});
