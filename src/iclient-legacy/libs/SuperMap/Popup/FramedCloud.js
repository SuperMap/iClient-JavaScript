/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Popup/Framed.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/BaseTypes/Bounds.js
 * @requires SuperMap/BaseTypes/Pixel.js
 * @requires SuperMap/BaseTypes/Size.js
 */

/**
 * Class: SuperMap.Popup.FramedCloud
 * 具有指向和边框的浮动弹窗。
 * 
 * Inherits from: 
 *  - <SuperMap.Popup.Framed>
 */
SuperMap.Popup.FramedCloud = 
  SuperMap.Class(SuperMap.Popup.Framed, {

    /** 
     * Property: contentDisplayClass
     * {String} The CSS class of the popup content div.
     */
    contentDisplayClass: "smFramedCloudPopupContent",

    /**
     * APIProperty: autoSize
     * {Boolean} 弹窗大小是否随内容自适应。默认为 true，自适应大小。
     */
    autoSize: true,

    /**
     * APIProperty: panMapIfOutOfView
     * {Boolean} 是否移动地图以确保弹窗显示在窗口内。默认为 true。
     */
    panMapIfOutOfView: true,

    /**
     * Property: imageSize
     * 背景图片大小。
     * {<SuperMap.Size>}
     */
    imageSize: new SuperMap.Size(1276, 736),

    /**
     * Property: isAlphaImage
     * {Boolean} 是否设置图像透明。当前弹窗不支持图像透明，默认为false。
     */
    isAlphaImage: false,

    /** 
     * APIProperty: fixedRelativePosition
     * {Boolean} 是否固定相对位置。默认为false。
     */
    fixedRelativePosition: false,

    /**
     * Property: positionBlocks
     * {Object} Hash of differen position blocks, keyed by relativePosition
     *     two-character code string (ie "tl", "tr", "bl", "br")
     */
    positionBlocks: {
        "tl": {
            'offset': new SuperMap.Pixel(44, -32),//44, 0
            'padding': new SuperMap.Bounds(0, 0, 0, -2),//0, 32, 0, 1
            'blocks': [
                { // top-left
                    size: new SuperMap.Size('auto', 'auto'),
                    anchor: new SuperMap.Bounds(0, 51, 22, 0),
                    position: new SuperMap.Pixel(0, 0)
                },
                { //top-right
                    size: new SuperMap.Size(22, 'auto'),
                    anchor: new SuperMap.Bounds(null, 50, 0, 0),
                    position: new SuperMap.Pixel(-1238, 0)
                },
                { //bottom-left
                    size: new SuperMap.Size('auto', 19),
                    anchor: new SuperMap.Bounds(0, 0, 22, null),//0, 32, 22, null
                    position: new SuperMap.Pixel(0, -631)
                },
                { //bottom-right
                    size: new SuperMap.Size(22, 18),
                    anchor: new SuperMap.Bounds(null, 0, 0, null),//null, 32, 0, null
                    position: new SuperMap.Pixel(-1238, -632)
                },
                { // stem
                    size: new SuperMap.Size(29, 35),//81, 35
                    anchor: new SuperMap.Bounds(null, -27, 44, null),//null, 0, 0, null
                    position: new SuperMap.Pixel(-4, -683)//0, -688
                }
            ]
        },
        "tr": {
            'offset': new SuperMap.Pixel(-45, -32),//-45, 0
            'padding': new SuperMap.Bounds(0, 0, 0, -1),//0, 32, 0, 1
            'blocks': [
                { // top-left
                    size: new SuperMap.Size('auto', 'auto'),
                    anchor: new SuperMap.Bounds(0, 51, 22, 0),//0, 51, 22, 0
                    position: new SuperMap.Pixel(0, 0)
                },
                { //top-right
                    size: new SuperMap.Size(22, 'auto'),
                    anchor: new SuperMap.Bounds(null, 50, 0, 0),//null, 50, 0, 0
                    position: new SuperMap.Pixel(-1238, 0)
                },
                { //bottom-left
                    size: new SuperMap.Size('auto', 19),
                    anchor: new SuperMap.Bounds(0, 0, 22, null),//0, 32, 22, null
                    position: new SuperMap.Pixel(0, -631)
                },
                { //bottom-right
                    size: new SuperMap.Size(22, 19),
                    anchor: new SuperMap.Bounds(null, 0, 0, null),//null, 32, 0, null
                    position: new SuperMap.Pixel(-1238, -631)
                },
                { // stem
                    size: new SuperMap.Size(29, 35),//81, 35
                    anchor: new SuperMap.Bounds(43, -27, null, null),//0, 0, null, null
                    position: new SuperMap.Pixel(-263, -682)//-215, -687
                }
            ]
        },
        "bl": {
            'offset': new SuperMap.Pixel(45, 32),//45, 0
            'padding': new SuperMap.Bounds(0, 1, 0, 0),//0, 1, 0, 32
            'blocks': [
                { // top-left
                    size: new SuperMap.Size('auto','auto'),
                    anchor: new SuperMap.Bounds(0, 53, 22, 0),//0, 21, 22, 32
                    position: new SuperMap.Pixel(0, 0)
                },
                { //top-right
                    size: new SuperMap.Size(22, 'auto'),
                    anchor: new SuperMap.Bounds(null, 53, 0, 0),//null, 21, 0, 32
                    position: new SuperMap.Pixel(-1238, 0)
                },
                { //bottom-left
                    size: new SuperMap.Size('auto', 21),
                    anchor: new SuperMap.Bounds(0, 0, 22, null),
                    position: new SuperMap.Pixel(0, -629)
                },
                { //bottom-right
                    size: new SuperMap.Size(22, 21),
                    anchor: new SuperMap.Bounds(null, 0, 0, null),
                    position: new SuperMap.Pixel(-1238, -629)
                },
                { // stem
                    size: new SuperMap.Size(29, 33),//81, 33
                    anchor: new SuperMap.Bounds(null, null, 43, -27),//null, null, 0, 0
                    position: new SuperMap.Pixel(-106, -679)//-101, -674
                }
            ]
        },
        "br": {
            'offset': new SuperMap.Pixel(-44, 32),//-44, 0
            'padding': new SuperMap.Bounds(0, 1, 0, 0),//0, 1, 0, 32
            'blocks': [
                { // top-left
                    size: new SuperMap.Size('auto', 'auto'),
                    anchor: new SuperMap.Bounds(0, 53, 22, 0),//0, 21, 22, 32
                    position: new SuperMap.Pixel(0, 0)
                },
                { //top-right
                    size: new SuperMap.Size(22, 'auto'),
                    anchor: new SuperMap.Bounds(null, 53, 0, 0),//null, 21, 0, 32
                    position: new SuperMap.Pixel(-1238, 0)
                },
                { //bottom-left
                    size: new SuperMap.Size('auto', 21),
                    anchor: new SuperMap.Bounds(0, 0, 22, null),
                    position: new SuperMap.Pixel(0, -629)
                },
                { //bottom-right
                    size: new SuperMap.Size(22, 21),
                    anchor: new SuperMap.Bounds(null, 0, 0, null),
                    position: new SuperMap.Pixel(-1238, -629)
                },
                { // stem
                    size: new SuperMap.Size(29, 33),//81, 33
                    anchor: new SuperMap.Bounds(45, null, null, -28),//0, null, null, 0
                    position: new SuperMap.Pixel(-359, -678)//-311, -674
                }
            ]
        }
    },

    /**
     * APIProperty: minSize
     * {<SuperMap.Size>} 弹窗内容最小像素值，默认为 (105, 30);
     */
    minSize: new SuperMap.Size(105, 30),

    /**
     * APIProperty: maxSize
     * {<SuperMap.Size>} 弹窗内容最大像素值，默认为 (1200, 660);
     */
    maxSize: new SuperMap.Size(1200, 660),

    /**
     * Property: shadowDiv
     * {DOMElement} 放置Popup阴影的div
     */
    shadowDiv:null,
      /**
       * Property: isShowShadow
       * {Boolean} 是否显示阴影，默认为true。
       */
    isShowShadow:true,

    /** 
     * Constructor: SuperMap.Popup.FramedCloud
     * 构造函数，初始化一个带箭头指向和边框的浮动弹窗。 
     *
     * Parameters:
     * id - {String} 弹窗的唯一标识ID。
     * lonlat - {<SuperMap.LonLat>} 地图上弹窗显示的位置。
     * contentSize - {<SuperMap.Size>} 弹窗内容的大小。
     * contentHTML - {String} 弹窗内容HTML的字符串表达，其用法同"<Div>"标签的innerHTML属性，示例如下：
     * (code)
     *  //组织需要嵌入的HTML字符串表达
     *  var contentHTML = "<div style='width:80px; border-width:2px; border-style:solid; border-color:red;font-size:12px; opacity: 0.8'>";
     *  contentHTML += "Test  Test";
     *  contentHTML += "</div>";
     *
     *  var lonLat = map.getCenter();
     *  var popwin = new SuperMap.Popup.FramedCloud("chicken",
     *  lonLat,
     *  new SuperMap.Size(80,20),
     *  contentHTML,
     *  null,
     *  false,
     *  null);
     *
     *   if(popwin) map.removePopup(popwin);
     *   map.addPopup(popwin);
     * (end)
     * anchor - 锚点。包含一个大小信息 <SuperMap.Size> 和偏移信息 <SuperMap.Size> 的对象。(一般为
     * <SuperMap.Icon> 类型）。
     * closeBox - {Boolean} 是否显示关闭按钮。
     * closeBoxCallback - {Function} 关闭弹窗触发该回调函数。
     *  isShowShadow - {Boolean} 是否显示阴影，默认为true。如果显示阴影，那么popup位置就会固定
     */
    initialize:function(id, lonlat, contentSize, contentHTML, anchor, closeBox, 
                        closeBoxCallback,isShowShadow) {
        if(isShowShadow != undefined)
        {
            this.isShowShadow = isShowShadow;
        }
        this.imageSrc = SuperMap.Util.getImagesLocation() + 'cloud-popup-relative.png';
        SuperMap.Popup.Framed.prototype.initialize.apply(this, arguments);
        this.contentDiv.className = this.contentDisplayClass;
    },
      /**
       * Method: draw
       * 重写了基类Popup的draw方法，主要添加了阴影部分的绘制
       *
       * Parameters:
       * px - {<SuperMap.Pixel>} the position the popup in pixels.
       *
       * Returns:
       * {DOMElement} Reference to a div that contains the drawn popup
       */
      draw: function(px) {
          SuperMap.Popup.prototype.draw.apply(this, [px]);
          if(this.isShowShadow)
          {
              this.shadowDiv = this.createShadowFromPopup(parseInt(this.div.style.left),parseInt(this.div.style.top),parseInt(this.div.style.width),parseInt(this.div.style.height));

              this.map.shadowContainerDiv.appendChild(this.shadowDiv);
          }
          return this.div;
      },
      /**
       * Method: createShadowFromPopup
       * 创建阴影
       *
       * Parameters:
       * x - {<Number>} popup的左上角的x像素坐标
       * y - {<Number>} popup的左上角的y像素坐标
       * width - {<Number>} popup的宽度
       * height - {<Number>} popup的高度
       *
       * Returns:
       * {DOMElement} 返回阴影div
       */
      createShadowFromPopup: function(x,y,width,height){
          //初始化图片信息对象
          var imgInfo = {
              //图片的地址修妖后期修改，下面还有一张图片的地址需要修改
              url:SuperMap.Util.getImagesLocation()+"shadow-popup-subject.png",
              width:1187,
              height:331,
              leftTop:{x:338,y:0},
              leftBottom:{x:8,y:330},
              rightTop:{x:1175,y:0},
              rightBottom:{x:845,y:330}
          };
          imgInfo.ratio = (imgInfo.leftBottom.y - imgInfo.leftTop.y)/(imgInfo.leftTop.x - imgInfo.leftBottom.x);
          //定义阴影高度（由popup高度换算）
          var shadowHeight = height*(2/3);
          //通过阴影的倾斜角度生成ShadowDiv的倾斜量，作为四个角的矩形的宽度
          var translation =  shadowHeight/imgInfo.ratio;

          //初始化ShadowDiv的大小（高度减半，宽度增加倾斜量）位置（y向下平移一半的高度外加5个像素）参数
          var shadowSize = {
              left:x,
              //阴影位置向下偏移height-shadowHeight，并且再次偏移15个像素比较合适
              top:parseInt(y + height-shadowHeight +15),
              //额外添加translation/4的宽度
              width:parseInt(width + translation +translation/4),
              height:parseInt(shadowHeight)
          };
          //创建阴影div，并且控制好位置
          var div = document.createElement("div");
          div.id = SuperMap.Util.createUniqueID("SuperMapShadowDiv");
          div.style.position = "absolute";
          div.style.left = shadowSize.left + "px";
          div.style.top = shadowSize.top + "px";
          div.style.width = shadowSize.width + "px";
          div.style.height = shadowSize.height + "px";

          //设置四个角的宽度为偏移量，高度为10像素（图片周边使用了10像素进行模糊处理，所以不能小于10像素）
          var baseWidth = parseInt(translation);
          var baseHeight = 10;

          var  array = [];
          array[0] = {
              div:{
                  left:0,
                  top:0,
                  width:baseWidth,
                  height:baseHeight
              },
              img:{
                  left:-imgInfo.leftTop.x+baseWidth,
                  top:-imgInfo.leftTop.y,
                  width:imgInfo.width,
                  height:imgInfo.height
              }
          };
          array[1] = {
              div:{
                  left:baseWidth,
                  top:0,
                  width:shadowSize.width-baseWidth*2,
                  height:baseHeight
              },
              img:{
                  left:-imgInfo.leftTop.x,
                  top:-imgInfo.leftTop.y,
                  width:imgInfo.width,
                  height:imgInfo.height
              }
          };
          array[6] = {
              div:{
                  left:0,
                  top:shadowSize.height-baseHeight,
                  width:baseWidth,
                  height:baseHeight
              },
              img:{
                  left:-(shadowSize.height)/imgInfo.ratio-imgInfo.leftBottom.x+baseWidth,
                  top:-imgInfo.leftBottom.y+baseHeight,
                  width:imgInfo.width,
                  height:imgInfo.height
              }
          };
          array[3] = {
              div:{
                  left:0,
                  top:baseHeight,
                  width:baseWidth,
                  height:shadowSize.height-baseHeight*2
              },
              img:{
                  left:-imgInfo.leftTop.x+baseWidth,
                  top:-imgInfo.leftTop.y-baseHeight,
                  width:imgInfo.width,
                  height:imgInfo.height
              }
          };
          array[4] = {
              div:{
                  left:baseWidth,
                  top:baseHeight,
                  width:shadowSize.width-baseWidth*2,
                  height:shadowSize.height-baseHeight*2
              },
              img:{
                  left:-imgInfo.leftTop.x,
                  top:-imgInfo.leftTop.y-baseHeight,
                  width:imgInfo.width,
                  height:imgInfo.height
              }
          };
          array[8] = {
              div:{
                  left:shadowSize.width-baseWidth,
                  top:shadowSize.height-baseHeight,
                  width:baseWidth,
                  height:baseHeight
              },
              img:{
                  left:-imgInfo.rightBottom.x,
                  top:-imgInfo.rightBottom.y+baseHeight,
                  width:imgInfo.width,
                  height:imgInfo.height
              }
          };
          array[7] = {
              div:{
                  left:baseWidth,
                  top:shadowSize.height-baseHeight,
                  width:shadowSize.width-baseWidth*2,
                  height:baseHeight
              },
              img:{
                  left:-imgInfo.rightBottom.x+shadowSize.width-baseWidth*2,
                  top:-imgInfo.rightBottom.y+baseHeight,
                  width:imgInfo.width,
                  height:imgInfo.height
              }
          };
          array[5] = {
              div:{
                  left:shadowSize.width-baseWidth,
                  top:baseHeight,
                  width:baseWidth,
                  height:shadowSize.height-baseHeight*2
              },
              img:{
                  left:-imgInfo.rightBottom.x,
                  top:-imgInfo.rightBottom.y+shadowSize.height-baseHeight,
                  width:imgInfo.width,
                  height:imgInfo.height
              }
          };
          array[2] = {
              div:{
                  left:shadowSize.width-baseWidth,
                  top:0,
                  width:baseWidth,
                  height:baseHeight
              },
              img:{
                  left:-imgInfo.rightTop.x+(shadowSize.height)/imgInfo.ratio,
                  top:-imgInfo.rightTop.y,
                  width:imgInfo.width,
                  height:imgInfo.height
              }
          };
          for(var i = 0;i<array.length;i++)
          {
              if(array[i] != null)
              {
                  var div1 = document.createElement("div");
                  div1.id = SuperMap.Util.createUniqueID("SuperMapDiv");
                  div1.style.overflow = "hidden";
                  div1.style.index = 1;
                  div1.style.zIndex = i+1;
                  div1.style.position = "absolute";
                  div1.style.left = array[i].div.left + "px";
                  div1.style.top = array[i].div.top + "px";
                  div1.style.width = array[i].div.width + "px";
                  div1.style.height = array[i].div.height + "px";

                  var img1 = document.createElement("img");
                  img1.src = SuperMap.Util.getImagesLocation()+"shadow-popup-subject.png";
                  img1.style.position = "absolute";
                  img1.style.left = array[i].img.left + "px";
                  img1.style.top = array[i].img.top + "px";
                  img1.style.width = array[i].img.width + "px";
                  img1.style.height = array[i].img.height + "px";

                  div1.appendChild(img1);
                  div.appendChild(div1);
              }
          }
          var divCorner = document.createElement("div");
          divCorner.id = SuperMap.Util.createUniqueID("SuperMapDivimgCorner");
          divCorner.style.overflow = "hidden";
          divCorner.style.index = 1;
          divCorner.style.zIndex = 0;
          divCorner.style.position = "absolute";
          //此处位置设计还可以进行优化
          divCorner.style.left = 50 + "px";
          divCorner.style.top = shadowSize.height-11 + "px";
          divCorner.style.width = 80 + "px";
          divCorner.style.height = 20 + "px";

          var imgCorner = document.createElement("img");
          imgCorner.src = SuperMap.Util.getImagesLocation()+"shadow-popup-corner.png";
          imgCorner.style.position = "absolute";
          imgCorner.style.left = 0 + "px";
          imgCorner.style.top = 0 + "px";
          imgCorner.style.width = 80 + "px";
          imgCorner.style.height = 20 + "px";
          divCorner.appendChild(imgCorner);
          div.appendChild(divCorner);

          return   div;
      },
      /**
       * Method: hide
       * Makes the popup invisible.
       */
      hide: function() {
          SuperMap.Popup.prototype.hide.apply(this);
          if(this.shadowDiv)
          {
              this.isShowShadow = false;
              this.shadowDiv.style.display = 'none';
          }
      },
    CLASS_NAME: "SuperMap.Popup.FramedCloud"
});
