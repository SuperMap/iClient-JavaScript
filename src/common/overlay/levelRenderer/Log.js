import {Config} from './Config';

/**
 * @private
 * @class  SuperMap.LevelRenderer.Tool.Log
 * @category Visualization Theme
 * LevelRenderer 工具-日志
 *
 */
export class Log {

    /**
     * Constructor: SuperMap.LevelRenderer.Tool.Log
     * 构造函数。
     *
     */
    constructor() {

        this.CLASS_NAME = "SuperMap.LevelRenderer.Tool.Log";
        return function () {
            if (Config.debugMode === 0) {
                return;
            } else if (Config.debugMode == 1) {
                for (let k in arguments) {
                    throw new Error(arguments[k]);
                }
            } else if (Config.debugMode > 1) {
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