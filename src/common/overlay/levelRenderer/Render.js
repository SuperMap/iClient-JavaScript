/**
 * @private
 * @class SuperMap.LevelRenderer.Render
 * @category Visualization Theme
 * Render 接口类，对外可用的所有接口都在这里。内部使用
 * 非 get 接口统一返回 this 对象，支持链式调用。
 *
 */
import {Util} from './Util';
import {Util as CommonUtil} from '../../commontypes/Util';
import {Storage} from './Storage';
import {Painter} from './Painter';
import {Handler} from './Handler';
import {Animation} from './Animation';
import {SUtil} from './SUtil';

export class Render {


    /*
     * Constructor: SuperMap.LevelRenderer.Render
     * 构造函数。
     *
     * Parameters:
     * id - {String} 唯一标识。
     * dom - {HTMLElement} Dom 对象。
     */
    constructor(id, dom) {
        /**
         * Property: id
         * {String}  唯一标识。
         *
         */
        this.id = id;

        /**
         * Property: storage
         * {<SuperMap.LevelRenderer.Storage>} 图形仓库对象。
         *
         */
        this.storage = new Storage();

        /**
         * Property: painter
         * {<SuperMap.LevelRenderer.Painter>} 绘制器对象。
         *
         */
        this.painter = new Painter(dom, this.storage);

        /**
         * Property: handler
         * {<SuperMap.LevelRenderer.Handler>} 事件处理对象。
         *
         */
        this.handler = new Handler(dom, this.storage, this.painter);

        /**
         * Property: animatingElements
         * {Array} 动画控制数组。
         *
         */
        this.animatingElements = [];

        /**
         * Property: animation
         * {<SuperMap.LevelRenderer.animation.Animation>} 动画对象。
         *
         */
        this.animation = new Animation({
            stage: {
                update: Render.getFrameCallback(this)
            }
        });

        /**
         * Property: _needsRefreshNextFrame
         * {Boolean} 是否需要刷新下一帧。
         *
         */
        this._needsRefreshNextFrame = false;
        this.animation.start();
        this.CLASS_NAME = "SuperMap.LevelRenderer.Render";

    }

    /**
     * Method: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.id = null;
        this.storage = null;
        this.painter = null;
        this.handler = null;
        this.animatingElements = null;
        this.animation = null;
        this._needsRefreshNextFrame = null;
    }

    /**
     * APIMethod: getId
     * 获取实例唯一标识。
     *
     * Returns:
     * {String} 实例唯一标识。
     */
    getId() {
        return this.id;
    }

    /**
     * APIMethod: addShape
     * 添加图形形状到根节点。
     *
     * Parameters:
     * shape - {<SuperMap.LevelRenderer.Shape>} 图形对象，可用属性全集，详见各 shape。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    addShape(shape) {
        this.storage.addRoot(shape);
        return this;
    }

    /**
     * APIMethod: addGroup
     * 添加组到根节点。
     *
     * (code)
     * //添加组到根节点例子
     * var render = new SuperMap.LevelRenderer.Render("Render",document.getElementById('lRendertest'));
     * render.clear();
     * var g = new SuperMap.LevelRenderer.Group();
     * g.addChild(new SuperMap.LevelRenderer.Shape.Circle({
     *     style: {
     *         x: 100,
     *         y: 100,
     *         r: 20,
     *         brushType: 'fill'
     *     }
     * }));
     * render.addGroup(g);
     * render.render();
     * (end)
     *
     * Parameters:
     * group - {<SuperMap.LevelRenderer.Group>} 组对象。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    addGroup(group) {
        this.storage.addRoot(group);
        return this;
    }

    /**
     * APIMethod: delShape
     * 从根节点删除图形形状。
     *
     * Parameters:
     * shapeId - {String} 图形对象唯一标识。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    delShape(shapeId) {
        this.storage.delRoot(shapeId);
        return this;
    }

    /**
     * APIMethod: delGroup
     * 从根节点删除组。
     *
     * Parameters:
     * groupId - {String} 组对象唯一标识。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    delGroup(groupId) {
        this.storage.delRoot(groupId);
        return this;
    }

    /**
     * Method: modShape
     * 修改图形形状。
     *
     * Parameters:
     * shapeId - {String} 图形对象唯一标识。
     * shape - {<SuperMap.LevelRenderer.Shape>} 图形对象。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    modShape(shapeId, shape) {
        this.storage.mod(shapeId, shape);
        return this;
    }

    /**
     * Method: modGroup
     * 修改组。
     *
     * Parameters:
     * groupId - {String} 组对象唯一标识。
     * group - {<SuperMap.LevelRenderer.Group>} 组对象。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    modGroup(groupId, group) {
        this.storage.mod(groupId, group);
        return this;
    }

    /**
     * Method: modLayer
     * 修改指定 zlevel 的绘制配置项。
     *
     * Parameters:
     * zLevel - {String} 组对象唯一标识。
     * config - {Object} 配置对象。可用属性如下：
     *
     * Symbolizer properties:
     * clearColor - {String} 每次清空画布的颜色。默认值：0。
     * motionBlur - {Boolean} 是否开启动态模糊。默认值：false。
     * lastFrameAlpha - {Number}  在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显。默认值：0.7。
     * position - {Array{Number}}  层的平移。
     * rotation - {Array{Number}}  层的旋转。
     * scale - {Array{Number}}  层的缩放。
     * zoomable - {Boolean} 层是否支持鼠标缩放操作。默认值：false。
     * panable - {Boolean} 层是否支持鼠标平移操作。默认值：false。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    modLayer(zLevel, config) {
        this.painter.modLayer(zLevel, config);
        return this;
    }

    /**
     * APIMethod: addHoverShape
     * 添加额外高亮层显示，仅提供添加方法，每次刷新后高亮层图形均被清空。
     *
     * Parameters:
     * shape - {<SuperMap.LevelRenderer.Shape>} 图形对象。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    addHoverShape(shape) {
        this.storage.addHover(shape);
        return this;
    }

    /**
     * APIMethod: render
     * 渲染。
     *
     * Parameters:
     * callback - {Function} 渲染结束后回调函数。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    render(callback) {
        this.painter.render(callback);
        this._needsRefreshNextFrame = false;
        return this;
    }

    /**
     * APIMethod: refresh
     * 视图更新。
     *
     * Parameters:
     * callback - {Function} 视图更新后回调函数。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    refresh(callback) {
        this.painter.refresh(callback);
        this._needsRefreshNextFrame = false;
        return this;
    }

    /**
     * APIMethod: refreshNextFrame
     * 标记视图在浏览器下一帧需要绘制。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    refreshNextFrame() {
        this._needsRefreshNextFrame = true;
        return this;
    }

    /**
     * APIMethod: refreshHover
     * 绘制（视图更新）高亮层。
     *
     * Parameters:
     * callback - {Function} 视图更新后回调函数。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    refreshHover(callback) {
        this.painter.refreshHover(callback);
        return this;
    }

    /**
     * APIMethod: refreshShapes
     * 视图更新。
     *
     * Parameters:
     * shapeList - {Array<SuperMap.LevelRenderer.Shape>} 需要更新的图形列表。
     * callback - {Function} 视图更新后回调函数。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    refreshShapes(shapeList, callback) {
        this.painter.refreshShapes(shapeList, callback);
        return this;
    }

    /**
     * APIMethod: resize
     * 调整视图大小。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    resize() {
        this.painter.resize();
        return this;
    }

    /**
     * APIMethod: animate
     * 动画。
     *
     * (code)
     *     zr.animate(circle.id, 'style', false)
     *         .when(1000, {x: 10} )
     *         .done(function(){ // Animation done })
     *         .start()
     * (end)
     *
     * Parameters:
     * el - {Array{<SuperMap.LevelRenderer.Shape>/<SuperMap.LevelRenderer.Group>}} 动画对象。
     * path - {String} 需要添加动画的属性获取路径，可以通过 a.b.c 来获取深层的属性。若传入对象为<SuperMap.LevelRenderer.Group>,path需为空字符串。
     * loop - {Function} 动画是否循环。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.animation.Animator>} Animator。
     */
    animate(el, path, loop) {
        if (typeof(el) === 'string') {
            el = this.storage.get(el);
        }
        if (el) {
            var target;
            if (path) {
                var pathSplitted = path.split('.');
                var prop = el;
                for (var i = 0, l = pathSplitted.length; i < l; i++) {
                    if (!prop) {
                        continue;
                    }
                    prop = prop[pathSplitted[i]];
                }
                if (prop) {
                    target = prop;
                }
            } else {
                target = el;
            }

            if (!target) {
                SUtil.Util_log(
                    'Property "'
                    + path
                    + '" is not existed in element '
                    + el.id
                );
                return;
            }

            var animatingElements = this.animatingElements;
            if (typeof el.__aniCount === 'undefined') {
                // 正在进行的动画记数
                el.__aniCount = 0;
            }
            if (el.__aniCount === 0) {
                animatingElements.push(el);
            }
            el.__aniCount++;

            return this.animation.animate(target, {loop: loop})
                .done(function () {
                    el.__aniCount--;
                    if (el.__aniCount === 0) {
                        // 从animatingElements里移除
                        var idx = new Util().indexOf(animatingElements, el);
                        animatingElements.splice(idx, 1);
                    }
                });
        } else {
            SUtil.Util_log('Element not existed');
        }
    }

    /**
     * APIMethod: clearAnimation
     * 停止所有动画。
     *
     */
    clearAnimation() {
        this.animation.clear();
    }

    /**
     * APIMethod: getWidth
     * 获取视图宽度。
     *
     * Returns:
     * {Number} 视图宽度。
     */
    getWidth() {
        return this.painter.getWidth();
    }

    /**
     * APIMethod: getHeight
     * 获取视图高度。
     *
     * Returns:
     * {Number} 视图高度。
     */
    getHeight() {
        return this.painter.getHeight();
    }

    /**
     * APIMethod: toDataURL
     * 图像导出。
     *
     * Parameters:
     * type - {string} 类型。
     * backgroundColor - {string} 背景色，默认值："#FFFFFF"。
     * args - {string} 参数。
     *
     * Returns:
     * {String} 图片的 Base64 url。
     */
    toDataURL(type, backgroundColor, args) {
        return this.painter.toDataURL(type, backgroundColor, args);
    }

    /**
     * APIMethod: shapeToImage
     * 将常规 shape 转成 image shape。
     *
     * Parameters:
     * e - {<SuperMap.LevelRenderer.Shape>} 图形。
     * width - {Number} 宽度。
     * height - {Number} 高度。
     *
     * Returns:
     * {Object} image shape。
     */
    shapeToImage(e, width, height) {
        var id = CommonUtil.createUniqueID("SuperMap.LevelRenderer.ToImage_");
        return this.painter.shapeToImage(id, e, width, height);
    }

    /**
     * APIMethod: on
     * 事件绑定。
     *
     * Parameters:
     * eventName - {String} 事件名称。
     * eventHandler - {Function} 响应函数。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    on(eventName, eventHandler) {
        this.handler.on(eventName, eventHandler);
        return this;
    }

    /**
     * APIMethod: un
     * 事件解绑定，参数为空则解绑所有自定义事件。
     *
     * Parameters:
     * eventName - {String} 事件名称。
     * eventHandler - {Function} 响应函数。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    un(eventName, eventHandler) {
        this.handler.un(eventName, eventHandler);
        return this;
    }

    /**
     * APIMethod: trigger
     * 事件触发。
     *
     * Parameters:
     * eventName - {String} 事件名称，resize，hover，drag，etc。
     * event - {event} event dom事件对象。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    trigger(eventName, event) {
        this.handler.trigger(eventName, event);
        return this;
    }

    /**
     * APIMethod: clear
     * 清除当前 Render 下所有类图的数据和显示，clear 后 MVC 和已绑定事件均还存在在，Render 可用。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    clear() {
        this.storage.delRoot();
        this.painter.clear();
        return this;
    }

    /**
     * APIMethod: dispose
     * 释放当前 Render 实例（删除包括 dom，数据、显示和事件绑定），dispose后 Render 不可用。
     *
     */
    dispose() {
        this.animation.stop();

        this.clear();
        this.storage.dispose();
        this.painter.dispose();
        this.handler.dispose();

        this.animation = null;
        this.animatingElements = null;
        this.storage = null;
        this.painter = null;
        this.handler = null;

        // 释放后告诉全局删除对自己的索引，没想到啥好方法
        // zrender.delInstance(this.id);

    }

    // SMIC-方法扩展 - start
    /**
     * APIMethod: updateHoverShapes
     * 更新设置显示高亮图层。
     *
     * Parameters:
     * shapes - {Array<SuperMap.LevelRenderer.Shape>} 图形数组。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    updateHoverShapes(shapes) {
        this.painter.updateHoverLayer(shapes);
        return this;
    }

    /**
     * APIMethod: getAllShapes
     * 获取所有图形。
     *
     * Returns:
     * {Array<SuperMap.LevelRenderer.Shape>} 图形数组。
     */
    getAllShapes() {
        return this.storage._shapeList;
    }

    /**
     * APIMethod: clearAll
     *  清除高亮和图形图层。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    clearAll() {
        this.clear();
        this.painter.clearHover();
        return this;
    }

    /**
     * APIMethod: getHoverOne
     * 获取单个高亮图形，当前鼠标对应。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Shape>} 高亮图形。
     */
    getHoverOne() {
        return this.handler.getLastHoverOne();
    }

    static getFrameCallback(renderInstance) {
        return function () {
            var animatingElements = renderInstance.animatingElements;

            //animatingElements instanceof Array 临时解决 destory 报错
            if (animatingElements instanceof Array) {
                for (var i = 0, l = animatingElements.length; i < l; i++) {
                    renderInstance.storage.mod(animatingElements[i].id);
                }

                if (animatingElements.length || renderInstance._needsRefreshNextFrame) {
                    renderInstance.refresh();
                }
            }
        };
    }

    // SMIC-方法扩展 - end


}