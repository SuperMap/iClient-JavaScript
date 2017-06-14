/**
 * Class: SuperMap.TimeControlBase
 * 时间控制基类类。
 */
var SuperMap = require('../SuperMap');
SuperMap.TimeControlBase = SuperMap.Class({

    /**
     * Property: speed
     * {Number} 步长，必须为非负数，默认为1
     * （表示前后两次渲染的数据之间的间隔为1）
     */
    speed: 1,

    /**
     *  Property: frequency
     * {Number}刷新频率(单位ms)，服务器刷新的时间间隔，默认为1s
     */
    frequency: 1000,
    /**
     * Property: startTime
     * {Number} 记录的起始时间，必须为数字，
     * 如果不设置，初始化时为0，建议设置
     */
    startTime: null,
    /**
     * Property: endTime
     * {Number} 记录的结束时间，必须为数字，
     * 如果不设置，初始化时以当前时间进行设置，建议设置
     */
    endTime: null,
    /**
     * Property: repeat
     * {Boolean} 是否重复循环，默认为true。
     */
    repeat: true,
    /**
     * Property: currentTime
     * {Number} 记录近期的时间，也就是当前帧运行到的时间。
     */
    currentTime: null,

    /**
     * Property: oldTime
     * {Number} 记录上一帧的时间，也就是之前运行到的时间。
     */
    oldTime: null,
    /**
     * Property: running
     * {Boolean} 记录当前是否处于中，默认为false。
     */
    running: false,

    /**
     * Property: reverse
     * {Boolean} 是否反向，默认为false。
     */
    reverse: false,

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     *
     */
    EVENT_TYPES: ["start", "pause", "stop"],
    /**
     * APIProperty: events
     * {<SuperMap.Events>}
     */
    events: null,

    /**
     * Parameters:
     * options - {Object} 该类开放的可选属性。
     *
     * Allowed options properties:
     * speed - {Number} 速度。不能小于0，默认为1（表示每帧渲染的数据之间的间隔为1），设置越大速度越快。
     * startTime - {Number} 的起始时间，必须为数字，且小于等于endTime。如果不设置，初始化时为0，建议设置。
     * endTime - {Number} 的结束时间，必须为数字，且大于等于startTime。如果不设置，初始化时以当前时间进行设置，建议设置。
     * repeat - {Boolean} 是否重复循环。默认为true。
     * reverse - {Boolean} 是否反向。默认为false。
     * geoFence - {SuperMap.Geometry} 地理围栏。
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
     *
     * APIMethod: start
     * 开始
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
     * APIMethod: pause
     * 暂停
     */
    pause: function () {
        var me = this;
        me.running = false;
        me.events.triggerEvent('pause', me.currentTime);
    },


    /**
     * APIMethod: stop
     * 停止，停止后返回起始状态
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
     * APIMethod: toggle
     * 开关切换，切换的是开始和暂停
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
     * APIMethod: setSpeed
     * 设置步长。
     *
     * Parameters:
     * speed - {Number} 步长，必须为非负数，默认为1
     *
     * Returns:
     * {Boolean} true代表设置成功，false设置失败（speed小于0时失败）
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
     * APIMethod: getSpeed
     * 获取步长。
     *
     * Returns:
     * {Number} 返回当前的步长
     */
    getSpeed: function () {
        return this.speed;
    },

    /**
     * APIMethod: setFrequency
     * 设置刷新频率。
     *
     * Parameters:
     * speed - {Number} 刷新频率，单位为ms，默认为1s
     *
     * Returns:
     * {Boolean} true代表设置成功，false设置失败（frequency小于0时失败）
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
     * APIMethod: getFrequency
     * 获取刷新频率。
     *
     * Returns:
     * {Number} 返回当前的刷新频率
     */
    getFrequency: function () {
        return this.frequency;
    },


    /**
     * APIMethod: setStartTime
     * 设置起始时间，设置完成后如果当前时间小于起始时间，则从起始时间开始
     *
     * Parameters:
     * startTime - {Number} 需要设置的起始时间
     *
     * Returns:
     * {Boolean} true代表设置成功，false设置失败（startTime 大于结束时间时失败）
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
     * APIMethod: getStartTime
     * 获取起始时间
     *
     * Returns:
     * {Number} 返回当前的起始时间
     */
    getStartTime: function () {
        return this.startTime;
    },

    /**
     * APIMethod: setEndTime
     * 设置结束时间，设置完成后如果当前时间大于结束，则从起始时间开始
     *
     * Parameters:
     * endTime - {Number} 需要设置的结束时间
     *
     * Returns:
     * {Boolean} true代表设置成功，false设置失败（endTime 小于开始时间时失败）
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
     * APIMethod: getEndTime
     * 获取结束时间
     *
     * Returns:
     * {Number} 返回当前的结束时间
     */
    getEndTime: function () {
        return this.endTime;
    },

    /**
     * APIMethod: setCurrentTime
     * 设置当前时间
     *
     * Parameters:
     * currentTime - {Number} 需要设置的当前时间
     *
     * Returns:
     * {Boolean} true代表设置成功，false设置失败
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
     * APIMethod: getCurrentTime
     * 获取当前时间
     *
     * Returns:
     * {Number} 返回当前时间
     */
    getCurrentTime: function () {
        return this.currentTime;
    },


    /**
     * APIMethod: setRepeat
     * 设置是否重复循环
     *
     * Parameters:
     * repeat - {Boolean} 是否重复循环
     */
    setRepeat: function (repeat) {
        this.repeat = repeat;
    },

    /**
     * APIMethod: getRepeat
     * 获取是否重复循环，默认是true。
     *
     * Returns:
     * {Boolean} 返回是否重复循环
     */
    getRepeat: function () {
        return this.repeat;
    },

    /**
     * APIMethod: setReverse
     * 设置是否反向
     *
     * Parameters:
     * reverse - {Boolean} 是否反向
     */
    setReverse: function (reverse) {
        this.reverse = reverse;
    },


    /**
     * APIMethod: getReverse
     * 获取是否反向，默认是false。
     *
     * Returns:
     * {Boolean} 返回是否反向
     */
    getReverse: function () {
        return this.reverse;
    },


//获取运行状态，Boolean类型
    /**
     * APIMethod: getRunning
     * 获取运行状态
     *
     * Returns:
     * {Boolean} true代表正在运行，false发表没有运行
     */
    getRunning: function () {
        return this.running;
    },

    /**
     * APIMethod: destroy
     * 销毁Animator对象，释放资源。
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

