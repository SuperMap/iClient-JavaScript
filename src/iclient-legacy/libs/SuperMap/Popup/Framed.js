/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Popup/Anchored.js
 */

/**
 * Class: SuperMap.Popup.Framed
 * 带边框的弹窗。
 * 
 * Inherits from:
 *  - <SuperMap.Popup.Anchored>
 */
SuperMap.Popup.Framed = SuperMap.Class(SuperMap.Popup.Anchored, {

    /**
     * Property: imageSrc
     * {String} location of the image to be used as the popup frame
     */
    imageSrc: null,

    /**
     * Property: imageSize
     * {<SuperMap.Size>} Size (measured in pixels) of the image located
     *     by the 'imageSrc' property.
     */
    imageSize: null,

    /**
     * Property: isAlphaImage
     * {Boolean} 是否设置图像透明。设置背景图像的透明。如果将该属性设置为true，
     * 在IE7和FireFox下没有明显效果，在IE6浏览器下会产生冲突。
     * 默认值为 false。
     */
    isAlphaImage: false,

    /**
     * Property: positionBlocks
     * {Object} Hash of different position blocks (Object/Hashs). Each block 
     *     will be keyed by a two-character 'relativePosition' 
     *     code string (ie "tl", "tr", "bl", "br"). Block properties are 
     *     'offset', 'padding' (self-explanatory), and finally the 'blocks'
     *     parameter, which is an array of the block objects. 
     * 
     *     Each block object must have 'size', 'anchor', and 'position' 
     *     properties.
     * 
     *     Note that positionBlocks should never be modified at runtime.
     */
    positionBlocks: null,

    /**
     * Property: blocks
     * {Array[Object]} Array of objects, each of which is one "block" of the 
     *     popup. Each block has a 'div' and an 'image' property, both of 
     *     which are DOMElements, and the latter of which is appended to the 
     *     former. These are reused as the popup goes changing positions for
     *     great economy and elegance.
     */
    blocks: null,

    /** 
     * APIProperty: fixedRelativePosition
     * {Boolean} 设置弹窗到锚点的相对位置保持固定不变。
     * 一个设计良好的带边框弹窗可以在锚点的任何四个方向浮动显示，但是，如果设置该属 
     * 性为 true ，则弹窗不再动态计算其最合适的位置，每次都会显示在相同的位置。
     * 
     * 如果设置该属性为 true ，建议同时设置 panMapIfOutOfView 属性为 true，以确保弹窗初次
     * 显示的时候在在窗口中间而不被遮盖。默认值为false。
     */
    fixedRelativePosition: false,

    /** 
     * Constructor: SuperMap.Popup.Framed
     * 构造函数，初始化一个带边框的弹窗。
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
     *  var popwin = new SuperMap.Popup.Framed("chicken",
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
     * anchor - {Object} 锚点。包含一个大小信息 <SuperMap.Size> 和偏移信息 <SuperMap.Size> 的对象。(一般为
     * <SuperMap.Icon> 类型）。
     * closeBox - {Boolean} 是否显示关闭按钮。
     * closeBoxCallback - {Function} 关闭弹窗触发该回调函数。
     */
    initialize:function(id, lonlat, contentSize, contentHTML, anchor, closeBox, 
                        closeBoxCallback) {

        SuperMap.Popup.Anchored.prototype.initialize.apply(this, arguments);

        if (this.fixedRelativePosition) {
            //based on our decided relativePostion, set the current padding
            // this keeps us from getting into trouble 
            this.updateRelativePosition();
            
            //make calculateRelativePosition always return the specified
            // fixed position.
            this.calculateRelativePosition = function(px) {
                return this.relativePosition;
            };
        }

        this.contentDiv.style.position = "absolute";
        this.contentDiv.style.zIndex = 1;

        if (closeBox) {
            this.closeDiv.style.zIndex = 1;
        }

        this.groupDiv.style.position = "absolute";
        this.groupDiv.style.top = "0px";
        this.groupDiv.style.left = "0px";
        this.groupDiv.style.height = "100%";
        this.groupDiv.style.width = "100%";
    },

    /** 
     * APIMethod: destroy
     * 销毁弹窗。
     */
    destroy: function() {
        this.imageSrc = null;
        this.imageSize = null;
        this.isAlphaImage = null;

        this.fixedRelativePosition = false;
        this.positionBlocks = null;

        //remove our blocks
        for(var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i];

            if (block.image) {
                block.div.removeChild(block.image);
            }
            block.image = null;

            if (block.div) {
                this.groupDiv.removeChild(block.div);
            }
            block.div = null;
        }
        this.blocks = null;

        SuperMap.Popup.Anchored.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: setBackgroundColor
     * 设置背景颜色，未实现。
     */
    setBackgroundColor:function(color) {
        //does nothing since the framed popup's entire scheme is based on a 
        // an image -- changing the background color makes no sense. 
    },

    /**
     * Method: setBorder
     * 设置边框，未实现。
     */
    setBorder:function() {
        //does nothing since the framed popup's entire scheme is based on a 
        // an image -- changing the popup's border makes no sense. 
    },

    /**
     * Method: setOpacity
     * Sets the opacity of the popup.
     * 
     * Parameters:
     * opacity - {float} A value between 0.0 (transparent) and 1.0 (solid).   
     */
    setOpacity:function(opacity) {
        //does nothing since we suppose that we'll never apply an opacity
        // to a framed popup
    },

    /**
     * APIMethod: setSize
     * 设置大小。
     * 
     * Parameters:
     * contentSize - {<SuperMap.Size>} 设置弹窗的内容HTML要素的像素大小。
     */
    setSize:function(contentSize) { 
        SuperMap.Popup.Anchored.prototype.setSize.apply(this, arguments);

        this.updateBlocks();
    },

    /**
     * Method: updateRelativePosition
     * When the relative position changes, we need to set the new padding 
     *     BBOX on the popup, reposition the close div, and update the blocks.
     */
    updateRelativePosition: function() {

        //update the padding
        this.padding = this.positionBlocks[this.relativePosition].padding;

        //update the position of our close box to new padding
        if (this.closeDiv) {
            // use the content div's css padding to determine if we should
            //  padd the close div
            var contentDivPadding = this.getContentDivPadding();

            this.closeDiv.style.right = contentDivPadding.right + 
                                        this.padding.right + "px";
            this.closeDiv.style.top = contentDivPadding.top +
                                      this.padding.top + "px";

            //this.closeDiv.style.top = contentDivPadding.top + "px";
        }

        this.updateBlocks();
    },

    /** 
     * Method: calculateNewPx
     * Besides the standard offset as determined by the Anchored class, our 
     *     Framed popups have a special 'offset' property for each of their 
     *     positions, which is used to offset the popup relative to its anchor.
     * 
     * Parameters:
     * px - {<SuperMap.Pixel>}
     * 
     * Returns:
     * {<SuperMap.Pixel>} The the new px position of the popup on the screen
     *     relative to the passed-in px.
     */
    calculateNewPx:function(px) {
        var newPx = SuperMap.Popup.Anchored.prototype.calculateNewPx.apply(
            this, arguments
        );

        newPx = newPx.offset(this.positionBlocks[this.relativePosition].offset);

        return newPx;
    },

    /**
     * Method: createBlocks
     */
    createBlocks: function() {
        this.blocks = [];

        //since all positions contain the same number of blocks, we can 
        // just pick the first position and use its blocks array to create
        // our blocks array
        var firstPosition = null;
        for(var key in this.positionBlocks) {
            firstPosition = key;
            break;
        }
        
        var position = this.positionBlocks[firstPosition];
        for (var i = 0; i < position.blocks.length; i++) {

            var block = {};
            this.blocks.push(block);

            var divId = this.id + '_FrameDecorationDiv_' + i;
            block.div = SuperMap.Util.createDiv(divId, 
                null, null, null, "absolute", null, "hidden", null
            );

            var imgId = this.id + '_FrameDecorationImg_' + i;
            var imageCreator = 
                (this.isAlphaImage) ? SuperMap.Util.createAlphaImageDiv
                                    : SuperMap.Util.createImage;

            block.image = imageCreator(imgId, 
                null, this.imageSize, this.imageSrc, 
                "absolute", null, null, null
            );

            block.div.appendChild(block.image);
            this.groupDiv.appendChild(block.div);
        }
    },

    /**
     * Method: updateBlocks
     * Internal method, called on initialize and when the popup's relative
     *     position has changed. This function takes care of re-positioning
     *     the popup's blocks in their appropropriate places.
     */
    updateBlocks: function() {
        if (!this.blocks) {
            this.createBlocks();
        }
        
        if (this.size && this.relativePosition) {
            //将this.relativePosition这个属性设置为tr就保持箭头方向不变了，但是弹出框的位置还需要进一步的寻找
            var position = this.positionBlocks[this.relativePosition];
            for (var i = 0; i < position.blocks.length; i++) {

                var positionBlock = position.blocks[i];
                var block = this.blocks[i];

                // adjust sizes
                var l = positionBlock.anchor.left;
                var b = positionBlock.anchor.bottom;
                var r = positionBlock.anchor.right;
                var t = positionBlock.anchor.top;

                //note that we use the isNaN() test here because if the
                // size object is initialized with a "auto" parameter, the
                // size constructor calls parseFloat() on the string,
                // which will turn it into NaN
                //
                var w = (isNaN(positionBlock.size.w)) ? this.size.w - (r + l)
                                                      : positionBlock.size.w;

                var h = (isNaN(positionBlock.size.h)) ? this.size.h - (b + t) + 32
                                                      : positionBlock.size.h;

                block.div.style.width = (w < 0 ? 0 : w) + 'px';
                block.div.style.height = (h < 0 ? 0 : h) + 'px';

                block.div.style.left = (l != null) ? l + 'px' : '';
                block.div.style.bottom = (b != null) ? b + 'px' : '';
                block.div.style.right = (r != null) ? r + 'px' : '';
                block.div.style.top = (t != null) ? t + 'px' : '';

                block.image.style.left = positionBlock.position.x + 'px';
                block.image.style.top = positionBlock.position.y + 'px';
            }

            this.contentDiv.style.left = this.padding.left + "px";
            this.contentDiv.style.top = this.padding.top + "px";
        }
    },

    CLASS_NAME: "SuperMap.Popup.Framed"
});
