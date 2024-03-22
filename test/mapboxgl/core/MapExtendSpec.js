import mapboxgl from 'mapbox-gl';
import mbglmap from '../../tool/mock_mapboxgl_map';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import cipher from 'node-forge/lib/cipher';
import { MapExtend } from '../../../src/mapboxgl/core/MapExtend';
import { decryptSources } from '../../../src/mapboxgl/core/decryptSource';
import { EncryptRequest } from '../../../src/common/util/EncryptRequest';

describe('getServiceKey', () => {
  let originalTimeout;
  const url = 'http:/fake:8090/iserver/iserver/services/map-China107/rest/maps/A';
  MapExtend;
  beforeEach(() => {
    spyOn(mapboxgl, 'Map').and.callFake(mbglmap);
    window.atob = () =>
      `ú\x86\x00ë\x14ø\n0Ø\x9C¶¬\x1D\x16ü\x99\x19rì;c\x8A\x8F\x83» þH©ü*TÂ.ÒxæêÏKëÔ|^¯à\x14*h\x96à\x80\x1E|\x8E¢\x8F)ÔÐ÷Á-/ì@iCð×F7û\x8B\x01k\x13\x18\x9BA\x88\x923]bSáÒLºÎ\v[váÐÁÆZi\x87\x1DþV\x91o\x97\x02~rÃñ¾\x051¥¬\x1CL\x01úºüê\x95\x0EEs¸/\\{6\x9A\x9DwRËÂ{¨~6T\x91\x19\x12\x1C_\x9Bb÷vhB\f{\x03éØ\x19w-ÂÏ³/\x1B»²C²\x1F\x97¢\x99\x88C\x8DÁCÂ8ð\x96t)ZùÞÓ\x03¨f\x1E´*\x97\x8Fµ±´í\x8B\x9ChíMlÅ\x06\x9Biþ\x03k¢\x83\x9A\x95\x8Fé\x03ùÓ¶N\x02qR?CÙê·Æ\x89\x854 ÞÐÒræéø¢]\x81ú®Ã0\x89ßMòPkå²E\x8DF\x1C¶æ\x84Bj¦\x99'[CÁ\x14ýaP\x1AÛu ×úHÃ:.\x1Eû\x0Eå\x0Féê\x91\x82ÓKÞ6T\x92é6©\x91v¨\f\x1A\x85·\x02¾\x87ÍÂµV[ç\x14DÑ8\x1Bm\x82ö\x1BBÿ\x87þí¬§f´¶\x9Fé\x1Ds¼:µt@\x15Í\x96bÛ"ý\x16~H0¥#l®\x02b`;
    cipher.createDecipher = () => ({
      start: () => {},
      update: () => {},
      finish: () => true,
      output: {
        data: `{"headers":{"X-Frame-Options":"SAMEORIGIN","Access-Control-Expose-Headers":"Access-Control-Allow-Origin,Access-Control-Allow-Credentials","Access-Control-Allow-Origin":"*","Set-Cookie":"rememberMe=deleteMe; Path=/iserver; Max-Age=0; Expires=Tue, 19-Mar-2024 01:43:12 GMT; SameSite=lax"},"data":"P8h08GonNjuCB4+CAykAGmLYwNsiv4G6H8KFrFi7Afk=","status":200}`
      }
    });
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.includes('map-China107')) {
        return Promise.resolve(
          new Response(
            JSON.stringify([
              {
                componentType: 'com.supermap.services.components.impl.MapImpl',
                interfaceType: 'com.supermap.services.rest.RestServlet',
                additions: [
                  'China',
                  'China_4326',
                  'ChinaDark',
                  'China_4490',
                  'China_4610',
                  'China_4214',
                  'China1',
                  'China_Capital_pt@China',
                  'A'
                ],
                name: 'map-China107/rest',
                alias: 'map-China107',
                serviceEncryptInfo: {
                  encrptSpec: {
                    keyLength: 256,
                    attributes: 'abcd',
                    version: '1.1',
                    algorithm: 'AES'
                  },
                  updateTime: 'Tue Mar 19 09:34:18 CST 2024',
                  encrptKeyID: 'keyIDNAME'
                },
                url: 'http://fake:8090/iserver/services/map-China107/rest',
                status: 'OK'
              },
              {
                componentType: 'com.supermap.services.components.impl.MapImpl',
                interfaceType: 'com.supermap.services.rest.JaxrsServletForJersey',
                additions: [
                  'China',
                  'China_4326',
                  'ChinaDark',
                  'China_4490',
                  'China_4610',
                  'China_4214',
                  'China1',
                  'China_Capital_pt@China',
                  'A'
                ],
                name: 'map-China107/restjsr',
                alias: 'map-China107',
                serviceEncryptInfo: {
                  encrptSpec: {
                    keyLength: 256,
                    attributes: 'abcd',
                    version: '1.1',
                    algorithm: 'AES'
                  },
                  updateTime: 'Tue Mar 19 09:34:18 CST 2024',
                  encrptKeyID: 'keyIDNAME'
                },
                url: 'http://fake:8090/iserver/services/map-China107/restjsr',
                status: 'OK'
              }
            ])
          )
        );
      }
      if (url.includes('publickey')) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              keyLength: 2048,
              publicKey:
                'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnYZxbL+oTbMDGQsFtVR674Zm/v04PhupLBrnm+BRja0bKV0zEsIWNUJ+fcOHBimCBPlU1ykZa2zibKRy+NOsfAIXUjd33Q8dPOOoF3m2ydbDxL7v6PB+f38jyXmvLd8EgyiMFuYUBvbnrHDPuodjWWUqNqdaBFl4wqp2fKTjsmsHevDwsf3plnCOu7mfsTemzCqlnD6W2uGbS71VI91VmYfIQMbExixAXjQ6CT35sV4b3CHmxhq+BrKnsiVpxvNrLkWrcli0DQDz1Opv7NdiGtw+bHNN2kxcQym/uDP3ClXDPmCYzsvB+GIW5GM78b7nsZjYy8VHjtyVdAkQwY27jQIDAQAB',
              keyScheme: 'PKCS#8'
            })
          )
        );
      }
      if (url.includes('vectorstyles')) {
        return Promise.resolve(new Response(JSON.stringify({})));
      }
    });
    spyOn(FetchRequest, 'post').and.callFake((url) => {
      if (
        url.includes(
          'tunnels/RmcvL1VHcVcyZU1ldXk5bW5rbGFTdkI4b1owWnRUVGg5K0E5aGo3MUQrTWRDbWdnMzhwSWlGSjRydFJoV0s4YjJlSjJZWHBoUnRRRnNMVDlLc3hmdXZDOFRqUnYzMUJtcXVqa0VTRE05Ukx2QjZLVTh2VGZUVzRndlM4Rmw4b1BsNTVNUVYzL215WXJIbkE4MC9GZzcrZnhrRUY2YUpsMmI1azBtQmljREZMUnREUkljdVBuWGFhK01jWmtUZDFUZjUxUnkwSlNsUFRuR1ZoWGV3VmZnOFI2bnM5K01yWWtPZm1kVnJManUxVmh5NUlIRmEyZXNUbzRHVDVKR3I2ZHpkOWVwRXFGdFdaMmxMMFM2YmhjNEorZHlvZXVQMmg3VGlCOGVYV1FJanE4bVYvcTNTRE5JRjRqR2RkSkJ6MENRSmVqcXpTbVdidnRxNm5jdDlmeDZBPT0='
        )
      ) {
        return Promise.resolve(
          new Response(
            '4xwVfv35tWo01yLmIV8Yf5t+lJUl8kERVP9aOH+x/1iynjFKx6cpbxCPPCTvUK5RlX3xjFGMMz+hBTOt7Ke911tE8wlUkClWMNuDbJGdxuinM2BF9MyBd6U7NNiwSWvfk3tRdY8+sGlquYyXRRc1HTkKUSoaJNhqgx9xZMi740AxArOINgOqBnl1tS2i5R2MyjyJcrYDUfjb8wZL5LLU/y/jysUCBtiNrrdlY3hV1BgtWUSgHPdTSxXA595CbdK3Nx0DhGIhNCQWby9QJUDhTHAqsdcWYyTAozMf/J8Q8vmwf2pHEMbvWyq0Etstg6IJeUqcdPG2XNcmNX3/xpsgjseg1/AJhvMnv1morsXNsN+hDYg8NJgCyZ6fnTL2EC5y3ivhNgzccFIgPcaZRtAveOx3iiU8SAy9hP3tkR5toqeZsU//8awh4RZgFDDM+QKX7ipUVO+YihkIYmNlXwMMpsSg2SMKfeqUV/3D8CvxQZPlTA=='
          )
        );
      }
      if (url.includes('tunnels')) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              blockedUrlRegex: {
                DELETE: [],
                POST: [
                  '.*/_setup/v2/querylicense.?(json|rjson)',
                  '.*/services/security/login.?(json|rjson)',
                  '.*/services/security/tokens.?(json|rjson)',
                  '.*/manager/serviceSynchronizingJobs.?(json|rjson)',
                  '.*/services/geoprocessing/restjsr/gpmodeler/runmodel',
                  '.*/services/geoprocessing/restjsr/gpmodeler/modelui'
                ],
                GET: [
                  '.*/_setup/v2.?(json|rjson)',
                  '.*/_setup/v2/currentlicense.?(json|rjson)',
                  '.*/_setup.?(json|rjson)',
                  '.*/_setup/currentuserlicenseinfo.?(json|rjson)',
                  '.*/services/geoprocessing/restjsr/gpmodeler/list/.*/property',
                  '.*/services/security/svckeys/[a-zA-Z]+\\.json'
                ],
                PUT: [
                  '.*/_setup/v2.?(json|rjson)',
                  '.*/_setup/v2/querylicense.?(json|rjson)',
                  '.*/_setup/v2/activelicense.?(json|rjson)',
                  '.*/_setup.?(json|rjson)',
                  '.*/_setup/cloudlicenselogin.?(json|rjson)',
                  '.*/_setup/weblicense.?(json|rjson)',
                  '.*/_setup/edulicense.?(json|rjson)',
                  '.*/_setup/activecloudlicense.?(json|rjson)',
                  '.*/_setup/activeWebLicense.?(json|rjson)',
                  '.*/_setup/activeEduLicense.?(json|rjson)',
                  '.*/services/security/profile.?(json|rjson)',
                  '.*/manager/servicestorage.?(json|rjson)',
                  '.*/services/geoprocessing/restjsr/gpmodeler/list/.*/property'
                ]
              },
              tunnelUrl:
                'http://fake:8090/iserver/services/security/tunnel/v1/tunnels/RmcvL1VHcVcyZU1ldXk5bW5rbGFTdkI4b1owWnRUVGg5K0E5aGo3MUQrTWRDbWdnMzhwSWlGSjRydFJoV0s4YjJlSjJZWHBoUnRRRnNMVDlLc3hmdXZDOFRqUnYzMUJtcXVqa0VTRE05Ukx2QjZLVTh2VGZUVzRndlM4Rmw4b1BsNTVNUVYzL215WXJIbkE4MC9GZzcrZnhrRUY2YUpsMmI1azBtQmljREZMUnREUkljdVBuWGFhK01jWmtUZDFUZjUxUnkwSlNsUFRuR1ZoWGV3VmZnOFI2bnM5K01yWWtPZm1kVnJManUxVmh5NUlIRmEyZXNUbzRHVDVKR3I2ZHpkOWVwRXFGdFdaMmxMMFM2YmhjNEorZHlvZXVQMmg3VGlCOGVYV1FJanE4bVYvcTNTRE5JRjRqR2RkSkJ6MENRSmVqcXpTbVdidnRxNm5jdDlmeDZBPT0='
            })
          )
        );
      }
    });
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('getServiceKey', async () => {
    EncryptRequest.prototype.request = () => {
      return {
        json: () =>
          new Promise((resolve) => {
            resolve('P8h08GonNjuCB4+CAykAGmLYwNsiv4G6H8KFrFi7Afk=');
          })
      };
    };

    try {
      const source = {
        tiles: [
          'http://172.16.13.234:8090/iserver/services/map-China107/rest/maps/A/tileFeature.mvt?returnAttributes=true&width=512&height=512&z={z}&x={x}&y={y}'
        ],
        bounds: [-180, -90, 180, 90],
        type: 'vector'
      };
      const vectorSource = new mapboxgl.VectorTileSource('A', source, () => {}, {});
      await vectorSource.beforeLoad('A', source);
      expect(vectorSource.decryptKey).toEqual(undefined);
      decryptSources.set(['A']);
      decryptSources.add('B');
      expect(decryptSources.values).toEqual(['A', 'B']);
      await vectorSource.beforeLoad('A', source);
      expect(vectorSource.decryptKey).toEqual('P8h08GonNjuCB4+CAykAGmLYwNsiv4G6H8KFrFi7Afk=');
    } catch (error) {
      expect(error).toEqual(new Error('mapbox-gl cannot support plane coordinate system.'));
    }
  });
});
