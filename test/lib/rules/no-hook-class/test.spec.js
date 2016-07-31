/**
 * @file test for no-hook-class
 * @author chris<wfsr@foxmail.com>
 */

var path = require('path');
var hinter = require('../../../../');

var rule = path.basename(__dirname);

describe('rule ' + rule, function () {
    var result = hinter.hintFile(path.join(__dirname, 'case.html'));

    it('should return right result', function () {
        expect(result.length).toBe(4);

        expect(result[0].type).toBe('WARN');
        expect(result[0].code).toBe('047');
        expect(result[0].line).toBe(11);
        expect(result[0].column).toBe(13);

        expect(result[1].type).toBe('WARN');
        expect(result[1].code).toBe('047');
        expect(result[1].line).toBe(18);
        expect(result[1].column).toBe(15);

        expect(result[2].type).toBe('WARN');
        expect(result[2].code).toBe('047');
        expect(result[2].line).toBe(21);
        expect(result[2].column).toBe(11);

        expect(result[3].type).toBe('WARN');
        expect(result[3].code).toBe('047');
        expect(result[3].line).toBe(28);
        expect(result[3].column).toBe(14);
    });
});
