/**
 * @file test for style-content
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');
var path = require('path');
var htmlcs = require('../../../../');

var rule = path.basename(__dirname);

describe('hint rule ' + rule, function () {
    var code = fs.readFileSync(path.join(__dirname, 'case.html'), {
        encoding: 'utf-8'
    });

    var result = [];

    var styleLinter = function (content, pos, element) {
        result.push({
            content: content,
            pos: pos,
            element: element
        });
    };

    htmlcs.hint(code, {
        'style-content': true,
        'linters': {
            style: styleLinter
        }
    });

    htmlcs.hint(code, {
        linters: {
            style: styleLinter
        }
    });

    htmlcs.hint(code, {'style-content': true});

    it('should call linter on style', function () {
        expect(result.length).toBe(3);

        expect(result[0].content).toBe('body {}');
        expect(result[0].pos.line).toBe(1);
        expect(result[0].pos.col).toBe(1);
        expect(result[0].element.tagName).toBe('STYLE');

        expect(result[1].content).toBe('\n    body {}\n');
        expect(result[1].pos.line).toBe(2);
        expect(result[1].pos.col).toBe(1);
        expect(result[1].element.tagName).toBe('STYLE');

        expect(result[2].content).toBe('\n    body {\n\n    }\n');
        expect(result[2].pos.line).toBe(5);
        expect(result[2].pos.col).toBe(1);
        expect(result[2].element.tagName).toBe('STYLE');
    });
});
