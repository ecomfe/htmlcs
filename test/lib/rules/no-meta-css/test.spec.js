/**
 * @file test for no-meta-css
 * @author chris<wfsr@foxmail.com>
 */

var path = require('path');
var hinter = require('../../../../');

var rule = path.basename(__dirname);

describe('rule ' + rule, function () {
    var result = hinter.hintFile(path.join(__dirname, 'case.html'));

    it('should return right result', function () {
        expect(result.length).toBe(9);

        expect(result[0].type).toBe('WARN');
        expect(result[0].code).toBe('045');
        expect(result[0].line).toBe(11);
        expect(result[0].column).toBe(13);

        expect(result[1].type).toBe('WARN');
        expect(result[1].code).toBe('045');
        expect(result[1].line).toBe(11);
        expect(result[1].column).toBe(13);

        expect(result[4].type).toBe('WARN');
        expect(result[4].code).toBe('045');
        expect(result[4].line).toBe(15);
        expect(result[4].column).toBe(13);

        expect(result[5].type).toBe('WARN');
        expect(result[5].code).toBe('045');
        expect(result[5].line).toBe(16);
        expect(result[5].column).toBe(15);

        expect(result[8].type).toBe('WARN');
        expect(result[8].code).toBe('045');
        expect(result[8].line).toBe(26);
        expect(result[8].column).toBe(30);
    });
});
