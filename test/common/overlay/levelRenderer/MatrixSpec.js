import {Matrix} from '../../../../src/common/overlay/levelRenderer/Matrix';

describe('Matrix', () => {
    it('constructor, identity', () => {
        var matrixTool = new Matrix();
        expect(matrixTool).not.toBeNull();
        //创建一个单位矩阵
        var result = matrixTool.create();
        expect(result).not.toBeNull();
        expect(result[0]).toEqual(1);
        expect(result[1]).toEqual(0);
        expect(result[2]).toEqual(0);
        expect(result[3]).toEqual(1);
        expect(result[4]).toEqual(0);
        expect(result[5]).toEqual(0);
    });

    it('copy', () => {
        var matrixTool = new Matrix();
        //创建一个单位矩阵
        var E = matrixTool.create();
        var ArrayCtor = matrixTool.ArrayCtor;
        var matrix = new ArrayCtor(6);
        matrix[2] = 2;
        var newMatrix = matrixTool.copy(E, matrix);
        expect(newMatrix[0]).toEqual(0);
        expect(newMatrix[2]).toEqual(2);
    });

    it('mul', () => {
        var matrixTool = new Matrix();
        //创建一个单位矩阵E
        var E = matrixTool.create();
        var matrix1 = [1, 2, 3, 1, 2, 3];
        var matrix2 = [1, 2, 1, 1, 2, 1];
        var newMatrix = matrixTool.mul(E, matrix1, matrix2);
        expect(newMatrix).not.toBeNull();
        expect(newMatrix[0]).toEqual(7);
        expect(newMatrix[1]).toEqual(4);
        expect(newMatrix[2]).toEqual(4);
        expect(newMatrix[3]).toEqual(3);
        expect(newMatrix[4]).toEqual(7);
        expect(newMatrix[5]).toEqual(8);
    });

    //平移变换
    it('translate', () => {
        var matrixTool = new Matrix();
        //创建一个单位矩阵E
        var E = matrixTool.create();
        var matrix1 = [1, 2, 3, 1, 2, 3];
        //平移参数
        var v = [1, 1];
        var newMatrix = matrixTool.translate(E, matrix1, v);
        expect(newMatrix).not.toBeNull();
        expect(newMatrix[0]).toEqual(1);
        expect(newMatrix[1]).toEqual(2);
        expect(newMatrix[2]).toEqual(3);
        expect(newMatrix[3]).toEqual(1);
        expect(newMatrix[4]).toEqual(3);
        expect(newMatrix[5]).toEqual(4);
    });

    //旋转变换
    it('rotate', () => {
        var matrixTool = new Matrix();
        //创建一个单位矩阵E
        var E = matrixTool.create();
        var matrix1 = [1, 2, 3, 1, 2, 3];
        //旋转参数
        var rad = 30;
        var newMatrix = matrixTool.rotate(E, matrix1, rad);
        expect(newMatrix).not.toBeNull();
        expect(newMatrix[0]).not.toBeNaN();
        expect(newMatrix[1]).not.toBeNaN();
        expect(newMatrix[2]).not.toBeNaN();
        expect(newMatrix[3]).not.toBeNaN();
        expect(newMatrix[4]).not.toBeNaN();
        expect(newMatrix[5]).not.toBeNaN();
    });

    //缩放变换
    it('scale', () => {
        var matrixTool = new Matrix();
        //创建一个单位矩阵E
        var E = matrixTool.create();
        var matrix1 = [1, 2, 3, 1, 2, 3];
        //缩放参数
        var v = [2, 3];
        var newMatrix = matrixTool.scale(E, matrix1, v);
        expect(newMatrix).not.toBeNull();
        expect(newMatrix[0]).toEqual(2);
        expect(newMatrix[1]).toEqual(6);
        expect(newMatrix[2]).toEqual(6);
        expect(newMatrix[3]).toEqual(3);
        expect(newMatrix[4]).toEqual(4);
        expect(newMatrix[5]).toEqual(9);
    });

    //求逆矩阵
    it('invert', () => {
        var matrixTool = new Matrix();
        //创建一个单位矩阵E
        var E = matrixTool.create();
        var matrix1 = [1, 2, 3, 1, 2, 3];
        var newMatrix = matrixTool.invert(E, matrix1);
        expect(newMatrix).not.toBeNull();
        expect(newMatrix[0]).not.toBeNaN();
        expect(newMatrix[1]).not.toBeNaN();
        expect(newMatrix[2]).not.toBeNaN();
        expect(newMatrix[3]).not.toBeNaN();
        expect(newMatrix[4]).not.toBeNaN();
        expect(newMatrix[5]).not.toBeNaN();
    });

    //矩阵左乘向量
    it('mulVector', () => {
        var matrixTool = new Matrix();
        //创建一个单位矩阵E
        var E = matrixTool.create();
        var matrix1 = [1, 2, 3, 1, 2, 3];
        var v = [2, 3];
        var newMatrix = matrixTool.mulVector(E, matrix1, v);
        expect(newMatrix).not.toBeNull();
        expect(newMatrix[0]).toEqual(13);
        expect(newMatrix[1]).toEqual(10);
        expect(newMatrix[2]).toEqual(0);
        expect(newMatrix[3]).toEqual(1);
        expect(newMatrix[4]).toEqual(0);
        expect(newMatrix[5]).toEqual(0);
    });
});