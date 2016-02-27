/**
 * @file test for indent-char
 * @author nighca<nighca@live.cn>
 */

var path = require('path');
var htmlcs = require('../../../../');

var rule = path.basename(__dirname);

describe('hint rule ' + rule, function () {
    var result1 = htmlcs.hintFile(path.join(__dirname, 'case1.html'));
    var result2 = htmlcs.hintFile(path.join(__dirname, 'case2.html'));
    var result3 = htmlcs.hintFile(path.join(__dirname, 'case3.html'));
    var result4 = htmlcs.hintFile(path.join(__dirname, 'case4.html'));
    var result5 = htmlcs.hintFile(path.join(__dirname, 'case5.html'));

    it('should return right result for space-4', function () {
        expect(result1.length).toBe(4);

        expect(result1[0].type).toBe('WARN');
        expect(result1[0].code).toBe('032');
        expect(result1[0].line).toBe(5);
        expect(result1[0].column).toBe(1);

        expect(result1[1].type).toBe('WARN');
        expect(result1[1].code).toBe('032');
        expect(result1[1].line).toBe(6);
        expect(result1[1].column).toBe(1);

        expect(result1[2].type).toBe('WARN');
        expect(result1[2].code).toBe('032');
        expect(result1[2].line).toBe(7);
        expect(result1[2].column).toBe(1);

        expect(result1[3].type).toBe('WARN');
        expect(result1[3].code).toBe('032');
        expect(result1[3].line).toBe(8);
        expect(result1[3].column).toBe(1);
    });

    it('should return right result for space-2', function () {
        expect(result2.length).toBe(3);

        expect(result2[0].type).toBe('WARN');
        expect(result2[0].code).toBe('032');
        expect(result2[0].line).toBe(6);
        expect(result2[0].column).toBe(1);

        expect(result2[1].type).toBe('WARN');
        expect(result2[1].code).toBe('032');
        expect(result2[1].line).toBe(7);
        expect(result2[1].column).toBe(1);

        expect(result2[2].type).toBe('WARN');
        expect(result2[2].code).toBe('032');
        expect(result2[2].line).toBe(8);
        expect(result2[2].column).toBe(1);
    });

    it('should return right result for tab', function () {
        expect(result3.length).toBe(6);

        expect(result3[0].type).toBe('WARN');
        expect(result3[0].code).toBe('032');
        expect(result3[0].line).toBe(3);
        expect(result3[0].column).toBe(1);

        expect(result3[1].type).toBe('WARN');
        expect(result3[1].code).toBe('032');
        expect(result3[1].line).toBe(4);
        expect(result3[1].column).toBe(1);

        expect(result3[2].type).toBe('WARN');
        expect(result3[2].code).toBe('032');
        expect(result3[2].line).toBe(5);
        expect(result3[2].column).toBe(1);

        expect(result3[3].type).toBe('WARN');
        expect(result3[3].code).toBe('032');
        expect(result3[3].line).toBe(6);
        expect(result3[3].column).toBe(1);

        expect(result3[4].type).toBe('WARN');
        expect(result3[4].code).toBe('032');
        expect(result3[4].line).toBe(7);
        expect(result3[4].column).toBe(1);

        expect(result3[5].type).toBe('WARN');
        expect(result3[5].code).toBe('032');
        expect(result3[5].line).toBe(14);
        expect(result3[5].column).toBe(1);
    });

    it('should use space-4 as default', function () {
        expect(result4.length).toBe(4);

        expect(result4[0].type).toBe('WARN');
        expect(result4[0].code).toBe('032');
        expect(result4[0].line).toBe(5);
        expect(result4[0].column).toBe(1);

        expect(result4[1].type).toBe('WARN');
        expect(result4[1].code).toBe('032');
        expect(result4[1].line).toBe(6);
        expect(result4[1].column).toBe(1);

        expect(result4[2].type).toBe('WARN');
        expect(result4[2].code).toBe('032');
        expect(result4[2].line).toBe(7);
        expect(result4[2].column).toBe(1);

        expect(result4[3].type).toBe('WARN');
        expect(result4[3].code).toBe('032');
        expect(result4[3].line).toBe(8);
        expect(result4[3].column).toBe(1);
    });

    it('should not check content of script / style', function () {
        expect(result5.length).toBe(0);
    });

    var formatted1 = htmlcs.formatFile(path.join(__dirname, 'case1.html'));
    var formatted2 = htmlcs.formatFile(path.join(__dirname, 'case2.html'));
    var formatted3 = htmlcs.formatFile(path.join(__dirname, 'case3.html'));
    var formatted4 = htmlcs.formatFile(path.join(__dirname, 'case4.html'));
    var formatted5 = htmlcs.formatFile(path.join(__dirname, 'case5.html'));

    it('should format correctly', function () {
        expect(typeof formatted1).toBe('string');
        expect(typeof formatted2).toBe('string');
        expect(typeof formatted3).toBe('string');
        expect(typeof formatted4).toBe('string');
        expect(typeof formatted5).toBe('string');
    });

});
