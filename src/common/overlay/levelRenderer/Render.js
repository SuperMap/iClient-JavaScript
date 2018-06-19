/**
 * @private
 * @class SuperMap.LevelRenderer.Render
 * @category Visualization Theme
 * @classdesc Render 接口类，对外可用的所有接口都在这里。内部使用非 get 接口统一返回 this 对象，支持链式调用。
 */
import {Util} from './Util';
import {Util as CommonUtil} from '../../commontypes/Util';
import {Storage} from './Storage';
import {Painter} from './Painter';
import {Handler} from './Handler';
import {Animation} from './Animation';
import {SUtil} from './SUtil';

export class Render {


    /**
     * @function SuperMap.LevelRenderer.Render.constructor
     * @description 构造函数。
     *
     * @param {string} id - 唯一标识。
     * @param {HTMLElement} dom - Dom 对象。
     */
    constructor(id, dom) {
        /**
         * @member {string} SuperMap.LevelRenderer.Render.prototype.id
         * @description 唯一标识。
         */
        this.id = id;

        /**
         * @member {SuperMap.LevelRenderer.Storage} SuperMap.LevelRenderer.Render.prototype.storage
         * @description 图形仓库对象。
         */
        this.storage = new Storage();

        /**
         * @member {SuperMap.LevelRenderer.Painter} SuperMap.LevelRenderer.Render.prototype.painter
         * @description 绘制器对象。
         *
         */
        this.painter = new Painter(dom, this.storage);

        /**
         * @member {SuperMap.LevelRenderer.Handler} SuperMap.LevelRenderer.Render.prototype.handler
         * @description 事件处理对象。
         *
         */
        this.handler = new Handler(dom, this.storage, this.painter);

        /**
         * @member {Array} SuperMap.LevelRenderer.Render.prototype.animatingElements
         * @description 动画控制数组。
         *
         */
        this.animatingElements = [];

        /**
         * @member {SuperMap.LevelRenderer.animation.Animation} SuperMap.LevelRenderer.Render.prototype.animation
         * @description 动画对象。
         *
         */
        this.animation = new Animation({
            stage: {
                update: Render.getFrameCallback(this)
            }
        });

        /**
         * @member {boolean} SuperMap.LevelRenderer.Render.prototype._needsRefreshNextFrame
         * @description 是否需要刷新下一帧。
         *
         */
        this._needsRefreshNextFrame = false;
        this.animation.start();
        this.CLASS_NAME = "SuperMap.LevelRenderer.Render";

    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.destory
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
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
     * @function SuperMap.LevelRenderer.Render.prototype.getId
     * @description 获取实例唯一标识。
     * @return {string} 实例唯一标识。
     */
    getId() {
        return this.id;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.addShape
     * @description 添加图形形状到根节点。
     *
     * @param {SuperMap.LevelRenderer.Shape} shape - 图形对象，可用属性全集，详见各 shape。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    addShape(shape) {
        this.storage.addRoot(shape);
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.addGroup
     * @description 添加组到根节点。
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
     * @param {SuperMap.LevelRenderer.Group} group - 组对象。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    addGroup(group) {
        this.storage.addRoot(group);
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.delShape
     * @description 从根节点删除图形形状。
     *
     * @param {string} shapeId - 图形对象唯一标识。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    delShape(shapeId) {
        this.storage.delRoot(shapeId);
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.delGroup
     * @description 从根节点删除组。
     *
     * @param {string} groupId - 组对象唯一标识。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    delGroup(groupId) {
        this.storage.delRoot(groupId);
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.modShape
     * @description 修改图形形状。
     *
     * @param {string} shapeId - 图形对象唯一标识。
     * @param {SuperMap.LevelRenderer.Shape} shape - 图形对象。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    modShape(shapeId, shape) {
        this.storage.mod(shapeId, shape);
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.modGroup
     * @description 修改组。
     *
     * @param {string} groupId - 组对象唯一标识。
     * @param {SuperMap.LevelRenderer.Group} group - 组对象。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    modGroup(groupId, group) {
        this.storage.mod(groupId, group);
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.modLayer
     * @description 修改指定 zlevel 的绘制配置项。
     *
     * @param {string} zLevel - 组对象唯一标识。
     * @param {Object} config - 配置对象。
     * @param {string} clearColor - 每次清空画布的颜色。默认值：0。
     * @param {noolean} motionBlur - 是否开启动态模糊。默认值：false。
     * @param {number}  lastFrameAlpha - 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显。默认值：0.7。
     * @param {Array.{number}} position - 层的平移。
     * @param {Array.{number}} rotation - 层的旋转。
     * @param {Array.{number}} scale - 层的缩放。
     * @param {boolean} zoomable - 层是否支持鼠标缩放操作。默认值：false。
     * @param {boolean} panable - 层是否支持鼠标平移操作。默认值：false。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    modLayer(zLevel, config) {
        this.painter.modLayer(zLevel, config);
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.addHoverShape
     * @description 添加额外高亮层显示，仅提供添加方法，每次刷新后高亮层图形均被清空。
     *
     * @param {SuperMap.LevelRenderer.Shape} shape - 图形对象。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    addHoverShape(shape) {
        this.storage.addHover(shape);
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.render
     * @description 渲染。
     *
     * @callback {Function} callback - 渲染结束后回调函数。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    render(callback) {
        this.painter.render(callback);
        this._needsRefreshNextFrame = false;
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.refresh
     * @description 视图更新。
     *
     * @callback {Function} callback - 视图更新后回调函数。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    refresh(callback) {
        this.painter.refresh(callback);
        this._needsRefreshNextFrame = false;
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.refreshNextFrame
     * @description 标记视图在浏览器下一帧需要绘制。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    refreshNextFrame() {
        this._needsRefreshNextFrame = true;
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.refreshHover
     * @description 绘制（视图更新）高亮层。
     * @callback {Function} callback - 视图更新后回调函数。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    refreshHover(callback) {
        this.painter.refreshHover(callback);
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.refreshShapes
     * @description 视图更新。
     *
     * @param {Array.<SuperMap.LevelRenderer.Shape>} shapeList - 需要更新的图形列表。
     * @callback {Function} callback - 视图更新后回调函数。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    refreshShapes(shapeList, callback) {
        this.painter.refreshShapes(shapeList, callback);
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.resize
     * @description 调整视图大小。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    resize() {
        this.painter.resize();
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.animate
     * @description 动画。
     *
     * (code)
     *     zr.animate(circle.id, 'style', false)
     *         .when(1000, {x: 10} )
     *         .done(function(){ // Animation done })
     *         .start()
     * (end)
     *
     * @param {Array{(SuperMap.LevelRenderer.Shape/SuperMap.LevelRenderer.Group)}} el - 动画对象。
     * @param {string} path - 需要添加动画的属性获取路径，可以通过 a.b.c 来获取深层的属性。若传入对象为<SuperMap.LevelRenderer.Group>,path需为空字符串。
     * @param {Function} loop - 动画是否循环。
     * @return {SuperMap.LevelRenderer.animation.Animator} Animator。
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
     * @function SuperMap.LevelRenderer.Render.prototype.clearAnimation
     * @description 停止所有动画。
     *
     */
    clearAnimation() {
        this.animation.clear();
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.getWidth
     * @description 获取视图宽度。
     * @return {number} 视图宽度。
     */
    getWidth() {
        return this.painter.getWidth();
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.getHeight
     * @description 获取视图高度。
     * @return {number} 视图高度。
     */
    getHeight() {
        return this.painter.getHeight();
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.toDataURL
     * @description 图像导出。
     *
     * @param {string} type - 类型。
     * @param {string} backgroundColor - 背景色，默认值："#FFFFFF"。
     * @param {string} args - 参数。
     * @return {string} 图片的 Base64 url。
     */
    toDataURL(type, backgroundColor, args) {
        return this.painter.toDataURL(type, backgroundColor, args);
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.shapeToImage
     * @description 将常规 shape 转成 image shape。
     *
     * @param {SuperMap.LevelRenderer.Shape} e - 图形。
     * @param {number} width - 宽度。
     * @param {number} height - 高度。
     * @return {Object} image shape。
     */
    shapeToImage(e, width, height) {
        var id = CommonUtil.createUniqueID("SuperMap.LevelRenderer.ToImage_");
        return this.painter.shapeToImage(id, e, width, height);
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.on
     * @description 事件绑定。
     *
     * @param {string} eventName - 事件名称。
     * @param {Function} eventHandler - 响应函数。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    on(eventName, eventHandler) {
        this.handler.on(eventName, eventHandler);
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.un
     * @description 事件解绑定，参数为空则解绑所有自定义事件。
     *
     * @param {string} eventName - 事件名称。
     * @param {Function} eventHandler - 响应函数。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    un(eventName, eventHandler) {
        this.handler.un(eventName, eventHandler);
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.trigger
     * @description  事件触发。
     *
     * @param {string} eventName - 事件名称，resize，hover，drag，etc。
     * @param {event} event - event dom事件对象。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    trigger(eventName, event) {
        this.handler.trigger(eventName, event);
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.clear
     * @description 清除当前 Render 下所有类图的数据和显示，clear 后 MVC 和已绑定事件均还存在在，Render 可用。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    clear() {
        this.storage.delRoot();
        this.painter.clear();
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.dispose
     * @description 释放当前 Render 实例（删除包括 dom，数据、显示和事件绑定），dispose后 Render 不可用。
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
     * @function SuperMap.LevelRenderer.Render.prototype.updateHoverShapes
     * @description 更新设置显示高亮图层。
     *
     * @param {Array.<SuperMap.LevelRenderer.Shape>} shapes - 图形数组。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    updateHoverShapes(shapes) {
        this.painter.updateHoverLayer(shapes);
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.getAllShapes
     * @description 获取所有图形。
     * @return {Array.<SuperMap.LevelRenderer.Shape>} 图形数组。
     */
    getAllShapes() {
        return this.storage._shapeList;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.clearAll
     * @description 清除高亮和图形图层。
     * @return {SuperMap.LevelRenderer.Render} this。
     */
    clearAll() {
        this.clear();
        this.painter.clearHover();
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Render.prototype.getHoverOne
     * @description 获取单个高亮图形，当前鼠标对应。
     * @return {SuperMap.LevelRenderer.Shape} 高亮图形。
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