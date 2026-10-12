import { FGBLayerRenderer } from '../../../../src/common/overlay/fgb/FGBLayerRenderer';

describe('FGBLayerRenderer', () => {
  const url = 'base/resources/data/capitals_data20.fgb';
  const extent = [0, 0, 21, 21];

  it('loads all features from a stream and reads the geometry type from the header', async () => {
    const renderer = new FGBLayerRenderer({ url, strategy: 'all' });
    const iterator = await renderer._loadData([]);
    const features = await renderer.iterateFeatures(iterator);

    expect(features.features.length).toBe(19);
    expect(renderer.layerType).toBe('circle');
  });

  it('filters features by bbox and invokes featureLoader', async () => {
    const featureLoader = jasmine.createSpy('featureLoader').and.callFake(feature => feature);
    const renderer = new FGBLayerRenderer({ url, featureLoader });
    const iterator = await renderer._loadData(extent);
    const features = await renderer.iterateFeatures(iterator);

    expect(features.features.length).toBe(1);
    expect(features.features[0].properties.CAPITAL).toBe('圣多美');
    expect(featureLoader.calls.count()).toBe(1);
    expect(renderer.layerType).toBe('circle');
  });

});
