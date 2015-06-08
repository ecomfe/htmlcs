/**
 * @file test for Node
 * @author nighca<nighca@live.cn>
 */

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

    describe('a node instance', function () {
        var node = Node.init({
            type: typeMap.Directive,
            name: 'node',
            data: ''
        });
        var node2 = Node.init(node);

        it('should return itself', function () {
            expect(node2 === node).toBe(true);
        });
    });
});

describe('node properties', function () {
    var document = htmlparser2.parseDOM(
        '<document><p><span></span><i></i></p></document>'
    )[0];

    var p2 = htmlparser2.parseDOM('<p></p>')[0];

    it('should have node properties', function () {
        transformRecursively(document);
        transformRecursively(p2);

        var p = document.childNodes[0];
        var span = p.firstChild;
        var i = p.lastChild;

        expect(span.ownerDocument).toBe(document);
        expect(p2.ownerDocument).toBe(null);

        expect(span.parentElement).toBe(p);
        expect(document.parentElement).toBe(null);

        expect(span.firstChild).toBe(null);
        expect(span).toBe(p.childNodes[0]);

        expect(i.lastChild).toBe(null);
        expect(i).toBe(p.childNodes[p.childNodes.length - 1]);

        expect(document.previousSibling).toBe(null);
        expect(p.previousSibling).toBe(null);
        expect(i.previousSibling).toBe(span);

        expect(document.nextSibling).toBe(null);
        expect(p.nextSibling).toBe(null);
        expect(span.nextSibling).toBe(i);
    });
});

describe('node methods (read ops)', function () {
    var p = htmlparser2.parseDOM(
        '<p><span></span>'
        + '<a id="x" class="y z" href="#" data-role="test" disabled>'
        + '<img id="c1" class="cls">'
        + '<span id="c2" class="cls"></span>'
        + '</a>'
        + '<i></i></p>'
    )[0];

    var p2 = htmlparser2.parseDOM('<p></p>')[0];

    transformRecursively(p);
    transformRecursively(p2);

    it('should have node methods', function () {

        var node = p.childNodes[1];

        expect(node.hasChildNodes()).toBe(true);
        expect(node.firstChild.hasChildNodes()).toBe(false);

        expect(node.isEqualNode(node)).toBe(true);
        expect(node.isEqualNode(p)).toBe(false);
        expect(node.isEqualNode(node.firstChild)).toBe(false);

        expect(node.compareDocumentPosition(node)).toBe(0);
        expect([35, 37].indexOf(node.compareDocumentPosition(null)) >= 0).toBe(true);
        expect([35, 37].indexOf(node.compareDocumentPosition(p2)) >= 0).toBe(true);
        expect(node.compareDocumentPosition(p)).toBe(10);
        expect(node.compareDocumentPosition(node.firstChild)).toBe(20);
        expect(node.compareDocumentPosition(node.previousSibling)).toBe(2);
        expect(node.compareDocumentPosition(node.nextSibling)).toBe(4);

        expect(node.contains(node.childNodes[0])).toBe(true);
        expect(node.parentNode.contains(node.childNodes[0])).toBe(true);
        expect(node.previousSibling.contains(node.childNodes[0])).toBe(false);
    });
});

describe('method insertBefore', function () {
    var document = htmlparser2.parseDOM(
        '<document><html><body>'
        + '<a>'
        + '<img id="c1" class="cls">'
        + '<span id="c2" class="cls"></span>'
        + '</a>'
        + '</body></html></document>'
    )[0];

    var p = htmlparser2.parseDOM('<p></p>')[0];

    transformRecursively(document);
    transformRecursively(p);

    var body = document.querySelector('body');
    var a = body.querySelector('a');
    var img = a.firstChild;
    var span = a.lastChild;

    it('should works well', function () {
        a.insertBefore(span, img);
        expect(a.firstChild).toBe(span);
        expect(a.lastChild).toBe(img);
        expect(span.previousSibling).toBe(null);
        expect(span.nextSibling).toBe(img);
        expect(img.previousSibling).toBe(span);
        expect(img.nextSibling).toBe(null);

        a.insertBefore(p, img);
        expect(a.childNodes.length).toBe(3);
        expect(a.childNodes[1]).toBe(p);
        expect(p.parentNode).toBe(a);
        expect(img.previousSibling).toBe(p);
        expect(span.nextSibling).toBe(p);
        expect(p.previousSibling).toBe(span);
        expect(p.nextSibling).toBe(img);
        expect(p.ownerDocument).toBe(document);
    });
});

describe('method appendChild', function () {
    var document = htmlparser2.parseDOM(
        '<document><html><body>'
        + '<a>'
        + '<img id="c1" class="cls">'
        + '<span id="c2" class="cls"></span>'
        + '</a>'
        + '</body></html></document>'
    )[0];

    var p = htmlparser2.parseDOM('<p></p>')[0];

    transformRecursively(document);
    transformRecursively(p);

    var body = document.querySelector('body');
    var a = body.querySelector('a');
    var img = a.firstChild;
    var span = a.lastChild;

    it('should works well', function () {
        a.appendChild(img);
        expect(a.firstChild).toBe(span);
        expect(a.lastChild).toBe(img);
        expect(span.previousSibling).toBe(null);
        expect(span.nextSibling).toBe(img);
        expect(img.previousSibling).toBe(span);
        expect(img.nextSibling).toBe(null);

        a.appendChild(p);
        expect(a.childNodes.length).toBe(3);
        expect(a.lastChild).toBe(p);
        expect(p.parentNode).toBe(a);
        expect(p.ownerDocument).toBe(document);
        expect(p.previousSibling).toBe(img);
        expect(p.nextSibling).toBe(null);
        expect(img.nextSibling).toBe(p);
    });
});

describe('method replaceChild', function () {
    var document = htmlparser2.parseDOM(
        '<document><html><body>'
        + '<a>'
        + '<img id="c1" class="cls">'
        + '<span id="c2" class="cls"></span>'
        + '<i></i>'
        + '</a>'
        + '</body></html></document>'
    )[0];

    var p = htmlparser2.parseDOM('<p></p>')[0];

    transformRecursively(document);
    transformRecursively(p);

    var body = document.querySelector('body');
    var a = body.querySelector('a');
    var img = a.firstChild;
    var span = a.childNodes[1];
    var i = a.lastChild;

    it('should works well', function () {
        a.replaceChild(img, i);
        expect(a.childNodes.length).toBe(2);
        expect(a.firstChild).toBe(span);
        expect(a.lastChild).toBe(img);
        expect(span.previousSibling).toBe(null);
        expect(span.nextSibling).toBe(img);
        expect(img.previousSibling).toBe(span);
        expect(img.nextSibling).toBe(null);

        a.replaceChild(p, span);
        expect(a.childNodes.length).toBe(2);
        expect(a.firstChild).toBe(p);
        expect(p.parentNode).toBe(a);
        expect(p.ownerDocument).toBe(document);
        expect(p.previousSibling).toBe(null);
        expect(p.nextSibling).toBe(img);
        expect(img.previousSibling).toBe(p);
        expect(img.nextSibling).toBe(null);
    });
});

describe('method removeChild', function () {
    var document = htmlparser2.parseDOM(
        '<document><html><body>'
        + '<a>'
        + '<img id="c1" class="cls">'
        + '<i></i>'
        + '<span id="c2" class="cls"></span>'
        + '</a>'
        + '</body></html></document>'
    )[0];

    transformRecursively(document);

    var body = document.querySelector('body');
    var a = body.querySelector('a');
    var img = a.firstChild;
    var span = a.childNodes[1];
    var i = a.lastChild;

    it('should works well', function () {
        a.removeChild(i);
        expect(a.childNodes.length).toBe(2);
        expect(a.firstChild).toBe(img);
        expect(a.lastChild).toBe(span);
        expect(img.previousSibling).toBe(null);
        expect(img.nextSibling).toBe(span);
        expect(span.previousSibling).toBe(img);
        expect(span.nextSibling).toBe(null);
        expect(i.ownerDocument).toBe(null);
        expect(i.parentNode).toBe(null);
        expect(i.previousSibling).toBe(null);
        expect(i.nextSibling).toBe(null);

        a.removeChild(span);
        expect(a.childNodes.length).toBe(1);
        expect(a.firstChild).toBe(img);
        expect(a.lastChild).toBe(img);
        expect(img.previousSibling).toBe(null);
        expect(img.nextSibling).toBe(null);
        expect(span.previousSibling).toBe(null);
        expect(span.nextSibling).toBe(null);
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

        expect(node.name).toBe('html');
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
        '<document>'
        + '<!DOCTYPE html>'
        + '<html><head></head><body></body></html>'
        + '</document>'
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
