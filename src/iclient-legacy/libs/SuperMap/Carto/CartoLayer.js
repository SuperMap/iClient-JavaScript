/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.CartoLayer
 * Carto图层类，其属于矢量分块图层下的一个子图层
 */
SuperMap.CartoLayer=SuperMap.Class({
    context:null,
    hitContext:null,
    cartoRenderer:null,
    /**
     * Property: tile
     * {<SuperMap.Tile.VectorImage>} Carto图层所属瓦片
     * */
    tile:null,

    /*
    * APIProperty: layerName
    * {String} Carto图层名
    * */
    layerName:null,

    /*
     * APIProperty: id
     * {String} Carto图层ID
     * */
    "id":null,

    /*
     * APIProperty: className
     * {String} Carto图层className
     * */
    "className":null,

    /**
     * Property:ugcLayerType
     * {String} UGC图层类型，对应服务端的图层类型，在矢量地图里主要有“VECTOR”和“THEME”两种
     * */
    "ugcLayerType":null,

    /*
     * Property: index
     * {Number} Carto图层在瓦片中的索引值，子图层的渲染顺序用的参照的这个index值
     * */
    index:0,

    /**
     * Property: originIndex
     * {Number} 这个索引表示本子图层在瓦片的cartoLayers属性中的索引
     * */
    originIndex:999,

    /**
     * Property: features
     * {Array} 此子图层下的所有要素集合
     * */
    features:null,

    /**
     * APIProperty: symbolizers
     * {Array} 符号集合，每一项都是一个CartoSymbolizer对象
     * */
    symbolizers:null,

    hightlightShader:null,

    /**
     * APIProperty: visible
     * {boolean} 值为true时图层可被渲染出来，false时不被渲染，默认为true
     * */
    visible:true,

    /**
     * Constructor: SuperMap.CartoLayer
     *  Carto图层类，其属于矢量分块图层下的一个子图层，此子图层其实是从服务端返回的recordset抽象出来的，
     *  主要是用于实现子图层的控制功能。Carto图层拥有id属性与className属性，这两个属性对应着CartoCSS中的id
     *  选择器中的id与类选择器中的类名。图层名默认为从服务端获取的图层名，也就是发布的数据中数据集名+"@"+数据源名
     *  而图层id与图层类名则默认将“@”符号替换为“__”,以在CartoCSS中使用。
     *
     *  Parameters:
     *  layerName - {String} 图层名
     *  tile - {<SuperMap.Tile.VectorImage>} 此Carto图层所属的瓦片
     *  options- {Object} 可选参数
     *
     *  Examples:
     *  (code)
     *   var recordSet=recordSets[i];             //recorSets为服务端返回的数据集
     *   var serverFeatures=recordSet.features;
     *   var layerName=recordSet.layerName;
     *   var cartoLayer=new SuperMap.CartoLayer(layerName,this,{originIndex:i});
     *   cartoLayer.addFeatures(serverFeatures);
     *  (end)
     * */
    initialize:function(layerName,tile,options){
        if(tile){
            this.tile=tile;
        }
        if(typeof layerName=="string"){
            this.layerName=layerName;
            var name=layerName.replace(/[@#]/gi,"___");
            this.id=name;
            this.className=name;
            this.index=0;
        }
        this.features=[];
        this.symbolizers={};
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: equals
     * 判断两个CartoLayer是否相等
     *
     * Parameters:
     * cartoLayer - {<SuperMap.CartoLayer>} 要比较carto图层
     * */
    equals:function(cartoLayer){
        if(!cartoLayer instanceof  SuperMap.CartoLayer){
            return false;
        }
        return cartoLayer.layerName===this.layerName&&cartoLayer.id===this.id&&cartoLayer.className===this.className;
    },

    /**
     * APIMethod: setIndex
     * 设置carto图层的index属性
     *
     * Parameters:
     * num - {Number} index值
     * */
    setIndex:function(num){
        if(!isNaN(num)){
            this.index=num;
        }
    },

    getFeatureInfo:function(x,y){
        if(this.hitContext){
            x=x|0;
            y=y|0;
            var data=this.hitContext.getImageData(x,y,1,1).data;    //从要素选择Canvas上读取要素信息
            if(data[3]===255){
                var id=256*data[1]+data[2]-1;        //后四位组成要素ID
                if(id != null){
                    return {feature:this.getFeatureById(id),cartoLayer:this};
                }
            }
        }
    },

    /**
     * APIMethod: addFeatures
     * 添加多个feature到Carto图层里
     *
     * Parameters:
     * features - {Array} feature集合
     * */
    addFeatures:function(features){
        if(features&&features.length>0){
            this.features=this.features.concat(features);
        }
    },

    /**
     * APIMethod: addFeature
     * 添加feature到Carto图层中
     *
     * Parameters:
     * faature - {Object} 矢量要素
     * */
    addFeature:function(feature){
        if(feature){
            this.features.push(feature);
        }
    },

    /**
     * APIMethod: getFeatureById
     * 通过要素id查找要素
     *
     * Parameters:
     * id - {number} 要素id
     *
     * Returns:
     * {Object} 查找到的要素，没找到返回null
     * */
    getFeatureById:function(id){
        for(var i= 0,len=this.features.length;i<len;i++){
             var feature=this.features[i];
            if(feature.id===id){
                return feature;
            }
        }
        return null;
    },

    /**
     * APIMethod: addSymbolizer
     * 添加carto符号到图层里
     *
     * Parameters:
     * symbolizer - {SuperMap.CartoSymbolizer} carto符号
     * */
    addSymbolizer:function(symbolizer,attachment){
        if(symbolizer instanceof SuperMap.CartoSymbolizer){
            if(this.symbolizers[attachment || 'default']){
                this.symbolizers[attachment || 'default'].push(symbolizer);
            }else{
                this.symbolizers[attachment || 'default'] = [symbolizer];
            }
        }
    },

    /**
     * Method: drawValidSymbolizers
     * 从同类型的符号中，生成对应要素的新的可用的符号，并渲染
     * */
    drawValidSymbolizers:function(symbolizers,attachment){
        var hightLigthSymbolizer,lastRender,
            zoom= this.layer.map.getZoom(),
            scale = this.layer.getScaleForZoom(zoom),
            layer = this.layer,
            layerName = this.layerName,
            hightlightFeatureInfo = this.layer.hightlightFeatureInfo,
            unHightlightFeatureInfo = this.layer.unHightlightFeatureInfo,
            featureStyleMapLayer = layer.featureStyleMap && layer.featureStyleMap[layerName];
        for(var i = 0, flen = this.features.length; i < flen; i++){
            var feature = this.features[i];
            var upperAttributes;
            var attributes = feature.attributes,
                isUnHightlightFeature = (unHightlightFeatureInfo && unHightlightFeatureInfo.cartoLayer.layerName ===this.layerName && unHightlightFeatureInfo.feature && feature.id === unHightlightFeatureInfo.feature.id),
                isHightLightFeature = (hightlightFeatureInfo && hightlightFeatureInfo.cartoLayer.layerName ===this.layerName && hightlightFeatureInfo.feature && feature.id === hightlightFeatureInfo.feature.id);
            if((!isHightLightFeature) && (!isUnHightlightFeature) && (layer.lastZoom === zoom) && featureStyleMapLayer && featureStyleMapLayer[feature.id] && featureStyleMapLayer[feature.id][attachment] && featureStyleMapLayer[feature.id][attachment].style){
                //保存得到的style，重绘时就不用重新去从shader中转化了
                feature.style = featureStyleMapLayer[feature.id][attachment].style;
                feature[attachment] = SuperMap.Util.cloneObject(feature.style);
                layer.lastZoom = zoom;
            }else{
                if(featureStyleMapLayer && featureStyleMapLayer[feature.id] && featureStyleMapLayer[feature.id].upperAttributes){
                    upperAttributes = featureStyleMapLayer[feature.id].upperAttributes;
                }else{
                    var newAttributes = {};
                    for(var att in attributes){
                        newAttributes[att.toUpperCase()]=attributes[att];
                    }
                    upperAttributes = newAttributes;
                }
                //查看是否有保存过的style
                if(feature[attachment] && (layer.lastZoom === zoom) && !this.layer.resetCartoCSS && !this.layer.activeHighLightFeature && !this.layer.unHightlightFeature){
                    feature.style = feature[attachment];
                }else{
                    var type = feature.geometry.type,
                        searchValues = feature.searchValues,
                    //text的临时处理方法，cartocss还有很多没支持的属性
                        isText = type === 'TEXT';
                    if(searchValues && this.ugcLayerType === "THEME" && type === 'POINT'){
                        type = "TEXT";
                    }
                    feature.style = this.getDefaultStyle(feature.style,type);
                    if(this.layer.activeHighLightFeature && isHightLightFeature){
                        lastRender = this.layer.highLightCartoShaders && this.getValidStyleFromCarto(zoom,scale,feature.style,{shader:this.layer.highLightCartoShaders[0]},upperAttributes, feature,type);
                    }else {
                        for(var j = 0, slen = symbolizers.length; j < slen; j++){
                            var symbolizer = symbolizers[j];
                            if(symbolizer.useLayerInfo || (symbolizer.shader.fromServer && isText)){
                                this.getValidStyleFromLayerInfo(feature.style,symbolizer,feature,type);
                            }else{
                                this.getValidStyleFromCarto(zoom,scale,feature.style,symbolizer,upperAttributes, feature,type);
                            }
                        }
                    }
                    //保存得到的style，重绘时就不用重新去从shader中转化了
                    feature[attachment] = SuperMap.Util.cloneObject(feature.style);
                    layer.lastZoom = zoom;
                }
                //将相同的要素对应某一级别上的样式缓存到layer中，这样其他的瓦片相同的要素就可以直接获取这个样式，而不用再去使用shader来获取，这是一种以空间换取时间的做法
                if(!this.layer.featureStyleMap){
                    this.layer.featureStyleMap = {};
                }
                if(!this.layer.featureStyleMap[layerName]){
                    this.layer.featureStyleMap[layerName] = {};
                }
                if(!this.layer.featureStyleMap[layerName][feature.id]){
                    this.layer.featureStyleMap[layerName][feature.id] = {};
                }
                this.layer.featureStyleMap[layerName][feature.id][attachment]={
                    style:feature[attachment],
                    upperAttributes:upperAttributes
                };
            }
            var validSymbolizer = new SuperMap.CartoSymbolizer(this,feature,feature.style,{
                layerType: this.ugcLayerType,
                context:this.context,
                hitContext:this.hitContext,
                cartoRenderer:this.cartoRenderer});
            if(lastRender){
                hightLigthSymbolizer = validSymbolizer;
                lastRender = false;
            }else{
                validSymbolizer.render();
            }
        }
        //高亮的要素在最后渲染，以让高亮的要素置顶
        hightLigthSymbolizer && hightLigthSymbolizer.render();
    },

    getDefaultStyle:function(style,type){
        style = style || {};
        //设置默认值
        var canvasStyle=SuperMap.CartoRenderer._expandCanvasStyle[type];
        for(var prop in canvasStyle){
            var val=canvasStyle[prop];
            style[prop]=val;
        }
        return style;
    },

    getValidStyleFromCarto: function(zoom,scale,style,symbolizer, upperAttributes, feature,type){
        var shader = symbolizer.shader,
            fromServer = symbolizer.fromServer,
            attributes = upperAttributes;
        attributes.FEATUREID=feature.id;
        attributes.SCALE = scale;
        var cartoStyleMap= SuperMap.CartoSymbolizer._cartoStyleMap[type];
        var fontSize,fontName;
        for(var i= 0,len=shader.length;i<len;i++){
            var _shader=shader[i];
            var prop=cartoStyleMap[_shader.property];
            var value=_shader.getValue(attributes,zoom,true);
            if((value !== null) && prop){
                if(prop==="fontSize"){
                    if(fromServer){
                        value *=0.8;
                    }
                    //斜杠后面为行间距，默认为0.5倍行间距
                    fontSize = value +"px";
                    style.fontSize=fontSize;
                }else if(prop==="fontName"){
                    fontName=value;
                }else{
                    if(prop==="globalCompositeOperation"){
                        value=SuperMap.CartoSymbolizer._compOpMap[value];
                        if(!value||value==="")continue;
                    }else if(shader.fromServer && prop === 'pointFile'){
                        value = this.layer.url + '/tileFeature/symbols/' + value.replace(/(___)/gi,'@');
                    }
                    if(prop === 'lineWidth' && value < 1){
                        value = Math.ceil(value);
                    }
                    style[prop]=value;
                }

            }
        }
        return true;
    },

    getValidStyleFromLayerInfo:function(style,symbolizer, feature, type){
        var shader = symbolizer.shader;
        if(shader === null ){
            return;
        }
        if(type==="POINT"){
            var symbolParameters = {
                "transparent": true,
                "resourceType": "SYMBOLMARKER",
                "picWidth": Math.ceil(shader.markerSize*SuperMap.DOTS_PER_INCH*SuperMap.INCHES_PER_UNIT["mm"]),
                "picHeight": Math.ceil(shader.markerSize*SuperMap.DOTS_PER_INCH*SuperMap.INCHES_PER_UNIT["mm"]),
                "style": JSON.stringify(shader)
            };
            var imageUrl = SuperMap.Util.urlAppend(this.layer.url + "/symbol.png", SuperMap.Util.getParameterString(symbolParameters));
            style.pointFile=imageUrl;
        }else if(type==="TEXT"){
            shader = feature.geometry.textStyle;
            var fontStr = "";
            //设置文本是否倾斜
             style.fontStyle = !!shader.italic?"italic":"normal";
            //设置文本是否使用粗体
             style.fontWeight = shader.bold? shader.fontWeight:"normal";
            //设置文本的尺寸（对应fontHeight属性）和行高，行高iserver不支持，默认5像素
            //固定大小的时候单位是毫米
            var text_h=shader.fontHeight*SuperMap.DOTS_PER_INCH*SuperMap.INCHES_PER_UNIT["mm"]*0.85;    //毫米转像素,服务端的字体貌似要稍微小一点
            style.fontSize = text_h +"px";

            //设置文本字体类型
            //在桌面字体钱加@时为了解决对联那种形式，但是在canvas不支持，并且添加了@会导致
            //字体大小被固定，这里需要去掉
            if(shader.fontName.indexOf("@"))
            {
                fontStr = shader.fontName.replace(/@/g,"");
            }
            else
            {
                fontStr = shader.fontName
            }
            style.fontFamily = fontStr;
            style.textHeight=text_h;

            //设置对齐方式
            var alignStr=shader.align.replace(/TOP|MIDDLE|BASELINE|BOTTOM/,"");
            style.textAlign=alignStr.toLowerCase();
            var baselineStr=shader.align.replace(/LEFT|RIGHT|CENTER/,"");
            if(baselineStr==="BASELINE")baselineStr="alphabetic";
            style.textBaseline = baselineStr.toLowerCase();

            /*//首先判定是否需要绘制阴影，如果需要绘制，阴影应该在最下面
             if(shader.shadow)
             {

             //桌面里面的阴影没有做模糊处理，这里统一设置为0,
             style.shadowBlur=0;
             //和桌面统一，往右下角偏移阴影，默认3像素
             style.shadowOffsetX=3;
             style.shadowOffsetY=3;
             //颜色取一个灰色，调成半透明
             style.shadowColor="rgba(50,50,50,0.5)";
             }else{
             style.shadowOffsetX=0;
             style.shadowOffsetY=0;
             }*/
            style.haloRadius = shader.outline ? shader.outlineWidth:0;
            style.backColor="rgba("+shader.backColor.red+","+shader.backColor.green+","+shader.backColor.blue+",1)";
            style.foreColor ="rgba("+shader.foreColor.red+","+shader.foreColor.green+","+shader.foreColor.blue+",1)";
            style.rotation = shader.rotation;
        }else{
            //目前只实现桌面系统默认的几种symbolID，非系统默认的面用颜色填充替代，线则用实线来替代
            var fillSymbolID=shader["fillSymbolID"]>7?0:shader["fillSymbolID"];
            var lineSymbolID=shader["lineSymbolID"]>5?0:shader["lineSymbolID"];
            for(var attr in shader){
                var obj=SuperMap._serverStyleMap[attr];
                var canvasStyle=obj.canvasStyle;
                if(canvasStyle&&canvasStyle!=""){
                    var type=obj.type;
                    switch(type){
                        case "number":
                            var value=shader[attr];
                            if(obj.unit){
                                //将单位转换为像素单位
                                value=value*SuperMap.DOTS_PER_INCH*SuperMap.INCHES_PER_UNIT[obj.unit]*2.5;
                            }
                            style[canvasStyle]=value;
                            break;
                        case "color":
                            var color=shader[attr];
                            var backColor=shader["fillBackColor"];
                            var value,alpha=1;
                            if(canvasStyle==="fillStyle"){
                                if(fillSymbolID===0||fillSymbolID===1){
                                    //当fillSymbolID为0时，用颜色填充，为1是无填充，即为透明填充，alpha通道为0
                                    alpha=1-fillSymbolID;
                                    value="rgba("+color.red+","+color.green+","+color.blue+","+alpha+")";
                                }else{
                                    //当fillSymbolID为2~7时，用的纹理填充,但要按照前景色修改其颜色
                                    try{
                                        var tempCvs=document.createElement("canvas");
                                        tempCvs.height=8;
                                        tempCvs.width=8;
                                        var tempCtx=tempCvs.getContext("2d");
                                        var image=new Image();
                                        tempCtx.drawImage(this.layer.fillImages["System "+fillSymbolID],0,0);
                                        var imageData=tempCtx.getImageData(0,0,tempCvs.width,tempCvs.height);
                                        var pix=imageData.data;
                                        for(var i= 0,len=pix.length;i<len;i+=4){
                                            var r=pix[i],g=pix[i+1],b=pix[i+2];
                                            //将符号图片中的灰色或者黑色的部分替换为前景色，其余为后景色
                                            if(r<225&&g<225&&b<225){
                                                pix[i]=color.red;
                                                pix[i+1]=color.green;
                                                pix[i+2]=color.blue;
                                            }else if(backColor){
                                                pix[i]=backColor.red;
                                                pix[i+1]=backColor.green;
                                                pix[i+2]=backColor.blue;
                                            }
                                        }
                                        tempCtx.putImageData(imageData,0,0);
                                        image.src=tempCvs.toDataURL();

                                        value=this.context.createPattern(image,"repeat");
                                    }catch(e){
                                        throw Error("cross-origin");
                                    }
                                }
                            }else if(canvasStyle==="strokeStyle"){
                                if(lineSymbolID===0||lineSymbolID===5){
                                    //对于lineSymbolID为0时，线为实线，为lineSymbolID为5时，为无线模式，即线为透明，即alpha通道为0
                                    alpha=lineSymbolID===0?1:0;
                                }else{
                                    //以下几种linePattern分别模拟了桌面的SymbolID为1~4几种符号的linePattern
                                    var linePattern=[1,0];
                                    switch(lineSymbolID){
                                        case 1:
                                            linePattern=[9.7,3.7];
                                            break;
                                        case 2:
                                            linePattern=[3.7,3.7];
                                            break;
                                        case 3:
                                            linePattern=[9.7,3.7,2.3,3.7];
                                            break;
                                        case 4:
                                            linePattern=[9.7,3.7,2.3,3.7,2.3,3.7];
                                            break;
                                        default:
                                            break
                                    }
                                    style.lineDasharray=linePattern;
                                }
                                value="rgba("+color.red+","+color.green+","+color.blue+","+alpha+")";
                            }
                            style[canvasStyle]=value;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        if(!style.globalAlpha)style.globalAlpha=1;
        return style;
    },

    /**
     * APIMethod: redraw
     * 重绘此图层，也就是遍历其内的carto符号，然后调用它们的render方法时行重绘
     * */
    redraw:function(){
        this.clear();
        //this.context.canvas.setAttribute('data-index',this.originIndex);
        //this.context.canvas.setAttribute('data-name',this.layerName);
        if(this.visible){
            for(var att in this.symbolizers){
                if(att==='default'&& this.symbolizers['__default__']){
                    continue;
                }
                var symbolizers = this.symbolizers[att];
                this.drawValidSymbolizers(symbolizers,att);
            }
        }
    },

    /**
     * APIMethod: clear
     * 清除图层
     **/
    clear:function(){
        var w=this.context.canvas.width,h= this.context.canvas.height;
        this.context.globalAlpha=0;
        this.context.clearRect(0, 0, w,h);
        if(this.hitContext){
            this.hitContext.globalAlpha=0;
            this.hitContext.clearRect(0,0,w,h);
        }
    },

    /**
     * APIMethod: destroy
     * CartoLayer对象的析构函数，用于销毁此对象
     * */
    destroy:function(){
        if(this.tile && this.tile.frame && this.context && this.context.canvas){
            this.tile.frame.removeChild(this.context.canvas);
        }
        this.tile=null;
        this.layerName=null;
        this.id=null;
        this.className=null;
        this.index=null;
        this.visible=false;
        this.symbolizers=null;
        this.features=null;
        this.context = null;
        this.hitContext = null;
    },

    CLASS_NAME:"SuperMap.CatoLayer"
});