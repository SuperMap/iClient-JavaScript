module ("Storage");

test("default_attribution",function(){
    expect(2);

    var storage = new SuperMap.LevelRenderer.Storage();
    var c = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    storage.addHover(c);

    ok(storage instanceof SuperMap.LevelRenderer.Storage, "storage instanceof SuperMap.LevelRenderer.Storage");
    equals(storage.CLASS_NAME,"SuperMap.LevelRenderer.Storage","CLASS_NAME");
    storage.destroy();
});

test("TestStorage_addHover",function(){
    expect(1);

    var storage = new SuperMap.LevelRenderer.Storage();

    var c = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    storage.addHover(c);

    equals(storage._hoverElements.length,1,"添加高亮层数据");
    storage.destroy();
});

test("TestStorage_delHover",function(){
    expect(1);

    var storage = new SuperMap.LevelRenderer.Storage();

    var c = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    storage.addHover(c);
    storage.delHover(c);

    equals(storage._hoverElements.length,0,"删除高亮层数据");
    storage.destroy();
});

test("TestStorage_addRoot_shape",function(){
    expect(2);

    var storage = new SuperMap.LevelRenderer.Storage();

    var c = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    storage.addRoot(c);

    equals(storage._roots.length,1,"添加图形(Shape)到根节点");
    equals(storage._elements[c.id].type,"smicpolygon","添加图形(Shape)到根节点时的_elements");
    storage.destroy();
});

test("TestStorage_delRoot_shape1",function(){
    expect(3);

    var storage = new SuperMap.LevelRenderer.Storage();

    var c = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    storage.addRoot(c);
    storage.addHover(c);
    storage.delRoot();

    equals(storage._roots.length,0,"从根节点删除图形(Shape)");
    equals(storage._elements[c.id],undefined,"从根节点删除图形(Shape)时的_elements");
    equals(storage._hoverElements.length,0,"从根节点删除图形(Shape)时的_hoverElements");
    storage.destroy();
});

test("TestStorage_delRoot_shape2",function(){
    expect(3);

    var storage = new SuperMap.LevelRenderer.Storage();

    var c = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    storage.addRoot(c);
    storage.addHover(c);
    storage.delRoot(c.id);

    equals(storage._roots.length,0,"从根节点删除图形(Shape)");
    equals(storage._elements[c.id],undefined,"从根节点删除图形(Shape)时的_elements");
    equals(storage._hoverElements.length,1,"从根节点删除图形(Shape)时的_hoverElements");
    storage.destroy();
});

test("TestStorage_addRoot_group",function(){
    expect(2);

    var storage = new SuperMap.LevelRenderer.Storage();
    var g = new SuperMap.LevelRenderer.Group();
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    }));
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[100, 0], [200, 0], [200, 100], [100, 100]],
            color: 'blue'
        }
    }));
    storage.addRoot(g);

    equals(storage._roots.length,1,"_roots");
    equals(storage._roots[0]._children[0].style.color,"blue","添加组(Group)到根节点");
    storage.destroy();
});

test("TestStorage_delRoot_group1",function(){
    expect(2);

    var storage = new SuperMap.LevelRenderer.Storage();
    var g = new SuperMap.LevelRenderer.Group();
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    }));
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[100, 0], [200, 0], [200, 100], [100, 100]],
            color: 'blue'
        }
    }));
    storage.addRoot(g);
    storage.delRoot();

    equals(storage._roots.length,0,"从根节点删除group时的_roots");
    equals(storage._elements[g.id],undefined,"从根节点删除group时的_elements");
    storage.destroy();
});

test("TestStorage_delRoot_group2",function(){
    expect(2);

    var storage = new SuperMap.LevelRenderer.Storage();
    var g = new SuperMap.LevelRenderer.Group();
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    }));
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[100, 0], [200, 0], [200, 100], [100, 100]],
            color: 'blue'
        }
    }));
    storage.addRoot(g);
    storage.delRoot(g);

    equals(storage._roots.length,0,"从根节点删除group时的_roots");
    equals(storage._elements[g.id],undefined,"从根节点删除group时的_elements");
    storage.destroy();
});

test("TestStorage_delRoot_group3",function(){
    expect(2);

    var storage = new SuperMap.LevelRenderer.Storage();
    var g = new SuperMap.LevelRenderer.Group();
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    }));
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[100, 0], [200, 0], [200, 100], [100, 100]],
            color: 'blue'
        }
    }));
    storage.addRoot(g);
    storage.delRoot(g.id);

    equals(storage._roots.length,0,"从根节点删除group时的_roots");
    equals(storage._elements[g.id],undefined,"从根节点删除group时的_elements");
    storage.destroy();
});

test("TestStorage_addToMap_shape",function(){
    expect(1);

    var storage = new SuperMap.LevelRenderer.Storage();

    var c = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    storage.addToMap(c);

    equals(storage._elements[c.id].type,"smicpolygon","添加图形到 map");
    storage.destroy();
});

test("TestStorage_addToMap_group",function(){
    expect(2);

    var storage = new SuperMap.LevelRenderer.Storage();
    var g = new SuperMap.LevelRenderer.Group();
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    }));
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[100, 0], [200, 0], [200, 100], [100, 100]],
            color: 'blue'
        }
    }));
    storage.addToMap(g);

    equals(storage._elements[g.id].type,"group","添加group到 map");
    equals(storage._elements[g.id]._children.length,2,"添加group到 map");
    storage.destroy();
});

test("TestStorage_delFromMap_shape",function(){
    expect(1);

    var storage = new SuperMap.LevelRenderer.Storage();

    var smicPolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    storage.addToMap(smicPolygon);
    storage.delFromMap(smicPolygon.id);

    equals(storage._elements[smicPolygon.id],undefined,"从map删除shape");
    storage.destroy();
});

test("TestStorage_delFromMap_group",function(){
    expect(2);

    var storage = new SuperMap.LevelRenderer.Storage();
    var g = new SuperMap.LevelRenderer.Group();
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    }));
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[100, 0], [200, 0], [200, 100], [100, 100]],
            color: 'blue'
        }
    }));
    storage.addToMap(g);
    storage.delFromMap(g.id);

    equals(storage._elements[g.id],undefined,"从map删除group时的storage._elements");
    equals(g._storage,null,"从map删除group时的_storage");
    storage.destroy();
});

test("TestStorage_destroy",function(){
    expect(5);

    var storage = new SuperMap.LevelRenderer.Storage();

    var smicPolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    storage.addHover(smicPolygon);
    storage.addRoot(smicPolygon );
    storage.addToMap(smicPolygon);
    storage.destroy();

    equals(storage._shapeList,null,"从map删除shape");
    equals(storage._shapeListOffset,null,"从map删除shape");
    equals(storage._elements,null,"从map删除shape");
    equals(storage._roots,null,"从map删除shape");
    equals(storage._hoverElements,null,"从map删除shape");
});

test("TestStorage_dispose",function(){
    expect(5);

    var storage = new SuperMap.LevelRenderer.Storage();

    var smicPolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    storage.addHover(smicPolygon);
    storage.addRoot(smicPolygon );
    storage.addToMap(smicPolygon);
    storage.dispose();

    equals(storage._shapeList.length,0,"从map删除shape");
    equals(storage._shapeListOffset,0,"从map删除shape");
    equals(storage._elements,null,"从map删除shape");
    equals(storage._roots,null,"从map删除shape");
    equals(storage._hoverElements,null,"从map删除shape");
});

test("TestStorage_drift",function(){
    expect(2);

    var storage = new SuperMap.LevelRenderer.Storage();

    var smicPolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    storage.addToMap(smicPolygon);
    storage.drift(smicPolygon.id,100,100);

    equals(storage._elements[smicPolygon.id].position[0],100,"移动shape的位置后x");
    equals(storage._elements[smicPolygon.id].position[1],100,"移动shape的位置后y");
    storage.destroy();
});

test("TestStorage_get",function(){
    expect(2);

    var storage = new SuperMap.LevelRenderer.Storage();

    var smicPolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    storage.addToMap(smicPolygon);
    var shape = storage.get(smicPolygon.id);

    equals(shape.style.color,'blue',"得到shape的color");
    equals(storage._elements[smicPolygon.id].id,shape.id,"得到shape的id");
    storage.destroy();
});

test("TestStorage_getHoverShapes",function(){
    expect(2);

    var storage = new SuperMap.LevelRenderer.Storage();

    var smicPolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    storage.addHover(smicPolygon);
    var hovershape = storage.getHoverShapes(false);

    equals(hovershape.length,1,"得到Hover层的形状数组");
    equals(hovershape[0].id,smicPolygon.id,"得到Hover层的形状数组的首个图形id");
    storage.destroy();
});

test("TestStorage_getShapeList",function(){
    expect(2);

    var levelRenderer = new SuperMap.LevelRenderer();
    var zr = levelRenderer.init(document.getElementById('lRendertest'));
    var smicisogon1 = new SuperMap.LevelRenderer.Shape.SmicIsogon({
        style: {
            x: 200,
            y: 200,
            r: 40,
            n: 4,
            brushType: 'both',
            color: 'blue',
            strokeColor: 'red',
            lineWidth: 3,
            lineCape:"butt",
            opacity:0.5,
            shadowBlur:2,
            text:"Isogon",
            textFont:"bold 18px verdana"
        }
    });
    var smicisogon2 = new SuperMap.LevelRenderer.Shape.SmicIsogon({
        style: {
            x: 100,
            y: 100,
            r: 40,
            n: 4
        }
    });
    zr.addShape(smicisogon1);
    zr.addShape(smicisogon2);
    zr.render();
    smicisogon1.zlevel = 1;
    smicisogon2.zlevel = 0;
    var shaplist = zr.storage.getShapeList(false);

    equals(shaplist.length,zr.storage._shapeList.length,"不更新得到所有图形的绘制队列");
    equals(zr.storage._shapeList[0].style.x,200,"不更新得到所有图形的绘制队列");
    zr.clearAll();
    zr.destroy();
});

test("TestStorage_getShapeList2",function(){
    expect(2);

    var levelRenderer = new SuperMap.LevelRenderer();
    var zr = levelRenderer.init(document.getElementById('lRendertest'));
    var smicisogon1 = new SuperMap.LevelRenderer.Shape.SmicIsogon({
        style: {
            x: 200,
            y: 200,
            r: 40,
            n: 4,
            brushType: 'both',
            color: 'blue',
            strokeColor: 'red',
            lineWidth: 3,
            lineCape:"butt",
            opacity:0.5,
            shadowBlur:2,
            text:"Isogon",
            textFont:"bold 18px verdana"
        }
    });
    var smicisogon2 = new SuperMap.LevelRenderer.Shape.SmicIsogon({
        style: {
            x: 100,
            y: 100,
            r: 40,
            n: 4
        }
    });
    zr.addShape(smicisogon1);
    zr.addShape(smicisogon2);
    zr.render();
    smicisogon1.zlevel = 1;
    smicisogon2.zlevel = 0;
    var shaplist = zr.storage.getShapeList(true);

    equals(shaplist.length,zr.storage._shapeList.length,"更新得到所有图形的绘制队列");
    equals(zr.storage._shapeList[0].style.x,100,"更新得到所有图形的绘制队列");
    zr.clearAll();
    zr.destroy();
});

test("TestStorage_hasHoverShape",function(){
    expect(1);

    var storage = new SuperMap.LevelRenderer.Storage();

    var smicPolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    storage.addHover(smicPolygon);
    var hashovershape = storage.hasHoverShape();

    ok(hashovershape == true,"是否有图形在高亮层里");
    storage.destroy();
});

test("TestStorage_mod_shape",function(){
    expect(1);

    var levelRenderer = new SuperMap.LevelRenderer();
    var zr = levelRenderer.init(document.getElementById('lRendertest'));
    var smicPolygon1 = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    var smicPolygon2 = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[100, 0], [200, 0], [200, 100], [100, 100]],
            color: 'red'
        }
    });
    zr.addShape(smicPolygon1);
    zr.addShape(smicPolygon2);
    zr.render();
    zr.storage.mod(smicPolygon1.id,smicPolygon2);

    equals(zr.storage._elements[smicPolygon1.id].style.color,"red","修改图形颜色为red");
    zr.clearAll();
    zr.destroy();
});

//test("TestStorage_mod_group",function(){
//    expect(1);
//
//    var levelRenderer = new SuperMap.LevelRenderer();
//    var zr = levelRenderer.init(document.getElementById('lRendertest'));
//    var g1 = new SuperMap.LevelRenderer.Group();
//    var g2 = new SuperMap.LevelRenderer.Group();
//    var smicPolygon1 = new SuperMap.LevelRenderer.Shape.SmicPolygon({
//        style:{
//            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
//            color: 'blue'
//}
//});
//var smicPolygon2 = new SuperMap.LevelRenderer.Shape.SmicPolygon({
//    style:{
//        pointList: [[100, 0], [200, 0], [200, 100], [100, 100]],
//        color: 'red'
//    }
//});
//g1.addChild(smicPolygon1);
//g2.addChild(smicPolygon2);
//zr.addGroup(g1);
//zr.render();
//alert(smicPolygon1.id);
//zr.storage.mod(g1.id,g2);
//alert(smicPolygon1.id);
//
//equals(zr.storage._elements[smicPolygon1.id].id,g2.id,"修改图形颜色为red");
//zr.destroy();
//});

test("TestStorage_updateShapeList",function(){
    expect(1);

    var levelRenderer = new SuperMap.LevelRenderer();
    var zr = levelRenderer.init(document.getElementById('lRendertest'));
    var smicisogon1 = new SuperMap.LevelRenderer.Shape.SmicIsogon({
        style: {
            x: 200,
            y: 200,
            r: 40,
            n: 4,
            brushType: 'both',
            color: 'blue',
            strokeColor: 'red',
            lineWidth: 3,
            lineCape:"butt",
            opacity:0.5,
            shadowBlur:2,
            text:"Isogon",
            textFont:"bold 18px verdana"
        }
    });
    var smicisogon2 = new SuperMap.LevelRenderer.Shape.SmicIsogon({
        style: {
            x: 100,
            y: 100,
            r: 40,
            n: 4
        }
    });
    zr.addShape(smicisogon1);
    zr.addShape(smicisogon2);
    zr.render();
    smicisogon1.zlevel = 1;
    smicisogon2.zlevel = 0;
    zr.storage.updateShapeList();

    equals(zr.storage._shapeList[0].style.x,100,"更新得到所有图形的绘制队列");
    zr.clearAll();
    zr.destroy();
});