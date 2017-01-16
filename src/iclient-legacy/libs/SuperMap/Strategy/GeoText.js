/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Strategy.js
 */

/**
 * Class: SuperMap.Strategy.GeoText
 * 控制标签渲染的策略。
 *
 * Inherits from:
 *  - <SuperMap.Strategy>
 */
SuperMap.Strategy.GeoText = SuperMap.Class(SuperMap.Strategy, {
    /**
     * Property: viewLabels 
     * {Array(<SuperMap.Feature.Vector>)} 在当前视图中的标签。
     */
    viewLabels: null,

    /**
     * APIProperty: style
     * {Object} 标签的样式。此对象的可设属性可分为两类，第一类是标签文本样式，第二类是标签背景框样式。
     *
     * 标签文本样式支持的属性有：
     *
     * labelAlign - {String} 标签对齐，是由两个字符组成的字符串，如："lt", "cm", "rb"。
     * 其中第一个字符代表水平方向上的对齐，"l"=left, "c"=center, "r"=right。
     * 第二个字符代表垂直方向上的对齐，"t"=top, "m"=middle, "b"=bottom。
     *
     * labelXOffset - {Number} 标签在x轴方向的偏移量，默认值0。
     *
     * labelYOffset - {Number} 标签在y轴方向的偏移量，默认值0。
     *
     * fontColor - {String} 标签字体颜色，默认值"#000000"。
     *
     * fontOpacity - {Number} 标签透明度 (0-1)，默认值为1。
     *
     * fontFamily - {String} 标签的字体类型。如："sans-serif"。
     *
     * fontSize - {String} 标签的字体大小。默认值“12px”，最小为12px。
     *
     * fontStyle - {String} 标签的字体样式。可设值有：normal（标准的字体）、italic（斜体）、oblique（倾斜体）。默认值“normal”。
     *
     * fontWeight - {String} 标签的字体粗细，可设值有：lighter（细字符）、normal（标准字符）、bold（粗体字符）、bolder（更粗的字符）。默认值“normal”。
     *
     * labelRotation - {Number} 旋转角度，单位是度，不支持VML渲染器,，默认值为0。
     *
     * 标签背景框样式支持的属性有：
     *
     * fill - {Boolean} 是否使用背景色填充，默认值为false。
     *
     * fillColor - {String} 填充背景色，默认为"#ee9900"。
     *
     * fillOpacity - {Number} 背景填充不透明度(0-1),默认为: 0.4。
     *
     * stroke - {Boolean} 是否使用背景框，默认值为false。
     *
     * strokeColor - {String} 背景框描边颜色。
     *
     * strokeOpacity - {Number} 背景框的不透明度(0-1),默认为1。
     *
     * strokeWidth - {Number} 背景框像素宽度，默认为1。
     *
     * strokeLinecap - {String} strokeLinecap有三种类型 butt，round，square，默认为"round"。
     *
     * strokeDashstyle - {String} 有dot, dash, dashot, longdash, longdashdot, solid几种样式，默认为"solid"。
     **/
    style: null,

    /**
     * Property: defaultStyle
     * {Boolean} 标签的默认 style。
     */
    defaultStyle:  {
        //默认文本样式
        fontColor: "#000000",
        fontOpacity: 1,
        //fontFamily: "sans-serif",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: "normal",
        labelAlign: "cm",
        labelXOffset: 0,
        labelYOffset: 0,
        labelRotation:0,

        //默认背景框样式
        fill: false,
        fillColor: "#ee9900",
        fillOpacity: 0.4,
        stroke: false,
        strokeColor: "#ee9900",
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeLinecap: "round",
        strokeDashstyle: "solid",

        //对用户隐藏但必须保持此值的属性
        //cursor: "pointer",
        labelSelect: true,

        //用  _isGeoTextStrategyStyle 标记此style，携带此类style的要素特指GeoText策略中的标签要素
        _isGeoTextStrategyStyle: true
    },

    /**
     * APIProperty: isOverLay
     * {Boolean} 是否进行压盖处理，如果设为true，将隐藏被压盖的标签，默认为true。
     */
    isOverLay: true,

    /**
     * APIProperty: isAvoid
     * {Boolean} 是否进行地图边缘的避让处理，如果设为true，将把与地图边缘相交的标签移到地图范围内，默认为 true，在地图边缘处做避让处理。
     */
    isAvoid: true,

    /**
     * APIProperty: groupField
     * {String} 指定标签风格分组的属性字段名称。此属性字段是标签要素 attributes 中包含的字段，且字段对应的值的类型必须是数值型。
     * 使用标签分组显示还需要设置 styleGroups 属性。
     */
    groupField: null,

    /**
     * APIProperty: styleGroups
     * {Array} 标签风格分组数组，此数组用于将标签分组显示，每一组标签有一种显示风格。使用此属性需要设置 groupField 属性。
     *
     * 标签分组显示有如下情况：
     *
     * 1.没有同时设置 groupField 和 styleGroups，则所有标签都使用本策略（Strategy.GeoText）的 style；
     *
     * 2.同时设置 groupField 和 styleGroups，则按照 groupField 指定的字段名称获取标签要素 attributes 中对应的属性值（Number型）；
     *
     *      a.如果属性值所对应的范围在 styleGroups 数组里，则此标签取数组里与该范围对应的 style。
     *
     *      b.如果属性值所对应的范围没有在 styleGroups 数组里，则此标签按照本策略（Strategy.GeoText）的 style 渲染。
     *
     * 此数组的每一个子对象必须有三个属性：
     *
     * start : 与字段 groupField 相对应的属性值下限（包含）;
     * end：与字段 groupField 相对应的属性值上限（不包含）;
     * style：要赋值标签的style。
     * (start code)
     *
     * styleGroups数组形如：
     * [
     *   {
     *      start:200000,
     *      end:500000,
     *      style:{
     *           fontColor:"#00CD00",
     *           fontWeight:"bolder",
     *           fontSize:"18px"
     *       }
     *   },
     *   {
     *      start:500000,
     *      end:1000000,
     *      style:{
     *           fontColor:"#00EE00",
     *           fontWeight:"bolder",
     *           fontSize:"24px"
     *       }
     *   },
     *   {
     *      start:1000000,
     *      end:2000000,
     *      style:{
     *           fontColor:"#00FF7F",
     *           fontWeight:"bolder",
     *           fontSize:"30px"
     *       }
     *   },
     *   {
     *      start:2000000,
     *      end:100000000,
     *      style:{
     *           fontColor:"#00FF00",
     *           fontWeight:"bolder",
     *           fontSize:"36px"
     *       }
     *   }
     * ]
     *
     * (end)
     */
    styleGroups: null,

    /**
     * Property: getPxBoundsMode
     * {number} 获取标签像素 bounds 的方式。0 - 表示通过文本类容和文本风格计算获取像素范围，现在支持中文、英文; 1 - 表示通过绘制的文本标签获取像素范围，支持各个语种的文字范围获取，但性能消耗较大（尤其是采用SVG渲染）。默认值为0。
     */
    getPxBoundsMode: 0,

    //策略 -start
    /**
     * Constructor: SuperMap.Strategy.GeoText
     * 构造一个新的 GeoText 策略对象，用于控制标签要素在 vector 中的绘制。
     *
     * (start code)
     * //新建一个策略并使用在矢量要素图层(vector)上。
     * var strategy = new SuperMap.Strategy.GeoText();
     * var vectorLayer = new SuperMap.Layer.Vector("Label",{strategies: [strategy]});
     * (end)
     *
     * Parameters:
     * options - {Object} 将会被加到策略对象上的可选参数
     *
     * Returns:
     * {<Constructor: SuperMap.Strategy.GeoText>} GeoText 策略对象。
     */
    initialize: function(options){
        this.viewLabels = [];
        SuperMap.Strategy.prototype.initialize.apply(this,arguments);
    },

    /**
     * APIMethod: destroy
     * 清除策略(strategy)。
     */
    destroy: function() {
        SuperMap.Strategy.prototype.destroy.apply(this,arguments);

        this.viewLabels = null;
        this.style = null;
        this.isAvoid = true;
        this.isOverLay = true;
        this.groupField = null;
        this.styleGroups = null;
        this.getPxBoundsMode = 0;
    },

    /**
     * Method: clone
     *
     * Returns
     * {<SuperMap.Strategy.GeoText>} GeoText 策略对象
     */
    clone: function(){
        var geoText = new SuperMap.Strategy.GeoText();
        var style = {};
        for(var property in this.style){
            var value = this.style[property];
            if(value !== undefined){
                style[property] = value;
            }
        }
        geoText.style = style;
        return geoText;
    },

    /**
     * Method: setStyle
     * 设置标签要素的Style
     *
     * Parameters:
     * fea - {<SuperMap.Feature.Vector>}  需要赋予 style 的要素。
     */
    setStyle: function(fea){
        var feature = fea;
        feature.style = SuperMap.Util.copyAttributes(feature.style, this.defaultStyle);
        //将style赋给标签
        if(this.style && this.style.fontSize && parseFloat(this.style.fontSize) < 12) this.style.fontSize = "12px";
        feature.style = SuperMap.Util.copyAttributes(feature.style, this.style);

        if(this.groupField && this.styleGroups && feature.attributes){
            var Sf = this.groupField;
            var Attrs =  feature.attributes;
            var Gro = this.styleGroups;
            var isSfInAttrs = false; //指定的 groupField 是否是geotext的属性字段之一
            var attr = null; //属性值

            for (var property in Attrs) {
                if(Sf === property)  {
                    isSfInAttrs = true;
                    attr = Attrs[property];
                    break;
                }
            }

            //判断属性值是否属于styleGroups的某一个范围，以便对标签分组
            if(isSfInAttrs){
                for(var i = 0,len = Gro.length; i < len; i++ ){
                    if((attr >= Gro[i].start) && (attr < Gro[i].end)){
                        //feature.style = SuperMap.Util.copyAttributes(feature.style, this.defaultStyle);
                        var sty1 = Gro[i].style;
                        if( sty1 &&  sty1.fontSize && parseFloat( sty1.fontSize) < 12)  sty1.fontSize = "12px";
                        feature.style = SuperMap.Util.copyAttributes(feature.style,  sty1);
                    }
                };
            }
        }

        //if(feature.isLabelRotationWithLine && feature.isLabelRotationWithLine == true) {
        //    this.setLabelRotationByLine(feature);
        //}

        //将文本内容赋到标签要素的style上
        feature.style.label = feature.geometry.text;

        return feature;
    },

    /**
     * Method: setlabelsStyle
     * 设置标签要素的Style
     *
     * Parameters:
     * labelFeatures - {Array<SuperMap.Feature.Vector>} 需要设置 Style 的标签要素数组。
     *
     * Returns:
     * {Array<SuperMap.Feature.Vector>}  赋予 Style 后的标签要素数组。
     */
    setlabelsStyle: function(labelFeatures){
        var fea, labelFeas = [];
        for (var i=0, len = labelFeatures.length; i<len; i++) {
            var feature = labelFeatures[i];
            if(feature.geometry.CLASS_NAME === "SuperMap.Geometry.GeoText"){
                //设置标签的Style
                fea = this.setStyle(feature);
                //为标签要素指定图层
                fea.layer = this.layer;
                labelFeas.push(fea);
            }
        }
        return labelFeas;
    },

    /**
     * Method: getDrawnLabels
     * 获取经（压盖）处理后将要绘制在图层上的标签要素
     * Parameters:
     * labelFeatures - {Array<SuperMap.Feature.Vector>}  所有标签要素的数组。
     *
     * Returns:
     * {Array<SuperMap.Feature.Vector>}  最终要绘制的标签要素数组。
     */
    getDrawnLabels: function(labelFeatures) {
        //公共变量 -start
        var feas = [], //最终要绘制的标签要素集
            fea,    //最终要绘制的标签要素
            fi, //临时标签要素，用户的第i个标签
            labelsB = [], //不产生压盖的标签要素范围集
            styTmp, //用于临时存储要素style的变量
            feaSty,  //标签要素最终的style
        // styleTemp用于屏蔽文本style中带有偏移性质style属性，偏移已经在计算bounds的过程中参与了运算，
        // 所以在最终按照bounds来绘制标签时，需屏蔽style中带有偏移性质属性，否则文本的偏移量将扩大一倍。
            styleTemp = {
                labelAlign: "cm",
                labelXOffset: 0,
                labelYOffset: 0
            };
        this.viewLabels = [];
        //公共变量 -end

        //对用户的每个标签要素进行处理与判断
        for (var i = 0, len = labelFeatures.length; i < len; i++) {
            fi  = labelFeatures[i];

            //检查fi的style在避让中是否被改变，如果改变，重新设置要素的style
            if(fi.isStyleChange){
                fi = this.setStyle(fi);
            }

            //标签最终的中心点像素位置 （偏移后）
            var loc = this.getLabelPxLocation(fi);

            //过滤掉地图范围外的标签 （偏移后）
            if((loc.x >= 0 && loc.x <=  this.layer.map.size.w ) && (loc.y >= 0 && loc.y <= this.layer.map.size.h) )
            {
                //根据当前地图缩放级别过滤标签
                if(fi.style.minZoomLevel > -1)
                {
                    if(this.layer.map.getZoom() <= fi.style.minZoomLevel)
                    {
                        continue;
                    }
                }
                if(fi.style.maxZoomLevel > -1)
                {
                    if(this.layer.map.getZoom() > fi.style.maxZoomLevel)
                    {
                        continue;
                    }
                }

                //计算标签bounds
                var boundsQuad = null;
                if(fi.isStyleChange){
                    fi.isStyleChange = null;
                    boundsQuad  =  this.calculateLabelBounds(fi, loc);
                }
                else
                {
                    if( fi.geometry.bsInfo.w && fi.geometry.bsInfo.h )
                    {
                        //使用calculateLabelBounds2可以提高bounds的计算效率，尤其是在getPxBoundsMode = 1时
                        boundsQuad  =  this.calculateLabelBounds2(fi, loc);
                    }
                    else
                    {
                        boundsQuad  =  this.calculateLabelBounds(fi, loc);
                    }
                }

                // var boundsQuad  =  this.calculateLabelBounds(fi, loc);
                // if(fi.isStyleChange){
                //     fi.isStyleChange = null;
                // }

                //避让处理 -start
                var mapViewBounds = new SuperMap.Bounds(0, this.layer.map.size.h, this.layer.map.size.w, 0),        //地图像素范围
                    quadlen = boundsQuad.length;

                if(this.isAvoid){
                    var avoidInfo = this.getAvoidInfo(mapViewBounds , boundsQuad);       //避让信息

                    if(avoidInfo){
                        //横向（x方向）上的避让
                        if(avoidInfo.aspectW ===  "left") {
                            fi.style.labelXOffset += avoidInfo.offsetX;

                            for(var j = 0;  j < quadlen; j++){
                                boundsQuad[j].x += avoidInfo.offsetX;
                            }
                        }
                        else if(avoidInfo.aspectW ===  "right"){
                            fi.style.labelXOffset +=  (-avoidInfo.offsetX);

                            for(var j = 0;  j < quadlen; j++){
                                boundsQuad[j].x +=  (-avoidInfo.offsetX);
                            }
                        }

                        //纵向（y方向）上的避让
                        if(avoidInfo.aspectH ===  "top") {
                            fi.style.labelYOffset += avoidInfo.offsetY;

                            for(var j = 0;  j < quadlen; j++){
                                boundsQuad[j].y += avoidInfo.offsetY;
                            }
                        }
                        else if(avoidInfo.aspectH ===  "bottom"){
                            fi.style.labelYOffset += (-avoidInfo.offsetY);

                            for(var j = 0;  j < quadlen; j++){
                                boundsQuad[j].y +=  (-avoidInfo.offsetY);
                            }
                        }

                        //如果style发生变化，记录下来
                        fi.isStyleChange = true;
                    }
                }
                //避让处理 -end

                //压盖处理 -start
                if(this.isOverLay){
                    //是否压盖
                    var isOL = false;

                    if (i != 0) {
                        for (var j = 0; j < labelsB.length; j++) {
                            //压盖判断
                            if (this.isQuadrilateralOverLap(boundsQuad, labelsB[j])) {
                                isOL = true;
                                break;
                            }
                        }
                    }

                    if(isOL){
                        continue;
                    }
                    else{
                        labelsB.push(boundsQuad);
                    }
                }
                //压盖处理 -end

                //背景（事件）-start

                //将标签像素范围转为地理范围
                var geoBs = [];
                for(var j = 0; j < quadlen -1; j++){
                    geoBs.push(this.layer.getLonLatFromViewPortPx(boundsQuad[j]));
                }

                var points =[
                        new SuperMap.Geometry.Point(geoBs[0].lon,geoBs[0].lat),
                        new SuperMap.Geometry.Point(geoBs[1].lon,geoBs[1].lat),
                        new SuperMap.Geometry.Point(geoBs[2].lon,geoBs[2].lat),
                        new SuperMap.Geometry.Point(geoBs[3].lon,geoBs[3].lat)
                    ],
                    linearRings = new SuperMap.Geometry.LinearRing(points),
                    labelBgGeo = new SuperMap.Geometry.Polygon([linearRings]);

                //屏蔽有偏移性质的style属性,偏移量在算bounds时已经加入计算
                styTmp = SuperMap.Util.cloneObject(fi.style);
                feaSty = SuperMap.Util.cloneObject(SuperMap.Util.copyAttributes(styTmp, styleTemp));
                fea = new SuperMap.Feature.Vector(labelBgGeo, fi.attributes, feaSty);
                //赋予id
                fea.id = fi.id;
                fea.fid = fi.fid;
                feas.push(fea);
                this.viewLabels.push(fea);
                //背景（事件）-end
            }
            else{
                continue;
            }
        }

        //返回最终要绘制的标签要素
        return feas;
    },

    /**
     * Method: getLabelPxLocation
     * 获取标签要素的像素坐标
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>}  标签要素。
     *
     * Returns:
     * {<SuperMap.Pixel>} 标签位置
     */
    getLabelPxLocation: function(feature){
        var localtion = new SuperMap.Pixel();
        var geoText = feature.geometry;
        var styleTmp = feature.style;

        //将标签的地理位置转为像素位置
        var locationTmp = geoText.getCentroid();
        var locTmep = new SuperMap.LonLat(locationTmp.x, locationTmp.y);
        var locTmp = this.layer.getViewPortPxFromLonLat(locTmep);
        var loc = new SuperMap.Geometry.Point(locTmp.x, locTmp.y);

        //偏移处理
        if (styleTmp.labelXOffset  || styleTmp.labelYOffset ) {
            var xOffset = isNaN(styleTmp.labelXOffset) ? 0 : styleTmp.labelXOffset;
            var yOffset = isNaN(styleTmp.labelYOffset) ? 0 : styleTmp.labelYOffset;
            loc.move(xOffset, -yOffset);
            localtion.x = loc.x;
            localtion.y = loc.y;
            return localtion;
        }
        else{
            localtion.x = loc.x;
            localtion.y = loc.y;
            return localtion;
        }
    },

    /**
     * Method: calculateLabelBounds
     * 获得标签要素的最终范围
     *
     * Parameters:
     * feature - {SuperMap.Feature.Vector>} - 需要计算bounds的标签要素数。
     * loc - {SuperMap.Pixel} 标签位置
     *
     * Returns:
     * {Array(Objecy)}  四边形节点数组。例如：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     */
    calculateLabelBounds: function(feature, loc) {
        var geoText = feature.geometry;

        //标签范围（未旋转前）
        var labB = null;

        //获取bounds的方式
        if(this.getPxBoundsMode == 0){
            labB = geoText.getLabelPxBoundsByText(loc, feature.style);
        }
        else if(this.getPxBoundsMode === 1)
        {
            this.addTmpFuncForRenderer();
            if ((this.layer.renderer.CLASS_NAME === "SuperMap.Renderer.SVG") || (this.layer.renderer.CLASS_NAME === "SuperMap.Renderer.VML")) {
                var labelInfo = this.layer.renderer.getLabelInfo(feature.id, feature.style, feature.geometry.getCentroid());
                labB = geoText.getLabelPxBoundsByLabel(loc, labelInfo.w, labelInfo.h, feature.style);
            }
            else{//canvas
                var labelInfo = this.layer.renderer.getLabelInfo(feature.geometry.getCentroid(), feature.style);
                labB = geoText.getLabelPxBoundsByLabel(loc, labelInfo.w, labelInfo.h, feature.style);
            }
        }
        else{
            return null;
        }

        //旋转Bounds
        var boundsQuad = [];
        if((feature.style.labelRotation % 180) == 0){
            boundsQuad = [
                {"x": labB.left, "y": labB.top},
                {"x": labB.right, "y": labB.top},
                {"x": labB.right, "y": labB.bottom},
                {"x": labB.left, "y": labB.bottom},
                {"x": labB.left, "y": labB.top}
            ];
        }
        else{
            boundsQuad = this.rotationBounds(labB, loc, feature.style.labelRotation);
        }

        //重置GeoText的bounds
        geoText.bounds = new SuperMap.Bounds(boundsQuad[1].x, boundsQuad[3].y, boundsQuad[2].x, boundsQuad[4].y);
        return boundsQuad;
    },

    /**
     * Method: calculateLabelBounds2
     * 获得标签要素的最终范围的另一种算法（通过记录下的标签宽高），提高计算bounds的效率。
     *
     * Parameters:
     * feature - {SuperMap.Feature.Vector>} - 需要计算bounds的标签要素数。
     * loc - {SuperMap.Pixel} 标签位置
     *
     * Returns:
     * {Array(Objecy)}  四边形节点数组。例如：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     */
    calculateLabelBounds2: function (feature, loc){
        var labB, left, bottom, top, right;
        var labelSize = feature.geometry.bsInfo;
        var style = feature.style;
        var locationPx = SuperMap.Util.cloneObject(loc);

        //处理文字对齐
        if (style.labelAlign && style.labelAlign !== "cm") {
            switch (style.labelAlign) {
                case "lt":
                    locationPx.x += labelSize.w / 2;
                    locationPx.y += labelSize.h / 2;
                    break;
                case "lm":
                    locationPx.x += labelSize.w / 2;
                    break;
                case "lb":
                    locationPx.x += labelSize.w / 2;
                    locationPx.y -= labelSize.h / 2;
                    break;
                case "ct":
                    locationPx.y += labelSize.h / 2;
                    break;
                case "cb":
                    locationPx.y -= labelSize.h / 2;
                    break;
                case "rt":
                    locationPx.x -= labelSize.w / 2;
                    locationPx.y += labelSize.h / 2;
                    break;
                case "rm":
                    locationPx.x -= labelSize.w / 2;
                    break;
                case "rb":
                    locationPx.x -= labelSize.w / 2;
                    locationPx.y -= labelSize.h / 2;
                    break;
                default:
                    break;
            }
        }

        left = locationPx.x - labelSize.w / 2;
        bottom = locationPx.y + labelSize.h / 2;
        //处理斜体字
        if (style.fontStyle && style.fontStyle === "italic") {
            right = locationPx.x + labelSize.w / 2 + parseInt(parseFloat(style.fontSize) / 2);
        } else {
            right = locationPx.x + labelSize.w / 2;
        }
        top = locationPx.y - labelSize.h / 2;

        labB = new SuperMap.Bounds(left, bottom, right, top);

        //旋转Bounds
        var boundsQuad = [];
        if((style.labelRotation % 180) == 0){
            boundsQuad = [
                {"x": labB.left, "y": labB.top},
                {"x": labB.right, "y": labB.top},
                {"x": labB.right, "y": labB.bottom},
                {"x": labB.left, "y": labB.bottom},
                {"x": labB.left, "y": labB.top}
            ];
        }
        else{
            boundsQuad = this.rotationBounds(labB, loc, style.labelRotation);
        }

        //重置GeoText的bounds
        feature.geometry.bounds = new SuperMap.Bounds(boundsQuad[1].x, boundsQuad[3].y, boundsQuad[2].x, boundsQuad[4].y);
        return boundsQuad;
    },

    /**
     * Method: addTmpFuncForRenderer
     * 给当前的renderer添加临时的方法getLabelInfo()，用于获取绘制后的标签信息，包括标签的宽，高和行数
     */
    addTmpFuncForRenderer: function(){
        var vectorLayer = this.layer;

        if(vectorLayer.renderer.getLabelInfo) return;
        if ((vectorLayer.renderer.CLASS_NAME === "SuperMap.Renderer.SVG") || (vectorLayer.renderer.CLASS_NAME === "SuperMap.Renderer.VML")) {
            //获取一个标签的信息，包括标签宽、高及标签内的文本行数
            vectorLayer.renderer.getLabelInfo = function (featureId, style, location) {
                var resolution = this.getResolution();
                var labelWidth = 0;
                var subLabels = [];

                var x = (location.x / resolution + this.left);
                var y = (location.y / resolution - this.top);

                var label = this.nodeFactory(featureId + this.LABEL_ID_SUFFIX, "text");

                label.setAttributeNS(null, "x", x);
                label.setAttributeNS(null, "y", -y);

                if (style.labelRotation) {
                    label.setAttributeNS(null, "transform", "rotate(" + style.labelRotation + " " + x + "," + (-y) + ")");
                }

                if (style.fontColor) {
                    label.setAttributeNS(null, "fill", style.fontColor);
                }
                if (style.fontOpacity) {
                    // label.setAttributeNS(null, "opacity", style.fontOpacity);
                    label.setAttributeNS(null, "opacity", 0);
                }
                if (style.fontFamily) {
                    label.setAttributeNS(null, "font-family", style.fontFamily);
                }
                if (style.fontSize) {
                    label.setAttributeNS(null, "font-size", style.fontSize);
                }
                if (style.fontWeight) {
                    label.setAttributeNS(null, "font-weight", style.fontWeight);
                }
                if (style.fontStyle) {
                    label.setAttributeNS(null, "font-style", style.fontStyle);
                }
                if (style.labelSelect === true) {
                    label.setAttributeNS(null, "pointer-events", "visible");
                    label._featureId = featureId;
                } else {
                    label.setAttributeNS(null, "pointer-events", "none");
                }
                var align = style.labelAlign || "cm";
                label.setAttributeNS(null, "text-anchor",
                    SuperMap.Renderer.SVG.LABEL_ALIGN[align[0]] || "middle");

                if (SuperMap.IS_GECKO === true) {
                    label.setAttributeNS(null, "dominant-baseline",
                        SuperMap.Renderer.SVG.LABEL_ALIGN[align[1]] || "central");
                }

                var labelRows = style.label.split('\n');
                var numRows = labelRows.length;
                while (label.childNodes.length > numRows) {
                    label.removeChild(label.lastChild);
                }
                for (var i = 0; i < numRows; i++) {
                    var tspan = this.nodeFactory(featureId + this.LABEL_ID_SUFFIX + "_tspan_" + i, "tspan");
                    if (style.labelSelect === true) {
                        tspan._featureId = featureId;
                        tspan._geometry = location;
                        tspan._geometryClass = location.CLASS_NAME;
                    }
                    if (SuperMap.IS_GECKO === false) {
                        tspan.setAttributeNS(null, "baseline-shift",
                            SuperMap.Renderer.SVG.LABEL_VSHIFT[align[1]] || "-35%");
                    }
                    tspan.setAttribute("x", x);
                    if (i == 0) {
                        var vfactor = SuperMap.Renderer.SVG.LABEL_VFACTOR[align[1]];
                        if (vfactor == null) {
                            vfactor = -.5;
                        }
                        tspan.setAttribute("dy", (vfactor * (numRows - 1)) + "em");
                    } else {
                        tspan.setAttribute("dy", "1em");
                    }
                    tspan.textContent = (labelRows[i] === '') ? ' ' : labelRows[i];
                    if (!tspan.parentNode) {
                        label.appendChild(tspan);
                    }

                    subLabels.push(tspan);
                }

                if (!label.parentNode) {
                    this.textRoot.appendChild(label);
                }

                for (var i = 0; i < subLabels.length; i++) {
                    var subLabel = subLabels[i];
                    var labelWidthTmp = subLabel.getComputedTextLength();
                    if (labelWidth < labelWidthTmp) {
                        labelWidth = labelWidthTmp;
                    }
                }

                var labelInfo = new Object();//标签信息
                if(labelWidth)  {
                    labelInfo.w = labelWidth;//标签的宽
                }
                else{
                    return null;
                }

                labelInfo.h = style.fontSize;//一行标签的高
                labelInfo.rows = numRows;//标签的行数

                return labelInfo;
            }

        }
        else {
            //获取一个标签的信息，包括标签宽、高及标签内的文本行数
            vectorLayer.renderer.getLabelInfo = function(location, style){
                style = SuperMap.Util.extend({
                    fontColor: "#000000",
                    labelAlign: "cm"
                }, style);
                var pt = this.getLocalXY(location);
                var labelWidth = 0;

                if (style.labelXOffset  || style.labelYOffset ) {
                    var xOffset = isNaN(style.labelXOffset) ? 0 : style.labelXOffset;
                    var yOffset = isNaN(style.labelYOffset) ? 0 : style.labelYOffset;
                    pt[0] += xOffset;
                    pt[1] -= yOffset;
                }

                this.setCanvasStyle("reset");
                this.canvas.fillStyle = style.fontColor;
                this.canvas.globalAlpha = style.fontOpacity || 1.0;
                var fontStyle = [style.fontStyle ? style.fontStyle : "normal",
                    "normal", // "font-variant" not supported
                    style.fontWeight ? style.fontWeight : "normal",
                    style.fontSize ? style.fontSize : "1em",
                    style.fontFamily ? style.fontFamily : "sans-serif"].join(" ");
                var labelRows = style.label.split('\n');
                var numRows = labelRows.length;
                if (this.canvas.fillText) {
                    // HTML5
                    this.canvas.font = fontStyle;
                    this.canvas.textAlign =
                        SuperMap.Renderer.Canvas.LABEL_ALIGN[style.labelAlign[0]] ||
                            "center";
                    this.canvas.textBaseline =
                        SuperMap.Renderer.Canvas.LABEL_ALIGN[style.labelAlign[1]] ||
                            "middle";
                    var vfactor =
                        SuperMap.Renderer.Canvas.LABEL_FACTOR[style.labelAlign[1]];
                    if (vfactor == null) {
                        vfactor = -.5;
                    }
                    var lineHeight =
                        this.canvas.measureText('Mg').height ||
                            this.canvas.measureText('xx').width;
                    pt[1] += lineHeight*vfactor*(numRows-1);
                    for (var i = 0; i < numRows; i++) {
                        var labelWidthTmp = this.canvas.measureText(labelRows[i]).width;
                        if(labelWidth < labelWidthTmp){
                            labelWidth = labelWidthTmp;
                        }
                    }
                } else if (this.canvas.mozDrawText) {
                    // Mozilla pre-Gecko1.9.1 (<FF3.1)
                    this.canvas.mozTextStyle = fontStyle;
                    // No built-in text alignment, so we measure and adjust the position
                    var hfactor =
                        SuperMap.Renderer.Canvas.LABEL_FACTOR[style.labelAlign[0]];
                    if (hfactor == null) {
                        hfactor = -.5;
                    }
                    var vfactor =
                        SuperMap.Renderer.Canvas.LABEL_FACTOR[style.labelAlign[1]];
                    if (vfactor == null) {
                        vfactor = -.5;
                    }
                    var lineHeight = this.canvas.mozMeasureText('xx');
                    pt[1] += lineHeight*(1 + (vfactor*numRows));
                    for (var i = 0; i < numRows; i++) {
                        var labelWidthTmp = this.canvas.measureText(labelRows[i]).width;
                        if(labelWidth < labelWidthTmp){
                            labelWidth = labelWidthTmp;
                        }
                    }
                }
                this.setCanvasStyle("reset");
                var labelInfo = new Object();//标签信息
                if(labelWidth)  {
                    labelInfo.w = labelWidth;//标签的宽
                }
                else{
                    return null;
                }

                labelInfo.h = style.fontSize;//一行标签的高
                labelInfo.rows = labelRows.length;//标签的行数

                return labelInfo;
            }
        }
    },

    /**
     * Method: getLabelPxBoundsByLabel
     * 根据绘制好的标签获取文字标签的像素范围，参数的单位是像素。
     * Parameters:
     * locationPixel - {Object} 标签的位置点，该对象含有属性x(横坐标)，属性y(纵坐标)。
     * labelWidth - {String} 标签的宽度，如：“90px”。
     * labelHight - {String}  标签的高度。
     * style - {Object}  标签的style。
     *
     * Returns:
     * {<SuperMap.Bounds>}  标签的像素范围。
     */
    getLabelPxBoundsByLabel: function (locationPixel, labelWidth , labelHight, style) {
        var labelPxBounds, left, bottom, top, right;
        var locationPx = SuperMap.Util.cloneObject(locationPixel);

        //计算文本行数
        var theText = style.label || this.layer.text;
        var textRows = theText.split('\n');
        var laberRows = textRows.length;

        //处理文字对齐
        labelWidth = parseFloat(labelWidth);
        labelHight = parseFloat(labelHight);
        if(laberRows > 1){
            labelHight = parseFloat(labelHight)*laberRows;
        }
        if (style.labelAlign && style.labelAlign !== "cm") {
            switch (style.labelAlign) {
                case "lt":
                    locationPx.x += labelWidth / 2;
                    locationPx.y += labelHight / 2;
                    break;
                case "lm":
                    locationPx.x += labelWidth / 2;
                    break;
                case "lb":
                    locationPx.x += labelWidth / 2;
                    locationPx.y -= labelHight / 2;
                    break;
                case "ct":
                    locationPx.y += labelHight / 2;
                    break;
                case "cb":
                    locationPx.y -= labelHight / 2;
                    break;
                case "rt":
                    locationPx.x -= labelWidth / 2;
                    locationPx.y += labelHight / 2;
                    break;
                case "rm":
                    locationPx.x -= labelWidth / 2;
                    break;
                case "rb":
                    locationPx.x -= labelWidth / 2;
                    locationPx.y -= labelHight / 2;
                    break;
                default:
                    break;
            }
        }

        this.bsInfo.h = labelHight;
        this.bsInfo.w =  labelWidth;

        //bounds的四边
        left = locationPx.x - parseFloat(labelWidth)/2
        bottom = locationPx.y + parseFloat(labelHight)/2
        right = locationPx.x + parseFloat(labelWidth)/2
        top = locationPx.y - parseFloat(labelHight)/2

        labelPxBounds = new SuperMap.Bounds(left, bottom, right, top);

        return labelPxBounds;
    },

    /**
     * Method: rotationBounds
     * 旋转bounds。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}  要旋转的bounds。
     * rotationCenterPoi - {Object}  旋转中心点对象，此对象含有属性x(横坐标)，属性y(纵坐标)。
     * angle - {Number}  旋转角度（顺时针）。
     *
     * Returns:
     * {Array(Object)}  bounds旋转后形成的多边形节点数组。是一个四边形，形如：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]
     */
    rotationBounds: function(bounds, rotationCenterPoi, angle){
        var ltPoi = new SuperMap.Geometry.Point(bounds.left, bounds.top);
        var rtPoi = new SuperMap.Geometry.Point(bounds.right, bounds.top);
        var rbPoi = new SuperMap.Geometry.Point(bounds.right, bounds.bottom);
        var lbPoi = new SuperMap.Geometry.Point(bounds.left, bounds.bottom);

        var ver = [];
        ver.push(this.getRotatedLocation(ltPoi.x, ltPoi.y, rotationCenterPoi.x, rotationCenterPoi.y, angle));
        ver.push(this.getRotatedLocation(rtPoi.x, rtPoi.y, rotationCenterPoi.x, rotationCenterPoi.y, angle));
        ver.push(this.getRotatedLocation(rbPoi.x, rbPoi.y, rotationCenterPoi.x, rotationCenterPoi.y, angle));
        ver.push(this.getRotatedLocation(lbPoi.x, lbPoi.y, rotationCenterPoi.x, rotationCenterPoi.y, angle));

        //bounds旋转后形成的多边形节点数组
        var quad = [];

        for(var i = 0; i < ver.length; i++)
        {
            quad.push({"x": ver[i].x, "y": ver[i].y});
        }
        quad.push({"x": ver[0].x, "y": ver[0].y});
        return quad;
    },

    /**
     * Method: getRotatedLocation
     * 获取一个点绕旋转中心顺时针旋转后的位置。（此方法用于屏幕坐标）
     *
     * Parameters:
     * x - {Number}  旋转点横坐标。
     * y - {Number}  旋转点纵坐标。
     * rx - {Number}  旋转中心点横坐标。
     * ry - {Number}  旋转中心点纵坐标。
     * angle - {Number} 旋转角度
     * Returns:
     * {Object} 旋转后的坐标位置对象，该对象含有属性x(横坐标)，属性y(纵坐标)。
     */
    getRotatedLocation: function (x, y, rx, ry, angle) {
        var loc = new Object(), x0, y0;

        y = -y;
        ry = -ry;
        angle = -angle;//顺时针旋转
        x0 = (x - rx)*Math.cos((angle/180)*Math.PI) - (y - ry)*Math.sin((angle/180)*Math.PI) + rx;
        y0 = (x - rx)*Math.sin((angle/180)*Math.PI) + (y - ry)*Math.cos((angle/180)*Math.PI) + ry;

        loc.x =x0;
        loc.y = -y0;

        return loc;
    },

    /**
     * Method: getAvoidInfo
     * 获取避让的信息。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}  地图像素范围。
     * quadrilateral - {Array{Objecy)}  四边形节点数组。例如：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     *
     * Returns:
     * {Object} 避让的信息
     */
    getAvoidInfo: function(bounds, quadrilateral) {
        if(quadrilateral.length !==5) return null;//不是四边形

        //将bound序列化为点数组形式
        var bounddQuad = [
            {"x":bounds.left,"y":bounds.top},
            {"x":bounds.right,"y":bounds.top},
            {"x":bounds.right,"y":bounds.bottom},
            {"x":bounds.left,"y":bounds.bottom},
            {"x":bounds.left,"y":bounds.top}
        ];

        var isIntersection = false, bqLen = bounddQuad.length, quadLen = quadrilateral.length;

        var offsetX = 0, offsetY = 0, aspectH = "", aspectW = "";
        for(var i = 0; i <bqLen -1 ; i++){
            for(var j = 0 ; j < quadLen -1; j++){
                var isLineIn = SuperMap.Util.lineIntersection(bounddQuad[i], bounddQuad[i+1], quadrilateral[j], quadrilateral[j+1]);
                if(isLineIn.CLASS_NAME === "SuperMap.Geometry.Point"){
                    //设置避让信息
                    setInfo(quadrilateral[j]);
                    setInfo( quadrilateral[j+1]);
                    isIntersection = true;
                }
            }
        }

        if(isIntersection){
            //组织避让操作所需的信息
            var avoidInfo = {
                "aspectW": aspectW,
                "aspectH": aspectH,
                "offsetX": offsetX,
                "offsetY": offsetY
            };
            return avoidInfo;
        }
        else{
            return null;
        }


        //内部函数：设置避让信息
        //参数：vec-{Objecy}  quadrilateral四边形单个节点。如：{"x":1,"y":1}。
        function setInfo(vec){
            //四边形不在bounds内的节点
            if(!bounds.contains(vec.x, vec.y)){
                //bounds的Top边
                if(vec.y < bounds.top){
                    var oY = Math.abs(bounds.top - vec.y);
                    if(oY > offsetY) {
                        offsetY = oY;
                        aspectH = "top";
                    }
                }

                //bounds的Bottom边
                if(vec.y > bounds.bottom){
                    var oY =Math.abs(vec.y - bounds.bottom);
                    if(oY > offsetY) {
                        offsetY = oY;
                        aspectH = "bottom";
                    }
                }

                //bounds的left边
                if(vec.x < bounds.left){
                    var oX =Math.abs(bounds.left - vec.x);
                    if(oX > offsetX) {
                        offsetX = oX;
                        aspectW = "left";
                    }
                }

                //bounds的right边
                if(vec.x > bounds.right){
                    var oX = Math.abs(vec.x - bounds.right);
                    if(oX > offsetX) {
                        offsetX = oX;
                        aspectW = "right";
                    }
                }
            }
        }

    },

    /**
     * Method: isQuadrilateralOverLap
     * 判断两个四边形是否有压盖
     *
     * Parameters:
     * quadrilateral - {Array<Objecy>}  四边形节点数组。例如：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     * quadrilateral2 - {Array<Object>}  第二个四边形节点数组。
     *
     * Returns:
     * {Boolean} 是否压盖，true表示压盖
     */
    isQuadrilateralOverLap: function (quadrilateral, quadrilateral2) {
        var quadLen = quadrilateral.length,
            quad2Len = quadrilateral2.length;
        if(quadLen !==5 || quad2Len !== 5) return null;//不是四边形

        var OverLap = false;
        //如果两四边形互不包含对方的节点，则两个四边形不相交
        for(var i = 0; i <quadLen; i++){
            if(this.isPointInPoly(quadrilateral[i], quadrilateral2)){
                OverLap = true;
                break;
            }
        }
        for(var i = 0; i <quad2Len; i++){
            if(this.isPointInPoly(quadrilateral2[i], quadrilateral)){
                OverLap = true;
                break;
            }
        }
        //加上两矩形十字相交的情况
        for(var i = 0; i < quadLen - 1; i++){
            if(OverLap){
                break;
            }
            for(var j = 0; j < quad2Len -1; j++){
                var isLineIn = SuperMap.Util.lineIntersection(quadrilateral[i], quadrilateral[i+1], quadrilateral2[j], quadrilateral2[j+1]);
                if(isLineIn.CLASS_NAME === "SuperMap.Geometry.Point"){
                    OverLap = true;
                    break;
                }
            }
        }

        return OverLap;
    },

    /**
     * Method: PointInPoly
     * 判断一个点是否在多边形里面。(射线法)
     *
     * Parameters:
     * pt - {Object} 需要判定的点对象，该对象含有属性x(横坐标)，属性y(纵坐标)。
     * poly - {Array(Objecy)}  多边形节点数组。例如一个四边形：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]
     * Returns:
     * {Boolean} 点是否在多边形内
     */
    isPointInPoly: function(pt, poly) {
        for (var isIn = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
                && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
            && (isIn = !isIn);
        return isIn;
    },

    /**
     * Method: setLayer
     * Called to set the <layer> property.
     *
     * Parameters:
     * layer - {<SuperMap.Layer.Vector>}
     */
    setLayer: function(layer){
        SuperMap.Strategy.prototype.setLayer.apply(this, arguments);
        this.overWriteFunctions();
    },

    /**
     * Method: addLabels
     * 向图层添加要素
     *
     * Parameters:
     * labels - {<SuperMap.Feature.Vector>}
     */
    addLabels: function(labels){
        if (!(SuperMap.Util.isArray(labels))) {
            labels = [labels];
        }

        if(!this.layer) return;
        this.layer.renderer.locked = true;
        for (var i=0, len=labels.length; i<len; i++) {
            if (i === (len - 1)) {
                this.layer.renderer.locked = false;
            }
            var feature = labels[i];
            feature.layer = this.layer;
            this.layer.drawFeature(feature, undefined, {isNewAdd: true});
        }
    },

    /**
     * Method: overWriteFunctions
     * Called to set the <layer> property.
     *
     * Parameters:
     * layer - {<SuperMap.Layer.Vector>}
     */
    overWriteFunctions: function(){
        var layer = this.layer;
        if(!layer) return;
        var strategy = this;

        /**
         * Method: addFeatures
         * 重写 vector 的 addFeatures 方法；给这个图层添加features。
         *
         * Parameters:
         * features - {Array(<SuperMap.Feature.Vector>)} 需要添加的要素数组。
         */
        layer.addFeatures = function(features, options){
            SuperMap.Layer.Vector.prototype.addFeatures.apply(this, [features, options]);
            layer.drawFeatures();
        };

        /**
         * Method: drawFeature
         * 重写 vector 的 drawFeature 方法；绘制feature。
         */
        layer.drawFeature = function(feature, style, option) {
            //不绘制GeoText
            if(feature.geometry.CLASS_NAME === "SuperMap.Geometry.GeoText"){
                return true;
            }
            else{
                return SuperMap.Layer.Vector.prototype.drawFeature.apply(this, [feature, style, option]);
            }
        };

        /**
         * Method: drawFeatures
         * 重写 vector 的 drawFeatures 方法；遍历所有 features，并绘制。
         */
        layer.drawFeatures = function(bounds) {
            //清除图层
            layer.renderer.clear();

            //添加矢量要素
            SuperMap.Layer.Vector.prototype.drawFeatures.apply(this, [bounds]);

            //添加标签
            var labFeas = strategy.setlabelsStyle(layer.features);
            var labels = strategy.getDrawnLabels(labFeas);
            strategy.addLabels(labels);

            //设置图层手势
            if ((layer.renderer.CLASS_NAME === "SuperMap.Renderer.SVG") || (layer.renderer.CLASS_NAME === "SuperMap.Renderer.VML")) {
                layer.renderer.vectorRoot.style.cursor="pointer";
                layer.renderer.textRoot.style.cursor="pointer";
            }
            else{//canvas
                layer.renderer.container.style.cursor="pointer";
            }
        };
    },

    CLASS_NAME: "SuperMap.Strategy.GeoText"
});

