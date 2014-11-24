var assert = require('assert');

var path = require('path');
var hinter = require('../../../');

var rule = path.basename(__dirname);

describe('rule ' + rule, function () {
    var result1 = hinter.hintFile(path.join(__dirname, 'case1.html'));
    var result2 = hinter.hintFile(path.join(__dirname, 'case2.html'));
    var result3 = hinter.hintFile(path.join(__dirname, 'case3.html'));
    var result4 = hinter.hintFile(path.join(__dirname, 'case4.html'));
    var result5 = hinter.hintFile(path.join(__dirname, 'case5.html'));
    var result6 = hinter.hintFile(path.join(__dirname, 'case6.html'));

    it('should return right result', function () {
        assert.equal(1, result1.length);
        assert.equal('WARN', result1[0].type);
        assert.equal(3, result1[0].pos.line);
        assert.equal(1, result1[0].pos.col);

        assert.equal(1, result2.length);
        assert.equal('WARN', result2[0].type);
        assert.equal(3, result2[0].pos.line);
        assert.equal(1, result2[0].pos.col);

        assert.equal(1, result3.length);
        assert.equal('WARN', result3[0].type);
        assert.equal(6, result3[0].pos.line);
        assert.equal(5, result3[0].pos.col);

        assert.equal(1, result4.length);
        assert.equal('WARN', result4[0].type);
        assert.equal(4, result4[0].pos.line);
        assert.equal(5, result4[0].pos.col);

        assert.equal(0, result5.length);
        assert.equal(0, result6.length);
    });
});
