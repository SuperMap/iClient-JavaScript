/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Namespace: SuperMap.Tween
 */
SuperMap.Tween = SuperMap.Class({
    
    /**
     * Constant: INTERVAL
     * {int} 以毫秒计的间隔。
     */
    INTERVAL: 10,
    
    /**
     * APIProperty: easing
     * {<SuperMap.Easing>(Function)} 用于动画的缓动方程。
     *     默认被设置为 SuperMap.Easing.Expo.easeOut
     */
    easing: null,
    
    /**
     * APIProperty: begin
     * {Object} 动画开始时候的值。
     */
    begin: null,
    
    /**
     * APIProperty: finish
     * {Object} 动画结束时候的值。
     */
    finish: null,
    
    /**
     * APIProperty: duration
     * {int} 补间动画持续的过程（步骤的数量）。
     */
    duration: null,
    
    /**
     * APIProperty: callbacks
     * {Object} 动画期间中的开始，过程和结束属性值为方法的对象，其方法在
     *      动画过程中被调用。它们把当前计算的值作为参数。
     */
    callbacks: null,
    
    /**
     * Property: time
     * {int} Step counter
     */
    time: null,
    
    /**
     * Property: interval
     * {int} Interval id returned by window.setInterval
     */
    interval: null,
    
    /**
     * Property: playing
     * {Boolean} Tells if the easing is currently playing
     */
    playing: false,
    
    /** 
     * Constructor: SuperMap.Tween
     * 创建一个补间动画实例。
     *
     * Parameters:
     * easing - {<SuperMap.Easing>(Function)} 被使用的缓动方法。
     */ 
    initialize: function(easing) {
        this.easing = (easing) ? easing : SuperMap.Easing.Expo.easeOut;
    },
    
    /**
     * APIMethod: start
     * 执行补间动画，同时调用每一步中定义的方法。
     *
     * Parameters:
     * begin - {Object} 动画开始时候的值。
     * finish - {Object} 动画结束时候的值。
     * duration - {int} 补间动画持续的过程（步骤的数量）。
     * options - {Object} 选项参数对象（例如 callbacks (start, eachStep, done)）。
     */
    start: function(begin, finish, duration, options) {
        this.playing = true;
        this.begin = begin;
        this.finish = finish;
        this.duration = duration;
        this.callbacks = options.callbacks;
        this.time = 0;
        if (this.interval) {
            window.clearInterval(this.interval);
            this.interval = null;
        }
        if (this.callbacks && this.callbacks.start) {
            this.callbacks.start.call(this, this.begin);
        }
        this.interval = window.setInterval(
            SuperMap.Function.bind(this.play, this), this.INTERVAL);
    },
    
    /**
     * APIMethod: stop
     * 停止补间动画，同时调用结束回调。如果动画已经完成了，则不做任何事情。
     */
    stop: function() {
        if (!this.playing) {
            return;
        }
        
        if (this.callbacks && this.callbacks.done) {
            this.callbacks.done.call(this, this.finish);
        }
        window.clearInterval(this.interval);
        this.interval = null;
        this.playing = false;
    },
    
    /**
     * Method: play
     * Calls the appropriate easing method
     */
    play: function() {
        var value = {};
        for (var i in this.begin) {
            if(!this.begin.hasOwnProperty(i)){
                continue;
            }
            var b = this.begin[i];
            var f = this.finish[i];
            if (b == null || f == null || isNaN(b) || isNaN(f)) {
                throw new TypeError('invalid value for Tween');
            }

            var c = f - b;
            value[i] = this.easing.apply(this, [this.time, b, c, this.duration]);
        }
        this.time++;
        
        if (this.callbacks && this.callbacks.eachStep) {
            this.callbacks.eachStep.call(this, value);
        }
        
        if (this.time > this.duration) {
            this.stop();
        }
    },
    
    /**
     * Create empty functions for all easing methods.
     */
    CLASS_NAME: "SuperMap.Tween"
});

/**
 * Namespace: SuperMap.Easing
 * 
 * Credits:
 *      Robert Penner的缓动方程， <http://www.robertpenner.com/easing/>
 */
SuperMap.Easing = {
    /**
     * Create empty functions for all easing methods.
     */
    CLASS_NAME: "SuperMap.Easing"
};

/**
 * Namespace: SuperMap.Easing.Linear
 */
SuperMap.Easing.Linear = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeIn: function(t, b, c, d) {
        return c*t/d + b;
    },
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeOut: function(t, b, c, d) {
        return c*t/d + b;
    },
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeInOut: function(t, b, c, d) {
        return c*t/d + b;
    },

    CLASS_NAME: "SuperMap.Easing.Linear"
};

/**
 * Namespace: SuperMap.Easing.Expo
 */
SuperMap.Easing.Expo = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeIn: function(t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeOut: function(t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeInOut: function(t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },

    CLASS_NAME: "SuperMap.Easing.Expo"
};

/**
 * Namespace: SuperMap.Easing.Quad
 */
SuperMap.Easing.Quad = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeIn: function(t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeOut: function(t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeInOut: function(t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },

    CLASS_NAME: "SuperMap.Easing.Quad"
};
