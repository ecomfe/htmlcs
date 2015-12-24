/**
 * @file defines
 * @author nighca<nighca@live.cn>
 */

var defines = {
    // http://www.w3.org/TR/html5/dom.html#inter-element-whitespace
    'inter-element whitespace': function (given) {
        return given
            && given.nodeType === 3
            && /^[\u0020\u0009\u000a\u000c\u000d]*$/.test(given.textContent);
    },
    // http://www.w3.org/TR/html5/dom.html#script-supporting-elements
    'script-supporting elements': function (given) {
        return ['script', 'template'].indexOf(given.tagName.toLowerCase()) >= 0;
    }
};

module.exports = {
    is: function (name, given) {
        var define = defines[name];

        return define
            ? define(given)
            : false;
    }
};
