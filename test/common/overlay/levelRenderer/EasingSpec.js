import {Easing} from '../../../../src/common/overlay/levelRenderer/Easing';

describe('Easing', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    // 线性
    it('init_Linear', () => {
        var init = new Easing();
        var k = init.Linear(10);
        expect(init).not.toBeNull();
        expect(k).toEqual(10);
        init.destroy();
    });

    // 二次方的缓动（t^2）
    it('QuadraticIn', () => {
        var init = new Easing();
        var k = init.QuadraticIn(10);
        expect(k).toEqual(100);
    });

    it('QuadraticOut', () => {
        var init = new Easing();
        var k = init.QuadraticOut(10);
        expect(k).toEqual(-80);
    });

    it('QuadraticInOut_k = 1', () => {
        var init = new Easing();
        var k = init.QuadraticInOut(1);
        expect(k).toEqual(1);
    });

    it('QuadraticInOut_k = -1', () => {
        var init = new Easing();
        var k = init.QuadraticInOut(-1);
        expect(k).toEqual(2);
    });

    // 三次方的缓动（t^3）
    it('CubicIn', () => {
        var init = new Easing();
        var k = init.CubicIn(3);
        expect(k).toEqual(27);
    });
    it('CubicOut', () => {
        var init = new Easing();
        var k = init.CubicOut(3);
        expect(k).toEqual(9);
    });
    it('CubicInOut_k = 2', () => {
        var init = new Easing();
        var k = init.CubicInOut(2);
        expect(k).toEqual(5);
    });
    it('CubicInOut_k = -1', () => {
        var init = new Easing();
        var k = init.CubicInOut(-1);
        expect(k).toEqual(-4);
    });

    // 四次方的缓动（t^4）
    it('QuarticIn', () => {
        var init = new Easing();
        var k = init.QuarticIn(2);
        expect(k).toEqual(16);
    });
    it('QuarticOut', () => {
        var init = new Easing();
        var k = init.QuarticOut(3);
        expect(k).toEqual(-15);
    });

    it('QuarticInOut_k = 2', () => {
        var init = new Easing();
        var k = init.QuarticInOut(2);
        expect(k).toEqual(-7);
    });

    it('QuarticInOut_k = -2', () => {
        var init = new Easing();
        var k = init.QuarticInOut(-1);
        expect(k).toEqual(8);
    });

    // 五次方的缓动（t^5）
    it('QuinticIn', () => {
        var init = new Easing();
        var k = init.QuinticIn(2);
        expect(k).toEqual(32);
    });

    it('QuinticOut', () => {
        var init = new Easing();
        var k = init.QuinticOut(2);
        expect(k).toEqual(2);
    });

    it('QuinticInOut_k = 2 ', () => {
        var init = new Easing();
        var k = init.QuinticInOut(2);
        expect(k).toEqual(17);
    });
    it('QuinticInOut_k = -2 ', () => {
        var init = new Easing();
        var k = init.QuinticInOut(-2);
        expect(k).toEqual(-512);
    });

    // 正弦曲线的缓动（sin(t)）
    it('SinusoidalIn', () => {
        var init = new Easing();
        var k = init.SinusoidalIn(2);
        expect(k).toEqual(2);
    });
    it('SinusoidalOut', () => {
        var init = new Easing();
        var k = init.SinusoidalOut(2);
        expect(k).toEqual(1.2246467991473532e-16);
    });
    it('SinusoidalInOut', () => {
        var init = new Easing();
        var k = init.SinusoidalInOut(2);
        expect(k).toEqual(0);
    });

    // 指数曲线的缓动（2^t）
    it('ExponentialIn', () => {
        var init = new Easing();
        var k = init.ExponentialIn(2);
        expect(k).toEqual(1024);
    });
    it('ExponentialOut', () => {
        var init = new Easing();
        var k = init.ExponentialOut(1);
        expect(k).toEqual(1);
    });
    it('ExponentialInOut_k = 0', () => {
        var init = new Easing();
        var k = init.ExponentialInOut(0);
        expect(k).toEqual(0);
    });
    it('ExponentialInOut_k = 1', () => {
        var init = new Easing();
        var k = init.ExponentialInOut(1);
        expect(k).toEqual(1);
    });
    it('ExponentialInOut_k = 10', () => {
        var init = new Easing();
        var k = init.ExponentialInOut(10);
        expect(k).toEqual(1);
    });
    it('ExponentialInOut_k = -1', () => {
        var init = new Easing();
        var k = init.ExponentialInOut(-1);
        expect(k).toEqual(4.656612873077393e-10);
    });

    // 圆形曲线的缓动（sqrt(1-t^2)）
    it('CircularIn', () => {
        var init = new Easing();
        var k = init.CircularIn(1);
        expect(k).toEqual(1);
    });
    it('CircularOut', () => {
        var init = new Easing();
        var k = init.CircularOut(2);
        expect(k).toEqual(0);
    });
    it('CircularInOut_k = 1', () => {
        var init = new Easing();
        var k = init.CircularInOut(1);
        expect(k).toEqual(1);
    });
    it('CircularInOut_k = 0', () => {
        var init = new Easing();
        var k = init.CircularInOut(0);
        expect(k).toEqual(-0);
    });

    //创建类似于弹簧在停止前来回振荡的动画
    it('ElasticIn_k = 0', () => {
        var init = new Easing();
        var k = init.ElasticIn(0);
        expect(k).toEqual(0);
    });
    it('ElasticIn_k = 1', () => {
        var init = new Easing();
        var k = init.ElasticIn(1);
        expect(k).toEqual(1);
    });
    it('ElasticIn_k = 2', () => {
        var init = new Easing();
        var k = init.ElasticIn(2);
        expect(k).toEqual(-1024);
    });
    it('ElasticOut_k = 0', () => {
        var init = new Easing();
        var k = init.ElasticOut(0);
        expect(k).toEqual(0);
    });
    it('ElasticOut_k = 1', () => {
        var init = new Easing();
        var k = init.ElasticOut(1);
        expect(k).toEqual(1);
    });
    it('ElasticOut_k = -1', () => {
        var init = new Easing();
        var k = init.ElasticOut(-1);
        expect(k).toEqual(1025);
    });
    it('ElasticInOut_k = 0', () => {
        var init = new Easing();
        var k = init.ElasticInOut(0);
        expect(k).toEqual(0);
    });
    it('ElasticInOut_k = 1', () => {
        var init = new Easing();
        var k = init.ElasticInOut(1);
        expect(k).toEqual(1);
    });
    it('ElasticInOut_k = -1', () => {
        var init = new Easing();
        var k = init.ElasticInOut(-1);
        expect(k).toEqual(-4.656612873077393e-10);
    });
    it('ElasticInOut_k = 10', () => {
        var init = new Easing();
        var k = init.ElasticInOut(10);
        expect(k).toEqual(1);
    });

    //在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
    it('BackIn', () => {
        var init = new Easing();
        var k = init.BackIn(10);
        expect(k).toEqual(2531.422);
    });
    it('BackOut', () => {
        var init = new Easing();
        var k = init.BackOut(10);
        expect(k).toEqual(2108.2798);
    });
    it('BackInOut_k = 1', () => {
        var init = new Easing();
        var k = init.BackInOut(1);
        expect(k).toEqual(1);
    });
    it('BackInOut_k = -2', () => {
        var init = new Easing();
        var k = init.BackInOut(-10);
        expect(k).toEqual(-14898.6199);
    });

    // 创建弹跳效果
    it('BounceIn', () => {
        var init = new Easing();
        var k = init.BounceIn(2);
        expect(k).toEqual(-6.5625);
    });
    it('BounceOut_k = 0.7', () => {
        var init = new Easing();
        var k = init.BounceOut(0.7);
        expect(k).toEqual(0.930625);
    });
    it('BounceOut_k = 0.8', () => {
        var init = new Easing();
        var k = init.BounceOut(0.8);
        expect(k).toEqual(0.94);
    });
    it('BounceOut_k = 1', () => {
        var init = new Easing();
        var k = init.BounceOut(1);
        expect(k).toEqual(1);
    });
    it('BounceInOut_k = -1', () => {
        var init = new Easing();
        var k = init.BounceInOut(-1);
        expect(k).toEqual(-15.8125);
    });
    it('BounceInOut_k = 1', () => {
        var init = new Easing();
        var k = init.BounceInOut(1);
        expect(k).toEqual(1);
    });
});