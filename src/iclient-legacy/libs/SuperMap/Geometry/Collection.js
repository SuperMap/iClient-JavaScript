/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Geometry.js
 */

/**
 * Class: SuperMap.Geometry.Collection
 * 几何对象集合类，存储在本地的 components 属性中（可作为参数传递给构造函数）。
 * 随着新的几何图形添加到集合中，将不能被克隆，当移动几何图形时，需要指定参照物。  
 * getArea和getLength函数只能通过遍历存储几何对象的 components 数组，总计所有几何图形的面积和长度。
 * 构造函数 <SuperMap.Geometry.Collection> 实例化此类新的实例。
 *
 * Inerhits from:
 *  - <SuperMap.Geometry> 
 */
SuperMap.Geometry.Collection = SuperMap.Class(SuperMap.Geometry, {

    /**
     * APIProperty: components
     * {Array(<SuperMap.Geometry>)} 存储几何对象的数组。
     */
    components: null,
    
    /**
     * Property: componentTypes
     * {Array(String)} An array of class names representing the types of
     * components that the collection can include.  A null value means the
     * component types are not restricted.
     */
    componentTypes: null,

    /**
     * Constructor: SuperMap.Geometry.Collection
     * 创建几何对象集合。
     *
     * Parameters: 
     * components - {Array(<SuperMap.Geometry>)} 几何对象数组。
     * 
     * (code)
     * var point1 = new SuperMap.Geometry.Point(10,20);
     * var point2 = new SuperMap.Geometry.Point(30,40);
     * var col = new SuperMap.Geometry.Collection([point1,point2]);
     * (end)
     */
    initialize: function (components) {
        SuperMap.Geometry.prototype.initialize.apply(this, arguments);
        this.components = [];
        if (components != null) {
            this.addComponents(components);
        }
    },

    /**
     * APIMethod: destroy
     * 销毁几何图形。
     */
    destroy: function () {
        this.components.length = 0;
        this.components = null;
        SuperMap.Geometry.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: clone
     * 克隆当前几何对象。
     *
     * Returns:
     * {<SuperMap.Geometry.Collection>} 克隆的几何对象集合。
     */
    clone: function() {
        var geometry = eval("new " + this.CLASS_NAME + "()");
        for(var i=0, len=this.components.length; i<len; i++) {
            geometry.addComponent(this.components[i].clone());
        }
        
        // catch any randomly tagged-on properties
        SuperMap.Util.applyDefaults(geometry, this);
        
        return geometry;
    },

    /**
     * Method: getComponentsString
     * Get a string representing the components for this collection
     * 
     * Returns:
     * {String} A string representation of the components of this geometry
     */
    getComponentsString: function(){
        var strings = [];
        for(var i=0, len=this.components.length; i<len; i++) {
            strings.push(this.components[i].toShortString()); 
        }
        return strings.join(",");
    },

    /**
     * APIMethod: calculateBounds
     * 通过遍历数组重新计算边界，在遍历每一子项中时调用 extend 方法。
     */
    calculateBounds: function() {
        this.bounds = null;
        var bounds = new SuperMap.Bounds();
        var components = this.components;
        if (components) {
            for (var i=0, len=components.length; i<len; i++) {
                bounds.extend(components[i].getBounds());
            }
        }
        // to preserve old behavior, we only set bounds if non-null
        // in the future, we could add bounds.isEmpty()
        if (bounds.left != null && bounds.bottom != null && 
            bounds.right != null && bounds.top != null) {
            this.setBounds(bounds);
        }
    },

    /**
     * APIMethod: addComponents
     * 给几何图形对象添加元素。
     *
     * Parameters:
     * components - {Array(<SuperMap.Geometry>)} 几何对象组件。
     *
     * (code)
     * var collection = new SuperMap.Geometry.Collection();
     * collection.addComponents(new SuerpMap.Geometry.Point(10,10));
     * (end)
     */
    addComponents: function(components){
        if(!(SuperMap.Util.isArray(components))) {
            components = [components];
        }
        for(var i=0, len=components.length; i<len; i++) {
            this.addComponent(components[i]);
        }
    },

    /**
     * Method: addComponent
     * Add a new component (geometry) to the collection.  If this.componentTypes
     * is set, then the component class name must be in the componentTypes array.
     *
     * The bounds cache is reset.
     * 
     * Parameters:
     * component - {<SuperMap.Geometry>} A geometry to add
     * index - {int} Optional index into the array to insert the component
     *
     * Returns:
     * {Boolean} The component geometry was successfully added
     */    
    addComponent: function(component, index) {
        var added = false;
        if(component) {
            if(this.componentTypes == null ||
               (SuperMap.Util.indexOf(this.componentTypes,
                                        component.CLASS_NAME) > -1)) {

                if(index != null && (index < this.components.length)) {
                    var components1 = this.components.slice(0, index);
                    var components2 = this.components.slice(index, 
                                                           this.components.length);
                    components1.push(component);
                    this.components = components1.concat(components2);
                } else {
                    this.components.push(component);
                }
                component.parent = this;
                this.clearBounds();
                added = true;
            }
        }
        return added;
    },
    
    /**
     * APIMethod: removeComponents
     * 清除几何对象。
     *
     * Parameters:
     * components - {Array(<SuperMap.Geometry>)}需要清除的几何对象。
     *
     * Returns: 
     * {Boolean} 元素是否被删除。
     */
    removeComponents: function(components) {
        var removed = false;

        if(!(SuperMap.Util.isArray(components))) {
            components = [components];
        }
        for(var i=components.length-1; i>=0; --i) {
            removed = this.removeComponent(components[i]) || removed;
        }
        return removed;
    },
    
    /**
     * Method: removeComponent
     * Remove a component from this geometry.
     *
     * Parameters:
     * component - {<SuperMap.Geometry>} 
     *
     * Returns: 
     * {Boolean} The component was removed.
     */
    removeComponent: function(component) {
        
        SuperMap.Util.removeItem(this.components, component);
        
        // clearBounds() so that it gets recalculated on the next call
        // to this.getBounds();
        this.clearBounds();
        return true;
    },

    /**
     * APIMethod: getLength
     * 计算几何对象长度。
     *
     * Returns:
     * {Float} 几何对象长度（所有几何对象长度总和）。
     */
    getLength: function() {
        var length = 0.0;
        for (var i=0, len=this.components.length; i<len; i++) {
            length += this.components[i].getLength();
        }
        return length;
    },
    
    /**
     * APIMethod: getArea
     * 计算几何对象的面积。注意，这个方法在 <SuperMap.Geometry.Polygon> 类中需要重写。
     *
     * Returns:
     * {Float} 几何图形的面积，是几何对象中所有组成部分的面积之和。
     */
    getArea: function() {
        var area = 0.0;
        for (var i=0, len=this.components.length; i<len; i++) {
            area += this.components[i].getArea();
        }
        return area;
    },

    /** 
     * APIMethod: getGeodesicArea
     * 计算多边形投影到球面上的近似面积。
     *
     * Parameters:
     * projection - {<SuperMap.Projection>} 空间参考系统的几何坐标。如果没有设置，默认 WGS84。
     *
     * Returns:
     * {float} 几何图形的近似测地面积。
     */
    getGeodesicArea: function(projection) {
        var area = 0.0;
        for(var i=0, len=this.components.length; i<len; i++) {
            area += this.components[i].getGeodesicArea(projection);
        }
        return area;
    },
    
    /**
     * APIMethod: getCentroid
     *
     * 计算几何图形集合的质心。
     *
     * Parameters:
     * weighted - {Boolean} 执行getCentroid方法进行递归计算，返回此几何图形集合中的面积加权平均值。
     *
     * Returns:
     * {<SuperMap.Geometry.Point>} 质心。
     */
    getCentroid: function(weighted) {
        if (!weighted) {
            return this.components.length && this.components[0].getCentroid();
        }
        var len = this.components.length;
        if (!len) {
            return false;
        }
        
        var areas = [];
        var centroids = [];
        var areaSum = 0;
        var minArea = Number.MAX_VALUE;
        var component;
        for (var i=0; i<len; ++i) {
            component = this.components[i];
            var area = component.getArea();
            var centroid = component.getCentroid(true);
            if (isNaN(area) || isNaN(centroid.x) || isNaN(centroid.y)) {
                continue;
            }
            areas.push(area);
            areaSum += area;
            minArea = (area < minArea && area > 0) ? area : minArea;
            centroids.push(centroid);
        }
        len = areas.length;
        if (areaSum === 0) {
            // all the components in this collection have 0 area
            // probably a collection of points -- weight all the points the same
            for (var i=0; i<len; ++i) {
                areas[i] = 1;
            }
            areaSum = areas.length;
        } else {
            // normalize all the areas where the smallest area will get
            // a value of 1
            for (var i=0; i<len; ++i) {
                areas[i] /= minArea;
            }
            areaSum /= minArea;
        }
        
        var xSum = 0, ySum = 0, centroid, area;
        for (var i=0; i<len; ++i) {
            centroid = centroids[i];
            area = areas[i];
            xSum += centroid.x * area;
            ySum += centroid.y * area;
        }
        
        return new SuperMap.Geometry.Point(xSum/areaSum, ySum/areaSum);
    },

    /**
     * APIMethod: getGeodesicLength
     * 计算投影到球面上的几何图形的近似测地长度。
     *
     * projection - {<SuperMap.Projection>} 空间参考系统的几何坐标。如果没有设置，默认 WGS84。
     * 
     * Returns:
     * {Float} 几何图形的近似测地长度。
     */
    getGeodesicLength: function(projection) {
        var length = 0.0;
        for(var i=0, len=this.components.length; i<len; i++) {
            length += this.components[i].getGeodesicLength(projection);
        }
        return length;
    },

    /**
     * APIMethod: move
     * 沿着x、y轴的正方向上按照给定的位移移动几何图形，move 不仅改变了几何图形的位置并且清理了边界缓存。
     *
     * Parameters:
     * x - {Float} x轴正方向上移动的距离。
     * y - {Float} y轴正方向上移动的距离。
     */
    move: function(x, y) {
        for(var i=0, len=this.components.length; i<len; i++) {
            this.components[i].move(x, y);
        }
    },

    /**
     * APIMethod: rotate
     * 围绕中心点旋转几何图形。
     *
     * Parameters:
     * angle - {Float} 旋转角的度数（沿着x轴正方向逆时针测量）。
     * origin - {<SuperMap.Geometry.Point>} 旋转中心点。
     */
    rotate: function(angle, origin) {
        for(var i=0, len=this.components.length; i<len; ++i) {
            this.components[i].rotate(angle, origin);
        }
    },

    /**
     * APIMethod: resize
     * 调整几何对象大小。
     *
     * Parameters:
     * scale - {Float} 几何图形缩放的比例系数，是几何图形维数的两倍。
     * （如，对于线来说将以线2倍的长度拉长，对于多边形来说，将以面积的4倍变化）。
     * origin - {<SuperMap.Geometry.Point>} 调整大小选定的起始原点。
     * ratio - {Float} 可选的x,y的比例，默认的比例为1。
     * 
     * Returns:
     * {SuperMap.Geometry} - 几何图形。 
     */
    resize: function(scale, origin, ratio) {
        for(var i=0; i<this.components.length; ++i) {
            this.components[i].resize(scale, origin, ratio);
        }
        return this;
    },

    /**
     * APIMethod: distanceTo
     * 计算两个几个图形间的最小距离（x-y平面坐标系下）。
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>} 目标几何图形。
     * options - {Object} 距离计算需要设置的可选属性。有效的选项取决于特定的几何类型。
     *
     * Valid options:
     * details - {Boolean} 返回距离计算的细节。默认为false。
     * edge - {Boolean} 计算一个几何图形到目标几何图形边缘的最近距离。默认为true。如果设为true，
     * 一个几何图形完全包含在目标几何图形中时，调用distanceTo返回非零结果，如果false，两个几何图形相交情况下
     * 调用distanceTo结果返回0，而且如果false，将不返距离值。
     *
     * Returns:
     * {Number | Object} 返回一个几何图形到目标几何图形的距离。
     */
    distanceTo: function(geometry, options) {
        var edge = !(options && options.edge === false);
        var details = edge && options && options.details;
        var result, best, distance;
        var min = Number.POSITIVE_INFINITY;
        for(var i=0, len=this.components.length; i<len; ++i) {
            result = this.components[i].distanceTo(geometry, options);
            distance = details ? result.distance : result;
            if(distance < min) {
                min = distance;
                best = result;
                if(min == 0) {
                    break;
                }
            }
        }
        return best;
    },

    /** 
     * APIMethod: equals
     * 判断两个几何图形是否相等。如果所有的 components 具有相同的坐标，则认为是相等的。
     * 
     * Parameters:
     * geom - {<SuperMap.Geometry>} 需要判断的几何图形。 
     *
     * Returns:
     * {Boolean} 输入的几何图形与当前几何图形是否相等。
     */
    equals: function(geometry) {
        var equivalent = true;
        if(!geometry || !geometry.CLASS_NAME ||
           (this.CLASS_NAME !== geometry.CLASS_NAME)) {
            equivalent = false;
        } else if(!(SuperMap.Util.isArray(geometry.components)) ||
                  (geometry.components.length !== this.components.length)) {
            equivalent = false;
        } else {
            for(var i=0, len=this.components.length; i<len; ++i) {
                if(!this.components[i].equals(geometry.components[i])) {
                    equivalent = false;
                    break;
                }
            }
        }
        return equivalent;
    },

    /**
     * APIMethod: transform
     * 投影转换。
     * 
     * Parameters:
     * source - {<SuperMap.Projection>} 源对象投影。
     * dest - {<SuperMap.Projection>} 目标对象投影。
     * 
     * Returns:
     * {<SuperMap.Geometry>} 
     */
    transform: function(source, dest) {
        if (source && dest) {
            for (var i=0, len=this.components.length; i<len; i++) {  
                var component = this.components[i];
                component.transform(source, dest);
            }
            this.bounds = null;
        }
        return this;
    },

    /**
     * APIMethod: intersects
     * 判断输入的几何对象是否与当前几何对象相交。
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>} 任意的几何类型。
     *
     * Returns:
     * {Boolean} 输入几何对象与当前几何对象相交。
     */
    intersects: function(geometry) {
        var intersect = false;
        for(var i=0, len=this.components.length; i<len; ++ i) {
            intersect = geometry.intersects(this.components[i]);
            if(intersect) {
                break;
            }
        }
        return intersect;
    },

    /**
     * APIMethod: getVertices
     * 返回几何对象的所有结点的列表。
     *
     * Parameters:
     * nodes - {Boolean} 对于线来说，仅仅返回作为端点的顶点，如果设为false，则返回非端点的顶点
     * 如果没有设置此参数，则返回所有顶点。
     *
     * Returns:
     * {Array} 几何对象的顶点列表。
     */
    getVertices: function(nodes) {
        var vertices = [];
        for(var i=0, len=this.components.length; i<len; ++i) {
            Array.prototype.push.apply(
                vertices, this.components[i].getVertices(nodes)
            );
        }
        return vertices;
    },


    CLASS_NAME: "SuperMap.Geometry.Collection"
});
