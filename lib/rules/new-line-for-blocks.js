/**
 * @file rule: new-line-for-blocks
 * @author Oleg Krivtsov <oleg@webmarketingroi.com.au>
 */

module.exports = {

    name: 'new-line-for-blocks',

    desc: 'There should be a new line for every block, list, or table element',

    target: 'parser',

    lint: function (getCfg, parser, reporter) {

        var blockLevelElements = ['address', 'article', 'aside', 'blockquote', 'br', 'canvas',
                                      'dd', 'div', 'dl', 'fieldset', 'figcaption', 'figure',
                                      'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                                      'header', 'hgroup', 'hr', 'li', 'main', 'nav', 'noscript',
                                      'ol', 'output', 'p', 'pre', 'section', 'table', 'tfoot',
                                      'ul', 'video'];

        var stack = [];

        parser.on('opentag', function (name, attrs) {
            if (!getCfg()) {
                return;
            }

            if (blockLevelElements.indexOf(name) !== -1) {

                var index = this.startIndex - 1;

                var indentSize = 0;
                var newLineFound = false;
                for (;index >= 0 && !newLineFound; index--) {
                    var buffer = parser.tokenizer._buffer[index];
                    if (buffer !== ' ' && buffer !== '\t' && buffer !== '\r' && buffer !== '\n') {
                        break;
                    }
                    if (buffer === '\n') {
                        newLineFound = true;
                        break;
                    }
                    indentSize++;
                }

                if (!newLineFound) {
                    reporter.warn(
                        this.startIndex,
                        '049',
                        'There should be a new line for <' + name + '> (for every block, list, or table element)'
                    );
                }

                var parentTag = '';
                var parentIndentSize = 0;
                if (stack.length > 0) {
                    parentTag = stack[stack.length - 1].name;
                    parentIndentSize = stack[stack.length - 1].indentSize;
                }

                if (blockLevelElements.indexOf(parentTag) !== -1
                    && indentSize <= parentIndentSize) {
                    reporter.warn(
                        this.startIndex,
                        '049',
                        'Properly indent <' + name + '> element when it is a child element of <'
                        + parentTag + '> (of every block, list, or table element)'
                    );
                }

                stack.push({name: name, indentSize: indentSize});
            }
        });

        parser.tokenizer.on('closetag', function (name) {
            if (!getCfg()) {
                return;
            }

            if (blockLevelElements.indexOf(name) !== -1) {
                stack.pop();
            }
        });
    }

};
