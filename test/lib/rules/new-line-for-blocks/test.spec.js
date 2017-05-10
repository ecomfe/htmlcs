/**
 * @file test for rule new-line-for-blocks
 * @author Oleg Krivtsov<oleg@webmarketingroi.com.au>
 */

var path = require('path');
var htmlcs = require('../../../../');

var rule = path.basename(__dirname);

describe('hint rule ' + rule, function () {
    var result = htmlcs.hintFile(path.join(__dirname, 'case.html'));

    it('should return right result', function () {
        expect(result.length).toBe(3);

        expect(result[0].type).toBe('WARN');
        expect(result[0].code).toBe('049');
        expect(result[0].line).toBe(17);
        expect(result[0].column).toBe(24);

        expect(result[1].type).toBe('WARN');
        expect(result[1].code).toBe('049');
        expect(result[1].line).toBe(17);
        expect(result[1].column).toBe(24);

        expect(result[2].type).toBe('WARN');
        expect(result[2].code).toBe('049');
        expect(result[2].line).toBe(19);
        expect(result[2].column).toBe(5);

    });
});
