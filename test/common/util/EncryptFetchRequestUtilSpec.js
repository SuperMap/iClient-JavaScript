import { FetchRequest } from '../../../src/common//util/FetchRequest';
import { EncryptRequest } from '../../../src/common//util/EncryptRequest';

describe('EncryptRequest', () => {
  const serverUrl = 'http://fake.iserver.com/iserver';
  const options = {
    url: 'http://fake.iserver.com/iserver/iserver/services/security/svckeys/keyIDNAME.json',
    method: 'get'
  };

  it('request fail', (done) => {
    const spyGet = spyOn(FetchRequest, 'get').and.returnValue('');
    const spyPost = spyOn(FetchRequest, 'post').and.returnValue({});
    const encryptRequest = new EncryptRequest(serverUrl);
    encryptRequest.request(options).then((result) => {
      expect(result).toBeUndefined();
      expect(spyGet.calls.count()).toBe(1);
      expect(spyPost.calls.count()).toBe(0);
      spyGet.calls.reset();
      spyPost.calls.reset();
      done();
    });
  });

  it('request succeed', (done) => {
    const spyGet = spyOn(FetchRequest, 'get').and.callFake(() => {
      const response = {
        keyLength: 2048,
        publicKey:
          'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2BQweGm/+YpzPn/QaRvkOYQQOwO0LI52NSdtJDehARLvFLfKfpaXs2Qks2VISYX8bl1aBRtS5m5/Z8mdo41k2XM9sRUKldF5M0gTUqKWUnDkS6INnNfsW4VsHNizIiZY7YvQA2cwl/4eYm4YF5Qy3KugPGrxt5KxZvh8O7b6si9JwLwIx53Y5oRbFttCHdjWR4mqFTzTR/yD4K1xYo/fizdvqUmWLhfpirHQsWv3WLaUOdEj36nDGBxuqahQ5JbH3VeASdbJQRTp+0QQcfpZ1x0GxXJWstemCrCUETQIQczYtj98qxSqknC8HZQhDz8F31NFV4341vrGKgOzrsq5HQIDAQAB',
        keyScheme: 'PKCS#8'
      };
      return Promise.resolve({ json: () => Promise.resolve(response) });
    });
    const spyPost = spyOn(FetchRequest, 'post').and.callFake(() => {
      const response = {
        blockedUrlRegex: {
          DELETE: [],
          POST: [],
          GET: ['.*/services/security/svckeys/[a-zA-Z]+\\.json'],
          PUT: []
        },
        tunnelUrl:
          'http://fake.iserver.com/iserver/services/security/tunnel/v1/tunnels/UUV6U25KNkVSNHhnQTYzcFVOTnZlNm9KVEVWZE4yeXVPNHlEVHAzeEZ2UnQ3WmtxS29qZURXQi9HcDBDYjNtM1FaOHFabGQwclduNGNzNjFjck1PbmFyakdOcGxQR25id2dQZ2ljY1NWdU5lMWg3dzV4UUtDQktyQ3doc3MzWnhmTkdNNWU3V01FZ21XNWJsR3pVdEtJenRpQXRTQ2RYQVBkN1oxRGNhNTh1a2pGSG1rUUZBeStjYVZPMXJ3NXFJcUdxN05ack1SNEEzNWRwNEZVNWV6ME96anYwN0tQempHZVl2U2VHa3YxRlc1R3ZXUW9KNmgwb290MjE1cEVZT2xNdzAwdXBidWpNOTQ2ck1iR1FFajFVUEtpeSt0OU9xdzdON0ZpZnhkTjEvRlF2cFpHN3ZBalVPV0ovVkNDdU9nN3RyU081SlhRMlZVQXhsbDlkMHZnPT0=.json'
      };
      return Promise.resolve({ json: () => Promise.resolve(response) });
    });
    const spyCommit = spyOn(FetchRequest, 'commit').and.callFake(() => {
      const response =
        'HAsHE/ok/jROEySWBxWSr2FTLXcnIkeFAYzig+V7NGalR0f/VnBorkAOyOnbCSq9nM3YWrhEUFaWwAouSDeEVqe+BLuIA+7KmCBfD7hh+qyM0lC5cvZ8vOIjsI3eqhHhiPOi+IQLGHQsRbFl8hSkE0XU1GIojqjppSEAxW5jhFC2bH5hdCt/+PKuHPhATElgJqOI6FJHpVpbLWiqoP7WMYVYvZm7wubYCQIG77LUSivbUQ61gjW0mevsKRdoiRl8fafV8Zq5D+QBbCy+Mn4rWXDC+gjwvyyYxEdOixALJgfnjWL48RRHxvITPapzbEsEkcnZiu+INSULcT60BeuduKzxp+hUg6Q8sn2Bu//CNk0NlGMeT5hqTON72iI4GBgfEOnGrcBHjsT/N2jX0NnVz1bgR6B9O6TpQQr3zkjVPidw8ElSO+lM8P5AuRqtNH9ajYt2uDwWBhbG+OfyR4hKIJ9V5aDhAwkIzkUerRP78Colsg==';
      return Promise.resolve({ text: () => Promise.resolve(response) });
    });
    const encryptRequest = new EncryptRequest(serverUrl);
    encryptRequest.encryptAESKey = 'SLbsaRbf4Rou8Bju';
    encryptRequest.encryptAESIV = 'rzLM7Z4RJGFd';
    encryptRequest.request(options).then((result) => {
      expect(result).toBe('l3nQtAUM4li87qMfO68exInHVFQ5gS3a6pb8ySIbib8=');
      expect(spyGet.calls.count()).toBe(1);
      expect(spyPost.calls.count()).toBe(1);
      expect(spyCommit.calls.count()).toBe(1);
      expect(encryptRequest.tunnelUrl).not.toBeUndefined();
      encryptRequest.request(options).then(result => {
        expect(result).toBe('l3nQtAUM4li87qMfO68exInHVFQ5gS3a6pb8ySIbib8=');
        expect(FetchRequest.get.calls.count()).toBe(1);
        expect(FetchRequest.post.calls.count()).toBe(1);
        expect(FetchRequest.commit.calls.count()).toBe(2);
        spyGet.calls.reset();
        spyPost.calls.reset();
        spyCommit.calls.reset();
        done();
      });
    });
  });
});
