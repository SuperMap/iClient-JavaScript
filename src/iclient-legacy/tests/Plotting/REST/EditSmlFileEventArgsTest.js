module("EditSmlFileEventArgs");

test("EditSmlFileEventArgs_Test", function () {
    var editSmlFileResult = new SuperMap.REST.EditSmlFileResult();
    var editSmlFileEventArgs = new SuperMap.REST.EditSmlFileEventArgs(editSmlFileResult, 'originResult');

    ok(editSmlFileEventArgs !== null, "not null");
    equal(editSmlFileEventArgs.result, editSmlFileResult, 'editSmlFileResult.result');
    equal(editSmlFileEventArgs.originResult, 'originResult', 'editSmlFileEventArgs.originResult');

    editSmlFileEventArgs.destroy();
    ok(editSmlFileEventArgs !== null, "not null" );
    ok(editSmlFileEventArgs.result === null, "editSmlFileEventArgs.result");
    ok(editSmlFileEventArgs.originResult === null, 'editSmlFileEventArgs.originResult');
});

