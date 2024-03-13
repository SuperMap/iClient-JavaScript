import pki from 'node-forge/lib/pki';
import md from 'node-forge/lib/md';
import cipher from 'node-forge/lib/cipher';
import util from 'node-forge/lib/util';

/**
 * @private
 * @function RSAEncrypt
 * @description RSAES-OAEP/SHA-256/MGF1-SHA-1加密，对应java的RSA/ECB/OAEPWithSHA-256AndMGF1Padding
 * @param publicKeyStr - RSA 公钥
 * @param message - 需要加密的信息
 * @returns {string|boolean} 加密成功返回base64编码的密文，加密失败返回false
 */
export function RSAEncrypt (publicKeyStr, message) {
    if (publicKeyStr && publicKeyStr.indexOf('BEGIN PUBLIC KEY') === -1) { // 转为PEM格式
        publicKeyStr = `-----BEGIN PUBLIC KEY-----\n${publicKeyStr}\n-----END PUBLIC KEY-----`;
    }
    const publicKey = pki.publicKeyFromPem(publicKeyStr);
    const obj = {
                md: md.sha256.create(),
                mgf1: {
                    md: md.sha1.create()
                }
            };
    const encrypted = publicKey.encrypt(message, 'RSA-OAEP', obj);
    if (!encrypted) {
        return false; // 加密失败
    }
    return window.btoa(encrypted);
}

/**
 * @private
 * @function AESGCMDecrypt
 * @description AES/GCM解密
 * @param key - 16位
 * @param iv - 12位
 * @param cipherText - 密文 = base64转码(加密内容 + 16位的mac值)
 * @returns {boolean|string} 解密成功返回明文，解密失败返回false
 */
export function AESGCMDecrypt (key, iv, cipherText) {
    const cipherStrAndMac = window.atob(cipherText);
    const cipherStr = cipherStrAndMac.substring(0, cipherStrAndMac.length - 16);
    const mac = cipherStrAndMac.substring(cipherStrAndMac.length - 16);
    const decipher = cipher.createDecipher('AES-GCM', util.createBuffer(key));
    decipher.start({
        iv: util.createBuffer(iv),
        additionalData: '', // optional
        tagLength: 128, // optional, defaults to 128 bits
        tag: mac // authentication tag from encryption
    });
    decipher.update(util.createBuffer(cipherStr));
    const pass = decipher.finish();
    if (pass) {
        return util.decodeUtf8(decipher.output.data);
    }
    return false;
}

/**
 * @private
 * @function AESGCMEncrypt
 * @description AES/GCM加密
 * @param key - 16位
 * @param iv - 12位
 * @param msg - 明文
 * @returns {boolean|string} 加密成功返回明文，加密失败返回false
 */
export function AESGCMEncrypt (key, iv, msg) {
    msg = util.encodeUtf8(msg);
    const cipherInstance = cipher.createCipher('AES-GCM', key);
    cipherInstance.start({
        iv: iv,
        additionalData: '', // 'binary-encoded string', // optional
        tagLength: 128 // optional, defaults to 128 bits
    });
    cipherInstance.update(util.createBuffer(msg));
    const pass = cipherInstance.finish();
    if (pass) {
        const encrypted = cipherInstance.output;
        const tag = cipherInstance.mode.tag;
        return window.btoa(encrypted.data + tag.data);
    }
    return false;
}

/**
 * @private
 * @function generateAESRandomKey
 * @description 生成随机的16位 AES key
 * @returns {string}
 */
export function generateAESRandomKey () {
    return randomString(16);
}

/**
 * @private
 * @function generateAESRandomIV
 * @description 生成随机的12位 AES iv
 * @returns {string}
 */
export function generateAESRandomIV () {
    return randomString(12);
}

/**
 * @private
 * @function randomString
 * @description 生成指定长度的随机字符串
 * @param length - 随机字符串长度
 * @returns {string}
 */
function randomString (length) {
    const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) { result += str[Math.floor(Math.random() * str.length)]; }
    return result;
}
