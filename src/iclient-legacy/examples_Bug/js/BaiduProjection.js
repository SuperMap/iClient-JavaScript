/**
 *
 * Class: SuperMap.BaiduProjection
 * 百度坐标的转换类
 *
 * 支持 bd09ll(百度经纬度坐标)与bd09mc(百度米制经纬度坐标) 相互转换
 *
 */
SuperMap.BaiduProjection = {
    /**
     * 地球半径
     * {number}
     */
    EARTHRADIUS : 6370996.81,

    /**
     * 墨卡托 分段
     *
     */
    MCBAND : [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],

    /**
     * 经纬度 分段
     */
    LLBAND : [75, 60, 45, 30, 15, 0],

    /**
     * 墨卡托 转 经纬度
     * 偏移误差改正参数
     */
    MC2LL : [
              [ 1.410526172116255e-8, 0.00000898305509648872, -1.9939833816331, 200.9824383106796, -187.2403703815547,
                  91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2 ],
              [ -7.435856389565537e-9, 0.000008983055097726239, -0.78625201886289, 96.32687599759846, -1.85204757529826,
                  -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86 ],
              [ -3.030883460898826e-8, 0.00000898305509983578, 0.30071316287616, 59.74293618442277, 7.357984074871,
                  -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37 ],
              [ -1.981981304930552e-8, 0.000008983055099779535, 0.03278182852591, 40.31678527705744, 0.65659298677277,
                  -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06 ],
              [ 3.09191371068437e-9, 0.000008983055096812155, 0.00006995724062, 23.10934304144901, -0.00023663490511,
                  -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4 ],
              [ 2.890871144776878e-9, 0.000008983055095805407, -3.068298e-8, 7.47137025468032, -0.00000353937994,
                  -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 826088.5 ]
    ],

    /**
     * 经纬度 转 墨卡托
     * 偏移误差改正参数
     */
    LL2MC : [
        [-0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880, -35149669176653700,
            26595700718403920, -10725012454188240, 1800819912950474, 82.5],
        [0.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142,
            -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5],
        [0.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455,
            -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5],
        [0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013,
            -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5 ],
        [-0.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378,
            54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5],
        [-0.0003218135878613132, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093,
            2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]
    ],

    /**
     * APIMethod: convertMC2LL
     * bd09mc 转 bd09ll(即 百度墨卡托 转 百度经纬度)
     *
     * Parameters:
     * x - {Number} 百度bd09mc地图的X坐标
     * y - {Number} 百度bd09mc地图的X坐标
     *
     * Returns:
     * {<SuperMap.LonLat>} 返回百度bd09ll坐标
     */
    convertMC2LL : function(point){
        var x = point.x;
        var y = point.y;
        var cF;
        x = Math.abs(x);
        y = Math.abs(y);

        for(var cE = 0; cE <SuperMap.BaiduProjection.MCBAND.length; cE++){
            if(y >= SuperMap.BaiduProjection.MCBAND[cE]){
                cF = SuperMap.BaiduProjection.MC2LL[cE];
                break;
            }
        }

        var return_point = SuperMap.BaiduProjection.converter(x, y, cF);
        point.x = return_point.x;
        point.y = return_point.y;
    },

    /**
     * APIMethod : convertLL2MC
     * bd09ll转bd09mc(即 百度经纬度 转 百度墨卡托)
     *
     * Parameters:
     * lon - {Number} 百度bd09ll地图的经纬坐标
     * lat - {Number} 百度bd09ll地图的纬度坐标
     *
     * Returns:
     * {<SuperMap.LonLat>} 返回百度地图的ba09mc坐标
     */
    convertLL2MC : function (point) {
        var lon = point.x;
        var lat = point.y;
        var cE = [];
        lon = SuperMap.BaiduProjection.getLoop(lon, -180, 180);
        lat = SuperMap.BaiduProjection.getRange(lat, -74, 74);
        for(var i = 0; i < SuperMap.BaiduProjection.LLBAND.length; i++){
            if(lat >= SuperMap.BaiduProjection.LLBAND[i]){
                cE = SuperMap.BaiduProjection.LL2MC[i];
                break;
            }
        }
        if (cE.length > 0){
          for(var j = SuperMap.BaiduProjection.LLBAND.length - 1; j >= 0; j--){
              if(lat <= -SuperMap.BaiduProjection.LLBAND[j]){
                  cE = SuperMap.BaiduProjection.LL2MC[j];
                  break;
              }
          }
        }

        var return_point = SuperMap.BaiduProjection.converter(lon, lat, cE);
        point.x = return_point.x;
        point.y = return_point.y;
    },

    /**
     * Method : converter
     * 坐标转换的核心部分
     *
     * Parameters:
     * x - {Number} 坐标参数
     * y - {Number} 坐标参数
     *
     * Returns:
     * {<SuperMap.LonLat>} 返回坐标
     */
    converter : function (x, y, cE){
        var xTemp = cE[0] + cE[1] * Math.abs(x);
        var cC = Math.abs(y) / cE[9];
        var yTemp = cE[2] + cE[3] * cC + cE[4] * cC * cC + cE[5] * cC * cC * cC + cE[6] * cC * cC * cC * cC
            + cE[7] * cC * cC * cC * cC * cC + cE[8] * cC * cC * cC * cC * cC * cC;
        xTemp *=(x < 0 ? -1 : 1);
        yTemp *=(y < 0 ? -1 : 1);

        var lonlat = new SuperMap.Geometry.Point(xTemp, yTemp);
        return lonlat;
    },

    /**
     * Method : getLoop
     * getLoop
     *
     * Parameters:
     * lon - {Number} lon
     * min - {Number} min
     * max - {Number} max
     *
     * Returns:
     * lon
     */
    getLoop : function (lon, min, max){
        while (lon > max){
            lon -= max - min;
        }
        while (lon < min){
            lon += max - min;
        }
        return lon;
    },

    /**
     * Method: getRange
     * getRange
     *
     * Parameters:
     * lat - {Number} lat
     * min - {Number} min
     * max - {Number} max
     *
     * Returns:
     * lat
     */
    getRange : function(lat, min, max){
        if(min){
            lat = Math.max(lat,min);
        }
        if(max){
            lat = Math.min(lat,max);
        }
        return lat;
    }
};

/**
 * 将bd09ll与bd09mc的相互转换方法添加到SuperMap.Projection中
 * 用户引入BaiduProjection.js后
 * 直接使用SuperMap.Projection.transform()方法即可进行bd09ll与bd09mc的相互转换
 *
 * code
 * var bd09ll = SuperMap.Projection.transform(bd09mc_point, "EPSG:bd09mc", "EPSG:bd09ll");
 * end
 */

(function(){
    SuperMap.Projection.addTransform("EPSG:bd09ll","EPSG:bd09mc",SuperMap.BaiduProjection.convertLL2MC);
    SuperMap.Projection.addTransform("EPSG:bd09mc","EPSG:bd09ll",SuperMap.BaiduProjection.convertMC2LL);
})();
