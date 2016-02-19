/**
 * @file defines
 * @author nighca<nighca@live.cn>
 */

var util = require('../util');

var defines = {
    // http://www.w3.org/TR/html5/dom.html#inter-element-whitespace
    'inter-element whitespace': function (given) {
        return given
            && given.nodeType === 3
            && /^[\u0020\u0009\u000a\u000c\u000d]*$/.test(given.textContent);
    },
    // http://www.w3.org/TR/html5/dom.html#script-supporting-elements
    'script-supporting element': function (given) {
        return given
            && ['script', 'template'].indexOf(given.tagName.toLowerCase()) >= 0;
    },
    // https://www.w3.org/TR/html5/dom.html#interactive-content-0
    'interactive content': function (given) {
        if (!given) {
            return false;
        }

        switch (given.tagName.toLowerCase()) {
            case 'a':
            case 'button':
            case 'embed':
            case 'iframe':
            case 'keygen':
            case 'label':
            case 'select':
            case 'textarea':
                return true;
            case 'audio':
            case 'video':
                return given.hasAttribute('controls');
            case 'img':
            case 'object':
                return given.hasAttribute('usemap');
            case 'input':
                return given.getAttribute('type') !== 'hidden';
            default:
                return false;
        }
    },
    // https://www.w3.org/TR/html5/embedded-content-0.html#media-element
    'media element': function (given) {
        return given
            && ['audio', 'video'].indexOf(given.tagName.toLowerCase()) >= 0;
    },
    // https://www.w3.org/TR/html5/forms.html#category-label
    'labelable element': function (given) {
        if (!given) {
            return false;
        }

        switch (given.tagName.toLowerCase()) {
            case 'button':
            case 'keygen':
            case 'meter':
            case 'output':
            case 'progress':
            case 'select':
            case 'textarea':
                return true;
            case 'input':
                return given.getAttribute('type') !== 'hidden';
            default:
                return false;
        }
    }
};

var is = util.curry(function (name, given) {
    var define = defines[name];

    return define
        ? define(given)
        : false;
});

var isNot = util.not(is);

module.exports = {
    is: is,
    isNot: isNot
};
