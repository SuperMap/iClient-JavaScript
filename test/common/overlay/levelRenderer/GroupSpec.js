require('../../../../src/common/overlay/levelRenderer/Group');

describe('Group', function () {
    var originalTimeout;
    var testDiv, group, storage;
    beforeAll(function () {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "group");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "400px";
        testDiv.style.height = "400px";
        window.document.body.appendChild(testDiv);
        storage = new SuperMap.LevelRenderer.Storage();
    });
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        group = new SuperMap.LevelRenderer.Group({id: "group"});
        group.position[1] = 100;
        group.position[0] = 100;
        group.addChild(new SuperMap.LevelRenderer.Shape({
            style: {
                x: 100,
                y: 100,
                brushType: 'fill'
            }
        }));
        group.addChild(new SuperMap.LevelRenderer.Group());
        group._storage = new SuperMap.LevelRenderer.Storage();
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(function () {
        window.document.body.removeChild(testDiv);
    });

    it('constructor, destroy, addChild', function () {
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
    it('children', function () {
        var children = group.children();
        expect(children).not.toBeNull();
        expect(children.length).toEqual(2);
        expect(children[0].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Shape");
        expect(children[1].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Group");
        group.destroy();
    });

    //获取指定 index 的儿子节点
    it('childAt', function () {
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
    it('addChild_group', function () {
        group.addChild(group);
        expect(group).not.toBeNull();
        expect(group._children.length).toEqual(2);
        expect(group._children[0].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Shape");
        expect(group._children[1].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Group");
        group.destroy();
    });
    //添加g的子节点
    it('addChild_groupChild', function () {
        var child = group.childAt(0);
        group.addChild(child);
        expect(group).not.toBeNull();
        expect(group._children.length).toEqual(2);
        expect(group._children[0].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Shape");
        expect(group._children[1].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Group");
        group.destroy();
    });
    //添加g1的子节点，group1会默认删除该子节点
    it('addChild_group1Child', function () {
        var group1 = new SuperMap.LevelRenderer.Group();
        group1.addChild(new SuperMap.LevelRenderer.Group({id: "g1Child"}));
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
    it('addChildrenToStorage', function () {
        group.addChildrenToStorage(storage);
        expect(storage._elements).not.toBeNull();
        group.destroy();
    });

    //移除子节点
    it('removeChild', function () {
        group._storage = storage;
        group.removeChild(group.childAt(1));
        expect(group).not.toBeNull();
        expect(group._children.length).toEqual(1);
        expect(group._children[0].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Shape");
        group.destroy();
    });

    //从仓库把子图形删除
    it('delChildrenFromStorage', function () {
        group.delChildrenFromStorage(storage);
        expect(storage._elements).not.toBeNull();
        group.destroy();
    });

    //遍历所有子节点
    it('eachChild_context', function () {
        var className, arr = [];
        group.eachChild(function (child) {
            className = child.CLASS_NAME;
            arr.push(className);
        }, group);
        expect(arr).not.toBeNull();
        expect(arr.length).toEqual(2);
        expect(arr[0]).toEqual("SuperMap.LevelRenderer.Shape");
        expect(arr[1]).toEqual("SuperMap.LevelRenderer.Group");
    });
    it('eachChild_noContext', function () {
        var className, arr = [];
        group.eachChild(function (child) {
            className = child.CLASS_NAME;
            arr.push(className);
        });
        expect(arr).not.toBeNull();
        expect(arr.length).toEqual(2);
        expect(arr[0]).toEqual("SuperMap.LevelRenderer.Shape");
        expect(arr[1]).toEqual("SuperMap.LevelRenderer.Group");
    });

    //深度优先遍历所有子孙节点
    it('traverse_context', function () {
        var className, arr = [];
        group.traverse(function (child) {
            className = child.CLASS_NAME;
            arr.push(className);
        }, group);
        expect(arr).not.toBeNull();
        expect(arr.length).toEqual(2);
        expect(arr[0]).toEqual("SuperMap.LevelRenderer.Shape");
        expect(arr[1]).toEqual("SuperMap.LevelRenderer.Group");
    });
    it('traverse_noContext', function () {
        var className, arr = [];
        group.traverse(function (child) {
            className = child.CLASS_NAME;
            arr.push(className);
        });
        expect(arr).not.toBeNull();
        expect(arr.length).toEqual(2);
        expect(arr[0]).toEqual("SuperMap.LevelRenderer.Shape");
        expect(arr[1]).toEqual("SuperMap.LevelRenderer.Group");
    });
});