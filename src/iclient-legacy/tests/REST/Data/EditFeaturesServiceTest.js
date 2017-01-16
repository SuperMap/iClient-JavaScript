module("EditFeaturesService");

var serviceFailedEventArgsSystem = null,
	editFeaturesEventArgsSystem = null,
	dataServiceURL = GlobeParameter.dataServiceURL,
	editServiceURL = GlobeParameter.editServiceURL;


function initEditFeaturesService() {
    var editFeaturesService = new SuperMap.REST.EditFeaturesService(editServiceURL);
    return editFeaturesService;
}

function editFeaturesServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

function editFeaturesServiceCompleted(editFeaturesEventArgs){
    editFeaturesEventArgsSystem = editFeaturesEventArgs;
}

test("Constructor_token",function(){
	var editFeaturesService = new SuperMap.REST.EditFeaturesService(editServiceURL, {token:88888});
    ok(editFeaturesService !== null,"not null");
    ok(editFeaturesService.token == 88888,"token parameter exist");
});

//测试新增要素 returnContent = true
asyncTest("EditFeaturesService_AddFeatures_isUseBatch_Test",function(){
    var editFeaturesService = initEditFeaturesService();
    var isInTheSameDomain = SuperMap.Util.isInTheSameDomain(editFeaturesService.url);
	
    ok(editFeaturesService !== null,"not null");
	if(!isInTheSameDomain) {
		equal(editFeaturesService.url,editServiceURL + "/features.jsonp?","url");
	}else {
		equal(editFeaturesService.url,editServiceURL + "/features.json?","url");
	}
	
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
		editFeatureParameter,
		editFeaturesService;
		
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
	editFeatureParameter = new SuperMap.REST.EditFeaturesParameters({
		features: features,
		editType: SuperMap.REST.EditType.ADD,
		returnContent:true,
		isUseBatch: true
	});
	editFeaturesService = new SuperMap.REST.EditFeaturesService(editServiceURL, {
		eventListeners: {
			"processCompleted": editFeaturesServiceCompleted,
			"processFailed": editFeaturesServiceFailed
		}
	});
	editFeaturesService.processAsync(editFeatureParameter);

    setTimeout(function() {
        try{
            var editFeaturesResult = editFeaturesService.lastResult;
            ok(editFeaturesResult !== null,"editFeaturesService.lastResult");
            ok(editFeaturesResult.resourceInfo !== null,"editFeaturesResult.resourceInfo");
            ok(editFeaturesResult.resourceInfo.succeed == true,"editFeaturesResult.resourceInfo.succeed");
            
            editFeaturesService.destroy();
            ok(editFeaturesService.EVENT_TYPES === null,"editFeaturesService.EVENT_TYPES");
            ok(editFeaturesService.events === null,"editFeaturesService.events");
			ok(editFeaturesService.eventListeners === null,"editFeaturesService.events");
            ok(editFeaturesService.lastResult === null,"editFeaturesService.lastResult");
            ok(editFeaturesService.returnContent === null,"editFeaturesService.returnContent");
			ok(editFeaturesService.isUseBatch === null,"editFeaturesService.isUseBatch");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});
asyncTest("EditFeaturesService_AddFeatures_noParameters_Test",function(){
    var editFeaturesService = initEditFeaturesService();
    var isInTheSameDomain = SuperMap.Util.isInTheSameDomain(editFeaturesService.url);
	
    ok(editFeaturesService !== null,"not null");
	if(!isInTheSameDomain) {
		equal(editFeaturesService.url,editServiceURL + "/features.jsonp?","url");
	}else {
		equal(editFeaturesService.url,editServiceURL + "/features.json?","url");
	}

	editFeatureParameter = new SuperMap.REST.EditFeaturesParameters({
		editType: SuperMap.REST.EditType.ADD,
		returnContent:true
	});
	editFeaturesService = new SuperMap.REST.EditFeaturesService(editServiceURL, {
		eventListeners: {
			"processCompleted": editFeaturesServiceCompleted,
			"processFailed": editFeaturesServiceFailed
		}
	});
	editFeaturesService.processAsync(editFeatureParameter);

    setTimeout(function() {
        try{
            var editFeaturesResult = serviceFailedEventArgsSystem.error;
            ok(editFeaturesResult !== null,"editFeaturesService");
			//iserver的错误信息变来变去的，这一句先注释掉
            //equal(editFeaturesResult.errorMsg, "在FeaturesResource中，在把请求体转化成对象时失败");
            
            editFeaturesService.destroy();
            ok(editFeaturesService.EVENT_TYPES === null,"editFeaturesService.EVENT_TYPES");
            ok(editFeaturesService.events === null,"editFeaturesService.events");
			ok(editFeaturesService.eventListeners === null,"editFeaturesService.events");
            ok(editFeaturesService.lastResult === null,"editFeaturesService.lastResult");
            ok(editFeaturesService.returnContent === null,"editFeaturesService.returnContent");
			ok(editFeaturesService.isUseBatch === null,"editFeaturesService.isUseBatch");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//测试新增要素 returnContent = false
asyncTest("EditFeaturesService_AddFeatures_notreturnContent_Test",function(){
    var editFeaturesService = initEditFeaturesService();
    var isInTheSameDomain = SuperMap.Util.isInTheSameDomain(editFeaturesService.url);
	
    ok(editFeaturesService !== null,"not null");
	if(!isInTheSameDomain) {
		equal(editFeaturesService.url,editServiceURL + "/features.jsonp?","url");
	}else {
		equal(editFeaturesService.url,editServiceURL + "/features.json?","url");
	}
	
	var pointList = [],
		p1 = new SuperMap.Geometry.Point(118.05408801141, 38.837029131724),
		p2 = new SuperMap.Geometry.Point(117.80757663534, 38.606951847395),
		p3 = new SuperMap.Geometry.Point(118.43207212138, 38.530259419285),
		linearRing,
		polygon,
		features,
		editFeatureParameter,
		editFeaturesService;
		
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
	editFeatureParameter = new SuperMap.REST.EditFeaturesParameters({
		features: [features],
		editType: SuperMap.REST.EditType.ADD,
		returnContent:false
	});
	editFeaturesService = new SuperMap.REST.EditFeaturesService(editServiceURL, {
		eventListeners: {
			"processCompleted": editFeaturesServiceCompleted,
			"processFailed": editFeaturesServiceFailed
		}
	});
	editFeaturesService.processAsync(editFeatureParameter);

    setTimeout(function() {
        try{
            var editFeaturesResult = editFeaturesService.lastResult;
            ok(editFeaturesResult !== null,"editFeaturesService.lastResult");
            ok(editFeaturesResult.resourceInfo !== null,"editFeaturesResult.resourceInfo");
            ok(editFeaturesResult.IDs === null,"editFeaturesResult.IDs:"+editFeaturesResult.IDs);
            
            editFeaturesService.destroy();
            ok(editFeaturesService.EVENT_TYPES === null,"editFeaturesService.EVENT_TYPES");
            ok(editFeaturesService.events === null,"editFeaturesService.events");
			ok(editFeaturesService.eventListeners === null,"editFeaturesService.events");
            ok(editFeaturesService.lastResult === null,"editFeaturesService.lastResult");
            ok(editFeaturesService.returnContent === null,"editFeaturesService.returnContent");
			ok(editFeaturesService.isUseBatch === null,"editFeaturesService.isUseBatch");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//测试编辑要素 
asyncTest("EditFeaturesService_EditFeatures_Test",function(){
    var editFeaturesService = initEditFeaturesService();
	var isInTheSameDomain = SuperMap.Util.isInTheSameDomain(editFeaturesService.url);
	
    ok(editFeaturesService !== null,"not null");
	if(!isInTheSameDomain) {
		equal(editFeaturesService.url,editServiceURL + "/features.jsonp?","url");
	}else {
		equal(editFeaturesService.url,editServiceURL + "/features.json?","url");
	}
	
	var pointList = [],
		p1 = new SuperMap.Geometry.Point(118.05408801141, 38.837029131724),
		p2 = new SuperMap.Geometry.Point(117.80757663534, 38.606951847395),
		p3 = new SuperMap.Geometry.Point(118.43207212138, 38.530259419285),
		p4 = new SuperMap.Geometry.Point(118.56207212138, 38.660259419285),
		linearRing,
		polygon,
		features,
		editFeatureParameter,
		editFeaturesService;
		
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
	editFeatureParameter = new SuperMap.REST.EditFeaturesParameters({
		features: [features],
		editType: SuperMap.REST.EditType.UPDATE
	});
	editFeaturesService = new SuperMap.REST.EditFeaturesService(editServiceURL, {
		eventListeners: {
			"processCompleted": editFeaturesServiceCompleted,
			"processFailed": editFeaturesServiceFailed
		}
	});
	editFeaturesService.processAsync(editFeatureParameter);

    setTimeout(function() {
        try{
			//成功编辑
            // var editFeaturesResult = editFeaturesService.lastResult;
            // ok(editFeaturesResult !== null,"editFeaturesService.lastResult");
            // ok(editFeaturesResult.resourceInfo !== null,"editFeaturesResult.resourceInfo");
			// equal(editFeaturesResult.resourceInfo.succeed, true,"editFeaturesResult.resourceInfo.succeed");
            // ok(editFeaturesResult.IDs === null,"editFeaturesResult.IDs:"+editFeaturesResult.IDs);
			//失败编辑
			var editFeaturesResult = serviceFailedEventArgsSystem.error;
            ok(editFeaturesResult !== null,"editFeaturesResult");
			ok(editFeaturesResult.errorMsg !== null,"editFeaturesResult.errorMsg:" + editFeaturesResult.errorMsg);
            
            editFeaturesService.destroy();
            ok(editFeaturesService.EVENT_TYPES === null,"editFeaturesService.EVENT_TYPES");
            ok(editFeaturesService.events === null,"editFeaturesService.events");
			ok(editFeaturesService.eventListeners === null,"editFeaturesService.events");
            ok(editFeaturesService.lastResult === null,"editFeaturesService.lastResult");
            ok(editFeaturesService.returnContent === null,"editFeaturesService.returnContent");
			ok(editFeaturesService.isUseBatch === null,"editFeaturesService.isUseBatch");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});  

//测试删除要素 
asyncTest("EditFeaturesService_DeleteFeatures_Test",function(){
    var editFeaturesService = initEditFeaturesService();
    var isInTheSameDomain = SuperMap.Util.isInTheSameDomain(editFeaturesService.url);
	
    ok(editFeaturesService !== null,"not null");
	if(!isInTheSameDomain) {
		equal(editFeaturesService.url,editServiceURL + "/features.jsonp?","url");
	}else {
		equal(editFeaturesService.url,editServiceURL + "/features.json?","url");
	}
	
	var editFeatureParameter,
		editFeaturesService;

	editFeatureParameter = new SuperMap.REST.EditFeaturesParameters({
		IDs: [172, 173],
		editType: SuperMap.REST.EditType.DELETE
	});
	editFeaturesService = new SuperMap.REST.EditFeaturesService(editServiceURL, {
		eventListeners: {
			"processCompleted": editFeaturesServiceCompleted,
			"processFailed": editFeaturesServiceFailed
		}
	});
	editFeaturesService.processAsync(editFeatureParameter);

    setTimeout(function() {
        try{
			//成功删除
            // var editFeaturesResult = editFeaturesService.lastResult;
            // ok(editFeaturesResult !== null,"editFeaturesService.lastResult");
            // ok(editFeaturesResult.resourceInfo !== null,"editFeaturesResult.resourceInfo");
			// equal(editFeaturesResult.resourceInfo.succeed, true,"editFeaturesResult.resourceInfo.succeed");
            // ok(editFeaturesResult.IDs === null,"editFeaturesResult.IDs:"+editFeaturesResult.IDs);
			//失败删除
			var editFeaturesResult = serviceFailedEventArgsSystem.error;
            ok(editFeaturesResult !== null,"editFeaturesResult");
			ok(editFeaturesResult.errorMsg !== null,"editFeaturesResult.errorMsg:" + editFeaturesResult.errorMsg);
            
            editFeaturesService.destroy();
            ok(editFeaturesService.EVENT_TYPES === null,"editFeaturesService.EVENT_TYPES");
            ok(editFeaturesService.events === null,"editFeaturesService.events");
			ok(editFeaturesService.eventListeners === null,"editFeaturesService.events");
            ok(editFeaturesService.lastResult === null,"editFeaturesService.lastResult");
            ok(editFeaturesService.returnContent === null,"editFeaturesService.returnContent");
			ok(editFeaturesService.isUseBatch === null,"editFeaturesService.isUseBatch");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});
