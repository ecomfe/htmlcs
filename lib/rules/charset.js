module.exports = {

    name: 'charset',

    desc: '<meta charset> recommended.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        var head = document.querySelector('head');
        if (!head) {
            return;
        }

        var charsetMeta = head.querySelector('meta[charset]');
        if (!charsetMeta) {
            reporter.warn(head, '006', '<meta charset> recommended.');
        } else if (charsetMeta !== head.firstElementChild) {
            reporter.warn(charsetMeta, '007', '<meta> charset should be the first element child of <head>');
        }
    }

};
