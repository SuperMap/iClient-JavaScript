/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Shape.SmicText
 * 文本。
 *
 * Inherits from:
 *  - <SuperMap.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new SuperMap.LevelRenderer.Shape.SmicText({
 *         style: {
 *             text: 'Label',
 *             x: 100,
 *             y: 100,
 *             textFont: '14px Arial'
 *         }
 *     });
 *   levelRenderer.addShape(shape);
 * (end)
 */
SuperMap.LevelRenderer.Shape.SmicText = SuperMap.Class(SuperMap.LevelRenderer.Shape, {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {Number} 横坐标，必设参数。
     * y - {Number} 纵坐标，必设参数。
     * text - {String} 图形中的附加文本。默认值：""。
     * maxWidth - {Number} 最大宽度限制。默认值：null。
     * textFont - {String} 附加文本样式。示例:'bold 18px verdana'。
     * textAlign - {String} 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * textBaseline - {String} 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     * brushType - {String} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * color - {String} 填充颜色。默认值："#000000'"。
     * strokeColor - {String} 描边颜色。默认值："#000000'"。
     * lineWidth - {Number} 描边宽度。默认值：1。
     * opacity - {Number} 绘制透明度。默认值：1。
     * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
     * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
     * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
     * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
     */
    //打开接口 style

    /**
     * APIProperty: type
     * {String} 图形类型.
     */
    type: 'smictext',

    /**
     * Constructor: SuperMap.LevelRenderer.Shape.SmicText
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    initialize: function() {
        SuperMap.LevelRenderer.Shape.prototype.initialize.apply(this, arguments);
        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];
    },

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy: function() {
        this.type = null;

        SuperMap.LevelRenderer.Shape.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: brush
     * 笔触。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * isHighlight - {Boolean} 是否使用高亮属性。
     *
     */
    brush : function (ctx, isHighlight) {
        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];
        var __OP = this.refOriginalPosition;

        var style = this.style;
        if (isHighlight) {
            // 根据style扩展默认高亮样式
            style = this.getHighlightStyle(
                style, this.highlightStyle || {}
            );
        }

        if (typeof(style.text) == 'undefined' || style.text === false) {
            return;
        }

        ctx.save();
        this.doClip(ctx);

        this.setContext(ctx, style);

        // 设置transform
        this.setTransform(ctx);

        if (style.textFont) {
            ctx.font = style.textFont;
        }
        ctx.textAlign = style.textAlign || 'start';
        ctx.textBaseline = style.textBaseline || 'middle';

        var text = (style.text + '').split('\n');
        var lineHeight = SuperMap.LevelRenderer.Util_area.getTextHeight('ZH', style.textFont);
        var rect = this.getRectNoRotation(style);
        // var x = style.x;
        var x = style.x + __OP[0];
        var y;
        if (style.textBaseline == 'top') {
            y = rect.y;
        }
        else if (style.textBaseline == 'bottom') {
            y = rect.y + lineHeight;
        }
        else {
            y = rect.y + lineHeight / 2;
        }
        /*
         //用于的调试代码 -start
         //文字范围
         var tbg = this.getTextBackground(style);
         //开始一个新的绘制路径
         ctx.beginPath();
         for(var m = 0, len = tbg.length; m < len; m++){
         var poi = tbg[m];
         if(i == 0 ){
         ctx.moveTo(poi[0], poi[1]);
         }
         ctx.lineTo(poi[0], poi[1]);
         }
         //先关闭绘制路径。注意，此时将会使用直线连接当前端点和起始端点。
         ctx.closePath();
         //最后，按照绘制路径画出直线
         ctx.stroke();

         // 包围盒子
         var rectAll = this.getRect(style);
         ctx.fillRect(rectAll.x, rectAll.y, rectAll.width, rectAll.height);

         // 原点
         ctx.fillRect(style.x, style.y, 10, 10);
         //用于的调试代码 -end
         */

        //旋转中心点
        // var ox = style.x;
        // var oy =  style.y;
        var ox = style.x + __OP[0];
        var oy = style.y + __OP[1];

        //文本绘制
        for (var i = 0, l = text.length; i < l; i++) {
            switch (style.brushType) {
                case 'fill':
                    this.setCtxGlobalAlpha(ctx, "fill", style);
                    if(style.textRotation && style.textRotation !== 0){
                        ctx.save();
                        ctx.translate(ox, oy);
                        ctx.rotate(style.textRotation*Math.PI/180);
                        if (style.textBaseline == 'top') {
                            if (style.maxWidth){
                                ctx.fillText(text[i], 0, lineHeight*i, style.maxWidth);
                            }
                            else{
                                ctx.fillText(text[i], 0, lineHeight*i);
                            }
                        }
                        else if (style.textBaseline == 'bottom') {
                            if (style.maxWidth){
                                ctx.fillText(text[i], 0, lineHeight*(i+1) - rect.height, style.maxWidth);
                            }
                            else{
                                ctx.fillText(text[i], 0, lineHeight*(i+1) - rect.height);
                            }
                        }
                        else {
                            if (style.maxWidth){
                                ctx.fillText(text[i], 0,  lineHeight*(i+1) - rect.height/2 - lineHeight/2, style.maxWidth);
                            }
                            else{
                                ctx.fillText(text[i], 0,  lineHeight*(i+1) - rect.height/2 - lineHeight/2);
                            }
                        }
                        ctx.restore();
                    }
                    else{
                        if (style.maxWidth){
                            ctx.fillText(text[i], x, y, style.maxWidth);
                        }
                        else{
                            ctx.fillText(text[i], x, y);
                        }
                    }
                    this.setCtxGlobalAlpha(ctx, "reset", style);
                    break;
                case 'stroke':
                    this.setCtxGlobalAlpha(ctx, "stroke", style);
                    if(style.textRotation && style.textRotation !== 0){
                        ctx.save();
                        ctx.translate(ox, oy);
                        ctx.rotate(style.textRotation*Math.PI/180);
                        if (style.textBaseline == 'top') {
                            if (style.maxWidth){
                                ctx.strokeText(text[i], 0, lineHeight*i, style.maxWidth);
                            }
                            else{
                                ctx.strokeText(text[i], 0, lineHeight*i);
                            }
                        }
                        else if (style.textBaseline == 'bottom') {
                            if (style.maxWidth){
                                ctx.strokeText(text[i], 0, lineHeight*(i+1) - rect.height, style.maxWidth);
                            }
                            else{
                                ctx.strokeText(text[i], 0, lineHeight*(i+1) - rect.height);
                            }
                        }
                        else {
                            if (style.maxWidth){
                                ctx.strokeText(text[i], 0,  lineHeight*(i+1) - rect.height/2 - lineHeight/2, style.maxWidth);
                            }
                            else{
                                ctx.strokeText(text[i], 0,  lineHeight*(i+1) - rect.height/2 - lineHeight/2);
                            }
                        }
                        ctx.restore();
                    }
                    else{
                        if (style.maxWidth){
                            ctx.strokeText(text[i], x, y, style.maxWidth);
                        }
                        else{
                            ctx.strokeText(text[i], x, y);
                        }
                    }
                    this.setCtxGlobalAlpha(ctx, "reset", style);
                    break;
                case 'both':
                    if(style.textRotation && style.textRotation !== 0){
                        ctx.save();
                        ctx.translate(ox, oy);
                        ctx.rotate(style.textRotation*Math.PI/180);
                        if (style.textBaseline == 'top') {
                            if (style.maxWidth){
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight*i, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight*i, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            }
                            else{
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight*i);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight*i);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            }
                        }
                        else if (style.textBaseline == 'bottom') {
                            if (style.maxWidth){
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight*(i+1) - rect.height, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight*(i+1) - rect.height, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            }
                            else{
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight*(i+1) - rect.height);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight*(i+1) - rect.height);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            }
                        }
                        else {
                            if (style.maxWidth){
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0,  lineHeight*(i+1) - rect.height/2 - lineHeight/2, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0,  lineHeight*(i+1) - rect.height/2 - lineHeight/2, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            }
                            else{
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0,  lineHeight*(i+1) - rect.height/2 - lineHeight/2);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0,  lineHeight*(i+1) - rect.height/2 - lineHeight/2);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            }
                        }
                        ctx.restore();
                    }
                    else{
                        if (style.maxWidth){
                            this.setCtxGlobalAlpha(ctx, "fill", style);
                            ctx.fillText(text[i], x, y, style.maxWidth);
                            this.setCtxGlobalAlpha(ctx, "reset", style);

                            this.setCtxGlobalAlpha(ctx, "stroke", style);
                            ctx.strokeText(text[i], x, y, style.maxWidth);
                            this.setCtxGlobalAlpha(ctx, "reset", style);
                        }
                        else{
                            this.setCtxGlobalAlpha(ctx, "fill", style);
                            ctx.fillText(text[i], x, y);
                            this.setCtxGlobalAlpha(ctx, "reset", style);

                            this.setCtxGlobalAlpha(ctx, "stroke", style);
                            ctx.strokeText(text[i], x, y);
                            this.setCtxGlobalAlpha(ctx, "reset", style);
                        }
                    }
                    break;
                default:
                    this.setCtxGlobalAlpha(ctx, "fill", style);
                    if(style.textRotation && style.textRotation !== 0){
                        ctx.save();
                        ctx.translate(ox, oy);
                        ctx.rotate(style.textRotation*Math.PI/180);
                        if (style.textBaseline == 'top') {
                            if (style.maxWidth){
                                ctx.fillText(text[i], 0, lineHeight*i, style.maxWidth);
                            }
                            else{
                                ctx.fillText(text[i], 0, lineHeight*i);
                            }
                        }
                        else if (style.textBaseline == 'bottom') {
                            if (style.maxWidth){
                                ctx.fillText(text[i], 0, lineHeight*(i+1) - rect.height, style.maxWidth);
                            }
                            else{
                                ctx.fillText(text[i], 0, lineHeight*(i+1) - rect.height);
                            }
                        }
                        else {
                            if (style.maxWidth){
                                ctx.fillText(text[i], 0,  lineHeight*(i+1) - rect.height/2 - lineHeight/2, style.maxWidth);
                            }
                            else{
                                ctx.fillText(text[i], 0,  lineHeight*(i+1) - rect.height/2 - lineHeight/2);
                            }
                        }
                        ctx.restore();
                    }
                    else{
                        if (style.maxWidth){
                            ctx.fillText(text[i], x, y, style.maxWidth);
                        }
                        else{
                            ctx.fillText(text[i], x, y);
                        }
                    }
                    this.setCtxGlobalAlpha(ctx, "reset", style);
            }
            y += lineHeight;
        }

        ctx.restore();
        return;
    },

    /**
     * Method: getRect
     * 返回文字包围盒矩形
     */
    getRect : function (style) {
        if (style.__rect) {
            return style.__rect;
        }

        var left, top, right, bottom
        var tbg = this.getTextBackground(style, true);
        for(var i = 0, len = tbg.length; i < len; i++){
            var poi = tbg[i];

            //用第一个点初始化
            if(i == 0){
                left = poi[0];
                right = poi[0];
                top = poi[1];
                bottom = poi[1];
            }
            else{
                if(poi[0] < left){
                    left = poi[0]
                }
                if(poi[0] > right){
                    right = poi[0]
                }
                if(poi[1] < top){
                    top = poi[1]
                }
                if(poi[1] > bottom){
                    bottom = poi[1]
                }
            }
        }

        style.__rect = {
            x : left,
            y : top,
            width : right - left,
            height : bottom - top
        };

        return style.__rect;
    },

    /**
     * Method: getRectNoRotation
     * 返回忽略旋转和maxWidth时文字包围盒矩形
     */
    getRectNoRotation: function (style) {

        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];
        var __OP = this.refOriginalPosition;

        var lineHeight = SuperMap.LevelRenderer.Util_area.getTextHeight('ZH', style.textFont);

        var width = SuperMap.LevelRenderer.Util_area.getTextWidth(style.text, style.textFont);
        var height = SuperMap.LevelRenderer.Util_area.getTextHeight(style.text, style.textFont);

        //处理文字位置，注：文本的绘制是由此 rect 决定
        var textX = style.x + __OP[0];                 // 默认start == left
        if (style.textAlign == 'end' || style.textAlign == 'right') {
            textX -= width;
        }
        else if (style.textAlign == 'center') {
            textX -= (width / 2);
        }

        var textY;
        if (style.textBaseline == 'top') {
            // textY = style.y;
            textY = style.y +  __OP[1];
        }
        else if (style.textBaseline == 'bottom') {
            textY = (style.y +  __OP[1]) - height;
        }
        else {
            // middle
            textY = (style.y +  __OP[1]) - height / 2;
        }

        var isWidthChangeByMaxWidth = false;
        var widthBeforeChangeByMaxWidth;

        //处理 maxWidth
        if(style.maxWidth){
            var maxWidth = parseInt(style.maxWidth);
            if(maxWidth < width) {
                widthBeforeChangeByMaxWidth = width;
                isWidthChangeByMaxWidth = true;
                width = maxWidth;
            }

            var textX = style.x + __OP[0];
            if (style.textAlign == 'end' || style.textAlign == 'right') {
                textX -= width;
            }
            else if (style.textAlign == 'center') {
                textX -= (width / 2);
            }
        }

        //处理斜体字
        if(style.textFont){
            var textFont = style.textFont;
            var textFontStr = textFont.toLowerCase()
            if(textFontStr.indexOf("italic") > -1){
                if(widthBeforeChangeByMaxWidth && isWidthChangeByMaxWidth === true){
                    width += (lineHeight/3)*(width/widthBeforeChangeByMaxWidth);
                }
                else{
                    width += lineHeight/3;
                }
            }
        }

        var rect = {
            x : textX,
            y : textY,
            width : width,
            height : height
        };

        return rect;
    },

    /**
     * Method: getTextBackground
     * 获取文本背景框范围
     *
     * Parameters:
     * style - {Object} 样式。
     * redo - {Boolean} 是否强制重新计算 textBackground。
     */
    getTextBackground : function (style, redo) {
        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];
        var __OP = this.refOriginalPosition;

        if ((!redo || redo === false) && style.__textBackground ) {
            return style.__textBackground;
        }

        //不旋转时矩形框
        var rect  = this.getRectNoRotation(style);

        //旋转中心点
        var ox = style.x + __OP[0];
        var oy = style.y + __OP[1];

        //背景框
        var  background = [];

        if(style.textRotation && style.textRotation !== 0){
            var textRotation = style.textRotation;
            var ltPoi = this.getRotatedLocation(rect.x, rect.y, ox, oy, textRotation);
            var rtPoi = this.getRotatedLocation(rect.x + rect.width, rect.y, ox, oy, textRotation);
            var rbPoi = this.getRotatedLocation(rect.x + rect.width, rect.y + rect.height, ox, oy, textRotation);
            var lbPoi = this.getRotatedLocation(rect.x, rect.y + rect.height, ox, oy, textRotation);

            background.push(ltPoi);
            background.push(rtPoi);
            background.push(rbPoi);
            background.push(lbPoi);
        }
        else{
            var ltPoi = [rect.x, rect.y];
            var rtPoi = [rect.x + rect.width, rect.y];
            var rbPoi = [rect.x + rect.width, rect.y + rect.height];
            var lbPoi = [rect.x, rect.y + rect.height];

            background.push(ltPoi);
            background.push(rtPoi);
            background.push(rbPoi);
            background.push(lbPoi);
        }

        style.__textBackground = background;

        return style.__textBackground;
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
     * angle - {Number} 旋转角度（度）。
     *
     * Returns:
     * {Array} 旋转后的坐标位置，长度为 2 的一维数组，数组第一个元素表示 x 坐标，第二个元素表示 y 坐标。
     */
    getRotatedLocation: function (x, y, rx, ry, angle) {
        var loc = new Array(), x0, y0;

        y = -y;
        ry = -ry;
        angle = -angle;//顺时针旋转
        x0 = (x - rx)*Math.cos((angle/180)*Math.PI) - (y - ry)*Math.sin((angle/180)*Math.PI) + rx;
        y0 = (x - rx)*Math.sin((angle/180)*Math.PI) + (y - ry)*Math.cos((angle/180)*Math.PI) + ry;

        loc[0] = x0;
        loc[1] = -y0;
        return loc;
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Shape.SmicText"
});