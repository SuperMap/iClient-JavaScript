/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/
/*!
 * ZRender, a high performance canvas library.
 *
 * Copyright (c) 2013, Baidu Inc.
 * All rights reserved.
 *
 * LICENSE
 * https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
 */

/**
 * Class: SuperMap.LevelRenderer
 * LevelRenderer 渲染器。
 *
 */
SuperMap.LevelRenderer = SuperMap.Class({

    /**
     * Property: version
     * {String} 版本。zRender（Baidu） 的版本号，
     * 记录当前 LevelRenderer 是在 zRender 的那个版本上构建而来。
     * 在每次完整评判和实施由 zRender（Baidu）升级带来的 LevelRenderer 升级后修改。
     *
     */
    version: '2.0.4',

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
    initialize: function() {

    },

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy: function() {
        this.dispose();
        this.version = null;
    },

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
    init: function(dom){
        var zr = new SuperMap.LevelRenderer.Render(SuperMap.Util.createUniqueID("LRenderer_"), dom);
        SuperMap.LevelRenderer._instances[zr.id] = zr;
        return zr;
    },

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
    dispose: function(zr){
        if (zr) {
            zr.dispose();
        }
        else {
            for (var key in SuperMap.LevelRenderer._instances) {
                SuperMap.LevelRenderer._instances[key].dispose();
            }
            SuperMap.LevelRenderer._instances = {};
        }

        return this;
    },

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
    getInstance: function(id){
        return SuperMap.LevelRenderer._instances[id];
    },

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
    delInstance: function(id){
        delete SuperMap.LevelRenderer._instances[id];
        return this;
    },

    CLASS_NAME: "SuperMap.LevelRenderer"
});

/**
 * Property: _instances
 * {Object} LevelRenderer 实例 map 索引。
 */
SuperMap.LevelRenderer._instances = {};

/**
 * Class: SuperMap.LevelRenderer.Render
 * Render 接口类，对外可用的所有接口都在这里。
 * 非 get 接口统一返回 this 对象，支持链式调用。
 *
 */
SuperMap.LevelRenderer.Render = SuperMap.Class({

    /**
     * Property: id
     * {String}  唯一标识。
     *
     */
    id: null,

    /**
     * Property: storage
     * {<SuperMap.LevelRenderer.Storage>} 图形仓库对象。
     *
     */
    storage: null,

    /**
     * Property: painter
     * {<SuperMap.LevelRenderer.Painter>} 绘制器对象。
     *
     */
    painter: null,

    /**
     * Property: handler
     * {<SuperMap.LevelRenderer.Handler>} 事件处理对象。
     *
     */
    handler: null,

    /**
     * Property: animatingElements
     * {Array} 动画控制数组。
     *
     */
    animatingElements: null,

    /**
     * Property: animation
     * {<SuperMap.LevelRenderer.animation.Animation>} 动画对象。
     *
     */
    animation: null,

    /**
     * Property: _needsRefreshNextFrame
     * {Boolean} 是否需要刷新下一帧。
     *
     */
    _needsRefreshNextFrame: null,

    /**
     * Constructor: SuperMap.LevelRenderer.Render
     * 构造函数。
     *
     * Parameters:
     * id - {String} 唯一标识。
     * dom - {HTMLElement} Dom 对象。
     */
    initialize: function(id, dom) {
        this.id = id;

        this.storage = new SuperMap.LevelRenderer.Storage();
        this.painter = new SuperMap.LevelRenderer.Painter(dom, this.storage);
        this.handler = new SuperMap.LevelRenderer.Handler(dom, this.storage, this.painter);

        this.animatingElements = [];

        this.animation = new SuperMap.LevelRenderer.Animation({
            stage: {
                update: SuperMap.LevelRenderer.Render.getFrameCallback(this)
            }
        });
        this.animation.start();

        this._needsRefreshNextFrame = false;
    },

    /**
     * Method: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy: function() {
        this.id = null;
        this.storage = null;
        this.painter = null;
        this.handler = null;
        this.animatingElements = null;
        this.animation = null;
        this._needsRefreshNextFrame = null;
    },

    /**
     * APIMethod: getId
     * 获取实例唯一标识。
     *
     * Returns:
     * {String} 实例唯一标识。
     */
    getId: function(){
        return this.id;
    },

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
    addShape: function(shape){
        this.storage.addRoot(shape);
        return this;
    },

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
    addGroup: function(group){
        this.storage.addRoot(group);
        return this;
    },

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
    delShape: function(shapeId){
        this.storage.delRoot(shapeId);
        return this;
    },

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
    delGroup: function(groupId){
        this.storage.delRoot(groupId);
        return this;
    },

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
    modShape: function(shapeId, shape){
        this.storage.mod(shapeId, shape);
        return this;
    },

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
    modGroup: function(groupId, group){
        this.storage.mod(groupId, group);
        return this;
    },

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
    modLayer: function(zLevel, config){
        this.painter.modLayer(zLevel, config);
        return this;
    },

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
    addHoverShape: function(shape){
        this.storage.addHover(shape);
        return this;
    },

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
    render: function(callback){
        this.painter.render(callback);
        this._needsRefreshNextFrame = false;
        return this;
    },

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
    refresh: function(callback){
        this.painter.refresh(callback);
        this._needsRefreshNextFrame = false;
        return this;
    },

    /**
     * APIMethod: refreshNextFrame
     * 标记视图在浏览器下一帧需要绘制。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    refreshNextFrame: function(){
        this._needsRefreshNextFrame = true;
        return this;
    },

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
    refreshHover: function(callback){
        this.painter.refreshHover(callback);
        return this;
    },

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
    refreshShapes: function(shapeList, callback){
        this.painter.refreshShapes(shapeList, callback);
        return this;
    },

    /**
     * APIMethod: resize
     * 调整视图大小。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    resize: function(){
        this.painter.resize();
        return this;
    },

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
    animate: function(el, path, loop){
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
            }
            else {
                target = el;
            }

            if (!target) {
                SuperMap.LevelRenderer.Util_log(
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

            return this.animation.animate(target, { loop: loop })
                .done(function () {
                    el.__aniCount--;
                    if (el.__aniCount === 0) {
                        // 从animatingElements里移除
                        var idx = SuperMap.LevelRenderer.Util.indexOf(animatingElements, el);
                        animatingElements.splice(idx, 1);
                    }
                });
        }
        else {
            SuperMap.LevelRenderer.Util_log('Element not existed');
        }
    },

    /**
     * APIMethod: clearAnimation
     * 停止所有动画。
     *
     */
    clearAnimation: function(){
        this.animation.clear();
    },

    /**
     * APIMethod: getWidth
     * 获取视图宽度。
     *
     * Returns:
     * {Number} 视图宽度。
     */
    getWidth: function(){
        return this.painter.getWidth();
    },

    /**
     * APIMethod: getHeight
     * 获取视图高度。
     *
     * Returns:
     * {Number} 视图高度。
     */
    getHeight: function(){
        return this.painter.getHeight();
    },

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
    toDataURL: function(type, backgroundColor, args){
        return this.painter.toDataURL(type, backgroundColor, args);
    },

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
    shapeToImage: function(e, width, height){
        var id = SuperMap.Util.createUniqueID("SuperMap.LevelRenderer.ToImage_");
        return this.painter.shapeToImage(id, e, width, height);
    },

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
    on: function(eventName, eventHandler){
        this.handler.on(eventName, eventHandler);
        return this;
    },

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
    un: function(eventName, eventHandler){
        this.handler.un(eventName, eventHandler);
        return this;
    },

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
    trigger: function(eventName, event){
        this.handler.trigger(eventName, event);
        return this;
    },

    /**
     * APIMethod: clear
     * 清除当前 Render 下所有类图的数据和显示，clear 后 MVC 和已绑定事件均还存在在，Render 可用。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    clear: function(){
        this.storage.delRoot();
        this.painter.clear();
        return this;
    },

    /**
     * APIMethod: dispose
     * 释放当前 Render 实例（删除包括 dom，数据、显示和事件绑定），dispose后 Render 不可用。
     *
     */
    dispose: function(){
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
        SuperMap.LevelRenderer.prototype.delInstance.apply(this, [this.id]);
    },

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
    updateHoverShapes: function(shapes){
        this.painter.updateHoverLayer(shapes);
        return this;
    },

    /**
     * APIMethod: getAllShapes
     * 获取所有图形。
     *
     * Returns:
     * {Array<SuperMap.LevelRenderer.Shape>} 图形数组。
     */
    getAllShapes: function(){
        return this.storage._shapeList;
    },

    /**
     * APIMethod: clearAll
     *  清除高亮和图形图层。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    clearAll: function(){
        this.clear();
        this.painter.clearHover();
        return this;
    },

    /**
     * APIMethod: getHoverOne
     * 获取单个高亮图形，当前鼠标对应。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Shape>} 高亮图形。
     */
    getHoverOne: function(){
        return this.handler.getLastHoverOne();
    },
    // SMIC-方法扩展 - end

    CLASS_NAME: "SuperMap.LevelRenderer.Render"
});

SuperMap.LevelRenderer.Render.getFrameCallback = function(renderInstance){
    return function() {
        var animatingElements = renderInstance.animatingElements;

        //animatingElements instanceof Array 临时解决 destory 报错
        if(animatingElements instanceof Array){
            for(var i = 0, l = animatingElements.length; i < l; i++) {
                renderInstance.storage.mod(animatingElements[i].id);
            }

            if(animatingElements.length || renderInstance._needsRefreshNextFrame) {
                renderInstance.refresh();
            }
        }
    };
};

// 工具
SuperMap.LevelRenderer.Tool = {};
