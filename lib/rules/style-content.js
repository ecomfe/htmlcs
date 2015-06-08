/**
 * @file rule: style-content
 * @author nighca<nighca@live.cn>
 */

var util = require('../util');

module.exports = {

    name: 'style-content',

    desc: 'Content of <style> must meet standard.',

    lint: function (getCfg, document, reporter, code) {
        var cfg = getCfg();
        if (!cfg) {
            return;
        }

        var linters = getCfg('linters');
        var linter = linters && linters.style;
        if (typeof linter !== 'function') {
            return;
        }

        document.getElementsByTagName('style').forEach(function (style) {
            if (!style.childNodes.length) {
                return;
            }

            var content = style.childNodes[0].textContent;
            var pos = util.getPosition(code, style.startIndex);
            linter(content, pos, style);
        });
    }

};
