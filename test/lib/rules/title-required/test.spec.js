/**
 * @file test for rule title-required
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
    var result6 = htmlcs.hintFile(path.join(__dirname, 'case6.html'));

    it('should return right result', function () {
        expect(result1.length).toBe(1);
        expect(result1[0].type).toBe('WARN');
        expect(result1[0].code).toBe('024');
        expect(result1[0].line).toBe(3);
        expect(result1[0].col).toBe(1);

        expect(result2.length).toBe(1);
        expect(result2[0].type).toBe('WARN');
        expect(result2[0].code).toBe('024');
        expect(result2[0].line).toBe(3);
        expect(result2[0].col).toBe(1);

        expect(result3.length).toBe(1);
        expect(result3[0].type).toBe('WARN');
        expect(result3[0].code).toBe('025');
        expect(result3[0].line).toBe(6);
        expect(result3[0].col).toBe(5);

        expect(result4.length).toBe(1);
        expect(result4[0].type).toBe('WARN');
        expect(result4[0].code).toBe('025');
        expect(result4[0].line).toBe(4);
        expect(result4[0].col).toBe(5);

        expect(result5.length).toBe(0);
        expect(result6.length).toBe(0);
    });
});

describe('format rule ' + rule, function () {
    var head1 = parse(htmlcs.formatFile(path.join(__dirname, 'case1.html'))).querySelector('head');
    var head2 = parse(htmlcs.formatFile(path.join(__dirname, 'case2.html'))).querySelector('head');
    var head3 = parse(htmlcs.formatFile(path.join(__dirname, 'case3.html'))).querySelector('head');
    var head4 = parse(htmlcs.formatFile(path.join(__dirname, 'case4.html'))).querySelector('head');
    var head5 = parse(htmlcs.formatFile(path.join(__dirname, 'case5.html'))).querySelector('head');

    it('should format well', function () {
        var title;
        var charsetMeta;

        title = head1.querySelector('title');
        charsetMeta = head1.querySelector('meta[charset]');
        expect(title.previousElementSibling).toBe(charsetMeta);

        title = head2.querySelector('title');
        charsetMeta = head2.querySelector('meta[charset]');
        expect(title.previousElementSibling).toBe(charsetMeta);

        title = head3.querySelector('title');
        charsetMeta = head3.querySelector('meta[charset]');
        expect(title.previousElementSibling).toBe(charsetMeta);

        title = head4.querySelector('title');
        charsetMeta = head4.querySelector('meta[charset]');
        expect(title.previousElementSibling).toBe(charsetMeta);

        expect(!head5).toBe(true);
    });
});
