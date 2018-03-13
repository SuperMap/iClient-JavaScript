import {LevelRenderer} from '../../../../src/common/overlay/levelRenderer/LevelRenderer';
import {Render} from '../../../../src/common/overlay/levelRenderer/Render';
import {SmicStar} from '../../../../src/common/overlay/levelRenderer/SmicStar';

describe('LevelRenderer', () => {
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
    afterAll(() => {
        window.document.body.removeChild(testDiv);
    });

    it('constructor, destroy', () => {
        var levelRenderer = new LevelRenderer();
        expect(levelRenderer).not.toBeNull();
        expect(levelRenderer.version).not.toBeNull();
        levelRenderer.destroy();
        expect(levelRenderer.version).toBeNull();
    });

    it('init, dispose, delInstance', () => {
        var levelRenderer = new LevelRenderer();
        var render = new Render("render", testDiv);
        var shape = new SmicStar({style: {x: 100, y: 100, r: 50, n: 5}});
        render.addShape(shape);
        render.render();
        var id = render.storage._shapeList[0].id;
        render.animate(id, 'style', false);
        var newLevelRenderer = levelRenderer.init(testDiv);
        expect(newLevelRenderer.id).toContain("LRenderer");
        expect(newLevelRenderer.animation).not.toBeNull();
        expect(newLevelRenderer.handler).not.toBeNull();
        expect(newLevelRenderer.painter).not.toBeNull();
        expect(newLevelRenderer.storage).not.toBeNull();
        spyOn(render, 'dispose').and.callThrough();
        spyOn(levelRenderer, 'dispose').and.callThrough();
        levelRenderer.dispose(render);
        expect(levelRenderer.dispose).toHaveBeenCalledWith(render);
        expect(render.dispose).toHaveBeenCalled();
        render.destroy();
        levelRenderer.destroy();
        newLevelRenderer.destroy();
    });

    it('getInstance', () => {
        var levelRenderer = new LevelRenderer();
        var newLevelRenderer = levelRenderer.init(testDiv);
        var id = newLevelRenderer.id;
        var resultRenderer = levelRenderer.getInstance(id);
        expect(resultRenderer).not.toBeNull();
        expect(resultRenderer.id).toEqual(id);
        expect(resultRenderer.animation).not.toBeNull();
        expect(resultRenderer.handler).not.toBeNull();
        expect(resultRenderer.painter).not.toBeNull();
        expect(resultRenderer.storage).not.toBeNull();
        levelRenderer.destroy();
        newLevelRenderer.destroy();
        resultRenderer.destroy();
    });
});