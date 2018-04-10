var fs = require('fs');
var http = require('http');
var querystring = require('querystring');

/**
 * filePath - {string} 数据文件路径或数据请求地址；当前数据请求地址，仅支持SuperMap iServer 数据服务地址；如：
 *            127.0.0.1:8090/iserver/services/data-osm/rest/data/
 * exportFileCount - {number} 数据导出文件数 //todo 给一个最优得默认值
 * options - {Object} 可选参数，包括以下：<br>
 *           featuresCount - {number} 需要处理的features 个数, 不得超过给定数据文件或请求地址中所保存features 的最大值，默认为全部处理。<br>
 *           isCompress - {boolean} 是否对数据输出数据压缩为流得形式。默认为false, 即不进行压缩<br>
 *           datasetNames - {string} 请求数据时，请求数据集对象名，如： 'osm:roads'。当 filePath 为数据地址时，必填。<br>
 *           isAverageStorage - {boolean} 是否需要将数据平均存储到每个文件。默认false。
 *
 */
class BigDataClipToolForEcharts {

    constructor() {
        this.datasetArray = [];
        //初始话创建文件夹
    }

    /**
     * @function PrepareBigDataForEcharts.prototype.readData
     * @description 文件读取形式获取并处理数据
     */
    readData(filePath, exportFileCount, options) {
        const me = this;
        me.isReadDatas = true;
        me.filePath = filePath;
        me.exportFileCount = exportFileCount;
        me.featuresCount = (options && options.featuresCount) ? options.featuresCount : null;
        me.isCompress = (options && options.isCompress) ? options.isCompress : false;
        //根据 exportFileCount 创建文件和存储数组
        me.createStorageFile();
        fs.readFile(me.filePath, 'utf8', (err, data) => {
            if (err) {
                return console.error(err);
            }
            if (JSON.parse(data)) {
                me.prepareData(JSON.parse(data))
            }
        });
    }

    /**
     * @function PrepareBigDataForEcharts.prototype.processAsync
     * @description 请求服务的形式获取并处理数据
     */
    processAsync(filePath, exportFileCount, options) {
        const me = this;
        me.exportFileCount = exportFileCount;

        me.featuresCount = (options && options.featuresCount) ? options.featuresCount : null;
        me.isCompress = (options && options.isCompress) ? options.isCompress : false;
        me.datasetNames = (options && options.datasetNames) ? options.datasetNames : null;
        me.isAverageStorage = (options && options.isAverageStorage) ? options.isAverageStorage : false;

        //根据 exportFileCount 创建文件和存储数组
        me.createStorageFile();

        //请求地址拆分处理
        const parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
        const urlSplit = parse_url.exec(filePath);

        me.urlHost = urlSplit[3];
        me.urlPort = Number(urlSplit[4]);
        me.urlPath = urlSplit[5];

        //请求参数处理，若 featuresCount 有值则直接按 featuresCount 进行发请求准备，若没有值，则请求当前服务存储 features 数，按存储数处理:
        if (!me.datasetNames) {
            throw Error("datasetNames undefined");
            return;
        }
        me.datasetNamesArray = me.datasetNames.split(':');
        if (!me.featuresCount) {
            me._requestFeaturesCounts();
        } else {
            me._prepareRequest();
        }

    }

    _prepareRequest() {
        const me = this;
        let post_data;
        if (me.featuresCount < 1000) {
            me.requestCount = 1;
            post_data = JSON.stringify({
                'datasetNames': [me.datasetNames],
                'getFeatureMode': "SQL",
                'queryParameter': {'name': me.datasetNamesArray[1], 'attributeFilter': `SmID<=${me.featuresCount}`}
                // 'queryParameter': {'name': me.datasetNamesArray[1], 'attributeFilter': `SMID = 28888`}
            });
            me.requestDataset(post_data);
        } else {
            //因为iServer 每次只允许请求1000个features,
            const integer = parseInt(me.featuresCount / 1000);
            const remainder = me.featuresCount % 1000;

            if (remainder === 0) {
                me.requestCount = integer;
            } else {
                me.requestCount = integer + 1;
            }
            let startID = 0, endID = 1000;
            for (let i = 1; i <= integer + 1;) {
                post_data = JSON.stringify({
                    'datasetNames': [me.datasetNames],
                    'getFeatureMode': "SQL",
                    'queryParameter': {
                        'name': me.datasetNamesArray[1],
                        'attributeFilter': `SmID >${startID} And SmID<=${endID}`
                    }
                });
                me.requestDataset(post_data);
                i++;
                startID = endID;
                if (i === integer + 1) {
                    if (remainder === 0) {
                        break;
                    }
                    endID += remainder;
                } else {
                    endID = 1000 * i;
                }
            }
        }
    }

    requestDataset(post_data) {
        const me = this;
        const options = {
            host: this.urlHost,    //此处不能写协议，如 ： http://,https://  否则会报错
            port: this.urlPort,
            path: '/' + this.urlPath + '/featureResults.json?returnContent=true',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': post_data.length
            }
        };
        const req = http.request(options, (res) => {
            res.setEncoding('utf8');
            let results = "";
            res.on('data', (chunk) => {
                results += chunk;
            });

            res.on('end', () => {
                req.end('success');
                me.requestCount--;
                me.prepareData(JSON.parse(results));
            });

        });

        // write data to request body
        req.write(post_data);

    }

    _requestFeaturesCounts() {
        const me = this;

        const options = {
            host: this.urlHost,    //此处不能写协议，如 ： http://,https://  否则会报错
            port: this.urlPort,
            path: '/' + this.urlPath + '/datasources/' + me.datasetNamesArray[0] + '/datasets/' + me.datasetNamesArray[1] + '/features.json',
            method: 'GET',
        };
        const req = http.request(options, (res) => {
            res.setEncoding('utf8');
            let results = "";
            res.on('data', (chunk) => {
                results += chunk;
            });
            res.on('end', () => {
                req.end('success');
                me.featuresCount = JSON.parse(results).featureCount;
                me._prepareRequest();
            });
        });
        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });
    }

    createStorageFile() {
        //读取当前是否已经创建了文件目录：
        const me = this;
        fs.readdir('./resuletData', (err, files) => {
            if (err) {
                fs.mkdir("./resuletData/", (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log("目录创建成功。");
                    createFilePathCallback();
                });
                return
            }
            console.log("目录已创建。");
            //若已经存在数据文件，则先进行清除操作
            files.forEach(function (file) {
                fs.unlinkSync('./resuletData/' + file, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                });
            });
            createFilePathCallback();
        });

        //创建存储文件夹，以及数组：
        function createFilePathCallback() {
            if (me.exportFileCount) {
                let fileType;
                if (me.isCompress) {
                    fileType = 'bin'
                } else {
                    fileType = 'json'
                }
                for (let num = 0; num < me.exportFileCount; num++) {
                    fs.createWriteStream(`./resuletData/bigDta_${num}.${fileType}`);
                    //创建将要存入每个文件夹下的数组：
                    me.datasetArray.push([]);
                }
            }
        }

    }

    prepareData(prepareData) {
        //处理数据，当前处理得线要素中点，todo 后续考虑点数据如何存储
        const me = this;
        let features;
        if (prepareData['features']) {
            features = prepareData['features'];
            let featuresCounts;

            if (me.isReadDatas && me.featuresCount) {
                //如果当前是读取文件形式，并且设置了featuresCount，则按featuresCount处理数据
                featuresCounts = me.featuresCount;
            } else {
                featuresCounts = features.length;
            }

            //遍历每个features并存顺序均匀存储到数组
            for (let i = 0; i < featuresCounts; i++) {
                //todo 处理 iServer 请求 parts
                let points = features[i].geometry.points;
                let parts = features[i].geometry.parts;
                let startParts = 0, partsPoints;
                for (let p = 0; p < parts.length; p++) {
                    //按 parts切割子对象：
                    partsPoints = points.slice(startParts, parts[p]);
                    //每个 parts 子对象分别切割存储：
                    _slicePoints(partsPoints);
                    startParts = parts[p];
                }
            }
        }

        function _slicePoints(points) {
            //一条线存储的文件下至少两个点，即一条线段
            let off = 0;
            let integer = parseInt((points.length - 1) / me.exportFileCount);
            let remainder = (points.length - 1) % me.exportFileCount;

            //余下的点随机存入某个文件下，为了保证每个均匀存入数据
            let isSaveRemainderArr = new Array(me.exportFileCount);
            //trueArr 为了避免
            let trueArr = {};
            for (let i = 0; i < remainder;) {
                let index = Math.floor(Math.random() * isSaveRemainderArr.length);
                //若该元素已经被设置为 true,则重新遍历
                if (trueArr[index])
                    continue;

                isSaveRemainderArr[index] = true;
                trueArr[index] = true;
                i++
            }
            if (integer === 0) {
                //则每个文件存两个点，直到存完点
                //便利存入points.length - 1个文件下，每个文件存一个线段
                let keys = Object.keys(trueArr);

                for (let y = 0; y < keys.length; y++, off++) {
                    //每个存入两个点，即存入一条线段
                    let index;
                    //是否需要平均存储
                    if (me.isAverageStorage) {
                        index = Number(keys[y]);
                    } else {
                        index = y;
                    }
                    me.datasetArray[index].push(2);
                    for (let k = 0; k < 2; k++) {

                        //每个文件结着上一个文件存的最后一个点存储
                        let pointTemp = points[off + k];
                        me.datasetArray[index].push(pointTemp.x);
                        me.datasetArray[index].push(pointTemp.y);
                    }
                }
            } else {
                //当每个文件都至少能存储一条线段时，先算出每个文件存几个线段：
                for (let y = 0; y < me.exportFileCount; y++) {
                    let count;
                    //存储点数目：
                    //是否需要平均存储：
                    if (me.isAverageStorage && isSaveRemainderArr[y] === true) {
                        count = integer + 1 + 1;
                        me.datasetArray[y].push(count);
                    } else if (!me.isAverageStorage && remainder > 0) {
                        count = integer + 1 + 1;
                        me.datasetArray[y].push(count);
                        remainder--;
                    } else {
                        count = integer + 1;
                        me.datasetArray[y].push(count);
                    }
                    //存储点坐标：
                    for (let k = 0; k < count; k++) {
                        let pointTemp;
                        //保证每个文件里面存储得该线得第一点一定连接上个文件存储得同一条线段：
                        if (k === 0) {
                            pointTemp = points[off];
                        } else {
                            pointTemp = points[++off];
                        }
                        me.datasetArray[y].push(pointTemp.x);
                        me.datasetArray[y].push(pointTemp.y);
                    }

                }
            }
        }

        //所有请求处理完毕后进行写入文件操作
        if (me.requestCount === 0) {
            me.writeDataToFile();
        }
    }

    writeDataToFile() {
        //若 isCompress 为true,则将数据处理为流得形式存储
        if (this.isCompress) {
            for (let i = 0; i < this.exportFileCount; i++) {
                let data = new Float32Array(this.datasetArray[i]);
                var buffer = new Buffer(data.length * 4);
                for (let y = 0; y < this.datasetArray[i].length; y++) {
                    buffer.writeFloatLE(data[y], y * 4);
                }

                fs.writeFile(`./resuletData/bigDta_${i}.bin`, buffer, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(`./resuletData/bigDta_${i}.bin` + "写入数据成功！")
                })
            }
            return
        }

        //将处理好得数据分别存入文件
        for (let i = 0; i < this.exportFileCount; i++) {

            fs.writeFile(`./resuletData/bigDta_${i}.json`, JSON.stringify(this.datasetArray[i]), (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(`./resuletData/bigDta_${i}.json` + "写入数据成功！")
            })
        }
    }

}

const bigDataClipToolForEcharts = new BigDataClipToolForEcharts();
// bigDataClipToolForEcharts.processAsync('http://localhost:8090/iserver/services/data-beijingroads/rest/data', 20, {
bigDataClipToolForEcharts.processAsync('http://localhost:8090/iserver/services/data-osm/rest/data', 42, {
    // datasetNames: 'beijingroads:beijingroads',
    datasetNames: 'osm:roads',
    // datasetNames: 'osm:waterways',
    featuresCount: 564057,
    // featuresCount: 133650,
    // featuresCount: 63396,
    // featuresCount: 106791,
    isAverageStorage: true,
    isCompress: true
});
