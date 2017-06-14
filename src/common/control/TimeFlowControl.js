/**
 * Class: SuperMap.TimeControl
 * 时间管理类。
 *
 * 此类只负责时间上的控制，具体执行的操作需要用户在初始化时的回调函数内部进行实现。
 *
 * 如设置起始时间为1000，结束时间是2000，步长设置为1，
 * 那么表示按照每次1年（可以通过setSpeed进行修改）的变化从公元1000年开始到公元2000年为止，默认每1秒会1次(通过setFrequency修改)
 */
require('./TimeControlBase');
var SuperMap = require('../SuperMap');
SuperMap.TimeFlowControl = SuperMap.Class(SuperMap.TimeControlBase, {
    /**
     * Property: callback
     * {Function} 每次刷新执行的回调函数
     */
    callback: null,

    /**
     * Parameters:
     * callback - {Function} 每次刷新回调函数，必设属性。具体的效果需要用户在此回调函数里面实现。
     * options - {Object} 该类开放的可选属性。
     *
     * Allowed options properties:
     * speed - {Number} 步长(单位ms)。不能小于0，默认为1（表示每次刷新的数据之间的间隔为1ms）
     * frequency -  {Number} 刷新频率(单位ms)，默认为1000ms。
     * startTime - {Number} 起始时间，必须为数字，且小于等于endTime。如果不设置，初始化时为0，建议设置。
     * endTime - {Number} 结束时间，必须为数字，且大于等于startTime。如果不设置，初始化时以当前时间进行设置，建议设置。
     * repeat - {Boolean} 是否重复循环。默认为true。
     * reverse - {Boolean} 是否反向。默认为false。
     */
    initialize: function (callback, options) {
        var me = this;

        SuperMap.TimeControlBase.prototype.initialize.call(this, options);
        //先让IE下支持bind方法
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (oThis) {
                if (typeof this !== "function") {
                    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                }
                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function () {
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
        //记录回调函数
        me.callback = callback;
    },

    updateOptions: function (options) {
        options = options || {};
        SuperMap.TimeControlBase.prototype.updateOptions.call(this, options);
    },

    /**
     * APIMethod: start
     * 开始
     */
    start: function () {
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
    },

    /**
     * APIMethod: stop
     * 停止，停止后返回起始状态
     */
    stop: function () {
        SuperMap.TimeControlBase.prototype.stop.call(this);
        var me = this;
        me.oldTime = me.currentTime;

        if (me.running) {
            me.running = false;
        }
        //清除定时tick
        me.intervalId && window.clearTimeout(me.intervalId);
    },

    /**
     * APIMethod: destroy
     * 销毁TimeControl对象，释放资源。
     */
    destroy: function () {
        SuperMap.TimeControlBase.prototype.destroy.call(this);
        var me = this;
        me.oldTime = null;
        me.callback = null;
    },


    /**
     * Method: tick
     * 定时刷新
     */
    tick: function () {
        var me = this;
        me.intervalId && window.clearInterval(me.intervalId);
        me.intervalId = null;
        me.intervalId = window.setInterval(me.update, me.frequency);
    },

    /**
     *执行回调，更新时间戳
     */
    update: function () {
        var me = this;

        //判定是否还需要继续
        if (!me.running) {
            return;
        }
        //调用回调函数
        me.callback && me.callback(me.currentTime);    //destroy之后callback就为空，所以需要判定一下

        if (!me.reverse) {
            //如果相等，则代表上一帧已经运行到了最后，下一帧运行初始化的状态
            if (me.oldTime === me.endTime) {
                //不循环时
                if (!me.repeat) {
                    me.running = false;
                    return null;
                }

                me.currentTime = me.startTime;
                me.oldTime = me.currentTime;
                me.stop();
            }
            //否则时间递增
            else {
                me.oldTime = me.currentTime;
                me.currentTime += me.speed;
            }

            if (me.currentTime >= me.endTime) {
                me.currentTime = me.endTime;
            }

        }
        else {
            //如果相等，则代表上一帧已经运行到了最前，下一帧运行结束的状态
            if (me.currentTime === me.startTime) {
                //不循环时
                if (!me.repeat) {
                    me.running = false;
                    return null;
                }

                me.oldTime = me.endTime;
                me.currentTime = me.oldTime;
            }
            //否则时间递减
            else {
                me.currentTime = me.oldTime;
                me.oldTime -= me.speed;
            }

            if (me.oldTime <= me.startTime) {
                me.oldTime = me.startTime;
            }
        }

    },

    CLASS_NAME: "SuperMap.TimeFlowControl"
});

module.exports = SuperMap.TimeFlowControl;

