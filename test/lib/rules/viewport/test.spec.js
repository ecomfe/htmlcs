/**
 * @file test for rule viewport
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

    it('should return right result', function () {
        expect(result1.length).toBe(1);
        expect(result1[0].type).toBe('WARN');
        expect(result1[0].code).toBe('027');
        expect(result1[0].line).toBe(3);
        expect(result1[0].col).toBe(1);

        expect(result2.length).toBe(1);
        expect(result2[0].type).toBe('WARN');
        expect(result2[0].code).toBe('027');
        expect(result2[0].line).toBe(3);
        expect(result2[0].col).toBe(1);

        expect(result3.length).toBe(0);
        expect(result4.length).toBe(0);
    });
});

describe('format rule ' + rule, function () {
    var head1 = parse(htmlcs.formatFile(path.join(__dirname, 'case1.html'))).querySelector('head');
    var head2 = parse(htmlcs.formatFile(path.join(__dirname, 'case2.html'))).querySelector('head');
    var head3 = parse(htmlcs.formatFile(path.join(__dirname, 'case3.html'))).querySelector('head');

    it('should format well', function () {
        expect(!!head1.querySelector('meta[name="viewport"]')).toBe(true);
        expect(!!head2.querySelector('meta[name="viewport"]')).toBe(true);
        expect(!head3).toBe(true);
    });
});
