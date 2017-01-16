module("LinkItem");

test("TestLinkItem",function(){
    var datasourceConnectionInfo=new SuperMap.REST.DatasourceConnectionInfo({
        alias:"linkAlias",
        connect:true
    });
    var foreignKeys=new Array("key");
    var linkItem = new SuperMap.REST.LinkItem({
        datasourceConnectionInfo:datasourceConnectionInfo,
        foreignKeys:foreignKeys,
    });
    ok( linkItem!=null, "null" );
    equal(linkItem.datasourceConnectionInfo,datasourceConnectionInfo,"linkItem.datasourceConnectionInfo ");
    equal(linkItem.foreignKeys,foreignKeys,"linkItem.foreignKeys");
    ok(linkItem.foreignTable==null,"linkItem.foreignTable");
    ok(linkItem.linkFields==null,"linkItem.linkFields");
    ok(linkItem.linkFilter==null,"linkItem.linkFilter");
    ok(linkItem.name==null,"linkItem.name");
    ok(linkItem.primaryKeys==null,"linkItem.primaryKeys");

    linkItem.destroy();
    ok( linkItem=!null, "null" );
    ok(linkItem.datasourceConnectionInfo==null,"linkItem.datasourceConnectionInfo ");
    ok(linkItem.foreignKeys==null,"linkItem.foreignKeys");
    ok(linkItem.foreignTable==null,"linkItem.foreignTable");
    ok(linkItem.linkFields==null,"linkItem.linkFields");
    ok(linkItem.linkFilter==null,"linkItem.linkFilter");
    ok(linkItem.name==null,"linkItem.name");
    ok(linkItem.primaryKeys==null,"linkItem.primaryKeys");
});