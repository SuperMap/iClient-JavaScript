/* Copyright (c) 2000-2011 by SuperMap Software Co., Ltd.*/

/**
 * Class: SuperMap.LocationControl
 * 支持安卓定位功能。
 */
SuperMap.LocationControl = SuperMap.Class({
    
    /**
     * Constructor: SuperMap.LocationControl
     * 构造函数。
     *
     * 例如：
     * (start code)	
     * var control = new SuperMap.LocationControl();
	control.local();
     * (end)
     */
    initialize: function() {
    },
    /**
     * Method: local
     * 截图。
     * Parameters:
     * onSuccess - {<Function>} 定位成功回调函数。
     * onError - {<Function>} 定位失败回调函数。
	 * timeOut —  {<Number>}  设置GPS定位时等待的时间
     */
    local: function(onSuccess,onError,timeOut){
            var me = this;
            var lat,lot,errorInfo;
            cordova.exec(
                function (location){
					lat = location["lat"];
                    lon = location["lon"];
                    if(lat == 0 || lon == 0){
                        errorInfo = location["errorString"];
						console.log(errorInfo);
						//alert("请确定打开GPS或网络连接正常");
						onError("定位失败，请确定打开GPS或网络连接正常。");
                    }else{
						position = new SuperMap.LonLat(lon, lat);
						onSuccess(position);
                        //me.transCoordinate(position.lon,position.lat,onSuccess,onError);
                    }
                },function (e){
                },"SMLocation","Location", [timeOut]);  
    },
	
    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function() {
    },
    
    CLASS_NAME: "SuperMap.ShotScreenControl"
});