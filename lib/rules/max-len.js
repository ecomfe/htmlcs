/**
 * @file rule: max-len
 * @author chris<wfsr@foxmail.com>
 */

module.exports = {

    name: 'max-len',

    desc: 'Each length of line should be less then the value specified.',

    target: 'parser',

    lint: function (getCfg, parser, reporter, code) {

        var max = getCfg() | 0;
        if (!max) {
            return;
        }

        code.split(/\n/).reduce(function (pos, line) {
            pos.line++;
            var len = line.length;
            if (len > max) {
                reporter.warn(
                    pos.index,
                    '048',
                    'Line ' + pos.line + ' exceeds the maximum line length of ' + max + '.'
                );
            }

            pos.index += len + 1;
            return pos;
        }, {index: 0, line: 0});
    }

};
