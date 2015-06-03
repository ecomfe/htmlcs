/**
 * @file rule: space-tab-mixed-disabled
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'space-tab-mixed-disabled',

    desc: 'Spaces and tabs can not mixed in front of line.',

    target: 'parser',

    lint: function (getCfg, register, reporter) {
        register('text', function (data) {
            if (!getCfg()) {
                return;
            }

            var pos = this._tokenizer._sectionStart;
            var mixed = /^(\s+\t|\t+\s)/;

            data.split('\n').forEach(function (line, i) {
                // discard the first line cause it does not start from \n,
                // then test if mixed
                if (i && mixed.test(line)) {
                    reporter.warn(
                        pos,
                        '032',
                        'Spaces and tabs can not mixed in front of line.'
                    );
                }

                pos += line.length + 1;
            });
        });
    }

};
