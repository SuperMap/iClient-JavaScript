/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.*/
var host = window.isLocal ? window.server : "https://iserver.supermap.io";

var attribution = "<a href='https://www.mapbox.com/about/maps/' target='_blank'>© Mapbox </a>" +
    "with <span>© <a href='https://iclient.supermap.io' target='_blank'>SuperMap iClient</a> | </span>" +
    "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> ";

var mapStyles = {
    basic: {
        style: {
            "version": 8,
            "sources": {
                "vector-tiles": {
                    "attribution": attribution,
                    "type": "vector",
                    "tiles": [host + "/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature.mvt?returnAttributes=true&compressTolerance=-1&width=512&height=512&viewBounds={bbox-epsg-3857}&expands=0:0_2,132_128,138_64,141_32,143_16,145_8,147_4"]
                }
            },
            "sprite": "https://iclient.supermap.io/web/styles/street/sprite",
            "glyphs": host + "/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature/sdffonts/{fontstack}/{range}.pbf",
            "layers": [
                {
                    "id": "background",
                    "type": "background",
                    "layout": {},
                    "paint": {
                        "background-color": "#75CFF0"
                    }
                }, {
                    "id": "面区界R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "面区界R@北京",
                    "paint": {
                        "fill-color": "#EFE9E1"
                    }
                }, {
                    "id": "界线@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "界线@北京",
                    "paint": {
                        "line-color": "hsl(240, 8%, 51%)",
                        "line-width": 0.5
                    }

                }, {
                    "id": "立交桥绿地R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "立交桥绿地R@北京",
                    "paint": {
                        "fill-color": "hsl(100, 58%, 76%)",
                        "fill-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    5,
                                    0
                                ],
                                [
                                    6,
                                    0.5
                                ]
                            ]
                        }
                    }
                }, {
                    "id": "绿地R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "绿地R@北京",
                    "paint": {
                        "fill-color": "hsl(100, 58%, 76%)",
                        "fill-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    5,
                                    0
                                ],
                                [
                                    6,
                                    0.5
                                ]
                            ]
                        }
                    }
                }, {
                    "id": "	双线河R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "双线河R@北京",
                    "paint": {
                        "fill-color": "hsl(196, 80%, 70%)"
                    }
                }, {
                    "id": "湖泊、水库R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "湖泊、水库R@北京",
                    "paint": {
                        "fill-color": "hsl(196, 80%, 70%)"
                    }
                },

                {
                    "id": "	四级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "四级道路L@北京",
                    "paint": {
                        "line-width": {
                            "base": 1.5,
                            "stops": [
                                [
                                    11,
                                    1
                                ],
                                [
                                    18,
                                    10
                                ]
                            ]
                        },
                        "line-color": "hsl(0, 0%, 100%)"
                    }
                }, {
                    "id": "	三级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "三级道路L@北京",
                    "paint": {
                        "line-width": {
                            "base": 1.5,
                            "stops": [
                                [
                                    11,
                                    1
                                ],
                                [
                                    18,
                                    10
                                ]
                            ]
                        },
                        "line-color": "hsl(0, 0%, 100%)"
                    }
                }, {
                    "id": "	二级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "二级道路L@北京",
                    "paint": {
                        "line-width": 4,
                        "line-color": "hsl(230, 24%, 87%)"
                    }
                }, {
                    "id": "	二级道路L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "二级道路L@北京",
                    "paint": {
                        "line-width": {
                            "base": 1.5,
                            "stops": [
                                [
                                    11,
                                    2
                                ],
                                [
                                    18,
                                    18
                                ]
                            ]
                        },
                        "line-color": "hsl(0, 0%, 100%)"
                    }
                }, {
                    "id": "一级道路L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "paint": {
                        "line-width": {
                            "base": 1.5,
                            "stops": [
                                [
                                    11,
                                    6
                                ],
                                [
                                    18,
                                    26
                                ]
                            ]
                        },
                        "line-color": "hsl(230, 24%, 87%)",
                        "line-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    10.99,
                                    0
                                ],
                                [
                                    11,
                                    1
                                ]
                            ]
                        }
                    }
                }, {
                    "id": "一级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "paint": {
                        "line-width": {
                            "base": 1.5,
                            "stops": [
                                [
                                    11,
                                    4
                                ],
                                [
                                    18,
                                    20
                                ]
                            ]
                        },
                        "line-color": "hsl(0, 0%, 100%)",
                        "line-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    10.99,
                                    0
                                ],
                                [
                                    11,
                                    1
                                ]
                            ]
                        }
                    }
                }, {
                    "id": "	省道L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "paint": {
                        "line-width": {
                            "base": 1.5,
                            "stops": [
                                [
                                    10,
                                    6
                                ],
                                [
                                    18,
                                    36
                                ]
                            ]
                        },
                        "line-color": "hsl(26, 87%, 62%)"
                    }
                }, {
                    "id": "	省道L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "paint": {
                        "line-width": {
                            "base": 1.5,
                            "stops": [
                                [
                                    10,
                                    4
                                ],
                                [
                                    18,
                                    32
                                ]
                            ]
                        },
                        "line-color": "hsl(35, 32%, 91%)"
                    }
                }, {
                    "id": "	高速公路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "高速公路L@北京",
                    "paint": {
                        "line-width": {
                            "base": 1.5,
                            "stops": [
                                [
                                    11,
                                    6
                                ],
                                [
                                    18,
                                    32
                                ]
                            ]
                        },
                        "line-color": "hsl(26, 87%, 62%)"
                    }
                },


                {
                    "id": "区政府驻地@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "区政府驻地@北京",
                    "layout": {
                        "text-offset": [-1.5, -0.5],
                        "text-anchor": "bottom-left",
                        "text-field": "{NAME}",
                        "text-max-width": 7,
                        "text-font": [
                            "DIN Offc Pro Medium",
                            "Arial Unicode MS Regular"
                        ],
                        "text-size": 22
                    },
                    "paint": {
                        "text-color": "hsl(230, 8%, 62%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    11.99,
                                    1
                                ],
                                [
                                    12,
                                    0
                                ]
                            ]
                        },
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "标志建筑@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "标志建筑@北京",
                    "layout": {
                        "text-offset": [-1.5, -0.5],
                        "text-anchor": "bottom-left",
                        "text-field": "{NAME}",
                        "text-max-width": 7,
                        "text-size": 14
                    },
                    "paint": {
                        "text-color": "hsl(26, 25%, 32%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    10.99,
                                    0
                                ],
                                [
                                    11,
                                    1
                                ]
                            ]
                        },
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "	一级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "layout": {
                        "text-line-height": 1.1,
                        "text-size": {
                            "base": 1.5,
                            "stops": [
                                [
                                    13.99,
                                    12
                                ],
                                [
                                    20,
                                    24
                                ]
                            ]
                        },
                        "text-font": [
                            "DIN Offc Pro Italic",
                            "Arial Unicode MS Regular"
                        ],
                        "symbol-placement": "line",
                        "text-field": "{道路名称}",
                        "text-letter-spacing": 0.1,
                        "text-max-width": 5
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1.25,
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    13.99,
                                    0
                                ],
                                [
                                    14,
                                    1
                                ]
                            ]
                        }
                    }
                }, {
                    "id": "	省道Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "layout": {
                        "text-line-height": 1.1,
                        "text-size": {
                            "base": 1.5,
                            "stops": [
                                [
                                    11,
                                    10
                                ],
                                [
                                    18,
                                    24
                                ]
                            ]
                        },
                        "text-font": [
                            "DIN Offc Pro Italic",
                            "Arial Unicode MS Regular"
                        ],
                        "symbol-placement": "line",
                        "text-field": "{道路名称}",
                        "text-letter-spacing": 0.1,
                        "text-max-width": 5
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1.25,
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    10.99,
                                    0
                                ],
                                [
                                    11,
                                    1
                                ]
                            ]
                        }
                    }
                },

                {
                    "id": "立交桥名称P@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "立交桥名称P@北京",
                    "layout": {
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 14
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "长途汽车站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "长途汽车站@北京",
                    "layout": {
                        "icon-image": "bus-11",
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "图书馆@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "图书馆@北京",
                    "layout": {
                        "icon-image": "library-11",
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "公园@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "公园@北京",
                    "layout": {
                        "icon-image": "park-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "综合性广场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "综合性广场@北京",
                    "layout": {
                        "icon-image": "campsite-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "旅游景点@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "旅游景点@北京",
                    "layout": {
                        "icon-image": "volcano-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "医疗卫生@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "医疗卫生@北京",
                    "layout": {
                        "icon-image": "hospital-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "娱乐场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "娱乐场所@北京",
                    "layout": {
                        "icon-image": "amusement-park-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "大厦@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "大厦@北京",
                    "layout": {
                        "icon-image": "picnic-site-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "文化场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "文化场所@北京",
                    "layout": {
                        "icon-image": "art-gallery-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "运动场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "运动场所@北京",
                    "layout": {
                        "icon-image": "bicycle-share-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "交通运输@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "交通运输@北京",
                    "layout": {
                        "icon-image": "bakery-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "其它@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "其它@北京",
                    "layout": {
                        "icon-image": "toilet-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "filter": [
                        "==",
                        "NAME",
                        "公厕"
                    ],
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "服务行业@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "服务行业@北京",
                    "layout": {
                        "icon-image": "embassy-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "其它@北京2",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "其它@北京",
                    "layout": {
                        "icon-image": "car-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "filter": [
                        "==",
                        "NAME",
                        "停车场"
                    ],
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "邮政电信@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "邮政电信@北京",
                    "layout": {
                        "icon-image": "post-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 10,
                        "text-max-width": 18
                    },

                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "商场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "商场@北京",
                    "layout": {
                        "icon-image": "grocery-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "综合性商店@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "综合性商店@北京",
                    "layout": {
                        "icon-image": "grocery-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "饭店@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "饭店@北京",
                    "layout": {
                        "icon-image": "restaurant-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "加油站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "加油站@北京",
                    "layout": {
                        "icon-image": "fuel-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "建筑@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "建筑@北京",
                    "layout": {
                        "icon-image": "place-of-worship-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "码头@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "码头@北京",
                    "layout": {
                        "icon-image": "harbor-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "机场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "机场@北京",
                    "layout": {
                        "icon-image": "airport-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "火车站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "火车站@北京",
                    "layout": {
                        "icon-image": "rail-15",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }, {
                    "id": "地名@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "地名@北京",
                    "layout": {
                        "icon-image": "dot-11",
                        "text-offset": [0, -0.3],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }
            ]

        }
    },
    dark: {
        style: {
            "version": 8,
            "sources": {
                "vector-tiles": {
                    "attribution": attribution,
                    "type": "vector",
                    "tiles": [host + "/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature.mvt?returnAttributes=true&compressTolerance=-1&width=512&height=512&viewBounds={bbox-epsg-3857}&expands=0:0_2,132_128,138_64,141_32,143_16,145_8,147_4"]
                }
            },
            "sprite": "https://iclient.supermap.io/web/styles/dark/sprite",
            "glyphs": host + "/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature/sdffonts/{fontstack}/{range}.pbf",
            "layers": [
                {
                    "id": "background",
                    "type": "background",
                    "layout": {},
                    "paint": {
                        "background-color": "hsl(55, 1%, 20%)"
                    }
                },
                {
                    "id": "面区界R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "面区界R@北京",
                    "paint": {
                        "fill-color": "hsl(55, 1%, 20%)"
                    }
                },
                {
                    "id": "界线@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "界线@北京",
                    "paint": {
                        "line-color": "hsl(0, 0%, 35%)",
                        "line-width": 0.5
                    }

                },
                {
                    "id": "立交桥绿地R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "立交桥绿地R@北京",
                    "paint": {
                        "fill-color": "hsl(132, 2%, 20%)",
                        "fill-opacity": 0.5
                    }
                },
                {
                    "id": "绿地R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "绿地R@北京",
                    "paint": {
                        "fill-color": "hsl(132, 2%, 20%)",
                        "fill-opacity": 0.5
                    }
                },
                {
                    "id": "	双线河R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "双线河R@北京",
                    "paint": {
                        "fill-color": "hsl(185, 2%, 10%)"
                    }
                },
                {
                    "id": "湖泊、水库R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "湖泊、水库R@北京",
                    "paint": {
                        "fill-color": "hsl(185, 2%, 10%)"
                    }
                },

                {
                    "id": "	四级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "四级道路L@北京",
                    "paint": {
                        "line-width": 1,
                        "line-color": "hsl(0, 0%, 27%)"
                    }
                },
                {
                    "id": "	三级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "三级道路L@北京",
                    "paint": {
                        "line-width": 1,
                        "line-color": "hsl(0, 0%,27%)"
                    }
                },
                {
                    "id": "	二级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "二级道路L@北京",
                    "paint": {
                        "line-width": 2,
                        "line-color": "hsl(0, 0%, 27%)"
                    }
                },
                {
                    "id": "一级道路L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "paint": {
                        "line-width": 6,
                        "line-color": "hsl(0, 0%, 17%)",
                        "line-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    10.99,
                                    0
                                ],
                                [
                                    11,
                                    1
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "一级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "paint": {
                        "line-width": 4,
                        "line-color": "hsl(0, 0%, 27%)",
                        "line-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    10.99,
                                    0
                                ],
                                [
                                    11,
                                    1
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	省道L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "paint": {
                        "line-width": 6,
                        "line-color": "hsl(0, 0%, 17%)"
                    }
                },
                {
                    "id": "	省道L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "paint": {
                        "line-width": 4,
                        "line-color": "hsl(0, 0%, 27%)"
                    }
                },
                {
                    "id": "	高速公路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "高速公路L@北京",
                    "paint": {
                        "line-width": 4,
                        "line-color": "hsl(0, 0%, 27%)",

                    }
                },

//区划
                {
                    "id": "区政府驻地@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "区政府驻地@北京",
                    "layout": {
                        "text-offset": [-1.5, -0.5],
                        "text-anchor": "bottom-left",
                        "text-field": "{NAME}",
                        "text-max-width": 7,
                        "text-size": {
                            "base": 0.9,
                            "stops": [
                                [
                                    4,
                                    12
                                ],
                                [
                                    10,
                                    22
                                ]
                            ]
                        }
                    },
                    "paint": {
                        "text-color": {
                            "base": 1,
                            "stops": [
                                [
                                    10,
                                    "hsl(0, 0%, 75%)"
                                ],
                                [
                                    11,
                                    "hsl(0, 0%, 85%)"
                                ]
                            ]
                        },
                        "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
                        "text-halo-width": 1.25,
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    11.99,
                                    1
                                ],
                                [
                                    12,
                                    0
                                ]
                            ]
                        },
                        "text-halo-blur": 0
                    }
                },
//地标
                {
                    "id": "标志建筑@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "标志建筑@北京",
                    "layout": {
                        "text-offset": [-1.5, -0.5],
                        "text-anchor": "bottom-left",
                        "text-field": "{NAME}",
                        "text-max-width": 7,
                        "text-size": 14
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 60%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0,
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    10.99,
                                    0
                                ],
                                [
                                    11,
                                    1
                                ]
                            ]
                        }
                    }

                },
                {
                    "id": "	一级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "layout": {
                        "text-line-height": 1.1,
                        "text-size": {
                            "base": 1.5,
                            "stops": [
                                [
                                    13.99,
                                    12
                                ],
                                [
                                    20,
                                    24
                                ]
                            ]
                        },
                        "text-font": [
                            "DIN Offc Pro Italic",
                            "Arial Unicode MS Regular"
                        ],
                        "symbol-placement": "line",
                        "text-field": "{道路名称}",
                        "text-letter-spacing": 0.1,
                        "text-max-width": 5
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1.25,
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    13.99,
                                    0
                                ],
                                [
                                    14,
                                    1
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	省道Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "layout": {
                        "text-line-height": 1.1,
                        "text-size": {
                            "base": 1.5,
                            "stops": [
                                [
                                    11,
                                    10
                                ],
                                [
                                    18,
                                    24
                                ]
                            ]
                        },
                        "text-font": [
                            "DIN Offc Pro Italic",
                            "Arial Unicode MS Regular"
                        ],
                        "symbol-placement": "line",
                        "text-field": "{道路名称}",
                        "text-letter-spacing": 0.1,
                        "text-max-width": 5
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1.25,
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    10.99,
                                    0
                                ],
                                [
                                    11,
                                    1
                                ]
                            ]
                        }
                    }
                },

                {
                    "id": "立交桥名称P@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "立交桥名称P@北京",
                    "layout": {
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 14
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-opacity": 1,
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    }

                },
                {
                    "id": "长途汽车站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "长途汽车站@北京",
                    "layout": {
                        "icon-image": "bus-11",
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    },

                },
                {
                    "id": "图书馆@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "图书馆@北京",
                    "layout": {
                        "icon-image": "library-11",
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    },

                },
                {
                    "id": "公园@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "公园@北京",
                    "layout": {
                        "icon-image": "park-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    },

                },
                {
                    "id": "综合性广场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "综合性广场@北京",
                    "layout": {
                        "icon-image": "campsite-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    },

                },

                {
                    "id": "旅游景点@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "旅游景点@北京",
                    "layout": {
                        "icon-image": "volcano-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    },

                },
                {
                    "id": "医疗卫生@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "医疗卫生@北京",
                    "layout": {
                        "icon-image": "hospital-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    }

                },
                {
                    "id": "娱乐场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "娱乐场所@北京",
                    "layout": {
                        "icon-image": "amusement-park-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "大厦@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "大厦@北京",
                    "layout": {
                        "icon-image": "picnic-site-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "文化场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "文化场所@北京",
                    "layout": {
                        "icon-image": "art-gallery-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "运动场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "运动场所@北京",
                    "layout": {
                        "icon-image": "bicycle-share-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "交通运输@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "交通运输@北京",
                    "layout": {
                        "icon-image": "bakery-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "其它@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "其它@北京",
                    "layout": {
                        "icon-image": "toilet-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "filter": [
                        "==",
                        "NAME",
                        "公厕"
                    ],
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "服务行业@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "服务行业@北京",
                    "layout": {
                        "icon-image": "embassy-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "其它@北京2",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "其它@北京",
                    "layout": {
                        "icon-image": "car-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "filter": [
                        "==",
                        "NAME",
                        "停车场"
                    ],
                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "邮政电信@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "邮政电信@北京",
                    "layout": {
                        "icon-image": "post-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 10,
                        "text-max-width": 18
                    },

                    "paint": {
                        "text-color": "hsl(0, 0%, 0%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "商场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "商场@北京",
                    "layout": {
                        "icon-image": "grocery-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    }

                },
                {
                    "id": "综合性商店@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "综合性商店@北京",
                    "layout": {
                        "icon-image": "grocery-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    }

                },
                {
                    "id": "饭店@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "饭店@北京",
                    "layout": {
                        "icon-image": "restaurant-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    }

                },
                {
                    "id": "加油站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "加油站@北京",
                    "layout": {
                        "icon-image": "fuel-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    }

                },
                {
                    "id": "建筑@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "建筑@北京",
                    "layout": {
                        "icon-image": "place-of-worship-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    }

                },
                {
                    "id": "码头@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "码头@北京",
                    "layout": {
                        "icon-image": "harbor-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    }

                },
                {
                    "id": "机场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "机场@北京",
                    "layout": {
                        "icon-image": "airport-11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    }

                },
                {
                    "id": "火车站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "火车站@北京",
                    "layout": {
                        "icon-image": "rail-15",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    }

                },
                {
                    "id": "地名@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "地名@北京",
                    "layout": {
                        "icon-image": "dot-11",
                        "text-offset": [0, -0.3],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(0, 0%, 78%)",
                        "text-halo-color": "#212121",
                        "text-halo-width": 1,
                        "text-halo-blur": 0
                    }

                }
            ]
        }
    },
    fiordcolor: {
        style: {
            "version": 8,
            "sources": {
                "vector-tiles": {
                    "attribution": attribution,
                    "type": "vector",
                    "tiles": [host + "/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature.mvt?returnAttributes=true&compressTolerance=-1&width=512&height=512&viewBounds={bbox-epsg-3857}&expands=0:0_2,132_128,138_64,141_32,143_16,145_8,147_4"]
                }
            },
            "sprite": "https://iclient.supermap.io/web/styles/osm/sprite",
            "glyphs": host + "/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature/sdffonts/{fontstack}/{range}.pbf",
            "layers": [
                {
                    "id": "background",
                    "type": "background",
                    "layout": {},
                    "paint": {
                        "background-color": "#45516E"
                    }
                },
                {
                    "id": "立交桥绿地R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "立交桥绿地R@北京",
                    "paint": {
                        "fill-color": "hsla(232, 18%, 30%, 0.57)",
                        "fill-opacity": 1
                    }
                },
                {
                    "id": "绿地R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "绿地R@北京",
                    "paint": {
                        "fill-color": "hsla(232, 18%, 30%, 0.57)",
                        "fill-opacity": 1
                    }
                },
                {
                    "id": "	双线河R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "双线河R@北京",
                    "paint": {
                        "fill-color": "#38435C",
                        "fill-antialias": false
                    }
                },
                {
                    "id": "湖泊、水库R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "湖泊、水库R@北京",
                    "paint": {
                        "fill-color": "#38435C",
                        "fill-antialias": false
                    }
                },

                {
                    "id": "	四级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "四级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "hsl(224, 22%, 45%)",
                        "line-width": {
                            "base": 1.55,
                            "stops": [
                                [
                                    13,
                                    1.8
                                ],
                                [
                                    20,
                                    20
                                ]
                            ]
                        },
                        "line-opacity": 0.9
                    }
                },
                {
                    "id": "	三级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "三级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "#3C4357",
                        "line-width": {
                            "base": 1.55,
                            "stops": [
                                [
                                    13,
                                    1.8
                                ],
                                [
                                    20,
                                    20
                                ]
                            ]
                        },
                        "line-opacity": 0.9
                    }
                },
                {
                    "id": "	二级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "二级道路L@北京",
                    "layout": {
                        "line-cap": "butt",
                        "line-join": "miter",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "hsl(224, 22%, 45%)",
                        "line-dasharray": [
                            12,
                            0
                        ],
                        "line-width": {
                            "base": 1.3,
                            "stops": [
                                [
                                    10,
                                    3
                                ],
                                [
                                    20,
                                    23
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	二级道路L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "二级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "#3C4357",
                        "line-width": {
                            "base": 1.3,
                            "stops": [
                                [
                                    10,
                                    2
                                ],
                                [
                                    20,
                                    20
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	一级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "layout": {
                        "line-cap": "butt",
                        "line-join": "miter",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "hsl(224, 22%, 45%)",
                        "line-dasharray": [
                            12,
                            0
                        ],
                        "line-width": {
                            "base": 1.3,
                            "stops": [
                                [
                                    11,
                                    5
                                ],
                                [
                                    20,
                                    23
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	一级道路L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "#3C4357",
                        "line-width": {
                            "base": 1.3,
                            "stops": [
                                [
                                    11,
                                    3
                                ],
                                [
                                    20,
                                    20
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	省道L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "layout": {
                        "line-cap": "butt",
                        "line-join": "miter",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "hsl(224, 22%, 45%)",
                        "line-dasharray": [
                            12,
                            0
                        ],
                        "line-width": {
                            "base": 1.3,
                            "stops": [
                                [
                                    11,
                                    6
                                ],
                                [
                                    20,
                                    23
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	省道L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "#3C4357",
                        "line-width": {
                            "base": 1.3,
                            "stops": [
                                [
                                    11,
                                    4
                                ],
                                [
                                    20,
                                    20
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	高速公路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "高速公路L@北京",
                    "layout": {
                        "line-cap": "butt",
                        "line-join": "miter",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "hsl(224, 22%, 45%)",
                        "line-width": {
                            "base": 1.4,
                            "stops": [
                                [
                                    11,
                                    8
                                ],
                                [
                                    20,
                                    40
                                ]
                            ]
                        },
                        "line-dasharray": [
                            2,
                            0
                        ],
                        "line-opacity": 1
                    }
                },
                {
                    "id": "	高速公路L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "高速公路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "hsl(224, 20%, 29%)",
                        "line-width": {
                            "base": 1.4,
                            "stops": [
                                [
                                    11,
                                    6
                                ],
                                [
                                    20,
                                    30
                                ]
                            ]
                        }
                    }
                },


                {
                    "id": "区政府驻地@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "区政府驻地@北京",
                    "layout": {
                        "text-offset": [-1.5, -0.5],
                        "text-anchor": "bottom-left",
                        "text-field": "{NAME}",
                        "text-max-width": 7,
                        "text-font": [
                            "DIN Offc Pro Medium",
                            "Arial Unicode MS Regular"
                        ],
                        "text-size": 22
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    11.99,
                                    1
                                ],
                                [
                                    12,
                                    0
                                ]
                            ]
                        },
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "标志建筑@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "标志建筑@北京",
                    "layout": {
                        "text-offset": [-1.5, -0.5],
                        "text-anchor": "bottom-left",
                        "text-field": "{NAME}",
                        "text-max-width": 7,
                        "text-size": 14
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    10.99,
                                    0
                                ],
                                [
                                    11,
                                    1
                                ]
                            ]
                        },
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "	四级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "四级道路L@北京",
                    "layout": {
                        "text-size": 10,
                        "text-field": "{道路名称}",
                        "symbol-placement": "line",
                        "text-rotation-alignment": "map"
                    },
                    "paint": {
                        "text-halo-blur": 0.5,
                        "text-color": "hsl(223, 31%, 61%)",
                        "text-halo-color": "hsl(232, 9%, 23%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    14.99,
                                    0
                                ],
                                [
                                    15,
                                    1
                                ]
                            ]
                        },
                        "text-halo-width": 2
                    }
                },
                {
                    "id": "	三级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "三级道路L@北京",
                    "layout": {
                        "text-size": 10,
                        "text-field": "{道路名称}",
                        "symbol-placement": "line",
                        "text-rotation-alignment": "map"
                    },
                    "paint": {
                        "text-halo-blur": 0.5,
                        "text-color": "hsl(223, 31%, 61%)",
                        "text-halo-color": "hsl(232, 9%, 23%)",
                        "text-halo-width": 2
                    }
                },
                {
                    "id": "	二级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "二级道路L@北京",
                    "layout": {
                        "text-size": 10,
                        "text-field": "{道路名称}",
                        "symbol-placement": "line",
                        "text-rotation-alignment": "map"
                    },
                    "paint": {
                        "text-halo-blur": 0.5,
                        "text-color": "hsl(223, 31%, 61%)",
                        "text-halo-color": "hsl(232, 9%, 23%)",
                        "text-halo-width": 2
                    }
                },
                {
                    "id": "	一级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "layout": {
                        "text-size": 10,
                        "text-field": "{道路名称}",
                        "symbol-placement": "line",
                        "text-rotation-alignment": "map"
                    },
                    "paint": {
                        "text-halo-blur": 0.5,
                        "text-color": "hsl(223, 31%, 61%)",
                        "text-halo-color": "hsl(232, 9%, 23%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    13.99,
                                    0
                                ],
                                [
                                    14,
                                    1
                                ]
                            ]
                        },
                        "text-halo-width": 2
                    }
                },
                {
                    "id": "	省道Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "layout": {
                        "text-size": 10,
                        "text-field": "{道路名称}",
                        "symbol-placement": "line",
                        "text-rotation-alignment": "map"
                    },
                    "paint": {
                        "text-halo-blur": 0.5,
                        "text-color": "hsl(223, 31%, 61%)",
                        "text-halo-color": "hsl(232, 9%, 23%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    12.99,
                                    0
                                ],
                                [
                                    13,
                                    1
                                ]
                            ]
                        },
                        "text-halo-width": 2
                    }
                },

                {
                    "id": "立交桥名称P@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "立交桥名称P@北京",
                    "layout": {
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 10
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "长途汽车站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "长途汽车站@北京",
                    "layout": {
                        "icon-image": "bus_11",
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "图书馆@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "图书馆@北京",
                    "layout": {
                        "icon-image": "library_11",
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "公园@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "公园@北京",
                    "layout": {
                        "icon-image": "park_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "综合性广场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "综合性广场@北京",
                    "layout": {
                        "icon-image": "campsite_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "旅游景点@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "旅游景点@北京",
                    "layout": {
                        "icon-image": "volcano_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "医疗卫生@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "医疗卫生@北京",
                    "layout": {
                        "icon-image": "hospital_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "娱乐场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "娱乐场所@北京",
                    "layout": {
                        "icon-image": "amusement_park_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "大厦@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "大厦@北京",
                    "layout": {
                        "icon-image": "picnic_site_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "文化场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "文化场所@北京",
                    "layout": {
                        "icon-image": "art_gallery_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "运动场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "运动场所@北京",
                    "layout": {
                        "icon-image": "bicycle_share_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "交通运输@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "交通运输@北京",
                    "layout": {
                        "icon-image": "bakery_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "其它@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "其它@北京",
                    "layout": {
                        "icon-image": "toilet_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "filter": [
                        "==",
                        "NAME",
                        "公厕"
                    ],
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "服务行业@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "服务行业@北京",
                    "layout": {
                        "icon-image": "embassy_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "其它@北京2",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "其它@北京",
                    "layout": {
                        "icon-image": "car_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "filter": [
                        "==",
                        "NAME",
                        "停车场"
                    ],
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "邮政电信@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "邮政电信@北京",
                    "layout": {
                        "icon-image": "post_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 10,
                        "text-max-width": 18
                    },

                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "商场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "商场@北京",
                    "layout": {
                        "icon-image": "grocery_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "综合性商店@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "综合性商店@北京",
                    "layout": {
                        "icon-image": "grocery_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "饭店@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "饭店@北京",
                    "layout": {
                        "icon-image": "restaurant_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "加油站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "加油站@北京",
                    "layout": {
                        "icon-image": "fuel_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "建筑@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "建筑@北京",
                    "layout": {
                        "icon-image": "place_of_worship_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "码头@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "码头@北京",
                    "layout": {
                        "icon-image": "harbor_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "机场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "机场@北京",
                    "layout": {
                        "icon-image": "airport_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "火车站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "火车站@北京",
                    "layout": {
                        "icon-image": "rail_15",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "地名@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "地名@北京",
                    "layout": {
                        "icon-image": "dot_11",
                        "text-offset": [0, -0.3],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "hsl(195, 37%, 73%)",
                        "text-opacity": 1,
                        "text-halo-color": "hsla(228, 60%, 21%, 0.7)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }
            ]
        }
    },
    klokantech: {
        style: {
            "version": 8,
            "sources": {
                "vector-tiles": {
                    "attribution": attribution,
                    "type": "vector",
                    "tiles": [host + "/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature.mvt?returnAttributes=true&compressTolerance=-1&width=512&height=512&viewBounds={bbox-epsg-3857}&expands=0:0_2,132_128,138_64,141_32,143_16,145_8,147_4"]
                }
            },
            "glyphs": host + "/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature/sdffonts/{fontstack}/{range}.pbf",
            "layers": [
                {
                    "id": "background",
                    "type": "background",
                    "layout": {},
                    "paint": {
                        "background-color": "hsl(47, 26%, 88%)"
                    }
                },

                {
                    "id": "立交桥绿地R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "立交桥绿地R@北京",
                    "paint": {
                        "fill-color": "hsl(82, 46%, 72%)",
                        "fill-opacity": 1
                    }
                },
                {
                    "id": "绿地R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "绿地R@北京",
                    "paint": {
                        "fill-color": "hsl(82, 46%, 72%)",
                        "fill-opacity": 1
                    }
                },
                {
                    "id": "	双线河R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "双线河R@北京",
                    "paint": {
                        "fill-color": "hsl(205, 56%, 73%)"
                    }
                },
                {
                    "id": "湖泊、水库R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "湖泊、水库R@北京",
                    "paint": {
                        "fill-color": "hsl(205, 56%, 73%)"
                    }
                },

                {
                    "id": "	四级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "四级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "hsl(0, 0%, 97%)",
                        "line-width": {
                            "base": 1.55,
                            "stops": [
                                [
                                    4,
                                    0.25
                                ],
                                [
                                    20,
                                    30
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	三级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "三级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "hsl(0, 0%, 97%)",
                        "line-width": {
                            "base": 1.55,
                            "stops": [
                                [
                                    4,
                                    0.25
                                ],
                                [
                                    20,
                                    30
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	二级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "二级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "#fff",
                        "line-width": {
                            "base": 1.4,
                            "stops": [
                                [
                                    6,
                                    0.5
                                ],
                                [
                                    20,
                                    20
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "一级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "#fff",
                        "line-width": {
                            "base": 1.4,
                            "stops": [
                                [
                                    6,
                                    0.5
                                ],
                                [
                                    20,
                                    30
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	省道L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "hsl(0, 0%, 100%)",
                        "line-width": {
                            "base": 1.4,
                            "stops": [
                                [
                                    8,
                                    1
                                ],
                                [
                                    16,
                                    10
                                ]
                            ]
                        },
                        "line-offset": 0
                    }
                },
                {
                    "id": "	高速公路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "高速公路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "hsl(0, 0%, 100%)",
                        "line-width": {
                            "base": 1.4,
                            "stops": [
                                [
                                    8,
                                    1
                                ],
                                [
                                    16,
                                    10
                                ]
                            ]
                        },
                        "line-offset": 0
                    }
                },


                {
                    "id": "区政府驻地@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "区政府驻地@北京",
                    "layout": {
                        "text-offset": [-1.5, -0.5],
                        "text-anchor": "bottom-left",
                        "text-field": "{NAME}",
                        "text-max-width": 7,
                        "text-font": [
                            "DIN Offc Pro Medium",
                            "Arial Unicode MS Regular"
                        ],
                        "text-size": 22
                    },
                    "paint": {
                        "text-color": "hsl(230, 8%, 62%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    11.99,
                                    1
                                ],
                                [
                                    12,
                                    0
                                ]
                            ]
                        },
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "标志建筑@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "标志建筑@北京",
                    "layout": {
                        "text-offset": [-1.5, -0.5],
                        "text-anchor": "bottom-left",
                        "text-field": "{NAME}",
                        "text-max-width": 7,
                        "text-size": 14
                    },
                    "paint": {
                        "text-color": "hsl(26, 25%, 32%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    10.99,
                                    0
                                ],
                                [
                                    11,
                                    1
                                ]
                            ]
                        },
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "	四级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "四级道路L@北京",
                    "layout": {
                        "text-size": {
                            "base": 1,
                            "stops": [
                                [
                                    13,
                                    12
                                ],
                                [
                                    14,
                                    13
                                ]
                            ]
                        },
                        "text-field": "{道路名称}",
                        "symbol-placement": "line",
                        "text-rotation-alignment": "map"
                    },
                    "paint": {
                        "text-halo-blur": 0.5,
                        "text-color": "#000",
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    14.99,
                                    0
                                ],
                                [
                                    15,
                                    1
                                ]
                            ]
                        },
                        "text-halo-width": 2
                    }
                },
                {
                    "id": "	三级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "三级道路L@北京",
                    "layout": {
                        "text-size": 10,
                        "text-max-angle": 30,
                        "text-transform": "uppercase",
                        "symbol-spacing": 350,
                        "symbol-placement": "line",
                        "visibility": "visible",
                        "text-rotation-alignment": "map",
                        "text-pitch-alignment": "viewport",
                        "text-field": "{道路名称}"
                    },
                    "paint": {
                        "text-color": "#000",
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-translate": [
                            0,
                            0
                        ],
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    13.99,
                                    0
                                ],
                                [
                                    14,
                                    1
                                ]
                            ]
                        },
                        "text-halo-width": 2,
                        "text-halo-blur": 1
                    }
                },
                {
                    "id": "	二级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "二级道路L@北京",
                    "layout": {
                        "text-size": 10,
                        "text-max-angle": 30,
                        "text-transform": "uppercase",
                        "symbol-spacing": 350,
                        "symbol-placement": "line",
                        "visibility": "visible",
                        "text-rotation-alignment": "map",
                        "text-pitch-alignment": "viewport",
                        "text-field": "{道路名称}"
                    },
                    "paint": {
                        "text-color": "#000",
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-translate": [
                            0,
                            0
                        ],
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    13.99,
                                    0
                                ],
                                [
                                    14,
                                    1
                                ]
                            ]
                        },
                        "text-halo-width": 2,
                        "text-halo-blur": 1
                    }
                },
                {
                    "id": "	一级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "layout": {
                        "text-size": 10,
                        "text-max-angle": 30,
                        "text-transform": "uppercase",
                        "symbol-spacing": 350,
                        "symbol-placement": "line",
                        "visibility": "visible",
                        "text-rotation-alignment": "map",
                        "text-pitch-alignment": "viewport",
                        "text-field": "{道路名称}"
                    },
                    "paint": {
                        "text-color": "#000",
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    12.99,
                                    0
                                ],
                                [
                                    13,
                                    1
                                ]
                            ]
                        },
                        "text-halo-width": 2,
                        "text-halo-blur": 1
                    }
                },
                {
                    "id": "	省道Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "layout": {
                        "text-size": 10,
                        "text-max-angle": 30,
                        "text-transform": "uppercase",
                        "symbol-spacing": 350,
                        "symbol-placement": "line",
                        "visibility": "visible",
                        "text-rotation-alignment": "map",
                        "text-pitch-alignment": "viewport",
                        "text-field": "{道路名称}"
                    },
                    "paint": {
                        "text-color": "#000",
                        "text-halo-color": "hsl(0, 0%, 100%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    12.99,
                                    0
                                ],
                                [
                                    13,
                                    1
                                ]
                            ]
                        },
                        "text-halo-width": 2,
                        "text-halo-blur": 1
                    }
                },

                {
                    "id": "立交桥名称P@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "立交桥名称P@北京",
                    "layout": {
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 14
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "长途汽车站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "长途汽车站@北京",
                    "layout": {
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "图书馆@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "图书馆@北京",
                    "layout": {
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "公园@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "公园@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "综合性广场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "综合性广场@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "旅游景点@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "旅游景点@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "医疗卫生@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "医疗卫生@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "娱乐场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "娱乐场所@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "大厦@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "大厦@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "文化场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "文化场所@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "运动场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "运动场所@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "交通运输@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "交通运输@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "其它@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "其它@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "filter": [
                        "==",
                        "NAME",
                        "公厕"
                    ],
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "服务行业@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "服务行业@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "其它@北京2",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "其它@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "filter": [
                        "==",
                        "NAME",
                        "停车场"
                    ],
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "邮政电信@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "邮政电信@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 10,
                        "text-max-width": 18
                    },

                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "商场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "商场@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "综合性商店@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "综合性商店@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "饭店@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "饭店@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "加油站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "加油站@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "建筑@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "建筑@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "码头@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "码头@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "机场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "机场@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "火车站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "火车站@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "地名@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "地名@北京",
                    "layout": {
                        "text-offset": [0, -0.3],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "rgba(255,255,255,0.75)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                }
            ]
        }
    },
    osm: {
        style: {
            "version": 8,
            "sources": {
                "vector-tiles": {
                    "attribution": attribution,
                    "type": "vector",
                    "tiles": [host + "/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature.mvt?returnAttributes=true&compressTolerance=-1&width=512&height=512&viewBounds={bbox-epsg-3857}&expands=0:0_2,132_128,138_64,141_32,143_16,145_8,147_4"]
                }
            },
            "sprite": "https://iclient.supermap.io/web/styles/osm/sprite",
            "glyphs": host + "/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature/sdffonts/{fontstack}/{range}.pbf",
            "layers": [
                {
                    "id": "background",
                    "type": "background",
                    "layout": {},
                    "paint": {
                        "background-color": "#f8f4f0"
                    }
                },
                {
                    "id": "界线@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "界线@北京",
                    "layout": {
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "#9e9cab",
                        "line-dasharray": [
                            3,
                            1,
                            1,
                            1
                        ],
                        "line-width": {
                            "base": 1.4,
                            "stops": [
                                [
                                    4,
                                    0.4
                                ],
                                [
                                    5,
                                    1
                                ],
                                [
                                    12,
                                    3
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "立交桥绿地R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "立交桥绿地R@北京",
                    "paint": {
                        "fill-color": "#6a4",
                        "fill-opacity": 0.1,
                        "fill-outline-color": "hsla(0, 0%, 0%, 0.03)",
                        "fill-antialias": true
                    }
                },
                {
                    "id": "绿地R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "绿地R@北京",
                    "paint": {
                        "fill-color": "#d8e8c8",
                        "fill-opacity": 1
                    }
                },
                {
                    "id": "	双线河R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "双线河R@北京",
                    "paint": {
                        "fill-color": "hsl(210, 67%, 85%)"
                    }
                },
                {
                    "id": "湖泊、水库R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "湖泊、水库R@北京",
                    "paint": {
                        "fill-color": "hsl(210, 67%, 85%)"
                    }
                },

                {
                    "id": "	四级道路L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "四级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "#cfcdca",
                        "line-opacity": 1,
                        "line-width": {
                            "base": 1.2,
                            "stops": [
                                [
                                    12,
                                    0.5
                                ],
                                [
                                    13,
                                    1
                                ],
                                [
                                    14,
                                    4
                                ],
                                [
                                    20,
                                    15
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	四级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "四级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "#fff",
                        "line-opacity": 1,
                        "line-width": {
                            "base": 1.2,
                            "stops": [
                                [
                                    13.5,
                                    0
                                ],
                                [
                                    14,
                                    2.5
                                ],
                                [
                                    20,
                                    11.5
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	三级道路L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "三级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "#cfcdca",
                        "line-opacity": 1,
                        "line-width": {
                            "base": 1.2,
                            "stops": [
                                [
                                    12,
                                    0.5
                                ],
                                [
                                    13,
                                    1
                                ],
                                [
                                    14,
                                    4
                                ],
                                [
                                    20,
                                    15
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	三级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "三级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "#fff",
                        "line-opacity": 1,
                        "line-width": {
                            "base": 1.2,
                            "stops": [
                                [
                                    13.5,
                                    0
                                ],
                                [
                                    14,
                                    2.5
                                ],
                                [
                                    20,
                                    11.5
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "二级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "二级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "#e9ac77",
                        "line-opacity": 1,
                        "line-width": {
                            "base": 1.2,
                            "stops": [
                                [
                                    8,
                                    1.5
                                ],
                                [
                                    20,
                                    17
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "二级道路L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "二级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "#fea",
                        "line-width": {
                            "base": 1.2,
                            "stops": [
                                [
                                    8,
                                    0.5
                                ],
                                [
                                    20,
                                    13
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	一级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "#e9ac77",
                        "line-opacity": 1,
                        "line-width": {
                            "base": 1.2,
                            "stops": [
                                [
                                    7,
                                    1.5
                                ],
                                [
                                    20,
                                    22
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	一级道路L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "#fea",
                        "line-width": {
                            "base": 1.2,
                            "stops": [
                                [
                                    7,
                                    0.5
                                ],
                                [
                                    20,
                                    18
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	省道L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "paint": {
                        "line-color": "#e9ac77",
                        "line-opacity": {
                            "stops": [
                                [
                                    5,
                                    0
                                ],
                                [
                                    6,
                                    1
                                ]
                            ]
                        },
                        "line-width": {
                            "base": 1.2,
                            "stops": [
                                [
                                    7,
                                    1.5
                                ],
                                [
                                    20,
                                    22
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	省道L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "#fea",
                        "line-width": {
                            "base": 1.2,
                            "stops": [
                                [
                                    7,
                                    0.5
                                ],
                                [
                                    20,
                                    18
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	高速公路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "高速公路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "#e9ac77",
                        "line-width": {
                            "base": 1.2,
                            "stops": [
                                [
                                    7,
                                    1.5
                                ],
                                [
                                    20,
                                    22
                                ]
                            ]
                        },
                        "line-opacity": 1
                    }
                },
                {
                    "id": "	高速公路L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "高速公路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "#fc8",
                        "line-width": {
                            "base": 1.2,
                            "stops": [
                                [
                                    7,
                                    0.5
                                ],
                                [
                                    20,
                                    18
                                ]
                            ]
                        }
                    }
                },


                {
                    "id": "区政府驻地@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "区政府驻地@北京",
                    "layout": {
                        "text-offset": [-1.5, -0.5],
                        "text-anchor": "bottom-left",
                        "text-field": "{NAME}",
                        "text-max-width": 7,
                        "text-font": [
                            "DIN Offc Pro Medium",
                            "Arial Unicode MS Regular"
                        ],
                        "text-size": 22
                    },
                    "paint": {
                        "text-color": "hsl(230, 8%, 62%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    11.99,
                                    1
                                ],
                                [
                                    12,
                                    0
                                ]
                            ]
                        },
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "标志建筑@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "标志建筑@北京",
                    "layout": {
                        "text-offset": [-1.5, -0.5],
                        "text-anchor": "bottom-left",
                        "text-field": "{NAME}",
                        "text-max-width": 7,
                        "text-size": 14
                    },
                    "paint": {
                        "text-color": "hsl(26, 25%, 32%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    10.99,
                                    0
                                ],
                                [
                                    11,
                                    1
                                ]
                            ]
                        },
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "	四级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "四级道路L@北京",
                    "layout": {
                        "text-size": {
                            "base": 1,
                            "stops": [
                                [
                                    13,
                                    12
                                ],
                                [
                                    14,
                                    13
                                ]
                            ]
                        },
                        "text-field": "{道路名称}",
                        "symbol-placement": "line",
                        "text-rotation-alignment": "map"
                    },
                    "paint": {
                        "text-halo-blur": 0.5,
                        "text-color": "#765",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    14.99,
                                    0
                                ],
                                [
                                    15,
                                    1
                                ]
                            ]
                        },
                        "text-halo-width": 1
                    }
                },
                {
                    "id": "	三级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "三级道路L@北京",
                    "layout": {
                        "text-size": {
                            "base": 1,
                            "stops": [
                                [
                                    13,
                                    12
                                ],
                                [
                                    14,
                                    13
                                ]
                            ]
                        },
                        "text-field": "{道路名称}",
                        "symbol-placement": "line",
                        "text-rotation-alignment": "map"
                    },
                    "paint": {
                        "text-halo-blur": 0.5,
                        "text-color": "#765",
                        "text-halo-width": 1
                    }
                },
                {
                    "id": "	二级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "二级道路L@北京",
                    "layout": {
                        "text-size": {
                            "base": 1,
                            "stops": [
                                [
                                    13,
                                    12
                                ],
                                [
                                    14,
                                    13
                                ]
                            ]
                        },
                        "text-field": "{道路名称}",
                        "symbol-placement": "line",
                        "text-rotation-alignment": "map"
                    },
                    "paint": {
                        "text-halo-blur": 0.5,
                        "text-color": "#765",
                        "text-halo-width": 1
                    }
                },
                {
                    "id": "	一级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "layout": {
                        "text-size": {
                            "base": 1,
                            "stops": [
                                [
                                    13,
                                    12
                                ],
                                [
                                    14,
                                    13
                                ]
                            ]
                        },
                        "text-field": "{道路名称}",
                        "symbol-placement": "line",
                        "text-rotation-alignment": "map"
                    },
                    "paint": {
                        "text-halo-blur": 0.5,
                        "text-color": "#765",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    13.99,
                                    0
                                ],
                                [
                                    14,
                                    1
                                ]
                            ]
                        },
                        "text-halo-width": 1
                    }
                },
                {
                    "id": "	省道Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "layout": {
                        "text-size": {
                            "base": 1,
                            "stops": [
                                [
                                    13,
                                    12
                                ],
                                [
                                    14,
                                    13
                                ]
                            ]
                        },
                        "text-field": "{道路名称}",
                        "symbol-placement": "line",
                        "text-rotation-alignment": "map"
                    },
                    "paint": {
                        "text-halo-blur": 0.5,
                        "text-color": "#765",
                        "text-halo-width": 1,
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    12.99,
                                    0
                                ],
                                [
                                    13,
                                    1
                                ]
                            ]
                        }
                    }
                },

                {
                    "id": "立交桥名称P@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "立交桥名称P@北京",
                    "layout": {
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "长途汽车站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "长途汽车站@北京",
                    "layout": {
                        "icon-image": "bus_11",
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "图书馆@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "图书馆@北京",
                    "layout": {
                        "icon-image": "library_11",
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "公园@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "公园@北京",
                    "layout": {
                        "icon-image": "park_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "综合性广场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "综合性广场@北京",
                    "layout": {
                        "icon-image": "campsite_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "旅游景点@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "旅游景点@北京",
                    "layout": {
                        "icon-image": "volcano_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "医疗卫生@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "医疗卫生@北京",
                    "layout": {
                        "icon-image": "hospital_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "娱乐场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "娱乐场所@北京",
                    "layout": {
                        "icon-image": "amusement_park_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "大厦@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "大厦@北京",
                    "layout": {
                        "icon-image": "picnic_site_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "文化场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "文化场所@北京",
                    "layout": {
                        "icon-image": "art_gallery_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "运动场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "运动场所@北京",
                    "layout": {
                        "icon-image": "bicycle_share_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "交通运输@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "交通运输@北京",
                    "layout": {
                        "icon-image": "bakery_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "其它@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "其它@北京",
                    "layout": {
                        "icon-image": "toilet_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "filter": [
                        "==",
                        "NAME",
                        "公厕"
                    ],
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "服务行业@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "服务行业@北京",
                    "layout": {
                        "icon-image": "embassy_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "其它@北京2",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "其它@北京",
                    "layout": {
                        "icon-image": "car_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "filter": [
                        "==",
                        "NAME",
                        "停车场"
                    ],
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "邮政电信@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "邮政电信@北京",
                    "layout": {
                        "icon-image": "post_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 10,
                        "text-max-width": 18
                    },

                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "商场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "商场@北京",
                    "layout": {
                        "icon-image": "grocery_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "综合性商店@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "综合性商店@北京",
                    "layout": {
                        "icon-image": "grocery_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "饭店@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "饭店@北京",
                    "layout": {
                        "icon-image": "restaurant_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "加油站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "加油站@北京",
                    "layout": {
                        "icon-image": "fuel_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "建筑@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "建筑@北京",
                    "layout": {
                        "icon-image": "place_of_worship_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "码头@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "码头@北京",
                    "layout": {
                        "icon-image": "harbor_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "机场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "机场@北京",
                    "layout": {
                        "icon-image": "airport_11",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "火车站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "火车站@北京",
                    "layout": {
                        "icon-image": "rail_15",
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "地名@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "地名@北京",
                    "layout": {
                        "icon-image": "dot_11",
                        "text-offset": [0, -0.3],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "#666",
                        "text-opacity": 1,
                        "text-halo-color": "#ffffff",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
            ]
        }
    },
    positron: {
        style: {
            "version": 8,
            "sources": {
                "vector-tiles": {
                    "attribution": attribution,
                    "type": "vector",
                    "tiles": [host + "/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature.mvt?returnAttributes=true&compressTolerance=-1&width=512&height=512&viewBounds={bbox-epsg-3857}&expands=0:0_2,132_128,138_64,141_32,143_16,145_8,147_4"]
                }
            },
            "glyphs": host + "/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature/sdffonts/{fontstack}/{range}.pbf",
            "layers": [
                {
                    "id": "background",
                    "type": "background",
                    "layout": {},
                    "paint": {
                        "background-color": "rgb(242,243,240)"
                    }
                },
                {
                    "id": "立交桥绿地R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "立交桥绿地R@北京",
                    "paint": {
                        "fill-color": "rgb(220,224,220)",
                        "fill-opacity": 1
                    }
                },
                {
                    "id": "绿地R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "绿地R@北京",
                    "paint": {
                        "fill-color": "rgb(220,224,220)",
                        "fill-opacity": 1
                    }
                },
                {
                    "id": "	双线河R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "双线河R@北京",
                    "paint": {
                        "fill-color": "rgb(194, 200, 202)",
                        "fill-antialias": true,
                        "fill-outline-color": {
                            "base": 1,
                            "stops": [
                                [
                                    10,
                                    "hsla(180, 6%, 63%, 0.82)"
                                ],
                                [
                                    22,
                                    "hsla(180, 6%, 63%, 0.18)"
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "湖泊、水库R@北京",
                    "type": "fill",
                    "source": "vector-tiles",
                    "source-layer": "湖泊、水库R@北京",
                    "paint": {
                        "fill-color": "rgb(194, 200, 202)",
                        "fill-antialias": true,
                        "fill-outline-color": {
                            "base": 1,
                            "stops": [
                                [
                                    10,
                                    "hsla(180, 6%, 63%, 0.82)"
                                ],
                                [
                                    22,
                                    "hsla(180, 6%, 63%, 0.18)"
                                ]
                            ]
                        }
                    }
                },

                {
                    "id": "	四级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "四级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "hsl(0, 0%, 88%)",
                        "line-width": {
                            "base": 1.55,
                            "stops": [
                                [
                                    13,
                                    1.8
                                ],
                                [
                                    20,
                                    20
                                ]
                            ]
                        },
                        "line-opacity": 0.9
                    }
                },
                {
                    "id": "	三级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "三级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "#fff",
                        "line-width": {
                            "base": 1.3,
                            "stops": [
                                [
                                    10,
                                    2
                                ],
                                [
                                    20,
                                    20
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	二级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "二级道路L@北京",
                    "layout": {
                        "line-cap": "butt",
                        "line-join": "miter",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "rgb(213, 213, 213)",
                        "line-dasharray": [
                            12,
                            0
                        ],
                        "line-width": {
                            "base": 1.3,
                            "stops": [
                                [
                                    10,
                                    3
                                ],
                                [
                                    20,
                                    23
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	二级道路L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "二级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "#fff",
                        "line-width": {
                            "base": 1.3,
                            "stops": [
                                [
                                    10,
                                    2
                                ],
                                [
                                    20,
                                    20
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "一级道路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "layout": {
                        "line-cap": "butt",
                        "line-join": "miter",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "rgb(213, 213, 213)",
                        "line-width": {
                            "base": 1.4,
                            "stops": [
                                [
                                    6,
                                    3
                                ],
                                [
                                    20,
                                    40
                                ]
                            ]
                        },
                        "line-dasharray": [
                            2,
                            0
                        ],
                        "line-opacity": 1
                    }
                },
                {
                    "id": "一级道路L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "#fff",
                        "line-width": {
                            "base": 1.4,
                            "stops": [
                                [
                                    6,
                                    1.3
                                ],
                                [
                                    20,
                                    30
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	省道L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "layout": {
                        "line-cap": "butt",
                        "line-join": "miter",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "rgb(213, 213, 213)",
                        "line-width": {
                            "base": 1.4,
                            "stops": [
                                [
                                    6,
                                    3
                                ],
                                [
                                    20,
                                    40
                                ]
                            ]
                        },
                        "line-dasharray": [
                            2,
                            0
                        ],
                        "line-opacity": 1
                    }
                },
                {
                    "id": "	省道L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "#fff",
                        "line-width": {
                            "base": 1.4,
                            "stops": [
                                [
                                    6,
                                    1.3
                                ],
                                [
                                    20,
                                    30
                                ]
                            ]
                        }
                    }
                },
                {
                    "id": "	高速公路L@北京",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "高速公路L@北京",
                    "layout": {
                        "line-cap": "butt",
                        "line-join": "miter",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": "rgb(213, 213, 213)",
                        "line-width": {
                            "base": 1.4,
                            "stops": [
                                [
                                    5.8,
                                    0
                                ],
                                [
                                    6,
                                    3
                                ],
                                [
                                    20,
                                    40
                                ]
                            ]
                        },
                        "line-dasharray": [
                            2,
                            0
                        ],
                        "line-opacity": 1
                    }
                },
                {
                    "id": "	高速公路L@北京1",
                    "type": "line",
                    "source": "vector-tiles",
                    "source-layer": "高速公路L@北京",
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round",
                        "visibility": "visible"
                    },
                    "paint": {
                        "line-color": {
                            "base": 1,
                            "stops": [
                                [
                                    5.8,
                                    "hsla(0, 0%, 85%, 0.53)"
                                ],
                                [
                                    6,
                                    "#fff"
                                ]
                            ]
                        },
                        "line-width": {
                            "base": 1.4,
                            "stops": [
                                [
                                    4,
                                    2
                                ],
                                [
                                    6,
                                    1.3
                                ],
                                [
                                    20,
                                    30
                                ]
                            ]
                        }
                    }
                },


                {
                    "id": "区政府驻地@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "区政府驻地@北京",
                    "layout": {
                        "text-offset": [-1.5, -0.5],
                        "text-anchor": "bottom-left",
                        "text-field": "{NAME}",
                        "text-max-width": 7,
                        "text-font": [
                            "DIN Offc Pro Medium",
                            "Arial Unicode MS Regular"
                        ],
                        "text-size": 22
                    },
                    "paint": {
                        "text-color": "hsl(230, 8%, 62%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    11.99,
                                    1
                                ],
                                [
                                    12,
                                    0
                                ]
                            ]
                        },
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "标志建筑@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "标志建筑@北京",
                    "layout": {
                        "text-offset": [-1.5, -0.5],
                        "text-anchor": "bottom-left",
                        "text-field": "{NAME}",
                        "text-max-width": 7,
                        "text-size": 14
                    },
                    "paint": {
                        "text-color": "hsl(26, 25%, 32%)",
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    10.99,
                                    0
                                ],
                                [
                                    11,
                                    1
                                ]
                            ]
                        },
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "	四级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "四级道路L@北京",
                    "layout": {
                        "text-size": 10,
                        "text-max-angle": 30,
                        "text-transform": "uppercase",
                        "symbol-spacing": 350,
                        "symbol-placement": "line",
                        "visibility": "visible",
                        "text-rotation-alignment": "map",
                        "text-pitch-alignment": "viewport",
                        "text-field": "{道路名称}"
                    },
                    "paint": {
                        "text-color": "#bbb",
                        "text-halo-color": "#fff",
                        "text-translate": [
                            0,
                            0
                        ],
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    13.99,
                                    0
                                ],
                                [
                                    14,
                                    1
                                ]
                            ]
                        },
                        "text-halo-width": 2,
                        "text-halo-blur": 1
                    }
                },
                {
                    "id": "	三级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "三级道路L@北京",
                    "layout": {
                        "text-size": 10,
                        "text-max-angle": 30,
                        "text-transform": "uppercase",
                        "symbol-spacing": 350,
                        "symbol-placement": "line",
                        "visibility": "visible",
                        "text-rotation-alignment": "map",
                        "text-pitch-alignment": "viewport",
                        "text-field": "{道路名称}"
                    },
                    "paint": {
                        "text-color": "#bbb",
                        "text-halo-color": "#fff",
                        "text-translate": [
                            0,
                            0
                        ],
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    13.99,
                                    0
                                ],
                                [
                                    14,
                                    1
                                ]
                            ]
                        },
                        "text-halo-width": 2,
                        "text-halo-blur": 1
                    }
                },
                {
                    "id": "	二级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "二级道路L@北京",
                    "layout": {
                        "text-size": 10,
                        "text-max-angle": 30,
                        "text-transform": "uppercase",
                        "symbol-spacing": 350,
                        "symbol-placement": "line",
                        "visibility": "visible",
                        "text-rotation-alignment": "map",
                        "text-pitch-alignment": "viewport",
                        "text-field": "{道路名称}"
                    },
                    "paint": {
                        "text-color": "#bbb",
                        "text-halo-color": "#fff",
                        "text-translate": [
                            0,
                            0
                        ],
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    13.99,
                                    0
                                ],
                                [
                                    14,
                                    1
                                ]
                            ]
                        },
                        "text-halo-width": 2,
                        "text-halo-blur": 1
                    }
                },
                {
                    "id": "	一级道路Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "一级道路L@北京",
                    "layout": {
                        "text-size": 10,
                        "text-max-angle": 30,
                        "text-transform": "uppercase",
                        "symbol-spacing": 350,
                        "symbol-placement": "line",
                        "visibility": "visible",
                        "text-rotation-alignment": "map",
                        "text-pitch-alignment": "viewport",
                        "text-field": "{道路名称}"
                    },
                    "paint": {
                        "text-color": "#bbb",
                        "text-halo-color": "#fff",
                        "text-translate": [
                            0,
                            0
                        ],
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    12.99,
                                    0
                                ],
                                [
                                    13,
                                    1
                                ]
                            ]
                        },
                        "text-halo-width": 2,
                        "text-halo-blur": 1
                    }
                },
                {
                    "id": "	省道Name",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "省道L@北京",
                    "layout": {
                        "text-size": 10,
                        "text-max-angle": 30,
                        "text-transform": "uppercase",
                        "symbol-spacing": 350,
                        "symbol-placement": "line",
                        "visibility": "visible",
                        "text-rotation-alignment": "map",
                        "text-pitch-alignment": "viewport",
                        "text-field": "{道路名称}"
                    },
                    "paint": {
                        "text-color": "#bbb",
                        "text-halo-color": "#fff",
                        "text-translate": [
                            0,
                            0
                        ],
                        "text-opacity": {
                            "base": 1,
                            "stops": [
                                [
                                    12.99,
                                    0
                                ],
                                [
                                    13,
                                    1
                                ]
                            ]
                        },
                        "text-halo-width": 2,
                        "text-halo-blur": 1
                    }
                },

                {
                    "id": "立交桥名称P@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "立交桥名称P@北京",
                    "layout": {
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 14
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "长途汽车站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "长途汽车站@北京",
                    "layout": {
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "图书馆@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "图书馆@北京",
                    "layout": {
                        "text-offset": [-1, -1],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "公园@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "公园@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "综合性广场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "综合性广场@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "旅游景点@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "旅游景点@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "医疗卫生@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "医疗卫生@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "娱乐场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "娱乐场所@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "大厦@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "大厦@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "文化场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "文化场所@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "运动场所@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "运动场所@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "交通运输@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "交通运输@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "其它@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "其它@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "filter": [
                        "==",
                        "NAME",
                        "公厕"
                    ],
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "服务行业@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "服务行业@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "其它@北京2",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "其它@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "filter": [
                        "==",
                        "NAME",
                        "停车场"
                    ],
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "邮政电信@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "邮政电信@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 10,
                        "text-max-width": 18
                    },

                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "商场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "商场@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "综合性商店@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "综合性商店@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "饭店@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "饭店@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "加油站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "加油站@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "建筑@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "建筑@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "码头@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "码头@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "机场@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "机场@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "火车站@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "火车站@北京",
                    "layout": {
                        "text-offset": [0, -0.5],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },
                {
                    "id": "地名@北京",
                    "type": "symbol",
                    "source": "vector-tiles",
                    "source-layer": "地名@北京",
                    "layout": {
                        "text-offset": [0, -0.3],
                        "text-anchor": "bottom",
                        "text-field": "{NAME}",
                        "text-size": 12
                    },
                    "paint": {
                        "text-color": "rgb(117, 129, 145)",
                        "text-opacity": 1,
                        "text-halo-color": "rgb(242,243,240)",
                        "text-halo-width": 1,
                        "text-halo-blur": 1
                    }

                },]
        }
    },
};