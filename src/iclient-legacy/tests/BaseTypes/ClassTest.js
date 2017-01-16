/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 15-2-3
 * Time: 下午6:50
 * To change this template use File | Settings | File Templates.
 */
 module("Class");
test("testClass_constructor",function(){
    expect(6);
    var myClass = new SuperMap.Class({
        name:"myClass",
        id:"class",
        initialize:function(options){
            this.name = (options && options.name!=undefined )?options.name:this.name;
            this.id = (options && options.id!=undefined)?options.id:this.id;
        },
        destroy:function(){
            this.name=null;
            this.id=null;
        }
    });
    var myclass= new myClass();
    equals(myclass.name,"myClass","Function:Class");
    equals(myclass.id,"class","Function:Class");
    myclass.destroy();
    equals(myclass.name,null,"Function:Class");
    var options={
        name:"myClass1",
        id:"class1"
    } ;
    var myclass1= new myClass(options);
    equals(myclass1.name,"myClass1","Function:Class");
    equals(myclass1.id,"class1","Function:Class");
    myclass1.destroy();
    equals(myclass1.name,null,"Function:Class");
});