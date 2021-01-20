var edgesFeatures = [
    {
        "fieldNames": [
            "SMID",
            "SMSDRIW"
        ],
        "geometry": {
            "center": {
                "x": 5513.72693291757,
                "y": -2520.75513175674
            },
            "parts": [
                2
            ],
            "style": null,
            "prjCoordSys": null,
            "id": 4786,
            "type": "LINE",
            "partTopo": null,
            "points": [
                {
                    "x": 5513.32107984688,
                    "y": -2472.66779133907
                },
                {
                    "x": 5514.13278598825,
                    "y": -2568.84247217441
                }
            ]
        },
        "fieldValues": [
            "4786",
            "5513.3213"
        ],
        "ID": 4786
    },
    {
        "fieldNames": [
            "SMID",
            "SMSDRIW"
        ],
        "geometry": {
            "center": {
                "x": 5405.44385681485,
                "y": -2568.53777753916
            },
            "parts": [
                2
            ],
            "style": null,
            "prjCoordSys": null,
            "id": 3030,
            "type": "LINE",
            "partTopo": null,
            "points": [
                {
                    "x": 5296.75492764145,
                    "y": -2568.23308290391
                },
                {
                    "x": 5514.13278598825,
                    "y": -2568.84247217441
                }
            ]
        },
        "fieldValues": [
            "3030",
            "5296.755"
        ],
        "ID": 3030
    }
];
var nodeFeatures = [
    {
        "fieldNames": [
            "SMID",
            "SMX"
        ],
        "geometry": {
            "center": {
                "x": 5514.132785988252,
                "y": -2568.842472174406
            },
            "parts": [
                1
            ],
            "style": null,
            "prjCoordSys": null,
            "id": 1575,
            "type": "POINT",
            "partTopo": null,
            "points": [
                {
                    "x": 5514.132785988252,
                    "y": -2568.842472174406
                }
            ]
        },
        "fieldValues": [
            "1575",
            "5514.132785988252"
        ],
        "ID": 1575
    },
    {
        "fieldNames": [
            "SMID",
            "SMX"
        ],
        "geometry": {
            "center": {
                "x": 5296.75492764145,
                "y": -2568.23308290391
            },
            "parts": [
                1
            ],
            "style": null,
            "prjCoordSys": null,
            "id": 1574,
            "type": "POINT",
            "partTopo": null,
            "points": [
                {
                    "x": 5296.75492764145,
                    "y": -2568.23308290391
                }
            ]
        },
        "fieldValues": [
            "1574",
            "5296.75492764145"
        ],
        "ID": 1574
    }
];
// 爆管分析服务
var burstPipelineAnalyst = {
    "normalNodesFeatures": [],
    "normalNodes": [],
    "edges": [
        8,
        9,
    ],
    "criticalNodes": [],
    "criticalNodesFeatures": [],
    "edgesFeatures": edgesFeatures
};

// 最近设施分析服务  isAnalyzeById 为 true
var findClosetFacilitiesResultJson_True = {
    "facilityPathList": [
        {
            "pathGuideItems": [
                {
                    "sideType": "MIDDLE",
                    "description": "从此处出发",
                    "index": 1,
                    "weight": 0,
                    "directionType": "NONE",
                    "bounds": {
                        "top": -54.7406354454158,
                        "left": 70.1515638200593,
                        "bottom": -54.7406354454158,
                        "leftBottom": {
                            "x": 70.1515638200593,
                            "y": -54.7406354454158
                        },
                        "right": 70.1515638200593,
                        "rightTop": {
                            "x": 70.1515638200593,
                            "y": -54.7406354454158
                        }
                    },
                    "name": "1",
                    "turnAngle": 0,
                    "geometry": {
                        "center": {
                            "x": 70.1515638200593,
                            "y": -54.7406354454158
                        },
                        "parts": [
                            1
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "POINT",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 70.1515638200593,
                                "y": -54.7406354454158
                            }
                        ]
                    },
                    "id": 1
                }
            ],
            "nodeIDs": [],
            "route": null,
            "edgeFeatures": null,
            "weight": 125,
            "nodeFeatures": null,
            "facilityIndex": 0,
            "stopWeights": [
                125
            ],
            "facility": 1,
            "edgeIDs": []
        },
        {
            "pathGuideItems": [
                {
                    "sideType": "MIDDLE",
                    "description": "从此处出发",
                    "index": 1,
                    "weight": 0,
                    "directionType": "NONE",
                    "bounds": {
                        "top": -56.1050211382508,
                        "left": 550.677059532,
                        "bottom": -56.1050211382508,
                        "leftBottom": {
                            "x": 550.677059532,
                            "y": -56.1050211382508
                        },
                        "right": 550.677059532,
                        "rightTop": {
                            "x": 550.677059532,
                            "y": -56.1050211382508
                        }
                    },
                    "name": "6",
                    "turnAngle": 0,
                    "geometry": {
                        "center": {
                            "x": 550.677059532,
                            "y": -56.1050211382508
                        },
                        "parts": [
                            1
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "POINT",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 550.677059532,
                                "y": -56.1050211382508
                            }
                        ]
                    },
                    "id": 1
                }
            ],
            "nodeIDs": [],
            "route": null,
            "edgeFeatures": null,
            "weight": 454,
            "nodeFeatures": null,
            "facilityIndex": 1,
            "stopWeights": [
                454
            ],
            "facility": 1,
            "edgeIDs": []
        }
    ]
};

// 最近设施分析服务  isAnalyzeById 为 false
var findClosetFacilitiesResultJson_False = {
    "facilityPathList": [
        {
            "pathGuideItems": [
                {
                    "sideType": "RIGHT",
                    "distance": 13.5512787326919,
                    "isStop": true,
                    "isEdge": false,
                    "length": 0,
                    "turnType": "AHEAD",
                    "description": "从此处出发",
                    "index": 1,
                    "weight": 0,
                    "directionType": "NONE",
                    "bounds": {
                        "top": -2500,
                        "left": 5500,
                        "bottom": -2500,
                        "leftBottom": {
                            "x": 5500,
                            "y": -2500
                        },
                        "right": 5500,
                        "rightTop": {
                            "x": 5500,
                            "y": -2500
                        }
                    },
                    "name": "1461",
                    "turnAngle": 0,
                    "geometry": {
                        "center": {
                            "x": 5500,
                            "y": -2500
                        },
                        "parts": [
                            1
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "POINT",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 5500,
                                "y": -2500
                            }
                        ]
                    },
                    "id": -1
                },
                {
                    "sideType": "NONE",
                    "distance": 0,
                    "isStop": false,
                    "isEdge": true,
                    "length": 13.5512787326928,
                    "turnType": "NONE",
                    "description": "向东到达北二条街",
                    "index": -1,
                    "weight": 0,
                    "directionType": "EAST",
                    "bounds": {
                        "top": -2499.8856324312,
                        "left": 5500,
                        "bottom": -2500,
                        "leftBottom": {
                            "x": 5500,
                            "y": -2500
                        },
                        "right": 5513.550796115,
                        "rightTop": {
                            "x": 5513.550796115,
                            "y": -2499.8856324312
                        }
                    },
                    "name": "",
                    "turnAngle": -1,
                    "geometry": {
                        "center": {
                            "x": 5506.7753980575,
                            "y": -2499.9428162156
                        },
                        "parts": [
                            2
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "LINE",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 5500,
                                "y": -2500
                            },
                            {
                                "x": 5513.550796115,
                                "y": -2499.8856324312
                            }
                        ]
                    },
                    "id": -1
                },
                {
                    "sideType": "NONE",
                    "distance": 0,
                    "isStop": false,
                    "isEdge": false,
                    "length": 0,
                    "turnType": "RIGHT",
                    "description": "右转",
                    "index": -1,
                    "weight": 0,
                    "directionType": "NONE",
                    "bounds": {
                        "top": -2499.8856324312,
                        "left": 5513.550796115,
                        "bottom": -2499.8856324312,
                        "leftBottom": {
                            "x": 5513.550796115,
                            "y": -2499.8856324312
                        },
                        "right": 5513.550796115,
                        "rightTop": {
                            "x": 5513.550796115,
                            "y": -2499.8856324312
                        }
                    },
                    "name": "",
                    "turnAngle": 90.000000000001,
                    "geometry": {
                        "center": {
                            "x": 5513.550796115,
                            "y": -2499.8856324312
                        },
                        "parts": [
                            1
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "POINT",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 5513.550796115,
                                "y": -2499.8856324312
                            }
                        ]
                    },
                    "id": -1
                }
            ],
            "nodeIDs": [
                1575,
                1574
            ],
            "route": {
                "line": {
                    "center": {
                        "x": 5077.8264295191,
                        "y": -3031.19518905498
                    },
                    "parts": [
                        4
                    ],
                    "style": null,
                    "prjCoordSys": null,
                    "id": 0,
                    "type": "LINE",
                    "partTopo": null,
                    "points": [
                        {
                            "x": 5513.550796115,
                            "y": -2499.8856324312
                        },
                        {
                            "x": 5514.13278598825,
                            "y": -2568.84247217441
                        },
                        {
                            "x": 5296.75492764145,
                            "y": -2568.23308290391
                        },
                        {
                            "x": 5000.81533173035,
                            "y": -3700.42580177457
                        }
                    ]
                },
                "center": null,
                "length": 1861.82465437195,
                "minM": 0,
                "type": "LINEM",
                "points": [
                    {
                        "measure": 0,
                        "x": 5513.550796115,
                        "y": -2499.8856324312
                    },
                    {
                        "measure": 68.9809565706207,
                        "x": 5514.13278598825,
                        "y": -2568.84247217441
                    },
                    {
                        "measure": 1838.76161000942,
                        "x": 5011.75890347206,
                        "y": -3679.47088374137
                    },
                    {
                        "measure": 1862.40947465816,
                        "x": 5000.81533173035,
                        "y": -3700.42580177457
                    }
                ],
                "parts": [
                    4
                ],
                "maxM": 1862.40947465816,
                "style": null,
                "prjCoordSys": null,
                "id": 0,
                "region": {
                    "center": {
                        "x": 5143.42250911631,
                        "y": -3100.15571710288
                    },
                    "parts": [
                        69
                    ],
                    "style": null,
                    "prjCoordSys": null,
                    "id": 0,
                    "type": "REGION",
                    "partTopo": [
                        1
                    ],
                    "points": [
                        {
                            "x": 5513.550796115,
                            "y": -2499.8856324312
                        },
                        {
                            "x": 5514.13278598825,
                            "y": -2568.84247217441
                        },
                        {
                            "x": 5000.81533173035,
                            "y": -3700.42580177457
                        },
                        {
                            "x": 5513.550796115,
                            "y": -2499.8856324312
                        }
                    ]
                },
                "partTopo": null
            },
            "edgeFeatures": edgesFeatures,
            "weight": 1862.4094746581616,
            "nodeFeatures": nodeFeatures,
            "facilityIndex": 1,
            "stopWeights": [
                1862.4094746581616
            ],
            "facility": {
                "x": 5500,
                "y": -2500
            },
            "edgeIDs": [
                4786,
                3030
            ]
        }
    ]
};

// 选址分区分析服务
var findLocationResultJson = {
    "demandResults": [
        {
            "demandID": 124,
            "isEdge": false,
            "fieldNames": [
                "SMID",
                "DEMAND"
            ],
            "actualResourceValue": 161,
            "supplyCenter": {
                "maxWeight": 500,
                "type": "OPTIONALCENTER",
                "nodeID": 139,
                "resourceValue": 100
            },
            "geometry": {
                "center": {
                    "x": 1726.20945737387,
                    "y": -540.340099183014
                },
                "parts": [
                    1
                ],
                "style": null,
                "prjCoordSys": null,
                "id": 124,
                "type": "POINT",
                "partTopo": null,
                "points": [
                    {
                        "x": 1726.20945737387,
                        "y": -540.340099183014
                    }
                ]
            },
            "fieldValues": [
                "124",
                "30"
            ],
            "ID": 124
        },
        {
            "demandID": 138,
            "isEdge": false,
            "fieldNames": [
                "SMID",
                "DEMAND"
            ],
            "actualResourceValue": 30,
            "supplyCenter": {
                "maxWeight": 500,
                "type": "OPTIONALCENTER",
                "nodeID": 139,
                "resourceValue": 100
            },
            "geometry": {
                "center": {
                    "x": 1685.89234235365,
                    "y": -622.184394756777
                },
                "parts": [
                    1
                ],
                "style": null,
                "prjCoordSys": null,
                "id": 138,
                "type": "POINT",
                "partTopo": null,
                "points": [
                    {
                        "x": 1685.89234235365,
                        "y": -622.184394756777
                    }
                ]
            },
            "fieldValues": [
                "138",
                "30"
            ],
            "ID": 13,}
    ],
    "actualResourceValue": 342,
    "supplyCenter": {
    "maxWeight": 500,
        "type": "OPTIONALCENTER",
        "nodeID": 5523,
        "resourceValue": 100
    },
    "geometry": {
        "center": {
            "x": 1689.1679563731,
                "y": -5921.20434963418
        },
        "parts": [
            1
        ],
        "style": null,
        "prjCoordSys": null,
        "id": 5829,
        "type": "POINT",
        "partTopo": null,
        "points": [
        {
            "x": 1689.1679563731,
            "y": -5921.20434963418
        }
        ]
    },
    "fieldValues": [
        "5829",
        "1689.167956373102",
        "-5921.204349634179",
        "1",
        "5829",
        "0",
        "16",
        "30"
    ],
        "ID": 5829,
    "supplyResults": [
        {
            "fieldNames": [
                "SMID",
                "DEMAND"
            ],
            "actualResourceValue": 0,
            "geometry": {
                "center": {
                    "x": 1675.92567913772,
                    "y": -593.568225124952
                },
                "parts": [
                    1
                ],
                "style": null,
                "prjCoordSys": null,
                "id": 139,
                "type": "POINT",
                "partTopo": null,
                "points": [
                    {
                        "x": 1675.92567913772,
                        "y": -593.568225124952
                    }
                ]
            },
            "totalWeights": 477,
            "maxWeight": 500,
            "fieldValues": [
                "139",
                "30"
            ],
            "ID": 139,
            "averageWeight": 79.5,
            "type": "OPTIONALCENTER",
            "nodeID": 139,
            "demandCount": 6,
            "resourceValue": 0
        },
        {
            "fieldNames": [
                "SMID",
                "DEMAND"
            ],
            "actualResourceValue": 0,
            "geometry": {
                "center": {
                    "x": 2820.35101097629,
                    "y": -2358.04146639852
                },
                "parts": [
                    1
                ],
                "style": null,
                "prjCoordSys": null,
                "id": 1358,
                "type": "POINT",
                "partTopo": null,
                "points": [
                    {
                        "x": 2820.35101097629,
                        "y": -2358.04146639852
                    }
                ]
            },
            "totalWeights": 14194,
            "maxWeight": 500,
            "fieldValues": [
                "1358",
                "30"
            ],
            "ID": 1358,
            "averageWeight": 289.673469387755,
            "type": "OPTIONALCENTER",
            "nodeID": 1358,
            "demandCount": 49,
            "resourceValue": 0
        },
    ]
};

// 最佳路径分析服务
var findPathResultJson = {
    "pathList": [
        {
            "pathGuideItems": [
                {
                    "sideType": "MIDDLE",
                    "distance": 3.8413559018514,
                    "isStop": true,
                    "isEdge": false,
                    "length": 0,
                    "turnType": "AHEAD",
                    "description": "从此处出发",
                    "index": 1,
                    "weight": 0,
                    "directionType": "NONE",
                    "bounds": {
                        "top": -3000,
                        "left": 4000,
                        "bottom": -3000,
                        "leftBottom": {
                            "x": 4000,
                            "y": -3000
                        },
                        "right": 4000,
                        "rightTop": {
                            "x": 4000,
                            "y": -3000
                        }
                    },
                    "name": "1914",
                    "turnAngle": 0,
                    "geometry": {
                        "center": {
                            "x": 4000,
                            "y": -3000
                        },
                        "parts": [
                            1
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "POINT",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 4000,
                                "y": -3000
                            }
                        ]
                    },
                    "id": -1
                },
                {
                    "sideType": "NONE",
                    "distance": 0,
                    "isStop": false,
                    "isEdge": true,
                    "length": 3.8413559018514,
                    "turnType": "NONE",
                    "description": "向南",
                    "index": -1,
                    "weight": 0,
                    "directionType": "SOURTH",
                    "bounds": {
                        "top": -3000,
                        "left": 3998.27415833277,
                        "bottom": -3003.43183416038,
                        "leftBottom": {
                            "x": 3998.27415833277,
                            "y": -3003.43183416038
                        },
                        "right": 4000,
                        "rightTop": {
                            "x": 4000,
                            "y": -3000
                        }
                    },
                    "name": "",
                    "turnAngle": -1,
                    "geometry": {
                        "center": {
                            "x": 3999.13707916639,
                            "y": -3001.71591708019
                        },
                        "parts": [
                            2
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "LINE",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 4000,
                                "y": -3000
                            },
                            {
                                "x": 3998.27415833277,
                                "y": -3003.43183416038
                            }
                        ]
                    },
                    "id": -1
                }
            ],
            "nodeIDs": [
                2014,
                1918
            ],
            "route": {
                "line": {
                    "center": {
                        "x": 6041.85475923857,
                        "y": -3259.44302281268
                    },
                    "parts": [
                        210
                    ],
                    "style": null,
                    "prjCoordSys": null,
                    "id": 0,
                    "type": "LINE",
                    "partTopo": null,
                    "points": [
                        {
                            "x": 3998.27415833277,
                            "y": -3003.43183416038
                        },
                        {
                            "x": 4088.42828811741,
                            "y": -3048.76961750996
                        },
                        {
                            "x": 6905.13322092563,
                            "y": -3956.15999497387
                        },
                        {
                            "x": 6904.93337395925,
                            "y": -4000.0224775198
                        }
                    ]
                },
                "center": null,
                "length": 4672.58311681737,
                "minM": 0,
                "type": "LINEM",
                "points": [
                    {
                        "measure": 0,
                        "x": 3998.27415833277,
                        "y": -3003.43183416038
                    },
                    {
                        "measure": 100.892281977071,
                        "x": 4088.42828811741,
                        "y": -3048.76961750996
                    },
                    {
                        "measure": 4224.04769805217,
                        "x": 6724.78540539065,
                        "y": -3715.61403629033
                    },
                    {
                        "measure": 4671.65863987231,
                        "x": 6904.93337395925,
                        "y": -4000.0224775198
                    }
                ],
                "parts": [
                    4
                ],
                "maxM": 4671.65863987231,
                "style": null,
                "prjCoordSys": null,
                "id": 0,
                "region": {
                    "center": {
                        "x": 5309.81134536557,
                        "y": -3228.51351150182
                    },
                    "parts": [
                        4
                    ],
                    "style": null,
                    "prjCoordSys": null,
                    "id": 0,
                    "type": "REGION",
                    "partTopo": [
                        1
                    ],
                    "points": [
                        {
                            "x": 3998.27415833277,
                            "y": -3003.43183416038
                        },
                        {
                            "x": 4088.42828811741,
                            "y": -3048.76961750996
                        },
                        {
                            "x": 4091.76265755524,
                            "y": -3012.44253995044
                        },
                        {
                            "x": 3998.27415833277,
                            "y": -3003.43183416038
                        }
                    ]
                },
                "partTopo": null
            },
            "edgeFeatures": edgesFeatures,
            "stopWeights": [
                2121.0230000152,
                2550.63563985711
            ],
            "weight": 4671.658639872307,
            "nodeFeatures": nodeFeatures,
            "edgeIDs": [
                9097,
                3312
            ]
        }
    ]
};

//旅行商分析服务
var findTSPPathsResultJson = {
    "tspPathList": [
        {
            "pathGuideItems": [
                {
                    "sideType": "RIGHT",
                    "bounds": {
                        "top": -1000,
                        "left": 3000,
                        "bottom": -1000,
                        "leftBottom": {
                            "x": 3000,
                            "y": -1000
                        },
                        "right": 3000,
                        "rightTop": {
                            "x": 3000,
                            "y": -1000
                        }
                    },
                    "name": "168",
                    "turnAngle": 0,
                    "geometry": {
                        "center": {
                            "x": 3000,
                            "y": -1000
                        },
                        "parts": [
                            1
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "POINT",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 3000,
                                "y": -1000
                            }
                        ]
                    },
                    "id": -1
                },
                {
                    "sideType": "NONE",
                    "bounds": {
                        "top": -979.874540243057,
                        "left": 3000,
                        "bottom": -1000,
                        "leftBottom": {
                            "x": 3000,
                            "y": -1000
                        },
                        "right": 3032.66669453159,
                        "rightTop": {
                            "x": 3032.66669453159,
                            "y": -979.874540243057
                        }
                    },
                    "name": "",
                    "turnAngle": -1,
                    "geometry": {
                        "center": {
                            "x": 3016.33334726579,
                            "y": -989.937270121529
                        },
                        "parts": [
                            2
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "LINE",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 3000,
                                "y": -1000
                            },
                            {
                                "x": 3032.66669453159,
                                "y": -979.874540243057
                            }
                        ]
                    },
                    "id": -1
                }
            ],
            "nodeIDs": [
                298,
                299
            ],
            "route": {
                "line": {
                    "center": {
                        "x": 6041.85475923857,
                        "y": -3259.44302281268
                    },
                    "parts": [
                        210
                    ],
                    "style": null,
                    "prjCoordSys": null,
                    "id": 0,
                    "type": "LINE",
                    "partTopo": null,
                    "points": [
                        {
                            "x": 3998.27415833277,
                            "y": -3003.43183416038
                        },
                        {
                            "x": 4088.42828811741,
                            "y": -3048.76961750996
                        },
                        {
                            "x": 6905.13322092563,
                            "y": -3956.15999497387
                        },
                        {
                            "x": 6904.93337395925,
                            "y": -4000.0224775198
                        }
                    ]
                },
                "center": null,
                "length": 4672.58311681737,
                "minM": 0,
                "type": "LINEM",
                "points": [
                    {
                        "measure": 0,
                        "x": 3998.27415833277,
                        "y": -3003.43183416038
                    },
                    {
                        "measure": 100.892281977071,
                        "x": 4088.42828811741,
                        "y": -3048.76961750996
                    },
                    {
                        "measure": 4224.04769805217,
                        "x": 6724.78540539065,
                        "y": -3715.61403629033
                    },
                    {
                        "measure": 4671.65863987231,
                        "x": 6904.93337395925,
                        "y": -4000.0224775198
                    }
                ],
                "parts": [
                    4
                ],
                "maxM": 4671.65863987231,
                "style": null,
                "prjCoordSys": null,
                "id": 0,
                "region": {
                    "center": {
                        "x": 5309.81134536557,
                        "y": -3228.51351150182
                    },
                    "parts": [
                        4
                    ],
                    "style": null,
                    "prjCoordSys": null,
                    "id": 0,
                    "type": "REGION",
                    "partTopo": [
                        1
                    ],
                    "points": [
                        {
                            "x": 3998.27415833277,
                            "y": -3003.43183416038
                        },
                        {
                            "x": 4088.42828811741,
                            "y": -3048.76961750996
                        },
                        {
                            "x": 4091.76265755524,
                            "y": -3012.44253995044
                        },
                        {
                            "x": 3998.27415833277,
                            "y": -3003.43183416038
                        }
                    ]
                },
                "partTopo": null
            },
            "edgeFeatures": [
                {
                    "fieldNames": [
                        "SMID",
                        "SMSDRIW"
                    ],
                    "geometry": {
                        "center": {
                            "x": 2926.58069208494,
                            "y": -809.388819213116
                        },
                        "parts": [
                            4
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 6569,
                        "type": "LINE",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 2841.14521446107,
                                "y": -691.158397632607
                            },
                            {
                                "x": 2842.96652872907,
                                "y": -692.005250763586
                            },
                            {
                                "x": 3051.94611992024,
                                "y": -1011.16799179754
                            },
                            {
                                "x": 3064.91090880183,
                                "y": -1029.57895593423
                            }
                        ]
                    },
                    "fieldValues": [
                        "6569",
                        "2841.1453"
                    ],
                    "ID": 6569
                },
                {
                    "fieldNames": [
                        "SMID",
                        "SMSDRIW"
                    ],
                    "geometry": {
                        "center": {
                            "x": 3103.40957693901,
                            "y": -1069.83186742306
                        },
                        "parts": [
                            2
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 6570,
                        "type": "LINE",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 3064.91090880183,
                                "y": -1029.57895593423
                            },
                            {
                                "x": 3066.96094631725,
                                "y": -1032.49016162527
                            }
                        ]
                    },
                    "fieldValues": [
                        "6570",
                        "3064.911"
                    ],
                    "ID": 6570
                }
            ],
            "weight": 10287.3244553115,
            "nodeFeatures": nodeFeatures,
            "stopWeights": [
                4786.37705199338,
                5500.94740331817
            ],
            "stopIndexes": [
                0,
                1,
                2
            ],
            "edgeIDs": [
                6569,
                6570
            ]
        }
    ]
};

// 多旅行商分析服务
var findMTSPPathsResultJson = {
    "pathList": [
        {
            "pathGuideItems": [
                {
                    "sideType": "RIGHT",
                    "bounds": {
                        "top": -5500,
                        "left": 6000,
                        "bottom": -5500,
                        "leftBottom": {
                            "x": 6000,
                            "y": -5500
                        },
                        "right": 6000,
                        "rightTop": {
                            "x": 6000,
                            "y": -5500
                        }
                    },
                    "name": "5435",
                    "turnAngle": 0,
                    "geometry": {
                        "center": {
                            "x": 6000,
                            "y": -5500
                        },
                        "parts": [
                            1
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "POINT",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 6000,
                                "y": -5500
                            }
                        ]
                    },
                    "id": -1
                },
                {
                    "sideType": "NONE",
                    "bounds": {
                        "top": -5500,
                        "left": 6000,
                        "bottom": -5509.6323587733,
                        "leftBottom": {
                            "x": 6000,
                            "y": -5509.6323587733
                        },
                        "right": 6005.69370359693,
                        "rightTop": {
                            "x": 6005.69370359693,
                            "y": -5500
                        }
                    },
                    "name": "",
                    "turnAngle": -1,
                    "geometry": {
                        "center": {
                            "x": 6002.84685179846,
                            "y": -5504.81617938665
                        },
                        "parts": [
                            2
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "LINE",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 6000,
                                "y": -5500
                            },
                            {
                                "x": 6005.69370359693,
                                "y": -5509.6323587733
                            }
                        ]
                    },
                    "id": -1
                }
            ],
            "nodeIDs": [
                5489,
                5488
            ],
            "route": {
                "line": {
                    "center": {
                        "x": 4999.9436548642,
                        "y": -4987.89667906531
                    },
                    "parts": [
                        4
                    ],
                    "style": null,
                    "prjCoordSys": null,
                    "id": 0,
                    "type": "LINE",
                    "partTopo": null,
                    "points": [
                        {
                            "x": 6005.69370359693,
                            "y": -5509.6323587733
                        },
                        {
                            "x": 5975.18119388636,
                            "y": -5527.66835497933
                        },
                        {
                            "x": 5975.18119388636,
                            "y": -5527.66835497933
                        },
                        {
                            "x": 6005.69370359693,
                            "y": -5509.6323587733
                        }
                    ]
                },
                "center": null,
                "length": 3100.59012737949,
                "minM": 0,
                "type": "LINEM",
                "points": [
                    {
                        "measure": 0,
                        "x": 6005.69370359693,
                        "y": -5509.6323587733
                    },
                    {
                        "measure": 35.4352168882221,
                        "x": 5975.18119388636,
                        "y": -5527.66835497933
                    },
                    {
                        "measure": 3064.34552857382,
                        "x": 5975.18119388636,
                        "y": -5527.66835497933
                    },
                    {
                        "measure": 3099.78074546204,
                        "x": 6005.69370359693,
                        "y": -5509.6323587733
                    }
                ],
                "parts": [
                    4
                ],
                "maxM": 3099.78074546204,
                "style": null,
                "prjCoordSys": null,
                "id": 0,
                "region": {
                    "center": {
                        "x": 5311.27108595036,
                        "y": -5257.65876791304
                    },
                    "parts": [
                        4
                    ],
                    "style": null,
                    "prjCoordSys": null,
                    "id": 0,
                    "type": "REGION",
                    "partTopo": [
                        1
                    ],
                    "points": [
                        {
                            "x": 6005.69370359693,
                            "y": -5509.6323587733
                        },
                        {
                            "x": 5975.18119388636,
                            "y": -5527.66835497933
                        },
                        {
                            "x": 5975.18119388636,
                            "y": -5527.66835497933
                        },
                        {
                            "x": 6005.69370359693,
                            "y": -5509.6323587733
                        }
                    ]
                },
                "partTopo": null
            },
            "edgeFeatures": edgesFeatures,
            "nodeFeatures": nodeFeatures,
            "stopWeights": [
                1549.89037273102,
                1549.89037273102
            ],
            "stopIndexes": [
                0
            ],
            "edgeIDs": [
                6184,
                415
            ]
        },
        {
            "pathGuideItems": [
                {
                    "sideType": "LEFT",
                    "bounds": {
                        "top": -2500,
                        "left": 5500,
                        "bottom": -2500,
                        "leftBottom": {
                            "x": 5500,
                            "y": -2500
                        },
                        "right": 5500,
                        "rightTop": {
                            "x": 5500,
                            "y": -2500
                        }
                    },
                    "name": "1575",
                    "turnAngle": 0,
                    "geometry": {
                        "center": {
                            "x": 5500,
                            "y": -2500
                        },
                        "parts": [
                            1
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "POINT",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 5500,
                                "y": -2500
                            }
                        ]
                    },
                    "id": -1
                },
                {
                    "sideType": "NONE",
                    "bounds": {
                        "top": 0,
                        "left": 0,
                        "bottom": -2484.96839937231,
                        "leftBottom": {
                            "x": 0,
                            "y": -2484.96839937231
                        },
                        "right": 6844.94390235329,
                        "rightTop": {
                            "x": 6844.94390235329,
                            "y": 0
                        }
                    },
                    "name": "铁北四路",
                    "turnAngle": -1,
                    "geometry": {
                        "center": {
                            "x": 6499.91348988308,
                            "y": -2472.26044537231
                        },
                        "parts": [
                            4
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "LINE",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 5829.56302702771,
                                "y": -2469.34632996296
                            },
                            {
                                "x": 5937.02135011347,
                                "y": -2469.68365852022
                            },
                            {
                                "x": 6809.534837443,
                                "y": -2484.96839937231
                            },
                            {
                                "x": 6844.94390235329,
                                "y": -2472.47108234515
                            }
                        ]
                    },
                    "id": 3063
                }
            ],
            "nodeIDs": [
                1461,
                1388
            ],
            "route": {
                "line": {
                    "center": {
                        "x": 7958.45471158542,
                        "y": -2765.12270259266
                    },
                    "parts": [
                        4
                    ],
                    "style": null,
                    "prjCoordSys": null,
                    "id": 0,
                    "type": "LINE",
                    "partTopo": null,
                    "points": [
                        {
                            "x": 5513.550796115,
                            "y": -2499.8856324312
                        },
                        {
                            "x": 5513.32107984688,
                            "y": -2472.66779133907
                        },
                        {
                            "x": 5513.32107984688,
                            "y": -2472.66779133907
                        },
                        {
                            "x": 5513.550796115,
                            "y": -2499.8856324312
                        }
                    ]
                },
                "center": null,
                "length": 5562.22087015133,
                "minM": 0,
                "type": "LINEM",
                "points": [
                    {
                        "measure": 0,
                        "x": 5513.550796115,
                        "y": -2499.8856324312
                    },
                    {
                        "measure": 27.2099585039488,
                        "x": 5513.32107984688,
                        "y": -2472.66779133907
                    },
                    {
                        "measure": 5533.20199431918,
                        "x": 5513.32107984688,
                        "y": -2472.66779133907
                    },
                    {
                        "measure": 5560.41195282313,
                        "x": 5513.550796115,
                        "y": -2499.8856324312
                    }
                ],
                "parts": [
                    4
                ],
                "maxM": 5560.41195282313,
                "style": null,
                "prjCoordSys": null,
                "id": 0,
                "region": {
                    "center": {
                        "x": 7791.77656278005,
                        "y": -2579.93054449732
                    },
                    "parts": [
                        4
                    ],
                    "style": null,
                    "prjCoordSys": null,
                    "id": 0,
                    "type": "REGION",
                    "partTopo": [
                        1
                    ],
                    "points": [
                        {
                            "x": 5513.550796115,
                            "y": -2499.8856324312
                        },
                        {
                            "x": 5513.32107984688,
                            "y": -2472.66779133907
                        },
                        {
                            "x": 5513.32107984688,
                            "y": -2472.66779133907
                        },
                        {
                            "x": 5513.550796115,
                            "y": -2499.8856324312
                        }
                    ]
                },
                "partTopo": null
            },
            "edgeFeatures": [
                {
                    "fieldNames": [
                        "SMID",
                        "SMSDRIW"
                    ],
                    "geometry": {
                        "center": {
                            "x": 5513.72693291757,
                            "y": -2520.75513175674
                        },
                        "parts": [
                            2
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 4786,
                        "type": "LINE",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 5513.32107984688,
                                "y": -2472.66779133907
                            },
                            {
                                "x": 5514.13278598825,
                                "y": -2568.84247217441
                            }
                        ]
                    },
                    "fieldValues": [
                        "4786",
                        "5513.3213"
                    ],
                    "ID": 4786
                },
                {
                    "fieldNames": [
                        "SMID",
                        "SMSDRIW"
                    ],
                    "geometry": {
                        "center": {
                            "x": 5512.93847280462,
                            "y": -2427.33474739711
                        },
                        "parts": [
                            3
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 4785,
                        "type": "LINE",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 5512.74164577439,
                                "y": -2411.70061324481
                            },
                            {
                                "x": 5512.93847280462,
                                "y": -2427.33474739711
                            },
                            {
                                "x": 5513.32107984688,
                                "y": -2472.66779133907
                            }
                        ]
                    },
                    "fieldValues": [
                        "4785",
                        "5512.7417"
                    ],
                    "ID": 4785
                }
            ],
            "stopWeights": [
                2780.20597641157,
                2780.20597641157
            ],
            "stopIndexes": [
                1
            ],
            "edgeIDs": [
                4786,
                4785
            ]
        }
    ]
};

// 服务区分析服务
var findServiceAreasResultJson = {
    "serviceAreaList": [
        {
            "nodeIDs": [
                1939,
                2051
            ],
            "routes": [
                {
                    "line": {
                        "center": {
                            "x": 5665.37014959717,
                            "y": -3059.24168448369
                        },
                        "parts": [
                            3
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "LINE",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 5646.14322380064,
                                "y": -3046.14257819825
                            },
                            {
                                "x": 5665.37014959717,
                                "y": -3059.24168448369
                            },
                            {
                                "x": 5646.14322380064,
                                "y": -3046.14257819825
                            }
                        ]
                    },
                    "center": null,
                    "length": 23.2650222665428,
                    "minM": 417.709104190666,
                    "type": "LINEM",
                    "points": [
                        {
                            "measure": 441.047394245589,
                            "x": 5646.14322380064,
                            "y": -3046.14257819825
                        },
                        {
                            "measure": 417.709104190666,
                            "x": 5665.37014959717,
                            "y": -3059.24168448369
                        }
                    ],
                    "parts": [
                        2
                    ],
                    "maxM": 441.047394245589,
                    "style": null,
                    "prjCoordSys": null,
                    "id": 0,
                    "region": {
                        "center": {
                            "x": 5655.75668669871,
                            "y": -3052.69213134097
                        },
                        "parts": [
                            3
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "REGION",
                        "partTopo": [
                            1
                        ],
                        "points": [
                            {
                                "x": 5646.14322380064,
                                "y": -3046.14257819825
                            },
                            {
                                "x": 5665.37014959717,
                                "y": -3059.24168448369
                            },
                            {
                                "x": 5646.14322380064,
                                "y": -3046.14257819825
                            }
                        ]
                    },
                    "partTopo": null
                },
                {
                    "line": {
                        "center": {
                            "x": 5525.91943349228,
                            "y": -3424.74803027638
                        },
                        "parts": [
                            3
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "LINE",
                        "partTopo": null,
                        "points": [
                            {
                                "x": 5495.0346817923,
                                "y": -3453.02908079377
                            },
                            {
                                "x": 5525.91943349228,
                                "y": -3424.74803027638
                            },
                            {
                                "x": 5538.88893769673,
                                "y": -3412.11982881414
                            }
                        ]
                    },
                    "center": null,
                    "length": 59.978950872694,
                    "minM": 127.709104190666,
                    "type": "LINEM",
                    "points": [
                        {
                            "measure": 187.709104190666,
                            "x": 5495.0346817923,
                            "y": -3453.02908079377
                        },
                        {
                            "measure": 145.817377017785,
                            "x": 5525.91943349228,
                            "y": -3424.74803027638
                        },
                        {
                            "measure": 127.709104190666,
                            "x": 5538.88893769673,
                            "y": -3412.11982881414
                        }
                    ],
                    "parts": [
                        3
                    ],
                    "maxM": 187.709104190666,
                    "style": null,
                    "prjCoordSys": null,
                    "id": 0,
                    "region": {
                        "center": {
                            "x": 5517.16713860048,
                            "y": -3432.57445480396
                        },
                        "parts": [
                            4
                        ],
                        "style": null,
                        "prjCoordSys": null,
                        "id": 0,
                        "type": "REGION",
                        "partTopo": [
                            1
                        ],
                        "points": [
                            {
                                "x": 5495.0346817923,
                                "y": -3453.02908079377
                            },
                            {
                                "x": 5525.91943349228,
                                "y": -3424.74803027638
                            },
                            {
                                "x": 5538.88893769673,
                                "y": -3412.11982881414
                            },
                            {
                                "x": 5495.0346817923,
                                "y": -3453.02908079377
                            }
                        ]
                    },
                    "partTopo": null
                }
            ],
            "edgeFeatures": edgesFeatures,
            "serviceRegion": {
                "center": {
                    "x": 5628.0188506003,
                    "y": -3344.15485258163
                },
                "parts": [
                    4
                ],
                "style": null,
                "prjCoordSys": null,
                "id": 1,
                "type": "REGION",
                "partTopo": null,
                "points": [
                    {
                        "x": 5739.45664325032,
                        "y": -3704.68788135014
                    },
                    {
                        "x": 5858.33309354047,
                        "y": -3697.69226407681
                    },
                    {
                        "x": 5472.54150520584,
                        "y": -3675.31877584568
                    },
                    {
                        "x": 5739.45664325032,
                        "y": -3704.68788135014
                    }
                ]
            },
            "nodeFeatures": nodeFeatures,
            "edgeIDs": [
                48,
                50
            ]
        }
    ]
};

// 上游/下游 关键设施查找资源服务
var streamFacilityAnalystResultJson={
    "cost": 0,
    "nodes": [
        6691
    ],
    "nodesFeatures": [
        {
            "fieldNames": [
                "SMID",
                "DEMAND"
            ],
            "geometry": {
                "center": {
                    "x": 2810.13575926848,
                    "y": -7261.93514329719
                },
                "parts": [
                    1
                ],
                "style": null,
                "prjCoordSys": null,
                "id": 6691,
                "type": "POINT",
                "partTopo": null,
                "points": [{
                    "x": 2810.13575926848,
                    "y": -7261.93514329719
                }]
            },
            "fieldValues": [
                "6691",
                "30"
            ],
            "ID": 6691
        }],
    "edges": [
        84,
        10349
    ],
    "edgesFeatures": [
        {
            "fieldNames": [
                "SMID",
                "TRULE"
            ],
            "geometry": {
                "center": {
                    "x": 2829.72928702359,
                    "y": -7235.16491642247
                },
                "parts": [
                    3
                ],
                "style": null,
                "prjCoordSys": null,
                "id": 84,
                "type": "LINE",
                "partTopo": null,
                "points": [{
                    "x": 2941.54577581428,
                    "y": -7068.07673440076
                },
                    {
                        "x": 2829.72928702359,
                        "y": -7235.16491642247
                    },
                    {
                        "x": 2810.13575926848,
                        "y": -7261.93514329719
                    }
                ]
            },
            "fieldValues": [
                "84",
                ""
            ],
            "ID": 84
        }
    ]
};
