/**
 * @file rule: button-name
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'button-name',

    desc: 'Attribute "name" of <button> is not recommended to be set.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        document.querySelectorAll('button[name]').forEach(function (button) {
            reporter.warn(button, '004', 'Attribute "name" of <button> is not recommended to be set.');
        });

    },

    format: function (enable, document, options) {
        // remove name of button may cause logic error
        // do not remove it autoly
    }

};
