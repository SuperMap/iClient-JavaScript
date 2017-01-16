module("OverlapDisplayedOptions");

test("TestContructor_toServerJSONObject", function(){
    expect(18);
	
    var info = new SuperMap.REST.OverlapDisplayedOptions();
    
    ok(info !== null,"not null");
    equal(info.allowPointOverlap, true,"info.allowPointOverlap");
    equal(info.allowPointWithTextDisplay, true,"info.allowPointWithTextDisplay");
	equal(info.allowTextOverlap, false,"info.allowTextOverlap");
	equal(info.allowTextAndPointOverlap, true,"info.allowTextAndPointOverlap");
	equal(info.allowThemeGraduatedSymbolOverlap, false,"info.allowThemeGraduatedSymbolOverlap");
	equal(info.allowThemeGraphOverlap, false,"info.allowThemeGraphOverlap");
	equal(info.horizontalOverlappedSpaceSize, 0,"info.horizontalOverlappedSpaceSize");
	equal(info.verticalOverlappedSpaceSize, 0,"info.verticalOverlappedSpaceSize");
	
    var jsonObj = info.toServerJSONObject();
    ok(jsonObj != null, "jsonObj != null");
    equal(info.allowPointOverlap, true,"info.allowPointOverlap");
    equal(info.allowPointWithTextDisplay, true,"info.allowPointWithTextDisplay");
	equal(info.allowTextOverlap, false,"info.allowTextOverlap");
	equal(info.allowTextAndPointOverlap, true,"info.allowTextAndPointOverlap");
	equal(info.allowThemeGraduatedSymbolOverlap, false,"info.allowThemeGraduatedSymbolOverlap");
	equal(info.allowThemeGraphOverlap, false,"info.allowThemeGraphOverlap");
	equal(info.horizontalOverlappedSpaceSize, 0,"info.horizontalOverlappedSpaceSize");
	equal(info.verticalOverlappedSpaceSize, 0,"info.verticalOverlappedSpaceSize");
});

test("TestfromJson_toString_destroy", function(){
    expect(10);
    var info = new SuperMap.REST.OverlapDisplayedOptions();
    info.fromJson({
		allowPointOverlap: false,
		allowPointWithTextDisplay:false,
		allowTextOverlap:true,
		allowTextAndPointOverlap:false,
		allowThemeGraduatedSymbolOverlap:true,
		allowThemeGraphOverlap:true,
		horizontalOverlappedSpaceSize:1,
		verticalOverlappedSpaceSize:0
	});
	var msg = "{'allowPointOverlap':false,'allowPointWithTextDisplay':false,'allowTextOverlap':true,'allowTextAndPointOverlap':false,'allowThemeGraduatedSymbolOverlap':true,'allowThemeGraphOverlap':true,'horizontalOverlappedSpaceSize':1,'verticalOverlappedSpaceSize':0}";
	var str = info.toString();
	equal(str, msg, "toString");
    ok(info != null,"not null");
    info.destroy();
    ok(info.allowPointOverlap === null,"info.allowPointOverlap");
    ok(info.allowPointWithTextDisplay === null,"info.allowPointWithTextDisplay");
     ok(info.allowTextOverlap === null,"info.allowTextOverlap");
    ok(info.allowTextAndPointOverlap === null,"info.allowTextAndPointOverlap");
	 ok(info.allowThemeGraduatedSymbolOverlap === null,"info.allowThemeGraduatedSymbolOverlap");
    ok(info.allowThemeGraphOverlap === null,"info.allowThemeGraphOverlap");
	 ok(info.horizontalOverlappedSpaceSize === null,"info.horizontalOverlappedSpaceSize");
    ok(info.verticalOverlappedSpaceSize === null,"info.verticalOverlappedSpaceSize");
});