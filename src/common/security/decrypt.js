/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import decryptUtil from '@supermapgis/tile-decryptor';

/**
 * @category Security
 * @function decrypt
 * @description 隧道解密ArrayBuffer数据。
 * @param {Object} options - 参数。
 * @param {ArrayBuffer} options.arrayBuffer - 解密数据，数据格式为ArrayBuffer。
 * @param {string} options.key - 秘钥
 * @param {string} options.algorithm - 加密算法， 可选值： "AES"、"AES/CTR"、"SM4"、"SM4/CTR"。
 * @param {number} [options.decodeSize=256] - 需要解密的数据大小。
 * @param {Array<number>} [options.ivKey] - 当algorithm为'AES'或者"AES/CTR", 默认值为：[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]；当algorithm为'SM4'或者"SM4/CTR", 默认值为：[48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102]。
 * @returns {string} 解密后的数据。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.decrypt(options);
 *
 * </script>
 *
 * // ES6 Import
 * import { decrypt } from '{npm}';
 *
 * const result = decrypt(options);
 * ```
 */
const decrypt = (options) => {
  const res = decryptUtil({ ...options });
  const decoder = new TextDecoder();
  const decodeStr = decoder.decode(new Uint8Array(res));
  return decodeStr;
};

export { decrypt };
