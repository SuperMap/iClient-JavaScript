import {Curve} from '../../../../src/common/overlay/levelRenderer/Curve';
import {Vector} from '../../../../src/common/overlay/levelRenderer/Vector';

describe('Curve', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it("init", () => {
        var init = new Curve();
        expect(init.vector instanceof Vector).toBeTruthy();
        expect(init.EPSILON).toBe(1e-4);
        expect(init.THREE_SQRT).toBe(Math.sqrt(3));
        expect(init.ONE_THIRD).toBe(1 / 3);
    });

    it("isAroundZero", () => {
        var val = 1e-5;
        var init = new Curve();
        var result = init.isAroundZero(val);
        expect(result).toBeTruthy();
    });

    it("isNotAroundZero", () => {
        var val = 1e-3;
        var init = new Curve();
        var result = init.isNotAroundZero(val);
        expect(result).toBeTruthy();
    });

    it("cubicAt", () => {
        var p0 = 3, p1 = 1, p2 = 5, p3 = 7, t = 0.5;
        var init = new Curve();
        var result = init.cubicAt(p0, p1, p2, p3, t);
        expect(result).toBe(3.5);
    });

    it("cubicDerivativeAt", () => {
        var p0 = 3, p1 = 1, p2 = 5, p3 = 7, t = 0.5;
        var init = new Curve();
        var result = init.cubicDerivativeAt(p0, p1, p2, p3, t);
        expect(result).toBe(6);
    });

    it("cubicRootAt_A&B&b_aroundZero", () => {
        var p0 = 0, p1 = 0, p2 = 0, p3 = 0, val = 10, roots = [1];
        var init = new Curve();
        var result = init.cubicRootAt(p0, p1, p2, p3, val, roots);
        expect(result).toBe(0);
        expect(roots[0]).toBe(0);
    });

    it("cubicRootAt_A&B_aroundZero_b_isNot_zero", () => {
        var p0 = 0, p1 = 1, p2 = 1, p3 = 1, val = 1, roots = [];
        var init = new Curve();
        var result = init.cubicRootAt(p0, p1, p2, p3, val, roots);
        expect(result).toBe(1);
        expect(roots.length).toBe(1);
        expect(roots[0]).toBe(1);
    });

    it("cubicRootAt_A&B_notAroundZero_delta_moreThanZero", () => {
        var p0 = 2, p1 = 3, p2 = 10 / 3, p3 = 5, val = 1, roots = [];
        var init = new Curve();
        var result = init.cubicRootAt(p0, p1, p2, p3, val, roots);
        expect(roots.length).toBe(0);
        expect(result).toBe(0);
    });

    it("cubicRootAt_A&B_notAroundZero_delta_lessThanZero", () => {
        var p0 = 1, p1 = 5.5, p2 = 9.92, p3 = 5.888, val = 1, roots = [];
        var init = new Curve();
        var result = init.cubicRootAt(p0, p1, p2, p3, val, roots);
        expect(result).toBe(0);
        expect(roots.length).toBe(0);
    });

    it("cubicExtrema_a_isNotAroundZero", () => {
        var p0 = 1e-3, p1 = 1, p2 = 2, p3 = 3, extrema = [];
        var init = new Curve();
        var result = init.cubicExtrema(p0, p1, p2, p3, extrema);
        expect(result).toBe(0);
        expect(extrema.length).toBe(0);
    });

    it("cubicExtrema_a_isAroundZero", () => {
        var p0 = 1, p1 = 1, p2 = 2, p3 = 4, extrema = [];
        var init = new Curve();
        var result = init.cubicExtrema(p0, p1, p2, p3, extrema);
        expect(extrema.length).toBe(1);
        expect(result).toBe(1);
        expect(extrema[0]).toBe(-0);
    });

    it("cubicSubdivide", () => {
        var p0 = 3, p1 = 1, p2 = 5, p3 = 7, t = 0.6, out = [];
        var init = new Curve();
        init.cubicSubdivide(p0, p1, p2, p3, t, out);
        expect(out.length).toBe(8);
        expect(JSON.stringify(out)).toBe('[3,1.8,2.76,4.152,4.152,5.08,6.2,7]');

    });

    it("cubicProjectPoint", () => {
        var x0 = 3, y0 = 1, x1 = 1, y1 = 10, x2 = 5, y2 = 9, x3 = 7, y3 = 0, x = 0, y = 3, out = [];
        var init = new Curve();
        var result = init.cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, out);
        expect(result).toBe(2.6021716617236295);
    });

    it("quadraticAt", () => {
        var p0 = 1, p1 = 5, p2 = 10, t = 0.8;
        var init = new Curve();
        var result = init.quadraticAt(p0, p1, p2, t);
        expect(result).toBe(8.040000000000001);
    });

    it("quadraticDerivativeAt", () => {
        var p0 = 1, p1 = 5, p2 = 10, t = 0.8;
        var init = new Curve();
        var result = init.quadraticDerivativeAt(p0, p1, p2, t);
        expect(result).toBe(9.6);
    });

    it("quadraticRootAt_a_isAroundZero", () => {
        var p0 = 1, p1 = -1, p2 = -3, val = -3, roots = [];
        var init = new Curve();
        var result = init.quadraticRootAt(p0, p1, p2, val, roots);
        expect(roots.length).toBe(1);
        expect(result).toBe(1);
        expect(roots[0]).toBe(1);
    });

    it("quadraticRootAt_a_isNotAroundZero_delta_equalToZero", () => {
        var p0 = 1, p1 = 0, p2 = 0, val = 0, roots = [];
        var init = new Curve();
        var result = init.quadraticRootAt(p0, p1, p2, val, roots);
        expect(roots.length).toBe(1);
        expect(result).toBe(1);
        expect(roots[0]).toBe(1);
    });

    it("quadraticRootAt_a_isNotAroundZero_delta_moreThanZero", () => {
        var p0 = 0, p1 = 1, p2 = 3, val = 0, roots = [];
        var init = new Curve();
        var result = init.quadraticRootAt(p0, p1, p2, val, roots);
        expect(roots.length).toBe(1);
        expect(result).toBe(1);
        expect(roots[0]).toBe(0);
    });

    it("quadraticExtremum_divider_NotToBe_Zero", () => {
        var p0 = 3, p1 = 1, p2 = 5;
        var init = new Curve();
        var result = init.quadraticExtremum(p0, p1, p2);
        expect(result).toBe(1 / 3);
    });

    it("quadraticExtremum_divider_ToBe_Zero", () => {
        var p0 = 1, p1 = 1, p2 = 1;
        var init = new Curve();
        var result = init.quadraticExtremum(p0, p1, p2);
        expect(result).toBe(0.5);
    });

    it("quadraticProjectPoint", () => {
        var x0 = 3, y0 = 1, x1 = 1, y1 = 10, x2 = 5, y2 = 9, x = 0, y = 3, out = [];
        var init = new Curve();
        var result = init.quadraticProjectPoint(x0, y0, x1, y1, x2, y2, x, y, out);
        expect(result).toBe(2.5772794521647513);
    });
});