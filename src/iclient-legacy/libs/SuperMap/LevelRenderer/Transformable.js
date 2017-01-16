/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Transformable
 * 可变换超类，所有支持 Canvas Transform 变换操作的类均是此类的子类。
 *
 * 此类不可实例化。
 *
 */
SuperMap.LevelRenderer.Transformable = SuperMap.Class({

    /**
     * APIProperty: position
     * {Array{Number}} 平移， 默认值：[0, 0]。
     */
    position: null,

    /**
     * APIProperty: rotation
     * {Array{Number}} 旋转，可以通过数组二三项指定旋转的原点， 默认值：[0, 0, 0]。
     */
    rotation: null,

    /**
     * APIProperty: scale
     * {Array{Number}} 缩放，可以通过数组三四项指定缩放的原点， 默认值：[1, 1, 0, 0]。
     */
    scale: null,

    /**
     * Property: needLocalTransform
     * {Boolean} 是否变换。默认值：false。
     */
    needLocalTransform: null,

    /**
     * APIProperty: needTransform
     * {Boolean} 是否有坐标变换。默认值：false。
     */
    needTransform: null,

    /**
     * Constructor: SuperMap.LevelRenderer.Transformable
     * 构造函数。
     */
    initialize: function() {
        if(!this.position){
            this.position = [ 0, 0 ];
        }

        if(!this.rotation){
            this.rotation = [ 0, 0, 0 ];
        }
        /*
         if(typeof(this.rotation) == 'undefined'){
         this.rotation = [ 0, 0, 0 ];
         }
         */

        if(!this.scale){
            this.scale = [ 1, 1, 0, 0 ];
        }

        this.needLocalTransform = false;

        this.needTransform = false;
    },

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy: function() {
        this.position = null;
        this.rotation = null;
        this.scale = null;
        this.needLocalTransform = null;
        this.needTransform = null;
    },

    /**
     * Method: updateNeedTransform
     * 更新  needLocalTransform
     *
     */
    updateNeedTransform: function () {
        this.needLocalTransform = isNotAroundZero(this.rotation[0])
            ||  isNotAroundZero(this.position[0])
            ||  isNotAroundZero(this.position[1])
            ||  isNotAroundZero(this.scale[0] - 1)
            ||  isNotAroundZero(this.scale[1] - 1);

        function isNotAroundZero(val) {var EPSILON = 5e-5; return val > EPSILON || val < -EPSILON;}
    },

    /**
     * APIMethod: updateTransform
     * 判断是否需要有坐标变换，更新 needTransform 属性。
     * 如果有坐标变换, 则从 position, rotation, scale 以及父节点的 transform 计算出自身的 transform 矩阵
     *
     */
    updateTransform: function () {
        this.updateNeedTransform();

        if (this.parent) {
            this.needTransform = this.needLocalTransform || this.parent.needTransform;
        }
        else {
            this.needTransform = this.needLocalTransform;
        }

        if (!this.needTransform) {
            return;
        }

        var origin = [ 0, 0 ];

        var m = this.transform || SuperMap.LevelRenderer.Util_matrix.create();
        SuperMap.LevelRenderer.Util_matrix.identity(m);

        if (this.needLocalTransform) {
            if (
                isNotAroundZero(this.scale[0])
                    || isNotAroundZero(this.scale[1])
                ) {
                origin[0] = -this.scale[2] || 0;
                origin[1] = -this.scale[3] || 0;
                var haveOrigin = isNotAroundZero(origin[0])
                    || isNotAroundZero(origin[1]);
                if (haveOrigin) {
                    SuperMap.LevelRenderer.Util_matrix.translate(
                        m, m, origin
                    );
                }
                SuperMap.LevelRenderer.Util_matrix.scale(m, m, this.scale);
                if (haveOrigin) {
                    origin[0] = -origin[0];
                    origin[1] = -origin[1];
                    SuperMap.LevelRenderer.Util_matrix.translate(
                        m, m, origin
                    );
                }
            }

            if (this.rotation instanceof Array) {
                if (this.rotation[0] !== 0) {
                    origin[0] = -this.rotation[1] || 0;
                    origin[1] = -this.rotation[2] || 0;
                    var haveOrigin = isNotAroundZero(origin[0])
                        || isNotAroundZero(origin[1]);
                    if (haveOrigin) {
                        SuperMap.LevelRenderer.Util_matrix.translate(
                            m, m, origin
                        );
                    }
                    SuperMap.LevelRenderer.Util_matrix.rotate(m, m, this.rotation[0]);
                    if (haveOrigin) {
                        origin[0] = -origin[0];
                        origin[1] = -origin[1];
                        SuperMap.LevelRenderer.Util_matrix.translate(
                            m, m, origin
                        );
                    }
                }
            }
            else {
                if (this.rotation !== 0) {
                    SuperMap.LevelRenderer.Util_matrix.rotate(m, m, this.rotation);
                }
            }

            if (
                isNotAroundZero(this.position[0]) || isNotAroundZero(this.position[1])
                ) {
                SuperMap.LevelRenderer.Util_matrix.translate(m, m, this.position);
            }
        }

        // 保存这个变换矩阵
        this.transform = m;

        // 应用父节点变换
        if (this.parent && this.parent.needTransform) {
            if (this.needLocalTransform) {
                SuperMap.LevelRenderer.Util_matrix.mul(this.transform, this.parent.transform, this.transform);
            }
            else {
                SuperMap.LevelRenderer.Util_matrix.copy(this.transform, this.parent.transform);
            }
        }

        function isNotAroundZero(val) {var EPSILON = 5e-5; return val > EPSILON || val < -EPSILON;}
    },

    /**
     * APIMethod: setTransform
     * 将自己的 transform 应用到 context 上。
     *
     * Parameters:
     * ctx - {Context2D} Context2D 上下文。
     */
    setTransform: function (ctx) {
        if (this.needTransform) {
            var m = this.transform;
            ctx.transform(
                m[0], m[1],
                m[2], m[3],
                m[4], m[5]
            );
        }
    },

    /**
     * APIMethod: lookAt
     * 设置图形的朝向。
     *
     */
    lookAt: (function () {
        var v = SuperMap.LevelRenderer.Util_vector.create();
        // {Array{Number}|Float32Array} target
        return function(target) {
            if (!this.transform) {
                this.transform = SuperMap.LevelRenderer.Util_matrix.create();
            }
            var m = this.transform;
            SuperMap.LevelRenderer.Util_vector.sub(v, target, this.position);
            if (isAroundZero(v[0]) && isAroundZero(v[1])) {
                return;
            }
            SuperMap.LevelRenderer.Util_vector.normalize(v, v);
            // Y Axis
            // TODO Scale origin ?
            m[2] = v[0] * this.scale[1];
            m[3] = v[1] * this.scale[1];
            // X Axis
            m[0] = v[1] * this.scale[0];
            m[1] = -v[0] * this.scale[0];
            // Position
            m[4] = this.position[0];
            m[5] = this.position[1];

            this.decomposeTransform();

            function isAroundZero(val) {var EPSILON = 5e-5; return val > -EPSILON && val < EPSILON;}
        };
    })(),

    /**
     * APIMethod: decomposeTransform
     * 分解`transform`矩阵到`position`, `rotation`, `scale` 。
     *
     */
    decomposeTransform: function () {
        if (!this.transform) {
            return;
        }
        var m = this.transform;
        var sx = m[0] * m[0] + m[1] * m[1];
        var position = this.position;
        var scale = this.scale;
        var rotation = this.rotation;
        if (isNotAroundZero(sx - 1)) {
            sx = Math.sqrt(sx);
        }
        var sy = m[2] * m[2] + m[3] * m[3];
        if (isNotAroundZero(sy - 1)) {
            sy = Math.sqrt(sy);
        }
        position[0] = m[4];
        position[1] = m[5];
        scale[0] = sx;
        scale[1] = sy;
        scale[2] = scale[3] = 0;
        rotation[0] = Math.atan2(-m[1] / sy, m[0] / sx);
        rotation[1] = rotation[2] = 0;

        function isNotAroundZero(val) {var EPSILON = 5e-5; return val > EPSILON || val < -EPSILON;}
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Transformable"
});