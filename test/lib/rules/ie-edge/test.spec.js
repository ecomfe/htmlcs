/**
 * @file test for rule ie-edge
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
        expect(result1[0].code).toBe('011');
        expect(result1[0].line).toBe(3);
        expect(result1[0].column).toBe(1);

        expect(result2.length).toBe(0);
        expect(result3.length).toBe(0);

        expect(result4[0].type).toBe('WARN');
        expect(result4[0].code).toBe('011');
        expect(result4[0].line).toBe(3);
        expect(result4[0].column).toBe(1);
    });
});

describe('format rule ' + rule, function () {
    var head1 = parse(htmlcs.formatFile(path.join(__dirname, 'case1.html'))).querySelector('head');
    var head2 = parse(htmlcs.formatFile(path.join(__dirname, 'case2.html'))).querySelector('head');
    var head4 = parse(htmlcs.formatFile(path.join(__dirname, 'case4.html'))).querySelector('head');

    it('should format well', function () {
        expect(head1.querySelector('meta[http-equiv="X-UA-Compatible"]').getAttribute('content')).toBe('IE=Edge');
        expect(!head2).toBe(true);
        expect(head4.querySelector('meta[http-equiv="X-UA-Compatible"]').getAttribute('content')).toBe('IE=Edge');
    });
});
