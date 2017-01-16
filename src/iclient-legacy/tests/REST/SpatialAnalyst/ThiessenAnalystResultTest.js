module("ThiessenAnalystResult");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(5);

    var tsAnalystResult;
    tsAnalystResult = new SuperMap.REST.ThiessenAnalystResult();

    ok(tsAnalystResult != null, "not null");
    equal(tsAnalystResult.datasetName, null, "tsAnalystResult.datasetName");
    equal(tsAnalystResult.datasourceName, null, "tsAnalystResult.datasourceName");
	equal(tsAnalystResult.regions, null, "tsAnalystResult.regions");
    
    tsAnalystResult.destroy();
    equal(tsAnalystResult.regions, null, "tsAnalystResult.regions");
});

test("TestDefaultConstructor_custom", function () {
    expect(7);
    var tsAnalystResult,
        regions = [new SuperMap.Geometry.Polygon()];
    tsAnalystResult = new SuperMap.REST.ThiessenAnalystResult({
        regions: regions,
		datasetName: "Coutries@World",
		datasourceName: 'World'
    });

    ok(tsAnalystResult != null, "not null");
    equal(tsAnalystResult.regions.length, 1, "tsAnalystResult.recordset");
    equal(tsAnalystResult.datasetName, "Coutries@World", "tsAnalystResult.datasetName");
	equal(tsAnalystResult.datasourceName, 'World', "tsAnalystResult.datasourceName");
	
	tsAnalystResult.destroy();
	equal(tsAnalystResult.regions, null, "tsAnalystResult.regions");
	equal(tsAnalystResult.datasetName, null, "tsAnalystResult.datasetName");
	equal(tsAnalystResult.datasourceName, null, "tsAnalystResult.datasourceName");
});

test("TestDefaultConstructor_fromJson", function () {
	expect(5);
    var tsAnalystResult;
    tsAnalystResult = SuperMap.REST.ThiessenAnalystResult.fromJson(); 
    equal(tsAnalystResult, undefined, "fromJson");
	
	var jsonObj = {
		  "datasetName": 'newdataset',
		  "datasourceName": 'world',
		  "regions": [
		    {
		      "center": {
		        "x": 13.009288861053733,
		        "y": 75.06070342814624
		      },
		      "id": 1,
		      "parts": [2],
		      "points": [
		        {
		          "x": 14.503183555956955,
		          "y": 50.121406856292495
		        },
		        {
		          "x": 0,
		          "y": 51.26497232273451
		        },
		        {
		          "x": 0,
		          "y": 100
		        },
		        {
		          "x": 37.533971888257994,
		          "y": 100
		        },
		        {
		          "x": 14.503183555956955,
		          "y": 50.121406856292495
		        }
		      ],
		      "style": null,
		      "type": "REGION"
		    },
		    {
		      "center": {
		        "x": 8.828889753975085,
		        "y": 43.00578581747521
		      },
		      "id": 2,
		      "parts": [5],
		      "points": [
		        {
		          "x": 14.503183555956955,
		          "y": 50.121406856292495
		        },
		        {
		          "x": 17.855382285737367,
		          "y": 42.560065825327555
		        },
		        {
		          "x": 0,
		          "y": 34.746599312215906
		        },
		        {
		          "x": 0,
		          "y": 51.26497232273451
		        },
		        {
		          "x": 14.503183555956955,
		          "y": 50.121406856292495
		        }
		      ],
		      "style": null,
		      "type": "REGION"
		    }
		  ]
		};
	tsAnalystResult = SuperMap.REST.ThiessenAnalystResult.fromJson(jsonObj);
	
	ok(tsAnalystResult != null, "tsAnalystResult != null");
	equal(tsAnalystResult.regions.length, 2, "tsAnalystResult.recordset");
    equal(tsAnalystResult.datasetName, "newdataset", "tsAnalystResult.datasetName");
	equal(tsAnalystResult.datasourceName, 'world', "tsAnalystResult.datasourceName");
});