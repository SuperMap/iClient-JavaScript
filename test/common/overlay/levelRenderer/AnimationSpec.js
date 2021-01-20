import { Clip } from '../../../../src/common/overlay/levelRenderer/Clip';
import { Animation } from '../../../../src/common/overlay/levelRenderer/Animation';
import { SmicStar } from '../../../../src/common/overlay/levelRenderer/SmicStar';


describe('Animation', () => {
    it('constructor', () => {
        var animation = new Animation({});
        expect(animation).not.toBeNull();
        expect(animation._time).toEqual(0);
    });

    it('add,remove', () => {
        var animation = new Animation();
        var star = new SmicStar({
            style: {
                x: 200,
                y: 100,
                r: 150,
                n: 5,
                text: '五角星'
            }
        });
        var options = {
            target: star
        };
        var clip = new Clip(options);
        animation.add(clip);
        expect(animation._clips.length).toEqual(1);
        animation.remove(clip)
        expect(animation._clips.length).toEqual(0);
    });

    it('start,stop', () => {
        var animation = new Animation();
        var star = new SmicStar({
            style: {
                x: 200,
                y: 100,
                r: 150,
                n: 5,
                text: '五角星'
            }
        });
        var options = {
            target: star
        };
        var clip = new Clip(options);
        animation.add(clip);
        animation.start();
        expect(animation._running).toEqual(true);
        animation.stop();
        expect(animation._running).toEqual(false);
    });

    it('animation', () => {
        var animation = new Animation();
        var obj = {
            x: 100,
            y: 100
        };
        var star = new SmicStar({
            style: {
                x: 200,
                y: 100,
                r: 150,
                n: 5,
                text: '五角星'
            }
        });
        var animator = animation.animate(obj)
            .when(1000, {
                x: 500,
                y: 500
            })
            .when(2000, {
                x: 100,
                y: 100
            });
        animator.start('spline')

        animation._clips[0].onframe(star, 0.5);
        animation._clips[0].ondestroy();
        animator.stop();
        expect(animation._running).toEqual(false);
    });

    it('_update', () => {
        var animation = new Animation();
        var star = new SmicStar({
            style: {
                x: 200,
                y: 100,
                r: 150,
                n: 5,
                text: '五角星'
            }
        });
        var options = {
            target: star
        };
        var clip = new Clip(options);
        clip._needsRemove = true;
        animation.add(clip);
        spyOn(animation, 'dispatch').and.callThrough();
        animation._update();
        expect(animation.dispatch).toHaveBeenCalled();
    });

    it('_catmullRomInterpolateArray,_interpolateArray,_cloneValue,_catmullRomInterpolate', () => {
        var p0 = new Array("1");
        var p1 = new Array("2");
        var p2 = new Array("3");
        var p3 = new Array("4");
        var out = new Array();
        var t = 1;
        var t2 = 1;
        var t3 = 1;
        var arrDim = 1;
        var percent = 0.3;
        Animation._catmullRomInterpolateArray(p0, p1, p2, p3, t, t2, t3, out, arrDim);
        expect(out.length).toBe(1);
        Animation._interpolateArray(p0, p1, percent, out, arrDim)
        expect(out[0]).toBe('0.31');

        p0 = [];
        p0[0] = [1, 2]
        p1 = [];
        p1[0] = [1, 2]
        p2 = [];
        p2[0] = [1, 2];
        p3 = [];
        p3[0] = [1, 2]
        arrDim = 2;
        out[0] = new Array();
        Animation._catmullRomInterpolateArray(p0, p1, p2, p3, t, t2, t3, out, arrDim);
        expect(out[0][0]).toBe(1);
        Animation._interpolateArray(p0, p1, percent, out, arrDim)
        expect(out[0][0]).toBe(1);
        var result = Animation._cloneValue(out);
        expect(result[0].length).toBe(2);
    });

    it('rgba2String', () => {
        var rgba = new Array(25, 255, 255);
        expect(Animation.rgba2String(rgba)).toEqual("rgba(25,255,255)");
    });

})