/**
 * @file test for label-for-input
 * @author chris<wfsr@foxmail.com>
 */

var path = require('path');
var htmlcs = require('../../../../');

var rule = path.basename(__dirname);

describe('hint rule ' + rule, function () {

    it('should return the right result', function () {
        var result = htmlcs.hintFile(path.join(__dirname, 'case.html'));
        expect(result.length).toBe(2);

        expect(result[0].type).toBe('WARN');
        expect(result[0].code).toBe('044');
        expect(result[0].line).toBe(8);
        expect(result[0].column).toBe(5);

        expect(result[1].type).toBe('WARN');
        expect(result[1].code).toBe('044');
        expect(result[1].line).toBe(10);
        expect(result[1].column).toBe(5);
    });
});
