/**
 * @file test for config max-error
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');
var path = require('path');
var config = require('../../lib/config');
var hinter = require('../../');

describe('config max-error', function () {
    var filePath = path.join(__dirname, 'case.html');
    var code = fs.readFileSync(filePath, 'utf-8');
    var cfg = config.load(filePath);

    var result = hinter.hint(code, cfg);

    cfg['max-error'] = 0;
    var result0 = hinter.hint(code, cfg);

    cfg['max-error'] = 5;
    var result5 = hinter.hint(code, cfg);

    cfg['max-error'] = 10;
    var result10 = hinter.hint(code, cfg);

    it('should return right result with given num', function () {
        expect(result5.length).toBe(5);
        expect(result10.length).toBe(10);
    });

    it('should take 0 as no limit', function () {
        expect(result0.length).toBe(result.length);
    });
});
