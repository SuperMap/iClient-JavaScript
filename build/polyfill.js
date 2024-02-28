import TextEncodingPolyfill from '@sinonjs/text-encoding';

if (typeof window['TextEncoder'] !== 'function') {
  window['TextEncoder'] = TextEncodingPolyfill.TextEncoder;
  window['TextDecoder'] = TextEncodingPolyfill.TextDecoder;
}