/**
 * @file rule: script-content
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'script-content',

    desc: 'Script content must meet standard.',

    lint: function (getCfg, register, reporter) {
        register('attribname', function (name) {
            if (!getCfg()) {
                return;
            }

            if (name !== name.toLowerCase()) {
                reporter.warn(
                    this._tokenizer._sectionStart,
                    '029',
                    'Attribute name must be lowercase.'
                );
            }
        });
    }

};
