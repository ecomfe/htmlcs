/**
 * @file rule: button-type
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'button-type',

    desc: 'Attribute "type" of <button> is recommended to be set.',

    lint: function (getCfg, document, reporter) {
        if (!getCfg()) {
            return;
        }

        document.querySelectorAll('button:not([type]), button[type=""]').forEach(function (button) {
            reporter.warn(button.startIndex, '005', 'Attribute "type" of <button> is recommended to be set.');
        });
    }

};
