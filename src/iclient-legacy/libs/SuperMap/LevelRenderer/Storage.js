/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Storage
 * 内容（图像）仓库 (M) 。
 *
 */
SuperMap.LevelRenderer.Storage = SuperMap.Class({

    /**
     * Property: _elements
     * {Object} 所有常规形状，id 索引的 map。
     *
     */
    _elements: null,

    /**
     * Property: _hoverElements
     * {Array} 高亮层形状，不稳定，动态增删，数组位置也是 z 轴方向，靠前显示在下方。
     *
     */
    _hoverElements: null,

    /**
     * Property: _roots
     * {Array} _roots。
     *
     */
    _roots: null,

    /**
     * Property: _shapeList
     * {Array}  _shapeList。
     *
     */
    _shapeList: null,

    /**
     * Property: _shapeListOffset
     * {Number}  _shapeListOffset。默认值：0。
     *
     */
    _shapeListOffset: 0,

    /**
     * Constructor: SuperMap.LevelRenderer.Storage
     * 构造函数。
     */
    initialize: function() {
        this._elements = {};
        this._hoverElements = [];
        this._roots = [];
        this._shapeList = [];
        this._shapeListOffset = 0;
    },

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy: function() {
        this.dispose();
        this._shapeList = null;
        this._shapeListOffset = null;
    },

    /**
     * APIMethod: iterShape
     * 遍历迭代器。
     *
     * Parameters:
     * fun - {Function} 迭代回调函数，return true终止迭代。
     * option - {Object} 迭代参数，缺省为仅降序遍历普通层图形。可设属性如下：
     *
     * Symbolizer properties:
     * hover - {Boolean} 是否是高亮层图形。默认值：true。
     * normal - {String} 是否是普通层图形，迭代时是否指定及z轴顺序。可设值：'down' ，'up'；默认值："down"。
     * update - {Boolean} 是否在迭代前更新形状列表。默认值：false。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Storage>} this。
     */
    iterShape: function(fun, option){
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
                // 降序遍历，高层优先
                var l = this._shapeList.length;
                while (l--) {
                    if (fun(this._shapeList[l])) {
                        return this;
                    }
                }
                break;
            // case 'up':
            default:
                // 升序遍历，底层优先
                for (var i = 0, l = this._shapeList.length; i < l; i++) {
                    if (fun(this._shapeList[i])) {
                        return this;
                    }
                }
                break;
        }

        return this;
    },

    /**
     * APIMethod: getHoverShapes
     * 返回 hover 层的形状数组。
     *
     * Parameters:
     * update - {Boolean} 是否在返回前更新图形的变换。默认值：false。
     *
     * Returns:
     * {Array<SuperMap.LevelRenderer.Shape>} 图形数组。
     */
    getHoverShapes: function(update){
        // hoverConnect
        var hoverElements = [];
        for (var i = 0, l = this._hoverElements.length; i < l; i++) {
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
        hoverElements.sort(SuperMap.LevelRenderer.Storage.shapeCompareFunc);
        if (update) {
            for (var i = 0, l = hoverElements.length; i < l; i++) {
                hoverElements[i].updateTransform();
            }
        }
        return hoverElements;
    },

    /**
     * APIMethod: getShapeList
     * 返回所有图形的绘制队列。
     *
     * Parameters:
     * update - {Boolean} 是否在返回前更新该数组。默认值：false。  详见：<SuperMap.LevelRenderer.Shape> updateShapeList。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Shape>} 图形。
     */
    getShapeList: function(update){
        if (update) {
            this.updateShapeList();
        }
        return this._shapeList;
    },

    /**
     * APIMethod: updateShapeList
     * 更新图形的绘制队列。
     * 每次绘制前都会调用，该方法会先深度优先遍历整个树，更新所有Group和Shape的变换并且把所有可见的Shape保存到数组中，
     * 最后根据绘制的优先级（zlevel > z > 插入顺序）排序得到绘制队列。
     */
    updateShapeList: function(){
        this._shapeListOffset = 0;
        for (var i = 0, len = this._roots.length; i < len; i++) {
            var root = this._roots[i];
            this._updateAndAddShape(root);
        }
        this._shapeList.length = this._shapeListOffset;

        for (var i = 0, len = this._shapeList.length; i < len; i++) {
            this._shapeList[i].__renderidx = i;
        }

        this._shapeList.sort(SuperMap.LevelRenderer.Storage.shapeCompareFunc);
    },

    /**
     * Method: _updateAndAddShape
     * 跟新并添加图形。
     */
    _updateAndAddShape: function(el, clipShapes){
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

        }
        else {
            el.__clipShapes = clipShapes;

            this._shapeList[this._shapeListOffset++] = el;
        }
    },

    /**
     * APIMethod: mod
     * 修改图形(Shape)或者组(Group)。
     *
     * Parameters:
     * elId - {String} 唯一标识。
     * params - {Object} 参数。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Storage>} this。
     */
    mod: function(elId, params){
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
                    SuperMap.LevelRenderer.Util.merge(el, target, true);
                }
                else {
                    SuperMap.LevelRenderer.Util.merge(el, params, true);
                }
            }
        }

        return this;
    },

    /**
     * APIMethod: drift
     * 移动指定的图形(Shape)的位置。
     *
     * Parameters:
     * shapeId - {String} 唯一标识。
     * dx - {Number}
     * dy - {Number}
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Storage>} this。
     */
    drift: function(shapeId, dx, dy){
        var shape = this._elements[shapeId];
        if (shape) {
            shape.needTransform = true;
            if (shape.draggable === 'horizontal') {
                dy = 0;
            }
            else if (shape.draggable === 'vertical') {
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
    },

    /**
     * APIMethod: addHover
     * 添加高亮层数据。
     *
     * Parameters:
     * shape - {<SuperMap.LevelRenderer.Shape>} 图形。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Storage>} this。
     */
    addHover: function(shape){
        shape.updateNeedTransform();
        this._hoverElements.push(shape);
        return this;
    },

    /**
     * APIMethod: delHover
     * 清空高亮层数据。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Storage>} this。
     */
    delHover: function(){
        this._hoverElements = [];
        return this;
    },

    /**
     * APIMethod: hasHoverShape
     * 是否有图形在高亮层里。
     *
     * Returns:
     * {Boolean} 是否有图形在高亮层里。
     */
    hasHoverShape: function(){
        return this._hoverElements.length > 0;
    },

    /**
     * APIMethod: addRoot
     * 添加图形(Shape)或者组(Group)到根节点。
     *
     * Parameters:
     * el - {<SuperMap.LevelRenderer.Shape>/<SuperMap.LevelRenderer.Group>} 图形。
     *
     */
    addRoot: function(el){
        if (el instanceof SuperMap.LevelRenderer.Group) {
            el.addChildrenToStorage(this);
        }

        this.addToMap(el);
        this._roots.push(el);
    },

    /**
     * APIMethod: delRoot
     * 删除指定的图形(Shape)或者组(Group)。
     *
     * Parameters:
     * elId - {Array{String}} 删除图形(Shape)或者组(Group)的 id 数组。如果为空清空整个Storage。
     *
     */
    delRoot: function(elId){
        if (typeof(elId) == 'undefined') {
            // 不指定elId清空
            for (var i = 0; i < this._roots.length; i++) {
                var root = this._roots[i];

                if (root instanceof SuperMap.LevelRenderer.Group) {
                    root.delChildrenFromStorage(this);
                }
            }

            this._elements = {};
            this._hoverElements = [];
            this._roots = [];

            return;
        }

        if (elId instanceof Array) {
            for (var i = 0, l = elId.length; i < l; i++) {
                this.delRoot(elId[i]);
            }
            return;
        }

        var el;
        if (typeof(elId) == 'string') {
            el = this._elements[elId];
        }
        else {
            el = elId;
        }

        var idx = SuperMap.LevelRenderer.Util.indexOf(this._roots, el);
        if (idx >= 0) {
            this.delFromMap(el.id);
            this._roots.splice(idx, 1);
            if (el instanceof SuperMap.LevelRenderer.Group) {
                el.delChildrenFromStorage(this);
            }
        }
    },

    /**
     * APIMethod: addToMap
     * 添加图形到 map。
     *
     * Parameters:
     * el - {<SuperMap.LevelRenderer.Shape>} 图形。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Storage>} this。
     */
    addToMap: function(el){
        if (el instanceof SuperMap.LevelRenderer.Group) {
            el._storage = this;
        }
        el.modSelf();

        this._elements[el.id] = el;

        return this;
    },

    /**
     * APIMethod: get
     * 获取指定图形。
     *
     * Parameters:
     * elId - {String} 图形 id。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Shape>} 图形。
     */
    get: function(elId){
        return this._elements[elId];
    },

    /**
     * APIMethod: delFromMap
     * 从 map 中删除指定图形。
     *
     * Parameters:
     * elId - {String} 图形id。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Storage>} this。
     */
    delFromMap: function(elId){
        var el = this._elements[elId];
        if (el) {
            delete this._elements[elId];

            if (el instanceof SuperMap.LevelRenderer.Group) {
                el._storage = null;
            }
        }

        return this;
    },

    /**
     * APIMethod: dispose
     * 清空并且释放 Storage。
     */
    dispose: function(){
        this._elements = null;
        // this._renderList = null;
        this._roots = null;
        this._hoverElements = null;
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Storage"
});

SuperMap.LevelRenderer.Storage.shapeCompareFunc = function(a, b) {
    if (a.zlevel == b.zlevel) {
        if (a.z == b.z) {
            return a.__renderidx - b.__renderidx;
        }
        return a.z - b.z;
    }
    return a.zlevel - b.zlevel;
};