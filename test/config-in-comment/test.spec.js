/**
 * @file test for config-in-comment
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');
var path = require('path');
var config = require('../../lib/config');
var hinter = require('../../');

describe('do config in comment', function () {
    var filePath = path.join(__dirname, 'case.html');
    var code = fs.readFileSync(filePath, 'utf-8');
    var cfg = config.load(filePath);

    var result = hinter.hint(code, cfg);

    it('should give results', function () {
        expect(Array.isArray(result)).toBe(true);
    });
});
