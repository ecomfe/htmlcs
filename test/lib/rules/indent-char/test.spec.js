/**
 * @file test for indent-char
 * @author nighca<nighca@live.cn>
 */

var path = require('path');
var htmlcs = require('../../../../');

var rule = path.basename(__dirname);

describe('hint rule ' + rule, function () {

    it('should return right result for space-4', function () {
        var result1 = htmlcs.hintFile(path.join(__dirname, 'case1.html'));

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
        var result2 = htmlcs.hintFile(path.join(__dirname, 'case2.html'));

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
        var result3 = htmlcs.hintFile(path.join(__dirname, 'case3.html'));

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
        var result4 = htmlcs.hintFile(path.join(__dirname, 'case4.html'));

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
        var result5 = htmlcs.hintFile(path.join(__dirname, 'case5.html'));

        expect(result5.length).toBe(0);
    });

    it('should format correctly for space-4', function () {
        var formatted1 = htmlcs.formatFile(path.join(__dirname, 'case1.html'));

        expect(typeof formatted1).toBe('string');
    });

    it('should format correctly for space-2', function () {
        var formatted2 = htmlcs.formatFile(path.join(__dirname, 'case2.html'));

        expect(typeof formatted2).toBe('string');
    });

    it('should format correctly for tab', function () {
        var formatted3 = htmlcs.formatFile(path.join(__dirname, 'case3.html'));

        expect(typeof formatted3).toBe('string');
    });

    it('should format correctly for default config', function () {
        var formatted4 = htmlcs.formatFile(path.join(__dirname, 'case4.html'));

        expect(typeof formatted4).toBe('string');
    });

    it('should format correctly for content of script / style', function () {
        var formatted5 = htmlcs.formatFile(path.join(__dirname, 'case5.html'));

        expect(typeof formatted5).toBe('string');
    });

});
