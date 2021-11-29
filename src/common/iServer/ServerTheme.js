/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
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
 * @class ServerTheme
 * @deprecatedclass SuperMap.ServerTheme
 * @category  iServer Map Theme
 * @classdesc UGC 专题图图层类。
 * @extends {UGCSubLayer}
 * @param {Theme} theme - 专题图对象。
 * @param {LonLat} themeElementPosition - 专题图元素位置。
 * @usage
 */
export class ServerTheme extends UGCSubLayer {

    constructor(options) {
        options = options || {};
        super(options);

        /**
         * @member {Theme} ServerTheme.prototype.theme
         * @description 专题图对象。
         */
        this.theme = null;

        /**
         * @member {LonLat} ServerTheme.prototype.themeElementPosition
         * @description 专题图元素位置。
         */
        this.themeElementPosition = null;

        this.CLASS_NAME = "SuperMap.ServerTheme";

    }


    /**
     * @function ServerTheme.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }


    /**
     * @function ServerTheme.prototype.fromJson
     * @description 将服务端 JSON 对象转换成当前客户端对象
     * @param {Object} jsonObject - 要转换的 JSON 对象。
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
     * @function ServerTheme.prototype.toServerJSONObject
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

