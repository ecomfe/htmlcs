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

    it('should return right result', function () {
        expect(result1.length).toBe(1);

        expect(result1[0].type).toBe('WARN');
        expect(result1[0].code).toBe('009');
        expect(result1[0].line).toBe(0);
        expect(result1[0].col).toBe(0);

        expect(result2.length).toBe(0);
    });
});

describe('format rule ' + rule, function () {
    var result = htmlcs.formatFile(path.join(__dirname, 'case1.html'));

    var doctype = parse(result).doctype;

    it('should format well', function () {
        expect(!!doctype).toBe(true);
        expect(doctype.name).toBe('html');
    });
});
