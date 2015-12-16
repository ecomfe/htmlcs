/**
 * @file test for rule doctype
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
        expect(result1[0].code).toBe('009');
        expect(result1[0].line).toBe(1);
        expect(result1[0].column).toBe(1);

        expect(result2.length).toBe(0);

        expect(result3[0].type).toBe('WARN');
        expect(result3[0].code).toBe('041');
        expect(result3[0].line).toBe(1);
        expect(result3[0].column).toBe(1);
    });
});

describe('format rule ' + rule, function () {
    var doctype1 = parse(htmlcs.formatFile(path.join(__dirname, 'case1.html'))).doctype;
    var doctype3 = parse(htmlcs.formatFile(path.join(__dirname, 'case3.html'))).doctype;

    it('should format well', function () {
        expect(!!doctype1).toBe(true);
        expect(doctype1.name).toBe('html');

        expect(!!doctype3).toBe(true);
        expect(doctype3.name).toBe('html');
    });
});
