var assert = require('assert');

var path = require('path');
var hinter = require('../../../');

var rule = path.basename(__dirname);

describe('rule ' + rule, function () {
    var result1 = hinter.hintFile(path.join(__dirname, 'case1.html'));
    var result2 = hinter.hintFile(path.join(__dirname, 'case2.html'));
    var result3 = hinter.hintFile(path.join(__dirname, 'case3.html'));

    it('should return right result', function () {
        assert.equal(1, result1.length);

        assert.equal('WARN', result1[0].type);
        assert.equal(3, result1[0].pos.line);
        assert.equal(1, result1[0].pos.col);

        assert.equal(0, result2.length);
        assert.equal(0, result3.length);
    });
});
