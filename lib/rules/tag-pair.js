/**
 * @file rule: tag-pair
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'tag-pair',

    desc: 'Tag must be paired.',

    target: 'parser',

    lint: function (enable, parser, reporter) {
        if (!enable) {
            return;
        }

        // http://www.w3.org/TR/html5/syntax.html#elements-0
        var voidElements = [
            'area',
            'base',
            'br',
            'col',
            'embed',
            'hr',
            'img',
            'input',
            'keygen',
            'link',
            'meta',
            'param',
            'source',
            'track',
            'wbr'
        ];

        var stack = [];

        // check if tag should be report & report it
        var check = function (tag) {
            if (voidElements.indexOf(tag.name) < 0) {
                reporter.warn(
                    tag.pos,
                    '035',
                    'Tag ' + tag.name + ' is not paired.'
                );
            }
        };

        // record unclosed tags
        parser.on('opentagname', function (name) {
            stack.push({
                name: name.toLowerCase(),
                pos: this._tokenizer._sectionStart - 1
            });
        });

        // do close & check unclosed tags
        parser.on('closetag', function (name) {
            name = name.toLowerCase();

            var l = stack.length;
            var i = l - 1;
            for (; i >= 0; i--) {
                if (stack[i].name === name) {
                    break;
                }
            }

            if (i >= 0) {
                for (var j = i + 1; j < l; j++) {
                    check(stack[j]);
                }
            }

            stack = stack.slice(0, i);
        });

        // check left tags
        parser.on('end', function () {
            stack.forEach(check);
        });
    }

};
