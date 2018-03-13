import {StringExt, NumberExt, ArrayExt} from '../../../src/common/commontypes/BaseTypes';

describe('BaseTypes', () => {
    it('startsWith, contains', () => {
        var str = "BaseTypesTest";
        var isStartWith = StringExt.startsWith(str, 'Base');
        var isContains = StringExt.contains(str, 'contain');
        expect(isStartWith).toBeTruthy();
        expect(isContains).toBeFalsy();
    });

    it('trim', () => {
        var str = "this is a BaseTypesTest ";
        var newStr = StringExt.trim(str);
        expect(newStr).toEqual("this is a BaseTypesTest");
    });

    it('camelize', () => {
        var str = StringExt.camelize('chicken-head');
        expect(str).toEqual('chickenHead');
    });

    it('format_String', () => {
        var template1 = "${a,b}";
        var result1 = StringExt.format(template1, null, null);
        expect(result1).toEqual("${a,b}");
        var template = "${a.b}";
        var context = {a: {b: "format"}};
        var args = null;
        var result = StringExt.format(template, context, args);
        expect(result).toEqual("format");
    });

    it('isNumeric, numericIf', () => {
        var result1 = StringExt.isNumeric("6.02e23");
        var result2 = StringExt.isNumeric(" 4 ");
        var result3 = StringExt.numericIf("4");
        expect(result1).toBeTruthy();
        expect(result2).toBeFalsy();
        expect(result3).toEqual(4);
    });

    //数值操作的一系列常用扩展函数
    it('limitSigDigs', () => {
        var number = NumberExt.limitSigDigs(123.123456789, 6);
        expect(number).toEqual(123.123);
    });

    //数字格式化输出.
    it('format_Number', () => {
        var number1 = NumberExt.format(123456789, null, ',', '.');
        var number2 = NumberExt.format(123.123456789, 0, ',', '.');
        var number3 = NumberExt.format(123.123456789, 5, ',', '.');
        expect(number1).toEqual("123,456,789");
        expect(number2).toEqual("123");
        expect(number3).toEqual("123.12346");
    });

    it('Number.limitSigDigs', () => {
        var number = 123.123456789;
        var newNm = number.limitSigDigs(8);
        expect(newNm).toEqual(123.12346);
    });

    //数组操作的一系列常用扩展函数
    //过滤数组
    it('filter', () => {
        var array = [10, 9, 53, 7, 25, 45];
        var newArray = ArrayExt.filter(array, (val, i, array) => {
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