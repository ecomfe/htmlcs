/**
 * @file class Element
 * @author nighca<nighca@live.cn>
 */

var cssSelect = require('CSSselect');

var util = require('./util');
var Node = require('./node');

var Namespaces = {
    HTML: 'http://www.w3.org/1999/xhtml',
    XML: 'http://www.w3.org/XML/1998/namespace',
    XMLNS: 'http://www.w3.org/2000/xmlns/'
};

// http://www.w3.org/TR/dom/#attr
function Attr(name, value) {
    util.extend(this, {
        name: name,
        localName: name,
        value: value,
        specified: true,
        namespaceURI: null,
        prefix: null
    });
}

// http://www.w3.org/TR/dom/#interface-element
function Element() {
    this.constructor = Element;
    /* eslint-disable no-proto */
    this.__proto__ = Element.prototype;
    /* eslint-enable no-proto */
}

Element.init = function (element) {
    if (!element || (element instanceof Element)) {
        return element;
    }

    Element.apply(element);

    Element.extend(element);

    return element;
};

Element.extend = function (element) {
    var tag = element.name.toUpperCase();

    var attribs = element.attribs = element.attribs || {};

    var children = element.childNodes.filter(util.isElement);

    var previousElementSibling = (function (element) {
        while (element = element.prev) {
            if (util.isElement(element)) {
                return element;
            }
        }
    })(element) || null;

    var nextElementSibling = (function (element) {
        while (element = element.next) {
            if (util.isElement(element)) {
                return element;
            }
        }
    })(element) || null;

    // https://dom.spec.whatwg.org/#interface-element
    return util.extend(element, {
        // as element
        namespaceURI: Namespaces.HTML,
        prefix: '',                                     // TODO
        localName: element.name.toLowerCase(),
        tagName: tag,

        id: attribs.id || '',
        className: attribs.class || '',
        classList: attribs.class ? attribs.class.split(' ') : [],
        attributes: Object.keys(attribs).map(function (name) {
            return new Attr(name, attribs[name]);
        }),

        // as parent node
        children: children,
        firstElementChild: children[0],
        lastElementChild: children[children.length - 1],
        childElementCount: children.length,
        previousElementSibling: previousElementSibling,
        nextElementSibling: nextElementSibling

    });
};

// only read ops
Element.prototype = util.extend(new Node(), {
    constructor: Element,

    // as element
    getAttribute: function (name) {
        return this.hasAttribute(name) ? this.attribs[name] : null;
    },
    getAttributeNS: function () { /*TODO*/ },
    hasAttribute: function (name) {
        name = name && (this.namespaceURI === Namespaces.HTML ? name.toLowerCase() : name);
        return this.attribs.hasOwnProperty(name);
    },
    hasAttributeNS: function () { /*TODO*/ },
    getAttributeNode: function () { /*TODO*/ },
    getAttributeNodeNS: function () { /*TODO*/ },
    closest: function () { /*TODO*/ },
    matches: function () { /*TODO*/ },
    getElementsByTagName: function (tagName) {
        return this.querySelectorAll(tagName.toLowerCase());
    },
    getElementsByTagNameNS: function () { /*TODO*/ },
    getElementsByClassName: function (classNameList) {
        classNameList = classNameList.split(' ');

        var l = classNameList.length;
        return this.querySelectorAll('.' + classNameList[0]).filter(function (element) {
            for (var i = 1; i < l; i++) {
                if (classNameList[i] && element.classList.indexOf(classNameList[i]) < 0) {
                    return false;
                }
            }
            return true;
        });
    },

    // as parent node
    querySelector: function (selector) {
        return cssSelect.selectOne(selector, this.children) || null;
    },
    querySelectorAll: function (selector) {
        return cssSelect(selector, this.children);
    }
});


module.exports = Element;
