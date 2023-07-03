/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Events} from '../commontypes/Events';

/**
 * @class TimeControlBase
 * @deprecatedclass SuperMap.TimeControlBase
 * @classdesc 时间控制基类。
 * @modulecategory Control
 * @category  Control
 * @param {Object} options - 可选参数。
 * @param {number} [options.speed=1] - 速度。不能小于 0，（每帧渲染的数据之间的间隔为1），设置越大速度越快。
 * @param {number} [options.frequency=1000] - 刷新频率（单位 ms），服务器刷新的时间间隔。
 * @param {number} [options.startTime=0] - 起始时间，必须为数字，且小于等于 endTime。如果不设置，初始化时为 0，建议设置。
 * @param {number} [options.endTime] - 结束时间，必须为数字，且大于等于 startTime。如果不设置，初始化时以当前时间进行设置，建议设置。
 * @param {boolean} [options.repeat=true] - 是否重复循环。
 * @param {boolean} [options.reverse=false] - 是否反向。
 * @usage
 */
export class TimeControlBase {


    constructor(options) {
        //设置步长，刷新频率、开始结束时间、是否循环、是否反向
        var me = this;
        options = options || {};


        /**
         * @member {number} [TimeControlBase.prototype.speed=1]
         * @description 步长，必须为非负数，默认为1（表示前后两次渲染的数据之间的间隔为1）。
         */
        this.speed = (options.speed && options.speed >= 0) ? options.speed : 1;

        /**
         * @member {number} [TimeControlBase.prototype.frequency=1000]
         * @description 刷新频率(单位ms)，服务器刷新的时间间隔。
         */
        this.frequency = (options.speed && options.frequency >= 0) ? options.frequency : 1000;

        /**
         * @member {number} [TimeControlBase.prototype.startTime=0]
         * @description 记录的起始时间，必须为数字，
         *              如果不设置，初始化时为0，建议设置。
         */
        this.startTime = (options.startTime && options.startTime != null) ? options.startTime : 0;

        /**
         * @member {number} TimeControlBase.prototype.endTime
         * @description 记录的结束时间，必须为数字，
         *              如果不设置，初始化时以当前时间进行设置，建议设置。
         */
        this.endTime = (options.endTime && options.endTime != null && options.endTime >= me.startTime) ? options.endTime : +new Date();

        /**
         * @member {boolean} [TimeControlBase.prototype.repeat=true]
         * @description 是否重复循环。
         */
        this.repeat = (options.repeat !== undefined) ? options.repeat : true;

        /**
         * @member {boolean} [TimeControlBase.prototype.reverse=false]
         * @description 是否反向。
         */
        this.reverse = (options.reverse !== undefined) ? options.reverse : false;

        /**
         * @member {number} TimeControlBase.prototype.currentTime
         * @description 记录近期的时间，也就是当前帧运行到的时间。
         */
        this.currentTime = null;

        /**
         * @member {number} TimeControlBase.prototype.oldTime
         * @description 记录上一帧的时间，也就是之前运行到的时间。
         */
        this.oldTime = null;

        /**
         * @member {boolean} [TimeControlBase.prototype.running=false]
         * @description 记录当前是否处于运行中。
         */
        this.running = false;


        /**
         * @private
         * @member {Array.<string>} TimeControlBase.prototype.EVENT_TYPES
         * @description 此类支持的事件类型。
         *
         */
        this.EVENT_TYPES = ["start", "pause", "stop"];

        /**
         * @private
         * @member {Events} TimeControlBase.prototype.events
         * @description 事件
         */
        me.events = new Events(this, null, this.EVENT_TYPES);

        me.speed = Number(me.speed);
        me.frequency = Number(me.frequency);
        me.startTime = Number(me.startTime);
        me.endTime = Number(me.endTime);

        me.startTime = Date.parse(new Date(me.startTime));
        me.endTime = Date.parse(new Date(me.endTime));

        //初始化当前时间
        me.currentTime = me.startTime;

        this.CLASS_NAME = "SuperMap.TimeControlBase";
    }


    /**
     * @function TimeControlBase.prototype.updateOptions
     * @description 更新参数。
     * @param {Object} options - 设置参数的可选参数。设置步长，刷新频率、开始结束时间、是否循环、是否反向。
     */
    updateOptions(options) {
        //设置步长，刷新频率、开始结束时间、是否循环、是否反向
        var me = this;
        options = options || {};
        if (options.speed && options.speed >= 0) {
            me.speed = options.speed;
            me.speed = Number(me.speed);
        }

        if (options.speed && options.frequency >= 0) {
            me.frequency = options.frequency;
            me.frequency = Number(me.frequency);
        }

        if (options.startTime && options.startTime != null) {
            me.startTime = options.startTime;
            me.startTime = Date.parse(new Date(me.startTime));
        }

        if (options.endTime && options.endTime != null && options.endTime >= me.startTime) {
            me.endTime = options.endTime;
            me.endTime = Date.parse(new Date(me.endTime));
        }

        if (options.repeat != null) {
            me.repeat = options.repeat;
        }

        if (options.reverse != null) {
            me.reverse = options.reverse;
        }
    }


    /**
     * @function TimeControlBase.prototype.start
     * @description 开始。
     */
    start() {
        var me = this;

        if (!me.running) {
            me.running = true;
            me.tick();
            me.events.triggerEvent('start', me.currentTime);
        }
    }


    /**
     * @function TimeControlBase.prototype.pause
     * @description 暂停。
     */
    pause() {
        var me = this;
        me.running = false;
        me.events.triggerEvent('pause', me.currentTime);
    }


    /**
     * @function TimeControlBase.prototype.stop
     * @description 停止，停止后返回起始状态。
     */
    stop() {
        var me = this;
        //停止时 时间设置为开始时间
        me.currentTime = me.startTime;
        //如果正在运行，修改为初始时间即可绘制一帧
        if (me.running) {
            me.running = false;
        }
        me.events.triggerEvent('stop', me.currentTime);
    }


    /**
     * @function TimeControlBase.prototype.toggle
     * @description 开关切换，切换的是开始和暂停。
     */
    toggle() {
        var me = this;

        if (me.running) {
            me.pause();
        } else {
            me.start();
        }
    }


    /**
     * @function TimeControlBase.prototype.setSpeed
     * @description 设置步长。
     * @param {number} [speed=1] - 步长，必须为非负数。
     * @returns {boolean} true 代表设置成功，false 设置失败（speed 小于 0 时失败）。
     */
    setSpeed(speed) {
        var me = this;
        if (speed >= 0) {
            me.speed = speed;
            return true;
        }
        return false;
    }


    /**
     * @function TimeControlBase.prototype.getSpeed
     * @description 获取步长。
     * @returns {number} 返回当前的步长。
     */
    getSpeed() {
        return this.speed;
    }


    /**
     * @function TimeControlBase.prototype.setFrequency
     * @description 设置刷新频率。
     * @param {number} [frequency=1000] - 刷新频率，单位为 ms。
     * @returns {boolean} true 代表设置成功，false 设置失败（frequency 小于 0 时失败）。
     */
    setFrequency(frequency) {
        var me = this;
        if (frequency >= 0) {
            me.frequency = frequency;
            return true;
        }
        return false;
    }


    /**
     * @function TimeControlBase.prototype.getFrequency
     * @description 获取刷新频率。
     * @returns {number} 返回当前的刷新频率。
     */
    getFrequency() {
        return this.frequency;
    }


    /**
     * @function TimeControlBase.prototype.setStartTime
     * @description 设置起始时间，设置完成后如果当前时间小于起始时间，则从起始时间开始。
     * @param {number} startTime - 需要设置的起始时间。
     * @returns {boolean} true 代表设置成功，false 设置失败（startTime 大于结束时间时失败）。
     */
    setStartTime(startTime) {
        var me = this;
        startTime = Date.parse(new Date(startTime));
        //起始时间不得大于结束时间
        if (startTime > me.endTime) {
            return false;
        }
        me.startTime = startTime;
        //如果当前时间小于了起始时间，则从当前起始时间开始
        if (me.currentTime < me.startTime) {
            me.currentTime = me.startTime;
            me.tick();
        }
        return true;
    }


    /**
     * @function TimeControlBase.prototype.getStartTime
     * @description 获取起始时间。
     * @returns {number} 返回当前的起始时间。
     */
    getStartTime() {
        return this.startTime;
    }


    /**
     * @function TimeControlBase.prototype.setEndTime
     * @description 设置结束时间，设置完成后如果当前时间大于结束，则从起始时间开始。
     * @param {number} endTime - 需要设置的结束时间。
     * @returns {boolean} true 代表设置成功，false 设置失败（endTime 小于开始时间时失败）。
     */
    setEndTime(endTime) {
        var me = this;
        me.endTime = Date.parse(new Date(me.endTime));
        //结束时间不得小于开始时间
        if (endTime < me.startTime) {
            return false;
        }
        me.endTime = endTime;
        //如果当前时间大于了结束时间，则从起始时间开始
        if (me.currentTime >= me.endTime) {
            me.currentTime = me.startTime;
            me.tick();
        }
        return true;
    }


    /**
     * @function TimeControlBase.prototype.getEndTime
     * @description 获取结束时间。
     * @returns {number} 返回当前的结束时间。
     */
    getEndTime() {
        return this.endTime;
    }


    /**
     * @function TimeControlBase.prototype.setCurrentTime
     * @description 设置当前时间。
     * @param {number} currentTime - 需要设置的当前时间。
     * @returns {boolean} true 代表设置成功，false 设置失败。
     */
    setCurrentTime(currentTime) {
        var me = this;
        me.currentTime = Date.parse(new Date(me.currentTime));
        //结束时间不得小于开始时间
        if (currentTime >= me.startTime && currentTime <= me.endTime) {
            me.currentTime = currentTime;
            me.startTime = me.currentTime;
            me.tick();
            return true;
        }
        return false;
    }


    /**
     * @function TimeControlBase.prototype.getCurrentTime
     * @description 获取当前时间。
     * @returns {number} 返回当前时间。
     */
    getCurrentTime() {
        return this.currentTime;
    }


    /**
     * @function TimeControlBase.prototype.setRepeat
     * @description 设置是否重复循环。
     * @param {boolean} [repeat=true] - 是否重复循环。
     */
    setRepeat(repeat) {
        this.repeat = repeat;
    }


    /**
     * @function TimeControlBase.prototype.getRepeat
     * @description 获取是否重复循环，默认是 true。
     * @returns {boolean} 返回是否重复循环。
     */
    getRepeat() {
        return this.repeat;
    }


    /**
     * @function TimeControlBase.prototype.setReverse
     * @description 设置是否反向。
     * @param {boolean} [reverse=false] - 是否反向。
     */
    setReverse(reverse) {
        this.reverse = reverse;
    }


    /**
     * @function TimeControlBase.prototype.getReverse
     * @description 获取是否反向，默认是false。
     * @returns {boolean} 返回是否反向。
     */
    getReverse() {
        return this.reverse;
    }


    /**
     * @function TimeControlBase.prototype.getRunning
     * @description 获取运行状态。
     * @returns {boolean} true 代表正在运行，false 发表没有运行。
     */
    getRunning() {
        return this.running;
    }


    /**
     * @function TimeControlBase.prototype.destroy
     * @description 销毁 Animator 对象，释放资源。
     */
    destroy() {
        var me = this;
        me.speed = null;
        me.frequency = null;
        me.startTime = null;
        me.endTime = null;
        me.currentTime = null;
        me.repeat = null;
        me.running = false;
        me.reverse = null;
    }


    tick() {
        //TODO 每次刷新执行的操作。子类实现
    }

}

