import { FetchRequest } from './FetchRequest';
import {
  RSAEncrypt,
  AESGCMEncrypt,
  AESGCMDecrypt,
  generateAESRandomKey,
  generateAESRandomIV
} from './RSAAndAESEn-DecryptorUtil';

/**
 * @private
 * @name EncryptFetchRequestUtil
 * @namespace
 * @category BaseTypes Util
 * @classdesc 加密请求地址
 */
export class EncryptFetchRequestUtil {
  constructor(serverUrl = 'http://172.16.13.234:8090/iserver') {
    this.serverUrl = serverUrl.split('').slice(-1)[0] === '/' ? serverUrl : `${serverUrl}/`;
    this.tunnelUrl = undefined;
    this.blockedUrlRegex = {
      HEAD: [],
      POST: [],
      GET: [],
      PUT: [],
      DELETE: []
    };
    this.encryptAESKey = generateAESRandomKey();
    this.encryptAESIV = generateAESRandomIV();
  }

  async encryptRequest(options) {
    const config = Object.assign({ baseURL: '' }, options);
    const tunnelUrl = await this.createTunnel();
    if (!tunnelUrl) {
      return;
    }
    for (const pattern of this.blockedUrlRegex[config.method.toUpperCase()]) {
      const regex = new RegExp(pattern);
      if (regex.test(config.baseURL + config.url)) {
        const data = {
          url: config.baseURL + (config.url.startsWith('/') ? config.url.substring(1, config.url.length) : config.url),
          method: config.method,
          timeout: config.timeout,
          headers: config.headers,
          body: config.data
        };
        // 替换请求
        config.method = 'post';
        config.data = AESGCMEncrypt(this.encryptAESKey, this.encryptAESIV, JSON.stringify(data));
        if (!config.data) {
          throw 'encrypt failed';
        }
        config.url = this.tunnelUrl;
        break;
      }
    }
    const response = await FetchRequest.commit(config.method, config.url, config.data, config.options);
    if (config.url === this.tunnelUrl) {
      const result = await response.text();
      const decryptResult = AESGCMDecrypt(this.encryptAESKey, this.encryptAESIV, result);
      if (!decryptResult) {
        console.debug('解密请求响应失败');
        return;
      }
      return JSON.parse(decryptResult).data;
    }
    return response;
  }

  async getRSAPublicKey() {
    try {
      const response = await FetchRequest.get(`${this.serverUrl}services/security/tunnel/v1/publickey`);
      // 解析publicKey
      const publicKeyObj = await response.json();
      // 生成AES密钥
      const aesKeyObj = {
        key: this.encryptAESKey,
        iv: this.encryptAESIV,
        mode: 'GCM',
        padding: 'NoPadding'
      };
      // 将AES密钥使用RSA公钥加密
      const aesCipherText = RSAEncrypt(publicKeyObj.publicKey, aesKeyObj.key + aesKeyObj.iv);
      return aesCipherText;
    } catch (error) {
      console.debug('RSA公钥获取失败，错误详情：' + error);
    }
  }

  async createTunnel() {
    if (!this.tunnelUrl) {
      try {
        const data = await this.getRSAPublicKey();
        if (!data) {
          throw 'fetch RSA publicKey failed';
        }
        // 创建隧道
        const response = await FetchRequest.post(`${this.serverUrl}services/security/tunnel/v1/tunnels`, data);
        const result = await response.json();
        Object.assign(this, {
          tunnelUrl: result.tunnelUrl,
          blockedUrlRegex: Object.assign({}, this.blockedUrlRegex, result.blockedUrlRegex)
        });
      } catch (error) {
        console.debug('安全隧道创建失败，错误详情：' + error);
      }
    }
    return this.tunnelUrl;
  }
}
