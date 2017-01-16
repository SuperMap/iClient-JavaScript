module("EditFeaturesParametersTest");

test("DefaultConstructor_Test",function(){
	var editFeaturesParameters = new SuperMap.REST.EditFeaturesParameters();
	ok(editFeaturesParameters != null, "editFeaturesParameters is not null");
	ok(editFeaturesParameters.features == null, "default editFeaturesParameters.features is null");
	ok(editFeaturesParameters.editType == SuperMap.REST.EditType.ADD, "default editFeaturesParameters.editType is null");
	ok(editFeaturesParameters.IDs == null, "default editFeaturesParameters.IDs is null");
	ok(editFeaturesParameters.returnContent == false, "default editFeaturesParameters.returnContent is false");
	ok(editFeaturesParameters.isUseBatch == false, "default editFeaturesParameters.isUseBatch is false");
});

test("Constructor_for_EditType_delete", function(){
	var geometry = new SuperMap.Geometry.Point(112,36);
	geometry.id = "5000";
	var feature = { 
		fieldNames:[],
        fieldValues:[],
        geometry:geometry}; 
	var editFeaturesParameters = new SuperMap.REST.EditFeaturesParameters({
		returnContent: true,
		features: [feature],
		IDs:[1,2,3],
		editType: SuperMap.REST.EditType.DELETE
	});
	
	ok(editFeaturesParameters != null, "editFeaturesParameters is not null");
	ok(editFeaturesParameters.features != null, "editFeaturesParameters.features is not null");
	equal(editFeaturesParameters.editType, SuperMap.REST.EditType.DELETE, "editFeaturesParameters.editType is delete");
	ok(editFeaturesParameters.IDs != null, "editFeaturesParameters.IDs is not null");
	ok(editFeaturesParameters.returnContent == true, "editFeaturesParameters.returnContent is true");
	ok(editFeaturesParameters.isUseBatch == false, "editFeaturesParameters.isUseBatch is false");
	var toJsonParameters = SuperMap.REST.EditFeaturesParameters.toJsonParameters(editFeaturesParameters);
	equal("{'ids':[1,2,3]}",toJsonParameters,"editFeaturesParameters.toJsonParameters while delete");
	
	editFeaturesParameters.destroy();
	ok(editFeaturesParameters.features == null, "editFeaturesParameters.features is null");
	ok(editFeaturesParameters.editType == null, "editFeaturesParameters.editType is null");
	ok(editFeaturesParameters.IDs == null, "editFeaturesParameters.IDs is null");
	ok(editFeaturesParameters.returnContent == null, "editFeaturesParameters.returnContent is null");
});

test("Constructor_for_EditType_delete_withoutIDs", function(){
	var editFeaturesParameters = new SuperMap.REST.EditFeaturesParameters({
		returnContent: true,
		editType: SuperMap.REST.EditType.DELETE
	});
	
	ok(editFeaturesParameters != null, "editFeaturesParameters is not null");
	ok(editFeaturesParameters.features == null, "editFeaturesParameters.features is  null");
	equal(editFeaturesParameters.editType, SuperMap.REST.EditType.DELETE, "editFeaturesParameters.editType is delete");
	ok(editFeaturesParameters.IDs == null, "editFeaturesParameters.IDs is null");
	ok(editFeaturesParameters.returnContent == true, "editFeaturesParameters.returnContent is true");
	ok(editFeaturesParameters.isUseBatch == false, "editFeaturesParameters.isUseBatch is false");
	var toJsonParameters = SuperMap.REST.EditFeaturesParameters.toJsonParameters(editFeaturesParameters);
	equal(undefined,toJsonParameters,"editFeaturesParameters.toJsonParameters while delete without IDs");
});


test("Constructor_for_EditType_add", function(){
	var geometry = new SuperMap.Geometry.Point(112,36);
	geometry.id = "5000";
	var feature = { 
		fieldNames:[],
        fieldValues:[],
        geometry:geometry}; 
	var editFeaturesParameters = new SuperMap.REST.EditFeaturesParameters({
		returnContent: false,
		features: [feature],
		IDs:[1,2,3],
		isUseBatch: true,
		editType: SuperMap.REST.EditType.ADD
	});
	
	ok(editFeaturesParameters != null, "editFeaturesParameters is not null");
	ok(editFeaturesParameters.features != null, "editFeaturesParameters.features is not null");
	equal(editFeaturesParameters.editType, SuperMap.REST.EditType.ADD, "editFeaturesParameters.editType is delete");
	ok(editFeaturesParameters.IDs != null, "editFeaturesParameters.IDs is not null");
	ok(editFeaturesParameters.returnContent == false, "editFeaturesParameters.returnContent is false");
	ok(editFeaturesParameters.isUseBatch == true, "editFeaturesParameters.returnContent is true");
	var toJsonParameters = SuperMap.REST.EditFeaturesParameters.toJsonParameters(editFeaturesParameters);
	// equal("[{'fieldNames':[], 'fieldValues':[], 'geometry':{'id':0, 'style':null, 'parts':[1], 'points':[{'id':\"SuperMap.Geometry.Point_4\", 'x':112, 'y':36, 'bounds':null}], 'type':\"POINT\"}}]",toJsonParameters, "editFeaturesParameters.toJsonParameters while add");
	
	editFeaturesParameters.destroy();
	ok(editFeaturesParameters.features == null, "editFeaturesParameters.features is null");
});


test("Constructor_for_EditType_add_without_features", function(){
	var editFeaturesParameters = new SuperMap.REST.EditFeaturesParameters({
		returnContent: false,
		editType: SuperMap.REST.EditType.ADD
	});
	
	ok(editFeaturesParameters != null, "editFeaturesParameters is not null");
	ok(editFeaturesParameters.features == null, "editFeaturesParameters.features is null");
	equal(editFeaturesParameters.editType, SuperMap.REST.EditType.ADD, "editFeaturesParameters.editType is delete");
	ok(editFeaturesParameters.IDs == null, "editFeaturesParameters.IDs is not null");
	ok(editFeaturesParameters.returnContent == false, "editFeaturesParameters.returnContent is false");
	ok(editFeaturesParameters.isUseBatch == false, "editFeaturesParameters.isUseBatch is false");
	var toJsonParameters = SuperMap.REST.EditFeaturesParameters.toJsonParameters(editFeaturesParameters);
	equal(undefined,toJsonParameters, "editFeaturesParameters.toJsonParameters while add without features");
});
