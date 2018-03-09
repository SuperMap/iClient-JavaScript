import ol from 'openlayers';
import {Unique} from '../../../src/openlayers/overlay/Unique';
import {ThemeStyle} from '../../../src/common/style/ThemeStyle';

describe('openlayers_Unique', () => {
    var testDiv, map, opt_options;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        map = new ol.Map({
            target: 'map',
            view: new ol.View({
                center: [110.85, 39.79],
                zoom: 4,
                projection: "EPSG:4326"
            })
        });

        opt_options = {
            map: map,
            attributions: " ",
            style: new ThemeStyle({
                labelRect: true,
                fontColor: "#000000",
                fontWeight: "bolder",
                fontSize: "18px",
                fill: true,
                fillColor: "#FFFFFF",
                fillOpacity: 1,
                stroke: false,
                strokeColor: "#8B7B8B"
            }),
            themeField: "aqi",
            styleGroups: [
                {
                    start: 0,
                    end: 51,
                    value: 25,
                    style: {
                        fillColor: "#6ACD06",
                        fontSize: "10px"
                    }
                }, {
                    start: 51,
                    value: 26,
                    end: 101,
                    style: {
                        fillColor: "#FBD12A",
                        fontSize: "19px"
                    }
                }, {
                    start: 101,
                    value: 27,
                    end: 151,
                    style: {
                        fillColor: "#FE8800",
                        fontSize: "22px"
                    }
                }
            ],
            isHoverAble: true,
            highlightStyle: {
                stroke: true,
                strokeWidth: 4,
                strokeColor: 'blue',
                fillColor: "#00EEEE",
                fillOpacity: 0.8
            }
        };
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
    });
    it('constructor, destroy', () => {
        var unique = new Unique('testUniqueLayer', opt_options);
        expect(unique).not.toBeNull();
        expect(unique.themeField).toEqual("aqi");
        expect(unique.style).not.toBeNull();
        expect(unique.style.strokeColor).toEqual("#8B7B8B");
        expect(unique.styleGroups.length).toEqual(3);
        expect(unique.styleGroups[0].style.fillColor).toEqual("#6ACD06");
        expect(unique.isHoverAble).toBeTruthy();
        expect(unique.highlightStyle).not.toBeNull();
        unique.destroy();
        expect(unique.style).toBeNull();
        expect(unique.themeField).toBeNull();
        expect(unique.styleGroups).toBeNull();
    });

    it('createThematicFeature, getStyleByData', () => {
        var feature = {
            attributes: {
                aqi: 25,
                area: "玉溪",
                co: 1.365,
            },
            geometry: [90, 30, 10],
            style: new ThemeStyle({
                labelRect: true,
                fontColor: "#000000",
                fontWeight: "bolder",
                fontSize: "14px"
            }),
        };
        var unique = new Unique('testUniqueLayer', opt_options);
        unique.isAllowFeatureStyle = true;
        var thematicFeature = unique.createThematicFeature(feature);
        expect(thematicFeature).not.toBeNull();
        expect(thematicFeature.CLASS_NAME).toEqual("SuperMap.Feature.Theme");
        expect(thematicFeature.data.attributes.aqi).toEqual(25);
        expect(thematicFeature.data.attributes.area).toEqual("玉溪");
        expect(thematicFeature.data.geometry.length).toEqual(3);
        expect(thematicFeature.id).not.toBeNull();
        expect(thematicFeature.data.style).not.toBeNull();
        expect(thematicFeature.layer).not.toBeNull();
        unique.destroy();
    });
});