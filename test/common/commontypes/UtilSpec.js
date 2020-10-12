import {
    SuperMap
} from "../../../src/common/SuperMap";
import {
    Util
} from '../../../src/common/commontypes/Util';

describe('Util', () => {

    it('extend', () => {
        var source = {
            "ch": 791.998416,
            "cm": 0.3937,
            "dm": 3936.9999999999995,
            "fath": 71.999856,
            "ind - ch": 791.9942845122
        };
        var destination = {
            "50kilometers": 5,
            "150kilometers": 5,
            "BenoitChain": 7,
            "BenoitLink": 7,
            "Brealey": 14763.75,
        };
        var result = Util.extend(destination, source);
        expect(result).toEqual(destination);
    });

    it('copy', () => {
        var des = {
            "fath": 71.999856,
            "ind": 791.9942845122
        };
        var soc = {
            "fath": 6,
            "ind": 9
        };
        Util.copy(des, soc);
        expect(des.fath).toEqual(6);
        expect(des.ind).toEqual(9);
    });

    it('reset', () => {
        var obj = {
            "apple": 1,
            "bear": 2,
            banana: {
                "orange": 3
            },
            name: ['Alice', 'Jack']
        };
        Util.reset(obj);
        expect(obj.apple).toBe(null);
        expect(obj.bear).toBe(null);
        expect(obj.banana).toBe(null);
        expect(obj.name).toBe(null);
    });

    it('getElement', () => {
        var resulrArr = Util.getElement('string', 1, 2, 3);
        expect(resulrArr[1]).toEqual(1);
        expect(resulrArr[2]).toEqual(2);
    });

    it('isElement', () => {
        var o = {
            a: 1,
            b: 2
        };
        var elements = Util.isElement(o);
        expect(elements).toEqual(false);
    });

    it('isArray', () => {
        var arr = [1, 2];
        var obj = Util.isArray(arr);
        expect(obj).toEqual(true);
    });

    it('removeItem', () => {
        var arr = [1, 2, 3, 4, 5];
        var item = 5;
        var arrResult = Util.removeItem(arr, item);
        expect(arrResult).toEqual([1, 2, 3, 4]);
    });

    it('indexOf', () => {
        //arr为null的情况
        var arr = null;
        var obj1 = {
            a: "lll"
        };
        var re = Util.indexOf(arr, obj1);
        expect(re).toEqual(-1);
        //array不为null的情况
        var array = [1, 2, 3, {
            hobby: "dancing"
        }];
        var obj = {
            hobby: "dancing"
        };
        //备份js语言的数组的indexOf方法
        var backUpMethod = array.indexOf;
        //去掉js语言的数组的indexOf方法
        array.indexOf = null;
        //测试
        var result = Util.indexOf(array, obj);
        expect(result).toEqual(-1);
        //从备份恢复js语言的数组的indexOf方法
        //array.indexOf=backUpMethod;

    });

    it('modifyDOMElement', () => {
        var testDom = document.createElement("div");
        var id = "box";
        var px = new SuperMap.Pixel(99, 80);
        var sz = new SuperMap.Size(99, 80);
        var position = "absolute";
        var border = "1px solid red";
        var overflow = "hidden";
        //opacity<1.0
        var opacity = 0.5;
        Util.modifyDOMElement(testDom, id, px, sz, position, border, overflow, opacity);
        expect(testDom.id).toBe("box");
        expect(testDom.style.opacity).toBe('0.5');
        //opacity=1.0
        var opa = 1.0;
        Util.modifyDOMElement(testDom, id, px, sz, position, border, overflow, opa);
        expect(testDom.style.opa).toBe();
    });

    it('applyDefaults', () => {
        var test;
        var to = {
            advantage: test
        };
        var from = {
            toString: "World",
            advantage: "difficult"
        };
        var result = Util.applyDefaults(to, from);
        expect(result.advantage).toEqual(from.advantage);
        expect(result.toString).toEqual(from.toString);
    });

    it('getParameterString', () => {
        var params = {
            type: "json",
            coordinates: ["abc", "edf"],
            properties: {
                constructor: [1, 2, 3]
            }
        };
        var paramsArr = Util.getParameterString(params);
        expect(paramsArr).toBe("type=json&coordinates=%5B%22abc%22%2C%22edf%22%5D&properties=%7B%22constructor%22%3A%5B1%2C2%2C3%5D%7D");
    });

    it('urlAppend', () => {
        var url = "http:/www.baidu.com";
        var paramsStr = "returnContent=true";
        var newUrl = Util.urlAppend(url, paramsStr);
        expect(newUrl).toBe("http:/www.baidu.com?returnContent=true");
    });

    it('toFloat', () => {
        var number = "1.234567890345678912345612234555667";
        var precision = null;
        var newNumber = Util.toFloat(number, precision);
        expect(newNumber).toEqual(1.2345678903457);
    });

    it('rad', () => {
        var angle = 720;
        var result = Util.rad(angle);
        expect(result).toBe(12.566370614359172);
    });

    it('getParameters', () => {
        var URL = " http://54.223.164.155:8090/iserver/services/addressmatch-Address/restjsr/v1/address?a=1&b=2";
        var parameters = Util.getParameters(URL);
        expect(parameters).toEqual({
            a: "1",
            b: "2"
        });
    });
    it('normalizeScale', () => {
        var scale = 1 / 10000000000;
        var normScale = Util.normalizeScale(scale);
        expect(normScale).toBe(1e-10);
    });

    it('getResolutionFromScale', () => {
        var scale = 1 / 1250000000;
        var units = null;
        var resolution = Util.getResolutionFromScale(scale, units);
        expect(resolution).toEqual(2.97635783253946);
    });

    it('getScaleFromResolution', () => {
        var getScaleFromResolution = 2.97635783253946;
        var units = null;
        var scale = Util.getScaleFromResolution(getScaleFromResolution, units);
        expect(scale).toEqual(1250000000);
    });


    it('isInTheSameDomain', () => {
        var Url = "https://iclient.supermap.io/examples/leaflet/editor.html#addressMatchService";
        var correct = Util.isInTheSameDomain(Url);
        expect(correct).toBeFalsy(false);

        var errorUrl = "httttttp:wwwwwww.bbbb";
        var error = Util.isInTheSameDomain(errorUrl);
        expect(error).toBeTruthy(true);
    });

    it("calculateDpi", () => {
        var viewBounds = new SuperMap.Bounds(-65.71902951325971, -65.71902951331374, 65.71902951333179, 65.71902951327776);
        var viewer = new SuperMap.Size(256, 256);
        var scale = 4.629244301712164E-9;
        var coordUnit = "DEGREE";
        var datumAxis = 6378137;
        var dpi = Util.calculateDpi(viewBounds, viewer, scale, coordUnit, datumAxis);
        expect(dpi).toEqual(95.99999999999964);
    });

    it('toJSON', () => {
        //1、obj为null
        var nullObj = null;
        var result = Util.toJSON(nullObj);
        expect(result).toBe(null);
        //2、obj不为null
        //var date = new Date();
        //console.log(date);
        var obj = {
            resourceConfigID: "maps",
            resourceType: "CatalogList",
            array: [1, 2, 3, 4, 5, 6],
            1: 1,
            true: true,
            time: "Wed Sep 19 2018 15:33:53 GMT+0800 (中国标准时间)"
        };
        var jsonObj = Util.toJSON(obj);
        expect(jsonObj).toEqual(`{'1':1,'resourceConfigID':"maps",'resourceType':"CatalogList",'array':[1,2,3,4,5,6],'true':true,'time':"Wed Sep 19 2018 15:33:53 GMT+0800 (中国标准时间)"}`);

        //obj[ "toJSON"]为function
        var funObj = {
            "toJSON": function () {
                return "aaa";
            }
        };
        var funResults = Util.toJSON(funObj);
        expect(funResults).toEqual("aaa");
    });

    it('getResolutionFromScaleDpi', () => {
        var scale = 4.629244301712164E-9;
        var dpi = 95.99999999999964;
        var coordUnit = "DEGREE";
        var datumAxis = 6378137;
        var result = Util.getResolutionFromScaleDpi(scale, dpi, coordUnit, datumAxis);
        expect(result).toEqual(0.513429918072625);

    });

    it('getScaleFromResolutionDpi', () => {
        var resolution = 0.513429918072625;
        var dpi = 95.99999999999964;
        var coordUnit = "DEGREE";
        var datumAxis = 6378137;
        var result = Util.getScaleFromResolutionDpi(resolution, dpi, coordUnit, datumAxis);
        expect(result).toEqual(4.629244301712165e-9);
    });

    it('transformResult', () => {
        var result = {
            true: true,
            respose: "helloWorld"
        };
        Util.transformResult(result);
        expect(result).toEqual({
            "true": true,
            "respose": "helloWorld"
        })

    });
    it('copyAttributes', () => {
        var soc = {
            name: "Lucy",
            height: 90,
            age: 18,
            birthday: "八月十九",
        };
        var des = {};
        Util.copyAttributes(des, soc);
        expect(des).toEqual(soc);
    });

    it('copyAttributesWithClip', () => {
        var source = {
            name: "Lucy",
            say: function () {
                console.log(this.name);
            },
            hobby: "dancing",
            age: 18,
            height: 160,
            "CLASS_NAME": 123
        };
        var destination = {
            name: "xixi",
            hobby: "sing",
            age: 20,
            height: 180
        };
        var clip = [
            "say", "CLASS_NAME"
        ];
        Util.copyAttributesWithClip(source, destination, clip);
        expect(destination.name).toEqual(source.name);
        expect(destination.hobby).toEqual(source.hobby);
        expect(destination.age).toEqual(source.age);
        expect(destination.height).toEqual(source.height);
    });

    it('cloneObject', () => {
        var needCloneObj = {
            hobby: "dancing",
            age: 18,
            height: 160
        };
        var copy = Util.cloneObject(needCloneObj);
        expect(copy).toEqual(needCloneObj);
    });

    it('lineIntersection', () => {
        //重合
        var a1 = new SuperMap.Geometry.Point(-111.04, 45.68);
        var a2 = new SuperMap.Geometry.Point(-152, 89);
        var a3 = new SuperMap.Geometry.Point(-111.04, 45.68);
        var a4 = new SuperMap.Geometry.Point(-152, 89);
        var intersectValue = Util.lineIntersection(a1, a2, a3, a4);
        expect(intersectValue).toEqual("Coincident");
        //平行
        var a5 = new SuperMap.Geometry.Point(20, 80);
        var a6 = new SuperMap.Geometry.Point(140, 160);
        var a7 = new SuperMap.Geometry.Point(20, 20);
        var a8 = new SuperMap.Geometry.Point(140, 100);
        var intersectValue1 = Util.lineIntersection(a5, a6, a7, a8);
        expect(intersectValue1).toEqual("Parallel");
    });

    it('getTextBounds', () => {
        var style = new SuperMap.ThemeStyle({
            width: 200,
            height: 300,
            fontSize: 12,
            fontFamily: "宋体",
            fontWeight: "bold",
            position: "relative",
            visibility: "hidden",
            display: "inline-block",
        });
        var text = "北京超图";
        var dom = document.createElement('div');
        var result = Util.getTextBounds(style, text, dom);
        expect(result.textWidth).toBeGreaterThan(60);
        expect(result.textWidth).toBeLessThan(70);
        expect(result.textHeight).toEqual(18);
    });

});