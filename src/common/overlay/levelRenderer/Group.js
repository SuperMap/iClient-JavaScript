/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {mixinExt as mixin} from '../../commontypes/BaseTypes';
import {Util as CommonUtil} from '../../commontypes/Util';
import {Eventful} from './Eventful';
import {Transformable} from './Transformable';

/**
 * @class  LevelRenderer.Group
 * @category Visualization Theme
 * @private
 * @classdesc Group 是一个容器，可以插入子节点，Group 的变换也会被应用到子节点上。
 * @extends {LevelRenderer.Transformable}
 * (code)
 *     var g = new LevelRenderer.Group();
 *     var Circle = new LevelRenderer.Shape.Circle();
 *     g.position[0] = 100;
 *     g.position[1] = 100;
 *     g.addChild(new Circle({
 *         style: {
 *             x: 100,
 *             y: 100,
 *             r: 20,
 *             brushType: 'fill'
 *         }
 *     }));
 *     LR.addGroup(g);
 * (end)
 * @param {Array} options - Group 的配置（options）项，可以是 Group 的自有属性，也可以是自定义的属性。
 */

export class Group extends mixin(Eventful, Transformable) {
    constructor(options) {
        super(options)
        options = options || {};
        /**
         * @member {string} LevelRenderer.Group.prototype.id
         * @description Group 的唯一标识。
         */
        this.id = null;

        /**
         * @readonly
         * @member {string} [LevelRenderer.Group.prototype.type='group']
         * @description 类型。
         */
        this.type = 'group';

        //http://www.w3.org/TR/2dcontext/#clipping-region
        /**
         * @member {string} LevelRenderer.Group.prototype.clipShape
         * @description 用于裁剪的图形(shape)，所有 Group 内的图形在绘制时都会被这个图形裁剪，该图形会继承 Group 的变换。
         */
        this.clipShape = null;

        /**
         * @member {Array} LevelRenderer.Group.prototype._children
         * @description _children。
         */
        this._children = [];

        /**
         * @member {Array} LevelRenderer.Group.prototype._storage
         * @description _storage。
         */
        this._storage = null;

        /**
         * @member {boolean} [LevelRenderer.Group.prototype.__dirty=true]
         * @description __dirty。
         */
        this.__dirty = true;

        /**
         * @member {boolean} [LevelRenderer.Group.prototype.ignore=false]
         * @description 是否忽略该 Group 及其所有子节点。
         */
        this.ignore = false;
        CommonUtil.extend(this, options);
        this.id = this.id || CommonUtil.createUniqueID("smShapeGroup_");
        this.CLASS_NAME = "SuperMap.LevelRenderer.Group";
    }


    /**
     * @function LevelRenderer.Group.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.id = null;
        this.type = null;
        this.clipShape = null;
        this._children = null;
        this._storage = null;
        this.__dirty = null;
        this.ignore = null;

        super.destroy();
    }


    /**
     * @function LevelRenderer.Group.prototype.children
     * @description 复制并返回一份新的包含所有儿子节点的数组。
     * @returns {Array.<LevelRenderer.Shape>} 图形数组。
     */
    children() {
        return this._children.slice();
    }


    /**
     * @function LevelRenderer.Group.prototype.childAt
     * @description 获取指定 index 的儿子节点
     * @param {number} idx - 节点索引。
     * @returns {LevelRenderer.Shape} 图形。
     */
    childAt(idx) {
        return this._children[idx];
    }


    /**
     * @function LevelRenderer.Group.prototype.addChild
     * @description 添加子节点，可以是 Shape 或者 Group。
     * @param {(LevelRenderer.Shape|LevelRenderer.Group)} child - 节点图形。
     */
    // TODO Type Check
    addChild(child) {
        if (child == this) {
            return;
        }

        if (child.parent == this) {
            return;
        }
        if (child.parent) {
            child.parent.removeChild(child);
        }

        this._children.push(child);
        child.parent = this;

        if (this._storage && this._storage !== child._storage) {

            this._storage.addToMap(child);

            if (child instanceof Group) {
                child.addChildrenToStorage(this._storage);
            }
        }
    }


    /**
     * @function LevelRenderer.Group.prototype.removeChild
     * @description 移除子节点。
     * @param {LevelRenderer.Shape} child - 需要移除的子节点图形。
     */
    removeChild(child) {
        var idx = CommonUtil.indexOf(this._children, child);

        this._children.splice(idx, 1);
        child.parent = null;

        if (this._storage) {

            this._storage.delFromMap(child.id);

            if (child instanceof Group) {
                child.delChildrenFromStorage(this._storage);
            }
        }
    }


    /**
     * @function LevelRenderer.Group.prototype.eachChild
     * @description 遍历所有子节点。
     * @param {function} cb - 回调函数。
     * @param {Object} context - 上下文。
     */
    eachChild(cb, context) {
        var haveContext = !!context;
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            if (haveContext) {
                cb.call(context, child);
            } else {
                cb(child);
            }
        }
    }


    /**
     * @function LevelRenderer.Group.prototype.traverse
     * @description 深度优先遍历所有子孙节点。
     * @param {function} cb - 回调函数。
     * @param {Object} context - 上下文。
     */
    traverse(cb, context) {
        var haveContext = !!context;
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            if (haveContext) {
                cb.call(context, child);
            } else {
                cb(child);
            }

            if (child.type === 'group') {
                child.traverse(cb, context);
            }
        }
    }


    /**
     * @function LevelRenderer.Group.prototype.addChildrenToStorage
     * @description 把子图形添加到仓库。
     * @param {LevelRenderer.Storage} storage - 图形仓库。
     */
    addChildrenToStorage(storage) {
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            storage.addToMap(child);
            if (child.type === 'group') {
                child.addChildrenToStorage(storage);
            }
        }
    }


    /**
     * @function LevelRenderer.Group.prototype.delChildrenFromStorage
     * @description 从仓库把子图形删除。
     * @param {LevelRenderer.Storage} storage - 图形仓库。
     */
    delChildrenFromStorage(storage) {
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            storage.delFromMap(child.id);
            if (child.type === 'group') {
                child.delChildrenFromStorage(storage);
            }
        }
    }


    /**
     * @function LevelRenderer.Group.prototype.modSelf
     * @description 是否修改。
     */
    modSelf() {
        this.__dirty = true;
    }

}
