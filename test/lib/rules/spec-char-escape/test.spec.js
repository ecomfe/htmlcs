/**
 * @file test for spec-char-escape
 * @author nighca<nighca@live.cn>
 */

var path = require('path');
var htmlcs = require('../../../../');

var rule = path.basename(__dirname);

describe('hint rule ' + rule, function () {
    var result = htmlcs.hintFile(path.join(__dirname, 'case.html'));

    it('should return right result', function () {
        expect(result.length).toBe(4);

        expect(result[0].type).toBe('WARN');
        expect(result[0].code).toBe('033');
        expect(result[0].line).toBe(10);
        expect(result[0].column).toBe(14);

        expect(result[1].type).toBe('WARN');
        expect(result[1].code).toBe('033');
        expect(result[1].line).toBe(11);
        expect(result[1].column).toBe(14);

        expect(result[2].type).toBe('WARN');
        expect(result[2].code).toBe('033');
        expect(result[2].line).toBe(12);
        expect(result[2].column).toBe(14);

        expect(result[3].type).toBe('WARN');
        expect(result[3].code).toBe('033');
        expect(result[3].line).toBe(12);
        expect(result[3].column).toBe(19);
    });
});
