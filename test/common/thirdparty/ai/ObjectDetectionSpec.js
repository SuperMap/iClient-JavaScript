import { ObjectDetection } from '../../../../src/common/thirdparty/ai/ObjectDetection';
import image from '../../../resources/img/baiduTileTest.png';
import * as tfconv from '@tensorflow/tfjs-converter';
import * as tfcore from '@tensorflow/tfjs-core';

describe('object detection', () => {
    var testImage;
    beforeAll(() => {
        testImage = window.document.createElement('img');
        testImage.id = 'demo';
        testImage.src = image.src;
        window.document.body.appendChild(testImage);
    });
    it('predict', (done) => {
        var params = {
            modelUrl: 'http://127.0.0.1/model.json',
            image: window.document.querySelector('#demo')
        };
        var objectDetection = new ObjectDetection(params);
        expect(objectDetection).not.toBeNull();
        expect(objectDetection.backend).toBe('webgl');
        spyOn(tfconv, 'loadGraphModel').and.callFake(() => {
            const model = {
                executeAsync: () => {
                    return [
                        tf.tensor([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], [4, 4, 1, 1], 'float32'),
                        tf.tensor([[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]], [4, 4, 1, 1], 'float32'),
                        tf.tensor([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], [4, 4, 1, 1], 'float32'),
                        tf.tensor([[1,2],[3,4],[5,6],[7,8],[9,10],[11,12],[13,14],[15,16]], [8, 2], 'float32')
                    ];
                },
                dispose: () => true
            };
            return model;
        });
        var imageTensor = spyOn(tf.browser, 'fromPixels').and.callFake(function (image) {
            expect(image).toBe(params.image);
            return tf.tensor([20, 25, 100, 50, 90, 200], [600, 600, 1, 4], 'float32')
        });
        var expandImageTensor = spyOn(tf, 'expandDims').and.callFake(function (tensor) {
          expect(tensor).toBe(imageTensor);
          return tensor;
        });
        spyOn(tf.image, 'resizeBilinear').and.callFake(function (expandImageTensor, [width, height]) {
          expect(tensor).toBe(imageTensor);
          expect(width).toBe(600);
          expect(height).toBe(600);
          return tensor;
        });
        spyOn(tf, 'cast').and.callThrough();
        spyOn(objectDetection, 'handleResult').and.stub();
        spyOn(tf.image, 'nonMaxSuppressionWithScoreAsync').and.callThrough();
        objectDetection.predict();
        objectDetection.dispose();
        //  expect(whatAmI).toHaveBeenCalled();
        expect(objectDetection.imageTensor).toBeNull();
    });
});
