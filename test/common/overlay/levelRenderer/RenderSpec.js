import {Render} from '../../../../src/common/overlay/levelRenderer/Render';
import {Group} from '../../../../src/common/overlay/levelRenderer/Group';
import {SmicStar} from '../../../../src/common/overlay/levelRenderer/SmicStar';
import {SmicCircle} from '../../../../src/common/overlay/levelRenderer/SmicCircle';

describe('Render', () => {
    var testDiv, render;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "render");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "400px";
        testDiv.style.height = "400px";
        window.document.body.appendChild(testDiv);
    });
    beforeEach(() => {
        render = new Render('render', testDiv);
    });
    afterEach(() => {
        render.destroy();
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
    });

    it('constructor, destroy', () => {
        expect(render).not.toBeNull();
        expect(render.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Render");
        expect(render.id).toEqual("render");
        expect(render.animatingElements).toEqual([]);
        expect(render.storage).not.toBeNull();
        expect(render.painter).not.toBeNull();
        expect(render.handler).not.toBeNull();
        expect(render.animation).not.toBeNull();
        render.destroy();
        expect(render.id).toBeNull();
        expect(render.storage).toBeNull();
        expect(render.painter).toBeNull();
        expect(render.handler).toBeNull();
        expect(render.animation).toBeNull();
        expect(render.animatingElements).toBeNull();
    });

    it('getId', () => {
        var id = render.getId();
        expect(id).toEqual("render");
    });

    it('addShape, modShape, delShape', () => {
        var shape = new SmicStar({style: {x: 100, y: 100, r: 50, n: 5}});
        var newShape = new SmicStar({style: {x: 100, y: 100, r: 55, n: 5}});
        render.addShape(shape);
        expect(render).not.toBeNull();
        expect(render.storage._roots.length).toEqual(1);
        expect(render.storage._roots[0].type).toEqual("smicstar");
        expect(render.storage._roots[0].style.r).toEqual(50);
        var shapeId = render.storage._roots[0].id;
        expect(shapeId).toContain("smShape");
        render.modShape(shapeId, newShape);
        expect(render.storage._roots[0].style.r).toEqual(55);
        render.delShape(shapeId);
        expect(render.storage._roots.length).toEqual(0);
    });

    //添加组到根节点
    it('addGroup, modGroup, delGroup', () => {
        var group = new Group();
        group.addChild(new SmicCircle({
            style: {x: 100, y: 100, r: 20, brushType: 'fill'}
        }));
        render.addGroup(group);
        expect(render).not.toBeNull();
        expect(render.storage._roots.length).toEqual(1);
        expect(render.storage._roots[0].type).toEqual("group");
        expect(render.storage._roots[0]._children.length).toEqual(1);
        expect(render.storage._roots[0]._children[0].type).toEqual("smiccircle");
        expect(render.storage._roots[0]._children[0].style.r).toEqual(20);
        var groupId = render.storage._roots[0].id;
        expect(groupId).toContain("smShapeGroup");
        var newGroup = group.addChild(new SmicCircle({
            style: {x: 100, y: 100, r: 15, brushType: 'fill'}
        }));
        render.modGroup(groupId, newGroup);
        expect(render.storage._roots[0]._children.length).toEqual(2);
        render.delGroup(groupId);
        expect(render.storage._roots.length).toEqual(0);
    });

    it('modLayer', () => {
        expect(render.painter._layerConfig).toEqual({});
        var config = {
            clearColor: 0,
            motionBlur: false,
            lastFrameAlpha: 0.8,
            position: [5],
            rotation: [3]
        };
        render.modLayer(0, config);
        expect(render.painter._layerConfig[0]).not.toBeNull();
        expect(render.painter._layerConfig[0].clearColor).toEqual(0);
        expect(render.painter._layerConfig[0].motionBlur).toBeFalsy();
        expect(render.painter._layerConfig[0].lastFrameAlpha).toEqual(0.8);
        expect(render.painter._layerConfig[0].position).toEqual([5]);
        expect(render.painter._layerConfig[0].rotation).toEqual([3]);
        expect(render).not.toBeNull();
    });

    it('addHoverShape', () => {
        var shape = new SmicStar({style: {x: 100, y: 100, r: 50, n: 5}});
        render.addHoverShape(shape);
        expect(render).not.toBeNull();
        expect(render.storage._hoverElements.length).toEqual(1);
        expect(render.storage._hoverElements[0].id).toContain("smShape");
        expect(render.storage._hoverElements[0].type).toEqual("smicstar");
        render.refreshHover();
    });

    //标记视图在浏览器下一帧需要绘制
    it('refreshNextFrame', () => {
        var shape = new SmicStar({style: {x: 100, y: 100, r: 50, n: 5}});
        render.addShape(shape);
        render.render();
        render.refresh();
        expect(render._needsRefreshNextFrame).toBeFalsy();
        render.refreshNextFrame();
        expect(render._needsRefreshNextFrame).toBeTruthy();
    });

    it('resize', () => {
        render.painter._height = 350;
        render.resize();
        expect(render.painter._height).toEqual(400);
    });

    it('refreshShapes', () => {
        var shape = new SmicStar({style: {x: 100, y: 100, r: 50, n: 5}});
        render.addShape(shape);
        render.render();
        var shapeList = render.storage._shapeList;
        spyOn(render, 'refreshShapes').and.callThrough();
        render.refreshShapes(shapeList);
        expect(render.refreshShapes).toHaveBeenCalledWith(shapeList);
        expect(render).not.toBeNull();
        expect(render.storage._shapeList.length).toEqual(1);
    });

    //动画对象为Shape数组, 且动画不循环
    it('animate_shape', () => {
        var shape = new SmicStar({style: {x: 100, y: 100, r: 50, n: 5}});
        render.addShape(shape);
        render.render();
        var id = render.storage._shapeList[0].id;
        var animator = render.animate(id, 'style', false);
        expect(animator).not.toBeNull();
        expect(animator.animation._time).not.toBeNaN();
        expect(animator.animation._running).toBeTruthy();
        expect(animator._loop).toBeFalsy();
        expect(animator._target.pointList.length).toBeGreaterThan(0);
        for (var i = 0; i < animator._target.pointList.length; i++) {
            expect(animator._target.pointList[i].length).toEqual(2);
        }
        expect(animator._target.r).toEqual(50);
        expect(animator._target.n).toEqual(5);
        expect(animator._target.x).toEqual(100);
        expect(animator._target.y).toEqual(100);
        animator.start();
        render.clearAnimation();
    });

    //动画对象为Group数组, 且动画不循环
    it('animate_group, clearAnimation', () => {
        var group = new Group();
        group.addChild(new SmicCircle({
            style: {x: 100, y: 100, r: 20, brushType: 'fill'}
        }));
        render.addGroup(group);
        render.render();
        var groupList = render.storage._roots;
        var animator = render.animate(groupList, '', false);
        expect(animator).not.toBeNull();
        expect(animator.animation._time).not.toBeNaN();
        expect(animator.animation._running).toBeTruthy();
        expect(animator._loop).toBeFalsy();
        expect(animator._target.length).toEqual(1);
        expect(animator._target[0].type).toEqual("group");
        expect(animator._target[0].id).toContain("smShapeGroup");
        expect(animator._target[0]._storage._shapeList.length).toEqual(1);
        expect(animator._target[0]._storage._shapeList[0].type).toEqual("smiccircle");
        animator.start();
        render.clearAnimation();
    });

    //动画对象为Shape数组, 且动画循环
    it('animate_shape', () => {
        var shape = new SmicStar({style: {x: 100, y: 100, r: 50, n: 5}});
        render.addShape(shape);
        render.render();
        var shapeList = render.storage._shapeList;
        var err1 = render.animate(shapeList, 'style', true);
        expect(err1).toBeUndefined();
        var err2 = render.animate('', '', true);
        expect(err2).toBeUndefined();
    });

    it('getWidth, getHeight, toDataURL, shapeToImage', () => {
        var shape = new SmicStar({style: {x: 100, y: 100, r: 50, n: 5}});
        render.addShape(shape);
        render.render();
        var width = render.getWidth();
        var height = render.getHeight();
        expect(width).toEqual(400);
        expect(height).toEqual(400);
        var imgUrl = render.toDataURL('PNG', "#FFFFFF", {});
        expect(imgUrl).toContain("image/png");
        var image = render.shapeToImage(shape, width, height);
        expect(image).not.toBeNull();
        expect(image.type).toEqual("smicimage");
    });

    it('updateHoverShapes', () => {
        var shape = new SmicStar({style: {x: 100, y: 100, r: 50, n: 5}});
        render.addShape(shape);
        render.render();
        expect(render.storage._hoverElements).toEqual([]);
        render.updateHoverShapes([shape]);
        expect(render).not.toBeNull();
        expect(render.storage._hoverElements.length).toEqual(1);
        expect(render.storage._hoverElements[0].type).toEqual("smicstar");
    });
});