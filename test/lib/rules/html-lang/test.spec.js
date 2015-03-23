/**
 * @file test for rule html-lang
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

    it('should return right result', function () {
        expect(result1.length).toBe(1);

        expect(result1[0].type).toBe('WARN');
        expect(result1[0].code).toBe('010');
        expect(result1[0].line).toBe(2);
        expect(result1[0].col).toBe(1);

        expect(result2.length).toBe(0);
        expect(result3.length).toBe(0);
    });
});

describe('format rule ' + rule, function () {
    var html1 = parse(htmlcs.formatFile(path.join(__dirname, 'case1.html'))).querySelector('html');
    var html2 = parse(htmlcs.formatFile(path.join(__dirname, 'case2.html'))).querySelector('html');

    it('should format well', function () {
        expect(html1.getAttribute('lang')).toBe('zh-cmn-Hans');
        expect(!html2).toBe(true);
    });
});
