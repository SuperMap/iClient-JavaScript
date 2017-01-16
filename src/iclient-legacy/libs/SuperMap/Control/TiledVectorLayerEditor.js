/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Control.js
 */

/**
 * Class: SuperMap.Control.TiledVectorLayerEditor
 *
 * 可视化的矢量地图编辑器
 *
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.TiledVectorLayerEditor=SuperMap.Class(SuperMap.Control,{

    /**
     * APIProperty: position
     * {<SuperMap.Pixel>} 控件所在的位置
     * */
    position:null,

    /**
     * APIProperty: autoHide
     * {Boolean} 控制在创建时是否自动隐藏
     * */

    autoHide:false,

    /**
     * APIProperty: layer
     * {<SuperMap.Layer.TiledVectorLayer>} 编辑器所对应的图层，只能在初始化时设置
     * */
    layer:null,

    /**
     * Property: cartoCss
     * {String} 控件保存后所生成的cartoCss样式表
     * */
    cartoCss:null,

    /**
     * Property: layerSymbolsInfo
     * {Object} 所有的图层的风格信息，为一个名值对，其中名(key)为图层名，值(value)currentLayerSymbolsInfo
     * */
    layerSymbolsInfo:null,

    /**
     * Property: currentLayerSymbolsInfo
     * {Object} 当前正在被编辑的图层样式信息，格式为{"layerName":"vectorLayer","layerType":"LINE","layerSymbols":[{"lineWidth":2,"lineColor":"#aaa"},{"lineWidth":1,"lineColor":"#222",,"lineDashArray":"10,5"}]}
     * */
    currentLayerSymbolsInfo:null,

    /**
     * APIProperty: editorName
     * {String} 编辑器的名字，此名字会做为编辑器的标题
     * */
    editorName:null,

    mainPanel:null,

   // showHideBtn:null,

    closeBtn:null,

    /**
     * Property: mainPanelBody
     * {DOMElement} 控件的主面板的主体
     * */
    mainPanelBody:null,

    /**
     * Property: subPanel
     * {Object} 子面板，包括layerInfo,pointEdit,lineEdit,polygonEdit,textEdit
     * */
    subPanel:null,

    /**
     * Property: sliders
     * {Array(<SuperMap.Tool.Slider>)} 所有自定义的兼容ie的滑动条
     * */
    sliders:null,

    /**
     * Property: colorPicker
     * {<SuperMap.Tool.ColorPicker>} 自定义的兼容ie的颜色选择器
     * */
    colorPicker:null,

    _drag:null,

    _drop:null,

    _offsetX:0,

    _offsetY:0,

  //  _direction:null,

    /**
     * Constant: EVENT_TYPES
     * {Array(String)} 支持的事件类型。
     *
     * 注册特定事件的监听器，示例如下：
     * (code)
     * control.events.register(type, obj, listener);
     * (end)
     *
     * event对象具备以下属性：
     * object - {Object} 发出浏览器事件的对象。
     * element - {DOMElement} 浏览器接收事件的DOM元素。
     *
     * 支持的地图事件类型：
     * activate - 控件激活时触发此事件。
     * deactivate - 控件失效时触发此事件。
     * cartocsschange - cartocss样式表变化时触发此事件。
     */

    /**
     * Constructor: SuperMap.Control.TiledVectorLayerEditor
     * 矢量分块图层的可视化的风格编辑器,创建此控件后，即可对其所对应的矢量分块图层的样式信息进行编辑，
     *
     * Parameters:
     * option - {Object} 传给此控件的一些初始化信息
     *
     * Examples:
     * (start code)
     *      var layer = new SuperMap.Layer.TiledVectorLayer("China", url,{cacheEnabled:true},{useLocalStorage:true});
     *      editor=new SuperMap.Control.TiledVectorLayerEditor({"layer":layer});
     *      editor.activate();
     *      layer.events.on({"layerInitialized": function(){
     *          map.addLayers([layer]);
     *          map.addControls([editorControl]);
     *          var center = new SuperMap.LonLat(0,0);
     *          map.setCenter(center, 0);
     *      }});
     * (end)
     *
     * */
    initialize:function(option){
        if(option&&option.layer&&!(option.layer instanceof SuperMap.Layer.TiledVectorLayer)){
            option.layer=null;
        }
        SuperMap.Control.prototype.initialize.apply(this, arguments);
        this.layerSymbolsInfo=this.layerSymbolsInfo||{};
        this.subPanel={"layerInfo":null,"pointEdit":null,"lineEdit":null,"polygonEdit":null,"textEdit":null};
        this.sliders=[];
        if(!this.position){
            this.position=new SuperMap.Pixel(0,0);
        }
       // this._direction="rt";
        //接口事件
        this.events.addEventType("cartocsschange");
        this.events.on({"cartocsschange":SuperMap.Function.bind(this.save,this)});
        this._drag=SuperMap.Function.bind(this.handleHeaderDrag,this);
        this._drop=SuperMap.Function.bind(this.handleHeaderDrop,this);
    },

    /**
     * APIMethod: destroy
     * 用于销毁此编辑器
     *
     */
    destroy:function(){
        SuperMap.Control.prototype.destroy.call(this);
        this.position=null;
        if(this.layer&&this.layer instanceof SuperMap.Layer.TiledVectorLayer){
            this.layer.layerEditor=null;
        }
        this.layer=null;
        this.cartoCss=null;
        this.layerSymbolsInfo=null;
        this.currentLayerSymbolsInfo=null;
        this.editorName=null;
        this.mainPanelBody=null;
        this.mainPanel=null;
        this.closeBtn=null;
        this.subPanel=null;
        for(var i= 0,len=this.sliders.length;i<len;i++){
            this.sliders[i]&&this.sliders[i].destroy();
        }
        this.colorPicker&&this.colorPicker.destroy();
        this._drag=null;
        this._drop=null;
        this._offsetX=null;
        this._offsetY=null;
    },

    /**
     * APIMethod: isAttachTo
     * 判断此编辑器控件是否被绑定到某一图层上
     * */
    isAttachTo:function(layer){
        if(this.layer&&this.layer instanceof SuperMap.Layer.TiledVectorLayer){
            return (this.layer===layer);
        }
        return false;
    },

    saveState:function(){
        var json={};
        json.position={"x":this.position.x,"y":this.position.y};
        json.autoHide=this.autoHide;
        json.layerSymbolsInfo=this.layerSymbolsInfo;
        return json;
    },

    /**
     * APIMethod: save
     * 将通过面板设置的属性保存成CartoCSS形式，将应用到编辑器所对应的图层上
     * */
    save:function(){
        if(this.layer&&this.layer instanceof SuperMap.Layer.TiledVectorLayer){
            this.layer.setCartoCSS(this.cartoCss);
        }
    },

    /**
     * APIMethod: refresh
     * 重绘编辑控件
     * */
    /* refresh:function(){
        if(this.position){
            if(this.currentEditLayer){
                this.currentEditLayer=null;
            }
            this.div.style.left=this.position.x+"px";
            this.div.style.top=this.position.y+"px";
        }
        if(this.editorName){
            this.mainPanel.childNodes[0].childNodes[0].innerHTML=this.editorName+(this.layer?":"+this.layer.name:"");
        }
        var showHideBtns=this.showHideBtn.getElementsByClassName("smShowHideBtn");
        if(this.autoHide){
            SuperMap.Control.TiledVectorLayerEditor.addClass(this.mainPanel,"hide");
            for(var i= 0,len=showHideBtns.length;i<len;i++){
                SuperMap.Control.TiledVectorLayerEditor.removeClass(showHideBtns[i],"show");
            }
        }
        else{
           for(var i= 0,len=showHideBtns.length;i<len;i++){
                var showHideBtn=showHideBtns[i];
                var btnType=showHideBtn.getAttribute("data-buttonType");
                if(btnType==="rt"){
                    SuperMap.Control.TiledVectorLayerEditor.addClass(showHideBtn,"show");
                }else{
                    SuperMap.Control.TiledVectorLayerEditor.removeClass(showHideBtn,"show");
                }
            }
            SuperMap.Control.TiledVectorLayerEditor.addClass(this.mainPanel,"show");
            this.setMainPanelPostionByDirection(this._direction);
        }
    },*/

    /**
     * APIMethod: setVisibility
     * 设置控件的可见性
     * */
    setVisibility:function(visible){
        return visible?this.open():this.close();
    },

    /**
     * APIMethod: open
     * 打开此编辑器
     * */
    open:function(){
        if(this.div){
            this.div.style.display="block";
          /*  var me=this;
            setTimeout(function(){
                me.setMainPanelPostionByDirection(me._direction);
            },0);*/
        }
       // this.show();
        return true;
    },

    /**
     * APIMethod: close
     * 关闭此编辑器
     * */
    close:function(){
        if(this.div){
            this.div.style.display="none";
            /* var me=this;
            setTimeout(function(){
                me.setMainPanelPostionByDirection(me._direction);
            },0);*/
        }
        return true;
    },

   /* show:function(){
        SuperMap.Control.TiledVectorLayerEditor.removeClass(this.mainPanel,"hide");
        SuperMap.Control.TiledVectorLayerEditor.addClass(this.showHideBtn,"hidebtn");
        SuperMap.Control.TiledVectorLayerEditor.removeClass(this.showHideBtn,"move");
        //this.closeBtn.style.display="";
        this.showHideBtn.setAttribute("title",SuperMap.i18n("hideEditor"));
        var centerX=this.layer.map.getSize().w/2,centerY=this.layer.map.getSize().h/2;
        var offsetX=this.position.x-centerX,offsetY=centerY-this.position.y;
        var direction="rb";
        if(offsetX>0&&offsetY>0){
            direction="lb";
        }else if(offsetX<=0&&offsetY>=0){
            direction="rb";
        }else if(offsetX<0&&offsetY<0){
            direction="rt";
        }else{
            direction="lt";
        }
        this.setMainPanelPostionByDirection(direction);
    },*/

   /* hide:function(){
        SuperMap.Control.TiledVectorLayerEditor.addClass(this.mainPanel,"hide");
        SuperMap.Control.TiledVectorLayerEditor.removeClass(this.showHideBtn,"hidebtn");
        this.div.style.left=this.position.x+"px";
        this.div.style.top=this.position.y+"px";
        this.showHideBtn.setAttribute("title",SuperMap.i18n("showEditor"));
        SuperMap.Control.TiledVectorLayerEditor.addClass(this.showHideBtn,"move");
        this.closeBtn.style.display="none";
    },*/

    /**
     * APIMethod: toggle
     * 切换控件的可视性
     * */
    toggle:function() {
        var visible = !!this.div && (this.div.style.display === "none");
        this.setVisibility(visible);
    },

    /**
     * APIMethod: resetPosition
     * 将控件的位置设置到默认的位置
     * */
    resetPosition:function(){
        var me=this;
        setTimeout(function(){
            return function(){
                //延后调用位置设置方法，以在MainPanel出现后才重新设置位置，否则设置无效
                //初始化控制的位置，默认位置为地图的左下角偏右70px
                if(me.layer&&me.layer.map){
                    var top=me.layer.map.getSize().h-32;
                    me.position=new SuperMap.Pixel(70+32,top);
                }
                //me.setMainPanelPostionByDirection(me._direction);
            };
        }(),0);
    },

    /**
     * Method: draw
     * 绘制编辑控件的外观
     * */
    draw:function(px){
        SuperMap.Control.prototype.draw.apply(this, arguments);
        if(this.layer){
            if(this.layer.layerEditor){
                this.autoHide?this.layer.layerEditor.hide():this.layer.layerEditor.show();
                return;
            }
            this.layer.layerEditor=this;
            if(this.layer.layersInfo) {
                this.initEditorViewer();
            }else{
                this.layer.events.on({"layerInitialized":SuperMap.Function.bind(this.initEditorViewer,this)});
            }
        }
        return this.div;
    },

    /**
     * Method: initEditorViewer
     * 初始化编辑器的外观
     *
     * */
    initEditorViewer:function(){
        this.colorPicker=new SuperMap.Tool.ColorPicker();
        var me=this;
        this.colorPicker.onChange=function(value){
            me.getCurrentLayerSymbolsInfoFromPanel();
        };

        var mainPanel=this.mainPanel=this.createMainPanel();
        this.createLayerInfoPanel();
        this.createPointEditPanel();
        this.createLineEditPanel();
        this.createPolygonEditPanel();
        this.createTextEditPanel();

        this.div.appendChild(mainPanel);
        this.fillEditPanel(this.currentLayerSymbolsInfo);

        this.layerSymbolsInfo2CartoCss();
    },

    /**************************************************************/
    /*                                                            */
    /*             创建编辑器控件的子控件的放置面板               */
    /*                                                            */
    /**************************************************************/

    /**
     * Method: createEditorShowHideBtn
     * 创建编辑器的位置控制按钮
     *
     * */
   /* createEditorShowHideBtn:function(){
        var editorShowHideBtnId=SuperMap.Util.createUniqueID("editorShowHideBtn_");
        var editorShowHideBtn=SuperMap.Util.createDiv(editorShowHideBtnId);
        editorShowHideBtn.setAttribute("class","smShowHideBtn-container hidebtn");
        editorShowHideBtn.setAttribute("title",SuperMap.i18n("hideEditor"));


        SuperMap.Event.observe(editorShowHideBtn,"click",SuperMap.Function.bind(this.handleShowHideBtnClick,this));

        SuperMap.Event.observe(editorShowHideBtn,"mousedown",SuperMap.Function.bind(this.handleShowHideBtnMouseDown,this));

        return editorShowHideBtn;
    },*/

    /**
     * Method: handleShowHideBtnClick
     * 处理位置控制按钮的点击事件
     * */
   /*handleShowHideBtnClick:function(event){
        if(this.active){
            event=event||window.event;
            if(!this._dragging){
                var element=SuperMap.Event.element(event);
                if(SuperMap.Control.TiledVectorLayerEditor.hasClass(element,"hidebtn")){
                    this.hide();
                }else{
                    this.show();
                }
            }
        }
    },*/

    /**
     * Method: handleShowHideBtnMouseDown
     * 处理位置控制按钮的鼠标按下事件
     * */
    handleHeaderMouseDown:function(event){
        if(this.active){
            event=event||window.event;
            event.preventDefault();
            event.stopPropagation();
            var element=SuperMap.Event.element(event);
            if(!(element===this.showHideBtn&&SuperMap.Control.TiledVectorLayerEditor.hasClass(element,"hidebtn"))){
                if(SuperMap.Control.TiledVectorLayerEditor.hasClass(element,"smMainPanel-title")){
                    element=element.parentNode;
                }
                var x=event.clientX,y=event.clientY,left= 0,top=0;
                while(element!==null){
                    left+=element.offsetLeft;
                    top+=element.offsetTop;
                    element=element.offsetParent;
                    if(this.layer&&this.layer.map&&this.layer.map.viewPortDiv===element){
                        break;
                    }
                }
                this._offsetX=x-left;
                this._offsetY=y-top;
                var me=this;
                if(this._timeout){
                    clearTimeout(this._timeout);
                }
                this._timeout=setTimeout(function(){
                    SuperMap.Event.observe(document,"mousemove",me._drag);
                    SuperMap.Event.observe(document,"mouseup",me._drop);
                },10)
            }
        }
    },

    /**
     * Method: handleShowHideBtnDrag
     * 处理位置控制按钮的拖动事件
     * */
    handleHeaderDrag: function (event) {
        if(this.active){
            event=event||window.event;
            event.preventDefault();
            event.stopPropagation();
            var element=SuperMap.Event.element(event);
            var x=event.clientX,y=event.clientY,offsetX= this._offsetX,offsetY=this._offsetY;
            x-=offsetX;
            y-=offsetY;
            this.div.style.left=x+"px";
            this.div.style.top=y+"px";
            this.position.x=x;
            this.position.y=y;
            this._dragging=true;
        }
    },

    /**
     * Method: handleShowHideBtnDrop
     * 处理头部的拖动后放开的事件
     *
     * */
    handleHeaderDrop: function (event) {
        if(this.active){
            event=event||window.event;
            event.preventDefault();
            event.stopPropagation();
            SuperMap.Event.stopObserving(document,"mousemove",this._drag);
            SuperMap.Event.stopObserving(document,"mouseup",this._drop);
            var me=this;
            setTimeout(function(){
                me._dragging=false;
            },0)
        }
    },

    /**
     * Method: createEditorCloseBtn
     * 创建编辑器的关闭按钮
     *
     * */
    createEditorCloseBtn:function(){
        var editorCloseBtnId=SuperMap.Util.createUniqueID("editorCloseBtn_");
        //var editorCloseBtn=SuperMap.Util.createDiv(editorCloseBtnId);
        var editorCloseBtn = document.createElement("span");
        editorCloseBtn.setAttribute("class","smCloseBtn-container supermapol-icons-clear");
        editorCloseBtn.setAttribute("title",SuperMap.i18n("closeEditor"));


        SuperMap.Event.observe(editorCloseBtn,"click",SuperMap.Function.bind(this.handleCloseBtnClick,this));

        return editorCloseBtn;
    },

    handleCloseBtnClick:function(){
        this.close();
    },

    /**
     * Method: setMainPanelPostionByDirection
     * 根据方向参数设置编辑器面板的位置
     *
     * */
   /* setMainPanelPostionByDirection:function(direction,positive){
        if(!this.mainPanel||!this.mainPanelBody){
            return;
        }
        this._direction=direction;
        var height=32,width=0,left= 0,top=0;
        if(SuperMap.Control.TiledVectorLayerEditor.hasClass(this.showHideBtn,"hidebtn")){
            var panelHead=this.mainPanel.childNodes[0],panelBody=this.mainPanelBody;
            height=panelHead.clientHeight+panelBody.clientHeight, width=this.mainPanel.clientWidth;
        }
        switch(direction){
            case "lt":
                if(positive){
                    left=this.position.x+width-32;
                    top=this.position.y+height-32;
                }else{
                    left=this.position.x-width+32;
                    top=this.position.y-height+32;
                }
                break;
            case "rt":
                left=this.position.x;
                if(positive){
                    top=this.position.y+height-32;
                }else{
                    top=this.position.y-height+32;
                }
                break;
            case "rb":
                left=this.position.x;
                top=this.position.y;
                break;
            case "lb":
                if(positive){
                    left=this.position.x+width-32;
                }else{
                    left=this.position.x-width+32;
                }
                top=this.position.y;
                break;
        }
        if(positive){
            this.position.x=left;
            this.position.y=top;
        }else{
            this.div.style.left=left+"px";
            this.div.style.top=top+"px";
            this.div.style.right="";
            this.div.style.bottom="";
        }
    },*/

    /**
     * Method: createMainPanel
     * 创建编辑器的主体面板
     *
     * */
    createMainPanel:function(){
        var mainPanelId=SuperMap.Util.createUniqueID("editorMainPanel_");
        var mainPanel=SuperMap.Util.createDiv(mainPanelId);
        if(this.autoHide){
            mainPanel.setAttribute("class","smMainPanel hide");
        }else{
            mainPanel.setAttribute("class","smMainPanel");
        }
        var mainPanelHeaderId=SuperMap.Util.createUniqueID("editorMainPanelHeader_");
        var mainPanelHeader=SuperMap.Util.createDiv(mainPanelHeaderId,null,null,null,"relative");
        mainPanelHeader.setAttribute("class","smMainPanel-head smPanel-header");
        var closeBtn = this.createEditorCloseBtn();
        var mainPanelTitle=document.createElement("h4");
        mainPanelTitle.setAttribute("class","smMainPanel-title");
        this.editorName=this.editorName||SuperMap.i18n("editorName");
        var titleTextNode=document.createTextNode(this.editorName+(this.layer?":"+this.layer.name:""));
        var mainPanelBodyId=SuperMap.Util.createUniqueID("editorMainPanelBoby_");
        var mainPanelBody=this.mainPanelBody=SuperMap.Util.createDiv(mainPanelBodyId,null,null,null,"relative");
        mainPanelBody.setAttribute("class","smMainPanel-body");

        mainPanelTitle.appendChild(titleTextNode);
        mainPanelHeader.appendChild(mainPanelTitle);
        mainPanelHeader.appendChild(closeBtn);
        mainPanel.appendChild(mainPanelHeader);
        mainPanel.appendChild(mainPanelBody);


        SuperMap.Event.observe(mainPanelHeader,"mousedown",SuperMap.Function.bind(this.handleHeaderMouseDown,this));

        return mainPanel;
    },

    /**
     * Method: createSubPanel
     * 创建子面板，比如图层列表子面板和属性编辑子面板等等
     *
     * */
    createSubPanel:function(type,title,show){
        var Type=type.replace(/[^/w]/,type[0].toUpperCase());
        var show=this.currentLayerSymbolsInfo&&(Type.toLowerCase()===(this.currentLayerSymbolsInfo.layerType+"edit"));
        var panelId=SuperMap.Util.createUniqueID(type+"Panel_");
        var panel=this.subPanel[type]=SuperMap.Util.createDiv(panelId,null,null,null,"relative");
        var panelClassName="sm"+Type+"Panel smSubPanel";
        var panelHeaderClassName="";
        if(type.indexOf("Edit")>-1){
            panelClassName+=" smEditPanel";
            panelHeaderClassName+=" smEditPanel-header";
        }
        if(show){
            panelClassName+=" show";
        }
        panel.setAttribute("class",panelClassName);
        var panelHeaderId=SuperMap.Util.createUniqueID(type+"PanelHeader_");
        var panelHeader=SuperMap.Util.createDiv(panelHeaderId,null,null,null,"static");
        panelHeader.setAttribute("class","sm"+Type+"Panel-header smSubPanel-header"+panelHeaderClassName);
        var panelTitleId=SuperMap.Util.createUniqueID(type+"PanelTitle_");
        var panelTitle=SuperMap.Util.createDiv(panelTitleId,null,null,null,"relative");
        panelTitle.setAttribute("class","sm"+Type+"Panel-title smPanel-title smSubPanel-title");
        if(show&&this.currentLayerSymbolsInfo){
            title+=" \\ "+this.currentLayerSymbolsInfo.layerName;
        }
        var panelTitleText=document.createTextNode(title);
        var panelBodyId=SuperMap.Util.createUniqueID(type+"PanelBody_");
        var panelBody=SuperMap.Util.createDiv(panelBodyId,null,null,null,"relative");
        panelBody.setAttribute("class","sm"+Type+"Panel-body smSubPanel-body");

        panelTitle.appendChild(panelTitleText);
        panelHeader.appendChild(panelTitle);
        panel.appendChild(panelHeader);
        panel.appendChild(panelBody);
        this.mainPanelBody.appendChild(panel);
        return panelBody;
    },

    /**
     * Method: createlayerInfoPanel
     * 创建图层列表子面板，将创建列表控件，并添加到子面板里面去
     *
     * */
    createLayerInfoPanel:function(){
        var layersinfo=this.layer.layersInfo;
        var layerInfoPanelBody=this.createSubPanel("layerInfo",SuperMap.i18n("layerList"));
        this.createListControl(layerInfoPanelBody,layersinfo);
    },

    /**
     * Method: createSubEditPanelContent
     * 根据SuperMap.Control.TiledVectorLayerEditor.CARTOCSSATTRLIST这个CartoCSS属性列表来创建属性编辑控件，并添加到编辑子面板上
     *
     * */
    createSubEditPanelContent:function(type){
        var form=document.createElement("form");
        var editPanelInfo=SuperMap.Control.TiledVectorLayerEditor.CARTOCSSATTRLIST[type];
        var regularTable=document.createElement("table");
        regularTable.setAttribute("class","smRegularTable");
        var splitLineTop=document.createElement("div");
        splitLineTop.setAttribute("class","smSplitLine smSplitLineTop hide");
        var splitLineBottom=document.createElement("div");
        splitLineBottom.setAttribute("class","smSplitLine smSplitLineBottom");
        var splitBtn=document.createElement("a");
        splitBtn.innerHTML=SuperMap.i18n("advanceSetting");
        splitBtn.setAttribute("href","#");
        var advanceTable=document.createElement("table");
        advanceTable.setAttribute("class","smAdvanceTable");
        for(var i= 0,len=editPanelInfo.length;i<len;i++){
            var attributes=editPanelInfo[i];
            var controlType=attributes.controlType;
            var prop=attributes.propName;
            var langKey=SuperMap.String.camelize(prop);
            var label=SuperMap.i18n(langKey+"Label");
            var desc=SuperMap.i18n(langKey+"Title");
            var options={"propName":prop,
                "description":desc,
                "unit":attributes.unit,
                "min":attributes.minValue,
                "max":attributes.maxValue,
                "default":attributes.defaultValue};
            var regular=attributes.regular;
            var tr=null;
            if(controlType==="url"||controlType==="number"||controlType==="range"||controlType==="array"||controlType==="text"||controlType==="color"){
                controlType=controlType==="array"?"text":controlType;
                tr=this.createInputControl(label,controlType,options);
            }else if(controlType==="select"){
                tr=this.createSelectControl(label,options);
            }
            if(tr){
                if(regular){
                    regularTable.appendChild(tr);
                }else{
                    tr.style.height="0";
                    advanceTable.appendChild(tr);
                }
            }
        }
        splitLineBottom.appendChild(splitBtn);
        form.appendChild(regularTable);
        form.appendChild(splitLineTop);
        form.appendChild(advanceTable);
        form.appendChild(splitLineBottom);
        SuperMap.Event.observe(splitBtn,"click",SuperMap.Function.bind(this.handleAdvanceBtnClick,[splitLineTop,advanceTable,form,this]));
        return form;
    },


    /**
     * Method: handleAdvanceBtnClick
     * 处理高级设置按钮的点击事件，展开高级设置属性
     * */
    handleAdvanceBtnClick: function (event) {
        if(this[3]&&this[3].active){
            event=event||window.event;
            var element=SuperMap.Event.element(event);
            var parent=this[2].parentNode.parentNode;
            var me=this[3],table=this[1],slider=this[0];
            me._advanceInterval&&clearInterval(me._advanceInterval);
            var count=table.childNodes.length,index;
            var advanceSettingLabel=SuperMap.i18n("hideAdvanceSetting");
            if(element.innerHTML!==advanceSettingLabel){
                index=-1;
                table.style.display="table";
                SuperMap.Control.TiledVectorLayerEditor.removeClass(slider,"hide");
                me._advanceInterval=setInterval(function(){
                    if(index>=count){
                        me._advanceInterval&&clearInterval(me._advanceInterval);
                        element.innerHTML=advanceSettingLabel;
                        var scrollTop=parent.scrollTop;
                        var clientHight=parent.clientHeight;
                        me._advanceBtnInterval&&clearInterval(me._advanceBtnInterval);
                        me._advanceBtnInterval=setInterval(function(){
                            if(scrollTop>=clientHight){
                                me._advanceBtnInterval&&clearInterval(me._advanceBtnInterval);
                                return;
                            }
                            scrollTop+=5;
                            parent.scrollTop=scrollTop;
                        },10);
                        return;
                    }
                    if(index<0){
                        index++;
                        return
                    }
                    var tr=table.childNodes[index++];
                    tr.style.height="42px";
                },50);
            }else{
                index=count;
                if(SuperMap.Browser.name==="msie"&&SuperMap.Browser.version==="9.0"){
                    table.style.display="none";
                    element.innerHTML=SuperMap.i18n("advanceSetting");
                    SuperMap.Control.TiledVectorLayerEditor.addClass(slider,"hide");
                }
                me._advanceInterval=setInterval(function(){
                    if(index<0){
                        me._advanceInterval&&clearInterval(me._advanceInterval);
                        element.innerHTML=SuperMap.i18n("advanceSetting");
                        SuperMap.Control.TiledVectorLayerEditor.addClass(slider,"hide");
                        var scrollTop=parent.scrollTop;
                        me._advanceBtnInterval&&clearInterval(me._advanceBtnInterval);
                        me._advanceBtnInterval=setInterval(function(){
                            if(scrollTop<=0){
                                me._advanceBtnInterval&&clearInterval(me._advanceBtnInterval);
                                setTimeout(function(){
                                    table.style.display="none";
                                },100);
                                return;
                            }
                            scrollTop-=5;
                            parent.scrollTop=scrollTop;
                        },10);
                        return;
                    }
                    if(index>=count){
                        index--;
                        return;
                    }
                    var tr=table.childNodes[index--];
                    tr.style.height="0";
                },50);
            }
        }
    },

    /**
     * Method: createPointEditPanel
     * 创建点图层属性编辑子面板
     *
     * */
    createPointEditPanel:function(){
        var pointEditPanelBody=this.createSubPanel("pointEdit",SuperMap.i18n("point"));
        pointEditPanelBody.setAttribute("data-paneltype","pointEdit");
        pointEditPanelBody.appendChild(this.createSubEditPanelContent("point"));

        SuperMap.Event.observe(pointEditPanelBody,"mousewheel",SuperMap.Function.bind(this.handleEditPanelMouseWheel,this));
        SuperMap.Event.observe(pointEditPanelBody,"DOMMouseScroll",SuperMap.Function.bind(this.handleEditPanelMouseWheel,this));
    },

    /**
     * Method: createLineEditPanel
     * 创建线图层属性编辑子面板
     *
     * */
    createLineEditPanel:function(){
        var lineEditPanelBody=this.createSubPanel("lineEdit",SuperMap.i18n("line"));
        lineEditPanelBody.setAttribute("data-paneltype","lineEdit");
        lineEditPanelBody.appendChild(this.createSubEditPanelContent("line"));

        SuperMap.Event.observe(lineEditPanelBody,"mousewheel",SuperMap.Function.bind(this.handleEditPanelMouseWheel,this));
        SuperMap.Event.observe(lineEditPanelBody,"DOMMouseScroll",SuperMap.Function.bind(this.handleEditPanelMouseWheel,this));
    },

    /**
     * Method: createPolygonEditPanel
     * 创建面图层属性编辑子面板
     *
     * */
    createPolygonEditPanel:function(){
        var polygonEditPanelBody=this.createSubPanel("polygonEdit",SuperMap.i18n("region"));
        polygonEditPanelBody.setAttribute("data-paneltype","polygonEdit");
        polygonEditPanelBody.appendChild(this.createSubEditPanelContent("region"));

        SuperMap.Event.observe(polygonEditPanelBody,"mousewheel",SuperMap.Function.bind(this.handleEditPanelMouseWheel,this));
        SuperMap.Event.observe(polygonEditPanelBody,"DOMMouseScroll",SuperMap.Function.bind(this.handleEditPanelMouseWheel,this));
    },

    /**
     * Method: createTextEditPanel
     * 创建文本图层属性编辑子面板
     *
     * */
    createTextEditPanel:function(){
        var textEditPanelBody=this.createSubPanel("textEdit",SuperMap.i18n("text"));
        textEditPanelBody.setAttribute("data-paneltype","textEdit");
        textEditPanelBody.appendChild(this.createSubEditPanelContent("text"));

        SuperMap.Event.observe(textEditPanelBody,"mousewheel",SuperMap.Function.bind(this.handleEditPanelMouseWheel,this));
        SuperMap.Event.observe(textEditPanelBody,"DOMMouseScroll",SuperMap.Function.bind(this.handleEditPanelMouseWheel,this));
    },

    /**
     * Method: handleEditPanelMouseWheel
     * 处理编辑面板的滚轮事件，滚轮进行时关闭颜色拾取器
     * */
    handleEditPanelMouseWheel:function(event){
        if(this.active){
            if(this.colorPicker){
                this.colorPicker.hidePicker();
            }
        }
    },

    /************************************************************/
    /*                                                          */
    /*                  为控制面板创建子控件组                  */
    /*                                                          */
    /************************************************************/

    /**
     * Method: createListControl
     * 创建图层列表控件
     *
     * */
    createListControl:function(parent,layersinfo){
        var layerUL=document.createElement("ul"),list={"POINT":null,"LINE":null,"REGION":null,"TEXT":null},findFirst=false;
        for(var attr in layersinfo){
            if(!layersinfo.hasOwnProperty(attr)){
                continue;
            }
            var info=layersinfo[attr];
            /*if(info.ugcLayerType==="THEME"){
                continue;
            }*/
            var type=info.datasetInfo.type;
            var name=SuperMap.i18n(type.toLowerCase());
            if(!name){
                continue;
            }
            if(!list.hasOwnProperty(type)){
                continue;
            }
            if(!list[type]){
                //var option=type==="POINT"?" open":"";
                var li=document.createElement("li");
                li.setAttribute("class","smLayerInfoLI smPanelLI"/*+option*/);
                li.setAttribute("data-layertype",type.toLowerCase());
                var layerNameTextNode=document.createTextNode(name);
                var span=document.createElement("span");
                span.setAttribute("title",name);
                span.appendChild(layerNameTextNode);
                span.setAttribute("class","smPanelPointer");
                SuperMap.Event.observe(span,"click",SuperMap.Function.bind(this.handleLiClick,this));
                li.appendChild(span);
                var subUl=document.createElement("ul");
                li.appendChild(subUl);
                list[type]={"li":li,"subul":subUl};
            }
            var subLi=document.createElement("li");
            subLi.setAttribute("class","smPanelLI smPanelPointer");
            subLi.setAttribute("title",attr);
            subLi.setAttribute("data-layername",attr);
            SuperMap.Event.observe(subLi,"click",SuperMap.Function.bind(this.handleSubLiClick,this));
            var layerTypeTextNode=document.createTextNode(attr);
            subLi.appendChild(layerTypeTextNode);
            list[type].subul.appendChild(subLi);

            if(!findFirst){
                findFirst=true;
                SuperMap.Control.TiledVectorLayerEditor.addClass(subLi,"select");
                var currentLayerSymbolsInfo=this.layerSymbolsInfo[attr];
                if(!currentLayerSymbolsInfo){
                    currentLayerSymbolsInfo=this.layerSymbolsInfo[attr]={};
                }
                currentLayerSymbolsInfo.layerName=currentLayerSymbolsInfo.layerName||attr;
                currentLayerSymbolsInfo.layerType=currentLayerSymbolsInfo.layerType||type.toLowerCase();
                currentLayerSymbolsInfo.layerSymbols=currentLayerSymbolsInfo.layerSymbols||[];
                this.currentLayerSymbolsInfo=currentLayerSymbolsInfo;
                SuperMap.Control.TiledVectorLayerEditor.addClass(list[type].li,"open");
            }
        }
        for(var listType in list){
            if(list[listType]&&list[listType].li){
                layerUL.appendChild(list[listType].li);
                var subul=list[listType].subul;
                if(subul&&SuperMap.Control.TiledVectorLayerEditor.hasClass(list[listType].li,"open")){
                    var count=subul.childNodes.length;
                    subul.style.height=count*31+"px";
                }else{
                    subul.style.height="0px";
                }
            }
        }
        parent.appendChild(layerUL);
    },

    /**
     * Method: handleLiClick
     * 处理图层类型的列表的点击事件
     *
     * */
    handleLiClick:function(event){
        if(this.active){
            event=event||window.event;
            var element=SuperMap.Event.element(event);
            var parent=element.parentNode;
            var ul=parent.childNodes[1];
            var count=ul.childNodes.length;
            var grandParent=parent.parentNode;
            for(var i= 0,len=grandParent.childNodes.length;i<len;i++){
                var node=grandParent.childNodes[i];
                if(node==parent){
                    SuperMap.Control.TiledVectorLayerEditor.toggleClass(node,"open");
                    if(SuperMap.Control.TiledVectorLayerEditor.hasClass(node,"open")){
                        ul.style.height=31*count+"px";
                    }else{
                        ul.style.height="0px";
                    }
                }else{
                    SuperMap.Control.TiledVectorLayerEditor.removeClass(node,"open");
                    node.childNodes[1].style.height="0px";
                }
            }
            var me=this;
            me._layerListInterval&&clearInterval(me._layerListInterval);
            me._layerListTimeout&&clearTimeout(me._layerListTimeout);
            me._layerListTimeout=setTimeout(function(){
                var offsetTop=parent.offsetTop;
                var scrollTop=grandParent.parentNode.parentNode.scrollTop;
                var bigger=offsetTop>scrollTop;
                me._layerListInterval=setInterval(function(){
                    grandParent.parentNode.parentNode.scrollTop=scrollTop;
                    bigger?scrollTop+=2:scrollTop-=2;
                    if(scrollTop<(offsetTop+2)&&scrollTop>(offsetTop-2)){
                        me._layerListInterval&&clearInterval(me._layerListInterval);
                    }
                },6);
            },300);
        }
    },

    /**
     * Method: handleSubLiClick
     * 处理图层列表中每一项的点击事件
     * */
    handleSubLiClick:function(event){
        if(this.active){
            event=event||window.event;
            var element=SuperMap.Event.element(event);
            var parent=element.parentNode;
            var grandParent=parent.parentNode;
            var layerName=element.getAttribute("data-layername");
            var layerType=grandParent.getAttribute("data-layertype");
            if(layerName){
                var currentLayerSymbolsInfo=this.layerSymbolsInfo[layerName];
                if(!currentLayerSymbolsInfo){
                    currentLayerSymbolsInfo=this.layerSymbolsInfo[layerName]={};
                }
                currentLayerSymbolsInfo.layerName=currentLayerSymbolsInfo.layerName||layerName;
                currentLayerSymbolsInfo.layerType=currentLayerSymbolsInfo.layerType||layerType;
                currentLayerSymbolsInfo.layerSymbols=currentLayerSymbolsInfo.layerSymbols||[];
                this.currentLayerSymbolsInfo=currentLayerSymbolsInfo;
                this.fillEditPanel(currentLayerSymbolsInfo);
            }
            var smPanelPointers=this.subPanel.layerInfo.getElementsByClassName("smPanelPointer");
            for(var i= 0,len=smPanelPointers.length;i<len;i++){
                SuperMap.Control.TiledVectorLayerEditor.removeClass(smPanelPointers[i],"select");
            }
            SuperMap.Control.TiledVectorLayerEditor.addClass(element,"select");
        }
    },

    /**
     * Method: createInputControl
     * 创建输入框控件，此控件包含一个checkbox,一个label，一个两个input，用于控制一个图层样式的一个属性值
     * */
    createInputControl:function(text,inputType,options){
        var prop=options&&options["propName"],
            descripts=options&&options["description"],
            unit=options&&options["unit"],
            min=options&&options["min"],
            max=options&&options["max"],
            defaultValue = options&&options["default"];
        var checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","smPanelCheckbox");
        var inputId=SuperMap.Util.createUniqueID(this.id+"_PanelInput_");
        var label=document.createElement("label");
        var labelTextNode=document.createTextNode(text+":");
        label.setAttribute("for",inputId);
        var input;
        var inputClassName="smEditPanelInput";
        if(inputType==="range"){
            var step=max===1?0.05:1;
            input=new SuperMap.Tool.Slider({"min":min,"max":max,"step":step,value:defaultValue});
            this.sliders.push(input);
            SuperMap.Control.TiledVectorLayerEditor.addClass(input.slider,inputClassName);
            input.enable=false;
            if(descripts){
                input.slider.setAttribute("title",descripts);
            }
        }else{
            if(inputType==="color"){
                input=document.createElement("div");
                input.setAttribute("type","text");
                input.style.backgroundColor=defaultValue;
                SuperMap.Control.TiledVectorLayerEditor.addClass(input,"smEditPanelColorInput");
                var inputContainer=document.createElement("div");
                inputContainer.setAttribute("class","smEditPanelInputContainer");
                var colorInputBtn=document.createElement("div");
                colorInputBtn.setAttribute("class","smEditPanelInputBtn");
                inputContainer.appendChild(input);
                inputContainer.appendChild(colorInputBtn);
            }else{
                input=document.createElement("input");
                input.setAttribute("type",inputType);
                input.style.width="150px";
                input.setAttribute("value",defaultValue);
            }
            SuperMap.Control.TiledVectorLayerEditor.addClass(input,inputClassName);
            input.setAttribute("id",inputId);
            input.setAttribute("disabled",true);
            if(descripts){
                input.setAttribute("title",descripts);
            }
        }
        var valueInput=document.createElement("input");
        valueInput.setAttribute("type","text");
        valueInput.setAttribute("class","smPanelValueInput");
        valueInput.setAttribute("disabled",true);
        valueInput.value=input.value;
        var tr=document.createElement("tr");
        tr.setAttribute("data-controltype",inputType);
        if(prop){
            tr.setAttribute("data-property",prop);
        }
        tr.setAttribute("class","smEditPanelControl");

        var checkBoxTD=document.createElement("td");
        var labelTD=document.createElement("td");
        labelTD.setAttribute("class","smSecondTd");
        var inputTD=document.createElement("td");

        checkBoxTD.appendChild(checkbox);
        label.appendChild(labelTextNode);
        labelTD.appendChild(label);
        if(inputType==="range"){
            input.appendTo(inputTD);
        }else if(inputType==="color"){
            inputTD.appendChild(inputContainer);
        }else{
            inputTD.appendChild(input);
        }
        if(!(inputType==="url"||inputType==="color")){
            inputTD.appendChild(valueInput);
        }
        if(unit){
            var unitText=document.createTextNode(unit);
            inputTD.appendChild(unitText);
        }
        tr.appendChild(checkBoxTD);
        tr.appendChild(labelTD);
        tr.appendChild(inputTD);

        //TODO 处理面板的相关操作事件
        SuperMap.Event.observe(checkbox,"change",SuperMap.Function.bind(this.handleCheckboxChange,[input,valueInput,this]));
        SuperMap.Event.observe(checkbox,"change",SuperMap.Function.bind(this.getCurrentLayerSymbolsInfoFromPanel,this));
        if(inputType==="range"){
            input.onChanged=SuperMap.Function.bind(this.handleSliderChange,[valueInput,this,input]);
            SuperMap.Event.observe(valueInput,"change",SuperMap.Function.bind(this.handleSliderChange,[input,this]));
        }else if(inputType==="color"){
            SuperMap.Event.observe(colorInputBtn,"click",SuperMap.Function.bind(this.handleColorInputFocus,[input,this]));
            SuperMap.Event.observe(input,"click",SuperMap.Function.bind(this.handleColorInputFocus,[input,this]));
            SuperMap.Event.observe(valueInput,"change",SuperMap.Function.bind(this.handleInputChange,[input,this,"color"]));
        }else{
            SuperMap.Event.observe(input,"change",SuperMap.Function.bind(this.handleInputChange,[valueInput,this]));
            SuperMap.Event.observe(valueInput,"change",SuperMap.Function.bind(this.handleInputChange,[input,this]));
        }


        return tr;
    },

    /**
     * Method: handleCheckboxChange
     * 处理复选框的点击事件
     *
     * */
    handleCheckboxChange:function(event){
        if(this[2]&&this[2].active){
            event=event||window.event;
            var element=SuperMap.Event.element(event);
            if(element.checked){
                if(this[0]&&this[0] instanceof SuperMap.Tool.Slider){
                    this[0].enable=true;
                }else if(this[0]&&SuperMap.Control.TiledVectorLayerEditor.hasClass(this[0],"smEditPanelColorInput")){
                    SuperMap.Control.TiledVectorLayerEditor.addClass(this[0].nextSibling,"activebtn");
                    SuperMap.Control.TiledVectorLayerEditor.addClass(this[0],"activebtn");
                }else{
                    this[0]&&this[0].removeAttribute("disabled");
                }
                this[1]&&this[1].removeAttribute("disabled");
            }else{
                if(this[0]&&this[0] instanceof SuperMap.Tool.Slider){
                    this[0].enable=false;
                }else if(this[0]&&SuperMap.Control.TiledVectorLayerEditor.hasClass(this[0],"smEditPanelColorInput")){
                    SuperMap.Control.TiledVectorLayerEditor.removeClass(this[0].nextSibling,"activebtn");
                    SuperMap.Control.TiledVectorLayerEditor.removeClass(this[0],"activebtn");
                }else{
                    this[0]&&this[0].setAttribute("disabled",true);
                }
                this[1]&&this[1].setAttribute("disabled",true);
            }
        }
    },

    /**
     * Method: handleInputChange
     * 处理文本输入框的内容改变或者选择项改变事件
     *
     * */
    handleInputChange: function (event) {
        if(this[1]&&this[1].active){
            event=event||window.event;
            var value,element;
            element=SuperMap.Event.element(event);
            value=element.value;
            if(this[2]!=="color"){
                this[0].value=value;
            }
            this[1].getCurrentLayerSymbolsInfoFromPanel();
        }
    },

    /**
     * Method: handleSliderChange
     * 处理滑动条的改变事件
     * */
    handleSliderChange:function(event){
        if(this[1]&&this[1].active){
            var value;
            if(this[2]){
                value=this[2].getValue();
                this[0].value=value;
            }else{
                event=event||window.event;
                var element=SuperMap.Event.element(event);
                value=element.value;
                this[0].setValue(value);
                element.value=this[0].getValue();
            }
            this[1].getCurrentLayerSymbolsInfoFromPanel();
        }
    },

    /**
     * Method: handleColorInputFocus
     * 处理颜色拾取器的目标标签的焦点事件，以弹出颜色拾取器
     *
     * */
    handleColorInputFocus:function(event){
        if(this[1]&&this[1].active){
            var element=this[0];
            if(SuperMap.Control.TiledVectorLayerEditor.hasClass(element.nextSibling,"activebtn")){
                var me=this[1];
                var offsetLeft= 0,offsetTop=0;
                while(element!==null){
                    offsetLeft+=element.offsetLeft-element.scrollLeft;
                    offsetTop+=element.offsetTop-element.scrollTop;
                    element=element.offsetParent;
                }
                me.colorPicker.onChange=function(value){
                    me.handleColorInputChange(value);
                };
                me.colorPicker.reset(offsetTop+23,offsetLeft+5,this[0]);
            }
        }
    },

    /**
     * Method: handleColorInputChange
     * 处理颜色拾取器的颜色改变事件，从而刷新地图
     *
     * */
    handleColorInputChange:function(value,valueInput){
        this.getCurrentLayerSymbolsInfoFromPanel();
    },

    /**
     * Method: createSelectControl
     * 创建选择项控件，类似于输入框控件，只是前面的input改成了select
     *
     * */
    createSelectControl:function(text,options){
        var prop=options&&options["propName"],descripts=options&&options["description"],items=options&&options["default"];
        var checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","smPanelCheckbox");
        var selectId=SuperMap.Util.createUniqueID(this.id+"_PanelSelect_");
        var label=document.createElement("label");
        var labelTextNode=document.createTextNode(text+":");
        label.setAttribute("for",selectId);
        var select=document.createElement("select");
        SuperMap.Control.TiledVectorLayerEditor.addClass(select,"smEditPanelInput");
        select.setAttribute("id",selectId);
        select.setAttribute("disabled",true);
        if(descripts){
            select.setAttribute("title",descripts);
        }
        for(var i= 0,length=items.length;i<length;i++){
            var option=document.createElement("option");
            var optionTextNode=document.createTextNode(items[i]);
            option.appendChild(optionTextNode);
            select.appendChild(option);
        }
        var tr=document.createElement("tr");
        tr.setAttribute("data-controltype","select");
        if(prop){
            tr.setAttribute("data-property",prop);
        }
        tr.setAttribute("class","smEditPanelControl");

        label.appendChild(labelTextNode);



        var checkBoxTD=document.createElement("td");
        var labelTD=document.createElement("td");
        labelTD.setAttribute("class","smSecondTd");
        var selectTD=document.createElement("td");

        checkBoxTD.appendChild(checkbox);
        label.appendChild(labelTextNode);
        labelTD.appendChild(label);
        selectTD.appendChild(select);
        tr.appendChild(checkBoxTD);
        tr.appendChild(labelTD);
        tr.appendChild(selectTD);

        SuperMap.Event.observe(checkbox,"change",SuperMap.Function.bind(this.handleCheckboxChange,[select,null,this]));
        SuperMap.Event.observe(checkbox,"change",SuperMap.Function.bind(this.getCurrentLayerSymbolsInfoFromPanel,this));
        SuperMap.Event.observe(select,"change",SuperMap.Function.bind(this.getCurrentLayerSymbolsInfoFromPanel,this));

        return tr;
    },

    /************************************************************/
    /*                                                          */
    /*               利用图层信息初始化编辑面板                 */
    /*                                                          */
    /************************************************************/

    /**
     * Method: fillEditPanel
     * 根据临时保存的图层信息以及图层类型，初始化某一个编辑面板，以在点击图层列表中的某一项时，
     * 根据临时保存的这个图层的信息初始化这个面板，让用户继续上一次对这个图层的编辑
     *
     * */
    fillEditPanel:function(layerStyleInfo){
        if(!layerStyleInfo){
            return;
        }
        var panelType=layerStyleInfo.layerType==="region"?"polygonEdit":layerStyleInfo.layerType+"Edit";
        for(var type in this.subPanel){
            if(type==="layerInfo"){
                continue;
            }
            if(panelType===type){
                this.subPanel[type]&&SuperMap.Control.TiledVectorLayerEditor.addClass(this.subPanel[type],"show");
            }else{
                this.subPanel[type]&&SuperMap.Control.TiledVectorLayerEditor.removeClass(this.subPanel[type],"show");
            }
        }
        //TODO 这种获取dom的方式可能要改
        var layerSymbols=layerStyleInfo.layerSymbols,editPanel=this.subPanel[panelType];
        editPanel.childNodes[0].childNodes[0].innerHTML=SuperMap.i18n(layerStyleInfo.layerType)+
        " \\ "+layerStyleInfo.layerName;
        var editPanelBody=editPanel.childNodes[1];
        var form=editPanelBody.childNodes[0];
        var splitLine=form.childNodes[1],advanceSetting=form.childNodes[2],advanceSetttinBtn=form.childNodes[3];
        editPanelBody.scrollTop=0;
        SuperMap.Control.TiledVectorLayerEditor.addClass(splitLine,"hide");
        advanceSetting.style.display="none";
        advanceSetttinBtn.firstChild.innerHTML=SuperMap.i18n("advanceSetting");
        var editControls=editPanel.getElementsByClassName("smEditPanelControl");
        for(var i= 0,len=editControls.length;i<len;i++){
            var editControl=editControls[i];
            var attribute=editControl.getAttribute("data-property");
            var type=editControl.getAttribute("data-controltype");
            var value=layerSymbols[0]&&layerSymbols[0][attribute];
            if(value!==null&&value!==undefined) {
                //TODO 这种获取dom的方式可能要改
                if (type === "range") {
                    editControl.childNodes[2].childNodes[0].smSlider.setValue(value);
                    editControl.childNodes[2].childNodes[0].smSlider.enable = true;
                } else if (type === "color") {
                    var colorContainer = editControl.childNodes[2].childNodes[0].firstChild;
                    colorContainer.style.backgroundColor = value;
                    SuperMap.Control.TiledVectorLayerEditor.addClass(colorContainer.nextSibling, "activebtn");
                    SuperMap.Control.TiledVectorLayerEditor.addClass(colorContainer, "activebtn");
                } else {
                    editControl.childNodes[2].childNodes[0].value = value;
                    editControl.childNodes[2].childNodes[0].removeAttribute("disabled");
                }
                if (editControl.childNodes[2].childNodes[1]) {
                    editControl.childNodes[2].childNodes[1].value = value;
                    editControl.childNodes[2].childNodes[1].removeAttribute("disabled");
                }
                editControl.childNodes[0].childNodes[0].checked = true;
            }else{
                editControl.childNodes[0].childNodes[0].checked=false;
                if (type === "color") {
                    var colorContainer = editControl.childNodes[2].childNodes[0].firstChild;
                    SuperMap.Control.TiledVectorLayerEditor.removeClass(colorContainer.nextSibling, "activebtn");
                    SuperMap.Control.TiledVectorLayerEditor.removeClass(colorContainer, "activebtn");
                    this.colorPicker.hidePicker();
                }
            }
        }
    },

    /*************************************************************************/
    /*                                                                       */
    /*              获取用户的输入信息并转化成CartoCSS样式表                 */
    /*                                                                       */
    /*************************************************************************/

    /**
     * Method: layerSymbolsInfo2CartoCss
     * 将所有临时保存的图层样式信息转化为CartoCSS格式的样式表，同时触发CartoCSS改变事件
     * */
    layerSymbolsInfo2CartoCss:function(){
        var cartocss="",layerSymbolsInfo=this.layerSymbolsInfo;
        for(var layerName in layerSymbolsInfo){
            var layerId=layerName.replace(/[@#]/gi,"___"),symbolsInfo=layerSymbolsInfo[layerName];
            var layerSymbols=symbolsInfo.layerSymbols;
            for(var i= 0,len=layerSymbols.length;i<len;i++){
                var symbol="",count=0;
                symbol+=(!!cartocss?"\n":"")+"#"+layerId/*+"::symbol"+i*/+"{";
                var layerSymbol=layerSymbols[i];
                for(var attr in layerSymbol){
                    var value=layerSymbol[attr];
                    symbol+="\n\t"+attr+":"+value+";";
                    count++;
                }
                symbol+="\n}";
                if(count){
                    cartocss+=symbol;
                }
            }
        }
        this.cartoCss=cartocss;
        this.events.triggerEvent("cartocsschange",{"cartoCss":cartocss});
    },

    /**
     * Method: getCurrentLayerSymbolsInfoFromPanel
     * 将当前编辑面板上的样式信息保存到一个临时对象上
     * */
    getCurrentLayerSymbolsInfoFromPanel:function(){
        var currentLayerSymbolsInfo=this.currentLayerSymbolsInfo;
        if(!currentLayerSymbolsInfo){
            return null;
        }
        var layerType=currentLayerSymbolsInfo.layerType;
        var panelType=layerType==="region"?"polygonEdit":layerType+"Edit";
        var editPanel=this.subPanel[panelType];
        var editControls=editPanel.getElementsByClassName("smEditPanelControl");
        var layerSymbols={};
        for(var i= 0,len=editControls.length;i<len;i++){
            var editControl=editControls[i];
            if(editControl.childNodes[0].childNodes[0].checked){
                var attribute=editControl.getAttribute("data-property");
                var type=editControl.getAttribute("data-controltype");
                var value;
                if(type==="range"){
                    value=editControl.childNodes[2].childNodes[0].smSlider.getValue();
                }else if(type==="color"){
                    value=editControl.childNodes[2].childNodes[0].childNodes[0].style.backgroundColor;
                }else{
                    //TODO 这种获取dom的方式可能要改
                    value=editControl.childNodes[2].childNodes[0].value;
                }
                if(attribute==="point-file"){
                    if(!/^url\(/.test(value)){
                        value='url("'+value+'")';
                    }
                }
                layerSymbols[attribute]=value;
            }
        }
        currentLayerSymbolsInfo.layerSymbols=currentLayerSymbolsInfo.layerSymbols||[];
        currentLayerSymbolsInfo.layerSymbols[0]=layerSymbols;
        this.layerSymbolsInfo2CartoCss();
    },

    /**
     * Method: rgb2hex
     * 将rgb格式的颜色值转化为16进制的颜色值
     * */
    rgb2hex:function(rgb){
        var rex=/\d+/g;
        var nums=rgb.match(rex);
        var r=parseInt(nums[0]).toString(16),g=parseInt(nums[1]).toString(16),b=parseInt(nums[2]).toString(16);
        r= r.length===1?"0"+r:r;
        g= g.length===1?"0"+g:g;
        b = b.length===1?"0"+b:b;
        return "#"+r+g+b;
    },

    CLASS_NAME:"SuperMap.Control.TiledVectorLayerEditor"
});

/*************************************************************************/
/*                                                                       */
/*             静态方法，用于给element元素添加或者移除class              */
/*                                                                       */
/*************************************************************************/

SuperMap.Control.TiledVectorLayerEditor.addClass=function(element,className){
    if(element&&element.classList&&typeof element.classList.add==="function"){
        return element.classList.add(className);
    }
    return SuperMap.Element.addClass(element,className);
};
SuperMap.Control.TiledVectorLayerEditor.removeClass=function(element,className){
    if(element&&element.classList&&typeof element.classList.remove==="function"){
        return element.classList.remove(className);
    }
    return SuperMap.Element.removeClass(element,className);
};
SuperMap.Control.TiledVectorLayerEditor.toggleClass=function(element,className){
    if(element&&element.classList&&typeof element.classList.toggle==="function"){
        return element.classList.toggle(className);
    }
    return SuperMap.Element.toggleClass(element,className);
};
SuperMap.Control.TiledVectorLayerEditor.hasClass=function(element,className){
    if(element&&element.classList&&typeof element.classList.contains==="function"){
        return element.classList.contains(className);
    }
    return SuperMap.Element.hasClass(element,className);
};

/*************************************************************************/
/*                                                                       */
/*               静态变量，一些枚举值和CartoCSS属性列表                  */
/*                                                                       */
/*************************************************************************/

SuperMap.Control.TiledVectorLayerEditor.LINECAPTYPE=["","butt", "round", "square"];
SuperMap.Control.TiledVectorLayerEditor.LINEJOINTYPE=["","bevel", "round", "miter"];
SuperMap.Control.TiledVectorLayerEditor.ALIGN=["","center","left","right"];
SuperMap.Control.TiledVectorLayerEditor.VERTICALALIGN=["","top","middle","baseLine","bottom"];
SuperMap.Control.TiledVectorLayerEditor.COMPOPTYPE=["", "src-over", "dst-over", "src-in", "dst-in", "src-out", "dst-atop", "xor", "plus", "lighten"];
SuperMap.Control.TiledVectorLayerEditor.CARTOCSSATTRLIST={
    "point":[{
        "propName":"point-file",
        "controlType":"url",
        "defaultValue":"",
        "regular":true
    },{
        "propName":"point-fill",
        "controlType":"color",
        "defaultValue":"#fc0",
        "regular":true
    },{
        "propName":"point-radius",
        "controlType":"range",
        "unit":"px",
        "minValue":0,
        "maxValue":100,
        "defaultValue":5,
        "regular":true
    },{
        "propName":"point-halo-radius",
        "controlType":"range",
        "unit":"px",
        "minValue":0,
        "maxValue":100,
        "defaultValue":2
    },{
        "propName":"point-halo-color",
        "controlType":"color",
        "defaultValue":"#c33"
    },{
        "propName":"point-dx",
        "controlType":"range",
        "unit":"px",
        "minValue":-5,
        "maxValue":5,
        "defaultValue":0
    },{
        "propName":"point-dy",
        "controlType":"range",
        "unit":"px",
        "minValue":-5,
        "maxValue":5,
        "defaultValue":0
    },{
        "propName":"point-opacity",
        "controlType":"range",
        "minValue":0,
        "maxValue":1,
        "defaultValue":1,
        "regular":true
    },{
        "propName":"point-comp-op",
        "controlType":"select",
        "defaultValue":SuperMap.Control.TiledVectorLayerEditor.COMPOPTYPE
    }],
    "line":[{
        "propName":"line-color",
        "controlType":"color",
        "defaultValue":"#000",
        "regular":true
    },{
        "propName":"line-opacity",
        "controlType":"range",
        "minValue":0,
        "maxValue":1,
        "defaultValue":1,
        "regular":true
    },{
        "propName":"line-width",
        "controlType":"range",
        "unit":"px",
        "minValue":0,
        "maxValue":100,
        "defaultValue":1,
        "regular":true
    },{
        "propName":"line-cap",
        "controlType":"select",
        "defaultValue":SuperMap.Control.TiledVectorLayerEditor.LINECAPTYPE,
        "regular":true
    },{
        "propName":"line-join",
        "controlType":"select",
        "defaultValue":SuperMap.Control.TiledVectorLayerEditor.LINEJOINTYPE,
        "regular":true
    },{
        "propName":"line-miterlimit",
        "controlType":"range",
        "unit":"px",
        "minValue":0,
        "maxValue":50,
        "defaultValue":10
    },{
        "propName":"line-dash-offset",
        "controlType":"range",
        "unit":"px",
        "minValue":0,
        "maxValue":100,
        "defaultValue":0
    },{
        "propName":"line-dasharray",
        "controlType":"array",
        "defaultValue":"10,10"
    },{
        "propName":"line-offset",
        "controlType":"range",
        "minValue":-100,
        "maxValue":100,
        "defaultValue":0
    },{
        "propName":"line-comp-op",
        "controlType":"select",
        "defaultValue":SuperMap.Control.TiledVectorLayerEditor.COMPOPTYPE
    }],
    "region":[{
        "propName":"polygon-fill",
        "controlType":"color",
        "defaultValue":"#000",
        "regular":true
    },{
        "propName":"polygon-dx",
        "controlType":"range",
        "unit":"px",
        "minValue":-5,
        "maxValue":5,
        "defaultValue":0
    },{
        "propName":"polygon-dy",
        "controlType":"range",
        "unit":"px",
        "minValue":-5,
        "maxValue":5,
        "defaultValue":0
    },{
        "propName":"polygon-opacity",
        "controlType":"range",
        "minValue":0,
        "maxValue":1,
        "defaultValue":1,
        "regular":true
    },{
        "propName":"line-color",
        "controlType":"color",
        "defaultValue":"#000",
        "regular":true
    },{
        "propName":"line-opacity",
        "controlType":"range",
        "minValue":0,
        "maxValue":1,
        "defaultValue":1,
        "regular":true
    },{
        "propName":"line-width",
        "controlType":"range",
        "unit":"px",
        "minValue":0,
        "maxValue":100,
        "defaultValue":1,
        "regular":true
    },{
        "propName":"line-join",
        "controlType":"select",
        "defaultValue":SuperMap.Control.TiledVectorLayerEditor.LINEJOINTYPE
    },{
        "propName":"line-miterlimit",
        "controlType":"range",
        "unit":"px",
        "minValue":0,
        "maxValue":100,
        "defaultValue":10
    },{
        "propName":"line-dash-offset",
        "controlType":"range",
        "unit":"px",
        "minValue":-100,
        "maxValue":100,
        "defaultValue":0
    },{
        "propName":"line-dasharray",
        "controlType":"array",
        "defaultValue":"10,10"
    },{
        "propName":"polygon-comp-op",
        "controlType":"select",
        "defaultValue":SuperMap.Control.TiledVectorLayerEditor.COMPOPTYPE
    }],
    "text":[{
        "propName":"text-size",
        "controlType":"range",
        "unit":"px",
        "minValue":10,
        "maxValue":100,
        "defaultValue":18,
        "regular":true
    },{
        "propName":"text-face-name",
        "controlType":"text",
        "defaultValue":"sans-serif",
        "regular":true
    },{
        "propName":"text-align",
        "controlType":"select",
        "defaultValue":SuperMap.Control.TiledVectorLayerEditor.ALIGN,
        "regular":true
    },{
        "propName":"text-vertical-alignment",
        "controlType":"select",
        "defaultValue":SuperMap.Control.TiledVectorLayerEditor.VERTICALALIGN,
        "regular":true
    },{
        "propName":"text-halo-radius",
        "controlType":"range",
        "unit":"px",
        "minValue":0,
        "maxValue":20,
        "defaultValue":0
    },{
        "propName":"text-halo-color",
        "controlType":"color",
        "defaultValue":"#fff"
    },{
        "propName":"text-fill",
        "controlType":"color",
        "defaultValue":"#000",
        "regular":true
    },{
        "propName":"text-opacity",
        "controlType":"range",
        "minValue":0,
        "maxValue":1,
        "defaultValue":1,
        "regular":true
    },{
        "propName":"text-dx",
        "controlType":"range",
        "unit":"px",
        "minValue":-10,
        "maxValue":10,
        "defaultValue":0
    },{
        "propName":"text-dy",
        "controlType":"range",
        "unit":"px",
        "minValue":-10,
        "maxValue":10,
        "defaultValue":0
    },{
        "propName":"text-comp-op",
        "controlType":"select",
        "defaultValue":SuperMap.Control.TiledVectorLayerEditor.COMPOPTYPE
    }]
};