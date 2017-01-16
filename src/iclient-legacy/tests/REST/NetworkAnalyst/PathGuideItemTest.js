module("PathGuideItem");

test("TestDefaultConstructor", function() {
    expect(15);
    var pathGuideItem;
    pathGuideItem = new SuperMap.REST.PathGuideItem();
    ok(pathGuideItem.bounds == null, "bounds");
    ok(pathGuideItem.directionType == null, "directionType");
    ok(pathGuideItem.distance == null, "distance");    
    ok(pathGuideItem.id == null, "id");    
    ok(pathGuideItem.index == null, "index");    
    ok(pathGuideItem.isEdge == null, "isEdge");  
    ok(pathGuideItem.isStop == null, "isStop"); 
    ok(pathGuideItem.length == null, "length"); 
    ok(pathGuideItem.name == null, "name"); 
    ok(pathGuideItem.sideType == null, "sideType"); 
    ok(pathGuideItem.turnAngle == null, "turnAngle"); 
    ok(pathGuideItem.turnType == null, "turnType"); 
    ok(pathGuideItem.weight == null, "weight");
	ok(pathGuideItem.geometry == null, "geometry");
	ok(pathGuideItem.description == null, "description");	
});

test("TestConstructor", function() {
    expect(16);
    var pathGuideItem;
    pathGuideItem = new SuperMap.REST.PathGuideItem({
        directionType: SuperMap.REST.DirectionType.EAST,
        distance: 10,
        id: 1,
        index: 1,
        isEdge: true,
        isStop: true,
        length: 2,
        name: "test",
        sideType: SuperMap.REST.SideType.LEFT,
        turnAngle: 30,
        turnType: SuperMap.REST.TurnType.END,
        weight: 10,
		description: "从这里开始",
		geometry: new SuperMap.Geometry.Point(15,15)
    });

    ok(pathGuideItem.bounds == null, "bounds");
    ok(pathGuideItem.directionType == SuperMap.REST.DirectionType.EAST, "directionType");
    ok(pathGuideItem.distance == 10, "distance");    
    ok(pathGuideItem.id == 1, "id");    
    ok(pathGuideItem.index == 1, "index");    
    ok(pathGuideItem.isEdge == true, "isEdge");  
    ok(pathGuideItem.isStop == true, "isStop"); 
    ok(pathGuideItem.length == 2, "length"); 
    ok(pathGuideItem.name == "test", "name"); 
    ok(pathGuideItem.sideType == SuperMap.REST.SideType.LEFT, "sideType"); 
    ok(pathGuideItem.turnAngle == 30, "turnAngle"); 
    ok(pathGuideItem.turnType == SuperMap.REST.TurnType.END, "turnType"); 
    ok(pathGuideItem.weight == 10, "weight");
	ok(pathGuideItem.description === "从这里开始", "description");
	ok(pathGuideItem.geometry.x === 15, "geometry.x");
	ok(pathGuideItem.geometry.y === 15, "geometry.y");
});

test("TestDestructor", function() {
    expect(15);
    var pathGuideItem;
    pathGuideItem = new SuperMap.REST.PathGuideItem({
        directionType: SuperMap.REST.DirectionType.EAST,
        distance: 10,
        id: 1,
        index: 1,
        isEdge: true,
        isStop: true,
        length: 2,
        name: "test",
        sideType: SuperMap.REST.SideType.LEFT,
        turnAngle: 30,
        turnType: SuperMap.REST.TurnType.END,
        weight: 10,
		desription: "从这里开始",
		geometry: new SuperMap.Geometry.Point(15,15)
    });

    pathGuideItem.destroy();
    ok(pathGuideItem.bounds == null, "bounds");
    ok(pathGuideItem.directionType == null, "directionType");
    ok(pathGuideItem.distance == null, "distance");    
    ok(pathGuideItem.id == null, "id");    
    ok(pathGuideItem.index == null, "index");    
    ok(pathGuideItem.isEdge == null, "isEdge");  
    ok(pathGuideItem.isStop == null, "isStop"); 
    ok(pathGuideItem.length == null, "length"); 
    ok(pathGuideItem.name == null, "name"); 
    ok(pathGuideItem.sideType == null, "sideType"); 
    ok(pathGuideItem.turnAngle == null, "turnAngle"); 
    ok(pathGuideItem.turnType == null, "turnType"); 
    ok(pathGuideItem.weight == null, "weight"); 
	ok(pathGuideItem.description == null, "description"); 
	ok(pathGuideItem.geometry == null, "geometry"); 
});