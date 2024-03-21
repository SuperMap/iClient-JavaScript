/**
 * @name decryptSources
 * @namespace
 * @category BaseTypes Util
 * @description 配置需要解密的矢量瓦片的sourceId。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.decryptSources.set(sourceIdsArray);
 *
 * </script>
 * // ES6 Import
 * import { decryptSources } from '{npm}';
 *
 * const result = decryptSources.set(sourceIdsArray);
 * ```
 */
const decryptSources = {
  values: [],
  /**
   * @function decryptSources.set
   * @description 设置需要解密的矢量瓦片的sourceId数组
   * @param {Array.<string>} sourceIds sourceId数组
   * @returns {Array.<string>} sourceId数组
   */
  set(sourceIds) {
    this.values = sourceIds;
    return this.values;
  },
  /**
   * @function decryptSources.add
   * @description 添加需要解密的矢量瓦片的sourceId
   * @param {string} sourceId sourceId
   * @returns {Array.<string>} sourceId
   */
  add(sourceId) {
    this.values.push(sourceId);
    return this.values;
  }
};

export { decryptSources };
