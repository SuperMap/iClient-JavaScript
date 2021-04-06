/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

importScripts('https://cdn.bootcdn.net/ajax/libs/Turf.js/5.1.6/turf.min.js')

/**
 * 空间分析所需工具类
 */
onmessage = function (event) {
    if (event.data) {
        let params = event.data;
        postMessage(analysis(params))
    }
}

//IDW 插值
function interpolate(points, cellSize, options) {
    options = options || {};
    if (typeof options !== 'object') {
        throw new Error('options is invalid');
    }
    var gridType = options.gridType;
    var property = options.property;
    var weight = options.weight;

    if (!points) {
        throw new Error('points is required');
    }
    turf.collectionOf(points, 'Point', 'input must contain Points');
    if (!cellSize) {
        throw new Error('cellSize is required');
    }
    if (weight !== undefined && typeof weight !== 'number') {
        throw new Error('weight must be a number');
    }
    property = property || 'elevation';
    gridType = gridType || 'square';
    weight = weight || 1;

    var box = options.bbox || turf.bbox(points);

    var grid;
    switch (gridType) {
        case 'point':
        case 'points':
            grid = squareGrid(box, cellSize, options, gridType);
            break;
        case 'square':
        case 'squares':
            grid = squareGrid(box, cellSize, options, gridType);
            break;
        case 'hex':
        case 'hexes':
            grid = turf.hexGrid(box, cellSize, options);
            break;
        case 'triangle':
        case 'triangles':
            grid = turf.triangleGrid(box, cellSize, options);
            break;
        default:
            throw new Error('invalid gridType');
    }
    var results = [];
    var gridFeatures = grid.features;
    var pointFeatures = points.features;
    for (var i = 0, len = gridFeatures.length; i < len; i++) {
        var zw = 0;
        var sw = 0;
        var gridFeature = gridFeatures[i];
        for (var j = 0, leng = pointFeatures.length; j < leng; j++) {
            var point = pointFeatures[j];
            var gridPoint = (gridType === 'point') ? gridFeature : turf.centroid(gridFeature);
            var d = turf.distance(gridPoint, point, options);
            var zValue;
            if (point.properties[property]) {
                zValue = point.properties[property];
            }
            if (zValue === undefined) {
                zValue = point.geometry.coordinates[2];
            }
            if (zValue === undefined) {
                throw new Error('zValue is missing');
            }
            if (d === 0) {
                zw = zValue;
            }
            var w = 1.0 / Math.pow(d, weight);
            sw += w;
            zw += w * zValue;
        }
        var newFeature = turf.clone(gridFeature);
        newFeature.properties[property] = zw / sw;
        results.push(newFeature);
    }
    return turf.featureCollection(results);
}

function squareGrid(bbox, cellSide, options, gridType) {
    options = options || {};
    if (!turf.isObject(options)) {
        throw new Error('options is invalid');
    }
    var properties = options.properties;
    var mask = options.mask;

    var results = [];

    if (cellSide === null || cellSide === undefined) {
        throw new Error('cellSide is required');
    }
    if (!turf.isNumber(cellSide)) {
        throw new Error('cellSide is invalid');
    }
    if (!bbox) {
        throw new Error('bbox is required');
    }
    if (!Array.isArray(bbox)) {
        throw new Error('bbox must be array');
    }
    if (bbox.length !== 4) {
        throw new Error('bbox must contain 4 numbers');
    }
    if (mask && ['Polygon', 'MultiPolygon'].indexOf(turf.getType(mask)) === -1) {
        throw new Error('options.mask must be a (Multi)Polygon');
    }

    var west = bbox[0];
    var south = bbox[1];
    var east = bbox[2];
    var north = bbox[3];

    var bboxWidth = (east - west);
    var bboxHeight = (north - south);

    var cellWidth = cellSide / 111.94;
    var cellHeight = cellSide / 111.94;

    var columns = Math.floor(bboxWidth / cellWidth);
    var rows = Math.floor(bboxHeight / cellHeight);

    var deltaX = (bboxWidth - columns * cellWidth) / 2;
    var deltaY = (bboxHeight - rows * cellHeight) / 2;

    var currentX = west + deltaX;
    if (gridType === "square" || gridType === "squares") {
        // for (var column = 0; column < columns; column++) {
        //     var currentY = south + deltaY;
        //     for (var row = 0; row < rows; row++) {
        //         var cellPoly = turf.polygon([[
        //             [currentX, currentY],
        //             [currentX, currentY + cellHeight],
        //             [currentX + cellWidth, currentY + cellHeight],
        //             [currentX + cellWidth, currentY],
        //             [currentX, currentY]
        //         ]], properties);
        //         if (mask) {
        //             if (intersect(mask, cellPoly)) results.push(cellPoly);
        //         } else {
        //             results.push(cellPoly);
        //         }

        //         currentY += cellHeight;
        //     }
        //     currentX += cellWidth;
        // }
        return null;
    } else {
        while (currentX <= east) {
            var currentY1 = south + deltaY;
            while (currentY1 <= north) {
                var cellPt = turf.point([currentX, currentY1], properties);
                if (mask) {
                    if (turf.booleanWithin(cellPt, mask)) {
                        results.push(cellPt);
                    }
                } else {
                    results.push(cellPt);
                }
                currentY1 += cellHeight;
            }
            currentX += cellWidth;
        }
    }

    return turf.featureCollection(results);
}

function processBuffer(buffer, saveAttrs) {
    var featureCollection = [];
    //var maxBounds = [-180, -90, 180, 90];
    //获取缓冲区异常feature， 并从原featureCollection中删除
    for (var i = 0, len = buffer.features.length; i < len; i++) {
        var feature = buffer.features[i];
        //不保留原有的属性值
        if (!saveAttrs) {
            //对字段属性进行for循环
            for (var pro in feature.properties) {
                var shouldDeleted = true;
                //序号和参考地点保留
                if (pro === 'ID') {
                    shouldDeleted = false;
                }
                //删除除了位置和序号字段的其他字段属性
                if (shouldDeleted) delete feature.properties[pro];
            }
        }

        var bbox = turf.bbox(buffer.features[i]);
        //bounds的x轴距离作为判断依据，看数据误差<=1，这里写大一点防止意外
        if (parseInt(bbox[2] - bbox[0]) > 5) {
            //if(util.isRectOverlap(maxBounds, turf.bbox(buffer.features[i]))) {

            //删除功能，第一个参数为第一项位置，第二个参数为要删除几个。 array.splice(index, num) ，返回值为删除内容，array为结果值。
            //删除位置为i的一个要素
            featureCollection.push(buffer.features.splice(i, 1)[0]);
            i--;
            len--;
        }
    }
    //将异常feature分割为两个正常feature，重新添加到featureCollextion中
    var newCod;
    for (var k = 0; k < featureCollection.length; k++) {
        newCod = [];
        //获取不正常features
        var abnormalFeature = featureCollection[k];
        //获取不正常features的坐标
        var coordinates = turf.getCoords(abnormalFeature)[0];
        //对坐标进行循环
        for (var j = 0, leng = coordinates.length; j < leng; j++) {
            if (coordinates[j][0] < 0) {
                newCod.push(coordinates.splice(j, 1)[0]);
                j--;
                leng--;
            }
        }
        //闭合polygon
        if (newCod.length > 3) {
            if (newCod[newCod.length - 1][0] !== newCod[0][0] || newCod[newCod.length - 1][1] !== newCod[0][1]) {
                newCod.push(newCod[0]);
            }
            //两个feature属性相同
            buffer.features.push(turf.polygon([newCod], abnormalFeature.properties));
        }
        //闭合polygon
        if (coordinates.length > 3) {
            if (coordinates[coordinates.length - 1][0] !== coordinates[0][0] || coordinates[coordinates.length - 1][1] !== coordinates[0][1]) {
                coordinates.push(coordinates[0]);
            }
            buffer.features.push(abnormalFeature);
        }
    }
}


//feature合并
function unionFeature(featureCollection, isFirst) {
    var results = [];
    var features = featureCollection.features;
    var featureLength = features.length;
    var oneceTotal = 2; //两两合并 直到最后剩一个多面对象为止（分网格 合并）
    var total = Math.round(featureLength / oneceTotal);
    //数组顺序打乱
    if (!isFirst) this.random(features);
    for (var i = 0; i <= total; i++) {
        var start = i * oneceTotal;
        var result = featureCollection.features[start];
        for (var j = 1; j < oneceTotal; j++) {
            var index = start + j;
            if (featureCollection.features[index]) {
                try {
                    result = this.union(result, featureCollection.features[index]);
                } catch (e) {
                    results.push(featureCollection.features[index]);
                }
            }
        }
        if (result) results.push(result);
    }

    if (results && results.length > 1) {
        //结果还是多个 继续合并
        return this.unionFeature(turf.featureCollection(results), false);
    } else {
        return results[0];
    }
}

//数组顺序打乱
function random(arr) {
    arr.sort(function () { return 0.5 - Math.random() });
}

function union(features, polys) {
    let result = turf.union(features, polys);
    return result;
}

//多面转单面
function toPolygons(multiPolygon) {
    var polygons = [];
    if (turf.getType(multiPolygon) === "Polygon") {
        polygons = [multiPolygon];
    } else {
        var coords = turf.getCoords(multiPolygon);
        polygons = coords.map(function (coord) {
            var poly = turf.polygon(coord);
            poly.bbox = turf.bbox(poly);
            poly.properties = multiPolygon.properties;
            return poly;
        });
    }
    return polygons;
}

function analysis(params) {
    let analysisMethod = params.analysisMethod;
    if (analysisMethod === "isolines") {

        let grid = interpolate(params.pointGrid, params.analysisCellSize, params.options);
        return turf.isolines(grid, params.breaks, { zProperty: params.zProperty });

    } else if (analysisMethod === "buffer") {

        let buffer = turf.buffer(params.geoJson, params.radius, { unit: params.unit });
        this.processBuffer(buffer, params.isSave);
        if (params.isUnion) {
            if (buffer.features.length > 0) {
                var unied = this.unionFeature(buffer, true);
                var result = this.toPolygons(unied);
                return turf.featureCollection(result);
            }
            return null;
        }
        return buffer;
    }
}