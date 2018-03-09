import {tiledVectorLayer} from '../../../src/leaflet/overlay/TileVectorLayer';

describe('leaflet_TileVectorLayer', () => {
    var originalTimeout;
    var testDiv, map;
    var ChinaURL = GlobeParameter.ChinaURL;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        map = L.map('map', {
            center: [39.89, 116.43],
            maxZoom: 12,
            zoom: 9
        });
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        map.remove();
        window.document.body.removeChild(testDiv);
    });

    it('initialize_serverCartoCSSStyle:false', (done) => {
        var tileVectorLayer = tiledVectorLayer(ChinaURL, {
            cacheEnabled: false,
            serverCartoCSSStyle: false
        }).addTo(map);
        setTimeout(() => {
            expect(tileVectorLayer).not.toBeNull();
            var layersInfo = tileVectorLayer.layersInfo;
            expect(layersInfo !== undefined).toBeTruthy();
            expect(layersInfo).not.toBeNull();
            var isLayersInfoInitialized = tileVectorLayer.layersInfoInitialized;
            expect(isLayersInfoInitialized !== undefined).toBeTruthy();
            expect(isLayersInfoInitialized).toBeTruthy();
            var layersStyles = tileVectorLayer.layersStyles;
            expect(layersStyles !== undefined).toBeTruthy();
            expect(layersStyles).not.toBeNull();
            expect(tileVectorLayer.scales).not.toBeNull();
            var scaleNine = tileVectorLayer.getScale(9);
            expect(scaleNine).toEqual(8.653637486605625e-7);
            var vectorTileLayerStyles = tileVectorLayer.vectorTileLayerStyles;
            expect(vectorTileLayerStyles !== undefined).toBeTruthy();
            expect(vectorTileLayerStyles).not.toBeNull();
            var layerStyle = tileVectorLayer.getStyle('China_Province_pl@China');
            if (layerStyle.color === "rgba(120,113,102,0)") {
                expect(layerStyle.color).toBe("rgba(120,113,102,0)");
                expect(layerStyle.fillColor).toBe("rgba(255,255,255,1)");
                expect(layerStyle.markerSize).toEqual(22.677119999999995);
                expect(layerStyle.weight).toEqual(0.94488);
            } else if (layerStyle.color === "rgba(0,0,0,0)") {
                console.log('使用默认样式的瓦片未加载出来');
            }
            map.removeLayer(tileVectorLayer);
            done();
        }, 5000);
    });

    it('initialize_serverCartoCSSStyle:true', (done) => {
        var tileVectorLayer = new tiledVectorLayer(ChinaURL, {
            cacheEnabled: false,
            serverCartoCSSStyle: true,
            renderer: "Canvas"
        }).addTo(map);
        setTimeout(() => {
            expect(tileVectorLayer).not.toBeNull();
            var layerStyle = tileVectorLayer.getStyle('China_Province_pl@China');
            expect(layerStyle.length).toEqual(1);
            expect(layerStyle[0].color).toBe("rgba(0, 0, 0, 0)");
            expect(layerStyle[0].fillColor).toBe("rgba(255, 255, 255, 1)");
            expect(layerStyle[0].markerSize).toBeUndefined();
            expect(layerStyle[0].weight).toEqual(1);
            map.removeLayer(tileVectorLayer);
            done();
        }, 5000);
    });

    it('initialize_cartoCSS', (done) => {
        var cssStr = initClientCssStr();
        var tileVectorLayer = tiledVectorLayer(ChinaURL, {
            cacheEnabled: true,
            cartoCSS: cssStr,
            serverCartoCSSStyle: false
        }).addTo(map);
        setTimeout(() => {
            expect(tileVectorLayer).not.toBeNull();
            var layerStyle = tileVectorLayer.getStyle('China_Province_pl@China');
            expect(layerStyle.length).toEqual(1);
            expect(layerStyle[0].color).toBe("rgba(0, 0, 0, 0)");
            expect(layerStyle[0].fillColor).toBe("rgba(183, 202, 147, 1)");
            expect(layerStyle[0].markerSize).toBeUndefined();
            expect(layerStyle[0].fillOpacity).toEqual(1);
            expect(layerStyle[0].opacity).toEqual(1);
            expect(layerStyle[0].weight).toEqual(1);
            var layerInfo = tileVectorLayer.getLayerStyleInfo('China_Province_pl@China');
            expect(layerInfo).not.toBeNull();
            var layerInfo2 = tileVectorLayer.getLayerStyleInfo('China_Province_pl11111@China');
            expect(layerInfo2).toBeNull();
            map.removeLayer(tileVectorLayer);
            done();
        }, 5000);
    });

    it('setClientCartoCSS', (done) => {
        var cssStr = initClientCssStr();
        var tileVectorLayer = tiledVectorLayer(ChinaURL, {
            cacheEnabled: false,
            serverCartoCSSStyle: false
        }).addTo(map);
        tileVectorLayer.setClientCartoCSS(cssStr);
        setTimeout(() => {
            expect(tileVectorLayer).not.toBeNull();
            var layerStyle = tileVectorLayer.getStyle('China_Province_pl@China');
            expect(layerStyle.length).toEqual(1);
            expect(layerStyle[0].color).toBe("rgba(0, 0, 0, 0)");
            expect(layerStyle[0].fillColor).toBe("rgba(183, 202, 147, 1)");
            expect(layerStyle[0].markerSize).toBeUndefined();
            expect(layerStyle[0].weight).toEqual(1);
            map.removeLayer(tileVectorLayer);
            done();
        }, 5000);
    });

    it('setServerCartoCss', (done) => {
        var cssStr2 = initServerCssStr();
        var tileVectorLayer = tiledVectorLayer(ChinaURL, {
            cacheEnabled: false,
            serverCartoCSSStyle: false
        }).addTo(map);
        tileVectorLayer.setServerCartoCSS(cssStr2);
        setTimeout(() => {
            var layerStyle = tileVectorLayer.getStyle('China_Province_pl@China');
            expect(layerStyle.length).toEqual(1);
            expect(layerStyle[0].color).toBe("rgba(0, 0, 0, 0)");
            expect(layerStyle[0].fillColor).toBe("rgba(255, 255, 255, 1)");
            expect(layerStyle[0].markerSize).toBeUndefined();
            expect(layerStyle[0].weight).toEqual(1);
            map.removeLayer(tileVectorLayer);
            done();
        }, 5000);
    });

    //测试其父类
    it('getStyles', (done) => {
        var tileVectorLayer = tiledVectorLayer(ChinaURL, {
            cacheEnabled: false,
            serverCartoCSSStyle: false
        }).addTo(map);
        setTimeout(() => {
            expect(tileVectorLayer).not.toBeNull();
            var styles = tileVectorLayer.getStyles();
            expect(styles).not.toBeNull();
            map.removeLayer(tileVectorLayer);
            done();
        }, 5000);
    });

    it('setFeatureStyle, resetFeatureStyle', (done) => {
        var tileVectorLayer = tiledVectorLayer(ChinaURL, {
            cacheEnabled: false,
            serverCartoCSSStyle: false
        }).addTo(map);
        setTimeout(() => {
            expect(tileVectorLayer).not.toBeNull();
            spyOn(tileVectorLayer, 'setFeatureStyle').and.callThrough();
            spyOn(tileVectorLayer, 'resetFeatureStyle').and.callThrough();
            spyOn(tileVectorLayer, '_getFeatureKey').and.callThrough();
            spyOn(tileVectorLayer, '_updateStyles').and.callThrough();
            var newTileVectorLayer = tileVectorLayer.setFeatureStyle(1, "World_Continent_pl@China");
            var newTileVectorLayer1 = tileVectorLayer.resetFeatureStyle(1, "World_Continent_pl@China");
            expect(newTileVectorLayer).not.toBeNull();
            expect(newTileVectorLayer1).not.toBeNull();
            expect(tileVectorLayer.setFeatureStyle).toHaveBeenCalled();
            expect(tileVectorLayer.resetFeatureStyle).toHaveBeenCalled();
            expect(tileVectorLayer._getFeatureKey).toHaveBeenCalled();
            expect(tileVectorLayer._updateStyles).toHaveBeenCalled();
            map.removeLayer(tileVectorLayer);
            done();
        }, 5000);
    });

    it('getDataLayerNames', (done) => {
        var tileVectorLayer = tiledVectorLayer(ChinaURL, {
            cacheEnabled: false,
            serverCartoCSSStyle: false
        }).addTo(map);
        setTimeout(() => {
            expect(tileVectorLayer).not.toBeNull();
            var nameArray = tileVectorLayer.getDataLayerNames();
            expect(nameArray).not.toBeNull();
            expect(nameArray.length).toEqual(19);
            map.removeLayer(tileVectorLayer);
            done();
        }, 5000);
    });

    it('_extendStyle', (done) => {
        var tileVectorLayer = tiledVectorLayer(ChinaURL, {
            cacheEnabled: false,
            serverCartoCSSStyle: false
        }).addTo(map);
        setTimeout(() => {
            expect(tileVectorLayer).not.toBeNull();
            var style = tileVectorLayer.vectorTileLayerStyles['China_Capital_pt@China'];
            var result1 = tileVectorLayer._extendStyle(style, "POINT");
            expect(result1).not.toBeNull();
            var result2 = tileVectorLayer._extendStyle(style, "LINE");
            expect(result2).not.toBeNull();
            var result3 = tileVectorLayer._extendStyle(style, "TEXT");
            expect(result3).not.toBeNull();
            var result4 = tileVectorLayer._extendStyle(style, "TEXT1");
            expect(result4).not.toBeNull();
            map.removeLayer(tileVectorLayer);
            done();
        }, 5000);
    });


    var initClientCssStr = () => {
        var cartoCss = "@waterColor:rgb(109,183,255);" +
            "@roadColora:rgb(100,100,100);" +
            "@roadColorb:rgb(250,250,250);" +
            "@railwayColora:rgb(186,186,186);" +
            "@railwayColorb:rgb(250,250,250);" +
            "@vegetationColor:rgb(193,220,185);" +
            "@continentColor:rgb(183,202,147);" +
            "@provinceLineColor:rgb(100,100,100);";
        cartoCss = cartoCss.replace(/[@]/gi, "\n@");
        var cartoCss2 = "#World_Continent_pl___China{\npolygon-fill:@continentColor;\nline-width:1;\nline-color:@continentColor;\n}" +
            "#China_Province_pl___China{\npolygon-fill:@continentColor;\nline-color:rgba(0,0,0,0);\n}" +
            "#Arterial_Road_ln___China::one{\nline-color:@roadColora;\nline-width:2;\n}" +
            "#Arterial_Road_ln___China::two{\nline-color:@roadColorb;\nline-width:1;\n}" +
            "#Arterial_Road_ln___China___1::one{\nline-color:@roadColora;\nline-width:2;\n}" +
            "#Arterial_Road_ln___China___1::two{\nline-color:@roadColorb;\nline-width:1;\n}" +
            "#Arterial_Road_ln___China___1___1::one{\nline-color:@roadColora;\nline-width:2;\n}" +
            "#Arterial_Road_ln___China___1___1::two{\nline-color:@roadColorb;\nline-width:1;\n}" +
            "#Main_Road_L___China::one{\nline-color:@roadColora;\nline-width:2;\n}" +
            "#Main_Road_L___China::two{\nline-color:@roadColorb;\nline-width:1;\n}" +
            "#Main_Road_L___China___1::one{\nline-color:@roadColora;\nline-width:2;\n}" +
            "#Main_Road_L___China___1::two{\nline-color:@roadColorb;\nline-width:1;\n}" +
            "#Main_Road_L___China___1___1::a{\nline-color:@roadColora;\nline-width:2;\n}" +
            "#Main_Road_L___China___1___1::b{\nline-color:@roadColorb;\nline-width:1;\n}" +
            "#Hydside_Area_pl___Hydside{\npolygon-fill:@waterColor;\nline-color:@waterColor;\n}" +
            "#China_Provinces_L___China400{\nline-dasharray:10,10;\nline-color:@provinceLineColor;\nline-width:1;\n}";
        cartoCss2 = cartoCss2.replace(/[#]/gi, "\n#");
        return cartoCss + cartoCss2;
    }

    var initServerCssStr = () => {
        return "#World_Continent_pl@China{text-placement-type:simple;text-placements:\"E,NE,SE,W,NW,SW\";line-color:rgba(0,0,0,0);polygon-fill:rgba(245,243,240,1);marker-width:9.070866141732283;marker-height:9.070866141732283;marker-fill:rgba(13,80,143,1);marker-type:ellipse;polygon-opacity:1.0;polygon-pattern-opacity:1.0;}" +
            "#China_Province_pl@China{text-placement-type:simple;text-placements:\"E,NE,SE,W,NW,SW\";line-color:rgba(0,0,0,0);polygon-fill:rgba(255,255,255,1);marker-width:9.070866141732283;marker-height:9.070866141732283;marker-fill:rgba(13,80,143,1);marker-type:ellipse;polygon-opacity:1.0;polygon-pattern-opacity:1.0;}" +
            "#Arterial_Road_ln@China\\#1\\#1[zoom<=6.9229099892844565E-6][zoom>=4.3268187433028044E-7]{text-placement-type:simple;text-placements:\"E,NE,SE,W,NW,SW\";::subLine_0{line-join:round;line-cap:butt;line-color:rgba(226,160,70,1);line-width:1.8897637795275593;}::subLine_1{line-join:round;line-cap:round;line-color:rgba(242,223,106,1);line-width:1.1338582677165354;}polygon-fill:rgba(208,255,240,1);marker-width:9.070866141732283;marker-height:9.070866141732283;marker-fill:rgba(13,80,143,1);marker-type:ellipse;polygon-opacity:1.0;polygon-pattern-opacity:1.0;}" +
            "#Arterial_Road_ln@China[zoom<=4.3268187433028044E-7][zoom>=2.1634093716513974E-7]{text-placement-type:simple;text-placements:\"E,NE,SE,W,NW,SW\";line-color:rgba(232,212,85,1);line-width:0.37795275590551186;polygon-fill:rgba(189,235,255,1);marker-width:9.070866141732283;marker-height:9.070866141732283;marker-fill:rgba(13,80,143,1);marker-type:ellipse;polygon-opacity:1.0;polygon-pattern-opacity:1.0;}" +
            "#Arterial_Road_ln@China\\#1[zoom>=6.9229099892844565E-6]{text-placement-type:simple;text-placements:\"E,NE,SE,W,NW,SW\";::subLine_0{line-join:round;line-cap:butt;line-color:rgba(226,160,70,1);line-width:3.7795275590551185;}::subLine_1{line-join:round;line-cap:round;line-color:rgba(242,223,106,1);line-width:3.023622047244095;}polygon-fill:rgba(208,255,240,1);marker-width:9.070866141732283;marker-height:9.070866141732283;marker-fill:rgba(13,80,143,1);marker-type:ellipse;polygon-opacity:1.0;polygon-pattern-opacity:1.0;}" +
            "#Arterial_Road_ln@China\\#2[zoom>=3.4614549946422405E-6]{text-placement-type:simple;text-placements:\"E,NE,SE,W,NW,SW\";text-name:\"[NAME]\";text-placement:line;text-placement-type:simple;text-placements:\"E,NE,SE,W,NW,SW\";text-face-name:\"微软雅黑\";text-size:14;text-fill:rgba(150,105,0,1);text-opacity:1;text-size-fixed:true;text-halo-fill:rgba(255,255,255,1);text-halo:true;text-halo-radius:1;text-vertical-alignment:middle;text-horizontal-alignment:middle;}" +
            "#Main_Road_L@China\\#2[zoom>=8.653637486605571E-7]{text-placement-type:simple;text-placements:\"E,NE,SE,W,NW,SW\";text-name:\"[RN]\";text-placement:line;text-placement-type:simple;text-placements:\"E,NE,SE,W,NW,SW\";text-face-name:\"微软雅黑\";text-size:13;text-fill:rgba(255,255,255,1);text-opacity:1;text-size-fixed:true;text-vertical-alignment:middle;text-horizontal-alignment:middle;}" +
            "#Main_Road_L@China\\#1[zoom>=6.9229099892844565E-6]{text-placement-type:simple;text-placements:\"E,NE,SE,W,NW,SW\";::subLine_0{line-join:round;line-cap:butt;line-color:rgba(178,137,80,1);line-width:5.291338582677165;}::subLine_1{line-join:round;line-cap:round;line-color:rgba(255,206,16,1);line-width:2.6456692913385824;}polygon-fill:rgba(208,255,240,1);marker-width:9.070866141732283;marker-height:9.070866141732283;marker-fill:rgba(13,80,143,1);marker-type:ellipse;polygon-opacity:1.0;polygon-pattern-opacity:1.0;}" +
            "#Main_Road_L@China\\#3[zoom>=8.653637486605571E-7]{text-placement-type:simple;text-placements:\"E,NE,SE,W,NW,SW\";text-name:\"[NAME]\";text-placement:line;text-placement-type:simple;text-placements:\"E,NE,SE,W,NW,SW\";text-face-name:\"微软雅黑\";text-size:15;text-fill:rgba(150,105,0,1);text-opacity:1;text-size-fixed:true;text-halo-fill:rgba(255,224,104,1);text-halo:true;text-halo-radius:1;text-vertical-alignment:middle;text-horizontal-alignment:middle;}" +
            "#Main_Road_L@China[zoom<=4.3268187433028044E-7][zoom>=5.40852342912851E-8]{text-placement-type:simple;text-placements:\"E,NE,SE,W,NW,SW\";line-color:rgba(221,155,44,1);line-width:0.37795275590551186;polygon-fill:rgba(208,255,240,1);marker-width:9.070866141732283;marker-height:9.070866141732283;marker-fill:rgba(13,80,143,1);marker-type:ellipse;polygon-opacity:1.0;polygon-pattern-opacity:1.0;}" +
            "#Main_Road_L@China\\#1\\#1[zoom<=6.9229099892844565E-6][zoom>=4.3268187433028044E-7]{text-placement-type:simple;text-placements:\"E,NE,SE,W,NW,SW\";::subLine_0{line-join:round;line-cap:butt;line-color:rgba(178,137,80,1);line-width:2.6456692913385824;}::subLine_1{line-join:round;line-cap:round;line-color:rgba(255,206,16,1);line-width:1.5118110236220474;}polygon-fill:rgba(208,255,240,1);marker-width:9.070866141732283;marker-height:9.070866141732283;marker-fill:rgba(13,80,143,1);marker-type:ellipse;polygon-opacity:1.0;polygon-pattern-opacity:1.0;}";
    }
});