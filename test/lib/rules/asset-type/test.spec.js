/**
 * @file test for rule asset-type
 * @author nighca<nighca@live.cn>
 */

var path = require('path');
var htmlcs = require('../../../../');
var parse = require('../../../../lib/parse');

var rule = path.basename(__dirname);

describe('hint rule ' + rule, function () {
    var result = htmlcs.hintFile(path.join(__dirname, 'case.html'));

    it('should return right result', function () {
        expect(result.length).toBe(3);

        expect(result[0].type).toBe('WARN');
        expect(result[0].code).toBe('001');
        expect(result[0].line).toBe(11);
        expect(result[0].column).toBe(5);

        expect(result[1].type).toBe('WARN');
        expect(result[1].code).toBe('001');
        expect(result[1].line).toBe(13);
        expect(result[1].column).toBe(5);

        expect(result[2].type).toBe('WARN');
        expect(result[2].code).toBe('002');
        expect(result[2].line).toBe(16);
        expect(result[2].column).toBe(5);
    });
});

describe('format rule ' + rule, function () {
    var result = htmlcs.formatFile(path.join(__dirname, 'case.html'));

    var document = parse(result);

    var links = document.querySelectorAll('link');
    var styles = document.querySelectorAll('style');
    var scripts = document.querySelectorAll('script');

    it('should format well', function () {
        expect(links[0].hasAttribute('type')).toBe(false);
        expect(links[1].hasAttribute('type')).toBe(false);
        expect(styles[0].hasAttribute('type')).toBe(false);
        expect(styles[1].hasAttribute('type')).toBe(false);
        expect(scripts[0].hasAttribute('type')).toBe(false);
        expect(scripts[1].getAttribute('type')).toBe('text/plain');
        expect(scripts[2].hasAttribute('type')).toBe(false);
    });
});
