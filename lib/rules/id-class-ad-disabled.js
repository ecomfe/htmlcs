/**
 * @file rule: id-class-ad-disabled
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'id-class-ad-disabled',

    desc: 'Id and class can not use ad-relative keyword, it will be blocked by adblock software.',

    target: 'parser',

    lint: function (getCfg, register, reporter) {
        register('attribdata', function (value) {
            var cfg = getCfg();
            if (!cfg) {
                return;
            }

            var name = this._attribname;
            var keywords = Array.isArray(cfg) ? cfg : ['ad'];

            if (['id', 'class'].indexOf(name) >= 0) {
                var pos = this._tokenizer._sectionStart;
                var parts = value.split(/[\_\-]+/);

                keywords.forEach(function (keyword) {
                    if (parts.indexOf(keyword) >= 0) {
                        reporter.warn(
                            pos,
                            '031',
                            'Id and class can not use ad-relative keyword ('
                                + keyword
                                + '), it will be blocked by adblock software.'
                        );
                    }
                });
            }
        });
    }

};
