import {Graphic} from '../../../../src/mapboxgl/overlay/graphic/Graphic';

describe('mapboxgl_Graphic', () => {
    //todo
    var graphic, lngLat= {
        lng: -35.16,
        lat: 38.05
    };
    it("constructor", () => {
        graphic = new Graphic(lngLat);

        expect(graphic).not.toBeNull();
        expect(graphic.lngLat).not.toBeNull();
        expect(graphic.lngLat.lng).toEqual(-35.16);
        expect(graphic.lngLat.lat).toEqual(38.05);

        graphic = null;
    });
    it("setId add getId", () => {
        graphic = new Graphic(lngLat);
        expect(graphic.getId()).not.toBeNull();
        graphic.setId("123");
        expect(graphic.getId()).toBe("123");
        graphic = null;
    });
    it("setAttributes add getAttributes", () => {
        graphic = new Graphic(lngLat);
        expect(graphic.getAttributes()).not.toBeNull();

        graphic.setAttributes({name: "graphic", type: "point"});
        expect(graphic.getAttributes().name).toBe("graphic");
        expect(graphic.getAttributes().type).toBe("point");
        graphic = null;
    });
});