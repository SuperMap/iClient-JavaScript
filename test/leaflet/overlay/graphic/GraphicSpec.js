import {graphic as graphicObj} from '../../../../src/leaflet/overlay/graphic/Graphic';

describe('leaflet_Graphic', () => {
    //todo
    var graphic, option = {
        latLng: L.latLng(-35.16, 38.05)
    };
    it("constructor", () => {
        graphic = graphicObj(option);

        expect(graphic).not.toBeNull();
        expect(graphic._latLng).not.toBeNull();
        expect(graphic._latLng.lat).toEqual(-35.16);
        expect(graphic._latLng.lng).toEqual(38.05);

        graphic = null;
    });
    it("setId add getId", () => {
        graphic = graphicObj(option);
        expect(graphic.getId()).toBeNull();
        graphic.setId("123");
        expect(graphic.getId()).toBe("123");
        graphic = null;
    });
    it("setAttributes add getAttributes", () => {
        graphic = graphicObj(option);
        expect(graphic.getAttributes()).toBeUndefined();

        graphic.setAttributes({name: "graphic", type: "point"});
        expect(graphic.getAttributes().name).toBe("graphic");
        expect(graphic.getAttributes().type).toBe("point");
        graphic = null;
    });
});