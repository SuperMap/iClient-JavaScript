/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Tool.Vector
 * LevelRenderer 二维向量类
 *
 */
SuperMap.LevelRenderer.Tool.Vector = SuperMap.Class({

    /**
     * Property: ArrayCtor
     * {Object} 数组类型控制
     */
    ArrayCtor: null,

    /**
     * Constructor: SuperMap.LevelRenderer.Tool.Vector
     * 构造函数。
     *
     */
    initialize: function() {
        this.ArrayCtor =  typeof Float32Array === 'undefined'
            ? Array
            : Float32Array;
    },

    /**
     * APIMethod: create
     * 创建一个向量。
     *
     * Parameters:
     * x - {Number} x 坐标。
     * y - {Number} y 坐标。
     *
     * Returns:
     * {Vector2} 向量。
     */
    create: function(x, y){
        var ArrayCtor = this.ArrayCtor;

        var out = new ArrayCtor(2);
        out[0] = x || 0;
        out[1] = y || 0;

        return out;
    },

    /**
     * APIMethod: copy
     * 复制一个向量。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v - {Vector2} 向量。
     *
     * Returns:
     * {Vector2} 克隆向量。
     */
    copy: function(out, v){
        out[0] = v[0];
        out[1] = v[1];
        return out;
    },

    /**
     * APIMethod: set
     * 设置向量的两个项。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * a - {Number} 项 a。
     * b - {Number} 项 b。
     *
     * Returns:
     * {Vector2} 结果。
     */
    set: function(out, a, b){
        out[0] = a;
        out[1] = b;
        return out;
    },

    /**
     * APIMethod: add
     * 向量相加。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Vector2} 结果。
     */
    add: function(out, v1, v2){
        out[0] = v1[0] + v2[0];
        out[1] = v1[1] + v2[1];
        return out;
    },

    /**
     * APIMethod: scaleAndAdd
     * 向量缩放后相加。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2（缩放向量）。
     * a - {Number} 缩放参数。
     *
     * Returns:
     * {Vector2} 结果。
     */
    scaleAndAdd: function(out, v1, v2, a){
        out[0] = v1[0] + v2[0] * a;
        out[1] = v1[1] + v2[1] * a;
        return out;
    },

    /**
     * APIMethod: sub
     * 向量相减。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Vector2} 结果。
     */
    sub: function(out, v1, v2){
        out[0] = v1[0] - v2[0];
        out[1] = v1[1] - v2[1];
        return out;
    },

    /**
     * APIMethod: len
     * 向量长度。
     *
     * Parameters:
     * v - {Vector2} 向量。
     *
     * Returns:
     * {Number} 向量长度。
     */
    len: function(v){
        return Math.sqrt(this.lenSquare(v));
    },

    /**
     * APIMethod: lenSquare
     * 向量长度平方。
     *
     * Parameters:
     * v - {Vector2} 向量。
     *
     * Returns:
     * {Number} 向量长度平方。
     */
    lenSquare: function(v){
        return v[0] * v[0] + v[1] * v[1];
    },

    /**
     * APIMethod: mul
     * 向量乘法。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Vector2} 结果。
     */
    mul: function(out, v1, v2){
        out[0] = v1[0] * v2[0];
        out[1] = v1[1] * v2[1];
        return out;
    },

    /**
     * APIMethod: div
     * 向量除法。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Vector2} 结果。
     */
    div: function(out, v1, v2){
        out[0] = v1[0] / v2[0];
        out[1] = v1[1] / v2[1];
        return out;
    },

    /**
     * APIMethod: dot
     * 向量点乘。
     *
     * Parameters:
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Number} 向量点乘。
     */
    dot: function(v1, v2){
        return v1[0] * v2[0] + v1[1] * v2[1];
    },

    /**
     * APIMethod: scale
     * 向量缩放。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v - {Vector2} 向量 v。
     * s - {Number} 缩放参数。
     *
     * Returns:
     * {Vector2} 结果。
     */
    scale: function(out, v, s){
        out[0] = v[0] * s;
        out[1] = v[1] * s;
        return out;
    },

    /**
     * APIMethod: normalize
     * 向量归一化。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v - {Vector2} 向量 v。
     *
     * Returns:
     * {Vector2} 结果。
     */
    normalize: function(out, v){
        var d = this.len(v);
        if (d === 0) {
            out[0] = 0;
            out[1] = 0;
        }
        else {
            out[0] = v[0] / d;
            out[1] = v[1] / d;
        }
        return out;
    },

    /**
     * APIMethod: distance
     * 计算向量间距离。
     *
     * Parameters:
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Number} 向量间距离。
     */
    distance: function(v1, v2){
        return Math.sqrt(
            (v1[0] - v2[0]) * (v1[0] - v2[0])
                + (v1[1] - v2[1]) * (v1[1] - v2[1])
        );
    },

    /**
     * APIMethod: distanceSquare
     * 向量距离平方。
     *
     * Parameters:
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Number} 向量距离平方。
     */
    distanceSquare: function(v1, v2){
        return (v1[0] - v2[0]) * (v1[0] - v2[0])
            + (v1[1] - v2[1]) * (v1[1] - v2[1]);
    },

    /**
     * APIMethod: negate
     * 求负向量。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v - {Vector2} 向量 v。
     *
     * Returns:
     * {Vector2} 负向量。
     */
    negate: function(out, v){
        out[0] = -v[0];
        out[1] = -v[1];
        return out;
    },

    /**
     * APIMethod: lerp
     * 插值两个点。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     * t - {Number} 。
     *
     * Returns:
     * {Vector2} 结果。
     */
    lerp: function(out, v1, v2, t){
        out[0] = v1[0] + t * (v2[0] - v1[0]);
        out[1] = v1[1] + t * (v2[1] - v1[1]);
        return out;
    },

    /**
     * APIMethod: applyTransform
     * 矩阵左乘向量。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v - {Vector2} 向量 v。
     * m - {Vector2} 向量 m。
     *
     * Returns:
     * {Vector2} 结果。
     */
    applyTransform: function(out, v, m){
        var x = v[0];
        var y = v[1];
        out[0] = m[0] * x + m[2] * y + m[4];
        out[1] = m[1] * x + m[3] * y + m[5];
        return out;
    },

    /**
     * APIMethod: min
     * 求两个向量最小值。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Vector2} 结果。
     */
    min: function(out, v1, v2){
        out[0] = Math.min(v1[0], v2[0]);
        out[1] = Math.min(v1[1], v2[1]);
        return out;
    },

    /**
     * APIMethod: max
     * 求两个向量最大值。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Vector2} 结果。
     */
    max: function(out, v1, v2){
        out[0] = Math.max(v1[0], v2[0]);
        out[1] = Math.max(v1[1], v2[1]);
        return out;
    },


    /**
     * APIMethod: length
     * 向量长度。
     *
     * Parameters:
     * v - {Vector2} 向量。
     *
     * Returns:
     * {Number} 向量长度。
     */
    length: function(v){
           return this.len(v);
    },

    /**
     * APIMethod: lengthSquare
     * 向量长度平方。
     *
     * Parameters:
     * v - {Vector2} 向量。
     *
     * Returns:
     * {Number} 向量长度平方。
     */
    lengthSquare: function(v){
        return this.lenSquare(v);
    },

    /**
     * APIMethod: dist
     * 计算向量间距离。
     *
     * Parameters:
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Number} 向量间距离。
     */
    dist: function(v1, v2){
        return this.distance(v1, v2);
    },

    /**
     * APIMethod: distSquare
     * 向量距离平方。
     *
     * Parameters:
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Number} 向量距离平方。
     */
    distSquare: function(v1, v2){
        return this.distanceSquare(v1, v2);
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Tool.Vector"
});