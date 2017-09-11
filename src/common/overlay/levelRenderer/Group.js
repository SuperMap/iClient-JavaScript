import SuperMap from '../../SuperMap';
import {Util} from '../../commontypes/Util';
import Eventful from './Eventful';
import Transformable from './Transformable';
import './Util';

/**
 * @private
 * @class  SuperMap.LevelRenderer.Group
 * Group 是一个容器，可以插入子节点，Group 的变换也会被应用到子节点上。
 *
 * Inherits from:
 *  - <SuperMap.LevelRenderer.Transformable>
 *
 * (code)
 *     var g = new SuperMap.LevelRenderer.Group();
 *     var Circle = new SuperMap.LevelRenderer.Shape.Circle();
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
 */

export default class Group extends SuperMap.mixin(Eventful, Transformable) {

    /**
     * APIProperty: id
     * {String} Group 的唯一标识。
     */
    id = null;

    /**
     * APIProperty: type
     * {Readonly{String}} 类型，默认值：'group'。
     */
    type = null;

//http://www.w3.org/TR/2dcontext/#clipping-region
    /**
     * APIProperty: clipShape
     * {String} 用于裁剪的图形(shape)，所有 Group 内的图形在绘制时都会被这个图形裁剪，该图形会继承 Group 的变换。
     *
     */
    clipShape = null;

    /**
     * Property: _children
     * {Array}
     *
     */
    _children = null;

    /**
     * Property: _storage
     * {Array}
     *
     */
    _storage = null;

    /**
     * Property: __dirty
     * {Boolean} 默认值：true。
     *
     */
    __dirty = true;

    /**
     * APIProperty: ignore
     * {Boolean} 是否忽略该 Group 及其所有子节点。默认值：false。
     *
     */
    ignore = false;

    /**
     * Constructor: SuperMap.LevelRenderer.Group
     * 构造函数。
     *
     * Parameters:
     * options - {Array} Group 的配置（options）项，可以是 Group 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options)
        options = options || {};
        this.id = options.id || Util.createUniqueID("smShapeGroup_");
        for (var key in options) {
            this[key] = options[key];
        }

        this.type = 'group';
        this.clipShape = null;
        this._children = [];
        this._storage = null;
        this.__dirty = true;
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
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
     * Method: children
     * 复制并返回一份新的包含所有儿子节点的数组。
     *
     * Returns:
     * {Array<SuperMap.LevelRenderer.Shape>} 图形数组。
     */
    children() {
        return this._children.slice();
    }


    /**
     * APIMethod: childAt
     * 获取指定 index 的儿子节点。
     *
     * Parameters:
     * idx - {Number} 节点索引。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Shape>} 图形。
     */
    childAt(idx) {
        return this._children[idx];
    }


    /**
     * APIMethod: addChild
     * 添加子节点，可以是 Shape 或者 Group。
     *
     * Parameters:
     * child - {<SuperMap.LevelRenderer.Shape>/<SuperMap.LevelRenderer.Group>} 节点图形。
     *
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

            if (child instanceof SuperMap.LevelRenderer.Group) {
                child.addChildrenToStorage(this._storage);
            }
        }
    }


    /**
     * APIMethod: removeChild
     * 移除子节点。
     *
     * Parameters:
     * child - {<SuperMap.LevelRenderer.Shape>} 需要移除的子节点图形。
     *
     */
    removeChild(child) {
        var idx = SuperMap.LevelRenderer.Util.indexOf(this._children, child);

        this._children.splice(idx, 1);
        child.parent = null;

        if (this._storage) {

            this._storage.delFromMap(child.id);

            if (child instanceof SuperMap.LevelRenderer.Group) {
                child.delChildrenFromStorage(this._storage);
            }
        }
    }


    /**
     * APIMethod: eachChild
     * 遍历所有子节点。
     *
     * Parameters:
     * cb - {Function} 回调函数。
     * context - {Object} 上下文。
     *
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
     * APIMethod: traverse
     * 深度优先遍历所有子孙节点。
     *
     * Parameters:
     * cb - {Function} 回调函数。
     * context - {Object} 上下文。
     *
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
     * Method: addChildrenToStorage
     * 把子图形添加到仓库。
     *
     * Parameters:
     * storage - {<SuperMap.LevelRenderer.Storage>} 图形仓库。
     *
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
     * Method: delChildrenFromStorage
     * 从仓库把子图形删除。
     *
     * Parameters:
     * storage - {<SuperMap.LevelRenderer.Storage>} 图形仓库。
     *
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
     * Method: modSelf。
     * 是否  修改。
     *
     */
    modSelf() {
        this.__dirty = true;
    }


    CLASS_NAME = "SuperMap.LevelRenderer.Group"
}

SuperMap.LevelRenderer.Group = Group;
