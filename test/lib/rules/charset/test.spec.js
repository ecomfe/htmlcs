var path = require('path');
var hinter = require('../../../../');

var rule = path.basename(__dirname);

describe('rule ' + rule, function () {
    var result1 = hinter.hintFile(path.join(__dirname, 'case1.html'));
    var result2 = hinter.hintFile(path.join(__dirname, 'case2.html'));
    var result3 = hinter.hintFile(path.join(__dirname, 'case3.html'));
    var result4 = hinter.hintFile(path.join(__dirname, 'case4.html'));
    var result5 = hinter.hintFile(path.join(__dirname, 'case5.html'));

    it('should return right result', function () {
        expect(result1.length).toBe(1);
        expect(result1[0].type).toBe('WARN');
        expect(result1[0].rule).toBe('006');
        expect(result1[0].line).toBe(3);
        expect(result1[0].col).toBe(1);

        expect(result2.length).toBe(1);
        expect(result2[0].type).toBe('WARN');
        expect(result2[0].rule).toBe('007');
        expect(result2[0].line).toBe(5);
        expect(result2[0].col).toBe(5);

        expect(result3.length).toBe(1);
        expect(result3[0].type).toBe('WARN');
        expect(result3[0].rule).toBe('006');
        expect(result3[0].line).toBe(3);
        expect(result3[0].col).toBe(1);

        expect(result4.length).toBe(0);
        expect(result5.length).toBe(0);
    });
});
