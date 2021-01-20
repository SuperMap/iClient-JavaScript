// 房产项目可视化监控平台大屏范例的图表数据
var estatePlatformDatas = {
    "saleAmountOption": {
        "backgroundColor": "",
        "yAxis": {
            "axisLabel": {
                "rotate": 0,
                "fontFamily": "MicrosoftYaHei",
                "color": "#fff"
            },
            "axisLine": {
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "name": "",
            "show": true,
            "splitLine": {
                "lineStyle": {
                    "color": "#E9E9E9",
                    "width": 0.3,
                    "type": "solid"
                },
                "show": false
            },
            "splitArea": {
                "show": false
            },
            "nameGap": 5,
            "scale": true,
            "nameLocation": "end",
            "type": "value",
            "nameTextStyle": {
                "padding": [0, 0, 5, 0]
            }
        },
        "xAxis": {
            "axisLabel": {
                "rotate": 0,
                "fontFamily": "MicrosoftYaHei",
                "color": "#fff"
            },
            "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            "axisLine": {
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "show": true,
            "name": "",
            "axisTick": {
                "alignWithLabel": true
            },
            "splitLine": {
                "lineStyle": {
                    "color": "#E9E9E9",
                    "type": "solid"
                },
                "show": false
            },
            "nameGap": 2,
            "nameLocation": "end",
            "type": "category"
        },
        // "color": ["#15D1F2", "#499BFF", "#2C61FF", "#243BCC", "#67A9FF"],
        "grid": {
            "top": 35,
            "left": 50,
            "bottom": 25
        },
        "legend": {
            "data": ["Y1", "Y3"],
            "show": false,
            "textStyle": {
                "color": "#ffffff"
            },
            "type": "scroll"
        },
        "series": [
            {
                "data": ["100", "520", "2000", "3340", "3900", "3300", "2500"],
                "name": "Y1",
                "emphasis": {
                    "itemStyle": {
                        "color": "#A8CFFF"
                    }
                },
                "type": "bar"
            },
            {
                "data": ["1", "1", "0", "0", "0", "1", "0"],
                "name": "Y3",
                "emphasis": {
                    "itemStyle": {
                        "color": "#A8CFFF"
                    }
                },
                "type": "bar"
            }
        ],
        "tooltip": {
            "axisPointer": {
                "shadowStyle": {
                    "color": "rgba(231,243,252,0)"
                },
                "type": "shadow"
            },
            "trigger": "axis",
            "textStyle": {
                "align": "left"
            }
        },
        "textStyle": {
            "fontFamily": "Microsoft YaHei Light"
        },
        "title": {
            "padding": [5, 0, 0, 20],
            "x": "left",
            "text": "",
            "textStyle": {
                "fontFamily": "Microsoft YaHei Light",
                "color": "#ffffff",
                "fontWeight": "100"
            }
        }
    },
    "saleReturnOption": {
        "backgroundColor": "",
        "yAxis": {
            "axisLabel": {
                "rotate": 0,
                "fontFamily": "MicrosoftYaHei",
                "color": "#fff"
            },
            "axisLine": {
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "name": "",
            "show": true,
            "splitLine": {
                "lineStyle": {
                    "color": "#E9E9E9",
                    "width": 0.3,
                    "type": "solid"
                },
                "show": false
            },
            "splitArea": {
                "show": false
            },
            "nameGap": 5,
            "scale": true,
            "nameLocation": "end",
            "type": "value",
            "nameTextStyle": {
                "padding": [0, 0, 5, 0]
            }
        },
        "xAxis": {
            "axisLabel": {
                "rotate": 0,
                "fontFamily": "MicrosoftYaHei",
                "color": "#fff"
            },
            "data": ["Mon", "Tue", "Wed", "Sun", "Sat", "Thu", "Fri"],
            "axisLine": {
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "show": true,
            "name": "",
            "axisTick": {
                "alignWithLabel": true
            },
            "splitLine": {
                "lineStyle": {
                    "color": "#E9E9E9",
                    "type": "solid"
                },
                "show": false
            },
            "nameGap": 2,
            "nameLocation": "end",
            "type": "category",
            "boundaryGap": false
        },
        // "color": ["#15D1F2", "#499BFF", "#2C61FF", "#243BCC", "#67A9FF"],
        "grid": {
            "top": 35,
            "left": 50,
            "bottom": 25
        },
        "legend": {
            "data": ["Y1"],
            "show": false,
            "textStyle": {
                "color": "#ffffff"
            },
            "type": "scroll"
        },
        "series": [
            {
                "data": ["100", "520", "2000", "2500", "3300", "3340", "3900"],
                "name": "Y1",
                "emphasis": {
                    "itemStyle": {
                        "color": "#A8CFFF"
                    }
                },
                "type": "line"
            }
        ],
        "tooltip": {
            "axisPointer": {
                "shadowStyle": {
                    "color": "rgba(231,243,252,0.4)"
                },
                "type": "line"
            },
            "trigger": "axis",
            "textStyle": {
                "align": "left"
            }
        },
        "textStyle": {
            "fontFamily": "Microsoft YaHei Light"
        },
        "title": {
            "padding": [5, 0, 0, 20],
            "x": "left",
            "text": "",
            "textStyle": {
                "fontFamily": "Microsoft YaHei Light",
                "color": "#ffffff",
                "fontWeight": "100"
            }
        }
    },
    "stockIndexOption": {
        "backgroundColor": "",
        "yAxis": {
            "axisLabel": {
                "rotate": 0,
                "fontFamily": "MicrosoftYaHei",
                "color": "#fff"
            },
            "axisLine": {
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "name": "",
            "show": true,
            "splitLine": {
                "lineStyle": {
                    "color": "#E9E9E9",
                    "width": 0.3,
                    "type": "solid"
                },
                "show": false
            },
            "splitArea": {
                "show": false
            },
            "nameGap": 5,
            "scale": true,
            "nameLocation": "end",
            "type": "value",
            "nameTextStyle": {
                "padding": [0, 0, 5, 0]
            }
        },
        "xAxis": {
            "axisLabel": {
                "rotate": 0,
                "fontFamily": "MicrosoftYaHei",
                "color": "#fff"
            },
            "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            "axisLine": {
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "show": true,
            "name": "",
            "axisTick": {
                "alignWithLabel": true
            },
            "splitLine": {
                "lineStyle": {
                    "color": "#E9E9E9",
                    "type": "solid"
                },
                "show": false
            },
            "nameGap": 2,
            "nameLocation": "end",
            "type": "category"
        },
        // "color": ["#BCE4E9", "#7AC2D0", "#53A8B6", "#2D808D", "#F1FDFF"],
        "grid": {
            "top": 35,
            "left": 50,
            "bottom": 25
        },
        "legend": {
            "data": ["Y2", "Y1", "Y3"],
            "show": false,
            "textStyle": {
                "color": "#ffffff"
            },
            "type": "scroll"
        },
        "series": [
            {
                "data": ["500", "800", "3000", "3617", "3400", "4200", "1842"],
                "name": "Y2",
                "emphasis": {
                    "itemStyle": {
                        "color": "#9BF1FF"
                    }
                },
                "type": "bar"
            },
            {
                "data": ["100", "520", "2000", "3340", "3900", "3300", "2500"],
                "name": "Y1",
                "emphasis": {
                    "itemStyle": {
                        "color": "#9BF1FF"
                    }
                },
                "type": "bar"
            },
            {
                "data": ["1", "1", "0", "0", "0", "1", "0"],
                "name": "Y3",
                "emphasis": {
                    "itemStyle": {
                        "color": "#9BF1FF"
                    }
                },
                "type": "bar"
            }
        ],
        "tooltip": {
            "axisPointer": {
                "shadowStyle": {
                    "color": "rgba(231,243,252,0)"
                },
                "type": "shadow"
            },
            "trigger": "axis",
            "textStyle": {
                "align": "left"
            }
        },
        "textStyle": {
            "fontFamily": "Microsoft YaHei Light"
        },
        "title": {
            "padding": [5, 0, 0, 20],
            "x": "left",
            "text": "",
            "textStyle": {
                "fontFamily": "Microsoft YaHei Light",
                "color": "#ffffff",
                "fontWeight": "100"
            }
        }
    },
    "projectCostOption": {
        "backgroundColor": "",
        "radar": {
            "indicator": [
                {
                    "max": "500",
                    "name": "Mon"
                },
                {
                    "max": "800",
                    "name": "Tue"
                },
                {
                    "max": "3000",
                    "name": "Wed"
                },
                {
                    "max": "3617",
                    "name": "Thu"
                },
                {
                    "max": "3400",
                    "name": "Fri"
                },
                {
                    "max": "4200",
                    "name": "Sat"
                },
                {
                    "max": "1842",
                    "name": "Sun"
                }
            ],
            "shape": "circle",
            "splitArea": {
                "show": false
            },
            "axisLine": {
                "lineStyle": {
                    "color": "rgba(255, 255, 255, 0.3)"
                }
            },
            "name": {
                "textStyle": {
                    "color": "rgb(255, 255, 255)"
                }
            },
            "splitLine": {
                "lineStyle": {
                    "color": [
                        "rgba(255, 255, 255, 1)",
                        "rgba(255, 255, 255, 0.8)",
                        "rgba(255, 255, 255, 0.6)",
                        "rgba(255, 255, 255, 0.4)",
                        "rgba(255, 255, 255, 0.2)",
                        "rgba(255, 255, 255, 0.1)"
                    ]
                }
            },
            "splitNumber": 5,
            "radius": "70%"
        },
        // "color": ["#00E9FF", "#BBE7FF", "#6AE5C1", "#46ABFF", "#363EFF"],
        "grid": {
            "top": 35,
            "left": 50,
            "bottom": 25
        },
        "legend": {
            "data": ["Y1"],
            "show": false,
            "textStyle": {
                "color": "#ffffff"
            },
            "type": "scroll"
        },
        "series": [
            {
                "barWidth": "60%",
                "data": [
                    {
                        "name": "Y1",
                        "value": ["100", "520", "2000", "3340", "3900", "3300", "2500"]
                    }
                ],
                "name": "示范数据",
                "emphasis": {
                    "itemStyle": {
                        "color": "#759CFF"
                    }
                },
                "type": "radar"
            }
        ],
        "tooltip": {
            "axisPointer": {
                "shadowStyle": {
                    "color": "rgba(231,243,252,0)"
                },
                "type": "shadow"
            },
            "trigger": "axis",
            "textStyle": {
                "align": "left"
            }
        },
        "textStyle": {
            "fontFamily": "Microsoft YaHei Light"
        },
        "title": {
            "padding": [5, 0, 0, 20],
            "x": "left",
            "text": "",
            "textStyle": {
                "fontFamily": "Microsoft YaHei Light",
                "color": "#ffffff",
                "fontWeight": "100"
            }
        }
    },
    "revenueOption": {
        "backgroundColor": "",
        "yAxis": {
            "axisLabel": {
                "rotate": 0,
                "fontFamily": "MicrosoftYaHei",
                "color": "#fff"
            },
            "axisLine": {
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "name": "",
            "show": true,
            "splitLine": {
                "lineStyle": {
                    "color": "#E9E9E9",
                    "width": 0.3,
                    "type": "solid"
                },
                "show": false
            },
            "splitArea": {
                "show": false
            },
            "nameGap": 5,
            "scale": true,
            "nameLocation": "end",
            "type": "value",
            "nameTextStyle": {
                "padding": [0, 0, 5, 0]
            }
        },
        "xAxis": {
            "axisLabel": {
                "rotate": 0,
                "fontFamily": "MicrosoftYaHei",
                "color": "#fff"
            },
            "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            "axisLine": {
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "show": true,
            "name": "",
            "axisTick": {
                "alignWithLabel": true
            },
            "splitLine": {
                "lineStyle": {
                    "color": "#E9E9E9",
                    "type": "solid"
                },
                "show": false
            },
            "nameGap": 2,
            "nameLocation": "end",
            "type": "category"
        },
        // "color": ["#00E9FF", "#BBE7FF", "#6AE5C1", "#46ABFF", "#363EFF"],
        "grid": {
            "top": 35,
            "left": 50,
            "bottom": 25
        },
        "legend": {
            "data": ["Y2", "Y3"],
            "show": false,
            "textStyle": {
                "color": "#ffffff"
            },
            "type": "scroll"
        },
        "series": [
            {
                "data": ["500", "800", "3000", "3617", "3400", "4200", "1842"],
                "name": "Y2",
                "emphasis": {
                    "itemStyle": {
                        "color": "#759CFF"
                    }
                },
                "type": "bar"
            },
            {
                "data": ["1", "1", "0", "0", "0", "1", "0"],
                "name": "Y3",
                "emphasis": {
                    "itemStyle": {
                        "color": "#759CFF"
                    }
                },
                "type": "bar"
            }
        ],
        "tooltip": {
            "axisPointer": {
                "shadowStyle": {
                    "color": "rgba(231,243,252,0)"
                },
                "type": "shadow"
            },
            "trigger": "axis",
            "textStyle": {
                "align": "left"
            }
        },
        "textStyle": {
            "fontFamily": "Microsoft YaHei Light"
        },
        "title": {
            "padding": [5, 0, 0, 20],
            "x": "left",
            "text": "",
            "textStyle": {
                "fontFamily": "Microsoft YaHei Light",
                "color": "#ffffff",
                "fontWeight": "100"
            }
        }
    },
    "investProfitOption": {
        "backgroundColor": "",
        "yAxis": {
            "axisLabel": {
                "rotate": 0,
                "fontFamily": "MicrosoftYaHei",
                "color": "#fff"
            },
            "axisLine": {
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "name": "",
            "show": true,
            "splitLine": {
                "lineStyle": {
                    "color": "#E9E9E9",
                    "width": 0.3,
                    "type": "solid"
                },
                "show": false
            },
            "splitArea": {
                "show": false
            },
            "nameGap": 5,
            "scale": true,
            "nameLocation": "end",
            "type": "value",
            "nameTextStyle": {
                "padding": [0, 0, 5, 0]
            }
        },
        "xAxis": {
            "axisLabel": {
                "rotate": 0,
                "fontFamily": "MicrosoftYaHei",
                "color": "#fff"
            },
            "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            "axisLine": {
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "show": true,
            "name": "",
            "axisTick": {
                "alignWithLabel": true
            },
            "splitLine": {
                "lineStyle": {
                    "color": "#E9E9E9",
                    "type": "solid"
                },
                "show": false
            },
            "nameGap": 2,
            "nameLocation": "end",
            "type": "category"
        },
        // "color": ["#BCE4E9", "#7AC2D0", "#53A8B6", "#2D808D", "#F1FDFF"],
        "grid": {
            "top": 35,
            "left": 50,
            "bottom": 25
        },
        "legend": {
            "data": ["Y2", "Y1", "Y3"],
            "show": false,
            "textStyle": {
                "color": "#ffffff"
            },
            "type": "scroll"
        },
        "series": [
            {
                "data": ["500", "800", "3000", "3617", "3400", "4200", "1842"],
                "name": "Y2",
                "emphasis": {
                    "itemStyle": {
                        "color": "#9BF1FF"
                    }
                },
                "type": "bar"
            },
            {
                "data": ["100", "520", "2000", "3340", "3900", "3300", "2500"],
                "name": "Y1",
                "emphasis": {
                    "itemStyle": {
                        "color": "#9BF1FF"
                    }
                },
                "type": "bar"
            },
            {
                "data": ["1", "1", "0", "0", "0", "1", "0"],
                "name": "Y3",
                "emphasis": {
                    "itemStyle": {
                        "color": "#9BF1FF"
                    }
                },
                "type": "bar"
            }
        ],
        "tooltip": {
            "axisPointer": {
                "shadowStyle": {
                    "color": "rgba(231,243,252,0)"
                },
                "type": "shadow"
            },
            "trigger": "axis",
            "textStyle": {
                "align": "left"
            }
        },
        "textStyle": {
            "fontFamily": "Microsoft YaHei Light"
        },
        "title": {
            "padding": [5, 0, 0, 20],
            "x": "left",
            "text": "",
            "textStyle": {
                "fontFamily": "Microsoft YaHei Light",
                "color": "#ffffff",
                "fontWeight": "100"
            }
        }
    },
    "stockSituationOption": {
        "backgroundColor": "",
        "yAxis": {
            "axisLabel": {
                "rotate": 0,
                "fontFamily": "MicrosoftYaHei",
                "color": "#fff"
            },
            "axisLine": {
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "name": "",
            "show": true,
            "splitLine": {
                "lineStyle": {
                    "color": "#E9E9E9",
                    "width": 0.3,
                    "type": "solid"
                },
                "show": false
            },
            "splitArea": {
                "show": false
            },
            "nameGap": 5,
            "scale": true,
            "nameLocation": "end",
            "type": "value",
            "nameTextStyle": {
                "padding": [0, 0, 5, 0]
            }
        },
        "xAxis": {
            "axisLabel": {
                "rotate": 0,
                "fontFamily": "MicrosoftYaHei",
                "color": "#fff"
            },
            "data": ["Fri", "Thu", "Sat", "Sun", "Wed", "Tue", "Mon"],
            "axisLine": {
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "show": true,
            "name": "",
            "axisTick": {
                "alignWithLabel": true
            },
            "splitLine": {
                "lineStyle": {
                    "color": "#E9E9E9",
                    "type": "solid"
                },
                "show": false
            },
            "nameGap": 2,
            "nameLocation": "end",
            "type": "category",
            "boundaryGap": false
        },
        // "color": ["#15D1F2", "#499BFF", "#2C61FF", "#243BCC", "#67A9FF"],
        "grid": {
            "top": 35,
            "left": 50,
            "bottom": 25
        },
        "legend": {
            "data": ["Y1", "Y2"],
            "show": false,
            "textStyle": {
                "color": "#ffffff"
            },
            "type": "scroll"
        },
        "series": [
            {
                "data": ["3900", "3340", "3300", "2500", "2000", "520", "100"],
                "name": "Y1",
                "emphasis": {
                    "itemStyle": {
                        "color": "#A8CFFF"
                    }
                },
                "type": "line"
            },
            {
                "data": ["3400", "3617", "4200", "1842", "3000", "800", "500"],
                "name": "Y2",
                "emphasis": {
                    "itemStyle": {
                        "color": "#A8CFFF"
                    }
                },
                "type": "line"
            }
        ],
        "tooltip": {
            "axisPointer": {
                "shadowStyle": {
                    "color": "rgba(231,243,252,0.4)"
                },
                "type": "line"
            },
            "trigger": "axis",
            "textStyle": {
                "align": "left"
            }
        },
        "textStyle": {
            "fontFamily": "Microsoft YaHei Light"
        },
        "title": {
            "padding": [5, 0, 0, 20],
            "x": "left",
            "text": "",
            "textStyle": {
                "fontFamily": "Microsoft YaHei Light",
                "color": "#ffffff",
                "fontWeight": "100"
            }
        }
    }
};
