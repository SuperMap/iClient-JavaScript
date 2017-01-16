/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Control.js
 */

/**
 * Class: SuperMap.Control.ChangeTilesVersion
 * 切片版本切换控件类，目前只用于TiledDynamicLayer。
 * 用于切换关联图层的切片版本。默认情况下水平显示在地图左上方。
 *
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.ChangeTilesVersion = SuperMap.Class(SuperMap.Control,{
    /**
     * Property: body
     * {DOMElement}
     * 控件的整个div。
     */
    body: null,

    /**
     * Property: infDiv
     * {DOMElement}
     * 显示版本信息的容器。
     */
    infDiv: null,

    /**
     * Property: layer
     * {Object}
     * 与控件相关联的图层。
     */
    layer: null,

    /**
     * APIProperty: infowidth
     * {Number}
     * 控件显示版本信息的宽度，默认为50。
     */
    infWidth: 50,

    /**
     * Property: cHeight
     * {Number}
     * 控件的高度。
     */
    cHeight: 29,

    /**
     * Property: btnWidth
     * {Number}
     * button控件的宽度。
     */
    btnWidth: 32,

    /**
     * Property: slider
     * {DOMElement}
     * 滑动条。
     */
    slider: null,

    /**
     * Property: sliderHeight
     * {Number}
     * 进度条高度。
     */
    sliderHeight: 7,

    /**
     * Property: sliderBar
     * {DOMElement}
     * 滑块。
     */
    sliderBar: null,

    /**
     * Property: sliderBarHeight
     * {Number}
     * 滑块高度。
     */
    sliderBarHeight: 20,

    /**
     * Property: sliderBarHeight
     * {Number}
     * 滑块高度。
     */
    sliderBarWidth: 18,

    //滑动需要改变的元素。
    changeElements: [],

    //元素left初始值。
    elementLefts: [],

    /**
     * Property: enable
     * {Boolean}
     * 是否可用,默认为不可用；当设置图层，请求到切片版本参数 并且版本数大于0即为可用。
     */
    enable: false,

    /**
     * APIProperty: showSlider
     * {Boolean}
     * 是否显示滑动条。
     */
    showSlider: true,

    /**
     * Property: sliderBarEvents
     * {<SuperMap.Events>}
     * 滑块事件。
     */
    sliderBarEvents : null,

    /**
     * APIProperty: sliderWidth
     * {Number}
     * 进度条总长度，默认是160。
     */
    sliderWidth: 160,

    /**
     * Property: tileWidth
     * {Number}
     * 每个版本拥有的长度。
     */
    tileWidth: null,

    /**
     * Property:popInfDiv
     * {DOMElement}
     * pop信息框容器
     */
    popInfDiv: null,

    /**
     * Constructor: SuperMap.Control.ChangeTilesVersion
     * 创建ChangeTilesVersion控件，options作为参数传递直接扩展控件.如下面的例子所示：
     *
     * Parameters:
     * options - {Object}
     *
     * Example:
     * (code)
     * var changeTilesVersion = new SuperMap.Control.ChangeTilesVersion({defaultPosition: new SuperMap.Pixel(100,40)});
     * //与图层关联
     * changeTilesVersion.setLayer(layer);
     * //添加到地图上
     * map.addControl(changeTilesVersion);
     * (end)
     *
     */
    initialize: function (options) {
        this.defaultPosition = new SuperMap.Pixel(120,60);
        SuperMap.Control.prototype.initialize.apply(this,arguments);
    },

    /**
     * APIMethod: destroy
     * 解构TiledDynamicRESTLayer类，释放资源。
     */
    destroy: function () {
        var me = this;
        this.body = null;
        this.infDiv = null;
        this.layer = null;
        this.infWidth = null;
        this.cHeight = null;
        this.btnWidth = null;
        this.slider = null;
        this.sliderHeight = null;
        this.sliderBarHeight = null;
        this.sliderBar = null;
        this.changeElements= null;
        this.elementLefts = null;
        this.enable = null;
        if(this.showSlider){
            this.sliderBarEvents.un({
                "mousedown" : me.sliderBarDown,
                "mousemove" : me.sliderBarDrag,
                "mouseup" : me.sliderBarUp
            });
            this.domEvents.un({
                "mousemove": me.passEventToSlider,
                "mouseup": me.passEventToSlider
            });
        }
        this.showSlider = null;
        this.sliderBarEvents = null;
        this.sliderWidth = null;
        this.tileWidth = null;
        this.popInfDiv = null;

        SuperMap.Control.prototype.destroy.apply(this,arguments);
    },

    /**
     * APIMethod: setLayer
     * 将控件与目标图层相关联
     *
     * Parameters:
     * layer - {<SuperMap.Layer.TiledDynamicRESTLayer>} 目标图层
     *
     */
    setLayer: function(layer){
        this.enable = false;
        this.layer = layer;
        layer.TilesVersionControl = this;
        layer.getTilesetsInf();
    },

    /**
     * Method: setTilesWidth
     * 计算当前图层每个版本所拥有进度条的长度
     */
    setTileWidth: function(){
        var me = this;
        if(me.layer && me.layer.tilesets){
            var tileVersions = me.layer.tilesets.tileVersions;
            var length = tileVersions.length;
            if(length >0){
                me.tileWidth = me.sliderWidth/tileVersions.length;
                me.enable = true;
            }
        }
    },

    /**
     * Method: draw
     */
    draw: function(){
        var div = SuperMap.Control.prototype.draw.apply(this,arguments),
            links = this.getOrCreateLinks(div),
            tilesVersionReduce = links.tilesVersionReduce,
            tilesVersionCenter = links.tilesVersionCenter,
            tilesVersionAdd = links.tilesVersionAdd;

        if(!this.observed){
            var handler = function(me){
                return function(evt){
                    me.buttonClick(evt)
                }
            }(this);
            SuperMap.Event.observe(tilesVersionReduce,"mousedown",SuperMap.Function.bindAsEventListener(handler,tilesVersionReduce));
            SuperMap.Event.observe(tilesVersionAdd,"mousedown",SuperMap.Function.bindAsEventListener(handler,tilesVersionReduce));
            this.observed = true;
        }

        this.tilesVersionReduceLink = tilesVersionReduce;
        this.tilesVersionCenterLink = tilesVersionCenter;
        this.tilesVersionAddLink = tilesVersionAdd;
        return div;
    },

    /**
     * Method: getOrCreateLinks
     * 创建版本切换加减和版本信息显示按钮
     *
     * Parameters:
     * el - {DOMElement} 父容器
     */
    getOrCreateLinks: function(el){
        var
            tilesVersionReduce = this.tilesVersionReduceLink,
            tilesVersionCenter = this.tilesVersionCenterLink,
            tilesVersionAdd = this.tilesVersionAddLink,
            b = this.body,s;
        if(!b){
            b = this.createElementWithStyle(el,"div",null,this.defaultPosition.y,this.defaultPosition.x);
            this.body = b;
        }
        if(!tilesVersionReduce){
            tilesVersionReduce = this.createBtn(b,"tilesversion-bcg-reduce.png",0);
            SuperMap.Element.addClass(tilesVersionReduce,"smButton");
        }

        if(!tilesVersionCenter){
            tilesVersionCenter = this.createCenter(b);
        }

        if(!tilesVersionAdd){
            tilesVersionAdd = this.createBtn(b,"tilesversion-bcg-add.png",1);
            SuperMap.Element.addClass(tilesVersionAdd,"smButton");
        }

        return {
            tilesVersionReduce: tilesVersionReduce, tilesVersionCenter: tilesVersionCenter, tilesVersionAdd:tilesVersionAdd
        };
    },

    /**
     * Method: createBtn
     * 创建左右两边按钮。
     *
     * Parameters:
     * p - {DOMElement} 父容器
     * m - {String} 图片名称
     * i - {String} 第几个button
     *
     * Return:
     * {DOMElement} 创建好的按钮对象
     */
    createBtn: function(p,m,i){
        var me = this, centerWidth,btn,src,left;
        if(i === 1) {
            centerWidth = me.showSlider ? (me.sliderWidth + me.sliderBarWidth) : me.infWidth;
            left = me.btnWidth + centerWidth;
        }
        src = SuperMap.Util.getImagesLocation() + m;
        btn = me.createElementWithStyle(p,"div","absolute",null,left,me.cHeight,me.btnWidth,null,src,"pointer");
        return btn;
    },

    /**
     * Method: createCenter
     * 创建控件中间部分 1，包含滚动条（默认）； 2、 不包含滚动条，即中间只有版本信息
     *
     * p - String 父容器
     */
    createCenter: function(p){
        //1、创建center容器
        var c, width, src, me = this;
        width = me.showSlider ? (me.sliderWidth + me.sliderBarWidth) : me.infWidth;
        src = SuperMap.Util.getImagesLocation() + "tilesversion-bcg-center.png";
        c = me.createElementWithStyle(p,"div","absolute",null,me.btnWidth,me.cHeight,width,null,src,null);
        //创建子元素
        if(me.showSlider){
            me.createSlider(c);
            me.createPopInf(c);
        }
        else{
            me.createInf(c);
        }
        return c;
    },

    /**
     * 创建滑块 滑动条
     */
    createSlider: function(p){
        var cb, cv, sb, d = document, me = this, top, src, toptemp;
        toptemp = me.cHeight/2;

        //滑动条背景 slider background
        top = toptemp - me.sliderHeight/2;
        src = SuperMap.Util.getImagesLocation() + "tilesversion-bcg-slider1.png";
        cb = me.createElementWithStyle(p,"div","absolute",top,me.sliderBarWidth/2,me.sliderHeight,me.sliderWidth,null,src,"pointer");
        SuperMap.Event.observe(cb,"mousedown",SuperMap.Function.bindAsEventListener(me.sliderDown,me));

        //滑动条进度 slider Value
        src = SuperMap.Util.getImagesLocation() + "tilesversion-bcg-slider2.png";
        cv = me.createElementWithStyle(cb,"div","absolute",1,1,me.sliderHeight-1,null,null,src,"pointer");
        me.slider = cv;

        //滑块 sliderBar
        top = toptemp - me.sliderBarHeight/2;
        src = SuperMap.Util.getImagesLocation() + "tileservision-bcg-sliderbar.png";
        sb = me.createElementWithStyle(p,"div","absolute",top,0,me.sliderBarHeight,me.sliderBarWidth,null,src,"pointer");
        me.sliderBar = sb;
        me.changeElements.push(sb);
        me.elementLefts.push(0);
        //记录控件在屏幕上的初始位置
        me.sliderBarDragStartX = me.defaultPosition.x + me.btnWidth + me.sliderBarWidth/2;
        me.sliderBarEvents = new SuperMap.Events(me,sb,null,true);
        me.sliderBarEvents.on({
            "mousedown" : me.sliderBarDown,
            "mousemove" : me.sliderBarDrag,
            "mouseup" : me.sliderBarUp
        });

        //将DOM事件传递给sliderbar
        me.domEvents = new SuperMap.Events(me,d,null,true);
        me.domEvents.on({
            "mousemove": me.passEventToSlider,
            "mouseup": me.passEventToSlider
        });
    },

    /**
     * 创建信息显示 (不显示滑动条)
     */
    createInf: function(p){
        var i,d = document, s;
        i = d.createElement("div");
        s = i.style;
        s.margin = "5px";
        s.textAlign = "center";
        //i.innerHTML = "V1";
        p.appendChild(i);
        this.infDiv = i;
    },

    /**
     * 创建信息显示 （显示滑动条）
     */
    createPopInf: function(p){
        var popinf, inf, inf_bottom, inf_left, inf_right, container, left, me = this, imgsrc;

        // 记录pop信息显示的size 用于拼接 如果图片更改，改变下面参数即可
        var inf_bottomWidth = 8;
        var inf_bottomHeight = 8;
        var inf_popHeight = 26;
        var inf_leftWidth = 6;
        var distance = 3; //pop信息框与注控件之间的距离

        //创建total
        var height = inf_popHeight + inf_bottomHeight;
        var width = 2*inf_leftWidth + me.infWidth;
        left = -width/2 + inf_leftWidth;
        popinf = me.createElementWithStyle(p,"div","absolute",-height - distance,left,height,width);
        popinf.style.display = "none";
        me.popInfDiv = popinf;
        me.changeElements.push(popinf);
        me.elementLefts.push(left);

        //创建pop信息显示背景 left
        imgsrc = SuperMap.Util.getImagesLocation() + "tilesversion-bcg-inf_left.png";
        inf_left = me.createElementWithStyle(popinf,"div","absolute",7,null,inf_popHeight,inf_leftWidth,null,imgsrc,"pointer");

        //创建pop信息显示背景 中间 30*infWidth
        imgsrc = SuperMap.Util.getImagesLocation() + "tilesversion-bcg-inf.png";
        inf = me.createElementWithStyle(popinf,"div","absolute",7,inf_leftWidth,inf_popHeight,me.infWidth,null,imgsrc,"pointer");

        //创建pop信息显示背景 right
        imgsrc = SuperMap.Util.getImagesLocation() + "tilesversion-bcg-inf_right.png";
        left = inf_leftWidth + me.infWidth;
        inf_right = me.createElementWithStyle(popinf,"div","absolute",7,left,inf_popHeight,inf_leftWidth,null,imgsrc,"pointer");

        //创建下标 目前高度是 8*11
        left = width/2 - inf_bottomWidth/2;
        imgsrc = SuperMap.Util.getImagesLocation() + "tilesversion-bcg-inf_bottom.png";
        inf_bottom = me.createElementWithStyle(popinf,"div","absolute",inf_popHeight + distance,left,inf_bottomHeight,inf_bottomWidth,null,imgsrc,"pointer");

        //创建信息显示容器
        container = me.createElementWithStyle(inf,"div",null,null,null,null,null,null,null,"pointer");
        container.style.margin = "2px";
        container.style.textAlign = "center";
        SuperMap.Element.addClass(container,"smNoSelect");
        me.infDiv = container;
    },

    /**
     * Method: createElementWithStyle
     * 根据类型创建相应的元，素并设置相应的样式，并添加到父元素对象中。
     *
     * Parameters:
     * element - {Object} 父元素,如div
     * type - {String} 需要创建元素的类型，如"div"、"img"
     * position - {String} css中的position，如"absolute"
     * top - {Number} 距离顶端的距离
     * left - {Number} 距离左边的距离
     * height - {Number} 高度
     * width - {Number} 宽度
     * background - {String} 背景颜色，如"#ff00ff"
     * imgsrc - {String} 背景图片的路径
     * cursor - {String} 鼠标在元素上的样式
     *
     * Returns:
     * {Object} 成功返回新创建的元素，失败返回false
     */
    createElementWithStyle: function(element,type,position,top,left,height,width,background,imgsrc,cursor){
        var s, e, d = document;
        if(element){
            e = d.createElement(type);
            s = e.style;
            if(position) s.position = position;
            if(top) s.top = top + "px";
            if(left) s.left = left + "px";
            if(height) s.height = height + "px";
            if(width) s.width = width + "px";
            if(background) s.background = background;
            if(imgsrc) s.background = "url(" + imgsrc + ")";
            if(cursor) s.cursor = cursor;
            element.appendChild(e);
            return e;
        }
        return null;
    },

    /**
     * Method: sliderDown
     * 鼠标在滑动条按钮上按下后
     */
    sliderDown: function(evt){
        if(!SuperMap.Event.isLeftClick(evt)) return;
        var me = this;
        if(me.enable){
            me.sliderMouseDown = true;
            me.offset = evt.offsetX;
            me.changElementsStyle(evt.offsetX);
        }
        SuperMap.Event.stop(evt);
    },

    /**
     * Method: changElementsStyle
     * 1、改变进度条width 2、滑块left  3、改变pop信息容器的left
     *
     * Parameters:
     * value - {Number} 需要设定的值
     */
    changElementsStyle: function(value){
        var me = this;
        me.slider.style.width = value + "px";

        for(var i = 0; i < me.changeElements.length; i++){
            me.changeElements[i].style.left = value + me.elementLefts[i] + "px";
        }
    },

    /**
     * Method: sliderBarDown
     * 滑块鼠标左键mousedown处理
     */
    sliderBarDown: function(evt){
        if(!SuperMap.Event.isLeftClick(evt)) return;
        if(this.enable) this.sliderBarDragStart = true;
        SuperMap.Event.stop(evt);
    },

    /**
     * Method: sliderBarDrag
     * 滑块鼠标左键mousemove处理
     */
    sliderBarDrag: function(evt){
        if(this.sliderBarDragStart){
            var me = this;
            me.offset = evt.clientX - me.sliderBarDragStartX;
            if(me.offset >= 0 && me.offset <= me.sliderWidth ){
                me.changElementsStyle(me.offset);
            }
        }
        SuperMap.Event.stop(evt);
    },

    /**
     * Method: sliderBarUp
     * 滑块鼠标左键mouseup
     */
    sliderBarUp: function(evt){
        if(!SuperMap.Event.isLeftClick(evt)) return;
        var me = this;
        if(me.sliderBarDragStart){
            me.sliderBarDragStart = false;
            me.handleEventResult(0);
        }
        else if(me.sliderMouseDown){
            me.sliderMouseDown = false;
            me.handleEventResult(0);
        }
        SuperMap.Event.stop(evt);
    },

    /**
     * Method: handleEventResult
     * 处理事件响应之后具体处理
     *
     * Parameters:
     * type - {Number} 处理事件的类型 0（滑块拖动 滑条点击）1（左右按钮点击）
     */
    handleEventResult: function(type){
        var me = this, index;
        // 处理情况1 滑块拖动 滑条点击
        if(type === 0){
            //结束拖动 跳转到相应的版本
            index = Math.round(me.offset/me.tileWidth);
            if(index >= 1 && index <= me.layer.tilesets.tileVersions.length-1) index -= 1;
            else if(index < 0) index = 0;
            else if(index > me.layer.tilesets.tileVersions.length-1) index = me.layer.tilesets.tileVersions.length-1;
            //跳转到相应的版本
            me.layer.tempIndex = index;
            me.layer.changeTilesVersion();
            if(me.layer.tempIndex === me.layer.tilesetsIndex){
                me.changElementsStyle((index + 1)*me.tileWidth);
            }
        }
        //情况2 左右按钮点击
        if(type === 1){
            index = me.layer.tilesetsIndex;
            if(me.layer.tempIndex === index){
                me.changElementsStyle((index + 1)*me.tileWidth);
            }
        }
        if(me.enable) me.popInfDiv.style.display = "block";
    },

    /**
     * Method: onTilesVersionClick
     * 当点击版本切换按钮时调用
     */
    onTilesVersionClick: function(evt){
        this.layer.infDiv = this;
        var button = evt.buttonElement;
        if(button === this.tilesVersionAddLink){
            //版本增加1 调用关联图层的方法
            this.layer.nextTilesVersion();

        }else if(button === this.tilesVersionReduceLink){
            //版本减1 调用关联图层的方法
            this.layer.lastTilesVersion();
        }
        SuperMap.Event.stop(evt);
    },

    /**
     * Method: setTileInf
     * 给控件设置当前的版本信息
     *
     * Parameters:
     * desc - {String} 当前版本的desc
     */
    setInf: function(desc){
        if(desc && desc !== null)
            this.infDiv.innerHTML = desc;
    },

    /**
     * Method: buttonClick
     * 处理鼠标事件
     */
    buttonClick: function(evt){
        var element = SuperMap.Event.element(evt);
        if(element && (SuperMap.Event.isLeftClick(evt) || !~evt.type.indexOf("mouse"))){
            var button = this.getPressedButton(element);
            if(button){
                var args ={buttonElement: button};
                this.onTilesVersionClick(args);
                this.handleEventResult(1);
            }
        }
    },

    /**
     * Method: passEventToSlider
     * 用来传递div 或者Map上的events
     *
     * Parameters:
     * evt - {<SuperMap.Event>}
     */
    passEventToSlider: function(evt){
        if(this.showSlider) this.sliderBarEvents.handleBrowserEvent(evt);
    },

    /**
     * Method: getPressedButton
     * Get the pressed button, if any. Returns undefined if no button
     * was pressed.
     *
     * Arguments:
     * element - {DOMElement} The event target.
     *
     * Returns:
     * {DOMElement} The button element, or undefined.
     */
    getPressedButton: function(element) {
        var depth = 3, // limit the search depth
            button;
        do {
            if(SuperMap.Element.hasClass(element, "smButton")) {
                // hit!
                button = element;
                break;
            }
            element = element.parentNode;
        } while(--depth > 0 && element);
        return button;
    },

    CLASS_NAME: "SuperMap.Control.ChangeTilesVersion"
});