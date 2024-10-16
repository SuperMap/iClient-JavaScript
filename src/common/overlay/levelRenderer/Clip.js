/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Easing as AEasing} from './Easing';

/**
 * @class  LevelRenderer.Animation.Clip
 * @category Visualization Theme
 * @classdesc 动画片段
 * @param {Object} options - 参数。
 * @param {Object} options.target - 动画对象，可以是数组，如果是数组的话会批量分发 onframe 等事件。
 * @param {number} [options.life=1000] - 动画时长。
 * @param {number} [options.delay=0] - 动画延迟时间。
 * @param {boolean} [options.loop=true] - 是否循环。
 * @param {number} [options.gap=0] - 循环的间隔时间。
 * @param {Object} options.onframe -  帧。
 * @param {boolean} options.easing - 是否消除。
 * @param {boolean} options.ondestroy - 是否销毁。
 * @param {boolean} options.onrestart - 是否重播。
 * @private
 */
export class Clip {
    constructor(options) {
        this._targetPool = options.target || {};
        if (!(this._targetPool instanceof Array)) {
            this._targetPool = [this._targetPool];
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
        this.CLASS_NAME = "SuperMap.LevelRenderer.Animation.Clip";
    }

    /**
     * @function LevelRenderer.Animation.Clip.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {

    }

    step(time) {
        var easing = new AEasing();
        var percent = (time - this._startTime) / this._life;

        // 还没开始
        if (percent < 0) {
            return;
        }

        percent = Math.min(percent, 1);

        var easingFunc = typeof this.easing == 'string'
            ? easing[this.easing]
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
    }

    restart() {
        var time = new Date().getTime();
        var remainder = (time - this._startTime) % this._life;
        this._startTime = new Date().getTime() - remainder + this.gap;
    }

    fire(eventType, arg) {
        for (var i = 0, len = this._targetPool.length; i < len; i++) {
            if (this['on' + eventType]) {
                this['on' + eventType](this._targetPool[i], arg);
            }
        }
    }

}
