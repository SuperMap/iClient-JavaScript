var Clip = require('../../../../src/common/overlay/levelRenderer/Clip').Clip;
var SmicStar = require('../../../../src/common/overlay/levelRenderer/SmicStar').SmicStar;

describe('Clip', function () {
    it('constructor', function () {
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
        expect(clip).not.toBeNull();
        expect(clip.easing).toEqual("Linear");
        expect(clip._endTime).not.toBeNaN();
        expect(clip._startTime).not.toBeNaN();
        expect(clip._targetPool[0].type).toEqual("smicstar");
        expect(clip._targetPool[0].style.text).toEqual("五角星");
        clip.destroy();
    });

    //不循环开始
    it('step', function () {
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
        var result = clip.step(2512899262329);
        expect(result).toEqual("destroy");
    });

    //循环开始
    it('step_loop', function () {
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
        clip.loop = true;
        var result = clip.step(2512899262329);
        expect(result).toEqual("restart");
    });

    //参数time < 动画开始的时间
    it('step_time', function () {
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
        clip.loop = true;
        var result = clip.step(1000);
        expect(result).toBeUndefined();
    });

    it('restart, fire', function () {
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
        clip.restart();
        clip.fire("Click");
    });
});