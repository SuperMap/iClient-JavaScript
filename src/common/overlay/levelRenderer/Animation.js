import {Util} from '../levelRenderer/Util';
import {Eventful} from './Eventful';
import {Clip} from './Clip';
import {SUtil} from './SUtil';
import {Util as CommonUtil} from "../../commontypes/Util";

/**
 * @private
 * @class SuperMap.LevelRenderer.Animation
 * @classdesc 动画主类, 调度和管理所有动画控制器
 * @category Visualization Theme。
 * @extends SuperMap.LevelRenderer.Eventful
 */
export class Animation extends Eventful {


    /*
     * Constructor: SuperMap.LevelRenderer.Animation
     * 构造函数。
     *
     * Parameters:
     * options - {Object} 动画参数选项，可设属性如下：
     *
     * Symbolizer properties:
     * onframe - {Object} onframe。
     * stage - {Object} stage。
     *
     * (code)
     *     var animation = new SuperMap.LevelRenderer.Animation();
     *     var obj = {
     *         x: 100,
     *         y: 100
     *     };
     *     animation.animate(node.position)
     *         .when(1000, {
     *             x: 500,
     *             y: 500
     *         })
     *         .when(2000, {
     *             x: 100,
     *             y: 100
     *         })
     *         .start('spline');
     * (end)
     */
    constructor(options) {
        super(options);

        options = options || {};
        /**
         * Property: stage
         * {Object}
         *
         */
        this.stage = {};

        /**
         * Property: onframe
         * {Object}
         *
         */
        this.onframe = function () {
        };

        /**
         * Property: _clips
         * {Array}
         *
         */
        this._clips = [];

        /**
         * Property: _running
         * {Boolean}
         *
         */
        this._running = false;

        /**
         * Property: _time
         * {Number}
         *
         */
        this._time = 0;

        CommonUtil.extend(this, options);

        this.CLASS_NAME = "SuperMap.LevelRenderer.Animation";

    }


    /**
     * APIMethod: add
     * 添加动画片段
     *
     * Parameters:
     * clip - {<SuperMap.LevelRenderer.Animation.Clip>} 动画片段
     *
     */
    add(clip) {
        this._clips.push(clip);
    }


    /**
     * APIMethod: remove
     * 删除动画片段
     *
     * Parameters:
     * clip - {<SuperMap.LevelRenderer.Animation.Clip>} 动画片段
     *
     */
    remove(clip) {
        var idx = new Util().indexOf(this._clips, clip);
        if (idx >= 0) {
            this._clips.splice(idx, 1);
        }
    }


    /**
     * Method: _update
     *
     */
    _update() {
        var time = new Date().getTime();
        var delta = time - this._time;
        var clips = this._clips;
        var len = clips.length;

        var deferredEvents = [];
        var deferredClips = [];
        for (let i = 0; i < len; i++) {
            var clip = clips[i];
            var e = clip.step(time);
            // Throw out the events need to be called after
            // stage.update, like destroy
            if (e) {
                deferredEvents.push(e);
                deferredClips.push(clip);
            }
        }
        if (this.stage.update) {
            this.stage.update();
        }

        // Remove the finished clip
        for (let i = 0; i < len;) {
            if (clips[i]._needsRemove) {
                clips[i] = clips[len - 1];
                clips.pop();
                len--;
            } else {
                i++;
            }
        }

        len = deferredEvents.length;
        for (let i = 0; i < len; i++) {
            deferredClips[i].fire(deferredEvents[i]);
        }

        this._time = time;

        this.onframe(delta);

        this.dispatch('frame', delta);
    }


    /**
     * APIMethod: start
     * 开始运行动画
     *
     */
    start() {
        var requestAnimationFrame = window.requestAnimationFrame
            || window.msRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            || function (func) {
                setTimeout(func, 16);
            };

        var self = this;

        this._running = true;

        function step() {
            if (self._running) {
                self._update();
                requestAnimationFrame(step);
            }
        }

        this._time = new Date().getTime();
        requestAnimationFrame(step);
    }


    /**
     * APIMethod: stop
     * 停止运行动画
     *
     */
    stop() {
        this._running = false;
    }


    /**
     * APIMethod: clear
     * 清除所有动画片段
     *
     */
    clear() {
        this._clips = [];
    }


    /**
     * Method: animate
     * 对一个目标创建一个animator对象，可以指定目标中的属性使用动画
     *
     * Parameters:
     * target - {Object} target
     * options - {Object} 动画参数选项，可设属性如下：
     *
     * Symbolizer properties:
     * loop - {Boolean} 是否循环播放动画。默认值：false。
     * getter - {Function} 如果指定getter函数，会通过getter函数取属性值。默认值：null。
     * setter - {Function} 如如果指定setter函数，会通过setter函数设置属性值。默认值：null。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Animation.Animator>} Animator
     */
    animate(target, options) {
        options = options || {};
        var deferred = new Animator(
            target,
            options.loop,
            options.getter,
            options.setter
        );
        deferred.animation = this;
        return deferred;
    }

    static _interpolateNumber(p0, p1, percent) {
        return (p1 - p0) * percent + p0;
    }

    static _interpolateArray(p0, p1, percent, out, arrDim) {
        var len = p0.length;
        if (arrDim == 1) {
            for (let i = 0; i < len; i++) {
                out[i] = Animation._interpolateNumber(p0[i], p1[i], percent);
            }
        } else {
            var len2 = p0[0].length;
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len2; j++) {
                    out[i][j] = Animation._interpolateNumber(
                        p0[i][j], p1[i][j], percent
                    );
                }
            }
        }
    }

    static _isArrayLike(data) {
        switch (typeof data) {
            case 'undefined':
            case 'string':
                return false;
        }

        return typeof data.length !== 'undefined';
    }

    static _catmullRomInterpolateArray(p0, p1, p2, p3, t, t2, t3, out, arrDim) {
        var len = p0.length;
        if (arrDim == 1) {
            for (let i = 0; i < len; i++) {
                out[i] = Animation._catmullRomInterpolate(
                    p0[i], p1[i], p2[i], p3[i], t, t2, t3
                );
            }
        } else {
            var len2 = p0[0].length;
            for (let i = 0; i < len; i++) {
                for (var j = 0; j < len2; j++) {
                    out[i][j] = Animation._catmullRomInterpolate(
                        p0[i][j], p1[i][j], p2[i][j], p3[i][j],
                        t, t2, t3
                    );
                }
            }
        }
    }

    static _catmullRomInterpolate(p0, p1, p2, p3, t, t2, t3) {
        var v0 = (p2 - p0) * 0.5;
        var v1 = (p3 - p1) * 0.5;
        return (2 * (p1 - p2) + v0 + v1) * t3
            + (-3 * (p1 - p2) - 2 * v0 - v1) * t2
            + v0 * t + p1;
    }

    static _cloneValue(value) {
        var arraySlice = Array.prototype.slice;

        if (Animation._isArrayLike(value)) {
            var len = value.length;
            if (Animation._isArrayLike(value[0])) {
                var ret = [];
                for (var i = 0; i < len; i++) {
                    ret.push(arraySlice.call(value[i]));
                }
                return ret;
            } else {
                return arraySlice.call(value);
            }
        } else {
            return value;
        }
    }

    static rgba2String(rgba) {
        rgba[0] = Math.floor(rgba[0]);
        rgba[1] = Math.floor(rgba[1]);
        rgba[2] = Math.floor(rgba[2]);

        return 'rgba(' + rgba.join(',') + ')';
    }
}

/**
 * @private
 * @class SuperMap.LevelRenderer.Animation.Animator
 */
export class Animator {

    /*
     * Constructor: SuperMap.LevelRenderer.Animation.Animator
     * 构造函数。
     *
     * Parameters:
     * target - {Object} target
     * loop - {Boolean} 是否循环播放动画。默认值：false。
     * getter - {Function} 如果指定getter函数，会通过getter函数取属性值。默认值：null。
     * setter - {Function} 如如果指定setter函数，会通过setter函数设置属性值。默认值：null。
     *
     */
    constructor(target, loop, getter, setter) {
        /**
         * Property: _tracks
         * {Object}
         */
        this._tracks = {};

        /**
         * Property: _target
         * {Object}
         */
        this._target = target;

        /**
         * Property: _loop
         * {Boolean}
         */
        this._loop = loop || false;

        /**
         * Property: _getter
         * {Function}
         */
        this._getter = getter || _defaultGetter;

        /**
         * Property: _setter
         * {Function}
         */
        this._setter = setter || _defaultSetter;

        /**
         * Property: _clipCount
         * {Number}
         */
        this._clipCount = 0;

        /**
         * Property: _delay
         * {Number}
         */
        this._delay = 0;

        /**
         * Property: _doneList
         * {Array}
         */
        this._doneList = [];

        /**
         * Property: _onframeList
         * {Array}
         */
        this._onframeList = [];

        /**
         * Property: _clipList
         * {Array}
         */
        this._clipList = [];
        this.CLASS_NAME = "SuperMap.LevelRenderer.Animation.Animator";
        //Function
        function _defaultGetter(target, key) {
            return target[key];
        }

        function _defaultSetter(target, key, value) {
            target[key] = value;
        }
    }


    /**
     * Method: when
     * 设置动画关键帧
     *
     * Parameters:
     * time - {Number} 关键帧时间，单位是ms
     * props - {Object} 关键帧的属性值，key-value表示
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Animation.Animator>} Animator
     */
    when(time /* ms */, props) {
        for (var propName in props) {
            if (!this._tracks[propName]) {
                this._tracks[propName] = [];
                // If time is 0
                //  Then props is given initialize value
                // Else
                //  Initialize value from current prop value
                if (time !== 0) {
                    this._tracks[propName].push({
                        time: 0,
                        value: Animation._cloneValue(
                            this._getter(this._target, propName)
                        )
                    });
                }
            }
            this._tracks[propName].push({
                time: parseInt(time, 10),
                value: props[propName]
            });
        }
        return this;
    }


    /**
     * Method: during
     * 添加动画每一帧的回调函数
     *
     * Parameters:
     * callback - {Function} callback
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Animation.Animator>} Animator
     */
    during(callback) {
        this._onframeList.push(callback);
        return this;
    }


    /**
     * Method: start
     * 开始执行动画
     *
     * Parameters:
     * easing - {String|Function} 动画缓动函数。详见：<SuperMap.LevelRenderer.Animation.easing>。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Animation.Animator>} Animator
     */
    start(easing) {
        var self = this;
        var setter = this._setter;
        var getter = this._getter;
        var onFrameListLen = self._onframeList.length;
        var useSpline = easing === 'spline';

        var ondestroy = function () {
            self._clipCount--;
            if (self._clipCount === 0) {
                // Clear all tracks
                self._tracks = {};

                var len = self._doneList.length;
                for (var i = 0; i < len; i++) {
                    self._doneList[i].call(self);
                }
            }
        };

        var createTrackClip = function (keyframes, propName) {
            var trackLen = keyframes.length;
            if (!trackLen) {
                return;
            }
            // Guess data type
            var firstVal = keyframes[0].value;
            var isValueArray = Animation._isArrayLike(firstVal);
            var isValueColor = false;

            // For vertices morphing
            var arrDim = (
                isValueArray
                && Animation._isArrayLike(firstVal[0])
            )
                ? 2 : 1;
            // Sort keyframe as ascending
            keyframes.sort(function (a, b) {
                return a.time - b.time;
            });
            var trackMaxTime = keyframes[trackLen - 1].time;
            // Percents of each keyframe
            var kfPercents = [];
            // Value of each keyframe
            var kfValues = [];
            for (let i = 0; i < trackLen; i++) {
                kfPercents.push(keyframes[i].time / trackMaxTime);
                // Assume value is a color when it is a string
                var value = keyframes[i].value;
                if (typeof(value) == 'string') {
                    value = SUtil.Util_color.toArray(value);
                    if (value.length === 0) {    // Invalid color
                        value[0] = value[1] = value[2] = 0;
                        value[3] = 1;
                    }
                    isValueColor = true;
                }
                kfValues.push(value);
            }

            // Cache the key of last frame to speed up when
            // animation playback is sequency
            var cacheKey = 0;
            var cachePercent = 0;
            var start;
            var i;
            var w;
            var p0;
            var p1;
            var p2;
            var p3;


            if (isValueColor) {
                var rgba = [0, 0, 0, 0];
            }

            var onframe = function (target, percent) {
                // Find the range keyframes
                // kf1-----kf2---------current--------kf3
                // find kf2 and kf3 and do interpolation
                if (percent < cachePercent) {
                    // Start from next key
                    start = Math.min(cacheKey + 1, trackLen - 1);
                    for (i = start; i >= 0; i--) {
                        if (kfPercents[i] <= percent) {
                            break;
                        }
                    }
                    i = Math.min(i, trackLen - 2);
                } else {
                    for (i = cacheKey; i < trackLen; i++) {
                        if (kfPercents[i] > percent) {
                            break;
                        }
                    }
                    i = Math.min(i - 1, trackLen - 2);
                }
                cacheKey = i;
                cachePercent = percent;

                var range = (kfPercents[i + 1] - kfPercents[i]);
                if (range === 0) {
                    return;
                } else {
                    w = (percent - kfPercents[i]) / range;
                }
                if (useSpline) {
                    p1 = kfValues[i];
                    p0 = kfValues[i === 0 ? i : i - 1];
                    p2 = kfValues[i > trackLen - 2 ? trackLen - 1 : i + 1];
                    p3 = kfValues[i > trackLen - 3 ? trackLen - 1 : i + 2];
                    if (isValueArray) {
                        Animation._catmullRomInterpolateArray(
                            p0, p1, p2, p3, w, w * w, w * w * w,
                            getter(target, propName),
                            arrDim
                        );
                    } else {
                        let value;
                        if (isValueColor) {
                            // value = SuperMap.LevelRenderer.Animation._catmullRomInterpolateArray(
                            //     p0, p1, p2, p3, w, w * w, w * w * w,
                            //     rgba, 1
                            // );
                            value = Animation.rgba2String(rgba);
                        } else {
                            value = Animation._catmullRomInterpolate(
                                p0, p1, p2, p3, w, w * w, w * w * w
                            );
                        }
                        setter(
                            target,
                            propName,
                            value
                        );
                    }
                } else {
                    if (isValueArray) {
                        Animation._interpolateArray(
                            kfValues[i], kfValues[i + 1], w,
                            getter(target, propName),
                            arrDim
                        );
                    } else {
                        let value;
                        if (isValueColor) {
                            Animation._interpolateArray(
                                kfValues[i], kfValues[i + 1], w,
                                rgba, 1
                            );
                            value = Animation.rgba2String(rgba);
                        } else {
                            value = Animation._interpolateNumber(kfValues[i], kfValues[i + 1], w);
                        }
                        setter(
                            target,
                            propName,
                            value
                        );
                    }
                }

                for (i = 0; i < onFrameListLen; i++) {
                    self._onframeList[i](target, percent);
                }
            };

            var clip = new Clip({
                target: self._target,
                life: trackMaxTime,
                loop: self._loop,
                delay: self._delay,
                onframe: onframe,
                ondestroy: ondestroy
            });

            if (easing && easing !== 'spline') {
                clip.easing = easing;
            }
            self._clipList.push(clip);
            self._clipCount++;
            self.animation.add(clip);
        };

        for (var propName in this._tracks) {
            createTrackClip(this._tracks[propName], propName);
        }
        return this;
    }


    /**
     * Method: stop
     * 停止动画
     */
    stop() {
        for (var i = 0; i < this._clipList.length; i++) {
            var clip = this._clipList[i];
            this.animation.remove(clip);
        }
        this._clipList = [];
    }


    /**
     * Method: delay
     * 设置动画延迟开始的时间
     *
     * Parameters:
     * time - {Number} time 单位ms
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Animation.Animator>} Animator
     */
    delay(time) {
        this._delay = time;
        return this;
    }


    /**
     * Method: done
     * 添加动画结束的回调
     *
     * Parameters:
     * cb - {Function} Function
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Animation.Animator>} Animator
     */
    done(cb) {
        if (cb) {
            this._doneList.push(cb);
        }
        return this;
    }

}


