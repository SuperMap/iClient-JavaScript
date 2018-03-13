import {Transformable} from '../../../../src/common/overlay/levelRenderer/Transformable';

describe('Transformable', () => {
    var canvas, ctx;
    beforeAll(() => {
        canvas = window.document.createElement('CANVAS');
        canvas.width = 400;
        canvas.height = 400;
        canvas.style.border = "1px solid #000000";
        ctx = canvas.getContext('2d');
        window.document.body.appendChild(canvas);
    });
    afterAll(() => {
        window.document.body.removeChild(canvas);
    });

    it('updateNeedTransform, updateTransform', () => {
        var transformable = new Transformable();
        transformable.lookAt([1, 1]);
        transformable.lookAt([0, 0]);
        transformable.position = [1, 1];
        transformable.rotation = [1, 2];
        transformable.scale = [1, 1, 2, 2];
        spyOn(transformable, 'updateNeedTransform').and.callThrough();
        expect(transformable.needLocalTransform).toBeFalsy();
        expect(transformable.needTransform).toBeFalsy();
        transformable.updateTransform();
        expect(transformable.needLocalTransform).toBeTruthy();
        expect(transformable.needTransform).toBeTruthy();
        expect(transformable.transform).not.toBeNull();
        transformable.rotation = 3;
        transformable.updateTransform();
        expect(transformable.needLocalTransform).toBeTruthy();
        expect(transformable.needTransform).toBeTruthy();
        expect(transformable.rotation).toEqual(3);
        expect(transformable.transform).not.toBeNull();
        expect(transformable.updateNeedTransform).toHaveBeenCalled();
        expect(transformable.updateNeedTransform.calls.count()).toEqual(2);
        transformable.destroy();
    });

    it('setTransform', () => {
        var transformable = new Transformable();
        transformable.position = [1, 1];
        spyOn(ctx, 'transform').and.callThrough();
        transformable.updateTransform();
        transformable.setTransform(ctx);
        expect(ctx.transform).toHaveBeenCalled();
        transformable.destroy();
    });

    it('decomposeTransform', () => {
        var transformable = new Transformable();
        transformable.decomposeTransform();
        transformable.position = [12, 10];
        transformable.rotation = [10, 20];
        transformable.scale = [10, 10, 20, 20];
        transformable.updateTransform();
        expect(transformable.position[0]).toEqual(12);
        expect(transformable.position[1]).toEqual(10);
        expect(transformable.rotation[0]).toEqual(10);
        expect(transformable.rotation[1]).toEqual(20);
        expect(transformable.scale[0]).toEqual(10);
        expect(transformable.scale[1]).toEqual(10);
        expect(transformable.scale[2]).toEqual(20);
        expect(transformable.scale[3]).toEqual(20);
        transformable.decomposeTransform();
        expect(transformable.position[0]).not.toBe(12);
        expect(transformable.position[1]).not.toBe(10);
        expect(transformable.rotation[0]).not.toBe(10);
        expect(transformable.rotation[1]).not.toBe(20);
        expect(transformable.scale[0]).not.toBe(10);
        expect(transformable.scale[1]).not.toBe(10);
        expect(transformable.scale[2]).not.toBe(20);
        expect(transformable.scale[3]).not.toBe(20);
        transformable.destroy();
    });
});