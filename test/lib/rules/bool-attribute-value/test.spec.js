var path = require('path');
var hinter = require('../../../../');

var rule = path.basename(__dirname);

describe('rule ' + rule, function () {
    var result = hinter.hintFile(path.join(__dirname, 'case.html'));

    it('should return right result', function () {
        expect(result.length).toBe(6);

        expect(result[0].type).toBe('WARN');
        expect(result[0].pos.line).toBe(11);
        expect(result[0].pos.col).toBe(5);

        expect(result[1].type).toBe('WARN');
        expect(result[1].pos.line).toBe(13);
        expect(result[1].pos.col).toBe(5);

        expect(result[2].type).toBe('WARN');
        expect(result[2].pos.line).toBe(15);
        expect(result[2].pos.col).toBe(5);

        expect(result[3].type).toBe('WARN');
        expect(result[3].pos.line).toBe(17);
        expect(result[3].pos.col).toBe(5);

        expect(result[4].type).toBe('WARN');
        expect(result[4].pos.line).toBe(19);
        expect(result[4].pos.col).toBe(5);

        expect(result[5].type).toBe('WARN');
        expect(result[5].pos.line).toBe(21);
        expect(result[5].pos.col).toBe(5);
    });
});
