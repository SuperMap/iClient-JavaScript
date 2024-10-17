import { decrypt } from '../../../src/common/security/decrypt';

describe('decrypt', () => {
  it('decrypt AFS', () => {
    const unit8 = Uint8Array.from([65, 254, 189, 210, 176, 155, 38, 120, 236, 244]);
    var options = {
      arrayBuffer: unit8.buffer,
      key: 'nSDXTzVXy93lc4dmhokTyWvMbiAroF8cSmIfulJG9bg=',
      algorithm: 'AES'
    };
    var parameter = decrypt(options);
    expect(parameter).toEqual('{"recordse');
  });
});
