import {Vector} from '../../../src/common/commontypes/Vector';
import {Point} from '../../../src/common/commontypes/geometry/Point';

describe('Vector', ()=> {
    it('constructor, destroy', ()=> {
        var point = new Point(-115, 10);
        var style = {
            strokeColor: "#339933"
        };
        var pointFeature = new Vector(point, null, style);
        expect(pointFeature.CLASS_NAME).toEqual("SuperMap.Feature.Vector");
        expect(pointFeature.id).toContain("SuperMap.Feature");
        expect(pointFeature.geometry.type).toEqual("Point");
        expect(pointFeature.geometry.x).toEqual(-115);
        expect(pointFeature.geometry.y).toEqual(10);
        expect(pointFeature.style.strokeColor).toEqual("#339933");
        pointFeature.destroy();
        expect(pointFeature.id).toBeNull();
        expect(pointFeature.attributes).toEqual({});
        expect(pointFeature.geometry).toBeNull();
    });

    it('clone',()=> {
        var point = new Point(-115, 10);
        var style = {
            strokeColor: "#339933"
        };
        var vector = new Vector(point, null, style);
        var newVector = vector.clone();
        expect(newVector).not.toBeNull();
        expect(newVector.CLASS_NAME).toEqual("SuperMap.Feature.Vector");
        expect(newVector.id).toContain("SuperMap.Feature");
        expect(newVector.geometry.type).toEqual("Point");
        expect(newVector.geometry.x).toEqual(-115);
        expect(newVector.geometry.y).toEqual(10);
        expect(newVector.style.strokeColor).toEqual("#339933");
    });

    it('toState',()=> {
        var point = new Point(-115, 10);
        var style = {
            strokeColor: "#339933"
        };
        var vector = new Vector(point, null, style);
        spyOn(vector,'toState').and.callThrough();
        vector.state = SuperMap.State.DELETE;
        vector.toState(SuperMap.State.UPDATE);
        expect( vector.toState).toHaveBeenCalledWith(SuperMap.State.UPDATE);
        expect(vector.state).toEqual("Update");
        vector.state = SuperMap.State.INSERT;
        vector.toState(SuperMap.State.UPDATE);
        expect( vector.toState).toHaveBeenCalledWith(SuperMap.State.UPDATE);
        expect(vector.state).toEqual("Insert");
        vector.state = SuperMap.State.INSERT;
        vector.toState(SuperMap.State.INSERT);
        expect( vector.toState).toHaveBeenCalledWith(SuperMap.State.INSERT);
        expect(vector.state).toEqual("Insert");
        vector.state = SuperMap.State.UNKNOWN;
        vector.toState(SuperMap.State.INSERT);
        expect( vector.toState).toHaveBeenCalledWith(SuperMap.State.INSERT);
        expect(vector.state).toEqual("Unknown");
        vector.state = SuperMap.State.INSERT;
        vector.toState(SuperMap.State.DELETE);
        expect( vector.toState).toHaveBeenCalledWith(SuperMap.State.DELETE);
        expect(vector.state).toEqual("Insert");
        vector.state = SuperMap.State.DELETE;
        vector.toState(SuperMap.State.DELETE);
        expect( vector.toState).toHaveBeenCalledWith(SuperMap.State.DELETE);
        expect(vector.state).toEqual("Delete");
        vector.state = SuperMap.State.UNKNOWN;
        vector.toState(SuperMap.State.DELETE);
        expect( vector.toState).toHaveBeenCalledWith(SuperMap.State.DELETE);
        expect(vector.state).toEqual("Delete");
        vector.toState(SuperMap.State.UNKNOWN);
        expect( vector.toState).toHaveBeenCalledWith(SuperMap.State.UNKNOWN);
        expect(vector.state).toEqual("Unknown");
    });
});