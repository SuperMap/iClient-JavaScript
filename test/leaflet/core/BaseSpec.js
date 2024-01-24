import '../../../src/leaflet/core/Base';
import L from "leaflet";

describe('Base', () => {
    it("toGeoJSON precision", () => {
        const p = L.marker([10.12345678912345, 4.12345678912345]);
        expect(p.toGeoJSON().geometry.coordinates[0]).toEqual(4.12345678912345);
    });
    it("toGeoJSON toGeoJSONPrecision", () => {
      L.toGeoJSONPrecision = 8;
      const p = L.marker([10.12345678912345, 4.12345678912345]);
      expect(p.toGeoJSON().geometry.coordinates[0]).toEqual(4.12345679);
  });
});