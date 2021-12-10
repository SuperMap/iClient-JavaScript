/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Config} from './Config';

/**
 * @private
 * @class  LevelRenderer.Tool.Log
 * @category Visualization Theme
 * @classdesc LevelRenderer 工具-日志
 */
export class Log {
    constructor() {

        this.CLASS_NAME = "SuperMap.LevelRenderer.Tool.Log";
        return function () {
            if (+Config.debugMode === 0) {
                return;
            } else if (+Config.debugMode === 1) {
                for (let k in arguments) {
                    throw new Error(arguments[k]);
                }
            } else if (+Config.debugMode > 1) {
                for (let k in arguments) {
                    console.log(arguments[k]);
                }
            }
        };

        /* for debug
         return function(mes) {
         document.getElementById('wrong-message').innerHTML =
         mes + ' ' + (new Date() - 0)
         + '<br/>'
         + document.getElementById('wrong-message').innerHTML;
         };
         */
    }

    destory() {
        return true;
    }
}
