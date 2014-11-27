module.exports = {

    name: 'img-src',

    desc: 'Attribute "src" of <img> should not be empty.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        document.querySelectorAll('img[src=""]').forEach(function (img) {
            reporter.warn(img, 'Attribute "src" of <img> should not be empty.');
        });

    }

};
