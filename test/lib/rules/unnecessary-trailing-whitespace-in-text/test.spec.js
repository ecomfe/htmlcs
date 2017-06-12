/**
 * @file test for rule no-space-before-tag-end
 * @author Oleg Krivtsov<oleg@webmarketingroi.com.au>
 */

var path = require('path');
var htmlcs = require('../../../../');
var parse = require('../../../../lib/parse');

var rule = path.basename(__dirname);

describe('hint rule ' + rule, function () {
    var result = htmlcs.hintFile(path.join(__dirname, 'case.html'));

    it('should return right result', function () {
        expect(result.length).toBe(2);

        expect(result[0].type).toBe('WARN');
        expect(result[0].code).toBe('052');
        expect(result[0].line).toBe(11);
        expect(result[0].column).toBe(11);

        expect(result[1].type).toBe('WARN');
        expect(result[1].code).toBe('052');
        expect(result[1].line).toBe(12);
        expect(result[1].column).toBe(11);

    });
});

