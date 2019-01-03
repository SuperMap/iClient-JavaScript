//以下这三个结果可以用getFeaturesResultJson公用
var getFeaturesByGeometry = {
    "features": [
        {
            "fieldNames": [
                "SMID",
                "CAPITAL"
            ],
            "geometry": {
                "center": {
                    "x": 11.7281635088093,
                    "y": -0.803689479827881
                },
                "parts": [
                    4,
                    4
                ],
                "style": null,
                "prjCoordSys": null,
                "id": 127,
                "type": "REGION",
                "partTopo": [
                    1,
                    1
                ],
                "points": [
                    {
                        "x": 13.0015068054199,
                        "y": -2.36767196655273
                    },
                    {
                        "x": 13.0124988555908,
                        "y": -2.31555557250977
                    },
                    {
                        "x": 13.0166664123535,
                        "y": -2.27027797698975
                    },
                    {
                        "x": 13.0015068054199,
                        "y": -2.36767196655273
                    },
                    {
                        "x": 13.0015068054199,
                        "y": -2.36767196655273
                    },
                    {
                        "x": 13.0124988555908,
                        "y": -2.31555557250977
                    },
                    {
                        "x": 13.0166664123535,
                        "y": -2.27027797698975
                    },
                    {
                        "x": 13.0015068054199,
                        "y": -2.36767196655273
                    }

                ]

            },
            "fieldValues": [
                "127",
                "利伯维尔"
            ],
            "ID": 127
        },

    ],
    "featureUriList": [],
    "totalCount": 1,
    "featureCount": 1
};
var getFeaturesByIDs = {
    "features": [
        {
            "fieldNames": [
                "SMID",
                "SMX",
                "SMY",
                "SMLIBTILEID",
                "SMUSERID",
                "SMGEOMETRYSIZE",
                "USERID",
                "POP",
                "CAPITAL_LO",
                "CAPITAL_CH",
                "COUNTRY_CH",
                "CAPITAL_EN",
                "COUNTRY_EN",
                "COUNTRY",
                "CAP_POP",
                "CAPITAL"
            ],
            "geometry": {
                "center": {
                    "x": -47.8977476573595,
                    "y": -15.7921109430589
                },
                "parts": [
                    1
                ],
                "style": null,
                "prjCoordSys": null,
                "id": 1,
                "type": "POINT",
                "partTopo": null,
                "points": [
                    {
                        "x": -47.8977476573595,
                        "y": -15.7921109430589
                    }
                ]
            },
            "fieldValues": [
                "1",
                "-47.8977476573595",
                "-15.792110943058866",
                "1",
                "0",
                "16",
                "0",
                "2207718.0",
                "Brasília",
                "巴西利亚",
                "巴西",
                "Brasilia",
                "Brazil",
                "巴西",
                "2207718.0",
                "巴西利亚"
            ],
            "ID": 1
        }
    ],
    "featureUriList": [],
    "totalCount": 1,
    "featureCount": 1
};
var getFeaturesBySQL = {
    "features": [
        {
            "fieldNames": [
                "SMID",
                "CAPITAL",
                "COUNTRY",
                "POP_1994"
            ],
            "geometry": {
                "center": {
                    "x": 98.630809328316,
                    "y": 36.8936729431152
                },
                "parts": [
                    4,
                    4,

                ],
                "style": null,
                "prjCoordSys": null,
                "id": 247,
                "type": "REGION",
                "partTopo": [
                    1,
                    1,

                ],
                "points": [
                    {
                        "x": 123.283050537109,
                        "y": 53.5536041259766
                    },
                    {
                        "x": 123.314422607422,
                        "y": 53.5494384765625
                    },
                    {
                        "x": 110.665542602539,
                        "y": 20.1336059570313
                    },
                    {
                        "x": 110.701652526855,
                        "y": 20.0912475585938
                    },
                    {
                        "x": 123.283050537109,
                        "y": 53.5536041259766
                    },
                    {
                        "x": 123.314422607422,
                        "y": 53.5494384765625
                    },
                    {
                        "x": 110.665542602539,
                        "y": 20.1336059570313
                    },
                    {
                        "x": 110.701652526855,
                        "y": 20.0912475585938
                    }
                ]
            },
            "fieldValues": [
                "247",
                "北京",
                "中华人民共和国",
                "1.128139689E9"
            ],
            "ID": 247
        }
    ],
    "featureUriList": [],
    "totalCount": 1,
    "featureCount": 1
};
var getFeaturesBySQLService = {
    "result": {
        "featureCount": 1,
        "featureUriList": [],
        "totalCount": 1,
        "features": {
            "type": "FeatureCollection",
            "features": [{
                "geometry": {
                    "type": "Point",
                    "coordinates": [117.399930020897631, 40.0590434404585]
                },
                "id": 1,
                "properties": {
                    "SMID": "1",
                    "SMX": "117.39993002089763",
                    "SMY": "40.0590434404585", 
                    "SMLIBTILEID": "1", 
                    "SMUSERID": "21"
                },
                "type": "Feature"
            }]
        }
    }
}
var QueryBySQLService = {
    "result": {
        "currentCount": 1,
        "totalCount": 1,
        "recordsets": [{
            "datasetName": "Rivers@World",
            "fields": ["NAME","KILOMETERS"],
            "fieldCaptions": ["NAME","KILOMETERS"],
            "fieldTypes": ["TEXT","DOUBEL"],
            "features": {
                "type": "FeatureCollection",
                "features": [{
                    "geometry": {
                        "type": "Point",
                        "coordinates": [117.399930020897631, 40.0590434404585]
                    },
                    "id": 1,
                    "properties": {
                        "NAME": "21",
                        "KILOMETERS": "21.2"
                    },
                    "type": "Feature"
                }]
            }
        }]
    }
}

var getFeaturesResultJson = {
    "features": [
        {
            "fieldNames": [
                "SMID",
                "CAPITAL"
            ],
            "geometry": {
                "center": {
                    "x": 11.7281635088093,
                    "y": -0.803689479827881
                },
                "parts": [
                    4,
                    4
                ],
                "style": null,
                "prjCoordSys": null,
                "id": 127,
                "type": "REGION",
                "partTopo": [
                    1,
                    1
                ],
                "points": [
                    {
                        "x": 13.0015068054199,
                        "y": -2.36767196655273
                    },
                    {
                        "x": 13.0124988555908,
                        "y": -2.31555557250977
                    },
                    {
                        "x": 13.0166664123535,
                        "y": -2.27027797698975
                    },
                    {
                        "x": 13.0015068054199,
                        "y": -2.36767196655273
                    },
                    {
                        "x": 13.0015068054199,
                        "y": -2.36767196655273
                    },
                    {
                        "x": 13.0124988555908,
                        "y": -2.31555557250977
                    },
                    {
                        "x": 13.0166664123535,
                        "y": -2.27027797698975
                    },
                    {
                        "x": 13.0015068054199,
                        "y": -2.36767196655273
                    }

                ]

            },
            "fieldValues": [
                "127",
                "利伯维尔"
            ],
            "ID": 127
        },

    ],
    "featureUriList": [],
    "totalCount": 1,
    "featureCount": 1
};
