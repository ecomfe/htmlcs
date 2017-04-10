/**
 * @file rule: new-line-for-blocks
 * @author Oleg Krivtsov <oleg@webmarketingroi.com.au>
 */

module.exports = {

    name: 'new-line-for-blocks',

    desc: 'There should be a new line for every block, list, or table element',

    target: 'parser',

    lint: function (getCfg, parser, reporter) {
        parser.on('opentag', function (name, attrs) {
            if (!getCfg()) {
                return;
            }
            
            var blockLevelElements = ['address', 'article', 'aside', 'blockquote', 'br', 'canvas', 
                                      'dd', 'div', 'dl', 'fieldset', 'figcaption', 'figure', 
                                      'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                                      'header', 'hgroup', 'hr', 'li', 'main', 'nav', 'noscript',
                                      'ol', 'output', 'p', 'pre', 'section', 'table', 'tfoot', 
                                      'ul', 'video'];
                            
            if (blockLevelElements.indexOf(name)) {
                    
                var index = this.startIndex -1;                
                
                var newLineFound = false;
                for (;index>=0 && !newLineFound; index--) {
                    var buffer = parser.tokenizer._buffer[index];    
                    if (buffer !== ' ' && buffer !== '\t' && buffer !== '\r' && buffer !== '\n') {
                        break;
                    }
                    if (buffer == '\n') {
                        newLineFound = true;
                        break;
                    }
                }
                
                if (!newLineFound) {
                    reporter.warn(
                        this.startIndex,
                        '028',
                        'There should be a new line for every block, list, or table element'
                    );
                }
            }            
        });
    }

};
