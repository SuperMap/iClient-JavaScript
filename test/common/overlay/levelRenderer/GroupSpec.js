import {Shape} from '../../../../src/common/overlay/levelRenderer/Shape';
import {Group} from '../../../../src/common/overlay/levelRenderer/Group';
import {Storage} from '../../../../src/common/overlay/levelRenderer/Storage';

describe('Group', () => {
    var originalTimeout;
    var testDiv, group, storage;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "group");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "400px";
        testDiv.style.height = "400px";
        window.document.body.appendChild(testDiv);
        storage = new Storage();
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        group = new Group({id: "group"});
        group.position[1] = 100;
        group.position[0] = 100;
        group.addChild(new Shape({
            style: {
                x: 100,
                y: 100,
                brushType: 'fill'
            }
        }));
        group.addChild(new Group());
        group._storage = new Storage();
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
    });

    it('constructor, destroy, addChild', () => {
        expect(group).not.toBeNull();
        expect(group.id).toEqual("group");
        expect(group.type).toEqual("group");
        expect(group.ignore).toBeFalsy();
        expect(group._children.length).toEqual(2);
        expect(group._children[0].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Shape");
        expect(group._children[1].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Group");
        expect(group._storage).not.toBeNull();
        group.destroy();
        expect(group.id).toBeNull();
        expect(group.type).toBeNull();
        expect(group._children).toBeNull();
        expect(group._storage).toBeNull();
        expect(group.__dirty).toBeNull();
        expect(group.ignore).toBeNull();
    });

    //复制并返回一份新的包含所有儿子节点的数组
    it('children', () => {
        var children = group.children();
        expect(children).not.toBeNull();
        expect(children.length).toEqual(2);
        expect(children[0].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Shape");
        expect(children[1].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Group");
        group.destroy();
    });

    //获取指定 index 的儿子节点
    it('childAt', () => {
        var child = group.childAt(0);
        expect(child).not.toBeNull();
        expect(child.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Shape");
        expect(child.id).not.toBeNull();
        expect(child.style.brushType).toEqual("fill");
        expect(child.style.x).toEqual(100);
        expect(child.style.y).toEqual(100);
        group.destroy();
    });

    //添加子节点
    //直接添加g
    it('addChild_group', () => {
        group.addChild(group);
        expect(group).not.toBeNull();
        expect(group._children.length).toEqual(2);
        expect(group._children[0].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Shape");
        expect(group._children[1].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Group");
        group.destroy();
    });
    //添加g的子节点
    it('addChild_groupChild', () => {
        var child = group.childAt(0);
        group.addChild(child);
        expect(group).not.toBeNull();
        expect(group._children.length).toEqual(2);
        expect(group._children[0].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Shape");
        expect(group._children[1].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Group");
        group.destroy();
    });
    //添加g1的子节点，group1会默认删除该子节点
    it('addChild_group1Child', () => {
        var group1 = new Group();
        group1.addChild(new Group({id: "g1Child"}));
        var g1Child = group1.childAt(0);
        group.addChild(g1Child);
        expect(group).not.toBeNull();
        expect(group1._children.length).toEqual(0);
        expect(group._children.length).toEqual(3);
        expect(group._children[0].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Shape");
        expect(group._children[1].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Group");
        expect(group._children[2].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Group");
        group.destroy();
    });

    //把子图形添加到仓库
    it('addChildrenToStorage', () => {
        group.addChildrenToStorage(storage);
        expect(storage._elements).not.toBeNull();
        group.destroy();
    });

    //移除子节点
    it('removeChild', () => {
        group._storage = storage;
        group.removeChild(group.childAt(1));
        expect(group).not.toBeNull();
        expect(group._children.length).toEqual(1);
        expect(group._children[0].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Shape");
        group.destroy();
    });

    //从仓库把子图形删除
    it('delChildrenFromStorage', () => {
        group.delChildrenFromStorage(storage);
        expect(storage._elements).not.toBeNull();
        group.destroy();
    });

    //遍历所有子节点
    it('eachChild_context', () => {
        var className, arr = [];
        group.eachChild((child) => {
            className = child.CLASS_NAME;
            arr.push(className);
        }, group);
        expect(arr).not.toBeNull();
        expect(arr.length).toEqual(2);
        expect(arr[0]).toEqual("SuperMap.LevelRenderer.Shape");
        expect(arr[1]).toEqual("SuperMap.LevelRenderer.Group");
    });
    it('eachChild_noContext', () => {
        var className, arr = [];
        group.eachChild((child) => {
            className = child.CLASS_NAME;
            arr.push(className);
        });
        expect(arr).not.toBeNull();
        expect(arr.length).toEqual(2);
        expect(arr[0]).toEqual("SuperMap.LevelRenderer.Shape");
        expect(arr[1]).toEqual("SuperMap.LevelRenderer.Group");
    });

    //深度优先遍历所有子孙节点
    it('traverse_context', () => {
        var className, arr = [];
        group.traverse((child) => {
            className = child.CLASS_NAME;
            arr.push(className);
        }, group);
        expect(arr).not.toBeNull();
        expect(arr.length).toEqual(2);
        expect(arr[0]).toEqual("SuperMap.LevelRenderer.Shape");
        expect(arr[1]).toEqual("SuperMap.LevelRenderer.Group");
    });
    it('traverse_noContext', () => {
        var className, arr = [];
        group.traverse((child) => {
            className = child.CLASS_NAME;
            arr.push(className);
        });
        expect(arr).not.toBeNull();
        expect(arr.length).toEqual(2);
        expect(arr[0]).toEqual("SuperMap.LevelRenderer.Shape");
        expect(arr[1]).toEqual("SuperMap.LevelRenderer.Group");
    });
});