/**
 * @file rule: unique-id
 * @author nighca<nighca@live.cn>
 */

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

        var report = function (element) {
            reporter.warn(element, '026', 'Id should be unique in page.');
        };

        for (var id in idMap) {
            if (idMap.hasOwnProperty(id)) {
                var elements = idMap[id];
                if (elements.length > 1) {
                    elements.forEach(report);
                }
            }
        }
    }

};
