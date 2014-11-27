var htmlparser2 = require('htmlparser2');

var Node = require('../../lib/node');
var util = require('../../lib/util');
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

var transformRecursively = function (node, root) {
    root = root || node;

    Node.init(node, root);

    node.childNodes.forEach(function (childNode) {
        transformRecursively(childNode, root);
    });

    return node;
};

describe('deal unnormal node', function () {

    describe('empty node', function () {
        var node = null;
        it('should return right result', function () {
            expect(Node.init(node) instanceof Node).toBe(true);
        });
    });

    describe('illegal node', function () {
        var node = {
            type: 'illegal',
            name: 'illegal',
            data: ''
        };

        it('should return right result', function () {
            expect(Node.init(node) instanceof Node).toBe(true);
        });
    });

    describe('illegal directive node', function () {
        var node = {
            type: typeMap.Directive,
            name: 'illegal',
            data: ''
        };

        it('should return right result', function () {
            expect(Node.init(node) instanceof Node).toBe(true);
        });
    });
});

describe('node methods', function () {
    var p = htmlparser2.parseDOM(
        '<p><span></span>' +
        '<a id="x" class="y z" href="#" data-role="test" disabled>' +
        '<img id="c1" class="cls">' +
        '<span id="c2" class="cls"></span>' +
        '</a>' +
        '<i></i></p>'
    )[0];

    it('should have node methods', function () {
        transformRecursively(p);
        var node = p.childNodes[1];

        expect(node.hasChildNodes()).toBe(true);
        expect(node.childNodes[0].hasChildNodes()).toBe(false);

        expect(node.contains(node.childNodes[0])).toBe(true);
        expect(node.parentNode.contains(node.childNodes[0])).toBe(true);
        expect(node.previousSibling.contains(node.childNodes[0])).toBe(false);
    });
});

describe('text node', function () {
    var p = htmlparser2.parseDOM('<p><span></span>aaa<i></i></p>')[0];

    it('should behave like a text node', function () {
        transformRecursively(p);
        var node = p.childNodes[1];

        expect(node.nodeName).toBe('#text');
        expect(node.nodeType).toBe(NodeType.TEXT_NODE);
        expect(node.nodeValue).toBe('aaa');
        expect(node.textContent).toBe('aaa');

        expect(node.parentNode.tagName).toBe('P');
        expect(node.parentElement).toBe(node.parentNode);
        expect(node.previousSibling.tagName).toBe('SPAN');
        expect(node.nextSibling.tagName).toBe('I');
    });
});

describe('doctype node', function () {
    var node = htmlparser2.parseDOM('<!DOCTYPE html>')[0];

    it('should behave like a doctype node', function () {
        node = Node.init(node);

        expect(node.nodeName).toBe('html');
        expect(node.nodeType).toBe(NodeType.DOCUMENT_TYPE_NODE);
    });
});

describe('cdata node', function () {
    var node = {
        type: typeMap.CDATA,
        data: ''
    };

    it('should behave like a cdata node', function () {
        node = Node.init(node);

        expect(node.nodeName).toBe('#cdata');
        expect(node.nodeType).toBe(NodeType.CDATA_SECTION_NODE);
    });
});

describe('comment node', function () {
    var p = htmlparser2.parseDOM('<p><span></span><!--aaa--><i></i></p>')[0];

    it('should behave like a comment node', function () {
        transformRecursively(p);
        var node = p.childNodes[1];

        expect(node.nodeName).toBe('#comment');
        expect(node.nodeType).toBe(NodeType.COMMENT_NODE);
        expect(node.nodeValue).toBe('aaa');
        expect(node.textContent).toBe('aaa');

        expect(node.parentNode.tagName).toBe('P');
        expect(node.parentElement).toBe(node.parentNode);
        expect(node.previousSibling.tagName).toBe('SPAN');
        expect(node.nextSibling.tagName).toBe('I');
    });
});

describe('document node', function () {
    var node = htmlparser2.parseDOM(
        '<document>' +
        '<!DOCTYPE html>' +
        '<html><head></head><body></body></html>' +
        '</document>'
    )[0];

    it('should behave like a document node', function () {
        transformRecursively(node);

        expect(node.nodeName).toBe('#document');
        expect(node.nodeType).toBe(NodeType.DOCUMENT_NODE);

        expect(node.doctype.nodeName).toBe('html');
        expect(node.doctype.nodeType).toBe(NodeType.DOCUMENT_TYPE_NODE);

        expect(node.querySelector('body').ownerDocument).toBe(node);

        expect(node.documentElement.tagName).toBe('HTML');
        expect(node.head.tagName).toBe('HEAD');
        expect(node.body.tagName).toBe('BODY');
    });
});

// TODO: CDATA
