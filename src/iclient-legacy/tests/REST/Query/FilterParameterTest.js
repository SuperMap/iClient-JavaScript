module("FilterParameter")

test("TestDefaultConstructor",function(){
    var filterParameter = new SuperMap.REST.FilterParameter();
    ok( filterParameter!=null, "not null" );
    ok(filterParameter.attributeFilter==null,"filterParameter.attributeFilter");
    ok(filterParameter.name==null,"filterParameter.name");
    ok(filterParameter.joinItems==null,"filterParameter.joinItems");
    ok(filterParameter.linkItems==null,"filterParameter.linkItems");
    ok(filterParameter.ids==null,"filterParameter.ids");
    ok(filterParameter.orderBy==null,"filterParameter.orderBy");
    ok(filterParameter.groupBy==null,"filterParameter.groupBy");
    ok(filterParameter.ids==null,"filterParameter.ids");
    ok(filterParameter.groupBy==null,"filterParameter.groupBy");
});


test("TestConstructor_Destructor",function(){
    var joinItem=new SuperMap.REST.JoinItem();
    var joinItems=new Array(joinItem);
    var linkItem=new SuperMap.REST.LinkItem();
    var linkItems=new Array(linkItem);
    var ids=new Array("","");
    var filterParameter = new SuperMap.REST.FilterParameter({
        attributeFilter:"SmID>10",
        joinItems:joinItems,
        linkItems:linkItems,
        orderBy:"SmUserID"
    });
    ok( filterParameter!=null, "not null" );
    equal(filterParameter.attributeFilter,"SmID>10","filterParameter.attributeFilter");
    ok(filterParameter.name==null,"filterParameter.name");
    equal(filterParameter.joinItems,joinItems,"filterParameter.joinItems");
    equal(filterParameter.linkItems,linkItems,"filterParameter.linkItems");
    ok(filterParameter.ids==null,"filterParameter.ids");
    equal(filterParameter.orderBy,"SmUserID","filterParameter.orderBy");
    ok(filterParameter.groupBy==null,"filterParameter.groupBy");
    ok(filterParameter.ids==null,"filterParameter.ids");
    ok(filterParameter.groupBy==null,"filterParameter.groupBy");
    filterParameter.destroy();
    
    ok( filterParameter!=null, "not null" );
    ok(filterParameter.attributeFilter==null,"filterParameter.attributeFilter");
    ok(filterParameter.name==null,"filterParameter.name");
    ok(filterParameter.joinItems==null,"filterParameter.joinItems");
    ok(filterParameter.linkItems==null,"filterParameter.linkItems");
    ok(filterParameter.ids==null,"filterParameter.ids");
    ok(filterParameter.orderBy==null,"filterParameter.orderBy");
    ok(filterParameter.groupBy==null,"filterParameter.groupBy");
    ok(filterParameter.ids==null,"filterParameter.ids");
    ok(filterParameter.groupBy==null,"filterParameter.groupBy");
});