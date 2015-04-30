/**
 * @file rule: tagname-lowercase
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'tagname-lowercase',

    desc: 'Tagname must be lowercase.',

    target: 'parser',

    lint: function (enable, parser, reporter) {
        if (!enable) {
            return;
        }

        // check & report
        var checkName = function (name, pos) {
            if (name !== name.toLowerCase()) {
                reporter.warn(
                    pos,
                    '036',
                    'Tagname must be lowercase.'
                );
            }
        };

        parser.on('opentagname', function (name) {
            checkName(name, this._tokenizer._sectionStart);
        });

        parser.on('closetag', function (name) {
            checkName(name, this._tokenizer._sectionStart);
        });
    }

};
