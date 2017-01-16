module("UtilTest");
test('toJSON', function() {
	var date = new Date(2012, 2, 30, 17, 2, 54, 833);
	//date = new Date();
	var json = date.toJSON();
	var res = SuperMap.Util.toJSON(date);
	var expect = "{'__type':\"System.DateTime\",'Year':2012,'Month':3,'Day':30,'Hour':17,'Minute':2,'Second':54,'Millisecond':833,'TimezoneOffset':-480}";
	equal(res, expect, 'toJSON');
});
/**/
test("calculateDpi",function(){
    var referViewBounds=new SuperMap.Bounds(0,0,100,100);
    var referViewer=new SuperMap.Size(10,10);
    var referScale=1.0E-4;
    var dpi=SuperMap.Util.calculateDpi(referViewBounds, referViewer, referScale, "meter");
    equal(dpi,25.4,"dpi");
    referScale=6E-7;
    dpi=SuperMap.Util.calculateDpi(referViewBounds, referViewer, referScale, "meter");
    equal(dpi,4233.333333333334,"dpi");
});

test("getResolutionFromScaleDpi",function(){
    var resolution=SuperMap.Util.getResolutionFromScaleDpi(40, 80, "degree", 6378140);
    equal(resolution,1.140859874220612e-7,"resolution");
    var resolution=SuperMap.Util.getResolutionFromScaleDpi(12, 80, "Meter");
    equal(resolution,0.00381,"resolution");
    resolution=SuperMap.Util.getResolutionFromScaleDpi(0, 80, "Meter");
    equal(resolution,-1,"resolution");
});

 
test("getScaleFromResolutionDpi",function(){
    var scale=SuperMap.Util.getScaleFromResolutionDpi(0.5, 80, "Degree", 6378245);
    equal(scale,5.704205465736621e-9,"scale");
    var scale=SuperMap.Util.getScaleFromResolutionDpi(0.5, 80, "Meter");
    equal(scale,0.0006349999999999999,"scale");
    scale=SuperMap.Util.getScaleFromResolutionDpi(29,-4);
    equal(scale,-1,"scale");
});

test("urlIsLong",function(){
    var url="http://localhost:8090/iserver";
    var flag=SuperMap.Util.urlIsLong(url);
    ok(!flag);
    url="http://localhost:8090/iserver/services/map-world/rest/maps/World%20Map/image?returnImageInfo=true&center={%22x%22:96.17+,%22y%22:27.57}&scale=0.000000025632&viewBounds={%22leftBottom%22+:+{%22x%22:+81.23+,+%22y%22:12.63+},+%22rightTop%22+:+{+%22x%22:+111.12+,+%22y%22:42.52}}&width=256&height=256&transparent=false";
    flag=SuperMap.Util.urlIsLong(url);
    ok(!flag);
    url="http://localhost:8090/iserver/services/map-world/rest/maps/World%20Map/image?returnImageInfo=true&center={%22x%22:96.17+,%22y%22:27.57}&scale=0.000000025632&viewBounds={%22leftBottom%22+:+{%22x%22:+81.23+,+%22y%22:12.63+},+%22rightTop%22+:+{+%22x%22:+111.12+,+%22y%22:42.52}}&width=256&height=256&transparent=false+http://localhost:8090/iserver/services/map-world/rest/maps/World%20Map/image?returnImageInfo=true&center={%22x%22:96.17+,%22y%22:27.57}&scale=0.000000025632&viewBounds={%22leftBottom%22+:+{%22x%22:+81.23+,+%22y%22:12.63+},+%22rightTop%22+:+{+%22x%22:+111.12+,+%22y%22:42.52}}&width=256&height=256&transparent=falsehttp://localhost:8090/iserver/services/map-world/rest/maps/World%20Map/image?returnImageInfo=true&center={%22x%22:96.17+,%22y%22:27.57}&scale=0.000000025632&viewBounds={%22leftBottom%22+:+{%22x%22:+81.23+,+%22y%22:12.63+},+%22rightTop%22+:+{+%22x%22:+111.12+,+%22y%22:42.52}}&width=256&height=256&transparent=false+http://localhost:8090/iserver/services/map-world/rest/maps/World%20Map/image?returnImageInfo=true&center={%22x%22:96.17+,%22y%22:27.57}&scale=0.000000025632&viewBounds={%22leftBottom%22+:+{%22x%22:+81.23+,+%22y%22:12.63+},+%22rightTop%22+:+{+%22x%22:+111.12+,+%22y%22:42.52}}&width=256&height=256&transparent=false_http://localhost:8090/iserver/services/map-world/rest/maps/World%20Map/image?returnImageInfo=true&center={%22x%22:96.17+,%22y%22:27.57}&scale=0.000000025632&viewBounds={%22leftBottom%22+:+{%22x%22:+81.23+,+%22y%22:12.63+},+%22rightTop%22+:+{+%22x%22:+111.12+,+%22y%22:42.52}}&width=256&height=256&transparent=false+http://localhost:8090/iserver/services/map-world/rest/maps/World%20Map/image?returnImageInfo=true&center={%22x%22:96.17+,%22y%22:27.57}&scale=0.000000025632&viewBounds={%22leftBottom%22+:+{%22x%22:+81.23+,+%22y%22:12.63+},+%22rightTop%22+:+{+%22x%22:+111.12+,+%22y%22:42.52}}&width=256&height=256&transparent=falsehttp://localhost:8090/iserver/services/map-world/rest/maps/World%20Map/image?returnImageInfo=true&center={%22x%22:96.17+,%22y%22:27.57}&scale=0.000000025632&viewBounds={%22leftBottom%22+:+{%22x%22:+81.23+,+%22y%22:12.63+},+%22rightTop%22+:+{+%22x%22:+111.12+,+%22y%22:42.52}}&width=256&height=256&transparent=false+http://localhost:8090/iserver/services/map-world/rest/maps/World%20Map/image?returnImageInfo=true&center={%22x%22:96.17+,%22y%22:27.57}&scale=0.000000025632&viewBounds={%22leftBottom%22+:+{%22x%22:+81.23+,+%22y%22:12.63+},+%22rightTop%22+:+{+%22x%22:+111.12+,+%22y%22:42.52}}&width=256&height=256&transparent=false__End";
    flag=SuperMap.Util.urlIsLong(url);
    ok(flag);
});
