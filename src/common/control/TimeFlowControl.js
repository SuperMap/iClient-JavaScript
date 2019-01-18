/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {TimeControlBase} from './TimeControlBase';

/**
 * @class SuperMap.TimeFlowControl
 * @classdesc 时间管理类。
 * @category  Control
 * @description 此类只负责时间上的控制，具体执行的操作需要用户在初始化时的回调函数内部进行实现。
 * 如设置起始时间为 1000，结束时间是 2000，步长设置为 1，
 * 那么表示按照每次1年（可以通过 setSpeed 进行修改）的变化从公元 1000 年开始到公元 2000 年为止，默认每 1 秒会 1 次（通过 setFrequency 修改）
 * @extends {SuperMap.TimeControlBase}
 * @param {function} callback - 每次刷新回调函数。具体的效果需要用户在此回调函数里面实现。
 * @param {Object} options - 该类开放的可选属性。
 * @param {number} [options.speed=1] - 步长（单位 ms）。不能小于 0，（每次刷新的数据之间的间隔为 1ms）。
 * @param {number} [options.frequency=1000] - 刷新频率（单位 ms）。
 * @param {number} [options.startTime=0] - 起始时间，必须为数字，且小于等于 endTime。如果不设置，初始化时为 0，建议设置。
 * @param {number} [options.endTime] - 结束时间，必须为数字，且大于等于 startTime。如果不设置，初始化时使用 new Date() 以当前时间进行设置，建议设置。
 * @param {boolean} [options.repeat=true] - 是否重复循环。
 * @param {boolean} [options.reverse=false] - 是否反向。
 */
export class TimeFlowControl extends TimeControlBase {


    constructor(callback, options) {
        super(options);
        var me = this;
        /**
         * @member SuperMap.TimeFlowControl.prototype.callback -{function}
         * @description 每次刷新执行的回调函数。
         */
        me.callback = callback;

        //先让IE下支持bind方法
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (oThis) {
                if (typeof this !== "function") {
                    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                }
                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function () {
                        //empty Function
                    },
                    fBound = function () {
                        return fToBind.apply(this instanceof fNOP && oThis
                            ? this
                            : oThis,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                    };
                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();
                return fBound;
            };
        }
        //保证 this.tick 的上下文还是 TimeControl 这个对象
        me.update = me.update.bind(me);

        me.oldTime = me.currentTime;

        me.CLASS_NAME = "SuperMap.TimeFlowControl";
    }


    /**
     * @function SuperMap.TimeFlowControl.prototype.updateOptions
     * @override
     */
    updateOptions(options) {
        options = options || {};
        super.updateOptions(options);
    }


    /**
     * @function SuperMap.TimeFlowControl.prototype.start
     * @override
     */
    start() {
        var me = this;
        if (me.running) {
            return;
        }
        me.running = true;
        if (me.reverse) {
            if (me.currentTime === me.startTime) {
                me.oldTime = me.endTime;
                me.currentTime = me.oldTime;
            }
        } else {
            if (me.oldTime === me.endTime) {
                me.currentTime = me.startTime;
                me.oldTime = me.currentTime;
            }
        }
        me.tick();
    }


    /**
     * @function SuperMap.TimeFlowControl.prototype.stop
     * @override
     */
    stop() {
        super.stop();
        var me = this;
        me.oldTime = me.currentTime;

        if (me.running) {
            me.running = false;
        }
        //清除定时tick
        me.intervalId && window.clearTimeout(me.intervalId);
    }


    /**
     * @function SuperMap.TimeFlowControl.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.oldTime = null;
        me.callback = null;
    }


    /**
     * @function SuperMap.TimeFlowControl.prototype.tick
     * @description 定时刷新。
     */
    tick() {
        var me = this;
        me.intervalId && window.clearInterval(me.intervalId);
        me.intervalId = null;
        me.update();
        me.intervalId = window.setInterval(me.update, me.frequency);
    }

    /**
     * @function SuperMap.TimeFlowControl.prototype.update
     * @override
     */
    update() {
        var me = this;

        //判定是否还需要继续
        if (!me.running) {
            return;
        }
        //调用回调函数
        me.callback && me.callback(me.currentTime);    //destroy之后callback就为空，所以需要判定一下

        if (!me.reverse) {
            //如果相等，则代表上一帧已经运行到了最后，下一帧运行初始化的状态
            if (me.currentTime === me.endTime) {
                //不循环时
                if (!me.repeat) {
                    me.running = false;
                    me.stop();
                    return null;
                }
                me.stop();
                me.currentTime = me.startTime;
                me.oldTime = me.currentTime;
                me.start();
            } else {//否则时间递增
                me.oldTime = me.currentTime;
                me.currentTime += me.speed;
            }

            if (me.currentTime >= me.endTime) {
                me.currentTime = me.endTime;
            }

        } else {
            //如果相等，则代表上一帧已经运行到了最前，下一帧运行结束的状态
            if (me.currentTime === me.startTime) {
                //不循环时
                if (!me.repeat) {
                    me.running = false;
                    return null;
                }

                me.oldTime = me.endTime;
                me.currentTime = me.oldTime;
            } else {//否则时间递减
                me.currentTime = me.oldTime;
                me.oldTime -= me.speed;
            }

            if (me.oldTime <= me.startTime) {
                me.oldTime = me.startTime;
            }
        }

    }


}

SuperMap.TimeFlowControl = TimeFlowControl;

