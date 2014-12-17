var path = require('path');
var hinter = require('../../../../');

var rule = path.basename(__dirname);

describe('rule ' + rule, function () {
    var result = hinter.hintFile(path.join(__dirname, 'case.html'));

    it('should return right result', function () {
        expect(result.length).toBe(1);

        expect(result[0].type).toBe('WARN');
        expect(result[0].rule).toBe('013');
        expect(result[0].line).toBe(11);
        expect(result[0].col).toBe(5);
    });
});
