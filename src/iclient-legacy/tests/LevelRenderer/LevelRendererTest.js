module ("LevelRenderer");

test("default_attribution",function(){
    expect(3);

    var levelRenderer = new SuperMap.LevelRenderer();
    var zr = levelRenderer.init(document.getElementById('lRendertest'));
    zr.clear();
    zr.addShape(new SuperMap.LevelRenderer.Shape.SmicEllipse({
        style:{
            x: 100,
            y: 100,
            a: 40,
            b: 20,
            brushType: 'both',
            color: 'blue',
            strokeColor: 'red',
            lineWidth: 3,
            text: 'SmicEllipse'
        }
    }));

	ok(levelRenderer instanceof SuperMap.LevelRenderer, "levelRenderer instanceof SuperMap.LevelRenderer");
    equals(levelRenderer.version,'2.0.4',"version");
    equals(levelRenderer.CLASS_NAME, "SuperMap.LevelRenderer","CLASS_NAME");
    zr.destroy();
});

test("TestLevelRenderer_destroy",function(){
    expect(6);

    var levelRenderer = new SuperMap.LevelRenderer();
    var zr = levelRenderer.init(document.getElementById('lRendertest'));
    zr.clear();
    zr.addShape(new SuperMap.LevelRenderer.Shape.SmicBrokenLine({
        style: {
            pointList: [[0, 0], [100, 100], [100, 0]],
            smooth: 'spline',
            strokeColor: 'purple',
            lineWidth:2
        }
    }));
    zr.destroy();

    equals(zr.storage,null,"storage");
    equals(zr.painter,null,"painter");
    equals(zr.handler,null,"handler");
    equals(zr.animatingElements,null,"animatingElements");
    equals(zr.animation,null,"animation");
    equals(zr._needsRefreshNextFrame,null,"_needsRefreshNextFrame");

});

test("TestLevelRenderer_init",function(){
    expect(1);

    var levelRenderer = new SuperMap.LevelRenderer();
    var zr = levelRenderer.init(document.getElementById('lRendertest'));
    zr.clear();
    zr.addShape(new SuperMap.LevelRenderer.Shape.SmicIsogon({
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
    }));

    equals(zr.CLASS_NAME, "SuperMap.LevelRenderer.Render","CLASS_NAME");
    zr.destroy();
});

test("defaultRender_attribution",function(){
    expect(3);

    var render = new SuperMap.LevelRenderer.Render("Render",document.getElementById('lRendertest'));
    render.clear();
    render.addShape(new SuperMap.LevelRenderer.Shape.SmicIsogon({
        style:{
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
    }));

    equals(render.id,"Render","id");
    ok(render._needsRefreshNextFrame==false,"_needsRefreshNextFrame");
    equals(render.CLASS_NAME, "SuperMap.LevelRenderer.Render","CLASS_NAME");
    render.clearAll();
});

test("TestRender_addGroup",function(){
    expect(4);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var g = new SuperMap.LevelRenderer.Group();
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicIsogon({
        style: {
            x: 200,
            y: 200,
            r: 40,
            n: 4,
            brushType: 'both'
        }
    }));
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicPoint({
        style: {
            x: 100,
            y: 100,
            r: 40,
            brushType: 'both',
            color: 'blue',
            strokeColor: 'red',
            lineWidth: 3,
            text: 'point'
        }
    }));
    render.addGroup(g);

    equals(render.storage._roots.length,1,"添加一个组到根节点");
    equals(render.storage._roots[0]._children.length,2,"一个组有两个图形");
    equals(render.storage._roots[0].childAt(0).style.x,200,"第一个图形的x");
    equals(render.storage._roots[0].childAt(1).style.r,40,"第二个图形的r");
    render.clearAll();
});

test("TestRender_addHoverShape",function(){
    expect(2);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var polygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    render.addShape(polygon);
    render.addHoverShape(polygon);

    equals(render.storage._hoverElements.length,1,"添加一个高亮图形");
    equals(render.storage._hoverElements[0].style.color,"blue","添加一个高亮图形");

    render.clearAll();
});

test("TestRender_addShape",function(){
    expect(2);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var rectangle = new SuperMap.LevelRenderer.Shape.SmicRectangle({
        style:{
            x: 90,
            y: 90,
            width: 150,
            height: 100,
            radius: 20
        }
    });
    render.addShape(rectangle);
    render.render();
    render.refreshHover();

    equals(render.storage._roots.length,1,"添加一个图形到图形库");
    equals(render.storage._roots[0].style.x,90,"添加一个图形到图形库的x");
    render.clearAll();
});

test("TestRender_delShape",function(){
    expect(1);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var ring = new SuperMap.LevelRenderer.Shape.SmicRing({
        style:{
            x: 100,
            y: 100,
            r0: 30,
            r: 50
        }
    });
    render.addShape(ring);
    render.delShape(ring.id);
    equals(render.storage._roots.length,0,"从图形库删除一个图形后_roots");
    render.clearAll();
});

test("TestRender_delGroup",function(){
    expect(1);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var g = new SuperMap.LevelRenderer.Group();
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicBrokenLine({
        style:{
            pointList: [[0, 0], [100, 100], [100, 0]],
            smooth:"spline",
            lineWidth:2
        }
    }));
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicSector({
        style: {
            x: 300,
            y: 300,
            r: 60,
            r0: 30,
            startAngle: 0,
            endAngle: 180
        }
    }));
    render.addGroup(g);
    render.render();
    render.delGroup(g);
    render.refreshHover();
    render.refreshNextFrame();

    equals(render.storage._roots.length,0,"添加一个组到根节点");
    render.clearAll();
});

test("TestRender_modShape",function(){
    expect(2);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var sector = new SuperMap.LevelRenderer.Shape.SmicSector({
        style:{
            x: 100,
            y: 100,
            r: 60,
            r0: 30,
            startAngle: 0,
            endAngle: 180
        }
    });
    render.addShape(sector);
    render.render();
    render.modShape(sector.id,new SuperMap.LevelRenderer.Shape.SmicSector({
        style:{
            x: 200,
            y: 200,
            r: 60,
            r0: 30,
            startAngle: 0,
            endAngle: 180
        }
    }));
    render.refresh();

    equals(render.storage._roots.length,1,"更换图形形状后图形库中仍有一个图形");
    equals(render.storage._roots[0].style.x,200,"更换图形形状后的x");
    render.clearAll();
});

test("TestRender_getId",function(){
    expect(1);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var smicPoint = new SuperMap.LevelRenderer.Shape.SmicPoint({
        style:{
            x: 100,
            y: 100,
            r: 40,
            brushType: 'both',
            color: 'blue',
            strokeColor: 'red',
            lineWidth: 3,
            text: 'point'
        }
    });
    render.addShape(smicPoint);
    render.render();
    render.refresh();
    var id = render.getId();

    equals(typeof(id),"string","获取实例唯一标识");

    render.clearAll();
});

//test("TestRenderer_modGroup",function(){
//    expect(1);
//
//    var levelRenderer = new SuperMap.LevelRenderer();
//    var render = levelRenderer.init(document.getElementById('lRendertest'));
//    render.clear();
//    var g1 = new SuperMap.LevelRenderer.Group();
//    g1.addChild(new SuperMap.LevelRenderer.Shape.Circle({
//        style: {
//            x: 100,
//            y: 100,
//            r: 50,
//            brushType: 'fill'
//        }
//    }));
//    var g2 = new SuperMap.LevelRenderer.Group();
//    g2.position[0] = 100;
//    g2.addChild(new SuperMap.LevelRenderer.Shape.Circle({
//        style: {
//            x: 50,
//            y: 50,
//            r: 10,
//            brushType: 'fill'
//        }
//    }));
//    render.addGroup(g1);
//    render.modGroup(g1.id,g2);
//
//    equals(render.storage._roots.length,1,"添加一个组到根节点");
//    render.clearAll();
//});

test("TestRender_animate_shape1",function(){
    expect(1);

    var isSuccess = true;
    try{
        var levelRenderer = new SuperMap.LevelRenderer();
        var render = levelRenderer.init(document.getElementById('lRendertest'));
        render.clear();
        var circle = new SuperMap.LevelRenderer.Shape.SmicStar({
            style: {
                x: 200,
                y: 100,
                r: 100,
                n: 5,
                text: '五角星',
                color : 'rgba(33, 222, 10, 0.1)'
            }
        });
        render.addShape(circle);
        render.render();
        render.refresh();
        render.refreshShapes(circle);
        render.animate(circle.id,'style',true)
            .when(1000, {
                color: 'rgba(222, 222, 10, 1)'
            })
            .start();
        render.clearAll();
    }
    catch(e)
    {
        isSuccess = false;
    }
    equals(isSuccess,true,"动画执行成功");
});

test("TestRender_animate_shape2",function(){
    expect(1);

    var isSuccess = true;
    try{
        var levelRenderer = new SuperMap.LevelRenderer();
        var render = levelRenderer.init(document.getElementById('lRendertest'));
        render.clear();
        var circle = new SuperMap.LevelRenderer.Shape.SmicStar({
            style: {
                x: 200,
                y: 100,
                r: 100,
                n: 5,
                text: '五角星',
                color : 'rgba(33, 222, 10, 0.1)'
            }
        });
        render.addShape(circle);
        render.render();
        render.refresh();
        render.refreshShapes(circle);
        render.animate(circle,'style',true)
            .when(1000, {
                color: 'rgba(222, 222, 10, 1)'
            })
            .start();
        render.clearAll();
    }
    catch(e)
    {
        isSuccess = false;
    }
    equals(isSuccess,true,"动画执行成功");
});

test("TestRender_animate_group",function(){
    expect(1);

    var isSuccess = true;
    try{
        var levelRenderer = new SuperMap.LevelRenderer();
        var render = levelRenderer.init(document.getElementById('lRendertest'));
        render.clear();
        var g = new SuperMap.LevelRenderer.Group();
        g.addChild(new SuperMap.LevelRenderer.Shape.SmicStar({
            style: {
                x: 200,
                y: 100,
                r: 100,
                n: 5,
                text: '五角星'
            }
        }));
        g.addChild(new SuperMap.LevelRenderer.Shape.SmicStar({
            style: {
                x: 250,
                y: 150,
                r: 100,
                n: 5,
                text: '五角星'
            }
        }));
        render.addGroup(g);
        render.render();
        render.refresh();
        render.refreshHover();
        render.animate(g,"",true)
            .when(1000, {
                position: [20, 0]
            })
            .start();
        render.clearAll();
    }
    catch(e)
    {
        isSuccess = false;
    }
    equals(isSuccess,true,"动画执行成功");
});

test("TestRender_clearAnimation",function(){
    expect(1);

    var isSuccess = true;
    try{
        var levelRenderer = new SuperMap.LevelRenderer();
        var render = levelRenderer.init(document.getElementById('lRendertest'));
        render.clear();
        var circle = new SuperMap.LevelRenderer.Shape.SmicStar({
            style: {
                x: 250,
                y: 150,
                r: 100,
                n: 5,
                text: '五角星',
                color : 'rgba(33, 222, 10, 0.1)'
            }
        });
        render.addShape(circle);
        render.render();
        render.refreshShapes(circle);
        render.animate(circle.id,'style',true)
            .when(1000, {
                color: 'rgba(222, 222, 10, 1)'
            })
            .start();
        render.clearAnimation();
        render.clearAll();
    }
    catch(e)
    {
        isSuccess = false;
    }
    equals(isSuccess,true,"停止动画执行成功");
});

test("TestRender_getWidth",function(){
    expect(1);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var smicPolygon = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    render.addShape(smicPolygon);
    render.render();
    var width = render.getWidth();
    render.refreshShapes(smicPolygon);

    equals(width,500,"获取视图宽度");
    render.clearAll();
});

test("TestRender_getHigth",function(){
    expect(1);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var smicRectangle = new SuperMap.LevelRenderer.Shape.SmicRectangle({
        style:{
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            radius: 20
        }
    });
    render.addShape(smicRectangle);
    render.render();
    var higth = render.getHeight();
    render.refreshShapes(smicRectangle);

    equals(higth,500,"获取视图宽度");
    render.clearAll();
});

test("TestRender_toDataURL1",function(){
    expect(1);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var line = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    render.addShape(line);
    render.render();
    var dataURL = render.toDataURL();
    render.refreshNextFrame();

    equals(typeof(dataURL),"string","不含参数时获取图片url");
    render.clearAll();
});

test("TestRender_toDataURL2",function(){
    expect(1);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var line = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    render.addShape(line);
    render.render();
    var dataURL = render.toDataURL("image","#000");
    render.refreshNextFrame();

    equals(typeof(dataURL),"string","含参数时获取图片url");
    render.clearAll();
});

test("TestRender_shapeToImage1",function(){
    expect(1);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var circle = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    render.addShape(circle);
    render.render();
    var shapeToImage = render.shapeToImage(circle,100,100);

    equals(shapeToImage.type,"smicimage","含所有参数时转换后的type");
    render.clearAll();
});

test("TestRender_shapeToImage2",function(){
    expect(1);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var circle = new SuperMap.LevelRenderer.Shape.SmicPolygon({
        style:{
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            color: 'blue'
        }
    });
    render.addShape(circle);
    render.render();
    var shapeToImage = render.shapeToImage(circle);

    equals(shapeToImage.type,"smicimage","含参数不全时转换后的type");
    render.clearAll();
});

test("TestRender_clear",function(){
    expect(2);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var smicText = new SuperMap.LevelRenderer.Shape.SmicText({
        style:{
            text: 'Label',
            x: 100,
            y: 100,
            textFont: '14px Arial'
        }
    });
    render.addShape(smicText);
    render.render();
    render.clear();

    equals(render.storage._roots.length,0,"清空画布后_roots");
    equals(render.storage._hoverElements.length,0,"清空画布后_hoverElements");
    render.clearAll();
});

test("TestRender_dispose",function(){
    expect(5);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var star = new SuperMap.LevelRenderer.Shape.SmicStar({
        style:{
            x: 200,
            y: 100,
            r: 100,
            n: 5,
            text: '五角星'
        }
    });
    render.addShape(star);
    render.render();
    render.dispose();

    equals(render.storage,null,"释放实例后图形仓库对象storage");
    equals(render.painter,null,"释放实例后绘制器对象painter");
    equals(render.handler,null,"释放实例后事件处理对象handler");
    equals(render.animatingElements,null,"释放实例后动画控制数组animatingElements");
    equals(render.animation,null,"释放实例后动画对象animation");
});

test("TestRender_getAllShapes",function(){
    expect(3);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var g = new SuperMap.LevelRenderer.Group();
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicText({
        style: {
            text: 'Label',
            x: 100,
            y: 100,
            textFont: '14px Arial'
        }
    }));
    g.addChild(new SuperMap.LevelRenderer.Shape.SmicStar({
        style: {
            x: 200,
            y: 100,
            r: 100,
            n: 5,
            text: '五角星'
        }
    }));
    render.addGroup(g);
    render.render();
    var arr = render.getAllShapes();

    equals(arr.length,2,"获取所有图形");
    equals(arr[0].style.textFont, '14px Arial',"获取第一个图形brushType");
    equals(arr[1].id,render.storage._roots[0].childAt(1).id,"brushType第二个图形id");
    render.clearAll();
});

test("TestRender_clearAll",function(){
    expect(1);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var bezierCurve = new SuperMap.LevelRenderer.Shape.SmicStar({
        style:{
            x: 200,
            y: 100,
            r: 100,
            n: 5,
            text: '五角星'
        }
    });
    render.addShape(bezierCurve);
    render.render();
    render.clearAll();

    equals(render.storage._roots.length,0,"释放所有实例后_roots");
});

test("TestRender_updateHoverShapes",function(){
    expect(1);

    var levelRenderer = new SuperMap.LevelRenderer();
    var render = levelRenderer.init(document.getElementById('lRendertest'));
    render.clear();
    var ellipse = new SuperMap.LevelRenderer.Shape.SmicEllipse({
        style:{
            x: 100,
            y: 100,
            a: 40,
            b: 20,
            brushType: 'both',
            color: 'blue',
            strokeColor: 'red',
            lineWidth: 3
        }
    });
    render.addShape(ellipse);
    render.render();
    var arr = [];
    arr.push(ellipse);
    render.updateHoverShapes(arr);

    equals(render.storage._hoverElements.length,1,"更新设置显示高亮图层");
    render.clearAll();
});