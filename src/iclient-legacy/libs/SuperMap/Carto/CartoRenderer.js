/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.CartoRenderer
 * CartoCSS符号系统的渲染器.
 *
 * CartoRenderer用的是Canvas来进行渲染
 *
 */
SuperMap.CartoRenderer = SuperMap.Class({
    /**
     * Property: context
     * {CanvasRenderingContext2D} 绘制Canvas上下文
     * */
    context:null,

    /**
     * Property: hitContext
     * {CanvasRenderingContext2D} 用于要素选择的Canvas上下文
     * */
    hitContext:null,

    /**
     * Property: symbolizer
     * {<SuperMap.CartoSymbolizer>} 渲染器对应的矢量符号
     * */
    symbolizer:null,

    /**
     * Property:layer
     * */
    layer:null,

    /**
     * Property: pointImagesInfo
     * {Object} 这个对象用于保存已经请求过的图片，其有两个属性，分别是image和url
     * */
    pointImagesInfo:null,

    /**
     * Property: imagesBackup
     * {Array} 用于保存image，以在clear时移除其onload事件回调
     * */
    imagesBackup:null,

    tempImage:null,

    /**
     * Constructor: SuperMap.CartoRenderer
     * Carto符号系统渲染器，此渲染器可利用传入的style风格属性将几何要素绘制到Canvas面板上并显示出来
     * 此渲染器目前可渲染的图形包括文本、点、线和多边形这四种，其不但实现了canvas大部的style属性，还
     * 扩展了其中的一些，比如点、线的偏移值，文本的外部轮廓等等
     *
     * Example:
     * (code)
     *  var render=new SuperMap.CartoRenderer(context,hitContext,null);
     *  render.drawFeature(feature ,style);
     * (end)
     *
     * Parameters:
     * context - {CanvasRenderingContext2D} 用于显示的Canvas绘制上下文
     * hitContext - {CanvasRenderingContext2D} 用于选择要素的Canvas上下文
     * options - {Object} 可选参数，其属性将会被赋给渲染器.
     */
    initialize: function(context,hitContext,options) {
        this.context=context;
        this.hitContext=hitContext;
        this.pointImagesInfo={};
        this.imagesBackup=[];
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 渲染器析构函数
     */
    destroy: function() {
        this.context = null;
        this.symbolizer=null;
        for(var i=this.imagesBackup.length-1;i>=0;i--){
            if(!this.imagesBackup[i].complete){
                this.imagesBackup[i].onload=null;
            }
        }
        this.pointImagesInfo=null;
        this.imagesBackup=null;
    },

    /**
     * APIMethod: supported
     * 检测运行此框架的浏览器是否支持Canvas
     *
     * Returns:
     * {Boolean} true表示支持，否则不支持
     */
    supported: function() {
        var canvas = document.createElement("canvas");
        return !!canvas.getContext;
    },

    /**
     * Method:
     * 将style风格设置到Canvas上去，以改变Canvas的渲染风格
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Canvas绘制上下文
     * style - {Object} 风格属性
     * */
    applyStyle:function(ctx,style){
        for(var st in style){
            if((st in ctx) && (ctx[st] !==style[st])){
                ctx[st]=style[st];
            }
        }
    },

    /**
     * APIMethod: drawFeature
     * 绘制几何要素，首先获取风格信息，然后调用drawGeometry来绘制几何要素。
     * 当用canvas来绘制一个要素的同时，渲染器会用另外一个不显示出来的Canvas绘制同一个
     * 要素，而这个要素的颜色值是用这个要素的ID以及要素所在的图层索引转换过来的，这样，
     * 当要选择canvas上某上要素时，可以通过像素坐标获取不显示的canvas的相同位置的像素
     * 信息，然后反转换成要素ID及图层索引，这样就实现对要素的快速查询
     *
     * Parameters:
     * feature - {Object} 将要绘制的要素
     * style - {Object} 绘制风格
     *
     * Returns:
     * {Boolean} true代表绘制完成，false或者undefined则表示要素无geometry属性
     */
    drawFeature: function(feature, style, layerType) {
        if(!this.context){
            return;
        }
        //使用canvas分层渲染之后，就不再需要使用临时图层这种低效率的方式了
        //临时图层，用于绘制要素，实现岛洞,在Cavvas的实现上，使用的是globalCompositeOperation属性来控制的
        //对于同一个要素，如果分为了多个面，其中一个面在另外一个面上面，那么，这个面就被当成一个岛洞来绘制
        //这时后面的面使用destination-out的方式来绘制，叠加部分就会变成透明，实现了岛洞。为了让要素之间不会
        //影响，所以使用了一个临时的canvas，来绘制要素，绘制完一个要素后就把绘制好的canvas复制到地图上的canvas
        //进行显示。
        /*if(!this.tempCanvas){
            var tempCanvas = this.tempCanvas = document.createElement("canvas");
            tempCanvas.width = 256;
            tempCanvas.height = 256;
            this.tempCtx = tempCanvas.getContext('2d');
        }
        if(!this.tempHitCanvas&&this.hitContext){
            var tempHitCanvas = this.tempHitCanvas = document.createElement("canvas");
            tempHitCanvas.width = 256;
            tempHitCanvas.height = 256;
            this.tempHitCtx = tempHitCanvas.getContext('2d');
        }*/
        if (feature.geometry) {
            var st;
            var type=feature.geometry.type;
            //var isRegion = type === 'REGION';
            /*if(feature.renderType&&feature.renderType==="hightlight"){
                st=SuperMap.CartoRenderer._expandCanvasStyle["HIGHTLIGHT"];
            }else{*/
            st=feature.style?feature.style:style;
            //}
            var ctx=/*isRegion?this.tempCtx:*/this.context;
            if(this.hitContext){
                var hitCtx=/*isRegion?this.tempHitCtx:*/this.hitContext;
            }
            var hitColor=null;
            if(hitCtx){
                //将要素ID以及图层索引转化为颜色值
                hitColor=this.featureIdToHex(feature.id,feature.layerIndex);
            }
            /*if(isRegion){
                ctx.globalAlpha=0;
                ctx.clearRect(0,0,256,256);
                if(this.hitContext){
                    hitCtx.globalAlpha=0;
                    hitCtx.clearRect(0,0,256,256);
                }
            }*/
            var rendered = this.drawGeometry(ctx,hitCtx,feature.geometry, st,hitColor, feature.attributes, layerType);
            /*if(isRegion){
                this.context.globalAlpha=1;
                this.context.drawImage(this.tempCanvas,0,0,256,256);
                if(this.hitContext){
                    this.hitContext.globalAlpha=1;
                    this.hitContext.drawImage(this.tempHitCanvas,0,0,256,256);
                }
            }*/
            return rendered;
        }
    },

    /**
     * Method: drawGeometry
     * 绘制一个几何图形，其中包括文本。目前已实现的几何体有四种，分别是文本、点、
     * 线以及多边形
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Canvas绘制上下文
     * hitCtx - {CanvasRenderingContext2D} Canvas绘制上下文
     * geometry - {Object} 几何图形
     * style - {Object} 渲染属性信息
     * hitColor - {String} 热点区的颜色
     */
    drawGeometry:function(ctx,hitCtx,geometry, style,hitColor, attributes, layerType) {
        var type=geometry.type;
        if(!style) {
            style= SuperMap.CartoRenderer._expandCanvasStyle[type];
        }
        //绘制前保存一下canvas的状态
        ctx && ctx.save();
        hitCtx && hitCtx.save();
        this.applyStyle(ctx,style);

        if(hitColor){
            hitCtx.fillStyle=hitColor;
            hitCtx.strokeStyle=hitColor;
            hitCtx.lineWidth=ctx.lineWidth+3;
            hitCtx.globalAlpha=1;
        }
        var drawed;
        switch(type){
            case "TEXT":
                drawed = this.drawText(ctx,hitCtx,geometry, style);
                break;
            case "POINT":
                if(attributes && layerType === "THEME"){
                    drawed = this.drawText(ctx,hitCtx,geometry, style, attributes);
                }else{
                    drawed = this.drawPoint(ctx,hitCtx,geometry, style);
                }
                break;
            case "LINE":
                if(Math.round(parseFloat(style.lineWidth))===0){
                    drawed=true;
                    break;
                }
                drawed = this.drawLine(ctx,hitCtx,geometry, style);
                break;
            case "REGION":
                drawed = this.drawRegion(ctx,hitCtx,geometry, style);
                break;
            default:break;
        }
        //绘制后恢复绘制前的canvas的状态
        ctx && ctx.restore();
        hitCtx && hitCtx.restore();
        return drawed;
    },

    /**
     * Metho:：drawText
     * 绘制文本
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Canvas绘制上下文
     * hitCtx - {CanvasRenderingContext2D} Canvas绘制上下文
     * geometry - {Object} 文本几何体，其拥有parts和points两个属性
     * style - {Object} 渲染风格
     * */
    drawText:function(ctx,hitCtx,geometry, style, attributes) {
        //有些瓦片里面没有文字，就不会有这个属性，没有则直接跳过
        if(!geometry.texts && !attributes)
        {
            return;
        }
        var textName;
        if(style.textName){
            textName = style.textName.substring(1,style.textName.length-1);
        }
        if(style.bold && !style.fontWeight){
            style.fontWeight = 700;
        }
        var fontStyle = [style.fontStyle ? style.fontStyle : "normal",
            "normal", // "font-variant" not supported
            style.fontWeight ? style.fontWeight : "normal",
            style.fontSize ? style.fontSize : "1em",
            style.fontFamily ? style.fontFamily : "sans-serif"].join(" ");
        ctx.font = fontStyle;
        //显示文字有问题，先不显示
        var startIndex = 0;
        for (var i = 0; i < geometry.parts.length; i++) {
            var part = geometry.parts[i];
            //获取文本
            var text = (textName && attributes && attributes[textName]) || (geometry.texts && geometry.texts[i]);

            if(!text){
                continue;
            }
            var x=  geometry.points[startIndex * 2];
            var y=  geometry.points[startIndex * 2 + 1];
            x+=style.offsetX||0;
            y+=style.offsetY||0;
            ctx.save();
            if(style.rotation){
                ctx.rotate(style.rotation*Math.PI/180);
            }
            if(style.haloRadius)
            {
                //设置字体的轮廓，轮廓颜色使用背景色，桌面里面就是这样定义的
                var offset = (style.haloRadius + 1)||0;
                ctx.save();
                ctx.lineWidth=offset;
                ctx.strokeStyle=style.backColor;
                ctx.strokeText(text,x,y);
                ctx.restore();
            }

            //设置字体前景色（填充色），填充色默认不透明，iserver没有此属性，
            // iserver有属性backOpaque，但在前端文本背景只能是透明的
            //
            ctx.fillStyle = style.foreColor;
            //绘制最上层的文字
            ctx.fillText(text,x, y);
            ctx.restore();

            if(hitCtx){
                var result=ctx.measureText(text);
                var tW=result.width/ 2,tH=style.textHeight/2||6;
                this.drawVectorPoint(hitCtx,tW,tH,x,y);
            }

            startIndex += part;
        }
        return true;
    },



    /**
     * Method:drawPoint
     * 绘制点，可绘制栅格图片，也可绘制矢量点
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Canvas绘制上下文
     * hitCtx - {CanvasRenderingContext2D} Canvas绘制上下文
     * geometry - {Object} 点几何体，其拥有parts和points两个属性
     * style - {Object} 渲染风格
     * */
    drawPoint:function(ctx,hitCtx,geometry, style){
        var x= geometry.points[0],y=geometry.points[1];
        x+=style.offsetX||0;
        y+=style.offsetY||0;
        if(style.pointFile&&style.pointFile!==""){
            this.drawImagePoint(ctx,hitCtx,style,x,y);
        }else{
            var radius=style.pointRadius||3;
            ctx.lineWidth=style.pointHaloRadius||1;
            ctx.strokeStyle=style.pointHaloColor||"#c33";
            ctx.fillStyle=style.fillStyle||"#fc0";
            this.drawVectorPoint(ctx,radius,radius,x,y);
            if(hitCtx){
                this.drawVectorPoint(hitCtx,radius,radius,x,y);
            }
        }
        return true;
    },

    /**
     * Method: drawImagePoint
     * 绘制一个图标来表示点
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} 绘制上下文
     * hitCtx - {CanvasRenderingContext2D} Canvas绘制上下文
     * url - {String} 图标的URL地址
     * x - 点的x坐标
     * y - 点的y坐标
     * */
    drawImagePoint:function(ctx,hitCtx,style,x,y){
        var url=style.pointFile;
        var me = this;
        var image,tempImage=this.tempImage||new Image();
        //tempImage.src为编码之后的url
        tempImage.src=url;
        if(me.pointImagesInfo[tempImage.src]){
            image=me.pointImagesInfo[tempImage.src];
            ctx.drawImage(image,x-image.width/2,y-image.height/2);
            if(hitCtx){
                me.drawVectorPoint(hitCtx,image.width/2,image.height/2,x,y);
            }
            return;
        }
        image = new Image();
        image.src = url;
        me.imagesBackup.push(image);
        var level=me.layer&&me.layer.map&&me.layer.map.getZoom();
        //在onload事件里加入多个回调函数，以重复利用同一个image，避免相同的image的多次请求
        image.onload = function(ctx,hitCtx,x,y,level){
            return function(){
                var currentLevel=me.layer&&me.layer.map&&me.layer.map.getZoom();
                if(currentLevel===level){
                    me.pointImagesInfo[this.src]=this;
                    ctx&&ctx.save();
                    ctx.globalAlpha=style.globalAlpha||1;
                    ctx.globalCompositeOperation=style.globalCompositeOperation||"source-over";
                    ctx.imageSmoothingEnabled=style.imageSmoothingEnabled||true;
                    ctx.drawImage(this,x-this.width/2,y-this.height/2);
                    if(hitCtx){
                        me.drawVectorPoint(hitCtx,this.width/2,this.height/2,x,y);
                    }
                    ctx&&ctx.restore();
                }
            }
        }(ctx,hitCtx,x,y,level);
        image.onerror=function(me,ctx,hitCtx,x,y,level){
            return function(){
                var currentLevel=me.layer&&me.layer.map&&me.layer.map.getZoom();
                if(currentLevel===level){
                    var radius=3;
                    ctx.lineWidth=radius;
                    ctx.strokeStyle="#c33";
                    ctx.fillStyle="#fc0";
                    me.drawVectorPoint(ctx,radius,radius,x,y);
                    if(hitCtx){
                        me.drawVectorPoint(hitCtx,radius,radius,x,y);
                    }
                }
            }
        }(me,ctx,hitCtx,x,y,level);
    },

    /**
     * Method: drawVectorPoint
     * 绘制一个圆来表示一个点
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} 绘制上下文
     * W - {Number} 圆的半径
     * H - {Number} 圆的半径
     * x - {Number} 圆中心点x坐标
     * y - {Number} 圆中心点y坐标
     * */
    drawVectorPoint:function(ctx,W,H,x,y){
        var twoPI=Math.PI*2;
        ctx.beginPath();
        ctx.arc(x, y, W, 0, twoPI, true);
        /*ctx.moveTo(x-W,y-H);
        ctx.lineTo(x+W,y-H);
        ctx.lineTo(x+W,y+H);
        ctx.lineTo(x-W,y+H);*/
        ctx.stroke();
        ctx.fill();
    },

    /**
     * Metho:：drawLine
     * 绘制线
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Canvas绘制上下文
     * hitCtx - {CanvasRenderingContext2D} Canvas绘制上下文
     * geometry - {Object} 线几何体，其拥有parts和points两个属性
     * style - {Object} 渲染风格
     * */
    drawLine:function(ctx,hitCtx,geometry, style,isRegion){
        var points=geometry.points;
        var startIndex = 0;
        style.offset=style.offset||{};
        if(isRegion){
            style.offset.x=style.offsetX||0;
            style.offset.y=style.offsetY||0;
        }else{
            style.offset.x=-style.offset||0;
            style.offset.y=0;
        }
        for (var i = 0,len=geometry.parts.length; i < len; i++) {
            var part = geometry.parts[i];
            if (part < 2) {
                startIndex += part;
                continue;
            }
            if(isRegion){
                if(i===0){
                    ctx.globalCompositeOperation = "source-over";
                    if(hitCtx){
                        hitCtx.globalCompositeOperation = "source-over";
                    }
                }else{
                    ctx.globalCompositeOperation = "xor";
                    if(hitCtx){
                        hitCtx.globalCompositeOperation = "xor";
                    }
                }
            }
            var noline= style.lineOpacity == 0;
            if(style.lineDasharray&&style.lineDasharray.length>0){
               if(ctx.setLineDash){
                   ctx.setLineDash(style.lineDasharray);
                   ctx.lineDashOffset=style.lineDashOffset||0;
                   this.drawDotedLine(ctx,hitCtx,points,startIndex,part,style,isRegion,noline);
                   ctx.setLineDash([]);
               }else{
                   if(!noline){
                       var lineDasharray=style.lineDasharray,lineDashOffset=style.lineDashOffset||0;
                       if(style.strokeOpacity){
                           ctx.globalAlpha=style.strokeOpacity;
                       }
                       this._drawDoteLine(ctx,hitCtx,points,startIndex,part,style,lineDasharray,lineDashOffset);
                   }
                   if(isRegion){
                       if(style.fillOpacity){
                           ctx.globalAlpha=style.fillOpacity;
                       }
                       this.drawDotedLine(ctx,hitCtx,points,startIndex,part,style,true,true);
                   }
               }
            }else{
                this.drawDotedLine(ctx,hitCtx,points,startIndex,part,style,isRegion,noline);
            }
            startIndex += part;
        }
        return true;
    },

    /**
     * Method:drawDotedLine
     * 绘制一段线，可以是虚线也可以是实线
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D}  Canvas绘制上下文
     * hitCtx - {CanvasRenderingContext2D} Canvas绘制上下文
     * points - {Object} 点串
     * startIndex - 线的起点在点串中的索引
     * length - 线的点数
     * offset -线的偏移值
     * */
    drawDotedLine:function(ctx,hitCtx,points,startIndex,length,style,isRegion,noLine){
        var offset=style.offset;
        ctx.beginPath();
        var x=points[startIndex * 2],y=points[startIndex * 2 + 1];
        x+=offset.x||0;
        y+=offset.y||0;
        ctx.moveTo(x,y);
        if(hitCtx){
            hitCtx.beginPath();
            hitCtx.moveTo(x,y);
        }
        for (var j = 1; j < length; j++) {
            var ptIndex = startIndex + j;
            var x1= points[  ptIndex * 2];
            var y1=points[ ptIndex * 2 + 1];
            x1+=offset.x||0;
            y1+=offset.y||0;
            ctx.lineTo(x1,y1);
            if(hitCtx){
                hitCtx.lineTo(x1,y1);
            }
        }
        if(!noLine){
            //设置线的透明度
            if(style.strokeOpacity){
                ctx.globalAlpha=style.strokeOpacity;
            }
            ctx.stroke();
        }
        if(isRegion){
            //设置面的透明度
            if(style.fillOpacity){
                ctx.globalAlpha=style.fillOpacity;
            }
            if(style.fillOpacity!==0){
                ctx.closePath();
                ctx.fill();
            }
        }
        if(hitCtx){
            if(!noLine){
                hitCtx.stroke();
            }
            if(isRegion){
                hitCtx.closePath();
                hitCtx.fill();
            }
        }
    },

    /**
     * Property: _drawDoteLine
     * ie9及ie10下使用的绘制虚线算法
     * */
    _drawDoteLine:function(ctx,hitCtx,points,startIndex,length,style,lineDasharray,lineDashOffset){
        var offset=style.offset,strokeStyle=style.strokeStyle;
        var drawingState={lineDashOffset:lineDashOffset,drawing:true,patternIndex:0,styleInited:true};

        for(var i=0;i<length-1;i++){
           var ptIndex=startIndex+i;
           var x00=points[ptIndex*2],y00=points[ptIndex*2+1],x01=points[ptIndex*2+2],y01=points[ptIndex*2+3];
            x00+=offset.x||0;
            y00+=offset.y||0;
            x01+=offset.x||0;
            y01+=offset.y||0;
           var preStop=[x00,y00];
           var nextStop=[x01,y01];

           this.drawSegment(ctx,lineDasharray,preStop,nextStop,drawingState,strokeStyle);

           if(hitCtx){
               if(i===0){
                   hitCtx.beginPath();
                   hitCtx.moveTo(x00,y00);
                   hitCtx.lineTo(x01,y01);
               }else{
                   hitCtx.lineTo(x01,y01);
               }
           }
        }

        if(hitCtx){
            hitCtx.stroke();
        }
    },

    drawSegment:function(ctx,pattern,preStop,nextStop,drawingState,strokeStyle){
        var offsetX=nextStop[0]-preStop[0];
        var offsetY=nextStop[1]-preStop[1];
        var distance=Math.sqrt(offsetX*offsetX+offsetY*offsetY);
        offsetX=offsetX/distance;
        offsetY=offsetY/distance;

        var drawOffset=drawingState.lineDashOffset;
        var drawIndex=drawingState.patternIndex;
        var drawing=drawingState.drawing;
        var styleInited=drawingState.styleInited;

        var tempStop=preStop;

        while(drawOffset<distance){
            if(!drawingState.linkNext){
                ctx.beginPath();
                ctx.moveTo(tempStop[0],tempStop[1]);
            }

            drawOffset+=pattern[drawIndex];

            if(drawOffset>=distance){
                drawingState.lineDashOffset=drawOffset-distance-pattern[drawIndex];
                drawingState.patternIndex = drawIndex;
                drawingState.drawing = drawing;
                drawingState.styleInited = styleInited;
                drawingState.linkNext=true;
                drawOffset = distance;
            }
            else{
                drawingState.linkNext=false;
            }
            if(drawing){
                ctx.strokeStyle=strokeStyle;
            }
            else{
                ctx.strokeStyle="rgba(0,0,0,0)";
            }

            tempStop=[preStop[0]+drawOffset*offsetX,preStop[1]+drawOffset*offsetY];
            ctx.lineTo(tempStop[0],tempStop[1]);
            if(!drawingState.linkNext){
                ctx.stroke();
            }
            drawing = !drawing;
            drawIndex = (drawIndex + 1) % pattern.length;
        }
    },

    /**
     * Method：drawRegion
     * 绘制多边形，扩展了offset属性
     *
     * Parameters：
     * ctx - {CanvasRenderingContext2D} Canvas绘制上下文
     * hitCtx - {CanvasRenderingContext2D} Canvas绘制上下文
     * geometry - {Object} 面几何体，其拥有parts和points两个属性
     * style - {Object} 渲染风格
    * */
    drawRegion:function(ctx,hitCtx,geometry, style){
        return this.drawLine(ctx,hitCtx,geometry,style,true);
    },

    /**
     * Method: clear
     * 将异步请求点图片的回调函数设置为空，以在地图缩放级别改变后不再加载上一个缩放级别的点图片
     */
    clear: function() {
        var imagesBackup=this.imagesBackup;
        for(var i= 0,len=imagesBackup.length;i<len;i++){
            var img=imagesBackup[i];
            img&&(img.onload=null);
        }
        imagesBackup.length=0;
    },

    /**
     * Method: featureIdToHex
     * 将featureId和layerIndex转化为RGB值，其中前两位表示layerIndex,后四位表示featureId
     * 因此，图层数不能超过256，而featureId则不能超过65536
     *
     * Parameters:
     * featureId - {Number} 要素ID
     * layerIndex - {Number} 图层索引
     *
     * Returns:
     * {String} RGB值.
     */
    featureIdToHex: function(featureId,layerIndex) {
        var id = featureId + 1; // zero for no feature
        var index=layerIndex+1;
        if (id >= 16777216) {
            //this.hitOverflow = id - 16777215;
            id = id % 16777216 + 1;
        }
        var hex00 = "0000" + id.toString(16);
        var len = hex00.length;
        hex00 = hex00.substring(len-4, len);
        var hex01="00"+index.toString(16);
        len=hex01.length;
        hex01="#"+hex01.substring(len-2,len)+hex00;
        return hex01;
    },

    CLASS_NAME: "SuperMap.CartoRenderer"
});

/**
 * Constant: SuperMap.CartoRenderer._expandCanvasStyle
 * {Object} 这个style对应的是Canvas的绘制style以及对Canvas进行扩展后的style的合集，这些style被
 * 按照需要分成了TEXT、POINT、LINE、REGION、SHADOW、GLOBAL、HIGHTLIGHT几种style，其中TEXT对应的是
 * 文本的一些渲染属性，比如字体，颜色，字的大小等等，而POINT则对应着点要素的渲染属性，主要有点文件
 * 的URL地址等等，而LINE则对应线要素的渲染属性，其包括线的颜色、粗细、拐点和偏移等等，POLYGON则对
 * 应着面要素的渲染属性，比如面填充色。其他的几个类型的属性则是共用的属性。
 */
SuperMap.CartoRenderer._expandCanvasStyle = {
    "TEXT":{
        font:"10px sans-serif",
        textAlign:"middle",
        textBaseline:"center",
        direction:"ltr",
        /*expand*/
        bold:false,
        haloRadius:0,
        backColor:"rgba(255,255,255,1)",
        foreColor:"rgba(0,0,0,0)",
        offsetX:0,
        offsetY:0,
        textHeight:0,

        globalAlpha:1,
        globalCompositeOperation:"source-over",
        imageSmoothingEnabled:true
    },
    /*expand*/
    "POINT":{
        pointFile:"",

        /*expand*/
        pointRadius:3,
        pointHaloRadius:1,
        pointHaloColor:"#c33",
        offsetX:0,
        offsetY:0,
        fillStyle:"#fc0",

        globalAlpha:1,
        globalCompositeOperation:"source-over",
        imageSmoothingEnabled:true
    },
    "LINE":{
        strokeStyle:"rgba(0,0,0,0)",
        lineWidth:1,
        lineCap:"butt",
        lineJoin:"round",
        miterLimit:10,
        lineDashOffset:0,
        /*expand*/
        lineDasharray:[],
        strokeOpacity:1,
        offset:0,

        globalAlpha:1,
        globalCompositeOperation:"source-over",
        imageSmoothingEnabled:true
    },
    "REGION":{
        /*包含LINE的部分*/
        strokeStyle:"rgba(0,0,0,0)",
        lineWidth:1,
        lineCap:"butt",
        lineJoin:"round",
        miterLimit:10,
        lineDashOffset:0,
        /*expand*/
        lineOpacity:1,
        fillOpacity:1,
        lineDasharray:[],

        fillStyle: "rgba(0,0,0,0)",
        polygonOpacity:1,

        /*expand*/
        offsetX:0,
        offsetY:0,

        globalAlpha:1,
        globalCompositeOperation:"source-over",
        imageSmoothingEnabled:true
    },
    "SHADOW":{
        shadowBlur:0,
        shadowColor:"rgba(0,0,0,0)",
        shadowOffsetX:0,
        shadowOffsetY:0
    },
    "GLOBAL":{
        globalAlpha:1,
        globalCompositeOperation:"source-over",
        imageSmoothingEnabled:true
    }
};
