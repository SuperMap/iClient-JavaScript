import ol from 'openlayers';
import {Graphic} from '../../../../src/openlayers/overlay/graphic/Graphic';

describe('openlayers_Graphic', () => {
    //todo
    var graphic;
    it("constructor", () => {
        graphic = new Graphic(new ol.geom.Point([-35.16, 38.05]));

        expect(graphic).not.toBeNull();
        expect(graphic.geometry_).not.toBeNull();
        expect(graphic.geometry_.getCoordinates()[0]).toEqual(-35.16);
        expect(graphic.geometry_.getCoordinates()[1]).toEqual(38.05);

        graphic = null;
    });
    it("setId add getId", () => {
        graphic = new Graphic(new ol.geom.Point([-35.16, 38.05]));
        expect(graphic.getId()).toBeUndefined();
        graphic.setId("123");
        expect(graphic.getId()).toBe("123");
        graphic = null;
    });
    it("setAttributes add getAttributes", () => {
        graphic = new Graphic(new ol.geom.Point([-35.16, 38.05]), null);
        expect(graphic.getAttributes()).toBeNull();

        graphic.setAttributes({name: "graphic", type: "point"});
        expect(graphic.getAttributes().name).toBe("graphic");
        expect(graphic.getAttributes().type).toBe("point");
        graphic = null;
    });
});