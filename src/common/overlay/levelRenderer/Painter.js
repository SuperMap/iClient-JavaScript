import {Transformable} from './Transformable';
import {SmicImage} from './SmicImage';
import {Util as CommonUtil} from '../../commontypes/Util';
import {Util} from './Util';
import {Config} from './Config';
import {SUtil} from './SUtil';

/**
 * @private
 * @class  SuperMap.LevelRenderer.Painter
 * @category Visualization Theme
 * Painter 绘图模块。
 */
export class Painter {

    /**
     * Constructor: SuperMap.LevelRenderer.Painter
     * 构造函数。
     *
     * Parameters:
     * root - {HTMLElement} 绘图区域（DIV）。
     * storage - {<SuperMap.LevelRenderer.Storage>} Storage 实例。
     *
     */
    constructor(root, storage) {
        /**
         * APIProperty: root
         * {HTMLElement} 绘图容器。
         *
         */
        this.root = root;

        /**
         * APIProperty: storage
         * {Array} 图形仓库。
         *
         */
        this.storage = storage;

        /**
         * Property: _domRoot
         * {HTMLElement} 容器根 dom 对象。
         *
         */
        this._domRoot = null;

        /**
         * Property: _layers
         * {Object} 绘制层对象。
         *
         */
        this._layers = {};

        /**
         * Property: _zlevelList
         * {Array} 层列表。
         *
         */
        this._zlevelList = [];

        /**
         * Property: _layerConfig
         * {Object} 绘制层配置对象。
         *
         */
        this._layerConfig = {};

        /**
         * Property: _bgDom
         * {Object} 背景层 Canvas （Dom）。
         *
         */
        this._bgDom = null;

        /**
         * Property: shapeToImage
         * {Function} 形状转图像函数。
         *
         */
        this.shapeToImage = null;
        // retina 屏幕优化
        Painter.devicePixelRatio = Math.max((window.devicePixelRatio || 1), 1);

        this.CLASS_NAME = "SuperMap.LevelRenderer.Painter";
        this.root.innerHTML = '';
        this._width = this._getWidth(); // 宽，缓存记录
        this._height = this._getHeight(); // 高，缓存记录

        var domRoot = document.createElement('div');
        this._domRoot = domRoot;

        // domRoot.onselectstart = returnFalse; // 避免页面选中的尴尬
        domRoot.style.position = 'relative';
        domRoot.style.overflow = 'hidden';
        domRoot.style.width = this._width + 'px';
        domRoot.style.height = this._height + 'px';
        this.root.appendChild(domRoot);

        this.shapeToImage = this._createShapeToImageProcessor();

        // 创建各层canvas
        // 背景
        //this._bgDom = Painter.createDom('bg', 'div', this);
        this._bgDom = Painter.createDom(CommonUtil.createUniqueID("SuperMap.Theme_background_"), 'div', this);
        domRoot.appendChild(this._bgDom);
        this._bgDom.onselectstart = returnFalse;
        this._bgDom.style['-webkit-user-select'] = 'none';
        this._bgDom.style['user-select'] = 'none';
        this._bgDom.style['-webkit-touch-callout'] = 'none';

        // 高亮
        //var hoverLayer = new PaintLayer('_hoverLayer_', this);
        var hoverLayer = new PaintLayer(CommonUtil.createUniqueID("_highLightLayer_"), this);
        this._layers['hover'] = hoverLayer;
        domRoot.appendChild(hoverLayer.dom);
        hoverLayer.initContext();

        hoverLayer.dom.onselectstart = returnFalse;
        hoverLayer.dom.style['-webkit-user-select'] = 'none';
        hoverLayer.dom.style['user-select'] = 'none';
        hoverLayer.dom.style['-webkit-touch-callout'] = 'none';

        var me = this;
        this.updatePainter = function (shapeList, callback) {
            me.refreshShapes(shapeList, callback);
        };

        // 返回false的方法，用于避免页面被选中
        function returnFalse() {
            return false;
        }

        /* eslint-disable */
        // 什么都不干的空方法
        function doNothing() {  //NOSONAR
        }
        /* eslint-enable */
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.dispose();
        this._zlevelList = null;
        this._layerConfig = null;
        this._bgDom = null;
        this.shapeToImage = null;
    }


    /**
     * APIMethod: render
     * 渲染。
     *
     * 首次绘图，创建各种 dom 和 context。
     *
     * Parameters:
     * callback - {Function} 绘画结束后的回调函数。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Painter>} this。
     */
    render(callback) {
        // TODO
        this.refresh(callback, true);

        return this;
    }


    /**
     * APIMethod: refresh
     * 刷新。
     *
     * Parameters:
     * callback - {Function} 刷新结束后的回调函数。
     * paintAll - {Boolean} 强制绘制所有 shape。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Painter>} this。
     */
    refresh(callback, paintAll) {
        var list = this.storage.getShapeList(true);
        this._paintList(list, paintAll);

        if (typeof callback == 'function') {
            callback();
        }

        return this;
    }


    /**
     * Method: _paintList
     * 按列表绘制图形。
     */
    _paintList(list, paintAll) {
        if (typeof(paintAll) == 'undefined') {
            paintAll = false;
        }

        this._updateLayerStatus(list);

        var currentLayer;
        var currentZLevel;
        var ctx;

        for (var id in this._layers) {
            if (id !== 'hover') {
                this._layers[id].unusedCount++;
                this._layers[id].updateTransform();
            }
        }

        var invTransform = [];

        for (var i = 0, l = list.length; i < l; i++) {
            var shape = list[i];

            if (currentZLevel !== shape.zlevel) {
                if (currentLayer && currentLayer.needTransform) {
                    ctx.restore();
                }

                currentLayer = this.getLayer(shape.zlevel);
                ctx = currentLayer.ctx;
                currentZLevel = shape.zlevel;

                // Reset the count
                currentLayer.unusedCount = 0;

                if (currentLayer.dirty || paintAll) {
                    currentLayer.clear();
                }

                if (currentLayer.needTransform) {
                    ctx.save();
                    currentLayer.setTransform(ctx);
                }
            }

            // Start group clipping
            if (ctx && shape.__startClip) {
                var clipShape = shape.__startClip;
                ctx.save();
                // Set transform
                if (clipShape.needTransform) {
                    let m = clipShape.transform;
                    SUtil.Util_matrix.invert(invTransform, m);
                    ctx.transform(
                        m[0], m[1],
                        m[2], m[3],
                        m[4], m[5]
                    );
                }

                ctx.beginPath();
                clipShape.buildPath(ctx, clipShape.style);
                ctx.clip();

                // Transform back
                if (clipShape.needTransform) {
                    let m = invTransform;
                    ctx.transform(
                        m[0], m[1],
                        m[2], m[3],
                        m[4], m[5]
                    );
                }
            }

            if (((currentLayer && currentLayer.dirty) || paintAll) && !shape.invisible) {
                if (
                    !shape.onbrush
                    || (shape.onbrush && !shape.onbrush(ctx, false))
                ) {
                    if (Config.catchBrushException) {
                        try {
                            shape.brush(ctx, false, this.updatePainter);
                        } catch (error) {
                            SUtil.Util_log(
                                error,
                                'brush error of ' + shape.type,
                                shape
                            );
                        }
                    } else {
                        shape.brush(ctx, false, this.updatePainter);
                    }
                }
            }

            // Stop group clipping
            if (ctx && shape.__stopClip) {
                ctx.restore();
            }

            shape.__dirty = false;
        }

        if (ctx && currentLayer && currentLayer.needTransform) {
            ctx.restore();
        }

        for (let id in this._layers) {
            if (id !== 'hover') {
                var layer = this._layers[id];
                layer.dirty = false;
                // 删除过期的层
                // PENDING
                // if (layer.unusedCount >= 500) {
                //     this.delLayer(id);
                // }
                if (layer.unusedCount == 1) {
                    layer.clear();
                }
            }
        }

    }


    /**
     * APIMethod: getLayer
     * 获取 zlevel 所在层，如果不存在则会创建一个新的层。
     *
     * Parameters:
     * zlevel - {Number} zlevel。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Painter>} this。
     */
    getLayer(zlevel) {
        // Change draw layer
        var currentLayer = this._layers[zlevel];
        if (!currentLayer) {
            var len = this._zlevelList.length;
            var prevLayer = null;
            var i = -1;
            if (len > 0 && zlevel > this._zlevelList[0]) {
                for (i = 0; i < len - 1; i++) {
                    if (
                        this._zlevelList[i] < zlevel
                        && this._zlevelList[i + 1] > zlevel
                    ) {
                        break;
                    }
                }
                prevLayer = this._layers[this._zlevelList[i]];
            }
            this._zlevelList.splice(i + 1, 0, zlevel);

            // Create a new layer
            //currentLayer = new PaintLayer(zlevel, this);
            currentLayer = new PaintLayer(CommonUtil.createUniqueID("_levelLayer_" + zlevel), this);
            var prevDom = prevLayer ? prevLayer.dom : this._bgDom;
            if (prevDom.nextSibling) {
                prevDom.parentNode.insertBefore(
                    currentLayer.dom,
                    prevDom.nextSibling
                );
            } else {
                prevDom.parentNode.appendChild(
                    currentLayer.dom
                );
            }
            currentLayer.initContext();

            this._layers[zlevel] = currentLayer;

            if (this._layerConfig[zlevel]) {
                new Util().merge(currentLayer, this._layerConfig[zlevel], true);
            }

            currentLayer.updateTransform();
        }

        return currentLayer;
    }


    /**
     * Method: getLayers
     * 获取所有已创建的层。
     *
     * Returns:
     * {Array{<Painter.Layer>}} 已创建的层
     */
    getLayers() {
        return this._layers;
    }


    /**
     * Method: _updateLayerStatus
     * 更新绘制层状态。
     */
    _updateLayerStatus(list) {
        var layers = this._layers;

        var elCounts = {};
        for (let z in layers) {
            if (z !== 'hover') {
                elCounts[z] = layers[z].elCount;
                layers[z].elCount = 0;
            }
        }

        for (let i = 0; i < list.length; i++) {
            var shape = list[i];
            var zlevel = shape.zlevel;
            var layer = layers[zlevel];
            if (layer) {
                layer.elCount++;
                // 已经被标记为需要刷新
                if (layer.dirty) {
                    continue;
                }
                layer.dirty = shape.__dirty;
            }
        }

        // 层中的元素数量有发生变化
        for (let z in layers) {
            if (z !== 'hover') {
                if (elCounts[z] !== layers[z].elCount) {
                    layers[z].dirty = true;
                }
            }
        }
    }


    /**
     * APIMethod: refreshShapes
     * 更新的图形元素列表。
     *
     * Parameters:
     * shapeList - {Number} 需要更新的图形元素列表。
     * callback - {Number} 视图更新后回调函数。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Painter>} this。
     */
    refreshShapes(shapeList, callback) {
        for (var i = 0, l = shapeList.length; i < l; i++) {
            var shape = shapeList[i];
            this.storage.mod(shape.id);
        }

        this.refresh(callback);
        return this;
    }


    /**
     * APIMethod: clear
     * 清除 hover 层外所有内容。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Painter>} this。
     */
    clear() {
        for (var k in this._layers) {
            if (k == 'hover') {
                continue;
            }
            this._layers[k].clear();
        }

        return this;
    }


    /**
     * APIMethod: modLayer
     * 修改指定 zlevel 的绘制参数。
     *
     * Parameters:
     * zlevel - {String} zlevel。
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
     */
    modLayer(zlevel, config) {
        if (config) {
            if (!this._layerConfig[zlevel]) {
                this._layerConfig[zlevel] = config;
            } else {
                new Util().merge(this._layerConfig[zlevel], config, true);
            }

            var layer = this._layers[zlevel];

            if (layer) {
                new Util().merge(layer, this._layerConfig[zlevel], true);
            }
        }
    }


    /**
     * APIMethod: delLayer
     * 删除指定层。
     *
     * Parameters:
     * zlevel - {Ntring} 层所在的 zlevel。
     *
     */
    delLayer(zlevel) {
        var layer = this._layers[zlevel];
        if (!layer) {
            return;
        }
        // Save config
        this.modLayer(zlevel, {
            position: layer.position,
            rotation: layer.rotation,
            scale: layer.scale
        });
        layer.dom.parentNode.removeChild(layer.dom);
        delete this._layers[zlevel];

        this._zlevelList.splice(new Util().indexOf(this._zlevelList, zlevel), 1);
    }


    /**
     * APIMethod: refreshHover
     * 刷新 hover 层。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Painter>} this。
     */
    refreshHover() {
        this.clearHover();
        var list = this.storage.getHoverShapes(true);
        for (var i = 0, l = list.length; i < l; i++) {
            this._brushHover(list[i]);
        }
        this.storage.delHover();

        return this;
    }


    /**
     * APIMethod: clearHover
     * 清除 hover 层所有内容。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Painter>} this。
     */
    clearHover() {
        var hover = this._layers.hover;
        hover && hover.clear();

        return this;
    }


    /**
     * APIMethod: resize
     * 区域大小变化后重绘。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Painter>} this。
     */
    resize() {
        var domRoot = this._domRoot;
        domRoot.style.display = 'none';

        var width = this._getWidth();
        var height = this._getHeight();

        domRoot.style.display = '';

        // 优化没有实际改变的resize
        if (this._width != width || height != this._height) {
            this._width = width;
            this._height = height;

            domRoot.style.width = width + 'px';
            domRoot.style.height = height + 'px';

            for (var id in this._layers) {

                this._layers[id].resize(width, height);
            }

            this.refresh(null, true);
        }

        return this;
    }


    /**
     * APIMethod: clearLayer
     * 清除指定的一个层。
     *
     * Parameters:
     * zLevel - {Number} 层。
     */
    clearLayer(zLevel) {
        var layer = this._layers[zLevel];
        if (layer) {
            layer.clear();
        }
    }


    /**
     * APIMethod: dispose
     * 释放。
     *
     */
    dispose() {
        this.root.innerHTML = '';

        this.root = null;
        this.storage = null;
        this._domRoot = null;
        this._layers = null;
    }


    /**
     * Method: getDomHover
     * 获取 Hover 层的 Dom。
     *
     */
    getDomHover() {
        return this._layers.hover.dom;
    }


    /**
     * APIMethod: toDataURL
     * 图像导出。
     *
     * Parameters:
     * type - {String} 图片类型。
     * backgroundColor - {String} 背景色。默认值：'#fff'。
     * args - {Object}。
     *
     * Returns:
     * {String} 图片的Base64 url。
     */
    toDataURL(type, backgroundColor, args) {
        //var imageDom = Painter.createDom('image', 'canvas', this);
        var imageDom = Painter.createDom(CommonUtil.createUniqueID("SuperMap.Theme.image_"), 'canvas', this);
        this._bgDom.appendChild(imageDom);
        var ctx = imageDom.getContext('2d');
        Painter.devicePixelRatio != 1
        && ctx.scale(Painter.devicePixelRatio, Painter.devicePixelRatio);

        ctx.fillStyle = backgroundColor || '#fff';
        ctx.rect(
            0, 0,
            this._width * Painter.devicePixelRatio,
            this._height * Painter.devicePixelRatio
        );
        ctx.fill();

        var self = this;
        // 升序遍历，shape上的zlevel指定绘画图层的z轴层叠

        this.storage.iterShape(
            function (shape) {
                if (!shape.invisible) {
                    if (!shape.onbrush // 没有onbrush
                        // 有onbrush并且调用执行返回false或undefined则继续粉刷
                        || (shape.onbrush && !shape.onbrush(ctx, false))
                    ) {
                        if (Config.catchBrushException) {
                            try {
                                shape.brush(ctx, false, self.updatePainter);
                            } catch (error) {
                                SUtil.Util_log(
                                    error,
                                    'brush error of ' + shape.type,
                                    shape
                                );
                            }
                        } else {
                            shape.brush(ctx, false, self.updatePainter);
                        }
                    }
                }
            },
            {normal: 'up', update: true}
        );
        var image = imageDom.toDataURL(type, args);
        ctx = null;
        this._bgDom.removeChild(imageDom);
        return image;
    }


    /**
     * APIMethod: getWidth
     * 获取绘图区域宽度。
     *
     * Returns:
     * {Number} 绘图区域宽度。
     */
    getWidth() {
        return this._width;
    }


    /**
     * APIMethod: getHeight
     * 获取绘图区域高度。
     *
     * Returns:
     * {Number} 绘图区域高度。
     */
    getHeight() {
        return this._height;
    }


    /**
     * Method: _getWidth
     *
     */
    _getWidth() {
        var root = this.root;
        var stl = root.currentStyle
            || document.defaultView.getComputedStyle(root);

        return ((root.clientWidth || parseInt(stl.width, 10))
            - parseInt(stl.paddingLeft, 10) // 请原谅我这比较粗暴
            - parseInt(stl.paddingRight, 10)).toFixed(0) - 0;
    }


    /**
     * Method: _getHeight
     *
     */
    _getHeight() {
        var root = this.root;
        var stl = root.currentStyle
            || document.defaultView.getComputedStyle(root);

        return ((root.clientHeight || parseInt(stl.height, 10))
            - parseInt(stl.paddingTop, 10) // 请原谅我这比较粗暴
            - parseInt(stl.paddingBottom, 10)).toFixed(0) - 0;
    }


    /**
     * Method: _brushHover
     *
     */
    _brushHover(shape) {
        var ctx = this._layers.hover.ctx;

        if (!shape.onbrush // 没有onbrush
            // 有onbrush并且调用执行返回false或undefined则继续粉刷
            || (shape.onbrush && !shape.onbrush(ctx, true))
        ) {
            var layer = this.getLayer(shape.zlevel);
            if (layer.needTransform) {
                ctx.save();
                layer.setTransform(ctx);
            }
            // Retina 优化
            if (Config.catchBrushException) {
                try {
                    shape.brush(ctx, true, this.updatePainter);
                } catch (error) {
                    SUtil.Util_log(
                        error, 'hoverBrush error of ' + shape.type, shape
                    );
                }
            } else {
                shape.brush(ctx, true, this.updatePainter);
            }
            if (layer.needTransform) {
                ctx.restore();
            }
        }

    }


    /**
     * Method: _shapeToImage
     *
     */
    _shapeToImage(id, shape, width, height, devicePixelRatio) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var _devicePixelRatio = devicePixelRatio || window.devicePixelRatio || 1;

        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        canvas.setAttribute('width', width * _devicePixelRatio);
        canvas.setAttribute('height', height * _devicePixelRatio);

        ctx.clearRect(0, 0, width * _devicePixelRatio, height * _devicePixelRatio);

        var shapeTransform = {
            position: shape.position,
            rotation: shape.rotation,
            scale: shape.scale
        };
        shape.position = [0, 0, 0];
        shape.rotation = 0;
        shape.scale = [1, 1];
        if (shape) {
            shape.brush(ctx, false);
        }

        var imgShape = new SmicImage({
            id: id,
            style: {
                x: 0,
                y: 0,
                image: canvas
            }
        });

        if (shapeTransform.position != null) {
            imgShape.position = shape.position = shapeTransform.position;
        }

        if (shapeTransform.rotation != null) {
            imgShape.rotation = shape.rotation = shapeTransform.rotation;
        }

        if (shapeTransform.scale != null) {
            imgShape.scale = shape.scale = shapeTransform.scale;
        }

        return imgShape;
    }


    /**
     * Method: _createShapeToImageProcessor
     *
     */
    _createShapeToImageProcessor() {
        var me = this;

        return function (id, e, width, height) {
            return me._shapeToImage(
                id, e, width, height, Painter.devicePixelRatio
            );
        };
    }


    // SMIC-方法扩展 - start
    /**
     * APIMethod: updateHoverLayer
     * 更新设置显示高亮图层。
     *
     * Parameters:
     * shapes - {Array} 图形数组。
     */
    updateHoverLayer(shapes) {
        if (!(shapes instanceof Array)) {
            return this;
        }

        //清除高亮
        this.clearHover();
        this.storage.delHover();

        for (var i = 0; i < shapes.length; i++) {
            this.storage.addHover(shapes[i]);
            this._brushHover(shapes[i]);
        }
    }


    /**
     * Method: createDom
     * 创建 Dom。
     *
     * Parameters:
     * id - {String} Dom id
     * type - {String} Dom type
     * painter - {<SuperMap.LevelRenderer.Painter>} Painter 实例。
     *
     * Returns:
     * {Object} Dom
     */
    static createDom(id, type, painter) {
        var newDom = document.createElement(type);
        var width = painter._width;
        var height = painter._height;

        // 没append呢，请原谅我这样写，清晰~
        newDom.style.position = 'absolute';
        newDom.style.left = 0;
        newDom.style.top = 0;
        newDom.style.width = width + 'px';
        newDom.style.height = height + 'px';
        newDom.setAttribute('width', width * Painter.devicePixelRatio);
        newDom.setAttribute('height', height * Painter.devicePixelRatio);

        // id不作为索引用，避免可能造成的重名，定义为私有属性
        //newDom.setAttribute('data-zr-dom-id', id);
        newDom.setAttribute('id', id);
        return newDom;
    }
}

/**
 * @private
 * @class Painter.Layer
 * 绘制层类。
 *
 * Inherits from:
 *  - <SuperMap.LevelRenderer.Transformable>
 */
export class PaintLayer extends Transformable {

    /**
     * Constructor: Painter.Layer
     * 构造函数。
     *
     * Parameters:
     * id - {String} id。
     * painter - {<SuperMap.LevelRenderer.Painter>} Painter 实例。
     *
     */
    constructor(id, painter) {
        super(id, painter);
        /**
         * Property: dom
         * {Object} dom。
         */
        this.dom = null;

        /**
         * Property: domBack
         * {Object} domBack。
         */
        this.domBack = null;

        /**
         * Property: ctxBack
         * {Object} ctxBack。
         */
        this.ctxBack = null;

        /**
         * Property: painter
         * {<SuperMap.LevelRenderer.Painter>} painter。
         */
        this.painter = painter;

        /**
         * Property: unusedCount
         * {Number} unusedCount。
         */
        this.unusedCount = 0;

        /**
         * Property: config
         * {Object} config。
         */
        this.config = null;

        /**
         * Property: dirty
         * {Boolean} dirty。
         */
        this.dirty = true;

        /**
         * Property: elCount
         * {Number} elCount。
         */
        this.elCount = 0;

        // Configs
        /**
         * Property: clearColor
         * {String} 每次清空画布的颜色。默认值：0；
         */
        this.clearColor = 0;

        /**
         * Property: motionBlur
         * {Boolean} 是否开启动态模糊。默认值：false；
         */
        this.motionBlur = false;

        /**
         * Property: lastFrameAlpha
         * {Number} 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
         */
        this.lastFrameAlpha = 0.7;

        /**
         * Property: zoomable
         * {Boolean} 层是否支持鼠标平移操作。默认值：false；
         */
        this.zoomable = false;

        /**
         * Property: panable
         * {Boolean} 层是否支持鼠标缩放操作。默认值：false；
         */
        this.panable = false;

        /**
         * Property: maxZoom
         * {Number} maxZoom。默认值：Infinity。
         */
        this.maxZoom = Infinity;

        /**
         * Property: minZoom
         * {Number} minZoom。默认值：0。
         */
        this.minZoom = 0;

        /**
         * Property: ctx
         * {Object} Cavans 上下文。
         */
        this.ctx = null;
        this.dom = Painter.createDom(CommonUtil.createUniqueID("SuperMap.Theme" + id), 'canvas', painter);
        this.dom.onselectstart = returnFalse; // 避免页面选中的尴尬
        this.dom.style['-webkit-user-select'] = 'none';
        this.dom.style['user-select'] = 'none';
        this.dom.style['-webkit-touch-callout'] = 'none';
        // Function
        // 返回false的方法，用于避免页面被选中
        function returnFalse() {
            return false;
        }
        this.CLASS_NAME = "SuperMap.LevelRenderer.Painter.Layer";
    }

    /**
     * Method: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.dom = null;
        this.domBack = null;
        this.ctxBack = null;
        this.painter = null;
        this.unusedCount = null;
        this.config = null;
        this.dirty = null;
        this.elCount = null;
        this.clearColor = null;
        this.motionBlur = null;
        this.lastFrameAlpha = null;
        this.zoomable = null;
        this.panable = null;
        this.maxZoom = null;
        this.minZoom = null;
        this.ctx = null;

        Transformable.destroy.apply(this, arguments);
    }

    /**
     * Method: initContext
     * 初始化 Canvan 2D 上下文。
     */
    initContext() {
        this.ctx = this.dom.getContext('2d');
        if (Painter.devicePixelRatio != 1) {
            this.ctx.scale(Painter.devicePixelRatio, Painter.devicePixelRatio);
        }
    }

    /**
     * Method: createBackBuffer
     * 创建备份缓冲。
     */
    createBackBuffer() {
        this.domBack = Painter.createDom(CommonUtil.createUniqueID("SuperMap.Theme.back-" + this.id), 'canvas', this.painter);
        this.ctxBack = this.domBack.getContext('2d');

        if (Painter.devicePixelRatio != 1) {
            this.ctxBack.scale(Painter.devicePixelRatio, Painter.devicePixelRatio);
        }
    }

    /**
     * Method: resize
     * 改变大小。
     *
     * Parameters:
     * width - {Number} 宽。
     * height - {Number} 高。
     */
    resize(width, height) {
        this.dom.style.width = width + 'px';
        this.dom.style.height = height + 'px';

        this.dom.setAttribute('width', width * Painter.devicePixelRatio);
        this.dom.setAttribute('height', height * Painter.devicePixelRatio);

        if (Painter.devicePixelRatio != 1) {
            this.ctx.scale(Painter.devicePixelRatio, Painter.devicePixelRatio);
        }

        if (this.domBack) {
            this.domBack.setAttribute('width', width * Painter.devicePixelRatio);
            this.domBack.setAttribute('height', height * Painter.devicePixelRatio);

            if (Painter.devicePixelRatio != 1) {
                this.ctxBack.scale(Painter.devicePixelRatio, Painter.devicePixelRatio);
            }
        }
    }

    /**
     * Method: clear
     * 清空该层画布。
     */
    clear() {
        var dom = this.dom;
        var ctx = this.ctx;
        var width = dom.width;
        var height = dom.height;

        var haveClearColor = this.clearColor;
        var haveMotionBLur = this.motionBlur;
        var lastFrameAlpha = this.lastFrameAlpha;

        if (haveMotionBLur) {
            if (!this.domBack) {
                this.createBackBuffer();
            }

            this.ctxBack.globalCompositeOperation = 'copy';
            this.ctxBack.drawImage(
                dom, 0, 0,
                width / Painter.devicePixelRatio,
                height / Painter.devicePixelRatio
            );
        }

        if (haveClearColor) {
            ctx.save();
            ctx.fillStyle = this.config.clearColor;
            ctx.fillRect(
                0, 0,
                width / Painter.devicePixelRatio,
                height / Painter.devicePixelRatio
            );
            ctx.restore();
        } else {
            ctx.clearRect(
                0, 0,
                width / Painter.devicePixelRatio,
                height / Painter.devicePixelRatio
            );
        }

        if (haveMotionBLur) {
            var domBack = this.domBack;
            ctx.save();
            ctx.globalAlpha = lastFrameAlpha;
            ctx.drawImage(
                domBack, 0, 0,
                width / Painter.devicePixelRatio,
                height / Painter.devicePixelRatio
            );
            ctx.restore();
        }
    }

}