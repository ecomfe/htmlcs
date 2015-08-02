/**
 * @file test for rule css-in-head
 * @author nighca<nighca@live.cn>
 */

var path = require('path');
var htmlcs = require('../../../../');
var parse = require('../../../../lib/parse');

var rule = path.basename(__dirname);

describe('rule ' + rule, function () {
    var result = htmlcs.hintFile(path.join(__dirname, 'case.html'));

    it('should return right result', function () {
        expect(result.length).toBe(2);

        expect(result[0].type).toBe('WARN');
        expect(result[0].code).toBe('008');
        expect(result[0].line).toBe(16);
        expect(result[0].column).toBe(5);

        expect(result[1].type).toBe('WARN');
        expect(result[1].code).toBe('008');
        expect(result[1].line).toBe(21);
        expect(result[1].column).toBe(5);
    });
});

describe('format rule ' + rule, function () {
    var result = htmlcs.formatFile(path.join(__dirname, 'case.html'));

    var document = parse(result);

    var head = document.querySelector('head');
    var styles = document.querySelectorAll('link[rel="stylesheet"], style');

    it('should format well', function () {
        for (var i = 0, l = styles.length; i < l; i++) {
            expect(head.contains(styles[i])).toBe(true);
        }
    });
});
