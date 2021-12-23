/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from './Util';
import {Group} from './Group';

/**
 * @private
 * @class  SuperMap.LevelRenderer.Storage
 * @category Visualization Theme
 * @classdesc 内容（图像）仓库 (M) 。
 */
export class Storage {


    /**
     * @function SuperMap.LevelRenderer.Storage.constructor
     * @description 构造函数。
     */
    constructor() {
        /**
         * @member {Object} SuperMap.LevelRenderer.Storage.prototype._elements
         * @description 所有常规形状，id 索引的 map。
         */
        this._elements = {};

        /**
         * @member {Array} SuperMap.LevelRenderer.Storage.prototype._hoverElements
         * @description 高亮层形状，不稳定，动态增删，数组位置也是 z 轴方向，靠前显示在下方。
         *
         */
        this._hoverElements = [];

        /**
         * @member {Array} SuperMap.LevelRenderer.Storage.prototype._roots
         * @description _roots。
         *
         */
        this._roots = [];

        /**
         * @member {Array} SuperMap.LevelRenderer.Storage.prototype._shapeList
         * @description _shapeList。
         *
         */
        this._shapeList = [];

        /**
         * @member {number} SuperMap.LevelRenderer.Storage.prototype._shapeListOffset
         * @description _shapeListOffset。默认值：0。
         *
         */
        this._shapeListOffset = 0;

        this.CLASS_NAME = "SuperMap.LevelRenderer.Storage";
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.dispose();
        this._shapeList = null;
        this._shapeListOffset = null;
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.iterShape
     * @description 遍历迭代器。
     * 
     * @param {Function} fun - 迭代回调函数，return true终止迭代。
     * @param {Object} option - 迭代参数，缺省为仅降序遍历普通层图形。
     * @param {boolean} [hover=true] - 是否是高亮层图形。
     * @param {string} [normal='down'] - 是否是普通层图形，迭代时是否指定及z轴顺序。可设值：'down' ，'up'。
     * @param {boolean} [update=false] - 是否在迭代前更新形状列表。
     * @return {SuperMap.LevelRenderer.Storage} this。
     */
    iterShape(fun, option) {
        if (!option) {
            var defaultIterateOption = {
                hover: false,
                normal: 'down',
                update: false
            };
            option = defaultIterateOption;
        }

        if (option.hover) {
            // 高亮层数据遍历
            for (var i = 0, l = this._hoverElements.length; i < l; i++) {
                var el = this._hoverElements[i];
                el.updateTransform();
                if (fun(el)) {
                    return this;
                }
            }
        }

        if (option.update) {
            this.updateShapeList();
        }

        // 遍历: 'down' | 'up'
        switch (option.normal) {
            case 'down':
            {
                // 降序遍历，高层优先
                let l = this._shapeList.length;
                while (l--) {
                    if (fun(this._shapeList[l])) {
                        return this;
                    }
                }
                break;
            }
            // case 'up':
            default:
            {
                // 升序遍历，底层优先
                for (let i = 0, l = this._shapeList.length; i < l; i++) {
                    if (fun(this._shapeList[i])) {
                        return this;
                    }
                }
                break;
            }
        }

        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.getHoverShapes
     * @param {boolean} [update=false] - 是否在返回前更新图形的变换。
     * @return {Array.<SuperMap.LevelRenderer.Shape>} 图形数组。
     */
    getHoverShapes(update) {
        // hoverConnect
        var hoverElements = [], len = this._hoverElements.length;
        for (let i = 0; i < len; i++) {
            hoverElements.push(this._hoverElements[i]);
            var target = this._hoverElements[i].hoverConnect;
            if (target) {
                var shape;
                target = target instanceof Array ? target : [target];
                for (var j = 0, k = target.length; j < k; j++) {
                    shape = target[j].id ? target[j] : this.get(target[j]);
                    if (shape) {
                        hoverElements.push(shape);
                    }
                }
            }
        }
        hoverElements.sort(Storage.shapeCompareFunc);
        if (update) {
            for (let i = 0, l = hoverElements.length; i < l; i++) {
                hoverElements[i].updateTransform();
            }
        }
        return hoverElements;
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.getShapeList
     * @description 返回所有图形的绘制队列。
     *
     * @param {boolean} [update=false] - 是否在返回前更新该数组。  详见：<SuperMap.LevelRenderer.Shape> updateShapeList。
     * @return {SuperMap.LevelRenderer.Shape} 图形。
     */
    getShapeList(update) {
        if (update) {
            this.updateShapeList();
        }
        return this._shapeList;
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.updateShapeList
     * @description 更新图形的绘制队列。每次绘制前都会调用，该方法会先深度优先遍历整个树，更新所有Group和Shape的变换并且把所有可见的Shape保存到数组中，最后根据绘制的优先级（zlevel > z > 插入顺序）排序得到绘制队列。 
     */
    updateShapeList() {
        this._shapeListOffset = 0;
        var rootsLen = this._roots.length;
        for (let i = 0; i < rootsLen; i++) {
            let root = this._roots[i];
            this._updateAndAddShape(root);
        }
        this._shapeList.length = this._shapeListOffset;

        var shapeListLen = this._shapeList.length;
        for (let i = 0; i < shapeListLen; i++) {
            this._shapeList[i].__renderidx = i;
        }

        this._shapeList.sort(Storage.shapeCompareFunc);
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype._updateAndAddShape
     * @description 更新并添加图形。
     * 
     */
    _updateAndAddShape(el, clipShapes) {
        if (el.ignore) {
            return;
        }

        el.updateTransform();

        if (el.type == 'group') {

            if (el.clipShape) {
                // clipShape 的变换是基于 group 的变换
                el.clipShape.parent = el;
                el.clipShape.updateTransform();

                // PENDING 效率影响
                if (clipShapes) {
                    clipShapes = clipShapes.slice();
                    clipShapes.push(el.clipShape);
                } else {
                    clipShapes = [el.clipShape];
                }
            }

            for (var i = 0; i < el._children.length; i++) {
                var child = el._children[i];

                // Force to mark as dirty if group is dirty
                child.__dirty = el.__dirty || child.__dirty;

                this._updateAndAddShape(child, clipShapes);
            }

            // Mark group clean here
            el.__dirty = false;

        } else {
            el.__clipShapes = clipShapes;

            this._shapeList[this._shapeListOffset++] = el;
        }
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.mod
     * @description 修改图形(Shape)或者组(Group)。
     * 
     * @param {string} elId - 唯一标识。
     * @param {Object} params - 参数。
     * @return {SuperMap.LevelRenderer.Storage} this。
     */
    mod(elId, params) {
        var el = this._elements[elId];
        if (el) {

            el.modSelf();

            if (params) {
                // 如果第二个参数直接使用 shape
                // parent, _storage, __startClip 三个属性会有循环引用
                // 主要为了向 1.x 版本兼容，2.x 版本不建议使用第二个参数
                if (params.parent || params._storage || params.__startClip) {
                    var target = {};
                    for (var name in params) {
                        if (
                            name == 'parent'
                            || name == '_storage'
                            || name == '__startClip'
                        ) {
                            continue;
                        }
                        if (params.hasOwnProperty(name)) {
                            target[name] = params[name];
                        }
                    }
                    new Util().merge(el, target, true);
                } else {
                    new Util().merge(el, params, true);
                }
            }
        }

        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.drift
     * @description 移动指定的图形(Shape)的位置。
     * @param {string} shapeId - 唯一标识。
     * @param {number} dx 
     * @param {number} dy 
     * @return {SuperMap.LevelRenderer.Storage} this。
     */
    drift(shapeId, dx, dy) {
        var shape = this._elements[shapeId];
        if (shape) {
            shape.needTransform = true;
            if (shape.draggable === 'horizontal') {
                dy = 0;
            } else if (shape.draggable === 'vertical') {
                dx = 0;
            }
            if (!shape.ondrift // ondrift
                // 有onbrush并且调用执行返回false或undefined则继续
                || (shape.ondrift && !shape.ondrift(dx, dy))
            ) {
                shape.drift(dx, dy);
            }
        }

        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.addHover
     * @description 添加高亮层数据。
     * @param {SuperMap.LevelRenderer.Shape} shape - 图形。
     * @return {SuperMap.LevelRenderer.Storage} this。
     */
    addHover(shape) {
        shape.updateNeedTransform();
        this._hoverElements.push(shape);
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.delHover
     * @description 清空高亮层数据。
     * @return {SuperMap.LevelRenderer.Storage} this。 
     */
    delHover() {
        this._hoverElements = [];
        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.hasHoverShape
     * @description 是否有图形在高亮层里。
     * @return {boolean} 是否有图形在高亮层里。
     */
    hasHoverShape() {
        return this._hoverElements.length > 0;
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.addRoot
     * @description 添加图形(Shape)或者组(Group)到根节点。
     * 
     * @param {(SuperMap.LevelRenderer.Shape/SuperMap.LevelRenderer.Group)} el - 图形。
     *
     */
    addRoot(el) {
        if (el instanceof Group) {
            el.addChildrenToStorage(this);
        }

        this.addToMap(el);
        this._roots.push(el);
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.delRoot
     * @description 删除指定的图形(Shape)或者组(Group)。
     *
     * @param {Array.<string>} elId - 删除图形(Shape)或者组(Group)的 id 数组。如果为空清空整个Storage。
     *
     */
    delRoot(elId) {
        if (typeof(elId) == 'undefined') {
            // 不指定elId清空
            for (var i = 0; i < this._roots.length; i++) {
                var root = this._roots[i];

                if (root instanceof Group) {
                    root.delChildrenFromStorage(this);
                }
            }

            this._elements = {};
            this._hoverElements = [];
            this._roots = [];

            return;
        }

        if (elId instanceof Array) {
            var elIdLen = elId.length;
            for (let i = 0; i < elIdLen; i++) {
                this.delRoot(elId[i]);
            }
            return;
        }

        var el;
        if (typeof(elId) == 'string') {
            el = this._elements[elId];
        } else {
            el = elId;
        }

        var idx = new Util().indexOf(this._roots, el);
        if (idx >= 0) {
            this.delFromMap(el.id);
            this._roots.splice(idx, 1);
            if (el instanceof Group) {
                el.delChildrenFromStorage(this);
            }
        }
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.addToMap
     * @description 添加图形到 map。
     *
     * @param {SuperMap.LevelRenderer.Shape} el - 图形。
     * @return {SuperMap.LevelRenderer.Storage} this。
     */
    addToMap(el) {
        if (el instanceof Group) {
            el._storage = this;
        }
        el.modSelf();

        this._elements[el.id] = el;

        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.get
     * @description 获取指定图形。
     *
     * @param {string} elId - 图形 id。
     * @return {SuperMap.LevelRenderer.Shape} 图形。
     */
    get(elId) {
        return this._elements[elId];
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.delFromMap
     * @description 从 map 中删除指定图形。
     * 
     * @param {string} elId - 图形id。
     * @return {SuperMap.LevelRenderer.Storage} this。
     */
    delFromMap(elId) {
        var el = this._elements[elId];
        if (el) {
            delete this._elements[elId];

            if (el instanceof Group) {
                el._storage = null;
            }
        }

        return this;
    }

    /**
     * @function SuperMap.LevelRenderer.Storage.prototype.dispose
     * @description 清空并且释放 Storage。
     */
    dispose() {
        this._elements = null;
        // this._renderList = null;
        this._roots = null;
        this._hoverElements = null;
    }

    static shapeCompareFunc(a, b) {
        if (a.zlevel == b.zlevel) {
            if (a.z == b.z) {
                return a.__renderidx - b.__renderidx;
            }
            return a.z - b.z;
        }
        return a.zlevel - b.zlevel;
    }

}