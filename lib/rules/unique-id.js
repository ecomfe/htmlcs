module.exports = {

    name: 'unique-id',

    desc: 'Id should be unique in page.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        var idMap = {};

        document.querySelectorAll('[id]').forEach(function (element) {
            if (element.id) {
                (idMap[element.id] = idMap[element.id] || []).push(element);
            }
        });

        for (var id in idMap) {
            if (idMap.hasOwnProperty(id)) {
                var elements = idMap[id];
                if (elements.length > 1) {
                    elements.forEach(function (element) {
                        reporter.warn(element, 'Id should be unique in page.');
                    });
                }
            }
        }
    }

};
