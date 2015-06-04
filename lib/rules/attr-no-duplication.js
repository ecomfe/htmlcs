/**
 * @file rule: attr-no-duplication
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'attr-no-duplication',

    desc: 'Attribute name can not been duplication.',

    target: 'parser',

    lint: function (getCfg, register, reporter) {
        var records = {};

        // clear records on opening new tag
        register('opentagname', function () {
            records = {};
        });

        // check on new attribute name
        register('attribname', function (name) {
            if (!getCfg()) {
                return;
            }

            name = name.toLowerCase();

            if (records[name]) {
                reporter.warn(
                    this._tokenizer._sectionStart,
                    '030',
                    'Attribute name can not been duplication.'
                );
            }
            else {
                records[name] = true;
            }
        });
    }

};
