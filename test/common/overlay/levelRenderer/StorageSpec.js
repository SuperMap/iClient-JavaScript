import {Storage} from '../../../../src/common/overlay/levelRenderer/Storage';
import {Group} from '../../../../src/common/overlay/levelRenderer/Group';
import {SmicStar} from '../../../../src/common/overlay/levelRenderer/SmicStar';
import {Painter} from '../../../../src/common/overlay/levelRenderer/Painter';

describe('Storage', () => {
    var testDiv;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "group");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "400px";
        testDiv.style.height = "400px";
        testDiv.style.border = "1px solid #000000";
        window.document.body.appendChild(testDiv);
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
    });
    it('constructor, destroy, dispose', () => {
        var storage = new Storage();
        spyOn(storage, 'dispose').and.callThrough();
        expect(storage).not.toBeNull();
        expect(storage.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Storage");
        //因为还没有传任何shape，所以一下判断的长度都为0
        expect(storage._hoverElements.length).toEqual(0);
        expect(storage._shapeList.length).toEqual(0);
        expect(storage._roots.length).toEqual(0);
        storage.destroy();
        expect(storage.dispose).toHaveBeenCalled();
        expect(storage._hoverElements).toBeNull();
        expect(storage._shapeList).toBeNull();
        expect(storage._roots).toBeNull();
    });

    //遍历迭代器
    it('iterShape, getShapeList, addHover, addRoot', () => {
        var storage = new Storage();
        var shape = new SmicStar({
            style: {x: 100, y: 100, r: 50, n: 5}
        });
        storage.addHover(shape);
        storage.addRoot(shape);
        var painter = new Painter(testDiv, storage);
        painter.render();
        expect(storage._hoverElements.length).toEqual(1);
        expect(storage._shapeList.length).toEqual(1);
        storage.iterShape((el) => {
            return false;
        });
        expect(storage).not.toBeNull();
        storage.iterShape((el) => {
            return true;
        });
        expect(storage).not.toBeNull();

        var option = {hover: true, normal: 'up', update: true};
        storage.iterShape(() => {
            return false;
        }, option);
        expect(storage).not.toBeNull();
        storage.iterShape(() => {
            return true;
        }, option);
        expect(storage).not.toBeNull();
        expect(storage._shapeList[0].id).toContain("smShape");
        expect(storage._shapeList[0].type).toEqual("smicstar");
        expect(storage._shapeList[0].style.n).toEqual(5);
        storage.destroy();
    });

    //返回 hover 层的形状数组
    it('getHoverShapes', () => {
        var storage = new Storage();
        var shape1 = new SmicStar({
            style: {x: 100, y: 100, r: 50, n: 4}
        });
        var shape2 = new SmicStar({
            style: {x: 150, y: 150, r: 50, n: 4}
        });
        storage.addHover(shape1);
        storage.addHover(shape2);
        expect(storage._hoverElements.length).toEqual(2);
        var hoverShape = storage.getHoverShapes(true);
        expect(hoverShape).not.toBeNull();
        expect(hoverShape.length).toEqual(2);
        expect(hoverShape[0].style.x).toEqual(100);
        expect(hoverShape[1].style.x).toEqual(150);
        storage.destroy();
    });

    it('updateShapeList, hasHoverShape', () => {
        var storage = new Storage();
        var shape = new SmicStar({
            style: {x: 100, y: 100, r: 50, n: 5}
        });
        var group = new Group({id: "group"});
        group.addChild(shape);
        group.clipShape = shape;
        storage.addHover(shape);
        storage.addRoot(group);
        var painter = new Painter(testDiv, storage);
        painter.render();
        expect(storage._hoverElements.length).toEqual(1);
        var hasHoverShape = storage.hasHoverShape();
        expect(hasHoverShape).toBeTruthy();
        expect(storage._roots.length).toEqual(1);
        expect(storage._shapeList.length).toEqual(1);
        storage.updateShapeList();
    });

    //修改图形(Shape)或者组(Group)。
    it('mod', () => {
        var storage = new Storage();
        var group = new Group({id: "group"});
        var shape = new SmicStar({
            style: {x: 100, y: 100, r: 50, n: 5}
        });
        group.addChild(shape);
        storage.addHover(shape);
        storage.addRoot(group);
        expect(storage._hoverElements.length).toEqual(1);
        expect(storage._roots.length).toEqual(1);
        expect(storage._shapeList.length).toEqual(0);
        storage.mod('group');
        expect(storage._elements).not.toBeNull();
        storage.destroy();
    });

    //移动指定的图形(Shape)的位置。
    it('drift', () => {
        var storage = new Storage();
        var shape = new SmicStar({
            style: {x: 100, y: 100, r: 50, n: 5}
        });
        storage.addHover(shape);
        storage.addRoot(shape);
        var painter = new Painter(testDiv, storage);
        painter.render();
        expect(storage._hoverElements.length).toEqual(1);
        expect(storage._shapeList.length).toEqual(1);
        expect(storage._shapeList[0].position[0]).toEqual(0);
        expect(storage._shapeList[0].position[1]).toEqual(0);
        var id = storage._shapeList[0].id;
        storage.drift(id, 10, 10);
        expect(storage._shapeList[0].position[0]).toEqual(10);
        expect(storage._shapeList[0].position[1]).toEqual(10);
        storage._shapeList[0].draggable = "horizontal";
        storage.drift(id, 10, 10);
        expect(storage._shapeList[0].position[0]).toEqual(20);
        expect(storage._shapeList[0].position[1]).toEqual(10);
        storage._shapeList[0].draggable = "vertical";
        storage.drift(id, 10, 10);
        expect(storage._shapeList[0].position[0]).toEqual(20);
        expect(storage._shapeList[0].position[1]).toEqual(20);
        storage.destroy();
    });

    //删除指定的图形(Shape)或者组(Group)。(elId) == 'undefined'
    it('delRoot', () => {
        var storage = new Storage();
        var group = new Group({id: "group"});
        var shape = new SmicStar({
            style: {x: 100, y: 100, r: 50, n: 5}
        });
        group.addChild(shape);
        storage.addHover(shape);
        storage.addRoot(group);
        expect(storage._elements).not.toBeNull();
        expect(storage._hoverElements.length).toEqual(1);
        expect(storage._roots.length).toEqual(1);
        spyOn(storage, 'delRoot').and.callThrough();
        storage.delRoot();
        expect(storage.delRoot).toHaveBeenCalled();
        expect(storage._elements).toEqual({});
        expect(storage._hoverElements.length).toEqual(0);
        expect(storage._roots.length).toEqual(0);
        storage.destroy();
    });

    //elId为数组
    it('delRoot_array', () => {
        var storage = new Storage();
        var group = new Group({id: "group"});
        var shape = new SmicStar({
            style: {x: 100, y: 100, r: 50, n: 5}
        });
        var shape1 = new SmicStar({
            style: {x: 150, y: 150, r: 50, n: 4}
        });
        group.addChild(shape);
        group.addChild(shape1);
        storage.addHover(shape);
        storage.addHover(shape1);
        storage.addRoot(group);
        var painter = new Painter(testDiv, storage);
        painter.render();
        expect(storage._elements).not.toBeNull();
        expect(storage._hoverElements.length).toEqual(2);
        expect(storage._roots.length).toEqual(1);
        expect(storage._shapeList.length).toEqual(2);
        spyOn(storage, 'delRoot').and.callThrough();
        storage.delRoot(storage._shapeList);
        storage.delRoot(['group']);
        expect(storage.delRoot).toHaveBeenCalledWith(storage._shapeList);
        expect(storage.delRoot).toHaveBeenCalledWith(['group']);
        expect(storage._elements).toEqual({});
        expect(storage._hoverElements.length).toEqual(2);
        expect(storage._roots.length).toEqual(0);
        expect(storage._shapeList.length).toEqual(2);
        storage.destroy();
    });

    // 获取指定图形。
    it('get', () => {
        var storage = new Storage();
        var group = new Group({id: "group"});
        var shape = new SmicStar({
            style: {x: 100, y: 100, r: 50, n: 5}
        });
        group.addChild(shape);
        storage.addHover(shape);
        storage.addRoot(group);
        storage.addHover(shape);
        var id = shape.id;
        var newShape = storage.get(id);
        expect(newShape).not.toBeNull();
        expect(newShape.id).toEqual(id);
        expect(newShape.type).toEqual("smicstar");
        expect(newShape.style).not.toBeNull();
        storage.destroy();
    });
});