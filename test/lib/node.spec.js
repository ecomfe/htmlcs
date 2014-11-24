var assert = require('assert');

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

describe('deal unnormal node', function () {

    describe('empty node', function () {
        var node = null;
        it('should return right result', function () {
            assert.strictEqual(true, Node.init(node) instanceof Node);
        });
    });

    describe('illegal node', function () {
        var node = {
            type: 'illegal',
            name: 'illegal',
            data: ''
        };

        it('should return right result', function () {
            assert.strictEqual(true, Node.init(node) instanceof Node);
        });
    });

    describe('illegal directive node', function () {
        var node = {
            type: typeMap.Directive,
            name: 'illegal',
            data: ''
        };

        it('should return right result', function () {
            assert.strictEqual(true, Node.init(node) instanceof Node);
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
        var node = Node.init(p.children[1]);

        assert.strictEqual(true, node.hasChildNodes());
        assert.strictEqual(false, node.childNodes[0].hasChildNodes());

        assert.strictEqual(true, node.contains(node.childNodes[0]));
        assert.strictEqual(true, node.parentNode.contains(node.childNodes[0]));
        assert.strictEqual(false, node.previousSibling.contains(node.childNodes[0]));
    });
});

describe('text node', function () {
    var p = htmlparser2.parseDOM('<p><span></span>aaa<i></i></p>')[0];

    it('should behave like a text node', function () {
        var node = Node.init(p.children[1]);

        assert.strictEqual('#text', node.nodeName);
        assert.strictEqual(NodeType.TEXT_NODE, node.nodeType);
        assert.strictEqual('aaa', node.nodeValue);
        assert.strictEqual('aaa', node.textContent);

        assert.strictEqual('P', node.parentNode.tagName);
        assert.strictEqual(node.parentNode, node.parentElement);
        assert.strictEqual('SPAN', node.previousSibling.tagName);
        assert.strictEqual('I', node.nextSibling.tagName);
    });
});

describe('doctype node', function () {
    var node = htmlparser2.parseDOM('<!DOCTYPE html>')[0];

    it('should behave like a doctype node', function () {
        node = Node.init(node);

        assert.strictEqual('html', node.nodeName);
        assert.strictEqual(NodeType.DOCUMENT_TYPE_NODE, node.nodeType);
    });
});

describe('cdata node', function () {
    var node = {
        type: typeMap.CDATA,
        data: ''
    };

    it('should behave like a cdata node', function () {
        node = Node.init(node);

        assert.strictEqual('#cdata', node.nodeName);
        assert.strictEqual(NodeType.CDATA_SECTION_NODE, node.nodeType);
    });
});

describe('comment node', function () {
    var p = htmlparser2.parseDOM('<p><span></span><!--aaa--><i></i></p>')[0];

    it('should behave like a comment node', function () {
        var node = Node.init(p.children[1]);

        assert.strictEqual('#comment', node.nodeName);
        assert.strictEqual(NodeType.COMMENT_NODE, node.nodeType);
        assert.strictEqual('aaa', node.nodeValue);
        assert.strictEqual('aaa', node.textContent);

        assert.strictEqual('P', node.parentNode.tagName);
        assert.strictEqual(node.parentNode, node.parentElement);
        assert.strictEqual('SPAN', node.previousSibling.tagName);
        assert.strictEqual('I', node.nextSibling.tagName);
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
        node = Node.init(node, node);

        assert.strictEqual('#document', node.nodeName);
        assert.strictEqual(NodeType.DOCUMENT_NODE, node.nodeType);

        assert.strictEqual('html', node.doctype.nodeName);
        assert.strictEqual(NodeType.DOCUMENT_TYPE_NODE, node.doctype.nodeType);

        assert.strictEqual(node, node.querySelector('body').ownerDocument);

        assert.strictEqual('HTML', node.documentElement.tagName);
        assert.strictEqual('HEAD', node.head.tagName);
        assert.strictEqual('BODY', node.body.tagName);
    });
});

// TODO: CDATA

describe('element', function () {
    var p = htmlparser2.parseDOM(
        '<p><span></span>' +
        '<a id="x" class="y z" href="#" data-role="test" disabled>' +
        '<img id="c1" class="cls cls2">' +
        '<span id="c2" class="cls"></span>' +
        '</a>' +
        '<i></i></p>'
    )[0];

    it('should behave like a element(<a>)', function () {
        var node = Node.init(p.children[1]);

        // as a node
        assert.strictEqual('A', node.nodeName);
        assert.strictEqual(NodeType.ELEMENT_NODE, node.nodeType);

        assert.strictEqual('P', node.parentNode.tagName);
        assert.strictEqual(node.parentNode, node.parentElement);
        assert.strictEqual('SPAN', node.previousSibling.tagName);
        assert.strictEqual('I', node.nextSibling.tagName);

        // as an element
        assert.strictEqual('a', node.localName);
        assert.strictEqual('A', node.tagName);
        assert.strictEqual('x', node.id);
        assert.strictEqual('y z', node.className);
        assert.deepEqual(['y', 'z'], node.classList);

        assert.strictEqual('x', node.attributes.id);
        assert.strictEqual('y z', node.attributes.class);
        assert.strictEqual('#', node.attributes.href);
        assert.strictEqual('test', node.attributes['data-role']);
        assert.strictEqual('', node.attributes.disabled);

        assert.strictEqual(2, node.children.length);
        assert.strictEqual(node.firstElementChild, node.children[0]);
        assert.strictEqual(node.lastElementChild, node.children[1]);
        assert.strictEqual(2, node.childElementCount);
        assert.strictEqual('c1', node.children[0].id);
        assert.strictEqual('c2', node.children[1].id);

        assert.strictEqual('SPAN', node.previousElementSibling.tagName);
        assert.strictEqual('I', node.nextElementSibling.tagName);

        assert.strictEqual('#', node.getAttribute('href'));
        assert.strictEqual(true, node.hasAttribute('href'));
        assert.strictEqual(true, node.hasAttribute('disabled'));
        assert.strictEqual(false, node.hasAttribute('disabledddd'));

        var elementsOfTagNameImg = node.getElementsByTagName('img');
        assert.strictEqual(1, elementsOfTagNameImg.length);
        assert.strictEqual('c1', elementsOfTagNameImg[0].id);

        var elementsOfClassNameCls = node.getElementsByClassName('cls');
        assert.strictEqual(2, elementsOfClassNameCls.length);
        assert.strictEqual('c1', elementsOfClassNameCls[0].id);
        assert.strictEqual('c2', elementsOfClassNameCls[1].id);

        var elementsOfClassNameClsCls2 = node.getElementsByClassName('cls cls2');
        assert.strictEqual(1, elementsOfClassNameClsCls2.length);
        assert.strictEqual('c1', elementsOfClassNameClsCls2[0].id);

        var elementOfIdC2 = node.querySelector('#c2');
        assert.strictEqual('c2', elementOfIdC2.id);

        var elementsOfIdC2 = node.querySelectorAll('#c2');
        assert.strictEqual(1, elementsOfIdC2.length);
        assert.strictEqual('c2', elementsOfIdC2[0].id);
    });
});
