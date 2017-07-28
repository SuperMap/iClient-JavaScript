var SuperMap = require('../SuperMap');

/**
 * @class SuperMap.TimeControlBase
 * @description 时间控制基类类。
 * @param options - {Object} 该类开放的可选属性。如：<br>
 *        speed - {Number} 速度。不能小于0，默认为1（表示每帧渲染的数据之间的间隔为1），设置越大速度越快。<br>
 *        startTime - {Number} 的起始时间，必须为数字，且小于等于endTime。如果不设置，初始化时为0，建议设置。<br>
 *        endTime - {Number} 的结束时间，必须为数字，且大于等于startTime。如果不设置，初始化时以当前时间进行设置，建议设置。<br>
 *        repeat - {Boolean} 是否重复循环。默认为true。<br>
 *        reverse - {Boolean} 是否反向。默认为false。<br>
 *        geoFence - {SuperMap.Geometry} 地理围栏。
 */
SuperMap.TimeControlBase = SuperMap.Class({

    /**
     * @member SuperMap.TimeControlBase.prototype.speed -{Number}
     * @description 步长，必须为非负数，默认为1（表示前后两次渲染的数据之间的间隔为1）
     */
    speed: 1,

    /**
     * @member SuperMap.TimeControlBase.prototype.frequency -{Number}
     * @description 刷新频率(单位ms)，服务器刷新的时间间隔，默认为1s
     */
    frequency: 1000,

    /**
     * @member SuperMap.TimeControlBase.prototype.startTime -{Number}
     * @description 记录的起始时间，必须为数字，
     *              如果不设置，初始化时为0，建议设置
     */
    startTime: null,

    /**
     * @member SuperMap.TimeControlBase.prototype.endTime -{Number}
     * @description 记录的结束时间，必须为数字，
     *              如果不设置，初始化时以当前时间进行设置，建议设置
     */
    endTime: null,

    /**
     * @member SuperMap.TimeControlBase.prototype.repeat -{Boolean}
     * @description 是否重复循环，默认为true。
     */
    repeat: true,

    /**
     * @member SuperMap.TimeControlBase.prototype.currentTime -{Number}
     * @description 记录近期的时间，也就是当前帧运行到的时间。
     */
    currentTime: null,

    /**
     * @member SuperMap.TimeControlBase.prototype.oldTime -{Number}
     * @description 记录上一帧的时间，也就是之前运行到的时间。
     */
    oldTime: null,

    /**
     * @member SuperMap.TimeControlBase.prototype.running -{Boolean}
     * @description 记录当前是否处于中，默认为false。
     */
    running: false,

    /**
     * @member SuperMap.TimeControlBase.prototype.reverse -{Boolean}
     * @description 是否反向，默认为false。
     */
    reverse: false,

    /*
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     *
     */
    EVENT_TYPES: ["start", "pause", "stop"],

    /**
     * @member SuperMap.TimeControlBase.prototype.events -{SuperMap.Events}
     * @description 事件
     */
    events: null,

    /**
     * @function SuperMap.TimeControlBase.prototype.initialize
     * @description 时间控制基类得构造函数。
     * @param options - {Object} 该类开放的可选属性。如：<br>
     *        speed - {Number} 速度。不能小于0，默认为1（表示每帧渲染的数据之间的间隔为1），设置越大速度越快。<br>
     *        startTime - {Number} 的起始时间，必须为数字，且小于等于endTime。如果不设置，初始化时为0，建议设置。<br>
     *        endTime - {Number} 的结束时间，必须为数字，且大于等于startTime。如果不设置，初始化时以当前时间进行设置，建议设置。<br>
     *        repeat - {Boolean} 是否重复循环。默认为true。<br>
     *        reverse - {Boolean} 是否反向。默认为false。<br>
     *        geoFence - {SuperMap.Geometry} 地理围栏。
     */
    initialize: function (options) {
        //设置步长，刷新频率、开始结束时间、是否循环、是否反向
        var me = this;
        options = options || {};
        me.speed = ( options.speed && options.speed >= 0) ? options.speed : me.speed;
        me.frequency = (options.speed && options.frequency >= 0) ? options.frequency : me.frequency;
        me.startTime = ((options.startTime && options.startTime != null)) ? options.startTime : 0;
        me.endTime = ( (options.endTime && options.endTime != null && options.endTime >= me.startTime)) ? options.endTime : +new Date();
        me.repeat = ( options.repeat != undefined) ? options.repeat : me.repeat;
        me.reverse = (options.reverse != undefined) ? options.reverse : me.reverse;

        me.speed = Number(me.speed);
        me.frequency = Number(me.frequency);
        me.startTime = Number(me.startTime);
        me.endTime = Number(me.endTime);

        me.events = new SuperMap.Events(this, null, this.EVENT_TYPES);
        me.startTime = Date.parse(new Date(this.startTime));
        me.endTime = Date.parse(new Date(this.endTime));

        //初始化处于非运行阶段
        me.running = false;

        //初始化当前时间
        me.currentTime = me.startTime;
    },

    /**
     * @function SuperMap.TimeControlBase.prototype.updateOptions
     * @param options - {Object} 设置参数得可选参数。设置步长，刷新频率、开始结束时间、是否循环、是否反向。
     */
    updateOptions: function (options) {
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
    },

    /**
     * @function SuperMap.TimeControlBase.prototype.start
     * @description 开始
     */
    start: function () {
        var me = this;

        if (!me.running) {
            me.running = true;
            me.tick();
            me.events.triggerEvent('start', me.currentTime);
        }
    },


    /**
     * @function SuperMap.TimeControlBase.prototype.pause
     * @description 暂停
     */
    pause: function () {
        var me = this;
        me.running = false;
        me.events.triggerEvent('pause', me.currentTime);
    },


    /**
     * @function SuperMap.TimeControlBase.prototype.stop
     * @description 停止，停止后返回起始状态
     */
    stop: function () {
        var me = this;
        //停止时 时间设置为开始时间
        me.currentTime = me.startTime;
        //如果正在运行，修改为初始时间即可绘制一帧
        if (me.running) {
            me.running = false;
        }
        me.events.triggerEvent('stop', me.currentTime);
    },


    /**
     * @function SuperMap.TimeControlBase.prototype.toggle
     * @description 开关切换，切换的是开始和暂停
     */
    toggle: function () {
        var me = this;
        if (!connect) {
            return false;
        }
        if (me.running) {
            me.pause();
        } else {
            me.start();
        }
    },


    /**
     * @function SuperMap.TimeControlBase.prototype.setSpeed
     * @description 设置步长。
     * @param speed - {Number} 步长，必须为非负数，默认为1
     * @return {Boolean} true代表设置成功，false设置失败（speed小于0时失败）
     */
    setSpeed: function (speed) {
        var me = this;
        if (speed >= 0) {
            me.speed = speed;
            return true;
        }
        return false;
    },

    /**
     * @function SuperMap.TimeControlBase.prototype.getSpeed
     * @description 获取步长。
     * @return {Number} 返回当前的步长
     */
    getSpeed: function () {
        return this.speed;
    },

    /**
     * @function SuperMap.TimeControlBase.prototype.setFrequency
     * @description 设置刷新频率。
     * @param speed - {Number} 刷新频率，单位为ms，默认为1s
     * @return {Boolean} true代表设置成功，false设置失败（frequency小于0时失败）
     */
    setFrequency: function (frequency) {
        var me = this;
        if (frequency >= 0) {
            me.frequency = frequency;
            return true;
        }
        return false;
    },

    /**
     * @function SuperMap.TimeControlBase.prototype.getFrequency
     * @description 获取刷新频率。
     * @return {Number} 返回当前的刷新频率
     */
    getFrequency: function () {
        return this.frequency;
    },


    /**
     * @function SuperMap.TimeControlBase.prototype.setStartTime
     * @description 设置起始时间，设置完成后如果当前时间小于起始时间，则从起始时间开始
     * @param startTime - {Number} 需要设置的起始时间
     * @return {Boolean} true代表设置成功，false设置失败（startTime 大于结束时间时失败）
     */
    setStartTime: function (startTime) {
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
    },

    /**
     * @function SuperMap.TimeControlBase.prototype.getStartTime
     * @description 获取起始时间
     * @return {Number} 返回当前的起始时间
     */
    getStartTime: function () {
        return this.startTime;
    },

    /**
     * @function SuperMap.TimeControlBase.prototype.setEndTime
     * @description 设置结束时间，设置完成后如果当前时间大于结束，则从起始时间开始
     * @param endTime - {Number} 需要设置的结束时间
     * @return {Boolean} true代表设置成功，false设置失败（endTime 小于开始时间时失败）
     */
    setEndTime: function (endTime) {
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
    },

    /**
     * @function SuperMap.TimeControlBase.prototype.getEndTime
     * @description 获取结束时间
     * @return {Number} 返回当前的结束时间
     */
    getEndTime: function () {
        return this.endTime;
    },

    /**
     * @function SuperMap.TimeControlBase.prototype.setCurrentTime
     * @description 设置当前时间
     * @param currentTime - {Number} 需要设置的当前时间
     * @return {Boolean} true代表设置成功，false设置失败
     */
    setCurrentTime: function (currentTime) {
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
    },

    /**
     * @function SuperMap.TimeControlBase.prototype.getCurrentTime
     * @description 获取当前时间
     * @return {Number} 返回当前时间
     */
    getCurrentTime: function () {
        return this.currentTime;
    },


    /**
     * @function SuperMap.TimeControlBase.prototype.setRepeat
     * @description 设置是否重复循环
     * @param repeat - {Boolean} 是否重复循环
     */
    setRepeat: function (repeat) {
        this.repeat = repeat;
    },

    /**
     * @function SuperMap.TimeControlBase.prototype.getRepeat
     * @description 获取是否重复循环，默认是true。
     * @return {Boolean} 返回是否重复循环
     */
    getRepeat: function () {
        return this.repeat;
    },

    /**
     * @function SuperMap.TimeControlBase.prototype.setReverse
     * @description 设置是否反向
     * @param reverse - {Boolean} 是否反向
     */
    setReverse: function (reverse) {
        this.reverse = reverse;
    },


    /**
     * @function SuperMap.TimeControlBase.prototype.getReverse
     * @description 获取是否反向，默认是false。
     * @return {Boolean} 返回是否反向
     */
    getReverse: function () {
        return this.reverse;
    },


    /**
     * @function SuperMap.TimeControlBase.prototype.getRunning
     * @description 获取运行状态
     * @return {Boolean} true代表正在运行，false发表没有运行
     */
    getRunning: function () {
        return this.running;
    },

    /**
     * @function destroy
     * @description 销毁Animator对象，释放资源。
     */
    destroy: function () {
        var me = this;
        me.speed = null;
        me.frequency = null;
        me.startTime = null;
        me.endTime = null;
        me.currentTime = null;
        me.repeat = null;
        me.running = false;
        me.reverse = null;
    },


    tick: function () {
        //TODO 每次刷新执行的操作。子类实现
    },


    CLASS_NAME: "SuperMap.TimeControlBase"
});
module.exports = SuperMap.TimeControlBase;

