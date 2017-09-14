require('../../../../src/common/overlay/levelRenderer/Color');

describe('testColor', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it("init", function () {
        var init = new SuperMap.LevelRenderer.Tool.Color();
        expect(init.palette).not.toBeNull();
        expect(JSON.stringify(init.palette)).toBe(`["#ff9277"," #dddd00"," #ffc877"," #bbe3ff"," #d5ffbb","#bbbbff"," #ddb000"," #b0dd00"," #e2bbff"," #ffbbe3","#ff7777"," #ff9900"," #83dd00"," #77e3ff"," #778fff","#c877ff"," #ff77ab"," #ff6600"," #aa8800"," #77c7ff","#ad77ff"," #ff77ff"," #dd0083"," #777700"," #00aa00","#0088aa"," #8400dd"," #aa0088"," #dd0000"," #772e00"]`);
        expect(init.highlightColor).toBe('rgba(0,0,255,1)');
        expect(init.colorRegExp).not.toBeNull();
        expect(init.colorRegExp.toString()).toBe(`/^\\s*((#[a-f\\d]{6})|(#[a-f\\d]{3})|rgba?\\(\\s*([\\d\\.]+%?\\s*,\\s*[\\d\\.]+%?\\s*,\\s*[\\d\\.]+%?(?:\\s*,\\s*[\\d\\.]+%?)?)\\s*\\)|hsba?\\(\\s*([\\d\\.]+(?:deg|\\xb0|%)?\\s*,\\s*[\\d\\.]+%?\\s*,\\s*[\\d\\.]+%?(?:\\s*,\\s*[\\d\\.]+)?)%?\\s*\\)|hsla?\\(\\s*([\\d\\.]+(?:deg|\\xb0|%)?\\s*,\\s*[\\d\\.]+%?\\s*,\\s*[\\d\\.]+%?(?:\\s*,\\s*[\\d\\.]+)?)%?\\s*\\))\\s*$/i`)
    });

    it("customPalette", function () {
        var userPalete = ['#ff9277', '#dddd00'];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        init.customPalette(userPalete);
        expect(init.palette).not.toBeNull();
        expect(JSON.stringify(init.palette)).toBe('["#ff9277","#dddd00"]');
    });

    it("resetPalette", function () {
        var userPalete = ['#ff9277', '#dddd00'];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        init.customPalette(userPalete);
        expect(JSON.stringify(init.palette)).toBe('["#ff9277","#dddd00"]');
        init.resetPalette();
        expect(init.palette).not.toBeNull();
        expect(JSON.stringify(init.palette)).toBe(`["#ff9277"," #dddd00"," #ffc877"," #bbe3ff"," #d5ffbb","#bbbbff"," #ddb000"," #b0dd00"," #e2bbff"," #ffbbe3","#ff7777"," #ff9900"," #83dd00"," #77e3ff"," #778fff","#c877ff"," #ff77ab"," #ff6600"," #aa8800"," #77c7ff","#ad77ff"," #ff77ff"," #dd0083"," #777700"," #00aa00","#0088aa"," #8400dd"," #aa0088"," #dd0000"," #772e00"]`);
    });


    it("getColor", function () {
        var idx = 1;
        var userPalete = ['#ff9277', '#dddd00'];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        init.customPalette(userPalete);
        var result = init.getColor(idx, userPalete);
        expect(result).not.toBeNull();
        expect(result).toBe('#dddd00');
    });


    it("getHighlightColor", function () {
        var userHighlightColor = '#e43';
        var init = new SuperMap.LevelRenderer.Tool.Color();
        init.customHighlight(userHighlightColor);
        var result = init.getHighlightColor();
        expect(result).toBe('#e43');
    });

    it("customHighlight", function () {
        var userHighlightColor = '#e43';
        var init = new SuperMap.LevelRenderer.Tool.Color();
        init.customHighlight(userHighlightColor);
        expect(init.getHighlightColor()).toBe('#e43');
    });


    it("resetHighlight", function () {
        var userHighlightColor = '#e43';
        var init = new SuperMap.LevelRenderer.Tool.Color();
        init.customHighlight(userHighlightColor);
        init.resetHighlight();
        expect(init.getHighlightColor()).toBe('rgba(0,0,255,1)');
    });


    it("getRadialGradient", function () {
        var x0 = 75, y0 = 50, r0 = 5, x1 = 90, y1 = 60, r1 = 100,
            colorList = [[0, 'red'], [1 / 6, 'orange'], [2 / 6, 'yellow'], [3 / 6, 'green'], [4 / 6, 'aqua'], [5 / 6, 'blue'], [1, 'purple']];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.getRadialGradient(x0, y0, r0, x1, y1, r1, colorList);
        expect(result).not.toBeNull();
        expect(result instanceof CanvasGradient).toBeTruthy();
        expect(result.__nonRecursion).toBeTruthy();
    });


    it("getLinearGradient", function () {
        var x0 = 75, y0 = 50, r0 = 5, x1 = 90, y1 = 60, r1 = 100,
            colorList = [[0, 'red'], [1 / 6, 'orange'], [2 / 6, 'yellow'], [3 / 6, 'green'], [4 / 6, 'aqua'], [5 / 6, 'blue'], [1, 'purple']];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.getLinearGradient(x0, y0, r0, x1, y1, r1, colorList);
        expect(result).not.toBeNull();
        expect(result instanceof CanvasGradient).toBeTruthy();
        expect(result.__nonRecursion).toBeTruthy();
    });


    it("getStepColors", function () {
        var start = 'red', end = 'green', step = 6;
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.getStepColors(start, end, step);
        expect(result).not.toBeNull();
        expect(result instanceof Array).toBeTruthy();
        expect(JSON.stringify(result)).toBe('["rgba(255,0,0,1)","rgba(212,21,0,1)","rgba(170,42,0,1)","rgba(127,64,0,1)","rgba(85,85,0,1)","rgba(42,106,0,1)","rgba(0,128,0,1)"]');
    });

    it("getGradientColors", function () {
        var colors = ["yellow", "red"], step = 6;
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.getGradientColors(colors, step);
        expect(result).not.toBeNull();
        expect(result instanceof Array).toBeTruthy();
        expect(result.toString()).toBe('rgba(255,255,0,1),rgba(255,212,0,1),rgba(255,170,0,1),rgba(255,127,0,1),rgba(255,85,0,1),rgba(255,42,0,1),rgba(255,0,0,1)');
    });


    it("toColor_rgb", function () {
        var data = [0, 191, 255, 0.5], format = 'rgb';
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.toColor(data, format);
        expect(result).not.toBeNull();
        expect(result).toBe("rgb(0,191,255)");
    });


    it("toColor_hsl", function () {
        var data = [0, 191, 255, 0.5], format = 'hsl';
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.toColor(data, format);
        expect(result).not.toBeNull();
        expect(result).toBe("hsl(0,191%,255%)");
    });


    it("toArray", function () {
        var color = 'red';
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.toArray(color);
        expect(result).not.toBeNull();
        expect(result instanceof Array).toBeTruthy();
        expect(JSON.stringify(result)).toBe('[255,0,0,1]');
    });

    it("convert_rgb", function () {
        var color = 'red', format = "rgb";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.convert(color, format);
        expect(result).not.toBeNull();
        expect(result).toBe('rgb(255,0,0)');
    });

    it("convert_format_hsb", function () {
        var color = 'red', format = "hsb";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.convert(color, format);
        expect(result).not.toBeNull();
        expect(result).toBe('hsb(0,100%,100%)');
    });


    it("convert_format_hsl", function () {
        var color = 'red', format = "hsl";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.convert(color, format);
        expect(result).not.toBeNull();
        expect(result).toBe('hsl(0,100%,50%)');
    });

    it("convert_color_hsb", function () {
        var color = 'hsb(0,100%,100%)', format = "rgb";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.convert(color, format);
        expect(result).not.toBeNull();
        expect(result).toBe('rgb(255,0,0)');
    });

    it("convert_color_hsl", function () {
        var color = 'hsl(0,100%,50%)', format = "hex";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.convert(color, format);
        expect(result).not.toBeNull();
        expect(result).toBe('#ff0000');
    });

    it("convert_errorFormat_color", function () {
        var color = {red: "255,0,0,1"}, format = "rgb";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.convert(color, format);
        expect(result.red).toBe("255,0,0,1");
    });

    it("toRGBA", function () {
        var color = "red";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.toRGBA(color);
        expect(result).toBe("rgba(255,0,0,1)");
    });

    it("toRGB", function () {
        var color = "#7FFFAA";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.toRGB(color);
        expect(result).toBe('rgb(127,255,170)');
    });


    it("toHex", function () {
        var color = "red";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.toHex(color);
        expect(result).toBe('#ff0000');
    });


    it("toHSVA", function () {
        var color = "red";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.toHSVA(color);
        expect(result).toBe('hsva(0,100%,100%,1)');
    });

    it("toHSV", function () {
        var color = "red";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.toHSV(color);
        expect(result).toBe('hsv(0,100%,100%)');
    });

    it("toHSBA", function () {
        var color = "red";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.toHSBA(color);
        expect(result).toBe('hsba(0,100%,100%,1)');
    });

    it("toHSB", function () {
        var color = "red";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.toHSB(color);
        expect(result).toBe('hsb(0,100%,100%)');
    });

    it("toHSLA", function () {
        var color = "red";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.toHSLA(color);
        expect(result).toBe('hsla(0,100%,50%,1)');
    });

    it("toHSL", function () {
        var color = "red";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.toHSL(color);
        expect(result).toBe('hsl(0,100%,50%)');
    });

    it("toName", function () {
        var color = "red";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.toName(color);
        expect(result).toBe('red');
    });


    it("trim", function () {
        var color = "#e4 32e 2d";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.trim(color);
        expect(result).toBe('#e432e2d');
    });


    it("normalize", function () {
        var color = "#e4 32e 2d ";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.normalize(color);
        expect(result).toBe('#e432e2d')
    });


    it("lift", function () {
        var color = "#00BFFF";
        var level = 0.1;
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.lift(color, level);
        expect(result).toBe('rgb(0,171,229)');
    });

    it("lift_errorFomart_color", function () {
        var color = {'red': '#e43'};
        var level = 0.1;
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.lift(color, level);
        expect(result).not.toBeNull();
        expect(JSON.stringify(result)).toBe('{"red":"#e43"}');
    });

    it("lift_levelToBe_Undefined", function () {
        var color = "#00BFFF";
        var level = undefined;
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.lift(color, level);
        expect(result).toBe('rgb(0,191,255)');
    });

    it("reverse", function () {
        var color = "#DA70D6";
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.reverse(color);
        expect(result).toBe('rgb(37,143,41)');
    });


    it("reverse_errorFormat_color", function () {
        var color = {'red': "#e43"};
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.reverse(color);
        expect(result).not.toBeNull();
        expect(JSON.stringify(result)).toBe('{"red":"#e43"}');
    });


    it("mix", function () {
        var color1 = "#DA70D6";
        var color2 = "#00BFFF";
        var weight = 0.5;
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.mix(color1, color2, weight);

        expect(result).toBe('rgb(109,152,235)');
    });


    it("mix_errorFormat_color", function () {
        var color1 = "#DA70D6";
        var color2 = {'red': "#e43"};
        var weight = 0.5;
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.mix(color1, color2, weight);
        expect(result).toBe('#DA70D6');
    });


    it("mix_weightTObe_undefined", function () {
        var color1 = "#DA70D6";
        var color2 = "#00BFFF";
        var weight = undefined;
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.mix(color1, color2, weight);
        expect(result).toBe('rgb(109,152,235)');
    });


    it("random", function () {
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.random();
        var toarry = init.toArray(result);
        expect(toarry instanceof Array).toBeTruthy();
        expect(toarry.length).toBeGreaterThanOrEqual(3);
    });


    it("alpha", function () {
        var color = '#DA70D6', a = 0.5;
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.alpha(color, a);
        expect(result).toBe('rgba(218,112,214,0.5000)');
    });


    it("alpha_errorFormat_color", function () {
        var color = {"red": "#e43"}, a = 0.5;
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.alpha(color, a);
        expect(result).not.toBeNull();
        expect(JSON.stringify(result)).toBe('{"red":"#e43"}');
    });


    it("alpha_a_TObe_zero", function () {
        var color = '#DA70D6', a = null;
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init.alpha(color, a);
        expect(result).toBe('rgba(218,112,214,1)');
    });


    it("_HSV_2_RGB_with_S_toBe_zero", function () {
        var data = [1.0, 0.0, 1.0];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init._HSV_2_RGB(data);
        expect(result).not.toBeNull();
        expect(result instanceof Array).toBeTruthy();
        expect(result.toString()).toBe("255,255,255");
    });

    it("_HSV_2_RGB_with_S_NotToBe_zero_and_i_equalTo_3", function () {
        var data = [0.5, 0.5, 1.0];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init._HSV_2_RGB(data);
        expect(result instanceof Array).toBeTruthy();
        expect(result.toString()).toBe("127.5,255,255");
    });

    it("_HSV_2_RGB_with_S_NotToBe_zero_and_i_equalTo_1", function () {
        var data = [1 / 6, 0.5, 1.0];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init._HSV_2_RGB(data);
        expect(result).not.toBeNull();
        expect(result instanceof Array).toBeTruthy();
        expect(result.toString()).toBe("255,255,127.5");
    });

    it("_HSV_2_RGB_with_S_NotToBe_zero_and_i_equalTo_2", function () {
        var data = [1 / 3, 0.5, 1.0];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init._HSV_2_RGB(data);
        expect(result).not.toBeNull();
        expect(result instanceof Array).toBeTruthy();
        expect(result.toString()).toBe("127.5,255,127.5");
    });

    it("_HSV_2_RGB_with_S_NotToBe_zero_and_i_equalTo_4", function () {
        var data = [2 / 3, 0.5, 1.0];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init._HSV_2_RGB(data);
        expect(result).not.toBeNull();
        expect(result instanceof Array).toBeTruthy();
        expect(result.toString()).toBe("127.5,127.5,255");
    });

    it("_HSV_2_RGB_with_S_NotToBe_zero_and_i_equalTo_default", function () {
        var data = [5 / 6, 0.5, 1.0];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init._HSV_2_RGB(data);
        expect(result).not.toBeNull();
        expect(result instanceof Array).toBeTruthy();
        expect(result.toString()).toBe("255,127.5,255");
    });

    it("_HSL_2_RGB", function () {
        var data = [5 / 6, 0, 1.0];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init._HSL_2_RGB(data);
        expect(result).not.toBeNull();
        expect(result instanceof Array).toBeTruthy();
        expect(result.toString()).toBe("255,255,255");
    });

    it("_RGB_2_HSB_delta_equalTO_zero", function () {
        var data = [0.5, 0.5, 0.5];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init._RGB_2_HSB(data);
        expect(result).not.toBeNull();
        expect(result instanceof Array).toBeTruthy();
        expect(result.toString()).toBe("0,0,0.19607843137254902");
    });

    it("_RGB_2_HSB_G_is_max", function () {
        var data = [0.5, 0.6, 0.5];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init._RGB_2_HSB(data);
        expect(result).not.toBeNull();
        expect(result instanceof Array).toBeTruthy();
        expect(result.toString()).toBe("120.00000000000001,16.66666666666666,0.2352941176470588");
    });

    it("_RGB_2_HSB_B_is_max", function () {
        var data = [0.5, 0.5, 0.8];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init._RGB_2_HSB(data);
        expect(result).not.toBeNull();
        expect(result instanceof Array).toBeTruthy();
        expect(result.toString()).toBe("240,37.50000000000001,0.3137254901960785");
    });

    it("_RGB_2_HSL_delta_equalTO_zero", function () {
        var data = [0.5, 0.5, 0.5];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init._RGB_2_HSL(data);
        expect(result).not.toBeNull();
        expect(result instanceof Array).toBeTruthy();
        expect(result.toString()).toBe("0,0,0.19607843137254902");
    });

    it("_RGB_2_HSL_G_is_max", function () {
        var data = [0.5, 0.6, 0.5];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init._RGB_2_HSL(data);
        expect(result).not.toBeNull();
        expect(result instanceof Array).toBeTruthy();
        expect(result.toString()).toBe("120.00000000000001,9.090909090909086,0.2156862745098039");
    });


    it("_RGB_2_HSL_B_is_max", function () {
        var data = [0.5, 0.5, 0.6];
        var init = new SuperMap.LevelRenderer.Tool.Color();
        var result = init._RGB_2_HSL(data);
        expect(result).not.toBeNull();
        expect(result instanceof Array).toBeTruthy();
        expect(result.toString()).toBe("240,9.090909090909086,0.2156862745098039");
    });


});
