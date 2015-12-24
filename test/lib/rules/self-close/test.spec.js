/**
 * @file test for rule self-close
 * @author nighca<nighca@live.cn>
 */

var path = require('path');
var htmlcs = require('../../../../');

var rule = path.basename(__dirname);

describe('rule ' + rule, function () {
    var result1 = htmlcs.hintFile(path.join(__dirname, 'case1.html'));
    var result2 = htmlcs.hintFile(path.join(__dirname, 'case2.html'));
    var result3 = htmlcs.hintFile(path.join(__dirname, 'case3.html'));

    /* eslint-disable fecs-max-statements */
    it('should return right result', function () {

        expect(result1.length).toBe(8);

        expect(result1[0].type).toBe('WARN');
        expect(result1[0].code).toBe('039');
        expect(result1[0].line).toBe(4);
        expect(result1[0].column).toBe(1);

        expect(result1[1].type).toBe('WARN');
        expect(result1[1].code).toBe('039');
        expect(result1[1].line).toBe(5);
        expect(result1[1].column).toBe(1);

        expect(result1[2].type).toBe('WARN');
        expect(result1[2].code).toBe('039');
        expect(result1[2].line).toBe(8);
        expect(result1[2].column).toBe(1);

        expect(result1[3].type).toBe('WARN');
        expect(result1[3].code).toBe('039');
        expect(result1[3].line).toBe(9);
        expect(result1[3].column).toBe(1);

        expect(result1[4].type).toBe('WARN');
        expect(result1[4].code).toBe('039');
        expect(result1[4].line).toBe(12);
        expect(result1[4].column).toBe(1);

        expect(result1[5].type).toBe('WARN');
        expect(result1[5].code).toBe('039');
        expect(result1[5].line).toBe(13);
        expect(result1[5].column).toBe(1);

        expect(result1[6].type).toBe('WARN');
        expect(result1[6].code).toBe('039');
        expect(result1[6].line).toBe(16);
        expect(result1[6].column).toBe(1);

        expect(result1[7].type).toBe('WARN');
        expect(result1[7].code).toBe('039');
        expect(result1[7].line).toBe(17);
        expect(result1[7].column).toBe(1);

        expect(result2.length).toBe(8);

        expect(result2[0].type).toBe('WARN');
        expect(result2[0].code).toBe('040');
        expect(result2[0].line).toBe(2);
        expect(result2[0].column).toBe(1);

        expect(result2[1].type).toBe('WARN');
        expect(result2[1].code).toBe('040');
        expect(result2[1].line).toBe(3);
        expect(result2[1].column).toBe(1);

        expect(result2[2].type).toBe('WARN');
        expect(result2[2].code).toBe('040');
        expect(result2[2].line).toBe(6);
        expect(result2[2].column).toBe(1);

        expect(result2[3].type).toBe('WARN');
        expect(result2[3].code).toBe('040');
        expect(result2[3].line).toBe(7);
        expect(result2[3].column).toBe(1);

        expect(result2[4].type).toBe('WARN');
        expect(result2[4].code).toBe('040');
        expect(result2[4].line).toBe(10);
        expect(result2[4].column).toBe(1);

        expect(result2[5].type).toBe('WARN');
        expect(result2[5].code).toBe('040');
        expect(result2[5].line).toBe(11);
        expect(result2[5].column).toBe(1);

        expect(result2[6].type).toBe('WARN');
        expect(result2[6].code).toBe('040');
        expect(result2[6].line).toBe(14);
        expect(result2[6].column).toBe(1);

        expect(result2[7].type).toBe('WARN');
        expect(result2[7].code).toBe('040');
        expect(result2[7].line).toBe(15);
        expect(result2[7].column).toBe(1);

        expect(result3.length).toBe(0);
    });
});
