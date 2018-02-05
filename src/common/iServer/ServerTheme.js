import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {LonLat} from '../commontypes/LonLat';
import {ThemeLabel} from './ThemeLabel';
import {ThemeUnique} from './ThemeUnique';
import {ThemeGraph} from './ThemeGraph';
import {ThemeDotDensity} from './ThemeDotDensity';
import {ThemeGraduatedSymbol} from './ThemeGraduatedSymbol';
import {ThemeRange} from './ThemeRange';
import {UGCSubLayer} from './UGCSubLayer';

/**
 * @class SuperMap.ServerTheme
 * @category  iServer Map Theme
 * @classdesc UGC 专题图图层类。
 * @extends SuperMap.UGCSubLayer
 * @param theme - {SuperMap.Theme} 专题图对象。
 * @param themeElementPosition - {SuperMap.LonLat} 专题图元素位置。
 */
export class ServerTheme extends UGCSubLayer {

    /*
     * @class SuperMap.ServerTheme
     * @description UGC 专题图图层类类构造函数。
     * @param theme - {SuperMap.Theme} 专题图对象。
     * @param themeElementPosition - {SuperMap.LonLat} 专题图元素位置。
     */
    constructor(options) {
        options = options || {};
        super(options);

        /**
         * @member SuperMap.ServerTheme.prototype.theme -{SuperMap.Theme}
         * @description 专题图对象。
         */
        this.theme = null;

        /**
         * @member SuperMap.ServerTheme.prototype.themeElementPosition -{SuperMap.LonLat}
         * @description 专题图元素位置。
         */
        this.themeElementPosition = null;

        this.CLASS_NAME = "SuperMap.ServerTheme";

    }


    /**
     * @function SuperMap.ServerTheme.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }


    /**
     * @function SuperMap.ServerTheme.prototype.fromJson
     * @description 将服务端JSON对象转换成当前客户端对象
     * @param jsonObject - {Object} 要转换的 JSON 对象。
     */
    fromJson(jsonObject) {
        super.fromJson(jsonObject);
        var themeObj = this.theme;
        var themeT = themeObj && themeObj.type;
        switch (themeT) {
            case 'LABEL':
                this.theme = ThemeLabel.fromObj(themeObj);
                break;
            case 'UNIQUE':
                this.theme = ThemeUnique.fromObj(themeObj);
                break;
            case 'GRAPH':
                this.theme = ThemeGraph.fromObj(themeObj);
                break;
            case 'DOTDENSITY':
                this.theme = ThemeDotDensity.fromObj(themeObj);
                break;
            case 'GRADUATEDSYMBOL':
                this.theme = ThemeGraduatedSymbol.fromObj(themeObj);
                break;
            case 'RANGE':
                this.theme = ThemeRange.fromObj(themeObj);
                break;
            default:
                break;
        }
        if (this.themeElementPosition) {
            //待测试
            this.themeElementPosition = new LonLat(this.themeElementPosition.x, this.themeElementPosition.y);
        }
    }

    /**
     * @function  SuperMap.ServerTheme.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        //普通属性直接赋值
        var jsonObject = super.toServerJSONObject();

        if (jsonObject.themeElementPosition) {
            if (jsonObject.themeElementPosition.toServerJSONObject) {
                jsonObject.themeElementPosition = jsonObject.themeElementPosition.toServerJSONObject();
            }
        }
        if (jsonObject.theme) {
            if (jsonObject.theme.toServerJSONObject) {
                jsonObject.theme = jsonObject.theme.toServerJSONObject();
            }
        }
        return jsonObject;
    }

}

SuperMap.ServerTheme = ServerTheme;
