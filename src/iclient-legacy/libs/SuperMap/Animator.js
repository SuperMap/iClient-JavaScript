/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.Animator
 * 动画管理类。
 *
 * 通过浏览器帧（浏览器固定每秒会渲染60帧）的概念，实现对用户动画进行播放、停止等操作。
 * 此类只负责时间上的控制，具体动画效果需要用户在初始化时的回调函数内部进行实现。
 *
 * 注1：动画里面的时间没有单位的约束，唯一需要遵守的就是开始时间和结束时间必须为数字，
 * 并且开始时间需要小于等于结束时间，例如如下方式：
 * 用户数据可能是公元1000年到2000年某地区某物的变化，数据值精确到年，
 * 那么在存储数据时就可以直接在数据库存放1000到2000的数字，此时单位等价于是年，
 * 在客户端设置起始时间为1000，结束时间是2000，速度设置为1，
 * 那么表示动画按照每次播放1年（可以通过setSpeed进行修改）的变化从公元1000年开始到公元2000年为止，默认每1秒会播放60次（即60年的数据，可以通过 setFrameRate 修改每秒播放次数），
 * 播放完所有数据总共需要1000/60秒，即16.67秒。
 *
 * 注2：setSpeed()方法可以修改播放速度，即修改的是每次播放的数据之间的时间间隔，指在用户的数据之间没两次播放的时间跳跃，
 * 如上举例中 setSpeed(10)，则表示每次播放10年的数据； setFrameRate()方法可以修改帧率，表示修改每秒播放的次数，如上例
 * 中  setFrameRate(1)，则表示每秒播放一次，那么每次播放10年，播放完1000-2000年就需要100秒。
 */
SuperMap.Animator = SuperMap.Class({
    /**
     * Property: callback
     * {Function} 记录当前初始化动画管理器时的回调函数，用于在每帧绘制要素时调用。
     */
    callback:null,
    /**
     * Property: speed
     * {Number} 记录播放速度，必须为非负数，默认为1
     * （表示前后两次渲染的数据之间的间隔为1），设置越大时间跳跃越快。
     */
    speed:1,
    /**
     * Property: startTime
     * {Number} 记录播放的起始时间，必须为数字，
     * 如果不设置，初始化时为0，建议设置
     */
    startTime:null,//记录整个features里面最小的时间
    /**
     * Property: endTime
     * {Number} 记录播放的结束时间，必须为数字，
     * 如果不设置，初始化时以当前时间进行设置，建议设置
     */
    endTime:null,//记录整个features里面最大的时间
    /**
     * Property: repeat
     * {Boolean} 是否重复循环播放，默认为true。
     */
    repeat:true,
    /**
     * Property: currentTime
     * {Number} 记录近期的时间，也就是当前帧运行到的时间。
     */
    currentTime:null,
    /**
     * Property: oldTime
     * {Number} 记录上一帧的时间，也就是之前运行到的时间。
     */
    oldTime:null,
    /**
     * Property: running
     * {Boolean} 记录当前是否处于动画播放中，默认为false。
     */
    running:false,
    /**
     * Property: reverse
     * {Boolean} 是否反向播放，默认为false。
     */
    reverse:false,
    /**
     * Property: frameRate
     * {Number} 帧率，表示每秒播放的动画的次数，默认为60，即每秒播放60次。
     * 由于浏览器每秒渲染60帧是固定的，所以我们只能设置每秒播放的次为小于等于60，
     * 大于等于0的正数。
     *
     * 比如：设置 frameRate = 30，表示每秒播放动画30次，也就是浏览每渲染两帧，动画播放一次；
     * 如果希望动画播放很慢，可以设置为如 frameRate = 1/7,表示每秒播放1/7次，也就是每7秒播放一次
     *
     */
    frameRate:60,
    /**
     * Property: frame
     * {Number} 记录距离上一次渲染浏览器播放了多少帧，内部使用。
     */
    frame:0,
    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *drawfeaturestart* 每次绘制在当前时间节点内的feature时触发。
     *
     */
    EVENT_TYPES: ["start", "pause", "stop", "framestart","frameend","firstframestart","lastframestart"],
    /**
     * APIProperty: events
     * {<SuperMap.Events>}
     */
    events: null,

    /**
     * Property: timeoutId
     * {<Number>} 设置的帧的唯一ID，清除帧时用到
     * */
    timeoutId:null,

    /**
     * Constructor: SuperMap.Animator
     * 动画管理类构造函数。
     *
     * (start code)
     *
     *  var animator;
     *  //初始化动画管理类
     *  function init()
     *  {
     *      //设置播放时间从0到1000秒，速度为每帧播放10秒的数据
     *      animator = new SuperMap.Animator(callbackFunction,{
     *          speed:10,//设置速度
     *          startTime:0,//设置开始时间
     *          endTime:1000//设置结束时间
     *      });
     *  }
     *  //回调函数
     *  function callbackFunction(){
     *      //每帧具体实现的渲染代码
     *      //如下：
     *      //获取canvas
     *      var c=document.getElementById("myCanvas");
     *      var cxt=c.getContext("2d");
     *      cxt.fillStyle="#FF0000";
     *      cxt.beginPath();
     *      //根据时间的不同改变坐标位置
     *      var x = animator.getCurrentTime()*2;
     *      var y = animator.getCurrentTime()*0.5;
     *      //绘制一个圆
     *      cxt.arc(x,y,15,0,Math.PI*2,true);
     *      cxt.closePath();
     *      cxt.fill();
     *  }
     *  //开始播放
     *  function startAnimator(){
     *      animator.start();
     *  }
     *  //停止播放
     *  function stopAnimator(){
     *      animator.stop();
     *  }
     *
     * (end)
     *
     * Parameters:
     * callback - {Function} 动画渲染回调函数，必设属性。具体的动画效果需要用户在此回调函数里面实现。
     * options - {Object} 该类开放的可选属性。
     *
     * Allowed options properties:
     * speed - {Number} 播放速度。不能小于0，默认为1（表示每帧渲染的数据之间的间隔为1），设置越大播放速度越快。
     * startTime - {Number} 播放的起始时间，必须为数字，且小于等于endTime。如果不设置，初始化时为0，建议设置。
     * endTime - {Number} 播放的结束时间，必须为数字，且大于等于startTime。如果不设置，初始化时以当前时间进行设置，建议设置。
     * repeat - {Boolean} 是否重复循环播放。默认为true。
     * reverse - {Boolean} 是否反向播放。默认为false。
     * frameRate - {Number} 帧率，表示每秒播放的动画的次数，默认为60，即每秒播放60次。
     * 由于浏览器每秒渲染60帧是固定的，所以我们只能设置每秒播放的次为小于等于60，
     * 大于等于0的正数。
     */
    initialize: function(callback, options) {
        var me = this;
        //定义帧
        //这里需要一个返回值用于取消clearTimeout
        window.requestAnimation =  window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function(callback) { return setTimeout(callback, 1000 / 60); };

        window.cancelAnimation = window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            function (id) {
                window.clearTimeout(id);
            };

        //设置播放速度、开始结束时间、是否循环播放、是否反向播放、帧率

        me.speed = (options && options.speed!=undefined && options.speed>=0)?options.speed:me.speed;
        me.startTime = (options && (options.startTime!=undefined && options.startTime!=null))?options.startTime:0;
        me.endTime = (options && (options.endTime!=undefined && options.endTime!=null && options.endTime>=me.startTime))?options.endTime:+new Date();
        me.repeat = (options && options.repeat!=undefined)?options.repeat:me.repeat;
        me.reverse = (options && options.reverse!=undefined)?options.reverse:me.reverse
        me.frameRate = (options && options.frameRate!=undefined && options.frameRate>=0 && options.frameRate<=60)?options.frameRate:me.frameRate;

        me.events = new SuperMap.Events(this,null,this.EVENT_TYPES);
        me.events.addEventType("framestart");
        me.events.addEventType("firstframestart");
        me.events.addEventType("lastframestart");
        //初始化处于非运行阶段
        me.running = false;
        //先让IE下支持bind方法
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (oThis) {
                if (typeof this !== "function") {
// closest thing possible to the ECMAScript 5 internal IsCallable function
                    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                }
                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function () {},
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
        //保证 this.tick 的上下文还是 Animator 这个对象
        me.tick = me.tick.bind(me);
        //初始化当前时间
        me.currentTime = me.startTime;
        me.oldTime = me.currentTime;
        //记录回调函数
        me.callback = callback;
    },
    /**
     * APIMethod: start
     * 开始播放动画
     */
    start:function () {
        var me = this;
        if(!me.running)
        {
            me.running = true;
            if(me.reverse)
            {
                if(me.currentTime === me.startTime)
                {
                    me.oldTime = me.endTime;
                    me.currentTime = me.oldTime;
                    me.events.triggerEvent('lastframestart',me.currentTime);
                }
            }
            else
            {
                if(me.oldTime === me.endTime)
                {
                    me.currentTime = me.startTime;
                    me.oldTime = me.currentTime;
                    me.events.triggerEvent('firstframestart',me.currentTime);
                }
            }
            me.tick();
        }
    },
    /**
     * APIMethod: pause
     * 暂停播放动画
     */
    pause:function () {
        var me = this;
        //设置不再进行播放，在下一帧时自动不在叠加
        me.running = false;
    },
    /**
     * APIMethod: stop
     * 停止播放动画，停止后返回起始播放状态
     */
    stop:function () {
        var me = this;
        //停止时 时间设置为开始时间
        me.currentTime = me.startTime;
        me.oldTime = me.currentTime;
        //如果正在运行，修改为初始时间即可绘制一帧
        if(me.running)
        {
            me.running = false;
        }
        //否则需要自动调用一次绘制
        else
        {
            me.tick();
        }
    },


    /**
     * APIMethod: toggle
     * 开关切换，切换的是开始和暂停
     */
    toggle:function () {
        var me = this;
        if (me.running) {
            me.pause();
        } else {
            me.start();
        }
    },
    /**
     * APIMethod: redraw
     * 重新绘制一帧。
     * 通过此方法可以实现刷新效果。
     */
    redraw:function(){
        var me = this;
        //如果正在播放中不需要
        if(me.running)
        {}
        //否则需要播放一帧
        else
        {
            me.tick();
        }
    },
    /**
     * APIMethod: setSpeed
     * 设置速度。
     *
     * Parameters:
     * speed - {Number} 设置播放速度，必须为非负数，默认为1
     * （表示前后两次渲染的数据之间的间隔为1），设置越大时间跳跃越快。
     *
     * Returns:
     * {Boolean} true代表设置成功，false设置失败（speed小于0时失败）
     */
    setSpeed:function(speed){
        var me = this;
        if(speed>=0)
        {
            me.speed = speed;
            return true;
        }
        else
        {
            return false;
        }
    },
    /**
     * APIMethod: getSpeed
     * 获取速度。
     *
     * Returns:
     * {Number} 返回当前的速度
     */
    getSpeed:function(){
         return this.speed;
    },
    /**
     * APIMethod: setStartTime
     * 设置起始播放时间，设置完成后如果当前播放时间小于起始播放时间，则从起始播放时间开始播放
     *
     * Parameters:
     * startTime - {Number} 需要设置的起始播放时间
     *
     * Returns:
     * {Boolean} true代表设置成功，false设置失败（startTime 大于结束时间时失败）
     */
    setStartTime:function(startTime){
        var me = this;
        //起始时间不得大于结束时间
        if(startTime<=me.endTime)
        {
            me.startTime = startTime;
        }
        else
        {
            return false;
        }
        //如果当前时间小于了起始时间，则从当前起始时间开始播放
        if(me.currentTime < me.startTime)
        {
            me.currentTime = me.startTime;
            me.tick();
        }
        return true;
    },
    /**
     * APIMethod: getStartTime
     * 获取起始播放时间
     *
     * Returns:
     * {Number} 返回当前的起始播放时间
     */
    getStartTime:function(){
        return this.startTime;
    },
    /**
     * APIMethod: setEndTime
     * 设置结束播放时间，设置完成后如果当前播放时间大于结束播放，则从起始播放时间开始播放
     *
     * Parameters:
     * endTime - {Number} 需要设置的结束播放时间
     *
     * Returns:
     * {Boolean} true代表设置成功，false设置失败（endTime 小于开始时间时失败）
     */
    setEndTime:function(endTime){
        var me = this;
        //结束时间不得小于开始时间
        if(endTime>=me.startTime)
        {
            me.endTime = endTime;
        }
        else
        {
            return false;
        }
        //如果当前时间大于了结束时间，则从起始时间开始播放
        if(me.currentTime >= me.endTime)
        {
            me.currentTime = me.startTime;
            me.tick();
        }
        return true;
    },
    /**
     * APIMethod: getEndTime
     * 获取结束播放时间
     *
     * Returns:
     * {Number} 返回当前的结束播放时间
     */
    getEndTime:function(){
        return this.endTime;
    },
    /**
     * APIMethod: setCurrentTime
     * 设置当前播放时间
     *
     * Parameters:
     * currentTime - {Number} 需要设置的当前播放时间
     *
     * Returns:
     * {Boolean} true代表设置成功，false设置失败（currentTime 不在时间段内时失败）
     */
    setCurrentTime:function(currentTime){
        var me = this;
        //结束时间不得小于开始时间
        if(currentTime>=me.startTime && currentTime<=me.endTime)
        {
            me.currentTime = currentTime;
            me.oldTime = me.currentTime;
            me.tick();
            return true;
        }
        else
        {
            return false;
        }
    },
    /**
     * APIMethod: getCurrentTime
     * 获取当前播放时间
     *
     * Returns:
     * {Number} 返回当前播放时间
     */
    getCurrentTime:function(){
        return this.currentTime;
    },
    /**
     * APIMethod: getOldTime
     * 获取上一帧播放时间
     *
     * Returns:
     * {Number} 返回上一帧播放时间
     */
    getOldTime:function(){
        return this.oldTime;
    },
    /**
     * APIMethod: setRepeat
     * 设置是否重复循环播放
     *
     * Parameters:
     * repeat - {Boolean} 是否重复循环播放
     */
    setRepeat:function(repeat){
        this.repeat = repeat;
    },
    /**
     * APIMethod: getRepeat
     * 获取是否重复循环播放，默认是true。
     *
     * Returns:
     * {Boolean} 返回是否重复循环播放
     */
    getRepeat:function(){
        return this.repeat;
    },
    /**
     * APIMethod: setReverse
     * 设置是否反向播放
     *
     * Parameters:
     * reverse - {Boolean} 是否反向播放
     */
    setReverse:function(reverse){
        this.reverse = reverse;
    },
    /**
     * APIMethod: getFrameRate
     * 获取帧率。
     * 表示每秒播放的次数，默认为60，即每秒播放60次。
     *
     * Returns:
     * {Number} 返回帧率
     */
    getFrameRate:function(){
        return this.frameRate;
    },
    /**
     * APIMethod: setFrameRate
     * 设置帧率，表示每秒播放的动画的次数，默认为60，即每秒播放60次。
     *
     *
     * 帧率设置的越高，每秒渲染的次数越多，动画连贯性越好，性能越低；
     * 帧率设置的越低，每秒渲染的次数越少，动画连贯性越差，性能越好。
     *
     * Parameters:
     * frameRate - {Number} 由于浏览器每秒渲染60帧是固定的，所以我们只能设置每秒播放的次为小于等于60，
     * 大于等于0的正数。
     * 比如：设置 animator.setFrameRate(30)，表示每秒播放动画30次，也就是浏览每渲染两帧，动画播放一次；
     * 如果希望动画播放很慢，可以设置为如 animator.setFrameRate(1/7)，表示每秒播放1/7次，也就是每7秒播放一次。
     *
     * Returns:
     * {Boolean} true代表设置成功，false设置失败（frameRate不在0到60之间时失败）
     *
     */
    setFrameRate:function(frameRate){
        var me = this;
        if(frameRate>=0 && frameRate<=60)
        {
            me.frameRate = frameRate;
            return true;
        }
        else
        {
            return false;
        }
    },
    /**
     * APIMethod: getReverse
     * 获取是否反向播放，默认是false。
     *
     * Returns:
     * {Boolean} 返回是否反向播放
     */
    getReverse:function(){
        return this.reverse;
    },
    //获取动画运行状态，Boolean类型
    /**
     * APIMethod: getRunning
     * 获取动画运行状态
     *
     * Returns:
     * {Boolean} true代表正在运行，false发表没有运行
     */
    getRunning:function () {
        return this.running;
    },
    /**
     * APIMethod: destroy
     * 销毁Animator对象，释放资源。
     */
    destroy:function(){
        var me = this;
        me.speed = null;
        me.startTime = null;
        me.endTime = null;
        me.currentTime = null;
        me.oldTime = null;
        me.repeat = null;
        me.running = null;
        me.reverse = null;
        me.frameRate = null;
        me.frame = null;
        me.callback = null;
    },

    /**
     * Method: tick
     * 渲染一帧
     */
    tick:function () {
        var me = this;

        if(me.frame%(60/me.frameRate)!=0)
        {
            me.frame++;
            me.timeoutId&&window.cancelAnimation(me.timeoutId);
            me.timeoutId=null;
            me.timeoutId=window.requestAnimation(me.tick);
            return ;

        }
        me.frame = 0;
        //触发每帧开始渲染事件
        me.events.triggerEvent('framestart',me.currentTime);


        //判定是否还需要继续播放
        if (me.running) {
            //能够进入到这里，代表需要渲染此帧
            //调用回调函数进行渲染
            me.callback && me.callback();    //destroy之后callback就为空，所以需要判定一下
            //触发每帧结束渲染事件
            me.events.triggerEvent('frameend',me.currentTime);

            if(!me.reverse)
            {
                //如果相等，则代表上一帧已经运行到了最后，下一帧运行初始化的状态
                if(me.oldTime === me.endTime)
                {
                    //不循环播放时
                    if(!me.repeat)
                    {
                        me.running = false;
                        return null;
                    }
                    else
                    {
                        me.events.triggerEvent('firstframestart',me.currentTime);
                    }
                    me.currentTime = me.startTime;
                    me.oldTime = me.currentTime;
                }
                //否则时间递增
                else
                {
                    me.oldTime = me.currentTime;
                    me.currentTime+=me.speed;
                }
                //最末尾的时刻需要单独渲染一帧
                if(me.currentTime>=me.endTime)
                {
                    me.currentTime = me.endTime;
                    me.events.triggerEvent('lastframestart',me.currentTime);
                }

            }
            else
            {
                //如果相等，则代表上一帧已经运行到了最前，下一帧运行结束的状态
                if(me.currentTime === me.startTime)
                {
                    //不循环播放时
                    if(!me.repeat)
                    {
                        me.running = false;
                        return null;
                    }
                    else
                    {
                        me.events.triggerEvent('lastframestart',me.currentTime);
                    }
                    me.oldTime = me.endTime;
                    me.currentTime = me.oldTime;
                }
                //否则时间递减
                else
                {
                    me.currentTime = me.oldTime;
                    me.oldTime-=me.speed;
                }
                //最开始的时刻需要单独渲染一帧
                if(me.oldTime<=me.startTime)
                {
                    me.oldTime = me.startTime;
                    me.events.triggerEvent('firstframestart',me.currentTime);
                }
            }
            //重复注册渲染帧
            me.timeoutId&&window.cancelAnimation(me.timeoutId);
            me.timeoutId=null;
            me.timeoutId=window.requestAnimation(me.tick);
            me.frame++;
        }
    },
    CLASS_NAME: "SuperMap.Animator"
});



