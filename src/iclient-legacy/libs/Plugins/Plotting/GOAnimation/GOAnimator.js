/**
 * @requires SuperMap/
 */

/**
 * Class: SuperMap.Plot.GOAnimator
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
SuperMap.Plot.GOAnimator = SuperMap.Class(SuperMap.Animator,{

    /**
     * Constructor: SuperMap.Geometry.DotSymbol
     * 创建一个点标绘对象。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Geometry.DotSymbol>} 新的标绘对象。
     */
    initialize:function(options){
        SuperMap.Animator.prototype.initialize.apply(this, arguments);
        //默认开始执行
        this.start();
    },


    /**
     * Method: tick
     * 渲染一帧
     */
    tick:function () {

        //执行动画
        this.excuteGOAnimations();
        var me = this;

        //重复注册渲染帧
        me.timeoutId&&window.cancelAnimation(me.timeoutId);
        me.timeoutId=null;
        me.timeoutId=window.requestAnimation(me.tick);
    },

    /**
     * Method: excuteGOAnimations
     * 执行动画
     */
    excuteGOAnimations: function(){
        var plotting = SuperMap.Plotting.getInstance();
        var animationManager = plotting.getGOAnimationManager();
        animationManager.excute();
    },

    CLASS_NAME: "SuperMap.Plot.GOAnimator"
});



