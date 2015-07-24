/**
 * @file test for id-class-ad-disabled
 * @author nighca<nighca@live.cn>
 */

var path = require('path');
var htmlcs = require('../../../../');

var rule = path.basename(__dirname);

describe('hint rule ' + rule, function () {
    var result1 = htmlcs.hintFile(path.join(__dirname, 'case1.html'));
    var result2 = htmlcs.hintFile(path.join(__dirname, 'case2.html'));

    it('should return right result (use ["ad"] as default)', function () {
        expect(result1.length).toBe(4);

        expect(result1[0].type).toBe('WARN');
        expect(result1[0].code).toBe('031');
        expect(result1[0].line).toBe(11);
        expect(result1[0].col).toBe(14);

        expect(result1[1].type).toBe('WARN');
        expect(result1[1].code).toBe('031');
        expect(result1[1].line).toBe(12);
        expect(result1[1].col).toBe(14);

        expect(result1[2].type).toBe('WARN');
        expect(result1[2].code).toBe('031');
        expect(result1[2].line).toBe(13);
        expect(result1[2].col).toBe(17);

        expect(result1[3].type).toBe('WARN');
        expect(result1[3].code).toBe('031');
        expect(result1[3].line).toBe(14);
        expect(result1[3].col).toBe(17);
    });

    it('should be configable', function () {
        expect(result2.length).toBe(4);

        expect(result2[0].type).toBe('WARN');
        expect(result2[0].code).toBe('031');
        expect(result2[0].line).toBe(12);
        expect(result2[0].col).toBe(14);

        expect(result2[1].type).toBe('WARN');
        expect(result2[1].code).toBe('031');
        expect(result2[1].line).toBe(13);
        expect(result2[1].col).toBe(14);

        expect(result2[2].type).toBe('WARN');
        expect(result2[2].code).toBe('031');
        expect(result2[2].line).toBe(14);
        expect(result2[2].col).toBe(17);

        expect(result2[3].type).toBe('WARN');
        expect(result2[3].code).toBe('031');
        expect(result2[3].line).toBe(15);
        expect(result2[3].col).toBe(17);
    });
});
