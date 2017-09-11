import SuperMap from '../../SuperMap';

/**
 * @private
 * @class  SuperMap.LevelRenderer.Tool.Log
 * LevelRenderer 工具-日志
 *
 */
export default class Log {

    /**
     * Constructor: SuperMap.LevelRenderer.Tool.Log
     * 构造函数。
     *
     */
    constructor() {
        return function () {
            if (SuperMap.LevelRenderer.Config.debugMode === 0) {
                return;
            }
            else if (SuperMap.LevelRenderer.Config.debugMode == 1) {
                for (var k in arguments) {
                    throw new Error(arguments[k]);
                }
            }
            else if (SuperMap.LevelRenderer.Config.debugMode > 1) {
                for (var k in arguments) {
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

    CLASS_NAME = "SuperMap.LevelRenderer.Tool.Log"
}
SuperMap.LevelRenderer.Tool.Log = Log;