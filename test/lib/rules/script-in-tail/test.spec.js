/**
 * @file test for rule script-in-tail
 * @author nighca<nighca@live.cn>
 */

var path = require('path');
var hinter = require('../../../../');

var rule = path.basename(__dirname);

describe('rule ' + rule, function () {
    var result = hinter.hintFile(path.join(__dirname, 'case.html'));

    it('should return right result', function () {
        expect(result.length).toBe(6);

        expect(result[0].type).toBe('WARN');
        expect(result[0].code).toBe('023');
        expect(result[0].line).toBe(8);
        expect(result[0].column).toBe(5);

        expect(result[1].type).toBe('WARN');
        expect(result[1].code).toBe('023');
        expect(result[1].line).toBe(9);
        expect(result[1].column).toBe(5);

        expect(result[2].type).toBe('WARN');
        expect(result[2].code).toBe('023');
        expect(result[2].line).toBe(14);
        expect(result[2].column).toBe(5);

        expect(result[3].type).toBe('WARN');
        expect(result[3].code).toBe('023');
        expect(result[3].line).toBe(15);
        expect(result[3].column).toBe(5);

        expect(result[4].type).toBe('WARN');
        expect(result[4].code).toBe('023');
        expect(result[4].line).toBe(20);
        expect(result[4].column).toBe(9);

        expect(result[5].type).toBe('WARN');
        expect(result[5].code).toBe('023');
        expect(result[5].line).toBe(21);
        expect(result[5].column).toBe(9);
    });
});
