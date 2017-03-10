require('../../../src/Core/iServer/EditFeaturesService');

var serviceFailedEventArgsSystem = null;
var editFeaturesEventArgsSystem = null;
var editServiceURL = "http://localhost:8090/iserver/services/data-jingjin/rest/data/datasources/name/Jingjin/datasets/name/Landuse_R";
var options = {
	eventListeners:{
		'processCompleted': editFeaturesServiceCompleted,
		'processFailed':editFeaturesServiceFailed
	}
};
function initEditFeaturesService() {
	return new SuperMap.REST.EditFeaturesService(editServiceURL,options);
}
function editFeaturesServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
function editFeaturesServiceCompleted(editFeaturesEventArgs){
    editFeaturesEventArgsSystem = editFeaturesEventArgs;
}

describe('testEditFeaturesService_processAsync', function () {
	var originalTimeout;
	beforeEach(function() {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
		serviceFailedEventArgsSystem = null;
		editFeaturesEventArgsSystem = null;
	});
	afterEach(function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});

	//测试新增要素 returnContent = true,isUseBatch =true
	it('addFeatures_isUseBatch',function(done){
		var pointList = [], m_list = [],
				p1 = new SuperMap.Geometry.Point(117.75279632955, 39.275271578065),
				p2 = new SuperMap.Geometry.Point(117.73088420723, 39.050672324315),
				p3 = new SuperMap.Geometry.Point(118.15269256183, 39.08901853837),
				p4 = new SuperMap.Geometry.Point(118.20199483705, 39.253359455748),
				m1 = new SuperMap.Geometry.Point(116.75279632955, 38.275271578065),
				m2 = new SuperMap.Geometry.Point(116.73088420723, 38.050672324315),
				m3 = new SuperMap.Geometry.Point(117.15269256183, 40.08901853837),
				m4 = new SuperMap.Geometry.Point(117.20199483705, 40.253359455748),
				linearRing, linearRing1,
				polygon, polygon1,
				features = [],
				editFeatureParameter;
		pointList.push(p1);
		pointList.push(p2);
		pointList.push(p3);
		pointList.push(p4);
		pointList.push(p1);
		m_list.push(m1);
		m_list.push(m2);
		m_list.push(m3);
		m_list.push(m4);
		m_list.push(m1);
		linearRing = new SuperMap.Geometry.LinearRing(pointList);
		polygon = new SuperMap.Geometry.Polygon([linearRing]);
		polygon.id = 0;
		features.push({
			fieldNames:[],
			fieldValues:[],
			geometry:polygon
		});
		linearRing1 = new SuperMap.Geometry.LinearRing(m_list);
		polygon1 = new SuperMap.Geometry.Polygon([linearRing1]);
		polygon1.id = 0;
		features.push({
			fieldNames:[],
			fieldValues:[],
			geometry:polygon1
		});
		editFeatureParameter = new EditFeaturesParameters({
			features: features,
			editType: EditType.ADD,
			returnContent:true,
			isUseBatch: true
		});
		var editFeaturesService = initEditFeaturesService();
		var isInTheSameDomain = SuperMap.Util.isInTheSameDomain(editFeaturesService.url);
		expect(editFeaturesService).not.toBeNull();
		if(!isInTheSameDomain) {
			expect(editFeaturesService.url).toEqual(editServiceURL + "/features.jsonp?");
		}else {
			expect(editFeaturesService.url).toEqual(editServiceURL + "/features.json?");
		}
		editFeaturesService.processAsync(editFeatureParameter);

		setTimeout(function(){
			try{
				var editFeaturesResult = editFeaturesEventArgsSystem.result;
				expect(editFeaturesResult).not.toBeNull();
				expect(editFeaturesResult.succeed).toBeTruthy();
				editFeaturesService.destroy();
				expect(editFeaturesService.EVENT_TYPES).toBeNull();
				expect(editFeaturesService.events).toBeNull();
				expect(editFeaturesService.eventListeners).toBeNull();
				expect(editFeaturesService.returnContent).toBeNull();
				expect(editFeaturesService.isUseBatch).toBeNull();
				editFeatureParameter.destroy();
				done();
			}catch(exception){
				expect(false).toBeTruthy();
				console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
				editFeaturesService.destroy();
				editFeatureParameter.destroy();
				done();
			}
		},6000)
	});

	//测试新增要素 returnContent = false
	it('addFeatures_notReturnContent',function(done){
		var pointList = [],
				p1 = new SuperMap.Geometry.Point(118.05408801141, 38.837029131724),
				p2 = new SuperMap.Geometry.Point(117.80757663534, 38.606951847395),
				p3 = new SuperMap.Geometry.Point(118.43207212138, 38.530259419285),
				linearRing,
				polygon,
				features,
				editFeatureParameter;
		pointList.push(p1);
		pointList.push(p2);
		pointList.push(p3);
		pointList.push(p1);
		linearRing = new SuperMap.Geometry.LinearRing(pointList);
		polygon = new SuperMap.Geometry.Polygon([linearRing]);
		polygon.id = 0;
		features = {
			fieldNames:[],
			fieldValues:[],
			geometry:polygon
		};
		editFeatureParameter = new EditFeaturesParameters({
			features: [features],
			editType: EditType.ADD,
			returnContent:false
		});
		var editFeaturesService = initEditFeaturesService();
		editFeaturesService.processAsync(editFeatureParameter);

		setTimeout(function(){
			try{
				var editFeaturesResult = editFeaturesEventArgsSystem.result;
				expect(editFeaturesResult).not.toBeNull();
				expect(editFeaturesResult.succeed).toBeTruthy();
				expect(editFeaturesResult.newResourceID).not.toBeNull();
				expect(editFeaturesResult.newResourceLocation).not.toBeNull();
				editFeaturesService.destroy();
				editFeatureParameter.destroy();
				done();
			}catch(exception){
				expect(false).toBeTruthy();
				console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
				editFeaturesService.destroy();
				editFeatureParameter.destroy();
				done();
			}
		},6000);
	});

	it('addFeatures_noParameters',function(done) {
		var editFeaturesService = initEditFeaturesService();
		editFeatureParameter = new EditFeaturesParameters({
			editType: EditType.ADD,
			returnContent: true
		});
		editFeaturesService.processAsync(editFeatureParameter);

		setTimeout(function () {
			try {
				expect(serviceFailedEventArgsSystem).not.toBeNull();
				expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
				//iserver的错误信息变来变去的，这一句先注释掉
				//equal(editFeaturesResult.errorMsg, "在FeaturesResource中，在把请求体转化成对象时失败");
				editFeaturesService.destroy();
				editFeatureParameter.destroy();
				done();
			} catch (exception) {
				expect(false).toBeTruthy();
				console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
				editFeaturesService.destroy();
				editFeatureParameter.destroy();
				done();
			}
		}, 6000);
	});

	//测试编辑要素
	it('editFeatures',function(done){
		var editFeaturesService = initEditFeaturesService();
		var pointList = [],
				p1 = new SuperMap.Geometry.Point(118.05408801141, 38.837029131724),
				p2 = new SuperMap.Geometry.Point(117.80757663534, 38.606951847395),
				p3 = new SuperMap.Geometry.Point(118.43207212138, 38.530259419285),
				p4 = new SuperMap.Geometry.Point(118.56207212138, 38.660259419285),
				linearRing,
				polygon,
				features,
				editFeatureParameter;
		pointList.push(p1);
		pointList.push(p2);
		pointList.push(p3);
		pointList.push(p4);
		pointList.push(p1);
		linearRing = new SuperMap.Geometry.LinearRing(pointList);
		polygon = new SuperMap.Geometry.Polygon([linearRing]);
		polygon.id = 173;
		features = {
			fieldNames:[],
			fieldValues:[],
			geometry:polygon
		};
		editFeatureParameter = new EditFeaturesParameters({
			features: [features],
			editType: EditType.UPDATE
		});
		editFeaturesService.processAsync(editFeatureParameter);

		setTimeout(function(){
			try{
				//成功编辑
				// var editFeaturesResult = editFeaturesService.lastResult;
				// ok(editFeaturesResult !== null,"editFeaturesService.lastResult");
				// ok(editFeaturesResult.resourceInfo !== null,"editFeaturesResult.resourceInfo");
				// equal(editFeaturesResult.resourceInfo.succeed, true,"editFeaturesResult.resourceInfo.succeed");
				// ok(editFeaturesResult.IDs === null,"editFeaturesResult.IDs:"+editFeaturesResult.IDs);
				//失败编辑
				expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
				editFeaturesService.destroy();
				editFeatureParameter.destroy();
				done();
			}catch(exception){
				expect(false).toBeTruthy();
				console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
				editFeaturesService.destroy();
				editFeatureParameter.destroy();
				done();
			}
		},6000);
	});

/*	//测试删除要素
	it('deleteFeatures',function(done){
		var editFeaturesService = initEditFeaturesService();
		var editFeatureParameter = new EditFeaturesParameters({
			IDs: [172, 173],
			editType: EditType.DELETE
		});
		editFeaturesService.processAsync(editFeatureParameter);

		setTimeout(function() {
			try{
				//成功删除
				if(editFeaturesEventArgsSystem!==null){
					expect(editFeaturesEventArgsSystem.result).not.toBeNull();
					expect(editFeaturesEventArgsSystem.result.succeed).toBeTruthy();
					//expect(editFeaturesEventArgsSystem.result.IDs).toBeNull();
					// var editFeaturesResult = editFeaturesService.lastResult;
					// ok(editFeaturesResult !== null,"editFeaturesService.lastResult");
					// ok(editFeaturesResult.resourceInfo !== null,"editFeaturesResult.resourceInfo");
					// equal(editFeaturesResult.resourceInfo.succeed, true,"editFeaturesResult.resourceInfo.succeed");
					// ok(editFeaturesResult.IDs === null,"editFeaturesResult.IDs:"+editFeaturesResult.IDs);
				}
				//失败删除
				else {
					expect(serviceFailedEventArgsSystem.error).not.toBeNull();
					expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
				}
				editFeaturesService.destroy();
				editFeatureParameter.destroy();
				done();
			}catch(exception){
			expect(false).toBeTruthy();
				console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
				editFeaturesService.destroy();
				editFeatureParameter.destroy();
				done();
			}
		},6000);
	})*/
});