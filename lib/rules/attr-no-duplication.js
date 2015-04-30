/**
 * @file rule: attr-no-duplication
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'attr-no-duplication',

    desc: 'Attribute name can not been duplication.',

    target: 'parser',

    lint: function (enable, parser, reporter) {
        if (!enable) {
            return;
        }

        var records = {};

        // clear records on opening new tag
        parser.on('opentagname', function () {
            records = {};
        });

        // check on new attribute name
        parser.on('attribname', function (name) {
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
