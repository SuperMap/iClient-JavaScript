/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Animation.Clip
 * 动画片段
 *
 */
SuperMap.LevelRenderer.Animation.Clip = SuperMap.Class({


    /**
     * 动画主控制器
     * @config target
     * @config life(1000)
     * @config delay(0)
     * @config loop(true)
     * @config gap(0)
     * @config onframe
     * @config easing(optional)
     * @config ondestroy(optional)
     * @config onrestart(optional)
     */


    /**
     * Constructor: SuperMap.LevelRenderer.Animation.Clip
     * 构造函数。
     *
     *
     * Parameters:
     * options - {Object} 可选参数：
     *
     * Symbolizer properties:
     * target - {Object} 动画对象，可以是数组，如果是数组的话会批量分发 onframe 等事件。
     * life - {Number} 动画时长，默认值：1000。
     * delay - {Number}  动画延迟时间。默认值：0。
     * loop - {Boolean}  是否循环，默认值：true。
     * gap - {Number}  循环的间隔时间。默认值：0。
     * onframe - {Object}  帧。
     * easing - {Boolean}
     * ondestroy - {Boolean}
     * onrestart - {Boolean}
     *
     */
    initialize: function(options) {
        this._targetPool = options.target || {};
        if (!(this._targetPool instanceof Array)) {
            this._targetPool = [ this._targetPool ];
        }

        // 生命周期
        this._life = options.life || 1000;
        // 延时
        this._delay = options.delay || 0;
        // 开始时间
        this._startTime = new Date().getTime() + this._delay;// 单位毫秒

        // 结束时间
        this._endTime = this._startTime + this._life * 1000;

        // 是否循环
        this.loop = typeof options.loop == 'undefined'
            ? false : options.loop;

        this.gap = options.gap || 0;

        this.easing = options.easing || 'Linear';

        this.onframe = options.onframe;
        this.ondestroy = options.ondestroy;
        this.onrestart = options.onrestart;
    },

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy: function() {

    },

    step: function (time) {
        var Easing = new SuperMap.LevelRenderer.Animation.easing();
        var percent = (time - this._startTime) / this._life;

        // 还没开始
        if (percent < 0) {
            return;
        }

        percent = Math.min(percent, 1);

        var easingFunc = typeof this.easing == 'string'
            ? Easing[this.easing]
            : this.easing;
        var schedule = typeof easingFunc === 'function'
            ? easingFunc(percent)
            : percent;

        this.fire('frame', schedule);

        // 结束
        if (percent == 1) {
            if (this.loop) {
                this.restart();
                // 重新开始周期
                // 抛出而不是直接调用事件直到 stage.update 后再统一调用这些事件
                return 'restart';

            }

            // 动画完成将这个控制器标识为待删除
            // 在Animation.update中进行批量删除
            this._needsRemove = true;
            return 'destroy';
        }

        return null;
    },

    restart: function() {
        var time = new Date().getTime();
        var remainder = (time - this._startTime) % this._life;
        this._startTime = new Date().getTime() - remainder + this.gap;
    },

    fire: function(eventType, arg) {
        for (var i = 0, len = this._targetPool.length; i < len; i++) {
            if (this['on' + eventType]) {
                this['on' + eventType](this._targetPool[i], arg);
            }
        }
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Animation.Clip"
});