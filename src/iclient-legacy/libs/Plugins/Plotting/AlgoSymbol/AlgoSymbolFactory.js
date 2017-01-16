/**
 * Class: SuperMap.Plot.AlgoSymbolFactory
 * 算法标号工厂类。
 */
SuperMap.Plot.AlgoSymbolFactory = new SuperMap.Class({

    CLASS_NAME: "SuperMap.Plot.AlgoSymbolFactory"
});

/**
 * Function: SuperMap.Plot.AlgoSymbolFactory.getAlgoSymbol
 * 获取算法标号对象。
 *
 * Parameters:
 * libID - {Integer} 标号库ID。
 * code - {Integer} 标号code。
 * options - {Object} 创建标号所需参数
 *
 * Returns:
 * {<SuperMap.Geometry.AlgoSymbol>} 返回 <SuperMap.Geometry.AlgoSymbol> 的子类。
 */
SuperMap.Plot.AlgoSymbolFactory.getAlgoSymbol = function (libID, code, options) {
    if(libID === 0){
        switch(code){
            case SuperMap.Plot.SymbolType.ANNOFRAMESYMBOL:
                return new SuperMap.Geometry.GeoTooltipBox(options);
            case SuperMap.Plot.SymbolType.ANNOFRAMESYMBOLM:
                return new SuperMap.Geometry.GeoTooltipBoxM(options);
            case SuperMap.Plot.SymbolType.PATHTEXT:
                return new SuperMap.Geometry.PathText(options);
            case SuperMap.Plot.SymbolType.ARROWLINE:
                return new SuperMap.Geometry.ArrowLine(options);
            case SuperMap.Plot.SymbolType.CURVEEIGHT:
                return new SuperMap.Geometry.CurveEight(options);
            case SuperMap.Plot.SymbolType.RUNWAY:
                return new SuperMap.Geometry.Runway(options);
            case SuperMap.Plot.SymbolType.CONCENTRICCIRCLE:
                return new SuperMap.Geometry.ConcentricCircle(options);
            case SuperMap.Plot.SymbolType.COMBINATIONALCIRCLE:
                return new SuperMap.Geometry.CombinationalCircle(options);
            case SuperMap.Plot.SymbolType.FREECURVE:
                return new SuperMap.Geometry.FreeCurve(options);
            case SuperMap.Plot.SymbolType.REGULARPOLYGON:
                return new SuperMap.Geometry.RegularPolygon(options);
            case SuperMap.Plot.SymbolType.BRACESYMBOL:
                return new SuperMap.Geometry.Brace(options);
            case SuperMap.Plot.SymbolType.TRAPEZOIDSYMBOL:
                return new SuperMap.Geometry.Trapezoid(options);
            case SuperMap.Plot.SymbolType.SYMBOLTEXTBOX:
                return new SuperMap.Geometry.SymbolTextBox(options);
            case SuperMap.Plot.SymbolType.NODECHAIN:
                return new SuperMap.Geometry.NodeChain(options);
            default:
                return new SuperMap.Geometry.AlgoSymbol(options);
        }
    } else if(libID === 22){
        switch(code){
            case 1001:
                return new SuperMap.Geometry.AlgoSymbol1001(options);
            case 1002:
                return new SuperMap.Geometry.AlgoSymbol1002(options);
            case 1003:
                return new SuperMap.Geometry.AlgoSymbol1003(options);
            case 1004:
                return new SuperMap.Geometry.AlgoSymbol1004(options);
            case 1005:
                return new SuperMap.Geometry.AlgoSymbol1005(options);
            case 1006:
                return new SuperMap.Geometry.AlgoSymbol1006(options);
            case 1007:
                return new SuperMap.Geometry.AlgoSymbol1007(options);
            case 1008:
                return new SuperMap.Geometry.AlgoSymbol1008(options);
            case 1009:
                return new SuperMap.Geometry.AlgoSymbol1009(options);
            case 1010:
                return new SuperMap.Geometry.AlgoSymbol1010(options);
            case 1011:
                return new SuperMap.Geometry.AlgoSymbol1011(options);
            case 1012:
                return new SuperMap.Geometry.AlgoSymbol1012(options);
            case 1013:
                return new SuperMap.Geometry.AlgoSymbol1013(options);
            case 1014:
                return new SuperMap.Geometry.AlgoSymbol1014(options);
            case 1015:
                return new SuperMap.Geometry.AlgoSymbol1015(options);
            case 1016:
                return new SuperMap.Geometry.AlgoSymbol1016(options);
            default:
                return new SuperMap.Geometry.AlgoSymbol(options);
        }
    } else if(libID === 100){
        switch(code){
            case 12500:
                return new SuperMap.Geometry.AlgoSymbol12500(options);
            case 12501:
                return new SuperMap.Geometry.AlgoSymbol12501(options);
            case 12502:
                return new SuperMap.Geometry.AlgoSymbol12502(options);
            case 13700:
                return new SuperMap.Geometry.AlgoSymbol13700(options);
            case 15200:
                return new SuperMap.Geometry.AlgoSymbol15200(options);
            case 15201://继承15201
            case 23800:
                return new SuperMap.Geometry.AlgoSymbol15201(options);
            case 15202:
                return new SuperMap.Geometry.AlgoSymbol15202(options);
            case 15800:
                return new SuperMap.Geometry.AlgoSymbol15800(options);
            case 15801:
                return new SuperMap.Geometry.AlgoSymbol15801(options);
            case 15802:
                return new SuperMap.Geometry.AlgoSymbol15802(options);
            case 15803:
                return new SuperMap.Geometry.AlgoSymbol15803(options);
            case 15804:
                return new SuperMap.Geometry.AlgoSymbol15804(options);
            case 15805:
                return new SuperMap.Geometry.AlgoSymbol15805(options);
            case 15806:
                return new SuperMap.Geometry.AlgoSymbol15806(options);
            case 15900:
                return new SuperMap.Geometry.AlgoSymbol15900(options);
            case 16000:
                return new SuperMap.Geometry.AlgoSymbol16000(options);
            case 16001:
                return new SuperMap.Geometry.AlgoSymbol16001(options);
            case 16100:
                return new SuperMap.Geometry.AlgoSymbol16100(options);
            case 16200:
                return new SuperMap.Geometry.AlgoSymbol16200(options);
            case 16201:
                return new SuperMap.Geometry.AlgoSymbol16201(options);
            case 16202:
                return new SuperMap.Geometry.AlgoSymbol16202(options);
            case 16203:
                return new SuperMap.Geometry.AlgoSymbol16203(options);
            case 16500:
                return new SuperMap.Geometry.AlgoSymbol16500(options);
            case 16700:
                return new SuperMap.Geometry.AlgoSymbol16700(options);
            case 16900:
                return new SuperMap.Geometry.AlgoSymbol16900(options);
            case 17400:
                return new SuperMap.Geometry.AlgoSymbol17400(options);
            case 17401:
                return new SuperMap.Geometry.AlgoSymbol17401(options);
            case 17500:
                return new SuperMap.Geometry.AlgoSymbol17500(options);
            case 17501:
                return new SuperMap.Geometry.AlgoSymbol17501(options);
            case 17600:
                return new SuperMap.Geometry.AlgoSymbol17600(options);
            case 17700:
                return new SuperMap.Geometry.AlgoSymbol17700(options);
            case 17703:
                return new SuperMap.Geometry.AlgoSymbol17703(options);
            case 17704:
                return new SuperMap.Geometry.AlgoSymbol17704(options);
            case 17800:
                return new SuperMap.Geometry.AlgoSymbol17800(options);
            case 17801:
                return new SuperMap.Geometry.AlgoSymbol17801(options);
            case 17802:
                return new SuperMap.Geometry.AlgoSymbol17802(options);
            case 17803:
                return new SuperMap.Geometry.AlgoSymbol17803(options);
            case 17804:
                return new SuperMap.Geometry.AlgoSymbol17804(options);
            case 17805:
                return new SuperMap.Geometry.AlgoSymbol17805(options);
            case 17806:
                return new SuperMap.Geometry.AlgoSymbol17806(options);
            case 20300:
                return new SuperMap.Geometry.AlgoSymbol20300(options);
            case 20301:
                return new SuperMap.Geometry.AlgoSymbol20301(options);
            case 21401:
                return new SuperMap.Geometry.AlgoSymbol21401(options);
            case 21500:
                return new SuperMap.Geometry.AlgoSymbol21500(options);
            case 21501:
                return new SuperMap.Geometry.AlgoSymbol21501(options);
            case 21502:
                return new SuperMap.Geometry.AlgoSymbol21502(options);
            case 21503:
                return new SuperMap.Geometry.AlgoSymbol21503(options);
            case 21504:
                return new SuperMap.Geometry.AlgoSymbol21504(options);
            case 21600:
            case 3010302:
                return new SuperMap.Geometry.AlgoSymbol21600(options);
            case 21800:
                return new SuperMap.Geometry.AlgoSymbol21800(options);
            case 21900:
                return new SuperMap.Geometry.AlgoSymbol21900(options);
            case 22000:
                return new SuperMap.Geometry.AlgoSymbol22000(options);
            case 22103:
                return new SuperMap.Geometry.AlgoSymbol22103(options);
            case 22200:
                return new SuperMap.Geometry.AlgoSymbol22200(options);
            case 23400:
                return new SuperMap.Geometry.AlgoSymbol23400(options);
            case 23500:
                return new SuperMap.Geometry.AlgoSymbol23500(options);
            case 23600:
                return new SuperMap.Geometry.AlgoSymbol23600(options);
            case 23700:
                return new SuperMap.Geometry.AlgoSymbol23700(options);
            case 23901:
                return new SuperMap.Geometry.AlgoSymbol23901(options);
            case 23902:
                return new SuperMap.Geometry.AlgoSymbol23902(options);
            case 24700:
                return new SuperMap.Geometry.AlgoSymbol24700(options);
            case 25000:
                return new SuperMap.Geometry.AlgoSymbol25000(options);
            case 25100:
                return new SuperMap.Geometry.AlgoSymbol25100(options);
            case 25101:
                return new SuperMap.Geometry.AlgoSymbol25101(options);
            case 25200:
                return new SuperMap.Geometry.AlgoSymbol25200(options);
            case 25201:
            case 21400:
                return new SuperMap.Geometry.AlgoSymbol25201(options);
            case 25202:
                return new SuperMap.Geometry.AlgoSymbol25202(options);
            case 25300:
                return new SuperMap.Geometry.AlgoSymbol25300(options);
            case 25301:
                return new SuperMap.Geometry.AlgoSymbol25301(options);
            case 25400:
                return new SuperMap.Geometry.AlgoSymbol25400(options);
            case 25500:
                return new SuperMap.Geometry.AlgoSymbol25500(options);
            case 25501:
                return new SuperMap.Geometry.AlgoSymbol25501(options);
            case 25502:
                return new SuperMap.Geometry.AlgoSymbol25502(options);
            case 25503:
                return new SuperMap.Geometry.AlgoSymbol25503(options);
            case 25600:
                return new SuperMap.Geometry.AlgoSymbol25600(options);
            case 25601:
                return new SuperMap.Geometry.AlgoSymbol25601(options);
            case 25700:
                return new SuperMap.Geometry.AlgoSymbol25700(options);
            case 25701:
                return new SuperMap.Geometry.AlgoSymbol25701(options);
            case 25800:
                return new SuperMap.Geometry.AlgoSymbol25800(options);
            case 25801:
                return new SuperMap.Geometry.AlgoSymbol25801(options);
            case 25900:
                return new SuperMap.Geometry.AlgoSymbol25900(options);
            case 25901:
                return new SuperMap.Geometry.AlgoSymbol25901(options);
            case 26400:
                return new SuperMap.Geometry.AlgoSymbol26400(options);
            case 26500:
                return new SuperMap.Geometry.AlgoSymbol26500(options);
            case 26501:
                return new SuperMap.Geometry.AlgoSymbol26501(options);
            case 26502:
                return new SuperMap.Geometry.AlgoSymbol26502(options);
            case 26503:
                return new SuperMap.Geometry.AlgoSymbol26503(options);
            case 26600:
                return new SuperMap.Geometry.AlgoSymbol26600(options);
            case 26601:
                return new SuperMap.Geometry.AlgoSymbol26601(options);
            case 26700:
                return new SuperMap.Geometry.AlgoSymbol26700(options);
            case 26800:
                return new SuperMap.Geometry.AlgoSymbol26800(options);
            case 27100:
                return new SuperMap.Geometry.AlgoSymbol27100(options);
            case 27300:
                return new SuperMap.Geometry.AlgoSymbol27300(options);
            case 27700:
                return new SuperMap.Geometry.AlgoSymbol27700(options);
            case 27701:
                return new SuperMap.Geometry.AlgoSymbol27701(options);
            case 27900:
                return new SuperMap.Geometry.AlgoSymbol27900(options);
            case 27901:
                return new SuperMap.Geometry.AlgoSymbol27901(options);
            case 27902:
                return new SuperMap.Geometry.AlgoSymbol27902(options);
            case 28000:
                return new SuperMap.Geometry.AlgoSymbol28000(options);
            case 28100:
                return new SuperMap.Geometry.AlgoSymbol28100(options);
            case 28200:
                return new SuperMap.Geometry.AlgoSymbol28200(options);
            case 28201:
                return new SuperMap.Geometry.AlgoSymbol28201(options);
            case 28300:
                return new SuperMap.Geometry.AlgoSymbol28300(options);
            case 28301:
                return new SuperMap.Geometry.AlgoSymbol28301(options);
            case 28400:
                return new SuperMap.Geometry.AlgoSymbol28400(options);
            case 28900:
                return new SuperMap.Geometry.AlgoSymbol28900(options);
            case 29000:
                return new SuperMap.Geometry.AlgoSymbol29000(options);
            case 29001:
                return new SuperMap.Geometry.AlgoSymbol29001(options);
            case 29002:
                return new SuperMap.Geometry.AlgoSymbol29002(options);
            case 29003:
                return new SuperMap.Geometry.AlgoSymbol29003(options);
            case 29100:
                return new SuperMap.Geometry.AlgoSymbol29100(options);
            case 29101:
                return new SuperMap.Geometry.AlgoSymbol29101(options);
            case 29103:
                return new SuperMap.Geometry.AlgoSymbol29103(options);
            case 29401:
                return new SuperMap.Geometry.AlgoSymbol29401(options);
            case 29800:
                return new SuperMap.Geometry.AlgoSymbol29800(options);
            case 29903:
                return new SuperMap.Geometry.AlgoSymbol29903(options);
            case 30000:
                return new SuperMap.Geometry.AlgoSymbol30000(options);
            case 30001:
                return new SuperMap.Geometry.AlgoSymbol30001(options);
            case 30002:
                return new SuperMap.Geometry.AlgoSymbol30002(options);
            case 30100:
            case 4020400:
                return new SuperMap.Geometry.AlgoSymbol30100(options);
            case 30200:
                return new SuperMap.Geometry.AlgoSymbol30200(options);
            case 30201:
                return new SuperMap.Geometry.AlgoSymbol30201(options);
            case 30800:
                return new SuperMap.Geometry.AlgoSymbol30800(options);
            case 30102:
                return new SuperMap.Geometry.AlgoSymbol30102(options);
            case 31300:
                return new SuperMap.Geometry.AlgoSymbol31300(options);
            case 31301:
                return new SuperMap.Geometry.AlgoSymbol31301(options);
            case 31302:
                return new SuperMap.Geometry.AlgoSymbol31302(options);
            case 31303:
                return new SuperMap.Geometry.AlgoSymbol31303(options);
            case 31304:
                return new SuperMap.Geometry.AlgoSymbol31304(options);
            case 31400:
                return new SuperMap.Geometry.AlgoSymbol31400(options);
            case 31401:
                return new SuperMap.Geometry.AlgoSymbol31401(options);
            case 31600:
                return new SuperMap.Geometry.AlgoSymbol31600(options);
            case 31601:
                return new SuperMap.Geometry.AlgoSymbol31601(options);
            case 31803:
                return new SuperMap.Geometry.AlgoSymbol31803(options);
            case 32300:
                return new SuperMap.Geometry.AlgoSymbol32300(options);
            case 32900:
                return new SuperMap.Geometry.AlgoSymbol32900(options);
            case 33400:
                return new SuperMap.Geometry.AlgoSymbol33400(options);
            case 34300:
                return new SuperMap.Geometry.AlgoSymbol34300(options);
            case 34400:
                return new SuperMap.Geometry.AlgoSymbol34400(options);
            case 34500:
                return new SuperMap.Geometry.AlgoSymbol34500(options);
            case 34501:
                return new SuperMap.Geometry.AlgoSymbol34501(options);
            case 34700:
                return new SuperMap.Geometry.AlgoSymbol34700(options);
            case 34800:
                return new SuperMap.Geometry.AlgoSymbol34800(options);
            case 34801:
                return new SuperMap.Geometry.AlgoSymbol34801(options);
            case 34900:
                return new SuperMap.Geometry.AlgoSymbol34900(options);
            case 34901:
                return new SuperMap.Geometry.AlgoSymbol34901(options);
            case 34902:
                return new SuperMap.Geometry.AlgoSymbol34902(options);
            case 35000:
                return new SuperMap.Geometry.AlgoSymbol35000(options);
            case 35200:
                return new SuperMap.Geometry.AlgoSymbol35200(options);
            case 35304:
                return new SuperMap.Geometry.AlgoSymbol35304(options);
            case 35500:
                return new SuperMap.Geometry.AlgoSymbol35500(options);
            case 36400:
                return new SuperMap.Geometry.AlgoSymbol36400(options);
            case 36401:
                return new SuperMap.Geometry.AlgoSymbol36401(options);
            case 36600:
                return new SuperMap.Geometry.AlgoSymbol36600(options);
            case 36700:
                return new SuperMap.Geometry.AlgoSymbol36700(options);
            case 36800:
                return new SuperMap.Geometry.AlgoSymbol36800(options);
            case 37100:
                return new SuperMap.Geometry.AlgoSymbol37100(options);
            case 37200:
                return new SuperMap.Geometry.AlgoSymbol37200(options);
            case 37300:
                return new SuperMap.Geometry.AlgoSymbol37300(options);
            case 37301:
                return new SuperMap.Geometry.AlgoSymbol37301(options);
            case 37600:
                return new SuperMap.Geometry.AlgoSymbol37600(options);
            case 37601:
                return new SuperMap.Geometry.AlgoSymbol37601(options);
            case 37700:
                return new SuperMap.Geometry.AlgoSymbol37700(options);
            case 38600:
                return new SuperMap.Geometry.AlgoSymbol38600(options);
            case 38700:
                return new SuperMap.Geometry.AlgoSymbol38700(options);
            case 39000:
                return new SuperMap.Geometry.AlgoSymbol39000(options);
            case 39101:
                return new SuperMap.Geometry.AlgoSymbol39101(options);
            case 39500:
                return new SuperMap.Geometry.AlgoSymbol39500(options);
            case 39600:
                return new SuperMap.Geometry.AlgoSymbol39600(options);
            case 39800:
                return new SuperMap.Geometry.AlgoSymbol39800(options);
            case 39801:
                return new SuperMap.Geometry.AlgoSymbol39801(options);
            case 39802:
                return new SuperMap.Geometry.AlgoSymbol39802(options);
            case 40000:
                return new SuperMap.Geometry.AlgoSymbol40000(options);
            case 40100:
                return new SuperMap.Geometry.AlgoSymbol40100(options);
            case 40101:
                return new SuperMap.Geometry.AlgoSymbol40101(options);
            case 40900:
                return new SuperMap.Geometry.AlgoSymbol40900(options);
            case 41100:
                return new SuperMap.Geometry.AlgoSymbol41100(options);
            case 41200:
                return new SuperMap.Geometry.AlgoSymbol41200(options);
            case 41201:
                return new SuperMap.Geometry.AlgoSymbol41201(options);
            case 41202:
                return new SuperMap.Geometry.AlgoSymbol41202(options);
            case 42200:
                return new SuperMap.Geometry.AlgoSymbol42200(options);
            case 42400:
                return new SuperMap.Geometry.AlgoSymbol42400(options);
            case 42500:
                return new SuperMap.Geometry.AlgoSymbol42500(options);
            case 42700:
                return new SuperMap.Geometry.AlgoSymbol42700(options);
            case 43500:
                return new SuperMap.Geometry.AlgoSymbol43500(options);
            case 44100:
                return new SuperMap.Geometry.AlgoSymbol44100(options);
            case 44200:
                return new SuperMap.Geometry.AlgoSymbol44200(options);
            case 44300:
                return new SuperMap.Geometry.AlgoSymbol44300(options);
            case 44400:
                return new SuperMap.Geometry.AlgoSymbol44400(options);
            case 3010301:
                return new SuperMap.Geometry.AlgoSymbol3010301(options);
            case 3010303:
                return new SuperMap.Geometry.AlgoSymbol3010303(options);
            case 3010304:
                return new SuperMap.Geometry.AlgoSymbol3010304(options);
            case 3010102:
                return new SuperMap.Geometry.AlgoSymbol3010102(options);
            case 3010103:
                return new SuperMap.Geometry.AlgoSymbol3010103(options);
            case 3010104:
                return new SuperMap.Geometry.AlgoSymbol3010104(options);
            case 3010105:
                return new SuperMap.Geometry.AlgoSymbol3010105(options);
            case 3010106:
                return new SuperMap.Geometry.AlgoSymbol3010106(options);
            case 3010107:
                return new SuperMap.Geometry.AlgoSymbol3010107(options);
            case 3010108:
                return new SuperMap.Geometry.AlgoSymbol3010108(options);
            case 3020901:
                return new SuperMap.Geometry.AlgoSymbol3020901(options);
            case 3032000:
                return new SuperMap.Geometry.AlgoSymbol3032000(options);
            case 4010800:
                return new SuperMap.Geometry.AlgoSymbol4010800(options);
            case 4010801:
                return new SuperMap.Geometry.AlgoSymbol4010801(options);
            case 4010905:
                return new SuperMap.Geometry.AlgoSymbol4010905(options);
            case 4011100:
                return new SuperMap.Geometry.AlgoSymbol4011100(options);
            case 4020303:
                return new SuperMap.Geometry.AlgoSymbol4020303(options);
            case 4020401:
                return new SuperMap.Geometry.AlgoSymbol4020401(options);
            case 4020402:
                return new SuperMap.Geometry.AlgoSymbol4020402(options);
            case 4022100:
                return new SuperMap.Geometry.AlgoSymbol4022100(options);
            case 4022101:
                return new SuperMap.Geometry.AlgoSymbol4022101(options);
            case 4022102:
                return new SuperMap.Geometry.AlgoSymbol4022102(options);
            case 6020400:
                return new SuperMap.Geometry.AlgoSymbol6020400(options);
            case 6020401:
                return new SuperMap.Geometry.AlgoSymbol6020401(options);
            case 6020402:
                return new SuperMap.Geometry.AlgoSymbol6020402(options);
            case 6020403:
                return new SuperMap.Geometry.AlgoSymbol6020403(options);
            case 6020404:
                return new SuperMap.Geometry.AlgoSymbol6020404(options);
            default:
                return new SuperMap.Geometry.AlgoSymbol(options);
        }
    } else {
        return new SuperMap.Geometry.AlgoSymbol(options);
    }
};

/**
 * Function: SuperMap.Plot.AlgoSymbolFactory.isAccessServer
 * 判断算法标号对象是否需要从服务器取数据
 *
 * Parameters:
 * libID - {Integer} 标号库ID。
 * code - {Integer} 标号code。
 *
 * Returns:
 * {Boolean} 返回是否访问服务器的标识。
 */
SuperMap.Plot.AlgoSymbolFactory.isAccessServer = function (libID, code) {
    if(libID === 0){
        switch (code) {
            case SuperMap.Plot.SymbolType.TEXTSYMBOL:
            case SuperMap.Plot.SymbolType.ELLIPSESYMBOL:
            case SuperMap.Plot.SymbolType.CIRCLESYMBOL:
            case SuperMap.Plot.SymbolType.RECTANGLESYMBOL:
            case SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL:
            case SuperMap.Plot.SymbolType.POLYLINESYMBOL:
            case SuperMap.Plot.SymbolType.ARCSYMBOL:
            case SuperMap.Plot.SymbolType.CHORDSYMBOL:
            case SuperMap.Plot.SymbolType.PIESYMBOL:
            case SuperMap.Plot.SymbolType.PARALLELLINE:
            case SuperMap.Plot.SymbolType.POLYGONREGION:
            case SuperMap.Plot.SymbolType.KIDNEY:
            case SuperMap.Plot.SymbolType.POLYBEZIERSYMBOL:
            case SuperMap.Plot.SymbolType.POLYBEZIERCLOSESYMBOL:
            case SuperMap.Plot.SymbolType.ANNOFRAMESYMBOL:
            case SuperMap.Plot.SymbolType.PATHTEXT:
            case SuperMap.Plot.SymbolType.ARROWLINE:
            case SuperMap.Plot.SymbolType.CURVEEIGHT:
            case SuperMap.Plot.SymbolType.RUNWAY:
            case SuperMap.Plot.SymbolType.CONCENTRICCIRCLE:
            case SuperMap.Plot.SymbolType.COMBINATIONALCIRCLE:
            case SuperMap.Plot.SymbolType.FREECURVE:
            case SuperMap.Plot.SymbolType.REGULARPOLYGON:
            case SuperMap.Plot.SymbolType.BRACESYMBOL:
            case SuperMap.Plot.SymbolType.TRAPEZOIDSYMBOL:
            case SuperMap.Plot.SymbolType.ANNOFRAMESYMBOLM:
            case SuperMap.Plot.SymbolType.SYMBOLTEXTBOX:
            case SuperMap.Plot.SymbolType.NODECHAIN:
                return false;
            default:
                return true;
        }
    } else if(libID === 22){
        switch(code){
            case 1001:
            case 1002:
            case 1003:
            case 1004:
            case 1005:
            case 1006:
            case 1007:
            case 1008:
            case 1009:
            case 1010:
            case 1011:
            case 1012:
            case 1013:
            case 1014:
            case 1015:
            case 1016:
                return false;
            default:
                return true;
        }
    }else if(libID === 100){
        switch(code){
            case 12500:
            case 12501:
            case 12502:
            case 13700:
            case 15200:
            case 15201:
            case 15202:
            case 15800:
            case 15801:
            case 15802:
            case 15803:
            case 15804:
            case 15805:
            case 15806:
            case 15900:
            case 16000:
            case 16001:
            case 16100:
            case 16200:
            case 16201:
            case 16202:
            case 16203:
            case 16500:
            case 16700:
            case 16900:
            case 17400:
            case 17401:
            case 17500:
            case 17501:
            case 17600:
            case 17700:
            case 17703:
            case 17704:
            case 17800:
            case 17801:
            case 17802:
            case 17803:
            case 17804:
            case 17805:
            case 17806:
            case 20300:
            case 20301:
            case 21400:
            case 21401:
            case 21500:
            case 21501:
            case 21502:
            case 21503:
            case 21504:
            case 21600:
            case 21800:
            case 21900:
            case 22000:
            case 22103:
            case 22200:
            case 23400:
            case 23500:
            case 23600:
            case 23700:
            case 23800:
            case 23901:
            case 23902:
            case 24700:
            case 25000:
            case 25100:
            case 25101:
            case 25200:
            case 25201:
            case 25202:
            case 25300:
            case 25301:
            case 25400:
            case 25500:
            case 25501:
            case 25502:
            case 25503:
            case 25600:
            case 25601:
            case 25700:
            case 25701:
            case 25800:
            case 25801:
            case 25900:
            case 25901:
            case 26400:
            case 26500:
            case 26501:
            case 26502:
            case 26503:
            case 26600:
            case 26601:
            case 26700:
            case 26800:
            case 27100:
            case 27300:
            case 27700:
            case 27701:
            case 27900:
            case 27901:
            case 27902:
            case 28000:
            case 28100:
            case 28200:
            case 28201:
            case 28300:
            case 28301:
            case 28400:
            case 28900:
            case 29000:
            case 29001:
            case 29002:
            case 29003:
            case 29100:
            case 29101:
            case 29103:
            case 29401:
            case 29800:
            case 29903:
            case 30000:
            case 30001:
            case 30002:
            case 30100:
            case 30200:
            case 30201:
            case 30800:
            case 30102:
            case 31300:
            case 31301:
            case 31302:
            case 31303:
            case 31304:
            case 31400:
            case 31401:
            case 31600:
            case 31601:
            case 31803:
            case 32300:
            case 32900:
            case 33400:
            case 34300:
            case 34400:
            case 34500:
            case 34501:
            case 34700:
            case 34800:
            case 34801:
            case 34900:
            case 34901:
            case 34902:
            case 35000:
            case 35200:
            case 35304:
            case 35500:
            case 36400:
            case 36401:
            case 36600:
            case 36700:
            case 36800:
            case 37100:
            case 37200:
            case 37300:
            case 37301:
            case 37600:
            case 37601:
            case 37700:
            case 38600:
            case 38700:
            case 39000:
            case 39101:
            case 39500:
            case 39600:
            case 39800:
            case 39801:
            case 39802:
            case 3010102:
            case 3010103:
            case 3010104:
            case 3010105:
            case 3010106:
            case 3010107:
            case 3010108:
            case 40000:
            case 40100:
            case 40101:
            case 40900:
            case 41100:
            case 41200:
            case 41201:
            case 41202:
            case 42200:
            case 42400:
            case 42500:
            case 42700:
            case 43500:
            case 44100:
            case 44200:
            case 44300:
            case 44400:
            case 3010301:
            case 3010302:
            case 3010303:
            case 3010304:
            case 3020901:
            case 3032000:
            case 4010800:
            case 4010801:
            case 4010905:
            case 4011100:
            case 4020303:
            case 4020400:
            case 4020401:
            case 4020402:
            case 4022100:
            case 4022101:
            case 4022102:
            case 6020400:
            case 6020401:
            case 6020402:
            case 6020403:
            case 6020404:
                return false;
            default:
                return true;
        }
    }  else {
        return true;
    }
};