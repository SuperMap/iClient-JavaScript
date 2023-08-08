var getGridCellInfosValueEcapedJson = "{\"color\":{\"red\":187,\"green\":155,\"blue\":114,\"alpha\":255},\"column\":1046,\"bounds\":null,\"row\":398,\"value\":12295026,\"centerPoint\":{\"x\":4,\"y\":20}}";
var getDatasetInfoEcapedJson = "{\"childUriList\":[\"http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/WorldEarth/fields\",\"http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/WorldEarth/features\",\"http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/WorldEarth/domain\"],\"supportAttachments\":false,\"supportFeatureMetadatas\":false,\"datasetInfo\":{\"isMultiBand\":false,\"bandCount\":0,\"pixelFormat\":\"RGB\",\"palettes\":null,\"description\":\"\",\"type\":\"IMAGE\",\"blockSize\":64,\"dataSourceName\":\"World\",\"tableName\":\"WorldEarth\",\"colorSpace\":null,\"isReadOnly\":false,\"encodeType\":\"DCT\",\"width\":2048,\"bounds\":{\"top\":90,\"left\":-180,\"bottom\":-90,\"leftBottom\":{\"x\":-180,\"y\":-90},\"right\":180,\"rightTop\":{\"x\":180,\"y\":90}},\"name\":\"WorldEarth\",\"palette\":[],\"prjCoordSys\":{\"distanceUnit\":\"METER\",\"projectionParam\":null,\"epsgCode\":4326,\"coordUnit\":\"DEGREE\",\"name\":\"Longitude / Latitude Coordinate System---GCS_WGS_1984\",\"projection\":null,\"type\":\"PCS_EARTH_LONGITUDE_LATITUDE\",\"coordSystem\":{\"datum\":{\"name\":\"D_WGS_1984\",\"type\":\"DATUM_WGS_1984\",\"spheroid\":{\"flatten\":0.00335281066474748,\"name\":\"WGS_1984\",\"axis\":6378137,\"type\":\"SPHEROID_WGS_1984\"}},\"unit\":\"DEGREE\",\"spatialRefType\":\"SPATIALREF_EARTH_LONGITUDE_LATITUDE\",\"name\":\"GCS_WGS_1984\",\"type\":\"GCS_WGS_1984\",\"primeMeridian\":{\"longitudeValue\":0,\"name\":\"Greenwich\",\"type\":\"PRIMEMERIDIAN_GREENWICH\"}}},\"datasourceConnectionInfo\":null,\"bandNames\":null,\"height\":1024}}";
var getDatasetWordEarthJson = {
    "childUriList": [
        "https://iserver.supermap.io/iserver/services/data-world/rest/data/datasources/World/datasets/WorldEarth/fields",
        "https://iserver.supermap.io/iserver/services/data-world/rest/data/datasources/World/datasets/WorldEarth/features",
        "https://iserver.supermap.io/iserver/services/data-world/rest/data/datasources/World/datasets/WorldEarth/domain"
    ],
    "supportAttachments": false,
    "supportFeatureMetadatas": false,
    "datasetInfo": {
        "isMultiBand": false,
        "bandCount": 0,
        "schema": null,
        "pixelFormat": "RGB",
        "palettes": null,
        "description": "",
        "type": "IMAGE",
        "blockSize": 64,
        "dataSourceName": "World",
        "tableName": "WorldEarth",
        "colorSpace": null,
        "isReadOnly": true,
        "encodeType": "DCT",
        "width": 2048,
        "bounds": {
            "top": 90,
            "left": -180,
            "bottom": -90,
            "leftBottom": {
                "x": -180,
                "y": -90
            },
            "right": 180,
            "rightTop": {
                "x": 180,
                "y": 90
            }
        },
        "name": "WorldEarth",
        "palette": [],
        "prjCoordSys": {
            "distanceUnit": "METER",
            "projectionParam": null,
            "epsgCode": 4326,
            "coordUnit": "DEGREE",
            "name": "Longitude / Latitude Coordinate System---GCS_WGS_1984",
            "projection": null,
            "type": "PCS_EARTH_LONGITUDE_LATITUDE",
            "coordSystem": {
                "datum": {
                    "name": "D_WGS_1984",
                    "type": "DATUM_WGS_1984",
                    "spheroid": {
                        "flatten": 0.00335281066474748,
                        "name": "WGS_1984",
                        "axis": 6378137,
                        "type": "SPHEROID_WGS_1984"
                    }
                },
                "unit": "DEGREE",
                "spatialRefType": "SPATIALREF_EARTH_LONGITUDE_LATITUDE",
                "name": "GCS_WGS_1984",
                "type": "GCS_WGS_1984",
                "primeMeridian": {
                    "longitudeValue": 0,
                    "name": "Greenwich",
                    "type": "PRIMEMERIDIAN_GREENWICH"
                }
            }
        },
        "datasourceConnectionInfo": null,
        "bandNames": null,
        "height": 1024
    }
}

var getDatasetLandCoverJson = {
    "childUriList": [
        "https://iserver.supermap.io/iserver/services/data-world/rest/data/datasources/World/datasets/LandCover/fields",
        "https://iserver.supermap.io/iserver/services/data-world/rest/data/datasources/World/datasets/LandCover/features",
        "https://iserver.supermap.io/iserver/services/data-world/rest/data/datasources/World/datasets/LandCover/domain"
    ],
    "supportAttachments": false,
    "supportFeatureMetadatas": false,
    "datasetInfo": {
        "schema": null,
        "pixelFormat": "BIT32",
        "maxValue": 13,
        "description": "",
        "type": "GRID",
        "blockSize": 256,
        "dataSourceName": "World",
        "tableName": "LandCover",
        "noValue": -9999,
        "minValue": 0,
        "isReadOnly": true,
        "encodeType": "SGL",
        "width": 5760,
        "bounds": {
            "top": 90,
            "left": -180,
            "bottom": -90,
            "leftBottom": {
                "x": -180,
                "y": -90
            },
            "right": 180,
            "rightTop": {
                "x": 180,
                "y": 90
            }
        },
        "name": "LandCover",
        "prjCoordSys": {
            "distanceUnit": "METER",
            "projectionParam": null,
            "epsgCode": 4326,
            "coordUnit": "DEGREE",
            "name": "Longitude / Latitude Coordinate System---GCS_WGS_1984",
            "projection": null,
            "type": "PCS_EARTH_LONGITUDE_LATITUDE",
            "coordSystem": {
                "datum": {
                    "name": "D_WGS_1984",
                    "type": "DATUM_WGS_1984",
                    "spheroid": {
                        "flatten": 0.00335281066474748,
                        "name": "WGS_1984",
                        "axis": 6378137,
                        "type": "SPHEROID_WGS_1984"
                    }
                },
                "unit": "DEGREE",
                "spatialRefType": "SPATIALREF_EARTH_LONGITUDE_LATITUDE",
                "name": "GCS_WGS_1984",
                "type": "GCS_WGS_1984",
                "primeMeridian": {
                    "longitudeValue": 0,
                    "name": "Greenwich",
                    "type": "PRIMEMERIDIAN_GREENWICH"
                }
            }
        },
        "datasourceConnectionInfo": null,
        "height": 2880
    }
};

var gridValueJson = {"column":4672,"row":896,"value":1,"centerPoint":{"x":112,"y":34}};

var imageValueJson = {
    "color": {
        "red": 41,
        "green": 49,
        "blue": 25,
        "alpha": 255
    },
    "column": 1661,
    "bounds": null,
    "row": 318,
    "value": 2699545,
    "centerPoint": {
        "x": 112,
        "y": 34
    }
};

var grindValuesJson = {
	"valuesCount": 256,
	"values": [
		[
			{
				"column": 4678,
				"row": 869,
				"value": 10,
				"centerPoint": {
					"x": 112.40625,
					"y": 35.65625
				}
			},
			{
				"column": 4679,
				"row": 869,
				"value": 10,
				"centerPoint": {
					"x": 112.46875,
					"y": 35.65625
				}
			},
			{
				"column": 4680,
				"row": 869,
				"value": 10,
				"centerPoint": {
					"x": 112.53125,
					"y": 35.65625
				}
			},
			{
				"column": 4681,
				"row": 869,
				"value": 10,
				"centerPoint": {
					"x": 112.59375,
					"y": 35.65625
				}
			},
			{
				"column": 4682,
				"row": 869,
				"value": 10,
				"centerPoint": {
					"x": 112.65625,
					"y": 35.65625
				}
			},
			{
				"column": 4683,
				"row": 869,
				"value": 10,
				"centerPoint": {
					"x": 112.71875,
					"y": 35.65625
				}
			},
			{
				"column": 4684,
				"row": 869,
				"value": 11,
				"centerPoint": {
					"x": 112.78125,
					"y": 35.65625
				}
			},
			{
				"column": 4685,
				"row": 869,
				"value": 11,
				"centerPoint": {
					"x": 112.84375,
					"y": 35.65625
				}
			},
			{
				"column": 4686,
				"row": 869,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 35.65625
				}
			},
			{
				"column": 4687,
				"row": 869,
				"value": 11,
				"centerPoint": {
					"x": 112.96875,
					"y": 35.65625
				}
			},
			{
				"column": 4688,
				"row": 869,
				"value": 11,
				"centerPoint": {
					"x": 113.03125,
					"y": 35.65625
				}
			},
			{
				"column": 4689,
				"row": 869,
				"value": 11,
				"centerPoint": {
					"x": 113.09375,
					"y": 35.65625
				}
			},
			{
				"column": 4690,
				"row": 869,
				"value": 11,
				"centerPoint": {
					"x": 113.15625,
					"y": 35.65625
				}
			},
			{
				"column": 4691,
				"row": 869,
				"value": 1,
				"centerPoint": {
					"x": 113.21875,
					"y": 35.65625
				}
			},
			{
				"column": 4692,
				"row": 869,
				"value": 1,
				"centerPoint": {
					"x": 113.28125,
					"y": 35.65625
				}
			},
			{
				"column": 4693,
				"row": 869,
				"value": 1,
				"centerPoint": {
					"x": 113.34375,
					"y": 35.65625
				}
			}
		],
		[
			{
				"column": 4678,
				"row": 870,
				"value": 10,
				"centerPoint": {
					"x": 112.40625,
					"y": 35.59375
				}
			},
			{
				"column": 4679,
				"row": 870,
				"value": 10,
				"centerPoint": {
					"x": 112.46875,
					"y": 35.59375
				}
			},
			{
				"column": 4680,
				"row": 870,
				"value": 10,
				"centerPoint": {
					"x": 112.53125,
					"y": 35.59375
				}
			},
			{
				"column": 4681,
				"row": 870,
				"value": 10,
				"centerPoint": {
					"x": 112.59375,
					"y": 35.59375
				}
			},
			{
				"column": 4682,
				"row": 870,
				"value": 10,
				"centerPoint": {
					"x": 112.65625,
					"y": 35.59375
				}
			},
			{
				"column": 4683,
				"row": 870,
				"value": 11,
				"centerPoint": {
					"x": 112.71875,
					"y": 35.59375
				}
			},
			{
				"column": 4684,
				"row": 870,
				"value": 11,
				"centerPoint": {
					"x": 112.78125,
					"y": 35.59375
				}
			},
			{
				"column": 4685,
				"row": 870,
				"value": 11,
				"centerPoint": {
					"x": 112.84375,
					"y": 35.59375
				}
			},
			{
				"column": 4686,
				"row": 870,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 35.59375
				}
			},
			{
				"column": 4687,
				"row": 870,
				"value": 11,
				"centerPoint": {
					"x": 112.96875,
					"y": 35.59375
				}
			},
			{
				"column": 4688,
				"row": 870,
				"value": 11,
				"centerPoint": {
					"x": 113.03125,
					"y": 35.59375
				}
			},
			{
				"column": 4689,
				"row": 870,
				"value": 11,
				"centerPoint": {
					"x": 113.09375,
					"y": 35.59375
				}
			},
			{
				"column": 4690,
				"row": 870,
				"value": 1,
				"centerPoint": {
					"x": 113.15625,
					"y": 35.59375
				}
			},
			{
				"column": 4691,
				"row": 870,
				"value": 1,
				"centerPoint": {
					"x": 113.21875,
					"y": 35.59375
				}
			},
			{
				"column": 4692,
				"row": 870,
				"value": 1,
				"centerPoint": {
					"x": 113.28125,
					"y": 35.59375
				}
			},
			{
				"column": 4693,
				"row": 870,
				"value": 1,
				"centerPoint": {
					"x": 113.34375,
					"y": 35.59375
				}
			}
		],
		[
			{
				"column": 4678,
				"row": 871,
				"value": 10,
				"centerPoint": {
					"x": 112.40625,
					"y": 35.53125
				}
			},
			{
				"column": 4679,
				"row": 871,
				"value": 10,
				"centerPoint": {
					"x": 112.46875,
					"y": 35.53125
				}
			},
			{
				"column": 4680,
				"row": 871,
				"value": 10,
				"centerPoint": {
					"x": 112.53125,
					"y": 35.53125
				}
			},
			{
				"column": 4681,
				"row": 871,
				"value": 10,
				"centerPoint": {
					"x": 112.59375,
					"y": 35.53125
				}
			},
			{
				"column": 4682,
				"row": 871,
				"value": 11,
				"centerPoint": {
					"x": 112.65625,
					"y": 35.53125
				}
			},
			{
				"column": 4683,
				"row": 871,
				"value": 11,
				"centerPoint": {
					"x": 112.71875,
					"y": 35.53125
				}
			},
			{
				"column": 4684,
				"row": 871,
				"value": 11,
				"centerPoint": {
					"x": 112.78125,
					"y": 35.53125
				}
			},
			{
				"column": 4685,
				"row": 871,
				"value": 10,
				"centerPoint": {
					"x": 112.84375,
					"y": 35.53125
				}
			},
			{
				"column": 4686,
				"row": 871,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 35.53125
				}
			},
			{
				"column": 4687,
				"row": 871,
				"value": 11,
				"centerPoint": {
					"x": 112.96875,
					"y": 35.53125
				}
			},
			{
				"column": 4688,
				"row": 871,
				"value": 11,
				"centerPoint": {
					"x": 113.03125,
					"y": 35.53125
				}
			},
			{
				"column": 4689,
				"row": 871,
				"value": 11,
				"centerPoint": {
					"x": 113.09375,
					"y": 35.53125
				}
			},
			{
				"column": 4690,
				"row": 871,
				"value": 1,
				"centerPoint": {
					"x": 113.15625,
					"y": 35.53125
				}
			},
			{
				"column": 4691,
				"row": 871,
				"value": 1,
				"centerPoint": {
					"x": 113.21875,
					"y": 35.53125
				}
			},
			{
				"column": 4692,
				"row": 871,
				"value": 1,
				"centerPoint": {
					"x": 113.28125,
					"y": 35.53125
				}
			},
			{
				"column": 4693,
				"row": 871,
				"value": 1,
				"centerPoint": {
					"x": 113.34375,
					"y": 35.53125
				}
			}
		],
		[
			{
				"column": 4678,
				"row": 872,
				"value": 10,
				"centerPoint": {
					"x": 112.40625,
					"y": 35.46875
				}
			},
			{
				"column": 4679,
				"row": 872,
				"value": 11,
				"centerPoint": {
					"x": 112.46875,
					"y": 35.46875
				}
			},
			{
				"column": 4680,
				"row": 872,
				"value": 11,
				"centerPoint": {
					"x": 112.53125,
					"y": 35.46875
				}
			},
			{
				"column": 4681,
				"row": 872,
				"value": 11,
				"centerPoint": {
					"x": 112.59375,
					"y": 35.46875
				}
			},
			{
				"column": 4682,
				"row": 872,
				"value": 11,
				"centerPoint": {
					"x": 112.65625,
					"y": 35.46875
				}
			},
			{
				"column": 4683,
				"row": 872,
				"value": 10,
				"centerPoint": {
					"x": 112.71875,
					"y": 35.46875
				}
			},
			{
				"column": 4684,
				"row": 872,
				"value": 10,
				"centerPoint": {
					"x": 112.78125,
					"y": 35.46875
				}
			},
			{
				"column": 4685,
				"row": 872,
				"value": 10,
				"centerPoint": {
					"x": 112.84375,
					"y": 35.46875
				}
			},
			{
				"column": 4686,
				"row": 872,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 35.46875
				}
			},
			{
				"column": 4687,
				"row": 872,
				"value": 11,
				"centerPoint": {
					"x": 112.96875,
					"y": 35.46875
				}
			},
			{
				"column": 4688,
				"row": 872,
				"value": 11,
				"centerPoint": {
					"x": 113.03125,
					"y": 35.46875
				}
			},
			{
				"column": 4689,
				"row": 872,
				"value": 1,
				"centerPoint": {
					"x": 113.09375,
					"y": 35.46875
				}
			},
			{
				"column": 4690,
				"row": 872,
				"value": 1,
				"centerPoint": {
					"x": 113.15625,
					"y": 35.46875
				}
			},
			{
				"column": 4691,
				"row": 872,
				"value": 11,
				"centerPoint": {
					"x": 113.21875,
					"y": 35.46875
				}
			},
			{
				"column": 4692,
				"row": 872,
				"value": 11,
				"centerPoint": {
					"x": 113.28125,
					"y": 35.46875
				}
			},
			{
				"column": 4693,
				"row": 872,
				"value": 11,
				"centerPoint": {
					"x": 113.34375,
					"y": 35.46875
				}
			}
		],
		[
			{
				"column": 4678,
				"row": 873,
				"value": 11,
				"centerPoint": {
					"x": 112.40625,
					"y": 35.40625
				}
			},
			{
				"column": 4679,
				"row": 873,
				"value": 11,
				"centerPoint": {
					"x": 112.46875,
					"y": 35.40625
				}
			},
			{
				"column": 4680,
				"row": 873,
				"value": 11,
				"centerPoint": {
					"x": 112.53125,
					"y": 35.40625
				}
			},
			{
				"column": 4681,
				"row": 873,
				"value": 11,
				"centerPoint": {
					"x": 112.59375,
					"y": 35.40625
				}
			},
			{
				"column": 4682,
				"row": 873,
				"value": 10,
				"centerPoint": {
					"x": 112.65625,
					"y": 35.40625
				}
			},
			{
				"column": 4683,
				"row": 873,
				"value": 10,
				"centerPoint": {
					"x": 112.71875,
					"y": 35.40625
				}
			},
			{
				"column": 4684,
				"row": 873,
				"value": 10,
				"centerPoint": {
					"x": 112.78125,
					"y": 35.40625
				}
			},
			{
				"column": 4685,
				"row": 873,
				"value": 11,
				"centerPoint": {
					"x": 112.84375,
					"y": 35.40625
				}
			},
			{
				"column": 4686,
				"row": 873,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 35.40625
				}
			},
			{
				"column": 4687,
				"row": 873,
				"value": 10,
				"centerPoint": {
					"x": 112.96875,
					"y": 35.40625
				}
			},
			{
				"column": 4688,
				"row": 873,
				"value": 10,
				"centerPoint": {
					"x": 113.03125,
					"y": 35.40625
				}
			},
			{
				"column": 4689,
				"row": 873,
				"value": 10,
				"centerPoint": {
					"x": 113.09375,
					"y": 35.40625
				}
			},
			{
				"column": 4690,
				"row": 873,
				"value": 11,
				"centerPoint": {
					"x": 113.15625,
					"y": 35.40625
				}
			},
			{
				"column": 4691,
				"row": 873,
				"value": 11,
				"centerPoint": {
					"x": 113.21875,
					"y": 35.40625
				}
			},
			{
				"column": 4692,
				"row": 873,
				"value": 10,
				"centerPoint": {
					"x": 113.28125,
					"y": 35.40625
				}
			},
			{
				"column": 4693,
				"row": 873,
				"value": 10,
				"centerPoint": {
					"x": 113.34375,
					"y": 35.40625
				}
			}
		],
		[
			{
				"column": 4678,
				"row": 874,
				"value": 11,
				"centerPoint": {
					"x": 112.40625,
					"y": 35.34375
				}
			},
			{
				"column": 4679,
				"row": 874,
				"value": 11,
				"centerPoint": {
					"x": 112.46875,
					"y": 35.34375
				}
			},
			{
				"column": 4680,
				"row": 874,
				"value": 11,
				"centerPoint": {
					"x": 112.53125,
					"y": 35.34375
				}
			},
			{
				"column": 4681,
				"row": 874,
				"value": 11,
				"centerPoint": {
					"x": 112.59375,
					"y": 35.34375
				}
			},
			{
				"column": 4682,
				"row": 874,
				"value": 11,
				"centerPoint": {
					"x": 112.65625,
					"y": 35.34375
				}
			},
			{
				"column": 4683,
				"row": 874,
				"value": 11,
				"centerPoint": {
					"x": 112.71875,
					"y": 35.34375
				}
			},
			{
				"column": 4684,
				"row": 874,
				"value": 11,
				"centerPoint": {
					"x": 112.78125,
					"y": 35.34375
				}
			},
			{
				"column": 4685,
				"row": 874,
				"value": 11,
				"centerPoint": {
					"x": 112.84375,
					"y": 35.34375
				}
			},
			{
				"column": 4686,
				"row": 874,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 35.34375
				}
			},
			{
				"column": 4687,
				"row": 874,
				"value": 11,
				"centerPoint": {
					"x": 112.96875,
					"y": 35.34375
				}
			},
			{
				"column": 4688,
				"row": 874,
				"value": 11,
				"centerPoint": {
					"x": 113.03125,
					"y": 35.34375
				}
			},
			{
				"column": 4689,
				"row": 874,
				"value": 11,
				"centerPoint": {
					"x": 113.09375,
					"y": 35.34375
				}
			},
			{
				"column": 4690,
				"row": 874,
				"value": 11,
				"centerPoint": {
					"x": 113.15625,
					"y": 35.34375
				}
			},
			{
				"column": 4691,
				"row": 874,
				"value": 10,
				"centerPoint": {
					"x": 113.21875,
					"y": 35.34375
				}
			},
			{
				"column": 4692,
				"row": 874,
				"value": 10,
				"centerPoint": {
					"x": 113.28125,
					"y": 35.34375
				}
			},
			{
				"column": 4693,
				"row": 874,
				"value": 11,
				"centerPoint": {
					"x": 113.34375,
					"y": 35.34375
				}
			}
		],
		[
			{
				"column": 4678,
				"row": 875,
				"value": 1,
				"centerPoint": {
					"x": 112.40625,
					"y": 35.28125
				}
			},
			{
				"column": 4679,
				"row": 875,
				"value": 11,
				"centerPoint": {
					"x": 112.46875,
					"y": 35.28125
				}
			},
			{
				"column": 4680,
				"row": 875,
				"value": 11,
				"centerPoint": {
					"x": 112.53125,
					"y": 35.28125
				}
			},
			{
				"column": 4681,
				"row": 875,
				"value": 11,
				"centerPoint": {
					"x": 112.59375,
					"y": 35.28125
				}
			},
			{
				"column": 4682,
				"row": 875,
				"value": 11,
				"centerPoint": {
					"x": 112.65625,
					"y": 35.28125
				}
			},
			{
				"column": 4683,
				"row": 875,
				"value": 11,
				"centerPoint": {
					"x": 112.71875,
					"y": 35.28125
				}
			},
			{
				"column": 4684,
				"row": 875,
				"value": 11,
				"centerPoint": {
					"x": 112.78125,
					"y": 35.28125
				}
			},
			{
				"column": 4685,
				"row": 875,
				"value": 11,
				"centerPoint": {
					"x": 112.84375,
					"y": 35.28125
				}
			},
			{
				"column": 4686,
				"row": 875,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 35.28125
				}
			},
			{
				"column": 4687,
				"row": 875,
				"value": 11,
				"centerPoint": {
					"x": 112.96875,
					"y": 35.28125
				}
			},
			{
				"column": 4688,
				"row": 875,
				"value": 11,
				"centerPoint": {
					"x": 113.03125,
					"y": 35.28125
				}
			},
			{
				"column": 4689,
				"row": 875,
				"value": 11,
				"centerPoint": {
					"x": 113.09375,
					"y": 35.28125
				}
			},
			{
				"column": 4690,
				"row": 875,
				"value": 11,
				"centerPoint": {
					"x": 113.15625,
					"y": 35.28125
				}
			},
			{
				"column": 4691,
				"row": 875,
				"value": 11,
				"centerPoint": {
					"x": 113.21875,
					"y": 35.28125
				}
			},
			{
				"column": 4692,
				"row": 875,
				"value": 11,
				"centerPoint": {
					"x": 113.28125,
					"y": 35.28125
				}
			},
			{
				"column": 4693,
				"row": 875,
				"value": 11,
				"centerPoint": {
					"x": 113.34375,
					"y": 35.28125
				}
			}
		],
		[
			{
				"column": 4678,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 112.40625,
					"y": 35.21875
				}
			},
			{
				"column": 4679,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 112.46875,
					"y": 35.21875
				}
			},
			{
				"column": 4680,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 112.53125,
					"y": 35.21875
				}
			},
			{
				"column": 4681,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 112.59375,
					"y": 35.21875
				}
			},
			{
				"column": 4682,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 112.65625,
					"y": 35.21875
				}
			},
			{
				"column": 4683,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 112.71875,
					"y": 35.21875
				}
			},
			{
				"column": 4684,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 112.78125,
					"y": 35.21875
				}
			},
			{
				"column": 4685,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 112.84375,
					"y": 35.21875
				}
			},
			{
				"column": 4686,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 35.21875
				}
			},
			{
				"column": 4687,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 112.96875,
					"y": 35.21875
				}
			},
			{
				"column": 4688,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 113.03125,
					"y": 35.21875
				}
			},
			{
				"column": 4689,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 113.09375,
					"y": 35.21875
				}
			},
			{
				"column": 4690,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 113.15625,
					"y": 35.21875
				}
			},
			{
				"column": 4691,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 113.21875,
					"y": 35.21875
				}
			},
			{
				"column": 4692,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 113.28125,
					"y": 35.21875
				}
			},
			{
				"column": 4693,
				"row": 876,
				"value": 11,
				"centerPoint": {
					"x": 113.34375,
					"y": 35.21875
				}
			}
		],
		[
			{
				"column": 4678,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 112.40625,
					"y": 35.15625
				}
			},
			{
				"column": 4679,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 112.46875,
					"y": 35.15625
				}
			},
			{
				"column": 4680,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 112.53125,
					"y": 35.15625
				}
			},
			{
				"column": 4681,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 112.59375,
					"y": 35.15625
				}
			},
			{
				"column": 4682,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 112.65625,
					"y": 35.15625
				}
			},
			{
				"column": 4683,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 112.71875,
					"y": 35.15625
				}
			},
			{
				"column": 4684,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 112.78125,
					"y": 35.15625
				}
			},
			{
				"column": 4685,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 112.84375,
					"y": 35.15625
				}
			},
			{
				"column": 4686,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 35.15625
				}
			},
			{
				"column": 4687,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 112.96875,
					"y": 35.15625
				}
			},
			{
				"column": 4688,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 113.03125,
					"y": 35.15625
				}
			},
			{
				"column": 4689,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 113.09375,
					"y": 35.15625
				}
			},
			{
				"column": 4690,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 113.15625,
					"y": 35.15625
				}
			},
			{
				"column": 4691,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 113.21875,
					"y": 35.15625
				}
			},
			{
				"column": 4692,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 113.28125,
					"y": 35.15625
				}
			},
			{
				"column": 4693,
				"row": 877,
				"value": 11,
				"centerPoint": {
					"x": 113.34375,
					"y": 35.15625
				}
			}
		],
		[
			{
				"column": 4678,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 112.40625,
					"y": 35.09375
				}
			},
			{
				"column": 4679,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 112.46875,
					"y": 35.09375
				}
			},
			{
				"column": 4680,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 112.53125,
					"y": 35.09375
				}
			},
			{
				"column": 4681,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 112.59375,
					"y": 35.09375
				}
			},
			{
				"column": 4682,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 112.65625,
					"y": 35.09375
				}
			},
			{
				"column": 4683,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 112.71875,
					"y": 35.09375
				}
			},
			{
				"column": 4684,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 112.78125,
					"y": 35.09375
				}
			},
			{
				"column": 4685,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 112.84375,
					"y": 35.09375
				}
			},
			{
				"column": 4686,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 35.09375
				}
			},
			{
				"column": 4687,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 112.96875,
					"y": 35.09375
				}
			},
			{
				"column": 4688,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 113.03125,
					"y": 35.09375
				}
			},
			{
				"column": 4689,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 113.09375,
					"y": 35.09375
				}
			},
			{
				"column": 4690,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 113.15625,
					"y": 35.09375
				}
			},
			{
				"column": 4691,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 113.21875,
					"y": 35.09375
				}
			},
			{
				"column": 4692,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 113.28125,
					"y": 35.09375
				}
			},
			{
				"column": 4693,
				"row": 878,
				"value": 11,
				"centerPoint": {
					"x": 113.34375,
					"y": 35.09375
				}
			}
		],
		[
			{
				"column": 4678,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 112.40625,
					"y": 35.03125
				}
			},
			{
				"column": 4679,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 112.46875,
					"y": 35.03125
				}
			},
			{
				"column": 4680,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 112.53125,
					"y": 35.03125
				}
			},
			{
				"column": 4681,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 112.59375,
					"y": 35.03125
				}
			},
			{
				"column": 4682,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 112.65625,
					"y": 35.03125
				}
			},
			{
				"column": 4683,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 112.71875,
					"y": 35.03125
				}
			},
			{
				"column": 4684,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 112.78125,
					"y": 35.03125
				}
			},
			{
				"column": 4685,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 112.84375,
					"y": 35.03125
				}
			},
			{
				"column": 4686,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 35.03125
				}
			},
			{
				"column": 4687,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 112.96875,
					"y": 35.03125
				}
			},
			{
				"column": 4688,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 113.03125,
					"y": 35.03125
				}
			},
			{
				"column": 4689,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 113.09375,
					"y": 35.03125
				}
			},
			{
				"column": 4690,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 113.15625,
					"y": 35.03125
				}
			},
			{
				"column": 4691,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 113.21875,
					"y": 35.03125
				}
			},
			{
				"column": 4692,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 113.28125,
					"y": 35.03125
				}
			},
			{
				"column": 4693,
				"row": 879,
				"value": 11,
				"centerPoint": {
					"x": 113.34375,
					"y": 35.03125
				}
			}
		],
		[
			{
				"column": 4678,
				"row": 880,
				"value": 10,
				"centerPoint": {
					"x": 112.40625,
					"y": 34.96875
				}
			},
			{
				"column": 4679,
				"row": 880,
				"value": 10,
				"centerPoint": {
					"x": 112.46875,
					"y": 34.96875
				}
			},
			{
				"column": 4680,
				"row": 880,
				"value": 11,
				"centerPoint": {
					"x": 112.53125,
					"y": 34.96875
				}
			},
			{
				"column": 4681,
				"row": 880,
				"value": 11,
				"centerPoint": {
					"x": 112.59375,
					"y": 34.96875
				}
			},
			{
				"column": 4682,
				"row": 880,
				"value": 11,
				"centerPoint": {
					"x": 112.65625,
					"y": 34.96875
				}
			},
			{
				"column": 4683,
				"row": 880,
				"value": 11,
				"centerPoint": {
					"x": 112.71875,
					"y": 34.96875
				}
			},
			{
				"column": 4684,
				"row": 880,
				"value": 11,
				"centerPoint": {
					"x": 112.78125,
					"y": 34.96875
				}
			},
			{
				"column": 4685,
				"row": 880,
				"value": 11,
				"centerPoint": {
					"x": 112.84375,
					"y": 34.96875
				}
			},
			{
				"column": 4686,
				"row": 880,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 34.96875
				}
			},
			{
				"column": 4687,
				"row": 880,
				"value": 11,
				"centerPoint": {
					"x": 112.96875,
					"y": 34.96875
				}
			},
			{
				"column": 4688,
				"row": 880,
				"value": 11,
				"centerPoint": {
					"x": 113.03125,
					"y": 34.96875
				}
			},
			{
				"column": 4689,
				"row": 880,
				"value": 11,
				"centerPoint": {
					"x": 113.09375,
					"y": 34.96875
				}
			},
			{
				"column": 4690,
				"row": 880,
				"value": 11,
				"centerPoint": {
					"x": 113.15625,
					"y": 34.96875
				}
			},
			{
				"column": 4691,
				"row": 880,
				"value": 11,
				"centerPoint": {
					"x": 113.21875,
					"y": 34.96875
				}
			},
			{
				"column": 4692,
				"row": 880,
				"value": 10,
				"centerPoint": {
					"x": 113.28125,
					"y": 34.96875
				}
			},
			{
				"column": 4693,
				"row": 880,
				"value": 10,
				"centerPoint": {
					"x": 113.34375,
					"y": 34.96875
				}
			}
		],
		[
			{
				"column": 4678,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 112.40625,
					"y": 34.90625
				}
			},
			{
				"column": 4679,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 112.46875,
					"y": 34.90625
				}
			},
			{
				"column": 4680,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 112.53125,
					"y": 34.90625
				}
			},
			{
				"column": 4681,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 112.59375,
					"y": 34.90625
				}
			},
			{
				"column": 4682,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 112.65625,
					"y": 34.90625
				}
			},
			{
				"column": 4683,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 112.71875,
					"y": 34.90625
				}
			},
			{
				"column": 4684,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 112.78125,
					"y": 34.90625
				}
			},
			{
				"column": 4685,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 112.84375,
					"y": 34.90625
				}
			},
			{
				"column": 4686,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 34.90625
				}
			},
			{
				"column": 4687,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 112.96875,
					"y": 34.90625
				}
			},
			{
				"column": 4688,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 113.03125,
					"y": 34.90625
				}
			},
			{
				"column": 4689,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 113.09375,
					"y": 34.90625
				}
			},
			{
				"column": 4690,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 113.15625,
					"y": 34.90625
				}
			},
			{
				"column": 4691,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 113.21875,
					"y": 34.90625
				}
			},
			{
				"column": 4692,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 113.28125,
					"y": 34.90625
				}
			},
			{
				"column": 4693,
				"row": 881,
				"value": 11,
				"centerPoint": {
					"x": 113.34375,
					"y": 34.90625
				}
			}
		],
		[
			{
				"column": 4678,
				"row": 882,
				"value": 10,
				"centerPoint": {
					"x": 112.40625,
					"y": 34.84375
				}
			},
			{
				"column": 4679,
				"row": 882,
				"value": 11,
				"centerPoint": {
					"x": 112.46875,
					"y": 34.84375
				}
			},
			{
				"column": 4680,
				"row": 882,
				"value": 11,
				"centerPoint": {
					"x": 112.53125,
					"y": 34.84375
				}
			},
			{
				"column": 4681,
				"row": 882,
				"value": 11,
				"centerPoint": {
					"x": 112.59375,
					"y": 34.84375
				}
			},
			{
				"column": 4682,
				"row": 882,
				"value": 11,
				"centerPoint": {
					"x": 112.65625,
					"y": 34.84375
				}
			},
			{
				"column": 4683,
				"row": 882,
				"value": 11,
				"centerPoint": {
					"x": 112.71875,
					"y": 34.84375
				}
			},
			{
				"column": 4684,
				"row": 882,
				"value": 11,
				"centerPoint": {
					"x": 112.78125,
					"y": 34.84375
				}
			},
			{
				"column": 4685,
				"row": 882,
				"value": 11,
				"centerPoint": {
					"x": 112.84375,
					"y": 34.84375
				}
			},
			{
				"column": 4686,
				"row": 882,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 34.84375
				}
			},
			{
				"column": 4687,
				"row": 882,
				"value": 11,
				"centerPoint": {
					"x": 112.96875,
					"y": 34.84375
				}
			},
			{
				"column": 4688,
				"row": 882,
				"value": 11,
				"centerPoint": {
					"x": 113.03125,
					"y": 34.84375
				}
			},
			{
				"column": 4689,
				"row": 882,
				"value": 10,
				"centerPoint": {
					"x": 113.09375,
					"y": 34.84375
				}
			},
			{
				"column": 4690,
				"row": 882,
				"value": 11,
				"centerPoint": {
					"x": 113.15625,
					"y": 34.84375
				}
			},
			{
				"column": 4691,
				"row": 882,
				"value": 11,
				"centerPoint": {
					"x": 113.21875,
					"y": 34.84375
				}
			},
			{
				"column": 4692,
				"row": 882,
				"value": 10,
				"centerPoint": {
					"x": 113.28125,
					"y": 34.84375
				}
			},
			{
				"column": 4693,
				"row": 882,
				"value": 11,
				"centerPoint": {
					"x": 113.34375,
					"y": 34.84375
				}
			}
		],
		[
			{
				"column": 4678,
				"row": 883,
				"value": 11,
				"centerPoint": {
					"x": 112.40625,
					"y": 34.78125
				}
			},
			{
				"column": 4679,
				"row": 883,
				"value": 11,
				"centerPoint": {
					"x": 112.46875,
					"y": 34.78125
				}
			},
			{
				"column": 4680,
				"row": 883,
				"value": 11,
				"centerPoint": {
					"x": 112.53125,
					"y": 34.78125
				}
			},
			{
				"column": 4681,
				"row": 883,
				"value": 11,
				"centerPoint": {
					"x": 112.59375,
					"y": 34.78125
				}
			},
			{
				"column": 4682,
				"row": 883,
				"value": 11,
				"centerPoint": {
					"x": 112.65625,
					"y": 34.78125
				}
			},
			{
				"column": 4683,
				"row": 883,
				"value": 11,
				"centerPoint": {
					"x": 112.71875,
					"y": 34.78125
				}
			},
			{
				"column": 4684,
				"row": 883,
				"value": 11,
				"centerPoint": {
					"x": 112.78125,
					"y": 34.78125
				}
			},
			{
				"column": 4685,
				"row": 883,
				"value": 11,
				"centerPoint": {
					"x": 112.84375,
					"y": 34.78125
				}
			},
			{
				"column": 4686,
				"row": 883,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 34.78125
				}
			},
			{
				"column": 4687,
				"row": 883,
				"value": 11,
				"centerPoint": {
					"x": 112.96875,
					"y": 34.78125
				}
			},
			{
				"column": 4688,
				"row": 883,
				"value": 11,
				"centerPoint": {
					"x": 113.03125,
					"y": 34.78125
				}
			},
			{
				"column": 4689,
				"row": 883,
				"value": 10,
				"centerPoint": {
					"x": 113.09375,
					"y": 34.78125
				}
			},
			{
				"column": 4690,
				"row": 883,
				"value": 10,
				"centerPoint": {
					"x": 113.15625,
					"y": 34.78125
				}
			},
			{
				"column": 4691,
				"row": 883,
				"value": 11,
				"centerPoint": {
					"x": 113.21875,
					"y": 34.78125
				}
			},
			{
				"column": 4692,
				"row": 883,
				"value": 10,
				"centerPoint": {
					"x": 113.28125,
					"y": 34.78125
				}
			},
			{
				"column": 4693,
				"row": 883,
				"value": 11,
				"centerPoint": {
					"x": 113.34375,
					"y": 34.78125
				}
			}
		],
		[
			{
				"column": 4678,
				"row": 884,
				"value": 11,
				"centerPoint": {
					"x": 112.40625,
					"y": 34.71875
				}
			},
			{
				"column": 4679,
				"row": 884,
				"value": 11,
				"centerPoint": {
					"x": 112.46875,
					"y": 34.71875
				}
			},
			{
				"column": 4680,
				"row": 884,
				"value": 11,
				"centerPoint": {
					"x": 112.53125,
					"y": 34.71875
				}
			},
			{
				"column": 4681,
				"row": 884,
				"value": 11,
				"centerPoint": {
					"x": 112.59375,
					"y": 34.71875
				}
			},
			{
				"column": 4682,
				"row": 884,
				"value": 11,
				"centerPoint": {
					"x": 112.65625,
					"y": 34.71875
				}
			},
			{
				"column": 4683,
				"row": 884,
				"value": 11,
				"centerPoint": {
					"x": 112.71875,
					"y": 34.71875
				}
			},
			{
				"column": 4684,
				"row": 884,
				"value": 11,
				"centerPoint": {
					"x": 112.78125,
					"y": 34.71875
				}
			},
			{
				"column": 4685,
				"row": 884,
				"value": 11,
				"centerPoint": {
					"x": 112.84375,
					"y": 34.71875
				}
			},
			{
				"column": 4686,
				"row": 884,
				"value": 11,
				"centerPoint": {
					"x": 112.90625,
					"y": 34.71875
				}
			},
			{
				"column": 4687,
				"row": 884,
				"value": 11,
				"centerPoint": {
					"x": 112.96875,
					"y": 34.71875
				}
			},
			{
				"column": 4688,
				"row": 884,
				"value": 11,
				"centerPoint": {
					"x": 113.03125,
					"y": 34.71875
				}
			},
			{
				"column": 4689,
				"row": 884,
				"value": 11,
				"centerPoint": {
					"x": 113.09375,
					"y": 34.71875
				}
			},
			{
				"column": 4690,
				"row": 884,
				"value": 10,
				"centerPoint": {
					"x": 113.15625,
					"y": 34.71875
				}
			},
			{
				"column": 4691,
				"row": 884,
				"value": 11,
				"centerPoint": {
					"x": 113.21875,
					"y": 34.71875
				}
			},
			{
				"column": 4692,
				"row": 884,
				"value": 11,
				"centerPoint": {
					"x": 113.28125,
					"y": 34.71875
				}
			},
			{
				"column": 4693,
				"row": 884,
				"value": 11,
				"centerPoint": {
					"x": 113.34375,
					"y": 34.71875
				}
			}
		],
		[]
	],
	"rowCount": 17,
	"columnCount": 17
};

var imageValuesJson = {
	"valuesCount": 36,
	"values": [
		[
			{
				"color": {
					"red": 50,
					"green": 64,
					"blue": 28,
					"alpha": 255
				},
				"column": 1663,
				"bounds": null,
				"row": 309,
				"value": 3293212,
				"centerPoint": {
					"x": 112.412109375,
					"y": 35.595703125
				}
			},
			{
				"color": {
					"red": 64,
					"green": 69,
					"blue": 37,
					"alpha": 255
				},
				"column": 1664,
				"bounds": null,
				"row": 309,
				"value": 4212005,
				"centerPoint": {
					"x": 112.587890625,
					"y": 35.595703125
				}
			},
			{
				"color": {
					"red": 64,
					"green": 69,
					"blue": 37,
					"alpha": 255
				},
				"column": 1665,
				"bounds": null,
				"row": 309,
				"value": 4212005,
				"centerPoint": {
					"x": 112.763671875,
					"y": 35.595703125
				}
			},
			{
				"color": {
					"red": 59,
					"green": 66,
					"blue": 33,
					"alpha": 255
				},
				"column": 1666,
				"bounds": null,
				"row": 309,
				"value": 3883553,
				"centerPoint": {
					"x": 112.939453125,
					"y": 35.595703125
				}
			},
			{
				"color": {
					"red": 48,
					"green": 55,
					"blue": 22,
					"alpha": 255
				},
				"column": 1667,
				"bounds": null,
				"row": 309,
				"value": 3159830,
				"centerPoint": {
					"x": 113.115234375,
					"y": 35.595703125
				}
			},
			{
				"color": {
					"red": 37,
					"green": 44,
					"blue": 11,
					"alpha": 255
				},
				"column": 1668,
				"bounds": null,
				"row": 309,
				"value": 2436107,
				"centerPoint": {
					"x": 113.291015625,
					"y": 35.595703125
				}
			}
		],
		[
			{
				"color": {
					"red": 55,
					"green": 67,
					"blue": 29,
					"alpha": 255
				},
				"column": 1663,
				"bounds": null,
				"row": 310,
				"value": 3621661,
				"centerPoint": {
					"x": 112.412109375,
					"y": 35.419921875
				}
			},
			{
				"color": {
					"red": 68,
					"green": 73,
					"blue": 41,
					"alpha": 255
				},
				"column": 1664,
				"bounds": null,
				"row": 310,
				"value": 4475177,
				"centerPoint": {
					"x": 112.587890625,
					"y": 35.419921875
				}
			},
			{
				"color": {
					"red": 62,
					"green": 67,
					"blue": 35,
					"alpha": 255
				},
				"column": 1665,
				"bounds": null,
				"row": 310,
				"value": 4080419,
				"centerPoint": {
					"x": 112.763671875,
					"y": 35.419921875
				}
			},
			{
				"color": {
					"red": 53,
					"green": 58,
					"blue": 26,
					"alpha": 255
				},
				"column": 1666,
				"bounds": null,
				"row": 310,
				"value": 3488282,
				"centerPoint": {
					"x": 112.939453125,
					"y": 35.419921875
				}
			},
			{
				"color": {
					"red": 46,
					"green": 51,
					"blue": 19,
					"alpha": 255
				},
				"column": 1667,
				"bounds": null,
				"row": 310,
				"value": 3027731,
				"centerPoint": {
					"x": 113.115234375,
					"y": 35.419921875
				}
			},
			{
				"color": {
					"red": 44,
					"green": 51,
					"blue": 18,
					"alpha": 255
				},
				"column": 1668,
				"bounds": null,
				"row": 310,
				"value": 2896658,
				"centerPoint": {
					"x": 113.291015625,
					"y": 35.419921875
				}
			}
		],
		[
			{
				"color": {
					"red": 39,
					"green": 51,
					"blue": 13,
					"alpha": 255
				},
				"column": 1663,
				"bounds": null,
				"row": 311,
				"value": 2568973,
				"centerPoint": {
					"x": 112.412109375,
					"y": 35.244140625
				}
			},
			{
				"color": {
					"red": 43,
					"green": 48,
					"blue": 16,
					"alpha": 255
				},
				"column": 1664,
				"bounds": null,
				"row": 311,
				"value": 2830352,
				"centerPoint": {
					"x": 112.587890625,
					"y": 35.244140625
				}
			},
			{
				"color": {
					"red": 45,
					"green": 50,
					"blue": 18,
					"alpha": 255
				},
				"column": 1665,
				"bounds": null,
				"row": 311,
				"value": 2961938,
				"centerPoint": {
					"x": 112.763671875,
					"y": 35.244140625
				}
			},
			{
				"color": {
					"red": 52,
					"green": 57,
					"blue": 25,
					"alpha": 255
				},
				"column": 1666,
				"bounds": null,
				"row": 311,
				"value": 3422489,
				"centerPoint": {
					"x": 112.939453125,
					"y": 35.244140625
				}
			},
			{
				"color": {
					"red": 64,
					"green": 69,
					"blue": 37,
					"alpha": 255
				},
				"column": 1667,
				"bounds": null,
				"row": 311,
				"value": 4212005,
				"centerPoint": {
					"x": 113.115234375,
					"y": 35.244140625
				}
			},
			{
				"color": {
					"red": 74,
					"green": 79,
					"blue": 47,
					"alpha": 255
				},
				"column": 1668,
				"bounds": null,
				"row": 311,
				"value": 4869935,
				"centerPoint": {
					"x": 113.291015625,
					"y": 35.244140625
				}
			}
		],
		[
			{
				"color": {
					"red": 43,
					"green": 55,
					"blue": 19,
					"alpha": 255
				},
				"column": 1663,
				"bounds": null,
				"row": 312,
				"value": 2832147,
				"centerPoint": {
					"x": 112.412109375,
					"y": 35.068359375
				}
			},
			{
				"color": {
					"red": 64,
					"green": 68,
					"blue": 35,
					"alpha": 255
				},
				"column": 1664,
				"bounds": null,
				"row": 312,
				"value": 4211747,
				"centerPoint": {
					"x": 112.587890625,
					"y": 35.068359375
				}
			},
			{
				"color": {
					"red": 69,
					"green": 73,
					"blue": 40,
					"alpha": 255
				},
				"column": 1665,
				"bounds": null,
				"row": 312,
				"value": 4540712,
				"centerPoint": {
					"x": 112.763671875,
					"y": 35.068359375
				}
			},
			{
				"color": {
					"red": 74,
					"green": 78,
					"blue": 45,
					"alpha": 255
				},
				"column": 1666,
				"bounds": null,
				"row": 312,
				"value": 4869677,
				"centerPoint": {
					"x": 112.939453125,
					"y": 35.068359375
				}
			},
			{
				"color": {
					"red": 75,
					"green": 81,
					"blue": 47,
					"alpha": 255
				},
				"column": 1667,
				"bounds": null,
				"row": 312,
				"value": 4935983,
				"centerPoint": {
					"x": 113.115234375,
					"y": 35.068359375
				}
			},
			{
				"color": {
					"red": 77,
					"green": 83,
					"blue": 49,
					"alpha": 255
				},
				"column": 1668,
				"bounds": null,
				"row": 312,
				"value": 5067569,
				"centerPoint": {
					"x": 113.291015625,
					"y": 35.068359375
				}
			}
		],
		[
			{
				"color": {
					"red": 59,
					"green": 71,
					"blue": 35,
					"alpha": 255
				},
				"column": 1663,
				"bounds": null,
				"row": 313,
				"value": 3884835,
				"centerPoint": {
					"x": 112.412109375,
					"y": 34.892578125
				}
			},
			{
				"color": {
					"red": 70,
					"green": 74,
					"blue": 41,
					"alpha": 255
				},
				"column": 1664,
				"bounds": null,
				"row": 313,
				"value": 4606505,
				"centerPoint": {
					"x": 112.587890625,
					"y": 34.892578125
				}
			},
			{
				"color": {
					"red": 75,
					"green": 79,
					"blue": 46,
					"alpha": 255
				},
				"column": 1665,
				"bounds": null,
				"row": 313,
				"value": 4935470,
				"centerPoint": {
					"x": 112.763671875,
					"y": 34.892578125
				}
			},
			{
				"color": {
					"red": 77,
					"green": 81,
					"blue": 48,
					"alpha": 255
				},
				"column": 1666,
				"bounds": null,
				"row": 313,
				"value": 5067056,
				"centerPoint": {
					"x": 112.939453125,
					"y": 34.892578125
				}
			},
			{
				"color": {
					"red": 75,
					"green": 79,
					"blue": 46,
					"alpha": 255
				},
				"column": 1667,
				"bounds": null,
				"row": 313,
				"value": 4935470,
				"centerPoint": {
					"x": 113.115234375,
					"y": 34.892578125
				}
			},
			{
				"color": {
					"red": 72,
					"green": 78,
					"blue": 44,
					"alpha": 255
				},
				"column": 1668,
				"bounds": null,
				"row": 313,
				"value": 4738604,
				"centerPoint": {
					"x": 113.291015625,
					"y": 34.892578125
				}
			}
		],
		[
			{
				"color": {
					"red": 74,
					"green": 84,
					"blue": 50,
					"alpha": 255
				},
				"column": 1663,
				"bounds": null,
				"row": 314,
				"value": 4871218,
				"centerPoint": {
					"x": 112.412109375,
					"y": 34.716796875
				}
			},
			{
				"color": {
					"red": 73,
					"green": 77,
					"blue": 42,
					"alpha": 255
				},
				"column": 1664,
				"bounds": null,
				"row": 314,
				"value": 4803882,
				"centerPoint": {
					"x": 112.587890625,
					"y": 34.716796875
				}
			},
			{
				"color": {
					"red": 76,
					"green": 80,
					"blue": 45,
					"alpha": 255
				},
				"column": 1665,
				"bounds": null,
				"row": 314,
				"value": 5001261,
				"centerPoint": {
					"x": 112.763671875,
					"y": 34.716796875
				}
			},
			{
				"color": {
					"red": 73,
					"green": 77,
					"blue": 42,
					"alpha": 255
				},
				"column": 1666,
				"bounds": null,
				"row": 314,
				"value": 4803882,
				"centerPoint": {
					"x": 112.939453125,
					"y": 34.716796875
				}
			},
			{
				"color": {
					"red": 65,
					"green": 69,
					"blue": 34,
					"alpha": 255
				},
				"column": 1667,
				"bounds": null,
				"row": 314,
				"value": 4277538,
				"centerPoint": {
					"x": 113.115234375,
					"y": 34.716796875
				}
			},
			{
				"color": {
					"red": 62,
					"green": 66,
					"blue": 31,
					"alpha": 255
				},
				"column": 1668,
				"bounds": null,
				"row": 314,
				"value": 4080159,
				"centerPoint": {
					"x": 113.291015625,
					"y": 34.716796875
				}
			}
		]
	],
	"rowCount": 6,
	"columnCount": 6
};

var girdValuesPostJson = {
	"postResultType": "CreateChild",
	"succeed": true,
	"customResult": [
		{
			"valuesCount": 10,
			"values": [
				[],
				[
					{
						"color": {
							"red": 44,
							"green": 54,
							"blue": 27,
							"alpha": 255
						},
						"column": 1637,
						"bounds": null,
						"row": 323,
						"value": 2897435,
						"centerPoint": {
							"x": 107.841796875,
							"y": 33.134765625
						}
					},
					{
						"color": {
							"red": 38,
							"green": 48,
							"blue": 21,
							"alpha": 255
						},
						"column": 1638,
						"bounds": null,
						"row": 323,
						"value": 2502677,
						"centerPoint": {
							"x": 108.017578125,
							"y": 33.134765625
						}
					},
					{
						"color": {
							"red": 35,
							"green": 45,
							"blue": 18,
							"alpha": 255
						},
						"column": 1639,
						"bounds": null,
						"row": 323,
						"value": 2305298,
						"centerPoint": {
							"x": 108.193359375,
							"y": 33.134765625
						}
					},
					{
						"color": {
							"red": 32,
							"green": 42,
							"blue": 15,
							"alpha": 255
						},
						"column": 1640,
						"bounds": null,
						"row": 323,
						"value": 2107919,
						"centerPoint": {
							"x": 108.369140625,
							"y": 33.134765625
						}
					},
					{
						"color": {
							"red": 28,
							"green": 38,
							"blue": 11,
							"alpha": 255
						},
						"column": 1641,
						"bounds": null,
						"row": 323,
						"value": 1844747,
						"centerPoint": {
							"x": 108.544921875,
							"y": 33.134765625
						}
					}
				],
				[
					{
						"color": {
							"red": 35,
							"green": 45,
							"blue": 18,
							"alpha": 255
						},
						"column": 1637,
						"bounds": null,
						"row": 324,
						"value": 2305298,
						"centerPoint": {
							"x": 107.841796875,
							"y": 32.958984375
						}
					},
					{
						"color": {
							"red": 33,
							"green": 43,
							"blue": 16,
							"alpha": 255
						},
						"column": 1638,
						"bounds": null,
						"row": 324,
						"value": 2173712,
						"centerPoint": {
							"x": 108.017578125,
							"y": 32.958984375
						}
					},
					{
						"color": {
							"red": 31,
							"green": 41,
							"blue": 14,
							"alpha": 255
						},
						"column": 1639,
						"bounds": null,
						"row": 324,
						"value": 2042126,
						"centerPoint": {
							"x": 108.193359375,
							"y": 32.958984375
						}
					},
					{
						"color": {
							"red": 35,
							"green": 45,
							"blue": 18,
							"alpha": 255
						},
						"column": 1640,
						"bounds": null,
						"row": 324,
						"value": 2305298,
						"centerPoint": {
							"x": 108.369140625,
							"y": 32.958984375
						}
					},
					{
						"color": {
							"red": 33,
							"green": 43,
							"blue": 16,
							"alpha": 255
						},
						"column": 1641,
						"bounds": null,
						"row": 324,
						"value": 2173712,
						"centerPoint": {
							"x": 108.544921875,
							"y": 32.958984375
						}
					}
				]
			],
			"rowCount": 3,
			"columnCount": 7
		},
		{
			"valuesCount": 36,
			"values": [
				[
					{
						"color": {
							"red": 50,
							"green": 64,
							"blue": 28,
							"alpha": 255
						},
						"column": 1663,
						"bounds": null,
						"row": 309,
						"value": 3293212,
						"centerPoint": {
							"x": 112.412109375,
							"y": 35.595703125
						}
					},
					{
						"color": {
							"red": 64,
							"green": 69,
							"blue": 37,
							"alpha": 255
						},
						"column": 1664,
						"bounds": null,
						"row": 309,
						"value": 4212005,
						"centerPoint": {
							"x": 112.587890625,
							"y": 35.595703125
						}
					},
					{
						"color": {
							"red": 64,
							"green": 69,
							"blue": 37,
							"alpha": 255
						},
						"column": 1665,
						"bounds": null,
						"row": 309,
						"value": 4212005,
						"centerPoint": {
							"x": 112.763671875,
							"y": 35.595703125
						}
					},
					{
						"color": {
							"red": 59,
							"green": 66,
							"blue": 33,
							"alpha": 255
						},
						"column": 1666,
						"bounds": null,
						"row": 309,
						"value": 3883553,
						"centerPoint": {
							"x": 112.939453125,
							"y": 35.595703125
						}
					},
					{
						"color": {
							"red": 48,
							"green": 55,
							"blue": 22,
							"alpha": 255
						},
						"column": 1667,
						"bounds": null,
						"row": 309,
						"value": 3159830,
						"centerPoint": {
							"x": 113.115234375,
							"y": 35.595703125
						}
					},
					{
						"color": {
							"red": 37,
							"green": 44,
							"blue": 11,
							"alpha": 255
						},
						"column": 1668,
						"bounds": null,
						"row": 309,
						"value": 2436107,
						"centerPoint": {
							"x": 113.291015625,
							"y": 35.595703125
						}
					}
				],
				[
					{
						"color": {
							"red": 55,
							"green": 67,
							"blue": 29,
							"alpha": 255
						},
						"column": 1663,
						"bounds": null,
						"row": 310,
						"value": 3621661,
						"centerPoint": {
							"x": 112.412109375,
							"y": 35.419921875
						}
					},
					{
						"color": {
							"red": 68,
							"green": 73,
							"blue": 41,
							"alpha": 255
						},
						"column": 1664,
						"bounds": null,
						"row": 310,
						"value": 4475177,
						"centerPoint": {
							"x": 112.587890625,
							"y": 35.419921875
						}
					},
					{
						"color": {
							"red": 62,
							"green": 67,
							"blue": 35,
							"alpha": 255
						},
						"column": 1665,
						"bounds": null,
						"row": 310,
						"value": 4080419,
						"centerPoint": {
							"x": 112.763671875,
							"y": 35.419921875
						}
					},
					{
						"color": {
							"red": 53,
							"green": 58,
							"blue": 26,
							"alpha": 255
						},
						"column": 1666,
						"bounds": null,
						"row": 310,
						"value": 3488282,
						"centerPoint": {
							"x": 112.939453125,
							"y": 35.419921875
						}
					},
					{
						"color": {
							"red": 46,
							"green": 51,
							"blue": 19,
							"alpha": 255
						},
						"column": 1667,
						"bounds": null,
						"row": 310,
						"value": 3027731,
						"centerPoint": {
							"x": 113.115234375,
							"y": 35.419921875
						}
					},
					{
						"color": {
							"red": 44,
							"green": 51,
							"blue": 18,
							"alpha": 255
						},
						"column": 1668,
						"bounds": null,
						"row": 310,
						"value": 2896658,
						"centerPoint": {
							"x": 113.291015625,
							"y": 35.419921875
						}
					}
				],
				[
					{
						"color": {
							"red": 39,
							"green": 51,
							"blue": 13,
							"alpha": 255
						},
						"column": 1663,
						"bounds": null,
						"row": 311,
						"value": 2568973,
						"centerPoint": {
							"x": 112.412109375,
							"y": 35.244140625
						}
					},
					{
						"color": {
							"red": 43,
							"green": 48,
							"blue": 16,
							"alpha": 255
						},
						"column": 1664,
						"bounds": null,
						"row": 311,
						"value": 2830352,
						"centerPoint": {
							"x": 112.587890625,
							"y": 35.244140625
						}
					},
					{
						"color": {
							"red": 45,
							"green": 50,
							"blue": 18,
							"alpha": 255
						},
						"column": 1665,
						"bounds": null,
						"row": 311,
						"value": 2961938,
						"centerPoint": {
							"x": 112.763671875,
							"y": 35.244140625
						}
					},
					{
						"color": {
							"red": 52,
							"green": 57,
							"blue": 25,
							"alpha": 255
						},
						"column": 1666,
						"bounds": null,
						"row": 311,
						"value": 3422489,
						"centerPoint": {
							"x": 112.939453125,
							"y": 35.244140625
						}
					},
					{
						"color": {
							"red": 64,
							"green": 69,
							"blue": 37,
							"alpha": 255
						},
						"column": 1667,
						"bounds": null,
						"row": 311,
						"value": 4212005,
						"centerPoint": {
							"x": 113.115234375,
							"y": 35.244140625
						}
					},
					{
						"color": {
							"red": 74,
							"green": 79,
							"blue": 47,
							"alpha": 255
						},
						"column": 1668,
						"bounds": null,
						"row": 311,
						"value": 4869935,
						"centerPoint": {
							"x": 113.291015625,
							"y": 35.244140625
						}
					}
				],
				[
					{
						"color": {
							"red": 43,
							"green": 55,
							"blue": 19,
							"alpha": 255
						},
						"column": 1663,
						"bounds": null,
						"row": 312,
						"value": 2832147,
						"centerPoint": {
							"x": 112.412109375,
							"y": 35.068359375
						}
					},
					{
						"color": {
							"red": 64,
							"green": 68,
							"blue": 35,
							"alpha": 255
						},
						"column": 1664,
						"bounds": null,
						"row": 312,
						"value": 4211747,
						"centerPoint": {
							"x": 112.587890625,
							"y": 35.068359375
						}
					},
					{
						"color": {
							"red": 69,
							"green": 73,
							"blue": 40,
							"alpha": 255
						},
						"column": 1665,
						"bounds": null,
						"row": 312,
						"value": 4540712,
						"centerPoint": {
							"x": 112.763671875,
							"y": 35.068359375
						}
					},
					{
						"color": {
							"red": 74,
							"green": 78,
							"blue": 45,
							"alpha": 255
						},
						"column": 1666,
						"bounds": null,
						"row": 312,
						"value": 4869677,
						"centerPoint": {
							"x": 112.939453125,
							"y": 35.068359375
						}
					},
					{
						"color": {
							"red": 75,
							"green": 81,
							"blue": 47,
							"alpha": 255
						},
						"column": 1667,
						"bounds": null,
						"row": 312,
						"value": 4935983,
						"centerPoint": {
							"x": 113.115234375,
							"y": 35.068359375
						}
					},
					{
						"color": {
							"red": 77,
							"green": 83,
							"blue": 49,
							"alpha": 255
						},
						"column": 1668,
						"bounds": null,
						"row": 312,
						"value": 5067569,
						"centerPoint": {
							"x": 113.291015625,
							"y": 35.068359375
						}
					}
				],
				[
					{
						"color": {
							"red": 59,
							"green": 71,
							"blue": 35,
							"alpha": 255
						},
						"column": 1663,
						"bounds": null,
						"row": 313,
						"value": 3884835,
						"centerPoint": {
							"x": 112.412109375,
							"y": 34.892578125
						}
					},
					{
						"color": {
							"red": 70,
							"green": 74,
							"blue": 41,
							"alpha": 255
						},
						"column": 1664,
						"bounds": null,
						"row": 313,
						"value": 4606505,
						"centerPoint": {
							"x": 112.587890625,
							"y": 34.892578125
						}
					},
					{
						"color": {
							"red": 75,
							"green": 79,
							"blue": 46,
							"alpha": 255
						},
						"column": 1665,
						"bounds": null,
						"row": 313,
						"value": 4935470,
						"centerPoint": {
							"x": 112.763671875,
							"y": 34.892578125
						}
					},
					{
						"color": {
							"red": 77,
							"green": 81,
							"blue": 48,
							"alpha": 255
						},
						"column": 1666,
						"bounds": null,
						"row": 313,
						"value": 5067056,
						"centerPoint": {
							"x": 112.939453125,
							"y": 34.892578125
						}
					},
					{
						"color": {
							"red": 75,
							"green": 79,
							"blue": 46,
							"alpha": 255
						},
						"column": 1667,
						"bounds": null,
						"row": 313,
						"value": 4935470,
						"centerPoint": {
							"x": 113.115234375,
							"y": 34.892578125
						}
					},
					{
						"color": {
							"red": 72,
							"green": 78,
							"blue": 44,
							"alpha": 255
						},
						"column": 1668,
						"bounds": null,
						"row": 313,
						"value": 4738604,
						"centerPoint": {
							"x": 113.291015625,
							"y": 34.892578125
						}
					}
				],
				[
					{
						"color": {
							"red": 74,
							"green": 84,
							"blue": 50,
							"alpha": 255
						},
						"column": 1663,
						"bounds": null,
						"row": 314,
						"value": 4871218,
						"centerPoint": {
							"x": 112.412109375,
							"y": 34.716796875
						}
					},
					{
						"color": {
							"red": 73,
							"green": 77,
							"blue": 42,
							"alpha": 255
						},
						"column": 1664,
						"bounds": null,
						"row": 314,
						"value": 4803882,
						"centerPoint": {
							"x": 112.587890625,
							"y": 34.716796875
						}
					},
					{
						"color": {
							"red": 76,
							"green": 80,
							"blue": 45,
							"alpha": 255
						},
						"column": 1665,
						"bounds": null,
						"row": 314,
						"value": 5001261,
						"centerPoint": {
							"x": 112.763671875,
							"y": 34.716796875
						}
					},
					{
						"color": {
							"red": 73,
							"green": 77,
							"blue": 42,
							"alpha": 255
						},
						"column": 1666,
						"bounds": null,
						"row": 314,
						"value": 4803882,
						"centerPoint": {
							"x": 112.939453125,
							"y": 34.716796875
						}
					},
					{
						"color": {
							"red": 65,
							"green": 69,
							"blue": 34,
							"alpha": 255
						},
						"column": 1667,
						"bounds": null,
						"row": 314,
						"value": 4277538,
						"centerPoint": {
							"x": 113.115234375,
							"y": 34.716796875
						}
					},
					{
						"color": {
							"red": 62,
							"green": 66,
							"blue": 31,
							"alpha": 255
						},
						"column": 1668,
						"bounds": null,
						"row": 314,
						"value": 4080159,
						"centerPoint": {
							"x": 113.291015625,
							"y": 34.716796875
						}
					}
				]
			],
			"rowCount": 6,
			"columnCount": 6
		}
	]
};

var imageValuesPostJson = {
	"postResultType": "CreateChild",
	"succeed": true,
	"customResult": [
		{
			"valuesCount": 10,
			"values": [
				[],
				[
					{
						"color": {
							"red": 44,
							"green": 54,
							"blue": 27,
							"alpha": 255
						},
						"column": 1637,
						"bounds": null,
						"row": 323,
						"value": 2897435,
						"centerPoint": {
							"x": 107.841796875,
							"y": 33.134765625
						}
					},
					{
						"color": {
							"red": 38,
							"green": 48,
							"blue": 21,
							"alpha": 255
						},
						"column": 1638,
						"bounds": null,
						"row": 323,
						"value": 2502677,
						"centerPoint": {
							"x": 108.017578125,
							"y": 33.134765625
						}
					},
					{
						"color": {
							"red": 35,
							"green": 45,
							"blue": 18,
							"alpha": 255
						},
						"column": 1639,
						"bounds": null,
						"row": 323,
						"value": 2305298,
						"centerPoint": {
							"x": 108.193359375,
							"y": 33.134765625
						}
					},
					{
						"color": {
							"red": 32,
							"green": 42,
							"blue": 15,
							"alpha": 255
						},
						"column": 1640,
						"bounds": null,
						"row": 323,
						"value": 2107919,
						"centerPoint": {
							"x": 108.369140625,
							"y": 33.134765625
						}
					},
					{
						"color": {
							"red": 28,
							"green": 38,
							"blue": 11,
							"alpha": 255
						},
						"column": 1641,
						"bounds": null,
						"row": 323,
						"value": 1844747,
						"centerPoint": {
							"x": 108.544921875,
							"y": 33.134765625
						}
					}
				],
				[
					{
						"color": {
							"red": 35,
							"green": 45,
							"blue": 18,
							"alpha": 255
						},
						"column": 1637,
						"bounds": null,
						"row": 324,
						"value": 2305298,
						"centerPoint": {
							"x": 107.841796875,
							"y": 32.958984375
						}
					},
					{
						"color": {
							"red": 33,
							"green": 43,
							"blue": 16,
							"alpha": 255
						},
						"column": 1638,
						"bounds": null,
						"row": 324,
						"value": 2173712,
						"centerPoint": {
							"x": 108.017578125,
							"y": 32.958984375
						}
					},
					{
						"color": {
							"red": 31,
							"green": 41,
							"blue": 14,
							"alpha": 255
						},
						"column": 1639,
						"bounds": null,
						"row": 324,
						"value": 2042126,
						"centerPoint": {
							"x": 108.193359375,
							"y": 32.958984375
						}
					},
					{
						"color": {
							"red": 35,
							"green": 45,
							"blue": 18,
							"alpha": 255
						},
						"column": 1640,
						"bounds": null,
						"row": 324,
						"value": 2305298,
						"centerPoint": {
							"x": 108.369140625,
							"y": 32.958984375
						}
					},
					{
						"color": {
							"red": 33,
							"green": 43,
							"blue": 16,
							"alpha": 255
						},
						"column": 1641,
						"bounds": null,
						"row": 324,
						"value": 2173712,
						"centerPoint": {
							"x": 108.544921875,
							"y": 32.958984375
						}
					}
				]
			],
			"rowCount": 3,
			"columnCount": 7
		},
		{
			"valuesCount": 36,
			"values": [
				[
					{
						"color": {
							"red": 50,
							"green": 64,
							"blue": 28,
							"alpha": 255
						},
						"column": 1663,
						"bounds": null,
						"row": 309,
						"value": 3293212,
						"centerPoint": {
							"x": 112.412109375,
							"y": 35.595703125
						}
					},
					{
						"color": {
							"red": 64,
							"green": 69,
							"blue": 37,
							"alpha": 255
						},
						"column": 1664,
						"bounds": null,
						"row": 309,
						"value": 4212005,
						"centerPoint": {
							"x": 112.587890625,
							"y": 35.595703125
						}
					},
					{
						"color": {
							"red": 64,
							"green": 69,
							"blue": 37,
							"alpha": 255
						},
						"column": 1665,
						"bounds": null,
						"row": 309,
						"value": 4212005,
						"centerPoint": {
							"x": 112.763671875,
							"y": 35.595703125
						}
					},
					{
						"color": {
							"red": 59,
							"green": 66,
							"blue": 33,
							"alpha": 255
						},
						"column": 1666,
						"bounds": null,
						"row": 309,
						"value": 3883553,
						"centerPoint": {
							"x": 112.939453125,
							"y": 35.595703125
						}
					},
					{
						"color": {
							"red": 48,
							"green": 55,
							"blue": 22,
							"alpha": 255
						},
						"column": 1667,
						"bounds": null,
						"row": 309,
						"value": 3159830,
						"centerPoint": {
							"x": 113.115234375,
							"y": 35.595703125
						}
					},
					{
						"color": {
							"red": 37,
							"green": 44,
							"blue": 11,
							"alpha": 255
						},
						"column": 1668,
						"bounds": null,
						"row": 309,
						"value": 2436107,
						"centerPoint": {
							"x": 113.291015625,
							"y": 35.595703125
						}
					}
				],
				[
					{
						"color": {
							"red": 55,
							"green": 67,
							"blue": 29,
							"alpha": 255
						},
						"column": 1663,
						"bounds": null,
						"row": 310,
						"value": 3621661,
						"centerPoint": {
							"x": 112.412109375,
							"y": 35.419921875
						}
					},
					{
						"color": {
							"red": 68,
							"green": 73,
							"blue": 41,
							"alpha": 255
						},
						"column": 1664,
						"bounds": null,
						"row": 310,
						"value": 4475177,
						"centerPoint": {
							"x": 112.587890625,
							"y": 35.419921875
						}
					},
					{
						"color": {
							"red": 62,
							"green": 67,
							"blue": 35,
							"alpha": 255
						},
						"column": 1665,
						"bounds": null,
						"row": 310,
						"value": 4080419,
						"centerPoint": {
							"x": 112.763671875,
							"y": 35.419921875
						}
					},
					{
						"color": {
							"red": 53,
							"green": 58,
							"blue": 26,
							"alpha": 255
						},
						"column": 1666,
						"bounds": null,
						"row": 310,
						"value": 3488282,
						"centerPoint": {
							"x": 112.939453125,
							"y": 35.419921875
						}
					},
					{
						"color": {
							"red": 46,
							"green": 51,
							"blue": 19,
							"alpha": 255
						},
						"column": 1667,
						"bounds": null,
						"row": 310,
						"value": 3027731,
						"centerPoint": {
							"x": 113.115234375,
							"y": 35.419921875
						}
					},
					{
						"color": {
							"red": 44,
							"green": 51,
							"blue": 18,
							"alpha": 255
						},
						"column": 1668,
						"bounds": null,
						"row": 310,
						"value": 2896658,
						"centerPoint": {
							"x": 113.291015625,
							"y": 35.419921875
						}
					}
				],
				[
					{
						"color": {
							"red": 39,
							"green": 51,
							"blue": 13,
							"alpha": 255
						},
						"column": 1663,
						"bounds": null,
						"row": 311,
						"value": 2568973,
						"centerPoint": {
							"x": 112.412109375,
							"y": 35.244140625
						}
					},
					{
						"color": {
							"red": 43,
							"green": 48,
							"blue": 16,
							"alpha": 255
						},
						"column": 1664,
						"bounds": null,
						"row": 311,
						"value": 2830352,
						"centerPoint": {
							"x": 112.587890625,
							"y": 35.244140625
						}
					},
					{
						"color": {
							"red": 45,
							"green": 50,
							"blue": 18,
							"alpha": 255
						},
						"column": 1665,
						"bounds": null,
						"row": 311,
						"value": 2961938,
						"centerPoint": {
							"x": 112.763671875,
							"y": 35.244140625
						}
					},
					{
						"color": {
							"red": 52,
							"green": 57,
							"blue": 25,
							"alpha": 255
						},
						"column": 1666,
						"bounds": null,
						"row": 311,
						"value": 3422489,
						"centerPoint": {
							"x": 112.939453125,
							"y": 35.244140625
						}
					},
					{
						"color": {
							"red": 64,
							"green": 69,
							"blue": 37,
							"alpha": 255
						},
						"column": 1667,
						"bounds": null,
						"row": 311,
						"value": 4212005,
						"centerPoint": {
							"x": 113.115234375,
							"y": 35.244140625
						}
					},
					{
						"color": {
							"red": 74,
							"green": 79,
							"blue": 47,
							"alpha": 255
						},
						"column": 1668,
						"bounds": null,
						"row": 311,
						"value": 4869935,
						"centerPoint": {
							"x": 113.291015625,
							"y": 35.244140625
						}
					}
				],
				[
					{
						"color": {
							"red": 43,
							"green": 55,
							"blue": 19,
							"alpha": 255
						},
						"column": 1663,
						"bounds": null,
						"row": 312,
						"value": 2832147,
						"centerPoint": {
							"x": 112.412109375,
							"y": 35.068359375
						}
					},
					{
						"color": {
							"red": 64,
							"green": 68,
							"blue": 35,
							"alpha": 255
						},
						"column": 1664,
						"bounds": null,
						"row": 312,
						"value": 4211747,
						"centerPoint": {
							"x": 112.587890625,
							"y": 35.068359375
						}
					},
					{
						"color": {
							"red": 69,
							"green": 73,
							"blue": 40,
							"alpha": 255
						},
						"column": 1665,
						"bounds": null,
						"row": 312,
						"value": 4540712,
						"centerPoint": {
							"x": 112.763671875,
							"y": 35.068359375
						}
					},
					{
						"color": {
							"red": 74,
							"green": 78,
							"blue": 45,
							"alpha": 255
						},
						"column": 1666,
						"bounds": null,
						"row": 312,
						"value": 4869677,
						"centerPoint": {
							"x": 112.939453125,
							"y": 35.068359375
						}
					},
					{
						"color": {
							"red": 75,
							"green": 81,
							"blue": 47,
							"alpha": 255
						},
						"column": 1667,
						"bounds": null,
						"row": 312,
						"value": 4935983,
						"centerPoint": {
							"x": 113.115234375,
							"y": 35.068359375
						}
					},
					{
						"color": {
							"red": 77,
							"green": 83,
							"blue": 49,
							"alpha": 255
						},
						"column": 1668,
						"bounds": null,
						"row": 312,
						"value": 5067569,
						"centerPoint": {
							"x": 113.291015625,
							"y": 35.068359375
						}
					}
				],
				[
					{
						"color": {
							"red": 59,
							"green": 71,
							"blue": 35,
							"alpha": 255
						},
						"column": 1663,
						"bounds": null,
						"row": 313,
						"value": 3884835,
						"centerPoint": {
							"x": 112.412109375,
							"y": 34.892578125
						}
					},
					{
						"color": {
							"red": 70,
							"green": 74,
							"blue": 41,
							"alpha": 255
						},
						"column": 1664,
						"bounds": null,
						"row": 313,
						"value": 4606505,
						"centerPoint": {
							"x": 112.587890625,
							"y": 34.892578125
						}
					},
					{
						"color": {
							"red": 75,
							"green": 79,
							"blue": 46,
							"alpha": 255
						},
						"column": 1665,
						"bounds": null,
						"row": 313,
						"value": 4935470,
						"centerPoint": {
							"x": 112.763671875,
							"y": 34.892578125
						}
					},
					{
						"color": {
							"red": 77,
							"green": 81,
							"blue": 48,
							"alpha": 255
						},
						"column": 1666,
						"bounds": null,
						"row": 313,
						"value": 5067056,
						"centerPoint": {
							"x": 112.939453125,
							"y": 34.892578125
						}
					},
					{
						"color": {
							"red": 75,
							"green": 79,
							"blue": 46,
							"alpha": 255
						},
						"column": 1667,
						"bounds": null,
						"row": 313,
						"value": 4935470,
						"centerPoint": {
							"x": 113.115234375,
							"y": 34.892578125
						}
					},
					{
						"color": {
							"red": 72,
							"green": 78,
							"blue": 44,
							"alpha": 255
						},
						"column": 1668,
						"bounds": null,
						"row": 313,
						"value": 4738604,
						"centerPoint": {
							"x": 113.291015625,
							"y": 34.892578125
						}
					}
				],
				[
					{
						"color": {
							"red": 74,
							"green": 84,
							"blue": 50,
							"alpha": 255
						},
						"column": 1663,
						"bounds": null,
						"row": 314,
						"value": 4871218,
						"centerPoint": {
							"x": 112.412109375,
							"y": 34.716796875
						}
					},
					{
						"color": {
							"red": 73,
							"green": 77,
							"blue": 42,
							"alpha": 255
						},
						"column": 1664,
						"bounds": null,
						"row": 314,
						"value": 4803882,
						"centerPoint": {
							"x": 112.587890625,
							"y": 34.716796875
						}
					},
					{
						"color": {
							"red": 76,
							"green": 80,
							"blue": 45,
							"alpha": 255
						},
						"column": 1665,
						"bounds": null,
						"row": 314,
						"value": 5001261,
						"centerPoint": {
							"x": 112.763671875,
							"y": 34.716796875
						}
					},
					{
						"color": {
							"red": 73,
							"green": 77,
							"blue": 42,
							"alpha": 255
						},
						"column": 1666,
						"bounds": null,
						"row": 314,
						"value": 4803882,
						"centerPoint": {
							"x": 112.939453125,
							"y": 34.716796875
						}
					},
					{
						"color": {
							"red": 65,
							"green": 69,
							"blue": 34,
							"alpha": 255
						},
						"column": 1667,
						"bounds": null,
						"row": 314,
						"value": 4277538,
						"centerPoint": {
							"x": 113.115234375,
							"y": 34.716796875
						}
					},
					{
						"color": {
							"red": 62,
							"green": 66,
							"blue": 31,
							"alpha": 255
						},
						"column": 1668,
						"bounds": null,
						"row": 314,
						"value": 4080159,
						"centerPoint": {
							"x": 113.291015625,
							"y": 34.716796875
						}
					}
				]
			],
			"rowCount": 6,
			"columnCount": 6
		}
	]
};