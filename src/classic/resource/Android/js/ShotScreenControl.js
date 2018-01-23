/* Copyright (c) 2000-2011 by SuperMap Software Co., Ltd.*/

/**
 * Class: SuperMap.ShotScreenControl
 * 支持安卓截图功能。
 */
SuperMap.ShotScreenControl = SuperMap.Class({
    
    /**
     * Constructor: SuperMap.ShotScreenControl
     * 构造函数。
     *
     * 例如：
     * (start code)	
     * var control = new SuperMap.ShotScreenControl();
	control.shot();
     * (end)
     */
    initialize: function() {
    },
    /**
     * Method: shot
     * 截图。
     */
    shot: function(){
        try{
			var tm = this.getDate();
			var n = "print_image_"+tm+".png";
			//var m = window;//document.getElementsByTagName("body")[0];
			//var w = m.innerWidth//m.clientWidth;
			//var h = m.innerHeight;
			cordova.exec(function(){alert("截图保存到:sdcard/SuperMap/"+n);}, function(e){alert("截图失败了");}, "ShotScreen","action", [n]);
		}
		catch(e){
			alert("截图失败");
		}
    },
    /**
     * Method: getDate
     * 获取时间。
     */
    getDate:function(){
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();
	var mo = d.getMonth()+1;
	var da = d.getDate();
	return mo+"_"+da+"_"+h+"_"+m+"_"+s;
    },
    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function() {
    },
    
    CLASS_NAME: "SuperMap.ShotScreenControl"
});