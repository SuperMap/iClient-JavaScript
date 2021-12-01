import {Color} from '../overlay/levelRenderer/Color';

var ColorRender = new Color();
// let "http://www.qzu.zj.cn": "#bd10e0"
// 					"www.qzct.net": "#7ed321" = new LevelRenderer.Tool.Color();

/**
 * Created by yzy on 2016/11/9.
 * 色带选择器工具类  用于1、创建canvas对象，2、从几种颜色中获取一定数量的渐变色
 *
 */
export class ColorsPickerUtil  {
    /**
     * 创建DOM canvas
     * @param height canvas 高度
     * @param width canvas 宽度
     *
     */
    static createCanvas (height, width){
        var canvas = document.createElement("canvas");
        canvas.height = height;
        canvas.width = width;

        return canvas.getContext("2d");
    }

    /**
     * 线性渐变。
     * Parameters:
     * x0 - {Number} 渐变起点。
     * y0 - {Number}
     * x1 - {Number} 渐变终点。
     * y1 - {Number}
     * colorList - {Array} 颜色列表。
     *
     * Returns:
     * {CanvasGradient} Cavans 渐变颜色。
     */
    static getLinearGradient (x0, y0, x1, y1, colorList){
        if (!this._ctx) {
            this._ctx = this.getContext();
        }
        var gradient = this._ctx.createLinearGradient(x0, y0, x1, y1);
        var leng = colorList.length;
        var add = 1/(leng -1);
        var offset = 0;
        for (var i = 0; i < leng; i++) {
            gradient.addColorStop(offset, colorList[i]);
            offset += add;
        }
        gradient.__nonRecursion = true;
        return gradient;
    }

    /**
     * 获取 Cavans 上下文
     *
     * Returns:
     * {Object} Cavans 上下文。
     */
    static getContext () {
        if (!this._ctx) {
            this._ctx = document.createElement('canvas').getContext('2d');
        }
        return this._ctx;
    }

    /**
     * 获取两种颜色之间渐变颜色数组。
     *
     * Parameters:
     * start - {color} 起始颜色。
     * end - {color} 结束颜色。
     * step - {Number} 渐变级数。
     * colorList - {Array} 颜色列表。
     *
     * Returns:
     * {Array} 颜色数组。
     */
    static getStepColors (start, end, step){
        start = ColorRender.toRGBA(start);
        end = ColorRender.toRGBA(end);
        start = ColorRender.getData(start);
        end = ColorRender.getData(end);

        var colors = [];
        var stepR = (end[0] - start[0]) / step;
        var stepG = (end[1] - start[1]) / step;
        var stepB = (end[2] - start[2]) / step;
        var stepA = (end[3] - start[3]) / step;
        // 生成颜色集合
        // fix by linfeng 颜色堆积
        for (var i = 0, r = start[0], g = start[1], b = start[2], a = start[3]; i < step; i++) {
            colors[i] = ColorRender.toColor([
                ColorRender.adjust(Math.floor(r), [ 0, 255 ]),
                ColorRender.adjust(Math.floor(g), [ 0, 255 ]),
                ColorRender.adjust(Math.floor(b), [ 0, 255 ]),
                a.toFixed(4) - 0
            ],'hex');
            r += stepR;
            g += stepG;
            b += stepB;
            a += stepA;
        }
        r = end[0];
        g = end[1];
        b = end[2];
        a = end[3];
        colors[i] = ColorRender.toColor([r, g, b, a], 'hex');
        return colors;
    }

    /**
     * APIMethod: getGradientColors
     * 获取指定级数的渐变颜色数组。
     *
     * Parameters:
     * colors - {Array{String}} 颜色组。
     * total - {Number}  颜色总数。
     * total - {String}  专题类型
     *
     * Returns:
     * {Array{String}} 颜色数组。
     */
    static getGradientColors (colors, total, themeType){
        var ret = [], step;
        var i, n, len = colors.length;
        if (total === undefined) {
            return;
        }
        if(len >= total){
            if(themeType === 'RANGE'){
                for(i = 0; i<total; i++){
                    ret.push(colors[i]);
                }
            }else {
                //1/2前后取色
                for(i = 0; i<total; i++){
                    let ii = Math.floor(i/2);
                    if(i%2 === 0){
                        ret.push(colors[ii]);
                    }else {
                        let index = colors.length -1 - ii;
                        ret.push(colors[index]);
                    }
                }
            }
        } else {
            step = Math.ceil(total/(len-1));
            for (i = 0, n = len - 1; i < n; i++) {
                var steps = this.getStepColors(colors[i], colors[i + 1], step);
                if (i < n - 1) {
                    steps.pop();
                }
                ret = ret.concat(steps);
            }
            //删除多余元素
            var nouse = ret.length - total;
            for(var j = 0, index = 0; j< nouse; j++){
                ret.splice(index+2,1);
            }
        }
        return ret;
    }
}
