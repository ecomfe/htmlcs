var assert = require('assert');

var path = require('path');
var hinter = require('../../../../');

var rule = path.basename(__dirname);

describe('rule ' + rule, function () {
    var result = hinter.hintFile(path.join(__dirname, 'case.html'));

    it('should return right result', function () {
        assert.equal(1, result.length);

        assert.equal('WARN', result[0].type);
        assert.equal(11, result[0].pos.line);
        assert.equal(5, result[0].pos.col);
    });
});
