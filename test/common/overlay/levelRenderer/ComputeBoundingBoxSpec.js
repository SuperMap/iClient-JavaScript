import {ComputeBoundingBox} from '../../../../src/common/overlay/levelRenderer/ComputeBoundingBox';

describe('ComputeBoundingBox', () => {
    it('computeBoundingBox', () => {
        var computeTool = new ComputeBoundingBox();
        var points = [[10, 10], [5, 20], [20, 5], [20, 20]];
        var min = [], max = [];
        spyOn(computeTool, 'computeBoundingBox').and.callThrough();
        computeTool.computeBoundingBox(points, min, max);
        computeTool.computeBoundingBox([], min, max);
        expect(computeTool.computeBoundingBox).toHaveBeenCalledWith(points, min, max);
        expect(computeTool.computeBoundingBox).toHaveBeenCalledWith([], min, max);
        expect(computeTool).not.toBeNull();
        expect(min[0]).toEqual(5);
        expect(min[1]).toEqual(5);
        expect(max[0]).toEqual(20);
        expect(max[1]).toEqual(20);
    });

    it('cubeBezier', () => {
        var computeTool = new ComputeBoundingBox();
        var p0 = [15, 20];
        var p1 = [10, 30];
        var p2 = [20, 70];
        var p3 = [50, 60];
        var min = [], max = [];
        spyOn(computeTool, 'cubeBezier').and.callThrough();
        computeTool.cubeBezier(p0, p1, p2, p3, min, max);
        expect(computeTool.cubeBezier).toHaveBeenCalledWith(p0, p1, p2, p3, min, max);
        expect(computeTool).not.toBeNull();
        expect(min[0]).not.toBeNaN();
        expect(min[1]).not.toBeNaN();
        expect(max[0]).not.toBeNaN();
        expect(max[1]).not.toBeNaN();
    });

    it('quadraticBezier', () => {
        var computeTool = new ComputeBoundingBox();
        var p0 = [15, 20];
        var p1 = [10, 30];
        var p2 = [20, 70];
        var min = [], max = [];
        spyOn(computeTool, 'quadraticBezier').and.callThrough();
        computeTool.quadraticBezier(p0, p1, p2, min, max);
        expect(computeTool.quadraticBezier).toHaveBeenCalledWith(p0, p1, p2, min, max);
        expect(computeTool).not.toBeNull();
        expect(min[0]).not.toBeNaN();
        expect(min[1]).not.toBeNaN();
        expect(max[0]).not.toBeNaN();
        expect(max[1]).not.toBeNaN();
    });

    it('arc', () => {
        var min = [], max = [];
        var computeTool = new ComputeBoundingBox();
        spyOn(computeTool, 'arc').and.callThrough();
        computeTool.arc(100, 100, 60, -30, -120, true, min, max);
        computeTool.arc(100, 100, 60, 30, 120, false, min, max);
        expect(computeTool.arc).toHaveBeenCalledWith(100, 100, 60, 30, 120, false, min, max);
        expect(computeTool.arc).toHaveBeenCalledWith(100, 100, 60, -30, -120, true, min, max);
        expect(min[0]).not.toBeNaN();
        expect(min[1]).not.toBeNaN();
        expect(max[0]).not.toBeNaN();
        expect(max[1]).not.toBeNaN();
    });
});