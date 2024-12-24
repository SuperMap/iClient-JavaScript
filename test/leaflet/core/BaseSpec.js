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

  it("expect crs latLngToPoint cache scale calculation", () => {
    var scaleFn = spyOn(L.CRS.EPSG3857, 'scale').and.callThrough();
    L.CRS.EPSG3857.latLngToPoint(L.latLng(50.5, 30.5), 2);
    L.CRS.EPSG3857.latLngToPoint(L.latLng(50.3, 30.3), 2);
    expect(scaleFn).toHaveBeenCalledTimes(1);
  });

  it("expect polyline getBounds will calc in use", () => {
    const polyline = L.polyline([[10, 10], [20, 20]]);
    expect(polyline.dirtyBounds).toBe(true);
    polyline.getBounds();
    expect(polyline.dirtyBounds).toBe(false);
  });

  it("expect geojson will cache feature default property in multiple adddata", () => {
    var geojson = L.geoJSON();
    var addLayerFn = spyOn(geojson, 'addLayer').and.callThrough();
    geojson.addData([
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [102.0, 0.5]
        },
        "properties": {
          "prop0": "value0"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [102.0, 2.0],
            [103.0, 2.0]
          ]
        },
        "properties": {
          "prop0": "value0"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [100.0, 0.0],
              [101.0, 0.0],
              [101.0, 1.0]]
          ]
        },
        "properties": {
          "prop0": "value0"
        }
      }
    ]);
    expect(addLayerFn).toHaveBeenCalledTimes(3);
    geojson.addData([
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [102.0, 0.5]
        },
        "properties": {
          "prop0": "value0"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [102.0, 2.0],
            [103.0, 2.0]
          ]
        },
        "properties": {
          "prop0": "value0"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [100.0, 0.0],
              [101.0, 0.0],
              [101.0, 1.0]]
          ]
        },
        "properties": {
          "prop0": "value0"
        }
      }
    ]);
    let count = 0;
    geojson.eachLayer(function (layer) {
      count++;
      if (count > 3) {
        expect(layer.hasOwnProperty('commonOptions')).toBe(true);
      }
    });
  });
});