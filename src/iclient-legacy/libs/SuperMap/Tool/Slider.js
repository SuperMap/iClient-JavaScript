/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

SuperMap.Tool.Slider=SuperMap.Class({
    /**
     * APIProperty: enable
     * {Boolean}  设置这个属性可以启用和禁用此控件
     * */
    enable:true,

    /**
     * APIProperty: container
     * {String|DOMElment}  容器对应DOM元素或者其ID值
     * */
    container:null,

    /**
     * Property: barSize
     * {Number}  可拖动的按钮宽度
     * */
    barSize:16,

    /**
     * Property: sliderSize
     * {Number}  滑块的长度
     * */
    sliderSize:150,

    /**
     * APIProperty: min
     * {Number}  滑块的范围值中的最小值
     * */
    min:0,

    /**
     * APIProperty: min
     * {Number} - 滑块的范围值中的最大值
     * */
    max:1,

    /**
     * Property: value
     * {Number}  滑块的当前的值
     * */
    value:0,

    /**
     * APIProperty: step
     * {Number} - 滑块的每一步所走的距离
     * */
    step:0.05,

    /**
     * APIProperty: slider
     * {DOMElement}  滑块的滑条
     * */
    slider:null,

    /**
     * Property: _completeBar
     * {DOMElement} - 滑块的指示条
     * */
    _completeBar:null,

    /**
     * Property: _sliderBar
     * {DOMElement} 滑块的滑动按钮
     * */
    _sliderBar:null,

    /**
     * APIProperty: onChanging
     * {Function}  滑块值移动过程中触发此函数，返回改变了的值
     * */
    onChanging:function(value){},

    /**
     * APIProperty: onChanged
     * {Function}  滑块移动完成，也就是滑动完成松开鼠标时触发此函数，返回改变了的值
     * */
    onChanged:function(value){},

    drag:null,
    drop:null,
    mousedown:null,

    /**
     *  Constructor: SuperMap.Tool.Slider
     *  滑条控件，类似于html5中的type等于range的input元素，可以滑动滑块返回一个值
     *
     * Parameters:
     * option - {Object} 传给此控件的一些初始化信息，可以是enable,min,max等等
     *
     * Examples:
     * (start code)
     *      var slider=new SuperMap.Tool.Slider({"container":"slider","min":0,"max":100,"step":10});
     *      slider.onChanged=function(value){
     *          console.log(value);
     *      }
     * (end)
     * */
    initialize:function(options){
        SuperMap.Util.extend(this, options);
        this.drag=SuperMap.Function.bind(this.handleDrag,this);
        this.drop=SuperMap.Function.bind(this.handleDrop,this);
        this.mousedown=SuperMap.Function.bind(this.handleMouseDown,this);
        this.createSlider();
        this.appendTo(this.container);
        this.setValue(this.value);
        this.slider.smSlider=this;
    },

    /**
     * APIMethod: destroy
     * 析构函数，用于移除此控件
     * */
    destroy:function(){
        if(this.container&&this.slider){
            this.container.removeChild(this.slider);
        }
        this.enable=null;
        this.container=null;
        this.barSize=null;
        this.sliderSize=null;
        this.min=null;
        this.max=null;
        this.value=null;
        this.step=null;
        this.slider=null;
        this._sliderBar=null;
        this._completeBar=null;
        this.onChanging=null;
        this.onChanged=null;
        this.drag=null;
        this.drop=null;
        this.mousedown=null;
        this.smSlider=null;
    },

    /**
     * APIMethod: getValue
     * 获取当前值
     * */
    getValue:function(){
        return this.value;
    },

    /**
     * APIMethod: setValue
     * 设置当前值
     *
     * Parameters:
     * {Number} - 要设置的值
     * */
    setValue:function(value){
        value=value>this.max?this.max:value;
        value=value<this.min?this.min:value;
        value=parseFloat(value);
        value=Math.round(value/this.step)*this.step;
        value=SuperMap.Number.limitSigDigs(value,10)
        this.value=value;
        var offsetLeft=(value-this.min)*(this.sliderSize-this.barSize)/(this.max-this.min);
        this._sliderBar.style.left=offsetLeft+"px";
        this._completeBar.style.width=offsetLeft+"px";
    },

    /**
     * Method: createSlider
     * 创建控件的相关DOM元素
     * */
    createSlider:function(){
        var me=this;
        var slider=this.slider=document.createElement("div");
        slider.setAttribute("class","smToolSlider");
        var completeBar=this._completeBar=document.createElement("div");
        completeBar.setAttribute("class","smToolCompleteBar");
        var sliderBar=this._sliderBar=document.createElement("div");
        sliderBar.setAttribute("class","smToolSliderBar");
        slider.appendChild(completeBar);
        slider.appendChild(sliderBar);

        this.setSliderSize(this.sliderSize);
        this.setSliderBarSize(this.barSize);
        this.setCompleteBarSize();

        SuperMap.Event.observe(sliderBar,"mousedown",this.mousedown);
        SuperMap.Event.observe(slider,"click",function(){
            if(me.enable){
                me.drag.apply(me,arguments);
                me.onChanged.call(me,me.value);
            }
        });
    },

    setSliderSize:function(size){
        this.sliderSize=size;
        this.slider.style.width=size+"px";
    },

    setCompleteBarSize:function(){
        this._completeBar.style.width=this._sliderBar.clientLeft;
    },

    setSliderBarSize:function(size){
        this.barSize=size;
        this._sliderBar.style.width=size+"px";
    },

    /**
     * APIMethod: appendTo
     * 加到某一个滑动条容器上
     *
     * Parameters:
     * element - {String|DOMElement} 容器对应DOM元素或者其ID值
     * */
    appendTo:function(element){
        if(element){
            element=this.container=SuperMap.Util.getElement(element);
            element.appendChild(this.slider);
        }
    },

    /**
     * Method: handleMouseDown
     * 鼠标在滑动条按钮上按下后，在document上注册鼠标移动和鼠标放开事件
     * */
    handleMouseDown:function(event){
        if(this.enable){
            event=event||window.event;
            SuperMap.Element.addClass(this._sliderBar,"down");
            SuperMap.Event.observe(document,"mousemove",this.drag);
            SuperMap.Event.observe(document,"mouseup",this.drop);
        }
    },

    /**
     * Method: handleDrag
     * 鼠标按下并移动视为drag拖动事件
     * */
    handleDrag:function(event){
        event=event||window.event;
        var left=this.getElementPosiontion(this.slider).left;
        var right=this.sliderSize-this.barSize-2;
        var currentLeft=event.clientX-left-9;
        currentLeft=currentLeft<0?0:currentLeft;
        currentLeft=currentLeft>right?right:currentLeft;
        currentLeft=this.caculatePosition(currentLeft);
        this._sliderBar.style.left=currentLeft+"px";
        this._completeBar.style.width=currentLeft+"px";

        event.preventDefault();
        event.stopPropagation();

        this.onChanging(this.value);
    },

    /**
     * Method: handleDrop
     * 鼠标放开视为drop拖放事件
     * */
    handleDrop:function(event){
        SuperMap.Element.removeClass(this._sliderBar,"down");
        SuperMap.Event.stopObserving(document,"mousemove",this.drag);
        SuperMap.Event.stopObserving(document,"mouseup",this.drop);

        this.onChanged(this.value);
    },

    /**
     * Method: caculatePosition
     * 鼠标拖动过程中实时计算按钮的位置以及value值
     * */
    caculatePosition:function(left){
        var distance=this.max-this.min;
        if(distance<0){
            return 0;
        }
        var step=this.step;
        step=step>distance?distance:step;
        step=step<0?0:step;
        var totalLength=this.sliderSize-this.barSize;
        var n=(this.max-this.min)/step;
        var pxPerStep=totalLength/n;
        var m=Math.round(left/pxPerStep);
        this.value=SuperMap.Number.limitSigDigs(m*step+this.min,10);
        return m*pxPerStep;
    },

    getElementPosiontion:function(element){
    	var x=0,y=0;
    	while(element!==null){
    		x+=element.offsetLeft;
    		y+=element.offsetTop;
    		element=element.offsetParent;
    	}
    	return {"left":x,"top":y};
    },

    CLASS_NAME:"SuperMap.Tool.Slider"
});