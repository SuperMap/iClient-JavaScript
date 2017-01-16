module("GeoRelationAnalystParameters");

test("TestDefaultConstructor", function() {
	expect(10); 
	
	var params = new SuperMap.REST.GeoRelationAnalystParameters();
	
	ok(params !== null, "params not null");
	equal(params.dataset, null, "params.dataset");
	equal(params.sourceFilter, null, "params.sourceFilter");
	equal(params.referenceFilter, null, "params.referenceFilter");
	equal(params.spatialRelationType, null, "params.spatialRelationType");
	equal(params.isBorderInside, null, "params.isBorderInside");
	equal(params.returnFeature, null, "params.returnFeature");
	equal(params.returnGeoRelatedOnly, null, "params.returnGeoRelatedOnly");
	equal(params.startRecord, 0, "params.startRecord");
	equal(params.expectCount, 500, "params.expectCount");
});
test("TestConstructor_custom_destroy", function() {
	expect(18); 
	//配置动态分段Parameters
	params = new SuperMap.REST.GeoRelationAnalystParameters({
				dataset: "Park@Changchun",
                startRecord: 0,
                expectCount: 20,
                sourceFilter: new SuperMap.REST.FilterParameter(),
                referenceFilter: new SuperMap.REST.FilterParameter(),
                spatialRelationType: SuperMap.REST.SpatialRelationType.INTERSECT,
                isBorderInside: true,
                returnFeature: false,
                returnGeoRelatedOnly: true
	});
	
	ok(params !== null, "params not null");
	equal(params.dataset, "Park@Changchun", "params.dataset");
	equal(params.startRecord, 0, "params.startRecord");
	equal(params.expectCount, 20, "params.expectCount");
	ok(params.sourceFilter != null, "params.sourceFilter");
	ok(params.referenceFilter != null, "params.referenceFilter");
	equal(params.isBorderInside, true, "params.isBorderInside");
	equal(params.returnFeature, false, "params.returnFeature");
	equal(params.returnGeoRelatedOnly, true, "params.returnGeoRelatedOnly");
	
	params.destroy();
	ok(params !== null, "params not null");
	equal(params.dataset, null, "params.dataset");
	equal(params.startRecord, null, "params.startRecord");
	equal(params.expectCount, null, "params.expectCount");
	equal(params.sourceFilter, null, "params.sourceFilter");
	equal(params.referenceFilter, null, "params.referenceFilter");
	equal(params.isBorderInside, null, "params.isBorderInside");
	equal(params.returnFeature, null, "params.returnFeature");
	equal(params.returnGeoRelatedOnly, null, "params.returnGeoRelatedOnly");
});
