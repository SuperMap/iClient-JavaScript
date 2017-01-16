module("Markers");

test("TestMarkers_constructor", function () {
    expect(5);

    var markers = new SuperMap.Layer.Markers("Markers", {});

    ok(markers instanceof SuperMap.Layer.Markers, "layer instanceof SuperMap.Layer.Markers");
    equals(markers.name, "Markers", "name");
    equals(markers.CLASS_NAME, "SuperMap.Layer.Markers", "CLASS_NAME");
    equals(markers.isBaseLayer, false, "isBaseLayer");
    equals(markers.markers.length, 0, "markers");
    markers.destroy();
});

test("TestMarkers_addMarker", function () {
    expect(2);

    var markers = new SuperMap.Layer.Markers("Markers", {});
    var marker = new SuperMap.Marker(new SuperMap.LonLat(0, 0), new SuperMap.Icon());
    markers.addMarker(marker);
    equals(markers.markers.length, 1, "addMarker");
    markers.destroy();
    equals(markers.markers, null, "destroy");
});

test("TestMarkers_addMarker_and_removeMarker", function () {
    expect(3);

    var markers = new SuperMap.Layer.Markers("Markers", {});
    var marker = new SuperMap.Marker(new SuperMap.LonLat(0, 0), new SuperMap.Icon());

    markers.addMarker(marker);
    equals(markers.markers.length, 1, "addMarker");
    markers.removeMarker(marker);
    equals(markers.markers.length, 0, "removeMarker");
    markers.destroy();
    equals(markers.markers, null, "destroy");

});

test("TestMarkers_getDataExtent_and_clearMarkers", function () {
    expect(7);

    var markers = new SuperMap.Layer.Markers("Markers", {}),
        marker = new SuperMap.Marker(new SuperMap.LonLat(0, 0), new SuperMap.Icon()),
        marker2 = new SuperMap.Marker(new SuperMap.LonLat(1, 1), new SuperMap.Icon()),
        marker3 = new SuperMap.Marker(new SuperMap.LonLat(2, 0), new SuperMap.Icon());
    markers.addMarker(marker);
    markers.addMarker(marker2);
    markers.addMarker(marker3);

    equals(markers.markers.length, 3, "addMarker");
    equals(markers.getDataExtent().right,2, "getDataExtent()");
    equals(markers.getDataExtent().left,0, "getDataExtent()");
    equals(markers.getDataExtent().bottom,0, "getDataExtent()");
    equals(markers.getDataExtent().top,1, "getDataExtent()");
    markers.clearMarkers();
    equals(markers.markers.length, 0, "clearMarkers");
    markers.destroy();
    equals(markers.markers, null, "destroy");
}) ;
test("TestMarkers_destroy", function () {
    expect(3);

    var markers = new SuperMap.Layer.Markers("Markers", {});
    markers.destroy();
    equals(markers.name,null, "name");
    equals(markers.isBaseLayer, false, "isBaseLayer");
    equals(markers.markers, null, "markers");

});
