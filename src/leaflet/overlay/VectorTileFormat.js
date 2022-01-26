/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';

/**
 * @enum VectorTileFormat
 * @category Visualization VectorTile
 * @description 矢量瓦片格式
 * @type {string}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.VectorTileFormat.JSON;
 *
 * </script>
 * // ES6 Import
 * import { VectorTileFormat } from '{npm}';
 * 
 * const result = VectorTileFormat.JSON;
 * ```
 */
var VectorTileFormat = {
    /** JSON */
    JSON: "JSON",
    /** MVT */
    MVT: "MVT",
    /** PBF */
    PBF: "PBF"
};

export { VectorTileFormat };