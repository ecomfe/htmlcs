/**
 * @file test for no-duplication-id-and-name
 * @author chris<wfsr@foxmail.com>
 */

var path = require('path');
var hinter = require('../../../../');

var rule = path.basename(__dirname);

describe('rule ' + rule, function () {

    it('no bom should be all right', function () {
        var result = hinter.hintFile(path.join(__dirname, 'case-no-bom.html'));
        expect(result.length).toBe(0);
    });

    it('with bom should be warning', function () {
        var result = hinter.hintFile(path.join(__dirname, 'case-with-bom.html'));
        expect(result.length).toBe(1);

        expect(result[0].type).toBe('WARN');
        expect(result[0].code).toBe('046');
        expect(result[0].line).toBe(1);
        expect(result[0].column).toBe(1);
    });
});
