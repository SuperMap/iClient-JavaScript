/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {FileTypes} from '../CommonTypes';

/**
 * @name ComponentsUtil
 * @namespace
 * @category BaseTypes Util
 * @description 获取文件类型工具类。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const util = {namespace}.ComponentsUtil;
 *
 * </script>
 * // ES6 Import
 * import { ComponentsUtil } from '{npm}';
 *
 * ```
 */
export let ComponentsUtil = {
    /**
     * @function ComponentsUtil.getFileType
     * @description 获取上传文件类型。
     * @param {string} fileName - 文件名称。
     */
    getFileType(fileName) {
        let regCSV = /^.*\.(?:csv)$/i;
        let regExcel = /^.*\.(?:xls|xlsx)$/i; //文件名可以带空格
        let regGeojson = /^.*\.(?:geojson|json)$/i;
        if (regExcel.test(fileName)) { //校验不通过
            return FileTypes.EXCEL;
        } else if (regCSV.test(fileName)) {
            return FileTypes.CSV;
        } else if (regGeojson.test(fileName)) {
            return FileTypes.GEOJSON;
        }
        return null;
    }

};
