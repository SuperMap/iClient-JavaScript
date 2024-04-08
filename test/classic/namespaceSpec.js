import { FetchRequest, VectorClipJobsParameter } from '../../src/classic/namespace';

describe('namespace', () => {
  var originaTimeout;
  beforeEach(() => {
    originaTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originaTimeout;
  });

  it('FetchRequest, VectorClipJobsParameter', () => {
    expect(FetchRequest).not.toBeNull();
    expect(VectorClipJobsParameter).not.toBeNull();
    expect(typeof FetchRequest).toBe('function');
    expect(typeof VectorClipJobsParameter).toBe('function');
    expect(typeof SuperMap.FetchRequest).toBe('function');
    expect(typeof SuperMap.VectorClipJobsParameter).toBe('function');
  });
});
