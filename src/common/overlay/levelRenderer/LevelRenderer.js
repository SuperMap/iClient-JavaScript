import {SuperMap} from "../../SuperMap";
import {Util} from '../../commontypes/Util';
import {Render} from './Render';

/**
 * @private
 * @class  SuperMap.LevelRenderer
 * @category Visualization Theme
 * LevelRenderer 渲染器。
 *
 */
export class LevelRenderer {

    /**
     * Constructor: SuperMap.LevelRenderer
     * 构造函数。
     *
     * (code)
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
     * (end)
     */
    constructor() {
        /**
         * Property: _instances
         * {Object} LevelRenderer 实例 map 索引。
         */
        LevelRenderer._instances = {};

        // 工具
        LevelRenderer.Tool = {};

        /**
         * Property: version
         * {String} 版本。zRender（Baidu） 的版本号，
         * 记录当前 LevelRenderer 是在 zRender 的那个版本上构建而来。
         * 在每次完整评判和实施由 zRender（Baidu）升级带来的 LevelRenderer 升级后修改。
         *
         */
        this.version = '2.0.4';

        this.CLASS_NAME = "SuperMap.LevelRenderer";

    }

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.dispose();
        this.version = null;
    }

    /**
     * APIMethod: init
     * 创建 LevelRenderer 实例。
     *
     * 不让外部直接 new LevelRenderer 实例，为啥？。
     * 不为啥，提供全局可控同时减少全局污染和降低命名冲突的风险！
     *
     * Parameters:
     * dom - {HTMLElement} 绘图容器。
     *
     * Returns:
     * {<SuperMap.LevelRenderer>} LevelRenderer 实例。
     */
    init(dom) {
        var zr = new Render(Util.createUniqueID("LRenderer_"), dom);
        LevelRenderer._instances[zr.id] = zr;
        return zr;
    }

    /**
     * APIMethod: dispose
     * LevelRenderer 实例销毁。
     *
     * 在 SuperMap.LevelRenderer._instances 里的索引也会删除了。
     * 管生就得管死，可以通过 zrender.dispose(zr) 销毁指定 SuperMap.LevelRenderer.Render 实例。
     * 当然也可以直接 zr.dispose() 自己销毁
     *
     * Parameters:
     * zr - {<SuperMap.LevelRenderer.Render>} ZRender对象，不传则销毁全部。
     *
     * Returns:
     * {<SuperMap.LevelRenderer>} this。
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
     * APIMethod: getInstance
     * 获取 SuperMap.LevelRenderer.Render 实例。
     *
     * Parameters:
     * id - {String} ZRender对象索引。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} SuperMap.LevelRenderer.Render 实例。
     */
    getInstance(id) {
        return LevelRenderer._instances[id];
    }

    /**
     * APIMethod: delInstance
     * 删除 zrender 实例，SuperMap.LevelRenderer.Render 实例 dispose 时会调用，
     * 删除后 getInstance 则返回 undefined
     * ps: 仅是删除，删除的实例不代表已经 dispose 了~~
     *     这是一个摆脱全局 zrender.dispose() 自动销毁的后门，
     *     take care of yourself~
     *
     *
     * Parameters:
     * id - {String} SuperMap.LevelRenderer.Render 对象索引。
     *
     * Returns:
     * {<SuperMap.LevelRenderer>} this。
     */
    delInstance(id) {
        delete LevelRenderer._instances[id];
        return this;
    }

}

SuperMap.LevelRenderer = LevelRenderer;