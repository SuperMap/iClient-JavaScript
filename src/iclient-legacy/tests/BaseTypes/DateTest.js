/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 15-2-3
 * Time: 下午2:33
 * To change this template use File | Settings | File Templates.
 */
module("Date");
test("testDate_parse",function(){
    expect(2);
    var date1= new Date(Date.UTC(2015,6,12));
    var date =SuperMap.Date.parse("2015-06-12");
    ok(date1.year===date.year,"Function:parse");
    var date3 =SuperMap.Date.parse("2010-08-07T11:58:23.123-06");
    var date2= new Date(Date.UTC(2010,8,7));
    ok(date3.day===date2.day,"Function:parse");
});
test("testDate_parseDefault",function(){
    expect(1);
        var date4=SuperMap.Date.parse("20150612");
    var date5 = new Date("invalid");
    equals(date4.year==date5.year, true,"Function:parse");
});
test("testDate_toISOString",function(){
    expect(1);
    var dateTime= new Date(Date.UTC(2015,6,12));
    var dateString = SuperMap.Date.toISOString(dateTime);
    equals(dateString,"2015-07-12T00:00:00.000Z","Function:toISOString")
});
