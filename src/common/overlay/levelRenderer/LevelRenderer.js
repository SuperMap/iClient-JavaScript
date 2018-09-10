/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from "../../SuperMap";
import {Util} from '../../commontypes/Util';
import {Render} from './Render';

/**
 * @class  SuperMap.LevelRenderer
 * @category Visualization Theme
 * @classdesc LevelRenderer 渲染器
 * @private 
 */
export class LevelRenderer {

    /**
     * @function SuperMap.LevelRenderer.constructor
     * @description 构造函数。
     * @example 
     * //在渲染器上加上图形
     * var levelRenderer = new SuperMap.LevelRenderer();
     * var zr = levelRenderer.init(document.getElementById('lRendertest'));
     * zr.clear();
     * zr.addShape(new SuperMap.LevelRenderer.Shape.Circle({
     *     style:{
     *         x : 100,
     *         y : 100,
     *         r : 50,
     *         brushType: 'fill'
     *     }
     * }));
     * zr.render();
     */
    constructor() {
        /**
         * @member {Object} SuperMap.LevelRenderer.prototype._instances
         * @description LevelRenderer 实例 map 索引
         */
        LevelRenderer._instances = {};

        // 工具
        LevelRenderer.Tool = {};

        /**
         * @member {string} SuperMap.LevelRenderer.prototype.version
         * @description 版本。zRender（Baidu）的版本号
         *              记录当前 LevelRenderer 是在 zRender 的那个版本上构建而来。
         *              在每次完整评判和实施由 zRender（Baidu）升级带来的 LevelRenderer 升级后修改。
         */
        this.version = '2.0.4';

        this.CLASS_NAME = "SuperMap.LevelRenderer";

    }

    /**
     * @function SuperMap.LevelRenderer.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为null。
     */
    destroy() {
        this.dispose();
        this.version = null;
    }

    /**
     * @function SuperMap.LevelRenderer.prototype.init
     * @description 创建 LevelRenderer 实例。
     * @param {HTMLElement} dom - 绘图容器。
     * @returns {SuperMap.LevelRenderer} LevelRenderer 实例。
     */
    init(dom) {
        var zr = new Render(Util.createUniqueID("LRenderer_"), dom);
        LevelRenderer._instances[zr.id] = zr;
        return zr;
    }

    /**
     * @function SuperMap.LevelRenderer.prototype.dispose
     * @description LevelRenderer 实例销毁。
     *              可以通过 zrender.dispose(zr) 销毁指定 SuperMap.LevelRenderer.Render 实例。
     *              也可以通过 zr.dispose() 直接销毁
     * @param {SuperMap.LevelRenderer.Render} zr - ZRender对象，不传此参数则销毁全部。
     * @returns {SuperMap.LevelRenderer} this。
     */
    dispose(zr) {
        if (zr) {
            zr.dispose();
            this.delInstance(zr.id);
        } else {
            for (var key in LevelRenderer._instances) {
                LevelRenderer._instances[key].dispose();
            }
            LevelRenderer._instances = {};
        }

        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.prototype.getInstance
     * @description 获取 SuperMap.LevelRenderer.Render 实例。
     * @param {string} id - ZRender对象索引。
     * @returns {SuperMap.LevelRenderer.Render} SuperMap.LevelRenderer.Render 实例。
     */
    getInstance(id) {
        return LevelRenderer._instances[id];
    }

    /**
     * @function SuperMap.LevelRenderer.prototype.delInstance
     * @description 删除 zrender 实例，SuperMap.LevelRenderer.Render 实例 dispose 时会调用，删除后 getInstance 则返回 undefined
     * @param {string} id - ZRender对象索引。
     * @param {string} id - SuperMap.LevelRenderer.Render 对象索引。
     * @returns {SuperMap.LevelRenderer} this。
     */
    delInstance(id) {
        delete LevelRenderer._instances[id];
        return this;
    }

}

SuperMap.LevelRenderer = LevelRenderer;