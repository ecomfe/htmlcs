/**
 * @file rule: nest
 * @author nighca<nighca@live.cn>
 */

var util = require('../util');
var nestRule = require('../spec/nest-rule');

module.exports = {

    name: 'nest',

    desc: 'Elements should be nested abiding by specific rules.',

    lint: function (getCfg, document, reporter) {
        util.walk(document.documentElement, function (element) {
            if (!getCfg(element)) {
                return;
            }

            var rule = nestRule[element.tagName.toLowerCase()];

            if (!rule) {
                return;
            }

            rule.validateContent(element, []).forEach(function (result) {
                var target = result.target || element;
                reporter.warn(
                    target.startIndex,
                    '041',
                    'Content of ' + element.tagName.toLowerCase() + ' here should be ' + result.expect + ''
                    + (
                        result.got
                        ? (', while got ' + result.got + '.')
                        : '.'
                    )
                );
            });

            rule.validateContext(element, []).forEach(function (result) {
                var target = result.target || element;
                reporter.warn(
                    target.startIndex,
                    '042',
                    'Context of ' + element.tagName.toLowerCase() + ' here should be ' + result.expect + ''
                    + (
                        result.got
                        ? (', while got ' + result.got + '.')
                        : '.'
                    )
                );
            });
        });
    }

};
