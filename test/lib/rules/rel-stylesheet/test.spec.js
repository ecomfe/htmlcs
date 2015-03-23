/**
 * @file test for rule rel-stylesheet
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
        expect(result[0].code).toBe('022');
        expect(result[0].line).toBe(8);
        expect(result[0].col).toBe(5);

        expect(result[1].type).toBe('WARN');
        expect(result[1].code).toBe('022');
        expect(result[1].line).toBe(9);
        expect(result[1].col).toBe(5);

    });
});

describe('format rule ' + rule, function () {
    var document = parse(htmlcs.formatFile(path.join(__dirname, 'case.html')));

    it('should format well', function () {
        document.querySelectorAll('link').forEach(function (element) {
            expect(!element.getAttribute('rel')).toBe(false);
        });
    });
});
