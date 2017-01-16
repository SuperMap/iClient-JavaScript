/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Control.js
 */

/**
 * Class: SuperMap.Control.ScaleLine
 * 比例尺控件。默认位置为地图左下角。
 * 
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.ScaleLine = SuperMap.Class(SuperMap.Control, {

    /**
     * APIProperty: maxWidth
     * {Integer} 比例尺控件的最大宽度. 默认为100.
     */
    maxWidth: 100,

    /**
     * APIProperty: isImperialUnits
     * {Boolean} 是否同时显示英制长度单位. 默认为 true.
     */
    isImperialUnits: true,

    /**
     * Property: topOutUnits
     * {String} Units for zoomed out on top bar.  Default is km.
     */
    topOutUnits: "km",
    
    /**
     * Property: topInUnits
     * {String} Units for zoomed in on top bar.  Default is m.
     */
    topInUnits: "m",

    /**
     * Property: bottomOutUnits
     * {String} Units for zoomed out on bottom bar.  Default is mi.
     */
    bottomOutUnits: "mi",

    /**
     * Property: bottomInUnits
     * {String} Units for zoomed in on bottom bar.  Default is ft.
     */
    bottomInUnits: "ft",
    
    /**
     * Property: eTop
     * {DOMElement}
     */
    eTop: null,

    /**
     * Property: eBottom
     * {DOMElement}
     */
    eBottom:null,
    
    /**
     * APIProperty: geodesic
     * {Boolean} 是否使用依地量算，默认为false。推荐地图投影为EPSG:4326时设置为false；使用EPSG:900913时设置为true。
     * 为true时，比例值按照当前视图中心的水平线计算。
     */
    geodesic: false,

    /**
     * Constructor: SuperMap.Control.ScaleLine
     * 创建该类的新实例。
     * 
     * 可用两种方式添加 ScaleLine 控件：	 
     * （1）在初始化构造 Map 的时候，设置 Map 的 controls 属性来添加控件，如 ：
     * (code)	 
     * var map = new SuperMap.Map('map',{controls:[new SuperMap.Control.ScaleLine()]}); 	 
     * (end)
     * 	 
     * （2）在Map构造完成后，调用接口 Map 的方法 addControl() 来添加控件，如 ：
     * (code)	 
     * var map = new SuperMap.Map('map');
     * map.addControl(new SuperMap.Control.ScaleLine()); 	 
     * (end) 
     */

    /**
     * Method: draw
     * 
     * Returns:
     * {DOMElement}
     */
    draw: function() {
        SuperMap.Control.prototype.draw.apply(this, arguments);
        if (!this.eTop) {
            // stick in the top bar
            this.eTop = document.createElement("div");
            this.eTop.className = this.displayClass + "Top";
            var theLen = this.topInUnits.length;
            this.div.appendChild(this.eTop);
            if((this.topOutUnits == "") || (this.topInUnits == "")) {
                this.eTop.style.visibility = "hidden";
            } else {
                this.eTop.style.visibility = "visible";
            }

            // and the bottom bar
            this.eBottom = document.createElement("div");
            this.eBottom.className = this.displayClass + "Bottom";
            this.div.appendChild(this.eBottom);
            if((this.bottomOutUnits == "") || (this.bottomInUnits == "") || !this.isImperialUnits) {
                this.eBottom.style.visibility = "hidden";
            } else {
                this.eBottom.style.visibility = "visible";
            }
        }
        this.map.events.register('moveend', this, this.update);
        this.update();
        return this.div;
    },

    /** 
     * Method: getBarLen
     * Given a number, round it down to the nearest 1,2,5 times a power of 10.
     * That seems a fairly useful set of number groups to use.
     * 
     * Parameters:
     * maxLen - {float}  the number we're rounding down from
     * 
     * Returns:
     * {Float} the rounded number (less than or equal to maxLen)
     */
    getBarLen: function(maxLen) {
        // nearest power of 10 lower than maxLen
        var digits = parseInt(Math.log(maxLen) / Math.log(10));
        var pow10 = Math.pow(10, digits);
        
        // ok, find first character
        var firstChar = parseInt(maxLen / pow10);

        // right, put it into the correct bracket
        var barLen;
        if(firstChar > 5) {
            barLen = 5;
        } else if(firstChar > 2) {
            barLen = 2;
        } else {
            barLen = 1;
        }

        // scale it up the correct power of 10
        return barLen * pow10;
    },

    /**
     * Method: update
     * Update the size of the bars, and the labels they contain.
     */
    update: function() {
        var res = this.map.getResolution();
        if (!res) {
            return;
        }

        var curMapUnits = this.map.getUnits();
        var inches = SuperMap.INCHES_PER_UNIT;

        // convert maxWidth to map units
        var maxSizeData = this.maxWidth * res * inches[curMapUnits];
        var geodesicRatio = 1;
        if(this.geodesic === true) {
            var maxSizeGeodesic = (this.map.getGeodesicPixelSize().w ||
                0.000001) * this.maxWidth;
            var maxSizeKilometers = maxSizeData / inches["km"];
            geodesicRatio = maxSizeGeodesic / maxSizeKilometers;
            maxSizeData *= geodesicRatio;
        }

        // decide whether to use large or small scale units     
        var topUnits;
        var bottomUnits;
        if(maxSizeData > 100000) {
            topUnits = this.topOutUnits;
            bottomUnits = this.bottomOutUnits;
        } else {
            topUnits = this.topInUnits;
            bottomUnits = this.bottomInUnits;
        }

        // and to map units units
        var topMax = maxSizeData / inches[topUnits];
        var bottomMax = maxSizeData / inches[bottomUnits];

        // now trim this down to useful block length
        var topRounded = this.getBarLen(topMax);
        var bottomRounded = this.getBarLen(bottomMax);

        // and back to display units
        topMax = topRounded / inches[curMapUnits] * inches[topUnits];
        bottomMax = bottomRounded / inches[curMapUnits] * inches[bottomUnits];

        // and to pixel units
        var topPx = topMax / res / geodesicRatio;
        var bottomPx = bottomMax / res / geodesicRatio;
        
        // now set the pixel widths
        // and the values inside them
        
        if (this.eBottom.style.visibility === "visible"){
            this.eBottom.style.width = Math.round(bottomPx) + "px"; 
            this.eBottom.innerHTML = bottomRounded + " " + SuperMap.i18n(bottomUnits) ;
        }
            
        if (this.eTop.style.visibility === "visible"){
            this.eTop.style.width = Math.round(topPx) + "px";
            this.eTop.innerHTML = topRounded + " " + SuperMap.i18n(topUnits);
        }
        
    }, 

    CLASS_NAME: "SuperMap.Control.ScaleLine"
});

