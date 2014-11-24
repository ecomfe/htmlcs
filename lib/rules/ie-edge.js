module.exports = {

    name: 'ie-edge',

    desc: '<meta http-equiv="X-UA-Compatible" content="IE=Edge"> recommended.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        var head = document.querySelector('head');

        if (!head) {
            return;
        }

        var hasEdgeMeta = false;
        head.querySelectorAll('meta').forEach(function (meta) {
            if (meta.getAttribute('http-equiv') === 'X-UA-Compatible' && meta.getAttribute('content') === 'IE=Edge') {
                hasEdgeMeta = true;
            }
        });

        if (!hasEdgeMeta) {
            reporter.warn(head, '<meta http-equiv="X-UA-Compatible" content="IE=Edge"> recommended.');
        }
    }

};
