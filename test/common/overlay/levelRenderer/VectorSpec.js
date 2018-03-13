import {Vector} from '../../../../src/common/overlay/levelRenderer/Vector';

describe('Vector', () => {
    it('constructor, create, copy', () => {
        var vector = new Vector();
        spyOn(vector, 'create').and.callThrough();
        spyOn(vector, 'copy').and.callThrough();
        var outVector = vector.create(10, 10);
        var newVector = vector.create();
        expect(vector.create).toHaveBeenCalledWith(10, 10);
        expect(vector.create.calls.count()).toEqual(2);
        expect(newVector[0]).toEqual(0);
        expect(newVector[1]).toEqual(0);
        vector.copy(newVector, outVector);
        expect(vector.copy).toHaveBeenCalledWith(newVector, outVector);
        expect(vector.copy.calls.count()).toEqual(1);
        expect(vector).not.toBeNull();
        expect(outVector[0]).toEqual(10);
        expect(outVector[1]).toEqual(10);
        expect(newVector[0]).toEqual(10);
        expect(newVector[1]).toEqual(10);
    });

    it('set', () => {
        var vector = new Vector();
        spyOn(vector, 'create').and.callThrough();
        spyOn(vector, 'set').and.callThrough();
        var outVector = vector.create();
        vector.set(outVector, 20, 20);
        expect(vector.set).toHaveBeenCalledWith(outVector, 20, 20);
        expect(vector.create.calls.count()).toEqual(1);
        expect(vector.set.calls.count()).toEqual(1);
        expect(outVector[0]).toEqual(20);
        expect(outVector[1]).toEqual(20);
    });

    it('add', () => {
        var vector = new Vector();
        spyOn(vector, 'create').and.callThrough();
        spyOn(vector, 'add').and.callThrough();
        var vector0 = vector.create();
        var vector1 = vector.create(10, 10);
        var vector2 = vector.create(20, 20);
        vector.add(vector0, vector1, vector2);
        expect(vector.add).toHaveBeenCalledWith(vector0, vector1, vector2);
        expect(vector.create.calls.count()).toEqual(3);
        expect(vector0[0]).toEqual(30);
        expect(vector0[1]).toEqual(30);
    });

    it('scaleAndAdd', () => {
        var vector = new Vector();
        spyOn(vector, 'create').and.callThrough();
        spyOn(vector, 'scaleAndAdd').and.callThrough();
        var vector0 = vector.create();
        var vector1 = vector.create(10, 10);
        var vector2 = vector.create(20, 20);
        vector.scaleAndAdd(vector0, vector1, vector2, 2);
        expect(vector.scaleAndAdd).toHaveBeenCalledWith(vector0, vector1, vector2, 2);
        expect(vector.create.calls.count()).toEqual(3);
        expect(vector0[0]).toEqual(50);
        expect(vector0[1]).toEqual(50);
    });

    it('sub', () => {
        var vector = new Vector();
        spyOn(vector, 'create').and.callThrough();
        spyOn(vector, 'sub').and.callThrough();
        var vector0 = vector.create();
        var vector1 = vector.create(10, 10);
        var vector2 = vector.create(20, 20);
        vector.sub(vector0, vector2, vector1);
        expect(vector.sub).toHaveBeenCalledWith(vector0, vector2, vector1);
        expect(vector.create.calls.count()).toEqual(3);
        expect(vector0[0]).toEqual(10);
        expect(vector0[1]).toEqual(10);
    });

    it('len, lenSquare, length, lengthSquare', () => {
        var vector = new Vector();
        spyOn(vector, 'create').and.callThrough();
        spyOn(vector, 'len').and.callThrough();
        spyOn(vector, 'lenSquare').and.callThrough();
        spyOn(vector, 'length').and.callThrough();
        spyOn(vector, 'lengthSquare').and.callThrough();
        var vector0 = vector.create(10, 10);
        var len = vector.len(vector0);
        var lenSquare = vector.lenSquare(vector0);
        var length = vector.length(vector0);
        var lengthSquare = vector.lengthSquare(vector0);
        expect(vector.len).toHaveBeenCalledWith(vector0);
        expect(vector.lenSquare).toHaveBeenCalledWith(vector0);
        expect(vector.length).toHaveBeenCalledWith(vector0);
        expect(vector.lengthSquare).toHaveBeenCalledWith(vector0);
        expect(vector.create).toHaveBeenCalledWith(10, 10);
        expect(len).not.toBeNaN();
        expect(length).not.toBeNaN();
        expect(lenSquare).toEqual(200);
        expect(lengthSquare).toEqual(200);
    });

    it('mul, div', () => {
        var vector = new Vector();
        spyOn(vector, 'create').and.callThrough();
        spyOn(vector, 'mul').and.callThrough();
        spyOn(vector, 'div').and.callThrough();
        var vector0 = vector.create();
        var vector1 = vector.create(10, 10);
        var vector2 = vector.create(20, 20);
        vector.mul(vector0, vector1, vector2);
        expect(vector.mul).toHaveBeenCalledWith(vector0, vector1, vector2);
        expect(vector.create.calls.count()).toEqual(3);
        expect(vector0[0]).toEqual(200);
        expect(vector0[1]).toEqual(200);
        vector.div(vector0, vector2, vector1);
        expect(vector.div).toHaveBeenCalledWith(vector0, vector2, vector1);
        expect(vector0[0]).toEqual(2);
        expect(vector0[1]).toEqual(2);
    });

    it('dot', () => {
        var vector = new Vector();
        spyOn(vector, 'create').and.callThrough();
        spyOn(vector, 'dot').and.callThrough();
        var vector1 = vector.create(10, 10);
        var vector2 = vector.create(20, 20);
        var result = vector.dot(vector1, vector2);
        expect(vector.dot).toHaveBeenCalledWith(vector1, vector2);
        expect(vector.create.calls.count()).toEqual(2);
        expect(result).toEqual(400);
    });

    it('scale', () => {
        var vector = new Vector();
        spyOn(vector, 'create').and.callThrough();
        spyOn(vector, 'scale').and.callThrough();
        var vector0 = vector.create();
        var vector1 = vector.create(10, 10);
        vector.scale(vector0, vector1, 0.5);
        expect(vector.scale).toHaveBeenCalledWith(vector0, vector1, 0.5);
        expect(vector.create.calls.count()).toEqual(2);
        expect(vector0[0]).toEqual(5);
        expect(vector0[1]).toEqual(5);
    });

    it('normalize', () => {
        var vector = new Vector();
        spyOn(vector, 'create').and.callThrough();
        spyOn(vector, 'normalize').and.callThrough();
        var vector0 = vector.create();
        var vector1 = vector.create(10, 10);
        var vector2 = vector.create(0, 0);
        vector.normalize(vector0, vector1);
        expect(vector.normalize).toHaveBeenCalledWith(vector0, vector1);
        expect(vector.create.calls.count()).toEqual(3);
        expect(vector0[0]).not.toBeNaN();
        expect(vector0[1]).not.toBeNaN();
        vector.normalize(vector0, vector2);
        expect(vector.normalize).toHaveBeenCalledWith(vector0, vector2);
        expect(vector0[0]).toEqual(0);
        expect(vector0[1]).toEqual(0);
    });

    it('distance, distanceSquare, dist, distSquare', () => {
        var vector = new Vector();
        spyOn(vector, 'create').and.callThrough();
        spyOn(vector, 'distance').and.callThrough();
        spyOn(vector, 'distanceSquare').and.callThrough();
        spyOn(vector, 'dist').and.callThrough();
        spyOn(vector, 'distSquare').and.callThrough();
        var vector1 = vector.create(10, 10);
        var vector2 = vector.create(20, 20);
        var distance = vector.distance(vector1, vector2);
        var distanceSquare = vector.distanceSquare(vector1, vector2);
        var dist = vector.dist(vector1, vector2);
        var distSquare = vector.distSquare(vector1, vector2);
        expect(vector.distance).toHaveBeenCalledWith(vector1, vector2);
        expect(vector.distanceSquare).toHaveBeenCalledWith(vector1, vector2);
        expect(vector.dist).toHaveBeenCalledWith(vector1, vector2);
        expect(vector.distSquare).toHaveBeenCalledWith(vector1, vector2);
        expect(vector.create.calls.count()).toEqual(2);
        expect(distance).not.toBeNaN();
        expect(dist).not.toBeNaN();
        expect(distanceSquare).toEqual(200);
        expect(distSquare).toEqual(200);
    });

    it('negate', () => {
        var vector = new Vector();
        spyOn(vector, 'create').and.callThrough();
        spyOn(vector, 'negate').and.callThrough();
        var vector0 = vector.create();
        var vector1 = vector.create(10, 10);
        vector.negate(vector0, vector1);
        expect(vector.negate).toHaveBeenCalledWith(vector0, vector1);
        expect(vector.create.calls.count()).toEqual(2);
        expect(vector0[0]).toEqual(-10);
        expect(vector0[1]).toEqual(-10);
    });

    it('lerp', () => {
        var vector = new Vector();
        spyOn(vector, 'create').and.callThrough();
        spyOn(vector, 'lerp').and.callThrough();
        var vector0 = vector.create();
        var vector1 = vector.create(10, 10);
        var vector2 = vector.create(20, 20);
        vector.lerp(vector0, vector1, vector2, 2);
        expect(vector.lerp).toHaveBeenCalledWith(vector0, vector1, vector2, 2);
        expect(vector.create.calls.count()).toEqual(3);
        expect(vector0[0]).toEqual(30);
        expect(vector0[1]).toEqual(30);
    });

    it('applyTransform', () => {
        var vector = new Vector();
        spyOn(vector, 'create').and.callThrough();
        spyOn(vector, 'applyTransform').and.callThrough();
        var m = [1, 2, 3, 4, 5, 6];
        var vector0 = vector.create();
        var vector1 = vector.create(10, 10);
        vector.applyTransform(vector0, vector1, m);
        expect(vector.applyTransform).toHaveBeenCalledWith(vector0, vector1, m);
        expect(vector.create.calls.count()).toEqual(2);
        expect(vector0[0]).toEqual(45);
        expect(vector0[1]).toEqual(66);
    });

    it('min, max', () => {
        var vector = new Vector();
        spyOn(vector, 'create').and.callThrough();
        spyOn(vector, 'min').and.callThrough();
        spyOn(vector, 'max').and.callThrough();
        var vector0 = vector.create();
        var vector1 = vector.create(10, 10);
        var vector2 = vector.create(20, 20);
        vector.min(vector0, vector1, vector2);
        expect(vector.min).toHaveBeenCalledWith(vector0, vector1, vector2);
        expect(vector.create.calls.count()).toEqual(3);
        expect(vector0[0]).toEqual(10);
        expect(vector0[1]).toEqual(10);
        vector.max(vector0, vector1, vector2);
        expect(vector.max).toHaveBeenCalledWith(vector0, vector1, vector2);
        expect(vector0[0]).toEqual(20);
        expect(vector0[1]).toEqual(20);
    });
});                          