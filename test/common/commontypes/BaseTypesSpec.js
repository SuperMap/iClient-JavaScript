require('../../../src/common/commontypes/BaseTypes');

describe('BaseTypes', function () {
    it('startsWith, contains', function () {
        var str = "BaseTypesTest";
        var isStartWith = SuperMap.String.startsWith(str, 'Base');
        var isContains = SuperMap.String.contains(str, 'contain');
        expect(isStartWith).toBeTruthy();
        expect(isContains).toBeFalsy();
    });

    it('trim', function () {
        var str = "this is a BaseTypesTest ";
        var newStr = SuperMap.String.trim(str);
        expect(newStr).toEqual("this is a BaseTypesTest");
    });

    it('camelize', function () {
        var str = SuperMap.String.camelize('chicken-head');
        expect(str).toEqual('chickenHead');
    });

    it('format_String', function () {
        var template1 = "${a,b}";
        var result1 = SuperMap.String.format(template1, null, null);
        expect(result1).toEqual("${a,b}");
        var template = "${a.b}";
        var context = {a: {b: "format"}};
        var args = null;
        var result = SuperMap.String.format(template, context, args);
        expect(result).toEqual("format");
    });

    it('isNumeric, numericIf', function () {
        var result1 = SuperMap.String.isNumeric("6.02e23");
        var result2 = SuperMap.String.isNumeric(" 4 ");
        var result3 = SuperMap.String.numericIf("4");
        expect(result1).toBeTruthy();
        expect(result2).toBeFalsy();
        expect(result3).toEqual(4);
    });

    //数值操作的一系列常用扩展函数
    it('limitSigDigs', function () {
        var number = SuperMap.Number.limitSigDigs(123.123456789, 6);
        expect(number).toEqual(123.123);
    });

    //数字格式化输出.
    it('format_Number', function () {
        var number1 = SuperMap.Number.format(123456789, null, ',', '.');
        var number2 = SuperMap.Number.format(123.123456789, 0, ',', '.');
        var number3 = SuperMap.Number.format(123.123456789, 5, ',', '.');
        expect(number1).toEqual("123,456,789");
        expect(number2).toEqual("123");
        expect(number3).toEqual("123.12346");
    });

    it('Number.limitSigDigs', function () {
        var number = 123.123456789;
        var newNm = number.limitSigDigs(8);
        expect(newNm).toEqual(123.12346);
    });

    //数组操作的一系列常用扩展函数
    //过滤数组
    it('filter', function () {
        var array = [10, 9, 53, 7, 25, 45];
        var newArray = SuperMap.Array.filter(array, function (val, i, array) {
            if (val > 20) {
                return true;
            }
        });
        expect(newArray).not.toBeNull();
        expect(newArray[0]).toEqual(53);
        expect(newArray[1]).toEqual(25);
        expect(newArray[2]).toEqual(45);
    });
});