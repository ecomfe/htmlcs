var cssSelect = require('CSSselect');

var util = require('./util');
var typeMap = util.nodeType;

var NodeType = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11
};

var Namespaces = {
    HTML: 'http://www.w3.org/1999/xhtml',
    XML: 'http://www.w3.org/XML/1998/namespace',
    XMLNS: 'http://www.w3.org/2000/xmlns/'
};

var FormTags = ['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA'];

// http://www.w3.org/TR/dom/#interface-node
function Node() {
    this.constructor = Node;
    /* eslint-disable no-proto */
    this.__proto__ = Node.prototype;
    /* eslint-enable no-proto */
}

Node.init = function (node, root) {
    // empty node
    if (!node) {
        return new Node();
    }

    // avoid repetitive construct
    if (node instanceof Node) {
        return node;
    }

    Node.apply(node);

    Node.extend(node, root);

    if (node.name === 'document') {
        return Node.createDocument(node);
    }

    if (util.isElement(node)) {
        return Node.createElement(node);
    }

    switch (node.type) {

        case typeMap.Text:
            return Node.createTextNode(node);

        case typeMap.Directive:
            return Node.createDirective(node);

        case typeMap.Comment:
            return Node.createComment(node);

        case typeMap.CDATA:
            return Node.createCDATA(node);

        default:
            return node;

    }
};

Node.extend = function (node, root) {
    var childNodes = (node.children || []).map(function (childNode) {
        return Node.init(childNode, root);
    });

    return util.extend(node, {
        nodeType: '',                                   // fill later depending on node type
        nodeName: '',                                   // fill later depending on node type

        baseURI: '',                                    // TODO
        ownerDocument: root,
        parentNode: node.parent ? Node.init(node.parent, root) : null,
        parentElement: (node.parent && util.isElement(node.parent)) ? node.parent : null,

        childNodes: childNodes,
        firstChild: childNodes[0],
        lastChild: childNodes[childNodes.length - 1],
        previousSibling: node.prev ? Node.init(node.prev, root) : null,
        nextSibling: node.next ? Node.init(node.next, root) : null,

        nodeValue: null,                                // fill later depending on node type
        textContent: ''                                 // fill later depending on node type
    });
};

// only read ops
util.extend(Node.prototype, {
    hasChildNodes: function () {
        return !!this.childNodes.length;
    },
    isEqualNode: function () { /*TODO*/ },
    compareDocumentPosition: function () { /*TODO*/ },
    contains: function (another) {
        while (another) {
            if (another === this) {
                return true;
            }
            another = another.parentNode;
        }
        return false;
    },
    lookupPrefix: function () { /*TODO*/ },
    lookupNamespaceURI: function () { /*TODO*/ },
    isDefaultNamespace: function () { /*TODO*/ }
});

Node.createElement = function (node) {
    return Element.init(util.extend(node, {
        nodeType: NodeType.ELEMENT_NODE,
        nodeName: node.name.toUpperCase(),
        nodeValue: null,
        textContent: node.data
    }));
};

Node.createTextNode = function (node) {
    return util.extend(node, {
        nodeName: '#text',
        nodeType: NodeType.TEXT_NODE,
        nodeValue: node.data,
        textContent: node.data
    });
};

Node.createDirective = function (node) {
    switch (node.name) {

        case '!doctype':
            node.name = node.data.split(' ')[1];
            var attributes = node.attribs || {};

            return util.extend(node, {
                nodeType: NodeType.DOCUMENT_TYPE_NODE,
                nodeName: node.name,
                nodeValue: null,
                textContent: null,

                publicId: attributes.publicId || '',
                systemId: attributes.systemId || ''
            });

        default:
            return util.extend(node, {
                nodeValue: null,
                textContent: null
            });
    }

};

Node.createComment = function (node) {
    return util.extend(node, {
        nodeName: '#comment',
        nodeType: NodeType.COMMENT_NODE,
        nodeValue: node.data,
        textContent: node.data
    });
};

Node.createDocument = function (node) {
    node = Element.init(node);

    var doctype = node.childNodes.filter(function (childNode) {
        return childNode.nodeType === NodeType.DOCUMENT_TYPE_NODE;
    })[0] || null;

    node.childNodes.forEach(function (childNode) {
        childNode.parentNode = node;
    });

    return util.extend(node, {
        nodeName: '#document',
        nodeType: NodeType.DOCUMENT_NODE,
        nodeValue: null,
        textContent: null,

        URL: 'about:blank',
        documentURI: 'about:blank',
        compatMode: 'CSS1Compat',           // TODO
        characterSet: 'utf-8',
        contentType: 'application/xml',
        doctype: doctype,
        documentElement: node.firstElementChild || null,

        head: node.querySelector('head'),
        body: node.querySelector('body')
    });
};

Node.createCDATA = function (node) {
    return util.extend(node, {
        nodeName: '#cdata',
        nodeType: NodeType.CDATA_SECTION_NODE,
        nodeValue: null,
        textContent: null
    });
};

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

    var attributes = element.attribs || {};

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

        id: attributes.id || '',
        className: attributes['class'] || '',
        classList: attributes['class'] ? attributes['class'].split(' ') : [],
        attributes: attributes,

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
        return this.hasAttribute(name) ? this.attributes[name] : null;
    },
    getAttributeNS: function () { /*TODO*/ },
    hasAttribute: function (name) {
        name = name && (this.namespaceURI === Namespaces.HTML ? name.toLowerCase() : name);
        return this.attributes.hasOwnProperty(name);
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


module.exports = Node;
