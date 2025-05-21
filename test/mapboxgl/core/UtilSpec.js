import { Util } from '../../../src/mapboxgl/core/Util';

describe('Util', () => {
  it('toSuperMapGeometry', () => {
      var geoJSON = {
          type: 'FeatureCollection',
          features: [
              {
                  type: 'Feature',
                  properties: {
                      attributes: {
                          SmArea: '1.6060069623493825E15',
                          SmGeoPosition: '65536',
                          SmID: '1',
                          SmPerimeter: '1.6030006674231339E8'
                      },
                      id: 1,
                      layerName: 'World@China',
                      searchValues: '',
                      type: 'REGION'
                  },
                  geometry: {
                      type: 'MultiPolygon',
                      coordinates: [
                          [
                              [
                                  [-2, 258],
                                  [258, 258],
                                  [-2, 258],
                                  [-2, 258]
                              ]
                          ]
                      ]
                  }
              }
          ]
      };
      var result = Util.toSuperMapGeometry(geoJSON);
      expect(result).not.toBeNull();
      
      var geoJSON2 = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    attributes: {
                        SmArea: '1.6060069623493825E15',
                        SmGeoPosition: '65536',
                        SmID: '1',
                        SmPerimeter: '1.6030006674231339E8'
                    },
                    id: 1,
                    layerName: 'World@China',
                    searchValues: '',
                    type: 'REGION'
                },
                geometry: null
            }
        ]
      };
      var result2 = Util.toSuperMapGeometry(geoJSON2);
      expect(result2).toBeNull();
  });
});
