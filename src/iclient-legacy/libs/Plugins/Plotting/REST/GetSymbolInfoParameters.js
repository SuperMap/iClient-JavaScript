/**
 * Class: SuperMap.REST.GetSymbolInfoParameters
 * 标绘服务中获取标号信息参数类。
 */
SuperMap.REST.GetSymbolInfoParameters = SuperMap.Class({
    /**
     * APIProperty: libID
     * {Integer} 标号库ID
     */
    libID: null,

    /**
     * APIProperty: code
     * {Integer} 标号code
     */
    code: null,

    /**
     * APIProperty: inputPoints
     * {Array(<SuperMap.Geometry.Point>)} 控制点
     */
    inputPoints: null,

    /**
     * APIProperty: symbolRank
     * {Integer} 标号级别
     */
    symbolRank: null,

    /**
     * APIProperty: negativeImage
     * {Boolean} 标号镜像
     */
    negativeImage: null,

    /**
     * APIProperty: surroundLineType
     * {Integer} 衬线类型
     */
    surroundLineType: null,

    /**
     * APIProperty: subSymbols
     * {Array(Integer)} 子标号的Code的数组，适用于部分算法标号
     */
    subSymbols: null,

    /**
     * APIProperty: scaleValues
     * {Array(Float)} 编辑前的比例值数组
     */
    scaleValues: null,

    /**
     * APIProperty: scalePoints
     * {Array(<SuperMap.Geometry.Point>)} 编辑前的比例点数组
     */
    scalePoints: null,

    /**
     * APIProperty: newScalePoint
     * {<SuperMap.Geometry.Point>} 正在编辑的比例点
     */
    newScalePoint: null,

    /**
     * APIProperty: newScalePointIndex
     * {Integer} 正在编辑的比例点在原比例点数组中的索引
     */
    newScalePointIndex: null,


    /**
     * Constructor: SuperMap.REST.GetSymbolInfoParameters
     * 初始化 GetSymbolInfoParameters 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * libID - {Integer}  标号库ID，必传参数。
     * code - {Integer}  标号code，必传参数。
     * inputPoints - {Array(<SuperMap.Geometry.Point>)} 控制点数组，线面标号的必传参数。
     * symbolRank - {Integer} 点标号级别。
     * negativeImage - {Boolean} 点标号的镜像。
     * surroundLineType - {Integer} 衬线类型。
     * subSymbols - {Array(Integer)} 线面标号的子标号数组。
     * scaleValues - {Array(Float)} 编辑前的比例值数组。
     * scalePoints - {Array(<SuperMap.Geometry.Point>)} 编辑前的比例点数组。
     * newScalePoint - {<SuperMap.Geometry.Point>} 正在编辑的比例点。
     * newScalePointIndex - {Integer} 正在编辑的比例点在原比例点数组中的索引。
     */
    initialize: function(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy:function () {
        var me = this;
        me.libID = null;
        me.code = null;
        me.inputPoints = null;
        me.symbolRank = null;
        me.negativeImage = null;
        me.surroundLineType = null;
        me.subSymbols = null;
        me.scaleValues = null;
        me.scalePoints = null;
        me.newScalePoint = null;
        me.newScalePointIndex = null;
    },

    CLASS_NAME:"SuperMap.REST.GetSymbolInfoParameters"
});

/**
 * Function: SuperMap.REST.GetSymbolInfoParameters.toUrlParameters
 * 将 <SuperMap.REST.GetSymbolInfoParameters> 对象参数转换为 Url参数 字符串。
 *
 * Parameters:
 * params - {<SuperMap.REST.GetSymbolInfoParameters>} 地物编辑参数。
 *
 * Returns:
 * {String} 转化后的 Url参数 字符串。
 */
SuperMap.REST.GetSymbolInfoParameters.toUrlParameters = function(params) {
    if(params && params.libID !== null && params.code !== null){
        var paramsSymbolInfo = "libID=" + params.libID + "&code=" + params.code;

        if(params.inputPoints && params.inputPoints !== null && params.inputPoints.length !== 0) {
            paramsSymbolInfo += "&inputPoints=[";
            for( var i = 0; i < params.inputPoints.length; i++ ){
                if(i === params.inputPoints.length - 1){
                    paramsSymbolInfo += "{\"x\":" + params.inputPoints[i].x + ", \"y\":" + params.inputPoints[i].y + "}]";
                } else {
                    paramsSymbolInfo += "{\"x\":" + params.inputPoints[i].x + ", \"y\":" + params.inputPoints[i].y + "},";
                }
            }
        }

        if(params.scalePoints && params.scalePoints !== null && params.scalePoints.length !== 0) {
            paramsSymbolInfo += "&scalePoints=[";
            for( var i = 0; i < params.scalePoints.length; i++ ){
                if(i === params.scalePoints.length - 1){
                    paramsSymbolInfo += "{\"x\":" + params.scalePoints[i].x + ", \"y\":" + params.scalePoints[i].y + "}]";
                } else {
                    paramsSymbolInfo += "{\"x\":" + params.scalePoints[i].x + ", \"y\":" + params.scalePoints[i].y + "},";
                }
            }
        }

        if(params.scaleValues && params.scaleValues !== null && params.scaleValues.length !== 0) {
            paramsSymbolInfo += "&scaleValues=[";
            for( var i = 0; i < params.scaleValues.length; i++ ){
                if(i === params.scaleValues.length - 1){
                    paramsSymbolInfo += params.scaleValues[i] + "]";
                } else {
                    paramsSymbolInfo += params.scaleValues[i] + ",";
                }
            }
        }

        if(params.subSymbols && params.subSymbols !== null && params.subSymbols.length !== 0) {
            paramsSymbolInfo += "&subSymbols=[";
            for( var i = 0; i < params.subSymbols.length; i++ ){
                if(i === params.subSymbols.length - 1){
                    paramsSymbolInfo += params.subSymbols[i].code + "]";
                } else {
                    paramsSymbolInfo += params.subSymbols[i].code + ",";
                }
            }
        }

        if(params.newScalePoint && params.newScalePoint !== null) {
            paramsSymbolInfo += "&newScalePoint=" + "{\"x\":" + params.newScalePoint.x + ", \"y\":" + params.newScalePoint.y + "}";
        }

        if(params.newScalePointIndex && params.newScalePointIndex !== null){
            paramsSymbolInfo += "&newScalePointIndex=" + params.newScalePointIndex;
        }

        if(params.symbolRank && params.symbolRank !== null){
            paramsSymbolInfo += "&symbolRank=" + params.symbolRank;
        }

        if(params.negativeImage && params.negativeImage !== null){
            paramsSymbolInfo += "&negativeImage=" + params.negativeImage;
        }

        if(params.surroundLineType && params.surroundLineType !== null){
            paramsSymbolInfo += "&surroundLineType=" + params.surroundLineType;
        }

        return paramsSymbolInfo;
    }
};