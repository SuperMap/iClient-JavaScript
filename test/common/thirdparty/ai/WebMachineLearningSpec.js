import { BinaryClassification } from '../../../../src/common/thirdparty/ai/BinaryClassification';
import { WebMachineLearning } from '../../../../src/common/thirdparty/ai/WebMachineLearning';
import image from '../../../resources/img/baiduTileTest.png';
import * as tfconv from '@tensorflow/tfjs-converter';
import * as tfcore from '@tensorflow/tfjs-core';

describe('WebMachineLearning', () => {
    var testImage;
    beforeAll(() => {
        testImage = window.document.createElement('img');
        testImage.id = 'demo';
        testImage.src = image.src;
        window.document.body.appendChild(testImage);
    });
    afterAll(() => {
        window.document.body.removeChild(testImage);
    });
    it('predict', (done) => {
        var params = {
            modelUrl: 'ttp://fakeurl/model.json',
            image: window.document.querySelector('#demo')
        };
        var binaryClassification = new BinaryClassification(params);
        expect(binaryClassification).not.toBeNull();
        expect(binaryClassification.modelUrl).toBe(params.modelUrl);
        expect(binaryClassification.backend).toBe('webgl');
        spyOn(tfconv, 'loadGraphModel').and.callFake((modelUrl) => {
            expect(modelUrl).toBe(params.modelUrl);
            const model = {
                executeAsync: (x) => {
                    return {
                        shape: [1, 640, 640, 1],
                        dataSync() {
                            return [
                                0.30037346482276917,
                                0.49288830161094666,
                                0.7541022896766663,
                                0.9348679184913635,
                                0.9805652499198914
                            ];
                        }
                    };
                }
            };
            return model;
        });
        spyOn(tfcore, 'cast').and.callThrough();
        var webMachineLearning = new WebMachineLearning();
        webMachineLearning.execute(binaryClassification).then((res) => {
            expect(res.data.length).toBe(5);
            expect(res.width).toBe(640);
            expect(res.height).toBe(640);
            expect(tfcore.cast).toHaveBeenCalled();
            done();
        });
    });
});
