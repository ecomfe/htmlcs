var assert = require('assert');

var path = require('path');
var hinter = require('../../../../');

var rule = path.basename(__dirname);

describe('rule ' + rule, function () {
    var result = hinter.hintFile(path.join(__dirname, 'case.html'));

    it('should return right result', function () {
        assert.equal(7, result.length);

        assert.equal('WARN', result[0].type);
        assert.equal(10, result[0].pos.line);
        assert.equal(5, result[0].pos.col);

        assert.equal('WARN', result[1].type);
        assert.equal(11, result[1].pos.line);
        assert.equal(5, result[1].pos.col);

        assert.equal('WARN', result[2].type);
        assert.equal(12, result[2].pos.line);
        assert.equal(5, result[2].pos.col);

        assert.equal('WARN', result[3].type);
        assert.equal(13, result[3].pos.line);
        assert.equal(5, result[3].pos.col);

        assert.equal('WARN', result[4].type);
        assert.equal(14, result[4].pos.line);
        assert.equal(5, result[4].pos.col);

        assert.equal('WARN', result[5].type);
        assert.equal(15, result[5].pos.line);
        assert.equal(5, result[5].pos.col);

        assert.equal('WARN', result[6].type);
        assert.equal(16, result[6].pos.line);
        assert.equal(5, result[6].pos.col);
    });
});
