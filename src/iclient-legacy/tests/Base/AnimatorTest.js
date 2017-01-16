module("Animator");
test("Animator_constructor",function()
{
     expect(7);
	var animator = new SuperMap.Animator(callbackFunction);
      function callbackFunction(){}
      ok(animator instanceof SuperMap.Animator, "animator instanceof SuperMap.Animator");
      equals(animator.CLASS_NAME, "SuperMap.Animator", "CLASS_NAME");
	  equals(animator.reverse,false,"reverse");
	  equals(animator.frameRate,60,"frameRate");
	  equals(animator.repeat,true,"repeat");
	  equals(animator.speed , 1,"speed");
	  equals(animator.startTime,0,"startTime");
	  animator.destroy();
});
test("TestAnimator_start",function()
{
     expect(8);
	 var animator = new SuperMap.Animator(callbackFunction,{
	       speed:8,
		   startTime:1,
		   endTime:100
	 });
	 function callbackFunction(){}
     var anispeed = animator.speed;
     var anistarttime = animator.startTime;
	 animator.start();
	 equals(animator.getRunning(),true,"测试开始播放动画是否成功");
	 equals(animator.getCurrentTime(),anispeed+anistarttime,"测试获取当前时间是否成功");
	 equals(animator.getEndTime(),100,"测试获取结束时间是否成功");
	 equals(animator.getFrameRate(),60,"测试获取帧率是否成功");
	 equals(animator.getStartTime(),1,"测试获取开始时间是否成功");
	 equals(animator.getSpeed(),8,"测试获取当前速度是否成功");
	 equals(animator.getRepeat(),true,"测试获取是否重复是否成功");
	 equals(animator.getReverse(),false,"测试获取是否反向播放是否成功");
    //测试，提高覆盖率
    animator.pause();
    animator.reverse=true;
    animator.start();

    //测试，提高覆盖率
    animator.pause();
    animator.oldTime =animator.endTime;
    animator.reverse=false;
    animator.start();
    animator.destroy();

});
asyncTest("TestAnimator_pause",function()
{
   expect(2);
   var animator = new SuperMap.Animator(callbackFunction,{
	       speed:8,
		   startTime:1,
		   endTime:100
	 });
	 function callbackFunction(){}
	    animator.start();
	    equals(animator.getRunning(),true,"测试开始播放动画是否成功");

	 setTimeout(function(){
	         animator.pause();
		     equals(animator.getRunning(),false,"测试暂停播放动画是否成功");
		     animator.destroy();
	         start();
	   },1000);
	  
});
asyncTest("TestAniamtor_toggle",function()
{   expect(1);
    var animator = new SuperMap.Animator(callbackFunction);
	 function callbackFunction(){}
    animator.toggle();

	  setTimeout(function()
	  {
	     animator.toggle();
	     equals(animator.getRunning(),false,"测试切换开放和暂停播放动画是否成功");
		 animator.destroy();
	     start();
	  },1000);
	  
    
});
asyncTest("TestAniamtor_stop",function()
{
    expect(3);
	var animator = new SuperMap.Animator(callbackFunction);
     function callbackFunction(){}
    animator.stop();
	 animator.start();

	 setTimeout(function()
	 {
	      animator.stop();
		  equals(animator.getRunning(),false,"测试停止播放是否成功");
		  equals(animator.getCurrentTime(),0,"测试停止播放是否成功");
	      animator.start();
	     equals(animator.getOldTime(),0,"测试获取上一帧播放时间是否成功");
		 animator.destroy();
		  start();
	 },1000);
	 
});
asyncTest("TestAniamtor_redraw",function()
{
    expect(1);
    var animator = new SuperMap.Animator(callbackFunction,{
        speed:8,
        startTime:1,
        endTime:100
    });
    function callbackFunction(){}
    animator.reverse = true;
    animator.start();
    setTimeout(function()
    {
        animator.stop();
        animator.redraw();
        equals(animator.getRunning(),false,"测试播放继续");
        animator.destroy();
        start();
    },1000);

});
test("TestAnimator_setCurrentTime",function()
{
     expect(12);
	 var animator = new SuperMap.Animator(callbackFunction,{
	       speed:8,
		   startTime:2,
		   endTime:100
	 });
	 function callbackFunction(){}
	 animator.start();

	 equals(animator.setSpeed(-1),false,"测试输入非法值,设置速度是否成功");
	 
	 equals(animator.setCurrentTime(1),false,"测试输入非法值,设置当前时间是否成功");
	 equals(animator.getCurrentTime(),animator.speed+animator.startTime,"测试设置当前时间是否成功");

    animator.setStartTime(2);
    equals(animator.getStartTime(),2,"测试设置开始时间是否成功");

    animator.setStartTime(110);
    equals(animator.getStartTime(),2,"测试输入非法值,设置开始时间是否成功");

	 animator.setEndTime(50);
	 equals(animator.getEndTime(),50,"测试设置结束时间是否成功");
	 
	 animator.setEndTime(1);
	 equals(animator.getEndTime(),50,"测试输入非法值,设置结束时间是否成功")
	 
	 animator.setFrameRate(30);
	 equals(animator.getFrameRate(),30,"测试设置帧率是否成功");

    animator.setFrameRate(90);
    equals(animator.getFrameRate(),30,"测试输入非法值,设置帧率是否成功");
	 
	 animator.setSpeed(2);
	 equals(animator.getSpeed(),2,"测试设置速度是否成功");
	 
	 animator.setRepeat(false);
	 equals(animator.getRepeat(),false,"测试设置是否重复是否成功");
	 
	 animator.setReverse(true);
	 equals(animator.getReverse(),true,"测试设置是否反向播放是否成功");
	 animator.destroy();
});
test("TestAnimator_destroy",function()
{
     expect(4);
	 var animator = new SuperMap.Animator(callbackFunction,{
	              speed:10,
	              startTime:1,
	              endTime:100
	 });
	 function callbackFunction(){}
	 animator.destroy();
	 ok(animator.speed ==null,"speed");
	 ok(animator.startTime == null,"startTime");
	 equals(animator.endTime,null,"测试结束时间是否为null");
	 equals(animator.repeat, null,"测试是否重复是否为null");
});