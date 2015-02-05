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

    // https://dom.spec.whatwg.org/#interface-element

    util.extend(element, {

        attribs: element.attribs || {},

        namespaceURI: Namespaces.HTML,
        prefix: '',                                     // TODO
        localName: element.name.toLowerCase(),
        tagName: element.name.toUpperCase()

    });

    util.extendAttribute(element, {

        id: {
            get: function () {
                return this.attribs.id || '';
            }
        },

        className: {
            get: function () {
                return this.attribs.class || '';
            }
        },

        classList: {
            get: function () {
                return this.attribs.class ? this.attribs.class.split(' ') : [];
            }
        },

        attributes: {
            get: function () {
                var attribs = this.attribs;
                return Object.keys(attribs).map(function (name) {
                    return new Attr(name, attribs[name]);
                });
            }
        },

        children: {
            get: function () {
                return this.childNodes.filter(util.isElement);
            }
        },

        firstElementChild: {
            get: function () {
                return this.children[0] || null;
            }
        },

        lastElementChild: {
            get: function () {
                return this.children[this.children.length - 1] || null;
            }
        },

        childElementCount: {
            get: function () {
                return this.children.length;
            }
        },

        previousElementSibling: {
            get: function () {
                var element = this;
                while (element = element.previousSibling) {
                    if (util.isElement(element)) {
                        return element;
                    }
                }
            }
        },

        nextElementSibling: {
            get: function () {
                var element = this;
                while (element = element.nextSibling) {
                    if (util.isElement(element)) {
                        return element;
                    }
                }
            }
        }

    });

    return element;
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
