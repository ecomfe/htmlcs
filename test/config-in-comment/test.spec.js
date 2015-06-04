/**
 * @file test for config-in-comment
 * @author nighca<nighca@live.cn>
 */

var path = require('path');
var htmlcs = require('../../');

describe('do config in comment', function () {
    var result1 = htmlcs.hintFile(path.join(__dirname, 'case1.html'));
    var result2 = htmlcs.hintFile(path.join(__dirname, 'case2.html'));
    var result3 = htmlcs.hintFile(path.join(__dirname, 'case3.html'));
    var result4 = htmlcs.hintFile(path.join(__dirname, 'case4.html'));
    var result5 = htmlcs.hintFile(path.join(__dirname, 'case5.html'));
    var result6 = htmlcs.hintFile(path.join(__dirname, 'case6.html'));
    var result7 = htmlcs.hintFile(path.join(__dirname, 'case7.html'));
    var result8 = htmlcs.hintFile(path.join(__dirname, 'case8.html'));
    var result9 = htmlcs.hintFile(path.join(__dirname, 'case9.html'));
    var result10 = htmlcs.hintFile(path.join(__dirname, 'case10.html'));

    it('should return right result while do disable', function () {
        expect(result1.length).toBe(0);

        expect(result2.length).toBe(2);
        expect(result2[0].type).toBe('WARN');
        expect(result2[0].code).toBe('013');
        expect(result2[0].line).toBe(2);
        expect(result2[0].col).toBe(1);
        expect(result2[1].type).toBe('WARN');
        expect(result2[1].code).toBe('028');
        expect(result2[1].line).toBe(5);
        expect(result2[1].col).toBe(25);

        expect(result3.length).toBe(1);
        expect(result3[0].type).toBe('WARN');
        expect(result3[0].code).toBe('013');
        expect(result3[0].line).toBe(2);
        expect(result3[0].col).toBe(1);
    });

    it('should return right result while do enable', function () {
        expect(result4.length).toBe(4);
        expect(result4[0].type).toBe('WARN');
        expect(result4[0].code).toBe('012');
        expect(result4[0].line).toBe(3);
        expect(result4[0].col).toBe(1);
        expect(result4[1].type).toBe('WARN');
        expect(result4[1].code).toBe('013');
        expect(result4[1].line).toBe(3);
        expect(result4[1].col).toBe(1);
        expect(result4[2].type).toBe('WARN');
        expect(result4[2].code).toBe('012');
        expect(result4[2].line).toBe(4);
        expect(result4[2].col).toBe(1);
        expect(result4[3].type).toBe('WARN');
        expect(result4[3].code).toBe('028');
        expect(result4[3].line).toBe(6);
        expect(result4[3].col).toBe(25);

        expect(result5.length).toBe(2);
        expect(result5[0].type).toBe('WARN');
        expect(result5[0].code).toBe('012');
        expect(result5[0].line).toBe(3);
        expect(result5[0].col).toBe(1);
        expect(result5[1].type).toBe('WARN');
        expect(result5[1].code).toBe('012');
        expect(result5[1].line).toBe(4);
        expect(result5[1].col).toBe(1);

        expect(result6.length).toBe(3);
        expect(result6[0].type).toBe('WARN');
        expect(result6[0].code).toBe('012');
        expect(result6[0].line).toBe(3);
        expect(result6[0].col).toBe(1);
        expect(result6[1].type).toBe('WARN');
        expect(result6[1].code).toBe('012');
        expect(result6[1].line).toBe(4);
        expect(result6[1].col).toBe(1);
        expect(result6[2].type).toBe('WARN');
        expect(result6[2].code).toBe('028');
        expect(result6[2].line).toBe(6);
        expect(result6[2].col).toBe(25);
    });

    it('should return right result while do config', function () {
        expect(result7.length).toBe(2);
        expect(result7[0].type).toBe('WARN');
        expect(result7[0].code).toBe('013');
        expect(result7[0].line).toBe(2);
        expect(result7[0].col).toBe(1);
        expect(result7[1].type).toBe('WARN');
        expect(result7[1].code).toBe('028');
        expect(result7[1].line).toBe(5);
        expect(result7[1].col).toBe(25);

        expect(result8.length).toBe(1);
        expect(result8[0].type).toBe('WARN');
        expect(result8[0].code).toBe('013');
        expect(result8[0].line).toBe(3);
        expect(result8[0].col).toBe(1);

        expect(result9.length).toBe(4);
        expect(result9[0].type).toBe('WARN');
        expect(result9[0].code).toBe('012');
        expect(result9[0].line).toBe(3);
        expect(result9[0].col).toBe(1);
        expect(result9[1].type).toBe('WARN');
        expect(result9[1].code).toBe('013');
        expect(result9[1].line).toBe(3);
        expect(result9[1].col).toBe(1);
        expect(result9[2].type).toBe('WARN');
        expect(result9[2].code).toBe('012');
        expect(result9[2].line).toBe(4);
        expect(result9[2].col).toBe(1);
        expect(result9[3].type).toBe('WARN');
        expect(result9[3].code).toBe('028');
        expect(result9[3].line).toBe(6);
        expect(result9[3].col).toBe(25);

        expect(result10.length).toBe(4);
        expect(result10[0].type).toBe('WARN');
        expect(result10[0].code).toBe('015');
        expect(result10[0].line).toBe(3);
        expect(result10[0].col).toBe(1);
        expect(result10[1].type).toBe('WARN');
        expect(result10[1].code).toBe('015');
        expect(result10[1].line).toBe(4);
        expect(result10[1].col).toBe(1);
        expect(result10[2].type).toBe('WARN');
        expect(result10[2].code).toBe('015');
        expect(result10[2].line).toBe(5);
        expect(result10[2].col).toBe(1);
        expect(result10[3].type).toBe('WARN');
        expect(result10[3].code).toBe('015');
        expect(result10[3].line).toBe(6);
        expect(result10[3].col).toBe(1);
    });
});
