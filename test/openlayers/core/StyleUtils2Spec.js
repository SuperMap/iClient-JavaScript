import {StyleUtils} from '../../../src/openlayers/core/StyleUtils.js';

describe('openlayers_StyleUtils2', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //测试formatRGB方法
    it('formatRGB', () => {
        var colorArray1 = [255, 0, 0];
        var colorArray2 = [255, 0, 0, 0.5];
        expect(StyleUtils.formatRGB(colorArray1)).toEqual('rgb(255,0,0)');
        expect(StyleUtils.formatRGB(colorArray2)).toEqual('rgba(255,0,0,0.5)');
    });

    //测试getPositionX方法
    it('getPositionX', () => {
        var canvasWidth = 100;
        // 减去doublePadding (16)后计算: 84/2=42, 84
        expect(StyleUtils.getPositionX('left', canvasWidth)).toEqual(8);
        expect(StyleUtils.getPositionX('center', canvasWidth)).toEqual(42);
        expect(StyleUtils.getPositionX('right', canvasWidth)).toEqual(84);
        expect(StyleUtils.getPositionX('other', canvasWidth)).toEqual(8);
    });

    //测试getCanvasWidth方法
    it('getCanvasWidth', () => {
        var lineWidths1 = [50, 60, 70];
        var lineWidths2 = [50, 120, 70]; // 120 > maxWidth(100)
        var maxWidth = 100;
        // 最大宽度是70，加上doublePadding (16)
        expect(StyleUtils.getCanvasWidth(lineWidths1, maxWidth)).toEqual(86); 
        // 超过maxWidth，返回maxWidth + doublePadding
        expect(StyleUtils.getCanvasWidth(lineWidths2, maxWidth)).toEqual(116); 
    });

    //测试getPathway方法
    it('getPathway', () => {
        var style = {
            strokeWidth: 2,
            strokeColor: '#ff0000',
            strokeOpacity: 0.8
        };
        
        var outlineStyle = {
            strokeColor: '#0000ff'
        };

        var pathwayStyles = StyleUtils.getPathway(style, outlineStyle);
        expect(pathwayStyles.length).toEqual(2);
        expect(pathwayStyles[0].getStroke().getWidth()).toEqual(2);
        expect(pathwayStyles[1].getStroke().getWidth()).toEqual(1);
    });

    //测试getRoadPath方法
    it('getRoadPath', () => {
        var style = {
            strokeWidth: 4,
            strokeColor: '#ff0000',
            strokeOpacity: 0.8
        };
        
        var outlineStyle = {
            strokeColor: '#0000ff',
            strokeWidth: 6
        };

        var roadPathStyles = StyleUtils.getRoadPath(style, outlineStyle);
        expect(roadPathStyles.length).toEqual(2);
        expect(roadPathStyles[0].getStroke().getWidth()).toEqual(6);
        expect(roadPathStyles[1].getStroke().getWidth()).toEqual(4);
    });

    //测试canvasTextAutoLine方法
    it('canvasTextAutoLine', (done) => {
        var canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 100;
        var ctx = canvas.getContext('2d');
        
        var style = {
            font: '12px Arial',
            textAlign: 'left',
            fillColor: '#000000',
            maxWidth: 100
        };
        
        var lineHeight = 12;
        var canvasWidth = 100;
        
        // Mock positionY
        StyleUtils.positionY = 8;
        
        // 由于该方法直接操作canvas上下文，我们只能验证它不会抛出异常
        expect(() => {
            StyleUtils.canvasTextAutoLine('Test text', style, ctx, lineHeight, canvasWidth);
        }).not.toThrow();
        
        done();
    });

    //测试drawRect方法
    it('drawRect', () => {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        
        var style = {
            backgroundFill: '#ff0000',
            maxWidth: 100
        };
        
        var textArray = ['Test'];
        var lineHeight = 12;
        
        var size = StyleUtils.drawRect(ctx, style, textArray, lineHeight, canvas);
        expect(size).not.toBeNull();
        expect(size.width).toBeGreaterThan(0);
        expect(size.height).toBeGreaterThan(0);
    });

    //测试createCanvas方法
    it('createCanvas', () => {
        var style = {};
        var canvas = StyleUtils.createCanvas(style);
        expect(canvas).not.toBeNull();
        expect(canvas instanceof HTMLCanvasElement).toBe(true);
        expect(canvas.id).toContain('textCanvas');
    });

    //测试getCanvas方法
    it('getCanvas', () => {
        var style = {
            font: '12px Arial',
            text: 'Test text',
            backgroundFill: '#ff0000',
            maxWidth: 100
        };
        
        var result = StyleUtils.getCanvas(style);
        expect(result).not.toBeNull();
        expect(result.canvas).not.toBeNull();
        expect(result.width).toBeGreaterThan(0);
        expect(result.height).toBeGreaterThan(0);
    });

    //测试getStyleFromCarto方法
    it('getStyleFromCarto_point', () => {
        var zoom = 10;
        var scale = 0.0001;
        var shader = [];
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POINT';
                    }
                };
            },
            getProperties: function() {
                return {
                    id: 1,
                    type: 'POINT'
                };
            }
        };
        var fromServer = true;
        var url = 'http://test.com';
        
        var style = StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, fromServer, url);
        expect(style).not.toBeNull();
        expect(style.getImage()).not.toBeNull();
    });

    it('getStyleFromCarto_line', () => {
        var zoom = 10;
        var scale = 0.0001;
        var shader = [];
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'LINESTRING';
                    }
                };
            },
            getProperties: function() {
                return {
                    id: 1,
                    type: 'LINESTRING'
                };
            }
        };
        var fromServer = true;
        var url = 'http://test.com';
        
        var style = StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, fromServer, url);
        expect(style).not.toBeNull();
        expect(style.getStroke()).not.toBeNull();
    });

    it('getStyleFromCarto_polygon', () => {
        var zoom = 10;
        var scale = 0.0001;
        var shader = [];
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POLYGON';
                    }
                };
            },
            getProperties: function() {
                return {
                    id: 1,
                    type: 'POLYGON'
                };
            }
        };
        var fromServer = true;
        var url = 'http://test.com';
        
        var style = StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, fromServer, url);
        expect(style).not.toBeNull();
        expect(style.getFill()).not.toBeNull();
        expect(style.getStroke()).not.toBeNull();
    });
    
    it('getStyleFromCarto_text_feature', () => {
        var zoom = 10;
        var scale = 0.0001;
        var shader = [];
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POINT';
                    }
                };
            },
            getProperties: function() {
                return {
                    id: 1,
                    type: 'TEXT'
                };
            }
        };
        var fromServer = true;
        var url = 'http://test.com';
        
        var style = StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, fromServer, url);
        expect(style).not.toBeNull();
        expect(style.getText()).not.toBeNull();
    });
    
    it('getStyleFromCarto_shader_with_fontSize', () => {
        var zoom = 10;
        var scale = 0.0001;
        var shader = [{
            property: 'text-size',
            getValue: function(attributes, zoom, fromServer) {
                return 12;
            }
        }];
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POINT';
                    }
                };
            },
            getProperties: function() {
                return {
                    id: 1,
                    type: 'POINT'
                };
            }
        };
        var fromServer = true;
        var url = 'http://test.com';
        
        var style = StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, fromServer, url);
        expect(style).not.toBeNull();
    });
    
    it('getStyleFromCarto_shader_with_fontName', () => {
        var zoom = 10;
        var scale = 0.0001;
        var shader = [{
            property: 'text-face-name',
            getValue: function(attributes, zoom, fromServer) {
                return 'Arial';
            }
        }];
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POINT';
                    }
                };
            },
            getProperties: function() {
                return {
                    id: 1,
                    type: 'POINT'
                };
            }
        };
        var fromServer = true;
        var url = 'http://test.com';
        
        var style = StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, fromServer, url);
        expect(style).not.toBeNull();
    });
    
    it('getStyleFromCarto_shader_with_globalCompositeOperation', () => {
        var zoom = 10;
        var scale = 0.0001;
        var shader = [{
            property: 'comp-op',
            getValue: function(attributes, zoom, fromServer) {
                return 'src';
            }
        }];
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POINT';
                    }
                };
            },
            getProperties: function() {
                return {
                    id: 1,
                    type: 'POINT'
                };
            }
        };
        var fromServer = true;
        var url = 'http://test.com';
        
        var style = StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, fromServer, url);
        expect(style).not.toBeNull();
    });
    
    it('getStyleFromCarto_shader_with_pointFile_fromServer', () => {
        var zoom = 10;
        var scale = 0.0001;
        var shader = [{
            property: 'point-file',
            getValue: function(attributes, zoom, fromServer) {
                return 'marker.png';
            }
        }];
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POINT';
                    }
                };
            },
            getProperties: function() {
                return {
                    id: 1,
                    type: 'POINT'
                };
            }
        };
        var fromServer = true;
        var url = 'http://test.com';
        
        var style = StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, fromServer, url);
        expect(style).not.toBeNull();
    });
    
    it('getStyleFromCarto_shader_with_pointFile_not_fromServer', () => {
        var zoom = 10;
        var scale = 0.0001;
        var shader = [{
            property: 'point-file',
            getValue: function(attributes, zoom, fromServer) {
                return 'marker.png';
            }
        }];
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POINT';
                    }
                };
            },
            getProperties: function() {
                return {
                    id: 1,
                    type: 'POINT'
                };
            }
        };
        var fromServer = false;
        var url = 'http://test.com';
        
        var style = StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, fromServer, url);
        expect(style).not.toBeNull();
    });
    
    it('getStyleFromCarto_shader_with_lineWidth_less_than_one', () => {
        var zoom = 10;
        var scale = 0.0001;
        var shader = [{
            property: 'line-width',
            getValue: function(attributes, zoom, fromServer) {
                return 0.5;
            }
        }];
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'LINESTRING';
                    }
                };
            },
            getProperties: function() {
                return {
                    id: 1,
                    type: 'LINESTRING'
                };
            }
        };
        var fromServer = false;
        var url = 'http://test.com';
        
        var style = StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, fromServer, url);
        expect(style).not.toBeNull();
    });
    
    it('getStyleFromCarto_text_with_texts', () => {
        var zoom = 10;
        var scale = 0.0001;
        var shader = [];
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POINT';
                    }
                };
            },
            getProperties: function() {
                return {
                    id: 1,
                    type: 'TEXT',
                    texts: ['Sample Text'],
                    textName: '[NAME]'
                };
            }
        };
        var fromServer = false;
        var url = 'http://test.com';
        
        var style = StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, fromServer, url);
        expect(style).not.toBeNull();
        expect(style.getText()).not.toBeNull();
    });
    
    it('getStyleFromCarto_text_with_attributes', () => {
        var zoom = 10;
        var scale = 0.0001;
        var shader = [];
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POINT';
                    }
                };
            },
            getProperties: function() {
                return {
                    id: 1,
                    type: 'TEXT',
                    textName: '[NAME]',
                    attributes: {
                        NAME: 'Sample Text'
                    }
                };
            }
        };
        var fromServer = false;
        var url = 'http://test.com';
        
        var style = StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, fromServer, url);
        expect(style).not.toBeNull();
        expect(style.getText()).not.toBeNull();
    });

    //测试getValidStyleFromLayerInfo方法
    it('getValidStyleFromLayerInfo_point_without_textStyle', () => {
        var layerInfo = {
            layerStyle: {
                markerSize: 10
            },
            type: 'FEATURE'
        };
        
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POINT';
                    }
                };
            },
            getProperties: function() {
                return {
                    TEXT_FEATURE_CONTENT: undefined
                };
            }
        };
        
        var url = 'http://test.com';
        
        var style = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
        expect(style).not.toBeNull();
        expect(style.getImage()).not.toBeNull();
    });

    it('getValidStyleFromLayerInfo_point_with_textStyle', () => {
        var layerInfo = {
            layerStyle: {
                markerSize: 10
            },
            type: 'FEATURE'
        };
        
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POINT';
                    }
                };
            },
            getProperties: function() {
                return {
                    textStyle: {
                        italic: false,
                        bold: true,
                        fontWeight: 'bold',
                        fontHeight: 12,
                        fontName: 'Arial',
                        align: 'LEFTTOP',
                        outline: true,
                        outlineWidth: 2,
                        backColor: {red: 255, green: 255, blue: 255},
                        foreColor: {red: 0, green: 0, blue: 0},
                        rotation: 0
                    },
                    texts: ['Sample Text']
                };
            }
        };
        
        var url = 'http://test.com';
        
        var style = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
        expect(style).not.toBeNull();
        expect(style.getText()).not.toBeNull();
    });
    
    it('getValidStyleFromLayerInfo_label_type', () => {
        var layerInfo = {
            layerStyle: {
                markerSize: 10,
                fontName: 'Arial',
                fontSize: 10,
                align: 'LEFTTOP',
                backColor: {red: 255, green: 255, blue: 255},
                foreColor: {red: 0, green: 0, blue: 0},
            },
            type: 'LABEL',
            textField: 'NAME.SUBFIELD'
        };
        
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POINT';
                    }
                };
            },
            getProperties: function() {
                return {
                    attributes: {
                        SUBFIELD: 'Label Text'
                    }
                };
            }
        };
        
        var url = 'http://test.com';
        
        var style = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
        expect(style).not.toBeNull();
        expect(style.getText()).not.toBeNull();
    });
    
    it('getValidStyleFromLayerInfo_TEXT_STYLE_INFO', () => {
        var layerInfo = {
            layerStyle: {
                markerSize: 10
            },
            type: 'FEATURE'
        };
        
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POINT';
                    }
                };
            },
            getProperties: function() {
                return {
                    TEXT_STYLE_INFO: '{"textStyle":{"italic":false,"bold":true,"fontWeight":"bold","fontHeight":12,"fontName":"Arial","align":"LEFTTOP","outline":true,"outlineWidth":2,"backColor":{"red":255,"green":255,"blue":255},"foreColor":{"red":0,"green":0,"blue":0},"rotation":0}}',
                    TEXT_FEATURE_CONTENT: 'Text Content'
                };
            }
        };
        
        var url = 'http://test.com';
        
        var style = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
        expect(style).not.toBeNull();
        expect(style.getText()).not.toBeNull();
    });
    
    it('getValidStyleFromLayerInfo_no_text', () => {
        var layerInfo = {
            layerStyle: {
                markerSize: 10
            },
            type: 'FEATURE'
        };
        
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POINT';
                    }
                };
            },
            getProperties: function() {
                return {
                    TEXT_STYLE_INFO: '{}'
                };
            }
        };
        
        var url = 'http://test.com';
        
        var style = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
        expect(style).not.toBeNull();
        expect(style.getImage()).not.toBeNull();
    });
    
    it('getValidStyleFromLayerInfo_line_with_shader', () => {
        var layerInfo = {
            layerStyle: {
                lineWidth: 2,
                lineColor: {red: 255, green: 0, blue: 0},
                lineSymbolID: 0
            }
        };
        
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'LINESTRING';
                    }
                };
            },
            getProperties: function() {
                return {};
            }
        };
        
        var url = 'http://test.com';
        
        var style = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
        expect(style).not.toBeNull();
        expect(style.getStroke()).not.toBeNull();
    });
    
    it('getValidStyleFromLayerInfo_polygon_with_shader', () => {
        var layerInfo = {
            layerStyle: {
                fillSymbolID: 0,
                lineSymbolID: 0,
                lineWidth: 2,
                lineColor: { red: 255, green: 0, blue: 0 },
                fillForeColor: { red: 0, green: 0, blue: 255 }
            }
        };
        
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POLYGON';
                    }
                };
            },
            getProperties: function() {
                return {};
            }
        };
        
        var url = 'http://test.com';
        
        var style = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
        expect(style).not.toBeNull();
        expect(style.getFill()).not.toBeNull();
        expect(style.getStroke()).not.toBeNull();
    });
    
    it('getValidStyleFromLayerInfo_fillSymbolID_greater_than_7', () => {
        var layerInfo = {
            layerStyle: {
                fillSymbolID: 8,
                lineSymbolID: 0,
                lineWidth: 2,
                lineColor: { red: 255, green: 0, blue: 0 },
                fillForeColor: { red: 0, green: 0, blue: 255 }
            }
        };
        
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POLYGON';
                    }
                };
            },
            getProperties: function() {
                return {};
            }
        };
        
        var url = 'http://test.com';
        
        var style = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
        expect(style).not.toBeNull();
    });
    
    it('getValidStyleFromLayerInfo_lineSymbolID_greater_than_5', () => {
        var layerInfo = {
            layerStyle: {
                fillSymbolID: 0,
                lineSymbolID: 6,
                lineWidth: 2,
                lineColor: { red: 255, green: 0, blue: 0 },
                fillForeColor: { red: 0, green: 0, blue: 255 }
            }
        };
        
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POLYGON';
                    }
                };
            },
            getProperties: function() {
                return {};
            }
        };
        
        var url = 'http://test.com';
        
        var style = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
        expect(style).not.toBeNull();
    });
    
    it('getValidStyleFromLayerInfo_line_with_texture_fill', () => {
        var layerInfo = {
            layerStyle: {
                fillSymbolID: 2,
                lineSymbolID: 0,
                lineWidth: 2,
                lineColor: { red: 255, green: 0, blue: 0 },
                fillForeColor: { red: 0, green: 0, blue: 255 },
                fillBackColor: { red: 255, green: 255, blue: 255 }
            }
        };
        
        var feature = {
            getGeometry: function() {
                return {
                    getType: function() {
                        return 'POLYGON';
                    }
                };
            },
            getProperties: function() {
                return {};
            }
        };
        
        var url = 'http://test.com';
        
        var style = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
        expect(style).not.toBeNull();
    });

    //测试getSymbolStyle方法
    it('getSymbolStyle', () => {
        var parameters = {
            unicode: "&#xe600;",
            fillColor: "#ff0000",
            fillOpacity: 0.8,
            strokeColor: "#0000ff",
            strokeOpacity: 0.6,
            strokeWidth: 2,
            fontSize: "16px",
            radius: 10
        };
        
        var style = StyleUtils.getSymbolStyle(parameters, false);
        expect(style).not.toBeNull();
        expect(style.getText()).not.toBeNull();
    });
    
    //测试getImageStyle方法
    it('getImageStyle', () => {
        var styleParams = {
            imageInfo: {
                size: {w: 32, h: 32},
                img: null,
                url: 'http://fakeurl.com/image.png'
            },
            radius: 16,
            offsetX: 0,
            offsetY: 0,
            rotation: 0
        };
        
        var style = StyleUtils.getImageStyle(styleParams);
        expect(style).not.toBeNull();
        expect(style.getImage()).not.toBeNull();
    });
    
    //测试getSVGStyle方法
    it('getSVGStyle', (done) => {
        var styleParams = {
            url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDAiIHN0cm9rZT0iZ3JlZW4iIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ieWVsbG93IiAvPjwvc3ZnPg==',
            radius: 10,
            offsetX: 0,
            offsetY: 0,
            fillColor: '#ff0000',
            fillOpacity: 1,
            strokeColor: '#00ff00',
            strokeOpacity: 1,
            strokeWidth: 2,
            rotation: 0
        };
        
        StyleUtils.getSVGStyle(styleParams).then(style => {
            expect(style).not.toBeNull();
            done();
        }).catch(error => {
            // 在某些环境中可能因为缺少canvas支持而失败，但我们至少验证了方法可以被调用
            expect(error).toBeUndefined();
            done();
        });
    });
    
    //测试setColorToCanvas方法
    it('setColorToCanvas', () => {
        var canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 32, 32);
        
        var parameters = {
            fillColor: '#ff0000',
            fillOpacity: 0.8,
            strokeColor: '#0000ff',
            strokeOpacity: 0.6,
            strokeWidth: 2
        };
        
        var resultCanvas = StyleUtils.setColorToCanvas(canvas, parameters);
        expect(resultCanvas).not.toBeNull();
        expect(resultCanvas instanceof HTMLCanvasElement).toBe(true);
    });
    
    //测试getOpenlayersStyle方法
    it('getOpenlayersStyle_BASIC_POINT', (done) => {
        var styleParams = {
            type: 'BASIC_POINT',
            fillColor: '#ff0000',
            fillOpacity: 0.8,
            strokeColor: '#0000ff',
            strokeOpacity: 0.6,
            strokeWidth: 2,
            radius: 6
        };
        
        StyleUtils.getOpenlayersStyle(styleParams, 'POINT', false).then(style => {
            expect(style).not.toBeNull();
            done();
        }).catch(error => {
            expect(error).toBeUndefined();
            done();
        });
    });
    
    it('getOpenlayersStyle_SYMBOL_POINT', (done) => {
        var styleParams = {
            type: 'SYMBOL_POINT',
            unicode: "&#xe600;",
            fillColor: "#ff0000",
            fillOpacity: 0.8,
            strokeColor: "#0000ff",
            strokeOpacity: 0.6,
            strokeWidth: 2,
            fontSize: "16px",
            radius: 10
        };
        
        StyleUtils.getOpenlayersStyle(styleParams, 'POINT', false).then(style => {
            expect(style).not.toBeNull();
            expect(style.getText()).not.toBeNull();
            done();
        }).catch(error => {
            expect(error).toBeUndefined();
            done();
        });
    });
    
    it('getOpenlayersStyle_IMAGE_POINT', (done) => {
        var styleParams = {
            type: 'IMAGE_POINT',
            imageInfo: {
                size: {w: 32, h: 32},
                img: null,
                url: 'http://fakeurl.com/image.png'
            },
            radius: 16,
            offsetX: 0,
            offsetY: 0,
            rotation: 0
        };
        
        StyleUtils.getOpenlayersStyle(styleParams, 'POINT', false).then(style => {
            expect(style).not.toBeNull();
            expect(style.getImage()).not.toBeNull();
            done();
        }).catch(error => {
            expect(error).toBeUndefined();
            done();
        });
    });
    
    //测试toOpenLayersStyle方法
    it('toOpenLayersStyle_POINT_with_src_png', (done) => {
        var style = {
            src: 'http://test.com/marker.png',
            scale: 1,
            anchor: [0.5, 1]
        };
        
        StyleUtils.toOpenLayersStyle(style, 'POINT').then(olStyle => {
            expect(olStyle).not.toBeNull();
            expect(olStyle.getImage()).not.toBeNull();
            done();
        }).catch(error => {
            expect(error).toBeUndefined();
            done();
        });
    });
    
    it('toOpenLayersStyle_POINT_with_src_svg', (done) => {
        var style = {
            src: 'http://test.com/marker.svg',
            scale: 1,
            anchor: [0.5, 1]
        };
        
        StyleUtils.toOpenLayersStyle(style, 'POINT').then(olStyle => {
            expect(olStyle).not.toBeNull();
            done();
        }).catch(error => {
            // SVG处理可能会因为环境限制而失败，但我们至少验证了调用
            expect(error).toBeUndefined();
            done();
        });
    });
    
    it('toOpenLayersStyle_POINT_without_src', (done) => {
        var style = {
            radius: 6,
            fillColor: '#ff0000',
            fillOpacity: 0.8,
            strokeColor: '#0000ff',
            strokeWidth: 2,
            strokeOpacity: 0.6,
            offsetX: 0,
            offsetY: 0
        };
        
        StyleUtils.toOpenLayersStyle(style, 'POINT').then(olStyle => {
            expect(olStyle).not.toBeNull();
            expect(olStyle.getImage()).not.toBeNull();
            done();
        }).catch(error => {
            expect(error).toBeUndefined();
            done();
        });
    });
    
    it('toOpenLayersStyle_LINE', (done) => {
        var style = {
            strokeWidth: 2,
            strokeColor: '#ff0000',
            strokeOpacity: 0.8,
            lineCap: 'round'
        };
        
        StyleUtils.toOpenLayersStyle(style, 'LINE').then(olStyle => {
            expect(olStyle).not.toBeNull();
            expect(olStyle.getStroke()).not.toBeNull();
            done();
        }).catch(error => {
            expect(error).toBeUndefined();
            done();
        });
    });
    
    it('toOpenLayersStyle_POLYGON', (done) => {
        var style = {
            fillColor: '#ff0000',
            fillOpacity: 0.8,
            strokeColor: '#0000ff',
            strokeWidth: 2,
            strokeOpacity: 0.6,
            lineCap: 'round'
        };
        
        StyleUtils.toOpenLayersStyle(style, 'POLYGON').then(olStyle => {
            expect(olStyle).not.toBeNull();
            expect(olStyle.getFill()).not.toBeNull();
            expect(olStyle.getStroke()).not.toBeNull();
            done();
        }).catch(error => {
            expect(error).toBeUndefined();
            done();
        });
    });
    
    it('toOpenLayersStyle_default_case', (done) => {
        var style = {
            text: 'Test',
            font: '12px Arial'
        };
        
        StyleUtils.toOpenLayersStyle(style, 'OTHER').then(olStyle => {
            expect(olStyle).not.toBeNull();
            expect(olStyle.getImage()).not.toBeNull();
            done();
        }).catch(error => {
            expect(error).toBeUndefined();
            done();
        });
    });
    
    it('toOpenLayersStyle_without_style_params', (done) => {
        StyleUtils.toOpenLayersStyle(null, 'POINT').then(olStyle => {
            expect(olStyle).not.toBeNull();
            done();
        }).catch(error => {
            expect(error).toBeUndefined();
            done();
        });
    });
    
    //测试dashStyle方法
    it('dashStyle', () => {
        // 创建一个具有strokeWidth属性的模拟样式对象
        var mockStyle = {
            strokeWidth: 1
        };
        
        expect(StyleUtils.dashStyle({strokeDashstyle: 'dot', strokeWidth: 1}, 1)).toEqual([1, 4]);
        expect(StyleUtils.dashStyle({strokeDashstyle: 'dash', strokeWidth: 1}, 1)).toEqual([4, 4]);
        expect(StyleUtils.dashStyle({strokeDashstyle: 'dashdot', strokeWidth: 1}, 1)).toEqual([4, 4, 1, 4]);
        expect(StyleUtils.dashStyle({strokeDashstyle: 'longdash', strokeWidth: 1}, 1)).toEqual([8, 4]);
        expect(StyleUtils.dashStyle({strokeDashstyle: 'longdashdot', strokeWidth: 1}, 1)).toEqual([8, 4, 1, 4]);
        expect(StyleUtils.dashStyle({strokeDashstyle: 'solid', strokeWidth: 1}, 1)).toEqual([0]);
        expect(StyleUtils.dashStyle({strokeDashstyle: 'invalid_style', strokeWidth: 1}, 1)).toEqual(["invalid_style"]);
    });
    
    //测试getStyleFromiPortalMarker方法
    it('getStyleFromiPortalMarker', () => {
        var markerUrl = 'http://fakeurl.com/marker.png';
        
        var style = StyleUtils.getStyleFromiPortalMarker(markerUrl);
        expect(style).not.toBeNull();
        expect(style.getImage()).not.toBeNull();
    });
    
    //测试getStyleFromiPortalStyle方法
    it('getStyleFromiPortalStyle_point', () => {
        var styleData = {
            pointStyle: {
                fillColor: '#ff0000',
                fillOpacity: 1,
                strokeColor: '#00ff00',
                strokeOpacity: 1,
                strokeWidth: 2,
                pointRadius: 6
            }
        };
        
        var style = StyleUtils.getStyleFromiPortalStyle(styleData, 'Point');
        expect(style).not.toBeNull();
        expect(style.getImage()).not.toBeNull();
    });
    
    it('getStyleFromiPortalStyle_line', () => {
        var styleData = {
            lineStyle: {
                strokeColor: '#ff0000',
                strokeOpacity: 1,
                strokeWidth: 2,
                strokeLineCap: 'round',
                strokeDashstyle: 'dash'
            }
        };
        
        var style = StyleUtils.getStyleFromiPortalStyle(styleData, 'LineString');
        expect(style).not.toBeNull();
        expect(style.getStroke()).not.toBeNull();
    });
    
    it('getStyleFromiPortalStyle_polygon', () => {
        var styleData = {
            polygonStyle: {
                strokeColor: '#ff0000',
                strokeOpacity: 1,
                strokeWidth: 2,
                fillColor: '#0000ff',
                fillOpacity: 0.5
            }
        };
        
        var style = StyleUtils.getStyleFromiPortalStyle(styleData, 'Polygon');
        expect(style).not.toBeNull();
        expect(style.getStroke()).not.toBeNull();
        expect(style.getFill()).not.toBeNull();
    });
    
    //测试hexToRgba方法
    it('hexToRgba', () => {
        expect(StyleUtils.hexToRgba('#ff0000', 1)).toEqual('rgba(255,0,0,1)');
        expect(StyleUtils.hexToRgba('#00ff00', 0.5)).toEqual('rgba(0,255,0,0.5)');
        expect(StyleUtils.hexToRgba('#0000ff', 1)).toEqual('rgba(0,0,255,1)');
        expect(StyleUtils.hexToRgba('#000', 1)).toEqual('rgba(0,0,0,1)'); // 3位十六进制
    });
    
    //测试getMarkerDefaultStyle方法
    it('getMarkerDefaultStyle', () => {
        var style = StyleUtils.getMarkerDefaultStyle('POINT', 'http://test.com/');
        expect(style).not.toBeNull();
        expect(style.src).toContain('markers');
    });
});