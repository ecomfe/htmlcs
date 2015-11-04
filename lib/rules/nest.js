/**
 * @file rule: nest
 * @author nighca<nighca@live.cn>
 */

var util = require('../util');
var nestRules = require('../spec/nest-rules');

module.exports = {

    name: 'nest',

    desc: 'Elements should be nested abiding by specific rules.',

    lint: function (getCfg, document, reporter) {
        util.walk(document.documentElement, function (element) {
            if (!getCfg(element)) {
                return;
            }

            var rule = nestRules.get(element);

            rule.validContent(element, []).forEach(function (result) {
                switch (result.expect) {
                    case 'empty':
                        reporter.warn(
                            element.startIndex,
                            '039',
                            'Content of ' + element.tagName.toLowerCase() + ' should be empty.'
                        );
                        break;

                    case 'text':
                        reporter.warn(
                            element.startIndex,
                            '040',
                            'Content of ' + element.tagName.toLowerCase() + ' should be text only.'
                        );
                        break;

                    default:
                        reporter.warn(
                            result.target.startIndex,
                            '041',
                            'Content of ' + element.tagName.toLowerCase() + ' here should be ' + result.expect + ''
                            + (
                                result.got
                                ? (', while got ' + result.got + '.')
                                : '.'
                            )
                        );
                }
            });

            rule.validContext(element, []).forEach(function (result) {
                switch (result.expect) {
                    default:
                        reporter.warn(
                            result.target.startIndex,
                            '042',
                            'Context of ' + element.tagName.toLowerCase() + ' here should be ' + result.expect + ''
                            + (
                                result.got
                                ? (', while got ' + result.got + '.')
                                : '.'
                            )
                        );
                }
            });
        });
    }

};
