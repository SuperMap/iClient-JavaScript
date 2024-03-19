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
 * @name EncryptRequest
 * @namespace
 * @category BaseTypes Util
 * @classdesc 加密请求地址
 * @param {string} serverUrl - 服务地址。
 */
export class EncryptRequest {
  constructor(serverUrl = '') {
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

  /**
   * @function EncryptRequest.prototype.request
   * @description 加密请求地址。
   * @param {Object} config - 加密请求参数。
   * @param {string} config.method - 请求方法。
   * @param {string} config.url - 请求地址。
   * @param {string} config.params - 请求参数。
   * @param {Object} config.options - 请求的配置属性。
   * @returns {Promise} Promise 对象。
   */
  async request(options) {
    if (!this.serverUrl) {
      throw 'serverUrl can not be empty.';
    }
    const config = Object.assign({ baseURL: '' }, options);
    const tunnelUrl = await this._createTunnel();
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
      const resultData = JSON.parse(decryptResult);
      const resData = Object.create({
        json: function () {
          return Promise.resolve(resultData.data);
        }
      });
      return Object.assign(resData, resultData);
    }
    return response;
  }

  /**
   * @private
   * @description 获取RSA public key
   * @function EncryptRequest.prototype._getRSAPublicKey
   */
  async _getRSAPublicKey() {
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

  /**
   * @private
   * @description 创建隧道
   * @function EncryptRequest.prototype._createTunnel
   */
  async _createTunnel() {
    if (!this.tunnelUrl) {
      try {
        const data = await this._getRSAPublicKey();
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
