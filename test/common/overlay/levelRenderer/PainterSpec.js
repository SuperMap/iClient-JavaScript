import {Painter} from '../../../../src/common/overlay/levelRenderer/Painter';
import {Storage} from '../../../../src/common/overlay/levelRenderer/Storage';
import {SmicPolygon} from '../../../../src/common/overlay/levelRenderer/SmicPolygon';
import {SmicStar} from '../../../../src/common/overlay/levelRenderer/SmicStar';
import {SmicText} from '../../../../src/common/overlay/levelRenderer/SmicText';
import {SmicBrokenLine} from '../../../../src/common/overlay/levelRenderer/SmicBrokenLine';

describe('Painter', () => {
    var testDiv, storage;
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
    beforeEach(() => {
        storage = new Storage();
        storage.addRoot(new SmicStar({
            style: {
                x: 200,
                y: 200,
                r: 150,
                n: 5
            },
        }));
    });
    afterEach(() => {
        storage.dispose();
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
    });

    it('constructor, destroy, refreshHover, clearHover, getWidth, getHeight', () => {
        var painter = new Painter(testDiv, storage);
        painter.refreshHover();
        expect(painter).not.toBeNull();
        expect(painter.root.id).toEqual("group");
        expect(painter.root.nodeName).toEqual("DIV");
        expect(painter._bgDom).not.toBeNull();
        expect(painter._bgDom.nodeName).toEqual("DIV");
        expect(painter._height).toEqual(400);
        expect(painter._width).toEqual(400);
        expect(painter._layers).not.toBeNull();
        expect(painter.storage).not.toBeNull();
        expect(painter.shapeToImage).not.toBeNull();
        expect(painter._layerConfig).not.toBeNull();
        expect(painter._zlevelList).not.toBeNull();
        var width = painter.getWidth();
        var height = painter.getHeight();
        expect(width).toEqual(400);
        expect(height).toEqual(400);
        painter.destroy();
        expect(painter.root).toBeNull();
        expect(painter._bgDom).toBeNull();
        expect(painter.storage).toBeNull();
        expect(painter._zlevelList).toBeNull();
        expect(painter._layerConfig).toBeNull();
        expect(painter.shapeToImage).toBeNull();
    });

    //渲染
    it('render', () => {
        var painter = new Painter(testDiv, storage);
        spyOn(painter, 'render').and.callThrough();
        painter.render();
        expect(painter.render).toHaveBeenCalled();
        expect(painter.storage._shapeList.length).toEqual(1);
        expect(painter.storage._shapeList[0].type).toEqual("smicstar");
        expect(painter._layers.hover).not.toBeNull();
        expect(painter._zlevelList[0]).toEqual(0);
        painter.destroy();
    });

    // 不强制绘制所有 shape
    it('refresh', () => {
        var painter = new Painter(testDiv, storage);
        spyOn(painter, 'refresh').and.callThrough();
        painter.refresh(() => {
            painter._zlevelList[0] = "test_refresh";
        });
        expect(painter.refresh).toHaveBeenCalled();
        expect(painter.storage._shapeList.length).toEqual(1);
        expect(painter.storage._shapeList[0].type).toEqual("smicstar");
        expect(painter._layers.hover).not.toBeNull();
        expect(painter._zlevelList[0]).toEqual("test_refresh");
        painter.destroy();
    });

    // 强制绘制所有 shape
    it('refresh_paintAll', () => {
        var painter = new Painter(testDiv, storage);
        spyOn(painter, 'refresh').and.callThrough();
        painter.refresh(() => {
            painter._zlevelList[0] = "test_refresh";
        }, true);
        expect(painter.refresh).toHaveBeenCalled();
        expect(painter.storage._shapeList.length).toEqual(1);
        expect(painter.storage._shapeList[0].type).toEqual("smicstar");
        expect(painter._layers.hover).not.toBeNull();
        expect(painter._zlevelList[0]).toEqual("test_refresh");
        painter.destroy();
    });

    //按列表绘制图形
    it('_paintList', () => {
        storage.addRoot(new SmicPolygon({
            style: {pointList: [[0, 0], [100, 0], [100, 100], [0, 100]]},
            zlevel: 1
        }));
        storage.addRoot(new SmicText({
            style: {
                x: 200,
                y: 200,
                textFont: '14px Arial',
                text: 'Label'
            },
            zlevel: 2
        }));
        storage.addRoot(new SmicBrokenLine({
            style: {
                pointList: [[0, 0], [100, 100], [100, 0]]
            },
        }));
        var list = storage.getShapeList(true);
        var painter = new Painter(testDiv, storage);
        expect(painter._zlevelList.length).toEqual(0);
        expect(painter.storage._shapeList.length).toEqual(4);
        expect(painter.storage._shapeList[0].type).toEqual("smicstar");
        expect(painter.storage._shapeList[1].type).toEqual("smicbroken-line");
        expect(painter.storage._shapeList[2].type).toEqual("smicpolygon");
        expect(painter.storage._shapeList[3].type).toEqual("smictext");
        painter.render();
        painter._paintList(list, true);
        expect(painter).not.toBeNull();
        expect(painter._zlevelList.length).toEqual(3);
        expect(painter._zlevelList[0]).toEqual(0);
        expect(painter._zlevelList[1]).toEqual(1);
        expect(painter._zlevelList[2]).toEqual(2);
        painter.destroy();
    });

    it('getLayer, getLayers', () => {
        storage.addRoot(new SmicPolygon({
            style: {pointList: [[0, 0], [100, 0], [100, 100], [0, 100]]},
            zlevel: 2
        }));
        var painter = new Painter(testDiv, storage);
        painter.render();
        var layer = painter.getLayer(0);
        var layers = painter.getLayers();
        expect(layer).not.toBeNull();
        expect(layer.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Painter.Layer");
        expect(layer.painter).not.toBeNull();
        expect(layer.painter.storage._shapeList.length).toEqual(2);
        expect(layer.painter.storage._shapeList[0].type).toEqual("smicstar");
        expect(layer.painter.storage._shapeList[1].type).toEqual("smicpolygon");
        expect(layers).not.toBeNull();
        expect(layers[0]).not.toBeNull();
        expect(layers[0].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Painter.Layer");
        expect(layers[0].painter).not.toBeNull();
        expect(layers.hover).not.toBeNull();
        expect(layers.hover.CLASS_NAME).toEqual("SuperMap.LevelRenderer.Painter.Layer");
        expect(layers.hover.needTransform).toBeFalsy();
        painter.destroy();
    });

    it('refreshShapes, clear', () => {
        var painter = new Painter(testDiv, storage);
        var list = storage.getShapeList(true);
        painter.refreshShapes(list);
        expect(painter).not.toBeNull();
        expect(painter._layers).not.toBeNull();
        expect(painter._layers[0]).not.toBeNull();
        expect(painter._layers.hover).not.toBeNull();
        painter._layers[0].motionBlur = true;
        painter._layers[0].clearColor = "#000000";
        painter._layers[0].config = {clearColor: "#657871"};
        spyOn(painter._layers[0], 'clear').and.callThrough();
        spyOn(painter._layers[0].ctx, 'fillRect').and.callThrough();
        spyOn(painter._layers[0].ctx, 'drawImage').and.callThrough();
        painter.clear();
        expect(painter._layers[0].clear).toHaveBeenCalled();
        expect(painter._layers[0].ctx.fillRect).toHaveBeenCalled();
        expect(painter._layers[0].ctx.drawImage).toHaveBeenCalled();
        painter.destroy();
    });

    //修改指定 zlevel 的绘制参数
    it('modLayer', () => {
        var painter = new Painter(testDiv, storage);
        painter.render();
        var config = {
            clearColor: 0,
            motionBlur: false,
            lastFrameAlpha: 0.7,
            position: [5],
            rotation: [3],
        };
        spyOn(painter, 'modLayer').and.callThrough();
        painter.modLayer(0, config);
        expect(painter.modLayer).toHaveBeenCalledWith(0, config);
        expect(painter).not.toBeNull();
        expect(painter._layerConfig[0].clearColor).toEqual(0);
        expect(painter._layerConfig[0].lastFrameAlpha).toEqual(0.7);
        expect(painter._layerConfig[0].motionBlur).toBeFalsy();
        expect(painter._layerConfig[0].position[0]).toEqual(5);
        expect(painter._layerConfig[0].rotation[0]).toEqual(3);
        painter.destroy();
    });


    it('delLayer, clearHover', () => {
        storage.addRoot(new SmicPolygon({
            style: {pointList: [[0, 0], [100, 0], [100, 100], [0, 100]]},
            zlevel: 1
        }));
        var painter = new Painter(testDiv, storage);
        spyOn(painter, 'delLayer').and.callThrough();
        painter.delLayer(1);
        painter.render();
        expect(painter._layers[0]).not.toBeNull();
        expect(painter._layers[1]).not.toBeNull();
        painter.delLayer(0);
        expect(painter.delLayer).toHaveBeenCalledWith(1);
        expect(painter.delLayer).toHaveBeenCalledWith(0);
        expect(painter._layers[1]).not.toBeNull();
        painter.clearLayer(1);
        expect(painter).not.toBeNull();
        painter.destroy();
    });

    // 区域大小变化后重绘。
    it('resize', () => {
        var painter = new Painter(testDiv, storage);
        painter._width = 500;
        painter.resize();
        expect(painter).not.toBeNull();
        expect(painter._width).toEqual(400);
        painter.destroy();
    });


    //获取 Hover 层的 Dom。
    it('getDomHover', () => {
        var painter = new Painter(testDiv, storage);
        var dom = painter.getDomHover();
        expect(dom).not.toBeNull();
        expect(dom.nodeName).toEqual("CANVAS");
        expect(dom.width).toEqual(400);
        expect(dom.height).toEqual(400);
        painter.destroy();
    });

    //图像导出
    it('toDataURL', () => {
        var painter = new Painter(testDiv, storage);
        var image = painter.toDataURL("PNG", "#fff", {});
        expect(image).not.toBeNull();
        expect(image).toContain("image/png");
        painter.destroy();
    });

    it('_shapeToImage', () => {
        var painter = new Painter(testDiv, storage);
        var list = storage.getShapeList(true);
        var shape = list[0];
        var devicePixelRatio = Painter.devicePixelRatio;
        var imgShape = painter._shapeToImage('testId', shape, 400, 400, devicePixelRatio);
        expect(imgShape).not.toBeNull();
        expect(imgShape.id).toEqual("testId");
        expect(imgShape.type).toEqual("smicimage");
        expect(imgShape.style.image).not.toBeNull();
        expect(imgShape.style.image.nodeName).toEqual("CANVAS");
        expect(imgShape.style.x).toEqual(0);
        expect(imgShape.style.y).toEqual(0);
        painter.destroy();
    });

    it('updateHoverLayer', () => {
        var painter = new Painter(testDiv, storage);
        var list = storage.getShapeList(true);
        painter.updateHoverLayer(list);
        expect(painter).not.toBeNull();
        expect(painter.root.id).toEqual("group");
        expect(painter.root.nodeName).toEqual("DIV");
        expect(painter._bgDom).not.toBeNull();
        expect(painter._bgDom.nodeName).toEqual("DIV");
        expect(painter._height).toEqual(400);
        expect(painter._width).toEqual(400);
        expect(painter._layers).not.toBeNull();
        expect(painter.storage).not.toBeNull();
        expect(painter.shapeToImage).not.toBeNull();
        expect(painter._layerConfig).not.toBeNull();
        expect(painter._zlevelList).not.toBeNull();
        painter.destroy();
    });
});