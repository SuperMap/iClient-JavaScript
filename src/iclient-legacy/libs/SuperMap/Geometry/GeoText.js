/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Geometry.js
 */

/**
 * Class: SuperMap.Geometry.GeoText
 * 文本标签类。
 * geometry 类型为 SuperMap.Geometry.GeoText 的要素在 Vector 中的展现由策略 <SuperMap.Strategy.GeoText> 控制 , 使用方式如下：
 *
 * (start code)
 * var geoText = new SuperMap.Geometry.GeoText(100, 35,"中华人民共和国");
 * var geotextFeature = new SuperMap.Feature.Vector(geoText);
 *
 * //新建一个策略并使用在矢量要素图层(vector)上。
 * var strategy = new SuperMap.Strategy.GeoText();
 * strategy.style = {
 *   fontColor:"#FF7F00",
 *   fontWeight:"bolder",
 *   fontSize:"14px",
 *   fill: true,
 *   fillColor: "#FFFFFF",
 *   fillOpacity: 1,
 *   stroke: true,
 *   strokeColor:"#8B7B8B"
 * };
 * var vectorLayer = new SuperMap.Layer.Vector("Label",{strategies: [strategy]});
 * map.addLayers([vectorLayer]);
 *
 * vectorLayer.addFeatures([geotextFeature]);
 * (end)
 *
 * Inherits from:
 *  - <SuperMap.Geometry>
 */
SuperMap.Geometry.GeoText = SuperMap.Class(SuperMap.Geometry, {
    /**
     * APIProperty: x
     * {float}横坐标。
     */
    x: null,

    /**
     * APIProperty: y
     * {float}纵坐标。
     */
    y: null,

    /**
     * APIProperty: text
     * {String} 标签中的文本内容。
     */
    text: null,

    /**
     * Property: bsInfo
     * {Object}  标签范围的基础信息，包含下面2个属性。
     * w: bounds 的宽；
     * h: bounds 的高度；
     */
    bsInfo: null,

    /**
     * Constructor: SuperMap.Geometry.GeoText
     * 实例化文本标签对象。
     * (code)
     *  var geoText = new SuperMap.Geometry.GeoText(115, 35,"中华人民共和国");
     * (end)
     *
     * Parameters:
     * x - {float} x-坐标，必设参数。
     * y - {float} y-坐标，必设参数。
     * text - {String} 标签中的文本内容，必设参数。
     */
    initialize: function(x, y, text) {
        SuperMap.Geometry.prototype.initialize.apply(this, arguments);

        this.bsInfo = {
            "h": null,
            "w": null
        };

        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.text = text.toString();
        this.element = document.createElement('span');
    },

    destroy:function(){
        SuperMap.Geometry.prototype.destroy.apply(this, arguments);
        this.x=null;
        this.y=null;
        this.text=null;
    },

    /**
     * Method: getCentroid
     * 获取标签对象的质心。
     * Returns:
     * {<SuperMap.Geometry.Point>} 标签对象的质心。
     */
    getCentroid: function() {
        return new SuperMap.Geometry.Point(this.x, this.y);
    },

    /**
     * APIMethod: clone
     * 克隆标签对象。
     *
     * Returns:
     * {<SuperMap.Geometry.GeoText>} 克隆后的标签对象。
     */
    clone: function(obj) {
        if (obj == null) {
            obj = new SuperMap.Geometry.GeoText(this.x, this.y, this.text);
        }
        SuperMap.Util.applyDefaults(obj, this);
        return obj;
    },

    /**
     * Method: calculateBounds
     * Create a new Bounds based on the lon/lat
     * 计算标签对象的范围。
     */
    calculateBounds: function () {
        this.bounds = new SuperMap.Bounds(this.x, this.y,
            this.x, this.y);
    },

    /**
     * Method: getLabelPxBoundsByLabel
     * 根据绘制好的标签获取文字标签的像素范围，参数的单位是像素；此方法相对于 getLabelPxBoundsByText 效率较低，但支持所有格式的文本。
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
        var theText = style.label || this.text;
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
     * Method: getLabelPxBoundsByText
     * 根据文本内容获取文字标签的像素范围
     *
     * Parameters:
     * locationPixel - {Object} 标签的位置点，该对象含有属性x(横坐标)，属性y(纵坐标)。
     * style - {Object} 标签的样式
     *
     * Returns:
     * {<SuperMap.Bounds>}  标签的像素范围。
     */
    getLabelPxBoundsByText: function (locationPixel, style) {
        var labelPxBounds, left, bottom, top, right;
        var labelSize = this.getLabelPxSize(style);
        var locationPx = SuperMap.Util.cloneObject(locationPixel);

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

        this.bsInfo.h = labelSize.h;
        this.bsInfo.w =  labelSize.w;


        left = locationPx.x - labelSize.w / 2;
        bottom = locationPx.y + labelSize.h / 2;
        //处理斜体字
        if (style.fontStyle && style.fontStyle && style.fontStyle === "italic") {
            right = locationPx.x + labelSize.w / 2 + parseInt(parseFloat(style.fontSize) / 2);
        } else {
            right = locationPx.x + labelSize.w / 2;
        }
        top = locationPx.y - labelSize.h / 2;

        labelPxBounds = new SuperMap.Bounds(left, bottom, right, top);

        return labelPxBounds;
    },

    /**
     * Method: getLabelPxSize
     * 获取label的像素大小
     *
     * Parameters:
     * style - {Object} 标签样式。
     *
     * Returns:
     * {Object} 标签大小对象，属性w表示标签的宽度，属性h表示标签的高度。
     */
    getLabelPxSize: function (style) {
        var text,//文本内容
             fontSize,//字体大小
             spacing = 1,//两个字符间的间距（单位：px）
             bgstrokeWidth = parseFloat(style.strokeWidth);//标签背景框边框的宽度

        text = style.label || this.text;
        if(style.fontSize) {
            fontSize = parseFloat(style.fontSize);
        }else{
            return null;
        }

        //标签宽高
        var labelW, labelH;

        var textRows = text.split('\n');
        var numRows = textRows.length;

        if(numRows > 1 ){
            labelH = fontSize*numRows + numRows + bgstrokeWidth;
        }else{
            labelH = fontSize + bgstrokeWidth + 1 ;
        }

        //取最大宽度
        labelW = 0;
        if(this.labelWTmp && labelW < this.labelWTmp){
            labelW = this.labelWTmp;
        }
        for (var i = 0; i < numRows; i++) {
            var textCharC = this.getTextCount(textRows[i]);
            var labelWTmp = this.labelWTmp = this.getTextWidth(style, textRows[i]) + textCharC.textC*spacing + bgstrokeWidth;
            // var labelWTmp = textCharC.cnC*fontSize + textCharC.enC*(fontSize/2) + textCharC.textC*spacing + bgstrokeWidth + 1;
            // var labelWTmp = this.getTextWidth(style);
            // var labelCNWTmp = textCharC.cnC*fontSize;
            // var labelSpacingWTmp = textCharC.textC*spacing + bgstrokeWidth + 1;
            // var labelENWTmp = 0;
            // for(var j=0; j < text.length; j++){
            //     if(text.charCodeAt(i) <= 255){ //遍历判断字符串中每个字符的Unicode码,小于等于255则为英文
            //         if(text.charCodeAt(i) == 87) {
            //             labelENWTmp += fontSize * 0.9;
            //         } else if (text.charCodeAt(i) == 119) {
            //             labelENWTmp += fontSize * 0.7;
            //         } else {
            //             labelENWTmp += fontSize * 0.5;
            //         }
            //     }
            // }
            // var labelWTmp = labelCNWTmp + labelENWTmp + labelSpacingWTmp;
            if(labelW < labelWTmp){
                labelW = labelWTmp;
            }
        }

        var labelSize = new Object(); //标签大小
        labelSize.h = labelH;
        labelSize.w = labelW;

        return labelSize;
    },

    getTextWidth: function(style, text) {
        document.body.appendChild(this.element);
        this.element.style.width = 'auto';
        this.element.style.height = 'auto';
        if(style.fontSize) this.element.style.fontSize = style.fontSize;
        if(style.fontFamily) this.element.style.fontFamily = style.fontFamily;
        if(style.fontWeight) this.element.style.fontWeight = style.fontWeight;
        this.element.style.position = 'absolute';
        this.element.style.visibility = 'hidden';
        this.element.innerHTML = text;
        var textWidth = this.element.clientWidth;
        document.body.removeChild(this.element);
        return textWidth;
    },

    /**
     * Method: getTextBounds
     * 获取文字地理范围。
     */
    getBoundsByText: function(map, style) {
        style.label = this.text;
        var tempStyle = {};
        tempStyle = SuperMap.Util.copyAttributes(tempStyle, style);
        if(tempStyle.fontSize.toString().indexOf("px") === -1){
            tempStyle.fontSize += "px";
        }
        var locationPixel = map.getPixelFromLonLat(new SuperMap.LonLat(this.x, this.y));
        var pixelBounds = this.getLabelPxBoundsByText(locationPixel, tempStyle);
        var ltLonLat = map.getLonLatFromPixel(new SuperMap.Pixel(pixelBounds.left, pixelBounds.top));
        var rbLonLat = map.getLonLatFromPixel(new SuperMap.Pixel(pixelBounds.right, pixelBounds.bottom));

        var boundsNoRotation = new SuperMap.Bounds(ltLonLat.lon, rbLonLat.lat, rbLonLat.lon, ltLonLat.lat);

        if(tempStyle.labelRotation){
            var rectBounds = [];
            rectBounds.push(new SuperMap.Geometry.Point(boundsNoRotation.left, boundsNoRotation.top));
            rectBounds.push(new SuperMap.Geometry.Point(boundsNoRotation.right, boundsNoRotation.top));
            rectBounds.push(new SuperMap.Geometry.Point(boundsNoRotation.right, boundsNoRotation.bottom));
            rectBounds.push(new SuperMap.Geometry.Point(boundsNoRotation.left, boundsNoRotation.bottom));

            for(var i = 0; i < rectBounds.length; i++){
                rectBounds[i].rotate(-tempStyle.labelRotation, new SuperMap.Geometry.Point(this.x, this.y));
            }

            var rectGeo = new SuperMap.Geometry.LineString(rectBounds);
            return rectGeo.getBounds();
        } else {
            return boundsNoRotation;
        }
    },

    /**
     * Method: getTextCount
     * 获取text中的字符个数。
     *
     * Parameters:
     * text - {String} 字符串。
     *
     * Returns:
     * {Object} 字符个数统计结果，属性cnC表示中文字符个数，属性enC表示英文字符个数，属性textC表示字符总个数。
     */
    getTextCount: function(text) {
        var textCharCount = new Object();

        var cnCount = 0;
        var enCount = 0;

        for(var i=0; i < text.length; i++  ){
            if(text.charCodeAt(i) > 255){ //遍历判断字符串中每个字符的Unicode码,大于255则为中文
                cnCount++;
            }
            else{
                enCount++;
            }
        }
        //中午字符个数
        textCharCount.cnC = cnCount;
        //英文字符个数
        textCharCount.enC = enCount;
        //字符总个数
        textCharCount.textC = text.length;

        return textCharCount;
    },

    /**
     * Method: pixelBoundsToGeoBounds
     * 将标签的像素范围转为地理范围。
     *
     * Parameters:
     * labelPxBounds - {<SuperMap.Bounds>} 标签的像素范围
     * resolution - {Number} 地图分辨率
     * extent - <SuperMap.Bounds> 地理范围
     *
     * Returns:
     * {<SuperMap.Bounds>} 标签的地理范围。
     */
    /*
    pixelBoundsToGeoBounds: function (labelPxBounds, resolution, extent) {
        var labelBounds, left, bottom, top, right;

        var centerPx = labelPxBounds.getCenterPixel();
        var centerLonlat = this.getLonLatFromPX(centerPx, resolution, extent);
        var width = labelPxBounds.getWidth();
        var height = labelPxBounds.getHeight();

        left = centerLonlat.lon - (width/2)*resolution;
        bottom = centerLonlat.lat + (height/2)*resolution;
        right = centerLonlat.lon + (width/2)*resolution;
        top = centerLonlat.lat - (height/2)*resolution;

        labelBounds = new SuperMap.Bounds(left, bottom, right, top);
        return labelBounds;
    },
    */

    CLASS_NAME:"SuperMap.Geometry.GeoText"
})