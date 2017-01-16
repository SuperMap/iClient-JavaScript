module("GetSymbolInfoParameters");

test("GetSymbolInfoParameters_destroy_toJson", function () {
    var inputPoints = [{"x": 0, "y": 0}, {"x": 1, "y": 1}];
    var scalePoints = [{"x": 0, "y": 0}, {"x": 1, "y": 1}];
    var scaleValues = [1];
    var subSymbols = [1];
    var newScalePoint = [{"x": 0, "y": 0}];
    var getSymbolInfoParameters = new SuperMap.REST.GetSymbolInfoParameters();
    getSymbolInfoParameters.libID = 421;
    getSymbolInfoParameters.code = 20100;
    getSymbolInfoParameters.inputPoints = inputPoints;
    getSymbolInfoParameters.scalePoints = scalePoints;
    getSymbolInfoParameters.scaleValues = scaleValues;
    getSymbolInfoParameters.subSymbols = subSymbols;
    getSymbolInfoParameters.newScalePoint = newScalePoint;
    getSymbolInfoParameters.newScalePointIndex = 0;
    getSymbolInfoParameters.symbolRank = null;
    getSymbolInfoParameters.negativeImage = null;
    getSymbolInfoParameters.surroundLineType = null;

    ok(getSymbolInfoParameters !== null, 'null');
    equal(getSymbolInfoParameters.libID, 421, 'getSymbolInfoParameters.libID');
    equal(getSymbolInfoParameters.code, 20100, 'getSymbolInfoParameters.code');
    equal(getSymbolInfoParameters.inputPoints, inputPoints, 'getSymbolInfoParameters.inputPoints');
    equal(getSymbolInfoParameters.scalePoints, scalePoints, 'getSymbolInfoParameters.scalePoints');
    equal(getSymbolInfoParameters.scaleValues, scaleValues, 'getSymbolInfoParameters.scaleValues');
    equal(getSymbolInfoParameters.newScalePoint, newScalePoint, 'getSymbolInfoParameters.newScalePoint');
    equal(getSymbolInfoParameters.newScalePointIndex, 0, 'getSymbolInfoParameters.newScalePointIndex');
    equal(getSymbolInfoParameters.symbolRank, null, 'getSymbolInfoParameters.symbolRank');
    equal(getSymbolInfoParameters.negativeImage, null, 'getSymbolInfoParameters.negativeImage');
    equal(getSymbolInfoParameters.surroundLineType, null, 'getSymbolInfoParameters.surroundLineType');

    getSymbolInfoParameters.destroy();
    ok(getSymbolInfoParameters.libID === null, 'getSymbolInfoParameters.libID is null');
    ok(getSymbolInfoParameters.code === null, 'getSymbolInfoParameters.code is null');
    ok(getSymbolInfoParameters.inputPoints === null, 'getSymbolInfoParameters.inputPoints is null');
    ok(getSymbolInfoParameters.scalePoints === null, 'getSymbolInfoParameters.scalePoints is null');
    ok(getSymbolInfoParameters.scaleValues === null, 'getSymbolInfoParameters.scaleValues is null');
    ok(getSymbolInfoParameters.newScalePoint === null, 'getSymbolInfoParameters.newScalePoint is null');
    ok(getSymbolInfoParameters.newScalePointIndex === null, 'getSymbolInfoParameters.newScalePointIndex is null');
    ok(getSymbolInfoParameters.symbolRank === null, 'getSymbolInfoParameters.symbolRank is null');
    ok(getSymbolInfoParameters.negativeImage === null, 'getSymbolInfoParameters.negativeImage is null');
    ok(getSymbolInfoParameters.surroundLineType === null, 'getSymbolInfoParameters.surroundLineType is null');

    var undefined = SuperMap.REST.GetSymbolInfoParameters.toUrlParameters();
    ok(typeof(undefined) === 'undefined', 'undefined');

    var params = {
        libID: 421,
        code: 20100,
        inputPoints: [{"x": 0, "y": 0}, {"x": 1, "y": 1}],
        scalePoints: [{"x": 0, "y": 0}, {"x": 1, "y": 1}],
        scaleValues: [1],
        subSymbols: [1],
        newScalePoint: [{"x": 0, "y": 0}],
        newScalePointIndex: 0,
        symbolRank: null,
        negativeImage: null,
        surroundLineType: null
    };
    var paramsAll = SuperMap.REST.GetSymbolInfoParameters.toUrlParameters(params);
    ok(paramsAll !== null, ' not null');
});




