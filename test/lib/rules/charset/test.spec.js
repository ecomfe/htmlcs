/**
 * @file test for rule charset
 * @author nighca<nighca@live.cn>
 */

var path = require('path');
var htmlcs = require('../../../../');
var parse = require('../../../../lib/parse');

var rule = path.basename(__dirname);

describe('rule ' + rule, function () {
    var result1 = htmlcs.hintFile(path.join(__dirname, 'case1.html'));
    var result2 = htmlcs.hintFile(path.join(__dirname, 'case2.html'));
    var result3 = htmlcs.hintFile(path.join(__dirname, 'case3.html'));
    var result4 = htmlcs.hintFile(path.join(__dirname, 'case4.html'));
    var result5 = htmlcs.hintFile(path.join(__dirname, 'case5.html'));

    it('should return right result', function () {
        expect(result1.length).toBe(1);
        expect(result1[0].type).toBe('WARN');
        expect(result1[0].code).toBe('006');
        expect(result1[0].line).toBe(3);
        expect(result1[0].column).toBe(1);

        expect(result2.length).toBe(1);
        expect(result2[0].type).toBe('WARN');
        expect(result2[0].code).toBe('007');
        expect(result2[0].line).toBe(5);
        expect(result2[0].column).toBe(5);

        expect(result3.length).toBe(1);
        expect(result3[0].type).toBe('WARN');
        expect(result3[0].code).toBe('006');
        expect(result3[0].line).toBe(3);
        expect(result3[0].column).toBe(1);

        expect(result4.length).toBe(0);
        expect(result5.length).toBe(0);
    });
});

describe('format rule ' + rule, function () {
    var result1 = htmlcs.formatFile(path.join(__dirname, 'case1.html'));
    var head1 = parse(result1).querySelector('head');
    var charset1 = head1.querySelector('meta[charset]');

    var result2 = htmlcs.formatFile(path.join(__dirname, 'case2.html'));
    var head2 = parse(result2).querySelector('head');
    var charset2 = head2.querySelector('meta[charset]');

    var result3 = htmlcs.formatFile(path.join(__dirname, 'case3.html'));
    var head3 = parse(result3).querySelector('head');
    var charset3 = head3.querySelector('meta[charset]');

    var result5 = htmlcs.formatFile(path.join(__dirname, 'case5.html'));
    var head5 = parse(result5).querySelector('head');
    var charset5 = head5.querySelector('meta[charset]');

    var result6 = htmlcs.formatFile(path.join(__dirname, 'case6.html'));
    var head6 = parse(result6).querySelector('head');
    var charset6 = head6.querySelector('meta[charset]');

    it('should format well', function () {
        expect(!!charset1).toBe(true);
        expect(charset1 === head1.firstElementChild).toBe(true);

        expect(!!charset2).toBe(true);
        expect(charset2 === head2.firstElementChild).toBe(true);

        expect(!!charset3).toBe(true);
        expect(charset3 === head3.firstElementChild).toBe(true);

        expect(!!charset5).toBe(true);
        expect(charset5 === head5.firstElementChild).toBe(true);

        expect(!!charset6).toBe(true);
        expect(charset6 === head6.firstElementChild).toBe(true);
    });
});
