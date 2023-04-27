/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
/**
 * @private
 * @class  LevelRenderer.Tool.Vector
 * @category Visualization Theme
 * @classdesc LevelRenderer 二维向量类
 *
 */
export class Vector {
    constructor() {
        this.ArrayCtor = typeof Float32Array === 'undefined'
            ? Array
            : Float32Array;

        this.CLASS_NAME = "SuperMap.LevelRenderer.Tool.Vector";
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.create
     * @description 创建一个向量。
     *
     * @param {number} x - x坐标
     * @param {number} y - Y坐标
     * @return {Vector2} 向量。
     */
    create(x, y) {
        var ArrayCtor = this.ArrayCtor;

        var out = new ArrayCtor(2);
        out[0] = x || 0;
        out[1] = y || 0;

        return out;
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.copy
     * @description 复制一个向量。
     *
     * @param {Vector2} out - 基础向量。
     * @param {Vector2} v - 向量。
     * @return {Vector2} 克隆向量。
     */
    copy(out, v) {
        out[0] = v[0];
        out[1] = v[1];
        return out;
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.set
     * @description 设置向量的两个项。
     *
     * @param {Vector2} out - 基础向量。
     * @param {number} a - 项 a。
     * @param {number} b - 项 b。
     * @return {Vector2} 结果。
     */
    set(out, a, b) {
        out[0] = a;
        out[1] = b;
        return out;
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.add
     * @description 向量相加。
     *
     * @param {Vector2} out - 基础向量。
     * @param {Vector2} v1 - 向量 v1。
     * @param {Vector2} v2 - 向量 v2。
     * @return {Vector2} 结果。
     */
    add(out, v1, v2) {
        out[0] = v1[0] + v2[0];
        out[1] = v1[1] + v2[1];
        return out;
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.scaleAndAdd
     * @description 向量缩放后相加。
     * @param {Vector2} out - 基础向量。
     * @param {Vector2} v1 - 向量 v1。
     * @param {Vector2} v2 - 向量 v2（缩放向量）。
     * @param {number} a - 缩放参数。
     * @return {Vector2} 结果。
     */
    scaleAndAdd(out, v1, v2, a) {
        out[0] = v1[0] + v2[0] * a;
        out[1] = v1[1] + v2[1] * a;
        return out;
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.sub
     * @description 向量相减。
     * @param {Vector2} out - 基础向量。
     * @param {Vector2} v1 - 向量 v1。
     * @param {Vector2} v2 - 向量 v2。
     * @return {Vector2} 结果。
     */
    sub(out, v1, v2) {
        out[0] = v1[0] - v2[0];
        out[1] = v1[1] - v2[1];
        return out;
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.len
     * @description 向量长度。
     * @param {Vector2} v - 向量。
     * @return {number} 向量长度。
     */
    len(v) {
        return Math.sqrt(this.lenSquare(v));
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.lenSquare
     * @description 向量长度平方。
     * @param {Vector2} v - 向量。
     * @return {number} 向量长度平方。
     */
    lenSquare(v) {
        return v[0] * v[0] + v[1] * v[1];
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.mul
     * @description 向量乘法。
     * @param {Vector2} out - 基础向量。
     * @param {Vector2} v1 - 向量 v1。
     * @param {Vector2} v2 - 向量 v2。
     * @return {Vector2} 结果。
     */
    mul(out, v1, v2) {
        out[0] = v1[0] * v2[0];
        out[1] = v1[1] * v2[1];
        return out;
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.div
     * @description 向量除法。
     *
     * @param {Vector2} out - 基础向量。
     * @param {Vector2} v1 - 向量 v1。
     * @param {Vector2} v2 - 向量 v2。
     * @return {Vector2} 结果。
     */
    div(out, v1, v2) {
        out[0] = v1[0] / v2[0];
        out[1] = v1[1] / v2[1];
        return out;
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.dot
     * @description 向量点乘。
     *
     * @param  {Vector2} v1 - 向量 v1。
     * @param  {Vector2} v2 - 向量 v2。
     * @return {number} 向量点乘。
     */
    dot(v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1];
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.scale
     * @description 向量缩放。
     *
     * @param {Vector2} out - 基础向量。
     * @param {Vector2} v - 向量v。
     * @param {number} s -缩放参数。
     * @return {Vector2} 结果。
     */
    scale(out, v, s) {
        out[0] = v[0] * s;
        out[1] = v[1] * s;
        return out;
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.normalize
     * @description 向量归一化。
     *
     * @param {Vector2} out - 基础向量。
     * @param {Vector2} v - 向量 v。
     * @return {Vector2} 结果。
     */
    normalize(out, v) {
        var d = this.len(v);
        if (d === 0) {
            out[0] = 0;
            out[1] = 0;
        } else {
            out[0] = v[0] / d;
            out[1] = v[1] / d;
        }
        return out;
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.distance
     * @description 计算向量间距离。
     *
     * @param {Vector2} v1 - 向量 v1。
     * @param {Vector2} v2 - 向量 v2。
     * @return {number} 向量间距离。
     */
    distance(v1, v2) {
        return Math.sqrt(
            (v1[0] - v2[0]) * (v1[0] - v2[0])
            + (v1[1] - v2[1]) * (v1[1] - v2[1])
        );
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.distanceSquare
     * @description 向量距离平方。
     *
     * @param {Vector2} v1 - 向量 v1。
     * @param {Vector2} v2 - 向量 v2。
     * @return {number} 向量距离平方。
     */
    distanceSquare(v1, v2) {
        return (v1[0] - v2[0]) * (v1[0] - v2[0])
            + (v1[1] - v2[1]) * (v1[1] - v2[1]);
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.negate
     * @description 求负向量。
     *
     * @param {Vector2} out - 基础向量。
     * @param {Vector2} v - 向量 v。
     * @return {Vector2} 负向量。
     */
    negate(out, v) {
        out[0] = -v[0];
        out[1] = -v[1];
        return out;
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.lerp
     * @description 两点之间线性插值。
     *
     * @param {Vector2} out - 基础向量。
     * @param {Vector2} v1 - 向量 v1。
     * @param {Vector2} v2 - 向量 v2。
     * @param {number} t
     * @return {Vector2} 结果。
     */
    lerp(out, v1, v2, t) {
        out[0] = v1[0] + t * (v2[0] - v1[0]);
        out[1] = v1[1] + t * (v2[1] - v1[1]);
        return out;
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.applyTransform
     * @description 矩阵左乘向量。
     *
     * @param {Vector2} out - 基础向量。
     * @param {Vector2} v1 - 向量 v1。
     * @param {Vector2} v2 - 向量 v2。
     * @return {Vector2} 结果。
     */
    applyTransform(out, v, m) {
        var x = v[0];
        var y = v[1];
        out[0] = m[0] * x + m[2] * y + m[4];
        out[1] = m[1] * x + m[3] * y + m[5];
        return out;
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.min
     * @description 求两个向量最小值。
     * @param {Vector2} out - 基础向量。
     * @param {Vector2} v1 - 向量 v1。
     * @param {Vector2} v2 - 向量 v2。
     * @return {Vector2} 结果。
     */
    min(out, v1, v2) {
        out[0] = Math.min(v1[0], v2[0]);
        out[1] = Math.min(v1[1], v2[1]);
        return out;
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.max
     * @description 求两个向量最大值。
     *
     * @param {Vector2} out - 基础向量。
     * @param {Vector2} v1 - 向量 v1。
     * @param {Vector2} v2 - 向量 v2。
     * @return {Vector2} 结果。
     */
    max(out, v1, v2) {
        out[0] = Math.max(v1[0], v2[0]);
        out[1] = Math.max(v1[1], v2[1]);
        return out;
    }


    /**
     * @function LevelRenderer.Tool.Vector.prototype.length
     * @description 向量长度。
     *
     * @param {Vector2} v - 向量。
     * @return {number} 向量长度。
     */
    length(v) {
        return this.len(v);
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.lengthSquare
     * @description 向量长度平方。
     *
     * @param {Vector2} v - 向量。
     * @return {number} 向量长度平方。
     */
    lengthSquare(v) {
        return this.lenSquare(v);
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.dist
     * @description 计算向量间距离。
     *
     * @param {Vector2} v1 - 向量 v1。
     * @param {Vector2} v2 - 向量 v2。
     * @return {number} 向量间距离。
     */
    dist(v1, v2) {
        return this.distance(v1, v2);
    }

    /**
     * @function LevelRenderer.Tool.Vector.prototype.distSquare
     * @description 向量距离平方。
     *
     * @param {Vector2} v1 - 向量 v1。
     * @param {Vector2} v2 - 向量 v2。
     * @return {number} 向量距离平方
     */
    distSquare(v1, v2) {
        return this.distanceSquare(v1, v2);
    }

}
