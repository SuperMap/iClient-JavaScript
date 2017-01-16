module("SearchCity");
var poiInfos = [
    {
        "address": "北京市朝阳区酒仙桥北路甲10号电子城IT产业园107楼6层",
        "location": {
            "x": 116.50584450400869,
            "y": 39.98558082900099
        },
        "name": "北京超图软件股份有限公司",
        "score": 0,
        "telephone": "59896179",
        "uid": "e30da3876c4fdffb932ca3e8"
    },
    {
        "address": "酒仙桥北路甲10号院201超图软件附近",
        "location": {
            "x": 116.50544640805522,
            "y": 39.98406467516778
        },
        "name": "北京数字出版云中心",
        "score": 0,
        "telephone": null,
        "uid": "982e15ed0e73e63c6140a9eb"
    }
];

test("TestSearchCity_Constructor", function () {
    expect(4);
    var searchCity = new SuperMap.Control.SearchCity();
    ok(searchCity instanceof SuperMap.Control.SearchCity, "searchCity instanceof SuperMap.Control.SearchCity");
    equals(searchCity.markerLayer === null, false, "Property:markerLayer");
    equals(searchCity.defaultPosition === null, false, "Property:defaultPosition");
    equals(searchCity.CLASS_NAME, "SuperMap.Control.SearchCity", "CLASS_NAME");
});

test("TestSearchCity_initVcity", function () {
    expect(6);
    var searchCity = new SuperMap.Control.SearchCity();
    equals(searchCity.Vcity != null, true, "Property:Vcity");
    equals(searchCity.allCity === undefined, true, "Property:allCity");
    equals(searchCity.oCity === undefined, true, "Property:oCity");
    searchCity.initVcity();
    equals(searchCity.Vcity === {}, false, "Property:Vcity");
    equals(searchCity.allCity === null, false, "Property:allCity");
    equals(searchCity.oCity === null, false, "Property:oCity");
});


test("TestSearchCity_draw", function () {
    expect(7);
    var searchCity = new SuperMap.Control.SearchCity();
    equals(searchCity.input === null, true, "Property:input");
    equals(searchCity.searchSiteInput === null, true, "Property:searchSiteInput");
    equals((searchCity.Vcity != null) && (searchCity.Vcity != undefined), true, "Property:Vcity");
    var div = searchCity.draw();
    equals(div === null, false, "Function:draw");
    equals(searchCity.input === null, false, "Property:input");
    equals(searchCity.searchSiteInput === null, false, "Property:searchSiteInput");
    equals(searchCity.Vcity === {}, false, "Property:Vcity");
});

test("TestSearchCity_searchCompleted", function () {
    expect(2);
    var searchCity = new SuperMap.Control.SearchCity();
    var map = new SuperMap.Map("qunit-fixture", {controls: [searchCity]});
    searchCity.draw();
    equals(searchCity.listContainer === null, true, "Function:searchCompleted");
    searchCity.searchCompleted({result: {poiInfos: poiInfos}});
    equals(searchCity.listContainer === null, false, "Function:searchCompleted");
    removeElement(document.getElementsByClassName("searchList")[0]);
});

test("TestSearchCity_addMarker", function () {
    expect(4);
    var searchCity = new SuperMap.Control.SearchCity();
    var map = new SuperMap.Map("qunit-fixture", {controls: [searchCity]});
    searchCity.draw();
    equals(searchCity.isLayerAddedToMap, false, "Function:addMarker");
    searchCity.addMarker(poiInfos);
    equals(searchCity.isLayerAddedToMap, true, "Function:addMarker");
    equals(searchCity.markerLayer === null, false, "Function:addMarker");
    equals(searchCity.markerLayer.markers.length > 0, true, "Function:addMarker");
});

test("TestSearchCity_createWarp", function () {
    expect(4);
    var searchCity = new SuperMap.Control.SearchCity();
    searchCity.draw();
    equals(searchCity.cityBox === undefined, true, "Function:createWarp");
    searchCity.createWarp();
    equals(searchCity.cityBox === undefined, false, "Function:createWarp");
    equals(searchCity.cityBox.id, "cityBox", "Function:createWarp");
    equals(searchCity.cityBox.innerHTML != "", true, "Function:createWarp");
    removeElement(document.getElementsByClassName("citySelector")[0]);
});

function removeElement(element) {
    element.parentNode.removeChild(element);
}
