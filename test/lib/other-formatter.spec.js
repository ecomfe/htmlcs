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

var removeBlankLineAround = function (content) {
    return content.replace(/(^([\s\t]*\n)+)|((\n[\s\t]*)+$)/g, '');
};

var testFormatter = function () {

    describe('for script', function () {
        var scriptFormatter = formatters.script;

        it('should be a function', function () {
            expect(typeof scriptFormatter).toBe('function');
        });

        it('should format jvascript', function () {
            var node = parse('<script>var a=0;\nvar b=1;</script>').querySelector('script');
            var content = node.childNodes[0].textContent;
            var opt = {
                'level': 0,
                'indent-char': 'space',
                'indent-size': 4
            };
            var indentContent = function (content) {
                opt.level++;

                return content.split('\n').map(function (line) {
                    return line ? (indent(opt) + line) : line;
                }).join('\n');
            };

            var newContent = scriptFormatter(content, node, opt,
                {
                    indent: indentContent,
                    trim: removeBlankLineAround
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
            var content = node.childNodes[0].textContent;
            var opt = {
                'level': 0,
                'indent-char': 'space',
                'indent-size': 4
            };
            var indentContent = function (content) {
                opt.level++;

                return content.split('\n').map(function (line) {
                    return line ? (indent(opt) + line) : line;
                }).join('\n');
            };

            var newContent = styleFormatter(content, node, opt,
                {
                    indent: indentContent,
                    trim: removeBlankLineAround
                }
            );

            expect(typeof newContent).toBe('string');
        });
    });

};

describe('formatter', testFormatter);
