/**
 * @file rule: tagname-lowercase
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'tagname-lowercase',

    desc: 'Tagname must be lowercase.',

    target: 'parser',

    lint: function (getCfg, register, reporter) {
        // check & report
        var check = function (name) {
            if (!getCfg()) {
                return;
            }

            if (name !== name.toLowerCase()) {
                reporter.warn(
                    this._tokenizer._sectionStart,
                    '036',
                    'Tagname must be lowercase.'
                );
            }
        };

        register('opentagname', check);
        register('closetag', check);
    }

};
