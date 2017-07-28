var fs = require('fs'),
    PNG = require('pngjs').PNG;
var getPixels = require("get-pixels");
var assert = require('assert');

var commonTools = ({

        /*
         * function: open specific example and assert elements 'body','#map' present
         * params: broswer ;
         * type(String) - serviceType, eg:'leaflet'、'openlayers' etc.
         * exampleName(String) - eg:'01_tiledMapLayer3857' etc.
         * */
        openExampleAndLoadMap: function (browser, type, exampleName) {
            if (typeof type !== 'string' || typeof exampleName !== 'string') {
                console.log('invalid input : type or exampleName is not a string');
                return;
            }
            var exampleUrl = 'http://localhost:9999/iClient9/examples/' + type + '/' + exampleName + '.html';
            browser.url(exampleUrl);
            browser.expect.element('body').to.be.present.before(2000);
            browser.expect.element('#map').to.be.present.before(3000);
            browser.pause(1000);
        },

        /*
         * if standard tile not exist , use this function to get  standard tile.
         * function: getStdTile
         * params: broswer ;
         * type(String) - serviceType, eg:'leaflet'、'openlayers'、'3dwebgl'、'mapboxgl' etc.
         * exampleName(String) - eg:'01_tiledMapLayer3857' etc.
         * standardTilePrams(offsetX, offsetY, width, height).
         * */
        getStdTile: function (browser, type, exampleName, offsetX, offsetY, width, height) {
            var screenShotPath = './examples-test/temp/' + exampleName + '.png';
            var tileTestPath = './examples-test/' + type + '/resources/' + exampleName + '.png';
            browser.pause(5000);
            browser.saveScreenshot(screenShotPath, function () {
                console.log('Screenshot has been saved , now start to get StdTile from Screenshot');
                commonTools.getTileFromScreenshot(screenShotPath, offsetX, offsetY, width, height, tileTestPath);
                console.log('get StdTile completed');
            });
            browser.pause(2000, function () {
                commonTools.deleteFolders('./examples-test/temp');
            })
        },

        /*
         * use this function when standard tile already exist.
         * function: get screenshot from browser window ,
         * then get testTile from the screenshot and compare with standard tile.
         * params: broswer ;
         * type(String) - serviceType, eg:'leaflet'、'openlayers'、'3dwebgl'、'mapboxgl' etc.
         * exampleName(String) - eg:'01_tiledMapLayer3857' etc.
         * testTilePrams(offsetX, offsetY, width, height) - should be equal with Corresponding standard tile params.
         * return : boolean
         * */
        cmpTestTileWithStdTile: function (browser, type, exampleName, offsetX, offsetY, width, height) {
            var screenShotPath, tileTestPath, tileStandardPath;
            if (typeof type !== 'string' || typeof exampleName !== 'string') {
                console.log('invalid input : type or exampleName is not a string');
                return;
            }
            screenShotPath = './examples-test/output/' + type + '_' + exampleName + '.png';
            tileTestPath = './examples-test/output/' + type + '_' + exampleName + 'TileTest.png';
            tileStandardPath = './examples-test/' + type + '/resources/' + exampleName + '.png';
            browser.pause(5000);
            browser.saveScreenshot(screenShotPath, function () {
                console.log('start to get the tile');
                commonTools.getTileFromScreenshot(screenShotPath, offsetX, offsetY, width, height, tileTestPath);
                console.log('get the tile completed');
            });
            browser.pause(5000, function () {
                console.log('start to compare two tiles');
                commonTools.isTwoTilesEqual(tileStandardPath, tileTestPath);
            });
        },


        /*
         * function: get a tile with certain range from the screenshot
         * */
        getTileFromScreenshot: function (sourceImagePath, offsetX, offsetY, width, height, tilePath) {
            var dst = new PNG({width: width, height: height});
            fs.createReadStream(sourceImagePath)
                .pipe(new PNG())
                .on('parsed', function () {
                    this.bitblt(dst, offsetX, offsetY, width, height, 0, 0);
                    dst.pack().pipe(fs.createWriteStream(tilePath));
                });
        },

        /*
         * function: compare two image by tilePath,
         * return : boolean
         * */
        isTwoTilesEqual: function (tilePath1, tilePath2) {
            var array1 = [];
            var array2 = [];
            console.log('start to compare two tiles');
            getPixels(tilePath1, function (err, pixels) {
                if (err) {
                    assert.ok(false, "path in tile1 not exist: " + tilePath1);
                    return;
                }
                for (var i = 0; i < pixels.data.length; i++) {
                    array1.push(pixels.data[i]);
                }
                console.log('tile1 ( ' + tilePath1 + ' ) has pixels : ' + (array1.length / 4));
                getPixels(tilePath2, function (err, pixels) {
                    if (err) {
                        assert.ok(false, "path in tile2 not exist: " + tilePath2);
                        return;
                    }
                    for (var i = 0; i < pixels.data.length; i++) {
                        array2.push(pixels.data[i]);
                    }
                    console.log('tile2 ( ' + tilePath2 + ' ) has pixels : ' + (array2.length / 4));
                    var isEqual = commonTools.judgeTwoTilesByRgbaArrays(array1, array2);
                    assert.ok(isEqual, 'similarity of two tiles are too low')
                });
            });
        },

        /*
         * function: compare two image by one-dimensional RgbaArrays,
         * elements in one-dimensional RgbaArrays are [r1,g1,b1,a1,r2,g2,b2,a2,...,rn,gn,bn,an].
         * return : boolean
         * */
        judgeTwoTilesByRgbaArrays: function (RgbaArraysOfTile1, RgbaArraysOfTile2) {
            var isLengthEqual = (RgbaArraysOfTile1.length == RgbaArraysOfTile2.length);
            if (!isLengthEqual) {
                console.log('length are not equal');
                return false;
            }
            console.log('length are equal');
            var totalCount = ((RgbaArraysOfTile1.length) / 4);
            var unEqualCount = commonTools.difPixelsCount(RgbaArraysOfTile1, RgbaArraysOfTile2);
            console.log('different pixels count : ' + unEqualCount);
            var similarity = ((totalCount - unEqualCount) / totalCount).toFixed(5);
            if (similarity < 0.94) {
                console.log('similarity : ' + similarity + ' < 0.94');
                return false;
            }
            console.log('similarity : ' + similarity + ' >= 0.94');
            return true;
        },

        /*
         * function: calculate count of different Pixels between two tiles ,
         * return : number
         * */
        difPixelsCount: function (RgbaArraysOfTile1, RgbaArraysOfTile2) {
            var unEqualCount = 0;
            for (var i = 0; i < RgbaArraysOfTile1.length; i = i + 4) {
                var isValueEqual = ((RgbaArraysOfTile1[i] == RgbaArraysOfTile2[i]) && (RgbaArraysOfTile1[i + 1] == RgbaArraysOfTile2[i + 1]) && (RgbaArraysOfTile1[i + 2] == RgbaArraysOfTile2[i + 2]));
                if (!isValueEqual) {
                    unEqualCount = unEqualCount + 1;
                }
            }
            return unEqualCount;
        },


        /*
         * function: delete folders
         * */
        deleteFolders: function (folderPath) {
            var files = [];
            if (fs.existsSync(folderPath)) {
                files = fs.readdirSync(folderPath);
                files.forEach(function (file) {
                    var curPath = folderPath + "/" + file;
                    if (fs.statSync(curPath).isDirectory()) {
                        deleteFolders(curPath);
                    } else {
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(folderPath);
            }
        }
    })
    ;
module.exports = commonTools;