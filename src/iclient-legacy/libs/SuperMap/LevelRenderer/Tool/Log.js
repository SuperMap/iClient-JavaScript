/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Tool.Log
 * LevelRenderer 工具-日志
 *
 */
SuperMap.LevelRenderer.Tool.Log = SuperMap.Class({

    /**
     * Constructor: SuperMap.LevelRenderer.Tool.Log
     * 构造函数。
     *
     */
    initialize: function() {
        return function() {
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
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Tool.Log"
});