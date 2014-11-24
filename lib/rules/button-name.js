module.exports = {

    name: 'button-name',

    desc: 'Attribute "name" of <button> is not recommended to be set.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        document.querySelectorAll('button[name]').forEach(function (button) {
            reporter.warn(button, 'Attribute "name" of <button> is not recommended to be set.');
        });

    }

};
