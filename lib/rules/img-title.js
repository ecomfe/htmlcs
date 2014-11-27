module.exports = {

    name: 'img-title',

    desc: 'Attribute "title" of <img> is not recommended to be set.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        document.querySelectorAll('img[title]').forEach(function (img) {
            reporter.warn(img, 'Attribute "title" of <img> is not recommended to be set.');
        });

    }

};
