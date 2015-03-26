/**
 * @file test for formatters of non-html content (js, css)
 * @author nighca<nighca@live.cn>
 */

var formatters = require('../../lib/other-formatter');
var parse = require('../../lib/parse');

var indent = function (opt) {
    var repeat = function (str, num) {
        return Array.prototype.join.call({length: num + 1}, str);
    };

    return repeat(opt['indent-char'] === 'tab' ? '\t' : repeat(' ', opt['indent-size']), opt.level);
};

var trim = function (content) {
    return content.replace(/(^([\s\t]*\n)+)|((\n[\s\t]*)+$)/g, '');
};

describe('formatter', function () {

    describe('for script', function () {
        var scriptFormatter = formatters.script;

        it('should be a function', function () {
            expect(typeof scriptFormatter).toBe('function');
        });

        it('should format jvascript', function () {
            var node = parse('<script>var a=0;\nvar b=1;</script>').querySelector('script');
            var newContent = scriptFormatter(node.childNodes[0].textContent, node,
                {
                    'level': 0,
                    'indent-char': 'space',
                    'indent-size': 4
                },
                {
                    indent: indent,
                    trim: trim
                }
            );

            expect(typeof newContent).toBe('string');
        });
    });

    describe('for style', function () {
        var styleFormatter = formatters.style;

        it('should be a function', function () {
            expect(typeof styleFormatter).toBe('function');
        });

        it('should format css', function () {
            var node = parse('<style>body{margin:0;}</style>').querySelector('style');
            var newContent = styleFormatter(node.childNodes[0].textContent, node,
                {
                    'level': 0,
                    'indent-char': 'space',
                    'indent-size': 4
                },
                {
                    indent: indent,
                    trim: trim
                }
            );

            expect(typeof newContent).toBe('string');
        });
    });

});
