import * as tf from '@tensorflow/tfjs';
import MachineLearningBase from './MachineLearningBase';

/**
 * @class ObjectDetection
 * @deprecatedclass SuperMap.ObjectDetection
 * @classdesc 目标检测类。
 * @category ObjectDetection
 * @extends {MachineLearningBase}
 * @usage
 */

export class ObjectDetection extends MachineLearningBase {
    constructor(options) {
        super(options);
    }
    /**
     * @function ObjectDetection.prototype.predict
     * @description 对模型进行预测
     * @returns {Object} 预测后的数据
     */

    async predict() {
        if (!this.modelUrl || !this.image) {
            return;
        }
        if (!this.model) {
            this.model = await this._loadModel(this.modelUrl);
        }
        this.imageTensor = this.handleInputParams(this.image, 600, 600);
        const params = tf.tensor([600, 600, 1], [3], 'float32');
        const prediction = await this.model.executeAsync([params, this.imageTensor]);
        return this.handleResult(prediction);
    }

    /**
     * @function ObjectDetection.prototype.handleResult
     * @description 对预测数据进行处理
     * @param {Object} result - 预测后的数据。
     * @returns {Object} 处理返回的数据
     */

    async handleResult(result) {
        const score = result[3].arraySync();
        const bbox = result[2].arraySync();
        const delta = result[1].arraySync();

        const deltaFormat = delta.map((deltaItem) => {
            return deltaItem.map((deltaItem2, index) => {
                if (index % 4 === 0 || index % 4 === 1) {
                    return deltaItem2 * 0.1;
                }
                return deltaItem2 * 0.2;
            });
        });

        const scoreData = {};
        score.forEach((colData, index) => {
            if (colData[1] >= 0.5) {
                scoreData[index] = +colData[1].toFixed(5);
            }
        });
        const filterBbox = bbox
            .filter((item, index) => {
                return scoreData[index];
            })
            .map((item1) => {
                return item1.map((item2) => {
                    return +item2.toFixed(5);
                });
            });

        const filterDelta = deltaFormat
            .filter((item, index) => {
                return scoreData[index];
            })
            .map((item1) => {
                return item1.map((item2) => {
                    return +item2.toFixed(5);
                });
            });
        const widths = [];
        const heights = [];
        const ctr_x = [];
        const ctr_y = [];
        filterBbox.forEach((colBbox) => {
            let width = colBbox[3] - colBbox[1] + 1.0;
            let height = colBbox[4] - colBbox[2] + 1.0;
            widths.push(width);
            heights.push(height);
            ctr_x.push(colBbox[1] + 0.5 * width);
            ctr_y.push(colBbox[2] + 0.5 * height);
        });
        const dx = this.getIntervalFromArray(filterDelta, 4, 0);
        const dy = this.getIntervalFromArray(filterDelta, 4, 1);
        const dw = this.getIntervalFromArray(filterDelta, 4, 2);
        const dh = this.getIntervalFromArray(filterDelta, 4, 3);

        const planeDx = dx.map((x) => {
            return x[1];
        });

        const planeDy = dy.map((y) => {
            return y[1];
        });

        const planeDW = dw.map((x) => {
            return x[1];
        });

        const planeDh = dh.map((x) => {
            return x[1];
        });

        const pred_ctr_x = [];
        const pred_ctr_y = [];
        const pred_w = [];
        const pred_h = [];

        for (let i = 0; i < widths.length; i++) {
            pred_ctr_x.push(planeDx[i] * widths[i] + ctr_x[i]);
            pred_ctr_y.push(planeDy[i] * heights[i] + ctr_y[i]);
            pred_w.push(Math.exp(planeDW[i]) * widths[i]);
            pred_h.push(Math.exp(planeDh[i]) * heights[i]);
        }

        const bbox_x1 = pred_ctr_x.map((x, index) => {
            return x - 0.5 * pred_w[index];
        });

        const bbox_x2 = pred_ctr_x.map((x, index) => {
            return x + 0.5 * pred_w[index];
        });

        const bbox_y1 = pred_ctr_y.map((y, index) => {
            return y - 0.5 * pred_h[index];
        });

        const bbox_y2 = pred_ctr_y.map((y, index) => {
            return y + 0.5 * pred_h[index];
        });

        const scores = Object.values(scoreData);

        const bbox_list = bbox_x1.map((x1, index) => {
            return [bbox_y1[index], bbox_x1[index], bbox_y2[index], bbox_x2[index]];
        });

        const bboxIndex = await this.nms(bbox_list, scores);
        const bboxList = [];
        pred_ctr_x.forEach((x1, index) => {
            if (bboxIndex.includes(index)) {
                bboxList.push({
                    x: x1 - pred_w[index] / 2,
                    y: pred_ctr_y[index] - pred_h[index] / 2,
                    w: pred_w[index],
                    h: pred_h[index]
                });
            }
        });
        return bboxList;
    }

    /**
     * @function ObjectDetection.prototype.nms
     * @param {Array} bbox - 包围框数据。
     * @param {Array} scores - 模型得分数据。
     * @returns {Array} 返回去重后的包围框数据
     */

    async nms(bbox, scores) {
        const res = await tf.image.nonMaxSuppressionWithScoreAsync(bbox, scores, 100, 0.3);
        return res.selectedIndices.arraySync();
    }

    /**
     * @function ObjectDetection.prototype.getIntervalFromArray
     * @param {Array} array - 数组。
     * @param {number} interval - 取值的间隔。
     * @param {number} start - 取值的起始位置。
     * @returns {Array} 返回被间隔取值后的数组
     */

    getIntervalFromArray(array, interval, start) {
        return array.map((arr) => {
            return arr.filter((item, index) => {
                return index >= start && index % interval === start;
            });
        });
    }

    /**
     * @function ObjectDetection.prototype.handleInputParams
     * @description 处理输入张量
     * @param {PixelData|ImageData|HTMLImageElement|HTMLCanvasElement| HTMLVideoElement|ImageBitmap} image - 图片对象。
     * @param {number} width - 图片宽度。
     * @param {number} height - 图片高度。
     * @param {string} dtype - 数据类型。
     * @returns {Object} - 输入处理后的张量
     */

    handleInputParams(image, width, height, dtype = 'float32') {
        return tf.tidy(() => {
            this.imageTensor = tf.cast(
                tf.image.resizeBilinear(tf.expandDims(tf.browser.fromPixels(image)), [width, height]),
                dtype
            );
            const shape = this.imageTensor.bufferSync().shape;
            const dataTemp = [];
            this.imageTensor.bufferSync().values.forEach((value, index) => {
                if (index % 3 === 0) {
                    dataTemp.push(+(value - 122.7717).toFixed(6));
                }
                if (index % 3 === 1) {
                    dataTemp.push(+(value - 115.9465).toFixed(6));
                }
                if (index % 3 === 2) {
                    dataTemp.push(+(value - 102.9801).toFixed(6));
                }
            });

            dataTemp.forEach((item, index) => {
                if (index % 3 === 0) {
                    [dataTemp[index], dataTemp[index + 2]] = [dataTemp[index + 2], dataTemp[index]];
                }
            });
            const testImageTensorR = tf.tensor(dataTemp, shape, dtype);
            return testImageTensorR;
        });
    }
}

